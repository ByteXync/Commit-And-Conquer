# middleware/auth_middleware.py
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
import jwt
import os
import logging

# Get secret key from environment or raise error if not set in production
SECRET_KEY = os.getenv("JWT_SECRET_KEY")
if not SECRET_KEY and os.getenv("ENVIRONMENT", "development") == "production":
    raise ValueError("JWT_SECRET_KEY must be set in production environment")
elif not SECRET_KEY:
    SECRET_KEY = "supersecretkey"  # Only for development
    logging.warning("Using default SECRET_KEY. This is insecure for production!")

class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Define public routes that don't need authentication
        public_paths = ["/user/register", "/api/auth/login", "/docs", "/openapi.json", "/redoc"]
        
        # Check if the path is public - using exact matches or proper path checking
        if request.url.path in public_paths or any(
            request.url.path.startswith(f"{path}/") for path in public_paths
        ):
            return await call_next(request)
        
        # For protected routes, check for authentication
        authorization: str = request.headers.get("Authorization")
        
        if not authorization or not authorization.startswith("Bearer "):
            logging.info(f"Unauthorized access attempt to {request.url.path}")
            return Response("Unauthorized - Authentication required", status_code=401)

        try:
            token = authorization.split(" ")[1].strip()
            if not token:
                return Response("Empty token provided", status_code=401)
                
            payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            request.state.user = payload  # Store user info in request state
        except jwt.ExpiredSignatureError:
            logging.info(f"Expired token used for {request.url.path}")
            return Response("Token expired", status_code=401)
        except jwt.InvalidTokenError:
            logging.info(f"Invalid token used for {request.url.path}")
            return Response("Invalid token", status_code=401)
        except IndexError:
            return Response("Malformed authorization header", status_code=401)

        return await call_next(request)

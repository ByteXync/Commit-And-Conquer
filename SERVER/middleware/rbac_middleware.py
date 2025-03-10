    # middleware/rbac_middleware.py
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
from typing import Dict, List
import logging

class RBACMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, role_permissions: Dict[str, List[str]]):
        super().__init__(app)
        self.role_permissions = role_permissions
        
    async def dispatch(self, request: Request, call_next):
        # Skip RBAC check for public paths
        public_paths = ["/user/register", "/api/auth/login", "/docs", "/openapi.json", "/redoc"]
        if any(request.url.path.startswith(path) for path in public_paths):
            return await call_next(request)
            
        # Check if user is authenticated - AuthMiddleware should have already set this
        if not hasattr(request.state, 'user'):
            return Response("Unauthorized", status_code=401)
            
        user = request.state.user
        user_role = user.get("role", "USER")  # Default to USER if role not specified
        
        # Get permissions for user's role
        allowed_paths = self.role_permissions.get(user_role, [])
        
        # Check if user has permission to access this path
        path_allowed = False
        for allowed_path in allowed_paths:
            if request.url.path.startswith(allowed_path):
                path_allowed = True
                break
                
        if not path_allowed and user_role != "ADMIN":  # ADMIN can access everything by default
            logging.warning(f"User {user.get('email')} with role {user_role} attempted to access {request.url.path}")
            return Response("Forbidden - Insufficient permissions", status_code=403)
            
        return await call_next(request)
from fastapi import APIRouter, FastAPI, HTTPException, Depends
from pydantic import BaseModel, EmailStr, validator
from prisma.models import User as PrismaUser
from passlib.context import CryptContext
import jwt
import os
from datetime import datetime, timedelta
import logging

# Create password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT settings
SECRET_KEY = os.getenv("JWT_SECRET_KEY")
if not SECRET_KEY and os.getenv("ENVIRONMENT", "development") == "production":
    raise ValueError("JWT_SECRET_KEY must be set in production environment")
elif not SECRET_KEY:
    SECRET_KEY = "supersecretkey"  # Only for development
    logging.warning("Using default SECRET_KEY. This is insecure for production!")
    
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = int(os.getenv("ACCESS_TOKEN_EXPIRE_HOURS", "24"))

# Valid roles
VALID_ROLES = ["USER", "ADMIN"]

class User(BaseModel):
    fullName: str
    email: EmailStr  # Using EmailStr for validation
    password: str
    role: str = "USER"  # Default role
    
    @validator('password')
    def password_strength(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters')
        return v
        
    @validator('role')
    def valid_role(cls, v):
        if v not in VALID_ROLES:
            raise ValueError(f'Role must be one of {VALID_ROLES}')
        return v

router = APIRouter()

def generate_token(user_id, email, role):
    payload = {
        "id": user_id,
        "email": email,
        "role": role,
        "exp": datetime.utcnow() + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token

@router.post("/user/register")
async def register(user: User):
    try:
        # Check if user already exists
        existing_user = await PrismaUser.prisma().find_first(
            where={"email": user.email}
        )
        
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        # Hash the password
        hashed_password = pwd_context.hash(user.password)
        
        # Create the user with hashed password
        prisma_user = await PrismaUser.prisma().create(data={
            "fullName": user.fullName,
            "email": user.email,
            "password": hashed_password,  # Store hashed password, not plain text
            "role": user.role
        })
        
        # Generate token for the newly registered user
        token = generate_token(prisma_user.id, prisma_user.email, prisma_user.role)
        
        # Return user info and token
        return {
            "fullName": prisma_user.fullName, 
            "email": prisma_user.email, 
            "role": prisma_user.role,
            "token": token,
            "message": "User registered successfully"
        }
    except Exception as e:
        # Log the error and return a generic message
        logging.error(f"Registration error: {str(e)}")
        raise HTTPException(status_code=500, detail="Registration failed. Please try again.")

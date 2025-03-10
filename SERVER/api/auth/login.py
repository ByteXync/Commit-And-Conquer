from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime, timedelta
from prisma.models import User as PrismaUser
import jwt
import os
from passlib.context import CryptContext
import logging

# Load JWT secret from environment
SECRET_KEY = os.getenv("JWT_SECRET_KEY")
if not SECRET_KEY and os.getenv("ENVIRONMENT", "development") == "production":
    raise ValueError("JWT_SECRET_KEY must be set in production environment")
elif not SECRET_KEY:
    SECRET_KEY = "supersecretkey"  # Only for development
    logging.warning("Using default SECRET_KEY. This is insecure for production!")

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = int(os.getenv("ACCESS_TOKEN_EXPIRE_HOURS", "24"))

# Password hashing setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter()

class UserLogin(BaseModel):
    email: EmailStr
    password: str

def generate_token(user_id, email, role):
    payload = {
        "id": user_id,
        "email": email,
        "role": role,
        "exp": datetime.utcnow() + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token

@router.post("/api/auth/login")
async def login(user: UserLogin):
    """Login user and return JWT token"""
    try:
        # Find user in database
        prisma_user = await PrismaUser.prisma().find_first(
            where={"email": user.email}
        )
        
        if not prisma_user:
            raise HTTPException(status_code=404, detail="User not found")

        # Verify password
        if not pwd_context.verify(user.password, prisma_user.password):
            raise HTTPException(status_code=401, detail="Incorrect password")

        # Generate JWT token
        token = generate_token(prisma_user.id, prisma_user.email, prisma_user.role)

        return {
            "fullName": prisma_user.fullName,
            "email": prisma_user.email,
            "role": prisma_user.role,
            "token": token
        }
    except Exception as e:
        # Log the error and return a generic message
        logging.error(f"Login error: {str(e)}")
        raise HTTPException(status_code=500, detail="Login failed. Please try again.")

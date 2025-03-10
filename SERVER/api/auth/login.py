from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from prisma.models import User as PrismaUser
from passlib.context import CryptContext
import jwt
import os

# Password hashing configuration
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT Secret (use environment variable)
SECRET_KEY = os.getenv("SECRET_KEY", "bytexync")
ALGORITHM = "HS256"

class User(BaseModel):
    email: str
    password: str
    role: Optional[str] = None

router = APIRouter()

@router.post("/user/login")
async def login(user: User):
    # Fetch user from DB
    prisma_user = await PrismaUser.prisma().find_unique(where={"email": user.email})

    if not prisma_user:
        raise HTTPException(status_code=404, detail="User not found")

    # Verify hashed password
    if not pwd_context.verify(user.password, prisma_user.password):
        raise HTTPException(status_code=401, detail="Incorrect password")

    # Generate JWT token
    payload = {"id": prisma_user.id, "email": prisma_user.email, "role": prisma_user.role}
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

    return {
        "fullName": prisma_user.fullName,
        "email": prisma_user.email,
        "role": prisma_user.role,
        "token": token
    }

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from prisma.models import User as PrismaUser
import jwt
import os

# JWT Secret (use environment variable)
SECRET_KEY = os.getenv("SECRET_KEY", "bytexync")
ALGORITHM = "HS256"

router = APIRouter()

class User(BaseModel):
    email: str
    password: str

@router.post("/user/login")
async def login(user: User):
    # Fetch user from DB
    prisma_user = await PrismaUser.prisma().find_unique(where={"email": user.email})

    if not prisma_user:
        raise HTTPException(status_code=404, detail="User not found")

    # Verify plain-text password (since bcrypt is not used)
    if user.password != prisma_user.password:
        raise HTTPException(status_code=401, detail="Incorrect password")

    # Ensure user is NOT an admin
    if prisma_user.role == "ADMIN":
        raise HTTPException(status_code=403, detail="Admins must log in via admin login")

    # Generate JWT token
    payload = {
        "id": prisma_user.id,
        "email": prisma_user.email,
        "role": prisma_user.role
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

    return {
        "fullName": getattr(prisma_user, "fullName", "User"),
        "email": prisma_user.email,
        "role": prisma_user.role,
        "token": token
    }

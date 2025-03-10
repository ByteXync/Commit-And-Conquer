from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from prisma.models import User as PrismaUser

router = APIRouter()

class User(BaseModel):
    fullName: str
    email: EmailStr
    password: str
    role: str = "USER"  # Default role assigned as USER

@router.post("/user/register")
async def register(user: User):
    # Check if user already exists
    existing_user = await PrismaUser.prisma().find_unique(where={"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Create user in DB
    prisma_user = await PrismaUser.prisma().create(data={
        "fullName": user.fullName,
        "email": user.email,
        "password": user.password,  # Consider hashing passwords before storing
        "role": user.role or "USER"
    })

    return {
        "fullName": prisma_user.fullName,
        "email": prisma_user.email,
        "role": prisma_user.role
    }

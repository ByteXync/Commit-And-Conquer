from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr, Field
from prisma.models import User as PrismaUser

class User(BaseModel):
    fullName: str
    email: EmailStr
    password: str = Field(..., min_length=8)
    role: str

router = APIRouter()

def raise_error(message: str):
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=message)

@router.post("/user/register")
async def register(user: User):
    existing_user = await PrismaUser.prisma().find_unique(where={"email": user.email})
    if existing_user:
        raise_error("Email is already registered")
    
    prisma_user = await PrismaUser.prisma().create(data={
        "fullName": user.fullName,
        "email": user.email,
        "password": user.password,
        "role": user.role
    })
    
    return {
        "fullName": prisma_user.fullName,
        "email": prisma_user.email,
        "role": prisma_user.role
    }

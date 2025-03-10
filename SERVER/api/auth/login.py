from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from prisma.models import User as PrismaUser
import jwt

class User(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)
    role: Optional[str] = None

router = APIRouter()

def raise_error(message: str):
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=message)

@router.post("/user/login")
async def login(user: User):
    prisma_user = await PrismaUser.prisma().find_unique(where={"email": user.email})
    
    if not prisma_user:
        raise_error("User not found")
    
    if prisma_user.password != user.password:
        raise_error("Incorrect password")
    
    try:
        payload = {"id": prisma_user.id, "email": prisma_user.email, "role": prisma_user.role}
        token = jwt.encode(payload, 'jaidboss', algorithm='HS256')
        return {
            "fullName": prisma_user.fullName,
            "email": prisma_user.email,
            "role": prisma_user.role,
            "token": token
        }
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")

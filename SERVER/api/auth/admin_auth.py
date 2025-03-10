from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr, Field
from prisma.models import User as PrismaUser
import jwt

admin_key = "admin123"

class Admin(BaseModel):
    fullName: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=8)
    admin_code: str = Field(..., min_length=8)

class AdminLogin(BaseModel):
    email: EmailStr
    password: str
    admin_code: str = Field(..., min_length=8)

router = APIRouter()

def raise_admin_error(message: str):
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=message)

@router.post("/user/adminauth/register")
async def register(admin: Admin):
    if admin.admin_code != admin_key:
        raise_admin_error("Invalid Admin Code")
    
    existing_user = await PrismaUser.prisma().find_unique(where={"email": admin.email})
    if existing_user:
        raise_admin_error("User with this email already exists")
    
    try:
        prisma_user = await PrismaUser.prisma().create(data={
            "fullName": admin.fullName,
            "email": admin.email,
            "password": admin.password,
            "role": "ADMIN"
        })
        return {
            "fullName": prisma_user.fullName,
            "email": prisma_user.email,
            "role": "ADMIN"
        }
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")

@router.post("/user/adminauth/login")
async def login(admin: AdminLogin):
    prisma_user = await PrismaUser.prisma().find_unique(where={"email": admin.email})
    
    if not prisma_user:
        raise_admin_error("User not found")
    
    if admin.password != prisma_user.password or admin.admin_code != admin_key:
        raise_admin_error("Incorrect credentials or admin code")
    
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

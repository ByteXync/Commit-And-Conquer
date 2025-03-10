from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from prisma.models import User as PrismaUser
import jwt
from passlib.context import CryptContext

# Secure password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Store admin key securely
admin_key = "admin123"  # Consider using an environment variable

class Admin(BaseModel):
    fullName: str
    email: str
    password: str
    admin_code: str

class AdminLogin(BaseModel):
    email: str
    password: str
    admin_code: str

router = APIRouter()

@router.post("/user/adminauth/register")
async def register(admin: Admin):
    if admin.admin_code != admin_key:
        raise HTTPException(status_code=403, detail="Invalid Admin Code")

    hashed_password = pwd_context.hash(admin.password)  # Hash the password

    prisma_user = await PrismaUser.prisma().create(data={
        "fullName": admin.fullName,
        "email": admin.email,
        "password": hashed_password,
        "role": "ADMIN"
    })

    return {
        "fullName": prisma_user.fullName,
        "email": prisma_user.email,
        "role": "ADMIN"
    }

@router.post("/user/adminauth/login")
async def login(admin: AdminLogin):
    prisma_user = await PrismaUser.prisma().find_unique(where={"email": admin.email})

    if not prisma_user:
        raise HTTPException(status_code=404, detail="User not found")

    if not pwd_context.verify(admin.password, prisma_user.password):
        raise HTTPException(status_code=401, detail="Incorrect password")

    if admin.admin_code != admin_key:
        raise HTTPException(status_code=403, detail="Invalid Admin Code")

    payload = { "email": prisma_user.email, "role": prisma_user.role}
    token = jwt.encode(payload, 'jaidboss', algorithm='HS256')

    return {
        "fullName": prisma_user.fullName,
        "email": prisma_user.email,
        "role": prisma_user.role,
        "token": token
    }

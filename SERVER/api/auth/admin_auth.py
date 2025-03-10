from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from prisma import Prisma
import jwt
import os
from passlib.context import CryptContext

# Load secret keys from environment
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "supersecretkey")
ADMIN_KEY = os.getenv("ADMIN_SECRET", "admin123")

# Prisma ORM instance
db = Prisma()

# Password hashing setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter()

class AdminRegister(BaseModel):
    fullName: str
    email: EmailStr
    password: str
    admin_code: str

class AdminLogin(BaseModel):
    email: EmailStr
    password: str
    admin_code: str

@router.post("/user/adminauth/register")
async def register(admin: AdminRegister):
    """Register an Admin User"""
    await db.connect()

    # Validate admin code
    if admin.admin_code != ADMIN_KEY:
        raise HTTPException(status_code=403, detail="Invalid Admin Code")

    # Check if user already exists
    existing_user = await db.user.find_unique(where={"email": admin.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    # Hash the password before storing
    hashed_password = pwd_context.hash(admin.password)

    # Create user with Prisma
    prisma_user = await db.user.create(data={
        "fullName": admin.fullName,
        "email": admin.email,
        "password": hashed_password,
        "role": "ADMIN"
    })

    await db.disconnect()

    return {
        "fullName": prisma_user.fullName,
        "email": prisma_user.email,
        "role": "ADMIN"
    }

@router.post("/user/adminauth/login")
async def login(admin: AdminLogin):
    """Admin Login with JWT Token"""
    await db.connect()

    # Find user
    prisma_user = await db.user.find_unique(where={"email": admin.email})
    if not prisma_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Verify password
    if not pwd_context.verify(admin.password, prisma_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Validate admin code
    if admin.admin_code != ADMIN_KEY:
        raise HTTPException(status_code=403, detail="Invalid Admin Code")

    # Generate JWT token
    payload = {"id": prisma_user.id, "email": prisma_user.email, "role": prisma_user.role}
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")

    await db.disconnect()

    return {
        "fullName": prisma_user.fullName,
        "email": prisma_user.email,
        "role": prisma_user.role,
        "token": token
    }
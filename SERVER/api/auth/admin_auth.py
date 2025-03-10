from fastapi import APIRouter
from pydantic import BaseModel
from prisma.models import User as PrismaUser
import jwt

admin_key = "admin123"

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
    if admin.admin_code == admin_key:
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
    else:
        return {"message": "Invalid Admin Code"}
    
@router.post("/user/adminauth/login")
async def login(admin: AdminLogin):
    prisma_user = await PrismaUser.prisma().find_unique(where={"email": admin.email})
    if(admin.password == prisma_user.password and admin.admin_code == admin_key):
        payload={"id":prisma_user.id,"email":prisma_user.email,"role":prisma_user.role}
        token=jwt.encode(payload,'jaidboss',algorithm='HS256')
        return {"fullName":prisma_user.fullName,"email":prisma_user.email,"role":prisma_user.role,"token":token}
    else:
        return {"error":"Incorrect credentials"}
        


@router.get("/user/protected")
async def protected_route(user: dict = Depends(verify_token)):
    return {"message": "Access granted", "user": user}

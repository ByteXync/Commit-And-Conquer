from fastapi import APIRouter, FastAPI
from pydantic import BaseModel
from prisma.models import User as PrismaUser

class User(BaseModel):
    fullName: str
    email: str
    password: str
    role: str

router = APIRouter()

@router.post("/user/register")
async def register(user: User):
    prisma_user = await PrismaUser.prisma().create(data={
        "fullName": user.fullName,
        "email": user.email,
        "password": user.password,
        "role": user.role
    })
    return {"fullName": prisma_user.fullName, "email": prisma_user.email, "password": prisma_user.password, "role": "USER"}


def require_role(required_role: str):
    def role_checker(user: dict = Depends(verify_token)):
        if user["role"] != required_role:
            raise HTTPException(status_code=403, detail="Forbidden: Insufficient permissions")
        return user
    return role_checker

@router.get("/admin/dashboard")
async def admin_dashboard(user: dict = Depends(require_role("ADMIN"))):
    return {"message": "Welcome Admin"}

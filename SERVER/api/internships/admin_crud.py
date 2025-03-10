from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from prisma.models import AdminPanel as PrismaAdmin
from typing import List, Optional

router = APIRouter()


class AdminCreate(BaseModel):
    name: str
    email: EmailStr
    role: str

class AdminUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None


@router.post("/admin/create", response_model=AdminCreate)
async def create_admin(admin: AdminCreate):
    existing_admin = await PrismaAdmin.prisma().find_unique(where={"email": admin.email})
    if existing_admin:
        raise HTTPException(status_code=400, detail="Email already exists")
    
    new_admin = await PrismaAdmin.prisma().create(data=admin.dict())
    return new_admin

@router.get("/admin/", response_model=List[AdminCreate])
async def get_admins():
    admins = await PrismaAdmin.prisma().find_many()
    return admins


@router.put("/admin/update/{admin_id}")
async def update_admin(admin_id: int, admin: AdminUpdate):
    existing_admin = await PrismaAdmin.prisma().find_unique(where={"id": admin_id})
    if not existing_admin:
        raise HTTPException(status_code=404, detail="Admin not found")
    
    updated_admin = await PrismaAdmin.prisma().update(
        where={"id": admin_id},
        data=admin.dict(exclude_unset=True)
    )
    return updated_admin


@router.delete("/admin/delete/{admin_id}")
async def delete_admin(admin_id: int):
    existing_admin = await PrismaAdmin.prisma().find_unique(where={"id": admin_id})
    if not existing_admin:
        raise HTTPException(status_code=404, detail="Admin not found")

    await PrismaAdmin.prisma().delete(where={"id": admin_id})
    return {"message"}
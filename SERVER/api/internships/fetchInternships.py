from fastapi import APIRouter
from pydantic import BaseModel
from prisma.models import Internship as PrismaInternship

class Internship(BaseModel):
    title:str
    description:str
    company:str
    location:str
    stipend:int
    duration:int

router = APIRouter()

@router.get("/api/fetchinternships")
async def fetch_internships():
    data = await PrismaInternship.prisma().find_many(where={"isActive": True})
    return data
@router.get("/api/fetchdeletedinternships")
async def fetch_deleted_internships():
    # Fetch only inactive internships
    data = await PrismaInternship.prisma().find_many(
        where={"isActive": False}
    )
    return data
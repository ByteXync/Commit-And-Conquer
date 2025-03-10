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

@router.post("/api/addinternships")
async def addInternships(internship:Internship):
    prisma_internship = await PrismaInternship.prisma().create(data={
        "title": internship.title,
        "description": internship.description,
        "company": internship.company,
        "location": internship.location,
        "stipend": internship.stipend,
        "duration": internship.duration
    })
    return {"title": prisma_internship.title, "description": prisma_internship.description, "company": prisma_internship.company, "location": prisma_internship.location, "stipend": prisma_internship.stipend, "duration": prisma_internship.duration}

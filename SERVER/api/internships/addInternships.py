from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from prisma.models import Internship as PrismaInternship
from utils.auth import require_roles
import logging

class Internship(BaseModel):
    title: str
    description: str
    company: str
    location: str
    stipend: int
    duration: int

router = APIRouter()

@router.post("/api/addinternships")
async def addInternships(
    internship: Internship,
    user = Depends(require_roles(["ADMIN"]))
):
    try:
        prisma_internship = await PrismaInternship.prisma().create(data={
            "title": internship.title,
            "description": internship.description,
            "company": internship.company,
            "location": internship.location,
            "stipend": internship.stipend,
            "duration": internship.duration
        })

        return {
            "message": "Internship added successfully",
            "internship": {
                "title": prisma_internship.title, 
                "description": prisma_internship.description, 
                "company": prisma_internship.company, 
                "location": prisma_internship.location, 
                "stipend": prisma_internship.stipend, 
                "duration": prisma_internship.duration
            }
        }
    except Exception as e:
        logging.error(f"Error adding internship: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to add internship")
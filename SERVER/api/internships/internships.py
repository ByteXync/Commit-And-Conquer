from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, ValidationError
from prisma.models import Internship as PrismaInternship
from prisma import Prisma
import logging

# Initialize router
router = APIRouter()

# Initialize Prisma client
prisma = Prisma()

# Internship schema
class Internship(BaseModel):
    title: str
    description: str
    company: str
    location: str
    stipend: int
    duration: int

# Error logging setup
logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)

# Dependency to check Prisma connection
async def get_db():
    if not prisma.is_connected():
        await prisma.connect()
    return prisma


# 🟢 Fetch all internships
@router.get("/api/fetchinternships")
async def getInternships():
    try:
        data = await PrismaInternship.prisma().find_many()
        return data
    except Exception as e:
        logger.error(f"Error fetching internships: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


# 🔵 Add a new internship
@router.post("/api/addinternships")
async def addInternships(internship: Internship):
    try:
        prisma_internship = await PrismaInternship.prisma().create(data=internship.dict())
        return prisma_internship
    except ValidationError as e:
        logger.error(f"Validation Error: {str(e)}")
        raise HTTPException(status_code=400, detail="Invalid internship data")
    except Exception as e:
        logger.error(f"Error adding internship: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


# 🟡 Update an internship by ID
@router.put("/api/updateinternship/{id}")
async def updateInternship(id: int, internship: Internship):
    try:
        existing = await PrismaInternship.prisma().find_unique(where={"id": id})
        if not existing:
            raise HTTPException(status_code=404, detail="Internship not found")

        updated_internship = await PrismaInternship.prisma().update(
            where={"id": id},
            data=internship.dict()
        )
        return updated_internship
    except ValidationError as e:
        logger.error(f"Validation Error: {str(e)}")
        raise HTTPException(status_code=400, detail="Invalid internship data")
    except Exception as e:
        logger.error(f"Error updating internship: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


# 🔴 Delete an internship by ID
@router.delete("/api/deleteinternship/{id}")
async def deleteInternship(id: int):
    try:
        existing = await PrismaInternship.prisma().find_unique(where={"id": id})
        if not existing:
            raise HTTPException(status_code=404, detail="Internship not found")

        await PrismaInternship.prisma().delete(where={"id": id})
        return {"message": "Internship deleted successfully"}
    except Exception as e:
        logger.error(f"Error deleting internship: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

from fastapi import APIRouter
from pydantic import BaseModel
from prisma import Prisma

# Pydantic model for data validation
class Internship(BaseModel):
    title: str
    description: str
    company: str
    location: str
    stipend: int
    duration: int

router = APIRouter()

@router.get("/api/fetchinternships")
async def fetch_internships():
    # Initialize Prisma client
    db = Prisma()
    await db.connect()
    
    # Fetch internships using the Prisma client
    data = await db.internship.find_many()
    
    # Disconnect from the database
    await db.disconnect()
    
    return data

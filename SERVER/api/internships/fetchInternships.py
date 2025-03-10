from fastapi import APIRouter, Query
from pydantic import BaseModel
from prisma.models import Internship as PrismaInternship
from typing import Optional

router = APIRouter()

class Internship(BaseModel):
    title: str
    description: str
    company: str
    location: str
    stipend: int
    duration: int

@router.get("/api/fetchinternships")
async def fetch_internships(
    searchQuery: str = Query("", alias="searchQuery"),
    duration: Optional[int] = Query(None, alias="duration"),  # Fixed Typing
    city: str = Query("", alias="selectedCity")
):
    filters = {}

    if searchQuery:
        filters["OR"] = [
            {"title": {"contains": searchQuery, "mode": "insensitive"}},
            {"company": {"contains": searchQuery, "mode": "insensitive"}},
            {"description": {"contains": searchQuery, "mode": "insensitive"}}
        ]

    if duration is not None:
        filters["duration"] = duration

    if city:
        filters["location"] = {"contains": city, "mode": "insensitive"}

    internships = await PrismaInternship.prisma().find_many(where=filters)
    return internships


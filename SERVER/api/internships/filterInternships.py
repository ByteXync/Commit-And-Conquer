from fastapi import APIRouter, Depends, Query
from prisma import Prisma
from typing import Optional, List

router = APIRouter()

db = Prisma()

@router.get("/internships/filter")
async def filter_internships(
    company: Optional[str] = Query(None, description="Filter by company name"),
    location: Optional[str] = Query(None, description="Filter by location"),
    min_stipend: Optional[int] = Query(None, description="Minimum stipend"),
    max_stipend: Optional[int] = Query(None, description="Maximum stipend"),
    duration: Optional[int] = Query(None, description="Filter by internship duration (in months)")
):
    filters = {}

    if company:
        filters["company"] = {"contains": company}  # Partial match
    if location:
        filters["location"] = {"contains": location}
    if min_stipend:
        filters["stipend"] = {"gte": min_stipend}
    if max_stipend:
        filters["stipend"] = {"lte": max_stipend}
    if duration:
        filters["duration"] = duration  # Exact match for duration

    internships = await db.internship.find_many(where=filters)
    return internships

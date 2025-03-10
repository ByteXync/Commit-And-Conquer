from fastapi import APIRouter
from pydantic import BaseModel
from prisma.models import Internship as PrismaInternship

# parameters it can be found one
class InternshipParams(BaseModel):
    title:str
    description:str
    company:str
    location:str
    stipend:int
    duration:int


router = APIRouter()

@router.get("/api/filterinternships")
async def filterInternships(filters: InternshipParams):

    query_filters = {}


    #check if the parameter is even given if yes then use it to sort
    if filters.title:
        query_filters["title"] = {"contains": filters.title}
    if filters.company:
        query_filters["company"] = {"contains": filters.company}
    if filters.location:
        query_filters["location"] = {"contains": filters.location}
    if filters.stipend:
        query_filters["stipend"] = filters.stipend
    if filters.duration:
        query_filters["duration"] = filters.duration

    filtered_internships = await PrismaInternship.prisma().find_many(where=query_filters)

    return [{"title": internship.title, "description": internship.description, "company": internship.company, "location": internship.location, "stipend": internship.stipend, "duration": internship.duration} for internship in filtered_internships]
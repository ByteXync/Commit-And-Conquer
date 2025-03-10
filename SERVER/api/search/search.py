from fastapi import APIRouter, Query
from prisma.models import Internship as PrismaInternship
from prisma.models import Blog as PrismaBlog
from typing import Optional, List, Dict, Any

router = APIRouter()

@router.get("/search")
async def search_all(
    query: str = Query("", alias="query"),
    duration: Optional[int] = Query(None, alias="duration"),
    city: str = Query("", alias="selectedCity"),
    minStipend: Optional[int] = Query(None, alias="minStipend"),
    maxStipend: Optional[int] = Query(None, alias="maxStipend"),
    stipend_flexibility: Optional[float] = Query(0.1, alias="stipendFlexibility")  # New parameter
) -> Dict[str, List[Any]]:
    # 🔹 Internship Search Filters
    filters_internships = {}
    
    if query:
        filters_internships["OR"] = [
            {"title": {"contains": query, "mode": "insensitive"}},
            {"company": {"contains": query, "mode": "insensitive"}},
            {"description": {"contains": query, "mode": "insensitive"}},
            {"location": {"contains": query, "mode": "insensitive"}},
        ]
        
    if duration is not None:
        filters_internships["duration"] = duration
        
    if city:
        filters_internships["location"] = {"contains": city, "mode": "insensitive"}
    
    # 🔹 Flexible Stipend Range Filtering
    if minStipend is not None or maxStipend is not None:
        stipend_filter = {}
        
        # Add flexibility to stipend range (e.g., ±10% by default)
        flexibility_factor = stipend_flexibility  # Default is 0.1 (10%)
        
        if minStipend is not None:
            adjusted_min = int(minStipend * (1 - flexibility_factor))
            stipend_filter["gte"] = adjusted_min  # Greater than or equal to adjusted min
            
        if maxStipend is not None:
            adjusted_max = int(maxStipend * (1 + flexibility_factor))
            stipend_filter["lte"] = adjusted_max  # Less than or equal to adjusted max
            
        if stipend_filter:
            filters_internships["stipend"] = stipend_filter
    
    # 🔹 Fetch Internships using PrismaInternship model
    internships = await PrismaInternship.prisma().find_many(where=filters_internships)
    
    # 🔹 Blog Search (unchanged)
    blog_filters = {}
    if query:
        blog_filters["OR"] = [
            {"title": {"contains": query, "mode": "insensitive"}},
            {"author": {"contains": query, "mode": "insensitive"}}
        ]
    
    blogs = await PrismaBlog.prisma().find_many(where=blog_filters)
    
    return {"internships": internships, "blogs": blogs}

# from fastapi import APIRouter, HTTPException
# from prisma.models import Internship as PrismaInternship

# router = APIRouter()

# @router.delete("/api/deleteinternship/{internship_id}")
# async def delete_internship(internship_id: int):
#     try:
#         # Instead of deleting, update isActive to False
#         await PrismaInternship.prisma().update(
#             where={"id": internship_id},
#             data={"isActive": False}
#         )
#         return {"message": "Internship deactivated successfully"}
#     except Exception as e:
#         raise HTTPException(status_code=404, detail=f"Internship with ID {internship_id} not found")
from fastapi import APIRouter, HTTPException
from prisma.models import Internship as PrismaInternship

router = APIRouter()

@router.put("/api/toggleinternship/{internship_id}")
async def toggle_internship_status(internship_id: int):
    try:
        # First, get the current status
        internship = await PrismaInternship.prisma().find_unique(
            where={"id": internship_id}
        )
        
        if not internship:
            raise HTTPException(status_code=404, detail="Internship not found")
        
        # Toggle the isActive status
        new_status = not internship.isActive
        
        # Update the internship
        updated = await PrismaInternship.prisma().update(
            where={"id": internship_id},
            data={"isActive": new_status}
        )
        
        status_message = "activated" if new_status else "deactivated"
        return {"message": f"Internship {status_message} successfully", "status": new_status}
    
    except Exception as e:
        if "not found" in str(e):
            raise HTTPException(status_code=404, detail="Internship not found")
        raise HTTPException(status_code=500, detail=str(e))
    
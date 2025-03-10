from fastapi import APIRouter, HTTPException
from prisma.models import Internship as PrismaInternship

router = APIRouter()

@router.delete("/api/deleteinternship/{internship_id}")
async def delete_internship(internship_id: int):
    try:
        # Instead of deleting, update isActive to False
        await PrismaInternship.prisma().update(
            where={"id": internship_id},
            data={"isActive": False}
        )
        return {"message": "Internship deactivated successfully"}
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Internship with ID {internship_id} not found")
from fastapi import APIRouter
import jwt
from prisma.models import Blog as PrismaBlog
from pydantic import BaseModel
from typing import Dict, Any
from datetime import datetime
import json

router = APIRouter()

class Blog(BaseModel):
    token: str
    title: str
    content: Dict[str, Any]

@router.post("/api/blogs")
async def create_blog(blog: Blog):
    payload = jwt.decode(blog.token, 'jaidboss', algorithms=['HS256'])
    if payload['role'] == 'ADMIN':
        prisma_blog = await PrismaBlog.prisma().create(data={
            "title": blog.title,
            "user_id": payload['id'],
            "content": json.dumps(blog.content),
            "author": payload['email'],
            "date": datetime.utcnow(),
            "upvote":0
        })
        return {
            "title": prisma_blog.title,
            "content": prisma_blog.content,
            "user_id": prisma_blog.user_id,
            "id": prisma_blog.id,
            "author": prisma_blog.author,
            "date": prisma_blog.date
        }
    else:
        return {"message": "You are not authorized to create blog"}

@router.get("/api/fetchblogs")
async def fetch_blogs():
    blogs = await PrismaBlog.prisma().find_many()
    return blogs

@router.patch("/api/blogupvote/{id}")
async def upvote(id: str):
    blog = await PrismaBlog.prisma().find_unique(where={"id": id})
    if not blog:
        return {"message": "Blog not found"}

    updated_blog = await PrismaBlog.prisma().update(
        where={"id": id},
        data={"upvote": blog.upvote + 1}
    )
    return {"message": "Upvote added successfully", "upvote": updated_blog.upvote}

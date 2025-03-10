from fastapi import APIRouter, HTTPException, status, Depends
import jwt
from prisma.models import Blog as PrismaBlog
from pydantic import BaseModel
from typing import Dict, Any, Optional
from datetime import datetime
import json
import logging

router = APIRouter()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class Blog(BaseModel):
    token: str
    title: str
    content: Dict[str, Any]

class BlogResponse(BaseModel):
    title: str
    content: str
    user_id: int
    id: int
    author: str
    date: datetime

class ErrorResponse(BaseModel):
    detail: str

@router.post("/api/blogs", response_model=BlogResponse, responses={401: {"model": ErrorResponse}, 400: {"model": ErrorResponse}})
async def create_blog(blog: Blog):
    try:
        payload = jwt.decode(blog.token, 'jaidboss', algorithms=['HS256'])
        if payload['role'] != 'ADMIN':
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not authorized to create a blog")

        prisma_blog = await PrismaBlog.prisma().create(data={
            "title": blog.title,
            "user_id": payload['id'],
            "content": json.dumps(blog.content),
            "author": payload['email'],
            "date": datetime.utcnow()
        })

        return BlogResponse(
            title=prisma_blog.title,
            content=prisma_blog.content,
            user_id=prisma_blog.user_id,
            id=prisma_blog.id,
            author=prisma_blog.author,
            date=prisma_blog.date
        )

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    except Exception as e:
        logger.error(f"An error occurred: {e}")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="An error occurred while creating the blog")

@router.get("/api/fetchblogs", response_model=list[BlogResponse], responses={500: {"model": ErrorResponse}})
async def fetch_blogs():
    try:
        blogs = await PrismaBlog.prisma().find_many()
        return [BlogResponse(
            title=blog.title,
            content=blog.content,
            user_id=blog.user_id,
            id=blog.id,
            author=blog.author,
            date=blog.date
        ) for blog in blogs]
    except Exception as e:
        logger.error(f"An error occurred: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An error occurred while fetching blogs")
# main.py
from fastapi import FastAPI
from prisma import Prisma, register
from api.auth.login import router as login_router
from api.auth.register import router as register_router
from api.internships.fetchInternships import router as fetchInternships_router
from api.internships.addInternships import router as addInternships_router
from api.auth.admin_auth import router as admin_auth_router
from api.blogs.blogs import router as blog_router
from api.ats.resume_routes import router as ats_router
from fastapi.middleware.cors import CORSMiddleware
from middleware.auth_middleware import AuthMiddleware
import logging
from middleware.rbac_middleware import RBACMiddleware

app = FastAPI()

# Initialize Prisma client
db = Prisma()
register(db)

# Define role permissions
role_permissions = {
    "USER": [
        "/api/internships/fetch",
        "/api/blogs/public",
        "/user/profile"
    ],
    "ADMIN": [
        # Admins have access to everything, but we could specify paths
        "/api/internships/add",
        "/api/admin",
        "/api/blogs"
    ]
}
# Add Authentication Middleware
app.add_middleware(AuthMiddleware)
app.add_middleware(RBACMiddleware, role_permissions=role_permissions)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    try:
        await db.connect()
        logging.info("Database connected successfully")
    except Exception as e:
        logging.error(f"Database connection failed: {str(e)}")
        raise

@app.on_event("shutdown")
async def shutdown():
    try:
        await db.disconnect()
        logging.info("Database disconnected successfully")
    except Exception as e:
        logging.error(f"Database disconnection error: {str(e)}")



# Register Routes
app.include_router(register_router)
app.include_router(login_router)
app.include_router(fetchInternships_router)
app.include_router(addInternships_router)
app.include_router(admin_auth_router)
app.include_router(blog_router)
app.include_router(ats_router)

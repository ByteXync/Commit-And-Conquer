from fastapi import Request, HTTPException, Depends

def require_roles(roles: list):
    """
    Dependency for checking specific roles
    """
    def check_role(request: Request):
        user = request.state.user
        if not user or user.get("role") not in roles:
            raise HTTPException(status_code=403, detail="Insufficient permissions")
        return user
    return check_role
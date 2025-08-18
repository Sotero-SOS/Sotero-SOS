from fastapi import APIRouter, Request, Form, HTTPException
from fastapi.responses import JSONResponse
from backend.app.database.supabase_client import get_supabase_client
from passlib.context import CryptContext

router = APIRouter(
    prefix="/auth",
    tags=["AUTH"],
    responses={404: {"description": "Not found"}},
)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def is_authenticated(request: Request):
    return request.session.get("user") is not None

@router.post("/login")
async def login_post(
    request: Request,
    username: str = Form(...),
    password: str = Form(...)
):
    supabase = get_supabase_client()
    user_query = supabase.table("user").select("*").eq("username", username).execute()
    user = user_query.data[0] if user_query.data else None
    if not user or not pwd_context.verify(password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    request.session["user"] = user["username"]
    return JSONResponse(content={"message": "Login successful", "user": {"username": user["username"]}})

@router.get("/logout")
async def logout(request: Request):
    request.session.clear()
    return JSONResponse(content={"message": "Logout successful"})

@router.post("/register")
async def register_post(
    request: Request,
    username: str = Form(...),
    password: str = Form(...)
):
    supabase = get_supabase_client()
    user_query = supabase.table("user").select("*").eq("username", username).execute()
    user = user_query.data[0] if user_query.data else None
    if user:
        raise HTTPException(status_code=409, detail="User already exists")
    hashed_pwd = pwd_context.hash(password)
    supabase.table("user").insert({"username": username, "hashed_password": hashed_pwd}).execute()
    return JSONResponse(content={"message": "Registration successful"})
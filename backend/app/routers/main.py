from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates


# Rotas principais
router = APIRouter()
templates = Jinja2Templates(directory="backend/app/templates")

def is_authenticated(request: Request):
    return request.session.get("user") is not None


# Rota para a página inicial
@router.get("/", include_in_schema=False)
async def home(request: Request):
    if not is_authenticated(request):
        return RedirectResponse("/auth/login") # <-- redireciona para a tela de login se o usuário não estiver logado

    username = request.session.get("user")
    return templates.TemplateResponse("home.html", {"request": request, "user": {"username": username}})
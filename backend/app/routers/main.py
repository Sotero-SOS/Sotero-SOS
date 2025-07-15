from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates


# Rotas principais
router = APIRouter()
templates = Jinja2Templates(directory="backend/app/templates")

def user_esta_logado(request: Request):
    return request.session.get("user") is not None


# Rota para a página inicial
@router.get("/", include_in_schema=False)# <-- não inclui essa rota na documentação da API
async def home(request: Request):
    if not user_esta_logado(request):
        return RedirectResponse("/auth/login") # <-- redireciona para a tela de login se o usuário não estiver logado

    username = request.session.get("user")
    return templates.TemplateResponse("home.html", {"request": request, "user": {"username": username}})
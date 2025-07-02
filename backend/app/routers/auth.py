from fastapi import APIRouter, Depends, Request, Form, Response
from fastapi.responses import RedirectResponse, HTMLResponse
from fastapi.templating import Jinja2Templates
from sqlmodel import Session, select

from backend.app.database.models import User
from backend.app.database.database import get_database
from passlib.context import CryptContext

# Rotas de autenticação
router = APIRouter(
    prefix="/auth",
    tags=["AUTH"],
    responses={404: {"description": "Not found"}},
)
templates = Jinja2Templates(directory="backend/app/templates") # <-- local dos HTML's
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto") # <-- utiliza o bcrypt para criptografar as senhas


# Função para verificar se o usuário está autenticado (logado)
def is_authenticated(request: Request):
    return request.session.get("user") is not None


# Rota para a tela de login
@router.get("/login", response_class=HTMLResponse)
def login_get(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})

# Rota para processar o login
@router.post("/login")
def login_post(
    request: Request,
    response: Response,
    username: str = Form(...),
    password: str = Form(...),
    session: Session = Depends(get_database)
):
    user = session.exec(select(User).where(User.username == username)).first()
    if not user or not pwd_context.verify(password, user.hashed_password):
        return templates.TemplateResponse("login.html", {"request": request, "error": "Credenciais inválidas"})
    request.session["user"] = user.username
    return RedirectResponse("/", status_code=302)


# Rota para deslogar o usuário
@router.get("/logout")
def logout(request: Request):
    request.session.clear()
    return RedirectResponse("/auth/login")


# Rota para a tela de criação de usuário
@router.get("/register", response_class=HTMLResponse)
def register_get(request: Request):
    return templates.TemplateResponse("register.html", {"request": request})


# Rota para processar a criação de um novo usuário
@router.post("/register", response_class=HTMLResponse)
def register_post(
    request: Request,          #
    username: str = Form(...), # <-- Pega os dados do formulário no html
    password: str = Form(...), #
    session: Session = Depends(get_database)
):
    user = session.exec(select(User).where(User.username == username)).first()
    if user: # <-- Se o usuário já existe, recarrega a página de registro com uma mensagem de erro
        return templates.TemplateResponse("register.html", {"request": request, "error": "Usuário já existe"})

    hashed_pwd = pwd_context.hash(password) # <-- Criptografa a senha usando bcrypt
    user = User(username=username, hashed_password=hashed_pwd)
    session.add(user)     #
    session.commit()      # <-- Salva o usuário no banco de dados
    session.refresh(user) #
    return RedirectResponse("/auth/login", status_code=302)
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.middleware.sessions import SessionMiddleware
from contextlib import asynccontextmanager
from backend.app.database.models import *
from backend.app.database.database import criar_db_e_tables
from backend.app.routers import main, auth, test_db


# Cria o banco de dados e as tabelas antes de iniciar o aplicativo
@asynccontextmanager
async def lifespan(app: FastAPI):
    print(1111)
    criar_db_e_tables()
    yield

app = FastAPI(title="Sotero Site", lifespan=lifespan)
app.add_middleware(SessionMiddleware, secret_key="sotero_secret_key")


app.include_router(main.router) # <-- adiciona as rotas principais

app.include_router(test_db.router) # <-- adiciona as rotas de teste do banco de dados
app.include_router(auth.router) # <-- adiciona as rotas de autenticação
app.mount("/static", StaticFiles(directory="backend/app/static"), name="static") # <-- local de arquivos estáticos (css, js e imagens)
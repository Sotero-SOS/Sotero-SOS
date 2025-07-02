from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.middleware.sessions import SessionMiddleware
from contextlib import asynccontextmanager

from backend.app.database.database import create_db_and_tables
from backend.app.routers import api, main, auth


# Cria o banco de dados e as tabelas antes de iniciar o aplicativo
@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield

app = FastAPI(title="Sotero Site", lifespan=lifespan)
app.add_middleware(SessionMiddleware, secret_key="sotero_secret_key")


app.include_router(main.router) # <-- adiciona as rotas principais
app.include_router(auth.router) # <-- adiciona as rotas de autenticação
app.include_router(api.router) # <-- adiciona as rotas da API
app.mount("/static", StaticFiles(directory="backend/app/static"), name="static") # <-- local de arquivos estáticos (css, js e imagens)
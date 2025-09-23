from fastapi import FastAPI
from starlette.middleware.sessions import SessionMiddleware
from backend.app.routers import auth
from backend.app.routers.sos import setor_router, motivo_router, motorista_router, veiculo_router, atendimento_router, everything_router

app = FastAPI(title="Sotero Site")
app.add_middleware(SessionMiddleware, secret_key="sotero_secret_key")
app.include_router(auth.router)
app.include_router(setor_router)
app.include_router(motivo_router)
app.include_router(motorista_router)
app.include_router(veiculo_router)
app.include_router(atendimento_router)
app.include_router(everything_router)

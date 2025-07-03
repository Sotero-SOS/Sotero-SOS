from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from typing import List

from backend.app.database.models import User
from backend.app.database.database import get_database
from backend.app.database.schemas import UserRead

# Rotas para a API
router = APIRouter(
    prefix="/api",
    tags=["API"],
    responses={404: {"description": "Not found"}},
)

# Endpoint para obter todos os usuários
@router.get("/users", response_model=List[UserRead])
def get_users(session: Session = Depends(get_database)):
    users = session.exec(select(User)).all()
    return users


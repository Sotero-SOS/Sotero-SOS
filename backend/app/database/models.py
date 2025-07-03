from sqlmodel import SQLModel, Field
from typing import Optional

# Modelo de Usuário no banco
class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)
    hashed_password: str
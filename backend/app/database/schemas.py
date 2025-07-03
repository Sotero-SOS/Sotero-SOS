from pydantic import BaseModel

# Schema para criação de usuário
class UserCreate(BaseModel):
    username: str
    password: str

# Schema para leitura de usuário
class UserRead(BaseModel):
    id: int
    username: str
from pydantic import BaseModel
from typing import Optional
from datetime import date


class User(BaseModel):
    id: Optional[int] = None
    username: str
    hashed_password: str

    class Config:
        from_attributes = True

class Setor(BaseModel):
    id: Optional[int] = None
    nome_setor: str
    turno: Optional[str] = None
    endereco: Optional[str] = None

    class Config:
        from_attributes = True


class Motivo(BaseModel):
    id: Optional[int] = None
    nome: str
    ativo: bool = True

    class Config:
        from_attributes = True


class Motorista(BaseModel):
    id: Optional[int] = None
    nome: str
    ativo: bool = True
    setor_id: int

    class Config:
        from_attributes = True


class Veiculo(BaseModel):
    id: Optional[int] = None
    nome: str
    ativo: bool = True

    class Config:
        from_attributes = True


class Atendimento(BaseModel):
    id: Optional[int] = None
    data: date
    odometro: int
    oleo_motor: bool = False
    filtro_oleo: bool = False
    filtro_ar: bool = False
    filtro_combustivel: bool = False
    filtro_cabine: bool = False
    oleo_cambio: bool = False
    oleo_diferencial: bool = False
    oleo_hidraulico: bool = False
    graxa_geral: bool = False
    verificacoes_gerais: bool = False
    observacoes: Optional[str] = None
    veiculo_id: int
    motorista_id: int
    motivo_id: int

    class Config:
        from_attributes = True



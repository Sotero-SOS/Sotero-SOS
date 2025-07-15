from datetime import datetime, date, time
from typing import Optional, List

from sqlalchemy import (
    Column, Integer, String, Date, DateTime, Time, ForeignKey, Text, Boolean, UniqueConstraint
)
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)

class Setor(Base):
    __tablename__ = "setor"
    id = Column(Integer, primary_key=True, autoincrement=True)
    nome_setor = Column(String(100), unique=True, index=True, nullable=False)
    turno = Column(String(20), nullable=True)
    endereco = Column(String(255), nullable=True)

    motoristas = relationship("Motorista", back_populates="setor")

class Motorista(Base):
    __tablename__ = "motorista"
    matricula = Column(Integer, primary_key=True, nullable=False)
    nome = Column(String(100), nullable=False)
    setor_id = Column(Integer, ForeignKey("setor.id"), nullable=True)

    veiculo = relationship("Veiculo", uselist=False, back_populates="motorista")
    atendimentos = relationship("Atendimento", back_populates="motorista")
    setor = relationship("Setor", back_populates="motoristas")

class Veiculo(Base):
    __tablename__ = "veiculo"
    cod_veiculo = Column(Integer, primary_key=True, nullable=False)
    categoria = Column(String(50), nullable=True)
    situacao = Column(String(50), nullable=True)
    matricula_funcionario = Column(Integer, ForeignKey("motorista.matricula"), unique=True, nullable=False)

    motorista = relationship("Motorista", back_populates="veiculo", uselist=False)

class Motivo(Base):
    __tablename__ = "motivo"
    cod_motivo = Column(Integer, primary_key=True, nullable=False)
    descricao = Column(String(255), index=True, nullable=False)
    tempo_previsto = Column(Time, nullable=True)

    atendimentos = relationship("Atendimento", back_populates="motivo")

class Atendimento(Base):
    __tablename__ = "atendimento"
    nr_atendimento = Column(Integer, primary_key=True, nullable=False)
    auxiliar_de_trafego = Column(String(100), nullable=True)
    fiscal = Column(String(100), nullable=True)
    data = Column(Date, nullable=True)
    inicio_sos = Column(Time, nullable=True)
    chegada_na_garagem = Column(Time, nullable=True)
    final_sos = Column(Time, nullable=True)
    status = Column(String(30), default="Aberto", nullable=True)
    local = Column(String(100), nullable=True)

    matricula_motorista = Column(Integer, ForeignKey("motorista.matricula"), nullable=False)
    cod_motivo = Column(Integer, ForeignKey("motivo.cod_motivo"), nullable=False)

    motorista = relationship("Motorista", back_populates="atendimentos")
    motivo = relationship("Motivo", back_populates="atendimentos")
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from backend.app.database.models import *


DATABASE_URL = "sqlite:///./backend/sotero.db"
engine = create_engine(DATABASE_URL, echo=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Cria o banco de dados e as tabelas
def criar_db_e_tables():
    Base.metadata.create_all(engine)

# Permite que as rotas acessem a sessão do banco de dados
def get_database():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
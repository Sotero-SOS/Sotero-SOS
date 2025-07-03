from sqlmodel import SQLModel, create_engine, Session


DATABASE_URL = "sqlite:///./backend/sotero.db"
engine = create_engine(DATABASE_URL, echo=True)

# Cria o banco de dados e as tabelas
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

# Permite que as rotas acessem a sessão do banco de dados
def get_database():
    with Session(engine) as session:
        yield session
from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates

from fastapi import Form, Depends
from sqlalchemy.orm import Session
from backend.app.database.database import get_database
from backend.app.database.models import Setor, User, Motivo, Motorista, Veiculo, Atendimento
from backend.app.routers.main import user_esta_logado
from datetime import datetime, date, time


router = APIRouter(
    prefix="/test_db",
    tags=["TEST_DB"],
    responses={404: {"description": "Not found"}},)

templates = Jinja2Templates(directory="backend/app/templates") #<-- local dos HTML's


#Rota padrão para os testes
@router.get("/")
async def test_db(
    request: Request,
    session: Session = Depends(get_database)
):
    setores = session.query(Setor).all()
    motoristas = session.query(Motorista).all()
    motivos = session.query(Motivo).all()
    veiculos = session.query(Veiculo).all()
    atendimentos = session.query(Atendimento).all()

    if not user_esta_logado(request):
        return RedirectResponse("/auth/login")
    return templates.TemplateResponse("test_db.html", {"request": request, "setores": setores,
                                                       "motoristas": motoristas, "motivos": motivos,
                                                       "veiculos": veiculos, "atendimentos": atendimentos})


#
#Rotas para Setor
#
@router.post("/setor/edit/{setor_id}") #<-- rota POST para editar setor
async def edit_setor_post(
    setor_id: int,
    nome_setor: str = Form(...),
    turno: str = Form(...),
    endereco: str = Form(...),
    session: Session = Depends(get_database)
):
    setor = session.query(Setor).filter(Setor.id == setor_id).first()
    if not setor:
        return RedirectResponse("/test_db", status_code=404)
    setor.nome_setor = nome_setor
    setor.turno = turno
    setor.endereco = endereco
    session.commit()
    session.refresh(setor)
    return RedirectResponse("/test_db", status_code=302)

@router.get("/setor/edit/{setor_id}") #<-- rota GET para mostrar o formulário de edição do setor
async def edit_setor_get(request: Request, setor_id: int, session: Session = Depends(get_database)):
    if not user_esta_logado(request):
        return RedirectResponse("/auth/login")
    setor = session.query(Setor).filter(Setor.id == setor_id).first()
    return templates.TemplateResponse("edit_setor.html", {"request": request, "setor": setor})

@router.post("/setor") #<-- rota POST para criar um novo setor
async  def create_setor_post(
    nome_setor: str = Form(...),
    turno: str = Form(...),
    endereco: str = Form(...),
    session: Session = Depends(get_database)
):
    setor = Setor(nome_setor=nome_setor, turno=turno, endereco=endereco)
    session.add(setor)
    session.commit()
    session.refresh(setor)
    return RedirectResponse("/test_db", status_code=302)

#
#Rotas para Motivo
#
@router.get("/motivo/edit/{motivo_id}") #<-- rota GET para mostrar o formulário de edição do motivo
async def edit_motivo_get(request: Request, motivo_id: int, session: Session = Depends(get_database)):
    if not user_esta_logado(request):
        return RedirectResponse("/auth/login")
    motivo = session.query(Motivo).filter(Motivo.cod_motivo == motivo_id).first()
    return templates.TemplateResponse("edit_motivo.html", {"request": request, "motivo": motivo})

@router.post("/motivo/edit/{motivo_id}") #<-- rota POST para editar motivo
async def edit_motivo_post(
    motivo_id: int,
    descricao: str = Form(...),
    tempo_previsto: str = Form(...),
    session: Session = Depends(get_database)
):
    motivo = session.query(Motivo).filter(Motivo.cod_motivo == motivo_id).first()
    if not motivo:
        return RedirectResponse("/test_db", status_code=404)

    h, m, s = map(int, tempo_previsto.split(":"))
    tempo_previsto_time = time(h, m, s) # Converte a string de tempo para um objeto time

    motivo.descricao = descricao
    motivo.tempo_previsto = tempo_previsto_time
    session.commit()
    session.refresh(motivo)
    return RedirectResponse("/test_db", status_code=302)



@router.post("/motivo") #<-- rota POST para criar um novo motivo
async def create_motivo_post(
    descricao: str = Form(...),
    tempo_previsto: str = Form(...),
    session: Session = Depends(get_database)
):
    # Convert the string to a time object
    h, m, s = map(int, tempo_previsto.split(":"))
    tempo_previsto_time = time(h, m, s)
    motivo = Motivo(descricao=descricao, tempo_previsto=tempo_previsto_time)
    session.add(motivo)
    session.commit()
    session.refresh(motivo)
    return RedirectResponse("/test_db", status_code=302)

#
# Rotas para Motorista
#
@router.get("/motorista/edit/{motorista_id}") #<-- rota GET para mostrar o formulário de edição do motorista
async def edit_motorista_get(request: Request, motorista_id: int, session: Session = Depends(get_database)):
    if not user_esta_logado(request):
        return RedirectResponse("/auth/login")
    motorista = session.query(Motorista).filter(Motorista.matricula == motorista_id).first()
    setores = session.query(Setor).all()
    return templates.TemplateResponse("edit_motorista.html", {"request": request, "motorista": motorista, "setores": setores})

@router.post("/motorista/edit/{motorista_id}") #<-- rota POST para editar motorista
async def edit_motorista_post(
    motorista_id: int,
    nome: str = Form(...),
    setor_id: int = Form(...),
    session: Session = Depends(get_database)
):
    motorista = session.query(Motorista).filter(Motorista.matricula == motorista_id).first()
    if not motorista:
        return RedirectResponse("/test_db", status_code=404)
    motorista.nome = nome
    motorista.setor_id = setor_id
    session.commit()
    session.refresh(motorista)
    return RedirectResponse("/test_db", status_code=302)

@router.post("/motorista") #<-- rota POST para criar um novo motorista
async def create_motorista_post(
    matricula: int = Form(...),
    nome: str = Form(...),
    setor_id: int = Form(...),
    session: Session = Depends(get_database)
):
    motorista = Motorista(matricula=matricula, nome=nome, setor_id=setor_id)
    session.add(motorista)
    session.commit()
    session.refresh(motorista)
    return RedirectResponse("/test_db", status_code=302)


#
# Rotas para Veículo
#
@router.get("/veiculo/edit/{veiculo_id}") #<-- rota GET para mostrar o formulário de edição do veículo
async def edit_veiculo_get(request: Request, veiculo_id: int, session: Session = Depends(get_database)):
    if not user_esta_logado(request):
        return RedirectResponse("/auth/login")
    veiculo = session.query(Veiculo).filter(Veiculo.cod_veiculo == veiculo_id).first()
    motoristas = session.query(Motorista).all()
    return templates.TemplateResponse("edit_veiculo.html", {"request": request, "veiculo": veiculo, "motoristas": motoristas})

@router.post("/veiculo/edit/{veiculo_id}") #<-- rota POST para editar veículo
async def edit_veiculo_post(
    veiculo_id: int,
    categoria: str = Form(...),
    situacao: str = Form(...),
    matricula_funcionario: int = Form(...),
    session: Session = Depends(get_database)
):
    veiculo = session.query(Veiculo).filter(Veiculo.cod_veiculo == veiculo_id).first()
    if not veiculo:
        return RedirectResponse("/test_db", status_code=404)
    veiculo.categoria = categoria
    veiculo.situacao = situacao
    veiculo.matricula_funcionario = matricula_funcionario
    session.commit()
    session.refresh(veiculo)
    return RedirectResponse("/test_db", status_code=302)

@router.post("/veiculo") #<-- rota POST para criar um novo veículo
async def create_veiculo_post(
    cod_veiculo: int = Form(...),
    categoria: str = Form(...),
    situacao: str = Form(...),
    matricula_funcionario: int = Form(...),
    session: Session = Depends(get_database)
):
    veiculo = Veiculo(cod_veiculo=cod_veiculo, categoria=categoria, situacao=situacao, matricula_funcionario=matricula_funcionario)
    session.add(veiculo)
    session.commit()
    session.refresh(veiculo)
    return RedirectResponse("/test_db", status_code=302)


#
# Rotas para Atendimento
#
@router.post("/atendimento") #<-- rota POST para criar um novo atendimento
async def create_atendimento_post(
    matricula_motorista: int = Form(...),
    cod_motivo: int = Form(...),
    local: str = Form(...),
    session: Session = Depends(get_database)
):
    # Pega a data e hora atuais
    agora = datetime.now()
    data_de_hoje = agora.date()
    horario_de_agora = agora.time()

    # Create Atendimento with automatic date and time
    atendimento = Atendimento(
        matricula_motorista=matricula_motorista,
        cod_motivo=cod_motivo,
        local=local,
        status="Aberto",
        data=data_de_hoje,
        inicio_sos=horario_de_agora
    )
    session.add(atendimento)
    session.commit()
    session.refresh(atendimento)
    return RedirectResponse("/test_db", status_code=302)

@router.get("/atendimento/edit/{atendimento_id}") #<-- rota GET para mostrar o formulário de edição do atendimento
async def edit_atendimento_get(request: Request, atendimento_id: int, session: Session = Depends(get_database)):
    if not user_esta_logado(request):
        return RedirectResponse("/auth/login")
    atendimento = session.query(Atendimento).filter(Atendimento.nr_atendimento == atendimento_id).first()
    motoristas = session.query(Motorista).all()
    motivos = session.query(Motivo).all()
    return templates.TemplateResponse("edit_atendimento.html", {"request": request, "atendimento": atendimento, "motoristas": motoristas, "motivos": motivos})

@router.post("/atendimento/edit/{atendimento_id}") #<-- rota POST para editar atendimento
async def edit_atendimento_post(
    atendimento_id: int,
    chegada_na_garagem: str = Form(None),
    final_sos: str = Form(None),
    status: str = Form(None),
    auxiliar_de_trafego: str = Form(None),
    fiscal: str = Form(None),
    session: Session = Depends(get_database)
):
    atendimento = session.query(Atendimento).filter(Atendimento.nr_atendimento == atendimento_id).first()
    if not atendimento:
        return RedirectResponse("/test_db", status_code=404)

    # coverte os campos de hora para objetos time, se fornecidos
    if chegada_na_garagem:
        h, m, s = map(int, chegada_na_garagem.split(":"))
        atendimento.chegada_na_garagem = time(h, m, s)
    if final_sos:
        h, m, s = map(int, final_sos.split(":"))
        atendimento.final_sos = time(h, m, s)

    atendimento.status = status
    atendimento.auxiliar_de_trafego = auxiliar_de_trafego
    atendimento.fiscal = fiscal
    session.commit()
    session.refresh(atendimento)
    return RedirectResponse("/test_db", status_code=302)
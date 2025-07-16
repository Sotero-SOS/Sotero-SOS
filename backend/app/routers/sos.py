from fastapi import APIRouter, Form, Request
from fastapi.responses import JSONResponse
from backend.app.database.supabase_client import get_supabase_client
from datetime import datetime

# --- Setor Router ---
setor_router = APIRouter(
    prefix="/sos/setor",
    tags=["Setor"],
    responses={404: {"description": "Not found"}},
)

@setor_router.patch("/edit/{setor_id}")
async def edit_setor(setor_id: int, nome_setor: str = Form(...), turno: str = Form(...), endereco: str = Form(...)):
    supabase = get_supabase_client()
    supabase.table("setor").update({
        "nome_setor": nome_setor,
        "turno": turno,
        "endereco": endereco
    }).eq("id", setor_id).execute()
    return JSONResponse(content={"message": "Setor updated successfully"})

@setor_router.get("/{setor_id}")
async def get_setor(setor_id: int):
    supabase = get_supabase_client()
    setor = supabase.table("setor").select("*").eq("id", setor_id).execute().data
    return JSONResponse(content={"setor": setor[0] if setor else None})

@setor_router.post("/create")
async def create_setor(nome_setor: str = Form(...), turno: str = Form(...), endereco: str = Form(...)):
    supabase = get_supabase_client()
    supabase.table("setor").insert({"nome_setor": nome_setor, "turno": turno, "endereco": endereco}).execute()
    return JSONResponse(content={"message": "Setor created successfully"})


# --- Motivo Router ---
motivo_router = APIRouter(
    prefix="/sos/motivo",
    tags=["Motivo"],
    responses={404: {"description": "Not found"}},
)

@motivo_router.get("/{motivo_id}")
async def get_motivo(motivo_id: int):
    supabase = get_supabase_client()
    motivo = supabase.table("motivo").select("*").eq("cod_motivo", motivo_id).execute().data
    return JSONResponse(content={"motivo": motivo[0] if motivo else None})

@motivo_router.patch("/edit/{motivo_id}")
async def edit_motivo(motivo_id: int, descricao: str = Form(...), tempo_previsto: str = Form(...)):
    supabase = get_supabase_client()
    supabase.table("motivo").update({
        "descricao": descricao,
        "tempo_previsto": tempo_previsto
    }).eq("cod_motivo", motivo_id).execute()
    return JSONResponse(content={"message": "Motivo updated successfully"})

@motivo_router.post("/create")
async def create_motivo(descricao: str = Form(...), tempo_previsto: str = Form(...)):
    supabase = get_supabase_client()
    supabase.table("motivo").insert({"descricao": descricao, "tempo_previsto": tempo_previsto}).execute()
    return JSONResponse(content={"message": "Motivo created successfully"})


# --- Motorista Router ---
motorista_router = APIRouter(
    prefix="/sos/motorista",
    tags=["Motorista"],
    responses={404: {"description": "Not found"}},
)

@motorista_router.get("/{motorista_id}")
async def get_motorista(motorista_id: int):
    supabase = get_supabase_client()
    motorista = supabase.table("motorista").select("*").eq("matricula", motorista_id).execute().data
    return JSONResponse(content={"motorista": motorista[0] if motorista else None})

@motorista_router.patch("/edit/{motorista_id}")
async def edit_motorista(motorista_id: int, nome: str = Form(...), setor_id: int = Form(...)):
    supabase = get_supabase_client()
    supabase.table("motorista").update({
        "nome": nome,
        "setor_id": setor_id
    }).eq("matricula", motorista_id).execute()
    return JSONResponse(content={"message": "Motorista updated successfully"})

@motorista_router.post("/")
async def create_motorista(matricula: int = Form(...), nome: str = Form(...), setor_id: int = Form(...)):
    supabase = get_supabase_client()
    supabase.table("motorista").insert({"matricula": matricula, "nome": nome, "setor_id": setor_id}).execute()
    return JSONResponse(content={"message": "Motorista created successfully"})


# --- Veiculo Router ---
veiculo_router = APIRouter(
    prefix="/sos/veiculo",
    tags=["Veiculo"],
    responses={404: {"description": "Not found"}},
)

@veiculo_router.get("/{veiculo_id}")
async def get_veiculo(veiculo_id: int):
    supabase = get_supabase_client()
    veiculo = supabase.table("veiculo").select("*").eq("cod_veiculo", veiculo_id).execute().data
    return JSONResponse(content={"veiculo": veiculo[0] if veiculo else None})

@veiculo_router.patch("/edit/{veiculo_id}")
async def edit_veiculo(
    veiculo_id: int, categoria: str = Form(...), situacao: str = Form(...), matricula_funcionario: int = Form(...)
):
    supabase = get_supabase_client()
    supabase.table("veiculo").update({
        "categoria": categoria,
        "situacao": situacao,
        "matricula_funcionario": matricula_funcionario
    }).eq("cod_veiculo", veiculo_id).execute()
    return JSONResponse(content={"message": "Veiculo updated successfully"})

@veiculo_router.post("/create")
async def create_veiculo(
    cod_veiculo: int = Form(...), categoria: str = Form(...), situacao: str = Form(...), matricula_funcionario: int = Form(...)
):
    supabase = get_supabase_client()
    supabase.table("veiculo").insert({
        "cod_veiculo": cod_veiculo,
        "categoria": categoria,
        "situacao": situacao,
        "matricula_funcionario": matricula_funcionario
    }).execute()
    return JSONResponse(content={"message": "Veiculo created successfully"})


# --- Atendimento Router ---
atendimento_router = APIRouter(
    prefix="/sos/atendimento",
    tags=["Atendimento"],
    responses={404: {"description": "Not found"}},
)

@atendimento_router.post("/create")
async def create_atendimento(
    matricula_motorista: int = Form(...), cod_motivo: int = Form(...), local: str = Form(...)
):
    supabase = get_supabase_client()
    agora = datetime.now()
    data_de_hoje = agora.date().isoformat()
    horario_de_agora = agora.time().isoformat(timespec="seconds")
    supabase.table("atendimento").insert({
        "matricula_motorista": matricula_motorista,
        "cod_motivo": cod_motivo,
        "local": local,
        "status": "Aberto",
        "data": data_de_hoje,
        "inicio_sos": horario_de_agora
    }).execute()
    return JSONResponse(content={"message": "Atendimento created successfully"})

@atendimento_router.get("/{atendimento_id}")
async def get_atendimento(atendimento_id: int):
    supabase = get_supabase_client()
    atendimento = supabase.table("atendimento").select("*").eq("nr_atendimento", atendimento_id).execute().data
    return JSONResponse(content={"atendimento": atendimento[0] if atendimento else None})

@atendimento_router.patch("/edit/{atendimento_id}")
async def edit_atendimento(
    atendimento_id: int,
    chegada_na_garagem: str = Form(None),
    final_sos: str = Form(None),
    status: str = Form(None),
    auxiliar_de_trafego: str = Form(None),
    fiscal: str = Form(None),
):
    supabase = get_supabase_client()
    data = {}
    if chegada_na_garagem:
        data["chegada_na_garagem"] = chegada_na_garagem
    if final_sos:
        data["final_sos"] = final_sos
    if status:
        data["status"] = status
    if auxiliar_de_trafego:
        data["auxiliar_de_trafego"] = auxiliar_de_trafego
    if fiscal:
        data["fiscal"] = fiscal
    if data:
        supabase.table("atendimento").update(data).eq("nr_atendimento", atendimento_id).execute()
    return JSONResponse(content={"message": "Atendimento updated successfully"})


# --- Everything Router ---
everything_router = APIRouter(
    prefix="/sos",
    tags=["SOS"],
    responses={404: {"description": "Not found"}},
)

@everything_router.get("/", include_in_schema=False)
async def get_everything():
    supabase = get_supabase_client()
    setores = supabase.table("setor").select("*").execute().data
    motivos = supabase.table("motivo").select("*").execute().data
    motoristas = supabase.table("motorista").select("*").execute().data
    veiculos = supabase.table("veiculo").select("*").execute().data
    atendimentos = supabase.table("atendimento").select("*").execute().data
    return JSONResponse(content={
        "setores": setores,
        "motivos": motivos,
        "motoristas": motoristas,
        "veiculos": veiculos,
        "atendimentos": atendimentos
    })

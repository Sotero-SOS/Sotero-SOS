// Tipos auxiliares para as tabelas
export type Setor = {
    id: number;
    nome_setor: string;
    turno: string | null;
};

export type Veiculo = {
    cod_veiculo: number;
    categoria: string | null;
    situacao: string | null;
};

export type Motorista = {
    matricula: number;
    nome: string;
    setor_id: number | null;
    cod_veiculo: number | null;
};

export type Motivo = {
    cod_motivo: number;
    descricao: string;
    tempo_previsto: string | null; // HH:MM:SS
};

export type Atendimento = {
    nr_atendimento: number;
    auxiliar_de_trafego: string | null;
    fiscal: string | null;
    data: string | null; // YYYY-MM-DD
    inicio_sos: string | null; // HH:MM:SS
    chegada_na_garagem: string | null; // HH:MM:SS
    final_sos: string | null; // HH:MM:SS
    status: string | null; // 'Aberto' | 'Fechado' | etc
    local: string | null;
    matricula_motorista: number;
    atrasado: boolean;
    cod_motivo: number;
    cod_veiculo: number;
};

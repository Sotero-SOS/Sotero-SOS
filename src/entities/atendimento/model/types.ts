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

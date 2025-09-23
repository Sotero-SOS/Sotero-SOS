import { Motorista } from "@/entities";

export type MotoristaExpandido = Motorista & {
	setor_nome?: string | null;
	veiculo_categoria?: string | null;
};

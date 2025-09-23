import type { Driver, Motivo, Veiculo } from "@/entities";

export type FormAtendimentoProps = {
	motoristas: Driver[];
	setMotoristas: (value: Driver) => void;
	motivos: Motivo[];
	setMotivos: (value: Motivo[]) => void;
	veiculos: Veiculo[];
	setVeiculos: (value: Veiculo[]) => void;
	matricula: number | "";
	setMatricula: (value: number | "") => void;
	codMotivo: number | "";
	setCodMotivo: (value: number | "") => void;
	local: string;
	setLocal: (value: string) => void;
	carregando: boolean;
	setCarregando: (value: boolean) => void;
	statusMsg: string | null;
	setStatusMsg: (msg: string | null) => void;
};

export const FormAtendimentoProps = {} as FormAtendimentoProps;

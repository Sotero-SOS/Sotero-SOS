import { supabase } from "@/app/api/supabaseClient";
import { type FormAtendimentoProps } from "../index";

export const carregarMotivos = async (props: FormAtendimentoProps) => {
	const { data, error } = await supabase
		.from("motivo")
		.select("*")
		.order("descricao", { ascending: true });

	if (error) {
		console.error(error);
		props.setStatusMsg("Erro ao carregar motivos.");
	} else {
		props.setMotivos(data ?? []);
	}
};
export const carregarVeiculos = async (props: FormAtendimentoProps) => {
	const { data, error } = await supabase
		.from("veiculo")
		.select("*")
		.order("cod_veiculo", { ascending: true });

	if (error) {
		console.error(error);
		props.setStatusMsg("Erro ao carregar veículos.");
	} else {
		props.setVeiculos(data ?? []);
	}
};

export const carregarMotoristas = async (props: FormAtendimentoProps) => {
	const { data, error } = await supabase
		.from("motorista")
		.select("*")
		.order("nome", { ascending: true });

	if (error) {
		console.error(error);
		props.setStatusMsg("Erro ao carregar motoristas.");
	} else if (data) {
		props.setMotoristas(data ?? []);
	}
};

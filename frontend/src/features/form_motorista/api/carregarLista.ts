import { supabase } from "@/app/api/supabaseClient";
import type { MotoristaExpandido } from "../model/types";
import type { Setor, Veiculo } from "@/entities";
import type React from "react";

export const carregarLista = async (props: {
	setLista: React.Dispatch<React.SetStateAction<MotoristaExpandido[]>>;
	setStatusMsg: React.Dispatch<React.SetStateAction<string | null>>;
	setCarregandoLista: React.Dispatch<React.SetStateAction<boolean>>;
	setores: Setor[];
	veiculos: Veiculo[];
}) => {
	props.setCarregandoLista(true);
	const { data: motData, error } = await supabase
		.from("motorista")
		.select("*")
		.order("nome", { ascending: true });
	if (error) {
		props.setStatusMsg(`Erro ao carregar motoristas: ${error.message}`);
		props.setCarregandoLista(false);
		return;
	}
	const setorMap = new Map(props.setores.map((s) => [s.id, s.nome_setor]));
	const veicMap = new Map(
		props.veiculos.map((v) => [v.cod_veiculo, v.categoria])
	);

	const expandidos: MotoristaExpandido[] = (motData ?? []).map((m) => ({
		...m,
		setor_nome: setorMap.get(m.setor_id ?? -1) ?? null,
		veiculo_categoria: veicMap.get(m.cod_veiculo ?? -1) ?? null,
	}));
	props.setLista(expandidos);
	props.setCarregandoLista(false);
};

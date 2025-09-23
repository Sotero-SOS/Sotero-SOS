import { supabase } from "@/app/api/supabaseClient";
import type { Motivo } from "@/entities";
import type React from "react";

export const carregarLista = async (props: {
	setLista: React.Dispatch<React.SetStateAction<Motivo[]>>;
	setStatusMsg: React.Dispatch<React.SetStateAction<string | null>>;
	setCarregandoLista: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const { setLista, setStatusMsg, setCarregandoLista } = props;
	setCarregandoLista(true);
	const { data, error } = await supabase
		.from("motivo")
		.select("*")
		.order("descricao", { ascending: true });
	if (error) {
		setStatusMsg(`Erro ao carregar lista: ${error.message}`);
	} else {
		setLista(data || []);
	}
	setCarregandoLista(false);
};

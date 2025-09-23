import { supabase } from "@/app/api/supabaseClient";
import type { Veiculo } from "@/entities";

export const carregarLista = async ([
	setCarregandoLista,
	setStatusMsg,
	setLista,
]: [
	React.Dispatch<React.SetStateAction<boolean>>,
	React.Dispatch<React.SetStateAction<string | null>>,
	React.Dispatch<React.SetStateAction<Veiculo[]>>
]) => {
	setCarregandoLista(true);
	const { data, error } = await supabase
		.from("veiculo")
		.select("*")
		.order("cod_veiculo", { ascending: true });
	if (error) {
		setStatusMsg(`Erro ao carregar lista: ${error.message}`);
	} else {
		setLista(data || []);
	}
	setCarregandoLista(false);
};

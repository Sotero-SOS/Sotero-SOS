import { supabase } from "@/app/api/supabaseClient";
import type { Setor } from "@/entities";

export const carregarLista = async (props: {
	setLista: React.Dispatch<React.SetStateAction<Setor[]>>;
	setStatusMsg: React.Dispatch<React.SetStateAction<string | null>>;
	setCarregandoLista: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	props.setCarregandoLista(true);
	const { data, error } = await supabase
		.from("setor")
		.select("*")
		.order("nome_setor", { ascending: true });
	if (error) {
		props.setStatusMsg(`Erro ao carregar lista: ${error.message}`);
	} else {
		props.setLista(data || []);
	}
	props.setCarregandoLista(false);
};

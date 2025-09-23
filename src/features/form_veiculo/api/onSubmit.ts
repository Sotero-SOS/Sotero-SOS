import { supabase } from "@/app/api/supabaseClient";
import { carregarLista } from "./carregarLista";
import type { Veiculo } from "@/entities/";

export const onSubmit = async (
	props: {
		codigo: number | "";
		categoriaId: number | "";
		situacao: string;
		setCodigo: React.Dispatch<React.SetStateAction<number | "">>;
		setCategoriaId: React.Dispatch<React.SetStateAction<number | "">>;
		setSituacao: React.Dispatch<React.SetStateAction<string>>;
		setStatusMsg: React.Dispatch<React.SetStateAction<string | null>>;
		setCarregando: React.Dispatch<React.SetStateAction<boolean>>;
		setLista: React.Dispatch<React.SetStateAction<Veiculo[]>>;
	},
	e: React.FormEvent
) => {
	e.preventDefault();

	if (!props.codigo || !props.categoriaId) {
		props.setStatusMsg("Informe o código e selecione a categoria.");
		return;
	}

	props.setCarregando(true);
	const { error } = await supabase.from("veiculo").insert({
		cod_veiculo: Number(props.codigo),
		categoria: props.categoriaId || null,
		situacao: props.situacao.trim() || null,
	});

	props.setCarregando(false);
	if (error) {
		props.setStatusMsg(`Erro ao salvar: ${error.message}`);
	} else {
		props.setStatusMsg("Veículo adicionado com sucesso!");
		props.setCodigo("");
		props.setCategoriaId("");
		props.setSituacao("");
		carregarLista([
			props.setCarregando,
			props.setStatusMsg,
			props.setLista,
		]);
	}
};

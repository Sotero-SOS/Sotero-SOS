import React from "react";
import { supabase } from "@/app/api/supabaseClient";
import { normalizarHora } from "../lib/utils";
import { carregarLista } from "./carregarLista";

export const onSubmit = async (props: {
	e: React.FormEvent;
	descricao: string;
	tempoPrevisto: string;
	setStatusMsg: React.Dispatch<React.SetStateAction<string | null>>;
	setCarregando: React.Dispatch<React.SetStateAction<boolean>>;
	setDescricao: React.Dispatch<React.SetStateAction<string>>;
	setTempoPrevisto: React.Dispatch<React.SetStateAction<string>>;
}) => {
	const {
		e,
		descricao,
		tempoPrevisto,
		setStatusMsg,
		setCarregando,
		setDescricao,
		setTempoPrevisto,
	} = props;
	e.preventDefault();
	setStatusMsg(null);

	if (!descricao.trim() || !tempoPrevisto) {
		setStatusMsg("Informe a descrição e o tempo previsto.");
		return;
	}

	setCarregando(true);
	const { error } = await supabase.from("motivo").insert({
		descricao: descricao.trim(),
		tempo_previsto: normalizarHora(tempoPrevisto),
	});

	setCarregando(false);
	if (error) {
		setStatusMsg(`Erro ao salvar: ${error.message}`);
	} else {
		setStatusMsg("Motivo adicionado com sucesso!");
		setDescricao("");
		setTempoPrevisto("");
		carregarLista({
			setLista: () => {},
			setStatusMsg,
			setCarregandoLista: () => {},
		});
	}
};

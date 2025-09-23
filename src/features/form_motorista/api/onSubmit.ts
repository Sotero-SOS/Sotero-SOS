import { carregarLista } from "./carregarLista";
import { supabase } from "@/app/api/supabaseClient";
import type { MotoristaExpandido } from "../model/types";
import type { Setor, Veiculo } from "@/entities";
import type React from "react";

export const onSubmit = async (props: {
	e: React.FormEvent;
	matricula: number | "";
	nome: string;
	setorId: number | "";
	codVeiculo: number | "";
	setStatusMsg: React.Dispatch<React.SetStateAction<string | null>>;
	setCarregando: React.Dispatch<React.SetStateAction<boolean>>;
	setMatricula: React.Dispatch<React.SetStateAction<number | "">>;
	setNome: React.Dispatch<React.SetStateAction<string>>;
	setSetorId: React.Dispatch<React.SetStateAction<number | "">>;
	setCodVeiculo: React.Dispatch<React.SetStateAction<number | "">>;
	setLista: React.Dispatch<React.SetStateAction<MotoristaExpandido[]>>;
	setCarregandoLista: React.Dispatch<React.SetStateAction<boolean>>;
	setores: Setor[];
	veiculos: Veiculo[];
}) => {
	const {
		e,
		matricula,
		nome,
		setorId,
		codVeiculo,
		setStatusMsg,
		setCarregando,
		setMatricula,
		setNome,
		setSetorId,
		setCodVeiculo,
		setLista,
		setCarregandoLista,
		setores,
		veiculos,
	} = props;
	e.preventDefault();
	setStatusMsg(null);

	if (
		matricula === "" ||
		!nome.trim() ||
		setorId === "" ||
		codVeiculo === ""
	) {
		setStatusMsg("Informe matrícula, nome, setor e veículo.");
		return;
	}

	setCarregando(true);
	const { error } = await supabase.from("motorista").insert({
		matricula: Number(matricula),
		nome: nome.trim(),
		setor_id: Number(setorId),
		cod_veiculo: Number(codVeiculo),
	});

	setCarregando(false);
	if (error) {
		setStatusMsg(`Erro ao salvar: ${error.message}`);
	} else {
		setStatusMsg("Motorista adicionado com sucesso!");
		setMatricula("");
		setNome("");
		setSetorId("");
		setCodVeiculo("");
		carregarLista({
			setLista,
			setStatusMsg,
			setCarregandoLista,
			setores,
			veiculos,
		});
	}
};

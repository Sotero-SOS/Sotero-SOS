import React from "react";
import { supabase } from "@/app/api/supabaseClient";
import type { Atendimento, Motorista, Motivo, Veiculo } from "@/entities";

export const carregarAtendimentos = async (props: {
	setAtendimentos: React.Dispatch<React.SetStateAction<Atendimento[]>>;
	setMotoristas: React.Dispatch<React.SetStateAction<Motorista[]>>;
	setMotivos: React.Dispatch<React.SetStateAction<Motivo[]>>;
	setVeiculos: React.Dispatch<React.SetStateAction<Veiculo[]>>;
	setCarregando: React.Dispatch<React.SetStateAction<boolean>>;
	setErro: React.Dispatch<React.SetStateAction<string | null>>;
	mostrarLoading: boolean;
}) => {
	const {
		setAtendimentos,
		setMotoristas,
		setMotivos,
		setVeiculos,
		setCarregando,
		setErro,
		mostrarLoading,
	} = props;

	if (mostrarLoading) setCarregando(true);
	setErro(null);
	const [aRes, mRes, moRes, vRes] = await Promise.all([
		supabase
			.from("atendimento")
			.select("*")
			.order("nr_atendimento", { ascending: false }),
		supabase.from("motorista").select("*"),
		supabase.from("motivo").select("*"),
		supabase.from("veiculo").select("*"),
	]);
	if (aRes.error || mRes.error || moRes.error || vRes.error) {
		setErro(
			aRes.error?.message ||
				mRes.error?.message ||
				moRes.error?.message ||
				vRes.error?.message ||
				"Erro ao carregar dados."
		);
		if (mostrarLoading) setCarregando(false);
		return;
	}
	setAtendimentos(aRes.data ?? []);
	setMotoristas(mRes.data ?? []);
	setMotivos(moRes.data ?? []);
	setVeiculos(vRes.data ?? []);
	setCarregando(false);
};

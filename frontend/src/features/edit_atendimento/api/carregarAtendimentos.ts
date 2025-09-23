import { supabase } from "@/app/api/supabaseClient";
import type { Atendimento, Motorista, Motivo, Veiculo } from "@/entities";
import type React from "react";

export const carregarAtendimentos = async (props: {
	selectedId: number | null;
	setStatusMsg: React.Dispatch<React.SetStateAction<string | null>>;
	setCarregando: React.Dispatch<React.SetStateAction<boolean>>;
	setRawAtendimentos: React.Dispatch<React.SetStateAction<Atendimento[]>>;
	setMotoristas: React.Dispatch<React.SetStateAction<Motorista[]>>;
	setMotivos: React.Dispatch<React.SetStateAction<Motivo[]>>;
	setVeiculos: React.Dispatch<React.SetStateAction<Veiculo[]>>;
}) => {
	const {
		selectedId,
		setStatusMsg,
		setCarregando,
		setRawAtendimentos,
		setMotoristas,
		setMotivos,
		setVeiculos,
	} = props;

	setStatusMsg(null);
	setCarregando(true);

	let atendimentoQuery = supabase.from("atendimento").select("*");
	if (selectedId) {
		atendimentoQuery = atendimentoQuery
			.eq("nr_atendimento", selectedId)
			.limit(1);
	} else {
		atendimentoQuery = atendimentoQuery
			.is("chegada_na_garagem", null)
			.order("nr_atendimento", { ascending: true });
	}

	const [
		{ data: ats, error: atErr },
		{ data: motRes, error: motErr },
		{ data: motivosRes, error: motivosErr },
		{ data: veicRes, error: veicErr },
	] = await Promise.all([
		atendimentoQuery,
		supabase.from("motorista").select("*"),
		supabase.from("motivo").select("*"),
		supabase.from("veiculo").select("*"),
	]);

	if (atErr) {
		setStatusMsg(`Erro ao carregar atendimentos: ${atErr.message}`);
		setCarregando(false);
		return;
	}
	if (motErr) console.error(motErr);
	if (motivosErr) console.error(motivosErr);
	if (veicErr) console.error(veicErr);

	setRawAtendimentos(ats ?? []);
	setMotoristas(motRes ?? []);
	setMotivos(motivosRes ?? []);
	setVeiculos(veicRes ?? []);
	setCarregando(false);
};

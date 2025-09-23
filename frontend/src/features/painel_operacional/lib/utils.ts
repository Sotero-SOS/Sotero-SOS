import type { AtendimentoEnriquecido } from "@/shared/lib/utils";

export const corresponderBusca = (props: {
	i: AtendimentoEnriquecido;
	busca: string;
}) => {
	const termo = props.busca.trim().toLowerCase();
	if (!termo) return true;
	return [
		props.i.cod_veiculo,
		props.i.matricula_motorista,
		props.i.motorista_nome,
		props.i.motivo_descricao,
		props.i.local,
	]
		.map((x) => String(x ?? "").toLowerCase())
		.some((v) => v.includes(termo));
};

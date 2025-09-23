import React from "react";
import { supabase } from "@/app/api/supabaseClient";
import type { Atendimento } from "@/entities";
import { horaAgora, parseDataHora, tempoPrevistoMs } from "@/shared/lib/utils";

export const atualizarAtendimentos = async (props: {
	id: number;
	auxiliar: Record<number, string>;
	fiscal: Record<number, string>;
	chegada: Record<number, string>;
	itens: Atendimento[];
	setStatusMsg: React.Dispatch<React.SetStateAction<string | null>>;
	setCarregando: React.Dispatch<React.SetStateAction<boolean>>;
	carregar: () => Promise<void>;
}) => {
	const {
		id,
		auxiliar,
		fiscal,
		chegada,
		itens,
		setStatusMsg,
		setCarregando,
		carregar,
	} = props;

	setStatusMsg(null);
	const aux = auxiliar[id]?.trim() || null;
	const fic = fiscal[id]?.trim() || null;
	const chg = chegada[id] || null;

	const updatePayload: Partial<Atendimento> = {
		auxiliar_de_trafego: aux,
		fiscal: fic,
	};

	if (chg) {
		const chegadaHHMMSS = /^\d{2}:\d{2}$/.test(chg) ? `${chg}:00` : chg;
		updatePayload.chegada_na_garagem = chegadaHHMMSS;
		updatePayload.final_sos = horaAgora();
		updatePayload.status = "Fechado";

		const item = itens.find((x) => x.nr_atendimento === id);
		if (item) {
			const inicio = parseDataHora(
				item.data ?? null,
				item.inicio_sos ?? null
			);
			const final = parseDataHora(
				item.data ?? null,
				updatePayload.final_sos ?? null
			);
			const msPrev = tempoPrevistoMs(item.tempo_previsto_str);
			if (inicio && final && msPrev > 0) {
				const diff = final.getTime() - inicio.getTime();
				updatePayload.atrasado = diff > msPrev;
			}
		}
	}

	setCarregando(true);
	const { error } = await supabase
		.from("atendimento")
		.update(updatePayload)
		.eq("nr_atendimento", id);
	setCarregando(false);

	if (error) {
		setStatusMsg(`Erro ao atualizar: ${error.message}`);
	} else {
		setStatusMsg("Atendimento atualizado com sucesso.");
		await carregar();
	}
};

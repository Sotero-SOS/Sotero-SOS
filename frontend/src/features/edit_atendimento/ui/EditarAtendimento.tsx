import { useEffect, useMemo, useState } from "react";
import type { Atendimento, Motorista, Motivo, Veiculo } from "@/entities";
import {
	enriquecerAtendimentos,
	type AtendimentoEnriquecido,
	tempoPrevistoMs,
	formatarHora,
	show,
} from "@/shared/lib/utils";
import { carregarAtendimentos } from "../api/carregarAtendimentos";
import { atualizarAtendimentos } from "../lib/utils";

type Props = {
	id?: number | null;
	onClose?: () => void;
};

export default function EditarAtendimento({
	id: selectedId = null,
	onClose,
}: Props) {
	const [rawAtendimentos, setRawAtendimentos] = useState<Atendimento[]>([]);
	const [motoristas, setMotoristas] = useState<Motorista[]>([]);
	const [motivos, setMotivos] = useState<Motivo[]>([]);
	const [veiculos, setVeiculos] = useState<Veiculo[]>([]);

	// Campos editáveis
	const [auxiliar, setAuxiliar] = useState<Record<number, string>>({});
	const [fiscal, setFiscal] = useState<Record<number, string>>({});
	const [chegada, setChegada] = useState<Record<number, string>>({});

	const [carregando, setCarregando] = useState(false);
	const [statusMsg, setStatusMsg] = useState<string | null>(null);

	// Tick para atualizar tempo decorrido em aberto
	const [tick, setTick] = useState(0);
	useEffect(() => {
		const id = setInterval(() => setTick((t) => t + 1), 1000);
		return () => clearInterval(id);
	}, []);

	useEffect(() => {
		carregarAtendimentos({
			selectedId,
			setStatusMsg,
			setCarregando,
			setRawAtendimentos,
			setMotoristas,
			setMotivos,
			setVeiculos,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedId]);

	const itens: AtendimentoEnriquecido[] = useMemo(
		() =>
			enriquecerAtendimentos({
				atendimentos: rawAtendimentos,
				motoristas,
				motivos,
				veiculos,
				tick,
			}),
		[rawAtendimentos, motoristas, motivos, veiculos, tick]
	);

	const titulo = selectedId
		? `Editar Atendimento #${selectedId}`
		: "Editar Atendimento";
	const itensMostrados = itens;

	if (selectedId && itensMostrados.length === 0) {
		return (
			<div className="card">
				<h2>{titulo}</h2>
				<p>Atendimento não encontrado.</p>
				{onClose && (
					<p>
						<button onClick={onClose}>Voltar</button>
					</p>
				)}
			</div>
		);
	}

	if (!selectedId && itensMostrados.length === 0 && !carregando) {
		return (
			<div className="card">
				<h2>{titulo}</h2>
				<p>Não há atendimentos pendentes de chegada na garagem.</p>
				{onClose && (
					<p>
						<button onClick={onClose}>Voltar</button>
					</p>
				)}
			</div>
		);
	}

	return (
		<div className="card">
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					gap: 8,
				}}
			>
				<h2 style={{ margin: 0 }}>{titulo}</h2>
				{onClose && <button onClick={onClose}>Fechar</button>}
			</div>

			{carregando && <p className="status">Carregando...</p>}

			<div className="lista">
				{itensMostrados.map((a) => {
					const previstoMs = tempoPrevistoMs(a.tempo_previsto_str);
					const excedeuPrevisto =
						(a.tempo_decorrido_ms ?? 0) > previstoMs &&
						previstoMs > 0;
					return (
						<div
							key={a.nr_atendimento}
							className="linha"
							style={{
								border: "1px solid #eee",
								padding: 12,
								borderRadius: 6,
								marginBottom: 12,
							}}
						>
							<div
								className="col"
								style={{ flex: 1, minWidth: 260 }}
							>
								<strong style={{ fontSize: 16 }}>
									Atendimento #{a.nr_atendimento}
								</strong>
								<div>
									Motorista:{" "}
									{a.motorista_nome ??
										a.matricula_motorista ??
										"—"}
								</div>
								<div>
									Veículo:{" "}
									{a.veiculo
										? `${a.veiculo.cod_veiculo}${
												a.veiculo.categoria_id
													? ` (${a.veiculo.categoria_id})`
													: ""
										  }`
										: show(a.cod_veiculo)}
								</div>
								<div>
									Motivo:{" "}
									{a.motivo_descricao ?? a.cod_motivo ?? "—"}
								</div>
								<div>Local: {show(a.local)}</div>
								<div>Data: {show(a.data)}</div>
								<div>
									Início SOS: {formatarHora(a.inicio_sos)}
								</div>
								<div>
									Chegada na garagem:{" "}
									{formatarHora(a.chegada_na_garagem)}
								</div>
								<div>
									Final SOS: {formatarHora(a.final_sos)}
								</div>
								<div>Status: {show(a.status)}</div>
								<div>
									Tempo previsto:{" "}
									{a.tempo_previsto_str ?? "—"}
								</div>
								<div>
									Tempo decorrido:{" "}
									<span style={excedeuPrevisto ? {} : {}}>
										{a.tempo_decorrido ?? "—"}
									</span>
								</div>
								<div>
									Atrasado: {a.atrasado ? "Sim" : "Não"}
								</div>
								<div>
									Auxiliar atual:{" "}
									{show(a.auxiliar_de_trafego)}
								</div>
								<div>Fiscal atual: {show(a.fiscal)}</div>
								<div>
									Matrícula motorista:{" "}
									{show(a.matricula_motorista)}
								</div>
								<div>Cód. motivo: {show(a.cod_motivo)}</div>
								<div>Cód. veículo: {show(a.cod_veiculo)}</div>
							</div>

							<div
								className="col"
								style={{
									flex: 1,
									minWidth: 240,
									display: "flex",
									flexDirection: "column",
									gap: 8,
								}}
							>
								<label
									style={{
										display: "flex",
										flexDirection: "column",
										gap: 4,
									}}
								>
									<span>Auxiliar de tráfego*</span>
									<input
										type="text"
										value={
											auxiliar[a.nr_atendimento] ??
											a.auxiliar_de_trafego ??
											""
										}
										onChange={(e) =>
											setAuxiliar((prev) => ({
												...prev,
												[a.nr_atendimento]:
													e.target.value,
											}))
										}
										placeholder="Nome do auxiliar"
									/>
								</label>
								<label
									style={{
										display: "flex",
										flexDirection: "column",
										gap: 4,
									}}
								>
									<span>Fiscal*</span>
									<input
										type="text"
										value={
											fiscal[a.nr_atendimento] ??
											a.fiscal ??
											""
										}
										onChange={(e) =>
											setFiscal((prev) => ({
												...prev,
												[a.nr_atendimento]:
													e.target.value,
											}))
										}
										placeholder="Nome do fiscal"
									/>
								</label>
								<label
									style={{
										display: "flex",
										flexDirection: "column",
										gap: 4,
									}}
								>
									<span>Chegada na garagem</span>
									<input
										type="time"
										step={60}
										value={
											chegada[a.nr_atendimento] ??
											a.chegada_na_garagem?.slice(0, 5) ??
											""
										}
										onChange={(e) =>
											setChegada((prev) => ({
												...prev,
												[a.nr_atendimento]:
													e.target.value,
											}))
										}
									/>
								</label>

								<button
									disabled={carregando}
									onClick={() =>
										atualizarAtendimentos({
											id: a.nr_atendimento,
											auxiliar,
											fiscal,
											chegada,
											itens: rawAtendimentos,
											setStatusMsg,
											setCarregando,
											carregar: () =>
												carregarAtendimentos({
													selectedId,
													setStatusMsg,
													setCarregando,
													setRawAtendimentos,
													setMotoristas,
													setMotivos,
													setVeiculos,
												}),
										})
									}
									style={{ marginTop: 4 }}
								>
									{carregando ? "Salvando..." : "Salvar"}
								</button>
							</div>
						</div>
					);
				})}
			</div>

			{statusMsg && (
				<p className="status" style={{ marginTop: 12 }}>
					{statusMsg}
				</p>
			)}
		</div>
	);
}

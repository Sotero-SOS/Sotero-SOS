import { useEffect, useState } from "react";
import type { Motivo } from "@/entities";
import { carregarLista } from "../api/carregarLista";
import { onSubmit } from "../api/onSubmit";

export default function FormMotivo() {
	const [descricao, setDescricao] = useState("");
	const [tempoPrevisto, setTempoPrevisto] = useState(""); // HH:MM
	const [statusMsg, setStatusMsg] = useState<string | null>(null);
	const [carregando, setCarregando] = useState(false);

	const [lista, setLista] = useState<Motivo[]>([]);
	const [carregandoLista, setCarregandoLista] = useState(false);

	useEffect(() => {
		carregarLista({
			setLista,
			setStatusMsg,
			setCarregandoLista,
		});
	}, []);

	return (
		<div className="card">
			<h2>Adicionar Motivo</h2>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					setCarregando(true);
					setStatusMsg(null);
					onSubmit({
						e,
						descricao,
						tempoPrevisto,
						setStatusMsg,
						setCarregando,
						setDescricao,
						setTempoPrevisto,
					});
				}}
			>
				<label>
					Descrição
					<input
						type="text"
						value={descricao}
						onChange={(e) => setDescricao(e.target.value)}
						placeholder="Ex.: Pane elétrica"
						required
					/>
				</label>
				<label>
					Tempo previsto
					<input
						type="time"
						value={tempoPrevisto}
						onChange={(e) => setTempoPrevisto(e.target.value)}
						step={60}
						required
					/>
				</label>
				<button disabled={carregando} type="submit">
					{carregando ? "Salvando..." : "Adicionar"}
				</button>
				{statusMsg && <p className="status">{statusMsg}</p>}
			</form>

			<div style={{ marginTop: 24 }}>
				<h3 style={{ margin: "8px 0" }}>Motivos cadastrados</h3>
				{carregandoLista ? (
					<p className="status">Carregando lista...</p>
				) : lista.length === 0 ? (
					<p className="status">Nenhum motivo cadastrado.</p>
				) : (
					<div className="tabela-simples">
						<div className="cabecalho">
							<span>Código</span>
							<span>Descrição</span>
							<span>Previsto</span>
						</div>
						{lista.map((m) => (
							<div key={m.cod_motivo} className="linha">
								<span>{m.cod_motivo}</span>
								<span>{m.descricao}</span>
								<span>{m.tempo_previsto || "—"}</span>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

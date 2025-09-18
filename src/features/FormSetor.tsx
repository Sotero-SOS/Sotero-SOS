import { useEffect, useState } from "react";
import { supabase } from "../shared/api/supabaseClient";
import type { Setor } from "../shared/config/types";

export default function FormSetor() {
	const [nome, setNome] = useState("");
	const [turno, setTurno] = useState("");
	const [statusMsg, setStatusMsg] = useState<string | null>(null);
	const [carregando, setCarregando] = useState(false);

	const [lista, setLista] = useState<Setor[]>([]);
	const [carregandoLista, setCarregandoLista] = useState(false);

	const carregarLista = async () => {
		setCarregandoLista(true);
		const { data, error } = await supabase
			.from("setor")
			.select("*")
			.order("nome_setor", { ascending: true });
		if (error) {
			setStatusMsg(`Erro ao carregar lista: ${error.message}`);
		} else {
			setLista(data || []);
		}
		setCarregandoLista(false);
	};

	useEffect(() => {
		carregarLista();
	}, []);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatusMsg(null);

		if (!nome.trim() || !turno.trim()) {
			setStatusMsg("Preencha nome e turno.");
			return;
		}

		setCarregando(true);
		const { error } = await supabase.from("setor").insert({
			nome_setor: nome.trim(),
			turno: turno.trim(),
		});

		setCarregando(false);
		if (error) {
			setStatusMsg(`Erro ao salvar: ${error.message}`);
		} else {
			setStatusMsg("Setor adicionado com sucesso!");
			setNome("");
			setTurno("");
			carregarLista();
		}
	};

	return (
		<div className="card">
			<h2>Adicionar Setor</h2>
			<form onSubmit={onSubmit}>
				<label>
					Nome do setor
					<input
						type="text"
						value={nome}
						onChange={(e) => setNome(e.target.value)}
						placeholder="Ex.: Operações"
						required
					/>
				</label>
				<label>
					Turno
					<input
						type="text"
						value={turno}
						onChange={(e) => setTurno(e.target.value)}
						placeholder="Ex.: Manhã / Tarde / Noite"
						required
					/>
				</label>
				<button disabled={carregando} type="submit">
					{carregando ? "Salvando..." : "Adicionar"}
				</button>
				{statusMsg && <p className="status">{statusMsg}</p>}
			</form>

			<div style={{ marginTop: 24 }}>
				<h3 style={{ margin: "8px 0" }}>Setores cadastrados</h3>
				{carregandoLista ? (
					<p className="status">Carregando lista...</p>
				) : lista.length === 0 ? (
					<p className="status">Nenhum setor cadastrado.</p>
				) : (
					<div className="tabela-simples">
						<div className="cabecalho">
							<span>ID</span>
							<span>Nome</span>
							<span>Turno</span>
						</div>
						{lista.map((s) => (
							<div key={s.id} className="linha">
								<span>{s.id}</span>
								<span>{s.nome_setor}</span>
								<span>{s.turno || "—"}</span>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

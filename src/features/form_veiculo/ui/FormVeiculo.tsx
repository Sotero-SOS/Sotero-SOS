import { useEffect, useState } from "react";
import { onSubmit, carregarLista } from "../index";
import type { Categoria, Veiculo } from "@/entities/vehicle";

// Mock de dados para a tabela 'categorias' que ainda não existe.
// Simula a resposta que a API do Supabase retornaria.
const CATEGORIAS_MOCK: Categoria[] = [
	{ id: 1, nome: "SUPER TOCO" },
	{ id: 2, nome: "TRUCK" },
	{ id: 3, nome: "TRICICLO" },
	{ id: 4, nome: "AGILIX" },
	{ id: 5, nome: "TRUCK ESP" },
	{ id: 6, nome: "POLIGUINDASTE" },
	{ id: 7, nome: "ROLL-ON ROLL-OFF" },
];

export default function FormVeiculo() {
	const [codigo, setCodigo] = useState<number | "">("");
	const [categoriaId, setCategoriaId] = useState<number | "">("");
	const [categoriasDisponiveis, setCategoriasDisponiveis] = useState<
		Categoria[]
	>([]);
	const [situacao, setSituacao] = useState<string>("");
	const [statusMsg, setStatusMsg] = useState<string | null>(null);
	const [carregando, setCarregando] = useState<boolean>(false);
	const [lista, setLista] = useState<Veiculo[]>([]);
	const [carregandoLista, setCarregandoLista] = useState<boolean>(true);

	useEffect(() => {
		const carregarDependencias = async () => {
			// QUANDO O BANCO DE DADOS ESTIVER PRONTO:
			// 1. Remova a linha abaixo que usa o MOCK.
			// 2. Descomente o código de busca do Supabase.
			setCategoriasDisponiveis(CATEGORIAS_MOCK);

			// const { data, error } = await supabase
			// 	.from("categorias")
			// 	.select("*")
			// 	.order("nome", { ascending: true });
			// if (error) {
			// 	setStatusMsg(`Erro ao carregar categorias: ${error.message}`);
			// } else {
			// 	setCategorias(data || []);
			// }
		};
		carregarLista([setCarregandoLista, setStatusMsg, setLista]);
		carregarDependencias();
	}, []);

	return (
		<div className="card">
			<h2>Adicionar Veículo</h2>
			<form
				onSubmit={(e) =>
					onSubmit(
						{
							codigo: codigo,
							categoriaId: categoriaId,
							situacao,
							setCodigo,
							setCategoriaId,
							setSituacao,
							setStatusMsg,
							setCarregando,
							setLista,
						},
						e
					)
				}
			>
				<label>
					Código do veículo
					<input
						type="number"
						value={codigo}
						onChange={(e) =>
							setCodigo(
								e.target.value === ""
									? ""
									: Number(e.target.value)
							)
						}
						placeholder="Ex.: 1234"
						required
					/>
				</label>
				<label>
					Categoria
					<select
						value={categoriaId}
						onChange={(e) =>
							setCategoriaId(
								e.target.value ? Number(e.target.value) : ""
							)
						}
						required
					>
						<option value="">Selecione a categoria</option>
						{categoriasDisponiveis.map((c) => (
							<option key={c.id} value={c.id}>
								{c.nome}
							</option>
						))}
					</select>
				</label>
				<label>
					Situação (opcional)
					<input
						type="text"
						value={situacao}
						onChange={(e) => setSituacao(e.target.value)}
						placeholder="Ex.: Ativo, Manutenção..."
					/>
				</label>
				<button disabled={carregando} type="submit">
					{carregando ? "Salvando..." : "Adicionar"}
				</button>
				{statusMsg && <p className="status">{statusMsg}</p>}
			</form>

			<div style={{ marginTop: 24 }}>
				<h3 style={{ margin: "8px 0" }}>Veículos cadastrados</h3>
				{carregandoLista ? (
					<p className="status">Carregando lista...</p>
				) : lista.length === 0 ? (
					<p className="status">Nenhum veículo cadastrado.</p>
				) : (
					<div className="tabela-simples">
						<div className="cabecalho">
							<span>Código</span>
							<span>Categoria</span>
							<span>Situação</span>
						</div>
						{lista.map((v) => (
							<div key={v.cod_veiculo} className="linha">
								<span>{v.cod_veiculo}</span>
								<span>
									{categoriasDisponiveis.find(
										(c) => c.id === Number(v.categoria)
									)?.nome ||
										v.categoria ||
										"—"}
								</span>
								<span>{v.situacao || "—"}</span>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

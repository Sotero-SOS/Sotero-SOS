import { useEffect, useState } from "react";
import type { Setor } from "@/entities";
import { carregarLista, onSubmit } from "../index";

export default function FormSetor() {
    const [nome, setNome] = useState("");
    const [turno, setTurno] = useState("");
    const [statusMsg, setStatusMsg] = useState<string | null>(null);
    const [carregando, setCarregando] = useState(false);

    const [lista, setLista] = useState<Setor[]>([]);
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
            <h2>Adicionar Setor</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit({
                        e,
                        nome,
                        turno,
                        setStatusMsg,
                        setCarregando,
                        carregarLista: async () =>
                            carregarLista({
                                setLista,
                                setStatusMsg,
                                setCarregandoLista,
                            }),
                        setNome,
                        setTurno,
                    });
                }}
            >
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

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../supabaseClient";
import EditarAtendimento from "./EditarAtendimento";
import type { Atendimento, Motorista, Motivo, Veiculo } from "../types.ts";
import {
  enriquecerAtendimentos,
  type AtendimentoEnriquecido,
  tempoPrevistoMs,
  formatarHora,
  show,
  agora,
  parseDataHora,
  horaAgora,
} from "../lib/utils";

type Filtro = "aberto" | "fechado" | "atrasado";

export default function PainelOperacional() {
  const [filtro, setFiltro] = useState<Filtro>("aberto");
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [motivos, setMotivos] = useState<Motivo[]>([]);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);

  const [tick, setTick] = useState(0);
  const [editingId, setEditingId] = useState<number | null>(null);

  const carregar = async (mostrarLoading = true) => {
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

  useEffect(() => {
    carregar(true);
    const id = setInterval(() => carregar(false), 15000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const itens: AtendimentoEnriquecido[] = useMemo(
    () =>
      enriquecerAtendimentos({
        atendimentos,
        motoristas,
        motivos,
        veiculos,
        tick,
      }),
    [atendimentos, motoristas, motivos, veiculos, tick]
  );

  const corresponderBusca = (i: AtendimentoEnriquecido) => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return true;
    return [
      i.cod_veiculo,
      i.matricula_motorista,
      i.motorista_nome,
      i.motivo_descricao,
      i.local,
    ]
      .map((x) => String(x ?? "").toLowerCase())
      .some((v) => v.includes(termo));
  };

  const correspondeFiltro = (i: AtendimentoEnriquecido) => {
    if (filtro === "aberto") return i.status === "Aberto";
    if (filtro === "fechado") return i.status === "Fechado";
    if (filtro === "atrasado") return i.atrasado;
    return true;
  };

  const dadosFiltrados = itens.filter(
    (i) => correspondeFiltro(i) && corresponderBusca(i)
  );

  const contagens = {
    todos: itens.length,
    aberto: itens.filter((x) => x.status === "Aberto").length,
    fechado: itens.filter((x) => x.status === "Fechado").length,
    atrasado: itens.filter((x) => x.atrasado).length,
  };

  const concluirChamado = async (i: AtendimentoEnriquecido) => {
    if (i.status === "Fechado") return;
    const confirmacao = confirm(
      `Deseja marcar o atendimento #${i.nr_atendimento} como concluído?`
    );
    if (!confirmacao) return;

    const finalHoraStr = horaAgora();
    const inicioDt = parseDataHora(i.data ?? null, i.inicio_sos ?? null);
    const finalDt = parseDataHora(i.data ?? null, finalHoraStr);
    const msPrev = tempoPrevistoMs(i.tempo_previsto_str);

    let marcadoAtrasado = false;
    if (inicioDt && finalDt && msPrev > 0) {
      marcadoAtrasado = finalDt.getTime() - inicioDt.getTime() > msPrev;
    } else if (inicioDt && msPrev > 0) {
      marcadoAtrasado = agora().getTime() - inicioDt.getTime() > msPrev;
    }

    const { error } = await supabase
      .from("atendimento")
      .update({
        status: "Fechado",
        final_sos: finalHoraStr,
        atrasado: marcadoAtrasado,
      })
      .eq("nr_atendimento", i.nr_atendimento);

    if (error) {
      alert(`Erro ao concluir: ${error.message}`);
    } else {
      alert(
        `Atendimento #${i.nr_atendimento} marcado como Fechado${
          marcadoAtrasado ? " — Atrasado" : ""
        }`
      );
      await carregar();
    }
  };

  const handleEditar = (id: number) => setEditingId(id);
  const handleCloseEditor = async () => {
    setEditingId(null);
    await carregar();
  };

  if (editingId !== null) {
    return <EditarAtendimento id={editingId} onClose={handleCloseEditor} />;
  }

  if (carregando) {
    return (
      <div
        className="card"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 160,
        }}
      >
        <span>Carregando atendimentos...</span>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="card">
        <h2>Erro no Painel</h2>
        <p>{erro}</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 style={{ marginBottom: 8 }}>Painel Operacional</h2>
      <p className="status" style={{ marginBottom: 16 }}>
        Monitoramento em tempo real dos chamados SOS
      </p>

      <div className="filtros">
        <div className="grupo-botoes">
          <button
            className={filtro === "aberto" ? "ativa" : ""}
            onClick={() => setFiltro("aberto")}
          >
            Abertos ({contagens.aberto})
          </button>
          <button
            className={filtro === "fechado" ? "ativa" : ""}
            onClick={() => setFiltro("fechado")}
          >
            Fechados ({contagens.fechado})
          </button>
          <button
            className={filtro === "atrasado" ? "ativa pulsando" : ""}
            onClick={() => setFiltro("atrasado")}
          >
            Atrasados ({contagens.atrasado})
          </button>
        </div>

        <div>
          <input
            type="text"
            placeholder="Buscar por veículo, motorista, matrícula, motivo ou local..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
      </div>

      {dadosFiltrados.length > 0 ? (
        <div className="cards-grid">
          {dadosFiltrados.map((i) => {
            const previstoMs = tempoPrevistoMs(i.tempo_previsto_str);
            const excedeuPrevisto =
              (i.tempo_decorrido_ms ?? 0) > previstoMs && previstoMs > 0;

            return (
              <div key={i.nr_atendimento} className="card cartao-sos">
                <div
                  className="topo"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 8,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <strong style={{ fontSize: 16 }}>
                      #{i.nr_atendimento}
                    </strong>
                    <strong
                      className={`tempo-topo ${
                        excedeuPrevisto ? "aviso-topo" : ""
                      }`}
                      title={
                        i.tempo_decorrido
                          ? `Tempo decorrido: ${i.tempo_decorrido}`
                          : "Sem início"
                      }
                      aria-label="Tempo decorrido"
                      style={{ fontSize: 14 }}
                    >
                      {i.tempo_decorrido ?? "—"}
                    </strong>
                  </div>

                  <div style={{ display: "flex", gap: 8 }}>
                    <span
                      className={`badge ${
                        i.status === "Fechado"
                          ? "ok"
                          : i.atrasado
                          ? "erro"
                          : "proc"
                      }`}
                    >
                      {i.status ?? "—"}
                    </span>
                    {i.atrasado && (
                      <span className="badge aviso">Atrasado</span>
                    )}
                  </div>
                </div>

                <div className="lin">
                  <span className="lbl">Motorista</span>
                  <span className="val">
                    {i.matricula_motorista}{" "}
                    {i.motorista_nome ? `- ${i.motorista_nome}` : ""}
                  </span>
                </div>

                <div className="lin">
                  <span className="lbl">Veículo</span>
                  <span className="val">
                    {i.veiculo
                      ? `${i.veiculo.cod_veiculo} ${
                          i.veiculo.categoria ? `(${i.veiculo.categoria})` : ""
                        }`
                      : i.cod_veiculo}
                  </span>
                </div>

                <div className="lin">
                  <span className="lbl">Motivo</span>
                  <span className="val">
                    {i.motivo_descricao ?? i.cod_motivo}
                  </span>
                </div>
                <div className="lin">
                  <span className="lbl">Local</span>
                  <span className="val">{show(i.local)}</span>
                </div>
                <div className="lin">
                  <span className="lbl">Data</span>
                  <span className="val">{show(i.data)}</span>
                </div>
                <div className="lin">
                  <span className="lbl">Início SOS</span>
                  <span className="val">{formatarHora(i.inicio_sos)}</span>
                </div>
                <div className="lin">
                  <span className="lbl">Chegada na Garagem</span>
                  <span className="val">
                    {formatarHora(i.chegada_na_garagem)}
                  </span>
                </div>
                <div className="lin">
                  <span className="lbl">Final SOS</span>
                  <span className="val">{formatarHora(i.final_sos)}</span>
                </div>
                <div className="lin">
                  <span className="lbl">Auxiliar de Tráfego</span>
                  <span className="val">{show(i.auxiliar_de_trafego)}</span>
                </div>
                <div className="lin">
                  <span className="lbl">Fiscal</span>
                  <span className="val">{show(i.fiscal)}</span>
                </div>
                <div className="lin">
                  <span className="lbl">Tempo Previsto</span>
                  <span className="val">{i.tempo_previsto_str ?? "—"}</span>
                </div>
                <div className="lin">
                  <span className="lbl">Atrasado</span>
                  <span className="val">{i.atrasado ? "Sim" : "Não"}</span>
                </div>

                <div className="acoes">
                  <button
                    className="secundario"
                    onClick={() => handleEditar(i.nr_atendimento)}
                  >
                    Editar
                  </button>
                  {i.status !== "Fechado" && (
                    <button
                      className="secundario"
                      onClick={() => concluirChamado(i)}
                    >
                      Concluir
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "24px 0" }}>
          <p className="status">
            {itens.length === 0
              ? "Nenhum chamado SOS encontrado."
              : "Nenhum chamado para os filtros aplicados."}
          </p>
          <p className="status">
            {itens.length === 0
              ? "Os chamados aparecerão aqui quando forem criados."
              : "Tente ajustar os filtros ou a busca."}
          </p>
        </div>
      )}
    </div>
  );
}

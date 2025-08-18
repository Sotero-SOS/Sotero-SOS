// Utilidades compartilhadas (sem dependência de outros componentes de UI)

import type { Atendimento, Motorista, Motivo, Veiculo } from "../types";

export function agora(): Date {
    return new Date();
}

export function horaAgora(): string {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
}

export function parseDataHora(
    data: string | null | undefined,
    hora: string | null | undefined
): Date | null {
    if (!data || !hora) return null;
    const iso = `${data}T${hora}`;
    const d = new Date(iso);
    return isNaN(d.getTime()) ? null : d;
}

export function tempoPrevistoMs(tempo: string | null | undefined): number {
    if (!tempo) return 0;
    const parts = tempo.split(":").map((p) => parseInt(p || "0", 10));
    const [hh = 0, mm = 0, ss = 0] = parts;
    return hh * 3600000 + mm * 60000 + ss * 1000;
}

export function msToHHMMSS(ms: number): string {
    if (ms < 0) ms = 0;
    const hh = Math.floor(ms / 3600000);
    const mm = Math.floor((ms % 3600000) / 60000);
    const ss = Math.floor((ms % 60000) / 1000);
    return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${String(
        ss
    ).padStart(2, "0")}`;
}

export function formatarHora(h?: string | null): string {
    return h && h !== "" ? h : "—";
}

export function show(v: string | number | null | undefined): string {
    if (v === null || v === undefined || v === "") return "—";
    return String(v);
}

export interface AtendimentoEnriquecido extends Atendimento {
    motorista_nome: string | null;
    motivo_descricao: string | null;
    tempo_previsto_str: string | null;
    atrasado: boolean;
    tempo_decorrido: string | null;
    tempo_decorrido_ms: number | null;
    veiculo?: Veiculo | null;
}

export function enriquecerAtendimentos(args: {
    atendimentos: Atendimento[];
    motoristas: Motorista[];
    motivos: Motivo[];
    veiculos?: Veiculo[];
    tick: number;
}): AtendimentoEnriquecido[] {
    const { atendimentos, motoristas, motivos, veiculos = [], tick } = args;
    // O tick é usado apenas para forçar recomputação em componentes React
    void tick;

    const mapaMotorista = new Map<number, string>();
    motoristas.forEach((m) => {
        if (m.matricula != null) mapaMotorista.set(m.matricula, m.nome);
    });

    const mapaMotivo = new Map<number, { descricao: string; tempo: string | null }>();
    motivos.forEach((mot) => {
        if (mot.cod_motivo != null)
            mapaMotivo.set(mot.cod_motivo, {
                descricao: mot.descricao,
                tempo: mot.tempo_previsto ?? null,
            });
    });

    const mapaVeiculo = new Map<number, Veiculo>();
    veiculos.forEach((v) => {
        if (v.cod_veiculo != null) mapaVeiculo.set(v.cod_veiculo, v);
    });

    return atendimentos.map((a) => {
        const motivoInfo = mapaMotivo.get(a.cod_motivo);
        const inicio = parseDataHora(a.data ?? null, a.inicio_sos ?? null);
        const msPrev = tempoPrevistoMs(motivoInfo?.tempo ?? null);

        let calculadoAtrasado = false;
        if (inicio && msPrev > 0) {
            const final =
                a.status === "Fechado" ? parseDataHora(a.data ?? null, a.final_sos ?? null) : null;
            const atual = final ?? agora();
            const diff = atual.getTime() - inicio.getTime();
            calculadoAtrasado = diff > msPrev;
        }

        const isAtrasado = a.atrasado ?? calculadoAtrasado;

        let tempo_decorrido_ms: number | null = null;
        if (inicio) {
            if (a.status === "Fechado") {
                const f = parseDataHora(a.data ?? null, a.final_sos ?? null);
                tempo_decorrido_ms = f ? f.getTime() - inicio.getTime() : null;
            } else {
                tempo_decorrido_ms = Date.now() - inicio.getTime();
            }
        }

        const tempo_decorrido =
            tempo_decorrido_ms != null ? msToHHMMSS(tempo_decorrido_ms) : null;

        return {
            ...a,
            motorista_nome: mapaMotorista.get(a.matricula_motorista) ?? null,
            motivo_descricao: motivoInfo?.descricao ?? null,
            tempo_previsto_str: motivoInfo?.tempo ?? null,
            atrasado: isAtrasado,
            tempo_decorrido,
            tempo_decorrido_ms,
            veiculo: mapaVeiculo.get(a.cod_veiculo) ?? null,
        };
    });
}
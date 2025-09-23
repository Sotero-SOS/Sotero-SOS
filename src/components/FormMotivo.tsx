import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import type { Motivo } from '../types';

function normalizarHora(hhmm: string): string {
    if (!hhmm) return '';
    return /^\d{2}:\d{2}$/.test(hhmm) ? `${hhmm}:00` : hhmm;
}

export default function FormMotivo() {
    const [descricao, setDescricao] = useState('');
    const [tempoPrevisto, setTempoPrevisto] = useState(''); // HH:MM
    const [statusMsg, setStatusMsg] = useState<string | null>(null);
    const [carregando, setCarregando] = useState(false);

    const [lista, setLista] = useState<Motivo[]>([]);
    const [carregandoLista, setCarregandoLista] = useState(false);

    const carregarLista = async () => {
        setCarregandoLista(true);
        const { data, error } = await supabase
            .from('motivo')
            .select('*')
            .order('descricao', { ascending: true });
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

        if (!descricao.trim() || !tempoPrevisto) {
            setStatusMsg('Informe a descrição e o tempo previsto.');
            return;
        }

        setCarregando(true);
        const { error } = await supabase.from('motivo').insert({
            descricao: descricao.trim(),
            tempo_previsto: normalizarHora(tempoPrevisto),
        });

        setCarregando(false);
        if (error) {
            setStatusMsg(`Erro ao salvar: ${error.message}`);
        } else {
            setStatusMsg('Motivo adicionado com sucesso!');
            setDescricao('');
            setTempoPrevisto('');
            carregarLista();
        }
    };

    return (
        <div className="card">
            <h2>Adicionar Motivo</h2>
            <form onSubmit={onSubmit}>
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
                    {carregando ? 'Salvando...' : 'Adicionar'}
                </button>
                {statusMsg && <p className="status">{statusMsg}</p>}
            </form>

            <div style={{ marginTop: 24 }}>
                <h3 style={{ margin: '8px 0' }}>Motivos cadastrados</h3>
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
                                <span>{m.tempo_previsto || '—'}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
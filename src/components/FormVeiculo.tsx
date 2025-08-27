import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import type { Veiculo } from '../types';

const CATEGORIAS = [
    'SUPER TOCO',
    'TRUCK',
    'TRICICLO',
    'AGILIX',
    'TRUCK ESP',
    'POLIGUINDASTE',
    'ROLL-ON ROLL-OFF',
] as const;

export default function FormVeiculo() {
    const [codigo, setCodigo] = useState<number | ''>('');
    const [categoria, setCategoria] = useState<string>('');
    const [situacao, setSituacao] = useState<string>('');
    const [statusMsg, setStatusMsg] = useState<string | null>(null);
    const [carregando, setCarregando] = useState(false);

    const [lista, setLista] = useState<Veiculo[]>([]);
    const [carregandoLista, setCarregandoLista] = useState(false);

    const carregarLista = async () => {
        setCarregandoLista(true);
        const { data, error } = await supabase
            .from('veiculo')
            .select('*')
            .order('cod_veiculo', { ascending: true });
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

        if (codigo === '' || !categoria) {
            setStatusMsg('Informe o código e selecione a categoria.');
            return;
        }

        setCarregando(true);
        const { error } = await supabase.from('veiculo').insert({
            cod_veiculo: Number(codigo),
            categoria,
            situacao: situacao.trim() || null,
        });

        setCarregando(false);
        if (error) {
            setStatusMsg(`Erro ao salvar: ${error.message}`);
        } else {
            setStatusMsg('Veículo adicionado com sucesso!');
            setCodigo('');
            setCategoria('');
            setSituacao('');
            carregarLista();
        }
    };

    return (
        <div className="card">
            <h2>Adicionar Veículo</h2>
            <form onSubmit={onSubmit}>
                <label>
                    Código do veículo
                    <input
                        type="number"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value === '' ? '' : Number(e.target.value))}
                        placeholder="Ex.: 1234"
                        required
                    />
                </label>
                <label>
                    Categoria
                    <select
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        required
                    >
                        <option value="">Selecione a categoria</option>
                        {CATEGORIAS.map((c) => (
                            <option key={c} value={c}>
                                {c}
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
                    {carregando ? 'Salvando...' : 'Adicionar'}
                </button>
                {statusMsg && <p className="status">{statusMsg}</p>}
            </form>

            <div style={{ marginTop: 24 }}>
                <h3 style={{ margin: '8px 0' }}>Veículos cadastrados</h3>
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
                                <span>{v.categoria || '—'}</span>
                                <span>{v.situacao || '—'}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import type { Setor, Veiculo, Motorista } from '../types';

type MotoristaExpandido = Motorista & {
    setor_nome?: string | null;
    veiculo_categoria?: string | null;
};

export default function FormMotorista() {
    const [matricula, setMatricula] = useState<number | ''>('');
    const [nome, setNome] = useState('');
    const [setores, setSetores] = useState<Setor[]>([]);
    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
    const [setorId, setSetorId] = useState<number | ''>('');
    const [codVeiculo, setCodVeiculo] = useState<number | ''>('');
    const [carregando, setCarregando] = useState(false);
    const [statusMsg, setStatusMsg] = useState<string | null>(null);

    const [lista, setLista] = useState<MotoristaExpandido[]>([]);
    const [carregandoLista, setCarregandoLista] = useState(false);

    const carregarBasicos = async () => {
        const [{ data: setoresData }, { data: veicData }] = await Promise.all([
            supabase.from('setor').select('*').order('nome_setor', { ascending: true }),
            supabase.from('veiculo').select('*').order('cod_veiculo', { ascending: true }),
        ]);
        setSetores(setoresData ?? []);
        setVeiculos(veicData ?? []);
    };

    const carregarLista = async () => {
        setCarregandoLista(true);
        const { data: motData, error } = await supabase
            .from('motorista')
            .select('*')
            .order('nome', { ascending: true });
        if (error) {
            setStatusMsg(`Erro ao carregar motoristas: ${error.message}`);
            setCarregandoLista(false);
            return;
        }
        const setorMap = new Map(setores.map((s) => [s.id, s.nome_setor]));
        const veicMap = new Map(veiculos.map((v) => [v.cod_veiculo, v.categoria]));
        const expandidos: MotoristaExpandido[] = (motData ?? []).map((m) => ({
            ...m,
            setor_nome: setorMap.get(m.setor_id ?? -1) ?? null,
            veiculo_categoria: veicMap.get(m.cod_veiculo ?? -1) ?? null,
        }));
        setLista(expandidos);
        setCarregandoLista(false);
    };

    useEffect(() => {
        (async () => {
            await carregarBasicos();
        })();
    }, []);

    // Recarrega lista quando setores/veículos carregarem
    useEffect(() => {
        if (setores.length >= 0 && veiculos.length >= 0) {
            carregarLista();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setores, veiculos]);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatusMsg(null);

        if (matricula === '' || !nome.trim() || setorId === '' || codVeiculo === '') {
            setStatusMsg('Informe matrícula, nome, setor e veículo.');
            return;
        }

        setCarregando(true);
        const { error } = await supabase.from('motorista').insert({
            matricula: Number(matricula),
            nome: nome.trim(),
            setor_id: Number(setorId),
            cod_veiculo: Number(codVeiculo),
        });

        setCarregando(false);
        if (error) {
            setStatusMsg(`Erro ao salvar: ${error.message}`);
        } else {
            setStatusMsg('Motorista adicionado com sucesso!');
            setMatricula('');
            setNome('');
            setSetorId('');
            setCodVeiculo('');
            carregarLista();
        }
    };

    return (
        <div className="card">
            <h2>Adicionar Motorista</h2>
            <form onSubmit={onSubmit}>
                <label>
                    Matrícula
                    <input
                        type="number"
                        value={matricula}
                        onChange={(e) => setMatricula(e.target.value === '' ? '' : Number(e.target.value))}
                        placeholder="Ex.: 5678"
                        required
                    />
                </label>
                <label>
                    Nome
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Ex.: João da Silva"
                        required
                    />
                </label>
                <label>
                    Setor
                    <select
                        value={setorId}
                        onChange={(e) => setSetorId(e.target.value === '' ? '' : Number(e.target.value))}
                        required
                    >
                        <option value="">Selecione um setor</option>
                        {setores.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.nome_setor} {s.turno ? `- ${s.turno}` : ''}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Veículo
                    <select
                        value={codVeiculo}
                        onChange={(e) => setCodVeiculo(e.target.value === '' ? '' : Number(e.target.value))}
                        required
                    >
                        <option value="">Selecione um veículo</option>
                        {veiculos.map((v) => (
                            <option key={v.cod_veiculo} value={v.cod_veiculo}>
                                {v.cod_veiculo} {v.categoria ? `- ${v.categoria}` : ''}
                            </option>
                        ))}
                    </select>
                </label>
                <button disabled={carregando} type="submit">
                    {carregando ? 'Salvando...' : 'Adicionar'}
                </button>
                {statusMsg && <p className="status">{statusMsg}</p>}
            </form>

            <div style={{ marginTop: 24 }}>
                <h3 style={{ margin: '8px 0' }}>Motoristas cadastrados</h3>
                {carregandoLista ? (
                    <p className="status">Carregando lista...</p>
                ) : lista.length === 0 ? (
                    <p className="status">Nenhum motorista cadastrado.</p>
                ) : (
                    <div className="tabela-simples">
                        <div className="cabecalho">
                            <span>Matrícula</span>
                            <span>Nome</span>
                            <span>Setor</span>
                            <span>Veículo</span>
                        </div>
                        {lista.map((m) => (
                            <div key={m.matricula} className="linha">
                                <span>{m.matricula}</span>
                                <span>{m.nome}</span>
                                <span>{m.setor_nome || m.setor_id || '—'}</span>
                                <span>
                  {m.cod_veiculo}
                                    {m.veiculo_categoria ? ` (${m.veiculo_categoria})` : ''}
                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
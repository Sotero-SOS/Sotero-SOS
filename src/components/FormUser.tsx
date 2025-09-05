import { useEffect, useState, useMemo } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../lib/AuthProvider.jsx';

const TABLE_NAME = 'user'; // Nome da tabela no banco

/**
 * Gerenciamento simples de usuários.
 * IMPORTANTE: Senha está sendo salva em texto simples (deveria usar hash).
 */
export default function FormUser() {
    const { user /*, isAdmin */ } = useAuth();

    // Estados do formulário de criação
    const [username, setUsername] = useState('');
    const [plainPassword, setPlainPassword] = useState('');
    const [isAdminNew, setIsAdminNew] = useState(false);

    const [statusMsg, setStatusMsg] = useState(null);
    const [carregando, setCarregando] = useState(false);

    // Lista de usuários
    const [lista, setLista] = useState([]);
    const [carregandoLista, setCarregandoLista] = useState(false);
    const [busca, setBusca] = useState('');

    // Carrega usuários (sem o campo de senha)
    const carregarLista = async () => {
        setCarregandoLista(true);
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('id, username, is_admin')
            .order('username', { ascending: true });

        if (error) {
            setStatusMsg(`Erro ao carregar usuários: ${error.message}`);
        } else {
            setLista(data || []);
        }
        setCarregandoLista(false);
    };

    useEffect(() => {
        carregarLista();
    }, []);

    const limpar = () => {
        setUsername('');
        setPlainPassword('');
        setIsAdminNew(false);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setStatusMsg(null);

        if (!username.trim() || !plainPassword) {
            setStatusMsg('Informe username e senha.');
            return;
        }

        setCarregando(true);
        // Atenção: senha armazenada "como veio" (não seguro)
        const { error } = await supabase
            .from(TABLE_NAME)
            .insert({
                username: username.trim(),
                hashed_password: plainPassword,
                is_admin: isAdminNew,
            });

        setCarregando(false);
        if (error) {
            if (error.message?.toLowerCase().includes('duplicate')) {
                setStatusMsg('Usuário já existe.');
            } else {
                setStatusMsg(`Erro ao salvar: ${error.message}`);
            }
        } else {
            setStatusMsg('Usuário criado com sucesso!');
            limpar();
            carregarLista();
        }
    };

    // Filtro de busca simples
    const usuariosFiltrados = useMemo(() => {
        const termo = busca.trim().toLowerCase();
        if (!termo) return lista;
        return lista.filter(u =>
            u.username.toLowerCase().includes(termo) ||
            String(u.id).includes(termo) ||
            (u.is_admin ? 'admin' : 'user').includes(termo)
        );
    }, [lista, busca]);

    return (
        <div className="card" style={{ maxWidth: 900 }}>
            <h2 style={{ marginTop: 0 }}>Usuários</h2>
            <br />

            {/* Formulário de criação */}
            <form onSubmit={onSubmit} style={{ marginBottom: 28 }}>
                <label>
                    Username
                    <input
                        type="text"
                        autoComplete="off"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Ex.: operador1"
                        required
                    />
                </label>
                <label>
                    Senha (plain)
                    <input
                        type="text"
                        value={plainPassword}
                        onChange={e => setPlainPassword(e.target.value)}
                        placeholder="Senha provisória"
                        required
                    />
                </label>
                <label style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                    <input
                        type="checkbox"
                        checked={isAdminNew}
                        onChange={e => setIsAdminNew(e.target.checked)}
                        style={{ width: 16, height: 16 }}
                    />
                    <span>Tornar administrador</span>
                </label>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <button type="submit" disabled={carregando}>
                        {carregando ? 'Salvando...' : 'Criar usuário'}
                    </button>
                    <button
                        type="button"
                        className="secundario"
                        onClick={limpar}
                        disabled={carregando}
                    >
                        Limpar
                    </button>
                </div>
                {statusMsg && <p className="status">{statusMsg}</p>}
                {user && (
                    <p className="status" style={{ marginTop: 8 }}>
                        Logado como <strong>{user.username}</strong>
                        {user.is_admin ? ' (admin)' : ''}.
                    </p>
                )}
            </form>

            {/* Barra de busca + botão recarregar */}
            <div
                style={{
                    marginBottom: 14,
                    display: 'flex',
                    gap: 12,
                    flexWrap: 'wrap',
                    alignItems: 'center'
                }}
            >
                <input
                    type="text"
                    placeholder="Buscar por id, username ou admin..."
                    value={busca}
                    onChange={e => setBusca(e.target.value)}
                    style={{
                        border: '1px solid #cbd5e1',
                        background: '#f8fafc',
                        padding: '10px 12px',
                        borderRadius: 8,
                        fontSize: '0.85rem',
                        flex: '1 1 260px'
                    }}
                />
                <button
                    type="button"
                    className="secundario"
                    onClick={carregarLista}
                    disabled={carregandoLista}
                >
                    {carregandoLista ? 'Atualizando...' : 'Recarregar'}
                </button>
            </div>

            {/* Tabela de usuários */}
            <div>
                <h3 style={{ margin: '8px 0' }}>Usuários cadastrados</h3>
                {carregandoLista ? (
                    <p className="status">Carregando lista...</p>
                ) : usuariosFiltrados.length === 0 ? (
                    <p className="status">
                        {lista.length === 0
                            ? 'Nenhum usuário cadastrado.'
                            : 'Nenhum usuário corresponde à busca.'}
                    </p>
                ) : (
                    <div className="tabela-simples">
                        <div
                            className="cabecalho"
                            style={{ gridTemplateColumns: '60px 1fr 110px' }}
                        >
                            <span>ID</span>
                            <span>Username</span>
                            <span>Perfil</span>
                        </div>
                        {usuariosFiltrados.map(u => (
                            <div
                                key={u.id}
                                className="linha"
                                style={{ gridTemplateColumns: '60px 1fr 110px' }}
                                title={u.is_admin ? 'Administrador' : 'Usuário'}
                            >
                                <span>{u.id}</span>
                                <span>{u.username}</span>
                                <span>
                                    {u.is_admin ? (
                                        <span className="badge ok">Admin</span>
                                    ) : (
                                        <span className="badge proc">User</span>
                                    )}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

}
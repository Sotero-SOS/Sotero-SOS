import { supabase } from "@/app/api/supabaseClient";

export const onSubmit = async (props: {
	e: React.FormEvent;
	nome: string;
	turno: string;
	setStatusMsg: React.Dispatch<React.SetStateAction<string | null>>;
	setCarregando: React.Dispatch<React.SetStateAction<boolean>>;
	carregarLista: () => Promise<void>;
	setNome: React.Dispatch<React.SetStateAction<string>>;
	setTurno: React.Dispatch<React.SetStateAction<string>>;
}) => {
	const {
		e,
		nome,
		turno,
		setStatusMsg,
		setCarregando,
		carregarLista,
		setNome,
		setTurno,
	} = props;

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

import { supabase } from "@/app/api/supabaseClient";
import { type User, TABLE_NAME } from "@/entities/usuarios/";
import { carregarListaUsuarios } from "./carregarListaUsuarios";
import { limpar } from "../lib/utils";

export const onSubmitUsuario = async (props: {
	username: string;
	plainPassword: string;
	isAdminNew: boolean;
	e: React.FormEvent<HTMLFormElement>;
	setStatusMsg: React.Dispatch<React.SetStateAction<string | null>>;
	setCarregando: React.Dispatch<React.SetStateAction<boolean>>;
	setCarregandoListaUsuarios: React.Dispatch<React.SetStateAction<boolean>>;
	setUsername: React.Dispatch<React.SetStateAction<string>>;
	setPlainPassword: React.Dispatch<React.SetStateAction<string>>;
	setIsAdminNew: React.Dispatch<React.SetStateAction<boolean>>;
	setListaUsuarios: React.Dispatch<React.SetStateAction<User[]>>;
}) => {
	props.e.preventDefault();
	props.setStatusMsg(null);

	if (!props.username.trim() || !props.plainPassword) {
		props.setStatusMsg("Informe username e senha.");
		return;
	}

	props.setCarregando(true);
	const { error } = await supabase.from(TABLE_NAME).insert({
		username: props.username.trim(),
		hashed_password: props.plainPassword, // plain for now
		is_admin: props.isAdminNew,
	});

	props.setCarregando(false);
	if (error) {
		if (error.message?.toLowerCase().includes("duplicate")) {
			props.setStatusMsg("Usuário já existe.");
		} else {
			props.setStatusMsg(`Erro ao salvar: ${error.message}`);
		}
	} else {
		props.setStatusMsg("Usuário criado com sucesso!");
		limpar({
			setUsername: props.setUsername,
			setPlainPassword: props.setPlainPassword,
			setIsAdminNew: props.setIsAdminNew,
		});
		carregarListaUsuarios({
			setListaUsuarios: props.setListaUsuarios,
			setStatusMsg: props.setStatusMsg,
			setCarregandoListaUsuarios: props.setCarregandoListaUsuarios,
		});
	}
};

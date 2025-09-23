import { type User, TABLE_NAME } from "@/entities/usuarios/";
import { supabase } from "@/app/api/supabaseClient";

export const carregarListaUsuarios = async (props: {
	setStatusMsg: React.Dispatch<React.SetStateAction<string | null>>;
	setListaUsuarios: React.Dispatch<React.SetStateAction<User[]>>;
	setCarregandoListaUsuarios: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	props.setCarregandoListaUsuarios(true);
	// Avoid selecting hashed_password (don’t expose it)
	const { data, error } = await supabase
		.from(TABLE_NAME)
		.select("id, username,is_admin")
		.order("username", { ascending: true });

	if (error) {
		props.setStatusMsg(`Erro ao carregar usuários: ${error.message}`);
	} else {
		// The 'cargo' column is already selected, so the data should directly match the User type.
		// However, supabase returns 'any' type, so we cast it to User[]
		// The 'is_admin' property is optional in User and not selected here, which is fine.
		props.setListaUsuarios((data as User[]) || []);
	}
	props.setCarregandoListaUsuarios(false);
};

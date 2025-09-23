import React from "react";
import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from "react-router-dom";
import { useAuth } from "@/features/auth/model/useAuth";
import { Home } from "@/pages/home/Home";
import PainelOperacional from "@/features/painel_operacional/ui/PainelOperacional";
import FormAtendimento from "@/features/form_atendimento/ui/FormAtendimento";
import EditarAtendimento from "@/features/edit_atendimento/ui/EditarAtendimento";
import FormMotorista from "@/features/form_motorista/ui/FormMotorista";
import FormVeiculo from "@/features/form_veiculo/ui/FormVeiculo";
import FormMotivo from "@/features/form_motivo/ui/FormMotivo";
import FormSetor from "@/features/form_setor/ui/FormSetor";
import FormUser from "@/features/form_usuario/ui/FormUser";
import { FormLogin } from "@/features/auth/ui/FormLogin";

/**
 * Layout que protege rotas: se não estiver logado, redireciona para "/" (login).
 */

/*
 * ALTERAR A LOCALIZAÇÃO DESTA FUNÇÃO
 * */
function ProtectedLayout() {
	const { users, loading } = useAuth();

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen text-gray-600 dark:text-gray-200">
				Verificando sessão...
			</div>
		);
	}

	if (!users || !users.username) {
		return <Navigate to="/" replace />;
	}

	return <Home />;
}

const router = createBrowserRouter([
	{ path: "/", element: <FormLogin /> },
	{
		path: "/home",
		element: <ProtectedLayout />,
		children: [
			{ path: "/home", element: <PainelOperacional /> },
			{ path: "/home/iniciar_sos", element: <FormAtendimento /> },
			{ path: "/home/editar_sos", element: <EditarAtendimento /> },
			{ path: "/home/motoristas", element: <FormMotorista /> },
			{ path: "/home/veiculos", element: <FormVeiculo /> },
			{ path: "/home/motivos", element: <FormMotivo /> },
			{ path: "/home/setores", element: <FormSetor /> },
			{ path: "/home/usuarios", element: <FormUser /> },
			{
				path: "/home/configuracoes",
				element: (
					<div className="card">
						<h2>Configurações</h2>
						<p>Em desenvolvimento...</p>
					</div>
				),
			},
		],
	},
]);

export function AppRouter() {
	return <RouterProvider router={router} />;
}

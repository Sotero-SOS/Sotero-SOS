import React from "react";
import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from "react-router-dom";
import AppLogin from "@/pages/Login";
import { useAuth } from "@/features/auth/model/useAuth";
import LayoutApp from "@/widgets/LayoutApp";
import PainelOperacional from "@/features/PainelOperacional";
import FormAtendimento from "@/features/FormAtendimento";
import EditarAtendimento from "@/features/EditarAtendimento";
import FormMotorista from "@/features/FormMotorista";
import FormVeiculo from "@/features/FormVeiculo";
import FormMotivo from "@/features/FormMotivo";
import FormSetor from "@/features/FormSetor";
import FormUser from "@/features/FormUser";

/**
 * Layout que protege rotas: se não estiver logado, redireciona para "/" (login).
 */

/*
 * ALTERAR A LOCALIZAÇÃO DESTA FUNÇÃO
 * */
function ProtectedLayout() {
	const { user, loading } = useAuth();

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen text-gray-600 dark:text-gray-200">
				Verificando sessão...
			</div>
		);
	}

	if (!user || !user.username) {
		return <Navigate to="/" replace />;
	}

	return <LayoutApp />;
}

const router = createBrowserRouter([
	{ path: "/", element: <AppLogin /> },
	{
		path: "/Home",
		element: <ProtectedLayout />,
		children: [
			{ path: "/Home", element: <PainelOperacional /> },
			{ path: "/Home/iniciar_sos", element: <FormAtendimento /> },
			{ path: "/Home/editar_sos", element: <EditarAtendimento /> },
			{ path: "/Home/motoristas", element: <FormMotorista /> },
			{ path: "/Home/veiculos", element: <FormVeiculo /> },
			{ path: "/Home/motivos", element: <FormMotivo /> },
			{ path: "/Home/setores", element: <FormSetor /> },
			{ path: "/Home/usuarios", element: <FormUser /> },
			{
				path: "/Home/configuracoes",
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

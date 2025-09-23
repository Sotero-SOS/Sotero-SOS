import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";
import AppLogin from "@/pages/Login";
import { useAuth } from "@/features/auth/model/useAuth";
import LayoutApp from "@/pages/Home";
import PainelOperacional from "@/features/painel_operacional/ui/PainelOperacional";
import FormAtendimento from "@/features/form_atendimento/ui/FormAtendimento";
import EditarAtendimento from "@/features/edit_atendimento/ui/EditarAtendimento";
import FormMotorista from "@/features/form_driver/ui/FormMotorista";
import FormVeiculo from "@/features/form_vehicle/ui/FormVeiculo";
import FormMotivo from "@/features/form_motivo/ui/FormMotivo";
import FormSetor from "@/features/form_setor/ui/FormSetor";
import FormUser from "@/features/form_user/ui/FormUser";

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

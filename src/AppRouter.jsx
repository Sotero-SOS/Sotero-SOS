import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import AppLogin from "./pages/AppLogin.jsx";
import LayoutApp from "./layouts/LayoutApp.jsx";
import EditarAtendimento from "./components/EditarAtendimento.tsx";
import FormSetor from "./components/FormSetor.tsx";
import FormMotivo from "./components/FormMotivo.tsx";
import FormVeiculo from "./components/FormVeiculo.tsx";
import FormMotorista from "./components/FormMotorista.tsx";
import PainelOperacional from "./components/PainelOperacional.js";
import FormUser from "./components/FormUser.jsx";
import { useAuth } from "./lib/AuthProvider.jsx";
import FormAtendimento from "./components/FormAtendimento.js";

/**
 * Layout que protege rotas: se não estiver logado, redireciona para "/" (login).
 */
function ProtectedLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen text-gray-600 dark:text-gray-200">
          Verificando sessão...
        </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <LayoutApp />;
}

/**
 * Roteamento principal da aplicação.
 * - "/" é tela de login.
 * - "/Home" e filhos exigem autenticação.
 */
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

export default function AppRouter() {
  return <RouterProvider router={router} />;

}
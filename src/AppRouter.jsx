import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLogin from "./pages/AppLogin.jsx";
import LayoutApp from "./layouts/LayoutApp.jsx";
import AppHomepage from "./pages/AppHomepage.jsx";
import AppNovoAtendimento from "./pages/AppNovoAtendimento.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLogin />,
  },
  {
    path: "/Home",
    element: <LayoutApp />,
    children: [
      {
        path: "/Home",
        element: <AppHomepage />,
      },
      {
        path: "/Home/atendimentos",
        element: <AppNovoAtendimento />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

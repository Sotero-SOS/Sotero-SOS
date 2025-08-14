import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LayoutApp from "./layouts/LayoutApp.jsx";
import Home from "./routes/Home.jsx";
import NovoAtendimento from "./routes/NovoAtendimento.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutApp />, // Ex: um componente com Header/Footer, etc.
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/atendimentos",
        element: <NovoAtendimento />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

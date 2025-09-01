import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "./styles/card.css";
import "./styles/forms.css";
import "./styles/buttons.css";
import "./styles/simple-table.css";
import "./styles/painel_operacional.css";

import AppRouter from "./AppRouter.jsx";
import { AuthProvider } from "./lib/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </StrictMode>
);

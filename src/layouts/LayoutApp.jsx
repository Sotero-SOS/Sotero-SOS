import { useState } from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader.jsx";
import AppSideBar from "../components/AppSideBar.jsx";

function LayoutApp() {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* A Sidebar fica aqui, ocupando seu espaço na esquerda */}
      {sidebarVisible && <AppSideBar />}
      
      {/* Este container ocupa o restante da tela e organiza o Header e o conteúdo em uma coluna */}
      <div className="flex-1 flex flex-col">
        <AppHeader
          sidebarVisible={sidebarVisible}
          setSidebarVisible={setSidebarVisible}
        />
        <main className="p-6 overflow-y-auto">
          {/* O Outlet agora renderiza corretamente dentro da área de conteúdo principal */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default LayoutApp;
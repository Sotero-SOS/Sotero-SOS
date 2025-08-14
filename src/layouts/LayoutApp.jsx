import { useState } from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader.jsx";
import AppSideBar from "../components/AppSideBar.jsx";

function LayoutApp() {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <div className="flex min-h-screen min-w-screen bg-gray-50">
      {sidebarVisible && <AppSideBar />}
      <AppHeader
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
      />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default LayoutApp;

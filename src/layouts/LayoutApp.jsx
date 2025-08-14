import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader.jsx";
import AppSideBar from "../components/AppSideBar.jsx";

function LayoutApp() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="flex min-h-screen w-screen bg-gray-50 dark:bg-slate-900">
      {sidebarVisible && <AppSideBar />}

      <div className="flex-1 flex flex-col">
        <AppHeader
          sidebarVisible={sidebarVisible}
          setSidebarVisible={setSidebarVisible}
          theme={theme}
          setTheme={setTheme}
        />
        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default LayoutApp;

import React from "react";
import { FiMenu, FiChevronsLeft } from "react-icons/fi";

function AppHeader({ sidebarVisible, setSidebarVisible }) {
  return (
    <header className="flex h-16 min-w-screen items-center justify-start border-b border-slate-200 bg-white px-4 shadow-sm">
      <button
        className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200"
        onClick={() => setSidebarVisible(!sidebarVisible)}
      >
        {sidebarVisible ? <FiChevronsLeft /> : <FiMenu />}
      </button>
    </header>
  );
}

export default AppHeader;

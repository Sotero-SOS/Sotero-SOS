import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiAlertCircle, FiSettings, FiPieChart, FiUser, FiLogOut } from "react-icons/fi";
import { FaTruck } from "react-icons/fa";

const SidebarLink = ({ to, icon, text, expanded }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) => `
        relative flex items-center py-3 px-4 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${isActive
          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-100"
          : "hover:bg-gray-200/70 text-gray-600 dark:text-gray-400 dark:hover:bg-slate-700"
        }`
      }
    >
      {icon}
      <span className={`overflow-hidden transition-all ${expanded ? "w-40 ml-3" : "w-0"}`}>
        {text}
      </span>
      {!expanded && (
        <div
          className="absolute left-full rounded-md px-2 py-1 ml-6 bg-slate-800 text-white text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
        >
          {text}
        </div>
      )}
    </NavLink>
  </li>
);

function AppSideBar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      className={`min-h-screen transition-all duration-300 ease-in-out ${expanded ? "w-64" : "w-20"}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <nav className="h-full flex flex-col bg-white border-r shadow-xl dark:bg-slate-800 dark:border-slate-700">
        <div className={`h-16 w-full relative flex items-center justify-center`}>
          <img
            src="/logo.png"
            className={`w-10 transition-opacity duration-500 ease-in-out absolute ${expanded ? "opacity-0" : "opacity-100"}`}
            alt="Sotero Icon"
          />
          <img
            src="/sotero.png"
            className={`w-32 transition-opacity duration-500 ease-in-out absolute ${expanded ? "opacity-100" : "opacity-0"}`}
            alt="Sotero Logo"
          />
        </div>

        <ul className="flex-1 px-3">
          <SidebarLink to="/" icon={<FiPieChart size={22} />} text="Dashboard" expanded={expanded} />
          <SidebarLink to="/atendimentos" icon={<FiAlertCircle size={22} />} text="Atendimentos" expanded={expanded} />
          <SidebarLink to="/usuarios" icon={<FiUser size={22} />} text="Usuários" expanded={expanded} />
          <SidebarLink to="/veiculos" icon={<FaTruck size={22} />} text="Veículos" expanded={expanded} />
          <SidebarLink to="/configuracoes" icon={<FiSettings size={22} />} text="Configurações" expanded={expanded} />
        </ul>

        <div className="border-t p-3 dark:border-slate-700">
            <button className="w-full flex items-center justify-center py-3 px-4 my-1 font-medium rounded-md cursor-pointer transition-colors group text-red-500 hover:bg-red-100/80 dark:hover:bg-red-900/50">
                <FiLogOut size={22} />
                <span className={`overflow-hidden transition-all ${expanded ? "w-40 ml-3" : "w-0"}`}>Sair da conta</span>
            </button>
        </div>
      </nav>
    </aside>
  );
}

export default AppSideBar;
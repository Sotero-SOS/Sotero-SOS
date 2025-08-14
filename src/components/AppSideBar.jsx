import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiAlertCircle, FiSettings, FiPieChart, FiUser } from "react-icons/fi";
import { FaTruck } from "react-icons/fa";

// O componente agora usa NavLink para navegação e controle de estado ativo
const SidebarLink = ({ icon, text, to, expanded }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) => `
        relative flex items-center py-3 px-4 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          isActive
            ? "bg-blue-100 text-blue-700"
            : "hover:bg-gray-200/70 text-gray-600"
        }
      `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-40 ml-3" : "w-0"
        }`}
      >
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
      className={`min-h-screen transition-all duration-300 ease-in-out ${
        expanded ? "w-64" : "w-20"
      }`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <nav className="h-full flex flex-col bg-white border-r shadow-xl">
        <div
          className={`h-16 w-full relative flex items-center justify-center transition-colors duration-500 ease-in-out ${
            expanded ? "bg-green-400" : "bg-blue-500"
          }`}
        >
          <img
            src="/logo.png"
            className={`w-10 transition-opacity duration-500 ease-in-out absolute ${
              expanded ? "opacity-0" : "opacity-100"
            }`}
            alt="Sotero Icon"
          />
          <img
            src="/sotero.png"
            className={`w-32 transition-opacity duration-500 ease-in-out absolute ${
              expanded ? "opacity-100" : "opacity-0"
            }`}
            alt="Sotero Logo"
          />
        </div>

        <ul className="flex-1 px-3">
          <SidebarLink
            to="/"
            icon={<FiPieChart size={22} />}
            text="Dashboard"
            expanded={expanded}
          />
          <SidebarLink
            to="/atendimentos"
            icon={<FiAlertCircle size={22} />}
            text="Atendimentos"
            expanded={expanded}
          />
          <SidebarLink
            to="/usuarios"
            icon={<FiUser size={22} />}
            text="Usuários"
            expanded={expanded}
          />
          <SidebarLink
            to="/veiculos"
            icon={<FaTruck size={22} />}
            text="Veículos"
            expanded={expanded}
          />
          <SidebarLink
            to="/configuracoes"
            icon={<FiSettings size={22} />}
            text="Configurações"
            expanded={expanded}
          />
        </ul>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=Victor+Hugo"
            alt="Avatar"
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-40 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Victor Hugo</h4>
              <span className="text-xs text-gray-600">victor@sotero.dev</span>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default AppSideBar;

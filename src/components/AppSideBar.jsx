import React, { useState } from 'react';
import { FiHome, FiBarChart2, FiSettings } from 'react-icons/fi';

const SidebarLink = ({ icon, text, active, expanded }) => (
  <li
    className={`
      relative flex items-center py-3 px-4 my-1
      font-medium rounded-md cursor-pointer
      transition-colors group
      ${active ? "bg-blue-100 text-blue-700" : "hover:bg-gray-200/70 text-gray-600"}
    `}
  >
    {icon}
    <span className={`overflow-hidden transition-all ${expanded ? "w-40 ml-3" : "w-0"}`}>
      {text}
    </span>
    {!expanded && (
      <div
        className={`
        absolute left-full rounded-md px-2 py-1 ml-6 bg-slate-800 text-white text-sm
        invisible opacity-20 -translate-x-3 transition-all
        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
      >
        {text}
      </div>
    )}
  </li>
);

function AppSideBar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside 
      className={`h-screen transition-all duration-300 ease-in-out ${expanded ? "w-64" : "w-20"}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <nav className="h-full flex flex-col bg-white border-r shadow-xl">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}
            alt="Logo"
          />
        </div>

        <ul className="flex-1 px-3">
          <SidebarLink icon={<FiHome size={22} />} text="Dashboard" active expanded={expanded} />
          <SidebarLink icon={<FiBarChart2 size={22} />} text="Atendimentos" expanded={expanded} />
          <SidebarLink icon={<FiSettings size={22} />} text="Configurações" expanded={expanded} />
        </ul>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=Victor+Hugo"
            alt="Avatar"
            className="w-10 h-10 rounded-md"
          />
          <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-40 ml-3" : "w-0"}`}>
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

import React from "react";
import { FiMenu, FiChevronsLeft, FiSun, FiMoon } from "react-icons/fi";

const ThemeSwitcher = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-400"
    >
      {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
    </button>
  );
};

const UserProfile = () => (
  <div className="w-10 h-10 rounded-md overflow-hidden">
    <img
      src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=Victor+Hugo"
      alt="Avatar"
    />
  </div>
);

function AppHeader({ sidebarVisible, setSidebarVisible, theme, setTheme }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm dark:bg-slate-800 dark:border-slate-700">
      {/* Left side */}
      <button
        className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600"
        onClick={() => setSidebarVisible(!sidebarVisible)}
      >
        {sidebarVisible ? <FiChevronsLeft /> : <FiMenu />}
      </button>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <ThemeSwitcher theme={theme} setTheme={setTheme} />
        <UserProfile />
      </div>
    </header>
  );
}

export default AppHeader;

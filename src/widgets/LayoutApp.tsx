import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "./header/ui/Header.tsx";
import NavBar from "./navBar/ui/NavBar.tsx";

const LayoutApp = () => {
	const [sidebarVisible, setSidebarVisible] = useState(true);
	const [theme, setTheme] = useState<"dark" | "light">(() =>
		window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light"
	);

	useEffect(() => {
		const root = document.documentElement;
		if (theme === "dark") {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}
	}, [theme]);

	return (
		<div className="flex min-h-screen w-screen bg-gray-50 dark:bg-slate-900">
			{sidebarVisible && (
				<NavBar to={""} icon={undefined} text={""} expanded={false} />
			)}

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
};

export default LayoutApp;

import React, { type FC } from "react";
import { FiMenu, FiChevronsLeft } from "react-icons/fi";
import type { HeaderProps } from "../model/types";
import type { ThemeProps } from "@/widgets/theme-switcher/model/types";
import { ThemeButton } from "@/widgets/theme-switcher/ui/ThemeButton";

/*FC = Functional Component*/

const UserProfile: FC = () => (
	<div className="w-10 h-10 rounded-md overflow-hidden">
		<img
			src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=Victor+Hugo"
			alt="Avatar"
		/>
	</div>
);

const AppHeader: FC<HeaderProps & ThemeProps> = (props) => {
	return (
		<header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm dark:bg-slate-800 dark:border-slate-700">
			{/* Left side */}
			<button
				className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600"
				onClick={() => props.setSidebarVisible(!props.sidebarVisible)}
			>
				{props.sidebarVisible ? <FiChevronsLeft /> : <FiMenu />}
			</button>

			{/* Right side */}
			<div className="flex items-center gap-4">
				<ThemeButton theme={props.theme} setTheme={props.setTheme} />
				<UserProfile />
			</div>
		</header>
	);
};

export default AppHeader;

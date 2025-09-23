import { FiSun, FiMoon } from "react-icons/fi";
import type { FC } from "react";
import type { ThemeProps } from "../model/types";

export const ThemeButton: FC<ThemeProps> = (props) => {
	const toggleTheme = () => {
		props.setTheme(props.theme === "light" ? "dark" : "light");
	};

	return (
		<button
			onClick={toggleTheme}
			className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-400"
		>
			{props.theme === "light" ? (
				<FiMoon size={20} />
			) : (
				<FiSun size={20} />
			)}
		</button>
	);
};

import { useState, useEffect } from "react";
import type { ThemeProps } from "./types";

export const SwitchTheme = (): ThemeProps => {
	const [theme, setTheme] = useState<"dark" | "light">("dark");

	useEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [theme]);

	return { theme, setTheme };
};

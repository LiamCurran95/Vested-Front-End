import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

export default function Header() {
	const { toggle } = useContext(ThemeContext);
	return (
		<header className={toggle ? "dark" : "light"}>
			<h1>VE$TED</h1>
		</header>
	);
}

import { UserContext } from "../context/userContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/themeContext";
import SearchBar from "./SearchBar";

export default function Header() {
	const { loggedInUser } = useContext(UserContext);
	const { toggle, toggleFunction } = useContext(ThemeContext);
	return (
		<header className={toggle ? "dark" : "light"}>
			<h1>VE$TED</h1>
			<SearchBar />
		</header>
	);
}

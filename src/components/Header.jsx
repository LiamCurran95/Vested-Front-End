import { UserContext } from "../context/userContext";
import { useContext} from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/themeContext";

export default function Header() {
	const { loggedInUser } = useContext(UserContext);
	const {toggle, toggleFunction } = useContext(ThemeContext)
	return (
		<header className={toggle? "dark" : "light"}>
			<div className="header-buttons">
				<button>
					<Link to="/login" style={{ textDecoration: "none" }}>
						Log In
					</Link>
				</button>
			</div> */}
				<h1>VE$TED</h1>
		</header>
	);
}

import { UserContext } from "../context/userContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/themeContext";

export default function Header() {
	const { loggedInUser } = useContext(UserContext);
	const {toggle, toggleFunction } = useContext(ThemeContext)
	
	return (
		<header className={toggle? "dark" : "light"}>
			
				{/* {console.log(loggedInUser)}
				{loggedInUser.username}
				<img
					className="nav-img-avatar"
					src={loggedInUser.avatarUrl}
					alt="logged in user"
				/> */}
		
			{/* <div className="header-buttons">
				<button>Theme : Light</button>
				<button>
					<Link to="/login" style={{ textDecoration: "none" }}>
						Log In
					</Link>
				</button>
			</div> */}
				<h1>VE$TED</h1>
				{/* <button onClick={toggleFunction}> change </button> */}
		</header>
	);
}

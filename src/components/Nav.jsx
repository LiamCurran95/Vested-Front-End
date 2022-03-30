import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { ThemeContext } from "../context/themeContext";

export default function Nav() {
    const { loggedInUser } = useContext(UserContext)
    const {toggle, toggleFunction } = useContext(ThemeContext)
    const [navClicked, setNavClicked] = useState(false)

    return (
        <>
           <nav className="nav-content-container">
            
            <section className="left-nav">
            <div className="dropdown">
                <button className="drop-btn" onClick={() => { navClicked ? setNavClicked(false) : setNavClicked(true) }}>☰</button>

                <section className="drop-content" >
                    <Link to="/" style={{ textDecoration: "none" }} id={navClicked ? "show" : "hide"} onClick={() => { setNavClicked(false) }}>Home</Link>
                    <Link to="/profile" style={{ textDecoration: "none" }} id={navClicked ? "show" : "hide"} onClick={() => { setNavClicked(false) }}>Profile</Link>
                    <Link to="/newsfeed" style={{ textDecoration: "none" }} id={navClicked ? "show" : "hide"} onClick={() => { setNavClicked(false) }}>Feed</Link>
                    <Link to="/infopage" style={{ textDecoration: "none" }} id={navClicked ? "show" : "hide"} onClick={() => { setNavClicked(false) }}>What is ESG?</Link>
                    <Link to="/form" style={{ textDecoration: "none" }} id={navClicked ? "show" : "hide"} onClick={() => { setNavClicked(false) }}>New Portfolio</Link>
                </section>
                </div>
                <button onClick={toggleFunction}> {toggle? " ☼ " : " ☾ " } </button>
            </section>
          
            <section className="right-nav">
			<button className={`${loggedInUser? "show" : "hide"}`}>
					<Link to="/login" style={{ textDecoration: "none" }}>
						Log In
					</Link>
			</button>
            <span className="nav-user">
                {loggedInUser? loggedInUser.username : "No Logged In User"}
                <img className="nav-img-avatar" src={loggedInUser ? loggedInUser.avatarUrl : ""} alt="user-avi" />
            </span>	
            </section>
        </nav>
        </>
    )
}


import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import { UserContext } from "../context/userContext";
import { ThemeContext } from "../context/themeContext";

export default function Nav() {

    const { loggedInUser } = useContext(UserContext)
    const [navClicked, setNavClicked] = useState(false)

    return (
        <nav className="nav-content-container">
            <div className="dropdown">
                <button className="drop-btn" onClick={() => { navClicked ? setNavClicked(false) : setNavClicked(true) }}>Nav</button>

                <section className="nav-container" id={navClicked ? "show" : "hide"} onClick={() => { setNavClicked(false) }}>
                    <h2><Link to="/" style={{ textDecoration: "none" }}>Home</Link></h2>
                    <h2><Link to="/profile" style={{ textDecoration: "none" }}>Profile</Link></h2>
                    <h2><Link to="/newsfeed" style={{ textDecoration: "none" }}>Feed</Link></h2>
                    <h2><Link to="/infopage" style={{ textDecoration: "none" }}>What is ESG?</Link></h2>
                    <h2><Link to="/form" style={{ textDecoration: "none" }}>New Portfolio</Link></h2>
                </section>
            </div>
        </nav>
    )
}
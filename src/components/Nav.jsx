import { Link } from "react-router-dom"
import { UserContext } from "../context/userContext";
import { ThemeContext } from "../context/themeContext";

export default function Nav(){
    return (
            <section className="nav-container">
                <h2><Link to="/" style={{textDecoration: "none"}}>Home</Link></h2>
                <h2><Link to="/profile" style={{textDecoration: "none"}}>Profile</Link></h2>
                <h2><Link to="/newsfeed" style={{textDecoration: "none"}}>Feed</Link></h2>
                <h2><Link to="/infopage" style={{textDecoration: "none"}}>What is ESG?</Link></h2>
                <h2><Link to="/form" style={{textDecoration: "none"}}>New Portfolio</Link></h2>
            </section>
        )
    }
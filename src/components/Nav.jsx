import { Link } from "react-router-dom"
import {useContext} from "react"
import { UserContext } from "../context/userContext";

export default function Nav(){

    const {loggedInUser} = useContext(UserContext)

    return (
            <section className="nav-container">
                <h2><Link to="/" style={{textDecoration: "none"}}>Home</Link></h2>
                <h2><Link to="/profile" style={{textDecoration: "none"}}>Profile</Link></h2>
                <h2><Link to="/newsfeed" style={{textDecoration: "none"}}>Feed</Link></h2>
                <h2><Link to="/infopage" style={{textDecoration: "none"}}>What is ESG?</Link></h2>
                <h2><Link to="/form" style={{textDecoration: "none"}}>New Portfolio</Link></h2>
                <span>
                    {loggedInUser ? loggedInUser.username : <p>Sign In</p>}
                    {loggedInUser ? <img className="nav-img-avatar" src={loggedInUser.avatarUrl} alt="logged in user" /> : ""}
                </span>
            </section>
        )
    }
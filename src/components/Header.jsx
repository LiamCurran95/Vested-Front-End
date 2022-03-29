import { UserContext } from "../context/userContext";
import { useContext, useState } from "react"

export default function Header(){
    const { loggedInUser } = useContext(UserContext)
return (
    <header>
        <span>
                {loggedInUser.username}
                <img className="nav-img-avatar" src={loggedInUser.avatarUrl} alt="logged in user" />
            </span>
        <div className="header-buttons">
            <button>Theme : Light</button>
            <button>Log In</button>
        </div>
        <div className="header-text">
            <h1>VESTED</h1>
            <h2>Getting you rich (sustainably)</h2>
        </div>
    </header>
)
}
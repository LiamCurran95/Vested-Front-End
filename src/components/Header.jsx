import { Link } from "react-router-dom";

export default function Header(){
return (
    <header>
        <div className="header-buttons">
            <button>Theme : Light</button>
            <button><Link to="/login" style={{ textDecoration: "none" }}>Log In</Link></button>
        </div>
        <div className="header-text">
            <h1>VESTED</h1>
            <h2>Getting you rich (sustainably)</h2>
        </div>
    </header>
)
}
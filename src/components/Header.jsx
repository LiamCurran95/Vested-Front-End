import {Link} from "react-router-dom"

export default function Header(){
return (
    <header>
        <div className="header-buttons">
            <button>Theme : Light</button>
            <Link to="/login"><button>Log In</button></Link>
        </div>
        <div className="header-text">
            <h1>VESTED</h1>
            <h2>Getting you rich (sustainably)</h2>
        </div>
    </header>
)
}
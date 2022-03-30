import {Link} from "react-router-dom"

export default function LandingPage(){
    return (
            <main className="landing-page">
                <section className="landing-banner">
                    <h2>Welcome to Vested </h2>
                    <p>We aim to help first-time investors with an interest in ethical investing explore their options. </p>
                    <p>    
                        Answer a few simple questions, and we can show you a theoretical portfolio with companies we think 
                        you'll be interested in. We'll show you companies that rank highly on the things you care about, 
                        which also have stocks that are performing well. You can research companies further, track how your 
                        simulated portfolio performs, compare it to portfolios with interested weighted in other areas... 
                        jump in and explore.</p>
                    <div className="button-container">
                        <Link to="/welcome"><button>New User</button></Link>
                        <Link to="/login"><button>Login</button></Link>
                    </div>
                </section>
            </main>
        )
    }
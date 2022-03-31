import {Link} from "react-router-dom"
import weighted_portfolio from '../media/weighted_portfolio.png'
import news from '../media/news.png'
import tracking_portfolio from '../media/tracking_portfolio.png'
import other_user from '../media/other_user.png'



export default function WelcomePage(){
    return (
        <main className="welcome-page">
            <h1>Welcome to Vested</h1>
            <h2> Here's what we do</h2>
            <div className="demo-list">
                <ul>
                    <li>
                        <img src={weighted_portfolio}></img>
                        <section>
                        <h2> ESG-Weighted portfolio </h2>
                        <p>Fill in the questionnaire and we’ll use your answers to generate five sample companies to add to your portfolio. You can create multiple portfolios with interests weighted in different  <Link to="/infopage" style={{ textDecoration: "none" }} className="text-link">ESG</Link> criteria.</p>
                        </section>
                    </li>
                    <li>
                        <img src={news}></img>
                    <section>
                        <h2> Company information </h2>
                        <p>Find out more information about each company in your portfolio(s) and check out the latest news stories related to them. <br></br>
                        You can view a company page for each individual comany, as well as a dedicated news feed with new articles about companies in your portfolio.</p>
                        </section>
                    </li>
                    <li>
                        <img src={other_user}></img>
                    <section>
                        <h2> Social interaction</h2>
                        <p>See other users’ public portfolios</p>
                    </section>
                    </li>
                    <li>
                        <img src={tracking_portfolio}></img>
                        <section>
                        <h2> Portfolio monitoring</h2>
                        <p>Track your portfolios over time</p>
                        </section>
                    </li>
                </ul>
            </div>
            <div className="create-profile-container">
                <h3>Ready to create your profile?</h3>
                <button><Link to="/login" style={{textDecoration: "none"} } className="log-in-link">Let's go!</Link></button>
            </div>
        </main>
    )
    }
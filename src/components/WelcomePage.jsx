import {Link} from "react-router-dom"


export default function WelcomePage(){
    return (
        <main className="welcome-page">
            <h1>Welcome to Vested</h1>
            <h2> Here's what we do</h2>
            <div className="demo-list">
                <ul>
                    <li>
                        <img url=""></img>
                        <section>
                        <h2> ESG-Weighted portfolio </h2>
                        <p>Fill in the questionnaire and we’ll use your answers to generate five sample companies to add to your portfolio. You can create multiple portfolios with interests weighted in different  <Link to="/infopage" style={{ textDecoration: "none" }} className="text-link">ESG</Link> criteria.</p>
                        </section>
                    </li>
                    <li>
                        <img url=""></img>
                    <section>
                        <h2> Company information </h2>
                        <p>Find out more information about each company in your portfolio(s) and check out the latest news stories related to them. <br></br>
                        You can view a company page for each individual comany, as well as a dedicated news feed with new articles about companies in your portfolio.</p>
                        </section>
                    </li>
                    <li>
                        <img url=""></img>
                    <section>
                        <h2> Social interaction</h2>
                        <p>See other users’ public portfolios, comment and vote on your favourites, and even make comparisons with your own.</p>
                    </section>
                    </li>
                    <li>
                        <img url=""></img>
                        <section>
                        <h2> Portfolio monitoring</h2>
                        <p>Track your portfolios over time, and compare their performance to the S&P 500</p>
                        </section>
                    </li>
                </ul>
            </div>
            <div className="create-profile-container">
                <h3>Ready to create your profile?</h3>
                <button><Link to="/login" style={{textDecoration: "none"}}>Let's go!</Link></button>
            </div>
        </main>
    )
    }
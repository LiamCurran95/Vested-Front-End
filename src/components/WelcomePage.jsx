import {Link} from "react-router-dom"


export default function WelcomePage(){
    return (
        <main className="welcome-page">
            <h1>Welcome to our app, here we would like to help you understand how best to use it...</h1>
            <div className="demo-list">
                <ul>
                    <li>
                        <img url="" alt="demo explanation 1"></img>
                        <p>Fill in the questionnaire and we’ll generate a portfolio for you based on this; which you can choose to share with others 
                            or keep private. Create multiple portfolios with interests weighted in different areas.</p>
                    </li>
                    <li>
                        <img url="" alt="demo explanation 1"></img>
                        <p>Find out more information about companies in your suggested portfolios and check out the latest news stories related to them.</p>
                    </li>
                    <li>
                        <img url="" alt="demo explanation 1"></img>
                        <p>See other users’ public portfolios, comment and vote on your favourites, and even make comparisons with your own.</p>
                    </li>
                    <li>
                        <img url="" alt="demo explanation 1"></img>
                        <p>Customise your profile, visualise the data in different ways, and earn badges as you track your portfolio over time.</p>
                    </li>
                    <li>
                        <img url="" alt="demo explanation 1"></img>
                        <p>Engage with our partnered startups who have interests in the same issues you do. </p>
                    </li>
                </ul>
            </div>
            <div className="create-profile-container">
                <h3>Ready to create your profile?</h3>
                <button><Link to="/login" style={{textDecoration: "none", color: "purple"}}>Let's go!</Link></button>
            </div>
        </main>
    )
    }
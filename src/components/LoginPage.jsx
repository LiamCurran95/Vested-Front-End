export default function LoginPage(){
    return (
        <main className="log-in">
            <div className="log-in-container">
                <form>
                    <label>Email:</label>
                    <input type="text" placeholder="Enter your email here..."></input>
                    <button>Enter</button>
                </form>
                <div className="example-text">
                    <h2>Feel free to log in with this example user email if you would like - <br></br>jessjelly@yahoo.com</h2>
                </div>
            </div>
            <div className="disclaimer-text">
                <h4>Disclaimer - We will not store any of your personal information</h4>
            </div>
        </main>
    )
    }
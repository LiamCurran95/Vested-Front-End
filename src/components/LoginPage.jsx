import { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../context/userContext";
import * as api from "../api"
export default function LoginPage(){
    const {loggedInUser, setLoggedInUser} = useContext(UserContext)
    const [emailInputted, setEmailInputted] = useState('')
    const [loggingIn, setLoggingIn] = useState(false)
    const [newUser, setNewUser] = useState()
    const [welcomeMessage, setWelcomeMessage] = useState('Welome Anon')
    // const emailRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/


    useEffect(() => {
        setWelcomeMessage("Welcome " + emailInputted.split("@")[0])
        if(emailInputted.length !== 0) setLoggingIn(true)
        if(newUser === true) {
            return api.postUser(loggedInUser.username)
            .then((res) => {
               if(res === 200){
                   console.log("new user added")
               }
            })
        }
    }, [newUser])


    if(loggingIn === false) {
        return (
        <main className="log-in">
            <div className="log-in-container">
                <form className="log-in-form"
                    onSubmit={(e) => {
                            e.preventDefault()
                            console.log(emailInputted)
                                return api.findUser(emailInputted.split("@")[0])
                                .then(({result}) => {
                                    if(result !== null){
                                        console.log(result)
                                        console.log("found user")
                                        setLoggedInUser(result)
                                        setNewUser(false)
                                    } else {
                                        console.log("didnt find user")
                                        setLoggedInUser({
                                                username: emailInputted.split("@")[0],
                                                email: emailInputted,
                                                avatarUrl: "https://images.unsplash.com/photo-1606005600469-f012fe104a4d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1240&q=80",
                                                formAnswers1: {},
                                                formAnswers2: {},
                                                formAnswers3: {},
                                                portfolio1: {
                                                tickers: []
                                                },
                                                portfolio2: {
                                                tickers: []
                                                },
                                                portfolio3: {
                                                tickers: []
                                                },
                                                newUser: true,
                                                theme: "light"
                                        })
                                        setNewUser(true)
                                    }
                                })
                            } 
                    }
                >
                    <label>Email Address</label>
                    <input type="text"
                    placeholder="Enter Email here..."
                    value={emailInputted}
                    onChange={
                        (e) => {
                            setEmailInputted(e.target.value)
                        }
                    }></input>
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
    } else {
            return (
                <main>
                    <div className="logging-in-container">
                        <h2>{welcomeMessage}</h2>
                        {newUser ? <p>Please take the time to create your first portfolio with us</p> :
                                    <p>Click to enter your profile and see your portfolios</p>}
                        {newUser ? <Link to="/form" style={{ textDecoration: "none" }}>Let's create!</Link> :
                                    <Link to="/profile" style={{ textDecoration: "none" }}>Let's check!</Link>}
                    </div>
                    <div className="disclaimer-text">
                        <h4>Disclaimer - We will not store any of your personal information</h4>
                    </div>
                </main>
            )
        }
    }
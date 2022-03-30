import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import * as api from "../api"

export default function LoginPage(){
    const {loggedInUser, setLoggedInUser} = useContext(UserContext)
    const [emailInputted, setEmailInputted] = useState('')
    const [loggingIn, setLoggingIn] = useState(false)
    const [newUser, setNewUser] = useState()
    const [welcomeMessage, setWelcomeMessage] = useState('Welome Anon')
    const [validEmail, setValidEmail] = useState(true)
    const emailRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/

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

                <h3>Log in to generate, view, and monitor your portfolio</h3>

                <form className="log-in-form"
                    onSubmit={(e) => {
                            e.preventDefault()
                            if(emailInputted.match(emailRegex)){
                                setValidEmail(true)
                                return api.findUser(emailInputted.split("@")[0])
                                .then((response) => {
                                    if(response === null || response === undefined){
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
                                    } else {
                                        console.log("found user")
                                        setLoggedInUser(response)
                                        setNewUser(false)
                                    }
                                })
                            } else {
                                setValidEmail(false)
                            } 
                        }
                    }
                >
                    <div className="submit-input">
                    <input type="text"
                    style={ validEmail ? null : { backgroundColor: "red" }}
                    placeholder={ validEmail === true ? "EMAIL ADDRESS" : "Email Not Valid"}
                    value={emailInputted}
                    onChange={
                        (e) => {
                            setEmailInputted(e.target.value)
                        }
                    }></input>
                    <button>log in</button>
                    </div>

                </form>

                <div className="example-text">
                    <h4>log in as jess: jessjelly@yahoo.com</h4>
                </div>

            </div>

            <div className="disclaimer-text">
                <h5>We do not share any of your personal information</h5>
            </div>
        </main>
    )
    } else {
            return (
                <main className="log-in">
                    <div className="logging-in-container">
                        <h2>{welcomeMessage}</h2>
                        {newUser ? <p>Please take the time to create your first portfolio with us</p> :
                                    <p>Have a look at your portfolios on your profile page</p>}
                        {newUser ? <Link to="/form" style={{ textDecoration: "none" }} className="link">create a portfolio</Link> :
                                    <Link to="/profile" style={{ textDecoration: "none" }} className="link">see portfolios</Link>}
                    </div>
                        
                        <h5>We will not share any of your personal information</h5>
                </main>
            )
        }
    }


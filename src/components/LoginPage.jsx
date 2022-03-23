import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../context/userContext";
import * as api from "../api"

export default function LoginPage(){

    const {loggedInUser, setLoggedInUser} = useContext(UserContext)
    const [emailInputted, setEmailInputted] = useState('')
    const [loggingIn, setLoggingIn] = useState(false)

    const emailRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/

    return (
        <main className="log-in">
            <div className="log-in-container">
                <form className="log-in-form"
                    onSubmit={
                        e => {
                            e.preventDefault()
                            if(emailRegex.test(emailInputted)) {
                                api.findUser(emailInputted)
                                .then(userDetails => {
                                    if(userDetails.username){
                                        setLoggedInUser(userDetails)
                                        setLoggingIn(true)
                                    } else {
                                        setLoggedInUser({
                                                username: emailInputted.split('@')[0],
                                                email: emailInputted,
                                                avatarUrl: "https://images.unsplash.com/photo-1606005600469-f012fe104a4d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1240&q=80",
                                                form_answers: {
                                                environmentalRating: 0,
                                                socialRating: 0,
                                                governanceRating: 0
                                                },
                                                portfolios: {
                                                },
                                                achievements: [],
                                                newUser: true,
                                                theme: "light"
                                        })
                                        setLoggingIn(true)
                                    }
                                })
                            } else {
                                setEmailInputted("Invalid Email, delete text and try again")
                            }
                        }
                    }
                >
                    <label>Email:</label>
                    <input type="text"
                    placeholder="Enter email here..."
                    value={emailInputted}
                    onChange={
                        (e) => {
                            setEmailInputted(e.target.value)
                        }
                    }></input>
                    <button
                    type="submit"
                    ><Link to={loggingIn ? loggedInUser.username ? "/profile" : "/form" : "/login"} style={{textDecoration: "none"}}>{loggingIn ? "Entering" : "Enter"}</Link></button>
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
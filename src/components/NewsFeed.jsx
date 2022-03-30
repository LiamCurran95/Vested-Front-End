import {useContext, useState, useEffect} from "react"
import { UserContext } from "../context/userContext";
import * as api from "../api"
export default function NewsFeed(){
    const {loggedInUser} = useContext(UserContext)
    const {portfolios} = loggedInUser
    const [userPortfolios, setUserPortfolios] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [articles, setArticles] = useState()
    useEffect(()=> {
        let info = []
        for(let portfolio in portfolios) {
            const companyList = portfolios[portfolio]
            info.push(companyList)
        }
        let merged = [].concat.apply([],info)
        setUserPortfolios(merged)
        api.getNewsFeed(userPortfolios)
        .then(feedData => {
            setArticles(feedData)
            setIsLoading(false)
        })
    },[isLoading])
    return isLoading ? <p>News Feed is loading...</p> : (
        <main className="news-feed">
            <h4>NEWS ABOUT COMPANIES IN YOUR PORTFOLIOS</h4>
            <ul>
                {articles.map(article => {
                    return (
                        <li key={article.title} className="news-feed-card">
                            <h4>{article.title} - Source: {article.source}</h4>
                            <img src={article.image_url} alt={article.title}></img>
                            <p>{article.description}</p>
                            <a href={article.url} target="_blank" rel="noreferrer">see more</a>
                            <p>Posted: {article.published_at}</p>
                        </li>
                    )
                })}
            </ul>
        </main>
    )
    }
import UserBanner from "./UserBanner";
import UserPortfolioView from "./UserPortfolioView";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { Link, useParams } from "react-router-dom";
import * as api from "../api";

export default function UserProfile() {
	let { username } = useParams();
	const [userData, setUserData] = useState();
	const [userPortfolio, setUserPortfolio] = useState();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		api
			.fetchUser(username)
			.then((response) => {
				console.log("userData: ", response);
				setUserData(response.result);
				setIsLoading(false);
			})
			.catch((err) => console.dir(err));
	}, [username]);

	return isLoading ? (
		<p>Profile is loading</p>
	) : (
		<main className="user-profile">
			<section className="user-banner">
				<img src={userData.avatarUrl}></img>
				<div className="profile-text-container">
					<h2>{userData.username}</h2>
					<ul>
						<li>Achievement1</li>
						<li>Achievement2</li>
						<li>Achievement2</li>
					</ul>
				</div>
			</section>
			<section className="user-portfolio-list">
				<li>
					<p>{userData.portfolio1.tickers}</p>
					<p>{userData.portfolio2.tickers}</p>
					<p>{userData.portfolio3.tickers}</p>
				</li>
			</section>
		</main>
	);
}

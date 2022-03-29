import UserBanner from "./UserBanner";
import UserPortfolioView from "./UserPortfolioView";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { Link } from "react-router-dom";
import Chart from "./Chart";

export default function UserProfile() {
	const { loggedInUser } = useContext(UserContext);
	const { portfolios } = loggedInUser;

	const [userPortfolios, setUserPortfolios] = useState();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		let info = [];
		for (let portfolio in portfolios) {
			const companyList = portfolios[portfolio];
			info.push(companyList);
		}
		setUserPortfolios(info);
		setIsLoading(false);
	}, [portfolios]);

	return isLoading ? (
		<p>Profile is loading</p>
	) : (
		<main className="user-profile">
			<section className="user-banner">
				<img src={loggedInUser.avatarUrl}></img>
				<div className="profile-text-container">
					<h2>{loggedInUser.username}</h2>
					<ul>
						<li>Achievement1</li>
						<li>Achievement2</li>
						<li>Achievement2</li>
					</ul>
				</div>
			</section>
			<Chart />
			<section className="user-portfolio-list">
				{userPortfolios.map((portfolio, index) => {
					return (
						<li key={index}>
							<Link to={`/companyinfo/${portfolio[0]}`}>{portfolio[0]}</Link>
							<p>{portfolio[1]}</p>
							<p>{portfolio[2]}</p>
							<p>{portfolio[3]}</p>
							<p>{portfolio[4]}</p>
						</li>
					);
				})}
			</section>
		</main>
	);
}

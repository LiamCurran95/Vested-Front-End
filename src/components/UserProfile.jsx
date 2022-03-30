import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Collapse from "./Collapse";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { Link, useParams } from "react-router-dom";
import { Chart } from "./Chart";
import { getStockNames } from "../util-functions";

export default function UserProfile() {
	const { loggedInUser } = useContext(UserContext);
	const [shownPortfolio, setShownPortfolio] = useState(
		loggedInUser.portfolio1.tickers
	);
	const [isLoading, setIsLoading] = useState(true);
	const userPortfolios = [
		{ portfolio1: loggedInUser.portfolio1.tickers },
		{ portfolio2: loggedInUser.portfolio2.tickers },
		{ portfolio3: loggedInUser.portfolio3.tickers },
	];
	const [stockNames, setStockNames] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		getStockNames(shownPortfolio).then((result) => {
			setStockNames(result);
		});
		setIsLoading(false);
	}, [shownPortfolio]);

	const changePortfolioView = (param) => {
		setIsLoading(true);
		setShownPortfolio(param);
		setIsLoading(false);
	};

	return isLoading ? (
		<p>Profile is loading</p>
	) : (
		<main className="user-profile">
			<section className="user-banner">
				<img src={loggedInUser.avatarUrl}></img>
				<div className="profile-text-container">
					<h2>{loggedInUser.username}</h2>
				</div>
			</section>

			{loggedInUser.username === "Guest" ? <h2>Please log in to see your profile</h2> :
                                    <>
			<section className="profile-introduction">
				<h2>your current portfolios</h2>
				<h4>
					Here are the portfolios that Vested has generated for you based on the
					ESG prefences you specified when you added each portfolio
				</h4>
				<h4> click to visually explore stock performance in each portfolio over time</h4>
			</section>

			<Collapse>
				<div className="portfolio-view-buttons">
					<button
						onClick={() => {
							changePortfolioView(userPortfolios[0].portfolio1);
						}}
					>
						Portfolio 1
					</button>
					<button
						onClick={() => {
							changePortfolioView(userPortfolios[1].portfolio2);
						}}
						variant="outlined"
					>
						Portfolio 2
					</button>
					<button
						onClick={() => {
							changePortfolioView(userPortfolios[2].portfolio3);
						}}
						variant="outlined"
					>
						Portfolio 3
					</button>
				</div>
				<section className="profile-data-vis">
					<Chart tickers={shownPortfolio} className="chart"/>

					<>
						<section className="user-portfolio-list">
							<h4>Companies in this Portfolio </h4>
							<h5>{stockNames[0]}</h5>
							<Link to={`/companyinfo/${shownPortfolio[0]}`} className="link">
								{shownPortfolio[0]}
							</Link>
							<h5>{stockNames[1]}</h5>
							<Link to={`/companyinfo/${shownPortfolio[1]}`} className="link">
								{shownPortfolio[1]}
							</Link>
							<h5>{stockNames[2]}</h5>
							<Link to={`/companyinfo/${shownPortfolio[2]}`} className="link">
								{shownPortfolio[2]}
							</Link>
							<h5>{stockNames[3]}</h5>
							<Link to={`/companyinfo/${shownPortfolio[3]}`} className="link">
								{shownPortfolio[3]}
							</Link>
							<h5>{stockNames[4]}</h5>
							<Link to={`/companyinfo/${shownPortfolio[4]}`} className="link">
								{shownPortfolio[4]}
							</Link>
						</section>
					</>
				</section>
			</Collapse>
			</>}
		</main>
	);
}

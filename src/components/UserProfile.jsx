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
	const [changingView, setChangingView] = useState([])

	useEffect(() => {
		if(changingView.length !== 0) {
			getStockNames(shownPortfolio)
				.then((result) => {
				setStockNames(result);
				setChangingView([])
			});
		} else {
			setIsLoading(false);
		}
	}, [shownPortfolio, stockNames]);

	const changePortfolioView = (param) => {
		setIsLoading(true);
		setShownPortfolio(param);
		setChangingView(true)
		setIsLoading(false);
	};

	console.log(shownPortfolio)
	console.log(isLoading)
	console.log(stockNames)
	console.log(loggedInUser)
	console.log(changingView)

	if (isLoading === true) return <p>"Loading" </p>;
	return (
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

			{/* {if (isPortfolioLoading === true) <p>"Loading" </p> 
			else */}

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

				{isLoading === true ? "" : <Chart tickers={shownPortfolio} className="chart" />}

				 
				{stockNames.length === 0 ? "" : (	<>
						<section className="user-portfolio-list">
							<h4>Companies in Portfolio </h4>
							<h5>{stockNames[0].name}</h5>
							<Link
								to={`/companyinfo/${stockNames[0].name}`}
								className="link"
							>
								{stockNames[0].ticker}
							</Link>
							<h5>{stockNames[1].name}</h5>
							<Link
								to={`/companyinfo/${stockNames[1].name}`}
								className="link"
							>
								{stockNames[1].ticker}
							</Link>
							<h5>{stockNames[2].name}</h5>
							<Link
								to={`/companyinfo/${stockNames[2].name}`}
								className="link"
							>
								{stockNames[2].ticker}
							</Link>
							<h5>{stockNames[3].name}</h5>
							<Link
								to={`/companyinfo/${stockNames[3].name}`}
								className="link"
							>
								{stockNames[3].ticker}
							</Link>
							<h5>{stockNames[4].name}</h5>
							<Link
								to={`/companyinfo/${stockNames[4].name}`}
								className="link"
							>
								{stockNames[4].ticker}
							</Link>
						</section>
					</>)}
				</section>
			</Collapse>
			</>}
		</main>
	);
}

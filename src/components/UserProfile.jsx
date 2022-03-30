import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import UserBanner from "./UserBanner";
import UserPortfolioView from "./UserPortfolioView";
import Collapse from "./Collapse"
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { Link, useParams } from "react-router-dom";
import { Chart } from "./Chart";
import {stockNames} from "../util-functions"

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

	useEffect(() => {
		setIsLoading(true);
		setIsLoading(false);
	}, [shownPortfolio]);

	const changePortfolioView = (param) => {
		setIsLoading(true);
		setShownPortfolio(param);
		setIsLoading(false);
	};

	const tickers = () => {
		return stockNames(shownPortfolio)
	}

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

			<section className="profile-introduction">
				<h2>See your portfolios</h2>
				<h4>Here are the portfolios that Vested has generated for you based on the ESG prefences you specified when you added the portfolio</h4>
				<h4> click to explore stock performance in each portfolio over time</h4>

			</section>


			
			<Collapse>
			<Stack spacing={2} direction="row">
				<Button
					onClick={() => {
						changePortfolioView(userPortfolios[0].portfolio1);
					}}
					variant="outlined"
				>
					Show Portfolio 1
				</Button>
				<Button
					onClick={() => {
						changePortfolioView(userPortfolios[1].portfolio2);
					}}
					variant="outlined"
				>
					Show Portfolio 2
				</Button>
				<Button
					onClick={() => {
						changePortfolioView(userPortfolios[2].portfolio3);
					}}
					variant="outlined"
				>
					Show Portfolio 3
				</Button>
			</Stack>
			<section className="profile-data-vis">
			<Chart tickers={shownPortfolio}  />
			
			<>
				<section className="user-portfolio-list">
					<h4>Companies in Portfolio </h4>
					{shownPortfolio.map((portfolio, index) => {
						return (
							<li key={index}>
								<Link to={`/companyinfo/${portfolio}`} className="link">
									{portfolio}</Link>
									
							</li>
						);
					})}
				</section>
			</>
			</section>
		</Collapse>
		</main>
	);
}

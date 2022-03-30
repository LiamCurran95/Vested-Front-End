import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { Link, useParams } from "react-router-dom";
import { Chart } from "./Chart";

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
			<Chart tickers={shownPortfolio} />
			<>
				<section className="user-portfolio-list">
					{shownPortfolio.map((portfolio, index) => {
						return (
							<li key={index}>
								<Link to={`/companyinfo/${portfolio}`}>{portfolio}</Link>
							</li>
						);
					})}
				</section>
			</>
		</main>
	);
}

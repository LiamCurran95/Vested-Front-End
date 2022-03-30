import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Chart } from "./Chart";
import { fetchUser } from "../api";
import { getUserData } from "../util-functions";

export default function OtherUserProfile() {
	let { username } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [shownPortfolio, setShownPortfolio] = useState([]);
	const [userData, setUserData] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		if (shownPortfolio.length === 0) {
			getUserData(username).then((result) => {
				setUserData(result);
				setShownPortfolio(result.portfolio1.tickers);
			});
			setIsLoading(false);
		}
		setIsLoading(false);
	}, [shownPortfolio]);

	const changePortfolioView = (param) => {
		setIsLoading(true);
		setShownPortfolio(param);
		setIsLoading(false);
	};

	if (userData.length !== 0 && isLoading === true) return <p>loading...</p>;
	console.log(userData);
	return (
		<main className="user-profile">
			<section className="user-banner">
				<img src={userData.avatarUrl}></img>
				<div className="profile-text-container">
					<h2>{userData.username}</h2>
				</div>
			</section>
			<Stack spacing={2} direction="row">
				<Button
					onClick={() => {
						changePortfolioView(userData.portfolio1);
					}}
					variant="outlined"
				>
					Show Portfolio 1
				</Button>
				<Button
					onClick={() => {
						changePortfolioView(userData.portfolio2);
					}}
					variant="outlined"
				>
					Show Portfolio 2
				</Button>
				<Button
					onClick={() => {
						changePortfolioView(userData.portfolio3);
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

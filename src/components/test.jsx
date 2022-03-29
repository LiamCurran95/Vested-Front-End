import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import UserBanner from "./UserBanner";
import UserPortfolioView from "./UserPortfolioView";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { Link } from "react-router-dom";
import Chart from "./Chart";

export default function UserProfile() {
	const { loggedInUser } = useContext(UserContext);
	const [userPortfolios, setUserPortfolios] = useState([
		{ portfolio1: loggedInUser.portfolio1.tickers },
		{ portfolio2: loggedInUser.portfolio2.tickers },
		{ portfolio3: loggedInUser.portfolio3.tickers },
	]);
	const [shownPortfolio, setShownPortfolio] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		setIsLoading(false);
	}, []);

	const changePortfolioView = (param) => {
		setIsLoading(true);
		setShownPortfolio(param);
		console.log(shownPortfolio);
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
			<>
				<section className="user-portfolio-list">
					{shownPortfolio.map((portfolio, index) => {
						return (
							<>
								{/* <FormGroup>
									<FormControlLabel
										control={<Checkbox defaultChecked />}
										label={`Include ${portfolio} in data vis.`}
									/>
								</FormGroup> */}
								<li key={index}>
									<Link to={`/companyinfo/${portfolio}`}>{portfolio}</Link>
								</li>
							</>
						);
					})}
				</section>
			</>
		</main>
	);
}

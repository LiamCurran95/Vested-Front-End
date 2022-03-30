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
	const [changeView, setChangeView] = useState([])

	useEffect(() => {
		if (shownPortfolio.length === 0 && changeView.length === 0) {
			getUserData(username)
			.then((result) => {
				setUserData(result);
				setShownPortfolio(result.portfolio1.tickers);
				setIsLoading(false);
			});
		} else if(changeView.length === 0) {
			setIsLoading(false)
		}
	}, [shownPortfolio]);

	useEffect(() => {
		if(changeView.length !== 0) {
			setShownPortfolio(changeView)
			setChangeView([])
		} else {
			setIsLoading(false)
		}
	}, [changeView])

	console.log(shownPortfolio)
	
	if (isLoading === true) return <p>loading...</p>
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
						setIsLoading(true);
						setChangeView(userData.portfolio1.tickers);
					}}
					variant="outlined"
				>
					Show Portfolio 1
				</Button>
				<Button
					onClick={() => {
						setIsLoading(true);
						setChangeView(userData.portfolio2.tickers);
					}}
					variant="outlined"
				>
					Show Portfolio 2
				</Button>
				<Button
					onClick={() => {
						setIsLoading(true);
						setChangeView(userData.portfolio3.tickers);
					}}
					variant="outlined"
				>
					Show Portfolio 3
				</Button>
			</Stack>
			{isLoading === true ? <p>Loading Chart...</p> : <Chart tickers={shownPortfolio} />}
			<>
				<section className="user-portfolio-list">
					{shownPortfolio.length !== 0 ? "" : shownPortfolio.map((portfolio, index) => {
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

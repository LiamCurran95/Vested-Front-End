import { useEffect, useState } from "react";
import { fetchListOfUsernames, getEsgData } from "../api";
import { Link } from "react-router-dom";


export default function SearchBar() {
	const [users, setUsers] = useState([]);
	const [companyNames, setCompanyNames] = useState([]);
	const [query, setQuery] = useState();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		if (users.length === 0) {
			fetchListOfUsernames().then((result) => {
				setUsers(result);
			});
		} else if (companyNames.length === 0) {
			getEsgData().then((companies) => {
				const companyArr = [];
				companies.forEach((company) => {
					companyArr.push(company.name);
				});
				setCompanyNames(companyArr);
			});
		} else {
			console.log("users and company names updated");
		}
		setIsLoading(false);
	}, [users, companyNames]);

	if (isLoading === true) return <p>loading...</p>;
	return (
		<div className="search">
			<input
				placeholder="search"
				onChange={(event) => {
					event.preventDefault();
					setQuery(event.target.value);
					console.log(query);
				}}
			></input>
			{users.includes(query) ? (
				<Link to={`/users/${query}`}>User profile: {query}</Link>
			) : null}
			{companyNames.includes(query) ? (
				<Link to={`/companyinfo/${query}`}>Info about: {query}</Link>
			) : null}
		</div>
	);
}

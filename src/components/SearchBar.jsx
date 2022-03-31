import { useEffect, useState } from "react";
import { fetchListOfUsernames, getEsgData } from "../api";
import { Link } from "react-router-dom";


export default function SearchBar() {
	const [users, setUsers] = useState([]);
	const [companyNames, setCompanyNames] = useState([]);
	const [query, setQuery] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [search, setSearch] = useState([])

	useEffect(() => {
		setIsLoading(true);
		if (users.length === 0 && query.length !== 0 && search.length !== 0) {
			fetchListOfUsernames().then((result) => {
				setUsers(result);
				setSearch([])
			});
		} else if (companyNames.length === 0 && query.length !== 0 && search.length !==0) {
			getEsgData().then((companies) => {
				const companyArr = [];
				companies.forEach((company) => {
					companyArr.push(company.name);
				});
				setCompanyNames(companyArr);
				setSearch([])
			});
		} else {
			console.log("either initial mount or search triggered");
		}
		setIsLoading(false);
	}, [users, companyNames, search]);

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
			<button
			onClick={()=>{
				setSearch(true)
			}}
			>Go</button>
			<div className="search-result">
				{users.includes(query) ? (
					<Link className="search-link link" style={{ textDecoration: "none" }} to={`/users/${query}`}>User: {query}</Link>
				) : null}
				{companyNames.includes(query) ? (
					<Link className="search-link link" style={{ textDecoration: "none" }} to={`/companyinfo/${query}`}>Company: {query}</Link>
				) : null}
			</div>
		</div>
	);
}

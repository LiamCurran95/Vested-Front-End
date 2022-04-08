import { useEffect, useState } from "react";
import { fetchListOfUsernames, getEsgData } from "../api";
import { Link } from "react-router-dom";

export default function SearchBar() {
	const [users, setUsers] = useState([]);
	const [companyNames, setCompanyNames] = useState([]);
	const [query, setQuery] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [search, setSearch] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		if (users.length === 0) {
			fetchListOfUsernames().then((result) => {
				setUsers(result);
				setSearch(false);
			});
		} else if (
			companyNames.length === 0
		) {
			getEsgData().then((companies) => {
				const companyArr = [];
				companies.forEach((company) => {
					companyArr.push(company.name);
				});
				setCompanyNames(companyArr);
				setSearch(false);
			});
		}
		setIsLoading(false);
	}, [users, companyNames, search]);
	
	const searchResults = (data) => {
		const fullArr = data.filter((element)=>{
	if (query === '' || search === false){
		return null;
	} else if (element.toLowerCase().includes(query.toLowerCase())){
		return element;
	}
})
if (fullArr.length < 4) return fullArr;
return fullArr.splice(0,3);
	}

	if (isLoading === true) return <p>loading...</p>;
	return (
		<div className="search">
			<input
				placeholder="search"
				onChange={(event) => {
					event.preventDefault();
					setSearch(false);
					setQuery(event.target.value);	
				}}
			></input>
			<button
				onClick={() => {
					setSearch(true)
				}}
			>
				Go
			</button>
			<div className = "search-content">
				{searchResults(users).map((username, index)=>(
					<div className="search-result" key={index}>
						<Link
						className="search-link link"
                        style={{ textDecoration: "none" }}
                        to={`/users/${username}`}
                    >
                        User: {username}
                    </Link>
					</div>
				))
				}
				{searchResults(companyNames).map((company, index)=>(
					<div className="search-result" key={index}>
						<Link
						className="search-link link"
                        style={{ textDecoration: "none" }}
                        to={`/companyinfo/${company}`}
					>
                        Company: {company}
                    </Link>
					</div>
				))
				}
				</div>
				</div>)}

import { generateFormCompanyCard } from "../util-functions";
import { useEffect, useState } from "react";

export default function FormCompanyCard({ portfolioResults, index }) {
	const [isLoading, setIsLoading] = useState(true);
	const [companyInfo, setCompanyInfo] = useState([]);

	const company = portfolioResults[index].company;

	useEffect(() => {
		setIsLoading(true);
		generateFormCompanyCard(company).then((result) => {
			setCompanyInfo(result);
			setIsLoading(false);
		});
	}, [company]);

	if (isLoading === true)
		return <p>"More details for this company are unavailable." </p>;
	return (
		<div>
			<p>{companyInfo.detailedDescription.articleBody}</p>
			<img
				src={companyInfo.image.contentUrl}
				alt="Company logo"
				className="company_card_logos"
			></img>
			<a href={companyInfo.url} target="_blank">
				Company website
			</a>
		</div>
	);
}

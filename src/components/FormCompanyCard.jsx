import { generateFormCompanyCard } from "../util-functions";
import { useEffect, useState } from "react";

export default function FormCompanyCard({ portfolioResults, index }) {
	const [isLoading, setIsLoading] = useState(true);
	const [companyInfo, setCompanyInfo] = useState([]);
	// const [image, setImage] = useState("");

	const company = portfolioResults[index].company;

	useEffect(() => {
		setIsLoading(true);
		generateFormCompanyCard(company).then((result) => {
			setCompanyInfo(result);
			setIsLoading(false);
		});
		// .then(() => {
		// 	if (companyInfo.detailedDescription.url != undefined)
		// 		setImage(companyInfo.detailedDescription.url);
		// 	if (companyInfo.image.contentUrl != undefined)
		// 		setImage(companyInfo.image.contentUrl);
		// });
	}, [company]);

	if (isLoading === true)
		return <p>"More details for this company are unavailable." </p>;
	return (
		<div>
			<p className="form-company-card-info">
				{companyInfo.detailedDescription.articleBody}
			</p>
			{/* <img src={image} alt="Company logo" className="company_card_logos"></img> */}
			<a href={companyInfo.detailedDescription.url} target="_blank">
				Company website
			</a>
		</div>
	);
}

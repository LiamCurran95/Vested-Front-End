import { fetchCompanyDetails } from "../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { googleKey } from "../secret_info";

export default function CompanyCard() {

  const [companyData, setCompanyData]=useState();
  const [isLoading, setIsLoading]=useState(true);

  let { company } = useParams();

  useEffect(()=>{
    setIsLoading(true);
    fetchCompanyDetails(company,googleKey)
    .then((response)=>{
    setCompanyData(response)
    setIsLoading(false);
  }).catch((err)=>console.dir(err))},[company])


  if (isLoading) return <p>Loading...</p>;
  return (<main className="company-card">
    <section className="company-info">
      <p>extra info (pls remove)</p>
    <img src={companyData.image.contentUrl}/>
    <section className="company-info-text">
      <h2>{company}</h2>
      <p>{companyData.description}</p>
      <p>{companyData.detailedDescription.articleBody}</p>
      <section className = "company-info-links">
      <a href={companyData.url}>{companyData.url}</a>
      <a href={companyData.detailedDescription.url}>Click here for more info</a>
      </section>
      </section>
      </section>
      </main>);
}

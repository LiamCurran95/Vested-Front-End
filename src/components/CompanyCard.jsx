import { fetchCompanyDetails } from "../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function CompanyCard() {

  const [companyData, setCompanyData]=useState();
  const [isLoading, setIsLoading]=useState(true);

  let { company } = useParams();

  useEffect(()=>{
    setIsLoading(true);
    fetchCompanyDetails(company)
    .then((response)=>{
    setCompanyData(response)
    setIsLoading(false);
  }).catch((err)=>console.dir(err))},[company])


  if (isLoading) return <p>Loading...</p>;
  return (<main className="company-card">
     <h2>{company}</h2>
     <section className="company-info">
    <img src={companyData.image.contentUrl}/>
    <section className="company-info-text">
     
      <p>{companyData.description}</p>
      <p>{companyData.detailedDescription.articleBody}</p>
      <section className = "company-info-links">
      <a className="link" href={companyData.url} target="_blank">{company} website </a>
      <a className="link" href={companyData.detailedDescription.url} target="_blank">See more</a>
      </section>
      </section>
      </section>
      </main>);
}

import UserPortfolioCard from "./UserPortfolioCard"
import { useState, useEffect } from "react";

export default function UserPortfolioView(){
    const [companySelected, setCompanySelected]=useState();
    return (<div><UserBanner /> portfolio view here <UserPortfolioCard/> </div>)
    }
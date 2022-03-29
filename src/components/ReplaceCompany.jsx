export default function CompanyCard({portfolioResults, setPortfolioResults, index}) {
    return (
        <button 
        onClick={()=>{
            const newPortfolio = portfolioResults.filter(company => {
                if(company !== portfolioResults[index]) return company
            })
            setPortfolioResults(newPortfolio)
        }}
        >Replace</button>
    )
}
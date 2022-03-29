import * as api from "./api";

export async function generatePortfolio(env, soc, gov, user) {
	      const {username, portfolio1, portfolio2} = user
      console.log(user)

      const esgData = await api.getEsgData()
      const weightedEsg = esgData.map(company => {
        const esgCompany = {}
        esgCompany.ticker = company.ticker
        esgCompany.company = company.name
        esgCompany.score = ((company.socialScore*soc) + (company.governanceScore*gov) + (company.environmentScore*env))

        return esgCompany
      })

      const polygonData = await api.getPolygonData()
      const todaysStockData = await api.getTodaysStockData()
      const marchPolygonData = polygonData.filter((stock) => {
       if(stock.date === "2022-03-01") return stock
      })

      const comparingCurrentToMarch = (today, march) => {

        const scoredCompanies = today.map((company, index) => {
          
            if(company.averagePrice > march[index].averagePrice*1.3){
              company.score = 2000
            } else if (company.averagePrice > march[index].averagePrice*1.1) {
              company.score = 1000
            } else if (company.averagePrice < march[index].averagePrice*0.9) {
              company.score = -1000
            } else if (company.averagePrice < march[index].averagePrice*0.7) {
              company.score = -2000
            } else {
              company.score = 0
            }

          return company
        })
        return scoredCompanies
      }

      const scores = comparingCurrentToMarch(todaysStockData, marchPolygonData);

      const addingScoresToEsg = (scoreArr, esgArr) => {
        const completedScores = esgArr.map((company, index) => {
          company.score += scoreArr[index].score
          return company
        })
        return completedScores
      }

      const completelyScoredData = addingScoresToEsg(scores, weightedEsg);

      const sortedCompletelyScoredData = completelyScoredData.sort((a, b) => (a.score < b.score) ? 1 : -1);

      const portfolioCompanies = sortedCompletelyScoredData.slice(0, 20);

      // const portfolioTickers = portfolioCompanies.map(entry => {
      //   return entry.ticker
      // })

      // const portfolioNames = portfolioCompanies.map(entry => {
      //   return entry.company
      // })
      const answers = portfolio1.tickers.length === 0 ? "formAnswers1" : portfolio2.tickers.length === 0 ? "formAnswers2" : "formAnswers3"

      console.log(portfolioCompanies)
      console.log(answers)
      
      await api.updateUserFormAnswers(username, answers, env, soc, gov)

      return portfolioCompanies
}

export async function stockNames(tickers) {
	const portfolioTickers = tickers;
	const esgData = await api.getEsgData();
	const x = esgData.filter((item) => {
		return portfolioTickers.includes(item.ticker);
	});

	let tickerArr = [];
	let namesArr = [];

	const tickerNameFilter = x.forEach((stock) => {
		tickerArr.push(stock.ticker);
		namesArr.push(stock.name);
	});

	let pairs = {};
	tickerArr.forEach((key, i) => (pairs[key] = namesArr[i]));

	var keys = ["foo", "bar", "baz"];
	var values = [11, 22, 33];

	var result = {};
	keys.forEach((key, i) => (result[key] = values[i]));

	return { tickerNamePairs: pairs };
}


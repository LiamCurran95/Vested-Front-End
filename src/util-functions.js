export const generatePortfolio = async (envVal, socVal, govVal, user) => {

      const esgData = await api.getEsgData()

      const weightedEsg = esgData.map(company => {
        const esgCompany = {}
        esgCompany.ticker = company.ticker
        esgCompany.company = company.name
        esgCompany.score = ((company.socialScore*socVal) + (company.governanceScore*govVal) + (company.environmentScore*envVal))

        return esgCompany
      })

      const polygonData = await api.getPolygonData()
      const todaysStockData = await api.getTodaysStockData()
      
      const marchPolygonData = polygonData.filter(stock => stock.date === "2020-03-01")

      const comparingCurrentToMarch = (today, march) => {

        const scoredCompanies = today.map((company, index) => {
          
            if(company.averagePrice > march[index].averagePrice + 40){
              company.score = 2000
            } else if (company.averagePrice > march[index].averagePrice + 20) {
              company.score = 1000
            } else if (company.averagePrice < march[index].averagePrice - 20) {
              company.score = -1000
            } else if (company.averagePrice < march[index].averagePrice - 40) {
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

      const completelyScoredData = addingScoresToEsg(scores, weightedEsg)

      const sortedCompletelyScoredData = completelyScoredData.sort((a, b) => (a.score > b.score) ? 1 : -1)

      const portfolioCompanies = sortedCompletelyScoredData.slice(0, 5)

      const portfolioTickers = portfolioCompanies.map(entry => {
        return entry.ticker
      })

      portfolioNames = portfolioCompanies.map(entry => {
        return entry.company
      })

      //generate "answers" based on conditional logic of whether userContext-loggedInUser has formanswers1 2 or 3 filled
      
      await api.updateUserFormAnswers(user, answers, env, soc, gov)
      await api.updatePortfolioOfUser(portfolioTickers, user)

      return portfolioNames
    }
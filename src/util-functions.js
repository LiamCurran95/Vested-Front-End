export const generatePortfolio = async (envVal, socVal, govVal, user) => {

      const {username, formAnswers1, formAnswers2, formAnswers3} = user

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
          
            if(company.averagePrice > march[index].averagePrice*1.5){
              company.score = 2000
            } else if (company.averagePrice > march[index].averagePrice*1.25) {
              company.score = 1000
            } else if (company.averagePrice < march[index].averagePrice*0.75) {
              company.score = -1000
            } else if (company.averagePrice < march[index].averagePrice*0.5) {
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

      const answers = formAnswers1.length === 0 ? "formAnswers1" : formAnswers2.length === 0 ? "formAnswers2" : "formAnswers3"

      await api.updateUserFormAnswers(username, answers, env, soc, gov)
      await api.updatePortfolioOfUser(portfolioTickers, username)

      return portfolioNames
    }
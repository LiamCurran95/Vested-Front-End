import axios from "axios";
import { newsKey, polygonKey, googleKey } from "./secret_info";

const googleApi = axios.create({
  baseURL: "https://kgsearch.googleapis.com/v1",
});

export const fetchCompanyDetails = (companyName) => {
  return googleApi
    .get(
      `/entities:search?limit=1&indent=True&query=${companyName}&types=Thing,Organization,Corporation,Company&key=${googleKey}`
    )
    .then((res) => {
      return res.data.itemListElement[0].result;
    })
    .catch((err) => {
      console.dir(err);
      throw new Error(err.response.data.msg);
    });
};

export function getNewsFeed(companies) {
  return axios
    .get(
      `https://api.marketaux.com/v1/news/all?symbols=${companies}&filter_entities=true&api_token=${newsKey}`
    )
    .then((res) => {
      return res.data.data;
    });
}

export function getTodaysStockData() {
    // let date = new Date();
    // let dd = String(date.getDate()).padStart(2, '0');
    // let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    // let yyyy = date.getFullYear();

    // const urlDate = yyyy + '-' + mm + '-' + dd;
    const urlDate = "2022-03-25"

return axios
  .get(
    `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${urlDate}?adjusted=true&apiKey=${polygonKey}`
  )
  .then(({data: {results}}) => {
    const topCompanies = ['A', 'AAPL', 'ABG', 'ABT', 'ACN', 'ADBE', 'AFG', 'ALTR', 'AMAT', 'AMD', 'AMT', 'ANET', 'APAM', 'ARE', 'ASGN', 'ASIX', 'ASML', 'AVY', 'BCO', 'BLL', 'CBT', 'CC', 'CCK', 'CDNS', 'CMG', 'CNHI', 'COST', 'CR', 'CRM', 'CSR', 'DAR', 'DE', 'DHR', 'DOV', 'EBAY', 'ETN', 'EXPO', 'FB', 'FIVE', 'FLEX', 'FN', 'FR', 'FTNT', 'GIL', 'GOOGL', 'GS', 'HOLX', 'HPE', 'IT', 'JBHT', 'JBL', 'KEYS', 'KIM', 'LIN', 'LLY', 'LRCX', 'MAT', 'MATX', 'MC', 'MCB', 'MHK', 'MSFT', 'MSI', 'MT', 'NKE', 'NOG', 'NTAP', 'NVDA', 'OC', 'ON', 'ORCL', 'QCOM', 'QGEN', 'ROG', 'SHW', 'SMTC', 'SPG', 'STLA', 'STLD', 'STM', 'SUI', 'TEL', 'THRM', 'TMO', 'TSCO', 'TW', 'TX', 'TXN', 'TXT', 'VSTO', 'WCC', 'WDAY', 'WM', 'XYL', 'YUM', 'ZTS'];

    const polygonData = [];
    function compare_symbol( a, b ){
        if ( a.ticker.toLowerCase() < b.ticker.toLowerCase()){
            return -1;
        }
        if ( a.ticker.toLowerCase() > b.ticker.toLowerCase()){
            return 1;
        }
        return 0;
    }

    const matches = results.filter((result) => {
      if (topCompanies.includes(result.T)) {
        const company = {};
        company.ticker = result.T,
        company.averagePrice = result.vw,
        company.date = urlDate;
        polygonData.push(company);
      }
    });
    const sortedPolygonData = polygonData.sort(compare_symbol)
    return sortedPolygonData
  })
  .catch((err) => console.log(err));
}

const vestedApi = axios.create({
  baseURL: `https://vested-2022.herokuapp.com/api`,
});

export function findUser(username) {
  return vestedApi.get(`/users/${username}`)
  .then(({data}) => {
    return data;
  })
  .catch((err) => {
      console.dir(err);
      throw new Error(err.response.data.msg);
    });
}

export function postUser(user) {
  return vestedApi.post(`/users`, {
        username : user,
	    email : user + "@gmail.com",
        avatarUrl : "https://images.unsplash.com/photo-1606005600469-f012fe104a4d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1240&q=80",
        formAnswers1: {},
        formAnswers2: {},
        formAnswers3: {},
        portfolio1: {
        tickers: []
        },
        portfolio2: {
        tickers: []
        },
        portfolio3: {
        tickers: []
        },
        newUser: false,
        theme: "light"
  })
  .then(({status}) => {
    return status;
  })
  .catch((err) => {
      console.dir(err);
      throw new Error(err.response.data.msg);
    });
}

export function getEsgData() {
    return vestedApi.get('/ESG')
    .then(({data}) => {
        return data.result
    })
    .catch((err) => {
      console.dir(err);
      throw new Error(err.response.data.msg);
    });
}

export function getPolygonData() {
    return vestedApi.get('/polygon')
    .then(({data: {result}}) => {
        const topCompanies = ['A', 'AAPL', 'ABG', 'ABT', 'ACN', 'ADBE', 'AFG', 'ALTR', 'AMAT', 'AMD', 'AMT', 'ANET', 'APAM', 'ARE', 'ASGN', 'ASIX', 'ASML', 'AVY', 'BCO', 'BLL', 'CBT', 'CC', 'CCK', 'CDNS', 'CMG', 'CNHI', 'COST', 'CR', 'CRM', 'CSR', 'DAR', 'DE', 'DHR', 'DOV', 'EBAY', 'ETN', 'EXPO', 'FB', 'FIVE', 'FLEX', 'FN', 'FR', 'FTNT', 'GIL', 'GOOGL', 'GS', 'HOLX', 'HPE', 'IT', 'JBHT', 'JBL', 'KEYS', 'KIM', 'LIN', 'LLY', 'LRCX', 'MAT', 'MATX', 'MC', 'MCB', 'MHK', 'MSFT', 'MSI', 'MT', 'NKE', 'NOG', 'NTAP', 'NVDA', 'OC', 'ON', 'ORCL', 'QCOM', 'QGEN', 'ROG', 'SHW', 'SMTC', 'SPG', 'STLA', 'STLD', 'STM', 'SUI', 'TEL', 'THRM', 'TMO', 'TSCO', 'TW', 'TX', 'TXN', 'TXT', 'VSTO', 'WCC', 'WDAY', 'WM', 'XYL', 'YUM', 'ZTS'];
        
        function compare_symbol( a, b ){
            if ( a.ticker.toLowerCase() < b.ticker.toLowerCase()){
                return -1;
            }
            if ( a.ticker.toLowerCase() > b.ticker.toLowerCase()){
                return 1;
            }
            return 0;
        }

    const matches = result.filter((entry) => {
      if (topCompanies.includes(entry.ticker)) {
        return entry
      }
    });
    const sortedMatches = matches.sort(compare_symbol)
    return sortedMatches
    })
    .catch((err) => {
      console.dir(err);
      throw new Error(err.response.data.msg);
    });
}

export function updatePortfolioOfUser(tickerArr, username, portfolio) {
    return vestedApi.patch(`/users/${username}/${portfolio}`, {
        tickers: tickerArr
    })
    .then(({data}) => {
        return data
    })
    .catch((err) => {
      console.dir(err);
      throw new Error(err.response.data.msg);
    });
}

export function updateUserFormAnswers(user, answers, env, soc, gov) {

    return vestedApi.patch(`/users/${user}/${answers}`, {
        formResponses: {
            "environmentalRating": env,
            "socialRating": soc,
            "governanceRating": gov
        }
    })
    .then(({data}) => {
        return data
    })
    .catch((err) => {
      console.dir(err);
      throw new Error(err.response.data.msg);
    });
}
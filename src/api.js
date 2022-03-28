import axios from 'axios';
import { newsKey, polygonKey, googleKey } from './secret_info';

const googleApi = axios.create({
  baseURL: 'https://kgsearch.googleapis.com/v1',
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
    let date = new Date();
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = date.getFullYear();

    date = yyyy + '-' + mm + '-' + dd;

return axios
  .get(
    `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${date}?adjusted=true&apiKey=${polygonKey}`
  )
  .then(({ data: { results } }) => {
    const topCompanies = [
      'MSFT',
      'LIN',
      'ACN',
      'JBHT',
      'XYL',
      'TXN',
      'CRM',
      'GIL',
      'MCB',
      'INFO',
      'STM',
      'NVDA',
      'ROG',
      'ORCL',
      'MSI',
      'QCOM',
      'SHW',
      'TEL',
      'HPE',
      'EXPO',
      'ADBE',
      'MATX',
      'STLA',
      'CCK',
      'DE',
      'ASML',
      'WFG',
      'CBT',
      'MC',
      'ASIX',
      'AMD',
      'NKE',
      'APAM',
      'BLL',
      'ETN',
      'TW',
      'AMAT',
      'FN',
      'VSTO',
      'QGEN',
      'ASGN',
      'DOV',
      'TMO',
      'AFG',
      'CNHI',
      'JBL',
      'LRCX',
      'LLY',
      'ON',
      'ALTR',
      'AAPL',
      'MT',
      'FTNT',
      'GOOGL',
      'SPG',
      'STLD',
      'OC',
      'BCO',
      'NTAP',
      'TX',
      'IT',
      'TXT',
      'AVY',
      'FIVE',
      'CC',
      'MAT',
      'KIM',
      'WDAY',
      'YUM',
      'ABG',
      'NOG',
      'ARE',
      'CR',
      'MHK',
      'COST',
      'ABT',
      'ANET',
      'FR',
      'A',
      'WM',
      'DHR',
      'DAR',
      'KEYS',
      'GS',
      'FB',
      'WCC',
      'XLNX',
      'CDNS',
      'SMTC',
      'EBAY',
      'AMT',
      'SUI',
      'CSR',
      'HOLX',
      'FLEX',
      'TSCO',
      'CMG',
      'ZTS',
      'THRM',
      'AMP',
    ];
    const polygonData = [];

    const matches = results.filter((result) => {
      if (topCompanies.includes(result.T)) {
        const company = {};
        (company.ticker = result.T),
          (company.averagePrice = result.vw),
          (company.date = date);
        polygonData.push(company);
      }
      return company
    });
    return matches
  })
  .catch((err) => console.log(err));
}


const vestedApi = axios.create({
  baseUrl: `https://vested-2022.herokuapp.com/api`,
});

export function findUser(email) {
  return vestedApi.get(`/users/${email}`).then((userDetails) => {
    return userDetails;
  });
}

export function getEsgData() {
    return vestedApi.get('/ESG').then(({data}) => {
        return data
    })
}

export function getPolygonData() {
    return vestedApi.get('/polygon').then(({data}) => {
        return data
    })
}

export function updatePortfolioOfUser(tickers, username) {
    return vestedApi.patch(`/users/${username}/portfolios`, {
        portfolios: tickers
    }).then(({data}) => {
        return data
    })
}

export function updateUserFormAnswers(user, answers, env, soc, gov) {
    return vestedApi.patch(`/users/${user}/${answers}`, {
        formResponses: {
            "environmentalRating": env,
            "socialRating": soc,
            "governanceRating": gov
}
    })
}
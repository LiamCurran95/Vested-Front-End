import axios from 'axios';
import { newsKey } from './secret_info';

const googleApi = axios.create({
  baseURL: 'https://kgsearch.googleapis.com/v1',
});

export const fetchCompanyDetails = (companyName, googleKey) => {
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

const mongoApi = axios.create({
  baseUrl: ``,
});
export function getNewsFeed(companies) {
  return axios
    .get(
      `https://api.marketaux.com/v1/news/all?symbols=${companies}&filter_entities=true&api_token=${newsKey}`
    )
    .then((res) => {
      return res.data.data;
    });
}
export function findUser(email) {
  return mongoApi.get(`/users/${email}`).then((userDetails) => {
    return userDetails;
  });
}

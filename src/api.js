import axios from 'axios';

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

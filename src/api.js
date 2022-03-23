import { newsKey } from './secret-info';

const axios = require('axios');


const mongoApi = axios.create({
    baseUrl: ``
}) 

export function getNewsFeed(companies) {
    return axios.get(`https://api.marketaux.com/v1/news/all?symbols=${companies}&filter_entities=true&api_token=${newsKey}`)
    .then((res) => {
        return res.data.data
    })
}


export function findUser(email) {
    return mongoApi.get(`/users/${email}`)
    .then(userDetails => {
        return userDetails
    })
}
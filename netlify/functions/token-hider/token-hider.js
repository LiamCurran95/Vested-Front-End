react_app_polygonKey = "XR24JWjgXjJzfydkWc0ej_ksIdzsUaIG";
react_app_newsKey = "ndfNaKQGXv49tcaELgb1R4cdqxgu9qXwL9hvVxWI";
react_app_esgKey = "41805cd26631d9ee0d8d68edcc1c30b1";
react_app_googleKey = "AIzaSyBa5rL6woKrOxqIttRyhxcLGkA2J8_OTyQ";

const process = require("process");

const axios = require("axios");
const qs = require("qs");

const handler = async function (event) {
	// apply our function to the queryStringParameters and assign it to a variable
	const API_PARAMS = qs.stringify(event.queryStringParameters);
	console.log("API_PARAMS", API_PARAMS);
	// Get env var values defined in our Netlify site UI

	// TODO: customize your URL and API keys set in the Netlify Dashboard
	// this is secret too, your frontend won't see this
	const { API_SECRET = "shiba" } = process.env;
	const URL = `https://dog.ceo/api/breed/${API_SECRET}/images`;

	console.log("Constructed URL is ...", URL);

	try {
		const { data } = await axios.get(URL);
		// refer to axios docs for other methods if you need them
		// for example if you want to POST data:
		//    axios.post('/user', { firstName: 'Fred' })
		return {
			statusCode: 200,
			body: JSON.stringify(data),
		};
	} catch (error) {
		const { data, headers, status, statusText } = error.response;
		return {
			statusCode: error.response.status,
			body: JSON.stringify({ status, statusText, headers, data }),
		};
	}
};

module.exports = { handler };

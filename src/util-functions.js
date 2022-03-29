import * as api from "./api";

export async function generatePortfolio(env, soc, gov, user) {
	const { username, formAnswers1, formAnswers2 } = user;

	const esgData = await api.getEsgData();
	const weightedEsg = esgData.map((company) => {
		const esgCompany = {};
		esgCompany.ticker = company.ticker;
		esgCompany.company = company.name;
		esgCompany.score =
			company.socialScore * soc +
			company.governanceScore * gov +
			company.environmentScore * env;

		return esgCompany;
	});

	const polygonData = await api.getPolygonData();
	const todaysStockData = await api.getTodaysStockData();
	const marchPolygonData = polygonData.filter((stock) => {
		if (stock.date === "2022-03-01") return stock;
	});

	const comparingCurrentToMarch = (today, march) => {
		const scoredCompanies = today.map((company, index) => {
			if (company.averagePrice > march[index].averagePrice * 1.5) {
				company.score = 2000;
			} else if (company.averagePrice > march[index].averagePrice * 1.25) {
				company.score = 1000;
			} else if (company.averagePrice < march[index].averagePrice * 0.75) {
				company.score = -2000;
			} else if (company.averagePrice < march[index].averagePrice * 0.5) {
				company.score = -3000;
			} else {
				company.score = 0;
			}

			return company;
		});
		return scoredCompanies;
	};

	const scores = comparingCurrentToMarch(todaysStockData, marchPolygonData);

	const addingScoresToEsg = (scoreArr, esgArr) => {
		const completedScores = esgArr.map((company, index) => {
			company.score += scoreArr[index].score;
			return company;
		});
		return completedScores;
	};

	const completelyScoredData = addingScoresToEsg(scores, weightedEsg);

	const sortedCompletelyScoredData = completelyScoredData.sort((a, b) =>
		a.score < b.score ? 1 : -1
	);

	const portfolioCompanies = sortedCompletelyScoredData.slice(0, 5);

	const portfolioTickers = portfolioCompanies.map((entry) => {
		return entry.ticker;
	});

	const portfolioNames = portfolioCompanies.map((entry) => {
		return entry.company;
	});

	const answers =
		formAnswers1.length === 0
			? "formAnswers1"
			: formAnswers2.length === 0
			? "formAnswers2"
			: "formAnswers3";
	const portfolioOption =
		formAnswers1.length === 0
			? "portfolio1"
			: formAnswers2.length === 0
			? "portfolio2"
			: "portfolio3";

	console.log(portfolioCompanies);
	console.log(answers);
	console.log(portfolioOption);

	await api.updateUserFormAnswers(username, answers, env, soc, gov);
	await api.updatePortfolioOfUser(portfolioTickers, username, portfolioOption);

	return portfolioNames;
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

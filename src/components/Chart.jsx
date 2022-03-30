import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/userContext";
import * as api from "../api";

import {
	AnimatedAxis, // any of these can be non-animated equivalents
	AnimatedGrid,
	AnimatedLineSeries,
	XYChart,
	Tooltip,
} from "@visx/xychart";

export default function Chart({ tickers }) {
	const { loggedInUser } = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [toggled, setToggled] = useState(false);
	const [data, setData] = useState([]);
	const [portfolio, setPortfolio] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		setPortfolio(tickers);
		return api
			.getPolygonData()
			.then((result) => {
				// console.log(result);
				setData(result);
				setIsLoading(false);
				data;
			})
			.catch((err) => {
				setIsLoading(false);
				setError({ err });
			});
	}, [tickers]);

	const portfolioStockData = data.filter((item) =>
		portfolio.includes(item.ticker)
	);

	let ticker1ChartData = [];
	let ticker2ChartData = [];
	let ticker3ChartData = [];
	let ticker4ChartData = [];
	let ticker5ChartData = [];

	portfolioStockData.forEach((item) => {
		if (item.ticker === portfolio[0]) {
			ticker1ChartData.push({ x: item.date, y: item.averagePrice });
		}
		if (item.ticker === portfolio[1]) {
			ticker2ChartData.push({ x: item.date, y: item.averagePrice });
		}
		if (item.ticker === portfolio[2]) {
			ticker3ChartData.push({ x: item.date, y: item.averagePrice });
		}
		if (item.ticker === portfolio[3]) {
			ticker4ChartData.push({ x: item.date, y: item.averagePrice });
		}
		if (item.ticker === portfolio[4]) {
			ticker5ChartData.push({ x: item.date, y: item.averagePrice });
		}
	});

	const accessors = {
		xAccessor: (d) => d.x,
		yAccessor: (d) => d.y,
	};

	return isLoading ? (
		<p>Portfolio chart is loading</p>
	) : (
		<>
			{/* <button
				onClick={() => {
					toggled ? setToggled(false) : setToggled(true);
				}}
			>
				{" "}
				show data for stock 1{" "}
			</button> */}
			<XYChart
				height={300}
				xScale={{ type: "band" }}
				yScale={{ type: "linear" }}
			>
				<AnimatedAxis orientation="bottom" />
				<AnimatedAxis orientation="left" />
				<AnimatedGrid columns={false} numTicks={4} />
				<AnimatedLineSeries
					dataKey={`${portfolio[0]}`}
					data={ticker1ChartData}
					{...accessors}
				/>

				{/* conditional logic to render different lines based on selections  */}

				<AnimatedLineSeries
					// id={toggled ? "show" : "hide"}
					// onClick={() => {
					// 	setToggled(false);
					// }}
					dataKey={`${portfolio[1]}`}
					data={ticker2ChartData}
					{...accessors}
				/>
				<AnimatedLineSeries
					// id={toggled ? "show" : "hide"}
					// onClick={() => {
					// 	setToggled(false);
					// }}
					dataKey={`${portfolio[2]}`}
					data={ticker3ChartData}
					{...accessors}
				/>
				<AnimatedLineSeries
					// id={toggled ? "show" : "hide"}
					// onClick={() => {
					// 	setToggled(false);
					// }}
					dataKey={`${portfolio[3]}`}
					data={ticker4ChartData}
					{...accessors}
				/>
				<AnimatedLineSeries
					// id={toggled ? "show" : "hide"}
					// onClick={() => {
					// 	setToggled(false);
					// }}
					dataKey={`${portfolio[4]}`}
					data={ticker5ChartData}
					{...accessors}
				/>
				<AnimatedLineSeries
					// id={toggled ? "show" : "hide"}
					// onClick={() => {
					// 	setToggled(false);
					// }}
					dataKey={`${portfolio[1]}`}
					data={ticker2ChartData}
					{...accessors}
				/>
				<Tooltip
					snapTooltipToDatumX
					snapTooltipToDatumY
					showVerticalCrosshair
					showSeriesGlyphs
					renderTooltip={({ tooltipData, colorScale }) => (
						<div>
							<div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
								{tooltipData.nearestDatum.key}
							</div>
							{accessors.xAccessor(tooltipData.nearestDatum.datum)}
							{", "}
							{accessors.yAccessor(tooltipData.nearestDatum.datum)}
						</div>
					)}
				/>
			</XYChart>
		</>
	);
}

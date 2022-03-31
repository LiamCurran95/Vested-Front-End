import { useEffect, useState, useContext } from "react";
import { generateChartData } from "../util-functions";

import {
	AnimatedAxis, // any of these can be non-animated equivalents
	AnimatedGrid,
	AnimatedLineSeries,
	XYChart,
	Tooltip,
} from "@visx/xychart";

export function Chart({ tickers }) {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [portfolio, setPortfolio] = useState([]);
	const [data, setData] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		setPortfolio(tickers);
		generateChartData()
			.then((result) => {
				setData(result);
				setIsLoading(false);
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

	return (
		<section className="chart">
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
				<AnimatedLineSeries
					dataKey={`${portfolio[1]}`}
					data={ticker2ChartData}
					{...accessors}
				/>
				<AnimatedLineSeries
					dataKey={`${portfolio[2]}`}
					data={ticker3ChartData}
					{...accessors}
				/>
				<AnimatedLineSeries
					dataKey={`${portfolio[3]}`}
					data={ticker4ChartData}
					{...accessors}
				/>
				<AnimatedLineSeries
					dataKey={`${portfolio[4]}`}
					data={ticker5ChartData}
					{...accessors}
				/>
				<AnimatedLineSeries
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
		</section>
	);
}

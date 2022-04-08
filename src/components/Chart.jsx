import { useEffect, useState } from "react";
import { generateChartData } from "../util-functions";

import {
	AnimatedAxis,
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

	const createXYChartData = (data) => {
		const portfolioStockData = data.filter((item) =>
			portfolio.includes(item.ticker)
		);
		const portfolioStockDataSorted = portfolioStockData.sort((a, b) =>
			a.date > b.date ? 1 : b.date > a.date ? -1 : 0
		);

		let ticker1ChartData = [];
		let ticker2ChartData = [];
		let ticker3ChartData = [];
		let ticker4ChartData = [];
		let ticker5ChartData = [];

		portfolioStockDataSorted.forEach((item) => {
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
		return [
			ticker1ChartData,
			ticker2ChartData,
			ticker3ChartData,
			ticker4ChartData,
			ticker5ChartData,
		];
	};

	const XYchartData = createXYChartData(data);

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
				<AnimatedAxis
					orientation="bottom"
					numTicks={5}
					hideZero="true"
					tickClassName="x-tick"
					labelClassName="x-label"
				/>
				<AnimatedAxis
					orientation="left"
					hideZero="true"
					numTicks={5}
					label="Stock Value ($USD)"
					tickClassName="x-tick"
					labelClassName="y-label"
				/>
				<AnimatedGrid numTicks={5} />
				<AnimatedGrid numTicks={5} />
				<AnimatedLineSeries
					dataKey={`${portfolio[0]}`}
					data={XYchartData[0]}
					{...accessors}
				/>
				<AnimatedLineSeries
					dataKey={`${portfolio[1]}`}
					data={XYchartData[1]}
					{...accessors}
				/>
				<AnimatedLineSeries
					dataKey={`${portfolio[2]}`}
					data={XYchartData[2]}
					{...accessors}
				/>
				<AnimatedLineSeries
					dataKey={`${portfolio[3]}`}
					data={XYchartData[3]}
					{...accessors}
				/>
				<AnimatedLineSeries
					dataKey={`${portfolio[4]}`}
					data={XYchartData[4]}
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

import {useEffect, useState, useContext} from "react"
import { UserContext } from "../context/userContext";
import * as api from "../api"

import {
    AnimatedAxis, // any of these can be non-animated equivalents
    AnimatedGrid,
    AnimatedLineSeries,
    XYChart,
    Tooltip,
} from '@visx/xychart';

export default function Chart() {

         // const dataSet = data.map((day) => {
            //     return { ticker: day.ticker, x: day.date, y: day.averagePrice }
            // })
    // map over data set to find all average for all tickers on each unique date
    // map over data set to creat new array for each unique ticker on unique date

    //!!! make sure that toggle ID show/hide does not conflict with NAV toggle in CSS!!!
    const { loggedInUser } = useContext(UserContext)

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null);
    const [toggled, setToggled] = useState(false);
    const [data, setData] = useState([])
    const [portfolio, setPortfolio] = useState([])
    

    useEffect(() => {
        api.getPolygonData()
        .then(({result}) => {
            setData(result)
            setIsLoading(false) 
            data

        })
        .catch((err) => {
            setIsLoading(false)
            setError({ err });
          });    

    }, [])

   
    



        setPortfolio(loggedInUser.portfolio1.tickers)
        
       const portfolio1DataToCollate = data.filter(item => portfolio.includes(item.ticker))

       let portfolio1Data = []

       portfolio1DataToCollate.forEach((ticker, i) => { 
       portfolio1Data.push({[ticker.ticker] : data.filter(item => item.ticker === portfolio1DataToCollate[i].ticker)})
       })

       const testy = portfolio1Data.slice(0,5)

       const ticker1Data = testy[0].map((item) => { return { x: item.date, y: item.price}})

       // result: [{ date: asdflkj, ticker: adskfjh, average price: asdjfh}, {}, {}]

       
       const ticker2Data = []
       const ticker3Data = []
       const ticker4Data = []
       const ticker5Data = []

  
    // const ticker1 = [
    //     { x: date, y: price },
    //     { x: date, y: price },
    //     { x: date, y: price },
    // ];

 
    
    const data1 = [
        { x: '2020-01-01', y: 50 },
        { x: '2020-01-02', y: 10 },
        { x: '2020-01-03', y: 20 },
    ];

    const data2 = [
        { x: '2020-01-01', y: 30 },
        { x: '2020-01-02', y: 40 },
        { x: '2020-01-03', y: 80 },
    ];

    const accessors = {
        xAccessor: d => d.x,
        yAccessor: d => d.y,
    };

    const render = () => (
        <>
        <button onClick={() => { toggled ? setToggled(false) : setToggled(true) }}> show data for stock 1 </button>
        <XYChart height={300} xScale={{ type: 'band' }} yScale={{ type: 'linear' }}>
            <AnimatedAxis orientation="bottom" />
            <AnimatedAxis orientation="left" />
            <AnimatedGrid columns={false} numTicks={4} />
            <AnimatedLineSeries dataKey="average price of all stock in portfolio" data={data1} {...accessors} />

            {/* conditional logic to render different lines based on selections  */}

            

            <AnimatedLineSeries id={toggled ? "show" : "hide"} onClick={() => { setToggled(false) }}dataKey="Ticker 1" data={data2} {...accessors} />
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
                        {', '}
                        {accessors.yAccessor(tooltipData.nearestDatum.datum)}
                    </div>
                )}
            />
        </XYChart>
        {console.log(testy, testy[0], ticker1Data)}
        </>
        
    );

    return (
    
        render()
    )

}
import { useState, useContext, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import { UserContext } from '../context/userContext';
import generatePortfolio from "../util-functions";
import { Link } from "react-router-dom"
import * as api from "../api"

export default function Form() {
  // handle submit and post to API
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [portfolioResults, setPortfolioResults] = useState([]);
  const [envValue, setEnvValue] = useState(3);
  const [socValue, setSocValue] = useState(3);
  const [govValue, setGovValue] = useState(3);
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [ready, setReady] = useState(false)

  const Input = styled(MuiInput)`
  width: 42px;
`;
  
  useEffect(() => {
    if(formSubmitted === true) {
      return generatePortfolio(envValue, socValue, govValue, loggedInUser)
      .then(result => {
        console.log(result)
        setPortfolioResults(result)
        setSubmitted(true)
      })
    } else {
      setFormSubmitted(false)
    }
  }, [formSubmitted])

  function handleSubmit(e) {
    e.preventDefault();
    console.log('posted');
    console.log(envValue, socValue, govValue);
    setFormSubmitted(true)
  }

  const handleEnvSliderChange = (event, newValue) => {
    setEnvValue(newValue);
  };

  const handleEnvInputChange = (event) => {
    setEnvValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleEnvBlur = () => {
    if (envValue < 0) {
      setEnvValue(0);
    } else if (envValue > 100) {
      setEnvValue(100);
    }
  };

  const handleSocSliderChange = (event, newValue) => {
    setSocValue(newValue);
  };

  const handleSocInputChange = (event) => {
    setSocValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleSocBlur = () => {
    if (socValue < 0) {
      setSocValue(0);
    } else if (socValue > 100) {
      setSocValue(100);
    }
  };

  const handleGovSliderChange = (event, newValue) => {
    setGovValue(newValue);
  };

  const handleGovInputChange = (event) => {
    setGovValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleGovBlur = () => {
    if (govValue < 0) {
      setGovValue(0);
    } else if (govValue > 100) {
      setGovValue(100);
    }
  };

  if(submitted === false) {
    return (
    <>
      <h3>Answer some short questions about ESG criteria and let Vested generate a suggested portfolio.</h3>
      <h4>We combine your personal choices on areas that are most important to you with the current stock market in order to decide the best
        companies for your you to invest in.
      </h4>
      <h4>How strongly would you rate your interest in the following issues (0 is of less importance, 5 is of most importance)</h4>

      <form onSubmit={handleSubmit}>

        {/* Input for environment Values */}

        <dt>Environmental issues (an organisation’s environmental footprint, considering factors such as a companies’ carbon emissions, energy consumption and waste production).</dt>
        <Box sx={{ width: 250 }}>
          <Slider
            value={typeof envValue === 'number' ? envValue : 0}
            onChange={handleEnvSliderChange}
            aria-labelledby="input-slider"
            step={1}
            min={0}
            max={5}
          />
          <Input
            value={envValue}
            size="small"
            onChange={handleEnvInputChange}
            onBlur={handleEnvBlur}
            inputProps={{
              step: null,
              min: 0,
              max: 5,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Box>

        {/* Input for Social Values */}

        <dt>Social issues (e.g. giving back to the community through social welfare and charitable donations, and contributing positively to social issues).</dt>
        <Box sx={{ width: 250 }}>
          <Slider
            value={typeof socValue === 'number' ? socValue : 0}
            onChange={handleSocSliderChange}
            aria-labelledby="input-slider"
            step={1}
            min={0}
            max={5}
          />
          <Input
            value={socValue}
            size="small"
            onChange={handleSocInputChange}
            onBlur={handleSocBlur}
            inputProps={{
              step: null,
              min: 0,
              max: 5,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Box>

        {/* Input for Governance values */}

        <dt>Ethical Governance (considers how the company is run, for example considering factors related to employee diversity/discrimination, pay ratios, and executive compensation).</dt>
        <Box sx={{ width: 250 }}>
          <Slider
            value={typeof govValue === 'number' ? govValue : 0}
            onChange={handleGovSliderChange}
            aria-labelledby="input-slider"
            step={1}
            min={0}
            max={5}
          />
          <Input
            value={govValue}
            size="small"
            onChange={handleGovInputChange}
            onBlur={handleGovBlur}
            inputProps={{
              step: null,
              min: 0,
              max: 5,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Box>
        <button type="submit"> Generate portfolio </button>

      </form>
    </>
  );
  } else {
    return (
      <main>
        <h3>Thank you for submitting your answers</h3>
        <h4>Here are your portfolio results:</h4>
        <ul>
          {portfolioResults.length !== 0 ? portfolioResults.map(result => {
           return  (
            <li key={result.company}>
              <h5>{result.company}</h5>
            </li>
           )
          }) : ''
          }
        </ul>

        <Link to={ ready ? "/profile" : "/form" }
        onClick={()=>{
          const portfolioTickers = portfolioResults.map(result => {
            return result.ticker
          })
          const portfolioOption = loggedInUser.portfolio1.tickers.length === 0 ? "portfolio1" : loggedInUser.portfolio2.tickers.length === 0 ? "portfolio2" : "portfolio3"

          api.updatePortfolioOfUser(portfolioTickers, loggedInUser.username, portfolioOption)
          .then((result) => {
            setLoggedInUser(result)
            setReady(true)
            console.log(result)
          })
        }}
        >{ ready ? "Go To Profile" : "Confirm Choices" }</Link>
      </main>
    )
  }
}

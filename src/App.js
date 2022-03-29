import './App.css';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import ErrorPage from './components/ErrorPage';
import Nav from './components/Nav';
import Footer from './components/Footer';
import WelcomePage from './components/WelcomePage';
import LoginPage from './components/LoginPage';
import Form from './components/Form';
import UserProfile from './components/UserProfile';
import NewsFeed from './components/NewsFeed';
import InfoPage from './components/InfoPage';
import CompanyCard from './components/CompanyCard';
import { UserContext } from './context/userContext';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
        formAnswers1: {},
        formAnswers2: {},
        formAnswers3: {},
        portfolio1: {
        tickers: []
        },
        portfolio2: {
        tickers: []
        },
        portfolio3: {
        tickers: []
        },
        newUser: false,
        theme: "light"
  });

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <div className="App">
          <Header />
          <Nav />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/form" element={<Form />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/newsfeed" element={<NewsFeed />} />
            <Route path="/infopage" element={<InfoPage />} />
            <Route path="/companyinfo/:company" element={<CompanyCard />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;

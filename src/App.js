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
_id: "6241d079cf07b86c5f427140",
username: "jessjelly",
email: "jessjelly@yahoo.com",
avatarUrl: "./profile_pic.jpeg",
formAnswers1: {
environmentalRating: 4,
socialRating: 3,
governanceRating: 2,
_id: "6241d079cf07b86c5f427141"
},
formAnswers2: {
environmentalRating: 1,
socialRating: 4,
governanceRating: 3,
_id: "6241d079cf07b86c5f427142"
},
formAnswers3: {
environmentalRating: 2,
socialRating: 4,
governanceRating: 4,
_id: "6241d079cf07b86c5f427143"
},
portfolio1: {
tickers: [
"COST",
"ABT",
"ANET",
"FR",
"A"
],
_id: "6241d079cf07b86c5f427144",
createdAt: "2022-03-28T15:12:57.266Z"
},
portfolio2: {
tickers: [
"WM",
"DHR",
"DAR",
"KEYS",
"GS"
],
_id: "6241d079cf07b86c5f427145",
createdAt: "2022-03-28T15:12:57.266Z"
},
portfolio3: {
tickers: [
"FB",
"WCC",
"XLNX",
"CDNS",
"SMTC"
],
_id: "6241d079cf07b86c5f427146",
createdAt: "2022-03-28T15:12:57.267Z"
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

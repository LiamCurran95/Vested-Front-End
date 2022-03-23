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
import { UserContext } from './context/userContext';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(
    {
    username: "jessjelly",
    email: "jessjelly@yahoo.com",
    avatarUrl: "https://images.unsplash.com/photo-1606005600469-f012fe104a4d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1240&q=80",
    form_answers: {
      environmentalRating: 4,
      socialRating: 3,
      governanceRating: 2
    },
    portfolios: {
      portfolio1: ["COST", "ABT", "ANET", "FR", "A"],
      portfolio2: ["WM", "DHR", "DAR", "KEYS", "GS"],
      portfolio3: ["FB", "WCC", "XLNX", "CDNS", "SMTC"]
    },
    achievements: [],
    newUser: false,
    theme: "light"
  }
  )

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
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;

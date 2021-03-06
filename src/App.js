import "./App.css";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import ErrorPage from "./components/ErrorPage";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import WelcomePage from "./components/WelcomePage";
import LoginPage from "./components/LoginPage";
import Form from "./components/Form";
import UserProfile from "./components/UserProfile";
import NewsFeed from "./components/NewsFeed";
import InfoPage from "./components/InfoPage";
import CompanyCard from "./components/CompanyCard";
import OtherUserProfile from "./components/OtherUserProfile";
import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeContext } from "./context/themeContext";

function App() {
	const { toggle } = useContext(ThemeContext);

	return (
		<BrowserRouter>
			<div className={`App ${toggle ? "dark" : "light"}`}>
				<Nav />
				<Header />
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/welcome" element={<WelcomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/form" element={<Form />} />
					<Route path="/profile" element={<UserProfile />} />
					<Route path="/newsfeed" element={<NewsFeed />} />
					<Route path="/infopage" element={<InfoPage />} />
					<Route path="/companyinfo/:company" element={<CompanyCard />} />
					<Route path="/users/:username" element={<OtherUserProfile />} />
					<Route path="*" element={<ErrorPage />} />
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;

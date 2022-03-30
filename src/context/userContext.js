import { createContext, useState } from "react";
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
	const [loggedInUser, setLoggedInUser] = useState({
		username: "Guest",
		email: "realemail@gmail.com",
		avatarUrl:
			"https://www.croptecshow.com/wp-content/uploads/2017/04/guest-avatar-250x250px.png",
		formAnswers1: {},
		formAnswers2: {},
		formAnswers3: {},
		portfolio1: {
			tickers: [],
		},
		portfolio2: {
			tickers: [],
		},
		portfolio3: {
			tickers: [],
		},
		newUser: false,
		theme: "light",
	});

	return (
		<UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
			{children}
		</UserContext.Provider>
	);
};

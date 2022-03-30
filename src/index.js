import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UserProvider } from "./context/userContext";
import { ThemeProvider } from "./context/themeContext";

ReactDOM.render(
  <UserProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </UserProvider>,
  document.getElementById("root")
);

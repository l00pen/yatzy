import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Store from "./store";
import { createRoot } from "react-dom/client";
import { loadHighScore } from "Reducers/yatzy/localStorage";

import App from "Components/App";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({});
const persistedHighscore = loadHighScore();
const store = Store.get({
  yatzyReducer: {
    highScore: persistedHighscore,
  },
});

// store.subscribe(() => {});

const container = document.getElementById("app");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);

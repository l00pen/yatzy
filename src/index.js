import React from "react";
import { Provider } from "react-redux";
import Store from "./store";
import { createRoot } from "react-dom/client";
import { loadLocalStorage } from "Reducers/yatzy/localStorage";

import App from "Components/App";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  rollDice,
  initialMaxiDiceState,
  initialDiceState,
} from "./reducers/yatzy/dices";
import {
  maxiYatzyProtocolInitial,
  protocolInitial,
} from "./reducers/yatzy/protocol";

const theme = createTheme({});
const persistedYatzyHighscore = loadLocalStorage("yatzyHighScore");
const persistedMaxiHighscore = loadLocalStorage("maxiYatzyHighScore");
const persistedIsMaxiYatzy = loadLocalStorage("isMaxiYatzy") === true;
console.log("persistedIsMaxiYatzy", persistedIsMaxiYatzy);
const store = Store.get({
  yatzyReducer: {
    highScore: persistedIsMaxiYatzy
      ? persistedMaxiHighscore
      : persistedYatzyHighscore,
    dices: persistedIsMaxiYatzy
      ? rollDice(initialMaxiDiceState)
      : rollDice(initialDiceState),

    protocol: persistedIsMaxiYatzy ? maxiYatzyProtocolInitial : protocolInitial,
  },
  isMaxiYatzy: persistedIsMaxiYatzy,
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

import { combineReducers, applyMiddleware, compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "./middleware/redux-thunk";
import { saveLocalStorage } from "Reducers/yatzy/localStorage";

import yatzy from "./reducers/yatzy";

const initialStateMaxiYatzy = false;

const isMaxiYatzy = (state = initialStateMaxiYatzy, action) => {
  switch (action.type) {
    case "YATZY_TOGGLE_MAXI_YATZY":
      const isMaxiYatzy = action.data.isMaxiYatzy;
      saveLocalStorage("isMaxiYatzy", isMaxiYatzy);
      return isMaxiYatzy;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  yatzyReducer: yatzy,
  isMaxiYatzy: isMaxiYatzy,
});

const middlewares = [thunk];

let store;

export default {
  get(initialState = {}) {
    if (!store) {
      store = configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => {
          return getDefaultMiddleware({
            // serializableCheck: false,
          }).concat(...middlewares);
        },
      });
    }

    return store;
  },
};

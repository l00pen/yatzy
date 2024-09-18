import { combineReducers, applyMiddleware, compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "./middleware/redux-thunk";

import yatzy from "./reducers/yatzy";

const rootReducer = combineReducers({
  yatzyReducer: yatzy,
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

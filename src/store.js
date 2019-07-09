import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import thunk from './middleware/redux-thunk';

import game from './reducers/game';
import user from './reducers/user';
import yatzy from './reducers/yatzy';

const rootReducer = combineReducers({
  gameReducer: game,
  userReducer: user,
  yatzyReducer: yatzy,
});

const middlewares = [thunk];

let store;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default {
  get(initialState = {}) {
    if (!store) {
      store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(...middlewares)),
      );
    }

    return store;
  }
};

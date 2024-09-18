import { combineReducers } from "redux";

import dices from "./dices";
import protocol from "./protocol";
import highScore from "./highScore";

const initialStateAvailableRolls = 2;

const availableRolls = (state = initialStateAvailableRolls, action) => {
  switch (action.type) {
    case "YATZY_NEW_GAME":
    case "YATZY_SET_PROTOCOL_ITEM_SUM":
      return initialStateAvailableRolls;
    case "YATZY_ROLL_DICES":
      return state - 1;

    default:
      return state;
  }
};

const initialStateMaxiYatzy = true;

const isMaxiYatzy = (state = initialStateMaxiYatzy, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  availableRolls,
  dices,
  protocol,
  highScore, // yatzyHighScore
  isMaxiYatzy,
});

import { combineReducers } from "redux";

import dices from "./dices";
import protocol from "./protocol";
import highScore from "./highScore";

const initialState = 2;

const availableRolls = (state = initialState, action) => {
  switch (action.type) {
    case "YATZY_NEW_GAME":
    case "YATZY_SET_PROTOCOL_ITEM_SUM":
      return initialState;
    case "YATZY_ROLL_DICES":
      return state - 1;

    default:
      return state;
  }
};

export default combineReducers({
  availableRolls,
  dices,
  protocol,
  highScore,
});

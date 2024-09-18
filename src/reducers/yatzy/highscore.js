import {
  loadLocalStorage,
  saveLocalStorage,
} from "Reducers/yatzy/localStorage";

const initialState = 0;
const highScore = (state = initialState, action) => {
  console.log("highScore", state, action);
  switch (action.type) {
    case "YATZY_NEW_GAME":
      return loadLocalStorage("yatzyHighScore") || initialState;
    case "MAXI_YATZY_NEW_GAME":
      return loadLocalStorage("maxiYatzyHighScore") || initialState;
    case "YATZY_GAME_FINISHED":
      const potHighScore = action.data.total;
      const hasNewHighScore = potHighScore >= state;

      if (hasNewHighScore) {
        if (action.data.isMaxiYatzy) {
          saveLocalStorage("maxiYatzyHighScore", potHighScore);
        } else {
          saveLocalStorage("yatzyHighScore", potHighScore);
        }
      }
      return state;
    default:
      return state;
  }
};

export default highScore;

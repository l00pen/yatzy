import { saveHighScore } from "Reducers/yatzy/localStorage";

const initialState = [];
const highScore = (state = initialState, action) => {
  switch (action.type) {
    case "YATZY_GAME_FINISHED":
      const potHighScore = action.data.total;
      const hasNewHighScore = potHighScore >= state.highScore;
      if (hasNewHighScore) {
        saveHighScore(potHighScore);
      }
      return action.data.total;
    default:
      return state;
  }
};

export default highScore;

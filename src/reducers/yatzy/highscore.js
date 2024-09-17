import { saveHighScore } from "Reducers/yatzy/localStorage";

const initialState = 0;
const highScore = (state = initialState, action) => {
  switch (action.type) {
    case "YATZY_GAME_FINISHED":
      const potHighScore = action.data.total;
      const hasNewHighScore = potHighScore >= state;

      if (hasNewHighScore) {
        saveHighScore(potHighScore);
      }
      return state;
    default:
      return state;
  }
};

export default highScore;

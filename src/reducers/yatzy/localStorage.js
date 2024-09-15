export const loadHighScore = () => {
  try {
    const serializedState = localStorage.getItem("highScore");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveHighScore = (highScore) => {
  try {
    const serializedHighScore = JSON.stringify(highScore);
    localStorage.setItem("highScore", serializedHighScore);
  } catch (err) {
    console.log("Something happened with saveState", err);
  }
};

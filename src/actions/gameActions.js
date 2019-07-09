export function startGame() {
  return {
    type: 'START_GAME',
  }
}

export function stopGame() {
  return {
    type: 'STOP_GAME',
  }
}

export function newGame(game) {
  return {
    type: 'NEW_GAME',
  }
}
import { getRandomInt } from '../lib/helpers';

const initialState = {
  start: true,
  id: 0,
};

export default function game(state = initialState, action) {
  switch(action.type) {
    case 'NEW_USER':
      return {
        start: true,
        id: getRandomInt(0, Number.MAX_SAFE_INTEGER),
      }
    case 'NEW_GAME':
      return {
        start: true,
        id: getRandomInt(0, Number.MAX_SAFE_INTEGER),
      }
    case 'START_GAME':
      return {
        ...state,
        start: true,
      }
    case 'STOP_GAME':
      return {
        ...state,
        start: false,
      }
  }
  return state;
}
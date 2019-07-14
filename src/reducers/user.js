import { getRandomInt } from '../lib/helpers';

const initialState = {
  name: 'Jane Eyre2',
};

const NAMES = [
  'Jane Eyre',
  'Pluppen Plupp',
  'Ratna Ariel',
  'Mor Ricki',
];

function getRandomNewName() {
  const nameIndex = getRandomInt(0, NAMES.length);
  return NAMES[nameIndex];
}

export default function user(state = initialState, action) {
  switch(action.type) {
    case 'NEW_USER':
      return {
        name: getRandomNewName(),
      }
  }
  return state;
}
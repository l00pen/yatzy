export const UPPER_SECTION = [
  "ones",
  "twos",
  "threes",
  "fours",
  "fives",
  "sixes",
];
const ONES_PROTOCOL_ITEM = {
  id: "ones",
  name: "Ones",
  total: 0,
  currentSum: 0,
  isUsed: false,
  validationRule: "exact:1",
  sumRule: "sumExact:1",
};

const TWOS_PROTOCOL_ITEM = {
  id: "twos",
  name: "Twos",
  total: 0,
  currentSum: 0,
  isUsed: false,
  validationRule: "exact:2",
  sumRule: "sumExact:2",
};

const THREES_PROTOCOL_ITEM = {
  id: "threes",
  name: "Threes",
  total: 0,
  currentSum: 0,
  isUsed: false,
  validationRule: "exact:3",
  sumRule: "sumExact:3",
};
const FOURS_PROTOCOL_ITEM = {
  id: "fours",
  name: "Fours",
  total: 0,
  currentSum: 0,
  isUsed: false,
  validationRule: "exact:4",
  sumRule: "sumExact:4",
};
const FIVES_PROTOCOL_ITEM = {
  id: "fives",
  name: "Fives",
  total: 0,
  currentSum: 0,
  isUsed: false,
  validationRule: "exact:5",
  sumRule: "sumExact:5",
};
const SIXES_PROTOCOL_ITEM = {
  id: "sixes",
  name: "Sixes",
  total: 0,
  currentSum: 0,
  isUsed: false,
  validationRule: "exact:6",
  sumRule: "sumExact:6",
};
const BONUS_PROTOCOL_ITEM = {
  id: "bonus",
  total: 0,
  currentSum: 0,
  isUsed: false,
  name: "Bonus",
  disabled: true,
};
const MAXI_BONUS_PROTOCOL_ITEM = {
  id: "maxiBonus",
  total: 0,
  currentSum: 0,
  isUsed: false,
  name: "Bonus",
  disabled: true,
};
const ONE_PAIR_PROTOCOL_ITEM = {
  id: "onePair",
  total: 0,
  currentSum: 0,
  isUsed: false,
  name: "One Pair",
  validationRule: "xOfAKind:2",
  sumRule: "sumXOfAKind:2",
};
const TWO_PAIRS_PROTOCOL_ITEM = {
  id: "twoPairs",
  total: 0,
  currentSum: 0,
  isUsed: false,
  name: "Two Pairs",
  validationRule: "twoPairs", // TODO something fischy when 4 of a kind
  sumRule: "sumTwoPairs", // TODO something fischy when 4 of a kind
};
const THREE_OF_A_KIND_PROTOCOL_ITEM = {
  id: "threeOfAKind",
  total: 0,
  currentSum: 0,
  isUsed: false,
  name: "Three of a Kind",
  validationRule: "xOfAKind:3",
  sumRule: "sumXOfAKind:3",
};
const FOUR_OF_A_KIND_PROTOCOL_ITEM = {
  id: "fourOfAKind",
  total: 0,
  currentSum: 0,
  isUsed: false,
  name: "Four of a Kind",
  validationRule: "xOfAKind:4",
  sumRule: "sumXOfAKind:4",
};
const FIVE_OF_A_KIND_PROTOCOL_ITEM = {
  id: "fiveOfAKind",
  total: 0,
  currentSum: 0,
  isUsed: false,
  name: "Five of a Kind",
  validationRule: "xOfAKind:5",
  sumRule: "sumXOfAKind:5",
};
const SMALL_STRAIGHT_PROTOCOL_ITEM = {
  id: "smallStraight",
  total: 0,
  currentSum: 0,
  isUsed: false,
  name: "Small Straight",
  validationRule: "smallStraight",
  sumRule: "sumSmallStraight",
};
const LARGE_STRAIGHT_PROTOCOL_ITEM = {
  id: "largeStraight",
  total: 0,
  currentSum: 0,
  isUsed: false,
  name: "Large Straight",
  validationRule: "largeStraight",
  sumRule: "sumLargeStraight",
};
const FULL_STRAIGHT_PROTOCOL_ITEM = {
  id: "fullStraight",
  total: 0,
  currentSum: 0,
  isUsed: false,
  name: "Full Straight",
  validationRule: "fullStraight",
  sumRule: "sumFullStraight",
};
const FULL_HOUSE_PROTOCOL_ITEM = {
  id: "fullHouse",
  total: 0,
  currentSum: 0,
  isUsed: false,
  name: "Full House",
  validationRule: "fullHouse",
  sumRule: "sumFullHouse",
};
const CHANCE_PROTOCOL_ITEM = {
  id: "chance",
  total: 0,
  currentSum: 0,
  isUsed: false,
  name: "Chance",
  validationRule: "true",
  sumRule: "sumChance",
};
const YATZY_PROTOCOL_ITEM = {
  id: "yatzy",
  total: 0,
  currentSum: 0,
  isUsed: false,
  name: "Yatzy",
  validationRule: "xOfAKind:5",
  sumRule: "sumXOfAKind:5",
};
const YATZY_BONUS_PROTOCOL_ITEM = {
  id: "yatzyBonus",
  total: 0,
  isUsed: false,
  name: "Bonus",
  disabled: true,
};

export const protocolInitial = {
  ones: ONES_PROTOCOL_ITEM,
  twos: TWOS_PROTOCOL_ITEM,
  threes: THREES_PROTOCOL_ITEM,
  fours: FOURS_PROTOCOL_ITEM,
  fives: FIVES_PROTOCOL_ITEM,
  sixes: SIXES_PROTOCOL_ITEM,
  bonus: BONUS_PROTOCOL_ITEM,
  onePair: ONE_PAIR_PROTOCOL_ITEM,
  twoPairs: TWO_PAIRS_PROTOCOL_ITEM,
  threeOfAKind: THREE_OF_A_KIND_PROTOCOL_ITEM,
  fourOfAKind: FOUR_OF_A_KIND_PROTOCOL_ITEM,
  smallStraight: SMALL_STRAIGHT_PROTOCOL_ITEM,
  largeStraight: LARGE_STRAIGHT_PROTOCOL_ITEM,
  fullHouse: FULL_HOUSE_PROTOCOL_ITEM,
  chance: CHANCE_PROTOCOL_ITEM,
  yatzy: YATZY_PROTOCOL_ITEM,
  yatzyBonus: YATZY_BONUS_PROTOCOL_ITEM,
};

export const validate = (rule, dices) => {
  const [type, value] = rule.split(":");
  if (type === "exact") {
    return dices[value - 1] >= 0;
  } else if (type === "xOfAKind") {
    let highestValueIndex = -1;

    dices.forEach((diceCount, index) => {
      if (diceCount >= value) {
        highestValueIndex = index;
      }
    });

    return highestValueIndex >= 0;
  } else if (type === "twoPairs") {
    const overTwo = dices.reduce((mem, obj) => {
      if (obj >= 2) {
        mem = mem + 1;
      }
      return mem;
    }, 0);
    return overTwo >= 2;
  } else if (type === "smallStraight") {
    const at = dices.slice(0, dices.length - 1);
    const tmp = at.filter((n) => n !== 1);
    return tmp.length === 0;
  } else if (type === "largeStraight") {
    const at = dices.slice(1);
    const tmp = at.filter((n) => n !== 1);
    return tmp.length === 0;
  } else if (type === "fullStraight") {
    const at = dices.slice(0, dices.length - 1);
    const tmp = at.filter((n) => n !== 1);
    return tmp.length === 0;
  } else if (type === "true") {
    return true;
  } else if (type === "fullHouse") {
    let hasFoundThree = false;
    let hasFoundTwo = false;
    dices.forEach((diceCount) => {
      if (!hasFoundThree) {
        hasFoundThree = diceCount >= 3;
      }
      if (!hasFoundTwo) {
        hasFoundTwo = diceCount >= 2;
      }
    });
    return hasFoundTwo && hasFoundThree;
  }

  return false;
};

export const calculateSum = (rule, dices) => {
  const [type, value] = rule.split(":");
  if (type === "sumExact") {
    return dices[value - 1] * value;
  } else if (type === "sumXOfAKind") {
    let result = 0;
    dices.forEach((diceCount, index) => {
      if (diceCount >= value) {
        result = (index + 1) * value;
      }
    });
    return result;
  } else if (type === "sumTwoPairs") {
    let pairOfSame = false;
    const pairArray = dices.reduce((mem, obj, idx) => {
      if (obj >= 4) {
        mem.push(idx);
        pairOfSame = true;
        return mem;
      }
      if (obj >= 2) {
        mem.push(idx);
      }
      return mem;
    }, []);

    if (pairOfSame) {
      return (pairArray.pop() + 1) * 4;
    }

    if (pairArray.length >= 2) {
      const idx1 = pairArray.pop() + 1;
      const idx2 = pairArray.pop() + 1;

      return idx1 * 2 + idx2 * 2;
    }
  } else if (type === "sumSmallStraight") {
    return 15;
  } else if (type === "sumLargeStraight") {
    return 20;
  } else if (type === "sumFullStraight") {
    return 25;
  } else if (type === "sumChance") {
    return dices.reduce((mem, nr, faceValue) => {
      return mem + nr * (faceValue + 1);
    }, 0);
  } else if (type === "sumFullHouse") {
    let hasFoundThree = false;
    let hasFoundTwo = false;
    let idx1 = 0;
    let idx2 = 0;
    for (var i = dices.length - 1; i >= 0; i--) {
      if (!hasFoundThree && dices[i] >= 3) {
        hasFoundThree = true;
        idx1 = i + 1;
      } else if (!hasFoundTwo && dices[i] >= 2) {
        hasFoundTwo = true;
        idx2 = i + 1;
      }
    }
    if (!!idx1 && !!idx2) {
      return idx1 * 3 + idx2 * 2;
    }
  }
  return 0;
};

export const maxiYatzyProtocolInitial = {
  ones: ONES_PROTOCOL_ITEM,
  twos: TWOS_PROTOCOL_ITEM,
  threes: THREES_PROTOCOL_ITEM,
  fours: FOURS_PROTOCOL_ITEM,
  fives: FIVES_PROTOCOL_ITEM,
  sixes: SIXES_PROTOCOL_ITEM,
  maxiBonus: MAXI_BONUS_PROTOCOL_ITEM,
  onePair: ONE_PAIR_PROTOCOL_ITEM,
  twoPairs: TWO_PAIRS_PROTOCOL_ITEM,
  threeOfAKind: THREE_OF_A_KIND_PROTOCOL_ITEM,
  fourOfAKind: FOUR_OF_A_KIND_PROTOCOL_ITEM,
  fiveOfAKind: FIVE_OF_A_KIND_PROTOCOL_ITEM,
  smallStraight: SMALL_STRAIGHT_PROTOCOL_ITEM,
  largeStraight: LARGE_STRAIGHT_PROTOCOL_ITEM,
  fullStraight: FULL_STRAIGHT_PROTOCOL_ITEM,
  fullHouse: FULL_HOUSE_PROTOCOL_ITEM,
  // house
  // tower
  chance: CHANCE_PROTOCOL_ITEM,
  // maxiYatzy
};

const protocol = (state = protocolInitial, action) => {
  switch (action.type) {
    case "YATZY_NEW_GAME":
      return protocolInitial;
    case "MAXI_YATZY_NEW_GAME":
      return maxiYatzyProtocolInitial;
    case "YATZY_SET_PROTOCOL_ITEM_SUM":
      const { id, currentSum, isUsed } = action.data;
      if (!isUsed) {
        return {
          ...state,
          [id]: {
            ...action.data,
            isUsed: true,
            total: currentSum,
          },
        };
      }
      return state;
    default:
      return state;
  }
};

export default protocol;

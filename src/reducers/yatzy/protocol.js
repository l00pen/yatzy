export const UPPER_SECTION = [
  "ones",
  "twos",
  "threes",
  "fours",
  "fives",
  "sixes",
];

const protocolInitial = {
  ones: {
    id: "ones",
    name: "Ones",
    total: 0,
    currentSum: 0,
    isUsed: false,
    validationRule: "exact:1",
    sumRule: "sumExact:1",
  },
  twos: {
    id: "twos",
    name: "Twos",
    total: 0,
    currentSum: 0,
    isUsed: false,
    validationRule: "exact:2",
    sumRule: "sumExact:2",
  },
  threes: {
    id: "threes",
    name: "Threes",
    total: 0,
    currentSum: 0,
    isUsed: false,
    validationRule: "exact:3",
    sumRule: "sumExact:3",
  },
  fours: {
    id: "fours",
    name: "Fours",
    total: 0,
    currentSum: 0,
    isUsed: false,
    validationRule: "exact:4",
    sumRule: "sumExact:4",
  },
  fives: {
    id: "fives",
    name: "Fives",
    total: 0,
    currentSum: 0,
    isUsed: false,
    validationRule: "exact:5",
    sumRule: "sumExact:5",
  },
  sixes: {
    id: "sixes",
    name: "Sixes",
    total: 0,
    currentSum: 0,
    isUsed: false,
    validationRule: "exact:6",
    sumRule: "sumExact:6",
  },
  bonus: {
    id: "bonus",
    total: 0,
    currentSum: 0,
    isUsed: false,
    name: "Bonus",
    disabled: true,
  },
  onePair: {
    id: "onePair",
    total: 0,
    currentSum: 0,
    isUsed: false,
    name: "One Pair",
    validationRule: "xOfAKind:2",
    sumRule: "sumXOfAKind:2",
  },
  twoPairs: {
    id: "twoPairs",
    total: 0,
    currentSum: 0,
    isUsed: false,
    name: "Two Pairs",
    validationRule: "twoPairs", // TODO something fischy when 4 of a kind
    sumRule: "sumTwoPairs", // TODO something fischy when 4 of a kind
  },
  threeOfAKind: {
    id: "threeOfAKind",
    total: 0,
    currentSum: 0,
    isUsed: false,
    name: "Three of a Kind",
    validationRule: "xOfAKind:3",
    sumRule: "sumXOfAKind:3",
  },
  fourOfAKind: {
    id: "fourOfAKind",
    total: 0,
    currentSum: 0,
    isUsed: false,
    name: "Four of a Kind",
    validationRule: "xOfAKind:4",
    sumRule: "sumXOfAKind:4",
  },
  smallStraight: {
    id: "smallStraight",
    total: 0,
    currentSum: 0,
    isUsed: false,
    name: "Small Straight",
    validationRule: "smallStraight",
    sumRule: "sumSmallStraight",
  },
  largeStraight: {
    id: "largeStraight",
    total: 0,
    currentSum: 0,
    isUsed: false,
    name: "Large Straight",
    validationRule: "largeStraight",
    sumRule: "sumLargeStraight",
  },
  fullHouse: {
    id: "fullHouse",
    total: 0,
    currentSum: 0,
    isUsed: false,
    name: "Full House",
    validationRule: "fullHouse",
    sumRule: "sumFullHouse",
  },
  chance: {
    id: "chance",
    total: 0,
    currentSum: 0,
    isUsed: false,
    name: "Chance",
    validationRule: "true",
    sumRule: "sumChance",
  },
  yatzy: {
    id: "yatzy",
    total: 0,
    currentSum: 0,
    isUsed: false,
    name: "Yatzy",
    validationRule: "xOfAKind:5",
    sumRule: "sumXOfAKind:5",
  },
  yatzyBonus: {
    id: "yatzyBonus",
    total: 0,
    isUsed: false,
    name: "Bonus",
    disabled: true,
  },
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

const protocol = (state = protocolInitial, action) => {
  switch (action.type) {
    case "YATZY_NEW_GAME":
      return protocolInitial;
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

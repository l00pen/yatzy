class XOfAKindClass {
  constructor(nrOfKind, name) {
    this.nrOfKind = nrOfKind;
    this.faceIndex = -1;
    this.name = name;
  }

  valid(dices) {
    this.faceIndex = -1;
    if (!this.isUsed) {
      dices.forEach((diceCount, index) => {
        if (diceCount >= this.nrOfKind) {
          this.faceIndex = index;
        }
      });

      return this.faceIndex >= 0;
    }
    return false;
  }

  getFaceValue(dices) {
    this.valid(dices);
    return this.faceIndex + 1;
  }

  sum(dices) {
    if (this.valid(dices)) {
      return this.getFaceValue(dices) * this.nrOfKind;
    }
    return 0;
  }
}

class TwoPairs {
  constructor() {
    this.total = 0;
    this.isUsed = false;
    this.name = `Two Pairs`;
  }

  valid(combos) {
    if (!this.isUsed) {
      const overTwo = combos.reduce((mem, obj) => {
        if (obj >= 2) {
          mem = mem + 1;
        }
        return mem;
      }, 0);
      return overTwo >= 2;
    }
    return false;
  }

  sum(combos) {
    if (this.valid(combos)) {
      let pairOfSame = false;
      const pairArray = combos.reduce((mem, obj, idx) => {
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
    }
    return 0;
  }
}

class SmallStraight {
  constructor() {
    this.total = 0;
    this.isUsed = false;
    this.name = `Small Straight`;
  }

  valid(combos) {
    if (!this.isUsed) {
      const at = combos.slice(0, combos.length - 1);
      const tmp = at.filter((n) => n !== 1);
      return tmp.length === 0;
    }
    return false;
  }

  sum(combos) {
    if (this.valid(combos)) {
      const at = combos.slice(0, combos.length - 1);
      const tmp = at.filter((n) => n !== 1);
      if (tmp.length === 0) {
        return 15;
      }
    }
    return 0;
  }
}

class LargeStraight {
  constructor() {
    this.total = 0;
    this.isUsed = false;
    this.name = `Large Straight`;
  }

  valid(combos) {
    if (!this.isUsed) {
      const at = combos.slice(1);
      const tmp = at.filter((n) => n !== 1);
      return tmp.length === 0;
    }
    return false;
  }

  sum(combos) {
    if (this.valid(combos)) {
      const at = combos.slice(1);
      const tmp = at.filter((n) => n !== 1);
      if (tmp.length === 0) {
        return 20;
      }
    }
    return 0;
  }
}

class FullHouse {
  constructor() {
    this.total = 0;
    this.isUsed = false;
    this.name = `Full House`;
  }

  valid(combos) {
    if (!this.isUsed) {
      let hasFoundThree = false;
      let hasFoundTwo = false;
      return combos.reduceRight((isValid, diceCount, index) => {
        if (!hasFoundThree) {
          hasFoundThree = diceCount >= 3;
        }
        if (!hasFoundTwo) {
          hasFoundTwo = diceCount >= 2;
        }
        return hasFoundTwo && hasFoundThree;
      }, false);
    }
    return false;
  }

  sum(combos) {
    if (this.valid(combos)) {
      let hasFoundThree = false;
      let hasFoundTwo = false;
      let idx1 = 0;
      let idx2 = 0;
      for (var i = combos.length - 1; i >= 0; i--) {
        if (!hasFoundThree && combos[i] >= 3) {
          hasFoundThree = true;
          idx1 = i + 1;
        } else if (!hasFoundTwo && combos[i] >= 2) {
          hasFoundTwo = true;
          idx2 = i + 1;
        }
      }
      if (!!idx1 && !!idx2) {
        return idx1 * 3 + idx2 * 2;
      }
    }
    return 0;
  }
}

class UpperSectionClass {
  constructor(faceValue, name) {
    this.total = 0;
    this.isUsed = false;
    this.faceValue = faceValue;
    this.diceIndex = faceValue - 1;
    this.name = name;
  }

  valid(dices) {
    if (!this.used) {
      return dices[this.diceIndex] >= 0;
    }
    return false;
  }

  sum(dices) {
    if (this.valid(dices)) {
      return dices[this.diceIndex] * this.faceValue;
    }
    return 0;
  }
}

const initialState = () => {
  const upperSection = {
    ones: new UpperSectionClass(1, "Ones"),
    twos: new UpperSectionClass(2, "Twos"),
    threes: new UpperSectionClass(3, "Threes"),
    fours: new UpperSectionClass(4, "Fours"),
    fives: new UpperSectionClass(5, "Fives"),
    sixes: new UpperSectionClass(6, "Sixes"),
  };

  const bonusForUpper = {
    bonus: {
      total: 0,
      isUsed: false,
      valid: () => false,
      sum: () => 0,
      name: "Bonus",
      disabled: true,
    },
  };

  const yatzyBonus = {
    yatzyBonus: {
      total: 0,
      isUsed: false,
      valid: () => false,
      sum: () => 0,
      name: "Bonus",
      disabled: true,
    },
  };

  const lowerSection = {
    onePair: new XOfAKindClass(2, "One Pair"),
    twoPairs: new TwoPairs(),
    threeOfAKind: new XOfAKindClass(3, "Three of a Kind"),
    fourOfAKind: new XOfAKindClass(4, "Four of a Kind"),
    smallStraight: new SmallStraight(),
    largeStraight: new LargeStraight(),
    fullHouse: new FullHouse(),
    chance: {
      name: "Chance",
      total: 0,
      isUsed: false,
      valid: function () {
        return !this.isUsed;
      },
      sum: (combos) => {
        return combos.reduce((mem, nr, faceValue) => {
          return mem + nr * (faceValue + 1);
        }, 0);
      },
    },
    yatzy: new XOfAKindClass(5, "Yatzy"),
  };
  return { ...upperSection, ...bonusForUpper, ...lowerSection, ...yatzyBonus };
};

const protocol = (state = initialState(), action) => {
  switch (action.type) {
    case "NEW_USER":
    case "YATZY_NEW_GAME":
      return initialState();
    case "YATZY_SET_PROTOCOL_ITEM_SUM":
      const { label, currentSum, isValid, isUsed } = action.data;
      if (!isUsed) {
        const obj = state[label];
        obj.total = currentSum;
        obj.isUsed = true;

        state[label] = obj;
      }
      return {
        ...state,
      };
    default:
      return state;
  }
  return state;
};

export default protocol;

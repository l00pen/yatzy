import { createSelector } from "reselect";

const getDices = (state) => {
  return state.dices;
};

const getProtocol = (state) => {
  return state.protocol;
};

const getCurrentRoundCombination = createSelector([getDices], (dices) => {
  const cb = [0, 0, 0, 0, 0, 0];
  dices.forEach(({ value }) => {
    ++cb[value];
  });
  return cb;
});

const getBonus = createSelector([getProtocol], (protocol, state) => {
  let total = 0;
  let currentSum = -63;
  let isUsed = false;
  const UPPER_SECTION = ["ones", "twos", "threes", "fours", "fives", "sixes"];

  const currentTotal = UPPER_SECTION.reduce((mem, key) => {
    return mem + protocol[key].total;
  }, 0);

  const allUpperHaveBeenUsed = UPPER_SECTION.reduce((mem, key) => {
    return mem && protocol[key].isUsed;
  }, true);

  if (allUpperHaveBeenUsed) {
    if (currentTotal >= 63) {
      total = 50;
    } else {
      total = 0;
    }
    return {
      ...protocol.bonus,
      label: "bonus",
      isUsed: true,
      total,
    };
  }

  if (!isUsed) {
    currentSum = currentSum + currentTotal;
  }

  return {
    ...protocol.bonus,
    label: "bonus",
    currentSum,
  };
});

const getYatzyBonus = createSelector([getProtocol], (protocol) => {
  if (protocol["yatzy"].isUsed) {
    return {
      ...protocol.yatzyBonus,
      label: "yatzyBonus",
      isUsed: true,
      total: protocol["yatzy"].total > 0 ? 100 : 0,
    };
  }
  return {
    ...protocol.yatzyBonus,
    label: "yatzyBonus",
    currentSum: 0,
  };
});

const getCurrentProtocol = createSelector(
  [getCurrentRoundCombination, getBonus, getYatzyBonus, getProtocol],
  (combintationHelper, bonus, yatzyBonus, state) => {
    return Object.keys(state).map((key) => {
      const item = state[key];
      if (key === "bonus") {
        return bonus;
      }
      if (key === "yatzyBonus") {
        return yatzyBonus;
      }
      if (!item.used) {
        return {
          ...item,
          label: key,
          isValid: item.valid(combintationHelper),
          currentSum: item.sum(combintationHelper),
        };
      }
      return {
        ...item,
        label: key,
      };
    });
  }
);

const getTotal = createSelector([getCurrentProtocol], (state) => {
  return state.reduce((sum, currentItem) => {
    const tmp = currentItem.total ?? 0;
    console.log(tmp);
    return sum + tmp;
  }, 0);
});

const getIsGameFinished = createSelector([getCurrentProtocol], (protocol) => {
  return protocol.reduce((mem, { isUsed }) => {
    return mem && isUsed;
  }, true);
});

export {
  getCurrentRoundCombination,
  getCurrentProtocol,
  getTotal,
  getBonus,
  getIsGameFinished,
};

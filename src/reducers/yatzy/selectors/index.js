import { createSelector } from "reselect";
import { UPPER_SECTION, validate, calculateSum } from "../protocol";

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

const getBonus = (protocol) => {
  const BONUS_TRESHOLD = 63;
  let total = 0;
  let currentSum = -BONUS_TRESHOLD;
  let isUsed = false;

  const currentTotal = UPPER_SECTION.reduce((mem, key) => {
    return mem + protocol[key].total;
  }, 0);

  const allUpperHaveBeenUsed = UPPER_SECTION.reduce((mem, key) => {
    return mem && protocol[key].isUsed;
  }, true);

  if (allUpperHaveBeenUsed || currentTotal >= BONUS_TRESHOLD) {
    isUsed = true;
    if (currentTotal >= BONUS_TRESHOLD) {
      total = 50;
    } else {
      total = 0;
    }
  }

  if (!isUsed) {
    currentSum = currentSum + currentTotal;
  }

  return {
    ...protocol.bonus,
    currentSum,
    total,
    isUsed,
  };
};

const getMaxiBonus = (protocol) => {
  const BONUS_TRESHOLD = 75;
  let total = 0;
  let currentSum = -BONUS_TRESHOLD;
  let isUsed = false;

  const currentTotal = UPPER_SECTION.reduce((mem, key) => {
    return mem + protocol[key].total;
  }, 0);

  const allUpperHaveBeenUsed = UPPER_SECTION.reduce((mem, key) => {
    return mem && protocol[key].isUsed;
  }, true);

  if (allUpperHaveBeenUsed || currentTotal >= BONUS_TRESHOLD) {
    isUsed = true;
    if (currentTotal >= BONUS_TRESHOLD) {
      total = 50;
    } else {
      total = 0;
    }
  }

  if (!isUsed) {
    currentSum = currentSum + currentTotal;
  }

  return {
    ...protocol.maxiBonus,
    currentSum,
    total,
    isUsed,
  };
};

const getYatzyBonus = (protocol) => {
  if (protocol["yatzy"].isUsed) {
    return {
      ...protocol.yatzyBonus,
      isUsed: true,
      total: protocol["yatzy"].total > 0 ? 100 : 0,
    };
  }
  return {
    ...protocol.yatzyBonus,
    currentSum: 0,
  };
};

const getCurrentProtocol = createSelector(
  [getCurrentRoundCombination, getProtocol],
  (combintationHelper, protocol) => {
    return Object.keys(protocol).map((key) => {
      const item = protocol[key];
      if (key === "bonus") {
        return getBonus(protocol);
      }
      if (key === "yatzyBonus") {
        return getYatzyBonus(protocol);
      }
      if (key === "maxiBonus") {
        return getMaxiBonus(protocol);
      }
      if (!item.used) {
        const isValid = validate(item.validationRule, combintationHelper);
        const currentSum = calculateSum(item.sumRule, combintationHelper);
        return {
          ...item,

          isValid: isValid,
          currentSum: isValid ? currentSum : 0,
        };
      }
      return {
        ...item,
        currentSum: 0,
      };
    });
  }
);

const getTotal = createSelector([getCurrentProtocol], (state) => {
  return state.reduce((sum, currentItem) => {
    const tmp = currentItem.total ?? 0;
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
  getIsGameFinished,
};

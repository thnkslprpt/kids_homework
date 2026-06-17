function generateAdditionValues(difficulty) {
  const config = {
    1: { min: 0, max: 10, answerMin: 0, answerMax: 20, negativeBias: 0 },
    2: { min: -5, max: 20, answerMin: -10, answerMax: 30, negativeBias: 0.3 },
    3: { min: -10, max: 30, answerMin: -20, answerMax: 40, negativeBias: 0.4 },
    4: { min: -20, max: 50, answerMin: -20, answerMax: 70, negativeBias: 0.5 },
    5: { min: -20, max: 80, answerMin: -20, answerMax: 100, negativeBias: 0.55 },
    6: { min: -60, max: 160, answerMin: -100, answerMax: 220, negativeBias: 0.55 },
    7: { min: -150, max: 350, answerMin: -220, answerMax: 500, negativeBias: 0.6 },
  }[difficulty];

  return buildSignedOperationValues((left, right) => left + right, config);
}

function generateSubtractionValues(difficulty) {
  const config = {
    1: { min: 0, max: 12, answerMin: 0, answerMax: 12, negativeBias: 0 },
    2: { min: -5, max: 20, answerMin: -10, answerMax: 25, negativeBias: 0.35 },
    3: { min: -10, max: 30, answerMin: -20, answerMax: 40, negativeBias: 0.45 },
    4: { min: -20, max: 50, answerMin: -20, answerMax: 70, negativeBias: 0.55 },
    5: { min: -20, max: 80, answerMin: -20, answerMax: 100, negativeBias: 0.6 },
    6: { min: -60, max: 160, answerMin: -120, answerMax: 220, negativeBias: 0.62 },
    7: { min: -150, max: 350, answerMin: -300, answerMax: 500, negativeBias: 0.66 },
  }[difficulty];

  return buildSignedOperationValues((left, right) => left - right, config);
}

function buildSignedOperationValues(operation, config) {
  while (true) {
    const left = randomInt(config.min, config.max);
    const right = randomInt(config.min, config.max);
    const answer = operation(left, right);

    if (answer < config.answerMin || answer > config.answerMax) {
      continue;
    }

    if (
      config.negativeBias > 0 &&
      Math.random() < config.negativeBias &&
      left >= 0 &&
      right >= 0 &&
      answer >= 0
    ) {
      continue;
    }

    return [left, right, answer];
  }
}

function generateMultiplicationValues(difficulty) {
  const config = {
    1: { min: 0, max: 5, requireLargeFactor: false },
    2: { min: 0, max: 6, requireLargeFactor: false },
    3: { min: 0, max: 8, requireLargeFactor: false },
    4: { min: 1, max: 10, requireLargeFactor: false },
    5: { min: 2, max: 10, requireLargeFactor: true },
    6: { min: 3, max: 12, requireLargeFactor: true },
    7: { min: 4, max: 15, requireLargeFactor: true },
  }[difficulty];

  while (true) {
    const left = randomInt(config.min, config.max);
    const right = randomInt(config.min, config.max);
    if (config.requireLargeFactor && left < 6 && right < 6) {
      continue;
    }
    return { left, right };
  }
}

function generateDivisionProblem(difficulty) {
  const config = {
    1: { divisors: [2, 3, 4, 5], quotientMin: 1, quotientMax: 10 },
    2: { divisors: [2, 3, 4, 5, 6, 10], quotientMin: 2, quotientMax: 12 },
    3: { divisors: [2, 3, 4, 5, 6, 7, 8, 9, 10], quotientMin: 2, quotientMax: 15 },
    4: { divisors: [3, 4, 5, 6, 7, 8, 9, 10, 12], quotientMin: 3, quotientMax: 18 },
    5: { divisors: [4, 5, 6, 7, 8, 9, 10, 12], quotientMin: 4, quotientMax: 25 },
    6: { divisors: [5, 6, 7, 8, 9, 10, 11, 12, 15], quotientMin: 5, quotientMax: 32 },
    7: { divisors: [6, 7, 8, 9, 10, 11, 12, 14, 15], quotientMin: 6, quotientMax: 45 },
  }[difficulty];

  const divisor = randomChoice(config.divisors);
  const quotient = randomInt(config.quotientMin, config.quotientMax);
  return {
    divisor,
    dividend: divisor * quotient,
    quotient,
  };
}

function generateMissingNumberProblem(difficulty) {
  const operation = randomChoice(
    {
      1: ["addition", "subtraction"],
      2: ["addition", "subtraction"],
      3: ["addition", "subtraction", "multiplication"],
      4: ["addition", "subtraction", "multiplication", "division"],
      5: ["addition", "subtraction", "multiplication", "division"],
      6: ["addition", "subtraction", "multiplication", "division"],
      7: ["addition", "subtraction", "multiplication", "division"],
    }[difficulty]
  );

  if (operation === "addition") {
    const [left, right, answer] = generateAdditionValues(Math.max(1, difficulty - 1));
    if (Math.random() < 0.5) {
      return {
        questionText: "What number goes in the blank?",
        displayText: `__ + ${formatSignedNumber(right)} = ${formatSignedNumber(answer)}`,
        answer: left,
      };
    }

    return {
      questionText: "What number goes in the blank?",
      displayText: `${formatSignedNumber(left)} + __ = ${formatSignedNumber(answer)}`,
      answer: right,
    };
  }

  if (operation === "subtraction") {
    const [left, right, answer] = generateSubtractionValues(Math.max(1, difficulty - 1));
    if (Math.random() < 0.5) {
      return {
        questionText: "What number goes in the blank?",
        displayText: `__ - ${formatSignedNumber(right)} = ${formatSignedNumber(answer)}`,
        answer: left,
      };
    }

    return {
      questionText: "What number goes in the blank?",
      displayText: `${formatSignedNumber(left)} - __ = ${formatSignedNumber(answer)}`,
      answer: right,
    };
  }

  if (operation === "multiplication") {
    const { left, right } = generateMultiplicationValues(difficulty);
    if (Math.random() < 0.5) {
      return {
        questionText: "What number goes in the blank?",
        displayText: `__ × ${right} = ${left * right}`,
        answer: left,
      };
    }

    return {
      questionText: "What number goes in the blank?",
      displayText: `${left} × __ = ${left * right}`,
      answer: right,
    };
  }

  const { dividend, divisor, quotient } = generateDivisionProblem(difficulty);
  if (Math.random() < 0.5) {
    return {
      questionText: "What number goes in the blank?",
      displayText: `__ ÷ ${divisor} = ${quotient}`,
      answer: dividend,
    };
  }

  return {
    questionText: "What number goes in the blank?",
    displayText: `${dividend} ÷ __ = ${quotient}`,
    answer: divisor,
  };
}

function generateDecimalOperationProblem(difficulty) {
  const config = {
    1: { digits: 1, maxWhole: 3, allowSubtraction: false },
    2: { digits: 1, maxWhole: 8, allowSubtraction: true },
    3: { digits: 2, maxWhole: 10, allowSubtraction: true },
    4: { digits: 2, maxWhole: 20, allowSubtraction: true },
    5: { digits: 2, maxWhole: 35, allowSubtraction: true },
    6: { digits: 2, maxWhole: 60, allowSubtraction: true },
    7: { digits: 3, maxWhole: 75, allowSubtraction: true },
  }[difficulty];
  const scale = 10 ** config.digits;
  const operator = config.allowSubtraction && Math.random() < 0.45 ? "-" : "+";

  while (true) {
    const leftScaled = randomInt(scale, config.maxWhole * scale);
    const rightScaled =
      operator === "-"
        ? randomInt(1, Math.max(1, leftScaled - 1))
        : randomInt(1, config.maxWhole * scale);
    const answerScaled = operator === "-" ? leftScaled - rightScaled : leftScaled + rightScaled;

    if (answerScaled <= 0 || answerScaled > (config.maxWhole + 5) * scale) {
      continue;
    }

    if (leftScaled % scale === 0 && rightScaled % scale === 0) {
      continue;
    }

    return {
      digits: config.digits,
      operator,
      leftText: formatDecimalNumber(leftScaled / scale, config.digits),
      rightText: formatDecimalNumber(rightScaled / scale, config.digits),
      answer: Number((answerScaled / scale).toFixed(config.digits)),
    };
  }
}

function generateComparisonDragProblem(difficulty) {
  const config = {
    1: { min: 10, max: 99, minGap: 4 },
    2: { min: 100, max: 999, minGap: 10 },
  }[Math.min(2, Math.max(1, difficulty))];

  while (true) {
    const left = randomInt(config.min, config.max);
    const right = randomInt(config.min, config.max);
    if (Math.abs(left - right) < config.minGap) {
      continue;
    }

    return {
      left,
      right,
      answer: left < right ? "<" : ">",
    };
  }
}

function generatePlaceValueProblem(difficulty) {
  const digitCount = difficulty <= 2 ? 4 : difficulty === 3 ? 5 : difficulty <= 5 ? 6 : difficulty === 6 ? 7 : 8;
  const digits = buildUniqueDigitSequence(digitCount);
  const validIndexes = digits
    .map((digit, index) => (digit === 0 ? null : index))
    .filter((value) => value !== null);
  const targetIndex = randomChoice(validIndexes);
  const targetDigit = digits[targetIndex];
  const placePower = digitCount - targetIndex - 1;
  const answer = targetDigit * 10 ** placePower;
  const optionPowers = shuffleArray(
    Array.from({ length: digitCount }, (_, power) => power).filter((power) => power !== placePower)
  ).slice(0, 3);

  return {
    numberText: formatGroupedNumber(Number(digits.join(""))),
    digit: targetDigit,
    answer,
    options: shuffleArray([placePower, ...optionPowers]).map((power) => targetDigit * 10 ** power),
  };
}

function generateRoundingProblem(difficulty) {
  const config = {
    1: { placeValues: [10], min: 12, max: 95 },
    2: { placeValues: [10], min: 25, max: 495 },
    3: { placeValues: [10, 100], min: 120, max: 2495 },
    4: { placeValues: [100], min: 250, max: 4995 },
    5: { placeValues: [100, 1000], min: 1500, max: 99995 },
    6: { placeValues: [100, 1000, 10000], min: 15000, max: 999995 },
    7: { placeValues: [1000, 10000, 100000], min: 100000, max: 9999999 },
  }[difficulty];

  while (true) {
    const placeValue = randomChoice(config.placeValues);
    const number = randomInt(config.min, config.max);
    if (number % placeValue === 0) {
      continue;
    }

    return {
      number,
      placeValue,
      answer: roundToNearest(number, placeValue),
    };
  }
}

function generateDecimalComparisonProblem(difficulty) {
  const digits = difficulty <= 2 ? 1 : difficulty >= 7 ? 3 : 2;
  const scale = 10 ** digits;
  const askFor = randomChoice(["greatest", "smallest"]);
  const scaledValues = new Set();
  const baseWhole = difficulty <= 2 ? randomInt(0, 9) : difficulty >= 6 ? randomInt(1, 80) : randomInt(1, 24);

  while (scaledValues.size < 4) {
    let wholePart = baseWhole;
    if (difficulty >= 4 && Math.random() < 0.35) {
      wholePart += randomChoice([-1, 1]);
    }

    const fractionalPart = randomInt(0, scale - 1);
    const scaledValue = wholePart * scale + fractionalPart;
    if (scaledValue >= 0) {
      scaledValues.add(scaledValue);
    }
  }

  const ordered = Array.from(scaledValues);
  const answerScaled = askFor === "greatest" ? Math.max(...ordered) : Math.min(...ordered);

  return {
    askFor,
    options: ordered.map((value) => formatDecimalNumber(value / scale, digits)),
    answer: formatDecimalNumber(answerScaled / scale, digits),
  };
}

function generateRectangleMeasureProblem(difficulty) {
  const config = {
    1: { min: 2, max: 6, measures: ["area"] },
    2: { min: 2, max: 8, measures: ["area", "perimeter"] },
    3: { min: 3, max: 10, measures: ["area", "perimeter"] },
    4: { min: 4, max: 14, measures: ["area", "perimeter"] },
    5: { min: 5, max: 20, measures: ["area", "perimeter"] },
    6: { min: 8, max: 32, measures: ["area", "perimeter"] },
    7: { min: 12, max: 50, measures: ["area", "perimeter"] },
  }[difficulty];
  const length = randomInt(config.min, config.max);
  let width = randomInt(config.min, config.max);
  while (width === length) {
    width = randomInt(config.min, config.max);
  }
  const measure = randomChoice(config.measures);

  return {
    questionText: `A rectangle is ${length} units long and ${width} units wide. What is the ${measure}?`,
    length,
    width,
    measure,
    answer: measure === "area" ? length * width : 2 * (length + width),
  };
}

function generatePrimeCompositeProblem(difficulty) {
  const maxValue = difficulty <= 2 ? 25 : difficulty === 3 ? 40 : difficulty === 4 ? 60 : difficulty === 5 ? 90 : difficulty === 6 ? 150 : 250;
  const values = Array.from({ length: maxValue - 1 }, (_, index) => index + 2);
  const primes = values.filter(isPrime);
  const composites = values.filter((value) => !isPrime(value));
  const askFor = randomChoice(["prime", "composite"]);
  const answerPool = askFor === "prime" ? primes : composites;
  const distractorPool = askFor === "prime" ? composites : primes;
  const answer = randomChoice(answerPool);

  return {
    askFor,
    answer,
    options: shuffleArray([answer, ...shuffleArray(distractorPool.filter((value) => value !== answer)).slice(0, 3)]),
  };
}

function generateNumberPattern(difficulty) {
  const constantSteps = {
    1: [1, 2, 5],
    2: [2, 3, 4, 5, 10, -1],
    3: [3, 4, 5, 6, 8, -2, -3],
    4: [4, 6, 8, 10, -3, -4],
    5: [5, 6, 8, 10, 12, -4, -5],
    6: [6, 8, 10, 12, 15, -6, -8],
    7: [7, 9, 11, 13, 15, 20, -9, -12],
  }[difficulty];

  const multiplicativeSteps = {
    1: [],
    2: [],
    3: [2],
    4: [2, 3],
    5: [2, 3],
    6: [2, 3, 4],
    7: [2, 3, 4, 5],
  }[difficulty];

  const advancedFactories = {
    1: [],
    2: [],
    3: [],
    4: [generateGrowingStepPattern, generateShrinkingStepPattern],
    5: [generateGrowingStepPattern, generateShrinkingStepPattern, generateGrowingStepPattern],
    6: [generateGrowingStepPattern, generateShrinkingStepPattern, generateGrowingStepPattern],
    7: [generateGrowingStepPattern, generateShrinkingStepPattern, generateShrinkingStepPattern],
  }[difficulty];

  if (advancedFactories.length && Math.random() < 0.45) {
    return randomChoice(advancedFactories)(difficulty);
  }

  if (multiplicativeSteps.length && Math.random() < (difficulty >= 4 ? 0.25 : 0.35)) {
    const factor = randomChoice(multiplicativeSteps);
    const start = randomInt(1, factor === 2 ? 12 : 3);
    const sequence = [
      start,
      start * factor,
      start * factor * factor,
      start * factor * factor * factor,
    ];
    return {
      sequence,
      answer: start * factor * factor * factor * factor,
    };
  }

  const step = randomChoice(constantSteps);
  const start = randomInt(
    step > 0 ? 1 : Math.abs(step) * 4 + 5,
    difficulty <= 2 ? 20 : difficulty === 3 ? 45 : difficulty === 4 ? 70 : difficulty === 5 ? 100 : difficulty === 6 ? 180 : 280
  );
  const sequence = [start, start + step, start + step * 2, start + step * 3];
  return {
    sequence,
    answer: start + step * 4,
  };
}

function generateGrowingStepPattern(difficulty) {
  const stepGrowth = difficulty >= 5 ? randomChoice([2, 3]) : randomChoice([1, 2]);
  const firstStep = difficulty >= 5 ? randomInt(3, 8) : randomInt(2, 6);
  const direction = Math.random() < 0.7 ? 1 : -1;
  const start = direction > 0 ? randomInt(1, difficulty >= 5 ? 35 : 25) : randomInt(35, 90);
  const steps = [
    direction * firstStep,
    direction * (firstStep + stepGrowth),
    direction * (firstStep + stepGrowth * 2),
    direction * (firstStep + stepGrowth * 3),
  ];
  const sequence = [start];

  for (let index = 0; index < 3; index += 1) {
    sequence.push(sequence[sequence.length - 1] + steps[index]);
  }

  return {
    sequence,
    answer: sequence[sequence.length - 1] + steps[3],
  };
}

function generateShrinkingStepPattern(difficulty) {
  const stepChange = difficulty >= 5 ? randomChoice([2, 3]) : 1;
  const baseStep = difficulty >= 5 ? randomInt(8, 14) : randomInt(5, 9);
  const direction = Math.random() < 0.65 ? 1 : -1;
  const steps = [
    direction * baseStep,
    direction * (baseStep - stepChange),
    direction * (baseStep - stepChange * 2),
    direction * (baseStep - stepChange * 3),
  ];
  const smallestMagnitude = Math.min(...steps.map((step) => Math.abs(step)));
  const start =
    direction > 0
      ? randomInt(1, difficulty >= 5 ? 40 : 30)
      : randomInt(20 + smallestMagnitude * 4, difficulty >= 5 ? 110 : 80);
  const sequence = [start];

  for (let index = 0; index < 3; index += 1) {
    sequence.push(sequence[sequence.length - 1] + steps[index]);
  }

  return {
    sequence,
    answer: sequence[sequence.length - 1] + steps[3],
  };
}

function generateMoneyProblem(difficulty) {
  const generatorDifficulty = getCoreNumericGeneratorDifficulty(difficulty);
  const config = {
    1: { amounts: [10, 20, 30, 40, 50], step: 5 },
    2: { amounts: [20, 30, 40, 50, 60, 80, 100], step: 5 },
    3: { amounts: [50, 60, 80, 90, 100, 120, 150], step: 5 },
    4: { amounts: [80, 100, 120, 150, 180, 200], step: 1 },
    5: { amounts: [100, 120, 150, 180, 200, 250, 300], step: 1 },
    6: { amounts: [180, 200, 250, 300, 360, 400, 500], step: 1 },
    7: { amounts: [300, 360, 400, 500, 600, 750, 900], step: 1 },
  }[generatorDifficulty];

  const amount = randomChoice(config.amounts);
  const price = randomChoice(buildMoneyChoicesBelow(amount, config.step));
  return {
    amount,
    price,
    answer: amount - price,
  };
}

function generatePercentageProblem(difficulty) {
  const generatorDifficulty = getCoreNumericGeneratorDifficulty(difficulty);
  const config = {
    1: { percents: [10, 50], maxWhole: 20 },
    2: { percents: [10, 25, 50, 75], maxWhole: 50 },
    3: { percents: [10, 20, 30, 40, 50, 60, 70, 80, 90], maxWhole: 100 },
    4: { percents: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95], maxWhole: 100 },
    5: { percents: buildPercentChoices(1, 99), maxWhole: 250 },
    6: { percents: buildPercentChoices(1, 99), maxWhole: 500 },
    7: { percents: buildPercentChoices(1, 99), maxWhole: 1000 },
  }[generatorDifficulty];

  while (true) {
    const percent = randomChoice(config.percents);
    const divisor = 100 / greatestCommonDivisor(percent, 100);
    const maxMultiplier = Math.floor(config.maxWhole / divisor);
    if (maxMultiplier < 1) {
      continue;
    }

    const whole = divisor * randomInt(1, maxMultiplier);
    const answer = (percent * whole) / 100;
    if (Number.isInteger(answer) && answer > 0) {
      return { percent, whole, answer };
    }
  }
}

function buildPercentChoices(min, max) {
  const values = [];
  for (let value = min; value <= max; value += 1) {
    values.push(value);
  }
  return values;
}

function buildWholeMeanDataset(answer, count, min, max) {
  while (true) {
    const values = [];
    let remaining = answer * count;

    for (let index = 0; index < count - 1; index += 1) {
      const remainingSlots = count - index - 1;
      const minValue = Math.max(min, remaining - max * remainingSlots);
      const maxValue = Math.min(max, remaining - min * remainingSlots);
      if (minValue > maxValue) {
        break;
      }
      const value = randomInt(minValue, maxValue);
      values.push(value);
      remaining -= value;
    }

    if (values.length !== count - 1) {
      continue;
    }

    if (remaining < min || remaining > max) {
      continue;
    }

    values.push(remaining);
    return shuffleArray(values);
  }
}

function buildMoneyChoicesBelow(amount, step) {
  const prices = [];
  for (let value = step; value < amount; value += step) {
    prices.push(value);
  }
  return prices;
}

function buildDistinctNumberList(count, min, max, minGap, disallowed = new Set()) {
  const values = [];
  let attempts = 0;

  while (values.length < count) {
    attempts += 1;
    if (attempts > 4000) {
      break;
    }

    const candidate = randomInt(min, max);
    if (disallowed.has(candidate)) {
      continue;
    }

    if (values.every((value) => Math.abs(value - candidate) >= minGap)) {
      values.push(candidate);
    }
  }

  if (values.length === count) {
    return values;
  }

  const fallback = [];
  for (let candidate = min; candidate <= max && fallback.length < count; candidate += 1) {
    if (disallowed.has(candidate)) {
      continue;
    }
    if (fallback.every((value) => Math.abs(value - candidate) >= Math.max(1, minGap))) {
      fallback.push(candidate);
    }
  }

  if (fallback.length === count) {
    return fallback;
  }

  return values;
}

function buildNumberOptions(answer, min = answer - 12, max = answer + 12) {
  const safeMin = Math.min(min, answer);
  const safeMax = Math.max(max, answer);
  const options = new Set([answer]);

  while (options.size < 4) {
    const candidate = randomInt(safeMin, safeMax);
    if (candidate !== answer) {
      options.add(candidate);
    }
  }

  return shuffleArray(Array.from(options));
}

function buildDecimalStringOptions(answer, digits) {
  const scale = 10 ** digits;
  const answerScaled = Math.round(answer * scale);
  const offsets = digits === 1 ? [1, 2, 4, 6, 10, 15] : [1, 2, 5, 10, 20, 25, 50];
  const options = new Set([answerScaled]);

  while (options.size < 4) {
    const candidate = answerScaled + randomChoice([-1, 1]) * randomChoice(offsets);
    if (candidate >= 0 && candidate !== answerScaled) {
      options.add(candidate);
    }
  }

  return shuffleArray(Array.from(options)).map((value) => formatDecimalNumber(value / scale, digits));
}

function buildRoundingOptions(answer, placeValue) {
  const options = new Set([answer]);
  const multipliers = [-2, -1, 1, 2, 3];

  while (options.size < 4) {
    const candidate = answer + randomChoice(multipliers) * placeValue;
    if (candidate >= 0 && candidate !== answer) {
      options.add(candidate);
    }
  }

  return shuffleArray(Array.from(options));
}

function buildVisualNumberOptions(answer, difficulty, maxOverride = null) {
  const spread = difficulty <= 2 ? 4 : difficulty <= 4 ? 7 : difficulty <= 5 ? 10 : difficulty === 6 ? 18 : 30;
  const min = Math.max(0, answer - spread);
  const max = Math.max(answer + spread, maxOverride ?? answer + spread);
  return buildNumberOptions(answer, min, max).map(String);
}

function buildHebrewOptions(correctAnswer, meaningPool = hebrewMeanings) {
  const distractorPool = shuffleArray(
    Array.from(new Set((meaningPool || hebrewMeanings).filter((meaning) => meaning !== correctAnswer)))
  );
  return shuffleArray([correctAnswer, ...distractorPool.slice(0, 3)]);
}

function getTimeLevelConfig(difficulty) {
  const level = normalizeSessionDifficulty(difficulty);
  if (level <= 1) {
    return {
      forwardDurations: [5, 10, 15, 20, 30],
      untilDurations: [5, 10, 15, 20, 30],
      backwardDurations: [5, 10, 15, 20, 30],
      hours: [7, 18],
    };
  }
  if (level <= 2) {
    return {
      forwardDurations: [5, 10, 15, 20, 30],
      untilDurations: [10, 15, 20, 25, 30],
      backwardDurations: [5, 10, 15, 20, 30],
      hours: [7, 19],
    };
  }
  if (level <= 4) {
    return {
      forwardDurations: [15, 20, 25, 30, 35, 40, 45, 60],
      untilDurations: [20, 25, 30, 35, 40, 45, 50, 60],
      backwardDurations: [20, 25, 30, 35, 40, 45, 60],
      hours: [7, 20],
    };
  }
  if (level <= 6) {
    return {
      forwardDurations: [25, 30, 35, 40, 45, 50, 60, 75, 90, 105, 120],
      untilDurations: [35, 40, 45, 50, 55, 60, 75, 90, 105, 120],
      backwardDurations: [35, 40, 45, 50, 60, 75, 90],
      hours: [6, 21],
    };
  }
  return {
    forwardDurations: [45, 55, 60, 65, 75, 90, 105, 120, 135, 150, 165, 180],
    untilDurations: [45, 50, 55, 65, 75, 85, 95, 110, 125, 140, 155],
    backwardDurations: [45, 55, 65, 75, 90, 105, 120, 135, 155],
    hours: [5, 22],
  };
}

function pickTimeStartMinutes(difficulty, duration, { allowRollover = false } = {}) {
  const config = getTimeLevelConfig(difficulty);
  const minuteChoices = difficulty <= 2 ? [0, 5, 10, 15, 20, 25] : [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  for (let attempt = 0; attempt < 80; attempt += 1) {
    const start = randomInt(config.hours[0], config.hours[1]) * 60 + randomChoice(minuteChoices);
    const answer = start + duration;
    const crossesHour = Math.floor(start / 60) !== Math.floor(answer / 60);
    const crossesDay = Math.floor(start / 1440) !== Math.floor(answer / 1440);
    if (difficulty <= 2 && crossesHour) {
      continue;
    }
    if (!allowRollover && crossesDay) {
      continue;
    }
    return start;
  }

  return 8 * 60;
}

function pickTimeEndMinutes(difficulty, duration) {
  const config = getTimeLevelConfig(difficulty);
  const minuteChoices = difficulty <= 3 ? [30, 35, 40, 45, 50, 55] : [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  for (let attempt = 0; attempt < 80; attempt += 1) {
    const end = randomInt(config.hours[0], config.hours[1]) * 60 + randomChoice(minuteChoices);
    const start = end - duration;
    const crossesDay = Math.floor(end / 1440) !== Math.floor(start / 1440);
    const crossesHour = Math.floor(end / 60) !== Math.floor(start / 60);
    if (difficulty <= 3 && crossesHour) {
      continue;
    }
    if (difficulty < 9 && crossesDay) {
      continue;
    }
    return end;
  }

  return 9 * 60 + duration;
}

function buildTimeOptions(correctMinutes, distractorMinutes = []) {
  const offsets = [-90, -60, -45, -30, -20, -15, -10, -5, 5, 10, 15, 20, 30, 45, 60, 75, 90];
  const optionMap = new Map([[formatClockTime(correctMinutes), correctMinutes]]);

  for (const minutes of distractorMinutes) {
    if (Number.isFinite(minutes)) {
      optionMap.set(formatClockTime(minutes), minutes);
    }
    if (optionMap.size >= 4) {
      break;
    }
  }

  while (optionMap.size < 4) {
    const candidate = correctMinutes + randomChoice(offsets);
    optionMap.set(formatClockTime(candidate), candidate);
  }

  return shuffleArray(Array.from(optionMap.keys()));
}

function buildDurationOptions(correctMinutes, distractorMinutes = []) {
  const offsets = [-60, -45, -30, -20, -15, -10, -5, 5, 10, 15, 20, 30, 45, 60];
  const options = new Map([[formatDuration(correctMinutes), correctMinutes]]);

  for (const minutes of distractorMinutes) {
    if (Number.isFinite(minutes) && minutes > 0 && minutes !== correctMinutes) {
      options.set(formatDuration(minutes), minutes);
    }
    if (options.size >= 4) {
      break;
    }
  }

  while (options.size < 4) {
    const candidate = correctMinutes + randomChoice(offsets);
    if (candidate > 0 && candidate !== correctMinutes) {
      options.set(formatDuration(candidate), candidate);
    }
  }

  return shuffleArray(Array.from(options.keys()));
}

function buildTextOptions(answer, distractors) {
  const options = Array.from(new Set([String(answer), ...distractors.map(String)].filter(Boolean))).slice(0, 4);
  if (options.length !== 4) {
    throw new Error(`Text time question needs 4 options: ${answer}`);
  }
  return shuffleArray(options);
}

function formatClockTime(totalMinutes) {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const hour24 = Math.floor(normalized / 60);
  const minute = normalized % 60;
  const suffix = hour24 >= 12 ? "PM" : "AM";
  let hour12 = hour24 % 12;
  if (hour12 === 0) {
    hour12 = 12;
  }
  return `${hour12}:${String(minute).padStart(2, "0")} ${suffix}`;
}

function formatClockTimeWithoutSuffix(totalMinutes) {
  return formatClockTime(totalMinutes).replace(/ (AM|PM)$/, "");
}

function formatClockRange(startMinutes, endMinutes) {
  return `${formatClockTime(startMinutes)}-${formatClockTime(endMinutes)}`;
}

function formatDuration(totalMinutes) {
  const minutes = Math.max(1, Math.round(totalMinutes));
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  if (hours === 0) {
    return `${minutes} minutes`;
  }
  if (remainder === 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"}`;
  }
  return `${hours} ${hours === 1 ? "hour" : "hours"} ${remainder} minutes`;
}

function formatSignedNumber(value) {
  return value < 0 ? `(${value})` : String(value);
}

function formatDecimalNumber(value, digits) {
  return Number(value).toFixed(digits);
}

function formatGroupedNumber(value) {
  return Number(value).toLocaleString("en-US");
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatUnitCount(value, singular, plural = `${singular}s`) {
  return `${value} ${value === 1 ? singular : plural}`;
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function buildUniqueDigitSequence(count) {
  const digits = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, count);
  if (digits[0] !== 0) {
    return digits;
  }

  const swapIndex = digits.findIndex((digit) => digit !== 0);
  [digits[0], digits[swapIndex]] = [digits[swapIndex], digits[0]];
  return digits;
}

function greatestCommonDivisor(left, right) {
  let a = Math.abs(left);
  let b = Math.abs(right);

  while (b !== 0) {
    [a, b] = [b, a % b];
  }

  return a || 1;
}

function roundToNearest(value, placeValue) {
  return Math.round(value / placeValue) * placeValue;
}

function isPrime(value) {
  if (value < 2) {
    return false;
  }

  for (let factor = 2; factor * factor <= value; factor += 1) {
    if (value % factor === 0) {
      return false;
    }
  }

  return true;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice(values) {
  return values[randomInt(0, values.length - 1)];
}

function shuffleArray(values) {
  const shuffled = [...values];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(0, index);
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

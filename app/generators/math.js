function createMathInputQuestion(difficulty) {
  const question = randomChoice(mathInputGenerators)(getCoreNumericGeneratorDifficulty(difficulty));
  return { ...question, difficulty };
}

function createMathChoiceQuestion(difficulty) {
  if (difficulty <= 2 && Math.random() < 0.28) {
    return createComparisonDragQuestion(difficulty);
  }

  if (getOptionalGlobalFunction("createSupplementalMathGeneratedEntry") && Math.random() < 0.32) {
    return createSupplementalMathChoiceQuestion(difficulty);
  }

  const question = randomChoice(mathChoiceGenerators)(getCoreNumericGeneratorDifficulty(difficulty));
  return { ...question, difficulty };
}

function createSupplementalMathChoiceQuestion(difficulty) {
  const factory = getOptionalGlobalFunction("createSupplementalMathGeneratedEntry");
  const normalizedEntry = factory
    ? normalizeChoiceBankEntry(factory(difficulty), "math-choice")
    : null;

  return normalizedEntry
    ? createBankChoiceQuestion(normalizedEntry, "math-choice")
    : createRoundingChoiceQuestion(getCoreNumericGeneratorDifficulty(difficulty));
}

function buildSpeedRoundQuestions() {
  const hebrewOnly = Boolean(state.hebrewOnly || state.specialtyWordsOnly);
  const difficulty = hebrewOnly
    ? normalizeSessionDifficulty(state.difficulty)
    : getCategoryDifficultyFromMap(state.categoryDifficulties, "math", state.difficulty);
  const questions = [];

  for (let index = 0; index < SPEED_ROUND_QUESTION_COUNT; index += 1) {
    const question = hebrewOnly
      ? createSpeedHebrewQuestion(index)
      : randomChoice(getSpeedMathGenerators(difficulty))(index, difficulty);

    questions.push(question || createSpeedAdditionQuestion(index, difficulty));
  }

  return questions;
}

const SPEED_ROUND_MATH_CONFIGS = {
  1: {
    add: { left: [1, 9], right: [1, 9] },
    subtract: { answer: [1, 9], right: [1, 8] },
    double: [2, 10],
    compare: { values: [1, 20], gap: 1 },
  },
  2: {
    add: { left: [5, 20], right: [2, 12] },
    subtract: { answer: [2, 18], right: [2, 12] },
    double: [4, 20],
    compare: { values: [10, 80], gap: 4 },
  },
  3: {
    add: { left: [12, 45], right: [6, 25] },
    subtract: { answer: [5, 35], right: [5, 30] },
    double: [8, 35],
    compare: { values: [25, 150], gap: 8 },
  },
  4: {
    add: { left: [25, 90], right: [12, 45] },
    subtract: { answer: [10, 80], right: [10, 55] },
    double: [12, 55],
    multiply: { left: [3, 9], right: [3, 9] },
    compare: { values: [75, 350], gap: 15 },
  },
  5: {
    add: { left: [45, 140], right: [20, 85] },
    subtract: { answer: [20, 120], right: [18, 95] },
    double: [25, 80],
    multiply: { left: [4, 11], right: [4, 11] },
    compare: { values: [150, 900], gap: 30 },
  },
  6: {
    add: { left: [90, 240], right: [35, 130] },
    subtract: { answer: [40, 220], right: [25, 160] },
    double: [40, 120],
    multiply: { left: [6, 12], right: [4, 12] },
    compare: { values: [300, 1800], gap: 60 },
  },
  7: {
    add: { left: [140, 420], right: [45, 190] },
    subtract: { answer: [75, 360], right: [50, 240] },
    double: [60, 175],
    multiply: { left: [7, 14], right: [5, 12] },
    compare: { values: [600, 3500], gap: 125 },
  },
  8: {
    add: { left: [240, 700], right: [90, 320] },
    subtract: { answer: [120, 650], right: [80, 360] },
    double: [90, 260],
    multiply: { left: [8, 16], right: [6, 14] },
    compare: { values: [1200, 7500], gap: 250 },
  },
  9: {
    add: { left: [450, 1200], right: [150, 650] },
    subtract: { answer: [250, 1200], right: [130, 750] },
    double: [140, 420],
    multiply: { left: [9, 18], right: [7, 15] },
    compare: { values: [2500, 15000], gap: 500 },
  },
  10: {
    add: { left: [800, 2400], right: [300, 1200] },
    subtract: { answer: [500, 2500], right: [250, 1400] },
    double: [250, 750],
    multiply: { left: [12, 24], right: [8, 16] },
    compare: { values: [5000, 30000], gap: 1000 },
  },
};

function getSpeedMathGenerators(difficulty) {
  const generators = [
    createSpeedAdditionQuestion,
    createSpeedSubtractionQuestion,
    createSpeedComparisonQuestion,
    createSpeedDoublingQuestion,
  ];

  if (difficulty >= 4) {
    generators.push(createSpeedMultiplicationQuestion);
  }

  return generators;
}

function getSpeedMathConfig(difficulty) {
  return SPEED_ROUND_MATH_CONFIGS[normalizeSessionDifficulty(difficulty)] || SPEED_ROUND_MATH_CONFIGS[3];
}

function createSpeedAdditionQuestion(index, difficulty = 1) {
  const config = getSpeedMathConfig(difficulty).add;
  const left = randomInt(...config.left);
  const right = randomInt(...config.right);
  const answer = left + right;
  return createSpeedNumberChoiceQuestion({
    type: "math-choice",
    difficulty,
    questionText: "",
    displayText: `${formatGroupedNumber(left)} + ${formatGroupedNumber(right)} =`,
    answer,
    index,
  });
}

function createSpeedSubtractionQuestion(index, difficulty = 1) {
  const config = getSpeedMathConfig(difficulty).subtract;
  const answer = randomInt(...config.answer);
  const right = randomInt(...config.right);
  const left = answer + right;
  return createSpeedNumberChoiceQuestion({
    type: "math-choice",
    difficulty,
    questionText: "",
    displayText: `${formatGroupedNumber(left)} - ${formatGroupedNumber(right)} =`,
    answer,
    index,
  });
}

function createSpeedDoublingQuestion(index, difficulty = 1) {
  const value = randomInt(...getSpeedMathConfig(difficulty).double);
  const answer = value * 2;
  return createSpeedNumberChoiceQuestion({
    type: "math-choice",
    difficulty,
    questionText: "Double it.",
    displayText: formatGroupedNumber(value),
    answer,
    index,
  });
}

function createSpeedMultiplicationQuestion(index, difficulty = 4) {
  const config = getSpeedMathConfig(difficulty).multiply;
  const left = randomInt(...config.left);
  const right = randomInt(...config.right);
  const answer = left * right;
  return createSpeedNumberChoiceQuestion({
    type: "math-choice",
    difficulty,
    questionText: "",
    displayText: `${left} x ${right} =`,
    answer,
    index,
  });
}

function createSpeedComparisonQuestion(index, difficulty = 1) {
  const config = getSpeedMathConfig(difficulty).compare;
  const left = randomInt(...config.values);
  let right = randomInt(...config.values);
  let attempts = 0;
  while (Math.abs(right - left) < config.gap && attempts < 80) {
    right = randomInt(...config.values);
    attempts += 1;
  }
  if (Math.abs(right - left) < config.gap) {
    right = Math.min(config.values[1], left + config.gap);
    if (right === left) {
      right = Math.max(config.values[0], left - config.gap);
    }
  }
  const answer = left > right ? formatGroupedNumber(left) : formatGroupedNumber(right);
  return {
    type: "math-choice",
    difficulty,
    mode: "choice",
    questionText: "Which is bigger?",
    displayText: `${formatGroupedNumber(left)} or ${formatGroupedNumber(right)}`,
    extraText: "",
    reviewText: "",
    options: shuffleArray([formatGroupedNumber(left), formatGroupedNumber(right)]),
    answerValue: answer,
    answerLabel: answer,
    isHebrew: false,
    speedRoundIndex: index,
  };
}

function createSpeedNumberChoiceQuestion({ type, difficulty = 1, questionText, displayText, answer, index }) {
  const answerText = formatGroupedNumber(answer);
  return {
    type,
    difficulty,
    mode: "choice",
    questionText,
    displayText,
    extraText: "",
    reviewText: "",
    options: buildSpeedNumberOptions(answer).map(formatGroupedNumber),
    answerValue: answerText,
    answerLabel: answerText,
    isHebrew: false,
    speedRoundIndex: index,
  };
}

function buildSpeedNumberOptions(answer) {
  const values = new Set([Number(answer)]);
  const offsets = shuffleArray([-3, -2, -1, 1, 2, 3, 4]);

  offsets.forEach((offset) => {
    const candidate = Number(answer) + offset;
    if (candidate >= 0 && values.size < 4) {
      values.add(candidate);
    }
  });

  while (values.size < 4) {
    values.add(randomInt(0, 20));
  }

  return shuffleArray([...values].map(String));
}

function createSpeedHebrewQuestion(index) {
  const hebrewBanks = getSessionHebrewBanksForUser(state.currentUserId, {
    specialtyWordsOnly: state.specialtyWordsOnly,
    hebrewOnly: true,
  });
  const easyEntries = hebrewBanks.questionBank.filter((entry) => Number(entry.difficulty) <= 2);
  const entry = randomChoice(easyEntries.length ? easyEntries : hebrewBanks.questionBank);
  const question = createHebrewChoiceQuestion(entry, hebrewBanks.meanings);
  return question ? { ...question, difficulty: 1, speedRoundIndex: index } : createSpeedAdditionQuestion(index);
}

function createAdditionInputQuestion(difficulty) {
  const [left, right, answer] = generateAdditionValues(difficulty);
  return createNumericInputQuestion({
    type: "math-input",
    difficulty,
    questionText: "",
    displayText: `${formatSignedNumber(left)} + ${formatSignedNumber(right)} =`,
    answer,
  });
}

function createAdditionChoiceQuestion(difficulty) {
  const [left, right, answer] = generateAdditionValues(difficulty);
  return createNumericChoiceQuestion({
    type: "math-choice",
    difficulty,
    questionText: "",
    displayText: `${formatSignedNumber(left)} + ${formatSignedNumber(right)} =`,
    answer,
  });
}

function createSubtractionInputQuestion(difficulty) {
  const [left, right, answer] = generateSubtractionValues(difficulty);
  return createNumericInputQuestion({
    type: "math-input",
    difficulty,
    questionText: "",
    displayText: `${formatSignedNumber(left)} - ${formatSignedNumber(right)} =`,
    answer,
  });
}

function createSubtractionChoiceQuestion(difficulty) {
  const [left, right, answer] = generateSubtractionValues(difficulty);
  return createNumericChoiceQuestion({
    type: "math-choice",
    difficulty,
    questionText: "",
    displayText: `${formatSignedNumber(left)} - ${formatSignedNumber(right)} =`,
    answer,
  });
}

function createMultiplicationInputQuestion(difficulty) {
  const { left, right } = generateMultiplicationValues(difficulty);
  return createNumericInputQuestion({
    type: "math-input",
    difficulty,
    questionText: "",
    displayText: `${left} × ${right} =`,
    answer: left * right,
  });
}

function createMultiplicationChoiceQuestion(difficulty) {
  const { left, right } = generateMultiplicationValues(difficulty);
  return createNumericChoiceQuestion({
    type: "math-choice",
    difficulty,
    questionText: "",
    displayText: `${left} × ${right} =`,
    answer: left * right,
  });
}

function createDivisionInputQuestion(difficulty) {
  const { dividend, divisor, quotient } = generateDivisionProblem(difficulty);
  return createNumericInputQuestion({
    type: "math-input",
    difficulty,
    questionText: "",
    displayText: `${dividend} ÷ ${divisor} =`,
    answer: quotient,
  });
}

function createDivisionChoiceQuestion(difficulty) {
  const { dividend, divisor, quotient } = generateDivisionProblem(difficulty);
  return createNumericChoiceQuestion({
    type: "math-choice",
    difficulty,
    questionText: "",
    displayText: `${dividend} ÷ ${divisor} =`,
    answer: quotient,
  });
}

function createMissingNumberInputQuestion(difficulty) {
  const problem = generateMissingNumberProblem(difficulty);
  return createNumericInputQuestion({
    type: "math-input",
    difficulty,
    questionText: problem.questionText,
    displayText: problem.displayText,
    answer: problem.answer,
  });
}

function createMissingNumberChoiceQuestion(difficulty) {
  const problem = generateMissingNumberProblem(difficulty);
  return createNumericChoiceQuestion({
    type: "math-choice",
    difficulty,
    questionText: problem.questionText,
    displayText: problem.displayText,
    answer: problem.answer,
  });
}

function createDecimalOperationInputQuestion(difficulty) {
  const problem = generateDecimalOperationProblem(difficulty);
  return createNumericInputQuestion({
    type: "math-input",
    difficulty,
    questionText: "Solve the decimal problem.",
    displayText: `${problem.leftText} ${problem.operator} ${problem.rightText} =`,
    answer: problem.answer,
  });
}

function createDecimalOperationChoiceQuestion(difficulty) {
  const problem = generateDecimalOperationProblem(difficulty);
  return {
    type: "math-choice",
    difficulty,
    mode: "choice",
    questionText: "Solve the decimal problem.",
    displayText: `${problem.leftText} ${problem.operator} ${problem.rightText} =`,
    extraText: "",
    options: buildDecimalStringOptions(problem.answer, problem.digits),
    answerValue: formatDecimalNumber(problem.answer, problem.digits),
    answerLabel: formatDecimalNumber(problem.answer, problem.digits),
    isHebrew: false,
  };
}

function createPlaceValueInputQuestion(difficulty) {
  const problem = generatePlaceValueProblem(difficulty);
  return createNumericInputQuestion({
    type: "math-input",
    difficulty,
    questionText: `In ${problem.numberText}, what is the value of the digit ${problem.digit}?`,
    displayText: "",
    answer: problem.answer,
    answerLabel: formatGroupedNumber(problem.answer),
  });
}

function createPlaceValueChoiceQuestion(difficulty) {
  const problem = generatePlaceValueProblem(difficulty);
  return {
    type: "math-choice",
    difficulty,
    mode: "choice",
    questionText: `In ${problem.numberText}, what is the value of the digit ${problem.digit}?`,
    displayText: "",
    extraText: "",
    options: shuffleArray(problem.options.map(formatGroupedNumber)),
    answerValue: formatGroupedNumber(problem.answer),
    answerLabel: formatGroupedNumber(problem.answer),
    isHebrew: false,
  };
}

function createRoundingChoiceQuestion(difficulty) {
  const problem = generateRoundingProblem(difficulty);
  return {
    type: "math-choice",
    difficulty,
    mode: "choice",
    questionText: `Round ${formatGroupedNumber(problem.number)} to the nearest ${formatGroupedNumber(
      problem.placeValue
    )}.`,
    displayText: "",
    extraText: "",
    options: buildRoundingOptions(problem.answer, problem.placeValue).map(formatGroupedNumber),
    answerValue: formatGroupedNumber(problem.answer),
    answerLabel: formatGroupedNumber(problem.answer),
    isHebrew: false,
  };
}

function createDecimalComparisonChoiceQuestion(difficulty) {
  const problem = generateDecimalComparisonProblem(difficulty);
  return {
    type: "math-choice",
    difficulty,
    mode: "choice",
    questionText: `Which decimal is ${problem.askFor}?`,
    displayText: "",
    extraText: "",
    options: shuffleArray(problem.options),
    answerValue: problem.answer,
    answerLabel: problem.answer,
    isHebrew: false,
  };
}

function createRectangleMeasureInputQuestion(difficulty) {
  const problem = generateRectangleMeasureProblem(difficulty);
  return createNumericInputQuestion({
    type: "math-input",
    difficulty,
    questionText: problem.questionText,
    displayText: "",
    visualHtml: renderRectangleMeasureVisual(problem.length, problem.width, problem.measure),
    visualSummary: `Rectangle: ${problem.length} units by ${problem.width} units.`,
    answer: problem.answer,
    answerLabel:
      problem.measure === "area"
        ? formatUnitCount(problem.answer, "square unit")
        : formatUnitCount(problem.answer, "unit"),
    acceptedAnswerSuffixes:
      problem.measure === "area"
        ? ["square unit", "square units", "unit squared", "units squared", "sq unit", "sq units"]
        : ["unit", "units"],
  });
}

function createRectangleMeasureChoiceQuestion(difficulty) {
  const problem = generateRectangleMeasureProblem(difficulty);
  return {
    type: "math-choice",
    difficulty,
    mode: "choice",
    questionText: problem.questionText,
    displayText: "",
    extraText: "",
    visualHtml: renderRectangleMeasureVisual(problem.length, problem.width, problem.measure),
    visualSummary: `Rectangle: ${problem.length} units by ${problem.width} units.`,
    options: buildNumberOptions(problem.answer).map(String),
    answerValue: String(problem.answer),
    answerLabel: String(problem.answer),
    isHebrew: false,
  };
}

function createPrimeCompositeChoiceQuestion(difficulty) {
  const problem = generatePrimeCompositeProblem(difficulty);
  return {
    type: "math-choice",
    difficulty,
    mode: "choice",
    questionText: `Which number is ${problem.askFor}?`,
    displayText: "",
    extraText: "",
    options: shuffleArray(problem.options.map(String)),
    answerValue: String(problem.answer),
    answerLabel: String(problem.answer),
    isHebrew: false,
  };
}

function createNumberLineChoiceQuestion(difficulty) {
  const config = {
    1: { start: 0, step: 1, count: 10 },
    2: { start: 0, step: 2, count: 10 },
    3: { startMin: -10, startMax: 10, step: 5, count: 8 },
    4: { startMin: -25, startMax: 25, step: 10, count: 8 },
    5: { startMin: -50, startMax: 50, step: 25, count: 8 },
    6: { startMin: -100, startMax: 80, step: 20, count: 9 },
    7: { startMin: -150, startMax: 120, step: 25, count: 9 },
  }[difficulty] || { startMin: -50, startMax: 50, step: 25, count: 8 };
  const start = config.start ?? randomInt(config.startMin, config.startMax);
  const tickIndex = randomInt(1, config.count - 2);
  const answer = start + tickIndex * config.step;
  const end = start + (config.count - 1) * config.step;

  return createVisualChoiceQuestion({
    type: "math-choice",
    difficulty,
    questionText: "What number is marked on the number line?",
    visualHtml: renderNumberLineVisual(start, end, config.step, answer),
    visualSummary: `A number line from ${start} to ${end} with ${answer} marked.`,
    options: buildNumberOptions(answer, start, end).map(String),
    answerValue: String(answer),
    answerLabel: String(answer),
  });
}

function createFractionBarChoiceQuestion(difficulty) {
  const denominators = difficulty >= 6 ? [6, 8, 10, 12] : difficulty >= 4 ? [4, 5, 6, 8] : [2, 3, 4];
  const denominator = randomChoice(denominators);
  const numerator = randomInt(1, denominator - 1);
  const answer = `${numerator}/${denominator}`;
  const options = new Set([
    answer,
    `${Math.max(1, numerator - 1)}/${denominator}`,
    `${Math.min(denominator - 1, numerator + 1)}/${denominator}`,
    `${numerator}/${Math.max(2, denominator - 1)}`,
    `${denominator - numerator}/${denominator}`,
  ]);

  while (options.size < 4) {
    const optionDenominator = randomChoice(denominators);
    options.add(`${randomInt(1, optionDenominator - 1)}/${optionDenominator}`);
  }

  return createVisualChoiceQuestion({
    type: "math-choice",
    difficulty,
    questionText: "Which fraction is shaded?",
    visualHtml: renderFractionBarVisual(numerator, denominator),
    visualSummary: `${numerator} out of ${denominator} equal parts are shaded.`,
    options: shuffleArray([answer, ...shuffleArray(Array.from(options).filter((value) => value !== answer)).slice(0, 3)]),
    answerValue: answer,
    answerLabel: answer,
  });
}

function createSkipCountingChoiceQuestion(difficulty) {
  const config = {
    1: { steps: [2, 5, 10], maxStart: 30 },
    2: { steps: [2, 3, 4, 5, 10], maxStart: 50 },
    3: { steps: [2, 3, 4, 5, 6, 8, 10], maxStart: 80 },
    4: { steps: [3, 4, 5, 6, 7, 8, 9, 10, 12], maxStart: 120 },
    5: { steps: [4, 5, 6, 7, 8, 9, 10, 12, 15, 25], maxStart: 180 },
    6: { steps: [6, 7, 8, 9, 11, 12, 15, 20, 25, 50], maxStart: 300 },
    7: { steps: [7, 8, 9, 11, 12, 13, 15, 25, 50, 75], maxStart: 500 },
  }[difficulty];

  const step = randomChoice(config.steps);
  const start = randomInt(0, config.maxStart);
  const sequence = [start, start + step, start + step * 2, start + step * 3];
  const answer = start + step * 4;

  return createNumericChoiceQuestion({
    type: "math-choice",
    difficulty,
    questionText: `Skip count by ${step}. What comes next?`,
    displayText: `${sequence.join(", ")}, __`,
    answer,
  });
}

function createNumberPatternChoiceQuestion(difficulty) {
  const generatorDifficulty = getCoreNumericGeneratorDifficulty(difficulty);
  const pattern = generateNumberPattern(generatorDifficulty);
  return createNumericChoiceQuestion({
    type: "math-choice",
    difficulty,
    questionText: "What number should come next in this pattern?",
    displayText: `${pattern.sequence.join(", ")}, __`,
    answer: pattern.answer,
  });
}

function createComparisonChoiceQuestion(difficulty) {
  const generatorDifficulty = getCoreNumericGeneratorDifficulty(difficulty);
  const ranges = {
    1: { min: 0, max: 20, minGap: 2 },
    2: { min: 0, max: 100, minGap: 5 },
    3: { min: -20, max: 150, minGap: 8 },
    4: { min: -50, max: 300, minGap: 12 },
    5: { min: -100, max: 1000, minGap: 20 },
    6: { min: -500, max: 2500, minGap: 50 },
    7: { min: -1500, max: 7500, minGap: 125 },
  }[generatorDifficulty];

  const askFor = randomChoice(["bigger", "smaller"]);
  const options = buildDistinctNumberList(4, ranges.min, ranges.max, ranges.minGap).map(String);
  const numbers = options.map(Number);
  const answer = askFor === "bigger" ? String(Math.max(...numbers)) : String(Math.min(...numbers));

  return {
    type: "math-choice",
    difficulty,
    mode: "choice",
    questionText: `Which number is ${askFor}?`,
    displayText: "",
    extraText: "",
    options: shuffleArray(options),
    answerValue: answer,
    answerLabel: answer,
    isHebrew: false,
  };
}

function createComparisonDragQuestion(difficulty) {
  const { left, right, answer } = generateComparisonDragProblem(difficulty);
  const leftText = formatGroupedNumber(left);
  const rightText = formatGroupedNumber(right);

  return {
    type: "math-drag",
    difficulty,
    mode: "drag",
    questionText: "Compare the numbers. Drag < or > into the middle bubble.",
    displayText: "",
    extraText: "",
    dragLayout: "comparison",
    dragPlaceholderText: "?",
    dragComparisonLeftText: leftText,
    dragComparisonRightText: rightText,
    dragTemplateParts: [`${leftText} `, ` ${rightText}`],
    dragChoices: shuffleArray(
      ["<", ">"].map((text, index) => ({
        id: `math-drag-${difficulty}-${index}-${text === "<" ? "lt" : "gt"}`,
        text,
      }))
    ),
    dragAnswerTokens: [answer],
    reviewText: `${leftText} ${answer} ${rightText}`,
    answerValue: answer,
    answerLabel: `${leftText} ${answer} ${rightText}`,
    isHebrew: false,
  };
}

function createMoneyInputQuestion(difficulty) {
  const { amount, price, answer } = generateMoneyProblem(difficulty);
  return createNumericInputQuestion({
    type: "math-input",
    difficulty,
    questionText: `You have ${amount} shekels. You buy something for ${price} shekels. How much change should you get?`,
    displayText: "",
    visualHtml: renderMoneyVisual(amount, price),
    visualSummary: `Money shown: ${amount} shekels with a ${price}-shekel price.`,
    answer,
    answerLabel: `${answer} shekels`,
    acceptedAnswerPrefixes: ["₪"],
    acceptedAnswerSuffixes: ["shekel", "shekels"],
  });
}

function createMoneyChoiceQuestion(difficulty) {
  const { amount, price, answer } = generateMoneyProblem(difficulty);
  const spread = difficulty <= 2 ? 10 : difficulty <= 4 ? 20 : 35;
  const options = buildNumberOptions(answer, Math.max(0, answer - spread), answer + spread).map(
    (value) => `${value} shekels`
  );

  return {
    type: "math-choice",
    difficulty,
    mode: "choice",
    questionText: `You have ${amount} shekels. You buy something for ${price} shekels. How much change should you get?`,
    displayText: "",
    extraText: "",
    visualHtml: renderMoneyVisual(amount, price),
    visualSummary: `Money shown: ${amount} shekels with a ${price}-shekel price.`,
    options,
    answerValue: `${answer} shekels`,
    answerLabel: `${answer} shekels`,
    isHebrew: false,
  };
}

function createPercentageInputQuestion(difficulty) {
  const { percent, whole, answer } = generatePercentageProblem(difficulty);
  return createNumericInputQuestion({
    type: "math-input",
    difficulty,
    questionText: `What is ${percent}% of ${whole}?`,
    displayText: "",
    answer,
  });
}

function createPercentageChoiceQuestion(difficulty) {
  const { percent, whole, answer } = generatePercentageProblem(difficulty);
  return createNumericChoiceQuestion({
    type: "math-choice",
    difficulty,
    questionText: `What is ${percent}% of ${whole}?`,
    displayText: "",
    answer,
  });
}

function createStatisticsChoiceQuestion(difficulty) {
  const generatorDifficulty = getCoreNumericGeneratorDifficulty(difficulty);
  const generators =
    statisticsGeneratorsByDifficulty[generatorDifficulty] || statisticsGeneratorsByDifficulty[3];
  const question = randomChoice(generators)(generatorDifficulty);
  return { ...question, difficulty };
}

function createStatisticsMiddleNumberQuestion(difficulty) {
  const config = {
    1: { count: 3, min: 1, max: 10, minGap: 1 },
    2: { count: 5, min: 1, max: 15, minGap: 1 },
    3: { count: 5, min: 2, max: 20, minGap: 1 },
    4: { count: 7, min: 3, max: 30, minGap: 2 },
    5: { count: 7, min: 5, max: 40, minGap: 3 },
    6: { count: 9, min: 8, max: 80, minGap: 4 },
    7: { count: 9, min: 10, max: 150, minGap: 6 },
  }[difficulty];

  const ordered = buildDistinctNumberList(config.count, config.min, config.max, config.minGap).sort(
    (left, right) => left - right
  );
  const answer = ordered[Math.floor(ordered.length / 2)];
  const shuffled = shuffleArray(ordered);

  return createNumericChoiceQuestion({
    type: "statistics-choice",
    difficulty,
    questionText: `The numbers are ${shuffled.join(", ")}. When you put them in order, what is the middle number?`,
    displayText: "",
    answer,
  });
}

function createStatisticsHighestNumberQuestion(difficulty) {
  return createStatisticsExtremeValueQuestion(difficulty, "highest");
}

function createStatisticsLowestNumberQuestion(difficulty) {
  return createStatisticsExtremeValueQuestion(difficulty, "lowest");
}

function createStatisticsExtremeValueQuestion(difficulty, kind) {
  const config = {
    1: { count: 3, min: 1, max: 10, minGap: 1 },
    2: { count: 4, min: 1, max: 15, minGap: 1 },
    3: { count: 5, min: 2, max: 20, minGap: 1 },
    4: { count: 5, min: 3, max: 30, minGap: 2 },
    5: { count: 6, min: 5, max: 40, minGap: 2 },
    6: { count: 7, min: 5, max: 90, minGap: 4 },
    7: { count: 8, min: 10, max: 180, minGap: 8 },
  }[difficulty];

  const values = buildDistinctNumberList(config.count, config.min, config.max, config.minGap);
  const answer = kind === "highest" ? Math.max(...values) : Math.min(...values);

  return createNumericChoiceQuestion({
    type: "statistics-choice",
    difficulty,
    questionText: `The numbers are ${shuffleArray(values).join(", ")}. What is the ${kind} number?`,
    displayText: "",
    answer,
  });
}

function createStatisticsMeanQuestion(difficulty) {
  const config = {
    1: { count: randomChoice([2, 3]), min: 1, max: 10, answerMin: 2, answerMax: 10 },
    2: { count: randomChoice([3, 4]), min: 1, max: 15, answerMin: 3, answerMax: 12 },
    3: { count: randomChoice([4, 5]), min: 2, max: 20, answerMin: 4, answerMax: 16 },
    4: { count: randomChoice([4, 5, 6]), min: 3, max: 25, answerMin: 5, answerMax: 18 },
    5: { count: randomChoice([5, 6]), min: 4, max: 30, answerMin: 6, answerMax: 22 },
    6: { count: randomChoice([5, 6, 7]), min: 5, max: 60, answerMin: 12, answerMax: 40 },
    7: { count: randomChoice([6, 7, 8]), min: 8, max: 100, answerMin: 20, answerMax: 70 },
  }[difficulty];

  const answer = randomInt(config.answerMin, config.answerMax);
  const values = buildWholeMeanDataset(answer, config.count, config.min, config.max);

  return createNumericChoiceQuestion({
    type: "statistics-choice",
    difficulty,
    questionText: `The numbers are ${values.join(", ")}. What is the mean?`,
    displayText: "",
    answer,
  });
}

function createStatisticsMedianQuestion(difficulty) {
  const config = {
    1: { count: 3, min: 1, max: 10, minGap: 1 },
    2: { count: 5, min: 1, max: 15, minGap: 1 },
    3: { count: 5, min: 2, max: 25, minGap: 2 },
    4: { count: 7, min: 3, max: 30, minGap: 2 },
    5: { count: 7, min: 5, max: 40, minGap: 3 },
    6: { count: 9, min: 8, max: 80, minGap: 4 },
    7: { count: 9, min: 10, max: 150, minGap: 6 },
  }[difficulty];

  const ordered = buildDistinctNumberList(config.count, config.min, config.max, config.minGap).sort(
    (left, right) => left - right
  );
  const answer = ordered[Math.floor(ordered.length / 2)];
  const shuffled = shuffleArray(ordered);

  return createNumericChoiceQuestion({
    type: "statistics-choice",
    difficulty,
    questionText: `The numbers are ${shuffled.join(", ")}. What is the median?`,
    displayText: "",
    answer,
  });
}

function createStatisticsModeQuestion(difficulty) {
  const config = {
    1: { min: 1, max: 10, listLength: 4 },
    2: { min: 1, max: 12, listLength: 5 },
    3: { min: 2, max: 15, listLength: 5 },
    4: { min: 3, max: 20, listLength: 6 },
    5: { min: 4, max: 24, listLength: 6 },
    6: { min: 6, max: 60, listLength: 8 },
    7: { min: 8, max: 100, listLength: 9 },
  }[difficulty];

  const answer = randomInt(config.min, config.max);
  const otherValues = buildDistinctNumberList(
    config.listLength - 2,
    config.min,
    config.max,
    1,
    new Set([answer])
  );
  const values = shuffleArray([answer, answer, ...otherValues]);

  return createNumericChoiceQuestion({
    type: "statistics-choice",
    difficulty,
    questionText: `The numbers are ${values.join(", ")}. What is the mode?`,
    displayText: "",
    answer,
  });
}

function createStatisticsRangeQuestion(difficulty) {
  const config = {
    1: { count: 4, min: 1, max: 12, answerMax: 8 },
    2: { count: 4, min: 1, max: 16, answerMax: 10 },
    3: { count: 5, min: 2, max: 25, answerMax: 14 },
    4: { count: 5, min: 4, max: 35, answerMax: 18 },
    5: { count: 6, min: 5, max: 45, answerMax: 24 },
    6: { count: 7, min: 8, max: 90, answerMax: 45 },
    7: { count: 8, min: 10, max: 160, answerMax: 80 },
  }[difficulty];

  const answer = randomInt(config.count - 1, config.answerMax);
  const low = randomInt(config.min, config.max - answer);
  const high = low + answer;
  const middle = buildDistinctNumberList(
    config.count - 2,
    low + 1,
    high - 1,
    1,
    new Set([low, high])
  );
  const values = shuffleArray([low, high, ...middle]);

  return createNumericChoiceQuestion({
    type: "statistics-choice",
    difficulty,
    questionText: `The numbers are ${values.join(", ")}. What is the range, meaning largest value minus smallest value?`,
    displayText: "",
    answer,
  });
}

function createStatisticsDataQuestion(difficulty) {
  const categories = shuffleArray(["dogs", "cats", "fish", "birds"]).slice(0, 4);
  const maxCount = difficulty <= 2 ? 9 : difficulty <= 4 ? 14 : difficulty === 5 ? 20 : difficulty === 6 ? 35 : 60;
  const countValues = buildDistinctNumberList(4, 1, maxCount, 1);
  const counts = categories.map((category, index) => ({
    category,
    count: countValues[index],
  }));

  const askType = randomChoice(
    difficulty <= 2 ? ["most", "fewest", "total"] : ["most", "fewest", "total", "difference"]
  );

  if (askType === "most" || askType === "fewest") {
    const sorted = [...counts].sort((left, right) => left.count - right.count);
    const answer = askType === "most" ? sorted[sorted.length - 1].category : sorted[0].category;
    return {
      type: "statistics-choice",
      difficulty,
      mode: "choice",
      questionText: `A class counted pets: ${counts
        .map((entry) => `${capitalize(entry.category)} ${entry.count}`)
        .join(", ")}. Which pet was counted ${askType === "most" ? "the most" : "the fewest"}?`,
      displayText: "",
      extraText: "",
      options: shuffleArray(categories.map(capitalize)),
      answerValue: capitalize(answer),
      answerLabel: capitalize(answer),
      isHebrew: false,
    };
  }

  if (askType === "total") {
    const answer = counts.reduce((sum, entry) => sum + entry.count, 0);
    return createNumericChoiceQuestion({
      type: "statistics-choice",
      difficulty,
      questionText: `A class counted pets: ${counts
        .map((entry) => `${capitalize(entry.category)} ${entry.count}`)
        .join(", ")}. How many pets were counted in total?`,
      displayText: "",
      answer,
    });
  }

  const sorted = [...counts].sort((left, right) => right.count - left.count);
  const answer = sorted[0].count - sorted[1].count;
  return createNumericChoiceQuestion({
    type: "statistics-choice",
    difficulty,
    questionText: `A class counted pets: ${counts
      .map((entry) => `${capitalize(entry.category)} ${entry.count}`)
      .join(", ")}. How many more ${sorted[0].category} than ${sorted[1].category} were counted?`,
    displayText: "",
    answer,
  });
}

function createChartsAndGraphsQuestion(difficulty) {
  const generators =
    difficulty === 1
      ? [
          createBarMostQuestion,
          createBarFewestQuestion,
          createBarExactQuestion,
          createTableFewestQuestion,
          createTableMostQuestion,
          createTableExactQuestion,
          createBarTotalQuestion,
          createTableTotalQuestion,
        ]
      : difficulty <= 3
        ? [
            createBarMostQuestion,
            createBarFewestQuestion,
            createBarSecondMostQuestion,
            createBarExactQuestion,
            createBarTotalQuestion,
            createBarDifferenceQuestion,
            createTableFewestQuestion,
            createTableMostQuestion,
            createTableSecondMostQuestion,
            createTableExactQuestion,
            createTableTotalQuestion,
            createTableDifferenceQuestion,
          ]
        : [
            createBarMostQuestion,
            createBarFewestQuestion,
            createBarSecondMostQuestion,
            createBarExactQuestion,
            createBarTotalQuestion,
            createBarDifferenceQuestion,
            createTableFewestQuestion,
            createTableMostQuestion,
            createTableSecondMostQuestion,
            createTableExactQuestion,
            createTableTotalQuestion,
            createTableCombinedQuestion,
            createTableDifferenceQuestion,
          ];

  return randomChoice(generators)(difficulty);
}

function createBarMostQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "bar");
  const answerItem = dataset.sortedByValue[dataset.sortedByValue.length - 1];

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "most"),
    visualHtml: renderBarChartVisual(dataset),
    visualSummary: dataset.summary,
    options: shuffleArray(dataset.items.map((item) => item.label)),
    answerValue: answerItem.label,
    answerLabel: answerItem.label,
  });
}

function createBarSecondMostQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "bar");
  const answerItem = dataset.sortedByValue[dataset.sortedByValue.length - 2];

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "secondMost"),
    visualHtml: renderBarChartVisual(dataset),
    visualSummary: dataset.summary,
    options: shuffleArray(dataset.items.map((item) => item.label)),
    answerValue: answerItem.label,
    answerLabel: answerItem.label,
  });
}

function createBarFewestQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "bar");
  const answerItem = dataset.sortedByValue[0];

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "fewest"),
    visualHtml: renderBarChartVisual(dataset),
    visualSummary: dataset.summary,
    options: shuffleArray(dataset.items.map((item) => item.label)),
    answerValue: answerItem.label,
    answerLabel: answerItem.label,
  });
}

function createBarExactQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "bar");
  const answerItem = randomChoice(dataset.items);

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "exact", answerItem.label),
    visualHtml: renderBarChartVisual(dataset),
    visualSummary: dataset.summary,
    options: buildVisualNumberOptions(answerItem.value, difficulty),
    answerValue: String(answerItem.value),
    answerLabel: String(answerItem.value),
  });
}

function createBarTotalQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "bar");
  const answer = dataset.items.reduce((sum, item) => sum + item.value, 0);

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "total"),
    visualHtml: renderBarChartVisual(dataset),
    visualSummary: dataset.summary,
    options: buildVisualNumberOptions(answer, difficulty, answer + 3),
    answerValue: String(answer),
    answerLabel: String(answer),
  });
}

function createBarDifferenceQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "bar");
  const [smaller, larger] = [dataset.sortedByValue[0], dataset.sortedByValue[dataset.sortedByValue.length - 1]];
  const answer = larger.value - smaller.value;

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "difference", larger.label, smaller.label),
    visualHtml: renderBarChartVisual(dataset),
    visualSummary: dataset.summary,
    options: buildVisualNumberOptions(answer, difficulty),
    answerValue: String(answer),
    answerLabel: String(answer),
  });
}

function createTableMostQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "table");
  const answerItem = dataset.sortedByValue[dataset.sortedByValue.length - 1];

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "most"),
    visualHtml: renderTableVisual(dataset),
    visualSummary: dataset.summary,
    options: shuffleArray(dataset.items.map((item) => item.label)),
    answerValue: answerItem.label,
    answerLabel: answerItem.label,
  });
}

function createTableSecondMostQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "table");
  const answerItem = dataset.sortedByValue[dataset.sortedByValue.length - 2];

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "secondMost"),
    visualHtml: renderTableVisual(dataset),
    visualSummary: dataset.summary,
    options: shuffleArray(dataset.items.map((item) => item.label)),
    answerValue: answerItem.label,
    answerLabel: answerItem.label,
  });
}

function createTableFewestQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "table");
  const answerItem = dataset.sortedByValue[0];

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "fewest"),
    visualHtml: renderTableVisual(dataset),
    visualSummary: dataset.summary,
    options: shuffleArray(dataset.items.map((item) => item.label)),
    answerValue: answerItem.label,
    answerLabel: answerItem.label,
  });
}

function createTableExactQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "table");
  const answerItem = randomChoice(dataset.items);

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "exact", answerItem.label),
    visualHtml: renderTableVisual(dataset),
    visualSummary: dataset.summary,
    options: buildVisualNumberOptions(answerItem.value, difficulty),
    answerValue: String(answerItem.value),
    answerLabel: String(answerItem.value),
  });
}

function createTableTotalQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "table");
  const answer = dataset.items.reduce((sum, item) => sum + item.value, 0);

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "total"),
    visualHtml: renderTableVisual(dataset),
    visualSummary: dataset.summary,
    options: buildVisualNumberOptions(answer, difficulty, answer + 4),
    answerValue: String(answer),
    answerLabel: String(answer),
  });
}

function createTableCombinedQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "table");
  const pair = shuffleArray([...dataset.items]).slice(0, 2);
  const answer = pair[0].value + pair[1].value;

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "combined", pair[0].label, pair[1].label),
    visualHtml: renderTableVisual(dataset),
    visualSummary: dataset.summary,
    options: buildVisualNumberOptions(answer, difficulty, answer + 5),
    answerValue: String(answer),
    answerLabel: String(answer),
  });
}

function createTableDifferenceQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "table");
  const pair = shuffleArray([...dataset.items]).slice(0, 2).sort((left, right) => right.value - left.value);
  const answer = pair[0].value - pair[1].value;

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "difference", pair[0].label, pair[1].label),
    visualHtml: renderTableVisual(dataset),
    visualSummary: dataset.summary,
    options: buildVisualNumberOptions(answer, difficulty),
    answerValue: String(answer),
    answerLabel: String(answer),
  });
}

function buildChartDataset(difficulty, visualType) {
  const template = randomChoice(
    visualType === "bar" ? CHART_BAR_TEMPLATES : CHART_TABLE_TEMPLATES
  );
  const config = {
    1: { min: 1, max: 6 },
    2: { min: 2, max: 8 },
    3: { min: 3, max: 12 },
    4: { min: 4, max: 18 },
    5: { min: 5, max: 24 },
    6: { min: 8, max: 40 },
    7: { min: 12, max: 80 },
    8: { min: 20, max: 120 },
    9: { min: 30, max: 200 },
    10: { min: 40, max: 300 },
  }[difficulty];
  const values = buildDistinctNumberList(template.labels.length, config.min, config.max, 1);
  const items = template.labels.map((label, index) => ({
    label,
    value: values[index],
  }));

  return {
    ...template,
    items,
    visualType,
    sortedByValue: [...items].sort((left, right) => left.value - right.value),
    summary: buildChartSummary(template, items),
  };
}

function buildChartQuestionText(dataset, promptName, ...args) {
  const promptBuilder = dataset.prompts?.[promptName];
  if (typeof promptBuilder !== "function") {
    throw new Error(`Missing chart prompt: ${promptName}`);
  }

  const visualName = dataset.visualType === "bar" ? "graph" : "table";
  return `Look at the ${visualName}. ${promptBuilder(...args)}`;
}

function buildChartSummary(template, items) {
  if (typeof template.summaryItem === "function") {
    return `${template.title}: ${items.map((item) => template.summaryItem(item)).join(", ")}`;
  }

  return `${template.title}: ${items.map((item) => `${item.label} ${item.value}`).join(", ")}`;
}

function renderBarChartVisual(dataset) {
  const xAxisLabel = escapeHtml(dataset.xAxisLabel || "Count");
  const yAxisLabel = escapeHtml(dataset.yAxisLabel || "Category");
  const maxValue = Math.max(...dataset.items.map((item) => item.value));
  const rows = dataset.items
    .map((item, index) => {
      const width = Math.max(18, Math.round((item.value / maxValue) * 100));
      return `
        <div class="visual-bar-row">
          <span class="visual-bar-label">${escapeHtml(item.label)}</span>
          <span class="visual-bar-track">
            <span class="visual-bar-fill visual-bar-fill-${index % 4}" style="width:${width}%"></span>
          </span>
          <span class="visual-bar-value">${item.value}</span>
        </div>
      `;
    })
    .join("");

  return `
    <div class="visual-card">
      <div class="visual-card-title">${escapeHtml(dataset.title)}</div>
      <div class="visual-bar-frame">
        <div class="visual-bar-axis-label visual-bar-axis-label-y">${yAxisLabel}</div>
        <div class="visual-bar-plot">
          <div class="visual-bar-chart">${rows}</div>
          <div class="visual-bar-axis-label visual-bar-axis-label-x">${xAxisLabel}</div>
        </div>
      </div>
    </div>
  `;
}

function renderTableVisual(dataset) {
  const rows = dataset.items
    .map(
      (item) => `
        <tr>
          <th scope="row">${escapeHtml(item.label)}</th>
          <td>${item.value}</td>
        </tr>
      `
    )
    .join("");

  return `
    <div class="visual-card">
      <div class="visual-card-title">${escapeHtml(dataset.title)}</div>
      <table class="visual-table">
        <thead>
          <tr>
            <th>${escapeHtml(dataset.leftLabel)}</th>
            <th>${escapeHtml(dataset.rightLabel)}</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function renderNumberLineVisual(start, end, step, markedValue) {
  const ticks = [];
  const count = Math.floor((end - start) / step) + 1;

  for (let index = 0; index < count; index += 1) {
    const value = start + index * step;
    const x = 24 + (index / Math.max(1, count - 1)) * 552;
    const isMarked = value === markedValue;
    ticks.push(`
      <g class="number-line-tick${isMarked ? " marked" : ""}">
        <line x1="${x}" y1="58" x2="${x}" y2="${isMarked ? 30 : 44}"></line>
        <text x="${x}" y="86">${value}</text>
        ${isMarked ? `<circle cx="${x}" cy="28" r="9"></circle>` : ""}
      </g>
    `);
  }

  return `
    <div class="visual-card math-visual-card">
      <div class="visual-card-title">Number line</div>
      <svg class="number-line-visual" viewBox="0 0 600 104" aria-hidden="true">
        <line class="number-line-axis" x1="24" y1="58" x2="576" y2="58"></line>
        ${ticks.join("")}
      </svg>
    </div>
  `;
}

function renderFractionBarVisual(numerator, denominator) {
  const cells = Array.from({ length: denominator }, (_, index) => `
    <span class="math-fraction-cell${index < numerator ? " filled" : ""}"></span>
  `).join("");

  return `
    <div class="visual-card math-visual-card">
      <div class="visual-card-title">Fraction bar</div>
      <div class="math-fraction-bar" style="grid-template-columns: repeat(${denominator}, minmax(0, 1fr));">
        ${cells}
      </div>
    </div>
  `;
}

function renderClockVisual(totalMinutes, label = "") {
  const normalized = ((totalMinutes % 720) + 720) % 720;
  const minute = normalized % 60;
  const hour = Math.floor(normalized / 60) || 12;
  const minuteAngle = minute * 6;
  const hourAngle = (hour % 12) * 30 + minute * 0.5;
  const labelHtml = label ? `<div class="clock-visual-label">${escapeHtml(label)}</div>` : "";

  return `
    <div class="visual-card math-visual-card clock-visual-card">
      <div class="visual-card-title">Clock</div>
      <svg class="clock-visual" viewBox="0 0 160 160" aria-hidden="true">
        <circle class="clock-face" cx="80" cy="80" r="66"></circle>
        ${Array.from({ length: 12 }, (_, index) => {
          const angle = (index * 30 * Math.PI) / 180;
          const x = 80 + Math.sin(angle) * 54;
          const y = 80 - Math.cos(angle) * 54;
          return `<text x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}">${index === 0 ? 12 : index}</text>`;
        }).join("")}
        <line class="clock-hand hour" x1="80" y1="80" x2="80" y2="42" transform="rotate(${hourAngle} 80 80)"></line>
        <line class="clock-hand minute" x1="80" y1="80" x2="80" y2="26" transform="rotate(${minuteAngle} 80 80)"></line>
        <circle class="clock-pin" cx="80" cy="80" r="5"></circle>
      </svg>
      ${labelHtml}
    </div>
  `;
}

function renderMoneyVisual(amount, price) {
  const notes = [100, 50, 20, 10, 5, 1];
  const amountParts = buildMoneyVisualParts(amount, notes);
  const priceParts = buildMoneyVisualParts(price, notes);

  return `
    <div class="visual-card math-visual-card money-visual-card">
      <div class="visual-card-title">Money</div>
      <div class="money-visual-row">
        <div>
          <span class="money-visual-label">You have</span>
          <div class="money-visual-stack">${renderMoneyVisualParts(amountParts)}</div>
        </div>
        <div>
          <span class="money-visual-label">Price</span>
          <div class="money-visual-stack">${renderMoneyVisualParts(priceParts)}</div>
        </div>
      </div>
    </div>
  `;
}

function buildMoneyVisualParts(amount, notes) {
  let remaining = amount;
  const parts = [];
  notes.forEach((note) => {
    const count = Math.floor(remaining / note);
    remaining %= note;
    for (let index = 0; index < count && parts.length < 9; index += 1) {
      parts.push(note);
    }
  });
  return parts.length ? parts : [amount];
}

function renderMoneyVisualParts(parts) {
  return parts.map((value) => `<span class="money-token">${value}</span>`).join("");
}

function renderRectangleMeasureVisual(length, width, measure) {
  return `
    <div class="visual-card math-visual-card measure-visual-card">
      <div class="visual-card-title">${capitalize(measure)}</div>
      <svg class="measure-rectangle-visual" viewBox="0 0 260 160" aria-hidden="true">
        <rect x="54" y="32" width="152" height="88" rx="6"></rect>
        <line x1="54" y1="134" x2="206" y2="134"></line>
        <line x1="38" y1="32" x2="38" y2="120"></line>
        <text x="130" y="152">${length} units</text>
        <text x="20" y="82" transform="rotate(-90 20 82)">${width} units</text>
      </svg>
    </div>
  `;
}


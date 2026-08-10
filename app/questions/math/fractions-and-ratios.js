function fractionsAndRatiosClampDifficulty(value) {
  const level = Number.parseInt(value, 10);
  if (!Number.isFinite(level)) {
    return 3;
  }

  return Math.max(1, Math.min(10, level));
}

function fractionsAndRatiosShuffle(values) {
  if (typeof shuffleArray === "function") {
    return shuffleArray(values);
  }

  const shuffled = [...values];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

function fractionsAndRatiosRandomChoice(values) {
  if (!Array.isArray(values) || values.length === 0) {
    throw new Error("Fractions and ratios generator needs at least one choice.");
  }

  if (typeof randomChoice === "function") {
    return randomChoice(values);
  }

  return values[Math.floor(Math.random() * values.length)];
}

function fractionsAndRatiosUniqueStrings(values) {
  return Array.from(new Set(values.map((value) => String(value))));
}

function fractionsAndRatiosMakeOptions(answer, distractors) {
  const normalizedAnswer = String(answer);
  const options = fractionsAndRatiosUniqueStrings([normalizedAnswer, ...distractors.map((item) => String(item))]);

  if (options.length !== 4 || !options.includes(normalizedAnswer)) {
    throw new Error(`Fractions and ratios question must have exactly 4 unique options including the answer: ${normalizedAnswer}`);
  }

  return fractionsAndRatiosShuffle(options);
}

function fractionsAndRatiosBuildNumericOptions(answer, distractors = []) {
  const normalizedAnswer = String(answer);
  const candidates = fractionsAndRatiosUniqueStrings([
    normalizedAnswer,
    ...distractors.map((item) => String(item)),
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "8",
    "9",
    "10",
    "12",
    "15",
    "16",
    "18",
    "20",
    "21",
    "24",
    "25",
    "28",
    "30",
    "32",
    "36",
    "40",
    "45",
    "50",
    "60",
    "72",
    "90",
    "100",
  ]).filter((item) => item !== normalizedAnswer);

  return fractionsAndRatiosMakeOptions(normalizedAnswer, candidates.slice(0, 3));
}

function fractionsAndRatiosQuestion(question, options, answer, difficulty, extras = {}) {
  const normalizedQuestion = String(question || "").trim();
  const normalizedAnswer = String(answer);
  const normalizedOptions = fractionsAndRatiosUniqueStrings(options || []);
  const normalizedDifficulty = fractionsAndRatiosClampDifficulty(difficulty);

  if (!normalizedQuestion) {
    throw new Error("Fractions and ratios question is missing question text.");
  }

  if (normalizedOptions.length !== 4 || !normalizedOptions.includes(normalizedAnswer)) {
    throw new Error(`Fractions and ratios question must have exactly 4 unique options including the answer: ${normalizedQuestion}`);
  }

  return {
    question: normalizedQuestion,
    options: normalizedOptions,
    answer: normalizedAnswer,
    difficulty: normalizedDifficulty,
    ...extras,
  };
}

function fractionsAndRatiosBuildPairComparisonQuestion({
  comparisonWord,
  leftFraction,
  rightFraction,
  answer,
  difficulty,
  equalOption = "They are equal",
  fallbackOption = "Not enough information",
}) {
  return fractionsAndRatiosQuestion(
    `Which is ${comparisonWord}: ${leftFraction} or ${rightFraction}?`,
    [leftFraction, rightFraction, equalOption, fallbackOption],
    answer,
    difficulty
  );
}

function fractionsAndRatiosGcd(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const remainder = x % y;
    x = y;
    y = remainder;
  }

  return x || 1;
}

function fractionsAndRatiosFormatFraction(numerator, denominator) {
  if (denominator === 1) {
    return String(numerator);
  }

  return `${numerator}/${denominator}`;
}

function fractionsAndRatiosCompareFractions(leftNumerator, leftDenominator, rightNumerator, rightDenominator) {
  return leftNumerator * rightDenominator - rightNumerator * leftDenominator;
}

const FRACTIONS_AND_RATIOS_QUESTIONS = [
  // Level 1: equal parts, halves, thirds, fourths, and simple ratio language.
  fractionsAndRatiosQuestion("What is 1/2 of 8?", ["2", "3", "4", "6"], "4", 1),
  fractionsAndRatiosQuestion("What is 1/2 of 18?", ["8", "9", "10", "12"], "9", 1),
  fractionsAndRatiosQuestion("What is 1/3 of 9?", ["2", "3", "4", "6"], "3", 1),
  fractionsAndRatiosQuestion("What is 1/4 of 12?", ["2", "3", "4", "6"], "3", 1),
  fractionsAndRatiosQuestion("If 1 of 4 equal parts is shaded, what fraction is shaded?", ["1/2", "1/3", "1/4", "3/4"], "1/4", 1),
  fractionsAndRatiosQuestion("Which fraction means one out of three equal parts?", ["1/2", "1/3", "2/3", "3/1"], "1/3", 1),
  fractionsAndRatiosQuestion("A sandwich is cut into 2 equal pieces. One piece is what fraction of the sandwich?", ["1/2", "1/3", "2/3", "2/1"], "1/2", 1),
  fractionsAndRatiosQuestion("Which ratio means 1 red bead for every 2 blue beads?", ["1:2", "2:1", "1:1", "2:3"], "1:2", 1),
  fractionsAndRatiosBuildPairComparisonQuestion({
    comparisonWord: "bigger",
    leftFraction: "1/2",
    rightFraction: "1/4",
    answer: "1/2",
    difficulty: 1,
    fallbackOption: "Neither is a fraction",
  }),
  fractionsAndRatiosQuestion("If a whole is split into 4 equal parts, what is one part called?", ["one half", "one third", "one fourth", "one whole"], "one fourth", 1),

  fractionsAndRatiosQuestion("What is 1/2 of 6?", ["2", "3", "4", "6"], "3", 1),
  fractionsAndRatiosQuestion("What is 1/3 of 6?", ["1", "2", "3", "4"], "2", 1),
  fractionsAndRatiosQuestion("What is 1/4 of 8?", ["1", "2", "3", "4"], "2", 1),
  fractionsAndRatiosQuestion("If 1 of 2 equal parts is shaded, what fraction is shaded?", ["1/2", "1/3", "1/4", "2/1"], "1/2", 1),
  fractionsAndRatiosQuestion("Which fraction means one out of four equal parts?", ["1/2", "1/3", "1/4", "4/1"], "1/4", 1),
  fractionsAndRatiosQuestion("A chocolate bar is cut into 3 equal pieces. One piece is what fraction of the bar?", ["1/2", "1/3", "2/3", "3/1"], "1/3", 1),
  fractionsAndRatiosQuestion("Which ratio means 2 apples for every 1 banana?", ["1:2", "2:1", "2:3", "3:2"], "2:1", 1),
  fractionsAndRatiosQuestion("If a whole is split into 3 equal parts, what is one part called?", ["one half", "one third", "one fourth", "one whole"], "one third", 1),
  fractionsAndRatiosBuildPairComparisonQuestion({
    comparisonWord: "bigger",
    leftFraction: "1/3",
    rightFraction: "1/4",
    answer: "1/3",
    difficulty: 1,
    fallbackOption: "Neither is a fraction",
  }),
  fractionsAndRatiosQuestion("If 2 of 4 equal parts are shaded, what fraction is shaded?", ["1/4", "2/4", "3/4", "4/4"], "2/4", 1),
  // Level 2: equivalent fractions, same-denominator comparison, and simple fractions of sets.
  fractionsAndRatiosQuestion("Which fraction is the same as 2 out of 8?", ["1/2", "1/3", "1/4", "3/4"], "1/4", 2),
  fractionsAndRatiosQuestion("Which fraction is the same as 3 out of 6?", ["1/3", "1/2", "2/3", "3/4"], "1/2", 2),
  fractionsAndRatiosQuestion("Which fraction is equal to 2/4?", ["1/2", "1/3", "3/4", "2/3"], "1/2", 2),
  fractionsAndRatiosQuestion("What is 1/3 of 12?", ["3", "4", "6", "9"], "4", 2),
  fractionsAndRatiosQuestion("What is 1/4 of 20?", ["4", "5", "10", "15"], "5", 2),
  fractionsAndRatiosQuestion("What is 2/3 of 12?", ["4", "6", "8", "10"], "8", 2),
  fractionsAndRatiosQuestion("If 2 of 6 slices are eaten, what fraction of the cake was eaten?", ["1/2", "1/3", "2/5", "2/3"], "1/3", 2),
  fractionsAndRatiosQuestion("A recipe uses 1/2 cup of sugar two times. How much sugar is that altogether?", ["1/2 cup", "3/4 cup", "1 cup", "2 cups"], "1 cup", 2),
  fractionsAndRatiosBuildPairComparisonQuestion({
    comparisonWord: "smaller",
    leftFraction: "1/3",
    rightFraction: "1/2",
    answer: "1/3",
    difficulty: 2,
    fallbackOption: "Neither",
  }),
  fractionsAndRatiosBuildPairComparisonQuestion({
    comparisonWord: "larger",
    leftFraction: "3/6",
    rightFraction: "2/6",
    answer: "3/6",
    difficulty: 2,
    fallbackOption: "Neither",
  }),

  fractionsAndRatiosQuestion("Which fraction is the same as 4 out of 8?", ["1/2", "1/3", "1/4", "3/4"], "1/2", 2),
  fractionsAndRatiosQuestion("Which fraction is 3/9 in simplest form?", ["1/2", "1/3", "2/3", "3/4"], "1/3", 2),
  fractionsAndRatiosQuestion("What is 1/5 of 20?", ["2", "4", "5", "10"], "4", 2),
  fractionsAndRatiosQuestion("What is 2/4 of 16?", ["4", "6", "8", "12"], "8", 2),
  fractionsAndRatiosQuestion("If 3 of 9 stars are circled, what fraction is circled in simplest form?", ["1/3", "2/3", "3/4", "3/5"], "1/3", 2),
  fractionsAndRatiosQuestion("A ribbon is cut into 4 equal parts. If 3 parts are used, what fraction is used?", ["1/4", "2/4", "3/4", "4/3"], "3/4", 2),
  fractionsAndRatiosBuildPairComparisonQuestion({
    comparisonWord: "larger",
    leftFraction: "4/5",
    rightFraction: "2/5",
    answer: "4/5",
    difficulty: 2,
    fallbackOption: "Neither",
  }),
  fractionsAndRatiosBuildPairComparisonQuestion({
    comparisonWord: "smaller",
    leftFraction: "1/6",
    rightFraction: "1/3",
    answer: "1/6",
    difficulty: 2,
    fallbackOption: "Neither",
  }),
  fractionsAndRatiosQuestion("Which ratio means 3 pencils for every 4 pens?", ["3:4", "4:3", "3:7", "7:3"], "3:4", 2),
  fractionsAndRatiosQuestion("There are 2 green beads for every 1 yellow bead. If there are 6 green beads, how many yellow beads are there?", ["2", "3", "4", "6"], "3", 2),
  // Level 3: common decimals, percents, simple ratios, and fractions closer to a whole.
  fractionsAndRatiosQuestion("What is 3/4 of 20?", ["5", "10", "15", "18"], "15", 3),
  fractionsAndRatiosQuestion("What is 3/4 of 12?", ["6", "8", "9", "10"], "9", 3),
  fractionsAndRatiosQuestion("Which decimal is equal to 1/2?", ["0.25", "0.5", "0.75", "1.5"], "0.5", 3),
  fractionsAndRatiosQuestion("Which decimal is equal to 1/4?", ["0.1", "0.2", "0.25", "0.5"], "0.25", 3),
  fractionsAndRatiosQuestion("Which fraction is equal to 0.25?", ["1/2", "1/4", "3/4", "2/5"], "1/4", 3),
  fractionsAndRatiosQuestion("Which fraction is closer to 1 whole?", ["2/3", "5/6", "1/3", "1/6"], "5/6", 3),
  fractionsAndRatiosQuestion("A pizza is cut into 8 equal slices. If 6 slices are eaten, what fraction was eaten?", ["3/8", "1/2", "6/8", "7/8"], "6/8", 3),
  fractionsAndRatiosQuestion("The ratio of girls to boys is 1:2. If there are 12 children altogether, how many are girls?", ["3", "4", "6", "8"], "4", 3),
  fractionsAndRatiosQuestion("In a 3:2 boys-to-girls ratio with 15 children, how many are girls?", ["5", "6", "8", "9"], "6", 3),
  fractionsAndRatiosQuestion("Which is the same as 25%?", ["1/2", "1/4", "3/4", "2/5"], "1/4", 3),

  fractionsAndRatiosQuestion("Which decimal is equal to 3/10?", ["0.03", "0.3", "0.5", "3.0"], "0.3", 3),
  fractionsAndRatiosQuestion("Which fraction is equal to 0.75?", ["1/4", "1/2", "3/4", "4/3"], "3/4", 3),
  fractionsAndRatiosQuestion("Which fraction is the same as 50%?", ["1/4", "1/2", "3/4", "5/4"], "1/2", 3),
  fractionsAndRatiosQuestion("Which fraction is the same as 75%?", ["1/4", "1/2", "3/4", "4/5"], "3/4", 3),
  fractionsAndRatiosQuestion("What is 2/5 of 20?", ["4", "8", "10", "12"], "8", 3),
  fractionsAndRatiosQuestion("What is 5/6 of 12?", ["8", "9", "10", "11"], "10", 3),
  fractionsAndRatiosQuestion("A pizza is cut into 8 equal slices. If 3 slices are eaten, what fraction was eaten?", ["3/8", "5/8", "3/5", "8/3"], "3/8", 3),
  fractionsAndRatiosQuestion("The ratio of red to blue beads is 2:1. If there are 12 beads altogether, how many are red?", ["4", "6", "8", "10"], "8", 3),
  fractionsAndRatiosQuestion("The ratio of girls to boys is 2:3. If there are 20 children altogether, how many are girls?", ["6", "8", "10", "12"], "8", 3),
  fractionsAndRatiosQuestion("Which fraction is closest to 1 whole?", ["1/2", "2/3", "3/4", "7/8"], "7/8", 3),
  // Level 4: reducing ratios, fraction-decimal-percent links, and recipe scaling.
  fractionsAndRatiosQuestion("Which decimal is equal to 3/4?", ["0.25", "0.5", "0.75", "1.25"], "0.75", 4),
  fractionsAndRatiosQuestion("What percent is equal to 3/4?", ["25%", "50%", "75%", "125%"], "75%", 4),
  fractionsAndRatiosQuestion("What is the ratio 4:6 in simplest form?", ["1:2", "2:3", "3:2", "4:3"], "2:3", 4),
  fractionsAndRatiosQuestion("What is the ratio 10:15 in simplest form?", ["1:5", "2:3", "3:2", "5:2"], "2:3", 4),
  fractionsAndRatiosQuestion("What is 4/5 of 20?", ["12", "14", "16", "18"], "16", 4),
  fractionsAndRatiosQuestion("What is 7/10 of 30?", ["18", "19", "21", "24"], "21", 4),
  fractionsAndRatiosQuestion("If you triple a recipe that uses 2/3 cup of oats, how much oats are needed?", ["1 cup", "1 1/2 cups", "2 cups", "3 cups"], "2 cups", 4),
  fractionsAndRatiosQuestion("Which fraction is equal to 9/12?", ["1/2", "2/3", "3/4", "4/5"], "3/4", 4),
  fractionsAndRatiosQuestion("Which fraction is greatest?", ["3/5", "5/8", "2/3", "4/7"], "2/3", 4),
  fractionsAndRatiosQuestion("A bag has red and blue marbles in the ratio 2:3. If there are 10 marbles altogether, how many are red and blue?", ["2 red and 8 blue", "3 red and 7 blue", "4 red and 6 blue", "5 red and 5 blue"], "4 red and 6 blue", 4),

  fractionsAndRatiosQuestion("What is the ratio 8:12 in simplest form?", ["1:2", "2:3", "3:2", "4:3"], "2:3", 4),
  fractionsAndRatiosQuestion("What is the ratio 15:20 in simplest form?", ["2:3", "3:4", "4:3", "5:4"], "3:4", 4),
  fractionsAndRatiosQuestion("What is 3/5 of 25?", ["10", "12", "15", "20"], "15", 4),
  fractionsAndRatiosQuestion("What is 2/3 of 21?", ["7", "12", "14", "18"], "14", 4),
  fractionsAndRatiosQuestion("Which decimal is equal to 2/5?", ["0.2", "0.25", "0.4", "0.5"], "0.4", 4),
  fractionsAndRatiosQuestion("What percent is equal to 1/5?", ["10%", "20%", "25%", "50%"], "20%", 4),
  fractionsAndRatiosQuestion("A recipe uses 1/3 cup of milk. If you double the recipe, how much milk do you need?", ["1/3 cup", "2/3 cup", "1 cup", "1 1/3 cups"], "2/3 cup", 4),
  fractionsAndRatiosQuestion("A map scale says 1 cm represents 3 km. How far apart are two towns that are 6 cm apart on the map?", ["9 km", "12 km", "18 km", "24 km"], "18 km", 4),
  fractionsAndRatiosQuestion("Which fraction is equal to 6/8?", ["1/2", "2/3", "3/4", "4/5"], "3/4", 4),
  fractionsAndRatiosQuestion("Which fraction is greatest: 4/9, 1/2, 5/12, or 2/3?", ["4/9", "1/2", "5/12", "2/3"], "2/3", 4),
  // Level 5: mixed numbers, same-denominator operations, and ratio splitting.
  fractionsAndRatiosQuestion("The ratio of girls to boys in a club is 12:8. What is that ratio in simplest form?", ["6:4", "4:3", "3:2", "2:3"], "3:2", 5),
  fractionsAndRatiosQuestion("Orange paint uses red and yellow in a 1:1 ratio. If you use 6 cups of red paint, how many cups of yellow paint do you need?", ["3", "6", "9", "12"], "6", 5),
  fractionsAndRatiosQuestion("The ratio of red to blue is 5:2. If there are 21 dots altogether, how many are red?", ["5", "6", "12", "15"], "15", 5),
  fractionsAndRatiosQuestion("What is 7/8 of 32?", ["24", "26", "28", "30"], "28", 5),
  fractionsAndRatiosQuestion("If 3/4 of a 12-meter rope is used, how many meters are used?", ["6", "8", "9", "10"], "9", 5),
  fractionsAndRatiosQuestion("What is 2/5 + 1/5?", ["1/5", "2/5", "3/5", "3/10"], "3/5", 5),
  fractionsAndRatiosQuestion("What is 5/6 - 1/6?", ["1/6", "1/3", "2/3", "4/5"], "2/3", 5),
  fractionsAndRatiosQuestion("Which mixed number is equal to 9/4?", ["1 1/4", "2 1/4", "2 3/4", "4 1/2"], "2 1/4", 5),
  fractionsAndRatiosQuestion("A map scale says 1 cm represents 4 km. How far apart are two towns that are 7.5 cm apart on the map?", ["18 km", "24 km", "30 km", "36 km"], "30 km", 5),
  fractionsAndRatiosQuestion("Which fraction is largest?", ["5/6", "4/5", "7/10", "3/4"], "5/6", 5),

  fractionsAndRatiosQuestion("What is 4/7 + 2/7?", ["2/7", "4/7", "6/7", "6/14"], "6/7", 5),
  fractionsAndRatiosQuestion("What is 7/9 - 2/9?", ["2/9", "4/9", "5/9", "7/18"], "5/9", 5),
  fractionsAndRatiosQuestion("Which mixed number is equal to 11/3?", ["2 2/3", "3 1/3", "3 2/3", "4 1/3"], "3 2/3", 5),
  fractionsAndRatiosQuestion("Which mixed number is equal to 13/5?", ["2 1/5", "2 3/5", "3 1/5", "3 3/5"], "2 3/5", 5),
  fractionsAndRatiosQuestion("The ratio 18:12 in simplest form is what?", ["2:3", "3:2", "6:4", "9:8"], "3:2", 5),
  fractionsAndRatiosQuestion("The ratio of red to blue dots is 3:4. If there are 28 dots altogether, how many are blue?", ["12", "14", "16", "21"], "16", 5),
  fractionsAndRatiosQuestion("What is 5/6 of 30?", ["20", "24", "25", "26"], "25", 5),
  fractionsAndRatiosQuestion("If 2/3 of an 18-meter rope is used, how many meters are used?", ["9", "10", "12", "15"], "12", 5),
  fractionsAndRatiosQuestion("A map scale says 1 cm represents 5 km. How far apart are two towns that are 6.4 cm apart on the map?", ["24 km", "30 km", "32 km", "36 km"], "32 km", 5),
  fractionsAndRatiosQuestion("Which fraction is largest: 7/8, 5/6, 3/4, or 4/5?", ["7/8", "5/6", "3/4", "4/5"], "7/8", 5),
  // Level 6: unlike denominators, scale drawings, equivalent equations, and percent of a quantity.
  fractionsAndRatiosQuestion("What is 5/6 - 1/4?", ["7/12", "2/3", "3/4", "1/2"], "7/12", 6),
  fractionsAndRatiosQuestion("What is 1/3 + 1/4?", ["1/7", "2/7", "7/12", "2/3"], "7/12", 6),
  fractionsAndRatiosQuestion("What number goes in the blank? 2/3 = __/12", ["6", "8", "9", "10"], "8", 6),
  fractionsAndRatiosQuestion("A drawing uses a scale of 2 cm to 5 m. If a wall is 12 cm on the drawing, how long is the real wall?", ["20 m", "25 m", "30 m", "35 m"], "30 m", 6),
  fractionsAndRatiosQuestion("A fruit mix has apples and pears in a 3:4 ratio. If there are 56 pieces of fruit, how many are apples?", ["21", "24", "28", "32"], "24", 6),
  fractionsAndRatiosQuestion("A pack of 3 notebooks costs 24 shekels. What is the unit price per notebook?", ["6 shekels", "8 shekels", "9 shekels", "12 shekels"], "8 shekels", 6),
  fractionsAndRatiosQuestion("What is 20% of 150?", ["15", "20", "30", "45"], "30", 6),
  fractionsAndRatiosQuestion("What is 1 1/2 + 2/3?", ["1 5/6", "2 1/6", "2 1/3", "3 1/6"], "2 1/6", 6),
  fractionsAndRatiosQuestion("Which ratio is equivalent to 6:15?", ["1:3", "2:5", "3:5", "5:2"], "2:5", 6),
  fractionsAndRatiosQuestion("A recipe needs 2/3 cup of oil for 4 servings. How much oil is needed for 8 servings?", ["2/3 cup", "1 cup", "1 1/3 cups", "2 cups"], "1 1/3 cups", 6),

  fractionsAndRatiosQuestion("What is 1/2 + 1/3?", ["1/5", "2/5", "5/6", "1 1/6"], "5/6", 6),
  fractionsAndRatiosQuestion("What is 3/4 - 1/6?", ["5/12", "7/12", "2/3", "1/2"], "7/12", 6),
  fractionsAndRatiosQuestion("What number goes in the blank? 3/4 = __/20", ["12", "14", "15", "16"], "15", 6),
  fractionsAndRatiosQuestion("Which ratio is equivalent to 9:12?", ["2:3", "3:4", "4:3", "6:9"], "3:4", 6),
  fractionsAndRatiosQuestion("A fruit bowl has apples and pears in a 5:3 ratio. If there are 64 pieces of fruit, how many are apples?", ["24", "32", "40", "48"], "40", 6),
  fractionsAndRatiosQuestion("A pack of 5 pens costs 45 shekels. What is the unit price per pen?", ["5 shekels", "8 shekels", "9 shekels", "10 shekels"], "9 shekels", 6),
  fractionsAndRatiosQuestion("What is 30% of 90?", ["18", "24", "27", "30"], "27", 6),
  fractionsAndRatiosQuestion("What is 2 1/3 + 1/6?", ["2 1/6", "2 1/2", "2 2/3", "3 1/6"], "2 1/2", 6),
  fractionsAndRatiosQuestion("A drawing uses a scale of 3 cm to 6 m. If a wall is 15 cm on the drawing, how long is the real wall?", ["24 m", "30 m", "36 m", "45 m"], "30 m", 6),
  fractionsAndRatiosQuestion("A recipe needs 3/4 cup of oil for 6 servings. How much oil is needed for 12 servings?", ["1 cup", "1 1/4 cups", "1 1/2 cups", "2 cups"], "1 1/2 cups", 6),
  // Level 7: multiplying fractions, reverse fractions, and multi-step ratios.
  fractionsAndRatiosQuestion("What is 3/4 of 2/3?", ["1/2", "5/7", "6/7", "7/12"], "1/2", 7),
  fractionsAndRatiosQuestion("A club has dancers and singers in the ratio 4:5. If there are 27 students altogether, how many are singers?", ["12", "15", "18", "20"], "15", 7),
  fractionsAndRatiosQuestion("Flour and oats are mixed in the ratio 3:2. If there are 35 cups total, how many cups are flour?", ["14", "18", "21", "24"], "21", 7),
  fractionsAndRatiosQuestion("Two-fifths of a number is 18. What is the number?", ["36", "40", "45", "50"], "45", 7),
  fractionsAndRatiosQuestion("The ratio of red to blue beads is 7:5. If there are 42 red beads, how many beads are there altogether?", ["60", "67", "72", "84"], "72", 7),
  fractionsAndRatiosQuestion("Three-fourths of a cup of juice is shared equally by 3 children. How much juice does each child get?", ["1/4 cup", "1/3 cup", "1/2 cup", "2/3 cup"], "1/4 cup", 7),
  fractionsAndRatiosQuestion("A scale model is 1:50. If the model is 6 cm long, how long is the real object?", ["50 cm", "150 cm", "300 cm", "600 cm"], "300 cm", 7),
  fractionsAndRatiosBuildPairComparisonQuestion({
    comparisonWord: "greater",
    leftFraction: "7/12",
    rightFraction: "5/8",
    answer: "5/8",
    difficulty: 7,
    fallbackOption: "Neither",
  }),
  fractionsAndRatiosQuestion("What is 2 1/4 - 5/6?", ["1 1/12", "1 5/12", "1 7/12", "2 1/12"], "1 5/12", 7),
  fractionsAndRatiosQuestion("A 48-shekel toy is on sale for 3/4 of its original price. What is the sale price?", ["24 shekels", "32 shekels", "36 shekels", "42 shekels"], "36 shekels", 7),

  fractionsAndRatiosQuestion("What is 2/3 of 3/5?", ["1/5", "2/5", "5/8", "7/15"], "2/5", 7),
  fractionsAndRatiosQuestion("What is 4/5 of 5/8?", ["1/4", "1/2", "5/12", "9/13"], "1/2", 7),
  fractionsAndRatiosQuestion("Three-fifths of a number is 24. What is the number?", ["36", "40", "45", "48"], "40", 7),
  fractionsAndRatiosQuestion("Five-sixths of a number is 30. What is the number?", ["25", "32", "36", "40"], "36", 7),
  fractionsAndRatiosQuestion("Flowers are red and white in the ratio 2:7. If there are 45 flowers altogether, how many are white?", ["10", "28", "35", "40"], "35", 7),
  fractionsAndRatiosQuestion("The ratio of A to B is 5:3. If A is 35, how many are there altogether?", ["42", "48", "56", "64"], "56", 7),
  fractionsAndRatiosQuestion("A scale model is 1:75. If the model is 4 cm long, how long is the real object?", ["150 cm", "225 cm", "300 cm", "375 cm"], "300 cm", 7),
  fractionsAndRatiosBuildPairComparisonQuestion({
    comparisonWord: "greater",
    leftFraction: "9/14",
    rightFraction: "2/3",
    answer: "2/3",
    difficulty: 7,
    fallbackOption: "Neither",
  }),
  fractionsAndRatiosQuestion("What is 3 1/2 - 1 3/4?", ["1 1/4", "1 1/2", "1 3/4", "2 1/4"], "1 3/4", 7),
  fractionsAndRatiosQuestion("A 60-shekel game is on sale for 2/3 of its original price. What is the sale price?", ["30 shekels", "36 shekels", "40 shekels", "45 shekels"], "40 shekels", 7),
  // Level 8: proportions, unit rates, mixed-number operations, and percent changes.
  fractionsAndRatiosQuestion("Two-thirds of a class is 18 students. How many students are in the class?", ["24", "27", "30", "36"], "27", 8),
  fractionsAndRatiosQuestion("The ratio of cats to dogs is 3:5. If there are 40 dogs, how many animals are there altogether?", ["48", "56", "64", "72"], "64", 8),
  fractionsAndRatiosQuestion("A map scale says 1 cm represents 2.5 km. How far is 8.4 cm on the map?", ["18 km", "20 km", "21 km", "24 km"], "21 km", 8),
  fractionsAndRatiosQuestion("What is 2 1/4 + 1 2/3?", ["3 1/6", "3 5/12", "3 11/12", "4 1/12"], "3 11/12", 8),
  fractionsAndRatiosQuestion("What is 40% of 3/4?", ["3/10", "1/3", "2/5", "3/5"], "3/10", 8),
  fractionsAndRatiosQuestion("The price starts at 80 shekels and increases by 25%. What is the new price?", ["90 shekels", "96 shekels", "100 shekels", "105 shekels"], "100 shekels", 8),
  fractionsAndRatiosQuestion("A runner goes 4.5 km in 0.75 hour. How many kilometers per 1 hour?", ["4 km per hour", "5 km per hour", "6 km per hour", "7.5 km per hour"], "6 km per hour", 8),
  fractionsAndRatiosQuestion("Orange paint uses red and yellow in a 2:5 ratio. If there are 28 cups total, how many cups are yellow?", ["8", "14", "18", "20"], "20", 8),
  fractionsAndRatiosQuestion("What is 5/8 divided by 5?", ["1/8", "1/5", "5/13", "25/8"], "1/8", 8),
  fractionsAndRatiosQuestion("Which fraction is equal to 37.5%?", ["1/4", "3/8", "1/2", "5/8"], "3/8", 8),

  fractionsAndRatiosQuestion("Three-fifths of a class is 21 students. How many students are in the class?", ["30", "35", "42", "45"], "35", 8),
  fractionsAndRatiosQuestion("The ratio of dogs to cats is 4:7. If there are 42 cats, how many animals are there altogether?", ["56", "60", "66", "72"], "66", 8),
  fractionsAndRatiosQuestion("A map scale says 1 cm represents 1.5 km. How far is 12 cm on the map?", ["12 km", "15 km", "18 km", "24 km"], "18 km", 8),
  fractionsAndRatiosQuestion("What is 1 3/4 + 2 5/6?", ["3 7/12", "4 1/12", "4 7/12", "4 11/12"], "4 7/12", 8),
  fractionsAndRatiosQuestion("What is 30% of 5/6?", ["1/4", "1/3", "2/5", "1/2"], "1/4", 8),
  fractionsAndRatiosQuestion("The price starts at 120 shekels and increases by 15%. What is the new price?", ["132 shekels", "135 shekels", "138 shekels", "150 shekels"], "138 shekels", 8),
  fractionsAndRatiosQuestion("A cyclist goes 7.2 km in 0.9 hour. How many kilometers per 1 hour?", ["6 km per hour", "7 km per hour", "8 km per hour", "9 km per hour"], "8 km per hour", 8),
  fractionsAndRatiosQuestion("Paint is mixed with red and yellow in a 3:5 ratio. If there are 40 cups total, how many cups are yellow?", ["15", "20", "24", "25"], "25", 8),
  fractionsAndRatiosQuestion("What is 7/9 divided by 7?", ["1/9", "1/7", "7/16", "49/9"], "1/9", 8),
  fractionsAndRatiosQuestion("Which fraction is equal to 62.5%?", ["3/8", "1/2", "5/8", "3/4"], "5/8", 8),
  // Level 9: reverse percentages, combined ratios, and scale conversions.
  fractionsAndRatiosQuestion("After using 3/8 of a rope, 25 meters are left. How long was the rope at first?", ["30 meters", "35 meters", "40 meters", "45 meters"], "40 meters", 9),
  fractionsAndRatiosQuestion("The ratio of boys to girls is 5:7. There are 8 more girls than boys. How many children are there altogether?", ["36", "42", "48", "56"], "48", 9),
  fractionsAndRatiosQuestion("A 200-shekel item is discounted by 15%. What is the sale price?", ["160 shekels", "170 shekels", "185 shekels", "215 shekels"], "170 shekels", 9),
  fractionsAndRatiosQuestion("What is 3/4 divided by 1/8?", ["3", "4", "6", "8"], "6", 9),
  fractionsAndRatiosQuestion("What number goes in the blank? __/18 = 5/6", ["12", "15", "18", "24"], "15", 9),
  fractionsAndRatiosQuestion("If A:B is 2:3 and B:C is 4:5, what is A:C?", ["2:5", "3:5", "8:15", "10:12"], "8:15", 9),
  fractionsAndRatiosQuestion("A recipe uses 2/3 cup of flour for 4 muffins. How much flour is needed for 30 muffins?", ["3 cups", "4 cups", "5 cups", "6 cups"], "5 cups", 9),
  fractionsAndRatiosQuestion("A map scale is 1:25,000. If two points are 3.2 cm apart on the map, how far apart are they in real life?", ["80 meters", "320 meters", "800 meters", "8,000 meters"], "800 meters", 9),
  fractionsAndRatiosQuestion("What is 12.5% of 96?", ["8", "10", "12", "16"], "12", 9),
  fractionsAndRatiosQuestion("A tank is 2/5 full with 18 liters. How much water does it hold when full?", ["36 liters", "40 liters", "45 liters", "50 liters"], "45 liters", 9),

  fractionsAndRatiosQuestion("After using 2/7 of a rope, 30 meters are left. How long was the rope at first?", ["35 meters", "40 meters", "42 meters", "49 meters"], "42 meters", 9),
  fractionsAndRatiosQuestion("The ratio of boys to girls is 4:9. There are 15 more girls than boys. How many children are there altogether?", ["30", "36", "39", "45"], "39", 9),
  fractionsAndRatiosQuestion("A 250-shekel item is discounted by 12%. What is the sale price?", ["200 shekels", "220 shekels", "230 shekels", "238 shekels"], "220 shekels", 9),
  fractionsAndRatiosQuestion("What is 5/6 divided by 1/3?", ["1 2/3", "2", "2 1/2", "3"], "2 1/2", 9),
  fractionsAndRatiosQuestion("What number goes in the blank? __/24 = 7/8", ["18", "20", "21", "22"], "21", 9),
  fractionsAndRatiosQuestion("If A:B is 3:5 and B:C is 2:7, what is A:C?", ["3:7", "6:35", "10:21", "15:14"], "6:35", 9),
  fractionsAndRatiosQuestion("A recipe uses 3/5 cup of flour for 6 cookies. How much flour is needed for 40 cookies?", ["3 cups", "4 cups", "5 cups", "6 cups"], "4 cups", 9),
  fractionsAndRatiosQuestion("A map scale is 1:50,000. If two points are 4.5 cm apart on the map, how far apart are they in real life?", ["225 meters", "2,250 meters", "22,500 meters", "225,000 meters"], "2,250 meters", 9),
  fractionsAndRatiosQuestion("What is 7.5% of 160?", ["8", "10", "12", "16"], "12", 9),
  fractionsAndRatiosQuestion("A tank is 3/8 full with 24 liters. How much water does it hold when full?", ["54 liters", "60 liters", "64 liters", "72 liters"], "64 liters", 9),
  // Level 10: challenging proportional reasoning and multi-step fraction problems.
  fractionsAndRatiosQuestion("One-half of a tank plus one-third of the tank is 50 liters. How much does the full tank hold?", ["55 liters", "60 liters", "75 liters", "90 liters"], "60 liters", 10),
  fractionsAndRatiosQuestion("A price increases by 20% and then decreases by 20%. What percent of the original price is the final price?", ["80%", "96%", "100%", "104%"], "96%", 10),
  fractionsAndRatiosQuestion("A drink has water and syrup in a 5:2 ratio. It has 30 cups of water. How many cups of syrup must be added to make the ratio 5:3?", ["3", "5", "6", "9"], "6", 10),
  fractionsAndRatiosQuestion("A small drawing and a large drawing have side lengths in the ratio 3:5. If the small drawing has area 45 square cm, what is the large area?", ["75 square cm", "100 square cm", "125 square cm", "150 square cm"], "125 square cm", 10),
  fractionsAndRatiosQuestion("If red:blue is 3:4 and blue:green is 6:5, what is red:green?", ["3:5", "6:5", "9:10", "18:20"], "9:10", 10),
  fractionsAndRatiosQuestion("A class is 60% girls. Then 6 boys leave, and the class is 75% girls. How many students were in the class at first?", ["24", "30", "36", "40"], "30", 10),
  fractionsAndRatiosQuestion("In a recipe, flour:sugar is 7:4. There are 12 more cups of flour than sugar. How many cups are there altogether?", ["33", "36", "44", "55"], "44", 10),
  fractionsAndRatiosQuestion("A runner covers 2/5 of a route, then 1/3 of the route. What fraction of the route is left?", ["1/15", "2/15", "4/15", "11/15"], "4/15", 10),
  fractionsAndRatiosQuestion("What is 0.125 as a fraction in simplest form?", ["1/4", "1/8", "1/16", "2/5"], "1/8", 10),
  fractionsAndRatiosQuestion("A:B:C is 2:3:5. If C is 45, what is A + B?", ["36", "45", "54", "72"], "45", 10),
  fractionsAndRatiosQuestion("Two-thirds of a tank plus one-fourth of the tank is 55 liters. How much does the full tank hold?", ["60 liters", "66 liters", "75 liters", "90 liters"], "60 liters", 10),
  fractionsAndRatiosQuestion("A price decreases by 30% and then increases by 30%. What percent of the original price is the final price?", ["70%", "91%", "100%", "130%"], "91%", 10),
  fractionsAndRatiosQuestion("A drink has water and syrup in a 4:1 ratio. It has 24 cups of water. How many cups of syrup must be added to make the ratio 3:1?", ["1", "2", "4", "6"], "2", 10),
  fractionsAndRatiosQuestion("A small drawing and a large drawing have side lengths in the ratio 2:7. If the small drawing has area 36 square cm, what is the large area?", ["126 square cm", "252 square cm", "441 square cm", "504 square cm"], "441 square cm", 10),
  fractionsAndRatiosQuestion("If red:blue is 5:6 and blue:green is 3:4, what is red:green?", ["5:8", "10:12", "15:18", "18:20"], "5:8", 10),
  fractionsAndRatiosQuestion("A class is 40% boys. Then 6 boys join, and the class becomes 50% boys. How many students were in the class at first?", ["24", "30", "36", "42"], "30", 10),
  fractionsAndRatiosQuestion("In a recipe, flour:sugar is 9:5. There are 20 more cups of flour than sugar. How many cups are there altogether?", ["56", "63", "70", "84"], "70", 10),
  fractionsAndRatiosQuestion("A runner covers 1/4 of a route, then 2/5 of the route. What fraction of the route is left?", ["3/20", "7/20", "9/20", "13/20"], "7/20", 10),
  fractionsAndRatiosQuestion("What is 0.375 as a fraction in simplest form?", ["1/4", "3/8", "5/8", "3/4"], "3/8", 10),
  fractionsAndRatiosQuestion("A:B:C is 4:7:9. If B is 35, what is A + C?", ["45", "55", "65", "80"], "65", 10),
];

function createFractionsAndRatiosGeneratedEntry(difficulty) {
  const level = fractionsAndRatiosClampDifficulty(difficulty);
  const generatorByLevel = {
    1: [
      fractionsAndRatiosCreateFractionOfSetEntry,
    ],
    2: [
      fractionsAndRatiosCreateFractionOfSetEntry,
      fractionsAndRatiosCreateCompareFractionEntry,
    ],
    3: [
      fractionsAndRatiosCreateFractionOfNumberEntry,
      fractionsAndRatiosCreateFractionOfSetEntry,
      fractionsAndRatiosCreateCompareFractionEntry,
    ],
    4: [
      fractionsAndRatiosCreateEquivalentFractionEntry,
      fractionsAndRatiosCreateCompareFractionEntry,
      fractionsAndRatiosCreateSameDenominatorOperationEntry,
    ],
    5: [
      fractionsAndRatiosCreateSameDenominatorOperationEntry,
      fractionsAndRatiosCreateRecipeScalingEntry,
      fractionsAndRatiosCreateFractionOfNumberEntry,
      fractionsAndRatiosCreateEquivalentFractionEntry,
    ],
    6: [
      fractionsAndRatiosCreateUnlikeDenominatorOperationEntry,
      fractionsAndRatiosCreateMissingEquivalentFractionEntry,
      fractionsAndRatiosCreateUnitRateEntry,
      fractionsAndRatiosCreateSimplifyRatioEntry,
      fractionsAndRatiosCreateRatioPartEntry,
    ],
    7: [
      fractionsAndRatiosCreateFractionMultiplicationEntry,
      fractionsAndRatiosCreateReverseFractionEntry,
      fractionsAndRatiosCreateMultiStepRatioEntry,
      fractionsAndRatiosCreateMixedNumberOperationEntry,
    ],
    8: [
      fractionsAndRatiosCreatePercentChangeEntry,
      fractionsAndRatiosCreateUnitRateEntry,
      fractionsAndRatiosCreateKnownPartRatioEntry,
      fractionsAndRatiosCreateMixedNumberOperationEntry,
    ],
    9: [
      fractionsAndRatiosCreateReversePercentEntry,
      fractionsAndRatiosCreateCombinedRatioEntry,
      fractionsAndRatiosCreateScaleRatioEntry,
      fractionsAndRatiosCreateFractionDivisionEntry,
    ],
    10: [
      fractionsAndRatiosCreateChallengeRatioEntry,
      fractionsAndRatiosCreateCompoundPercentEntry,
      fractionsAndRatiosCreateCombinedRatioEntry,
      fractionsAndRatiosCreateAdvancedFractionStoryEntry,
    ],
  };

  const generator = fractionsAndRatiosRandomChoice(generatorByLevel[level]);
  return {
    ...generator(level),
    difficulty: level,
  };
}

function fractionsAndRatiosCreateFractionOfNumberEntry(difficulty) {
  const choicesByLevel = [
    { numerator: 1, denominator: 2, whole: 8 },
    { numerator: 1, denominator: 2, whole: 18 },
    { numerator: 1, denominator: 3, whole: 9 },
    { numerator: 1, denominator: 4, whole: 12 },
    { numerator: 2, denominator: 3, whole: 12 },
    { numerator: 3, denominator: 4, whole: 20 },
    { numerator: 4, denominator: 5, whole: 20 },
    { numerator: 7, denominator: 8, whole: 32 },
  ].filter((item) => {
    if (difficulty <= 1) return item.numerator === 1 && item.denominator <= 4;
    if (difficulty <= 2) return item.denominator <= 4 || item.numerator === 2;
    return true;
  });
  const pick = fractionsAndRatiosRandomChoice(choicesByLevel);
  const answer = (pick.whole / pick.denominator) * pick.numerator;

  return fractionsAndRatiosQuestion(
    `What is ${pick.numerator}/${pick.denominator} of ${pick.whole}?`,
    fractionsAndRatiosBuildNumericOptions(answer, [answer - 1, answer + 1, pick.whole / pick.denominator]),
    answer,
    difficulty
  );
}

function fractionsAndRatiosCreateFractionOfSetEntry(difficulty) {
  const questions = [
    { colored: 1, total: 4, answer: "1/4", options: ["1/4", "2/4", "3/4", "4/4"], maxDifficulty: 1 },
    { colored: 1, total: 3, answer: "1/3", options: ["1/2", "1/3", "1/4", "2/3"], maxDifficulty: 1 },
    { colored: 2, total: 6, answer: "2/6", options: ["1/6", "2/6", "3/6", "4/6"], maxDifficulty: 2 },
    { colored: 5, total: 8, answer: "5/8", options: ["3/8", "4/8", "5/8", "6/8"], maxDifficulty: 3 },
    { colored: 9, total: 12, answer: "3/4", options: ["1/2", "2/3", "3/4", "5/6"], maxDifficulty: 4 },
  ];
  const pick = fractionsAndRatiosRandomChoice(
    questions.filter((question) => question.maxDifficulty <= Math.max(1, difficulty))
  );

  return fractionsAndRatiosQuestion(
    `What fraction of the counters are colored? ${pick.colored} of ${pick.total}.`,
    pick.options,
    pick.answer,
    difficulty
  );
}

function fractionsAndRatiosCreateSimpleRatioMeaningEntry(difficulty) {
  const questions = [
    fractionsAndRatiosQuestion("Which ratio means 1 red bead for every 2 blue beads?", ["1:2", "2:1", "1:1", "2:3"], "1:2", difficulty),
    fractionsAndRatiosQuestion("What does the ratio 1:1 mean?", ["Equal amounts", "One is bigger", "Nothing is shared", "It means one dozen"], "Equal amounts", difficulty),
    fractionsAndRatiosQuestion("If there are 2 red beads for every 3 blue beads, what is the red:blue ratio?", ["2:3", "3:2", "2:5", "5:2"], "2:3", difficulty),
  ];
  return fractionsAndRatiosRandomChoice(questions);
}

function fractionsAndRatiosCreateEquivalentFractionEntry(difficulty) {
  const base = fractionsAndRatiosRandomChoice([
    { numerator: 1, denominator: 2, multipliers: [2, 3, 4, 5] },
    { numerator: 1, denominator: 3, multipliers: [2, 3, 4] },
    { numerator: 1, denominator: 4, multipliers: [2, 3] },
    { numerator: 2, denominator: 3, multipliers: [2, 3, 4] },
    { numerator: 3, denominator: 4, multipliers: [2, 3] },
  ]);
  const multiplier = fractionsAndRatiosRandomChoice(base.multipliers);
  const shown = fractionsAndRatiosFormatFraction(base.numerator * multiplier, base.denominator * multiplier);
  const answer = fractionsAndRatiosFormatFraction(base.numerator, base.denominator);
  const distractors = [
    fractionsAndRatiosFormatFraction(base.numerator + 1, base.denominator),
    fractionsAndRatiosFormatFraction(base.numerator, base.denominator + 1),
    fractionsAndRatiosFormatFraction(base.denominator, base.numerator + base.denominator),
  ];

  return fractionsAndRatiosQuestion(
    `Which fraction is equivalent to ${shown}?`,
    fractionsAndRatiosMakeOptions(answer, distractors),
    answer,
    difficulty
  );
}

function fractionsAndRatiosCreateCompareFractionEntry(difficulty) {
  const pairs = difficulty <= 2
    ? [
        { left: [1, 2], right: [1, 4] },
        { left: [3, 6], right: [2, 6] },
        { left: [1, 5], right: [1, 2] },
      ]
    : [
        { left: [2, 3], right: [5, 6] },
        { left: [3, 5], right: [2, 3] },
        { left: [7, 12], right: [5, 8] },
        { left: [4, 7], right: [5, 9] },
      ];
  const pick = fractionsAndRatiosRandomChoice(pairs);
  const [ln, ld] = pick.left;
  const [rn, rd] = pick.right;
  const left = fractionsAndRatiosFormatFraction(ln, ld);
  const right = fractionsAndRatiosFormatFraction(rn, rd);
  const comparison = fractionsAndRatiosCompareFractions(ln, ld, rn, rd);
  const answer = comparison > 0 ? left : comparison < 0 ? right : "They are equal";

  return fractionsAndRatiosBuildPairComparisonQuestion({
    comparisonWord: difficulty >= 3 ? "greater" : "bigger",
    leftFraction: left,
    rightFraction: right,
    answer,
    difficulty,
    fallbackOption: "Neither",
  });
}

function fractionsAndRatiosCreateDecimalPercentEntry(difficulty) {
  const questions = [
    fractionsAndRatiosQuestion("Which decimal is equal to 1/2?", ["0.25", "0.5", "0.75", "1.5"], "0.5", difficulty),
    fractionsAndRatiosQuestion("Which decimal is equal to 1/4?", ["0.1", "0.2", "0.25", "0.5"], "0.25", difficulty),
    fractionsAndRatiosQuestion("Which decimal is equal to 3/4?", ["0.25", "0.5", "0.75", "1.25"], "0.75", difficulty),
    fractionsAndRatiosQuestion("Which fraction is equal to 37.5%?", ["1/4", "3/8", "1/2", "5/8"], "3/8", difficulty),
    fractionsAndRatiosQuestion("What percent is equal to 3/4?", ["25%", "50%", "75%", "125%"], "75%", difficulty),
  ];

  return fractionsAndRatiosRandomChoice(questions.filter((question) => question.difficulty <= Math.max(3, difficulty)));
}

function fractionsAndRatiosCreateSimplifyRatioEntry(difficulty) {
  const base = fractionsAndRatiosRandomChoice([
    { ratio: [4, 6], answer: "2:3" },
    { ratio: [10, 15], answer: "2:3" },
    { ratio: [12, 8], answer: "3:2" },
    { ratio: [6, 15], answer: "2:5" },
    { ratio: [18, 24], answer: "3:4" },
  ]);
  const [left, right] = base.ratio;

  return fractionsAndRatiosQuestion(
    `What is the ratio ${left}:${right} in simplest form?`,
    fractionsAndRatiosMakeOptions(base.answer, [
      `${right}:${left}`,
      `${left / fractionsAndRatiosGcd(left, right)}:${right}`,
      `${left}:${right / fractionsAndRatiosGcd(left, right)}`,
    ]),
    base.answer,
    difficulty
  );
}

function fractionsAndRatiosCreateRatioPartEntry(difficulty) {
  const pick = fractionsAndRatiosRandomChoice([
    { leftName: "red", rightName: "blue", ratio: [2, 3], total: 10 },
    { leftName: "boys", rightName: "girls", ratio: [3, 2], total: 15 },
    { leftName: "apples", rightName: "pears", ratio: [3, 4], total: 56 },
    { leftName: "red", rightName: "blue", ratio: [5, 2], total: 21 },
  ]);
  const [leftRatio, rightRatio] = pick.ratio;
  const unit = pick.total / (leftRatio + rightRatio);
  const leftCount = leftRatio * unit;
  const rightCount = rightRatio * unit;

  if (difficulty <= 4 && pick.total <= 15) {
    return fractionsAndRatiosQuestion(
      `The ratio of ${pick.leftName} to ${pick.rightName} is ${leftRatio}:${rightRatio}. If there are ${pick.total} altogether, how many are ${pick.leftName} and ${pick.rightName}?`,
      fractionsAndRatiosMakeOptions(`${leftCount} ${pick.leftName} and ${rightCount} ${pick.rightName}`, [
        `${leftRatio} ${pick.leftName} and ${pick.total - leftRatio} ${pick.rightName}`,
        `${rightCount} ${pick.leftName} and ${leftCount} ${pick.rightName}`,
        `${pick.total / 2} ${pick.leftName} and ${pick.total / 2} ${pick.rightName}`,
      ]),
      `${leftCount} ${pick.leftName} and ${rightCount} ${pick.rightName}`,
      difficulty
    );
  }

  return fractionsAndRatiosQuestion(
    `The ratio of ${pick.leftName} to ${pick.rightName} is ${leftRatio}:${rightRatio}. If there are ${pick.total} altogether, how many are ${pick.leftName}?`,
    fractionsAndRatiosBuildNumericOptions(leftCount, [rightCount, leftRatio * 2, pick.total - leftRatio]),
    leftCount,
    difficulty
  );
}

function fractionsAndRatiosCreateRecipeScalingEntry(difficulty) {
  const questions = [
    fractionsAndRatiosQuestion("A recipe uses 3/4 cup of milk. If you double the recipe, how much milk do you need?", ["1 cup", "1 1/4 cups", "1 1/2 cups", "2 cups"], "1 1/2 cups", difficulty),
    fractionsAndRatiosQuestion("If you triple a recipe that uses 2/3 cup of oats, how much oats are needed?", ["1 cup", "1 1/2 cups", "2 cups", "3 cups"], "2 cups", difficulty),
    fractionsAndRatiosQuestion("A recipe needs 2/3 cup of oil for 4 servings. How much oil is needed for 8 servings?", ["2/3 cup", "1 cup", "1 1/3 cups", "2 cups"], "1 1/3 cups", difficulty),
  ];
  return fractionsAndRatiosRandomChoice(questions);
}

function fractionsAndRatiosCreateScaleRatioEntry(difficulty) {
  const questions = [
    fractionsAndRatiosQuestion("A map scale says 1 cm represents 4 km. How far apart are two towns that are 7.5 cm apart on the map?", ["18 km", "24 km", "30 km", "36 km"], "30 km", difficulty),
    fractionsAndRatiosQuestion("A drawing uses a scale of 2 cm to 5 m. If a wall is 12 cm on the drawing, how long is the real wall?", ["20 m", "25 m", "30 m", "35 m"], "30 m", difficulty),
    fractionsAndRatiosQuestion("A scale model is 1:50. If the model is 6 cm long, how long is the real object?", ["50 cm", "150 cm", "300 cm", "600 cm"], "300 cm", difficulty),
    fractionsAndRatiosQuestion("A map scale is 1:25,000. If two points are 3.2 cm apart on the map, how far apart are they in real life?", ["80 meters", "320 meters", "800 meters", "8,000 meters"], "800 meters", difficulty),
  ];
  const maxIndex = difficulty >= 9 ? 4 : difficulty >= 7 ? 3 : difficulty >= 6 ? 2 : 1;
  return fractionsAndRatiosRandomChoice(questions.slice(0, maxIndex));
}

function fractionsAndRatiosCreateSameDenominatorOperationEntry(difficulty) {
  const questions = [
    fractionsAndRatiosQuestion("What is 2/5 + 1/5?", ["1/5", "2/5", "3/5", "3/10"], "3/5", difficulty),
    fractionsAndRatiosQuestion("What is 5/6 - 1/6?", ["1/6", "1/3", "2/3", "4/5"], "2/3", difficulty),
    fractionsAndRatiosQuestion("What is 3/8 + 4/8?", ["1/8", "7/8", "3/4", "1 whole"], "7/8", difficulty),
  ];
  return fractionsAndRatiosRandomChoice(questions);
}

function fractionsAndRatiosCreateUnlikeDenominatorOperationEntry(difficulty) {
  const questions = [
    fractionsAndRatiosQuestion("What is 5/6 - 1/4?", ["7/12", "2/3", "3/4", "1/2"], "7/12", difficulty),
    fractionsAndRatiosQuestion("What is 1/3 + 1/4?", ["1/7", "2/7", "7/12", "2/3"], "7/12", difficulty),
    fractionsAndRatiosQuestion("What is 3/5 + 1/2?", ["4/7", "7/10", "1 1/10", "1 3/5"], "1 1/10", difficulty),
  ];
  return fractionsAndRatiosRandomChoice(questions);
}

function fractionsAndRatiosCreateMissingEquivalentFractionEntry(difficulty) {
  const pick = fractionsAndRatiosRandomChoice([
    { left: [2, 3], denominator: 12 },
    { left: [3, 5], denominator: 20 },
    { left: [5, 6], denominator: 18 },
    { left: [4, 7], denominator: 35 },
  ]);
  const [numerator, denominator] = pick.left;
  const answer = (pick.denominator / denominator) * numerator;

  return fractionsAndRatiosQuestion(
    `What number goes in the blank? ${numerator}/${denominator} = __/${pick.denominator}`,
    fractionsAndRatiosBuildNumericOptions(answer, [answer - 1, answer + 1, pick.denominator - answer]),
    answer,
    difficulty
  );
}

function fractionsAndRatiosCreateUnitRateEntry(difficulty) {
  const questions = [
    fractionsAndRatiosQuestion("A pack of 3 notebooks costs 24 shekels. What is the unit price per notebook?", ["6 shekels", "8 shekels", "9 shekels", "12 shekels"], "8 shekels", difficulty),
    fractionsAndRatiosQuestion("A runner goes 4.5 km in 0.75 hour. How many kilometers per 1 hour?", ["4 km per hour", "5 km per hour", "6 km per hour", "7.5 km per hour"], "6 km per hour", difficulty),
    fractionsAndRatiosQuestion("A printer makes 84 pages in 7 minutes. What is the rate per minute?", ["10 pages", "12 pages", "14 pages", "21 pages"], "12 pages", difficulty),
  ];
  return fractionsAndRatiosRandomChoice(questions.slice(0, difficulty >= 8 ? 3 : 1));
}

function fractionsAndRatiosCreateFractionMultiplicationEntry(difficulty) {
  const questions = [
    fractionsAndRatiosQuestion("What is 3/4 of 2/3?", ["1/2", "5/7", "6/7", "7/12"], "1/2", difficulty),
    fractionsAndRatiosQuestion("What is 2/5 of 3/4?", ["3/10", "5/9", "6/9", "7/20"], "3/10", difficulty),
    fractionsAndRatiosQuestion("What is 5/8 of 4/5?", ["1/2", "3/5", "2/3", "9/13"], "1/2", difficulty),
  ];
  return fractionsAndRatiosRandomChoice(questions);
}

function fractionsAndRatiosCreateReverseFractionEntry(difficulty) {
  const questions = [
    fractionsAndRatiosQuestion("Two-fifths of a number is 18. What is the number?", ["36", "40", "45", "50"], "45", difficulty),
    fractionsAndRatiosQuestion("Two-thirds of a class is 18 students. How many students are in the class?", ["24", "27", "30", "36"], "27", difficulty),
    fractionsAndRatiosQuestion("A tank is 2/5 full with 18 liters. How much water does it hold when full?", ["36 liters", "40 liters", "45 liters", "50 liters"], "45 liters", difficulty),
  ];
  return fractionsAndRatiosRandomChoice(questions.slice(0, difficulty >= 9 ? 3 : 2));
}

function fractionsAndRatiosCreateMultiStepRatioEntry(difficulty) {
  const questions = [
    fractionsAndRatiosQuestion("A club has dancers and singers in the ratio 4:5. If there are 27 students altogether, how many are singers?", ["12", "15", "18", "20"], "15", difficulty),
    fractionsAndRatiosQuestion("Flour and oats are mixed in the ratio 3:2. If there are 35 cups total, how many cups are flour?", ["14", "18", "21", "24"], "21", difficulty),
    fractionsAndRatiosQuestion("The ratio of boys to girls is 5:7. There are 8 more girls than boys. How many children are there altogether?", ["36", "42", "48", "56"], "48", difficulty),
  ];
  return fractionsAndRatiosRandomChoice(questions.slice(0, difficulty >= 9 ? 3 : 2));
}

function fractionsAndRatiosCreateMixedNumberOperationEntry(difficulty) {
  const questions = [
    fractionsAndRatiosQuestion("What is 1 1/2 + 2/3?", ["1 5/6", "2 1/6", "2 1/3", "3 1/6"], "2 1/6", difficulty),
    fractionsAndRatiosQuestion("What is 2 1/4 - 5/6?", ["1 1/12", "1 5/12", "1 7/12", "2 1/12"], "1 5/12", difficulty),
    fractionsAndRatiosQuestion("What is 2 1/4 + 1 2/3?", ["3 1/6", "3 5/12", "3 11/12", "4 1/12"], "3 11/12", difficulty),
  ];
  return fractionsAndRatiosRandomChoice(questions.slice(0, difficulty >= 8 ? 3 : 2));
}

function fractionsAndRatiosCreatePercentChangeEntry(difficulty) {
  const questions = [
    fractionsAndRatiosQuestion("A price of 80 shekels increases by 25%. What is the new price?", ["90 shekels", "96 shekels", "100 shekels", "105 shekels"], "100 shekels", difficulty),
    fractionsAndRatiosQuestion("A 48-shekel toy is on sale for 3/4 of its original price. What is the sale price?", ["24 shekels", "32 shekels", "36 shekels", "42 shekels"], "36 shekels", difficulty),
    fractionsAndRatiosQuestion("A 200-shekel item is discounted by 15%. What is the sale price?", ["160 shekels", "170 shekels", "185 shekels", "215 shekels"], "170 shekels", difficulty),
  ];
  return fractionsAndRatiosRandomChoice(questions.slice(0, difficulty >= 9 ? 3 : 2));
}

function fractionsAndRatiosCreateKnownPartRatioEntry(difficulty) {
  const questions = [
    fractionsAndRatiosQuestion("The ratio of cats to dogs is 3:5. If there are 40 dogs, how many animals are there altogether?", ["48", "56", "64", "72"], "64", difficulty),
    fractionsAndRatiosQuestion("Orange paint uses red and yellow in a 2:5 ratio. If there are 28 cups total, how many cups are yellow?", ["8", "14", "18", "20"], "20", difficulty),
    fractionsAndRatiosQuestion("The ratio of red to blue beads is 7:5. If there are 42 red beads, how many beads are there altogether?", ["60", "67", "72", "84"], "72", difficulty),
  ];
  return fractionsAndRatiosRandomChoice(questions);
}

function fractionsAndRatiosCreateReversePercentEntry(difficulty) {
  const questions = [
    fractionsAndRatiosQuestion("After using 3/8 of a rope, 25 meters are left. How long was the rope at first?", ["30 meters", "35 meters", "40 meters", "45 meters"], "40 meters", difficulty),
    fractionsAndRatiosQuestion("What is 12.5% of 96?", ["8", "10", "12", "16"], "12", difficulty),
    fractionsAndRatiosQuestion("A class is 60% girls. Then 6 boys leave, and the class is 75% girls. How many students were in the class at first?", ["24", "30", "36", "40"], "30", difficulty),
  ];
  return fractionsAndRatiosRandomChoice(questions.slice(0, difficulty >= 10 ? 3 : 2));
}

function fractionsAndRatiosCreateFractionDivisionEntry(difficulty) {
  const questions = [
    fractionsAndRatiosQuestion("What is 3/4 divided by 1/8?", ["3", "4", "6", "8"], "6", difficulty),
    fractionsAndRatiosQuestion("What is 5/8 divided by 5?", ["1/8", "1/5", "5/13", "25/8"], "1/8", difficulty),
    fractionsAndRatiosQuestion("Three-fourths of a cup of juice is shared equally by 3 children. How much juice does each child get?", ["1/4 cup", "1/3 cup", "1/2 cup", "2/3 cup"], "1/4 cup", difficulty),
  ];
  return fractionsAndRatiosRandomChoice(questions);
}

function fractionsAndRatiosCreateCombinedRatioEntry(difficulty) {
  const questions = [
    fractionsAndRatiosQuestion("If A:B is 2:3 and B:C is 4:5, what is A:C?", ["2:5", "3:5", "8:15", "10:12"], "8:15", difficulty),
    fractionsAndRatiosQuestion("If red:blue is 3:4 and blue:green is 6:5, what is red:green?", ["3:5", "6:5", "9:10", "18:20"], "9:10", difficulty),
    fractionsAndRatiosQuestion("A:B:C is 2:3:5. If C is 45, what is A + B?", ["36", "45", "54", "72"], "45", difficulty),
  ];
  return fractionsAndRatiosRandomChoice(questions.slice(0, difficulty >= 10 ? 3 : 1));
}

function fractionsAndRatiosCreateChallengeRatioEntry(difficulty) {
  const questions = [
    fractionsAndRatiosQuestion("A drink has water and syrup in a 5:2 ratio. It has 30 cups of water. How many cups of syrup must be added to make the ratio 5:3?", ["3", "5", "6", "9"], "6", difficulty),
    fractionsAndRatiosQuestion("A small drawing and a large drawing have side lengths in the ratio 3:5. If the small drawing has area 45 square cm, what is the large area?", ["75 square cm", "100 square cm", "125 square cm", "150 square cm"], "125 square cm", difficulty),
    fractionsAndRatiosQuestion("In a recipe, flour:sugar is 7:4. There are 12 more cups of flour than sugar. How many cups are there altogether?", ["33", "36", "44", "55"], "44", difficulty),
  ];
  return fractionsAndRatiosRandomChoice(questions);
}

function fractionsAndRatiosCreateCompoundPercentEntry(difficulty) {
  const questions = [
    fractionsAndRatiosQuestion("A price increases by 20% and then decreases by 20%. What percent of the original price is the final price?", ["80%", "96%", "100%", "104%"], "96%", difficulty),
    fractionsAndRatiosQuestion("A price is cut by 10% and then the sale price is cut by another 10%. What percent of the original price remains?", ["80%", "81%", "90%", "99%"], "81%", difficulty),
    fractionsAndRatiosQuestion("A number is multiplied by 1/2 and then by 2/3. What fraction of the original number remains?", ["1/6", "1/3", "2/3", "3/2"], "1/3", difficulty),
  ];
  return fractionsAndRatiosRandomChoice(questions);
}

function fractionsAndRatiosCreateAdvancedFractionStoryEntry(difficulty) {
  const questions = [
    fractionsAndRatiosQuestion("One-half of a tank plus one-third of the tank is 50 liters. How much does the full tank hold?", ["55 liters", "60 liters", "75 liters", "90 liters"], "60 liters", difficulty),
    fractionsAndRatiosQuestion("A runner covers 2/5 of a route, then 1/3 of the route. What fraction of the route is left?", ["1/15", "2/15", "4/15", "11/15"], "4/15", difficulty),
    fractionsAndRatiosQuestion("What is 0.125 as a fraction in simplest form?", ["1/4", "1/8", "1/16", "2/5"], "1/8", difficulty),
  ];
  return fractionsAndRatiosRandomChoice(questions);
}

FRACTIONS_AND_RATIOS_QUESTIONS.forEach((entry) => {
  fractionsAndRatiosQuestion(entry.question, entry.options, entry.answer, entry.difficulty, {
    displayText: entry.displayText,
    visualHtml: entry.visualHtml,
    visualSummary: entry.visualSummary,
    extraText: entry.extraText,
    extraHtml: entry.extraHtml,
    reviewText: entry.reviewText,
  });
});

globalThis.HomeworkQuestions?.register({
  id: "fractions-and-ratios",
  label: "Fractions and Ratios",
  getStaticQuestions: () => FRACTIONS_AND_RATIOS_QUESTIONS,
  generatedEntryFactory: createFractionsAndRatiosGeneratedEntry,
  generatedShare: 1,
  supportsDrag: true,
});

const PROBABILITY_QUESTIONS = [
  {
    question: "A bag has 5 red marbles and 1 blue marble. Which color are you more likely to pick?",
    options: ["Red", "Blue", "Both are equally likely", "Neither color can be picked"],
    answer: "Red",
    difficulty: 1,
  },
  {
    question: "A spinner has 4 equal parts and only 1 part is green. What is the chance of landing on green?",
    options: ["1/2", "1/3", "1/4", "1/5"],
    answer: "1/4",
    difficulty: 1,
  },
  {
    question: "Which result is impossible on a standard 6-sided die?",
    options: ["2", "4", "6", "7"],
    answer: "7",
    difficulty: 2,
  },
  {
    question: "If you flip a fair coin once, what is true?",
    options: [
      "Heads is more likely",
      "Tails is more likely",
      "Heads and tails are equally likely",
      "Neither heads nor tails can happen",
    ],
    answer: "Heads and tails are equally likely",
    difficulty: 2,
  },
  {
    question: "A basket has 3 apples and 3 oranges. Which is true if you pick 1 fruit without looking?",
    options: [
      "Apple is more likely",
      "Orange is more likely",
      "Apple and orange are equally likely",
      "Neither fruit can be picked",
    ],
    answer: "Apple and orange are equally likely",
    difficulty: 3,
  },
  {
    question: "Which is more likely?",
    options: [
      "Picking blue from a bag with 8 blue and 2 red marbles",
      "Picking blue from a bag with 5 blue and 5 red marbles",
      "They are equally likely",
      "Neither can happen",
    ],
    answer: "Picking blue from a bag with 8 blue and 2 red marbles",
    difficulty: 3,
  },
  {
    question: "What is the chance of rolling an even number on a standard 6-sided die?",
    options: ["1/6", "1/3", "1/2", "2/3"],
    answer: "1/2",
    difficulty: 4,
  },
  {
    question: "A bag has only green marbles in it. Picking a green marble is:",
    options: ["Impossible", "Unlikely", "Certain", "Less than half likely"],
    answer: "Certain",
    difficulty: 4,
  },
  {
    question: "If you toss 2 coins, how many possible outcomes are there altogether?",
    options: ["2", "3", "4", "6"],
    answer: "4",
    difficulty: 5,
  },
  {
    question: "A bag has 2 red marbles, 5 blue marbles, and 3 green marbles. Which color is least likely to be picked?",
    options: ["Red", "Blue", "Green", "All are equally likely"],
    answer: "Red",
    difficulty: 5,
  },
  {
    question: "A bag has 4 yellow marbles and 4 green marbles. Which color is more likely to be picked?",
    options: ["Yellow", "Green", "They are equally likely", "Neither can be picked"],
    answer: "They are equally likely",
    difficulty: 1,
  },
  {
    question: "A spinner has 3 red parts and 1 blue part. Which color is more likely?",
    options: ["Red", "Blue", "They are equally likely", "Neither can happen"],
    answer: "Red",
    difficulty: 1,
  },
  {
    question: "What is the chance of rolling a number greater than 4 on a standard 6-sided die?",
    options: ["1/6", "1/3", "1/2", "2/3"],
    answer: "1/3",
    difficulty: 2,
  },
  {
      question: "Which number cannot be rolled on a standard 6-sided die?",
    options: ["1", "5", "6", "9"],
    answer: "9",
    difficulty: 2,
  },
  {
    question: "A bag has 1 red marble and 9 blue marbles. What is the chance of picking red?",
    options: ["1/10", "1/5", "1/2", "9/10"],
    answer: "1/10",
    difficulty: 3,
  },
  {
      question: "Which of these chances is more likely?",
    options: [
      "Picking black from a bag with 7 black and 3 white marbles",
      "Picking black from a bag with 5 black and 5 white marbles",
      "They are equally likely",
      "Neither can happen",
    ],
    answer: "Picking black from a bag with 7 black and 3 white marbles",
    difficulty: 3,
  },
  {
    question: "A bag has only purple marbles. Picking a purple marble is:",
    options: ["Impossible", "Unlikely", "Certain", "Only possible on weekends"],
    answer: "Certain",
    difficulty: 4,
  },
  {
    question: "If you toss 3 coins, how many possible outcomes are there altogether?",
    options: ["4", "6", "8", "12"],
    answer: "8",
    difficulty: 4,
  },
  {
    question: "A bag has 2 red marbles, 2 blue marbles, and 6 green marbles. Which color is most likely to be picked?",
    options: ["Red", "Blue", "Green", "Red and blue together"],
    answer: "Green",
    difficulty: 5,
  },
  {
    question: "What is the chance of rolling a number less than 3 on a standard 6-sided die?",
    options: ["1/6", "1/3", "1/2", "2/3"],
    answer: "1/3",
    difficulty: 5,
  },
  {
    question: "A bag has 4 red marbles and 1 blue marble. Which color is more likely?",
    options: ["Red", "Blue", "They are equally likely", "Neither"],
    answer: "Red",
    difficulty: 1,
  },
  {
    question: "If you flip a fair coin, which result is possible?",
    options: ["Heads", "2", "Blue", "A shoe"],
    answer: "Heads",
    difficulty: 1,
  },
  {
      question: "Which number would never appear on a standard 6-sided die?",
    options: ["1", "3", "6", "8"],
    answer: "8",
    difficulty: 2,
  },
  {
    question: "A spinner has 2 blue sections and 6 red sections. Which color is more likely?",
    options: ["Blue", "Red", "They are equally likely", "Neither"],
    answer: "Red",
    difficulty: 2,
  },
  {
    question: "A bag has 2 yellow marbles and 2 green marbles. What is true?",
    options: [
      "Yellow is more likely",
      "Green is more likely",
      "They are equally likely",
      "Neither can be picked",
    ],
    answer: "They are equally likely",
    difficulty: 3,
  },
  {
      question: "Which option is more likely in this comparison?",
    options: [
      "Picking a red marble from a bag with 9 red and 1 blue marble",
      "Picking a red marble from a bag with 5 red and 5 blue marbles",
      "They are equally likely",
      "Neither can happen",
    ],
    answer: "Picking a red marble from a bag with 9 red and 1 blue marble",
    difficulty: 3,
  },
  {
    question: "What is the chance of rolling a 6 on a standard 6-sided die?",
    options: ["1/6", "1/3", "1/2", "5/6"],
    answer: "1/6",
    difficulty: 4,
  },
  {
    question: "A bag has only orange marbles. Picking an orange marble is:",
    options: ["Impossible", "Unlikely", "Certain", "Half likely"],
    answer: "Certain",
    difficulty: 4,
  },
  {
      question: "How many possible outcomes are there if you flip one coin and roll one die?",
    options: ["6", "8", "10", "12"],
    answer: "12",
    difficulty: 5,
  },
  {
      question: "A bag has 3 red, 4 blue, and 5 green marbles. Which color is least likely to be picked?",
    options: ["Red", "Blue", "Green", "All are equally likely"],
    answer: "Red",
    difficulty: 5,
  },
  {
      question: "A bag has 6 blue marbles and 2 yellow marbles. Which color has the smaller chance?",
    options: ["Blue", "Yellow", "They are equally likely", "Neither"],
    answer: "Yellow",
    difficulty: 1,
  },
  {
      question: "If you spin a fair spinner with 4 equal colors, what is the chance of landing on any one color?",
    options: ["1/2", "1/3", "1/4", "1/5"],
    answer: "1/4",
    difficulty: 1,
  },
  {
      question: "Which number cannot appear on a standard 6-sided die?",
    options: ["0", "2", "4", "5"],
    answer: "0",
    difficulty: 2,
  },
  {
      question: "In a bag with 7 red marbles and 3 green marbles, what is the chance of picking green?",
    options: ["3/10", "7/10", "1/2", "1/10"],
    answer: "3/10",
    difficulty: 2,
  },
  {
      question: "A bag with 5 red, 5 blue, and 10 green marbles: which color is most likely?",
    options: ["Red", "Blue", "Green", "Red and blue together"],
    answer: "Green",
    difficulty: 3,
  },
  {
    question: "Which is less likely?",
    options: [
      "Picking a black marble from a bag with 2 black and 8 white marbles",
      "Picking a black marble from a bag with 5 black and 5 white marbles",
      "They are equally likely",
      "Neither can happen",
    ],
    answer: "Picking a black marble from a bag with 2 black and 8 white marbles",
    difficulty: 3,
  },
  {
      question: "What is the chance of heads on one fair coin flip?",
    options: ["1/4", "1/3", "1/2", "1/1"],
    answer: "1/2",
    difficulty: 4,
  },
  {
      question: "When you flip two coins, which result cannot happen?",
    options: ["Two heads", "Two tails", "One head and one tail", "Three heads"],
    answer: "Three heads",
    difficulty: 4,
  },
  {
      question: "In a bag with 1 red marble, 2 blue marbles, and 7 yellow marbles, what is the chance of picking yellow?",
    options: ["1/10", "2/10", "7/10", "9/10"],
    answer: "7/10",
    difficulty: 5,
  },
  {
      question: "A spinner has 8 equal sections with 3 purple sections. What is the chance of landing on purple?",
    options: ["3/8", "5/8", "1/4", "1/8"],
    answer: "3/8",
    difficulty: 5,
  },
];

PROBABILITY_QUESTIONS.push(
  ...[
    {
      question: "A bag has 6 red marbles and 2 blue marbles. Which color are you more likely to pick?",
      options: ["Red", "Blue", "They are equally likely", "Neither can be picked"],
      answer: "Red",
      difficulty: 1,
    },
    {
      question: "A spinner has 2 equal sections, one yellow and one blue. What is true?",
      options: ["Yellow is more likely", "Blue is more likely", "They are equally likely", "Neither can happen"],
      answer: "They are equally likely",
      difficulty: 1,
    },
    {
      question: "If you flip a fair coin once, what is the chance of getting tails?",
      options: ["1/4", "1/3", "1/2", "1/1"],
      answer: "1/2",
      difficulty: 1,
    },
    {
      question: "Which number would never come up on a standard 6-sided die?",
      options: ["0", "2", "4", "5"],
      answer: "0",
      difficulty: 1,
    },
    {
      question: "A bag has 3 cats, 1 dog, and 1 bird stickers. Which sticker are you most likely to pick?",
      options: ["Cat", "Dog", "Bird", "They are all equally likely"],
      answer: "Cat",
      difficulty: 2,
    },
    {
      question: "A spinner has 1 green part out of 4 equal parts. What is the chance of landing on green?",
      options: ["1/2", "1/3", "1/4", "1/5"],
      answer: "1/4",
      difficulty: 2,
    },
    {
      question: "A bag has 2 yellow marbles and 2 purple marbles. What is true?",
      options: ["Yellow is more likely", "Purple is more likely", "They are equally likely", "Neither can be picked"],
      answer: "They are equally likely",
      difficulty: 2,
    },
    {
      question: "A bag has only silver marbles. Picking a silver marble is:",
      options: ["Impossible", "Unlikely", "Certain", "Less than half likely"],
      answer: "Certain",
      difficulty: 2,
    },
    {
      question: "On a fair 6-sided die, what is the chance of rolling a 5 or 6?",
      options: ["1/6", "1/3", "1/2", "2/3"],
      answer: "1/3",
      difficulty: 3,
    },
    {
      question: "In a bag with 1 red marble and 9 blue marbles, what is the chance of picking red?",
      options: ["1/10", "1/5", "1/2", "9/10"],
      answer: "1/10",
      difficulty: 3,
    },
    {
      question: "If you flip 2 fair coins, how many possible outcomes are there altogether?",
      options: ["2", "3", "4", "6"],
      answer: "4",
      difficulty: 3,
    },
    {
      question: "A bag has 8 green marbles and 2 yellow marbles. Which color is more likely?",
      options: ["Green", "Yellow", "They are equally likely", "Neither can happen"],
      answer: "Green",
      difficulty: 3,
    },
    {
      question: "On a fair 6-sided die, what is the chance of rolling an even number?",
      options: ["1/6", "1/3", "1/2", "2/3"],
      answer: "1/2",
      difficulty: 4,
    },
    {
      question: "How many outcomes are possible when you flip three fair coins?",
      options: ["4", "6", "8", "12"],
      answer: "8",
      difficulty: 4,
    },
    {
      question: "A bag has 4 red marbles, 4 blue marbles, and 2 green marbles. Which color is least likely?",
      options: ["Red", "Blue", "Green", "Red and blue together"],
      answer: "Green",
      difficulty: 4,
    },
    {
      question: "A spinner has 6 equal sections and 2 are star shapes. What is the chance of landing on a star?",
      options: ["1/6", "1/3", "1/2", "2/3"],
      answer: "1/3",
      difficulty: 4,
    },
    {
      question: "How many equally likely outcomes are there if you flip one coin and roll one die?",
      options: ["6", "8", "10", "12"],
      answer: "12",
      difficulty: 5,
    },
    {
      question: "A bag has 2 red marbles, 5 blue marbles, and 3 yellow marbles. Which color is most likely?",
      options: ["Red", "Blue", "Yellow", "All are equally likely"],
      answer: "Blue",
      difficulty: 5,
    },
    {
      question: "On a standard 6-sided die, what is the chance of rolling a 1 or 2?",
      options: ["1/6", "1/3", "1/2", "2/3"],
      answer: "1/3",
      difficulty: 5,
    },
    {
      question: "A bag has 3 red marbles, 4 blue marbles, and 5 green marbles. Which color has the smallest chance?",
      options: ["Red", "Blue", "Green", "All are equally likely"],
      answer: "Red",
      difficulty: 5,
    },
    {
      question: "A bag has 4 yellow marbles and 1 purple marble. Which color are you less likely to pick?",
      options: ["Yellow", "Purple", "They are equally likely", "Neither"],
      answer: "Purple",
      difficulty: 1,
    },
    {
      question: "If you spin a fair spinner with 4 equal colors, what is the chance of landing on one color?",
      options: ["1/2", "1/3", "1/4", "1/5"],
      answer: "1/4",
      difficulty: 1,
    },
    {
      question: "A bag has 4 green marbles and 4 orange marbles. What is true?",
      options: ["Green is more likely", "Orange is more likely", "They are equally likely", "Neither can happen"],
      answer: "They are equally likely",
      difficulty: 1,
    },
    {
      question: "Which number is impossible on a standard 6-sided die?",
      options: ["1", "3", "6", "8"],
      answer: "8",
      difficulty: 2,
    },
    {
      question: "In a bag with 7 red marbles and 3 green marbles, what is the chance of drawing green?",
      options: ["3/10", "7/10", "1/2", "1/10"],
      answer: "3/10",
      difficulty: 2,
    },
    {
      question: "A spinner has 2 blue sections and 6 red sections. Which color are you more likely to land on?",
      options: ["Blue", "Red", "They are equally likely", "Neither"],
      answer: "Red",
      difficulty: 2,
    },
    {
      question: "What could happen when you flip a fair coin once?",
      options: ["Heads", "2", "Blue", "A shoe"],
      answer: "Heads",
      difficulty: 2,
    },
    {
      question: "A bag with 5 red marbles, 5 blue marbles, and 10 green marbles: which color is most likely?",
      options: ["Red", "Blue", "Green", "Red and blue together"],
      answer: "Green",
      difficulty: 3,
    },
    {
      question: "A bag has 2 black marbles and 8 white marbles. Which color is less likely?",
      options: ["Black", "White", "They are equally likely", "Neither"],
      answer: "Black",
      difficulty: 3,
    },
    {
      question: "What is the chance of getting heads on one fair coin flip?",
      options: ["1/4", "1/3", "1/2", "1/1"],
      answer: "1/2",
      difficulty: 3,
    },
    {
      question: "In a bag with 1 red marble, 2 blue marbles, and 7 yellow marbles, what is the chance of drawing yellow?",
      options: ["1/10", "2/10", "7/10", "9/10"],
      answer: "7/10",
      difficulty: 3,
    },
    {
      question: "If every marble in a bag is purple, picking purple is:",
      options: ["Impossible", "Unlikely", "Certain", "Half likely"],
      answer: "Certain",
      difficulty: 4,
    },
    {
      question: "When you flip two coins, which result is impossible?",
      options: ["Two heads", "Two tails", "One head and one tail", "Three heads"],
      answer: "Three heads",
      difficulty: 4,
    },
    {
      question: "A spinner has 8 equal sections, and 3 of them are purple. What is the chance of purple?",
      options: ["3/8", "5/8", "1/4", "1/8"],
      answer: "3/8",
      difficulty: 4,
    },
    {
      question: "A bag with 6 blue marbles and 2 yellow marbles: which color has the smaller chance?",
      options: ["Blue", "Yellow", "They are equally likely", "Neither"],
      answer: "Yellow",
      difficulty: 4,
    },
    {
      question: "How many possible outcomes are there if you flip three fair coins?",
      options: ["6", "8", "10", "12"],
      answer: "8",
      difficulty: 5,
    },
    {
      question: "In a bag with 1 red marble, 2 blue marbles, and 7 yellow marbles, what is the chance of choosing yellow?",
      options: ["1/10", "2/10", "7/10", "9/10"],
      answer: "7/10",
      difficulty: 5,
    },
    {
      question: "A spinner has 10 equal sections and 2 are red. What is the chance of landing on red?",
      options: ["1/2", "1/5", "1/10", "2/5"],
      answer: "1/5",
      difficulty: 5,
    },
    {
      question: "A bag with 2 red marbles, 2 blue marbles, and 6 green marbles: which color is most likely?",
      options: ["Red", "Blue", "Green", "Red and blue together"],
      answer: "Green",
      difficulty: 5,
    },
  ]
);

PROBABILITY_QUESTIONS.push(
  {
    question: "A box has 2 red balls and 1 blue ball. Which color is more likely to be picked?",
    options: ["Red", "Blue", "They are equally likely", "Neither color can be picked"],
    answer: "Red",
    difficulty: 2,
  },
  {
    question: "A box has 3 red balls and 1 blue ball. What fraction of the balls are blue?",
    options: ["1/2", "1/3", "1/4", "3/4"],
    answer: "1/4",
    difficulty: 3,
  },
  {
    question: "A box has 4 red balls and 1 blue ball. What percentage of the balls are blue?",
    options: ["40%", "60%", "20%", "10%"],
    answer: "20%",
    difficulty: 4,
  },
  {
    question: "A box has 3 red balls and 2 blue balls. What percentage of the balls are blue?",
    options: ["20%", "30%", "40%", "60%"],
    answer: "40%",
    difficulty: 4,
  },
  {
    question: "A box has 5 red balls, 3 blue balls, and 2 green balls. What percentage of the balls are blue?",
    options: ["20%", "30%", "40%", "50%"],
    answer: "30%",
    difficulty: 5,
  },
  {
    question: "A box has 4 red balls, 4 blue balls, and 2 yellow balls. What percentage of the balls are blue?",
    options: ["20%", "30%", "40%", "50%"],
    answer: "40%",
    difficulty: 5,
  }
);

function createProbabilityGeneratedEntry(difficulty) {
  function buildOptionSet(answer, distractors) {
    return shuffleArray(Array.from(new Set([answer, ...distractors])));
  }

  function pickFraction(numerator, denominator) {
    const divisor = greatestCommonDivisor(numerator, denominator);
    return `${numerator / divisor}/${denominator / divisor}`;
  }

  function pickPercent(numerator, denominator) {
    return `${(numerator / denominator) * 100}%`;
  }

  function buildOptionsFromPool(answer, pool) {
    return buildOptionSet(answer, shuffleArray(pool.filter((value) => value !== answer)).slice(0, 3));
  }

  const generators = {
    1: [
      () => {
        const red = randomChoice([4, 5, 6, 7, 8]);
        const blue = randomChoice([1, 2, 3]);
        return {
          question: `A bag has ${red} red marbles and ${blue} blue marble${blue === 1 ? "" : "s"}. Which color are you more likely to pick?`,
          options: buildOptionSet("Red", ["Blue", "Both are equally likely", "Neither color can be picked"]),
          answer: "Red",
          difficulty: 1,
        };
      },
      () => {
        const spinnerParts = randomChoice([4, 6, 8]);
        const coloredParts = 1;
        const answer = pickFraction(coloredParts, spinnerParts);
        const question = `A spinner has ${spinnerParts} equal parts and only 1 part is green. What is the chance of landing on green?`;
        return {
          question,
          options: buildOptionSet(answer, [
            pickFraction(1, 2),
            pickFraction(1, 3),
            pickFraction(1, spinnerParts + 1),
          ]),
          answer,
          difficulty: 1,
        };
      },
    ],
    2: [
      () => {
        const impossibleNumbers = [0, 7, 8, 9];
        const answer = String(randomChoice(impossibleNumbers));
        return {
          question: "Which result is impossible on a standard 6-sided die?",
          options: buildOptionSet(answer, ["2", "4", "6"]),
          answer,
          difficulty: 2,
        };
      },
      () => {
        return {
          question: "If you flip a fair coin once, what is true?",
          options: buildOptionSet("Heads and tails are equally likely", [
            "Heads is more likely",
            "Tails is more likely",
            "Neither heads nor tails can happen",
          ]),
          answer: "Heads and tails are equally likely",
          difficulty: 2,
        };
      },
      () => {
        const setups = [
          { red: 2, blue: 1 },
          { red: 3, blue: 1 },
          { red: 4, blue: 2 },
          { red: 1, blue: 2 },
        ];
        const { red, blue } = randomChoice(setups);
        const answer = red > blue ? "Red" : "Blue";
        return {
          question: `A box has ${red} red ball${red === 1 ? "" : "s"} and ${blue} blue ball${blue === 1 ? "" : "s"}. Which color is more likely to be picked?`,
          options: buildOptionSet(answer, ["Red", "Blue", "They are equally likely", "Neither color can be picked"]),
          answer,
          difficulty: 2,
        };
      },
    ],
    3: [
      () => {
        const red = randomChoice([2, 3, 4]);
        const blue = red;
        const answer = "Apple and orange are equally likely";
        return {
          question: `A basket has ${red} apples and ${blue} oranges. Which is true if you pick 1 fruit without looking?`,
          options: buildOptionSet(answer, [
            "Apple is more likely",
            "Orange is more likely",
            "Neither fruit can be picked",
          ]),
          answer,
          difficulty: 3,
        };
      },
      () => {
        const firstBlue = randomChoice([7, 8, 9]);
        const firstRed = randomChoice([1, 2, 3]);
        const secondBlue = randomChoice([4, 5, 6]);
        const secondRed = randomChoice([4, 5, 6]);
        const answer = "The first bag";
        return {
          question: `A bag has ${firstBlue} blue marbles and ${firstRed} red marbles. Another bag has ${secondBlue} blue marbles and ${secondRed} red marbles. Which bag is more likely to give you a blue marble?`,
          options: buildOptionSet(answer, [
            "The second bag",
            "They are equally likely",
            "Neither can happen",
          ]),
          answer,
          difficulty: 3,
        };
      },
      () => {
        const setups = [
          { red: 3, blue: 1 },
          { red: 4, blue: 2 },
          { red: 3, blue: 2 },
          { red: 2, blue: 3 },
        ];
        const { red, blue } = randomChoice(setups);
        const answer = pickFraction(blue, red + blue);
        return {
          question: `A box has ${red} red balls and ${blue} blue ball${blue === 1 ? "" : "s"}. What fraction of the balls are blue?`,
          options: buildOptionsFromPool(answer, ["1/2", "1/3", "1/4", "2/5", "3/5", "2/3"]),
          answer,
          difficulty: 3,
        };
      },
    ],
    4: [
      () => {
        const answer = "1/2";
        return {
          question: "What is the chance of rolling an even number on a standard 6-sided die?",
          options: buildOptionSet(answer, ["1/6", "1/3", "2/3"]),
          answer,
          difficulty: 4,
        };
      },
      () => {
        return {
          question: "A bag has only green marbles in it. Picking a green marble is:",
          options: buildOptionSet("Certain", ["Impossible", "Unlikely", "Less than half likely"]),
          answer: "Certain",
          difficulty: 4,
        };
      },
      () => {
        const setups = [
          { red: 4, blue: 1 },
          { red: 3, blue: 2 },
          { red: 7, blue: 3 },
          { red: 6, blue: 4 },
        ];
        const { red, blue } = randomChoice(setups);
        const answer = pickPercent(blue, red + blue);
        return {
          question: `A box has ${red} red balls and ${blue} blue ball${blue === 1 ? "" : "s"}. What percentage of the balls are blue?`,
          options: buildOptionsFromPool(answer, ["10%", "20%", "30%", "40%", "50%", "60%"]),
          answer,
          difficulty: 4,
        };
      },
    ],
    5: [
      () => {
        const answer = "4";
        return {
          question: "If you toss 2 coins, how many possible outcomes are there altogether?",
          options: buildOptionSet(answer, ["2", "3", "6"]),
          answer,
          difficulty: 5,
        };
      },
      () => {
        const red = randomChoice([2, 3, 4]);
        const blue = randomChoice([4, 5, 6]);
        const green = randomChoice([6, 7, 8]);
        const least = Math.min(red, blue, green);
        const answer = least === red ? "Red" : least === blue ? "Blue" : "Green";
        return {
          question: `A bag has ${red} red marbles, ${blue} blue marbles, and ${green} green marbles. Which color is least likely to be picked?`,
          options: buildOptionSet(answer, ["Red", "Blue", "Green", "All are equally likely"]),
          answer,
          difficulty: 5,
        };
      },
      () => {
        const setups = [
          { red: 5, blue: 3, green: 2 },
          { red: 4, blue: 4, green: 2 },
          { red: 6, blue: 2, green: 2 },
          { red: 3, blue: 5, green: 2 },
        ];
        const { red, blue, green } = randomChoice(setups);
        const answer = pickPercent(blue, red + blue + green);
        return {
          question: `A box has ${red} red balls, ${blue} blue balls, and ${green} green balls. What percentage of the balls are blue?`,
          options: buildOptionsFromPool(answer, ["10%", "20%", "30%", "40%", "50%"]),
          answer,
          difficulty: 5,
        };
      },
    ],
  };

  const level = generators[difficulty] ? difficulty : 1;
  return randomChoice(generators[level])();
}

PROBABILITY_QUESTIONS.push({
  question: "A spinner has 5 equal sections and only 1 section is red. What is the chance of landing on red?",
  options: ["1/2", "1/3", "1/4", "1/5"],
  answer: "1/5",
  difficulty: 2,
});

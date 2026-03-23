const ESTIMATION_QUESTIONS = [
  {
    question: "What is the best estimate for 19 + 21?",
    options: ["About 20", "About 30", "About 40", "About 60"],
    answer: "About 40",
    difficulty: 1,
  },
  {
    question: "Which answer is most reasonable for 48 divided by 5?",
    options: ["About 2", "About 5", "About 10", "About 50"],
    answer: "About 10",
    difficulty: 1,
  },
  {
    question: "What is the best estimate for 198 + 203?",
    options: ["About 200", "About 300", "About 400", "About 500"],
    answer: "About 400",
    difficulty: 2,
  },
  {
    question: "Which number is closest to 3.9 x 20?",
    options: ["40", "60", "80", "120"],
    answer: "80",
    difficulty: 2,
  },
  {
    question: "If 9 children each get 5 stickers, about how many stickers are needed?",
    options: ["About 20", "About 30", "About 45", "About 90"],
    answer: "About 45",
    difficulty: 3,
  },
  {
    question: "What is the best estimate for 51% of 200?",
    options: ["About 50", "About 75", "About 100", "About 150"],
    answer: "About 100",
    difficulty: 3,
  },
  {
    question: "What is the best estimate for 301 + 198 + 99?",
    options: ["About 400", "About 500", "About 600", "About 700"],
    answer: "About 600",
    difficulty: 4,
  },
  {
    question: "A bus ride takes 17 minutes and a walk takes 16 minutes. About how long is that altogether?",
    options: ["About 20 minutes", "About 30 minutes", "About 40 minutes", "About 60 minutes"],
    answer: "About 30 minutes",
    difficulty: 4,
  },
  {
    question: "Which number is closest to 78 x 6?",
    options: ["180", "300", "480", "780"],
    answer: "480",
    difficulty: 5,
  },
  {
    question: "One box has 49 pencils and another has 52 pencils. About how many pencils are there altogether?",
    options: ["About 70", "About 90", "About 100", "About 120"],
    answer: "About 100",
    difficulty: 5,
  },
  {
    question: "What is the best estimate for 61 + 39?",
    options: ["About 50", "About 80", "About 100", "About 120"],
    answer: "About 100",
    difficulty: 1,
  },
  {
    question: "What is the best estimate for 205 - 98?",
    options: ["About 50", "About 100", "About 150", "About 200"],
    answer: "About 100",
    difficulty: 1,
  },
  {
    question: "Which number is closest to 7.8 x 5?",
    options: ["20", "30", "40", "60"],
    answer: "40",
    difficulty: 2,
  },
  {
    question: "If 24 children each get 9 stickers, about how many stickers are needed?",
    options: ["About 100", "About 180", "About 220", "About 300"],
    answer: "About 220",
    difficulty: 2,
  },
  {
    question: "What is the best estimate for 399 + 402 + 198?",
    options: ["About 700", "About 900", "About 1,000", "About 1,200"],
    answer: "About 1,000",
    difficulty: 3,
  },
  {
    question: "Which answer is most reasonable for 198 divided by 9?",
    options: ["About 10", "About 20", "About 40", "About 90"],
    answer: "About 20",
    difficulty: 3,
  },
  {
    question: "What is the best estimate for 49% of 80?",
    options: ["About 20", "About 30", "About 40", "About 60"],
    answer: "About 40",
    difficulty: 4,
  },
  {
    question: "Eleven buses each carry about 48 students. About how many students is that altogether?",
    options: ["About 300", "About 400", "About 500", "About 700"],
    answer: "About 500",
    difficulty: 4,
  },
  {
    question: "What is the best estimate for 78 + 121 + 203?",
    options: ["About 200", "About 300", "About 400", "About 500"],
    answer: "About 400",
    difficulty: 5,
  },
  {
    question: "What is the best estimate for 301 - 97?",
    options: ["About 100", "About 200", "About 300", "About 400"],
    answer: "About 200",
    difficulty: 5,
  },
];

ESTIMATION_QUESTIONS.push(
  ...[
    {
      question: "What is the best estimate for 14 + 16?",
      options: ["About 20", "About 30", "About 40", "About 60"],
      answer: "About 30",
      difficulty: 1,
    },
    {
      question: "Which answer is most reasonable for 96 divided by 10?",
      options: ["About 1", "About 10", "About 50", "About 100"],
      answer: "About 10",
      difficulty: 1,
    },
    {
      question: "What is the best estimate for 47 + 54?",
      options: ["About 80", "About 90", "About 100", "About 120"],
      answer: "About 100",
      difficulty: 1,
    },
    {
      question: "Which number is closest to 6.1 x 5?",
      options: ["20", "30", "40", "50"],
      answer: "30",
      difficulty: 1,
    },
    {
      question: "What is the best estimate for 149 + 151?",
      options: ["About 200", "About 250", "About 300", "About 350"],
      answer: "About 300",
      difficulty: 2,
    },
    {
      question: "Which answer is most reasonable for 82 divided by 4?",
      options: ["About 5", "About 10", "About 20", "About 40"],
      answer: "About 20",
      difficulty: 2,
    },
    {
      question: "What is the best estimate for 74 - 23?",
      options: ["About 20", "About 30", "About 50", "About 70"],
      answer: "About 50",
      difficulty: 2,
    },
    {
      question: "Which number is closest to 2.2 x 20?",
      options: ["20", "40", "60", "80"],
      answer: "40",
      difficulty: 2,
    },
    {
      question: "If 17 children each get 6 stickers, about how many stickers are needed?",
      options: ["About 60", "About 80", "About 100", "About 140"],
      answer: "About 100",
      difficulty: 3,
    },
    {
      question: "What is the best estimate for 24% of 200?",
      options: ["About 20", "About 50", "About 80", "About 120"],
      answer: "About 50",
      difficulty: 3,
    },
    {
      question: "What is the best estimate for 612 + 181?",
      options: ["About 600", "About 700", "About 800", "About 900"],
      answer: "About 800",
      difficulty: 3,
    },
    {
      question: "Which answer is most reasonable for 403 divided by 8?",
      options: ["About 20", "About 50", "About 80", "About 100"],
      answer: "About 50",
      difficulty: 3,
    },
    {
      question: "A movie is 94 minutes long. About how long is that?",
      options: ["About 1 hour", "About 1 and a half hours", "About 2 and a half hours", "About 4 hours"],
      answer: "About 1 and a half hours",
      difficulty: 4,
    },
    {
      question: "What is the best estimate for 62% of 50?",
      options: ["About 10", "About 20", "About 30", "About 40"],
      answer: "About 30",
      difficulty: 4,
    },
    {
      question: "What is the best estimate for 799 + 205 + 98?",
      options: ["About 900", "About 1,000", "About 1,100", "About 1,300"],
      answer: "About 1,100",
      difficulty: 4,
    },
    {
      question: "A trip takes 58 minutes and then 67 minutes. About how long is that altogether?",
      options: ["About 1 hour", "About 2 hours", "About 3 hours", "About 4 hours"],
      answer: "About 2 hours",
      difficulty: 4,
    },
    {
      question: "Which number is closest to 124 x 4?",
      options: ["200", "300", "500", "700"],
      answer: "500",
      difficulty: 5,
    },
    {
      question: "What is the best estimate for 18% of 250?",
      options: ["About 20", "About 45", "About 70", "About 100"],
      answer: "About 45",
      difficulty: 5,
    },
    {
      question: "One shelf has 203 books and another has 398 books. About how many books are there altogether?",
      options: ["About 400", "About 500", "About 600", "About 800"],
      answer: "About 600",
      difficulty: 5,
    },
    {
      question: "Which answer is most reasonable for 1,004 divided by 20?",
      options: ["About 10", "About 30", "About 50", "About 100"],
      answer: "About 50",
      difficulty: 5,
    },
    {
      question: "What is the best estimate for 22 + 19?",
      options: ["About 20", "About 30", "About 40", "About 60"],
      answer: "About 40",
      difficulty: 1,
    },
    {
      question: "Which is closest to 51 - 18?",
      options: ["About 20", "About 30", "About 40", "About 50"],
      answer: "About 30",
      difficulty: 1,
    },
    {
      question: "Which number is closest to 4.4 x 10?",
      options: ["20", "30", "40", "50"],
      answer: "40",
      difficulty: 1,
    },
    {
      question: "What is the best estimate for 33 + 28?",
      options: ["About 40", "About 50", "About 60", "About 70"],
      answer: "About 60",
      difficulty: 1,
    },
    {
      question: "Which answer is most reasonable for 18 divided by 4?",
      options: ["About 2", "About 5", "About 10", "About 20"],
      answer: "About 5",
      difficulty: 1,
    },
    {
      question: "What is the best estimate for 6.2 x 6?",
      options: ["About 20", "About 30", "About 40", "About 50"],
      answer: "About 40",
      difficulty: 1,
    },
    {
      question: "Which is closest to 29 + 12?",
      options: ["About 20", "About 30", "About 40", "About 50"],
      answer: "About 40",
      difficulty: 1,
    },
    {
      question: "What is the best estimate for 47 - 19?",
      options: ["About 10", "About 20", "About 30", "About 40"],
      answer: "About 30",
      difficulty: 1,
    },
    {
      question: "What is the best estimate for 101 + 98?",
      options: ["About 100", "About 150", "About 200", "About 250"],
      answer: "About 200",
      difficulty: 2,
    },
    {
      question: "Which number is closest to 7.9 x 9?",
      options: ["About 50", "About 60", "About 70", "About 90"],
      answer: "About 70",
      difficulty: 2,
    },
    {
      question: "If 14 children each get 3 stickers, about how many stickers are needed?",
      options: ["About 20", "About 30", "About 40", "About 60"],
      answer: "About 40",
      difficulty: 2,
    },
    {
      question: "What is the best estimate for 162 - 79?",
      options: ["About 50", "About 80", "About 100", "About 150"],
      answer: "About 80",
      difficulty: 2,
    },
    {
      question: "Which answer is most reasonable for 81 divided by 9?",
      options: ["About 5", "About 10", "About 20", "About 40"],
      answer: "About 10",
      difficulty: 2,
    },
    {
      question: "What is the best estimate for 5.8 x 12?",
      options: ["About 50", "About 60", "About 70", "About 80"],
      answer: "About 70",
      difficulty: 2,
    },
    {
      question: "What is the best estimate for 49 + 53 + 47?",
      options: ["About 100", "About 120", "About 150", "About 200"],
      answer: "About 150",
      difficulty: 2,
    },
    {
      question: "Which number is closest to 128 - 46?",
      options: ["About 40", "About 60", "About 80", "About 100"],
      answer: "About 80",
      difficulty: 2,
    },
    {
      question: "What is the best estimate for 52% of 100?",
      options: ["About 20", "About 50", "About 80", "About 100"],
      answer: "About 50",
      difficulty: 3,
    },
    {
      question: "What is the best estimate for 198 + 205?",
      options: ["About 300", "About 400", "About 500", "About 600"],
      answer: "About 400",
      difficulty: 3,
    },
    {
      question: "Which answer is most reasonable for 391 divided by 8?",
      options: ["About 20", "About 30", "About 50", "About 80"],
      answer: "About 50",
      difficulty: 3,
    },
    {
      question: "If 23 children each get 5 stickers, about how many stickers are needed?",
      options: ["About 50", "About 80", "About 100", "About 150"],
      answer: "About 100",
      difficulty: 3,
    },
    {
      question: "What is the best estimate for 302 - 149?",
      options: ["About 100", "About 150", "About 200", "About 250"],
      answer: "About 150",
      difficulty: 3,
    },
    {
      question: "Which number is closest to 8.1 x 9?",
      options: ["About 50", "About 60", "About 70", "About 90"],
      answer: "About 70",
      difficulty: 3,
    },
    {
      question: "What is the best estimate for 24% of 250?",
      options: ["About 30", "About 40", "About 60", "About 100"],
      answer: "About 60",
      difficulty: 3,
    },
    {
      question: "What is the best estimate for 410 + 192 + 97?",
      options: ["About 500", "About 600", "About 700", "About 800"],
      answer: "About 700",
      difficulty: 3,
    },
    {
      question: "What is the best estimate for 61% of 80?",
      options: ["About 30", "About 40", "About 50", "About 70"],
      answer: "About 50",
      difficulty: 4,
    },
    {
      question: "Which number is closest to 79 x 5?",
      options: ["About 300", "About 400", "About 500", "About 600"],
      answer: "About 400",
      difficulty: 4,
    },
    {
      question: "What is the best estimate for 598 + 203?",
      options: ["About 600", "About 700", "About 800", "About 900"],
      answer: "About 800",
      difficulty: 4,
    },
    {
      question: "A trip takes 42 minutes and then 49 minutes. About how long is that altogether?",
      options: ["About 60 minutes", "About 70 minutes", "About 90 minutes", "About 120 minutes"],
      answer: "About 90 minutes",
      difficulty: 4,
    },
    {
      question: "What is the best estimate for 712 - 288?",
      options: ["About 200", "About 300", "About 400", "About 500"],
      answer: "About 400",
      difficulty: 4,
    },
    {
      question: "Which answer is most reasonable for 960 divided by 12?",
      options: ["About 20", "About 40", "About 80", "About 120"],
      answer: "About 80",
      difficulty: 4,
    },
    {
      question: "What is the best estimate for 18% of 200?",
      options: ["About 20", "About 30", "About 40", "About 60"],
      answer: "About 40",
      difficulty: 4,
    },
    {
      question: "Eleven bags each hold about 47 marbles. About how many marbles is that altogether?",
      options: ["About 300", "About 400", "About 500", "About 700"],
      answer: "About 500",
      difficulty: 4,
    },
    {
      question: "Which number is closest to 126 x 7?",
      options: ["About 700", "About 800", "About 900", "About 1,000"],
      answer: "About 900",
      difficulty: 5,
    },
    {
      question: "What is the best estimate for 38% of 250?",
      options: ["About 50", "About 100", "About 150", "About 200"],
      answer: "About 100",
      difficulty: 5,
    },
    {
      question: "One box has 204 pens and another has 295 pens. About how many pens are there altogether?",
      options: ["About 400", "About 500", "About 600", "About 700"],
      answer: "About 500",
      difficulty: 5,
    },
    {
      question: "Which answer is most reasonable for 1,201 divided by 25?",
      options: ["About 20", "About 50", "About 80", "About 100"],
      answer: "About 50",
      difficulty: 5,
    },
    {
      question: "What is the best estimate for 809 + 402 + 195?",
      options: ["About 1,000", "About 1,200", "About 1,400", "About 1,600"],
      answer: "About 1,400",
      difficulty: 5,
    },
    {
      question: "Which number is closest to 96 x 8?",
      options: ["About 500", "About 700", "About 800", "About 1,000"],
      answer: "About 800",
      difficulty: 5,
    },
    {
      question: "What is the best estimate for 72% of 150?",
      options: ["About 50", "About 70", "About 100", "About 120"],
      answer: "About 100",
      difficulty: 5,
    },
    {
      question: "What is the best estimate for 1,000 - 487?",
      options: ["About 200", "About 300", "About 500", "About 700"],
      answer: "About 500",
      difficulty: 5,
    },
  ]
);

function createEstimationGeneratedEntry(difficulty) {
  const level = clampEstimationDifficulty(difficulty);
  const generators = {
    1: [
      createEstimationAdditionQuestion,
      createEstimationSubtractionQuestion,
      createEstimationDivisionQuestion,
      createEstimationMultiplicationQuestion,
    ],
    2: [
      createEstimationAdditionQuestion,
      createEstimationMultiplicationQuestion,
      createEstimationDivisionQuestion,
      createEstimationNumberQuestion,
    ],
    3: [
      createEstimationMultiplicationQuestion,
      createEstimationPercentQuestion,
      createEstimationAdditionQuestion,
      createEstimationDivisionQuestion,
    ],
    4: [
      createEstimationElapsedTimeQuestion,
      createEstimationPercentQuestion,
      createEstimationAdditionQuestion,
      createEstimationMultiplicationQuestion,
    ],
    5: [
      createEstimationLargeMultiplicationQuestion,
      createEstimationPercentQuestion,
      createEstimationElapsedTimeQuestion,
      createEstimationDivisionQuestion,
    ],
  };

  return estimationRandomChoice(generators[level])();
}

function createEstimationAdditionQuestion() {
  const left = estimationRandomInt(12, 98);
  const right = estimationRandomInt(12, 98);
  const exact = left + right;
  const answer = estimationFormatAbout(Math.round(exact / 10) * 10);
  return {
    question: `What is the best estimate for ${left} + ${right}?`,
    options: estimationBuildAboutOptions(answer, [20, 30, 40, 60, 80, 100, 120, 150]),
    answer,
    difficulty: 1,
  };
}

function createEstimationSubtractionQuestion() {
  const left = estimationRandomInt(60, 240);
  const right = estimationRandomInt(10, Math.min(90, left - 5));
  const exact = left - right;
  const rounded = Math.max(10, Math.round(exact / 10) * 10);
  const answer = estimationFormatAbout(rounded);
  return {
    question: `Which is closest to ${left} - ${right}?`,
    options: estimationBuildAboutOptions(answer, [20, 30, 40, 50, 60, 70, 80, 100]),
    answer,
    difficulty: 1,
  };
}

function createEstimationDivisionQuestion() {
  const divisor = estimationRandomChoice([5, 8, 9, 10, 12, 20]);
  const quotient = estimationRandomChoice([5, 8, 10, 12, 15]);
  const dividend = divisor * quotient + estimationRandomChoice([0, 1, 2, -1]);
  const estimated = Math.max(1, Math.round(dividend / divisor));
  const answer = estimationFormatAbout(estimated);
  return {
    question: `Which answer is most reasonable for ${dividend} divided by ${divisor}?`,
    options: estimationBuildAboutOptions(answer, [5, 10, 20, 30, 40, 50, 80, 100].map(estimationFormatAbout)),
    answer,
    difficulty: 2,
  };
}

function createEstimationMultiplicationQuestion() {
  const left = estimationRandomChoice([3.1, 4.2, 5.8, 6.1, 7.4, 8.3]).toFixed(1);
  const right = estimationRandomChoice([4, 5, 6, 7, 8, 9, 10]);
  const product = Number(left) * right;
  const answer = String(Math.round(product / 10) * 10);
  return {
    question: `Which number is closest to ${left} x ${right}?`,
    options: estimationBuildNumericOptions(answer, 20),
    answer,
    difficulty: 2,
  };
}

function createEstimationNumberQuestion() {
  const first = estimationRandomInt(10, 30);
  const second = estimationRandomInt(10, 30);
  const exact = first * second;
  const answer = String(Math.max(10, Math.round(exact / 10) * 10));
  return {
    question: `If ${first} children each get ${second} stickers, about how many stickers are needed?`,
    options: estimationBuildNumericOptions(answer, 20, 40),
    answer,
    difficulty: 2,
  };
}

function createEstimationPercentQuestion() {
  const percent = estimationRandomChoice([18, 24, 49, 51, 62, 72]);
  const whole = estimationRandomChoice([50, 80, 100, 150, 200, 250]);
  const exact = (percent / 100) * whole;
  const rounded = Math.round(exact / 10) * 10;
  const answer = estimationFormatAbout(rounded);
  return {
    question: `What is the best estimate for ${percent}% of ${whole}?`,
    options: estimationBuildAboutOptions(answer, [20, 30, 40, 50, 60, 70, 80, 100, 120, 150].map(estimationFormatAbout)),
    answer,
    difficulty: 3,
  };
}

function createEstimationElapsedTimeQuestion() {
  const left = estimationRandomInt(15, 70);
  const right = estimationRandomInt(15, 70);
  const total = left + right;
  const answer = estimationFormatAbout(total <= 90 ? 60 : 120);
  return {
    question: `A walk takes ${left} minutes and a bus ride takes ${right} minutes. About how long is that altogether?`,
    options: estimationBuildAboutOptions(answer, ["About 30 minutes", "About 1 hour", "About 2 hours", "About 3 hours"]),
    answer,
    difficulty: 4,
  };
}

function createEstimationLargeMultiplicationQuestion() {
  const left = estimationRandomInt(40, 150);
  const right = estimationRandomChoice([4, 5, 6, 7, 8, 9]);
  const product = left * right;
  const rounded = Math.round(product / 100) * 100 || Math.round(product / 10) * 10;
  const answer = String(rounded);
  return {
    question: `Which number is closest to ${left} x ${right}?`,
    options: estimationBuildNumericOptions(answer, 100, 200),
    answer,
    difficulty: 5,
  };
}

function estimationBuildAboutOptions(answer, candidates) {
  const options = [String(answer)];
  const uniqueCandidates = Array.from(new Set(candidates.map(String))).filter((candidate) => candidate !== String(answer));
  const shuffled = estimationShuffle(uniqueCandidates);

  while (options.length < 4 && shuffled.length) {
    options.push(shuffled.shift());
  }

  while (options.length < 4) {
    const fallback = `About ${options.length * 10}`;
    if (!options.includes(fallback)) {
      options.push(fallback);
    }
  }

  return estimationShuffle(options);
}

function estimationBuildNumericOptions(answer, spread = 10, extra = 20) {
  const value = Number(answer);
  const candidates = [
    value - extra * 2,
    value - extra,
    value - spread,
    value + spread,
    value + extra,
    value + extra * 2,
    Math.max(1, Math.round(value / 2)),
    value * 2,
  ]
    .map((number) => String(Math.max(1, Math.round(number))))
    .filter((option) => option !== String(answer));
  return estimationBuildOptions(answer, candidates);
}

function estimationBuildOptions(answer, candidates) {
  const options = [String(answer)];
  const uniqueCandidates = Array.from(new Set(candidates.map(String))).filter((candidate) => candidate !== String(answer));
  const shuffled = estimationShuffle(uniqueCandidates);

  while (options.length < 4 && shuffled.length) {
    options.push(shuffled.shift());
  }

  while (options.length < 4) {
    const fallback = `${answer} ${options.length}`;
    if (!options.includes(fallback)) {
      options.push(fallback);
    }
  }

  return estimationShuffle(options);
}

function estimationFormatAbout(value) {
  return `About ${value}`;
}

function clampEstimationDifficulty(difficulty) {
  const value = Number(difficulty);
  if (!Number.isInteger(value)) {
    return 1;
  }

  return Math.min(5, Math.max(1, value));
}

function estimationRandomChoice(values) {
  return values[estimationRandomInt(0, values.length - 1)];
}

function estimationRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function estimationShuffle(values) {
  const shuffled = [...values];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = estimationRandomInt(0, index);
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

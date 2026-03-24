const APPLIED_WORD_PROBLEMS_QUESTIONS = [
  {
    question: "How much money is left?",
    displayText: "Lina has 20 shekels. She spends 7 shekels on a snack and then gets 5 shekels as change from another purchase.",
    options: ["10 shekels", "15 shekels", "18 shekels", "22 shekels"],
    answer: "18 shekels",
    difficulty: 1,
  },
  {
    question: "How many apples are there altogether?",
    displayText: "There are 3 bags with 4 apples in each bag. Then 2 more apples are added.",
    options: ["10 apples", "11 apples", "12 apples", "14 apples"],
    answer: "14 apples",
    difficulty: 1,
  },
  {
    question: "How long is the trip altogether?",
    displayText: "A walk takes 20 minutes and then another walk takes 15 minutes.",
    options: ["25 minutes", "30 minutes", "35 minutes", "45 minutes"],
    answer: "35 minutes",
    difficulty: 1,
  },
  {
    question: "How much flour is needed in all?",
    displayText: "A recipe uses 1 cup of flour two times and then 1 more cup.",
    options: ["2 cups", "3 cups", "4 cups", "5 cups"],
    answer: "3 cups",
    difficulty: 1,
  },
  {
    question: "How much money is left after the purchases?",
    displayText: "Noa has 50 shekels. She buys a notebook for 18 shekels and markers for 12 shekels.",
    options: ["10 shekels", "15 shekels", "20 shekels", "25 shekels"],
    answer: "20 shekels",
    difficulty: 2,
  },
  {
    question: "How many stickers are needed?",
    displayText: "There are 6 children. Each child gets 3 stickers and then 2 extra stickers are added for the teacher.",
    options: ["15 stickers", "18 stickers", "20 stickers", "24 stickers"],
    answer: "20 stickers",
    difficulty: 2,
  },
  {
    question: "How long is the movie and the walk together?",
    displayText: "A movie lasts 45 minutes. A walk before the movie lasts 20 minutes.",
    options: ["55 minutes", "60 minutes", "65 minutes", "75 minutes"],
    answer: "65 minutes",
    difficulty: 2,
  },
  {
    question: "How much juice is there in all?",
    displayText: "A cup has 1/2 liter of juice. Another cup has 1/2 liter of juice.",
    options: ["1/4 liter", "1/2 liter", "1 liter", "2 liters"],
    answer: "1 liter",
    difficulty: 2,
  },
  {
    question: "How much money is left?",
    displayText: "A toy costs 30 shekels. A child has 100 shekels, buys the toy, and then buys a snack for 15 shekels.",
    options: ["45 shekels", "50 shekels", "55 shekels", "60 shekels"],
    answer: "55 shekels",
    difficulty: 3,
  },
  {
    question: "How many minutes are in all?",
    displayText: "Maya practices piano for 25 minutes, rests for 10 minutes, and then practices again for 20 minutes.",
    options: ["45 minutes", "50 minutes", "55 minutes", "60 minutes"],
    answer: "55 minutes",
    difficulty: 3,
  },
  {
    question: "How many cups of fruit are there altogether?",
    displayText: "A bowl has 1/2 cup of grapes and 1/2 cup of strawberries. Then 1 more cup of melon is added.",
    options: ["1 cup", "1 1/2 cups", "2 cups", "2 1/2 cups"],
    answer: "2 cups",
    difficulty: 3,
  },
  {
    question: "How far does the child walk in all?",
    displayText: "A child walks 3 meters to the gate and 4 meters to the playground.",
    options: ["5 meters", "6 meters", "7 meters", "8 meters"],
    answer: "7 meters",
    difficulty: 3,
  },
  {
    question: "How many people chose soccer?",
    visualHtml: buildAppliedWordProblemTable("Sports survey", [
      ["Sport", "Votes"],
      ["Soccer", "12"],
      ["Basketball", "8"],
      ["Tennis", "5"],
    ]),
    options: ["10", "11", "12", "13"],
    answer: "12",
    difficulty: 4,
  },
  {
    question: "How much money is left?",
    displayText: "A student has 120 shekels. She buys 2 notebooks for 18 shekels each and a pencil case for 25 shekels.",
    options: ["50 shekels", "55 shekels", "59 shekels", "65 shekels"],
    answer: "59 shekels",
    difficulty: 4,
  },
  {
    question: "How long is the whole trip?",
    displayText: "The bus ride takes 35 minutes. The walk from the bus stop takes 15 minutes. Then the family waits 10 minutes.",
    options: ["50 minutes", "55 minutes", "60 minutes", "65 minutes"],
    answer: "60 minutes",
    difficulty: 4,
  },
  {
    question: "Which plan uses the fewest total minutes?",
    options: [
      "Read 20 minutes and then 15 minutes",
      "Read 25 minutes and then 8 minutes",
      "Read 10 minutes and then 24 minutes",
      "Read 18 minutes and then 17 minutes",
    ],
    answer: "Read 20 minutes and then 15 minutes",
    difficulty: 4,
  },
  {
    question: "How many liters of water are needed in all?",
    displayText: "A class uses 2 liters in the morning and 1.5 liters in the afternoon.",
    options: ["2.5 liters", "3 liters", "3.5 liters", "4 liters"],
    answer: "3.5 liters",
    difficulty: 5,
  },
  {
    question: "What is the total cost?",
    displayText: "A family buys 3 tickets for 24 shekels each and 2 snacks for 9 shekels each.",
    options: ["78 shekels", "84 shekels", "90 shekels", "96 shekels"],
    answer: "90 shekels",
    difficulty: 5,
  },
  {
    question: "How much time is left for homework?",
    displayText: "A child has 90 minutes for homework. She spends 25 minutes on math and 35 minutes on reading.",
    options: ["20 minutes", "25 minutes", "30 minutes", "35 minutes"],
    answer: "30 minutes",
    difficulty: 5,
  },
  {
    question: "Which choice shows the correct total?",
    visualHtml: buildAppliedWordProblemTable("Class survey", [
      ["Activity", "Students"],
      ["Art", "9"],
      ["Music", "7"],
      ["Sports", "6"],
    ]),
    options: ["20", "21", "22", "23"],
    answer: "22",
    difficulty: 5,
  },
];

function createAppliedWordProblemGeneratedEntry(difficulty) {
  const level = clampAppliedWordProblemDifficulty(difficulty);
  const generators = {
    1: [createMoneyStoryQuestion, createGroupingQuestion, createElapsedTimeQuestion],
    2: [createMoneyStoryQuestion, createFractionStoryQuestion, createElapsedTimeQuestion],
    3: [createTwoStepStoryQuestion, createTableQuestion, createMeasurementStoryQuestion],
    4: [createTableQuestion, createMultiStepMoneyQuestion, createElapsedTimeQuestion],
    5: [createMultiStepMoneyQuestion, createTableQuestion, createFractionStoryQuestion],
  }[level];

  return appliedWordProblemRandomChoice(generators)(level);
}

function createMoneyStoryQuestion(difficulty = 1) {
  const start = appliedWordProblemRandomChoice([20, 30, 40, 50, 60, 70]);
  const spend = appliedWordProblemRandomChoice([5, 7, 8, 10, 12, 15]);
  const bonus = appliedWordProblemRandomChoice([0, 3, 5, 7]);
  const answer = start - spend + bonus;
  return appliedWordProblemBuildQuestion({
    question: "How much money is left?",
    displayText: `A child has ${start} shekels, spends ${spend} shekels, and then gets ${bonus} shekels back.`,
    options: appliedWordProblemBuildOptions(answer, [answer - 10, answer - 5, answer + 5], "shekels"),
    answer: `${answer} shekels`,
    difficulty,
    visualSummary: `The answer is ${answer} shekels.`,
  });
}

function createGroupingQuestion(difficulty = 1) {
  const groups = appliedWordProblemRandomChoice([3, 4, 5, 6]);
  const each = appliedWordProblemRandomChoice([2, 3, 4, 5]);
  const extra = appliedWordProblemRandomChoice([0, 1, 2]);
  const answer = groups * each + extra;
  return appliedWordProblemBuildQuestion({
    question: "How many items are there altogether?",
    displayText: `There are ${groups} groups with ${each} items in each group, and ${extra} more items are added.`,
    options: appliedWordProblemBuildOptions(answer, [answer - 4, answer - 2, answer + 2], ""),
    answer: String(answer),
    difficulty,
    visualSummary: `There are ${answer} items.`,
  });
}

function createElapsedTimeQuestion(difficulty = 1) {
  const first = appliedWordProblemRandomChoice([10, 15, 20, 25, 30, 35]);
  const second = appliedWordProblemRandomChoice([10, 15, 20, 25, 30]);
  const answer = first + second;
  return appliedWordProblemBuildQuestion({
    question: "How many minutes do the game and break take altogether?",
    displayText: `A game lasts ${first} minutes and then a break lasts ${second} minutes.`,
    options: appliedWordProblemBuildOptions(answer, [answer - 10, answer - 5, answer + 5], "minutes"),
    answer: `${answer} minutes`,
    difficulty,
    visualSummary: `The total time is ${answer} minutes.`,
  });
}

function createFractionStoryQuestion(difficulty = 2) {
  const answer = "2 cups";
  return appliedWordProblemBuildQuestion({
    question: "How much is used in all?",
    displayText: "A recipe uses 1/2 cup of milk twice and then 1 more cup.",
    options: appliedWordProblemBuildOptions(answer, ["1 cup", "1 1/2 cups", "3 cups"], ""),
    answer,
    difficulty,
    visualSummary: "The total is 2 cups.",
  });
}

function createMeasurementStoryQuestion(difficulty = 3) {
  const meters = appliedWordProblemRandomChoice([2, 3, 4, 5]);
  const extra = appliedWordProblemRandomChoice([1, 2, 3]);
  const answer = meters + extra;
  return appliedWordProblemBuildQuestion({
    question: "How far did the child walk in all?",
    displayText: `A child walks ${meters} meters to the park and ${extra} more meters to the playground.`,
    options: appliedWordProblemBuildOptions(answer, [answer - 2, answer - 1, answer + 1], "meters"),
    answer: `${answer} meters`,
    difficulty,
    visualSummary: `The total distance is ${answer} meters.`,
  });
}

function createTwoStepStoryQuestion(difficulty = 3) {
  const groups = appliedWordProblemRandomChoice([2, 3, 4, 5]);
  const each = appliedWordProblemRandomChoice([3, 4, 5, 6]);
  const givenAway = appliedWordProblemRandomChoice([2, 3, 4, 5]);
  const answer = groups * each - givenAway;
  return appliedWordProblemBuildQuestion({
    question: "How many stickers are left?",
    displayText: `There are ${groups} bags with ${each} stickers in each bag. Then ${givenAway} stickers are given away.`,
    options: appliedWordProblemBuildOptions(answer, [answer - 4, answer - 2, answer + 2], ""),
    answer: String(answer),
    difficulty,
    visualSummary: `There are ${answer} stickers left.`,
  });
}

function createTableQuestion(difficulty = 3) {
  const answer = "Fruit";
  return appliedWordProblemBuildQuestion({
    question: "Which category had the most votes?",
    visualHtml: buildAppliedWordProblemTable("Class vote", [
      ["Category", "Votes"],
      ["Snack", "4"],
      ["Fruit", "7"],
      ["Drink", "5"],
    ]),
    options: ["Snack", "Fruit", "Drink", "Tie"],
    answer,
    difficulty,
    visualSummary: "Fruit had the most votes.",
  });
}

function createMultiStepMoneyQuestion(difficulty = 4) {
  const start = appliedWordProblemRandomChoice([80, 90, 100, 120, 150]);
  const buy1 = appliedWordProblemRandomChoice([18, 20, 25, 30]);
  const buy2 = appliedWordProblemRandomChoice([10, 15, 18, 25]);
  const answer = start - buy1 - buy2;
  return appliedWordProblemBuildQuestion({
    question: "How much money is left after both purchases?",
    displayText: `A student has ${start} shekels. She buys one item for ${buy1} shekels and another for ${buy2} shekels.`,
    options: appliedWordProblemBuildOptions(answer, [answer - 10, answer - 5, answer + 5], "shekels"),
    answer: `${answer} shekels`,
    difficulty,
    visualSummary: `The money left is ${answer} shekels.`,
  });
}

function appliedWordProblemBuildQuestion({
  question,
  options,
  answer,
  difficulty,
  displayText = "",
  visualHtml = "",
  visualSummary = "",
}) {
  if (!Array.isArray(options) || options.length !== 4 || !options.includes(answer)) {
    throw new Error("Applied word problems require exactly 4 options with one answer.");
  }

  return {
    question,
    displayText,
    visualHtml,
    options: appliedWordProblemShuffleArray(options),
    answer,
    difficulty,
    visualSummary,
    type: "applied-word-problem-choice",
  };
}

function appliedWordProblemBuildOptions(answer, candidates, suffix = "") {
  const normalizedAnswer = suffix ? `${answer} ${suffix}`.trim() : String(answer).trim();
  const options = Array.from(
    new Set([
      normalizedAnswer,
      ...candidates.map((candidate) =>
        suffix ? `${candidate} ${suffix}`.trim() : String(candidate).trim()
      ),
    ])
  );
  if (options.length !== 4 || !options.includes(normalizedAnswer)) {
    throw new Error("Applied word problem option sets must contain exactly 4 unique values.");
  }

  return appliedWordProblemShuffleArray(options);
}

function buildAppliedWordProblemTable(title, rows) {
  const header = rows[0] || [];
  const bodyRows = rows.slice(1);
  const headerHtml = `<tr>${header.map((cell) => `<th style="${appliedWordProblemCellStyle(true)}">${appliedWordProblemEscapeHtml(cell)}</th>`).join("")}</tr>`;
  const bodyHtml = bodyRows
    .map(
      (row) =>
        `<tr>${row.map((cell) => `<td style="${appliedWordProblemCellStyle(false)}">${appliedWordProblemEscapeHtml(cell)}</td>`).join("")}</tr>`
    )
    .join("");

  return `
    <div style="
      max-width: 620px;
      padding: 14px 16px;
      border: 2px solid #274972;
      border-radius: 16px;
      background: linear-gradient(180deg, #f8fbff 0%, #eef5ff 100%);
      color: #274972;
      font-family: Arial, sans-serif;
    ">
      <div style="font-weight: 700; margin-bottom: 10px;">${appliedWordProblemEscapeHtml(title)}</div>
      <table style="border-collapse: collapse; width: 100%; font-size: 14px;">
        <tbody>
          ${headerHtml}
          ${bodyHtml}
        </tbody>
      </table>
    </div>
  `;
}

function appliedWordProblemCellStyle(isHeader) {
  return [
    "border: 1px solid #9fb3c8",
    "padding: 6px 8px",
    "text-align: left",
    "background: " + (isHeader ? "#dfeaf7" : "#ffffff"),
    isHeader ? "font-weight: 700" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

function clampAppliedWordProblemDifficulty(value) {
  const level = Number.parseInt(value, 10);
  if (!Number.isFinite(level)) {
    return 3;
  }

  return Math.min(5, Math.max(1, level));
}

function appliedWordProblemEscapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function appliedWordProblemRandomChoice(values) {
  return values[Math.floor(Math.random() * values.length)];
}

function appliedWordProblemShuffleArray(values) {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

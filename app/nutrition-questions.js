const NUTRITION_QUESTIONS = [
  {
    question: "What does the serving size on a Nutrition Facts label tell you?",
    options: [
      "The amount the nutrition numbers are based on",
      "How tall the package is",
      "How much the food costs",
      "How many colors are on the box",
    ],
    answer: "The amount the nutrition numbers are based on",
    difficulty: 1,
  },
  {
    question: "Which drink is usually the best choice after active play?",
    options: ["Water", "Soda", "Energy drink", "Candy syrup"],
    answer: "Water",
    difficulty: 1,
  },
  {
    question: "A package has 2 servings and 150 calories per serving. How many calories are in the whole package?",
    options: ["150", "250", "300", "450"],
    answer: "300",
    difficulty: 2,
  },
  {
    question: "Which food is highest in protein?",
    options: ["Eggs", "Soda", "Gummy candy", "Lollipop"],
    answer: "Eggs",
    difficulty: 2,
  },
  {
    question: "If two cereals are similar, which one is usually the healthier choice?",
    options: [
      "The one with less added sugar",
      "The one with the brightest box",
      "The one with more cartoon characters",
      "The one with the longest name",
    ],
    answer: "The one with less added sugar",
    difficulty: 3,
  },
  {
    question: "Which food is a good source of fiber?",
    options: ["Beans", "Candy", "Soda", "Marshmallows"],
    answer: "Beans",
    difficulty: 3,
  },
  {
    question: "On a balanced plate, about what should fill half the plate?",
    options: ["Fruits and vegetables", "Only meat", "Only dessert", "Only bread"],
    answer: "Fruits and vegetables",
    difficulty: 4,
  },
  {
    question: "If the first ingredient on a bread label is whole wheat, what does that usually suggest?",
    options: [
      "It is mostly whole grain",
      "It has no calories",
      "It is a dessert",
      "It is only for adults",
    ],
    answer: "It is mostly whole grain",
    difficulty: 4,
  },
  {
    question: "Which snack is usually the better everyday choice?",
    options: [
      "An apple and yogurt",
      "A soda and candy bar",
      "Only gummy candy",
      "A bag of sugar cubes",
    ],
    answer: "An apple and yogurt",
    difficulty: 5,
  },
  {
    question: "Crackers have 120 milligrams of sodium per serving. If you eat 2 servings, how much sodium is that?",
    options: ["120 mg", "180 mg", "240 mg", "300 mg"],
    answer: "240 mg",
    difficulty: 5,
  },
  {
    question: "Which snack is usually a better choice than candy for everyday eating?",
    options: ["An apple", "A lollipop", "A soda", "A marshmallow"],
    answer: "An apple",
    difficulty: 1,
  },
  {
    question: "What does protein help your body do?",
    options: [
      "Build and repair body parts",
      "Make soda fizz",
      "Turn food into colors",
      "Stop all hunger forever",
    ],
    answer: "Build and repair body parts",
    difficulty: 1,
  },
  {
    question: "Which food is a good source of calcium?",
    options: ["Milk", "Candy", "Chips", "Soda"],
    answer: "Milk",
    difficulty: 2,
  },
  {
    question: "What does the fiber in food help with most?",
    options: [
      "Helping digestion",
      "Making food louder",
      "Turning food blue",
      "Adding bubbles",
    ],
    answer: "Helping digestion",
    difficulty: 2,
  },
  {
    question: "Which breakfast is usually the healthiest choice?",
    options: [
      "Oatmeal with fruit",
      "A bowl of candy",
      "Three sodas",
      "A pack of gum",
    ],
    answer: "Oatmeal with fruit",
    difficulty: 3,
  },
  {
    question: "What does \"added sugar\" mean on a label?",
    options: [
      "Sugar put in during processing",
      "Sugar found only in fruit",
      "Sugar that has no calories",
      "Sugar that turns into water",
    ],
    answer: "Sugar put in during processing",
    difficulty: 3,
  },
  {
    question: "Which part of a food label helps you compare two packages fairly?",
    options: ["Serving size", "Box color", "Brand name", "Font style"],
    answer: "Serving size",
    difficulty: 4,
  },
  {
    question: "Which food group should take up about half of a balanced plate?",
    options: [
      "Fruits and vegetables",
      "Desserts",
      "Candy",
      "Sugary drinks",
    ],
    answer: "Fruits and vegetables",
    difficulty: 4,
  },
  {
    question: "Which snack has the least added sugar?",
    options: [
      "Plain yogurt",
      "Chocolate cake",
      "Soda",
      "Candy bars",
    ],
    answer: "Plain yogurt",
    difficulty: 5,
  },
  {
    question: "If a snack has 9 grams of sugar per serving and you eat 2 servings, how much sugar do you eat?",
    options: ["9 grams", "12 grams", "18 grams", "27 grams"],
    answer: "18 grams",
    difficulty: 5,
  },
];

function createNutritionGeneratedEntry(difficulty) {
  const level = nutritionClampDifficulty(difficulty);
  const generatorsByLevel = {
    1: [
      nutritionCreateProteinQuestion,
      nutritionCreateBetterSnackQuestion,
      nutritionCreateServingSizeQuestion,
    ],
    2: [
      nutritionCreateLabelMathQuestion,
      nutritionCreateProteinQuestion,
      nutritionCreateBetterSnackQuestion,
    ],
    3: [
      nutritionCreateSugarComparisonQuestion,
      nutritionCreateLabelMathQuestion,
      nutritionCreateFiberQuestion,
    ],
    4: [
      nutritionCreateBalancedPlateQuestion,
      nutritionCreateSodiumComparisonQuestion,
      nutritionCreateLabelMathQuestion,
    ],
    5: [
      nutritionCreateTotalSugarQuestion,
      nutritionCreateFiberQuestion,
      nutritionCreateSodiumComparisonQuestion,
    ],
  };

  return {
    ...nutritionPick(generatorsByLevel[level])(),
    difficulty: level,
  };
}

function nutritionCreateProteinQuestion() {
  const templates = [
    {
      question: "Which food is usually highest in protein?",
      options: ["Eggs", "Soda", "Candy", "Popcorn"],
      answer: "Eggs",
    },
    {
      question: "Which snack is usually the better source of protein?",
      options: ["Yogurt", "Lollipop", "Soda", "Gummy bears"],
      answer: "Yogurt",
    },
  ];

  return nutritionPick(templates);
}

function nutritionCreateBetterSnackQuestion() {
  const templates = [
    {
      question: "Which snack is usually the better everyday choice?",
      options: ["An apple", "A lollipop", "A soda", "A candy bar"],
      answer: "An apple",
    },
    {
      question: "Which breakfast is usually the healthiest choice?",
      options: ["Oatmeal with fruit", "A bowl of candy", "Three sodas", "A pack of gum"],
      answer: "Oatmeal with fruit",
    },
  ];

  return nutritionPick(templates);
}

function nutritionCreateServingSizeQuestion() {
  const servings = nutritionRandomChoice([2, 3, 4]);
  const caloriesPerServing = nutritionRandomChoice([90, 100, 120, 150]);
  const answer = String(servings * caloriesPerServing);

  return {
    question: `A package has ${servings} servings and ${caloriesPerServing} calories per serving. How many calories are in the whole package?`,
    options: nutritionBuildNumberOptions(answer, [answer - 60, answer - 30, answer + 30]),
    answer,
    difficulty: 1,
  };
}

function nutritionCreateLabelMathQuestion() {
  const servings = nutritionRandomChoice([2, 3, 4]);
  const sugarPerServing = nutritionRandomChoice([5, 6, 7, 8, 9]);
  const answer = String(servings * sugarPerServing);

  return {
    question: `A snack has ${sugarPerServing} grams of sugar per serving and ${servings} servings. How much sugar is that altogether?`,
    options: nutritionBuildNumberOptions(answer, [String(answer - sugarPerServing), String(answer + 2 * sugarPerServing), String(answer + 10)]),
    answer,
    difficulty: 3,
  };
}

function nutritionCreateSugarComparisonQuestion() {
  const left = nutritionRandomChoice([4, 6, 8, 10]);
  const right = left + nutritionRandomChoice([2, 3, 4]);
  return {
    question: "Which cereal is usually the better choice if you want less added sugar?",
    options: [
      `Cereal A: ${left} grams of added sugar`,
      `Cereal B: ${right} grams of added sugar`,
      "The box with more cartoons",
      "The box with the brightest colors",
    ],
    answer: `Cereal A: ${left} grams of added sugar`,
    difficulty: 3,
  };
}

function nutritionCreateFiberQuestion() {
  const templates = [
    {
      question: "Which food is a good source of fiber?",
      options: ["Beans", "Candy", "Soda", "Marshmallows"],
      answer: "Beans",
    },
    {
      question: "What does the fiber in food help with most?",
      options: ["Helping digestion", "Making food louder", "Turning food blue", "Adding bubbles"],
      answer: "Helping digestion",
    },
  ];

  return nutritionPick(templates);
}

function nutritionCreateBalancedPlateQuestion() {
  return {
    question: "On a balanced plate, about what should fill half the plate?",
    options: ["Fruits and vegetables", "Only meat", "Only dessert", "Only bread"],
    answer: "Fruits and vegetables",
    difficulty: 4,
  };
}

function nutritionCreateSodiumComparisonQuestion() {
  const sodiumA = nutritionRandomChoice([90, 100, 120, 140]);
  const sodiumB = sodiumA + nutritionRandomChoice([30, 40, 50, 60]);
  return {
    question: "Which snack has less sodium?",
    options: [
      `Snack A: ${sodiumA} milligrams per serving`,
      `Snack B: ${sodiumB} milligrams per serving`,
      "The snack with the bigger package",
      "The snack with the most sugar",
    ],
    answer: `Snack A: ${sodiumA} milligrams per serving`,
    difficulty: 5,
  };
}

function nutritionCreateTotalSugarQuestion() {
  const sugarPerServing = nutritionRandomChoice([6, 7, 8, 9, 10]);
  const servings = nutritionRandomChoice([2, 3, 4]);
  const answer = String(sugarPerServing * servings);

  return {
    question: `If a snack has ${sugarPerServing} grams of sugar per serving and you eat ${servings} servings, how much sugar do you eat?`,
    options: nutritionBuildNumberOptions(answer, [String(answer - sugarPerServing), String(answer + sugarPerServing), String(answer + 2 * sugarPerServing)]),
    answer,
    difficulty: 5,
  };
}

function nutritionBuildNumberOptions(answer, candidates) {
  const options = nutritionBuildUniqueOptions([String(answer), ...candidates.map(String)]);
  if (options.length !== 4) {
    throw new Error("Nutrition generator produced invalid options");
  }
  return nutritionShuffle(options);
}

function nutritionBuildUniqueOptions(values) {
  const unique = [];
  for (const value of values) {
    if (value && !unique.includes(value)) {
      unique.push(value);
    }
  }
  while (unique.length < 4) {
    const fallback = `About ${unique.length * 10}`;
    if (!unique.includes(fallback)) {
      unique.push(fallback);
    }
  }
  return unique.slice(0, 4);
}

function nutritionClampDifficulty(difficulty) {
  const value = Number(difficulty);
  if (!Number.isInteger(value) || value < 1) {
    return 1;
  }
  return Math.min(5, value);
}

function nutritionPick(values) {
  return nutritionRandomChoice(values);
}

function nutritionRandomChoice(values) {
  if (typeof randomChoice === "function") {
    return randomChoice(values);
  }
  return values[Math.floor(Math.random() * values.length)];
}

function nutritionShuffle(values) {
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

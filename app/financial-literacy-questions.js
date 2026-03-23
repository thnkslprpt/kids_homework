const FINANCIAL_LITERACY_QUESTIONS = [
  {
    question: "Why is saving some money helpful?",
    options: [
      "It helps you pay for something later",
      "It makes prices go down",
      "It means you never spend money",
      "It turns coins into bigger coins by magic",
    ],
    answer: "It helps you pay for something later",
    difficulty: 1,
  },
  {
    question: "You have 30 shekels and spend 10 shekels. How much money is left?",
    options: ["10 shekels", "20 shekels", "30 shekels", "40 shekels"],
    answer: "20 shekels",
    difficulty: 1,
  },
  {
    question: "Which is more like a need than a want?",
    options: ["A winter coat", "A toy robot", "Extra candy", "A new video game"],
    answer: "A winter coat",
    difficulty: 2,
  },
  {
    question: "Which is the better deal for pencils?",
    options: [
      "3 pencils for 12 shekels",
      "1 pencil for 5 shekels",
      "2 pencils for 11 shekels",
      "5 pencils for 30 shekels",
    ],
    answer: "3 pencils for 12 shekels",
    difficulty: 2,
  },
  {
    question: "You want a 90-shekel game. If you save 15 shekels each week, about how many weeks will it take?",
    options: ["4 weeks", "5 weeks", "6 weeks", "8 weeks"],
    answer: "6 weeks",
    difficulty: 3,
  },
  {
    question: "A snack costs 8 shekels each school day for 5 days. How much is that for one week of school?",
    options: ["13 shekels", "32 shekels", "40 shekels", "48 shekels"],
    answer: "40 shekels",
    difficulty: 3,
  },
  {
    question: "You have 100 shekels. A book costs 35 shekels and a puzzle costs 25 shekels. How much money is left after buying both?",
    options: ["30 shekels", "35 shekels", "40 shekels", "65 shekels"],
    answer: "40 shekels",
    difficulty: 4,
  },
  {
    question: "Which plan saves the most money after 2 months?",
    options: [
      "Save 15 shekels each week",
      "Save 50 shekels each month",
      "Save 20 shekels every 2 weeks",
      "Save 5 shekels each week",
    ],
    answer: "Save 15 shekels each week",
    difficulty: 4,
  },
  {
    question: "A toy costs 80 shekels and is 25% off. What is the sale price?",
    options: ["55 shekels", "60 shekels", "65 shekels", "70 shekels"],
    answer: "60 shekels",
    difficulty: 5,
  },
  {
    question: "Which juice is the best value?",
    options: [
      "2 liters for 20 shekels",
      "1 liter for 12 shekels",
      "500 milliliters for 8 shekels",
      "3 liters for 33 shekels",
    ],
    answer: "2 liters for 20 shekels",
    difficulty: 5,
  },
  {
    question: "If you save 10 shekels each week for 4 weeks, how much will you have saved?",
    options: ["20 shekels", "30 shekels", "40 shekels", "50 shekels"],
    answer: "40 shekels",
    difficulty: 1,
  },
  {
    question: "Which apple deal is the best value?",
    options: [
      "5 apples for 20 shekels",
      "3 apples for 15 shekels",
      "2 apples for 12 shekels",
      "6 apples for 30 shekels",
    ],
    answer: "5 apples for 20 shekels",
    difficulty: 1,
  },
  {
    question: "You have 50 shekels, earn 20 more, and then spend 35 shekels. How much money is left?",
    options: ["15 shekels", "25 shekels", "35 shekels", "45 shekels"],
    answer: "35 shekels",
    difficulty: 2,
  },
    {
      question: "Which is more like a need than a want for school lunch?",
      options: ["Toothpaste", "A video game", "A toy plane", "Extra candy"],
      answer: "Toothpaste",
      difficulty: 2,
    },
  {
    question: "You have 60 shekels. Which choice lets you spend money and still have at least 20 shekels left?",
    options: [
      "A notebook for 25 shekels and markers for 10 shekels",
      "A puzzle for 35 shekels and a ball for 25 shekels",
      "A ball for 25 shekels and a puzzle for 35 shekels",
      "A puzzle for 35 shekels and markers for 10 shekels and a notebook for 25 shekels",
    ],
    answer: "A notebook for 25 shekels and markers for 10 shekels",
    difficulty: 3,
  },
  {
    question: "A shirt costs 40 shekels and is 50% off. What is the sale price?",
    options: ["10 shekels", "20 shekels", "25 shekels", "30 shekels"],
    answer: "20 shekels",
    difficulty: 3,
  },
  {
    question: "If you save 25 shekels each month, how much will you save in 4 months?",
    options: ["50 shekels", "75 shekels", "100 shekels", "125 shekels"],
    answer: "100 shekels",
    difficulty: 4,
  },
  {
    question: "You buy 2 notebooks that cost 18 shekels each. How much change should you get from 50 shekels?",
    options: ["12 shekels", "14 shekels", "16 shekels", "18 shekels"],
    answer: "14 shekels",
    difficulty: 4,
  },
  {
    question: "Which yogurt deal is the best value?",
    options: [
      "4 yogurts for 24 shekels",
      "3 yogurts for 21 shekels",
      "2 yogurts for 18 shekels",
      "5 yogurts for 40 shekels",
    ],
    answer: "4 yogurts for 24 shekels",
    difficulty: 5,
  },
  {
    question: "A jacket costs 120 shekels and is 25% off. What is the sale price?",
    options: ["80 shekels", "90 shekels", "95 shekels", "100 shekels"],
    answer: "90 shekels",
    difficulty: 5,
  },
];

FINANCIAL_LITERACY_QUESTIONS.push(
  ...[
    {
      question: "You have 25 shekels and get 15 more. How much money do you have now?",
      options: ["30 shekels", "35 shekels", "40 shekels", "45 shekels"],
      answer: "40 shekels",
      difficulty: 1,
    },
    {
      question: "Which pencil pack has the lower price per pencil?",
      options: [
        "4 pencils for 16 shekels",
        "2 pencils for 10 shekels",
        "1 pencil for 6 shekels",
        "5 pencils for 25 shekels",
      ],
      answer: "4 pencils for 16 shekels",
      difficulty: 1,
    },
    {
      question: "Why is it useful to compare prices before buying?",
      options: [
        "You can choose the better value",
        "It makes the items free",
        "It changes the color of the product",
        "It makes every store the same",
      ],
      answer: "You can choose the better value",
      difficulty: 1,
    },
    {
      question: "If you spend less than you earn, what usually happens to the money you save?",
      options: ["They grow", "They disappear", "They turn into points", "They always stay zero"],
      answer: "They grow",
      difficulty: 1,
    },
    {
      question: "You have 70 shekels. You spend 22 shekels on lunch and 18 shekels on a game. How much is left?",
      options: ["20 shekels", "25 shekels", "30 shekels", "35 shekels"],
      answer: "30 shekels",
      difficulty: 2,
    },
    {
      question: "Which is the best deal for rulers?",
      options: [
        "3 rulers for 24 shekels",
        "2 rulers for 18 shekels",
        "1 ruler for 10 shekels",
        "5 rulers for 45 shekels",
      ],
      answer: "3 rulers for 24 shekels",
      difficulty: 2,
    },
    {
      question: "What is a budget?",
      options: [
        "A plan for how to use money",
        "A kind of toy",
        "A type of banknote only",
        "A way to make prices vanish",
      ],
      answer: "A plan for how to use money",
      difficulty: 2,
    },
    {
      question: "You save 12 shekels each week. About how much will you save in 5 weeks?",
      options: ["36 shekels", "48 shekels", "60 shekels", "72 shekels"],
      answer: "60 shekels",
      difficulty: 2,
    },
    {
      question: "A toy costs 96 shekels. If you save 12 shekels each week, about how many weeks will it take to save enough?",
      options: ["6 weeks", "7 weeks", "8 weeks", "9 weeks"],
      answer: "8 weeks",
      difficulty: 3,
    },
    {
      question: "A bus card costs 18 shekels and a snack costs 9 shekels. How much do 2 bus cards and 1 snack cost altogether?",
      options: ["36 shekels", "45 shekels", "54 shekels", "63 shekels"],
      answer: "45 shekels",
      difficulty: 3,
    },
    {
      question: "Which plan saves the most in 3 months?",
      options: [
        "Save 20 shekels each month",
        "Save 10 shekels each week",
        "Save 15 shekels every 2 weeks",
        "Save 5 shekels each week",
      ],
      answer: "Save 10 shekels each week",
      difficulty: 3,
    },
    {
      question: "A water bottle costs 24 shekels and is 50% off. What is the sale price?",
      options: ["10 shekels", "12 shekels", "14 shekels", "16 shekels"],
      answer: "12 shekels",
      difficulty: 3,
    },
    {
      question: "You have 150 shekels. You buy shoes for 65 shekels and socks for 25 shekels. How much money is left?",
      options: ["50 shekels", "55 shekels", "60 shekels", "65 shekels"],
      answer: "60 shekels",
      difficulty: 4,
    },
    {
      question: "Which cereal is the best value?",
      options: [
        "500 grams for 20 shekels",
        "300 grams for 15 shekels",
        "250 grams for 14 shekels",
        "750 grams for 33 shekels",
      ],
      answer: "500 grams for 20 shekels",
      difficulty: 4,
    },
    {
      question: "You want something that costs 140 shekels. If you already saved 50 shekels, how much more do you need?",
      options: ["80 shekels", "90 shekels", "100 shekels", "110 shekels"],
      answer: "90 shekels",
      difficulty: 4,
    },
    {
      question: "A notebook costs 50 shekels and is 20% off. What is the sale price?",
      options: ["30 shekels", "35 shekels", "40 shekels", "45 shekels"],
      answer: "40 shekels",
      difficulty: 4,
    },
    {
      question: "Which milk deal is the best value?",
      options: [
        "2 liters for 18 shekels",
        "1 liter for 10 shekels",
        "3 liters for 30 shekels",
        "500 milliliters for 6 shekels",
      ],
      answer: "2 liters for 18 shekels",
      difficulty: 5,
    },
    {
      question: "A bike costs 240 shekels and is 10% off. What is the sale price?",
      options: ["200 shekels", "210 shekels", "216 shekels", "220 shekels"],
      answer: "216 shekels",
      difficulty: 5,
    },
    {
      question: "You have 200 shekels. You buy 3 games that each cost 45 shekels. How much money is left?",
      options: ["55 shekels", "60 shekels", "65 shekels", "70 shekels"],
      answer: "65 shekels",
      difficulty: 5,
    },
    {
      question: "If you save 18 shekels each week for 10 weeks, how much will you have saved?",
      options: ["160 shekels", "170 shekels", "180 shekels", "190 shekels"],
      answer: "180 shekels",
      difficulty: 5,
    },
    {
      question: "You have 18 shekels and get 9 more. How much money do you have now?",
      options: ["24 shekels", "26 shekels", "27 shekels", "29 shekels"],
      answer: "27 shekels",
      difficulty: 1,
    },
    {
      question: "Which is the better deal for crayons?",
      options: [
        "4 crayons for 12 shekels",
        "2 crayons for 8 shekels",
        "3 crayons for 10 shekels",
        "5 crayons for 18 shekels",
      ],
      answer: "4 crayons for 12 shekels",
      difficulty: 1,
    },
    {
      question: "Why is it smart to compare prices before buying?",
      options: [
        "You can choose the better value",
        "It makes items free",
        "It always makes the box bigger",
        "It changes the store name",
      ],
      answer: "You can choose the better value",
      difficulty: 1,
    },
    {
      question: "You have 20 shekels, earn 10 more, and spend 4. How much is left?",
      options: ["22 shekels", "24 shekels", "26 shekels", "28 shekels"],
      answer: "26 shekels",
      difficulty: 1,
    },
    {
      question: "Which is more like a need than a want when packing for school?",
      options: ["Water", "A game console", "A toy drone", "Extra stickers"],
      answer: "Water",
      difficulty: 1,
    },
    {
      question: "You save 5 shekels each week for 6 weeks. How much do you save?",
      options: ["20 shekels", "25 shekels", "30 shekels", "35 shekels"],
      answer: "30 shekels",
      difficulty: 1,
    },
    {
      question: "Which snack deal is the best value?",
      options: [
        "6 snacks for 18 shekels",
        "3 snacks for 10 shekels",
        "4 snacks for 15 shekels",
        "5 snacks for 16 shekels",
      ],
      answer: "6 snacks for 18 shekels",
      difficulty: 1,
    },
    {
      question: "If you spend less than you earn, what usually happens to the cash you keep?",
      options: ["They grow", "They disappear", "They turn into tickets", "They always stay the same"],
      answer: "They grow",
      difficulty: 1,
    },
    {
      question: "What is a simple budget?",
      options: [
        "A plan for how to use money",
        "A kind of sticker",
        "A type of snack",
        "A machine that prints coins",
      ],
      answer: "A plan for how to use money",
      difficulty: 2,
    },
    {
      question: "You have 70 shekels and spend 22 on a book and 18 on a game. How much is left?",
      options: ["20 shekels", "25 shekels", "30 shekels", "35 shekels"],
      answer: "30 shekels",
      difficulty: 2,
    },
    {
      question: "Which notebook deal is the best value?",
      options: [
        "3 notebooks for 18 shekels",
        "2 notebooks for 13 shekels",
        "4 notebooks for 28 shekels",
        "5 notebooks for 40 shekels",
      ],
      answer: "3 notebooks for 18 shekels",
      difficulty: 2,
    },
    {
      question: "If you save 8 shekels each week for 4 weeks, how much will you save?",
      options: ["24 shekels", "28 shekels", "32 shekels", "36 shekels"],
      answer: "32 shekels",
      difficulty: 2,
    },
    {
      question: "You want something that costs 60 shekels. You already have 35 shekels. How much more do you need?",
      options: ["20 shekels", "25 shekels", "30 shekels", "35 shekels"],
      answer: "25 shekels",
      difficulty: 2,
    },
    {
      question: "Which is more like a need than a want for a morning routine?",
      options: ["Toothpaste", "A video game", "A toy plane", "Extra candy"],
      answer: "Toothpaste",
      difficulty: 2,
    },
    {
      question: "You have 90 shekels. Buy lunch for 24 shekels and juice for 11 shekels. How much is left?",
      options: ["45 shekels", "50 shekels", "55 shekels", "60 shekels"],
      answer: "55 shekels",
      difficulty: 2,
    },
    {
      question: "Which toy deal is the best value?",
      options: [
        "2 toys for 10 shekels",
        "3 toys for 15 shekels",
        "4 toys for 18 shekels",
        "5 toys for 30 shekels",
      ],
      answer: "4 toys for 18 shekels",
      difficulty: 2,
    },
    {
      question: "If you save 12 shekels each week for 3 weeks, how much will you save?",
      options: ["24 shekels", "30 shekels", "36 shekels", "42 shekels"],
      answer: "36 shekels",
      difficulty: 3,
    },
    {
      question: "A shirt costs 50 shekels and is 50% off. What is the sale price?",
      options: ["20 shekels", "25 shekels", "30 shekels", "35 shekels"],
      answer: "25 shekels",
      difficulty: 3,
    },
    {
      question: "You have 120 shekels. Buy books for 35 shekels and markers for 28 shekels. How much money is left?",
      options: ["47 shekels", "52 shekels", "57 shekels", "62 shekels"],
      answer: "57 shekels",
      difficulty: 3,
    },
    {
      question: "Which plan saves the most in 2 months?",
      options: [
        "Save 20 shekels each month",
        "Save 10 shekels each week",
        "Save 15 shekels every 2 weeks",
        "Save 5 shekels each week",
      ],
      answer: "Save 10 shekels each week",
      difficulty: 3,
    },
    {
      question: "A game costs 80 shekels and is 25% off. What is the sale price?",
      options: ["50 shekels", "55 shekels", "60 shekels", "65 shekels"],
      answer: "60 shekels",
      difficulty: 3,
    },
    {
      question: "You buy 3 sandwiches that cost 14 shekels each. How much do they cost altogether?",
      options: ["34 shekels", "38 shekels", "42 shekels", "46 shekels"],
      answer: "42 shekels",
      difficulty: 3,
    },
    {
      question: "Which juice deal is the best value?",
      options: [
        "2 liters for 16 shekels",
        "1 liter for 10 shekels",
        "500 milliliters for 7 shekels",
        "3 liters for 27 shekels",
      ],
      answer: "2 liters for 16 shekels",
      difficulty: 3,
    },
    {
      question: "If you save 15 shekels each week for 5 weeks, how much will you save?",
      options: ["60 shekels", "65 shekels", "70 shekels", "75 shekels"],
      answer: "75 shekels",
      difficulty: 3,
    },
    {
      question: "You have 150 shekels. Buy a backpack for 65 shekels and a pencil case for 18 shekels. How much is left?",
      options: ["57 shekels", "62 shekels", "67 shekels", "72 shekels"],
      answer: "67 shekels",
      difficulty: 4,
    },
    {
      question: "Which cereal deal is the best value?",
      options: [
        "500 grams for 20 shekels",
        "300 grams for 13 shekels",
        "250 grams for 12 shekels",
        "750 grams for 36 shekels",
      ],
      answer: "500 grams for 20 shekels",
      difficulty: 4,
    },
    {
      question: "A shirt costs 96 shekels. If you save 16 shekels each week, how many weeks will it take?",
      options: ["4 weeks", "5 weeks", "6 weeks", "7 weeks"],
      answer: "6 weeks",
      difficulty: 4,
    },
    {
      question: "Which plan saves the most in 8 weeks?",
      options: [
        "Save 30 shekels each month",
        "Save 12 shekels each week",
        "Save 40 shekels every 2 weeks",
        "Save 8 shekels each week",
      ],
      answer: "Save 40 shekels every 2 weeks",
      difficulty: 4,
    },
    {
      question: "A jacket costs 120 shekels and is 20% off. What is the sale price?",
      options: ["90 shekels", "96 shekels", "100 shekels", "104 shekels"],
      answer: "96 shekels",
      difficulty: 4,
    },
    {
      question: "You have 80 shekels. Buy 2 notebooks at 19 shekels each and a ruler for 7 shekels. How much is left?",
      options: ["29 shekels", "33 shekels", "35 shekels", "39 shekels"],
      answer: "35 shekels",
      difficulty: 4,
    },
    {
      question: "Which water bottle deal is the best value?",
      options: [
        "1 liter for 9 shekels",
        "2 liters for 17 shekels",
        "500 milliliters for 5 shekels",
        "3 liters for 30 shekels",
      ],
      answer: "2 liters for 17 shekels",
      difficulty: 5,
    },
    {
      question: "A bike costs 180 shekels and is 10% off. What is the sale price?",
      options: ["150 shekels", "160 shekels", "162 shekels", "170 shekels"],
      answer: "162 shekels",
      difficulty: 5,
    },
    {
      question: "You have 200 shekels and buy 3 games that cost 35 shekels each. How much money is left?",
      options: ["85 shekels", "90 shekels", "95 shekels", "100 shekels"],
      answer: "95 shekels",
      difficulty: 5,
    },
    {
      question: "Which yogurt pack is the best value?",
      options: [
        "4 yogurts for 18 shekels",
        "3 yogurts for 15 shekels",
        "6 yogurts for 24 shekels",
        "5 yogurts for 23 shekels",
      ],
      answer: "6 yogurts for 24 shekels",
      difficulty: 5,
    },
    {
      question: "If you save 18 shekels each week for 10 weeks, how much will you save?",
      options: ["160 shekels", "170 shekels", "180 shekels", "190 shekels"],
      answer: "180 shekels",
      difficulty: 5,
    },
    {
      question: "A backpack costs 60 shekels and is 20% off. What is the sale price?",
      options: ["36 shekels", "42 shekels", "48 shekels", "54 shekels"],
      answer: "48 shekels",
      difficulty: 4,
    },
    {
      question: "Which fruit deal is the best value?",
      options: [
        "4 apples for 14 shekels",
        "5 apples for 20 shekels",
        "3 apples for 10 shekels",
        "6 apples for 27 shekels",
      ],
      answer: "3 apples for 10 shekels",
      difficulty: 1,
    },
    {
      question: "You have 25 shekels and get 18 more. How much money do you have now?",
      options: ["35 shekels", "40 shekels", "43 shekels", "45 shekels"],
      answer: "43 shekels",
      difficulty: 1,
    },
    {
      question: "You have 70 shekels. You spend 16 shekels on lunch and 13 shekels on juice. How much is left?",
      options: ["39 shekels", "40 shekels", "41 shekels", "42 shekels"],
      answer: "41 shekels",
      difficulty: 2,
    },
  {
    question: "Which is the best deal for erasers?",
    options: [
      "3 erasers for 24 shekels",
      "2 erasers for 18 shekels",
        "1 eraser for 10 shekels",
        "5 erasers for 45 shekels",
      ],
      answer: "3 erasers for 24 shekels",
      difficulty: 2,
    },
  ]
);

const FINANCIAL_NEEDS = [
  "a winter coat",
  "school shoes",
  "toothpaste",
  "soap",
  "a backpack",
  "a lunch box",
  "a bus card",
];

const FINANCIAL_WANTS = [
  "a toy robot",
  "extra candy",
  "a game card",
  "a plush toy",
  "a poster",
  "a sticker pack",
];

const FINANCIAL_VALUE_ITEMS = [
  "pencils",
  "apples",
  "erasers",
  "stickers",
  "notebooks",
  "yogurts",
  "juice boxes",
];

const FINANCIAL_PURCHASE_TEMPLATES = [
  {
    items: ["a notebook", "markers"],
    prices: [18, 12],
  },
  {
    items: ["a book", "a puzzle"],
    prices: [20, 15],
  },
  {
    items: ["a lunch box", "a water bottle", "stickers"],
    prices: [15, 10, 8],
  },
  {
    items: ["pencils", "erasers", "stickers"],
    prices: [12, 8, 10],
  },
  {
    items: ["a ball", "a snack"],
    prices: [24, 11],
  },
];

function createFinancialLiteracyGeneratedEntry(difficulty) {
  const generatorsByDifficulty = {
    1: [
      createFinancialNeedWantQuestion,
      createFinancialSavingsQuestion,
      createFinancialSpendingQuestion,
      createFinancialBestValueQuestion,
    ],
    2: [
      createFinancialNeedWantQuestion,
      createFinancialSavingsQuestion,
      createFinancialSpendingQuestion,
      createFinancialBestValueQuestion,
    ],
    3: [
      createFinancialSavingsQuestion,
      createFinancialSpendingQuestion,
      createFinancialBestValueQuestion,
      createFinancialDiscountQuestion,
    ],
    4: [
      createFinancialSpendingQuestion,
      createFinancialBestValueQuestion,
      createFinancialDiscountQuestion,
      createFinancialPlanComparisonQuestion,
    ],
    5: [
      createFinancialBestValueQuestion,
      createFinancialDiscountQuestion,
      createFinancialPlanComparisonQuestion,
      createFinancialSpendingQuestion,
    ],
  };

  const generators = generatorsByDifficulty[difficulty] || generatorsByDifficulty[3];
  return randomChoice(generators)(difficulty);
}

function createFinancialNeedWantQuestion(difficulty) {
  const answer = randomChoice(FINANCIAL_NEEDS);
  const distractors = shuffleArray([...FINANCIAL_WANTS]).slice(0, 3);

  return {
    question: randomChoice([
      "Which is more like a need than a want?",
      "Which item is a need, not a want?",
      "Which thing is something you really need?",
    ]),
    options: shuffleArray([answer, ...distractors]),
    answer,
    difficulty,
  };
}

function createFinancialSavingsQuestion(difficulty) {
  const weekly = randomChoice(
    difficulty >= 4 ? [8, 10, 12, 15, 18, 20] : [5, 6, 8, 10, 12, 15]
  );
  const weeks = randomChoice(difficulty <= 2 ? [2, 3, 4] : difficulty === 3 ? [4, 5, 6] : [4, 6, 8]);
  const answerValue = weekly * weeks;

  return {
    question: `If you save ${formatShekels(weekly)} each week for ${weeks} weeks, how much will you save?`,
    options: buildFinancialOptions(
      formatShekels(answerValue),
      makeMoneyDistractors(answerValue, [weekly, weeks, weekly + weeks, weekly * 2])
    ),
    answer: formatShekels(answerValue),
    difficulty,
  };
}

function createFinancialSpendingQuestion(difficulty) {
  const template = randomChoice(FINANCIAL_PURCHASE_TEMPLATES);
  const reserve = randomChoice(difficulty >= 4 ? [12, 15, 18, 20, 25] : [10, 12, 15, 18, 20]);
  const totalSpent = template.prices.reduce((sum, price) => sum + price, 0);
  const totalMoney = totalSpent + reserve;
  const purchases = template.items
    .map((item, index) => `${item} for ${formatShekels(template.prices[index])}`)
    .join(" and ");

  return {
    question: `You have ${formatShekels(totalMoney)}. You buy ${purchases}. How much money is left?`,
    options: buildFinancialOptions(
      formatShekels(reserve),
      makeMoneyDistractors(reserve, [5, 10, 15, 20])
    ),
    answer: formatShekels(reserve),
    difficulty,
  };
}

function createFinancialBestValueQuestion(difficulty) {
  const item = randomChoice(FINANCIAL_VALUE_ITEMS);
  const counts = shuffleArray([2, 3, 4, 5]);
  const unitPrices = shuffleArray(
    difficulty >= 4 ? [4, 5, 6, 7] : difficulty === 3 ? [3, 4, 5, 6] : [2, 3, 4, 5]
  );
  const packs = counts.map((count, index) => {
    const unitPrice = unitPrices[index];
    const totalPrice = count * unitPrice;

    return {
      text: `${count} ${item} for ${formatShekels(totalPrice)}`,
      unitPrice,
    };
  });

  const answerPack = packs.reduce((best, pack) => (pack.unitPrice < best.unitPrice ? pack : best));

  return {
    question: `Which ${item} deal is the best value?`,
    options: shuffleArray(packs.map((pack) => pack.text)),
    answer: answerPack.text,
    difficulty,
  };
}

function createFinancialDiscountQuestion(difficulty) {
  const discount = randomChoice(difficulty >= 4 ? [25, 50] : [25, 50]);
  const originalPrice = randomChoice(
    discount === 50 ? [20, 30, 40, 60, 80, 100, 120] : [40, 60, 80, 100, 120, 160]
  );
  const answerValue = (originalPrice * (100 - discount)) / 100;

  return {
    question: `A toy costs ${formatShekels(originalPrice)} and is ${discount}% off. What is the sale price?`,
    options: buildFinancialOptions(
      formatShekels(answerValue),
      makeMoneyDistractors(answerValue, [5, 10, 15, -5])
    ),
    answer: formatShekels(answerValue),
    difficulty,
  };
}

function createFinancialPlanComparisonQuestion(difficulty) {
  const answerWeekly = randomChoice([10, 12, 15, 18]);
  const lowerWeekly = Math.max(5, answerWeekly - randomChoice([2, 3, 4]));
  const everyTwoWeeks = Math.max(6, answerWeekly + randomChoice([2, 3, 4]));
  const monthly = Math.max(8, answerWeekly * 2 - randomChoice([1, 2, 3, 4]));
  const plans = [
    { text: `Save ${answerWeekly} shekels each week`, total: answerWeekly * 4 },
    { text: `Save ${lowerWeekly} shekels each week`, total: lowerWeekly * 4 },
    { text: `Save ${everyTwoWeeks} shekels every 2 weeks`, total: everyTwoWeeks * 2 },
    { text: `Save ${monthly} shekels each month`, total: monthly },
  ];
  const answerPlan = plans.reduce((best, plan) => (plan.total > best.total ? plan : best));

  return {
    question: "Which plan saves the most after 4 weeks?",
    options: shuffleArray(plans.map((plan) => plan.text)),
    answer: answerPlan.text,
    difficulty,
  };
}

function buildFinancialOptions(answer, distractors) {
  const options = [answer, ...distractors].map(String);
  const uniqueOptions = [];

  for (const option of options) {
    if (option && !uniqueOptions.includes(option)) {
      uniqueOptions.push(option);
    }
  }

  if (uniqueOptions.length !== 4) {
    throw new Error("Financial generator produced invalid options");
  }

  return shuffleArray(uniqueOptions);
}

function makeMoneyDistractors(answerValue, preferredOffsets) {
  const answer = formatShekels(answerValue);
  const offsets = [...preferredOffsets, -10, -5, 5, 10, 12, 15, 20];
  const distractors = [];

  for (const offset of offsets) {
    const candidateValue = answerValue + offset;
    const candidate = formatShekels(candidateValue);
    if (candidateValue > 0 && candidate !== answer && !distractors.includes(candidate)) {
      distractors.push(candidate);
    }

    if (distractors.length === 3) {
      break;
    }
  }

  return distractors;
}

function formatShekels(value) {
  return `${value} ${value === 1 ? "shekel" : "shekels"}`;
}

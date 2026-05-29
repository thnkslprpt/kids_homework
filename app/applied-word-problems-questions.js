const APPLIED_WORD_PROBLEMS_QUESTIONS = [
  // Level 1: single-step addition, subtraction, groups, time, and money.
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
    question: "How many crayons are there?",
    displayText: "There are 5 blue crayons and 6 green crayons in a box.",
    options: ["9 crayons", "10 crayons", "11 crayons", "12 crayons"],
    answer: "11 crayons",
    difficulty: 1,
  },
  {
    question: "How many pages are left to read?",
    displayText: "A short book has 18 pages. Dan reads 8 pages.",
    options: ["8 pages", "9 pages", "10 pages", "12 pages"],
    answer: "10 pages",
    difficulty: 1,
  },

  // Level 2: two related steps with smaller numbers.
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
    question: "How many seats are filled?",
    displayText: "There are 4 rows with 5 students in each row. One more student sits in the front.",
    options: ["19 seats", "20 seats", "21 seats", "24 seats"],
    answer: "21 seats",
    difficulty: 2,
  },
  {
    question: "How many minutes are left?",
    displayText: "A class has 60 minutes for art. They paint for 25 minutes and clean up for 10 minutes.",
    options: ["20 minutes", "25 minutes", "30 minutes", "35 minutes"],
    answer: "25 minutes",
    difficulty: 2,
  },

  // Level 3: two-step stories with multiplication, time, and simple fractions.
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
    question: "How many pencils are left?",
    displayText: "A teacher has 5 packs with 6 pencils in each pack. She gives away 9 pencils.",
    options: ["18 pencils", "20 pencils", "21 pencils", "24 pencils"],
    answer: "21 pencils",
    difficulty: 3,
  },
  {
    question: "What is the total weight?",
    displayText: "One bag weighs 4 kilograms. Another bag weighs 3 kilograms. A small box weighs 2 kilograms.",
    options: ["7 kilograms", "8 kilograms", "9 kilograms", "10 kilograms"],
    answer: "9 kilograms",
    difficulty: 3,
  },

  // Level 4: multi-step totals, tables, and comparisons.
  {
    question: "How many people chose soccer?",
    displayText: "",
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
    displayText: "",
    options: [
      "Read 20 minutes and then 15 minutes",
      "Read 25 minutes and then 8 minutes",
      "Read 10 minutes and then 24 minutes",
      "Read 18 minutes and then 17 minutes",
    ],
    answer: "Read 25 minutes and then 8 minutes",
    difficulty: 4,
  },
  {
    question: "How many more points did Team A score than Team C?",
    displayText: "",
    visualHtml: buildAppliedWordProblemTable("Game scores", [
      ["Team", "Points"],
      ["A", "36"],
      ["B", "29"],
      ["C", "24"],
    ]),
    options: ["8 points", "10 points", "12 points", "14 points"],
    answer: "12 points",
    difficulty: 4,
  },
  {
    question: "How many bottles are needed?",
    displayText: "A cooler needs 18 liters of water. Each bottle holds 3 liters.",
    options: ["4 bottles", "5 bottles", "6 bottles", "7 bottles"],
    answer: "6 bottles",
    difficulty: 4,
  },

  // Level 5: decimals, fractions, unit prices, and multi-step arithmetic.
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
    displayText: "",
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
  {
    question: "Which is the better deal?",
    displayText: "Compare 4 notebooks for 28 shekels with 3 notebooks for 24 shekels.",
    options: [
      "4 notebooks for 28 shekels",
      "3 notebooks for 24 shekels",
      "They cost the same per notebook",
      "There is not enough information",
    ],
    answer: "4 notebooks for 28 shekels",
    difficulty: 5,
  },
  {
    question: "How many cups of sugar are needed?",
    displayText: "One cake needs 3/4 cup of sugar. Mira bakes 2 cakes.",
    options: ["1 cup", "1 1/4 cups", "1 1/2 cups", "2 cups"],
    answer: "1 1/2 cups",
    difficulty: 5,
  },

  // Level 6: rates, averages, scaling, and clearer distractors.
  {
    question: "How many kilometers are left?",
    displayText: "A hike is 18 kilometers long. The group walks 4.5 kilometers before lunch and 6.5 kilometers after lunch.",
    options: ["5 kilometers", "6 kilometers", "7 kilometers", "8 kilometers"],
    answer: "7 kilometers",
    difficulty: 6,
  },
  {
    question: "What is the average number of pages read per day?",
    displayText: "Rafi reads 12 pages on Monday, 18 pages on Tuesday, and 15 pages on Wednesday.",
    options: ["13 pages", "14 pages", "15 pages", "18 pages"],
    answer: "15 pages",
    difficulty: 6,
  },
  {
    question: "How many packets should be bought?",
    displayText: "A party needs 54 cups. Cups come in packets of 9.",
    options: ["5 packets", "6 packets", "7 packets", "9 packets"],
    answer: "6 packets",
    difficulty: 6,
  },
  {
    question: "How much money is left after saving and spending?",
    displayText: "Avi has 180 shekels. He saves 1/3 of it, then spends 45 shekels from the rest.",
    options: ["60 shekels", "75 shekels", "85 shekels", "95 shekels"],
    answer: "75 shekels",
    difficulty: 6,
  },
  {
    question: "How many minutes did the bus take on average?",
    displayText: "",
    visualHtml: buildAppliedWordProblemTable("Bus times", [
      ["Day", "Minutes"],
      ["Monday", "28"],
      ["Tuesday", "32"],
      ["Wednesday", "30"],
    ]),
    options: ["28 minutes", "29 minutes", "30 minutes", "32 minutes"],
    answer: "30 minutes",
    difficulty: 6,
  },
  {
    question: "What is the perimeter of the garden?",
    displayText: "A rectangular garden is 9 meters long and 5 meters wide.",
    options: ["14 meters", "28 meters", "45 meters", "56 meters"],
    answer: "28 meters",
    difficulty: 6,
  },

  // Level 7: percent, proportional reasoning, mixed quantities, and elapsed time.
  {
    question: "What is the sale price?",
    displayText: "A jacket costs 160 shekels and is on sale for 25% off.",
    options: ["100 shekels", "120 shekels", "135 shekels", "140 shekels"],
    answer: "120 shekels",
    difficulty: 7,
  },
  {
    question: "How many milliliters of concentrate are needed?",
    displayText: "Juice mix uses 1 part concentrate to 4 parts water. A pitcher has 1,000 mL total.",
    options: ["100 mL", "200 mL", "250 mL", "400 mL"],
    answer: "200 mL",
    difficulty: 7,
  },
  {
    question: "What time does the class end?",
    displayText: "A workshop starts at 9:35. It has two 45-minute lessons and a 20-minute break between them.",
    options: ["10:55", "11:15", "11:25", "11:45"],
    answer: "11:25",
    difficulty: 7,
  },
  {
    question: "Which option has the lowest cost per marker?",
    displayText: "",
    displayText: "",
    options: [
      "6 markers for 30 shekels",
      "8 markers for 44 shekels",
      "10 markers for 60 shekels",
      "12 markers for 78 shekels",
    ],
    answer: "6 markers for 30 shekels",
    difficulty: 7,
  },
  {
    question: "How many students are in the club?",
    displayText: "In a club, 3/5 of the students are girls. There are 18 girls.",
    options: ["24 students", "27 students", "30 students", "36 students"],
    answer: "30 students",
    difficulty: 7,
  },
  {
    question: "How much did the plant grow in total?",
    displayText: "",
    visualHtml: buildAppliedWordProblemTable("Plant height", [
      ["Week", "Height"],
      ["1", "12 cm"],
      ["2", "18 cm"],
      ["3", "27 cm"],
    ]),
    options: ["9 cm", "12 cm", "15 cm", "27 cm"],
    answer: "15 cm",
    difficulty: 7,
  },

  // Level 8: multi-stage proportional and financial reasoning.
  {
    question: "How much will 9 notebooks cost?",
    displayText: "A store sells 3 notebooks for 21 shekels. The price per notebook stays the same.",
    options: ["54 shekels", "60 shekels", "63 shekels", "72 shekels"],
    answer: "63 shekels",
    difficulty: 8,
  },
  {
    question: "How many pages are left after two reading sessions?",
    displayText: "A book has 240 pages. Leila reads 25% of the book on Monday and 1/3 of the book on Tuesday.",
    options: ["80 pages", "90 pages", "100 pages", "120 pages"],
    answer: "100 pages",
    difficulty: 8,
  },
  {
    question: "How much does one large bottle cost?",
    displayText: "Four small bottles cost 28 shekels. A large bottle costs twice as much as a small bottle.",
    options: ["7 shekels", "12 shekels", "14 shekels", "16 shekels"],
    answer: "14 shekels",
    difficulty: 8,
  },
  {
    question: "What is the total distance?",
    displayText: "A runner completes 3 laps of 1.2 km, then runs another 850 meters.",
    options: ["3.65 km", "4.25 km", "4.45 km", "5.10 km"],
    answer: "4.45 km",
    difficulty: 8,
  },
  {
    question: "How many boxes are needed?",
    displayText: "A charity packs 148 cans. Each box holds 12 cans. Every can must be packed.",
    options: ["11 boxes", "12 boxes", "13 boxes", "14 boxes"],
    answer: "13 boxes",
    difficulty: 8,
  },
  {
    question: "How much profit was made?",
    displayText: "A class buys supplies for 95 shekels and sells 24 bracelets for 8 shekels each.",
    options: ["87 shekels", "95 shekels", "97 shekels", "192 shekels"],
    answer: "97 shekels",
    difficulty: 8,
  },

  // Level 9: constraints, inverse reasoning, and percent change.
  {
    question: "How many adult tickets were sold?",
    displayText: "A theater sold 40 tickets. Child tickets were 15, and the rest were adult tickets.",
    options: ["15 adult tickets", "20 adult tickets", "25 adult tickets", "30 adult tickets"],
    answer: "25 adult tickets",
    difficulty: 9,
  },
  {
    question: "What was the original price?",
    displayText: "After a 20% discount, a backpack costs 96 shekels.",
    options: ["100 shekels", "112 shekels", "120 shekels", "124 shekels"],
    answer: "120 shekels",
    difficulty: 9,
  },
  {
    question: "How many students chose robotics?",
    displayText: "",
    visualHtml: buildAppliedWordProblemTable("Club choices", [
      ["Club", "Students"],
      ["Art", "18"],
      ["Chess", "24"],
      ["Robotics", "?"],
      ["Total", "70"],
    ]),
    options: ["24 students", "26 students", "28 students", "30 students"],
    answer: "28 students",
    difficulty: 9,
  },
  {
    question: "How many medium boxes are needed?",
    displayText: "A moving van has 96 books. Large boxes hold 18 books. After filling 4 large boxes, the rest go into medium boxes that hold 8 books each.",
    options: ["2 medium boxes", "3 medium boxes", "4 medium boxes", "5 medium boxes"],
    answer: "3 medium boxes",
    difficulty: 9,
  },
  {
    question: "What is the weighted average score?",
    displayText: "A project grade is 60% design and 40% presentation. The design score is 90 and the presentation score is 75.",
    options: ["81", "84", "85", "87"],
    answer: "84",
    difficulty: 9,
  },
  {
    question: "How many kilometers per hour did the cyclist average?",
    displayText: "A cyclist rides 36 kilometers in 1.5 hours.",
    options: ["18 km/h", "21 km/h", "24 km/h", "27 km/h"],
    answer: "24 km/h",
    difficulty: 9,
  },

  // Level 10: multi-constraint optimization and algebra-like word problems.
  {
    question: "Which plan is cheapest?",
    displayText: "Plan A costs 40 shekels plus 6 shekels per class. Plan B costs 25 shekels plus 8 shekels per class. The student takes 10 classes.",
    options: ["Plan A costs 100 shekels", "Plan B costs 105 shekels", "Plan A is cheaper", "Plan B is cheaper"],
    answer: "Plan A is cheaper",
    difficulty: 10,
  },
  {
    question: "How many small jars were filled?",
    displayText: "A cook has 5 liters of sauce. She fills 6 large jars of 500 mL each, then uses the rest for small 250 mL jars.",
    options: ["6 small jars", "7 small jars", "8 small jars", "10 small jars"],
    answer: "8 small jars",
    difficulty: 10,
  },
  {
    question: "What is the missing side length?",
    displayText: "A rectangle has a perimeter of 54 cm. One side is 18 cm long.",
    options: ["7 cm", "8 cm", "9 cm", "10 cm"],
    answer: "9 cm",
    difficulty: 10,
  },
  {
    question: "How many tables are needed?",
    displayText: "A dinner has 86 guests. Each table seats 8 people. Two tables are reserved for supplies and cannot seat guests.",
    options: ["11 tables", "12 tables", "13 tables", "14 tables"],
    answer: "13 tables",
    difficulty: 10,
  },
  {
    question: "How many blue beads are in the final necklace?",
    displayText: "A necklace starts with red and blue beads in a 2:3 ratio, 40 beads total. Then 6 more blue beads are added.",
    options: ["18 blue beads", "24 blue beads", "30 blue beads", "32 blue beads"],
    answer: "30 blue beads",
    difficulty: 10,
  },
  {
    question: "What is the final balance?",
    displayText: "A club starts with 500 shekels, spends 35% on equipment, earns 120 shekels from tickets, and then pays 45 shekels for cleaning.",
    options: ["375 shekels", "390 shekels", "400 shekels", "425 shekels"],
    answer: "400 shekels",
    difficulty: 10,
  },
];

function createAppliedWordProblemGeneratedEntry(difficulty) {
  const level = clampAppliedWordProblemDifficulty(difficulty);
  const generatorsByLevel = {
    1: [createMoneyStoryQuestion, createGroupingQuestion, appliedCreateElapsedTimeQuestion],
    2: [createMoneyStoryQuestion, createGroupingQuestion, createSimpleLeftoverTimeQuestion, createFractionStoryQuestion],
    3: [createTwoStepStoryQuestion, createMeasurementStoryQuestion, createEqualGroupsWithLeftoverQuestion],
    4: [createTableQuestion, createMultiStepMoneyQuestion, createUnitConversionQuestion],
    5: [createMultiStepMoneyQuestion, createFractionStoryQuestion, appliedCreateUnitPriceQuestion, createRecipeScalingQuestion],
    6: [appliedCreateAverageQuestion, appliedCreatePerimeterQuestion, createFractionOfTotalQuestion, createPackageCountQuestion],
    7: [createPercentDiscountQuestion, createRatioTotalQuestion, createElapsedClockQuestion, createRateQuestion],
    8: [createProportionQuestion, createMixedUnitsDistanceQuestion, createRemainderBoxesQuestion, createProfitQuestion],
    9: [createOriginalPriceQuestion, createWeightedAverageQuestion, createMissingTableTotalQuestion, createWorkRateQuestion],
    10: [createPlanComparisonQuestion, createContainerRemainderQuestion, createReversePerimeterQuestion, createOptimizationSeatingQuestion],
  };

  return appliedWordProblemRandomChoice(generatorsByLevel[level] || generatorsByLevel[3])(level);
}

function createMoneyStoryQuestion(difficulty = 1) {
  const ranges = difficulty <= 2
    ? { starts: [20, 30, 40, 50, 60], spends: [5, 7, 8, 10, 12, 15], bonuses: [0, 3, 5] }
    : { starts: [80, 100, 120, 150, 180], spends: [18, 24, 30, 35, 42], bonuses: [0, 8, 12, 15] };
  const start = appliedWordProblemRandomChoice(ranges.starts);
  const spend = appliedWordProblemRandomChoice(ranges.spends.filter((value) => value < start));
  const bonus = appliedWordProblemRandomChoice(ranges.bonuses);
  const answer = start - spend + bonus;

  return appliedWordProblemBuildQuestion({
    question: "How much money is left?",
    displayText: `A child has ${start} shekels, spends ${spend} shekels, and then gets ${bonus} shekels back.`,
    options: appliedWordProblemBuildNumericOptions(answer, "shekels", [answer - 10, answer - 5, answer + 5]),
    answer: `${answer} shekels`,
    difficulty,
    visualSummary: `The answer is ${answer} shekels.`,
  });
}

function createGroupingQuestion(difficulty = 1) {
  const groups = appliedWordProblemRandomInt(3, difficulty <= 2 ? 6 : 9);
  const each = appliedWordProblemRandomInt(2, difficulty <= 2 ? 5 : 8);
  const extra = appliedWordProblemRandomInt(0, difficulty <= 2 ? 3 : 6);
  const answer = groups * each + extra;

  return appliedWordProblemBuildQuestion({
    question: "How many items are there altogether?",
    displayText: `There are ${groups} groups with ${each} items in each group, and ${extra} more items are added.`,
    options: appliedWordProblemBuildNumericOptions(answer, "", [answer - groups, answer - each, answer + extra + 1]),
    answer: String(answer),
    difficulty,
    visualSummary: `There are ${answer} items.`,
  });
}

function appliedCreateElapsedTimeQuestion(difficulty = 1) {
  const first = appliedWordProblemRandomChoice(difficulty <= 2 ? [10, 15, 20, 25, 30, 35] : [25, 30, 35, 40, 45, 50]);
  const second = appliedWordProblemRandomChoice(difficulty <= 2 ? [10, 15, 20, 25, 30] : [15, 20, 25, 30, 35, 40]);
  const answer = first + second;

  return appliedWordProblemBuildQuestion({
    question: "How many minutes do the activity and break take altogether?",
    displayText: `An activity lasts ${first} minutes and then a break lasts ${second} minutes.`,
    options: appliedWordProblemBuildNumericOptions(answer, "minutes", [answer - 10, answer - 5, answer + 5]),
    answer: `${answer} minutes`,
    difficulty,
    visualSummary: `The total time is ${answer} minutes.`,
  });
}

function createSimpleLeftoverTimeQuestion(difficulty = 2) {
  const total = appliedWordProblemRandomChoice([50, 60, 75, 90]);
  const first = appliedWordProblemRandomChoice([15, 20, 25, 30]);
  const second = appliedWordProblemRandomChoice([5, 10, 15, 20]);
  const answer = total - first - second;

  return appliedWordProblemBuildQuestion({
    question: "How many minutes are left?",
    displayText: `A class has ${total} minutes. They work for ${first} minutes and clean up for ${second} minutes.`,
    options: appliedWordProblemBuildNumericOptions(answer, "minutes", [answer - 10, answer - 5, answer + 5]),
    answer: `${answer} minutes`,
    difficulty,
    visualSummary: `${answer} minutes are left.`,
  });
}

function createFractionStoryQuestion(difficulty = 2) {
  const templates = difficulty <= 4
    ? [
        {
          question: "How much is used in all?",
          displayText: "A recipe uses 1/2 cup of milk twice and then 1 more cup.",
          options: ["1 cup", "1 1/2 cups", "2 cups", "3 cups"],
          answer: "2 cups",
          visualSummary: "The total is 2 cups.",
        },
        {
          question: "How much fruit is in the bowl?",
          displayText: "A bowl has 1/4 cup of blueberries, 1/4 cup of raspberries, and 1/2 cup of melon.",
          options: ["1/2 cup", "3/4 cup", "1 cup", "1 1/4 cups"],
          answer: "1 cup",
          visualSummary: "The total is 1 cup.",
        },
      ]
    : [
        {
          question: "How many cups are needed?",
          displayText: "One loaf needs 3/4 cup of oats. A baker makes 4 loaves.",
          options: ["2 cups", "2 1/2 cups", "3 cups", "4 cups"],
          answer: "3 cups",
          visualSummary: "Four groups of 3/4 cup make 3 cups.",
        },
        {
          question: "How much paint is left?",
          displayText: "A can has 2 liters of paint. A painter uses 3/4 liter, then 1/2 liter.",
          options: ["1/2 liter", "3/4 liter", "1 liter", "1 1/4 liters"],
          answer: "3/4 liter",
          visualSummary: "2 - 3/4 - 1/2 = 3/4.",
        },
      ];
  const template = appliedWordProblemRandomChoice(templates);
  return appliedWordProblemBuildQuestion({ ...template, difficulty });
}

function createMeasurementStoryQuestion(difficulty = 3) {
  const first = appliedWordProblemRandomInt(3, 9);
  const second = appliedWordProblemRandomInt(2, 8);
  const answer = first + second;

  return appliedWordProblemBuildQuestion({
    question: "How far did the child walk in all?",
    displayText: `A child walks ${first} meters to the park and ${second} more meters to the playground.`,
    options: appliedWordProblemBuildNumericOptions(answer, "meters", [answer - 2, answer - 1, answer + 2]),
    answer: `${answer} meters`,
    difficulty,
    visualSummary: `The total distance is ${answer} meters.`,
  });
}

function createTwoStepStoryQuestion(difficulty = 3) {
  const groups = appliedWordProblemRandomInt(2, difficulty <= 3 ? 5 : 8);
  const each = appliedWordProblemRandomInt(3, difficulty <= 3 ? 6 : 9);
  const givenAway = appliedWordProblemRandomInt(2, Math.min(groups * each - 2, difficulty <= 3 ? 6 : 12));
  const answer = groups * each - givenAway;

  return appliedWordProblemBuildQuestion({
    question: "How many stickers are left?",
    displayText: `There are ${groups} bags with ${each} stickers in each bag. Then ${givenAway} stickers are given away.`,
    options: appliedWordProblemBuildNumericOptions(answer, "", [answer - 4, answer - 2, answer + 2]),
    answer: String(answer),
    difficulty,
    visualSummary: `There are ${answer} stickers left.`,
  });
}

function createEqualGroupsWithLeftoverQuestion(difficulty = 3) {
  const total = appliedWordProblemRandomChoice([28, 32, 35, 42, 45, 48]);
  const groupSize = appliedWordProblemRandomChoice([4, 5, 6, 7]);
  const groups = Math.floor(total / groupSize);
  const leftover = total % groupSize;
  const answer = `${groups} groups and ${leftover} left over`;

  const distractors = appliedWordProblemFirstUniqueOptions(answer, [
    `${groups - 1} groups and ${leftover + groupSize} left over`,
    `${groups} groups and ${(leftover + 1) % groupSize} left over`,
    `${groups + 1} groups and ${leftover} left over`,
    `${groups + 1} groups and 0 left over`,
    `${groups - 1} groups and ${leftover} left over`,
  ]);

  return appliedWordProblemBuildQuestion({
    question: "How many full groups can be made?",
    displayText: `${total} students are split into groups of ${groupSize}.`,
    options: appliedWordProblemBuildOptions(answer, distractors),
    answer,
    difficulty,
    visualSummary: `${total} divided by ${groupSize} makes ${answer}.`,
  });
}

function createTableQuestion(difficulty = 3) {
  const rows = [
    ["Snack", appliedWordProblemRandomInt(4, 9)],
    ["Fruit", appliedWordProblemRandomInt(7, 14)],
    ["Drink", appliedWordProblemRandomInt(3, 10)],
  ];
  rows.sort((a, b) => b[1] - a[1]);
  const answer = rows[0][0];

  return appliedWordProblemBuildQuestion({
    question: "Which category had the most votes?",
    visualHtml: buildAppliedWordProblemTable("Class vote", [
      ["Category", "Votes"],
      ...appliedWordProblemShuffleArray(rows).map(([label, value]) => [label, String(value)]),
    ]),
    options: ["Snack", "Fruit", "Drink", "Tie"],
    answer,
    difficulty,
    visualSummary: `${answer} had the most votes.`,
  });
}

function createMultiStepMoneyQuestion(difficulty = 4) {
  const start = appliedWordProblemRandomChoice(difficulty <= 5 ? [80, 90, 100, 120, 150] : [150, 180, 200, 240]);
  const buy1 = appliedWordProblemRandomChoice(difficulty <= 5 ? [18, 20, 25, 30] : [32, 36, 45, 54]);
  const buy2 = appliedWordProblemRandomChoice(difficulty <= 5 ? [10, 15, 18, 25] : [24, 30, 38, 42]);
  const answer = start - buy1 - buy2;

  return appliedWordProblemBuildQuestion({
    question: "How much money is left after both purchases?",
    displayText: `A student has ${start} shekels. She buys one item for ${buy1} shekels and another for ${buy2} shekels.`,
    options: appliedWordProblemBuildNumericOptions(answer, "shekels", [answer - 15, answer - 5, answer + 10]),
    answer: `${answer} shekels`,
    difficulty,
    visualSummary: `The money left is ${answer} shekels.`,
  });
}

function createUnitConversionQuestion(difficulty = 4) {
  const liters = appliedWordProblemRandomChoice([1.5, 2, 2.5, 3]);
  const bottleMl = appliedWordProblemRandomChoice([250, 500]);
  const answer = Math.round((liters * 1000) / bottleMl);

  return appliedWordProblemBuildQuestion({
    question: "How many bottles are needed?",
    displayText: `A recipe needs ${formatAppliedNumber(liters)} liters of water. Each bottle holds ${bottleMl} milliliters.`,
    options: appliedWordProblemBuildNumericOptions(answer, "bottles", [answer - 2, answer - 1, answer + 1]),
    answer: `${answer} bottles`,
    difficulty,
    visualSummary: `${formatAppliedNumber(liters)} liters is ${liters * 1000} milliliters.`,
  });
}

function appliedCreateUnitPriceQuestion(difficulty = 5) {
  const templates = [
    {
      question: "Which is the better deal?",
      displayText: "Compare 5 pens for 30 shekels with 4 pens for 28 shekels.",
      options: ["5 pens for 30 shekels", "4 pens for 28 shekels", "They are the same price per pen", "There is not enough information"],
      answer: "5 pens for 30 shekels",
    },
    {
      question: "Which is the better deal?",
      displayText: "Compare 6 apples for 24 shekels with 8 apples for 36 shekels.",
      options: ["6 apples for 24 shekels", "8 apples for 36 shekels", "They are the same price per apple", "There is not enough information"],
      answer: "6 apples for 24 shekels",
    },
  ];

  return appliedWordProblemBuildQuestion({ ...appliedWordProblemRandomChoice(templates), difficulty });
}

function createRecipeScalingQuestion(difficulty = 5) {
  const batches = appliedWordProblemRandomChoice([2, 3, 4]);
  const perBatch = appliedWordProblemRandomChoice([2, 3, 4, 5]);
  const extra = appliedWordProblemRandomChoice([0, 1, 2]);
  const answer = batches * perBatch + extra;

  return appliedWordProblemBuildQuestion({
    question: "How many cups are needed in all?",
    displayText: `One batch needs ${perBatch} cups of flour. The baker makes ${batches} batches and adds ${extra} extra cups.`,
    options: appliedWordProblemBuildNumericOptions(answer, "cups", [answer - perBatch, answer - 1, answer + 2]),
    answer: `${answer} cups`,
    difficulty,
    visualSummary: `${batches} times ${perBatch}, plus ${extra}, is ${answer}.`,
  });
}

function appliedCreateAverageQuestion(difficulty = 6) {
  const base = appliedWordProblemRandomChoice([12, 15, 18, 20, 24]);
  const values = [base - 3, base, base + 3];
  const answer = base;

  return appliedWordProblemBuildQuestion({
    question: "What is the average?",
    displayText: `The three scores are ${values[0]}, ${values[1]}, and ${values[2]}.`,
    options: appliedWordProblemBuildNumericOptions(answer, "", [answer - 3, answer + 1, answer + 3]),
    answer: String(answer),
    difficulty,
    visualSummary: `The average is ${answer}.`,
  });
}

function appliedCreatePerimeterQuestion(difficulty = 6) {
  const length = appliedWordProblemRandomInt(7, 14);
  const width = appliedWordProblemRandomInt(3, 9);
  const answer = 2 * (length + width);

  return appliedWordProblemBuildQuestion({
    question: "What is the perimeter?",
    displayText: `A rectangle is ${length} meters long and ${width} meters wide.`,
    options: appliedWordProblemBuildNumericOptions(answer, "meters", [length + width, length * width, answer + 4]),
    answer: `${answer} meters`,
    difficulty,
    visualSummary: `Perimeter is 2 x (${length} + ${width}) = ${answer}.`,
  });
}

function createFractionOfTotalQuestion(difficulty = 6) {
  const total = appliedWordProblemRandomChoice([48, 60, 72, 90, 120]);
  const denominator = appliedWordProblemRandomChoice([3, 4, 5, 6]);
  const numerator = appliedWordProblemRandomInt(1, denominator - 1);
  const answer = (total / denominator) * numerator;

  if (!Number.isInteger(answer)) {
    return createFractionOfTotalQuestion(difficulty);
  }

  return appliedWordProblemBuildQuestion({
    question: "How many are in the selected part?",
    displayText: `${numerator}/${denominator} of ${total} students chose the same activity.`,
    options: appliedWordProblemBuildNumericOptions(answer, "students", [answer - denominator, answer + denominator, total - answer]),
    answer: `${answer} students`,
    difficulty,
    visualSummary: `${numerator}/${denominator} of ${total} is ${answer}.`,
  });
}

function createPackageCountQuestion(difficulty = 6) {
  const needed = appliedWordProblemRandomChoice([42, 48, 54, 63, 72]);
  const packSize = appliedWordProblemRandomChoice([6, 7, 8, 9]);
  const answer = Math.ceil(needed / packSize);

  return appliedWordProblemBuildQuestion({
    question: "How many packages are needed?",
    displayText: `A group needs ${needed} cups. Each package has ${packSize} cups.`,
    options: appliedWordProblemBuildNumericOptions(answer, "packages", [answer - 1, answer + 1, answer + 2]),
    answer: `${answer} packages`,
    difficulty,
    visualSummary: `${needed} divided by ${packSize} means ${answer} packages are needed.`,
  });
}

function createPercentDiscountQuestion(difficulty = 7) {
  const original = appliedWordProblemRandomChoice([80, 100, 120, 160, 200]);
  const discountPercent = appliedWordProblemRandomChoice([10, 20, 25, 50]);
  const answer = original * (100 - discountPercent) / 100;

  return appliedWordProblemBuildQuestion({
    question: "What is the sale price?",
    displayText: `An item costs ${original} shekels and is ${discountPercent}% off.`,
    options: appliedWordProblemBuildNumericOptions(answer, "shekels", [answer - 10, answer + 10, original - discountPercent]),
    answer: `${answer} shekels`,
    difficulty,
    visualSummary: `The sale price is ${answer} shekels.`,
  });
}

function createRatioTotalQuestion(difficulty = 7) {
  const redParts = appliedWordProblemRandomChoice([2, 3, 4]);
  const blueParts = appliedWordProblemRandomChoice([3, 4, 5]);
  const multiplier = appliedWordProblemRandomChoice([4, 5, 6, 8]);
  const total = (redParts + blueParts) * multiplier;
  const answer = redParts * multiplier;

  return appliedWordProblemBuildQuestion({
    question: "How many red marbles are there?",
    displayText: `Red and blue marbles are in a ${redParts}:${blueParts} ratio. There are ${total} marbles altogether.`,
    options: appliedWordProblemBuildNumericOptions(answer, "red marbles", [blueParts * multiplier, answer + multiplier, total - answer]),
    answer: `${answer} red marbles`,
    difficulty,
    visualSummary: `Each ratio part is ${multiplier}, so red is ${answer}.`,
  });
}

function createElapsedClockQuestion(difficulty = 7) {
  const templates = [
    { start: "9:35", minutes: 110, answer: "11:25", distractors: ["10:55", "11:15", "11:45"] },
    { start: "1:20", minutes: 95, answer: "2:55", distractors: ["2:35", "2:45", "3:05"] },
    { start: "3:50", minutes: 85, answer: "5:15", distractors: ["4:55", "5:05", "5:25"] },
  ];
  const template = appliedWordProblemRandomChoice(templates);

  return appliedWordProblemBuildQuestion({
    question: "What time does it end?",
    displayText: `An activity starts at ${template.start} and lasts ${template.minutes} minutes.`,
    options: appliedWordProblemBuildOptions(template.answer, template.distractors),
    answer: template.answer,
    difficulty,
    visualSummary: `It ends at ${template.answer}.`,
  });
}

function createRateQuestion(difficulty = 7) {
  const rate = appliedWordProblemRandomChoice([12, 15, 18, 20]);
  const hours = appliedWordProblemRandomChoice([2, 3, 4]);
  const answer = rate * hours;

  return appliedWordProblemBuildQuestion({
    question: "How far did the cyclist travel?",
    displayText: `A cyclist rides ${rate} kilometers per hour for ${hours} hours.`,
    options: appliedWordProblemBuildNumericOptions(answer, "kilometers", [answer - rate, answer + rate, answer + hours]),
    answer: `${answer} kilometers`,
    difficulty,
    visualSummary: `${rate} x ${hours} = ${answer}.`,
  });
}

function createProportionQuestion(difficulty = 8) {
  const baseItems = appliedWordProblemRandomChoice([3, 4, 5]);
  const baseCost = baseItems * appliedWordProblemRandomChoice([6, 7, 8, 9]);
  const targetItems = baseItems * appliedWordProblemRandomChoice([2, 3, 4]);
  const unitCost = baseCost / baseItems;
  const answer = unitCost * targetItems;

  return appliedWordProblemBuildQuestion({
    question: `How much will ${targetItems} items cost?`,
    displayText: `${baseItems} items cost ${baseCost} shekels. The price per item stays the same.`,
    options: appliedWordProblemBuildNumericOptions(answer, "shekels", [answer - unitCost, answer + unitCost, answer + baseCost]),
    answer: `${answer} shekels`,
    difficulty,
    visualSummary: `Each item costs ${unitCost} shekels, so ${targetItems} cost ${answer}.`,
  });
}

function createMixedUnitsDistanceQuestion(difficulty = 8) {
  const laps = appliedWordProblemRandomChoice([2, 3, 4]);
  const lapKm = appliedWordProblemRandomChoice([0.75, 1.2, 1.5]);
  const extraMeters = appliedWordProblemRandomChoice([250, 500, 850]);
  const answer = laps * lapKm + extraMeters / 1000;
  const answerLabel = `${formatAppliedNumber(answer)} km`;

  return appliedWordProblemBuildQuestion({
    question: "What is the total distance?",
    displayText: `A runner completes ${laps} laps of ${formatAppliedNumber(lapKm)} km, then runs another ${extraMeters} meters.`,
    options: appliedWordProblemBuildOptions(answerLabel, appliedWordProblemFirstUniqueOptions(answerLabel, [
      `${formatAppliedNumber(answer - 0.25)} km`,
      `${formatAppliedNumber(answer + 0.25)} km`,
      `${formatAppliedNumber(laps * lapKm)} km`,
      `${formatAppliedNumber(answer - 0.5)} km`,
      `${formatAppliedNumber(answer + 0.5)} km`,
    ])),
    answer: answerLabel,
    difficulty,
    visualSummary: `The total distance is ${answerLabel}.`,
  });
}

function createRemainderBoxesQuestion(difficulty = 8) {
  const total = appliedWordProblemRandomChoice([124, 148, 175, 203]);
  const boxSize = appliedWordProblemRandomChoice([10, 12, 15, 20]);
  const answer = Math.ceil(total / boxSize);

  return appliedWordProblemBuildQuestion({
    question: "How many boxes are needed?",
    displayText: `There are ${total} cans. Each box holds ${boxSize} cans, and every can must be packed.`,
    options: appliedWordProblemBuildNumericOptions(answer, "boxes", [answer - 2, answer - 1, answer + 1]),
    answer: `${answer} boxes`,
    difficulty,
    visualSummary: `${answer} boxes are needed because a partial final box still counts.`,
  });
}

function createProfitQuestion(difficulty = 8) {
  const supplyCost = appliedWordProblemRandomChoice([75, 95, 120, 150]);
  const count = appliedWordProblemRandomChoice([18, 20, 24, 30]);
  const price = appliedWordProblemRandomChoice([6, 8, 10, 12]);
  const answer = count * price - supplyCost;
  if (answer <= 0) {
    return createProfitQuestion(difficulty);
  }

  return appliedWordProblemBuildQuestion({
    question: "How much profit was made?",
    displayText: `A class buys supplies for ${supplyCost} shekels and sells ${count} items for ${price} shekels each.`,
    options: appliedWordProblemBuildNumericOptions(answer, "shekels", [answer - 10, count * price, answer + supplyCost]),
    answer: `${answer} shekels`,
    difficulty,
    visualSummary: `Revenue minus cost is ${answer} shekels.`,
  });
}

function createOriginalPriceQuestion(difficulty = 9) {
  const original = appliedWordProblemRandomChoice([80, 100, 120, 150, 200]);
  const percentOff = appliedWordProblemRandomChoice([20, 25, 40, 50]);
  const salePrice = original * (100 - percentOff) / 100;

  return appliedWordProblemBuildQuestion({
    question: "What was the original price?",
    displayText: `After a ${percentOff}% discount, an item costs ${salePrice} shekels.`,
    options: appliedWordProblemBuildNumericOptions(original, "shekels", [salePrice, original - 10, original + 20]),
    answer: `${original} shekels`,
    difficulty,
    visualSummary: `The original price was ${original} shekels.`,
  });
}

function createWeightedAverageQuestion(difficulty = 9) {
  const design = appliedWordProblemRandomChoice([80, 85, 90, 95]);
  const presentation = appliedWordProblemRandomChoice([70, 75, 80, 85]);
  const answer = Math.round(design * 0.6 + presentation * 0.4);

  return appliedWordProblemBuildQuestion({
    question: "What is the weighted average score?",
    displayText: `A project grade is 60% design and 40% presentation. The design score is ${design} and the presentation score is ${presentation}.`,
    options: appliedWordProblemBuildNumericOptions(answer, "", [answer - 3, answer + 3, Math.round((design + presentation) / 2)]),
    answer: String(answer),
    difficulty,
    visualSummary: `The weighted average is ${answer}.`,
  });
}

function createMissingTableTotalQuestion(difficulty = 9) {
  const total = appliedWordProblemRandomChoice([60, 70, 84, 96]);
  const first = appliedWordProblemRandomChoice([16, 18, 20, 24]);
  const second = appliedWordProblemRandomChoice([22, 24, 28, 30]);
  const answer = total - first - second;

  return appliedWordProblemBuildQuestion({
    question: "What number is missing from the table?",
    visualHtml: buildAppliedWordProblemTable("Club choices", [
      ["Choice", "Students"],
      ["Art", String(first)],
      ["Chess", String(second)],
      ["Robotics", "?"],
      ["Total", String(total)],
    ]),
    options: appliedWordProblemBuildNumericOptions(answer, "students", [answer - 4, answer + 4, first + second]),
    answer: `${answer} students`,
    difficulty,
    visualSummary: `${total} - ${first} - ${second} = ${answer}.`,
  });
}

function createWorkRateQuestion(difficulty = 9) {
  const rate = appliedWordProblemRandomChoice([18, 24, 30]);
  const hours = appliedWordProblemRandomChoice([1.5, 2.5, 3.5]);
  const distance = rate * hours;

  return appliedWordProblemBuildQuestion({
    question: "What was the average speed?",
    displayText: `A cyclist rides ${formatAppliedNumber(distance)} kilometers in ${formatAppliedNumber(hours)} hours.`,
    options: appliedWordProblemBuildNumericOptions(rate, "km/h", [rate - 6, rate + 6, Math.round(distance)]),
    answer: `${rate} km/h`,
    difficulty,
    visualSummary: `${formatAppliedNumber(distance)} divided by ${formatAppliedNumber(hours)} is ${rate}.`,
  });
}

function createPlanComparisonQuestion(difficulty = 10) {
  const classes = appliedWordProblemRandomChoice([8, 10, 12]);
  const planAFixed = appliedWordProblemRandomChoice([35, 40, 50]);
  const planAPer = appliedWordProblemRandomChoice([5, 6, 7]);
  const planBFixed = appliedWordProblemRandomChoice([20, 25, 30]);
  const planBPer = appliedWordProblemRandomChoice([8, 9, 10]);
  const costA = planAFixed + planAPer * classes;
  const costB = planBFixed + planBPer * classes;
  const answer = costA < costB ? "Plan A is cheaper" : costB < costA ? "Plan B is cheaper" : "They cost the same";

  return appliedWordProblemBuildQuestion({
    question: "Which plan is cheapest?",
    displayText: `Plan A costs ${planAFixed} shekels plus ${planAPer} shekels per class. Plan B costs ${planBFixed} shekels plus ${planBPer} shekels per class. The student takes ${classes} classes.`,
    options: appliedWordProblemBuildOptions(answer, [
      `Plan A costs ${costA} shekels`,
      `Plan B costs ${costB} shekels`,
      "There is not enough information",
    ]),
    answer,
    difficulty,
    visualSummary: `Plan A costs ${costA}; Plan B costs ${costB}.`,
  });
}

function createContainerRemainderQuestion(difficulty = 10) {
  const totalMl = appliedWordProblemRandomChoice([4000, 5000, 6000]);
  const largeCount = appliedWordProblemRandomChoice([4, 5, 6]);
  const largeMl = appliedWordProblemRandomChoice([500, 750]);
  const smallMl = 250;
  const remaining = totalMl - largeCount * largeMl;
  const answer = Math.floor(remaining / smallMl);

  return appliedWordProblemBuildQuestion({
    question: "How many small jars can be filled?",
    displayText: `A cook has ${formatAppliedNumber(totalMl / 1000)} liters of sauce. She fills ${largeCount} large jars of ${largeMl} mL each, then uses the rest for small ${smallMl} mL jars.`,
    options: appliedWordProblemBuildNumericOptions(answer, "small jars", [answer - 2, answer - 1, answer + 1]),
    answer: `${answer} small jars`,
    difficulty,
    visualSummary: `${remaining} mL remain, enough for ${answer} small jars.`,
  });
}

function createReversePerimeterQuestion(difficulty = 10) {
  const knownSide = appliedWordProblemRandomChoice([12, 15, 18, 20]);
  const missingSide = appliedWordProblemRandomChoice([7, 8, 9, 11, 12]);
  const perimeter = 2 * (knownSide + missingSide);

  return appliedWordProblemBuildQuestion({
    question: "What is the missing side length?",
    displayText: `A rectangle has a perimeter of ${perimeter} cm. One side is ${knownSide} cm long.`,
    options: appliedWordProblemBuildNumericOptions(missingSide, "cm", [missingSide - 2, missingSide + 2, knownSide]),
    answer: `${missingSide} cm`,
    difficulty,
    visualSummary: `Half the perimeter is ${perimeter / 2}; ${perimeter / 2} - ${knownSide} = ${missingSide}.`,
  });
}

function createOptimizationSeatingQuestion(difficulty = 10) {
  const guests = appliedWordProblemRandomChoice([74, 86, 97, 105]);
  const seats = appliedWordProblemRandomChoice([6, 8, 10]);
  const reserved = appliedWordProblemRandomChoice([1, 2, 3]);
  const answer = Math.ceil(guests / seats) + reserved;

  return appliedWordProblemBuildQuestion({
    question: "How many tables are needed?",
    displayText: `A dinner has ${guests} guests. Each table seats ${seats} people. ${reserved} tables are reserved for supplies and cannot seat guests.`,
    options: appliedWordProblemBuildNumericOptions(answer, "tables", [answer - 2, answer - 1, answer + 1]),
    answer: `${answer} tables`,
    difficulty,
    visualSummary: `${Math.ceil(guests / seats)} guest tables plus ${reserved} reserved tables gives ${answer}.`,
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
    difficulty: clampAppliedWordProblemDifficulty(difficulty),
    visualSummary,
    type: "applied-word-problem-choice",
  };
}

function appliedWordProblemFirstUniqueOptions(answer, candidates, count = 3) {
  return Array.from(new Set(candidates.map((candidate) => String(candidate).trim())))
    .filter((candidate) => candidate && candidate !== String(answer).trim())
    .slice(0, count);
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

function appliedWordProblemBuildNumericOptions(answer, suffix = "", preferredDistractors = []) {
  const numericAnswer = Number(answer);
  const distractorSet = new Set();
  const addDistractor = (value) => {
    const numericValue = Number(value);
    if (!Number.isFinite(numericValue) || numericValue < 0 || numericValue === numericAnswer) {
      return;
    }
    const formatted = formatAppliedNumber(numericValue);
    if (formatted !== formatAppliedNumber(numericAnswer)) {
      distractorSet.add(formatted);
    }
  };

  preferredDistractors.forEach(addDistractor);
  [
    numericAnswer - 10,
    numericAnswer - 5,
    numericAnswer - 4,
    numericAnswer - 3,
    numericAnswer - 2,
    numericAnswer - 1,
    numericAnswer + 1,
    numericAnswer + 2,
    numericAnswer + 3,
    numericAnswer + 4,
    numericAnswer + 5,
    numericAnswer + 10,
    numericAnswer * 2,
    Math.max(0, Math.floor(numericAnswer / 2)),
  ].forEach(addDistractor);

  return appliedWordProblemBuildOptions(formatAppliedNumber(numericAnswer), Array.from(distractorSet).slice(0, 3), suffix);
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

  return Math.min(10, Math.max(1, level));
}

function appliedWordProblemEscapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function appliedWordProblemRandomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
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

function formatAppliedNumber(value) {
  const rounded = Math.round(Number(value) * 100) / 100;
  return Number.isInteger(rounded) ? String(rounded) : String(rounded).replace(/0+$/, "").replace(/\.$/, "");
}

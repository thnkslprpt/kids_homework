function nutritionQuestion(question, options, answer, difficulty, extra = {}) {
  const normalizedOptions = Array.from(new Set(options.map(String)));
  const normalizedAnswer = String(answer);
  const normalizedDifficulty = nutritionClampDifficulty(difficulty);

  if (!String(question || "").trim()) {
    throw new Error("Nutrition question is missing question text.");
  }
  if (normalizedOptions.length !== 4 || !normalizedOptions.includes(normalizedAnswer)) {
    throw new Error(`Nutrition question must have exactly 4 unique options including the answer: ${question}`);
  }

  return {
    question: String(question),
    options: normalizedOptions,
    answer: normalizedAnswer,
    difficulty: normalizedDifficulty,
    ...extra,
  };
}

const NUTRITION_QUESTIONS = [
  // Level 1: food and drink basics.
  nutritionQuestion(
    "What does the serving size on a Nutrition Facts label tell you?",
    [
      "The amount the nutrition numbers are based on",
      "How tall the package is",
      "How much the food costs",
      "How many colors are on the box",
    ],
    "The amount the nutrition numbers are based on",
    1
  ),
  nutritionQuestion(
    "Which drink is usually the best choice after active play?",
    ["Water", "Soda", "Energy drink", "Candy syrup"],
    "Water",
    1
  ),
  nutritionQuestion(
    "Which snack is usually a better choice than candy for everyday eating?",
    ["An apple", "A lollipop", "A soda", "A marshmallow"],
    "An apple",
    1
  ),
  nutritionQuestion(
    "What does protein help your body do?",
    [
      "Build and repair body parts",
      "Make soda fizz",
      "Turn food into colors",
      "Stop all hunger forever",
    ],
    "Build and repair body parts",
    1
  ),
  nutritionQuestion(
    "Which food is a fruit?",
    ["Banana", "Chicken", "Bread", "Cheese"],
    "Banana",
    1
  ),
  nutritionQuestion(
    "Which food is a vegetable?",
    ["Carrot", "Candy", "Cookie", "Soda"],
    "Carrot",
    1
  ),
  nutritionQuestion(
    "Which food is usually highest in protein?",
    ["Eggs", "Soda", "Gummy candy", "Lollipop"],
    "Eggs",
    1
  ),
  nutritionQuestion(
    "Which meal is usually more balanced?",
    [
      "Chicken, rice, and carrots",
      "Only candy",
      "Only soda",
      "Only chips",
    ],
    "Chicken, rice, and carrots",
    1
  ),

  // Level 2: simple label math and nutrient jobs.
  nutritionQuestion(
    "A package has 2 servings and 150 calories per serving. How many calories are in the whole package?",
    ["150", "250", "300", "450"],
    "300",
    2
  ),
  nutritionQuestion(
    "Which food is a good source of calcium?",
    ["Milk", "Candy", "Chips", "Soda"],
    "Milk",
    2
  ),
  nutritionQuestion(
    "What does the fiber in food help with most?",
    ["Helping digestion", "Making food louder", "Turning food blue", "Adding bubbles"],
    "Helping digestion",
    2
  ),
  nutritionQuestion(
    "Which food is a good source of fiber?",
    ["Beans", "Candy", "Soda", "Marshmallows"],
    "Beans",
    2
  ),
  nutritionQuestion(
    "Which breakfast gives both protein and fruit?",
    [
      "Yogurt with berries",
      "Plain soda",
      "A bowl of candy",
      "Only a lollipop",
    ],
    "Yogurt with berries",
    2
  ),
  nutritionQuestion(
    "Which food is usually a whole grain choice?",
    ["Brown rice", "Gummy candy", "Soda", "Frosting"],
    "Brown rice",
    2
  ),
  nutritionQuestion(
    "If a snack has 5 grams of protein per serving and you eat 2 servings, how much protein is that?",
    ["5 grams", "7 grams", "10 grams", "15 grams"],
    "10 grams",
    2
  ),
  nutritionQuestion(
    "Why is it helpful to eat different kinds of foods?",
    [
      "Different foods give different nutrients",
      "It makes food invisible",
      "It means you never need water",
      "It makes labels disappear",
    ],
    "Different foods give different nutrients",
    2
  ),

  // Level 3: added sugar, fiber, and fair comparisons.
  nutritionQuestion(
    "If two cereals are otherwise similar, which is usually the better choice based on added sugar?",
    [
      "The one with less added sugar",
      "The one with the brightest box",
      "The one with more cartoon characters",
      "The one with the longest name",
    ],
    "The one with less added sugar",
    3
  ),
  nutritionQuestion(
    "What does \"added sugar\" mean on a label?",
    [
      "Sugar put in during processing",
      "Sugar found only in fruit",
      "Sugar that has no calories",
      "Sugar that turns into water",
    ],
    "Sugar put in during processing",
    3
  ),
  nutritionQuestion(
    "Which breakfast is usually the healthiest choice?",
    ["Oatmeal with fruit", "A bowl of candy", "Three sodas", "A pack of gum"],
    "Oatmeal with fruit",
    3
  ),
  nutritionQuestion(
    "Which part of a label should you check first when comparing two packages?",
    ["Serving size", "Mascot", "Box color", "Store shelf height"],
    "Serving size",
    3
  ),
  nutritionQuestion(
    "A snack has 8 grams of sugar per serving. If you eat 2 servings, how much sugar is that?",
    ["8 grams", "10 grams", "16 grams", "24 grams"],
    "16 grams",
    3
  ),
  nutritionQuestion(
    "Which cereal has less added sugar?",
    [
      "Cereal A: 5 grams",
      "Cereal B: 12 grams",
      "The cereal with a toy",
      "The bigger box",
    ],
    "Cereal A: 5 grams",
    3
  ),
  nutritionQuestion(
    "Which snack gives fiber and protein?",
    ["Hummus with vegetables", "Soda", "Cotton candy", "A lollipop"],
    "Hummus with vegetables",
    3
  ),
  nutritionQuestion(
    "Why can fruit be a good sweet snack?",
    [
      "It has natural sugar plus nutrients and fiber",
      "It has no food value",
      "It is always the same as candy",
      "It never contains water",
    ],
    "It has natural sugar plus nutrients and fiber",
    3
  ),

  // Level 4: balanced plates, ingredients, and sodium basics.
  nutritionQuestion(
    "On a balanced plate, about what should fill half the plate?",
    ["Fruits and vegetables", "Only meat", "Only dessert", "Only bread"],
    "Fruits and vegetables",
    4
  ),
  nutritionQuestion(
    "If the first ingredient on a bread label is whole wheat, what does that usually suggest?",
    ["It is mostly whole grain", "It has no calories", "It is a dessert", "It is only for adults"],
    "It is mostly whole grain",
    4
  ),
  nutritionQuestion(
    "Which part of a food label helps you compare two packages fairly?",
    ["Serving size", "Box color", "Brand name", "Font style"],
    "Serving size",
    4
  ),
  nutritionQuestion(
    "Which food group should take up about half of a balanced plate?",
    ["Fruits and vegetables", "Desserts", "Candy", "Sugary drinks"],
    "Fruits and vegetables",
    4
  ),
  nutritionQuestion(
    "Which snack has less sodium?",
    [
      "Snack A: 90 mg per serving",
      "Snack B: 180 mg per serving",
      "The snack with the louder bag",
      "The snack with more stickers",
    ],
    "Snack A: 90 mg per serving",
    4
  ),
  nutritionQuestion(
    "A soup has 300 mg of sodium per serving and the can has 2 servings. How much sodium is in the whole can?",
    ["300 mg", "450 mg", "600 mg", "900 mg"],
    "600 mg",
    4
  ),
  nutritionQuestion(
    "Which lunch includes a vegetable, a protein, and a grain?",
    [
      "Turkey sandwich with lettuce and whole wheat bread",
      "Only cookies",
      "Only soda",
      "Only plain candy",
    ],
    "Turkey sandwich with lettuce and whole wheat bread",
    4
  ),
  nutritionQuestion(
    "Which label clue often means a food is less processed?",
    [
      "A shorter ingredient list with familiar foods",
      "The brightest package",
      "The biggest cartoon picture",
      "The longest brand name",
    ],
    "A shorter ingredient list with familiar foods",
    4
  ),

  // Level 5: multi-serving label calculations and everyday choices.
  nutritionQuestion(
    "Which snack is usually the better everyday choice?",
    ["An apple and yogurt", "A soda and candy bar", "Only gummy candy", "A bag of sugar cubes"],
    "An apple and yogurt",
    5
  ),
  nutritionQuestion(
    "Crackers have 120 milligrams of sodium per serving. If you eat 2 servings, how much sodium is that?",
    ["120 mg", "180 mg", "240 mg", "300 mg"],
    "240 mg",
    5
  ),
  nutritionQuestion(
    "Which snack has the least added sugar?",
    ["Plain yogurt", "Chocolate cake", "Soda", "Candy bars"],
    "Plain yogurt",
    5
  ),
  nutritionQuestion(
    "If a snack has 9 grams of sugar per serving and you eat 2 servings, how much sugar do you eat?",
    ["9 grams", "12 grams", "18 grams", "27 grams"],
    "18 grams",
    5
  ),
  nutritionQuestion(
    "Which dinner has the best mix of food groups?",
    [
      "Fish, potatoes, salad, and fruit",
      "Only white bread",
      "Only ice cream",
      "Only soda",
    ],
    "Fish, potatoes, salad, and fruit",
    5
  ),
  nutritionQuestion(
    "Which label is usually better for choosing a bread with more fiber?",
    ["Fiber: 5 grams", "Fiber: 0 grams", "Sugar: 20 grams", "Sodium: 500 mg"],
    "Fiber: 5 grams",
    5
  ),
  nutritionQuestion(
    "A cereal has 3 grams of fiber per serving. If you eat 2 servings, how much fiber is that?",
    ["3 grams", "5 grams", "6 grams", "9 grams"],
    "6 grams",
    5
  ),
  nutritionQuestion(
    "Which is a smart way to make a snack more filling?",
    [
      "Add protein or fiber, like nuts or fruit",
      "Remove all water",
      "Choose the brightest wrapper",
      "Eat only sugar",
    ],
    "Add protein or fiber, like nuts or fruit",
    5
  ),

  // Level 6: label trade-offs and percentages.
  nutritionQuestion(
    "A drink has 12 grams of added sugar per serving and the bottle has 2.5 servings. About how much added sugar is in the bottle?",
    ["24 grams", "30 grams", "36 grams", "60 grams"],
    "30 grams",
    6
  ),
  nutritionQuestion(
    "Which choice gives the most fiber per serving?",
    ["Lentils: 8 grams", "White bread: 1 gram", "Soda: 0 grams", "Candy: 0 grams"],
    "Lentils: 8 grams",
    6
  ),
  nutritionQuestion(
    "A label says Vitamin C: 25% Daily Value. What does that mean?",
    [
      "One serving gives about one quarter of a day's suggested amount",
      "The food is 25% bigger",
      "The package is 25% empty",
      "You should eat exactly 25 servings",
    ],
    "One serving gives about one quarter of a day's suggested amount",
    6
  ),
  nutritionQuestion(
    "Which snack is likely to keep you full longer?",
    ["Whole-grain toast with peanut butter", "Plain soda", "Cotton candy", "Fruit-flavored hard candy"],
    "Whole-grain toast with peanut butter",
    6
  ),
  nutritionQuestion(
    "Which statement is true about calories?",
    [
      "They measure energy from food",
      "They measure the color of food",
      "They only exist in candy",
      "They are the same as vitamins",
    ],
    "They measure energy from food",
    6
  ),
  nutritionQuestion(
    "Which label has less sodium per serving?",
    ["Soup A: 420 mg", "Soup B: 690 mg", "Soup C: 800 mg", "Soup D: 1,000 mg"],
    "Soup A: 420 mg",
    6
  ),
  nutritionQuestion(
    "Why should you check servings per container?",
    [
      "The package may contain more than one serving",
      "It tells you the color of the food",
      "It makes the food cheaper",
      "It replaces the ingredient list",
    ],
    "The package may contain more than one serving",
    6
  ),
  nutritionQuestion(
    "Which food pairing gives carbohydrates plus protein?",
    ["Rice and beans", "Soda and candy", "Ice and salt", "Gum and water"],
    "Rice and beans",
    6
  ),

  // Level 7: unit comparisons and ingredient reasoning.
  nutritionQuestion(
    "Two yogurts have the same serving size. Yogurt A has 6 grams of added sugar and Yogurt B has 14 grams. Which is usually the better everyday choice?",
    ["Yogurt A", "Yogurt B", "Whichever has a cartoon", "Whichever has a bigger lid"],
    "Yogurt A",
    7
  ),
  nutritionQuestion(
    "A cereal serving has 4 grams of fiber and 8 grams of added sugar. A second cereal has 1 gram of fiber and 15 grams of added sugar. Which is usually better for fiber and sugar?",
    ["The first cereal", "The second cereal", "They are identical", "The box color decides"],
    "The first cereal",
    7
  ),
  nutritionQuestion(
    "Which ingredient list suggests the most whole grain?",
    [
      "Whole oats, raisins, cinnamon",
      "Sugar, white flour, syrup",
      "Corn syrup, candy pieces, oil",
      "Salt, sugar, coloring",
    ],
    "Whole oats, raisins, cinnamon",
    7
  ),
  nutritionQuestion(
    "A label says 10% Daily Value for calcium per serving. If you eat 2 servings, about how much Daily Value is that?",
    ["10%", "15%", "20%", "40%"],
    "20%",
    7
  ),
  nutritionQuestion(
    "Which choice best explains why beans are a nutritious food?",
    [
      "They provide protein and fiber",
      "They are always a dessert",
      "They contain no nutrients",
      "They are only useful for decoration",
    ],
    "They provide protein and fiber",
    7
  ),
  nutritionQuestion(
    "A granola bar has 180 calories, 2 grams fiber, and 14 grams added sugar. A fruit-and-nut bar has 170 calories, 5 grams fiber, and 5 grams added sugar. Which is usually the better everyday choice?",
    ["The fruit-and-nut bar", "The granola bar", "They are exactly the same", "The taller wrapper"],
    "The fruit-and-nut bar",
    7
  ),
  nutritionQuestion(
    "Why is \"made with real fruit\" not enough by itself to judge a snack?",
    [
      "It may still have lots of added sugar",
      "It means the snack has no calories",
      "It proves there is no salt",
      "It replaces the nutrition label",
    ],
    "It may still have lots of added sugar",
    7
  ),
  nutritionQuestion(
    "Which meal would be best before a long afternoon of schoolwork?",
    [
      "Whole-grain pita, eggs, cucumber, and water",
      "Only soda",
      "Only candy",
      "Only a spoon of sugar",
    ],
    "Whole-grain pita, eggs, cucumber, and water",
    7
  ),

  // Level 8: meal planning and label analysis.
  nutritionQuestion(
    "A snack pack has 3 servings. Each serving has 110 calories and 6 grams of added sugar. What are the totals for the whole pack?",
    [
      "330 calories and 18 grams added sugar",
      "110 calories and 18 grams added sugar",
      "330 calories and 6 grams added sugar",
      "220 calories and 12 grams added sugar",
    ],
    "330 calories and 18 grams added sugar",
    8
  ),
  nutritionQuestion(
    "Which lunch is most balanced for everyday eating?",
    [
      "Chicken, whole-grain couscous, salad, fruit, and water",
      "Only fries and soda",
      "Only cookies",
      "Only white rice with no other foods",
    ],
    "Chicken, whole-grain couscous, salad, fruit, and water",
    8
  ),
  nutritionQuestion(
    "Which label comparison is fairest?",
    [
      "Compare both foods using the same serving size",
      "Compare the biggest package to the smallest package",
      "Ignore serving size",
      "Choose only by package color",
    ],
    "Compare both foods using the same serving size",
    8
  ),
  nutritionQuestion(
    "Which snack has the best combination for staying full?",
    [
      "Greek yogurt with berries and oats",
      "Regular soda",
      "Hard candy",
      "Cotton candy",
    ],
    "Greek yogurt with berries and oats",
    8
  ),
  nutritionQuestion(
    "A soup has 700 mg sodium per serving and 2 servings per container. What should you notice?",
    [
      "The whole container has 1,400 mg sodium",
      "The whole container has 700 mg sodium",
      "The sodium disappears after heating",
      "Serving size does not matter",
    ],
    "The whole container has 1,400 mg sodium",
    8
  ),
  nutritionQuestion(
    "Which food label would usually be best for a high-fiber cereal?",
    [
      "Fiber 7 g, added sugar 4 g",
      "Fiber 1 g, added sugar 18 g",
      "Fiber 0 g, added sugar 20 g",
      "Fiber 2 g, added sugar 16 g",
    ],
    "Fiber 7 g, added sugar 4 g",
    8
  ),
  nutritionQuestion(
    "What is a good reason to include healthy fats like avocado, olive oil, or nuts?",
    [
      "They help meals be satisfying and support body functions",
      "They make vegetables stop being vegetables",
      "They have no energy",
      "They replace all other food groups",
    ],
    "They help meals be satisfying and support body functions",
    8
  ),
  nutritionQuestion(
    "Which statement about carbohydrates is most accurate?",
    [
      "Whole-grain and high-fiber carbohydrates can be useful energy foods",
      "All carbohydrates are candy",
      "No child ever needs carbohydrates",
      "Carbohydrates are the same as water",
    ],
    "Whole-grain and high-fiber carbohydrates can be useful energy foods",
    8
  ),

  // Level 9: claims, trade-offs, and nutrition decisions.
  nutritionQuestion(
    "A package says \"low fat\" but has 22 grams of added sugar per serving. What should you think?",
    [
      "Check the whole label, because one claim does not tell everything",
      "It must be the healthiest food",
      "Added sugar no longer matters",
      "The serving size is always one bite",
    ],
    "Check the whole label, because one claim does not tell everything",
    9
  ),
  nutritionQuestion(
    "Which choice best uses evidence from a label?",
    [
      "This cereal has more fiber and less added sugar per serving",
      "This box looks exciting",
      "This package is taller",
      "This brand name is easier to say",
    ],
    "This cereal has more fiber and less added sugar per serving",
    9
  ),
  nutritionQuestion(
    "A trail mix serving has nuts and dried fruit. Why might it be filling even in a small amount?",
    [
      "It can contain protein, fiber, and healthy fats",
      "It contains no energy",
      "It is mostly air",
      "It is always a drink",
    ],
    "It can contain protein, fiber, and healthy fats",
    9
  ),
  nutritionQuestion(
    "Which comparison shows the lowest added sugar per 100 grams?",
    ["Food A: 4 g", "Food B: 9 g", "Food C: 14 g", "Food D: 20 g"],
    "Food A: 4 g",
    9
  ),
  nutritionQuestion(
    "A child wants a snack before sports practice in one hour. Which is usually a reasonable choice?",
    [
      "Banana with yogurt and water",
      "Only an energy drink",
      "Only a large bag of candy",
      "Nothing but salt",
    ],
    "Banana with yogurt and water",
    9
  ),
  nutritionQuestion(
    "Which label would usually be best for an everyday soup choice?",
    [
      "Lower sodium, vegetables, and some protein",
      "Highest sodium and no vegetables",
      "Only sugar and water",
      "No ingredients listed",
    ],
    "Lower sodium, vegetables, and some protein",
    9
  ),
  nutritionQuestion(
    "Why can serving sizes make a small package surprising?",
    [
      "A small package can still contain more than one serving",
      "Serving sizes only apply to vegetables",
      "Small packages have no calories",
      "The label always counts the whole package as one serving",
    ],
    "A small package can still contain more than one serving",
    9
  ),
  nutritionQuestion(
    "Which is the best way to compare protein in two yogurts?",
    [
      "Compare grams of protein for the same serving size",
      "Choose the bigger logo",
      "Ignore the serving size",
      "Compare only the lid color",
    ],
    "Compare grams of protein for the same serving size",
    9
  ),

  // Level 10: multi-step reasoning and evidence-based food choices.
  nutritionQuestion(
    "A label says 4 servings per bag, 160 calories per serving, and 5 grams of fiber per serving. What are the totals for the whole bag?",
    [
      "640 calories and 20 grams fiber",
      "160 calories and 20 grams fiber",
      "640 calories and 5 grams fiber",
      "320 calories and 10 grams fiber",
    ],
    "640 calories and 20 grams fiber",
    10
  ),
  nutritionQuestion(
    "Which cereal is usually the strongest everyday choice?",
    [
      "Fiber 6 g, added sugar 3 g, whole oats first",
      "Fiber 0 g, added sugar 18 g, sugar first",
      "Fiber 1 g, added sugar 14 g, candy pieces",
      "Fiber 2 g, added sugar 16 g, syrup first",
    ],
    "Fiber 6 g, added sugar 3 g, whole oats first",
    10
  ),
  nutritionQuestion(
    "A smoothie has fruit, yogurt, and no added sugar. A soda has 39 grams of added sugar and no protein. Which evidence supports choosing the smoothie more often?",
    [
      "It provides fruit and protein with no added sugar",
      "It has a shorter straw",
      "It is colder",
      "It has fewer bubbles",
    ],
    "It provides fruit and protein with no added sugar",
    10
  ),
  nutritionQuestion(
    "Which statement shows the best nutrition reasoning?",
    [
      "No single food decides health; patterns and portions matter over time",
      "One cookie ruins all healthy eating forever",
      "Vegetables are only healthy if eaten alone",
      "A food is healthy only if the package is green",
    ],
    "No single food decides health; patterns and portions matter over time",
    10
  ),
  nutritionQuestion(
    "A child ate a salty lunch. Which dinner choice best balances the day?",
    [
      "Vegetable soup with beans, fruit, and water",
      "Extra salty chips and soda",
      "Only candy",
      "Nothing but crackers",
    ],
    "Vegetable soup with beans, fruit, and water",
    10
  ),
  nutritionQuestion(
    "Which food claim should be checked most carefully against the Nutrition Facts label?",
    [
      "A sugary cereal says \"part of a complete breakfast\"",
      "A carrot is orange",
      "A plain egg comes in a shell",
      "A cucumber contains water",
    ],
    "A sugary cereal says \"part of a complete breakfast\"",
    10
  ),
  nutritionQuestion(
    "Which lunch best balances energy, protein, fiber, and vegetables?",
    [
      "Lentil stew, brown rice, salad, fruit, and water",
      "Soda, candy, and chips",
      "Only white bread",
      "Only dessert",
    ],
    "Lentil stew, brown rice, salad, fruit, and water",
    10
  ),
  nutritionQuestion(
    "A snack has 2 servings. Each serving has 210 calories, 9 grams added sugar, and 250 mg sodium. What are the package totals?",
    [
      "420 calories, 18 grams added sugar, 500 mg sodium",
      "210 calories, 18 grams added sugar, 250 mg sodium",
      "420 calories, 9 grams added sugar, 250 mg sodium",
      "500 calories, 18 grams added sugar, 420 mg sodium",
    ],
    "420 calories, 18 grams added sugar, 500 mg sodium",
    10
  ),
];

function createNutritionGeneratedEntry(difficulty) {
  const level = nutritionClampDifficulty(difficulty);
  const generatorsByLevel = {
    1: [
      nutritionCreateProteinQuestion,
      nutritionCreateBetterSnackQuestion,
      nutritionCreateHydrationQuestion,
      nutritionCreateFoodGroupQuestion,
    ],
    2: [
      nutritionCreateServingSizeQuestion,
      nutritionCreateProteinQuestion,
      nutritionCreateCalciumFiberQuestion,
      nutritionCreateSimpleNutrientMathQuestion,
    ],
    3: [
      nutritionCreateSugarComparisonQuestion,
      nutritionCreateLabelMathQuestion,
      nutritionCreateFiberQuestion,
      nutritionCreateServingComparisonQuestion,
    ],
    4: [
      nutritionCreateBalancedPlateQuestion,
      nutritionCreateSodiumComparisonQuestion,
      nutritionCreateIngredientOrderQuestion,
      nutritionCreateLunchBalanceQuestion,
    ],
    5: [
      nutritionCreateTotalSugarQuestion,
      nutritionCreateFiberQuestion,
      nutritionCreateSodiumMathQuestion,
      nutritionCreateFillingSnackQuestion,
    ],
    6: [
      nutritionCreateDailyValueQuestion,
      nutritionCreateDecimalServingQuestion,
      nutritionCreateSodiumComparisonQuestion,
      nutritionCreateCarbProteinPairQuestion,
    ],
    7: [
      nutritionCreateTwoNutrientComparisonQuestion,
      nutritionCreateIngredientReasoningQuestion,
      nutritionCreateDailyValueMathQuestion,
      nutritionCreateMarketingClaimQuestion,
    ],
    8: [
      nutritionCreateThreeServingTotalsQuestion,
      nutritionCreateMealPlanningQuestion,
      nutritionCreateHighFiberCerealQuestion,
      nutritionCreateHealthyFatQuestion,
    ],
    9: [
      nutritionCreateClaimCheckQuestion,
      nutritionCreatePerHundredComparisonQuestion,
      nutritionCreateSportsSnackQuestion,
      nutritionCreateProteinComparisonQuestion,
    ],
    10: [
      nutritionCreateMultiNutrientTotalsQuestion,
      nutritionCreateBestCerealQuestion,
      nutritionCreateNutritionPatternQuestion,
      nutritionCreateEvidenceChoiceQuestion,
    ],
  };

  return {
    ...nutritionPick(generatorsByLevel[level])(),
    difficulty: level,
  };
}

function nutritionCreateProteinQuestion() {
  const templates = [
    nutritionQuestion(
      "Which food is usually highest in protein?",
      ["Eggs", "Soda", "Candy", "Popcorn"],
      "Eggs",
      1
    ),
    nutritionQuestion(
      "Which snack is usually the better source of protein?",
      ["Yogurt", "Lollipop", "Soda", "Gummy bears"],
      "Yogurt",
      1
    ),
    nutritionQuestion(
      "Which food helps build and repair muscles?",
      ["Beans", "Soda", "Cotton candy", "Hard candy"],
      "Beans",
      1
    ),
  ];

  return nutritionPick(templates);
}

function nutritionCreateBetterSnackQuestion() {
  const templates = [
    nutritionQuestion(
      "Which snack is usually the better everyday choice?",
      ["An apple", "A lollipop", "A soda", "A candy bar"],
      "An apple",
      1
    ),
    nutritionQuestion(
      "Which breakfast is usually the healthiest choice?",
      ["Oatmeal with fruit", "A bowl of candy", "Three sodas", "A pack of gum"],
      "Oatmeal with fruit",
      1
    ),
    nutritionQuestion(
      "Which after-school snack gives fruit plus protein?",
      ["Apple slices with yogurt", "Soda", "Candy only", "Ice cubes"],
      "Apple slices with yogurt",
      1
    ),
  ];

  return nutritionPick(templates);
}

function nutritionCreateHydrationQuestion() {
  const templates = [
    nutritionQuestion(
      "Which drink is usually best after normal active play?",
      ["Water", "Soda", "Energy drink", "Candy syrup"],
      "Water",
      1
    ),
    nutritionQuestion(
      "What does water help your body do?",
      ["Stay hydrated", "Turn food into toys", "Replace sleep", "Make candy a vegetable"],
      "Stay hydrated",
      1
    ),
  ];

  return nutritionPick(templates);
}

function nutritionCreateFoodGroupQuestion() {
  const templates = [
    nutritionQuestion("Which food is a vegetable?", ["Cucumber", "Soda", "Candy", "Gum"], "Cucumber", 1),
    nutritionQuestion("Which food is a fruit?", ["Orange", "Chicken", "Rice", "Cheese"], "Orange", 1),
    nutritionQuestion("Which food is a grain?", ["Bread", "Fish", "Apple", "Milk"], "Bread", 1),
  ];

  return nutritionPick(templates);
}

function nutritionCreateServingSizeQuestion() {
  const servings = nutritionRandomChoice([2, 3, 4]);
  const caloriesPerServing = nutritionRandomChoice([90, 100, 120, 150]);
  const answer = servings * caloriesPerServing;

  return nutritionQuestion(
    `A package has ${servings} servings and ${caloriesPerServing} calories per serving. How many calories are in the whole package?`,
    nutritionBuildNumberOptions(answer, [answer - caloriesPerServing, answer + caloriesPerServing, answer + 2 * caloriesPerServing]),
    String(answer),
    2
  );
}

function nutritionCreateCalciumFiberQuestion() {
  const templates = [
    nutritionQuestion("Which food is a good source of calcium?", ["Milk", "Candy", "Chips", "Soda"], "Milk", 2),
    nutritionQuestion("Which food is a good source of fiber?", ["Beans", "Candy", "Soda", "Marshmallows"], "Beans", 2),
    nutritionQuestion("What does fiber help with most?", ["Digestion", "Making food glow", "Turning water blue", "Adding bubbles"], "Digestion", 2),
  ];

  return nutritionPick(templates);
}

function nutritionCreateSimpleNutrientMathQuestion() {
  const servings = nutritionRandomChoice([2, 3]);
  const proteinPerServing = nutritionRandomChoice([4, 5, 6, 7]);
  const answer = servings * proteinPerServing;

  return nutritionQuestion(
    `A yogurt has ${proteinPerServing} grams of protein per serving. If you eat ${servings} servings, how much protein is that?`,
    nutritionBuildNumberOptions(answer, [answer - proteinPerServing, answer + proteinPerServing, answer + 2]),
    String(answer),
    2
  );
}

function nutritionCreateLabelMathQuestion() {
  const servings = nutritionRandomChoice([2, 3, 4]);
  const sugarPerServing = nutritionRandomChoice([5, 6, 7, 8, 9]);
  const answer = servings * sugarPerServing;

  return nutritionQuestion(
    `A snack has ${sugarPerServing} grams of sugar per serving and ${servings} servings. How much sugar is that altogether?`,
    nutritionBuildNumberOptions(answer, [answer - sugarPerServing, answer + sugarPerServing, answer + 10]),
    String(answer),
    3
  );
}

function nutritionCreateSugarComparisonQuestion() {
  const left = nutritionRandomChoice([4, 6, 8, 10]);
  const right = left + nutritionRandomChoice([2, 3, 4, 5]);

  return nutritionQuestion(
    "Which cereal is usually the better choice if you want less added sugar?",
    [
      `Cereal A: ${left} grams of added sugar`,
      `Cereal B: ${right} grams of added sugar`,
      "The box with more cartoons",
      "The box with the brightest colors",
    ],
    `Cereal A: ${left} grams of added sugar`,
    3
  );
}

function nutritionCreateFiberQuestion() {
  const templates = [
    nutritionQuestion("Which food is a good source of fiber?", ["Beans", "Candy", "Soda", "Marshmallows"], "Beans", 3),
    nutritionQuestion("What does the fiber in food help with most?", ["Helping digestion", "Making food louder", "Turning food blue", "Adding bubbles"], "Helping digestion", 3),
    nutritionQuestion("Which food usually has more fiber?", ["Lentil soup", "Soda", "Lollipop", "Cotton candy"], "Lentil soup", 3),
  ];

  return nutritionPick(templates);
}

function nutritionCreateServingComparisonQuestion() {
  return nutritionQuestion(
    "Why should you check serving size before comparing two snacks?",
    [
      "The nutrition numbers are based on that amount",
      "It tells you which wrapper is prettier",
      "It makes all foods identical",
      "It changes the store price",
    ],
    "The nutrition numbers are based on that amount",
    3
  );
}

function nutritionCreateBalancedPlateQuestion() {
  return nutritionQuestion(
    "On a balanced plate, about what should fill half the plate?",
    ["Fruits and vegetables", "Only meat", "Only dessert", "Only bread"],
    "Fruits and vegetables",
    4
  );
}

function nutritionCreateSodiumComparisonQuestion() {
  const sodiumA = nutritionRandomChoice([90, 100, 120, 140, 180, 220, 300, 420]);
  const sodiumB = sodiumA + nutritionRandomChoice([30, 40, 50, 80, 120, 180]);

  return nutritionQuestion(
    "Which snack has less sodium?",
    [
      `Snack A: ${sodiumA} milligrams per serving`,
      `Snack B: ${sodiumB} milligrams per serving`,
      "The snack with the bigger package",
      "The snack with the most sugar",
    ],
    `Snack A: ${sodiumA} milligrams per serving`,
    4
  );
}

function nutritionCreateIngredientOrderQuestion() {
  const templates = [
    nutritionQuestion(
      "If the first ingredient on bread is whole wheat, what does that usually suggest?",
      ["It is mostly whole grain", "It has no calories", "It is a dessert", "It is not food"],
      "It is mostly whole grain",
      4
    ),
    nutritionQuestion(
      "Which ingredient list looks more like a whole-grain cereal?",
      ["Whole oats, raisins, cinnamon", "Sugar, syrup, candy", "Soda, dye, bubbles", "Salt, candy, frosting"],
      "Whole oats, raisins, cinnamon",
      4
    ),
  ];

  return nutritionPick(templates);
}

function nutritionCreateLunchBalanceQuestion() {
  return nutritionQuestion(
    "Which lunch includes a vegetable, protein, and grain?",
    [
      "Chicken sandwich with lettuce on whole wheat bread",
      "Only candy",
      "Only soda",
      "Only chips",
    ],
    "Chicken sandwich with lettuce on whole wheat bread",
    4
  );
}

function nutritionCreateTotalSugarQuestion() {
  const sugarPerServing = nutritionRandomChoice([6, 7, 8, 9, 10]);
  const servings = nutritionRandomChoice([2, 3, 4]);
  const answer = sugarPerServing * servings;

  return nutritionQuestion(
    `If a snack has ${sugarPerServing} grams of sugar per serving and you eat ${servings} servings, how much sugar do you eat?`,
    nutritionBuildNumberOptions(answer, [answer - sugarPerServing, answer + sugarPerServing, answer + 2 * sugarPerServing]),
    String(answer),
    5
  );
}

function nutritionCreateSodiumMathQuestion() {
  const sodiumPerServing = nutritionRandomChoice([110, 120, 140, 160, 200]);
  const servings = nutritionRandomChoice([2, 3]);
  const answer = sodiumPerServing * servings;

  return nutritionQuestion(
    `Crackers have ${sodiumPerServing} milligrams of sodium per serving. If you eat ${servings} servings, how much sodium is that?`,
    nutritionBuildNumberOptions(answer, [sodiumPerServing, answer - 40, answer + 60]),
    String(answer),
    5
  );
}

function nutritionCreateFillingSnackQuestion() {
  const templates = [
    nutritionQuestion(
      "Which snack is likely to keep you full longer?",
      ["Apple slices with peanut butter", "Soda", "Cotton candy", "Hard candy"],
      "Apple slices with peanut butter",
      5
    ),
    nutritionQuestion(
      "Which is a smart way to make a snack more filling?",
      ["Add protein or fiber", "Choose only sugar", "Remove all water", "Pick the brightest wrapper"],
      "Add protein or fiber",
      5
    ),
  ];

  return nutritionPick(templates);
}

function nutritionCreateDailyValueQuestion() {
  return nutritionQuestion(
    "A label says Vitamin C: 25% Daily Value. What does that mean?",
    [
      "One serving gives about one quarter of a day's suggested amount",
      "The food is 25% bigger",
      "The package is 25% empty",
      "You should eat exactly 25 servings",
    ],
    "One serving gives about one quarter of a day's suggested amount",
    6
  );
}

function nutritionCreateDecimalServingQuestion() {
  const sugarPerServing = nutritionRandomChoice([10, 12, 14]);
  const answer = Math.round(sugarPerServing * 2.5);

  return nutritionQuestion(
    `A bottle has 2.5 servings and ${sugarPerServing} grams of added sugar per serving. About how much added sugar is in the bottle?`,
    nutritionBuildNumberOptions(answer, [sugarPerServing * 2, sugarPerServing * 3, answer + 10]),
    String(answer),
    6
  );
}

function nutritionCreateCarbProteinPairQuestion() {
  const templates = [
    nutritionQuestion("Which food pairing gives carbohydrates plus protein?", ["Rice and beans", "Soda and candy", "Ice and salt", "Gum and water"], "Rice and beans", 6),
    nutritionQuestion("Which breakfast gives whole grain plus protein?", ["Oatmeal with milk", "Soda", "Candy only", "Plain sugar"], "Oatmeal with milk", 6),
  ];

  return nutritionPick(templates);
}

function nutritionCreateTwoNutrientComparisonQuestion() {
  return nutritionQuestion(
    "Which cereal is usually better for fiber and added sugar?",
    [
      "Cereal A: 5 g fiber, 4 g added sugar",
      "Cereal B: 1 g fiber, 15 g added sugar",
      "The box with the brighter color",
      "The box with the tallest letters",
    ],
    "Cereal A: 5 g fiber, 4 g added sugar",
    7
  );
}

function nutritionCreateIngredientReasoningQuestion() {
  return nutritionQuestion(
    "Which ingredient list suggests the most whole grain?",
    [
      "Whole oats, raisins, cinnamon",
      "Sugar, white flour, syrup",
      "Corn syrup, candy pieces, oil",
      "Salt, sugar, coloring",
    ],
    "Whole oats, raisins, cinnamon",
    7
  );
}

function nutritionCreateDailyValueMathQuestion() {
  const percent = nutritionRandomChoice([10, 15, 20]);
  const servings = nutritionRandomChoice([2, 3]);
  const answer = percent * servings;

  return nutritionQuestion(
    `A label says ${percent}% Daily Value for calcium per serving. If you eat ${servings} servings, about how much Daily Value is that?`,
    nutritionBuildPercentOptions(answer, [percent, answer - percent, answer + percent]),
    `${answer}%`,
    7
  );
}

function nutritionCreateMarketingClaimQuestion() {
  return nutritionQuestion(
    "Why is \"made with real fruit\" not enough by itself to judge a snack?",
    [
      "It may still have lots of added sugar",
      "It means the snack has no calories",
      "It proves there is no salt",
      "It replaces the nutrition label",
    ],
    "It may still have lots of added sugar",
    7
  );
}

function nutritionCreateThreeServingTotalsQuestion() {
  const servings = 3;
  const calories = nutritionRandomChoice([100, 110, 120, 140]);
  const sugar = nutritionRandomChoice([4, 5, 6, 7]);
  const totalCalories = servings * calories;
  const totalSugar = servings * sugar;

  return nutritionQuestion(
    `A snack pack has ${servings} servings. Each serving has ${calories} calories and ${sugar} grams of added sugar. What are the totals for the whole pack?`,
    [
      `${totalCalories} calories and ${totalSugar} grams added sugar`,
      `${calories} calories and ${totalSugar} grams added sugar`,
      `${totalCalories} calories and ${sugar} grams added sugar`,
      `${calories * 2} calories and ${sugar * 2} grams added sugar`,
    ],
    `${totalCalories} calories and ${totalSugar} grams added sugar`,
    8
  );
}

function nutritionCreateMealPlanningQuestion() {
  return nutritionQuestion(
    "Which lunch is most balanced for everyday eating?",
    [
      "Chicken, whole-grain couscous, salad, fruit, and water",
      "Only fries and soda",
      "Only cookies",
      "Only white rice with no other foods",
    ],
    "Chicken, whole-grain couscous, salad, fruit, and water",
    8
  );
}

function nutritionCreateHighFiberCerealQuestion() {
  return nutritionQuestion(
    "Which food label would usually be best for a high-fiber cereal?",
    [
      "Fiber 7 g, added sugar 4 g",
      "Fiber 1 g, added sugar 18 g",
      "Fiber 0 g, added sugar 20 g",
      "Fiber 2 g, added sugar 16 g",
    ],
    "Fiber 7 g, added sugar 4 g",
    8
  );
}

function nutritionCreateHealthyFatQuestion() {
  return nutritionQuestion(
    "What is a good reason to include healthy fats like avocado, olive oil, or nuts?",
    [
      "They help meals be satisfying and support body functions",
      "They make vegetables stop being vegetables",
      "They have no energy",
      "They replace all other food groups",
    ],
    "They help meals be satisfying and support body functions",
    8
  );
}

function nutritionCreateClaimCheckQuestion() {
  return nutritionQuestion(
    "A package says \"low fat\" but has 22 grams of added sugar per serving. What should you think?",
    [
      "Check the whole label, because one claim does not tell everything",
      "It must be the healthiest food",
      "Added sugar no longer matters",
      "The serving size is always one bite",
    ],
    "Check the whole label, because one claim does not tell everything",
    9
  );
}

function nutritionCreatePerHundredComparisonQuestion() {
  const values = nutritionShuffle([4, 9, 14, 20]);
  const best = Math.min(...values);
  const options = values.map((value, index) => `Food ${String.fromCharCode(65 + index)}: ${value} g`);
  const answerIndex = values.indexOf(best);

  return nutritionQuestion(
    "Which comparison shows the lowest added sugar per 100 grams?",
    options,
    options[answerIndex],
    9
  );
}

function nutritionCreateSportsSnackQuestion() {
  return nutritionQuestion(
    "A child wants a snack before sports practice in one hour. Which is usually a reasonable choice?",
    [
      "Banana with yogurt and water",
      "Only an energy drink",
      "Only a large bag of candy",
      "Nothing but salt",
    ],
    "Banana with yogurt and water",
    9
  );
}

function nutritionCreateProteinComparisonQuestion() {
  return nutritionQuestion(
    "Which is the best way to compare protein in two yogurts?",
    [
      "Compare grams of protein for the same serving size",
      "Choose the bigger logo",
      "Ignore the serving size",
      "Compare only the lid color",
    ],
    "Compare grams of protein for the same serving size",
    9
  );
}

function nutritionCreateMultiNutrientTotalsQuestion() {
  const servings = nutritionRandomChoice([2, 4]);
  const calories = nutritionRandomChoice([160, 180, 210]);
  const sugar = nutritionRandomChoice([5, 7, 9]);
  const sodium = nutritionRandomChoice([120, 180, 250]);
  const totalCalories = servings * calories;
  const totalSugar = servings * sugar;
  const totalSodium = servings * sodium;

  return nutritionQuestion(
    `A snack has ${servings} servings. Each serving has ${calories} calories, ${sugar} grams added sugar, and ${sodium} mg sodium. What are the package totals?`,
    [
      `${totalCalories} calories, ${totalSugar} grams added sugar, ${totalSodium} mg sodium`,
      `${calories} calories, ${totalSugar} grams added sugar, ${sodium} mg sodium`,
      `${totalCalories} calories, ${sugar} grams added sugar, ${sodium} mg sodium`,
      `${totalCalories + 80} calories, ${totalSugar} grams added sugar, ${totalSodium - sodium} mg sodium`,
    ],
    `${totalCalories} calories, ${totalSugar} grams added sugar, ${totalSodium} mg sodium`,
    10
  );
}

function nutritionCreateBestCerealQuestion() {
  return nutritionQuestion(
    "Which cereal is usually the strongest everyday choice?",
    [
      "Fiber 6 g, added sugar 3 g, whole oats first",
      "Fiber 0 g, added sugar 18 g, sugar first",
      "Fiber 1 g, added sugar 14 g, candy pieces",
      "Fiber 2 g, added sugar 16 g, syrup first",
    ],
    "Fiber 6 g, added sugar 3 g, whole oats first",
    10
  );
}

function nutritionCreateNutritionPatternQuestion() {
  return nutritionQuestion(
    "Which statement shows the best nutrition reasoning?",
    [
      "No single food decides health; patterns and portions matter over time",
      "One cookie ruins all healthy eating forever",
      "Vegetables are only healthy if eaten alone",
      "A food is healthy only if the package is green",
    ],
    "No single food decides health; patterns and portions matter over time",
    10
  );
}

function nutritionCreateEvidenceChoiceQuestion() {
  return nutritionQuestion(
    "Which choice best uses evidence from a food label?",
    [
      "This food has more fiber and less added sugar per serving",
      "This package looks exciting",
      "This box is taller",
      "This brand name is easier to say",
    ],
    "This food has more fiber and less added sugar per serving",
    10
  );
}

function nutritionBuildNumberOptions(answer, candidates) {
  const normalizedAnswer = String(answer);
  const options = nutritionBuildUniqueOptions([normalizedAnswer, ...candidates.map(String)]);
  if (options.length !== 4 || !options.includes(normalizedAnswer)) {
    throw new Error("Nutrition generator produced invalid numeric options.");
  }
  return nutritionShuffle(options);
}

function nutritionBuildPercentOptions(answer, candidates) {
  const normalizedAnswer = `${answer}%`;
  const options = nutritionBuildUniqueOptions([
    normalizedAnswer,
    ...candidates.map((candidate) => `${candidate}%`),
  ]);
  if (options.length !== 4 || !options.includes(normalizedAnswer)) {
    throw new Error("Nutrition generator produced invalid percent options.");
  }
  return nutritionShuffle(options);
}

function nutritionBuildUniqueOptions(values) {
  const unique = [];
  for (const value of values) {
    const text = String(value);
    if (text && !unique.includes(text)) {
      unique.push(text);
    }
  }

  let fallback = 1;
  while (unique.length < 4) {
    const fallbackValue = `About ${fallback * 10}`;
    if (!unique.includes(fallbackValue)) {
      unique.push(fallbackValue);
    }
    fallback += 1;
  }

  return unique.slice(0, 4);
}

function nutritionClampDifficulty(difficulty) {
  const value = Number.parseInt(difficulty, 10);
  if (!Number.isFinite(value)) {
    return 3;
  }
  return Math.min(10, Math.max(1, value));
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

(() => {
  const questionUtils = globalThis.HomeworkQuestionUtils;
  if (!questionUtils) {
    return;
  }
  const { entry, numberOptions, pickGeneratedEntry, randomChoice, randomInt, renderTable } =
    questionUtils;

  function createRecipeQuestion(difficulty) {
    const ingredient = randomChoice(["flour", "rice", "oats", "sugar"]);
    const amount = randomChoice([1, 2, 3, 4]);
    const batches = randomInt(2, difficulty >= 6 ? 5 : 3);
    const answer = amount * batches;
    return entry({
      topic: "nutrition-recipes",
      difficulty,
      question: `A recipe needs ${amount} cups of ${ingredient} for one batch. How much for ${batches} batches?`,
      answer: `${answer} cups`,
      options: numberOptions(answer, [-amount, -1, 1, amount, batches], 1).map((value) => `${value} cups`),
    });
  }

  function createLabelQuestion(difficulty) {
    const serving = randomChoice([1, 2, 3]);
    const calories = randomChoice([80, 120, 150, 210]);
    const sugar = randomChoice([4, 8, 12, 16]);
    const askCalories = Math.random() < 0.5;
    return entry({
      topic: "nutrition-reading-labels",
      difficulty,
      question: askCalories ? "How many calories are in two servings?" : "Which label item tells you the amount counted as one serving?",
      visualHtml: renderTable("Snack label", [["Serving size", `${serving} cup`], ["Calories", calories], ["Added sugar", `${sugar} g`]]),
      answer: askCalories ? `${calories * 2} calories` : "Serving size",
      options: askCalories
        ? [`${calories * 2} calories`, `${calories} calories`, `${calories + 2} calories`, `${sugar * 2} calories`]
        : ["Serving size", "Brand logo", "Package color", "Barcode"],
    });
  }

  globalThis.createNutritionPracticalGeneratedEntry = (difficulty) =>
    pickGeneratedEntry([createRecipeQuestion, createLabelQuestion], difficulty);
})();

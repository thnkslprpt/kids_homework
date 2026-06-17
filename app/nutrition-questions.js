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


  // Additional Level 1 questions: food and drink basics.
  nutritionQuestion(
    "Which food is a dairy food?",
    ["Milk", "Chicken", "Bread", "Soda"],
    "Milk",
    1
  ),
  nutritionQuestion(
    "Which food is a grain?",
    ["Rice", "Egg", "Apple", "Carrot"],
    "Rice",
    1
  ),
  nutritionQuestion(
    "Which snack includes a vegetable?",
    ["Carrot sticks", "Gummy worms", "Soda", "Cotton candy"],
    "Carrot sticks",
    1
  ),
  nutritionQuestion(
    "Which food is usually in the protein group?",
    ["Chicken", "Lemonade", "Jelly beans", "Frosting"],
    "Chicken",
    1
  ),
  nutritionQuestion(
    "Which drink has no added sugar by itself?",
    ["Plain water", "Soda", "Fruit punch", "Chocolate syrup"],
    "Plain water",
    1
  ),
  nutritionQuestion(
    "Which choice has a fruit in it?",
    ["Orange slices", "Potato chips", "Plain crackers", "Cheese cubes"],
    "Orange slices",
    1
  ),
  nutritionQuestion(
    "Which food is usually a better everyday snack than a candy bar?",
    ["Pear slices", "A candy bar", "A bag of marshmallows", "A cup of soda"],
    "Pear slices",
    1
  ),
  nutritionQuestion(
    "Which plate has more variety?",
    ["Rice, beans, broccoli, and fruit", "Only candy", "Only soda", "Only chips"],
    "Rice, beans, broccoli, and fruit",
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


  // Additional Level 2 questions: simple label math and nutrient jobs.
  nutritionQuestion(
    "A snack has 3 servings and 100 calories per serving. How many calories are in the whole snack?",
    ["100", "200", "300", "400"],
    "300",
    2
  ),
  nutritionQuestion(
    "What does calcium help build and keep strong?",
    ["Bones and teeth", "Soda bubbles", "Candy wrappers", "Food coloring"],
    "Bones and teeth",
    2
  ),
  nutritionQuestion(
    "Which snack gives both protein and a grain?",
    ["Peanut butter on whole-grain toast", "Soda with ice", "Candy with frosting", "Gum with water"],
    "Peanut butter on whole-grain toast",
    2
  ),
  nutritionQuestion(
    "Which choice is whole fruit instead of a sugary drink?",
    ["Orange wedges", "Fruit punch", "Soda", "Candy syrup"],
    "Orange wedges",
    2
  ),
  nutritionQuestion(
    "A food has 4 grams of fiber per serving. If you eat 2 servings, how much fiber is that?",
    ["4 grams", "6 grams", "8 grams", "12 grams"],
    "8 grams",
    2
  ),
  nutritionQuestion(
    "Which label line tells how many servings are in the package?",
    ["Servings per container", "Mascot name", "Package color", "Store aisle"],
    "Servings per container",
    2
  ),
  nutritionQuestion(
    "Which food usually gives natural sweetness plus fiber?",
    ["A pear", "A soda", "A lollipop", "A spoon of sugar"],
    "A pear",
    2
  ),
  nutritionQuestion(
    "Which label number tells how much energy a food gives?",
    ["Calories", "Barcode", "Package width", "Brand slogan"],
    "Calories",
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


  // Additional Level 3 questions: added sugar, fiber, and fair comparisons.
  nutritionQuestion(
    "Two cereals have the same serving size. Which has less added sugar?",
    ["Cereal A: 4 grams", "Cereal B: 11 grams", "The cereal with stars", "The cereal in a taller box"],
    "Cereal A: 4 grams",
    3
  ),
  nutritionQuestion(
    "Which drink is usually the better everyday choice based on added sugar?",
    ["Water: 0 grams added sugar", "Fruit drink: 18 grams added sugar", "Soda: 25 grams added sugar", "Sweet tea: 20 grams added sugar"],
    "Water: 0 grams added sugar",
    3
  ),
  nutritionQuestion(
    "A granola bar has 7 grams of added sugar per serving. If you eat 2 servings, how much added sugar is that?",
    ["7 grams", "10 grams", "14 grams", "21 grams"],
    "14 grams",
    3
  ),
  nutritionQuestion(
    "When comparing two snack labels, what should be the same first?",
    ["Serving size", "Wrapper color", "Picture size", "Shelf height"],
    "Serving size",
    3
  ),
  nutritionQuestion(
    "If sugar is the first ingredient on a snack label, what does that usually mean?",
    ["Sugar is one of the main ingredients", "The snack has no sugar", "The package is empty", "The food is a vegetable"],
    "Sugar is one of the main ingredients",
    3
  ),
  nutritionQuestion(
    "Which snack is most likely to give fiber?",
    ["Whole-grain crackers with pear slices", "Hard candy", "Soda", "Cotton candy"],
    "Whole-grain crackers with pear slices",
    3
  ),
  nutritionQuestion(
    "Which label clue can help you choose a cereal that may keep you full longer?",
    ["More fiber per serving", "A brighter box", "A bigger cartoon", "A longer brand name"],
    "More fiber per serving",
    3
  ),
  nutritionQuestion(
    "What does total sugar include on a Nutrition Facts label?",
    ["Natural sugar plus added sugar", "Only package color", "Only salt", "Only protein"],
    "Natural sugar plus added sugar",
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


  // Additional Level 4 questions: balanced plates, ingredients, and sodium basics.
  nutritionQuestion(
    "On a balanced plate, about one quarter can be a protein food. Which choice is a protein food?",
    ["Beans", "Soda", "Gummy candy", "Frosting"],
    "Beans",
    4
  ),
  nutritionQuestion(
    "If the first ingredient on a cookie label is sugar, what does that usually suggest?",
    ["Sugar is a main ingredient", "The cookie has no calories", "The cookie is a vegetable", "The package is water"],
    "Sugar is a main ingredient",
    4
  ),
  nutritionQuestion(
    "Which soup has less sodium per serving?",
    ["Soup A: 240 mg", "Soup B: 480 mg", "Soup C: 650 mg", "Soup D: 900 mg"],
    "Soup A: 240 mg",
    4
  ),
  nutritionQuestion(
    "A soup has 250 mg of sodium per serving and 3 servings in the can. How much sodium is in the whole can?",
    ["250 mg", "500 mg", "750 mg", "1,000 mg"],
    "750 mg",
    4
  ),
  nutritionQuestion(
    "Which lunch includes fruit, a vegetable, a grain, and protein?",
    ["Chicken wrap with lettuce and apple slices", "Only cookies", "Only soda", "Only plain chips"],
    "Chicken wrap with lettuce and apple slices",
    4
  ),
  nutritionQuestion(
    "Which bread choice is most clearly whole grain?",
    ["100% whole wheat bread", "White bread", "Candy bread", "Soda crackers with frosting"],
    "100% whole wheat bread",
    4
  ),
  nutritionQuestion(
    "Why can choosing lower-sodium foods be helpful?",
    ["It can support healthy blood pressure", "It turns food into water", "It removes all calories", "It makes labels unnecessary"],
    "It can support healthy blood pressure",
    4
  ),
  nutritionQuestion(
    "Which ingredient list sounds least processed?",
    ["Oats, raisins, cinnamon", "Sugar, syrup, dye, candy", "Soda flavor, dye, bubbles", "Frosting, sprinkles, syrup"],
    "Oats, raisins, cinnamon",
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


  // Additional Level 5 questions: multi-serving label calculations and everyday choices.
  nutritionQuestion(
    "A snack box has 3 servings and 130 calories per serving. How many calories are in the whole box?",
    ["130", "260", "390", "520"],
    "390",
    5
  ),
  nutritionQuestion(
    "A yogurt has 6 grams of protein per serving. If you eat 3 servings, how much protein is that?",
    ["6 grams", "12 grams", "18 grams", "24 grams"],
    "18 grams",
    5
  ),
  nutritionQuestion(
    "Which snack has the least added sugar?",
    ["Unsweetened applesauce", "Fruit snacks", "Soda", "Chocolate cookies"],
    "Unsweetened applesauce",
    5
  ),
  nutritionQuestion(
    "Which dinner has the best mix of food groups?",
    ["Salmon, quinoa, green beans, and orange slices", "Only candy", "Only soda", "Only white bread"],
    "Salmon, quinoa, green beans, and orange slices",
    5
  ),
  nutritionQuestion(
    "Which snack combines protein and fiber?",
    ["Greek yogurt with apple slices", "Soda", "Cotton candy", "Plain hard candy"],
    "Greek yogurt with apple slices",
    5
  ),
  nutritionQuestion(
    "Which bread label is usually better for getting more fiber?",
    ["Fiber: 4 grams", "Fiber: 1 gram", "Added sugar: 18 grams", "Sodium: 700 mg"],
    "Fiber: 4 grams",
    5
  ),
  nutritionQuestion(
    "Pretzels have 160 mg of sodium per serving. If you eat 2 servings, how much sodium is that?",
    ["160 mg", "240 mg", "320 mg", "480 mg"],
    "320 mg",
    5
  ),
  nutritionQuestion(
    "Which swap adds a vegetable to lunch?",
    ["Add cucumber slices to a sandwich", "Replace water with soda", "Remove the apple", "Eat only candy"],
    "Add cucumber slices to a sandwich",
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


  // Additional Level 6 questions: label trade-offs and percentages.
  nutritionQuestion(
    "A drink has 12 grams of added sugar per serving and 3 servings in the bottle. How much added sugar is in the bottle?",
    ["12 grams", "24 grams", "36 grams", "48 grams"],
    "36 grams",
    6
  ),
  nutritionQuestion(
    "A label says Iron: 20% Daily Value. What does that mean?",
    ["One serving gives about one fifth of a day's suggested amount", "The package is 20% iron", "You must eat 20 servings", "The food has 20 colors"],
    "One serving gives about one fifth of a day's suggested amount",
    6
  ),
  nutritionQuestion(
    "Which food gives the most fiber per serving?",
    ["Split peas: 8 grams", "White rice: 1 gram", "Soda: 0 grams", "Hard candy: 0 grams"],
    "Split peas: 8 grams",
    6
  ),
  nutritionQuestion(
    "Which food pairing gives carbohydrates plus protein?",
    ["Whole-wheat pita with hummus", "Soda and candy", "Ice and salt", "Gum and water"],
    "Whole-wheat pita with hummus",
    6
  ),
  nutritionQuestion(
    "A bottle has 2 servings and 250 calories per serving. How many calories are in the whole bottle?",
    ["250 calories", "375 calories", "500 calories", "750 calories"],
    "500 calories",
    6
  ),
  nutritionQuestion(
    "Which soup has less sodium per serving?",
    ["Soup A: 360 mg", "Soup B: 620 mg", "Soup C: 780 mg", "Soup D: 900 mg"],
    "Soup A: 360 mg",
    6
  ),
  nutritionQuestion(
    "What does % Daily Value help you compare?",
    ["How much of a nutrient one serving provides", "How bright the package is", "How loud the food crunches", "How tall the box is"],
    "How much of a nutrient one serving provides",
    6
  ),
  nutritionQuestion(
    "Based only on these labels, which snack is the better everyday choice?",
    ["Fiber 5 g, added sugar 4 g", "Fiber 1 g, added sugar 18 g", "Fiber 0 g, added sugar 20 g", "Fiber 2 g, added sugar 16 g"],
    "Fiber 5 g, added sugar 4 g",
    6
  ),

  // Level 7: unit comparisons and ingredient reasoning.
  nutritionQuestion(
    "Two yogurts have the same serving size. Yogurt A has 6 grams of added sugar and Yogurt B has 14 grams. Based only on these label facts, which is the better everyday choice?",
    ["Yogurt A", "Yogurt B", "Whichever has a cartoon", "Whichever has a bigger lid"],
    "Yogurt A",
    7
  ),
  nutritionQuestion(
    "A cereal serving has 4 grams of fiber and 8 grams of added sugar. A second cereal has 1 gram of fiber and 15 grams of added sugar. Based only on these label facts, which is better for fiber and sugar?",
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
    "A granola bar has 180 calories, 2 grams fiber, and 14 grams added sugar. A fruit-and-nut bar has 170 calories, 5 grams fiber, and 5 grams added sugar. Based only on these label facts, which is the better everyday choice?",
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


  // Additional Level 7 questions: unit comparisons and ingredient reasoning.
  nutritionQuestion(
    "Two yogurts have the same serving size. Which is better based on more protein and less added sugar?",
    ["Yogurt A: 12 g protein, 5 g added sugar", "Yogurt B: 6 g protein, 13 g added sugar", "The yogurt with a cartoon", "The yogurt with a bigger lid"],
    "Yogurt A: 12 g protein, 5 g added sugar",
    7
  ),
  nutritionQuestion(
    "A label says 12% Daily Value for vitamin D per serving. If you eat 2 servings, about how much Daily Value is that?",
    ["12%", "18%", "24%", "36%"],
    "24%",
    7
  ),
  nutritionQuestion(
    "Which ingredient list suggests the most whole-grain bread?",
    ["Whole wheat flour, water, yeast", "Sugar, white flour, syrup", "Corn syrup, frosting, dye", "Salt, candy pieces, oil"],
    "Whole wheat flour, water, yeast",
    7
  ),
  nutritionQuestion(
    "Why is the word \"multigrain\" not enough by itself to prove a bread is whole grain?",
    ["It may have several grains that are not whole grains", "It means the bread has no calories", "It proves the bread is a dessert", "It replaces the ingredient list"],
    "It may have several grains that are not whole grains",
    7
  ),
  nutritionQuestion(
    "A bar has 160 calories, 6 g fiber, and 3 g added sugar. Another bar has 160 calories, 1 g fiber, and 14 g added sugar. Which is better based on fiber and added sugar?",
    ["The first bar", "The second bar", "They are identical", "The wrapper color decides"],
    "The first bar",
    7
  ),
  nutritionQuestion(
    "Which choice best explains why nuts can make a snack filling?",
    ["They provide protein and healthy fats", "They contain no energy", "They are only decorations", "They turn into water"],
    "They provide protein and healthy fats",
    7
  ),
  nutritionQuestion(
    "Which meal would give steady energy for a school morning?",
    ["Oatmeal, milk, berries, and water", "Only soda", "Only candy", "Only frosting"],
    "Oatmeal, milk, berries, and water",
    7
  ),
  nutritionQuestion(
    "Two crackers have the same serving size. Which is the better choice based on sodium?",
    ["Cracker A: 110 mg sodium", "Cracker B: 320 mg sodium", "The cracker with the shinier bag", "The cracker with a bigger logo"],
    "Cracker A: 110 mg sodium",
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
    "Based only on the label information shown, which food label is best for a high-fiber cereal?",
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


  // Additional Level 8 questions: meal planning and label analysis.
  nutritionQuestion(
    "A snack pack has 4 servings. Each serving has 95 calories and 5 grams of added sugar. What are the totals for the whole pack?",
    ["380 calories and 20 grams added sugar", "95 calories and 20 grams added sugar", "380 calories and 5 grams added sugar", "190 calories and 10 grams added sugar"],
    "380 calories and 20 grams added sugar",
    8
  ),
  nutritionQuestion(
    "Which lunch is most balanced for everyday eating?",
    ["Turkey, brown rice, spinach salad, peach, and water", "Only fries and soda", "Only cookies", "Only white rice"],
    "Turkey, brown rice, spinach salad, peach, and water",
    8
  ),
  nutritionQuestion(
    "Based only on the label information shown, which cereal is best for fiber and added sugar?",
    ["Fiber 8 g, added sugar 5 g", "Fiber 1 g, added sugar 19 g", "Fiber 0 g, added sugar 22 g", "Fiber 2 g, added sugar 17 g"],
    "Fiber 8 g, added sugar 5 g",
    8
  ),
  nutritionQuestion(
    "Which choice adds healthy fat to a balanced meal?",
    ["Avocado slices", "Soda", "Cotton candy", "Hard candy"],
    "Avocado slices",
    8
  ),
  nutritionQuestion(
    "Which statement about whole grains is most accurate?",
    ["They can provide fiber and useful energy", "They are the same as candy", "They contain no nutrients", "They replace drinking water"],
    "They can provide fiber and useful energy",
    8
  ),
  nutritionQuestion(
    "A soup has 650 mg sodium per serving and 3 servings per container. What is the sodium total for the container?",
    ["650 mg", "1,300 mg", "1,950 mg", "2,600 mg"],
    "1,950 mg",
    8
  ),
  nutritionQuestion(
    "Two snacks have the same serving size. Which label is the stronger everyday choice?",
    ["Protein 8 g, fiber 5 g, added sugar 3 g", "Protein 2 g, fiber 1 g, added sugar 18 g", "Protein 0 g, fiber 0 g, added sugar 22 g", "Protein 1 g, fiber 1 g, added sugar 20 g"],
    "Protein 8 g, fiber 5 g, added sugar 3 g",
    8
  ),
  nutritionQuestion(
    "What is a good way to make a fruit smoothie more balanced?",
    ["Add plain yogurt for protein", "Add only candy syrup", "Remove all fruit", "Use soda instead of milk"],
    "Add plain yogurt for protein",
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
    "Based only on the label information shown, which label is best for an everyday soup choice?",
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


  // Additional Level 9 questions: claims, trade-offs, and nutrition decisions.
  nutritionQuestion(
    "A cookie package says \"organic\" but has 16 grams of added sugar per serving. What should you do?",
    ["Check the whole label before deciding", "Assume it has no sugar", "Ignore the serving size", "Eat the package label"],
    "Check the whole label before deciding",
    9
  ),
  nutritionQuestion(
    "Why can trail mix be filling in a small serving?",
    ["It can provide protein, fiber, and healthy fats", "It contains no energy", "It is mostly air", "It is always a drink"],
    "It can provide protein, fiber, and healthy fats",
    9
  ),
  nutritionQuestion(
    "Which food has the lowest added sugar per 100 grams?",
    ["Food A: 3 g", "Food B: 8 g", "Food C: 13 g", "Food D: 18 g"],
    "Food A: 3 g",
    9
  ),
  nutritionQuestion(
    "A child has sports practice in one hour. Which snack is usually a reasonable choice?",
    ["Whole-grain toast with banana and water", "Only an energy drink", "Only candy", "Nothing but salt"],
    "Whole-grain toast with banana and water",
    9
  ),
  nutritionQuestion(
    "Which evidence best supports choosing one soup more often?",
    ["It has lower sodium, vegetables, and beans", "It has the brightest can", "It has the biggest logo", "It is on the tallest shelf"],
    "It has lower sodium, vegetables, and beans",
    9
  ),
  nutritionQuestion(
    "Why can a small bag of chips still have a lot of calories or sodium?",
    ["The bag may contain more than one serving", "Small bags never have labels", "Sodium disappears in small bags", "Calories only count in big boxes"],
    "The bag may contain more than one serving",
    9
  ),
  nutritionQuestion(
    "Two yogurts have the same serving size. Which has more protein?",
    ["Yogurt A: 14 g protein", "Yogurt B: 8 g protein", "The yogurt with the blue lid", "The yogurt with a bigger picture"],
    "Yogurt A: 14 g protein",
    9
  ),
  nutritionQuestion(
    "A juice drink says \"contains vitamin C\" but has 28 grams of added sugar. What is the best conclusion?",
    ["The claim is only one fact, so check the full label", "The added sugar does not count", "It must be exactly the same as water", "The serving size is always one sip"],
    "The claim is only one fact, so check the full label",
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
    "Based only on the label information shown, which cereal is the strongest everyday choice?",
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

  // Additional Level 10 questions: multi-step reasoning and evidence-based food choices.
  nutritionQuestion(
    "A label says 5 servings per box, 140 calories per serving, and 4 grams of fiber per serving. What are the totals for the whole box?",
    ["700 calories and 20 grams fiber", "140 calories and 20 grams fiber", "700 calories and 4 grams fiber", "560 calories and 16 grams fiber"],
    "700 calories and 20 grams fiber",
    10
  ),
  nutritionQuestion(
    "Based only on the label information shown, which cereal is the strongest everyday choice?",
    ["Fiber 7 g, added sugar 2 g, whole wheat first", "Fiber 0 g, added sugar 20 g, sugar first", "Fiber 1 g, added sugar 16 g, syrup first", "Fiber 2 g, added sugar 15 g, candy pieces"],
    "Fiber 7 g, added sugar 2 g, whole wheat first",
    10
  ),
  nutritionQuestion(
    "A smoothie has fruit, plain yogurt, and no added sugar. A soda has 40 grams of added sugar and no protein. Which evidence supports choosing the smoothie more often?",
    ["It provides fruit and protein with no added sugar", "It has fewer bubbles", "It is served in a cup", "It can use a shorter straw"],
    "It provides fruit and protein with no added sugar",
    10
  ),
  nutritionQuestion(
    "Which statement shows the best nutrition reasoning?",
    ["Healthy eating is about patterns, portions, and variety over time", "One food decides health forever", "All packaged foods are identical", "Green packages are always healthiest"],
    "Healthy eating is about patterns, portions, and variety over time",
    10
  ),
  nutritionQuestion(
    "A child had a salty lunch. Which dinner choice best balances the day?",
    ["Beans, roasted vegetables, fruit, and water", "Extra salty chips and soda", "Only candy", "Only crackers"],
    "Beans, roasted vegetables, fruit, and water",
    10
  ),
  nutritionQuestion(
    "Which food claim should be checked most carefully against the Nutrition Facts label?",
    ["A sweet snack says \"made with whole grains\"", "A banana is yellow", "A plain egg has a shell", "A cucumber contains water"],
    "A sweet snack says \"made with whole grains\"",
    10
  ),
  nutritionQuestion(
    "Which lunch best balances energy, protein, fiber, and vegetables?",
    ["Bean chili, brown rice, salad, berries, and water", "Soda, candy, and chips", "Only white bread", "Only dessert"],
    "Bean chili, brown rice, salad, berries, and water",
    10
  ),
  nutritionQuestion(
    "A snack has 3 servings. Each serving has 180 calories, 6 grams added sugar, and 210 mg sodium. What are the package totals?",
    ["540 calories, 18 grams added sugar, 630 mg sodium", "180 calories, 18 grams added sugar, 210 mg sodium", "540 calories, 6 grams added sugar, 210 mg sodium", "630 calories, 18 grams added sugar, 540 mg sodium"],
    "540 calories, 18 grams added sugar, 630 mg sodium",
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
    "Based only on added sugar, which cereal is the better choice?",
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
    "Based only on fiber and added sugar, which cereal is better?",
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
    "Based only on the label information shown, which food label is best for a high-fiber cereal?",
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
    "Based only on the label information shown, which cereal is the strongest everyday choice?",
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
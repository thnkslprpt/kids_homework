function logicMakeQuestion(question, options, answer, difficulty, extra = {}) {
  const normalizedQuestion = String(question || "").trim();
  const normalizedOptions = Array.from(new Set((options || []).map((option) => String(option))));
  const normalizedAnswer = String(answer);
  const normalizedDifficulty = logicClampDifficulty(difficulty);

  if (!normalizedQuestion) {
    throw new Error("Logic question is missing question text.");
  }
  if (normalizedOptions.length !== 4 || !normalizedOptions.includes(normalizedAnswer)) {
    throw new Error(`Logic question must have exactly 4 unique options including the answer: ${normalizedQuestion}`);
  }

  return {
    question: normalizedQuestion,
    options: normalizedOptions,
    answer: normalizedAnswer,
    difficulty: normalizedDifficulty,
    ...extra,
  };
}

const LOGIC_QUESTIONS = [
  // Level 1: simple patterns, categories, direct clues, and basic deduction.
  logicMakeQuestion("If all squares have 4 sides, which must be true?", ["Every triangle has 4 sides", "A square has 4 sides", "Every 4-sided shape is a square", "A square is a circle"], "A square has 4 sides", 1),
  logicMakeQuestion("Which number does not belong with the even numbers?", ["2", "4", "6", "9"], "9", 1),
  logicMakeQuestion("Noga is older than Gideon. Gideon is older than Teva. Who is youngest?", ["Noga", "Gideon", "Teva", "You cannot tell"], "Teva", 1),
  logicMakeQuestion("What comes next in the pattern: circle, square, circle, square, __", ["Triangle", "Circle", "Square", "Star"], "Circle", 1),
  logicMakeQuestion("If every robin is a bird and this animal is a robin, what is it also?", ["A fish", "A bird", "A reptile", "A mammal"], "A bird", 1),
  logicMakeQuestion("Which object does not belong with the animals?", ["Cat", "Dog", "Fish", "Chair"], "Chair", 1),
  logicMakeQuestion("What comes next: red, blue, red, blue, __", ["Red", "Blue", "Green", "Yellow"], "Red", 1),
  logicMakeQuestion("If all apples are fruit and this is an apple, what is it?", ["A vegetable", "A fruit", "A toy", "A rock"], "A fruit", 1),
  logicMakeQuestion("Which number is smallest: 3, 7, 5, 9?", ["3", "5", "7", "9"], "3", 1),
  logicMakeQuestion("Gabriel is taller than Gideon. Gideon is taller than Teva. Who is tallest?", ["Gabriel", "Gideon", "Teva", "You cannot tell"], "Gabriel", 1),
  logicMakeQuestion("What comes next: 2, 4, 6, __", ["7", "8", "9", "10"], "8", 1),
  logicMakeQuestion("If no birds are fish and this animal is a bird, what is true?", ["It is a fish", "It is not a fish", "It is a rock", "It is a turtle"], "It is not a fish", 1),

  // Level 2: skip counting, simple ordering, easy conditionals, and odd-one-out reasoning.
  logicMakeQuestion("Which letter comes next: A, C, E, G, __", ["H", "I", "J", "K"], "I", 2),
  logicMakeQuestion("Gabriel is left of Noga. Noga is left of Eden. Who is in the middle?", ["Gabriel", "Noga", "Eden", "No one"], "Noga", 2),
  logicMakeQuestion("Which set follows the same rule as 3, 6, 9, 12?", ["5, 10, 15, 20", "4, 7, 10, 12", "2, 5, 7, 10", "1, 2, 4, 8"], "5, 10, 15, 20", 2),
  logicMakeQuestion("If no cats are dogs and Pip is a cat, what do we know?", ["Pip is a dog", "Pip is not a dog", "Pip is a fish", "We know nothing"], "Pip is not a dog", 2),
  logicMakeQuestion("Which is the odd one out?", ["Triangle", "Square", "Rectangle", "Apple"], "Apple", 2),
  logicMakeQuestion("Noga finished before Gabriel. Gabriel finished before Eden. Who finished last?", ["Noga", "Gabriel", "Eden", "They tied"], "Eden", 2),
  logicMakeQuestion("Which number comes next: 5, 10, 15, 20, __", ["22", "24", "25", "30"], "25", 2),
  logicMakeQuestion("If the light is on, the room is bright. The light is on. What must be true?", ["The room is bright", "The room is dark", "It is night", "Nothing"], "The room is bright", 2),
  logicMakeQuestion("Which word does not belong?", ["Monday", "Tuesday", "April", "Wednesday"], "April", 2),
  logicMakeQuestion("If every kite needs string and this is a kite, what must be true?", ["It needs string", "It needs water", "It needs wheels", "It needs roots"], "It needs string", 2),
  logicMakeQuestion("What comes next: green, yellow, green, yellow, __", ["Green", "Yellow", "Blue", "Red"], "Green", 2),
  logicMakeQuestion("Which set follows the same rule as 1, 4, 7, 10?", ["2, 5, 8, 11", "3, 6, 12, 24", "4, 8, 12, 15", "5, 10, 15, 21"], "2, 5, 8, 11", 2),

  // Level 3: longer patterns, two-step deductions, simple elimination, and transitive logic.
  logicMakeQuestion("Gabriel finished before Eden. Eden finished before Teva. Who finished last?", ["Gabriel", "Eden", "Teva", "They tied"], "Teva", 3),
  logicMakeQuestion("Which number comes next: 1, 4, 7, 10, __", ["11", "12", "13", "14"], "13", 3),
  logicMakeQuestion("Which rule matches this pattern: 10, 8, 6, 4, __", ["Add 2 each time", "Subtract 2 each time", "Double each time", "Subtract 4 each time"], "Subtract 2 each time", 3),
  logicMakeQuestion("The red book is heavier than the blue book. The blue book is heavier than the green book. Which book is lightest?", ["Red book", "Blue book", "Green book", "The red and blue books tie"], "Green book", 3),
  logicMakeQuestion("If every insect has 6 legs and an ant is an insect, what must be true?", ["An ant has 6 legs", "Every 6-legged animal is an ant", "Ants are not insects", "An ant has 8 legs"], "An ant has 6 legs", 3),
  logicMakeQuestion("The bag is not in the closet. It is either under the bed or by the door. It is not under the bed. Where is the bag?", ["In the closet", "By the door", "On the roof", "In the sink"], "By the door", 3),
  logicMakeQuestion("Which letter comes next: Z, X, V, T, __", ["R", "S", "U", "W"], "R", 3),
  logicMakeQuestion("If weekdays are school days and Monday is a weekday, what follows?", ["Monday is a school day", "Monday is a weekend day", "Monday is a holiday", "Monday is a night"], "Monday is a school day", 3),
  logicMakeQuestion("Three kids wore red, blue, and green shirts. Teva did not wear red. Noga did not wear blue. Eden wore green. Who wore blue?", ["Teva", "Noga", "Eden", "No one"], "Teva", 3),
  logicMakeQuestion("What comes next: 24, 20, 16, 12, __", ["6", "8", "10", "14"], "8", 3),
  logicMakeQuestion("If all squares are shapes and all shapes can be drawn, what must be true about squares?", ["They can be drawn", "They are vegetables", "They are circles", "They cannot be drawn"], "They can be drawn", 3),
  logicMakeQuestion("Which number comes next: 12, 9, 6, 3, __", ["1", "0", "-1", "-3"], "0", 3),

  // Level 4: elimination, code rules, larger patterns, and multi-clue sorting.
  logicMakeQuestion("Which number comes next: 2, 4, 8, 16, __", ["20", "24", "30", "32"], "32", 4),
  logicMakeQuestion("The toy is not in the box. It is either on the shelf or under the bed. Gideon checked under the bed and it is not there. Where is the toy?", ["In the box", "On the shelf", "Outside", "In the closet"], "On the shelf", 4),
  logicMakeQuestion("Three friends wore red, blue, and green shirts. Chen wore green. Ali did not wear red. Bea did not wear blue. Who wore the blue shirt?", ["Ali", "Bea", "Chen", "No one"], "Ali", 4),
  logicMakeQuestion("If weekends are days off and Saturday is a weekend, what follows?", ["Saturday is a school day", "Saturday is a day off", "Every day is a weekend", "Saturday is Monday"], "Saturday is a day off", 4),
  logicMakeQuestion("A code changes 2 to 5, 4 to 7, and 6 to 9. What should 8 change to?", ["9", "10", "11", "12"], "11", 4),
  logicMakeQuestion("If no fish can fly and tuna is a fish, what must be true?", ["Tuna can fly", "Tuna cannot fly", "Tuna is a bird", "All birds are fish"], "Tuna cannot fly", 4),
  logicMakeQuestion("Which set follows the same rule as 2, 5, 8, 11?", ["4, 7, 10, 13", "3, 6, 12, 24", "1, 4, 9, 16", "5, 9, 10, 18"], "4, 7, 10, 13", 4),
  logicMakeQuestion("The prize is in box A, B, C, or D. It is not in A or D. It is not in B. Where is it?", ["A", "B", "C", "D"], "C", 4),
  logicMakeQuestion("Which number comes next: 2, 6, 12, 20, __", ["24", "28", "30", "32"], "30", 4),
  logicMakeQuestion("If every rectangle is a quadrilateral and every square is a rectangle, what must be true about a square?", ["It is a quadrilateral", "It is a circle", "It is a triangle", "It is not a shape"], "It is a quadrilateral", 4),
  logicMakeQuestion("What comes next: 100, 90, 81, 73, __", ["65", "66", "67", "68"], "66", 4),
  logicMakeQuestion("A machine doubles a number and then adds 1. What does 4 become?", ["8", "9", "10", "11"], "9", 4),

  // Level 5: richer patterns, condition chains, counterexamples, and multiple constraints.
  logicMakeQuestion("If every tulip is a flower and some flowers are yellow, what can we know for sure?", ["Every tulip is yellow", "Some tulips are yellow", "A tulip is a flower", "No flowers are yellow"], "A tulip is a flower", 5),
  logicMakeQuestion("Eden is shorter than Noga but taller than Teva. Who is tallest?", ["Eden", "Noga", "Teva", "Eden and Noga"], "Noga", 5),
  logicMakeQuestion("Which number comes next: 5, 10, 20, 40, __", ["45", "60", "70", "80"], "80", 5),
  logicMakeQuestion("A snack is hidden in one of three drawers. It is not in the top drawer. The middle drawer is empty. Where is the snack?", ["Top drawer", "Middle drawer", "Bottom drawer", "It is nowhere"], "Bottom drawer", 5),
  logicMakeQuestion("A code changes 1 to 4, 3 to 10, and 5 to 16. What does 7 become?", ["18", "20", "22", "24"], "22", 5),
  logicMakeQuestion("What comes next: 1, 2, 4, 7, 11, __", ["14", "15", "16", "18"], "16", 5),
  logicMakeQuestion("If a number is greater than 20, less than 30, even, and a multiple of 7, what is it?", ["21", "24", "28", "30"], "28", 5),
  logicMakeQuestion("If every maple is a tree and every tree needs water, what must be true about a maple?", ["It needs water", "It is a fish", "It has wheels", "It is a rock"], "It needs water", 5),
  logicMakeQuestion("Which set follows the same rule as 4, 12, 36?", ["2, 6, 18", "3, 6, 12", "4, 8, 16", "5, 10, 15"], "2, 6, 18", 5),
  logicMakeQuestion("If the machine adds 4 and then doubles, what does 3 become?", ["12", "13", "14", "15"], "14", 5),
  logicMakeQuestion("A box contains one red, one blue, and one green marble. The red marble is not in box A. The blue marble is not in box B. The green marble is not in box C. If the red marble is in box B, where is the blue marble?", ["Box A", "Box B", "Box C", "It is nowhere"], "Box C", 5),
  logicMakeQuestion("Which of 29, 30, 32, 34 is prime?", ["29", "30", "32", "34"], "29", 5),

  // Level 6: multi-constraint puzzles, compound rules, and necessary conclusions.
  logicMakeQuestion("Ava, Ben, Cara, and Dov each chose a different color: red, blue, green, or yellow. Ava did not choose red or blue. Ben chose green. Cara did not choose yellow. Which color did Ava choose?", ["Red", "Blue", "Green", "Yellow"], "Yellow", 6),
  logicMakeQuestion("A code changes 2 to 9, 3 to 14, and 4 to 19. What does 7 change to?", ["29", "32", "34", "36"], "34", 6),
  logicMakeQuestion("If the switch is on, the lamp is bright. If the lamp is bright, the door is open. The switch is on. What must be true?", ["The door is open", "The door is closed", "The switch is off", "The lamp is broken"], "The door is open", 6),
  logicMakeQuestion("Which number comes next: 1, 4, 9, 16, 25, __", ["30", "35", "36", "49"], "36", 6),
  logicMakeQuestion("Mira is taller than Leo. Sam is shorter than Leo. Tali is taller than Mira. Who is tallest?", ["Mira", "Leo", "Sam", "Tali"], "Tali", 6),
  logicMakeQuestion("Exactly one of two boxes has a coin. Box A is empty. Where must the coin be?", ["Box A", "Box B", "Both boxes", "No box"], "Box B", 6),
  logicMakeQuestion("If all glims are plogs, and no plogs are zibs, what must be true?", ["No glims are zibs", "All zibs are glims", "Some glims are zibs", "No plogs are glims"], "No glims are zibs", 6),
  logicMakeQuestion("A machine triples a number and subtracts 2. What does 6 become?", ["14", "16", "18", "20"], "16", 6),
  logicMakeQuestion("Which pattern uses alternating add 2, add 4?", ["3, 5, 9, 11, 15", "3, 7, 9, 13, 15", "3, 6, 12, 24, 48", "3, 5, 7, 9, 11"], "3, 5, 9, 11, 15", 6),
  logicMakeQuestion("Noga, Gideon, and Gabriel each have one pet: cat, dog, or fish. Noga does not have the cat. Gideon has the fish. Who has the dog?", ["Noga", "Gideon", "Gabriel", "You cannot tell"], "Noga", 6),
  logicMakeQuestion("If a card is red, it has a star. This card does not have a star. What must be true?", ["It is red", "It is not red", "It is blue", "It has a circle"], "It is not red", 6),
  logicMakeQuestion("Which statement is a counterexample to 'All birds can fly'?", ["A sparrow can fly", "A penguin cannot fly", "A kite can fly", "A fish cannot fly"], "A penguin cannot fly", 6),

  // Level 7: conditional reasoning, squares/cubes, inferred positions, and rule tables.
  logicMakeQuestion("Four books are on a shelf. The atlas is left of the novel. The poem book is right of the novel. The comic is not at either end. Which book is farthest left?", ["Atlas", "Novel", "Poem book", "Comic"], "Atlas", 7),
  logicMakeQuestion("A code changes 1 to 4, 2 to 11, and 3 to 22. What does 5 change to?", ["42", "46", "50", "54"], "46", 7),
  logicMakeQuestion("If a card is striped, it is tall. If a card is tall, it is not blue. This card is striped. What must be true?", ["It is blue", "It is not blue", "It is short", "It is not striped"], "It is not blue", 7),
  logicMakeQuestion("Which number comes next: 2, 3, 5, 9, 17, __", ["25", "31", "33", "35"], "33", 7),
  logicMakeQuestion("A, B, C, and D stand in a line. A is before C. B is after C. D is before A. Who is first?", ["A", "B", "C", "D"], "D", 7),
  logicMakeQuestion("Which statement is enough to prove a number is not odd?", ["The number is even", "The number is large", "The number is less than 100", "The number has two digits"], "The number is even", 7),
  logicMakeQuestion("If every zor is a mip, and some mips are lums, what can we know for sure?", ["Every zor is a mip", "Some zors are lums", "No zors are lums", "Every lum is a zor"], "Every zor is a mip", 7),
  logicMakeQuestion("A machine squares the input and adds 1. What does 6 become?", ["35", "36", "37", "49"], "37", 7),
  logicMakeQuestion("A pattern adds 1, then 2, then 3, then 4. What comes next: 4, 5, 7, 10, 14, __", ["17", "18", "19", "20"], "19", 7),
  logicMakeQuestion("Three runners finished with no ties. Maya was not first. Leo was not last. Sam finished after Maya. Who was first?", ["Maya", "Leo", "Sam", "You cannot tell"], "Leo", 7),
  logicMakeQuestion("If the rule is 'multiply by 4, then subtract 3,' which input gives 25?", ["6", "7", "8", "9"], "7", 7),
  logicMakeQuestion("Which conclusion follows from: All planets are round objects. Earth is a planet.", ["Earth is a round object", "All round objects are planets", "Earth is not round", "No planets are round"], "Earth is a round object", 7),

  // Level 8: necessary/sufficient conditions, nested rules, and exactly-one reasoning.
  logicMakeQuestion("If a number is a multiple of 12, then it is a multiple of 3. Which must be true about 48?", ["48 is a multiple of 3", "48 is not a multiple of 3", "48 is prime", "48 is odd"], "48 is a multiple of 3", 8),
  logicMakeQuestion("A code changes 2 to 7, 4 to 19, and 6 to 39. What does 8 change to if the rule is n squared plus 3?", ["59", "64", "67", "71"], "67", 8),
  logicMakeQuestion("There are four doors. The prize is not behind an even-numbered door. It is not behind door 1. Where is the prize?", ["Door 1", "Door 2", "Door 3", "Door 4"], "Door 3", 8),
  logicMakeQuestion("Which number comes next: 3, 4, 8, 17, 33, __", ["48", "56", "58", "64"], "58", 8),
  logicMakeQuestion("If all flurbs are green, and this object is not green, what must be true?", ["It is a flurb", "It is not a flurb", "It is green", "All green things are flurbs"], "It is not a flurb", 8),
  logicMakeQuestion("A rule says: if a card has a star, then it is red. This card has a star. What must be true?", ["It is red", "It is blue", "It has no star", "All red cards have stars"], "It is red", 8),
  logicMakeQuestion("A recipe rule says: if it has nuts, mark it N; if it has dairy, mark it D. A snack has nuts but no dairy. Which mark is correct?", ["N only", "D only", "N and D", "No mark"], "N only", 8),
  logicMakeQuestion("In a race, Ana is ahead of Bo. Cy is behind Ana but ahead of Bo. Dee is ahead of Ana. Who is second?", ["Ana", "Bo", "Cy", "Dee"], "Ana", 8),
  logicMakeQuestion("If the rule is 'divide by 2, then add 9,' which input gives 20?", ["18", "20", "22", "24"], "22", 8),
  logicMakeQuestion("Which conclusion is valid? If it rains, the field is wet. It is raining.", ["The field is wet", "It is not raining", "The field is dry", "Wet fields cause rain"], "The field is wet", 8),
  logicMakeQuestion("Which statement would disprove 'Every number ending in 5 is divisible by 10'?", ["15 is not divisible by 10", "20 is divisible by 10", "30 is divisible by 10", "100 is divisible by 10"], "15 is not divisible by 10", 8),
  logicMakeQuestion("A machine changes 1 to 2, 2 to 6, 3 to 12, and 4 to 20. What does 6 become?", ["30", "36", "40", "42"], "42", 8),

  // Level 9: advanced deduction with constraints, fallacy spotting, and complex patterns.
  logicMakeQuestion("Four students took math, art, music, and science, one class each. Mira did not take art or science. Leo took music. Noga did not take math. What did Mira take?", ["Math", "Art", "Music", "Science"], "Math", 9),
  logicMakeQuestion("If a shape is a square, it has four equal sides. A shape has four equal sides. Which conclusion is best supported?", ["It must be a square", "It might be a square", "It cannot be a square", "It must be a circle"], "It might be a square", 9),
  logicMakeQuestion("Which number comes next: 1, 1, 2, 3, 5, 8, __", ["10", "11", "12", "13"], "13", 9),
  logicMakeQuestion("A code changes 3 to 10, 4 to 17, and 5 to 26. What does 9 change to?", ["73", "80", "82", "90"], "82", 9),
  logicMakeQuestion("Exactly one of these is true: A says 'The key is in box 1.' B says 'The key is not in box 1.' If exactly one is true, what can you know?", ["The key is in box 1", "The key is not in box 1", "Exactly one statement is true", "Both statements are false"], "Exactly one statement is true", 9),
  logicMakeQuestion("If every number in a list is even, what must be true about the sum of the list?", ["The sum is even", "The sum is odd", "The sum is prime", "The sum is zero"], "The sum is even", 9),
  logicMakeQuestion("The treasure is in one of five boxes. It is not in boxes 1, 3, or 5. Box 2 is empty. Where is it?", ["Box 1", "Box 2", "Box 4", "Box 5"], "Box 4", 9),
  logicMakeQuestion("Which conclusion follows? No reptiles are mammals. All snakes are reptiles.", ["No snakes are mammals", "All mammals are snakes", "Some snakes are mammals", "No reptiles are snakes"], "No snakes are mammals", 9),
  logicMakeQuestion("A machine applies this rule: multiply by 2, add 3, then multiply by 2. What does 5 become?", ["20", "23", "26", "30"], "26", 9),
  logicMakeQuestion("Which statement is the converse of 'If a shape is a square, then it is a rectangle'?", ["If a shape is a rectangle, then it is a square", "If a shape is not a rectangle, then it is not a square", "All squares are rectangles", "A square is not a rectangle"], "If a shape is a rectangle, then it is a square", 9),
  logicMakeQuestion("In a line, A is before B, C is after D, D is before A, and B is before C. Who is first?", ["A", "B", "C", "D"], "D", 9),
  logicMakeQuestion("Which number comes next: 2, 6, 12, 20, 30, __", ["40", "42", "44", "48"], "42", 9),

  // Level 10: challenge logic, formal conditionals, deeper patterns, and proof/counterexample thinking.
  logicMakeQuestion("If and only if a badge is gold, it opens the gate. This badge opens the gate. What must be true?", ["The badge is gold", "The badge is silver", "The gate is broken", "No badge is needed"], "The badge is gold", 10),
  logicMakeQuestion("If all wugs are daxes, and no dax is a lim, which statement must be true?", ["No wug is a lim", "Every lim is a wug", "Some wugs are lims", "No dax is a wug"], "No wug is a lim", 10),
  logicMakeQuestion("Which number comes next: 2, 3, 5, 9, 17, 33, __", ["49", "55", "65", "66"], "65", 10),
  logicMakeQuestion("A code changes 1 to 3, 2 to 8, 3 to 15, and 4 to 24. What does 7 change to?", ["48", "51", "55", "63"], "63", 10),
  logicMakeQuestion("Only one box can contain the prize. It is not in A. If it is not in B, then it is in C. Box B is empty. Where is the prize?", ["A", "B", "C", "None"], "C", 10),
  logicMakeQuestion("If a number is divisible by 6, it is divisible by 2 and by 3. Which statement proves a number is not divisible by 6?", ["It is not divisible by 2", "It is divisible by 3", "It is greater than 6", "It is an even number"], "It is not divisible by 2", 10),
  logicMakeQuestion("A, B, C, and D each chose a different snack: apple, bread, carrot, dates. A did not choose apple or bread. B chose carrot. C did not choose dates. What did A choose?", ["Apple", "Bread", "Carrot", "Dates"], "Dates", 10),
  logicMakeQuestion("Which conclusion is valid? If a number is prime and greater than 2, then it is odd. 17 is prime and greater than 2.", ["17 is odd", "17 is even", "All odd numbers are prime", "17 is not prime"], "17 is odd", 10),
  logicMakeQuestion("Which statement is logically the same as 'If it is a square, then it has 4 sides'?", ["If it does not have 4 sides, then it is not a square", "If it has 4 sides, then it is a square", "If it is not a square, then it has no sides", "All 4-sided shapes are squares"], "If it does not have 4 sides, then it is not a square", 10),
  logicMakeQuestion("The rule is: if the input is even, divide by 2; if the input is odd, multiply by 3 and add 1. What does 7 become?", ["20", "21", "22", "24"], "22", 10),
  logicMakeQuestion("A sequence follows n squared plus n: 2, 6, 12, 20, 30, __. What comes next?", ["36", "40", "42", "44"], "42", 10),
  logicMakeQuestion("Which is the best counterexample to 'If a number is large, then it is even'?", ["101 is large and odd", "100 is large and even", "2 is small and even", "3 is small and odd"], "101 is large and odd", 10),
];

function createLogicGeneratedEntry(difficulty) {
  const level = logicClampDifficulty(difficulty);
  const exactPool = LOGIC_QUESTIONS.filter((entry) => entry.difficulty === level);
  const fallbackPool = LOGIC_QUESTIONS.filter((entry) => entry.difficulty <= level);
  const entry = logicRandomChoice(exactPool.length ? exactPool : fallbackPool);

  return {
    ...entry,
    options: logicShuffle([...entry.options]),
    difficulty: level,
  };
}

function logicClampDifficulty(value) {
  const difficulty = Number.parseInt(value, 10);
  if (!Number.isFinite(difficulty)) {
    return 3;
  }

  return Math.max(1, Math.min(10, difficulty));
}

function logicRandomChoice(values) {
  if (typeof randomChoice === "function") {
    return randomChoice(values);
  }

  return values[Math.floor(Math.random() * values.length)];
}

function logicShuffle(values) {
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

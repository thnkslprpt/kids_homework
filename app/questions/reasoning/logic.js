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

  // Additional Level 1 questions for more variety.
  logicMakeQuestion("Which shape has 3 sides?", ["Triangle", "Square", "Circle", "Rectangle"], "Triangle", 1),
  logicMakeQuestion("What comes next: dog, cat, dog, cat, __", ["Dog", "Cat", "Bird", "Fish"], "Dog", 1),
  logicMakeQuestion("Which word names a fruit?", ["Apple", "Table", "Sock", "Pencil"], "Apple", 1),
  logicMakeQuestion("Ben has more blocks than Mia. Who has fewer blocks?", ["Ben", "Mia", "They have the same", "You cannot tell"], "Mia", 1),
  logicMakeQuestion("Which number is odd?", ["1", "2", "4", "6"], "1", 1),
  logicMakeQuestion("If every puppy is a dog and Max is a puppy, what is Max?", ["A dog", "A cat", "A bird", "A rock"], "A dog", 1),
  logicMakeQuestion("Which item does not belong with things you wear?", ["Hat", "Shoe", "Shirt", "Banana"], "Banana", 1),
  logicMakeQuestion("What comes next: 1, 2, 3, __", ["2", "3", "4", "5"], "4", 1),
  logicMakeQuestion("If it is raining, the ground gets wet. It is raining. What happens?", ["The ground gets wet", "The ground flies", "The sun turns blue", "The rain stops forever"], "The ground gets wet", 1),
  logicMakeQuestion("Which number is largest: 1, 8, 3, 6?", ["1", "3", "6", "8"], "8", 1),
  logicMakeQuestion("Sam is before Lee in line. Who is first?", ["Sam", "Lee", "They are tied", "No one"], "Sam", 1),
  logicMakeQuestion("What comes next: up, down, up, down, __", ["Up", "Down", "Left", "Right"], "Up", 1),

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

  // Additional Level 2 questions for more variety.
  logicMakeQuestion("Which number comes next: 10, 20, 30, 40, __", ["45", "50", "55", "60"], "50", 2),
  logicMakeQuestion("Rina is right of Omar. Omar is right of Eli. Who is leftmost?", ["Rina", "Omar", "Eli", "You cannot tell"], "Eli", 2),
  logicMakeQuestion("If all whales are mammals and this animal is a whale, what is it?", ["A mammal", "A bird", "A bug", "A plant"], "A mammal", 2),
  logicMakeQuestion("Which word does not belong with kitchen items?", ["Fork", "Spoon", "Plate", "Tiger"], "Tiger", 2),
  logicMakeQuestion("What comes next: A, B, B, A, B, B, A, __", ["A", "B", "C", "D"], "B", 2),
  logicMakeQuestion("Which set follows the same rule as 2, 4, 6, 8?", ["3, 5, 7, 9", "1, 3, 6, 10", "2, 6, 12, 20", "5, 10, 20, 40"], "3, 5, 7, 9", 2),
  logicMakeQuestion("If a cup is full, it can spill. This cup is full. What must be true?", ["It can spill", "It is empty", "It is a plate", "It cannot hold water"], "It can spill", 2),
  logicMakeQuestion("Which word names a month?", ["Sunday", "July", "Winter", "Chair"], "July", 2),
  logicMakeQuestion("Noga read more pages than Teva. Teva read more pages than Eden. Who read the fewest pages?", ["Noga", "Teva", "Eden", "They all read the same"], "Eden", 2),
  logicMakeQuestion("What comes next: 1, 3, 5, 7, __", ["8", "9", "10", "11"], "9", 2),
  logicMakeQuestion("If all carrots are vegetables and this is a carrot, what must be true?", ["It is a vegetable", "It is a cookie", "It is a shoe", "It is a bird"], "It is a vegetable", 2),
  logicMakeQuestion("Which object is used for writing?", ["Pencil", "Pillow", "Cup", "Ball"], "Pencil", 2),

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

  // Additional Level 3 questions for more variety.
  logicMakeQuestion("Which number comes next: 3, 6, 12, 24, __", ["30", "36", "42", "48"], "48", 3),
  logicMakeQuestion("Mia is younger than Zoe. Leo is younger than Mia. Who is youngest?", ["Zoe", "Mia", "Leo", "You cannot tell"], "Leo", 3),
  logicMakeQuestion("If all larks are birds and no birds are rocks, what must be true?", ["No larks are rocks", "All rocks are larks", "Some larks are rocks", "Birds are rocks"], "No larks are rocks", 3),
  logicMakeQuestion("Which rule matches this pattern: 2, 5, 8, 11, __", ["Add 2 each time", "Add 3 each time", "Double each time", "Subtract 3 each time"], "Add 3 each time", 3),
  logicMakeQuestion("The key is either in the bag or in the drawer. It is not in the bag. Where is the key?", ["In the bag", "In the drawer", "In the yard", "In the sink"], "In the drawer", 3),
  logicMakeQuestion("Ana, Ben, and Cara chose apple, banana, and cherry. Ben chose apple. Ana did not choose banana. Who chose banana?", ["Ana", "Ben", "Cara", "No one"], "Cara", 3),
  logicMakeQuestion("Which letter comes next: A, D, G, J, __", ["K", "L", "M", "N"], "M", 3),
  logicMakeQuestion("Which number comes next: 30, 25, 20, 15, __", ["5", "10", "12", "14"], "10", 3),
  logicMakeQuestion("If all roses are flowers and flowers grow from plants, what must be true about roses?", ["They grow from plants", "They are rocks", "They are not flowers", "They have wheels"], "They grow from plants", 3),
  logicMakeQuestion("The blue cup is taller than the red cup. The green cup is taller than the blue cup. Which cup is tallest?", ["Red cup", "Blue cup", "Green cup", "Red and blue tie"], "Green cup", 3),
  logicMakeQuestion("Which statement is a counterexample to 'All cats are black'?", ["A black cat", "A white cat", "A black dog", "A small cat"], "A white cat", 3),
  logicMakeQuestion("A machine adds 5 to a number. Which input gives 12?", ["5", "6", "7", "8"], "7", 3),

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

  // Additional Level 4 questions for more variety.
  logicMakeQuestion("Which number comes next: 4, 9, 14, 19, __", ["22", "23", "24", "25"], "24", 4),
  logicMakeQuestion("If a toy is a robot, then it uses batteries. This toy does not use batteries. What must be true?", ["It is a robot", "It is not a robot", "It uses hidden batteries", "All toys are robots"], "It is not a robot", 4),
  logicMakeQuestion("A code changes 1 to 3, 2 to 5, and 3 to 7. What does 6 change to?", ["11", "12", "13", "14"], "13", 4),
  logicMakeQuestion("The prize is in box A, B, C, or D. It is not in A, C, or D. Where is it?", ["A", "B", "C", "D"], "B", 4),
  logicMakeQuestion("Liam is between Ava and Noah in line. Ava is first. Who is second?", ["Ava", "Liam", "Noah", "You cannot tell"], "Liam", 4),
  logicMakeQuestion("Which set follows the same rule as 6, 12, 18, 24?", ["5, 10, 15, 20", "3, 6, 10, 15", "4, 8, 16, 32", "7, 14, 28, 56"], "5, 10, 15, 20", 4),
  logicMakeQuestion("All drums are instruments. No instruments are vegetables. What must be true about drums?", ["No drums are vegetables", "All vegetables are drums", "Some drums are vegetables", "Drums are not instruments"], "No drums are vegetables", 4),
  logicMakeQuestion("What comes next: 1, 4, 8, 13, 19, __", ["24", "25", "26", "27"], "26", 4),
  logicMakeQuestion("A machine subtracts 3 and then doubles the result. What does 8 become?", ["8", "10", "11", "16"], "10", 4),
  logicMakeQuestion("Eli, Fay, and Gus wore red, blue, and yellow hats. Gus wore red. Fay did not wear yellow. Who wore yellow?", ["Eli", "Fay", "Gus", "No one"], "Eli", 4),
  logicMakeQuestion("If every school bus is yellow and this vehicle is not yellow, what must be true?", ["It is a school bus", "It is not a school bus", "All yellow things are buses", "It is a bicycle"], "It is not a school bus", 4),
  logicMakeQuestion("Which number is a multiple of both 3 and 4?", ["8", "9", "12", "14"], "12", 4),

  // Level 5: richer patterns, condition chains, counterexamples, and multiple constraints.
  logicMakeQuestion("Every tulip is a flower. What must be true about anything that is a tulip?", ["It is yellow", "It is a flower", "It is not a flower", "It is not a plant"], "It is a flower", 5),
  logicMakeQuestion("Eden is shorter than Noga but taller than Teva. Who is tallest?", ["Eden", "Noga", "Teva", "Eden and Noga"], "Noga", 5),
  logicMakeQuestion("Which number comes next: 5, 10, 20, 40, __", ["45", "60", "70", "80"], "80", 5),
  logicMakeQuestion("A snack is hidden in one of three drawers. It is not in the top drawer. The middle drawer is empty. Where is the snack?", ["Top drawer", "Middle drawer", "Bottom drawer", "It is nowhere"], "Bottom drawer", 5),
  logicMakeQuestion("A code changes 1 to 4, 3 to 10, and 5 to 16. What does 7 become?", ["18", "20", "22", "24"], "22", 5),
  logicMakeQuestion("What comes next: 1, 2, 4, 7, 11, __", ["14", "15", "16", "18"], "16", 5),
  logicMakeQuestion("If a number is greater than 20, less than 30, even, and a multiple of 7, what is it?", ["21", "24", "28", "30"], "28", 5),
  logicMakeQuestion("If every maple is a tree and every tree needs water, what must be true about a maple?", ["It needs water", "It is a fish", "It has wheels", "It is a rock"], "It needs water", 5),
  logicMakeQuestion("Which set follows the same rule as 4, 12, 36?", ["2, 6, 18", "3, 6, 12", "4, 8, 16", "5, 10, 15"], "2, 6, 18", 5),
  logicMakeQuestion("If the machine adds 4 and then doubles, what does 3 become?", ["12", "13", "14", "15"], "14", 5),
  logicMakeQuestion("There are three boxes: Box A, Box B, and Box C. Each box has exactly one marble. The three marbles are red, blue, and green, and each marble is in a different box. The red marble is not in Box A. The blue marble is not in Box B. The green marble is not in Box C. If the red marble is in Box B, where is the blue marble?", ["Box A", "Box B", "Box C", "It is nowhere"], "Box C", 5),
  logicMakeQuestion("Which of 29, 30, 32, 34 is prime?", ["29", "30", "32", "34"], "29", 5),

  // Additional Level 5 questions for more variety.
  logicMakeQuestion("Which number comes next: 2, 5, 11, 23, __", ["35", "45", "47", "49"], "47", 5),
  logicMakeQuestion("A code changes 2 to 7, 3 to 11, and 5 to 19. What does 6 change to?", ["21", "22", "23", "24"], "23", 5),
  logicMakeQuestion("If every glorp is a narp and every narp is a tave, what must be true?", ["Every glorp is a tave", "Every tave is a glorp", "No glorps are narps", "Some glorps are not taves"], "Every glorp is a tave", 5),
  logicMakeQuestion("Sam, Tia, and Uma each have a red, green, or blue backpack. Uma has green. Tia did not get red. Who has red?", ["Sam", "Tia", "Uma", "No one"], "Sam", 5),
  logicMakeQuestion("Which number is greater than 30, less than 40, and divisible by 5?", ["30", "34", "35", "40"], "35", 5),
  logicMakeQuestion("A machine halves a number and then adds 6. Which input gives 15?", ["16", "18", "20", "22"], "18", 5),
  logicMakeQuestion("Which statement would disprove 'All dogs are brown'?", ["A brown dog", "A white dog", "A brown cat", "A dog with four legs"], "A white dog", 5),
  logicMakeQuestion("Bo is behind Ana in a race. Cy is ahead of Ana. Dov is behind Bo. Who is first?", ["Ana", "Bo", "Cy", "Dov"], "Cy", 5),
  logicMakeQuestion("Which number comes next: 81, 27, 9, 3, __", ["0", "1", "2", "6"], "1", 5),
  logicMakeQuestion("If a shape is a triangle, it has 3 corners. This shape has 4 corners. What must be true?", ["It is a triangle", "It is not a triangle", "It has 3 corners", "It is not a shape"], "It is not a triangle", 5),
  logicMakeQuestion("A snack is sweet only if it has sugar. This snack is sweet. What must be true?", ["It has sugar", "It has salt", "It is not sweet", "Sugar is impossible"], "It has sugar", 5),
  logicMakeQuestion("Which set follows the same rule as 1, 3, 9, 27?", ["2, 6, 18, 54", "2, 4, 8, 12", "3, 6, 9, 12", "5, 10, 15, 20"], "2, 6, 18, 54", 5),

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

  // Additional Level 6 questions for more variety.
  logicMakeQuestion("A code changes 2 to 6, 3 to 12, and 4 to 20. What does 7 change to?", ["42", "49", "54", "56"], "56", 6),
  logicMakeQuestion("If a number is a multiple of 8, then it is even. 35 is not even. What must be true?", ["35 is a multiple of 8", "35 is not a multiple of 8", "35 is even", "All odd numbers are multiples of 8"], "35 is not a multiple of 8", 6),
  logicMakeQuestion("Boxes A, B, and C hold apple, orange, and pear. B holds pear. A does not hold apple. Where is the orange?", ["Box A", "Box B", "Box C", "No box"], "Box A", 6),
  logicMakeQuestion("Which number comes next: 2, 5, 10, 17, 26, __", ["35", "36", "37", "38"], "37", 6),
  logicMakeQuestion("If all mips are nops and some nops are rills, what can we know for sure?", ["All mips are nops", "Some mips are rills", "No mips are nops", "All rills are mips"], "All mips are nops", 6),
  logicMakeQuestion("A machine adds 2 and then squares the result. What does 5 become?", ["25", "36", "49", "64"], "49", 6),
  logicMakeQuestion("A is somewhere after B. C is somewhere before B. D is somewhere after A. Who is first?", ["A", "B", "C", "D"], "C", 6),
  logicMakeQuestion("Which statement is the inverse of 'If it is raining, then the ground is wet'?", ["If it is not raining, then the ground is not wet", "If the ground is wet, then it is raining", "If the ground is not wet, then it is not raining", "It is raining and the ground is wet"], "If it is not raining, then the ground is not wet", 6),
  logicMakeQuestion("Exactly one of doors 1, 2, or 3 has the prize. Door 2 is empty, and the prize is behind an odd-numbered door. It is not behind door 1. Where is it?", ["Door 1", "Door 2", "Door 3", "No door"], "Door 3", 6),
  logicMakeQuestion("If all poets are writers and no writers are robots, what must be true?", ["No poets are robots", "All robots are poets", "Some poets are robots", "No writers are poets"], "No poets are robots", 6),
  logicMakeQuestion("A rule changes a number by multiplying by 2 and then adding 4. Which input gives 18?", ["6", "7", "8", "9"], "7", 6),
  logicMakeQuestion("Which number is divisible by 2, 3, and 5?", ["18", "20", "24", "30"], "30", 6),

  // Level 7: conditional reasoning, squares/cubes, inferred positions, and rule tables.
  logicMakeQuestion("Four books are on a shelf. The atlas is left of the novel. The poem book is right of the novel. The comic is not at either end. Which book is farthest left?", ["Atlas", "Novel", "Poem book", "Comic"], "Atlas", 7),
  logicMakeQuestion("A code uses the rule 2n squared plus n plus 1. What does 5 change to?", ["42", "46", "50", "56"], "56", 7),
  logicMakeQuestion("If a card is striped, it is tall. If a card is tall, it is not blue. This card is striped. What must be true?", ["It is blue", "It is not blue", "It is short", "It is not striped"], "It is not blue", 7),
  logicMakeQuestion("Which number comes next: 2, 3, 5, 9, 17, __", ["25", "31", "33", "35"], "33", 7),
  logicMakeQuestion("A, B, C, and D stand in a line. A is somewhere before C. B is somewhere after C. D is somewhere before A. Who is first?", ["A", "B", "C", "D"], "D", 7),
  logicMakeQuestion("Which statement is enough to prove a number is not odd?", ["The number is even", "The number is large", "The number is less than 100", "The number has two digits"], "The number is even", 7),
  logicMakeQuestion("If every zor is a mip, and some mips are lums, what can we know for sure?", ["Every zor is a mip", "Some zors are lums", "No zors are lums", "Every lum is a zor"], "Every zor is a mip", 7),
  logicMakeQuestion("A machine squares the input and adds 1. What does 6 become?", ["35", "36", "37", "49"], "37", 7),
  logicMakeQuestion("A pattern adds 1, then 2, then 3, then 4. What comes next: 4, 5, 7, 10, 14, __", ["17", "18", "19", "20"], "19", 7),
  logicMakeQuestion("Three runners finished with no ties. Maya was not first. Leo was not last. Sam finished after Maya. Who was first?", ["Maya", "Leo", "Sam", "You cannot tell"], "Leo", 7),
  logicMakeQuestion("If the rule is 'multiply by 4, then subtract 3,' which input gives 25?", ["6", "7", "8", "9"], "7", 7),
  logicMakeQuestion("Which conclusion follows from: All planets are round objects. Earth is a planet.", ["Earth is a round object", "All round objects are planets", "Earth is not round", "No planets are round"], "Earth is a round object", 7),

  // Additional Level 7 questions for more variety.
  logicMakeQuestion("Which number comes next: 1, 3, 7, 15, 31, __", ["47", "55", "63", "65"], "63", 7),
  logicMakeQuestion("A code changes 2 to 8, 3 to 15, and 4 to 24. What does 6 change to?", ["42", "46", "48", "50"], "48", 7),
  logicMakeQuestion("If and only if the code is correct, the gate opens. The gate did not open. What must be true?", ["The code is correct", "The code is not correct", "The gate is open", "The code is blue"], "The code is not correct", 7),
  logicMakeQuestion("A, B, C, and D each chose 1, 2, 3, or 4. A did not choose 1 or 2. B chose 3. C did not choose 4. What did A choose?", ["1", "2", "3", "4"], "4", 7),
  logicMakeQuestion("If every red card has a star and this card does not have a star, what must be true?", ["It is red", "It is not red", "It has a hidden star", "All stars are red"], "It is not red", 7),
  logicMakeQuestion("A machine multiplies by 5 and then subtracts 4. Which input gives 31?", ["5", "6", "7", "8"], "7", 7),
  logicMakeQuestion("In a box, some blocks are red. Every red block is wooden. What can we know for sure?", ["Some blocks are wooden", "All blocks are red", "No blocks are wooden", "Every wooden block is red"], "Some blocks are wooden", 7),
  logicMakeQuestion("A, B, C, and D stand in line. A is first. D is between A and B. B is before C. Who is second?", ["A", "B", "C", "D"], "D", 7),
  logicMakeQuestion("Which statement would disprove 'All multiples of 4 are multiples of 8'?", ["8 is a multiple of 8", "12 is a multiple of 4 but not 8", "16 is a multiple of 4 and 8", "4 is less than 8"], "12 is a multiple of 4 but not 8", 7),
  logicMakeQuestion("Which number comes next: 64, 32, 16, 8, __", ["2", "4", "6", "8"], "4", 7),
  logicMakeQuestion("The rule is: if the input is odd, add 5; if it is even, divide by 2. What does 11 become?", ["5", "16", "22", "33"], "16", 7),
  logicMakeQuestion("If homework is done, game time is allowed. If game time is allowed, the tablet is charged. Homework is done. What must be true?", ["The tablet is charged", "Homework is not done", "Game time is impossible", "The tablet is broken"], "The tablet is charged", 7),

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

  // Additional Level 8 questions for more variety.
  logicMakeQuestion("Which number comes next: 4, 7, 13, 25, 49, __", ["73", "87", "97", "99"], "97", 8),
  logicMakeQuestion("A code changes 2 to 7, 3 to 26, and 4 to 63. What does 5 change to?", ["105", "116", "124", "126"], "124", 8),
  logicMakeQuestion("If a number is divisible by 15, then it is divisible by 5. Which statement proves a number is not divisible by 15?", ["It is not divisible by 5", "It is divisible by 3", "It is greater than 15", "It ends in 0"], "It is not divisible by 5", 8),
  logicMakeQuestion("Every blip is exactly one of these colors: red or blue. This blip is not red. What must be true?", ["It is blue", "It is red", "It is both red and blue", "It has no color"], "It is blue", 8),
  logicMakeQuestion("Omar finished first. Nora finished after Omar but before Lia. Lia finished before Max. Who finished second?", ["Omar", "Nora", "Lia", "Max"], "Nora", 8),
  logicMakeQuestion("A recipe rule says: if it has grain, mark it G; if it is spicy, mark it S. A food has grain and is spicy. Which mark is correct?", ["G only", "S only", "G and S", "No mark"], "G and S", 8),
  logicMakeQuestion("If every dolphin is a mammal and this animal is not a mammal, what must be true?", ["It is a dolphin", "It is not a dolphin", "All mammals are dolphins", "It is a whale"], "It is not a dolphin", 8),
  logicMakeQuestion("A machine squares the input and then subtracts 4. Which input gives 45?", ["6", "7", "8", "9"], "7", 8),
  logicMakeQuestion("The prize is behind door 1, 2, 3, 4, or 5. It is not behind a prime-numbered door and not behind door 1. Where is it?", ["Door 1", "Door 2", "Door 3", "Door 4"], "Door 4", 8),
  logicMakeQuestion("Which pattern alternates multiply by 2, then add 3, starting from 2?", ["2, 4, 7, 14, 17", "2, 5, 10, 13, 26", "2, 4, 8, 16, 32", "2, 3, 6, 9, 18"], "2, 4, 7, 14, 17", 8),
  logicMakeQuestion("A rule sends even inputs to half the input and odd inputs to the input plus 4. Starting with 9 and using the rule twice, what is the result?", ["13", "17", "18", "26"], "17", 8),
  logicMakeQuestion("Which statement means the same as 'Only squares have the star'?", ["If a shape has the star, it is a square", "If a shape is a square, it must have the star", "Every shape has the star", "No square has the star"], "If a shape has the star, it is a square", 8),

  // Level 9: advanced deduction with constraints, fallacy spotting, and complex patterns.
  logicMakeQuestion("Four students took math, art, music, and science, one class each. Mira did not take art or science. Leo took music. Noga did not take math. What did Mira take?", ["Math", "Art", "Music", "Science"], "Math", 9),
  logicMakeQuestion("If a shape is a square, it has four equal sides. A shape has four equal sides. Which conclusion is best supported?", ["It must be a square", "It might be a square", "It cannot be a square", "It must be a circle"], "It might be a square", 9),
  logicMakeQuestion("Which number comes next: 1, 1, 2, 3, 5, 8, __", ["10", "11", "12", "13"], "13", 9),
  logicMakeQuestion("A code changes 3 to 10, 4 to 17, and 5 to 26. What does 9 change to?", ["73", "80", "82", "90"], "82", 9),
  logicMakeQuestion("Statement 1 says, 'The key is in Box A.' Statement 2 says, 'The key is not in Box A.' Can you know where the key is from these clues?", ["Yes, it is in Box A", "Yes, it is not in Box A", "No, not from these clues", "Both statements are false"], "No, not from these clues", 9),
  logicMakeQuestion("If every number in a list is even, what must be true about the sum of the list?", ["The sum is even", "The sum is odd", "The sum is prime", "The sum is zero"], "The sum is even", 9),
  logicMakeQuestion("The treasure is in one of five boxes. It is not in boxes 1, 3, or 5. Box 2 is empty. Where is it?", ["Box 1", "Box 2", "Box 4", "Box 5"], "Box 4", 9),
  logicMakeQuestion("Which conclusion follows? No reptiles are mammals. All snakes are reptiles.", ["No snakes are mammals", "All mammals are snakes", "Some snakes are mammals", "No reptiles are snakes"], "No snakes are mammals", 9),
  logicMakeQuestion("A machine applies this rule: multiply by 2, add 3, then multiply by 2. What does 5 become?", ["20", "23", "26", "30"], "26", 9),
  logicMakeQuestion("Which statement is the converse of 'If a shape is a square, then it is a rectangle'?", ["If a shape is a rectangle, then it is a square", "If a shape is not a rectangle, then it is not a square", "All squares are rectangles", "A square is not a rectangle"], "If a shape is a rectangle, then it is a square", 9),
  logicMakeQuestion("In a line, A is somewhere before B, C is somewhere after D, D is somewhere before A, and B is somewhere before C. Who is first?", ["A", "B", "C", "D"], "D", 9),
  logicMakeQuestion("Which number comes next: 2, 6, 12, 20, 30, __", ["40", "42", "44", "48"], "42", 9),

  // Additional Level 9 questions for more variety.
  logicMakeQuestion("If P means Q, and Q means R, but R is false, what must be true?", ["P is true", "P is false", "Q is true", "R is true"], "P is false", 9),
  logicMakeQuestion("Which number comes next: 2, 4, 12, 48, 240, __", ["720", "960", "1200", "1440"], "1440", 9),
  logicMakeQuestion("A code changes 2 to 7, 4 to 21, and 5 to 31. What does 8 change to?", ["64", "72", "73", "81"], "73", 9),
  logicMakeQuestion("Ari, Bea, Cam, and Dia chose piano, drum, flute, and violin. Ari did not choose piano or flute. Bea chose drum. Cam did not choose violin. What did Ari choose?", ["Piano", "Drum", "Flute", "Violin"], "Violin", 9),
  logicMakeQuestion("All zarns are meps. Some meps are loths. What can we know for sure?", ["All zarns are meps", "Some zarns are loths", "No zarns are meps", "All loths are zarns"], "All zarns are meps", 9),
  logicMakeQuestion("Which finding would refute 'If a plant gets water, then it grows tall'?", ["A watered plant that stayed short", "A tall plant that got water", "A short plant without water", "A rock that got water"], "A watered plant that stayed short", 9),
  logicMakeQuestion("The prize is in box 1, 2, 3, 4, 5, or 6. It is not in an odd-numbered box, not in a box divisible by 3, and not in box 2. Where is it?", ["Box 2", "Box 3", "Box 4", "Box 6"], "Box 4", 9),
  logicMakeQuestion("A machine applies this rule twice: multiply by 3, then subtract 1. Starting with 4, what is the final result?", ["30", "32", "33", "35"], "32", 9),
  logicMakeQuestion("Which statement is the contrapositive of 'If a figure is a square, then it is a rectangle'?", ["If a figure is not a rectangle, then it is not a square", "If a figure is a rectangle, then it is a square", "If a figure is not a square, then it is not a rectangle", "Every rectangle is a square"], "If a figure is not a rectangle, then it is not a square", 9),
  logicMakeQuestion("B is somewhere before A. A is somewhere before C. D is somewhere after C. Who is first?", ["A", "B", "C", "D"], "B", 9),
  logicMakeQuestion("Which number comes next: 1, 2, 6, 24, 120, __", ["240", "360", "600", "720"], "720", 9),
  logicMakeQuestion("A number is greater than 10, less than 15, prime, and leaves remainder 1 when divided by 3. Which number is it?", ["10", "11", "12", "13"], "13", 9),

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

  // Additional Level 10 questions for more variety.
  logicMakeQuestion("If and only if a number is a multiple of 4, it passes the test. Number 18 fails the test. What must be true?", ["18 is a multiple of 4", "18 is not a multiple of 4", "18 passes the test", "All even numbers pass"], "18 is not a multiple of 4", 10),
  logicMakeQuestion("Which number comes next: 1, 4, 13, 40, 121, __", ["242", "243", "364", "365"], "364", 10),
  logicMakeQuestion("A code changes 2 to 10, 3 to 30, and 4 to 68. What does 5 change to?", ["120", "125", "130", "135"], "130", 10),
  logicMakeQuestion("A shape can enter the club only if it is a polygon. This shape is not a polygon. What must be true?", ["It can enter the club", "It cannot enter the club", "It is a square", "All polygons can enter"], "It cannot enter the club", 10),
  logicMakeQuestion("A, B, C, and D chose red, blue, green, and yellow cards. A did not choose red or green. B did not choose blue or yellow. C chose green. D did not choose blue. What did A choose?", ["Red", "Blue", "Green", "Yellow"], "Blue", 10),
  logicMakeQuestion("If a number is divisible by 9, then it is divisible by 3. This number is not divisible by 3. What must be true?", ["It is divisible by 9", "It is not divisible by 9", "It is divisible by 6", "It is 9"], "It is not divisible by 9", 10),
  logicMakeQuestion("Exactly one of P and Q is true. P is false. What follows?", ["Q is true", "Q is false", "Both are true", "Neither is true"], "Q is true", 10),
  logicMakeQuestion("The rule is: if the input is even, divide by 2 and then add 7; if the input is odd, add 1 and then triple. What does 10 become?", ["10", "12", "15", "22"], "12", 10),
  logicMakeQuestion("Which statement is sufficient but not necessary for a shape to have 4 sides?", ["It is a square", "It is red", "It is large", "It is drawn on paper"], "It is a square", 10),
  logicMakeQuestion("Which number comes next: 3, 6, 18, 72, 360, __", ["720", "1080", "1800", "2160"], "2160", 10),
  logicMakeQuestion("Which statement is a counterexample to 'If a number is odd, then it is prime'?", ["9 is odd and not prime", "7 is odd and prime", "8 is even and not prime", "2 is even and prime"], "9 is odd and not prime", 10),
  logicMakeQuestion("A rule changes an input to n squared minus n. Which input gives 42?", ["6", "7", "8", "9"], "7", 10),
];

// Practical prioritization: choose by safety, consequence, and real deadlines.
LOGIC_QUESTIONS.push(
  logicMakeQuestion(
    "You smell smoke while doing homework. What should you do first?",
    ["Leave the area and alert an adult", "Finish the current question", "Pack every schoolbook", "Open a game message"],
    "Leave the area and alert an adult",
    3
  ),
  logicMakeQuestion(
    "Your appointment starts in 30 minutes, and travel takes 25 minutes. A video has 10 minutes left. What should you do first?",
    ["Leave for the appointment now", "Finish the video, then leave", "Start another video", "Wait until the appointment time"],
    "Leave for the appointment now",
    4
  ),
  logicMakeQuestion(
    "Water is moving toward a plugged-in power strip. The phone is ringing, and clean laundry needs folding. Which task has highest priority?",
    ["Keep away and alert an adult about the water", "Answer the phone", "Fold the laundry", "Sort tomorrow's clothes"],
    "Keep away and alert an adult about the water",
    5
  ),
  logicMakeQuestion(
    "A form is complete and due online in 10 minutes. Its cover could look nicer. What is the best next step?",
    ["Check required fields and submit it", "Spend 20 minutes decorating it", "Start the form again", "Wait until after the deadline"],
    "Check required fields and submit it",
    6
  ),
  logicMakeQuestion(
    "Which task should be done first when you have limited time?",
    ["Take time-sensitive medicine exactly as directed by a responsible adult", "Rearrange books that are already tidy", "Choose a new phone wallpaper", "Watch an optional video"],
    "Take time-sensitive medicine exactly as directed by a responsible adult",
    7
  ),
  logicMakeQuestion(
    "Four tasks remain: report a strong gas smell, reply to a message due tomorrow, wash a cup, and organize photos. Which ranking rule is best?",
    ["Handle the immediate safety danger first, then the nearest meaningful deadline", "Do the most enjoyable task first", "Always do the longest task first", "Choose tasks in alphabetical order"],
    "Handle the immediate safety danger first, then the nearest meaningful deadline",
    8
  )
);

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


(() => {
  const questionUtils = globalThis.HomeworkQuestionUtils;
  if (!questionUtils) {
    return;
  }
  const { buildShuffledLetteredEntry, entry, pickGeneratedEntry, randomChoice } = questionUtils;

  const blueprints = [
    { topic: "thinking-prioritization", difficulty: 1, question: "Which should you do first before building a model?", answer: "Check what the goal is", options: ["Check what the goal is", "Throw away the parts", "Guess without looking", "Make it harder on purpose"] },
    {
      difficulty: 3,
      create: () =>
        buildShuffledLetteredEntry({
          topic: "thinking-prioritization",
          difficulty: 3,
          question: "Which task should be done first?",
          items: ["due tomorrow and important", "due next month and easy", "optional"],
          correctIndex: 0,
          extraOptions: ["Do none"],
        }),
    },
    { topic: "thinking-prioritization", difficulty: 7, question: "Which reason is best for doing the urgent important task first?", answer: "It has a close deadline and matters", options: ["It has a close deadline and matters", "It is the most fun", "It has the brightest color", "It can be ignored forever"] },
    { topic: "thinking-planning", difficulty: 1, question: "What is a good first planning step?", answer: "List what needs to be done", options: ["List what needs to be done", "Skip the directions", "Start at the final step", "Hide the materials"] },
    { topic: "thinking-planning", difficulty: 4, question: "Which plan is in the best order?", answer: "Read goal, gather materials, build, check", options: ["Read goal, gather materials, build, check", "Build, ignore goal, gather materials, check", "Check, build, read goal, gather", "Gather, hide materials, stop, build"] },
    { topic: "thinking-debugging", difficulty: 2, question: "Your answer does not match the choices. What is a good debugging step?", answer: "Reread the question and check each step", options: ["Reread the question and check each step", "Pick randomly", "Erase the question", "Ignore units"] },
    { topic: "thinking-debugging", difficulty: 5, question: "A program says 2 + 3 = 23. What is the likely mistake?", answer: "It joined text instead of adding numbers", options: ["It joined text instead of adding numbers", "Addition stopped existing", "The number 2 is always wrong", "The screen is too bright"] },
    { topic: "thinking-cause-effect", difficulty: 2, question: "Which is a cause-and-effect pair?", answer: "The cup tipped, so water spilled", options: ["The cup tipped, so water spilled", "The cup is blue and round", "Water and pencils are nouns", "The table is near a chair"] },
    { topic: "thinking-cause-effect", difficulty: 6, question: "Which sentence shows a chain of cause and effect?", answer: "Rain made mud, mud slowed the runners, and the race took longer", options: ["Rain made mud, mud slowed the runners, and the race took longer", "Rain, mud, runners, race", "The race was a race because race", "The runners liked blue shoes"] },
    { topic: "thinking-tradeoffs", difficulty: 3, question: "Which tradeoff is real?", answer: "A faster route may have more traffic risk", options: ["A faster route may have more traffic risk", "A bigger backpack weighs nothing", "Saving money always means spending more", "More screen time always improves sleep"] },
    { topic: "thinking-tradeoffs", difficulty: 8, question: "Which decision rule is best for a hard tradeoff?", answer: "Compare options using the same important criteria", options: ["Compare options using the same important criteria", "Choose the first option seen", "Ignore costs", "Only ask someone who agrees"] },
    { topic: "thinking-risk-reward", difficulty: 4, question: "Which choice has the lowest risk?", answer: "Wear goggles before using a tool", options: ["Wear goggles before using a tool", "Skip safety steps", "Run while carrying scissors", "Touch a hot pan"] },
    { topic: "thinking-risk-reward", difficulty: 6, question: "Which option has a clear reward but also a risk?", answer: "Taking a shortcut may save time but might be unsafe", options: ["Taking a shortcut may save time but might be unsafe", "Wearing a helmet makes biking safer", "Reading directions helps avoid mistakes", "Checking work can catch errors"] },
    { topic: "thinking-evidence-checks", difficulty: 5, question: "What would change your mind about a claim that a study app helps?", answer: "A fair comparison showing no improvement", options: ["A fair comparison showing no improvement", "The app has a bright logo", "One friend likes the color", "The name sounds smart"] },
    { topic: "thinking-evidence-checks", difficulty: 7, question: "Which evidence would most strongly test a cause-and-effect claim?", answer: "A controlled comparison changing only the suspected cause", options: ["A controlled comparison changing only the suspected cause", "A funny story from one person", "A guess made before data", "A picture without measurements"] },
    { topic: "thinking-debugging", difficulty: 9, question: "A rule works for every test except an empty list. What should you do next?", answer: "Trace the empty-list case and add a defined stopping rule", options: ["Trace the empty-list case and add a defined stopping rule", "Delete the successful tests", "Assume empty lists can never occur", "Add unrelated steps until the output changes"] },
    { topic: "thinking-evidence-checks", difficulty: 10, question: "Which question best checks whether you should change your mind?", answer: "What evidence would show my current idea is wrong?", options: ["What evidence would show my current idea is wrong?", "Who agrees with me already?", "Can I ignore the strongest evidence?", "Which answer sounds nicest?"] },
  ];

  function createBlueprintEntry(difficulty) {
    const level = Math.max(1, Math.min(10, Number.parseInt(difficulty, 10) || 3));
    const blueprint = randomChoice(blueprints.filter((item) => item.difficulty === level));
    return typeof blueprint.create === "function" ? blueprint.create() : entry(blueprint);
  }

  globalThis.createLogicThinkingGeneratedEntry = (difficulty) =>
    pickGeneratedEntry([createBlueprintEntry], difficulty);
})();

globalThis.HomeworkQuestions?.register({
  id: "logic",
  label: "Logic",
  getStaticQuestions: () => LOGIC_QUESTIONS,
  generatedEntryFactory: createLogicGeneratedEntry,
  supplementalGeneratedEntryFactory: globalThis.createLogicThinkingGeneratedEntry,
  generatedShare: 0.6,
  supplementalShare: 0.45,
});

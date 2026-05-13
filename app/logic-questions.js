const LOGIC_QUESTIONS = [
  {
    question: "If all squares have 4 sides, which must be true?",
    options: ["Every triangle has 4 sides", "A square has 4 sides", "Every 4-sided shape is a square", "A square is a circle"],
    answer: "A square has 4 sides",
    difficulty: 1,
  },
  {
    question: "Which number does not belong?",
    options: ["2", "4", "6", "9"],
    answer: "9",
    difficulty: 1,
  },
  {
    question: "Noga is older than Gideon. Gideon is older than Teva. Who is youngest?",
    options: ["Noga", "Gideon", "Teva", "You cannot tell"],
    answer: "Teva",
    difficulty: 1,
  },
  {
    question: "What comes next in the pattern: circle, square, circle, square, __",
    options: ["Triangle", "Circle", "Square", "Star"],
    answer: "Circle",
    difficulty: 1,
  },
  {
    question: "If every robin is a bird and this animal is a robin, what is it also?",
    options: ["A fish", "A bird", "A reptile", "A mammal"],
    answer: "A bird",
    difficulty: 1,
  },
  {
    question: "Which letter comes next: A, C, E, G, __",
    options: ["H", "I", "J", "K"],
    answer: "I",
    difficulty: 2,
  },
  {
    question: "Gabriel is left of Noga. Noga is left of Eden. Who is in the middle?",
    options: ["Gabriel", "Noga", "Eden", "No one"],
    answer: "Noga",
    difficulty: 2,
  },
  {
    question: "Which set follows the same rule as 3, 6, 9, 12?",
    options: ["5, 10, 15, 20", "4, 7, 10, 12", "2, 5, 7, 10", "1, 2, 4, 8"],
    answer: "5, 10, 15, 20",
    difficulty: 2,
  },
  {
    question: "If no cats are dogs and Pip is a cat, what do we know?",
    options: ["Pip is a dog", "Pip is not a dog", "Pip is a fish", "We know nothing"],
    answer: "Pip is not a dog",
    difficulty: 2,
  },
  {
    question: "Which is the odd one out?",
    options: ["Triangle", "Square", "Rectangle", "Apple"],
    answer: "Apple",
    difficulty: 2,
  },
  {
    question: "Gabriel finished before Eden. Eden finished before Teva. Who finished last?",
    options: ["Gabriel", "Eden", "Teva", "They tied"],
    answer: "Teva",
    difficulty: 3,
  },
  {
    question: "Which number comes next: 1, 4, 7, 10, __",
    options: ["11", "12", "13", "14"],
    answer: "13",
    difficulty: 3,
  },
  {
    question: "Which rule matches this pattern: 10, 8, 6, 4, __",
    options: ["Add 2 each time", "Subtract 2 each time", "Double each time", "Subtract 4 each time"],
    answer: "Subtract 2 each time",
    difficulty: 3,
  },
  {
    question: "The red book is heavier than the blue book. The blue book is heavier than the green book. Which book is lightest?",
    options: ["Red book", "Blue book", "Green book", "The red and blue books tie"],
    answer: "Green book",
    difficulty: 3,
  },
  {
    question: "If every insect has 6 legs and an ant is an insect, what must be true?",
    options: ["An ant has 6 legs", "Every 6-legged animal is an ant", "Ants are not insects", "An ant has 8 legs"],
    answer: "An ant has 6 legs",
    difficulty: 3,
  },
  {
    question: "Which number comes next: 2, 4, 8, 16, __",
    options: ["20", "24", "30", "32"],
    answer: "32",
    difficulty: 4,
  },
  {
    question: "The toy is not in the box. It is either on the shelf or under the bed. Gideon checked under the bed and it is not there. Where is the toy?",
    options: ["In the box", "On the shelf", "Outside", "In the closet"],
    answer: "On the shelf",
    difficulty: 4,
  },
  {
    question: "Three friends wore red, blue, and green shirts. Chen wore green. Ali did not wear red. Bea did not wear blue. Who wore the blue shirt?",
    options: ["Ali", "Bea", "Chen", "No one"],
    answer: "Ali",
    difficulty: 4,
  },
  {
    question: "If weekends are days off and Saturday is a weekend, what follows?",
    options: ["Saturday is a school day", "Saturday is a day off", "Every day is a weekend", "Saturday is Monday"],
    answer: "Saturday is a day off",
    difficulty: 4,
  },
  {
    question: "Which number comes next: 3, 6, 12, 24, __",
    options: ["30", "36", "42", "48"],
    answer: "48",
    difficulty: 4,
  },
  {
    question: "A code changes 2 to 5, 4 to 7, and 6 to 9. What should 8 change to?",
    options: ["9", "10", "11", "12"],
    answer: "11",
    difficulty: 5,
  },
  {
    question: "If every tulip is a flower and some flowers are yellow, what can we know for sure?",
    options: ["Every tulip is yellow", "Some tulips are yellow", "A tulip is a flower", "No flowers are yellow"],
    answer: "A tulip is a flower",
    difficulty: 5,
  },
  {
    question: "Eden is shorter than Noga but taller than Teva. Who is tallest?",
    options: ["Eden", "Noga", "Teva", "Eden and Noga"],
    answer: "Noga",
    difficulty: 5,
  },
  {
    question: "Which number comes next: 5, 10, 20, 40, __",
    options: ["45", "60", "70", "80"],
    answer: "80",
    difficulty: 5,
  },
  {
    question: "A snack is hidden in one of three drawers. It is not in the top drawer. The middle drawer is empty. Where is the snack?",
    options: ["Top drawer", "Middle drawer", "Bottom drawer", "It is nowhere"],
    answer: "Bottom drawer",
    difficulty: 5,
  },
  {
    question: "Gabriel is taller than Gideon. Gideon is taller than Teva. Who is tallest?",
    options: ["Gabriel", "Gideon", "Teva", "You cannot tell"],
    answer: "Gabriel",
    difficulty: 1,
  },
  {
    question: "Which number comes next: 4, 8, 12, 16, __",
    options: ["18", "19", "20", "21"],
    answer: "20",
    difficulty: 1,
  },
  {
    question: "Which letter comes next: B, D, F, H, __",
    options: ["I", "J", "K", "L"],
    answer: "J",
    difficulty: 2,
  },
  {
    question: "Which does not belong?",
    options: ["Elbow", "Knee", "Banana", "Ankle"],
    answer: "Banana",
    difficulty: 2,
  },
  {
    question: "If all tulips are flowers and all flowers are plants, what must be true?",
    options: ["Tulips are trees", "Tulips are plants", "All plants are tulips", "Flowers are not plants"],
    answer: "Tulips are plants",
    difficulty: 3,
  },
  {
    question: "Gideon sits between Gabriel and Teva. Who cannot sit on an end?",
    options: ["Gideon", "Gabriel", "Teva", "Gabriel and Teva"],
    answer: "Gideon",
    difficulty: 3,
  },
  {
    question: "The red coin is not in Box A. It is in Box B or Box C. Box C is empty. Where is the red coin?",
    options: ["Box A", "Box B", "Box C", "It is missing"],
    answer: "Box B",
    difficulty: 4,
  },
  {
    question: "Which number comes next: 12, 10, 8, 6, __",
    options: ["5", "4", "3", "2"],
    answer: "4",
    difficulty: 4,
  },
  {
    question: "A code changes 1 to 4, 3 to 6, and 5 to 8. What should 7 change to?",
    options: ["9", "10", "11", "12"],
    answer: "10",
    difficulty: 5,
  },
  {
    question: "If every rectangle has 4 sides and this shape has 3 sides, what can you know for sure?",
    options: ["It is a rectangle", "It is not a rectangle", "It is a square", "It is a circle"],
    answer: "It is not a rectangle",
    difficulty: 5,
  },
  {
    question: "Which number comes next: 1, 2, 4, 8, __",
    options: ["10", "12", "16", "18"],
    answer: "16",
    difficulty: 1,
  },
  {
    question: "If all bloops are razzies and all razzies are blue, what must be true about a bloop?",
    options: ["It is blue", "It is red", "It is not a razzy", "It is a number"],
    answer: "It is blue",
    difficulty: 1,
  },
  {
    question: "Eden sits right of Noga and left of Gabriel. Who is in the middle?",
    options: ["Eden", "Noga", "Gabriel", "No one"],
    answer: "Eden",
    difficulty: 2,
  },
  {
    question: "If all frogs are animals and this is a frog, what is it?",
    options: ['A plant', 'An animal', 'A rock', 'A toy'],
    answer: "An animal",
    difficulty: 1,
  },
  {
    question: "The bag is not in the closet. It is either under the bed or by the door. It is not under the bed. Where is the bag?",
    options: ["In the closet", "By the door", "On the roof", "In the sink"],
    answer: "By the door",
    difficulty: 3,
  },
  {
    question: "Which letter comes next: Z, X, V, T, __",
    options: ["R", "S", "U", "W"],
    answer: "R",
    difficulty: 3,
  },
  {
    question: "If no fish can fly and tuna is a fish, what must be true?",
    options: ["Tuna can fly", "Tuna cannot fly", "Tuna is a bird", "All birds are fish"],
    answer: "Tuna cannot fly",
    difficulty: 4,
  },
  {
    question: "Which set follows the same rule as 2, 5, 8, 11?",
    options: ["4, 7, 10, 13", "3, 6, 12, 24", "1, 4, 9, 16", "5, 9, 10, 18"],
    answer: "4, 7, 10, 13",
    difficulty: 4,
  },
  {
    question: "The red ball is heavier than the blue ball. The blue ball is heavier than the green ball. Which ball is heaviest?",
    options: ["Red", "Blue", "Green", "Blue and green tie"],
    answer: "Red",
    difficulty: 5,
  },
  {
    question: "The key is in drawer A or drawer B. It is not in drawer A. Where is the key?",
    options: ["Drawer A", "Drawer B", "In both drawers", "In neither drawer"],
    answer: "Drawer B",
    difficulty: 5,
  },
  {
    question: "If all apples are fruit and this is an apple, what is it?",
    options: ["A vegetable", "A fruit", "A toy", "A rock"],
    answer: "A fruit",
    difficulty: 1,
  },
  {
    question: "What comes next: 10, 12, 14, __",
    options: ['15', '16', '17', '18'],
    answer: "16",
    difficulty: 1,
  },
  {
    question: "What comes next: sun, moon, sun, moon, __",
    options: ["Star", "Cloud", "Sun", "Tree"],
    answer: "Sun",
    difficulty: 1,
  },
  {
    question: "If every dog barks and this animal is a dog, what must be true?",
    options: ["It barks", "It swims", "It flies", "It is a cat"],
    answer: "It barks",
    difficulty: 1,
  },
  {
    question: "Which shape has exactly 3 sides?",
    options: ['Square', 'Triangle', 'Circle', 'Rectangle'],
    answer: "Triangle",
    difficulty: 1,
  },
  {
    question: "Gideon is older than Gabriel. Gabriel is older than Eden. Who is youngest?",
    options: ["Gideon", "Gabriel", "Eden", "You cannot tell"],
    answer: "Eden",
    difficulty: 1,
  },
  {
    question: "Which set follows the same rule as 2, 4, 6, 8?",
    options: ["10, 12, 14, 16", "11, 14, 17, 20", "1, 3, 6, 10", "5, 9, 13, 18"],
    answer: "10, 12, 14, 16",
    difficulty: 1,
  },
  {
    question: "If no birds are fish and this animal is a bird, what is true?",
    options: ["It is a fish", "It is not a fish", "It is a rock", "It is a turtle"],
    answer: "It is not a fish",
    difficulty: 1,
  },
  {
    question: "What comes next: green, yellow, green, yellow, __",
    options: ['Green', 'Yellow', 'Blue', 'Red'],
    answer: "Green",
    difficulty: 1,
  },
  {
    question: "Eden is left of Noga. Noga is left of Teva. Who is in the middle?",
    options: ["Eden", "Noga", "Teva", "No one"],
    answer: "Noga",
    difficulty: 2,
  },
  {
    question: "Which number comes next: 5, 10, 15, 20, __",
    options: ["22", "24", "25", "30"],
    answer: "25",
    difficulty: 2,
  },
  {
    question: "If all squares have 4 sides, which shape must have 4 sides?",
    options: ["Triangle", "Square", "Circle", "Star"],
    answer: "Square",
    difficulty: 2,
  },
  {
    question: "If every sunflower is a plant and this is a sunflower, what is it?",
    options: ['A plant', 'A bird', 'A fish', 'A chair'],
    answer: "A plant",
    difficulty: 1,
  },
  {
    question: "Which set follows the same rule as 1, 4, 7, 10?",
    options: ["2, 5, 8, 11", "3, 6, 12, 24", "4, 8, 12, 15", "5, 10, 15, 21"],
    answer: "2, 5, 8, 11",
    difficulty: 2,
  },
  {
    question: "If no cats are birds and Milo is a cat, what do we know?",
    options: ["Milo is a bird", "Milo is not a bird", "Milo is a fish", "We know nothing"],
    answer: "Milo is not a bird",
    difficulty: 2,
  },
  {
    question: "Which number is smallest: 3, 7, 5, 9?",
    options: ['3', '5', '7', '9'],
    answer: "3",
    difficulty: 1,
  },
  {
    question: "Noga finished before Gabriel. Gabriel finished before Eden. Who finished last?",
    options: ["Noga", "Gabriel", "Eden", "They tied"],
    answer: "Eden",
    difficulty: 2,
  },
  {
    question: "Which number comes next: 2, 5, 8, 11, 14, __",
    options: ["15", "16", "17", "18"],
    answer: "17",
    difficulty: 2,
  },
  {
    question: "Which number comes next: 12, 9, 6, 3, __",
    options: ["1", "0", "-1", "-3"],
    answer: "0",
    difficulty: 3,
  },
  {
    question: "The toy is not in the drawer. It is either on the shelf or on the table. It is not on the shelf. Where is the toy?",
    options: ["In the drawer", "On the shelf", "On the table", "Under the bed"],
    answer: "On the table",
    difficulty: 3,
  },
  {
    question: "Three kids wore red, blue, and green shirts. Teva did not wear red. Noga did not wear blue. Eden wore green. Who wore blue?",
    options: ["Teva", "Noga", "Eden", "No one"],
    answer: "Teva",
    difficulty: 3,
  },
  {
    question: "If weekdays are school days and Monday is a weekday, what follows?",
    options: ["Monday is a school day", "Monday is a weekend day", "Monday is a holiday", "Monday is a night"],
    answer: "Monday is a school day",
    difficulty: 3,
  },
  {
    question: "Noga is taller than Gideon. Gideon is taller than Gabriel. Who is shortest?",
    options: ['Noga', 'Gideon', 'Gabriel', 'You cannot tell'],
    answer: "Gabriel",
    difficulty: 1,
  },
  {
    question: "If every tulip is a flower and this is a tulip, what is it?",
    options: ["A flower", "A tree", "A rock", "A bug"],
    answer: "A flower",
    difficulty: 3,
  },
  {
    question: "Gideon sits between Eden and Teva. Who cannot sit on an end?",
    options: ["Gideon", "Eden", "Teva", "Eden and Teva"],
    answer: "Gideon",
    difficulty: 3,
  },
  {
    question: "What comes next: 7, 14, 21, 28, __",
    options: ['30', '32', '35', '38'],
    answer: "35",
    difficulty: 1,
  },
  {
    question: "Which one does not belong: apple, banana, carrot, pencil?",
    options: ['Apple', 'Banana', 'Carrot', 'Pencil'],
    answer: "Pencil",
    difficulty: 2,
  },
  {
    question: "Which number comes next: 7, 14, 28, 56, __",
    options: ["64", "84", "98", "112"],
    answer: "112",
    difficulty: 4,
  },
  {
    question: "If no robots are animals and Rolo is a robot, what must be true?",
    options: ["Rolo is an animal", "Rolo is not an animal", "Rolo is a bird", "Rolo is a tree"],
    answer: "Rolo is not an animal",
    difficulty: 4,
  },
  {
    question: "Which set follows the same rule as 4, 8, 12, 16?",
    options: ["6, 10, 14, 18", "5, 11, 17, 23", "3, 6, 12, 24", "2, 3, 5, 8"],
    answer: "6, 10, 14, 18",
    difficulty: 4,
  },
  {
    question: "A code changes 3 to 7, 5 to 9, and 8 to 12. What should 10 change to?",
    options: ["12", "13", "14", "15"],
    answer: "14",
    difficulty: 4,
  },
  {
    question: "The key is in box A or box B. It is not in box A. Where is the key?",
    options: ["Box A", "Box B", "Both boxes", "Neither box"],
    answer: "Box B",
    difficulty: 4,
  },
  {
    question: "The toy is on the shelf or the table. It is not on the shelf. Where is it?",
    options: ['The shelf', 'The table', 'The drawer', 'The closet'],
    answer: "The table",
    difficulty: 2,
  },
  {
    question: "Which letter comes next: Z, W, T, Q, __",
    options: ["N", "O", "P", "R"],
    answer: "N",
    difficulty: 4,
  },
  {
    question: "If no fish can bark and Salmon is a fish, what must be true?",
    options: ["Salmon can bark", "Salmon cannot bark", "Salmon is a dog", "All dogs are fish"],
    answer: "Salmon cannot bark",
    difficulty: 4,
  },
  {
    question: "Which number comes next: 2, 6, 18, 54, __",
    options: ["72", "108", "162", "216"],
    answer: "162",
    difficulty: 4,
  },
  {
    question: "A code changes 2 to 7, 4 to 9, and 6 to 11. What should 8 change to?",
    options: ["12", "13", "14", "15"],
    answer: "13",
    difficulty: 5,
  },
  {
    question: "If all squares are rectangles and this shape is a square, what must be true?",
    options: ["It is a rectangle", "It is a triangle", "It is a circle", "It is not a shape"],
    answer: "It is a rectangle",
    difficulty: 5,
  },
  {
    question: "What comes next: 2, 3, 5, 8, 12, __",
    options: ["15", "16", "17", "18"],
    answer: "17",
    difficulty: 5,
  },
  {
    question: "What comes next: 1, 2, 4, 7, 11, __",
    options: ["14", "15", "16", "18"],
    answer: "16",
    difficulty: 5,
  },
  {
    question: "A pattern repeats: red, red, blue, red, red, blue, __",
    options: ["Red", "Blue", "Green", "Yellow"],
    answer: "Red",
    difficulty: 5,
  },
  {
    question: "The number is greater than 10. It is less than 15. It is even. It is not 14. What is it?",
    options: ["11", "12", "13", "15"],
    answer: "12",
    difficulty: 5,
  },
  {
    question: "Dana is first. Noga is not first. Eden is not last. Who is in the middle?",
    options: ["Dana", "Noga", "Eden", "You cannot tell"],
    answer: "Eden",
    difficulty: 5,
  },
  {
    question: "The gem is in box A, box B, or box C. It is not in box A. It is not in box C. Where is it?",
    options: ["Box A", "Box B", "Box C", "It is nowhere"],
    answer: "Box B",
    difficulty: 5,
  },
  {
    question: "If a number is doubled and then 3 is added, what does 5 become?",
    options: ["10", "11", "12", "13"],
    answer: "13",
    difficulty: 5,
  },
  {
    question: "If all dogs are animals and this is a dog, what is it?",
    options: ["An animal", "A bird", "A fish", "A car"],
    answer: "An animal",
    difficulty: 1,
  },
  {
    question: "What comes next: 2, 4, 6, __",
    options: ["7", "8", "9", "10"],
    answer: "8",
    difficulty: 1,
  },
  {
    question: "Which shape has 3 sides?",
    options: ["Square", "Triangle", "Circle", "Rectangle"],
    answer: "Triangle",
    difficulty: 1,
  },
  {
    question: "What comes next: red, blue, red, blue, __",
    options: ["Red", "Blue", "Green", "Yellow"],
    answer: "Red",
    difficulty: 1,
  },
  {
    question: "If every apple is a fruit and this is an apple, what is it?",
    options: ["A vegetable", "A fruit", "A tree", "A toy"],
    answer: "A fruit",
    difficulty: 1,
  },
  {
    question: "Which number is bigger?",
    options: ["7", "9", "4", "2"],
    answer: "9",
    difficulty: 1,
  },
  {
    question: "Noga is taller than Gideon. Gideon is taller than Teva. Who is shortest?",
    options: ["Noga", "Gideon", "Teva", "No one"],
    answer: "Teva",
    difficulty: 1,
  },
  {
    question: "Which letter comes next: A, C, E, __",
    options: ["F", "G", "H", "I"],
    answer: "G",
    difficulty: 1,
  },
  {
    question: "Which one does not belong?",
    options: ["Cat", "Dog", "Fish", "Chair"],
    answer: "Chair",
    difficulty: 1,
  },
  {
    question: "If no birds are fish and this is a bird, what is true?",
    options: ["It is a fish", "It is not a fish", "It is a rock", "It is a cat"],
    answer: "It is not a fish",
    difficulty: 1,
  },
  {
    question: "If every square is a rectangle and this shape is a square, what must be true?",
    options: ['It is a rectangle', 'It is a triangle', 'It is a circle', 'It is a hexagon'],
    answer: "It is a rectangle",
    difficulty: 2,
  },
  {
    question: "Which set follows the same rule as 1, 2, 3?",
    options: ["4, 5, 6", "2, 4, 6", "1, 3, 5", "3, 6, 9"],
    answer: "4, 5, 6",
    difficulty: 1,
  },
  {
    question: "If all flowers are plants and this is a flower, what is it?",
    options: ["A plant", "A rock", "A bird", "A shoe"],
    answer: "A plant",
    difficulty: 1,
  },
  {
    question: "Which letter comes next: C, E, G, I, __",
    options: ['J', 'K', 'L', 'M'],
    answer: "K",
    difficulty: 2,
  },
  {
    question: "If Eden is left of Noga and Noga is left of Gabriel, who is in the middle?",
    options: ["Eden", "Noga", "Gabriel", "No one"],
    answer: "Noga",
    difficulty: 1,
  },
  {
    question: "What comes next: 5, 10, 15, __",
    options: ["18", "20", "21", "25"],
    answer: "20",
    difficulty: 1,
  },
  {
    question: "If every cat meows and this animal is a cat, what must be true?",
    options: ["It meows", "It swims", "It flies", "It is a horse"],
    answer: "It meows",
    difficulty: 1,
  },
  {
    question: "Which number is smaller?",
    options: ["4", "6", "8", "10"],
    answer: "4",
    difficulty: 1,
  },
  {
    question: "What comes next: 3, 6, 9, 12, __",
    options: ["14", "15", "16", "18"],
    answer: "15",
    difficulty: 2,
  },
  {
    question: "Eden is left of Gabriel. Gabriel is left of Teva. Who is in the middle?",
    options: ["Eden", "Gabriel", "Teva", "No one"],
    answer: "Gabriel",
    difficulty: 2,
  },
  {
    question: "If a shape has 5 sides, what is it?",
    options: ['Triangle', 'Square', 'Pentagon', 'Hexagon'],
    answer: "Pentagon",
    difficulty: 4,
  },
  {
    question: "What comes next: 10, 20, 30, __",
    options: ["35", "40", "45", "50"],
    answer: "40",
    difficulty: 2,
  },
  {
    question: "If a bag is not in box A and not in box C, where is it?",
    options: ['Box A', 'Box B', 'Box C', 'Box D'],
    answer: "Box B",
    difficulty: 2,
  },
  {
    question: "Which letter comes next: Y, W, U, S, __",
    options: ['Q', 'R', 'T', 'V'],
    answer: "Q",
    difficulty: 4,
  },
  {
    question: "If no fish can walk and Nemo is a fish, what must be true?",
    options: ['Nemo can walk', 'Nemo cannot walk', 'Nemo is a bird', 'Nemo is a tree'],
    answer: "Nemo cannot walk",
    difficulty: 3,
  },
  {
    question: "If all squares have four sides, which shape must have four sides?",
    options: ["Triangle", "Square", "Circle", "Star"],
    answer: "Square",
    difficulty: 2,
  },
  {
    question: "Gabriel is older than Eden. Eden is older than Teva. Who is youngest?",
    options: ["Gabriel", "Eden", "Teva", "You cannot tell"],
    answer: "Teva",
    difficulty: 2,
  },
  {
    question: "What comes next: 5, 8, 11, 14, __",
    options: ["15", "16", "17", "18"],
    answer: "17",
    difficulty: 2,
  },
  {
    question: "The red block is left of blue, and blue is left of green. Which block is in the middle?",
    options: ['Red', 'Blue', 'Green', 'They are tied'],
    answer: "Blue",
    difficulty: 3,
  },
  {
    question: "Which word does not belong?",
    options: ["Monday", "Tuesday", "April", "Wednesday"],
    answer: "April",
    difficulty: 2,
  },
  {
    question: "If a box has 2 red balls and 1 blue ball, which color is more likely to be picked?",
    options: ["Red", "Blue", "Green", "Yellow"],
    answer: "Red",
    difficulty: 2,
  },
  {
    question: "Which comes next: A, D, G, J, __",
    options: ["K", "L", "M", "N"],
    answer: "M",
    difficulty: 2,
  },
  {
    question: "If all pencils are tools and this is a pencil, what is it?",
    options: ["A tool", "A toy", "A fruit", "A shoe"],
    answer: "A tool",
    difficulty: 2,
  },
  {
    question: "If the light is on, the room is bright. The light is on. What must be true?",
    options: ["The room is bright", "The room is dark", "It is night", "Nothing"],
    answer: "The room is bright",
    difficulty: 2,
  },
  {
    question: "If no frogs are birds and this animal is a frog, what must be true?",
    options: ['It is a bird', 'It is not a bird', 'It is a cat', 'It is a fish'],
    answer: "It is not a bird",
    difficulty: 3,
  },
  {
    question: "If every kite needs string and this is a kite, what must be true?",
    options: ["It needs string", "It needs water", "It needs wings", "It needs wheels"],
    answer: "It needs string",
    difficulty: 2,
  },
  {
    question: "The bag is under the bed or in the closet. It is not under the bed. Where is it?",
    options: ['In the bed', 'Under the bed', 'In the closet', 'On the chair'],
    answer: "In the closet",
    difficulty: 3,
  },
  {
    question: "Three kids wore hats. Gabriel did not wear red. Noga did not wear blue. Eden wore green. Who wore blue?",
    options: ['Gabriel', 'Noga', 'Eden', 'No one'],
    answer: "Gabriel",
    difficulty: 3,
  },
  {
    question: "If weekdays are school days and Friday is a weekday, what follows?",
    options: ['Friday is a school day', 'Friday is a weekend day', 'Friday is a holiday', 'Friday is a night'],
    answer: "Friday is a school day",
    difficulty: 3,
  },
  {
    question: "What comes next: 3, 6, 12, 24, __",
    options: ["30", "36", "48", "54"],
    answer: "48",
    difficulty: 3,
  },
  {
    question: "Which set follows the same rule as 4, 7, 10, 13?",
    options: ['16, 19, 22, 25', '5, 8, 12, 15', '2, 6, 10, 14', '20, 24, 28, 31'],
    answer: "16, 19, 22, 25",
    difficulty: 2,
  },
  {
    question: "If no cats are dogs and this animal is a cat, what is true?",
    options: ['It is a dog', 'It is not a dog', 'It is a bird', 'It is a horse'],
    answer: "It is not a dog",
    difficulty: 1,
  },
  {
    question: "Which set follows the same rule as 5, 8, 11, 14?",
    options: ['17, 20, 23, 26', '16, 18, 22, 24', '2, 4, 6, 8', '7, 11, 15, 21'],
    answer: "17, 20, 23, 26",
    difficulty: 2,
  },
  {
    question: "If all maps use symbols and this is a map, what must be true?",
    options: ['It uses symbols', 'It is a toy', 'It is a book', 'It has no meaning'],
    answer: "It uses symbols",
    difficulty: 4,
  },
  {
    question: "A machine adds 3 each time. What comes next: 4, 7, 10, 13, __",
    options: ["15", "16", "17", "18"],
    answer: "16",
    difficulty: 3,
  },
  {
    question: "If every dolphin is a mammal and this animal is a dolphin, what is it?",
    options: ["A mammal", "A bird", "A fish", "A snake"],
    answer: "A mammal",
    difficulty: 3,
  },
  {
    question: "Noga sits between Gabriel and Teva. Who cannot sit on an end?",
    options: ['Gabriel', 'Noga', 'Teva', 'No one'],
    answer: "Noga",
    difficulty: 3,
  },
  {
    question: "What comes next: 24, 20, 16, 12, __",
    options: ["6", "8", "10", "14"],
    answer: "8",
    difficulty: 3,
  },
  {
    question: "The key is in the drawer or on the table. It is not on the table. Where is it?",
    options: ['The drawer', 'The table', 'The shelf', 'The floor'],
    answer: "The drawer",
    difficulty: 3,
  },
  {
    question: "If the red ball is heavier than blue and blue is heavier than green, which ball is lightest?",
    options: ["Red", "Blue", "Green", "They weigh the same"],
    answer: "Green",
    difficulty: 3,
  },
  {
    question: "Which word is the odd one out?",
    options: ["Potato", "Carrot", "Onion", "Apple"],
    answer: "Apple",
    difficulty: 3,
  },
  {
    question: "If all squares are shapes and all shapes can be drawn, what must be true about squares?",
    options: ["They can be drawn", "They are vegetables", "They are circles", "They cannot be drawn"],
    answer: "They can be drawn",
    difficulty: 3,
  },
  {
    question: "Which number comes next: 1, 4, 7, 10, 13, __",
    options: ["15", "16", "17", "19"],
    answer: "16",
    difficulty: 3,
  },
  {
    question: "If the key is in drawer A or B, and it is not in drawer A, where is it?",
    options: ["Drawer A", "Drawer B", "Both drawers", "Neither drawer"],
    answer: "Drawer B",
    difficulty: 3,
  },
  {
    question: "Which number comes next: 2, 6, 12, 20, __",
    options: ["24", "28", "30", "32"],
    answer: "30",
    difficulty: 4,
  },
  {
    question: "If every rectangle is a quadrilateral and every square is a rectangle, what must be true about a square?",
    options: ["It is a quadrilateral", "It is a circle", "It is a triangle", "It is not a shape"],
    answer: "It is a quadrilateral",
    difficulty: 4,
  },
  {
    question: "Three kids wore red, blue, and green shirts. Gabriel is not red. Gideon is not blue. Eden wore green. Who wore red?",
    options: ["Gabriel", "Gideon", "Eden", "No one"],
    answer: "Gideon",
    difficulty: 4,
  },
  {
    question: "What comes next: 5, 11, 19, 29, __",
    options: ["37", "39", "40", "41"],
    answer: "41",
    difficulty: 4,
  },
  {
    question: "The prize is in box A, B, C, or D. It is not in A or D. It is not in B. Where is it?",
    options: ["A", "B", "C", "D"],
    answer: "C",
    difficulty: 4,
  },
  {
    question: "A code changes 4 to 9, 5 to 11, and 6 to 13. What does 7 become?",
    options: ["14", "15", "16", "17"],
    answer: "15",
    difficulty: 4,
  },
  {
    question: "Which set follows the same rule as 3, 9, 27?",
    options: ["6, 18, 54", "4, 8, 16", "5, 10, 15", "7, 14, 28"],
    answer: "6, 18, 54",
    difficulty: 4,
  },
  {
    question: "A pattern repeats: circle, circle, square, circle, circle, square, __",
    options: ["Circle", "Square", "Triangle", "Star"],
    answer: "Circle",
    difficulty: 4,
  },
  {
    question: "The key is not in box 1. It is in box 2 or 3. Box 2 is empty. Where is the key?",
    options: ["Box 1", "Box 2", "Box 3", "It is missing"],
    answer: "Box 3",
    difficulty: 4,
  },
  {
    question: "What comes next: 100, 90, 81, 73, __",
    options: ["65", "66", "67", "68"],
    answer: "66",
    difficulty: 4,
  },
  {
    question: "If all tulips are flowers and some flowers are yellow, what can we know for sure?",
    options: ["Tulips are flowers", "All flowers are yellow", "All tulips are yellow", "No flowers are yellow"],
    answer: "Tulips are flowers",
    difficulty: 4,
  },
  {
    question: "Which shape has 4 equal sides and 4 right angles?",
    options: ["Triangle", "Circle", "Square", "Pentagon"],
    answer: "Square",
    difficulty: 4,
  },
  {
    question: "Dana is first, Noga is not first, and Eden is not last. Who is in the middle?",
    options: ["Dana", "Noga", "Eden", "No one"],
    answer: "Eden",
    difficulty: 4,
  },
  {
    question: "A machine doubles a number and then adds 1. What does 4 become?",
    options: ["8", "9", "10", "11"],
    answer: "9",
    difficulty: 4,
  },
  {
    question: "Which is the only prime number in the list 21, 22, 23, 24?",
    options: ['21', '22', '23', '24'],
    answer: "23",
    difficulty: 5,
  },
  {
    question: "If all clocks show time and this is a clock, what must be true?",
    options: ['It shows time', 'It makes food', 'It is a shoe', 'It is a book'],
    answer: "It shows time",
    difficulty: 4,
  },
  {
    question: "Which number comes next: 30, 25, 21, 18, __",
    options: ["14", "15", "16", "17"],
    answer: "16",
    difficulty: 4,
  },
  {
    question: "If every bloop is a razzy and every razzy is blue, what must a bloop be?",
    options: ["Blue", "Red", "Green", "Yellow"],
    answer: "Blue",
    difficulty: 5,
  },
  {
    question: "The gem is in box A, B, C, or D. It is not in A. It is not in C. It is not in D. Where is it?",
    options: ["A", "B", "C", "D"],
    answer: "B",
    difficulty: 5,
  },
  {
    question: "A machine changes 3 to 8, 4 to 10, and 5 to 12. What does 9 become?",
    options: ["18", "19", "20", "21"],
    answer: "20",
    difficulty: 5,
  },
  {
    question: "What comes next: 1, 2, 6, 24, __",
    options: ["48", "60", "72", "120"],
    answer: "120",
    difficulty: 5,
  },
  {
    question: "If a number is greater than 20, less than 30, even, and a multiple of 7, what is it?",
    options: ["21", "24", "28", "30"],
    answer: "28",
    difficulty: 5,
  },
  {
    question: "Gabriel is taller than Teva, but shorter than Noga. Who is tallest?",
    options: ["Gabriel", "Teva", "Noga", "No one"],
    answer: "Noga",
    difficulty: 5,
  },
  {
    question: "The toy is not in the box, not in the drawer, and not on the shelf. It is on the table or under the chair. Under the chair is empty. Where is it?",
    options: ["The box", "The drawer", "The table", "The shelf"],
    answer: "The table",
    difficulty: 5,
  },
  {
    question: "If every maple is a tree and every tree needs water, what must be true about a maple?",
    options: ["It needs water", "It is a fish", "It has wheels", "It is a rock"],
    answer: "It needs water",
    difficulty: 5,
  },
  {
    question: "Which set follows the same rule as 4, 12, 36?",
    options: ["2, 6, 18", "3, 6, 12", "4, 8, 16", "5, 10, 15"],
    answer: "2, 6, 18",
    difficulty: 5,
  },
  {
    question: "A pattern is red, red, blue, red, red, blue, __",
    options: ["Red", "Blue", "Green", "Yellow"],
    answer: "Red",
    difficulty: 5,
  },
  {
    question: "If the machine adds 4 and then doubles, what does 3 become?",
    options: ["12", "13", "14", "15"],
    answer: "14",
    difficulty: 5,
  },
  {
    question: "If a shape has four equal sides and four right angles, what is it?",
    options: ["Circle", "Triangle", "Square", "Rectangle"],
    answer: "Square",
    difficulty: 5,
  },
  {
    question: "Which number comes next: 2, 5, 11, 23, __",
    options: ["35", "43", "45", "47"],
    answer: "47",
    difficulty: 5,
  },
  {
    question: "A code changes 1 to 4, 3 to 10, and 5 to 16. What does 7 become?",
    options: ["18", "20", "22", "24"],
    answer: "22",
    difficulty: 5,
  },
  {
    question: "A box contains one red, one blue, and one green marble. The red marble is not in box A. The blue marble is not in box B. The green marble is not in box C. If the red marble is in box B, where is the blue marble?",
    options: ["Box A", "Box B", "Box C", "It is nowhere"],
    answer: "Box C",
    difficulty: 5,
  },
  {
    question: "Which number comes next: 8, 16, 32, 64, __",
    options: ["96", "112", "120", "128"],
    answer: "128",
    difficulty: 5,
  },
  {
    question: "If all rectangles are four-sided shapes and this shape is a rectangle, what must be true?",
    options: ["It is a four-sided shape", "It is a triangle", "It is a circle", "It is not a shape"],
    answer: "It is a four-sided shape",
    difficulty: 5,
  },
  {
    question: "The sign says, 'If the light is green, go.' The light is green. What should happen?",
    options: ["Go", "Stop", "Wait", "Turn around"],
    answer: "Go",
    difficulty: 5,
  },
  {
    question: "Which of 29, 30, 32, 34 is prime?",
    options: ['29', '30', '32', '34'],
    answer: "29",
    difficulty: 5,
  },
];

LOGIC_QUESTIONS.push(
  {
    question:
      "Ava, Ben, Cara, and Dov each chose a different color: red, blue, green, or yellow. Ava did not choose red or blue. Ben chose green. Cara did not choose yellow. Which color did Ava choose?",
    options: ["Red", "Blue", "Green", "Yellow"],
    answer: "Yellow",
    difficulty: 6,
  },
  {
    question: "A code changes 2 to 9, 3 to 14, and 4 to 19. What does 7 change to?",
    options: ["29", "32", "34", "36"],
    answer: "34",
    difficulty: 6,
  },
  {
    question:
      "Four books are on a shelf. The atlas is left of the novel. The poem book is right of the novel. The comic is not at either end. Which book is farthest left?",
    options: ["Atlas", "Novel", "Poem book", "Comic"],
    answer: "Atlas",
    difficulty: 7,
  },
  {
    question: "A code changes 1 to 4, 2 to 11, and 3 to 22. What does 5 change to?",
    options: ["42", "46", "50", "54"],
    answer: "46",
    difficulty: 7,
  }
);

function createLogicGeneratedEntry(difficulty) {
  const level = logicClampDifficulty(difficulty);
  const generatorsByLevel = {
    1: [
      logicCreateSequenceQuestion,
      logicCreateOrderQuestion,
      logicCreateSimpleSyllogismQuestion,
    ],
    2: [
      logicCreateLetterSequenceQuestion,
      logicCreateEliminationQuestion,
      logicCreateOddOneOutQuestion,
    ],
    3: [
      logicCreateSequenceQuestion,
      logicCreateOrderQuestion,
      logicCreateTwoStepLogicQuestion,
    ],
    4: [
      logicCreateLogicGridQuestion,
      logicCreateEliminationQuestion,
      logicCreateSequenceQuestion,
    ],
    5: [
      logicCreateLogicGridQuestion,
      logicCreateTwoStepLogicQuestion,
      logicCreateOddOneOutQuestion,
    ],
    6: [
      logicCreateMultiConstraintQuestion,
      logicCreateRuleTableQuestion,
      logicCreateConditionalChainQuestion,
    ],
    7: [
      logicCreateMultiConstraintQuestion,
      logicCreateRuleTableQuestion,
      logicCreateConditionalChainQuestion,
    ],
  };

  return logicRandomChoice(generatorsByLevel[level])();
}

function logicCreateSequenceQuestion() {
  const templates = [
    { start: 4, step: 4, options: ["12", "16", "18", "20"], difficulty: 1 },
    { start: 1, step: 3, options: ["8", "9", "10", "11"], difficulty: 2 },
    { start: 10, step: -2, options: ["2", "4", "6", "8"], difficulty: 3 },
    { start: 3, step: 6, options: ["15", "18", "21", "24"], difficulty: 4 },
    { start: 2, step: 4, options: ["14", "16", "18", "20"], difficulty: 5 },
  ];
  const pick = logicRandomChoice(templates);
  const answerNumber = pick.start + pick.step * 4;
  return {
    question: `What comes next in the pattern: ${pick.start}, ${pick.start + pick.step}, ${pick.start + pick.step * 2}, ${pick.start + pick.step * 3}, __`,
    options: logicShuffle(
      pick.options.map(String).includes(String(answerNumber))
        ? pick.options.map(String)
        : logicBuildNumericOptions(String(answerNumber), pick.step)
    ),
    answer: String(answerNumber),
    difficulty: pick.difficulty,
  };
}

function logicCreateLetterSequenceQuestion() {
  const templates = [
    { letters: ["A", "C", "E", "G"], answer: "I", options: ["H", "I", "J", "K"], difficulty: 2 },
    { letters: ["B", "D", "F", "H"], answer: "J", options: ["I", "J", "K", "L"], difficulty: 2 },
    { letters: ["Z", "X", "V", "T"], answer: "R", options: ["R", "S", "U", "W"], difficulty: 3 },
  ];
  const pick = logicRandomChoice(templates);
  return {
    question: `Which letter comes next: ${pick.letters.join(", ")}, __`,
    options: logicShuffle([...pick.options]),
    answer: pick.answer,
    difficulty: pick.difficulty,
  };
}

function logicCreateOrderQuestion() {
  const templates = [
    {
      question: "Noga is taller than Gabriel. Gabriel is taller than Eden. Who is tallest?",
      options: ["Noga", "Gabriel", "Eden", "You cannot tell"],
      answer: "Noga",
      difficulty: 1,
    },
    {
      question: "Gideon finished before Gabriel. Gabriel finished before Teva. Who finished last?",
      options: ["Gideon", "Gabriel", "Teva", "They tied"],
      answer: "Teva",
      difficulty: 2,
    },
    {
      question: "Gabriel is left of Noga. Noga is left of Eden. Who is in the middle?",
      options: ["Gabriel", "Noga", "Eden", "No one"],
      answer: "Noga",
      difficulty: 2,
    },
    {
      question: "Eden is shorter than Noga but taller than Teva. Who is tallest?",
      options: ["Eden", "Noga", "Teva", "Eden and Noga"],
      answer: "Noga",
      difficulty: 5,
    },
  ];
  const pick = logicRandomChoice(templates);
  return {
    question: pick.question,
    options: logicShuffle([...pick.options]),
    answer: pick.answer,
    difficulty: pick.difficulty,
  };
}

function logicCreateSimpleSyllogismQuestion() {
  const templates = [
    {
      question: "If every robin is a bird and this animal is a robin, what is it also?",
      options: ["A fish", "A bird", "A reptile", "A mammal"],
      answer: "A bird",
      difficulty: 1,
    },
    {
      question: "If every frog is an animal and this is a frog, what is it?",
      options: ["A plant", "An animal", "A rock", "A toy"],
      answer: "An animal",
      difficulty: 1,
    },
    {
      question: "If all tulips are flowers and all flowers are plants, what must be true?",
      options: ["Tulips are trees", "Tulips are plants", "All plants are tulips", "Flowers are not plants"],
      answer: "Tulips are plants",
      difficulty: 3,
    },
    {
      question: "If every rectangle has 4 sides and this shape is a rectangle, what must be true?",
      options: ["It is a four-sided shape", "It is a triangle", "It is a circle", "It is not a shape"],
      answer: "It is a four-sided shape",
      difficulty: 5,
    },
  ];
  const pick = logicRandomChoice(templates);
  return {
    question: pick.question,
    options: logicShuffle([...pick.options]),
    answer: pick.answer,
    difficulty: pick.difficulty,
  };
}

function logicCreateEliminationQuestion() {
  const templates = [
    {
      question: "The toy is not in the box. It is either on the shelf or under the bed. The bed is empty. Where is the toy?",
      options: ["In the box", "On the shelf", "Under the bed", "In the closet"],
      answer: "On the shelf",
      difficulty: 4,
    },
    {
      question: "The red coin is not in Box A. It is in Box B or Box C. Box C is empty. Where is the red coin?",
      options: ["Box A", "Box B", "Box C", "It is missing"],
      answer: "Box B",
      difficulty: 4,
    },
    {
      question: "The snack is not in the top drawer. The middle drawer is empty. Where is the snack?",
      options: ["Top drawer", "Middle drawer", "Bottom drawer", "It is nowhere"],
      answer: "Bottom drawer",
      difficulty: 5,
    },
    {
      question: "The gem is in box A, B, C, or D. It is not in A, C, or D. Where is it?",
      options: ["A", "B", "C", "D"],
      answer: "B",
      difficulty: 5,
    },
  ];
  const pick = logicRandomChoice(templates);
  return {
    question: pick.question,
    options: logicShuffle([...pick.options]),
    answer: pick.answer,
    difficulty: pick.difficulty,
  };
}

function logicCreateOddOneOutQuestion() {
  const templates = [
    {
      question: "Which number does not belong?",
      options: ["2", "4", "6", "9"],
      answer: "9",
      difficulty: 1,
    },
    {
      question: "Which does not belong?",
      options: ["Elbow", "Knee", "Banana", "Ankle"],
      answer: "Banana",
      difficulty: 2,
    },
    {
      question: "Which set follows the same rule as 2, 5, 8, 11?",
      options: ["4, 7, 10, 13", "3, 6, 12, 24", "1, 4, 9, 16", "5, 9, 10, 18"],
      answer: "4, 7, 10, 13",
      difficulty: 4,
    },
  ];
  const pick = logicRandomChoice(templates);
  return {
    question: pick.question,
    options: logicShuffle([...pick.options]),
    answer: pick.answer,
    difficulty: pick.difficulty,
  };
}

function logicCreateTwoStepLogicQuestion() {
  const templates = [
    {
      question: "If all bloops are razzies and all razzies are blue, what must be true about a bloop?",
      options: ["It is blue", "It is red", "It is not a razzy", "It is a number"],
      answer: "It is blue",
      difficulty: 1,
    },
    {
      question: "If no cats are dogs and Pip is a cat, what do we know?",
      options: ["Pip is a dog", "Pip is not a dog", "Pip is a fish", "We know nothing"],
      answer: "Pip is not a dog",
      difficulty: 2,
    },
    {
      question: "If every maple is a tree and every tree needs water, what must be true about a maple?",
      options: ["It needs water", "It is a fish", "It has wheels", "It is a rock"],
      answer: "It needs water",
      difficulty: 5,
    },
  ];
  const pick = logicRandomChoice(templates);
  return {
    question: pick.question,
    options: logicShuffle([...pick.options]),
    answer: pick.answer,
    difficulty: pick.difficulty,
  };
}

function logicCreateLogicGridQuestion() {
  const templates = [
    {
      question: "A code changes 2 to 5, 4 to 7, and 6 to 9. What should 8 change to?",
      options: ["9", "10", "11", "12"],
      answer: "11",
      difficulty: 4,
    },
    {
      question: "A machine changes 3 to 8, 4 to 10, and 5 to 12. What does 9 become?",
      options: ["18", "19", "20", "21"],
      answer: "20",
      difficulty: 5,
    },
    {
      question: "If the machine adds 4 and then doubles, what does 3 become?",
      options: ["12", "13", "14", "15"],
      answer: "14",
      difficulty: 5,
    },
  ];
  const pick = logicRandomChoice(templates);
  return {
    question: pick.question,
    options: logicShuffle([...pick.options]),
    answer: pick.answer,
    difficulty: pick.difficulty,
  };
}

function logicCreateMultiConstraintQuestion() {
  const templates = [
    {
      question:
        "Ava, Ben, Cara, and Dov each chose a different color: red, blue, green, or yellow. Ava did not choose red or blue. Ben chose green. Cara did not choose yellow. Which color did Ava choose?",
      options: ["Red", "Blue", "Green", "Yellow"],
      answer: "Yellow",
      difficulty: 6,
    },
    {
      question:
        "Four books are on a shelf. The atlas is left of the novel. The poem book is right of the novel. The comic is not at either end. Which book is farthest left?",
      options: ["Atlas", "Novel", "Poem book", "Comic"],
      answer: "Atlas",
      difficulty: 7,
    },
  ];
  const pick = logicRandomChoice(templates);
  return {
    question: pick.question,
    options: logicShuffle([...pick.options]),
    answer: pick.answer,
    difficulty: pick.difficulty,
  };
}

function logicCreateRuleTableQuestion() {
  const templates = [
    {
      question: "A code changes 2 to 9, 3 to 14, and 4 to 19. What does 7 change to?",
      options: ["29", "32", "34", "36"],
      answer: "34",
      difficulty: 6,
    },
    {
      question: "A code changes 1 to 4, 2 to 11, and 3 to 22. What does 5 change to?",
      options: ["42", "46", "50", "54"],
      answer: "46",
      difficulty: 7,
    },
  ];
  const pick = logicRandomChoice(templates);
  return {
    question: pick.question,
    options: logicShuffle([...pick.options]),
    answer: pick.answer,
    difficulty: pick.difficulty,
  };
}

function logicCreateConditionalChainQuestion() {
  const templates = [
    {
      question:
        "If the switch is on, the lamp is bright. If the lamp is bright, the door is open. The switch is on. What must be true?",
      options: ["The door is open", "The door is closed", "The switch is off", "The lamp is broken"],
      answer: "The door is open",
      difficulty: 6,
    },
    {
      question:
        "If a card is striped, it is tall. If a card is tall, it is not blue. This card is striped. What must be true?",
      options: ["It is blue", "It is not blue", "It is short", "It is not striped"],
      answer: "It is not blue",
      difficulty: 7,
    },
  ];
  const pick = logicRandomChoice(templates);
  return {
    question: pick.question,
    options: logicShuffle([...pick.options]),
    answer: pick.answer,
    difficulty: pick.difficulty,
  };
}

function logicBuildNumericOptions(answer, step) {
  const value = Number(answer);
  const candidates = [
    value - Math.abs(step || 1),
    value - 2,
    value + 2,
    value + Math.abs(step || 1),
  ]
    .map((candidate) => String(candidate))
    .filter((candidate) => candidate !== String(answer));
  return logicBuildOptions(String(answer), candidates);
}

function logicBuildOptions(answer, candidates) {
  const options = [String(answer)];
  for (const candidate of logicShuffle(Array.from(new Set(candidates.map(String))))) {
    if (!options.includes(candidate)) {
      options.push(candidate);
    }
    if (options.length === 4) {
      break;
    }
  }

  while (options.length < 4) {
    const fallback = `${answer} ${options.length}`;
    if (!options.includes(fallback)) {
      options.push(fallback);
    }
  }

  return logicShuffle(options);
}

function logicClampDifficulty(value) {
  const difficulty = Number(value);
  if (!Number.isInteger(difficulty) || difficulty < 1) {
    return 1;
  }

  return Math.min(7, difficulty);
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

const READING_COMPREHENSION_QUESTIONS = [
  {
    question: "What is the main idea of the passage?",
    passage: "Noah watered his bean plant every day. He put it near a sunny window, and the plant grew taller each week.",
    visualHtml: buildReadingPassageCard("Passage", [
      "Noah watered his bean plant every day.",
      "He put it near a sunny window, and the plant grew taller each week.",
    ]),
    options: [
      "Plants grow better when they get care and sunlight.",
      "Bean plants do not need water.",
      "Windows are only useful for decoration.",
      "Plants always stay the same size.",
    ],
    answer: "Plants grow better when they get care and sunlight.",
    difficulty: 1,
  },
  {
    question: "What can you tell about Mia from the passage?",
    visualHtml: buildReadingPassageCard("Passage", [
      "Mia packed an umbrella, a raincoat, and boots before leaving the house.",
      "Dark clouds covered the sky.",
    ]),
    options: [
      "She expected rainy weather.",
      "She was going swimming.",
      "She forgot to check the weather.",
      "She was going to the beach for sunshine.",
    ],
    answer: "She expected rainy weather.",
    difficulty: 1,
  },
  {
    question: "In the passage, what does the word 'it' refer to?",
    visualHtml: buildReadingPassageCard("Passage", [
      "The turtle was moving slowly across the path.",
      "Ben picked it up and carried it to the grass.",
    ]),
    options: ["The path", "The grass", "The turtle", "Ben"],
    answer: "The turtle",
    difficulty: 1,
  },
  {
    question: "What does 'careful' most likely mean in the passage?",
    visualHtml: buildReadingPassageCard("Passage", [
      "Talia was careful while carrying the glass of water.",
      "She held it with both hands so it would not spill.",
    ]),
    options: ["Slow and safe", "Very loud", "Confused", "Hungry"],
    answer: "Slow and safe",
    difficulty: 2,
  },
  {
    question: "How is this passage organized?",
    visualHtml: buildReadingPassageCard("Passage", [
      "First, Leo mixed the batter.",
      "Next, he poured it into a pan.",
      "Finally, he flipped the pancake.",
    ]),
    options: ["Steps in order", "Compare and contrast", "A problem and a solution", "A list of facts only"],
    answer: "Steps in order",
    difficulty: 2,
  },
  {
    question: "What is the main idea of the passage?",
    visualHtml: buildReadingPassageCard("Passage", [
      "The class set up a bird feeder near the window.",
      "Each morning, the children checked which birds came to eat.",
      "They wrote down the names of the birds they saw.",
    ]),
    options: [
      "The class observed birds at a feeder.",
      "The children wanted to move the window.",
      "Birds only come out at night.",
      "The class was painting a wall.",
    ],
    answer: "The class observed birds at a feeder.",
    difficulty: 2,
  },
  {
    question: "Why did Sam probably bring a flashlight?",
    visualHtml: buildReadingPassageCard("Passage", [
      "Sam and his sister were walking back from the garden after sunset.",
      "The path was dark near the gate.",
    ]),
    options: [
      "To see in the dark",
      "To make the garden brighter all day",
      "To water the plants",
      "To count the birds",
    ],
    answer: "To see in the dark",
    difficulty: 2,
  },
  {
    question: "What is the meaning of 'swift' in the passage?",
    visualHtml: buildReadingPassageCard("Passage", [
      "The swift rabbit dashed across the field.",
      "It moved so fast that the dog could not catch it.",
    ]),
    options: ["Fast", "Tiny", "Silent", "Sleepy"],
    answer: "Fast",
    difficulty: 3,
  },
  {
    question: "What is the main idea of the passage?",
    visualHtml: buildReadingPassageCard("Passage", [
      "The school garden had tomatoes, carrots, and lettuce.",
      "Students watered the plants, pulled weeds, and picked ripe vegetables.",
      "Later, they used some of the vegetables in the cafeteria salad.",
    ]),
    options: [
      "Students helped take care of a school garden.",
      "The cafeteria only served salad.",
      "Tomatoes grow in the winter only.",
      "Gardens do not need water.",
    ],
    answer: "Students helped take care of a school garden.",
    difficulty: 3,
  },
  {
    question: "What does the author mostly want you to understand?",
    visualHtml: buildReadingPassageCard("Passage", [
      "At first, Priya felt nervous about the swim race.",
      "After a few practice laps, she felt calm and ready.",
    ]),
    options: [
      "Practice can help make someone feel more ready.",
      "Swim races are always easy.",
      "Nervous people should never try new things.",
      "Calm people do not practice.",
    ],
    answer: "Practice can help make someone feel more ready.",
    difficulty: 3,
  },
  {
    question: "What can you infer from the passage?",
    visualHtml: buildReadingPassageCard("Passage", [
      "The picnic blanket stayed in the car while gray clouds rolled in.",
      "The family decided to go home before the rain started.",
    ]),
    options: [
      "The family thought it would rain soon.",
      "The family wanted to stay outside longer.",
      "The picnic was in the middle of a desert.",
      "The blanket was too small to use.",
    ],
    answer: "The family thought it would rain soon.",
    difficulty: 3,
  },
  {
    question: "How is this passage organized?",
    visualHtml: buildReadingPassageCard("Passage", [
      "The penguin and the seal both live near cold water.",
      "The penguin has feathers, while the seal has fur and flippers.",
    ]),
    options: ["Compare and contrast", "Steps in order", "A question and answer", "A poem"],
    answer: "Compare and contrast",
    difficulty: 4,
  },
  {
    question: "What is the best title for the passage?",
    visualHtml: buildReadingPassageCard("Passage", [
      "Ana checked the recipe, measured the flour, and mixed the dough.",
      "She waited while the dough rose, then baked the bread in the oven.",
    ]),
    options: ["Baking Bread", "How to Build a Treehouse", "A Trip to the Zoo", "A Rainy Day Walk"],
    answer: "Baking Bread",
    difficulty: 4,
  },
  {
    question: "What does the word 'fragile' mean in the passage?",
    visualHtml: buildReadingPassageCard("Passage", [
      "The ornament was fragile, so Jaden wrapped it in soft paper before putting it in the box.",
    ]),
    options: ["Easy to break", "Very heavy", "Very dirty", "Hard to carry"],
    answer: "Easy to break",
    difficulty: 4,
  },
  {
    question: "What is the author's purpose for this passage?",
    visualHtml: buildReadingPassageCard("Passage", [
      "If you want to help a bird feeder stay clean, take away old seeds, wash the tray, and refill it with fresh seed.",
    ]),
    options: [
      "To explain how to do something",
      "To tell a joke",
      "To describe a dream",
      "To argue about a sports game",
    ],
    answer: "To explain how to do something",
    difficulty: 5,
  },
  {
    question: "What is the best inference from the passage?",
    visualHtml: buildReadingPassageCard("Passage", [
      "After the long hike, Omar drank his water bottle quickly and sat down in the shade.",
    ]),
    options: [
      "He was probably tired and thirsty.",
      "He wanted to go swimming.",
      "He was angry at the bottle.",
      "He had just finished a nap.",
    ],
    answer: "He was probably tired and thirsty.",
    difficulty: 5,
  },
  ...[
    {
      question: "What is the main idea of the passage?",
      lines: [
        "Lena borrowed a library book about whales.",
        "She read it each night and shared new facts with her brother.",
      ],
      options: [
        "Lena enjoyed learning about whales.",
        "Lena wanted to swim across the ocean.",
        "Lena was hiding a book from the library.",
        "Lena forgot how to read.",
      ],
      answer: "Lena enjoyed learning about whales.",
      difficulty: 1,
    },
    {
      question: "What can you tell about Evan from the passage?",
      lines: [
        "Evan put on his helmet and knee pads before going outside with his skateboard.",
      ],
      options: [
        "He planned to ride his skateboard.",
        "He was getting ready for bed.",
        "He was going to paint the sidewalk.",
        "He had lost his shoes.",
      ],
      answer: "He planned to ride his skateboard.",
      difficulty: 1,
    },
    {
      question: "In the passage, what does the word 'it' refer to?",
      lines: [
        "The kite landed in a tree.",
        "Maya used a long stick to pull it down.",
      ],
      options: ["The tree", "The stick", "The kite", "Maya"],
      answer: "The kite",
      difficulty: 1,
    },
    {
      question: "What does 'soaked' most likely mean in the passage?",
      lines: [
        "The puppy was soaked after splashing in puddles.",
        "Dad dried it with a towel.",
      ],
      options: ["Very wet", "Very sleepy", "Very noisy", "Very clean"],
      answer: "Very wet",
      difficulty: 1,
    },
    {
      question: "What is the main idea of the passage?",
      lines: [
        "Caleb sorted crayons into red, blue, green, and yellow groups.",
        "Then he put each color back in the art box.",
      ],
      options: [
        "Caleb organized the crayons by color.",
        "Caleb threw the crayons away.",
        "Caleb used the crayons to draw a map.",
        "Caleb was looking for a missing paintbrush.",
      ],
      answer: "Caleb organized the crayons by color.",
      difficulty: 1,
    },
    {
      question: "In the passage, what does the word 'They' refer to?",
      lines: [
        "The chicks chirped when the farmer filled their bowl.",
        "They pecked at the grain right away.",
      ],
      options: ["The bowl", "The chicks", "The farmer", "The grain"],
      answer: "The chicks",
      difficulty: 1,
    },
    {
      question: "What does 'grumbled' most likely mean in the passage?",
      lines: [
        "Rafi's stomach grumbled during math class.",
        "He hurried to eat his sandwich at lunch.",
      ],
      options: ["Made hungry noises", "Sang a song", "Fell asleep", "Got bigger"],
      answer: "Made hungry noises",
      difficulty: 2,
    },
    {
      question: "What is the main idea of the passage?",
      lines: [
        "The neighbors collected cans and paper every Saturday.",
        "They brought the bags to the recycling center together.",
      ],
      options: [
        "The neighbors worked together to recycle.",
        "The neighbors were moving to a new street.",
        "The neighbors were buying new bags.",
        "The neighbors wanted to make more trash.",
      ],
      answer: "The neighbors worked together to recycle.",
      difficulty: 2,
    },
    {
      question: "Why did Chloe probably bring a scarf and gloves?",
      lines: [
        "Chloe wrapped a scarf around her neck and pulled on gloves before leaving for school.",
        "Frost covered the car windows.",
      ],
      options: [
        "She expected cold weather.",
        "She planned to go swimming.",
        "She wanted extra clothes for a costume.",
        "She was cleaning the car.",
      ],
      answer: "She expected cold weather.",
      difficulty: 2,
    },
    {
      question: "In the passage, what does the word 'them' refer to?",
      lines: [
        "Mason found seashells near the rocks.",
        "He washed them and placed them in a jar.",
      ],
      options: ["The rocks", "The jar", "The seashells", "Mason"],
      answer: "The seashells",
      difficulty: 2,
    },
    {
      question: "How is this passage organized?",
      lines: [
        "First, Nora rinsed the apple.",
        "Next, she sliced it.",
        "Last, she placed the pieces on a plate.",
      ],
      options: ["Steps in order", "Compare and contrast", "Problem and solution", "A set of riddles"],
      answer: "Steps in order",
      difficulty: 2,
    },
    {
      question: "What is the best title for the passage?",
      lines: [
        "Zuri folded the flyer and tucked it into her backpack.",
        "On the bus ride home, she practiced her lines for the class play.",
      ],
      options: [
        "Getting Ready for the School Play",
        "Planting a Vegetable Garden",
        "Looking for a Lost Puppy",
        "Riding a Roller Coaster",
      ],
      answer: "Getting Ready for the School Play",
      difficulty: 2,
    },
    {
      question: "What is the main idea of the passage?",
      lines: [
        "The science club made small boats from aluminum foil.",
        "They tested which design could hold the most pennies before sinking.",
      ],
      options: [
        "The science club tested foil boat designs.",
        "The science club learned to sail on a lake.",
        "The science club was collecting pennies for lunch.",
        "The science club repaired a broken sink.",
      ],
      answer: "The science club tested foil boat designs.",
      difficulty: 3,
    },
    {
      question: "What can you infer from the passage?",
      lines: [
        "When the power went out, Theo lit a lantern and brought extra blankets to the couch.",
      ],
      options: [
        "Theo expected to spend some time without electricity.",
        "Theo wanted to build a campfire indoors.",
        "Theo was packing for a beach trip.",
        "Theo was decorating for a birthday party.",
      ],
      answer: "Theo expected to spend some time without electricity.",
      difficulty: 3,
    },
    {
      question: "What does 'enormous' most likely mean in the passage?",
      lines: [
        "The pumpkin was enormous, so two people carried it to the wagon.",
      ],
      options: ["Very large", "Very smooth", "Very orange", "Very old"],
      answer: "Very large",
      difficulty: 3,
    },
    {
      question: "How is this passage organized?",
      lines: [
        "Both bats and birds have wings.",
        "Birds have feathers, but bats have thin skin stretched across their wings.",
      ],
      options: ["Compare and contrast", "Steps in order", "Problem and solution", "A question and answer"],
      answer: "Compare and contrast",
      difficulty: 3,
    },
    {
      question: "What is the best title for the passage?",
      lines: [
        "Each week, Maya dropped part of her allowance into a jar.",
        "After two months, she had enough money to buy the art set she wanted.",
      ],
      options: [
        "Saving for an Art Set",
        "Borrowing Money from a Friend",
        "Losing a Favorite Toy",
        "Painting a Giant Mural",
      ],
      answer: "Saving for an Art Set",
      difficulty: 3,
    },
    {
      question: "What does the author mostly want you to understand?",
      lines: [
        "At first, Zoe missed the soccer goal during practice.",
        "By the end of the week, she kicked the ball between the cones again and again.",
      ],
      options: [
        "Practice helped Zoe improve.",
        "Soccer is only fun for experts.",
        "Zoe wanted to quit her team.",
        "Cones are harder to move than goals.",
      ],
      answer: "Practice helped Zoe improve.",
      difficulty: 3,
    },
    {
      question: "What is the author's purpose for this passage?",
      lines: [
        "To stay safe on a bike trail, wear a helmet, keep to the right, and use hand signals before turning.",
      ],
      options: [
        "To explain how to stay safe while biking",
        "To tell a funny story about a bike ride",
        "To describe a dream about flying",
        "To compare two kinds of helmets",
      ],
      answer: "To explain how to stay safe while biking",
      difficulty: 4,
    },
    {
      question: "What is the best title for the passage?",
      lines: [
        "The museum guide showed the class fossils trapped in stone.",
        "Later, the students used brushes to uncover model fossils from trays of sand.",
      ],
      options: [
        "A Visit to the Fossil Exhibit",
        "How to Train a Pet Dinosaur",
        "Building a Treehouse After School",
        "Racing Through a Corn Maze",
      ],
      answer: "A Visit to the Fossil Exhibit",
      difficulty: 4,
    },
    {
      question: "What can you infer from the passage?",
      lines: [
        "Jules read the recipe twice, lined up each ingredient, and set a timer as soon as the muffins went into the oven.",
      ],
      options: [
        "Jules wanted the muffins to turn out well.",
        "Jules was looking for a way to avoid baking.",
        "Jules had never seen a kitchen before.",
        "Jules planned to leave the house immediately.",
      ],
      answer: "Jules wanted the muffins to turn out well.",
      difficulty: 4,
    },
    {
      question: "What does 'reluctant' most likely mean in the passage?",
      lines: [
        "Nina was reluctant to jump into the cold pool, so she dipped one toe in first.",
      ],
      options: ["Not eager", "Very excited", "Ready to race", "Completely dry"],
      answer: "Not eager",
      difficulty: 4,
    },
    {
      question: "How is this passage organized?",
      lines: [
        "The tomato plant drooped in the heat.",
        "After Maya watered it and moved it into partial shade, the leaves lifted again.",
      ],
      options: ["Problem and solution", "Compare and contrast", "Steps in order", "A list of facts only"],
      answer: "Problem and solution",
      difficulty: 4,
    },
    {
      question: "What does the author mostly want you to understand?",
      lines: [
        "Keisha labeled each drawer on the craft shelf.",
        "Later, everyone found tape, scissors, and glue much faster.",
      ],
      options: [
        "Labels can help people find supplies quickly.",
        "Craft shelves should always be painted blue.",
        "Tape is more useful than glue.",
        "Scissors are hard to carry.",
      ],
      answer: "Labels can help people find supplies quickly.",
      difficulty: 4,
    },
    {
      question: "In the passage, what does the word 'They' refer to?",
      lines: [
        "The hikers studied the trail map before the fork in the path.",
        "They chose the route that led to the waterfall.",
      ],
      options: ["The path", "The hikers", "The waterfall", "The trail map"],
      answer: "The hikers",
      difficulty: 4,
    },
    {
      question: "What is the author's purpose for this passage?",
      lines: [
        "If a bee lands nearby, stay still, avoid waving your arms, and slowly step away.",
      ],
      options: [
        "To explain how to react safely to a bee",
        "To entertain readers with a silly poem",
        "To argue that bees should live indoors",
        "To compare bees with butterflies",
      ],
      answer: "To explain how to react safely to a bee",
      difficulty: 5,
    },
    {
      question: "What can you infer from the passage?",
      lines: [
        "Marcus checked the list at the door, straightened the stack of programs, and smiled when families began taking their seats.",
      ],
      options: [
        "Marcus was helping with an event.",
        "Marcus was waiting to catch a bus.",
        "Marcus wanted to close the building early.",
        "Marcus was getting ready to play soccer.",
      ],
      answer: "Marcus was helping with an event.",
      difficulty: 5,
    },
    {
      question: "What is the best title for the passage?",
      lines: [
        "Volunteers filled trash bags along the river path and planted flowers near the benches.",
        "By noon, the park looked cleaner and brighter.",
      ],
      options: [
        "Cleaning Up the River Park",
        "Building a New Shopping Mall",
        "Learning to Paddle a Canoe",
        "Camping in the Mountains",
      ],
      answer: "Cleaning Up the River Park",
      difficulty: 5,
    },
    {
      question: "What does 'hesitated' most likely mean in the passage?",
      lines: [
        "Imani hesitated at the top of the high diving board and looked down for a long time before climbing back to the ladder.",
      ],
      options: [
        "Paused because she was unsure",
        "Ran forward without thinking",
        "Cheered for the crowd",
        "Finished the race early",
      ],
      answer: "Paused because she was unsure",
      difficulty: 5,
    },
    {
      question: "How is this passage organized?",
      lines: [
        "The hallway grew noisy during group work.",
        "Ms. Chen rang a chime, and the class lowered their voices so everyone could hear.",
      ],
      options: ["Problem and solution", "Compare and contrast", "Steps in order", "A set of questions"],
      answer: "Problem and solution",
      difficulty: 5,
    },
    {
      question: "What is the best inference from the passage?",
      lines: [
        "After weeks of practice, Daniel's robot crossed the finish line without tipping over.",
        "He threw both hands in the air and laughed.",
      ],
      options: [
        "Daniel felt proud that his robot worked.",
        "Daniel was upset that the race had ended.",
        "Daniel wanted to take the robot apart.",
        "Daniel forgot whose robot it was.",
      ],
      answer: "Daniel felt proud that his robot worked.",
      difficulty: 5,
    },
    {
      question: "What does the author mostly want you to understand?",
      lines: [
        "When the storm canceled the picnic, the cousins spread blankets across the living room floor, built a fort, and played card games inside.",
      ],
      options: [
        "They found a fun way to adjust when plans changed.",
        "Storms always last for many days.",
        "Picnics should only happen indoors.",
        "Card games are harder than building forts.",
      ],
      answer: "They found a fun way to adjust when plans changed.",
      difficulty: 5,
    },
  ].map(createReadingStaticPassageQuestion),
];

function createReadingStaticPassageQuestion({
  question,
  title = "Passage",
  lines,
  options,
  answer,
  difficulty,
}) {
  if (!Array.isArray(lines) || lines.length === 0) {
    throw new Error("Reading comprehension passages require at least one line.");
  }

  if (!Array.isArray(options) || options.length !== 4 || !options.includes(answer)) {
    throw new Error("Reading comprehension questions require exactly 4 options with one answer.");
  }

  const passage = lines.join(" ");
  return {
    question,
    passage,
    visualHtml: buildReadingPassageCard(title, lines),
    options,
    answer,
    difficulty: clampReadingDifficulty(difficulty),
    visualSummary: passage,
    reviewText: passage,
  };
}

function createReadingComprehensionGeneratedEntry(difficulty) {
  const level = clampReadingDifficulty(difficulty);
  const generators = {
    1: [
      createReadingMainIdeaQuestion,
      createReadingReferenceQuestion,
      createReadingInferenceQuestion,
    ],
    2: [
      createReadingContextClueQuestion,
      createReadingMainIdeaQuestion,
      createReadingReferenceQuestion,
    ],
    3: [
      createReadingInferenceQuestion,
      createReadingTextStructureQuestion,
      createReadingContextClueQuestion,
    ],
    4: [
      createReadingTextStructureQuestion,
      createReadingAuthorPurposeQuestion,
      createReadingInferenceQuestion,
    ],
    5: [
      createReadingAuthorPurposeQuestion,
      createReadingInferenceQuestion,
      createReadingTextStructureQuestion,
    ],
  }[level];

  return readingRandomChoice(generators)(level);
}

function createReadingMainIdeaQuestion(difficulty = 1) {
  const scenario = readingRandomChoice([
    {
      title: "A Garden",
      lines: [
        "The class planted seeds in a small garden.",
        "They watered the plants and watched them grow.",
      ],
      answer: "The class cared for plants in a garden.",
      options: [
        "The class cared for plants in a garden.",
        "The class built a toy car.",
        "The class went swimming.",
        "The class painted a wall.",
      ],
    },
    {
      title: "A Bird Feeder",
      lines: [
        "Mila filled the bird feeder with seeds.",
        "Soon, birds came to eat each morning.",
      ],
      answer: "Mila helped birds by filling a feeder.",
      options: [
        "Mila helped birds by filling a feeder.",
        "Mila was hiding from birds.",
        "Mila was making soup.",
        "Mila was cleaning a car.",
      ],
    },
  ]);

  return readingBuildQuestion({
    question: "What is the main idea?",
    visualHtml: buildReadingPassageCard(scenario.title, scenario.lines),
    options: scenario.options,
    answer: scenario.answer,
    difficulty,
    visualSummary: scenario.answer,
  });
}

function createReadingReferenceQuestion(difficulty = 1) {
  const animals = [
    ["The kittens were sleepy. They curled up in a basket.", "they", "The kittens"],
    ["The teacher handed Ava a pencil because she did not have one.", "she", "Ava"],
    ["The robot blinked, and it rolled forward slowly.", "it", "The robot"],
  ];
  const [sentence, reference, answer] = readingRandomChoice(animals);
  return readingBuildQuestion({
    question: `In the passage, what does "${reference}" refer to?`,
    visualHtml: buildReadingPassageCard("Passage", [sentence]),
    options: [
      answer,
      "A different person",
      "A place",
      "A time of day",
    ],
    answer,
    difficulty,
    visualSummary: `The word "${reference}" refers to ${answer.toLowerCase()}.`,
  });
}

function createReadingInferenceQuestion(difficulty = 2) {
  const scenarios = [
    {
      title: "A Rainy Day",
      lines: [
        "Jon packed a raincoat and boots before school.",
        "The sky was gray and the wind was cool.",
      ],
      question: "What can you infer?",
      answer: "Jon expected rainy weather.",
      options: [
        "Jon expected rainy weather.",
        "Jon was going to the beach.",
        "Jon was baking cookies.",
        "Jon forgot to get dressed.",
      ],
    },
    {
      title: "A Long Walk",
      lines: [
        "After the hike, Sara sat on a bench and drank water.",
        "She had been walking for a long time.",
      ],
      question: "What can you infer?",
      answer: "Sara was probably tired and thirsty.",
      options: [
        "Sara was probably tired and thirsty.",
        "Sara wanted to play a trumpet.",
        "Sara was making a painting.",
        "Sara was moving to a new house.",
      ],
    },
  ];

  const scenario = readingRandomChoice(scenarios);
  return readingBuildQuestion({
    question: scenario.question,
    visualHtml: buildReadingPassageCard(scenario.title, scenario.lines),
    options: scenario.options,
    answer: scenario.answer,
    difficulty,
    visualSummary: scenario.answer,
  });
}

function createReadingContextClueQuestion(difficulty = 3) {
  const items = [
    {
      title: "A Quiet Mouse",
      lines: [
        "The mouse was timid and hid behind the box.",
      ],
      word: "timid",
      answer: "shy",
      options: ["shy", "hungry", "loud", "angry"],
    },
    {
      title: "A Swift Rabbit",
      lines: [
        "The swift rabbit darted across the field.",
      ],
      word: "swift",
      answer: "fast",
      options: ["fast", "small", "sleepy", "cold"],
    },
  ];

  const item = readingRandomChoice(items);
  return readingBuildQuestion({
    question: `What does "${item.word}" most likely mean?`,
    visualHtml: buildReadingPassageCard("Passage", item.lines),
    options: item.options,
    answer: item.answer,
    difficulty,
    visualSummary: `"${item.word}" means ${item.answer}.`,
  });
}

function createReadingTextStructureQuestion(difficulty = 4) {
  const scenarios = [
    {
      title: "A Recipe",
      lines: [
        "First, Mia cracked the eggs.",
        "Next, she stirred the batter.",
        "Finally, she baked the cake.",
      ],
      answer: "Steps in order",
      options: ["Steps in order", "Compare and contrast", "Problem and solution", "A list of facts"],
    },
    {
      title: "Two Pets",
      lines: [
        "The dog barked loudly and ran quickly.",
        "The cat was quiet and liked to sleep in the sun.",
      ],
      answer: "Compare and contrast",
      options: ["Compare and contrast", "Steps in order", "A prediction", "A question and answer"],
    },
  ];

  const scenario = readingRandomChoice(scenarios);
  return readingBuildQuestion({
    question: "How is this passage organized?",
    visualHtml: buildReadingPassageCard(scenario.title, scenario.lines),
    options: scenario.options,
    answer: scenario.answer,
    difficulty,
    visualSummary: scenario.answer,
  });
}

function createReadingAuthorPurposeQuestion(difficulty = 5) {
  return readingBuildQuestion({
    question: "What is the author's purpose?",
    visualHtml: buildReadingPassageCard("Passage", [
      "To keep a plant healthy, water it, give it sunlight, and remove dry leaves.",
    ]),
    options: [
      "To explain how to do something",
      "To tell a funny story",
      "To ask a riddle",
      "To describe a dream",
    ],
    answer: "To explain how to do something",
    difficulty,
    visualSummary: "The author is explaining a process.",
  });
}

function readingBuildQuestion({
  question,
  visualHtml,
  options,
  answer,
  difficulty,
  visualSummary = "",
}) {
  if (!Array.isArray(options) || options.length !== 4 || !options.includes(answer)) {
    throw new Error("Reading comprehension questions require exactly 4 options with one answer.");
  }

  return {
    question,
    visualHtml,
    options: readingShuffleArray(options),
    answer,
    difficulty,
    visualSummary,
    type: "reading-comprehension-choice",
  };
}

function buildReadingPassageCard(title, lines) {
  const paragraphs = lines.map((line) => `<p style="margin: 0 0 8px;">${readingEscapeHtml(line)}</p>`).join("");
  return `
    <div style="
      max-width: 640px;
      padding: 14px 16px;
      border: 2px solid #274972;
      border-radius: 16px;
      background: linear-gradient(180deg, #f8fbff 0%, #eef5ff 100%);
      color: #274972;
      font-family: Arial, sans-serif;
      line-height: 1.5;
    ">
      <div style="font-weight: 700; margin-bottom: 10px;">${readingEscapeHtml(title)}</div>
      ${paragraphs}
    </div>
  `;
}

function clampReadingDifficulty(value) {
  const level = Number.parseInt(value, 10);
  if (!Number.isFinite(level)) {
    return 3;
  }

  return Math.min(5, Math.max(1, level));
}

function readingEscapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function readingRandomChoice(values) {
  return values[Math.floor(Math.random() * values.length)];
}

function readingShuffleArray(values) {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

const MAPS_AND_DIRECTIONS_QUESTIONS = [
  {
    question: "If north is at the top of a map, which direction is on the right side?",
    options: ["East", "West", "South", "North"],
    answer: "East",
    difficulty: 1,
  },
  {
    question: "Which direction is opposite east?",
    options: ["North", "South", "West", "Northeast"],
    answer: "West",
    difficulty: 1,
  },
  {
    question: "A school is north of the park, and the park is north of the library. Where is the school compared with the library?",
    options: ["North", "South", "East", "West"],
    answer: "North",
    difficulty: 2,
  },
  {
    question: "If you walk 2 blocks east and then 1 block north, where are you from where you started?",
    options: ["Northwest", "Northeast", "Southwest", "Southeast"],
    answer: "Northeast",
    difficulty: 3,
  },
  {
    question: "A map scale says 1 centimeter = 5 kilometers. If two towns are 3 centimeters apart on the map, how far apart are they in real life?",
    options: ["8 kilometers", "10 kilometers", "15 kilometers", "20 kilometers"],
    answer: "15 kilometers",
    difficulty: 3,
  },
  {
    question: "The store is west of the house. The library is east of the house. Which place is farther east?",
    options: ["The store", "The library", "They are equally east", "The house"],
    answer: "The library",
    difficulty: 4,
  },
  {
    question: "Which direction is opposite south?",
    options: ["North", "East", "West", "Northeast"],
    answer: "North",
    difficulty: 4,
  },
  {
    question: "A playground is south of the school, and a pond is west of the playground. Where is the pond compared with the school?",
    options: ["Northeast", "Northwest", "Southeast", "Southwest"],
    answer: "Southwest",
    difficulty: 5,
  },
  {
    question: "What tool helps you find north, south, east, and west?",
    options: ["Thermometer", "Compass", "Stopwatch", "Calculator"],
    answer: "Compass",
    difficulty: 5,
  },
  {
    question: "If north is at the top of a map, which direction is at the bottom?",
    options: ["East", "West", "South", "North"],
    answer: "South",
    difficulty: 1,
  },
  {
    question: "What does a compass rose show on a map?",
    options: ["Directions", "Temperatures", "Ages", "Prices"],
    answer: "Directions",
    difficulty: 1,
  },
  {
    question: "Which type of map is best for finding highways and streets?",
    options: ["Road map", "Weather map", "Star map", "Political map"],
    answer: "Road map",
    difficulty: 2,
  },
  {
    question: "A map scale says 1 centimeter = 2 kilometers. If two places are 4 centimeters apart on the map, how far apart are they in real life?",
    options: ["4 kilometers", "6 kilometers", "8 kilometers", "12 kilometers"],
    answer: "8 kilometers",
    difficulty: 2,
  },
  {
    question: "The museum is east of the school. The school is south of the park. Where is the museum compared with the park?",
    options: ["Northwest", "Northeast", "Southwest", "Southeast"],
    answer: "Southeast",
    difficulty: 3,
  },
  {
    question: "Which direction is opposite northeast?",
    options: ["Northwest", "Southeast", "Southwest", "East"],
    answer: "Southwest",
    difficulty: 3,
  },
  {
    question: "The river is west of the bridge, and the bridge is west of the school. Where is the river compared with the school?",
    options: ["East", "North", "South", "West"],
    answer: "West",
    difficulty: 4,
  },
  {
    question: "If you walk 3 blocks south and then 2 blocks east, where are you from where you started?",
    options: ["Northwest", "Northeast", "Southwest", "Southeast"],
    answer: "Southeast",
    difficulty: 4,
  },
  {
    question: "A map scale says 1 centimeter = 10 kilometers. If two cities are 6 centimeters apart on the map, how far apart are they in real life?",
    options: ["40 kilometers", "50 kilometers", "60 kilometers", "70 kilometers"],
    answer: "60 kilometers",
    difficulty: 5,
  },
  {
    question: "The library is north of the shop, and the shop is east of the home. Where is the library compared with the home?",
    options: ["Northwest", "Northeast", "Southwest", "Southeast"],
    answer: "Northeast",
    difficulty: 5,
  },
  {
    question: "If you face north, which way is to your left?",
    options: ["East", "West", "South", "North"],
    answer: "West",
    difficulty: 1,
  },
  {
    question: "If a park is south of your house, where is the house compared with the park?",
    options: ["North", "South", "East", "West"],
    answer: "North",
    difficulty: 1,
  },
  {
    question: "On a street map, which symbol usually shows a hospital?",
    options: ["A cross", "A star", "A moon", "A triangle"],
    answer: "A cross",
    difficulty: 2,
  },
  {
    question: "If you walk 1 block west and then 2 blocks south, where are you from where you started?",
    options: ["Northwest", "Northeast", "Southwest", "Southeast"],
    answer: "Southwest",
    difficulty: 3,
  },
  {
    question: "A map scale says 1 centimeter = 4 kilometers. If two towns are 5 centimeters apart, how far apart are they in real life?",
    options: ["9 kilometers", "12 kilometers", "20 kilometers", "25 kilometers"],
    answer: "20 kilometers",
    difficulty: 3,
  },
  {
    question: "The post office is north of the bank. The bank is west of the store. Where is the post office compared with the store?",
    options: ["Northwest", "Northeast", "Southwest", "Southeast"],
    answer: "Northwest",
    difficulty: 4,
  },
  {
    question: "Which direction is opposite west?",
    options: ["North", "East", "South", "Northeast"],
    answer: "East",
    difficulty: 4,
  },
  {
    question: "A camp is east of the lake, and the lake is south of the hill. Where is the camp compared with the hill?",
    options: ["Northeast", "Northwest", "Southeast", "Southwest"],
    answer: "Southeast",
    difficulty: 5,
  },
  {
    question: "A map scale says 1 centimeter = 3 kilometers. If two places are 7 centimeters apart, how far apart are they in real life?",
    options: ["10 kilometers", "18 kilometers", "21 kilometers", "24 kilometers"],
    answer: "21 kilometers",
    difficulty: 5,
  },
  {
    question: "If you face east, which way is behind you?",
    options: ["West", "North", "South", "East"],
    answer: "West",
    difficulty: 1,
  },
  {
    question: "Which is the best tool for finding your way on a hiking trail?",
    options: ["Map", "Spoon", "Marker", "Notebook"],
    answer: "Map",
    difficulty: 1,
  },
  {
    question: "A school is east of the library, and the library is east of the park. Where is the school compared with the park?",
    options: ["West", "East", "North", "South"],
    answer: "East",
    difficulty: 2,
  },
  {
    question: "What does 'near' mean on a map?",
    options: [
      "Far away",
      "Close by",
      "Above the clouds",
      "Inside the map key",
    ],
    answer: "Close by",
    difficulty: 2,
  },
  {
    question: "If you walk 3 blocks east and 3 blocks north, where are you from where you started?",
    options: ["Southwest", "Southeast", "Northeast", "Northwest"],
    answer: "Northeast",
    difficulty: 3,
  },
  {
    question: "A map scale says 1 centimeter = 2 kilometers. If two parks are 8 centimeters apart, how far apart are they in real life?",
    options: ["8 kilometers", "10 kilometers", "12 kilometers", "16 kilometers"],
    answer: "16 kilometers",
    difficulty: 3,
  },
  {
    question: "The fire station is south of the museum. The museum is east of the zoo. Where is the fire station compared with the zoo?",
    options: ["Northwest", "Northeast", "Southwest", "Southeast"],
    answer: "Southeast",
    difficulty: 4,
  },
  {
    question: "Which direction is opposite northwest?",
    options: ["Northeast", "Southwest", "Southeast", "West"],
    answer: "Southeast",
    difficulty: 4,
  },
  {
    question: "A trail starts at the cabin. You walk south, then west, then north. Where are you compared with the cabin?",
    options: ["East", "West", "North", "South"],
    answer: "West",
    difficulty: 5,
  },
  {
    question: "A map scale says 1 centimeter = 6 kilometers. If two villages are 4 centimeters apart, how far apart are they in real life?",
    options: ["10 kilometers", "18 kilometers", "24 kilometers", "30 kilometers"],
    answer: "24 kilometers",
    difficulty: 5,
  },
];

MAPS_AND_DIRECTIONS_QUESTIONS.push(
  ...[
    {
      question: "If north is at the top of a map, what direction is to the right?",
      options: ["East", "West", "South", "North"],
      answer: "East",
      difficulty: 1,
    },
    {
      question: "If you face east, which direction is to your left?",
      options: ["North", "South", "East", "West"],
      answer: "North",
      difficulty: 1,
    },
    {
      question: "What direction is opposite south on a compass?",
      options: ["North", "East", "West", "Northeast"],
      answer: "North",
      difficulty: 1,
    },
    {
      question: "If a park is west of your house, where is your house compared with the park?",
      options: ["East", "West", "North", "South"],
      answer: "East",
      difficulty: 1,
    },
    {
      question: "What information does a compass rose show?",
      options: ["Directions", "Temperatures", "Prices", "Rainfall"],
      answer: "Directions",
      difficulty: 2,
    },
    {
      question: "If you walk north and then east, where are you from where you started?",
      options: ["Northwest", "Northeast", "Southwest", "Southeast"],
      answer: "Northeast",
      difficulty: 2,
    },
    {
      question: "A map scale says 1 centimeter = 3 kilometers. If two towns are 4 centimeters apart, how far apart are they in real life?",
      options: ["7 kilometers", "9 kilometers", "12 kilometers", "15 kilometers"],
      answer: "12 kilometers",
      difficulty: 2,
    },
    {
      question: "If you walk west and then south, where are you from where you started?",
      options: ["Northwest", "Northeast", "Southwest", "Southeast"],
      answer: "Southwest",
      difficulty: 3,
    },
    {
      question: "A school is north of the library, and the library is north of the store. Where is the school compared with the store?",
      options: ["North", "South", "East", "West"],
      answer: "North",
      difficulty: 3,
    },
    {
      question: "A map scale says 1 centimeter = 2 kilometers. If two parks are 5 centimeters apart, how far apart are they in real life?",
      options: ["8 kilometers", "10 kilometers", "12 kilometers", "15 kilometers"],
      answer: "10 kilometers",
      difficulty: 3,
    },
    {
      question: "What is opposite northeast?",
      options: ["Northwest", "Southeast", "Southwest", "East"],
      answer: "Southwest",
      difficulty: 3,
    },
    {
      question: "The museum is east of the zoo, and the zoo is south of the park. Where is the museum compared with the park?",
      options: ["Northwest", "Northeast", "Southwest", "Southeast"],
      answer: "Southeast",
      difficulty: 4,
    },
    {
      question: "A map scale says 1 centimeter = 4 kilometers. If two towns are 6 centimeters apart, how far apart are they in real life?",
      options: ["18 kilometers", "20 kilometers", "24 kilometers", "28 kilometers"],
      answer: "24 kilometers",
      difficulty: 4,
    },
    {
      question: "If you face west and turn left, then right, which direction are you facing?",
      options: ["North", "South", "East", "West"],
      answer: "West",
      difficulty: 4,
    },
    {
      question: "A river is west of the bridge, and the bridge is west of the school. Where is the river compared with the school?",
      options: ["East", "West", "North", "South"],
      answer: "West",
      difficulty: 4,
    },
    {
      question: "A trail starts at the cabin. You walk west 2 steps and north 3 steps. Where are you compared with the cabin?",
      options: ["Northeast", "Northwest", "Southeast", "Southwest"],
      answer: "Northwest",
      difficulty: 5,
    },
    {
      question: "A map scale says 1 centimeter = 5 kilometers. If two villages are 7 centimeters apart, how far apart are they in real life?",
      options: ["25 kilometers", "30 kilometers", "35 kilometers", "40 kilometers"],
      answer: "35 kilometers",
      difficulty: 5,
    },
    {
      question: "If you face east, turn right, then left, then left again, which direction are you facing?",
      options: ["North", "South", "East", "West"],
      answer: "North",
      difficulty: 5,
    },
    {
      question: "Which direction is opposite southwest?",
      options: ["Northeast", "Southeast", "Northwest", "West"],
      answer: "Northeast",
      difficulty: 5,
    },
    {
      question: "If north is at the top of a map, what direction is at the bottom?",
      options: ["East", "West", "South", "North"],
      answer: "South",
      difficulty: 1,
    },
    {
      question: "Which type of map is best for finding streets and highways?",
      options: ["Road map", "Weather map", "Star map", "Political map"],
      answer: "Road map",
      difficulty: 1,
    },
    {
      question: "If you face north, which direction is to your right?",
      options: ["East", "West", "South", "North"],
      answer: "East",
      difficulty: 1,
    },
    {
      question: "What does the word 'near' mean on a map?",
      options: ["Close by", "Very far away", "Above the clouds", "Inside the key"],
      answer: "Close by",
      difficulty: 2,
    },
    {
      question: "The school is east of the library, and the library is east of the park. Where is the school compared with the park?",
      options: ["West", "East", "North", "South"],
      answer: "East",
      difficulty: 2,
    },
    {
      question: "What symbol usually marks a hospital on a simple map?",
      options: ["A cross", "A star", "A moon", "A triangle"],
      answer: "A cross",
      difficulty: 2,
    },
    {
      question: "After walking 3 blocks east and 3 blocks north, where are you from where you started?",
      options: ["Southwest", "Southeast", "Northeast", "Northwest"],
      answer: "Northeast",
      difficulty: 3,
    },
    {
      question: "A map scale says 1 centimeter = 2 kilometers. If two places are 8 centimeters apart, how far apart are they in real life?",
      options: ["8 kilometers", "10 kilometers", "12 kilometers", "16 kilometers"],
      answer: "16 kilometers",
      difficulty: 3,
    },
    {
      question: "The post office is north of the bank, and the bank is west of the store. Where is the post office compared with the store?",
      options: ["Northwest", "Northeast", "Southwest", "Southeast"],
      answer: "Northwest",
      difficulty: 3,
    },
    {
      question: "What is opposite northwest?",
      options: ["Northeast", "Southeast", "Southwest", "West"],
      answer: "Southeast",
      difficulty: 3,
    },
    {
      question: "The fire station is south of the museum, and the museum is east of the zoo. Where is the fire station compared with the zoo?",
      options: ["Northwest", "Northeast", "Southwest", "Southeast"],
      answer: "Southeast",
      difficulty: 4,
    },
    {
      question: "A park is east of the library, and the library is south of the mall. Where is the park compared with the mall?",
      options: ["Northeast", "Northwest", "Southeast", "Southwest"],
      answer: "Southeast",
      difficulty: 4,
    },
    {
      question: "A map scale says 1 centimeter equals 6 kilometers. If two villages are 4 centimeters apart, how far apart are they?",
      options: ["18 kilometers", "20 kilometers", "24 kilometers", "30 kilometers"],
      answer: "24 kilometers",
      difficulty: 4,
    },
    {
      question: "If you face south, turn left, then left again, which direction are you facing?",
      options: ["North", "South", "East", "West"],
      answer: "North",
      difficulty: 4,
    },
    {
      question: "The museum is north of the library, and the library is east of the park. Where is the museum compared with the park?",
      options: ["Northeast", "Northwest", "Southeast", "Southwest"],
      answer: "Northeast",
      difficulty: 5,
    },
    {
      question: "Starting at the cabin, you walk south, then west, then north. Where are you compared with the cabin?",
      options: ["East", "West", "North", "South"],
      answer: "West",
      difficulty: 5,
    },
    {
      question: "A map scale says 1 centimeter = 4 kilometers. If two cities are 8 centimeters apart, how far apart are they in real life?",
      options: ["24 kilometers", "28 kilometers", "32 kilometers", "36 kilometers"],
      answer: "32 kilometers",
      difficulty: 5,
    },
    {
      question: "A store is west of the bank, and the bank is north of the park. Where is the store compared with the park?",
      options: ["Northwest", "Northeast", "Southwest", "Southeast"],
      answer: "Northwest",
      difficulty: 5,
    },
  ]
);

MAPS_AND_DIRECTIONS_QUESTIONS.push(
  {
    question: "If you face north and turn right, then right again, which direction are you facing?",
    options: ["North", "East", "South", "West"],
    answer: "South",
    difficulty: 1,
  },
  {
    question: "A school is south of the library. The library is west of the park. Where is the school compared with the park?",
    options: ["Northwest", "Northeast", "Southwest", "Southeast"],
    answer: "Southwest",
    difficulty: 2,
  }
);

function createMapsAndDirectionsGeneratedEntry(difficulty) {
  const level = mapsClampDifficulty(difficulty);
  const generators = {
    1: [
      mapsCreateCardinalQuestion,
      mapsCreateOppositeDirectionQuestion,
      mapsCreateCompassQuestion,
      mapsCreateFacingQuestion,
    ],
    2: [
      mapsCreateNearQuestion,
      mapsCreateRoadMapQuestion,
      mapsCreateSimpleChainQuestion,
    ],
    3: [
      mapsCreateGridMovementQuestion,
      mapsCreateScaleQuestion,
      mapsCreateDirectionChainQuestion,
      mapsCreateOppositeDiagonalQuestion,
    ],
    4: [
      mapsCreateScaleQuestion,
      mapsCreateLongChainQuestion,
      mapsCreateRelativePositionQuestion,
      mapsCreateOppositeDirectionQuestion,
    ],
    5: [
      mapsCreateScaleQuestion,
      mapsCreateMultiStepQuestion,
      mapsCreateRelativePositionQuestion,
      mapsCreateLongChainQuestion,
    ],
  };

  return mapsRandomChoice(generators[level])(level);
}

function mapsCreateCardinalQuestion(difficulty) {
  const templates = [
    {
      question: "If north is at the top of a map, which direction is on the right side?",
      answer: "East",
      options: ["East", "West", "South", "North"],
      difficulty: 1,
    },
    {
      question: "If north is at the top of a map, which direction is at the bottom?",
      answer: "South",
      options: ["East", "West", "South", "North"],
      difficulty: 1,
    },
    {
      question: "If you face east, which way is behind you?",
      answer: "West",
      options: ["West", "North", "South", "East"],
      difficulty: 1,
    },
  ];

  return mapsPickTemplate(difficulty, templates);
}

function mapsCreateOppositeDirectionQuestion(difficulty) {
  const templates = [
    { question: "Which direction is opposite west?", answer: "East", options: ["North", "East", "South", "West"], difficulty: 1 },
    { question: "Which direction is opposite south?", answer: "North", options: ["North", "East", "West", "South"], difficulty: 1 },
    { question: "Which direction is opposite northeast?", answer: "Southwest", options: ["Northwest", "Southeast", "Southwest", "East"], difficulty: 3 },
    { question: "Which direction is opposite northwest?", answer: "Southeast", options: ["Northeast", "Southwest", "Southeast", "West"], difficulty: 4 },
  ];

  return mapsPickTemplate(difficulty, templates);
}

function mapsCreateCompassQuestion(difficulty = 1) {
  return {
    question: "What tool helps you find north, south, east, and west?",
    answer: "Compass",
    options: mapsBuildOptions("Compass", ["Thermometer", "Stopwatch", "Calculator"]),
    difficulty,
  };
}

function mapsCreateFacingQuestion(difficulty) {
  const templates = [
    {
      question: "If you face north and turn right, which direction are you facing?",
      answer: "East",
      options: ["East", "West", "South", "North"],
      difficulty: 1,
    },
    {
      question: "If you face south and turn left, which direction are you facing?",
      answer: "East",
      options: ["North", "East", "West", "South"],
      difficulty: 4,
    },
    {
      question: "If you face east and turn left, which direction are you facing?",
      answer: "North",
      options: ["North", "South", "West", "East"],
      difficulty: 2,
    },
  ];

  return mapsPickTemplate(difficulty, templates);
}

function mapsCreateNearQuestion(difficulty = 2) {
  return {
    question: "What does 'near' mean on a map?",
    answer: "Close by",
    options: mapsBuildOptions("Close by", ["Far away", "Above the clouds", "Inside the key"]),
    difficulty,
  };
}

function mapsCreateRoadMapQuestion(difficulty = 2) {
  return {
    question: "Which type of map is best for finding streets and highways?",
    answer: "Road map",
    options: mapsBuildOptions("Road map", ["Weather map", "Star map", "Political map"]),
    difficulty,
  };
}

function mapsCreateSimpleChainQuestion(difficulty) {
  const templates = [
    {
      question: "A school is north of the park, and the park is north of the library. Where is the school compared with the library?",
      answer: "North",
      options: ["North", "South", "East", "West"],
      difficulty: 2,
    },
    {
      question: "A school is east of the library, and the library is east of the park. Where is the school compared with the park?",
      answer: "East",
      options: ["West", "East", "North", "South"],
      difficulty: 2,
    },
  ];

  return mapsPickTemplate(difficulty, templates);
}

function mapsCreateGridMovementQuestion(difficulty) {
  const templates = [
    {
      question: "If you walk 2 blocks east and then 1 block north, where are you from where you started?",
      answer: "Northeast",
      options: ["Northwest", "Northeast", "Southwest", "Southeast"],
      difficulty: 3,
    },
    {
      question: "If you walk 3 blocks west and then 2 blocks south, where are you from where you started?",
      answer: "Southwest",
      options: ["Northwest", "Northeast", "Southwest", "Southeast"],
      difficulty: 3,
    },
  ];

  return mapsPickTemplate(difficulty, templates);
}

function mapsCreateScaleQuestion(difficulty) {
  const templates = [
    {
      question: "A map scale says 1 centimeter = 5 kilometers. If two towns are 3 centimeters apart on the map, how far apart are they in real life?",
      answer: "15 kilometers",
      options: ["8 kilometers", "10 kilometers", "15 kilometers", "20 kilometers"],
      difficulty: 3,
    },
    {
      question: "A map scale says 1 centimeter = 2 kilometers. If two places are 8 centimeters apart, how far apart are they in real life?",
      answer: "16 kilometers",
      options: ["8 kilometers", "10 kilometers", "12 kilometers", "16 kilometers"],
      difficulty: 3,
    },
    {
      question: "A map scale says 1 centimeter = 7 kilometers. If two towns are 4 centimeters apart on the map, how far apart are they in real life?",
      answer: "28 kilometers",
      options: ["21 kilometers", "24 kilometers", "28 kilometers", "32 kilometers"],
      difficulty: 4,
    },
    {
      question: "A map scale says 1 centimeter = 4 kilometers. If two cities are 8 centimeters apart, how far apart are they in real life?",
      answer: "32 kilometers",
      options: ["24 kilometers", "28 kilometers", "32 kilometers", "36 kilometers"],
      difficulty: 5,
    },
  ];

  return mapsPickTemplate(difficulty, templates);
}

function mapsCreateDirectionChainQuestion(difficulty) {
  const templates = [
    {
      question: "The museum is east of the school. The school is south of the park. Where is the museum compared with the park?",
      answer: "Southeast",
      options: ["Northwest", "Northeast", "Southwest", "Southeast"],
      difficulty: 3,
    },
    {
      question: "The post office is north of the bank, and the bank is west of the store. Where is the post office compared with the store?",
      answer: "Northwest",
      options: ["Northwest", "Northeast", "Southwest", "Southeast"],
      difficulty: 3,
    },
  ];

  return mapsPickTemplate(difficulty, templates);
}

function mapsCreateOppositeDiagonalQuestion(difficulty) {
  const templates = [
    {
      question: "Which direction is opposite northeast?",
      answer: "Southwest",
      options: ["Northwest", "Southeast", "Southwest", "East"],
      difficulty: 3,
    },
    {
      question: "Which direction is opposite northwest?",
      answer: "Southeast",
      options: ["Northeast", "Southwest", "Southeast", "West"],
      difficulty: 4,
    },
  ];

  return mapsPickTemplate(difficulty, templates);
}

function mapsCreateRelativePositionQuestion(difficulty) {
  const templates = [
    {
      question: "The library is north of the shop, and the shop is east of the home. Where is the library compared with the home?",
      answer: "Northeast",
      options: ["Northwest", "Northeast", "Southwest", "Southeast"],
      difficulty: 5,
    },
    {
      question: "A park is east of the library, and the library is south of the mall. Where is the park compared with the mall?",
      answer: "Southeast",
      options: ["Northeast", "Northwest", "Southeast", "Southwest"],
      difficulty: 4,
    },
  ];

  return mapsPickTemplate(difficulty, templates);
}

function mapsCreateLongChainQuestion(difficulty) {
  const templates = [
    {
      question: "The river is west of the bridge, and the bridge is west of the school. Where is the river compared with the school?",
      answer: "West",
      options: ["East", "North", "South", "West"],
      difficulty: 4,
    },
    {
      question: "The store is west of the bank, and the bank is north of the park. Where is the store compared with the park?",
      answer: "Northwest",
      options: ["Northwest", "Northeast", "Southwest", "Southeast"],
      difficulty: 5,
    },
  ];

  return mapsPickTemplate(difficulty, templates);
}

function mapsCreateMultiStepQuestion(difficulty) {
  const templates = [
    {
      question: "A camp is east of the lake, and the lake is south of the hill. Where is the camp compared with the hill?",
      answer: "Southeast",
      options: ["Northeast", "Northwest", "Southeast", "Southwest"],
      difficulty: 5,
    },
    {
      question: "A trail starts at the cabin. You walk south, then west, then north. Where are you compared with the cabin?",
      answer: "West",
      options: ["East", "West", "North", "South"],
      difficulty: 5,
    },
  ];

  return mapsPickTemplate(difficulty, templates);
}

function mapsBuildOptions(answer, distractors) {
  const options = [String(answer), ...distractors.map(String)];
  const unique = [];

  for (const option of options) {
    if (option && !unique.includes(option)) {
      unique.push(option);
    }
  }

  if (unique.length !== 4) {
    throw new Error("Maps generator produced invalid options");
  }

  return mapsShuffle(unique);
}

function mapsPickTemplate(difficulty, templates) {
  const level = mapsClampDifficulty(difficulty);
  const exact = templates.filter((template) => template.difficulty === level);
  const eligible = exact.length ? exact : templates.filter((template) => template.difficulty <= level);
  return mapsRandomChoice(eligible.length ? eligible : templates);
}

function mapsClampDifficulty(value) {
  const difficulty = Number(value);
  if (!Number.isInteger(difficulty) || difficulty < 1) {
    return 1;
  }

  return Math.min(5, difficulty);
}

function mapsRandomChoice(values) {
  if (typeof randomChoice === "function") {
    return randomChoice(values);
  }

  return values[Math.floor(Math.random() * values.length)];
}

function mapsShuffle(values) {
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

function mapsQuestion(question, options, answer, difficulty) {
  const normalizedOptions = Array.from(new Set(options.map(String)));
  const normalizedAnswer = String(answer);
  const normalizedDifficulty = mapsClampDifficulty(difficulty);

  if (!String(question || "").trim()) {
    throw new Error("Maps and directions question is missing question text.");
  }
  if (normalizedOptions.length !== 4 || !normalizedOptions.includes(normalizedAnswer)) {
    throw new Error(`Maps and directions question must have exactly 4 unique options including the answer: ${question}`);
  }

  return {
    question: String(question),
    options: normalizedOptions,
    answer: normalizedAnswer,
    difficulty: normalizedDifficulty,
  };
}

const MAPS_AND_DIRECTIONS_QUESTIONS = [
  // Level 1: basic compass directions, map orientation, and common map tools.
  mapsQuestion(
    "If north is at the top of a map, which direction is on the right side?",
    ["East", "West", "South", "North"],
    "East",
    1
  ),
  mapsQuestion(
    "If north is at the top of a map, which direction is at the bottom?",
    ["East", "West", "South", "North"],
    "South",
    1
  ),
  mapsQuestion("Which direction is opposite east?", ["North", "South", "West", "Northeast"], "West", 1),
  mapsQuestion("Which direction is opposite north?", ["South", "East", "West", "Northwest"], "South", 1),
  mapsQuestion("What does a compass rose show on a map?", ["Directions", "Temperatures", "Ages", "Prices"], "Directions", 1),
  mapsQuestion(
    "What tool helps you find north, south, east, and west?",
    ["Thermometer", "Compass", "Stopwatch", "Calculator"],
    "Compass",
    1
  ),
  mapsQuestion("If you face north, which way is to your left?", ["East", "West", "South", "North"], "West", 1),
  mapsQuestion("If a park is south of your house, where is your house compared with the park?", ["North", "South", "East", "West"], "North", 1),

  // Level 2: simple map symbols, short direction chains, and easy scale multiplication.
  mapsQuestion("Which type of map is best for finding highways and streets?", ["Road map", "Weather map", "Star map", "Political map"], "Road map", 2),
  mapsQuestion("What does a map key or legend explain?", ["What symbols mean", "How old the map is", "The weather tomorrow", "The price of the map"], "What symbols mean", 2),
  mapsQuestion("On a street map, which symbol often shows a hospital?", ["A cross", "A moon", "A music note", "A triangle only"], "A cross", 2),
  mapsQuestion(
    "A school is north of the park, and the park is north of the library. Where is the school compared with the library?",
    ["North", "South", "East", "West"],
    "North",
    2
  ),
  mapsQuestion(
    "A school is east of the library, and the library is east of the park. Where is the school compared with the park?",
    ["West", "East", "North", "South"],
    "East",
    2
  ),
  mapsQuestion(
    "A map scale says 1 centimeter = 2 kilometers. If two places are 4 centimeters apart on the map, how far apart are they in real life?",
    ["4 kilometers", "6 kilometers", "8 kilometers", "12 kilometers"],
    "8 kilometers",
    2
  ),
  mapsQuestion("If you face east and turn left, which direction are you facing?", ["North", "South", "East", "West"], "North", 2),
  mapsQuestion("What does 'near' mean on a map?", ["Close by", "Very far away", "Above the clouds", "Inside the title"], "Close by", 2),

  // Level 3: diagonals, two-step movement, and medium map scale questions.
  mapsQuestion(
    "If you walk 2 blocks east and then 1 block north, where are you from where you started?",
    ["Northwest", "Northeast", "Southwest", "Southeast"],
    "Northeast",
    3
  ),
  mapsQuestion(
    "If you walk 1 block west and then 2 blocks south, where are you from where you started?",
    ["Northwest", "Northeast", "Southwest", "Southeast"],
    "Southwest",
    3
  ),
  mapsQuestion(
    "A map scale says 1 centimeter = 5 kilometers. If two towns are 3 centimeters apart on the map, how far apart are they in real life?",
    ["8 kilometers", "10 kilometers", "15 kilometers", "20 kilometers"],
    "15 kilometers",
    3
  ),
  mapsQuestion(
    "The museum is east of the school. The school is south of the park. Where is the museum compared with the park?",
    ["Northwest", "Northeast", "Southwest", "Southeast"],
    "Southeast",
    3
  ),
  mapsQuestion("Which direction is opposite northeast?", ["Northwest", "Southeast", "Southwest", "East"], "Southwest", 3),
  mapsQuestion(
    "The store is west of the house. The library is east of the house. Which place is farther east?",
    ["The store", "The library", "They are equally east", "The house"],
    "The library",
    3
  ),
  mapsQuestion(
    "A path goes from the gate to the pond, then from the pond to the field. If the pond is north of the gate and the field is east of the pond, where is the field compared with the gate?",
    ["Northeast", "Northwest", "Southeast", "Southwest"],
    "Northeast",
    3
  ),
  mapsQuestion("On a simple grid map, what does the ordered pair (3, 2) usually mean?", ["3 steps right and 2 steps up", "2 steps right and 3 steps up", "3 steps left and 2 steps down", "The map is 3 years old"], "3 steps right and 2 steps up", 3),

  // Level 4: longer relative-position reasoning, turns, and map scale practice.
  mapsQuestion(
    "The river is west of the bridge, and the bridge is west of the school. Where is the river compared with the school?",
    ["East", "North", "South", "West"],
    "West",
    4
  ),
  mapsQuestion(
    "If you walk 3 blocks south and then 2 blocks east, where are you from where you started?",
    ["Northwest", "Northeast", "Southwest", "Southeast"],
    "Southeast",
    4
  ),
  mapsQuestion(
    "A map scale says 1 centimeter = 10 kilometers. If two cities are 6 centimeters apart on the map, how far apart are they in real life?",
    ["40 kilometers", "50 kilometers", "60 kilometers", "70 kilometers"],
    "60 kilometers",
    4
  ),
  mapsQuestion(
    "The post office is north of the bank. The bank is west of the store. Where is the post office compared with the store?",
    ["Northwest", "Northeast", "Southwest", "Southeast"],
    "Northwest",
    4
  ),
  mapsQuestion("Which direction is opposite northwest?", ["Northeast", "Southwest", "Southeast", "West"], "Southeast", 4),
  mapsQuestion("Each turn is a 90-degree turn. If you face south, turn left, then left again, which direction are you facing?", ["North", "South", "East", "West"], "North", 4),
  mapsQuestion(
    "The fire station is south of the museum. The museum is east of the zoo. Where is the fire station compared with the zoo?",
    ["Northwest", "Northeast", "Southwest", "Southeast"],
    "Southeast",
    4
  ),
  mapsQuestion("On a grid map, the school is at (2, 5) and the park is at (2, 1). Which direction is the school from the park?", ["North", "South", "East", "West"], "North", 4),

  // Level 5: multi-step routes and combined directions.
  mapsQuestion(
    "A playground is south of the school, and a pond is west of the playground. Where is the pond compared with the school?",
    ["Northeast", "Northwest", "Southeast", "Southwest"],
    "Southwest",
    5
  ),
  mapsQuestion(
    "The library is north of the shop, and the shop is east of the home. Where is the library compared with the home?",
    ["Northwest", "Northeast", "Southwest", "Southeast"],
    "Northeast",
    5
  ),
  mapsQuestion(
    "A camp is east of the lake, and the lake is south of the hill. Where is the camp compared with the hill?",
    ["Northeast", "Northwest", "Southeast", "Southwest"],
    "Southeast",
    5
  ),
  mapsQuestion(
    "A trail starts at the cabin. You walk 1 block south, 1 block west, then 1 block north. Where are you compared with the cabin?",
    ["East", "West", "North", "South"],
    "West",
    5
  ),
  mapsQuestion(
    "A map scale says 1 centimeter = 6 kilometers. If two villages are 4 centimeters apart, how far apart are they in real life?",
    ["10 kilometers", "18 kilometers", "24 kilometers", "30 kilometers"],
    "24 kilometers",
    5
  ),
  mapsQuestion("If you face east, turn right, then left, then left again, which direction are you facing?", ["North", "South", "East", "West"], "North", 5),
  mapsQuestion(
    "A store is west of the bank, and the bank is north of the park. Where is the store compared with the park?",
    ["Northwest", "Northeast", "Southwest", "Southeast"],
    "Northwest",
    5
  ),
  mapsQuestion("On a grid map, a library is at (1, 2) and a pool is at (5, 2). Which direction is the pool from the library?", ["East", "West", "North", "South"], "East", 5),

  // Level 6: decimals, coordinates, and route distances.
  mapsQuestion(
    "A map scale says 1 centimeter = 8 kilometers. Two towns are 2.5 centimeters apart. How far apart are they in real life?",
    ["16 kilometers", "20 kilometers", "24 kilometers", "28 kilometers"],
    "20 kilometers",
    6
  ),
  mapsQuestion("On a grid map, the cafe is at (4, 6) and the school is at (1, 2). Which direction is the cafe from the school?", ["Northeast", "Northwest", "Southeast", "Southwest"], "Northeast", 6),
  mapsQuestion(
    "A route goes 4 blocks east, 2 blocks north, and 1 block west. Where are you from the start?",
    ["3 blocks east and 2 blocks north", "5 blocks east and 2 blocks north", "3 blocks west and 2 blocks north", "4 blocks east and 1 block north"],
    "3 blocks east and 2 blocks north",
    6
  ),
  mapsQuestion("A map key says a dashed line is a footpath. Which line should you follow for a walking-only shortcut?", ["Dashed line", "Blue river line", "Thick highway line", "Contour line"], "Dashed line", 6),
  mapsQuestion(
    "A trail is 9 kilometers long in real life. The map scale is 1 centimeter = 3 kilometers. How long is the trail on the map?",
    ["2 centimeters", "3 centimeters", "6 centimeters", "12 centimeters"],
    "3 centimeters",
    6
  ),
  mapsQuestion("If a compass bearing is 90°, which direction is that?", ["North", "East", "South", "West"], "East", 6),
  mapsQuestion("On a map, the beach is west of the hotel and the museum is north of the beach. Where is the museum compared with the hotel?", ["Northwest", "Northeast", "Southwest", "Southeast"], "Northwest", 6),
  mapsQuestion("A map shows a scale bar split into 5 equal parts. The whole bar is 10 km. How many kilometers is each part?", ["1 km", "2 km", "5 km", "10 km"], "2 km", 6),

  // Level 7: reverse scale, bearings, contours, and efficient routes.
  mapsQuestion(
    "A map scale says 1 centimeter = 12 kilometers. Two cities are 48 kilometers apart. How far apart are they on the map?",
    ["3 centimeters", "4 centimeters", "6 centimeters", "12 centimeters"],
    "4 centimeters",
    7
  ),
  mapsQuestion("Which compass bearing points south?", ["0°", "90°", "180°", "270°"], "180°", 7),
  mapsQuestion("On a topographic map, contour lines that are close together usually mean the land is:", ["Steep", "Flat", "Underwater", "Covered with roads"], "Steep", 7),
  mapsQuestion(
    "You are at (2, 3). You move 5 units east and 2 units south. What is your new position?",
    ["(7, 1)", "(7, 5)", "(3, 7)", "(5, 2)"],
    "(7, 1)",
    7
  ),
  mapsQuestion("A route goes 1 block north, 1 block east, 1 block south, then 1 block east. Which direction from the start matters after the north and south cancel?", ["East", "West", "North", "South"], "East", 7),
  mapsQuestion("A map key says 1 blue square = 5 water fountains. If the park has 4 blue squares, how many fountains are shown?", ["9", "15", "20", "25"], "20", 7),
  mapsQuestion("If the sun is rising directly in front of you, which direction are you facing?", ["North", "East", "South", "West"], "East", 7),
  mapsQuestion("Which map would best help you compare the heights of hills?", ["Topographic map", "Road map", "Weather map", "Political map"], "Topographic map", 7),

  // Level 8: latitude/longitude, route planning, and multi-step coordinates.
  mapsQuestion("Which map word tells how far north or south a place is?", ["Latitude", "Longitude", "Legend", "Scale"], "Latitude", 8),
  mapsQuestion("Which map word tells how far east or west a place is from the Prime Meridian?", ["Latitude", "Longitude", "Compass rose", "Elevation"], "Longitude", 8),
  mapsQuestion("A place at 30°N is in which half of Earth?", ["Northern Hemisphere", "Southern Hemisphere", "Eastern Hemisphere only", "Western Hemisphere only"], "Northern Hemisphere", 8),
  mapsQuestion(
    "A hiker walks 3 km north, 4 km east, and 3 km south. How far east or west is the hiker from the start?",
    ["4 km east", "4 km west", "3 km north", "10 km east"],
    "4 km east",
    8
  ),
  mapsQuestion("A map scale is 1 centimeter = 25 kilometers. A road is 3.2 centimeters on the map. About how long is the road?", ["50 kilometers", "75 kilometers", "80 kilometers", "100 kilometers"], "80 kilometers", 8),
  mapsQuestion("On a coordinate map, the museum is at (6, 1) and the school is at (2, 5). Which direction is the museum from the school?", ["Northeast", "Northwest", "Southeast", "Southwest"], "Southeast", 8),
  mapsQuestion("A river flows from a contour line marked 300 m toward a line marked 200 m. Which way is it flowing?", ["Downhill", "Uphill", "In a circle", "Only north"], "Downhill", 8),
  mapsQuestion("A bus route has stops at A, B, C, and D in that order. If you are at B and need to get to D, which stop comes next?", ["A", "B", "C", "D"], "C", 8),

  // Level 9: bearings, scale area, travel time, and careful map interpretation.
  mapsQuestion("Which compass bearing points west?", ["0°", "90°", "180°", "270°"], "270°", 9),
  mapsQuestion(
    "A map scale says 1 centimeter = 10 kilometers. A rectangular park is 3 cm by 2 cm on the map. What are its real dimensions?",
    ["30 km by 20 km", "3 km by 2 km", "13 km by 12 km", "300 km by 200 km"],
    "30 km by 20 km",
    9
  ),
  mapsQuestion("If a route is 18 km and you travel 6 km each hour, how long will the route take?", ["2 hours", "3 hours", "4 hours", "6 hours"], "3 hours", 9),
  mapsQuestion("A compass bearing changes from 45° to 135°. Which way did it turn?", ["90° clockwise", "90° counterclockwise", "180° clockwise", "45° counterclockwise"], "90° clockwise", 9),
  mapsQuestion("A trail climbs from 100 m elevation to 350 m elevation. What is the elevation gain?", ["150 m", "250 m", "350 m", "450 m"], "250 m", 9),
  mapsQuestion("A map has a representative fraction of 1:50,000. This means 1 cm on the map represents:", ["50,000 cm in real life", "50,000 km in real life", "50 cm in real life", "500 cm in real life"], "50,000 cm in real life", 9),
  mapsQuestion("You are at (8, 2). A shelter is at (5, 6). Which direction is the shelter from you?", ["Northeast", "Northwest", "Southeast", "Southwest"], "Northwest", 9),
  mapsQuestion("A route goes 5 km east, 5 km north, 5 km west, and 2 km south. Where are you compared with the start?", ["3 km north", "3 km south", "5 km east", "2 km west"], "3 km north", 9),

  // Level 10: advanced map reasoning with bearings, scale, and route optimization.
  mapsQuestion("A map scale is 1:100,000. How many real kilometers does 1 centimeter on the map represent?", ["0.1 km", "1 km", "10 km", "100 km"], "1 km", 10),
  mapsQuestion("A route on a map is 7.5 cm long. The scale is 1 cm = 4 km. How long is the route in real life?", ["22 km", "28 km", "30 km", "34 km"], "30 km", 10),
  mapsQuestion("A hiker walks 6 km north, 8 km east, 6 km south, and 3 km west. Where is the hiker from the start?", ["5 km east", "5 km west", "8 km east", "3 km north"], "5 km east", 10),
  mapsQuestion("You are facing a bearing of 270°. You turn 180° clockwise. What bearing are you facing now?", ["0°", "90°", "180°", "270°"], "90°", 10),
  mapsQuestion("A contour interval is 20 m. Moving from the 120 m contour to the 200 m contour crosses how much elevation change?", ["40 m", "60 m", "80 m", "100 m"], "80 m", 10),
  mapsQuestion("On a coordinate grid, point A is (1, 1), B is (1, 5), and C is (6, 5). Which route from A to C through B has total grid distance?", ["9 units", "10 units", "11 units", "12 units"], "9 units", 10),
  mapsQuestion("A magnetic compass points 5° west of true north. To follow true north, you should aim about:", ["5° east of the compass needle", "5° west of the compass needle", "90° from the compass needle", "180° from the compass needle"], "5° east of the compass needle", 10),
  mapsQuestion("A square on a map is 2 cm by 2 cm. The scale is 1 cm = 3 km. What real area does the square represent?", ["6 square km", "9 square km", "18 square km", "36 square km"], "36 square km", 10),
];

function createMapsAndDirectionsGeneratedEntry(difficulty) {
  const level = mapsClampDifficulty(difficulty);
  if (Math.random() < 0.28) {
    return createCompassRobotGeneratedEntry(level);
  }

  const exactPool = MAPS_AND_DIRECTIONS_QUESTIONS.filter((entry) => entry.difficulty === level);
  const fallbackPool = MAPS_AND_DIRECTIONS_QUESTIONS.filter((entry) => entry.difficulty <= level);
  const selected = mapsRandomChoice(exactPool.length ? exactPool : fallbackPool);

  return {
    ...selected,
    options: mapsShuffle(selected.options),
  };
}

function createCompassRobotGeneratedEntry(difficulty) {
  const routes = [
    {
      minDifficulty: 1,
      maxDifficulty: 3,
      rows: 3,
      cols: 3,
      start: { row: 2, col: 0 },
      treasure: { row: 1, col: 2 },
      sequence: ["E", "E", "N"],
      clue: "Use the shortest route. Go east before you go north.",
    },
    {
      minDifficulty: 1,
      maxDifficulty: 4,
      rows: 3,
      cols: 3,
      start: { row: 0, col: 0 },
      treasure: { row: 2, col: 1 },
      sequence: ["S", "S", "E"],
      clue: "Use the shortest route. Go south before you go east.",
    },
    {
      minDifficulty: 2,
      maxDifficulty: 5,
      rows: 4,
      cols: 4,
      start: { row: 3, col: 0 },
      treasure: { row: 1, col: 3 },
      sequence: ["E", "E", "E", "N", "N"],
      clue: "Use the shortest route. Finish the east moves before the north moves.",
    },
    {
      minDifficulty: 3,
      maxDifficulty: 6,
      rows: 4,
      cols: 4,
      start: { row: 0, col: 3 },
      treasure: { row: 3, col: 1 },
      sequence: ["S", "S", "S", "W", "W"],
      clue: "Use the shortest route. Go south first, then west.",
    },
    {
      minDifficulty: 5,
      maxDifficulty: 8,
      rows: 5,
      cols: 5,
      start: { row: 4, col: 1 },
      treasure: { row: 1, col: 4 },
      sequence: ["E", "E", "E", "N", "N", "N"],
      clue: "Use the shortest route. Move east until you line up with the treasure, then move north.",
    },
    {
      minDifficulty: 6,
      maxDifficulty: 10,
      rows: 5,
      cols: 5,
      start: { row: 1, col: 4 },
      treasure: { row: 4, col: 0 },
      sequence: ["W", "W", "W", "W", "S", "S", "S"],
      clue: "Use the shortest route. Complete the west moves before the south moves.",
    },
  ];
  const availableRoutes = routes.filter(
    (route) => difficulty >= route.minDifficulty && difficulty <= route.maxDifficulty
  );
  const route = mapsRandomChoice(availableRoutes.length ? availableRoutes : routes);
  const answer = route.sequence.join(" ");

  return {
    mode: "interactive",
    question: "Compass Robot: build the commands that move the robot to the treasure.",
    answer,
    answerLabel: answer,
    difficulty,
    displayText: "",
    extraText: `${route.clue}\nS = start. R = robot. T = treasure.`,
    reviewText: `Compass Robot route: ${answer}.`,
    visualSummary: `Grid route from start to treasure using ${answer}.`,
    interactive: {
      layout: "command-sequence",
      prompt: "Tap N, E, S, and W in order.",
      commands: ["N", "E", "S", "W"],
      answerSequence: route.sequence,
      answerIndexes: [0],
      maxCommands: route.sequence.length + 2,
      grid: {
        rows: route.rows,
        cols: route.cols,
        start: route.start,
        treasure: route.treasure,
      },
    },
  };
}

function mapsClampDifficulty(value) {
  const difficulty = Number.parseInt(value, 10);
  if (!Number.isFinite(difficulty)) {
    return 3;
  }

  return Math.min(10, Math.max(1, difficulty));
}

function mapsRandomChoice(values) {
  if (!Array.isArray(values) || values.length === 0) {
    throw new Error("Cannot choose from an empty maps question pool.");
  }

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

globalThis.HomeworkQuestions?.register({
  id: "maps-and-directions",
  label: "Maps and Directions",
  getStaticQuestions: () => MAPS_AND_DIRECTIONS_QUESTIONS,
  generatedEntryFactory: createMapsAndDirectionsGeneratedEntry,
  generatedShare: 0.85,
  supportsDrag: true,
});

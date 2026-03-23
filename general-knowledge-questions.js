const GENERAL_KNOWLEDGE_QUESTIONS = [
  {
    question: "About how many people live in the world today?",
    options: ["About 8 million", "About 80 million", "About 800 million", "About 8 billion"],
    answer: "About 8 billion",
    difficulty: 1,
  },
  {
    question: "About what percent of Earth's surface is covered by water?",
    options: ["About 21%", "About 51%", "About 71%", "About 91%"],
    answer: "About 71%",
    difficulty: 1,
  },
  {
    question: "How many continents are there?",
    options: ["Five", "Six", "Seven", "Eight"],
    answer: "Seven",
    difficulty: 1,
  },
  {
    question: "Which ocean is the largest?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: "Pacific Ocean",
    difficulty: 1,
  },
  {
    question: "Which gas makes up most of Earth's air?",
    options: ["Nitrogen", "Oxygen", "Carbon dioxide", "Hydrogen"],
    answer: "Nitrogen",
    difficulty: 1,
  },
  {
    question: "Which continent has the most people?",
    options: ["Africa", "Asia", "Europe", "South America"],
    answer: "Asia",
    difficulty: 2,
  },
  {
    question: "About how many countries are there in the world?",
    options: ["About 20", "About 80", "About 200", "About 900"],
    answer: "About 200",
    difficulty: 2,
  },
  {
    question: "Which line circles Earth around the middle?",
    options: ["Prime Meridian", "Equator", "Tropic of Cancer", "North Pole"],
    answer: "Equator",
    difficulty: 2,
  },
  {
    question: "The sun seems to rise in which direction?",
    options: ["North", "South", "East", "West"],
    answer: "East",
    difficulty: 2,
  },
  {
    question: "About how long does Earth take to go around the sun once?",
    options: ["About 24 hours", "About 30 days", "About 365 days", "About 10 years"],
    answer: "About 365 days",
    difficulty: 2,
  },
  {
    question: "Which map word tells how far north or south a place is?",
    options: ["Latitude", "Longitude", "Legend", "Scale"],
    answer: "Latitude",
    difficulty: 3,
  },
  {
    question: "Which tool helps you find north, south, east, and west?",
    options: ["Thermometer", "Compass", "Ruler", "Scale"],
    answer: "Compass",
    difficulty: 3,
  },
  {
    question: "Which ocean is between Africa, Asia, and Australia?",
    options: ["Atlantic Ocean", "Arctic Ocean", "Pacific Ocean", "Indian Ocean"],
    answer: "Indian Ocean",
    difficulty: 3,
  },
  {
    question: "What do bees help many flowering plants do?",
    options: ["Move faster", "Make seeds by pollination", "Grow in the dark", "Turn into trees"],
    answer: "Make seeds by pollination",
    difficulty: 3,
  },
  {
    question: "Which part of a map explains what the symbols mean?",
    options: ["Compass rose", "Border", "Key", "Title"],
    answer: "Key",
    difficulty: 3,
  },
  {
    question: "About how many people live in the United States?",
    options: ["About 34 million", "About 340 million", "About 3.4 billion", "About 34 billion"],
    answer: "About 340 million",
    difficulty: 4,
  },
  {
    question: "Which layer of Earth do people live on?",
    options: ["Core", "Mantle", "Crust", "Inner ocean"],
    answer: "Crust",
    difficulty: 4,
  },
  {
    question: "Most of Earth's water is found where?",
    options: ["In the oceans", "In rivers", "In clouds", "In lakes"],
    answer: "In the oceans",
    difficulty: 4,
  },
  {
    question: "Which ocean is between North America and Europe and Africa?",
    options: ["Atlantic Ocean", "Indian Ocean", "Southern Ocean", "Arctic Ocean"],
    answer: "Atlantic Ocean",
    difficulty: 4,
  },
  {
    question: "About how many minutes does sunlight take to reach Earth?",
    options: ["About 8 minutes", "About 80 minutes", "About 8 hours", "About 1 day"],
    answer: "About 8 minutes",
    difficulty: 4,
  },
  {
    question: "Which is closest to the share of Earth's water that is freshwater?",
    options: ["About 2.5%", "About 15%", "About 40%", "About 75%"],
    answer: "About 2.5%",
    difficulty: 5,
  },
  {
    question: "Which continent is the Sahara Desert mostly in?",
    options: ["Africa", "Asia", "Europe", "Australia"],
    answer: "Africa",
    difficulty: 5,
  },
    {
      question: "What does a compass rose on a map help you find?",
      options: ["Directions", "Distances", "Weather", "Population"],
      answer: "Directions",
      difficulty: 5,
    },
  {
    question: "What does climate describe?",
    options: [
      "The usual weather in a place over many years",
      "Only today's temperature",
      "Only how windy it is",
      "A weather tool",
    ],
    answer: "The usual weather in a place over many years",
    difficulty: 5,
  },
  {
    question: "Which ocean is on the west coast of North and South America?",
    options: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean"],
    answer: "Pacific Ocean",
    difficulty: 5,
  },
  {
    question: "Which hemisphere is north of the Equator?",
    options: ["Northern Hemisphere", "Southern Hemisphere", "Western Hemisphere", "Eastern Hemisphere"],
    answer: "Northern Hemisphere",
    difficulty: 1,
  },
  {
    question: "Which map feature shows how map distances compare with real distances?",
    options: ["Scale", "Title", "Border", "Compass rose"],
    answer: "Scale",
    difficulty: 1,
  },
  {
    question: "Which type of map mainly shows countries, states, and borders?",
    options: ["Political map", "Weather map", "Road map", "Star map"],
    answer: "Political map",
    difficulty: 2,
  },
  {
    question: "Which country has the largest population today?",
    options: ["China", "India", "United States", "Brazil"],
    answer: "India",
    difficulty: 2,
  },
  {
    question: "Which energy source uses sunlight to make electricity?",
    options: ["Solar power", "Coal", "Oil", "Natural gas"],
    answer: "Solar power",
    difficulty: 3,
  },
  {
    question: "What does the word \"hemisphere\" mean?",
    options: ["One map symbol", "One half of Earth", "A country border", "A weather report"],
    answer: "One half of Earth",
    difficulty: 3,
  },
  {
    question: "When it is summer in the Northern Hemisphere, what season is it in the Southern Hemisphere?",
    options: ["Spring", "Summer", "Fall", "Winter"],
    answer: "Winter",
    difficulty: 4,
  },
  {
    question: "Which is the best estimate of India's population today?",
    options: ["About 14 million", "About 140 million", "About 1.4 billion", "About 14 billion"],
    answer: "About 1.4 billion",
    difficulty: 4,
  },
  {
    question: "Which is closest to the amount of Earth's water that is in the oceans?",
    options: ["About 25%", "About 50%", "About 75%", "About 96.5%"],
    answer: "About 96.5%",
    difficulty: 5,
  },
  {
    question: "Which place holds much more freshwater than all rivers and lakes together?",
    options: ["Underground in aquifers", "Clouds", "Rivers", "Lakes"],
    answer: "Underground in aquifers",
    difficulty: 5,
  },
  {
    question: "What planet do we live on?",
    options: ["Mars", "Venus", "Earth", "Jupiter"],
    answer: "Earth",
    difficulty: 1,
  },
  {
    question: "How many minutes are in 1 hour?",
    options: ["30", "45", "60", "100"],
    answer: "60",
    difficulty: 1,
  },
  {
    question: "Which planet is often called the Red Planet?",
    options: ["Mercury", "Mars", "Saturn", "Neptune"],
    answer: "Mars",
    difficulty: 2,
  },
  {
    question: "Which country is also a continent?",
    options: ["India", "Brazil", "Australia", "Egypt"],
    answer: "Australia",
    difficulty: 2,
  },
  {
    question: "Which star gives Earth light and heat?",
    options: ["The Moon", "The Sun", "Polaris", "Mars"],
    answer: "The Sun",
    difficulty: 3,
  },
  {
    question: "How many oceans are there on Earth?",
    options: ["Three", "Four", "Five", "Seven"],
    answer: "Five",
    difficulty: 3,
  },
  {
    question: "Which is the largest animal alive today?",
    options: ["Elephant", "Blue whale", "Giraffe", "Shark"],
    answer: "Blue whale",
    difficulty: 4,
  },
  {
    question: "Which planet is closest to the sun?",
    options: ["Earth", "Mars", "Mercury", "Venus"],
    answer: "Mercury",
    difficulty: 4,
  },
  {
    question: "In the Northern Hemisphere, which season comes after winter?",
    options: ["Summer", "Fall", "Spring", "Rainy season"],
    answer: "Spring",
    difficulty: 5,
  },
  {
    question: "How many sides does a stop sign have?",
    options: ["6", "7", "8", "9"],
    answer: "8",
    difficulty: 5,
  },
  {
    question: "What do we call frozen water?",
    options: ["Steam", "Ice", "Rain", "Fog"],
    answer: "Ice",
    difficulty: 1,
  },
  {
    question: "Which direction is opposite north?",
    options: ["East", "West", "South", "Up"],
    answer: "South",
    difficulty: 1,
  },
  {
    question: "Which continent is the United States in?",
    options: ["Africa", "Asia", "North America", "Europe"],
    answer: "North America",
    difficulty: 1,
  },
  {
    question: "What do we call a very large body of salt water?",
    options: ["River", "Lake", "Ocean", "Pond"],
    answer: "Ocean",
    difficulty: 1,
  },
  {
    question: "Which season is usually the warmest in many places?",
    options: ["Winter", "Summer", "Spring", "Fall"],
    answer: "Summer",
    difficulty: 1,
  },
  {
    question: "What is a globe?",
    options: ["A round model of Earth", "A type of cloud", "A weather map", "A kind of mountain"],
    answer: "A round model of Earth",
    difficulty: 1,
  },
  {
    question: "Which of these is a continent?",
    options: ["Africa", "The Moon", "A river", "A tree"],
    answer: "Africa",
    difficulty: 1,
  },
  {
    question: "Which of these is a planet?",
    options: ["Mars", "The Sun", "The Moon", "A cloud"],
    answer: "Mars",
    difficulty: 1,
  },
  {
    question: "What do plants need from the sun?",
    options: ["Light", "Noise", "Sand", "Ice"],
    answer: "Light",
    difficulty: 1,
  },
  {
    question: "Which continent is Brazil in?",
    options: ["South America", "Africa", "Europe", "Asia"],
    answer: "South America",
    difficulty: 2,
  },
  {
    question: "Which country is north of the United States?",
    options: ["Mexico", "Canada", "Brazil", "Chile"],
    answer: "Canada",
    difficulty: 2,
  },
  {
    question: "What land is surrounded by water on all sides?",
    options: ["Island", "Valley", "Desert", "Mountain"],
    answer: "Island",
    difficulty: 2,
  },
  {
    question: "What is the coldest season in many places?",
    options: ["Summer", "Winter", "Spring", "Autumn"],
    answer: "Winter",
    difficulty: 2,
  },
  {
    question: "What do we call the edge of land next to the sea?",
    options: ["Coast", "Cloud", "Peak", "Road"],
    answer: "Coast",
    difficulty: 2,
  },
  {
    question: "Which ocean is east of North America?",
    options: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
    answer: "Atlantic Ocean",
    difficulty: 2,
  },
  {
    question: "Which direction does the sun rise in?",
    options: ["North", "East", "South", "West"],
    answer: "East",
    difficulty: 2,
  },
  {
    question: "What do we call water that falls from clouds?",
    options: ["Rain", "Dust", "Smoke", "Sand"],
    answer: "Rain",
    difficulty: 2,
  },
  {
    question: "Which kind of map shows countries and borders?",
    options: ["Political map", "Weather map", "Road map", "Star map"],
    answer: "Political map",
    difficulty: 2,
  },
  {
    question: "Which continent is the largest?",
    options: ["Africa", "Asia", "Europe", "Australia"],
    answer: "Asia",
    difficulty: 3,
  },
  {
    question: "What is the highest mountain on Earth?",
    options: ["Mount Everest", "Mount Rainier", "K2", "Denali"],
    answer: "Mount Everest",
    difficulty: 3,
  },
  {
    question: "What causes day and night on Earth?",
    options: ["Earth's rotation", "The moon's color", "Rain clouds", "Ocean tides"],
    answer: "Earth's rotation",
    difficulty: 3,
  },
  {
    question: "What is a peninsula?",
    options: [
      "Land with water on three sides",
      "A mountain with snow",
      "A deep hole in the ground",
      "A kind of cloud",
    ],
    answer: "Land with water on three sides",
    difficulty: 3,
  },
  {
    question: "Which ocean is west of South America?",
    options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
    answer: "Pacific Ocean",
    difficulty: 3,
  },
  {
    question: "What is the low area between hills or mountains called?",
    options: ["Valley", "Plateau", "Coast", "Peak"],
    answer: "Valley",
    difficulty: 3,
  },
  {
    question: "Which line circles Earth halfway between the North and South Poles?",
    options: ["Equator", "Prime Meridian", "Tropic of Capricorn", "Arctic Circle"],
    answer: "Equator",
    difficulty: 3,
  },
  {
    question: "Which tool helps you find directions on a map?",
    options: ["Compass", "Thermometer", "Telescope", "Ruler"],
    answer: "Compass",
    difficulty: 3,
  },
  {
    question: "What is the name of the line at 0 degrees longitude?",
    options: ["Equator", "Prime Meridian", "Tropic of Cancer", "International Date Line"],
    answer: "Prime Meridian",
    difficulty: 3,
  },
  {
    question: "Which continent has the most countries?",
    options: ["Europe", "Asia", "Africa", "South America"],
    answer: "Africa",
    difficulty: 4,
  },
  {
    question: "What is the capital of Canada?",
    options: ["Toronto", "Ottawa", "Vancouver", "Montreal"],
    answer: "Ottawa",
    difficulty: 4,
  },
  {
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    answer: "Canberra",
    difficulty: 4,
  },
  {
    question: "Which is the largest ocean?",
    options: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean"],
    answer: "Pacific Ocean",
    difficulty: 4,
  },
  {
    question: "Which mountain range separates much of Europe and Asia?",
    options: ["Andes", "Alps", "Ural Mountains", "Himalayas"],
    answer: "Ural Mountains",
    difficulty: 4,
  },
  {
    question: "Which country is the largest by land area?",
    options: ["Canada", "China", "Russia", "United States"],
    answer: "Russia",
    difficulty: 4,
  },
  {
    question: "What is the solid outside layer of Earth called?",
    options: ["Crust", "Core", "Cloud layer", "Mantle"],
    answer: "Crust",
    difficulty: 4,
  },
  {
    question: "What do we call the end of a river where it flows into a larger body of water?",
    options: ["River mouth", "Mountaintop", "Island", "Valley"],
    answer: "River mouth",
    difficulty: 4,
  },
  {
    question: "Which continent is the smallest by land area?",
    options: ["Australia", "Europe", "Antarctica", "South America"],
    answer: "Australia",
    difficulty: 4,
  },
  {
    question: "Which ocean is the smallest?",
    options: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean"],
    answer: "Arctic Ocean",
    difficulty: 5,
  },
  {
    question: "About how long does it take Earth to spin once?",
    options: ["About 12 hours", "About 24 hours", "About 7 days", "About 30 days"],
    answer: "About 24 hours",
    difficulty: 5,
  },
  {
    question: "What is the largest island in the world?",
    options: ["Greenland", "Iceland", "Madagascar", "New Guinea"],
    answer: "Greenland",
    difficulty: 5,
  },
  {
    question: "What is the largest hot desert on Earth?",
    options: ["Gobi Desert", "Sahara Desert", "Kalahari Desert", "Mojave Desert"],
    answer: "Sahara Desert",
    difficulty: 5,
  },
  {
    question: "Which line tells how far east or west a place is?",
    options: ["Latitude", "Longitude", "Equator", "Hemisphere"],
    answer: "Longitude",
    difficulty: 5,
  },
  {
    question: "About what percent of Earth's water is in the oceans?",
    options: ["About 25%", "About 50%", "About 75%", "About 96.5%"],
    answer: "About 96.5%",
    difficulty: 5,
  },
  {
    question: "About what percent of Earth's water is fresh water?",
    options: ["About 2.5%", "About 10%", "About 25%", "About 50%"],
    answer: "About 2.5%",
    difficulty: 5,
  },
  {
    question: "What is the imaginary line at 0 degrees latitude called?",
    options: ["Equator", "Prime Meridian", "Arctic Circle", "Tropic of Capricorn"],
    answer: "Equator",
    difficulty: 5,
  },
  {
    question: "Which continent is mostly covered by ice?",
    options: ["Africa", "Antarctica", "Europe", "Asia"],
    answer: "Antarctica",
    difficulty: 5,
  },
];

function createGeneralKnowledgeGeneratedEntry(difficulty) {
  const level = generalKnowledgeClampDifficulty(difficulty);
  const generatorsByLevel = {
    1: [
      generalKnowledgeCreateContinentQuestion,
      generalKnowledgeCreateOceanQuestion,
      generalKnowledgeCreatePlanetQuestion,
    ],
    2: [
      generalKnowledgeCreateMapVocabularyQuestion,
      generalKnowledgeCreateContinentQuestion,
      generalKnowledgeCreatePlanetQuestion,
    ],
    3: [
      generalKnowledgeCreateMapVocabularyQuestion,
      generalKnowledgeCreateOceanQuestion,
      generalKnowledgeCreatePlanetQuestion,
    ],
    4: [
      generalKnowledgeCreateCountryContinentQuestion,
      generalKnowledgeCreateOceanQuestion,
      generalKnowledgeCreatePlanetQuestion,
    ],
    5: [
      generalKnowledgeCreateMapVocabularyQuestion,
      generalKnowledgeCreateCountryContinentQuestion,
      generalKnowledgeCreatePlanetQuestion,
    ],
  };

  return generalKnowledgeRandomChoice(generatorsByLevel[level])();
}

function generalKnowledgeCreateContinentQuestion() {
  const templates = [
    {
      question: "How many continents are there?",
      options: ["Five", "Six", "Seven", "Eight"],
      answer: "Seven",
      difficulty: 1,
    },
    {
      question: "Which continent has the most people?",
      options: ["Africa", "Asia", "Europe", "South America"],
      answer: "Asia",
      difficulty: 2,
    },
    {
      question: "Which continent is India in?",
      options: ["Africa", "Asia", "Europe", "South America"],
      answer: "Asia",
      difficulty: 5,
    },
    {
      question: "Which continent is the Sahara Desert mostly in?",
      options: ["Africa", "Asia", "Europe", "Australia"],
      answer: "Africa",
      difficulty: 5,
    },
  ];

  return generalKnowledgeRandomChoice(templates);
}

function generalKnowledgeCreateOceanQuestion() {
  const templates = [
    {
      question: "Which ocean is the largest?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      answer: "Pacific Ocean",
      difficulty: 1,
    },
    {
      question: "Which ocean is between Africa, Asia, and Australia?",
      options: ["Atlantic Ocean", "Arctic Ocean", "Pacific Ocean", "Indian Ocean"],
      answer: "Indian Ocean",
      difficulty: 3,
    },
    {
      question: "Which ocean touches the west coast of South America?",
      options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
      answer: "Pacific Ocean",
      difficulty: 4,
    },
    {
      question: "Which ocean is closest to the North Pole?",
      options: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean"],
      answer: "Arctic Ocean",
      difficulty: 5,
    },
  ];

  return generalKnowledgeRandomChoice(templates);
}

function generalKnowledgeCreateMapVocabularyQuestion() {
  const templates = [
    {
      question: "Which map word tells how far north or south a place is?",
      options: ["Latitude", "Longitude", "Legend", "Scale"],
      answer: "Latitude",
      difficulty: 3,
    },
    {
      question: "Which tool helps you find north, south, east, and west?",
      options: ["Thermometer", "Compass", "Ruler", "Scale"],
      answer: "Compass",
      difficulty: 3,
    },
    {
      question: "What does the word 'hemisphere' mean?",
      options: ["One map symbol", "One half of Earth", "A country border", "A weather report"],
      answer: "One half of Earth",
      difficulty: 4,
    },
    {
      question: "What is the line of 0 degrees longitude called?",
      options: ["Equator", "Prime Meridian", "Arctic Circle", "Tropic of Cancer"],
      answer: "Prime Meridian",
      difficulty: 5,
    },
  ];

  return generalKnowledgeRandomChoice(templates);
}

function generalKnowledgeCreateCountryContinentQuestion() {
  const templates = [
    {
      question: "Which continent is Egypt in?",
      options: ["Africa", "Asia", "Europe", "South America"],
      answer: "Africa",
      difficulty: 4,
    },
    {
      question: "Which continent is Brazil in?",
      options: ["Africa", "Asia", "Europe", "South America"],
      answer: "South America",
      difficulty: 4,
    },
    {
      question: "Which continent is Canada in?",
      options: ["Africa", "Asia", "Europe", "North America"],
      answer: "North America",
      difficulty: 4,
    },
    {
      question: "Which continent is India in?",
      options: ["Africa", "Asia", "Europe", "South America"],
      answer: "Asia",
      difficulty: 5,
    },
  ];

  return generalKnowledgeRandomChoice(templates);
}

function generalKnowledgeCreatePlanetQuestion() {
  const templates = [
    {
      question: "What planet do we live on?",
      options: ["Mars", "Venus", "Earth", "Jupiter"],
      answer: "Earth",
      difficulty: 1,
    },
    {
      question: "Which planet is often called the Red Planet?",
      options: ["Mercury", "Mars", "Saturn", "Neptune"],
      answer: "Mars",
      difficulty: 2,
    },
    {
      question: "Which star gives Earth light and heat?",
      options: ["The Moon", "The Sun", "Polaris", "Mars"],
      answer: "The Sun",
      difficulty: 3,
    },
    {
      question: "How many planets are in our solar system?",
      options: ["Six", "Seven", "Eight", "Nine"],
      answer: "Eight",
      difficulty: 4,
    },
    {
      question: "Which planet is closest to the sun?",
      options: ["Mercury", "Venus", "Earth", "Mars"],
      answer: "Mercury",
      difficulty: 5,
    },
  ];

  return generalKnowledgeRandomChoice(templates);
}

function generalKnowledgeClampDifficulty(value) {
  const difficulty = Number(value);
  if (!Number.isInteger(difficulty) || difficulty < 1) {
    return 1;
  }

  return Math.min(5, difficulty);
}

function generalKnowledgeRandomChoice(values) {
  if (typeof randomChoice === "function") {
    return randomChoice(values);
  }

  return values[Math.floor(Math.random() * values.length)];
}

GENERAL_KNOWLEDGE_QUESTIONS.push(
  ...[
    {
      question: "What do you use to write on paper?",
      options: ["Pencil", "Spoon", "Rope", "Brush"],
      answer: "Pencil",
      difficulty: 1,
    },
    {
      question: "Where do you go to borrow books?",
      options: ["Library", "Bakery", "Garage", "Zoo"],
      answer: "Library",
      difficulty: 1,
    },
    {
      question: "What color is a stop sign?",
      options: ["Blue", "Red", "Green", "Yellow"],
      answer: "Red",
      difficulty: 1,
    },
    {
      question: "What do you use to cut paper?",
      options: ["Scissors", "Fork", "Spoon", "Tape"],
      answer: "Scissors",
      difficulty: 1,
    },
    {
      question: "Which animal says \"meow\"?",
      options: ["Dog", "Cat", "Cow", "Duck"],
      answer: "Cat",
      difficulty: 1,
    },
    {
      question: "What do you drink when you are thirsty?",
      options: ["Water", "Sand", "Soap", "Paint"],
      answer: "Water",
      difficulty: 1,
    },
    {
      question: "Which direction is opposite east?",
      options: ["North", "South", "West", "Up"],
      answer: "West",
      difficulty: 1,
    },
    {
      question: "Which season is the coldest?",
      options: ["Spring", "Summer", "Fall", "Winter"],
      answer: "Winter",
      difficulty: 1,
    },
    {
      question: "What do firefighters use to put out fires?",
      options: ["Water", "Candy", "Paint", "Sandpaper"],
      answer: "Water",
      difficulty: 1,
    },
    {
      question: "What vehicle usually travels on tracks?",
      options: ["Train", "Boat", "Bike", "Plane"],
      answer: "Train",
      difficulty: 1,
    },
    {
      question: "What do you call frozen water?",
      options: ["Steam", "Ice", "Salt", "Rain"],
      answer: "Ice",
      difficulty: 1,
    },
    {
      question: "What do you call the people who teach at school?",
      options: ["Teachers", "Drivers", "Cooks", "Neighbors"],
      answer: "Teachers",
      difficulty: 1,
    },
    {
      question: "What should you wear to protect your eyes from the sun?",
      options: ["Sunglasses", "Sandals", "Gloves", "A scarf"],
      answer: "Sunglasses",
      difficulty: 1,
    },
    {
      question: "What do you use to tell time?",
      options: ["Clock", "Chair", "Kite", "Basket"],
      answer: "Clock",
      difficulty: 1,
    },
    {
      question: "What is the day after today called?",
      options: ["Yesterday", "Tomorrow", "Sunday", "Tonight"],
      answer: "Tomorrow",
      difficulty: 1,
    },
    {
      question: "Which shape has three sides?",
      options: ["Triangle", "Square", "Circle", "Rectangle"],
      answer: "Triangle",
      difficulty: 1,
    },
    {
      question: "What place do you go to buy groceries?",
      options: ["Supermarket", "Theater", "Stadium", "Garage"],
      answer: "Supermarket",
      difficulty: 1,
    },
    {
      question: "Which planet do humans live on?",
      options: ["Mars", "Venus", "Earth", "Jupiter"],
      answer: "Earth",
      difficulty: 1,
    },
    {
      question: "What does a thermometer measure?",
      options: ["Temperature", "Distance", "Weight", "Speed"],
      answer: "Temperature",
      difficulty: 2,
    },
    {
      question: "Which continent is Australia in?",
      options: ["Asia", "Europe", "South America", "Australia"],
      answer: "Australia",
      difficulty: 2,
    },
    {
      question: "Which ocean is west of Africa?",
      options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
      answer: "Atlantic Ocean",
      difficulty: 2,
    },
    {
      question: "What is a map key used for?",
      options: ["Showing symbols on a map", "Measuring temperature", "Finding the weather", "Counting people"],
      answer: "Showing symbols on a map",
      difficulty: 2,
    },
    {
      question: "What does recycling mean?",
      options: ["Using things again", "Throwing everything away", "Making things disappear", "Buying more things"],
      answer: "Using things again",
      difficulty: 2,
    },
    {
      question: "Which country has the largest population?",
      options: ["India", "Canada", "Australia", "Spain"],
      answer: "India",
      difficulty: 2,
    },
    {
      question: "What is the capital of Japan?",
      options: ["Seoul", "Tokyo", "Beijing", "Bangkok"],
      answer: "Tokyo",
      difficulty: 2,
    },
    {
      question: "What does a compass show?",
      options: ["Directions", "Temperature", "Time", "Weight"],
      answer: "Directions",
      difficulty: 2,
    },
    {
      question: "Which season follows summer?",
      options: ["Spring", "Winter", "Fall", "Rainy season"],
      answer: "Fall",
      difficulty: 2,
    },
    {
      question: "What is Earth's natural satellite?",
      options: ["The Sun", "The Moon", "Mars", "A cloud"],
      answer: "The Moon",
      difficulty: 2,
    },
    {
      question: "Which continent is Egypt in?",
      options: ["Africa", "Asia", "Europe", "South America"],
      answer: "Africa",
      difficulty: 2,
    },
    {
      question: "What is the main use of a calendar?",
      options: ["Showing dates and days", "Measuring height", "Cooking food", "Cleaning dishes"],
      answer: "Showing dates and days",
      difficulty: 2,
    },
    {
      question: "What do you call frozen rain?",
      options: ["Hail", "Fog", "Dew", "Mist"],
      answer: "Hail",
      difficulty: 2,
    },
    {
      question: "What is the capital of Italy?",
      options: ["Milan", "Rome", "Venice", "Naples"],
      answer: "Rome",
      difficulty: 2,
    },
    {
      question: "What does a thermometer help you check when you feel sick?",
      options: ["Body temperature", "Eye color", "Hair length", "Shoe size"],
      answer: "Body temperature",
      difficulty: 2,
    },
    {
      question: "Which ocean is between Africa and Australia?",
      options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
      answer: "Indian Ocean",
      difficulty: 2,
    },
    {
      question: "What is the largest country by land area?",
      options: ["Canada", "China", "Russia", "United States"],
      answer: "Russia",
      difficulty: 2,
    },
    {
      question: "What line runs around the middle of Earth?",
      options: ["Equator", "Prime Meridian", "Tropic of Cancer", "North Pole"],
      answer: "Equator",
      difficulty: 2,
    },
    {
      question: "What is the capital of Portugal?",
      options: ["Porto", "Lisbon", "Madrid", "Barcelona"],
      answer: "Lisbon",
      difficulty: 3,
    },
    {
      question: "What do you call a plan for how to use money?",
      options: ["Budget", "Map", "Recipe", "Mirror"],
      answer: "Budget",
      difficulty: 3,
    },
    {
      question: "What does GPS help you do?",
      options: ["Find where you are", "Cook food", "Read faster", "Grow plants"],
      answer: "Find where you are",
      difficulty: 3,
    },
    {
      question: "What is the capital of New Zealand?",
      options: ["Auckland", "Wellington", "Sydney", "Canberra"],
      answer: "Wellington",
      difficulty: 3,
    },
    {
      question: "What is the main job of a librarian?",
      options: ["Help people find books", "Build roads", "Sell shoes", "Train animals"],
      answer: "Help people find books",
      difficulty: 3,
    },
    {
      question: "Which map type shows roads and streets?",
      options: ["Road map", "Weather map", "Star map", "Food map"],
      answer: "Road map",
      difficulty: 3,
    },
    {
      question: "What does estimated mean?",
      options: ["About how much", "Perfectly exact", "Broken apart", "Very small"],
      answer: "About how much",
      difficulty: 3,
    },
    {
      question: "What is the best tool for measuring a room?",
      options: ["Tape measure", "Fork", "Ruler for a pencil", "Clock"],
      answer: "Tape measure",
      difficulty: 3,
    },
    {
      question: "What is the main purpose of a helmet?",
      options: ["Protect your head", "Make you run faster", "Keep food warm", "Change your voice"],
      answer: "Protect your head",
      difficulty: 3,
    },
    {
      question: "What does population mean?",
      options: ["Number of people in a place", "Number of books in a library", "Number of cars on a road", "Number of animals in a zoo"],
      answer: "Number of people in a place",
      difficulty: 3,
    },
    {
      question: "Which continent has the Sahara Desert?",
      options: ["Africa", "Asia", "Europe", "Australia"],
      answer: "Africa",
      difficulty: 3,
    },
    {
      question: "What does weather describe?",
      options: ["The short-term conditions outside", "The long-term pattern in a place", "The shape of clouds only", "The direction of a river"],
      answer: "The short-term conditions outside",
      difficulty: 3,
    },
    {
      question: "What does a legend on a map tell you?",
      options: ["What symbols mean", "Who drew the map", "How old the map is", "Where the compass points"],
      answer: "What symbols mean",
      difficulty: 3,
    },
    {
      question: "What is renewable energy?",
      options: ["Energy that can be replaced", "Energy that never works", "Energy made of metal", "Energy that is always noisy"],
      answer: "Energy that can be replaced",
      difficulty: 3,
    },
    {
      question: "What place do airplanes use to take off and land?",
      options: ["Airport", "Harbor", "Garage", "Farm"],
      answer: "Airport",
      difficulty: 3,
    },
    {
      question: "What is the first meal of the day?",
      options: ["Lunch", "Dinner", "Breakfast", "Snack"],
      answer: "Breakfast",
      difficulty: 3,
    },
    {
      question: "What does a source mean in research?",
      options: ["Where information comes from", "A water pipe", "A school subject", "A kind of pencil"],
      answer: "Where information comes from",
      difficulty: 3,
    },
    {
      question: "What is an atlas?",
      options: ["A book of maps", "A kind of clock", "A tool for cooking", "A weather app"],
      answer: "A book of maps",
      difficulty: 3,
    },
    {
      question: "What does a government do?",
      options: ["Make and enforce laws", "Grow crops", "Print books", "Paint houses"],
      answer: "Make and enforce laws",
      difficulty: 4,
    },
    {
      question: "What is the purpose of a traffic light?",
      options: ["Control traffic", "Tell the weather", "Count cars", "Make roads wider"],
      answer: "Control traffic",
      difficulty: 4,
    },
    {
      question: "Which continent has the Amazon Rainforest?",
      options: ["Africa", "Asia", "South America", "Australia"],
      answer: "South America",
      difficulty: 4,
    },
    {
      question: "What does import mean?",
      options: ["Bring goods into a country", "Send goods out of a country", "Throw goods away", "Hide goods in a store"],
      answer: "Bring goods into a country",
      difficulty: 4,
    },
    {
      question: "What is the best way to check if information is true?",
      options: ["Compare more than one source", "Ask only one person", "Believe the first post", "Guess quickly"],
      answer: "Compare more than one source",
      difficulty: 4,
    },
    {
      question: "What is a consumer?",
      options: ["A person who buys or uses goods", "A person who cooks for a school", "A person who builds roads", "A person who writes maps"],
      answer: "A person who buys or uses goods",
      difficulty: 4,
    },
    {
      question: "What does a constitution do?",
      options: ["Gives basic rules for government", "Cures sickness", "Measures land", "Teaches math"],
      answer: "Gives basic rules for government",
      difficulty: 4,
    },
    {
      question: "What is the best estimate of Nigeria's population?",
      options: ["About 23 million", "About 230 million", "About 2.3 billion", "About 23 billion"],
      answer: "About 230 million",
      difficulty: 4,
    },
    {
      question: "What is the capital of Argentina?",
      options: ["Buenos Aires", "Santiago", "Lima", "Bogota"],
      answer: "Buenos Aires",
      difficulty: 4,
    },
    {
      question: "Which country is the largest by area?",
      options: ["Canada", "China", "Russia", "Brazil"],
      answer: "Russia",
      difficulty: 4,
    },
    {
      question: "Which map feature helps compare distance?",
      options: ["Scale", "Title", "Border", "Key"],
      answer: "Scale",
      difficulty: 4,
    },
    {
      question: "What is a public service?",
      options: ["A service that helps the public", "A game played in a park", "A private hobby", "A kind of snack"],
      answer: "A service that helps the public",
      difficulty: 4,
    },
    {
      question: "What is the best reason to wash hands before eating?",
      options: ["Reduce germs", "Make food sweeter", "Keep your shoes clean", "Change the weather"],
      answer: "Reduce germs",
      difficulty: 4,
    },
    {
      question: "What is the difference between weather and climate?",
      options: [
        "Weather is short-term, climate is long-term",
        "Weather is indoors, climate is outdoors",
        "Weather is only in winter",
        "Climate is only rain",
      ],
      answer: "Weather is short-term, climate is long-term",
      difficulty: 4,
    },
    {
      question: "What is the emergency number in the US?",
      options: ["112", "911", "999", "123"],
      answer: "911",
      difficulty: 4,
    },
    {
      question: "What is the capital of Spain?",
      options: ["Barcelona", "Madrid", "Lisbon", "Rome"],
      answer: "Madrid",
      difficulty: 4,
    },
    {
      question: "What does export mean?",
      options: ["Send goods to another country", "Bring goods into a country", "Hide goods at home", "Throw goods away"],
      answer: "Send goods to another country",
      difficulty: 4,
    },
    {
      question: "What is the capital of Germany?",
      options: ["Munich", "Berlin", "Hamburg", "Cologne"],
      answer: "Berlin",
      difficulty: 4,
    },
    {
      question: "About how many people live on Earth?",
      options: ["About 2 billion", "About 5 billion", "About 8 billion", "About 12 billion"],
      answer: "About 8 billion",
      difficulty: 5,
    },
    {
      question: "About what percent of Earth's water is salt water?",
      options: ["About 25%", "About 50%", "About 75%", "About 97.5%"],
      answer: "About 97.5%",
      difficulty: 5,
    },
    {
      question: "Which continent is India in?",
      options: ["Africa", "Asia", "Europe", "South America"],
      answer: "Asia",
      difficulty: 5,
    },
    {
      question: "Which ocean touches the west coast of South America?",
      options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
      answer: "Pacific Ocean",
      difficulty: 5,
    },
    {
      question: "Which ocean is closest to the North Pole?",
      options: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean"],
      answer: "Arctic Ocean",
      difficulty: 5,
    },
    {
      question: "What is the capital of Brazil?",
      options: ["Rio de Janeiro", "Brasilia", "Sao Paulo", "Salvador"],
      answer: "Brasilia",
      difficulty: 5,
    },
    {
      question: "What is the capital of Kenya?",
      options: ["Lagos", "Nairobi", "Accra", "Kampala"],
      answer: "Nairobi",
      difficulty: 5,
    },
    {
      question: "What is the capital of Turkey?",
      options: ["Ankara", "Istanbul", "Athens", "Sofia"],
      answer: "Ankara",
      difficulty: 5,
    },
    {
      question: "What is the capital of Mexico?",
      options: ["Monterrey", "Guadalajara", "Mexico City", "Cancun"],
      answer: "Mexico City",
      difficulty: 5,
    },
    {
      question: "What is the capital of Egypt?",
      options: ["Alexandria", "Cairo", "Rabat", "Tripoli"],
      answer: "Cairo",
      difficulty: 5,
    },
    {
      question: "Which country has the largest population in Africa?",
      options: ["Nigeria", "Egypt", "South Africa", "Kenya"],
      answer: "Nigeria",
      difficulty: 5,
    },
    {
      question: "Which country has the largest population in South America?",
      options: ["Argentina", "Peru", "Brazil", "Chile"],
      answer: "Brazil",
      difficulty: 5,
    },
    {
      question: "Which continent is the Amazon Rainforest in?",
      options: ["Africa", "Asia", "South America", "Australia"],
      answer: "South America",
      difficulty: 5,
    },
    {
      question: "Which mountain range is in South America?",
      options: ["Alps", "Rockies", "Andes", "Himalayas"],
      answer: "Andes",
      difficulty: 5,
    },
    {
      question: "What is the tallest mountain on Earth?",
      options: ["K2", "Mount Everest", "Mount Kilimanjaro", "Mount Fuji"],
      answer: "Mount Everest",
      difficulty: 5,
    },
    {
      question: "Which desert is the largest hot desert?",
      options: ["Gobi Desert", "Sahara Desert", "Kalahari Desert", "Mojave Desert"],
      answer: "Sahara Desert",
      difficulty: 5,
    },
    {
      question: "About how many countries are in Europe?",
      options: ["About 24", "About 44", "About 64", "About 84"],
      answer: "About 44",
      difficulty: 5,
    },
    {
      question: "What is the line of 0 degrees longitude called?",
      options: ["Equator", "Prime Meridian", "Arctic Circle", "Tropic of Cancer"],
      answer: "Prime Meridian",
      difficulty: 5,
    },
  ]
);

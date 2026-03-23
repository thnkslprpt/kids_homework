// Bundled offline science multiple-choice questions.
const SCIENCE_QUESTIONS = [
  {
    "question": "Which element has the chemical symbol 'Fe'?",
    "correctAnswer": "Iron",
    "incorrectAnswers": [
      "Gold",
      "Silver",
      "Tin"
    ],
    "category": "Science & Nature",
    "difficulty": 4
  },
  {
    "question": "What is the official name of the star located closest to the North Celestial Pole?",
    "correctAnswer": "Polaris",
    "incorrectAnswers": [
      "Eridanus",
      "Gamma Cephei",
      "Iota Cephei"
    ],
    "category": "Science & Nature",
    "difficulty": 2
  },
  {
    "question": "Which is the most abundant element in the universe?",
    "correctAnswer": "Hydrogen",
    "incorrectAnswers": [
      "Helium",
      "Lithium",
      "Oxygen"
    ],
    "category": "Science & Nature",
    "difficulty": 2
  },
  {
    "question": "What was the name of the first artificial Earth satellite, launched by the Soviet Union in 1957?",
    "correctAnswer": "Sputnik 1",
    "incorrectAnswers": [
      "Soyuz 7K-OK",
      "Zenit-2",
      "Voskhod 3KV"
    ],
    "category": "Science & Nature",
    "difficulty": 2
  },
  {
    "question": "How many planets are in our Solar System?",
    "correctAnswer": "Eight",
    "incorrectAnswers": [
      "Nine",
      "Seven",
      "Ten"
    ],
    "category": "Science & Nature",
    "difficulty": 1
  },
  {
    "question": "What organelle aids in synthesis of DNA in cells?",
    "correctAnswer": "Ribosomes",
    "incorrectAnswers": [
      "Nuclei",
      "Lysosomes",
      "Mitochondria"
    ],
    "category": "Science & Nature",
    "difficulty": 4
  },
  {
    "question": "What is the chemical symbol for Helium?",
    "correctAnswer": "He",
    "incorrectAnswers": [
      "H",
      "Hg",
      "Hs"
    ],
    "category": "Science & Nature",
    "difficulty": 1
  },
  {
    "question": "What is an example of a bacterial pathogen?",
    "correctAnswer": "Cholera",
    "incorrectAnswers": [
      "Measles",
      "AIDS",
      "Ringworm"
    ],
    "category": "Science & Nature",
    "difficulty": 5
  },
  {
    "question": "What is the hottest planet in the Solar System?",
    "correctAnswer": "Venus",
    "incorrectAnswers": [
      "Mars",
      "Mercury",
      "Jupiter"
    ],
    "category": "Science & Nature",
    "difficulty": 4
  },
  {
    "question": "How many bones are in the human body?",
    "correctAnswer": "206",
    "incorrectAnswers": [
      "203",
      "209",
      "200"
    ],
    "category": "Science & Nature",
    "difficulty": 2
  },
  {
    "question": "What is the chemical makeup of water?",
    "correctAnswer": "H2O",
    "incorrectAnswers": [
      "C12H6O2",
      "CO2",
      "H"
    ],
    "category": "Science & Nature",
    "difficulty": 3
  },
  {
    "question": "What lies at the center of our galaxy?",
    "correctAnswer": "A black hole",
    "incorrectAnswers": [
      "A wormhole",
      "A supernova",
      "A quasar"
    ],
    "category": "Science & Nature",
    "difficulty": 3
  },
  {
    "question": "What is the powerhouse of the cell?",
    "correctAnswer": "Mitochondria",
    "incorrectAnswers": [
      "Ribosome",
      "Redbull",
      "Nucleus"
    ],
    "category": "Science & Nature",
    "difficulty": 3
  },
  {
    "question": "What is the atomic mass of Carbon?",
    "correctAnswer": "12",
    "incorrectAnswers": [
      "14",
      "16",
      "10"
    ],
    "category": "Science & Nature",
    "difficulty": 4
  },
  {
    "question": "The biggest distinction between a eukaryotic cell and a prokaryotic cell is:",
    "correctAnswer": "The presence or absence of a nucleus",
    "incorrectAnswers": [
      "The overall size",
      "The presence or absence of certain organelles",
      "The mode of reproduction"
    ],
    "category": "Science & Nature",
    "difficulty": 5
  },
  {
    "question": "What is the largest planet in the Solar System?",
    "correctAnswer": "Jupiter",
    "incorrectAnswers": [
      "Saturn",
      "Earth",
      "Mars"
    ],
    "category": "Science & Nature",
    "difficulty": 1
  },
  {
    "question": "What produces the green colour of most plant leaves?",
    "correctAnswer": "Chlorophyll",
    "incorrectAnswers": [
      "Light refraction",
      "Natural pigments",
      "UV radiation"
    ],
    "category": "Science & Nature",
    "difficulty": 2
  },
  {
    "question": "What is the unit of electrical resistance?",
    "correctAnswer": "Ohm",
    "incorrectAnswers": [
      "Mho",
      "Tesla",
      "Joule"
    ],
    "category": "Science & Nature",
    "difficulty": 5
  },
  {
    "question": "What name is given to all baby marsupials?",
    "correctAnswer": "Joey",
    "incorrectAnswers": [
      "Calf",
      "Pup",
      "Cub"
    ],
    "category": "Science & Nature",
    "difficulty": 2
  },
  {
    "question": "Rhinoplasty is a surgical procedure on what part of the human body?",
    "correctAnswer": "Nose",
    "incorrectAnswers": [
      "Ears",
      "Chin",
      "Neck"
    ],
    "category": "Science & Nature",
    "difficulty": 2
  },
  {
    "question": "71% of the Earth's surface is made up of",
    "correctAnswer": "Water",
    "incorrectAnswers": [
      "Deserts",
      "Continents",
      "Forests"
    ],
    "category": "Science & Nature",
    "difficulty": 3
  },
  {
    "question": "What is the largest animal currently on Earth?",
    "correctAnswer": "Blue Whale",
    "incorrectAnswers": [
      "Orca",
      "Colossal Squid",
      "Giraffe"
    ],
    "category": "Science & Nature",
    "difficulty": 1
  },
  {
    "question": "Which of the following bones is not in the leg?",
    "correctAnswer": "Radius",
    "incorrectAnswers": [
      "Patella",
      "Tibia",
      "Fibula"
    ],
    "category": "Science & Nature",
    "difficulty": 2
  },
  {
    "question": "Which Apollo mission was the first one to land on the Moon?",
    "correctAnswer": "Apollo 11",
    "incorrectAnswers": [
      "Apollo 10",
      "Apollo 9",
      "Apollo 13"
    ],
    "category": "Science & Nature",
    "difficulty": 2
  },
  {
    "question": "What is the first element on the periodic table?",
    "correctAnswer": "Hydrogen",
    "incorrectAnswers": [
      "Helium",
      "Oxygen",
      "Lithium"
    ],
    "category": "Science & Nature",
    "difficulty": 3
  },
  {
    "question": "What is the elemental symbol for mercury?",
    "correctAnswer": "Hg",
    "incorrectAnswers": [
      "Me",
      "Mc",
      "Hy"
    ],
    "category": "Science & Nature",
    "difficulty": 4
  },
  {
    "question": "Who discovered the Law of Gravity?",
    "correctAnswer": "Sir Isaac Newton",
    "incorrectAnswers": [
      "Galileo Galilei",
      "Charles Darwin",
      "Albert Einstein"
    ],
    "category": "Science & Nature",
    "difficulty": 5
  },
  {
    "question": "What does LASER stand for?",
    "correctAnswer": "Light amplification by stimulated emission of radiation",
    "incorrectAnswers": [
      "Lite analysing by stereo ecorazer",
      "Light amplifier by standby energy of radio",
      "Life antimatter by standing entry of range"
    ],
    "category": "Science & Nature",
    "difficulty": 2
  },
  {
    "question": "Stars consist mainly of hydrogen and which other gas?",
    "correctAnswer": "Helium",
    "incorrectAnswers": [
      "Oxygen",
      "Argon",
      "Nitrogen"
    ],
    "category": "Science & Nature",
    "difficulty": 2
  },
  {
    "question": "The element involved in making human blood red is which of the following?",
    "correctAnswer": "Iron",
    "incorrectAnswers": [
      "Copper",
      "Iridium",
      "Cobalt"
    ],
    "category": "Science & Nature",
    "difficulty": 2
  },
  {
    "question": "How many laws of thermodynamics are there?",
    "correctAnswer": "Four",
    "incorrectAnswers": [
      "Three",
      "Two",
      "Five"
    ],
    "category": "Science & Nature",
    "difficulty": 2
  },
  {
    "question": "The medical term for the belly button is which of the following?",
    "correctAnswer": "Umbilicus",
    "incorrectAnswers": [
      "Nevus",
      "Nares",
      "Paxillus"
    ],
    "category": "Science & Nature",
    "difficulty": 2
  },
  {
    "question": "How many moons does the Earth have?",
    "correctAnswer": "1",
    "incorrectAnswers": [
      "0",
      "2",
      "3"
    ],
    "category": "Science & Nature",
    "difficulty": 1
  },
  {
    "question": "What is the standard SI unit for time?",
    "correctAnswer": "Second",
    "incorrectAnswers": [
      "Minute",
      "Hour",
      "Day"
    ],
    "category": "Science & Nature",
    "difficulty": 2
  },
  {
    "question": "Who is the chemical element Curium named after?",
    "correctAnswer": "Marie & Pierre Curie",
    "incorrectAnswers": [
      "The Curiosity Rover",
      "Curious George",
      "Stephen Curry"
    ],
    "category": "Science & Nature",
    "difficulty": 2
  },
  {
    "question": "Which of these Elements is a metalloid?",
    "correctAnswer": "Antimony",
    "incorrectAnswers": [
      "Tin",
      "Bromine",
      "Rubidium"
    ],
    "category": "Science & Nature",
    "difficulty": 5
  },
  {
    "question": "Which type of rock is created by intense heat AND pressure?",
    "correctAnswer": "Metamorphic",
    "incorrectAnswers": [
      "Sedimentary",
      "Igneous",
      "Diamond"
    ],
    "category": "Science & Nature",
    "difficulty": 3
  },
  {
    "question": "What is the standard SI unit for distance?",
    "correctAnswer": "Metre",
    "incorrectAnswers": [
      "Angstrom",
      "Foot",
      "Fathom"
    ],
    "category": "Science & Nature",
    "difficulty": 2
  },
  {
    "question": "What does the letter 'S' stand for in 'NASA'?",
    "correctAnswer": "Space",
    "incorrectAnswers": [
      "Science",
      "Society",
      "Star"
    ],
    "category": "Science & Nature",
    "difficulty": 2
  },
  {
    "question": "About what percentage of the Earth's surface is water?",
    "correctAnswer": "70%",
    "incorrectAnswers": [
      "30%",
      "50%",
      "90%"
    ],
    "category": "Science & Nature",
    "difficulty": 3
  },
  {
    "question": "What does DNA stand for?",
    "correctAnswer": "Deoxyribonucleic Acid",
    "incorrectAnswers": [
      "Deoxyribogenetic Acid",
      "Deoxyribogenetic Atoms",
      "Detoxic Acid"
    ],
    "category": "Science & Nature",
    "difficulty": 4
  },
  {
    "question": "What is the thin, outermost layer of the Earth?",
    "correctAnswer": "Crust",
    "incorrectAnswers": [
      "Exosphere",
      "Mantle",
      "Outer Core"
    ],
    "category": "Science & Nature",
    "difficulty": 4
  },
  {
    "question": "What is the \"powerhouse\" of the Eukaryotic animal cell?",
    "correctAnswer": "Mitochondria",
    "incorrectAnswers": [
      "Nucleus",
      "Chloroplast",
      "Endoplasmic Reticulum"
    ],
    "category": "Science & Nature",
    "difficulty": 5
  },
  {
    "question": "Which of these bones is hardest to break?",
    "correctAnswer": "Femur",
    "incorrectAnswers": [
      "Cranium",
      "Humerus",
      "Tibia"
    ],
    "category": "Science & Nature",
    "difficulty": 2
  },
  {
    "question": "What did Gregory Mendel use to test genetic crossovers?",
    "correctAnswer": "Peas",
    "incorrectAnswers": [
      "Cats",
      "Flowers",
      "Parrots"
    ],
    "category": "Science & Nature",
    "difficulty": 2
  },
  {
    "question": "Which element has the highest melting point?",
    "correctAnswer": "Carbon",
    "incorrectAnswers": [
      "Tungsten",
      "Platinum",
      "Osmium"
    ],
    "category": "Science & Nature",
    "difficulty": 5
  },
  {
    "question": "This element, when overcome with extreme heat and pressure, creates diamonds.",
    "correctAnswer": "Carbon",
    "incorrectAnswers": [
      "Nitrogen",
      "Oxygen",
      "Hydrogen"
    ],
    "category": "Science & Nature",
    "difficulty": 2
  },
  {
    "question": "Which is the longest bone in the human body?",
    "correctAnswer": "Femur",
    "incorrectAnswers": [
      "Scapula",
      "Fibula",
      "Ulna"
    ],
    "category": "Science & Nature",
    "difficulty": 4
  },
  {
    "question": "Which gas forms about 78% of the Earth’s atmosphere?",
    "correctAnswer": "Nitrogen",
    "incorrectAnswers": [
      "Oxygen",
      "Argon",
      "Carbon Dioxide"
    ],
    "category": "Science & Nature",
    "difficulty": 3
  },
  {
    "question": "How many moons does Pluto have?",
    "correctAnswer": "Five",
    "incorrectAnswers": [
      "Two",
      "Three",
      "One"
    ],
    "category": "Science & Nature",
    "difficulty": 2
  },
  {
    "question": "What causes day and night on Earth?",
    "correctAnswer": "Earth spins on its axis",
    "incorrectAnswers": [
      "The Moon covers the Sun",
      "The Sun turns on and off",
      "Clouds move over the sky"
    ],
    "category": "Curated Science",
    "difficulty": 1
  },
  {
    "question": "Which gas do people need to breathe to stay alive?",
    "correctAnswer": "Oxygen",
    "incorrectAnswers": [
      "Helium",
      "Neon",
      "Hydrogen"
    ],
    "category": "Curated Science",
    "difficulty": 1
  },
  {
    "question": "What does the heart do?",
    "correctAnswer": "It pumps blood through the body",
    "incorrectAnswers": [
      "It cleans the air you breathe",
      "It helps you digest food",
      "It makes your bones hard"
    ],
    "category": "Curated Science",
    "difficulty": 1
  },
  {
    "question": "Why does the Moon seem to glow?",
    "correctAnswer": "It reflects sunlight",
    "incorrectAnswers": [
      "It makes its own light",
      "It is on fire",
      "It is full of lightning"
    ],
    "category": "Curated Science",
    "difficulty": 2
  },
  {
    "question": "Which gas do lungs move out of the body when you breathe out?",
    "correctAnswer": "Carbon dioxide",
    "incorrectAnswers": [
      "Oxygen",
      "Nitrogen",
      "Hydrogen"
    ],
    "category": "Curated Science",
    "difficulty": 2
  },
  {
    "question": "Which body system includes the brain, spinal cord, and nerves?",
    "correctAnswer": "The nervous system",
    "incorrectAnswers": [
      "The digestive system",
      "The skeletal system",
      "The circulatory system"
    ],
    "category": "Curated Science",
    "difficulty": 2
  },
  {
    "question": "What is weather?",
    "correctAnswer": "The short-term conditions of the atmosphere",
    "incorrectAnswers": [
      "The long-term pattern of seasons over many years",
      "The shape of the land",
      "Only the amount of rain in one year"
    ],
    "category": "Curated Science",
    "difficulty": 3
  },
  {
    "question": "What is climate?",
    "correctAnswer": "The long-term pattern of weather in a place",
    "incorrectAnswers": [
      "Today's temperature only",
      "The speed of the wind right now",
      "The amount of sunlight in one hour"
    ],
    "category": "Curated Science",
    "difficulty": 3
  },
  {
    "question": "What is precipitation?",
    "correctAnswer": "Water that falls from clouds",
    "incorrectAnswers": [
      "Water that stays underground",
      "Heat rising from the ground",
      "Clouds moving across the sky"
    ],
    "category": "Curated Science",
    "difficulty": 3
  },
  {
    "question": "Why do we have seasons on Earth?",
    "correctAnswer": "Earth is tilted as it travels around the Sun",
    "incorrectAnswers": [
      "The Moon changes shape",
      "Earth moves closer to the Sun every summer",
      "Clouds block the Sun in winter"
    ],
    "category": "Curated Science",
    "difficulty": 4
  },
  {
    "question": "Why is Venus the hottest planet in our Solar System?",
    "correctAnswer": "Its thick atmosphere traps heat",
    "incorrectAnswers": [
      "It is the largest planet",
      "It spins faster than Earth",
      "It has the most moons"
    ],
    "category": "Curated Science",
    "difficulty": 4
  },
  {
    "question": "Which three ingredients help thunderstorms form?",
    "correctAnswer": "Moisture, unstable air, and lift",
    "incorrectAnswers": [
      "Snow, ice, and darkness",
      "Sand, wind, and rocks",
      "Fog, sunshine, and calm air"
    ],
    "category": "Curated Science",
    "difficulty": 4
  },
  {
    "question": "Why do satellites stay in orbit instead of falling straight to Earth?",
    "correctAnswer": "Their forward motion and Earth's gravity balance together",
    "incorrectAnswers": [
      "They are lighter than air",
      "They are held up by clouds",
      "They have no gravity near them"
    ],
    "category": "Curated Science",
    "difficulty": 5
  },
  {
    "question": "Where is much more freshwater stored than in all rivers and lakes together?",
    "correctAnswer": "Underground in aquifers",
    "incorrectAnswers": [
      "Inside thunderclouds",
      "On the Moon",
      "In volcanoes"
    ],
    "category": "Curated Science",
    "difficulty": 5
  },
  {
    "question": "What causes the Moon's phases?",
    "correctAnswer": "We see different sunlit parts of the Moon as it orbits Earth",
    "incorrectAnswers": [
      "Earth's shadow covers the Moon every night",
      "The Moon changes its shape each week",
      "Clouds hide part of the Moon"
    ],
    "category": "Curated Science",
    "difficulty": 5
  }
];

SCIENCE_QUESTIONS.push(
  ...[
    {
      "question": "What do plants need to make food?",
      "correctAnswer": "Sunlight",
      "incorrectAnswers": [
        "Music",
        "Sand",
        "Snow"
      ],
      "category": "Curated Science",
      "difficulty": 1
    },
    {
      "question": "Which organ pumps blood around the body?",
      "correctAnswer": "Heart",
      "incorrectAnswers": [
        "Lungs",
        "Stomach",
        "Brain"
      ],
      "category": "Curated Science",
      "difficulty": 1
    },
    {
      "question": "What gas do people breathe in to live?",
      "correctAnswer": "Oxygen",
      "incorrectAnswers": [
        "Carbon dioxide",
        "Helium",
        "Nitrogen"
      ],
      "category": "Curated Science",
      "difficulty": 1
    },
    {
      "question": "What do seeds grow into?",
      "correctAnswer": "New plants",
      "incorrectAnswers": [
        "Clouds",
        "Rocks",
        "Shadows"
      ],
      "category": "Curated Science",
      "difficulty": 1
    },
    {
      "question": "Which is a solid?",
      "correctAnswer": "Ice",
      "incorrectAnswers": [
        "Steam",
        "Rain",
        "Fog"
      ],
      "category": "Curated Science",
      "difficulty": 1
    },
    {
      "question": "Which body part helps you hear?",
      "correctAnswer": "Ears",
      "incorrectAnswers": [
        "Knees",
        "Elbows",
        "Toes"
      ],
      "category": "Curated Science",
      "difficulty": 1
    },
    {
      "question": "What do fish use to breathe?",
      "correctAnswer": "Gills",
      "incorrectAnswers": [
        "Feathers",
        "Roots",
        "Shells"
      ],
      "category": "Curated Science",
      "difficulty": 1
    },
    {
      "question": "Which planet do we live on?",
      "correctAnswer": "Earth",
      "incorrectAnswers": [
        "Mars",
        "Venus",
        "Jupiter"
      ],
      "category": "Curated Science",
      "difficulty": 1
    },
    {
      "question": "What tool measures temperature?",
      "correctAnswer": "Thermometer",
      "incorrectAnswers": [
        "Ruler",
        "Compass",
        "Magnifying glass"
      ],
      "category": "Curated Science",
      "difficulty": 1
    },
    {
      "question": "What do bees help flowers do?",
      "correctAnswer": "Pollinate",
      "incorrectAnswers": [
        "Freeze",
        "Turn into rocks",
        "Disappear"
      ],
      "category": "Curated Science",
      "difficulty": 1
    },
    {
      "question": "Which star is closest to Earth?",
      "correctAnswer": "The Sun",
      "incorrectAnswers": [
        "Polaris",
        "Sirius",
        "Betelgeuse"
      ],
      "category": "Curated Science",
      "difficulty": 1
    },
    {
      "question": "What do clouds often hold?",
      "correctAnswer": "Tiny water droplets",
      "incorrectAnswers": [
        "Sand",
        "Balloons",
        "Fire"
      ],
      "category": "Curated Science",
      "difficulty": 1
    },
    {
      "question": "Which animal is a mammal?",
      "correctAnswer": "Dog",
      "incorrectAnswers": [
        "Shark",
        "Frog",
        "Eagle"
      ],
      "category": "Curated Science",
      "difficulty": 1
    },
    {
      "question": "What is a habitat?",
      "correctAnswer": "The place where an animal lives",
      "incorrectAnswers": [
        "The food an animal eats",
        "The sound an animal makes",
        "The color of an animal"
      ],
      "category": "Curated Science",
      "difficulty": 2
    },
    {
      "question": "Which planet is known as the Red Planet?",
      "correctAnswer": "Mars",
      "incorrectAnswers": [
        "Mercury",
        "Saturn",
        "Neptune"
      ],
      "category": "Curated Science",
      "difficulty": 2
    },
    {
      "question": "What does a skeleton do?",
      "correctAnswer": "Supports the body",
      "incorrectAnswers": [
        "Makes food",
        "Pumps blood",
        "Cleans the air"
      ],
      "category": "Curated Science",
      "difficulty": 2
    },
    {
      "question": "What is evaporation?",
      "correctAnswer": "Liquid changing to gas",
      "incorrectAnswers": [
        "Gas changing to solid",
        "Rock changing to liquid",
        "Sound changing to light"
      ],
      "category": "Curated Science",
      "difficulty": 2
    },
    {
      "question": "What force pulls things down?",
      "correctAnswer": "Gravity",
      "incorrectAnswers": [
        "Magnetism",
        "Electricity",
        "Friction"
      ],
      "category": "Curated Science",
      "difficulty": 2
    },
    {
      "question": "What part of a plant takes in water?",
      "correctAnswer": "Roots",
      "incorrectAnswers": [
        "Flowers",
        "Seeds",
        "Leaves"
      ],
      "category": "Curated Science",
      "difficulty": 2
    },
    {
      "question": "What is a germ?",
      "correctAnswer": "A tiny living thing that can make you sick",
      "incorrectAnswers": [
        "A piece of metal",
        "A kind of cloud",
        "A type of plant"
      ],
      "category": "Curated Science",
      "difficulty": 2
    },
    {
      "question": "What does a thermometer measure?",
      "correctAnswer": "Temperature",
      "incorrectAnswers": [
        "Weight",
        "Distance",
        "Speed"
      ],
      "category": "Curated Science",
      "difficulty": 2
    },
    {
      "question": "What is a moon?",
      "correctAnswer": "A natural satellite",
      "incorrectAnswers": [
        "A kind of cloud",
        "A small star",
        "A type of planet ring"
      ],
      "category": "Curated Science",
      "difficulty": 2
    },
    {
      "question": "What is an insect?",
      "correctAnswer": "Ant",
      "incorrectAnswers": [
        "Whale",
        "Snake",
        "Eagle"
      ],
      "category": "Curated Science",
      "difficulty": 2
    },
    {
      "question": "What do roots mainly do for a plant?",
      "correctAnswer": "Absorb water and nutrients",
      "incorrectAnswers": [
        "Make seeds",
        "Produce sunlight",
        "Turn into flowers"
      ],
      "category": "Curated Science",
      "difficulty": 2
    },
    {
      "question": "What is a food chain?",
      "correctAnswer": "Who eats whom in nature",
      "incorrectAnswers": [
        "A line of kitchens",
        "A way to measure rain",
        "A kind of plant root"
      ],
      "category": "Curated Science",
      "difficulty": 2
    },
    {
      "question": "What is a microscope used for?",
      "correctAnswer": "Seeing tiny things",
      "incorrectAnswers": [
        "Measuring time",
        "Cooking food",
        "Finding directions"
      ],
      "category": "Curated Science",
      "difficulty": 2
    }
  ]
);

SCIENCE_QUESTIONS.push(
  ...[
    {
      "question": "What process do plants use to make food?",
      "correctAnswer": "Photosynthesis",
      "incorrectAnswers": [
        "Evaporation",
        "Condensation",
        "Magnetism"
      ],
      "category": "Curated Science",
      "difficulty": 3
    },
    {
      "question": "What are fossils?",
      "correctAnswer": "Preserved remains or traces of living things",
      "incorrectAnswers": [
        "Pieces of candy",
        "Tiny weather machines",
        "Kinds of clouds"
      ],
      "category": "Curated Science",
      "difficulty": 3
    },
    {
      "question": "Why do we have day and night?",
      "correctAnswer": "Earth rotates",
      "incorrectAnswers": [
        "The Moon changes shape",
        "The Sun turns off at night",
        "Clouds cover half the planet"
      ],
      "category": "Curated Science",
      "difficulty": 3
    },
    {
      "question": "Which part of blood carries oxygen?",
      "correctAnswer": "Red blood cells",
      "incorrectAnswers": [
        "Bones",
        "Skin cells",
        "Teeth"
      ],
      "category": "Curated Science",
      "difficulty": 3
    },
    {
      "question": "What is condensation?",
      "correctAnswer": "Gas changing to liquid",
      "incorrectAnswers": [
        "Liquid changing to gas",
        "Solid changing to rock",
        "Heat changing to light"
      ],
      "category": "Curated Science",
      "difficulty": 3
    },
    {
      "question": "What is a variable in an experiment?",
      "correctAnswer": "One thing changed on purpose",
      "incorrectAnswers": [
        "A result that never changes",
        "A kind of tool",
        "A guess with no test"
      ],
      "category": "Curated Science",
      "difficulty": 3
    },
    {
      "question": "What is a vertebrate?",
      "correctAnswer": "An animal with a backbone",
      "incorrectAnswers": [
        "An animal with no eyes",
        "A plant that grows in water",
        "A rock with layers"
      ],
      "category": "Curated Science",
      "difficulty": 3
    },
    {
      "question": "What is the main source of Earth's energy?",
      "correctAnswer": "The Sun",
      "incorrectAnswers": [
        "The Moon",
        "The wind",
        "The oceans"
      ],
      "category": "Curated Science",
      "difficulty": 3
    },
    {
      "question": "What does the small intestine do?",
      "correctAnswer": "Absorbs nutrients",
      "incorrectAnswers": [
        "Pumps blood",
        "Makes bones",
        "Catches sunlight"
      ],
      "category": "Curated Science",
      "difficulty": 3
    },
    {
      "question": "What is an ecosystem?",
      "correctAnswer": "Living things and their environment",
      "incorrectAnswers": [
        "Only the weather",
        "Only one animal",
        "A kind of mineral"
      ],
      "category": "Curated Science",
      "difficulty": 3
    },
    {
      "question": "What is a renewable resource?",
      "correctAnswer": "A resource that can be replaced naturally",
      "incorrectAnswers": [
        "A resource that can never be used",
        "A resource that always disappears",
        "A resource made only of plastic"
      ],
      "category": "Curated Science",
      "difficulty": 3
    },
    {
      "question": "What do magnets attract?",
      "correctAnswer": "Some metals like iron",
      "incorrectAnswers": [
        "Rainbows",
        "Clouds",
        "Leaves"
      ],
      "category": "Curated Science",
      "difficulty": 3
    },
    {
      "question": "What is the atmosphere?",
      "correctAnswer": "The layer of gases around Earth",
      "incorrectAnswers": [
        "The layer of rocks under Earth",
        "The ocean floor",
        "The inside of a volcano"
      ],
      "category": "Curated Science",
      "difficulty": 3
    },
    {
      "question": "Why do seasons happen?",
      "correctAnswer": "Earth is tilted as it orbits the Sun",
      "incorrectAnswers": [
        "The Moon changes shape",
        "The Sun moves closer and farther every week",
        "Clouds block the Sun in winter only"
      ],
      "category": "Curated Science",
      "difficulty": 4
    },
    {
      "question": "Why is Venus so hot?",
      "correctAnswer": "Its thick atmosphere traps heat",
      "incorrectAnswers": [
        "It is the biggest planet",
        "It has the most water",
        "It is closest to the Moon"
      ],
      "category": "Curated Science",
      "difficulty": 4
    },
    {
      "question": "What does the circulatory system do?",
      "correctAnswer": "Moves blood around the body",
      "incorrectAnswers": [
        "Makes leaves grow",
        "Creates sound in the ears",
        "Turns food into sunlight"
      ],
      "category": "Curated Science",
      "difficulty": 4
    },
    {
      "question": "What are producers?",
      "correctAnswer": "Organisms that make their own food",
      "incorrectAnswers": [
        "Animals that only eat meat",
        "Plants that never need sunlight",
        "Rocks that store water"
      ],
      "category": "Curated Science",
      "difficulty": 4
    },
    {
      "question": "Why do we see lightning before thunder?",
      "correctAnswer": "Light travels faster than sound",
      "incorrectAnswers": [
        "Thunder happens only at night",
        "Sound cannot move through air",
        "Lightning is louder than thunder"
      ],
      "category": "Curated Science",
      "difficulty": 4
    },
    {
      "question": "What is an adaptation?",
      "correctAnswer": "A trait that helps survival",
      "incorrectAnswers": [
        "A broken bone",
        "A kind of weather",
        "A computer program"
      ],
      "category": "Curated Science",
      "difficulty": 4
    },
    {
      "question": "What is osmosis?",
      "correctAnswer": "Water moving through a membrane",
      "incorrectAnswers": [
        "Rocks melting in the sun",
        "Sound moving through water",
        "Plants making seeds"
      ],
      "category": "Curated Science",
      "difficulty": 4
    }
  ]
);

SCIENCE_QUESTIONS.push(
  ...[
    {
      "question": "What is a fossil fuel?",
      "correctAnswer": "A fuel made from ancient living things",
      "incorrectAnswers": [
        "A fuel made from rocks",
        "A fuel made from clouds",
        "A fuel made from sunshine"
      ],
      "category": "Curated Science",
      "difficulty": 4
    },
    {
      "question": "Why do satellites stay in orbit?",
      "correctAnswer": "Their forward motion and Earth's gravity balance together",
      "incorrectAnswers": [
        "They are held up by clouds",
        "They have no gravity at all",
        "They are pushed by the Moon"
      ],
      "category": "Curated Science",
      "difficulty": 4
    },
    {
      "question": "What is the nervous system?",
      "correctAnswer": "The body system that sends signals",
      "incorrectAnswers": [
        "The system that makes bones",
        "The system that turns food into blood",
        "The system that stores water in leaves"
      ],
      "category": "Curated Science",
      "difficulty": 4
    },
    {
      "question": "What are prey animals?",
      "correctAnswer": "Animals hunted by other animals",
      "incorrectAnswers": [
        "Animals that make their own food",
        "Animals that never move",
        "Animals that live only in water"
      ],
      "category": "Curated Science",
      "difficulty": 4
    },
    {
      "question": "Why is soil important for plants?",
      "correctAnswer": "It gives support and nutrients",
      "incorrectAnswers": [
        "It makes plants turn into fish",
        "It stops plants from needing water",
        "It turns sunlight into roots"
      ],
      "category": "Curated Science",
      "difficulty": 4
    },
    {
      "question": "What is a control group?",
      "correctAnswer": "A comparison group",
      "incorrectAnswers": [
        "The group that changes every variable",
        "The group that never gets checked",
        "The group that always wins"
      ],
      "category": "Curated Science",
      "difficulty": 4
    },
    {
      "question": "What is the scientific method first step?",
      "correctAnswer": "Ask a question",
      "incorrectAnswers": [
        "Write the conclusion first",
        "Pick the answer without testing",
        "Use random numbers"
      ],
      "category": "Curated Science",
      "difficulty": 5
    },
    {
      "question": "What is a hypothesis?",
      "correctAnswer": "A testable prediction",
      "incorrectAnswers": [
        "A finished fact with no test",
        "A kind of tool",
        "A silly guess with no reason"
      ],
      "category": "Curated Science",
      "difficulty": 5
    },
    {
      "question": "Why are antibiotics not useful for viruses?",
      "correctAnswer": "Viruses are not bacteria",
      "incorrectAnswers": [
        "Viruses are made of metal",
        "Viruses are always too big",
        "Antibiotics only work at night"
      ],
      "category": "Curated Science",
      "difficulty": 5
    },
    {
      "question": "What is plate tectonics?",
      "correctAnswer": "Earth's crust is broken into moving plates",
      "incorrectAnswers": [
        "Earth's oceans freeze and move",
        "The Moon pushes the continents around",
        "Mountains roll like wheels"
      ],
      "category": "Curated Science",
      "difficulty": 5
    },
    {
      "question": "What does the nucleus do in a cell?",
      "correctAnswer": "It holds the cell's genetic instructions",
      "incorrectAnswers": [
        "It makes sunlight",
        "It pumps blood",
        "It turns water into air"
      ],
      "category": "Curated Science",
      "difficulty": 5
    },
    {
      "question": "What is the main job of alveoli?",
      "correctAnswer": "Exchanging gases with the blood",
      "incorrectAnswers": [
        "Making bones grow",
        "Turning food into teeth",
        "Storing sunlight"
      ],
      "category": "Curated Science",
      "difficulty": 5
    },
    {
      "question": "What does the excretory system remove?",
      "correctAnswer": "Wastes from the body",
      "incorrectAnswers": [
        "Only oxygen",
        "Only bones",
        "Only sunlight"
      ],
      "category": "Curated Science",
      "difficulty": 5
    },
    {
      "question": "Why do some clouds look dark?",
      "correctAnswer": "They hold more water and are thicker",
      "incorrectAnswers": [
        "They are made of rocks",
        "They are farther from the Sun",
        "They are covered by paint"
      ],
      "category": "Curated Science",
      "difficulty": 5
    },
    {
      "question": "What is a black hole?",
      "correctAnswer": "A region with gravity so strong light cannot escape",
      "incorrectAnswers": [
        "A hole in the ground that never fills",
        "A planet with no air",
        "A star made of ice"
      ],
      "category": "Curated Science",
      "difficulty": 5
    },
    {
      "question": "What is the difference between mass and weight?",
      "correctAnswer": "Mass is amount of matter; weight is gravity's pull",
      "incorrectAnswers": [
        "Mass is speed; weight is color",
        "Mass is sound; weight is light",
        "Mass is distance; weight is temperature"
      ],
      "category": "Curated Science",
      "difficulty": 5
    },
    {
      "question": "What is photosynthesis's main product besides oxygen?",
      "correctAnswer": "Sugar",
      "incorrectAnswers": [
        "Salt",
        "Metal",
        "Smoke"
      ],
      "category": "Curated Science",
      "difficulty": 5
    },
    {
      "question": "Why is repeating an experiment useful?",
      "correctAnswer": "It shows whether results are consistent",
      "incorrectAnswers": [
        "It changes the answer automatically",
        "It makes the question disappear",
        "It proves the first guess was perfect"
      ],
      "category": "Curated Science",
      "difficulty": 5
    },
    {
      "question": "What is a food web?",
      "correctAnswer": "Many connected food chains",
      "incorrectAnswers": [
        "A list of cooking recipes",
        "A type of plant root",
        "A machine that makes rain"
      ],
      "category": "Curated Science",
      "difficulty": 5
    },
    {
      "question": "What is the best way to test one factor at a time?",
      "correctAnswer": "Change only one variable",
      "incorrectAnswers": [
        "Change everything at once",
        "Never measure anything",
        "Guess the answer first"
      ],
      "category": "Curated Science",
      "difficulty": 5
    }
  ]
);

SCIENCE_QUESTIONS.push(
  ...[
    {
      "question": "Which part of a plant makes seeds?",
      "correctAnswer": "The flower",
      "incorrectAnswers": [
        "The root",
        "The stem",
        "The soil"
      ],
      "category": "Curated Science",
      "difficulty": 1
    }
  ]
);

const SCIENCE_PLANETS = [
  {
    question: "Which planet is known as the Red Planet?",
    answer: "Mars",
    options: ["Mars", "Venus", "Jupiter", "Mercury"],
    difficulty: 1,
  },
  {
    question: "Which planet is the largest in our Solar System?",
    answer: "Jupiter",
    options: ["Saturn", "Earth", "Jupiter", "Mars"],
    difficulty: 1,
  },
  {
    question: "Which planet is closest to the Sun?",
    answer: "Mercury",
    options: ["Earth", "Mercury", "Venus", "Mars"],
    difficulty: 2,
  },
  {
    question: "Which planet has rings?",
    answer: "Saturn",
    options: ["Mars", "Saturn", "Venus", "Neptune"],
    difficulty: 2,
  },
];

const SCIENCE_BODY = [
  {
    question: "Which organ pumps blood around the body?",
    answer: "Heart",
    options: ["Lungs", "Heart", "Brain", "Stomach"],
    difficulty: 1,
  },
  {
    question: "Which organ helps you breathe?",
    answer: "Lungs",
    options: ["Lungs", "Kidneys", "Bones", "Teeth"],
    difficulty: 1,
  },
  {
    question: "Which body part helps protect the brain?",
    answer: "Skull",
    options: ["Skull", "Skin", "Tongue", "Nails"],
    difficulty: 2,
  },
  {
    question: "What is the job of the skeleton?",
    answer: "It supports the body",
    options: [
      "It makes sunlight",
      "It supports the body",
      "It digests food",
      "It turns blood blue",
    ],
    difficulty: 2,
  },
];

const SCIENCE_PLANTS = [
  {
    question: "What do roots mainly do?",
    answer: "Take in water and hold the plant in place",
    options: [
      "Take in water and hold the plant in place",
      "Make the leaves fall off",
      "Turn into flowers",
      "Make rocks grow",
    ],
    difficulty: 1,
  },
  {
    question: "What do leaves mainly do?",
    answer: "Make food for the plant",
    options: [
      "Make food for the plant",
      "Pump blood",
      "Hold the soil together",
      "Make bones",
    ],
    difficulty: 1,
  },
  {
    question: "What carries water up through a plant?",
    answer: "The stem",
    options: ["The stem", "The flower", "The seeds", "The fruit"],
    difficulty: 2,
  },
  {
    question: "What helps most leaves look green?",
    answer: "Chlorophyll",
    options: ["Chlorophyll", "Salt", "Stone", "Steam"],
    difficulty: 2,
  },
];

const SCIENCE_CLASSIFICATION = [
  {
    question: "Which animal is a mammal?",
    answer: "Whale",
    options: ["Whale", "Shark", "Eagle", "Frog"],
    difficulty: 3,
  },
  {
    question: "Which animal is a bird?",
    answer: "Robin",
    options: ["Robin", "Salmon", "Spider", "Frog"],
    difficulty: 3,
  },
  {
    question: "Which of these is a non-living thing?",
    answer: "Rock",
    options: ["Rock", "Tree", "Dog", "Flower"],
    difficulty: 4,
  },
  {
    question: "Which one is a type of plant?",
    answer: "Fern",
    options: ["Fern", "Whale", "Snake", "Ant"],
    difficulty: 4,
  },
];

const SCIENCE_FUNCTIONS = [
  {
    question: "What is the main job of lungs?",
    answer: "To help you breathe",
    options: ["To help you breathe", "To make bones", "To pump blood", "To make teeth"],
    difficulty: 3,
  },
  {
    question: "What is the main job of the brain?",
    answer: "To control the body",
    options: ["To control the body", "To make leaves green", "To hold water", "To grow hair"],
    difficulty: 3,
  },
  {
    question: "What is the main job of roots?",
    answer: "To take in water and anchor the plant",
    options: [
      "To take in water and anchor the plant",
      "To make blood",
      "To turn into seeds",
      "To make clouds",
    ],
    difficulty: 4,
  },
  {
    question: "What is the main job of the flower on many plants?",
    answer: "To help make seeds",
    options: ["To help make seeds", "To pump blood", "To dig tunnels", "To cool the air"],
    difficulty: 5,
  },
];

function createScienceGeneratedEntry(difficulty) {
  const level = scienceClampDifficulty(difficulty);
  const generators = {
    1: [sciencePickFromCollection(SCIENCE_PLANETS), sciencePickFromCollection(SCIENCE_BODY), sciencePickFromCollection(SCIENCE_PLANTS)],
    2: [sciencePickFromCollection(SCIENCE_PLANETS), sciencePickFromCollection(SCIENCE_BODY), sciencePickFromCollection(SCIENCE_PLANTS)],
    3: [sciencePickFromCollection(SCIENCE_CLASSIFICATION), sciencePickFromCollection(SCIENCE_FUNCTIONS), sciencePickFromCollection(SCIENCE_PLANTS)],
    4: [sciencePickFromCollection(SCIENCE_CLASSIFICATION), sciencePickFromCollection(SCIENCE_FUNCTIONS), sciencePickFromCollection(SCIENCE_PLANETS)],
    5: [sciencePickFromCollection(SCIENCE_FUNCTIONS), sciencePickFromCollection(SCIENCE_CLASSIFICATION), sciencePickFromCollection(SCIENCE_BODY)],
  };

  return {
    ...scienceRandomChoice(generators[level])(),
    difficulty: level,
  };
}

function sciencePickFromCollection(collection) {
  return () => {
    const pool = collection.filter((entry) => entry.difficulty <= 5);
    const entry = scienceRandomChoice(pool);
    return {
      question: entry.question,
      options: scienceShuffle(entry.options),
      answer: entry.answer,
      difficulty: entry.difficulty,
    };
  };
}

function scienceClampDifficulty(value) {
  const difficulty = Number(value);
  if (!Number.isInteger(difficulty) || difficulty < 1) {
    return 1;
  }

  return Math.min(5, difficulty);
}

function scienceRandomChoice(values) {
  if (typeof randomChoice === "function") {
    return randomChoice(values);
  }

  return values[Math.floor(Math.random() * values.length)];
}

function scienceShuffle(values) {
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

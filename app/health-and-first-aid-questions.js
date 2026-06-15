const HEALTH_AND_FIRST_AID_QUESTIONS = [
  {
    question: "What helps protect your head when riding a bike or scooter?",
    options: ["A scarf", "A helmet", "A backpack", "A baseball cap"],
    answer: "A helmet",
    difficulty: 1,
  },
  {
    question: "For a small burn, what should you do first?",
    options: [
      "Put it under cool running water",
      "Rub ice on it hard",
      "Cover it with candy",
      "Ignore it right away",
    ],
    answer: "Put it under cool running water",
    difficulty: 1,
  },
  {
    question: "For a serious medical emergency in Israel, tell a trusted adult if possible and call which ambulance number?",
    options: ["100", "101", "102", "106"],
    answer: "101",
    difficulty: 2,
  },
  {
    question: "If someone has a nosebleed, what is the best body position?",
    options: [
      "Lie flat on the floor",
      "Lean the head far back",
      "Sit up and lean slightly forward",
      "Jump up and down",
    ],
    answer: "Sit up and lean slightly forward",
    difficulty: 2,
  },
  {
    question: "Which can be a sign that you need water after hard play?",
    options: ["Dry mouth and thirst", "Brighter shoes", "Longer hair", "Cold elbows"],
    answer: "Dry mouth and thirst",
    difficulty: 3,
  },
  {
    question: "What is the safest way for a child to take medicine?",
    options: [
      "Only with a trusted adult and the correct dose",
      "Any time it looks like candy",
      "Whenever a friend suggests it",
      "Double the dose to get better faster",
    ],
    answer: "Only with a trusted adult and the correct dose",
    difficulty: 3,
  },
  {
    question: "After a small cut is cleaned, what should usually go on it next?",
    options: ["A clean bandage", "A handful of dirt", "A thick sweater", "A marker drawing"],
    answer: "A clean bandage",
    difficulty: 4,
  },
  {
    question: "If someone may have swallowed poison in Israel and they are awake with no serious symptoms, who should you call right away?",
    options: [
      "Israel Poison Information Center: 04-777-1900",
      "The pizza shop",
      "The school bus office",
      "The library desk",
    ],
    answer: "Israel Poison Information Center: 04-777-1900",
    difficulty: 4,
  },
  {
    question: "What is one of the best ways to help stop the spread of germs?",
    options: [
      "Wash hands with soap and water",
      "Touch your face often",
      "Share water bottles",
      "Skip covering coughs and sneezes",
    ],
    answer: "Wash hands with soap and water",
    difficulty: 5,
  },
  {
    question: "You hear thunder while playing outside. Where is the safest place to go?",
    options: [
      "Under a tall tree",
      "Into an open field",
      "Inside a building or hard-topped car",
      "Into a puddle",
    ],
    answer: "Inside a building or hard-topped car",
    difficulty: 5,
  },
  {
    question: "If someone has a small scrape, what is a good first step?",
    options: [
      "Rinse it gently with clean water",
      "Rub dirt into it",
      "Cover it with glue",
      "Ignore it if it is bleeding",
    ],
    answer: "Rinse it gently with clean water",
    difficulty: 1,
  },
  {
    question: "How long should handwashing with soap usually take?",
    options: ["About 5 seconds", "About 10 seconds", "About 20 seconds", "About 2 minutes"],
    answer: "About 20 seconds",
    difficulty: 1,
  },
  {
    question: "If you feel dizzy during play, what should you do first?",
    options: [
      "Keep running",
      "Stop and sit down",
      "Drink soda fast",
      "Hide it from adults",
    ],
    answer: "Stop and sit down",
    difficulty: 2,
  },
  {
    question: "What should you do if you take medicine?",
    options: [
      "Only take it with a trusted adult and the correct dose",
      "Take more if you want to heal faster",
      "Share it with a friend",
      "Take it whenever you feel like it",
    ],
    answer: "Only take it with a trusted adult and the correct dose",
    difficulty: 2,
  },
  {
    question: "Which can help stop germs from spreading when you cough?",
    options: [
      "Cover your mouth and nose",
      "Cough into your hands and share them",
      "Skip washing hands",
      "Breathe directly at people",
    ],
    answer: "Cover your mouth and nose",
    difficulty: 3,
  },
  {
    question: "If a bandage gets dirty, what should you do?",
    options: [
      "Leave it on for a week",
      "Change it for a clean one",
      "Put mud on top",
      "Cut the cut open again",
    ],
    answer: "Change it for a clean one",
    difficulty: 3,
  },
  {
    question: "If someone has a serious allergic reaction and trouble breathing in Israel, what should you do?",
    options: [
      "Wait until tomorrow",
      "Call 101 right away",
      "Give them candy",
      "Tell them to lie down and sleep",
    ],
    answer: "Call 101 right away",
    difficulty: 4,
  },
  {
    question: "What should you do if a cut keeps bleeding a lot?",
    options: [
      "Tell a trusted adult and get help",
      "Put dirt on it",
      "Keep playing",
      "Wash it once and ignore it",
    ],
    answer: "Tell a trusted adult and get help",
    difficulty: 4,
  },
  {
    question: "If someone may be poisoned in Israel but is awake and breathing normally, what is the correct action?",
    options: [
      "Call the Israel Poison Information Center at 04-777-1900",
      "Call the toy store",
      "Wait an hour first",
      "Give them milk and leave them alone",
    ],
    answer: "Call the Israel Poison Information Center at 04-777-1900",
    difficulty: 5,
  },
  {
    question: "What is the best place to put sunscreen?",
    options: [
      "Only on your hands",
      "On all exposed skin",
      "Only on your shoes",
      "Only on your hat",
    ],
    answer: "On all exposed skin",
    difficulty: 5,
  },
];

function createHealthAndFirstAidGeneratedEntry(difficulty) {
  const level = healthClampDifficulty(difficulty);
  const generatorsByLevel = {
    1: [
      healthCreateSmallScrapeQuestion,
      healthCreateHandwashingQuestion,
      healthCreateHelmetQuestion,
    ],
    2: [
      healthCreateNosebleedQuestion,
      healthCreateDizzyQuestion,
      healthCreateBurnQuestion,
    ],
    3: [
      healthCreateCoughQuestion,
      healthCreateMedicineQuestion,
      healthCreateBandageQuestion,
    ],
    4: [
      healthCreatePoisonQuestion,
      healthCreateBleedingQuestion,
      healthCreateThunderQuestion,
    ],
    5: [
      healthCreateAllergyQuestion,
      healthCreateSmokeQuestion,
      healthCreatePoisonQuestion,
    ],
  };

  return {
    ...healthPick(generatorsByLevel[level])(),
    difficulty: level,
  };
}

function healthCreateSmallScrapeQuestion() {
  return {
    question: "If someone has a small scrape, what is a good first step?",
    options: [
      "Rinse it gently with clean water",
      "Rub dirt into it",
      "Cover it with glue",
      "Ignore it if it is bleeding",
    ],
    answer: "Rinse it gently with clean water",
    difficulty: 1,
  };
}

function healthCreateHandwashingQuestion() {
  return {
    question: "How long should handwashing with soap usually take?",
    options: ["About 5 seconds", "About 10 seconds", "About 20 seconds", "About 2 minutes"],
    answer: "About 20 seconds",
    difficulty: 1,
  };
}

function healthCreateHelmetQuestion() {
  return {
    question: "What helps protect your head when riding a bike or scooter?",
    options: ["A scarf", "A helmet", "A backpack", "A baseball cap"],
    answer: "A helmet",
    difficulty: 1,
  };
}

function healthCreateNosebleedQuestion() {
  return {
    question: "If someone has a nosebleed, what is the best body position?",
    options: [
      "Lie flat on the floor",
      "Lean the head far back",
      "Sit up and lean slightly forward",
      "Jump up and down",
    ],
    answer: "Sit up and lean slightly forward",
    difficulty: 2,
  };
}

function healthCreateDizzyQuestion() {
  return {
    question: "If you feel dizzy during play, what should you do first?",
    options: ["Keep running", "Stop and sit down", "Drink soda fast", "Hide it from adults"],
    answer: "Stop and sit down",
    difficulty: 2,
  };
}

function healthCreateBurnQuestion() {
  return {
    question: "For a small burn, what should you do first?",
    options: [
      "Put it under cool running water",
      "Rub ice on it hard",
      "Cover it with candy",
      "Ignore it right away",
    ],
    answer: "Put it under cool running water",
    difficulty: 2,
  };
}

function healthCreateCoughQuestion() {
  return {
    question: "Which can help stop germs from spreading when you cough?",
    options: ["Cover your mouth and nose", "Cough into your hands and share them", "Skip washing hands", "Breathe directly at people"],
    answer: "Cover your mouth and nose",
    difficulty: 3,
  };
}

function healthCreateMedicineQuestion() {
  return {
    question: "What is the safest way for a child to take medicine?",
    options: [
      "Only with a trusted adult and the correct dose",
      "Any time it looks like candy",
      "Whenever a friend suggests it",
      "Double the dose to get better faster",
    ],
    answer: "Only with a trusted adult and the correct dose",
    difficulty: 3,
  };
}

function healthCreateBandageQuestion() {
  return {
    question: "After a small cut is cleaned, what should usually go on it next?",
    options: ["A clean bandage", "A handful of dirt", "A thick sweater", "A marker drawing"],
    answer: "A clean bandage",
    difficulty: 3,
  };
}

function healthCreatePoisonQuestion() {
  return {
    question: "If someone may have swallowed poison in Israel and they are awake with no serious symptoms, who should you call right away?",
    options: [
      "Israel Poison Information Center: 04-777-1900",
      "The pizza shop",
      "The school bus office",
      "The library desk",
    ],
    answer: "Israel Poison Information Center: 04-777-1900",
    difficulty: 4,
  };
}

function healthCreateBleedingQuestion() {
  return {
    question: "What should you do if a cut keeps bleeding a lot?",
    options: [
      "Tell a trusted adult and get help",
      "Put dirt on it",
      "Keep playing",
      "Wash it once and ignore it",
    ],
    answer: "Tell a trusted adult and get help",
    difficulty: 4,
  };
}

function healthCreateThunderQuestion() {
  return {
    question: "You hear thunder while playing outside. Where is the safest place to go?",
    options: [
      "Under a tall tree",
      "Into an open field",
      "Inside a building or hard-topped car",
      "Into a puddle",
    ],
    answer: "Inside a building or hard-topped car",
    difficulty: 4,
  };
}

function healthCreateAllergyQuestion() {
  return {
    question: "If someone has a serious allergic reaction and trouble breathing in Israel, what should you do?",
    options: ["Wait until tomorrow", "Call 101 right away", "Give them candy", "Tell them to lie down and sleep"],
    answer: "Call 101 right away",
    difficulty: 5,
  };
}

function healthCreateSmokeQuestion() {
  return {
    question: "What should you do if a smoke alarm goes off and there is smoke?",
    options: ["Get an adult and leave the area", "Sit and watch", "Cover your ears and stay there", "Open a toy box"],
    answer: "Get an adult and leave the area",
    difficulty: 5,
  };
}

function healthClampDifficulty(difficulty) {
  const value = Number(difficulty);
  if (!Number.isInteger(value) || value < 1) {
    return 1;
  }
  return Math.min(5, value);
}

function healthPick(values) {
  if (typeof randomChoice === "function") {
    return randomChoice(values);
  }
  return values[Math.floor(Math.random() * values.length)];
}

(() => {
  const questionUtils = globalThis.HomeworkQuestionUtils;
  if (!questionUtils) {
    return;
  }
  const { entry, pickGeneratedEntry, randomChoice } = questionUtils;

  const emergencyDecisionBlueprints = [
    { topic: "health-emergency-decisions", difficulty: 1, question: "What should you do first for a small scrape?", answer: "Tell an adult and wash it gently", options: ["Tell an adult and wash it gently", "Hide it", "Rub dirt on it", "Keep playing without looking"] },
    { topic: "health-emergency-decisions", difficulty: 4, question: "You smell smoke in the kitchen. What should you do first?", answer: "Tell an adult and move away from danger", options: ["Tell an adult and move away from danger", "Hide in a closet", "Touch the stove", "Open every container"] },
    { topic: "health-emergency-decisions", difficulty: 6, question: "Someone is unconscious and not responding. What should you do first?", answer: "Call emergency help or tell an adult to call now", options: ["Call emergency help or tell an adult to call now", "Give them food", "Wait an hour", "Move them far away for no reason"] },
    { topic: "health-emergency-decisions", difficulty: 9, question: "Which emergency choice is best during a kitchen grease fire?", answer: "Turn off heat if safe and get adult/emergency help", options: ["Turn off heat if safe and get adult/emergency help", "Pour water on the grease", "Carry the pan outside", "Fan the flames"] },
    { topic: "health-emergency-decisions", difficulty: 10, question: "What is the best reason to follow an emergency decision tree?", answer: "It helps choose safe steps in the right order", options: ["It helps choose safe steps in the right order", "It makes every emergency harmless", "It replaces calling for help", "It makes facts unnecessary"] },
  ];

  function createEmergencyDecisionEntry(difficulty) {
    const level = Math.max(1, Math.min(10, Number.parseInt(difficulty, 10) || 3));
    return entry(randomChoice(emergencyDecisionBlueprints.filter((item) => item.difficulty <= level)));
  }

  globalThis.createHealthAndFirstAidPracticalGeneratedEntry = (difficulty) =>
    pickGeneratedEntry([createEmergencyDecisionEntry], difficulty);
})();

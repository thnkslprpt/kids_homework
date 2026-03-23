const RATIONALITY_QUESTIONS = [
  {
    question: "A bag has 9 red marbles and 1 blue marble. Which color are you more likely to pick?",
    options: ["Red", "Blue", "They are equally likely", "You cannot tell"],
    answer: "Red",
    difficulty: 1,
  },
  {
    question: "Gideon checked 3 thermometers. Two showed 22 degrees and one showed 31 degrees. What is the best guess for the temperature?",
    options: ["22 degrees", "31 degrees", "10 degrees", "50 degrees"],
    answer: "22 degrees",
    difficulty: 1,
  },
  {
    question: "If you want to test whether more sunlight helps a plant grow, what should you change?",
    options: ["Only the amount of sunlight", "The plant type and the water", "The pot and the soil and the water", "Everything at once"],
    answer: "Only the amount of sunlight",
    difficulty: 1,
  },
  {
    question: "Eight out of ten children in one class like apples. What can you safely say?",
    options: ["Every child in the world likes apples", "Most children in that class like apples", "No children dislike apples", "Apples are the best fruit"],
    answer: "Most children in that class like apples",
    difficulty: 1,
  },
  {
    question: "Noga took one route to school on Monday and a different route on Tuesday. What is a smart next step before deciding which route is faster?",
    options: ["Decide after those two days only", "Time both routes on more days", "Ask one friend to guess", "Pick the route with more trees"],
    answer: "Time both routes on more days",
    difficulty: 1,
  },
  {
    question: "You want to know whether a new soap cleans better. Which is the fairest test?",
    options: ["Use different amounts of soap", "Use the same amount of dirt and the same scrubbing time", "Use hot water once and cold water once", "Change the soap and the cloth"],
    answer: "Use the same amount of dirt and the same scrubbing time",
    difficulty: 2,
  },
  {
    question: "A coin landed heads 4 times in a row. What is most reasonable about the next flip?",
    options: ["It must be tails", "It must be heads", "It could still be heads or tails", "The coin stopped working"],
    answer: "It could still be heads or tails",
    difficulty: 2,
  },
  {
    question: "A jar has many green beads and only a few yellow beads. Which is more likely on one pick?",
    options: ["Green", "Yellow", "They are equally likely", "You can only pick yellow"],
    answer: "Green",
    difficulty: 2,
  },
  {
    question: "Noga says, \"I studied and got 100, so studying always gives 100.\" What is the best response?",
    options: ["One example is not enough to prove always", "Noga is always right", "Studying never helps", "Tests are all the same"],
    answer: "One example is not enough to prove always",
    difficulty: 2,
  },
  {
    question: "Two teams played one game and Team A won. What is the safest conclusion?",
    options: ["Team A will win every time", "Team A won that game", "Team B is the better team", "The game was unfair"],
    answer: "Team A won that game",
    difficulty: 2,
  },
  {
    question: "Which question can be answered best by measuring instead of guessing?",
    options: ["Which story is funniest?", "Which pumpkin is heavier?", "Which color is prettiest?", "Which song is best?"],
    answer: "Which pumpkin is heavier?",
    difficulty: 3,
  },
  {
    question: "Which is better evidence that a movie is popular?",
    options: ["Two friends liked it", "One person watched it twice", "Two thousand people rated it highly", "The poster looks nice"],
    answer: "Two thousand people rated it highly",
    difficulty: 3,
  },
  {
    question: "To test whether a paper airplane flies farther from a taller launch point, what should stay the same?",
    options: ["Only the launch height should change", "The plane shape should change too", "The thrower should switch arms", "The weather should change"],
    answer: "Only the launch height should change",
    difficulty: 3,
  },
  {
    question: "If 20 students voted and 11 chose soccer, what is true?",
    options: ["Exactly half chose soccer", "More than half chose soccer", "Less than half chose soccer", "All students chose soccer"],
    answer: "More than half chose soccer",
    difficulty: 3,
  },
  {
    question: "A bag feels heavy. Which is the best way to know its mass more accurately?",
    options: ["Guess", "Ask a friend to hold it", "Use a scale", "Look at its color"],
    answer: "Use a scale",
    difficulty: 3,
  },
  {
    question: "Which sample is more reliable for learning the favorite lunch in a school of 500 students?",
    options: ["Ask 2 friends in one class", "Ask 50 students from different grades", "Ask one teacher", "Read one lunch tray"],
    answer: "Ask 50 students from different grades",
    difficulty: 4,
  },
  {
    question: "Gabriel wore a lucky shirt and won two games. What is the most reasonable idea?",
    options: ["The shirt definitely caused the wins", "The shirt may not be the reason", "Lucky shirts always work", "The games do not count"],
    answer: "The shirt may not be the reason",
    difficulty: 4,
  },
  {
    question: "Screen time went up and sleep went down during one week. What can you say safely?",
    options: ["Screen time is the only cause", "They changed together, but one may not be the only cause", "Sleep caused screen time", "The data proves nothing happened"],
    answer: "They changed together, but one may not be the only cause",
    difficulty: 4,
  },
  {
    question: "To decide which battery lasts longer, what is the fairest test?",
    options: ["Use different toys", "Use the same toy in the same way and time both batteries", "Choose the battery with the brighter label", "Ask which battery sounds stronger"],
    answer: "Use the same toy in the same way and time both batteries",
    difficulty: 4,
  },
  {
    question: "A medicine helped one person feel better. What is the best next step before saying it works for everyone?",
    options: ["Tell everyone it always works", "Test it carefully with many people", "Stop collecting information", "Use only one more person"],
    answer: "Test it carefully with many people",
    difficulty: 4,
  },
  {
    question: "Three kids say a park is \"always empty,\" but you visit once and it is full. What does that show?",
    options: ["The word \"always\" was too strong", "The park is always full", "The kids were lying every time", "A park can only be full once"],
    answer: "The word \"always\" was too strong",
    difficulty: 5,
  },
  {
    question: "Which result is the strongest evidence that a bag has mostly blue cubes?",
    options: ["One blue cube was drawn once", "Blue cubes appeared most often in many test draws", "A friend said the bag looks blue", "The bag is heavy"],
    answer: "Blue cubes appeared most often in many test draws",
    difficulty: 5,
  },
  {
    question: "A website says, \"This miracle study trick doubles every score.\" What should you look for next?",
    options: ["The brightest colors on the page", "Careful test results from many students", "A bigger title", "One exciting story"],
    answer: "Careful test results from many students",
    difficulty: 5,
  },
  {
    question: "Which claim is easiest to test fairly?",
    options: [
      "Some songs are cool",
      "Plants grow faster with more sunlight when water and soil stay the same",
      "Pizza is the best food",
      "Blue is a lucky color",
    ],
    answer: "Plants grow faster with more sunlight when water and soil stay the same",
    difficulty: 5,
  },
  {
    question: "Which is a better estimate of tomorrow's temperature?",
    options: ["One guess from memory", "A careful weather forecast", "A random number", "How warm it felt last month"],
    answer: "A careful weather forecast",
    difficulty: 5,
  },
  {
    question: "A bag has 8 blue marbles and 8 red marbles. Which color is more likely on one pick?",
    options: ["Blue", "Red", "They are equally likely", "You cannot know at all"],
    answer: "They are equally likely",
    difficulty: 1,
  },
  {
    question: "Which tool is best for finding which pencil is longer?",
    options: ["A ruler", "A stopwatch", "A thermometer", "A magnet"],
    answer: "A ruler",
    difficulty: 1,
  },
  {
    question: "You want to know whether a magnet works better from 2 centimeters away or 10 centimeters away. What should you change?",
    options: ["Only the distance", "The distance and the magnet", "The magnet and the paper clips", "Everything at once"],
    answer: "Only the distance",
    difficulty: 2,
  },
  {
    question: "One restaurant was busy on Friday night. What can you safely say?",
    options: ["It is always busy", "It was busy that night", "It is the best restaurant", "It will be busy every night"],
    answer: "It was busy that night",
    difficulty: 2,
  },
  {
    question: "If you want to know whether seeds grow better in sun or shade, what should stay the same?",
    options: ["Seed type, water, and soil", "Only the pot color", "Only the day of the week", "Nothing has to stay the same"],
    answer: "Seed type, water, and soil",
    difficulty: 3,
  },
  {
    question: "Which is stronger evidence that a claim is true?",
    options: ["One exciting story", "A lucky guess", "Results from many fair tests", "A colorful poster"],
    answer: "Results from many fair tests",
    difficulty: 3,
  },
  {
    question: "You want to know whether a bigger parachute falls slower. What should stay the same?",
    options: ["The object hanging below it", "The parachute size and the object", "The height and the wind and the object should all change", "Only the color of the parachute"],
    answer: "The object hanging below it",
    difficulty: 4,
  },
  {
    question: "Which sample is better for learning the favorite recess game in a whole school?",
    options: ["One class only", "Students from many classes", "Only the oldest students", "Only one friend"],
    answer: "Students from many classes",
    difficulty: 4,
  },
  {
    question: "A website says a trick \"always works,\" but you find one clear example where it does not. What do you know?",
    options: ["The word \"always\" cannot be right", "The trick worked anyway", "Examples do not matter", "The website must be perfect"],
    answer: "The word \"always\" cannot be right",
    difficulty: 5,
  },
  {
    question: "Two thermometers show different temperatures. What is the smartest next step?",
    options: ["Choose the bigger number because it looks stronger", "Check again with another thermometer", "Average them without thinking", "Ignore both of them"],
    answer: "Check again with another thermometer",
    difficulty: 5,
  },
];

RATIONALITY_QUESTIONS.push(
  ...[
    {
      question: "Which is the best way to find which backpack is heavier?",
      options: ["Use a scale", "Use a ruler", "Use a thermometer", "Use a clock"],
      answer: "Use a scale",
      difficulty: 1,
    },
    {
      question: "If you want to know whether a toy car rolls farther on carpet or tile, what should change?",
      options: ["The floor surface", "The color of the car", "The room lights", "The person watching"],
      answer: "The floor surface",
      difficulty: 1,
    },
    {
      question: "If a friend makes a claim, what is the best next step?",
      options: ["Ask for evidence", "Guess quickly", "Ignore the claim", "Say the opposite"],
      answer: "Ask for evidence",
      difficulty: 1,
    },
    {
      question: "If 4 of 5 tests match, what does that usually suggest?",
      options: ["The result may be reliable", "The result is impossible", "The result must be false", "The tests do not matter"],
      answer: "The result may be reliable",
      difficulty: 1,
    },
    {
      question: "Which is the best way to compare how long two routes take?",
      options: ["Time both routes", "Pick the prettier road", "Ask one person to guess", "Choose the shorter name"],
      answer: "Time both routes",
      difficulty: 1,
    },
    {
      question: "If a claim is based on one example, what should you remember?",
      options: ["One example may not prove it", "It must be true", "It is always false", "The example does not count"],
      answer: "One example may not prove it",
      difficulty: 1,
    },
    {
      question: "Which is the fairest way to compare two pencils?",
      options: ["Measure both with the same ruler", "Hold one closer to your eyes", "Pick the brighter one", "Guess by color"],
      answer: "Measure both with the same ruler",
      difficulty: 1,
    },
    {
      question: "A coin lands heads 3 times in a row. What is the best prediction for the next flip?",
      options: ["It is still about equally likely", "It must be tails", "It must be heads", "It will not matter"],
      answer: "It is still about equally likely",
      difficulty: 2,
    },
    {
      question: "If you want to know whether plants need more water, what should stay the same?",
      options: ["Plant type, sunlight, and soil", "Only the pot color", "Only the day of the week", "Nothing has to stay the same"],
      answer: "Plant type, sunlight, and soil",
      difficulty: 2,
    },
    {
      question: "Which is better evidence that a game is fun?",
      options: ["Many students choose it in a survey", "One friend says so", "A poster with bright colors", "A lucky guess"],
      answer: "Many students choose it in a survey",
      difficulty: 2,
    },
    {
      question: "If a website says \"always\" and you find one exception, what does that show?",
      options: ["The claim is not always true", "The claim is perfect", "The exception does not count", "The website must be right"],
      answer: "The claim is not always true",
      difficulty: 2,
    },
    {
      question: "Which sample is fairer?",
      options: ["5 friends", "50 students from different classes", "Only your brother", "Only the quietest kid"],
      answer: "50 students from different classes",
      difficulty: 2,
    },
    {
      question: "If one thermometer seems wrong, what should you do next?",
      options: ["Check with another thermometer", "Throw away all the data", "Change the weather", "Pick the biggest number"],
      answer: "Check with another thermometer",
      difficulty: 2,
    },
    {
      question: "If two things happen together, does that prove one caused the other?",
      options: ["No", "Yes", "Only on Mondays", "Only if they are loud"],
      answer: "No",
      difficulty: 2,
    },
    {
      question: "Which is the fairest test for two paper airplanes?",
      options: ["Same launch force and same height", "Different heights and different people", "Different paper and different wind", "Same color and different desks"],
      answer: "Same launch force and same height",
      difficulty: 3,
    },
    {
      question: "If you want to know whether more sunlight helps beans grow, what should change?",
      options: ["Only the amount of sunlight", "The plant type and the soil", "The pot, water, and seed all at once", "Everything at once"],
      answer: "Only the amount of sunlight",
      difficulty: 3,
    },
    {
      question: "Which is stronger evidence than one story?",
      options: ["Repeated results from many fair tests", "One exciting example", "A colorful picture", "A loud opinion"],
      answer: "Repeated results from many fair tests",
      difficulty: 3,
    },
    {
      question: "If a survey only asks the loudest kids, what is the problem?",
      options: ["Biased sample", "Perfect sample", "Random sample", "Large sample"],
      answer: "Biased sample",
      difficulty: 3,
    },
    {
      question: "Which is better for learning the favorite recess game in a school?",
      options: ["Ask students from many grades", "Ask one friend", "Ask only the oldest student", "Ask only the first person you see"],
      answer: "Ask students from many grades",
      difficulty: 3,
    },
    {
      question: "If a prediction is wrong one time, what should you do?",
      options: ["Check and test again", "Stop thinking", "Say it is always wrong", "Pick a new guess without checking"],
      answer: "Check and test again",
      difficulty: 3,
    },
    {
      question: "What does a control group do?",
      options: ["Gives a comparison", "Changes everything", "Makes the answer automatic", "Stops the experiment forever"],
      answer: "Gives a comparison",
      difficulty: 3,
    },
    {
      question: "If a study says a snack is popular but only tested one class, what is the main problem?",
      options: ["Sample too small", "Too many classes", "The snack is too tasty", "The study was too colorful"],
      answer: "Sample too small",
      difficulty: 4,
    },
    {
      question: "To find whether a bigger parachute falls slower, what should stay the same?",
      options: ["The object, height, and wind", "The parachute size", "Only the color", "Only the day of the week"],
      answer: "The object, height, and wind",
      difficulty: 4,
    },
    {
      question: "If one person wins after wearing a lucky shirt, what is the safest conclusion?",
      options: ["It could be a coincidence", "The shirt caused the win for sure", "Lucky shirts always work", "No one can ever win again"],
      answer: "It could be a coincidence",
      difficulty: 4,
    },
    {
      question: "Which is a more reliable source for average rain?",
      options: ["A weather record", "One memory", "A guess", "A rumor"],
      answer: "A weather record",
      difficulty: 4,
    },
    {
      question: "If a graph only shows a few people, what should you be careful about?",
      options: ["Big conclusions", "The title", "The colors", "The paper size"],
      answer: "Big conclusions",
      difficulty: 4,
    },
    {
      question: "What is the best reason to repeat an experiment?",
      options: ["To see if results are similar", "To make it harder to understand", "To change the question", "To avoid measuring"],
      answer: "To see if results are similar",
      difficulty: 4,
    },
    {
      question: "If a medicine helped one person, what is needed before saying it works for everyone?",
      options: ["More tests on more people", "One louder story", "A bigger box", "A shorter name"],
      answer: "More tests on more people",
      difficulty: 4,
    },
    {
      question: "If a website says a trick \"always works\" but a test shows it fails sometimes, what does that prove?",
      options: ["Always is false", "The test must be wrong", "The trick works better now", "The website cannot be checked"],
      answer: "Always is false",
      difficulty: 5,
    },
    {
      question: "Which is the strongest evidence that a result is real?",
      options: ["Several fair tests with similar results", "One exciting example", "A loud opinion", "A guess from one person"],
      answer: "Several fair tests with similar results",
      difficulty: 5,
    },
    {
      question: "What is the problem with asking only people who already like a product?",
      options: ["Biased sample", "Too many opinions", "Perfect fairness", "No opinions at all"],
      answer: "Biased sample",
      difficulty: 5,
    },
    {
      question: "If two things happen together, what must you check before saying one caused the other?",
      options: ["Other possible causes", "The color of the chart", "The name of the study", "The number of letters"],
      answer: "Other possible causes",
      difficulty: 5,
    },
    {
      question: "Which is the best response to a claim based on one exciting example?",
      options: ["Ask for more evidence", "Believe it immediately", "Ignore the claim forever", "Repeat the story louder"],
      answer: "Ask for more evidence",
      difficulty: 5,
    },
    {
      question: "If a study uses a tiny sample, what is the safest conclusion?",
      options: ["Only about that small group", "About everyone everywhere", "The answer is certain", "The result is meaningless"],
      answer: "Only about that small group",
      difficulty: 5,
    },
    {
      question: "Which is the best way to tell if a new study is trustworthy?",
      options: ["Check how it was done and whether it can be repeated", "Choose the longest title", "Trust it because it is new", "Trust it because it is on a screen"],
      answer: "Check how it was done and whether it can be repeated",
      difficulty: 5,
    },
  ]
);

function createRationalityGeneratedEntry(difficulty) {
  const level = rationalityClampDifficulty(difficulty);
  const generatorsByLevel = {
    1: [
      rationalityCreateToolQuestion,
      rationalityCreateLikelihoodQuestion,
      rationalityCreateAskForEvidenceQuestion,
    ],
    2: [
      rationalityCreateFairTestQuestion,
      rationalityCreateOneExampleQuestion,
      rationalityCreateChangeOneThingQuestion,
    ],
    3: [
      rationalityCreateSampleQuestion,
      rationalityCreateEvidenceQuestion,
      rationalityCreateControlQuestion,
    ],
    4: [
      rationalityCreateCorrelationQuestion,
      rationalityCreateBestConclusionQuestion,
      rationalityCreateReliableTestQuestion,
    ],
    5: [
      rationalityCreateBiasedSampleQuestion,
      rationalityCreateOverclaimQuestion,
      rationalityCreateTrustworthyStudyQuestion,
    ],
  };

  return {
    ...rationalityRandomChoice(generatorsByLevel[level])(),
    difficulty: level,
  };
}

function rationalityCreateToolQuestion() {
  const templates = [
    {
      question: "Which tool is best for finding which backpack is heavier?",
      options: ["Use a scale", "Use a ruler", "Use a thermometer", "Use a clock"],
      answer: "Use a scale",
      difficulty: 1,
    },
    {
      question: "Which tool is best for finding which pencil is longer?",
      options: ["A ruler", "A stopwatch", "A thermometer", "A magnet"],
      answer: "A ruler",
      difficulty: 1,
    },
    {
      question: "Which tool is best for checking if soup is hot?",
      options: ["Thermometer", "Ruler", "Scale", "Compass"],
      answer: "Thermometer",
      difficulty: 1,
    },
    {
      question: "Which tool is best for timing a race?",
      options: ["Stopwatch", "Scale", "Ruler", "Magnifying glass"],
      answer: "Stopwatch",
      difficulty: 1,
    },
  ];

  return rationalityRandomChoice(templates);
}

function rationalityCreateLikelihoodQuestion() {
  const templates = [
    {
      question: "A bag has 9 red marbles and 1 blue marble. Which color are you more likely to pick?",
      options: ["Red", "Blue", "They are equally likely", "You cannot tell"],
      answer: "Red",
      difficulty: 1,
    },
    {
      question: "A bag has 8 blue marbles and 8 red marbles. Which color is more likely on one pick?",
      options: ["Blue", "Red", "They are equally likely", "You cannot know at all"],
      answer: "They are equally likely",
      difficulty: 1,
    },
    {
      question: "A spinner has 3 red parts and 1 blue part. Which color is more likely?",
      options: ["Red", "Blue", "They are equally likely", "Neither can happen"],
      answer: "Red",
      difficulty: 1,
    },
  ];

  return rationalityRandomChoice(templates);
}

function rationalityCreateAskForEvidenceQuestion() {
  const templates = [
    {
      question: "If a friend makes a claim, what is the best next step?",
      options: ["Ask for evidence", "Guess quickly", "Ignore the claim", "Say the opposite"],
      answer: "Ask for evidence",
      difficulty: 1,
    },
    {
      question: "If someone says a toy is the best, what is a smart next step?",
      options: ["Ask why they think that", "Believe it right away", "Never ask questions", "Choose the loudest answer"],
      answer: "Ask why they think that",
      difficulty: 1,
    },
  ];

  return rationalityRandomChoice(templates);
}

function rationalityCreateFairTestQuestion() {
  const templates = [
    {
      question: "You want to test whether more sunlight helps a plant grow. What should you change?",
      options: ["Only the amount of sunlight", "The plant type and the water", "The pot and the soil and the water", "Everything at once"],
      answer: "Only the amount of sunlight",
      difficulty: 2,
    },
    {
      question: "You want to know whether a new soap cleans better. Which is the fairest test?",
      options: ["Use different amounts of soap", "Use the same amount of dirt and the same scrubbing time", "Use hot water once and cold water once", "Change the soap and the cloth"],
      answer: "Use the same amount of dirt and the same scrubbing time",
      difficulty: 2,
    },
    {
      question: "If you want to know whether seeds grow better in sun or shade, what should stay the same?",
      options: ["Seed type, water, and soil", "Only the pot color", "Only the day of the week", "Nothing has to stay the same"],
      answer: "Seed type, water, and soil",
      difficulty: 2,
    },
  ];

  return rationalityRandomChoice(templates);
}

function rationalityCreateOneExampleQuestion() {
  const templates = [
    {
      question: "A coin landed heads 4 times in a row. What is most reasonable about the next flip?",
      options: ["It must be tails", "It must be heads", "It could still be heads or tails", "The coin stopped working"],
      answer: "It could still be heads or tails",
      difficulty: 2,
    },
    {
      question: "Noga says, 'I studied and got 100, so studying always gives 100.' What is the best response?",
      options: ["One example is not enough to prove always", "Noga is always right", "Studying never helps", "Tests are all the same"],
      answer: "One example is not enough to prove always",
      difficulty: 2,
    },
    {
      question: "A restaurant was busy on Friday night. What can you safely say?",
      options: ["It is always busy", "It was busy that night", "It is the best restaurant", "It will be busy every night"],
      answer: "It was busy that night",
      difficulty: 2,
    },
  ];

  return rationalityRandomChoice(templates);
}

function rationalityCreateChangeOneThingQuestion() {
  const templates = [
    {
      question: "If you want to know whether a toy car rolls farther on carpet or tile, what should change?",
      options: ["The floor surface", "The color of the car", "The room lights", "The person watching"],
      answer: "The floor surface",
      difficulty: 2,
    },
    {
      question: "You want to know whether a magnet works better from 2 centimeters away or 10 centimeters away. What should you change?",
      options: ["Only the distance", "The distance and the magnet", "The magnet and the paper clips", "Everything at once"],
      answer: "Only the distance",
      difficulty: 2,
    },
  ];

  return rationalityRandomChoice(templates);
}

function rationalityCreateSampleQuestion() {
  const templates = [
    {
      question: "Which sample is more reliable for learning the favorite lunch in a school of 500 students?",
      options: ["Ask 2 friends in one class", "Ask 50 students from different grades", "Ask one teacher", "Read one lunch tray"],
      answer: "Ask 50 students from different grades",
      difficulty: 3,
    },
    {
      question: "Which sample is better for learning the favorite recess game in a whole school?",
      options: ["One class only", "Students from many classes", "Only the oldest students", "Only one friend"],
      answer: "Students from many classes",
      difficulty: 4,
    },
    {
      question: "What is the problem with asking only people who already like a product?",
      options: ["Biased sample", "Too many opinions", "Perfect fairness", "No opinions at all"],
      answer: "Biased sample",
      difficulty: 5,
    },
  ];

  return rationalityRandomChoice(templates);
}

function rationalityCreateEvidenceQuestion() {
  const templates = [
    {
      question: "Which is better evidence that a movie is popular?",
      options: ["Two friends liked it", "One person watched it twice", "Two thousand people rated it highly", "The poster looks nice"],
      answer: "Two thousand people rated it highly",
      difficulty: 3,
    },
    {
      question: "Which is stronger evidence that a result is real?",
      options: ["Several fair tests with similar results", "One exciting example", "A loud opinion", "A guess from one person"],
      answer: "Several fair tests with similar results",
      difficulty: 5,
    },
    {
      question: "Which is the best response to a claim based on one exciting example?",
      options: ["Ask for more evidence", "Believe it immediately", "Ignore the claim forever", "Repeat the story louder"],
      answer: "Ask for more evidence",
      difficulty: 5,
    },
  ];

  return rationalityRandomChoice(templates);
}

function rationalityCreateControlQuestion() {
  const templates = [
    {
      question: "To test whether a paper airplane flies farther from a taller launch point, what should stay the same?",
      options: ["Only the launch height should change", "The plane shape should change too", "The thrower should switch arms", "The weather should change"],
      answer: "Only the launch height should change",
      difficulty: 3,
    },
    {
      question: "To decide which battery lasts longer, what is the fairest test?",
      options: ["Use different toys", "Use the same toy in the same way and time both batteries", "Choose the battery with the brighter label", "Ask which battery sounds stronger"],
      answer: "Use the same toy in the same way and time both batteries",
      difficulty: 4,
    },
    {
      question: "You want to know whether a bigger parachute falls slower. What should stay the same?",
      options: ["The object hanging below it", "The parachute size and the object", "The height and the wind and the object should all change", "Only the color of the parachute"],
      answer: "The object hanging below it",
      difficulty: 4,
    },
  ];

  return rationalityRandomChoice(templates);
}

function rationalityCreateCorrelationQuestion() {
  const templates = [
    {
      question: "Screen time went up and sleep went down during one week. What can you say safely?",
      options: ["Screen time is the only cause", "They changed together, but one may not be the only cause", "Sleep caused screen time", "The data proves nothing happened"],
      answer: "They changed together, but one may not be the only cause",
      difficulty: 4,
    },
    {
      question: "Gabriel wore a lucky shirt and won two games. What is the most reasonable idea?",
      options: ["The shirt definitely caused the wins", "The shirt may not be the reason", "Lucky shirts always work", "The games do not count"],
      answer: "The shirt may not be the reason",
      difficulty: 4,
    },
    {
      question: "Two things happened at the same time. What should you check before saying one caused the other?",
      options: ["Other possible causes", "The color of the chart", "The name of the study", "The number of letters"],
      answer: "Other possible causes",
      difficulty: 5,
    },
  ];

  return rationalityRandomChoice(templates);
}

function rationalityCreateBestConclusionQuestion() {
  const templates = [
    {
      question: "If 20 students voted and 11 chose soccer, what is true?",
      options: ["Exactly half chose soccer", "More than half chose soccer", "Less than half chose soccer", "All students chose soccer"],
      answer: "More than half chose soccer",
      difficulty: 3,
    },
    {
      question: "A bag feels heavy. Which is the best way to know its mass more accurately?",
      options: ["Guess", "Ask a friend to hold it", "Use a scale", "Look at its color"],
      answer: "Use a scale",
      difficulty: 3,
    },
    {
      question: "If a study uses a tiny sample, what is the safest conclusion?",
      options: ["Only about that small group", "About everyone everywhere", "The answer is certain", "The result is meaningless"],
      answer: "Only about that small group",
      difficulty: 5,
    },
  ];

  return rationalityRandomChoice(templates);
}

function rationalityCreateReliableTestQuestion() {
  const templates = [
    {
      question: "Which question can be answered best by measuring instead of guessing?",
      options: ["Which story is funniest?", "Which pumpkin is heavier?", "Which color is prettiest?", "Which song is best?"],
      answer: "Which pumpkin is heavier?",
      difficulty: 3,
    },
    {
      question: "What is the smartest next step before deciding which route is faster?",
      options: ["Time both routes on more days", "Decide after those two days only", "Ask one friend to guess", "Pick the route with more trees"],
      answer: "Time both routes on more days",
      difficulty: 1,
    },
    {
      question: "Which is the best way to compare how long two routes take?",
      options: ["Time both routes", "Pick the prettier road", "Ask one person to guess", "Choose the shorter name"],
      answer: "Time both routes",
      difficulty: 1,
    },
  ];

  return rationalityRandomChoice(templates);
}

function rationalityCreateBiasedSampleQuestion() {
  const templates = [
    {
      question: "A website says, 'This miracle study trick doubles every score.' What should you look for next?",
      options: ["The brightest colors on the page", "Careful test results from many students", "A bigger title", "One exciting story"],
      answer: "Careful test results from many students",
      difficulty: 5,
    },
    {
      question: "Which claim is easiest to test fairly?",
      options: ["Some songs are cool", "Plants grow faster with more sunlight when water and soil stay the same", "Pizza is the best food", "Blue is a lucky color"],
      answer: "Plants grow faster with more sunlight when water and soil stay the same",
      difficulty: 5,
    },
  ];

  return rationalityRandomChoice(templates);
}

function rationalityCreateOverclaimQuestion() {
  const templates = [
    {
      question: "Noga says, 'I studied and got 100, so studying always gives 100.' What is the best response?",
      options: ["One example is not enough to prove always", "Noga is always right", "Studying never helps", "Tests are all the same"],
      answer: "One example is not enough to prove always",
      difficulty: 2,
    },
    {
      question: "Three kids say a park is 'always empty,' but you visit once and it is full. What does that show?",
      options: ["The word 'always' was too strong", "The park is always full", "The kids were lying every time", "A park can only be full once"],
      answer: "The word 'always' was too strong",
      difficulty: 5,
    },
    {
      question: "A website says a trick 'always works,' but you find one clear example where it does not. What do you know?",
      options: ["The word 'always' cannot be right", "The trick worked anyway", "Examples do not matter", "The website must be perfect"],
      answer: "The word 'always' cannot be right",
      difficulty: 5,
    },
  ];

  return rationalityRandomChoice(templates);
}

function rationalityCreateTrustworthyStudyQuestion() {
  const templates = [
    {
      question: "Which is the best way to tell if a new study is trustworthy?",
      options: ["Check how it was done and whether it can be repeated", "Choose the longest title", "Trust it because it is new", "Trust it because it is on a screen"],
      answer: "Check how it was done and whether it can be repeated",
      difficulty: 5,
    },
    {
      question: "What is the best next step before saying a medicine works for everyone?",
      options: ["Test it carefully with many people", "Tell everyone it always works", "Stop collecting information", "Use only one more person"],
      answer: "Test it carefully with many people",
      difficulty: 4,
    },
    {
      question: "What is the safest next step when two thermometers show different temperatures?",
      options: ["Check again with another thermometer", "Choose the bigger number because it looks stronger", "Average them without thinking", "Ignore both of them"],
      answer: "Check again with another thermometer",
      difficulty: 5,
    },
  ];

  return rationalityRandomChoice(templates);
}

function rationalityClampDifficulty(value) {
  const difficulty = Number(value);
  if (!Number.isInteger(difficulty) || difficulty < 1) {
    return 1;
  }

  return Math.min(5, difficulty);
}

function rationalityRandomChoice(values) {
  if (typeof randomChoice === "function") {
    return randomChoice(values);
  }

  return values[Math.floor(Math.random() * values.length)];
}

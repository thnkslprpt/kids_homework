const SCIENCE_EVIDENCE_QUESTIONS = [
  // Level 1: simple fair tests, observations, variables, and direct evidence.
  scienceEvidenceBuildQuestion({
    question: "What should Sara keep the same to make this a fair test?",
    displayText: "Sara wants to know which paper towel brand soaks up the most water. She uses the same amount of water on each towel and measures how much each one holds.",
    options: [
      "The amount of water used each time",
      "The brand name",
      "The color of the towel",
      "Which answer she hopes to get",
    ],
    answer: "The amount of water used each time",
    difficulty: 1,
    visualSummary: "A fair test keeps the amount of water the same.",
  }),
  scienceEvidenceBuildQuestion({
    question: "What variable changed in the experiment?",
    displayText: "Cup A: 1 spoon of water each day\nCup B: 2 spoons of water each day\nCup C: 3 spoons of water each day",
    visualHtml: buildScienceTableCard("Bean plant experiment", [
      ["Cup", "Water each day"],
      ["A", "1 spoon"],
      ["B", "2 spoons"],
      ["C", "3 spoons"],
    ]),
    options: ["The amount of water", "The kind of plant", "The type of cup", "The color of the table"],
    answer: "The amount of water",
    difficulty: 1,
    visualSummary: "The amount of water changes from cup to cup.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which evidence best supports the claim?",
    displayText: "Claim: Plants in sunlight grow taller than plants kept in the dark.",
    visualHtml: buildScienceTableCard("Plant heights after 1 week", [
      ["Plant", "Height"],
      ["Sunlight", "14 cm"],
      ["Dark closet", "6 cm"],
    ]),
    options: [
      "The sunlight plant was taller",
      "Plants are always green",
      "Closets are useful for storage",
      "The ruler measured centimeters",
    ],
    answer: "The sunlight plant was taller",
    difficulty: 1,
    visualSummary: "The sunlight plant grew taller than the dark plant.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which sentence is an observation?",
    displayText: "A child looks at a leaf during science class.",
    options: [
      "The leaf has brown spots.",
      "The leaf is sad.",
      "The leaf wants more sunlight.",
      "The leaf is the best leaf.",
    ],
    answer: "The leaf has brown spots.",
    difficulty: 1,
    visualSummary: "An observation describes what can be seen or measured.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which tool would best measure the plant height?",
    displayText: "Maya wants to record how tall a bean plant is each day.",
    options: ["A ruler", "A spoon", "A magnet", "A flashlight"],
    answer: "A ruler",
    difficulty: 1,
    visualSummary: "A ruler measures length or height.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which choice tells data from the test?",
    displayText: "A sponge test is finished.",
    options: [
      "The sponge held 12 mL of water.",
      "Sponges are fun to squeeze.",
      "The blue sponge is prettiest.",
      "The table looks nice.",
    ],
    answer: "The sponge held 12 mL of water.",
    difficulty: 1,
    visualSummary: "Data are measurements or recorded observations.",
  }),
  scienceEvidenceBuildQuestion({
    question: "What question can be tested with an experiment?",
    options: [
      "Which soil helps beans grow taller?",
      "Which flower is the prettiest?",
      "Which color is happiest?",
      "Which rock is the most interesting?",
    ],
    answer: "Which soil helps beans grow taller?",
    difficulty: 1,
    visualSummary: "A testable question can be answered with evidence.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which result supports the claim?",
    displayText: "Claim: The heavier ball rolled farther down the ramp.",
    visualHtml: buildScienceTableCard("Ramp test", [
      ["Ball", "Distance rolled"],
      ["Light ball", "2 m"],
      ["Heavy ball", "5 m"],
    ]),
    options: [
      "The heavy ball rolled 5 m and the light ball rolled 2 m.",
      "Both balls were round.",
      "The ramp was brown.",
      "The balls were tested after lunch.",
    ],
    answer: "The heavy ball rolled 5 m and the light ball rolled 2 m.",
    difficulty: 1,
    visualSummary: "The heavier ball rolled farther in the data.",
  }),

  // Level 2: reading simple tables and identifying controls.
  scienceEvidenceBuildQuestion({
    question: "Which choice is the best conclusion from the data?",
    displayText: "A student tested three sponges with the same amount of water.",
    visualHtml: buildScienceTableCard("Water absorbed", [
      ["Sponge", "Water absorbed"],
      ["Red", "10 mL"],
      ["Blue", "15 mL"],
      ["Green", "8 mL"],
    ]),
    options: [
      "The blue sponge absorbed the most water.",
      "All sponges are the same color.",
      "Water disappears when it touches a sponge.",
      "The red sponge was the tallest.",
    ],
    answer: "The blue sponge absorbed the most water.",
    difficulty: 2,
    visualSummary: "The blue sponge has the largest water amount.",
  }),
  scienceEvidenceBuildQuestion({
    question: "What should the scientist keep the same?",
    displayText: "Two groups of seeds are planted. One group gets sunlight, and one group gets shade.",
    options: [
      "The amount of water each group gets",
      "Which group gets sunlight",
      "How tall the plants grow",
      "Which group gets shade",
    ],
    answer: "The amount of water each group gets",
    difficulty: 2,
    visualSummary: "Water should stay the same if light is being tested.",
  }),
  scienceEvidenceBuildQuestion({
    question: "What does the table show?",
    visualHtml: buildScienceTableCard("Seed growth", [
      ["Day", "Height"],
      ["1", "2 cm"],
      ["3", "4 cm"],
      ["5", "6 cm"],
    ]),
    options: [
      "The plant grew over time.",
      "The plant shrank over time.",
      "The plant stayed the same size.",
      "The plant changed color only.",
    ],
    answer: "The plant grew over time.",
    difficulty: 2,
    visualSummary: "The plant height increases each day shown.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which part is the outcome being measured?",
    displayText: "A class tests whether more sunlight changes how tall plants grow.",
    options: [
      "How tall the plants grow",
      "The amount of sunlight",
      "The window color",
      "The names of the students",
    ],
    answer: "How tall the plants grow",
    difficulty: 2,
    visualSummary: "The measured outcome is plant height.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which evidence supports the claim?",
    displayText: "Claim: A magnet attracts paper clips but not plastic beads.",
    visualHtml: buildScienceTableCard("Magnet test", [
      ["Object", "Was it attracted?"],
      ["Paper clip", "Yes"],
      ["Plastic bead", "No"],
    ]),
    options: [
      "The paper clip was attracted and the plastic bead was not.",
      "The bead was small.",
      "The magnet was on the table.",
      "Paper clips can be shiny.",
    ],
    answer: "The paper clip was attracted and the plastic bead was not.",
    difficulty: 2,
    visualSummary: "The results match the claim about attraction.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which choice would make the test unfair?",
    displayText: "Two toy cars are tested to see which rolls farther from the same ramp.",
    options: [
      "Push one car but not the other",
      "Measure each distance in meters",
      "Use the same ramp",
      "Start both cars at the top",
    ],
    answer: "Push one car but not the other",
    difficulty: 2,
    visualSummary: "Pushing one car adds another variable.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which statement compares the data correctly?",
    visualHtml: buildScienceTableCard("Hand warmer test", [
      ["Material", "Temperature after 5 min"],
      ["Cloth wrap", "28°C"],
      ["Foil wrap", "34°C"],
    ]),
    options: [
      "The foil wrap was warmer after 5 minutes.",
      "The cloth wrap was warmer after 5 minutes.",
      "Both wraps were 34°C.",
      "No temperature was measured.",
    ],
    answer: "The foil wrap was warmer after 5 minutes.",
    difficulty: 2,
    visualSummary: "34°C is warmer than 28°C.",
  }),
  scienceEvidenceBuildQuestion({
    question: "What should be written in a science notebook?",
    displayText: "A student is watching an ice cube melt.",
    options: [
      "The ice cube melted in 9 minutes.",
      "Ice cubes are boring.",
      "The ice cube wanted to leave.",
      "Cold things are always magic.",
    ],
    answer: "The ice cube melted in 9 minutes.",
    difficulty: 2,
    visualSummary: "A useful notebook entry records evidence.",
  }),

  // Level 3: fair design, direct conclusions, and observation vs inference.
  scienceEvidenceBuildQuestion({
    question: "Which change would make this a fair test?",
    displayText: "A student wants to compare how fast two toy cars roll down a ramp.",
    options: [
      "Use the same ramp and the same starting point",
      "Use a different ramp for each car",
      "Push one car harder than the other",
      "Let one car start halfway down",
    ],
    answer: "Use the same ramp and the same starting point",
    difficulty: 3,
    visualSummary: "Only the car should change in the comparison.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which evidence supports the claim?",
    displayText: "Claim: Ice melts faster in a warm room than in a cold room.",
    options: [
      "The ice in the warm room disappeared first",
      "Both rooms were painted white",
      "The warm room had a chair",
      "Ice is made of water",
    ],
    answer: "The ice in the warm room disappeared first",
    difficulty: 3,
    visualSummary: "The warm room ice melting first supports the claim.",
  }),
  scienceEvidenceBuildQuestion({
    question: "What conclusion fits the data?",
    visualHtml: buildScienceTableCard("Bean plants", [
      ["Group", "Water each day", "Height after 10 days"],
      ["A", "1 cup", "18 cm"],
      ["B", "3 cups", "17 cm"],
    ]),
    options: [
      "More water did not make this plant taller.",
      "Plants grow best in the dark.",
      "Water stops plants from growing.",
      "Group B had no water at all.",
    ],
    answer: "More water did not make this plant taller.",
    difficulty: 3,
    visualSummary: "The plant with more water was not taller in this test.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which statement is an observation, not a guess?",
    options: [
      "The leaf is green.",
      "The leaf must be hungry.",
      "The leaf probably likes music.",
      "The leaf is feeling excited.",
    ],
    answer: "The leaf is green.",
    difficulty: 3,
    visualSummary: "Green can be seen, so it is an observation.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which variable should be changed on purpose?",
    displayText: "A class tests whether ramp height changes how far a toy car rolls.",
    options: ["Ramp height", "Toy car", "Floor surface", "Measuring tape"],
    answer: "Ramp height",
    difficulty: 3,
    visualSummary: "Ramp height is the variable being tested.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which result would weaken the claim?",
    displayText: "Claim: Adding fertilizer always makes this plant grow taller.",
    visualHtml: buildScienceTableCard("Fertilizer test", [
      ["Group", "Height after 2 weeks"],
      ["No fertilizer", "16 cm"],
      ["With fertilizer", "15 cm"],
    ]),
    options: [
      "The fertilized plant was slightly shorter.",
      "Both plants were in pots.",
      "The plants were measured in centimeters.",
      "The experiment lasted two weeks.",
    ],
    answer: "The fertilized plant was slightly shorter.",
    difficulty: 3,
    visualSummary: "The fertilized plant did not grow taller here.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which is the best prediction from the pattern?",
    visualHtml: buildScienceTableCard("Water temperature", [
      ["Minutes in freezer", "Temperature"],
      ["0", "20°C"],
      ["5", "15°C"],
      ["10", "10°C"],
    ]),
    options: ["After 15 minutes it may be colder.", "After 15 minutes it must be 50°C.", "The water will become sand.", "Time has no effect on temperature."],
    answer: "After 15 minutes it may be colder.",
    difficulty: 3,
    visualSummary: "The temperature is going down over time.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Why should the student use the same amount of dirt on each cloth?",
    displayText: "A student compares two soaps to see which cleans a cloth better.",
    options: [
      "So the soap is the main thing being compared",
      "So the cloths look different before washing",
      "So one soap gets an easier test",
      "So the answer is chosen before the test",
    ],
    answer: "So the soap is the main thing being compared",
    difficulty: 3,
    visualSummary: "Keeping dirt the same makes the comparison fair.",
  }),

  // Level 4: identifying independent/dependent variables and stronger evidence.
  scienceEvidenceBuildQuestion({
    question: "What should the student change in the experiment?",
    displayText: "A student wants to test whether different colors of paper warm up differently in the sun.",
    options: ["The color of the paper", "The sun", "The table", "The measuring cup"],
    answer: "The color of the paper",
    difficulty: 4,
    visualSummary: "Paper color is the independent variable.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which claim is supported by the evidence?",
    visualHtml: buildScienceTableCard("Snail speed", [
      ["Surface", "Time to cross 1 meter"],
      ["Sandpaper", "40 seconds"],
      ["Tile", "22 seconds"],
    ]),
    options: [
      "The snail moved faster on tile.",
      "The snail only moves at night.",
      "Sandpaper is softer than tile.",
      "The tile was not measured.",
    ],
    answer: "The snail moved faster on tile.",
    difficulty: 4,
    visualSummary: "Less time to cross the same distance means faster.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which result is best evidence that the seed type mattered?",
    visualHtml: buildScienceTableCard("Seed test", [
      ["Seed type", "Plants that sprouted"],
      ["Type A", "8 out of 10"],
      ["Type B", "2 out of 10"],
    ]),
    options: [
      "Type A sprouted more often than Type B.",
      "The cups were the same size.",
      "The dirt was brown.",
      "The teacher wrote the data down.",
    ],
    answer: "Type A sprouted more often than Type B.",
    difficulty: 4,
    visualSummary: "The sprouting rates differ by seed type.",
  }),
  scienceEvidenceBuildQuestion({
    question: "What variable is being changed?",
    displayText: "A student tests plants with different amounts of light but keeps the water and soil the same.",
    options: ["The amount of light", "The soil color", "The pot shape", "The plant's age"],
    answer: "The amount of light",
    difficulty: 4,
    visualSummary: "Light amount is intentionally changed.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which question is most scientific?",
    options: [
      "Does the size of a parachute affect how slowly it falls?",
      "Which parachute color is coolest?",
      "Is falling scary?",
      "Which parachute is luckiest?",
    ],
    answer: "Does the size of a parachute affect how slowly it falls?",
    difficulty: 4,
    visualSummary: "The parachute question can be tested and measured.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which evidence best supports the claim?",
    displayText: "Claim: A lid helps hot water stay warm longer.",
    visualHtml: buildScienceTableCard("Water after 20 minutes", [
      ["Cup", "Temperature"],
      ["With lid", "48°C"],
      ["No lid", "39°C"],
    ]),
    options: [
      "The covered cup stayed warmer after 20 minutes.",
      "The cups were both round.",
      "The water started hot.",
      "The lid was easy to remove.",
    ],
    answer: "The covered cup stayed warmer after 20 minutes.",
    difficulty: 4,
    visualSummary: "The lidded cup had the higher final temperature.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which statement is an inference?",
    displayText: "A wet footprint trail leads from the pool to the door.",
    options: [
      "Someone probably walked from the pool to the door.",
      "There are wet footprints on the ground.",
      "The footprints are 20 cm long.",
      "The trail reaches the door.",
    ],
    answer: "Someone probably walked from the pool to the door.",
    difficulty: 4,
    visualSummary: "An inference explains observations using reasoning.",
  }),
  scienceEvidenceBuildQuestion({
    question: "What should be measured to answer the question?",
    displayText: "Question: Does the number of rubber bands change how far a toy car travels?",
    options: [
      "The distance the toy car travels",
      "The color of the toy car",
      "The name of the toy car",
      "The shape of the notebook",
    ],
    answer: "The distance the toy car travels",
    difficulty: 4,
    visualSummary: "Distance traveled is the dependent variable.",
  }),

  // Level 5: interpreting data, choosing conclusions, and identifying limits.
  scienceEvidenceBuildQuestion({
    question: "Which choice is the best explanation for the results?",
    visualHtml: buildScienceTableCard("Ice cubes", [
      ["Location", "Time to melt"],
      ["Window", "12 minutes"],
      ["Shady desk", "25 minutes"],
    ]),
    options: [
      "The warmer place made the ice melt faster.",
      "The ice changed into a rock.",
      "The desk made the room colder.",
      "The window blocked all light and heat.",
    ],
    answer: "The warmer place made the ice melt faster.",
    difficulty: 5,
    visualSummary: "The ice melted faster by the window.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which statement is the strongest claim supported by the evidence?",
    visualHtml: buildScienceTableCard("Paper airplane test", [
      ["Plane", "Distance"],
      ["Fold A", "7 m"],
      ["Fold B", "12 m"],
      ["Fold C", "9 m"],
    ]),
    options: [
      "Fold B flew the farthest.",
      "All planes flew the same distance.",
      "Fold A flew the farthest.",
      "The paper was wet.",
    ],
    answer: "Fold B flew the farthest.",
    difficulty: 5,
    visualSummary: "Fold B has the greatest distance.",
  }),
  scienceEvidenceBuildQuestion({
    question: "What should stay the same for a fair test?",
    displayText: "A class compares how three different cups keep water cold.",
    options: [
      "The amount of water in each cup",
      "The cup material",
      "The color of the cups",
      "The name of the group testing the cups",
    ],
    answer: "The amount of water in each cup",
    difficulty: 5,
    visualSummary: "Water amount should be controlled while cup material changes.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which conclusion is safest?",
    displayText: "A class tests one plant with music and one plant without music for one week.",
    visualHtml: buildScienceTableCard("Plant height", [
      ["Group", "Height change"],
      ["Music", "+3 cm"],
      ["No music", "+2 cm"],
    ]),
    options: [
      "In this test, the music plant grew 1 cm more.",
      "Music always makes every plant grow faster.",
      "Plants cannot grow without music.",
      "The no-music plant died.",
    ],
    answer: "In this test, the music plant grew 1 cm more.",
    difficulty: 5,
    visualSummary: "The safest conclusion sticks to this test only.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which evidence is more reliable?",
    options: [
      "Measurements from 20 trials that show a similar pattern",
      "One trial with no measurements written down",
      "A friend's guess about what happened",
      "A result chosen before doing the test",
    ],
    answer: "Measurements from 20 trials that show a similar pattern",
    difficulty: 5,
    visualSummary: "More repeated measurements usually make evidence stronger.",
  }),
  scienceEvidenceBuildQuestion({
    question: "What is a problem with this test?",
    displayText: "Liam tests two batteries. Battery A powers a small flashlight, and Battery B powers a large toy motor.",
    options: [
      "The batteries are used in different devices.",
      "Both batteries are being tested.",
      "The test has batteries.",
      "The devices both use electricity.",
    ],
    answer: "The batteries are used in different devices.",
    difficulty: 5,
    visualSummary: "Different devices make the comparison unfair.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which prediction is best supported by the data?",
    visualHtml: buildScienceTableCard("Shadow length", [
      ["Time", "Shadow length"],
      ["9:00", "80 cm"],
      ["10:00", "60 cm"],
      ["11:00", "40 cm"],
    ]),
    options: [
      "At 12:00, the shadow may be shorter than 40 cm.",
      "At 12:00, the shadow must be 200 cm.",
      "The shadow will turn into water.",
      "The time of day never affects shadows.",
    ],
    answer: "At 12:00, the shadow may be shorter than 40 cm.",
    difficulty: 5,
    visualSummary: "The shadow is getting shorter over time.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which is the best reason to repeat an experiment?",
    options: [
      "To see if the results happen again",
      "To make the notebook heavier",
      "To change every variable at once",
      "To avoid measuring anything",
    ],
    answer: "To see if the results happen again",
    difficulty: 5,
    visualSummary: "Repeating helps check if results are reliable.",
  }),

  // Level 6: repeated trials, averages, and stronger comparisons.
  scienceEvidenceBuildQuestion({
    question: "Why are three trials better than one trial?",
    displayText: "A student times how long a toy car takes to roll down a ramp.",
    options: [
      "Repeating helps catch unusual results.",
      "Repeating makes the car heavier.",
      "One trial is always wrong.",
      "Three trials means no measuring is needed.",
    ],
    answer: "Repeating helps catch unusual results.",
    difficulty: 6,
    visualSummary: "Multiple trials make the evidence more reliable.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which average is closest to the data?",
    visualHtml: buildScienceTableCard("Ramp distances", [
      ["Trial", "Distance"],
      ["1", "8 m"],
      ["2", "10 m"],
      ["3", "9 m"],
    ]),
    options: ["9 m", "12 m", "5 m", "18 m"],
    answer: "9 m",
    difficulty: 6,
    visualSummary: "8, 10, and 9 average to 9.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which trial may be an outlier?",
    visualHtml: buildScienceTableCard("Seed sprouting", [
      ["Trial", "Seeds sprouted"],
      ["1", "18"],
      ["2", "17"],
      ["3", "3"],
      ["4", "19"],
    ]),
    options: ["Trial 3", "Trial 1", "Trial 2", "Trial 4"],
    answer: "Trial 3",
    difficulty: 6,
    visualSummary: "Trial 3 is very different from the other results.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which claim is best supported?",
    visualHtml: buildScienceTableCard("Insulation test", [
      ["Wrapping", "Temperature after 30 min"],
      ["No wrapping", "32°C"],
      ["Thin cloth", "38°C"],
      ["Thick cloth", "44°C"],
    ]),
    options: [
      "Thicker wrapping kept the water warmer in this test.",
      "No wrapping kept the water warmest.",
      "All wrappings worked exactly the same.",
      "Cloth changes water into ice.",
    ],
    answer: "Thicker wrapping kept the water warmer in this test.",
    difficulty: 6,
    visualSummary: "Temperature rises with thicker wrapping.",
  }),
  scienceEvidenceBuildQuestion({
    question: "What is the dependent variable?",
    displayText: "A student changes the amount of salt in water and measures how long an ice cube takes to melt.",
    options: [
      "How long the ice cube takes to melt",
      "The amount of salt",
      "The type of cup",
      "The color of the table",
    ],
    answer: "How long the ice cube takes to melt",
    difficulty: 6,
    visualSummary: "The dependent variable is what is measured.",
  }),
  scienceEvidenceBuildQuestion({
    question: "What is the independent variable?",
    displayText: "A class changes the number of rubber bands on a toy car and measures distance traveled.",
    options: [
      "The number of rubber bands",
      "The distance traveled",
      "The measuring tape",
      "The classroom wall",
    ],
    answer: "The number of rubber bands",
    difficulty: 6,
    visualSummary: "The independent variable is changed on purpose.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which improvement would make the results stronger?",
    displayText: "A student tests one seed of each type to decide which seed grows fastest.",
    options: [
      "Test many seeds of each type.",
      "Stop measuring after one day.",
      "Use a different ruler for each plant on purpose.",
      "Choose the answer before planting.",
    ],
    answer: "Test many seeds of each type.",
    difficulty: 6,
    visualSummary: "A larger sample makes the evidence stronger.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which conclusion avoids exaggerating?",
    displayText: "In one class, 18 out of 24 students preferred apples to pears.",
    options: [
      "Most students in this class preferred apples.",
      "Everyone in the world prefers apples.",
      "No one likes pears.",
      "Apples are scientifically the best fruit.",
    ],
    answer: "Most students in this class preferred apples.",
    difficulty: 6,
    visualSummary: "The evidence only describes this class.",
  }),

  // Level 7: control groups, confounding variables, and data quality.
  scienceEvidenceBuildQuestion({
    question: "Why include a group with no fertilizer?",
    displayText: "A scientist tests whether fertilizer helps tomato plants grow.",
    options: [
      "It gives a control group for comparison.",
      "It makes all plants grow exactly the same.",
      "It removes the need to measure height.",
      "It proves fertilizer works before the test starts.",
    ],
    answer: "It gives a control group for comparison.",
    difficulty: 7,
    visualSummary: "A control group helps compare what happens without the treatment.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which problem makes the conclusion weak?",
    displayText: "A student says Brand X batteries last longer. Brand X was tested in a clock, and Brand Y was tested in a toy car.",
    options: [
      "The batteries powered different devices.",
      "The batteries had brand names.",
      "The student wrote down times.",
      "The test used electricity.",
    ],
    answer: "The batteries powered different devices.",
    difficulty: 7,
    visualSummary: "Different devices could use power at different rates.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which data set is most consistent?",
    options: [
      "12 cm, 13 cm, 12 cm, 13 cm",
      "4 cm, 20 cm, 7 cm, 18 cm",
      "2 cm, 30 cm, 1 cm, 29 cm",
      "5 cm, 5 cm, 40 cm, 1 cm",
    ],
    answer: "12 cm, 13 cm, 12 cm, 13 cm",
    difficulty: 7,
    visualSummary: "Consistent data points are close together.",
  }),
  scienceEvidenceBuildQuestion({
    question: "What is the best way to handle an unexpected result?",
    displayText: "Three plant measurements are 14 cm, 15 cm, and 3 cm.",
    options: [
      "Check for mistakes and repeat the measurement.",
      "Delete it without thinking.",
      "Change it to 15 cm because it looks nicer.",
      "Ignore all the data.",
    ],
    answer: "Check for mistakes and repeat the measurement.",
    difficulty: 7,
    visualSummary: "Unexpected results should be investigated carefully.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which choice best separates correlation from causation?",
    displayText: "On hot days, more people buy ice cream and more people swim.",
    options: [
      "Hot weather may explain both ice cream sales and swimming.",
      "Buying ice cream always causes swimming.",
      "Swimming always causes ice cream sales.",
      "The two observations cannot happen on the same day.",
    ],
    answer: "Hot weather may explain both ice cream sales and swimming.",
    difficulty: 7,
    visualSummary: "A third factor can explain two patterns.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which design best tests whether music affects plant growth?",
    options: [
      "Same plant type, water, soil, and light; music changes only for one group",
      "Different plant types, different water, and different music",
      "One plant with music and no measurements",
      "Plants in different rooms with different windows and different soil",
    ],
    answer: "Same plant type, water, soil, and light; music changes only for one group",
    difficulty: 7,
    visualSummary: "A fair design changes one variable and controls the rest.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which source of evidence is strongest?",
    options: [
      "A table of measurements collected with the same method each time",
      "A guess from someone who did not see the test",
      "A story that leaves out the results",
      "A result picked because it sounds exciting",
    ],
    answer: "A table of measurements collected with the same method each time",
    difficulty: 7,
    visualSummary: "Consistent measurements are stronger evidence than guesses.",
  }),
  scienceEvidenceBuildQuestion({
    question: "What does the range of these data show?",
    visualHtml: buildScienceTableCard("Bean heights", [
      ["Plant", "Height"],
      ["A", "18 cm"],
      ["B", "21 cm"],
      ["C", "19 cm"],
      ["D", "20 cm"],
    ]),
    options: [
      "The heights are close together.",
      "One plant is 100 cm tall.",
      "All plants are exactly equal.",
      "No plant height was measured.",
    ],
    answer: "The heights are close together.",
    difficulty: 7,
    visualSummary: "The heights only vary from 18 cm to 21 cm.",
  }),

  // Level 8: precision, bias, sample size, and model limits.
  scienceEvidenceBuildQuestion({
    question: "Which measurement is most precise?",
    displayText: "A class measures the length of a leaf.",
    options: ["7.4 cm", "About 7 cm", "Between 5 and 10 cm", "Small"],
    answer: "7.4 cm",
    difficulty: 8,
    visualSummary: "7.4 cm gives the most exact measurement.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which survey method is least biased?",
    displayText: "A student wants to know the favorite lunch of the whole school.",
    options: [
      "Ask a random mix of students from many grades.",
      "Ask only four best friends.",
      "Ask only students eating pizza today.",
      "Ask only students who already agree.",
    ],
    answer: "Ask a random mix of students from many grades.",
    difficulty: 8,
    visualSummary: "A broad random sample is less biased.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which conclusion is supported, but not too strong?",
    visualHtml: buildScienceTableCard("Soap test", [
      ["Soap", "Stain left after washing"],
      ["Soap A", "Small stain"],
      ["Soap B", "Large stain"],
    ]),
    options: [
      "Soap A cleaned this stain better in this test.",
      "Soap A cleans every stain better forever.",
      "Soap B was not tested.",
      "Soap has no effect on stains.",
    ],
    answer: "Soap A cleaned this stain better in this test.",
    difficulty: 8,
    visualSummary: "The claim should stay limited to the test evidence.",
  }),
  scienceEvidenceBuildQuestion({
    question: "What is the main weakness of this evidence?",
    displayText: "A new soccer drink is tested by one student for one practice. The student says it made everyone faster.",
    options: [
      "Only one person and one practice were tested.",
      "The topic involves sports.",
      "The drink has a name.",
      "The student has an opinion.",
    ],
    answer: "Only one person and one practice were tested.",
    difficulty: 8,
    visualSummary: "The sample and trial count are too small for a broad claim.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which change reduces measurement error?",
    displayText: "Students time a falling object using a stopwatch.",
    options: [
      "Do several trials and average the times.",
      "Start the stopwatch after the object lands.",
      "Round every time to the nearest hour.",
      "Use a different rule for each trial.",
    ],
    answer: "Do several trials and average the times.",
    difficulty: 8,
    visualSummary: "Repeated trials and averages reduce random error.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which factor could be a confounding variable?",
    displayText: "A class compares plant growth in two rooms. One room has more light and is also warmer.",
    options: ["Room temperature", "Plant height", "The ruler units", "The word plant"],
    answer: "Room temperature",
    difficulty: 8,
    visualSummary: "Temperature changes along with light, so it could affect results.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which statement best explains model limits?",
    displayText: "A paper model of a bridge holds 2 kg before bending.",
    options: [
      "The model can help compare designs, but it may not behave exactly like a real bridge.",
      "The model proves every real bridge will hold exactly 2 kg.",
      "Models are never useful in science.",
      "A paper bridge is the same size as every real bridge.",
    ],
    answer: "The model can help compare designs, but it may not behave exactly like a real bridge.",
    difficulty: 8,
    visualSummary: "Models are useful but limited.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which statement best interprets the data trend?",
    visualHtml: buildScienceTableCard("Yeast balloon test", [
      ["Sugar added", "Balloon size"],
      ["0 tsp", "0 cm"],
      ["1 tsp", "6 cm"],
      ["2 tsp", "11 cm"],
      ["3 tsp", "12 cm"],
    ]),
    options: [
      "More sugar increased balloon size at first, then the increase slowed.",
      "Sugar made the balloon smaller every time.",
      "No sugar made the largest balloon.",
      "The balloon size did not change.",
    ],
    answer: "More sugar increased balloon size at first, then the increase slowed.",
    difficulty: 8,
    visualSummary: "The increase from 2 to 3 teaspoons is much smaller than before.",
  }),

  // Level 9: evaluating experimental design and competing explanations.
  scienceEvidenceBuildQuestion({
    question: "Which conclusion best fits the evidence?",
    displayText: "A study finds that students who sleep more often score higher on quizzes. It did not assign sleep times or control study time.",
    options: [
      "More sleep is linked with higher scores in this study, but other factors may matter.",
      "Sleep is proven to be the only cause of higher scores.",
      "Studying cannot affect quiz scores.",
      "The study proves sleep has no relationship to scores.",
    ],
    answer: "More sleep is linked with higher scores in this study, but other factors may matter.",
    difficulty: 9,
    visualSummary: "An observational pattern does not prove a single cause.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which design would best test whether a helmet material absorbs impact better?",
    options: [
      "Drop the same mass from the same height onto each material and measure force many times.",
      "Drop different masses from different heights onto each material once.",
      "Ask which material looks safest.",
      "Use one material indoors and another outdoors on different days.",
    ],
    answer: "Drop the same mass from the same height onto each material and measure force many times.",
    difficulty: 9,
    visualSummary: "This design controls variables and repeats trials.",
  }),
  scienceEvidenceBuildQuestion({
    question: "What is the best critique of the claim?",
    displayText: "Claim: This study proves the new app makes children read faster. Evidence: five students used the app and read faster after two weeks. There was no comparison group.",
    options: [
      "Without a comparison group, improvement might have happened for another reason.",
      "Reading speed cannot be measured.",
      "Five students is always enough to prove anything.",
      "Apps cannot be studied scientifically.",
    ],
    answer: "Without a comparison group, improvement might have happened for another reason.",
    difficulty: 9,
    visualSummary: "A control or comparison group helps rule out other explanations.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which evidence would most strengthen the claim?",
    displayText: "Claim: A new filter removes more particles from water than the old filter.",
    options: [
      "Particle counts before and after filtering for many samples with both filters",
      "A photo of the new filter box",
      "One person saying the water looks nice",
      "The price of the new filter",
    ],
    answer: "Particle counts before and after filtering for many samples with both filters",
    difficulty: 9,
    visualSummary: "Repeated particle measurements directly test the claim.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which result suggests the hypothesis may need revision?",
    displayText: "Hypothesis: More light always makes algae grow more.",
    visualHtml: buildScienceTableCard("Algae growth", [
      ["Light level", "Growth"],
      ["Low", "4 units"],
      ["Medium", "9 units"],
      ["High", "7 units"],
    ]),
    options: [
      "Growth was lower at high light than at medium light.",
      "The low-light group grew some algae.",
      "The light levels had names.",
      "The growth was recorded in units.",
    ],
    answer: "Growth was lower at high light than at medium light.",
    difficulty: 9,
    visualSummary: "The trend is not always increasing.",
  }),
  scienceEvidenceBuildQuestion({
    question: "What is the best reason to blind the person scoring samples?",
    displayText: "A student rates how clean cloth samples are after washing with different soaps.",
    options: [
      "It reduces the chance that expectations affect the ratings.",
      "It makes the soap stronger.",
      "It means no data must be recorded.",
      "It changes the amount of dirt on each cloth.",
    ],
    answer: "It reduces the chance that expectations affect the ratings.",
    difficulty: 9,
    visualSummary: "Blinding can reduce observer bias.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which explanation fits all the data?",
    visualHtml: buildScienceTableCard("Plant watering test", [
      ["Water per day", "Average height"],
      ["50 mL", "12 cm"],
      ["100 mL", "20 cm"],
      ["200 mL", "18 cm"],
    ]),
    options: [
      "Some water helped, but too much water may have reduced growth.",
      "More water always made plants taller.",
      "Water never affected growth.",
      "The least water made the tallest plants.",
    ],
    answer: "Some water helped, but too much water may have reduced growth.",
    difficulty: 9,
    visualSummary: "The middle water amount had the tallest plants.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which data would help test if the result is reproducible?",
    displayText: "One group reports that a paper airplane design flew 15 meters.",
    options: [
      "Results from other groups using the same design and method",
      "The favorite color of the group",
      "A drawing of a plane that was not tested",
      "The lunch menu from test day",
    ],
    answer: "Results from other groups using the same design and method",
    difficulty: 9,
    visualSummary: "Reproducible results happen again with the same method.",
  }),

  // Level 10: nuanced evidence evaluation, causality, and revision.
  scienceEvidenceBuildQuestion({
    question: "Which claim is most justified by the evidence?",
    displayText: "A randomized test gives 50 plants fertilizer and 50 plants no fertilizer. Both groups use the same seed type, soil, light, and water. Fertilized plants average 24 cm; control plants average 18 cm.",
    options: [
      "In this test, fertilizer caused higher average growth under these conditions.",
      "Fertilizer always makes every plant exactly 24 cm tall.",
      "Soil, light, and water were not controlled.",
      "The control plants grew taller than the fertilized plants.",
    ],
    answer: "In this test, fertilizer caused higher average growth under these conditions.",
    difficulty: 10,
    visualSummary: "A randomized controlled test can support a causal claim within its conditions.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which limitation should be included in the conclusion?",
    displayText: "A battery test used one brand-new flashlight and one old flashlight to compare two battery brands.",
    options: [
      "Flashlight condition may have affected how long the batteries lasted.",
      "The batteries were compared using light.",
      "The test had too many identical flashlights.",
      "Battery life cannot be measured with time.",
    ],
    answer: "Flashlight condition may have affected how long the batteries lasted.",
    difficulty: 10,
    visualSummary: "The flashlight condition is a confounding variable.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which revision best matches the evidence?",
    displayText: "Original claim: More sugar always makes yeast produce more gas. New data: 0 tsp = 0 cm, 1 tsp = 6 cm, 2 tsp = 11 cm, 4 tsp = 10 cm.",
    options: [
      "More sugar increased gas up to 2 tsp, but more than that did not increase it in this test.",
      "Sugar never affected gas production.",
      "Four teaspoons produced the most gas by far.",
      "Yeast produced gas without any sugar.",
    ],
    answer: "More sugar increased gas up to 2 tsp, but more than that did not increase it in this test.",
    difficulty: 10,
    visualSummary: "The evidence supports a limited, revised claim.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which statement best evaluates the evidence?",
    displayText: "Two studies test the same sunscreen. One is a controlled test with 300 people. One is a testimonial from one person who liked it.",
    options: [
      "The controlled test with 300 people is stronger evidence.",
      "The testimonial is stronger because it is shorter.",
      "Both sources are exactly equal evidence.",
      "No evidence can compare sunscreens.",
    ],
    answer: "The controlled test with 300 people is stronger evidence.",
    difficulty: 10,
    visualSummary: "Controlled studies with larger samples usually give stronger evidence.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which analysis best explains the uncertainty?",
    visualHtml: buildScienceTableCard("Average distances", [
      ["Plane", "Average distance", "Range"],
      ["A", "10 m", "9-11 m"],
      ["B", "11 m", "5-17 m"],
    ]),
    options: [
      "Plane B has a higher average, but its results are much less consistent.",
      "Plane A definitely always flies farther.",
      "Plane B has no variation at all.",
      "The range does not tell anything about consistency.",
    ],
    answer: "Plane B has a higher average, but its results are much less consistent.",
    difficulty: 10,
    visualSummary: "A wide range means more variability.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which change would best isolate the effect of temperature?",
    displayText: "A student tests dissolving sugar in cold water stirred slowly and hot water stirred quickly.",
    options: [
      "Use the same stirring speed and change only the water temperature.",
      "Use different amounts of sugar in each cup.",
      "Change cup size, water amount, and stirring speed too.",
      "Do not record how long dissolving takes.",
    ],
    answer: "Use the same stirring speed and change only the water temperature.",
    difficulty: 10,
    visualSummary: "Only temperature should change to isolate its effect.",
  }),
  scienceEvidenceBuildQuestion({
    question: "What would most help determine whether the effect is real rather than random?",
    displayText: "A small test shows Plant Food A averages 1 cm taller than Plant Food B after one week.",
    options: [
      "Use more plants, repeat the test, and compare the variation in results.",
      "Pick the answer that sounds best.",
      "Measure only the tallest Plant Food A plant.",
      "Stop the test before Plant Food B grows.",
    ],
    answer: "Use more plants, repeat the test, and compare the variation in results.",
    difficulty: 10,
    visualSummary: "Replication, sample size, and variation help judge whether an effect is real.",
  }),
  scienceEvidenceBuildQuestion({
    question: "Which conclusion correctly separates evidence from opinion?",
    displayText: "Data: Filter A removed 92% of particles. Filter B removed 85% of particles. Opinion: Filter B looks nicer.",
    options: [
      "Filter A removed more particles, while appearance is an opinion.",
      "Filter B removed more particles because it looks nicer.",
      "The nicer-looking filter must work better.",
      "Particle removal is only an opinion.",
    ],
    answer: "Filter A removed more particles, while appearance is an opinion.",
    difficulty: 10,
    visualSummary: "Particle removal is measured evidence; appearance preference is opinion.",
  }),
];

function createScienceEvidenceGeneratedEntry(difficulty) {
  const level = clampScienceEvidenceDifficulty(difficulty);
  const generators = {
    1: [createFairTestQuestion, createVariableQuestion, createEvidenceQuestion, createObservationQuestion],
    2: [createDataTableQuestion, createFairTestQuestion, createEvidenceQuestion, createSimpleControlQuestion],
    3: [createClaimEvidenceQuestion, createDataTableQuestion, createVariableQuestion, createObservationQuestion],
    4: [createPredictionQuestion, createClaimEvidenceQuestion, createDependentVariableQuestion, createInferenceQuestion],
    5: [createInterpretationQuestion, createPredictionQuestion, createClaimEvidenceQuestion, createReliabilityQuestion],
    6: [createRepeatedTrialsQuestion, scienceEvidenceCreateAverageQuestion, createOutlierQuestion, createSampleSizeQuestion],
    7: [createControlGroupQuestion, createConfoundingQuestion, createConsistencyQuestion, createCorrelationQuestion],
    8: [createPrecisionQuestion, createBiasQuestion, createModelLimitQuestion, createTrendShapeQuestion],
    9: [createAdvancedDesignQuestion, createCompetingExplanationQuestion, createReproducibilityQuestion, createBlindingQuestion],
    10: [createCausalClaimQuestion, createLimitationQuestion, createRevisionQuestion, createUncertaintyQuestion],
  }[level] || [createInterpretationQuestion];

  return scienceEvidenceRandomChoice(generators)(level);
}

function createFairTestQuestion(difficulty = 1) {
  const contexts = [
    {
      question: "What should stay the same to make the test fair?",
      displayText: "A student compares two paper towels by seeing which one soaks up more water.",
      options: ["The amount of water", "The paper towel brand", "The color of the towel", "The student's favorite number"],
      answer: "The amount of water",
      visualSummary: "The amount of water should stay the same.",
    },
    {
      question: "What should stay the same to make the test fair?",
      displayText: "A class compares two balls to see which bounces higher.",
      options: ["The height they are dropped from", "The kind of ball", "The bounce height", "The ball label"],
      answer: "The height they are dropped from",
      visualSummary: "Drop height should stay the same when comparing balls.",
    },
    {
      question: "What should stay the same to make the test fair?",
      displayText: "A student compares how fast two ice cubes melt in different places.",
      options: ["The size of each ice cube", "The location", "The melting time", "The student's guess"],
      answer: "The size of each ice cube",
      visualSummary: "Ice cube size should stay the same.",
    },
  ];

  return scienceEvidenceBuildQuestion({ ...scienceEvidenceRandomChoice(contexts), difficulty });
}

function createVariableQuestion(difficulty = 1) {
  const contexts = [
    {
      question: "What variable changed?",
      visualHtml: buildScienceTableCard("Plant test", [
        ["Cup", "Sunlight"],
        ["A", "2 hours"],
        ["B", "4 hours"],
        ["C", "6 hours"],
      ]),
      options: ["The amount of sunlight", "The kind of seed", "The color of the cup", "The table shape"],
      answer: "The amount of sunlight",
      visualSummary: "The amount of sunlight changed.",
    },
    {
      question: "What variable changed?",
      visualHtml: buildScienceTableCard("Ramp test", [
        ["Trial", "Ramp height"],
        ["A", "10 cm"],
        ["B", "20 cm"],
        ["C", "30 cm"],
      ]),
      options: ["The ramp height", "The toy car", "The floor", "The ruler"],
      answer: "The ramp height",
      visualSummary: "The ramp height changed.",
    },
  ];

  return scienceEvidenceBuildQuestion({ ...scienceEvidenceRandomChoice(contexts), difficulty });
}

function createEvidenceQuestion(difficulty = 2) {
  const contexts = [
    {
      question: "Which evidence supports the claim?",
      displayText: "Claim: Plants with sunlight grow taller than plants in the dark.",
      options: [
        "The plant in sunlight was taller",
        "The dark plant was painted blue",
        "Both plants were watered by the same person",
        "The pots were the same size",
      ],
      answer: "The plant in sunlight was taller",
      visualSummary: "The taller plant is evidence.",
    },
    {
      question: "Which evidence supports the claim?",
      displayText: "Claim: The covered cup kept water warmer.",
      options: [
        "The covered cup measured 45°C and the open cup measured 35°C",
        "Both cups were on the same table",
        "The covered cup had a lid",
        "The cups were used in science class",
      ],
      answer: "The covered cup measured 45°C and the open cup measured 35°C",
      visualSummary: "The covered cup had the higher temperature.",
    },
  ];

  return scienceEvidenceBuildQuestion({ ...scienceEvidenceRandomChoice(contexts), difficulty });
}

function createDataTableQuestion(difficulty = 2) {
  const contexts = [
    {
      question: "What does the table show?",
      visualHtml: buildScienceTableCard("Bean heights", [
        ["Day", "Height"],
        ["2", "3 cm"],
        ["4", "5 cm"],
        ["6", "7 cm"],
      ]),
      options: [
        "The bean plant grew over time",
        "The bean plant got smaller",
        "The bean plant stayed the same size",
        "The bean plant disappeared",
      ],
      answer: "The bean plant grew over time",
      visualSummary: "The heights increased over time.",
    },
    {
      question: "What does the table show?",
      visualHtml: buildScienceTableCard("Cooling water", [
        ["Minute", "Temperature"],
        ["0", "60°C"],
        ["5", "52°C"],
        ["10", "45°C"],
      ]),
      options: ["The water cooled over time", "The water warmed over time", "The water stayed 60°C", "The water turned into soil"],
      answer: "The water cooled over time",
      visualSummary: "The temperature decreased over time.",
    },
  ];

  return scienceEvidenceBuildQuestion({ ...scienceEvidenceRandomChoice(contexts), difficulty });
}

function createObservationQuestion(difficulty = 3) {
  const contexts = [
    {
      question: "Which sentence is an observation?",
      options: ["The water is clear", "The water must taste sweet", "The water wants to sleep", "The water is probably angry"],
      answer: "The water is clear",
      visualSummary: "An observation uses senses or measurements.",
    },
    {
      question: "Which sentence is an observation?",
      options: ["The rock has black stripes", "The rock is lucky", "The rock wants to roll", "The rock is secretly alive"],
      answer: "The rock has black stripes",
      visualSummary: "Black stripes can be seen.",
    },
  ];

  return scienceEvidenceBuildQuestion({ ...scienceEvidenceRandomChoice(contexts), difficulty });
}

function createSimpleControlQuestion(difficulty = 2) {
  return scienceEvidenceBuildQuestion({
    question: "What should be kept the same in this test?",
    displayText: "A student tests whether salt water or plain water freezes faster.",
    options: ["The amount of water in each cup", "Whether salt is added", "The time to freeze", "The result she expects"],
    answer: "The amount of water in each cup",
    difficulty,
    visualSummary: "Water amount should be controlled while salt changes.",
  });
}

function createClaimEvidenceQuestion(difficulty = 4) {
  const contexts = [
    {
      question: "Which claim is supported by the evidence?",
      visualHtml: buildScienceTableCard("Ice melt test", [
        ["Place", "Time to melt"],
        ["Sunny window", "11 minutes"],
        ["Shady shelf", "24 minutes"],
      ]),
      options: [
        "Ice melted faster in the sunny window",
        "Ice never melts",
        "The shelf was hotter than the window",
        "The ice was measured with a ruler",
      ],
      answer: "Ice melted faster in the sunny window",
      visualSummary: "The sunny-window ice melted in less time.",
    },
    {
      question: "Which claim is supported by the evidence?",
      visualHtml: buildScienceTableCard("Seed type test", [
        ["Seed", "Sprouted"],
        ["A", "18 of 20"],
        ["B", "9 of 20"],
      ]),
      options: ["Seed A sprouted more often", "Seed B sprouted more often", "No seeds sprouted", "Both seeds sprouted exactly equally"],
      answer: "Seed A sprouted more often",
      visualSummary: "18 of 20 is more than 9 of 20.",
    },
  ];

  return scienceEvidenceBuildQuestion({ ...scienceEvidenceRandomChoice(contexts), difficulty });
}

function createPredictionQuestion(difficulty = 4) {
  const contexts = [
    {
      question: "What is the best prediction?",
      displayText: "A student moves one plant to sunlight and keeps another in the dark.",
      options: [
        "The plant in sunlight may grow taller",
        "The dark plant will become a car",
        "Both plants will stop needing water",
        "The sunlight plant will turn into a rock",
      ],
      answer: "The plant in sunlight may grow taller",
      visualSummary: "Sunlight may help the plant grow taller.",
    },
    {
      question: "What is the best prediction from the pattern?",
      visualHtml: buildScienceTableCard("Cooling test", [
        ["Minutes", "Temperature"],
        ["0", "30°C"],
        ["5", "25°C"],
        ["10", "20°C"],
      ]),
      options: ["At 15 minutes it may be cooler", "At 15 minutes it must be 80°C", "The water will turn to wood", "Time will stop"],
      answer: "At 15 minutes it may be cooler",
      visualSummary: "The temperature is decreasing.",
    },
  ];

  return scienceEvidenceBuildQuestion({ ...scienceEvidenceRandomChoice(contexts), difficulty });
}

function createDependentVariableQuestion(difficulty = 4) {
  return scienceEvidenceBuildQuestion({
    question: "What is the dependent variable?",
    displayText: "A student changes ramp height and measures how far a toy car rolls.",
    options: ["How far the toy car rolls", "The ramp height", "The color of the car", "The student's notebook"],
    answer: "How far the toy car rolls",
    difficulty,
    visualSummary: "The dependent variable is the measured result.",
  });
}

function createInferenceQuestion(difficulty = 4) {
  return scienceEvidenceBuildQuestion({
    question: "Which sentence is an inference?",
    displayText: "There are wet paw prints leading away from a water bowl.",
    options: [
      "A pet may have walked through spilled water",
      "There are wet paw prints",
      "The water bowl is on the floor",
      "The prints are near the bowl",
    ],
    answer: "A pet may have walked through spilled water",
    difficulty,
    visualSummary: "An inference explains observations.",
  });
}

function createInterpretationQuestion(difficulty = 5) {
  const contexts = [
    {
      question: "Which conclusion fits the data best?",
      visualHtml: buildScienceTableCard("Snail race", [
        ["Surface", "Time to cross"],
        ["Grass", "35 seconds"],
        ["Tile", "20 seconds"],
      ]),
      options: [
        "The snail moved faster on tile",
        "The snail moved slower on tile",
        "The snail did not move at all",
        "The grass was made of metal",
      ],
      answer: "The snail moved faster on tile",
      visualSummary: "The shorter time on tile shows faster movement.",
    },
    {
      question: "Which conclusion fits the data best?",
      visualHtml: buildScienceTableCard("Cup insulation", [
        ["Cup", "Temperature after 15 min"],
        ["Paper", "40°C"],
        ["Foam", "49°C"],
        ["Metal", "35°C"],
      ]),
      options: ["The foam cup kept water warmest", "The metal cup kept water warmest", "All cups were equal", "The paper cup became ice"],
      answer: "The foam cup kept water warmest",
      visualSummary: "The foam cup had the highest final temperature.",
    },
  ];

  return scienceEvidenceBuildQuestion({ ...scienceEvidenceRandomChoice(contexts), difficulty });
}

function createReliabilityQuestion(difficulty = 5) {
  return scienceEvidenceBuildQuestion({
    question: "Which evidence is more reliable?",
    options: [
      "Measurements from many trials that show a similar pattern",
      "One trial with no measurements written down",
      "A guess from a friend",
      "A result chosen before doing the test",
    ],
    answer: "Measurements from many trials that show a similar pattern",
    difficulty,
    visualSummary: "Repeated measurements make evidence more reliable.",
  });
}

function createRepeatedTrialsQuestion(difficulty = 6) {
  return scienceEvidenceBuildQuestion({
    question: "Why should this test be repeated?",
    displayText: "One trial showed that a toy car rolled 4 meters.",
    options: [
      "To check whether the result happens again",
      "To make the car a different color",
      "To avoid recording data",
      "To prove the answer before measuring",
    ],
    answer: "To check whether the result happens again",
    difficulty,
    visualSummary: "Repeating helps test reliability.",
  });
}

function scienceEvidenceCreateAverageQuestion(difficulty = 6) {
  return scienceEvidenceBuildQuestion({
    question: "What average best represents the trials?",
    visualHtml: buildScienceTableCard("Flight distance", [
      ["Trial", "Distance"],
      ["1", "6 m"],
      ["2", "8 m"],
      ["3", "7 m"],
    ]),
    options: ["7 m", "3 m", "14 m", "21 m"],
    answer: "7 m",
    difficulty,
    visualSummary: "6, 8, and 7 average to 7.",
  });
}

function createOutlierQuestion(difficulty = 6) {
  return scienceEvidenceBuildQuestion({
    question: "Which result should be checked because it is very different?",
    visualHtml: buildScienceTableCard("Plant heights", [
      ["Trial", "Height"],
      ["1", "16 cm"],
      ["2", "15 cm"],
      ["3", "3 cm"],
      ["4", "17 cm"],
    ]),
    options: ["Trial 3", "Trial 1", "Trial 2", "Trial 4"],
    answer: "Trial 3",
    difficulty,
    visualSummary: "Trial 3 is far from the other heights.",
  });
}

function createSampleSizeQuestion(difficulty = 6) {
  return scienceEvidenceBuildQuestion({
    question: "Which change would make the evidence stronger?",
    displayText: "A class tests only one seed of each type.",
    options: ["Test many seeds of each type", "Use no ruler", "Water one type only", "Throw away the data"],
    answer: "Test many seeds of each type",
    difficulty,
    visualSummary: "A larger sample makes conclusions stronger.",
  });
}

function createControlGroupQuestion(difficulty = 7) {
  return scienceEvidenceBuildQuestion({
    question: "Why is a no-treatment group useful?",
    displayText: "A class tests whether plant food changes plant growth.",
    options: [
      "It gives a comparison for what happens without plant food",
      "It makes plant food unnecessary to measure",
      "It proves the result before the experiment",
      "It changes every variable at once",
    ],
    answer: "It gives a comparison for what happens without plant food",
    difficulty,
    visualSummary: "A control group shows what happens without the treatment.",
  });
}

function createConfoundingQuestion(difficulty = 7) {
  return scienceEvidenceBuildQuestion({
    question: "Which problem makes this test hard to interpret?",
    displayText: "Plants with extra water are kept near a sunny window. Plants with less water are kept in a shady corner.",
    options: [
      "Water and light both changed",
      "The plants were measured",
      "The plants had leaves",
      "The test used two groups",
    ],
    answer: "Water and light both changed",
    difficulty,
    visualSummary: "Changing two variables makes it hard to know the cause.",
  });
}

function createConsistencyQuestion(difficulty = 7) {
  return scienceEvidenceBuildQuestion({
    question: "Which data set is most consistent?",
    options: ["9 cm, 10 cm, 9 cm, 10 cm", "2 cm, 30 cm, 5 cm, 40 cm", "1 cm, 20 cm, 2 cm, 25 cm", "6 cm, 6 cm, 6 cm, 50 cm"],
    answer: "9 cm, 10 cm, 9 cm, 10 cm",
    difficulty,
    visualSummary: "The consistent values are close together.",
  });
}

function createCorrelationQuestion(difficulty = 7) {
  return scienceEvidenceBuildQuestion({
    question: "Which explanation avoids confusing correlation with causation?",
    displayText: "On hot days, more people buy cold drinks and more people use sunscreen.",
    options: [
      "Hot weather may cause both patterns",
      "Cold drinks must cause sunscreen use",
      "Sunscreen must cause cold drink sales",
      "The two patterns cannot be related",
    ],
    answer: "Hot weather may cause both patterns",
    difficulty,
    visualSummary: "A third factor can explain both observations.",
  });
}

function createPrecisionQuestion(difficulty = 8) {
  return scienceEvidenceBuildQuestion({
    question: "Which measurement is most precise?",
    options: ["12.6 cm", "About 13 cm", "Between 10 and 15 cm", "Long"],
    answer: "12.6 cm",
    difficulty,
    visualSummary: "12.6 cm is the most exact value.",
  });
}

function createBiasQuestion(difficulty = 8) {
  return scienceEvidenceBuildQuestion({
    question: "Which sample is least biased?",
    displayText: "A student wants to know which playground game the whole school prefers.",
    options: [
      "A random mix of students from different grades",
      "Only students already playing soccer",
      "Only the student's closest friends",
      "Only students who dislike recess",
    ],
    answer: "A random mix of students from different grades",
    difficulty,
    visualSummary: "A random mixed sample represents the school better.",
  });
}

function createModelLimitQuestion(difficulty = 8) {
  return scienceEvidenceBuildQuestion({
    question: "Which statement best describes a model's limitation?",
    displayText: "A small paper bridge model holds 1 kg.",
    options: [
      "It can compare designs but may not act exactly like a real bridge",
      "It proves all real bridges hold exactly 1 kg",
      "Models are never useful",
      "Paper and steel always behave the same",
    ],
    answer: "It can compare designs but may not act exactly like a real bridge",
    difficulty,
    visualSummary: "Models help scientists reason, but they have limits.",
  });
}

function createTrendShapeQuestion(difficulty = 8) {
  return scienceEvidenceBuildQuestion({
    question: "Which statement best describes the trend?",
    visualHtml: buildScienceTableCard("Fertilizer amount", [
      ["Fertilizer", "Average height"],
      ["0 g", "12 cm"],
      ["5 g", "18 cm"],
      ["10 g", "21 cm"],
      ["20 g", "20 cm"],
    ]),
    options: [
      "Height increased at first, then did not increase further",
      "Height decreased every time",
      "The most fertilizer always gave the tallest plants",
      "Fertilizer had no relationship to height",
    ],
    answer: "Height increased at first, then did not increase further",
    difficulty,
    visualSummary: "Growth rose from 0 to 10 g, then leveled off or dipped.",
  });
}

function createAdvancedDesignQuestion(difficulty = 9) {
  return scienceEvidenceBuildQuestion({
    question: "Which design best tests one variable?",
    displayText: "A scientist wants to know whether water temperature changes how fast sugar dissolves.",
    options: [
      "Same sugar amount, same stirring, different water temperatures",
      "Different sugar amounts, different stirring, different temperatures",
      "Hot water in a large cup and cold water in a tiny cup",
      "One cup with no timing or measurements",
    ],
    answer: "Same sugar amount, same stirring, different water temperatures",
    difficulty,
    visualSummary: "The best design changes only temperature.",
  });
}

function createCompetingExplanationQuestion(difficulty = 9) {
  return scienceEvidenceBuildQuestion({
    question: "Which is a competing explanation?",
    displayText: "Plants near the window grew taller than plants far from the window. The window area was also warmer.",
    options: [
      "Warmer temperature may have helped growth",
      "Plant height was measured",
      "The plants were green",
      "The window was made of glass",
    ],
    answer: "Warmer temperature may have helped growth",
    difficulty,
    visualSummary: "Temperature could explain the growth difference too.",
  });
}

function createReproducibilityQuestion(difficulty = 9) {
  return scienceEvidenceBuildQuestion({
    question: "What would show the result is reproducible?",
    displayText: "One team finds that Plane B flies farthest.",
    options: [
      "Other teams using the same method also find Plane B flies farthest",
      "One team changes the method and gets no data",
      "A student likes Plane B's color",
      "The result is written in bigger letters",
    ],
    answer: "Other teams using the same method also find Plane B flies farthest",
    difficulty,
    visualSummary: "Reproducible results can be repeated by others.",
  });
}

function createBlindingQuestion(difficulty = 9) {
  return scienceEvidenceBuildQuestion({
    question: "Why might scientists hide which sample is which while scoring results?",
    options: [
      "To reduce bias from expectations",
      "To make the samples disappear",
      "To avoid collecting data",
      "To guarantee every result is the same",
    ],
    answer: "To reduce bias from expectations",
    difficulty,
    visualSummary: "Blinding can reduce observer bias.",
  });
}

function createCausalClaimQuestion(difficulty = 10) {
  return scienceEvidenceBuildQuestion({
    question: "Which evidence best supports a causal claim?",
    options: [
      "A randomized controlled test where only one variable changes",
      "A single story from one person",
      "A pattern with many uncontrolled differences",
      "A guess made before measuring anything",
    ],
    answer: "A randomized controlled test where only one variable changes",
    difficulty,
    visualSummary: "Controlled experiments are strongest for causality.",
  });
}

function createLimitationQuestion(difficulty = 10) {
  return scienceEvidenceBuildQuestion({
    question: "Which limitation should be reported?",
    displayText: "A seed test used only one seed of each type and lasted two days.",
    options: [
      "The sample was very small and the test was short",
      "The test used seeds",
      "The question was scientific",
      "The result had numbers",
    ],
    answer: "The sample was very small and the test was short",
    difficulty,
    visualSummary: "Small samples and short tests limit conclusions.",
  });
}

function createRevisionQuestion(difficulty = 10) {
  return scienceEvidenceBuildQuestion({
    question: "Which revised claim best matches the evidence?",
    displayText: "Claim: More water always makes plants taller. Data: 50 mL = 12 cm, 100 mL = 20 cm, 200 mL = 18 cm.",
    options: [
      "Plant height increased up to 100 mL, then decreased at 200 mL in this test",
      "More water always made plants taller",
      "Water never affected plant height",
      "The 50 mL plants were tallest",
    ],
    answer: "Plant height increased up to 100 mL, then decreased at 200 mL in this test",
    difficulty,
    visualSummary: "The evidence requires a more specific claim.",
  });
}

function createUncertaintyQuestion(difficulty = 10) {
  return scienceEvidenceBuildQuestion({
    question: "Which statement best accounts for uncertainty?",
    visualHtml: buildScienceTableCard("Average bounce height", [
      ["Ball", "Average", "Range"],
      ["A", "80 cm", "78-82 cm"],
      ["B", "83 cm", "60-106 cm"],
    ]),
    options: [
      "Ball B has a higher average but much more variation",
      "Ball A is always lower by exactly 3 cm",
      "Ball B has no uncertainty",
      "Ranges are not data",
    ],
    answer: "Ball B has a higher average but much more variation",
    difficulty,
    visualSummary: "A wider range means more uncertainty or variability.",
  });
}

function scienceEvidenceBuildQuestion({
  question,
  options,
  answer,
  difficulty,
  displayText = "",
  visualHtml = "",
  visualSummary = "",
}) {
  const normalizedOptions = Array.from(new Set((options || []).map((option) => String(option))));
  const normalizedAnswer = String(answer || "");

  if (!String(question || "").trim()) {
    throw new Error("Science evidence question is missing question text.");
  }

  if (normalizedOptions.length !== 4 || !normalizedOptions.includes(normalizedAnswer)) {
    throw new Error("Science evidence questions require exactly 4 unique options with one answer.");
  }

  return {
    question: String(question),
    displayText: String(displayText || ""),
    visualHtml: String(visualHtml || ""),
    options: scienceEvidenceShuffleArray(normalizedOptions),
    answer: normalizedAnswer,
    difficulty: clampScienceEvidenceDifficulty(difficulty),
    visualSummary: String(visualSummary || ""),
    type: "science-evidence-choice",
  };
}

function buildScienceTableCard(title, rows) {
  const header = rows[0] || [];
  const bodyRows = rows.slice(1);
  const headerHtml = `<tr>${header.map((cell) => `<th style="${scienceEvidenceCellStyle(true)}">${scienceEvidenceEscapeHtml(cell)}</th>`).join("")}</tr>`;
  const bodyHtml = bodyRows
    .map(
      (row) =>
        `<tr>${row.map((cell) => `<td style="${scienceEvidenceCellStyle(false)}">${scienceEvidenceEscapeHtml(cell)}</td>`).join("")}</tr>`
    )
    .join("");

  return `
    <div style="
      max-width: 620px;
      padding: 14px 16px;
      border: 2px solid #274972;
      border-radius: 16px;
      background: linear-gradient(180deg, #f8fbff 0%, #eef5ff 100%);
      color: #274972;
      font-family: Arial, sans-serif;
    ">
      <div style="font-weight: 700; margin-bottom: 10px;">${scienceEvidenceEscapeHtml(title)}</div>
      <table style="border-collapse: collapse; width: 100%; font-size: 14px;">
        <tbody>
          ${headerHtml}
          ${bodyHtml}
        </tbody>
      </table>
    </div>
  `;
}

function scienceEvidenceCellStyle(isHeader) {
  return [
    "border: 1px solid #9fb3c8",
    "padding: 6px 8px",
    "text-align: left",
    "background: " + (isHeader ? "#dfeaf7" : "#ffffff"),
    isHeader ? "font-weight: 700" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

function clampScienceEvidenceDifficulty(value) {
  const level = Number.parseInt(value, 10);
  if (!Number.isFinite(level)) {
    return 3;
  }

  return Math.min(10, Math.max(1, level));
}

function scienceEvidenceEscapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function scienceEvidenceRandomChoice(values) {
  return values[Math.floor(Math.random() * values.length)];
}

function scienceEvidenceShuffleArray(values) {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

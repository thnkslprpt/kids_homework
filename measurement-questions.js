const MEASUREMENT_QUESTIONS = [
  {
    question: "Which unit is best for measuring the length of a pencil?",
    options: ["Centimeters", "Kilograms", "Liters", "Hours"],
    answer: "Centimeters",
    difficulty: 1,
  },
  {
    question: "How many centimeters are in 1 meter?",
    options: ["10", "100", "1,000", "10,000"],
    answer: "100",
    difficulty: 1,
  },
  {
    question: "Which holds more liquid?",
    options: ["600 milliliters", "1 liter", "They are equal", "It depends on the color"],
    answer: "1 liter",
    difficulty: 2,
  },
  {
    question: "How many grams are in 1 kilogram?",
    options: ["100", "500", "1,000", "10,000"],
    answer: "1,000",
    difficulty: 2,
  },
  {
    question: "2 meters is the same as how many centimeters?",
    options: ["20", "200", "2,000", "20,000"],
    answer: "200",
    difficulty: 3,
  },
  {
    question: "Which is the best estimate for the mass of a school backpack?",
    options: ["About 5 kilograms", "About 5 grams", "About 50 kilograms", "About 500 kilograms"],
    answer: "About 5 kilograms",
    difficulty: 3,
  },
  {
    question: "1,500 milliliters is the same as:",
    options: ["0.15 liters", "1.5 liters", "15 liters", "150 liters"],
    answer: "1.5 liters",
    difficulty: 4,
  },
  {
    question: "Which temperature is closest to a warm room?",
    options: ["About 0°C", "About 10°C", "About 22°C", "About 80°C"],
    answer: "About 22°C",
    difficulty: 4,
  },
  {
    question: "2.5 kilograms is the same as:",
    options: ["250 grams", "2,050 grams", "2,500 grams", "25,000 grams"],
    answer: "2,500 grams",
    difficulty: 5,
  },
  {
    question: "A recipe needs 2 liters of water. How many 500-milliliter bottles is that?",
    options: ["2 bottles", "3 bottles", "4 bottles", "5 bottles"],
    answer: "4 bottles",
    difficulty: 5,
  },
  {
    question: "Which unit is best for measuring the mass of an apple?",
    options: ["Grams", "Liters", "Meters", "Hours"],
    answer: "Grams",
    difficulty: 1,
  },
  {
    question: "Which unit is best for measuring milk in a bottle?",
    options: ["Liters", "Kilometers", "Kilograms", "Minutes"],
    answer: "Liters",
    difficulty: 1,
  },
  {
    question: "3 kilograms is the same as how many grams?",
    options: ["300", "3,000", "30,000", "300,000"],
    answer: "3,000",
    difficulty: 2,
  },
  {
    question: "Which is longer?",
    options: ["2 meters", "180 centimeters", "They are equal", "It depends on the color"],
    answer: "2 meters",
    difficulty: 2,
  },
  {
    question: "750 milliliters plus 250 milliliters equals:",
    options: ["500 milliliters", "900 milliliters", "1 liter", "2 liters"],
    answer: "1 liter",
    difficulty: 3,
  },
  {
    question: "What tool is used to measure temperature?",
    options: ["Thermometer", "Compass", "Scale bar", "Stopwatch"],
    answer: "Thermometer",
    difficulty: 3,
  },
  {
    question: "250 centimeters is the same as:",
    options: ["0.25 meters", "2.5 meters", "25 meters", "250 meters"],
    answer: "2.5 meters",
    difficulty: 4,
  },
  {
    question: "Which is the best estimate for the height of a door?",
    options: ["About 20 centimeters", "About 2 meters", "About 20 meters", "About 200 meters"],
    answer: "About 2 meters",
    difficulty: 4,
  },
  {
    question: "1.25 liters is the same as:",
    options: ["125 milliliters", "1,025 milliliters", "1,250 milliliters", "12,500 milliliters"],
    answer: "1,250 milliliters",
    difficulty: 5,
  },
  {
    question: "500 centimeters is the same as:",
    options: ["0.5 meters", "5 meters", "50 meters", "500 meters"],
    answer: "5 meters",
    difficulty: 5,
  },
  {
    question: "Which unit is best for measuring the length of a classroom?",
    options: ["Meters", "Grams", "Liters", "Seconds"],
    answer: "Meters",
    difficulty: 1,
  },
  {
    question: "Which tool measures how heavy something is?",
    options: ["Scale", "Ruler", "Thermometer", "Clock"],
    answer: "Scale",
    difficulty: 1,
  },
  {
    question: "1000 milliliters is the same as:",
    options: ["1 liter", "10 liters", "100 liters", "1,000 liters"],
    answer: "1 liter",
    difficulty: 2,
  },
  {
    question: "Which is the better estimate for the mass of a watermelon?",
    options: ["About 3 grams", "About 3 kilograms", "About 30 kilograms", "About 300 kilograms"],
    answer: "About 3 kilograms",
    difficulty: 2,
  },
  {
    question: "4 meters is the same as how many centimeters?",
    options: ["40", "400", "4,000", "400,000"],
    answer: "400",
    difficulty: 3,
  },
  {
    question: "Which is the best estimate for the amount of water in a bathtub?",
    options: ["About 5 milliliters", "About 5 liters", "About 50 liters", "About 500 liters"],
    answer: "About 50 liters",
    difficulty: 3,
  },
  {
    question: "2 liters plus 500 milliliters equals:",
    options: ["2.5 liters", "3 liters", "3.5 liters", "4 liters"],
    answer: "2.5 liters",
    difficulty: 4,
  },
  {
    question: "Which temperature is coldest?",
    options: ["5°C", "15°C", "25°C", "35°C"],
    answer: "5°C",
    difficulty: 4,
  },
  {
    question: "750 grams is the same as:",
    options: ["75 grams", "0.75 kilograms", "7.5 kilograms", "750 kilograms"],
    answer: "0.75 kilograms",
    difficulty: 5,
  },
  {
    question: "3.2 meters is the same as:",
    options: ["32 centimeters", "320 centimeters", "3,200 centimeters", "32,000 centimeters"],
    answer: "320 centimeters",
    difficulty: 5,
  },
  {
    question: "Which unit is best for measuring the amount of juice in a cup?",
    options: ["Milliliters", "Kilometers", "Grams", "Hours"],
    answer: "Milliliters",
    difficulty: 1,
  },
  {
    question: "How many grams are in 2 kilograms?",
    options: ["20", "200", "2,000", "20,000"],
    answer: "2,000",
    difficulty: 1,
  },
  {
    question: "Which is longer: 150 centimeters or 1 meter?",
    options: ["150 centimeters", "1 meter", "They are equal", "It depends on the color"],
    answer: "150 centimeters",
    difficulty: 2,
  },
  {
    question: "Which is the best estimate for the mass of a pencil?",
    options: ["About 1 gram", "About 10 grams", "About 1 kilogram", "About 10 kilograms"],
    answer: "About 10 grams",
    difficulty: 2,
  },
  {
    question: "600 milliliters plus 400 milliliters equals:",
    options: ["500 milliliters", "1 liter", "2 liters", "5 liters"],
    answer: "1 liter",
    difficulty: 3,
  },
  {
    question: "Which tool measures how long a table is?",
    options: ["Ruler or tape measure", "Thermometer", "Cup", "Clock"],
    answer: "Ruler or tape measure",
    difficulty: 3,
  },
  {
    question: "1.5 kilograms is the same as:",
    options: ["150 grams", "1,050 grams", "1,500 grams", "15,000 grams"],
    answer: "1,500 grams",
    difficulty: 4,
  },
  {
    question: "Which is the best estimate for the height of a child?",
    options: ["About 1 centimeter", "About 1 meter", "About 10 meters", "About 100 meters"],
    answer: "About 1 meter",
    difficulty: 4,
  },
  {
    question: "2,250 milliliters is the same as:",
    options: ["2.25 liters", "22.5 liters", "225 liters", "0.225 liters"],
    answer: "2.25 liters",
    difficulty: 5,
  },
  {
    question: "6,000 grams is the same as:",
    options: ["6 kilograms", "60 kilograms", "600 kilograms", "6000 kilograms"],
    answer: "6 kilograms",
    difficulty: 5,
  },
];

MEASUREMENT_QUESTIONS.push(
  ...[
    {
      question: "Which unit is best for measuring the mass of a banana?",
      options: ["Grams", "Liters", "Meters", "Hours"],
      answer: "Grams",
      difficulty: 1,
    },
    {
      question: "How many centimeters are in 2 meters?",
      options: ["20", "200", "2,000", "20,000"],
      answer: "200",
      difficulty: 1,
    },
    {
      question: "Which unit is best for measuring the length of a room?",
      options: ["Meters", "Grams", "Liters", "Seconds"],
      answer: "Meters",
      difficulty: 1,
    },
    {
      question: "Which tool measures how much something weighs?",
      options: ["Scale", "Ruler", "Thermometer", "Clock"],
      answer: "Scale",
      difficulty: 1,
    },
    {
      question: "1 liter is the same as:",
      options: ["10 milliliters", "100 milliliters", "1,000 milliliters", "10,000 milliliters"],
      answer: "1,000 milliliters",
      difficulty: 1,
    },
    {
      question: "Which holds more: 900 milliliters or 1 liter?",
      options: ["900 milliliters", "1 liter", "They are equal", "It depends on the color"],
      answer: "1 liter",
      difficulty: 1,
    },
    {
      question: "Which is longer: 3 meters or 250 centimeters?",
      options: ["3 meters", "250 centimeters", "They are equal", "It depends on the color"],
      answer: "3 meters",
      difficulty: 1,
    },
    {
      question: "Which unit is best for measuring the distance between cities?",
      options: ["Kilometers", "Grams", "Liters", "Seconds"],
      answer: "Kilometers",
      difficulty: 1,
    },
    {
      question: "4 kilograms is the same as:",
      options: ["400 grams", "4,000 grams", "40,000 grams", "400,000 grams"],
      answer: "4,000 grams",
      difficulty: 2,
    },
    {
      question: "300 centimeters is the same as:",
      options: ["2 meters", "3 meters", "4 meters", "5 meters"],
      answer: "3 meters",
      difficulty: 2,
    },
    {
      question: "Which is the best estimate for the mass of an apple?",
      options: ["About 10 grams", "About 100 grams", "About 1 kilogram", "About 10 kilograms"],
      answer: "About 100 grams",
      difficulty: 2,
    },
    {
      question: "2,500 milliliters is the same as:",
      options: ["0.25 liters", "2.5 liters", "25 liters", "250 liters"],
      answer: "2.5 liters",
      difficulty: 2,
    },
    {
      question: "Which is heavier?",
      options: ["2 kilograms", "1,800 grams", "They are equal", "It depends on the color"],
      answer: "2 kilograms",
      difficulty: 2,
    },
    {
      question: "How many grams are in 3 kilograms?",
      options: ["300", "3,000", "30,000", "300,000"],
      answer: "3,000",
      difficulty: 2,
    },
    {
      question: "Which is the best estimate for the height of a chair?",
      options: ["About 10 centimeters", "About 1 meter", "About 10 meters", "About 100 meters"],
      answer: "About 1 meter",
      difficulty: 2,
    },
    {
      question: "Which is longer: 1 meter 20 centimeters or 130 centimeters?",
      options: ["1 meter 20 centimeters", "130 centimeters", "They are equal", "It depends on the color"],
      answer: "130 centimeters",
      difficulty: 2,
    },
    {
      question: "250 milliliters plus 750 milliliters equals:",
      options: ["500 milliliters", "1 liter", "2 liters", "5 liters"],
      answer: "1 liter",
      difficulty: 3,
    },
    {
      question: "How many centimeters are in 4 meters?",
      options: ["40", "400", "4,000", "40,000"],
      answer: "400",
      difficulty: 3,
    },
    {
      question: "750 grams plus 250 grams equals:",
      options: ["500 grams", "900 grams", "1 kilogram", "2 kilograms"],
      answer: "1 kilogram",
      difficulty: 3,
    },
    {
      question: "What tool measures how hot soup is?",
      options: ["Thermometer", "Compass", "Scale", "Stopwatch"],
      answer: "Thermometer",
      difficulty: 3,
    },
    {
      question: "1.5 liters is the same as:",
      options: ["150 milliliters", "1,050 milliliters", "1,500 milliliters", "15,000 milliliters"],
      answer: "1,500 milliliters",
      difficulty: 3,
    },
    {
      question: "Which is the best estimate for the mass of a backpack?",
      options: ["About 5 grams", "About 5 kilograms", "About 50 kilograms", "About 500 kilograms"],
      answer: "About 5 kilograms",
      difficulty: 3,
    },
    {
      question: "Which is longer: 4 meters or 350 centimeters?",
      options: ["4 meters", "350 centimeters", "They are equal", "It depends on the color"],
      answer: "4 meters",
      difficulty: 3,
    },
    {
      question: "900 milliliters plus 200 milliliters equals:",
      options: ["1 liter", "1.1 liters", "1.5 liters", "2 liters"],
      answer: "1.1 liters",
      difficulty: 3,
    },
    {
      question: "3.5 meters is the same as:",
      options: ["35 centimeters", "350 centimeters", "3,500 centimeters", "35,000 centimeters"],
      answer: "350 centimeters",
      difficulty: 4,
    },
    {
      question: "1,250 milliliters is the same as:",
      options: ["1.25 liters", "12.5 liters", "125 liters", "0.125 liters"],
      answer: "1.25 liters",
      difficulty: 4,
    },
    {
      question: "Which is the best estimate for the amount of water in a small bathtub?",
      options: ["About 5 liters", "About 50 liters", "About 500 liters", "About 5,000 liters"],
      answer: "About 50 liters",
      difficulty: 4,
    },
    {
      question: "6 kilograms is the same as:",
      options: ["600 grams", "6,000 grams", "60,000 grams", "600,000 grams"],
      answer: "6,000 grams",
      difficulty: 4,
    },
    {
      question: "Which temperature is colder?",
      options: ["5°C", "15°C", "25°C", "35°C"],
      answer: "5°C",
      difficulty: 4,
    },
    {
      question: "2.75 liters is the same as:",
      options: ["275 milliliters", "2,750 milliliters", "27,500 milliliters", "0.275 milliliters"],
      answer: "2,750 milliliters",
      difficulty: 4,
    },
    {
      question: "Which holds more: 750 milliliters or 1 liter?",
      options: ["750 milliliters", "1 liter", "They are equal", "It depends on the color"],
      answer: "1 liter",
      difficulty: 4,
    },
    {
      question: "7.5 kilograms is the same as:",
      options: ["750 grams", "7,500 grams", "75,000 grams", "750,000 grams"],
      answer: "7,500 grams",
      difficulty: 5,
    },
    {
      question: "3.25 liters is the same as:",
      options: ["325 milliliters", "3,250 milliliters", "32,500 milliliters", "0.325 milliliters"],
      answer: "3,250 milliliters",
      difficulty: 5,
    },
    {
      question: "Which is longer: 1.8 meters or 170 centimeters?",
      options: ["1.8 meters", "170 centimeters", "They are equal", "It depends on the color"],
      answer: "1.8 meters",
      difficulty: 5,
    },
    {
      question: "5,000 grams is the same as:",
      options: ["5 kilograms", "50 kilograms", "500 kilograms", "5,000 kilograms"],
      answer: "5 kilograms",
      difficulty: 5,
    },
    {
      question: "2.75 meters is the same as:",
      options: ["27.5 centimeters", "275 centimeters", "2,750 centimeters", "27,500 centimeters"],
      answer: "275 centimeters",
      difficulty: 5,
    },
    {
      question: "9 liters is the same as:",
      options: ["90 milliliters", "900 milliliters", "9,000 milliliters", "90,000 milliliters"],
      answer: "9,000 milliliters",
      difficulty: 5,
    },
    {
      question: "Which unit is best for measuring the amount of milk in a carton?",
      options: ["Milliliters", "Kilometers", "Grams", "Seconds"],
      answer: "Milliliters",
      difficulty: 1,
    },
    {
      question: "3 meters is the same as:",
      options: ["30 centimeters", "300 centimeters", "3,000 centimeters", "30,000 centimeters"],
      answer: "300 centimeters",
      difficulty: 2,
    },
    {
      question: "4.5 kilograms is the same as:",
      options: ["450 grams", "4,050 grams", "4,500 grams", "45,000 grams"],
      answer: "4,500 grams",
      difficulty: 4,
    },
  ]
);

function createMeasurementGeneratedEntry(difficulty) {
  const generators = {
    1: [
      () => {
        const prompts = [
          {
            item: "pencil",
            answer: "Centimeters",
            options: ["Centimeters", "Kilograms", "Liters", "Hours"],
          },
          {
            item: "apple",
            answer: "Grams",
            options: ["Grams", "Liters", "Meters", "Hours"],
          },
          {
            item: "juice in a cup",
            answer: "Milliliters",
            options: ["Milliliters", "Kilometers", "Grams", "Hours"],
          },
          {
            item: "classroom",
            answer: "Meters",
            options: ["Meters", "Grams", "Liters", "Seconds"],
          },
        ];
        const pick = randomChoice(prompts);
        return {
          question: `Which unit is best for measuring the ${pick.item}?`,
          options: shuffleArray([...pick.options]),
          answer: pick.answer,
          difficulty: 1,
        };
      },
      () => {
        const value = randomChoice([2, 3, 4, 5, 6]);
        return {
          question: `How many centimeters are in ${value} meters?`,
          options: shuffleArray([
            String(value * 10),
            String(value * 100),
            String(value * 1_000),
            String(value * 10_000),
          ]),
          answer: String(value * 100),
          difficulty: 1,
        };
      },
    ],
    2: [
      () => {
        const liters = randomChoice([1, 2, 3, 4]);
        const answer = liters * 1_000;
        return {
          question: `How many grams are in ${liters} kilograms?`,
          options: shuffleArray([
            String(liters * 100),
            String(liters * 500),
            String(answer),
            String(liters * 10_000),
          ]),
          answer: String(answer),
          difficulty: 2,
        };
      },
      () => {
        const left = randomChoice([120, 150, 180, 200]);
        const right = left - randomChoice([10, 20, 30, 40]);
        const answer = `${left} centimeters`;
        const question = `Which is longer: ${left} centimeters or ${right} centimeters?`;
        return {
          question,
          options: shuffleArray([
            `${left} centimeters`,
            `${right} centimeters`,
            "They are equal",
            "It depends on the color",
          ]),
          answer,
          difficulty: 2,
        };
      },
    ],
    3: [
      () => {
        const meters = randomChoice([2, 3, 4, 5]);
        return {
          question: `${meters} meters is the same as how many centimeters?`,
          options: shuffleArray([
            String(meters * 10),
            String(meters * 100),
            String(meters * 1_000),
            String(meters * 10_000),
          ]),
          answer: String(meters * 100),
          difficulty: 3,
        };
      },
      () => {
        const milliliters = randomChoice([250, 500, 750]);
        const addend = 1_000 - milliliters;
        return {
          question: `${milliliters} milliliters plus ${addend} milliliters equals:`,
          options: shuffleArray([
            "500 milliliters",
            "900 milliliters",
            "1 liter",
            "2 liters",
          ]),
          answer: "1 liter",
          difficulty: 3,
        };
      },
    ],
    4: [
      () => {
        const milliliters = randomChoice([1_250, 1_500, 2_250]);
        const answer = `${milliliters / 1_000} liters`;
        return {
          question: `${milliliters.toLocaleString()} milliliters is the same as:`,
          options: shuffleArray([
            answer,
            `${milliliters / 100} liters`,
            `${milliliters / 10} liters`,
            `${milliliters / 1_000_000} liters`,
          ]),
          answer,
          difficulty: 4,
        };
      },
      () => {
        const liters = randomChoice([2, 4, 6, 8]);
        const answer = liters * 2;
        return {
          question: `A recipe needs ${liters} liters of water. How many 500-milliliter bottles is that?`,
          options: shuffleArray([
            String(answer - 1),
            String(answer),
            String(answer + 1),
            String(answer + 2),
          ].map((value) => `${value} bottles`)),
          answer: `${answer} bottles`,
          difficulty: 4,
        };
      },
    ],
    5: [
      () => {
        const grams = randomChoice([750, 1_500, 2_500, 6_000]);
        const answer = `${grams / 1_000} kilograms`;
        return {
          question: `${grams.toLocaleString()} grams is the same as:`,
          options: shuffleArray([
            answer,
            `${grams / 100} kilograms`,
            `${grams / 10} kilograms`,
            `${grams / 1_000_000} kilograms`,
          ]),
          answer,
          difficulty: 5,
        };
      },
      () => {
        const meters = randomChoice([250, 500, 750]);
        const answer = `${meters / 100} meters`;
        return {
          question: `${meters} centimeters is the same as:`,
          options: shuffleArray([
            answer,
            `${meters / 10} meters`,
            `${meters / 1_000} meters`,
            `${meters * 10} meters`,
          ]),
          answer,
          difficulty: 5,
        };
      },
    ],
  };

  const level = generators[difficulty] ? difficulty : 1;
  return randomChoice(generators[level])();
}

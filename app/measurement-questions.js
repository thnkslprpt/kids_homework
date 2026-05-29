function clampMeasurementDifficulty(value) {
  const level = Number.parseInt(value, 10);
  if (!Number.isFinite(level)) {
    return 3;
  }
  return Math.min(10, Math.max(1, level));
}

function measurementUniqueStrings(values) {
  return Array.from(new Set(values.map((value) => String(value))));
}

function measurementRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function measurementRandomChoice(values) {
  return values[measurementRandomInt(0, values.length - 1)];
}

function measurementShuffleArray(values) {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = measurementRandomInt(0, index);
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function measurementQuestion(question, options, answer, difficulty) {
  const normalizedAnswer = String(answer);
  const normalizedOptions = measurementUniqueStrings(options);

  if (!String(question || "").trim()) {
    throw new Error("Measurement question is missing question text.");
  }

  if (normalizedOptions.length !== 4 || !normalizedOptions.includes(normalizedAnswer)) {
    throw new Error(`Measurement question must have exactly 4 unique options including the answer: ${question}`);
  }

  return {
    question: String(question),
    options: normalizedOptions,
    answer: normalizedAnswer,
    difficulty: clampMeasurementDifficulty(difficulty),
  };
}

function measurementBuildOptions(answer, distractors) {
  const normalizedAnswer = String(answer);
  const fallbackDistractors = [
    "Not enough information",
    "They are equal",
    "It depends on the color",
    "0",
    "1",
    "10",
    "100",
    "1,000",
  ];
  const options = measurementUniqueStrings([normalizedAnswer, ...distractors.map(String)]);

  fallbackDistractors.forEach((fallback) => {
    if (options.length < 4 && fallback !== normalizedAnswer && !options.includes(fallback)) {
      options.push(fallback);
    }
  });

  if (options.length < 4 || !options.includes(normalizedAnswer)) {
    throw new Error(`Could not build measurement options for answer: ${answer}`);
  }

  return measurementShuffleArray(options.slice(0, 4));
}

function measurementFormatNumber(value) {
  return Number.isInteger(value) ? value.toLocaleString() : String(value);
}

function measurementFormatMeters(value) {
  return `${measurementFormatNumber(value)} ${value === 1 ? "meter" : "meters"}`;
}

function measurementFormatCentimeters(value) {
  return `${measurementFormatNumber(value)} centimeters`;
}

function measurementFormatKilograms(value) {
  return `${measurementFormatNumber(value)} ${value === 1 ? "kilogram" : "kilograms"}`;
}

function measurementFormatGrams(value) {
  return `${measurementFormatNumber(value)} grams`;
}

function measurementFormatLiters(value) {
  return `${measurementFormatNumber(value)} ${value === 1 ? "liter" : "liters"}`;
}

function measurementFormatMilliliters(value) {
  return `${measurementFormatNumber(value)} milliliters`;
}

const MEASUREMENT_QUESTIONS = [
  // Level 1: choosing sensible units and tools.
  measurementQuestion("Which unit is best for measuring the length of a pencil?", ["Centimeters", "Kilograms", "Liters", "Hours"], "Centimeters", 1),
  measurementQuestion("How many centimeters are in 1 meter?", ["10", "100", "1,000", "10,000"], "100", 1),
  measurementQuestion("Which unit is best for measuring the mass of an apple?", ["Grams", "Liters", "Meters", "Hours"], "Grams", 1),
  measurementQuestion("Which unit is best for measuring milk in a bottle?", ["Liters", "Kilometers", "Kilograms", "Minutes"], "Liters", 1),
  measurementQuestion("Which tool measures how heavy something is?", ["Scale", "Ruler", "Thermometer", "Clock"], "Scale", 1),
  measurementQuestion("Which tool measures temperature?", ["Thermometer", "Compass", "Ruler", "Stopwatch"], "Thermometer", 1),
  measurementQuestion("Which unit is best for measuring the length of a classroom?", ["Meters", "Grams", "Liters", "Seconds"], "Meters", 1),
  measurementQuestion("Which unit is best for measuring the distance between cities?", ["Kilometers", "Grams", "Liters", "Seconds"], "Kilometers", 1),
  measurementQuestion("Which unit is best for measuring the amount of juice in a cup?", ["Milliliters", "Kilometers", "Grams", "Hours"], "Milliliters", 1),
  measurementQuestion("1 liter is the same as:", ["10 milliliters", "100 milliliters", "1,000 milliliters", "10,000 milliliters"], "1,000 milliliters", 1),

  // Level 2: whole-number metric conversions and simple comparisons.
  measurementQuestion("How many grams are in 1 kilogram?", ["100", "500", "1,000", "10,000"], "1,000", 2),
  measurementQuestion("3 kilograms is the same as how many grams?", ["300", "3,000", "30,000", "300,000"], "3,000", 2),
  measurementQuestion("Which holds more liquid?", ["600 milliliters", "1 liter", "They are equal", "It depends on the color"], "1 liter", 2),
  measurementQuestion("Which is longer?", ["2 meters", "180 centimeters", "They are equal", "It depends on the color"], "2 meters", 2),
  measurementQuestion("1000 milliliters is the same as:", ["1 liter", "10 liters", "100 liters", "1,000 liters"], "1 liter", 2),
  measurementQuestion("Which is the best estimate for the mass of a watermelon?", ["About 3 grams", "About 3 kilograms", "About 30 kilograms", "About 300 kilograms"], "About 3 kilograms", 2),
  measurementQuestion("Which is longer: 150 centimeters or 1 meter?", ["150 centimeters", "1 meter", "They are equal", "It depends on the color"], "150 centimeters", 2),
  measurementQuestion("300 centimeters is the same as:", ["2 meters", "3 meters", "4 meters", "5 meters"], "3 meters", 2),
  measurementQuestion("Which is heavier?", ["2 kilograms", "1,800 grams", "They are equal", "It depends on the color"], "2 kilograms", 2),
  measurementQuestion("Which is the best estimate for the mass of an apple?", ["About 10 grams", "About 100 grams", "About 1 kilogram", "About 10 kilograms"], "About 100 grams", 2),

  // Level 3: combining amounts and reading common measurements.
  measurementQuestion("2 meters is the same as how many centimeters?", ["20", "200", "2,000", "20,000"], "200", 3),
  measurementQuestion("750 milliliters plus 250 milliliters equals:", ["500 milliliters", "900 milliliters", "1 liter", "2 liters"], "1 liter", 3),
  measurementQuestion("What tool measures how long a table is?", ["Ruler or tape measure", "Thermometer", "Cup", "Clock"], "Ruler or tape measure", 3),
  measurementQuestion("4 meters is the same as how many centimeters?", ["40", "400", "4,000", "400,000"], "400", 3),
  measurementQuestion("Which is the best estimate for the amount of water in a bathtub?", ["About 5 milliliters", "About 5 liters", "About 50 liters", "About 500 liters"], "About 50 liters", 3),
  measurementQuestion("600 milliliters plus 400 milliliters equals:", ["500 milliliters", "1 liter", "2 liters", "5 liters"], "1 liter", 3),
  measurementQuestion("750 grams plus 250 grams equals:", ["500 grams", "900 grams", "1 kilogram", "2 kilograms"], "1 kilogram", 3),
  measurementQuestion("1.5 liters is the same as:", ["150 milliliters", "1,050 milliliters", "1,500 milliliters", "15,000 milliliters"], "1,500 milliliters", 3),
  measurementQuestion("Which is longer: 4 meters or 350 centimeters?", ["4 meters", "350 centimeters", "They are equal", "It depends on the color"], "4 meters", 3),
  measurementQuestion("900 milliliters plus 200 milliliters equals:", ["1 liter", "1.1 liters", "1.5 liters", "2 liters"], "1.1 liters", 3),

  // Level 4: decimal metric conversions and real-world estimates.
  measurementQuestion("1,500 milliliters is the same as:", ["0.15 liters", "1.5 liters", "15 liters", "150 liters"], "1.5 liters", 4),
  measurementQuestion("Which temperature is closest to a warm room?", ["About 0°C", "About 10°C", "About 22°C", "About 80°C"], "About 22°C", 4),
  measurementQuestion("250 centimeters is the same as:", ["0.25 meters", "2.5 meters", "25 meters", "250 meters"], "2.5 meters", 4),
  measurementQuestion("Which is the best estimate for the height of a door?", ["About 20 centimeters", "About 2 meters", "About 20 meters", "About 200 meters"], "About 2 meters", 4),
  measurementQuestion("2 liters plus 500 milliliters equals:", ["2.5 liters", "3 liters", "3.5 liters", "4 liters"], "2.5 liters", 4),
  measurementQuestion("Which temperature is coldest?", ["5°C", "15°C", "25°C", "35°C"], "5°C", 4),
  measurementQuestion("1.5 kilograms is the same as:", ["150 grams", "1,050 grams", "1,500 grams", "15,000 grams"], "1,500 grams", 4),
  measurementQuestion("3.5 meters is the same as:", ["35 centimeters", "350 centimeters", "3,500 centimeters", "35,000 centimeters"], "350 centimeters", 4),
  measurementQuestion("1,250 milliliters is the same as:", ["1.25 liters", "12.5 liters", "125 liters", "0.125 liters"], "1.25 liters", 4),
  measurementQuestion("6 kilograms is the same as:", ["600 grams", "6,000 grams", "60,000 grams", "600,000 grams"], "6,000 grams", 4),

  // Level 5: multi-step metric conversion and simple application.
  measurementQuestion("2.5 kilograms is the same as:", ["250 grams", "2,050 grams", "2,500 grams", "25,000 grams"], "2,500 grams", 5),
  measurementQuestion("A recipe needs 2 liters of water. How many 500-milliliter bottles is that?", ["2 bottles", "3 bottles", "4 bottles", "5 bottles"], "4 bottles", 5),
  measurementQuestion("1.25 liters is the same as:", ["125 milliliters", "1,025 milliliters", "1,250 milliliters", "12,500 milliliters"], "1,250 milliliters", 5),
  measurementQuestion("500 centimeters is the same as:", ["0.5 meters", "5 meters", "50 meters", "500 meters"], "5 meters", 5),
  measurementQuestion("750 grams is the same as:", ["75 grams", "0.75 kilograms", "7.5 kilograms", "750 kilograms"], "0.75 kilograms", 5),
  measurementQuestion("3.2 meters is the same as:", ["32 centimeters", "320 centimeters", "3,200 centimeters", "32,000 centimeters"], "320 centimeters", 5),
  measurementQuestion("2,250 milliliters is the same as:", ["2.25 liters", "22.5 liters", "225 liters", "0.225 liters"], "2.25 liters", 5),
  measurementQuestion("6,000 grams is the same as:", ["6 kilograms", "60 kilograms", "600 kilograms", "6000 kilograms"], "6 kilograms", 5),
  measurementQuestion("Which is longer: 1.8 meters or 170 centimeters?", ["1.8 meters", "170 centimeters", "They are equal", "It depends on the color"], "1.8 meters", 5),
  measurementQuestion("9 liters is the same as:", ["90 milliliters", "900 milliliters", "9,000 milliliters", "90,000 milliliters"], "9,000 milliliters", 5),

  // Level 6: perimeter, area, and practical unit planning.
  measurementQuestion("A rectangle is 6 meters long and 4 meters wide. What is its perimeter?", ["10 meters", "20 meters", "24 meters", "48 meters"], "20 meters", 6),
  measurementQuestion("A square garden has sides of 5 meters. What is its area?", ["10 square meters", "20 square meters", "25 square meters", "50 square meters"], "25 square meters", 6),
  measurementQuestion("A bottle holds 750 milliliters. How many bottles make 3 liters?", ["2 bottles", "3 bottles", "4 bottles", "5 bottles"], "4 bottles", 6),
  measurementQuestion("A rope is 2.4 meters long. How many centimeters is that?", ["24 centimeters", "240 centimeters", "2,400 centimeters", "24,000 centimeters"], "240 centimeters", 6),
  measurementQuestion("Which is the best unit for the area of a bedroom floor?", ["Square meters", "Liters", "Kilograms", "Degrees Celsius"], "Square meters", 6),
  measurementQuestion("A package weighs 1.2 kilograms. How many grams is that?", ["120 grams", "1,020 grams", "1,200 grams", "12,000 grams"], "1,200 grams", 6),
  measurementQuestion("A 5-liter jug fills 250-milliliter cups. How many cups can it fill?", ["10 cups", "15 cups", "20 cups", "25 cups"], "20 cups", 6),
  measurementQuestion("A runner jogs 2 kilometers. How many meters is that?", ["20 meters", "200 meters", "2,000 meters", "20,000 meters"], "2,000 meters", 6),
  measurementQuestion("A classroom is 8 meters by 6 meters. What is its area?", ["14 square meters", "28 square meters", "48 square meters", "96 square meters"], "48 square meters", 6),
  measurementQuestion("A fever thermometer reads 39°C. Compared with 37°C, how much higher is it?", ["1°C", "2°C", "3°C", "4°C"], "2°C", 6),

  // Level 7: rates, scale, and mixed metric work.
  measurementQuestion("A map scale says 1 centimeter = 5 kilometers. Two towns are 6 centimeters apart. How far apart are they?", ["11 kilometers", "20 kilometers", "30 kilometers", "60 kilometers"], "30 kilometers", 7),
  measurementQuestion("A car travels 120 kilometers in 2 hours. What is its average speed?", ["40 km/h", "60 km/h", "90 km/h", "240 km/h"], "60 km/h", 7),
  measurementQuestion("A rectangular rug is 3 meters by 2 meters. What is its area?", ["5 square meters", "6 square meters", "10 square meters", "12 square meters"], "6 square meters", 7),
  measurementQuestion("A box is 40 cm long, 30 cm wide, and 20 cm high. What is its volume?", ["90 cubic cm", "2,400 cubic cm", "24,000 cubic cm", "240,000 cubic cm"], "24,000 cubic cm", 7),
  measurementQuestion("Which is heavier: 0.85 kilograms or 900 grams?", ["0.85 kilograms", "900 grams", "They are equal", "It depends on the package"], "900 grams", 7),
  measurementQuestion("A 2.5-liter bottle is poured into 250-milliliter cups. How many full cups are there?", ["5", "8", "10", "12"], "10", 7),
  measurementQuestion("A rectangle has area 36 square meters and length 9 meters. What is its width?", ["3 meters", "4 meters", "6 meters", "27 meters"], "4 meters", 7),
  measurementQuestion("A cyclist rides 18 kilometers in 45 minutes. About how many kilometers per hour is that?", ["12 km/h", "18 km/h", "24 km/h", "36 km/h"], "24 km/h", 7),
  measurementQuestion("A recipe uses 0.75 liters of milk per cake. How much milk is needed for 4 cakes?", ["1.5 liters", "2 liters", "3 liters", "4 liters"], "3 liters", 7),
  measurementQuestion("A plant grew from 18 cm to 42 cm. How much did it grow?", ["14 cm", "20 cm", "24 cm", "60 cm"], "24 cm", 7),

  // Level 8: unit rates, area conversion, and compound measurements.
  measurementQuestion("A pool gains 12 liters of water each minute. How much water is added in 15 minutes?", ["120 liters", "150 liters", "180 liters", "240 liters"], "180 liters", 8),
  measurementQuestion("1 square meter equals how many square centimeters?", ["100", "1,000", "10,000", "100,000"], "10,000", 8),
  measurementQuestion("A garden is 4 m by 3 m. A path takes up 2 square meters. How much area is left?", ["8 square meters", "10 square meters", "12 square meters", "14 square meters"], "10 square meters", 8),
  measurementQuestion("A scale drawing uses 2 cm for every 5 m. A wall is 8 cm in the drawing. How long is the real wall?", ["10 m", "15 m", "20 m", "40 m"], "20 m", 8),
  measurementQuestion("A bag contains 2.4 kg of rice. If 600 g are used, how much rice is left?", ["1.2 kg", "1.8 kg", "2.0 kg", "3.0 kg"], "1.8 kg", 8),
  measurementQuestion("A train travels 90 km in 1.5 hours. What is its average speed?", ["45 km/h", "60 km/h", "90 km/h", "135 km/h"], "60 km/h", 8),
  measurementQuestion("A rectangular prism is 5 cm by 4 cm by 3 cm. What is its volume?", ["12 cubic cm", "20 cubic cm", "47 cubic cm", "60 cubic cm"], "60 cubic cm", 8),
  measurementQuestion("A 1.5-liter bottle is 60% full. How much liquid is inside?", ["600 milliliters", "750 milliliters", "900 milliliters", "1,200 milliliters"], "900 milliliters", 8),
  measurementQuestion("A hallway is 12 meters long. Tiles are 50 centimeters long. How many tiles fit along the hallway?", ["12", "18", "24", "50"], "24", 8),
  measurementQuestion("A thermometer rises from -3°C to 8°C. How many degrees did it rise?", ["5°C", "8°C", "11°C", "13°C"], "11°C", 8),

  // Level 9: precision, density, volume, and non-metric reference conversions.
  measurementQuestion("A cube has side length 4 cm. What is its volume?", ["16 cubic cm", "32 cubic cm", "48 cubic cm", "64 cubic cm"], "64 cubic cm", 9),
  measurementQuestion("An object has mass 200 grams and volume 50 cubic centimeters. What is its density?", ["2 g/cm³", "4 g/cm³", "10 g/cm³", "250 g/cm³"], "4 g/cm³", 9),
  measurementQuestion("About how many centimeters are in 10 inches if 1 inch is about 2.54 centimeters?", ["12.7 cm", "20.5 cm", "25.4 cm", "254 cm"], "25.4 cm", 9),
  measurementQuestion("A tank holds 0.8 cubic meters of water. How many liters is that?", ["80 liters", "800 liters", "8,000 liters", "80,000 liters"], "800 liters", 9),
  measurementQuestion("A room is 4.5 meters by 3.2 meters. What is its area?", ["7.7 square meters", "14.4 square meters", "15.4 square meters", "28.8 square meters"], "14.4 square meters", 9),
  measurementQuestion("A medicine cup marks every 5 mL. Which amount can it measure exactly?", ["12 mL", "17 mL", "25 mL", "33 mL"], "25 mL", 9),
  measurementQuestion("A scale reads to the nearest 0.1 kg. Which reading is possible?", ["3 kg", "3.05 kg", "3.1 kg", "3.14 kg"], "3.1 kg", 9),
  measurementQuestion("A runner finishes 5 kilometers in 25 minutes. What is the pace per kilometer?", ["4 minutes per km", "5 minutes per km", "6 minutes per km", "10 minutes per km"], "5 minutes per km", 9),
  measurementQuestion("A rectangular tank is 50 cm by 40 cm by 30 cm. How many liters does it hold?", ["6 liters", "60 liters", "600 liters", "6,000 liters"], "60 liters", 9),
  measurementQuestion("A map scale is 1:100,000. One centimeter on the map represents how much real distance?", ["100 meters", "1 kilometer", "10 kilometers", "100 kilometers"], "1 kilometer", 9),

  // Level 10: advanced applied measurement and dimensional reasoning.
  measurementQuestion("A car uses 6 liters of fuel for 100 kilometers. How much fuel is needed for 350 kilometers?", ["18 liters", "21 liters", "24 liters", "30 liters"], "21 liters", 10),
  measurementQuestion("A box measures 0.5 m by 0.4 m by 0.3 m. What is its volume?", ["0.006 cubic meters", "0.06 cubic meters", "0.6 cubic meters", "6 cubic meters"], "0.06 cubic meters", 10),
  measurementQuestion("Water flows at 2.5 liters per minute for 12 minutes. How much water flows?", ["15 liters", "25 liters", "30 liters", "35 liters"], "30 liters", 10),
  measurementQuestion("A model car is 12 cm long. The real car is 4.8 m long. What scale is the model?", ["1:4", "1:40", "1:400", "1:4,000"], "1:40", 10),
  measurementQuestion("A metal block has density 8 g/cm³ and volume 25 cm³. What is its mass?", ["33 grams", "100 grams", "200 grams", "250 grams"], "200 grams", 10),
  measurementQuestion("A recipe for 6 people uses 900 mL of soup. How much soup is needed for 10 people?", ["1 liter", "1.2 liters", "1.5 liters", "1.8 liters"], "1.5 liters", 10),
  measurementQuestion("A marathon is about 42.2 km. About how many meters is that?", ["4,220 meters", "42,200 meters", "422,000 meters", "4,220,000 meters"], "42,200 meters", 10),
  measurementQuestion("A square has area 81 square centimeters. What is the length of one side?", ["8 cm", "9 cm", "18 cm", "40.5 cm"], "9 cm", 10),
  measurementQuestion("A 3D printer uses 18 cm of filament per minute. How long to use 270 cm?", ["12 minutes", "15 minutes", "18 minutes", "20 minutes"], "15 minutes", 10),
  measurementQuestion("A temperature changes from -6°C to 9°C, then drops 4°C. What is the final temperature?", ["-1°C", "5°C", "9°C", "19°C"], "5°C", 10),
];

function createMeasurementGeneratedEntry(difficulty) {
  const level = clampMeasurementDifficulty(difficulty);
  const generators = {
    1: [
      createMeasurementUnitChoiceQuestion,
      createMeasurementToolChoiceQuestion,
      createMeasurementOneMeterQuestion,
      createMeasurementOneLiterQuestion,
    ],
    2: [
      createMeasurementKilogramToGramQuestion,
      createMeasurementMeterToCentimeterQuestion,
      createMeasurementCapacityCompareQuestion,
      createMeasurementEverydayEstimateQuestion,
    ],
    3: [
      createMeasurementAddToOneLiterQuestion,
      createMeasurementAddToOneKilogramQuestion,
      createMeasurementLengthCompareQuestion,
      createMeasurementTemperatureCompareQuestion,
    ],
    4: [
      createMeasurementMillilitersToLitersQuestion,
      createMeasurementCentimetersToMetersQuestion,
      createMeasurementKilogramsToGramsDecimalQuestion,
      createMeasurementBottleCountQuestion,
    ],
    5: [
      createMeasurementGramsToKilogramsQuestion,
      createMeasurementMetersToCentimetersDecimalQuestion,
      createMeasurementMixedCapacityQuestion,
      createMeasurementMixedMassCompareQuestion,
    ],
    6: [
      createMeasurementPerimeterQuestion,
      createMeasurementAreaQuestion,
      createMeasurementCupsFromJugQuestion,
      createMeasurementKilometersToMetersQuestion,
    ],
    7: [
      createMeasurementMapScaleQuestion,
      createMeasurementSpeedQuestion,
      createMeasurementRectangleMissingSideQuestion,
      createMeasurementVolumeBoxQuestion,
    ],
    8: [
      createMeasurementFlowRateQuestion,
      createMeasurementScaleDrawingQuestion,
      createMeasurementPercentCapacityQuestion,
      createMeasurementTileCountQuestion,
    ],
    9: [
      createMeasurementDensityQuestion,
      createMeasurementCubicMetersToLitersQuestion,
      createMeasurementPaceQuestion,
      createMeasurementTankVolumeLitersQuestion,
    ],
    10: [
      createMeasurementFuelRateQuestion,
      createMeasurementAdvancedScaleQuestion,
      createMeasurementDensityMassQuestion,
      createMeasurementTemperatureChangeQuestion,
    ],
  };

  return measurementRandomChoice(generators[level])();
}

function createMeasurementUnitChoiceQuestion() {
  const prompts = [
    { item: "length of a pencil", answer: "Centimeters", options: ["Centimeters", "Kilograms", "Liters", "Hours"] },
    { item: "mass of a banana", answer: "Grams", options: ["Grams", "Liters", "Meters", "Hours"] },
    { item: "amount of juice in a cup", answer: "Milliliters", options: ["Milliliters", "Kilometers", "Grams", "Hours"] },
    { item: "length of a room", answer: "Meters", options: ["Meters", "Grams", "Liters", "Seconds"] },
    { item: "distance between cities", answer: "Kilometers", options: ["Kilometers", "Grams", "Liters", "Seconds"] },
  ];
  const pick = measurementRandomChoice(prompts);
  return measurementQuestion(`Which unit is best for measuring the ${pick.item}?`, measurementShuffleArray(pick.options), pick.answer, 1);
}

function createMeasurementToolChoiceQuestion() {
  const prompts = [
    { question: "Which tool measures how heavy something is?", answer: "Scale", options: ["Scale", "Ruler", "Thermometer", "Clock"] },
    { question: "Which tool measures temperature?", answer: "Thermometer", options: ["Thermometer", "Compass", "Scale", "Stopwatch"] },
    { question: "Which tool measures how long a desk is?", answer: "Ruler or tape measure", options: ["Ruler or tape measure", "Thermometer", "Cup", "Clock"] },
    { question: "Which tool measures how long a race takes?", answer: "Stopwatch", options: ["Stopwatch", "Scale", "Ruler", "Measuring cup"] },
  ];
  const pick = measurementRandomChoice(prompts);
  return measurementQuestion(pick.question, measurementShuffleArray(pick.options), pick.answer, 1);
}

function createMeasurementOneMeterQuestion() {
  return measurementQuestion("How many centimeters are in 1 meter?", measurementShuffleArray(["10", "100", "1,000", "10,000"]), "100", 1);
}

function createMeasurementOneLiterQuestion() {
  return measurementQuestion("1 liter is the same as:", measurementShuffleArray(["10 milliliters", "100 milliliters", "1,000 milliliters", "10,000 milliliters"]), "1,000 milliliters", 1);
}

function createMeasurementKilogramToGramQuestion(difficulty = 2) {
  const kilograms = measurementRandomChoice([1, 2, 3, 4, 5, 6, 8]);
  const answer = String(kilograms * 1_000);
  return measurementQuestion(
    `How many grams are in ${kilograms} ${kilograms === 1 ? "kilogram" : "kilograms"}?`,
    measurementBuildOptions(answer, [kilograms * 100, kilograms * 500, kilograms * 10_000]),
    answer,
    difficulty
  );
}

function createMeasurementMeterToCentimeterQuestion(difficulty = 2) {
  const meters = measurementRandomChoice([2, 3, 4, 5, 6, 8, 9]);
  const answer = String(meters * 100);
  return measurementQuestion(
    `${meters} meters is the same as how many centimeters?`,
    measurementBuildOptions(answer, [meters * 10, meters * 1_000, meters * 10_000]),
    answer,
    difficulty
  );
}

function createMeasurementCapacityCompareQuestion() {
  const milliliters = measurementRandomChoice([600, 750, 900, 1_200, 1_500]);
  const liters = measurementRandomChoice([1, 2]);
  const left = `${milliliters} milliliters`;
  const right = `${liters} ${liters === 1 ? "liter" : "liters"}`;
  const answer = milliliters > liters * 1_000 ? left : right;
  return measurementQuestion(
    `Which holds more: ${left} or ${right}?`,
    measurementShuffleArray([left, right, "They are equal", "It depends on the color"]),
    answer,
    2
  );
}

function createMeasurementEverydayEstimateQuestion() {
  const prompts = [
    { question: "Which is the best estimate for the mass of a pencil?", answer: "About 10 grams", options: ["About 1 gram", "About 10 grams", "About 1 kilogram", "About 10 kilograms"] },
    { question: "Which is the best estimate for the mass of an apple?", answer: "About 100 grams", options: ["About 10 grams", "About 100 grams", "About 1 kilogram", "About 10 kilograms"] },
    { question: "Which is the best estimate for the height of a chair?", answer: "About 1 meter", options: ["About 10 centimeters", "About 1 meter", "About 10 meters", "About 100 meters"] },
    { question: "Which is the best estimate for the mass of a watermelon?", answer: "About 3 kilograms", options: ["About 3 grams", "About 3 kilograms", "About 30 kilograms", "About 300 kilograms"] },
  ];
  const pick = measurementRandomChoice(prompts);
  return measurementQuestion(pick.question, measurementShuffleArray(pick.options), pick.answer, 2);
}

function createMeasurementAddToOneLiterQuestion() {
  const first = measurementRandomChoice([100, 250, 400, 500, 600, 750]);
  const second = 1_000 - first;
  return measurementQuestion(
    `${first} milliliters plus ${second} milliliters equals:`,
    measurementShuffleArray(["500 milliliters", "900 milliliters", "1 liter", "2 liters"]),
    "1 liter",
    3
  );
}

function createMeasurementAddToOneKilogramQuestion() {
  const first = measurementRandomChoice([100, 250, 400, 500, 600, 750]);
  const second = 1_000 - first;
  return measurementQuestion(
    `${first} grams plus ${second} grams equals:`,
    measurementShuffleArray(["500 grams", "900 grams", "1 kilogram", "2 kilograms"]),
    "1 kilogram",
    3
  );
}

function createMeasurementLengthCompareQuestion() {
  const meters = measurementRandomChoice([2, 3, 4, 5]);
  const centimeters = meters * 100 - measurementRandomChoice([10, 20, 50, 75]);
  const answer = measurementFormatMeters(meters);
  return measurementQuestion(
    `Which is longer: ${answer} or ${measurementFormatCentimeters(centimeters)}?`,
    measurementShuffleArray([answer, measurementFormatCentimeters(centimeters), "They are equal", "It depends on the color"]),
    answer,
    3
  );
}

function createMeasurementTemperatureCompareQuestion() {
  const values = measurementShuffleArray([5, 15, 25, 35]);
  const coldest = Math.min(...values);
  return measurementQuestion(
    "Which temperature is coldest?",
    values.map((value) => `${value}°C`),
    `${coldest}°C`,
    3
  );
}

function createMeasurementMillilitersToLitersQuestion(difficulty = 4) {
  const milliliters = measurementRandomChoice([1_250, 1_500, 2_250, 2_500, 2_750, 3_500]);
  const answer = measurementFormatLiters(milliliters / 1_000);
  return measurementQuestion(
    `${milliliters.toLocaleString()} milliliters is the same as:`,
    measurementBuildOptions(answer, [measurementFormatLiters(milliliters / 100), measurementFormatLiters(milliliters / 10), measurementFormatLiters(milliliters / 1_000_000)]),
    answer,
    difficulty
  );
}

function createMeasurementCentimetersToMetersQuestion(difficulty = 4) {
  const centimeters = measurementRandomChoice([125, 150, 250, 320, 450, 500, 750]);
  const answer = measurementFormatMeters(centimeters / 100);
  return measurementQuestion(
    `${centimeters} centimeters is the same as:`,
    measurementBuildOptions(answer, [measurementFormatMeters(centimeters / 10), measurementFormatMeters(centimeters / 1_000), measurementFormatMeters(centimeters * 10)]),
    answer,
    difficulty
  );
}

function createMeasurementKilogramsToGramsDecimalQuestion(difficulty = 4) {
  const kilograms = measurementRandomChoice([1.2, 1.5, 2.5, 3.75, 4.5, 7.5]);
  const answer = measurementFormatGrams(kilograms * 1_000);
  return measurementQuestion(
    `${kilograms} kilograms is the same as:`,
    measurementBuildOptions(answer, [measurementFormatGrams(kilograms * 100), measurementFormatGrams(kilograms * 10_000), measurementFormatGrams(kilograms * 1_000 + 500)]),
    answer,
    difficulty
  );
}

function createMeasurementBottleCountQuestion(difficulty = 4) {
  const liters = measurementRandomChoice([2, 3, 4, 5, 6]);
  const bottleSize = measurementRandomChoice([250, 500]);
  const answerCount = (liters * 1_000) / bottleSize;
  const answer = `${answerCount} bottles`;
  return measurementQuestion(
    `A recipe needs ${liters} liters of water. How many ${bottleSize}-milliliter bottles is that?`,
    measurementBuildOptions(answer, [`${answerCount - 1} bottles`, `${answerCount + 1} bottles`, `${answerCount + 2} bottles`]),
    answer,
    difficulty
  );
}

function createMeasurementGramsToKilogramsQuestion(difficulty = 5) {
  const grams = measurementRandomChoice([750, 1_500, 2_500, 3_250, 5_000, 6_000, 7_500]);
  const answer = measurementFormatKilograms(grams / 1_000);
  return measurementQuestion(
    `${grams.toLocaleString()} grams is the same as:`,
    measurementBuildOptions(answer, [measurementFormatKilograms(grams / 100), measurementFormatKilograms(grams / 10), measurementFormatKilograms(grams / 1_000_000)]),
    answer,
    difficulty
  );
}

function createMeasurementMetersToCentimetersDecimalQuestion(difficulty = 5) {
  const meters = measurementRandomChoice([1.8, 2.4, 2.75, 3.2, 3.5, 4.25]);
  const answer = measurementFormatCentimeters(meters * 100);
  return measurementQuestion(
    `${meters} meters is the same as:`,
    measurementBuildOptions(answer, [measurementFormatCentimeters(meters * 10), measurementFormatCentimeters(meters * 1_000), measurementFormatCentimeters(meters * 10_000)]),
    answer,
    difficulty
  );
}

function createMeasurementMixedCapacityQuestion() {
  const liters = measurementRandomChoice([1, 2, 3]);
  const milliliters = measurementRandomChoice([250, 500, 750]);
  const total = liters + milliliters / 1_000;
  const answer = measurementFormatLiters(total);
  return measurementQuestion(
    `${liters} ${liters === 1 ? "liter" : "liters"} plus ${milliliters} milliliters equals:`,
    measurementBuildOptions(answer, [measurementFormatLiters(total - 0.5), measurementFormatLiters(total + 0.5), measurementFormatLiters(total + 1)]),
    answer,
    5
  );
}

function createMeasurementMixedMassCompareQuestion() {
  const kilograms = measurementRandomChoice([1.2, 1.5, 1.8, 2.2, 2.5]);
  const grams = kilograms * 1_000 - measurementRandomChoice([50, 100, 200]);
  const answer = measurementFormatKilograms(kilograms);
  return measurementQuestion(
    `Which is heavier: ${answer} or ${measurementFormatGrams(grams)}?`,
    measurementShuffleArray([answer, measurementFormatGrams(grams), "They are equal", "It depends on the package"]),
    answer,
    5
  );
}

function createMeasurementPerimeterQuestion() {
  const length = measurementRandomChoice([5, 6, 7, 8, 9, 10]);
  const width = measurementRandomChoice([2, 3, 4, 5]);
  const answer = measurementFormatMeters(2 * (length + width));
  return measurementQuestion(
    `A rectangle is ${length} meters long and ${width} meters wide. What is its perimeter?`,
    measurementBuildOptions(answer, [measurementFormatMeters(length + width), `${length * width} square meters`, measurementFormatMeters(4 * length)]),
    answer,
    6
  );
}

function createMeasurementAreaQuestion(difficulty = 6) {
  const length = measurementRandomChoice([4, 5, 6, 7, 8, 9]);
  const width = measurementRandomChoice([3, 4, 5, 6]);
  const answerValue = length * width;
  const answer = `${answerValue} square meters`;
  return measurementQuestion(
    `A rectangle is ${length} meters long and ${width} meters wide. What is its area?`,
    measurementBuildOptions(answer, [`${2 * (length + width)} meters`, `${length + width} square meters`, `${answerValue * 2} square meters`]),
    answer,
    difficulty
  );
}

function createMeasurementCupsFromJugQuestion() {
  const liters = measurementRandomChoice([2, 3, 4, 5]);
  const cupSize = measurementRandomChoice([200, 250, 500]);
  const answerValue = (liters * 1_000) / cupSize;
  const answer = `${answerValue} cups`;
  return measurementQuestion(
    `A ${liters}-liter jug fills ${cupSize}-milliliter cups. How many cups can it fill?`,
    measurementBuildOptions(answer, [`${answerValue - 2} cups`, `${answerValue - 1} cups`, `${answerValue + 2} cups`]),
    answer,
    6
  );
}

function createMeasurementKilometersToMetersQuestion(difficulty = 6) {
  const kilometers = measurementRandomChoice([2, 3, 4, 5, 8, 12]);
  const answer = measurementFormatMeters(kilometers * 1_000);
  return measurementQuestion(
    `${kilometers} kilometers is the same as how many meters?`,
    measurementBuildOptions(answer, [measurementFormatMeters(kilometers * 100), measurementFormatMeters(kilometers * 10_000), measurementFormatMeters(kilometers * 10)]),
    answer,
    difficulty
  );
}

function createMeasurementMapScaleQuestion() {
  const scale = measurementRandomChoice([2, 5, 10]);
  const cm = measurementRandomChoice([3, 4, 6, 8]);
  const answer = `${scale * cm} kilometers`;
  return measurementQuestion(
    `A map scale says 1 centimeter = ${scale} kilometers. Two places are ${cm} centimeters apart. How far apart are they?`,
    measurementBuildOptions(answer, [`${scale + cm} kilometers`, `${scale * cm * 2} kilometers`, `${cm} kilometers`]),
    answer,
    7
  );
}

function createMeasurementSpeedQuestion(difficulty = 7) {
  const speed = measurementRandomChoice([40, 50, 60, 80]);
  const hours = measurementRandomChoice([2, 3, 4]);
  const distance = speed * hours;
  const answer = `${speed} km/h`;
  return measurementQuestion(
    `A car travels ${distance} kilometers in ${hours} hours. What is its average speed?`,
    measurementBuildOptions(answer, [`${speed / 2} km/h`, `${speed + 20} km/h`, `${distance} km/h`]),
    answer,
    difficulty
  );
}

function createMeasurementRectangleMissingSideQuestion() {
  const width = measurementRandomChoice([3, 4, 5, 6, 8]);
  const length = measurementRandomChoice([6, 8, 9, 10, 12]);
  const area = width * length;
  const answer = measurementFormatMeters(width);
  return measurementQuestion(
    `A rectangle has area ${area} square meters and length ${length} meters. What is its width?`,
    measurementBuildOptions(answer, [measurementFormatMeters(length), measurementFormatMeters(area - length), `${area} square meters`]),
    answer,
    7
  );
}

function createMeasurementVolumeBoxQuestion(difficulty = 7) {
  const length = measurementRandomChoice([4, 5, 6, 8]);
  const width = measurementRandomChoice([3, 4, 5]);
  const height = measurementRandomChoice([2, 3, 4]);
  const volume = length * width * height;
  const answer = `${volume} cubic cm`;
  return measurementQuestion(
    `A box is ${length} cm long, ${width} cm wide, and ${height} cm high. What is its volume?`,
    measurementBuildOptions(answer, [`${length + width + height} cubic cm`, `${length * width} cubic cm`, `${2 * (length * width + length * height + width * height)} square cm`]),
    answer,
    difficulty
  );
}

function createMeasurementFlowRateQuestion(difficulty = 8) {
  const rate = measurementRandomChoice([6, 8, 10, 12, 15]);
  const minutes = measurementRandomChoice([5, 10, 12, 15]);
  const answer = measurementFormatLiters(rate * minutes);
  return measurementQuestion(
    `Water flows at ${rate} liters per minute for ${minutes} minutes. How much water flows?`,
    measurementBuildOptions(answer, [measurementFormatLiters(rate + minutes), measurementFormatLiters(rate * minutes - rate), measurementFormatLiters(rate * minutes + rate)]),
    answer,
    difficulty
  );
}

function createMeasurementScaleDrawingQuestion(difficulty = 8) {
  const realPerCm = measurementRandomChoice([2, 5, 10]);
  const drawingCm = measurementRandomChoice([4, 6, 8, 10]);
  const answer = measurementFormatMeters(realPerCm * drawingCm);
  return measurementQuestion(
    `A scale drawing uses 1 cm for every ${realPerCm} m. A wall is ${drawingCm} cm in the drawing. How long is the real wall?`,
    measurementBuildOptions(answer, [measurementFormatMeters(realPerCm + drawingCm), measurementFormatMeters(drawingCm), measurementFormatMeters(realPerCm * drawingCm * 2)]),
    answer,
    difficulty
  );
}

function createMeasurementPercentCapacityQuestion() {
  const liters = measurementRandomChoice([1, 1.5, 2, 2.5]);
  const percent = measurementRandomChoice([25, 50, 60, 75, 80]);
  const milliliters = liters * 1_000 * (percent / 100);
  const answer = measurementFormatMilliliters(milliliters);
  return measurementQuestion(
    `A ${liters}-liter bottle is ${percent}% full. How much liquid is inside?`,
    measurementBuildOptions(answer, [measurementFormatMilliliters(liters * 1_000), measurementFormatMilliliters(milliliters / 2), measurementFormatMilliliters(milliliters + 250)]),
    answer,
    8
  );
}

function createMeasurementTileCountQuestion() {
  const hallwayMeters = measurementRandomChoice([6, 8, 10, 12]);
  const tileCm = measurementRandomChoice([25, 50]);
  const answerValue = (hallwayMeters * 100) / tileCm;
  const answer = String(answerValue);
  return measurementQuestion(
    `A hallway is ${hallwayMeters} meters long. Tiles are ${tileCm} centimeters long. How many tiles fit along the hallway?`,
    measurementBuildOptions(answer, [answerValue - 4, answerValue / 2, answerValue + 4]),
    answer,
    8
  );
}

function createMeasurementDensityQuestion(difficulty = 9) {
  const density = measurementRandomChoice([2, 4, 5, 8]);
  const volume = measurementRandomChoice([20, 25, 50]);
  const mass = density * volume;
  const answer = `${density} g/cm³`;
  return measurementQuestion(
    `An object has mass ${mass} grams and volume ${volume} cubic centimeters. What is its density?`,
    measurementBuildOptions(answer, [`${density * 2} g/cm³`, `${volume} g/cm³`, `${mass + volume} g/cm³`]),
    answer,
    difficulty
  );
}

function createMeasurementCubicMetersToLitersQuestion(difficulty = 9) {
  const cubicMeters = measurementRandomChoice([0.2, 0.5, 0.8, 1.2, 1.5]);
  const answer = measurementFormatLiters(cubicMeters * 1_000);
  return measurementQuestion(
    `${cubicMeters} cubic meters is the same as how many liters?`,
    measurementBuildOptions(answer, [measurementFormatLiters(cubicMeters * 100), measurementFormatLiters(cubicMeters * 10_000), measurementFormatLiters(cubicMeters * 10)]),
    answer,
    difficulty
  );
}

function createMeasurementPaceQuestion() {
  const kilometers = measurementRandomChoice([3, 4, 5, 6, 10]);
  const pace = measurementRandomChoice([4, 5, 6, 7]);
  const minutes = kilometers * pace;
  const answer = `${pace} minutes per km`;
  return measurementQuestion(
    `A runner finishes ${kilometers} kilometers in ${minutes} minutes. What is the pace per kilometer?`,
    measurementBuildOptions(answer, [`${pace - 1} minutes per km`, `${pace + 1} minutes per km`, `${minutes} minutes per km`]),
    answer,
    9
  );
}

function createMeasurementTankVolumeLitersQuestion() {
  const length = measurementRandomChoice([40, 50, 60]);
  const width = measurementRandomChoice([30, 40, 50]);
  const height = measurementRandomChoice([20, 30, 40]);
  const liters = (length * width * height) / 1_000;
  const answer = measurementFormatLiters(liters);
  return measurementQuestion(
    `A rectangular tank is ${length} cm by ${width} cm by ${height} cm. How many liters does it hold?`,
    measurementBuildOptions(answer, [measurementFormatLiters(liters / 10), measurementFormatLiters(liters * 10), measurementFormatLiters(length + width + height)]),
    answer,
    9
  );
}

function createMeasurementFuelRateQuestion() {
  const rate = measurementRandomChoice([5, 6, 7, 8]);
  const distance = measurementRandomChoice([250, 300, 350, 400]);
  const answer = measurementFormatLiters((rate * distance) / 100);
  return measurementQuestion(
    `A car uses ${rate} liters of fuel for 100 kilometers. How much fuel is needed for ${distance} kilometers?`,
    measurementBuildOptions(answer, [measurementFormatLiters(rate + distance / 100), measurementFormatLiters((rate * distance) / 50), measurementFormatLiters((rate * distance) / 200)]),
    answer,
    10
  );
}

function createMeasurementAdvancedScaleQuestion() {
  const modelCm = measurementRandomChoice([10, 12, 15, 20]);
  const scale = measurementRandomChoice([20, 40, 50, 100]);
  const realMeters = (modelCm * scale) / 100;
  const answer = `1:${scale}`;
  return measurementQuestion(
    `A model is ${modelCm} cm long. The real object is ${realMeters} m long. What scale is the model?`,
    measurementBuildOptions(answer, [`1:${scale / 2}`, `1:${scale * 10}`, `${scale}:1`]),
    answer,
    10
  );
}

function createMeasurementDensityMassQuestion() {
  const density = measurementRandomChoice([2, 4, 5, 8]);
  const volume = measurementRandomChoice([20, 25, 40, 50]);
  const mass = density * volume;
  const answer = measurementFormatGrams(mass);
  return measurementQuestion(
    `A block has density ${density} g/cm³ and volume ${volume} cm³. What is its mass?`,
    measurementBuildOptions(answer, [measurementFormatGrams(density + volume), measurementFormatGrams(mass / 2), measurementFormatGrams(mass + volume)]),
    answer,
    10
  );
}

function createMeasurementTemperatureChangeQuestion() {
  const start = measurementRandomChoice([-8, -6, -4, -3, 2]);
  const rise = measurementRandomChoice([10, 12, 15, 18]);
  const drop = measurementRandomChoice([3, 4, 5, 6]);
  const finalTemperature = start + rise - drop;
  const answer = `${finalTemperature}°C`;
  return measurementQuestion(
    `A temperature changes from ${start}°C up by ${rise}°C, then drops ${drop}°C. What is the final temperature?`,
    measurementBuildOptions(answer, [`${start + rise}°C`, `${finalTemperature + drop}°C`, `${finalTemperature - drop}°C`]),
    answer,
    10
  );
}
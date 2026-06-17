const THERMOMETER_DETAIL_TEXT = "Read the red line. Dark marks are 10\u00b0C. Light marks are 5\u00b0C.";
const RULER_DETAIL_TEXT = "Each numbered mark is 1 cm. Short marks show half centimeters.";
const CUP_DETAIL_TEXT = "Read the water line. The side marks show milliliters.";
const SCALE_DETAIL_TEXT = "Read where the pointer lands on the scale.";

const VISUAL_MEASUREMENT_QUESTIONS = [
  // Level 1: direct whole-number readings and everyday units.
  {
    question: "How long is the pencil shown on the ruler?",
    visualHtml: buildVisualMeasurementCard(
      "Ruler",
      buildRulerSvg({ start: 0, end: 5 }),
      "The pencil starts at 0 cm."
    ),
    options: ["4 cm", "5 cm", "6 cm", "7 cm"],
    answer: "5 cm",
    difficulty: 1,
  },
  {
    question: "What time is shown on the clock?",
    visualHtml: buildVisualMeasurementCard(
      "Clock",
      buildClockSvg({ hour: 3, minute: 0 }),
      "Look at the hands."
    ),
    options: ["3:00", "4:00", "3:30", "2:00"],
    answer: "3:00",
    difficulty: 1,
  },
  {
    question: "How much water is in the cup?",
    visualHtml: buildVisualMeasurementCard(
      "Measuring Cup",
      buildMeasuringCupSvg({ amount: 250, maxAmount: 500, step: 100 }),
      CUP_DETAIL_TEXT
    ),
    options: ["150 mL", "250 mL", "350 mL", "500 mL"],
    answer: "250 mL",
    difficulty: 1,
  },
  {
    question: "Which unit best matches the ruler picture?",
    visualHtml: buildVisualMeasurementCard(
      "Ruler",
      buildRulerSvg({ start: 0, end: 4 }),
      "A ruler measures length."
    ),
    options: ["Centimeters", "Kilograms", "Liters", "Minutes"],
    answer: "Centimeters",
    difficulty: 1,
  },
  {
    question: "What temperature is shown?",
    visualHtml: buildVisualMeasurementCard(
      "Thermometer",
      buildThermometerSvg({ temperature: 20 }),
      THERMOMETER_DETAIL_TEXT
    ),
    options: ["About 10\u00b0C", "About 20\u00b0C", "About 30\u00b0C", "About 40\u00b0C"],
    answer: "About 20\u00b0C",
    difficulty: 1,
  },
  {
    question: "Which scale reading is shown?",
    visualHtml: buildVisualMeasurementCard(
      "Kitchen Scale",
      buildScaleSvg({ value: 400, max: 1000, unit: "g" }),
      SCALE_DETAIL_TEXT
    ),
    options: ["200 g", "400 g", "600 g", "800 g"],
    answer: "400 g",
    difficulty: 1,
  },

  {
    question: "How long is the crayon shown on the ruler?",
    visualHtml: buildVisualMeasurementCard(
      "Ruler",
      buildRulerSvg({ start: 0, end: 3 }),
      "The crayon starts at 0 cm."
    ),
    options: ["2 cm", "3 cm", "4 cm", "5 cm"],
    answer: "3 cm",
    difficulty: 1,
  },
  {
    question: "What time is shown on the clock?",
    visualHtml: buildVisualMeasurementCard(
      "Clock",
      buildClockSvg({ hour: 7, minute: 0 }),
      "Look at the hands."
    ),
    options: ["6:00", "7:00", "8:00", "7:30"],
    answer: "7:00",
    difficulty: 1,
  },
  {
    question: "How much water is in the cup?",
    visualHtml: buildVisualMeasurementCard(
      "Measuring Cup",
      buildMeasuringCupSvg({ amount: 300, maxAmount: 600, step: 100 }),
      CUP_DETAIL_TEXT
    ),
    options: ["200 mL", "300 mL", "400 mL", "600 mL"],
    answer: "300 mL",
    difficulty: 1,
  },
  {
    question: "What does this clock help you measure?",
    visualHtml: buildVisualMeasurementCard(
      "Clock",
      buildClockSvg({ hour: 5, minute: 0 }),
      "A clock shows time."
    ),
    options: ["Time", "Mass", "Length", "Capacity"],
    answer: "Time",
    difficulty: 1,
  },
  {
    question: "What temperature is shown?",
    visualHtml: buildVisualMeasurementCard(
      "Thermometer",
      buildThermometerSvg({ temperature: 30 }),
      THERMOMETER_DETAIL_TEXT
    ),
    options: ["About 10\u00b0C", "About 20\u00b0C", "About 30\u00b0C", "About 40\u00b0C"],
    answer: "About 30\u00b0C",
    difficulty: 1,
  },
  {
    question: "Which scale reading is shown?",
    visualHtml: buildVisualMeasurementCard(
      "Kitchen Scale",
      buildScaleSvg({ value: 600, max: 1000, unit: "g" }),
      SCALE_DETAIL_TEXT
    ),
    options: ["200 g", "400 g", "600 g", "800 g"],
    answer: "600 g",
    difficulty: 1,
  },

  // Level 2: half hours, half centimeters, symmetry, and common readings.
  {
    question: "Which thermometer reading is closest to a cool day?",
    visualHtml: buildVisualMeasurementCard(
      "Thermometer",
      buildThermometerSvg({ temperature: 12 }),
      THERMOMETER_DETAIL_TEXT
    ),
    options: ["About 5\u00b0C", "About 12\u00b0C", "About 25\u00b0C", "About 40\u00b0C"],
    answer: "About 12\u00b0C",
    difficulty: 2,
  },
  {
    question: "How long is the pencil shown on the ruler?",
    visualHtml: buildVisualMeasurementCard(
      "Ruler",
      buildRulerSvg({ start: 0, end: 5.5 }),
      "The pencil starts at 0 cm."
    ),
    options: ["4.5 cm", "5 cm", "5.5 cm", "6.5 cm"],
    answer: "5.5 cm",
    difficulty: 2,
  },
  {
    question: "What time is shown on the clock?",
    visualHtml: buildVisualMeasurementCard(
      "Clock",
      buildClockSvg({ hour: 6, minute: 30 }),
      "The long hand points to 6."
    ),
    options: ["6:00", "6:15", "6:30", "7:30"],
    answer: "6:30",
    difficulty: 2,
  },
  {
    question: "Which sentence is true about the line of symmetry?",
    visualHtml: buildVisualMeasurementCard(
      "Shape",
      buildSymmetrySvg({ type: "heart" }),
      "The dashed line shows the fold line."
    ),
    options: [
      "The shape would match if folded on the line",
      "The shape has no sides",
      "The shape is a circle",
      "The line is a measurement scale",
    ],
    answer: "The shape would match if folded on the line",
    difficulty: 2,
  },
  {
    question: "How much water is in the cup?",
    visualHtml: buildVisualMeasurementCard(
      "Measuring Cup",
      buildMeasuringCupSvg({ amount: 400, maxAmount: 800, step: 200 }),
      CUP_DETAIL_TEXT
    ),
    options: ["200 mL", "400 mL", "600 mL", "800 mL"],
    answer: "400 mL",
    difficulty: 2,
  },
  {
    question: "How much mass is shown on the scale?",
    visualHtml: buildVisualMeasurementCard(
      "Kitchen Scale",
      buildScaleSvg({ value: 750, max: 1000, unit: "g" }),
      SCALE_DETAIL_TEXT
    ),
    options: ["250 g", "500 g", "750 g", "1,000 g"],
    answer: "750 g",
    difficulty: 2,
  },

  {
    question: "Which thermometer reading is closest to a mild day?",
    visualHtml: buildVisualMeasurementCard(
      "Thermometer",
      buildThermometerSvg({ temperature: 18 }),
      THERMOMETER_DETAIL_TEXT
    ),
    options: ["About 8\u00b0C", "About 18\u00b0C", "About 28\u00b0C", "About 38\u00b0C"],
    answer: "About 18\u00b0C",
    difficulty: 2,
  },
  {
    question: "How long is the ribbon shown on the ruler?",
    visualHtml: buildVisualMeasurementCard(
      "Ruler",
      buildRulerSvg({ start: 0, end: 4.5 }),
      "The ribbon starts at 0 cm."
    ),
    options: ["3.5 cm", "4 cm", "4.5 cm", "5.5 cm"],
    answer: "4.5 cm",
    difficulty: 2,
  },
  {
    question: "What time is shown on the clock?",
    visualHtml: buildVisualMeasurementCard(
      "Clock",
      buildClockSvg({ hour: 1, minute: 30 }),
      "The long hand points to 6."
    ),
    options: ["1:00", "1:30", "2:30", "12:30"],
    answer: "1:30",
    difficulty: 2,
  },
  {
    question: "Which sentence is true about the line of symmetry?",
    visualHtml: buildVisualMeasurementCard(
      "Shape",
      buildSymmetrySvg({ type: "heart" }),
      "The dashed line shows the fold line."
    ),
    options: [
      "The two sides match if folded on the line",
      "The dashed line measures weight",
      "The shape is a rectangle",
      "The line shows the time",
    ],
    answer: "The two sides match if folded on the line",
    difficulty: 2,
  },
  {
    question: "How much water is in the cup?",
    visualHtml: buildVisualMeasurementCard(
      "Measuring Cup",
      buildMeasuringCupSvg({ amount: 600, maxAmount: 800, step: 200 }),
      CUP_DETAIL_TEXT
    ),
    options: ["200 mL", "400 mL", "600 mL", "800 mL"],
    answer: "600 mL",
    difficulty: 2,
  },
  {
    question: "How much mass is shown on the scale?",
    visualHtml: buildVisualMeasurementCard(
      "Kitchen Scale",
      buildScaleSvg({ value: 900, max: 1000, unit: "g" }),
      SCALE_DETAIL_TEXT
    ),
    options: ["500 g", "700 g", "900 g", "1,000 g"],
    answer: "900 g",
    difficulty: 2,
  },

  // Level 3: non-zero starts, simple unit prices, grid perimeter, and quarter turns.
  {
    question: "What temperature is shown?",
    visualHtml: buildVisualMeasurementCard(
      "Thermometer",
      buildThermometerSvg({ temperature: 28 }),
      THERMOMETER_DETAIL_TEXT
    ),
    options: ["About 18\u00b0C", "About 22\u00b0C", "About 28\u00b0C", "About 38\u00b0C"],
    answer: "About 28\u00b0C",
    difficulty: 3,
  },
  {
    question: "Which cup costs less per cup?",
    visualHtml: buildVisualMeasurementCard(
      "Receipt",
      buildReceiptHtml([
        ["2 cups", "10 shekels"],
        ["4 cups", "16 shekels"],
      ]),
      "Compare the unit price."
    ),
    options: ["2 cups for 10 shekels", "4 cups for 16 shekels", "They cost the same", "The receipt is missing"],
    answer: "4 cups for 16 shekels",
    difficulty: 3,
  },
  {
    question: "How many centimeters long is the line?",
    visualHtml: buildVisualMeasurementCard(
      "Ruler",
      buildRulerSvg({ start: -4, end: 8 }),
      "The line begins at -4 cm."
    ),
    options: ["10 cm", "11 cm", "12 cm", "13 cm"],
    answer: "12 cm",
    difficulty: 3,
  },
  {
    question: "What is the perimeter of the rectangle?",
    visualHtml: buildVisualMeasurementCard(
      "Grid Rectangle",
      buildGridRectangleSvg({ widthCells: 4, heightCells: 2 }),
      "Each grid square side is 1 cm."
    ),
    options: ["6 cm", "8 cm", "12 cm", "16 cm"],
    answer: "12 cm",
    difficulty: 3,
  },
  {
    question: "What time is shown on the clock?",
    visualHtml: buildVisualMeasurementCard(
      "Clock",
      buildClockSvg({ hour: 2, minute: 15 }),
      "The minute hand points to 3."
    ),
    options: ["2:00", "2:15", "2:30", "3:15"],
    answer: "2:15",
    difficulty: 3,
  },
  {
    question: "Which turn is shown by the arrow?",
    visualHtml: buildVisualMeasurementCard(
      "Turn",
      buildTurnSvg({ start: "up", turn: "right" }),
      "The arrow turns one quarter-turn clockwise."
    ),
    options: ["A quarter-turn clockwise", "A half-turn", "A full turn", "A quarter-turn counterclockwise"],
    answer: "A quarter-turn clockwise",
    difficulty: 3,
  },

  {
    question: "What temperature is shown?",
    visualHtml: buildVisualMeasurementCard(
      "Thermometer",
      buildThermometerSvg({ temperature: 22 }),
      THERMOMETER_DETAIL_TEXT
    ),
    options: ["About 12\u00b0C", "About 18\u00b0C", "About 22\u00b0C", "About 32\u00b0C"],
    answer: "About 22\u00b0C",
    difficulty: 3,
  },
  {
    question: "Which apple deal costs less per apple?",
    visualHtml: buildVisualMeasurementCard(
      "Receipt",
      buildReceiptHtml([
        ["3 apples", "12 shekels"],
        ["5 apples", "18 shekels"],
      ]),
      "Compare the price for one apple."
    ),
    options: ["3 apples for 12 shekels", "5 apples for 18 shekels", "They cost the same", "Cannot tell"],
    answer: "5 apples for 18 shekels",
    difficulty: 3,
  },
  {
    question: "How many centimeters long is the line?",
    visualHtml: buildVisualMeasurementCard(
      "Ruler",
      buildRulerSvg({ start: -2, end: 5 }),
      "The line begins at -2 cm."
    ),
    options: ["5 cm", "6 cm", "7 cm", "8 cm"],
    answer: "7 cm",
    difficulty: 3,
  },
  {
    question: "What is the perimeter of the rectangle?",
    visualHtml: buildVisualMeasurementCard(
      "Grid Rectangle",
      buildGridRectangleSvg({ widthCells: 5, heightCells: 3 }),
      "Each grid square side is 1 cm."
    ),
    options: ["8 cm", "15 cm", "16 cm", "20 cm"],
    answer: "16 cm",
    difficulty: 3,
  },
  {
    question: "What time is shown on the clock?",
    visualHtml: buildVisualMeasurementCard(
      "Clock",
      buildClockSvg({ hour: 11, minute: 15 }),
      "The minute hand points to 3."
    ),
    options: ["10:15", "11:00", "11:15", "11:30"],
    answer: "11:15",
    difficulty: 3,
  },
  {
    question: "Which turn is shown by the arrow?",
    visualHtml: buildVisualMeasurementCard(
      "Turn",
      buildTurnSvg({ start: "right", turn: "down" }),
      "The arrow turns one quarter-turn clockwise."
    ),
    options: ["A quarter-turn clockwise", "A half-turn", "A full turn", "A quarter-turn counterclockwise"],
    answer: "A quarter-turn clockwise",
    difficulty: 3,
  },

  // Level 4: quarter-hour clocks, better value, reflection, area, and larger readings.
  {
    question: "What time is shown on the clock?",
    visualHtml: buildVisualMeasurementCard(
      "Clock",
      buildClockSvg({ hour: 9, minute: 45 }),
      "The minute hand points to 9."
    ),
    options: ["9:45", "9:15", "10:45", "8:45"],
    answer: "9:45",
    difficulty: 4,
  },
  {
    question: "Which bottle has the lower price per milliliter?",
    visualHtml: buildVisualMeasurementCard(
      "Receipt",
      buildReceiptHtml([
        ["500 mL", "6 shekels"],
        ["1 liter", "10 shekels"],
      ]),
      "Compare the price per milliliter."
    ),
    options: ["500 mL for 6 shekels", "1 liter for 10 shekels", "They cost the same", "The smaller bottle"],
    answer: "1 liter for 10 shekels",
    difficulty: 4,
  },
  {
    question: "Which temperature is closest?",
    visualHtml: buildVisualMeasurementCard(
      "Thermometer",
      buildThermometerSvg({ temperature: 34 }),
      THERMOMETER_DETAIL_TEXT
    ),
    options: ["About 14\u00b0C", "About 24\u00b0C", "About 34\u00b0C", "About 44\u00b0C"],
    answer: "About 34\u00b0C",
    difficulty: 4,
  },
  {
    question: "Which figure shows a reflection across the dotted line?",
    visualHtml: buildVisualMeasurementCard(
      "Reflection",
      buildSymmetrySvg({ type: "arrow" }),
      "The two sides should match as mirror images."
    ),
    options: ["The mirrored arrow", "A rotated square", "A larger triangle", "A circle"],
    answer: "The mirrored arrow",
    difficulty: 4,
  },
  {
    question: "What is the area of the rectangle?",
    visualHtml: buildVisualMeasurementCard(
      "Grid Rectangle",
      buildGridRectangleSvg({ widthCells: 5, heightCells: 3, shadeSquares: true }),
      "Each small square is 1 square cm."
    ),
    options: ["8 square cm", "12 square cm", "15 square cm", "18 square cm"],
    answer: "15 square cm",
    difficulty: 4,
  },
  {
    question: "What angle is shown?",
    visualHtml: buildVisualMeasurementCard(
      "Angle",
      buildAngleSvg({ angle: 90 }),
      "A square corner marks a right angle."
    ),
    options: ["45\u00b0", "60\u00b0", "90\u00b0", "120\u00b0"],
    answer: "90\u00b0",
    difficulty: 4,
  },

  {
    question: "What time is shown on the clock?",
    visualHtml: buildVisualMeasurementCard(
      "Clock",
      buildClockSvg({ hour: 4, minute: 45 }),
      "The minute hand points to 9."
    ),
    options: ["3:45", "4:15", "4:45", "5:45"],
    answer: "4:45",
    difficulty: 4,
  },
  {
    question: "Which bottle has the lower price per milliliter?",
    visualHtml: buildVisualMeasurementCard(
      "Receipt",
      buildReceiptHtml([
        ["250 mL", "4 shekels"],
        ["500 mL", "7 shekels"],
        ["1 liter", "15 shekels"],
      ]),
      "Compare the price per milliliter."
    ),
    options: ["250 mL for 4 shekels", "500 mL for 7 shekels", "1 liter for 15 shekels", "They cost the same"],
    answer: "500 mL for 7 shekels",
    difficulty: 4,
  },
  {
    question: "Which temperature is closest?",
    visualHtml: buildVisualMeasurementCard(
      "Thermometer",
      buildThermometerSvg({ temperature: 24 }),
      THERMOMETER_DETAIL_TEXT
    ),
    options: ["About 14\u00b0C", "About 24\u00b0C", "About 34\u00b0C", "About 44\u00b0C"],
    answer: "About 24\u00b0C",
    difficulty: 4,
  },
  {
    question: "Which figure shows a reflection across the dotted line?",
    visualHtml: buildVisualMeasurementCard(
      "Reflection",
      buildSymmetrySvg({ type: "arrow" }),
      "The two sides should match as mirror images."
    ),
    options: ["The mirrored arrow", "A bigger arrow", "A rotated triangle", "A measuring cup"],
    answer: "The mirrored arrow",
    difficulty: 4,
  },
  {
    question: "What is the area of the rectangle?",
    visualHtml: buildVisualMeasurementCard(
      "Grid Rectangle",
      buildGridRectangleSvg({ widthCells: 6, heightCells: 4, shadeSquares: true }),
      "Each small square is 1 square cm."
    ),
    options: ["10 square cm", "20 square cm", "24 square cm", "28 square cm"],
    answer: "24 square cm",
    difficulty: 4,
  },
  {
    question: "What angle is shown?",
    visualHtml: buildVisualMeasurementCard(
      "Angle",
      buildAngleSvg({ angle: 60 }),
      "The arc shows the angle being measured."
    ),
    options: ["30\u00b0", "45\u00b0", "60\u00b0", "90\u00b0"],
    answer: "60\u00b0",
    difficulty: 4,
  },

  // Level 5: half-centimeter intervals, rotations, map scales, and larger capacity.
  {
    question: "How many centimeters long is the line?",
    visualHtml: buildVisualMeasurementCard(
      "Ruler",
      buildRulerSvg({ start: -3, end: 3.5 }),
      "The line begins at -3 cm."
    ),
    options: ["5.5 cm", "6 cm", "6.5 cm", "7 cm"],
    answer: "6.5 cm",
    difficulty: 5,
  },
  {
    question: "Which shape stays the same after a 180-degree turn?",
    visualHtml: buildVisualMeasurementCard(
      "Transformations",
      buildRotationCard(),
      "Think about rotation."
    ),
    options: ["A rectangle", "A lowercase b", "A triangle", "A number 7"],
    answer: "A rectangle",
    difficulty: 5,
  },
  {
    question: "What is the best estimate for the temperature?",
    visualHtml: buildVisualMeasurementCard(
      "Thermometer",
      buildThermometerSvg({ temperature: 41 }),
      THERMOMETER_DETAIL_TEXT
    ),
    options: ["About 21\u00b0C", "About 31\u00b0C", "About 41\u00b0C", "About 51\u00b0C"],
    answer: "About 41\u00b0C",
    difficulty: 5,
  },
  {
    question: "The map scale is 1 cm = 4 km. How far is the route?",
    visualHtml: buildVisualMeasurementCard(
      "Map Scale",
      buildMapScaleSvg({ routeCm: 5, kmPerCm: 4 }),
      "Multiply the map length by the scale."
    ),
    options: ["9 km", "16 km", "20 km", "25 km"],
    answer: "20 km",
    difficulty: 5,
  },
  {
    question: "How much water is in the jug?",
    visualHtml: buildVisualMeasurementCard(
      "Measuring Jug",
      buildMeasuringCupSvg({ amount: 1250, maxAmount: 2000, step: 500 }),
      CUP_DETAIL_TEXT
    ),
    options: ["1,000 mL", "1,250 mL", "1,500 mL", "2,000 mL"],
    answer: "1,250 mL",
    difficulty: 5,
  },
  {
    question: "What angle is shown?",
    visualHtml: buildVisualMeasurementCard(
      "Angle",
      buildAngleSvg({ angle: 120 }),
      "The arc shows the angle being measured."
    ),
    options: ["60\u00b0", "90\u00b0", "120\u00b0", "150\u00b0"],
    answer: "120\u00b0",
    difficulty: 5,
  },

  {
    question: "How many centimeters long is the line?",
    visualHtml: buildVisualMeasurementCard(
      "Ruler",
      buildRulerSvg({ start: -4, end: 3.5 }),
      "The line begins at -4 cm."
    ),
    options: ["6.5 cm", "7 cm", "7.5 cm", "8.5 cm"],
    answer: "7.5 cm",
    difficulty: 5,
  },
  {
    question: "Which description matches the picture?",
    visualHtml: buildVisualMeasurementCard(
      "Transformations",
      buildRotationCard(),
      "The rectangle is turned halfway around."
    ),
    options: ["A half-turn of a rectangle", "A reflection of a triangle", "A full turn of a circle", "A larger rectangle"],
    answer: "A half-turn of a rectangle",
    difficulty: 5,
  },
  {
    question: "What is the best estimate for the temperature?",
    visualHtml: buildVisualMeasurementCard(
      "Thermometer",
      buildThermometerSvg({ temperature: 36 }),
      THERMOMETER_DETAIL_TEXT
    ),
    options: ["About 16\u00b0C", "About 26\u00b0C", "About 36\u00b0C", "About 46\u00b0C"],
    answer: "About 36\u00b0C",
    difficulty: 5,
  },
  {
    question: "The map scale is 1 cm = 5 km. How far is the route?",
    visualHtml: buildVisualMeasurementCard(
      "Map Scale",
      buildMapScaleSvg({ routeCm: 4, kmPerCm: 5 }),
      "Multiply the map length by the scale."
    ),
    options: ["9 km", "16 km", "20 km", "25 km"],
    answer: "20 km",
    difficulty: 5,
  },
  {
    question: "How much water is in the jug?",
    visualHtml: buildVisualMeasurementCard(
      "Measuring Jug",
      buildMeasuringCupSvg({ amount: 1500, maxAmount: 2000, step: 500 }),
      CUP_DETAIL_TEXT
    ),
    options: ["1,000 mL", "1,250 mL", "1,500 mL", "2,000 mL"],
    answer: "1,500 mL",
    difficulty: 5,
  },
  {
    question: "What angle is shown?",
    visualHtml: buildVisualMeasurementCard(
      "Angle",
      buildAngleSvg({ angle: 150 }),
      "The arc shows the angle being measured."
    ),
    options: ["90\u00b0", "120\u00b0", "150\u00b0", "180\u00b0"],
    answer: "150\u00b0",
    difficulty: 5,
  },

  // Level 6: elapsed time, negative temperatures, conversions, and mixed metric readings.
  {
    question: "How much time passed between the two clocks?",
    visualHtml: buildVisualMeasurementCard(
      "Elapsed Time",
      buildClockPairSvg({ startHour: 4, startMinute: 20, endHour: 5, endMinute: 5 }),
      "Count from the first clock to the second clock."
    ),
    options: ["35 minutes", "45 minutes", "1 hour", "1 hour 15 minutes"],
    answer: "45 minutes",
    difficulty: 6,
  },
  {
    question: "What temperature is shown?",
    visualHtml: buildVisualMeasurementCard(
      "Thermometer",
      buildThermometerSvg({ temperature: -5 }),
      THERMOMETER_DETAIL_TEXT
    ),
    options: ["About -10\u00b0C", "About -5\u00b0C", "About 5\u00b0C", "About 15\u00b0C"],
    answer: "About -5\u00b0C",
    difficulty: 6,
  },
  {
    question: "How many grams is 2.5 kg?",
    visualHtml: buildVisualMeasurementCard(
      "Conversion",
      buildConversionCardHtml("1 kg = 1,000 g", "2.5 kg = ? g"),
      "Use the conversion fact."
    ),
    options: ["250 g", "2,050 g", "2,500 g", "25,000 g"],
    answer: "2,500 g",
    difficulty: 6,
  },
  {
    question: "Which container has more liquid?",
    visualHtml: buildVisualMeasurementCard(
      "Compare Capacity",
      buildCupComparisonSvg({ leftAmount: 750, rightAmount: 0.6, leftUnit: "mL", rightUnit: "L" }),
      "Convert 0.6 L to 600 mL."
    ),
    options: ["750 mL", "0.6 L", "They are equal", "Cannot tell"],
    answer: "750 mL",
    difficulty: 6,
  },
  {
    question: "What is the perimeter of the rectangle?",
    visualHtml: buildVisualMeasurementCard(
      "Grid Rectangle",
      buildGridRectangleSvg({ widthCells: 7, heightCells: 4 }),
      "Each grid square side is 1 cm."
    ),
    options: ["11 cm", "18 cm", "22 cm", "28 cm"],
    answer: "22 cm",
    difficulty: 6,
  },
  {
    question: "What mass is shown on the scale?",
    visualHtml: buildVisualMeasurementCard(
      "Scale",
      buildScaleSvg({ value: 2.5, max: 5, unit: "kg" }),
      SCALE_DETAIL_TEXT
    ),
    options: ["1.5 kg", "2 kg", "2.5 kg", "3.5 kg"],
    answer: "2.5 kg",
    difficulty: 6,
  },

  {
    question: "How much time passed between the two clocks?",
    visualHtml: buildVisualMeasurementCard(
      "Elapsed Time",
      buildClockPairSvg({ startHour: 8, startMinute: 10, endHour: 9, endMinute: 15 }),
      "Count from the first clock to the second clock."
    ),
    options: ["55 minutes", "1 hour", "1 hour 5 minutes", "1 hour 15 minutes"],
    answer: "1 hour 5 minutes",
    difficulty: 6,
  },
  {
    question: "What temperature is shown?",
    visualHtml: buildVisualMeasurementCard(
      "Thermometer",
      buildThermometerSvg({ temperature: -8 }),
      THERMOMETER_DETAIL_TEXT
    ),
    options: ["About -8\u00b0C", "About -3\u00b0C", "About 8\u00b0C", "About 18\u00b0C"],
    answer: "About -8\u00b0C",
    difficulty: 6,
  },
  {
    question: "How many grams is 3.5 kg?",
    visualHtml: buildVisualMeasurementCard(
      "Conversion",
      buildConversionCardHtml("1 kg = 1,000 g", "3.5 kg = ? g"),
      "Use the conversion fact."
    ),
    options: ["350 g", "3,050 g", "3,500 g", "35,000 g"],
    answer: "3,500 g",
    difficulty: 6,
  },
  {
    question: "Which container has more liquid?",
    visualHtml: buildVisualMeasurementCard(
      "Compare Capacity",
      buildCupComparisonSvg({ leftAmount: 1.25, rightAmount: 1000, leftUnit: "L", rightUnit: "mL" }),
      "Convert 1.25 L to 1,250 mL."
    ),
    options: ["1.25 L", "1,000 mL", "They are equal", "Cannot tell"],
    answer: "1.25 L",
    difficulty: 6,
  },
  {
    question: "What is the perimeter of the rectangle?",
    visualHtml: buildVisualMeasurementCard(
      "Grid Rectangle",
      buildGridRectangleSvg({ widthCells: 6, heightCells: 3 }),
      "Each grid square side is 1 cm."
    ),
    options: ["9 cm", "18 cm", "20 cm", "24 cm"],
    answer: "18 cm",
    difficulty: 6,
  },
  {
    question: "What mass is shown on the scale?",
    visualHtml: buildVisualMeasurementCard(
      "Scale",
      buildScaleSvg({ value: 3.5, max: 5, unit: "kg" }),
      SCALE_DETAIL_TEXT
    ),
    options: ["2.5 kg", "3 kg", "3.5 kg", "4.5 kg"],
    answer: "3.5 kg",
    difficulty: 6,
  },

  // Level 7: decimal map scales, sharper unit prices, and larger grid work.
  {
    question: "The map scale is 1 cm = 6 km. How far is the route?",
    visualHtml: buildVisualMeasurementCard(
      "Map Scale",
      buildMapScaleSvg({ routeCm: 4.5, kmPerCm: 6 }),
      "Multiply 4.5 by 6."
    ),
    options: ["24 km", "27 km", "30 km", "36 km"],
    answer: "27 km",
    difficulty: 7,
  },
  {
    question: "Which bottle has the lowest price per milliliter?",
    visualHtml: buildVisualMeasurementCard(
      "Receipt",
      buildReceiptHtml([
        ["250 mL", "4 shekels"],
        ["500 mL", "7 shekels"],
        ["1 liter", "15 shekels"],
      ]),
      "Compare price per 100 mL."
    ),
    options: ["250 mL for 4 shekels", "500 mL for 7 shekels", "1 liter for 15 shekels", "They are equal"],
    answer: "500 mL for 7 shekels",
    difficulty: 7,
  },
  {
    question: "How much more water is in Cup A than Cup B?",
    visualHtml: buildVisualMeasurementCard(
      "Compare Capacity",
      buildCupComparisonSvg({ leftAmount: 900, rightAmount: 650, leftUnit: "mL", rightUnit: "mL" }),
      "Subtract the smaller amount from the larger amount."
    ),
    options: ["150 mL", "200 mL", "250 mL", "300 mL"],
    answer: "250 mL",
    difficulty: 7,
  },
  {
    question: "What is the area of the rectangle?",
    visualHtml: buildVisualMeasurementCard(
      "Grid Rectangle",
      buildGridRectangleSvg({ widthCells: 8, heightCells: 5, shadeSquares: true }),
      "Each small square is 1 square cm."
    ),
    options: ["26 square cm", "32 square cm", "40 square cm", "45 square cm"],
    answer: "40 square cm",
    difficulty: 7,
  },
  {
    question: "What angle is shown?",
    visualHtml: buildVisualMeasurementCard(
      "Angle",
      buildAngleSvg({ angle: 135 }),
      "The arc shows the angle being measured."
    ),
    options: ["45\u00b0", "90\u00b0", "135\u00b0", "180\u00b0"],
    answer: "135\u00b0",
    difficulty: 7,
  },
  {
    question: "What is 3.2 meters in centimeters?",
    visualHtml: buildVisualMeasurementCard(
      "Conversion",
      buildConversionCardHtml("1 m = 100 cm", "3.2 m = ? cm"),
      "Multiply meters by 100."
    ),
    options: ["32 cm", "302 cm", "320 cm", "3,200 cm"],
    answer: "320 cm",
    difficulty: 7,
  },

  {
    question: "The map scale is 1 cm = 4 km. How far is the route?",
    visualHtml: buildVisualMeasurementCard(
      "Map Scale",
      buildMapScaleSvg({ routeCm: 5.5, kmPerCm: 4 }),
      "Multiply 5.5 by 4."
    ),
    options: ["18 km", "20 km", "22 km", "24 km"],
    answer: "22 km",
    difficulty: 7,
  },
  {
    question: "Which bag has the lowest price per kilogram?",
    visualHtml: buildVisualMeasurementCard(
      "Receipt",
      buildReceiptHtml([
        ["1 kg", "9 shekels"],
        ["2 kg", "17 shekels"],
        ["3 kg", "27 shekels"],
      ]),
      "Compare the price for 1 kg."
    ),
    options: ["1 kg for 9 shekels", "2 kg for 17 shekels", "3 kg for 27 shekels", "They are equal"],
    answer: "2 kg for 17 shekels",
    difficulty: 7,
  },
  {
    question: "How much more water is in Cup A than Cup B?",
    visualHtml: buildVisualMeasurementCard(
      "Compare Capacity",
      buildCupComparisonSvg({ leftAmount: 1.2, rightAmount: 850, leftUnit: "L", rightUnit: "mL" }),
      "Convert 1.2 L to 1,200 mL, then subtract."
    ),
    options: ["250 mL", "300 mL", "350 mL", "450 mL"],
    answer: "350 mL",
    difficulty: 7,
  },
  {
    question: "What is the area of the rectangle?",
    visualHtml: buildVisualMeasurementCard(
      "Grid Rectangle",
      buildGridRectangleSvg({ widthCells: 9, heightCells: 4, shadeSquares: true }),
      "Each small square is 1 square cm."
    ),
    options: ["26 square cm", "32 square cm", "36 square cm", "40 square cm"],
    answer: "36 square cm",
    difficulty: 7,
  },
  {
    question: "What angle is shown?",
    visualHtml: buildVisualMeasurementCard(
      "Angle",
      buildAngleSvg({ angle: 150 }),
      "The arc shows the angle being measured."
    ),
    options: ["60\u00b0", "90\u00b0", "135\u00b0", "150\u00b0"],
    answer: "150\u00b0",
    difficulty: 7,
  },
  {
    question: "What is 4.6 meters in centimeters?",
    visualHtml: buildVisualMeasurementCard(
      "Conversion",
      buildConversionCardHtml("1 m = 100 cm", "4.6 m = ? cm"),
      "Multiply meters by 100."
    ),
    options: ["46 cm", "406 cm", "460 cm", "4,600 cm"],
    answer: "460 cm",
    difficulty: 7,
  },

  // Level 8: multi-step time, comparing mixed units, and complementary angles.
  {
    question: "How much time passed between the two clocks?",
    visualHtml: buildVisualMeasurementCard(
      "Elapsed Time",
      buildClockPairSvg({ startHour: 10, startMinute: 35, endHour: 12, endMinute: 5 }),
      "Count through the hour."
    ),
    options: ["1 hour", "1 hour 20 minutes", "1 hour 30 minutes", "2 hours"],
    answer: "1 hour 30 minutes",
    difficulty: 8,
  },
  {
    question: "Which length is longer?",
    visualHtml: buildVisualMeasurementCard(
      "Compare Lengths",
      buildConversionCardHtml("1 m = 100 cm", "A: 2.4 m  |  B: 230 cm"),
      "Convert 2.4 m to centimeters."
    ),
    options: ["2.4 m", "230 cm", "They are equal", "Cannot tell"],
    answer: "2.4 m",
    difficulty: 8,
  },
  {
    question: "The map scale is 1 cm = 8 km. How far is the route?",
    visualHtml: buildVisualMeasurementCard(
      "Map Scale",
      buildMapScaleSvg({ routeCm: 6.5, kmPerCm: 8 }),
      "Multiply 6.5 by 8."
    ),
    options: ["48 km", "50 km", "52 km", "56 km"],
    answer: "52 km",
    difficulty: 8,
  },
  {
    question: "If the whole straight line is 180\u00b0, what is the missing angle?",
    visualHtml: buildVisualMeasurementCard(
      "Angles on a Line",
      buildAnglePairSvg({ knownAngle: 65 }),
      "Angles on a straight line add to 180\u00b0."
    ),
    options: ["65\u00b0", "105\u00b0", "115\u00b0", "125\u00b0"],
    answer: "115\u00b0",
    difficulty: 8,
  },
  {
    question: "Which jar has the lower price per 100 g?",
    visualHtml: buildVisualMeasurementCard(
      "Receipt",
      buildReceiptHtml([
        ["300 g", "12 shekels"],
        ["500 g", "18 shekels"],
        ["750 g", "30 shekels"],
      ]),
      "Compare unit prices."
    ),
    options: ["300 g for 12 shekels", "500 g for 18 shekels", "750 g for 30 shekels", "They are equal"],
    answer: "500 g for 18 shekels",
    difficulty: 8,
  },
  {
    question: "How many liters is 1,750 mL?",
    visualHtml: buildVisualMeasurementCard(
      "Conversion",
      buildConversionCardHtml("1 L = 1,000 mL", "1,750 mL = ? L"),
      "Divide milliliters by 1,000."
    ),
    options: ["0.175 L", "1.75 L", "17.5 L", "175 L"],
    answer: "1.75 L",
    difficulty: 8,
  },

  {
    question: "How much time passed between the two clocks?",
    visualHtml: buildVisualMeasurementCard(
      "Elapsed Time",
      buildClockPairSvg({ startHour: 7, startMinute: 50, endHour: 9, endMinute: 5 }),
      "Count through the hour."
    ),
    options: ["1 hour", "1 hour 15 minutes", "1 hour 25 minutes", "2 hours 15 minutes"],
    answer: "1 hour 15 minutes",
    difficulty: 8,
  },
  {
    question: "Which amount of liquid is larger?",
    visualHtml: buildVisualMeasurementCard(
      "Compare Measurements",
      buildConversionCardHtml("1 L = 1,000 mL", "A: 1.2 L  |  B: 1,150 mL"),
      "Convert to the same unit before comparing."
    ),
    options: ["1.2 L", "1,150 mL", "They are equal", "Cannot tell"],
    answer: "1.2 L",
    difficulty: 8,
  },
  {
    question: "The map scale is 1 cm = 6 km. How far is the route?",
    visualHtml: buildVisualMeasurementCard(
      "Map Scale",
      buildMapScaleSvg({ routeCm: 7.5, kmPerCm: 6 }),
      "Multiply 7.5 by 6."
    ),
    options: ["42 km", "45 km", "48 km", "54 km"],
    answer: "45 km",
    difficulty: 8,
  },
  {
    question: "If the whole straight line is 180\u00b0, what is the missing angle?",
    visualHtml: buildVisualMeasurementCard(
      "Angles on a Line",
      buildAnglePairSvg({ knownAngle: 75 }),
      "Angles on a straight line add to 180\u00b0."
    ),
    options: ["75\u00b0", "95\u00b0", "105\u00b0", "115\u00b0"],
    answer: "105\u00b0",
    difficulty: 8,
  },
  {
    question: "Which jar has the lower price per 100 g?",
    visualHtml: buildVisualMeasurementCard(
      "Receipt",
      buildReceiptHtml([
        ["400 g", "16 shekels"],
        ["600 g", "21 shekels"],
        ["800 g", "32 shekels"],
      ]),
      "Compare unit prices."
    ),
    options: ["400 g for 16 shekels", "600 g for 21 shekels", "800 g for 32 shekels", "They are equal"],
    answer: "600 g for 21 shekels",
    difficulty: 8,
  },
  {
    question: "How many liters is 2,250 mL?",
    visualHtml: buildVisualMeasurementCard(
      "Conversion",
      buildConversionCardHtml("1 L = 1,000 mL", "2,250 mL = ? L"),
      "Divide milliliters by 1,000."
    ),
    options: ["0.225 L", "2.25 L", "22.5 L", "225 L"],
    answer: "2.25 L",
    difficulty: 8,
  },

  // Level 9: combined measurement reasoning and harder conversions.
  {
    question: "What is the total distance of the two map routes?",
    visualHtml: buildVisualMeasurementCard(
      "Map Scale",
      buildDoubleMapScaleSvg({ firstCm: 3.5, secondCm: 4, kmPerCm: 10 }),
      "Add the map lengths, then multiply by the scale."
    ),
    options: ["65 km", "70 km", "75 km", "80 km"],
    answer: "75 km",
    difficulty: 9,
  },
  {
    question: "How much heavier is Box A than Box B?",
    visualHtml: buildVisualMeasurementCard(
      "Compare Mass",
      buildScaleComparisonSvg({ leftValue: 3.75, rightValue: 2.5, max: 5, unit: "kg" }),
      "Subtract the smaller mass from the larger mass."
    ),
    options: ["0.75 kg", "1 kg", "1.25 kg", "1.5 kg"],
    answer: "1.25 kg",
    difficulty: 9,
  },
  {
    question: "What is the missing angle?",
    visualHtml: buildVisualMeasurementCard(
      "Angles on a Line",
      buildAnglePairSvg({ knownAngle: 48 }),
      "Angles on a straight line add to 180\u00b0."
    ),
    options: ["42\u00b0", "122\u00b0", "132\u00b0", "142\u00b0"],
    answer: "132\u00b0",
    difficulty: 9,
  },
  {
    question: "Which rectangle has the larger area?",
    visualHtml: buildVisualMeasurementCard(
      "Compare Areas",
      buildAreaComparisonSvg({ leftW: 9, leftH: 4, rightW: 7, rightH: 6 }),
      "Find width times height for each rectangle."
    ),
    options: ["Rectangle A", "Rectangle B", "They are equal", "Cannot tell"],
    answer: "Rectangle B",
    difficulty: 9,
  },
  {
    question: "Which option has the lowest price per liter?",
    visualHtml: buildVisualMeasurementCard(
      "Receipt",
      buildReceiptHtml([
        ["0.75 L", "9 shekels"],
        ["1.5 L", "16 shekels"],
        ["2 L", "22 shekels"],
      ]),
      "Compare price per liter."
    ),
    options: ["0.75 L for 9 shekels", "1.5 L for 16 shekels", "2 L for 22 shekels", "They are equal"],
    answer: "1.5 L for 16 shekels",
    difficulty: 9,
  },
  {
    question: "How many centimeters is 0.85 meters?",
    visualHtml: buildVisualMeasurementCard(
      "Conversion",
      buildConversionCardHtml("1 m = 100 cm", "0.85 m = ? cm"),
      "Multiply meters by 100."
    ),
    options: ["8.5 cm", "85 cm", "850 cm", "8,500 cm"],
    answer: "85 cm",
    difficulty: 9,
  },

  {
    question: "What is the total distance of the two map routes?",
    visualHtml: buildVisualMeasurementCard(
      "Map Scale",
      buildDoubleMapScaleSvg({ firstCm: 2.5, secondCm: 6, kmPerCm: 8 }),
      "Add the map lengths, then multiply by the scale."
    ),
    options: ["60 km", "64 km", "68 km", "72 km"],
    answer: "68 km",
    difficulty: 9,
  },
  {
    question: "How much heavier is Box A than Box B?",
    visualHtml: buildVisualMeasurementCard(
      "Compare Mass",
      buildScaleComparisonSvg({ leftValue: 4.25, rightValue: 2.5, max: 5, unit: "kg" }),
      "Subtract the smaller mass from the larger mass."
    ),
    options: ["0.75 kg", "1.25 kg", "1.75 kg", "2 kg"],
    answer: "1.75 kg",
    difficulty: 9,
  },
  {
    question: "What is the missing angle?",
    visualHtml: buildVisualMeasurementCard(
      "Angles on a Line",
      buildAnglePairSvg({ knownAngle: 52 }),
      "Angles on a straight line add to 180\u00b0."
    ),
    options: ["118\u00b0", "128\u00b0", "132\u00b0", "142\u00b0"],
    answer: "128\u00b0",
    difficulty: 9,
  },
  {
    question: "Which rectangle has the larger area?",
    visualHtml: buildVisualMeasurementCard(
      "Compare Areas",
      buildAreaComparisonSvg({ leftW: 8, leftH: 5, rightW: 6, rightH: 6 }),
      "Find width times height for each rectangle."
    ),
    options: ["Rectangle A", "Rectangle B", "They are equal", "Cannot tell"],
    answer: "Rectangle A",
    difficulty: 9,
  },
  {
    question: "Which option has the lowest price per liter?",
    visualHtml: buildVisualMeasurementCard(
      "Receipt",
      buildReceiptHtml([
        ["1 L", "11 shekels"],
        ["1.5 L", "15 shekels"],
        ["2.5 L", "28 shekels"],
      ]),
      "Compare price per liter."
    ),
    options: ["1 L for 11 shekels", "1.5 L for 15 shekels", "2.5 L for 28 shekels", "They are equal"],
    answer: "1.5 L for 15 shekels",
    difficulty: 9,
  },
  {
    question: "How many grams is 4.25 kg?",
    visualHtml: buildVisualMeasurementCard(
      "Conversion",
      buildConversionCardHtml("1 kg = 1,000 g", "4.25 kg = ? g"),
      "Multiply kilograms by 1,000."
    ),
    options: ["425 g", "4,025 g", "4,250 g", "42,500 g"],
    answer: "4,250 g",
    difficulty: 9,
  },

  // Level 10: multi-step visual measurement and high-confidence estimation.
  {
    question: "A trip follows both routes. How far is the trip in real life?",
    visualHtml: buildVisualMeasurementCard(
      "Map Scale",
      buildDoubleMapScaleSvg({ firstCm: 4.5, secondCm: 3, kmPerCm: 12 }),
      "Add the map lengths, then multiply by 12 km per cm."
    ),
    options: ["84 km", "90 km", "96 km", "108 km"],
    answer: "90 km",
    difficulty: 10,
  },
  {
    question: "How much time passed between the two clocks?",
    visualHtml: buildVisualMeasurementCard(
      "Elapsed Time",
      buildClockPairSvg({ startHour: 11, startMinute: 50, endHour: 1, endMinute: 20 }),
      "Count across 12:00."
    ),
    options: ["1 hour", "1 hour 20 minutes", "1 hour 30 minutes", "2 hours 30 minutes"],
    answer: "1 hour 30 minutes",
    difficulty: 10,
  },
  {
    question: "Which container has the lowest price per liter?",
    visualHtml: buildVisualMeasurementCard(
      "Receipt",
      buildReceiptHtml([
        ["750 mL", "8 shekels"],
        ["1.25 L", "12 shekels"],
        ["2 L", "21 shekels"],
      ]),
      "Convert 750 mL to 0.75 L, then compare."
    ),
    options: ["750 mL for 8 shekels", "1.25 L for 12 shekels", "2 L for 21 shekels", "They are equal"],
    answer: "1.25 L for 12 shekels",
    difficulty: 10,
  },
  {
    question: "What is the missing angle?",
    visualHtml: buildVisualMeasurementCard(
      "Angles on a Line",
      buildAnglePairSvg({ knownAngle: 37 }),
      "Angles on a straight line add to 180\u00b0."
    ),
    options: ["127\u00b0", "133\u00b0", "143\u00b0", "153\u00b0"],
    answer: "143\u00b0",
    difficulty: 10,
  },
  {
    question: "A box weighs 2.75 kg. How many grams is that?",
    visualHtml: buildVisualMeasurementCard(
      "Conversion",
      buildConversionCardHtml("1 kg = 1,000 g", "2.75 kg = ? g"),
      "Multiply kilograms by 1,000."
    ),
    options: ["275 g", "2,075 g", "2,750 g", "27,500 g"],
    answer: "2,750 g",
    difficulty: 10,
  },
  {
    question: "Which rectangle has the smaller perimeter?",
    visualHtml: buildVisualMeasurementCard(
      "Compare Perimeters",
      buildAreaComparisonSvg({ leftW: 10, leftH: 3, rightW: 8, rightH: 5 }),
      "Find 2 x (width + height) for each rectangle."
    ),
    options: ["Rectangle A", "Rectangle B", "They are equal", "Cannot tell"],
    answer: "Rectangle A",
    difficulty: 10,
  },

  {
    question: "A trip follows both routes. How far is the trip in real life?",
    visualHtml: buildVisualMeasurementCard(
      "Map Scale",
      buildDoubleMapScaleSvg({ firstCm: 5.5, secondCm: 2.5, kmPerCm: 15 }),
      "Add the map lengths, then multiply by 15 km per cm."
    ),
    options: ["105 km", "112.5 km", "120 km", "135 km"],
    answer: "120 km",
    difficulty: 10,
  },
  {
    question: "How much time passed between the two clocks?",
    visualHtml: buildVisualMeasurementCard(
      "Elapsed Time",
      buildClockPairSvg({ startHour: 10, startMinute: 45, endHour: 12, endMinute: 30 }),
      "Count across 12:00."
    ),
    options: ["1 hour 15 minutes", "1 hour 30 minutes", "1 hour 45 minutes", "2 hours"],
    answer: "1 hour 45 minutes",
    difficulty: 10,
  },
  {
    question: "Which container has the lowest price per liter?",
    visualHtml: buildVisualMeasurementCard(
      "Receipt",
      buildReceiptHtml([
        ["900 mL", "9 shekels"],
        ["1.5 L", "14 shekels"],
        ["2.5 L", "25 shekels"],
      ]),
      "Convert 900 mL to 0.9 L, then compare."
    ),
    options: ["900 mL for 9 shekels", "1.5 L for 14 shekels", "2.5 L for 25 shekels", "They are equal"],
    answer: "1.5 L for 14 shekels",
    difficulty: 10,
  },
  {
    question: "What is the missing angle?",
    visualHtml: buildVisualMeasurementCard(
      "Angles on a Line",
      buildAnglePairSvg({ knownAngle: 73 }),
      "Angles on a straight line add to 180\u00b0."
    ),
    options: ["97\u00b0", "107\u00b0", "117\u00b0", "127\u00b0"],
    answer: "107\u00b0",
    difficulty: 10,
  },
  {
    question: "A box weighs 3.08 kg. How many grams is that?",
    visualHtml: buildVisualMeasurementCard(
      "Conversion",
      buildConversionCardHtml("1 kg = 1,000 g", "3.08 kg = ? g"),
      "Multiply kilograms by 1,000."
    ),
    options: ["308 g", "3,008 g", "3,080 g", "30,800 g"],
    answer: "3,080 g",
    difficulty: 10,
  },
  {
    question: "Which rectangle has the smaller perimeter?",
    visualHtml: buildVisualMeasurementCard(
      "Compare Perimeters",
      buildAreaComparisonSvg({ leftW: 7, leftH: 6, rightW: 9, rightH: 3 }),
      "Find 2 x (width + height) for each rectangle."
    ),
    options: ["Rectangle A", "Rectangle B", "They are equal", "Cannot tell"],
    answer: "Rectangle B",
    difficulty: 10,
  },
];

function createVisualMeasurementGeneratedEntry(difficulty) {
  const level = clampVisualMeasurementDifficulty(difficulty);
  const generatorsByLevel = {
    1: [createRulerQuestion, createClockQuestion, createMeasuringCupQuestion, createScaleQuestion],
    2: [createRulerQuestion, createClockQuestion, createThermometerQuestion, createMeasuringCupQuestion, createScaleQuestion, createReflectionQuestion],
    3: [createRulerQuestion, createClockQuestion, createReceiptQuestion, visualMeasurementCreatePerimeterQuestion, createTurnQuestion],
    4: [createClockQuestion, visualMeasurementCreateUnitPriceQuestion, createThermometerQuestion, createReflectionQuestion, createAreaQuestion, createAngleQuestion],
    5: [createTransformationQuestion, createRulerQuestion, createThermometerQuestion, createMapScaleQuestion, createMeasuringCupQuestion, createAngleQuestion],
    6: [visualMeasurementCreateElapsedTimeQuestion, createThermometerQuestion, createConversionQuestion, createCapacityComparisonQuestion, visualMeasurementCreatePerimeterQuestion, createScaleQuestion],
    7: [createMapScaleQuestion, visualMeasurementCreateUnitPriceQuestion, createCapacityComparisonQuestion, createAreaQuestion, createAngleQuestion, createConversionQuestion],
    8: [visualMeasurementCreateElapsedTimeQuestion, createConversionComparisonQuestion, createMapScaleQuestion, createMissingAngleQuestion, visualMeasurementCreateUnitPriceQuestion, createConversionQuestion],
    9: [createDoubleMapScaleQuestion, createScaleComparisonQuestion, createMissingAngleQuestion, createAreaComparisonQuestion, visualMeasurementCreateUnitPriceQuestion, createConversionQuestion],
    10: [createDoubleMapScaleQuestion, visualMeasurementCreateElapsedTimeQuestion, visualMeasurementCreateUnitPriceQuestion, createMissingAngleQuestion, createConversionQuestion, createPerimeterComparisonQuestion],
  };

  return visualMeasurementRandomChoice(generatorsByLevel[level])(level);
}

function createRulerQuestion(difficulty = 1) {
  const level = clampVisualMeasurementDifficulty(difficulty);
  const config = {
    1: { lengths: [3, 4, 5, 6], starts: [0] },
    2: { lengths: [4, 4.5, 5, 5.5, 6], starts: [0] },
    3: { lengths: [5, 6, 7, 8, 9], starts: [-4, -3, -2, -1] },
    4: { lengths: [5.5, 6, 6.5, 7, 7.5], starts: [-5, -4, -3, -2] },
    5: { lengths: [6, 6.5, 7, 7.5, 8], starts: [-6, -5, -4, -3] },
    6: { lengths: [6.5, 7, 7.5, 8, 8.5], starts: [-7, -6, -5, -4] },
    7: { lengths: [7.5, 8, 8.5, 9, 9.5], starts: [-8, -7, -6, -5] },
    8: { lengths: [8, 8.5, 9, 9.5, 10], starts: [-9, -8, -7, -6] },
    9: { lengths: [8.5, 9, 9.5, 10, 10.5], starts: [-10, -9, -8, -7] },
    10: { lengths: [9, 9.5, 10, 10.5, 11], starts: [-10, -9, -8] },
  }[level];
  const length = visualMeasurementRandomChoice(config.lengths);
  const start = visualMeasurementRandomChoice(config.starts);
  const end = start + length;
  const answer = `${visualMeasurementFormatNumber(length)} cm`;
  return visualMeasurementBuildQuestion({
    question: "How long is the line shown on the ruler?",
    visualHtml: buildVisualMeasurementCard(
      "Ruler",
      buildRulerSvg({ start, end }),
      start === 0 ? RULER_DETAIL_TEXT : `The line begins at ${visualMeasurementFormatNumber(start)} cm.`
    ),
    options: visualMeasurementBuildMeasurementOptions(length, "cm", [length + 0.5, length - 0.5, length + 1, Math.max(0.5, length - 1)]),
    answer,
    difficulty: level,
    visualSummary: `The line is ${answer}.`,
  });
}

function createClockQuestion(difficulty = 2) {
  const level = clampVisualMeasurementDifficulty(difficulty);
  const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const minuteChoices = level <= 1 ? [0] : level <= 2 ? [0, 30] : level <= 4 ? [0, 15, 30, 45] : [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  const hour = visualMeasurementRandomChoice(hours);
  const minute = visualMeasurementRandomChoice(minuteChoices);
  const answer = visualMeasurementFormatClockTime(hour, minute);
  return visualMeasurementBuildQuestion({
    question: "What time is shown on the clock?",
    visualHtml: buildVisualMeasurementCard("Clock", buildClockSvg({ hour, minute }), "Look at the hour hand and minute hand."),
    options: visualMeasurementBuildOptions(answer, [
      visualMeasurementFormatClockTime(hour + 1, minute),
      visualMeasurementFormatClockTime(hour, (minute + (level <= 2 ? 30 : 15)) % 60),
      visualMeasurementFormatClockTime(hour - 1, minute),
      visualMeasurementFormatClockTime(hour, (minute + 5) % 60),
    ]),
    answer,
    difficulty: level,
    visualSummary: `The time is ${answer}.`,
  });
}

function createThermometerQuestion(difficulty = 2) {
  const level = clampVisualMeasurementDifficulty(difficulty);
  const temperatures = level <= 2
    ? [8, 12, 18, 20, 24]
    : level <= 5
      ? [6, 14, 22, 28, 34, 40]
      : [-8, -5, 0, 7, 16, 27, 38, 45];
  const temperature = visualMeasurementRandomChoice(temperatures);
  const answer = `About ${temperature}\u00b0C`;
  return visualMeasurementBuildQuestion({
    question: "What temperature is shown?",
    visualHtml: buildVisualMeasurementCard("Thermometer", buildThermometerSvg({ temperature }), THERMOMETER_DETAIL_TEXT),
    options: visualMeasurementBuildOptions(answer, [
      `About ${temperature + 5}\u00b0C`,
      `About ${temperature - 5}\u00b0C`,
      `About ${temperature + 10}\u00b0C`,
      `About ${temperature - 10}\u00b0C`,
    ]),
    answer,
    difficulty: level,
    visualSummary: `The temperature is ${answer}.`,
  });
}

function createMeasuringCupQuestion(difficulty = 2) {
  const level = clampVisualMeasurementDifficulty(difficulty);
  const config = level <= 2
    ? { maxAmount: 800, step: 200, amounts: [200, 300, 400, 500, 600] }
    : level <= 5
      ? { maxAmount: 2000, step: 500, amounts: [750, 1000, 1250, 1500, 1750] }
      : { maxAmount: 2500, step: 500, amounts: [650, 900, 1100, 1350, 1750, 2250] };
  const amount = visualMeasurementRandomChoice(config.amounts);
  const answer = `${visualMeasurementFormatNumber(amount)} mL`;
  return visualMeasurementBuildQuestion({
    question: "How much liquid is in the measuring cup?",
    visualHtml: buildVisualMeasurementCard("Measuring Cup", buildMeasuringCupSvg({ amount, maxAmount: config.maxAmount, step: config.step }), CUP_DETAIL_TEXT),
    options: visualMeasurementBuildMeasurementOptions(amount, "mL", [amount + 100, amount - 100, amount + 250, Math.max(0, amount - 250)]),
    answer,
    difficulty: level,
    visualSummary: `The cup shows ${answer}.`,
  });
}

function createScaleQuestion(difficulty = 2) {
  const level = clampVisualMeasurementDifficulty(difficulty);
  const useKg = level >= 5;
  const config = useKg
    ? { max: 5, unit: "kg", values: [1.5, 2, 2.5, 3, 3.5, 4.5], offsets: [0.5, -0.5, 1, -1] }
    : { max: 1000, unit: "g", values: [200, 300, 400, 500, 600, 750, 900], offsets: [100, -100, 200, -200] };
  const value = visualMeasurementRandomChoice(config.values);
  const answer = `${visualMeasurementFormatNumber(value)} ${config.unit}`;
  return visualMeasurementBuildQuestion({
    question: "What mass is shown on the scale?",
    visualHtml: buildVisualMeasurementCard("Scale", buildScaleSvg({ value, max: config.max, unit: config.unit }), SCALE_DETAIL_TEXT),
    options: visualMeasurementBuildMeasurementOptions(value, config.unit, config.offsets.map((offset) => Math.max(0, value + offset))),
    answer,
    difficulty: level,
    visualSummary: `The scale shows ${answer}.`,
  });
}

function createReceiptQuestion(difficulty = 3) {
  const level = clampVisualMeasurementDifficulty(difficulty);
  const itemSets = [
    [
      { label: "2 cups for 10 shekels", size: 2, rowA: "2 cups", rowB: "10 shekels" },
      { label: "4 cups for 16 shekels", size: 4, rowA: "4 cups", rowB: "16 shekels" },
      { label: "3 cups for 15 shekels", size: 3, rowA: "3 cups", rowB: "15 shekels" },
      { label: "5 cups for 25 shekels", size: 5, rowA: "5 cups", rowB: "25 shekels" },
    ],
    [
      { label: "3 apples for 12 shekels", size: 3, rowA: "3 apples", rowB: "12 shekels" },
      { label: "5 apples for 18 shekels", size: 5, rowA: "5 apples", rowB: "18 shekels" },
      { label: "4 apples for 16 shekels", size: 4, rowA: "4 apples", rowB: "16 shekels" },
      { label: "2 apples for 9 shekels", size: 2, rowA: "2 apples", rowB: "9 shekels" },
    ],
  ];
  const items = visualMeasurementRandomChoice(itemSets).map((item) => ({
    ...item,
    price: Number(item.rowB.split(" ")[0]),
  }));
  const answer = items.reduce((winner, item) => item.price / item.size < winner.price / winner.size ? item : winner).label;
  return visualMeasurementBuildQuestion({
    question: "Which deal has the lowest unit price?",
    visualHtml: buildVisualMeasurementCard("Receipt", buildReceiptHtml(items.map((item) => [item.rowA, item.rowB])), "Compare the price for one item."),
    options: items.map((item) => item.label),
    answer,
    difficulty: level,
    visualSummary: `${answer} has the lowest unit price.`,
  });
}

function visualMeasurementCreateUnitPriceQuestion(difficulty = 4) {
  const level = clampVisualMeasurementDifficulty(difficulty);
  const itemSets = level >= 8
    ? [
        [
          { label: "300 g for 12 shekels", amount: 300, price: 12, rowA: "300 g", rowB: "12 shekels" },
          { label: "500 g for 18 shekels", amount: 500, price: 18, rowA: "500 g", rowB: "18 shekels" },
          { label: "750 g for 30 shekels", amount: 750, price: 30, rowA: "750 g", rowB: "30 shekels" },
          { label: "1 kg for 42 shekels", amount: 1000, price: 42, rowA: "1 kg", rowB: "42 shekels" },
        ],
        [
          { label: "0.75 L for 8 shekels", amount: 0.75, price: 8, rowA: "0.75 L", rowB: "8 shekels" },
          { label: "1.25 L for 12 shekels", amount: 1.25, price: 12, rowA: "1.25 L", rowB: "12 shekels" },
          { label: "2 L for 21 shekels", amount: 2, price: 21, rowA: "2 L", rowB: "21 shekels" },
          { label: "1 L for 11 shekels", amount: 1, price: 11, rowA: "1 L", rowB: "11 shekels" },
        ],
      ]
    : [
        [
          { label: "250 mL for 4 shekels", amount: 250, price: 4, rowA: "250 mL", rowB: "4 shekels" },
          { label: "500 mL for 7 shekels", amount: 500, price: 7, rowA: "500 mL", rowB: "7 shekels" },
          { label: "1 liter for 15 shekels", amount: 1000, price: 15, rowA: "1 liter", rowB: "15 shekels" },
          { label: "750 mL for 12 shekels", amount: 750, price: 12, rowA: "750 mL", rowB: "12 shekels" },
        ],
      ];
  const items = visualMeasurementRandomChoice(itemSets);
  const answer = items.reduce((winner, item) => item.price / item.amount < winner.price / winner.amount ? item : winner).label;
  return visualMeasurementBuildQuestion({
    question: level >= 8 ? "Which item has the lowest unit price?" : "Which bottle has the lowest unit price?",
    visualHtml: buildVisualMeasurementCard("Receipt", buildReceiptHtml(items.map((item) => [item.rowA, item.rowB])), "Compare the unit price."),
    options: items.map((item) => item.label),
    answer,
    difficulty: level,
    visualSummary: `${answer} has the lowest unit price.`,
  });
}

function createReflectionQuestion(difficulty = 4) {
  const level = clampVisualMeasurementDifficulty(difficulty);
  return visualMeasurementBuildQuestion({
    question: "Which image shows a reflection across the dotted line?",
    visualHtml: buildVisualMeasurementCard("Reflection", buildSymmetrySvg({ type: "arrow" }), "Mirror images match across the line."),
    options: ["The mirrored arrow", "A bigger arrow", "A rotated square", "A circle"],
    answer: "The mirrored arrow",
    difficulty: level,
    visualSummary: "The mirrored arrow is a reflection.",
  });
}

function createTransformationQuestion(difficulty = 5) {
  const level = clampVisualMeasurementDifficulty(difficulty);
  return visualMeasurementBuildQuestion({
    question: "Which shape stays the same after a 180-degree turn?",
    visualHtml: buildVisualMeasurementCard("Transformations", buildRotationCard(), "Think about a half-turn."),
    options: ["A rectangle", "A triangle", "A lowercase b", "A number 7"],
    answer: "A rectangle",
    difficulty: level,
    visualSummary: "A rectangle matches after a half-turn.",
  });
}

function createTurnQuestion(difficulty = 3) {
  const level = clampVisualMeasurementDifficulty(difficulty);
  const choices = [
    { start: "up", turn: "right", answer: "A quarter-turn clockwise" },
    { start: "right", turn: "down", answer: "A quarter-turn clockwise" },
    { start: "up", turn: "left", answer: "A quarter-turn counterclockwise" },
    { start: "left", turn: "right", answer: "A half-turn" },
  ];
  const item = visualMeasurementRandomChoice(choices);
  return visualMeasurementBuildQuestion({
    question: "Which turn is shown by the arrow?",
    visualHtml: buildVisualMeasurementCard("Turn", buildTurnSvg({ start: item.start, turn: item.turn }), "Compare the first arrow to the second arrow."),
    options: ["A quarter-turn clockwise", "A quarter-turn counterclockwise", "A half-turn", "A full turn"],
    answer: item.answer,
    difficulty: level,
    visualSummary: `The turn is ${item.answer}.`,
  });
}

function visualMeasurementCreatePerimeterQuestion(difficulty = 5) {
  const level = clampVisualMeasurementDifficulty(difficulty);
  const dims = level >= 7
    ? [[8, 5], [9, 4], [7, 6], [10, 3]]
    : [[4, 2], [5, 3], [6, 3], [7, 4]];
  const [widthCells, heightCells] = visualMeasurementRandomChoice(dims);
  const perimeter = 2 * (widthCells + heightCells);
  const answer = `${perimeter} cm`;
  return visualMeasurementBuildQuestion({
    question: "What is the perimeter of the rectangle?",
    visualHtml: buildVisualMeasurementCard("Grid Rectangle", buildGridRectangleSvg({ widthCells, heightCells }), "Each grid square side is 1 cm."),
    options: visualMeasurementBuildMeasurementOptions(perimeter, "cm", [widthCells + heightCells, widthCells * heightCells, perimeter + 2, perimeter - 2]),
    answer,
    difficulty: level,
    visualSummary: `The perimeter is ${answer}.`,
  });
}

function createAreaQuestion(difficulty = 5) {
  const level = clampVisualMeasurementDifficulty(difficulty);
  const dims = level >= 7
    ? [[8, 5], [9, 4], [7, 6], [10, 3]]
    : [[4, 3], [5, 3], [6, 4], [7, 3]];
  const [widthCells, heightCells] = visualMeasurementRandomChoice(dims);
  const area = widthCells * heightCells;
  const answer = `${area} square cm`;
  return visualMeasurementBuildQuestion({
    question: "What is the area of the rectangle?",
    visualHtml: buildVisualMeasurementCard("Grid Rectangle", buildGridRectangleSvg({ widthCells, heightCells, shadeSquares: true }), "Each small square is 1 square cm."),
    options: visualMeasurementBuildOptions(answer, [`${area + widthCells} square cm`, `${area - heightCells} square cm`, `${2 * (widthCells + heightCells)} square cm`, `${area + 4} square cm`]),
    answer,
    difficulty: level,
    visualSummary: `The area is ${answer}.`,
  });
}

function createAngleQuestion(difficulty = 5) {
  const level = clampVisualMeasurementDifficulty(difficulty);
  const angles = level <= 4 ? [45, 60, 90] : level <= 7 ? [30, 45, 60, 90, 120, 135, 150] : [25, 35, 55, 70, 110, 125, 145];
  const angle = visualMeasurementRandomChoice(angles);
  const answer = `${angle}\u00b0`;
  return visualMeasurementBuildQuestion({
    question: "What angle is shown?",
    visualHtml: buildVisualMeasurementCard("Angle", buildAngleSvg({ angle }), "The arc shows the angle being measured."),
    options: visualMeasurementBuildOptions(answer, [`${Math.max(5, angle - 30)}\u00b0`, `${angle + 30}\u00b0`, `${Math.max(5, 180 - angle)}\u00b0`, `${angle + 15}\u00b0`]),
    answer,
    difficulty: level,
    visualSummary: `The angle is ${answer}.`,
  });
}

function createMapScaleQuestion(difficulty = 6) {
  const level = clampVisualMeasurementDifficulty(difficulty);
  const choices = level >= 8
    ? [{ routeCm: 6.5, kmPerCm: 8 }, { routeCm: 5.5, kmPerCm: 12 }, { routeCm: 7.5, kmPerCm: 6 }]
    : level >= 6
      ? [{ routeCm: 4.5, kmPerCm: 6 }, { routeCm: 5.5, kmPerCm: 4 }, { routeCm: 3.5, kmPerCm: 8 }]
      : [{ routeCm: 5, kmPerCm: 4 }, { routeCm: 4, kmPerCm: 5 }, { routeCm: 6, kmPerCm: 3 }];
  const { routeCm, kmPerCm } = visualMeasurementRandomChoice(choices);
  const distance = routeCm * kmPerCm;
  const answer = `${visualMeasurementFormatNumber(distance)} km`;
  return visualMeasurementBuildQuestion({
    question: `The map scale is 1 cm = ${kmPerCm} km. How far is the route?`,
    visualHtml: buildVisualMeasurementCard("Map Scale", buildMapScaleSvg({ routeCm, kmPerCm }), "Multiply the map length by the scale."),
    options: visualMeasurementBuildMeasurementOptions(distance, "km", [distance + kmPerCm, distance - kmPerCm, distance + 2 * kmPerCm, Math.max(1, distance - 2 * kmPerCm)]),
    answer,
    difficulty: level,
    visualSummary: `The route is ${answer}.`,
  });
}

function createDoubleMapScaleQuestion(difficulty = 9) {
  const level = clampVisualMeasurementDifficulty(difficulty);
  const choices = [
    { firstCm: 3.5, secondCm: 4, kmPerCm: 10 },
    { firstCm: 4.5, secondCm: 3, kmPerCm: 12 },
    { firstCm: 2.5, secondCm: 6, kmPerCm: 8 },
  ];
  const item = visualMeasurementRandomChoice(choices);
  const distance = (item.firstCm + item.secondCm) * item.kmPerCm;
  const answer = `${visualMeasurementFormatNumber(distance)} km`;
  return visualMeasurementBuildQuestion({
    question: "What is the total distance of the two map routes?",
    visualHtml: buildVisualMeasurementCard("Map Scale", buildDoubleMapScaleSvg(item), "Add the map lengths, then multiply by the scale."),
    options: visualMeasurementBuildMeasurementOptions(distance, "km", [distance - item.kmPerCm, distance + item.kmPerCm, distance + 2 * item.kmPerCm, Math.max(1, distance - 2 * item.kmPerCm)]),
    answer,
    difficulty: level,
    visualSummary: `The total distance is ${answer}.`,
  });
}

function visualMeasurementCreateElapsedTimeQuestion(difficulty = 7) {
  const level = clampVisualMeasurementDifficulty(difficulty);
  const choices = level >= 10
    ? [
        { startHour: 11, startMinute: 50, addMinutes: 90 },
        { startHour: 10, startMinute: 45, addMinutes: 105 },
        { startHour: 1, startMinute: 35, addMinutes: 145 },
      ]
    : level >= 8
      ? [
          { startHour: 10, startMinute: 35, addMinutes: 90 },
          { startHour: 7, startMinute: 50, addMinutes: 75 },
          { startHour: 2, startMinute: 25, addMinutes: 110 },
        ]
      : [
          { startHour: 4, startMinute: 20, addMinutes: 45 },
          { startHour: 8, startMinute: 10, addMinutes: 65 },
          { startHour: 5, startMinute: 45, addMinutes: 50 },
        ];
  const item = visualMeasurementRandomChoice(choices);
  const end = visualMeasurementAddMinutes(item.startHour, item.startMinute, item.addMinutes);
  const answer = visualMeasurementFormatDuration(item.addMinutes);
  return visualMeasurementBuildQuestion({
    question: "How much time passed between the two clocks?",
    visualHtml: buildVisualMeasurementCard(
      "Elapsed Time",
      buildClockPairSvg({ startHour: item.startHour, startMinute: item.startMinute, endHour: end.hour, endMinute: end.minute }),
      "Count from the first clock to the second clock."
    ),
    options: visualMeasurementBuildOptions(answer, [
      visualMeasurementFormatDuration(Math.max(5, item.addMinutes - 15)),
      visualMeasurementFormatDuration(item.addMinutes + 15),
      visualMeasurementFormatDuration(item.addMinutes + 30),
      visualMeasurementFormatDuration(Math.max(5, item.addMinutes - 30)),
    ]),
    answer,
    difficulty: level,
    visualSummary: `${answer} passed.`,
  });
}

function createConversionQuestion(difficulty = 7) {
  const level = clampVisualMeasurementDifficulty(difficulty);
  const choices = [
    { fact: "1 kg = 1,000 g", prompt: "2.5 kg = ? g", answer: "2,500 g", distractors: ["250 g", "2,050 g", "25,000 g"] },
    { fact: "1 m = 100 cm", prompt: "3.2 m = ? cm", answer: "320 cm", distractors: ["32 cm", "302 cm", "3,200 cm"] },
    { fact: "1 L = 1,000 mL", prompt: "1,750 mL = ? L", answer: "1.75 L", distractors: ["0.175 L", "17.5 L", "175 L"] },
    { fact: "1 kg = 1,000 g", prompt: "2.75 kg = ? g", answer: "2,750 g", distractors: ["275 g", "2,075 g", "27,500 g"] },
    { fact: "1 m = 100 cm", prompt: "0.85 m = ? cm", answer: "85 cm", distractors: ["8.5 cm", "850 cm", "8,500 cm"] },
  ];
  const available = level <= 6 ? choices.slice(0, 2) : level <= 8 ? choices.slice(0, 3) : choices;
  const item = visualMeasurementRandomChoice(available);
  return visualMeasurementBuildQuestion({
    question: `Convert: ${item.prompt.replace("?", "what")}`,
    visualHtml: buildVisualMeasurementCard("Conversion", buildConversionCardHtml(item.fact, item.prompt), "Use the conversion fact."),
    options: visualMeasurementBuildOptions(item.answer, item.distractors),
    answer: item.answer,
    difficulty: level,
    visualSummary: `${item.prompt.replace("?", item.answer)}`,
  });
}

function createConversionComparisonQuestion(difficulty = 8) {
  const level = clampVisualMeasurementDifficulty(difficulty);
  const choices = [
    { fact: "1 m = 100 cm", prompt: "A: 2.4 m  |  B: 230 cm", answer: "2.4 m", distractors: ["230 cm", "They are equal", "Cannot tell"] },
    { fact: "1 L = 1,000 mL", prompt: "A: 1.2 L  |  B: 1,150 mL", answer: "1.2 L", distractors: ["1,150 mL", "They are equal", "Cannot tell"] },
    { fact: "1 kg = 1,000 g", prompt: "A: 1.4 kg  |  B: 1,450 g", answer: "1,450 g", distractors: ["1.4 kg", "They are equal", "Cannot tell"] },
  ];
  const item = visualMeasurementRandomChoice(choices);
  return visualMeasurementBuildQuestion({
    question: "Which measurement is larger?",
    visualHtml: buildVisualMeasurementCard("Compare Measurements", buildConversionCardHtml(item.fact, item.prompt), "Convert to the same unit before comparing."),
    options: visualMeasurementBuildOptions(item.answer, item.distractors),
    answer: item.answer,
    difficulty: level,
    visualSummary: `${item.answer} is larger.`,
  });
}

function createCapacityComparisonQuestion(difficulty = 7) {
  const level = clampVisualMeasurementDifficulty(difficulty);
  const choices = [
    { leftAmount: 750, rightAmount: 0.6, leftUnit: "mL", rightUnit: "L", answer: "750 mL", distractors: ["0.6 L", "They are equal", "Cannot tell"] },
    { leftAmount: 900, rightAmount: 650, leftUnit: "mL", rightUnit: "mL", answer: "250 mL", askDifference: true, distractors: ["150 mL", "200 mL", "300 mL"] },
    { leftAmount: 1.25, rightAmount: 1000, leftUnit: "L", rightUnit: "mL", answer: "1.25 L", distractors: ["1,000 mL", "They are equal", "Cannot tell"] },
  ];
  const item = visualMeasurementRandomChoice(choices);
  return visualMeasurementBuildQuestion({
    question: item.askDifference ? "How much more liquid is in Cup A than Cup B?" : "Which container has more liquid?",
    visualHtml: buildVisualMeasurementCard("Compare Capacity", buildCupComparisonSvg(item), item.askDifference ? "Subtract the smaller amount from the larger amount." : "Convert to the same unit before comparing."),
    options: visualMeasurementBuildOptions(item.answer, item.distractors),
    answer: item.answer,
    difficulty: level,
    visualSummary: item.askDifference ? `The difference is ${item.answer}.` : `${item.answer} has more liquid.`,
  });
}

function createMissingAngleQuestion(difficulty = 8) {
  const level = clampVisualMeasurementDifficulty(difficulty);
  const knownAngles = level >= 10 ? [37, 48, 52, 73] : [45, 60, 65, 75, 110];
  const knownAngle = visualMeasurementRandomChoice(knownAngles);
  const missing = 180 - knownAngle;
  const answer = `${missing}\u00b0`;
  return visualMeasurementBuildQuestion({
    question: "If the whole straight line is 180\u00b0, what is the missing angle?",
    visualHtml: buildVisualMeasurementCard("Angles on a Line", buildAnglePairSvg({ knownAngle }), "Angles on a straight line add to 180\u00b0."),
    options: visualMeasurementBuildOptions(answer, [`${knownAngle}\u00b0`, `${Math.max(5, missing - 10)}\u00b0`, `${missing + 10}\u00b0`, `${Math.abs(missing - knownAngle)}\u00b0`]),
    answer,
    difficulty: level,
    visualSummary: `The missing angle is ${answer}.`,
  });
}

function createScaleComparisonQuestion(difficulty = 9) {
  const level = clampVisualMeasurementDifficulty(difficulty);
  const choices = [
    { leftValue: 3.75, rightValue: 2.5, max: 5, unit: "kg", answer: "1.25 kg" },
    { leftValue: 4.5, rightValue: 3.25, max: 5, unit: "kg", answer: "1.25 kg" },
    { leftValue: 2.75, rightValue: 1.5, max: 5, unit: "kg", answer: "1.25 kg" },
  ];
  const item = visualMeasurementRandomChoice(choices);
  return visualMeasurementBuildQuestion({
    question: "How much heavier is Box A than Box B?",
    visualHtml: buildVisualMeasurementCard("Compare Mass", buildScaleComparisonSvg(item), "Subtract the smaller mass from the larger mass."),
    options: visualMeasurementBuildOptions(item.answer, ["0.75 kg", "1 kg", "1.5 kg", "2 kg"]),
    answer: item.answer,
    difficulty: level,
    visualSummary: `Box A is ${item.answer} heavier.`,
  });
}

function createAreaComparisonQuestion(difficulty = 9) {
  const level = clampVisualMeasurementDifficulty(difficulty);
  const choices = [
    { leftW: 9, leftH: 4, rightW: 7, rightH: 6, answer: "Rectangle B" },
    { leftW: 8, leftH: 5, rightW: 6, rightH: 6, answer: "Rectangle A" },
    { leftW: 10, leftH: 3, rightW: 5, rightH: 6, answer: "They are equal" },
  ];
  const item = visualMeasurementRandomChoice(choices);
  return visualMeasurementBuildQuestion({
    question: "Which rectangle has the larger area?",
    visualHtml: buildVisualMeasurementCard("Compare Areas", buildAreaComparisonSvg(item), "Find width times height for each rectangle."),
    options: ["Rectangle A", "Rectangle B", "They are equal", "Cannot tell"],
    answer: item.answer,
    difficulty: level,
    visualSummary: `${item.answer} has the larger area.`,
  });
}

function createPerimeterComparisonQuestion(difficulty = 10) {
  const level = clampVisualMeasurementDifficulty(difficulty);
  const choices = [
    { leftW: 10, leftH: 3, rightW: 8, rightH: 5, answer: "Rectangle A" },
    { leftW: 7, leftH: 6, rightW: 9, rightH: 3, answer: "Rectangle B" },
    { leftW: 8, leftH: 4, rightW: 6, rightH: 6, answer: "They are equal" },
  ];
  const item = visualMeasurementRandomChoice(choices);
  return visualMeasurementBuildQuestion({
    question: "Which rectangle has the smaller perimeter?",
    visualHtml: buildVisualMeasurementCard("Compare Perimeters", buildAreaComparisonSvg(item), "Find 2 x (width + height) for each rectangle."),
    options: ["Rectangle A", "Rectangle B", "They are equal", "Cannot tell"],
    answer: item.answer,
    difficulty: level,
    visualSummary: `${item.answer} has the smaller perimeter.`,
  });
}

function visualMeasurementBuildQuestion({
  question,
  options,
  answer,
  difficulty,
  visualHtml = "",
  visualSummary = "",
}) {
  if (!String(question || "").trim()) {
    throw new Error("Visual measurement questions require question text.");
  }
  if (!Array.isArray(options) || options.length !== 4 || !options.includes(answer)) {
    throw new Error(`Visual measurement questions require exactly 4 options with one answer: ${question}`);
  }

  return {
    question,
    visualHtml,
    options: visualMeasurementShuffleArray(options),
    answer,
    difficulty: clampVisualMeasurementDifficulty(difficulty),
    visualSummary,
    type: "visual-measurement-choice",
  };
}

function buildVisualMeasurementCard(title, innerHtml, detailText = "") {
  return `
    <div style="
      display: inline-block;
      max-width: 660px;
      padding: 14px;
      border: 2px solid #274972;
      border-radius: 16px;
      background: linear-gradient(180deg, #f8fbff 0%, #eef5ff 100%);
      color: #274972;
      font-family: Arial, sans-serif;
    ">
      <div style="font-size: 16px; font-weight: 700; margin-bottom: 10px;">${visualMeasurementEscapeHtml(title)}</div>
      ${innerHtml}
      ${detailText ? `<div style="margin-top: 10px; font-size: 13px; line-height: 1.35;">${visualMeasurementEscapeHtml(detailText)}</div>` : ""}
    </div>
  `;
}

function buildRulerSvg({ start = 0, end = 5 } = {}) {
  const minMark = Math.min(-2, Math.floor(start) - 1);
  const maxMark = Math.max(8, Math.ceil(end) + 1);
  const height = 100;
  const left = 24;
  const scale = 36;
  const rangeWidth = (maxMark - minMark) * scale;
  const width = left + rangeWidth + 44;
  const lineStart = left + (start - minMark) * scale;
  const lineEnd = left + (end - minMark) * scale;
  const ticks = [];

  for (let mark = minMark; mark <= maxMark; mark += 0.5) {
    const x = left + (mark - minMark) * scale;
    const isMajor = Number.isInteger(mark);
    ticks.push(`
      <line x1="${x}" y1="38" x2="${x}" y2="${isMajor ? 64 : 54}" stroke="#274972" stroke-width="${isMajor ? 2 : 1.25}"></line>
      ${isMajor ? `<text x="${x}" y="80" text-anchor="middle" font-size="11" fill="#274972">${mark}</text>` : ""}
    `);
  }

  return `
    <svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-hidden="true">
      <rect x="${lineStart}" y="22" width="${Math.max(4, lineEnd - lineStart)}" height="18" rx="9" fill="#f2b134" stroke="#274972" stroke-width="2"></rect>
      <line x1="${left}" y1="44" x2="${width - 18}" y2="44" stroke="#274972" stroke-width="3"></line>
      ${ticks.join("")}
    </svg>
  `;
}

function buildThermometerSvg({ temperature = 20 } = {}) {
  const width = 148;
  const height = 236;
  const labelRightX = 26;
  const leftMajorGuideStartX = 38;
  const leftMinorGuideStartX = 48;
  const tubeX = 72;
  const tubeY = 26;
  const tubeWidth = 14;
  const tubeHeight = 154;
  const scaleTopY = 32;
  const scaleBottomY = 174;
  const minTemp = -10;
  const maxTemp = 50;
  const bulbCx = tubeX + tubeWidth / 2;
  const bulbY = 198;
  const bulbRadius = 20;
  const clampedTemperature = Math.max(minTemp, Math.min(maxTemp, temperature));
  const yForTemperature = (value) => scaleBottomY - ((value - minTemp) / (maxTemp - minTemp)) * (scaleBottomY - scaleTopY);
  const fillTopY = yForTemperature(clampedTemperature);
  const zeroY = yForTemperature(0);
  const guideLines = [];
  const labels = [];

  for (let value = minTemp; value <= maxTemp; value += 10) {
    const y = yForTemperature(value);
    guideLines.push(`
      <line x1="${leftMajorGuideStartX}" y1="${y}" x2="${tubeX - 8}" y2="${y}" stroke="#274972" stroke-width="2.25" stroke-linecap="round"></line>
      <line x1="${tubeX + tubeWidth + 8}" y1="${y}" x2="${tubeX + tubeWidth + 18}" y2="${y}" stroke="#274972" stroke-width="2.25" stroke-linecap="round"></line>
    `);
    labels.push(`<text x="${labelRightX}" y="${y}" text-anchor="end" font-size="12" fill="#274972" dominant-baseline="middle">${value}</text>`);
  }

  for (let value = minTemp + 5; value < maxTemp; value += 10) {
    const y = yForTemperature(value);
    guideLines.push(`
      <line x1="${leftMinorGuideStartX}" y1="${y}" x2="${tubeX - 10}" y2="${y}" stroke="#274972" stroke-opacity="0.32" stroke-width="1.5" stroke-linecap="round"></line>
      <line x1="${tubeX + tubeWidth + 8}" y1="${y}" x2="${tubeX + tubeWidth + 14}" y2="${y}" stroke="#274972" stroke-opacity="0.32" stroke-width="1.5" stroke-linecap="round"></line>
    `);
  }

  return `
    <svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-hidden="true">
      ${guideLines.join("")}
      ${labels.join("")}
      <rect x="${tubeX}" y="${tubeY}" width="${tubeWidth}" height="${tubeHeight}" rx="7" fill="#e7eef7" stroke="#274972" stroke-width="2"></rect>
      <line x1="${tubeX - 10}" y1="${zeroY}" x2="${tubeX + tubeWidth + 24}" y2="${zeroY}" stroke="#274972" stroke-opacity="0.25" stroke-width="1"></line>
      <rect
        x="${tubeX + 3}"
        y="${fillTopY}"
        width="${tubeWidth - 6}"
        height="${Math.max(8, scaleBottomY - fillTopY + 10)}"
        rx="4"
        fill="#f25f5c"
      ></rect>
      <circle cx="${bulbCx}" cy="${bulbY}" r="${bulbRadius}" fill="#f25f5c" stroke="#274972" stroke-width="2"></circle>
    </svg>
  `;
}

function buildClockSvg({ hour = 3, minute = 0, size = 220, label = "" } = {}) {
  const width = size;
  const height = size;
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.4;
  const hourAngle = ((hour % 12) + minute / 60) * 30 - 90;
  const minuteAngle = minute * 6 - 90;
  const hourHand = clockHand(cx, cy, size * 0.2, hourAngle);
  const minuteHand = clockHand(cx, cy, size * 0.32, minuteAngle);
  const ticks = [];
  for (let index = 0; index < 12; index += 1) {
    const angle = index * 30 - 90;
    const outer = polarPoint(cx, cy, radius, angle);
    const inner = polarPoint(cx, cy, radius - 10, angle);
    ticks.push(`<line x1="${inner.x}" y1="${inner.y}" x2="${outer.x}" y2="${outer.y}" stroke="#274972" stroke-width="2"></line>`);
  }

  return `
    <svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-hidden="true">
      <circle cx="${cx}" cy="${cy}" r="${radius}" fill="#fff" stroke="#274972" stroke-width="3"></circle>
      ${ticks.join("")}
      ${hourHand}
      ${minuteHand}
      <circle cx="${cx}" cy="${cy}" r="6" fill="#f25f5c" stroke="#274972" stroke-width="2"></circle>
      ${label ? `<text x="${cx}" y="${height - 8}" text-anchor="middle" font-size="13" font-weight="700" fill="#274972">${visualMeasurementEscapeHtml(label)}</text>` : ""}
    </svg>
  `;
}

function buildClockPairSvg({ startHour, startMinute, endHour, endMinute } = {}) {
  return `
    <div style="display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; align-items: center;">
      ${buildClockSvg({ hour: startHour, minute: startMinute, size: 170, label: `Start ${visualMeasurementFormatClockTime(startHour, startMinute)}` })}
      <div style="font-size: 24px; font-weight: 800;">\u2192</div>
      ${buildClockSvg({ hour: endHour, minute: endMinute, size: 170, label: `End ${visualMeasurementFormatClockTime(endHour, endMinute)}` })}
    </div>
  `;
}

function buildReceiptHtml(items) {
  const rows = items
    .map(
      (item) =>
        `<tr><td style="padding: 6px 8px; border-bottom: 1px solid #c9d5e2;">${visualMeasurementEscapeHtml(
          item[0]
        )}</td><td style="padding: 6px 8px; border-bottom: 1px solid #c9d5e2; text-align: right;">${visualMeasurementEscapeHtml(
          item[1]
        )}</td></tr>`
    )
    .join("");

  return `
    <table style="border-collapse: collapse; min-width: 240px; font-size: 14px; background: #fff;">
      <tbody>${rows}</tbody>
    </table>
  `;
}

function buildSymmetrySvg({ type = "heart" } = {}) {
  if (type === "heart") {
    return `
      <svg viewBox="0 0 240 160" width="240" height="160" role="img" aria-hidden="true">
        <line x1="120" y1="10" x2="120" y2="150" stroke="#274972" stroke-dasharray="6 6" stroke-width="2"></line>
        <path d="M120 130 C70 80, 40 55, 60 35 C82 13, 108 35, 120 55 C132 35, 158 13, 180 35 C200 55, 170 80, 120 130 Z" fill="#f25f5c" stroke="#274972" stroke-width="3"></path>
      </svg>
    `;
  }

  return `
    <svg viewBox="0 0 240 160" width="240" height="160" role="img" aria-hidden="true">
      <line x1="120" y1="10" x2="120" y2="150" stroke="#274972" stroke-dasharray="6 6" stroke-width="2"></line>
      <path d="M46 86 H94 V70 L116 100 L94 130 V114 H46 Z" fill="#dff0ff" stroke="#274972" stroke-width="3"></path>
      <path d="M194 86 H146 V70 L124 100 L146 130 V114 H194 Z" fill="#fff0ce" stroke="#274972" stroke-width="3"></path>
    </svg>
  `;
}

function buildRotationCard() {
  return `
    <svg viewBox="0 0 240 150" width="240" height="150" role="img" aria-hidden="true">
      <path d="M35 45 H105 V85 H35 Z" fill="#dff0ff" stroke="#274972" stroke-width="3"></path>
      <path d="M135 45 H205 V85 H135 Z" fill="#dff0ff" stroke="#274972" stroke-width="3" transform="rotate(180 170 65)"></path>
      <path d="M104 118 A48 48 0 0 1 136 118" fill="none" stroke="#f25f5c" stroke-width="4" marker-end="url(#rotationArrow)"></path>
      <defs>
        <marker id="rotationArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="#f25f5c"></path>
        </marker>
      </defs>
      <text x="70" y="70" text-anchor="middle" font-size="12" fill="#274972">A</text>
      <text x="170" y="70" text-anchor="middle" font-size="12" fill="#274972">A</text>
    </svg>
  `;
}

function buildTurnSvg({ start = "up", turn = "right" } = {}) {
  const angles = { up: -90, right: 0, down: 90, left: 180 };
  const startAngle = angles[start] ?? -90;
  const turnAngle = angles[turn] ?? 0;
  return `
    <svg viewBox="0 0 260 130" width="260" height="130" role="img" aria-hidden="true">
      <defs>
        <marker id="arrowHead" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 Z" fill="#274972"></path>
        </marker>
      </defs>
      ${buildArrowLine(70, 65, startAngle, "Start")}
      <text x="130" y="70" text-anchor="middle" font-size="24" font-weight="800" fill="#274972">\u2192</text>
      ${buildArrowLine(190, 65, turnAngle, "After")}
    </svg>
  `;
}

function buildArrowLine(cx, cy, angle, label) {
  const end = polarPoint(cx, cy, 38, angle);
  return `
    <line x1="${cx}" y1="${cy}" x2="${end.x}" y2="${end.y}" stroke="#274972" stroke-width="6" stroke-linecap="round" marker-end="url(#arrowHead)"></line>
    <text x="${cx}" y="118" text-anchor="middle" font-size="13" font-weight="700" fill="#274972">${visualMeasurementEscapeHtml(label)}</text>
  `;
}

function buildMeasuringCupSvg({ amount = 500, maxAmount = 1000, step = 250 } = {}) {
  const width = 180;
  const height = 220;
  const cupX = 52;
  const cupY = 20;
  const cupW = 82;
  const cupH = 160;
  const clampedAmount = Math.max(0, Math.min(maxAmount, amount));
  const fillH = (clampedAmount / maxAmount) * cupH;
  const fillY = cupY + cupH - fillH;
  const marks = [];
  for (let value = 0; value <= maxAmount; value += step) {
    const y = cupY + cupH - (value / maxAmount) * cupH;
    marks.push(`
      <line x1="${cupX + cupW}" y1="${y}" x2="${cupX + cupW + 14}" y2="${y}" stroke="#274972" stroke-width="2"></line>
      <text x="${cupX + cupW + 18}" y="${y + 4}" font-size="11" fill="#274972">${visualMeasurementFormatNumber(value)}</text>
    `);
  }
  return `
    <svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-hidden="true">
      <path d="M${cupX} ${cupY} H${cupX + cupW} L${cupX + cupW - 12} ${cupY + cupH} H${cupX + 12} Z" fill="#ffffff" stroke="#274972" stroke-width="3"></path>
      <path d="M${cupX + 10} ${fillY} H${cupX + cupW - 10} L${cupX + cupW - 12} ${cupY + cupH} H${cupX + 12} Z" fill="#66a9ff" opacity="0.72"></path>
      ${marks.join("")}
      <text x="${cupX + cupW / 2}" y="${height - 12}" text-anchor="middle" font-size="13" font-weight="700" fill="#274972">mL</text>
    </svg>
  `;
}

function buildCupComparisonSvg({ leftAmount = 750, rightAmount = 600, leftUnit = "mL", rightUnit = "mL" } = {}) {
  const leftMl = leftUnit === "L" ? leftAmount * 1000 : leftAmount;
  const rightMl = rightUnit === "L" ? rightAmount * 1000 : rightAmount;
  const maxAmount = Math.max(1000, leftMl, rightMl);
  return `
    <div style="display: flex; gap: 18px; flex-wrap: wrap; justify-content: center; align-items: flex-end;">
      <div style="text-align: center; font-weight: 700;">
        <div>Cup A: ${visualMeasurementFormatNumber(leftAmount)} ${visualMeasurementEscapeHtml(leftUnit)}</div>
        ${buildMeasuringCupSvg({ amount: leftMl, maxAmount, step: maxAmount >= 2000 ? 500 : 250 })}
      </div>
      <div style="text-align: center; font-weight: 700;">
        <div>Cup B: ${visualMeasurementFormatNumber(rightAmount)} ${visualMeasurementEscapeHtml(rightUnit)}</div>
        ${buildMeasuringCupSvg({ amount: rightMl, maxAmount, step: maxAmount >= 2000 ? 500 : 250 })}
      </div>
    </div>
  `;
}

function buildScaleSvg({ value = 500, max = 1000, unit = "g", size = 220 } = {}) {
  const width = size;
  const height = size * 0.72;
  const cx = width / 2;
  const cy = height * 0.82;
  const radius = size * 0.48;
  const startAngle = 210;
  const endAngle = 330;
  const clamped = Math.max(0, Math.min(max, value));
  const needleAngle = startAngle + (clamped / max) * (endAngle - startAngle);
  const needleEnd = polarPoint(cx, cy, radius * 0.72, needleAngle);
  const ticks = [];
  const divisions = 5;
  for (let index = 0; index <= divisions; index += 1) {
    const tickValue = (max / divisions) * index;
    const angle = startAngle + (index / divisions) * (endAngle - startAngle);
    const outer = polarPoint(cx, cy, radius * 0.9, angle);
    const inner = polarPoint(cx, cy, radius * 0.78, angle);
    const label = polarPoint(cx, cy, radius * 0.62, angle);
    ticks.push(`
      <line x1="${inner.x}" y1="${inner.y}" x2="${outer.x}" y2="${outer.y}" stroke="#274972" stroke-width="2"></line>
      <text x="${label.x}" y="${label.y + 4}" text-anchor="middle" font-size="10" fill="#274972">${visualMeasurementFormatNumber(tickValue)}</text>
    `);
  }
  return `
    <svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-hidden="true">
      <path d="M${cx - radius * 0.92} ${cy} A${radius * 0.92} ${radius * 0.92} 0 0 1 ${cx + radius * 0.92} ${cy}" fill="#fff" stroke="#274972" stroke-width="3"></path>
      ${ticks.join("")}
      <line x1="${cx}" y1="${cy}" x2="${needleEnd.x}" y2="${needleEnd.y}" stroke="#f25f5c" stroke-width="5" stroke-linecap="round"></line>
      <circle cx="${cx}" cy="${cy}" r="7" fill="#f25f5c" stroke="#274972" stroke-width="2"></circle>
      <text x="${cx}" y="${height - 8}" text-anchor="middle" font-size="13" font-weight="700" fill="#274972">${visualMeasurementEscapeHtml(unit)}</text>
    </svg>
  `;
}

function buildScaleComparisonSvg({ leftValue = 3, rightValue = 2, max = 5, unit = "kg" } = {}) {
  return `
    <div style="display: flex; gap: 18px; flex-wrap: wrap; justify-content: center; align-items: center;">
      <div style="text-align: center; font-weight: 700;">
        <div>Box A</div>
        ${buildScaleSvg({ value: leftValue, max, unit, size: 190 })}
      </div>
      <div style="text-align: center; font-weight: 700;">
        <div>Box B</div>
        ${buildScaleSvg({ value: rightValue, max, unit, size: 190 })}
      </div>
    </div>
  `;
}

function buildGridRectangleSvg({ widthCells = 4, heightCells = 3, shadeSquares = false } = {}) {
  const cell = 26;
  const pad = 28;
  const width = pad * 2 + widthCells * cell;
  const height = pad * 2 + heightCells * cell;
  const gridLines = [];
  for (let x = 0; x <= widthCells; x += 1) {
    const xPos = pad + x * cell;
    gridLines.push(`<line x1="${xPos}" y1="${pad}" x2="${xPos}" y2="${pad + heightCells * cell}" stroke="#d7e2ee" stroke-width="1"></line>`);
  }
  for (let y = 0; y <= heightCells; y += 1) {
    const yPos = pad + y * cell;
    gridLines.push(`<line x1="${pad}" y1="${yPos}" x2="${pad + widthCells * cell}" y2="${yPos}" stroke="#d7e2ee" stroke-width="1"></line>`);
  }
  return `
    <svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-hidden="true">
      <rect x="${pad}" y="${pad}" width="${widthCells * cell}" height="${heightCells * cell}" fill="${shadeSquares ? "#dff0ff" : "#ffffff"}" stroke="#274972" stroke-width="3"></rect>
      ${gridLines.join("")}
      <text x="${pad + (widthCells * cell) / 2}" y="${pad - 8}" text-anchor="middle" font-size="13" font-weight="700" fill="#274972">${widthCells} cm</text>
      <text x="${pad - 10}" y="${pad + (heightCells * cell) / 2}" text-anchor="middle" font-size="13" font-weight="700" fill="#274972" transform="rotate(-90 ${pad - 10} ${pad + (heightCells * cell) / 2})">${heightCells} cm</text>
    </svg>
  `;
}

function buildAreaComparisonSvg({ leftW = 6, leftH = 4, rightW = 5, rightH = 5 } = {}) {
  return `
    <div style="display: flex; gap: 18px; flex-wrap: wrap; justify-content: center; align-items: center;">
      <div style="text-align: center; font-weight: 700;">
        <div>Rectangle A</div>
        ${buildGridRectangleSvg({ widthCells: leftW, heightCells: leftH, shadeSquares: true })}
      </div>
      <div style="text-align: center; font-weight: 700;">
        <div>Rectangle B</div>
        ${buildGridRectangleSvg({ widthCells: rightW, heightCells: rightH, shadeSquares: true })}
      </div>
    </div>
  `;
}

function buildAngleSvg({ angle = 90 } = {}) {
  const width = 220;
  const height = 170;
  const cx = 58;
  const cy = 126;
  const baseEnd = polarPoint(cx, cy, 128, 0);
  const rayEnd = polarPoint(cx, cy, 110, -angle);
  const arcEnd = polarPoint(cx, cy, 38, -angle);
  const largeArc = angle > 180 ? 1 : 0;
  return `
    <svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-hidden="true">
      <line x1="${cx}" y1="${cy}" x2="${baseEnd.x}" y2="${baseEnd.y}" stroke="#274972" stroke-width="4" stroke-linecap="round"></line>
      <line x1="${cx}" y1="${cy}" x2="${rayEnd.x}" y2="${rayEnd.y}" stroke="#274972" stroke-width="4" stroke-linecap="round"></line>
      <path d="M ${cx + 38} ${cy} A 38 38 0 ${largeArc} 0 ${arcEnd.x} ${arcEnd.y}" fill="none" stroke="#f25f5c" stroke-width="4"></path>
      ${angle === 90 ? `<path d="M${cx + 28} ${cy} V${cy - 28} H${cx}" fill="none" stroke="#f25f5c" stroke-width="3"></path>` : ""}
    </svg>
  `;
}

function buildAnglePairSvg({ knownAngle = 65 } = {}) {
  const missingAngle = 180 - knownAngle;
  const width = 280;
  const height = 150;
  const cx = 140;
  const cy = 100;
  const left = polarPoint(cx, cy, 110, 180);
  const right = polarPoint(cx, cy, 110, 0);
  const ray = polarPoint(cx, cy, 95, -knownAngle);
  return `
    <svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-hidden="true">
      <line x1="${left.x}" y1="${left.y}" x2="${right.x}" y2="${right.y}" stroke="#274972" stroke-width="4" stroke-linecap="round"></line>
      <line x1="${cx}" y1="${cy}" x2="${ray.x}" y2="${ray.y}" stroke="#274972" stroke-width="4" stroke-linecap="round"></line>
      <path d="M ${cx + 42} ${cy} A 42 42 0 0 0 ${polarPoint(cx, cy, 42, -knownAngle).x} ${polarPoint(cx, cy, 42, -knownAngle).y}" fill="none" stroke="#f25f5c" stroke-width="4"></path>
      <text x="${cx + 52}" y="${cy - 20}" font-size="14" font-weight="700" fill="#274972">${knownAngle}\u00b0</text>
      <text x="${cx - 68}" y="${cy - 20}" font-size="14" font-weight="700" fill="#274972">?</text>
      <text x="${cx}" y="${height - 10}" text-anchor="middle" font-size="12" fill="#274972">${knownAngle}\u00b0 + ? = 180\u00b0</text>
    </svg>
  `;
}

function buildMapScaleSvg({ routeCm = 5, kmPerCm = 4 } = {}) {
  const scale = 26;
  const routePx = routeCm * scale;
  const width = Math.max(240, routePx + 70);
  return `
    <svg viewBox="0 0 ${width} 110" width="${width}" height="110" role="img" aria-hidden="true">
      <path d="M35 38 C${35 + routePx * 0.25} 18, ${35 + routePx * 0.65} 62, ${35 + routePx} 38" fill="none" stroke="#f25f5c" stroke-width="6" stroke-linecap="round"></path>
      <circle cx="35" cy="38" r="6" fill="#66a9ff" stroke="#274972" stroke-width="2"></circle>
      <circle cx="${35 + routePx}" cy="38" r="6" fill="#f2b134" stroke="#274972" stroke-width="2"></circle>
      <line x1="35" y1="78" x2="${35 + routePx}" y2="78" stroke="#274972" stroke-width="3"></line>
      <line x1="35" y1="70" x2="35" y2="86" stroke="#274972" stroke-width="2"></line>
      <line x1="${35 + routePx}" y1="70" x2="${35 + routePx}" y2="86" stroke="#274972" stroke-width="2"></line>
      <text x="${35 + routePx / 2}" y="100" text-anchor="middle" font-size="13" font-weight="700" fill="#274972">${visualMeasurementFormatNumber(routeCm)} cm on map</text>
      <text x="${width / 2}" y="18" text-anchor="middle" font-size="13" fill="#274972">Scale: 1 cm = ${kmPerCm} km</text>
    </svg>
  `;
}

function buildDoubleMapScaleSvg({ firstCm = 3.5, secondCm = 4, kmPerCm = 10 } = {}) {
  return `
    <div style="display: grid; gap: 8px; justify-items: center;">
      ${buildMapScaleSvg({ routeCm: firstCm, kmPerCm })}
      ${buildMapScaleSvg({ routeCm: secondCm, kmPerCm })}
    </div>
  `;
}

function buildConversionCardHtml(fact, prompt) {
  return `
    <div style="display: grid; gap: 10px; min-width: 260px; padding: 12px; border: 2px dashed #9bb3cc; border-radius: 12px; background: #ffffff; font-weight: 800; text-align: center;">
      <div>${visualMeasurementEscapeHtml(fact)}</div>
      <div style="font-size: 18px; color: #17324d;">${visualMeasurementEscapeHtml(prompt)}</div>
    </div>
  `;
}

function visualMeasurementFormatClockTime(hour, minute) {
  const normalizedHour = ((hour - 1 + 12) % 12) + 1;
  const normalizedMinute = minute.toString().padStart(2, "0");
  return `${normalizedHour}:${normalizedMinute}`;
}

function visualMeasurementAddMinutes(hour, minute, addMinutes) {
  const total = ((hour % 12) * 60 + minute + addMinutes) % (12 * 60);
  const normalizedHour = Math.floor(total / 60) || 12;
  return {
    hour: normalizedHour,
    minute: total % 60,
  };
}

function visualMeasurementFormatDuration(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) {
    return `${minutes} minutes`;
  }
  if (minutes === 0) {
    return hours === 1 ? "1 hour" : `${hours} hours`;
  }
  return `${hours === 1 ? "1 hour" : `${hours} hours`} ${minutes} minutes`;
}

function clockHand(cx, cy, length, angleDegrees) {
  const point = polarPoint(cx, cy, length, angleDegrees);
  const strokeWidth = length > 60 ? 4 : 6;
  return `<line x1="${cx}" y1="${cy}" x2="${point.x}" y2="${point.y}" stroke="#274972" stroke-width="${strokeWidth}" stroke-linecap="round"></line>`;
}

function polarPoint(cx, cy, radius, angleDegrees) {
  const radians = (angleDegrees * Math.PI) / 180;
  return {
    x: Number((cx + radius * Math.cos(radians)).toFixed(2)),
    y: Number((cy + radius * Math.sin(radians)).toFixed(2)),
  };
}

function visualMeasurementBuildMeasurementOptions(answerValue, unit, candidates) {
  const answer = `${visualMeasurementFormatNumber(answerValue)} ${unit}`;
  return visualMeasurementBuildOptions(
    answer,
    candidates.map((candidate) => `${visualMeasurementFormatNumber(candidate)} ${unit}`)
  );
}

function visualMeasurementBuildOptions(answer, candidates) {
  const normalizedAnswer = String(answer);
  const options = Array.from(new Set([normalizedAnswer, ...candidates.map(String).filter(Boolean)]));
  const fallbackOptions = [
    "Cannot tell",
    "They are equal",
    "Not enough information",
    "0",
    "1",
    "10",
  ];
  fallbackOptions.forEach((fallback) => {
    if (options.length < 4 && fallback !== normalizedAnswer && !options.includes(fallback)) {
      options.push(fallback);
    }
  });
  if (options.length < 4 || !options.includes(normalizedAnswer)) {
    throw new Error("Visual measurement option sets must contain exactly 4 unique values including the answer.");
  }

  return visualMeasurementShuffleArray(options.slice(0, 4));
}

function clampVisualMeasurementDifficulty(value) {
  const level = Number.parseInt(value, 10);
  if (!Number.isFinite(level)) {
    return 3;
  }

  return Math.min(10, Math.max(1, level));
}

function visualMeasurementFormatNumber(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return String(value);
  }
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(numeric);
}

function visualMeasurementEscapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function visualMeasurementRandomChoice(values) {
  return values[Math.floor(Math.random() * values.length)];
}

function visualMeasurementShuffleArray(values) {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}
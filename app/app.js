const OPTION_LABELS = ["A", "B", "C", "D"];
const SESSION_HISTORY_STORAGE_KEY = "homework-session-history-v1";
const MAX_SAVED_SESSIONS = 10;
const CORE_SESSION_CATEGORIES = ["math", "hebrew"];
const NON_CORE_SESSION_CATEGORIES = [
  "science",
  "time",
  "statistics",
  "algebra",
  "visual-math",
  "logic",
  "rationality",
  "general-knowledge",
  "geography",
  "population",
  "financial-literacy",
  "measurement",
  "charts-and-graphs",
  "calendar",
  "estimation",
  "probability",
  "maps-and-directions",
  "digital-safety",
  "health-and-first-aid",
  "nutrition",
  "household-problem-solving",
  "fractions",
  "fractions-and-ratios",
  "spatial-reasoning",
];
const SESSION_CATEGORY_ORDER = [...CORE_SESSION_CATEGORIES, ...NON_CORE_SESSION_CATEGORIES];
const CORE_CATEGORY_SHARE = 0.45;
const NON_HEBREW_DIFFICULTY_WEIGHTS = {
  1: { 1: 1 },
  2: { 2: 0.75, 1: 0.25 },
  3: { 3: 0.7, 2: 0.2, 1: 0.1 },
  4: { 4: 0.6, 3: 0.25, 2: 0.1, 1: 0.05 },
  5: { 5: 0.7, 4: 0.2, 3: 0.05, 2: 0.05 },
};
const CHART_BAR_TEMPLATES = [
  {
    title: "Favorite Fruits",
    labels: ["Apples", "Bananas", "Grapes", "Oranges"],
    prompts: {
      most: () => "Which fruit got the most votes?",
      secondMost: () => "Which fruit got the second most votes?",
      fewest: () => "Which fruit got the fewest votes?",
      exact: (label) => `How many votes did ${label.toLowerCase()} get?`,
      total: () => "How many votes were there altogether?",
      difference: (larger, smaller) =>
        `How many more votes did ${larger.toLowerCase()} get than ${smaller.toLowerCase()}?`,
    },
    summaryItem: (item) => `${item.label} got ${formatUnitCount(item.value, "vote")}`,
  },
  {
    title: "Pet Votes",
    labels: ["Dogs", "Cats", "Fish", "Birds"],
    prompts: {
      most: () => "Which pet got the most votes?",
      secondMost: () => "Which pet got the second most votes?",
      fewest: () => "Which pet got the fewest votes?",
      exact: (label) => `How many votes did ${label.toLowerCase()} get?`,
      total: () => "How many votes were there altogether?",
      difference: (larger, smaller) =>
        `How many more votes did ${larger.toLowerCase()} get than ${smaller.toLowerCase()}?`,
    },
    summaryItem: (item) => `${item.label} got ${formatUnitCount(item.value, "vote")}`,
  },
  {
    title: "Toy Boxes",
    labels: ["Blocks", "Cars", "Balls", "Dolls"],
    prompts: {
      most: () => "Which toy type has the most pieces?",
      secondMost: () => "Which toy type has the second most pieces?",
      fewest: () => "Which toy type has the fewest pieces?",
      exact: (label) => `How many ${label.toLowerCase()} are there?`,
      total: () => "How many toy pieces are there altogether?",
      difference: (larger, smaller) =>
        `How many more ${larger.toLowerCase()} are there than ${smaller.toLowerCase()}?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "piece")}`,
  },
  {
    title: "Snack Sales",
    labels: ["Crackers", "Yogurt", "Cheese", "Apples"],
    prompts: {
      most: () => "Which snack sold the most?",
      secondMost: () => "Which snack sold the second most?",
      fewest: () => "Which snack sold the fewest?",
      exact: (label) => `How many ${label.toLowerCase()} were sold?`,
      total: () => "How many snacks were sold altogether?",
      difference: (larger, smaller) =>
        `How many more ${larger.toLowerCase()} were sold than ${smaller.toLowerCase()}?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "snack")} sold`,
  },
  {
    title: "Books Read",
    labels: ["Noga", "Gideon", "Gabriel", "Eden"],
    prompts: {
      most: () => "Who read the most books?",
      secondMost: () => "Who read the second most books?",
      fewest: () => "Who read the fewest books?",
      exact: (label) => `How many books did ${label} read?`,
      total: () => "How many books were read altogether?",
      difference: (larger, smaller) => `How many more books did ${larger} read than ${smaller}?`,
    },
    summaryItem: (item) => `${item.label} read ${formatUnitCount(item.value, "book")}`,
  },
  {
    title: "Sticker Colors",
    labels: ["Red", "Blue", "Green", "Yellow"],
    prompts: {
      most: () => "Which color has the most stickers?",
      secondMost: () => "Which color has the second most stickers?",
      fewest: () => "Which color has the fewest stickers?",
      exact: (label) => `How many ${label.toLowerCase()} stickers are there?`,
      total: () => "How many stickers are there altogether?",
      difference: (larger, smaller) =>
        `How many more ${larger.toLowerCase()} stickers are there than ${smaller.toLowerCase()}?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "sticker")}`,
  },
];
const CHART_TABLE_TEMPLATES = [
  {
    title: "Library Visits",
    leftLabel: "Day",
    rightLabel: "Visitors",
    labels: ["Mon", "Tue", "Wed", "Thu"],
    prompts: {
      most: () => "Which day had the most visitors?",
      secondMost: () => "Which day had the second most visitors?",
      fewest: () => "Which day had the fewest visitors?",
      exact: (label) => `How many visitors were there on ${label}?`,
      total: () => "How many visitors were there altogether?",
      combined: (left, right) => `How many visitors were there on ${left} and ${right} altogether?`,
      difference: (larger, smaller) =>
        `How many more visitors were there on ${larger} than ${smaller}?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "visitor")}`,
  },
  {
    title: "Water Cups",
    leftLabel: "Day",
    rightLabel: "Cups",
    labels: ["Sun", "Mon", "Tue", "Wed"],
    prompts: {
      most: () => "Which day had the most cups of water?",
      secondMost: () => "Which day had the second most cups of water?",
      fewest: () => "Which day had the fewest cups of water?",
      exact: (label) => `How many cups of water were drunk on ${label}?`,
      total: () => "How many cups of water were drunk altogether?",
      combined: (left, right) =>
        `How many cups of water were drunk on ${left} and ${right} altogether?`,
      difference: (larger, smaller) =>
        `How many more cups of water were drunk on ${larger} than ${smaller}?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "cup")} of water`,
  },
  {
    title: "Tree Heights",
    leftLabel: "Tree",
    rightLabel: "Meters",
    labels: ["Oak", "Pine", "Palm", "Maple"],
    prompts: {
      most: () => "Which tree is tallest?",
      secondMost: () => "Which tree is the second tallest?",
      fewest: () => "Which tree is shortest?",
      exact: (label) => `How tall is ${label} in meters?`,
      total: () => "What is the total height of all the trees in meters?",
      combined: (left, right) => `What is the total height of ${left} and ${right} in meters?`,
      difference: (larger, smaller) => `How many meters taller is ${larger} than ${smaller}?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "meter")}`,
  },
  {
    title: "Team Points",
    leftLabel: "Team",
    rightLabel: "Points",
    labels: ["Red", "Blue", "Green", "Yellow"],
    prompts: {
      most: () => "Which team scored the most points?",
      secondMost: () => "Which team scored the second most points?",
      fewest: () => "Which team scored the fewest points?",
      exact: (label) => `How many points did the ${label} team score?`,
      total: () => "How many points were scored altogether?",
      combined: (left, right) =>
        `How many points did the ${left} and ${right} teams score altogether?`,
      difference: (larger, smaller) =>
        `How many more points did the ${larger} team score than the ${smaller} team?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "point")}`,
  },
  {
    title: "Class Jobs",
    leftLabel: "Job",
    rightLabel: "Students",
    labels: ["Clean", "Read", "Draw", "Build"],
    prompts: {
      most: () => "Which job had the most students?",
      secondMost: () => "Which job had the second most students?",
      fewest: () => "Which job had the fewest students?",
      exact: (label) => `How many students had the ${label.toLowerCase()} job?`,
      total: () => "How many students are shown altogether?",
      combined: (left, right) =>
        `How many students had the ${left.toLowerCase()} and ${right.toLowerCase()} jobs altogether?`,
      difference: (larger, smaller) =>
        `How many more students had the ${larger.toLowerCase()} job than the ${smaller.toLowerCase()} job?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "student")}`,
  },
  {
    title: "Plant Heights",
    leftLabel: "Plant",
    rightLabel: "Cm",
    labels: ["A", "B", "C", "D"],
    prompts: {
      most: () => "Which plant is tallest?",
      secondMost: () => "Which plant is the second tallest?",
      fewest: () => "Which plant is shortest?",
      exact: (label) => `How tall is plant ${label} in centimeters?`,
      total: () => "What is the total height of all the plants in centimeters?",
      combined: (left, right) =>
        `What is the total height of plants ${left} and ${right} in centimeters?`,
      difference: (larger, smaller) =>
        `How many centimeters taller is plant ${larger} than plant ${smaller}?`,
    },
    summaryItem: (item) => `${item.label}: ${formatUnitCount(item.value, "centimeter")}`,
  },
];

const HEBREW_NIKKUD_OVERRIDES = {
  "-ב": "-בְּ",
  "-כ": "-כְּ",
  "-מ": "-מִ",
  "-ו": "-וְ",
  "אבא": "אַבָּא",
  "אדום": "אָדוֹם",
  "אוכל": "אוֹכֶל",
  "אחות": "אָחוֹת",
  "אח": "אָח",
  "איך": "אֵיךְ",
  "אישה": "אִשָּׁה",
  "איש": "אִישׁ",
  "אמא": "אִמָּא",
  "אני": "אֲנִי",
  "את": "אַתְ",
  "אתה": "אַתָּה",
  "אתם": "אַתֶּם",
  "אתן": "אַתֶּן",
  "איפה": "אֵיפֹה",
  "בית": "בַּיִת",
  "ביצה": "בֵּיצָה",
  "בוקר": "בֹּקֶר",
  "ביחד": "בְּיַחַד",
  "בפנים": "בִּפְנִים",
  "בבקשה": "בְּבַקָּשָׁה",
  "בן": "בֵּן",
  "בת": "בַּת",
  "דג": "דָּג",
  "דרך": "דֶּרֶךְ",
  "דלת": "דֶּלֶת",
  "דף": "דַּף",
  "הבא": "הַבָּא",
  "הוא": "הוּא",
  "היא": "הִיא",
  "היום": "הַיּוֹם",
  "הרים": "הָרִים",
  "וילון": "וִילוֹן",
  "זמן": "זְמַן",
  "חבר": "חָבֵר",
  "חתול": "חָתוּל",
  "חולה": "חוֹלֶה",
  "ילד": "יֶלֶד",
  "ילדה": "יַלְדָּה",
  "ים": "יָם",
  "ירח": "יָרֵחַ",
  "יש": "יֵשׁ",
  "ישראל": "יִשְׂרָאֵל",
  "כדור": "כַּדּוּר",
  "כלב": "כֶּלֶב",
  "כלום": "כְּלוּם",
  "כסא": "כִּסֵּא",
  "כסף": "כֶּסֶף",
  "כן": "כֵּן",
  "לחם": "לֶחֶם",
  "לילה": "לַיְלָה",
  "למה": "לָמָּה",
  "מה": "מָה",
  "מהר": "מַהֵר",
  "מים": "מַיִם",
  "מי": "מִי",
  "מלך": "מֶלֶךְ",
  "מלכה": "מַלְכָּה",
  "מיטה": "מִטָּה",
  "מכונית": "מְכוֹנִית",
  "מפתח": "מַפְתֵּחַ",
  "מראה": "מַרְאָה",
  "מתי": "מָתַי",
  "ספר": "סֵפֶר",
  "סלון": "סָלוֹן",
  "סליחה": "סְלִיחָה",
  "עוגה": "עוּגָה",
  "עוף": "עוֹף",
  "עיר": "עִיר",
  "עין": "עַיִן",
  "עכבר": "עַכְבָּר",
  "עץ": "עֵץ",
  "פה": "פֹּה",
  "פנים": "פָּנִים",
  "פרח": "פֶּרַח",
  "ציפור": "צִפּוֹר",
  "קפה": "קָפֶה",
  "קצת": "קְצָת",
  "רגל": "רֶגֶל",
  "שולחן": "שֻׁלְחָן",
  "שלום": "שָׁלוֹם",
  "שבוע": "שָׁבוּעַ",
  "שמש": "שֶׁמֶשׁ",
  "שם": "שָׁם",
  "תודה": "תּוֹדָה",
};

const SCIENCE_EXCLUDED_PATTERNS = [
  /north celestial pole/i,
  /Sputnik/i,
  /Rhinoplasty/i,
  /LASER/i,
  /thermodynamics/i,
  /belly button/i,
  /Apollo mission/i,
  /Curium/i,
  /Gregory Mendel/i,
  /synthesis of DNA/i,
  /bacterial pathogen/i,
];

const state = {
  totalQuestions: 0,
  difficulty: 3,
  currentIndex: 0,
  answeredCount: 0,
  correctCount: 0,
  answerResults: [],
  questions: [],
  sessionRecords: [],
  sessionStartedAt: null,
  feedbackMessage: "",
  feedbackTone: "",
};

const confettiRuntime = {
  cleanupTimerId: null,
  frameId: null,
  layer: null,
  lastFrameTime: 0,
  moveHandler: null,
  pieces: [],
  pointer: null,
  startTime: 0,
};

const elements = {
  startScreen: document.getElementById("start-screen"),
  quizScreen: document.getElementById("quiz-screen"),
  resultsScreen: document.getElementById("results-screen"),
  historyScreen: document.getElementById("history-screen"),
  startForm: document.getElementById("start-form"),
  startFeedback: document.getElementById("start-feedback"),
  historyButton: document.getElementById("history-button"),
  historyBackButton: document.getElementById("history-back-button"),
  historyList: document.getElementById("history-list"),
  historyEmpty: document.getElementById("history-empty"),
  questionCount: document.getElementById("question-count"),
  difficultyLevel: document.getElementById("difficulty-level"),
  difficultyButtons: Array.from(document.querySelectorAll(".difficulty-button")),
  progressTracker: document.getElementById("progress-tracker"),
  scoreText: document.getElementById("score-text"),
  feedback: document.getElementById("feedback"),
  questionNumber: document.getElementById("question-number"),
  questionPrompt: document.getElementById("question-prompt"),
  questionMain: document.getElementById("question-main"),
  questionVisual: document.getElementById("question-visual"),
  questionExtra: document.getElementById("question-extra"),
  answerForm: document.getElementById("answer-form"),
  inputArea: document.getElementById("input-area"),
  answerInput: document.getElementById("answer-input"),
  choicesArea: document.getElementById("choices-area"),
  resultsTitle: document.getElementById("results-title"),
  resultsSummary: document.getElementById("results-summary"),
  restartButton: document.getElementById("restart-button"),
};

const hebrewQuestionBank = buildHebrewQuestionBank(
  typeof HEBREW_WORDS !== "undefined" ? HEBREW_WORDS : []
);
const hebrewMeanings = hebrewQuestionBank.map((entry) => entry.english);
const scienceQuestionBank = buildScienceQuestionBank(
  typeof SCIENCE_QUESTIONS !== "undefined" ? SCIENCE_QUESTIONS : []
);
const staticChoiceBankSources = [
  {
    category: "general-knowledge",
    entries: typeof GENERAL_KNOWLEDGE_QUESTIONS !== "undefined" ? GENERAL_KNOWLEDGE_QUESTIONS : [],
  },
  {
    category: "algebra",
    entries: typeof ALGEBRA_QUESTIONS !== "undefined" ? ALGEBRA_QUESTIONS : [],
  },
  {
    category: "visual-math",
    entries: typeof VISUAL_MATH_QUESTIONS !== "undefined" ? VISUAL_MATH_QUESTIONS : [],
  },
  { category: "logic", entries: typeof LOGIC_QUESTIONS !== "undefined" ? LOGIC_QUESTIONS : [] },
  {
    category: "rationality",
    entries: typeof RATIONALITY_QUESTIONS !== "undefined" ? RATIONALITY_QUESTIONS : [],
  },
  {
    category: "geography",
    entries: typeof GEOGRAPHY_QUESTIONS !== "undefined" ? GEOGRAPHY_QUESTIONS : [],
  },
  {
    category: "population",
    entries: typeof POPULATION_QUESTIONS !== "undefined" ? POPULATION_QUESTIONS : [],
  },
  {
    category: "financial-literacy",
    entries:
      typeof FINANCIAL_LITERACY_QUESTIONS !== "undefined" ? FINANCIAL_LITERACY_QUESTIONS : [],
  },
  {
    category: "measurement",
    entries: typeof MEASUREMENT_QUESTIONS !== "undefined" ? MEASUREMENT_QUESTIONS : [],
  },
  {
    category: "charts-and-graphs",
    entries:
      typeof CHARTS_AND_GRAPHS_QUESTIONS !== "undefined" ? CHARTS_AND_GRAPHS_QUESTIONS : [],
  },
  { category: "calendar", entries: typeof CALENDAR_QUESTIONS !== "undefined" ? CALENDAR_QUESTIONS : [] },
  {
    category: "estimation",
    entries: typeof ESTIMATION_QUESTIONS !== "undefined" ? ESTIMATION_QUESTIONS : [],
  },
  {
    category: "probability",
    entries: typeof PROBABILITY_QUESTIONS !== "undefined" ? PROBABILITY_QUESTIONS : [],
  },
  {
    category: "maps-and-directions",
    entries:
      typeof MAPS_AND_DIRECTIONS_QUESTIONS !== "undefined" ? MAPS_AND_DIRECTIONS_QUESTIONS : [],
  },
  {
    category: "digital-safety",
    entries: typeof DIGITAL_SAFETY_QUESTIONS !== "undefined" ? DIGITAL_SAFETY_QUESTIONS : [],
  },
  {
    category: "health-and-first-aid",
    entries:
      typeof HEALTH_AND_FIRST_AID_QUESTIONS !== "undefined"
        ? HEALTH_AND_FIRST_AID_QUESTIONS
        : [],
  },
  {
    category: "nutrition",
    entries: typeof NUTRITION_QUESTIONS !== "undefined" ? NUTRITION_QUESTIONS : [],
  },
  {
    category: "household-problem-solving",
    entries:
      typeof HOUSEHOLD_PROBLEM_SOLVING_QUESTIONS !== "undefined"
        ? HOUSEHOLD_PROBLEM_SOLVING_QUESTIONS
        : [],
  },
  {
    category: "fractions",
    entries: typeof FRACTIONS_QUESTIONS !== "undefined" ? FRACTIONS_QUESTIONS : [],
  },
  {
    category: "fractions-and-ratios",
    entries:
      typeof FRACTIONS_AND_RATIOS_QUESTIONS !== "undefined" ? FRACTIONS_AND_RATIOS_QUESTIONS : [],
  },
  {
    category: "spatial-reasoning",
    entries: typeof SPATIAL_REASONING_QUESTIONS !== "undefined" ? SPATIAL_REASONING_QUESTIONS : [],
  },
];
const staticChoiceBanks = Object.fromEntries(
  staticChoiceBankSources.map(({ category, entries }) => [
    category,
    buildStaticChoiceBank(entries, category),
  ])
);
const choiceCategoryConfigs = {
  hebrew: {
    bank: hebrewQuestionBank,
    createQuestion: createHebrewChoiceQuestion,
  },
  science: {
    bank: scienceQuestionBank,
    createQuestion: (entry) => createBankChoiceQuestion(entry, "science-choice"),
  },
  ...Object.fromEntries(
    staticChoiceBankSources.map(({ category }) => [
      category,
      {
        bank: staticChoiceBanks[category],
        createQuestion: (entry) => createBankChoiceQuestion(entry, `${category}-choice`),
      },
    ])
  ),
};
const generatedChoiceCategoryConfigs = {
  algebra: {
    share: 0.85,
    factory: typeof createAlgebraGeneratedEntry === "function" ? createAlgebraGeneratedEntry : null,
  },
  "visual-math": {
    share: 0.85,
    factory:
      typeof createVisualMathGeneratedEntry === "function" ? createVisualMathGeneratedEntry : null,
  },
  "financial-literacy": {
    share: 0.85,
    factory:
      typeof createFinancialLiteracyGeneratedEntry === "function"
        ? createFinancialLiteracyGeneratedEntry
        : null,
  },
  geography: {
    share: 0.85,
    factory: typeof createGeographyGeneratedEntry === "function" ? createGeographyGeneratedEntry : null,
  },
  population: {
    share: 0.8,
    factory: typeof createPopulationGeneratedEntry === "function" ? createPopulationGeneratedEntry : null,
  },
  measurement: {
    share: 0.85,
    factory:
      typeof createMeasurementGeneratedEntry === "function" ? createMeasurementGeneratedEntry : null,
  },
  estimation: {
    share: 0.85,
    factory:
      typeof createEstimationGeneratedEntry === "function" ? createEstimationGeneratedEntry : null,
  },
  probability: {
    share: 0.85,
    factory:
      typeof createProbabilityGeneratedEntry === "function" ? createProbabilityGeneratedEntry : null,
  },
  logic: {
    share: 0.6,
    factory: typeof createLogicGeneratedEntry === "function" ? createLogicGeneratedEntry : null,
  },
  rationality: {
    share: 0.7,
    factory:
      typeof createRationalityGeneratedEntry === "function" ? createRationalityGeneratedEntry : null,
  },
  "general-knowledge": {
    share: 0.6,
    factory:
      typeof createGeneralKnowledgeGeneratedEntry === "function"
        ? createGeneralKnowledgeGeneratedEntry
        : null,
  },
  science: {
    share: 0.45,
    factory: typeof createScienceGeneratedEntry === "function" ? createScienceGeneratedEntry : null,
  },
  calendar: {
    share: 0.9,
    factory: typeof createCalendarGeneratedEntry === "function" ? createCalendarGeneratedEntry : null,
  },
  "fractions-and-ratios": {
    share: 0.85,
    factory:
      typeof createFractionsAndRatiosGeneratedEntry === "function"
        ? createFractionsAndRatiosGeneratedEntry
        : null,
  },
  "maps-and-directions": {
    share: 0.85,
    factory:
      typeof createMapsAndDirectionsGeneratedEntry === "function"
        ? createMapsAndDirectionsGeneratedEntry
        : null,
  },
  "digital-safety": {
    share: 0.6,
    factory:
      typeof createDigitalSafetyGeneratedEntry === "function"
        ? createDigitalSafetyGeneratedEntry
        : null,
  },
  "health-and-first-aid": {
    share: 0.4,
    factory:
      typeof createHealthAndFirstAidGeneratedEntry === "function"
        ? createHealthAndFirstAidGeneratedEntry
        : null,
  },
  nutrition: {
    share: 0.55,
    factory: typeof createNutritionGeneratedEntry === "function" ? createNutritionGeneratedEntry : null,
  },
  "household-problem-solving": {
    share: 0.6,
    factory:
      typeof createHouseholdProblemSolvingGeneratedEntry === "function"
        ? createHouseholdProblemSolvingGeneratedEntry
        : null,
  },
  fractions: {
    share: 0.8,
    factory: typeof createFractionsGeneratedEntry === "function" ? createFractionsGeneratedEntry : null,
  },
  "spatial-reasoning": {
    share: 0.85,
    factory:
      typeof createSpatialReasoningGeneratedEntry === "function"
        ? createSpatialReasoningGeneratedEntry
        : null,
  },
};

const mathInputGenerators = [
  createAdditionInputQuestion,
  createSubtractionInputQuestion,
  createMultiplicationInputQuestion,
  createDivisionInputQuestion,
  createMissingNumberInputQuestion,
  createDecimalOperationInputQuestion,
  createPlaceValueInputQuestion,
  createRectangleMeasureInputQuestion,
  createMoneyInputQuestion,
  createPercentageInputQuestion,
];

const mathChoiceGenerators = [
  createAdditionChoiceQuestion,
  createSubtractionChoiceQuestion,
  createMultiplicationChoiceQuestion,
  createDivisionChoiceQuestion,
  createMissingNumberChoiceQuestion,
  createSkipCountingChoiceQuestion,
  createNumberPatternChoiceQuestion,
  createComparisonChoiceQuestion,
  createDecimalComparisonChoiceQuestion,
  createDecimalOperationChoiceQuestion,
  createPlaceValueChoiceQuestion,
  createRoundingChoiceQuestion,
  createRectangleMeasureChoiceQuestion,
  createPrimeCompositeChoiceQuestion,
  createMoneyChoiceQuestion,
  createPercentageChoiceQuestion,
];

const statisticsGenerators = [
  createStatisticsMeanQuestion,
  createStatisticsMedianQuestion,
  createStatisticsModeQuestion,
  createStatisticsRangeQuestion,
  createStatisticsDataQuestion,
];

const PLACE_VALUE_NAMES = [
  "ones",
  "tens",
  "hundreds",
  "thousands",
  "ten-thousands",
  "hundred-thousands",
];

const PRIME_NUMBER_POOL = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47,
  53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
];

elements.startForm.addEventListener("submit", startSession);
elements.answerForm.addEventListener("submit", submitTypedAnswer);
elements.restartButton.addEventListener("click", showStartScreen);
elements.historyButton.addEventListener("click", showHistoryScreen);
elements.historyBackButton.addEventListener("click", showStartScreen);

initializeDifficultyButtons();

function buildHebrewQuestionBank(entries) {
  const groupedEntries = new Map();

  for (const entry of entries) {
    const key = String(entry.hebrew || "").trim();
    const difficulty = getEntryDifficulty(entry.difficulty);
    if (!key || difficulty === null) {
      continue;
    }

    if (!groupedEntries.has(key)) {
      groupedEntries.set(key, {
        hebrew: key,
        englishSet: new Set(),
        transliteration: entry.transliteration,
        difficulty,
      });
    }

    groupedEntries.get(key).englishSet.add(String(entry.english || "").trim());
  }

  const baseEntries = Array.from(groupedEntries.values()).map((entry) => ({
    hebrew: entry.hebrew,
    hebrewDisplay: buildHebrewDisplay(entry.hebrew, entry.transliteration),
    english: Array.from(entry.englishSet).join(" / "),
    transliteration: entry.transliteration || "",
    difficulty: entry.difficulty,
  }));

  return baseEntries;
}

function buildHebrewDisplay(hebrew, transliteration) {
  const rawHebrew = String(hebrew || "").trim();
  if (!rawHebrew) {
    return "";
  }

  if (HEBREW_NIKKUD_OVERRIDES[rawHebrew]) {
    return HEBREW_NIKKUD_OVERRIDES[rawHebrew];
  }

  const transliterationWords = String(transliteration || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const hebrewWords = rawHebrew.split(/\s+/).filter(Boolean);

  if (hebrewWords.length && hebrewWords.length === transliterationWords.length) {
    return hebrewWords
      .map((word, index) => buildHebrewWordWithNikkud(word, transliterationWords[index]))
      .join(" ");
  }

  return buildHebrewWordWithNikkud(rawHebrew, transliteration);
}

function buildHebrewWordWithNikkud(word, transliteration) {
  const rawWord = String(word || "").trim();
  if (!rawWord) {
    return "";
  }

  if (HEBREW_NIKKUD_OVERRIDES[rawWord]) {
    return HEBREW_NIKKUD_OVERRIDES[rawWord];
  }

  const letters = Array.from(rawWord);
  const tokens = tokenizeHebrewTransliterationWord(transliteration);
  if (!tokens.length) {
    return rawWord;
  }

  const pointedLetters = [];
  let tokenIndex = 0;

  for (let index = 0; index < letters.length; index += 1) {
    const letter = letters[index];
    if (!isHebrewLetter(letter)) {
      pointedLetters.push(letter);
      continue;
    }

    const nextLetter = letters[index + 1] || "";
    const currentToken = tokens[tokenIndex];
    let renderedLetter = letter;

    if (currentToken?.type === "c" && matchesHebrewConsonant(letter, currentToken.value)) {
      tokenIndex += 1;
    }

    const vowelToken = tokens[tokenIndex];
    const vowelInfo =
      vowelToken?.type === "v" ? describeHebrewVowel(vowelToken.value, nextLetter) : null;

    if (vowelInfo) {
      renderedLetter += vowelInfo.mark || "";
      pointedLetters.push(renderedLetter);

      if (vowelInfo.consumeNext === "yod" && nextLetter === "י") {
        pointedLetters.push("י");
        index += 1;
      } else if (vowelInfo.consumeNext === "vav" && nextLetter === "ו") {
        pointedLetters.push(vowelInfo.nextLetterText || "ו");
        index += 1;
      }

      tokenIndex += 1;
      continue;
    }

    if (tokens[tokenIndex]?.type === "c" && nextLetter && shouldAddHebrewSheva(letter, nextLetter)) {
      renderedLetter += "ְ";
    }

    pointedLetters.push(renderedLetter);
  }

  return pointedLetters.join("");
}

function tokenizeHebrewTransliterationWord(value) {
  const normalized = String(value || "")
    .split(",")[0]
    .toLowerCase()
    .replaceAll("’", "'")
    .replaceAll("‘", "'")
    .replaceAll("sch", "sh")
    .replaceAll("tsh", "ch")
    .replaceAll("-", " ")
    .replaceAll("'", "")
    .replace(/[^a-z\s]/g, " ")
    .trim();

  if (!normalized) {
    return [];
  }

  const tokens = [];
  const chunks = normalized.split(/\s+/).filter(Boolean);

  chunks.forEach((chunk) => {
    let index = 0;
    while (index < chunk.length) {
      if (isLatinVowel(chunk[index])) {
        let vowelEnd = index + 1;
        while (vowelEnd < chunk.length && isLatinVowel(chunk[vowelEnd])) {
          vowelEnd += 1;
        }
        tokens.push({ type: "v", value: chunk.slice(index, vowelEnd) });
        index = vowelEnd;
        continue;
      }

      let consonantEnd = index + 1;
      while (consonantEnd < chunk.length && !isLatinVowel(chunk[consonantEnd])) {
        consonantEnd += 1;
      }

      splitHebrewConsonantRun(chunk.slice(index, consonantEnd)).forEach((cluster) => {
        tokens.push({ type: "c", value: cluster });
      });
      index = consonantEnd;
    }
  });

  return tokens;
}

function splitHebrewConsonantRun(value) {
  const clusters = [];
  let index = 0;
  while (index < value.length) {
    const remaining = value.slice(index);
    if (remaining.startsWith("sh")) {
      clusters.push("sh");
      index += 2;
      continue;
    }
    if (remaining.startsWith("kh")) {
      clusters.push("kh");
      index += 2;
      continue;
    }
    if (remaining.startsWith("ch")) {
      clusters.push("ch");
      index += 2;
      continue;
    }
    if (remaining.startsWith("ts")) {
      clusters.push("ts");
      index += 2;
      continue;
    }
    if (remaining.startsWith("tz")) {
      clusters.push("tz");
      index += 2;
      continue;
    }

    clusters.push(remaining[0]);
    index += 1;
  }

  return clusters;
}

function isLatinVowel(character) {
  return ["a", "e", "i", "o", "u"].includes(character);
}

function isHebrewLetter(value) {
  return /^[\u05d0-\u05ea]$/.test(value);
}

function matchesHebrewConsonant(letter, cluster) {
  const normalizedLetter = normalizeHebrewLetterForMatch(letter);
  switch (normalizedLetter) {
    case "א":
    case "ע":
      return false;
    case "ב":
      return cluster === "b" || cluster === "v";
    case "ג":
      return cluster === "g" || cluster === "j";
    case "ד":
      return cluster === "d";
    case "ה":
      return cluster === "h";
    case "ו":
      return cluster === "v" || cluster === "w";
    case "ז":
      return cluster === "z";
    case "ח":
      return cluster === "ch" || cluster === "kh" || cluster === "h";
    case "ט":
      return cluster === "t";
    case "י":
      return cluster === "y";
    case "כ":
      return cluster === "k" || cluster === "kh" || cluster === "ch";
    case "ל":
      return cluster === "l";
    case "מ":
      return cluster === "m";
    case "נ":
      return cluster === "n";
    case "ס":
      return cluster === "s";
    case "פ":
      return cluster === "p" || cluster === "f";
    case "צ":
      return cluster === "ts" || cluster === "tz" || cluster === "z";
    case "ק":
      return cluster === "k" || cluster === "q" || cluster === "c";
    case "ר":
      return cluster === "r";
    case "ש":
      return cluster === "sh" || cluster === "s";
    case "ת":
      return cluster === "t";
    default:
      return false;
  }
}

function normalizeHebrewLetterForMatch(letter) {
  switch (letter) {
    case "ך":
      return "כ";
    case "ם":
      return "מ";
    case "ן":
      return "נ";
    case "ף":
      return "פ";
    case "ץ":
      return "צ";
    default:
      return letter;
  }
}

function describeHebrewVowel(value, nextLetter) {
  const normalized = String(value || "").toLowerCase();
  if (!normalized) {
    return null;
  }

  if ((normalized.startsWith("ei") || normalized.startsWith("ey")) && nextLetter === "י") {
    return { mark: "ֵ", consumeNext: "yod" };
  }

  if ((normalized.startsWith("ai") || normalized.startsWith("ay")) && nextLetter === "י") {
    return { mark: "ַ", consumeNext: "yod" };
  }

  if ((normalized.startsWith("oi") || normalized.startsWith("oy")) && nextLetter === "י") {
    return { mark: "ֹ", consumeNext: "yod" };
  }

  if (normalized.startsWith("o") && nextLetter === "ו") {
    return { mark: "", consumeNext: "vav", nextLetterText: "וֹ" };
  }

  if (normalized.startsWith("u") && nextLetter === "ו") {
    return { mark: "", consumeNext: "vav", nextLetterText: "וּ" };
  }

  if (normalized.startsWith("i") && nextLetter === "י") {
    return { mark: "ִ", consumeNext: "yod" };
  }

  if (normalized.startsWith("a")) {
    return { mark: "ַ" };
  }

  if (normalized.startsWith("e")) {
    return { mark: "ֶ" };
  }

  if (normalized.startsWith("i")) {
    return { mark: "ִ" };
  }

  if (normalized.startsWith("o")) {
    return { mark: "ֹ" };
  }

  if (normalized.startsWith("u")) {
    return { mark: "ֻ" };
  }

  return null;
}

function shouldAddHebrewSheva(letter, nextLetter) {
  return isHebrewLetter(letter) && isHebrewLetter(nextLetter);
}

function buildScienceQuestionBank(entries) {
  return entries
    .filter((entry) => Array.isArray(entry.incorrectAnswers) && entry.incorrectAnswers.length === 3)
    .filter((entry) => !SCIENCE_EXCLUDED_PATTERNS.some((pattern) => pattern.test(entry.question)))
    .map((entry) => {
      const difficulty = getEntryDifficulty(entry.difficulty);
      if (difficulty === null) {
        return null;
      }

      return {
        question: entry.question,
        options: shuffleArray([entry.correctAnswer, ...entry.incorrectAnswers]),
        answer: entry.correctAnswer,
        difficulty,
        type: "science-choice",
      };
    })
    .filter(Boolean);
}

function buildStaticChoiceBank(entries, type) {
  return entries
    .map((entry) => normalizeChoiceBankEntry(entry, type))
    .filter(Boolean);
}

function normalizeChoiceBankEntry(entry, type) {
  const difficulty = getEntryDifficulty(entry?.difficulty);
  const options = Array.from(new Set((entry?.options || []).map(String)));
  const answer = String(entry?.answer || "");
  if (difficulty === null || !answer || options.length !== 4 || !options.includes(answer)) {
    return null;
  }

  return {
    question: String(entry?.question || ""),
    options,
    answer,
    difficulty,
    type,
    visualHtml: typeof entry?.visualHtml === "string" ? entry.visualHtml : "",
    visualSummary: typeof entry?.visualSummary === "string" ? entry.visualSummary : "",
    displayText: typeof entry?.displayText === "string" ? entry.displayText : "",
    extraText: typeof entry?.extraText === "string" ? entry.extraText : "",
    extraHtml: typeof entry?.extraHtml === "string" ? entry.extraHtml : "",
  };
}

function getEntryDifficulty(value) {
  const difficulty = Number(value);
  if (!Number.isInteger(difficulty) || difficulty < 1 || difficulty > 5) {
    return null;
  }

  return difficulty;
}

function initializeDifficultyButtons() {
  elements.difficultyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const difficulty = button.dataset.difficulty;
      if (!difficulty) {
        return;
      }

      elements.difficultyLevel.value = difficulty;
      updateDifficultyButtons();
    });
  });

  updateDifficultyButtons();
}

function updateDifficultyButtons() {
  const selectedDifficulty = String(elements.difficultyLevel.value || "3");

  elements.difficultyButtons.forEach((button) => {
    const isActive = button.dataset.difficulty === selectedDifficulty;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function startSession(event) {
  event.preventDefault();

  const totalQuestions = Number.parseInt(elements.questionCount.value, 10);
  const difficulty = Number.parseInt(elements.difficultyLevel.value, 10);

  if (!Number.isFinite(totalQuestions) || totalQuestions < 1) {
    showStartMessage("Please choose at least 1 question.", "error");
    return;
  }

  if (!Number.isFinite(difficulty) || difficulty < 1 || difficulty > 5) {
    showStartMessage("Please choose a difficulty from 1 to 5.", "error");
    return;
  }

  if (Object.values(choiceCategoryConfigs).some(({ bank }) => !bank.length)) {
    showStartMessage("One of the offline question files is missing.", "error");
    return;
  }

  clearStartMessage();
  stopConfetti();
  state.totalQuestions = totalQuestions;
  state.difficulty = difficulty;
  state.currentIndex = 0;
  state.answeredCount = 0;
  state.correctCount = 0;
  state.answerResults = [];
  state.sessionRecords = [];
  state.sessionStartedAt = new Date();
  state.feedbackMessage = "";
  state.feedbackTone = "";
  state.questions = buildSessionQuestions(totalQuestions, difficulty);

  switchScreen(elements.quizScreen);
  renderCurrentQuestion();
}

function buildSessionQuestions(totalQuestions, difficulty) {
  const categoryCounts = allocateCategoryCounts(totalQuestions);
  const categorySequence = buildCategorySequence(totalQuestions, categoryCounts);
  const resources = Object.fromEntries(
    Object.entries(choiceCategoryConfigs).map(([category, config]) => [
      category,
      createPool(config.bank),
    ])
  );
  const nonHebrewDifficultyQueue = buildDifficultyQueue(
    totalQuestions - (categoryCounts.hebrew || 0),
    NON_HEBREW_DIFFICULTY_WEIGHTS[difficulty] || { [difficulty]: 1 }
  );
  const hebrewDifficultyQueue = buildHebrewDifficultyQueue(
    categoryCounts.hebrew || 0,
    difficulty,
    hebrewQuestionBank
  );

  let mathModeIndex = 0;

  return categorySequence.map((category) => {
    if (category === "math") {
      const effectiveDifficulty = drawNextDifficulty(nonHebrewDifficultyQueue, difficulty);
      const question =
        mathModeIndex % 2 === 0
          ? createMathInputQuestion(effectiveDifficulty)
          : createMathChoiceQuestion(effectiveDifficulty);
      mathModeIndex += 1;
      return question;
    }

    if (category === "hebrew") {
      const effectiveDifficulty = drawNextDifficulty(hebrewDifficultyQueue, difficulty);
      return createHebrewChoiceQuestion(drawHebrewEntry(resources.hebrew, effectiveDifficulty));
    }

    if (category === "science") {
      const effectiveDifficulty = drawNextDifficulty(nonHebrewDifficultyQueue, difficulty);
      return createBankChoiceQuestion(
        drawFromPool(resources.science, effectiveDifficulty),
        "science-choice"
      );
    }

    if (category === "time") {
      return createTimeChoiceQuestion(drawNextDifficulty(nonHebrewDifficultyQueue, difficulty));
    }

    if (category === "statistics") {
      return createStatisticsChoiceQuestion(drawNextDifficulty(nonHebrewDifficultyQueue, difficulty));
    }

    if (category === "charts-and-graphs") {
      return createChartsAndGraphsQuestion(drawNextDifficulty(nonHebrewDifficultyQueue, difficulty));
    }

    const categoryConfig = choiceCategoryConfigs[category];
    if (categoryConfig) {
      const effectiveDifficulty = drawNextDifficulty(nonHebrewDifficultyQueue, difficulty);
      const generatedQuestion = createGeneratedCategoryQuestion(category, effectiveDifficulty);
      if (generatedQuestion) {
        return generatedQuestion;
      }

      return categoryConfig.createQuestion(drawFromPool(resources[category], effectiveDifficulty));
    }

    throw new Error(`Unknown session category: ${category}`);
  });
}

function allocateCategoryCounts(totalQuestions) {
  const coreTotal = Math.min(totalQuestions, Math.max(1, Math.round(totalQuestions * CORE_CATEGORY_SHARE)));
  const otherTotal = totalQuestions - coreTotal;

  return {
    ...allocateEvenCounts(CORE_SESSION_CATEGORIES, coreTotal),
    ...allocateEvenCounts(NON_CORE_SESSION_CATEGORIES, otherTotal),
  };
}

function allocateEvenCounts(categories, total) {
  const counts = Object.fromEntries(categories.map((category) => [category, 0]));
  const base = Math.floor(total / categories.length);
  const remainder = total % categories.length;

  categories.forEach((category) => {
    counts[category] = base;
  });

  shuffleArray([...categories])
    .slice(0, remainder)
    .forEach((category) => {
      counts[category] += 1;
    });

  return counts;
}

function buildCategorySequence(totalQuestions, categoryCounts) {
  const sequence = [];
  const usedCounts = Object.fromEntries(
    SESSION_CATEGORY_ORDER.map((category) => [category, 0])
  );

  for (let slot = 0; slot < totalQuestions; slot += 1) {
    let bestCategory = null;
    let bestScore = Number.NEGATIVE_INFINITY;

    for (const category of SESSION_CATEGORY_ORDER) {
      if (usedCounts[category] >= categoryCounts[category]) {
        continue;
      }

      const score = (((slot + 1) * categoryCounts[category]) / totalQuestions) - usedCounts[category];
      if (score > bestScore) {
        bestScore = score;
        bestCategory = category;
        continue;
      }

      if (score === bestScore && bestCategory !== null) {
        const currentRemaining = categoryCounts[category] - usedCounts[category];
        const bestRemaining = categoryCounts[bestCategory] - usedCounts[bestCategory];
        if (currentRemaining > bestRemaining) {
          bestCategory = category;
        }
      }
    }

    sequence.push(bestCategory);
    usedCounts[bestCategory] += 1;
  }

  return sequence;
}

function createPool(entries) {
  const entriesByDifficulty = groupEntriesByDifficulty(entries);
  return {
    entries,
    entriesByDifficulty,
    queuesByDifficulty: new Map(),
  };
}

function groupEntriesByDifficulty(entries) {
  const grouped = new Map();

  entries.forEach((entry) => {
    if (!grouped.has(entry.difficulty)) {
      grouped.set(entry.difficulty, []);
    }

    grouped.get(entry.difficulty).push(entry);
  });

  return grouped;
}

function drawFromPool(pool, difficulty) {
  const source = getEntriesForDifficulty(pool, difficulty);
  let queue = pool.queuesByDifficulty.get(difficulty);

  if (!queue || !queue.length) {
    queue = shuffleArray([...source]);
    pool.queuesByDifficulty.set(difficulty, queue);
  }

  return queue.pop();
}

function drawHebrewEntry(pool, difficulty) {
  const source = pool.entriesByDifficulty.get(difficulty) || [];
  let queue = pool.queuesByDifficulty.get(`hebrew-${difficulty}`);

  if (!queue || !queue.length) {
    queue = shuffleArray([...(source.length ? source : pool.entries)]);
    pool.queuesByDifficulty.set(`hebrew-${difficulty}`, queue);
  }

  return queue.pop();
}

function getEntriesForDifficulty(pool, difficulty) {
  const exact = pool.entriesByDifficulty.get(difficulty) || [];
  return exact.length ? exact : pool.entries;
}

function buildDifficultyQueue(totalCount, weightMap) {
  if (totalCount <= 0) {
    return [];
  }

  const counts = allocateWeightedCounts(totalCount, weightMap);
  return shuffleArray(
    Object.entries(counts).flatMap(([difficulty, count]) => Array(count).fill(Number(difficulty)))
  );
}

function buildHebrewDifficultyQueue(totalCount, sessionDifficulty, entries) {
  if (totalCount <= 0) {
    return [];
  }

  const availableLevels = [];
  for (let difficulty = 1; difficulty <= sessionDifficulty; difficulty += 1) {
    if (entries.some((entry) => entry.difficulty === difficulty)) {
      availableLevels.push(difficulty);
    }
  }

  if (!availableLevels.length) {
    return [sessionDifficulty];
  }

  const counts = allocateEvenCounts(availableLevels, totalCount);
  return shuffleArray(
    availableLevels.flatMap((difficulty) => Array(counts[difficulty]).fill(difficulty))
  );
}

function drawNextDifficulty(queue, fallbackDifficulty) {
  return queue.length ? queue.pop() : fallbackDifficulty;
}

function allocateWeightedCounts(totalCount, weightMap) {
  const counts = {};
  const entries = Object.entries(weightMap).map(([difficulty, weight]) => ({
    difficulty: Number(difficulty),
    exactCount: totalCount * (Number(weight) || 0),
  }));

  let assignedTotal = 0;

  entries.forEach((entry) => {
    const baseCount = Math.floor(entry.exactCount);
    counts[entry.difficulty] = baseCount;
    assignedTotal += baseCount;
  });

  let remainder = totalCount - assignedTotal;
  const ranked = shuffleArray([...entries]).sort(
    (left, right) => (right.exactCount % 1) - (left.exactCount % 1)
  );

  for (let index = 0; index < ranked.length && remainder > 0; index += 1) {
    counts[ranked[index].difficulty] += 1;
    remainder -= 1;
  }

  return counts;
}

function createMathInputQuestion(difficulty) {
  return randomChoice(mathInputGenerators)(difficulty);
}

function createMathChoiceQuestion(difficulty) {
  return randomChoice(mathChoiceGenerators)(difficulty);
}

function createAdditionInputQuestion(difficulty) {
  const [left, right, answer] = generateAdditionValues(difficulty);
  return createNumericInputQuestion({
    type: "math-input",
    difficulty,
    questionText: "",
    displayText: `${formatSignedNumber(left)} + ${formatSignedNumber(right)} =`,
    answer,
  });
}

function createAdditionChoiceQuestion(difficulty) {
  const [left, right, answer] = generateAdditionValues(difficulty);
  return createNumericChoiceQuestion({
    type: "math-choice",
    difficulty,
    questionText: "",
    displayText: `${formatSignedNumber(left)} + ${formatSignedNumber(right)} =`,
    answer,
  });
}

function createSubtractionInputQuestion(difficulty) {
  const [left, right, answer] = generateSubtractionValues(difficulty);
  return createNumericInputQuestion({
    type: "math-input",
    difficulty,
    questionText: "",
    displayText: `${formatSignedNumber(left)} - ${formatSignedNumber(right)} =`,
    answer,
  });
}

function createSubtractionChoiceQuestion(difficulty) {
  const [left, right, answer] = generateSubtractionValues(difficulty);
  return createNumericChoiceQuestion({
    type: "math-choice",
    difficulty,
    questionText: "",
    displayText: `${formatSignedNumber(left)} - ${formatSignedNumber(right)} =`,
    answer,
  });
}

function createMultiplicationInputQuestion(difficulty) {
  const { left, right } = generateMultiplicationValues(difficulty);
  return createNumericInputQuestion({
    type: "math-input",
    difficulty,
    questionText: "",
    displayText: `${left} × ${right} =`,
    answer: left * right,
  });
}

function createMultiplicationChoiceQuestion(difficulty) {
  const { left, right } = generateMultiplicationValues(difficulty);
  return createNumericChoiceQuestion({
    type: "math-choice",
    difficulty,
    questionText: "",
    displayText: `${left} × ${right} =`,
    answer: left * right,
  });
}

function createDivisionInputQuestion(difficulty) {
  const { dividend, divisor, quotient } = generateDivisionProblem(difficulty);
  return createNumericInputQuestion({
    type: "math-input",
    difficulty,
    questionText: "",
    displayText: `${dividend} ÷ ${divisor} =`,
    answer: quotient,
  });
}

function createDivisionChoiceQuestion(difficulty) {
  const { dividend, divisor, quotient } = generateDivisionProblem(difficulty);
  return createNumericChoiceQuestion({
    type: "math-choice",
    difficulty,
    questionText: "",
    displayText: `${dividend} ÷ ${divisor} =`,
    answer: quotient,
  });
}

function createMissingNumberInputQuestion(difficulty) {
  const problem = generateMissingNumberProblem(difficulty);
  return createNumericInputQuestion({
    type: "math-input",
    difficulty,
    questionText: problem.questionText,
    displayText: problem.displayText,
    answer: problem.answer,
  });
}

function createMissingNumberChoiceQuestion(difficulty) {
  const problem = generateMissingNumberProblem(difficulty);
  return createNumericChoiceQuestion({
    type: "math-choice",
    difficulty,
    questionText: problem.questionText,
    displayText: problem.displayText,
    answer: problem.answer,
  });
}

function createDecimalOperationInputQuestion(difficulty) {
  const problem = generateDecimalOperationProblem(difficulty);
  return createNumericInputQuestion({
    type: "math-input",
    difficulty,
    questionText: "Solve the decimal problem.",
    displayText: `${problem.leftText} ${problem.operator} ${problem.rightText} =`,
    answer: problem.answer,
  });
}

function createDecimalOperationChoiceQuestion(difficulty) {
  const problem = generateDecimalOperationProblem(difficulty);
  return {
    type: "math-choice",
    difficulty,
    mode: "choice",
    questionText: "Solve the decimal problem.",
    displayText: `${problem.leftText} ${problem.operator} ${problem.rightText} =`,
    extraText: "",
    options: buildDecimalStringOptions(problem.answer, problem.digits),
    answerValue: formatDecimalNumber(problem.answer, problem.digits),
    answerLabel: formatDecimalNumber(problem.answer, problem.digits),
    isHebrew: false,
  };
}

function createPlaceValueInputQuestion(difficulty) {
  const problem = generatePlaceValueProblem(difficulty);
  return createNumericInputQuestion({
    type: "math-input",
    difficulty,
    questionText: `In ${problem.numberText}, what is the value of the digit ${problem.digit}?`,
    displayText: "",
    answer: problem.answer,
  });
}

function createPlaceValueChoiceQuestion(difficulty) {
  const problem = generatePlaceValueProblem(difficulty);
  return {
    type: "math-choice",
    difficulty,
    mode: "choice",
    questionText: `In ${problem.numberText}, what is the value of the digit ${problem.digit}?`,
    displayText: "",
    extraText: "",
    options: shuffleArray(problem.options.map(formatGroupedNumber)),
    answerValue: formatGroupedNumber(problem.answer),
    answerLabel: formatGroupedNumber(problem.answer),
    isHebrew: false,
  };
}

function createRoundingChoiceQuestion(difficulty) {
  const problem = generateRoundingProblem(difficulty);
  return {
    type: "math-choice",
    difficulty,
    mode: "choice",
    questionText: `Round ${formatGroupedNumber(problem.number)} to the nearest ${formatGroupedNumber(
      problem.placeValue
    )}.`,
    displayText: "",
    extraText: "",
    options: buildRoundingOptions(problem.answer, problem.placeValue).map(formatGroupedNumber),
    answerValue: formatGroupedNumber(problem.answer),
    answerLabel: formatGroupedNumber(problem.answer),
    isHebrew: false,
  };
}

function createDecimalComparisonChoiceQuestion(difficulty) {
  const problem = generateDecimalComparisonProblem(difficulty);
  return {
    type: "math-choice",
    difficulty,
    mode: "choice",
    questionText: `Which decimal is ${problem.askFor}?`,
    displayText: "",
    extraText: "",
    options: shuffleArray(problem.options),
    answerValue: problem.answer,
    answerLabel: problem.answer,
    isHebrew: false,
  };
}

function createRectangleMeasureInputQuestion(difficulty) {
  const problem = generateRectangleMeasureProblem(difficulty);
  return createNumericInputQuestion({
    type: "math-input",
    difficulty,
    questionText: problem.questionText,
    displayText: "",
    answer: problem.answer,
  });
}

function createRectangleMeasureChoiceQuestion(difficulty) {
  const problem = generateRectangleMeasureProblem(difficulty);
  return createNumericChoiceQuestion({
    type: "math-choice",
    difficulty,
    questionText: problem.questionText,
    displayText: "",
    answer: problem.answer,
  });
}

function createPrimeCompositeChoiceQuestion(difficulty) {
  const problem = generatePrimeCompositeProblem(difficulty);
  return {
    type: "math-choice",
    difficulty,
    mode: "choice",
    questionText: `Which number is ${problem.askFor}?`,
    displayText: "",
    extraText: "",
    options: shuffleArray(problem.options.map(String)),
    answerValue: String(problem.answer),
    answerLabel: String(problem.answer),
    isHebrew: false,
  };
}

function createSkipCountingChoiceQuestion(difficulty) {
  const config = {
    1: { steps: [2, 5, 10], maxStart: 30 },
    2: { steps: [2, 3, 4, 5, 10], maxStart: 50 },
    3: { steps: [2, 3, 4, 5, 6, 8, 10], maxStart: 80 },
    4: { steps: [3, 4, 5, 6, 7, 8, 9, 10, 12], maxStart: 120 },
    5: { steps: [4, 5, 6, 7, 8, 9, 10, 12, 15, 25], maxStart: 180 },
  }[difficulty];

  const step = randomChoice(config.steps);
  const start = randomInt(0, config.maxStart);
  const sequence = [start, start + step, start + step * 2, start + step * 3];
  const answer = start + step * 4;

  return createNumericChoiceQuestion({
    type: "math-choice",
    difficulty,
    questionText: `Skip count by ${step}. What comes next?`,
    displayText: `${sequence.join(", ")}, __`,
    answer,
  });
}

function createNumberPatternChoiceQuestion(difficulty) {
  const pattern = generateNumberPattern(difficulty);
  return createNumericChoiceQuestion({
    type: "math-choice",
    difficulty,
    questionText: "What number should come next in this pattern?",
    displayText: `${pattern.sequence.join(", ")}, __`,
    answer: pattern.answer,
  });
}

function createComparisonChoiceQuestion(difficulty) {
  const ranges = {
    1: { min: 0, max: 20, minGap: 2 },
    2: { min: 0, max: 100, minGap: 5 },
    3: { min: -20, max: 150, minGap: 8 },
    4: { min: -50, max: 300, minGap: 12 },
    5: { min: -100, max: 1000, minGap: 20 },
  }[difficulty];

  const askFor = randomChoice(["bigger", "smaller"]);
  const options = buildDistinctNumberList(4, ranges.min, ranges.max, ranges.minGap).map(String);
  const numbers = options.map(Number);
  const answer = askFor === "bigger" ? String(Math.max(...numbers)) : String(Math.min(...numbers));

  return {
    type: "math-choice",
    difficulty,
    mode: "choice",
    questionText: `Which number is ${askFor}?`,
    displayText: "",
    extraText: "",
    options: shuffleArray(options),
    answerValue: answer,
    answerLabel: answer,
    isHebrew: false,
  };
}

function createMoneyInputQuestion(difficulty) {
  const { amount, price, answer } = generateMoneyProblem(difficulty);
  return createNumericInputQuestion({
    type: "math-input",
    difficulty,
    questionText: `You have ${amount} shekels. You buy something for ${price} shekels. How much change should you get?`,
    displayText: "",
    answer,
  });
}

function createMoneyChoiceQuestion(difficulty) {
  const { amount, price, answer } = generateMoneyProblem(difficulty);
  const spread = difficulty <= 2 ? 10 : difficulty <= 4 ? 20 : 35;
  const options = buildNumberOptions(answer, Math.max(0, answer - spread), answer + spread).map(
    (value) => `${value} shekels`
  );

  return {
    type: "math-choice",
    difficulty,
    mode: "choice",
    questionText: `You have ${amount} shekels. You buy something for ${price} shekels. How much change should you get?`,
    displayText: "",
    extraText: "",
    options,
    answerValue: `${answer} shekels`,
    answerLabel: `${answer} shekels`,
    isHebrew: false,
  };
}

function createPercentageInputQuestion(difficulty) {
  const { percent, whole, answer } = generatePercentageProblem(difficulty);
  return createNumericInputQuestion({
    type: "math-input",
    difficulty,
    questionText: `What is ${percent}% of ${whole}?`,
    displayText: "",
    answer,
  });
}

function createPercentageChoiceQuestion(difficulty) {
  const { percent, whole, answer } = generatePercentageProblem(difficulty);
  return createNumericChoiceQuestion({
    type: "math-choice",
    difficulty,
    questionText: `What is ${percent}% of ${whole}?`,
    displayText: "",
    answer,
  });
}

function createStatisticsChoiceQuestion(difficulty) {
  return randomChoice(statisticsGenerators)(difficulty);
}

function createStatisticsMeanQuestion(difficulty) {
  const config = {
    1: { count: randomChoice([2, 3]), min: 1, max: 10, answerMin: 2, answerMax: 10 },
    2: { count: randomChoice([3, 4]), min: 1, max: 15, answerMin: 3, answerMax: 12 },
    3: { count: randomChoice([4, 5]), min: 2, max: 20, answerMin: 4, answerMax: 16 },
    4: { count: randomChoice([4, 5, 6]), min: 3, max: 25, answerMin: 5, answerMax: 18 },
    5: { count: randomChoice([5, 6]), min: 4, max: 30, answerMin: 6, answerMax: 22 },
  }[difficulty];

  const answer = randomInt(config.answerMin, config.answerMax);
  const values = buildWholeMeanDataset(answer, config.count, config.min, config.max);

  return createNumericChoiceQuestion({
    type: "statistics-choice",
    difficulty,
    questionText: `The numbers are ${values.join(", ")}. What is the mean?`,
    displayText: "",
    answer,
  });
}

function createStatisticsMedianQuestion(difficulty) {
  const config = {
    1: { count: 3, min: 1, max: 10, minGap: 1 },
    2: { count: 5, min: 1, max: 15, minGap: 1 },
    3: { count: 5, min: 2, max: 25, minGap: 2 },
    4: { count: 7, min: 3, max: 30, minGap: 2 },
    5: { count: 7, min: 5, max: 40, minGap: 3 },
  }[difficulty];

  const ordered = buildDistinctNumberList(config.count, config.min, config.max, config.minGap).sort(
    (left, right) => left - right
  );
  const answer = ordered[Math.floor(ordered.length / 2)];
  const shuffled = shuffleArray(ordered);

  return createNumericChoiceQuestion({
    type: "statistics-choice",
    difficulty,
    questionText: `The numbers are ${shuffled.join(", ")}. What is the median?`,
    displayText: "",
    answer,
  });
}

function createStatisticsModeQuestion(difficulty) {
  const config = {
    1: { min: 1, max: 10, listLength: 4 },
    2: { min: 1, max: 12, listLength: 5 },
    3: { min: 2, max: 15, listLength: 5 },
    4: { min: 3, max: 20, listLength: 6 },
    5: { min: 4, max: 24, listLength: 6 },
  }[difficulty];

  const answer = randomInt(config.min, config.max);
  const otherValues = buildDistinctNumberList(
    config.listLength - 2,
    config.min,
    config.max,
    1,
    new Set([answer])
  );
  const values = shuffleArray([answer, answer, ...otherValues]);

  return createNumericChoiceQuestion({
    type: "statistics-choice",
    difficulty,
    questionText: `The numbers are ${values.join(", ")}. What is the mode?`,
    displayText: "",
    answer,
  });
}

function createStatisticsRangeQuestion(difficulty) {
  const config = {
    1: { count: 4, min: 1, max: 12, answerMax: 8 },
    2: { count: 4, min: 1, max: 16, answerMax: 10 },
    3: { count: 5, min: 2, max: 25, answerMax: 14 },
    4: { count: 5, min: 4, max: 35, answerMax: 18 },
    5: { count: 6, min: 5, max: 45, answerMax: 24 },
  }[difficulty];

  const answer = randomInt(config.count - 1, config.answerMax);
  const low = randomInt(config.min, config.max - answer);
  const high = low + answer;
  const middle = buildDistinctNumberList(
    config.count - 2,
    low + 1,
    high - 1,
    1,
    new Set([low, high])
  );
  const values = shuffleArray([low, high, ...middle]);

  return createNumericChoiceQuestion({
    type: "statistics-choice",
    difficulty,
    questionText: `The numbers are ${values.join(", ")}. What is the range?`,
    displayText: "",
    answer,
  });
}

function createStatisticsDataQuestion(difficulty) {
  const categories = shuffleArray(["dogs", "cats", "fish", "birds"]).slice(0, 4);
  const maxCount = difficulty <= 2 ? 9 : difficulty <= 4 ? 14 : 20;
  const countValues = buildDistinctNumberList(4, 1, maxCount, 1);
  const counts = categories.map((category, index) => ({
    category,
    count: countValues[index],
  }));

  const askType = randomChoice(
    difficulty <= 2 ? ["most", "fewest", "total"] : ["most", "fewest", "total", "difference"]
  );

  if (askType === "most" || askType === "fewest") {
    const sorted = [...counts].sort((left, right) => left.count - right.count);
    const answer = askType === "most" ? sorted[sorted.length - 1].category : sorted[0].category;
    return {
      type: "statistics-choice",
      difficulty,
      mode: "choice",
      questionText: `A class counted pets: ${counts
        .map((entry) => `${capitalize(entry.category)} ${entry.count}`)
        .join(", ")}. Which pet was counted ${askType === "most" ? "the most" : "the fewest"}?`,
      displayText: "",
      extraText: "",
      options: shuffleArray(categories.map(capitalize)),
      answerValue: capitalize(answer),
      answerLabel: capitalize(answer),
      isHebrew: false,
    };
  }

  if (askType === "total") {
    const answer = counts.reduce((sum, entry) => sum + entry.count, 0);
    return createNumericChoiceQuestion({
      type: "statistics-choice",
      difficulty,
      questionText: `A class counted pets: ${counts
        .map((entry) => `${capitalize(entry.category)} ${entry.count}`)
        .join(", ")}. How many pets were counted in total?`,
      displayText: "",
      answer,
    });
  }

  const sorted = [...counts].sort((left, right) => right.count - left.count);
  const answer = sorted[0].count - sorted[1].count;
  return createNumericChoiceQuestion({
    type: "statistics-choice",
    difficulty,
    questionText: `A class counted pets: ${counts
      .map((entry) => `${capitalize(entry.category)} ${entry.count}`)
      .join(", ")}. How many more ${sorted[0].category} than ${sorted[1].category} were counted?`,
    displayText: "",
    answer,
  });
}

function createChartsAndGraphsQuestion(difficulty) {
  const generators =
    difficulty === 1
      ? [
          createBarMostQuestion,
          createBarFewestQuestion,
          createBarExactQuestion,
          createTableFewestQuestion,
          createTableMostQuestion,
          createTableExactQuestion,
          createBarTotalQuestion,
          createTableTotalQuestion,
        ]
      : difficulty <= 3
        ? [
            createBarMostQuestion,
            createBarFewestQuestion,
            createBarSecondMostQuestion,
            createBarExactQuestion,
            createBarTotalQuestion,
            createBarDifferenceQuestion,
            createTableFewestQuestion,
            createTableMostQuestion,
            createTableSecondMostQuestion,
            createTableExactQuestion,
            createTableTotalQuestion,
            createTableDifferenceQuestion,
          ]
        : [
            createBarMostQuestion,
            createBarFewestQuestion,
            createBarSecondMostQuestion,
            createBarExactQuestion,
            createBarTotalQuestion,
            createBarDifferenceQuestion,
            createTableFewestQuestion,
            createTableMostQuestion,
            createTableSecondMostQuestion,
            createTableExactQuestion,
            createTableTotalQuestion,
            createTableCombinedQuestion,
            createTableDifferenceQuestion,
          ];

  return randomChoice(generators)(difficulty);
}

function createBarMostQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "bar");
  const answerItem = dataset.sortedByValue[dataset.sortedByValue.length - 1];

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "most"),
    visualHtml: renderBarChartVisual(dataset),
    visualSummary: dataset.summary,
    options: shuffleArray(dataset.items.map((item) => item.label)),
    answerValue: answerItem.label,
    answerLabel: answerItem.label,
  });
}

function createBarSecondMostQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "bar");
  const answerItem = dataset.sortedByValue[dataset.sortedByValue.length - 2];

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "secondMost"),
    visualHtml: renderBarChartVisual(dataset),
    visualSummary: dataset.summary,
    options: shuffleArray(dataset.items.map((item) => item.label)),
    answerValue: answerItem.label,
    answerLabel: answerItem.label,
  });
}

function createBarFewestQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "bar");
  const answerItem = dataset.sortedByValue[0];

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "fewest"),
    visualHtml: renderBarChartVisual(dataset),
    visualSummary: dataset.summary,
    options: shuffleArray(dataset.items.map((item) => item.label)),
    answerValue: answerItem.label,
    answerLabel: answerItem.label,
  });
}

function createBarExactQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "bar");
  const answerItem = randomChoice(dataset.items);

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "exact", answerItem.label),
    visualHtml: renderBarChartVisual(dataset),
    visualSummary: dataset.summary,
    options: buildVisualNumberOptions(answerItem.value, difficulty),
    answerValue: String(answerItem.value),
    answerLabel: String(answerItem.value),
  });
}

function createBarTotalQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "bar");
  const answer = dataset.items.reduce((sum, item) => sum + item.value, 0);

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "total"),
    visualHtml: renderBarChartVisual(dataset),
    visualSummary: dataset.summary,
    options: buildVisualNumberOptions(answer, difficulty, answer + 3),
    answerValue: String(answer),
    answerLabel: String(answer),
  });
}

function createBarDifferenceQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "bar");
  const [smaller, larger] = [dataset.sortedByValue[0], dataset.sortedByValue[dataset.sortedByValue.length - 1]];
  const answer = larger.value - smaller.value;

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "difference", larger.label, smaller.label),
    visualHtml: renderBarChartVisual(dataset),
    visualSummary: dataset.summary,
    options: buildVisualNumberOptions(answer, difficulty),
    answerValue: String(answer),
    answerLabel: String(answer),
  });
}

function createTableMostQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "table");
  const answerItem = dataset.sortedByValue[dataset.sortedByValue.length - 1];

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "most"),
    visualHtml: renderTableVisual(dataset),
    visualSummary: dataset.summary,
    options: shuffleArray(dataset.items.map((item) => item.label)),
    answerValue: answerItem.label,
    answerLabel: answerItem.label,
  });
}

function createTableSecondMostQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "table");
  const answerItem = dataset.sortedByValue[dataset.sortedByValue.length - 2];

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "secondMost"),
    visualHtml: renderTableVisual(dataset),
    visualSummary: dataset.summary,
    options: shuffleArray(dataset.items.map((item) => item.label)),
    answerValue: answerItem.label,
    answerLabel: answerItem.label,
  });
}

function createTableFewestQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "table");
  const answerItem = dataset.sortedByValue[0];

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "fewest"),
    visualHtml: renderTableVisual(dataset),
    visualSummary: dataset.summary,
    options: shuffleArray(dataset.items.map((item) => item.label)),
    answerValue: answerItem.label,
    answerLabel: answerItem.label,
  });
}

function createTableExactQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "table");
  const answerItem = randomChoice(dataset.items);

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "exact", answerItem.label),
    visualHtml: renderTableVisual(dataset),
    visualSummary: dataset.summary,
    options: buildVisualNumberOptions(answerItem.value, difficulty),
    answerValue: String(answerItem.value),
    answerLabel: String(answerItem.value),
  });
}

function createTableTotalQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "table");
  const answer = dataset.items.reduce((sum, item) => sum + item.value, 0);

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "total"),
    visualHtml: renderTableVisual(dataset),
    visualSummary: dataset.summary,
    options: buildVisualNumberOptions(answer, difficulty, answer + 4),
    answerValue: String(answer),
    answerLabel: String(answer),
  });
}

function createTableCombinedQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "table");
  const pair = shuffleArray([...dataset.items]).slice(0, 2);
  const answer = pair[0].value + pair[1].value;

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "combined", pair[0].label, pair[1].label),
    visualHtml: renderTableVisual(dataset),
    visualSummary: dataset.summary,
    options: buildVisualNumberOptions(answer, difficulty, answer + 5),
    answerValue: String(answer),
    answerLabel: String(answer),
  });
}

function createTableDifferenceQuestion(difficulty) {
  const dataset = buildChartDataset(difficulty, "table");
  const pair = shuffleArray([...dataset.items]).slice(0, 2).sort((left, right) => right.value - left.value);
  const answer = pair[0].value - pair[1].value;

  return createVisualChoiceQuestion({
    type: "charts-and-graphs-choice",
    difficulty,
    questionText: buildChartQuestionText(dataset, "difference", pair[0].label, pair[1].label),
    visualHtml: renderTableVisual(dataset),
    visualSummary: dataset.summary,
    options: buildVisualNumberOptions(answer, difficulty),
    answerValue: String(answer),
    answerLabel: String(answer),
  });
}

function buildChartDataset(difficulty, visualType) {
  const template = randomChoice(
    visualType === "bar" ? CHART_BAR_TEMPLATES : CHART_TABLE_TEMPLATES
  );
  const config = {
    1: { min: 1, max: 6 },
    2: { min: 2, max: 8 },
    3: { min: 3, max: 12 },
    4: { min: 4, max: 18 },
    5: { min: 5, max: 24 },
  }[difficulty];
  const values = buildDistinctNumberList(template.labels.length, config.min, config.max, 1);
  const items = template.labels.map((label, index) => ({
    label,
    value: values[index],
  }));

  return {
    ...template,
    items,
    visualType,
    sortedByValue: [...items].sort((left, right) => left.value - right.value),
    summary: buildChartSummary(template, items),
  };
}

function buildChartQuestionText(dataset, promptName, ...args) {
  const promptBuilder = dataset.prompts?.[promptName];
  if (typeof promptBuilder !== "function") {
    throw new Error(`Missing chart prompt: ${promptName}`);
  }

  const visualName = dataset.visualType === "bar" ? "graph" : "table";
  return `Look at the ${visualName}. ${promptBuilder(...args)}`;
}

function buildChartSummary(template, items) {
  if (typeof template.summaryItem === "function") {
    return `${template.title}: ${items.map((item) => template.summaryItem(item)).join(", ")}`;
  }

  return `${template.title}: ${items.map((item) => `${item.label} ${item.value}`).join(", ")}`;
}

function renderBarChartVisual(dataset) {
  const maxValue = Math.max(...dataset.items.map((item) => item.value));
  const rows = dataset.items
    .map((item, index) => {
      const width = Math.max(18, Math.round((item.value / maxValue) * 100));
      return `
        <div class="visual-bar-row">
          <span class="visual-bar-label">${escapeHtml(item.label)}</span>
          <span class="visual-bar-track">
            <span class="visual-bar-fill visual-bar-fill-${index % 4}" style="width:${width}%"></span>
          </span>
          <span class="visual-bar-value">${item.value}</span>
        </div>
      `;
    })
    .join("");

  return `
    <div class="visual-card">
      <div class="visual-card-title">${escapeHtml(dataset.title)}</div>
      <div class="visual-bar-chart">${rows}</div>
    </div>
  `;
}

function renderTableVisual(dataset) {
  const rows = dataset.items
    .map(
      (item) => `
        <tr>
          <th scope="row">${escapeHtml(item.label)}</th>
          <td>${item.value}</td>
        </tr>
      `
    )
    .join("");

  return `
    <div class="visual-card">
      <div class="visual-card-title">${escapeHtml(dataset.title)}</div>
      <table class="visual-table">
        <thead>
          <tr>
            <th>${escapeHtml(dataset.leftLabel)}</th>
            <th>${escapeHtml(dataset.rightLabel)}</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function createHebrewChoiceQuestion(entry) {
  return {
    type: "hebrew-choice",
    difficulty: entry.difficulty,
    mode: "choice",
    questionText: "What does this Hebrew word mean?",
    displayText: entry.hebrewDisplay,
    extraText: "",
    extraHtml: entry.transliteration
      ? `
        <details class="transliteration-toggle">
          <summary>Show transliteration</summary>
          <div class="transliteration-content">Sounds like: ${escapeHtml(entry.transliteration)}</div>
        </details>
      `
      : "",
    options: buildHebrewOptions(entry.english),
    answerValue: entry.english,
    answerLabel: entry.english,
    isHebrew: true,
  };
}

function createBankChoiceQuestion(entry, type) {
  return {
    type,
    difficulty: entry.difficulty,
    mode: "choice",
    questionText: entry.question,
    displayText: entry.displayText || "",
    extraText: entry.extraText || "",
    extraHtml: entry.extraHtml || "",
    visualHtml: entry.visualHtml || "",
    visualSummary: entry.visualSummary || "",
    options: shuffleArray([...entry.options]),
    answerValue: entry.answer,
    answerLabel: entry.answer,
    isHebrew: false,
  };
}

function createGeneratedCategoryQuestion(category, difficulty) {
  const config = generatedChoiceCategoryConfigs[category];
  if (!config?.factory || Math.random() >= config.share) {
    return null;
  }

  try {
    const normalizedEntry = normalizeChoiceBankEntry(config.factory(difficulty), `${category}-choice`);
    return normalizedEntry ? createBankChoiceQuestion(normalizedEntry, `${category}-choice`) : null;
  } catch {
    return null;
  }
}

function createTimeChoiceQuestion(difficulty) {
  const config = {
    1: { minutes: [5, 10, 15, 30], hours: [7, 18], crossHour: false },
    2: { minutes: [5, 10, 15, 20, 30], hours: [7, 19], crossHour: true },
    3: { minutes: [15, 20, 30, 45, 60], hours: [7, 20], crossHour: true },
    4: { minutes: [20, 25, 35, 45, 60, 75, 90], hours: [6, 21], crossHour: true },
    5: { minutes: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 75, 90, 105, 120], hours: [6, 21], crossHour: true },
  }[difficulty];

  let startMinutes = randomInt(config.hours[0], config.hours[1]) * 60 + randomChoice([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);
  const minutesToAdd = randomChoice(config.minutes);

  if (!config.crossHour) {
    startMinutes = Math.floor(startMinutes / 60) * 60 + randomChoice([0, 5, 10, 15, 20, 25]);
  }

  const answerMinutes = startMinutes + minutesToAdd;
  const correctTime = formatClockTime(answerMinutes);
  const optionMinutes = buildTimeOptions(answerMinutes);

  return {
    type: "time-choice",
    difficulty,
    mode: "choice",
    questionText: `It's ${formatClockTime(startMinutes)}. In ${minutesToAdd} minutes, what time will it be?`,
    displayText: "",
    extraText: "",
    options: optionMinutes.map((value) => formatClockTime(value)),
    answerValue: correctTime,
    answerLabel: correctTime,
    isHebrew: false,
  };
}

function createNumericInputQuestion({ type, difficulty, questionText, displayText, answer }) {
  return {
    type,
    difficulty,
    mode: "input",
    questionText,
    displayText,
    extraText: "",
    answerValue: answer,
    answerLabel: String(answer),
    isHebrew: false,
  };
}

function createNumericChoiceQuestion({ type, difficulty, questionText, displayText, answer }) {
  return {
    type,
    difficulty,
    mode: "choice",
    questionText,
    displayText,
    extraText: "",
    options: buildNumberOptions(answer).map(String),
    answerValue: String(answer),
    answerLabel: String(answer),
    isHebrew: false,
  };
}

function createVisualChoiceQuestion({
  type,
  difficulty,
  questionText,
  visualHtml,
  visualSummary,
  options,
  answerValue,
  answerLabel,
}) {
  return {
    type,
    difficulty,
    mode: "choice",
    questionText,
    displayText: "",
    extraText: "",
    visualHtml,
    visualSummary,
    options,
    answerValue,
    answerLabel,
    isHebrew: false,
  };
}

function renderCurrentQuestion() {
  const question = state.questions[state.currentIndex];
  if (!question) {
    void finishSession();
    return;
  }

  updateStatusBar();
  renderFeedback();

  elements.questionNumber.textContent = `Question ${state.currentIndex + 1}:`;
  elements.questionPrompt.textContent = question.questionText;
  elements.questionPrompt.hidden = !question.questionText;

  elements.questionMain.textContent = question.displayText;
  elements.questionMain.hidden = !question.displayText;
  elements.questionMain.classList.toggle("hebrew", Boolean(question.isHebrew));

  elements.questionVisual.innerHTML = question.visualHtml || "";
  elements.questionVisual.hidden = !question.visualHtml;

  if (question.extraHtml) {
    elements.questionExtra.innerHTML = question.extraHtml;
    elements.questionExtra.hidden = false;
  } else {
    elements.questionExtra.textContent = question.extraText || "";
    elements.questionExtra.hidden = !question.extraText;
  }

  if (question.mode === "input") {
    elements.answerForm.hidden = false;
    elements.inputArea.hidden = false;
    elements.choicesArea.hidden = true;
    elements.answerInput.value = "";
    focusAnswerInput();
    return;
  }

  elements.answerInput.value = "";
  elements.answerForm.hidden = true;
  elements.inputArea.hidden = true;
  elements.choicesArea.hidden = false;
  renderChoiceButtons(question);
}

function renderChoiceButtons(question) {
  elements.choicesArea.innerHTML = "";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.dataset.value = option;
    button.innerHTML = `<span class="choice-label">${OPTION_LABELS[index]})</span><span>${escapeHtml(option)}</span>`;
    button.addEventListener("click", () => handleAnswer(question, option === question.answerValue, option));
    elements.choicesArea.appendChild(button);
  });
}

function focusAnswerInput() {
  const focusInput = () => {
    elements.answerInput.focus();
  };

  if (typeof requestAnimationFrame === "function") {
    requestAnimationFrame(focusInput);
    return;
  }

  focusInput();
}

function submitTypedAnswer(event) {
  event.preventDefault();

  const question = state.questions[state.currentIndex];
  if (!question || question.mode !== "input") {
    return;
  }

  const typedValue = elements.answerInput.value.trim();
  if (typedValue === "") {
    state.feedbackMessage = "Type an answer and press Enter.";
    state.feedbackTone = "error";
    renderFeedback();
    return;
  }

  const parsedValue = Number(typedValue);
  if (!Number.isFinite(parsedValue)) {
    state.feedbackMessage = "Please type a number.";
    state.feedbackTone = "error";
    renderFeedback();
    return;
  }

  handleAnswer(question, Math.abs(parsedValue - question.answerValue) < 0.000001, typedValue);
}

function handleAnswer(question, isCorrect, selectedValue = "") {
  state.answeredCount += 1;
  if (isCorrect) {
    state.correctCount += 1;
  }

  state.answerResults[state.currentIndex] = isCorrect;
  state.sessionRecords.push(
    buildSessionRecord(state.currentIndex + 1, question, selectedValue, isCorrect)
  );
  state.feedbackMessage = buildOutcomeMessage(question, isCorrect, selectedValue);
  state.feedbackTone = isCorrect ? "success" : "error";

  if (state.currentIndex === state.totalQuestions - 1) {
    void finishSession();
    return;
  }

  state.currentIndex += 1;
  renderCurrentQuestion();
}

function buildOutcomeMessage(question, isCorrect, selectedValue = "") {
  if (isCorrect) {
    return "Correct!";
  }

  return formatQuestionReview(question, selectedValue);
}

function formatQuestionReview(question, selectedValue) {
  const lines = [];
  const addLine = (content, className = "") => {
    const classAttribute = className ? ` class="${className}"` : "";
    lines.push(`<div${classAttribute}>${content}</div>`);
  };

  if (question.questionText) {
    addLine(escapeHtml(question.questionText), "feedback-review-line feedback-review-question");
  }

  if (question.displayText) {
    addLine(escapeHtml(question.displayText), "feedback-review-line");
  }

  if (question.visualSummary) {
    addLine(escapeHtml(question.visualSummary), "feedback-review-line");
  }

  if (Array.isArray(question.options) && question.options.length) {
    question.options.forEach((option, index) => {
      const optionClasses = ["feedback-review-line", "feedback-review-option"];
      if (option === selectedValue) {
        optionClasses.push("selected");
      }
      if (option === question.answerValue) {
        optionClasses.push("correct");
      }

      addLine(
        `<span class="feedback-review-option-label">${OPTION_LABELS[index]})</span> ` +
          `<span class="feedback-review-option-text">${escapeHtml(option)}</span>`,
        optionClasses.join(" ")
      );
    });
  } else if (selectedValue !== "") {
    lines.push('<div class="feedback-review-spacer"></div>');
    addLine(
      `<span class="feedback-review-label">Your answer:</span> ` +
        `<span class="feedback-review-answer selected">${escapeHtml(String(selectedValue))}</span>`,
      "feedback-review-line"
    );
    lines.push('<div class="feedback-review-spacer"></div>');
    addLine(
      `<span class="feedback-review-label">Correct answer:</span> ` +
        `<span class="feedback-review-answer correct">${escapeHtml(String(question.answerLabel))}</span>`,
      "feedback-review-line"
    );
  } else {
    lines.push('<div class="feedback-review-spacer"></div>');
    addLine(
      `<span class="feedback-review-label">Correct answer:</span> ` +
        `<span class="feedback-review-answer correct">${escapeHtml(String(question.answerLabel))}</span>`,
      "feedback-review-line"
    );
  }

  return `<div class="feedback-review">${lines.join("")}</div>`;
}

function finishSession() {
  switchScreen(elements.resultsScreen);
  const percentage = state.totalQuestions
    ? (state.correctCount / state.totalQuestions) * 100
    : 0;
  const roundedPercentage = Math.round(percentage);

  elements.resultsTitle.textContent = getResultsPraise(percentage);
  elements.resultsSummary.textContent =
    `You got ${state.correctCount} out of ${state.totalQuestions} correct. That's ${roundedPercentage}%.`;
  saveSessionHistory();
  playConfetti(12000);
}

function showStartScreen() {
  switchScreen(elements.startScreen);
  clearStartMessage();
  stopConfetti();
  state.answerResults = [];
  state.sessionRecords = [];
  state.feedbackMessage = "";
  state.feedbackTone = "";
  elements.questionCount.focus();
}

function updateStatusBar() {
  elements.scoreText.textContent = `${state.correctCount}/${state.answeredCount}`;
  renderProgressTracker();
}

function renderProgressTracker() {
  elements.progressTracker.innerHTML = "";

  for (let index = 0; index < state.totalQuestions; index += 1) {
    const box = document.createElement("span");
    box.className = "progress-box";

    if (state.answerResults[index] === true) {
      box.classList.add("correct");
    } else if (state.answerResults[index] === false) {
      box.classList.add("wrong");
    }

    elements.progressTracker.appendChild(box);
  }
}

function renderFeedback() {
  elements.feedback.innerHTML = state.feedbackMessage;
  elements.feedback.className = state.feedbackMessage
    ? `feedback-banner ${state.feedbackTone}`
    : "feedback-banner";
}

function switchScreen(activeScreen) {
  elements.startScreen.hidden = activeScreen !== elements.startScreen;
  elements.quizScreen.hidden = activeScreen !== elements.quizScreen;
  elements.resultsScreen.hidden = activeScreen !== elements.resultsScreen;
  elements.historyScreen.hidden = activeScreen !== elements.historyScreen;
}

function clearStartMessage() {
  elements.startFeedback.textContent = "";
  elements.startFeedback.className = "feedback";
}

function showStartMessage(message, tone) {
  elements.startFeedback.textContent = message;
  elements.startFeedback.className = `feedback ${tone}`;
}

function buildSessionRecord(questionNumber, question, selectedValue, isCorrect) {
  return {
    questionNumber,
    questionText: formatQuestionForLog(question),
    chosenAnswer: selectedValue === "" ? "(no answer)" : String(selectedValue),
    correctAnswer: question.answerLabel,
    isCorrect,
  };
}

function formatQuestionForLog(question) {
  const lines = [];

  if (question.questionText) {
    lines.push(question.questionText);
  }

  if (question.displayText) {
    lines.push(question.displayText);
  }

  if (question.visualSummary) {
    lines.push(question.visualSummary);
  }

  if (question.extraText) {
    lines.push(question.extraText);
  }

  return lines.join("\n");
}

function buildSessionHistoryEntry() {
  const startedAt = state.sessionStartedAt || new Date();
  return {
    id: startedAt.toISOString(),
    startedAt: startedAt.toISOString(),
    difficulty: state.difficulty,
    totalQuestions: state.totalQuestions,
    correctCount: state.correctCount,
    records: state.sessionRecords.map((record) => ({ ...record })),
  };
}

function saveSessionHistory() {
  if (!state.sessionRecords.length) {
    return false;
  }

  const sessionHistory = loadSessionHistory();
  sessionHistory.unshift(buildSessionHistoryEntry());
  sessionHistory.splice(MAX_SAVED_SESSIONS);

  return writeSessionHistory(sessionHistory);
}

function loadSessionHistory() {
  const storage = getSessionStorage();
  if (!storage) {
    return [];
  }

  try {
    const rawValue = storage.getItem(SESSION_HISTORY_STORAGE_KEY);
    if (!rawValue) {
      return [];
    }

    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function writeSessionHistory(sessionHistory) {
  const storage = getSessionStorage();
  if (!storage) {
    return false;
  }

  try {
    storage.setItem(SESSION_HISTORY_STORAGE_KEY, JSON.stringify(sessionHistory));
    return true;
  } catch (error) {
    return false;
  }
}

function getSessionStorage() {
  try {
    return window.localStorage;
  } catch (error) {
    return null;
  }
}

function showHistoryScreen() {
  renderHistoryScreen();
  switchScreen(elements.historyScreen);
}

function renderHistoryScreen() {
  const sessionHistory = loadSessionHistory();
  elements.historyList.innerHTML = "";
  elements.historyEmpty.hidden = sessionHistory.length > 0;

  if (!sessionHistory.length) {
    elements.historyEmpty.textContent = "No previous sessions yet.";
    return;
  }

  sessionHistory.forEach((session, index) => {
    elements.historyList.appendChild(createHistorySessionElement(session, index === 0));
  });
}

function createHistorySessionElement(session, shouldOpen) {
  const details = document.createElement("details");
  details.className = "history-session";
  details.open = shouldOpen;

  const summary = document.createElement("summary");
  const title = document.createElement("span");
  title.textContent = formatHistoryDate(session.startedAt);

  const meta = document.createElement("span");
  meta.className = "history-session-meta";
  meta.textContent =
    `${session.correctCount}/${session.totalQuestions} correct | Difficulty ${session.difficulty}`;

  summary.appendChild(title);
  summary.appendChild(meta);
  details.appendChild(summary);

  const body = document.createElement("div");
  body.className = "history-session-body";

  session.records.forEach((record) => {
    body.appendChild(createHistoryQuestionElement(record));
  });

  details.appendChild(body);
  return details;
}

function createHistoryQuestionElement(record) {
  const wrapper = document.createElement("div");
  wrapper.className = "history-question";

  const title = document.createElement("p");
  title.className = "history-question-title";
  title.textContent = `Question ${record.questionNumber}`;
  wrapper.appendChild(title);

  const questionText = document.createElement("p");
  questionText.className = "history-question-text";
  questionText.textContent = record.questionText;
  wrapper.appendChild(questionText);

  const chosenAnswer = document.createElement("p");
  chosenAnswer.className = "history-answer-line";
  chosenAnswer.textContent = `Chosen answer: ${record.chosenAnswer}`;
  wrapper.appendChild(chosenAnswer);

  const correctAnswer = document.createElement("p");
  correctAnswer.className = "history-answer-line";
  correctAnswer.textContent = `Correct answer: ${record.correctAnswer}`;
  wrapper.appendChild(correctAnswer);

  const result = document.createElement("p");
  result.className = `history-answer-line ${record.isCorrect ? "correct" : "wrong"}`;
  result.textContent = `Result: ${record.isCorrect ? "Correct" : "Wrong"}`;
  wrapper.appendChild(result);

  return wrapper;
}

function formatHistoryDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Previous session";
  }

  return date.toLocaleString();
}

function getResultsPraise(percentage) {
  if (percentage > 95) {
    return "Super duper work!";
  }

  if (percentage > 90) {
    return "Excellent work!";
  }

  if (percentage > 80) {
    return "Well done!";
  }

  return "Session Finished";
}

function playConfetti(durationMs) {
  stopConfetti();

  const layer = document.createElement("div");
  layer.className = "confetti-layer";
  const colors = ["#ff6b6b", "#ffd166", "#06d6a0", "#118ab2", "#ef476f", "#7cc576"];
  document.body.appendChild(layer);

  confettiRuntime.layer = layer;
  confettiRuntime.pieces = [];
  confettiRuntime.pointer = null;
  confettiRuntime.startTime = getNow();
  confettiRuntime.lastFrameTime = confettiRuntime.startTime;

  const viewportWidth = getViewportWidth();
  for (let index = 0; index < 180; index += 1) {
    const piece = createConfettiPiece(layer, colors);
    resetConfettiPiece(piece, 0, durationMs, viewportWidth, true);
    confettiRuntime.pieces.push(piece);
  }

  confettiRuntime.moveHandler = (event) => {
    confettiRuntime.pointer = {
      x: event.clientX,
      y: event.clientY,
    };
  };
  window.addEventListener("pointermove", confettiRuntime.moveHandler, { passive: true });

  const maxLifetimeMs = durationMs + 18000;
  confettiRuntime.cleanupTimerId = window.setTimeout(stopConfetti, maxLifetimeMs);
  confettiRuntime.frameId = window.requestAnimationFrame((now) => animateConfetti(now, durationMs));
}

function stopConfetti() {
  if (confettiRuntime.frameId !== null) {
    window.cancelAnimationFrame(confettiRuntime.frameId);
    confettiRuntime.frameId = null;
  }

  if (confettiRuntime.cleanupTimerId !== null) {
    window.clearTimeout(confettiRuntime.cleanupTimerId);
    confettiRuntime.cleanupTimerId = null;
  }

  if (confettiRuntime.moveHandler) {
    window.removeEventListener("pointermove", confettiRuntime.moveHandler);
    confettiRuntime.moveHandler = null;
  }

  if (confettiRuntime.layer) {
    confettiRuntime.layer.remove();
    confettiRuntime.layer = null;
  }

  confettiRuntime.pieces = [];
  confettiRuntime.pointer = null;
  confettiRuntime.startTime = 0;
  confettiRuntime.lastFrameTime = 0;

  document.querySelectorAll(".confetti-layer").forEach((layer) => layer.remove());
}

function createConfettiPiece(layer, colors) {
  const piece = document.createElement("span");
  piece.className = "confetti-piece";
  piece.style.background = randomChoice(colors);
  piece.style.display = "none";
  layer.appendChild(piece);

  return {
    active: false,
    element: piece,
    gravity: 0,
    height: 0,
    rotation: 0,
    rotationSpeed: 0,
    spawnAt: 0,
    wobbleAmount: 0,
    wobblePhase: 0,
    wobbleSpeed: 0,
    width: 0,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
  };
}

function resetConfettiPiece(piece, elapsedMs, durationMs, viewportWidth, allowFullSpawnWindow) {
  const maxDelay = allowFullSpawnWindow
    ? durationMs
    : Math.min(1400, Math.max(250, durationMs - elapsedMs));

  piece.active = false;
  piece.spawnAt = elapsedMs + randomInt(0, maxDelay);
  piece.width = randomInt(8, 14);
  piece.height = randomInt(12, 22);
  piece.x = Math.random() * viewportWidth;
  piece.y = -randomInt(30, 220);
  piece.vx = randomInt(-40, 40);
  piece.vy = randomInt(18, 55);
  piece.gravity = randomInt(80, 160);
  piece.rotation = randomInt(0, 360);
  piece.rotationSpeed = randomInt(-260, 260);
  piece.wobbleAmount = randomInt(18, 46);
  piece.wobbleSpeed = 1.2 + Math.random() * 2.4;
  piece.wobblePhase = Math.random() * Math.PI * 2;

  piece.element.style.width = `${piece.width}px`;
  piece.element.style.height = `${piece.height}px`;
  piece.element.style.left = "0";
  piece.element.style.top = "0";
  piece.element.style.opacity = `${0.78 + Math.random() * 0.22}`;
  piece.element.style.display = "none";
}

function animateConfetti(now, durationMs) {
  if (!confettiRuntime.layer) {
    return;
  }

  const elapsedMs = now - confettiRuntime.startTime;
  const deltaMs = Math.min(32, now - confettiRuntime.lastFrameTime || 16);
  const deltaSeconds = deltaMs / 1000;
  const viewportWidth = getViewportWidth();
  const viewportHeight = getViewportHeight();
  const pointer = confettiRuntime.pointer;
  let activeCount = 0;

  confettiRuntime.lastFrameTime = now;

  for (const piece of confettiRuntime.pieces) {
    if (!piece.active) {
      if (elapsedMs >= piece.spawnAt) {
        piece.active = true;
        piece.element.style.display = "block";
      } else {
        continue;
      }
    }

    if (pointer) {
      applyConfettiRepulsion(piece, pointer, deltaSeconds);
    }

    piece.vx *= 0.996;
    piece.vy += piece.gravity * deltaSeconds;
    piece.x +=
      (piece.vx + Math.sin(elapsedMs / 1000 * piece.wobbleSpeed + piece.wobblePhase) * piece.wobbleAmount) *
      deltaSeconds;
    piece.y += piece.vy * deltaSeconds;
    piece.rotation += piece.rotationSpeed * deltaSeconds;

    piece.element.style.transform =
      `translate3d(${piece.x}px, ${piece.y}px, 0) rotate(${piece.rotation}deg)`;

    if (piece.y > viewportHeight + 140 || piece.x < -180 || piece.x > viewportWidth + 180) {
      if (elapsedMs < durationMs) {
        resetConfettiPiece(piece, elapsedMs, durationMs, viewportWidth, false);
      } else {
        piece.active = false;
        piece.element.style.display = "none";
      }
      continue;
    }

    activeCount += 1;
  }

  if (elapsedMs < durationMs || activeCount > 0) {
    confettiRuntime.frameId = window.requestAnimationFrame((frameNow) =>
      animateConfetti(frameNow, durationMs)
    );
    return;
  }

  stopConfetti();
}

function applyConfettiRepulsion(piece, pointer, deltaSeconds) {
  const dx = piece.x - pointer.x;
  const dy = piece.y - pointer.y;
  const distance = Math.hypot(dx, dy) || 1;
  const radius = 170;

  if (distance > radius) {
    return;
  }

  const force = (1 - distance / radius) * 1900;
  piece.vx += (dx / distance) * force * deltaSeconds;
  piece.vy += (dy / distance) * force * deltaSeconds;
}

function getNow() {
  if (typeof performance !== "undefined" && typeof performance.now === "function") {
    return performance.now();
  }

  return Date.now();
}

function getViewportWidth() {
  return window.innerWidth || document.documentElement.clientWidth || 1024;
}

function getViewportHeight() {
  return window.innerHeight || document.documentElement.clientHeight || 768;
}

function generateAdditionValues(difficulty) {
  const config = {
    1: { min: 0, max: 10, answerMin: 0, answerMax: 20, negativeBias: 0 },
    2: { min: -5, max: 20, answerMin: -10, answerMax: 30, negativeBias: 0.3 },
    3: { min: -10, max: 30, answerMin: -20, answerMax: 40, negativeBias: 0.4 },
    4: { min: -20, max: 50, answerMin: -20, answerMax: 70, negativeBias: 0.5 },
    5: { min: -20, max: 80, answerMin: -20, answerMax: 100, negativeBias: 0.55 },
  }[difficulty];

  return buildSignedOperationValues((left, right) => left + right, config);
}

function generateSubtractionValues(difficulty) {
  const config = {
    1: { min: 0, max: 12, answerMin: 0, answerMax: 12, negativeBias: 0 },
    2: { min: -5, max: 20, answerMin: -10, answerMax: 25, negativeBias: 0.35 },
    3: { min: -10, max: 30, answerMin: -20, answerMax: 40, negativeBias: 0.45 },
    4: { min: -20, max: 50, answerMin: -20, answerMax: 70, negativeBias: 0.55 },
    5: { min: -20, max: 80, answerMin: -20, answerMax: 100, negativeBias: 0.6 },
  }[difficulty];

  return buildSignedOperationValues((left, right) => left - right, config);
}

function buildSignedOperationValues(operation, config) {
  while (true) {
    const left = randomInt(config.min, config.max);
    const right = randomInt(config.min, config.max);
    const answer = operation(left, right);

    if (answer < config.answerMin || answer > config.answerMax) {
      continue;
    }

    if (
      config.negativeBias > 0 &&
      Math.random() < config.negativeBias &&
      left >= 0 &&
      right >= 0 &&
      answer >= 0
    ) {
      continue;
    }

    return [left, right, answer];
  }
}

function generateMultiplicationValues(difficulty) {
  const config = {
    1: { min: 0, max: 5, requireLargeFactor: false },
    2: { min: 0, max: 6, requireLargeFactor: false },
    3: { min: 0, max: 8, requireLargeFactor: false },
    4: { min: 1, max: 10, requireLargeFactor: false },
    5: { min: 2, max: 10, requireLargeFactor: true },
  }[difficulty];

  while (true) {
    const left = randomInt(config.min, config.max);
    const right = randomInt(config.min, config.max);
    if (config.requireLargeFactor && left < 6 && right < 6) {
      continue;
    }
    return { left, right };
  }
}

function generateDivisionProblem(difficulty) {
  const config = {
    1: { divisors: [2, 3, 4, 5], quotientMin: 1, quotientMax: 10 },
    2: { divisors: [2, 3, 4, 5, 6, 10], quotientMin: 2, quotientMax: 12 },
    3: { divisors: [2, 3, 4, 5, 6, 7, 8, 9, 10], quotientMin: 2, quotientMax: 15 },
    4: { divisors: [3, 4, 5, 6, 7, 8, 9, 10, 12], quotientMin: 3, quotientMax: 18 },
    5: { divisors: [4, 5, 6, 7, 8, 9, 10, 12], quotientMin: 4, quotientMax: 25 },
  }[difficulty];

  const divisor = randomChoice(config.divisors);
  const quotient = randomInt(config.quotientMin, config.quotientMax);
  return {
    divisor,
    dividend: divisor * quotient,
    quotient,
  };
}

function generateMissingNumberProblem(difficulty) {
  const operation = randomChoice(
    {
      1: ["addition", "subtraction"],
      2: ["addition", "subtraction"],
      3: ["addition", "subtraction", "multiplication"],
      4: ["addition", "subtraction", "multiplication", "division"],
      5: ["addition", "subtraction", "multiplication", "division"],
    }[difficulty]
  );

  if (operation === "addition") {
    const [left, right, answer] = generateAdditionValues(Math.max(1, difficulty - 1));
    if (Math.random() < 0.5) {
      return {
        questionText: "What number makes the equation true?",
        displayText: `__ + ${formatSignedNumber(right)} = ${formatSignedNumber(answer)}`,
        answer: left,
      };
    }

    return {
      questionText: "What number makes the equation true?",
      displayText: `${formatSignedNumber(left)} + __ = ${formatSignedNumber(answer)}`,
      answer: right,
    };
  }

  if (operation === "subtraction") {
    const [left, right, answer] = generateSubtractionValues(Math.max(1, difficulty - 1));
    if (Math.random() < 0.5) {
      return {
        questionText: "What number makes the equation true?",
        displayText: `__ - ${formatSignedNumber(right)} = ${formatSignedNumber(answer)}`,
        answer: left,
      };
    }

    return {
      questionText: "What number makes the equation true?",
      displayText: `${formatSignedNumber(left)} - __ = ${formatSignedNumber(answer)}`,
      answer: right,
    };
  }

  if (operation === "multiplication") {
    const { left, right } = generateMultiplicationValues(difficulty);
    if (Math.random() < 0.5) {
      return {
        questionText: "What number makes the equation true?",
        displayText: `__ × ${right} = ${left * right}`,
        answer: left,
      };
    }

    return {
      questionText: "What number makes the equation true?",
      displayText: `${left} × __ = ${left * right}`,
      answer: right,
    };
  }

  const { dividend, divisor, quotient } = generateDivisionProblem(difficulty);
  if (Math.random() < 0.5) {
    return {
      questionText: "What number makes the equation true?",
      displayText: `__ ÷ ${divisor} = ${quotient}`,
      answer: dividend,
    };
  }

  return {
    questionText: "What number makes the equation true?",
    displayText: `${dividend} ÷ __ = ${quotient}`,
    answer: divisor,
  };
}

function generateDecimalOperationProblem(difficulty) {
  const config = {
    1: { digits: 1, maxWhole: 3, allowSubtraction: false },
    2: { digits: 1, maxWhole: 8, allowSubtraction: true },
    3: { digits: 2, maxWhole: 10, allowSubtraction: true },
    4: { digits: 2, maxWhole: 20, allowSubtraction: true },
    5: { digits: 2, maxWhole: 35, allowSubtraction: true },
  }[difficulty];
  const scale = 10 ** config.digits;
  const operator = config.allowSubtraction && Math.random() < 0.45 ? "-" : "+";

  while (true) {
    const leftScaled = randomInt(scale, config.maxWhole * scale);
    const rightScaled =
      operator === "-"
        ? randomInt(1, Math.max(1, leftScaled - 1))
        : randomInt(1, config.maxWhole * scale);
    const answerScaled = operator === "-" ? leftScaled - rightScaled : leftScaled + rightScaled;

    if (answerScaled <= 0 || answerScaled > (config.maxWhole + 5) * scale) {
      continue;
    }

    if (leftScaled % scale === 0 && rightScaled % scale === 0) {
      continue;
    }

    return {
      digits: config.digits,
      operator,
      leftText: formatDecimalNumber(leftScaled / scale, config.digits),
      rightText: formatDecimalNumber(rightScaled / scale, config.digits),
      answer: Number((answerScaled / scale).toFixed(config.digits)),
    };
  }
}

function generatePlaceValueProblem(difficulty) {
  const digitCount = difficulty <= 2 ? 4 : difficulty === 3 ? 5 : 6;
  const digits = buildUniqueDigitSequence(digitCount);
  const validIndexes = digits
    .map((digit, index) => (digit === 0 ? null : index))
    .filter((value) => value !== null);
  const targetIndex = randomChoice(validIndexes);
  const targetDigit = digits[targetIndex];
  const placePower = digitCount - targetIndex - 1;
  const answer = targetDigit * 10 ** placePower;
  const optionPowers = shuffleArray(
    Array.from({ length: digitCount }, (_, power) => power).filter((power) => power !== placePower)
  ).slice(0, 3);

  return {
    numberText: formatGroupedNumber(Number(digits.join(""))),
    digit: targetDigit,
    answer,
    options: shuffleArray([placePower, ...optionPowers]).map((power) => targetDigit * 10 ** power),
  };
}

function generateRoundingProblem(difficulty) {
  const config = {
    1: { placeValues: [10], min: 12, max: 95 },
    2: { placeValues: [10], min: 25, max: 495 },
    3: { placeValues: [10, 100], min: 120, max: 2495 },
    4: { placeValues: [100], min: 250, max: 4995 },
    5: { placeValues: [100, 1000], min: 1500, max: 99995 },
  }[difficulty];

  while (true) {
    const placeValue = randomChoice(config.placeValues);
    const number = randomInt(config.min, config.max);
    if (number % placeValue === 0) {
      continue;
    }

    return {
      number,
      placeValue,
      answer: roundToNearest(number, placeValue),
    };
  }
}

function generateDecimalComparisonProblem(difficulty) {
  const digits = difficulty <= 2 ? 1 : 2;
  const scale = 10 ** digits;
  const askFor = randomChoice(["greatest", "smallest"]);
  const scaledValues = new Set();
  const baseWhole = difficulty <= 2 ? randomInt(0, 9) : randomInt(1, 24);

  while (scaledValues.size < 4) {
    let wholePart = baseWhole;
    if (difficulty >= 4 && Math.random() < 0.35) {
      wholePart += randomChoice([-1, 1]);
    }

    const fractionalPart = randomInt(0, scale - 1);
    const scaledValue = wholePart * scale + fractionalPart;
    if (scaledValue >= 0) {
      scaledValues.add(scaledValue);
    }
  }

  const ordered = Array.from(scaledValues);
  const answerScaled = askFor === "greatest" ? Math.max(...ordered) : Math.min(...ordered);

  return {
    askFor,
    options: ordered.map((value) => formatDecimalNumber(value / scale, digits)),
    answer: formatDecimalNumber(answerScaled / scale, digits),
  };
}

function generateRectangleMeasureProblem(difficulty) {
  const config = {
    1: { min: 2, max: 6, measures: ["area"] },
    2: { min: 2, max: 8, measures: ["area", "perimeter"] },
    3: { min: 3, max: 10, measures: ["area", "perimeter"] },
    4: { min: 4, max: 14, measures: ["area", "perimeter"] },
    5: { min: 5, max: 20, measures: ["area", "perimeter"] },
  }[difficulty];
  const length = randomInt(config.min, config.max);
  const width = randomInt(config.min, config.max);
  const measure = randomChoice(config.measures);

  return {
    questionText: `A rectangle is ${length} units long and ${width} units wide. What is the ${measure}?`,
    answer: measure === "area" ? length * width : 2 * (length + width),
  };
}

function generatePrimeCompositeProblem(difficulty) {
  const maxValue = difficulty <= 2 ? 25 : difficulty === 3 ? 40 : difficulty === 4 ? 60 : 90;
  const values = Array.from({ length: maxValue - 1 }, (_, index) => index + 2);
  const primes = values.filter(isPrime);
  const composites = values.filter((value) => !isPrime(value));
  const askFor = randomChoice(["prime", "composite"]);
  const answerPool = askFor === "prime" ? primes : composites;
  const distractorPool = askFor === "prime" ? composites : primes;
  const answer = randomChoice(answerPool);

  return {
    askFor,
    answer,
    options: shuffleArray([answer, ...shuffleArray(distractorPool.filter((value) => value !== answer)).slice(0, 3)]),
  };
}

function generateNumberPattern(difficulty) {
  const constantSteps = {
    1: [1, 2, 5],
    2: [2, 3, 4, 5, 10, -1],
    3: [3, 4, 5, 6, 8, -2, -3],
    4: [4, 6, 8, 10, -3, -4],
    5: [5, 6, 8, 10, 12, -4, -5],
  }[difficulty];

  const multiplicativeSteps = {
    1: [],
    2: [],
    3: [2],
    4: [2, 3],
    5: [2, 3],
  }[difficulty];

  const advancedFactories = {
    1: [],
    2: [],
    3: [],
    4: [generateGrowingStepPattern, generateShrinkingStepPattern],
    5: [generateGrowingStepPattern, generateShrinkingStepPattern, generateGrowingStepPattern],
  }[difficulty];

  if (advancedFactories.length && Math.random() < 0.45) {
    return randomChoice(advancedFactories)(difficulty);
  }

  if (multiplicativeSteps.length && Math.random() < (difficulty >= 4 ? 0.25 : 0.35)) {
    const factor = randomChoice(multiplicativeSteps);
    const start = randomInt(1, factor === 2 ? 12 : 3);
    const sequence = [
      start,
      start * factor,
      start * factor * factor,
      start * factor * factor * factor,
    ];
    return {
      sequence,
      answer: start * factor * factor * factor * factor,
    };
  }

  const step = randomChoice(constantSteps);
  const start = randomInt(
    step > 0 ? 1 : Math.abs(step) * 4 + 5,
    difficulty <= 2 ? 20 : difficulty === 3 ? 45 : difficulty === 4 ? 70 : 100
  );
  const sequence = [start, start + step, start + step * 2, start + step * 3];
  return {
    sequence,
    answer: start + step * 4,
  };
}

function generateGrowingStepPattern(difficulty) {
  const stepGrowth = difficulty >= 5 ? randomChoice([2, 3]) : randomChoice([1, 2]);
  const firstStep = difficulty >= 5 ? randomInt(3, 8) : randomInt(2, 6);
  const direction = Math.random() < 0.7 ? 1 : -1;
  const start = direction > 0 ? randomInt(1, difficulty >= 5 ? 35 : 25) : randomInt(35, 90);
  const steps = [
    direction * firstStep,
    direction * (firstStep + stepGrowth),
    direction * (firstStep + stepGrowth * 2),
    direction * (firstStep + stepGrowth * 3),
  ];
  const sequence = [start];

  for (let index = 0; index < 3; index += 1) {
    sequence.push(sequence[sequence.length - 1] + steps[index]);
  }

  return {
    sequence,
    answer: sequence[sequence.length - 1] + steps[3],
  };
}

function generateShrinkingStepPattern(difficulty) {
  const stepChange = difficulty >= 5 ? randomChoice([2, 3]) : 1;
  const baseStep = difficulty >= 5 ? randomInt(8, 14) : randomInt(5, 9);
  const direction = Math.random() < 0.65 ? 1 : -1;
  const steps = [
    direction * baseStep,
    direction * (baseStep - stepChange),
    direction * (baseStep - stepChange * 2),
    direction * (baseStep - stepChange * 3),
  ];
  const smallestMagnitude = Math.min(...steps.map((step) => Math.abs(step)));
  const start =
    direction > 0
      ? randomInt(1, difficulty >= 5 ? 40 : 30)
      : randomInt(20 + smallestMagnitude * 4, difficulty >= 5 ? 110 : 80);
  const sequence = [start];

  for (let index = 0; index < 3; index += 1) {
    sequence.push(sequence[sequence.length - 1] + steps[index]);
  }

  return {
    sequence,
    answer: sequence[sequence.length - 1] + steps[3],
  };
}

function generateMoneyProblem(difficulty) {
  const config = {
    1: { amounts: [10, 20, 30, 40, 50], step: 5 },
    2: { amounts: [20, 30, 40, 50, 60, 80, 100], step: 5 },
    3: { amounts: [50, 60, 80, 90, 100, 120, 150], step: 5 },
    4: { amounts: [80, 100, 120, 150, 180, 200], step: 1 },
    5: { amounts: [100, 120, 150, 180, 200, 250, 300], step: 1 },
  }[difficulty];

  const amount = randomChoice(config.amounts);
  const price = randomChoice(buildMoneyChoicesBelow(amount, config.step));
  return {
    amount,
    price,
    answer: amount - price,
  };
}

function generatePercentageProblem(difficulty) {
  const config = {
    1: { percents: [10, 50], maxWhole: 20 },
    2: { percents: [10, 25, 50, 75], maxWhole: 50 },
    3: { percents: [10, 20, 30, 40, 50, 60, 70, 80, 90], maxWhole: 100 },
    4: { percents: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95], maxWhole: 100 },
    5: { percents: buildPercentChoices(1, 99), maxWhole: 250 },
  }[difficulty];

  while (true) {
    const percent = randomChoice(config.percents);
    const divisor = 100 / greatestCommonDivisor(percent, 100);
    const maxMultiplier = Math.floor(config.maxWhole / divisor);
    if (maxMultiplier < 1) {
      continue;
    }

    const whole = divisor * randomInt(1, maxMultiplier);
    const answer = (percent * whole) / 100;
    if (Number.isInteger(answer) && answer > 0) {
      return { percent, whole, answer };
    }
  }
}

function buildPercentChoices(min, max) {
  const values = [];
  for (let value = min; value <= max; value += 1) {
    values.push(value);
  }
  return values;
}

function buildWholeMeanDataset(answer, count, min, max) {
  while (true) {
    const values = [];
    let remaining = answer * count;

    for (let index = 0; index < count - 1; index += 1) {
      const remainingSlots = count - index - 1;
      const minValue = Math.max(min, remaining - max * remainingSlots);
      const maxValue = Math.min(max, remaining - min * remainingSlots);
      if (minValue > maxValue) {
        break;
      }
      const value = randomInt(minValue, maxValue);
      values.push(value);
      remaining -= value;
    }

    if (values.length !== count - 1) {
      continue;
    }

    if (remaining < min || remaining > max) {
      continue;
    }

    values.push(remaining);
    return shuffleArray(values);
  }
}

function buildMoneyChoicesBelow(amount, step) {
  const prices = [];
  for (let value = step; value < amount; value += step) {
    prices.push(value);
  }
  return prices;
}

function buildDistinctNumberList(count, min, max, minGap, disallowed = new Set()) {
  const values = [];
  let attempts = 0;

  while (values.length < count) {
    attempts += 1;
    if (attempts > 4000) {
      break;
    }

    const candidate = randomInt(min, max);
    if (disallowed.has(candidate)) {
      continue;
    }

    if (values.every((value) => Math.abs(value - candidate) >= minGap)) {
      values.push(candidate);
    }
  }

  if (values.length === count) {
    return values;
  }

  const fallback = [];
  for (let candidate = min; candidate <= max && fallback.length < count; candidate += 1) {
    if (disallowed.has(candidate)) {
      continue;
    }
    if (fallback.every((value) => Math.abs(value - candidate) >= Math.max(1, minGap))) {
      fallback.push(candidate);
    }
  }

  if (fallback.length === count) {
    return fallback;
  }

  return values;
}

function buildNumberOptions(answer, min = answer - 12, max = answer + 12) {
  const safeMin = Math.min(min, answer);
  const safeMax = Math.max(max, answer);
  const options = new Set([answer]);

  while (options.size < 4) {
    const candidate = randomInt(safeMin, safeMax);
    if (candidate !== answer) {
      options.add(candidate);
    }
  }

  return shuffleArray(Array.from(options));
}

function buildDecimalStringOptions(answer, digits) {
  const scale = 10 ** digits;
  const answerScaled = Math.round(answer * scale);
  const offsets = digits === 1 ? [1, 2, 4, 6, 10, 15] : [1, 2, 5, 10, 20, 25, 50];
  const options = new Set([answerScaled]);

  while (options.size < 4) {
    const candidate = answerScaled + randomChoice([-1, 1]) * randomChoice(offsets);
    if (candidate >= 0 && candidate !== answerScaled) {
      options.add(candidate);
    }
  }

  return shuffleArray(Array.from(options)).map((value) => formatDecimalNumber(value / scale, digits));
}

function buildRoundingOptions(answer, placeValue) {
  const options = new Set([answer]);
  const multipliers = [-2, -1, 1, 2, 3];

  while (options.size < 4) {
    const candidate = answer + randomChoice(multipliers) * placeValue;
    if (candidate >= 0 && candidate !== answer) {
      options.add(candidate);
    }
  }

  return shuffleArray(Array.from(options));
}

function buildVisualNumberOptions(answer, difficulty, maxOverride = null) {
  const spread = difficulty <= 2 ? 4 : difficulty <= 4 ? 7 : 10;
  const min = Math.max(0, answer - spread);
  const max = Math.max(answer + spread, maxOverride ?? answer + spread);
  return buildNumberOptions(answer, min, max).map(String);
}

function buildHebrewOptions(correctAnswer) {
  const distractorPool = shuffleArray(
    Array.from(new Set(hebrewMeanings.filter((meaning) => meaning !== correctAnswer)))
  );
  return shuffleArray([correctAnswer, ...distractorPool.slice(0, 3)]);
}

function buildTimeOptions(correctMinutes) {
  const offsets = [-90, -60, -45, -30, -20, -15, -10, -5, 5, 10, 15, 20, 30, 45, 60, 75, 90];
  const options = new Set([correctMinutes]);

  while (options.size < 4) {
    options.add(correctMinutes + randomChoice(offsets));
  }

  return shuffleArray(Array.from(options));
}

function formatClockTime(totalMinutes) {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const hour24 = Math.floor(normalized / 60);
  const minute = normalized % 60;
  const suffix = hour24 >= 12 ? "PM" : "AM";
  let hour12 = hour24 % 12;
  if (hour12 === 0) {
    hour12 = 12;
  }
  return `${hour12}:${String(minute).padStart(2, "0")} ${suffix}`;
}

function formatSignedNumber(value) {
  return value < 0 ? `(${value})` : String(value);
}

function formatDecimalNumber(value, digits) {
  return Number(value).toFixed(digits);
}

function formatGroupedNumber(value) {
  return Number(value).toLocaleString("en-US");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatUnitCount(value, singular, plural = `${singular}s`) {
  return `${value} ${value === 1 ? singular : plural}`;
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function buildUniqueDigitSequence(count) {
  const digits = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, count);
  if (digits[0] !== 0) {
    return digits;
  }

  const swapIndex = digits.findIndex((digit) => digit !== 0);
  [digits[0], digits[swapIndex]] = [digits[swapIndex], digits[0]];
  return digits;
}

function greatestCommonDivisor(left, right) {
  let a = Math.abs(left);
  let b = Math.abs(right);

  while (b !== 0) {
    [a, b] = [b, a % b];
  }

  return a || 1;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function roundToNearest(value, placeValue) {
  return Math.round(value / placeValue) * placeValue;
}

function isPrime(value) {
  if (value < 2) {
    return false;
  }

  for (let factor = 2; factor * factor <= value; factor += 1) {
    if (value % factor === 0) {
      return false;
    }
  }

  return true;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice(values) {
  return values[randomInt(0, values.length - 1)];
}

function shuffleArray(values) {
  const shuffled = [...values];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(0, index);
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

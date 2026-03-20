const OPTION_LABELS = ["A", "B", "C", "D"];
const SESSION_HISTORY_STORAGE_KEY = "homework-session-history-v1";
const MAX_SAVED_SESSIONS = 10;
const CORE_SESSION_CATEGORIES = ["math", "hebrew"];
const NON_CORE_SESSION_CATEGORIES = [
  "science",
  "time",
  "statistics",
  "logic",
  "rationality",
  "general-knowledge",
  "population",
  "financial-literacy",
  "measurement",
  "charts-and-graphs",
  "calendar",
  "estimation",
  "probability",
  "maps-and-directions",
  "digital-safety",
  "media-literacy",
  "health-and-first-aid",
  "nutrition",
  "household-problem-solving",
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
  { title: "Favorite Fruits", labels: ["Apples", "Bananas", "Grapes", "Oranges"] },
  { title: "Pet Votes", labels: ["Dogs", "Cats", "Fish", "Birds"] },
  { title: "Toy Boxes", labels: ["Blocks", "Cars", "Balls", "Dolls"] },
  { title: "Snack Sales", labels: ["Crackers", "Yogurt", "Cheese", "Apples"] },
  { title: "Books Read", labels: ["Mia", "Noam", "Eli", "Tali"] },
  { title: "Sticker Colors", labels: ["Red", "Blue", "Green", "Yellow"] },
];
const CHART_TABLE_TEMPLATES = [
  { title: "Library Visits", leftLabel: "Day", rightLabel: "Visitors", labels: ["Mon", "Tue", "Wed", "Thu"] },
  { title: "Water Cups", leftLabel: "Day", rightLabel: "Cups", labels: ["Sun", "Mon", "Tue", "Wed"] },
  { title: "Tree Heights", leftLabel: "Tree", rightLabel: "Meters", labels: ["Oak", "Pine", "Palm", "Maple"] },
  { title: "Team Points", leftLabel: "Team", rightLabel: "Points", labels: ["Red", "Blue", "Green", "Yellow"] },
  { title: "Class Jobs", leftLabel: "Job", rightLabel: "Students", labels: ["Clean", "Read", "Draw", "Build"] },
  { title: "Plant Heights", leftLabel: "Plant", rightLabel: "Cm", labels: ["A", "B", "C", "D"] },
];

const HEBREW_NIKKUD_OVERRIDES = {
  "אבא": "אַבָּא",
  "אדום": "אָדוֹם",
  "אוכל": "אוֹכֶל",
  "אחות": "אָחוֹת",
  "אח": "אָח",
  "אישה": "אִשָּׁה",
  "איש": "אִישׁ",
  "אמא": "אִמָּא",
  "בית": "בַּיִת",
  "ביצה": "בֵּיצָה",
  "בוקר": "בֹּקֶר",
  "בן": "בֵּן",
  "בת": "בַּת",
  "דג": "דָּג",
  "דרך": "דֶּרֶךְ",
  "דלת": "דֶּלֶת",
  "דף": "דַּף",
  "הרים": "הָרִים",
  "וילון": "וִילוֹן",
  "זמן": "זְמַן",
  "חבר": "חָבֵר",
  "חתול": "חָתוּל",
  "ילד": "יֶלֶד",
  "ילדה": "יַלְדָּה",
  "ים": "יָם",
  "ירח": "יָרֵחַ",
  "כדור": "כַּדּוּר",
  "כלב": "כֶּלֶב",
  "כסא": "כִּסֵּא",
  "כסף": "כֶּסֶף",
  "לחם": "לֶחֶם",
  "לילה": "לַיְלָה",
  "מים": "מַיִם",
  "מלך": "מֶלֶךְ",
  "מלכה": "מַלְכָּה",
  "מיטה": "מִטָּה",
  "מכונית": "מְכוֹנִית",
  "מפתח": "מַפְתֵּחַ",
  "מראה": "מַרְאָה",
  "ספר": "סֵפֶר",
  "סלון": "סָלוֹן",
  "עוגה": "עוּגָה",
  "עוף": "עוֹף",
  "עיר": "עִיר",
  "עין": "עַיִן",
  "עכבר": "עַכְבָּר",
  "עץ": "עֵץ",
  "פנים": "פָּנִים",
  "פרח": "פֶּרַח",
  "ציפור": "צִפּוֹר",
  "קפה": "קָפֶה",
  "רגל": "רֶגֶל",
  "שולחן": "שֻׁלְחָן",
  "שלום": "שָׁלוֹם",
  "שמש": "שֶׁמֶשׁ",
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
  { category: "logic", entries: typeof LOGIC_QUESTIONS !== "undefined" ? LOGIC_QUESTIONS : [] },
  {
    category: "rationality",
    entries: typeof RATIONALITY_QUESTIONS !== "undefined" ? RATIONALITY_QUESTIONS : [],
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
    category: "media-literacy",
    entries: typeof MEDIA_LITERACY_QUESTIONS !== "undefined" ? MEDIA_LITERACY_QUESTIONS : [],
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

const mathInputGenerators = [
  createAdditionInputQuestion,
  createSubtractionInputQuestion,
  createMultiplicationInputQuestion,
  createMoneyInputQuestion,
  createPercentageInputQuestion,
];

const mathChoiceGenerators = [
  createAdditionChoiceQuestion,
  createSubtractionChoiceQuestion,
  createMultiplicationChoiceQuestion,
  createSkipCountingChoiceQuestion,
  createNumberPatternChoiceQuestion,
  createComparisonChoiceQuestion,
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
    hebrewDisplay: HEBREW_NIKKUD_OVERRIDES[entry.hebrew] || entry.hebrew,
    english: Array.from(entry.englishSet).join(" / "),
    transliteration: entry.transliteration || "",
    difficulty: entry.difficulty,
  }));

  return baseEntries;
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
    .map((entry) => {
      const difficulty = getEntryDifficulty(entry.difficulty);
      const options = Array.from(new Set((entry.options || []).map(String)));
      const answer = String(entry.answer || "");
      if (difficulty === null || !answer || options.length !== 4 || !options.includes(answer)) {
        return null;
      }

      return {
        question: String(entry.question || ""),
        options,
        answer,
        difficulty,
        type,
      };
    })
    .filter(Boolean);
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
    difficulty <= 2
      ? [
          createBarMostQuestion,
          createBarFewestQuestion,
          createBarExactQuestion,
          createTableMostQuestion,
          createTableExactQuestion,
          createBarTotalQuestion,
        ]
      : difficulty <= 4
        ? [
            createBarMostQuestion,
            createBarFewestQuestion,
            createBarExactQuestion,
            createBarTotalQuestion,
            createBarDifferenceQuestion,
            createTableMostQuestion,
            createTableExactQuestion,
            createTableTotalQuestion,
            createTableDifferenceQuestion,
          ]
        : [
            createBarExactQuestion,
            createBarTotalQuestion,
            createBarDifferenceQuestion,
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
    questionText: "Look at the graph. Which label has the most?",
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
    questionText: "Look at the graph. Which label has the fewest?",
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
    questionText: `Look at the graph. How many does ${answerItem.label} have?`,
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
    questionText: "Look at the graph. What is the total?",
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
    questionText: `Look at the graph. How many more does ${larger.label} have than ${smaller.label}?`,
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
    questionText: "Look at the table. Which row has the biggest number?",
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
    questionText: `Look at the table. What number is in the ${answerItem.label} row?`,
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
    questionText: "Look at the table. What is the total?",
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
    questionText: `Look at the table. What is ${pair[0].label} plus ${pair[1].label}?`,
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
    questionText: `Look at the table. How many more is ${pair[0].label} than ${pair[1].label}?`,
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
    summary: `${template.title}: ${items.map((item) => `${item.label} ${item.value}`).join(", ")}`,
  };
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
    questionText: `What does "${entry.hebrewDisplay}" mean?`,
    displayText: "",
    extraText: entry.transliteration ? `Sounds like: ${entry.transliteration}` : "",
    options: buildHebrewOptions(entry.english),
    answerValue: entry.english,
    answerLabel: entry.english,
    isHebrew: false,
  };
}

function createBankChoiceQuestion(entry, type) {
  return {
    type,
    difficulty: entry.difficulty,
    mode: "choice",
    questionText: entry.question,
    displayText: "",
    extraText: "",
    options: shuffleArray([...entry.options]),
    answerValue: entry.answer,
    answerLabel: entry.answer,
    isHebrew: false,
  };
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

  elements.questionExtra.textContent = question.extraText;
  elements.questionExtra.hidden = !question.extraText;

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
  if (!Number.isFinite(parsedValue) || !Number.isInteger(parsedValue)) {
    state.feedbackMessage = "Please type a whole number.";
    state.feedbackTone = "error";
    renderFeedback();
    return;
  }

  handleAnswer(question, parsedValue === question.answerValue, typedValue);
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

  if (question.questionText) {
    lines.push(question.questionText);
  }

  if (question.displayText) {
    lines.push(question.displayText);
  }

  if (question.visualSummary) {
    lines.push(question.visualSummary);
  }

  if (Array.isArray(question.options) && question.options.length) {
    question.options.forEach((option, index) => {
      const markerText = option === selectedValue ? "  [your answer]" : "";
      lines.push(`${OPTION_LABELS[index]}) ${option}${markerText}`);
    });
  } else if (selectedValue !== "") {
    lines.push(`Your answer: ${selectedValue}`);
  }

  lines.push("");
  lines.push(`Correct answer: ${question.answerLabel}`);
  return lines.join("\n");
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
  elements.feedback.textContent = state.feedbackMessage;
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

function generateNumberPattern(difficulty) {
  const arithmeticSteps = {
    1: [2, 5, 10],
    2: [3, 4, 6, -2],
    3: [4, 5, 7, 8, -3],
    4: [6, 8, 9, 12, -4],
    5: [8, 10, 12, 15, -5],
  }[difficulty];

  const multiplicativeSteps = {
    1: [],
    2: [],
    3: [2],
    4: [2, 3],
    5: [2, 3],
  }[difficulty];

  if (multiplicativeSteps.length && Math.random() < 0.35) {
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

  const step = randomChoice(arithmeticSteps);
  const start = randomInt(
    step > 0 ? 1 : Math.abs(step) * 4 + 5,
    difficulty <= 2 ? 30 : difficulty <= 4 ? 60 : 100
  );
  const sequence = [start, start + step, start + step * 2, start + step * 3];
  return {
    sequence,
    answer: start + step * 4,
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

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
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

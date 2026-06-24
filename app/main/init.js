const state = window.HomeworkApp.state.createInitialState();
const { createEmptySpeedRoundState } = window.HomeworkApp.state;

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

const elements = window.HomeworkApp.dom.getElements(document);
const sessionHistoryStore = window.HomeworkApp.sessionHistory.createSessionHistoryStore({
  adultUserId: ADULT_USER_ID,
  csvMimeType: SESSION_HISTORY_CSV_MIME_TYPE,
  getSessionPresetLabel,
  isAdultUserId,
  maxSavedSessions: MAX_SAVED_SESSIONS,
  storageKey: SESSION_HISTORY_STORAGE_KEY,
  userProfiles: USER_PROFILES,
});
const resultsReporter = window.HomeworkApp.resultsReporter.createResultsReporter({
  endpointUrl: GOOGLE_SHEETS_REPORT_WEB_APP_URL,
  queueStorageKey: GOOGLE_SHEETS_REPORT_QUEUE_STORAGE_KEY,
  reportSecret: GOOGLE_SHEETS_REPORT_SECRET,
  schemaVersion: GOOGLE_SHEETS_REPORT_SCHEMA_VERSION,
  source: GOOGLE_SHEETS_REPORT_SOURCE,
});

function cleanupInteractiveDragState() {
  if (typeof state.dragState?.cleanup === "function") {
    state.dragState.cleanup();
  }

  state.dragState = null;
}

const rawHebrewWordEntries = typeof HEBREW_WORDS !== "undefined" ? HEBREW_WORDS : [];
const rawHebrewImageWordEntries = typeof HEBREW_IMAGE_WORD_BANK !== "undefined" ? HEBREW_IMAGE_WORD_BANK : [];
const DEFAULT_HEBREW_BANKS = createHebrewBankBundle(rawHebrewWordEntries, rawHebrewImageWordEntries);
const hebrewQuestionBank = DEFAULT_HEBREW_BANKS.questionBank;
const hebrewMeanings = DEFAULT_HEBREW_BANKS.meanings;
const adultHebrewModule =
  typeof ADULT_HEBREW_MODULE !== "undefined" && ADULT_HEBREW_MODULE ? ADULT_HEBREW_MODULE : {};
const adultHebrewWordEntries = Array.isArray(adultHebrewModule.words) ? adultHebrewModule.words : [];
const MIRANDA_HEBREW_BANKS = createHebrewBankBundle(
  mergeUserHebrewWordSets(adultHebrewWordEntries, rawHebrewWordEntries),
  rawHebrewImageWordEntries
);
const adultHebrewQuestionBank = buildHebrewQuestionBank(adultHebrewWordEntries);
const adultHebrewReverseQuestionBank = buildHebrewReverseQuestionBank(adultHebrewWordEntries);
const adultHebrewMeanings = adultHebrewQuestionBank.map((entry) => entry.english);
const adultSentenceDragQuestionBank = buildStaticDragQuestionBank(
  Array.isArray(adultHebrewModule.sentenceDragQuestions) ? adultHebrewModule.sentenceDragQuestions : [],
  "hebrew-drag"
);
const adultContextQuestionBank = buildStaticChoiceBank(
  Array.isArray(adultHebrewModule.contextQuestions) ? adultHebrewModule.contextQuestions : [],
  "hebrew-choice"
);
const adultCategorySortGroups = Array.isArray(adultHebrewModule.categorySortGroups)
  ? adultHebrewModule.categorySortGroups
  : [];
const adultReadingBlueprints = Array.isArray(adultHebrewModule.readingBlueprints)
  ? adultHebrewModule.readingBlueprints
  : [];
const adultWritingPromptBank = normalizeAdultWritingPromptBank(
  Array.isArray(adultHebrewModule.writingPrompts) ? adultHebrewModule.writingPrompts : []
);
const HEBREW_POINTED_WORD_LOOKUP = (() => {
  const lookup = new Map();

  [
    ...hebrewQuestionBank,
    ...MIRANDA_HEBREW_BANKS.questionBank,
    ...adultHebrewQuestionBank,
  ].forEach((entry) => {
    const rawHebrew = String(entry?.hebrew || "").trim();
    const displayHebrew = String(entry?.hebrewDisplay || "").trim();
    const strippedHebrew = stripHebrewDiacritics(rawHebrew).trim();

    if (!hasHebrewNikkud(displayHebrew)) {
      return;
    }

    if (rawHebrew && displayHebrew && !lookup.has(rawHebrew)) {
      lookup.set(rawHebrew, displayHebrew);
    }

    if (strippedHebrew && displayHebrew && !lookup.has(strippedHebrew)) {
      lookup.set(strippedHebrew, displayHebrew);
    }
  });

  return lookup;
})();
const questionRegistry = globalThis.HomeworkQuestions || { get: () => null, list: () => [] };

function getQuestionModule(category) {
  return questionRegistry.get?.(category) || null;
}

function getRegisteredStaticQuestions(category) {
  const questionModule = getQuestionModule(category);
  const questions =
    typeof questionModule?.getStaticQuestions === "function"
      ? questionModule.getStaticQuestions()
      : [];

  return Array.isArray(questions) ? questions : [];
}

const scienceQuestionBank = buildScienceQuestionBank(getRegisteredStaticQuestions("science"));
const staticChoiceBankSources = questionRegistry
  .list()
  .filter(
    (questionModule) =>
      questionModule.id !== "science" &&
      SESSION_CATEGORY_ORDER.includes(questionModule.id) &&
      typeof questionModule.getStaticQuestions === "function"
  )
  .map((questionModule) => ({
    category: questionModule.id,
    entries: getRegisteredStaticQuestions(questionModule.id),
  }));
const staticChoiceBanks = Object.fromEntries(
  staticChoiceBankSources.map(({ category, entries }) => [
    category,
    buildStaticChoiceBank(entries, category),
  ])
);
const sentenceDragEnglishEntries =
  typeof SENTENCE_DRAG_ENGLISH_QUESTIONS !== "undefined"
    ? SENTENCE_DRAG_ENGLISH_QUESTIONS
    : typeof SENTENCE_DRAG_ENGLISH_DATA !== "undefined" && Array.isArray(SENTENCE_DRAG_ENGLISH_DATA.bank)
      ? SENTENCE_DRAG_ENGLISH_DATA.bank
    : typeof SENTENCE_DRAG_QUESTIONS !== "undefined"
      ? SENTENCE_DRAG_QUESTIONS.filter((entry) => !entry?.isHebrew)
      : [];
const sentenceDragHebrewEntries =
  typeof SENTENCE_DRAG_HEBREW_QUESTIONS !== "undefined"
    ? SENTENCE_DRAG_HEBREW_QUESTIONS
    : typeof SENTENCE_DRAG_HEBREW_DATA !== "undefined" && Array.isArray(SENTENCE_DRAG_HEBREW_DATA.bank)
      ? SENTENCE_DRAG_HEBREW_DATA.bank
    : typeof SENTENCE_DRAG_QUESTIONS !== "undefined"
      ? SENTENCE_DRAG_QUESTIONS.filter((entry) => entry?.isHebrew)
      : [];
const sentenceDragEnglishQuestionBank = buildStaticDragQuestionBank(
  sentenceDragEnglishEntries,
  "vocabulary-grammar-drag"
);
const sentenceDragHebrewQuestionBank = buildStaticDragQuestionBank(
  sentenceDragHebrewEntries,
  "hebrew-drag"
);

function getOptionalGlobalFunction(name) {
  const candidate = typeof globalThis !== "undefined" ? globalThis[name] : null;
  return typeof candidate === "function" ? candidate : null;
}

function buildCombinedGeneratedEntryFactory(primaryFactory, extensionFactory, extensionShare = 0.45) {
  if (!primaryFactory && !extensionFactory) {
    return null;
  }

  return (difficulty) => {
    const useExtensionFirst = Boolean(extensionFactory) && Math.random() < extensionShare;
    const firstFactory = useExtensionFirst ? extensionFactory : primaryFactory;
    const secondFactory = useExtensionFirst ? primaryFactory : extensionFactory;

    return firstFactory?.(difficulty) || secondFactory?.(difficulty) || null;
  };
}

function createRegisteredGeneratedEntryFactory(questionModule) {
  const primaryFactory =
    typeof questionModule?.generatedEntryFactory === "function"
      ? questionModule.generatedEntryFactory
      : null;
  const supplementalFactory =
    typeof questionModule?.supplementalGeneratedEntryFactory === "function"
      ? questionModule.supplementalGeneratedEntryFactory
      : null;

  return buildCombinedGeneratedEntryFactory(
    primaryFactory,
    supplementalFactory,
    Number.isFinite(Number(questionModule?.supplementalShare))
      ? Number(questionModule.supplementalShare)
      : 0.45
  );
}

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
        createQuestion: (entry) => createBankChoiceQuestion(entry, category + "-choice"),
      },
    ])
  ),
};
const generatedChoiceCategoryConfigs = Object.fromEntries(
  questionRegistry
    .list()
    .filter((questionModule) => SESSION_CATEGORY_ORDER.includes(questionModule.id))
    .map((questionModule) => [
      questionModule.id,
      {
        share: Number.isFinite(Number(questionModule.generatedShare))
          ? Number(questionModule.generatedShare)
          : 0.85,
        factory: createRegisteredGeneratedEntryFactory(questionModule),
      },
    ])
    .filter(([, config]) => typeof config.factory === "function")
);

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
  createNumberLineChoiceQuestion,
  createFractionBarChoiceQuestion,
  createMoneyChoiceQuestion,
  createPercentageChoiceQuestion,
];

const statisticsGeneratorsByDifficulty = {
  1: [
    createStatisticsMiddleNumberQuestion,
    createStatisticsHighestNumberQuestion,
    createStatisticsLowestNumberQuestion,
  ],
  2: [
    createStatisticsMiddleNumberQuestion,
    createStatisticsHighestNumberQuestion,
    createStatisticsLowestNumberQuestion,
  ],
  3: [
    createStatisticsMiddleNumberQuestion,
    createStatisticsHighestNumberQuestion,
    createStatisticsLowestNumberQuestion,
    createStatisticsMeanQuestion,
    createStatisticsRangeQuestion,
    createStatisticsDataQuestion,
  ],
  4: [
    createStatisticsMeanQuestion,
    createStatisticsMedianQuestion,
    createStatisticsModeQuestion,
    createStatisticsRangeQuestion,
    createStatisticsDataQuestion,
  ],
  5: [
    createStatisticsMeanQuestion,
    createStatisticsMedianQuestion,
    createStatisticsModeQuestion,
    createStatisticsRangeQuestion,
    createStatisticsDataQuestion,
  ],
  6: [
    createStatisticsMeanQuestion,
    createStatisticsMedianQuestion,
    createStatisticsModeQuestion,
    createStatisticsRangeQuestion,
    createStatisticsDataQuestion,
  ],
  7: [
    createStatisticsMeanQuestion,
    createStatisticsMedianQuestion,
    createStatisticsModeQuestion,
    createStatisticsRangeQuestion,
    createStatisticsDataQuestion,
  ],
};

elements.startForm.addEventListener("submit", startSession);
elements.answerForm.addEventListener("submit", submitTypedAnswer);
elements.answerInput.addEventListener("focus", scrollAnswerFormIntoView);
elements.answerSignButton.addEventListener("click", toggleAnswerInputSign);
elements.restartButton.addEventListener("click", showStartScreen);
elements.historyButton.addEventListener("click", showHistoryScreen);
elements.historyBackButton.addEventListener("click", showStartScreen);
elements.dashboardButton?.addEventListener("click", showDashboardScreen);
elements.dashboardBackButton?.addEventListener("click", showStartScreen);
elements.dashboardExportCsvButton?.addEventListener("click", exportSessionHistoryCsv);
elements.dashboardShareCsvButton?.addEventListener("click", shareSessionHistoryCsv);
elements.quizBackButton.addEventListener("click", showPreviousQuizQuestion);
elements.quizForwardButton.addEventListener("click", showNextQuizQuestion);
elements.resultsBackButton.addEventListener("click", showPreviousQuizQuestion);
elements.resultsForwardButton.addEventListener("click", showNextQuizQuestion);

initializeUserSelector();
initializeQuestionCountButtons();
initializeHebrewOnlyButton();
initializeSessionBuilder();
initializeDifficultyControl();
updateStartControlsForCurrentUser();
window.HomeworkApp.pwa.initializeOfflineApp(elements);
if (typeof globalThis !== "undefined") {
  globalThis.HOMEWORK_TEST_API = {
    ADULT_USER_ID,
    SESSION_CATEGORY_ORDER,
    SESSION_PRESETS,
    GOOGLE_SHEETS_REPORT_QUEUE_STORAGE_KEY,
    SPEED_ROUND_QUESTION_COUNT,
    USER_PROFILES,
    buildAdultSessionQuestions,
    buildAllSessionHistoryCsv,
    buildSessionHistoryEntry,
    buildSessionQuestions,
    buildSpeedRoundQuestions,
    createChartsAndGraphsQuestion,
    createChartsAndGraphsGeneratedChoiceQuestion,
    createSupplementalMathChoiceQuestion,
    createHebrewSupplementalSessionQuestion,
    createComparisonChoiceQuestion,
    createMathChoiceQuestion,
    createMathInputQuestion,
    createNumberPatternChoiceQuestion,
    createStatisticsChoiceQuestion,
    createTimeChoiceQuestion,
    questionRegistry,
    resultsReporter,
    state,
    validateHomeworkQuestionShape,
  };
}

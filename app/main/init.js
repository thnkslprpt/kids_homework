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
const adultHebrewWordEntries = Array.isArray(adultHebrewModule.words)
  ? adultHebrewModule.words.map((entry) => {
      const rawHebrew = String(entry?.hebrew || "").trim();
      const pointedHebrew = String(adultHebrewModule.pointedWords?.[rawHebrew] || "").trim();
      return pointedHebrew ? { ...entry, hebrew: pointedHebrew, transliteration: "" } : entry;
    })
  : [];
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

  Object.entries(adultHebrewModule.pointedWords || {}).forEach(([rawHebrew, pointedHebrew]) => {
    const source = String(rawHebrew || "").trim();
    const target = String(pointedHebrew || "").trim();
    if (source && target && !lookup.has(source)) {
      lookup.set(source, target);
    }
  });

  return lookup;
})();
const HEBREW_RUNTIME_MULTI_WORD_NIKKUD_OVERRIDES = Array.from(
  new Map([
    ...HEBREW_MULTI_WORD_NIKKUD_OVERRIDES,
    ...Object.entries(adultHebrewModule.pointedWords || {}).filter(([source]) => /\s/.test(source)),
  ]).entries()
).sort((left, right) => right[0].length - left[0].length);
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

const mathInputGeneratorsByDifficulty = {
  1: [createAdditionInputQuestion, createSubtractionInputQuestion, createMissingNumberInputQuestion],
  2: [createAdditionInputQuestion, createSubtractionInputQuestion, createMissingNumberInputQuestion, createPlaceValueInputQuestion, createMoneyInputQuestion],
  3: [createAdditionInputQuestion, createSubtractionInputQuestion, createMultiplicationInputQuestion, createDivisionInputQuestion, createMissingNumberInputQuestion, createRectangleMeasureInputQuestion],
  4: [createAdditionInputQuestion, createSubtractionInputQuestion, createMultiplicationInputQuestion, createDivisionInputQuestion, createMissingNumberInputQuestion, createPlaceValueInputQuestion, createRectangleMeasureInputQuestion],
  5: [createMultiplicationInputQuestion, createDivisionInputQuestion, createMissingNumberInputQuestion, createDecimalOperationInputQuestion, createPlaceValueInputQuestion, createRectangleMeasureInputQuestion],
  6: [createAdditionInputQuestion, createSubtractionInputQuestion, createDivisionInputQuestion, createDecimalOperationInputQuestion, createPercentageInputQuestion],
  7: [createAdditionInputQuestion, createSubtractionInputQuestion, createDivisionInputQuestion, createDecimalOperationInputQuestion, createPercentageInputQuestion],
  8: [createAdvancedMathInputQuestion],
  9: [createAdvancedMathInputQuestion],
  10: [createAdvancedMathInputQuestion],
};

const mathChoiceGeneratorsByDifficulty = {
  1: [createAdditionChoiceQuestion, createSubtractionChoiceQuestion, createMissingNumberChoiceQuestion, createComparisonChoiceQuestion, createNumberLineChoiceQuestion, createFractionBarChoiceQuestion],
  2: [createAdditionChoiceQuestion, createSubtractionChoiceQuestion, createMissingNumberChoiceQuestion, createSkipCountingChoiceQuestion, createComparisonChoiceQuestion, createPlaceValueChoiceQuestion, createMoneyChoiceQuestion, createFractionBarChoiceQuestion],
  3: [createAdditionChoiceQuestion, createSubtractionChoiceQuestion, createMultiplicationChoiceQuestion, createDivisionChoiceQuestion, createMissingNumberChoiceQuestion, createNumberPatternChoiceQuestion, createRoundingChoiceQuestion, createRectangleMeasureChoiceQuestion, createFractionBarChoiceQuestion],
  4: [createAdditionChoiceQuestion, createSubtractionChoiceQuestion, createMultiplicationChoiceQuestion, createDivisionChoiceQuestion, createMissingNumberChoiceQuestion, createDecimalComparisonChoiceQuestion, createPlaceValueChoiceQuestion, createRoundingChoiceQuestion, createRectangleMeasureChoiceQuestion, createPrimeCompositeChoiceQuestion, createFractionBarChoiceQuestion],
  5: [createMultiplicationChoiceQuestion, createDivisionChoiceQuestion, createMissingNumberChoiceQuestion, createDecimalComparisonChoiceQuestion, createDecimalOperationChoiceQuestion, createPlaceValueChoiceQuestion, createRoundingChoiceQuestion, createRectangleMeasureChoiceQuestion, createPrimeCompositeChoiceQuestion, createFractionBarChoiceQuestion],
  6: [createAdditionChoiceQuestion, createSubtractionChoiceQuestion, createDivisionChoiceQuestion, createDecimalOperationChoiceQuestion, createPrimeCompositeChoiceQuestion, createFractionBarChoiceQuestion, createPercentageChoiceQuestion],
  7: [createAdditionChoiceQuestion, createSubtractionChoiceQuestion, createDivisionChoiceQuestion, createDecimalOperationChoiceQuestion, createNumberPatternChoiceQuestion, createPercentageChoiceQuestion],
  8: [createAdvancedMathChoiceQuestion],
  9: [createAdvancedMathChoiceQuestion],
  10: [createAdvancedMathChoiceQuestion],
};

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
    createStatisticsRangeQuestion,
    createStatisticsDataQuestion,
  ],
  4: [
    createStatisticsModeQuestion,
    createStatisticsRangeQuestion,
    createStatisticsDataQuestion,
  ],
  5: [
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
  8: [
    createStatisticsAssociationQuestion,
    createStatisticsRelativeFrequencyQuestion,
    createStatisticsOutlierReasoningQuestion,
  ],
  9: [
    createStatisticsWeightedMeanQuestion,
    createStatisticsSamplingQuestion,
    createStatisticsAssociationQuestion,
    createStatisticsOutlierReasoningQuestion,
  ],
  10: [
    createStatisticsConditionalProbabilityQuestion,
    createStatisticsWeightedMeanQuestion,
    createStatisticsSamplingQuestion,
    createStatisticsAssociationQuestion,
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

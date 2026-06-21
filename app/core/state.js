(() => {
  const {
    SESSION_PRESETS,
    SPEED_ROUND_QUESTION_COUNT,
    USER_PROFILES,
    createUniformCategoryDifficulties,
  } = window.HomeworkApp.config;

function createEmptySpeedRoundState() {
  return {
    totalQuestions: SPEED_ROUND_QUESTION_COUNT,
    currentIndex: 0,
    viewIndex: 0,
    answeredCount: 0,
    correctCount: 0,
    answerResults: [],
    answerSelections: [],
    questions: [],
    records: [],
    timerId: null,
    tickId: null,
    animationFrameId: null,
    timerStartedAt: 0,
    timerDeadline: 0,
    timerToken: 0,
  };
}


  function createInitialState() {
    return {
  currentUserId: USER_PROFILES[0].id,
  dashboardUserId: USER_PROFILES[0].id,
  sessionPreset: SESSION_PRESETS.adaptive,
  categoryDifficulties: createUniformCategoryDifficulties(3),
  selectedCategories: [],
  totalQuestions: 0,
  difficulty: 3,
  hebrewOnly: false,
  currentIndex: 0,
  viewIndex: 0,
  answeredCount: 0,
  correctCount: 0,
  answerResults: [],
  answerSelections: [],
  questions: [],
  sessionRecords: [],
  currentRound: "main",
  speedRound: createEmptySpeedRoundState(),
  sessionStartedAt: null,
  feedbackMessage: "",
  feedbackTone: "",
  dragState: null,
};
  }

  window.HomeworkApp.state = {
    createEmptySpeedRoundState,
    createInitialState,
  };
})();

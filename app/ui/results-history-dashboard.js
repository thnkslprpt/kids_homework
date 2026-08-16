function completeActiveRound() {
  if (isSpeedRoundActive()) {
    void finishSession();
    return;
  }

  if (state.sessionPreset === SESSION_PRESETS.practice || !state.speedChallengeEnabled) {
    void finishSession();
    return;
  }

  startSpeedRound();
}

function startSpeedRound() {
  clearSpeedRoundTimer();
  state.currentRound = "speed";
  state.speedRound = {
    ...createEmptySpeedRoundState(),
    questions: buildSpeedRoundQuestions(),
  };
  state.speedRound.totalQuestions = state.speedRound.questions.length;
  state.feedbackMessage = "";
  state.feedbackTone = "";
  switchScreen(elements.quizScreen);
  renderCurrentQuestion();
}

function finishSession() {
  clearSpeedRoundTimer();
  state.currentRound = "results";
  renderResultsScreen({ shouldPersist: true, shouldCelebrate: true });
}

function renderResultsScreen({ shouldPersist = false, shouldCelebrate = false } = {}) {
  cleanupInteractiveDragState();
  switchScreen(elements.resultsScreen);
  const gradedTotal = state.sessionRecords.filter((record) => record?.isGraded !== false).length;
  const percentage = gradedTotal
    ? (state.correctCount / gradedTotal) * 100
    : 0;
  const roundedPercentage = Math.round(percentage);
  const currentUser = getCurrentUserProfile();
  const speedTotal = state.speedRound.totalQuestions || SPEED_ROUND_QUESTION_COUNT;
  const speedPercentage = speedTotal
    ? (state.speedRound.correctCount / speedTotal) * 100
    : 0;
  const roundedSpeedPercentage = Math.round(speedPercentage);

  elements.resultsTitle.textContent = getResultsPraise(percentage);
  const summaryNodes = [
    document.createTextNode(
      `${currentUser.name} got ${state.correctCount} out of ${gradedTotal} graded questions correct. That's ${roundedPercentage}%.`
    ),
  ];
  if (state.completedPracticeCount > 0) {
    summaryNodes.push(
      document.createElement("br"),
      document.createTextNode(
        `${state.completedPracticeCount} writing ${state.completedPracticeCount === 1 ? "activity was" : "activities were"} completed separately from the score.`
      )
    );
  }
  if (state.speedChallengeEnabled && state.sessionPreset !== SESSION_PRESETS.practice) {
    summaryNodes.push(
      document.createElement("br"),
      document.createTextNode(
        `Speed round: ${state.speedRound.correctCount}/${speedTotal}. That's ${roundedSpeedPercentage}%.`
      )
    );
  }
  elements.resultsSummary.replaceChildren(...summaryNodes);
  renderResultsDetails();
  updateResultsNavigation();

  if (shouldPersist) {
    saveSessionHistory();
    if (typeof clearActiveSessionCheckpoint === "function") {
      clearActiveSessionCheckpoint();
    }
  }

  if (shouldCelebrate) {
    playConfetti(12000);
  }
}

function renderResultsDetails() {
  const wrongRecords = [
    ...state.sessionRecords
      .filter(Boolean)
      .filter((record) => record.isGraded !== false && record.isCorrect === false)
      .map((record) => ({ ...record, roundLabel: "Main" })),
    ...(state.speedChallengeEnabled
      ? state.speedRound.records
          .filter(Boolean)
          .filter((record) => record.isGraded !== false && record.isCorrect === false)
          .map((record) => ({ ...record, roundLabel: "Challenge" }))
      : []),
  ];
  const wrongCounts = buildWrongCategoryCounts(wrongRecords);

  if (!wrongRecords.length) {
    if (elements.resultsPracticeButton) {
      elements.resultsPracticeButton.hidden = true;
      delete elements.resultsPracticeButton.dataset.practiceCategory;
    }
    elements.resultsCategorySummary.hidden = true;
    elements.resultsReviewList.hidden = false;
    elements.resultsReviewList.innerHTML = `
      <div class="results-review-card results-review-card-clean">
        <p class="results-review-empty">No wrong answers this time.</p>
      </div>
    `;
    return;
  }

  elements.resultsCategorySummary.hidden = false;
  elements.resultsCategorySummary.innerHTML = `
    <div class="results-section-title">Categories To Review</div>
    <table class="results-category-table">
      <thead>
        <tr>
          <th>Category</th>
          <th>Wrong Answers</th>
        </tr>
      </thead>
      <tbody>
        ${wrongCounts
          .map(
            (entry) => `
              <tr>
                <th scope="row">${escapeHtml(entry.categoryLabel)}</th>
                <td>${entry.count}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;

  elements.resultsReviewList.hidden = false;
  elements.resultsReviewList.innerHTML = wrongRecords
    .map(
      (record) => `
        <article class="results-review-card">
          <p class="results-review-title">
            ${record.roundLabel} question ${record.questionNumber} · ${escapeHtml(record.categoryLabel)}
          </p>
          ${record.reviewHtml}
        </article>
      `
    )
    .join("");

  if (elements.resultsPracticeButton) {
    const practiceTarget = wrongCounts.find((entry) =>
      SESSION_CATEGORY_ORDER.includes(entry.category)
    );
    const canPractice = Boolean(practiceTarget) && !isAdultUserSelected();
    elements.resultsPracticeButton.hidden = !canPractice;
    if (canPractice) {
      elements.resultsPracticeButton.dataset.practiceCategory = practiceTarget.category;
      elements.resultsPracticeButton.textContent = `Practice ${practiceTarget.categoryLabel}`;
    }
  }
}

function showStartScreen() {
  cleanupInteractiveDragState();
  clearSpeedRoundTimer();
  switchScreen(elements.startScreen);
  clearStartMessage();
  stopConfetti();
  state.currentRound = "main";
  state.totalQuestions = 0;
  state.currentIndex = 0;
  state.viewIndex = 0;
  state.answeredCount = 0;
  state.correctCount = 0;
  state.answerResults = [];
  state.answerSelections = [];
  state.hintsUsed = [];
  state.questions = [];
  state.sessionRecords = [];
  state.selectedCategories = [];
  state.speedRound = createEmptySpeedRoundState();
  state.sessionStartedAt = null;
  state.awaitingContinue = false;
  state.completedPracticeCount = 0;
  state.questionStartedAt = 0;
  state.timingQuestionIndex = -1;
  state.feedbackMessage = "";
  state.feedbackTone = "";
  elements.resultsCategorySummary.innerHTML = "";
  elements.resultsCategorySummary.hidden = true;
  elements.resultsReviewList.innerHTML = "";
  elements.resultsReviewList.hidden = true;
  const activeCountButton = elements.questionCountButtons.find((button) =>
    button.classList.contains("active")
  );
  activeCountButton?.focus();
}

function updateStatusBar() {
  const round = getActiveRoundState();
  const records = isSpeedRoundActive() ? round.records : state.sessionRecords;
  const gradedAnswered = records.filter((record) => record?.isGraded !== false).length;
  elements.scoreText.textContent = `${round.correctCount}/${gradedAnswered}`;
  elements.scoreText.setAttribute(
    "aria-label",
    `${round.correctCount} correct out of ${gradedAnswered} graded answers`
  );
  if (elements.progressSummary) {
    const position = Math.min(round.viewIndex + 1, Math.max(1, round.totalQuestions));
    elements.progressSummary.textContent = `${isSpeedRoundActive() ? "Challenge" : "Question"} ${position} of ${round.totalQuestions}`;
  }
  renderProgressTracker();
  renderSpeedRoundTimer();
}

function renderProgressTracker() {
  const round = getActiveRoundState();
  elements.progressTracker.innerHTML = "";
  elements.progressTracker.setAttribute("aria-valuemin", "0");
  elements.progressTracker.setAttribute("aria-valuemax", String(round.totalQuestions));
  elements.progressTracker.setAttribute("aria-valuenow", String(round.answeredCount));
  elements.progressTracker.setAttribute(
    "aria-valuetext",
    `${round.answeredCount} of ${round.totalQuestions} completed`
  );

  for (let index = 0; index < round.totalQuestions; index += 1) {
    const box = document.createElement("span");
    box.className = "progress-box";
    box.setAttribute("aria-hidden", "true");

    if (round.answerResults[index] === true) {
      box.classList.add("correct");
    } else if (round.answerResults[index] === false) {
      box.classList.add("wrong");
    } else if (round.answerResults[index] === null) {
      box.classList.add("completed");
    }

    if (index === round.viewIndex) {
      box.classList.add("current");
    }

    elements.progressTracker.appendChild(box);
  }
}

function startSpeedRoundTimer() {
  const round = state.speedRound;
  if (state.speedRelaxedTimer) {
    clearSpeedRoundTimer();
    renderSpeedRoundTimer();
    return;
  }
  const token = round.timerToken + 1;
  clearSpeedRoundTimer({ keepToken: true });
  round.timerToken = token;
  round.timerStartedAt = getTimerNow();
  round.timerDeadline = round.timerStartedAt + SPEED_ROUND_MS;
  renderSpeedRoundTimer();

  round.timerId = window.setTimeout(() => {
    if (!isSpeedRoundActive() || state.speedRound.timerToken !== token) {
      return;
    }

    const question = state.speedRound.questions[state.speedRound.currentIndex];
    if (question) {
      handleAnswer(question, false, "");
    }
  }, SPEED_ROUND_MS);

  round.tickId = window.setInterval(() => {
    if (isSpeedRoundActive() && state.speedRound.timerToken === token) {
      renderSpeedRoundTimer();
      if (state.speedSoundEnabled) {
        playSpeedTick();
      }
    }
  }, 1000);

  const animate = () => {
    if (!isSpeedRoundActive() || state.speedRound.timerToken !== token) {
      return;
    }

    renderSpeedRoundTimer();
    round.animationFrameId = window.requestAnimationFrame(animate);
  };

  if (typeof window.requestAnimationFrame === "function") {
    round.animationFrameId = window.requestAnimationFrame(animate);
  }
}

function clearSpeedRoundTimer({ keepToken = false } = {}) {
  const round = state.speedRound;
  if (!round) {
    return;
  }

  if (round.timerId !== null) {
    window.clearTimeout(round.timerId);
  }
  if (round.tickId !== null) {
    window.clearInterval(round.tickId);
  }
  if (round.animationFrameId !== null && typeof window.cancelAnimationFrame === "function") {
    window.cancelAnimationFrame(round.animationFrameId);
  }

  round.timerId = null;
  round.tickId = null;
  round.animationFrameId = null;
  round.timerStartedAt = 0;
  round.timerDeadline = 0;
  if (!keepToken) {
    round.timerToken += 1;
  }
}

function renderSpeedRoundTimer() {
  if (!elements.speedTimer || !elements.speedTimerFill || !elements.speedTimerText) {
    return;
  }

  elements.speedTimer.hidden = !isSpeedRoundActive() || state.speedRelaxedTimer;
  if (!isSpeedRoundActive()) {
    return;
  }

  const remainingMs = Math.max(0, state.speedRound.timerDeadline - getTimerNow());
  const percent = state.speedRound.timerDeadline
    ? Math.max(0, Math.min(100, (remainingMs / SPEED_ROUND_MS) * 100))
    : 100;
  elements.speedTimerFill.style.width = `${percent}%`;
  elements.speedTimerText.textContent = String(Math.ceil(remainingMs / 1000) || 0);
}

function getTimerNow() {
  return typeof performance !== "undefined" && typeof performance.now === "function"
    ? performance.now()
    : Date.now();
}

function playSpeedTick() {
  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextConstructor) {
    return;
  }

  try {
    const context = playSpeedTick.context || new AudioContextConstructor();
    playSpeedTick.context = context;
    if (typeof context.resume === "function") {
      void context.resume();
    }

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "square";
    oscillator.frequency.value = 880;
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.04, context.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.06);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.07);
  } catch (error) {
    // Browsers can block audio despite a prior click; the visual timer still works.
  }
}

function updateQuizNavigation() {
  const round = getActiveRoundState();
  const lockSpeedRoundNavigation = isSpeedRoundActive();
  elements.quizBackButton.disabled = lockSpeedRoundNavigation || round.viewIndex <= 0;
  elements.quizForwardButton.disabled = lockSpeedRoundNavigation || round.viewIndex >= round.currentIndex;
  if (elements.feedbackContinueButton) {
    elements.feedbackContinueButton.hidden = !round.awaitingContinue;
    const isRoundComplete = round.currentIndex >= round.totalQuestions - 1;
    elements.feedbackContinueButton.textContent = isRoundComplete
      ? isSpeedRoundActive() || !state.speedChallengeEnabled || state.sessionPreset === SESSION_PRESETS.practice
        ? "See Results"
        : "Start Challenge"
      : "Continue";
  }
}

function updateResultsNavigation() {
  const mainRound = getMainRoundState();
  const canReviewSession = hasCompletedSession() && mainRound.totalQuestions > 0;
  elements.resultsBackButton.disabled = !canReviewSession;
  elements.resultsForwardButton.disabled = true;
}

function hasCompletedSession() {
  return state.totalQuestions > 0 && state.currentIndex >= state.totalQuestions;
}

function hasCompletedActiveRound() {
  const round = getActiveRoundState();
  return round.totalQuestions > 0 && round.currentIndex >= round.totalQuestions;
}

function isViewingResultsScreen() {
  return state.currentRound === "results";
}

function isViewingPreviousQuestion() {
  const round = getActiveRoundState();
  return round.viewIndex < round.currentIndex;
}

function getViewedSessionRecord() {
  if (!isViewingPreviousQuestion()) {
    return null;
  }

  const round = getActiveRoundState();
  return isSpeedRoundActive()
    ? round.records[round.viewIndex] || null
    : state.sessionRecords[round.viewIndex] || null;
}

function renderQuizFeedback() {
  const reviewRecord = getViewedSessionRecord();
  if (reviewRecord) {
    elements.feedback.innerHTML = `
      <div class="feedback-review-note">Reviewing a previous question. Answers are locked.</div>
      ${reviewRecord.reviewHtml}
    `;
    elements.feedback.className = "feedback-banner review";
    return;
  }

  renderFeedback();
}

function renderFeedback() {
  elements.feedback.innerHTML = state.feedbackMessage;
  elements.feedback.className = state.feedbackMessage
    ? `feedback-banner ${state.feedbackTone}`
    : "feedback-banner";
  if (elements.feedbackContinueButton) {
    elements.feedbackContinueButton.hidden = !getActiveRoundState().awaitingContinue;
  }
}

function showPreviousQuizQuestion() {
  if (isViewingResultsScreen()) {
    if (state.totalQuestions <= 0) {
      return;
    }

    state.currentRound = "main";
    state.viewIndex = state.totalQuestions - 1;
    switchScreen(elements.quizScreen);
    renderCurrentQuestion();
    return;
  }

  const round = getActiveRoundState();
  if (isSpeedRoundActive() || round.viewIndex <= 0) {
    return;
  }

  round.viewIndex -= 1;
  renderCurrentQuestion();
}

function showNextQuizQuestion() {
  if (isViewingResultsScreen()) {
    return;
  }

  const round = getActiveRoundState();
  if (isSpeedRoundActive() || round.viewIndex >= round.currentIndex) {
    return;
  }

  round.viewIndex += 1;
  renderCurrentQuestion();
}

function switchScreen(activeScreen) {
  elements.startScreen.hidden = activeScreen !== elements.startScreen;
  elements.quizScreen.hidden = activeScreen !== elements.quizScreen;
  elements.resultsScreen.hidden = activeScreen !== elements.resultsScreen;
  elements.historyScreen.hidden = activeScreen !== elements.historyScreen;
  if (elements.dashboardScreen) {
    elements.dashboardScreen.hidden = activeScreen !== elements.dashboardScreen;
  }

  const heading = activeScreen?.querySelector("h2, h1");
  if (elements.screenStatusAnnouncer) {
    elements.screenStatusAnnouncer.textContent = heading?.textContent || "Screen changed";
  }
  if (activeScreen !== elements.quizScreen && heading) {
    heading.tabIndex = -1;
    window.requestAnimationFrame?.(() => heading.focus({ preventScroll: true }));
  }
}

function initializeUiEnhancements() {
  elements.feedbackContinueButton?.addEventListener("click", continueAfterFeedback);
  elements.hintButton?.addEventListener("click", showNextHint);
  elements.pauseSessionButton?.addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("homework:pause-session"));
  });
  elements.resumeSessionButton?.addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("homework:resume-session"));
  });
  elements.discardSessionButton?.addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("homework:discard-session"));
  });

  const syncChallengeControls = () => {
    state.speedChallengeEnabled = Boolean(elements.speedChallengeEnabled?.checked);
    state.speedRelaxedTimer = Boolean(elements.speedRelaxedTimer?.checked);
    state.speedSoundEnabled = Boolean(elements.speedSoundEnabled?.checked);
    document.querySelectorAll(".challenge-dependent input").forEach((input) => {
      input.disabled = !state.speedChallengeEnabled;
    });
  };
  elements.speedChallengeEnabled?.addEventListener("change", syncChallengeControls);
  elements.speedRelaxedTimer?.addEventListener("change", syncChallengeControls);
  elements.speedSoundEnabled?.addEventListener("change", syncChallengeControls);
  syncChallengeControls();

  elements.exportHistoryButton?.addEventListener("click", exportSessionHistory);
  elements.deleteHistoryButton?.addEventListener("click", deleteCurrentUserHistory);
  elements.resultsPracticeButton?.addEventListener("click", practiceResultsWeakestTopic);
}

function practiceResultsWeakestTopic() {
  const category = String(elements.resultsPracticeButton?.dataset.practiceCategory || "");
  if (!SESSION_CATEGORY_ORDER.includes(category) || isAdultUserSelected()) {
    return;
  }

  showStartScreen();
  selectPracticeCategory(category);
  if (elements.sessionCustomization) {
    elements.sessionCustomization.open = true;
  }
  elements.practiceTopicPanel?.scrollIntoView?.({ behavior: "smooth", block: "nearest" });
  showStartMessage(`Ready for a focused 10-question ${getCategoryLabel(category)} practice.`, "success");
}

function exportSessionHistory() {
  const history = loadSessionHistory();
  if (!history.length) {
    showStartMessage("There is no history to export for this learner.", "error");
    return;
  }

  const blob = new Blob([JSON.stringify(history, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `homework-history-${state.currentUserId}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function deleteCurrentUserHistory() {
  const profile = getCurrentUserProfile();
  if (!window.confirm(`Delete all saved sessions for ${profile.name}? This cannot be undone.`)) {
    return;
  }

  const historyByUser = loadAllSessionHistory();
  historyByUser[state.currentUserId] = [];
  sessionHistoryStore.write(historyByUser);
  renderHistoryScreen();
  if (elements.screenStatusAnnouncer) {
    elements.screenStatusAnnouncer.textContent = `Saved history for ${profile.name} was deleted.`;
  }
}

function clearStartMessage() {
  elements.startFeedback.textContent = "";
  elements.startFeedback.className = "feedback";
}

function showStartMessage(message, tone) {
  elements.startFeedback.textContent = message;
  elements.startFeedback.className = `feedback ${tone}`;
}

function buildWrongCategoryCounts(records) {
  const grouped = new Map();

  records.forEach((record) => {
    const key = record.category || "unknown";
    if (!grouped.has(key)) {
      grouped.set(key, { category: key, categoryLabel: record.categoryLabel, count: 0 });
    }

    grouped.get(key).count += 1;
  });

  return Array.from(grouped.values()).sort(
    (left, right) => right.count - left.count || left.categoryLabel.localeCompare(right.categoryLabel)
  );
}

function getQuestionCategoryKey(question) {
  const explicitCategory = String(question?.category || "").trim();
  if (explicitCategory) {
    return explicitCategory;
  }

  const type = String(question?.type || "").trim();
  if (!type) {
    return "general";
  }

  return type.replace(/-(choice|input|drag)$/, "");
}

function getCategoryLabel(category) {
  const registeredLabel = getQuestionModule(category)?.label;
  if (registeredLabel) {
    return registeredLabel;
  }

  if (CATEGORY_LABELS[category]) {
    return CATEGORY_LABELS[category];
  }

  return String(category)
    .split("-")
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : ""))
    .join(" ");
}

function getSessionPresetLabel(preset) {
  return (
    {
      [SESSION_PRESETS.adaptive]: "Adaptive",
      [SESSION_PRESETS["math-heavy"]]: "Math",
      [SESSION_PRESETS.hebrew]: "Hebrew",
      [SESSION_PRESETS.practice]: "Practice",
    }[preset] || "Adaptive"
  );
}

function buildSessionRecord(questionNumber, question, selectedValue, isCorrect, selectedMeta = null) {
  const category = getQuestionCategoryKey(question);
  const isGraded = selectedMeta?.isGraded !== false && question?.mode !== "practice";
  return {
    questionNumber,
    category,
    categoryLabel: getCategoryLabel(category),
    contentId: String(question?.contentId || question?.id || ""),
    skill: String(question?.skill || ""),
    gradeMin: Number.isFinite(Number(question?.gradeMin)) ? Number(question.gradeMin) : undefined,
    gradeMax: Number.isFinite(Number(question?.gradeMax)) ? Number(question.gradeMax) : undefined,
    questionText: formatQuestionForLog(question),
    answerOptions: formatAnswerOptionsForLog(question),
    chosenAnswer: selectedValue === "" ? "(no answer)" : String(selectedValue),
    ...(Array.isArray(selectedMeta?.tokens) ? { selectedTokens: [...selectedMeta.tokens] } : {}),
    correctAnswer: isGraded ? question.answerLabel : "Parent/self review",
    isCorrect: isGraded ? Boolean(isCorrect) : null,
    isGraded,
    explanation: String(question?.explanation || question?.rationale || ""),
    source: normalizeQuestionSource(question?.source),
    reviewedAt: String(question?.reviewedAt || ""),
    hintsUsed: Number(selectedMeta?.hintsUsed) || 0,
    questionDifficulty: Number.isFinite(Number(question?.difficulty))
      ? Number(question.difficulty)
      : undefined,
    questionType: String(question?.type || ""),
    responseTimeMs: Number.isFinite(Number(selectedMeta?.responseTimeMs))
      ? Number(selectedMeta.responseTimeMs)
      : undefined,
    reviewHtml: isGraded
      ? formatQuestionReview(question, selectedValue, { isCorrect })
      : `<div class="feedback-outcome"><strong>Completed (not graded).</strong>${getQuestionExplanationHtml(
          question
        )}</div>`,
  };
}

function normalizeQuestionSource(source) {
  if (!source) {
    return "";
  }
  if (typeof source === "string") {
    return source.trim();
  }
  if (Array.isArray(source)) {
    return source.map(normalizeQuestionSource).filter(Boolean).join("; ");
  }
  if (typeof source === "object") {
    const title = String(source.title || source.name || source.organization || "").trim();
    const url = String(source.url || source.href || "").trim();
    return [title, url].filter(Boolean).join(title && url ? " — " : "");
  }
  return String(source);
}

function formatAnswerOptionsForLog(question) {
  return Array.isArray(question?.options) ? question.options.map((option) => String(option)) : [];
}

function formatQuestionForLog(question) {
  const lines = [];

  if (question.questionText) {
    lines.push(question.questionText);
  }

  if (question.displayText) {
    lines.push(question.displayText);
  }

  if (question.reviewText && question.reviewText !== question.displayText) {
    lines.push(question.reviewText);
  }

  if (
    question.visualSummary &&
    question.visualSummary !== question.displayText &&
    question.visualSummary !== question.reviewText
  ) {
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
    userId: state.currentUserId,
    userName: getCurrentUserProfile().name,
    difficulty: state.difficulty,
    categoryDifficulties: { ...state.categoryDifficulties },
    selectedCategories: Array.isArray(state.selectedCategories) ? [...state.selectedCategories] : [],
    hebrewOnly: Boolean(state.hebrewOnly),
    sessionPreset: state.sessionPreset,
    totalQuestions: state.totalQuestions,
    gradedQuestions: state.sessionRecords.filter((record) => record?.isGraded !== false).length,
    correctCount: state.correctCount,
    completedPracticeCount: state.completedPracticeCount,
    speedRoundTotalQuestions:
      !state.speedChallengeEnabled || state.sessionPreset === SESSION_PRESETS.practice
        ? undefined
        : state.speedRound.totalQuestions || SPEED_ROUND_QUESTION_COUNT,
    speedRoundCorrectCount:
      !state.speedChallengeEnabled || state.sessionPreset === SESSION_PRESETS.practice
        ? undefined
        : state.speedRound.correctCount || 0,
    speedRoundRecords:
      !state.speedChallengeEnabled || state.sessionPreset === SESSION_PRESETS.practice
        ? []
        : state.speedRound.records.filter(Boolean).map((record) => ({ ...record })),
    records: state.sessionRecords.filter(Boolean).map((record) => ({ ...record })),
  };
}

function saveSessionHistory() {
  if (!state.sessionRecords.filter(Boolean).length) {
    return false;
  }

  const sessionEntry = buildSessionHistoryEntry();
  const saved = sessionHistoryStore.addSession(state.currentUserId, sessionEntry);
  resultsReporter.reportSession(sessionEntry);
  return saved;
}

function loadAllSessionHistory() {
  return sessionHistoryStore.loadAll();
}

function loadSessionHistory() {
  return sessionHistoryStore.loadForUser(state.currentUserId);
}

function getSessionStorage() {
  return sessionHistoryStore.getStorage();
}

function showHistoryScreen() {
  renderHistoryScreen();
  switchScreen(elements.historyScreen);
}

function renderHistoryScreen() {
  const sessionHistory = loadSessionHistory();
  const currentUser = getCurrentUserProfile();
  elements.historyList.innerHTML = "";
  elements.historyEmpty.hidden = sessionHistory.length > 0;

  if (!sessionHistory.length) {
    elements.historyEmpty.textContent = `${currentUser.name} has no previous sessions yet.`;
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
  meta.textContent = formatSessionHistoryMeta(session);

  summary.appendChild(title);
  summary.appendChild(meta);
  details.appendChild(summary);

  const body = document.createElement("div");
  body.className = "history-session-body";

  (Array.isArray(session.records) ? session.records : []).forEach((record) => {
    body.appendChild(createHistoryQuestionElement(record, session.startedAt, "Main"));
  });
  (Array.isArray(session.speedRoundRecords) ? session.speedRoundRecords : []).forEach((record) => {
    body.appendChild(createHistoryQuestionElement(record, session.startedAt, "Challenge"));
  });

  details.appendChild(body);
  return details;
}

function formatSessionHistoryMeta(session) {
  const gradedQuestions = Number.isFinite(Number(session.gradedQuestions))
    ? Number(session.gradedQuestions)
    : Number(session.totalQuestions) || 0;
  const parts = [`${Number(session.correctCount) || 0}/${gradedQuestions} graded correct`];
  if (Number(session.completedPracticeCount) > 0) {
    parts.push(`${Number(session.completedPracticeCount)} activities completed`);
  }
  if (Number.isFinite(Number(session?.speedRoundTotalQuestions))) {
    parts.push(
      `Speed ${Number(session.speedRoundCorrectCount) || 0}/${Number(session.speedRoundTotalQuestions) || SPEED_ROUND_QUESTION_COUNT}`
    );
  }
  if (!isAdultUserId(session?.userId)) {
    parts.push(`Difficulty ${session.difficulty}`);
  }

  if (session?.sessionPreset && session.sessionPreset !== SESSION_PRESETS.adaptive) {
    const presetLabel = getSessionPresetLabel(session.sessionPreset);
    const focusedCategory = Array.isArray(session?.selectedCategories)
      ? session.selectedCategories[0]
      : "";
    parts.push(
      session.sessionPreset === SESSION_PRESETS.practice && focusedCategory
        ? `${presetLabel}: ${getCategoryLabel(focusedCategory)}`
        : presetLabel
    );
  }

  if (session?.hebrewOnly && session.sessionPreset !== SESSION_PRESETS.hebrew) {
    parts.push("Hebrew Only");
  }

  return parts.join(" | ");
}

function createHistoryQuestionElement(record, sessionStartedAt, roundLabel = "Main") {
  const wrapper = document.createElement("div");
  wrapper.className = "history-question";

  const title = document.createElement("p");
  title.className = "history-question-title";
  title.textContent = `${roundLabel} question ${record.questionNumber} · ${record.categoryLabel || "Question"}`;
  wrapper.appendChild(title);

  const questionText = document.createElement("p");
  questionText.className = "history-question-text";
  questionText.textContent = formatHistoryQuestionText(record.questionText, sessionStartedAt);
  wrapper.appendChild(questionText);

  const chosenAnswer = document.createElement("p");
  chosenAnswer.className = "history-answer-line";
  chosenAnswer.textContent = `Chosen answer: ${record.chosenAnswer}`;
  wrapper.appendChild(chosenAnswer);

  if (record.isGraded !== false) {
    const correctAnswer = document.createElement("p");
    correctAnswer.className = "history-answer-line";
    correctAnswer.textContent = `Correct answer: ${record.correctAnswer}`;
    wrapper.appendChild(correctAnswer);
  }

  const result = document.createElement("p");
  result.className = `history-answer-line ${record.isGraded === false ? "completed" : record.isCorrect ? "correct" : "wrong"}`;
  result.textContent = record.isGraded === false
    ? "Result: Completed (not graded)"
    : `Result: ${record.isCorrect ? "Correct" : "Wrong"}`;
  wrapper.appendChild(result);

  if (record.explanation) {
    const explanation = document.createElement("p");
    explanation.className = "history-answer-line explanation";
    explanation.textContent = `Why: ${record.explanation}`;
    wrapper.appendChild(explanation);
  }

  if (record.source) {
    const source = document.createElement("p");
    source.className = "history-answer-line source";
    source.textContent = `Source: ${record.source}`;
    wrapper.appendChild(source);
  }

  return wrapper;
}

function showDashboardScreen() {
  state.dashboardUserId = state.currentUserId;
  renderDashboardScreen();
  switchScreen(elements.dashboardScreen);
}

function renderDashboardScreen() {
  if (!elements.dashboardContent) {
    return;
  }

  renderDashboardUserSelector();

  const historyByUser = loadAllSessionHistory();
  const userId = USER_PROFILE_MAP[state.dashboardUserId] ? state.dashboardUserId : state.currentUserId;
  const profile = USER_PROFILE_MAP[userId] || getCurrentUserProfile();
  const sessions = Array.isArray(historyByUser[userId]) ? historyByUser[userId] : [];
  const stats = buildDashboardStats(sessions);

  if (!sessions.length) {
    elements.dashboardContent.innerHTML = `
      <div class="dashboard-empty">${escapeHtml(profile.name)} has no saved sessions yet.</div>
    `;
    return;
  }

  elements.dashboardContent.innerHTML = `
    <div class="dashboard-stat-grid">
      ${renderDashboardStatCard("Sessions", stats.sessionCount)}
      ${renderDashboardStatCard("Accuracy", `${stats.accuracy}%`)}
      ${renderDashboardStatCard("Questions", stats.totalQuestions)}
      ${stats.challengeQuestions ? renderDashboardStatCard("Challenge", `${stats.challengeCorrect}/${stats.challengeQuestions}`) : ""}
      ${renderDashboardStatCard("Last Session", stats.lastSessionLabel)}
    </div>
    <div class="dashboard-grid">
      <section class="dashboard-panel">
        <h3>Recent Accuracy</h3>
        ${renderSessionTrendChart(sessions)}
      </section>
      <section class="dashboard-panel">
        <h3>Weak Topics</h3>
        ${renderWeakTopicChart(stats.categoryStats)}
      </section>
    </div>
    <section class="dashboard-panel">
      <h3>Topic Detail</h3>
      ${renderCategoryStatsTable(stats.categoryStats)}
    </section>
  `;
}

function renderDashboardUserSelector() {
  if (!elements.dashboardUserSelector) {
    return;
  }

  elements.dashboardUserSelector.innerHTML = "";
  USER_PROFILES.forEach((profile) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "dashboard-user-button";
    button.textContent = profile.name;
    button.dataset.userId = profile.id;
    button.addEventListener("click", () => {
      state.dashboardUserId = profile.id;
      renderDashboardScreen();
    });
    setButtonPressedState(button, profile.id === state.dashboardUserId);
    elements.dashboardUserSelector.appendChild(button);
  });
}

function buildDashboardStats(sessions) {
  const totals = sessions.reduce(
    (accumulator, session) => {
      accumulator.correct += Number(session.correctCount) || 0;
      accumulator.questions += Number(session.gradedQuestions ?? session.totalQuestions) || 0;
      const records = [
        ...(session.records || []).map((record) => ({ record, isChallenge: false })),
        ...(session.speedRoundRecords || []).map((record) => ({ record, isChallenge: true })),
      ];
      accumulator.challengeCorrect += Number(session.speedRoundCorrectCount) || 0;
      accumulator.challengeQuestions += Number(session.speedRoundTotalQuestions) || 0;
      records.forEach(({ record, isChallenge }) => {
        if (record?.isGraded === false) {
          return;
        }
        const category = String(record?.category || "unknown");
        const skill = String(record?.skill || "").trim();
        const baseGroupingKey = skill ? `${category}:${skill}` : category;
        const groupingKey = isChallenge ? `challenge:${baseGroupingKey}` : baseGroupingKey;
        if (!accumulator.categories.has(groupingKey)) {
          accumulator.categories.set(groupingKey, {
            category: groupingKey,
            categoryLabel: `${isChallenge ? "Challenge · " : ""}${skill ? `${getCategoryLabel(category)} · ${skill}` : getCategoryLabel(category)}`,
            attempts: 0,
            correct: 0,
            wrong: 0,
          });
        }

        const entry = accumulator.categories.get(groupingKey);
        entry.attempts += 1;
        if (record.isCorrect) {
          entry.correct += 1;
        } else {
          entry.wrong += 1;
        }
      });
      return accumulator;
    },
    { correct: 0, questions: 0, challengeCorrect: 0, challengeQuestions: 0, categories: new Map() }
  );
  const lastSession = sessions[0];
  const categoryStats = Array.from(totals.categories.values())
    .map((entry) => ({
      ...entry,
      accuracy: entry.attempts ? Math.round((entry.correct / entry.attempts) * 100) : 0,
      wrongRate: entry.attempts ? entry.wrong / entry.attempts : 0,
    }))
    .sort((left, right) => right.wrongRate - left.wrongRate || right.wrong - left.wrong);

  return {
    sessionCount: sessions.length,
    totalQuestions: totals.questions,
    accuracy: totals.questions ? Math.round((totals.correct / totals.questions) * 100) : 0,
    lastSessionLabel: lastSession ? formatHistoryDate(lastSession.startedAt) : "None",
    challengeCorrect: totals.challengeCorrect,
    challengeQuestions: totals.challengeQuestions,
    categoryStats,
  };
}

function renderDashboardStatCard(label, value) {
  return `
    <div class="dashboard-stat-card">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>
  `;
}

function renderSessionTrendChart(sessions) {
  const recentSessions = sessions.slice(0, 8).reverse();
  return `
    <div class="dashboard-trend-chart">
      ${recentSessions
        .map((session) => {
          const total = Number(session.gradedQuestions ?? session.totalQuestions) || 0;
          const percentage = total ? Math.round(((Number(session.correctCount) || 0) / total) * 100) : 0;
          return `
            <div class="dashboard-trend-item">
              <span class="dashboard-trend-bar" style="height:${Math.max(8, percentage)}%"></span>
              <span class="dashboard-trend-label">${percentage}%</span>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderWeakTopicChart(categoryStats) {
  const weakTopics = categoryStats.filter((entry) => entry.wrong > 0 && entry.attempts >= 3).slice(0, 6);
  if (!weakTopics.length) {
    return `<p class="dashboard-empty small">Not enough evidence yet. A topic appears here after at least 3 graded attempts.</p>`;
  }

  return `
    <div class="dashboard-topic-bars">
      ${weakTopics
        .map((entry) => {
          const wrongPercent = Math.round(entry.wrongRate * 100);
          return `
            <div class="dashboard-topic-bar-row">
              <span>${escapeHtml(entry.categoryLabel)}</span>
              <span class="dashboard-topic-track">
                <span class="dashboard-topic-fill" style="width:${wrongPercent}%"></span>
              </span>
              <strong>${wrongPercent}%</strong>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderCategoryStatsTable(categoryStats) {
  if (!categoryStats.length) {
    return `<p class="dashboard-empty small">No topic data yet.</p>`;
  }

  return `
    <table class="dashboard-table">
      <thead>
        <tr>
          <th>Topic</th>
          <th>Attempts</th>
          <th>Correct</th>
          <th>Accuracy</th>
        </tr>
      </thead>
      <tbody>
        ${categoryStats
          .map(
            (entry) => `
              <tr>
                <th scope="row">${escapeHtml(entry.categoryLabel)}</th>
                <td>${entry.attempts}</td>
                <td>${entry.correct}</td>
                <td>${entry.accuracy}%</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function formatHistoryQuestionText(questionText, sessionStartedAt) {
  const text = typeof questionText === "string" ? questionText : "";
  const sessionTime = formatHistoryTime(sessionStartedAt);
  if (!sessionTime) {
    return text;
  }

  return text.replace(
    new RegExp(SNAPSHOT_DATE_PATTERN.source, "m"),
    `Snapshot date: $1, ${sessionTime}.`
  );
}

function formatHistoryDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Previous session";
  }

  return date.toLocaleString();
}

function formatHistoryTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
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

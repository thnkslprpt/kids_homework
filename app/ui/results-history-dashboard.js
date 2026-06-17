function completeActiveRound() {
  if (isSpeedRoundActive()) {
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
  const percentage = state.totalQuestions
    ? (state.correctCount / state.totalQuestions) * 100
    : 0;
  const roundedPercentage = Math.round(percentage);
  const currentUser = getCurrentUserProfile();
  const speedTotal = state.speedRound.totalQuestions || SPEED_ROUND_QUESTION_COUNT;
  const speedPercentage = speedTotal
    ? (state.speedRound.correctCount / speedTotal) * 100
    : 0;
  const roundedSpeedPercentage = Math.round(speedPercentage);

  elements.resultsTitle.textContent = getResultsPraise(percentage);
  elements.resultsSummary.replaceChildren(
    document.createTextNode(
      `${currentUser.name} got ${state.correctCount} out of ${state.totalQuestions} correct. That's ${roundedPercentage}%.`
    ),
    document.createElement("br"),
    document.createTextNode(
      `Speed round: ${state.speedRound.correctCount}/${speedTotal}. That's ${roundedSpeedPercentage}%.`
    )
  );
  renderResultsDetails();
  updateResultsNavigation();

  if (shouldPersist) {
    saveSessionHistory();
  }

  if (shouldCelebrate) {
    playConfetti(12000);
  }
}

function renderResultsDetails() {
  const wrongRecords = state.sessionRecords.filter(Boolean).filter((record) => !record.isCorrect);
  const wrongCounts = buildWrongCategoryCounts(wrongRecords);

  if (!wrongRecords.length) {
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
            Question ${record.questionNumber} · ${escapeHtml(record.categoryLabel)}
          </p>
          ${record.reviewHtml}
        </article>
      `
    )
    .join("");
}

function showStartScreen() {
  cleanupInteractiveDragState();
  clearSpeedRoundTimer();
  switchScreen(elements.startScreen);
  clearStartMessage();
  stopConfetti();
  state.currentRound = "main";
  state.currentIndex = 0;
  state.viewIndex = 0;
  state.answerResults = [];
  state.answerSelections = [];
  state.sessionRecords = [];
  state.speedRound = createEmptySpeedRoundState();
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
  elements.scoreText.textContent = `${round.correctCount}/${round.answeredCount}`;
  renderProgressTracker();
  renderSpeedRoundTimer();
}

function renderProgressTracker() {
  const round = getActiveRoundState();
  elements.progressTracker.innerHTML = "";

  for (let index = 0; index < round.totalQuestions; index += 1) {
    const box = document.createElement("span");
    box.className = "progress-box";

    if (round.answerResults[index] === true) {
      box.classList.add("correct");
    } else if (round.answerResults[index] === false) {
      box.classList.add("wrong");
    }

    if (index === round.viewIndex) {
      box.classList.add("current");
    }

    elements.progressTracker.appendChild(box);
  }
}

function startSpeedRoundTimer() {
  const round = state.speedRound;
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
      playSpeedTick();
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

  elements.speedTimer.hidden = !isSpeedRoundActive();
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
}

function showPreviousQuizQuestion() {
  if (isViewingResultsScreen()) {
    if (state.totalQuestions <= 0) {
      return;
    }

    state.currentRound = "main";
    state.viewIndex = state.totalQuestions - 1;
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
    }[preset] || "Adaptive"
  );
}

function buildSessionRecord(questionNumber, question, selectedValue, isCorrect, selectedMeta = null) {
  const category = getQuestionCategoryKey(question);
  return {
    questionNumber,
    category,
    categoryLabel: getCategoryLabel(category),
    questionText: formatQuestionForLog(question),
    chosenAnswer: selectedValue === "" ? "(no answer)" : String(selectedValue),
    ...(Array.isArray(selectedMeta?.tokens) ? { selectedTokens: [...selectedMeta.tokens] } : {}),
    correctAnswer: question.answerLabel,
    isCorrect,
    reviewHtml: formatQuestionReview(question, selectedValue, { isCorrect }),
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
    hebrewOnly: Boolean(state.hebrewOnly),
    sessionPreset: state.sessionPreset,
    totalQuestions: state.totalQuestions,
    correctCount: state.correctCount,
    speedRoundTotalQuestions: state.speedRound.totalQuestions || SPEED_ROUND_QUESTION_COUNT,
    speedRoundCorrectCount: state.speedRound.correctCount || 0,
    speedRoundRecords: state.speedRound.records.filter(Boolean).map((record) => ({ ...record })),
    records: state.sessionRecords.filter(Boolean).map((record) => ({ ...record })),
  };
}

function saveSessionHistory() {
  if (!state.sessionRecords.filter(Boolean).length) {
    return false;
  }

  return sessionHistoryStore.addSession(state.currentUserId, buildSessionHistoryEntry());
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

function exportSessionHistoryCsv() {
  sessionHistoryStore.exportCsv();
}

async function shareSessionHistoryCsv() {
  await sessionHistoryStore.shareCsv();
}

function buildAllSessionHistoryCsv() {
  return sessionHistoryStore.buildCsv();
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

  session.records.forEach((record) => {
    body.appendChild(createHistoryQuestionElement(record, session.startedAt));
  });

  details.appendChild(body);
  return details;
}

function formatSessionHistoryMeta(session) {
  const parts = [`${session.correctCount}/${session.totalQuestions} correct`];
  if (Number.isFinite(Number(session?.speedRoundTotalQuestions))) {
    parts.push(
      `Speed ${Number(session.speedRoundCorrectCount) || 0}/${Number(session.speedRoundTotalQuestions) || SPEED_ROUND_QUESTION_COUNT}`
    );
  }
  if (!isAdultUserId(session?.userId)) {
    parts.push(`Difficulty ${session.difficulty}`);
  }

  if (session?.sessionPreset && session.sessionPreset !== SESSION_PRESETS.adaptive) {
    parts.push(getSessionPresetLabel(session.sessionPreset));
  }

  if (session?.hebrewOnly && session.sessionPreset !== SESSION_PRESETS.hebrew) {
    parts.push("Hebrew Only");
  }

  return parts.join(" | ");
}

function createHistoryQuestionElement(record, sessionStartedAt) {
  const wrapper = document.createElement("div");
  wrapper.className = "history-question";

  const title = document.createElement("p");
  title.className = "history-question-title";
  title.textContent = `Question ${record.questionNumber} · ${record.categoryLabel || "Question"}`;
  wrapper.appendChild(title);

  const questionText = document.createElement("p");
  questionText.className = "history-question-text";
  questionText.textContent = formatHistoryQuestionText(record.questionText, sessionStartedAt);
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
      accumulator.questions += Number(session.totalQuestions) || 0;
      (session.records || []).forEach((record) => {
        const category = String(record?.category || "unknown");
        if (!accumulator.categories.has(category)) {
          accumulator.categories.set(category, {
            category,
            categoryLabel: getCategoryLabel(category),
            attempts: 0,
            correct: 0,
            wrong: 0,
          });
        }

        const entry = accumulator.categories.get(category);
        entry.attempts += 1;
        if (record.isCorrect) {
          entry.correct += 1;
        } else {
          entry.wrong += 1;
        }
      });
      return accumulator;
    },
    { correct: 0, questions: 0, categories: new Map() }
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
          const total = Number(session.totalQuestions) || 0;
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
  const weakTopics = categoryStats.filter((entry) => entry.wrong > 0).slice(0, 6);
  if (!weakTopics.length) {
    return `<p class="dashboard-empty small">No weak topics in saved sessions.</p>`;
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

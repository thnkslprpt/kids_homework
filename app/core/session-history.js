(() => {
  const HISTORY_SCHEMA_VERSION = 3;
  const MAX_HISTORY_RECORDS = 150;
  const KNOWN_SESSION_PRESETS = new Set(["adaptive", "math-heavy", "hebrew", "practice"]);

  function createSessionHistoryStore({
    adultUserId,
    maxSavedSessions,
    storageKey,
    userProfiles,
  }) {
    const profiles = Array.isArray(userProfiles)
      ? userProfiles.filter((profile) => profile && sanitizeIdentifier(profile.id, 64))
      : [];
    const profileIds = new Set(profiles.map((profile) => String(profile.id)));
    const historyLimit = clampInteger(maxSavedSessions, 1, 100, 10);

    function createEmptyHistory() {
      return Object.fromEntries(profiles.map((profile) => [profile.id, []]));
    }

    function loadAll() {
      const storage = getStorage();
      if (!storage) {
        return createEmptyHistory();
      }

      try {
        const rawValue = storage.getItem(storageKey);
        if (!rawValue) {
          return createEmptyHistory();
        }

        const parsed = JSON.parse(rawValue);
        const source = extractHistorySource(parsed);
        return normalizeHistoryByUser(source);
      } catch {
        return createEmptyHistory();
      }
    }

    function extractHistorySource(parsed) {
      if (Array.isArray(parsed)) {
        const firstProfileId = profiles[0]?.id;
        return firstProfileId ? { [firstProfileId]: parsed } : {};
      }

      if (!isPlainObject(parsed)) {
        return {};
      }

      if (parsed.schemaVersion === HISTORY_SCHEMA_VERSION && isPlainObject(parsed.users)) {
        return parsed.users;
      }

      // Versions before the per-user store used an "adult" bucket. Preserve
      // those entries when migrating to the configured adult profile ID.
      if (Array.isArray(parsed.adult) && adultUserId && !Array.isArray(parsed[adultUserId])) {
        return { ...parsed, [adultUserId]: parsed.adult };
      }

      return parsed;
    }

    function normalizeHistoryByUser(source) {
      const normalized = createEmptyHistory();
      profiles.forEach((profile) => {
        const sessions = Array.isArray(source?.[profile.id]) ? source[profile.id] : [];
        normalized[profile.id] = sessions
          .map((session) => normalizeSession(session, profile.id))
          .filter(Boolean)
          .slice(0, historyLimit);
      });
      return normalized;
    }

    function loadForUser(userId) {
      if (!profileIds.has(String(userId || ""))) {
        return [];
      }
      const historyByUser = loadAll();
      return Array.isArray(historyByUser[userId]) ? historyByUser[userId] : [];
    }

    function write(historyByUser) {
      const storage = getStorage();
      if (!storage) {
        return false;
      }

      try {
        const normalized = normalizeHistoryByUser(historyByUser);
        storage.setItem(
          storageKey,
          JSON.stringify({
            schemaVersion: HISTORY_SCHEMA_VERSION,
            users: normalized,
          })
        );
        return true;
      } catch {
        return false;
      }
    }

    function addSession(userId, sessionEntry) {
      const normalizedUserId = String(userId || "");
      if (!profileIds.has(normalizedUserId)) {
        return false;
      }

      const normalizedSession = normalizeSession(sessionEntry, normalizedUserId);
      if (!normalizedSession) {
        return false;
      }

      const historyByUser = loadAll();
      const sessionHistory = Array.isArray(historyByUser[normalizedUserId])
        ? historyByUser[normalizedUserId]
        : [];
      historyByUser[normalizedUserId] = [
        normalizedSession,
        ...sessionHistory.filter((session) => session.id !== normalizedSession.id),
      ].slice(0, historyLimit);

      return write(historyByUser);
    }

    function normalizeSession(value, expectedUserId) {
      if (!isPlainObject(value)) {
        return null;
      }

      const startedAt = normalizeDate(value.startedAt || value.id);
      if (!startedAt) {
        return null;
      }

      const records = normalizeRecords(value.records);
      const speedRoundRecords = normalizeRecords(value.speedRoundRecords);
      const totalQuestions = clampInteger(value.totalQuestions, 1, MAX_HISTORY_RECORDS, records.length);
      if (!totalQuestions) {
        return null;
      }

      const speedRoundTotalQuestions = clampInteger(
        value.speedRoundTotalQuestions,
        0,
        MAX_HISTORY_RECORDS,
        value.speedRoundTotalQuestions === undefined || value.speedRoundTotalQuestions === null
          ? undefined
          : speedRoundRecords.length
      );
      const id = sanitizeIdentifier(value.id, 128) || startedAt;
      const sessionPreset = KNOWN_SESSION_PRESETS.has(String(value.sessionPreset || ""))
        ? String(value.sessionPreset)
        : "adaptive";

      return compactObject({
        id,
        schemaVersion: HISTORY_SCHEMA_VERSION,
        startedAt,
        userId: expectedUserId,
        userName: sanitizeText(value.userName, 120) || expectedUserId,
        difficulty: clampInteger(value.difficulty, 1, 10, 1),
        categoryDifficulties: normalizeDifficultyMap(value.categoryDifficulties),
        selectedCategories: normalizeIdentifierArray(value.selectedCategories, 50),
        hebrewOnly: Boolean(value.hebrewOnly),
        sessionPreset,
        totalQuestions,
        correctCount: clampInteger(value.correctCount, 0, totalQuestions, 0),
        gradedQuestions: clampInteger(value.gradedQuestions, 0, totalQuestions, undefined),
        completedPracticeCount: clampInteger(
          value.completedPracticeCount,
          0,
          totalQuestions,
          undefined
        ),
        speedRoundTotalQuestions,
        speedRoundCorrectCount: clampInteger(
          value.speedRoundCorrectCount,
          0,
          speedRoundTotalQuestions ?? MAX_HISTORY_RECORDS,
          undefined
        ),
        speedRoundRecords,
        records,
      });
    }

    function normalizeRecords(records) {
      if (!Array.isArray(records)) {
        return [];
      }

      return records
        .slice(0, MAX_HISTORY_RECORDS)
        .map((record, index) => normalizeRecord(record, index))
        .filter(Boolean);
    }

    function normalizeRecord(record, index) {
      if (!isPlainObject(record)) {
        return null;
      }

      const isGraded = record.isGraded !== false;
      if (isGraded && typeof record.isCorrect !== "boolean") {
        return null;
      }

      return compactObject({
        contentId: sanitizeIdentifier(record.contentId, 128),
        questionId: sanitizeIdentifier(record.questionId, 128),
        skill: sanitizeIdentifier(record.skill, 128),
        skillId: sanitizeIdentifier(record.skillId, 128),
        gradeMin: clampInteger(record.gradeMin, 1, 10, undefined),
        gradeMax: clampInteger(record.gradeMax, 1, 10, undefined),
        questionNumber: clampInteger(record.questionNumber, 1, MAX_HISTORY_RECORDS, index + 1),
        category: sanitizeIdentifier(record.category, 64) || "unknown",
        categoryLabel: sanitizeText(record.categoryLabel, 120),
        questionDifficulty: clampInteger(record.questionDifficulty, 1, 10, undefined),
        questionType: sanitizeIdentifier(record.questionType, 80),
        questionText: sanitizeText(record.questionText, 10000),
        chosenAnswer: sanitizeText(record.chosenAnswer, 5000),
        correctAnswer: sanitizeText(record.correctAnswer, 5000),
        isCorrect: isGraded ? record.isCorrect : null,
        isGraded,
        hintsUsed: clampInteger(record.hintsUsed, 0, 20, undefined),
        confidence: sanitizeEnum(record.confidence, ["not-sure", "somewhat", "sure"]),
        selectedTokens: normalizeTextArray(record.selectedTokens, 30, 300),
        reviewText: sanitizeText(record.reviewText, 10000),
        explanation: sanitizeText(record.explanation, 10000),
        source: sanitizeText(record.source, 1000),
        reviewedAt: sanitizeText(record.reviewedAt, 64),
        responseTimeMs: clampInteger(record.responseTimeMs, 0, 3600000, undefined),
      });
    }

    function getStorage() {
      try {
        return window.localStorage;
      } catch {
        return null;
      }
    }

    return {
      addSession,
      getStorage,
      loadAll,
      loadForUser,
      write,
    };
  }

  function normalizeDifficultyMap(value) {
    if (!isPlainObject(value)) {
      return {};
    }

    return Object.fromEntries(
      Object.entries(value)
        .slice(0, 60)
        .map(([key, difficulty]) => [
          sanitizeIdentifier(key, 64),
          clampInteger(difficulty, 1, 10, undefined),
        ])
        .filter(([key, difficulty]) => key && difficulty !== undefined)
    );
  }

  function normalizeIdentifierArray(value, maximumItems) {
    return Array.isArray(value)
      ? value
          .slice(0, maximumItems)
          .map((entry) => sanitizeIdentifier(entry, 64))
          .filter(Boolean)
      : [];
  }

  function normalizeTextArray(value, maximumItems, maximumLength) {
    return Array.isArray(value)
      ? value
          .slice(0, maximumItems)
          .map((entry) => sanitizeText(entry, maximumLength))
          .filter(Boolean)
      : [];
  }

  function normalizeDate(value) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "" : date.toISOString();
  }

  function sanitizeIdentifier(value, maximumLength) {
    return sanitizeText(value, maximumLength).replace(/[^a-zA-Z0-9_.:@/-]/g, "");
  }

  function sanitizeText(value, maximumLength) {
    if (value === null || value === undefined) {
      return "";
    }
    return String(value)
      .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
      .slice(0, maximumLength);
  }

  function clampInteger(value, minimum, maximum, fallback) {
    const number = Number(value);
    if (!Number.isInteger(number) || number < minimum || number > maximum) {
      return fallback;
    }
    return number;
  }

  function compactObject(value) {
    return Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== undefined));
  }

  function sanitizeEnum(value, options) {
    const normalized = String(value || "").trim().toLowerCase();
    return options.includes(normalized) ? normalized : undefined;
  }

  function isPlainObject(value) {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
  }

  window.HomeworkApp.sessionHistory = {
    createSessionHistoryStore,
  };
})();

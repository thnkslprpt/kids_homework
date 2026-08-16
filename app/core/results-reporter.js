(() => {
  const MAX_REPORT_RECORDS = 120;
  const MAX_SELECTED_CATEGORIES = 50;
  const MAX_SELECTED_TOKENS = 30;
  const REPORT_ACK_TIMEOUT_MS = 8000;
  let acknowledgementSequence = 0;

  function createResultsReporter({
    endpointUrl,
    queueStorageKey,
    schemaVersion = 1,
    source = "kids_homework_app",
    maxQueuedReports = 25,
  } = {}) {
    const normalizedEndpointUrl = String(endpointUrl || "").trim();
    const storageKey = String(queueStorageKey || "").trim();
    const normalizedSource = sanitizeIdentifier(source, 64) || "kids_homework_app";
    const normalizedSchemaVersion = clampInteger(schemaVersion, 1, 100, 1);
    const queueLimit = clampInteger(maxQueuedReports, 1, 100, 25);
    let isFlushing = false;

    function reportSession(session) {
      const payload = buildPayload(session);
      if (
        !normalizedEndpointUrl ||
        !storageKey ||
        !payload.session.id ||
        !isRemoteReportingAllowed()
      ) {
        return false;
      }

      enqueuePayload(payload);
      void flushQueue();
      return true;
    }

    function buildPayload(session) {
      const payload = {
        source: normalizedSource,
        schemaVersion: normalizedSchemaVersion,
        session: sanitizeSessionForReport(session),
      };

      return payload;
    }

    function sanitizeSessionForReport(session) {
      const raw = session && typeof session === "object" ? session : {};
      const totalQuestions = clampInteger(raw.totalQuestions, 0, MAX_REPORT_RECORDS, 0);
      const speedRoundTotalQuestions = clampInteger(
        raw.speedRoundTotalQuestions,
        0,
        MAX_REPORT_RECORDS,
        undefined
      );
      const records = sanitizeRecords(raw.records);
      const speedRoundRecords = sanitizeRecords(raw.speedRoundRecords);
      const inferredGradedQuestions = records.filter((record) => record?.isGraded !== false).length;
      const inferredCompletedPractice = records.length - inferredGradedQuestions;
      const gradedQuestions = clampInteger(
        raw.gradedQuestions,
        0,
        totalQuestions,
        inferredGradedQuestions || undefined
      );
      const completedPracticeCount = clampInteger(
        raw.completedPracticeCount,
        0,
        totalQuestions,
        inferredCompletedPractice || undefined
      );

      return compactObject({
        id: sanitizeIdentifier(raw.id, 128),
        startedAt: sanitizeText(raw.startedAt, 64),
        userId: sanitizeIdentifier(raw.userId, 64),
        userName: sanitizeText(raw.userName, 120),
        difficulty: clampInteger(raw.difficulty, 1, 10, undefined),
        categoryDifficulties: sanitizeDifficultyMap(raw.categoryDifficulties),
        selectedCategories: sanitizeStringArray(
          raw.selectedCategories,
          MAX_SELECTED_CATEGORIES,
          64,
          true
        ),
        hebrewOnly: Boolean(raw.hebrewOnly),
        sessionPreset: sanitizeIdentifier(raw.sessionPreset, 64),
        totalQuestions,
        correctCount: clampInteger(raw.correctCount, 0, gradedQuestions ?? totalQuestions, 0),
        gradedQuestions,
        completedPracticeCount,
        speedRoundTotalQuestions,
        speedRoundCorrectCount: clampInteger(
          raw.speedRoundCorrectCount,
          0,
          speedRoundTotalQuestions ?? MAX_REPORT_RECORDS,
          undefined
        ),
        records,
        speedRoundRecords,
      });
    }

    function sanitizeRecords(records) {
      return Array.isArray(records)
        ? records.slice(0, MAX_REPORT_RECORDS).map(sanitizeRecordForReport).filter(Boolean)
        : [];
    }

    function sanitizeRecordForReport(record) {
      if (!record || typeof record !== "object") {
        return null;
      }

      const isGraded = record.isGraded !== false;
      const sanitizedRecord = compactObject({
        contentId: sanitizeIdentifier(record.contentId, 128),
        questionId: sanitizeIdentifier(record.questionId, 128),
        skill: sanitizeIdentifier(record.skill, 128),
        skillId: sanitizeIdentifier(record.skillId, 128),
        gradeMin: clampInteger(record.gradeMin, 1, 10, undefined),
        gradeMax: clampInteger(record.gradeMax, 1, 10, undefined),
        questionNumber: clampInteger(record.questionNumber, 1, MAX_REPORT_RECORDS, undefined),
        category: sanitizeIdentifier(record.category, 64),
        categoryLabel: sanitizeText(record.categoryLabel, 120),
        questionDifficulty: clampInteger(record.questionDifficulty, 1, 10, undefined),
        questionType: sanitizeIdentifier(record.questionType, 80),
        questionText: sanitizeText(record.questionText, 10000),
        chosenAnswer: sanitizeText(record.chosenAnswer, 5000),
        correctAnswer: sanitizeText(record.correctAnswer, 5000),
        isGraded,
        isCorrect:
          isGraded && typeof record.isCorrect === "boolean"
            ? record.isCorrect
            : isGraded
              ? undefined
              : null,
        hintsUsed: clampInteger(record.hintsUsed, 0, 20, undefined),
        confidence: sanitizeEnum(record.confidence, ["not-sure", "somewhat", "sure"]),
        selectedTokens: sanitizeStringArray(
          record.selectedTokens,
          MAX_SELECTED_TOKENS,
          300,
          false
        ),
        reviewText: sanitizeText(record.reviewText, 10000),
        explanation: sanitizeText(record.explanation, 10000),
        source: sanitizeText(record.source, 1000),
        reviewedAt: sanitizeText(record.reviewedAt, 64),
      });

      if (!sanitizedRecord.reviewText) {
        sanitizedRecord.reviewText = buildRecordReviewText(sanitizedRecord);
      }

      return sanitizedRecord;
    }

    function buildRecordReviewText(record) {
      const lines = [];
      addReviewLine(lines, "Question", record?.questionText);
      addReviewLine(lines, "Your answer", record?.chosenAnswer);
      addReviewLine(lines, "Correct answer", record?.correctAnswer);

      if (record?.isGraded === false) {
        addReviewLine(lines, "Result", "Completed (unscored)");
      } else if (typeof record?.isCorrect === "boolean") {
        addReviewLine(lines, "Result", record.isCorrect ? "Correct" : "Wrong");
      }

      if (Array.isArray(record?.selectedTokens) && record.selectedTokens.length) {
        addReviewLine(lines, "Selected tokens", record.selectedTokens.join(" | "));
      }

      return sanitizeText(lines.join("\n"), 10000);
    }

    function addReviewLine(lines, label, value) {
      const text = sanitizeText(value, 10000).trim();
      if (text) {
        lines.push(`${label}: ${text}`);
      }
    }

    async function flushQueue() {
      if (
        !normalizedEndpointUrl ||
        !storageKey ||
        isFlushing ||
        !isRemoteReportingAllowed()
      ) {
        return false;
      }

      if (typeof navigator !== "undefined" && navigator.onLine === false) {
        return false;
      }

      isFlushing = true;

      try {
        let queue = loadQueue();
        while (queue.length) {
          const payload = queue[0];
          const acknowledgement = await postPayload(payload);
          if (
            acknowledgement?.ok !== true ||
            String(acknowledgement.sessionId || "") !== String(payload.session.id)
          ) {
            throw new Error("The report receiver did not confirm this session.");
          }
          queue = loadQueue().filter((entry) => entry?.session?.id !== payload?.session?.id);
          saveQueue(queue);
        }

        return true;
      } catch (error) {
        if (typeof console !== "undefined" && typeof console.warn === "function") {
          console.warn("Could not confirm homework results with Google Sheets; the report remains queued.", error);
        }
        return false;
      } finally {
        isFlushing = false;
      }
    }

    async function postPayload(payload) {
      if (typeof fetch !== "function") {
        throw new Error("fetch is not available.");
      }

      const body = JSON.stringify(payload);
      if (body.length > 250000) {
        throw new Error("The report payload is too large to send.");
      }

      const response = await fetch(normalizedEndpointUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body,
        keepalive: body.length < 60000,
      });

      // A same-origin proxy may provide a normal readable response. The
      // deployed Apps Script response is opaque, so it is confirmed through
      // the public JSONP status endpoint below.
      if (response && response.type !== "opaque") {
        if (response.ok === false) {
          throw new Error(`The report receiver returned HTTP ${response.status || "error"}.`);
        }
        const acknowledgement = await response.json();
        return acknowledgement;
      }

      return requestAcknowledgement(payload.session.id);
    }

    function requestAcknowledgement(sessionId) {
      if (typeof document === "undefined" || !document.head) {
        return Promise.reject(new Error("A report acknowledgement cannot be checked in this environment."));
      }

      return new Promise((resolve, reject) => {
        acknowledgementSequence += 1;
        const callbackName = `__homeworkReportAck${Date.now()}_${acknowledgementSequence}`;
        const script = document.createElement("script");
        const timeoutId = setTimeout(() => {
          cleanup();
          reject(new Error("Timed out waiting for the report acknowledgement."));
        }, REPORT_ACK_TIMEOUT_MS);

        function cleanup() {
          clearTimeout(timeoutId);
          script.remove();
          try {
            delete globalThis[callbackName];
          } catch {
            globalThis[callbackName] = undefined;
          }
        }

        globalThis[callbackName] = (value) => {
          cleanup();
          resolve(value && typeof value === "object" ? value : {});
        };
        script.onerror = () => {
          cleanup();
          reject(new Error("Could not load the report acknowledgement."));
        };

        const statusUrl = new URL(normalizedEndpointUrl);
        statusUrl.searchParams.set("action", "status");
        statusUrl.searchParams.set("sessionId", sessionId);
        statusUrl.searchParams.set("callback", callbackName);
        statusUrl.searchParams.set("_", String(Date.now()));
        script.src = statusUrl.toString();
        document.head.appendChild(script);
      });
    }

    function enqueuePayload(payload) {
      const sessionId = String(payload?.session?.id || "").trim();
      if (!sessionId) {
        return false;
      }

      const queue = loadQueue().filter((entry) => entry?.session?.id !== sessionId);
      queue.push(payload);
      saveQueue(queue.slice(-queueLimit));
      return true;
    }

    function loadQueue() {
      const storage = getStorage();
      if (!storage || !storageKey) {
        return [];
      }

      try {
        const parsed = JSON.parse(storage.getItem(storageKey) || "[]");
        if (!Array.isArray(parsed)) {
          return [];
        }

        return parsed
          .slice(-queueLimit)
          .map((entry) => normalizeQueuedPayload(entry))
          .filter((entry) => entry.session.id);
      } catch {
        return [];
      }
    }

    function normalizeQueuedPayload(entry) {
      const payload = {
        source: sanitizeIdentifier(entry?.source, 64) || normalizedSource,
        schemaVersion: clampInteger(entry?.schemaVersion, 1, 100, normalizedSchemaVersion),
        session: sanitizeSessionForReport(entry?.session),
      };
      return payload;
    }

    function saveQueue(queue) {
      const storage = getStorage();
      if (!storage || !storageKey) {
        return false;
      }

      try {
        storage.setItem(storageKey, JSON.stringify(Array.isArray(queue) ? queue.slice(-queueLimit) : []));
        return true;
      } catch {
        return false;
      }
    }

    function getStorage() {
      try {
        return window.localStorage;
      } catch {
        return null;
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("online", () => {
        void flushQueue();
      });
    }

    void flushQueue();

    return {
      buildPayload,
      flushQueue,
      loadQueue,
      reportSession,
    };
  }

  function sanitizeDifficultyMap(value) {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
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

  function sanitizeStringArray(value, maxItems, maxLength, identifiersOnly) {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .slice(0, maxItems)
      .map((entry) =>
        identifiersOnly ? sanitizeIdentifier(entry, maxLength) : sanitizeText(entry, maxLength)
      )
      .filter(Boolean);
  }

  function sanitizeIdentifier(value, maxLength) {
    return sanitizeText(value, maxLength).replace(/[^a-zA-Z0-9_.:@/-]/g, "");
  }

  function sanitizeText(value, maxLength) {
    if (value === null || value === undefined) {
      return "";
    }
    return String(value)
      .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
      .slice(0, maxLength);
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

  function isRemoteReportingAllowed() {
    if (globalThis.HOMEWORK_ALLOW_LOCAL_REPORTS === true) {
      return true;
    }

    try {
      const { protocol, hostname } = window.location;
      return (
        protocol === "https:" &&
        hostname !== "localhost" &&
        hostname !== "127.0.0.1" &&
        hostname !== "[::1]"
      );
    } catch {
      return false;
    }
  }

  window.HomeworkApp.resultsReporter = {
    createResultsReporter,
  };
})();

(() => {
  function createResultsReporter({
    endpointUrl,
    queueStorageKey,
    reportSecret = "",
    schemaVersion = 1,
    source = "kids_homework_app",
    maxQueuedReports = 25,
  } = {}) {
    const normalizedEndpointUrl = String(endpointUrl || "").trim();
    const storageKey = String(queueStorageKey || "").trim();
    let isFlushing = false;

    function reportSession(session) {
      const sessionId = String(session?.id || "").trim();
      if (!normalizedEndpointUrl || !storageKey || !sessionId) {
        return false;
      }

      enqueuePayload(buildPayload(session));
      void flushQueue();
      return true;
    }

    function buildPayload(session) {
      const payload = {
        source,
        schemaVersion,
        session: sanitizeSessionForReport(session),
      };

      if (reportSecret) {
        payload.reportSecret = reportSecret;
      }

      return payload;
    }

    function sanitizeSessionForReport(session) {
      const sanitizedSession = { ...(session || {}) };
      sanitizedSession.records = sanitizeRecords(session?.records);
      sanitizedSession.speedRoundRecords = sanitizeRecords(session?.speedRoundRecords);
      return sanitizedSession;
    }

    function sanitizeRecords(records) {
      return Array.isArray(records) ? records.map(sanitizeRecordForReport) : [];
    }

    function sanitizeRecordForReport(record) {
      const { reviewHtml, ...sanitizedRecord } = record || {};
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

      if (typeof record?.isCorrect === "boolean") {
        addReviewLine(lines, "Result", record.isCorrect ? "Correct" : "Wrong");
      }

      if (Array.isArray(record?.selectedTokens) && record.selectedTokens.length) {
        addReviewLine(lines, "Selected tokens", record.selectedTokens.join(" | "));
      }

      return lines.join("\n");
    }

    function addReviewLine(lines, label, value) {
      const text = String(value ?? "").trim();
      if (text) {
        lines.push(`${label}: ${text}`);
      }
    }

    async function flushQueue() {
      if (!normalizedEndpointUrl || !storageKey || isFlushing) {
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
          await postPayload(payload);
          queue = loadQueue().filter((entry) => entry?.session?.id !== payload?.session?.id);
          saveQueue(queue);
        }

        return true;
      } catch (error) {
        if (typeof console !== "undefined" && typeof console.warn === "function") {
          console.warn("Could not send homework results to Google Sheets.", error);
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
      await fetch(normalizedEndpointUrl, {
        method: "POST",
        mode: "no-cors",
        body,
        keepalive: body.length < 60000,
      });
    }

    function enqueuePayload(payload) {
      const sessionId = String(payload?.session?.id || "").trim();
      if (!sessionId) {
        return false;
      }

      const queue = loadQueue().filter((entry) => entry?.session?.id !== sessionId);
      queue.push(payload);
      saveQueue(queue.slice(-maxQueuedReports));
      return true;
    }

    function loadQueue() {
      const storage = getStorage();
      if (!storage || !storageKey) {
        return [];
      }

      try {
        const parsed = JSON.parse(storage.getItem(storageKey) || "[]");
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }

    function saveQueue(queue) {
      const storage = getStorage();
      if (!storage || !storageKey) {
        return false;
      }

      try {
        storage.setItem(storageKey, JSON.stringify(queue));
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

  window.HomeworkApp.resultsReporter = {
    createResultsReporter,
  };
})();

(() => {
  function createSessionHistoryStore({
    adultUserId,
    csvMimeType,
    getSessionPresetLabel,
    isAdultUserId,
    maxSavedSessions,
    storageKey,
    userProfiles,
  }) {
    function createEmptyHistory() {
      return Object.fromEntries(userProfiles.map((profile) => [profile.id, []]));
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
        if (Array.isArray(parsed)) {
          return Object.fromEntries(
            userProfiles.map((profile) => [profile.id, profile.id === userProfiles[0].id ? parsed : []])
          );
        }

        if (!parsed || typeof parsed !== "object") {
          return createEmptyHistory();
        }

        const legacyAdultHistory = Array.isArray(parsed.adult) ? parsed.adult : [];
        return Object.fromEntries(
          userProfiles.map((profile) => [
            profile.id,
            Array.isArray(parsed[profile.id])
              ? parsed[profile.id]
              : profile.id === adultUserId
                ? legacyAdultHistory
                : [],
          ])
        );
      } catch {
        return createEmptyHistory();
      }
    }

    function loadForUser(userId) {
      const historyByUser = loadAll();
      return Array.isArray(historyByUser[userId]) ? historyByUser[userId] : [];
    }

    function write(historyByUser) {
      const storage = getStorage();
      if (!storage) {
        return false;
      }

      try {
        storage.setItem(storageKey, JSON.stringify(historyByUser));
        return true;
      } catch {
        return false;
      }
    }

    function addSession(userId, sessionEntry) {
      const historyByUser = loadAll();
      const sessionHistory = historyByUser[userId] || [];
      sessionHistory.unshift(sessionEntry);
      sessionHistory.splice(maxSavedSessions);
      historyByUser[userId] = sessionHistory;

      return write(historyByUser);
    }

    function getStorage() {
      try {
        return window.localStorage;
      } catch {
        return null;
      }
    }

    function exportCsv() {
      downloadCsvFile(buildCsv(), getCsvFilename());
    }

    async function shareCsv() {
      const csvText = buildCsv();
      const filename = getCsvFilename();
      if (typeof File !== "function") {
        downloadCsvFile(csvText, filename);
        return;
      }

      const file = new File([getCsvFileText(csvText)], filename, { type: csvMimeType });
      const shareData = {
        files: [file],
        title: "Homework Sessions CSV",
        text: "Homework sessions CSV",
      };

      if (
        typeof navigator !== "undefined" &&
        typeof navigator.share === "function" &&
        navigator.canShare?.({ files: [file] })
      ) {
        try {
          await navigator.share(shareData);
          return;
        } catch (error) {
          if (error?.name === "AbortError") {
            return;
          }
        }
      }

      downloadCsvFile(csvText, filename);
    }

    function buildCsv() {
      const rows = [
        [
          "Student ID",
          "Student",
          "Session ID",
          "Started At",
          "Session Preset",
          "Difficulty",
          "Minimum Difficulty",
          "Hebrew Only",
          "Specialty Words Only",
          "Adaptive Review",
          "Selected Categories",
          "Total Questions",
          "Correct Count",
          "Accuracy Percent",
          "Speed Round Total",
          "Speed Round Correct",
          "Record Type",
          "Question Number",
          "Category",
          "Category Label",
          "Question Text",
          "Chosen Answer",
          "Correct Answer",
          "Is Correct",
          "Selected Tokens",
        ],
      ];
      const historyByUser = loadAll();

      userProfiles.forEach((profile) => {
        const sessions = Array.isArray(historyByUser[profile.id]) ? historyByUser[profile.id] : [];
        sessions.forEach((session) => {
          const records = [
            ...(Array.isArray(session.records)
              ? session.records.map((record) => ({ recordType: "main", record }))
              : []),
            ...(Array.isArray(session.speedRoundRecords)
              ? session.speedRoundRecords.map((record) => ({ recordType: "speed", record }))
              : []),
          ];

          if (!records.length) {
            rows.push(buildCsvRow(profile, session, null));
            return;
          }

          records.forEach((entry) => {
            rows.push(buildCsvRow(profile, session, entry));
          });
        });
      });

      return rows.map((row) => row.map(escapeCsvCell).join(",")).join("\r\n") + "\r\n";
    }

    function buildCsvRow(profile, session, entry) {
      const record = entry?.record || {};
      const totalQuestions = Number(session?.totalQuestions) || 0;
      const correctCount = Number(session?.correctCount) || 0;
      const accuracyPercent = totalQuestions ? Math.round((correctCount / totalQuestions) * 100) : "";
      const selectedCategories = Array.isArray(session?.selectedCategories)
        ? session.selectedCategories.join("|")
        : "";
      const selectedTokens = Array.isArray(record?.selectedTokens) ? record.selectedTokens.join("|") : "";

      return [
        profile.id,
        session?.userName || profile.name,
        session?.id || "",
        session?.startedAt || "",
        getSessionPresetLabel(session?.sessionPreset),
        isAdultUserId(profile.id) ? "" : session?.difficulty || "",
        isAdultUserId(profile.id) ? "" : session?.minDifficulty || "",
        Boolean(session?.hebrewOnly),
        Boolean(session?.specialtyWordsOnly),
        Boolean(session?.adaptiveReview),
        selectedCategories,
        totalQuestions,
        correctCount,
        accuracyPercent,
        Number.isFinite(Number(session?.speedRoundTotalQuestions)) ? Number(session.speedRoundTotalQuestions) : "",
        Number.isFinite(Number(session?.speedRoundCorrectCount)) ? Number(session.speedRoundCorrectCount) : "",
        entry?.recordType || "",
        record?.questionNumber || "",
        record?.category || "",
        record?.categoryLabel || "",
        record?.questionText || "",
        record?.chosenAnswer || "",
        record?.correctAnswer || "",
        typeof record?.isCorrect === "boolean" ? record.isCorrect : "",
        selectedTokens,
      ];
    }

    function getCsvFilename() {
      return `homework-sessions-${new Date().toISOString().slice(0, 10)}.csv`;
    }

    function downloadCsvFile(csvText, filename) {
      const blob = new Blob([getCsvFileText(csvText)], { type: csvMimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 0);
    }

    function getCsvFileText(csvText) {
      return `\ufeff${csvText}`;
    }

    function escapeCsvCell(value) {
      if (value === null || value === undefined) {
        return "";
      }

      const text = String(value);
      return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
    }

    return {
      addSession,
      buildCsv,
      exportCsv,
      getStorage,
      loadAll,
      loadForUser,
      shareCsv,
      write,
    };
  }

  window.HomeworkApp.sessionHistory = {
    createSessionHistoryStore,
  };
})();

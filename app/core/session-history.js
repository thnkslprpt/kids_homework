(() => {
  function createSessionHistoryStore({
    adultUserId,
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

    return {
      addSession,
      getStorage,
      loadAll,
      loadForUser,
      write,
    };
  }

  window.HomeworkApp.sessionHistory = {
    createSessionHistoryStore,
  };
})();

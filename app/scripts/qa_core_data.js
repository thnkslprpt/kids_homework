#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const repoRoot = path.resolve(__dirname, "../..");
const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function createStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      values.set(key, String(value));
    },
    removeItem(key) {
      values.delete(key);
    },
  };
}

function loadBrowserCoreContext(initialStorage = {}) {
  const storage = createStorage(initialStorage);
  const window = {
    HomeworkApp: {},
    localStorage: storage,
    location: { protocol: "https:", hostname: "example.test" },
    addEventListener() {},
  };
  const context = vm.createContext({
    console,
    window,
    globalThis: null,
    navigator: { onLine: true },
    document: { head: null },
    URL,
    setTimeout,
    clearTimeout,
  });
  context.globalThis = context;
  [
    "app/core/scoring.js",
    "app/core/session-history.js",
    "app/core/results-reporter.js",
  ].forEach((source) => {
    vm.runInContext(fs.readFileSync(path.join(repoRoot, source), "utf8"), context, {
      filename: source,
    });
  });
  return { context, storage, window };
}

function testNumericParsing(context) {
  const candidates = (value) =>
    Array.from(context.window.HomeworkApp.scoring.buildNumericAnswerCandidates(value, {}));

  assert(candidates("0x10").length === 0, "numeric parser must reject hexadecimal notation");
  assert(candidates("0b10").length === 0, "numeric parser must reject binary notation");
  assert(candidates("1e3").length === 0, "numeric parser must reject exponent notation");
  assert(JSON.stringify(candidates("1.000")) === "[1]", "1.000 must have one unambiguous value");
  assert(candidates("1,000").includes(1000), "US thousands grouping should be accepted");
  assert(candidates("1.234,5").includes(1234.5), "European grouped decimal should be accepted");
  assert(candidates("1.234.567").includes(1234567), "European multi-group integer should be accepted");
  assert(JSON.stringify(candidates("(5)")) === "[-5]", "accounting parentheses should mean negative");
  assert(candidates("1/2").includes(0.5), "simple fractions should be accepted as numeric answers");
  assert(candidates("2 1/4").includes(2.25), "mixed numbers should be accepted as numeric answers");
  assert(candidates("-1 1/2").includes(-1.5), "negative mixed numbers should apply the sign to the whole value");
  assert(candidates("1/0").length === 0, "fractions with a zero denominator must be rejected");
}

function testHistoryMigration() {
  const profiles = [{ id: "guest" }, { id: "adult" }];
  const legacySession = {
    id: "2026-08-12T10:00:00.000Z",
    startedAt: "2026-08-12T10:00:00.000Z",
    userId: "guest",
    userName: "Guest",
    difficulty: 3,
    totalQuestions: 2,
    correctCount: 1,
    records: [
      { questionNumber: 1, isCorrect: true, category: "math", questionText: "1 + 1" },
      { questionNumber: 2, isGraded: false, isCorrect: null, category: "writing" },
      null,
    ],
  };
  const { context, storage } = loadBrowserCoreContext({
    history: JSON.stringify({ guest: [legacySession], adult: "corrupt" }),
  });
  const store = context.window.HomeworkApp.sessionHistory.createSessionHistoryStore({
    adultUserId: "adult",
    maxSavedSessions: 10,
    storageKey: "history",
    userProfiles: profiles,
  });
  const loaded = store.loadAll();
  assert(loaded.guest.length === 1, "valid legacy history session should migrate");
  assert(loaded.guest[0].records.length === 2, "malformed history records should be discarded");
  assert(loaded.guest[0].records[1].isGraded === false, "ungraded history records should survive");
  assert(loaded.adult.length === 0, "malformed user history should become an empty list");
  assert(store.write(loaded), "normalized history should be writable");
  const persisted = JSON.parse(storage.getItem("history"));
  assert(persisted.schemaVersion === 3, "history writes should use the current schema envelope");
}

function testReportSanitizing(context) {
  const reporter = context.window.HomeworkApp.resultsReporter.createResultsReporter({
    endpointUrl: "https://example.test/report",
    queueStorageKey: "reports",
    source: "kids_homework_app",
    schemaVersion: 1,
  });
  const payload = reporter.buildPayload({
    id: "2026-08-12T10:00:00.000Z",
    startedAt: "2026-08-12T10:00:00.000Z",
    userId: "guest",
    userName: "=unsafe",
    difficulty: 3,
    totalQuestions: 1,
    correctCount: 0,
    gradedQuestions: 0,
    completedPracticeCount: 1,
    records: [{
      contentId: "writing.prompt-1",
      skill: "writing.reflect",
      isGraded: false,
      isCorrect: null,
      questionNumber: 1,
      category: "writing",
      questionText: "Write one sentence.",
      confidence: "somewhat",
      hintsUsed: 2,
      reviewHtml: "<b>must not be sent</b>",
      unknown: "must not be sent",
    }],
  });
  const serialized = JSON.stringify(payload);
  assert(!serialized.includes("reviewHtml"), "reports must strip review HTML");
  assert(!serialized.includes("unknown"), "reports must use an allowlisted schema");
  assert(payload.session.records[0].isCorrect === null, "ungraded report result should remain null");
  assert(payload.session.records[0].skill === "writing.reflect", "content skill metadata should survive");
  assert(payload.session.records[0].confidence === "somewhat", "confidence should survive report sanitizing");
  assert(
    payload.session.speedRoundTotalQuestions === undefined &&
      payload.session.speedRoundCorrectCount === undefined,
    "a session without a challenge must not report a synthetic 0/5 challenge score"
  );
}

function testAppsScriptValidation() {
  const source = fs.readFileSync(path.join(repoRoot, "app/scripts/google_sheets_apps_script.gs"), "utf8");
  const context = vm.createContext({ console });
  vm.runInContext(source, context, { filename: "google_sheets_apps_script.gs" });
  const literal = vm.runInContext("cellText_('=SUM(1,2)', 100)", context);
  assert(literal === "'=SUM(1,2)", "Sheets text must neutralize formula prefixes");
  const normalized = vm.runInContext(`validateAndNormalizePayload_(${JSON.stringify({
    source: "kids_homework_app",
    schemaVersion: 1,
    session: {
      id: "2026-08-12T10:00:00.000Z",
      startedAt: "2026-08-12T10:00:00.000Z",
      userId: "guest",
      userName: "Guest",
      difficulty: 3,
      sessionPreset: "adaptive",
      totalQuestions: 1,
      correctCount: 0,
      gradedQuestions: 0,
      completedPracticeCount: 1,
      records: [{ isGraded: false, isCorrect: null, confidence: "sure" }],
      speedRoundRecords: [],
    },
  })})`, context);
  assert(normalized.session.records[0].isCorrect === null, "receiver should accept ungraded null results");
  assert(normalized.session.records[0].confidence === "sure", "receiver should preserve confidence");
}

function run() {
  const { context } = loadBrowserCoreContext();
  testNumericParsing(context);
  testHistoryMigration();
  testReportSanitizing(context);
  testAppsScriptValidation();

  if (failures.length) {
    console.error(`${failures.length} core-data QA failure(s):`);
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exitCode = 1;
    return;
  }
  console.log("Core scoring, history, and reporting QA passed.");
}

run();

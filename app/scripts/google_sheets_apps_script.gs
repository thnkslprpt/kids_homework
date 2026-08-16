const SPREADSHEET_ID_PROPERTY = "HOMEWORK_SPREADSHEET_ID";
const EMAIL_RECIPIENTS_PROPERTY = "HOMEWORK_EMAIL_RECIPIENTS";
const SPEED_ROUND_QUESTION_COUNT = 5;
const SESSION_COMPLETE_EMAIL_SUBJECT_PREFIX = "[Homework Alert]";
const ALLOWED_REPORT_SOURCES = ["kids_homework_app"];
const SUPPORTED_REPORT_SCHEMA_VERSIONS = [1];
const MAX_REPORT_BODY_LENGTH = 250000;
const MAX_REPORT_RECORDS = 120;
const MAX_SELECTED_CATEGORIES = 50;
const SESSION_PRESETS = ["adaptive", "math-heavy", "hebrew", "practice"];

const SESSION_HEADERS = [
  "Date",
  "Time",
  "Name",
  "Difficulty",
  "Questions",
  "Correct",
  "Accuracy",
  "Speed Round"
];

const QUESTION_HEADERS = [
  "Received At",
  "Session ID",
  "Started At",
  "Student ID",
  "Student Name",
  "Record Type",
  "Question Number",
  "Category",
  "Category Label",
  "Question Level",
  "Question Type",
  "Question Text",
  "Chosen Answer",
  "Correct Answer",
  "Result",
  "Selected Tokens",
  "Review Text",
  "Content ID",
  "Skill",
  "Grade Min",
  "Grade Max",
  "Explanation",
  "Source",
  "Reviewed At",
  "Hints Used",
  "Confidence"
];

function setup() {
  const spreadsheet = openHomeworkSpreadsheet_();

  ensureSheet_(spreadsheet, "Sessions", SESSION_HEADERS, { applyDefaultColumnWidths: true });
  ensureSheet_(spreadsheet, "QuestionResults", QUESTION_HEADERS);
  removeSheetIfExists_(spreadsheet, "CategorySummary");
}

function doGet(e) {
  const parameters = e && e.parameter ? e.parameter : {};
  if (parameters.action === "status") {
    return reportStatusResponse_(parameters.sessionId, parameters.callback);
  }

  return json_({
    ok: true,
    message: "Homework results receiver is running."
  });
}

function doPost(e) {
  const receivedAt = new Date();
  let payload;
  try {
    payload = parsePayload_(e);
    payload = validateAndNormalizePayload_(payload);
  } catch (error) {
    return json_({
      ok: false,
      error: "Invalid report payload.",
      details: String(error && error.message ? error.message : error)
    });
  }

  const session = payload.session;

  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(15000);

    const spreadsheet = openHomeworkSpreadsheet_();
    const sessionsSheet = ensureSheet_(spreadsheet, "Sessions", SESSION_HEADERS);
    const questionsSheet = ensureSheet_(spreadsheet, "QuestionResults", QUESTION_HEADERS);

    const existingSession = getSessionRowState_(sessionsSheet, session.id);
    if (existingSession.status === "complete") {
      return json_({
        ok: true,
        duplicate: true,
        sessionId: session.id
      });
    }

    const records = getRecords_(session);
    const questionRows = records
      .filter((record) => record && (record.isGraded === false || record.isCorrect === false))
      .map((record) => buildQuestionRow_(receivedAt, session, record));

    // A retry first removes any partial detail write, then reuses the summary
    // row marked "processing". The final note is written last and acts as the
    // commit marker checked by both retries and the browser acknowledgement.
    deleteQuestionRowsForSession_(questionsSheet, session.id);

    const sessionValues = [buildSessionRow_(receivedAt, session)];
    const sessionRow = existingSession.row || appendRows_(sessionsSheet, sessionValues);
    if (existingSession.row) {
      sessionsSheet
        .getRange(existingSession.row, 1, 1, SESSION_HEADERS.length)
        .setValues(sessionValues);
    }
    setSessionIdNote_(sessionsSheet, sessionRow, session.id, "processing", 0);
    appendRows_(questionsSheet, questionRows);
    setSessionIdNote_(sessionsSheet, sessionRow, session.id, "complete", questionRows.length);
    formatSessionRows_(sessionsSheet, sessionRow, 1);
    notifySessionComplete_(session);

    return json_({
      ok: true,
      sessionId: session.id,
      questionRows: questionRows.length
    });
  } catch (error) {
    return json_({
      ok: false,
      error: String(error && error.message ? error.message : error)
    });
  } finally {
    try {
      lock.releaseLock();
    } catch (error) {
      // Ignore lock release errors.
    }
  }
}

function parsePayload_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error("Missing postData.contents.");
  }

  if (e.postData.contents.length > MAX_REPORT_BODY_LENGTH) {
    throw new Error("The report is too large.");
  }

  return JSON.parse(e.postData.contents);
}

function validateAndNormalizePayload_(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error("The payload must be an object.");
  }

  const source = identifier_(payload.source, "source", 64);
  if (!ALLOWED_REPORT_SOURCES.includes(source)) {
    throw new Error("Unknown report source.");
  }

  const schemaVersion = integer_(payload.schemaVersion, "schemaVersion", 1, 100);
  if (!SUPPORTED_REPORT_SCHEMA_VERSIONS.includes(schemaVersion)) {
    throw new Error("Unsupported report schema version.");
  }

  if (!payload.session || typeof payload.session !== "object" || Array.isArray(payload.session)) {
    throw new Error("Missing session object.");
  }

  const normalized = {
    source,
    schemaVersion,
    session: normalizeSession_(payload.session)
  };
  return normalized;
}

function normalizeSession_(session) {
  const id = identifier_(session.id, "session.id", 128);
  const totalQuestions = integer_(session.totalQuestions, "session.totalQuestions", 1, MAX_REPORT_RECORDS);
  const correctCount = integer_(session.correctCount, "session.correctCount", 0, totalQuestions);
  const records = normalizeRecords_(session.records, "session.records");
  const speedRoundRecords = normalizeRecords_(session.speedRoundRecords, "session.speedRoundRecords");
  const startedAt = boundedText_(session.startedAt, "session.startedAt", 64, false);
  if (Number.isNaN(new Date(startedAt).getTime())) {
    throw new Error("session.startedAt must be a valid date.");
  }

  const sessionPreset = identifier_(session.sessionPreset || "adaptive", "session.sessionPreset", 64);
  if (!SESSION_PRESETS.includes(sessionPreset)) {
    throw new Error("Unknown session preset.");
  }

  const speedRoundTotalQuestions = optionalInteger_(
    session.speedRoundTotalQuestions,
    "session.speedRoundTotalQuestions",
    0,
    MAX_REPORT_RECORDS,
    ""
  );
  const speedRoundCorrectCount = optionalInteger_(
    session.speedRoundCorrectCount,
    "session.speedRoundCorrectCount",
    0,
    speedRoundTotalQuestions === "" ? MAX_REPORT_RECORDS : speedRoundTotalQuestions,
    ""
  );
  const gradedQuestions = optionalInteger_(
    session.gradedQuestions,
    "session.gradedQuestions",
    0,
    totalQuestions,
    ""
  );
  const completedPracticeCount = optionalInteger_(
    session.completedPracticeCount,
    "session.completedPracticeCount",
    0,
    totalQuestions,
    ""
  );

  if (gradedQuestions !== "" && correctCount > gradedQuestions) {
    throw new Error("session.correctCount cannot exceed session.gradedQuestions.");
  }
  if (
    gradedQuestions !== "" &&
    completedPracticeCount !== "" &&
    gradedQuestions + completedPracticeCount > totalQuestions
  ) {
    throw new Error("Graded and completed-practice counts cannot exceed total questions.");
  }
  if (records.length > totalQuestions) {
    throw new Error("session.records cannot exceed session.totalQuestions.");
  }
  if (
    (speedRoundTotalQuestions === "" && speedRoundRecords.length) ||
    (speedRoundTotalQuestions !== "" && speedRoundRecords.length > speedRoundTotalQuestions)
  ) {
    throw new Error("Speed-round records do not match the declared speed-round total.");
  }

  return {
    id,
    startedAt,
    userId: identifier_(session.userId || "guest", "session.userId", 64),
    userName: boundedText_(session.userName || "Student", "session.userName", 120, false),
    difficulty: integer_(session.difficulty, "session.difficulty", 1, 10),
    categoryDifficulties: normalizeDifficultyMap_(session.categoryDifficulties),
    selectedCategories: normalizeIdentifierArray_(
      session.selectedCategories,
      "session.selectedCategories",
      MAX_SELECTED_CATEGORIES
    ),
    hebrewOnly: session.hebrewOnly === true,
    sessionPreset,
    totalQuestions,
    correctCount,
    gradedQuestions,
    completedPracticeCount,
    speedRoundTotalQuestions,
    speedRoundCorrectCount,
    records,
    speedRoundRecords
  };
}

function normalizeRecords_(records, label) {
  if (records === undefined || records === null) {
    return [];
  }
  if (!Array.isArray(records) || records.length > MAX_REPORT_RECORDS) {
    throw new Error(`${label} must contain at most ${MAX_REPORT_RECORDS} records.`);
  }

  return records.map((record, index) => normalizeRecord_(record, `${label}[${index}]`));
}

function normalizeRecord_(record, label) {
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    throw new Error(`${label} must be an object.`);
  }
  const isGraded = record.isGraded !== false;
  if (isGraded && typeof record.isCorrect !== "boolean") {
    throw new Error(`${label}.isCorrect must be a boolean.`);
  }

  const selectedTokens = record.selectedTokens === undefined
    ? []
    : normalizeTextArray_(record.selectedTokens, `${label}.selectedTokens`, 30, 300);

  return {
    contentId: optionalIdentifier_(record.contentId, `${label}.contentId`, 128),
    questionId: optionalIdentifier_(record.questionId, `${label}.questionId`, 128),
    skill: optionalIdentifier_(record.skill, `${label}.skill`, 128),
    skillId: optionalIdentifier_(record.skillId, `${label}.skillId`, 128),
    gradeMin: optionalInteger_(record.gradeMin, `${label}.gradeMin`, 1, 10, ""),
    gradeMax: optionalInteger_(record.gradeMax, `${label}.gradeMax`, 1, 10, ""),
    questionNumber: optionalInteger_(record.questionNumber, `${label}.questionNumber`, 1, MAX_REPORT_RECORDS, ""),
    category: optionalIdentifier_(record.category, `${label}.category`, 64),
    categoryLabel: boundedText_(record.categoryLabel || "", `${label}.categoryLabel`, 120, true),
    questionDifficulty: optionalInteger_(record.questionDifficulty, `${label}.questionDifficulty`, 1, 10, ""),
    questionType: optionalIdentifier_(record.questionType, `${label}.questionType`, 80),
    questionText: boundedText_(record.questionText || "", `${label}.questionText`, 10000, true),
    chosenAnswer: boundedText_(record.chosenAnswer || "", `${label}.chosenAnswer`, 5000, true),
    correctAnswer: boundedText_(record.correctAnswer || "", `${label}.correctAnswer`, 5000, true),
    isGraded,
    isCorrect: isGraded ? record.isCorrect : null,
    hintsUsed: optionalInteger_(record.hintsUsed, `${label}.hintsUsed`, 0, 20, ""),
    confidence: optionalEnum_(record.confidence, `${label}.confidence`, ["not-sure", "somewhat", "sure"]),
    selectedTokens,
    reviewText: boundedText_(record.reviewText || "", `${label}.reviewText`, 10000, true),
    explanation: boundedText_(record.explanation || "", `${label}.explanation`, 10000, true),
    source: boundedText_(record.source || "", `${label}.source`, 1000, true),
    reviewedAt: boundedText_(record.reviewedAt || "", `${label}.reviewedAt`, 64, true)
  };
}

function normalizeDifficultyMap_(value) {
  if (value === undefined || value === null) {
    return {};
  }
  if (typeof value !== "object" || Array.isArray(value)) {
    throw new Error("session.categoryDifficulties must be an object.");
  }

  const entries = Object.entries(value);
  if (entries.length > 60) {
    throw new Error("session.categoryDifficulties has too many entries.");
  }
  return Object.fromEntries(entries.map(([key, difficulty]) => [
    identifier_(key, "category difficulty key", 64),
    integer_(difficulty, `category difficulty ${key}`, 1, 10)
  ]));
}

function normalizeIdentifierArray_(value, label, maximumItems) {
  if (value === undefined || value === null) {
    return [];
  }
  if (!Array.isArray(value) || value.length > maximumItems) {
    throw new Error(`${label} has too many entries.`);
  }
  return value.map((entry, index) => identifier_(entry, `${label}[${index}]`, 64));
}

function normalizeTextArray_(value, label, maximumItems, maximumLength) {
  if (!Array.isArray(value) || value.length > maximumItems) {
    throw new Error(`${label} has too many entries.`);
  }
  return value.map((entry, index) => boundedText_(entry, `${label}[${index}]`, maximumLength, true));
}

function identifier_(value, label, maximumLength) {
  const text = boundedText_(value, label, maximumLength, false);
  if (!/^[a-zA-Z0-9_.:@/-]+$/.test(text)) {
    throw new Error(`${label} contains unsupported characters.`);
  }
  return text;
}

function optionalIdentifier_(value, label, maximumLength) {
  return value === undefined || value === null || value === ""
    ? ""
    : identifier_(value, label, maximumLength);
}

function boundedText_(value, label, maximumLength, allowEmpty) {
  if (!["string", "number", "boolean"].includes(typeof value)) {
    throw new Error(`${label} must be text.`);
  }
  const text = String(value);
  if ((!allowEmpty && !text.trim()) || text.length > maximumLength) {
    throw new Error(`${label} must contain ${allowEmpty ? "no more than" : "between 1 and"} ${maximumLength} characters.`);
  }
  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(text)) {
    throw new Error(`${label} contains control characters.`);
  }
  return text;
}

function integer_(value, label, minimum, maximum) {
  if (typeof value !== "number" || !Number.isInteger(value) || value < minimum || value > maximum) {
    throw new Error(`${label} must be an integer from ${minimum} to ${maximum}.`);
  }
  return value;
}

function optionalInteger_(value, label, minimum, maximum, fallback) {
  return value === undefined || value === null || value === ""
    ? fallback
    : integer_(value, label, minimum, maximum);
}

function optionalEnum_(value, label, options) {
  if (value === undefined || value === null || value === "") {
    return "";
  }
  const normalized = String(value).trim().toLowerCase();
  if (!options.includes(normalized)) {
    throw new Error(`${label} must be one of: ${options.join(", ")}.`);
  }
  return normalized;
}

function reportStatusResponse_(rawSessionId, rawCallback) {
  let response;
  try {
    const sessionId = identifier_(rawSessionId, "sessionId", 128);
    const spreadsheet = openHomeworkSpreadsheet_();
    const sessionsSheet = spreadsheet.getSheetByName("Sessions");
    const state = sessionsSheet
      ? getSessionRowState_(sessionsSheet, sessionId)
      : { status: "missing", questionRows: 0 };
    response = {
      ok: state.status === "complete",
      sessionId,
      status: state.status,
      questionRows: state.questionRows
    };
  } catch (error) {
    response = {
      ok: false,
      error: String(error && error.message ? error.message : error)
    };
  }

  const callback = String(rawCallback || "");
  if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(callback)) {
    return javascript_(`${callback}(${JSON.stringify(response)});`);
  }
  return json_(response);
}

function javascript_(source) {
  return ContentService
    .createTextOutput(source)
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function ensureSheet_(spreadsheet, name, headers, options) {
  options = options || {};
  const sheet = spreadsheet.getSheetByName(name) || spreadsheet.insertSheet(name);
  let structureChanged = false;

  if (name === "Sessions") {
    structureChanged = migrateSessionsSheetIfNeeded_(sheet) || structureChanged;
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    structureChanged = true;
  } else {
    const currentHeaders = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
    const headersMatch = headers.every((header, index) => currentHeaders[index] === header);

    if (!headersMatch) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      structureChanged = true;
    }
  }

  sheet.setFrozenRows(1);
  if (structureChanged || options.applyDefaultColumnWidths) {
    formatSheet_(sheet, name, headers, {
      applyDefaultColumnWidths: Boolean(options.applyDefaultColumnWidths)
    });
  }
  return sheet;
}

function removeSheetIfExists_(spreadsheet, name) {
  const sheet = spreadsheet.getSheetByName(name);

  if (!sheet || spreadsheet.getSheets().length <= 1) {
    return;
  }

  spreadsheet.deleteSheet(sheet);
}

function getSessionRowState_(sheet, sessionId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return { row: null, status: "missing", questionRows: 0 };
  }

  const notes = sheet.getRange(2, 1, lastRow - 1, 1).getNotes();
  for (let index = 0; index < notes.length; index += 1) {
    const state = parseSessionIdNote_(notes[index][0], sessionId);
    if (state) {
      return { row: index + 2, ...state };
    }
  }

  return { row: null, status: "missing", questionRows: 0 };
}

function setSessionIdNote_(sheet, rowIndex, sessionId, status, questionRows) {
  if (!rowIndex || !sessionId) {
    return;
  }

  sheet
    .getRange(rowIndex, 1)
    .setNote(sessionIdNote_(sessionId, status, questionRows));
}

function sessionIdNote_(sessionId, status, questionRows) {
  const lines = [`Session ID: ${sessionId}`];
  if (status) {
    lines.push(`Status: ${status}`);
    lines.push(`Question rows: ${number_(questionRows)}`);
  }
  return lines.join("\n");
}

function parseSessionIdNote_(note, sessionId) {
  const value = String(note || "");
  if (!value || value.split("\n")[0] !== `Session ID: ${sessionId}`) {
    return null;
  }

  const statusMatch = value.match(/^Status:\s*(processing|complete)$/m);
  const questionRowsMatch = value.match(/^Question rows:\s*(\d+)$/m);
  return {
    // Notes created by older receiver versions had only the ID. Treat those
    // as complete so deploying this version never replays historical email.
    status: statusMatch ? statusMatch[1] : "complete",
    questionRows: questionRowsMatch ? number_(questionRowsMatch[1]) : 0
  };
}

function deleteQuestionRowsForSession_(sheet, sessionId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return;
  }

  const sessionIdColumn = QUESTION_HEADERS.indexOf("Session ID") + 1;
  const values = sheet.getRange(2, sessionIdColumn, lastRow - 1, 1).getDisplayValues();
  for (let index = values.length - 1; index >= 0; index -= 1) {
    if (String(values[index][0]) === sessionId) {
      sheet.deleteRow(index + 2);
    }
  }
}

function buildSessionRow_(receivedAt, session) {
  const totalQuestions = gradedQuestionCount_(session);
  const correctCount = number_(session.correctCount);
  const accuracyPercent = accuracyPercent_(session);

  return [
    formatDateOnly_(receivedAt),
    formatTimeOnly_(receivedAt),
    cellText_(session.userName, 120),
    numberOrBlank_(session.difficulty),
    totalQuestions,
    correctCount,
    percentOrBlank_(accuracyPercent),
    speedRoundPercent_(session)
  ];
}

function notifySessionComplete_(session) {
  const recipients = getEmailRecipients_();
  if (!recipients.length) {
    return;
  }

  const studentName = text_(session.userName) || "Student";
  const accuracyPercent = accuracyPercent_(session);
  const accuracyText = accuracyPercent === "" ? "unknown%" : `${accuracyPercent}%`;
  const totalQuestions = gradedQuestionCount_(session);
  const correctCount = number_(session.correctCount);
  const subject = `${SESSION_COMPLETE_EMAIL_SUBJECT_PREFIX} ${studentName} - ${accuracyText} correct`;
  const body = [
    `${studentName} finished a homework session with ${accuracyText} correct.`,
    totalQuestions ? `${correctCount} out of ${totalQuestions} questions correct.` : ""
  ].filter(Boolean).join("\n");

  try {
    MailApp.sendEmail({
      to: recipients.join(","),
      subject,
      body
    });
  } catch (error) {
    console.warn(`Could not send homework completion email: ${error}`);
  }
}

function openHomeworkSpreadsheet_() {
  const spreadsheetId = PropertiesService
    .getScriptProperties()
    .getProperty(SPREADSHEET_ID_PROPERTY);
  if (!spreadsheetId || !String(spreadsheetId).trim()) {
    throw new Error(
      `Missing Apps Script property ${SPREADSHEET_ID_PROPERTY}. Add the Google Sheet ID in Project Settings > Script Properties.`
    );
  }
  return SpreadsheetApp.openById(String(spreadsheetId).trim());
}

function getEmailRecipients_() {
  const value = PropertiesService
    .getScriptProperties()
    .getProperty(EMAIL_RECIPIENTS_PROPERTY);
  if (!value) {
    return [];
  }

  return String(value)
    .split(/[;,\n]/)
    .map((recipient) => recipient.trim())
    .filter((recipient) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient))
    .slice(0, 10);
}

function accuracyPercent_(session) {
  const totalQuestions = gradedQuestionCount_(session);
  const correctCount = number_(session.correctCount);
  return totalQuestions
    ? Math.round((correctCount / totalQuestions) * 100)
    : "";
}

function gradedQuestionCount_(session) {
  return Number.isFinite(Number(session && session.gradedQuestions))
    ? Math.max(0, number_(session.gradedQuestions))
    : Math.max(0, number_(session && session.totalQuestions));
}

function buildQuestionRow_(receivedAt, session, record) {
  return [
    receivedAt,
    cellText_(session.id, 128),
    dateOrText_(session.startedAt),
    cellText_(session.userId, 64),
    cellText_(session.userName, 120),
    cellText_(record.recordType, 20),
    numberOrBlank_(record.questionNumber),
    cellText_(record.category, 64),
    cellText_(record.categoryLabel, 120),
    numberOrBlank_(record.questionDifficulty),
    cellText_(record.questionType, 80),
    cellText_(record.questionText, 10000),
    cellText_(record.chosenAnswer, 5000),
    cellText_(record.correctAnswer, 5000),
    recordResult_(record),
    cellText_(Array.isArray(record.selectedTokens) ? record.selectedTokens.join("|") : "", 10000),
    cellText_(record.reviewText || stripHtml_(record.reviewHtml || ""), 10000),
    cellText_(record.contentId, 128),
    cellText_(record.skill || record.skillId, 128),
    numberOrBlank_(record.gradeMin),
    numberOrBlank_(record.gradeMax),
    cellText_(record.explanation, 10000),
    cellText_(record.source, 1000),
    cellText_(record.reviewedAt, 64),
    numberOrBlank_(record.hintsUsed),
    cellText_(record.confidence, 20)
  ];
}

function recordResult_(record) {
  if (record && record.isGraded === false) {
    return "Completed (unscored)";
  }
  return record && record.isCorrect === true ? "Correct" : "Wrong";
}

function getRecords_(session) {
  const mainRecords = Array.isArray(session.records)
    ? session.records.map((record) => ({
        ...record,
        recordType: "main"
      }))
    : [];

  const speedRecords = Array.isArray(session.speedRoundRecords)
    ? session.speedRoundRecords.map((record) => ({
        ...record,
        recordType: "speed"
      }))
    : [];

  return [...mainRecords, ...speedRecords];
}

function appendRows_(sheet, rows) {
  if (!rows.length) {
    return null;
  }

  const startRow = sheet.getLastRow() + 1;
  sheet
    .getRange(startRow, 1, rows.length, rows[0].length)
    .setValues(rows);
  return startRow;
}

function json_(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}

function dateOrText_(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date;
}

function text_(value, maxLength) {
  if (value === null || value === undefined) {
    return "";
  }

  const text = String(value);
  const limit = Number(maxLength) || 5000;

  return text.length > limit ? text.slice(0, limit) : text;
}

function cellText_(value, maxLength) {
  const text = text_(value, maxLength);
  // Google Sheets interprets these prefixes as formulas, even when a value
  // came from a JSON string. A leading apostrophe forces literal cell text
  // and is not shown in the rendered sheet.
  return /^\s*[=+\-@]/.test(text) ? `'${text}` : text;
}

function number_(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function numberOrBlank_(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : "";
}

function boolOrBlank_(value) {
  if (value === true) {
    return true;
  }

  if (value === false) {
    return false;
  }

  return "";
}

function percentOrBlank_(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number / 100 : "";
}

function speedRoundPercent_(session) {
  const correct = numberOrBlank_(session.speedRoundCorrectCount);
  const total = numberOrBlank_(session.speedRoundTotalQuestions);

  if (correct === "" || total === "" || total <= 0) {
    return "";
  }

  return correct / total;
}

function formatSheet_(sheet, name, headers, options) {
  options = options || {};
  const lastRow = Math.max(sheet.getLastRow(), 2);
  const lastColumn = Math.max(sheet.getLastColumn(), headers.length);

  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");

  if (name === "Sessions") {
    trimColumns_(sheet, headers.length);
    sheet.getRange(1, 1, 1, headers.length).setVerticalAlignment("middle");
    sheet.getRange(1, 1, 1, headers.length).setHorizontalAlignment("center");
    formatSessionRows_(sheet, 2, lastRow - 1);
    if (options.applyDefaultColumnWidths) {
      sheet.autoResizeColumns(1, headers.length);
      sheet.setColumnWidths(1, 8, 90);
    }
    return;
  }

  const dateHeaders = ["Received At", "Started At"];

  dateHeaders.forEach((header) => {
    const columnIndex = headers.indexOf(header) + 1;

    if (columnIndex > 0) {
      sheet
        .getRange(2, columnIndex, lastRow - 1, 1)
        .setNumberFormat("yyyy-mm-dd hh:mm:ss");
    }
  });

  sheet.getRange(1, 1, lastRow, lastColumn).setWrap(true);
}

function formatSessionRows_(sheet, startRow, rowCount) {
  if (!startRow || !rowCount || rowCount < 1) {
    return;
  }

  const range = sheet.getRange(startRow, 1, rowCount, SESSION_HEADERS.length);
  range.setVerticalAlignment("middle");
  range.setHorizontalAlignment("center");
  range.setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
  range.setWrap(false);
  sheet.getRange(startRow, 1, rowCount, 1).setNumberFormat("@");
  sheet.getRange(startRow, 2, rowCount, 1).setNumberFormat("@");
  sheet.getRange(startRow, 7, rowCount, 2).setNumberFormat("0%");
  sheet.setRowHeights(startRow, rowCount, 24);
}

function trimColumns_(sheet, desiredColumnCount) {
  const maxColumns = sheet.getMaxColumns();

  if (maxColumns > desiredColumnCount) {
    sheet.deleteColumns(desiredColumnCount + 1, maxColumns - desiredColumnCount);
  }
}

function migrateSessionsSheetIfNeeded_(sheet) {
  if (sheet.getLastRow() === 0) {
    return false;
  }

  const firstHeader = sheet.getRange(1, 1).getValue();
  if (firstHeader !== "Received At") {
    return false;
  }

  const oldColumnCount = Math.max(sheet.getLastColumn(), 18);
  const oldRows = sheet.getLastRow() > 1
    ? sheet.getRange(2, 1, sheet.getLastRow() - 1, oldColumnCount).getValues()
    : [];

  const migratedRows = oldRows.map((row) => {
    const receivedAt = dateOrText_(row[0]) || new Date();
    const rawSessionJson = text_(row[17], 45000);
    const session = parseJsonObject_(rawSessionJson);
    const totalQuestions = number_(session.totalQuestions || row[10]);
    const correctCount = number_(session.correctCount || row[11]);
    const accuracyPercent = totalQuestions
      ? Math.round((correctCount / totalQuestions) * 100)
      : numberOrBlank_(row[12]);

    return [
      formatDateOnly_(receivedAt),
      formatTimeOnly_(receivedAt),
      cellText_(session.userName || row[6], 120),
      numberOrBlank_(session.difficulty || row[8]),
      totalQuestions,
      correctCount,
      percentOrBlank_(accuracyPercent),
      speedRoundPercent_(session.speedRoundTotalQuestions ? session : {
        speedRoundCorrectCount: row[14],
        speedRoundTotalQuestions: row[13]
      })
    ];
  });

  sheet.clearContents();
  sheet.getRange(1, 1, 1, SESSION_HEADERS.length).setValues([SESSION_HEADERS]);

  if (migratedRows.length) {
    sheet.getRange(2, 1, migratedRows.length, SESSION_HEADERS.length).setValues(migratedRows);
  }
  return true;
}

function parseJsonObject_(value) {
  try {
    const parsed = JSON.parse(String(value || "{}"));
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    return {};
  }
}

function formatDateOnly_(value) {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return `${Utilities.formatDate(date, Session.getScriptTimeZone(), "EEE, MMMM ")}${getOrdinalDay_(date)}`;
}

function formatTimeOnly_(value) {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return Utilities.formatDate(date, Session.getScriptTimeZone(), "HH:mm");
}

function getOrdinalDay_(date) {
  const day = Number(Utilities.formatDate(date, Session.getScriptTimeZone(), "d"));
  const lastTwoDigits = day % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return `${day}th`;
  }

  const suffixes = {
    1: "st",
    2: "nd",
    3: "rd"
  };

  return `${day}${suffixes[day % 10] || "th"}`;
}

function stripHtml_(value) {
  return String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

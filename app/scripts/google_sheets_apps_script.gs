const SPREADSHEET_ID = "12_2emb-3BBLrdGVg4PYAOeaBWbe6ysBVbLLCbpedYVo";
const SPEED_ROUND_QUESTION_COUNT = 5;
const SESSION_COMPLETE_EMAIL_RECIPIENTS = [
  "sendavianemail@gmail.com",
  "mirandajweiss@gmail.com"
];
const SESSION_COMPLETE_EMAIL_SUBJECT_PREFIX = "[Homework Alert]";

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
  "Is Correct",
  "Selected Tokens",
  "Review Text"
];

function setup() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);

  ensureSheet_(spreadsheet, "Sessions", SESSION_HEADERS, { applyDefaultColumnWidths: true });
  ensureSheet_(spreadsheet, "QuestionResults", QUESTION_HEADERS);
  removeSheetIfExists_(spreadsheet, "CategorySummary");
}

function doGet() {
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
  } catch (error) {
    return json_({
      ok: false,
      error: "Invalid JSON payload.",
      details: String(error && error.message ? error.message : error)
    });
  }

  const expectedSecret = PropertiesService
    .getScriptProperties()
    .getProperty("REPORT_SECRET");

  if (expectedSecret && payload.reportSecret !== expectedSecret) {
    return json_({
      ok: false,
      error: "Unauthorized report key."
    });
  }

  const session = payload.session || {};
  if (!session.id) {
    return json_({
      ok: false,
      error: "Missing session.id."
    });
  }

  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(15000);

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sessionsSheet = ensureSheet_(spreadsheet, "Sessions", SESSION_HEADERS);
    const questionsSheet = ensureSheet_(spreadsheet, "QuestionResults", QUESTION_HEADERS);

    if (hasExistingSession_(sessionsSheet, questionsSheet, session.id)) {
      return json_({
        ok: true,
        duplicate: true,
        sessionId: session.id
      });
    }

    const records = getRecords_(session);

    const sessionRow = appendRows_(sessionsSheet, [buildSessionRow_(receivedAt, session)]);
    setSessionIdNote_(sessionsSheet, sessionRow, session.id);
    formatSheet_(sessionsSheet, "Sessions", SESSION_HEADERS);

    const questionRows = records
      .filter((record) => record && record.isCorrect === false)
      .map((record) => buildQuestionRow_(receivedAt, session, record));

    appendRows_(questionsSheet, questionRows);
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

  return JSON.parse(e.postData.contents);
}

function ensureSheet_(spreadsheet, name, headers, options) {
  options = options || {};
  const sheet = spreadsheet.getSheetByName(name) || spreadsheet.insertSheet(name);

  if (name === "Sessions") {
    migrateSessionsSheetIfNeeded_(sheet);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  } else {
    const currentHeaders = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
    const headersMatch = headers.every((header, index) => currentHeaders[index] === header);

    if (!headersMatch) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
  }

  sheet.setFrozenRows(1);
  formatSheet_(sheet, name, headers, {
    applyDefaultColumnWidths: Boolean(options.applyDefaultColumnWidths)
  });
  return sheet;
}

function removeSheetIfExists_(spreadsheet, name) {
  const sheet = spreadsheet.getSheetByName(name);

  if (!sheet || spreadsheet.getSheets().length <= 1) {
    return;
  }

  spreadsheet.deleteSheet(sheet);
}

function hasExistingSession_(sessionsSheet, questionsSheet, sessionId) {
  if (!sessionId) {
    return false;
  }

  if (hasSessionIdNote_(sessionsSheet, sessionId)) {
    return true;
  }

  return hasQuestionResultSession_(questionsSheet, sessionId);
}

function hasSessionIdNote_(sheet, sessionId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return false;
  }

  const notes = sheet.getRange(2, 1, lastRow - 1, 1).getNotes();
  return notes.some((row) => row[0] === sessionIdNote_(sessionId));
}

function hasQuestionResultSession_(sheet, sessionId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return false;
  }

  const sessionIdColumn = QUESTION_HEADERS.indexOf("Session ID") + 1;
  const values = sheet.getRange(2, sessionIdColumn, lastRow - 1, 1).getValues();

  return values.some((row) => row[0] === sessionId);
}

function setSessionIdNote_(sheet, rowIndex, sessionId) {
  if (!rowIndex || !sessionId) {
    return;
  }

  sheet.getRange(rowIndex, 1).setNote(sessionIdNote_(sessionId));
}

function sessionIdNote_(sessionId) {
  return `Session ID: ${sessionId}`;
}

function buildSessionRow_(receivedAt, session) {
  const totalQuestions = number_(session.totalQuestions);
  const correctCount = number_(session.correctCount);
  const accuracyPercent = accuracyPercent_(session);

  return [
    formatDateOnly_(receivedAt),
    formatTimeOnly_(receivedAt),
    text_(session.userName),
    numberOrBlank_(session.difficulty),
    totalQuestions,
    correctCount,
    percentOrBlank_(accuracyPercent),
    speedRoundPercent_(session)
  ];
}

function notifySessionComplete_(session) {
  if (!SESSION_COMPLETE_EMAIL_RECIPIENTS.length) {
    return;
  }

  const studentName = text_(session.userName) || "Student";
  const accuracyPercent = accuracyPercent_(session);
  const accuracyText = accuracyPercent === "" ? "unknown%" : `${accuracyPercent}%`;
  const totalQuestions = number_(session.totalQuestions);
  const correctCount = number_(session.correctCount);
  const subject = `${SESSION_COMPLETE_EMAIL_SUBJECT_PREFIX} ${studentName} - ${accuracyText} correct`;
  const body = [
    `${studentName} finished a homework session with ${accuracyText} correct.`,
    totalQuestions ? `${correctCount} out of ${totalQuestions} questions correct.` : ""
  ].filter(Boolean).join("\n");

  try {
    MailApp.sendEmail({
      to: SESSION_COMPLETE_EMAIL_RECIPIENTS.join(","),
      subject,
      body
    });
  } catch (error) {
    console.warn(`Could not send homework completion email: ${error}`);
  }
}

function accuracyPercent_(session) {
  const totalQuestions = number_(session.totalQuestions);
  const correctCount = number_(session.correctCount);
  return totalQuestions
    ? Math.round((correctCount / totalQuestions) * 100)
    : "";
}

function buildQuestionRow_(receivedAt, session, record) {
  return [
    receivedAt,
    text_(session.id),
    dateOrText_(session.startedAt),
    text_(session.userId),
    text_(session.userName),
    text_(record.recordType),
    numberOrBlank_(record.questionNumber),
    text_(record.category),
    text_(record.categoryLabel),
    numberOrBlank_(record.questionDifficulty),
    text_(record.questionType),
    text_(record.questionText, 10000),
    text_(record.chosenAnswer, 5000),
    text_(record.correctAnswer, 5000),
    boolOrBlank_(record.isCorrect),
    Array.isArray(record.selectedTokens) ? record.selectedTokens.join("|") : "",
    text_(record.reviewText || stripHtml_(record.reviewHtml || ""), 10000)
  ];
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
  const total = numberOrBlank_(session.speedRoundTotalQuestions) || SPEED_ROUND_QUESTION_COUNT;

  if (correct === "" || !total) {
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
    sheet.getRange(1, 1, lastRow, headers.length).setVerticalAlignment("middle");
    sheet.getRange(1, 1, lastRow, headers.length).setHorizontalAlignment("center");
    sheet.getRange(1, 1, lastRow, headers.length).setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
    sheet.getRange(1, 1, lastRow, headers.length).setWrap(false);
    sheet.getRange(2, 1, lastRow - 1, 1).setNumberFormat("@");
    sheet.getRange(2, 2, lastRow - 1, 1).setNumberFormat("@");
    sheet.getRange(2, 7, lastRow - 1, 2).setNumberFormat("0%");
    if (options.applyDefaultColumnWidths) {
      sheet.autoResizeColumns(1, headers.length);
      sheet.setColumnWidths(1, 8, 90);
    }

    sheet.setRowHeights(2, lastRow - 1, 24);
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

function trimColumns_(sheet, desiredColumnCount) {
  const maxColumns = sheet.getMaxColumns();

  if (maxColumns > desiredColumnCount) {
    sheet.deleteColumns(desiredColumnCount + 1, maxColumns - desiredColumnCount);
  }
}

function migrateSessionsSheetIfNeeded_(sheet) {
  if (sheet.getLastRow() === 0) {
    return;
  }

  const firstHeader = sheet.getRange(1, 1).getValue();
  if (firstHeader !== "Received At") {
    return;
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
      text_(session.userName || row[6]),
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

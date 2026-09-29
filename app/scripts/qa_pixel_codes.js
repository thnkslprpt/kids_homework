#!/usr/bin/env node
const assert = require("node:assert/strict");
const { test } = require("node:test");
const vm = require("node:vm");
const { loadAppContext } = require("./qa_question_generation.js");
require("./qa_seeded_random.js").installSeededRandom("pixel-codes");
const context = loadAppContext();
const plain = (value) => JSON.parse(JSON.stringify(value));

test("pixel run counts start with empty and preserve leading filled cells", () => {
  assert.ok(context.HomeworkPixelCodes, "Pixel codes must load with the app");
  const codes = context.HomeworkPixelCodes;
  for (const [bits, counts] of [
    [[0, 1, 1, 0], [1, 2, 1]],
    [[1, 1, 0, 0], [0, 2, 2]],
    [[0, 0, 0, 0], [4]],
    [[1, 1, 1, 1], [0, 4]],
    [[1, 0, 1, 0], [0, 1, 1, 1, 1]],
    [[0, 0, 1, 1, 1], [2, 3]],
  ]) {
    assert.deepEqual(plain(codes.encodeRuns(bits)), counts);
    assert.deepEqual(plain(codes.decodeRuns(counts.join(", "), bits.length)), bits);
    assert.deepEqual(plain(codes.decodeRuns(counts.join(" "), bits.length)), bits);
  }
  for (const invalid of ["", "-1,5", "1.5,2.5", "2,0,2", "1e0,3", "5", "2", "1,,3", "0,0,4", "1,3,", "<b>4</b>"]) {
    assert.equal(codes.decodeRuns(invalid, 4), null, invalid);
  }
});

test("pixel grading compares positions, including empty cells, and explains the first mismatch", () => {
  assert.ok(context.HomeworkPixelCodes);
  const codes = context.HomeworkPixelCodes;
  const config = { layout: "pixel-code", variant: "binary-decode", rows: 1, cols: 4, target: [0, 1, 1, 0] };
  assert.equal(codes.evaluate(config, ["0", "1", "1", "0"]).isCorrect, true);
  const wrong = codes.evaluate(config, ["1", "0", "1", "0"]);
  assert.equal(wrong.isCorrect, false);
  assert.match(wrong.feedback, /row 1, column 1.*empty/i);
  assert.match(wrong.value, /Row 1: 1 0 1 0/);
  const runs = { ...config, variant: "runs-encode", target: [1, 1, 0, 0] };
  assert.equal(codes.evaluate(runs, ["0, 2, 2"]).isCorrect, true);
  assert.equal(codes.evaluate(runs, ["0 2 2"]).isCorrect, true);
  assert.equal(codes.evaluate(runs, ["2, 2"]).isCorrect, false);
  assert.equal(codes.evaluate(runs, ["2, 1"]).complete, false);
});

test("pixel progression generates valid, varied questions only at supported levels", () => {
  assert.ok(context.HomeworkPixelCodes);
  const codes = context.HomeworkPixelCodes;
  const variants = ["binary-decode", "binary-decode", "binary-encode", "runs-decode", "runs-decode", "runs-encode"];
  for (let level = 2; level <= 7; level++) {
    const seen = new Set();
    for (let sample = 0; sample < 30; sample++) {
      const entry = codes.createEntry(level);
      assert.equal(entry.interactive.variant, variants[level - 2]);
      assert.equal(entry.difficulty, level);
      assert.ok(codes.isValidConfig(entry.interactive));
      const normalized = context.normalizeChoiceBankEntry(entry, "computing-choice");
      assert.ok(normalized);
      const question = context.createBankChoiceQuestion(normalized, "computing-choice");
      assert.deepEqual(plain(context.validateHomeworkQuestionList([question], "pixel")), []);
      assert.equal(question.category, "computing");
      seen.add(entry.contentId);
    }
    assert.ok(seen.size > 5, `Level ${level} needs varied messages`);
  }
  for (const level of [1, 8, 9, 10]) assert.equal(codes.createEntry(level), null);
});

test("pixel checkpoints preserve unsubmitted work and reject malformed boards", () => {
  assert.ok(context.HomeworkPixelCodes);
  vm.runInContext(`
    state.questions = buildSessionQuestions(5, 3, { selectedCategories: ["computing"], userId: "guest" });
    state.questions[0] = createBankChoiceQuestion(normalizeChoiceBankEntry(HomeworkPixelCodes.createEntry(7), "computing-choice"), "computing-choice");
    state.currentUserId = "guest";
    state.totalQuestions = 5;
    state.sessionStartedAt = new Date();
    elements.quizScreen.hidden = false;
    state.pendingAnswer = { index: 0, value: "", tokens: ["0, 2", "", "4", "", "row:2"] };
  `, context);
  const saved = plain(context.buildActiveSessionCheckpoint());
  assert.equal(context.isValidActiveSessionCheckpoint(saved), true);
  assert.deepEqual(saved.state.pendingAnswer.tokens, ["0, 2", "", "4", "", "row:2"]);
  assert.equal(saved.state.answeredCount, 0);
  saved.state.questions[0].interactive.target = [1];
  assert.equal(context.isValidActiveSessionCheckpoint(saved), false);
});


test("pixel generation avoids recent messages while unused rows remain", () => {
  const fresh = loadAppContext();
  const ids = Array.from({ length: 10 }, () => fresh.HomeworkPixelCodes.createEntry(2).contentId);
  assert.equal(new Set(ids).size, 10);
});

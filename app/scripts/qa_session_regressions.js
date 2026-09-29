#!/usr/bin/env node

const assert = require("node:assert/strict");
const vm = require("node:vm");
const { test } = require("node:test");
const { loadAppContext } = require("./qa_question_generation.js");

function sessionContext() {
  require("./qa_seeded_random.js").installSeededRandom("2026-08-12");
  const context = loadAppContext();
  vm.runInContext(`
    state.questions = buildSessionQuestions(5, 3, {
      selectedCategories: ["math"], userId: "guest",
    });
    state.currentUserId = "guest";
    state.totalQuestions = 5;
    state.sessionStartedAt = new Date();
    elements.quizScreen.hidden = false;
  `, context);
  return context;
}

test("reviewing completed work cannot create a resumable checkpoint", () => {
  const context = sessionContext();
  vm.runInContext(`
    state.currentIndex = 5;
    state.answeredCount = 5;
    state.viewIndex = 4;
  `, context);
  assert.equal(context.buildActiveSessionCheckpoint(), null);
});

test("a checkpoint preserves a bounded unsubmitted answer without grading it", () => {
  const context = sessionContext();
  vm.runInContext('state.questions[0] = createMathInputQuestion(3); state.pendingAnswer = { index: 0, value: "12.5", tokens: [] }', context);
  const saved = JSON.parse(JSON.stringify(context.buildActiveSessionCheckpoint()));
  assert.deepEqual(saved.state.pendingAnswer, { index: 0, value: "12.5", tokens: [] });
  assert.equal(saved.state.answeredCount, 0);
  assert.equal(context.isValidActiveSessionCheckpoint(saved), true);
  saved.state.pendingAnswer.tokens = ["x".repeat(10001)];
  assert.equal(context.isValidActiveSessionCheckpoint(saved), false);
});

test("older checkpoints remain valid without draft fields", () => {
  const context = sessionContext();
  const saved = JSON.parse(JSON.stringify(context.buildActiveSessionCheckpoint()));
  delete saved.state.pendingAnswer;
  delete saved.state.speedRound.pendingAnswer;
  assert.equal(context.isValidActiveSessionCheckpoint(saved), true);
});

test("review navigation restarts timing when the unanswered question is revisited", () => {
  const context = sessionContext();
  vm.runInContext(`
    state.currentIndex = 1;
    state.viewIndex = 1;
    state.questionStartedAt = 1;
    state.timingQuestionIndex = 1;
    renderCurrentQuestion = () => {};
    showPreviousQuizQuestion();
  `, context);
  assert.equal(context.HOMEWORK_TEST_API.state.timingQuestionIndex, -1);
});

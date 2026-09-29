const assert = require('node:assert/strict');
const vm = require('node:vm');
const { test } = require('node:test');
const { loadAppContext } = require('./qa_question_generation.js');
require('./qa_seeded_random.js').installSeededRandom('build-example');
const context = loadAppContext();
const fixture = {
  mode: 'input', type: 'math-input', difficulty: 4, skill: 'build-example',
  questionText: 'Build a whole number.', displayText: '', answerValue: 24, answerLabel: '24',
  answerRule: { kind: 'whole-number-example', min: 21, max: 49, conditions: [
    { kind: 'multiple', divisor: 3 }, { kind: 'multiple', divisor: 4 },
  ] },
  successMessage: 'Your example satisfies every condition.',
};

test('all valid alternatives pass; boundaries, fractions and unmet divisors fail specifically', () => {
  assert.equal(typeof context.HomeworkBuildExample?.evaluate, 'function');
  const check = value => context.HomeworkBuildExample.evaluate(fixture.answerRule, value);
  for (const value of [24, 36, 48]) assert.equal(check(value).isCorrect, true);
  for (const value of [20, 21, 25, 49, 50, 24.5, -24, Infinity, NaN]) assert.equal(check(value).isCorrect, false);
  assert.match(check(25).feedback, /divisible by 3/);
  assert.match(check(25).feedback, /divisible by 4/);
  assert.match(check(60).feedback, /21.*49/);
});

test('expression and counterexample predicates check the mathematics directly', () => {
  assert.equal(typeof context.HomeworkBuildExample?.evaluate, 'function');
  const check = (condition, value) => context.HomeworkBuildExample.evaluate({
    kind: 'whole-number-example', min: 0, max: 100, conditions: [condition],
  }, value).isCorrect;
  const expression = { kind: 'expression', coefficient: 3, constant: 2, min: 14, max: 23 };
  for (const n of [4, 5, 6, 7]) assert.equal(check(expression, n), true);
  for (const n of [3, 8]) assert.equal(check(expression, n), false);
  for (const n of [9, 15, 25]) assert.equal(check({ kind: 'odd-composite' }, n), true);
  for (const n of [1, 2, 3, 7, 12]) assert.equal(check({ kind: 'odd-composite' }, n), false);
  assert.equal(check({ kind: 'square-not-multiple', divisor: 3 }, 16), true);
  assert.equal(check({ kind: 'square-not-multiple', divisor: 3 }, 9), false);
  assert.equal(check({ kind: 'square-not-multiple', divisor: 3 }, 10), false);
  assert.equal(check({ kind: 'product-not-divisor', divisor: 4 }, 1), true);
  assert.equal(check({ kind: 'product-not-divisor', divisor: 4 }, 3), false);
  assert.equal(check({ kind: 'unknown' }, 24), false);
});

test('generated progression is solvable, offers alternatives and survives JSON checkpoints', () => {
  assert.equal(typeof context.HomeworkBuildExample?.createQuestion, 'function');
  assert.equal(context.HomeworkBuildExample.createQuestion(1), null);
  for (let level = 2; level <= 10; level++) {
    for (let sample = 0; sample < 25; sample++) {
      const q = JSON.parse(JSON.stringify(context.HomeworkBuildExample.createQuestion(level)));
      assert.equal(q.difficulty, level);
      assert.equal(context.validateHomeworkQuestionShape(q).length, 0);
      assert.equal(context.HomeworkBuildExample.evaluate(q.answerRule, q.answerValue).isCorrect, true);
      const solutions = [];
      for (let n = q.answerRule.min; n <= q.answerRule.max; n++) {
        if (context.HomeworkBuildExample.evaluate(q.answerRule, n).isCorrect) solutions.push(n);
      }
      assert.ok(solutions.length >= 2, `level ${level} needs multiple solutions`);
      assert.match(q.visualHtml, /build-example-conditions/);
      assert.ok(q.reviewText.length > 0);
    }
  }
});

test('typed alternative scores correctly, stays visible, saves the draft and labels the reference', () => {
  const context = loadAppContext();
  context.exampleFixture = fixture;
  // DOM layout and real event handling are covered by the release browser matrix.
  vm.runInContext(`renderCurrentQuestion = () => {}; document.dispatchEvent = () => true;
    globalThis.CustomEvent = class { constructor(type) { this.type = type; } };`, context);
  vm.runInContext(`
    state.questions = Array.from({length: 5}, () => exampleFixture); state.totalQuestions = 5;
    state.currentUserId = 'guest'; state.currentRound = 'main';
    state.sessionStartedAt = new Date(); elements.quizScreen.hidden = false;
    state.pendingAnswer = {index: 0, value: '36', tokens: []};
  `, context);
  const checkpoint = JSON.parse(JSON.stringify(context.buildActiveSessionCheckpoint()));
  assert.equal(context.isValidActiveSessionCheckpoint(checkpoint), true);
  assert.equal(checkpoint.state.pendingAnswer.value, '36');
  context.exampleFixture = checkpoint.state.questions[0];
  context.checkpointQuestions = checkpoint.state.questions;
  vm.runInContext(`
    state.questions = checkpointQuestions;
    elements.answerInput.value = '36';
    submitTypedAnswer({preventDefault() {}});
  `, context);
  const state = context.HOMEWORK_TEST_API.state;
  assert.equal(state.correctCount, 1);
  assert.equal(state.awaitingContinue, true);
  assert.match(state.feedbackMessage, /36/);
  assert.equal(state.sessionRecords[0].chosenAnswer, '36');
  assert.equal(state.sessionRecords[0].correctAnswer, 'One example: 24');
  assert.doesNotMatch(state.sessionRecords[0].reviewHtml, /Correct answer:/);
  const wrong = context.buildSessionRecord(1, fixture, '25', false);
  assert.match(wrong.explanation, /divisible by 3/);
  assert.match(wrong.reviewHtml, /One example:/);
});

test('main Math sessions include sparse examples but grade one and challenges exclude them', () => {
  const api = context.HOMEWORK_TEST_API;
  for (const level of [1, 2, 5, 10]) {
    const questions = api.buildSessionQuestions(30, level, {selectedCategories: ['math'], userId: 'guest'});
    const examples = questions.filter(q => q.answerRule);
    assert.equal(level === 1 ? examples.length === 0 : examples.length > 0, true);
    assert.ok(examples.length <= 4);
    api.state.difficulty = level;
    assert.ok(api.buildSpeedRoundQuestions().every(q => !q.answerRule));
  }
});

test('out-of-range counterexamples are rejected before expensive factor checks', () => {
  context.largeExampleRule = {
    kind: 'whole-number-example', min: 3, max: 55, conditions: [{kind: 'odd-composite'}],
  };
  const result = vm.runInContext(
    'HomeworkBuildExample.evaluate(largeExampleRule, 9007199254740881)', context, {timeout: 250}
  );
  assert.equal(result.isCorrect, false);
  assert.match(result.feedback, /3.*55/);
});

test('malformed rules and reference answers cannot be restored as valid questions', () => {
  for (const rule of [
    {...fixture.answerRule, min: 50, max: 21},
    {...fixture.answerRule, conditions: [{kind: 'multiple', divisor: 0}]},
    {...fixture.answerRule, conditions: [{kind: 'unknown'}]},
  ]) {
    assert.ok(context.validateHomeworkQuestionShape({...fixture, answerRule: rule}).length > 0);
  }
  assert.ok(context.validateHomeworkQuestionShape({...fixture, answerValue: 25}).length > 0);
});

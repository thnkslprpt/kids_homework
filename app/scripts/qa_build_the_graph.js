#!/usr/bin/env node
const assert = require('node:assert/strict');
const { test } = require('node:test');
const vm = require('node:vm');
const { loadAppContext } = require('./qa_question_generation.js');
const context = loadAppContext();
const plain = value => JSON.parse(JSON.stringify(value));
const config = { layout: 'build-graph', labels: ['Apples', 'Bananas', 'Pears'], values: [0, 4, 8], scales: [1, 2, 3, 4], maxSteps: 8, unit: 'votes', title: 'Fruit votes', orientation: 'vertical' };

function graph() {
  assert.ok(context.HomeworkBuildGraph, 'Build the graph must load with the app');
  return context.HomeworkBuildGraph;
}

test('graph grading accepts every exact representation, including zero and alternative scales', () => {
  const model = graph();
  for (const tokens of [['1', '0', '4', '8'], ['2', '0', '2', '4'], ['4', '0', '1', '2']]) {
    const result = model.evaluate(config, tokens);
    assert.equal(result.complete, true);
    assert.equal(result.isCorrect, true);
    assert.match(result.value, /Apples: 0 votes/);
    assert.match(result.value, /Pears: 8 votes/);
  }
  const wrong = model.evaluate(config, ['2', '0', '4', '8']);
  assert.equal(wrong.isCorrect, false);
  assert.match(wrong.feedback, /Bananas.*8.*4/);
  const unsuitable = model.evaluate(config, ['3', '0', '1', '2']);
  assert.equal(unsuitable.isCorrect, false);
  assert.match(unsuitable.feedback, /scale.*3.*exact/i);
});

test('malformed graph answers and impossible graph configs are rejected', () => {
  const model = graph();
  for (const tokens of [[], ['2','0','2'], ['2','0','2','4','5'], ['2','0','-1','4'], ['2','0','2.5','4'], ['2','0','9','4'], ['5','0','2','4'], ['2','','2','4'], ['2','0','NaN','4'], ['2','0','2x','4']]) {
    assert.equal(model.evaluate(config, tokens).complete, false, JSON.stringify(tokens));
  }
  assert.equal(model.isValidConfig(config), true);
  for (const bad of [{values:[1]}, {labels:['A','A','B']}, {values:[0,4,100]}, {scales:[3]}, {maxSteps:0}, {maxSteps:10000}, {values:[0,-4,8]}, {orientation:'diagonal'}]) {
    assert.equal(model.isValidConfig({...config,...bad}), false, JSON.stringify(bad));
  }
});

test('graph progression generates varied solvable questions only at levels 2–8', () => {
  const model = graph();
  for (let level = 2; level <= 8; level++) {
    const seen = new Set();
    for (let sample = 0; sample < 35; sample++) {
      const entry = model.createEntry(level);
      const c = entry.interactive;
      assert.equal(entry.difficulty, level);
      assert.ok(model.isValidConfig(c));
      const valid = c.scales.filter(scale => c.values.every(value => value % scale === 0 && value / scale <= c.maxSteps));
      assert.ok(valid.length >= (level >= 6 ? 2 : 1));
      for (const scale of valid) assert.equal(model.evaluate(c, [scale, ...c.values.map(value => value / scale)].map(String)).isCorrect, true);
      if (level <= 3) { assert.deepEqual(plain(c.scales), [1]); assert.ok(c.values.every(value => value <= 8)); }
      assert.equal(c.orientation, level >= 7 ? 'horizontal' : 'vertical');
      const normalized = context.normalizeChoiceBankEntry(entry, 'charts-and-graphs-choice');
      assert.ok(normalized);
      const question = context.createBankChoiceQuestion(normalized, 'charts-and-graphs-choice');
      assert.deepEqual(plain(context.validateHomeworkQuestionList([question], 'graph')), []);
      seen.add(entry.contentId);
    }
    assert.ok(seen.size > 10);
  }
  for (const level of [1,9,10]) assert.equal(model.createEntry(level), null);
});

test('graph checkpoint preserves unsubmitted scale and bars and rejects corrupt graphs', () => {
  graph();
  vm.runInContext(`
    state.questions = buildSessionQuestions(5, 3, { selectedCategories: ['charts-and-graphs'], userId: 'guest' });
    state.questions[0] = createBankChoiceQuestion(normalizeChoiceBankEntry(HomeworkBuildGraph.createEntry(6), 'charts-and-graphs-choice'), 'charts-and-graphs-choice');
    state.currentUserId = 'guest'; state.totalQuestions = 5; state.sessionStartedAt = new Date();
    elements.quizScreen.hidden = false;
    state.pendingAnswer = {index: 0, value: '', tokens: ['2','0','2','4']};
  `, context);
  const saved = plain(context.buildActiveSessionCheckpoint());
  assert.equal(context.isValidActiveSessionCheckpoint(saved), true);
  assert.deepEqual(saved.state.pendingAnswer.tokens, ['2','0','2','4']);
  assert.equal(saved.state.answeredCount, 0);
  saved.state.questions[0].interactive.values = [1];
  assert.equal(context.isValidActiveSessionCheckpoint(saved), false);
});

test('chart sessions include graph construction sparingly and the speed round excludes it', () => {
  graph();
  for (let level = 2; level <= 8; level++) {
    const questions = context.buildSessionQuestions(30, level, {selectedCategories:['charts-and-graphs'], minDifficulty:level, adaptiveReview:false});
    const graphs = questions.filter(q => q.interactive?.layout === 'build-graph');
    assert.equal(graphs.length, 8, `Level ${level}: one construction per four chart activities`);
  }
  const mixed = context.buildSessionQuestions(30, 6, {selectedCategories:['charts-and-graphs','math'], minDifficulty:6, adaptiveReview:false});
  assert.ok(mixed.filter(q => q.interactive?.layout === 'build-graph').length <= 2);
  const speed = vm.runInContext('buildSpeedRoundQuestions()', context);
  assert.ok(speed.every(q => q.interactive?.layout !== 'build-graph'));
});

test('correct alternative-scale graphs are not presented as mistakes in parent review', () => {
  const model = graph();
  const entry = model.createEntry(6);
  entry.interactive = config;
  entry.answer = 'One valid graph: Scale: 1 vote per step';
  entry.answerLabel = entry.answer;
  const question = context.createBankChoiceQuestion(context.normalizeChoiceBankEntry(entry, 'charts-and-graphs-choice'), 'charts-and-graphs-choice');
  const result = model.evaluate(config, ['2','0','2','4']);
  const review = context.formatQuestionReview(question, result.value, {isCorrect:true});
  assert.ok(!review.includes('Correct answer:'), review);
  const record = context.buildSessionRecord(1, question, result.value, true, {tokens:['2','0','2','4']});
  assert.equal(record.isCorrect, true);
  assert.equal(record.chosenAnswer, result.value);
});

test('saved graph drafts reject malformed scales and bar positions instead of silently resetting work', () => {
  graph();
  vm.runInContext(`
    state.questions = buildSessionQuestions(5, 6, { selectedCategories: ['charts-and-graphs'], minDifficulty: 6, userId: 'guest' });
    state.currentUserId = 'guest'; state.totalQuestions = 5; state.sessionStartedAt = new Date();
    elements.quizScreen.hidden = false;
    state.pendingAnswer = {index: 0, value: '', tokens: ['2','0','2','4']};
  `, context);
  const saved = plain(context.buildActiveSessionCheckpoint());
  assert.equal(context.isValidActiveSessionCheckpoint(saved), true);
  for (const tokens of [['2','0','9','4'], ['2','0','2'], ['99','0','2','4'], ['2','0','-1','4']]) {
    const corrupt = plain(saved);
    corrupt.state.pendingAnswer.tokens = tokens;
    assert.equal(context.isValidActiveSessionCheckpoint(corrupt), false, JSON.stringify(tokens));
  }
  saved.state.pendingAnswer = null;
  saved.state.answeredCount = 1;
  saved.state.awaitingContinue = true;
  saved.state.answerResults = [false];
  saved.state.answerSelections = [{value:'Submitted graph', tokens:['2','0','2','4']}];
  saved.state.sessionRecords = [{isCorrect:false}];
  assert.equal(context.isValidActiveSessionCheckpoint(saved), true);
  saved.state.answerSelections[0].tokens = ['2','0','9','4'];
  assert.equal(context.isValidActiveSessionCheckpoint(saved), false);
});

test('normalization rejects malformed graphs even when they carry legacy answer indexes', () => {
  const entry = graph().createEntry(4);
  entry.interactive.values = [1];
  entry.interactive.answerIndexes = [0];
  assert.equal(context.normalizeChoiceBankEntry(entry, 'charts-and-graphs-choice'), null);
});

#!/usr/bin/env node
const assert = require('node:assert/strict');
const {test} = require('node:test');
const vm = require('node:vm');
const {loadAppContext} = require('./qa_question_generation.js');
require('./qa_seeded_random.js').installSeededRandom('first-wrong-step');
const context = loadAppContext();
const plain = value => JSON.parse(JSON.stringify(value));
function model() {
  assert.ok(context.HomeworkFirstWrongStep, 'E14 must load with the app');
  return context.HomeworkFirstWrongStep;
}

// Independent arithmetic parser checks the displayed work, not generator metadata.
function value(text, x = 0) {
  const tokens = text.replaceAll('×', '*').replaceAll('÷', '/').replaceAll('−', '-')
    .replace(/(\d)x/g, '$1*x').match(/\d+(?:\.\d+)?|x|[()+*/-]/g);
  let i = 0;
  function atom() {
    const token = tokens[i++];
    if (token === '(') { const result = sum(); assert.equal(tokens[i++], ')'); return result; }
    if (token === '-') return -atom();
    return token === 'x' ? x : Number(token);
  }
  function product() {
    let result = atom();
    while (['*', '/'].includes(tokens[i])) { const op = tokens[i++], rhs = atom(); result = op === '*' ? result * rhs : result / rhs; }
    return result;
  }
  function sum() {
    let result = product();
    while (['+', '-'].includes(tokens[i])) { const op = tokens[i++], rhs = product(); result = op === '+' ? result + rhs : result - rhs; }
    return result;
  }
  const result = sum();
  assert.equal(i, tokens.length, text);
  assert.ok(Number.isFinite(result), text);
  return result;
}
function meaning(text) {
  if (!text.includes('=')) return value(text);
  const [left, right] = text.split('=');
  const intercept = value(left) - value(right);
  const slope = value(left, 1) - value(right, 1) - intercept;
  assert.notEqual(slope, 0, 'all equations must have a unique solution');
  return -intercept / slope;
}
const equivalent = (a, b) => Math.abs(meaning(a) - meaning(b)) < 1e-9;

test('each worked solution has exactly its advertised first error and one valid repair', () => {
  const m = model(), families = new Set(), firstSteps = new Set();
  for (let level = 2; level <= 10; level++) {
    const ids = new Set(), outcomes = new Set();
    for (let trial = 0; trial < 120; trial++) {
      const entry = m.createEntry(level), c = entry.interactive, work = c.work;
      families.add(work.family); ids.add(entry.contentId); outcomes.add(work.firstWrongStep === null);
      assert.equal(c.layout, 'paired-select');
      assert.equal(entry.gradeMin, level); assert.equal(entry.gradeMax, level);
      assert.equal(work.steps.length, 3);
      const lines = [work.original, ...work.steps];
      const invalid = work.steps.map((step, i) => equivalent(lines[i], step) ? null : i + 1).filter(n => n !== null);
      assert.deepEqual(plain(invalid), work.firstWrongStep === null ? [] : [work.firstWrongStep]);
      assert.equal(c.answerItemIndex, work.firstWrongStep === null ? 3 : work.firstWrongStep - 1);
      const repair = c.reasons[c.answerReasonIndex];
      if (work.firstWrongStep === null) {
        assert.equal(repair.step, null);
        assert.match(repair.summary, /No repair/);
      } else {
        firstSteps.add(work.firstWrongStep);
        assert.equal(repair.step, work.firstWrongStep);
        assert.ok(equivalent(lines[repair.step - 1], repair.expression), repair.summary);
        assert.equal(c.reasons.filter(r => r.step === repair.step && equivalent(lines[r.step - 1], r.expression)).length, 1);
        for (const r of c.reasons.filter(r => r.step !== null && r !== repair)) {
          assert.ok(!equivalent(lines[r.step - 1], r.expression), 'distractor must not also be a valid repair');
        }
      }
      assert.equal(new Set(c.reasons.map(r => r.summary)).size, c.reasons.length);
      assert.ok(c.reasons.every(r => !/step [123]/i.test(r.summary)), 'repair labels must not reveal the wrong step');
      for (const line of lines) assert.ok(entry.visualSummary.includes(line));
      assert.ok(entry.reviewText.includes(work.correctResult));
      const question = context.createBankChoiceQuestion(context.normalizeChoiceBankEntry(entry, 'math-choice'), 'math-choice');
      assert.deepEqual(plain(context.validateHomeworkQuestionList([question], 'E14')), []);
      assert.deepEqual(plain(question.interactive.work), plain(work));
    }
    assert.ok(ids.size >= 20, `variety at level ${level}`);
    assert.equal(outcomes.size, 2, 'include correct and incorrect work at every level');
  }
  assert.deepEqual([...firstSteps].sort(), [1, 2, 3]);
  for (const family of ['regrouping', 'subtraction', 'order-of-operations', 'distribution', 'fraction-addition', 'fraction-multiplication', 'fraction-division', 'equation-balance', 'algebra-distribution', 'unknowns-both-sides']) assert.ok(families.has(family), family);
  for (const level of [0, 1, 11, 2.5, NaN]) assert.equal(m.createEntry(level), null);
});

test('math sessions include E14 within its level band and preserve other exercise types', () => {
  model();
  for (let level = 2; level <= 10; level++) {
    const questions = context.buildSessionQuestions(30, level, {selectedCategories:['math'], minDifficulty:level, adaptiveReview:false});
    const audits = questions.filter(q => q.interactive?.type === 'first-wrong-step');
    assert.ok(audits.length > 0 && audits.length <= 4, `level ${level}: ${audits.length}`);
    assert.ok(questions.some(q => q.mode !== 'interactive'));
  }
  assert.ok(context.buildSessionQuestions(30, 1, {selectedCategories:['math'], minDifficulty:1, adaptiveReview:false}).every(q => q.interactive?.type !== 'first-wrong-step'));
  assert.ok(vm.runInContext('buildSpeedRoundQuestions()', context).every(q => q.interactive?.type !== 'first-wrong-step'));
});

test('unfinished step and repair choices survive checkpoints with the original worked solution', () => {
  model();
  vm.runInContext(`
    state.questions = buildSessionQuestions(5, 6, {selectedCategories:['math'], minDifficulty:6, userId:'guest'});
    state.questions[0] = createBankChoiceQuestion(normalizeChoiceBankEntry(HomeworkFirstWrongStep.createEntry(6),'math-choice'),'math-choice');
    state.currentUserId='guest'; state.totalQuestions=5; state.sessionStartedAt=new Date(); elements.quizScreen.hidden=false;
    state.pendingAnswer={index:0,value:'',tokens:['item:1']};
  `, context);
  const checkpoint = plain(context.buildActiveSessionCheckpoint());
  assert.equal(context.isValidActiveSessionCheckpoint(checkpoint), true);
  assert.equal(context.saveActiveSessionCheckpoint(), true);
  const loaded = plain(context.loadActiveSessionCheckpoint());
  assert.deepEqual(loaded.state.pendingAnswer.tokens, ['item:1']);
  assert.deepEqual(loaded.state.questions[0].interactive.work, checkpoint.state.questions[0].interactive.work);
});


test('parent history and report preserve the original work, selected pair, and explanation', () => {
  const entry = model().createEntry(10), c = entry.interactive;
  const question = context.createBankChoiceQuestion(context.normalizeChoiceBankEntry(entry, 'math-choice'), 'math-choice');
  const chosen = `${c.items[c.answerItemIndex].summary} — ${c.reasons[c.answerReasonIndex].summary}`;
  const tokens = [`item:${c.answerItemIndex}`, `reason:${c.answerReasonIndex}`];
  const record = context.buildSessionRecord(1, question, chosen, true, {tokens});
  const session = {id:'E14-history', startedAt:'2026-09-30T12:00:00.000Z',userId:'guest',userName:'Guest',difficulty:10,totalQuestions:1,correctCount:1,records:[record]};
  const app = context.window.HomeworkApp;
  const store = app.sessionHistory.createSessionHistoryStore({adultUserId:'adult', maxSavedSessions:10, storageKey:'E14-history', userProfiles:[{id:'guest'}]});
  assert.equal(store.addSession('guest', session), true);
  const stored = store.loadForUser('guest')[0].records[0];
  const reported = app.resultsReporter.createResultsReporter().buildPayload(session).session.records[0];
  for (const saved of [stored, reported]) {
    for (const line of [c.work.original, ...c.work.steps]) assert.ok(saved.questionText.includes(line));
    assert.equal(saved.chosenAnswer, chosen);
    assert.equal(saved.explanation, entry.explanation);
    assert.deepEqual(plain(saved.selectedTokens), tokens);
  }
});

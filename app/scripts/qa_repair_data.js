#!/usr/bin/env node
const assert = require('node:assert/strict');
const {test} = require('node:test');
const vm = require('node:vm');
const {loadAppContext} = require('./qa_question_generation.js');
require('./qa_seeded_random.js').installSeededRandom('repair-data');
const context = loadAppContext();
const plain = value => JSON.parse(JSON.stringify(value));
function model() {
  assert.ok(context.HomeworkRepairData, 'Repair the data must load with the app');
  return context.HomeworkRepairData;
}
function sample(kind, level) {
  for (let i = 0; i < 200; i++) {
    const entry = model().createEntry(level);
    if (entry.interactive.repair.kind === kind) return entry;
  }
  assert.fail(`Missing ${kind} at level ${level}`);
}
const answer = entry => entry.interactive.items[entry.interactive.answerItemIndex].summary;
const reason = entry => entry.interactive.reasons[entry.interactive.answerReasonIndex].summary;

test('uses unique IDs rather than matching titles to mark a later duplicate', () => {
  const duplicate = sample('duplicate', 4), data = duplicate.interactive.repair;
  const target = data.records[data.focus.row];
  assert.ok(data.records.slice(0, data.focus.row).some(row => row.id === target.id));
  assert.match(answer(duplicate), new RegExp(`Mark row ${data.focus.row + 1} as a duplicate`));
  assert.match(reason(duplicate), /same checkout ID/);
  const keep = sample('distinct', 4), kept = keep.interactive.repair;
  assert.equal(new Set(kept.records.map(row => row.id)).size, kept.records.length);
  assert.ok(new Set(kept.records.map(row => row.title)).size < kept.records.length);
  assert.match(answer(keep), /Keep/);
  assert.match(reason(keep), /different checkout IDs/);
});

test('converts quantity and unit together using the displayed conversion rule', () => {
  for (let i = 0; i < 100; i++) {
    const entry = sample('units', 6), data = entry.interactive.repair;
    const original = data.records[data.focus.row].measurement;
    const [, amount, unit] = original.match(/^(\d+) (cm|g|mL)$/);
    const expectedUnit = {cm: 'm', g: 'kg', mL: 'L'}[unit];
    const expected = Number(amount) / (unit === 'cm' ? 100 : 1000);
    assert.ok(answer(entry).includes(`${expected} ${expectedUnit}`));
    assert.ok(data.rule.includes(unit === 'cm' ? '100 cm = 1 m' : unit === 'g' ? '1000 g = 1 kg' : '1000 mL = 1 L'));
  }
});

test('fills a missing value only from a source with the same record ID', () => {
  const known = sample('missing-known', 7), data = known.interactive.repair;
  assert.equal(data.records[data.focus.row].count, null);
  assert.equal(data.source.id, data.records[data.focus.row].id);
  assert.match(answer(known), new RegExp(`Set row ${data.focus.row + 1} to ${data.source.value} books`));
  assert.ok(data.evidence.includes(data.source.id));
  const unknown = sample('missing-unknown', 7);
  assert.equal(unknown.interactive.repair.source, null);
  assert.match(answer(unknown), /Cannot determine/);
  assert.match(reason(unknown), /no recorded count/i);
  let zero;
  for (let i = 0; i < 100; i++) {
    const entry = sample('missing-known', 7);
    if (entry.interactive.repair.source.value === 0) { zero = entry; break; }
  }
  assert.ok(zero, 'include explicitly recorded zero counts');
  assert.match(answer(zero), /to 0 books/);
  assert.match(reason(zero), /original log/);

});

test('distinguishes a verified error, a verified outlier, and insufficient evidence', () => {
  const wrong = sample('verified-error', 8), data = wrong.interactive.repair;
  assert.notEqual(data.records[data.focus.row].measurement, `${data.source.value} cm`);
  assert.ok(answer(wrong).includes(`${data.source.value} cm`));
  assert.ok(data.evidence.includes(`${data.source.value} cm`));
  const valid = sample('verified-unusual', 8), kept = valid.interactive.repair;
  assert.equal(kept.records[kept.focus.row].measurement, `${kept.source.value} cm`);
  assert.match(answer(valid), /Keep/);
  const unknown = sample('unverified-unusual', 8);
  assert.equal(unknown.interactive.repair.source, null);
  assert.match(answer(unknown), /Cannot determine/);
  assert.match(reason(unknown), /unusual.*not.*error/i);
  const conflict = sample('conflicting-id', 10), conflicting = conflict.interactive.repair;
  const row = conflicting.records[conflicting.focus.row];
  assert.ok(conflicting.records.some(other => other.id === row.id && other.title !== row.title));
  assert.match(answer(conflict), /Cannot determine/);
});

test('generates valid, varied, accessible paired questions across levels four through ten', () => {
  const m = model();
  for (let level = 4; level <= 10; level++) {
    const kinds = new Set(), ids = new Set(), positions = new Set();
    for (let i = 0; i < 60; i++) {
      const entry = m.createEntry(level), config = entry.interactive, data = config.repair;
      kinds.add(data.kind); ids.add(entry.contentId); positions.add(config.answerItemIndex);
      assert.ok(data.records.length >= 3 && data.records.length <= 4);
      assert.equal(config.layout, 'paired-select');
      assert.equal(entry.skill, 'computing.repair-data');
      assert.equal(entry.gradeMin, level);
      assert.equal(entry.gradeMax, level);
      assert.ok(entry.visualSummary.includes(data.rule) && entry.visualSummary.includes(data.evidence));
      for (const row of data.records) assert.ok(entry.visualSummary.includes(row.id));
      assert.ok(entry.reviewText.length > 20);
      const question = context.createBankChoiceQuestion(context.normalizeChoiceBankEntry(entry, 'computing-choice'), 'computing-choice');
      assert.deepEqual(plain(context.validateHomeworkQuestionList([question], 'repair')), []);
      assert.deepEqual(plain(question.interactive.repair), plain(data));
    }
    assert.ok(ids.size >= 10, `insufficient variety at ${level}`);
    assert.ok(positions.size >= 3, 'answer positions must vary');
    if (level === 4) assert.ok([...kinds].every(kind => ['duplicate', 'distinct'].includes(kind)));
    if (level >= 5 && level <= 6) assert.deepEqual([...kinds], ['units']);
    if (level === 7) assert.ok([...kinds].every(kind => kind.startsWith('missing-')));
  }
  for (const level of [0, 1, 2, 3, 11, 4.5, NaN]) assert.equal(m.createEntry(level), null);
});

test('appears in Computing practice alongside existing content', () => {
  model();
  for (const level of [4, 6, 7, 8, 10]) {
    const questions = context.buildSessionQuestions(30, level, {selectedCategories: ['computing'], minDifficulty: level, adaptiveReview: false});
    const repairs = questions.filter(q => q.interactive?.type === 'repair-data');
    assert.ok(repairs.length > 0 && repairs.length < questions.length, `Computing level ${level}: ${repairs.length} repairs`);
  }
  for (const level of [1, 2, 3]) {
    const questions = context.buildSessionQuestions(30, level, {selectedCategories: ['computing'], minDifficulty: level, adaptiveReview: false});
    assert.ok(questions.every(q => q.interactive?.type !== 'repair-data'), 'repair should not appear below level 4');
  }
  assert.ok(vm.runInContext('buildSpeedRoundQuestions()', context).every(q => q.interactive?.type !== 'repair-data'));

});

test('checkpoints partial action/reason choices with evidence and preserves review/report text', () => {
  model();
  vm.runInContext(`
    state.questions = buildSessionQuestions(5, 6, {selectedCategories:['computing'], minDifficulty:6, userId:'guest'});
    state.questions[0] = createBankChoiceQuestion(normalizeChoiceBankEntry(HomeworkRepairData.createEntry(6),'computing-choice'),'computing-choice');
    state.currentUserId='guest'; state.totalQuestions=5; state.sessionStartedAt=new Date(); elements.quizScreen.hidden=false;
    state.pendingAnswer={index:0,value:'',tokens:['item:1']};
  `, context);
  const checkpoint = plain(context.buildActiveSessionCheckpoint());
  assert.equal(context.isValidActiveSessionCheckpoint(checkpoint), true);
  assert.equal(context.saveActiveSessionCheckpoint(), true);
  const loaded = plain(context.loadActiveSessionCheckpoint());
  assert.deepEqual(loaded.state.pendingAnswer.tokens, ['item:1']);
  assert.deepEqual(loaded.state.questions[0].interactive.repair, checkpoint.state.questions[0].interactive.repair);
  const entry = sample('missing-unknown', 7);
  const chosenAnswer = `${answer(entry)} because ${reason(entry)}`;
  const session = {id:'repair-history',startedAt:'2026-09-29T12:00:00.000Z',userId:'guest',userName:'Guest',difficulty:6,totalQuestions:1,correctCount:1,
    records:[{skill:'computing.repair-data',questionNumber:1,category:'computing',isCorrect:true,chosenAnswer,selectedTokens:['item:1','reason:2'],visualSummary:entry.visualSummary}]};
  const store = context.window.HomeworkApp.sessionHistory.createSessionHistoryStore({adultUserId:'adult',maxSavedSessions:10,storageKey:'repair-test',userProfiles:[{id:'guest'}]});
  assert.equal(store.addSession('guest',session), true);
  assert.equal(store.loadForUser('guest')[0].records[0].chosenAnswer, chosenAnswer);
  const report = context.window.HomeworkApp.resultsReporter.createResultsReporter().buildPayload(session).session.records[0];
  assert.equal(report.chosenAnswer, chosenAnswer);
  assert.deepEqual(plain(report.selectedTokens), ['item:1','reason:2']);
});

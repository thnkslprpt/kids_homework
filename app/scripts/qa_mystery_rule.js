#!/usr/bin/env node
const assert = require('node:assert/strict');
const { test } = require('node:test');
const vm = require('node:vm');
const { loadAppContext } = require('./qa_question_generation.js');
require('./qa_seeded_random.js').installSeededRandom('mystery-rule-regressions');
const context = loadAppContext();
const plain = value => JSON.parse(JSON.stringify(value));
const config = {layout:'mystery-rule', rules:[{a:1,b:2},{a:2,b:0}], hidden:0, min:0, max:10, initialInput:2, maxTests:3, requireReason:false};
const tokens = (changes = {}) => [JSON.stringify({input:2, tests:[2], choice:1, evidence:null, reason:null, ...changes})];
function lab() { assert.ok(context.HomeworkMysteryRule, 'Mystery rule lab must load with the app'); return context.HomeworkMysteryRule; }

test('accepts observationally equivalent rules and rejects a rule contradicted by evidence', () => {
  const model = lab();
  assert.equal(model.evaluate(config, tokens()).isCorrect, true);
  assert.match(model.evaluate(config, tokens()).feedback, /both|more than one|still fit/i);
  const wrong = model.evaluate(config, tokens({tests:[2,3]}));
  assert.equal(wrong.isCorrect, false);
  assert.match(wrong.feedback, /3.*6.*5/);
  assert.equal(model.evaluate(config, tokens({tests:[3],choice:0})).isCorrect, true);
  assert.match(model.evaluate(config, tokens({tests:[3],choice:0})).value, /3 → 5/);
  assert.equal(model.evaluate(config, tokens({tests:[]})).complete, false);
  assert.equal(model.evaluate(config, tokens({choice:null})).complete, false);
});

test('informative-test explanation uses the possibilities remaining BEFORE that test', () => {
  const model = lab();
  const advanced = {...config, requireReason:true};
  const explained = model.evaluate(advanced, tokens({tests:[2,3],choice:0,evidence:1,reason:'different'}));
  assert.equal(explained.isCorrect, true);
  assert.match(explained.feedback, /5.*6/);
  assert.equal(model.evaluate(advanced, tokens({tests:[2,3],choice:0,evidence:0,reason:'different'})).isCorrect, false);
  assert.equal(model.evaluate(advanced, tokens({tests:[3,4],choice:0,evidence:1,reason:'different'})).isCorrect, false);
  assert.equal(model.evaluate(advanced, tokens({tests:[3],choice:0,evidence:0,reason:'same'})).isCorrect, false);
  assert.equal(model.evaluate(advanced, tokens({tests:[3],choice:0})).complete, false);
});

test('bounds, test budgets, malformed rules, and corrupt drafts are rejected', () => {
  const model = lab();
  for (const change of [{tests:[0,1,2,3]}, {tests:[1,1]}, {tests:[11]}, {tests:[-1]}, {tests:[1.5]}, {tests:['3']}, {input:99}, {choice:2}, {evidence:3}, {reason:'guess'}]) {
    assert.equal(model.parseTokens(config, tokens(change)), null, JSON.stringify(change));
  }
  for (const bad of [[], ['bad json'], ['{}'], [...tokens(), 'extra']]) assert.equal(model.parseTokens(config,bad),null);
  for (const change of [{hidden:2}, {rules:[{a:1,b:2},{a:1,b:2}]}, {rules:[{a:1,b:2}]}, {max:0}, {maxTests:4}, {initialInput:99}, {rules:[{a:'1',b:2},{a:2,b:0}]}]) assert.equal(model.isValidConfig({...config,...change}),false);
  assert.ok(model.parseTokens(config, tokens({tests:[],choice:null})));
});

test('all levels produce distinguishable candidates with a valid investigation and normalize for sessions', () => {
  const model = lab();
  for (let level=3; level<=9; level++) {
    const seen = new Set();
    for(let sample=0;sample<30;sample++) {
      const entry = model.createEntry(level), c=entry.interactive;
      assert.ok(model.isValidConfig(c));
      assert.equal(c.rules.length,level<=4?2:level<=6?3:4);
      const input = Array.from({length:c.max-c.min+1},(_,i)=>i+c.min).find(x => new Set(c.rules.map(r=>r.a*x+r.b)).size===c.rules.length);
      assert.notEqual(input,undefined);
      const answer=tokens({input,tests:[input],choice:c.hidden,evidence:c.requireReason?0:null,reason:c.requireReason?'different':null});
      assert.equal(model.evaluate(c,answer).isCorrect,true);
      const q=context.createBankChoiceQuestion(context.normalizeChoiceBankEntry(entry,'math-choice'),'math-choice');
      assert.deepEqual(plain(context.validateHomeworkQuestionList([q],'lab')),[]);
      seen.add(entry.contentId);
    }
    assert.ok(seen.size>3);
  }
  for(const level of [1,2,10]) assert.equal(model.createEntry(level),null);
});

test('labs are discoverable in math sessions, sparse in mixed sessions, and absent from speed rounds', () => {
  lab();
  for (let level=3;level<=9;level++) {
    const qs=context.buildSessionQuestions(30,level,{selectedCategories:['math'],minDifficulty:level,adaptiveReview:false});
    const labs=qs.filter(q=>q.interactive?.layout==='mystery-rule');
    assert.ok(labs.length>=1 && labs.length<=4);
  }
  const mixed=context.buildSessionQuestions(30,6,{selectedCategories:['math','charts-and-graphs'],minDifficulty:6,adaptiveReview:false});
  assert.ok(mixed.filter(q=>q.interactive?.layout==='mystery-rule').length<=2);
  assert.ok(vm.runInContext('buildSpeedRoundQuestions()',context).every(q=>q.interactive?.layout!=='mystery-rule'));
});

test('unfinished and submitted investigations survive checkpoints; invalid saved evidence is rejected', () => {
  lab();
  vm.runInContext(`
    state.questions=buildSessionQuestions(5,3,{selectedCategories:['math'],minDifficulty:3,userId:'guest'});
    state.questions[0]=createBankChoiceQuestion(normalizeChoiceBankEntry(HomeworkMysteryRule.createEntry(3),'math-choice'),'math-choice');
    state.currentUserId='guest';state.totalQuestions=5;state.sessionStartedAt=new Date();elements.quizScreen.hidden=false;
  `,context);
  context.labDraft={index:0,value:'',tokens:tokens({tests:[2],choice:null})};
  vm.runInContext('state.pendingAnswer=labDraft',context);
  const saved=plain(context.buildActiveSessionCheckpoint());
  assert.equal(context.isValidActiveSessionCheckpoint(saved),true);
  assert.deepEqual(saved.state.pendingAnswer.tokens,tokens({tests:[2],choice:null}));
  const corrupt=plain(saved);corrupt.state.pendingAnswer.tokens=tokens({tests:[999]});
  assert.equal(context.isValidActiveSessionCheckpoint(corrupt),false);
  saved.state.questions[0].interactive=plain(config);
  saved.state.pendingAnswer=null;saved.state.answeredCount=1;saved.state.awaitingContinue=true;
  saved.state.answerResults=[false];saved.state.answerSelections=[{value:'Lab answer',tokens:tokens({tests:[3],choice:1})}];saved.state.sessionRecords=[{isCorrect:false}];
  assert.equal(context.isValidActiveSessionCheckpoint(saved),true);
  saved.state.answerSelections[0].tokens=tokens({tests:[999]});
  assert.equal(context.isValidActiveSessionCheckpoint(saved),false);
});

test('submitted checkpoint evidence must be complete and agree with its saved result', () => {
  lab();
  vm.runInContext(`
    state.questions=buildSessionQuestions(5,3,{selectedCategories:['math'],minDifficulty:3,userId:'guest'});
    state.questions[0]=createBankChoiceQuestion(normalizeChoiceBankEntry(HomeworkMysteryRule.createEntry(3),'math-choice'),'math-choice');
    state.questions[0].interactive=${JSON.stringify(config)};
    state.currentUserId='guest';state.totalQuestions=5;state.sessionStartedAt=new Date();elements.quizScreen.hidden=false;
    state.pendingAnswer=null;state.currentIndex=0;state.viewIndex=0;state.answeredCount=1;state.correctCount=1;
    state.awaitingContinue=true;state.answerResults=[true];state.answerSelections=[{value:'Lab answer',tokens:${JSON.stringify(tokens())}}];state.sessionRecords=[{isCorrect:true}];
  `,context);
  const saved=plain(context.buildActiveSessionCheckpoint());
  assert.equal(context.isValidActiveSessionCheckpoint(saved),true);
  for(const changes of [{tests:[],choice:null},{tests:[3],choice:1}]) {
    const corrupt=plain(saved);corrupt.state.answerSelections[0].tokens=tokens(changes);
    assert.equal(context.isValidActiveSessionCheckpoint(corrupt),false);
  }
});

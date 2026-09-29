#!/usr/bin/env node
const assert = require('node:assert/strict');
const {test} = require('node:test');
const vm = require('node:vm');
const {loadAppContext} = require('./qa_question_generation.js');
require('./qa_seeded_random.js').installSeededRandom('design-chance');
const context = loadAppContext();
const plain = x => JSON.parse(JSON.stringify(x));
const tokens = (cells, undo=[]) => [JSON.stringify({cells,undo})];
const config = {layout:'design-chance',kind:'bag',colours:['blue','orange'],totals:[6],conditions:[{colour:'blue',numerator:1,denominator:3}]};
function model() { assert.ok(context.HomeworkDesignChance,'Design the chance must load with the app'); return context.HomeworkDesignChance; }
test('grades exact counts and accepts every arrangement and equivalent fraction',()=>{
  const m=model();
  for(const cells of ['bboooo','oboboo','oooobb']) assert.equal(m.evaluate(config,tokens(cells)).isCorrect,true);
  assert.equal(m.evaluate({...config,conditions:[{colour:'blue',numerator:2,denominator:6}]},tokens('bboooo')).isCorrect,true);
  const wrong=m.evaluate(config,tokens('bbbooo'));
  assert.equal(wrong.complete,true); assert.equal(wrong.isCorrect,false); assert.match(wrong.feedback,/3\/6/);
  assert.equal(m.evaluate(config,tokens('bb....')).complete,false);
  assert.equal(m.evaluate(config,tokens('......')).complete,false);
  for(const [numerator,cells] of [[0,'oooooo'],[1,'bbbbbb']])
    assert.equal(m.evaluate({...config,conditions:[{colour:'blue',numerator,denominator:1}]},tokens(cells)).isCorrect,true);
});
test('checks both conditions and accepts all feasible totals for bags and spinners',()=>{
  const m=model();
  const c={...config,kind:'spinner',colours:['blue','orange','purple'],totals:[4,6,8,12],conditions:[{colour:'blue',numerator:1,denominator:2},{colour:'orange',numerator:1,denominator:3}]};
  assert.equal(m.isValidConfig(c),true);
  assert.equal(m.evaluate(c,tokens('bbboop')).isCorrect,true);
  assert.equal(m.evaluate(c,tokens('bbbbbboooopp')).isCorrect,true);
  assert.equal(m.evaluate(c,tokens('bbbooo')).isCorrect,false);
  assert.equal(m.evaluate(c,tokens('bboo')).isCorrect,false);
});
test('rejects impossible prompts and malformed saved constructions',()=>{
  const m=model();
  for(const patch of [{totals:[5]},{totals:[]},{totals:[6,6]},{totals:[1000]},{kind:'coin'},
    {colours:['blue','blue']},{conditions:[]},{conditions:[{colour:'purple',numerator:1,denominator:3}]},
    {conditions:[{colour:'blue',numerator:1,denominator:0}]},
    {conditions:[{colour:'blue',numerator:0.5,denominator:1}]},
    {conditions:[{colour:'blue',numerator:2,denominator:3},{colour:'orange',numerator:2,denominator:3}]}])
    assert.equal(m.isValidConfig({...config,...patch}),false,JSON.stringify(patch));
  for(const bad of [[],['{'],tokens('bbooo'),tokens('bbxxxx'),tokens('bbpppp'),tokens('bboooo',['bad']),tokens('bboooo',Array(41).fill('......'))])
    assert.equal(m.parseTokens(config,bad),null);
  assert.ok(m.parseTokens(config,tokens('bb....',['......','b.....'])));
});
test('generates achievable varied tasks across the complete progression',()=>{
  const m=model();
  for(let level=1;level<=9;level++) {
    const seen=new Set();
    for(let i=0;i<80;i++) {
      const entry=m.createEntry(level), c=entry.interactive;
      assert.equal(m.isValidConfig(c),true);
      assert.equal(m.evaluate(c,tokens(m.solution(c))).isCorrect,true);
      assert.equal(c.conditions.length,level>=6?2:1);
      assert.equal(c.totals.length>1,level>=8);
      if(level<=2) assert.ok(c.conditions.every(x=>x.denominator===1));
      if(level<=4) {assert.equal(c.kind,'bag'); assert.deepEqual(plain(c.totals),[6]);}
      const q=context.createBankChoiceQuestion(context.normalizeChoiceBankEntry(entry,'probability-choice'),'probability-choice');
      assert.deepEqual(plain(context.validateHomeworkQuestionList([q],'chance')),[]);
      seen.add(entry.contentId);
    }
    assert.ok(seen.size>=4,`diversity at ${level}`);
  }
  for(const level of [0,10,2.5]) assert.equal(m.createEntry(level),null);
});
test('appears in probability and math practice with limits, outside speed rounds',()=>{
  model();
  for(const category of ['math','probability']) for(const level of [1,3,6,9]) {
    const questions=context.buildSessionQuestions(30,level,{selectedCategories:[category],minDifficulty:level,adaptiveReview:false});
    const designs=questions.filter(q=>q.interactive?.layout==='design-chance');
    assert.ok(designs.length>=1&&designs.length<=8,`${category} ${level}: ${designs.length}`);
  }
  assert.ok(vm.runInContext('buildSpeedRoundQuestions()',context).every(q=>q.interactive?.layout!=='design-chance'));
});
test('resumes partial designs and undo, preserves history, rejects forged grades',()=>{
  const m=model(), draft=tokens('bb....',['......','b.....']);
  vm.runInContext(`
    state.questions=buildSessionQuestions(5,3,{selectedCategories:['math'],minDifficulty:3,userId:'guest'});
    state.questions[0]=createBankChoiceQuestion(normalizeChoiceBankEntry(HomeworkDesignChance.createEntry(3),'probability-choice'),'probability-choice');
    state.questions[0].interactive=${JSON.stringify(config)};
    state.currentUserId='guest';state.totalQuestions=5;state.sessionStartedAt=new Date();elements.quizScreen.hidden=false;
    state.pendingAnswer={index:0,value:'',tokens:${JSON.stringify(draft)}};
  `,context);
  const saved=plain(context.buildActiveSessionCheckpoint());
  assert.equal(context.isValidActiveSessionCheckpoint(saved),true);
  assert.equal(context.saveActiveSessionCheckpoint(),true);
  assert.deepEqual(plain(context.loadActiveSessionCheckpoint().state.pendingAnswer.tokens),draft);
  const bad=plain(saved);bad.state.pendingAnswer.tokens=tokens('bb....',['bad']);
  assert.equal(context.isValidActiveSessionCheckpoint(bad),false);
  saved.state.pendingAnswer=null;saved.state.correctCount=1;saved.state.answeredCount=1;saved.state.awaitingContinue=true;
  saved.state.answerResults=[true];saved.state.answerSelections=[{value:'bag',tokens:tokens('bboooo')}];saved.state.sessionRecords=[{isCorrect:true}];
  assert.equal(context.isValidActiveSessionCheckpoint(saved),true);
  saved.state.answerSelections[0].tokens=tokens('bbbooo');
  assert.equal(context.isValidActiveSessionCheckpoint(saved),false);
  const selectedTokens=tokens('bboooo',Array(40).fill('......'));
  const result=m.evaluate(config,selectedTokens);
  const session={id:'chance-history',startedAt:'2026-09-29T12:00:00.000Z',userId:'guest',userName:'Guest',difficulty:3,totalQuestions:1,correctCount:1,
    records:[{skill:'design-chance',questionNumber:1,category:'probability',isCorrect:true,selectedTokens,chosenAnswer:result.value}]};
  const store=context.window.HomeworkApp.sessionHistory.createSessionHistoryStore({adultUserId:'adult',maxSavedSessions:10,storageKey:'chance-test',userProfiles:[{id:'guest'}]});
  assert.equal(store.addSession('guest',session),true);
  assert.deepEqual(plain(store.loadForUser('guest')[0].records[0].selectedTokens),selectedTokens);
  const report=context.window.HomeworkApp.resultsReporter.createResultsReporter().buildPayload(session).session.records[0];
  assert.deepEqual(plain(report.selectedTokens),selectedTokens);
  assert.equal(report.chosenAnswer,result.value);
});

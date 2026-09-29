#!/usr/bin/env node
const assert = require('node:assert/strict');
const {test} = require('node:test');
const vm = require('node:vm');
const {loadAppContext} = require('./qa_question_generation.js');
require('./qa_seeded_random.js').installSeededRandom('shape-architect');
const context = loadAppContext();
const plain = x => JSON.parse(JSON.stringify(x));
const bits = (indices, size=4) => Array.from({length:size*size},(_,i)=>indices.includes(i)?'1':'0').join('');
const tokens = (cells, undo=[]) => [JSON.stringify({cells,undo})];
const rectangle = bits([0,1,2,4,5,6]);
const config = {layout:'shape-architect',size:4,area:6,perimeter:10,symmetry:null,blocked:[],example:rectangle};
function model() { assert.ok(context.HomeworkShapeArchitect,'Shape architect must load with the app'); return context.HomeworkShapeArchitect; }

test('counts exposed edges including holes and rejects diagonal-only connectivity and row wrapping',()=>{
  const m=model();
  assert.deepEqual(plain(m.measure(4,rectangle)),{area:6,perimeter:10,components:1});
  assert.deepEqual(plain(m.measure(4,bits([0,5]))),{area:2,perimeter:8,components:2});
  assert.deepEqual(plain(m.measure(4,bits([3,4]))),{area:2,perimeter:8,components:2});
  assert.deepEqual(plain(m.measure(4,bits([0,1,2,4,6,8,9,10]))),{area:8,perimeter:16,components:1});
});
test('grades constraints instead of matching the example and diagnoses failed conditions',()=>{
  const m=model();
  for(const cells of [rectangle,bits([0,1,4,5,8,9]),bits([5,6,7,9,10,11])]) {
    assert.equal(m.evaluate(config,tokens(cells)).isCorrect,true);
  }
  const wrong=m.evaluate(config,tokens(bits([0,1,2,3,4,5])));
  assert.equal(wrong.complete,true); assert.equal(wrong.isCorrect,false);
  assert.match(wrong.feedback,/Perimeter: 12/);
  const disconnected=m.evaluate({...config,perimeter:null},tokens(bits([0,1,2,8,9,10])));
  assert.equal(disconnected.isCorrect,false); assert.match(disconnected.feedback,/2 connected/);
  assert.equal(m.evaluate(config,tokens('0'.repeat(16))).complete,false);
});
test('symmetry applies to the marked board axis, including the middle row on odd boards',()=>{
  const m=model();
  const vertical={...config,area:4,perimeter:null,symmetry:'vertical',example:bits([1,2,5,6])};
  assert.equal(m.evaluate(vertical,tokens(bits([5,6,9,10]))).isCorrect,true);
  assert.equal(m.evaluate(vertical,tokens(bits([0,1,4,5]))).isCorrect,false);
  const horizontal={...vertical,size:5,symmetry:'horizontal',area:3,example:bits([7,12,17],5)};
  assert.equal(m.evaluate(horizontal,tokens(bits([10,11,12],5))).isCorrect,true);
});
test('rejects impossible configurations, blocked cells, malformed tokens and corrupt undo history',()=>{
  const m=model();
  for(const change of [{area:7},{perimeter:9},{size:6},{symmetry:'diagonal'},{blocked:[0]},{example:'bad'}])
    assert.equal(m.isValidConfig({...config,...change}),false);
  const c={...config,blocked:[15]};
  for(const bad of [[],['null'],['{}'],tokens('1'.repeat(16)),tokens(rectangle,[15]),tokens(rectangle,[-1]),tokens(rectangle,Array(41).fill(0)),tokens(rectangle,[1.5])])
    assert.equal(m.parseTokens(c,bad),null);
  assert.ok(m.parseTokens(c,tokens(rectangle,[1,2,1])));
});
test('every generated target has a valid witness, full progression, and diverse prompts',()=>{
  const m=model();
  for(let level=2;level<=9;level++) {
    const seen=new Set();
    for(let i=0;i<60;i++) {
      const entry=m.createEntry(level), c=entry.interactive;
      assert.equal(m.isValidConfig(c),true);
      assert.equal(m.evaluate(c,tokens(c.example)).isCorrect,true);
      assert.equal(c.size,level>=6?5:4);
      assert.equal(c.perimeter!==null,level>=4);
      assert.equal(c.symmetry!==null,level>=6);
      assert.equal(c.blocked.length>0,level>=8);
      const q=context.createBankChoiceQuestion(context.normalizeChoiceBankEntry(entry,'geometry-choice'),'geometry-choice');
      assert.deepEqual(plain(context.validateHomeworkQuestionList([q],'shape')),[]);
      seen.add(entry.contentId);
    }
    assert.ok(seen.size>5,`diversity at ${level}`);
  }
  for(const level of [1,10,2.5]) assert.equal(m.createEntry(level),null);
});
test('appears in math and geometry sessions with limits and stays out of speed rounds',()=>{
  model();
  for(const category of ['math','geometry']) for(const level of [2,4,6,9]) {
    const questions=context.buildSessionQuestions(30,level,{selectedCategories:[category],minDifficulty:level,adaptiveReview:false});
    const shapes=questions.filter(q=>q.interactive?.layout==='shape-architect');
    assert.ok(shapes.length>=1&&shapes.length<=8,`${category} ${level}: ${shapes.length}`);
  }
  assert.ok(vm.runInContext('buildSpeedRoundQuestions()',context).every(q=>q.interactive?.layout!=='shape-architect'));
});
test('resumes unfinished boards with undo and rejects forged submitted grades',()=>{
  model();
  const draft=tokens(bits([0,1]),[0,1]);
  vm.runInContext(`
    state.questions=buildSessionQuestions(5,3,{selectedCategories:['math'],minDifficulty:3,userId:'guest'});
    state.questions[0]=createBankChoiceQuestion(normalizeChoiceBankEntry(HomeworkShapeArchitect.createEntry(4),'geometry-choice'),'geometry-choice');
    state.questions[0].interactive=${JSON.stringify(config)};
    state.currentUserId='guest';state.totalQuestions=5;state.sessionStartedAt=new Date();elements.quizScreen.hidden=false;
    state.pendingAnswer={index:0,value:'',tokens:${JSON.stringify(draft)}};
  `,context);
  const saved=plain(context.buildActiveSessionCheckpoint());
  assert.equal(context.isValidActiveSessionCheckpoint(saved),true);
  assert.equal(context.saveActiveSessionCheckpoint(),true);
  assert.deepEqual(plain(context.loadActiveSessionCheckpoint().state.pendingAnswer.tokens),draft);
  const bad=plain(saved);bad.state.pendingAnswer.tokens=tokens(rectangle,[99]);
  assert.equal(context.isValidActiveSessionCheckpoint(bad),false);
  saved.state.pendingAnswer=null;saved.state.correctCount=1;saved.state.answeredCount=1;saved.state.awaitingContinue=true;
  saved.state.answerResults=[true];saved.state.answerSelections=[{value:'shape',tokens:tokens(rectangle)}];saved.state.sessionRecords=[{isCorrect:true}];
  assert.equal(context.isValidActiveSessionCheckpoint(saved),true);
  saved.state.answerSelections[0].tokens=draft;
  assert.equal(context.isValidActiveSessionCheckpoint(saved),false);
});
test('history and reports preserve the exact board and maximum undo depth',()=>{
  const m=model(), selectedTokens=tokens(rectangle,Array(40).fill(10));
  const result=m.evaluate(config,selectedTokens);
  const session={id:'shape-history',startedAt:'2026-09-29T12:00:00.000Z',userId:'guest',userName:'Guest',difficulty:4,totalQuestions:1,correctCount:1,
    records:[{skill:'shape-architect',questionNumber:1,category:'geometry',isCorrect:true,selectedTokens,chosenAnswer:result.value}]};
  const store=context.window.HomeworkApp.sessionHistory.createSessionHistoryStore({adultUserId:'adult',maxSavedSessions:10,storageKey:'shape-test',userProfiles:[{id:'guest'}]});
  assert.equal(store.addSession('guest',session),true);
  assert.deepEqual(plain(store.loadForUser('guest')[0].records[0].selectedTokens),selectedTokens);
  const report=context.window.HomeworkApp.resultsReporter.createResultsReporter().buildPayload(session).session.records[0];
  assert.deepEqual(plain(report.selectedTokens),selectedTokens);
  assert.equal(report.chosenAnswer,result.value);
});

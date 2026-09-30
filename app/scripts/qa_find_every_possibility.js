#!/usr/bin/env node
const assert = require('node:assert/strict');
const {test} = require('node:test');
const vm = require('node:vm');
const {loadAppContext} = require('./qa_question_generation.js');
require('./qa_seeded_random.js').installSeededRandom('find-every-possibility');
const context = loadAppContext();
const plain = x => JSON.parse(JSON.stringify(x));
const config = {layout:'find-every-possibility',kind:'outfits',left:['stripe','dot'],right:['cap','sun'],excluded:[]};
const tokens = (pairs, selected=[-1,-1], undo=[]) => [JSON.stringify({pairs,selected,undo})];
function model() { assert.ok(context.HomeworkPossibilities, 'Enumeration model must load with the app'); return context.HomeworkPossibilities; }
test('accepts a complete set in any tray order, rejects omissions and duplicates',()=>{
  const m=model();
  assert.deepEqual(plain(m.solution(config)),['00','01','10','11']);
  assert.equal(m.evaluate(config,tokens(['11','00','10','01'])).isCorrect,true);
  for (const pairs of [['00','01','10'],['00','01','10','10'],['00','01','10','11','00']]) {
    const result=m.evaluate(config,tokens(pairs));
    assert.equal(result.complete,true); assert.equal(result.isCorrect,false);
    assert.ok(result.value); assert.match(result.feedback,/missing|repeated/i);
  }
  assert.equal(m.evaluate(config,tokens([])).complete,false);
  const excluded={...config,excluded:['01']};
  assert.equal(m.evaluate(excluded,tokens(['00','10','11'])).isCorrect,true);
  assert.match(m.evaluate(excluded,tokens(['00','01','10','11'])).feedback,/rule/i);
});
test('distinguishes ordered pairs from unordered selections without replacement',()=>{
  const m=model(), c={...config,kind:'ordered',left:['star','moon','heart'],right:['star','moon','heart']};
  assert.deepEqual(plain(m.solution(c)),['01','02','10','12','20','21']);
  assert.equal(m.evaluate(c,tokens(['01','02','12'])).isCorrect,false);
  const unordered={...c,kind:'unordered'};
  assert.deepEqual(plain(m.solution(unordered)),['01','02','12']);
  assert.equal(m.evaluate(unordered,tokens(['10','20','21'])).isCorrect,true);
  assert.equal(m.evaluate(unordered,tokens(['01','10','02','12'])).isCorrect,false);
  assert.match(m.evaluate(unordered,tokens(['00','01','02','12'])).feedback,/rule/i);
});
test('validates bounded prompts and restores only structurally valid drafts',()=>{
  const m=model();
  for (const patch of [{left:[]},{left:['stripe','stripe']},{right:['unknown']},{kind:'invalid'},{excluded:['99']},{excluded:['00','01']},{left:['star','moon','heart'],right:['star','moon','heart']}])
    assert.equal(m.isValidConfig({...config,...patch}),false);
  for (const bad of [[],['{'],tokens(['99']),tokens(['00'],[2,0]),tokens([],[-1,-1],['99']),tokens(Array(9).fill('00')),tokens([],[-1,-1],Array(21).fill(''))])
    assert.equal(m.parseTokens(config,bad),null);
  assert.deepEqual(plain(m.parseTokens(config,tokens(['01'],[1,0],['','00']))),{pairs:['01'],selected:[1,0],undo:['','00']});
});
test('generates solvable tasks throughout levels 2–8 and validates app questions',()=>{
  const m=model();
  for(let level=2;level<=8;level++) {
    const seen=new Set();
    for(let i=0;i<40;i++) {
      const entry=m.createEntry(level), c=entry.interactive;
      assert.equal(m.isValidConfig(c),true);
      const expected=[];
      for(let a=0;a<c.left.length;a++) for(let b=0;b<c.right.length;b++) {
        if(c.kind!=='outfits' && a===b) continue;
        if(c.kind==='unordered' && a>b) continue;
        if(!c.excluded.includes(`${a}${b}`)) expected.push(`${a}${b}`);
      }
      assert.ok(expected.length>=3&&expected.length<=6);
      assert.deepEqual(plain(m.solution(c)),expected);
      assert.equal(m.evaluate(c,tokens(expected.reverse())).isCorrect,true);
      assert.equal(c.kind,level<=5?'outfits':level===6?'ordered':'unordered');
      assert.equal(c.excluded.length,level===4||level===5||level===8?1:0);
      const q=context.createBankChoiceQuestion(context.normalizeChoiceBankEntry(entry,'probability-choice'),'probability-choice');
      assert.deepEqual(plain(context.validateHomeworkQuestionList([q],'possibilities')),[]);
      seen.add(entry.contentId);
    }
    assert.ok(seen.size>=4);
  }
  for(const level of [1,9,2.5]) assert.equal(m.createEntry(level),null);
});
test('appears sparingly in math and probability, outside timed challenges',()=>{
  model();
  for(const category of ['math','probability']) for(const level of [2,4,6,8]) {
    const qs=context.buildSessionQuestions(30,level,{selectedCategories:[category],minDifficulty:level,adaptiveReview:false});
    const count=qs.filter(q=>q.skill==='find-every-possibility').length;
    assert.ok(count>=1&&count<=4,`${category} ${level}: ${count}`);
  }
  assert.ok(vm.runInContext('buildSpeedRoundQuestions()',context).every(q=>q.skill!=='find-every-possibility'));
});
test('checkpoint validates partial selections, undo, and recomputes submitted grades',()=>{
  const m=model(), draft=tokens(['01'],[1,0],['','00']);
  vm.runInContext(`
    state.questions=buildSessionQuestions(5,2,{selectedCategories:['math'],minDifficulty:2,userId:'guest'});
    state.questions[0]=createBankChoiceQuestion(normalizeChoiceBankEntry(HomeworkPossibilities.createEntry(2),'probability-choice'),'probability-choice');
    state.questions[0].interactive=${JSON.stringify(config)};
    state.currentUserId='guest';state.totalQuestions=5;state.sessionStartedAt=new Date();elements.quizScreen.hidden=false;
    state.pendingAnswer={index:0,value:'',tokens:${JSON.stringify(draft)}};
  `,context);
  const saved=plain(context.buildActiveSessionCheckpoint());
  assert.equal(context.isValidActiveSessionCheckpoint(saved),true);
  assert.equal(context.saveActiveSessionCheckpoint(),true);
  assert.deepEqual(plain(context.loadActiveSessionCheckpoint().state.pendingAnswer.tokens),draft);
  const bad=plain(saved);bad.state.pendingAnswer.tokens=tokens(['99']);
  assert.equal(context.isValidActiveSessionCheckpoint(bad),false);
  saved.state.pendingAnswer=null;saved.state.correctCount=1;saved.state.answeredCount=1;saved.state.awaitingContinue=true;
  saved.state.answerResults=[true];saved.state.answerSelections=[{value:'outfits',tokens:tokens(['00','01','10','11'])}];saved.state.sessionRecords=[{isCorrect:true}];
  assert.equal(context.isValidActiveSessionCheckpoint(saved),true);
  saved.state.answerSelections[0].tokens=tokens(['00']);
  assert.equal(context.isValidActiveSessionCheckpoint(saved),false);
  const selectedTokens=tokens(['00','01','10','11'],[1,1],Array(20).fill('00,01,10,11,00,01,10,11'));
  const result=m.evaluate(config,selectedTokens);
  const session={id:'possibilities-history',startedAt:'2026-09-30T12:00:00.000Z',userId:'guest',userName:'Guest',difficulty:2,totalQuestions:1,correctCount:1,
    records:[{skill:'find-every-possibility',questionNumber:1,category:'probability',isCorrect:true,selectedTokens,chosenAnswer:result.value}]};
  const store=context.window.HomeworkApp.sessionHistory.createSessionHistoryStore({adultUserId:'adult',maxSavedSessions:10,storageKey:'possibilities-test',userProfiles:[{id:'guest'}]});
  assert.equal(store.addSession('guest',session),true);
  assert.deepEqual(plain(store.loadForUser('guest')[0].records[0].selectedTokens),selectedTokens);
  const report=context.window.HomeworkApp.resultsReporter.createResultsReporter().buildPayload(session).session.records[0];
  assert.deepEqual(plain(report.selectedTokens),selectedTokens);
  assert.equal(report.chosenAnswer,result.value);
});

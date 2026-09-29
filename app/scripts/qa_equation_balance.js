#!/usr/bin/env node
const assert = require('node:assert/strict');
const { test } = require('node:test');
const vm = require('node:vm');
const { loadAppContext } = require('./qa_question_generation.js');
require('./qa_seeded_random.js').installSeededRandom('equation-balance');
const context = loadAppContext();
const plain = x => JSON.parse(JSON.stringify(x));
const config = {layout:'equation-balance',left:{a:2,b:3},right:{a:0,b:11},visual:false};
const move = (op,value) => ({op,value:String(value)});
const tokens = (moves=[],amount='1') => [JSON.stringify({moves,amount})];
function model() { assert.ok(context.HomeworkEquationBalance, 'Equation balance must load with the app'); return context.HomeworkEquationBalance; }

test('replays equivalent operations exactly and accepts divide-first and detour solutions', () => {
  const m=model();
  const paths=[
    [move('subtract',3),move('divide',2)],
    [move('divide',2),move('subtract','3/2')],
    [move('add',5),move('subtract',8),move('divide',2)],
    [move('multiply',3),move('subtract',9),move('divide',6)],
  ];
  for(const path of paths) {
    const result=m.evaluate(config,tokens(path));
    assert.equal(result.complete,true);
    assert.equal(result.isCorrect,true);
    assert.match(result.value,/2x \+ 3 = 11/);
    assert.match(result.value,/x = 4/);
  }
  assert.equal(m.formatEquation(m.replay(config,[move('divide',2)]).equation),'x + 3/2 = 11/2');
  assert.equal(m.evaluate(config,tokens()).complete,false);
  assert.equal(m.evaluate(config,tokens([move('subtract',3)])).complete,false);
  const detour=m.applyMove(m.replay(config,[]).equation,move('add',5));
  assert.equal(detour.ok,true);
  assert.match(detour.feedback,/legal|preserv|balanced/i);
});

test('unknowns on both sides, negative coefficients, and reversed isolation preserve the solution', () => {
  const m=model();
  const c={...config,left:{a:3,b:2},right:{a:1,b:10}};
  assert.equal(m.evaluate(c,tokens([move('subtract-x',1),move('subtract',2),move('divide',2)])).isCorrect,true);
  const reversed=[move('subtract-x',3),move('subtract',10),move('divide',-2)];
  assert.equal(m.evaluate(c,tokens(reversed)).isCorrect,true);
  assert.match(m.evaluate(c,tokens(reversed)).value,/4 = x/);
});

test('invalid transformations and corrupt or forged drafts cannot change an equation', () => {
  const m=model(), start=m.replay(config,[]).equation;
  for(const operation of [move('divide',0),move('multiply',0),move('eval','alert(1)'),move('add','1/0'),move('add','NaN'),move('add','1e9')]) {
    const before=plain(start);
    assert.equal(m.applyMove(start,operation).ok,false);
    assert.deepEqual(plain(start),before);
    assert.equal(m.parseTokens(config,tokens([operation])),null);
  }
  assert.match(m.applyMove(start,move('divide',0)).feedback,/zero/i);
  assert.match(m.applyMove(start,move('multiply',0)).feedback,/solution|information/i);
  for(const bad of [[],['{}'],['null'],['bad'],tokens([], 'a'.repeat(100)),tokens(Array(41).fill(move('add',1)))]) assert.equal(m.parseTokens(config,bad),null);
  for(const change of [{left:{a:0,b:3}},{right:{a:2,b:3}},{right:{a:0,b:12}},{left:{a:'2',b:3}},{visual:'yes'}]) assert.equal(m.isValidConfig({...config,...change}),false);
  assert.ok(m.parseTokens(config,tokens([], '3/')),'unfinished operand survives reload');
  assert.equal(m.parseTokens(config,[JSON.stringify({moves:[],amount:'1',equation:{left:{a:1,b:0},right:{a:0,b:4}}})]),null);
});

test('generated equations are solvable at every band and normalize into valid questions', () => {
  const m=model();
  for(let level=3;level<=9;level++) {
    const seen=new Set();
    for(let sample=0;sample<30;sample++) {
      const e=m.createEntry(level), c=e.interactive;
      assert.ok(m.isValidConfig(c));
      const solution=(c.right.b-c.left.b)/(c.left.a-c.right.a);
      assert.ok(Number.isInteger(solution)&&solution>0);
      const path=[];
      if(c.right.a) path.push(move('subtract-x',c.right.a));
      if(c.left.b) path.push(move('subtract',c.left.b));
      if(c.left.a-c.right.a!==1) path.push(move('divide',c.left.a-c.right.a));
      assert.equal(m.evaluate(c,tokens(path)).isCorrect,true);
      const q=context.createBankChoiceQuestion(context.normalizeChoiceBankEntry(e,'algebra-choice'),'algebra-choice');
      assert.deepEqual(plain(context.validateHomeworkQuestionList([q],'equation')),[]);
      seen.add(e.contentId);
    }
    assert.ok(seen.size>3);
  }
  for(const level of [1,2,10]) assert.equal(m.createEntry(level),null);
});

test('equation practice appears in algebra and math sessions and stays out of speed rounds', () => {
  model();
  for(const category of ['math','algebra']) for(const level of [3,5,7,9]) {
    const questions=context.buildSessionQuestions(30,level,{selectedCategories:[category],minDifficulty:level,adaptiveReview:false});
    const equations=questions.filter(q=>q.interactive?.layout==='equation-balance');
    assert.ok(equations.length>=1 && equations.length<=8,`${category} ${level}: ${equations.length}`);
  }
  assert.ok(vm.runInContext('buildSpeedRoundQuestions()',context).every(q=>q.interactive?.layout!=='equation-balance'));
});

test('checkpoints replay drafts and reject corrupt moves or a forged submitted result', () => {
  model();
  vm.runInContext(`
    state.questions=buildSessionQuestions(5,3,{selectedCategories:['math'],minDifficulty:3,userId:'guest'});
    state.questions[0]=createBankChoiceQuestion(normalizeChoiceBankEntry(HomeworkEquationBalance.createEntry(5),'algebra-choice'),'algebra-choice');
    state.questions[0].interactive=${JSON.stringify(config)};
    state.currentUserId='guest';state.totalQuestions=5;state.sessionStartedAt=new Date();elements.quizScreen.hidden=false;
    state.pendingAnswer={index:0,value:'',tokens:${JSON.stringify(tokens([move('divide',2)],'3/'))}};
  `,context);
  const saved=plain(context.buildActiveSessionCheckpoint());
  assert.equal(context.isValidActiveSessionCheckpoint(saved),true);
  assert.deepEqual(saved.state.pendingAnswer.tokens,tokens([move('divide',2)],'3/'));
  const bad=plain(saved); bad.state.pendingAnswer.tokens=tokens([move('divide',0)]);
  assert.equal(context.isValidActiveSessionCheckpoint(bad),false);
  saved.state.pendingAnswer=null;saved.state.correctCount=1;saved.state.answeredCount=1;saved.state.awaitingContinue=true;
  saved.state.answerResults=[true];saved.state.answerSelections=[{value:'x = 4',tokens:tokens([move('subtract',3),move('divide',2)])}];saved.state.sessionRecords=[{isCorrect:true}];
  assert.equal(context.isValidActiveSessionCheckpoint(saved),true);
  saved.state.answerSelections[0].tokens=tokens([move('subtract',3)]);
  assert.equal(context.isValidActiveSessionCheckpoint(saved),false);
});

test('maximum-length legal histories remain resumable without weakening other draft bounds', () => {
  const m=model();
  // 38 reversible detours followed by the two solving moves reaches the UI limit.
  const moves=Array.from({length:38},(_,i)=>move(i%2?'subtract':'add','000000000000000000000001'));
  const draft=tokens(moves);
  assert.ok(draft[0].length>1000);
  assert.ok(m.parseTokens(config,draft));
  vm.runInContext(`
    state.questions=buildSessionQuestions(5,3,{selectedCategories:['math'],minDifficulty:3,userId:'guest'});
    state.questions[0]=createBankChoiceQuestion(normalizeChoiceBankEntry(HomeworkEquationBalance.createEntry(5),'algebra-choice'),'algebra-choice');
    state.questions[0].interactive=${JSON.stringify(config)};
    state.currentIndex=0;state.viewIndex=0;state.answeredCount=0;state.correctCount=0;state.awaitingContinue=false;
    state.answerResults=[];state.answerSelections=[];state.sessionRecords=[];
    state.currentUserId='guest';state.totalQuestions=5;state.sessionStartedAt=new Date();elements.quizScreen.hidden=false;
    state.pendingAnswer={index:0,value:'',tokens:${JSON.stringify(draft)}};
  `,context);
  const saved=plain(context.buildActiveSessionCheckpoint());
  assert.equal(context.isValidActiveSessionCheckpoint(saved),true);
  assert.equal(context.saveActiveSessionCheckpoint(),true);
  assert.deepEqual(plain(context.loadActiveSessionCheckpoint().state.pendingAnswer.tokens),draft);
  saved.state.pendingAnswer.tokens=['x'.repeat(6001)];
  assert.equal(context.isValidActiveSessionCheckpoint(saved),false);
  assert.equal(context.isValidPendingAnswer({index:0,value:'',tokens:draft},0,5),false);
  const full=[...moves,move('subtract',3),move('divide',2)];
  assert.equal(m.evaluate(config,tokens(full)).isCorrect,true);
});

test('completed history and report payload retain the full structured move sequence', () => {
  const m=model();
  const moves=[...Array.from({length:38},(_,i)=>move(i%2?'subtract':'add',1)),move('subtract',3),move('divide',2)];
  const selectedTokens=tokens(moves), result=m.evaluate(config,selectedTokens);
  const session={id:'equation-history',startedAt:'2026-09-29T12:00:00.000Z',userId:'guest',userName:'Guest',difficulty:5,totalQuestions:1,correctCount:1,
    records:[{skill:'equation-balance',questionNumber:1,category:'algebra',isCorrect:true,selectedTokens,chosenAnswer:result.value}]};
  const store=context.window.HomeworkApp.sessionHistory.createSessionHistoryStore({adultUserId:'adult',maxSavedSessions:10,storageKey:'equation-test-history',userProfiles:[{id:'guest'}]});
  assert.equal(store.addSession('guest',session),true);
  const stored=store.loadForUser('guest')[0].records[0];
  assert.deepEqual(plain(stored.selectedTokens),selectedTokens);
  assert.equal(m.evaluate(config,stored.selectedTokens).isCorrect,true);
  const reporter=context.window.HomeworkApp.resultsReporter.createResultsReporter();
  const reported=reporter.buildPayload(session).session.records[0];
  assert.deepEqual(plain(reported.selectedTokens),selectedTokens);
  assert.equal(reported.chosenAnswer,result.value);
});

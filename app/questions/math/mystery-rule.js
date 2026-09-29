// Finite arithmetic rules and input-only observations stay reproducible after JSON recovery.
globalThis.HomeworkMysteryRule = (() => {
  const reasons = {
    different: 'The remaining rules predicted different outputs for this input.',
    same: 'The remaining rules predicted the same output for this input.',
    larger: 'A larger input always proves which rule is right.',
  };
  const output = (rule, input) => rule.a * input + rule.b;
  const label = rule => rule.a === 1 ? (rule.b ? `Add ${rule.b}` : 'Keep the input unchanged')
    : `Multiply by ${rule.a}${rule.b ? `, then add ${rule.b}` : ''}`;
  const validInput = (c, x) => Number.isInteger(x) && x >= c.min && x <= c.max;
  function isValidConfig(c) {
    return Boolean(c && c.layout === 'mystery-rule' && Number.isInteger(c.min) && c.min >= 0 &&
      Number.isInteger(c.max) && c.max > c.min && c.max <= 20 && validInput(c,c.initialInput) &&
      c.maxTests === 3 && typeof c.requireReason === 'boolean' &&
      Array.isArray(c.rules) && c.rules.length >= 2 && c.rules.length <= 4 &&
      c.rules.every(r => r && Number.isInteger(r.a) && r.a >= 1 && r.a <= 5 &&
        Number.isInteger(r.b) && r.b >= 0 && r.b <= 20) &&
      new Set(c.rules.map(r=>`${r.a},${r.b}`)).size === c.rules.length &&
      Number.isInteger(c.hidden) && c.hidden >= 0 && c.hidden < c.rules.length &&
      // Start with real ambiguity; the learner chooses the evidence that resolves it.
      c.rules.filter(r=>output(r,c.initialInput)===output(c.rules[c.hidden],c.initialInput)).length >= 2);
  }
  function initial(c) { return {input:c.initialInput, tests:[], choice:null, evidence:null, reason:null}; }
  function parseTokens(c, tokens) {
    if (!isValidConfig(c) || !Array.isArray(tokens) || tokens.length !== 1 ||
        typeof tokens[0] !== 'string' || tokens[0].length > 1000) return null;
    let answer;
    try { answer=JSON.parse(tokens[0]); } catch { return null; }
    if (!answer || !validInput(c,answer.input) || !Array.isArray(answer.tests) ||
        answer.tests.length > c.maxTests || !answer.tests.every(x=>validInput(c,x)) ||
        new Set(answer.tests).size !== answer.tests.length ||
        !(answer.choice === null || (Number.isInteger(answer.choice) && answer.choice >= 0 && answer.choice < c.rules.length)) ||
        !(answer.evidence === null || (Number.isInteger(answer.evidence) && answer.evidence >= 0 && answer.evidence < answer.tests.length)) ||
        !(answer.reason === null || Object.hasOwn(reasons,answer.reason))) return null;
    return {input:answer.input,tests:[...answer.tests],choice:answer.choice,evidence:answer.evidence,reason:answer.reason};
  }
  function remaining(c, tests) {
    return c.rules.map((_,i)=>i).filter(i => [c.initialInput,...tests].every(x=>output(c.rules[i],x)===output(c.rules[c.hidden],x)));
  }
  function informative(c, tests, index) {
    const before=remaining(c,tests.slice(0,index));
    return before.length>1 && new Set(before.map(i=>output(c.rules[i],tests[index]))).size>1;
  }
  function evaluate(c, tokens) {
    const a=parseTokens(c,tokens);
    const incomplete=feedback=>({complete:false,isCorrect:false,value:'',feedback});
    if (!a) return incomplete('This investigation could not be read.');
    if (!a.tests.length) return incomplete('Run at least one test before checking your rule.');
    if (a.choice === null) return incomplete('Choose a rule that fits every observed output.');
    if (c.requireReason && (a.evidence === null || a.reason === null)) return incomplete('Choose an informative test from your history and explain why it helped.');
    const observed=x=>`${x} → ${output(c.rules[c.hidden],x)}`;
    const value=`Rule: ${label(c.rules[a.choice])}. Starting evidence: ${observed(c.initialInput)}. Tests: ${a.tests.map(observed).join('; ')}.` +
      (c.requireReason ? ` Informative test: ${observed(a.tests[a.evidence])}. Reason: ${reasons[a.reason]}` : '');
    const finish=(isCorrect,feedback)=>({complete:true,isCorrect,value,feedback});
    const mismatch=[c.initialInput,...a.tests].find(x=>output(c.rules[a.choice],x)!==output(c.rules[c.hidden],x));
    if (mismatch !== undefined) return finish(false,`For input ${mismatch}, your rule predicts ${output(c.rules[a.choice],mismatch)}, but the machine gave ${output(c.rules[c.hidden],mismatch)}. A rule must fit every observed row.`);
    if (c.requireReason && !informative(c,a.tests,a.evidence)) {
      const before=remaining(c,a.tests.slice(0,a.evidence));
      return finish(false,before.length === 1
        ? 'Your rule fits, but only one possibility remained before this test. Choose the earlier test that separated the possibilities.'
        : 'Your rule fits, but the remaining rules predicted the same output for your chosen test. An informative test needs different predictions.');
    }
    if (c.requireReason && a.reason !== 'different') return finish(false,'Your rule fits. The test helped because the remaining rules predicted different outputs, so the observed output could rule some out.');
    const fits=remaining(c,a.tests);
    let explanation = 'The other candidates disagree with at least one observed output.';
    if (c.requireReason) {
      const input = a.tests[a.evidence];
      const before = remaining(c, a.tests.slice(0, a.evidence));
      const predictions = before.map(i => `${label(c.rules[i])}: ${output(c.rules[i], input)}`).join('; ');
      explanation = `Before test ${a.evidence + 1}, input ${input} had different predictions (${predictions}). The observed output ${output(c.rules[c.hidden], input)} ruled out the predictions that did not match.`;
    }
    return finish(true,fits.length>1
      ? `More than one rule still fits your evidence: ${fits.map(i=>label(c.rules[i])).join('; ')}. Your choice is valid; these observations do not tell them apart.`
      : `Your rule fits every observation. ${explanation}`);
  }
  function createEntry(level) {
    if (!Number.isInteger(level) || level<3 || level>9) return null;
    const {randomInt,shuffle}=globalThis.HomeworkQuestionUtils;
    const count=level<=4?2:level<=6?3:4;
    const pivot=level===3?2:randomInt(1,4);
    const offset=level===3?0:randomInt(0,level>=7?6:3);
    const rules=shuffle(Array.from({length:count},(_,i)=>({a:i+1,b:(count-i-1)*pivot+offset})));
    const c={layout:'mystery-rule',rules,hidden:randomInt(0,count-1),min:0,max:10,initialInput:pivot,maxTests:3,requireReason:level>=7};
    const answer='Any candidate consistent with every observed output' + (c.requireReason ? ', plus a test that separated the then-remaining rules and its explanation.' : '.');
    return {mode:'interactive',difficulty:level,category:'math',skill:'mystery-rule',
      contentId:`mystery-rule-${level}-${rules.map(r=>`${r.a}-${r.b}`).join('_')}-${c.hidden}`,
      question:'Mystery rule lab: which rule fits the evidence?',
      extraText:'The machine uses one of the displayed rules. Choose whole-number inputs from 0 to 10. You have up to three free tests; using them does not lower your score. If several rules still fit, any of them is a valid choice.',
      reviewText:`Candidate rules: ${rules.map(label).join('; ')}. Starting evidence: ${pivot} → ${output(rules[c.hidden],pivot)}.`,
      answer,answerLabel:answer,interactive:c,
      explanation:'Compare the output each candidate predicts with every observed row. A helpful test gives different predictions for rules that were still possible.',
      hints:['Try predicting what each candidate would do to the same input. Choose an input where their predictions differ.',
        'One matching row does not prove a rule. Keep any candidate that fits every observation.'],
    };
  }
  return {reasons,output,label,isValidConfig,initial,parseTokens,remaining,informative,evaluate,createEntry};
})();

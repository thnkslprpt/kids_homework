// Authored transformations: one invalid transition, with valid work after it.
globalThis.HomeworkFirstWrongStep = (() => {
  const utils = globalThis.HomeworkQuestionUtils;
  const pick = values => values[Math.floor(Math.random() * values.length)];
  const integer = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
  const escape = value => String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]);
  function fraction(n, d) {
    let a = n, b = d;
    while (b) [a, b] = [b, a % b];
    return d / a === 1 ? String(n / a) : `${n / a} / ${d / a}`;
  }
  function arithmetic(family) {
    const a = integer(3, 8), b = integer(3, 8), c = integer(2, 6);
    if (family === 'regrouping') {
      const left = integer(2, 5) * 10 + integer(6, 9), right = integer(1, 2) * 10 + integer(4, 9);
      const tens = Math.floor(left / 10) * 10 + Math.floor(right / 10) * 10, ones = left % 10 + right % 10;
      return {family, original: `${left} + ${right}`, first: 2,
        good: [`${tens} + ${ones}`, `${tens + 10} + ${ones - 10}`, String(left + right)],
        bad: [`${tens} + ${ones}`, `${tens} + ${ones - 10}`, String(left + right - 10)],
        rule: 'Regroup ten ones as one ten. When the ones decrease by ten, the tens must increase by ten.'};
    }
    if (family === 'subtraction') {
      const start = a + b + c + 10;
      return {family, original: `${start} − (${b} + ${c})`, first: 1,
        good: [`${start} − ${b} − ${c}`, `${start - b} − ${c}`, String(start - b - c)],
        bad: [`${start} − ${b} + ${c}`, `${start - b} + ${c}`, String(start - b + c)],
        rule: 'Subtracting a sum means subtracting both parts.'};
    }
    if (family === 'order-of-operations') {
      return {family, original: `${a} + ${b} × (${c} + 1)`, first: 2,
        good: [`${a} + ${b} × ${c + 1}`, `${a} + ${b * (c + 1)}`, String(a + b * (c + 1))],
        bad: [`${a} + ${b} × ${c + 1}`, `${a + b} × ${c + 1}`, String((a + b) * (c + 1))],
        rule: 'After the brackets, multiply before adding.'};
    }
    return {family, original: `${a} × (${b} + ${c})`, first: 1,
      good: [`${a} × ${b} + ${a} × ${c}`, `${a * b} + ${a * c}`, String(a * (b + c))],
      bad: [`${a} × ${b} + ${c}`, `${a * b} + ${c}`, String(a * b + c)],
      rule: 'Multiply every term inside the brackets by the outside factor.'};
  }
  function fractions(family) {
    const a = integer(1, 3), b = integer(1, 3), d = integer(4, 7), e = d + integer(1, 3);
    if (family === 'fraction-addition') {
      return {family, original: `${a} / ${d} + ${b} / ${d}`, first: 1,
        good: [`(${a} + ${b}) / ${d}`, `${a + b} / ${d}`, fraction(a + b, d)],
        bad: [`(${a} + ${b}) / (${d} + ${d})`, `${a + b} / ${2 * d}`, fraction(a + b, 2 * d)],
        rule: 'When adding fractions with the same denominator, add the numerators and keep the denominator: the parts stay the same size.'};
    }
    if (family === 'fraction-multiplication') {
      return {family, original: `(${a} / ${d}) × (${b} / ${e})`, first: 1,
        good: [`(${a} × ${b}) / (${d} × ${e})`, `${a * b} / ${d * e}`, fraction(a * b, d * e)],
        bad: [`(${a} × ${b}) / (${d} + ${e})`, `${a * b} / ${d + e}`, fraction(a * b, d + e)],
        rule: 'Multiply the numerators together and the denominators together.'};
    }
    return {family, original: `(${a} / ${d}) ÷ (${b} / ${e})`, first: 1,
      good: [`(${a} / ${d}) × (${e} / ${b})`, `${a * e} / ${d * b}`, fraction(a * e, d * b)],
      bad: [`(${a} / ${d}) × (${b} / ${e})`, `${a * b} / ${d * e}`, fraction(a * b, d * e)],
      rule: 'Divide by a fraction by multiplying by its reciprocal. Flip the divisor only.'};
  }
  function algebra(family) {
    const a = integer(2, 5), b = integer(2, 7), x = integer(2, 9);
    if (family === 'equation-balance') {
      const rhs = a * x + b;
      return {family, original: `${a}x + ${b} = ${rhs}`, first: 1,
        good: [`${a}x = ${rhs} − ${b}`, `${a}x = ${a * x}`, `x = ${x}`],
        bad: [`${a}x = ${rhs} + ${b}`, `${a}x = ${rhs + b}`, `x = ${fraction(rhs + b, a)}`],
        rule: `Subtract ${b} from both sides to remove + ${b}. Equality requires the same operation on both sides.`};
    }
    if (family === 'algebra-distribution') {
      const rhs = a * (x + b);
      return {family, original: `${a} × (x + ${b}) = ${rhs}`, first: 1,
        good: [`${a}x + ${a * b} = ${rhs}`, `${a}x = ${rhs - a * b}`, `x = ${x}`],
        bad: [`${a}x + ${b} = ${rhs}`, `${a}x = ${rhs - b}`, `x = ${fraction(rhs - b, a)}`],
        rule: `Distribute ${a} to both x and ${b}, including the constant term.`};
    }
    const c = a + integer(1, 3), rhs = (c - a) * x + b;
    return {family, original: `${c}x + ${b} = ${a}x + ${rhs}`, first: 2,
      good: [`${c - a}x + ${b} = ${rhs}`, `${c - a}x = ${rhs - b}`, `x = ${x}`],
      bad: [`${c - a}x + ${b} = ${rhs}`, `${c - a}x = ${rhs + b}`, `x = ${fraction(rhs + b, c - a)}`],
      rule: `Subtract ${a}x from both sides, then subtract ${b} from both sides to isolate the x term.`};
  }
  function createEntry(level) {
    if (!Number.isInteger(level) || level < 2 || level > 10) return null;
    const families = {2: ['regrouping'], 3: ['regrouping', 'subtraction'],
      4: ['order-of-operations'], 5: ['order-of-operations', 'distribution'],
      6: ['fraction-addition'], 7: ['fraction-multiplication', 'fraction-division'],
      8: ['equation-balance'], 9: ['algebra-distribution'], 10: ['unknowns-both-sides']};
    const family = pick(families[level]);
    const template = level >= 8 ? algebra(family) : level >= 6 ? fractions(family) : arithmetic(family);
    // Correct work occurs at every level; final calculation errors vary the position.
    const variant = pick(['template', 'template', 'final', 'correct']);
    const firstWrongStep = variant === 'correct' ? null : variant === 'final' ? 3 : template.first;
    const steps = variant === 'correct' ? [...template.good] : variant === 'final'
      ? [...template.good.slice(0, 2), template.bad[2]] : [...template.bad];
    const correctResult = template.good[2];
    const work = {family, original: template.original, steps, firstWrongStep, correctResult};
    const items = steps.map((expression, index) => ({label: `Step ${index + 1}`, summary: `Step ${index + 1}: ${expression}`,
      html: `<span class="wrong-step-expression" dir="ltr">${escape(expression)}</span>`}));
    items.push({label: 'All steps are correct', summary: 'All steps are correct'});
    const repairStep = firstWrongStep || 3;
    const repair = expression => ({step: repairStep, expression, summary: `Replace the selected step with ${expression}`});
    const noRepair = {step: null, expression: null, summary: 'No repair needed — every step is valid'};
    const resultValue = level >= 8 ? correctResult.slice(4) : correctResult;
    const wrongRepair = offset => repair(level >= 8 ? `x = (${resultValue}) + ${offset}` : `(${resultValue}) + ${offset}`);
    const correctRepair = firstWrongStep === null ? noRepair : repair(template.good[firstWrongStep - 1]);
    const reasons = utils.shuffle(firstWrongStep === null ? [noRepair, wrongRepair(1), wrongRepair(2)] : [correctRepair, wrongRepair(1), noRepair]);
    const answerItemIndex = firstWrongStep === null ? 3 : firstWrongStep - 1;
    const answerReasonIndex = reasons.indexOf(correctRepair);
    const explanation = firstWrongStep === null
      ? `All three steps are valid. ${template.rule} No repair is needed. The result is ${correctResult}.`
      : `The first invalid transition is into step ${firstWrongStep}. ${variant === 'final' ? 'The earlier steps are valid; the final calculation is incorrect.' : template.rule} ${correctRepair.summary}. ${firstWrongStep < 3 ? 'The later lines correctly follow the mistaken line, but do not fix the original error. ' : ''}The corrected work is: ${[template.original, ...template.good].join(' → ')}. The result is ${correctResult}.`;
    const answerLabel = `${items[answerItemIndex].summary} — ${correctRepair.summary}`;
    return {
      mode: 'interactive', difficulty: level, gradeMin: level, gradeMax: level,
      topic: 'Find the first wrong step', skill: 'math.first-wrong-step', reviewStatus: 'template-verified',
      contentId: utils.stableContentId('first-wrong-step', `${level}|${JSON.stringify(work)}`),
      question: 'Find the first wrong step. Which step first stops following correctly from the line before it?',
      answer: answerLabel, answerLabel,
      visualHtml: `<div class="wrong-step-start"><strong>Start</strong><span class="wrong-step-expression" dir="ltr">${escape(template.original)}</span></div>`,
      visualSummary: `Start: ${template.original}. ${steps.map((line, i) => `Step ${i + 1}: ${line}.`).join(' ')}`,
      reviewText: explanation, explanation,
      interactive: {type: 'first-wrong-step', layout: 'paired-select', work, items, reasons,
        answerIndexes: [answerItemIndex], answerItemIndex, answerReasonIndex,
        prompt: 'Read down from Start. Choose the first invalid step and its replacement. If every step is valid, choose “All steps are correct” and “No repair needed”.',
        itemHeading: 'Worked steps', reasonHeading: 'Repair', itemName: 'step', reasonName: 'repair', answerJoiner: ' — ', checkLabel: 'Check steps'},
    };
  }
  return {createEntry};
})();

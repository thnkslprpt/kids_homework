// Rules are data, rather than closures, so unfinished examples survive JSON checkpoints.
(() => {
  const { randomInt, randomChoice } = globalThis.HomeworkQuestionUtils;
  const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
  const whole = value => Number.isSafeInteger(value) && value >= 0;
  const positive = value => whole(value) && value > 0 && value <= 100;

  function validCondition(condition) {
    if (!condition || typeof condition !== 'object') return false;
    switch (condition.kind) {
      case 'multiple':
      case 'not-multiple':
      case 'square-not-multiple': return positive(condition.divisor);
      case 'odd-composite': return true;
      case 'product-not-divisor': return positive(condition.divisor);
      case 'expression': return positive(condition.coefficient) && whole(condition.constant) &&
        whole(condition.min) && whole(condition.max) && condition.min <= condition.max && condition.max <= 100000;
      default: return false;
    }
  }

  function isValidRule(rule) {
    return Boolean(rule && rule.kind === 'whole-number-example' && whole(rule.min) &&
      whole(rule.max) && rule.min < rule.max && rule.max <= 10000 &&
      Array.isArray(rule.conditions) && rule.conditions.length >= 1 &&
      rule.conditions.length <= 3 && rule.conditions.every(validCondition));
  }

  function isComposite(value) {
    if (value < 4) return false;
    for (let divisor = 2; divisor * divisor <= value; divisor++) {
      if (value % divisor === 0) return true;
    }
    return false;
  }

  function describe(condition) {
    switch (condition.kind) {
      case 'multiple': return `Divisible by ${condition.divisor}`;
      case 'not-multiple': return `Not divisible by ${condition.divisor}`;
      case 'expression': return `${condition.min} ≤ ${condition.coefficient} × n + ${condition.constant} ≤ ${condition.max}`;
      case 'odd-composite': return 'Odd and composite (greater than 1, with more than two factors)';
      case 'square-not-multiple': return `A perfect square that is not divisible by ${condition.divisor}`;
      case 'product-not-divisor': return `n × (n + 1) is not divisible by ${condition.divisor}`;
      default: return 'Unsupported condition';
    }
  }

  function failure(condition, value) {
    switch (condition.kind) {
      case 'multiple': return value % condition.divisor === 0 ? '' : `${value} is not divisible by ${condition.divisor}.`;
      case 'not-multiple': return value % condition.divisor !== 0 ? '' : `${value} is divisible by ${condition.divisor}; it must not be.`;
      case 'expression': {
        const result = condition.coefficient * value + condition.constant;
        return result >= condition.min && result <= condition.max ? '' :
          `${condition.coefficient} × ${value} + ${condition.constant} = ${result}; the result must be from ${condition.min} to ${condition.max}, including both ends.`;
      }
      case 'odd-composite': return value % 2 === 1 && isComposite(value) ? '' :
        `${value} must be odd and composite. A composite number is greater than 1 and has more than two factors.`;
      case 'square-not-multiple': return Number.isInteger(Math.sqrt(value)) && value % condition.divisor !== 0 ? '' :
        `${value} must be a perfect square and must not be divisible by ${condition.divisor}.`;
      case 'product-not-divisor': {
        const result = value * (value + 1);
        return result % condition.divisor !== 0 ? '' :
          `${value} × ${value + 1} = ${result}, which is divisible by ${condition.divisor}. This does not disprove the claim.`;
      }
      default: return 'Unsupported condition.';
    }
  }

  function evaluate(rule, value) {
    if (!isValidRule(rule)) return { isCorrect: false, feedback: 'This example has an invalid rule.' };
    if (!whole(value)) return { isCorrect: false, feedback: 'Use a whole number: 0, 1, 2, … with no fractional part.' };
    // Bounds also keep factorization quick, even when a learner pastes a huge integer.
    if (value < rule.min || value > rule.max) {
      return { isCorrect: false, feedback: `${value} must be from ${rule.min} to ${rule.max}, including both ends.` };
    }
    const failures = [];
    rule.conditions.forEach(condition => {
      const message = failure(condition, value);
      if (message) failures.push(message);
    });
    return { isCorrect: failures.length === 0, feedback: failures.length ? failures.join(' ') : `${value} satisfies every condition. Other examples can work too.` };
  }

  function createQuestion(difficulty) {
    const level = Math.max(1, Math.min(10, Math.round(Number(difficulty) || 1)));
    if (level < 2) return null;
    let min, max, witness, conditions, claim = '';
    let hint = 'Start with a number in the range. Check each condition before submitting.';
    if (level <= 3) {
      const divisor = level === 2 ? 2 : randomChoice([3, 4, 5, 10]);
      witness = divisor * randomInt(2, level === 2 ? 8 : 10);
      min = Math.max(0, witness - divisor - 1);
      max = witness + divisor + 1;
      conditions = [{ kind: 'multiple', divisor }];
      hint = `Count in steps of ${divisor}, then choose a number in the range.`;
    } else if (level === 4) {
      const [first, second, common] = randomChoice([[3, 4, 12], [2, 5, 10], [4, 6, 12], [3, 5, 15]]);
      witness = common * randomInt(2, 6);
      min = witness - common - 1;
      max = witness + common + 1;
      conditions = [{ kind: 'multiple', divisor: first }, { kind: 'multiple', divisor: second }];
      hint = `List multiples of ${first}. Which are also multiples of ${second}?`;
    } else if (level === 5) {
      const divisor = randomChoice([3, 5, 7]);
      witness = divisor * randomChoice([3, 5, 7]);
      min = Math.max(0, witness - 2 * divisor);
      max = witness + 2 * divisor;
      conditions = [{ kind: 'multiple', divisor }, { kind: 'not-multiple', divisor: 2 }];
      hint = `List multiples of ${divisor} in the range, then remove the even ones.`;
    } else if (level <= 7) {
      const coefficient = randomInt(2, level === 6 ? 5 : 9);
      const constant = randomInt(1, 12);
      witness = randomInt(5, 15);
      min = 0;
      max = 30;
      conditions = [{ kind: 'expression', coefficient, constant,
        min: coefficient * (witness - 2) + constant, max: coefficient * (witness + 2) + constant }];
      if (level === 7) conditions.push({ kind: 'multiple', divisor: 2 });
      if (level === 7 && witness % 2) witness += 1;
      hint = `Try a value for n, multiply it by ${coefficient}, then add ${constant}. Compare the result with both bounds.`;
    } else if (level === 8) {
      claim = 'Every odd number greater than 1 is prime.';
      witness = randomChoice([9, 15, 21, 25]); min = 3; max = randomChoice([35, 45, 55]);
      conditions = [{ kind: 'odd-composite' }];
      hint = 'Look for an odd number made by multiplying two whole numbers greater than 1.';
    } else if (level === 9) {
      const divisor = randomChoice([2, 3, 5]);
      claim = `Every perfect square is divisible by ${divisor}.`;
      witness = divisor === 2 ? 9 : 16; min = 4; max = randomChoice([49, 64, 81, 100]);
      conditions = [{ kind: 'square-not-multiple', divisor }];
      hint = 'Square a whole number, then check whether the result divides evenly by the claimed divisor.';
    } else {
      const divisor = randomChoice([4, 6]);
      claim = `For every whole number n, n × (n + 1) is divisible by ${divisor}.`;
      witness = 1; min = 1; max = randomInt(15, 30);
      conditions = [{ kind: 'product-not-divisor', divisor }];
      hint = 'Try consecutive pairs. A product that does not divide evenly disproves the claim.';
    }
    const rule = { kind: 'whole-number-example', min, max, conditions };
    if (!evaluate(rule, witness).isCorrect) throw new Error('Build an example generated an invalid witness.');
    const labels = [`Whole number from ${min} to ${max} (including both ends)`, ...conditions.map(describe)];
    const questionText = claim ? `Build a counterexample to disprove this claim: “${claim}”` : 'Build an example that satisfies every condition.';
    return {
      type: 'math-input', mode: 'input', difficulty: level, skill: 'build-example',
      questionText, displayText: '',
      extraText: `${level === 6 || level === 7 || level === 10 ? 'Type a whole-number value for n' : 'Type any whole number'} that works. You can edit it before Submit.`,
      answerValue: witness, answerLabel: String(witness), answerRule: rule,
      visualHtml: `<ul class="build-example-conditions" aria-label="Conditions">${labels.map(label => `<li>${escapeHtml(label)}</li>`).join('')}</ul>`,
      reviewText: labels.join('; '),
      successMessage: 'Your example works!',
      hints: [hint, 'More than one answer works. Test your choice against every condition.'],
      isHebrew: false,
    };
  }

  globalThis.HomeworkBuildExample = { createQuestion, evaluate, isValidRule };
})();

const ALGEBRA_QUESTIONS = (() => {
  function clampDifficulty(value) {
    const level = Number.parseInt(value, 10);
    if (!Number.isFinite(level)) {
      return 3;
    }

    return Math.min(10, Math.max(1, level));
  }

  function randomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  function randomChoice(items) {
    return items[randomInt(0, items.length - 1)];
  }

  function shuffleArray(items) {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }

    return copy;
  }

  function uniqueStrings(values) {
    return Array.from(new Set(values.map((value) => String(value))));
  }

  function makeChoiceOptions(answer, distractors) {
    const normalizedAnswer = String(answer);
    const options = uniqueStrings([normalizedAnswer, ...distractors.map((value) => String(value))]);
    const fallbackDistractors = ["No solution", "All real numbers", "Not enough information", "0", "1", "-1"];

    fallbackDistractors.forEach((fallback) => {
      if (options.length < 4 && fallback !== normalizedAnswer && !options.includes(fallback)) {
        options.push(fallback);
      }
    });

    if (options.length < 4 || !options.includes(normalizedAnswer)) {
      throw new Error("Algebra questions must have exactly 4 unique options including the answer.");
    }

    return shuffleArray(options.slice(0, 4));
  }

  function makeNumericDistractors(answer, candidates = []) {
    const normalizedAnswer = String(answer);
    const numericAnswer = Number(answer);
    const orderedCandidates = [...candidates];

    if (Number.isFinite(numericAnswer)) {
      [
        1,
        -1,
        2,
        -2,
        3,
        -3,
        4,
        -4,
        5,
        -5,
        6,
        -6,
        8,
        -8,
        10,
        -10,
        numericAnswer || 2,
        -(numericAnswer || 2),
      ].forEach((delta) => orderedCandidates.push(numericAnswer + delta));
    }

    return uniqueStrings(orderedCandidates)
      .filter((value) => value !== normalizedAnswer)
      .slice(0, 3);
  }

  function makeEntry({ question, answer, options, difficulty, family }) {
    const normalizedOptions = uniqueStrings(options);
    const normalizedAnswer = String(answer);
    const normalizedDifficulty = clampDifficulty(difficulty);

    if (normalizedOptions.length !== 4 || !normalizedOptions.includes(normalizedAnswer)) {
      throw new Error("Static algebra questions must have exactly 4 unique options including the answer.");
    }

    return {
      question: String(question),
      options: normalizedOptions,
      answer: normalizedAnswer,
      difficulty: normalizedDifficulty,
      category: "Algebra",
      type: "algebra-choice",
      family,
    };
  }

  function buildGeneratedEntry({ question, answer, distractors, difficulty, family }) {
    return makeEntry({
      question,
      answer,
      options: makeChoiceOptions(answer, distractors),
      difficulty,
      family,
    });
  }

  function buildNumericGeneratedEntry({ question, answer, distractors = [], difficulty, family }) {
    return buildGeneratedEntry({
      question,
      answer,
      distractors: makeNumericDistractors(answer, distractors),
      difficulty,
      family,
    });
  }

  function buildMissingAddendEquation(difficulty) {
    const addend = randomInt(1, difficulty <= 2 ? 7 : 12);
    const answer = randomInt(1, difficulty <= 2 ? 10 : 18);
    const total = addend + answer;

    return buildNumericGeneratedEntry({
      question: `What number goes in the blank? ${addend} + __ = ${total}`,
      answer,
      distractors: [answer - 1, answer + 1, total - answer],
      difficulty,
      family: "missing-addend",
    });
  }

  function buildMissingSubtractionEquation(difficulty) {
    const total = randomInt(6, difficulty <= 2 ? 18 : 28);
    const missing = randomInt(1, total - 2);
    const result = total - missing;

    return buildNumericGeneratedEntry({
      question: `What number goes in the blank? ${total} - __ = ${result}`,
      answer: missing,
      distractors: [missing - 1, missing + 1, result],
      difficulty,
      family: "missing-subtraction",
    });
  }

  function buildFunctionTableQuestion(difficulty) {
    const input = randomInt(2, difficulty <= 3 ? 8 : 12);
    const rules = difficulty <= 2
      ? [
          { label: "add 1", output: input + 1 },
          { label: "add 2", output: input + 2 },
          { label: "double it", output: input * 2 },
        ]
      : [
          { label: "add 3", output: input + 3 },
          { label: "multiply by 3", output: input * 3 },
          { label: "double it, then add 1", output: input * 2 + 1 },
        ];
    const rule = randomChoice(rules);

    return buildNumericGeneratedEntry({
      question: `Rule: ${rule.label.replace("double it", "multiply the input by 2")}. If the input is ${input}, what is the output?`,
      answer: rule.output,
      distractors: [rule.output - 1, rule.output + 1, input + 1],
      difficulty,
      family: "function-table",
    });
  }

  function buildNumberPatternQuestion(difficulty) {
    const start = randomInt(1, difficulty <= 2 ? 8 : 12);
    const step = randomChoice(difficulty <= 2 ? [2, 3, 4] : [3, 4, 5, 6]);
    const answer = start + step * 4;
    const terms = [start, start + step, start + step * 2, start + step * 3];

    return buildNumericGeneratedEntry({
      question: `What comes next: ${terms.join(", ")}, __?`,
      answer,
      distractors: [answer - step, answer + step, answer + 1],
      difficulty,
      family: "number-pattern",
    });
  }

  function buildBlankMultiplyQuestion(difficulty) {
    const factor = randomChoice(difficulty <= 2 ? [2, 3, 4, 5] : [3, 4, 5, 6, 7]);
    const answer = randomInt(2, difficulty <= 2 ? 8 : 11);
    const product = factor * answer;

    return buildNumericGeneratedEntry({
      question: `What number goes in the blank? ${factor} x __ = ${product}`,
      answer,
      distractors: [answer - 1, answer + 1, answer + factor],
      difficulty,
      family: "blank-multiply",
    });
  }

  function buildBlankDivideQuestion(difficulty) {
    const divisor = randomChoice(difficulty <= 2 ? [2, 3, 4, 5] : [3, 4, 5, 6]);
    const quotient = randomInt(2, difficulty <= 2 ? 8 : 12);
    const dividend = divisor * quotient;

    return buildNumericGeneratedEntry({
      question: `What number goes in the blank? __ divided by ${divisor} = ${quotient}`,
      answer: dividend,
      distractors: [dividend - divisor, dividend + divisor, quotient],
      difficulty,
      family: "blank-divide",
    });
  }

  function buildSimpleSubstitutionQuestion(difficulty) {
    const xValue = randomInt(2, difficulty <= 3 ? 9 : 12);
    const addend = randomInt(1, difficulty <= 3 ? 6 : 10);
    const answer = xValue + addend;

    return buildNumericGeneratedEntry({
      question: `If x = ${xValue}, what is x + ${addend}?`,
      answer,
      distractors: [answer - 1, answer + 1, xValue * addend],
      difficulty,
      family: "simple-substitution",
    });
  }

  function buildDoubleSubstitutionQuestion(difficulty) {
    const xValue = randomInt(2, difficulty <= 3 ? 9 : 13);
    const multiplier = randomChoice(difficulty <= 3 ? [2, 3] : [2, 3, 4]);
    const answer = multiplier * xValue;

    return buildNumericGeneratedEntry({
      question: `If x = ${xValue}, what is ${multiplier}x?`,
      answer,
      distractors: [answer - xValue, answer + xValue, xValue + multiplier],
      difficulty,
      family: "multiply-substitution",
    });
  }

  function buildAddThenDoubleSubstitutionQuestion(difficulty) {
    const xValue = randomInt(2, difficulty <= 4 ? 8 : 12);
    const multiplier = randomChoice([2, 3]);
    const addend = randomInt(1, difficulty <= 4 ? 5 : 9);
    const answer = multiplier * xValue + addend;

    return buildNumericGeneratedEntry({
      question: `If x = ${xValue}, what is ${multiplier}x + ${addend}?`,
      answer,
      distractors: [answer - addend, answer + 1, xValue + addend],
      difficulty,
      family: "linear-expression-substitution",
    });
  }

  function buildAddEquation(difficulty) {
    const variable = randomChoice(["x", "n", "m"]);
    const answer = randomInt(difficulty <= 4 ? 2 : -8, difficulty <= 4 ? 14 : 18);
    const addend = randomInt(2, difficulty <= 4 ? 9 : 15);
    const total = answer + addend;

    return buildNumericGeneratedEntry({
      question: `What is ${variable} if ${variable} + ${addend} = ${total}?`,
      answer,
      distractors: [total, answer - 1, answer + 1],
      difficulty,
      family: "one-step-add",
    });
  }

  function buildSubtractEquation(difficulty) {
    const variable = randomChoice(["x", "n", "m"]);
    const result = randomInt(difficulty <= 4 ? 2 : -8, difficulty <= 4 ? 14 : 18);
    const subtrahend = randomInt(2, difficulty <= 4 ? 9 : 15);
    const answer = result + subtrahend;

    return buildNumericGeneratedEntry({
      question: `What is ${variable} if ${variable} - ${subtrahend} = ${result}?`,
      answer,
      distractors: [result, answer - 1, answer + 1],
      difficulty,
      family: "one-step-subtract",
    });
  }

  function buildMultiplyEquation(difficulty) {
    const variable = randomChoice(["x", "n", "m"]);
    const factor = randomChoice(difficulty <= 4 ? [2, 3, 4, 5, 6] : [3, 4, 5, 6, 7, 8]);
    const answer = randomInt(2, difficulty <= 4 ? 12 : 18);
    const product = factor * answer;

    return buildNumericGeneratedEntry({
      question: `What is ${variable} if ${factor}${variable} = ${product}?`,
      answer,
      distractors: [answer - 1, answer + 1, answer + factor],
      difficulty,
      family: "one-step-multiply",
    });
  }

  function buildDivideEquation(difficulty) {
    const variable = randomChoice(["x", "n", "m"]);
    const divisor = randomChoice(difficulty <= 4 ? [2, 3, 4, 5, 6] : [3, 4, 5, 6, 8]);
    const quotient = randomInt(2, difficulty <= 4 ? 10 : 15);
    const answer = quotient * divisor;

    return buildNumericGeneratedEntry({
      question: `What is ${variable} if ${variable} / ${divisor} = ${quotient}?`,
      answer,
      distractors: [answer - divisor, answer + divisor, quotient],
      difficulty,
      family: "one-step-divide",
    });
  }

  function buildTwoStepAddQuestion(difficulty) {
    const multiplier = randomChoice(difficulty >= 7 ? [3, 4, 5, 6] : [2, 3, 4]);
    const answer = randomInt(difficulty >= 7 ? -6 : 2, difficulty >= 7 ? 14 : 10);
    const offset = randomInt(1, difficulty >= 7 ? 12 : 8);
    const total = multiplier * answer + offset;

    return buildNumericGeneratedEntry({
      question: `What is x if ${multiplier}x + ${offset} = ${total}?`,
      answer,
      distractors: [answer - 1, answer + 1, total - offset],
      difficulty,
      family: "two-step-add",
    });
  }

  function buildTwoStepSubtractQuestion(difficulty) {
    const multiplier = randomChoice(difficulty >= 7 ? [3, 4, 5, 6] : [2, 3, 4]);
    const answer = randomInt(difficulty >= 7 ? -6 : 2, difficulty >= 7 ? 14 : 10);
    const offset = randomInt(1, difficulty >= 7 ? 12 : 8);
    const total = multiplier * answer - offset;

    return buildNumericGeneratedEntry({
      question: `What is x if ${multiplier}x - ${offset} = ${total}?`,
      answer,
      distractors: [answer - 1, answer + 1, total + offset],
      difficulty,
      family: "two-step-subtract",
    });
  }

  function buildTwoStepParenthesesQuestion(difficulty) {
    const multiplier = randomChoice(difficulty >= 7 ? [3, 4, 5, 6] : [2, 3, 4]);
    const answer = randomInt(difficulty >= 7 ? -5 : 2, difficulty >= 7 ? 12 : 9);
    const offset = randomInt(1, difficulty >= 7 ? 8 : 5);
    const sign = randomChoice(["+", "-"]);
    const total = sign === "+" ? multiplier * (answer + offset) : multiplier * (answer - offset);

    return buildNumericGeneratedEntry({
      question: `What is x if ${multiplier}(x ${sign} ${offset}) = ${total}?`,
      answer,
      distractors: [answer - offset, answer + offset, answer + 1],
      difficulty,
      family: "two-step-parentheses",
    });
  }

  function buildCombineLikeTermsQuestion(difficulty) {
    const first = randomChoice(difficulty >= 7 ? [3, 4, 5, 6, 7] : [2, 3, 4]);
    const second = randomChoice(difficulty >= 7 ? [2, 3, 4, 5] : [1, 2, 3]);
    const constant = randomInt(1, difficulty >= 7 ? 12 : 8);
    const coefficient = first + second;
    const answer = `${coefficient}x + ${constant}`;

    return buildGeneratedEntry({
      question: `Which expression is the same as ${first}x + ${second}x + ${constant}?`,
      answer,
      distractors: [`${first}${second}x + ${constant}`, `${coefficient}x`, `${coefficient + constant}x`],
      difficulty,
      family: "combine-like-terms",
    });
  }

  function buildDistributeQuestion(difficulty) {
    const multiplier = randomChoice(difficulty >= 8 ? [4, 5, 6, 7] : [2, 3, 4, 5]);
    const constant = randomInt(2, difficulty >= 8 ? 10 : 7);
    const sign = randomChoice(["+", "-"]);
    const answer = sign === "+" ? `${multiplier}x + ${multiplier * constant}` : `${multiplier}x - ${multiplier * constant}`;

    return buildGeneratedEntry({
      question: `Which expression is the same as ${multiplier}(x ${sign} ${constant})?`,
      answer,
      distractors: [
        `${multiplier}x ${sign} ${constant}`,
        sign === "+" ? `x + ${multiplier * constant}` : `x - ${multiplier * constant}`,
        sign === "+" ? `${multiplier + constant}x` : `${multiplier - constant}x`,
      ],
      difficulty,
      family: "distribute-expression",
    });
  }

  function buildDistributeSolveQuestion(difficulty) {
    const multiplier = randomChoice(difficulty >= 8 ? [4, 5, 6, 7] : [3, 4, 5]);
    const answer = randomInt(difficulty >= 8 ? -5 : 3, difficulty >= 8 ? 14 : 11);
    const offset = randomInt(2, difficulty >= 8 ? 9 : 6);
    const sign = randomChoice(["+", "-"]);
    const total = sign === "+" ? multiplier * (answer + offset) : multiplier * (answer - offset);

    return buildNumericGeneratedEntry({
      question: `What is x if ${multiplier}(x ${sign} ${offset}) = ${total}?`,
      answer,
      distractors: [answer - 1, answer + 1, sign === "+" ? answer + offset : answer - offset],
      difficulty,
      family: "distribute-solve",
    });
  }

  function buildExpressionSubstitutionQuestion(difficulty) {
    const xValue = randomInt(difficulty >= 8 ? -4 : 3, difficulty >= 8 ? 10 : 8);
    const yValue = randomInt(2, difficulty >= 8 ? 9 : 7);
    const xMultiplier = randomChoice(difficulty >= 8 ? [3, 4, 5, 6] : [2, 3, 4]);
    const yMultiplier = randomChoice(difficulty >= 8 ? [2, 3, 4] : [2, 3]);
    const operation = difficulty >= 8 ? randomChoice(["+", "-"]) : "+";
    const answer = operation === "+"
      ? xMultiplier * xValue + yMultiplier * yValue
      : xMultiplier * xValue - yMultiplier * yValue;

    return buildNumericGeneratedEntry({
      question: `If x = ${xValue} and y = ${yValue}, what is ${xMultiplier}x ${operation} ${yMultiplier}y?`,
      answer,
      distractors: [answer - yValue, answer + xValue, xMultiplier * xValue + yValue],
      difficulty,
      family: "two-variable-substitution",
    });
  }

  function buildBothSidesEquation(difficulty) {
    const leftMultiplier = randomChoice(difficulty >= 8 ? [5, 6, 7, 8, 9] : [4, 5, 6]);
    const rightMultiplier = randomChoice([2, 3, 4].filter((candidate) => candidate < leftMultiplier));
    const answer = randomInt(difficulty >= 8 ? -6 : 3, difficulty >= 8 ? 15 : 12);
    const offset = (leftMultiplier - rightMultiplier) * answer;

    return buildNumericGeneratedEntry({
      question: `What is x if ${leftMultiplier}x = ${rightMultiplier}x + ${offset}?`,
      answer,
      distractors: [answer - 2, answer - 1, answer + 2],
      difficulty,
      family: "variables-both-sides",
    });
  }

  function buildFractionCoefficientEquation(difficulty) {
    const divisor = randomChoice([2, 3, 4, 5, 6]);
    const offset = randomInt(2, difficulty >= 8 ? 12 : 8);
    const answer = divisor * randomInt(2, difficulty >= 8 ? 12 : 9);
    const total = answer / divisor + offset;

    return buildNumericGeneratedEntry({
      question: `What is x if x/${divisor} + ${offset} = ${total}?`,
      answer,
      distractors: [answer - divisor, answer + divisor, total - offset],
      difficulty,
      family: "fraction-coefficient",
    });
  }

  function buildInequalityQuestion(difficulty) {
    const offset = randomInt(2, difficulty >= 8 ? 12 : 8);
    const boundary = randomInt(6, difficulty >= 8 ? 24 : 18);
    const threshold = boundary - offset;
    const answer = `x > ${threshold}`;

    return buildGeneratedEntry({
      question: `Which describes the solutions to x + ${offset} > ${boundary}?`,
      answer,
      distractors: [`x < ${threshold}`, `x > ${boundary + offset}`, `x = ${threshold}`],
      difficulty,
      family: "inequality",
    });
  }

  function buildNegativeCoefficientEquation(difficulty) {
    const coefficient = randomChoice([2, 3, 4, 5, 6]);
    const answer = randomInt(-12, -2);
    const offset = randomInt(1, difficulty >= 8 ? 12 : 8);
    const total = coefficient * answer + offset;

    return buildNumericGeneratedEntry({
      question: `What is x if ${coefficient}x + ${offset} = ${total}?`,
      answer,
      distractors: [Math.abs(answer), answer - 1, answer + 1],
      difficulty,
      family: "negative-solution",
    });
  }

  function buildSlopeQuestion(difficulty) {
    const x1 = randomInt(0, 4);
    const y1 = randomInt(0, 8);
    const run = randomChoice([1, 2, 3, 4]);
    const slope = randomChoice(difficulty >= 9 ? [-3, -2, -1, 2, 3, 4] : [1, 2, 3, 4]);
    const x2 = x1 + run;
    const y2 = y1 + slope * run;

    return buildNumericGeneratedEntry({
      question: `What is the slope of the line through (${x1}, ${y1}) and (${x2}, ${y2})?`,
      answer: slope,
      distractors: [slope + 1, slope - 1, run],
      difficulty,
      family: "slope",
    });
  }

  function buildFunctionNotationQuestion(difficulty) {
    const coefficient = randomChoice(difficulty >= 8 ? [2, 3, 4, 5, 6] : [2, 3, 4]);
    let offset = randomInt(difficulty >= 8 ? -8 : 1, difficulty >= 8 ? 8 : 7);
    if (offset === 0) {
      offset = randomChoice([-3, -2, -1, 1, 2, 3]);
    }
    const xValue = randomInt(difficulty >= 8 ? -4 : 2, difficulty >= 8 ? 10 : 9);
    const answer = coefficient * xValue + offset;
    const sign = offset < 0 ? `- ${Math.abs(offset)}` : `+ ${offset}`;

    return buildNumericGeneratedEntry({
      question: `If f(x) = ${coefficient}x ${sign}, what is f(${xValue})?`,
      answer,
      distractors: [answer - coefficient, answer + coefficient, xValue + offset],
      difficulty,
      family: "function-notation",
    });
  }

  function buildSequenceFormulaQuestion(difficulty) {
    const first = randomInt(2, 10);
    const step = randomChoice(difficulty >= 9 ? [-4, -3, 3, 4, 5] : [2, 3, 4, 5]);
    const n = randomInt(5, difficulty >= 9 ? 10 : 8);
    const answer = first + (n - 1) * step;
    const stepText = step < 0 ? `Subtract ${Math.abs(step)}` : `Add ${step}`;

    return buildNumericGeneratedEntry({
      question: `The 1st term is ${first}. ${stepText} each time. What is the ${n}th term?`,
      answer,
      distractors: [answer - step, answer + step, first + n * step],
      difficulty,
      family: "sequence-formula",
    });
  }

  function buildSystemEquationQuestion(difficulty) {
    const x = randomInt(difficulty >= 10 ? -4 : 1, difficulty >= 10 ? 8 : 7);
    let y = randomInt(1, difficulty >= 10 ? 9 : 7);
    if (y === x) {
      y += 1;
    }
    const sum = x + y;
    const difference = x - y;
    const answer = `x = ${x}, y = ${y}`;

    return buildGeneratedEntry({
      question: `Solve the system: x + y = ${sum}, x - y = ${difference}.`,
      answer,
      distractors: [
        `x = ${y}, y = ${x}`,
        `x = ${x + 1}, y = ${y + 1}`,
        `x = ${x - 1}, y = ${y + 1}`,
        `x = ${x + 2}, y = ${y - 1}`,
        `x = ${firstTotal}, y = ${secondTotal}`,
      ],
      difficulty,
      family: "system-equations",
    });
  }

  function buildEliminationSystemQuestion(difficulty) {
    const x = randomInt(1, difficulty >= 10 ? 8 : 6);
    let y = randomInt(1, difficulty >= 10 ? 8 : 6);
    if (y === x) {
      y += 1;
    }
    const firstTotal = 2 * x + y;
    const secondTotal = x + y;
    const answer = `x = ${x}, y = ${y}`;

    return buildGeneratedEntry({
      question: `Solve the system: 2x + y = ${firstTotal}, x + y = ${secondTotal}.`,
      answer,
      distractors: [`x = ${y}, y = ${x}`, `x = ${x + 1}, y = ${y + 1}`, `x = ${firstTotal}, y = ${secondTotal}`],
      difficulty,
      family: "system-equations",
    });
  }

  function buildFactoringQuestion(difficulty) {
    const a = randomInt(2, difficulty >= 10 ? 9 : 7);
    const b = randomInt(2, difficulty >= 10 ? 9 : 7);
    const sum = a + b;
    const product = a * b;
    const answer = `(x + ${a})(x + ${b})`;

    return buildGeneratedEntry({
      question: `Which expression is a factorization of x^2 + ${sum}x + ${product}?`,
      answer,
      distractors: [`(x + ${sum})(x + ${product})`, `(x + ${a})(x - ${b})`, `(x - ${a})(x - ${b})`],
      difficulty,
      family: "factor-quadratic",
    });
  }

  function buildQuadraticRootsQuestion(difficulty) {
    const r1 = randomInt(2, difficulty >= 10 ? 8 : 6);
    const r2 = randomInt(r1 + 1, difficulty >= 10 ? 10 : 8);
    const sum = r1 + r2;
    const product = r1 * r2;
    const answer = `${r1} and ${r2}`;

    return buildGeneratedEntry({
      question: `What are the solutions to x^2 - ${sum}x + ${product} = 0?`,
      answer,
      distractors: [`${-r1} and ${-r2}`, `${sum} and ${product}`, `${r1} and ${product}`],
      difficulty,
      family: "quadratic-roots",
    });
  }

  function buildVertexQuestion(difficulty) {
    const h = randomChoice([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]);
    const k = randomChoice([-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8]);
    const signH = h < 0 ? `+ ${Math.abs(h)}` : `- ${h}`;
    const signK = k < 0 ? `- ${Math.abs(k)}` : `+ ${k}`;
    const answer = `(${h}, ${k})`;

    return buildGeneratedEntry({
      question: `What is the vertex of y = (x ${signH})^2 ${signK}?`,
      answer,
      distractors: [`(${-h}, ${k})`, `(${h}, ${-k})`, `(${-h}, ${-k})`],
      difficulty,
      family: "quadratic-vertex",
    });
  }

  function buildExponentRuleQuestion(difficulty) {
    const base = randomChoice(["x", "a", "m"]);
    const first = randomInt(2, difficulty >= 10 ? 6 : 5);
    const second = randomInt(2, difficulty >= 10 ? 6 : 5);
    const answer = `${base}^${first + second}`;

    const productExponent = first * second === first + second ? first + second + 1 : first * second;

    return buildGeneratedEntry({
      question: `Which expression is equal to ${base}^${first} * ${base}^${second}?`,
      answer,
      distractors: [`${base}^${productExponent}`, `${base}^${Math.abs(first - second) || first}`, `${first + second}${base}`],
      difficulty,
      family: "exponent-rules",
    });
  }

  const GENERATED_FACTORIES = {
    1: [
      () => buildMissingAddendEquation(1),
      () => buildMissingSubtractionEquation(1),
      () => buildFunctionTableQuestion(1),
      () => buildNumberPatternQuestion(1),
    ],
    2: [
      () => buildBlankMultiplyQuestion(2),
      () => buildBlankDivideQuestion(2),
      () => buildSimpleSubstitutionQuestion(2),
      () => buildFunctionTableQuestion(2),
    ],
    3: [
      () => buildDoubleSubstitutionQuestion(3),
      () => buildAddThenDoubleSubstitutionQuestion(3),
      () => buildFunctionTableQuestion(3),
      () => buildNumberPatternQuestion(3),
    ],
    4: [
      () => buildAddEquation(4),
      () => buildSubtractEquation(4),
      () => buildMultiplyEquation(4),
      () => buildDivideEquation(4),
      () => buildCombineLikeTermsQuestion(4),
    ],
    5: [
      () => buildTwoStepAddQuestion(5),
      () => buildTwoStepSubtractQuestion(5),
      () => buildTwoStepParenthesesQuestion(5),
      () => buildAddThenDoubleSubstitutionQuestion(5),
      () => buildDistributeQuestion(5),
    ],
    6: [
      () => buildDistributeSolveQuestion(6),
      () => buildExpressionSubstitutionQuestion(6),
      () => buildBothSidesEquation(6),
      () => buildCombineLikeTermsQuestion(6),
      () => buildDistributeQuestion(6),
    ],
    7: [
      () => buildFractionCoefficientEquation(7),
      () => buildInequalityQuestion(7),
      () => buildNegativeCoefficientEquation(7),
      () => buildBothSidesEquation(7),
      () => buildExpressionSubstitutionQuestion(7),
    ],
    8: [
      () => buildSlopeQuestion(8),
      () => buildFunctionNotationQuestion(8),
      () => buildSequenceFormulaQuestion(8),
      () => buildTwoStepParenthesesQuestion(8),
      () => buildDistributeSolveQuestion(8),
    ],
    9: [
      () => buildSystemEquationQuestion(9),
      () => buildFactoringQuestion(9),
      () => buildExponentRuleQuestion(9),
      () => buildSlopeQuestion(9),
      () => buildSequenceFormulaQuestion(9),
    ],
    10: [
      () => buildEliminationSystemQuestion(10),
      () => buildQuadraticRootsQuestion(10),
      () => buildVertexQuestion(10),
      () => buildFactoringQuestion(10),
      () => buildExponentRuleQuestion(10),
    ],
  };

  const fallbackQuestions = [
    makeEntry({
      question: "What number goes in the blank? 3 + __ = 8",
      answer: 5,
      options: ["4", "5", "6", "7"],
      difficulty: 1,
      family: "missing-addend",
    }),
    makeEntry({
      question: "What number goes in the blank? 9 - __ = 4",
      answer: 5,
      options: ["4", "5", "6", "7"],
      difficulty: 1,
      family: "missing-subtraction",
    }),
    makeEntry({
      question: "Rule: add 2. If the input is 5, what is the output?",
      answer: 7,
      options: ["6", "7", "8", "9"],
      difficulty: 1,
      family: "function-table",
    }),
    makeEntry({
      question: "What comes next: 2, 4, 6, 8, __?",
      answer: 10,
      options: ["9", "10", "11", "12"],
      difficulty: 1,
      family: "number-pattern",
    }),
    makeEntry({
      question: "What number goes in the blank? 4 x __ = 20",
      answer: 5,
      options: ["4", "5", "6", "7"],
      difficulty: 2,
      family: "blank-multiply",
    }),
    makeEntry({
      question: "What number goes in the blank? __ divided by 3 = 4",
      answer: 12,
      options: ["9", "12", "15", "18"],
      difficulty: 2,
      family: "blank-divide",
    }),
    makeEntry({
      question: "If x = 4, what is x + 3?",
      answer: 7,
      options: ["6", "7", "8", "9"],
      difficulty: 2,
      family: "simple-substitution",
    }),
    makeEntry({
      question: "Rule: multiply the input by 2. If the input is 6, what is the output?",
      answer: 12,
      options: ["8", "10", "12", "14"],
      difficulty: 2,
      family: "function-table",
    }),
    makeEntry({
      question: "If x = 5, what is 2x?",
      answer: 10,
      options: ["8", "9", "10", "12"],
      difficulty: 3,
      family: "multiply-substitution",
    }),
    makeEntry({
      question: "If x = 3, what is 2x + 1?",
      answer: 7,
      options: ["5", "6", "7", "8"],
      difficulty: 3,
      family: "linear-expression-substitution",
    }),
    makeEntry({
      question: "What comes next: 5, 9, 13, 17, __?",
      answer: 21,
      options: ["19", "20", "21", "22"],
      difficulty: 3,
      family: "number-pattern",
    }),
    makeEntry({
      question: "Rule: multiply by 3. If the input is 7, what is the output?",
      answer: 21,
      options: ["18", "20", "21", "24"],
      difficulty: 3,
      family: "function-table",
    }),
    makeEntry({
      question: "What is x if x + 5 = 13?",
      answer: 8,
      options: ["6", "7", "8", "9"],
      difficulty: 4,
      family: "one-step-add",
    }),
    makeEntry({
      question: "What is x if x - 6 = 11?",
      answer: 17,
      options: ["5", "11", "16", "17"],
      difficulty: 4,
      family: "one-step-subtract",
    }),
    makeEntry({
      question: "What is x if 6x = 42?",
      answer: 7,
      options: ["6", "7", "8", "9"],
      difficulty: 4,
      family: "one-step-multiply",
    }),
    makeEntry({
      question: "Which expression is the same as 3x + 2x + 4?",
      answer: "5x + 4",
      options: ["5x + 4", "6x + 4", "5x", "9x"],
      difficulty: 4,
      family: "combine-like-terms",
    }),
    makeEntry({
      question: "What is x if 2x + 3 = 11?",
      answer: 4,
      options: ["3", "4", "5", "6"],
      difficulty: 5,
      family: "two-step-add",
    }),
    makeEntry({
      question: "What is x if 3x - 4 = 17?",
      answer: 7,
      options: ["6", "7", "8", "9"],
      difficulty: 5,
      family: "two-step-subtract",
    }),
    makeEntry({
      question: "What is x if 3(x + 1) = 12?",
      answer: 3,
      options: ["2", "3", "4", "5"],
      difficulty: 5,
      family: "two-step-parentheses",
    }),
    makeEntry({
      question: "Which expression is the same as 4(x + 2)?",
      answer: "4x + 8",
      options: ["4x + 2", "4x + 8", "x + 8", "6x"],
      difficulty: 5,
      family: "distribute-expression",
    }),
    makeEntry({
      question: "What is x if 4(x - 3) = 20?",
      answer: 8,
      options: ["5", "7", "8", "10"],
      difficulty: 6,
      family: "distribute-solve",
    }),
    makeEntry({
      question: "If x = 6 and y = 4, what is 3x + 2y?",
      answer: 26,
      options: ["22", "24", "26", "30"],
      difficulty: 6,
      family: "two-variable-substitution",
    }),
    makeEntry({
      question: "What is x if 5x = 2x + 27?",
      answer: 9,
      options: ["7", "8", "9", "11"],
      difficulty: 6,
      family: "variables-both-sides",
    }),
    makeEntry({
      question: "Which expression is the same as 6x + 3x + 5?",
      answer: "9x + 5",
      options: ["9x + 5", "18x + 5", "14x", "9x"],
      difficulty: 6,
      family: "combine-like-terms",
    }),
    makeEntry({
      question: "What is x if x/4 + 3 = 8?",
      answer: 20,
      options: ["5", "12", "20", "32"],
      difficulty: 7,
      family: "fraction-coefficient",
    }),
    makeEntry({
      question: "Which describes the solutions to x + 6 > 14?",
      answer: "x > 8",
      options: ["x > 8", "x < 8", "x = 8", "x > 20"],
      difficulty: 7,
      family: "inequality",
    }),
    makeEntry({
      question: "What is x if 4x + 7 = -9?",
      answer: -4,
      options: ["-4", "4", "-2", "2"],
      difficulty: 7,
      family: "negative-solution",
    }),
    makeEntry({
      question: "If x = -2 and y = 5, what is 3x + 2y?",
      answer: 4,
      options: ["-16", "-4", "4", "16"],
      difficulty: 7,
      family: "two-variable-substitution",
    }),
    makeEntry({
      question: "What is the slope of the line through (1, 3) and (4, 9)?",
      answer: 2,
      options: ["2", "3", "4", "6"],
      difficulty: 8,
      family: "slope",
    }),
    makeEntry({
      question: "If f(x) = 3x - 2, what is f(5)?",
      answer: 13,
      options: ["10", "13", "15", "17"],
      difficulty: 8,
      family: "function-notation",
    }),
    makeEntry({
      question: "The 1st term is 4. Add 5 each time. What is the 6th term?",
      answer: 29,
      options: ["24", "29", "30", "34"],
      difficulty: 8,
      family: "sequence-formula",
    }),
    makeEntry({
      question: "What is x if 5(x - 2) = 35?",
      answer: 9,
      options: ["5", "7", "9", "12"],
      difficulty: 8,
      family: "distribute-solve",
    }),
    makeEntry({
      question: "Solve the system: x + y = 9, x - y = 3.",
      answer: "x = 6, y = 3",
      options: ["x = 6, y = 3", "x = 3, y = 6", "x = 9, y = 3", "x = 12, y = 6"],
      difficulty: 9,
      family: "system-equations",
    }),
    makeEntry({
      question: "Which expression is a factorization of x^2 + 7x + 12?",
      answer: "(x + 3)(x + 4)",
      options: ["(x + 3)(x + 4)", "(x + 7)(x + 12)", "(x - 3)(x - 4)", "(x + 2)(x + 6)"],
      difficulty: 9,
      family: "factor-quadratic",
    }),
    makeEntry({
      question: "Which expression is equal to x^3 * x^4?",
      answer: "x^7",
      options: ["x^7", "x^12", "x^1", "7x"],
      difficulty: 9,
      family: "exponent-rules",
    }),
    makeEntry({
      question: "What is the slope of the line through (2, 8) and (5, -1)?",
      answer: -3,
      options: ["-3", "3", "-9", "9"],
      difficulty: 9,
      family: "slope",
    }),
    makeEntry({
      question: "Solve the system: 2x + y = 16, x + y = 10.",
      answer: "x = 6, y = 4",
      options: ["x = 6, y = 4", "x = 4, y = 6", "x = 8, y = 2", "x = 16, y = 10"],
      difficulty: 10,
      family: "system-equations",
    }),
    makeEntry({
      question: "What are the solutions to x^2 - 7x + 12 = 0?",
      answer: "3 and 4",
      options: ["3 and 4", "-3 and -4", "7 and 12", "2 and 6"],
      difficulty: 10,
      family: "quadratic-roots",
    }),
    makeEntry({
      question: "What is the vertex of y = (x - 2)^2 + 5?",
      answer: "(2, 5)",
      options: ["(2, 5)", "(-2, 5)", "(2, -5)", "(-2, -5)"],
      difficulty: 10,
      family: "quadratic-vertex",
    }),
    makeEntry({
      question: "Which expression is a factorization of x^2 + 11x + 30?",
      answer: "(x + 5)(x + 6)",
      options: ["(x + 5)(x + 6)", "(x + 11)(x + 30)", "(x - 5)(x - 6)", "(x + 3)(x + 10)"],
      difficulty: 10,
      family: "factor-quadratic",
    }),
  ];

  function createAlgebraGeneratedEntry(difficulty) {
    const level = clampDifficulty(difficulty);
    const factories = GENERATED_FACTORIES[level] || GENERATED_FACTORIES[3];
    return {
      ...randomChoice(factories)(),
      difficulty: level,
    };
  }

  if (typeof globalThis !== "undefined") {
    globalThis.ALGEBRA_QUESTIONS = fallbackQuestions;
    globalThis.createAlgebraGeneratedEntry = createAlgebraGeneratedEntry;
  }

  return fallbackQuestions;
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    ALGEBRA_QUESTIONS,
    createAlgebraGeneratedEntry: globalThis.createAlgebraGeneratedEntry,
  };
}

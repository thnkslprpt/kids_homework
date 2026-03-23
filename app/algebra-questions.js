const ALGEBRA_QUESTIONS = (() => {
  function clampDifficulty(value) {
    const level = Number.parseInt(value, 10);
    if (!Number.isFinite(level)) {
      return 3;
    }

    return Math.min(5, Math.max(1, level));
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
    const options = uniqueStrings([answer, ...distractors]);
    if (options.length !== 4 || !options.includes(String(answer))) {
      throw new Error("Algebra questions must have exactly 4 unique options including the answer.");
    }

    return shuffleArray(options);
  }

  function makeEntry({ question, answer, options, difficulty, family }) {
    const normalizedOptions = uniqueStrings(options);
    const normalizedAnswer = String(answer);

    if (normalizedOptions.length !== 4 || !normalizedOptions.includes(normalizedAnswer)) {
      throw new Error("Static algebra questions must have exactly 4 unique options including the answer.");
    }

    return {
      question: String(question),
      options: normalizedOptions,
      answer: normalizedAnswer,
      difficulty,
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

  function buildAddEquation(difficulty) {
    const variable = randomChoice(["x", "n", "m"]);
    const answer = randomInt(difficulty <= 4 ? 2 : 3, difficulty <= 4 ? 12 : 18);
    const addend = randomInt(2, difficulty <= 4 ? 8 : 12);
    const total = answer + addend;

    return buildGeneratedEntry({
      question: `What is ${variable} if ${variable} + ${addend} = ${total}?`,
      answer,
      distractors: [answer - 1, answer + 1, answer + 2],
      difficulty,
      family: "one-step-add",
    });
  }

  function buildSubtractEquation(difficulty) {
    const variable = randomChoice(["x", "n", "m"]);
    const answer = randomInt(difficulty <= 4 ? 2 : 3, difficulty <= 4 ? 12 : 18);
    const subtrahend = randomInt(2, difficulty <= 4 ? 8 : 12);

    return buildGeneratedEntry({
      question: `What is ${variable} if ${variable} - ${subtrahend} = ${answer}?`,
      answer,
      distractors: [answer - 1, answer + 1, answer + 3],
      difficulty,
      family: "one-step-subtract",
    });
  }

  function buildMissingAddendEquation(difficulty) {
    const addend = randomInt(1, difficulty <= 2 ? 7 : 10);
    const answer = randomInt(1, difficulty <= 2 ? 10 : 14);
    const total = addend + answer;

    return buildGeneratedEntry({
      question: `What number makes ${addend} + __ = ${total}?`,
      answer,
      distractors: [answer - 1, answer + 1, answer + 2],
      difficulty,
      family: "missing-addend",
    });
  }

  function buildMissingSubtractionEquation(difficulty) {
    const total = randomInt(5, difficulty <= 2 ? 16 : 22);
    const missing = randomInt(1, total - 1);
    const result = total - missing;

    return buildGeneratedEntry({
      question: `What number makes ${total} - __ = ${result}?`,
      answer: missing,
      distractors: [missing - 1, missing + 1, missing + 2],
      difficulty,
      family: "missing-subtraction",
    });
  }

  function buildBlankMultiplyQuestion(difficulty) {
    const factor = randomChoice([2, 3, 4, 5]);
    const answer = randomInt(2, difficulty <= 2 ? 6 : 9);
    const product = factor * answer;

    return buildGeneratedEntry({
      question: `What number makes ${factor} x __ = ${product}?`,
      answer,
      distractors: [answer - 1, answer + 1, answer + factor],
      difficulty,
      family: "blank-multiply",
    });
  }

  function buildBlankDivideQuestion(difficulty) {
    const divisor = randomChoice([2, 3, 4, 5]);
    const answer = randomInt(2, difficulty <= 2 ? 6 : 9);
    const dividend = divisor * answer;

    return buildGeneratedEntry({
      question: `What number makes __ / ${divisor} = ${answer}?`,
      answer: dividend,
      distractors: [dividend - divisor, dividend + divisor, dividend + divisor * 2],
      difficulty,
      family: "blank-divide",
    });
  }

  function buildMultiplyEquation(difficulty) {
    const variable = randomChoice(["x", "n", "m"]);
    const factor = randomChoice([2, 3, 4, 5, 6]);
    const answer = randomInt(2, difficulty <= 4 ? 9 : 12);
    const product = factor * answer;

    return buildGeneratedEntry({
      question: `What is ${variable} if ${factor}${variable} = ${product}?`,
      answer,
      distractors: [answer - 1, answer + 1, answer + factor],
      difficulty,
      family: "one-step-multiply",
    });
  }

  function buildDivideEquation(difficulty) {
    const variable = randomChoice(["x", "n", "m"]);
    const divisor = randomChoice([2, 3, 4, 5, 6]);
    const answer = randomInt(2, difficulty <= 4 ? 8 : 12);

    return buildGeneratedEntry({
      question: `What is ${variable} if ${variable} / ${divisor} = ${answer}?`,
      answer,
      distractors: [answer - 1, answer + 1, answer + divisor],
      difficulty,
      family: "one-step-divide",
    });
  }

  function buildFunctionTableQuestion(difficulty) {
    const input = randomInt(2, difficulty <= 3 ? 8 : 10);
    const rule = randomChoice([
      { label: "add 1", output: input + 1 },
      { label: "add 2", output: input + 2 },
      { label: "double it", output: input * 2 },
    ]);

    return buildGeneratedEntry({
      question: `Rule: ${rule.label}. If the input is ${input}, what is the output?`,
      answer: rule.output,
      distractors: [rule.output - 1, rule.output + 1, rule.output + 2],
      difficulty,
      family: "function-table",
    });
  }

  function buildSimpleSubstitutionQuestion(difficulty) {
    const xValue = randomInt(2, difficulty <= 3 ? 7 : 9);
    const addend = randomChoice([1, 2, 3, 4, 5]);
    const answer = xValue + addend;

    return buildGeneratedEntry({
      question: `If x = ${xValue}, what is x + ${addend}?`,
      answer,
      distractors: [answer - 1, answer + 1, answer + 2],
      difficulty,
      family: "simple-substitution",
    });
  }

  function buildDoubleSubstitutionQuestion(difficulty) {
    const xValue = randomInt(2, difficulty <= 3 ? 6 : 8);
    const answer = xValue * 2;

    return buildGeneratedEntry({
      question: `If x = ${xValue}, what is 2x?`,
      answer,
      distractors: [answer - 1, answer + 1, answer + 2],
      difficulty,
      family: "double-substitution",
    });
  }

  function buildAddThenDoubleSubstitutionQuestion(difficulty) {
    const xValue = randomInt(2, 6);
    const addend = randomChoice([1, 2, 3]);
    const answer = xValue * 2 + addend;

    return buildGeneratedEntry({
      question: `If x = ${xValue}, what is 2x + ${addend}?`,
      answer,
      distractors: [answer - 1, answer + 1, answer + 2],
      difficulty,
      family: "add-then-double-substitution",
    });
  }

  function buildTwoStepAddQuestion(difficulty) {
    const multiplier = randomChoice([2, 3]);
    const answer = randomInt(2, difficulty <= 4 ? 8 : 10);
    const offset = randomInt(1, 6);
    const total = multiplier * answer + offset;

    return buildGeneratedEntry({
      question: `What is x if ${multiplier}x + ${offset} = ${total}?`,
      answer,
      distractors: [answer - 1, answer + 1, answer + 2],
      difficulty,
      family: "two-step-add",
    });
  }

  function buildTwoStepSubtractQuestion(difficulty) {
    const multiplier = randomChoice([2, 3]);
    const answer = randomInt(2, difficulty <= 4 ? 8 : 10);
    const offset = randomInt(1, Math.min(6, multiplier * answer - 1));
    const total = multiplier * answer - offset;

    return buildGeneratedEntry({
      question: `What is x if ${multiplier}x - ${offset} = ${total}?`,
      answer,
      distractors: [answer - 1, answer + 1, answer + 3],
      difficulty,
      family: "two-step-subtract",
    });
  }

  function buildTwoStepParenthesesQuestion(difficulty) {
    const multiplier = randomChoice([2, 3, 4]);
    const answer = randomInt(2, difficulty <= 4 ? 7 : 9);
    const offset = randomInt(1, 4);
    const total = multiplier * (answer + offset);

    return buildGeneratedEntry({
      question: `What is x if ${multiplier}(x + ${offset}) = ${total}?`,
      answer,
      distractors: [answer - 1, answer + 1, answer + 2],
      difficulty,
      family: "two-step-parentheses",
    });
  }

  const GENERATED_FACTORIES = {
    1: [
      () => buildMissingAddendEquation(1),
      () => buildMissingSubtractionEquation(1),
      () => buildFunctionTableQuestion(1),
    ],
    2: [
      () => buildBlankMultiplyQuestion(2),
      () => buildBlankDivideQuestion(2),
      () => buildSimpleSubstitutionQuestion(2),
    ],
    3: [
      () => buildDoubleSubstitutionQuestion(3),
      () => buildAddThenDoubleSubstitutionQuestion(3),
      () => buildFunctionTableQuestion(3),
    ],
    4: [
      () => buildAddEquation(4),
      () => buildSubtractEquation(4),
      () => buildMultiplyEquation(4),
      () => buildDivideEquation(4),
    ],
    5: [
      () => buildTwoStepAddQuestion(5),
      () => buildTwoStepSubtractQuestion(5),
      () => buildTwoStepParenthesesQuestion(5),
      () => buildAddThenDoubleSubstitutionQuestion(5),
    ],
  };

  const fallbackQuestions = [
    makeEntry({
      question: "What number makes 3 + __ = 8?",
      answer: 5,
      options: ["4", "5", "6", "7"],
      difficulty: 1,
      family: "missing-addend",
    }),
    makeEntry({
      question: "What number makes 9 - __ = 4?",
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
      question: "What number makes 4 x __ = 20?",
      answer: 5,
      options: ["4", "5", "6", "7"],
      difficulty: 2,
      family: "blank-multiply",
    }),
    makeEntry({
      question: "What number makes __ / 3 = 4?",
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
      question: "If x = 5, what is 2x?",
      answer: 10,
      options: ["8", "9", "10", "12"],
      difficulty: 3,
      family: "double-substitution",
    }),
    makeEntry({
      question: "If x = 3, what is 2x + 1?",
      answer: 7,
      options: ["5", "6", "7", "8"],
      difficulty: 3,
      family: "add-then-double-substitution",
    }),
    makeEntry({
      question: "Rule: double it. If the input is 4, what is the output?",
      answer: 8,
      options: ["6", "7", "8", "10"],
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
      question: "What is x if 2x + 3 = 11?",
      answer: 4,
      options: ["3", "4", "5", "6"],
      difficulty: 4,
      family: "two-step-add",
    }),
    makeEntry({
      question: "What is x if x / 2 + 4 = 9?",
      answer: 10,
      options: ["8", "10", "12", "14"],
      difficulty: 4,
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
      question: "Rule: y = 2x + 1. If x = 6, what is y?",
      answer: 13,
      options: ["11", "12", "13", "14"],
      difficulty: 5,
      family: "function-table",
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

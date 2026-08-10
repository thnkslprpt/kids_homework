(() => {
  const questionUtils = globalThis.HomeworkQuestionUtils;
  if (!questionUtils) {
    return;
  }
  const {
    entry,
    fractionText,
    gcd,
    lcm,
    numberOptions,
    pickGeneratedEntry,
    randomChoice,
    randomInt,
    unique,
  } = questionUtils;

  function createRemainderQuestion(difficulty) {
    const divisor = randomInt(3, difficulty >= 5 ? 12 : 7);
    const quotient = randomInt(2, difficulty >= 6 ? 18 : 9);
    const remainder = randomInt(1, divisor - 1);
    const dividend = divisor * quotient + remainder;
    const contexts = [
      `Put ${dividend} stickers into groups of ${divisor}.`,
      `Share ${dividend} cards into stacks of ${divisor}.`,
      `Divide ${dividend} beads into bags of ${divisor}.`,
      `${dividend} ÷ ${divisor}`,
    ];
    return entry({
      topic: "math-remainders",
      difficulty,
      question: "What is the remainder?",
      displayText: randomChoice(contexts),
      answer: remainder,
      options: numberOptions(remainder, [-2, -1, 1, 2, 3, divisor], 0),
      reviewText: `${dividend} = ${divisor} × ${quotient} + ${remainder}.`,
    });
  }

  function createGcfLcmQuestion(difficulty) {
    const base = randomInt(2, difficulty >= 7 ? 12 : 8);
    const left = base * randomInt(2, difficulty >= 7 ? 10 : 6);
    const right = base * randomInt(2, difficulty >= 7 ? 10 : 6);
    const askGcf = difficulty < 5 || Math.random() < 0.55;
    const answer = askGcf ? gcd(left, right) : lcm(left, right);
    return entry({
      topic: askGcf ? "math-gcf" : "math-lcm",
      difficulty,
      question: askGcf ? "What is the greatest common factor?" : "What is the least common multiple?",
      displayText: `${left} and ${right}`,
      answer,
      options: numberOptions(answer, askGcf ? [-base, -3, -2, -1, 1, 2, base] : [-left, -right, -12, -6, 6, 12], 1),
      reviewText: askGcf ? "The GCF is the largest factor shared by both numbers." : "The LCM is the smallest multiple shared by both numbers.",
    });
  }

  function createPrimeFactorQuestion(difficulty) {
    const primes = difficulty >= 7 ? [2, 3, 5, 7, 11] : [2, 3, 5, 7];
    const factorCount = difficulty >= 8 ? randomInt(3, 4) : difficulty >= 5 ? 3 : 2;
    const factors = Array.from({ length: factorCount }, () => randomChoice(primes)).sort((a, b) => a - b);
    const value = factors.reduce((product, factor) => product * factor, 1);
    const answer = factors.join(" × ");
    const distractors = unique([
      factors.join(" + "),
      `${factors[0]} × ${Math.floor(value / factors[0]) + 1}`,
      `${value} × 1`,
      `${factors[0] + 1} × ${Math.max(2, Math.floor(value / (factors[0] + 1)))}`,
      `${factors.slice(0, -1).join(" × ")} × ${factors[factors.length - 1] + 1}`,
    ]);
    return entry({
      topic: "math-prime-factorization",
      difficulty,
      question: "Which is the prime factorization?",
      displayText: String(value),
      answer,
      options: unique([answer, ...distractors]).slice(0, 4),
      reviewText: "Prime factorization writes a number as prime numbers multiplied together.",
    });
  }

  function createOrderOfOperationsQuestion(difficulty) {
    const a = randomInt(2, difficulty >= 7 ? 12 : 8);
    const b = randomInt(2, difficulty >= 7 ? 10 : 6);
    const c = randomInt(2, 9);
    const forms = [
      { text: `${a} + ${b} × ${c}`, answer: a + b * c },
      { text: `(${a} + ${b}) × ${c}`, answer: (a + b) * c, minLevel: 3 },
      { text: `${a * c} - ${b} × ${c}`, answer: a * c - b * c, minLevel: 4 },
      { text: `${a}^2 + ${b}`, answer: a * a + b, minLevel: 6 },
      { text: `(${a + b}) ÷ ${c} + ${a}`, answer: (a + b) / c + a, minLevel: 7, whole: (a + b) % c === 0 },
    ].filter((form) => (!form.minLevel || form.minLevel <= difficulty) && form.whole !== false);
    const picked = randomChoice(forms);
    return entry({
      topic: "math-order-of-operations",
      difficulty,
      question: "What is the value?",
      displayText: picked.text,
      answer: picked.answer,
      options: numberOptions(picked.answer, [-a * b, -c, -1, 1, c, a * b], 0),
    });
  }

  function createFractionOperationQuestion(difficulty) {
    const denominator = randomChoice(difficulty >= 6 ? [6, 8, 10, 12] : [3, 4, 5, 6]);
    const left = randomInt(1, denominator - 2);
    const right = randomInt(1, denominator - left - 1);
    const subtract = difficulty >= 5 && Math.random() < 0.4;
    const answerNumerator = subtract ? left : left + right;
    const expression = subtract
      ? `${left + right}/${denominator} - ${right}/${denominator}`
      : `${left}/${denominator} + ${right}/${denominator}`;
    const answer = fractionText(answerNumerator, denominator);
    return entry({
      topic: "math-fraction-operations",
      difficulty,
      question: "What is the result?",
      displayText: expression,
      answer,
      options: unique([
        answer,
        `${answerNumerator}/${denominator}`,
        fractionText(answerNumerator + 1, denominator),
        fractionText(Math.max(1, answerNumerator), denominator + 1),
        fractionText(answerNumerator, denominator * 2),
      ]).slice(0, 4),
    });
  }

  function createMixedNumberQuestion(difficulty) {
    const whole = randomInt(1, difficulty >= 6 ? 7 : 4);
    const denominator = randomChoice([3, 4, 5, 6, 8]);
    const numerator = randomInt(1, denominator - 1);
    const improper = whole * denominator + numerator;
    const askImproper = Math.random() < 0.5;
    const answer = askImproper ? `${improper}/${denominator}` : `${whole} ${numerator}/${denominator}`;
    return entry({
      topic: "math-mixed-numbers",
      difficulty,
      question: askImproper ? "Convert the mixed number to an improper fraction." : "Convert the improper fraction to a mixed number.",
      displayText: askImproper ? `${whole} ${numerator}/${denominator}` : `${improper}/${denominator}`,
      answer,
      options: askImproper
        ? unique([answer, `${whole + numerator}/${denominator}`, `${improper}/${numerator}`, `${improper + 1}/${denominator}`])
        : unique([answer, `${whole + 1} ${numerator}/${denominator}`, `${whole} ${denominator - numerator}/${denominator}`, `${whole} ${numerator}/${improper}`]),
    });
  }

  function createPercentChangeQuestion(difficulty) {
    const original = randomChoice([20, 40, 50, 80, 100, 120, 150, 200, 240]);
    const percent = randomChoice(difficulty >= 7 ? [5, 10, 15, 20, 25, 30, 40, 50] : [10, 20, 25, 50]);
    const increase = Math.random() < 0.55;
    const change = (original * percent) / 100;
    const answer = increase ? original + change : original - change;
    return entry({
      topic: "math-percent-change",
      difficulty,
      question: `The amount starts at ${original} and ${increase ? "increases" : "decreases"} by ${percent}%. What is the new amount?`,
      answer,
      options: numberOptions(answer, [-change, -percent, -10, 10, percent, change], 0),
      reviewText: `${percent}% of ${original} is ${change}.`,
    });
  }

  function createUnitRateQuestion(difficulty) {
    const rate = randomInt(2, difficulty >= 7 ? 15 : 8);
    const units = randomInt(2, difficulty >= 7 ? 9 : 5);
    const total = rate * units;
    const labels = randomChoice([
      ["pages", "minute"],
      ["meters", "second"],
      ["stickers", "page"],
      ["dollars", "ticket"],
    ]);
    return entry({
      topic: "math-unit-rates",
      difficulty,
      question: `How many ${labels[0]} per 1 ${labels[1]}?`,
      displayText: `${total} ${labels[0]} in ${units} ${labels[1]}s`,
      answer: `${rate} ${labels[0]} per ${labels[1]}`,
      options: [
        `${rate} ${labels[0]} per ${labels[1]}`,
        `${units} ${labels[0]} per ${labels[1]}`,
        `${total} ${labels[0]} per ${labels[1]}`,
        `${rate + units} ${labels[0]} per ${labels[1]}`,
      ],
    });
  }

  function createProportionQuestion(difficulty) {
    const left = randomInt(2, difficulty >= 7 ? 12 : 8);
    const multiplier = randomInt(2, difficulty >= 7 ? 9 : 5);
    const right = randomInt(2, difficulty >= 7 ? 10 : 6);
    const answer = right * multiplier;
    return entry({
      topic: "math-proportions",
      difficulty,
      question: "What number goes in the blank?",
      displayText: `${left}/${right} = ${left * multiplier}/___`,
      answer,
      options: numberOptions(answer, [-right, -left, -1, 1, left, right], 1),
      reviewText: `The top number was multiplied by ${multiplier}, so the bottom number is too.`,
    });
  }

  function createInequalityQuestion(difficulty) {
    const offset = randomInt(2, difficulty >= 7 ? 12 : 7);
    const boundary = randomInt(4, difficulty >= 7 ? 24 : 14);
    const useGreater = Math.random() < 0.5;
    const answer = useGreater ? boundary + 1 : boundary - 1;
    return entry({
      topic: "math-inequalities",
      difficulty,
      question: "Which value can replace x so the inequality is true?",
      displayText: useGreater ? `x - ${offset} > ${boundary - offset}` : `x + ${offset} < ${boundary + offset}`,
      answer,
      options: useGreater
        ? [answer, boundary, boundary - 1, boundary - 2].map(String)
        : [answer, boundary, boundary + 1, boundary + 2].map(String),
    });
  }

  function createExponentQuestion(difficulty) {
    const base = randomInt(2, difficulty >= 7 ? 9 : 5);
    const exponent = randomInt(2, difficulty >= 8 ? 4 : 3);
    const answer = base ** exponent;
    const factorText = Array.from({ length: exponent }, () => base).join(" x ");
    return entry({
      topic: "math-exponents",
      difficulty,
      question: "What is the value of this exponential expression?",
      displayText: `${base}^${exponent}`,
      answer,
      options: numberOptions(answer, [-base * exponent, -base, -exponent, 1, base, base * exponent], 1),
      reviewText: `${base}^${exponent} means ${factorText}.`,
    });
  }

  function createCoordinateTransformQuestion(difficulty) {
    const x = randomInt(-5, 5);
    const y = randomInt(-5, 5);
    if (difficulty >= 7 && Math.random() < 0.35) {
      const reflectX = Math.random() < 0.5;
      const answer = reflectX ? `(${x}, ${-y})` : `(${-x}, ${y})`;
      return entry({
        topic: "math-coordinate-transformations",
        difficulty,
        question: "What are the new coordinates after reflecting the point?",
        displayText: `Start at (${x}, ${y}). Reflect over the ${reflectX ? "x-axis" : "y-axis"}.`,
        answer,
        options: [answer, `(${-x}, ${-y})`, `(${y}, ${x})`, `(${x}, ${y})`],
      });
    }
    const dx = randomInt(1, difficulty >= 6 ? 6 : 3);
    const dy = randomInt(1, difficulty >= 6 ? 6 : 3);
    const right = Math.random() < 0.5;
    const up = Math.random() < 0.5;
    const answer = `(${x + (right ? dx : -dx)}, ${y + (up ? dy : -dy)})`;
    return entry({
      topic: "math-coordinate-transformations",
      difficulty,
      question: "What is the point's new coordinate after the move?",
      displayText: `Start at (${x}, ${y}). Move ${dx} ${right ? "right" : "left"} and ${dy} ${up ? "up" : "down"}.`,
      answer,
      options: unique([answer, `(${x + dx}, ${y + dy})`, `(${x - dx}, ${y - dy})`, `(${x + (right ? dx : -dx)}, ${y})`, `(${x}, ${y + (up ? dy : -dy)})`]).slice(0, 4),
    });
  }

  function createAngleQuestion(difficulty) {
    const relation = randomChoice(difficulty >= 5 ? ["straight", "right", "around"] : ["straight", "right"]);
    const total = relation === "straight" ? 180 : relation === "right" ? 90 : 360;
    const missing = randomChoice(relation === "around" ? [45, 60, 90, 120, 150] : [20, 30, 35, 45, 60, 75]);
    const known = total - missing;
    return entry({
      topic: "math-angles",
      difficulty,
      question: `Two angles make a ${relation === "right" ? "right angle" : relation === "straight" ? "straight line" : "full turn"}. What is the missing angle?`,
      displayText: `${known}° + ? = ${total}°`,
      answer: `${missing}°`,
      options: [`${missing}°`, `${known}°`, `${missing + 10}°`, `${Math.max(5, missing - 10)}°`],
    });
  }

  function createTriangleQuestion(difficulty) {
    if (difficulty <= 4 && Math.random() < 0.4) {
      return entry({
        topic: "math-triangles",
        difficulty,
        question: "Which triangle has three equal sides?",
        answer: "Equilateral triangle",
        options: ["Equilateral triangle", "Right triangle", "Scalene triangle", "Obtuse triangle"],
      });
    }
    const first = randomChoice([35, 40, 45, 50, 60, 70]);
    const second = randomChoice([40, 45, 50, 60, 65]);
    const missing = 180 - first - second;
    return entry({
      topic: "math-triangles",
      difficulty,
      question: "What is the missing triangle angle?",
      displayText: `${first}°, ${second}°, ?`,
      answer: `${missing}°`,
      options: [`${missing}°`, `${180 - missing}°`, `${missing + 10}°`, `${Math.max(10, missing - 10)}°`],
    });
  }

  function createSymmetryQuestion(difficulty) {
    const prompts = [
      { question: "Which shape has exactly 4 lines of symmetry?", answer: "Square", options: ["Square", "Rectangle that is not a square", "Scalene triangle", "Parallelogram"] },
      { question: "Which shape has exactly 1 line of symmetry?", answer: "Isosceles triangle", options: ["Isosceles triangle", "Scalene triangle", "Parallelogram", "Uneven quadrilateral"] },
      { question: "Which capital letter usually has vertical symmetry?", answer: "A", options: ["A", "F", "G", "R"] },
      { question: "Which shape has no lines of symmetry?", answer: "Scalene triangle", options: ["Scalene triangle", "Square", "Circle", "Equilateral triangle"] },
    ];
    return entry({ topic: "math-symmetry", difficulty, ...randomChoice(prompts) });
  }

  function createVolumeSurfaceAreaQuestion(difficulty) {
    const length = randomInt(2, difficulty >= 7 ? 10 : 6);
    const width = randomInt(2, difficulty >= 7 ? 9 : 5);
    const height = randomInt(2, difficulty >= 7 ? 8 : 4);
    const volume = length * width * height;
    const surface = 2 * (length * width + length * height + width * height);
    const askSurface = difficulty >= 8 && Math.random() < 0.45;
    return entry({
      topic: askSurface ? "math-surface-area" : "math-volume",
      difficulty,
      question: askSurface ? "What is the surface area?" : "What is the volume?",
      displayText: `A rectangular prism is ${length} units long, ${width} units wide, and ${height} units tall.`,
      answer: askSurface ? `${surface} square units` : `${volume} cubic units`,
      options: askSurface
        ? [`${surface} square units`, `${volume} square units`, `${length + width + height} square units`, `${2 * (length + width + height)} square units`]
        : [`${volume} cubic units`, `${surface} cubic units`, `${length + width + height} cubic units`, `${2 * (length + width + height)} cubic units`],
    });
  }

  function createLinearEquationQuestion(difficulty) {
    const solution = randomInt(-10, 12);
    const coefficient = randomInt(2, 7);
    const constant = randomInt(-12, 12);
    const result = coefficient * solution + constant;
    return entry({
      topic: "math-linear-equations",
      difficulty,
      question: "Solve the linear equation.",
      displayText: `${coefficient}x ${constant >= 0 ? "+" : "−"} ${Math.abs(constant)} = ${result}`,
      answer: solution,
      options: numberOptions(solution, [-coefficient, -2, -1, 1, 2, coefficient]),
      reviewText: `Undo the constant, then divide by ${coefficient}.`,
    });
  }

  function createRadicalQuestion(difficulty) {
    const root = randomInt(3, 15);
    const answer = root;
    return entry({
      topic: "math-radicals",
      difficulty,
      question: "What is the principal square root?",
      displayText: `√${root * root}`,
      answer,
      options: numberOptions(answer, [-3, -2, -1, 1, 2, 3], 0),
      reviewText: `${root} × ${root} = ${root * root}.`,
    });
  }

  function createQuadraticQuestion(difficulty) {
    const leftRoot = randomInt(2, 8);
    const rightRoot = randomInt(2, 8);
    const answer = `(x − ${leftRoot})(x − ${rightRoot})`;
    return entry({
      topic: "math-quadratics",
      difficulty,
      question: "Which expression is the factored form?",
      displayText: `x² − ${leftRoot + rightRoot}x + ${leftRoot * rightRoot}`,
      answer,
      options: [
        answer,
        `(x + ${leftRoot})(x + ${rightRoot})`,
        `(x − ${leftRoot + rightRoot})(x − ${leftRoot * rightRoot})`,
        `(x + ${leftRoot})(x − ${rightRoot})`,
      ],
      reviewText: `The roots are ${leftRoot} and ${rightRoot}.`,
    });
  }

  function createSequenceQuestion(difficulty) {
    const first = randomInt(2, 12);
    const difference = randomInt(2, 8);
    const term = randomInt(8, 16);
    const answer = first + (term - 1) * difference;
    return entry({
      topic: "math-sequences",
      difficulty,
      question: `Find term ${term} of the arithmetic sequence.`,
      displayText: `a₁ = ${first}, d = ${difference}`,
      answer,
      options: numberOptions(answer, [-difference, -1, 1, difference, term]),
      reviewText: `aₙ = a₁ + (n − 1)d.`,
    });
  }

  const mathGenerators = [
    { minLevel: 3, maxLevel: 5, create: createRemainderQuestion },
    { minLevel: 4, maxLevel: 6, create: createGcfLcmQuestion },
    { minLevel: 3, maxLevel: 7, create: createOrderOfOperationsQuestion },
    { minLevel: 4, maxLevel: 7, create: createFractionOperationQuestion },
    { minLevel: 4, maxLevel: 7, create: createMixedNumberQuestion },
    { minLevel: 6, maxLevel: 7, create: createUnitRateQuestion },
    { minLevel: 6, maxLevel: 7, create: createProportionQuestion },
    { minLevel: 6, maxLevel: 8, create: createInequalityQuestion },
    { minLevel: 4, maxLevel: 7, create: createAngleQuestion },
    { minLevel: 4, maxLevel: 7, create: createTriangleQuestion },
    { minLevel: 2, maxLevel: 5, create: createSymmetryQuestion },
    { minLevel: 4, maxLevel: 7, create: createPrimeFactorQuestion },
    { minLevel: 6, maxLevel: 9, create: createExponentQuestion },
    { minLevel: 5, maxLevel: 8, create: createCoordinateTransformQuestion },
    { minLevel: 6, maxLevel: 7, create: createPercentChangeQuestion },
    { minLevel: 5, maxLevel: 7, create: createVolumeSurfaceAreaQuestion },
    { minLevel: 8, maxLevel: 9, create: createLinearEquationQuestion },
    { minLevel: 8, maxLevel: 9, create: createRadicalQuestion },
    { minLevel: 9, maxLevel: 10, create: createQuadraticQuestion },
    { minLevel: 10, maxLevel: 10, create: createSequenceQuestion },
  ];

  globalThis.createSupplementalMathGeneratedEntry = (difficulty) =>
    pickGeneratedEntry(mathGenerators, difficulty);
})();

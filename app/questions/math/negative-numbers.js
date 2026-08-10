const NEGATIVE_NUMBERS_QUESTIONS = (() => {
  const utils = globalThis.HomeworkQuestionUtils;
  const LETTERS = ["A", "B", "C", "D"];
  const COLORS = {
    ink: "#294765",
    line: "#91a9bd",
    negative: "#7c63d5",
    positive: "#3eb39c",
    warm: "#f19a61",
    soft: "#f6f2ff",
  };

  function clamp(value) {
    return utils?.clampDifficulty?.(value) || Math.max(1, Math.min(10, Number(value) || 3));
  }

  function randomChoice(values) {
    return utils?.randomChoice?.(values) || values[Math.floor(Math.random() * values.length)];
  }

  function randomInt(min, max) {
    return utils?.randomInt?.(min, max) || Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function shuffle(values) {
    return utils?.shuffle?.(values) || [...values].sort(() => Math.random() - 0.5);
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function signed(value) {
    return value > 0 ? `+${value}` : String(value);
  }

  function choiceEntry({ difficulty, question, answer, options, displayText = "", visualHtml = "", visualSummary = "", reviewText = "" }) {
    const normalizedAnswer = String(answer);
    const normalizedOptions = Array.from(new Set([normalizedAnswer, ...options.map(String)])).slice(0, 4);
    if (normalizedOptions.length !== 4) {
      throw new Error("Negative-number question needs four distinct choices.");
    }
    return {
      difficulty: clamp(difficulty),
      question,
      answer: normalizedAnswer,
      answerLabel: normalizedAnswer,
      options: shuffle(normalizedOptions),
      displayText,
      visualHtml,
      visualSummary,
      reviewText,
      topic: "negative-numbers",
    };
  }

  function numberOptions(answer, offsets = [-4, -2, 2, 4, 6]) {
    const values = new Set([Number(answer)]);
    offsets.forEach((offset) => {
      if (values.size < 4) values.add(Number(answer) + Number(offset));
    });
    let step = 8;
    while (values.size < 4) {
      values.add(Number(answer) + step);
      step += 2;
    }
    return Array.from(values).map(String);
  }

  function visualCard(title, body, note = "") {
    return `
      <div class="math-practice-card negative-practice-card">
        <div class="math-practice-title">${escapeHtml(title)}</div>
        ${body}
        ${note ? `<div class="math-practice-note">${escapeHtml(note)}</div>` : ""}
      </div>
    `;
  }

  function renderNumberLine({ min = -10, max = 10, marker = null, start = null, end = null } = {}) {
    const width = 360;
    const left = 22;
    const right = 22;
    const y = 58;
    const inner = width - left - right;
    const xFor = (value) => left + ((value - min) / (max - min)) * inner;
    const span = max - min;
    const step = span <= 12 ? 1 : span <= 24 ? 2 : 5;
    const firstTick = Math.ceil(min / step) * step;
    const ticks = [];
    for (let value = firstTick; value <= max; value += step) {
      const x = xFor(value);
      const color = value < 0 ? COLORS.negative : value > 0 ? COLORS.positive : COLORS.ink;
      ticks.push(`<line x1="${x}" y1="48" x2="${x}" y2="68" stroke="${color}" stroke-width="${value === 0 ? 3 : 1.7}"></line><text x="${x}" y="88" text-anchor="middle" font-size="11" font-weight="${value === 0 ? 900 : 650}" fill="${color}">${value}</text>`);
    }
    const move = Number.isFinite(start) && Number.isFinite(end)
      ? `<line x1="${xFor(start)}" y1="31" x2="${xFor(end)}" y2="31" stroke="${COLORS.warm}" stroke-width="5" stroke-linecap="round"></line><polygon points="${xFor(end)},24 ${xFor(end)},38 ${xFor(end) + (end >= start ? 9 : -9)},31" fill="${COLORS.warm}"></polygon><circle cx="${xFor(start)}" cy="31" r="5" fill="${COLORS.ink}"></circle>`
      : "";
    const point = Number.isFinite(marker)
      ? `<circle cx="${xFor(marker)}" cy="${y}" r="8" fill="${marker < 0 ? COLORS.negative : COLORS.positive}" stroke="#ffffff" stroke-width="3"></circle>`
      : "";
    return `<svg class="negative-number-line" viewBox="0 0 ${width} 100" role="img" aria-label="Number line from ${min} to ${max}${Number.isFinite(marker) ? ` with a point at ${marker}` : ""}"><line x1="${left}" y1="${y}" x2="${width - right}" y2="${y}" stroke="${COLORS.ink}" stroke-width="3"></line>${ticks.join("")}${move}${point}</svg>`;
  }

  function renderThermometer(start, end) {
    const min = -20;
    const max = 20;
    const yFor = (value) => 120 - ((value - min) / (max - min)) * 96;
    const ticks = [-20, -10, 0, 10, 20].map((value) =>
      `<line x1="68" y1="${yFor(value)}" x2="88" y2="${yFor(value)}" stroke="${COLORS.ink}" stroke-width="1.5"></line><text x="96" y="${yFor(value) + 4}" font-size="11" fill="${COLORS.ink}">${value}°</text>`
    ).join("");
    const low = Math.min(start, end);
    const high = Math.max(start, end);
    return `<svg class="negative-thermometer" viewBox="0 0 150 150" role="img" aria-label="Temperature changes from ${start} degrees to ${end} degrees"><rect x="54" y="18" width="24" height="108" rx="12" fill="#ffffff" stroke="${COLORS.ink}" stroke-width="3"></rect><rect x="60" y="${yFor(high)}" width="12" height="${Math.max(4, yFor(low) - yFor(high))}" rx="6" fill="${end >= start ? COLORS.positive : COLORS.negative}"></rect><circle cx="66" cy="126" r="18" fill="${end >= start ? COLORS.positive : COLORS.negative}" stroke="${COLORS.ink}" stroke-width="3"></circle>${ticks}<text x="10" y="143" font-size="11" font-weight="800" fill="${COLORS.ink}">${start}° → ${end}°</text></svg>`;
  }

  function renderElevator(start, move, end) {
    const floors = Array.from({ length: 9 }, (_, index) => 4 - index);
    const rows = floors.map((floor, index) => {
      const y = 14 + index * 18;
      const active = floor === start || floor === end;
      return `<rect x="56" y="${y}" width="72" height="16" rx="4" fill="${active ? (floor === end ? COLORS.positive : COLORS.soft) : "#ffffff"}" stroke="${COLORS.line}" stroke-width="1"></rect><text x="45" y="${y + 12}" text-anchor="end" font-size="11" fill="${COLORS.ink}">${floor}</text>${floor === end ? `<text x="92" y="${y + 12}" text-anchor="middle" font-size="10" font-weight="900" fill="#ffffff">finish</text>` : ""}`;
    }).join("");
    return `<svg class="negative-elevator" viewBox="0 0 170 184" role="img" aria-label="Elevator starts at floor ${start}, moves ${move}, and ends at ${end}">${rows}<text x="92" y="178" text-anchor="middle" font-size="12" font-weight="800" fill="${COLORS.ink}">${start} ${move >= 0 ? "+" : "−"} ${Math.abs(move)} = ?</text></svg>`;
  }

  function optionInteractive({ difficulty, question, choices, answerSummary, visualHtml = "", visualSummary = "", reviewText = "" }) {
    const shuffled = shuffle(choices).map((choice, index) => ({
      label: LETTERS[index],
      summary: String(choice.summary),
      html: choice.html || `<span class="math-option-value">${escapeHtml(choice.summary)}</span>`,
    }));
    const answerIndex = shuffled.findIndex((choice) => choice.summary === String(answerSummary));
    return {
      mode: "interactive",
      difficulty: clamp(difficulty),
      question,
      answer: String(answerSummary),
      answerLabel: String(answerSummary),
      visualHtml,
      visualSummary,
      reviewText,
      topic: "negative-numbers",
      interactive: {
        type: "negative-option",
        layout: "option-select",
        prompt: "Tap the best answer, then check it.",
        choices: shuffled,
        answerIndexes: [answerIndex],
        minSelected: 1,
        maxSelected: 1,
      },
    };
  }

  function pairedInteractive({ difficulty, question, items, reasons, answerItemIndex, answerReasonIndex, visualHtml, reviewText }) {
    return {
      mode: "interactive",
      difficulty: clamp(difficulty),
      question,
      answer: `${items[answerItemIndex].summary} — ${reasons[answerReasonIndex].summary}`,
      answerLabel: items[answerItemIndex].summary,
      visualHtml,
      visualSummary: question,
      reviewText,
      topic: "negative-numbers",
      interactive: {
        type: "negative-reasoning",
        layout: "paired-select",
        prompt: "Choose an answer and the reason that proves it.",
        items,
        reasons,
        answerIndexes: [answerItemIndex],
        answerItemIndex,
        answerReasonIndex,
        itemHeading: "Answer",
        reasonHeading: "Why?",
      },
    };
  }

  function createIdentifyQuestion(level) {
    const spread = level <= 2 ? 6 : level <= 5 ? 12 : 30;
    const values = shuffle([
      -randomInt(1, spread),
      -randomInt(1, spread),
      0,
      randomInt(1, spread),
      randomInt(1, spread),
      -randomInt(1, spread),
    ]);
    const answerIndexes = values
      .map((value, index) => (value < 0 ? index : -1))
      .filter((index) => index >= 0);
    return {
      mode: "interactive",
      difficulty: clamp(level),
      question: "Tap every number that is less than zero.",
      answer: values.filter((value) => value < 0).join(", "),
      answerLabel: "All negative numbers",
      visualHtml: visualCard("Zero is the boundary", renderNumberLine({ min: -spread, max: spread }), "Negative numbers sit to the left of zero."),
      visualSummary: `A number line runs from ${-spread} to ${spread}.`,
      reviewText: "Every number left of zero is negative. Zero itself is neither positive nor negative.",
      topic: "negative-numbers",
      interactive: {
        type: "negative-sort",
        layout: "part-select",
        prompt: `There are ${answerIndexes.length} negative numbers.`,
        answerIndexes,
        minSelected: answerIndexes.length,
        maxSelected: answerIndexes.length,
        parts: values.map((value) => ({
          label: String(value),
          summary: String(value),
          html: `<span class="negative-number-chip">${value}</span>`,
        })),
      },
    };
  }

  function createNumberLineQuestion(level) {
    const spread = level <= 3 ? 10 : level <= 6 ? 20 : 40;
    const target = -randomInt(1, spread - 2);
    const candidateValues = Array.from(new Set([target, -target, target - 2, target + 3]));
    while (candidateValues.length < 4) candidateValues.push(candidateValues[candidateValues.length - 1] + 1);
    return optionInteractive({
      difficulty: level,
      question: "Which value is marked on the number line?",
      answerSummary: String(target),
      choices: candidateValues.slice(0, 4).map((value) => ({ summary: String(value) })),
      visualHtml: visualCard("Read from zero", renderNumberLine({ min: -spread, max: spread, marker: target }), `${Math.abs(target)} steps to the left of zero.`),
      visualSummary: `A point is marked at ${target} on a number line.`,
      reviewText: `The point is ${Math.abs(target)} units left of zero, so its value is ${target}.`,
    });
  }

  function createCompareQuestion(level) {
    const spread = level <= 3 ? 10 : level <= 6 ? 25 : 60;
    const left = -randomInt(1, spread);
    const right = Math.random() < 0.7 ? -randomInt(1, spread) : randomInt(0, spread);
    if (left === right) return createCompareQuestion(level);
    const comparison = left > right ? ">" : "<";
    const answerText = `${left} ${comparison} ${right}`;
    const items = [
      { label: `${left} < ${right}`, summary: `${left} < ${right}` },
      { label: `${left} > ${right}`, summary: `${left} > ${right}` },
      { label: `${left} = ${right}`, summary: `${left} = ${right}` },
    ];
    const answerItemIndex = items.findIndex((item) => item.summary === answerText);
    const reasons = [
      { label: "A", summary: "The greater number is farther right on the number line." },
      { label: "B", summary: "The number with the greater absolute value is always greater." },
      { label: "C", summary: "A minus sign can be ignored when comparing numbers." },
    ];
    return pairedInteractive({
      difficulty: level,
      question: `Compare ${left} and ${right}. Choose the true statement and the reason.`,
      items,
      reasons,
      answerItemIndex,
      answerReasonIndex: 0,
      visualHtml: visualCard("Position decides", renderNumberLine({ min: -spread, max: spread, marker: left }) + renderNumberLine({ min: -spread, max: spread, marker: right })),
      reviewText: `${Math.max(left, right)} is farther right, so it is the greater number.`,
    });
  }

  function createMovementQuestion(level) {
    const spread = level <= 4 ? 10 : level <= 7 ? 20 : 40;
    const start = randomInt(-Math.floor(spread / 2), Math.floor(spread / 2));
    const change = randomInt(2, Math.floor(spread / 2)) * (Math.random() < 0.55 ? -1 : 1);
    const end = start + change;
    const min = Math.min(-spread, start, end);
    const max = Math.max(spread, start, end);
    return choiceEntry({
      difficulty: level,
      question: `Start at ${start} and move ${change < 0 ? `${Math.abs(change)} left` : `${change} right`}. Where do you land?`,
      displayText: `${start} ${change >= 0 ? "+" : "−"} ${Math.abs(change)} = ?`,
      answer: String(end),
      options: numberOptions(end, [-change, change, -2, 2]).filter((value) => value !== String(end)),
      visualHtml: visualCard("Move on the number line", renderNumberLine({ min, max, start, end })),
      visualSummary: `An arrow moves from ${start} to ${end}.`,
      reviewText: `Moving ${Math.abs(change)} place${Math.abs(change) === 1 ? "" : "s"} ${change < 0 ? "left" : "right"} from ${start} lands on ${end}.`,
    });
  }

  function createContextQuestion(level) {
    if (level <= 5) {
      const start = randomInt(-8, 8);
      const change = randomInt(3, 10) * (Math.random() < 0.5 ? -1 : 1);
      const end = start + change;
      return choiceEntry({
        difficulty: level,
        question: `The temperature is ${start}°C and changes by ${signed(change)}°. What is the new temperature?`,
        answer: `${end}°C`,
        options: numberOptions(end, [-change, change, -3, 3]).map((value) => `${value}°C`).filter((value) => value !== `${end}°C`),
        visualHtml: visualCard("Temperature change", renderThermometer(start, end)),
        visualSummary: `Temperature changes from ${start}°C to ${end}°C.`,
        reviewText: `${start} ${change >= 0 ? "+" : "−"} ${Math.abs(change)} = ${end}.`,
      });
    }

    const start = randomInt(-3, 3);
    const validMoves = [-4, -3, -2, 2, 3, 4].filter((value) => start + value >= -4 && start + value <= 4);
    const move = randomChoice(validMoves);
    const end = start + move;
    return choiceEntry({
      difficulty: level,
      question: `An elevator starts on floor ${start} and moves ${move < 0 ? "down" : "up"} ${Math.abs(move)} floors. Where does it stop?`,
      answer: String(end),
      options: numberOptions(end, [-move, move, -1, 1]).filter((value) => value !== String(end)),
      visualHtml: visualCard("Floors below ground are negative", renderElevator(start, move, end)),
      visualSummary: `Elevator moves from floor ${start} to floor ${end}.`,
      reviewText: `${start} ${move >= 0 ? "+" : "−"} ${Math.abs(move)} = ${end}.`,
    });
  }

  function createOperationQuestion(level) {
    if (level <= 5) {
      const left = randomInt(-12, 12);
      const right = randomInt(-12, 12);
      const subtract = level >= 4 && Math.random() < 0.5;
      const answer = subtract ? left - right : left + right;
      return choiceEntry({
        difficulty: level,
        question: "Solve the integer calculation.",
        displayText: `${left} ${subtract ? "−" : "+"} (${right}) = ?`,
        answer: String(answer),
        options: numberOptions(answer, [-right * 2, right * 2, -2, 2]).filter((value) => value !== String(answer)),
        visualHtml: visualCard("Keep track of direction", renderNumberLine({ min: Math.min(-20, left, answer), max: Math.max(20, left, answer), start: left, end: answer })),
        visualSummary: `Number-line movement starts at ${left} and ends at ${answer}.`,
        reviewText: `${left} ${subtract ? "−" : "+"} (${right}) = ${answer}.`,
      });
    }

    if (level <= 7) {
      const left = randomInt(2, 12) * (Math.random() < 0.5 ? -1 : 1);
      const right = randomInt(2, 10) * (Math.random() < 0.5 ? -1 : 1);
      const multiply = Math.random() < 0.65;
      const answer = multiply ? left * right : left;
      const dividend = multiply ? left : left * right;
      const divisor = multiply ? right : right;
      const expression = multiply ? `${left} × (${right})` : `${dividend} ÷ (${divisor})`;
      const firstOperand = multiply ? left : dividend;
      const secondOperand = multiply ? right : divisor;
      const matchingSigns = (firstOperand < 0) === (secondOperand < 0);
      return choiceEntry({
        difficulty: level,
        question: "Use the sign rules to solve.",
        displayText: `${expression} = ?`,
        answer: String(answer),
        options: numberOptions(answer, [-answer * 2, Math.abs(answer), -Math.abs(answer), 2]).filter((value) => value !== String(answer)),
        visualHtml: visualCard("Sign rule", `<div class="integer-sign-rule"><span>${firstOperand < 0 ? "−" : "+"}</span><b>${multiply ? "×" : "÷"}</b><span>${secondOperand < 0 ? "−" : "+"}</span><strong>→ ?</strong></div>`, "Same signs give positive; different signs give negative."),
        visualSummary: `${expression} uses ${matchingSigns ? "matching" : "different"} signs.`,
        reviewText: `${expression} = ${answer}. ${matchingSigns ? "Matching signs make a positive result." : "Different signs make a negative result."}`,
      });
    }

    const a = randomInt(3, 10);
    const b = randomInt(2, 8);
    const c = randomInt(2, 7);
    const forms = level <= 8
      ? [
          { text: `${-a} + ${b} × ${c}`, answer: -a + b * c },
          { text: `(${b} − ${a}) × ${c}`, answer: (b - a) * c },
        ]
      : [
          { text: `${-a}² + ${b} × ${c}`, answer: -(a * a) + b * c, note: `Without parentheses, −${a}² means −(${a}²).` },
          { text: `(${-(a)})² − ${b} × ${c}`, answer: a * a - b * c, note: `Parentheses make the negative number the base.` },
          { text: `${-a} − [${b} − (${c - b})]`, answer: -a - (b - (c - b)) },
        ];
    const picked = randomChoice(forms);
    return choiceEntry({
      difficulty: level,
      question: "Evaluate the expression using order of operations.",
      displayText: picked.text,
      answer: String(picked.answer),
      options: numberOptions(picked.answer, [-picked.answer * 2, a, -a, 2]).filter((value) => value !== String(picked.answer)),
      visualHtml: visualCard("Order matters", `<div class="math-expression-card">${escapeHtml(picked.text)}</div>`, picked.note || "Do multiplication before addition or subtraction."),
      visualSummary: `Evaluate ${picked.text}.`,
      reviewText: `${picked.text} = ${picked.answer}. ${picked.note || "Apply the order of operations."}`,
    });
  }

  function createAbsoluteValueQuestion(level) {
    const left = randomInt(-25, 25);
    const right = randomInt(-25, 25);
    const answer = Math.abs(left - right);
    return choiceEntry({
      difficulty: level,
      question: `What is the distance between ${left} and ${right} on the number line?`,
      displayText: `|${left} − (${right})| = ?`,
      answer: String(answer),
      options: numberOptions(answer, [-2, 2, -Math.abs(left), Math.abs(right)]).filter((value) => value !== String(answer)),
      visualHtml: visualCard("Distance is never negative", renderNumberLine({ min: Math.min(-30, left, right), max: Math.max(30, left, right), start: left, end: right })),
      visualSummary: `The points ${left} and ${right} are ${answer} units apart.`,
      reviewText: `Distance = |${left} − (${right})| = ${answer}.`,
    });
  }

  function createMisconceptionQuestion(level) {
    const items = [
      { label: "Maya is correct", summary: "Maya's answer of −8 is correct" },
      { label: "Maya changed the wrong sign", summary: "The correct answer is 2" },
      { label: "The answer must be positive", summary: "The correct answer is 8" },
    ];
    const reasons = [
      { label: "A", summary: "Subtracting a negative is the same as adding its opposite: −3 + 5." },
      { label: "B", summary: "Two minus signs always make the answer negative." },
      { label: "C", summary: "Absolute value should be used in every subtraction problem." },
    ];
    return pairedInteractive({
      difficulty: level,
      question: "Maya says −3 − (−5) = −8. Evaluate her reasoning.",
      items,
      reasons,
      answerItemIndex: 1,
      answerReasonIndex: 0,
      visualHtml: visualCard("Spot the sign error", `<div class="integer-worked-example"><span>−3 − (−5)</span><b>→</b><span class="worked-error">−8</span></div>`),
      reviewText: "Subtracting −5 means adding 5. So −3 − (−5) = −3 + 5 = 2.",
    });
  }

  function createAdvancedReasoningQuestion(level) {
    if (level === 8) {
      return createMisconceptionQuestion(level);
    }
    if (level === 9) {
      const items = [
        { label: "−16", summary: "−16" },
        { label: "16", summary: "16" },
        { label: "−8", summary: "−8" },
      ];
      const reasons = [
        { label: "A", summary: "Without parentheses, the exponent applies to 4 before the negative sign." },
        { label: "B", summary: "Every square written near a negative sign is positive." },
        { label: "C", summary: "The exponent multiplies −4 by 2." },
      ];
      return pairedInteractive({
        difficulty: level,
        question: "Evaluate −4² and justify the sign.",
        items,
        reasons,
        answerItemIndex: 0,
        answerReasonIndex: 0,
        visualHtml: visualCard("The base matters", `<div class="math-expression-card">−4² = −(4²)</div>`, "Compare with (−4)²."),
        reviewText: "−4² means −(4 × 4) = −16, while (−4)² = 16.",
      });
    }
    const items = [
      { label: "9", summary: "9" },
      { label: "−9", summary: "−9" },
      { label: "3", summary: "3" },
    ];
    const reasons = [
      { label: "A", summary: "Evaluate inside first: −7 + 16 = 9, then |9| = 9." },
      { label: "B", summary: "Absolute value keeps a negative result negative." },
      { label: "C", summary: "Add the absolute values before multiplying." },
    ];
    return pairedInteractive({
      difficulty: level,
      question: "Evaluate |−7 + 4 × 4| and choose the reason.",
      items,
      reasons,
      answerItemIndex: 0,
      answerReasonIndex: 0,
      visualHtml: visualCard("Order, then distance", `<div class="math-expression-card">|−7 + 4 × 4|</div>`),
      reviewText: "Multiply first: 4 × 4 = 16. Then −7 + 16 = 9 and |9| = 9.",
    });
  }

  let generationIndex = 0;

  function createGeneratedEntry(difficulty) {
    const level = clamp(difficulty);
    const interactiveFactories = level <= 2
      ? [() => createIdentifyQuestion(level), () => createNumberLineQuestion(level)]
      : level <= 5
        ? [() => createIdentifyQuestion(level), () => createNumberLineQuestion(level), () => createCompareQuestion(level)]
        : level <= 7
          ? [() => createNumberLineQuestion(level), () => createCompareQuestion(level)]
        : level === 8
          ? [() => createMisconceptionQuestion(level), () => createCompareQuestion(level), () => createAdvancedReasoningQuestion(level)]
          : [() => createAdvancedReasoningQuestion(level), () => createAdvancedReasoningQuestion(level), () => createMisconceptionQuestion(level)];
    const choiceFactories = level <= 2
      ? [() => createNumberLineQuestion(level), () => createIdentifyQuestion(level)]
      : level <= 4
        ? [() => createNumberLineQuestion(level), () => createContextQuestion(level)]
        : level === 5
          ? [() => createMovementQuestion(level), () => createContextQuestion(level)]
          : level <= 7
            ? [() => createMovementQuestion(level), () => createOperationQuestion(level), () => createAbsoluteValueQuestion(level)]
            : [() => createOperationQuestion(level), () => createAbsoluteValueQuestion(level), () => createAdvancedReasoningQuestion(level)];
    const factories = generationIndex % 2 === 0 ? interactiveFactories : choiceFactories;
    generationIndex += 1;
    return randomChoice(factories)();
  }

  const staticQuestions = [
    [1, "Which number is below zero?", "−3", ["0", "2", "5"]],
    [2, "Which number is greater?", "−2", ["−8", "−10", "−20"]],
    [3, "What is −3 + 5?", "2", ["−8", "−2", "8"]],
    [4, "What is 4 − 9?", "−5", ["5", "−13", "13"]],
    [5, "What is −6 − (−4)?", "−2", ["−10", "2", "10"]],
    [6, "What is (−7) × 3?", "−21", ["21", "−10", "10"]],
    [7, "What is (−36) ÷ (−6)?", "6", ["−6", "30", "−30"]],
    [8, "What is the distance between −7 and 5?", "12", ["−12", "2", "7"]],
    [9, "What is −4 + 3 × (−5)?", "−19", ["−35", "11", "19"]],
    [10, "What is (−4)² − 20?", "−4", ["−36", "4", "36"]],
  ].map(([difficulty, question, answer, distractors]) => choiceEntry({ difficulty, question, answer, options: distractors }));

  return { createGeneratedEntry, staticQuestions };
})();

globalThis.HomeworkQuestions?.register({
  id: "negative-numbers",
  label: "Negative Numbers",
  getStaticQuestions: () => NEGATIVE_NUMBERS_QUESTIONS.staticQuestions,
  generatedEntryFactory: NEGATIVE_NUMBERS_QUESTIONS.createGeneratedEntry,
  generatedShare: 1,
});

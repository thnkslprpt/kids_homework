(() => {
  const utils = globalThis.HomeworkQuestionUtils;
  const LETTERS = ["A", "B", "C", "D"];
  const COLORS = {
    ink: "#294765",
    blue: "#5c9ded",
    teal: "#43b99f",
    gold: "#f3b84b",
    coral: "#f07d73",
    purple: "#8b72da",
    grid: "#d7e4ef",
    soft: "#f7fbff",
  };

  function clamp(value) {
    return utils?.clampDifficulty?.(value) || Math.max(1, Math.min(10, Number(value) || 3));
  }

  function randomInt(min, max) {
    return utils?.randomInt?.(min, max) || Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomChoice(values) {
    return utils?.randomChoice?.(values) || values[Math.floor(Math.random() * values.length)];
  }

  function shuffle(values) {
    return utils?.shuffle?.(values) || [...values].sort(() => Math.random() - 0.5);
  }

  function gcd(left, right) {
    let a = Math.abs(left);
    let b = Math.abs(right);
    while (b) [a, b] = [b, a % b];
    return a || 1;
  }

  function format(value, maximumFractionDigits = 3) {
    return Number(value).toLocaleString("en-US", { maximumFractionDigits });
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function visualCard(title, body, note = "") {
    return `<div class="math-skill-card"><div class="math-skill-card-title">${escapeHtml(title)}</div>${body}${note ? `<div class="math-skill-card-note">${escapeHtml(note)}</div>` : ""}</div>`;
  }

  function makeOptions(answer, distractors = []) {
    const correct = String(answer);
    const values = Array.from(new Set([correct, ...distractors.map(String)]));
    const numeric = Number(correct.replaceAll(",", ""));
    if (Number.isFinite(numeric)) {
      [1, -1, 2, -2, 5, -5, 10, -10].forEach((offset) => {
        const candidate = format(numeric + offset);
        if (values.length < 4 && !values.includes(candidate)) values.push(candidate);
      });
    }
    ["0", "1", "2", "10", "Cannot be determined"].forEach((fallback) => {
      if (values.length < 4 && !values.includes(fallback)) values.push(fallback);
    });
    const unique = Array.from(new Set(values)).filter((value) => value !== "");
    if (unique.length < 4 || !unique.includes(correct)) {
      throw new Error(`Math skill question could not build four choices for ${correct}.`);
    }
    return shuffle([correct, ...unique.filter((value) => value !== correct).slice(0, 3)]);
  }

  function numberOptions(answer, offsets = [-10, -5, -2, -1, 1, 2, 5, 10], min = -Infinity) {
    const values = [Number(answer)];
    shuffle(offsets).forEach((offset) => {
      const candidate = Number(answer) + offset;
      if (candidate >= min && values.length < 4 && !values.includes(candidate)) values.push(candidate);
    });
    return makeOptions(format(answer), values.slice(1).map(format));
  }

  function choice({ category, difficulty, question, answer, distractors, options, displayText = "", visualHtml = "", visualSummary = "", reviewText = "" }) {
    return {
      difficulty: clamp(difficulty),
      question,
      answer: String(answer),
      answerLabel: String(answer),
      options: options ? makeOptions(answer, options.filter((value) => String(value) !== String(answer))) : makeOptions(answer, distractors || []),
      displayText,
      visualHtml,
      visualSummary,
      reviewText,
      topic: category,
    };
  }

  function optionInteractive({ category, difficulty, question, choices, answer, visualHtml = "", visualSummary = "", reviewText = "", prompt = "Choose the best answer." }) {
    const distinctChoices = [];
    const seenSummaries = new Set();
    choices
      .map((item) => typeof item === "object" ? item : { summary: String(item) })
      .forEach((item) => {
        const summary = String(item.summary);
        if (!summary.trim() || seenSummaries.has(summary)) return;
        seenSummaries.add(summary);
        distinctChoices.push({ ...item, summary });
      });
    const numericAnswer = Number(String(answer).replaceAll(",", ""));
    if (distinctChoices.length < 4 && Number.isFinite(numericAnswer)) {
      makeOptions(answer, distinctChoices.map((item) => item.summary)).forEach((summary) => {
        if (!seenSummaries.has(summary)) {
          seenSummaries.add(summary);
          distinctChoices.push({ summary });
        }
      });
    }
    if (distinctChoices.length < 4) {
      throw new Error(`Interactive question needs four distinct choices: ${question}`);
    }
    const shown = shuffle(distinctChoices.slice(0, 4));
    const answerIndex = shown.findIndex((item) => String(item.summary) === String(answer));
    if (answerIndex < 0) throw new Error(`Interactive answer is missing: ${answer}`);
    return {
      mode: "interactive",
      difficulty: clamp(difficulty),
      question,
      answer: String(answer),
      answerLabel: String(answer),
      visualHtml,
      visualSummary,
      reviewText,
      topic: category,
      interactive: {
        type: `${category}-model-choice`,
        layout: "option-select",
        prompt,
        choices: shown.map((item, index) => ({
          label: LETTERS[index],
          summary: String(item.summary),
          html: item.html || `<span class="math-skill-option-value">${escapeHtml(item.summary)}</span>`,
        })),
        answerIndexes: [answerIndex],
        minSelected: 1,
        maxSelected: 1,
      },
    };
  }

  function multiInteractive({ category, difficulty, question, items, visualHtml = "", visualSummary = "", reviewText = "", prompt = "Tap every correct choice." }) {
    const shown = shuffle(items.map((item) => ({ ...item, summary: String(item.summary) })));
    const answerIndexes = shown.map((item, index) => item.correct ? index : -1).filter((index) => index >= 0);
    return {
      mode: "interactive",
      difficulty: clamp(difficulty),
      question,
      answer: shown.filter((item) => item.correct).map((item) => item.summary).join(", "),
      answerLabel: "All correct choices",
      visualHtml,
      visualSummary,
      reviewText,
      topic: category,
      interactive: {
        type: `${category}-select-all`,
        layout: "part-select",
        prompt,
        parts: shown.map((item, index) => ({
          label: String(index + 1),
          summary: item.summary,
          html: item.html || `<span class="math-skill-option-value">${escapeHtml(item.summary)}</span>`,
        })),
        answerIndexes,
        minSelected: answerIndexes.length,
        maxSelected: answerIndexes.length,
      },
    };
  }

  function pairedInteractive({ category, difficulty, question, answers, reasons, answer, reason, visualHtml = "", reviewText = "" }) {
    const distinctBySummary = (items) => {
      const seen = new Set();
      return items.filter((item) => {
        const summary = String(item?.summary || "");
        if (!summary.trim() || seen.has(summary)) return false;
        seen.add(summary);
        return true;
      });
    };
    const shownAnswers = distinctBySummary(answers).slice(0, 3);
    const shownReasons = distinctBySummary(reasons).slice(0, 3);
    if (shownAnswers.length < 3 || shownReasons.length < 3) {
      throw new Error(`Paired question needs three distinct answers and reasons: ${question}`);
    }
    const answerItemIndex = shownAnswers.findIndex((item) => item.summary === answer);
    const answerReasonIndex = shownReasons.findIndex((item) => item.summary === reason);
    if (answerItemIndex < 0 || answerReasonIndex < 0) {
      throw new Error(`Paired question is missing its answer or reason: ${question}`);
    }
    return {
      mode: "interactive",
      difficulty: clamp(difficulty),
      question,
      answer: `${answer} — ${reason}`,
      answerLabel: answer,
      visualHtml,
      visualSummary: question,
      reviewText,
      topic: category,
      interactive: {
        type: `${category}-answer-reason`,
        layout: "paired-select",
        prompt: "Choose the answer and the reason that proves it.",
        items: shownAnswers,
        reasons: shownReasons,
        answerIndexes: [answerItemIndex],
        answerItemIndex,
        answerReasonIndex,
        itemHeading: "Answer",
        reasonHeading: "Why?",
      },
    };
  }

  function renderCounters(total, highlighted = total, columns = 10) {
    return `<div class="counter-model" style="--counter-columns:${columns}">${Array.from({ length: total }, (_, index) => `<span class="counter-dot${index < highlighted ? " filled" : ""}" aria-hidden="true"></span>`).join("")}</div>`;
  }

  function renderTenFrames(value) {
    const total = value > 10 ? 20 : 10;
    return `<div class="ten-frame" role="img" aria-label="Ten frame showing ${value}">${Array.from({ length: total }, (_, index) => `<span class="ten-frame-cell">${index < value ? '<i aria-hidden="true"></i>' : ""}</span>`).join("")}</div>`;
  }

  function renderNumberLine({ min = 0, max = 20, marker = null, start = null, end = null, step = 1 } = {}) {
    const width = 400;
    const left = 28;
    const right = 24;
    const y = 62;
    const xFor = (value) => left + ((value - min) / (max - min)) * (width - left - right);
    const ticks = [];
    for (let value = min; value <= max; value += step) {
      const x = xFor(value);
      ticks.push(`<line x1="${x}" y1="52" x2="${x}" y2="72" stroke="${COLORS.ink}" stroke-width="1.6"></line><text x="${x}" y="91" text-anchor="middle" font-size="11" fill="${COLORS.ink}">${format(value)}</text>`);
    }
    const jump = Number.isFinite(start) && Number.isFinite(end)
      ? `<path d="M ${xFor(start)} 48 Q ${(xFor(start) + xFor(end)) / 2} 12 ${xFor(end)} 48" fill="none" stroke="${COLORS.coral}" stroke-width="4" stroke-linecap="round"></path><circle cx="${xFor(start)}" cy="48" r="5" fill="${COLORS.purple}"></circle><circle cx="${xFor(end)}" cy="48" r="6" fill="${COLORS.teal}"></circle>`
      : "";
    const point = Number.isFinite(marker) ? `<circle cx="${xFor(marker)}" cy="${y}" r="8" fill="${COLORS.purple}" stroke="#fff" stroke-width="3"></circle>` : "";
    return `<svg class="math-skill-number-line" viewBox="0 0 ${width} 105" role="img" aria-label="Number line from ${min} to ${max}"><line x1="${left}" y1="${y}" x2="${width - right}" y2="${y}" stroke="${COLORS.ink}" stroke-width="3"></line>${ticks.join("")}${jump}${point}</svg>`;
  }

  function renderArray(rows, columns, highlighted = rows * columns) {
    return `<div class="array-model" style="--array-columns:${columns}" role="img" aria-label="${rows} rows of ${columns}">${Array.from({ length: rows * columns }, (_, index) => `<span class="array-cell${index < highlighted ? " filled" : ""}"></span>`).join("")}</div>`;
  }

  function renderPlaceChart(numberText, labels) {
    const digits = String(numberText).replace(/[^0-9]/g, "").split("");
    return `<div class="place-chart" role="img" aria-label="Place value chart for ${numberText}">${labels.map((label, index) => `<div><small>${escapeHtml(label)}</small><strong>${digits[index] || "0"}</strong></div>`).join("")}</div>`;
  }

  function renderDecimalGrid(hundredths) {
    return `<div class="decimal-grid" role="img" aria-label="Hundred grid with ${hundredths} shaded squares">${Array.from({ length: 100 }, (_, index) => `<span class="${index < hundredths ? "filled" : ""}"></span>`).join("")}</div>`;
  }

  function renderShape(kind, labels = "") {
    const shapes = {
      triangle: '<polygon points="100,18 22,132 178,132" />',
      rectangle: '<rect x="25" y="32" width="150" height="95" rx="3" />',
      parallelogram: '<polygon points="55,28 180,28 145,130 20,130" />',
      trapezoid: '<polygon points="60,30 145,30 180,130 20,130" />',
      circle: '<circle cx="100" cy="80" r="62" />',
      prism: '<path d="M35 52 L125 52 L165 28 L75 28 Z M125 52 L125 128 L165 104 L165 28 M35 52 L35 128 L125 128" />',
    };
    return `<svg class="geometry-shape" viewBox="0 0 200 155" role="img" aria-label="${kind}${labels ? ` with ${labels}` : ""}"><g fill="rgba(92,157,237,.2)" stroke="${COLORS.ink}" stroke-width="4" stroke-linejoin="round">${shapes[kind] || shapes.rectangle}</g>${labels ? `<text x="100" y="148" text-anchor="middle" font-size="14" font-weight="800" fill="${COLORS.ink}">${escapeHtml(labels)}</text>` : ""}</svg>`;
  }

  function renderCoordinateGrid(points, { min = -5, max = 5 } = {}) {
    const size = 300;
    const pad = 30;
    const inner = size - pad * 2;
    const xFor = (x) => pad + ((x - min) / (max - min)) * inner;
    const yFor = (y) => pad + ((max - y) / (max - min)) * inner;
    const lines = [];
    for (let value = min; value <= max; value += 1) {
      const pos = pad + ((value - min) / (max - min)) * inner;
      lines.push(`<line x1="${pos}" y1="${pad}" x2="${pos}" y2="${size - pad}" stroke="${value === 0 ? COLORS.ink : COLORS.grid}" stroke-width="${value === 0 ? 2.5 : 1}"></line>`);
      lines.push(`<line x1="${pad}" y1="${pos}" x2="${size - pad}" y2="${pos}" stroke="${value === 0 ? COLORS.ink : COLORS.grid}" stroke-width="${value === 0 ? 2.5 : 1}"></line>`);
      if (value !== 0) {
        lines.push(`<text x="${xFor(value)}" y="${yFor(0) + 15}" text-anchor="middle" font-size="9" fill="${COLORS.ink}">${value}</text>`);
        lines.push(`<text x="${xFor(0) - 10}" y="${yFor(value) + 3}" text-anchor="end" font-size="9" fill="${COLORS.ink}">${value}</text>`);
      }
    }
    const dots = points.map((point) => `<circle cx="${xFor(point.x)}" cy="${yFor(point.y)}" r="7" fill="${point.color || COLORS.coral}" stroke="#fff" stroke-width="2"></circle><text x="${xFor(point.x) + 10}" y="${yFor(point.y) - 8}" font-size="12" font-weight="900" fill="${COLORS.ink}">${escapeHtml(point.label || "")}</text>`).join("");
    return `<svg class="coordinate-skill-grid" viewBox="0 0 ${size} ${size}" role="img" aria-label="Coordinate grid">${lines.join("")}${dots}</svg>`;
  }

  function renderTable(headers, rows) {
    return `<div class="math-skill-table-wrap"><table class="math-skill-table"><thead><tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  }

  function renderPattern(items) {
    return `<div class="pattern-strip" role="img" aria-label="Pattern ${items.join(", ")}">${items.map((item, index) => `<span class="pattern-chip tone-${index % 4}">${escapeHtml(item)}</span>`).join("")}</div>`;
  }

  function createAdditionModel(level) {
    const category = "addition-subtraction";
    if (level === 1) {
      const left = randomInt(3, 9);
      const right = randomInt(1, Math.min(9, 18 - left));
      const answer = left + right;
      return optionInteractive({ category, difficulty: level, question: `Which ten-frame model shows ${left} + ${right}?`, answer: String(answer), choices: [answer, answer - 1, answer + 1, Math.max(1, answer - 2)].map((value) => ({ summary: String(value), html: renderTenFrames(value) })), visualHtml: visualCard("Build the total", `${renderCounters(left, left, 10)}<div class="model-operation">+</div>${renderCounters(right, right, 10)}`), visualSummary: `${left} counters plus ${right} counters.`, reviewText: `${left} + ${right} = ${answer}.` });
    }
    if (level === 2) {
      const start = randomInt(15, 55);
      const jump = randomChoice([10, 20, 30]);
      const answer = start + jump;
      return choice({ category, difficulty: level, question: `Use the jump to find ${start} + ${jump}.`, answer, options: numberOptions(answer, [-20, -10, 10, 20]), visualHtml: visualCard("Jump by tens", renderNumberLine({ min: Math.floor(start / 10) * 10, max: Math.ceil(answer / 10) * 10 + 10, start, end: answer, step: 10 })), visualSummary: `A number-line jump goes from ${start} to ${answer}.`, reviewText: `Adding ${jump} moves ${jump / 10} tens to the right.` });
    }
    if (level <= 4) {
      const max = level === 3 ? 999 : 9999;
      const left = randomInt(level === 3 ? 120 : 1200, Math.floor(max * 0.7));
      const right = randomInt(level === 3 ? 80 : 700, Math.floor(max * 0.25));
      const answer = left + right;
      return pairedInteractive({ category, difficulty: level, question: `Find ${format(left)} + ${format(right)} and choose a sound checking strategy.`, answer: format(answer), reason: `Subtract ${format(right)} from the sum to get ${format(left)}`, answers: [answer, answer - 100, answer + 10].map((value) => ({ label: format(value), summary: format(value) })), reasons: [{ label: "A", summary: `Subtract ${format(right)} from the sum to get ${format(left)}` }, { label: "B", summary: "Add the ones digits only" }, { label: "C", summary: "The sum must be smaller than both addends" }], visualHtml: visualCard("Place-value columns", renderTable(["Number", "Value"], [["First addend", format(left)], ["Second addend", format(right)], ["Sum", "?"]])), reviewText: `${format(left)} + ${format(right)} = ${format(answer)}. The inverse operation checks it.` });
    }
    if (level === 5) {
      const left = randomInt(120, 950) / 100;
      const right = randomInt(20, 500) / 100;
      const answer = Number((left + right).toFixed(2));
      return choice({ category, difficulty: level, question: "Add the decimals. Align digits by place value.", displayText: `${left.toFixed(2)} + ${right.toFixed(2)}`, answer: answer.toFixed(2), distractors: [(answer + 0.1).toFixed(2), (answer - 0.01).toFixed(2), (left + right / 10).toFixed(2)], visualHtml: visualCard("Line up decimal points", renderTable(["Ones", "Tenths", "Hundredths"], [[...left.toFixed(2).replace(".", "")], [...right.toFixed(2).replace(".", "")]])), reviewText: `${left.toFixed(2)} + ${right.toFixed(2)} = ${answer.toFixed(2)}.` });
    }
    if (level <= 7) {
      const denominator = randomChoice(level === 6 ? [4, 5, 8, 10] : [6, 8, 10, 12]);
      const a = randomInt(1, denominator - 2);
      const b = randomInt(1, denominator - a);
      const negative = level === 7 && Math.random() < 0.5;
      const numerator = negative ? a - b : a + b;
      const divisor = gcd(numerator, denominator);
      const answer = `${numerator / divisor}/${denominator / divisor}`;
      const expression = `${a}/${denominator} ${negative ? "−" : "+"} ${b}/${denominator}`;
      return choice({ category, difficulty: level, question: "Combine the rational numbers.", displayText: expression, answer, distractors: [`${Math.abs(a + b)}/${denominator * 2}`, `${Math.abs(a - b)}/${denominator}`, `${a + b}/${denominator}`], visualHtml: visualCard("Common denominator", `<div class="math-skill-expression">${expression}</div>`, "When denominators match, combine the numerators."), reviewText: `${expression} = ${answer}.` });
    }
    if (level === 8) {
      const coefficient = randomInt(2, 8);
      const constant = randomInt(2, 12);
      const firstCoefficient = randomInt(1, coefficient - 1);
      const secondCoefficient = coefficient - firstCoefficient;
      const answer = `${coefficient}√2 + ${constant}`;
      return choice({ category, difficulty: level, question: "Which terms can be combined?", displayText: `${firstCoefficient}√2 + ${secondCoefficient}√2 + ${constant}`, answer, distractors: [`${coefficient + constant}√2`, `${coefficient}√${constant + 2}`, `${coefficient + constant}`], visualHtml: visualCard("Like radical terms", `<div class="math-skill-expression">√2 &nbsp; √2 &nbsp; …</div>`, "Only terms with the same radical part combine."), reviewText: `The √2 terms combine; the constant stays separate.` });
    }
    const a = randomInt(2, 6);
    const b = randomInt(2, 8);
    const c = randomInt(1, 5);
    const answer = level === 9 ? `${a + c}x + ${b - c}` : `${a + c}x² + ${b - c}x − ${c}`;
    const expression = level === 9 ? `(${a}x + ${b}) + (${c}x − ${c})` : `(${a}x² + ${b}x) + (${c}x² − ${c}x − ${c})`;
    return optionInteractive({ category, difficulty: level, question: "Combine like terms.", answer, choices: [answer, `${a + c + b}x − ${c}`, `${a * c}x² + ${b - c}`, `${a + c}x² + ${b}x`], visualHtml: visualCard("Sort by term type", `<div class="math-skill-expression">${escapeHtml(expression)}</div>`, "x² terms combine with x² terms; x terms combine with x terms."), reviewText: `${expression} = ${answer}.` });
  }

  function createAdditionFluency(level) {
    const category = "addition-subtraction";
    if (level <= 2) {
      const answer = level === 1 ? randomInt(6, 18) : randomInt(25, 95);
      const missing = randomInt(level === 1 ? 1 : 5, Math.floor(answer / 2));
      return choice({ category, difficulty: level, question: "What number makes the equation true?", displayText: `${missing} + __ = ${answer}`, answer: answer - missing, options: numberOptions(answer - missing, [-10, -2, -1, 1, 2, 10], 0), visualHtml: visualCard("Part + part = whole", `<div class="number-bond"><span>${missing}</span><span>?</span><strong>${answer}</strong></div>`), reviewText: `${answer} − ${missing} = ${answer - missing}.` });
    }
    if (level <= 4) {
      const place = level === 3 ? 100 : 1000;
      const answer = randomInt(place, place * 6);
      const subtrahend = randomInt(Math.floor(place / 4), place * 2);
      const minuend = answer + subtrahend;
      return multiInteractive({ category, difficulty: level, question: `Tap every expression equal to ${format(answer)}.`, items: [{ summary: `${format(minuend)} − ${format(subtrahend)}`, correct: true }, { summary: `${format(answer - 100)} + 100`, correct: true }, { summary: `${format(answer + 10)} − 1`, correct: false }, { summary: `${format(answer - 10)} + 1`, correct: false }], visualHtml: visualCard("Equivalent calculations", `<div class="math-big-value">${format(answer)}</div>`), reviewText: "Different calculations can name the same value." });
    }
    return createAdditionModel(level);
  }

  function createAdditionReasoning(level) {
    const category = "addition-subtraction";
    if (level <= 2) {
      const total = level === 1 ? 10 : 100;
      const part = level === 1 ? randomInt(1, 9) : randomChoice([20, 30, 40, 60, 70]);
      const answer = total - part;
      return optionInteractive({ category, difficulty: level, question: `${part} and what number make ${total}?`, answer: String(answer), choices: [answer, part, Math.max(0, answer - 10), Math.min(total, answer + 10)], visualHtml: visualCard(`Make ${total}`, renderCounters(total, part, 10), `${part} are shown; complete the whole.`), reviewText: `${part} + ${answer} = ${total}.` });
    }
    if (level <= 5) {
      const start = level === 3 ? 498 : level === 4 ? 4_998 : 49.98;
      const add = level === 5 ? 0.02 : 2;
      const answer = start + add;
      return pairedInteractive({ category, difficulty: level, question: `What is ${format(start, 2)} + ${format(add, 2)}?`, answer: format(answer, 2), reason: "The addition completes the next place-value unit", answers: [answer, answer + add, start - add].map((value) => ({ label: format(value, 2), summary: format(value, 2) })), reasons: [{ label: "A", summary: "The addition completes the next place-value unit" }, { label: "B", summary: "Adding always changes only the ones digit" }, { label: "C", summary: "A sum must be less than its addends" }], visualHtml: visualCard("Cross a place-value boundary", `<div class="math-skill-expression">${format(start, 2)} + ${format(add, 2)}</div>`), reviewText: `${format(start, 2)} + ${format(add, 2)} = ${format(answer, 2)}.` });
    }
    return createAdditionModel(level);
  }

  function createMultiplicationModel(level) {
    const category = "multiplication-division";
    if (level <= 2) {
      const rows = level === 1 ? 2 : randomChoice([2, 3, 4]);
      const columns = randomInt(2, level === 1 ? 5 : 6);
      const answer = rows * columns;
      return optionInteractive({ category, difficulty: level, question: `How many counters are in ${rows} equal rows of ${columns}?`, answer: String(answer), choices: [answer, rows + columns, answer - rows, answer + columns], visualHtml: visualCard("Equal rows", renderArray(rows, columns), `${rows} rows × ${columns} in each row.`), reviewText: `${rows} × ${columns} = ${answer}.` });
    }
    if (level === 3) {
      const rows = randomInt(3, 9);
      const columns = randomInt(3, 9);
      const answer = rows * columns;
      return multiInteractive({ category, difficulty: level, question: `Tap every expression equal to the ${rows}-by-${columns} array.`, items: [{ summary: `${rows} × ${columns}`, correct: true }, { summary: `${columns} × ${rows}`, correct: true }, { summary: `${rows} + ${columns}`, correct: false }, { summary: `${answer} ÷ ${rows}`, correct: false }], visualHtml: visualCard("Turn the array", renderArray(rows, columns), "Rotating an array does not change its total."), reviewText: `${rows} × ${columns} and ${columns} × ${rows} both equal ${answer}.` });
    }
    if (level === 4) {
      const factor = randomInt(3, 9);
      const tens = randomInt(12, 48);
      const answer = factor * tens;
      return choice({ category, difficulty: level, question: "Use the distributive property.", displayText: `${factor} × ${tens}`, answer, options: numberOptions(answer, [-factor * 10, -factor, factor, factor * 10], 0), visualHtml: visualCard("Break apart a factor", `<div class="area-model"><span>${factor} × ${Math.floor(tens / 10) * 10}</span><span>${factor} × ${tens % 10}</span></div>`, `${tens} = ${Math.floor(tens / 10) * 10} + ${tens % 10}`), reviewText: `Multiply each part, then add: ${factor} × ${tens} = ${answer}.` });
    }
    if (level === 5) {
      const left = randomInt(12, 36);
      const right = randomInt(12, 28);
      const answer = left * right;
      const splitFactor = right % 10 === 0 ? left : right;
      const multiplier = splitFactor === right ? left : right;
      const tens = Math.floor(splitFactor / 10) * 10;
      const ones = splitFactor % 10;
      const proof = ones === 0
        ? `${left / 10} × ${right / 10} = ${answer / 100}, so ${left} × ${right} = ${format(answer)}`
        : `${multiplier} × ${splitFactor} = ${multiplier} × ${tens} + ${multiplier} × ${ones} = ${format(multiplier * tens)} + ${format(multiplier * ones)} = ${format(answer)}`;
      const roundedLeft = Math.round(left / 10) * 10;
      const roundedRight = Math.round(right / 10) * 10;
      return pairedInteractive({ category, difficulty: level, question: `Find ${left} × ${right} and choose the calculation that proves it.`, answer: format(answer), reason: proof, answers: [answer, answer + left, answer - right].map((value) => ({ label: format(value), summary: format(value) })), reasons: [{ label: "A", summary: proof }, { label: "B", summary: `${roundedLeft} × ${roundedRight} is an estimate, so it proves the exact product` }, { label: "C", summary: `${left} + ${right} gives the product` }], visualHtml: visualCard("Break apart a factor", `<div class="math-skill-expression">${left} × ${right}</div>`), reviewText: proof });
    }
    if (level === 6) {
      const denominator = randomChoice([3, 4, 5, 6]);
      const divisorNumerator = randomInt(1, denominator - 1);
      const whole = randomInt(2, 6);
      const numerator = whole * divisorNumerator;
      const answer = whole * denominator;
      return optionInteractive({ category, difficulty: level, question: `How many ${divisorNumerator}/${denominator} portions fit in ${numerator}/${denominator}?`, answer: String(whole), choices: [whole, denominator, numerator, whole + 1], visualHtml: visualCard("Division asks how many groups", `<div class="fraction-group-model"><strong>${numerator}/${denominator}</strong><span>÷</span><strong>${divisorNumerator}/${denominator}</strong></div>`), reviewText: `${numerator}/${denominator} ÷ ${divisorNumerator}/${denominator} = ${whole}.` });
    }
    if (level === 7) {
      const left = randomInt(-9, -2);
      const right = randomInt(2, 9);
      const answer = left * right;
      return choice({ category, difficulty: level, question: "Multiply the rational numbers.", displayText: `${left} × ${right}`, answer, options: numberOptions(answer, [-answer * 2, Math.abs(answer), -right, right]), visualHtml: visualCard("Sign rule", `<div class="sign-model"><span>−</span><b>×</b><span>+</span><strong>→ −</strong></div>`), reviewText: "Different signs make a negative product." });
    }
    if (level === 8) {
      const base = randomInt(2, 7);
      const exponent = randomInt(2, 4);
      const answer = base ** exponent;
      return optionInteractive({ category, difficulty: level, question: "Evaluate the power.", displayText: `${base}<sup>${exponent}</sup>`, answer: String(answer), choices: [answer, base * exponent, base ** (exponent - 1), answer + base], visualHtml: visualCard("Repeated multiplication", `<div class="math-skill-expression">${Array.from({ length: exponent }, () => base).join(" × ")}</div>`), reviewText: `${base}^${exponent} = ${answer}.` });
    }
    if (level === 9) {
      const a = randomInt(2, 5);
      const b = randomInt(2, 5);
      const answer = `x^${a + b}`;
      return choice({ category, difficulty: level, question: "Apply the product rule for exponents.", displayText: `x^${a} × x^${b}`, answer, distractors: [`x^${a * b}`, `${a + b}x`, `x^${Math.abs(a - b)}`], visualHtml: visualCard("Same base: add exponents", `<div class="math-skill-expression">x<sup>${a}</sup> × x<sup>${b}</sup></div>`), reviewText: `x^${a} × x^${b} = x^${a + b}.` });
    }
    const a = randomInt(2, 7);
    const b = randomInt(2, 8);
    const answer = `(x + ${a})(x + ${b})`;
    return pairedInteractive({ category, difficulty: level, question: `Factor x² + ${a + b}x + ${a * b}.`, answer, reason: `${a} + ${b} = ${a + b} and ${a} × ${b} = ${a * b}`, answers: [answer, `(x − ${a})(x − ${b})`, `(x + ${a + b})(x + ${a * b})`].map((summary) => ({ label: summary, summary })), reasons: [{ label: "A", summary: `${a} + ${b} = ${a + b} and ${a} × ${b} = ${a * b}` }, { label: "B", summary: "The two numbers only need the correct sum" }, { label: "C", summary: "Factoring changes the value of an expression" }], visualHtml: visualCard("Product and sum", `<div class="math-skill-expression">x² + ${a + b}x + ${a * b}</div>`), reviewText: `The factors are ${answer}.` });
  }

  function createDivisionModel(level) {
    const category = "multiplication-division";
    if (level <= 2) {
      const groups = randomInt(2, level === 1 ? 3 : 5);
      const each = randomInt(2, 5);
      const total = groups * each;
      return optionInteractive({ category, difficulty: level, question: `${total} counters are shared equally into ${groups} groups. How many go in each group?`, answer: String(each), choices: [each, groups, total, each + 1], visualHtml: visualCard("Fair shares", `<div class="fair-share-model">${Array.from({ length: groups }, () => `<div>${renderCounters(each, each, each)}</div>`).join("")}</div>`), reviewText: `${total} ÷ ${groups} = ${each}.` });
    }
    if (level <= 5) {
      const divisor = randomInt(3, level === 3 ? 9 : 15);
      const quotient = randomInt(4, level === 3 ? 10 : level === 4 ? 30 : 80);
      const dividend = divisor * quotient;
      return choice({ category, difficulty: level, question: "Use multiplication to check the quotient.", displayText: `${format(dividend)} ÷ ${divisor}`, answer: quotient, options: numberOptions(quotient, [-divisor, -1, 1, divisor], 0), visualHtml: visualCard("Division and multiplication are inverses", `<div class="fact-family"><span>${divisor} × ${quotient} = ${format(dividend)}</span><span>${format(dividend)} ÷ ${divisor} = ?</span></div>`), reviewText: `${divisor} × ${quotient} = ${format(dividend)}, so ${format(dividend)} ÷ ${divisor} = ${quotient}.` });
    }
    return createMultiplicationModel(level);
  }

  function createMultiplicationReasoning(level) {
    const category = "multiplication-division";
    if (level <= 3) {
      const factor = randomInt(2, level === 1 ? 4 : 8);
      const other = randomInt(2, 8);
      return multiInteractive({ category, difficulty: level, question: `Tap every way to represent ${factor} × ${other}.`, items: [{ summary: `${other} + ${Array.from({ length: factor - 1 }, () => other).join(" + ")}`, correct: true }, { summary: `${other} rows of ${factor}`, correct: true }, { summary: `${factor} + ${other}`, correct: false }, { summary: `${factor + other} equal groups`, correct: false }], visualHtml: visualCard("One product, several representations", renderArray(factor, other)), reviewText: "Equal groups, repeated addition, and arrays can represent multiplication." });
    }
    return createMultiplicationModel(level);
  }

  function createPlaceValueModel(level) {
    const category = "place-value-decimals";
    if (level === 1) {
      const tens = randomInt(1, 8);
      const ones = randomInt(0, 9);
      const number = tens * 10 + ones;
      return optionInteractive({ category, difficulty: level, question: `Which number has ${tens} tens and ${ones} ones?`, answer: String(number), choices: [number, ones * 10 + tens, tens + ones, number + 10], visualHtml: visualCard("Tens and ones", `<div class="base-ten-model"><div>${Array.from({ length: tens }, () => '<span class="ten-rod"></span>').join("")}</div><div>${Array.from({ length: ones }, () => '<span class="one-cube"></span>').join("")}</div></div>`), reviewText: `${tens} tens + ${ones} ones = ${number}.` });
    }
    if (level === 2) {
      const hundreds = randomInt(1, 8);
      const tens = randomInt(0, 9);
      const ones = randomInt(0, 9);
      const number = hundreds * 100 + tens * 10 + ones;
      return choice({ category, difficulty: level, question: `What is the value of the digit ${tens}?`, displayText: format(number), answer: format(tens * 10), distractors: [format(tens), format(tens * 100), format(number)], visualHtml: visualCard("Hundreds • tens • ones", renderPlaceChart(number, ["Hundreds", "Tens", "Ones"])), reviewText: `The ${tens} is in the tens place, so its value is ${tens * 10}.` });
    }
    if (level === 3) {
      const number = randomInt(1_000, 9_999);
      const rounded = Math.round(number / 100) * 100;
      return pairedInteractive({ category, difficulty: level, question: `Round ${format(number)} to the nearest hundred.`, answer: format(rounded), reason: `The tens digit tells whether to keep or increase the hundreds digit`, answers: [rounded, rounded - 100, rounded + 100].map((value) => ({ label: format(value), summary: format(value) })), reasons: [{ label: "A", summary: "The tens digit tells whether to keep or increase the hundreds digit" }, { label: "B", summary: "Always increase every digit" }, { label: "C", summary: "Rounding means deleting a random digit" }], visualHtml: visualCard("Nearest hundred", renderNumberLine({ min: Math.floor(number / 100) * 100, max: Math.floor(number / 100) * 100 + 100, marker: number, step: 20 })), reviewText: `${format(number)} rounds to ${format(rounded)}.` });
    }
    if (level === 4) {
      const digit = randomInt(1, 9);
      const number = Number(`${digit}${randomInt(10000, 99999)}`);
      const answer = digit * 100_000;
      return multiInteractive({ category, difficulty: level, question: `Tap every expression equal to the value of the first digit in ${format(number)}.`, items: [{ summary: format(answer), correct: true }, { summary: `${digit} × 100,000`, correct: true }, { summary: `${digit} × 10,000`, correct: false }, { summary: format(digit), correct: false }], visualHtml: visualCard("A digit's value depends on its place", renderPlaceChart(number, ["Hundred-thousands", "Ten-thousands", "Thousands", "Hundreds", "Tens", "Ones"])), reviewText: `The first digit is in the hundred-thousands place: ${digit} × 100,000.` });
    }
    if (level === 5) {
      const hundredths = randomChoice([12, 24, 37, 45, 68, 75, 82]);
      const decimal = (hundredths / 100).toFixed(2);
      return optionInteractive({ category, difficulty: level, question: "Which decimal matches the shaded hundred grid?", answer: decimal, choices: [decimal, (hundredths / 10).toFixed(1), `0.${String(hundredths).split("").reverse().join("")}`, `${hundredths}.0`], visualHtml: visualCard("Hundredths", renderDecimalGrid(hundredths), `${hundredths} of 100 squares are shaded.`), reviewText: `${hundredths}/100 = ${decimal}.` });
    }
    if (level === 6) {
      const values = [randomInt(-90, -10) / 10, randomInt(-9, -1) / 10, randomInt(1, 9) / 10, randomInt(10, 90) / 10];
      const answer = Math.max(...values);
      return choice({ category, difficulty: level, question: "Which rational number is greatest?", answer: format(answer, 1), options: values.map((value) => format(value, 1)), visualHtml: visualCard("Position on a number line", renderNumberLine({ min: -10, max: 10, step: 2 }), "Farther right means greater."), reviewText: `${format(answer, 1)} is farthest right.` });
    }
    if (level === 7) {
      const value = randomInt(11, 99) / 10;
      const answer = Math.abs(-value).toFixed(1);
      return pairedInteractive({ category, difficulty: level, question: `What is |−${value.toFixed(1)}|?`, answer, reason: "Absolute value is distance from zero", answers: [answer, `−${answer}`, "0"].map((summary) => ({ label: summary, summary })), reasons: [{ label: "A", summary: "Absolute value is distance from zero" }, { label: "B", summary: "Absolute value keeps every negative sign" }, { label: "C", summary: "All distances from zero equal zero" }], visualHtml: visualCard("Distance from zero", renderNumberLine({ min: -10, max: 10, marker: -value, step: 2 })), reviewText: `−${value.toFixed(1)} is ${answer} units from zero.` });
    }
    if (level === 8) {
      const coefficient = randomInt(2, 9);
      const exponent = randomInt(4, 7);
      const answer = `${coefficient} × 10^${exponent}`;
      return choice({ category, difficulty: level, question: "Write the number in scientific notation.", displayText: format(coefficient * 10 ** exponent), answer, distractors: [`${coefficient} × 10^${exponent - 1}`, `${coefficient * 10} × 10^${exponent}`, `${coefficient} + 10^${exponent}`], visualHtml: visualCard("One non-zero digit before the decimal", `<div class="math-skill-expression">${format(coefficient * 10 ** exponent)}</div>`), reviewText: `${format(coefficient * 10 ** exponent)} = ${answer}.` });
    }
    if (level === 9) {
      const a = randomInt(2, 8);
      const b = randomInt(2, 8);
      const exponent = randomInt(3, 6);
      const answer = `${a * b} × 10^${exponent}`;
      return choice({ category, difficulty: level, question: "Multiply and keep the power of ten.", displayText: `(${a} × 10^${exponent}) × ${b}`, answer, distractors: [`${a + b} × 10^${exponent}`, `${a * b} × 10^${exponent + 1}`, `${a * b} × 10^${exponent * b}`], visualHtml: visualCard("Scale without expanding", `<div class="math-skill-expression">(${a} × 10<sup>${exponent}</sup>) × ${b}</div>`), reviewText: `Multiply the coefficients: ${a} × ${b} = ${a * b}.` });
    }
    const original = randomChoice([0.00486, 0.00735, 12.468, 85.372]);
    const answer = Number(original.toPrecision(3)).toString();
    return optionInteractive({ category, difficulty: level, question: "Round to three significant figures.", displayText: String(original), answer, choices: [answer, original.toFixed(3), Number(original.toPrecision(2)).toString(), Number(original.toPrecision(4)).toString()], visualHtml: visualCard("Significant figures", `<div class="math-skill-expression">${original}</div>`, "Begin counting at the first non-zero digit."), reviewText: `${original} to three significant figures is ${answer}.` });
  }

  function createPlaceValueCompare(level) {
    const category = "place-value-decimals";
    if (level <= 4) {
      const max = [0, 99, 999, 9_999, 999_999][level];
      const values = [];
      while (values.length < 4) {
        const candidate = randomInt(Math.floor(max / 3), max);
        if (!values.includes(candidate)) values.push(candidate);
      }
      const answer = Math.max(...values);
      return optionInteractive({ category, difficulty: level, question: "Which number is greatest?", answer: format(answer), choices: Array.from(new Set(values.concat(answer))).slice(0, 4).map(format), visualHtml: visualCard("Compare from the largest place", `<div class="place-value-cards">${values.map((value) => `<span>${format(value)}</span>`).join("")}</div>`), reviewText: "Compare the highest-value digits first." });
    }
    return createPlaceValueModel(level);
  }

  function createPlaceValueReasoning(level) {
    const category = "place-value-decimals";
    if (level <= 3) {
      const number = level === 1 ? randomInt(20, 89) : level === 2 ? randomInt(200, 899) : randomInt(2_000, 8_999);
      const expanded = String(number).split("").map((digit, index, digits) => Number(digit) * 10 ** (digits.length - index - 1)).filter(Boolean);
      const answer = expanded.map(format).join(" + ");
      return choice({ category, difficulty: level, question: "Which is the expanded form?", displayText: format(number), answer, distractors: [String(number).split("").join(" + "), expanded.slice().reverse().map(format).join(" + "), `${format(number)} + 0`], visualHtml: visualCard("Every digit contributes a value", `<div class="math-skill-expression">${format(number)}</div>`), reviewText: `${format(number)} = ${answer}.` });
    }
    return createPlaceValueModel(level);
  }

  function createGeometryModel(level) {
    const category = "geometry";
    if (level === 1) {
      const shape = randomChoice([{ kind: "triangle", name: "Triangle", sides: 3 }, { kind: "rectangle", name: "Rectangle", sides: 4 }]);
      return optionInteractive({ category, difficulty: level, question: "Which description matches the shape?", answer: `${shape.sides} straight sides`, choices: [`${shape.sides} straight sides`, `${shape.sides + 1} straight sides`, "No corners", "Only curved sides"], visualHtml: visualCard("Notice defining attributes", renderShape(shape.kind)), reviewText: `A ${shape.name.toLowerCase()} has ${shape.sides} straight sides.` });
    }
    if (level === 2) {
      return multiInteractive({ category, difficulty: level, question: "Tap every shape with four straight sides.", items: [{ summary: "Rectangle", correct: true, html: renderShape("rectangle") }, { summary: "Parallelogram", correct: true, html: renderShape("parallelogram") }, { summary: "Triangle", correct: false, html: renderShape("triangle") }, { summary: "Circle", correct: false, html: renderShape("circle") }], reviewText: "Rectangles and parallelograms are quadrilaterals because they have four sides." });
    }
    if (level === 3) {
      const width = randomInt(3, 9);
      const height = randomInt(2, 8);
      const area = width * height;
      return pairedInteractive({ category, difficulty: level, question: `What is the area of a ${width}-by-${height} rectangle?`, answer: `${area} square units`, reason: `Area counts ${height} rows of ${width} unit squares`, answers: [`${area} square units`, `${2 * (width + height)} square units`, `${width + height} square units`, `${area + width} square units`, `${area + height} square units`].map((summary) => ({ label: summary, summary })), reasons: [{ label: "A", summary: `Area counts ${height} rows of ${width} unit squares` }, { label: "B", summary: "Area means add all four side lengths" }, { label: "C", summary: "Area is always length plus width" }], visualHtml: visualCard("Cover the inside", renderArray(height, width)), reviewText: `${width} × ${height} = ${area} square units.` });
    }
    if (level === 4) {
      const known = randomChoice([25, 35, 45, 55, 65, 70]);
      const answer = 90 - known;
      return choice({ category, difficulty: level, question: "The two angles form a right angle. Find the missing angle.", displayText: `${known}° + ? = 90°`, answer: `${answer}°`, distractors: [`${known}°`, `${answer + 10}°`, `${180 - known}°`], visualHtml: visualCard("Parts of a right angle", renderShape("triangle", `${known}° + ? = 90°`)), reviewText: `90° − ${known}° = ${answer}°.` });
    }
    if (level === 5) {
      const l = randomInt(3, 8);
      const w = randomInt(2, 6);
      const h = randomInt(2, 5);
      const volume = l * w * h;
      return optionInteractive({ category, difficulty: level, question: "What is the volume of the rectangular prism?", answer: `${volume} cubic units`, choices: [`${volume} cubic units`, `${2 * (l + w + h)} cubic units`, `${l * w} cubic units`, `${l + w + h} cubic units`, `${l * h} cubic units`, `${w * h} cubic units`], visualHtml: visualCard("Layers of unit cubes", renderShape("prism", `${l} × ${w} × ${h}`)), reviewText: `${l} × ${w} × ${h} = ${volume} cubic units.` });
    }
    if (level === 6) {
      const base = randomInt(6, 16);
      const height = randomInt(4, 12);
      const area = (base * height) / 2;
      return choice({ category, difficulty: level, question: "Find the area of the triangle.", displayText: `base ${base}, perpendicular height ${height}`, answer: `${area} square units`, distractors: [`${base * height} square units`, `${base + height} square units`, `${2 * base + height} square units`], visualHtml: visualCard("Half a matching parallelogram", renderShape("triangle", `b = ${base}, h = ${height}`)), reviewText: `Area = 1/2 × ${base} × ${height} = ${area}.` });
    }
    if (level === 7) {
      const radius = randomInt(3, 10);
      const circumference = 2 * radius;
      return pairedInteractive({ category, difficulty: level, question: `A circle has radius ${radius}. Which expression gives its circumference?`, answer: `${circumference}π`, reason: "Circumference equals 2πr", answers: [`${circumference}π`, `${radius * radius}π`, `${radius}π`].map((summary) => ({ label: summary, summary })), reasons: [{ label: "A", summary: "Circumference equals 2πr" }, { label: "B", summary: "Circumference equals πr²" }, { label: "C", summary: "Every circle measure equals its diameter" }], visualHtml: visualCard("Distance around a circle", renderShape("circle", `r = ${radius}`)), reviewText: `2π(${radius}) = ${circumference}π.` });
    }
    if (level === 8) {
      const triple = randomChoice([[3, 4, 5], [5, 12, 13], [8, 15, 17]]);
      return optionInteractive({ category, difficulty: level, question: `A right triangle has legs ${triple[0]} and ${triple[1]}. Find the hypotenuse.`, answer: String(triple[2]), choices: [triple[2], triple[0] + triple[1], triple[2] - 1, triple[2] + 1], visualHtml: visualCard("Pythagorean theorem", renderShape("triangle", `${triple[0]}² + ${triple[1]}² = c²`)), reviewText: `${triple[0]}² + ${triple[1]}² = ${triple[2]}².` });
    }
    if (level === 9) {
      const scale = randomInt(2, 5);
      const side = randomInt(3, 8);
      const answer = side * scale;
      return choice({ category, difficulty: level, question: `Two triangles are similar. A side of ${side} corresponds to a side ${scale} times as long. What is the corresponding length?`, answer, options: numberOptions(answer, [-scale, -side, side, scale], 0), visualHtml: visualCard("Similarity preserves ratios", `<div class="similar-shapes">${renderShape("triangle", `side ${side}`)}${renderShape("triangle", `scale ×${scale}`)}</div>`), reviewText: `${side} × ${scale} = ${answer}.` });
    }
    const angle = randomChoice([30, 45, 60]);
    const answer = angle === 30 ? "1/2" : angle === 45 ? "√2/2" : "√3/2";
    return pairedInteractive({ category, difficulty: level, question: `What is sin(${angle}°)?`, answer, reason: "Use the side ratios of a special right triangle", answers: [answer, angle === 30 ? "√3/2" : "1/2", "1"].map((summary) => ({ label: summary, summary })), reasons: [{ label: "A", summary: "Use the side ratios of a special right triangle" }, { label: "B", summary: "Sine always equals the angle divided by 100" }, { label: "C", summary: "Every acute angle has sine 1" }], visualHtml: visualCard("Special right triangles", renderShape("triangle", `${angle}°`)), reviewText: `sin(${angle}°) = ${answer}.` });
  }

  function createGeometryClassify(level) {
    const category = "geometry";
    if (level <= 2) return createGeometryModel(level);
    if (level <= 5) {
      return multiInteractive({ category, difficulty: level, question: "Tap every statement that is always true for a square.", items: [{ summary: "It has four equal sides", correct: true }, { summary: "It has four right angles", correct: true }, { summary: "It is a rectangle", correct: true }, { summary: "It has exactly three sides", correct: false }], visualHtml: visualCard("Classify by properties", renderShape("rectangle", "square")), reviewText: "A square is a special rectangle and rhombus." });
    }
    return createGeometryModel(level);
  }

  function createGeometryReasoning(level) {
    return createGeometryModel(level);
  }

  function createPatternModel(level) {
    const category = "patterns-sequences";
    if (level === 1) {
      const unit = randomChoice([["●", "▲"], ["★", "★", "○"], ["■", "●", "●"]]);
      const shown = [...unit, ...unit, ...unit.slice(0, unit.length - 1)];
      const answer = unit[unit.length - 1];
      return optionInteractive({ category, difficulty: level, question: "What comes next in the repeating pattern?", answer, choices: [answer, "◆", "□", unit[0]], visualHtml: visualCard("Find the repeating unit", renderPattern([...shown, "?"])), reviewText: `The repeating unit is ${unit.join(" ")}.` });
    }
    if (level === 2) {
      const step = randomChoice([2, 5, 10]);
      const start = randomInt(0, 20);
      const terms = [start, start + step, start + step * 2, start + step * 3];
      return choice({ category, difficulty: level, question: `Skip-count by ${step}. What comes next?`, displayText: `${terms.join(", ")}, __`, answer: start + step * 4, options: numberOptions(start + step * 4, [-step, -1, 1, step], 0), visualHtml: visualCard("Equal jumps", renderNumberLine({ min: start, max: start + step * 5, start: terms[2], end: terms[3], step })), reviewText: `Add ${step} each time.` });
    }
    if (level === 3) {
      const step = randomInt(3, 9);
      const start = randomInt(2, 20);
      const terms = Array.from({ length: 4 }, (_, index) => start + step * index);
      return pairedInteractive({ category, difficulty: level, question: `What comes next: ${terms.join(", ")}, __?`, answer: String(start + step * 4), reason: `Each term is ${step} more than the previous term`, answers: [start + step * 4, start + step * 5, terms[3] + 1].map((value) => ({ label: String(value), summary: String(value) })), reasons: [{ label: "A", summary: `Each term is ${step} more than the previous term` }, { label: "B", summary: "The terms double each time" }, { label: "C", summary: "The rule changes randomly" }], visualHtml: visualCard("Look at consecutive differences", renderPattern(terms)), reviewText: `The common difference is ${step}.` });
    }
    if (level === 4) {
      const start = randomInt(2, 8);
      const first = Array.from({ length: 4 }, (_, index) => start + index * 3);
      const second = first.map((value) => value * 2);
      const answer = second[3];
      return optionInteractive({ category, difficulty: level, question: "Rule 1 adds 3. Rule 2 doubles each result. What is the final output?", answer: String(answer), choices: [answer, first[3], answer + 3, start * 2 + 3], visualHtml: visualCard("Two related patterns", renderTable(["Step", "Rule 1", "Rule 2"], first.map((value, index) => [index + 1, value, second[index]]))), reviewText: `At step 4, Rule 1 gives ${first[3]}; doubling gives ${answer}.` });
    }
    if (level === 5) {
      const rule = randomInt(2, 5);
      const add = randomInt(1, 6);
      const input = randomInt(3, 10);
      const answer = input * rule + add;
      return choice({ category, difficulty: level, question: "Use the rule to find the missing output.", displayText: `Rule: multiply by ${rule}, then add ${add}. Input: ${input}`, answer, options: numberOptions(answer, [-add, -rule, rule, add], 0), visualHtml: visualCard("Function machine", `<div class="function-machine"><span>${input}</span><b>×${rule}, +${add}</b><strong>?</strong></div>`), reviewText: `${input} × ${rule} + ${add} = ${answer}.` });
    }
    if (level === 6) {
      const constant = randomInt(2, 8);
      const values = [1, 2, 3, 4].map((x) => [x, constant * x]);
      return multiInteractive({ category, difficulty: level, question: "Tap every statement true for the table.", items: [{ summary: `y = ${constant}x`, correct: true }, { summary: `y/x is always ${constant}`, correct: true }, { summary: `y = x + ${constant}`, correct: false }, { summary: "The relationship is not proportional", correct: false }], visualHtml: visualCard("Constant ratio", renderTable(["x", "y"], values)), reviewText: `Every y-value is ${constant} times x.` });
    }
    if (level === 7) {
      const rate = randomInt(2, 9);
      const answer = rate;
      return pairedInteractive({ category, difficulty: level, question: `The table follows y = ${rate}x. What is the constant of proportionality?`, answer: String(answer), reason: "The ratio y/x is constant", answers: [rate, rate + 1, rate * 2].map((value) => ({ label: String(value), summary: String(value) })), reasons: [{ label: "A", summary: "The ratio y/x is constant" }, { label: "B", summary: "Add all x-values" }, { label: "C", summary: "Use only the largest y-value" }], visualHtml: visualCard("Proportional relationship", renderTable(["x", "y"], [[1, rate], [2, rate * 2], [4, rate * 4]])), reviewText: `y ÷ x = ${rate}.` });
    }
    if (level === 8) {
      const slope = randomInt(-4, 5) || 2;
      const intercept = randomInt(-5, 6);
      const input = randomInt(2, 7);
      const answer = slope * input + intercept;
      return choice({ category, difficulty: level, question: `For y = ${slope}x ${intercept >= 0 ? "+" : "−"} ${Math.abs(intercept)}, find y when x = ${input}.`, answer, options: numberOptions(answer, [-intercept, -slope, slope, intercept]), visualHtml: visualCard("Linear rule", renderTable(["x", "y"], [[0, intercept], [1, slope + intercept], [input, "?"]])), reviewText: `y = ${slope}(${input}) ${intercept >= 0 ? "+" : "−"} ${Math.abs(intercept)} = ${answer}.` });
    }
    if (level === 9) {
      const start = randomInt(2, 6);
      const ratio = randomInt(2, 4);
      const terms = Array.from({ length: 4 }, (_, index) => start * ratio ** index);
      const answer = terms[3] * ratio;
      return optionInteractive({ category, difficulty: level, question: "Find the next term in the geometric sequence.", answer: String(answer), choices: [answer, terms[3] + ratio, answer / ratio, answer + ratio], visualHtml: visualCard("Constant multiplier", renderPattern(terms)), reviewText: `Multiply by ${ratio} each time.` });
    }
    const first = randomInt(2, 12);
    const difference = randomInt(2, 8);
    const n = randomInt(8, 15);
    const answer = first + (n - 1) * difference;
    return pairedInteractive({ category, difficulty: level, question: `An arithmetic sequence starts at ${first} with common difference ${difference}. Find term ${n}.`, answer: String(answer), reason: `Use aₙ = a₁ + (n − 1)d`, answers: [answer, first + n * difference, n * difference, answer - difference, answer + difference].map((value) => ({ label: String(value), summary: String(value) })), reasons: [{ label: "A", summary: "Use aₙ = a₁ + (n − 1)d" }, { label: "B", summary: "Multiply the first term by n" }, { label: "C", summary: "Add the term number only once" }], visualHtml: visualCard("Arithmetic sequence", `<div class="math-skill-expression">a₁=${first}, d=${difference}, n=${n}</div>`), reviewText: `${first} + (${n} − 1) × ${difference} = ${answer}.` });
  }

  function createPatternRule(level) {
    const category = "patterns-sequences";
    if (level <= 5) return createPatternModel(level);
    const formulas = level <= 7
      ? [{ text: "2n + 1", evaluate: (n) => 2 * n + 1 }, { text: "3n − 2", evaluate: (n) => 3 * n - 2 }, { text: "4n + 3", evaluate: (n) => 4 * n + 3 }]
      : level === 8
        ? [{ text: "−2n + 5", evaluate: (n) => -2 * n + 5 }, { text: "3n − 4", evaluate: (n) => 3 * n - 4 }, { text: "5n + 1", evaluate: (n) => 5 * n + 1 }]
        : [{ text: "n²", evaluate: (n) => n ** 2 }, { text: "2ⁿ", evaluate: (n) => 2 ** n }, { text: "n² + 1", evaluate: (n) => n ** 2 + 1 }];
    const formula = randomChoice(formulas);
    const n = randomInt(2, 5);
    const value = formula.evaluate(n);
    return choice({ category, difficulty: level, question: `Use the rule ${formula.text}. What is the value when n = ${n}?`, answer: value, options: numberOptions(value, [-n, -1, 1, n]), visualHtml: visualCard("Substitute into the rule", `<div class="math-skill-expression">${formula.text}, n = ${n}</div>`), reviewText: `Substitution gives ${value}.` });
  }

  function createPatternReasoning(level) {
    return createPatternModel(level);
  }

  function createCoordinateModel(level) {
    const category = "coordinates-functions";
    if (level === 1) {
      return optionInteractive({ category, difficulty: level, question: "Where is the star compared with the circle?", answer: "Above and to the right", choices: ["Above and to the right", "Below and to the right", "Above and to the left", "In the same place"], visualHtml: visualCard("Describe position", `<div class="position-grid"><span class="position-circle">●</span><span class="position-star">★</span></div>`), reviewText: "The star is higher and farther right than the circle." });
    }
    if (level === 2) {
      const right = randomInt(2, 5);
      const up = randomInt(1, 4);
      return choice({ category, difficulty: level, question: `Start at the home square. Move ${right} right and ${up} up. Which movement list matches?`, answer: `${right} right, then ${up} up`, distractors: [`${up} right, then ${right} up`, `${right} left, then ${up} down`, `${right + up} right`], visualHtml: visualCard("Move on a grid", `<div class="movement-grid"><span class="home">⌂</span><span class="goal" style="--move-x:${right * 35}px;--move-y:${up * 35}px">★</span></div>`), reviewText: "Horizontal movement comes first; vertical movement changes the row." });
    }
    if (level <= 4) {
      const max = 5;
      const point = { x: randomInt(1, max), y: randomInt(1, max), label: "A" };
      const answer = `(${point.x}, ${point.y})`;
      return optionInteractive({ category, difficulty: level, question: "What are the coordinates of point A?", answer, choices: [answer, `(${point.y}, ${point.x})`, `(${point.x - 1}, ${point.y})`, `(${point.x}, ${point.y - 1})`, `(${point.x + 1}, ${point.y})`, `(${point.x}, ${point.y + 1})`], visualHtml: visualCard("Across, then up", renderCoordinateGrid([point], { min: 0, max })), reviewText: `Move ${point.x} across and ${point.y} up: ${answer}.` });
    }
    if (level === 5) {
      const start = { x: randomInt(0, 4), y: randomInt(0, 4) };
      const dx = randomInt(1, 3);
      const dy = randomInt(1, 3);
      const answer = `(${start.x + dx}, ${start.y + dy})`;
      return choice({ category, difficulty: level, question: `Point A moves ${dx} right and ${dy} up. What is its new coordinate?`, displayText: `A = (${start.x}, ${start.y})`, answer, distractors: [`(${start.x - dx}, ${start.y + dy})`, `(${start.x + dy}, ${start.y + dx})`, `(${start.x}, ${start.y + dy})`], visualHtml: visualCard("Translate the point", renderCoordinateGrid([{ ...start, label: "A" }, { x: start.x + dx, y: start.y + dy, label: "?", color: COLORS.teal }], { min: 0, max: 8 })), reviewText: `Add ${dx} to x and ${dy} to y: ${answer}.` });
    }
    if (level === 6) {
      const point = { x: randomInt(-4, 4) || -2, y: randomInt(-4, 4) || 3, label: "P" };
      const axis = Math.random() < 0.5 ? "x-axis" : "y-axis";
      const answer = axis === "x-axis" ? `(${point.x}, ${-point.y})` : `(${-point.x}, ${point.y})`;
      return pairedInteractive({ category, difficulty: level, question: `Reflect P over the ${axis}.`, answer, reason: axis === "x-axis" ? "An x-axis reflection changes the sign of y" : "A y-axis reflection changes the sign of x", answers: [answer, `(${-point.x}, ${-point.y})`, `(${point.y}, ${point.x})`, `(${point.x + 1}, ${point.y})`, `(${point.x}, ${point.y + 1})`].map((summary) => ({ label: summary, summary })), reasons: [{ label: "A", summary: axis === "x-axis" ? "An x-axis reflection changes the sign of y" : "A y-axis reflection changes the sign of x" }, { label: "B", summary: "Every reflection swaps x and y" }, { label: "C", summary: "A reflection never changes coordinates" }], visualHtml: visualCard("Mirror across an axis", renderCoordinateGrid([point])), reviewText: `The reflected point is ${answer}.` });
    }
    if (level === 7) {
      const rate = randomInt(2, 6);
      const points = [{ x: 0, y: 0, label: "O" }, { x: 1, y: rate, label: "A" }, { x: 2, y: rate * 2, label: "B" }];
      return optionInteractive({ category, difficulty: level, question: "Which equation matches the proportional graph?", answer: `y = ${rate}x`, choices: [`y = ${rate}x`, `y = x + ${rate}`, `y = ${rate}x + 1`, `x = ${rate}y`], visualHtml: visualCard("A proportional graph passes through the origin", renderCoordinateGrid(points, { min: 0, max: Math.max(5, rate * 2) })), reviewText: `The unit rate and slope are ${rate}.` });
    }
    if (level === 8) {
      const slope = randomInt(-4, 5) || 2;
      const intercept = randomChoice([-4, -3, -2, -1, 1, 2, 3, 4].filter((value) => value !== slope));
      const points = [{ x: 0, y: intercept, label: "A" }, { x: 1, y: intercept + slope, label: "B" }];
      const answer = `y = ${slope}x ${intercept >= 0 ? "+" : "−"} ${Math.abs(intercept)}`;
      return pairedInteractive({ category, difficulty: level, question: "Which linear equation matches points A and B?", answer, reason: `The rise for a run of 1 is ${slope}, and the y-intercept is ${intercept}`, answers: [answer, `y = ${intercept}x + ${slope}`, `y = ${slope}x`, `y = ${slope + 1}x ${intercept >= 0 ? "+" : "−"} ${Math.abs(intercept)}`, `y = ${slope}x ${intercept + 1 >= 0 ? "+" : "−"} ${Math.abs(intercept + 1)}`].map((summary) => ({ label: summary, summary })), reasons: [{ label: "A", summary: `The rise for a run of 1 is ${slope}, and the y-intercept is ${intercept}` }, { label: "B", summary: "Slope and intercept can be swapped" }, { label: "C", summary: "Every line passes through the origin" }], visualHtml: visualCard("Slope and intercept", renderCoordinateGrid(points)), reviewText: `The matching equation is ${answer}.` });
    }
    if (level === 9) {
      const h = randomInt(-3, 4);
      const k = randomInt(-3, 4);
      const answer = `(${h}, ${k})`;
      return optionInteractive({ category, difficulty: level, question: "Find the vertex from vertex form.", displayText: `y = (x ${h >= 0 ? "−" : "+"} ${Math.abs(h)})² ${k >= 0 ? "+" : "−"} ${Math.abs(k)}`, answer, choices: [answer, `(${-h}, ${k})`, `(${h}, ${-k})`, `(${-h}, ${-k})`, `(${h + 1}, ${k})`, `(${h}, ${k + 1})`], visualHtml: visualCard("Vertex form y = (x − h)² + k", renderCoordinateGrid([{ x: h, y: k, label: "V" }])), reviewText: `The vertex is (h, k) = ${answer}.` });
    }
    const a = randomInt(2, 5);
    const b = randomInt(1, 4);
    const input = randomInt(1, 5);
    const inner = a * input;
    const answer = inner + b;
    return choice({ category, difficulty: level, question: `If f(x) = ${a}x and g(x) = x + ${b}, find g(f(${input})).`, answer, options: numberOptions(answer, [-a, -b, b, a]), visualHtml: visualCard("Function composition", `<div class="function-composition"><span>${input}</span><b>f</b><span>${inner}</span><b>g</b><strong>?</strong></div>`), reviewText: `f(${input}) = ${inner}, then g(${inner}) = ${answer}.` });
  }

  function createCoordinateRead(level) {
    return createCoordinateModel(level);
  }

  function createCoordinateReasoning(level) {
    return createCoordinateModel(level);
  }

  const categoryDefinitions = [
    { id: "addition-subtraction", label: "Addition & Subtraction", factories: [createAdditionModel, createAdditionFluency, createAdditionReasoning] },
    { id: "multiplication-division", label: "Multiplication & Division", factories: [createMultiplicationModel, createDivisionModel, createMultiplicationReasoning] },
    { id: "place-value-decimals", label: "Place Value & Decimals", factories: [createPlaceValueModel, createPlaceValueCompare, createPlaceValueReasoning] },
    { id: "geometry", label: "Geometry & Shapes", factories: [createGeometryModel, createGeometryClassify, createGeometryReasoning] },
    { id: "patterns-sequences", label: "Patterns & Sequences", factories: [createPatternModel, createPatternRule, createPatternReasoning] },
    { id: "coordinates-functions", label: "Coordinates & Functions", factories: [createCoordinateModel, createCoordinateRead, createCoordinateReasoning] },
  ];
  const generationIndexes = Object.fromEntries(categoryDefinitions.map(({ id }) => [id, 0]));

  categoryDefinitions.forEach((definition) => {
    const createGeneratedEntry = (difficulty) => {
      const level = clamp(difficulty);
      const index = generationIndexes[definition.id] || 0;
      generationIndexes[definition.id] = index + 1;
      return definition.factories[index % definition.factories.length](level);
    };
    const staticQuestions = Array.from({ length: 10 }, (_, index) => definition.factories[0](index + 1));
    globalThis.HomeworkQuestions?.register({
      id: definition.id,
      label: definition.label,
      getStaticQuestions: () => staticQuestions,
      generatedEntryFactory: createGeneratedEntry,
      generatedShare: 1,
    });
  });
})();

const FRACTION_VISUAL_INTERACTIVE_QUESTIONS = (() => {
  const COLORS = {
    ink: "#274972",
    line: "#8da7c2",
    soft: "#f8fbff",
    warm: "#fff8ea",
    fill: "#f5b942",
    fill2: "#69b7ff",
    good: "#5dbb7f",
    bad: "#f08f7f",
    empty: "#ffffff",
  };
  const LETTERS = ["A", "B", "C", "D"];

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function clampDifficulty(value) {
    const level = Number.parseInt(value, 10);
    return Number.isFinite(level) ? Math.max(1, Math.min(10, level)) : 3;
  }

  function gcd(a, b) {
    let x = Math.abs(a);
    let y = Math.abs(b);
    while (y) {
      const next = x % y;
      x = y;
      y = next;
    }
    return x || 1;
  }

  function simplify(numerator, denominator) {
    const divisor = gcd(numerator, denominator);
    return [numerator / divisor, denominator / divisor];
  }

  function fractionText(numerator, denominator) {
    return denominator === 1 ? String(numerator) : `${numerator}/${denominator}`;
  }

  function randomChoice(values) {
    if (typeof globalThis.randomChoice === "function") {
      return globalThis.randomChoice(values);
    }
    return values[Math.floor(Math.random() * values.length)];
  }

  function shuffle(values) {
    if (typeof globalThis.shuffleArray === "function") {
      return globalThis.shuffleArray(values);
    }
    const copy = [...values];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
  }

  function card(title, bodyHtml, note = "") {
    return `
      <div class="fraction-visual">
        <div class="fraction-visual-title">${escapeHtml(title)}</div>
        ${bodyHtml}
        ${note ? `<div class="fraction-visual-note">${escapeHtml(note)}</div>` : ""}
      </div>
    `;
  }

  function polarToCartesian(cx, cy, radius, angleDegrees) {
    const angleRadians = ((angleDegrees - 90) * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(angleRadians),
      y: cy + radius * Math.sin(angleRadians),
    };
  }

  function describeSector(cx, cy, radius, startAngle, endAngle) {
    const start = polarToCartesian(cx, cy, radius, endAngle);
    const end = polarToCartesian(cx, cy, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      `M ${cx.toFixed(2)} ${cy.toFixed(2)}`,
      `L ${start.x.toFixed(2)} ${start.y.toFixed(2)}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`,
      "Z",
    ].join(" ");
  }

  function renderFractionShape({ shape = "circle", numerator = 1, denominator = 2, selectedParts = null, showLabels = false } = {}) {
    const selected = new Set(
      Array.isArray(selectedParts)
        ? selectedParts
        : Array.from({ length: numerator }, (_, index) => index)
    );

    if (shape === "circle") {
      const cx = 70;
      const cy = 70;
      const radius = 58;
      const angleStep = 360 / denominator;
      const parts = Array.from({ length: denominator }, (_, index) => {
        const startAngle = index * angleStep;
        const endAngle = startAngle + angleStep;
        const mid = polarToCartesian(cx, cy, 34, startAngle + angleStep / 2);
        return `
          <path d="${describeSector(cx, cy, radius, startAngle, endAngle)}" fill="${selected.has(index) ? COLORS.fill : COLORS.empty}" stroke="${COLORS.ink}" stroke-width="2"></path>
          ${showLabels ? `<text x="${mid.x.toFixed(1)}" y="${mid.y.toFixed(1)}" text-anchor="middle" dominant-baseline="middle" font-size="13" font-weight="800" fill="${COLORS.ink}">${index + 1}</text>` : ""}
        `;
      }).join("");
      return `<svg class="fraction-shape" viewBox="0 0 140 140" role="img" aria-hidden="true">${parts}<circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="${COLORS.ink}" stroke-width="2.5"></circle></svg>`;
    }

    if (shape === "triangle") {
      const height = 98;
      const partHeight = height / denominator;
      const parts = Array.from({ length: denominator }, (_, index) => {
        const y = 20 + index * partHeight;
        return `<rect x="${30 + index * 4}" y="${y}" width="${80 - index * 8}" height="${partHeight}" fill="${selected.has(index) ? COLORS.fill : COLORS.empty}" stroke="${COLORS.ink}" stroke-width="1.8"></rect>`;
      }).join("");
      return `<svg class="fraction-shape" viewBox="0 0 140 140" role="img" aria-hidden="true"><clipPath id="fv-triangle-${denominator}-${numerator}"><polygon points="70,18 124,118 16,118"></polygon></clipPath><g clip-path="url(#fv-triangle-${denominator}-${numerator})">${parts}</g><polygon points="70,18 124,118 16,118" fill="none" stroke="${COLORS.ink}" stroke-width="2.5"></polygon></svg>`;
    }

    const columns = denominator % 2 === 0 && denominator > 2 ? denominator / 2 : denominator;
    const rows = Math.ceil(denominator / columns);
    const cellWidth = 112 / columns;
    const cellHeight = 88 / rows;
    const rects = Array.from({ length: denominator }, (_, index) => {
      const row = Math.floor(index / columns);
      const column = index % columns;
      return `<rect x="${14 + column * cellWidth}" y="${26 + row * cellHeight}" width="${cellWidth}" height="${cellHeight}" fill="${selected.has(index) ? COLORS.fill2 : COLORS.empty}" stroke="${COLORS.ink}" stroke-width="2"></rect>`;
    }).join("");
    return `<svg class="fraction-shape" viewBox="0 0 140 140" role="img" aria-hidden="true">${rects}</svg>`;
  }

  function renderFractionBar({ numerator = 1, denominator = 2 } = {}) {
    const width = 280;
    const height = 54;
    const partWidth = width / denominator;
    const parts = Array.from({ length: denominator }, (_, index) =>
      `<rect x="${index * partWidth}" y="0" width="${partWidth}" height="${height}" fill="${index < numerator ? COLORS.fill : COLORS.empty}" stroke="${COLORS.ink}" stroke-width="2"></rect>`
    ).join("");
    return `<svg class="fraction-bar" viewBox="0 0 ${width} ${height}" role="img" aria-hidden="true">${parts}</svg>`;
  }

  function renderFractionNumberLine({ numerator = 1, denominator = 2, min = 0, max = 1, labels = true } = {}) {
    const width = 340;
    const height = 112;
    const left = 30;
    const right = 24;
    const y = 48;
    const inner = width - left - right;
    const markerX = left + (numerator / denominator) * inner;
    const ticks = Array.from({ length: denominator + 1 }, (_, index) => {
      const x = left + (index / denominator) * inner;
      const label = index === 0 ? String(min) : index === denominator ? String(max) : `${index}/${denominator}`;
      return `<line x1="${x}" y1="${y - 14}" x2="${x}" y2="${y + 14}" stroke="${COLORS.ink}" stroke-width="${index === numerator ? 2.5 : 1.5}"></line>${labels ? `<text x="${x}" y="88" text-anchor="middle" font-size="11" fill="${COLORS.ink}">${escapeHtml(label)}</text>` : ""}`;
    }).join("");
    return `<svg class="fraction-number-line" viewBox="0 0 ${width} ${height}" role="img" aria-hidden="true"><line x1="${left}" y1="${y}" x2="${width - right}" y2="${y}" stroke="${COLORS.ink}" stroke-width="2.5"></line>${ticks}<circle cx="${markerX}" cy="${y}" r="8" fill="${COLORS.fill}" stroke="${COLORS.ink}" stroke-width="2"></circle></svg>`;
  }

  function renderFractionSet({ selected = 1, total = 4, icon = "dot" } = {}) {
    const columns = Math.min(5, total);
    const rows = Math.ceil(total / columns);
    const cell = 34;
    const width = 18 + columns * cell;
    const height = 18 + rows * cell;
    const items = Array.from({ length: total }, (_, index) => {
      const x = 12 + (index % columns) * cell + cell / 2;
      const y = 12 + Math.floor(index / columns) * cell + cell / 2;
      const fill = index < selected ? COLORS.fill2 : COLORS.empty;
      if (icon === "star") {
        return `<text x="${x}" y="${y + 9}" text-anchor="middle" font-size="28" fill="${index < selected ? COLORS.fill : COLORS.line}" stroke="${COLORS.ink}" stroke-width="0.35">*</text>`;
      }
      return `<circle cx="${x}" cy="${y}" r="12" fill="${fill}" stroke="${COLORS.ink}" stroke-width="2"></circle>`;
    }).join("");
    return `<svg class="fraction-set" viewBox="0 0 ${width} ${height}" role="img" aria-hidden="true">${items}</svg>`;
  }

  function renderFractionWall({ rows = [], highlight = "" } = {}) {
    const width = 320;
    const rowHeight = 30;
    const gap = 7;
    const body = rows.map((denominator, rowIndex) => {
      const y = rowIndex * (rowHeight + gap);
      const partWidth = width / denominator;
      return Array.from({ length: denominator }, (_, index) =>
        `<rect x="${index * partWidth}" y="${y}" width="${partWidth}" height="${rowHeight}" fill="${highlight === `${index + 1}/${denominator}` ? COLORS.fill : COLORS.empty}" stroke="${COLORS.ink}" stroke-width="1.5"></rect>`
      ).join("");
    }).join("");
    return `<svg class="fraction-wall" viewBox="0 0 ${width} ${rows.length * (rowHeight + gap)}" role="img" aria-hidden="true">${body}</svg>`;
  }

  function renderMeasuringCup({ numerator = 1, denominator = 2 } = {}) {
    const level = 92 - (numerator / denominator) * 74;
    const marks = Array.from({ length: denominator + 1 }, (_, index) => {
      const y = 92 - (index / denominator) * 74;
      return `<line x1="92" y1="${y}" x2="108" y2="${y}" stroke="${COLORS.ink}" stroke-width="1.5"></line>`;
    }).join("");
    return `<svg class="measuring-cup" viewBox="0 0 140 120" role="img" aria-hidden="true"><path d="M35 18 H92 L82 104 H45 Z" fill="${COLORS.empty}" stroke="${COLORS.ink}" stroke-width="3"></path><path d="M42 ${level} H85 L82 104 H45 Z" fill="${COLORS.fill2}" opacity="0.85"></path>${marks}<path d="M92 38 C122 40 122 76 87 80" fill="none" stroke="${COLORS.ink}" stroke-width="3"></path></svg>`;
  }

  function renderClockFraction({ numerator = 1, denominator = 4 } = {}) {
    const angle = (360 * numerator) / denominator;
    const end = polarToCartesian(70, 70, 48, angle);
    return `<svg class="clock-fraction" viewBox="0 0 140 140" role="img" aria-hidden="true"><circle cx="70" cy="70" r="56" fill="${COLORS.empty}" stroke="${COLORS.ink}" stroke-width="3"></circle><path d="${describeSector(70, 70, 54, 0, angle)}" fill="${COLORS.fill}" opacity="0.82"></path><line x1="70" y1="70" x2="70" y2="18" stroke="${COLORS.ink}" stroke-width="3"></line><line x1="70" y1="70" x2="${end.x.toFixed(1)}" y2="${end.y.toFixed(1)}" stroke="${COLORS.ink}" stroke-width="3"></line><circle cx="70" cy="70" r="5" fill="${COLORS.ink}"></circle></svg>`;
  }

  function makeInteractiveEntry(config) {
    const answerIndexes = Array.isArray(config.answerIndexes) ? config.answerIndexes.map(Number) : [];
    const answer = String(config.answer || config.answerLabel || "Done");
    if (!String(config.question || "").trim() || !answer || !answerIndexes.length) {
      throw new Error("Fraction visual interactive entry is missing question, answer, or answer indexes.");
    }
    return {
      mode: "interactive",
      question: config.question,
      difficulty: clampDifficulty(config.difficulty),
      answer,
      answerLabel: config.answerLabel || answer,
      displayText: config.displayText || "",
      visualHtml: config.visualHtml || "",
      visualSummary: config.visualSummary || "",
      reviewText: config.reviewText || "",
      interactive: {
        type: config.type,
        layout: config.layout || "option-select",
        prompt: config.prompt || config.question,
        answerIndexes,
        minSelected: config.minSelected || answerIndexes.length,
        maxSelected: config.maxSelected || answerIndexes.length,
        parts: config.parts || [],
        choices: config.choices || [],
        checkLabel: config.checkLabel || "Check Answer",
        selectedLabel: config.selectedLabel || "Selected",
      },
    };
  }

  function makeOptionChoice(label, html, summary) {
    return { label, html, summary: summary || label };
  }

  function makePainter({ numerator, denominator, shape, level }) {
    const answerIndexes = Array.from({ length: numerator }, (_, index) => index);
    return makeInteractiveEntry({
      type: "fraction-painter",
      layout: "part-select",
      difficulty: level,
      question: `Tap ${numerator} of the ${denominator} equal parts to make ${fractionText(numerator, denominator)}.`,
      answer: `${numerator} parts`,
      answerLabel: fractionText(numerator, denominator),
      visualHtml: card("Fraction Painter", renderFractionShape({ shape, numerator: 0, denominator, selectedParts: [], showLabels: true }), "Tap the part buttons below, then check."),
      visualSummary: `A ${shape} is split into ${denominator} equal parts. The target is ${fractionText(numerator, denominator)}.`,
      reviewText: `${fractionText(numerator, denominator)} means ${numerator} of ${denominator} equal parts.`,
      answerIndexes,
      minSelected: numerator,
      maxSelected: numerator,
      parts: Array.from({ length: denominator }, (_, index) => ({
        label: `Part ${index + 1}`,
        html: `<span class="fraction-part-label">${index + 1}</span>`,
      })),
    });
  }

  function makeSameFraction({ numerator, denominator, level }) {
    const [simpleN, simpleD] = simplify(numerator, denominator);
    const equivalent = `${simpleN * 2}/${simpleD * 2}`;
    const wrongSameDenominatorNumerator = Math.min(simpleD, simpleN + 1);
    const choices = shuffle([
      makeOptionChoice("A", renderFractionShape({ shape: "circle", numerator: simpleN, denominator: simpleD }), fractionText(simpleN, simpleD)),
      makeOptionChoice("B", renderFractionShape({ shape: "rectangle", numerator: wrongSameDenominatorNumerator, denominator: simpleD }), fractionText(wrongSameDenominatorNumerator, simpleD)),
      makeOptionChoice("C", renderFractionShape({ shape: "rectangle", numerator: simpleN, denominator: simpleD + 1 }), fractionText(simpleN, simpleD + 1)),
      makeOptionChoice("D", renderFractionSet({ selected: simpleN, total: simpleD + 2 }), `${simpleN}/${simpleD + 2}`),
    ]).map((choice, index) => ({ ...choice, label: LETTERS[index] }));
    const answerIndex = choices.findIndex((choice) => choice.summary === fractionText(simpleN, simpleD));
    return makeInteractiveEntry({
      type: "shape-match",
      difficulty: level,
      question: `Which picture shows the same amount as ${equivalent}?`,
      answer: choices[answerIndex].label,
      answerLabel: choices[answerIndex].label,
      visualHtml: card("Target Fraction", renderFractionBar({ numerator: simpleN * 2, denominator: simpleD * 2 }), `${equivalent} has the same size as ${fractionText(simpleN, simpleD)}.`),
      visualSummary: `Target fraction ${equivalent}. One option shows ${fractionText(simpleN, simpleD)} with a different model.`,
      reviewText: `${equivalent} simplifies to ${fractionText(simpleN, simpleD)}.`,
      choices,
      answerIndexes: [answerIndex],
    });
  }

  function makeEqualPartsDetective({ denominator, level }) {
    const choices = shuffle([
      makeOptionChoice("A", renderFractionShape({ shape: "rectangle", numerator: 1, denominator }), "equal"),
      makeOptionChoice("B", `<svg class="fraction-shape" viewBox="0 0 140 140" role="img" aria-hidden="true"><rect x="14" y="28" width="112" height="84" fill="${COLORS.empty}" stroke="${COLORS.ink}" stroke-width="2"></rect><line x1="42" y1="28" x2="42" y2="112" stroke="${COLORS.ink}" stroke-width="2"></line><line x1="90" y1="28" x2="90" y2="112" stroke="${COLORS.ink}" stroke-width="2"></line></svg>`, "unequal"),
      makeOptionChoice("C", renderFractionShape({ shape: "circle", numerator: 1, denominator: 4 }), "equal-circle"),
      makeOptionChoice("D", renderFractionBar({ numerator: 1, denominator }), "equal-bar"),
    ]).map((choice, index) => ({ ...choice, label: LETTERS[index] }));
    const answerIndex = choices.findIndex((choice) => choice.summary === "unequal");
    return makeInteractiveEntry({
      type: "equal-parts-detective",
      difficulty: level,
      question: "Which picture cannot be used for a fraction because the parts are not equal?",
      answer: choices[answerIndex].label,
      answerLabel: choices[answerIndex].label,
      visualSummary: "One option has unequal parts, so it is not a fair fraction model.",
      reviewText: "The denominator counts equal parts. Unequal parts do not make a valid fraction model.",
      choices,
      answerIndexes: [answerIndex],
    });
  }

  function makeShapeSlicer({ denominator, level }) {
    const answerCuts = denominator - 1;
    const choices = shuffle([answerCuts, denominator, Math.max(1, denominator - 2), denominator + 1])
      .map((cuts, index) => makeOptionChoice(LETTERS[index], `<div class="fraction-big-number">${cuts}</div>`, String(cuts)));
    const answerIndex = choices.findIndex((choice) => choice.summary === String(answerCuts));
    return makeInteractiveEntry({
      type: "shape-slicer",
      difficulty: level,
      question: `How many straight cuts make ${denominator} equal slices in one bar?`,
      answer: choices[answerIndex].label,
      answerLabel: `${answerCuts} cuts`,
      visualHtml: card("Shape Slicer", renderFractionBar({ numerator: 0, denominator }), "Count the spaces between slices."),
      visualSummary: `A bar split into ${denominator} equal parts needs ${answerCuts} cuts.`,
      reviewText: `${answerCuts} cuts can make ${denominator} equal parts because cuts go between parts.`,
      choices,
      answerIndexes: [answerIndex],
    });
  }

  function makeMatchCards({ numerator, denominator, level }) {
    const target = fractionText(numerator, denominator);
    const choices = shuffle([
      makeOptionChoice("A", renderFractionSet({ selected: numerator, total: denominator }), target),
      makeOptionChoice("B", renderFractionSet({ selected: denominator - numerator, total: denominator }), fractionText(denominator - numerator, denominator)),
      makeOptionChoice("C", renderFractionShape({ shape: "circle", numerator, denominator: denominator + 1 }), fractionText(numerator, denominator + 1)),
      makeOptionChoice("D", renderFractionBar({ numerator: Math.max(1, numerator - 1), denominator }), fractionText(Math.max(1, numerator - 1), denominator)),
    ]).map((choice, index) => ({ ...choice, label: LETTERS[index] }));
    const answerIndex = choices.findIndex((choice) => choice.summary === target);
    return makeInteractiveEntry({
      type: "fraction-match-cards",
      difficulty: level,
      question: `Which card matches ${target}?`,
      answer: choices[answerIndex].label,
      answerLabel: choices[answerIndex].label,
      visualHtml: card("Fraction Card", `<div class="fraction-target-text">${target}</div>`),
      visualSummary: `Find the visual model that shows ${target}.`,
      reviewText: `${target} means ${numerator} selected out of ${denominator} equal parts or objects.`,
      choices,
      answerIndexes: [answerIndex],
    });
  }

  function makeNumberLineLander({ numerator, denominator, level }) {
    const target = fractionText(numerator, denominator);
    const points = shuffle([numerator, Math.max(1, numerator - 1), Math.min(denominator - 1, numerator + 1), denominator])
      .filter((value, index, values) => values.indexOf(value) === index)
      .slice(0, 4);
    while (points.length < 4) points.push(points.length);
    const choices = points.map((point, index) =>
      makeOptionChoice(LETTERS[index], renderFractionNumberLine({ numerator: point, denominator, labels: false }), fractionText(point, denominator))
    );
    const answerIndex = choices.findIndex((choice) => choice.summary === target);
    return makeInteractiveEntry({
      type: "number-line-lander",
      difficulty: level,
      question: `Which landing spot is ${target} on the number line?`,
      answer: choices[answerIndex].label,
      answerLabel: choices[answerIndex].label,
      visualSummary: `${target} is a distance from 0 on a number line divided into ${denominator} equal steps.`,
      reviewText: "On a number line, the numerator counts equal steps from 0.",
      choices,
      answerIndexes: [answerIndex],
    });
  }

  function benchmarkLabel(numerator, denominator) {
    const value = numerator / denominator;
    if (value < 0.25) return "near 0";
    if (value < 0.75) return "near 1/2";
    if (value <= 1) return "near 1";
    return "greater than 1";
  }

  function makeBenchmarkSort({ numerator, denominator, level }) {
    const answer = benchmarkLabel(numerator, denominator);
    const labels = ["near 0", "near 1/2", "near 1", "greater than 1"];
    const choices = labels.map((label, index) => makeOptionChoice(LETTERS[index], `<div class="fraction-benchmark-bucket">${escapeHtml(label)}</div>`, label));
    const answerIndex = choices.findIndex((choice) => choice.summary === answer);
    return makeInteractiveEntry({
      type: "benchmark-sort",
      difficulty: level,
      question: `Where does ${fractionText(numerator, denominator)} belong?`,
      answer: choices[answerIndex].label,
      answerLabel: answer,
      visualHtml: card("Benchmark", renderFractionNumberLine({ numerator: Math.min(numerator, denominator), denominator, labels: true }), "Compare the fraction to 0, 1/2, and 1."),
      visualSummary: `${fractionText(numerator, denominator)} is ${answer}.`,
      reviewText: "Benchmarks help compare fractions by distance from 0, 1/2, and 1.",
      choices,
      answerIndexes: [answerIndex],
    });
  }

  function makeEquivalentTransformer({ numerator, denominator, multiplier, level }) {
    const target = fractionText(numerator, denominator);
    const answerFraction = fractionText(numerator * multiplier, denominator * multiplier);
    const choices = shuffle([
      answerFraction,
      fractionText(numerator + multiplier, denominator + multiplier),
      fractionText(numerator * multiplier, denominator),
      fractionText(numerator, denominator * multiplier),
    ]).map((value, index) => makeOptionChoice(LETTERS[index], `<div class="fraction-target-text">${escapeHtml(value)}</div>`, value));
    const answerIndex = choices.findIndex((choice) => choice.summary === answerFraction);
    return makeInteractiveEntry({
      type: "equivalent-fraction-transformer",
      difficulty: level,
      question: `Which fraction is equivalent to ${target}?`,
      answer: choices[answerIndex].label,
      answerLabel: answerFraction,
      visualHtml: card("Fraction Wall", renderFractionWall({ rows: [denominator, denominator * multiplier], highlight: answerFraction })),
      visualSummary: `${answerFraction} covers the same amount as ${target}.`,
      reviewText: `Multiply the numerator and denominator by ${multiplier}: ${target} = ${answerFraction}.`,
      choices,
      answerIndexes: [answerIndex],
    });
  }

  function makeMissingPiece({ numerator, denominator, level }) {
    const missing = denominator - numerator;
    const answerFraction = fractionText(missing, denominator);
    const choices = shuffle([
      answerFraction,
      fractionText(numerator, denominator),
      fractionText(Math.max(1, missing - 1), denominator),
      fractionText(missing, denominator + 1),
    ]).map((value, index) => makeOptionChoice(LETTERS[index], `<div class="fraction-target-text">${escapeHtml(value)}</div>`, value));
    const answerIndex = choices.findIndex((choice) => choice.summary === answerFraction);
    return makeInteractiveEntry({
      type: "missing-piece",
      difficulty: level,
      question: `The model shows ${fractionText(numerator, denominator)}. What fraction is missing to make 1 whole?`,
      answer: choices[answerIndex].label,
      answerLabel: answerFraction,
      visualHtml: card("Missing Piece", renderFractionShape({ shape: "circle", numerator, denominator })),
      visualSummary: `${numerator} of ${denominator} parts are present, so ${missing} of ${denominator} parts are missing.`,
      reviewText: `${fractionText(numerator, denominator)} + ${answerFraction} = 1 whole.`,
      choices,
      answerIndexes: [answerIndex],
    });
  }

  function makeFractionOfSet({ numerator, denominator, groups, level }) {
    const total = denominator * groups;
    const selected = numerator * groups;
    const answerIndexes = Array.from({ length: selected }, (_, index) => index);
    return makeInteractiveEntry({
      type: "fraction-of-set",
      layout: "part-select",
      difficulty: level,
      question: `Tap ${fractionText(numerator, denominator)} of the ${total} objects.`,
      answer: `${selected} objects`,
      answerLabel: `${selected} of ${total}`,
      visualHtml: card("Fraction of a Set", renderFractionSet({ selected: 0, total, icon: "dot" }), `${fractionText(numerator, denominator)} of ${total} is ${selected}.`),
      visualSummary: `There are ${total} objects. ${fractionText(numerator, denominator)} of them is ${selected} objects.`,
      reviewText: `Divide ${total} objects into ${denominator} equal groups, then take ${numerator} groups.`,
      answerIndexes,
      minSelected: selected,
      maxSelected: selected,
      parts: Array.from({ length: total }, (_, index) => ({
        label: `Object ${index + 1}`,
        html: `<span class="fraction-object-dot"></span>`,
      })),
    });
  }

  function buildUniqueFractionOptionValues(targetNumerator, denominator, candidates) {
    const values = [targetNumerator, ...candidates]
      .map((value) => Math.max(1, Math.min(denominator, Math.round(Number(value) || 1))))
      .filter((value, index, list) => list.indexOf(value) === index);
    for (let value = 1; values.length < 4 && value <= denominator; value += 1) {
      if (!values.includes(value)) values.push(value);
    }
    return values.slice(0, 4);
  }

  function makeMeasuringCupMatch({ numerator, denominator, level }) {
    const target = fractionText(numerator, denominator);
    const values = buildUniqueFractionOptionValues(numerator, denominator, [
      numerator - 1,
      numerator + 1,
      Math.floor(denominator / 2),
      denominator,
    ]);
    const choices = shuffle(values).map((value, index) =>
      makeOptionChoice(LETTERS[index], renderMeasuringCup({ numerator: value, denominator }), fractionText(value, denominator))
    );
    const answerIndex = choices.findIndex((choice) => choice.summary === target);
    return makeInteractiveEntry({
      type: "measuring-cup-match",
      difficulty: level,
      question: `Which measuring cup is filled to ${target}?`,
      answer: choices[answerIndex].label,
      answerLabel: target,
      visualHtml: card("Measuring Cup Target", `<div class="fraction-target-text">${target}</div>`, "Compare the fill line to the equal marks."),
      visualSummary: `Find a measuring cup filled to ${target}.`,
      reviewText: `${target} means the fill reaches ${numerator} of ${denominator} equal marks.`,
      choices,
      answerIndexes: [answerIndex],
    });
  }

  function makeClockFractionMatch({ numerator, denominator, level }) {
    const target = fractionText(numerator, denominator);
    const values = buildUniqueFractionOptionValues(numerator, denominator, [
      numerator - 1,
      numerator + 1,
      denominator / 2,
      denominator,
    ]);
    const choices = shuffle(values).map((value, index) =>
      makeOptionChoice(LETTERS[index], renderClockFraction({ numerator: value, denominator }), fractionText(value, denominator))
    );
    const answerIndex = choices.findIndex((choice) => choice.summary === target);
    return makeInteractiveEntry({
      type: "clock-fraction-match",
      difficulty: level,
      question: `Which clock shows ${target} of a full turn shaded?`,
      answer: choices[answerIndex].label,
      answerLabel: target,
      visualSummary: `Find the clock sector that covers ${target} of the circle.`,
      reviewText: `A full turn is one whole. ${target} shades ${numerator} of ${denominator} equal clock parts.`,
      choices,
      answerIndexes: [answerIndex],
    });
  }

  const VARIANT_BUILDERS = [
    ...[
      [1, () => makePainter({ numerator: 1, denominator: 2, shape: "circle", level: 1 })],
      [1, () => makePainter({ numerator: 1, denominator: 3, shape: "rectangle", level: 1 })],
      [1, () => makePainter({ numerator: 1, denominator: 4, shape: "circle", level: 1 })],
      [2, () => makePainter({ numerator: 2, denominator: 4, shape: "rectangle", level: 2 })],
      [2, () => makePainter({ numerator: 3, denominator: 4, shape: "circle", level: 2 })],
      [2, () => makeEqualPartsDetective({ denominator: 3, level: 2 })],
      [3, () => makeSameFraction({ numerator: 2, denominator: 4, level: 3 })],
      [3, () => makeMatchCards({ numerator: 3, denominator: 4, level: 3 })],
      [3, () => makeShapeSlicer({ denominator: 4, level: 3 })],
      [3, () => makeClockFractionMatch({ numerator: 1, denominator: 4, level: 3 })],
      [4, () => makeNumberLineLander({ numerator: 3, denominator: 6, level: 4 })],
      [4, () => makeBenchmarkSort({ numerator: 5, denominator: 8, level: 4 })],
      [4, () => makeSameFraction({ numerator: 3, denominator: 6, level: 4 })],
      [4, () => makeMeasuringCupMatch({ numerator: 1, denominator: 2, level: 4 })],
      [5, () => makeEquivalentTransformer({ numerator: 1, denominator: 2, multiplier: 3, level: 5 })],
      [5, () => makeFractionOfSet({ numerator: 2, denominator: 3, groups: 4, level: 5 })],
      [5, () => makeMissingPiece({ numerator: 5, denominator: 8, level: 5 })],
      [6, () => makeEquivalentTransformer({ numerator: 2, denominator: 3, multiplier: 4, level: 6 })],
      [6, () => makeFractionOfSet({ numerator: 3, denominator: 4, groups: 3, level: 6 })],
      [6, () => makeMissingPiece({ numerator: 7, denominator: 10, level: 6 })],
      [6, () => makeMeasuringCupMatch({ numerator: 3, denominator: 4, level: 6 })],
      [7, () => makeBenchmarkSort({ numerator: 7, denominator: 6, level: 7 })],
      [7, () => makeNumberLineLander({ numerator: 5, denominator: 8, level: 7 })],
      [7, () => makeEquivalentTransformer({ numerator: 3, denominator: 5, multiplier: 3, level: 7 })],
      [7, () => makeClockFractionMatch({ numerator: 3, denominator: 4, level: 7 })],
      [8, () => makeMatchCards({ numerator: 5, denominator: 6, level: 8 })],
      [8, () => makeMissingPiece({ numerator: 11, denominator: 12, level: 8 })],
      [8, () => makeShapeSlicer({ denominator: 8, level: 8 })],
      [9, () => makeFractionOfSet({ numerator: 5, denominator: 6, groups: 3, level: 9 })],
      [9, () => makeBenchmarkSort({ numerator: 9, denominator: 10, level: 9 })],
      [9, () => makeEquivalentTransformer({ numerator: 4, denominator: 7, multiplier: 2, level: 9 })],
      [10, () => makeNumberLineLander({ numerator: 7, denominator: 10, level: 10 })],
      [10, () => makeMissingPiece({ numerator: 13, denominator: 16, level: 10 })],
      [10, () => makeSameFraction({ numerator: 6, denominator: 8, level: 10 })],
    ],
  ].map(([level, create]) => ({ level, create }));

  function createGeneratedEntry(difficulty) {
    const level = clampDifficulty(difficulty);
    const eligible = VARIANT_BUILDERS.filter((variant) => variant.level <= level);
    return randomChoice(eligible.length ? eligible : VARIANT_BUILDERS).create();
  }

  function createCoverageEntries() {
    const entries = [];
    for (let level = 1; level <= 10; level += 1) {
      const eligible = VARIANT_BUILDERS.filter((variant) => variant.level <= level);
      for (let index = 0; index < 6; index += 1) {
        entries.push(eligible[index % eligible.length].create());
      }
    }
    return entries;
  }

  globalThis.renderFractionShape = renderFractionShape;
  globalThis.renderFractionBar = renderFractionBar;
  globalThis.renderFractionNumberLine = renderFractionNumberLine;
  globalThis.renderFractionSet = renderFractionSet;
  globalThis.renderFractionWall = renderFractionWall;
  globalThis.renderMeasuringCup = renderMeasuringCup;
  globalThis.renderClockFraction = renderClockFraction;
  globalThis.createFractionVisualInteractiveEntry = createGeneratedEntry;
  globalThis.getFractionVisualInteractiveCoverageEntries = createCoverageEntries;

  return {
    createGeneratedEntry,
    createCoverageEntries,
  };
})();

globalThis.HomeworkQuestions?.register({
  id: "fraction-visual-interactives",
  label: "Visual Fraction Interactives",
  generatedEntryFactory: FRACTION_VISUAL_INTERACTIVE_QUESTIONS.createGeneratedEntry,
  generatedShare: 1,
});

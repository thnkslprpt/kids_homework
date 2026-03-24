const VISUAL_MEASUREMENT_QUESTIONS = [
  {
    question: "How long is the pencil shown on the ruler?",
    visualHtml: buildVisualMeasurementCard(
      "Ruler",
      buildRulerSvg({ start: 1, end: 6 }),
      "Measure from the start mark to the end mark."
    ),
    options: ["4 cm", "5 cm", "6 cm", "7 cm"],
    answer: "5 cm",
    difficulty: 1,
  },
  {
    question: "What time is shown on the clock?",
    visualHtml: buildVisualMeasurementCard(
      "Clock",
      buildClockSvg({ hour: 3, minute: 0 }),
      "Look at the hands."
    ),
    options: ["3:00", "4:00", "3:30", "2:00"],
    answer: "3:00",
    difficulty: 1,
  },
  {
    question: "Which object is heavier?",
    visualHtml: buildVisualMeasurementCard(
      "Balance scale",
      buildScaleSvg({ leftLabel: "Apple", rightLabel: "Feather", leftDown: true }),
      "The lower side is heavier."
    ),
    options: ["Apple", "Feather", "They are equal", "The table"],
    answer: "Apple",
    difficulty: 1,
  },
  {
    question: "Which thermometer reading is closest to a cool day?",
    visualHtml: buildVisualMeasurementCard(
      "Thermometer",
      buildThermometerSvg({ temperature: 12 }),
      "Read the red line."
    ),
    options: ["About 5°C", "About 12°C", "About 25°C", "About 40°C"],
    answer: "About 12°C",
    difficulty: 2,
  },
  {
    question: "How long is the pencil shown on the ruler?",
    visualHtml: buildVisualMeasurementCard(
      "Ruler",
      buildRulerSvg({ start: 2, end: 7.5 }),
      "The pencil starts at 2 cm."
    ),
    options: ["4.5 cm", "5.5 cm", "6 cm", "7 cm"],
    answer: "5.5 cm",
    difficulty: 2,
  },
  {
    question: "What time is shown on the clock?",
    visualHtml: buildVisualMeasurementCard(
      "Clock",
      buildClockSvg({ hour: 6, minute: 30 }),
      "The long hand points to 6."
    ),
    options: ["6:00", "6:15", "6:30", "7:30"],
    answer: "6:30",
    difficulty: 2,
  },
  {
    question: "Which sentence is true about the line of symmetry?",
    visualHtml: buildVisualMeasurementCard(
      "Shape",
      buildSymmetrySvg({ type: "heart", mirror: true }),
      "The dashed line shows the fold line."
    ),
    options: [
      "The shape would match if folded on the line",
      "The shape has no sides",
      "The shape is a circle",
      "The line is a measurement scale",
    ],
    answer: "The shape would match if folded on the line",
    difficulty: 2,
  },
  {
    question: "What temperature is shown?",
    visualHtml: buildVisualMeasurementCard(
      "Thermometer",
      buildThermometerSvg({ temperature: 28 }),
      "The red line shows the temperature."
    ),
    options: ["About 18°C", "About 22°C", "About 28°C", "About 38°C"],
    answer: "About 28°C",
    difficulty: 3,
  },
  {
    question: "Which cup costs less per cup?",
    visualHtml: buildVisualMeasurementCard(
      "Receipt",
      buildReceiptHtml([
        ["2 cups", "10 shekels"],
        ["4 cups", "16 shekels"],
      ]),
      "Compare the unit price."
    ),
    options: ["2 cups for 10 shekels", "4 cups for 16 shekels", "They cost the same", "The receipt is missing"],
    answer: "4 cups for 16 shekels",
    difficulty: 3,
  },
  {
    question: "How many centimeters long is the line?",
    visualHtml: buildVisualMeasurementCard(
      "Ruler",
      buildRulerSvg({ start: 0, end: 12 }),
      "Use the full ruler marks."
    ),
    options: ["10 cm", "11 cm", "12 cm", "13 cm"],
    answer: "12 cm",
    difficulty: 3,
  },
  {
    question: "Which side is heavier on the scale?",
    visualHtml: buildVisualMeasurementCard(
      "Balance scale",
      buildScaleSvg({ leftLabel: "Book", rightLabel: "Pencil", leftDown: false }),
      "The lower side is heavier."
    ),
    options: ["Pencil", "Book", "Both are equal", "The rope"],
    answer: "Pencil",
    difficulty: 3,
  },
  {
    question: "What time is shown on the clock?",
    visualHtml: buildVisualMeasurementCard(
      "Clock",
      buildClockSvg({ hour: 9, minute: 45 }),
      "The minute hand points to 9."
    ),
    options: ["9:45", "9:15", "10:45", "8:45"],
    answer: "9:45",
    difficulty: 4,
  },
  {
    question: "Which bottle has the better value?",
    visualHtml: buildVisualMeasurementCard(
      "Receipt",
      buildReceiptHtml([
        ["500 mL", "6 shekels"],
        ["1 liter", "10 shekels"],
      ]),
      "Compare the price per milliliter."
    ),
    options: ["500 mL for 6 shekels", "1 liter for 10 shekels", "They cost the same", "The smaller bottle"],
    answer: "1 liter for 10 shekels",
    difficulty: 4,
  },
  {
    question: "Which temperature is closest?",
    visualHtml: buildVisualMeasurementCard(
      "Thermometer",
      buildThermometerSvg({ temperature: 34 }),
      "Read the red line."
    ),
    options: ["About 14°C", "About 24°C", "About 34°C", "About 44°C"],
    answer: "About 34°C",
    difficulty: 4,
  },
  {
    question: "Which figure shows a reflection across the dotted line?",
    visualHtml: buildVisualMeasurementCard(
      "Reflection",
      buildSymmetrySvg({ type: "arrow", mirror: true }),
      "The two sides should match as mirror images."
    ),
    options: ["The mirrored arrow", "A rotated square", "A larger triangle", "A circle"],
    answer: "The mirrored arrow",
    difficulty: 4,
  },
  {
    question: "How many centimeters long is the line?",
    visualHtml: buildVisualMeasurementCard(
      "Ruler",
      buildRulerSvg({ start: 3, end: 9.5 }),
      "The line begins at 3 cm."
    ),
    options: ["5.5 cm", "6 cm", "6.5 cm", "7 cm"],
    answer: "6.5 cm",
    difficulty: 5,
  },
  {
    question: "Which shape stays the same after a 180-degree turn?",
    visualHtml: buildVisualMeasurementCard(
      "Transformations",
      buildRotationCard(),
      "Think about rotation."
    ),
    options: ["A rectangle", "A lowercase b", "A triangle", "A number 7"],
    answer: "A rectangle",
    difficulty: 5,
  },
  {
    question: "What is the best estimate for the temperature?",
    visualHtml: buildVisualMeasurementCard(
      "Thermometer",
      buildThermometerSvg({ temperature: 41 }),
      "The red line is high on the scale."
    ),
    options: ["About 21°C", "About 31°C", "About 41°C", "About 51°C"],
    answer: "About 41°C",
    difficulty: 5,
  },
];

function createVisualMeasurementGeneratedEntry(difficulty) {
  const level = clampVisualMeasurementDifficulty(difficulty);
  const generators = {
    1: [createRulerQuestion, createClockQuestion, createScaleQuestion],
    2: [createThermometerQuestion, createReflectionQuestion, createRulerQuestion],
    3: [createReceiptQuestion, createClockQuestion, createScaleQuestion],
    4: [createUnitPriceQuestion, createThermometerQuestion, createReflectionQuestion],
    5: [createTransformationQuestion, createRulerQuestion, createThermometerQuestion],
  }[level];

  return visualMeasurementRandomChoice(generators)(level);
}

function createRulerQuestion(difficulty = 1) {
  const start = visualMeasurementRandomInt(0, 3);
  const length = visualMeasurementRandomChoice([4, 5, 6, 6.5, 7]);
  const end = start + length;
  const answer = `${length} cm`;
  return visualMeasurementBuildQuestion({
    question: "How long is the line shown on the ruler?",
    visualHtml: buildVisualMeasurementCard("Ruler", buildRulerSvg({ start, end }), "Read the start and end marks."),
    options: visualMeasurementBuildNumericOptions(answer, [answer, `${length + 1} cm`, `${Math.max(1, length - 1)} cm`, `${length + 2} cm`]),
    answer,
    difficulty,
    visualSummary: `The line is ${answer}.`,
  });
}

function createClockQuestion(difficulty = 2) {
  const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const hour = visualMeasurementRandomChoice(hours);
  const minute = visualMeasurementRandomChoice([0, 15, 30, 45]);
  const answer = visualMeasurementFormatClockTime(hour, minute);
  return visualMeasurementBuildQuestion({
    question: "What time is shown on the clock?",
    visualHtml: buildVisualMeasurementCard("Clock", buildClockSvg({ hour, minute }), "Look at the hands."),
    options: visualMeasurementBuildNumericOptions(answer, [
      answer,
      visualMeasurementFormatClockTime(hour + 1, minute),
      visualMeasurementFormatClockTime(hour, (minute + 15) % 60),
      visualMeasurementFormatClockTime(hour - 1, minute),
    ]),
    answer,
    difficulty,
    visualSummary: `The time is ${answer}.`,
  });
}

function createThermometerQuestion(difficulty = 2) {
  const temperature = visualMeasurementRandomChoice([8, 12, 18, 24, 28, 34, 40]);
  const answer = `About ${temperature}°C`;
  return visualMeasurementBuildQuestion({
    question: "What temperature is shown?",
    visualHtml: buildVisualMeasurementCard("Thermometer", buildThermometerSvg({ temperature }), "Read the red line."),
    options: visualMeasurementBuildNumericOptions(answer, [
      answer,
      `About ${temperature + 5}°C`,
      `About ${Math.max(0, temperature - 6)}°C`,
      `About ${temperature + 10}°C`,
    ]),
    answer,
    difficulty,
    visualSummary: `The temperature is ${answer}.`,
  });
}

function createScaleQuestion(difficulty = 2) {
  const heavier = visualMeasurementRandomChoice(["left", "right"]);
  const leftLabel = heavier === "left" ? "Book" : "Pencil";
  const rightLabel = heavier === "left" ? "Pencil" : "Book";
  const answer = heavier === "left" ? "Book" : "Pencil";
  return visualMeasurementBuildQuestion({
    question: "Which side is heavier?",
    visualHtml: buildVisualMeasurementCard(
      "Balance scale",
      buildScaleSvg({ leftLabel, rightLabel, leftDown: heavier === "left" }),
      "The lower side is heavier."
    ),
    options: visualMeasurementBuildNumericOptions(answer, [answer, heavier === "left" ? "Pencil" : "Book", "Both are equal", "The stand"]),
    answer,
    difficulty,
    visualSummary: `${answer} is heavier.`,
  });
}

function createReceiptQuestion(difficulty = 3) {
  const items = [
    { label: "2 cups", price: 10 },
    { label: "4 cups", price: 16 },
    { label: "5 cups", price: 23 },
    { label: "3 cups", price: 20 },
  ];
  const best = items.reduce((winner, item) => {
    const winnerUnit = winner.price / Number(winner.label.split(" ")[0]);
    const itemUnit = item.price / Number(item.label.split(" ")[0]);
    return itemUnit < winnerUnit ? item : winner;
  });
  const answer = best.label;
  return visualMeasurementBuildQuestion({
    question: "Which deal has the lowest price per cup?",
    visualHtml: buildVisualMeasurementCard("Receipt", buildReceiptHtml(items.map((item) => [item.label, `${item.price} shekels`])), "Compare unit price."),
    options: visualMeasurementBuildNumericOptions(answer, items.map((item) => item.label)),
    answer,
    difficulty,
    visualSummary: `${answer} has the best unit price.`,
  });
}

function createUnitPriceQuestion(difficulty = 4) {
  const items = [
    { label: "500 mL for 7 shekels", size: "500 mL", price: "7 shekels", value: 7 / 500 },
    { label: "1 liter for 10 shekels", size: "1 liter", price: "10 shekels", value: 10 / 1000 },
    { label: "250 mL for 4 shekels", size: "250 mL", price: "4 shekels", value: 4 / 250 },
    { label: "750 mL for 11 shekels", size: "750 mL", price: "11 shekels", value: 11 / 750 },
  ];
  const answer = items.reduce((winner, item) => (item.value < winner.value ? item : winner)).label;
  return visualMeasurementBuildQuestion({
    question: "Which bottle is the best value?",
    visualHtml: buildVisualMeasurementCard(
      "Receipt",
      buildReceiptHtml(items.map((item) => [item.size, item.price])),
      "Compare the price per milliliter."
    ),
    options: visualMeasurementBuildNumericOptions(answer, items.map((item) => item.label)),
    answer,
    difficulty,
    visualSummary: `${answer} has the lowest unit price.`,
  });
}

function createReflectionQuestion(difficulty = 4) {
  return visualMeasurementBuildQuestion({
    question: "Which image shows a reflection across the dotted line?",
    visualHtml: buildVisualMeasurementCard("Reflection", buildSymmetrySvg({ type: "arrow", mirror: true }), "Mirror images match across the line."),
    options: ["The mirrored arrow", "A bigger arrow", "A rotated square", "A circle"],
    answer: "The mirrored arrow",
    difficulty,
    visualSummary: "The mirrored arrow is a reflection.",
  });
}

function createTransformationQuestion(difficulty = 5) {
  return visualMeasurementBuildQuestion({
    question: "Which shape stays the same after a 180-degree turn?",
    visualHtml: buildVisualMeasurementCard("Transformations", buildRotationCard(), "Think about a half-turn."),
    options: ["A rectangle", "A triangle", "A lowercase b", "A number 7"],
    answer: "A rectangle",
    difficulty,
    visualSummary: "A rectangle matches after a half-turn.",
  });
}

function visualMeasurementBuildQuestion({
  question,
  options,
  answer,
  difficulty,
  visualHtml = "",
  visualSummary = "",
}) {
  if (!Array.isArray(options) || options.length !== 4 || !options.includes(answer)) {
    throw new Error("Visual measurement questions require exactly 4 options with one answer.");
  }

  return {
    question,
    visualHtml,
    options: visualMeasurementShuffleArray(options),
    answer,
    difficulty,
    visualSummary,
    type: "visual-measurement-choice",
  };
}

function buildVisualMeasurementCard(title, innerHtml, detailText = "") {
  return `
    <div style="
      display: inline-block;
      max-width: 640px;
      padding: 14px;
      border: 2px solid #274972;
      border-radius: 16px;
      background: linear-gradient(180deg, #f8fbff 0%, #eef5ff 100%);
      color: #274972;
      font-family: Arial, sans-serif;
    ">
      <div style="font-size: 16px; font-weight: 700; margin-bottom: 10px;">${visualMeasurementEscapeHtml(title)}</div>
      ${innerHtml}
      ${detailText ? `<div style="margin-top: 10px; font-size: 13px; line-height: 1.35;">${visualMeasurementEscapeHtml(detailText)}</div>` : ""}
    </div>
  `;
}

function buildRulerSvg({ start = 0, end = 5 } = {}) {
  const maxMark = Math.max(8, Math.ceil(end));
  const width = 20 + maxMark * 40 + 44;
  const height = 92;
  const left = 20;
  const scale = 40;
  const lineStart = left + start * scale;
  const lineEnd = left + end * scale;
  const ticks = [];
  for (let mark = 0; mark <= maxMark; mark += 1) {
    const x = left + mark * scale;
    const major = mark % 2 === 0;
    ticks.push(`
      <line x1="${x}" y1="36" x2="${x}" y2="${major ? 60 : 50}" stroke="#274972" stroke-width="2"></line>
      <text x="${x}" y="74" text-anchor="middle" font-size="11" fill="#274972">${mark}</text>
    `);
  }

  return `
    <svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-hidden="true">
      <rect x="${lineStart}" y="24" width="${Math.max(4, lineEnd - lineStart)}" height="18" rx="9" fill="#f2b134" stroke="#274972" stroke-width="2"></rect>
      <line x1="${left}" y1="42" x2="${width - 18}" y2="42" stroke="#274972" stroke-width="3"></line>
      ${ticks.join("")}
    </svg>
  `;
}

function buildThermometerSvg({ temperature = 20 } = {}) {
  const width = 110;
  const height = 200;
  const bulbY = 168;
  const topY = 24;
  const fillHeight = Math.max(20, Math.min(132, 168 - ((temperature - 0) / 50) * 132));
  return `
    <svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-hidden="true">
      <rect x="48" y="${topY}" width="14" height="132" rx="7" fill="#e7eef7" stroke="#274972" stroke-width="2"></rect>
      <rect x="51" y="${fillHeight}" width="8" height="${132 - (fillHeight - topY)}" rx="4" fill="#f25f5c"></rect>
      <circle cx="55" cy="${bulbY}" r="20" fill="#f25f5c" stroke="#274972" stroke-width="2"></circle>
      <line x1="30" y1="160" x2="80" y2="160" stroke="#274972" stroke-width="2"></line>
      <text x="10" y="40" font-size="12" fill="#274972">50</text>
      <text x="10" y="70" font-size="12" fill="#274972">40</text>
      <text x="10" y="100" font-size="12" fill="#274972">30</text>
      <text x="10" y="130" font-size="12" fill="#274972">20</text>
      <text x="10" y="160" font-size="12" fill="#274972">10</text>
      <text x="10" y="188" font-size="12" fill="#274972">0</text>
    </svg>
  `;
}

function buildClockSvg({ hour = 3, minute = 0 } = {}) {
  const width = 220;
  const height = 220;
  const cx = 110;
  const cy = 110;
  const hourAngle = ((hour % 12) + minute / 60) * 30 - 90;
  const minuteAngle = minute * 6 - 90;
  const hourHand = clockHand(cx, cy, 45, hourAngle);
  const minuteHand = clockHand(cx, cy, 72, minuteAngle);
  const ticks = [];
  for (let index = 0; index < 12; index += 1) {
    const angle = index * 30 - 90;
    const outer = polarPoint(cx, cy, 86, angle);
    const inner = polarPoint(cx, cy, 76, angle);
    ticks.push(`<line x1="${inner.x}" y1="${inner.y}" x2="${outer.x}" y2="${outer.y}" stroke="#274972" stroke-width="2"></line>`);
  }

  return `
    <svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-hidden="true">
      <circle cx="${cx}" cy="${cy}" r="88" fill="#fff" stroke="#274972" stroke-width="3"></circle>
      ${ticks.join("")}
      ${hourHand}
      ${minuteHand}
      <circle cx="${cx}" cy="${cy}" r="6" fill="#f25f5c" stroke="#274972" stroke-width="2"></circle>
    </svg>
  `;
}

function buildScaleSvg({ leftLabel = "A", rightLabel = "B", leftDown = true } = {}) {
  const leftY = leftDown ? 126 : 104;
  const rightY = leftDown ? 104 : 126;
  return `
    <svg viewBox="0 0 260 160" width="260" height="160" role="img" aria-hidden="true">
      <line x1="130" y1="25" x2="130" y2="126" stroke="#274972" stroke-width="4"></line>
      <line x1="50" y1="46" x2="210" y2="46" stroke="#274972" stroke-width="4"></line>
      <line x1="60" y1="${leftY}" x2="120" y2="60" stroke="#274972" stroke-width="4"></line>
      <line x1="140" y1="60" x2="200" y2="${rightY}" stroke="#274972" stroke-width="4"></line>
      <rect x="42" y="${leftY}" width="76" height="16" rx="8" fill="#dff0ff" stroke="#274972" stroke-width="2"></rect>
      <rect x="142" y="${rightY}" width="76" height="16" rx="8" fill="#fff0ce" stroke="#274972" stroke-width="2"></rect>
      <text x="80" y="${leftY + 12}" text-anchor="middle" font-size="12" fill="#274972">${visualMeasurementEscapeHtml(leftLabel)}</text>
      <text x="180" y="${rightY + 12}" text-anchor="middle" font-size="12" fill="#274972">${visualMeasurementEscapeHtml(rightLabel)}</text>
    </svg>
  `;
}

function buildReceiptHtml(items) {
  const rows = items
    .map(
      (item) =>
        `<tr><td style="padding: 6px 8px; border-bottom: 1px solid #c9d5e2;">${visualMeasurementEscapeHtml(
          item[0]
        )}</td><td style="padding: 6px 8px; border-bottom: 1px solid #c9d5e2; text-align: right;">${visualMeasurementEscapeHtml(
          item[1]
        )}</td></tr>`
    )
    .join("");

  return `
    <table style="border-collapse: collapse; min-width: 220px; font-size: 14px; background: #fff;">
      <tbody>${rows}</tbody>
    </table>
  `;
}

function buildSymmetrySvg({ type = "heart" } = {}) {
  if (type === "heart") {
    return `
      <svg viewBox="0 0 240 160" width="240" height="160" role="img" aria-hidden="true">
        <line x1="120" y1="10" x2="120" y2="150" stroke="#274972" stroke-dasharray="6 6" stroke-width="2"></line>
        <path d="M120 130 C70 80, 40 55, 60 35 C82 13, 108 35, 120 55 C132 35, 158 13, 180 35 C200 55, 170 80, 120 130 Z" fill="#f25f5c" stroke="#274972" stroke-width="3"></path>
      </svg>
    `;
  }

  return `
    <svg viewBox="0 0 240 160" width="240" height="160" role="img" aria-hidden="true">
      <line x1="120" y1="10" x2="120" y2="150" stroke="#274972" stroke-dasharray="6 6" stroke-width="2"></line>
      <path d="M46 86 H94 V70 L116 100 L94 130 V114 H46 Z" fill="#dff0ff" stroke="#274972" stroke-width="3"></path>
      <path d="M194 86 H146 V70 L124 100 L146 130 V114 H194 Z" fill="#fff0ce" stroke="#274972" stroke-width="3"></path>
    </svg>
  `;
}

function buildRotationCard() {
  return `
    <svg viewBox="0 0 220 150" width="220" height="150" role="img" aria-hidden="true">
      <rect x="35" y="45" width="60" height="36" rx="8" fill="#dff0ff" stroke="#274972" stroke-width="3"></rect>
      <rect x="125" y="45" width="60" height="36" rx="8" fill="#dff0ff" stroke="#274972" stroke-width="3" transform="rotate(180 155 63)"></rect>
      <text x="65" y="70" text-anchor="middle" font-size="12" fill="#274972">A</text>
      <text x="155" y="70" text-anchor="middle" font-size="12" fill="#274972">A</text>
    </svg>
  `;
}

function visualMeasurementFormatClockTime(hour, minute) {
  const normalizedHour = ((hour - 1 + 12) % 12) + 1;
  const normalizedMinute = minute.toString().padStart(2, "0");
  return `${normalizedHour}:${normalizedMinute}`;
}

function clockHand(cx, cy, length, angleDegrees) {
  const point = polarPoint(cx, cy, length, angleDegrees);
  const strokeWidth = length > 60 ? 4 : 6;
  return `<line x1="${cx}" y1="${cy}" x2="${point.x}" y2="${point.y}" stroke="#274972" stroke-width="${strokeWidth}" stroke-linecap="round"></line>`;
}

function polarPoint(cx, cy, radius, angleDegrees) {
  const radians = (angleDegrees * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians),
  };
}

function visualMeasurementBuildNumericOptions(answer, candidates) {
  const options = Array.from(new Set([String(answer), ...candidates.map(String)]));
  if (options.length !== 4 || !options.includes(String(answer))) {
    throw new Error("Visual measurement option sets must contain exactly 4 unique values.");
  }

  return visualMeasurementShuffleArray(options);
}

function clampVisualMeasurementDifficulty(value) {
  const level = Number.parseInt(value, 10);
  if (!Number.isFinite(level)) {
    return 3;
  }

  return Math.min(5, Math.max(1, level));
}

function visualMeasurementEscapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function visualMeasurementRandomChoice(values) {
  return values[Math.floor(Math.random() * values.length)];
}

function visualMeasurementRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function visualMeasurementShuffleArray(values) {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

const VISUAL_MATH_QUESTIONS = (() => {
  const COLORS = {
    ink: "#274972",
    grid: "#d7e2ee",
    axis: "#17324d",
    accent: "#f2b134",
    accent2: "#66a9ff",
    soft: "#f8fbff",
    soft2: "#fff8ea",
    fill: "#dff0ff",
    fill2: "#fff0ce",
    dot: "#f25f5c",
    chart: "#4d8cc8",
    chart2: "#b67cf2",
    success: "#5dbb7f",
  };

  function clampDifficulty(value) {
    const level = Number.parseInt(value, 10);
    return Number.isFinite(level) ? Math.min(10, Math.max(1, level)) : 3;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
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
    const options = uniqueStrings([normalizedAnswer, ...distractors.map(String)]);
    [
      "Not enough information",
      "They are equal",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "8",
      "10",
      "12",
      "16",
      "20",
      "24",
      "30",
    ].forEach((fallback) => {
      if (options.length < 4 && fallback !== normalizedAnswer && !options.includes(fallback)) {
        options.push(fallback);
      }
    });

    if (options.length < 4 || !options.includes(normalizedAnswer)) {
      throw new Error("Visual math question options must contain exactly 4 unique choices.");
    }

    return shuffleArray(options.slice(0, 4));
  }

  function makeNumericOptions(answer, distractors = []) {
    const numericAnswer = Number(answer);
    const options = [...distractors];
    if (Number.isFinite(numericAnswer)) {
      [1, -1, 2, -2, 3, -3, 4, -4, 5, -5, 10, -10].forEach((delta) => {
        options.push(numericAnswer + delta);
      });
    }
    return makeChoiceOptions(String(answer), options.map(String));
  }

  function card(title, bodyHtml, detailHtml = "") {
    return `
      <div style="box-sizing:border-box;display:inline-block;max-width:680px;padding:14px;border:2px solid ${COLORS.ink};border-radius:16px;background:linear-gradient(180deg,${COLORS.soft} 0%,${COLORS.soft2} 100%);color:${COLORS.ink};font-family:Arial,sans-serif;">
        <div style="font-size:16px;font-weight:700;margin-bottom:10px;">${escapeHtml(title)}</div>
        ${bodyHtml}
        ${detailHtml ? `<div style="margin-top:10px;font-size:13px;line-height:1.35;">${detailHtml}</div>` : ""}
      </div>
    `;
  }

  function figure(label, innerHtml) {
    return `<div style="text-align:center;"><div style="font-size:13px;font-weight:700;margin-bottom:6px;">${escapeHtml(label)}</div>${innerHtml}</div>`;
  }

  function comparisonCard(title, leftFigureHtml, rightFigureHtml, detailHtml = "") {
    return card(
      title,
      `<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:16px;align-items:flex-start;">${leftFigureHtml}${rightFigureHtml}</div>`,
      detailHtml
    );
  }

  function coordinateGrid({ minX = 0, maxX = 5, minY = 0, maxY = 5, points = [], title = "" } = {}) {
    const cell = maxX - minX > 8 || maxY - minY > 8 ? 28 : 34;
    const left = 42;
    const right = 22;
    const top = title ? 22 : 16;
    const bottom = 38;
    const widthCells = maxX - minX;
    const heightCells = maxY - minY;
    const width = left + widthCells * cell + right;
    const height = top + heightCells * cell + bottom;
    const xToPixel = (x) => left + (x - minX) * cell;
    const yToPixel = (y) => top + (maxY - y) * cell;
    const lines = [];

    for (let x = minX; x <= maxX; x += 1) {
      const xPos = xToPixel(x);
      const isAxis = x === 0;
      lines.push(`<line x1="${xPos}" y1="${top}" x2="${xPos}" y2="${top + heightCells * cell}" stroke="${isAxis ? COLORS.axis : COLORS.grid}" stroke-width="${isAxis ? 2.5 : 1}"></line>`);
      lines.push(`<text x="${xPos}" y="${top + heightCells * cell + 18}" text-anchor="middle" font-size="11" fill="${COLORS.axis}">${x}</text>`);
    }

    for (let y = minY; y <= maxY; y += 1) {
      const yPos = yToPixel(y);
      const isAxis = y === 0;
      lines.push(`<line x1="${left}" y1="${yPos}" x2="${left + widthCells * cell}" y2="${yPos}" stroke="${isAxis ? COLORS.axis : COLORS.grid}" stroke-width="${isAxis ? 2.5 : 1}"></line>`);
      lines.push(`<text x="${left - 10}" y="${yPos + 4}" text-anchor="end" font-size="11" fill="${COLORS.axis}">${y}</text>`);
    }

    const pointMarkup = points
      .map((point, index) => {
        const xPos = xToPixel(point.x);
        const yPos = yToPixel(point.y);
        const label = point.label || String.fromCharCode(65 + index);
        const labelDx = point.labelDx ?? (xPos + 28 > width - 6 ? -11 : 11);
        const labelDy = point.labelDy ?? (yPos - 10 < top + 10 ? 18 : -10);
        const labelAnchor = point.labelAnchor || (labelDx < 0 ? "end" : "start");
        return `<circle cx="${xPos}" cy="${yPos}" r="7.5" fill="${point.fill || COLORS.dot}" stroke="${COLORS.ink}" stroke-width="2"></circle><text x="${xPos + labelDx}" y="${yPos + labelDy}" text-anchor="${labelAnchor}" font-size="12" font-weight="700" fill="${COLORS.ink}">${escapeHtml(label)}</text>`;
      })
      .join("");

    return `
      <svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-hidden="true">
        ${title ? `<text x="${left}" y="14" font-size="12" font-weight="700" fill="${COLORS.axis}">${escapeHtml(title)}</text>` : ""}
        ${lines.join("")}
        <text x="${left + widthCells * cell + 6}" y="${yToPixel(0) + 4}" font-size="12" fill="${COLORS.axis}">x</text>
        <text x="${xToPixel(0) - 14}" y="${top - 2}" font-size="12" fill="${COLORS.axis}">y</text>
        ${pointMarkup}
      </svg>
    `;
  }

  function numberLine({ labels = [], markerIndex = 0, markerLabel = "", jumpStartIndex = null, jumpEndIndex = null, title = "" } = {}) {
    const width = Math.max(360, labels.length * 48);
    const height = 132;
    const left = 34;
    const right = 22;
    const lineY = 62;
    const innerWidth = width - left - right;
    const spacing = labels.length > 1 ? innerWidth / (labels.length - 1) : innerWidth;
    const ticks = labels
      .map((label, index) => {
        const x = left + index * spacing;
        const isMarker = index === markerIndex;
        return `<line x1="${x}" y1="48" x2="${x}" y2="74" stroke="${COLORS.axis}" stroke-width="${isMarker ? 2.5 : 1.5}"></line><text x="${x}" y="100" text-anchor="middle" font-size="12" fill="${COLORS.axis}">${escapeHtml(label)}</text>${isMarker ? `<circle cx="${x}" cy="${lineY}" r="7" fill="${COLORS.dot}" stroke="${COLORS.ink}" stroke-width="2"></circle>` : ""}${isMarker && markerLabel ? `<text x="${x}" y="38" text-anchor="middle" font-size="12" font-weight="700" fill="${COLORS.ink}">${escapeHtml(markerLabel)}</text>` : ""}`;
      })
      .join("");
    const jump = jumpStartIndex !== null && jumpEndIndex !== null
      ? (() => {
          const startX = left + jumpStartIndex * spacing;
          const endX = left + jumpEndIndex * spacing;
          const midX = (startX + endX) / 2;
          const arcHeight = Math.min(42, Math.abs(endX - startX) / 3 + 18);
          return `<path d="M ${startX} ${lineY - 4} Q ${midX} ${lineY - arcHeight} ${endX} ${lineY - 4}" fill="none" stroke="${COLORS.accent}" stroke-width="3" stroke-linecap="round"></path><polygon points="${endX},${lineY - 4} ${endX - 9},${lineY - 9} ${endX - 6},${lineY + 1}" fill="${COLORS.accent}"></polygon>`;
        })()
      : "";

    return `
      <svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-hidden="true">
        ${title ? `<text x="${left}" y="22" font-size="12" font-weight="700" fill="${COLORS.axis}">${escapeHtml(title)}</text>` : ""}
        <line x1="${left}" y1="${lineY}" x2="${width - right}" y2="${lineY}" stroke="${COLORS.axis}" stroke-width="2.5"></line>
        <polygon points="${width - right},${lineY} ${width - right - 8},${lineY - 5} ${width - right - 8},${lineY + 5}" fill="${COLORS.axis}"></polygon>
        <polygon points="${left},${lineY} ${left + 8},${lineY - 5} ${left + 8},${lineY + 5}" fill="${COLORS.axis}"></polygon>
        ${jump}${ticks}
      </svg>
    `;
  }

  function angleSvg(degrees = 90, label = "A") {
    const cx = 72;
    const cy = 106;
    const rayLength = 54;
    const radians = (degrees * Math.PI) / 180;
    const x2 = cx + rayLength;
    const y2 = cy;
    const x3 = cx + rayLength * Math.cos(radians);
    const y3 = cy - rayLength * Math.sin(radians);
    const arcRadius = 26;
    const arcPath = degrees === 90
      ? `M ${cx + 12} ${cy} L ${cx + 12} ${cy - 12} L ${cx} ${cy - 12}`
      : `M ${cx + arcRadius} ${cy} A ${arcRadius} ${arcRadius} 0 ${degrees > 180 ? 1 : 0} 0 ${cx + arcRadius * Math.cos(radians)} ${cy - arcRadius * Math.sin(radians)}`;
    return `<svg viewBox="0 0 178 152" width="178" height="152" role="img" aria-hidden="true"><text x="18" y="28" font-size="12" font-weight="700" fill="${COLORS.axis}">${escapeHtml(label)}</text><line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="${COLORS.ink}" stroke-width="4" stroke-linecap="round"></line><line x1="${cx}" y1="${cy}" x2="${x3}" y2="${y3}" stroke="${COLORS.accent}" stroke-width="4" stroke-linecap="round"></line><path d="${arcPath}" fill="none" stroke="${COLORS.chart}" stroke-width="3" stroke-linecap="round"></path><circle cx="${cx}" cy="${cy}" r="5.5" fill="${COLORS.ink}"></circle></svg>`;
  }

  function angleFact(title, parts) {
    const chips = parts
      .map((part) => `<span style="display:inline-block;margin:4px;padding:8px 10px;border:2px solid ${COLORS.ink};border-radius:12px;background:${part.unknown ? COLORS.fill2 : COLORS.fill};font-weight:700;">${escapeHtml(part.label)} = ${escapeHtml(part.value)}</span>`)
      .join("");
    return card(title, `<div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:center;">${angleSvg(120, "?")}<div style="max-width:360px;text-align:center;">${chips}</div></div>`);
  }

  function symbolChart({ categories = [], counts = [], valuePerSymbol = 1, yMax = 5, yTickStep = 1, title = "", keyText = "", xAxisLabel = "Category", yAxisLabel = "Count", symbolColor = COLORS.chart } = {}) {
    const width = Math.max(360, categories.length * 76);
    const height = 252;
    const left = 50;
    const right = 20;
    const top = 20;
    const bottom = 62;
    const innerWidth = width - left - right;
    const innerHeight = height - top - bottom;
    const spacing = categories.length > 1 ? innerWidth / (categories.length - 1) : innerWidth;
    const baselineY = top + innerHeight;
    const ticks = [];
    for (let value = 0; value <= yMax; value += yTickStep) {
      const y = baselineY - (value / yMax) * innerHeight;
      ticks.push(`<line x1="${left - 4}" y1="${y}" x2="${left + innerWidth}" y2="${y}" stroke="${COLORS.grid}" stroke-width="1"></line><text x="${left - 10}" y="${y + 4}" text-anchor="end" font-size="11" fill="${COLORS.axis}">${value}</text>`);
    }
    const dots = categories
      .map((category, index) => {
        const x = left + index * spacing;
        const circles = Array.from({ length: counts[index] || 0 }, (_, dotIndex) => {
          const y = baselineY - (((dotIndex + 1) * valuePerSymbol) / yMax) * innerHeight;
          return `<circle cx="${x}" cy="${y}" r="6.5" fill="${symbolColor}" stroke="${COLORS.ink}" stroke-width="2"></circle>`;
        }).join("");
        return `<text x="${x}" y="${baselineY + 18}" text-anchor="middle" font-size="12" fill="${COLORS.axis}">${escapeHtml(category)}</text>${circles}`;
      })
      .join("");

    return card(
      title,
      `<div style="font-size:13px;margin-bottom:8px;">${escapeHtml(keyText)}</div><svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-hidden="true"><line x1="${left}" y1="${top}" x2="${left}" y2="${baselineY}" stroke="${COLORS.axis}" stroke-width="2.5"></line><line x1="${left}" y1="${baselineY}" x2="${width - right}" y2="${baselineY}" stroke="${COLORS.axis}" stroke-width="2.5"></line>${ticks.join("")}${dots}<text x="${left + innerWidth / 2}" y="${height - 10}" text-anchor="middle" font-size="12" font-weight="700" fill="${COLORS.axis}">${escapeHtml(xAxisLabel)}</text><text x="16" y="${top + innerHeight / 2}" text-anchor="middle" font-size="12" font-weight="700" fill="${COLORS.axis}" transform="rotate(-90 16 ${top + innerHeight / 2})">${escapeHtml(yAxisLabel)}</text></svg>`
    );
  }

  function rectangleGrid({ widthCells = 4, heightCells = 3, gridCells = 8, title = "" } = {}) {
    const cell = 26;
    const left = 24;
    const top = title ? 24 : 16;
    const width = left + gridCells * cell + 18;
    const height = top + gridCells * cell + 22;
    const rectX = left + cell;
    const rectY = top + (gridCells - heightCells - 1) * cell;
    const lines = [];
    for (let value = 0; value <= gridCells; value += 1) {
      const pos = left + value * cell;
      lines.push(`<line x1="${pos}" y1="${top}" x2="${pos}" y2="${top + gridCells * cell}" stroke="${COLORS.grid}" stroke-width="1"></line><line x1="${left}" y1="${top + value * cell}" x2="${left + gridCells * cell}" y2="${top + value * cell}" stroke="${COLORS.grid}" stroke-width="1"></line>`);
    }
    return `<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-hidden="true">${title ? `<text x="${left}" y="14" font-size="12" font-weight="700" fill="${COLORS.axis}">${escapeHtml(title)}</text>` : ""}${lines.join("")}<rect x="${rectX}" y="${rectY}" width="${widthCells * cell}" height="${heightCells * cell}" fill="${COLORS.fill}" fill-opacity="0.85" stroke="${COLORS.ink}" stroke-width="3"></rect><text x="${rectX + (widthCells * cell) / 2}" y="${rectY - 5}" text-anchor="middle" font-size="12" font-weight="700" fill="${COLORS.axis}">${widthCells}</text><text x="${rectX + widthCells * cell + 8}" y="${rectY + (heightCells * cell) / 2 + 4}" text-anchor="start" font-size="12" font-weight="700" fill="${COLORS.axis}">${heightCells}</text></svg>`;
  }

  function compositeShape(cells, gridWidth = 5, gridHeight = 5) {
    const cell = 30;
    const left = 26;
    const top = 16;
    const width = left + gridWidth * cell + 18;
    const height = top + gridHeight * cell + 20;
    const cellSet = new Set(cells.map(([x, y]) => `${x},${y}`));
    const rectangles = [];
    for (let y = 0; y < gridHeight; y += 1) {
      for (let x = 0; x < gridWidth; x += 1) {
        const filled = cellSet.has(`${x},${y}`);
        rectangles.push(`<rect x="${left + x * cell}" y="${top + y * cell}" width="${cell}" height="${cell}" fill="${filled ? COLORS.fill : "#ffffff"}" stroke="${COLORS.grid}" stroke-width="1"></rect>`);
      }
    }
    const outline = cells.map(([x, y]) => `<rect x="${left + x * cell}" y="${top + y * cell}" width="${cell}" height="${cell}" fill="none" stroke="${COLORS.ink}" stroke-width="2"></rect>`).join("");
    return `<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-hidden="true">${rectangles.join("")}${outline}</svg>`;
  }

  function tableCard(title, headers, rows) {
    const headerHtml = headers.map((header) => `<th style="padding:6px 10px;border:1px solid ${COLORS.ink};background:${COLORS.fill2};">${escapeHtml(header)}</th>`).join("");
    const rowsHtml = rows.map((row) => `<tr>${row.map((cell) => `<td style="padding:6px 10px;border:1px solid ${COLORS.ink};text-align:center;">${escapeHtml(cell)}</td>`).join("")}</tr>`).join("");
    return card(title, `<table style="border-collapse:collapse;font-size:14px;background:#ffffff;"><thead><tr>${headerHtml}</tr></thead><tbody>${rowsHtml}</tbody></table>`);
  }

  function buildQuestion({ question, options, answer, difficulty, visualHtml = "", visualSummary = "", type = "visual-math-choice" }) {
    const normalizedOptions = uniqueStrings(options);
    const normalizedAnswer = String(answer);
    const normalizedDifficulty = clampDifficulty(difficulty);

    if (!String(question || "").trim()) {
      throw new Error("Visual math questions must have question text.");
    }
    if (normalizedOptions.length !== 4) {
      throw new Error(`Visual math questions must have exactly 4 options: ${question}`);
    }
    if (!normalizedOptions.includes(normalizedAnswer)) {
      throw new Error(`Visual math question answer must be included in the options: ${question}`);
    }

    return {
      question: String(question),
      options: normalizedOptions,
      answer: normalizedAnswer,
      difficulty: normalizedDifficulty,
      visualHtml,
      visualSummary,
      type,
    };
  }

  const COORDINATE_CONFIGS = [
    { q: "What is the coordinate of point A?", a: "(2, 3)", d: ["(1, 2)", "(3, 2)", "(4, 3)"], b: [0, 5, 0, 5], p: [{ label: "A", x: 2, y: 3 }], s: "Point A is 2 units right and 3 units up from the origin." },
    { q: "Which point is at (4, 2)?", a: "B", d: ["A", "C", "D"], b: [0, 5, 0, 5], p: [{ label: "A", x: 1, y: 1, fill: COLORS.chart }, { label: "B", x: 4, y: 2 }, { label: "C", x: 2, y: 4, fill: COLORS.chart2 }, { label: "D", x: 3, y: 3, fill: COLORS.accent }], s: "Point B is at (4, 2)." },
    { q: "Which point is closest to the origin?", a: "B", d: ["A", "C", "D"], b: [0, 5, 0, 5], p: [{ label: "A", x: 1, y: 4, fill: COLORS.chart }, { label: "B", x: 2, y: 2 }, { label: "C", x: 4, y: 1, fill: COLORS.chart2 }, { label: "D", x: 3, y: 4, fill: COLORS.accent }], s: "Point B is closest to the origin." },
    { q: "Which point has the greatest x-coordinate?", a: "B", d: ["A", "C", "D"], b: [0, 5, 0, 5], p: [{ label: "A", x: 2, y: 1, fill: COLORS.chart }, { label: "B", x: 5, y: 2 }, { label: "C", x: 3, y: 4, fill: COLORS.chart2 }, { label: "D", x: 4, y: 3, fill: COLORS.accent }], s: "Point B is farthest to the right at (5, 2)." },
    { q: "Which point is highest up on the grid?", a: "B", d: ["A", "C", "D"], b: [0, 5, 0, 5], p: [{ label: "A", x: 1, y: 2, fill: COLORS.chart }, { label: "B", x: 2, y: 5 }, { label: "C", x: 4, y: 3, fill: COLORS.chart2 }, { label: "D", x: 5, y: 1, fill: COLORS.accent }], s: "Point B has the greatest y-coordinate." },
    { q: "What is the coordinate of point A?", a: "(-3, 2)", d: ["(3, 2)", "(-2, 3)", "(2, -3)"], b: [-5, 5, -4, 4], p: [{ label: "A", x: -3, y: 2 }], s: "Point A is at (-3, 2)." },
    { q: "Which point is in Quadrant III?", a: "C", d: ["A", "B", "D"], b: [-4, 4, -4, 4], p: [{ label: "A", x: -2, y: 3, fill: COLORS.chart }, { label: "B", x: 3, y: 2 }, { label: "C", x: -3, y: -2, fill: COLORS.chart2 }, { label: "D", x: 2, y: -3, fill: COLORS.accent }], s: "Quadrant III has negative x and negative y, so point C is there." },
    { q: "How far apart are points A and B?", a: "6", d: ["4", "5", "7"], b: [-4, 5, -2, 4], p: [{ label: "A", x: -2, y: 1 }, { label: "B", x: 4, y: 1, fill: COLORS.chart2 }], s: "The horizontal distance from -2 to 4 is 6 units." },
    { q: "What is the midpoint of A and B?", a: "(-1, 2)", d: ["(-2, 2)", "(1, 2)", "(-1, 0)"], b: [-5, 4, -1, 5], p: [{ label: "A", x: -4, y: 2 }, { label: "B", x: 2, y: 2, fill: COLORS.chart2 }, { label: "M", x: -1, y: 2, fill: COLORS.success }], s: "Halfway from -4 to 2 is -1, and the y-coordinate stays 2." },
    { q: "From A to B, how many units right and up do you move?", a: "4 right and 3 up", d: ["3 right and 4 up", "4 left and 3 up", "5 right and 4 up"], b: [0, 6, 0, 5], p: [{ label: "A", x: 1, y: 1 }, { label: "B", x: 5, y: 4, fill: COLORS.chart2 }], s: "From (1, 1) to (5, 4), x increases by 4 and y increases by 3." },
  ];

  const NUMBER_LINE_CONFIGS = [
    { q: "Which fraction is shown by the dot?", a: "1/2", d: ["1/4", "3/4", "1"], labels: ["0", "1/4", "1/2", "3/4", "1"], dot: 2, s: "The dot is on 1/2." },
    { q: "Which fraction is shown by the dot?", a: "3/4", d: ["1/4", "1/2", "1"], labels: ["0", "1/4", "1/2", "3/4", "1"], dot: 3, s: "The dot is on 3/4." },
    { q: "Which decimal is shown by the dot?", a: "1.5", d: ["0.5", "1", "2"], labels: ["0", "0.5", "1", "1.5", "2"], dot: 3, s: "The dot is on 1.5." },
    { q: "Which whole number is shown by the dot?", a: "2", d: ["1", "3", "4"], labels: ["0", "1", "2", "3", "4"], dot: 2, s: "The dot is on 2." },
    { q: "Which number is shown by the dot?", a: "1 1/4", d: ["1/4", "1 1/2", "1 3/4"], labels: ["0", "1/4", "1/2", "3/4", "1", "1 1/4", "1 1/2", "1 3/4", "2"], dot: 5, s: "The dot is on 1 1/4." },
    { q: "Which integer is shown by the dot?", a: "-2", d: ["-3", "-1", "2"], labels: ["-4", "-3", "-2", "-1", "0", "1", "2"], dot: 2, s: "The dot is on -2." },
    { q: "Which decimal is shown by the dot?", a: "-0.5", d: ["0.5", "-1.5", "1"], labels: ["-2", "-1.5", "-1", "-0.5", "0", "0.5", "1"], dot: 3, s: "The dot is halfway between -1 and 0." },
    { q: "How far apart are -2 and 3 on the number line?", a: "5", d: ["1", "3", "6"], labels: ["-3", "-2", "-1", "0", "1", "2", "3", "4"], dot: 6, jump: [1, 6], s: "The distance from -2 to 3 is 5 units." },
    { q: "The arrow starts at -3 and moves 5 units right. Where does it land?", a: "2", d: ["-2", "1", "3"], labels: ["-4", "-3", "-2", "-1", "0", "1", "2", "3"], dot: 6, jump: [1, 6], s: "Starting at -3 and moving 5 right lands on 2." },
    { q: "Each small step is 1/8. Which value is shown by the dot?", a: "1/8", d: ["1/4", "3/8", "1/2"], labels: ["0", "1/8", "1/4", "3/8", "1/2", "5/8", "3/4", "7/8", "1"], dot: 1, s: "The dot is on the first eighth after 0." },
  ];

  const PLOT_CONFIGS = [
    { q: "How many students read 2 books?", a: "3", d: ["1", "2", "4"], c: ["0", "1", "2", "3"], n: [1, 2, 3, 1], title: "Line plot: books read", key: "Each dot means 1 student.", x: "Books read", y: "Students", max: 4, s: "There are 3 dots above 2 books." },
    { q: "How many students are shown altogether?", a: "8", d: ["6", "7", "9"], c: ["0", "1", "2", "3"], n: [2, 1, 3, 2], title: "Line plot: books read", key: "Each dot means 1 student.", x: "Books read", y: "Students", max: 4, s: "2 + 1 + 3 + 2 = 8 students." },
    { q: "How many snacks does the Dogs row show?", a: "10", d: ["6", "8", "12"], c: ["Cats", "Dogs", "Fish", "Birds"], n: [3, 5, 2, 4], title: "Pictograph: favorite pets", key: "Each symbol means 2 snacks.", x: "Pet", y: "Snacks", max: 10, step: 2, scale: 2, color: COLORS.chart2, s: "Dogs has 5 symbols, and each means 2 snacks: 10." },
    { q: "Which number of books was chosen most often?", a: "1", d: ["0", "2", "3"], c: ["0", "1", "2", "3"], n: [1, 4, 2, 3], title: "Line plot: books read", key: "Each dot means 1 student.", x: "Books read", y: "Students", max: 4, s: "The tallest stack is above 1 book." },
    { q: "How many more symbols are in row D than row C?", a: "3", d: ["1", "2", "4"], c: ["A", "B", "C", "D"], n: [2, 3, 1, 4], title: "Pictograph: classroom stickers", key: "Each symbol means 1 sticker.", x: "Row", y: "Stickers", max: 4, color: COLORS.accent, s: "Row D has 4 symbols and row C has 1, so the difference is 3." },
    { q: "Each symbol means 5 visitors. How many visitors came on Wednesday?", a: "20", d: ["10", "15", "25"], c: ["Mon", "Tue", "Wed", "Thu"], n: [2, 3, 4, 1], title: "Pictograph: library visitors", key: "Each symbol means 5 visitors.", x: "Day", y: "Visitors", max: 20, step: 5, scale: 5, color: COLORS.chart2, s: "Wednesday has 4 symbols: 4 x 5 = 20." },
    { q: "What is the range of the scores shown?", a: "4", d: ["2", "3", "5"], c: ["1", "2", "3", "4", "5"], n: [1, 3, 4, 2, 1], title: "Dot plot: quiz scores", key: "Each dot means 1 student.", x: "Score", y: "Students", max: 4, s: "The lowest score is 1 and the highest is 5, so the range is 4." },
    { q: "What is the median score shown on the dot plot?", a: "3", d: ["2", "4", "5"], c: ["1", "2", "3", "4", "5"], n: [1, 2, 3, 2, 1], title: "Dot plot: scores", key: "There are 9 scores total.", x: "Score", y: "Students", max: 3, s: "With 9 scores, the 5th value is the median. The 5th value is 3." },
    { q: "What is the mean of the four scores shown?", a: "2.5", d: ["2", "3", "4"], c: ["1", "2", "3", "4"], n: [0, 2, 2, 0], title: "Dot plot: scores", key: "Scores are 2, 2, 3, 3.", x: "Score", y: "Students", max: 2, s: "The mean is (2 + 2 + 3 + 3) ÷ 4 = 2.5." },
    { q: "If each symbol means 3 points, how many more points did B score than A?", a: "9", d: ["3", "6", "12"], c: ["A", "B", "C", "D"], n: [2, 5, 3, 4], title: "Pictograph: team points", key: "Each symbol means 3 points.", x: "Team", y: "Points", max: 15, step: 3, scale: 3, color: COLORS.accent, s: "B has 3 more symbols than A, and each symbol is 3 points: 9." },
  ];

  const L_CELLS = [[0, 1], [1, 1], [2, 1], [3, 1], [0, 2], [1, 2], [2, 2], [3, 2], [0, 3], [1, 3]];

  function createCoordinateQuestion(difficulty) {
    const level = clampDifficulty(difficulty);
    const item = COORDINATE_CONFIGS[level - 1];
    return buildQuestion({
      question: item.q,
      options: makeChoiceOptions(item.a, item.d),
      answer: item.a,
      difficulty: level,
      visualHtml: card("Coordinate grid", coordinateGrid({ minX: item.b[0], maxX: item.b[1], minY: item.b[2], maxY: item.b[3], points: item.p })),
      visualSummary: item.s,
    });
  }

  function createNumberLineQuestion(difficulty) {
    const level = clampDifficulty(difficulty);
    const item = NUMBER_LINE_CONFIGS[level - 1];
    return buildQuestion({
      question: item.q,
      options: makeChoiceOptions(item.a, item.d),
      answer: item.a,
      difficulty: level,
      visualHtml: card("Number line", numberLine({ labels: item.labels, markerIndex: item.dot, jumpStartIndex: item.jump?.[0] ?? null, jumpEndIndex: item.jump?.[1] ?? null })),
      visualSummary: item.s,
    });
  }

  function createAngleQuestion(difficulty) {
    const level = clampDifficulty(difficulty);
    const questions = [
      () => buildQuestion({ question: "What type of angle is shown?", options: makeChoiceOptions("Right angle", ["Acute angle", "Obtuse angle", "Straight angle"]), answer: "Right angle", difficulty: level, visualHtml: card("Angle", angleSvg(90, "A")), visualSummary: "A 90 degree angle is a right angle." }),
      () => buildQuestion({ question: "Which angle is larger?", options: makeChoiceOptions("Angle B", ["Angle A", "They are equal", "Both are right angles"]), answer: "Angle B", difficulty: level, visualHtml: comparisonCard("Compare the angles", figure("Angle A", angleSvg(45, "A")), figure("Angle B", angleSvg(120, "B"))), visualSummary: "Angle B is larger than Angle A." }),
      () => buildQuestion({ question: "What type of angle is shown?", options: makeChoiceOptions("Acute angle", ["Right angle", "Obtuse angle", "Straight angle"]), answer: "Acute angle", difficulty: level, visualHtml: card("Angle", angleSvg(65, "A")), visualSummary: "An angle less than 90 degrees is acute." }),
      () => buildQuestion({ question: "Which angle is larger?", options: makeChoiceOptions("Angle B", ["Angle A", "They are equal", "Both are straight angles"]), answer: "Angle B", difficulty: level, visualHtml: comparisonCard("Compare the angles", figure("Angle A", angleSvg(80, "A")), figure("Angle B", angleSvg(100, "B"))), visualSummary: "100 degrees is larger than 80 degrees." }),
      () => buildQuestion({ question: "What type of angle is shown?", options: makeChoiceOptions("Obtuse angle", ["Acute angle", "Right angle", "Straight angle"]), answer: "Obtuse angle", difficulty: level, visualHtml: card("Angle", angleSvg(135, "A")), visualSummary: "An angle greater than 90 degrees and less than 180 degrees is obtuse." }),
      () => buildQuestion({ question: "A straight line is 180°. If one angle is 140°, what is the missing angle?", options: makeChoiceOptions("40°", ["30°", "50°", "140°"]), answer: "40°", difficulty: level, visualHtml: angleFact("Angles on a straight line", [{ label: "Known angle", value: "140°" }, { label: "Missing angle", value: "?", unknown: true }, { label: "Total", value: "180°" }]), visualSummary: "180° - 140° = 40°." }),
      () => buildQuestion({ question: "A right angle is 90°. If one part is 55°, what is the missing part?", options: makeChoiceOptions("35°", ["25°", "45°", "55°"]), answer: "35°", difficulty: level, visualHtml: angleFact("Parts of a right angle", [{ label: "Known part", value: "55°" }, { label: "Missing part", value: "?", unknown: true }, { label: "Total", value: "90°" }]), visualSummary: "90° - 55° = 35°." }),
      () => buildQuestion({ question: "An angle around a point is 360°. Three parts are 80°, 90°, and 70°. What is the missing part?", options: makeChoiceOptions("120°", ["100°", "110°", "130°"]), answer: "120°", difficulty: level, visualHtml: angleFact("Angles around a point", [{ label: "Part 1", value: "80°" }, { label: "Part 2", value: "90°" }, { label: "Part 3", value: "70°" }, { label: "Missing", value: "?", unknown: true }, { label: "Total", value: "360°" }]), visualSummary: "360° - 80° - 90° - 70° = 120°." }),
      () => buildQuestion({ question: "A triangle's angles add to 180°. Two angles are 60° and 50°. What is the third angle?", options: makeChoiceOptions("70°", ["60°", "80°", "90°"]), answer: "70°", difficulty: level, visualHtml: card("Triangle angles", `<div style="font-size:15px;line-height:1.6;">Angle A = 60°<br>Angle B = 50°<br>Angle C = ?<br><strong>Total = 180°</strong></div>`), visualSummary: "180° - 60° - 50° = 70°." }),
      () => buildQuestion({ question: "The two marked angles are equal. If together they make 50°, what is x?", options: makeChoiceOptions("x = 25°", ["x = 20°", "x = 30°", "x = 50°"]), answer: "x = 25°", difficulty: level, visualHtml: card("Equal angles", `<div style="font-size:15px;line-height:1.6;">x + x = 50°<br><strong>Find one equal angle.</strong></div>`), visualSummary: "Two equal angles total 50°, so each angle is 25°." }),
    ];
    return questions[level - 1]();
  }

  function createPlotQuestion(difficulty) {
    const level = clampDifficulty(difficulty);
    const item = PLOT_CONFIGS[level - 1];
    return buildQuestion({
      question: item.q,
      options: makeChoiceOptions(item.a, item.d),
      answer: item.a,
      difficulty: level,
      visualHtml: symbolChart({ categories: item.c, counts: item.n, title: item.title, keyText: item.key, xAxisLabel: item.x, yAxisLabel: item.y, yMax: item.max, yTickStep: item.step || 1, valuePerSymbol: item.scale || 1, symbolColor: item.color || COLORS.chart }),
      visualSummary: item.s,
    });
  }

  function createAreaQuestion(difficulty) {
    const level = clampDifficulty(difficulty);
    const questions = [
      () => buildQuestion({ question: "What is the area of the shaded rectangle?", options: makeNumericOptions("12", [10, 14, 16]), answer: "12", difficulty: level, visualHtml: card("Area on a grid", rectangleGrid({ widthCells: 4, heightCells: 3 })), visualSummary: "4 × 3 = 12 square units." }),
      () => buildQuestion({ question: "What is the perimeter of the shaded rectangle?", options: makeNumericOptions("14", [12, 16, 18]), answer: "14", difficulty: level, visualHtml: card("Perimeter on a grid", rectangleGrid({ widthCells: 5, heightCells: 2 })), visualSummary: "5 + 2 + 5 + 2 = 14 units." }),
      () => buildQuestion({ question: "How many square units cover the shaded rectangle?", options: makeNumericOptions("12", [10, 11, 16]), answer: "12", difficulty: level, visualHtml: card("Area on a grid", rectangleGrid({ widthCells: 3, heightCells: 4 })), visualSummary: "3 × 4 = 12 square units." }),
      () => buildQuestion({ question: "Which rectangle has the greater area?", options: makeChoiceOptions("Rectangle A", ["Rectangle B", "They are equal", "Not enough information"]), answer: "Rectangle A", difficulty: level, visualHtml: comparisonCard("Compare the rectangles", figure("Rectangle A", rectangleGrid({ widthCells: 4, heightCells: 3 })), figure("Rectangle B", rectangleGrid({ widthCells: 5, heightCells: 2 }))), visualSummary: "Rectangle A has area 12. Rectangle B has area 10." }),
      () => buildQuestion({ question: "Which rectangle has the greater perimeter?", options: makeChoiceOptions("Rectangle A", ["Rectangle B", "They are equal", "Not enough information"]), answer: "Rectangle A", difficulty: level, visualHtml: comparisonCard("Compare the rectangles", figure("Rectangle A", rectangleGrid({ widthCells: 6, heightCells: 2 })), figure("Rectangle B", rectangleGrid({ widthCells: 4, heightCells: 3 }))), visualSummary: "Rectangle A has perimeter 16. Rectangle B has perimeter 14." }),
      () => buildQuestion({ question: "The rectangle's area is 35 square units and its height is 5 units. What is its width?", options: makeNumericOptions("7", [5, 6, 8]), answer: "7", difficulty: level, visualHtml: card("Missing side length", rectangleGrid({ widthCells: 7, heightCells: 5, gridCells: 8 }), "Area = width × height"), visualSummary: "35 ÷ 5 = 7." }),
      () => buildQuestion({ question: "What is the area of the shaded L-shape?", options: makeNumericOptions("10", [8, 9, 12]), answer: "10", difficulty: level, visualHtml: card("Composite area", compositeShape(L_CELLS), "Count the shaded unit squares."), visualSummary: "There are 10 shaded unit squares." }),
      () => buildQuestion({ question: "What is the perimeter of the shaded L-shape?", options: makeNumericOptions("14", [12, 16, 18]), answer: "14", difficulty: level, visualHtml: card("Composite perimeter", compositeShape(L_CELLS), "Count the outside edges only."), visualSummary: "Counting the outside edges gives 14 units." }),
      () => buildQuestion({ question: "A scale drawing uses 1 grid square for 2 real square meters. A 4-by-3 grid rectangle represents what real area?", options: makeNumericOptions("24", [12, 16, 48]), answer: "24", difficulty: level, visualHtml: card("Scale area", rectangleGrid({ widthCells: 4, heightCells: 3 }), "Each grid square represents 2 square meters."), visualSummary: "12 grid squares × 2 square meters = 24 square meters." }),
      () => buildQuestion({ question: "The four points make a rectangle. What is its area?", options: makeNumericOptions("12", [7, 14, 16]), answer: "12", difficulty: level, visualHtml: card("Area from coordinates", coordinateGrid({ minX: 0, maxX: 6, minY: 0, maxY: 5, points: [{ label: "A", x: 1, y: 1 }, { label: "B", x: 5, y: 1 }, { label: "C", x: 5, y: 4 }, { label: "D", x: 1, y: 4 }] }), "Width = 4 units and height = 3 units."), visualSummary: "4 × 3 = 12 square units." }),
    ];
    return questions[level - 1]();
  }

  function createTablePatternQuestion(difficulty) {
    const level = clampDifficulty(difficulty);
    if (level <= 3) {
      return buildQuestion({ question: "What number is missing from the table?", options: makeNumericOptions("16", [12, 14, 18]), answer: "16", difficulty: level, visualHtml: tableCard("Input-output table", ["Input", "Rule", "Output"], [["2", "× 4", "8"], ["3", "× 4", "12"], ["4", "× 4", "?"]]), visualSummary: "The rule is multiply by 4, so 4 × 4 = 16." });
    }
    if (level <= 6) {
      return buildQuestion({ question: "Which rule matches the table?", options: makeChoiceOptions("Multiply by 3, then add 1", ["Add 3", "Multiply by 4", "Add 1, then multiply by 3"]), answer: "Multiply by 3, then add 1", difficulty: level, visualHtml: tableCard("Input-output table", ["Input", "Output"], [["1", "4"], ["2", "7"], ["3", "10"], ["4", "13"]]), visualSummary: "Each output is 3 times the input plus 1." });
    }
    if (level <= 8) {
      return buildQuestion({ question: "Which equation matches the table?", options: makeChoiceOptions("y = 2x + 3", ["y = x + 3", "y = 3x + 2", "y = 2x - 3"]), answer: "y = 2x + 3", difficulty: level, visualHtml: tableCard("x-y table", ["x", "y"], [["1", "5"], ["2", "7"], ["3", "9"], ["4", "11"]]), visualSummary: "Each y-value is 3 more than twice x." });
    }
    return buildQuestion({ question: "The table follows y = 3x - 2. What is y when x = 6?", options: makeNumericOptions("16", [14, 18, 20]), answer: "16", difficulty: level, visualHtml: tableCard("Function table", ["x", "y = 3x - 2"], [["2", "4"], ["4", "10"], ["6", "?"]]), visualSummary: "3 × 6 - 2 = 18 - 2 = 16." });
  }

  const EXTRA_COORDINATE_CONFIGS = [
    { q: "What is the coordinate of point A?", a: "(3, 1)", d: ["(1, 3)", "(2, 1)", "(3, 2)"], b: [0, 5, 0, 5], p: [{ label: "A", x: 3, y: 1 }], s: "Point A is 3 units right and 1 unit up from the origin." },
    { q: "Which point is at (2, 4)?", a: "C", d: ["A", "B", "D"], b: [0, 5, 0, 5], p: [{ label: "A", x: 1, y: 3, fill: COLORS.chart }, { label: "B", x: 4, y: 1 }, { label: "C", x: 2, y: 4, fill: COLORS.chart2 }, { label: "D", x: 5, y: 2, fill: COLORS.accent }], s: "Point C is at (2, 4)." },
    { q: "Which point is closest to the origin?", a: "A", d: ["B", "C", "D"], b: [0, 5, 0, 5], p: [{ label: "A", x: 1, y: 1, fill: COLORS.chart }, { label: "B", x: 4, y: 1 }, { label: "C", x: 2, y: 4, fill: COLORS.chart2 }, { label: "D", x: 5, y: 5, fill: COLORS.accent }], s: "Point A is closest to (0, 0)." },
    { q: "Which point has the greatest x-coordinate?", a: "D", d: ["A", "B", "C"], b: [0, 6, 0, 5], p: [{ label: "A", x: 2, y: 4, fill: COLORS.chart }, { label: "B", x: 3, y: 1 }, { label: "C", x: 4, y: 5, fill: COLORS.chart2 }, { label: "D", x: 6, y: 2, fill: COLORS.accent }], s: "Point D is farthest to the right at x = 6." },
    { q: "Which point is highest up on the grid?", a: "C", d: ["A", "B", "D"], b: [0, 6, 0, 5], p: [{ label: "A", x: 1, y: 3, fill: COLORS.chart }, { label: "B", x: 5, y: 2 }, { label: "C", x: 3, y: 5, fill: COLORS.chart2 }, { label: "D", x: 6, y: 4, fill: COLORS.accent }], s: "Point C has the greatest y-coordinate." },
    { q: "What is the coordinate of point A?", a: "(-2, -3)", d: ["(2, -3)", "(-3, -2)", "(-2, 3)"], b: [-5, 5, -4, 4], p: [{ label: "A", x: -2, y: -3 }], s: "Point A is at (-2, -3)." },
    { q: "Which point is in Quadrant II?", a: "A", d: ["B", "C", "D"], b: [-4, 4, -4, 4], p: [{ label: "A", x: -3, y: 2, fill: COLORS.chart }, { label: "B", x: 3, y: 2 }, { label: "C", x: -2, y: -3, fill: COLORS.chart2 }, { label: "D", x: 2, y: -2, fill: COLORS.accent }], s: "Quadrant II has negative x and positive y, so point A is there." },
    { q: "How far apart are points A and B?", a: "5", d: ["3", "4", "6"], b: [-2, 4, -3, 4], p: [{ label: "A", x: 1, y: -2 }, { label: "B", x: 1, y: 3, fill: COLORS.chart2 }], s: "The vertical distance from -2 to 3 is 5 units." },
    { q: "What is the midpoint of A and B?", a: "(-1, -1)", d: ["(-2, -1)", "(-1, 1)", "(1, -1)"], b: [-6, 4, -3, 3], p: [{ label: "A", x: -5, y: -1 }, { label: "B", x: 3, y: -1, fill: COLORS.chart2 }, { label: "M", x: -1, y: -1, fill: COLORS.success }], s: "Halfway from -5 to 3 is -1, and the y-coordinate stays -1." },
    { q: "From A to B, how many units right and down do you move?", a: "6 right and 4 down", d: ["4 right and 6 down", "6 left and 4 down", "6 right and 4 up"], b: [-3, 5, -2, 4], p: [{ label: "A", x: -2, y: 3 }, { label: "B", x: 4, y: -1, fill: COLORS.chart2 }], s: "From (-2, 3) to (4, -1), x increases by 6 and y decreases by 4." },
  ];

  const EXTRA_NUMBER_LINE_CONFIGS = [
    { q: "Which whole number is shown by the dot?", a: "3", d: ["2", "4", "5"], labels: ["0", "1", "2", "3", "4", "5"], dot: 3, s: "The dot is on 3." },
    { q: "Which fraction is shown by the dot?", a: "1/4", d: ["1/2", "3/4", "1"], labels: ["0", "1/4", "1/2", "3/4", "1"], dot: 1, s: "The dot is on 1/4." },
    { q: "Which decimal is shown by the dot?", a: "0.5", d: ["1", "1.5", "2"], labels: ["0", "0.5", "1", "1.5", "2"], dot: 1, s: "The dot is on 0.5." },
    { q: "Each small step is 1/8. Which value is shown by the dot?", a: "3/8", d: ["1/8", "1/4", "1/2"], labels: ["0", "1/8", "1/4", "3/8", "1/2", "5/8", "3/4", "7/8", "1"], dot: 3, s: "The dot is on the third eighth after 0." },
    { q: "Which mixed number is shown by the dot?", a: "1 3/4", d: ["1 1/4", "1 1/2", "2"], labels: ["0", "1/4", "1/2", "3/4", "1", "1 1/4", "1 1/2", "1 3/4", "2"], dot: 7, s: "The dot is on 1 3/4." },
    { q: "Which integer is shown by the dot?", a: "3", d: ["-3", "2", "4"], labels: ["-2", "-1", "0", "1", "2", "3", "4"], dot: 5, s: "The dot is on 3." },
    { q: "Which decimal is shown by the dot?", a: "-1.5", d: ["-0.5", "0.5", "1.5"], labels: ["-2", "-1.5", "-1", "-0.5", "0", "0.5", "1"], dot: 1, s: "The dot is halfway between -2 and -1." },
    { q: "How far apart are -4 and 1 on the number line?", a: "5", d: ["3", "4", "6"], labels: ["-5", "-4", "-3", "-2", "-1", "0", "1", "2"], dot: 6, jump: [1, 6], s: "The distance from -4 to 1 is 5 units." },
    { q: "The arrow starts at -5 and moves 7 units right. Where does it land?", a: "2", d: ["1", "3", "-2"], labels: ["-5", "-4", "-3", "-2", "-1", "0", "1", "2", "3"], dot: 7, jump: [0, 7], s: "Starting at -5 and moving 7 right lands on 2." },
    { q: "Each small step is 0.1. Which value is shown by the dot?", a: "0.3", d: ["0.2", "0.4", "0.6"], labels: ["0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1"], dot: 3, s: "The dot is on 0.3." },
  ];

  const EXTRA_PLOT_CONFIGS = [
    { q: "How many students chose Apples?", a: "2", d: ["1", "3", "4"], c: ["Apples", "Bananas", "Grapes", "Oranges"], n: [2, 1, 3, 1], title: "Line plot: favorite fruit", key: "Each dot means 1 student.", x: "Fruit", y: "Students", max: 3, s: "There are 2 dots above Apples." },
    { q: "How many students are shown altogether?", a: "8", d: ["6", "7", "9"], c: ["Red", "Blue", "Green", "Yellow"], n: [1, 3, 2, 2], title: "Line plot: favorite color", key: "Each dot means 1 student.", x: "Color", y: "Students", max: 3, s: "1 + 3 + 2 + 2 = 8 students." },
    { q: "Each symbol means 2 books. How many books were read on Wednesday?", a: "12", d: ["6", "10", "14"], c: ["Mon", "Tue", "Wed", "Thu"], n: [2, 4, 6, 3], title: "Pictograph: books read", key: "Each symbol means 2 books.", x: "Day", y: "Books", max: 12, step: 2, scale: 2, color: COLORS.chart2, s: "Wednesday has 6 symbols, and each means 2 books: 12." },
    { q: "Which number of books was chosen most often?", a: "2", d: ["0", "1", "3"], c: ["0", "1", "2", "3"], n: [2, 1, 4, 3], title: "Line plot: books read", key: "Each dot means 1 student.", x: "Books read", y: "Students", max: 4, s: "The tallest stack is above 2 books." },
    { q: "How many more symbols are in row A than row B?", a: "3", d: ["1", "2", "4"], c: ["A", "B", "C", "D"], n: [5, 2, 4, 3], title: "Pictograph: classroom points", key: "Each symbol means 1 point.", x: "Row", y: "Points", max: 5, color: COLORS.accent, s: "Row A has 5 symbols and row B has 2, so the difference is 3." },
    { q: "Each symbol means 5 visitors. How many visitors came on Friday?", a: "20", d: ["10", "15", "25"], c: ["Tue", "Wed", "Thu", "Fri"], n: [1, 2, 3, 4], title: "Pictograph: museum visitors", key: "Each symbol means 5 visitors.", x: "Day", y: "Visitors", max: 20, step: 5, scale: 5, color: COLORS.chart2, s: "Friday has 4 symbols: 4 x 5 = 20." },
    { q: "What is the range of the scores shown?", a: "4", d: ["2", "3", "5"], c: ["2", "3", "4", "5", "6"], n: [1, 2, 2, 4, 1], title: "Dot plot: quiz scores", key: "Each dot means 1 student.", x: "Score", y: "Students", max: 4, s: "The lowest score is 2 and the highest is 6, so the range is 4." },
    { q: "What is the median score shown on the dot plot?", a: "3", d: ["2", "4", "5"], c: ["1", "2", "3", "4", "5"], n: [2, 1, 3, 2, 1], title: "Dot plot: scores", key: "There are 9 scores total.", x: "Score", y: "Students", max: 3, s: "With 9 scores, the 5th value is the median. The 5th value is 3." },
    { q: "What is the mean of the four scores shown?", a: "3", d: ["2", "3.5", "4"], c: ["1", "2", "3", "4", "5"], n: [1, 0, 2, 0, 1], title: "Dot plot: scores", key: "Scores are 1, 3, 3, and 5.", x: "Score", y: "Students", max: 2, s: "The mean is (1 + 3 + 3 + 5) ÷ 4 = 3." },
    { q: "If each symbol means 4 points, how many more points did B score than D?", a: "8", d: ["4", "12", "16"], c: ["A", "B", "C", "D"], n: [3, 6, 2, 4], title: "Pictograph: team points", key: "Each symbol means 4 points.", x: "Team", y: "Points", max: 24, step: 4, scale: 4, color: COLORS.accent, s: "B has 2 more symbols than D, and each symbol is 4 points: 8." },
  ];

  const STAIR_CELLS = [[0, 0], [0, 1], [1, 1], [0, 2], [1, 2], [2, 2]];

  function createExtraCoordinateQuestion(difficulty) {
    const level = clampDifficulty(difficulty);
    const item = EXTRA_COORDINATE_CONFIGS[level - 1];
    return buildQuestion({
      question: item.q,
      options: makeChoiceOptions(item.a, item.d),
      answer: item.a,
      difficulty: level,
      visualHtml: card("Coordinate grid", coordinateGrid({ minX: item.b[0], maxX: item.b[1], minY: item.b[2], maxY: item.b[3], points: item.p })),
      visualSummary: item.s,
    });
  }

  function createExtraNumberLineQuestion(difficulty) {
    const level = clampDifficulty(difficulty);
    const item = EXTRA_NUMBER_LINE_CONFIGS[level - 1];
    return buildQuestion({
      question: item.q,
      options: makeChoiceOptions(item.a, item.d),
      answer: item.a,
      difficulty: level,
      visualHtml: card("Number line", numberLine({ labels: item.labels, markerIndex: item.dot, jumpStartIndex: item.jump?.[0] ?? null, jumpEndIndex: item.jump?.[1] ?? null })),
      visualSummary: item.s,
    });
  }

  function createExtraAngleQuestion(difficulty) {
    const level = clampDifficulty(difficulty);
    const questions = [
      () => buildQuestion({ question: "What type of angle is shown?", options: makeChoiceOptions("Acute angle", ["Right angle", "Obtuse angle", "Straight angle"]), answer: "Acute angle", difficulty: level, visualHtml: card("Angle", angleSvg(40, "A")), visualSummary: "An angle less than 90 degrees is acute." }),
      () => buildQuestion({ question: "Which angle is smaller?", options: makeChoiceOptions("Angle A", ["Angle B", "They are equal", "Both are right angles"]), answer: "Angle A", difficulty: level, visualHtml: comparisonCard("Compare the angles", figure("Angle A", angleSvg(30, "A")), figure("Angle B", angleSvg(60, "B"))), visualSummary: "Angle A is smaller than Angle B." }),
      () => buildQuestion({ question: "What type of angle is shown?", options: makeChoiceOptions("Right angle", ["Acute angle", "Obtuse angle", "Straight angle"]), answer: "Right angle", difficulty: level, visualHtml: card("Angle", angleSvg(90, "A")), visualSummary: "A 90 degree angle is a right angle." }),
      () => buildQuestion({ question: "Which angle is larger?", options: makeChoiceOptions("Angle A", ["Angle B", "They are equal", "Both are acute angles"]), answer: "Angle A", difficulty: level, visualHtml: comparisonCard("Compare the angles", figure("Angle A", angleSvg(130, "A")), figure("Angle B", angleSvg(95, "B"))), visualSummary: "130 degrees is larger than 95 degrees." }),
      () => buildQuestion({ question: "What type of angle is shown?", options: makeChoiceOptions("Straight angle", ["Acute angle", "Right angle", "Obtuse angle"]), answer: "Straight angle", difficulty: level, visualHtml: card("Angle", angleSvg(180, "A")), visualSummary: "An angle that measures 180 degrees is a straight angle." }),
      () => buildQuestion({ question: "A straight line is 180°. If one angle is 115°, what is the missing angle?", options: makeChoiceOptions("65°", ["55°", "75°", "115°"]), answer: "65°", difficulty: level, visualHtml: angleFact("Angles on a straight line", [{ label: "Known angle", value: "115°" }, { label: "Missing angle", value: "?", unknown: true }, { label: "Total", value: "180°" }]), visualSummary: "180° - 115° = 65°." }),
      () => buildQuestion({ question: "A right angle is 90°. If one part is 28°, what is the missing part?", options: makeChoiceOptions("62°", ["52°", "60°", "72°"]), answer: "62°", difficulty: level, visualHtml: angleFact("Parts of a right angle", [{ label: "Known part", value: "28°" }, { label: "Missing part", value: "?", unknown: true }, { label: "Total", value: "90°" }]), visualSummary: "90° - 28° = 62°." }),
      () => buildQuestion({ question: "An angle around a point is 360°. Three parts are 45°, 120°, and 95°. What is the missing part?", options: makeChoiceOptions("100°", ["90°", "110°", "120°"]), answer: "100°", difficulty: level, visualHtml: angleFact("Angles around a point", [{ label: "Part 1", value: "45°" }, { label: "Part 2", value: "120°" }, { label: "Part 3", value: "95°" }, { label: "Missing", value: "?", unknown: true }, { label: "Total", value: "360°" }]), visualSummary: "360° - 45° - 120° - 95° = 100°." }),
      () => buildQuestion({ question: "A triangle's angles add to 180°. Two angles are 45° and 65°. What is the third angle?", options: makeChoiceOptions("70°", ["60°", "80°", "90°"]), answer: "70°", difficulty: level, visualHtml: card("Triangle angles", `<div style="font-size:15px;line-height:1.6;">Angle A = 45°<br>Angle B = 65°<br>Angle C = ?<br><strong>Total = 180°</strong></div>`), visualSummary: "180° - 45° - 65° = 70°." }),
      () => buildQuestion({ question: "Three equal angles together make 90°. What is x?", options: makeChoiceOptions("x = 30°", ["x = 20°", "x = 45°", "x = 90°"]), answer: "x = 30°", difficulty: level, visualHtml: card("Equal angles", `<div style="font-size:15px;line-height:1.6;">x + x + x = 90°<br><strong>Find one equal angle.</strong></div>`), visualSummary: "Three equal angles total 90°, so each angle is 30°." }),
    ];
    return questions[level - 1]();
  }

  function createExtraPlotQuestion(difficulty) {
    const level = clampDifficulty(difficulty);
    const item = EXTRA_PLOT_CONFIGS[level - 1];
    return buildQuestion({
      question: item.q,
      options: makeChoiceOptions(item.a, item.d),
      answer: item.a,
      difficulty: level,
      visualHtml: symbolChart({ categories: item.c, counts: item.n, title: item.title, keyText: item.key, xAxisLabel: item.x, yAxisLabel: item.y, yMax: item.max, yTickStep: item.step || 1, valuePerSymbol: item.scale || 1, symbolColor: item.color || COLORS.chart }),
      visualSummary: item.s,
    });
  }

  function createExtraAreaQuestion(difficulty) {
    const level = clampDifficulty(difficulty);
    const questions = [
      () => buildQuestion({ question: "What is the area of the shaded rectangle?", options: makeNumericOptions("10", [8, 12, 15]), answer: "10", difficulty: level, visualHtml: card("Area on a grid", rectangleGrid({ widthCells: 5, heightCells: 2 })), visualSummary: "5 × 2 = 10 square units." }),
      () => buildQuestion({ question: "What is the perimeter of the shaded rectangle?", options: makeNumericOptions("14", [12, 16, 18]), answer: "14", difficulty: level, visualHtml: card("Perimeter on a grid", rectangleGrid({ widthCells: 4, heightCells: 3 })), visualSummary: "4 + 3 + 4 + 3 = 14 units." }),
      () => buildQuestion({ question: "How many square units cover the shaded rectangle?", options: makeNumericOptions("12", [8, 10, 14]), answer: "12", difficulty: level, visualHtml: card("Area on a grid", rectangleGrid({ widthCells: 6, heightCells: 2 })), visualSummary: "6 × 2 = 12 square units." }),
      () => buildQuestion({ question: "Which rectangle has the greater area?", options: makeChoiceOptions("Rectangle A", ["Rectangle B", "They are equal", "Not enough information"]), answer: "Rectangle A", difficulty: level, visualHtml: comparisonCard("Compare the rectangles", figure("Rectangle A", rectangleGrid({ widthCells: 3, heightCells: 5 })), figure("Rectangle B", rectangleGrid({ widthCells: 4, heightCells: 3 }))), visualSummary: "Rectangle A has area 15. Rectangle B has area 12." }),
      () => buildQuestion({ question: "Which rectangle has the greater perimeter?", options: makeChoiceOptions("Rectangle A", ["Rectangle B", "They are equal", "Not enough information"]), answer: "Rectangle A", difficulty: level, visualHtml: comparisonCard("Compare the rectangles", figure("Rectangle A", rectangleGrid({ widthCells: 7, heightCells: 1 })), figure("Rectangle B", rectangleGrid({ widthCells: 4, heightCells: 3 }))), visualSummary: "Rectangle A has perimeter 16. Rectangle B has perimeter 14." }),
      () => buildQuestion({ question: "The rectangle's area is 42 square units and its height is 6 units. What is its width?", options: makeNumericOptions("7", [5, 6, 8]), answer: "7", difficulty: level, visualHtml: card("Missing side length", rectangleGrid({ widthCells: 7, heightCells: 6, gridCells: 8 }), "Area = width × height"), visualSummary: "42 ÷ 6 = 7." }),
      () => buildQuestion({ question: "What is the area of the shaded stair-step shape?", options: makeNumericOptions("6", [5, 7, 8]), answer: "6", difficulty: level, visualHtml: card("Composite area", compositeShape(STAIR_CELLS, 4, 4), "Count the shaded unit squares."), visualSummary: "There are 6 shaded unit squares." }),
      () => buildQuestion({ question: "What is the perimeter of the shaded stair-step shape?", options: makeNumericOptions("12", [10, 14, 16]), answer: "12", difficulty: level, visualHtml: card("Composite perimeter", compositeShape(STAIR_CELLS, 4, 4), "Count the outside edges only."), visualSummary: "Counting the outside edges gives 12 units." }),
      () => buildQuestion({ question: "A scale drawing uses 1 grid square for 4 real square meters. A 3-by-5 grid rectangle represents what real area?", options: makeNumericOptions("60", [15, 30, 45]), answer: "60", difficulty: level, visualHtml: card("Scale area", rectangleGrid({ widthCells: 3, heightCells: 5 }), "Each grid square represents 4 square meters."), visualSummary: "15 grid squares × 4 square meters = 60 square meters." }),
      () => buildQuestion({ question: "The four points make a rectangle. What is its area?", options: makeNumericOptions("16", [12, 20, 24]), answer: "16", difficulty: level, visualHtml: card("Area from coordinates", coordinateGrid({ minX: 0, maxX: 7, minY: 0, maxY: 6, points: [{ label: "A", x: 2, y: 1 }, { label: "B", x: 6, y: 1 }, { label: "C", x: 6, y: 5 }, { label: "D", x: 2, y: 5 }] }), "Width = 4 units and height = 4 units."), visualSummary: "4 × 4 = 16 square units." }),
    ];
    return questions[level - 1]();
  }

  function createExtraTablePatternQuestion(difficulty) {
    const level = clampDifficulty(difficulty);
    const questions = [
      () => buildQuestion({ question: "What number is missing from the table?", options: makeNumericOptions("15", [12, 16, 18]), answer: "15", difficulty: level, visualHtml: tableCard("Input-output table", ["Input", "Rule", "Output"], [["3", "× 3", "9"], ["4", "× 3", "12"], ["5", "× 3", "?"]]), visualSummary: "The rule is multiply by 3, so 5 × 3 = 15." }),
      () => buildQuestion({ question: "What number is missing from the table?", options: makeNumericOptions("14", [12, 15, 16]), answer: "14", difficulty: level, visualHtml: tableCard("Input-output table", ["Input", "Rule", "Output"], [["6", "+ 6", "12"], ["7", "+ 6", "13"], ["8", "+ 6", "?"]]), visualSummary: "The rule is add 6, so 8 + 6 = 14." }),
      () => buildQuestion({ question: "What number is missing from the table?", options: makeNumericOptions("25", [20, 24, 30]), answer: "25", difficulty: level, visualHtml: tableCard("Input-output table", ["Input", "Rule", "Output"], [["3", "× 5", "15"], ["4", "× 5", "20"], ["5", "× 5", "?"]]), visualSummary: "The rule is multiply by 5, so 5 × 5 = 25." }),
      () => buildQuestion({ question: "Which rule matches the table?", options: makeChoiceOptions("Multiply by 2, then add 2", ["Add 2", "Multiply by 4", "Add 2, then multiply by 2"]), answer: "Multiply by 2, then add 2", difficulty: level, visualHtml: tableCard("Input-output table", ["Input", "Output"], [["1", "4"], ["2", "6"], ["3", "8"], ["4", "10"]]), visualSummary: "Each output is 2 times the input plus 2." }),
      () => buildQuestion({ question: "Which rule matches the table?", options: makeChoiceOptions("Multiply by 4, then subtract 1", ["Multiply by 3", "Add 4", "Subtract 1, then multiply by 4"]), answer: "Multiply by 4, then subtract 1", difficulty: level, visualHtml: tableCard("Input-output table", ["Input", "Output"], [["1", "3"], ["2", "7"], ["3", "11"], ["4", "15"]]), visualSummary: "Each output is 4 times the input minus 1." }),
      () => buildQuestion({ question: "What output belongs with input 6?", options: makeNumericOptions("30", [24, 31, 36]), answer: "30", difficulty: level, visualHtml: tableCard("Input-output table", ["Input", "Rule", "Output"], [["2", "× 5", "10"], ["4", "× 5", "20"], ["6", "× 5", "?"]]), visualSummary: "The rule is multiply by 5, so 6 × 5 = 30." }),
      () => buildQuestion({ question: "Which equation matches the table?", options: makeChoiceOptions("y = 3x + 1", ["y = x + 3", "y = 3x - 1", "y = 4x + 1"]), answer: "y = 3x + 1", difficulty: level, visualHtml: tableCard("x-y table", ["x", "y"], [["1", "4"], ["2", "7"], ["3", "10"], ["4", "13"]]), visualSummary: "Each y-value is 1 more than 3 times x." }),
      () => buildQuestion({ question: "Which equation matches the table?", options: makeChoiceOptions("y = 4x - 2", ["y = 4x + 2", "y = 2x + 4", "y = x - 2"]), answer: "y = 4x - 2", difficulty: level, visualHtml: tableCard("x-y table", ["x", "y"], [["1", "2"], ["2", "6"], ["3", "10"], ["4", "14"]]), visualSummary: "Each y-value is 2 less than 4 times x." }),
      () => buildQuestion({ question: "The table follows y = 2x + 5. What is y when x = 7?", options: makeNumericOptions("19", [17, 21, 24]), answer: "19", difficulty: level, visualHtml: tableCard("Function table", ["x", "y = 2x + 5"], [["3", "11"], ["5", "15"], ["7", "?"]]), visualSummary: "2 × 7 + 5 = 14 + 5 = 19." }),
      () => buildQuestion({ question: "The table follows y = 4x + 1. What is y when x = 5?", options: makeNumericOptions("21", [20, 22, 25]), answer: "21", difficulty: level, visualHtml: tableCard("Function table", ["x", "y = 4x + 1"], [["2", "9"], ["3", "13"], ["5", "?"]]), visualSummary: "4 × 5 + 1 = 20 + 1 = 21." }),
    ];
    return questions[level - 1]();
  }

  const FAMILIES = [
    createCoordinateQuestion,
    createNumberLineQuestion,
    createAngleQuestion,
    createPlotQuestion,
    createAreaQuestion,
    createTablePatternQuestion,
  ];

  const EXTRA_FAMILIES = [
    createExtraCoordinateQuestion,
    createExtraNumberLineQuestion,
    createExtraAngleQuestion,
    createExtraPlotQuestion,
    createExtraAreaQuestion,
    createExtraTablePatternQuestion,
  ];

  const ALL_FAMILIES = [...FAMILIES, ...EXTRA_FAMILIES];

  function createVisualMathGeneratedEntryInternal(difficulty) {
    const level = clampDifficulty(difficulty);
    return randomChoice(ALL_FAMILIES)(level);
  }

  const fallbackQuestions = [];
  for (let level = 1; level <= 10; level += 1) {
    ALL_FAMILIES.forEach((factory) => fallbackQuestions.push(factory(level)));
  }

  if (typeof globalThis !== "undefined") {
    globalThis.VISUAL_MATH_QUESTIONS = fallbackQuestions;
    globalThis.createVisualMathGeneratedEntry = createVisualMathGeneratedEntryInternal;
  }

  return fallbackQuestions;
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    VISUAL_MATH_QUESTIONS,
    createVisualMathGeneratedEntry: globalThis.createVisualMathGeneratedEntry,
  };
}
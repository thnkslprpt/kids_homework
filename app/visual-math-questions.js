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
  };

  function clampDifficulty(value) {
    const level = Number.parseInt(value, 10);
    if (!Number.isFinite(level)) {
      return 3;
    }

    return Math.min(5, Math.max(1, level));
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
      throw new Error("Visual math question options must contain exactly 4 unique choices.");
    }

    return shuffleArray(options);
  }

  function buildVisualCard(title, bodyHtml, detailHtml = "") {
    return `
      <div style="
        box-sizing: border-box;
        display: inline-block;
        max-width: 660px;
        padding: 14px;
        border: 2px solid ${COLORS.ink};
        border-radius: 16px;
        background: linear-gradient(180deg, ${COLORS.soft} 0%, ${COLORS.soft2} 100%);
        color: ${COLORS.ink};
        font-family: Arial, sans-serif;
      ">
        <div style="font-size: 16px; font-weight: 700; margin-bottom: 10px;">${escapeHtml(title)}</div>
        ${bodyHtml}
        ${detailHtml ? `<div style="margin-top: 10px; font-size: 13px; line-height: 1.35;">${detailHtml}</div>` : ""}
      </div>
    `;
  }

  function buildFigure(label, innerHtml) {
    return `
      <div style="text-align: center;">
        <div style="font-size: 13px; font-weight: 700; margin-bottom: 6px;">${escapeHtml(label)}</div>
        ${innerHtml}
      </div>
    `;
  }

  function buildComparisonCard(title, leftFigureHtml, rightFigureHtml, detailHtml = "") {
    return buildVisualCard(
      title,
      `
        <div style="
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;
          align-items: flex-start;
        ">
          ${leftFigureHtml}
          ${rightFigureHtml}
        </div>
      `,
      detailHtml
    );
  }

  function formatCoordinate(x, y) {
    return `(${x}, ${y})`;
  }

  function buildCoordinateGridSvg({
    widthCells = 5,
    heightCells = 5,
    points = [],
    title = "",
  } = {}) {
    const cellSize = 34;
    const left = 38;
    const right = 16;
    const top = 16;
    const bottom = 34;
    const width = left + widthCells * cellSize + right;
    const height = top + heightCells * cellSize + bottom;
    const xAxisY = top + heightCells * cellSize;
    const yAxisX = left;

    const gridLines = [];
    for (let x = 0; x <= widthCells; x += 1) {
      const xPos = left + x * cellSize;
      gridLines.push(`
        <line x1="${xPos}" y1="${top}" x2="${xPos}" y2="${xAxisY}" stroke="${COLORS.grid}" stroke-width="1"></line>
      `);
      gridLines.push(`
        <text x="${xPos}" y="${xAxisY + 18}" text-anchor="middle" font-size="11" fill="${COLORS.axis}">${x}</text>
      `);
    }

    for (let y = 0; y <= heightCells; y += 1) {
      const yPos = top + y * cellSize;
      const label = heightCells - y;
      gridLines.push(`
        <line x1="${yAxisX}" y1="${yPos}" x2="${left + widthCells * cellSize}" y2="${yPos}" stroke="${COLORS.grid}" stroke-width="1"></line>
      `);
      gridLines.push(`
        <text x="24" y="${yPos + 4}" text-anchor="end" font-size="11" fill="${COLORS.axis}">${label}</text>
      `);
    }

    const axes = `
      <line x1="${yAxisX}" y1="${top}" x2="${yAxisX}" y2="${xAxisY}" stroke="${COLORS.axis}" stroke-width="2.5"></line>
      <line x1="${yAxisX}" y1="${xAxisY}" x2="${left + widthCells * cellSize}" y2="${xAxisY}" stroke="${COLORS.axis}" stroke-width="2.5"></line>
      <text x="${left + widthCells * cellSize + 4}" y="${xAxisY + 4}" font-size="12" fill="${COLORS.axis}">x</text>
      <text x="${yAxisX - 12}" y="${top - 2}" font-size="12" fill="${COLORS.axis}">y</text>
    `;

    const pointMarkup = points
      .map((point, index) => {
        const xPos = left + point.x * cellSize;
        const yPos = top + (heightCells - point.y) * cellSize;
        const fill = point.fill || COLORS.dot;
        const label = point.label || String.fromCharCode(65 + index);
        const labelDx = point.labelDx || 11;
        const labelDy = point.labelDy || -10;

        return `
          <circle cx="${xPos}" cy="${yPos}" r="7.5" fill="${fill}" stroke="${COLORS.ink}" stroke-width="2"></circle>
          <text x="${xPos + labelDx}" y="${yPos + labelDy}" font-size="12" font-weight="700" fill="${COLORS.ink}">${escapeHtml(label)}</text>
        `;
      })
      .join("");

    const titleText = title
      ? `<text x="${left}" y="12" font-size="12" font-weight="700" fill="${COLORS.axis}">${escapeHtml(title)}</text>`
      : "";

    return `
      <svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-hidden="true">
        ${titleText}
        ${gridLines.join("")}
        ${axes}
        ${pointMarkup}
      </svg>
    `;
  }

  function buildNumberLineSvg({
    labels = [],
    markerIndex = 0,
    markerLabel = "",
    title = "",
  } = {}) {
    const width = 360;
    const height = 122;
    const left = 34;
    const right = 18;
    const lineY = 56;
    const tickTop = 42;
    const tickBottom = 68;
    const innerWidth = width - left - right;
    const spacing = labels.length > 1 ? innerWidth / (labels.length - 1) : innerWidth;

    const ticks = labels
      .map((label, index) => {
        const x = left + index * spacing;
        const isMarker = index === markerIndex;
        return `
          <line x1="${x}" y1="${tickTop}" x2="${x}" y2="${tickBottom}" stroke="${COLORS.axis}" stroke-width="${isMarker ? 2.5 : 1.5}"></line>
          <text x="${x}" y="${92}" text-anchor="middle" font-size="12" fill="${COLORS.axis}">${escapeHtml(label)}</text>
          ${isMarker ? `<circle cx="${x}" cy="${lineY}" r="7" fill="${COLORS.dot}" stroke="${COLORS.ink}" stroke-width="2"></circle>` : ""}
          ${isMarker && markerLabel ? `<text x="${x}" y="${34}" text-anchor="middle" font-size="12" font-weight="700" fill="${COLORS.ink}">${escapeHtml(markerLabel)}</text>` : ""}
        `;
      })
      .join("");

    return `
      <svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-hidden="true">
        ${title ? `<text x="${left}" y="20" font-size="12" font-weight="700" fill="${COLORS.axis}">${escapeHtml(title)}</text>` : ""}
        <line x1="${left}" y1="${lineY}" x2="${width - right}" y2="${lineY}" stroke="${COLORS.axis}" stroke-width="2.5"></line>
        ${ticks}
      </svg>
    `;
  }

  function buildAngleSvg({
    degrees = 90,
    label = "",
    title = "",
    width = 170,
    height = 150,
  } = {}) {
    const cx = 70;
    const cy = 104;
    const rayLength = 50;
    const labelX = 18;
    const labelY = 20;
    const angleRadians = (degrees * Math.PI) / 180;
    const x2 = cx + rayLength;
    const y2 = cy;
    const x3 = cx + rayLength * Math.cos(angleRadians);
    const y3 = cy - rayLength * Math.sin(angleRadians);
    const sweep = degrees > 180 ? 1 : 0;

    const arcRadius = 24;
    const arcX = cx + arcRadius;
    const arcY = cy;
    const arcEndX = cx + arcRadius * Math.cos(angleRadians);
    const arcEndY = cy - arcRadius * Math.sin(angleRadians);
    const arcPath = degrees === 90
      ? `M ${cx + 10} ${cy} A 10 10 0 0 0 ${cx} ${cy - 10}`
      : `M ${arcX} ${arcY} A ${arcRadius} ${arcRadius} 0 ${degrees > 180 ? 1 : 0} ${sweep} ${arcEndX} ${arcEndY}`;

    return `
      <svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-hidden="true">
        ${title ? `<text x="12" y="16" font-size="12" font-weight="700" fill="${COLORS.axis}">${escapeHtml(title)}</text>` : ""}
        ${label ? `<text x="${labelX}" y="${labelY}" font-size="12" font-weight="700" fill="${COLORS.axis}">${escapeHtml(label)}</text>` : ""}
        <line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="${COLORS.ink}" stroke-width="4" stroke-linecap="round"></line>
        <line x1="${cx}" y1="${cy}" x2="${x3}" y2="${y3}" stroke="${COLORS.accent}" stroke-width="4" stroke-linecap="round"></line>
        <path d="${arcPath}" fill="none" stroke="${COLORS.chart}" stroke-width="3" stroke-linecap="round"></path>
        <circle cx="${cx}" cy="${cy}" r="5.5" fill="${COLORS.ink}"></circle>
      </svg>
    `;
  }

  function buildAngleComparisonSvg(leftDegrees, rightDegrees) {
    return buildComparisonCard(
      "Compare the angles",
      buildFigure("Angle A", buildAngleSvg({ degrees: leftDegrees, label: "A" })),
      buildFigure("Angle B", buildAngleSvg({ degrees: rightDegrees, label: "B" }))
    );
  }

  function buildStackedSymbolChartSvg({
    categories = [],
    counts = [],
    symbolColor = COLORS.chart,
    title = "",
    keyText = "",
    yMax = 5,
    yTickStep = 1,
    valuePerSymbol = 1,
  } = {}) {
    const width = 360;
    const height = 240;
    const left = 42;
    const right = 18;
    const top = 20;
    const bottom = 48;
    const innerWidth = width - left - right;
    const innerHeight = height - top - bottom;
    const spacing = categories.length > 1 ? innerWidth / (categories.length - 1) : innerWidth;
    const baselineY = top + innerHeight;

    const yTicks = [];
    for (let value = 0; value <= yMax; value += yTickStep) {
      const y = baselineY - (value / yMax) * innerHeight;
      yTicks.push(`
        <line x1="${left - 4}" y1="${y}" x2="${left + innerWidth}" y2="${y}" stroke="${COLORS.grid}" stroke-width="1"></line>
        <text x="${left - 10}" y="${y + 4}" text-anchor="end" font-size="11" fill="${COLORS.axis}">${value}</text>
      `);
    }

    const dots = categories
      .map((category, index) => {
        const x = left + index * spacing;
        const count = counts[index] || 0;
        const circles = [];
        for (let dotIndex = 0; dotIndex < count; dotIndex += 1) {
          const value = (dotIndex + 1) * valuePerSymbol;
          const y = baselineY - (value / yMax) * innerHeight;
          circles.push(`
            <circle cx="${x}" cy="${y}" r="6.5" fill="${symbolColor}" stroke="${COLORS.ink}" stroke-width="2"></circle>
          `);
        }

        return `
          <text x="${x}" y="${baselineY + 18}" text-anchor="middle" font-size="12" fill="${COLORS.axis}">${escapeHtml(category)}</text>
          ${circles.join("")}
        `;
      })
      .join("");

    return buildVisualCard(
      title,
      `
        <div style="font-size: 13px; margin-bottom: 8px;">${escapeHtml(keyText)}</div>
        <svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-hidden="true">
          <line x1="${left}" y1="${top}" x2="${left}" y2="${baselineY}" stroke="${COLORS.axis}" stroke-width="2.5"></line>
          <line x1="${left}" y1="${baselineY}" x2="${width - right}" y2="${baselineY}" stroke="${COLORS.axis}" stroke-width="2.5"></line>
          ${yTicks.join("")}
          ${dots}
        </svg>
      `
    );
  }

  function buildRectangleGridSvg({
    widthCells = 4,
    heightCells = 3,
    gridCells = 7,
    title = "",
    fill = COLORS.fill,
    stroke = COLORS.ink,
  } = {}) {
    const cellSize = 28;
    const left = 24;
    const top = 16;
    const right = 16;
    const bottom = 18;
    const width = left + gridCells * cellSize + right;
    const height = top + gridCells * cellSize + bottom;
    const rectX = left + cellSize;
    const rectY = top + (gridCells - heightCells - 1) * cellSize;

    const gridLines = [];
    for (let value = 0; value <= gridCells; value += 1) {
      const pos = left + value * cellSize;
      gridLines.push(`
        <line x1="${pos}" y1="${top}" x2="${pos}" y2="${top + gridCells * cellSize}" stroke="${COLORS.grid}" stroke-width="1"></line>
        <line x1="${left}" y1="${top + value * cellSize}" x2="${left + gridCells * cellSize}" y2="${top + value * cellSize}" stroke="${COLORS.grid}" stroke-width="1"></line>
      `);
      if (value < gridCells) {
        gridLines.push(`
          <text x="${pos + cellSize / 2}" y="${top + gridCells * cellSize + 14}" text-anchor="middle" font-size="10" fill="${COLORS.axis}">${value}</text>
          <text x="${12}" y="${top + value * cellSize + 4}" text-anchor="middle" font-size="10" fill="${COLORS.axis}">${gridCells - value}</text>
        `);
      }
    }

    const titleText = title
      ? `<text x="${left}" y="12" font-size="12" font-weight="700" fill="${COLORS.axis}">${escapeHtml(title)}</text>`
      : "";

    return `
      <svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-hidden="true">
        ${titleText}
        ${gridLines.join("")}
        <rect x="${rectX}" y="${rectY}" width="${widthCells * cellSize}" height="${heightCells * cellSize}" fill="${fill}" fill-opacity="0.85" stroke="${stroke}" stroke-width="3"></rect>
      </svg>
    `;
  }

  function buildRectangleComparisonCard(leftRect, rightRect) {
    return buildComparisonCard(
      "Compare the rectangles",
      buildFigure("Rectangle A", buildRectangleGridSvg(leftRect)),
      buildFigure("Rectangle B", buildRectangleGridSvg(rightRect))
    );
  }

  function buildQuestion({
    question,
    options,
    answer,
    difficulty,
    visualHtml = "",
    visualSummary = "",
    type = "visual-math-choice",
  }) {
    if (!Array.isArray(options) || options.length !== 4) {
      throw new Error("Visual math questions must have exactly 4 options.");
    }

    if (!options.includes(answer)) {
      throw new Error("Visual math question answer must be included in the options.");
    }

    return {
      question,
      options,
      answer,
      difficulty,
      visualHtml,
      visualSummary,
      type,
    };
  }

  function createCoordinateQuestion(difficulty) {
    const level = clampDifficulty(difficulty);

    if (level === 1) {
      const point = { x: 2, y: 3 };
      return buildQuestion({
        question: "What is the coordinate of point A?",
        options: makeChoiceOptions(formatCoordinate(point.x, point.y), [
          formatCoordinate(1, 2),
          formatCoordinate(3, 2),
          formatCoordinate(4, 3),
        ]),
        answer: formatCoordinate(point.x, point.y),
        difficulty: level,
        visualHtml: buildVisualCard(
          "Coordinate grid",
          buildCoordinateGridSvg({
            points: [{ x: point.x, y: point.y, label: "A", fill: COLORS.dot }],
          })
        ),
        visualSummary: "Point A is 2 units right and 3 units up from the origin.",
      });
    }

    if (level === 2) {
      const target = { x: 4, y: 2 };
      const points = [
        { label: "A", x: 1, y: 1, fill: COLORS.chart },
        { label: "B", x: target.x, y: target.y, fill: COLORS.dot },
        { label: "C", x: 2, y: 4, fill: COLORS.chart2 },
        { label: "D", x: 3, y: 3, fill: COLORS.accent },
      ];

      return buildQuestion({
        question: `Which point is at ${formatCoordinate(target.x, target.y)}?`,
        options: makeChoiceOptions("B", ["A", "C", "D"]),
        answer: "B",
        difficulty: level,
        visualHtml: buildVisualCard(
          "Coordinate grid",
          buildCoordinateGridSvg({ points })
        ),
        visualSummary:
          "Point B is at (4, 2), point A is at (1, 1), point C is at (2, 4), and point D is at (3, 3).",
      });
    }

    if (level === 3) {
      const points = [
        { label: "A", x: 1, y: 4, fill: COLORS.chart },
        { label: "B", x: 2, y: 2, fill: COLORS.dot },
        { label: "C", x: 4, y: 1, fill: COLORS.chart2 },
        { label: "D", x: 3, y: 4, fill: COLORS.accent },
      ];

      return buildQuestion({
        question: "Which point is closest to the origin?",
        options: makeChoiceOptions("B", ["A", "C", "D"]),
        answer: "B",
        difficulty: level,
        visualHtml: buildVisualCard(
          "Coordinate grid",
          buildCoordinateGridSvg({ points })
        ),
        visualSummary:
          "Point B is closest to the origin. Point A is at (1, 4), point C is at (4, 1), and point D is at (3, 4).",
      });
    }

    if (level === 4) {
      const points = [
        { label: "A", x: 2, y: 1, fill: COLORS.chart },
        { label: "B", x: 5, y: 2, fill: COLORS.dot },
        { label: "C", x: 3, y: 4, fill: COLORS.chart2 },
        { label: "D", x: 4, y: 3, fill: COLORS.accent },
      ];

      return buildQuestion({
        question: "Which point has the greatest x-coordinate?",
        options: makeChoiceOptions("B", ["A", "C", "D"]),
        answer: "B",
        difficulty: level,
        visualHtml: buildVisualCard(
          "Coordinate grid",
          buildCoordinateGridSvg({ points })
        ),
        visualSummary:
          "Point B is farthest to the right at (5, 2). Points A, C, and D are at (2, 1), (3, 4), and (4, 3).",
      });
    }

    const points = [
      { label: "A", x: 1, y: 2, fill: COLORS.chart },
      { label: "B", x: 2, y: 5, fill: COLORS.dot },
      { label: "C", x: 4, y: 3, fill: COLORS.chart2 },
      { label: "D", x: 5, y: 1, fill: COLORS.accent },
    ];

    return buildQuestion({
      question: "Which point is highest up on the grid?",
      options: makeChoiceOptions("B", ["A", "C", "D"]),
      answer: "B",
      difficulty: level,
      visualHtml: buildVisualCard("Coordinate grid", buildCoordinateGridSvg({ points })),
      visualSummary:
        "Point B is highest at (2, 5). Point A is at (1, 2), point C is at (4, 3), and point D is at (5, 1).",
    });
  }

  function createNumberLineQuestion(difficulty) {
    const level = clampDifficulty(difficulty);

    if (level === 1) {
      const labels = ["0", "1/4", "1/2", "3/4", "1"];
      const answer = "1/2";
      return buildQuestion({
        question: "Which fraction is shown by the dot?",
        options: makeChoiceOptions(answer, ["1/4", "3/4", "1"]),
        answer,
        difficulty: level,
        visualHtml: buildVisualCard(
          "Number line",
          buildNumberLineSvg({
            labels,
            markerIndex: 2,
          })
        ),
        visualSummary: "The dot is on 1/2 between 0 and 1.",
      });
    }

    if (level === 2) {
      const labels = ["0", "1/4", "1/2", "3/4", "1"];
      const answer = "3/4";
      return buildQuestion({
        question: "Which fraction is shown by the dot?",
        options: makeChoiceOptions(answer, ["1/4", "1/2", "1"]),
        answer,
        difficulty: level,
        visualHtml: buildVisualCard(
          "Number line",
          buildNumberLineSvg({
            labels,
            markerIndex: 3,
          })
        ),
        visualSummary: "The dot is on 3/4 between 0 and 1.",
      });
    }

    if (level === 3) {
      const labels = ["0", "0.5", "1", "1.5", "2"];
      const answer = "1.5";
      return buildQuestion({
        question: "Which decimal is shown by the dot?",
        options: makeChoiceOptions(answer, ["0.5", "1", "2"]),
        answer,
        difficulty: level,
        visualHtml: buildVisualCard(
          "Number line",
          buildNumberLineSvg({
            labels,
            markerIndex: 3,
          })
        ),
        visualSummary: "The dot is on 1.5 halfway between 1 and 2.",
      });
    }

    if (level === 4) {
      const labels = ["0", "1", "2", "3", "4"];
      const answer = "2";
      return buildQuestion({
        question: "Which whole number is shown by the dot?",
        options: makeChoiceOptions(answer, ["1", "3", "4"]),
        answer,
        difficulty: level,
        visualHtml: buildVisualCard(
          "Number line",
          buildNumberLineSvg({
            labels,
            markerIndex: 2,
          })
        ),
        visualSummary: "The dot is on 2 on the whole-number line.",
      });
    }

    const labels = [
      "0",
      "1/4",
      "1/2",
      "3/4",
      "1",
      "1 1/4",
      "1 1/2",
      "1 3/4",
      "2",
    ];
    const answer = "1 1/4";
    return buildQuestion({
      question: "Which number is shown by the dot?",
      options: makeChoiceOptions(answer, ["1/4", "1 1/2", "1 3/4"]),
      answer,
      difficulty: level,
      visualHtml: buildVisualCard(
        "Number line",
        buildNumberLineSvg({
          labels,
          markerIndex: 5,
        })
      ),
      visualSummary: "The dot is on 1 1/4, one quarter past 1.",
    });
  }

  function createAngleQuestion(difficulty) {
    const level = clampDifficulty(difficulty);

    if (level === 1) {
      const angleDegrees = 90;
      return buildQuestion({
        question: "What type of angle is shown?",
        options: makeChoiceOptions("Right angle", ["Acute angle", "Obtuse angle", "Straight angle"]),
        answer: "Right angle",
        difficulty: level,
        visualHtml: buildVisualCard(
          "Angle",
          buildAngleSvg({ degrees: angleDegrees, label: "A" })
        ),
        visualSummary: "The angle has a 90 degree corner, so it is a right angle.",
      });
    }

    if (level === 2) {
      const leftDegrees = 45;
      const rightDegrees = 120;
      return buildQuestion({
        question: "Which angle is larger?",
        options: makeChoiceOptions("Angle B", ["Angle A", "They are equal", "Both are right angles"]),
        answer: "Angle B",
        difficulty: level,
        visualHtml: buildAngleComparisonSvg(leftDegrees, rightDegrees),
        visualSummary: "Angle A is 45 degrees and Angle B is 120 degrees, so Angle B is larger.",
      });
    }

    if (level === 3) {
      const angleDegrees = 65;
      return buildQuestion({
        question: "What type of angle is shown?",
        options: makeChoiceOptions("Acute angle", ["Right angle", "Obtuse angle", "Straight angle"]),
        answer: "Acute angle",
        difficulty: level,
        visualHtml: buildVisualCard("Angle", buildAngleSvg({ degrees: angleDegrees, label: "A" })),
        visualSummary: "The angle is less than 90 degrees, so it is acute.",
      });
    }

    if (level === 4) {
      const leftDegrees = 80;
      const rightDegrees = 100;
      return buildQuestion({
        question: "Which angle is larger?",
        options: makeChoiceOptions("Angle B", ["Angle A", "They are equal", "Both are straight angles"]),
        answer: "Angle B",
        difficulty: level,
        visualHtml: buildAngleComparisonSvg(leftDegrees, rightDegrees),
        visualSummary: "Angle A is 80 degrees and Angle B is 100 degrees, so Angle B is larger.",
      });
    }

    const angleDegrees = 135;
    return buildQuestion({
      question: "What type of angle is shown?",
      options: makeChoiceOptions("Obtuse angle", ["Acute angle", "Right angle", "Straight angle"]),
      answer: "Obtuse angle",
      difficulty: level,
      visualHtml: buildVisualCard("Angle", buildAngleSvg({ degrees: angleDegrees, label: "A" })),
      visualSummary: "The angle is greater than 90 degrees but less than 180 degrees, so it is obtuse.",
    });
  }

  function createPlotQuestion(difficulty) {
    const level = clampDifficulty(difficulty);

    if (level === 1) {
      const categories = ["0", "1", "2", "3"];
      const counts = [1, 2, 3, 1];
      return buildQuestion({
        question: "How many students read 2 books?",
        options: makeChoiceOptions("3", ["1", "2", "4"]),
        answer: "3",
        difficulty: level,
        visualHtml: buildStackedSymbolChartSvg({
          categories,
          counts,
          title: "Line plot: books read",
          keyText: "Each dot means 1 student.",
          yMax: 4,
        }),
        visualSummary: "There are 3 dots above 2 books, so 3 students read 2 books.",
      });
    }

    if (level === 2) {
      const categories = ["0", "1", "2", "3"];
      const counts = [2, 1, 3, 2];
      return buildQuestion({
        question: "How many students are shown altogether?",
        options: makeChoiceOptions("8", ["6", "7", "9"]),
        answer: "8",
        difficulty: level,
        visualHtml: buildStackedSymbolChartSvg({
          categories,
          counts,
          title: "Line plot: books read",
          keyText: "Each dot means 1 student.",
          yMax: 4,
        }),
        visualSummary: "The line plot shows 2 + 1 + 3 + 2 = 8 students.",
      });
    }

    if (level === 3) {
      const categories = ["Cats", "Dogs", "Fish", "Birds"];
      const counts = [3, 5, 2, 4];
      return buildQuestion({
        question: "How many snacks does the Dogs row show?",
        options: makeChoiceOptions("10", ["6", "8", "12"]),
        answer: "10",
        difficulty: level,
        visualHtml: buildStackedSymbolChartSvg({
          categories,
          counts,
          title: "Pictograph: favorite pets",
          keyText: "Each symbol means 2 snacks.",
          yMax: 10,
          yTickStep: 2,
          valuePerSymbol: 2,
          symbolColor: COLORS.chart2,
        }),
        visualSummary: "The Dogs row has 5 symbols, and each symbol means 2 snacks, so the answer is 10.",
      });
    }

    if (level === 4) {
      const categories = ["0", "1", "2", "3"];
      const counts = [1, 4, 2, 3];
      return buildQuestion({
        question: "Which number of books was chosen most often?",
        options: makeChoiceOptions("1", ["0", "2", "3"]),
        answer: "1",
        difficulty: level,
        visualHtml: buildStackedSymbolChartSvg({
          categories,
          counts,
          title: "Line plot: books read",
          keyText: "Each dot means 1 student.",
          yMax: 4,
        }),
        visualSummary: "The tallest stack is above 1 book, with 4 dots.",
      });
    }

    const categories = ["A", "B", "C", "D"];
    const counts = [2, 3, 1, 4];
    return buildQuestion({
      question: "How many more symbols are in row D than row C?",
      options: makeChoiceOptions("3", ["1", "2", "4"]),
      answer: "3",
      difficulty: level,
      visualHtml: buildStackedSymbolChartSvg({
        categories,
        counts,
        title: "Pictograph: classroom stickers",
        keyText: "Each symbol means 1 sticker.",
        yMax: 4,
        symbolColor: COLORS.accent,
      }),
      visualSummary: "Row D has 4 symbols and row C has 1 symbol, so row D has 3 more.",
    });
  }

  function createAreaQuestion(difficulty) {
    const level = clampDifficulty(difficulty);

    if (level === 1) {
      const widthCells = 4;
      const heightCells = 3;
      const answer = "12";
      return buildQuestion({
        question: "What is the area of the shaded rectangle?",
        options: makeChoiceOptions(answer, ["10", "14", "16"]),
        answer,
        difficulty: level,
        visualHtml: buildVisualCard(
          "Area on a grid",
          buildRectangleGridSvg({ widthCells, heightCells })
        ),
        visualSummary: "The rectangle is 4 units wide and 3 units tall, so its area is 12 square units.",
      });
    }

    if (level === 2) {
      const widthCells = 5;
      const heightCells = 2;
      const answer = "14";
      return buildQuestion({
        question: "What is the perimeter of the shaded rectangle?",
        options: makeChoiceOptions(answer, ["12", "16", "18"]),
        answer,
        difficulty: level,
        visualHtml: buildVisualCard(
          "Perimeter on a grid",
          buildRectangleGridSvg({ widthCells, heightCells })
        ),
        visualSummary: "The rectangle is 5 units wide and 2 units tall, so its perimeter is 14 units.",
      });
    }

    if (level === 3) {
      const widthCells = 3;
      const heightCells = 4;
      const answer = "12";
      return buildQuestion({
        question: "How many square units cover the shaded rectangle?",
        options: makeChoiceOptions(answer, ["10", "11", "16"]),
        answer,
        difficulty: level,
        visualHtml: buildVisualCard(
          "Area on a grid",
          buildRectangleGridSvg({ widthCells, heightCells })
        ),
        visualSummary: "The rectangle covers 3 by 4 unit squares, which is 12 square units.",
      });
    }

    if (level === 4) {
      const leftRect = { widthCells: 4, heightCells: 3 };
      const rightRect = { widthCells: 5, heightCells: 2 };
      return buildQuestion({
        question: "Which rectangle has the greater area?",
        options: makeChoiceOptions("Rectangle A", ["Rectangle B", "They are equal", "Not enough information"]),
        answer: "Rectangle A",
        difficulty: level,
        visualHtml: buildRectangleComparisonCard(leftRect, rightRect),
        visualSummary: "Rectangle A is 4 by 3, so its area is 12. Rectangle B is 5 by 2, so its area is 10.",
      });
    }

    const leftRect = { widthCells: 6, heightCells: 2 };
    const rightRect = { widthCells: 4, heightCells: 3 };
    return buildQuestion({
      question: "Which rectangle has the greater perimeter?",
      options: makeChoiceOptions("Rectangle A", ["Rectangle B", "They are equal", "Not enough information"]),
      answer: "Rectangle A",
      difficulty: level,
      visualHtml: buildRectangleComparisonCard(leftRect, rightRect),
      visualSummary: "Rectangle A has perimeter 16. Rectangle B has perimeter 14.",
    });
  }

  function createVisualMathGeneratedEntryInternal(difficulty) {
    const level = clampDifficulty(difficulty);
    const families = [
      createCoordinateQuestion,
      createNumberLineQuestion,
      createAngleQuestion,
      createPlotQuestion,
      createAreaQuestion,
    ];
    const factory = families[randomInt(0, families.length - 1)];
    return factory(level);
  }

  const fallbackQuestions = [
    buildQuestion({
      question: "What is the coordinate of point A?",
      options: ["(1, 2)", "(2, 3)", "(3, 2)", "(4, 3)"],
      answer: "(2, 3)",
      difficulty: 1,
      visualHtml: buildVisualCard(
        "Coordinate grid",
        buildCoordinateGridSvg({
          points: [{ x: 2, y: 3, label: "A", fill: COLORS.dot }],
        })
      ),
      visualSummary: "Point A is 2 units right and 3 units up from the origin.",
    }),
    buildQuestion({
      question: "Which point is at (4, 2)?",
      options: ["A", "B", "C", "D"],
      answer: "B",
      difficulty: 1,
      visualHtml: buildVisualCard(
        "Coordinate grid",
        buildCoordinateGridSvg({
          points: [
            { label: "A", x: 1, y: 1, fill: COLORS.chart },
            { label: "B", x: 4, y: 2, fill: COLORS.dot },
            { label: "C", x: 2, y: 4, fill: COLORS.chart2 },
            { label: "D", x: 3, y: 3, fill: COLORS.accent },
          ],
        })
      ),
      visualSummary:
        "Point B is at (4, 2), point A is at (1, 1), point C is at (2, 4), and point D is at (3, 3).",
    }),
    buildQuestion({
      question: "Which fraction is shown by the dot?",
      options: ["1/4", "1/2", "3/4", "1"],
      answer: "3/4",
      difficulty: 1,
      visualHtml: buildVisualCard(
        "Number line",
        buildNumberLineSvg({
          labels: ["0", "1/4", "1/2", "3/4", "1"],
          markerIndex: 3,
        })
      ),
      visualSummary: "The dot is on 3/4 between 0 and 1.",
    }),
    buildQuestion({
      question: "Which decimal is shown by the dot?",
      options: ["1", "1.25", "1.5", "1.75"],
      answer: "1.5",
      difficulty: 2,
      visualHtml: buildVisualCard(
        "Number line",
        buildNumberLineSvg({
          labels: ["0", "0.5", "1", "1.5", "2"],
          markerIndex: 3,
        })
      ),
      visualSummary: "The dot is on 1.5 halfway between 1 and 2.",
    }),
    buildQuestion({
      question: "Which whole number is shown by the dot?",
      options: ["1", "2", "3", "4"],
      answer: "2",
      difficulty: 2,
      visualHtml: buildVisualCard(
        "Number line",
        buildNumberLineSvg({
          labels: ["0", "1", "2", "3", "4"],
          markerIndex: 2,
        })
      ),
      visualSummary: "The dot is on 2 on the whole-number line.",
    }),
    buildQuestion({
      question: "What type of angle is shown?",
      options: ["Acute angle", "Right angle", "Obtuse angle", "Straight angle"],
      answer: "Right angle",
      difficulty: 1,
      visualHtml: buildVisualCard("Angle", buildAngleSvg({ degrees: 90, label: "A" })),
      visualSummary: "The angle has a 90 degree corner, so it is a right angle.",
    }),
    buildQuestion({
      question: "Which angle is larger?",
      options: ["Angle A", "Angle B", "They are equal", "Both are right angles"],
      answer: "Angle B",
      difficulty: 2,
      visualHtml: buildAngleComparisonSvg(45, 120),
      visualSummary: "Angle A is 45 degrees and Angle B is 120 degrees, so Angle B is larger.",
    }),
    buildQuestion({
      question: "How many students read 2 books?",
      options: ["1", "2", "3", "4"],
      answer: "3",
      difficulty: 1,
      visualHtml: buildStackedSymbolChartSvg({
        categories: ["0", "1", "2", "3"],
        counts: [1, 2, 3, 1],
        title: "Line plot: books read",
        keyText: "Each dot means 1 student.",
        yMax: 4,
      }),
      visualSummary: "There are 3 dots above 2 books, so 3 students read 2 books.",
    }),
    buildQuestion({
      question: "How many students are shown altogether?",
      options: ["6", "7", "8", "9"],
      answer: "7",
      difficulty: 2,
      visualHtml: buildStackedSymbolChartSvg({
        categories: ["0", "1", "2", "3"],
        counts: [1, 2, 3, 1],
        title: "Line plot: books read",
        keyText: "Each dot means 1 student.",
        yMax: 4,
      }),
      visualSummary: "The line plot shows 1 + 2 + 3 + 1 = 7 students.",
    }),
    buildQuestion({
      question: "How many snacks does the Dogs row show?",
      options: ["6", "8", "10", "12"],
      answer: "10",
      difficulty: 2,
      visualHtml: buildStackedSymbolChartSvg({
        categories: ["Cats", "Dogs", "Fish", "Birds"],
        counts: [3, 5, 2, 4],
        title: "Pictograph: favorite pets",
        keyText: "Each symbol means 2 snacks.",
        yMax: 10,
        yTickStep: 2,
        valuePerSymbol: 2,
        symbolColor: COLORS.chart2,
      }),
      visualSummary: "The Dogs row has 5 symbols, and each symbol means 2 snacks, so the answer is 10.",
    }),
    buildQuestion({
      question: "What is the area of the shaded rectangle?",
      options: ["10", "12", "14", "16"],
      answer: "12",
      difficulty: 1,
      visualHtml: buildVisualCard(
        "Area on a grid",
        buildRectangleGridSvg({ widthCells: 4, heightCells: 3 })
      ),
      visualSummary: "The rectangle is 4 units wide and 3 units tall, so its area is 12 square units.",
    }),
    buildQuestion({
      question: "What is the perimeter of the shaded rectangle?",
      options: ["12", "14", "16", "18"],
      answer: "14",
      difficulty: 2,
      visualHtml: buildVisualCard(
        "Perimeter on a grid",
        buildRectangleGridSvg({ widthCells: 5, heightCells: 2 })
      ),
      visualSummary: "The rectangle is 5 units wide and 2 units tall, so its perimeter is 14 units.",
    }),
  ];

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

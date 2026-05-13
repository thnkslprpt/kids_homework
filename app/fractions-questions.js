const FRACTIONS_QUESTIONS = (() => {
  const FILLED_COLOR = "#f5b942";
  const FILLED_ALT_COLOR = "#69b7ff";
  const EMPTY_COLOR = "#ffffff";
  const STROKE_COLOR = "#274972";

  function escapeFractionHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
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

  function buildVisualCard(title, bodyHtml) {
    return `
      <div class="visual-card fraction-visual-card">
        <div class="visual-card-title">${escapeFractionHtml(title)}</div>
        ${bodyHtml}
      </div>
    `;
  }

  function buildFigure(label, svgHtml) {
    const labelHtml = label
      ? `<div class="fraction-visual-label">${escapeFractionHtml(label)}</div>`
      : "";

    return `
      <div class="fraction-visual-figure">
        ${labelHtml}
        ${svgHtml}
      </div>
    `;
  }

  function buildPieSvg(numerator, denominator, color = FILLED_COLOR) {
    const cx = 70;
    const cy = 70;
    const radius = 58;
    const angleStep = 360 / denominator;

    const sectors = Array.from({ length: denominator }, (_, index) => {
      const startAngle = index * angleStep;
      const endAngle = startAngle + angleStep;
      const fill = index < numerator ? color : EMPTY_COLOR;

      return `
        <path
          d="${describeSector(cx, cy, radius, startAngle, endAngle)}"
          fill="${fill}"
          stroke="${STROKE_COLOR}"
          stroke-width="2"
        ></path>
      `;
    }).join("");

    return `
      <svg
        class="fraction-visual-svg fraction-visual-svg-circle"
        viewBox="0 0 140 140"
        aria-hidden="true"
      >
        ${sectors}
        <circle
          cx="${cx}"
          cy="${cy}"
          r="${radius}"
          fill="none"
          stroke="${STROKE_COLOR}"
          stroke-width="2.5"
        ></circle>
      </svg>
    `;
  }

  function buildStripSvg(numerator, denominator, color = FILLED_ALT_COLOR) {
    const partWidth = 24;
    const gap = 4;
    const height = 44;
    const padding = 4;
    const width = padding * 2 + denominator * partWidth + Math.max(0, denominator - 1) * gap;

    const parts = Array.from({ length: denominator }, (_, index) => {
      const x = padding + index * (partWidth + gap);
      const fill = index < numerator ? color : EMPTY_COLOR;

      return `
        <rect
          x="${x}"
          y="${padding}"
          width="${partWidth}"
          height="${height}"
          rx="8"
          fill="${fill}"
          stroke="${STROKE_COLOR}"
          stroke-width="2"
        ></rect>
      `;
    }).join("");

    return `
      <svg
        class="fraction-visual-svg fraction-visual-svg-strip"
        viewBox="0 0 ${width} ${height + padding * 2}"
        aria-hidden="true"
      >
        ${parts}
      </svg>
    `;
  }

  function buildSetSvg(coloredCount, totalCount, color = FILLED_ALT_COLOR) {
    const columns = Math.min(4, totalCount);
    const rows = Math.ceil(totalCount / columns);
    const cellSize = 32;
    const radius = 11;
    const padding = 8;
    const width = padding * 2 + columns * cellSize;
    const height = padding * 2 + rows * cellSize;

    const items = Array.from({ length: totalCount }, (_, index) => {
      const row = Math.floor(index / columns);
      const column = index % columns;
      const cx = padding + column * cellSize + cellSize / 2;
      const cy = padding + row * cellSize + cellSize / 2;
      const fill = index < coloredCount ? color : EMPTY_COLOR;

      return `
        <circle
          cx="${cx}"
          cy="${cy}"
          r="${radius}"
          fill="${fill}"
          stroke="${STROKE_COLOR}"
          stroke-width="2"
        ></circle>
      `;
    }).join("");

    return `
      <svg
        class="fraction-visual-svg fraction-visual-svg-set"
        viewBox="0 0 ${width} ${height}"
        aria-hidden="true"
      >
        ${items}
      </svg>
    `;
  }

  function buildSingleVisualHtml(title, label, svgHtml) {
    return buildVisualCard(
      title,
      `<div class="fraction-visual-single">${buildFigure(label, svgHtml)}</div>`
    );
  }

  function buildComparisonVisualHtml(title, leftFigureHtml, rightFigureHtml) {
    return buildVisualCard(
      title,
      `<div class="fraction-visual-pair">${leftFigureHtml}${rightFigureHtml}</div>`
    );
  }

  function createPieQuestion({
    question,
    numerator,
    denominator,
    options,
    answer,
    difficulty,
    title = "Fraction model",
    label = "Picture",
    color,
    visualSummary,
  }) {
    return {
      question,
      options,
      answer,
      difficulty,
      visualHtml: buildSingleVisualHtml(title, label, buildPieSvg(numerator, denominator, color)),
      visualSummary:
        visualSummary ||
        `A circle is split into ${denominator} equal parts and ${numerator} parts are shaded.`,
    };
  }

  function createStripQuestion({
    question,
    numerator,
    denominator,
    options,
    answer,
    difficulty,
    title = "Strip model",
    label = "Picture",
    color,
    visualSummary,
  }) {
    return {
      question,
      options,
      answer,
      difficulty,
      visualHtml: buildSingleVisualHtml(title, label, buildStripSvg(numerator, denominator, color)),
      visualSummary:
        visualSummary ||
        `A strip is split into ${denominator} equal parts and ${numerator} parts are shaded.`,
    };
  }

  function createSetQuestion({
    question,
    coloredCount,
    totalCount,
    options,
    answer,
    difficulty,
    title = "Counters",
    label = "Picture",
    color,
    visualSummary,
  }) {
    return {
      question,
      options,
      answer,
      difficulty,
      visualHtml: buildSingleVisualHtml(title, label, buildSetSvg(coloredCount, totalCount, color)),
      visualSummary:
        visualSummary ||
        `${coloredCount} of ${totalCount} counters are colored.`,
    };
  }

  function createComparisonQuestion({
    question,
    leftLabel = "Picture A",
    rightLabel = "Picture B",
    leftVisualHtml,
    rightVisualHtml,
    options,
    answer,
    difficulty,
    title = "Compare the pictures",
    visualSummary,
  }) {
    return {
      question,
      options,
      answer,
      difficulty,
      visualHtml: buildComparisonVisualHtml(
        title,
        buildFigure(leftLabel, leftVisualHtml),
        buildFigure(rightLabel, rightVisualHtml)
      ),
      visualSummary,
    };
  }

  function createDirectFractionComparisonQuestion({
    comparisonWord,
    leftFraction,
    rightFraction,
    answer,
    difficulty,
    equalOption = "They are equal",
    fallbackOption = "Not enough information",
  }) {
    return {
      question: `Which is ${comparisonWord}: ${leftFraction} or ${rightFraction}?`,
      options: [leftFraction, rightFraction, equalOption, fallbackOption],
      answer,
      difficulty,
    };
  }

  const FRACTIONS_GENERATED_FACTORIES = {
    1: [
      () =>
        createPieQuestion({
          question: "What fraction of the pie is shaded?",
          numerator: 1,
          denominator: 2,
          options: ["1/2", "1/3", "1/4", "2/3"],
          answer: "1/2",
          difficulty: 1,
          title: "Pie model",
          label: "Pie",
        }),
      () =>
        createStripQuestion({
          question: "What fraction of the strip is shaded?",
          numerator: 1,
          denominator: 4,
          options: ["1/4", "2/4", "3/4", "4/4"],
          answer: "1/4",
          difficulty: 1,
          title: "Strip model",
        }),
      () =>
        createSetQuestion({
          question: "What fraction of the counters are blue?",
          coloredCount: 1,
          totalCount: 4,
          options: ["1/4", "2/4", "3/4", "4/4"],
          answer: "1/4",
          difficulty: 1,
          color: FILLED_ALT_COLOR,
          visualSummary: "1 of 4 counters is blue.",
        }),
      () =>
        createPieQuestion({
          question: "What fraction of the pie is shaded?",
          numerator: 1,
          denominator: 3,
          options: ["1/2", "1/3", "1/4", "2/3"],
          answer: "1/3",
          difficulty: 1,
          title: "Pie model",
          label: "Pie",
        }),
    ],
    2: [
      () =>
        createPieQuestion({
          question: "What fraction is shaded?",
          numerator: 2,
          denominator: 6,
          options: ["1/6", "2/6", "3/6", "4/6"],
          answer: "2/6",
          difficulty: 2,
          title: "Shaded circle",
        }),
      () =>
        createStripQuestion({
          question:
            "A granola bar is split into 8 equal pieces. 5 pieces are covered in chocolate. What fraction is chocolate-covered?",
          numerator: 5,
          denominator: 8,
          options: ["3/8", "4/8", "5/8", "6/8"],
          answer: "5/8",
          difficulty: 2,
          title: "Granola bar pieces",
          label: "Bar pieces",
        }),
      () => ({
        question: "What is 1/4 of 12?",
        options: ["2", "3", "4", "6"],
        answer: "3",
        difficulty: 2,
      }),
    ],
    3: [
      () =>
        createComparisonQuestion({
          question: "Which picture shows the larger fraction?",
          leftVisualHtml: buildStripSvg(2, 3, FILLED_COLOR),
          rightVisualHtml: buildStripSvg(1, 3, FILLED_ALT_COLOR),
          options: ["Picture A", "Picture B", "They are equal", "Not enough information"],
          answer: "Picture A",
          difficulty: 3,
          visualSummary: "Picture A shows 2/3 shaded. Picture B shows 1/3 shaded.",
        }),
      () =>
        createPieQuestion({
          question: "Which fraction in simplest form matches the picture?",
          numerator: 6,
          denominator: 8,
          options: ["1/2", "2/3", "3/4", "7/8"],
          answer: "3/4",
          difficulty: 3,
          title: "Shaded circle",
          visualSummary: "A circle is split into 8 equal parts and 6 are shaded.",
        }),
      () => ({
        question: "What is 3/4 of 12?",
        options: ["6", "8", "9", "10"],
        answer: "9",
        difficulty: 3,
      }),
    ],
    4: [
      () =>
        createSetQuestion({
          question: "Which fraction in simplest form matches the colored counters?",
          coloredCount: 9,
          totalCount: 12,
          options: ["1/2", "2/3", "3/4", "5/6"],
          answer: "3/4",
          difficulty: 4,
          visualSummary: "9 of 12 counters are colored.",
        }),
      () => ({
        question: "Which decimal is equal to 3/4?",
        options: ["0.25", "0.5", "0.75", "1.25"],
        answer: "0.75",
        difficulty: 4,
      }),
      () => ({
        question: "Which fraction is closer to 1 whole?",
        options: ["3/8", "5/8", "7/8", "1/8"],
        answer: "7/8",
        difficulty: 4,
      }),
    ],
    5: [
      () =>
        createComparisonQuestion({
          question: "Which picture shows the larger fraction?",
          leftVisualHtml: buildPieSvg(5, 6, FILLED_COLOR),
          rightVisualHtml: buildPieSvg(7, 8, FILLED_ALT_COLOR),
          options: ["Picture A", "Picture B", "They are equal", "Not enough information"],
          answer: "Picture B",
          difficulty: 5,
          visualSummary: "Picture A shows 5/6 shaded. Picture B shows 7/8 shaded.",
        }),
      () =>
        createStripQuestion({
          question: "Which fraction in simplest form matches the strip?",
          numerator: 10,
          denominator: 16,
          options: ["5/8", "3/4", "2/3", "7/8"],
          answer: "5/8",
          difficulty: 5,
          visualSummary: "A strip is split into 16 equal parts and 10 are shaded.",
        }),
      () => ({
        question: "What is 2/3 + 1/6?",
        options: ["3/6", "4/6", "5/6", "1"],
        answer: "5/6",
        difficulty: 5,
      }),
    ],
    6: [
      () => ({
        question: "What is 5/6 - 1/4?",
        options: ["7/12", "2/3", "3/4", "1/2"],
        answer: "7/12",
        difficulty: 6,
      }),
      () => ({
        question: "Which fraction is equal to 0.375?",
        options: ["3/8", "5/8", "3/4", "7/10"],
        answer: "3/8",
        difficulty: 6,
      }),
      () =>
        createSetQuestion({
          question: "Which fraction in simplest form matches the colored counters?",
          coloredCount: 18,
          totalCount: 24,
          options: ["2/3", "3/4", "4/5", "5/6"],
          answer: "3/4",
          difficulty: 6,
          visualSummary: "18 of 24 counters are colored.",
        }),
    ],
    7: [
      () => ({
        question: "What is 1 1/2 + 2/3?",
        options: ["1 5/6", "2 1/6", "2 1/3", "2 2/3"],
        answer: "2 1/6",
        difficulty: 7,
      }),
      () => ({
        question: "What is 3/4 x 2/3?",
        options: ["1/2", "2/5", "5/7", "7/12"],
        answer: "1/2",
        difficulty: 7,
      }),
      () =>
        createComparisonQuestion({
          question: "Which picture shows the larger fraction?",
          leftVisualHtml: buildStripSvg(11, 12, FILLED_COLOR),
          rightVisualHtml: buildStripSvg(9, 10, FILLED_ALT_COLOR),
          options: ["Picture A", "Picture B", "They are equal", "Not enough information"],
          answer: "Picture A",
          difficulty: 7,
          visualSummary: "Picture A shows 11/12 shaded. Picture B shows 9/10 shaded.",
        }),
    ],
  };

  globalThis.createFractionsGeneratedEntry = function createFractionsGeneratedEntry(difficulty) {
    const level = fractionsClampDifficulty(difficulty);
    const factories = FRACTIONS_GENERATED_FACTORIES[level] || FRACTIONS_GENERATED_FACTORIES[3];
    return {
      ...fractionsRandomChoice(factories)(),
      difficulty: level,
    };
  };

  return [
    createPieQuestion({
      question: "What fraction of the pizza is shaded?",
      numerator: 1,
      denominator: 2,
      options: ["1/2", "1/3", "1/4", "2/3"],
      answer: "1/2",
      difficulty: 1,
      title: "Pizza slices",
      label: "Pizza",
    }),
    createStripQuestion({
      question: "What fraction of the strip is shaded?",
      numerator: 1,
      denominator: 4,
      options: ["1/4", "2/4", "3/4", "4/4"],
      answer: "1/4",
      difficulty: 1,
    }),
    createSetQuestion({
      question: "What fraction of the counters are blue?",
      coloredCount: 1,
      totalCount: 4,
      options: ["1/4", "2/4", "3/4", "4/4"],
      answer: "1/4",
      difficulty: 1,
      color: FILLED_ALT_COLOR,
      visualSummary: "1 of 4 counters is blue.",
    }),
    createPieQuestion({
      question: "What fraction of the pizza is shaded?",
      numerator: 1,
      denominator: 3,
      options: ["1/2", "1/3", "1/4", "2/3"],
      answer: "1/3",
      difficulty: 1,
      title: "Pizza slices",
      label: "Pizza",
    }),
    {
      question: "What is 1/2 of 4?",
      options: ["1", "2", "3", "4"],
      answer: "2",
      difficulty: 1,
    },
    {
      question: "What is 1/2 of 6?",
      options: ["2", "3", "4", "5"],
      answer: "3",
      difficulty: 1,
    },
    createPieQuestion({
      question: "What fraction is shaded?",
      numerator: 2,
      denominator: 6,
      options: ["1/6", "2/6", "3/6", "4/6"],
      answer: "2/6",
      difficulty: 2,
      title: "Shaded circle",
    }),
    createComparisonQuestion({
      question: "Which picture shows the larger fraction?",
      leftVisualHtml: buildStripSvg(2, 3, FILLED_COLOR),
      rightVisualHtml: buildStripSvg(1, 3, FILLED_ALT_COLOR),
      options: ["Picture A", "Picture B", "They are equal", "Not enough information"],
      answer: "Picture A",
      difficulty: 2,
      visualSummary: "Picture A shows 2/3 shaded. Picture B shows 1/3 shaded.",
    }),
    {
      question: "Which fraction is equal to 3/6?",
      options: ["1/3", "1/2", "2/3", "3/4"],
      answer: "1/2",
      difficulty: 2,
    },
    {
      question: "What is 1/4 of 12?",
      options: ["2", "3", "4", "6"],
      answer: "3",
      difficulty: 2,
    },
    createStripQuestion({
      question:
        "A granola bar is split into 8 equal pieces. 5 pieces are covered in chocolate. What fraction is chocolate-covered?",
      numerator: 5,
      denominator: 8,
      options: ["3/8", "4/8", "5/8", "6/8"],
      answer: "5/8",
      difficulty: 2,
      title: "Granola bar pieces",
      label: "Bar pieces",
    }),
    createDirectFractionComparisonQuestion({
      comparisonWord: "greater",
      leftFraction: "2/3",
      rightFraction: "2/6",
      answer: "2/3",
      difficulty: 2,
      fallbackOption: "Neither",
    }),
    createPieQuestion({
      question: "Which fraction in simplest form matches the picture?",
      numerator: 6,
      denominator: 8,
      options: ["1/2", "2/3", "3/4", "7/8"],
      answer: "3/4",
      difficulty: 3,
      title: "Shaded pizza",
      label: "Pizza",
      visualSummary: "A circle is split into 8 equal parts and 6 are shaded.",
    }),
    createComparisonQuestion({
      question: "Which picture shows the larger fraction?",
      leftVisualHtml: buildStripSvg(3, 4, FILLED_COLOR),
      rightVisualHtml: buildPieSvg(2, 3, FILLED_ALT_COLOR),
      options: ["Picture A", "Picture B", "They are equal", "Not enough information"],
      answer: "Picture A",
      difficulty: 3,
      visualSummary: "Picture A shows 3/4 shaded. Picture B shows 2/3 shaded.",
    }),
    {
      question: "What is 3/4 of 12?",
      options: ["6", "8", "9", "10"],
      answer: "9",
      difficulty: 3,
    },
    {
      question: "What is 1/2 + 1/4?",
      options: ["2/4", "3/4", "1", "1/8"],
      answer: "3/4",
      difficulty: 3,
    },
    createSetQuestion({
      question: "Which fraction in simplest form matches the colored counters?",
      coloredCount: 9,
      totalCount: 12,
      options: ["1/2", "2/3", "3/4", "5/6"],
      answer: "3/4",
      difficulty: 3,
      visualSummary: "9 of 12 counters are colored.",
    }),
    {
      question: "Which fraction is closer to 1 whole?",
      options: ["3/8", "5/8", "7/8", "1/8"],
      answer: "7/8",
      difficulty: 3,
    },
    createPieQuestion({
      question: "Which fraction in simplest form matches the picture?",
      numerator: 8,
      denominator: 12,
      options: ["1/2", "2/3", "3/4", "4/5"],
      answer: "2/3",
      difficulty: 4,
      title: "Shaded circle",
      visualSummary: "A circle is split into 12 equal parts and 8 are shaded.",
    }),
    createDirectFractionComparisonQuestion({
      comparisonWord: "larger",
      leftFraction: "5/6",
      rightFraction: "3/4",
      answer: "5/6",
      difficulty: 4,
    }),
    createStripQuestion({
      question: "What decimal matches the shaded part of the strip?",
      numerator: 7,
      denominator: 10,
      options: ["0.4", "0.5", "0.7", "0.9"],
      answer: "0.7",
      difficulty: 4,
      visualSummary: "A strip is split into 10 equal parts and 7 are shaded.",
    }),
    {
      question: "What is 2/5 of 20?",
      options: ["6", "8", "10", "12"],
      answer: "8",
      difficulty: 4,
    },
    createSetQuestion({
      question: "Which fraction in simplest form matches the colored counters?",
      coloredCount: 9,
      totalCount: 15,
      options: ["2/5", "3/5", "4/5", "9/10"],
      answer: "3/5",
      difficulty: 4,
      visualSummary: "9 of 15 counters are colored.",
    }),
    {
      question:
        "Lina used 3/4 cup of yogurt and then added 1/4 cup more. How much yogurt is that altogether?",
      options: ["3/4 cup", "1 cup", "1 1/4 cups", "1 1/2 cups"],
      answer: "1 cup",
      difficulty: 4,
    },
    createComparisonQuestion({
      question: "Which picture shows the larger fraction?",
      leftVisualHtml: buildPieSvg(5, 6, FILLED_COLOR),
      rightVisualHtml: buildPieSvg(7, 8, FILLED_ALT_COLOR),
      options: ["Picture A", "Picture B", "They are equal", "Not enough information"],
      answer: "Picture B",
      difficulty: 5,
      visualSummary: "Picture A shows 5/6 shaded. Picture B shows 7/8 shaded.",
    }),
    createStripQuestion({
      question: "Which fraction in simplest form matches the strip?",
      numerator: 10,
      denominator: 16,
      options: ["5/8", "3/4", "2/3", "7/8"],
      answer: "5/8",
      difficulty: 5,
      visualSummary: "A strip is split into 16 equal parts and 10 are shaded.",
    }),
    {
      question: "What is 7/8 of 32?",
      options: ["24", "26", "28", "30"],
      answer: "28",
      difficulty: 5,
    },
    {
      question: "What is 2/3 + 1/6?",
      options: ["3/6", "4/6", "5/6", "1"],
      answer: "5/6",
      difficulty: 5,
    },
    createSetQuestion({
      question: "Which fraction in simplest form matches the colored counters?",
      coloredCount: 15,
      totalCount: 20,
      options: ["1/2", "2/3", "3/4", "4/5"],
      answer: "3/4",
      difficulty: 5,
      visualSummary: "15 of 20 counters are colored.",
    }),
    {
      question: "Which fraction is closest to 1 whole?",
      options: ["5/6", "7/10", "11/12", "3/4"],
      answer: "11/12",
      difficulty: 5,
    },
    {
      question: "What is 5/6 - 1/4?",
      options: ["7/12", "2/3", "3/4", "1/2"],
      answer: "7/12",
      difficulty: 6,
    },
    createSetQuestion({
      question: "Which fraction in simplest form matches the colored counters?",
      coloredCount: 18,
      totalCount: 24,
      options: ["2/3", "3/4", "4/5", "5/6"],
      answer: "3/4",
      difficulty: 6,
      visualSummary: "18 of 24 counters are colored.",
    }),
    {
      question: "What is 1 1/2 + 2/3?",
      options: ["1 5/6", "2 1/6", "2 1/3", "2 2/3"],
      answer: "2 1/6",
      difficulty: 7,
    },
    {
      question: "What is 3/4 x 2/3?",
      options: ["1/2", "2/5", "5/7", "7/12"],
      answer: "1/2",
      difficulty: 7,
    },
  ];
})();

function fractionsClampDifficulty(value) {
  const difficulty = Number(value);
  if (!Number.isInteger(difficulty) || difficulty < 1) {
    return 1;
  }

  return Math.min(7, difficulty);
}

function fractionsRandomChoice(values) {
  if (typeof randomChoice === "function") {
    return randomChoice(values);
  }

  return values[Math.floor(Math.random() * values.length)];
}

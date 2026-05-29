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

  function uniqueStrings(values) {
    return Array.from(new Set(values.map((value) => String(value))));
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

  function createPlainQuestion({
    question,
    options,
    answer,
    difficulty,
    displayText = "",
    extraText = "",
    visualHtml = "",
    visualSummary = "",
  }) {
    const normalizedOptions = uniqueStrings(options);
    const normalizedAnswer = String(answer);

    if (!String(question || "").trim()) {
      throw new Error("Fractions question is missing question text.");
    }

    if (normalizedOptions.length !== 4 || !normalizedOptions.includes(normalizedAnswer)) {
      throw new Error(`Fractions question must have exactly 4 unique options including the answer: ${question}`);
    }

    return {
      question: String(question),
      options: normalizedOptions,
      answer: normalizedAnswer,
      difficulty: fractionsClampDifficulty(difficulty),
      displayText: String(displayText || ""),
      extraText: String(extraText || ""),
      visualHtml: String(visualHtml || ""),
      visualSummary: String(visualSummary || ""),
    };
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
    return createPlainQuestion({
      question,
      options,
      answer,
      difficulty,
      visualHtml: buildSingleVisualHtml(title, label, buildPieSvg(numerator, denominator, color)),
      visualSummary:
        visualSummary ||
        `A circle is split into ${denominator} equal parts and ${numerator} parts are shaded.`,
    });
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
    return createPlainQuestion({
      question,
      options,
      answer,
      difficulty,
      visualHtml: buildSingleVisualHtml(title, label, buildStripSvg(numerator, denominator, color)),
      visualSummary:
        visualSummary ||
        `A strip is split into ${denominator} equal parts and ${numerator} parts are shaded.`,
    });
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
    return createPlainQuestion({
      question,
      options,
      answer,
      difficulty,
      visualHtml: buildSingleVisualHtml(title, label, buildSetSvg(coloredCount, totalCount, color)),
      visualSummary:
        visualSummary ||
        `${coloredCount} of ${totalCount} counters are colored.`,
    });
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
    return createPlainQuestion({
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
    });
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
    return createPlainQuestion({
      question: `Which is ${comparisonWord}: ${leftFraction} or ${rightFraction}?`,
      options: [leftFraction, rightFraction, equalOption, fallbackOption],
      answer,
      difficulty,
    });
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
          question: "What fraction of the pizza is shaded?",
          numerator: 3,
          denominator: 4,
          options: ["1/4", "2/4", "3/4", "4/4"],
          answer: "3/4",
          difficulty: 1,
          title: "Pizza slices",
          label: "Pizza",
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
      () =>
        createDirectFractionComparisonQuestion({
          comparisonWord: "greater",
          leftFraction: "2/3",
          rightFraction: "2/6",
          answer: "2/3",
          difficulty: 2,
          fallbackOption: "Neither",
        }),
      () =>
        createPlainQuestion({
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
      () =>
        createPlainQuestion({
          question: "What is 3/4 of 12?",
          options: ["6", "8", "9", "10"],
          answer: "9",
          difficulty: 3,
        }),
      () =>
        createPlainQuestion({
          question: "What is 1/2 + 1/4?",
          options: ["2/4", "3/4", "1", "1/8"],
          answer: "3/4",
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
      () =>
        createPlainQuestion({
          question: "Which decimal is equal to 3/4?",
          options: ["0.25", "0.5", "0.75", "1.25"],
          answer: "0.75",
          difficulty: 4,
        }),
      () =>
        createDirectFractionComparisonQuestion({
          comparisonWord: "larger",
          leftFraction: "5/6",
          rightFraction: "3/4",
          answer: "5/6",
          difficulty: 4,
        }),
      () =>
        createPlainQuestion({
          question:
            "Lina used 3/4 cup of yogurt and then added 1/4 cup more. How much yogurt is that altogether?",
          options: ["3/4 cup", "1 cup", "1 1/4 cups", "1 1/2 cups"],
          answer: "1 cup",
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
      () =>
        createPlainQuestion({
          question: "What is 7/8 of 32?",
          options: ["24", "26", "28", "30"],
          answer: "28",
          difficulty: 5,
        }),
      () =>
        createPlainQuestion({
          question: "What is 2/3 + 1/6?",
          options: ["3/6", "4/6", "5/6", "1"],
          answer: "5/6",
          difficulty: 5,
        }),
    ],
    6: [
      () =>
        createPlainQuestion({
          question: "What is 5/6 - 1/4?",
          options: ["7/12", "2/3", "3/4", "1/2"],
          answer: "7/12",
          difficulty: 6,
        }),
      () =>
        createPlainQuestion({
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
      () =>
        createPlainQuestion({
          question: "A bottle is 2/5 full. After adding 1/10 more, how full is it?",
          options: ["1/2", "3/10", "2/15", "3/5"],
          answer: "1/2",
          difficulty: 6,
        }),
    ],
    7: [
      () =>
        createPlainQuestion({
          question: "What is 1 1/2 + 2/3?",
          options: ["1 5/6", "2 1/6", "2 1/3", "2 2/3"],
          answer: "2 1/6",
          difficulty: 7,
        }),
      () =>
        createPlainQuestion({
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
      () =>
        createPlainQuestion({
          question: "What is 4 divided by 1/2?",
          options: ["2", "4", "6", "8"],
          answer: "8",
          difficulty: 7,
        }),
    ],
    8: [
      () =>
        createPlainQuestion({
          question: "What is 2 1/4 - 5/6?",
          options: ["1 1/12", "1 5/12", "1 7/12", "2 1/12"],
          answer: "1 5/12",
          difficulty: 8,
        }),
      () =>
        createPlainQuestion({
          question: "What is 1/3 divided by 2?",
          options: ["1/6", "2/3", "1/5", "3/2"],
          answer: "1/6",
          difficulty: 8,
        }),
      () =>
        createPlainQuestion({
          question: "A recipe uses 3/4 cup of oil for 1 batch. How much oil is needed for 2 1/2 batches?",
          options: ["1 1/2 cups", "1 7/8 cups", "2 cups", "2 1/4 cups"],
          answer: "1 7/8 cups",
          difficulty: 8,
        }),
      () =>
        createPlainQuestion({
          question: "Which is equal to 62.5%?",
          options: ["5/8", "3/5", "2/3", "7/10"],
          answer: "5/8",
          difficulty: 8,
        }),
    ],
    9: [
      () =>
        createPlainQuestion({
          question: "A garden has 3/5 vegetables. Of the vegetables, 1/3 are carrots. What fraction of the garden is carrots?",
          options: ["1/5", "2/5", "3/8", "4/15"],
          answer: "1/5",
          difficulty: 9,
        }),
      () =>
        createPlainQuestion({
          question: "What is 3 1/3 x 1 1/5?",
          options: ["3", "4", "4 1/2", "5"],
          answer: "4",
          difficulty: 9,
        }),
      () =>
        createPlainQuestion({
          question: "Which expression has the same value as 7/8 - 1/3?",
          options: ["21/24 - 8/24", "7/24 - 1/24", "14/16 - 1/6", "8/9 - 3/9"],
          answer: "21/24 - 8/24",
          difficulty: 9,
        }),
      () =>
        createPlainQuestion({
          question: "After spending 2/5 of his money, Ben has 36 shekels left. How much money did he start with?",
          options: ["48 shekels", "54 shekels", "60 shekels", "90 shekels"],
          answer: "60 shekels",
          difficulty: 9,
        }),
    ],
    10: [
      () =>
        createPlainQuestion({
          question: "A tank is 3/4 full. Then 2/3 of the water is used. What fraction of the full tank is left?",
          options: ["1/4", "1/3", "1/2", "5/12"],
          answer: "1/4",
          difficulty: 10,
        }),
      () =>
        createPlainQuestion({
          question: "What is (5/6 - 1/4) divided by 7/12?",
          options: ["1", "7/12", "12/7", "5/7"],
          answer: "1",
          difficulty: 10,
        }),
      () =>
        createPlainQuestion({
          question: "A price is reduced by 1/5, then the new price is reduced by 1/4. What fraction of the original price remains?",
          options: ["3/5", "11/20", "1/2", "2/5"],
          answer: "3/5",
          difficulty: 10,
        }),
      () =>
        createPlainQuestion({
          question: "Which fraction is halfway between 2/3 and 5/6?",
          options: ["3/4", "7/9", "11/15", "5/7"],
          answer: "3/4",
          difficulty: 10,
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
    // Level 1: name simple shaded fractions and find simple halves.
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
    createPlainQuestion({
      question: "What is 1/2 of 4?",
      options: ["1", "2", "3", "4"],
      answer: "2",
      difficulty: 1,
    }),
    createPlainQuestion({
      question: "What is 1/2 of 6?",
      options: ["2", "3", "4", "5"],
      answer: "3",
      difficulty: 1,
    }),
    createStripQuestion({
      question: "What fraction of the strip is shaded?",
      numerator: 3,
      denominator: 4,
      options: ["1/4", "2/4", "3/4", "4/4"],
      answer: "3/4",
      difficulty: 1,
    }),
    createPlainQuestion({
      question: "A sandwich is cut into 2 equal pieces. You eat 1 piece. What fraction did you eat?",
      options: ["1/2", "1/3", "2/3", "2/2"],
      answer: "1/2",
      difficulty: 1,
    }),

    // Level 2: numerator and denominator, same-denominator comparison, simple unit fractions of amounts.
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
    createPlainQuestion({
      question: "Which fraction is equal to 3/6?",
      options: ["1/3", "1/2", "2/3", "3/4"],
      answer: "1/2",
      difficulty: 2,
    }),
    createPlainQuestion({
      question: "What is 1/4 of 12?",
      options: ["2", "3", "4", "6"],
      answer: "3",
      difficulty: 2,
    }),
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
    createPlainQuestion({
      question: "In the fraction 5/8, what does the 8 tell you?",
      options: ["There are 8 equal parts in all", "5 parts are shaded", "There are 8 whole pizzas", "The answer is 8"],
      answer: "There are 8 equal parts in all",
      difficulty: 2,
    }),
    createPlainQuestion({
      question: "What is 1/3 of 15?",
      options: ["3", "5", "10", "12"],
      answer: "5",
      difficulty: 2,
    }),

    // Level 3: simplify common equivalents, add easy fractions, compare using models and benchmarks.
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
    createPlainQuestion({
      question: "What is 3/4 of 12?",
      options: ["6", "8", "9", "10"],
      answer: "9",
      difficulty: 3,
    }),
    createPlainQuestion({
      question: "What is 1/2 + 1/4?",
      options: ["2/4", "3/4", "1", "1/8"],
      answer: "3/4",
      difficulty: 3,
    }),
    createSetQuestion({
      question: "Which fraction in simplest form matches the colored counters?",
      coloredCount: 9,
      totalCount: 12,
      options: ["1/2", "2/3", "3/4", "5/6"],
      answer: "3/4",
      difficulty: 3,
      visualSummary: "9 of 12 counters are colored.",
    }),
    createPlainQuestion({
      question: "Which fraction is closer to 1 whole?",
      options: ["3/8", "5/8", "7/8", "1/8"],
      answer: "7/8",
      difficulty: 3,
    }),
    createPlainQuestion({
      question: "Which fraction is equivalent to 2/3?",
      options: ["3/4", "4/6", "6/8", "2/5"],
      answer: "4/6",
      difficulty: 3,
    }),
    createPlainQuestion({
      question: "What is 5/6 - 2/6?",
      options: ["1/6", "2/6", "3/6", "7/6"],
      answer: "3/6",
      difficulty: 3,
    }),

    // Level 4: simplify larger fractions, decimals to tenths, and common-denominator word problems.
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
    createPlainQuestion({
      question: "What is 2/5 of 20?",
      options: ["6", "8", "10", "12"],
      answer: "8",
      difficulty: 4,
    }),
    createSetQuestion({
      question: "Which fraction in simplest form matches the colored counters?",
      coloredCount: 9,
      totalCount: 15,
      options: ["2/5", "3/5", "4/5", "9/10"],
      answer: "3/5",
      difficulty: 4,
      visualSummary: "9 of 15 counters are colored.",
    }),
    createPlainQuestion({
      question:
        "Lina used 3/4 cup of yogurt and then added 1/4 cup more. How much yogurt is that altogether?",
      options: ["3/4 cup", "1 cup", "1 1/4 cups", "1 1/2 cups"],
      answer: "1 cup",
      difficulty: 4,
    }),
    createPlainQuestion({
      question: "Which fraction is equivalent to 0.25?",
      options: ["1/4", "1/3", "2/5", "3/5"],
      answer: "1/4",
      difficulty: 4,
    }),
    createPlainQuestion({
      question: "What is 4/5 - 1/5?",
      options: ["2/5", "3/5", "4/10", "5/5"],
      answer: "3/5",
      difficulty: 4,
    }),

    // Level 5: unlike denominators, improper fractions, mixed numbers, and stronger fraction-of-amount practice.
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
    createPlainQuestion({
      question: "What is 7/8 of 32?",
      options: ["24", "26", "28", "30"],
      answer: "28",
      difficulty: 5,
    }),
    createPlainQuestion({
      question: "What is 2/3 + 1/6?",
      options: ["3/6", "4/6", "5/6", "1"],
      answer: "5/6",
      difficulty: 5,
    }),
    createSetQuestion({
      question: "Which fraction in simplest form matches the colored counters?",
      coloredCount: 15,
      totalCount: 20,
      options: ["1/2", "2/3", "3/4", "4/5"],
      answer: "3/4",
      difficulty: 5,
      visualSummary: "15 of 20 counters are colored.",
    }),
    createPlainQuestion({
      question: "Which fraction is closest to 1 whole?",
      options: ["5/6", "7/10", "11/12", "3/4"],
      answer: "11/12",
      difficulty: 5,
    }),
    createPlainQuestion({
      question: "Which mixed number equals 9/4?",
      options: ["1 1/4", "2 1/4", "2 3/4", "3 1/4"],
      answer: "2 1/4",
      difficulty: 5,
    }),
    createPlainQuestion({
      question: "A trail is 3/8 km to the pond and 1/4 km more to the bridge. How far is that altogether?",
      options: ["1/2 km", "5/8 km", "3/4 km", "7/8 km"],
      answer: "5/8 km",
      difficulty: 5,
    }),

    // Level 6: subtract unlike denominators, decimals, percents, and mixed-number basics.
    createPlainQuestion({
      question: "What is 5/6 - 1/4?",
      options: ["7/12", "2/3", "3/4", "1/2"],
      answer: "7/12",
      difficulty: 6,
    }),
    createSetQuestion({
      question: "Which fraction in simplest form matches the colored counters?",
      coloredCount: 18,
      totalCount: 24,
      options: ["2/3", "3/4", "4/5", "5/6"],
      answer: "3/4",
      difficulty: 6,
      visualSummary: "18 of 24 counters are colored.",
    }),
    createPlainQuestion({
      question: "Which fraction is equal to 0.375?",
      options: ["3/8", "5/8", "3/4", "7/10"],
      answer: "3/8",
      difficulty: 6,
    }),
    createPlainQuestion({
      question: "Which percent is equal to 3/5?",
      options: ["30%", "40%", "60%", "75%"],
      answer: "60%",
      difficulty: 6,
    }),
    createPlainQuestion({
      question: "What is 1 3/4 - 1/2?",
      options: ["1", "1 1/4", "1 1/2", "2 1/4"],
      answer: "1 1/4",
      difficulty: 6,
    }),
    createPlainQuestion({
      question: "A jug is 7/10 full. You pour out 1/5 of the jug. How full is it now?",
      options: ["1/2", "3/5", "7/15", "9/10"],
      answer: "1/2",
      difficulty: 6,
    }),
    createDirectFractionComparisonQuestion({
      comparisonWord: "smaller",
      leftFraction: "4/9",
      rightFraction: "5/12",
      answer: "5/12",
      difficulty: 6,
      fallbackOption: "Neither",
    }),
    createPlainQuestion({
      question: "What is 11/6 as a mixed number?",
      options: ["1 1/6", "1 5/6", "2 1/6", "5 1/6"],
      answer: "1 5/6",
      difficulty: 6,
    }),

    // Level 7: mixed-number arithmetic, multiplying fractions, dividing by unit fractions.
    createPlainQuestion({
      question: "What is 1 1/2 + 2/3?",
      options: ["1 5/6", "2 1/6", "2 1/3", "2 2/3"],
      answer: "2 1/6",
      difficulty: 7,
    }),
    createPlainQuestion({
      question: "What is 3/4 x 2/3?",
      options: ["1/2", "2/5", "5/7", "7/12"],
      answer: "1/2",
      difficulty: 7,
    }),
    createComparisonQuestion({
      question: "Which picture shows the larger fraction?",
      leftVisualHtml: buildStripSvg(11, 12, FILLED_COLOR),
      rightVisualHtml: buildStripSvg(9, 10, FILLED_ALT_COLOR),
      options: ["Picture A", "Picture B", "They are equal", "Not enough information"],
      answer: "Picture A",
      difficulty: 7,
      visualSummary: "Picture A shows 11/12 shaded. Picture B shows 9/10 shaded.",
    }),
    createPlainQuestion({
      question: "What is 4 divided by 1/2?",
      options: ["2", "4", "6", "8"],
      answer: "8",
      difficulty: 7,
    }),
    createPlainQuestion({
      question: "A board is 2 1/2 meters long. You cut off 3/4 meter. How much is left?",
      options: ["1 1/4 meters", "1 3/4 meters", "2 1/4 meters", "3 1/4 meters"],
      answer: "1 3/4 meters",
      difficulty: 7,
    }),
    createPlainQuestion({
      question: "What is 5/8 x 16?",
      options: ["6", "8", "10", "12"],
      answer: "10",
      difficulty: 7,
    }),
    createPlainQuestion({
      question: "Which fraction is the best estimate for 49/100?",
      options: ["0", "1/4", "1/2", "1"],
      answer: "1/2",
      difficulty: 7,
    }),
    createPlainQuestion({
      question: "What is 2/3 of 3/4?",
      options: ["1/2", "5/7", "6/7", "8/9"],
      answer: "1/2",
      difficulty: 7,
    }),

    // Level 8: scaling recipes, fraction division, percent equivalents, and multi-step mixed numbers.
    createPlainQuestion({
      question: "What is 2 1/4 - 5/6?",
      options: ["1 1/12", "1 5/12", "1 7/12", "2 1/12"],
      answer: "1 5/12",
      difficulty: 8,
    }),
    createPlainQuestion({
      question: "What is 1/3 divided by 2?",
      options: ["1/6", "2/3", "1/5", "3/2"],
      answer: "1/6",
      difficulty: 8,
    }),
    createPlainQuestion({
      question: "A recipe uses 3/4 cup of oil for 1 batch. How much oil is needed for 2 1/2 batches?",
      options: ["1 1/2 cups", "1 7/8 cups", "2 cups", "2 1/4 cups"],
      answer: "1 7/8 cups",
      difficulty: 8,
    }),
    createPlainQuestion({
      question: "Which is equal to 62.5%?",
      options: ["5/8", "3/5", "2/3", "7/10"],
      answer: "5/8",
      difficulty: 8,
    }),
    createPlainQuestion({
      question: "What is 3/5 divided by 1/10?",
      options: ["3", "6", "10", "15"],
      answer: "6",
      difficulty: 8,
    }),
    createPlainQuestion({
      question: "Noga read 2/3 of a book on Monday and 1/6 on Tuesday. What fraction of the book is unread?",
      options: ["1/6", "1/3", "1/2", "5/6"],
      answer: "1/6",
      difficulty: 8,
    }),
    createPlainQuestion({
      question: "Which is the simplest form of 42/56?",
      options: ["2/3", "3/4", "4/5", "6/7"],
      answer: "3/4",
      difficulty: 8,
    }),
    createPlainQuestion({
      question: "A ribbon is 5/6 meter long. Each bow uses 1/12 meter. How many bows can be made?",
      options: ["5", "8", "10", "12"],
      answer: "10",
      difficulty: 8,
    }),

    // Level 9: compound fraction-of-fraction, reverse fraction problems, and error analysis.
    createPlainQuestion({
      question: "A garden has 3/5 vegetables. Of the vegetables, 1/3 are carrots. What fraction of the garden is carrots?",
      options: ["1/5", "2/5", "3/8", "4/15"],
      answer: "1/5",
      difficulty: 9,
    }),
    createPlainQuestion({
      question: "What is 3 1/3 x 1 1/5?",
      options: ["3", "4", "4 1/2", "5"],
      answer: "4",
      difficulty: 9,
    }),
    createPlainQuestion({
      question: "Which expression has the same value as 7/8 - 1/3?",
      options: ["21/24 - 8/24", "7/24 - 1/24", "14/16 - 1/6", "8/9 - 3/9"],
      answer: "21/24 - 8/24",
      difficulty: 9,
    }),
    createPlainQuestion({
      question: "After spending 2/5 of his money, Ben has 36 shekels left. How much money did he start with?",
      options: ["48 shekels", "54 shekels", "60 shekels", "90 shekels"],
      answer: "60 shekels",
      difficulty: 9,
    }),
    createPlainQuestion({
      question: "A class finished 3/8 of a project in the morning and 1/3 in the afternoon. What fraction is finished?",
      options: ["5/11", "7/12", "17/24", "3/11"],
      answer: "17/24",
      difficulty: 9,
    }),
    createPlainQuestion({
      question: "If 3/4 of a number is 21, what is the number?",
      options: ["24", "27", "28", "32"],
      answer: "28",
      difficulty: 9,
    }),
    createPlainQuestion({
      question: "A student says 1/2 + 1/3 = 2/5. What is the correct sum?",
      options: ["2/5", "3/5", "5/6", "1/6"],
      answer: "5/6",
      difficulty: 9,
    }),
    createPlainQuestion({
      question: "Which value is greatest?",
      options: ["7/9", "5/6", "13/18", "3/4"],
      answer: "5/6",
      difficulty: 9,
    }),

    // Level 10: challenging multi-step fraction reasoning and rational expressions for strong learners.
    createPlainQuestion({
      question: "A tank is 3/4 full. Then 2/3 of the water is used. What fraction of the full tank is left?",
      options: ["1/4", "1/3", "1/2", "5/12"],
      answer: "1/4",
      difficulty: 10,
    }),
    createPlainQuestion({
      question: "What is (5/6 - 1/4) divided by 7/12?",
      options: ["1", "7/12", "12/7", "5/7"],
      answer: "1",
      difficulty: 10,
    }),
    createPlainQuestion({
      question: "A price is reduced by 1/5, then the new price is reduced by 1/4. What fraction of the original price remains?",
      options: ["3/5", "11/20", "1/2", "2/5"],
      answer: "3/5",
      difficulty: 10,
    }),
    createPlainQuestion({
      question: "Which fraction is halfway between 2/3 and 5/6?",
      options: ["3/4", "7/9", "11/15", "5/7"],
      answer: "3/4",
      difficulty: 10,
    }),
    createPlainQuestion({
      question: "A runner completes 2/5 of a race, rests, then completes 1/2 of what was left. What fraction of the whole race is still left?",
      options: ["1/5", "3/10", "2/5", "1/2"],
      answer: "3/10",
      difficulty: 10,
    }),
    createPlainQuestion({
      question: "What is 4/5 of the difference between 2 1/2 and 1 1/4?",
      options: ["3/4", "1", "1 1/4", "2"],
      answer: "1",
      difficulty: 10,
    }),
    createPlainQuestion({
      question: "A jar has red and blue beads. 2/3 are red. After 12 red beads are removed, 1/2 are red. How many blue beads are in the jar?",
      options: ["12", "18", "24", "36"],
      answer: "24",
      difficulty: 10,
    }),
    createPlainQuestion({
      question: "Which expression is equal to 1/2 of 3/4 plus 1/8?",
      options: ["1/2", "3/8", "5/8", "7/8"],
      answer: "1/2",
      difficulty: 10,
    }),
  ];
})();

function fractionsClampDifficulty(value) {
  const difficulty = Number(value);
  if (!Number.isInteger(difficulty) || difficulty < 1) {
    return 1;
  }

  return Math.min(10, difficulty);
}

function fractionsRandomChoice(values) {
  if (typeof randomChoice === "function") {
    return randomChoice(values);
  }

  return values[Math.floor(Math.random() * values.length)];
}
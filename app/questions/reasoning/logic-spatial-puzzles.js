(() => {
  const COLORS = {
    blue: "#2f80ed",
    green: "#2f9e44",
    ink: "#17324a",
    orange: "#f08c00",
    purple: "#8e44ad",
    red: "#d94848",
    yellow: "#f2c94c",
  };

  function clampDifficulty(value) {
    const difficulty = Number.parseInt(value, 10);
    return Number.isFinite(difficulty) ? Math.max(1, Math.min(10, difficulty)) : 3;
  }

  function randomChoice(values) {
    return values[Math.floor(Math.random() * values.length)];
  }

  function shuffle(values) {
    const copy = [...values];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function makeOption(label, html, summary, isAnswer = false) {
    return { label, html, summary, isAnswer };
  }

  function makeOptionInteractiveEntry({
    difficulty,
    question,
    prompt,
    displayText = "",
    visualHtml = "",
    visualSummary = "",
    reviewText = "",
    choices,
    answerSummary,
    type = "option-puzzle",
  }) {
    const labeledChoices = shuffle(choices).map((choice, index) => ({
      ...choice,
      label: ["A", "B", "C", "D"][index],
    }));
    const answerIndex = labeledChoices.findIndex((choice) => choice.isAnswer);
    if (answerIndex < 0 || labeledChoices.length !== 4) {
      return null;
    }

    return {
      mode: "interactive",
      question,
      difficulty: clampDifficulty(difficulty),
      answer: answerSummary || labeledChoices[answerIndex].summary || labeledChoices[answerIndex].label,
      answerLabel: answerSummary || labeledChoices[answerIndex].summary || labeledChoices[answerIndex].label,
      displayText,
      visualHtml,
      visualSummary,
      reviewText,
      interactive: {
        type,
        layout: "option-select",
        prompt: prompt || question,
        choices: labeledChoices.map(({ label, html, summary }) => ({ label, html, summary })),
        answerIndexes: [answerIndex],
        minSelected: 1,
        maxSelected: 1,
        checkLabel: "Check Answer",
        selectedLabel: "Selected",
      },
    };
  }

  function iconHtml(kind, color, label = "") {
    const fill = COLORS[color] || color || COLORS.blue;
    const text = label
      ? `<text x="50" y="58" text-anchor="middle" font-size="24" font-weight="900" fill="${COLORS.ink}">${escapeHtml(label)}</text>`
      : "";
    const shape =
      kind === "square"
        ? `<rect x="25" y="25" width="50" height="50" rx="8" fill="${fill}"></rect>`
        : kind === "triangle"
          ? `<path d="M50 18 L82 76 H18 Z" fill="${fill}"></path>`
          : kind === "star"
            ? `<path d="M50 14 L60 38 L86 38 L65 54 L73 80 L50 64 L27 80 L35 54 L14 38 L40 38 Z" fill="${fill}"></path>`
            : `<circle cx="50" cy="50" r="30" fill="${fill}"></circle>`;
    return `<svg class="puzzle-icon-svg" viewBox="0 0 100 100" role="img" aria-label="${escapeHtml(label || `${color} ${kind}`)}">${shape}${text}</svg>`;
  }

  function patternVisual(items) {
    const cells = items
      .map((item, index) => {
        const x = 18 + index * 54;
        const content = item.blank
          ? `<rect x="${x}" y="22" width="38" height="38" rx="8" fill="#fff" stroke="${COLORS.ink}" stroke-width="3" stroke-dasharray="5 4"></rect><text x="${x + 19}" y="48" text-anchor="middle" font-size="20" font-weight="900" fill="${COLORS.ink}">?</text>`
          : item.text
            ? `<rect x="${x}" y="22" width="38" height="38" rx="8" fill="#fff7df" stroke="${COLORS.ink}" stroke-width="2"></rect><text x="${x + 19}" y="48" text-anchor="middle" font-size="18" font-weight="900" fill="${COLORS.ink}">${escapeHtml(item.text)}</text>`
            : item.kind === "square"
              ? `<rect x="${x + 5}" y="27" width="28" height="28" rx="5" fill="${COLORS[item.color]}"></rect>`
              : item.kind === "triangle"
                ? `<path d="M${x + 19} 24 L${x + 36} 58 H${x + 2} Z" fill="${COLORS[item.color]}"></path>`
                : `<circle cx="${x + 19}" cy="41" r="17" fill="${COLORS[item.color]}"></circle>`;
        return `<g>${content}</g>`;
      })
      .join("");
    return `<svg class="puzzle-pattern-svg" viewBox="0 0 ${Math.max(330, 36 + items.length * 54)} 82" role="img" aria-label="Pattern with missing next item">${cells}</svg>`;
  }

  function makePatternMachineEntry(difficulty) {
    const level = clampDifficulty(difficulty);
    const patterns = [
      {
        max: 3,
        question: "Pattern Machine: what comes next?",
        rule: "The colors alternate red, blue, red, blue.",
        items: [
          { kind: "circle", color: "red" },
          { kind: "circle", color: "blue" },
          { kind: "circle", color: "red" },
          { kind: "circle", color: "blue" },
          { blank: true },
        ],
        choices: [
          makeOption("", iconHtml("circle", "red"), "Red circle", true),
          makeOption("", iconHtml("circle", "blue"), "Blue circle"),
          makeOption("", iconHtml("circle", "green"), "Green circle"),
          makeOption("", iconHtml("circle", "yellow"), "Yellow circle"),
        ],
        answer: "Red circle",
      },
      {
        min: 2,
        max: 5,
        question: "Pattern Machine: extend the shape pattern.",
        rule: "The shapes repeat circle, square, triangle.",
        items: [
          { kind: "circle", color: "green" },
          { kind: "square", color: "purple" },
          { kind: "triangle", color: "orange" },
          { kind: "circle", color: "green" },
          { kind: "square", color: "purple" },
          { blank: true },
        ],
        choices: [
          makeOption("", iconHtml("triangle", "orange"), "Orange triangle", true),
          makeOption("", iconHtml("circle", "green"), "Green circle"),
          makeOption("", iconHtml("square", "purple"), "Purple square"),
          makeOption("", iconHtml("star", "yellow"), "Yellow star"),
        ],
        answer: "Orange triangle",
      },
      {
        min: 4,
        max: 7,
        question: "Pattern Machine: find the machine rule and output.",
        rule: "Each number is doubled.",
        items: [{ text: "2" }, { text: "4" }, { text: "8" }, { text: "16" }, { blank: true }],
        choices: [
          makeOption("", iconHtml("square", "#ffffff", "32"), "32", true),
          makeOption("", iconHtml("square", "#ffffff", "24"), "24"),
          makeOption("", iconHtml("square", "#ffffff", "18"), "18"),
          makeOption("", iconHtml("square", "#ffffff", "30"), "30"),
        ],
        answer: "32",
      },
      {
        min: 4,
        max: 8,
        question: "Pattern Machine: extend the color-shape cycle.",
        rule: "The pattern repeats blue square, yellow star, green circle.",
        items: [
          { kind: "square", color: "blue" },
          { kind: "star", color: "yellow" },
          { kind: "circle", color: "green" },
          { kind: "square", color: "blue" },
          { kind: "star", color: "yellow" },
          { blank: true },
        ],
        choices: [
          makeOption("", iconHtml("circle", "green"), "Green circle", true),
          makeOption("", iconHtml("square", "blue"), "Blue square"),
          makeOption("", iconHtml("star", "yellow"), "Yellow star"),
          makeOption("", iconHtml("triangle", "orange"), "Orange triangle"),
        ],
        answer: "Green circle",
      },
      {
        min: 6,
        question: "Pattern Machine: extend the growing pattern.",
        rule: "The jumps are +2, +3, +4, so the next jump is +5.",
        items: [{ text: "1" }, { text: "3" }, { text: "6" }, { text: "10" }, { blank: true }],
        choices: [
          makeOption("", iconHtml("square", "#ffffff", "15"), "15", true),
          makeOption("", iconHtml("square", "#ffffff", "14"), "14"),
          makeOption("", iconHtml("square", "#ffffff", "16"), "16"),
          makeOption("", iconHtml("square", "#ffffff", "20"), "20"),
        ],
        answer: "15",
      },
      {
        min: 8,
        question: "Pattern Machine: use alternating operations.",
        rule: "The operations alternate +3, x2, +3, x2, so the next result is 34.",
        items: [{ text: "4" }, { text: "7" }, { text: "14" }, { text: "17" }, { blank: true }],
        choices: [
          makeOption("", iconHtml("square", "#ffffff", "34"), "34", true),
          makeOption("", iconHtml("square", "#ffffff", "20"), "20"),
          makeOption("", iconHtml("square", "#ffffff", "31"), "31"),
          makeOption("", iconHtml("square", "#ffffff", "24"), "24"),
        ],
        answer: "34",
      },
    ];
    const pattern = randomChoice(patterns.filter((item) => level >= (item.min || 1) && level <= (item.max || 10)));
    return makeOptionInteractiveEntry({
      difficulty: level,
      question: pattern.question,
      prompt: "Tap the item that the machine should make next.",
      visualHtml: `<div class="logic-puzzle-card"><div class="logic-puzzle-title">Pattern Machine</div>${patternVisual(pattern.items)}</div>`,
      visualSummary: `${pattern.question} ${pattern.rule}`,
      reviewText: `${pattern.rule} The next item is ${pattern.answer}.`,
      choices: pattern.choices,
      answerSummary: pattern.answer,
      type: "pattern-machine",
    });
  }

  function rotationShapeHtml(variant, rotation = 0, label = "") {
    const paths = {
      arrow: `<path d="M20 43 H58 V25 L84 50 L58 75 V57 H20 Z" fill="${COLORS.blue}"></path>`,
      notch: `<path d="M24 24 H76 V44 H56 V76 H24 Z" fill="${COLORS.green}"></path>`,
      mirrorNotch: `<path d="M24 24 H76 V76 H44 V44 H24 Z" fill="${COLORS.green}"></path>`,
      tall: `<path d="M38 18 H62 V62 H80 V82 H20 V62 H38 Z" fill="${COLORS.purple}"></path>`,
    };
    return `<svg class="puzzle-rotation-svg" viewBox="0 0 100 100" role="img" aria-label="${escapeHtml(label || "shape")}"><g transform="rotate(${rotation} 50 50)">${paths[variant] || paths.arrow}</g></svg>`;
  }

  function makeRotationMatchEntry(difficulty) {
    const level = clampDifficulty(difficulty);
    const turn = level < 6 ? 90 : randomChoice([90, 180, 270]);
    const source = level < 5 ? "arrow" : "notch";
    const correctRotation = turn;
    const choices = [
      makeOption("", rotationShapeHtml(source, correctRotation, "same shape rotated"), `${turn} degree turn`, true),
      makeOption("", rotationShapeHtml(source, (correctRotation + 90) % 360, "wrong rotation"), "Different turn"),
      makeOption("", rotationShapeHtml(source === "arrow" ? "tall" : "mirrorNotch", correctRotation, "different shape"), "Different shape"),
      makeOption("", rotationShapeHtml(source, (correctRotation + 180) % 360, "opposite turn"), "Opposite turn"),
    ];
    return makeOptionInteractiveEntry({
      difficulty: level,
      question: `Shape Rotation Match: which choice shows the same shape after a ${turn} degree clockwise turn?`,
      prompt: "Tap the matching rotated shape.",
      visualHtml: `<div class="logic-puzzle-card"><div class="logic-puzzle-title">Start Shape</div>${rotationShapeHtml(source, 0, "start shape")}</div>`,
      visualSummary: `A shape must be rotated ${turn} degrees clockwise.`,
      reviewText: `The correct choice keeps the same shape and only turns it ${turn} degrees clockwise.`,
      choices,
      answerSummary: `${turn} degree clockwise rotation`,
      type: "shape-rotation-match",
    });
  }

  function makePathProgrammingEntry(difficulty) {
    const level = clampDifficulty(difficulty);
    const routes = [
      {
        max: 4,
        rows: 4,
        cols: 4,
        start: { row: 3, col: 0 },
        treasure: { row: 1, col: 2 },
        sequence: ["N", "N", "E", "E"],
        clue: "Use any shortest path to reach the treasure.",
      },
      {
        min: 3,
        max: 7,
        rows: 5,
        cols: 5,
        start: { row: 4, col: 1 },
        treasure: { row: 1, col: 4 },
        sequence: ["N", "N", "N", "E", "E", "E"],
        clue: "Use any shortest path to reach the treasure.",
      },
      {
        min: 4,
        max: 8,
        rows: 5,
        cols: 5,
        start: { row: 2, col: 0 },
        treasure: { row: 0, col: 3 },
        sequence: ["E", "E", "E", "N", "N"],
        clue: "Use any shortest path to reach the treasure.",
      },
      {
        min: 6,
        rows: 5,
        cols: 5,
        start: { row: 0, col: 0 },
        treasure: { row: 4, col: 3 },
        sequence: ["E", "E", "E", "S", "S", "S", "S"],
        clue: "Use any shortest path to reach the treasure.",
      },
      {
        min: 7,
        rows: 6,
        cols: 6,
        start: { row: 5, col: 5 },
        treasure: { row: 2, col: 1 },
        sequence: ["W", "W", "W", "W", "N", "N", "N"],
        clue: "Use any shortest path to reach the treasure.",
      },
    ];
    const route = randomChoice(routes.filter((item) => level >= (item.min || 1) && level <= (item.max || 10)));
    const answer = route.sequence.join(" ");
    return {
      mode: "interactive",
      question: "Path Programming: build commands that move the robot to the treasure.",
      answer,
      answerLabel: answer,
      difficulty: level,
      extraText: `${route.clue}\nS = start. R = robot. T = treasure.`,
      reviewText: `One shortest command sequence is ${answer}.`,
      visualSummary: `A grid path from start to treasure using ${answer}.`,
      interactive: {
        type: "path-programming",
        layout: "command-sequence",
        validationMode: "shortest-path-to-treasure",
        requireShortestPath: true,
        prompt: "Tap N, E, S, and W in order.",
        commands: ["N", "E", "S", "W"],
        answerSequence: route.sequence,
        answerIndexes: [0],
        maxCommands: route.sequence.length + 2,
        grid: {
          rows: route.rows,
          cols: route.cols,
          start: route.start,
          treasure: route.treasure,
        },
      },
    };
  }

  function makeOddOneOutEntry(difficulty) {
    const level = clampDifficulty(difficulty);
    const cases = [
      {
        max: 4,
        question: "Odd One Out, But Why?",
        items: ["Circle", "Square", "Triangle", "Carrot"],
        answerItem: 3,
        reasons: ["It is food, not a shape.", "It has four sides.", "It is round.", "It is a color."],
        answerReason: 0,
      },
      {
        min: 3,
        max: 7,
        question: "Odd One Out, But Why?",
        items: ["2", "4", "8", "9"],
        answerItem: 3,
        reasons: ["It is odd; the others are even.", "It is the smallest.", "It is a shape.", "It is blue."],
        answerReason: 0,
      },
      {
        min: 5,
        question: "Odd One Out, But Why?",
        items: ["Translate", "Rotate", "Reflect", "Measure"],
        answerItem: 3,
        reasons: [
          "It is not a rigid motion of a shape.",
          "It turns a shape around a point.",
          "It makes a mirror image.",
          "It slides a shape without turning.",
        ],
        answerReason: 0,
      },
      {
        min: 6,
        max: 10,
        question: "Odd One Out, But Why?",
        items: ["North", "East", "Diagonal", "South"],
        answerItem: 2,
        reasons: [
          "It is not one of the four main compass directions.",
          "It points toward the bottom of a map.",
          "It is the opposite of west.",
          "It means no movement.",
        ],
        answerReason: 0,
      },
      {
        min: 8,
        max: 10,
        question: "Odd One Out, But Why?",
        items: ["Always", "Never", "Certain", "Estimate"],
        answerItem: 3,
        reasons: [
          "It is an approximate judgment, not a certainty word.",
          "It means the event must happen every time.",
          "It names a compass direction.",
          "It is a shape transformation.",
        ],
        answerReason: 0,
      },
    ];
    const picked = randomChoice(cases.filter((item) => level >= (item.min || 1) && level <= (item.max || 10)));
    return {
      mode: "interactive",
      question: picked.question,
      answer: `${picked.items[picked.answerItem]} because ${picked.reasons[picked.answerReason]}`,
      answerLabel: `${picked.items[picked.answerItem]} because ${picked.reasons[picked.answerReason]}`,
      difficulty: level,
      reviewText: `${picked.items[picked.answerItem]} is the odd one out because ${picked.reasons[picked.answerReason]}`,
      visualSummary: `Choose the item that does not belong, then choose the reason.`,
      interactive: {
        type: "odd-one-out-why",
        layout: "paired-select",
        prompt: "First choose the odd item. Then choose the reason.",
        itemHeading: "Odd item",
        reasonHeading: "Reason",
        items: picked.items.map((item) => ({ label: item, summary: item })),
        reasons: picked.reasons.map((reason, index) => ({ label: String(index + 1), summary: reason })),
        answerIndexes: [picked.answerItem],
        answerItemIndex: picked.answerItem,
        answerReasonIndex: picked.answerReason,
        checkLabel: "Check Answer",
      },
    };
  }

  function boardHtml(cells, label) {
    const cellHtml = cells
      .map((cell, index) => {
        const row = Math.floor(index / 2);
        const col = index % 2;
        const x = 20 + col * 74;
        const y = 20 + row * 74;
        return `<g transform="translate(${x} ${y})"><rect width="62" height="62" rx="8" fill="#ffffff" stroke="#bfd6e8" stroke-width="2"></rect><g transform="translate(6 6) scale(0.5)">${iconHtml(cell.kind, cell.color).replace(/<svg[^>]*>|<\/svg>/g, "")}</g></g>`;
      })
      .join("");
    return `<svg class="constraint-board-svg" viewBox="0 0 168 168" role="img" aria-label="${escapeHtml(label)}">${cellHtml}</svg>`;
  }

  function makeConstraintPuzzleEntry(difficulty) {
    const level = clampDifficulty(difficulty);
    const answerCells = [
      { kind: "triangle", color: "green" },
      { kind: "circle", color: "red" },
      { kind: "square", color: "blue" },
      { kind: "star", color: "yellow" },
    ];
    const choices = [
      makeOption("", boardHtml(answerCells, "green top left, red top right, blue bottom left, yellow bottom right"), "Green top-left; red above yellow; blue below green", true),
      makeOption("", boardHtml([answerCells[1], answerCells[0], answerCells[2], answerCells[3]], "red top left, green top right, blue bottom left, yellow bottom right"), "Red top-left"),
      makeOption("", boardHtml([answerCells[0], answerCells[1], answerCells[3], answerCells[2]], "green top left, red top right, yellow bottom left, blue bottom right"), "Blue bottom-right"),
      makeOption("", boardHtml([answerCells[2], answerCells[1], answerCells[0], answerCells[3]], "blue top left, red top right, green bottom left, yellow bottom right"), "Blue top-left"),
    ];
    const clueText = level < 6
      ? "Green triangle is in the top-left. Blue square is below the green triangle. Yellow star is below the red circle."
      : "Green triangle is in the top-left. Blue square is below the green triangle. Yellow star is below the red circle. Red circle is not edge-next to blue square.";
    return makeOptionInteractiveEntry({
      difficulty: level,
      question: "Constraint Puzzle: which board follows all the clues?",
      prompt: "Tap the board that satisfies every clue.",
      displayText: clueText,
      visualSummary: clueText,
      reviewText: `The correct board has green triangle top-left, red circle top-right, blue square bottom-left, and yellow star bottom-right.`,
      choices,
      answerSummary: "Green top-left; red top-right; blue bottom-left; yellow bottom-right",
      type: "constraint-puzzle",
    });
  }

  const LOGIC_FACTORIES = [makePatternMachineEntry, makeOddOneOutEntry, makeConstraintPuzzleEntry, makePathProgrammingEntry];
  const SPATIAL_FACTORIES = [makeRotationMatchEntry, makeConstraintPuzzleEntry, makePathProgrammingEntry, makePatternMachineEntry];

  function createLogicSpatialLogicPuzzleEntry(difficulty) {
    const level = clampDifficulty(difficulty);
    return randomChoice(LOGIC_FACTORIES)(level);
  }

  function createLogicSpatialReasoningPuzzleEntry(difficulty) {
    const level = clampDifficulty(difficulty);
    return randomChoice(SPATIAL_FACTORIES)(level);
  }

  function blendFactory(primaryFactory, puzzleFactory, puzzleShare) {
    return (difficulty) => {
      const usePuzzleFirst = Math.random() < puzzleShare;
      const first = usePuzzleFirst ? puzzleFactory : primaryFactory;
      const second = usePuzzleFirst ? primaryFactory : puzzleFactory;
      return first?.(difficulty) || second?.(difficulty) || null;
    };
  }

  const registry = globalThis.HomeworkQuestions;
  const logicModule = registry?.get?.("logic");
  if (logicModule) {
    registry.replace({
      ...logicModule,
      generatedEntryFactory: blendFactory(logicModule.generatedEntryFactory, createLogicSpatialLogicPuzzleEntry, 0.35),
    });
  }

  const spatialModule = registry?.get?.("spatial-reasoning");
  if (spatialModule) {
    registry.replace({
      ...spatialModule,
      generatedEntryFactory: blendFactory(
        spatialModule.generatedEntryFactory,
        createLogicSpatialReasoningPuzzleEntry,
        0.45
      ),
    });
  }

  globalThis.LOGIC_SPATIAL_PUZZLE_COVERAGE = {
    patternMachine: makePatternMachineEntry,
    shapeRotationMatch: makeRotationMatchEntry,
    pathProgramming: makePathProgrammingEntry,
    oddOneOutWhy: makeOddOneOutEntry,
    constraintPuzzle: makeConstraintPuzzleEntry,
  };
  globalThis.createLogicSpatialLogicPuzzleEntry = createLogicSpatialLogicPuzzleEntry;
  globalThis.createLogicSpatialReasoningPuzzleEntry = createLogicSpatialReasoningPuzzleEntry;
})();

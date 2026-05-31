(() => {
  const {
    entry,
    numberOptions,
    pickGeneratedEntry,
    randomChoice,
    randomInt,
    renderLineGraph,
    renderPieTable,
    renderTable,
  } = globalThis.HomeworkExtended;

  function createLineGraphQuestion(difficulty) {
    const context = randomChoice([
      { title: "Practice minutes", labels: ["Mon", "Tue", "Wed", "Thu"], unit: "minutes" },
      { title: "Books read", labels: ["Week 1", "Week 2", "Week 3", "Week 4"], unit: "books" },
      { title: "Plant height", labels: ["Day 1", "Day 3", "Day 5", "Day 7"], unit: "cm" },
    ]);
    const start = randomInt(3, 10);
    const values = context.labels.map((label, index) => ({
      label,
      value: start + randomInt(index, index * 5 + 8),
    }));
    const askChange = difficulty >= 4 && Math.random() < 0.45;
    const first = values[0];
    const last = values[values.length - 1];
    if (askChange) {
      const answer = last.value - first.value;
      return entry({
        topic: "data-line-graphs",
        difficulty,
        question: `How much did the value increase from first to last?`,
        visualHtml: renderLineGraph(context.title, values),
        visualSummary: values.map((point) => `${point.label}: ${point.value}`).join(", "),
        answer,
        options: numberOptions(answer, [-4, -2, -1, 1, 2, 4], 0),
      });
    }
    const answer = values.reduce((best, point) => (point.value > best.value ? point : best), values[0]).label;
    return entry({
      topic: "data-line-graphs",
      difficulty,
      question: `Which label has the highest value?`,
      visualHtml: renderLineGraph(context.title, values),
      visualSummary: values.map((point) => `${point.label}: ${point.value} ${context.unit}`).join(", "),
      answer,
      options: values.map((point) => point.label),
    });
  }

  function createPieChartQuestion(difficulty) {
    const contexts = [
      { title: "After-school time", parts: ["Reading", "Math", "Art", "Sports"] },
      { title: "Class pet votes", parts: ["Fish", "Hamster", "Rabbit", "Lizard"] },
      { title: "Snack choices", parts: ["Apple", "Yogurt", "Crackers", "Carrots"] },
    ];
    const context = randomChoice(contexts);
    const rawValues = [randomInt(2, 5), randomInt(5, 9), randomInt(1, 4), randomInt(3, 7)];
    const parts = context.parts.map((label, index) => ({ label, value: rawValues[index] + index }));
    const askLargest = Math.random() < 0.65;
    const sorted = [...parts].sort((left, right) => right.value - left.value);
    return entry({
      topic: "data-pie-charts",
      difficulty,
      question: askLargest ? "Which category takes the largest share?" : "Which category takes the smallest share?",
      visualHtml: renderPieTable(context.title, parts),
      visualSummary: parts.map((part) => `${part.label}: ${part.value}`).join(", "),
      answer: askLargest ? sorted[0].label : sorted[sorted.length - 1].label,
      options: parts.map((part) => part.label),
    });
  }

  function createScatterplotQuestion(difficulty) {
    const contexts = [
      {
        title: "Study time and score",
        x: "Hours",
        y: "Score",
        rows: [[1, 62], [2, 70], [3, 78], [4, 85]],
        answer: "Scores tend to rise as study time rises",
      },
      {
        title: "Temperature and coat sales",
        x: "Temperature",
        y: "Coats sold",
        rows: [[35, 18], [45, 13], [55, 8], [65, 4]],
        answer: "Coat sales tend to fall as temperature rises",
      },
      {
        title: "Shoe size and quiz score",
        x: "Shoe size",
        y: "Score",
        rows: [[2, 81], [4, 77], [5, 86], [7, 79]],
        answer: "There is no clear pattern",
      },
    ];
    const picked = randomChoice(contexts);
    return entry({
      topic: "data-scatterplots",
      difficulty,
      question: "What pattern does the scatterplot data show?",
      visualHtml: renderTable(picked.title, [[picked.x, picked.y], ...picked.rows]),
      visualSummary: picked.rows.map((row) => `${row[0]}: ${row[1]}`).join(", "),
      answer: picked.answer,
      options: [
        picked.answer,
        "The second value always stays exactly the same",
        "There is no data to compare",
        picked.answer.includes("rise") ? "Scores tend to fall as study time rises" : "The values always rise together",
      ],
    });
  }

  function createTwoWayTableQuestion(difficulty) {
    const topLeft = randomInt(4, 12);
    const topRight = randomInt(3, 10);
    const bottomLeft = randomInt(2, 9);
    const bottomRight = randomInt(2, 9);
    const ask = randomChoice(["cell", "row", "column"]);
    if (ask === "row") {
      const answer = topLeft + topRight;
      return entry({
        topic: "data-two-way-tables",
        difficulty,
        question: "How many students took the bus in all?",
        visualHtml: renderTable("Class survey", [["", "Soccer", "Art"], ["Bus", topLeft, topRight], ["Walk", bottomLeft, bottomRight]]),
        answer,
        options: numberOptions(answer, [-topRight, -topLeft, -1, 1, bottomLeft, bottomRight], 0),
      });
    }
    if (ask === "column") {
      const answer = topLeft + bottomLeft;
      return entry({
        topic: "data-two-way-tables",
        difficulty,
        question: "How many students chose soccer in all?",
        visualHtml: renderTable("Class survey", [["", "Soccer", "Art"], ["Bus", topLeft, topRight], ["Walk", bottomLeft, bottomRight]]),
        answer,
        options: numberOptions(answer, [-bottomLeft, -topLeft, -1, 1, topRight, bottomRight], 0),
      });
    }
    return entry({
      topic: "data-two-way-tables",
      difficulty,
      question: "How many students chose bus and soccer?",
      visualHtml: renderTable("Class survey", [["", "Soccer", "Art"], ["Bus", topLeft, topRight], ["Walk", bottomLeft, bottomRight]]),
      answer: topLeft,
      options: numberOptions(topLeft, [-3, -2, -1, 1, 2, 3], 0),
    });
  }

  function createMisleadingGraphQuestion(difficulty) {
    const examples = [
      {
        displayText: "A bar graph comparing 48 votes and 50 votes starts its y-axis at 45 instead of 0.",
        answer: "The small difference can look much larger than it is",
      },
      {
        displayText: "A pictograph says one icon equals 5 students, but the last icon is half-size and not explained.",
        answer: "The symbol scale is unclear",
      },
      {
        displayText: "A graph title says 'Best snack,' but it only surveyed one small class.",
        answer: "The title makes a broad claim from a small sample",
      },
    ];
    const picked = randomChoice(examples);
    return entry({
      topic: "data-misleading-graphs",
      difficulty,
      question: "Why could this graph be misleading?",
      displayText: picked.displayText,
      answer: picked.answer,
      options: [
        picked.answer,
        "Graphs are never useful",
        "The title must always be one word",
        "Numbers cannot be shown in graphs",
      ],
    });
  }

  function createSamplingBiasQuestion(difficulty) {
    const examples = [
      {
        question: "Which sample is least biased for asking what the whole school wants for lunch?",
        answer: "Ask randomly chosen students from every grade",
        wrong: ["Ask only the pizza club", "Ask only one best friend", "Ask only students already in the taco line"],
      },
      {
        question: "Which sample is best for learning how families get to school?",
        answer: "Ask a random mix of families from all grades",
        wrong: ["Ask only bus riders", "Ask only walkers", "Ask only the teacher's family"],
      },
      {
        question: "Which survey plan is fairest for choosing a school event?",
        answer: "Give every class a similar chance to answer",
        wrong: ["Ask only students already at chess club", "Ask only the loudest table", "Ask only people who agree with you"],
      },
    ];
    const picked = randomChoice(examples);
    return entry({
      topic: "data-sampling-bias",
      difficulty,
      question: picked.question,
      answer: picked.answer,
      options: [picked.answer, ...picked.wrong],
    });
  }

  function createOutlierAverageQuestion(difficulty) {
    const middle = randomInt(7, 12);
    const values = [middle - 1, middle, middle, middle + 1];
    const outlier = difficulty >= 6 ? middle + randomInt(25, 45) : middle + randomInt(12, 20);
    const mean = Math.round((values.reduce((sum, value) => sum + value, 0) + outlier) / 5);
    const median = middle;
    const askMean = difficulty >= 5 && Math.random() < 0.45;
    return entry({
      topic: "data-averages-outliers",
      difficulty,
      question: askMean ? "Which statement about the mean is true?" : "Which statement best describes the average with an outlier?",
      displayText: `Scores: ${[...values, outlier].join(", ")}`,
      answer: askMean ? `The mean is about ${mean}, pulled upward by ${outlier}` : `The median ${median} better describes the typical score`,
      options: askMean
        ? [`The mean is about ${mean}, pulled upward by ${outlier}`, `The mean is exactly ${median}`, "The outlier has no effect on the mean", "The mean must be the largest number"]
        : [`The median ${median} better describes the typical score`, `The median is ${outlier}`, "There is no outlier", "All scores are close together"],
    });
  }

  const dataGenerators = [
    createLineGraphQuestion,
    createPieChartQuestion,
    createScatterplotQuestion,
    createTwoWayTableQuestion,
    createMisleadingGraphQuestion,
    createSamplingBiasQuestion,
    createOutlierAverageQuestion,
  ];

  globalThis.createExtendedDataGeneratedEntry = (difficulty) =>
    pickGeneratedEntry(dataGenerators, difficulty);
})();

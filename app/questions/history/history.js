(() => {
  const clampDifficulty = (value) => {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) ? Math.max(1, Math.min(10, parsed)) : 3;
  };

  const randomChoice = (values) => values[Math.floor(Math.random() * values.length)];

  function shuffle(values) {
    const copy = [...values];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
  }

  function slugify(value) {
    return String(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "item";
  }

  function choiceEntry({ difficulty, question, answer, options, extraText = "", reviewText = "" }) {
    const level = clampDifficulty(difficulty);
    return {
      type: "history-choice",
      difficulty: level,
      mode: "choice",
      question,
      answer,
      options: shuffle(Array.from(new Set([answer, ...options]))).slice(0, 4),
      extraText,
      reviewText,
      contentId: globalThis.HomeworkQuestionUtils?.stableContentId(
        "history",
        `${level}|${question}|${answer}`
      ),
      skill: level <= 4 ? "history.chronology" : "history.evidence-and-interpretation",
      gradeMin: level,
      gradeMax: level,
      explanation: reviewText || extraText || answer,
      reviewStatus: "author-curated",
    };
  }

  const HISTORY_QUESTIONS = [
    choiceEntry({
      difficulty: 1,
      question: "A town was founded in 800 CE and a library opened there in 850 CE. Which happened first?",
      answer: "The town was founded",
      options: ["The library opened", "They happened together", "The dates do not tell us"],
      extraText: "On a CE timeline, smaller dates come first.",
    }),
    choiceEntry({
      difficulty: 2,
      question: "A journey began in 1200 CE and ended in 1208 CE. How long did it last?",
      answer: "8 years",
      options: ["7 years", "9 years", "18 years"],
    }),
    choiceEntry({
      difficulty: 2,
      question: "The State of Israel was established in 1948. Which decade was that?",
      answer: "The 1940s",
      options: ["The 1930s", "The 1950s", "The 1900s"],
      extraText: "The 1940s run from 1940 through 1949.",
    }),
    choiceEntry({
      difficulty: 3,
      question: "Jerusalem was captured by Babylon in about 586 BCE. Which century BCE is 586 BCE in?",
      answer: "The 6th century BCE",
      options: ["The 5th century BCE", "The 58th century BCE", "The 7th century BCE"],
      extraText: "The 6th century BCE runs from 600 BCE down to 501 BCE.",
    }),
    choiceEntry({
      difficulty: 3,
      question: "The Second Temple was destroyed in 70 CE. Which century CE is 70 CE in?",
      answer: "The 1st century CE",
      options: ["The 7th century CE", "The 2nd century CE", "The 1st century BCE"],
      extraText: "The 1st century CE runs from 1 CE through 100 CE.",
    }),
    choiceEntry({
      difficulty: 4,
      question: "Which list is ordered from earliest to latest?",
      answer: "1200 BCE, 500 BCE, 200 CE, 900 CE",
      options: [
        "500 BCE, 1200 BCE, 200 CE, 900 CE",
        "200 CE, 500 BCE, 1200 BCE, 900 CE",
        "1200 BCE, 200 CE, 500 BCE, 900 CE",
      ],
      extraText: "BCE dates count down toward 1 BCE; CE dates then count upward. There is no year zero.",
    }),
    choiceEntry({
      difficulty: 4,
      question: "Constantinople fell to the Ottoman Empire in 1453 CE. Which millennium CE is that in?",
      answer: "The 2nd millennium CE",
      options: ["The 1st millennium CE", "The 14th millennium CE", "The 15th millennium CE"],
      extraText: "The 2nd millennium CE runs from 1001 through 2000 CE.",
    }),
    choiceEntry({
      difficulty: 5,
      question: "A drought reduced a region's harvest. Which is the most likely immediate consequence?",
      answer: "Less food reached the markets",
      options: [
        "A new language developed centuries later",
        "Every neighboring empire ended at once",
        "The drought changed an event that happened earlier",
      ],
      extraText: "An immediate consequence follows soon after a cause.",
    }),
    choiceEntry({
      difficulty: 5,
      question: "After a port opened, trade increased quickly. Over many decades, the city became larger and more diverse. Which was the long-term consequence?",
      answer: "The city became larger and more diverse",
      options: ["The port opened", "Trade increased quickly", "Ships arrived on the first day"],
    }),
    choiceEntry({
      difficulty: 6,
      question: "A historian wants to know what a merchant personally saw in Jerusalem in 1850. Which source is most direct?",
      answer: "The merchant's diary written in 1850",
      options: [
        "A textbook published in 2020",
        "A modern novel set in 1850",
        "A museum poster with no listed sources",
      ],
      extraText: "A primary source was created by someone at the time being studied.",
    }),
    choiceEntry({
      difficulty: 7,
      question: "Two witnesses describe the same protest differently. What should a careful historian do first?",
      answer: "Compare their positions, purposes, and other evidence",
      options: [
        "Choose the longer account automatically",
        "Assume both accounts are useless",
        "Combine the accounts into one quotation",
      ],
      extraText: "Perspective affects what a source notices; it does not automatically make the source worthless.",
    }),
    choiceEntry({
      difficulty: 8,
      question: "Historian A says a road was built mainly for trade. Historian B says it was built mainly to move soldiers. Both cite evidence. What is the best conclusion?",
      answer: "Different interpretations can be tested against the evidence",
      options: [
        "Only the first interpretation can ever be historical",
        "Evidence has no role when historians disagree",
        "Both claims must be equally strong",
      ],
    }),
    choiceEntry({
      difficulty: 8,
      question: "Event A affected one village for a month. Event B changed laws across a region for 80 years. Using reach and duration only, which is more significant?",
      answer: "Event B",
      options: ["Event A", "They must be equally significant", "Neither can be studied"],
      extraText: "A significance judgment should name its criteria and use evidence.",
    }),
    choiceEntry({
      difficulty: 9,
      question: "A ceremony is still held every year, but the event had few consequences outside one town. What does this evidence show most clearly?",
      answer: "Strong remembrance, but limited reach",
      options: [
        "Strong reach and no remembrance",
        "Long duration of the original event",
        "That significance can never be discussed",
      ],
    }),
    choiceEntry({
      difficulty: 10,
      question: "Why might a newly discovered letter change a historical interpretation?",
      answer: "It may add relevant evidence that earlier historians did not have",
      options: [
        "Newer sources are always more truthful",
        "One letter automatically proves every detail",
        "Historical interpretations never use evidence",
      ],
    }),
  ];

  function ordinal(number) {
    const mod100 = number % 100;
    if (mod100 >= 11 && mod100 <= 13) return `${number}th`;
    return `${number}${number % 10 === 1 ? "st" : number % 10 === 2 ? "nd" : number % 10 === 3 ? "rd" : "th"}`;
  }

  function buildCenturyQuestion(level) {
    const useBce = level >= 3 && Math.random() < 0.45;
    const year = Math.floor(Math.random() * (level >= 7 ? 2400 : 1900)) + 1;
    const century = Math.ceil(year / 100);
    const era = useBce ? "BCE" : "CE";
    const answer = `The ${ordinal(century)} century ${era}`;
    const nearbyCenturies = century === 1
      ? [century + 1, century + 2]
      : [century - 1, century + 1];
    return choiceEntry({
      difficulty: level,
      question: `Which century contains ${year} ${era}?`,
      answer,
      options: [
        `The ${ordinal(nearbyCenturies[0])} century ${era}`,
        `The ${ordinal(nearbyCenturies[1])} century ${era}`,
        `The ${ordinal(century + 10)} century ${era}`,
      ],
      extraText: useBce
        ? `BCE centuries count backward: the ${ordinal(century)} century BCE runs from ${century * 100} BCE down to ${(century - 1) * 100 + 1} BCE.`
        : `The ${ordinal(century)} century CE runs from ${(century - 1) * 100 + 1} through ${century * 100} CE.`,
    });
  }

  function buildDurationQuestion(level) {
    const start = Math.floor(Math.random() * 1200) + 100;
    const duration = Math.floor(Math.random() * (level >= 6 ? 90 : 30)) + 5;
    const end = start + duration;
    return choiceEntry({
      difficulty: level,
      question: `A historical period began in ${start} CE and ended in ${end} CE. How many years did it last?`,
      answer: `${duration} years`,
      options: [`${duration - 1} years`, `${duration + 1} years`, `${duration + 10} years`],
    });
  }

  function buildClosestDateQuestion(level) {
    const anchor = Math.floor(Math.random() * 1000) + 800;
    const distances = shuffle([12, 35, 80, 140]);
    const dates = distances.map((distance, index) => anchor + (index % 2 === 0 ? distance : -distance));
    const closest = dates.reduce((best, date) =>
      Math.abs(date - anchor) < Math.abs(best - anchor) ? date : best
    );
    return choiceEntry({
      difficulty: level,
      question: `Which date is closest to ${anchor} CE?`,
      answer: `${closest} CE`,
      options: dates.filter((date) => date !== closest).map((date) => `${date} CE`),
      extraText: "Find the number of years between the anchor date and each option.",
    });
  }

  function buildBceCeDurationQuestion(level) {
    const bce = Math.floor(Math.random() * 20) + 2;
    const ce = Math.floor(Math.random() * 20) + 2;
    const duration = bce + ce - 1;
    return choiceEntry({
      difficulty: level,
      question: `How many years passed from ${bce} BCE to ${ce} CE?`,
      answer: `${duration} years`,
      options: [`${duration - 1} years`, `${duration + 1} years`, `${bce + ce + 1} years`],
      extraText: `There is no year zero: ${bce} + ${ce} - 1 = ${duration}.`,
    });
  }

  function buildHistoricalThinkingQuestion(level) {
    const candidates = HISTORY_QUESTIONS.filter(
      (entry) => entry.difficulty >= Math.max(5, level - 2) && entry.difficulty <= level
    );
    const fallback = HISTORY_QUESTIONS.filter((entry) => entry.difficulty <= level);
    const source = randomChoice(candidates.length ? candidates : fallback);
    return { ...source, difficulty: level, options: shuffle(source.options) };
  }

  function createHistoryGeneratedEntry(difficulty) {
    const level = clampDifficulty(difficulty);
    const factories = [
      () => buildDurationQuestion(level),
      () => buildCenturyQuestion(level),
      () => buildClosestDateQuestion(level),
    ];
    if (level >= 6) factories.push(() => buildHistoricalThinkingQuestion(level));
    if (level >= 8) factories.push(() => buildBceCeDurationQuestion(level));
    const generated = randomChoice(factories)();
    return {
      ...generated,
      difficulty: level,
      gradeMin: level,
      gradeMax: level,
    };
  }

  const CIVILIZATION_LOCATIONS = [
    { name: "Ancient Israel", x: 58, y: 35 },
    { name: "Roman civilization", x: 48, y: 28 },
    { name: "Ancient Egypt", x: 53, y: 43 },
    { name: "Ancient Greece", x: 49, y: 31 },
    { name: "Mesopotamia", x: 61, y: 35 },
    { name: "Persian empires", x: 68, y: 44 },
    { name: "Ancient China", x: 80, y: 35 },
    { name: "Vikings", x: 49, y: 17 },
    { name: "Aboriginal Australian cultures", x: 84, y: 69 },
    { name: "Maya civilization", x: 20, y: 41 },
    { name: "Aztec Empire", x: 17, y: 33 },
    { name: "Inca Empire", x: 29, y: 64 },
    { name: "Mongol Empire", x: 70, y: 23 },
    { name: "Ottoman Empire", x: 57, y: 23 },
  ];
  const LOCATION_BY_NAME = new Map(CIVILIZATION_LOCATIONS.map((item) => [item.name, item]));
  const MAP_ROUNDS = [
    {
      minDifficulty: 1,
      names: ["Ancient Egypt", "Ancient China", "Maya civilization", "Aboriginal Australian cultures"],
    },
    {
      minDifficulty: 2,
      names: ["Ancient Israel", "Maya civilization", "Inca Empire", "Aboriginal Australian cultures"],
    },
    {
      minDifficulty: 3,
      names: ["Roman civilization", "Ancient China", "Aztec Empire", "Aboriginal Australian cultures"],
    },
    {
      minDifficulty: 4,
      names: ["Ancient Greece", "Aztec Empire", "Inca Empire", "Aboriginal Australian cultures"],
    },
    {
      minDifficulty: 5,
      names: ["Mesopotamia", "Aztec Empire", "Inca Empire", "Aboriginal Australian cultures"],
    },
    {
      minDifficulty: 6,
      names: ["Persian empires", "Vikings", "Maya civilization", "Inca Empire"],
    },
    {
      minDifficulty: 7,
      names: ["Ottoman Empire", "Aztec Empire", "Inca Empire", "Aboriginal Australian cultures"],
    },
    {
      minDifficulty: 7,
      names: ["Mongol Empire", "Maya civilization", "Inca Empire", "Aboriginal Australian cultures"],
    },
  ];

  function buildWorldMapHtml() {
    const source = globalThis.GEOGRAPHY_MAP_SVG_SOURCES?.asia;
    if (typeof source !== "string" || !source) return "";
    const style = `
      <style id="history-world-map-style">
        .landxx{fill:#b8d995 !important;stroke:#fff !important;stroke-width:1.2 !important}
        .oceanxx,#ocean{fill:#eaf6ff !important;stroke:#b9d8ec !important}
        .circlexx,.subxx,.noxx,.limitxx,.unxx{opacity:0 !important}
      </style>`;
    return source
      .replace(/<svg\b([^>]*)>/, (_match, attributes) => {
        const cleaned = attributes
          .replace(/\sviewBox="[^"]*"/, "")
          .replace(/\spreserveAspectRatio="[^"]*"/, "");
        return `<svg${cleaned} class="history-world-map-svg" viewBox="0 0 2754 1398" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Simple world map for locating historical civilizations">${style}`;
      });
  }

  function buildDragChoices(type, difficulty, values) {
    return shuffle(values).map((text, index) => ({
      id: `${type}-${difficulty}-${index}-${slugify(text)}`,
      text,
    }));
  }

  function createTargetsDrag({ difficulty, questionText, extraText = "", targets, answer, arrangement = "rows", mapHtml = "", startLabel = "", endLabel = "", showLabels = true }) {
    const type = "history-drag";
    return {
      type,
      difficulty,
      mode: "drag",
      questionText,
      displayText: "",
      extraText,
      extraHtml: "",
      visualHtml: "",
      visualSummary: questionText,
      dragLayout: "targets",
      dragTargetArrangement: arrangement,
      dragMapHtml: mapHtml,
      dragTargets: targets,
      dragChoices: buildDragChoices(type, difficulty, answer),
      dragAnswerTokens: answer,
      dragPlaceholderText: arrangement === "map" ? "Place name" : "Drop here",
      dragLineStartLabel: startLabel,
      dragLineEndLabel: endLabel,
      dragShowTargetLabels: showLabels,
      reviewText: extraText,
      answerValue: answer.join(" | "),
      answerLabel: targets.map((target, index) => `${target.reviewLabel || target.text || `Place ${index + 1}`}: ${answer[index]}`).join(" | "),
      isHebrew: false,
    };
  }

  function createMatchingDrag({ difficulty, questionText, extraText, pairs }) {
    const type = "history-drag";
    const answer = pairs.map((pair) => pair.answer);
    return {
      type,
      difficulty,
      mode: "drag",
      questionText,
      displayText: "",
      extraText,
      extraHtml: "",
      visualHtml: "",
      visualSummary: questionText,
      dragLayout: "matching",
      dragChoices: [],
      dragAnswerTokens: answer,
      matchLeftItems: pairs.map((pair, index) => ({ id: `${type}-cause-${index}`, text: pair.text })),
      matchRightItems: buildDragChoices(type, difficulty, answer),
      reviewText: pairs.map((pair) => `${pair.text} → ${pair.answer}`).join(" | "),
      answerValue: answer.join(" | "),
      answerLabel: pairs.map((pair) => `${pair.text}: ${pair.answer}`).join(" | "),
      isHebrew: false,
    };
  }

  function createBucketsDrag({ difficulty, questionText, extraText, buckets }) {
    const type = "history-drag";
    const answer = buckets.flatMap((bucket) => bucket.answers);
    return {
      type,
      difficulty,
      mode: "drag",
      questionText,
      displayText: "",
      extraText,
      extraHtml: "",
      visualHtml: "",
      visualSummary: questionText,
      dragLayout: "buckets",
      dragBucketColumns: buckets,
      dragChoices: buildDragChoices(type, difficulty, answer),
      dragAnswerTokens: answer,
      dragPlaceholderText: "Drop consequence",
      reviewText: buckets.map((bucket) => `${bucket.label}: ${bucket.answers.join(", ")}`).join(" | "),
      answerValue: answer.join(" | "),
      answerLabel: buckets.map((bucket) => `${bucket.label}: ${bucket.answers.join(", ")}`).join(" | "),
      isHebrew: false,
    };
  }

  function createCivilizationMapQuestion(level) {
    const eligibleRounds = MAP_ROUNDS.filter((round) => round.minDifficulty <= level);
    const round = randomChoice(eligibleRounds);
    const locations = round.names.map((name) => LOCATION_BY_NAME.get(name));
    return {
      ...createTargetsDrag({
        difficulty: level,
        questionText: "Civilizations Map: place each name near its historical homeland or heartland.",
        extraText: "Locations are broad and approximate, not modern borders. Drag a label, or tap a label and then tap its map spot.",
        arrangement: "map",
        mapHtml: buildWorldMapHtml(),
        targets: locations.map((location) => ({ x: location.x, y: location.y, reviewLabel: location.name })),
        answer: locations.map((location) => location.name),
      }),
      geographyMapVisualKind: "history-world",
    };
  }

  function createChronologyDragQuestion(level) {
    const timelines = [
      {
        minDifficulty: 1,
        events: ["Ancient Egypt: Great Pyramid built (c. 2560 BCE)", "Qin unifies China (221 BCE)", "Baghdad founded (762 CE)"],
      },
      {
        minDifficulty: 3,
        events: ["Babylon captures Jerusalem (586 BCE)", "Second Temple destroyed (70 CE)", "Ottomans capture Constantinople (1453 CE)", "State of Israel established (1948 CE)"],
      },
      {
        minDifficulty: 6,
        events: ["Athenian democracy develops (c. 508 BCE)", "Qin unifies China (221 BCE)", "Western Roman Empire ends (476 CE)", "Mansa Musa's pilgrimage (1324 CE)"],
      },
    ];
    const timeline = randomChoice(timelines.filter((item) => item.minDifficulty <= level));
    return createTargetsDrag({
      difficulty: level,
      questionText: "Timeline Builder: place the events from earliest to latest.",
      extraText: "Use the printed dates. Remember that BCE dates count down toward 1 BCE.",
      arrangement: "line",
      targets: timeline.events.map((event) => ({ reviewLabel: event })),
      answer: timeline.events,
      startLabel: "Earliest",
      endLabel: "Latest",
      showLabels: false,
    });
  }

  function createCauseChainQuestion(level) {
    const chains = [
      ["A long drought reduces harvests", "Food becomes scarce and prices rise", "Some families move to find food and work"],
      ["A ruler builds a safe road network", "Travel between cities becomes easier", "Trade and exchange grow over many years"],
      ["A port is blockaded during a war", "Ships cannot deliver their cargo", "Merchants develop different trade routes"],
      ["A new printing method lowers the cost of books", "More copies can be produced", "Reading and ideas spread to wider groups"],
    ];
    const chain = randomChoice(chains);
    return createTargetsDrag({
      difficulty: level,
      questionText: "Cause and Consequence Chain: build the sequence.",
      extraText: "Start with the cause, then place the immediate consequence, then the longer-term consequence.",
      arrangement: "line",
      targets: [
        { reviewLabel: "Cause" },
        { reviewLabel: "Immediate consequence" },
        { reviewLabel: "Longer-term consequence" },
      ],
      answer: chain,
      startLabel: "Cause",
      endLabel: "Longer term",
      showLabels: false,
    });
  }

  function createImmediateLongTermQuestion(level) {
    return createBucketsDrag({
      difficulty: level,
      questionText: "Immediate or Long-term? Sort the consequences of a new trade route.",
      extraText: "The route made travel between two regions faster and safer.",
      buckets: [
        { label: "Immediate consequences", answers: ["More merchants use the route", "Travel time falls"] },
        { label: "Long-term consequences", answers: ["Trading towns grow", "Languages and ideas spread"] },
      ],
    });
  }

  function createCauseMatchingQuestion(level) {
    const pairs = [
      { text: "River flooding leaves fertile soil", answer: "Farmers can grow more food" },
      { text: "An army closes a major road", answer: "Travel and trade slow down" },
      { text: "A ruler standardizes coins", answer: "Buying across the empire becomes easier" },
      { text: "Several years of poor harvests", answer: "Food prices rise" },
    ];
    const count = level >= 7 ? 4 : 3;
    return createMatchingDrag({
      difficulty: level,
      questionText: "Cause and Consequence: match each cause to its most direct consequence.",
      extraText: "Choose the link supported by the information on the cards.",
      pairs: shuffle(pairs).slice(0, count),
    });
  }

  function createSignificanceRankingQuestion(level) {
    const events = [
      "Event A: affected three regions for 200 years, changed trade and law, and is still commemorated",
      "Event B: affected 30 towns for 15 years, changed tax collection, and appears in local museums",
      "Event C: affected one village for one year, changed its market day, and survives in one diary",
    ];
    return createTargetsDrag({
      difficulty: level,
      questionText: "Historical Significance: rank the events using all four criteria.",
      extraText: "Compare reach, duration, consequences, and remembrance. Rank only from the evidence on the cards; other evidence could change the judgment.",
      arrangement: "rows",
      targets: [
        { text: "1 — Most significant", reviewLabel: "Most significant" },
        { text: "2 — Middle", reviewLabel: "Middle" },
        { text: "3 — Least significant", reviewLabel: "Least significant" },
      ],
      answer: events,
    });
  }

  function createHistoryGeneratedDragQuestion(difficulty) {
    const level = clampDifficulty(difficulty);
    const factories = [
      () => createChronologyDragQuestion(level),
      () => createCivilizationMapQuestion(level),
      () => createCauseChainQuestion(level),
    ];
    if (level >= 4) factories.push(() => createCauseMatchingQuestion(level));
    if (level >= 5) factories.push(() => createImmediateLongTermQuestion(level));
    if (level >= 7) factories.push(() => createSignificanceRankingQuestion(level));
    return randomChoice(factories)();
  }

  globalThis.HISTORY_QUESTIONS = HISTORY_QUESTIONS;
  globalThis.HISTORY_CIVILIZATION_LOCATIONS = CIVILIZATION_LOCATIONS;
  globalThis.createHistoryGeneratedEntry = createHistoryGeneratedEntry;
  globalThis.createHistoryGeneratedDragQuestion = createHistoryGeneratedDragQuestion;
  globalThis.renderHistoryWorldMapHtml = buildWorldMapHtml;

  globalThis.HomeworkQuestions?.register({
    id: "history",
    label: "History & Historical Thinking",
    getStaticQuestions: () => HISTORY_QUESTIONS,
    generatedEntryFactory: createHistoryGeneratedEntry,
    generatedShare: 0.82,
    supportsDrag: true,
  });
})();

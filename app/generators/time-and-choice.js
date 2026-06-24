function createGeneratedCategoryQuestion(category, difficulty) {
  const config = generatedChoiceCategoryConfigs[category];
  if (!config?.factory || Math.random() >= config.share) {
    return null;
  }

  try {
    const generatedEntry = config.factory(difficulty);
    if (generatedEntry?.mode === "drag") {
      return generatedEntry;
    }

    const normalizedEntry = normalizeChoiceBankEntry(generatedEntry, `${category}-choice`);
    return normalizedEntry ? createBankChoiceQuestion(normalizedEntry, `${category}-choice`) : null;
  } catch {
    return null;
  }
}

function createTimeChoiceQuestion(difficulty) {
  const level = normalizeSessionDifficulty(difficulty);
  const templates = [
    { minLevel: 1, weight: 5, build: createForwardElapsedTimeQuestion },
    { minLevel: 2, weight: 3, build: createTimeUntilQuestion },
    { minLevel: 3, weight: 3, build: createBackwardElapsedTimeQuestion },
    { minLevel: 5, weight: 2, build: createRolloverTimeQuestion },
    { minLevel: 3, weight: 3, build: createScheduleTimeQuestion },
    { minLevel: 5, weight: 3, build: createRoutineTimeQuestion },
    { minLevel: 1, maxLevel: 5, weight: 3, build: createClockWordingQuestion },
    { minLevel: 8, weight: 2, build: createTimeZoneQuestion },
  ];
  const choices = templates
    .filter((template) => level >= template.minLevel && (!template.maxLevel || level <= template.maxLevel))
    .flatMap((template) => Array.from({ length: template.weight }, () => template.build));

  return randomChoice(choices)(level);
}

function buildTimeChoiceQuestion({
  difficulty,
  questionText,
  answer,
  options,
  displayText = "",
  visualStartMinutes = null,
}) {
  const answerText = String(answer);
  const optionTexts = Array.from(new Set(options.map(String)));
  if (optionTexts.length !== 4 || !optionTexts.includes(answerText)) {
    throw new Error(`Time question must have exactly 4 unique choices: ${answerText}`);
  }

  const startLabel = Number.isFinite(visualStartMinutes) ? formatClockTime(visualStartMinutes) : "";
  return {
    type: "time-choice",
    difficulty,
    mode: "choice",
    questionText,
    displayText,
    extraText: "",
    reviewText: "",
    visualHtml: startLabel ? renderClockVisual(visualStartMinutes, startLabel) : "",
    visualSummary: startLabel ? `Clock shows ${startLabel}.` : "",
    options: shuffleArray(optionTexts),
    answerValue: answerText,
    answerLabel: answerText,
    isHebrew: false,
  };
}

function createForwardElapsedTimeQuestion(difficulty) {
  const config = getTimeLevelConfig(difficulty);
  const duration = randomChoice(config.forwardDurations);
  const startMinutes = pickTimeStartMinutes(difficulty, duration, { allowRollover: difficulty >= 7 });
  const answerMinutes = startMinutes + duration;
  const answer = formatClockTime(answerMinutes);
  const contexts = [
    `It's ${formatClockTime(startMinutes)}. In ${duration} minutes, what time will it be?`,
    `Maya starts reading at ${formatClockTime(startMinutes)} and reads for ${formatDuration(duration)}. What time does she finish?`,
    `The bus leaves at ${formatClockTime(startMinutes)}. It arrives ${formatDuration(duration)} later. What time does it arrive?`,
  ];

  return buildTimeChoiceQuestion({
    difficulty,
    questionText: randomChoice(contexts),
    answer,
    options: buildTimeOptions(answerMinutes, [startMinutes - duration, startMinutes + duration - 10, answerMinutes + 60, answerMinutes + 720]),
    visualStartMinutes: startMinutes,
  });
}

function createTimeUntilQuestion(difficulty) {
  const config = getTimeLevelConfig(difficulty);
  const duration = randomChoice(config.untilDurations);
  const startMinutes = pickTimeStartMinutes(difficulty, duration, { allowRollover: difficulty >= 8 });
  const endMinutes = startMinutes + duration;
  const event = randomChoice(["snack time", "the movie", "practice", "the train", "the class"]);
  const questionText =
    event === "snack time"
      ? `It is ${formatClockTime(startMinutes)}. Snack time is at ${formatClockTime(endMinutes)}. How long until snack time?`
      : `It is ${formatClockTime(startMinutes)}. ${capitalize(event)} starts at ${formatClockTime(endMinutes)}. How long until ${event} starts?`;

  return buildTimeChoiceQuestion({
    difficulty,
    questionText,
    answer: formatDuration(duration),
    options: buildDurationOptions(duration, [Math.abs(endMinutes - startMinutes - 60), duration + 10, duration - 10, duration + 30]),
    visualStartMinutes: startMinutes,
  });
}

function createBackwardElapsedTimeQuestion(difficulty) {
  const config = getTimeLevelConfig(difficulty);
  const duration = randomChoice(config.backwardDurations);
  const endMinutes = pickTimeEndMinutes(difficulty, duration);
  const startMinutes = endMinutes - duration;
  const contexts = [
    `A soccer practice ended at ${formatClockTime(endMinutes)}. It lasted ${formatDuration(duration)}. What time did it start?`,
    `A lesson ended at ${formatClockTime(endMinutes)}. It lasted ${formatDuration(duration)}. What time did it start?`,
    `A flight landed at ${formatClockTime(endMinutes)}. It lasted ${formatDuration(duration)}. What time did it take off?`,
  ];

  return buildTimeChoiceQuestion({
    difficulty,
    questionText: randomChoice(contexts),
    answer: formatClockTime(startMinutes),
    options: buildTimeOptions(startMinutes, [endMinutes + duration, endMinutes - duration + 10, startMinutes + 30, startMinutes + 720]),
    visualStartMinutes: endMinutes,
  });
}

function createRolloverTimeQuestion(difficulty) {
  const crossesMidnight = difficulty >= 7 && Math.random() < 0.55;
  const startMinutes = crossesMidnight
    ? 23 * 60 + randomChoice([35, 40, 45, 50, 55])
    : 11 * 60 + randomChoice([25, 30, 35, 40, 45, 50]);
  const duration = randomChoice(difficulty >= 7 ? [20, 25, 30, 35, 40, 45, 50] : [20, 25, 30, 35, 40]);
  const answerMinutes = startMinutes + duration;
  const questionText = crossesMidnight
    ? `It is ${formatClockTime(startMinutes)}. In ${duration} minutes, what time will it be?`
    : `It is ${formatClockTime(startMinutes)}. Lunch starts in ${duration} minutes. What time does lunch start?`;

  return buildTimeChoiceQuestion({
    difficulty,
    questionText,
    answer: formatClockTime(answerMinutes),
    options: buildTimeOptions(answerMinutes, [answerMinutes - 60, answerMinutes - 10, answerMinutes + 10, answerMinutes + 720]),
    visualStartMinutes: startMinutes,
  });
}

function createScheduleTimeQuestion(difficulty) {
  if (difficulty <= 4) {
    const firstTrain = randomInt(7, 8) * 60 + randomChoice([0, 5, 10, 15, 20]);
    const interval = randomChoice([20, 25, 30]);
    const trains = [0, 1, 2, 3].map((index) => firstTrain + interval * index);
    const arrival = trains[1] + randomChoice([1, 5, 10]);
    const nextTrain = trains.find((time) => time >= arrival) || trains[trains.length - 1];
    return buildTimeChoiceQuestion({
      difficulty,
      displayText: `Train schedule:\nA: ${formatClockTime(trains[0])}\nB: ${formatClockTime(trains[1])}\nC: ${formatClockTime(trains[2])}\nD: ${formatClockTime(trains[3])}`,
      questionText: `You arrive at the station at ${formatClockTime(arrival)}. What is the next train you can catch?`,
      answer: formatClockTime(nextTrain),
      options: buildTimeOptions(nextTrain, trains),
      visualStartMinutes: arrival,
    });
  }

  const classStart = 9 * 60 + randomChoice([0, 5, 10]);
  const mathLength = randomChoice([40, 45, 50]);
  const readingGap = randomChoice([5, 10]);
  const readingLength = randomChoice([35, 40, 45]);
  const breakLength = randomChoice([10, 15, 20]);
  const readingStart = classStart + mathLength + readingGap;
  const breakStart = readingStart + readingLength;
  const scienceStart = breakStart + breakLength;
  const scheduleText =
    `Class schedule:\nMath: ${formatClockRange(classStart, classStart + mathLength)}\n` +
    `Reading: ${formatClockRange(readingStart, breakStart)}\n` +
    `Break: ${formatClockRange(breakStart, scienceStart)}\n` +
    `Science: ${formatClockRange(scienceStart, scienceStart + 45)}`;

  if (difficulty >= 7 && Math.random() < 0.5) {
    const arrive = classStart + randomChoice([10, 15, 20]);
    const wait = scienceStart - arrive;
    return buildTimeChoiceQuestion({
      difficulty,
      displayText: scheduleText,
      questionText: `You arrive at ${formatClockTime(arrive)}. How long until Science starts?`,
      answer: formatDuration(wait),
      options: buildDurationOptions(wait, [wait - 15, wait - 10, wait + 10, wait + 20]),
      visualStartMinutes: arrive,
    });
  }

  return buildTimeChoiceQuestion({
    difficulty,
    displayText: scheduleText,
    questionText: "How long is the break?",
    answer: formatDuration(breakLength),
    options: buildDurationOptions(breakLength, [breakLength - 5, breakLength + 5, readingGap, mathLength]),
  });
}

function createRoutineTimeQuestion(difficulty) {
  const backward = difficulty >= 9 && Math.random() < 0.45;
  const steps = difficulty <= 6
    ? [randomChoice([15, 20, 25]), randomChoice([10, 15, 20])]
    : [randomChoice([15, 20, 25]), randomChoice([10, 15]), randomChoice([20, 25, 30])];
  const total = steps.reduce((sum, value) => sum + value, 0);

  if (backward) {
    const leaveTime = pickTimeEndMinutes(difficulty, total);
    const answerMinutes = leaveTime - total;
    return buildTimeChoiceQuestion({
      difficulty,
      questionText: `Ben needs to leave home at ${formatClockTime(leaveTime)}. Getting dressed takes ${formatDuration(steps[0])}, breakfast takes ${formatDuration(steps[1])}, and packing takes ${formatDuration(steps[2])}. What is the latest time he should start?`,
      answer: formatClockTime(answerMinutes),
      options: buildTimeOptions(answerMinutes, [answerMinutes - 15, answerMinutes + 15, leaveTime + total, leaveTime - steps[0]]),
      visualStartMinutes: leaveTime,
    });
  }

  const startMinutes = pickTimeStartMinutes(difficulty, total, { allowRollover: difficulty >= 8 });
  const finishMinutes = startMinutes + total;
  const questionText = steps.length === 2
    ? `Maya starts homework at ${formatClockTime(startMinutes)}. She reads for ${formatDuration(steps[0])}, then does math for ${formatDuration(steps[1])}. What time does she finish?`
    : `Maya starts homework at ${formatClockTime(startMinutes)}. She reads for ${formatDuration(steps[0])}, takes a ${steps[1]}-minute break, then does math for ${formatDuration(steps[2])}. What time does she finish?`;

  return buildTimeChoiceQuestion({
    difficulty,
    questionText,
    answer: formatClockTime(finishMinutes),
    options: buildTimeOptions(finishMinutes, [finishMinutes - 20, finishMinutes - 10, finishMinutes + 10, finishMinutes + 20]),
    visualStartMinutes: startMinutes,
  });
}

function createClockWordingQuestion(difficulty) {
  const hour = randomInt(1, 12);
  const templates = [
    { minLevel: 1, question: `Which time is ${hour} o'clock?`, answer: `${hour}:00`, distractors: [`${hour}:30`, `${hour === 12 ? 1 : hour + 1}:00`, `${hour}:15`] },
    { minLevel: 1, question: `Which time is half past ${hour}?`, answer: `${hour}:30`, distractors: [`${hour}:00`, `${hour}:15`, `${hour === 12 ? 1 : hour + 1}:30`] },
    { minLevel: 2, question: `Which time is quarter past ${hour}?`, answer: `${hour}:15`, distractors: [`${hour}:45`, `${hour}:30`, `${hour === 12 ? 1 : hour + 1}:15`] },
    { minLevel: 3, question: `Which time is quarter to ${hour}?`, answer: `${hour === 1 ? 12 : hour - 1}:45`, distractors: [`${hour}:15`, `${hour}:45`, `${hour === 1 ? 12 : hour - 1}:15`] },
  ];
  if (difficulty >= 4) {
    const startMinutes = randomInt(1, 11) * 60 + randomChoice([0, 5, 10, 15, 20, 30, 40, 45]);
    const delta = randomChoice([10, 15, 20, 25]);
    const after = Math.random() < 0.5;
    const answerMinutes = startMinutes + (after ? delta : -delta);
    templates.push({
      minLevel: 4,
      question: `Which time is ${delta} minutes ${after ? "after" : "before"} ${formatClockTimeWithoutSuffix(startMinutes)}?`,
      answer: formatClockTimeWithoutSuffix(answerMinutes),
      distractors: [
        formatClockTimeWithoutSuffix(startMinutes - (after ? delta : -delta)),
        formatClockTimeWithoutSuffix(answerMinutes + 10),
        formatClockTimeWithoutSuffix(answerMinutes - 10),
      ],
    });
  }
  const template = randomChoice(templates.filter((item) => difficulty >= item.minLevel));
  return buildTimeChoiceQuestion({
    difficulty,
    questionText: template.question,
    answer: template.answer,
    options: buildTextOptions(template.answer, template.distractors),
  });
}

function createTimeZoneQuestion(difficulty) {
  const cityPairs = [
    ["Israel", "London", 2, "earlier"],
    ["Berlin", "New York", 6, "earlier"],
    ["City A", "City B", 3, "later"],
    ["Chicago", "Berlin", 7, "later"],
  ];
  const [firstCity, secondCity, offsetHours, direction] = randomChoice(cityPairs);
  const baseHour = difficulty >= 9 ? randomChoice([1, 6, 8, 10, 15, 22, 23]) : randomChoice([8, 9, 10, 14, 15, 16]);
  const firstMinutes = baseHour * 60 + randomChoice([0, 15, 30, 45]);
  const signedOffset = direction === "later" ? offsetHours * 60 : -offsetHours * 60;
  const answerMinutes = firstMinutes + signedOffset;

  return buildTimeChoiceQuestion({
    difficulty,
    questionText: `It is ${formatClockTime(firstMinutes)} in ${firstCity}. ${secondCity} is ${offsetHours} hours ${direction}. What time is it in ${secondCity}?`,
    answer: formatClockTime(answerMinutes),
    options: buildTimeOptions(answerMinutes, [firstMinutes - signedOffset, answerMinutes + 120, answerMinutes + 720, firstMinutes]),
    visualStartMinutes: firstMinutes,
  });
}

function createNumericInputQuestion({
  type,
  difficulty,
  questionText,
  displayText,
  answer,
  answerLabel = null,
  acceptedAnswerPrefixes = [],
  acceptedAnswerSuffixes = [],
  visualHtml = "",
  visualSummary = "",
}) {
  return {
    type,
    difficulty,
    mode: "input",
    questionText,
    displayText,
    extraText: "",
    reviewText: "",
    visualHtml,
    visualSummary,
    answerValue: answer,
    answerLabel: answerLabel ?? String(answer),
    acceptedAnswerPrefixes: Array.isArray(acceptedAnswerPrefixes)
      ? acceptedAnswerPrefixes.map(String).filter(Boolean)
      : [],
    acceptedAnswerSuffixes: Array.isArray(acceptedAnswerSuffixes)
      ? acceptedAnswerSuffixes.map(String).filter(Boolean)
      : [],
    isHebrew: false,
  };
}

function createNumericChoiceQuestion({ type, difficulty, questionText, displayText, answer }) {
  return {
    type,
    difficulty,
    mode: "choice",
    questionText,
    displayText,
    extraText: "",
    reviewText: "",
    options: buildNumberOptions(answer).map(String),
    answerValue: String(answer),
    answerLabel: String(answer),
    isHebrew: false,
  };
}

function createVisualChoiceQuestion({
  type,
  difficulty,
  questionText,
  visualHtml,
  visualSummary,
  options,
  answerValue,
  answerLabel,
}) {
  return {
    type,
    difficulty,
    mode: "choice",
    questionText,
    displayText: "",
    extraText: "",
    reviewText: "",
    visualHtml,
    visualSummary,
    options,
    answerValue,
    answerLabel,
    isHebrew: false,
  };
}

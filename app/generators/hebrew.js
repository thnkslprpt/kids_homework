function createHebrewChoiceQuestion(entry, meaningPool = hebrewMeanings) {
  if (!entry) {
    return null;
  }

  return {
    type: "hebrew-choice",
    difficulty: entry.difficulty,
    mode: "choice",
    questionText: "What does this Hebrew word mean?",
    displayText: entry.hebrewDisplay,
    extraText: "",
    extraHtml: "",
    options: buildHebrewOptions(entry.english, meaningPool),
    answerValue: entry.english,
    answerLabel: entry.english,
    reviewText: entry.hebrewDisplay,
    isHebrew: true,
  };
}

function createAdultHebrewChoiceQuestion(entry) {
  if (!entry) {
    return null;
  }

  return {
    type: "hebrew-choice",
    difficulty: entry.difficulty,
    mode: "choice",
    questionText: "What does this Hebrew term mean?",
    displayText: entry.hebrewDisplay,
    extraText: "",
    extraHtml: "",
    options: buildAdultEnglishOptions(entry.english),
    answerValue: entry.english,
    answerLabel: entry.english,
    reviewText: entry.hebrewDisplay,
    isHebrew: true,
  };
}

function buildAdultEnglishOptions(correctAnswer) {
  const distractors = shuffleArray(
    Array.from(new Set(adultHebrewMeanings.filter((meaning) => meaning !== correctAnswer)))
  ).slice(0, 3);
  return shuffleArray([correctAnswer, ...distractors]);
}

function shouldCreateHebrewFinalLetterQuestion(hebrewQuestionIndex) {
  return HEBREW_FINAL_LETTER_INTERVAL > 0 && (hebrewQuestionIndex + 1) % HEBREW_FINAL_LETTER_INTERVAL === 0;
}

function createHebrewSessionQuestion(resources, difficulty, runtime) {
  const startIndex = Number(runtime?.hebrewStandardQuestionIndex || 0);
  if (runtime) {
    runtime.hebrewStandardQuestionIndex = startIndex + 1;
  }

  const factories =
    runtime?.hebrewQuestionMode === "bank-only"
        ? [
          () => createHebrewSupplementalSessionQuestion(difficulty),
          () => createHebrewReverseChoiceQuestion(resources, difficulty),
          () => createHebrewMatchingQuestion(resources, difficulty),
          () => createHebrewChoiceQuestion(drawHebrewEntry(resources.hebrew, difficulty), resources?.hebrewMeanings),
        ]
        : [
          () => createHebrewSupplementalSessionQuestion(difficulty),
          () => createHebrewReverseChoiceQuestion(resources, difficulty),
          () => createHebrewMatchingQuestion(resources, difficulty),
          () => createHebrewOppositesQuestion(resources, difficulty),
          () => createHebrewOppositeSinglePromptQuestion(resources, difficulty),
          () => createHebrewAgreementQuestion(difficulty),
          () => createHebrewCategorySortQuestion(difficulty),
          () => createHebrewNikkudContrastQuestion(resources, difficulty),
          () => maybeCreateHebrewImageQuestion(resources, difficulty),
          () => createHebrewChoiceQuestion(drawHebrewEntry(resources.hebrew, difficulty), resources?.hebrewMeanings),
        ];

  for (let offset = 0; offset < factories.length; offset += 1) {
    const question = factories[(startIndex + offset) % factories.length]();
    if (question) {
      return question;
    }
  }

  return createHebrewChoiceQuestion(drawHebrewEntry(resources.hebrew, difficulty), resources?.hebrewMeanings);
}

function createHebrewSupplementalSessionQuestion(difficulty) {
  const factory = getOptionalGlobalFunction("createHebrewGeneratedSessionQuestion");
  const question = factory ? factory(difficulty) : null;
  return question?.mode === "choice" || question?.mode === "drag" ? question : null;
}

function createHebrewChoiceModeQuestion({
  difficulty,
  questionText,
  displayText = "",
  extraText = "",
  visualHtml = "",
  visualSummary = "",
  options,
  answer,
  answerLabel = answer,
  reviewText = "",
  forceCompactMain = false,
  isHebrewMain = false,
}) {
  const normalizedOptions = Array.from(new Set((options || []).map((option) => String(option).trim()))).filter(Boolean);
  const normalizedAnswer = String(answer || "").trim();
  if (normalizedOptions.length !== 4 || !normalizedAnswer || !normalizedOptions.includes(normalizedAnswer)) {
    return null;
  }

  return {
    type: "hebrew-choice",
    difficulty,
    mode: "choice",
    questionText,
    displayText,
    extraText,
    extraHtml: "",
    visualHtml,
    visualSummary,
    reviewText,
    options: shuffleArray([...normalizedOptions]),
    answerValue: normalizedAnswer,
    answerLabel: String(answerLabel || normalizedAnswer),
    forceCompactMain,
    isHebrew: Boolean(isHebrewMain),
  };
}

function createHebrewTargetsDragQuestion({
  difficulty,
  questionText,
  extraText = "",
  visualSummary = "",
  targets,
  answer,
  choices,
  reviewText = "",
  answerLabel = "",
  dragPlaceholderText = "",
}) {
  const normalizedTargets = Array.isArray(targets)
    ? targets
        .map((target) => ({
          html: typeof target?.html === "string" ? target.html : "",
          reviewLabel: applyHebrewSentenceNikkud(String(target?.reviewLabel || "").trim()),
        }))
        .filter((target) => target.html || target.reviewLabel)
    : [];
  const normalizedAnswer = Array.isArray(answer)
    ? answer
        .map((item) => applyHebrewSentenceNikkud(String(item).trim()))
        .filter(Boolean)
    : [];
  const normalizedChoices = Array.from(
    new Set([...(choices || []).map((item) => applyHebrewSentenceNikkud(String(item).trim())), ...normalizedAnswer])
  ).filter(Boolean);

  if (
    !questionText ||
    normalizedTargets.length !== normalizedAnswer.length ||
    normalizedChoices.length < normalizedAnswer.length
  ) {
    return null;
  }

  return {
    type: "hebrew-drag",
    difficulty,
    mode: "drag",
    questionText: applyHebrewSentenceNikkud(questionText),
    displayText: "",
    extraText: applyHebrewSentenceNikkud(extraText),
    extraHtml: "",
    visualHtml: "",
    visualSummary,
    dragLayout: "targets",
    dragTargetArrangement: "rows",
    dragTargets: normalizedTargets,
    dragChoices: shuffleArray(
      normalizedChoices.map((text, index) => ({
        id: `hebrew-targets-${difficulty}-${index}-${text}`,
        text,
      }))
    ),
    dragAnswerTokens: normalizedAnswer,
    dragPlaceholderText: applyHebrewSentenceNikkud(dragPlaceholderText),
    reviewText: applyHebrewSentenceNikkud(reviewText),
    answerValue: normalizedAnswer.join(" | "),
    answerLabel:
      applyHebrewSentenceNikkud(answerLabel) ||
      normalizedTargets
        .map((target, index) => `${target.reviewLabel || `Word ${index + 1}`}: ${normalizedAnswer[index]}`)
        .join(" | "),
    isHebrew: true,
  };
}

function createHebrewBucketsDragQuestion({
  difficulty,
  questionText,
  extraText = "",
  visualSummary = "",
  buckets,
  reviewText = "",
  dragPlaceholderText = "",
}) {
  const normalizedBuckets = Array.isArray(buckets)
    ? buckets
        .map((bucket) => ({
          label: applyHebrewSentenceNikkud(String(bucket?.label || "").trim()),
          answers: Array.isArray(bucket?.answers)
            ? bucket.answers.map((item) => applyHebrewSentenceNikkud(String(item).trim())).filter(Boolean)
            : [],
        }))
        .filter((bucket) => bucket.label && bucket.answers.length)
    : [];
  const flatAnswers = normalizedBuckets.flatMap((bucket) => bucket.answers);

  if (!questionText || !normalizedBuckets.length || !flatAnswers.length) {
    return null;
  }

  return {
    type: "hebrew-drag",
    difficulty,
    mode: "drag",
    questionText: applyHebrewSentenceNikkud(questionText),
    displayText: "",
    extraText: applyHebrewSentenceNikkud(extraText),
    extraHtml: "",
    visualHtml: "",
    visualSummary,
    dragLayout: "buckets",
    dragBucketColumns: normalizedBuckets,
    dragChoices: shuffleArray(
      flatAnswers.map((text, index) => ({
        id: `hebrew-bucket-${difficulty}-${index}-${text}`,
        text,
      }))
    ),
    dragAnswerTokens: flatAnswers,
    dragPlaceholderText: applyHebrewSentenceNikkud(dragPlaceholderText),
    reviewText: applyHebrewSentenceNikkud(reviewText),
    answerValue: flatAnswers.join(" | "),
    answerLabel: normalizedBuckets.map((bucket) => `${bucket.label}: ${bucket.answers.join(", ")}`).join(" | "),
    isHebrew: true,
  };
}

function getEntriesAtOrBelowDifficulty(entries, difficulty) {
  const exact = entries.filter((entry) => entry.difficulty === difficulty);
  if (exact.length) {
    return exact;
  }

  const eligible = entries.filter((entry) => entry.difficulty <= difficulty);
  return eligible.length ? eligible : entries;
}

function getPoolEntriesAtOrBelowDifficulty(pool, difficulty) {
  const exact = pool?.entriesByDifficulty?.get(difficulty) || [];
  if (exact.length) {
    return exact;
  }

  const eligible = (pool?.entries || []).filter((entry) => entry.difficulty <= difficulty);
  return eligible.length ? eligible : pool?.entries || [];
}

function drawPoolEntryAtOrBelowDifficulty(pool, difficulty, queueKeyPrefix) {
  const source = getPoolEntriesAtOrBelowDifficulty(pool, difficulty);
  if (!source.length) {
    return null;
  }

  const queueKey = `${queueKeyPrefix}-${difficulty}`;
  let queue = pool.queuesByDifficulty.get(queueKey);
  if (!queue || !queue.length) {
    queue = shuffleArray([...source]);
    pool.queuesByDifficulty.set(queueKey, queue);
  }

  return queue.pop() || null;
}

function getHebrewDisplayWord(word) {
  const rawWord = String(word || "").trim();
  if (!rawWord) {
    return "";
  }

  if (HEBREW_POINTED_WORD_LOOKUP.has(rawWord)) {
    return HEBREW_POINTED_WORD_LOOKUP.get(rawWord);
  }

  return rawWord;
}

function createHebrewReverseChoiceQuestion(resources, difficulty) {
  const entry = drawPoolEntryAtOrBelowDifficulty(resources?.hebrewReverse, difficulty, "hebrew-reverse");
  if (!entry) {
    return null;
  }

  const options = buildHebrewReverseOptions(entry, resources?.hebrewReverse, difficulty);
  return createHebrewChoiceModeQuestion({
    difficulty: entry.difficulty,
    questionText: "Which Hebrew word matches this English word?",
    displayText: entry.english,
    options,
    answer: entry.hebrewDisplay,
    answerLabel: entry.hebrewDisplay,
    reviewText: `${entry.english}: ${entry.hebrewDisplay}`,
  });
}

function createAdultHebrewReverseChoiceQuestion(resources) {
  const entry = drawPoolEntryAtOrBelowDifficulty(resources?.adultReverse, 1, "adult-hebrew-reverse");
  if (!entry) {
    return null;
  }

  const options = buildHebrewReverseOptions(entry, resources?.adultReverse, 1);
  return createHebrewChoiceModeQuestion({
    difficulty: entry.difficulty,
    questionText: "Which Hebrew term matches this English meaning?",
    displayText: entry.english,
    options,
    answer: entry.hebrewDisplay,
    answerLabel: entry.hebrewDisplay,
    reviewText: `${entry.english}: ${entry.hebrewDisplay}`,
  });
}

function buildHebrewReverseOptions(correctEntry, pool, difficulty) {
  const options = [correctEntry.hebrewDisplay];
  const seenDisplays = new Set(options);
  const seenMeanings = new Set([getChoiceMeaningKey(correctEntry.english)]);
  const candidateLists = [
    getPoolEntriesAtOrBelowDifficulty(pool, difficulty),
    (pool?.entries || []).filter((entry) => entry.difficulty <= difficulty),
    pool?.entries || [],
  ];

  candidateLists.forEach((candidateList) => {
    shuffleArray([...candidateList]).forEach((entry) => {
      if (options.length >= 4) {
        return;
      }

      const meaningKey = getChoiceMeaningKey(entry.english);
      if (seenDisplays.has(entry.hebrewDisplay) || seenMeanings.has(meaningKey)) {
        return;
      }

      seenDisplays.add(entry.hebrewDisplay);
      seenMeanings.add(meaningKey);
      options.push(entry.hebrewDisplay);
    });
  });

  return options.length === 4 ? options : null;
}

function createHebrewMatchingQuestion(resources, difficulty) {
  const entries = buildHebrewMatchingEntries(resources?.hebrewReverse, difficulty, HEBREW_MATCHING_PAIR_COUNT);
  if (entries.length !== HEBREW_MATCHING_PAIR_COUNT) {
    return null;
  }

  const rightEntries = shuffleArray([...entries]);
  const answerTokens = entries.map((entry) => entry.hebrewDisplay);
  const answerLabel = buildHebrewMatchingAnswerText(entries, answerTokens);

  return {
    type: "hebrew-drag",
    difficulty: Math.max(...entries.map((entry) => entry.difficulty)),
    mode: "drag",
    questionText: "Select each English word and its matching Hebrew word.",
    displayText: "",
    extraText: "Click a word or dot on one side, then click the matching word or dot on the other side.",
    extraHtml: "",
    visualHtml: "",
    visualSummary: entries.map((entry) => entry.english).join(", "),
    dragLayout: "matching",
    dragChoices: [],
    dragAnswerTokens: answerTokens,
    matchLeftItems: entries.map((entry, index) => ({
      id: `hebrew-match-left-${difficulty}-${index}`,
      text: entry.english,
    })),
    matchRightItems: rightEntries.map((entry, index) => ({
      id: `hebrew-match-right-${difficulty}-${index}-${stripHebrewDiacritics(entry.hebrew)}`,
      text: entry.hebrewDisplay,
    })),
    reviewText: answerLabel,
    answerValue: answerTokens.join(" | "),
    answerLabel,
    isHebrew: false,
  };
}

function createAdultMatchingQuestion(resources) {
  const entries = buildHebrewMatchingEntries(resources?.adultReverse, 1, HEBREW_MATCHING_PAIR_COUNT, {
    requireNikkud: false,
  });
  if (entries.length !== HEBREW_MATCHING_PAIR_COUNT) {
    return null;
  }

  const rightEntries = shuffleArray([...entries]);
  const answerTokens = entries.map((entry) => entry.hebrewDisplay);
  const answerLabel = buildHebrewMatchingAnswerText(entries, answerTokens);

  return {
    type: "hebrew-drag",
    difficulty: 1,
    mode: "drag",
    questionText: "Select each English term and its matching Hebrew term.",
    displayText: "",
    extraText: "Click a term or dot on one side, then click the matching term or dot on the other side.",
    extraHtml: "",
    visualHtml: "",
    visualSummary: entries.map((entry) => entry.english).join(", "),
    dragLayout: "matching",
    dragChoices: [],
    dragAnswerTokens: answerTokens,
    matchLeftItems: entries.map((entry, index) => ({
      id: `adult-hebrew-match-left-${index}`,
      text: entry.english,
    })),
    matchRightItems: rightEntries.map((entry, index) => ({
      id: `adult-hebrew-match-right-${index}-${stripHebrewDiacritics(entry.hebrew)}`,
      text: entry.hebrewDisplay,
    })),
    reviewText: answerLabel,
    answerValue: answerTokens.join(" | "),
    answerLabel,
    isHebrew: false,
  };
}

function createHebrewOppositesQuestion(resources, difficulty) {
  const pairs = buildHebrewOppositeEntries(resources?.hebrewOpposites, difficulty, HEBREW_OPPOSITES_PAIR_COUNT);
  if (pairs.length !== HEBREW_OPPOSITES_PAIR_COUNT) {
    return null;
  }

  const entries = pairs.map((pair) => {
    const useForwardOrder = Math.random() < 0.5;
    return {
      text: useForwardOrder ? pair.leftDisplay : pair.rightDisplay,
      oppositeText: useForwardOrder ? pair.rightDisplay : pair.leftDisplay,
      difficulty: pair.difficulty,
    };
  });
  const rightEntries = shuffleArray([...entries]);
  const answerTokens = entries.map((entry) => entry.oppositeText);
  const answerLabel = buildHebrewMatchingAnswerText(entries, answerTokens);

  return {
    type: "hebrew-drag",
    difficulty: Math.max(...entries.map((entry) => entry.difficulty)),
    mode: "drag",
    questionText: "Select each Hebrew word and its opposite.",
    displayText: "",
    extraText: "Click a word or dot on one side, then click the Hebrew word with the opposite meaning.",
    extraHtml: "",
    visualHtml: "",
    visualSummary: pairs.map((pair) => `${pair.leftEnglish}/${pair.rightEnglish}`).join(", "),
    dragLayout: "matching",
    dragChoices: [],
    dragAnswerTokens: answerTokens,
    matchLeftItems: entries.map((entry, index) => ({
      id: `hebrew-opposites-left-${difficulty}-${index}-${stripHebrewDiacritics(entry.text)}`,
      text: entry.text,
    })),
    matchRightItems: rightEntries.map((entry, index) => ({
      id: `hebrew-opposites-right-${difficulty}-${index}-${stripHebrewDiacritics(entry.oppositeText)}`,
      text: entry.oppositeText,
    })),
    reviewText: answerLabel,
    answerValue: answerTokens.join(" | "),
    answerLabel,
    isHebrew: false,
  };
}

function createHebrewOppositeSinglePromptQuestion(resources, difficulty) {
  const pair = drawPoolEntryAtOrBelowDifficulty(resources?.hebrewOpposites, difficulty, "hebrew-opposite-single");
  if (!pair) {
    return null;
  }

  const leftItems = [
    { text: pair.leftEnglish, oppositeText: pair.rightDisplay },
    { text: pair.rightEnglish, oppositeText: pair.leftDisplay },
  ];
  const rightItems = shuffleArray([pair.leftDisplay, pair.rightDisplay]);
  const answerTokens = leftItems.map((item) => item.oppositeText);
  const answerLabel = buildHebrewMatchingAnswerText(leftItems, answerTokens);

  return {
    type: "hebrew-drag",
    difficulty: pair.difficulty,
    mode: "drag",
    questionText: "Select each English word and the Hebrew word with the opposite meaning.",
    displayText: "",
    extraText: "Click a word or dot on one side, then click the Hebrew opposite on the other side.",
    extraHtml: "",
    visualHtml: "",
    visualSummary: `${pair.leftEnglish}/${pair.rightEnglish}`,
    dragLayout: "matching",
    dragChoices: [],
    dragAnswerTokens: answerTokens,
    matchLeftItems: leftItems.map((item, index) => ({
      id: `hebrew-opposite-single-left-${difficulty}-${index}-${item.text.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      text: item.text,
    })),
    matchRightItems: rightItems.map((text, index) => ({
      id: `hebrew-opposite-single-right-${difficulty}-${index}-${stripHebrewDiacritics(text)}`,
      text,
    })),
    reviewText: answerLabel,
    answerValue: answerTokens.join(" | "),
    answerLabel,
    isHebrew: false,
  };
}

function buildHebrewMatchingEntries(pool, difficulty, count, options = {}) {
  const candidateLists = [
    getPoolEntriesAtOrBelowDifficulty(pool, difficulty),
    (pool?.entries || []).filter((entry) => entry.difficulty <= difficulty),
    pool?.entries || [],
  ];

  for (const candidateList of candidateLists) {
    const selected = pickHebrewMatchingEntries(candidateList, count, options);
    if (selected.length === count) {
      return selected;
    }
  }

  return [];
}

function buildHebrewOppositeEntries(pool, difficulty, count) {
  const candidateLists = [
    getPoolEntriesAtOrBelowDifficulty(pool, difficulty),
    (pool?.entries || []).filter((entry) => entry.difficulty <= difficulty),
    pool?.entries || [],
  ];

  for (const candidateList of candidateLists) {
    if (candidateList.length >= count) {
      return shuffleArray([...candidateList]).slice(0, count);
    }
  }

  return [];
}

function pickHebrewMatchingEntries(entries, count, options = {}) {
  const selected = [];
  const seenMeanings = new Set();
  const seenDisplays = new Set();
  const requireNikkud = options.requireNikkud !== false;

  shuffleArray([...(entries || [])]).forEach((entry) => {
    if (selected.length >= count) {
      return;
    }

    const english = String(entry?.english || "").trim();
    const display = String(entry?.hebrewDisplay || "").trim();
    if (!english || !display || (requireNikkud && !hasHebrewNikkud(display))) {
      return;
    }

    const meaningKey = getChoiceMeaningKey(english);
    if (seenMeanings.has(meaningKey) || seenDisplays.has(display)) {
      return;
    }

    seenMeanings.add(meaningKey);
    seenDisplays.add(display);
    selected.push(entry);
  });

  return selected;
}

function buildHebrewMatchingAnswerText(entries, tokens) {
  return (entries || [])
    .map((entry, index) => `${entry.text || entry.english}: ${String(tokens?.[index] || "").trim()}`)
    .join(" | ");
}

function createHebrewNikkudContrastQuestion(resources, difficulty) {
  const entry = drawPoolEntryAtOrBelowDifficulty(resources?.hebrewHomograph, difficulty, "hebrew-homograph");
  if (!entry) {
    return null;
  }

  const options = buildHebrewNikkudOptions(entry, resources?.hebrewHomograph, difficulty);
  return createHebrewChoiceModeQuestion({
    difficulty: entry.difficulty,
    questionText: `Which pointed Hebrew word means "${entry.english}"?`,
    displayText: entry.strippedHebrew,
    extraText: "The same letters can change meaning when the nikkud changes.",
    options,
    answer: entry.hebrewDisplay,
    answerLabel: entry.hebrewDisplay,
    reviewText: `${entry.strippedHebrew}: ${entry.hebrewDisplay} = ${entry.english}`,
    isHebrewMain: true,
  });
}

function buildHebrewNikkudOptions(correctEntry, pool, difficulty) {
  const options = [correctEntry.hebrewDisplay];
  const seen = new Set(options);
  const siblingOptions = correctEntry.family
    .filter((entry) => entry.hebrewDisplay !== correctEntry.hebrewDisplay)
    .map((entry) => entry.hebrewDisplay);

  siblingOptions.forEach((option) => {
    if (!seen.has(option) && options.length < 4) {
      seen.add(option);
      options.push(option);
    }
  });

  const candidateLists = [
    getPoolEntriesAtOrBelowDifficulty(pool, difficulty).filter(
      (entry) => entry.strippedHebrew !== correctEntry.strippedHebrew
    ),
    (pool?.entries || []).filter((entry) => entry.strippedHebrew !== correctEntry.strippedHebrew),
  ];

  candidateLists.forEach((candidateList) => {
    shuffleArray([...candidateList]).forEach((entry) => {
      if (options.length >= 4 || seen.has(entry.hebrewDisplay)) {
        return;
      }

      seen.add(entry.hebrewDisplay);
      options.push(entry.hebrewDisplay);
    });
  });

  return options.length === 4 ? options : null;
}

function createHebrewAgreementQuestion(difficulty) {
  const blueprint = randomChoice(getEntriesAtOrBelowDifficulty(HEBREW_AGREEMENT_BLUEPRINTS, difficulty));
  if (!blueprint) {
    return null;
  }

  const displayText = applyHebrewSentenceNikkud(blueprint.displayText);
  const options = blueprint.options.map((option) => applyHebrewSentenceNikkud(option));
  const answer = applyHebrewSentenceNikkud(blueprint.answer);

  return createHebrewChoiceModeQuestion({
    difficulty: blueprint.difficulty,
    questionText: "Choose the Hebrew word that completes the sentence.",
    displayText,
    options,
    answer,
    answerLabel: answer,
    reviewText: applyHebrewSentenceNikkud(blueprint.reviewText),
    forceCompactMain: true,
    isHebrewMain: true,
  });
}

function createHebrewCategorySortQuestion(difficulty) {
  const config = HEBREW_CATEGORY_SORT_LEVEL_CONFIG[difficulty] || HEBREW_CATEGORY_SORT_LEVEL_CONFIG[3];
  const selectedLabels = Array.isArray(config.labels) && config.labels.length
    ? config.labels
    : shuffleArray([...(config.labelPool || [])]).slice(
        0,
        Math.min(config.bucketCount || (config.labelPool || []).length, (config.labelPool || []).length)
      );
  const buckets = selectedLabels
    .map((label) => HEBREW_CATEGORY_SORT_GROUPS.find((group) => group.label === label))
    .filter(Boolean)
    .map((group) => ({
      label: group.label,
      answers: shuffleArray(group.words.map((word) => getHebrewDisplayWord(word))).slice(
        0,
        config.itemsPerBucket
      ),
    }));

  if (!buckets.length) {
    return null;
  }

  return createHebrewBucketsDragQuestion({
    difficulty,
    questionText: "Sort the Hebrew words into the correct categories.",
    extraText: "Each bucket is a Hebrew category.",
    visualSummary: buckets.map((bucket) => applyHebrewSentenceNikkud(bucket.label)).join(", "),
    buckets,
    reviewText: "Sort the Hebrew words by category.",
    dragPlaceholderText: "גררו לכאן",
  });
}

function createAdultCategorySortQuestion() {
  const selectedGroups = shuffleArray([...adultCategorySortGroups]).slice(0, Math.min(3, adultCategorySortGroups.length));
  const buckets = selectedGroups.map((group) => ({
    label: group.label,
    answers: shuffleArray([...(group.words || [])]).slice(0, 4),
  }));

  if (!buckets.length) {
    return null;
  }

  return createHebrewBucketsDragQuestion({
    difficulty: 1,
    questionText: "מיינו את המונחים לקבוצות הנכונות.",
    extraText: "כל קבוצה שייכת לתחום אחר ברשימת המונחים.",
    visualSummary: buckets.map((bucket) => bucket.label).join(", "),
    buckets,
    reviewText: "מיון מונחים לפי נושא.",
    dragPlaceholderText: "גררו לכאן",
  });
}

function createHebrewFinalLetterQuestion(difficulty) {
  const drill = randomChoice(getEntriesAtOrBelowDifficulty(HEBREW_FINAL_LETTER_DRILLS, difficulty));
  if (!drill) {
    return null;
  }

  const middleMaskedWord = buildMaskedHebrewWord(drill.middleWord, drill.middleLetter, false);
  const finalMaskedWord = buildMaskedHebrewWord(drill.finalWord, drill.finalLetter, true);
  if (!middleMaskedWord || !finalMaskedWord) {
    return null;
  }

  return createHebrewTargetsDragQuestion({
    difficulty: drill.difficulty,
    questionText: "Drag the correct Hebrew letter to each word.",
    extraText: `${drill.middleLetter} belongs in the middle of a word. ${drill.finalLetter} belongs at the end.`,
    visualSummary: `${getHebrewDisplayWord(drill.middleWord)} | ${getHebrewDisplayWord(drill.finalWord)}`,
    targets: [
      {
        html: buildHebrewLetterTargetHtml(middleMaskedWord, "באמצע"),
        reviewLabel: getHebrewDisplayWord(drill.middleWord),
      },
      {
        html: buildHebrewLetterTargetHtml(finalMaskedWord, "בסוף"),
        reviewLabel: getHebrewDisplayWord(drill.finalWord),
      },
    ],
    answer: [drill.middleLetter, drill.finalLetter],
    choices: [drill.middleLetter, drill.finalLetter],
    reviewText: `${getHebrewDisplayWord(drill.middleWord)} | ${getHebrewDisplayWord(drill.finalWord)}`,
    answerLabel: `${getHebrewDisplayWord(drill.middleWord)} | ${getHebrewDisplayWord(drill.finalWord)}`,
    dragPlaceholderText: "אות",
  });
}

function buildMaskedHebrewWord(word, expectedLetter, useFinalPosition) {
  const letters = Array.from(String(word || "").trim());
  if (!letters.length) {
    return "";
  }

  if (useFinalPosition) {
    const lastIndex = letters.length - 1;
    if (letters[lastIndex] !== expectedLetter) {
      return "";
    }

    letters[lastIndex] = "□";
    return letters.join("");
  }

  const maskIndex = findHebrewLetterMaskIndex(letters, expectedLetter);
  if (maskIndex === -1) {
    return "";
  }

  letters[maskIndex] = "□";
  return letters.join("");
}

function findHebrewLetterMaskIndex(letters, expectedLetter) {
  const innerIndexes = [];
  const fallbackIndexes = [];

  letters.forEach((letter, index) => {
    if (letter !== expectedLetter) {
      return;
    }

    if (index > 0 && index < letters.length - 1) {
      innerIndexes.push(index);
    } else if (index < letters.length - 1) {
      fallbackIndexes.push(index);
    }
  });

  if (innerIndexes.length) {
    return innerIndexes[Math.floor(innerIndexes.length / 2)];
  }

  return fallbackIndexes.length ? fallbackIndexes[0] : -1;
}

function buildHebrewLetterTargetHtml(maskedWord, hintLabel) {
  return `
    <div class="hebrew-letter-target">
      <div class="hebrew-letter-target-word" dir="rtl">${escapeHtml(maskedWord)}</div>
      <div class="hebrew-letter-target-hint">${escapeHtml(applyHebrewSentenceNikkud(hintLabel))}</div>
    </div>
  `;
}

function createHebrewReadingComprehensionQuestion(difficulty) {
  const blueprint = randomChoice(getEntriesAtOrBelowDifficulty(HEBREW_READING_BLUEPRINTS, difficulty));
  if (!blueprint) {
    return null;
  }

  const pointedLines = applyHebrewSentenceNikkudList(blueprint.lines);
  const pointedPassage = pointedLines.join(" ");
  const pointedOptions = blueprint.options.map((option) => applyHebrewSentenceNikkud(option));
  const pointedAnswer = applyHebrewSentenceNikkud(blueprint.answer);
  return createHebrewChoiceModeQuestion({
    difficulty: blueprint.difficulty,
    questionText: applyHebrewSentenceNikkud(blueprint.question),
    visualHtml: buildHebrewReadingCard(pointedLines, blueprint.images),
    visualSummary: pointedPassage,
    options: pointedOptions,
    answer: pointedAnswer,
    answerLabel: pointedAnswer,
    reviewText: pointedPassage,
  });
}

function createAdultReadingComprehensionQuestion() {
  const blueprint = randomChoice(adultReadingBlueprints);
  if (!blueprint) {
    return null;
  }

  const lines = Array.isArray(blueprint.lines) ? blueprint.lines.map((line) => String(line).trim()).filter(Boolean) : [];
  const options = Array.isArray(blueprint.options)
    ? Array.from(new Set(blueprint.options.map((option) => String(option).trim()))).filter(Boolean)
    : [];
  const answer = String(blueprint.answer || "").trim();
  if (lines.length < 2 || options.length !== 4 || !answer || !options.includes(answer)) {
    return null;
  }

  const passage = lines.join(" ");
  return createHebrewChoiceModeQuestion({
    difficulty: 1,
    questionText: String(blueprint.question || "").trim(),
    visualHtml: buildHebrewReadingCard(lines),
    visualSummary: passage,
    options,
    answer,
    answerLabel: answer,
    reviewText: passage,
  });
}

function buildHebrewReadingCard(lines, images = []) {
  const pointedLines = applyHebrewSentenceNikkudList(lines);
  const paragraphs = pointedLines
    .map((line) => `<p class="hebrew-reading-line">${escapeHtml(line)}</p>`)
    .join("");
  const imageStrip = Array.isArray(images) && images.length ? buildHebrewReadingImagesHtml(images) : "";

  return `
    <div class="hebrew-reading-card">
      <div class="hebrew-reading-title">${escapeHtml(applyHebrewSentenceNikkud("קטע קריאה"))}</div>
      <div class="hebrew-reading-lines" dir="rtl">${paragraphs}</div>
      ${imageStrip}
    </div>
  `;
}

function buildHebrewReadingImagesHtml(images) {
  const cards = images
    .map((image) => {
      const asset = String(image?.asset || "").trim();
      if (!asset) {
        return "";
      }

      return `
        <div class="hebrew-reading-image-chip">
          <img
            class="hebrew-reading-image"
            src="app/assets/hebrew-images/${escapeHtml(asset)}"
            alt="${escapeHtml(String(image?.alt || ""))}"
            loading="lazy"
            decoding="async"
          >
        </div>
      `;
    })
    .filter(Boolean)
    .join("");

  return cards ? `<div class="hebrew-reading-images">${cards}</div>` : "";
}

function createHebrewWritingPracticeQuestion(targetText, difficulty, variant) {
  const rawText = String(targetText || "").trim();
  const displayText = applyHebrewSentenceNikkud(rawText);
  const visualText = stripHebrewDiacritics(rawText).trim();
  const showKtavYadExample = Number(difficulty) <= 3;
  const variantLabelMap = {
    letter: "letter",
    word: "word",
    "short-sentence": "sentence",
    "long-sentence": "sentence",
  };
  const label = variantLabelMap[variant] || "text";

  return {
    type: "hebrew-writing",
    difficulty,
    mode: "practice",
    questionText: `Write this Hebrew ${label} in cursive / ktav yad.`,
    displayText,
    extraText: "",
    extraHtml: "",
    visualHtml: showKtavYadExample ? buildHebrewWritingPracticeVisual(visualText, variant) : "",
    visualSummary: showKtavYadExample ? `Ktav yad practice target: ${visualText}` : "",
    reviewText: displayText,
    answerValue: "done",
    answerLabel: "Parents must check your writing.",
    completionValue: "Done",
    actionLabel: "Mark Done",
    successMessage: "Marked done. Parents must check your writing.",
    forceCompactMain: variant === "short-sentence" || variant === "long-sentence",
    isHebrew: true,
  };
}

function buildHebrewWritingPracticeVisual(targetText, variant) {
  if (variant === "letter") {
    return `
      <div class="ktav-yad-card letter">
        <div class="ktav-yad-heading">Ktav yad example</div>
        <div class="ktav-yad-comparison">
          <div class="ktav-yad-chip">
            <div class="ktav-yad-chip-label">Print</div>
            <div class="ktav-yad-chip-value print" dir="rtl">${escapeHtml(targetText)}</div>
          </div>
          <div class="ktav-yad-chip">
            <div class="ktav-yad-chip-label">Ktav yad</div>
            <div class="ktav-yad-chip-value script" dir="rtl">${escapeHtml(targetText)}</div>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="ktav-yad-card">
      <div class="ktav-yad-heading">Ktav yad example</div>
      <div class="ktav-yad-script${variant === "long-sentence" ? " long" : ""}" dir="rtl">
        ${escapeHtml(targetText)}
      </div>
    </div>
  `;
}

function createHebrewImageDragQuestion(entries, difficulty) {
  const selectedEntries = Array.isArray(entries) ? entries.slice(0, 3) : [];
  if (selectedEntries.length !== 3) {
    return null;
  }

  const answerTokens = selectedEntries.map((entry) => entry.hebrewDisplay);
  const answerLabel = selectedEntries
    .map((entry) => `${entry.english}: ${entry.hebrewDisplay}`)
    .join(" | ");

  return {
    type: "hebrew-drag",
    difficulty,
    mode: "drag",
    questionText: "Drag each Hebrew word to the matching picture.",
    displayText: "",
    extraText: "",
    extraHtml: "",
    visualHtml: "",
    visualSummary: `Pictures: ${selectedEntries.map((entry) => entry.english).join(", ")}`,
    dragLayout: "targets",
    dragTargetArrangement: "rows",
    dragTargets: selectedEntries.map((entry) => ({
      html: buildHebrewImageTargetHtml(entry),
      reviewLabel: entry.english,
    })),
    dragChoices: shuffleArray(
      selectedEntries.map((entry, index) => ({
        id: `hebrew-image-${difficulty}-${index}-${stripHebrewDiacritics(entry.hebrew)}`,
        text: entry.hebrewDisplay,
      }))
    ),
    dragAnswerTokens: answerTokens,
    dragPlaceholderText: "Drop word here",
    reviewText: answerLabel,
    answerValue: answerTokens.join(" | "),
    answerLabel,
    isHebrew: true,
  };
}

function buildHebrewImageTargetHtml(entry) {
  return `
    <div class="hebrew-image-target">
      <img
        class="hebrew-image-target-image"
        src="${escapeHtml(entry.imageSrc)}"
        alt="${escapeHtml(entry.imageAlt)}"
        loading="lazy"
        decoding="async"
      >
    </div>
  `;
}

function createBankChoiceQuestion(entry, type, isHebrew = false) {
  return {
    type,
    difficulty: entry.difficulty,
    mode: "choice",
    questionText: entry.question,
    displayText: entry.displayText || "",
    extraText: entry.extraText || "",
    extraHtml: entry.extraHtml || "",
    visualHtml: entry.visualHtml || "",
    visualSummary: entry.visualSummary || "",
    reviewText: entry.reviewText || "",
    options: shuffleArray([...entry.options]),
    answerValue: entry.answer,
    answerLabel: entry.answer,
    isHebrew,
  };
}

function createAdultContextChoiceQuestion(resources) {
  const entry = resources?.adultContext ? drawFromPool(resources.adultContext, 1) : null;
  return entry ? createBankChoiceQuestion(entry, "hebrew-choice", true) : null;
}

function createAdultSentenceDragQuestion(resources) {
  const entry = resources?.adultSentenceDrag ? drawFromPool(resources.adultSentenceDrag, 1) : null;
  return entry ? createBankDragQuestion(entry, "hebrew-drag") : null;
}

function createBankDragQuestion(entry, type) {
  const isHebrew = Boolean(entry.isHebrew);
  const questionText = isHebrew ? applyHebrewSentenceNikkud(entry.question) : entry.question;
  const dragTemplateParts = isHebrew
    ? applyHebrewSentenceNikkudList(entry.templateParts)
    : [...entry.templateParts];
  const dragAnswerTokens = isHebrew
    ? applyHebrewSentenceNikkudList(entry.answer)
    : [...entry.answer];

  return {
    type,
    difficulty: entry.difficulty,
    mode: "drag",
    questionText: isHebrew && shouldHideHebrewDragPrompt(questionText) ? "" : questionText,
    displayText: "",
    extraText: isHebrew ? applyHebrewSentenceNikkud(entry.extraText || "") : entry.extraText || "",
    dragTemplateParts,
    dragChoices: shuffleArray(
      entry.choices.map((text, index) => ({
        id: `${type}-${entry.difficulty}-${index}-${text}`,
        text: isHebrew ? applyHebrewSentenceNikkud(text) : text,
      }))
    ),
    dragAnswerTokens,
    reviewText: isHebrew
      ? buildFilledDragText(dragTemplateParts, dragAnswerTokens)
      : entry.reviewText || buildDragTemplateText(entry.templateParts),
    answerValue: dragAnswerTokens.join(" | "),
    answerLabel: buildFilledDragText(dragTemplateParts, dragAnswerTokens),
    isHebrew,
  };
}

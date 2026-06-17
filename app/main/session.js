function buildHebrewQuestionBank(entries) {
  const groupedEntries = new Map();

  for (const entry of entries) {
    const key = String(entry.hebrew || "").trim();
    const difficulty = getEntryDifficulty(entry.difficulty);
    if (!key || difficulty === null) {
      continue;
    }

    if (!groupedEntries.has(key)) {
      groupedEntries.set(key, {
        hebrew: key,
        englishSet: new Set(),
        transliteration: entry.transliteration,
        difficulty,
      });
    }

    groupedEntries.get(key).englishSet.add(String(entry.english || "").trim());
  }

  const baseEntries = Array.from(groupedEntries.values()).map((entry) => ({
    hebrew: entry.hebrew,
    hebrewDisplay: buildHebrewDisplay(entry.hebrew, entry.transliteration),
    english: Array.from(entry.englishSet).join(" / "),
    transliteration: entry.transliteration || "",
    difficulty: entry.difficulty,
  }));

  return baseEntries;
}

function buildHebrewReverseQuestionBank(entries) {
  const groupedEntries = new Map();

  for (const entry of entries) {
    const english = String(entry?.english || "").trim();
    const hebrew = String(entry?.hebrew || "").trim();
    const difficulty = getEntryDifficulty(entry?.difficulty);
    if (!english || !hebrew || difficulty === null) {
      continue;
    }

    const englishKey = english.toLowerCase();
    if (!groupedEntries.has(englishKey)) {
      groupedEntries.set(englishKey, {
        english,
        forms: new Map(),
        difficulty,
      });
    }

    const group = groupedEntries.get(englishKey);
    if (!group.forms.has(hebrew)) {
      group.forms.set(hebrew, {
        hebrew,
        transliteration: String(entry?.transliteration || "").trim(),
        difficulty,
      });
    }
    group.difficulty = Math.min(group.difficulty, difficulty);
  }

  return Array.from(groupedEntries.values())
    .filter((group) => group.forms.size === 1)
    .map((group) => {
      const [onlyForm] = Array.from(group.forms.values());
      return {
        english: group.english,
        hebrew: onlyForm.hebrew,
        hebrewDisplay: buildHebrewDisplay(onlyForm.hebrew, onlyForm.transliteration),
        transliteration: onlyForm.transliteration,
        difficulty: group.difficulty,
      };
    })
    .filter((entry) => entry.hebrewDisplay);
}

function buildHebrewOppositeQuestionBank(entries) {
  const entriesByEnglish = new Map(
    (entries || []).map((entry) => [String(entry?.english || "").trim().toLowerCase(), entry])
  );

  return HEBREW_OPPOSITE_PAIR_DEFINITIONS.flatMap((definition) => {
    const leftEntry = entriesByEnglish.get(definition.leftEnglish.toLowerCase());
    const rightEntry = entriesByEnglish.get(definition.rightEnglish.toLowerCase());
    if (!leftEntry || !rightEntry) {
      return [];
    }

    const leftDisplay = String(definition.leftDisplay || leftEntry.hebrewDisplay || "").trim();
    const rightDisplay = String(definition.rightDisplay || rightEntry.hebrewDisplay || "").trim();
    if (
      !leftDisplay ||
      !rightDisplay ||
      !hasHebrewNikkud(leftDisplay) ||
      !hasHebrewNikkud(rightDisplay) ||
      leftDisplay === rightDisplay
    ) {
      return [];
    }

    return [
      {
        leftEnglish: definition.leftEnglish,
        rightEnglish: definition.rightEnglish,
        leftDisplay,
        rightDisplay,
        difficulty: Math.max(leftEntry.difficulty, rightEntry.difficulty),
      },
    ];
  });
}

function buildHebrewHomographQuestionBank(entries) {
  const groupedEntries = new Map();

  for (const entry of entries) {
    const english = String(entry?.english || "").trim();
    const hebrew = String(entry?.hebrew || "").trim();
    const difficulty = getEntryDifficulty(entry?.difficulty);
    if (!english || !hebrew || difficulty === null) {
      continue;
    }

    const strippedHebrew = stripHebrewDiacritics(hebrew).trim();
    if (!strippedHebrew) {
      continue;
    }

    if (!groupedEntries.has(strippedHebrew)) {
      groupedEntries.set(strippedHebrew, []);
    }

    groupedEntries.get(strippedHebrew).push({
      strippedHebrew,
      english,
      hebrew,
      hebrewDisplay: buildHebrewDisplay(hebrew, entry?.transliteration || ""),
      difficulty,
    });
  }

  return Array.from(groupedEntries.values()).flatMap((entriesForWord) => {
    const uniqueEntries = [];
    const seen = new Set();

    entriesForWord.forEach((entry) => {
      const identity = `${entry.hebrewDisplay}||${entry.english}`;
      if (seen.has(identity)) {
        return;
      }

      seen.add(identity);
      uniqueEntries.push(entry);
    });

    if (new Set(uniqueEntries.map((entry) => entry.hebrewDisplay)).size < 2) {
      return [];
    }

    const family = uniqueEntries.map((entry) => ({
      strippedHebrew: entry.strippedHebrew,
      english: entry.english,
      hebrewDisplay: entry.hebrewDisplay,
      difficulty: entry.difficulty,
    }));

    return uniqueEntries.map((entry) => ({
      strippedHebrew: entry.strippedHebrew,
      english: entry.english,
      hebrewDisplay: entry.hebrewDisplay,
      difficulty: entry.difficulty,
      family,
    }));
  });
}

function buildHebrewImageQuestionBank(entries, hebrewEntries) {
  const hebrewLookup = new Map(
    hebrewEntries.map((entry) => [buildHebrewImageWordKey(entry.hebrew, entry.english), entry])
  );

  return entries
    .map((entry) => {
      const hebrew = String(entry?.hebrew || "").trim();
      const english = String(entry?.english || "").trim();
      const asset = String(entry?.asset || "").trim();
      const imageAlt = String(entry?.alt || english).trim() || english;
      if (!hebrew || !english || !asset) {
        return null;
      }

      const match = hebrewLookup.get(buildHebrewImageWordKey(hebrew, english));
      if (!match) {
        return null;
      }

      return {
        ...match,
        imageSrc: `app/assets/hebrew-images/${asset}`,
        imageAlt,
      };
    })
    .filter(Boolean);
}

function buildHebrewImageWordKey(hebrew, english) {
  return `${stripHebrewDiacritics(hebrew).trim()}||${String(english || "").trim()}`;
}

function createHebrewBankBundle(entries, imageWordEntries) {
  const questionBank = buildHebrewQuestionBank(entries);
  const reverseQuestionBank = buildHebrewReverseQuestionBank(entries);

  return {
    questionBank,
    reverseQuestionBank,
    oppositeQuestionBank: buildHebrewOppositeQuestionBank(reverseQuestionBank),
    homographQuestionBank: buildHebrewHomographQuestionBank(entries),
    imageQuestionBank: buildHebrewImageQuestionBank(imageWordEntries, questionBank),
    meanings: questionBank.map((entry) => entry.english),
  };
}

function mergeUserHebrewWordSets(...wordSets) {
  const mergedWords = [];
  const seen = new Set();

  wordSets.flat().forEach((entry) => {
    const hebrew = stripHebrewDiacritics(String(entry?.hebrew || "")).trim();
    const english = String(entry?.english || "").trim();
    if (!hebrew || !english) {
      return;
    }

    const identity = `${hebrew}||${english.toLowerCase()}`;
    if (seen.has(identity)) {
      return;
    }

    seen.add(identity);
    mergedWords.push({
      ...entry,
      english,
      hebrew: String(entry.hebrew).trim(),
      transliteration: String(entry?.transliteration || "").trim(),
    });
  });

  return mergedWords;
}

function stripHebrewDiacritics(value) {
  return String(value || "").replace(/[\u0591-\u05C7]/g, "");
}

function hasHebrewNikkud(value) {
  return /[\u0591-\u05C7]/.test(String(value || ""));
}

function buildHebrewDisplay(hebrew, transliteration) {
  const rawHebrew = String(hebrew || "").trim();
  if (!rawHebrew) {
    return "";
  }

  if (/[\u0591-\u05C7]/.test(rawHebrew)) {
    return rawHebrew;
  }

  if (HEBREW_NIKKUD_OVERRIDES[rawHebrew]) {
    return HEBREW_NIKKUD_OVERRIDES[rawHebrew];
  }

  const transliterationWords = String(transliteration || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const hebrewWords = rawHebrew.split(/\s+/).filter(Boolean);

  if (hebrewWords.length && hebrewWords.length === transliterationWords.length) {
    return hebrewWords
      .map((word, index) => buildHebrewWordWithNikkud(word, transliterationWords[index]))
      .join(" ");
  }

  return buildHebrewWordWithNikkud(rawHebrew, transliteration);
}

function buildHebrewWordWithNikkud(word, transliteration) {
  const rawWord = String(word || "").trim();
  if (!rawWord) {
    return "";
  }

  if (HEBREW_NIKKUD_OVERRIDES[rawWord]) {
    return HEBREW_NIKKUD_OVERRIDES[rawWord];
  }

  const letters = Array.from(rawWord);
  const tokens = tokenizeHebrewTransliterationWord(transliteration);
  if (!tokens.length) {
    return rawWord;
  }

  const pointedLetters = [];
  let tokenIndex = 0;

  for (let index = 0; index < letters.length; index += 1) {
    const letter = letters[index];
    if (!isHebrewLetter(letter)) {
      pointedLetters.push(letter);
      continue;
    }

    const nextLetter = letters[index + 1] || "";
    const currentToken = tokens[tokenIndex];
    let renderedLetter = letter;

    if (currentToken?.type === "c" && matchesHebrewConsonant(letter, currentToken.value)) {
      tokenIndex += 1;
    }

    const vowelToken = tokens[tokenIndex];
    const vowelInfo =
      vowelToken?.type === "v"
        ? describeHebrewVowel(
            vowelToken.value,
            nextLetter,
            letter,
            index === letters.length - 1,
            nextLetter === "ה" && index === letters.length - 2
          )
        : null;

    if (vowelInfo) {
      renderedLetter += vowelInfo.mark || "";
      pointedLetters.push(renderedLetter);

      if (vowelInfo.consumeNext === "yod" && nextLetter === "י") {
        pointedLetters.push("י");
        index += 1;
      } else if (vowelInfo.consumeNext === "vav" && nextLetter === "ו") {
        pointedLetters.push(vowelInfo.nextLetterText || "ו");
        index += 1;
      }

      tokenIndex += 1;
      continue;
    }

    if (tokens[tokenIndex]?.type === "c" && nextLetter && shouldAddHebrewSheva(letter, nextLetter)) {
      renderedLetter += "ְ";
    }

    pointedLetters.push(renderedLetter);
  }

  return pointedLetters.join("");
}

function tokenizeHebrewTransliterationWord(value) {
  const normalized = String(value || "")
    .split(",")[0]
    .toLowerCase()
    .replaceAll("’", "'")
    .replaceAll("‘", "'")
    .replaceAll("sch", "sh")
    .replaceAll("tsh", "ch")
    .replaceAll("-", " ")
    .replaceAll("'", "")
    .replace(/[^a-z\s]/g, " ")
    .trim();

  if (!normalized) {
    return [];
  }

  const tokens = [];
  const chunks = normalized.split(/\s+/).filter(Boolean);

  chunks.forEach((chunk) => {
    let index = 0;
    while (index < chunk.length) {
      if (isLatinVowel(chunk[index])) {
        let vowelEnd = index + 1;
        while (vowelEnd < chunk.length && isLatinVowel(chunk[vowelEnd])) {
          vowelEnd += 1;
        }
        tokens.push({ type: "v", value: chunk.slice(index, vowelEnd) });
        index = vowelEnd;
        continue;
      }

      let consonantEnd = index + 1;
      while (consonantEnd < chunk.length && !isLatinVowel(chunk[consonantEnd])) {
        consonantEnd += 1;
      }

      splitHebrewConsonantRun(chunk.slice(index, consonantEnd)).forEach((cluster) => {
        tokens.push({ type: "c", value: cluster });
      });
      index = consonantEnd;
    }
  });

  return tokens;
}

function splitHebrewConsonantRun(value) {
  const clusters = [];
  let index = 0;
  while (index < value.length) {
    const remaining = value.slice(index);
    if (remaining.startsWith("sh")) {
      clusters.push("sh");
      index += 2;
      continue;
    }
    if (remaining.startsWith("kh")) {
      clusters.push("kh");
      index += 2;
      continue;
    }
    if (remaining.startsWith("ch")) {
      clusters.push("ch");
      index += 2;
      continue;
    }
    if (remaining.startsWith("ts")) {
      clusters.push("ts");
      index += 2;
      continue;
    }
    if (remaining.startsWith("tz")) {
      clusters.push("tz");
      index += 2;
      continue;
    }

    clusters.push(remaining[0]);
    index += 1;
  }

  return clusters;
}

function isLatinVowel(character) {
  return ["a", "e", "i", "o", "u"].includes(character);
}

function isHebrewLetter(value) {
  return /^[\u05d0-\u05ea]$/.test(value);
}

function matchesHebrewConsonant(letter, cluster) {
  const normalizedLetter = normalizeHebrewLetterForMatch(letter);
  switch (normalizedLetter) {
    case "א":
    case "ע":
      return false;
    case "ב":
      return cluster === "b" || cluster === "v";
    case "ג":
      return cluster === "g" || cluster === "j";
    case "ד":
      return cluster === "d";
    case "ה":
      return cluster === "h";
    case "ו":
      return cluster === "v" || cluster === "w";
    case "ז":
      return cluster === "z";
    case "ח":
      return cluster === "ch" || cluster === "kh" || cluster === "h";
    case "ט":
      return cluster === "t";
    case "י":
      return cluster === "y";
    case "כ":
      return cluster === "k" || cluster === "kh" || cluster === "ch";
    case "ל":
      return cluster === "l";
    case "מ":
      return cluster === "m";
    case "נ":
      return cluster === "n";
    case "ס":
      return cluster === "s";
    case "פ":
      return cluster === "p" || cluster === "f";
    case "צ":
      return cluster === "ts" || cluster === "tz" || cluster === "z";
    case "ק":
      return cluster === "k" || cluster === "q" || cluster === "c";
    case "ר":
      return cluster === "r";
    case "ש":
      return cluster === "sh" || cluster === "s";
    case "ת":
      return cluster === "t";
    default:
      return false;
  }
}

function normalizeHebrewLetterForMatch(letter) {
  switch (letter) {
    case "ך":
      return "כ";
    case "ם":
      return "מ";
    case "ן":
      return "נ";
    case "ף":
      return "פ";
    case "ץ":
      return "צ";
    default:
      return letter;
  }
}

function describeHebrewVowel(
  value,
  nextLetter,
  currentLetter,
  isFinalLetter = false,
  isFollowedByFinalHe = false
) {
  const normalized = String(value || "").toLowerCase();
  if (!normalized) {
    return null;
  }

  if ((normalized.startsWith("ei") || normalized.startsWith("ey")) && nextLetter === "י") {
    return { mark: "ֵ", consumeNext: "yod" };
  }

  if ((normalized.startsWith("ai") || normalized.startsWith("ay")) && nextLetter === "י") {
    return { mark: "ַ", consumeNext: "yod" };
  }

  if ((normalized.startsWith("oi") || normalized.startsWith("oy")) && nextLetter === "י") {
    return { mark: "ֹ", consumeNext: "yod" };
  }

  if (normalized.startsWith("o") && nextLetter === "ו") {
    return { mark: "", consumeNext: "vav", nextLetterText: "וֹ" };
  }

  if (normalized.startsWith("u") && nextLetter === "ו") {
    return { mark: "", consumeNext: "vav", nextLetterText: "וּ" };
  }

  if (normalized.startsWith("i") && nextLetter === "י") {
    return { mark: "ִ", consumeNext: "yod" };
  }

  if (normalized.startsWith("a")) {
    if ((currentLetter === "ה" && isFinalLetter) || isFollowedByFinalHe) {
      return { mark: "ָ" };
    }

    return { mark: "ַ" };
  }

  if (normalized.startsWith("e")) {
    return { mark: "ֶ" };
  }

  if (normalized.startsWith("i")) {
    return { mark: "ִ" };
  }

  if (normalized.startsWith("o")) {
    return { mark: "ֹ" };
  }

  if (normalized.startsWith("u")) {
    return { mark: "ֻ" };
  }

  return null;
}

function shouldAddHebrewSheva(letter, nextLetter) {
  return isHebrewLetter(letter) && isHebrewLetter(nextLetter);
}

function applyHebrewSentenceNikkud(value) {
  const rawText = String(value || "");
  if (!rawText || /[\u0591-\u05C7]/.test(rawText) || !/[\u05D0-\u05EA]/.test(rawText)) {
    return rawText;
  }

  if (HEBREW_SENTENCE_NIKKUD_OVERRIDES[rawText]) {
    return HEBREW_SENTENCE_NIKKUD_OVERRIDES[rawText];
  }

  if (HEBREW_POINTED_WORD_LOOKUP.has(rawText)) {
    return HEBREW_POINTED_WORD_LOOKUP.get(rawText);
  }

  if (HEBREW_NIKKUD_OVERRIDES[rawText]) {
    return HEBREW_NIKKUD_OVERRIDES[rawText];
  }

  let pointedText = rawText;
  HEBREW_MULTI_WORD_NIKKUD_OVERRIDES.forEach(([source, target]) => {
    const pattern = new RegExp(`(^|[^\\u05D0-\\u05EA])${escapeRegExp(source)}(?=$|[^\\u05D0-\\u05EA])`, "g");
    pointedText = pointedText.replace(pattern, (match, prefix) => `${prefix}${target}`);
  });

  return pointedText.replace(/[\u05D0-\u05EA]+/g, (word) => {
    if (HEBREW_SENTENCE_NIKKUD_OVERRIDES[word]) {
      return HEBREW_SENTENCE_NIKKUD_OVERRIDES[word];
    }

    if (HEBREW_POINTED_WORD_LOOKUP.has(word)) {
      return HEBREW_POINTED_WORD_LOOKUP.get(word);
    }

    if (HEBREW_NIKKUD_OVERRIDES[word]) {
      return HEBREW_NIKKUD_OVERRIDES[word];
    }

    return word;
  });
}

function applyHebrewSentenceNikkudList(values) {
  return Array.isArray(values) ? values.map((value) => applyHebrewSentenceNikkud(value)) : [];
}

function shouldHideHebrewDragPrompt(questionText) {
  const normalized = String(questionText || "").trim();
  if (!normalized) {
    return false;
  }

  return [
    "השלימו את המשפט.",
    "הַשְׁלִימוּ אֶת הַמִּשְׁפָּט.",
    "גררו את המילים למקום הנכון במשפט.",
    "גִּרְרוּ אֶת הַמִּלִּים לַמָּקוֹם הַנָּכוֹן בַּמִּשְׁפָּט.",
  ].includes(normalized);
}

function buildScienceQuestionBank(entries) {
  return entries
    .filter((entry) => Array.isArray(entry.incorrectAnswers) && entry.incorrectAnswers.length === 3)
    .filter((entry) => !SCIENCE_EXCLUDED_PATTERNS.some((pattern) => pattern.test(entry.question)))
    .map((entry) => {
      const difficulty = getEntryDifficulty(entry.difficulty);
      const options = shuffleArray([entry.correctAnswer, ...entry.incorrectAnswers]).map(String);
      if (difficulty === null) {
        return null;
      }

      if (!hasDistinctChoiceMeanings(options)) {
        return null;
      }

      return {
        question: entry.question,
        options,
        answer: entry.correctAnswer,
        difficulty,
        type: "science-choice",
      };
    })
    .filter(Boolean);
}

function buildStaticChoiceBank(entries, type) {
  return entries
    .map((entry) => normalizeChoiceBankEntry(entry, type))
    .filter(Boolean);
}

function buildStaticDragQuestionBank(entries, type) {
  return entries
    .map((entry) => normalizeDragQuestionEntry(entry, type))
    .filter(Boolean);
}

function normalizeChoiceBankEntry(entry, type) {
  const difficulty = getEntryDifficulty(entry?.difficulty);
  const options = Array.from(new Set((entry?.options || []).map(String)));
  const answer = String(entry?.answer || "");
  if (
    difficulty === null ||
    !answer ||
    options.length !== 4 ||
    !options.includes(answer) ||
    !hasDistinctChoiceMeanings(options)
  ) {
    return null;
  }

  return {
    question: String(entry?.question || ""),
    options,
    answer,
    difficulty,
    type,
    visualHtml: typeof entry?.visualHtml === "string" ? entry.visualHtml : "",
    visualSummary:
      typeof entry?.visualSummary === "string"
        ? entry.visualSummary
        : typeof entry?.passage === "string"
          ? entry.passage
          : "",
    displayText: typeof entry?.displayText === "string" ? entry.displayText : "",
    extraText: typeof entry?.extraText === "string" ? entry.extraText : "",
    extraHtml: typeof entry?.extraHtml === "string" ? entry.extraHtml : "",
    reviewText:
      typeof entry?.reviewText === "string"
        ? entry.reviewText
        : typeof entry?.passage === "string"
          ? entry.passage
          : "",
  };
}

function normalizeDragQuestionEntry(entry, type) {
  const difficulty = getEntryDifficulty(entry?.difficulty);
  const templateParts = Array.isArray(entry?.templateParts)
    ? entry.templateParts.map((item) => String(item))
    : [];
  const choices = Array.isArray(entry?.choices)
    ? Array.from(new Set(entry.choices.map((item) => String(item))))
    : [];
  const answer = Array.isArray(entry?.answer) ? entry.answer.map((item) => String(item)) : [];
  const reviewText =
    typeof entry?.reviewText === "string"
      ? entry.reviewText
      : typeof entry?.displayText === "string"
      ? entry.displayText
      : buildDragTemplateText(templateParts);

  if (
    difficulty === null ||
    !String(entry?.question || "").trim() ||
    templateParts.length !== answer.length + 1 ||
    answer.length < 1 ||
    choices.length < answer.length ||
    !answer.every((token) => choices.includes(token))
  ) {
    return null;
  }

  return {
    question: String(entry.question),
    difficulty,
    type,
    templateParts,
    choices,
    answer,
    extraText: typeof entry?.extraText === "string" ? entry.extraText : "",
    reviewText,
    isHebrew: Boolean(entry?.isHebrew),
  };
}

function hasDistinctChoiceMeanings(options) {
  return new Set(options.map(getChoiceMeaningKey)).size === options.length;
}

function getChoiceMeaningKey(value) {
  const normalized = String(value)
    .trim()
    .toLowerCase()
    .replaceAll(",", "")
    .replace(/\s+/g, " ");

  const minutesMatch = normalized.match(/^(about )?(\d+) minutes?$/);
  if (minutesMatch) {
    return `duration:${Number(minutesMatch[2])}`;
  }

  const hoursMatch = normalized.match(/^(about )?(\d+) hours?$/);
  if (hoursMatch) {
    return `duration:${Number(hoursMatch[2]) * 60}`;
  }

  const halfHoursMatch = normalized.match(/^(about )?(\d+) and a half hours?$/);
  if (halfHoursMatch) {
    return `duration:${Number(halfHoursMatch[2]) * 60 + 30}`;
  }

  if (/^(about )?half an hour$/.test(normalized) || /^(about )?half hour$/.test(normalized)) {
    return "duration:30";
  }

  return normalized;
}

function getEntryDifficulty(value) {
  const difficulty = Number(value);
  if (!Number.isInteger(difficulty) || difficulty < 1 || difficulty > MAX_SESSION_DIFFICULTY) {
    return null;
  }

  return difficulty;
}

function isAdultUserId(userId) {
  return String(userId || "") === ADULT_USER_ID;
}

function isAdultUserSelected() {
  return isAdultUserId(state.currentUserId);
}

function isGuestUserId(userId) {
  return String(userId || "") === "guest";
}

function isGuestUserSelected() {
  return isGuestUserId(state.currentUserId);
}

function getProfileDefaultDifficulty(profile, fallback = 3) {
  const explicitDifficulty = Number.parseInt(profile?.defaultDifficulty, 10);
  if (Number.isFinite(explicitDifficulty)) {
    return normalizeSessionDifficulty(explicitDifficulty, fallback);
  }

  const categoryDifficulties =
    profile?.categoryDifficulties && typeof profile.categoryDifficulties === "object"
      ? Object.values(profile.categoryDifficulties)
      : [];
  const normalizedDifficulties = categoryDifficulties
    .map((difficulty) => Number.parseInt(difficulty, 10))
    .filter(Number.isFinite)
    .map((difficulty) => normalizeSessionDifficulty(difficulty, fallback));

  return normalizedDifficulties.length
    ? Math.max(...normalizedDifficulties)
    : normalizeSessionDifficulty(fallback, 3);
}

function getUserSessionBaseDifficulty(userId, fallback = 3) {
  const profile = USER_PROFILE_MAP[userId];
  return getProfileDefaultDifficulty(profile, fallback);
}

function normalizeCategoryDifficultyMap(categoryDifficulties, fallbackDifficulty = 3) {
  const fallback = normalizeSessionDifficulty(fallbackDifficulty, 3);
  const source = categoryDifficulties && typeof categoryDifficulties === "object"
    ? categoryDifficulties
    : {};

  return Object.fromEntries(
    SESSION_CATEGORY_ORDER.map((category) => [
      category,
      normalizeSessionDifficulty(source[category], fallback),
    ])
  );
}

function getUserCategoryDifficultyMap(userId, fallbackDifficulty = 3) {
  const profile = USER_PROFILE_MAP[userId];
  const fallback = isGuestUserId(userId)
    ? normalizeSessionDifficulty(fallbackDifficulty, 3)
    : getProfileDefaultDifficulty(profile, fallbackDifficulty);

  return normalizeCategoryDifficultyMap(profile?.categoryDifficulties, fallback);
}

function getCategoryDifficultyFromMap(categoryDifficulties, category, fallbackDifficulty = 3) {
  const normalizedMap = normalizeCategoryDifficultyMap(categoryDifficulties, fallbackDifficulty);
  return normalizedMap[category] || normalizeSessionDifficulty(fallbackDifficulty, 3);
}

function isReviewFocusEnabledForUser(userId = state.currentUserId) {
  return USER_PROFILE_MAP[userId]?.enableReviewFocus !== false;
}

function isHebrewWritingTailEnabledForUser(userId = state.currentUserId) {
  return USER_PROFILE_MAP[userId]?.enableHebrewWritingTail !== false;
}

function getSessionHebrewBanksForUser(userId) {
  if (isAdultUserId(userId)) {
    return MIRANDA_HEBREW_BANKS;
  }

  return DEFAULT_HEBREW_BANKS;
}

function initializeUserSelector() {
  state.currentUserId = loadSelectedUserId();
  applyUserDefaultDifficulty(state.currentUserId);
  applyUserDefaultSessionMode();
  renderUserSelector();
  updateStartControlsForCurrentUser();
}

function renderUserSelector() {
  if (!elements.userSelector) {
    return;
  }

  elements.userSelector.innerHTML = "";

  USER_PROFILES.forEach((profile) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "user-card";
    button.dataset.userId = profile.id;
    button.setAttribute("aria-pressed", profile.id === state.currentUserId ? "true" : "false");
    button.classList.toggle("active", profile.id === state.currentUserId);
    button.innerHTML = `
      <span class="user-card-avatar" aria-hidden="true">${buildUserAvatarMarkup(profile)}</span>
      <span class="user-card-name">${escapeHtml(profile.name)}</span>
    `;
    button.addEventListener("click", () => selectUser(profile.id));
    elements.userSelector.appendChild(button);
  });
}

function selectUser(userId) {
  if (!USER_PROFILES.some((profile) => profile.id === userId)) {
    return;
  }

  state.currentUserId = userId;
  writeSelectedUserId(userId);
  applyUserDefaultDifficulty(userId);
  applyUserDefaultSessionMode();
  renderUserSelector();
  updateStartControlsForCurrentUser();

  if (!elements.historyScreen.hidden) {
    renderHistoryScreen();
  }

  if (elements.dashboardScreen && !elements.dashboardScreen.hidden) {
    state.dashboardUserId = userId;
    renderDashboardScreen();
  }
}

function applyUserDefaultDifficulty(userId) {
  const profile = USER_PROFILE_MAP[userId];
  elements.difficultyLevel.value = String(getProfileDefaultDifficulty(profile, 3));
  updateDifficultyControl();
}

function applyUserDefaultSessionMode() {
  setHebrewOnlySelection(false);
  setSessionPreset(SESSION_PRESETS.adaptive);
}

function loadSelectedUserId() {
  const storage = getSessionStorage();
  if (!storage) {
    return USER_PROFILES[0].id;
  }

  try {
    const rawValue = String(storage.getItem(SELECTED_USER_STORAGE_KEY) || "");
    const normalizedUserId = rawValue === "adult" ? ADULT_USER_ID : rawValue;
    return USER_PROFILES.some((profile) => profile.id === normalizedUserId)
      ? normalizedUserId
      : USER_PROFILES[0].id;
  } catch {
    return USER_PROFILES[0].id;
  }
}

function writeSelectedUserId(userId) {
  const storage = getSessionStorage();
  if (!storage) {
    return;
  }

  try {
    storage.setItem(SELECTED_USER_STORAGE_KEY, userId);
  } catch {}
}

function getCurrentUserProfile() {
  return USER_PROFILES.find((profile) => profile.id === state.currentUserId) || USER_PROFILES[0];
}

function buildUserAvatarMarkup(profile) {
  const palette = profile.palette;
  const hairMarkupByStyle = {
    longHair: `
      <path d="M22 36c0-14 9-24 22-24s22 10 22 24v19c-4 7-12 13-22 13S26 62 22 55z" fill="${palette.hair}" opacity="0.95"></path>
      <path d="M24 36c2-12 10-21 20-21 11 0 19 7 21 18-4-4-10-6-17-6-9 0-16 4-24 9z" fill="${palette.hair}"></path>
    `,
    curlyHair: `
      <g fill="${palette.hair}">
        <circle cx="29" cy="24" r="6"></circle>
        <circle cx="37" cy="20" r="7"></circle>
        <circle cx="46" cy="19" r="7"></circle>
        <circle cx="55" cy="21" r="6"></circle>
        <circle cx="61" cy="27" r="5"></circle>
        <circle cx="27" cy="30" r="5"></circle>
      </g>
      <path d="M25 37c2-9 9-15 19-15 10 0 18 6 20 16-5-4-10-6-17-6-9 0-15 2-22 5z" fill="${palette.hair}"></path>
    `,
    lightCurls: `
      <g fill="${palette.hair}">
        <circle cx="30" cy="24" r="5"></circle>
        <circle cx="38" cy="20" r="6"></circle>
        <circle cx="46" cy="19" r="6"></circle>
        <circle cx="54" cy="21" r="5"></circle>
        <circle cx="59" cy="27" r="4.5"></circle>
        <circle cx="28" cy="29" r="4.5"></circle>
        <circle cx="34" cy="17" r="4"></circle>
      </g>
      <path d="M26 37c2-10 9-16 18-16 10 0 18 6 19 16-4-3-10-5-17-5s-14 2-20 5z" fill="${palette.hair}"></path>
    `,
    girlCurls: `
      <path d="M22 36c0-13 9-23 22-23s22 10 22 23v18c-4 8-12 14-22 14s-18-6-22-14z" fill="${palette.hair}" opacity="0.92"></path>
      <g fill="${palette.hair}">
        <circle cx="28" cy="27" r="6"></circle>
        <circle cx="33" cy="21" r="6"></circle>
        <circle cx="41" cy="18" r="6.5"></circle>
        <circle cx="50" cy="19" r="6"></circle>
        <circle cx="57" cy="23" r="5.5"></circle>
        <circle cx="62" cy="30" r="5"></circle>
        <circle cx="25" cy="35" r="5"></circle>
        <circle cx="63" cy="38" r="4.5"></circle>
      </g>
      <path d="M24 37c3-10 10-16 20-16 11 0 18 6 20 16-5-3-11-5-18-5-8 0-15 2-22 5z" fill="${palette.hair}"></path>
    `,
    adultBun: `
      <circle cx="58" cy="17" r="8" fill="${palette.hair}"></circle>
      <path d="M24 36c2-13 10-22 20-22 11 0 19 8 21 20-4-3-10-5-17-5-9 0-16 3-24 7z" fill="${palette.hair}"></path>
      <path d="M23 37c0-12 9-21 21-21s21 9 21 21v7c-5-5-13-8-21-8s-16 3-21 8z" fill="${palette.hair}" opacity="0.96"></path>
    `,
    sidePart: `
      <path d="M23 36c1-12 10-21 21-21 12 0 20 8 21 20-4-2-10-4-18-4-8 0-16 2-24 5z" fill="${palette.hair}"></path>
      <path d="M24 36c0-11 9-20 20-20 6 0 12 2 16 6-6 0-10 2-14 5-5 3-11 6-22 9z" fill="${palette.hair}" opacity="0.94"></path>
      <path d="M30 23c6-7 18-9 27-2" fill="none" stroke="${palette.hair}" stroke-width="3.2" stroke-linecap="round"></path>
    `,
  };
  const hairMarkup = hairMarkupByStyle[profile.avatarStyle] || hairMarkupByStyle.curlyHair;
  return `
    <svg viewBox="0 0 88 88" class="user-avatar-svg" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="avatar-${profile.id}-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${palette.sky}"></stop>
          <stop offset="100%" stop-color="#ffffff"></stop>
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="80" height="80" rx="24" fill="url(#avatar-${profile.id}-bg)"></rect>
      ${hairMarkup}
      <circle cx="44" cy="38" r="19" fill="#f4c9a8"></circle>
      <circle cx="37" cy="39" r="2" fill="${palette.eyes}"></circle>
      <circle cx="51" cy="39" r="2" fill="${palette.eyes}"></circle>
      <path d="M38 48c2 3 10 3 12 0" fill="none" stroke="#9b5c4d" stroke-width="2" stroke-linecap="round"></path>
      <path d="M24 70c4-12 13-18 20-18 8 0 17 6 20 18" fill="${palette.shirt}"></path>
      <circle cx="67" cy="20" r="7" fill="${palette.accent}"></circle>
    </svg>
  `;
}

function setButtonPressedState(button, isActive) {
  if (!button) {
    return;
  }

  button.classList.toggle("active", Boolean(isActive));
  button.setAttribute("aria-pressed", isActive ? "true" : "false");
}

function normalizeSessionDifficulty(value, fallback = 3) {
  const parsedValue = Number.parseInt(value, 10);
  if (!Number.isFinite(parsedValue)) {
    return fallback;
  }

  return Math.max(1, Math.min(MAX_SESSION_DIFFICULTY, parsedValue));
}

function getCoreNumericGeneratorDifficulty(value) {
  return Math.min(7, normalizeSessionDifficulty(value));
}

function getDifficultyPresentation(difficulty) {
  const normalizedDifficulty = normalizeSessionDifficulty(difficulty);
  const style = DIFFICULTY_LEVEL_STYLES[normalizedDifficulty] || DIFFICULTY_LEVEL_STYLES[3];
  const progress =
    MAX_SESSION_DIFFICULTY <= 1
      ? "100%"
      : `${((normalizedDifficulty - 1) / (MAX_SESSION_DIFFICULTY - 1)) * 100}%`;

  return {
    normalizedDifficulty,
    accent: style.accent,
    text: style.text,
    progress,
  };
}

function updateStartControlsForCurrentUser() {
  const isAdult = isAdultUserSelected();
  const isGuest = isGuestUserSelected();
  const currentUser = getCurrentUserProfile();
  const builderLocked = isAdult;

  syncSessionPresetForHebrewOnly();

  if (isAdult && elements.questionCount) {
    elements.questionCount.value = String(ADULT_SESSION_DEFAULT_QUESTION_COUNT);
    updateQuestionCountButtons();
  }

  if (elements.difficultyLabel) {
    elements.difficultyLabel.textContent = "Difficulty";
  }

  if (elements.hebrewOnlyButton) {
    updateHebrewOnlyButton();
  }

  if (elements.difficultyLevel) {
    elements.difficultyLevel.disabled = !isGuest;
    elements.difficultyLevel.title = isGuest
      ? ""
      : `${currentUser.name}'s difficulty is set by topic.`;
  }

  if (elements.sessionBuilder) {
    elements.sessionBuilder.classList.toggle("disabled", builderLocked);
  }

  elements.sessionPresetButtons.forEach((button) => {
    button.disabled = builderLocked;
    button.title = builderLocked ? `${currentUser.name}'s session settings are preset.` : "";
  });

  updateDifficultyControl();
}

function initializeQuestionCountButtons() {
  elements.questionCountButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const questionCount = button.dataset.questionCount;
      if (!questionCount) {
        return;
      }

      elements.questionCount.value = questionCount;
      updateQuestionCountButtons();
    });
  });

  updateQuestionCountButtons();
}

function updateQuestionCountButtons() {
  const selectedCount = String(elements.questionCount.value || "30");

  elements.questionCountButtons.forEach((button) => {
    const isActive = button.dataset.questionCount === selectedCount;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function initializeSessionBuilder() {
  elements.sessionPresetButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applySessionPreset(button.dataset.sessionPreset || SESSION_PRESETS.adaptive);
    });
  });

  updateSessionPresetButtons();
}

function setHebrewOnlySelection(isHebrewOnly) {
  if (elements.hebrewOnly) {
    elements.hebrewOnly.value = String(Boolean(isHebrewOnly));
  }
  updateHebrewOnlyButton();
}

function applySessionPreset(preset) {
  const normalizedPreset = Object.prototype.hasOwnProperty.call(SESSION_PRESETS, preset)
    ? SESSION_PRESETS[preset]
    : SESSION_PRESETS.adaptive;

  if (normalizedPreset === SESSION_PRESETS.adaptive) {
    setHebrewOnlySelection(false);
  } else if (normalizedPreset === SESSION_PRESETS["math-heavy"]) {
    setHebrewOnlySelection(false);
  } else if (normalizedPreset === SESSION_PRESETS.hebrew) {
    setHebrewOnlySelection(true);
  }

  setSessionPreset(normalizedPreset);
  updateStartControlsForCurrentUser();
}

function setSessionPreset(preset) {
  state.sessionPreset = Object.values(SESSION_PRESETS).includes(preset) ? preset : SESSION_PRESETS.adaptive;
  updateSessionPresetButtons();
}

function updateSessionPresetButtons() {
  elements.sessionPresetButtons.forEach((button) => {
    const isActive = button.dataset.sessionPreset === state.sessionPreset;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function getPresetCategories(preset = state.sessionPreset) {
  if (preset === SESSION_PRESETS["math-heavy"]) {
    return SESSION_CATEGORY_ORDER.filter((category) => EXTENDED_MATH_CATEGORIES.has(category));
  }

  if (preset === SESSION_PRESETS.hebrew) {
    return ["hebrew"];
  }

  return SESSION_CATEGORY_ORDER;
}

function getSessionBuilderOptions() {
  return {
    minDifficulty: 1,
    selectedCategories: getPresetCategories(),
    adaptiveReview: true,
    sessionPreset: state.sessionPreset,
  };
}

function initializeDifficultyControl() {
  elements.difficultyLevel?.addEventListener("input", () => {
    updateDifficultyControl();
  });
  elements.difficultyLevel?.addEventListener("change", () => {
    updateDifficultyControl();
  });

  updateDifficultyControl();
}

function initializeHebrewOnlyButton() {
  elements.hebrewOnlyButton?.addEventListener("click", () => {
    elements.hebrewOnly.value = String(!isHebrewOnlySelected());
    syncSessionPresetForHebrewOnly();
    updateHebrewOnlyButton();
    updateStartControlsForCurrentUser();
  });

  syncSessionPresetForHebrewOnly();
  updateHebrewOnlyButton();
}

function updateDifficultyControl() {
  if (!elements.difficultyLevel) {
    return;
  }

  const { normalizedDifficulty, accent, text, progress } = getDifficultyPresentation(
    elements.difficultyLevel.value
  );
  elements.difficultyLevel.value = String(normalizedDifficulty);
  elements.difficultySelector?.style.setProperty("--difficulty-accent", accent);
  elements.difficultySelector?.style.setProperty("--difficulty-text", text);
  elements.difficultySelector?.style.setProperty("--difficulty-progress", progress);
  elements.difficultySelector?.setAttribute("data-disabled", elements.difficultyLevel.disabled ? "true" : "false");

  if (elements.difficultyValue) {
    elements.difficultyValue.textContent = String(normalizedDifficulty);
    elements.difficultyValue.setAttribute("aria-label", `Difficulty level ${normalizedDifficulty}`);
  }
}

function isHebrewOnlySelected() {
  return String(elements.hebrewOnly?.value || "").toLowerCase() === "true";
}

function syncSessionPresetForHebrewOnly() {
  if (!isHebrewOnlySelected()) {
    return;
  }

  setSessionPreset(SESSION_PRESETS.hebrew);
}

function updateHebrewOnlyButton() {
  const isActive = isHebrewOnlySelected();
  elements.hebrewOnlyButton?.classList.toggle("active", isActive);
  elements.hebrewOnlyButton?.setAttribute("aria-pressed", isActive ? "true" : "false");
}

function hasAdultSessionResources(options = {}) {
  const hebrewBanks = getSessionHebrewBanksForUser(ADULT_USER_ID);

  if (options.hebrewOnly) {
    return hebrewBanks.questionBank.length > 0 && hebrewBanks.reverseQuestionBank.length > 0;
  }

  return (
    hebrewBanks.questionBank.length > 0 &&
    hebrewBanks.reverseQuestionBank.length > 0 &&
    adultHebrewQuestionBank.length > 0 &&
    adultHebrewReverseQuestionBank.length > 0 &&
    adultSentenceDragQuestionBank.length > 0 &&
    adultContextQuestionBank.length > 0 &&
    adultCategorySortGroups.length > 0 &&
    adultReadingBlueprints.length > 0 &&
    adultWritingPromptBank.length > 0
  );
}

function validateHomeworkQuestionShape(question, context = "question") {
  const errors = [];
  const addError = (message) => errors.push(`${context}: ${message}`);

  if (!question || typeof question !== "object") {
    return [`${context}: missing question object`];
  }

  if (!["choice", "input", "drag", "practice"].includes(question.mode)) {
    addError(`unsupported mode "${question.mode}"`);
  }

  if (!String(question.type || "").trim()) {
    addError("missing type");
  }

  if (!Number.isFinite(Number(question.difficulty))) {
    addError("missing numeric difficulty");
  }

  if (question.mode === "choice") {
    const options = Array.isArray(question.options) ? question.options.map(String) : [];
    if (options.length < 2 || options.length > 4) {
      addError("choice questions need 2 to 4 options");
    }
    if (new Set(options).size !== options.length) {
      addError("choice options must be unique");
    }
    if (!options.includes(String(question.answerValue))) {
      addError("choice answer must appear in options");
    }
  }

  if (question.mode === "input" && String(question.answerValue ?? "").trim() === "") {
    addError("input questions need an answer");
  }

  if (question.mode === "drag") {
    const usesMatchingLayout = question.dragLayout === "matching";
    if (usesMatchingLayout) {
      if (!Array.isArray(question.matchLeftItems) || !question.matchLeftItems.length) {
        addError("matching drag questions need left items");
      }
      if (!Array.isArray(question.matchRightItems) || !question.matchRightItems.length) {
        addError("matching drag questions need right items");
      }
    } else if (!Array.isArray(question.dragChoices) || !question.dragChoices.length) {
      addError("drag questions need choices");
    }

    if (!Array.isArray(question.dragAnswerTokens) || !question.dragAnswerTokens.length) {
      addError("drag questions need answer tokens");
    }
  }

  return errors;
}

function validateHomeworkQuestionList(questions, context = "session") {
  const errors = [];
  if (!Array.isArray(questions) || !questions.length) {
    return [`${context}: no questions were generated`];
  }

  questions.forEach((question, index) => {
    errors.push(...validateHomeworkQuestionShape(question, `${context} question ${index + 1}`));
  });

  return errors;
}

function startSession(event) {
  event.preventDefault();

  const totalQuestions = Number.parseInt(elements.questionCount.value, 10);
  const selectedDifficulty = Number.parseInt(elements.difficultyLevel.value, 10);
  const selectedHebrewOnly = isHebrewOnlySelected();
  const isAdult = isAdultUserSelected();
  const isGuest = isGuestUserSelected();
  const difficulty = isAdult
    ? FIXED_ADULT_SESSION_DIFFICULTY
    : isGuest
      ? selectedDifficulty
      : getUserSessionBaseDifficulty(state.currentUserId, selectedDifficulty);
  const categoryDifficulties = getUserCategoryDifficultyMap(state.currentUserId, difficulty);
  const hebrewCategoryDifficulty = getCategoryDifficultyFromMap(categoryDifficulties, "hebrew", difficulty);
  const sessionBuilderOptions = getSessionBuilderOptions();
  const hebrewOnly = selectedHebrewOnly;

  if (!Number.isFinite(totalQuestions) || !QUESTION_COUNT_OPTIONS.includes(totalQuestions)) {
    showStartMessage("Please choose one of the question counts shown.", "error");
    return;
  }

  if (!isAdult && (!Number.isFinite(difficulty) || difficulty < 1 || difficulty > MAX_SESSION_DIFFICULTY)) {
    showStartMessage(`Please choose a difficulty from 1 to ${MAX_SESSION_DIFFICULTY}.`, "error");
    return;
  }

  if (isAdult) {
    if (!hasAdultSessionResources({ hebrewOnly })) {
      showStartMessage("Miranda's Hebrew module is missing required data.", "error");
      return;
    }
  } else {
    const requiredChoiceBanks = hebrewOnly
      ? [choiceCategoryConfigs.hebrew]
      : Object.values(choiceCategoryConfigs);
    if (requiredChoiceBanks.some(({ bank }) => !bank.length)) {
      showStartMessage(
        hebrewOnly ? "The Hebrew question bank is missing." : "One of the offline question files is missing.",
        "error"
      );
      return;
    }
  }

  clearStartMessage();
  stopConfetti();
  clearSpeedRoundTimer();
  state.difficulty = difficulty;
  state.categoryDifficulties = categoryDifficulties;
  state.hebrewOnly = hebrewOnly;
  state.currentRound = "main";
  state.speedRound = createEmptySpeedRoundState();
  state.currentIndex = 0;
  state.viewIndex = 0;
  state.answeredCount = 0;
  state.correctCount = 0;
  state.answerResults = [];
  state.answerSelections = [];
  state.sessionRecords = [];
  state.sessionStartedAt = new Date();
  state.feedbackMessage = "";
  state.feedbackTone = "";
  let sessionQuestions;
  try {
    sessionQuestions = isAdult
      ? hebrewOnly
          ? buildHebrewOnlySessionQuestions(totalQuestions, ADULT_USER_ID)
          : buildAdultSessionQuestions(totalQuestions)
      : isGeographyMapPrototypeMode()
        ? buildSessionQuestions(totalQuestions, difficulty, {
            hebrewOnly: false,
            userId: state.currentUserId,
            categoryDifficulties,
          })
        : injectHebrewWritingPracticeTail(
            buildSessionQuestions(totalQuestions, difficulty, {
              hebrewOnly,
              userId: state.currentUserId,
              categoryDifficulties,
              ...sessionBuilderOptions,
            }),
            hebrewCategoryDifficulty,
            { hebrewOnly }
          );

    const validationErrors = validateHomeworkQuestionList(sessionQuestions, "session");
    if (validationErrors.length) {
      throw new Error(validationErrors.join("\n"));
    }
  } catch (error) {
    console.error(error);
    showStartMessage("Could not build a valid session. Please try a different topic or difficulty.", "error");
    return;
  }
  state.questions = sessionQuestions;
  state.totalQuestions = sessionQuestions.length;

  switchScreen(elements.quizScreen);
  renderCurrentQuestion();
}

function buildAdultSessionQuestions(totalQuestions) {
  const categorySequence = buildAdultSessionCategorySequence(totalQuestions);
  const hebrewBanks = getSessionHebrewBanksForUser(ADULT_USER_ID);
  const resources = {
    hebrew: createPool(hebrewBanks.questionBank),
    hebrewReverse: createPool(hebrewBanks.reverseQuestionBank),
    hebrewOpposites: createPool(hebrewBanks.oppositeQuestionBank),
    hebrewHomograph: createPool(hebrewBanks.homographQuestionBank),
    hebrewImage: createPool(hebrewBanks.imageQuestionBank),
    hebrewMeanings: hebrewBanks.meanings,
    adultWords: createPool(adultHebrewQuestionBank),
    adultReverse: createPool(adultHebrewReverseQuestionBank),
    adultContext: createPool(adultContextQuestionBank),
    adultSentenceDrag: createPool(adultSentenceDragQuestionBank),
    algebra: createPool(choiceCategoryConfigs.algebra.bank),
    estimation: createPool(choiceCategoryConfigs.estimation.bank),
    fractions: createPool(choiceCategoryConfigs.fractions.bank),
    "fractions-and-ratios": createPool(choiceCategoryConfigs["fractions-and-ratios"].bank),
    geography: createPool(choiceCategoryConfigs.geography.bank),
    logic: createPool(choiceCategoryConfigs.logic.bank),
    measurement: createPool(choiceCategoryConfigs.measurement.bank),
    population: createPool(choiceCategoryConfigs.population.bank),
  };
  const runtime = {
    adultGeographyQuestionIndex: 0,
    adultHebrewQuestionIndex: 0,
    adultHebrewDifficultyQueue: buildHebrewDifficultyQueue(
      categorySequence.filter((category) => category === "adult-hebrew").length,
      FIXED_ADULT_SESSION_DIFFICULTY,
      hebrewBanks.questionBank
    ),
    adultMathQuestionIndex: 0,
    adultWritingPromptQueue: [],
    hebrewStandardQuestionIndex: 0,
    mapCountries: new Set(),
  };
  return categorySequence.map((category) => createAdultSessionQuestion(category, resources, runtime));
}

function buildHebrewOnlySessionQuestions(totalQuestions, userId) {
  const hebrewBanks = getSessionHebrewBanksForUser(userId);
  const questions = buildSessionQuestions(totalQuestions, FIXED_ADULT_SESSION_DIFFICULTY, {
    hebrewOnly: true,
    hebrewBanks,
    userId,
  });

  return isHebrewWritingTailEnabledForUser(userId)
    ? injectHebrewWritingPracticeTail(questions, FIXED_ADULT_SESSION_DIFFICULTY, { hebrewOnly: true })
    : questions;
}

function buildAdultSessionCategorySequence(totalQuestions) {
  if (totalQuestions <= 0) {
    return [];
  }

  const sequence = Array.from({ length: totalQuestions }, (_, index) =>
    (index + 1) % ADULT_MATH_INTERVAL === 0 ? "adult-math" : "adult-hebrew"
  );
  const hebrewSlotIndexes = sequence
    .map((category, index) => (category === "adult-hebrew" ? index : -1))
    .filter((index) => index !== -1);
  const geographyQuestionCount = Math.min(
    hebrewSlotIndexes.length,
    Math.max(1, Math.round(totalQuestions * ADULT_GEOGRAPHY_SHARE))
  );
  pickDistributedIndexes(hebrewSlotIndexes.length, geographyQuestionCount)
    .map((slotIndex) => hebrewSlotIndexes[slotIndex])
    .forEach((questionIndex) => {
      sequence[questionIndex] = "adult-geography";
    });

  return sequence;
}

function pickDistributedIndexes(totalCount, selectionCount) {
  if (totalCount <= 0 || selectionCount <= 0) {
    return [];
  }

  const cappedSelectionCount = Math.min(totalCount, selectionCount);
  const indexes = [];

  for (let index = 0; index < cappedSelectionCount; index += 1) {
    indexes.push(
      Math.min(totalCount - 1, Math.floor(((index + 0.5) * totalCount) / cappedSelectionCount))
    );
  }

  return Array.from(new Set(indexes));
}

function createAdultSessionQuestion(category, resources, runtime) {
  if (category === "adult-math") {
    return createAdultHardMathQuestion(resources, runtime);
  }

  if (category === "adult-geography") {
    return createAdultGeographyQuestion(resources, runtime);
  }

  const difficulty = drawNextDifficulty(runtime?.adultHebrewDifficultyQueue || [], FIXED_ADULT_SESSION_DIFFICULTY);
  return createAdultHebrewSessionQuestion(resources, difficulty, runtime);
}

function createAdultHebrewSessionQuestion(resources, difficulty, runtime) {
  const startIndex = Number(runtime?.adultHebrewQuestionIndex || 0);
  if (runtime) {
    runtime.adultHebrewQuestionIndex = startIndex + 1;
  }

  const factories = [
    () => createHebrewSessionQuestion(resources, difficulty, runtime),
    () => createAdultHebrewChoiceQuestion(drawHebrewEntry(resources.adultWords, 1)),
    () => createHebrewSessionQuestion(resources, difficulty, runtime),
    () => createAdultHebrewReverseChoiceQuestion(resources),
    () => createHebrewSessionQuestion(resources, difficulty, runtime),
    () => createAdultMatchingQuestion(resources),
    () => createHebrewSessionQuestion(resources, difficulty, runtime),
    () => createAdultCategorySortQuestion(),
    () => createAdultContextChoiceQuestion(resources),
    () => createAdultSentenceDragQuestion(resources),
    () => createAdultReadingComprehensionQuestion(),
    () => createAdultWritingPracticeQuestionFromRuntime(runtime),
  ];

  for (let offset = 0; offset < factories.length; offset += 1) {
    const question = factories[(startIndex + offset) % factories.length]();
    if (question) {
      return question;
    }
  }

  return createHebrewSessionQuestion(resources, difficulty, runtime) ||
    createAdultHebrewChoiceQuestion(drawHebrewEntry(resources.adultWords, 1));
}

function createAdultHardMathQuestion(resources, runtime) {
  const difficulty = FIXED_ADULT_SESSION_DIFFICULTY;
  const startIndex = Number(runtime?.adultMathQuestionIndex || 0);
  if (runtime) {
    runtime.adultMathQuestionIndex = startIndex + 1;
  }

  const factories = [
    () => createMathChoiceQuestion(difficulty),
    () => createMathInputQuestion(difficulty),
    () => createStatisticsChoiceQuestion(difficulty),
    () => createAdultForcedCategoryQuestion("algebra", difficulty, resources),
    () => createAdultForcedCategoryQuestion("estimation", difficulty, resources),
    () => createAdultForcedCategoryQuestion("fractions", difficulty, resources),
    () => createAdultForcedCategoryQuestion("fractions-and-ratios", difficulty, resources),
    () => createAdultForcedCategoryQuestion("logic", difficulty, resources),
    () => createAdultForcedCategoryQuestion("measurement", difficulty, resources),
    () => createPercentageChoiceQuestion(difficulty),
  ];

  for (let offset = 0; offset < factories.length; offset += 1) {
    const question = factories[(startIndex + offset) % factories.length]();
    if (question) {
      return question;
    }
  }

  return createMathChoiceQuestion(difficulty);
}

function createAdultGeographyQuestion(resources, runtime) {
  const difficulty = FIXED_ADULT_SESSION_DIFFICULTY;
  const startIndex = Number(runtime?.adultGeographyQuestionIndex || 0);
  if (runtime) {
    runtime.adultGeographyQuestionIndex = startIndex + 1;
  }

  const categories = hasGeographyMapSupport()
    ? [RESERVED_MAP_CATEGORY, "population", "geography"]
    : ["population", "geography"];

  for (let offset = 0; offset < categories.length; offset += 1) {
    const category = categories[(startIndex + offset) % categories.length];
    const question =
      category === RESERVED_MAP_CATEGORY
        ? createGeographyMapQuestion(difficulty, runtime, resources)
        : createAdultForcedCategoryQuestion(category, difficulty, resources);
    if (question) {
      return question;
    }
  }

  return createAdultForcedCategoryQuestion("geography", difficulty, resources) || createMathChoiceQuestion(difficulty);
}

function createAdultForcedCategoryQuestion(category, difficulty, resources) {
  const generatedFactory = generatedChoiceCategoryConfigs[category]?.factory;
  if (generatedFactory) {
    try {
      const normalizedEntry = normalizeChoiceBankEntry(
        generatedFactory(difficulty),
        `${category}-choice`
      );
      if (normalizedEntry) {
        return createBankChoiceQuestion(normalizedEntry, `${category}-choice`);
      }
    } catch {
      // Fall back to the static bank when the generator cannot build a valid entry.
    }
  }

  const categoryConfig = choiceCategoryConfigs[category];
  const pool = resources?.[category];
  if (categoryConfig && pool?.entries?.length) {
    return categoryConfig.createQuestion(drawFromPool(pool, difficulty));
  }

  return null;
}

function createAdultWritingPracticeQuestionFromRuntime(runtime) {
  const prompt = drawAdultWritingPrompt(runtime);
  return prompt
    ? createHebrewWritingPracticeQuestion(prompt.text, prompt.difficulty, prompt.variant)
    : null;
}

function drawAdultWritingPrompt(runtime) {
  if (!runtime) {
    return adultWritingPromptBank[0] || null;
  }

  if (!Array.isArray(runtime.adultWritingPromptQueue) || !runtime.adultWritingPromptQueue.length) {
    runtime.adultWritingPromptQueue = shuffleArray([...adultWritingPromptBank]);
  }

  return runtime.adultWritingPromptQueue.pop() || null;
}

function normalizeAdultWritingPromptBank(entries) {
  return (entries || [])
    .map((entry) => {
      const text = String(typeof entry === "string" ? entry : entry?.text || "").trim();
      const variant = String(typeof entry === "string" ? "word" : entry?.variant || "word").trim();
      const requestedDifficulty = Number(typeof entry === "string" ? 3 : entry?.difficulty);
      const difficulty = Number.isInteger(requestedDifficulty)
        ? Math.max(1, Math.min(5, requestedDifficulty))
        : variant === "word"
          ? 3
          : variant === "short-sentence"
            ? 4
            : 5;

      if (!text) {
        return null;
      }

      return { text, variant, difficulty };
    })
    .filter(Boolean);
}

function buildSessionQuestions(totalQuestions, difficulty, options = {}) {
  const normalizedDifficulty = normalizeSessionDifficulty(difficulty, 1);
  const minDifficulty = Math.max(
    1,
    Math.min(normalizedDifficulty, Number(options.minDifficulty) || 1)
  );
  const hebrewOnly = Boolean(options.hebrewOnly);
  const userId = String(options.userId || state.currentUserId || "");
  const hebrewBanks = options.hebrewBanks || DEFAULT_HEBREW_BANKS;
  const hebrewQuestionMode = options.hebrewQuestionMode === "bank-only" ? "bank-only" : "default";
  const categoryDifficulties = normalizeCategoryDifficultyMap(options.categoryDifficulties, normalizedDifficulty);
  const categorySequence = hebrewOnly
    ? Array.from({ length: totalQuestions }, () => "hebrew")
    : buildDefaultSessionCategorySequence(totalQuestions, userId, options);
  const resources = Object.fromEntries(
    Object.entries(choiceCategoryConfigs).map(([category, config]) => [
      category,
      createPool(config.bank),
    ])
  );
  resources.sentenceDragEnglish = createPool(sentenceDragEnglishQuestionBank);
  resources.sentenceDragHebrew = createPool(sentenceDragHebrewQuestionBank);
  resources.hebrew = createPool(hebrewBanks.questionBank);
  resources.hebrewImage = createPool(hebrewBanks.imageQuestionBank);
  resources.hebrewReverse = createPool(hebrewBanks.reverseQuestionBank);
  resources.hebrewOpposites = createPool(hebrewBanks.oppositeQuestionBank);
  resources.hebrewHomograph = createPool(hebrewBanks.homographQuestionBank);
  resources.hebrewMeanings = hebrewBanks.meanings;
  const categoryCounts = countCategorySequence(categorySequence);
  const hebrewQuestionCount = categorySequence.filter((category) => category === "hebrew").length;
  const nonHebrewDifficultyQueues = Object.fromEntries(
    Object.entries(categoryCounts)
      .filter(([category]) => category !== "hebrew")
      .map(([category, count]) => {
        const categoryDifficulty = getCategoryDifficultyFromMap(
          categoryDifficulties,
          category,
          normalizedDifficulty
        );
        const categoryMinDifficulty = Math.min(minDifficulty, categoryDifficulty);

        return [
          category,
          buildDifficultyQueue(
            count,
            applyMinimumDifficultyWeightMap(
              NON_HEBREW_DIFFICULTY_WEIGHTS[categoryDifficulty] || { [categoryDifficulty]: 1 },
              categoryMinDifficulty
            )
          ),
        ];
      })
  );
  const hebrewCategoryDifficulty = getCategoryDifficultyFromMap(categoryDifficulties, "hebrew", normalizedDifficulty);
  const hebrewMinDifficulty = Math.min(minDifficulty, hebrewCategoryDifficulty);
  const hebrewDifficultyQueue = buildHebrewDifficultyQueue(
    hebrewQuestionCount,
    hebrewCategoryDifficulty,
    hebrewBanks.questionBank,
    hebrewMinDifficulty
  );

  const runtime = {
    categoryDifficulties,
    hebrewQuestionMode,
    mathModeIndex: 0,
    languageQuestionIndex: 0,
    hebrewQuestionIndex: 0,
    hebrewStandardQuestionIndex: 0,
    mapCountries: new Set(),
  };

  return categorySequence.map((category) =>
    createSessionQuestionForCategory(
      category,
      normalizedDifficulty,
      resources,
      nonHebrewDifficultyQueues,
      hebrewDifficultyQueue,
      runtime
    )
  );
}

function injectHebrewWritingPracticeTail(questions, difficulty, options = {}) {
  const requestedTailCount = Math.min(
    questions.length,
    options.hebrewOnly ? HEBREW_ONLY_WRITING_TAIL_COUNT : DEFAULT_HEBREW_WRITING_TAIL_COUNT
  );
  const practiceCount = Math.min(requestedTailCount, Math.max(0, questions.length - 1));
  const readingQuestion =
    questions.length > 0 ? createHebrewReadingComprehensionQuestion(difficulty) : null;
  if (!practiceCount && !readingQuestion) {
    return questions;
  }

  const practiceQuestions = buildHebrewWritingPracticeQuestions(practiceCount, difficulty);
  const prefixCount = Math.max(
    0,
    questions.length - practiceQuestions.length - (readingQuestion ? 1 : 0)
  );

  return [
    ...questions.slice(0, prefixCount),
    ...(readingQuestion ? [readingQuestion] : []),
    ...practiceQuestions,
  ];
}

function buildHebrewWritingPracticeQuestions(totalCount, difficulty) {
  const normalizedDifficulty = Math.max(2, normalizeSessionDifficulty(difficulty, 2));
  if (normalizedDifficulty <= 2) {
    return takeRepeatedRandomItems(HEBREW_WRITING_LETTERS, totalCount).map((letter) =>
      createHebrewWritingPracticeQuestion(letter, normalizedDifficulty, "letter")
    );
  }

  if (normalizedDifficulty === 3) {
    return takeRepeatedRandomItems(buildHebrewWritingWordPool(), totalCount).map((word) =>
      createHebrewWritingPracticeQuestion(word, normalizedDifficulty, "word")
    );
  }

  if (normalizedDifficulty === 4) {
    return takeRepeatedRandomItems(HEBREW_WRITING_SHORT_SENTENCES, totalCount).map((sentence) =>
      createHebrewWritingPracticeQuestion(sentence, normalizedDifficulty, "short-sentence")
    );
  }

  if (normalizedDifficulty === 5) {
    return takeRepeatedRandomItems(HEBREW_WRITING_LONG_SENTENCES, totalCount).map((sentence) =>
      createHebrewWritingPracticeQuestion(sentence, normalizedDifficulty, "long-sentence")
    );
  }

  if (normalizedDifficulty <= 7) {
    return takeRepeatedRandomItems(HEBREW_WRITING_MEDIUM_SENTENCES, totalCount).map((sentence) =>
      createHebrewWritingPracticeQuestion(sentence, normalizedDifficulty, "long-sentence")
    );
  }

  return takeRepeatedRandomItems(HEBREW_WRITING_ADVANCED_SENTENCES, totalCount).map((sentence) =>
    createHebrewWritingPracticeQuestion(sentence, normalizedDifficulty, "long-sentence")
  );
}

function buildHebrewWritingWordPool() {
  const seen = new Set();
  const bankWords = hebrewQuestionBank
    .map((entry) => stripHebrewDiacritics(entry.hebrew))
    .filter((word) => /^[\u05D0-\u05EA]{2,7}$/.test(word))
    .filter((word) => !seen.has(word) && seen.add(word));

  if (bankWords.length >= 12) {
    return bankWords;
  }

  return Array.from(new Set([...bankWords, ...HEBREW_WRITING_WORD_FALLBACKS]));
}

function takeRepeatedRandomItems(values, count) {
  if (!Array.isArray(values) || !values.length || count <= 0) {
    return [];
  }

  const result = [];
  let pool = [];

  while (result.length < count) {
    if (!pool.length) {
      pool = shuffleArray([...values]);
    }

    result.push(pool.pop());
  }

  return result;
}

function buildDefaultSessionCategorySequence(totalQuestions, userId = state.currentUserId, options = {}) {
  if (isGeographyMapPrototypeMode()) {
    return Array.from({ length: getGeographyMapPrototypeQuestionCount() }, () => RESERVED_MAP_CATEGORY);
  }

  const selectedCategories = normalizeSelectedSessionCategories(options.selectedCategories);
  const reviewCategorySequence = buildReviewCategorySequence(totalQuestions, userId, {
    adaptiveReview: options.adaptiveReview,
    selectedCategories,
  });
  const regularQuestionCount = Math.max(
    0,
    totalQuestions - reviewCategorySequence.length
  );
  const categoryCounts = allocateCategoryCounts(
    regularQuestionCount,
    selectedCategories,
    options.sessionPreset
  );
  const regularCategorySequence = buildCategorySequence(regularQuestionCount, categoryCounts, selectedCategories);

  return [
    ...reviewCategorySequence,
    ...regularCategorySequence,
  ];
}

function normalizeSelectedSessionCategories(categories) {
  const selected = Array.isArray(categories)
    ? categories.filter((category) => SESSION_CATEGORY_ORDER.includes(category))
    : SESSION_CATEGORY_ORDER;

  return selected.length ? Array.from(new Set(selected)) : SESSION_CATEGORY_ORDER;
}

function countCategorySequence(categorySequence) {
  return categorySequence.reduce((counts, category) => {
    counts[category] = (counts[category] || 0) + 1;
    return counts;
  }, {});
}

function hasGeographyMapSupport() {
  const geographyMapModule = getQuestionModule(RESERVED_MAP_CATEGORY);
  return (
    typeof geographyMapModule?.generatedEntryFactory === "function" &&
    Array.isArray(globalThis.GEOGRAPHY_MAP_COUNTRIES) &&
    globalThis.GEOGRAPHY_MAP_COUNTRIES.length > 0
  );
}

function isGeographyMapPrototypeMode() {
  return (
    globalThis.GEOGRAPHY_MAP_RENDER_MODE === "shared-base-prototype" &&
    hasGeographyMapSupport()
  );
}

function getGeographyMapPrototypeQuestionCount() {
  return Array.isArray(globalThis.GEOGRAPHY_MAP_COUNTRIES)
    ? globalThis.GEOGRAPHY_MAP_COUNTRIES.length
    : 0;
}

function createSessionQuestionForCategory(
  category,
  difficulty,
  resources,
  nonHebrewDifficultyQueues,
  hebrewDifficultyQueue,
  runtime
) {
  const categoryDifficulty = getCategoryDifficultyFromMap(
    runtime?.categoryDifficulties,
    category,
    difficulty
  );

  if (category === "math") {
    const effectiveDifficulty = drawNextDifficulty(
      nonHebrewDifficultyQueues?.[category] || [],
      categoryDifficulty
    );
    const question =
      runtime.mathModeIndex % 2 === 0
        ? createMathInputQuestion(effectiveDifficulty)
        : createMathChoiceQuestion(effectiveDifficulty);
    runtime.mathModeIndex += 1;
    return question;
  }

  if (category === "hebrew") {
    const effectiveDifficulty = drawNextDifficulty(hebrewDifficultyQueue, categoryDifficulty);
    const hebrewQuestionIndex = Number(runtime?.hebrewQuestionIndex || 0);
    if (runtime) {
      runtime.hebrewQuestionIndex = hebrewQuestionIndex + 1;
    }

    if (runtime?.hebrewQuestionMode !== "bank-only" && shouldCreateHebrewFinalLetterQuestion(hebrewQuestionIndex)) {
      const finalLetterQuestion = createHebrewFinalLetterQuestion(effectiveDifficulty);
      if (finalLetterQuestion) {
        return finalLetterQuestion;
      }
    }

    if (runtime?.hebrewQuestionMode !== "bank-only") {
      const dragQuestion = maybeCreateSessionDragQuestion(category, resources, effectiveDifficulty, runtime);
      if (dragQuestion) {
        return dragQuestion;
      }
    }

    return createHebrewSessionQuestion(resources, effectiveDifficulty, runtime);
  }

  const effectiveDifficulty = drawNextDifficulty(
    nonHebrewDifficultyQueues?.[category] || [],
    categoryDifficulty
  );

  if (category === RESERVED_MAP_CATEGORY) {
    return createGeographyMapQuestion(effectiveDifficulty, runtime, resources);
  }

  const dragQuestion = maybeCreateSessionDragQuestion(category, resources, effectiveDifficulty, runtime);
  if (dragQuestion) {
    return dragQuestion;
  }

  if (category === "time") {
    return createTimeChoiceQuestion(effectiveDifficulty);
  }

  if (category === "statistics") {
    return createStatisticsChoiceQuestion(effectiveDifficulty);
  }

  if (category === "charts-and-graphs") {
    if (generatedChoiceCategoryConfigs["charts-and-graphs"]?.factory && Math.random() < 0.45) {
      const generatedChartQuestion = createChartsAndGraphsGeneratedChoiceQuestion(effectiveDifficulty);
      if (generatedChartQuestion) {
        return generatedChartQuestion;
      }
    }

    if (resources["charts-and-graphs"]?.entries.length && Math.random() >= 0.8) {
      return createBankChoiceQuestion(
        drawFromPool(resources["charts-and-graphs"], effectiveDifficulty),
        "charts-and-graphs-choice"
      );
    }

    return createChartsAndGraphsQuestion(effectiveDifficulty);
  }

  if (category === "science") {
    const generatedQuestion = createGeneratedCategoryQuestion(category, effectiveDifficulty);
    if (generatedQuestion) {
      return generatedQuestion;
    }

    return createBankChoiceQuestion(drawFromPool(resources.science, effectiveDifficulty), "science-choice");
  }

  const categoryConfig = choiceCategoryConfigs[category];
  if (categoryConfig) {
    const generatedQuestion = createGeneratedCategoryQuestion(category, effectiveDifficulty);
    if (generatedQuestion) {
      return generatedQuestion;
    }

    return categoryConfig.createQuestion(drawFromPool(resources[category], effectiveDifficulty));
  }

  throw new Error(`Unknown session category: ${category}`);
}

function createChartsAndGraphsGeneratedChoiceQuestion(difficulty) {
  const factory = generatedChoiceCategoryConfigs["charts-and-graphs"]?.factory;
  const normalizedEntry = factory
    ? normalizeChoiceBankEntry(factory(difficulty), "charts-and-graphs-choice")
    : null;

  return normalizedEntry
    ? createBankChoiceQuestion(normalizedEntry, "charts-and-graphs-choice")
    : null;
}

function createGeographyMapQuestion(difficulty, runtime, resources) {
  const excludedCountries = runtime?.mapCountries ? Array.from(runtime.mapCountries) : [];
  const geographyMapModule = getQuestionModule(RESERVED_MAP_CATEGORY);
  const rawEntry =
    typeof geographyMapModule?.generatedEntryFactory === "function"
      ? geographyMapModule.generatedEntryFactory(difficulty, excludedCountries)
      : null;
  const normalizedEntry = normalizeChoiceBankEntry(rawEntry, "geography-choice");

  if (normalizedEntry) {
    runtime?.mapCountries?.add(normalizedEntry.answer);
    return createBankChoiceQuestion(normalizedEntry, "geography-choice");
  }

  const generatedQuestion = createGeneratedCategoryQuestion("geography", difficulty);
  if (generatedQuestion) {
    return generatedQuestion;
  }

  return choiceCategoryConfigs.geography.createQuestion(drawFromPool(resources.geography, difficulty));
}

function maybeCreateLanguageDragQuestion(category, resources, difficulty, runtime) {
  if (category !== "vocabulary-grammar" && category !== "hebrew") {
    return null;
  }

  runtime.languageQuestionIndex += 1;
  if (!LANGUAGE_DRAG_INTERVAL || runtime.languageQuestionIndex % LANGUAGE_DRAG_INTERVAL !== 0) {
    return null;
  }

  const isHebrew = category === "hebrew";
  return createLanguageDragQuestion(resources, difficulty, isHebrew);
}

function maybeCreateSessionDragQuestion(category, resources, difficulty, runtime) {
  const languageDragQuestion = maybeCreateLanguageDragQuestion(category, resources, difficulty, runtime);
  if (languageDragQuestion) {
    return languageDragQuestion;
  }

  return maybeCreateGeneratedCategoryDragQuestion(category, difficulty);
}

function maybeCreateGeneratedCategoryDragQuestion(category, difficulty) {
  const share = GENERATED_CATEGORY_DRAG_SHARES[category];
  if (!share || typeof createCategoryGeneratedDragQuestion !== "function" || Math.random() >= share) {
    return null;
  }

  try {
    const question = createCategoryGeneratedDragQuestion(category, difficulty);
    return question?.mode === "drag" ? question : null;
  } catch {
    return null;
  }
}

function createLanguageDragQuestion(resources, difficulty, isHebrew) {
  const type = isHebrew ? "hebrew-drag" : "vocabulary-grammar-drag";
  const generatedEntry = isHebrew
    ? createHebrewSentenceDragEntry(difficulty)
    : createEnglishSentenceDragEntry(difficulty);

  if (generatedEntry) {
    return createBankDragQuestion(generatedEntry, type);
  }

  const pool = isHebrew ? resources.sentenceDragHebrew : resources.sentenceDragEnglish;
  if (pool?.entries.length) {
    return createBankDragQuestion(drawFromPool(pool, difficulty), type);
  }

  return null;
}

function createEnglishSentenceDragEntry(difficulty) {
  if (typeof createEnglishSentenceDragGeneratedEntry !== "function") {
    return null;
  }

  return normalizeDragQuestionEntry(
    createEnglishSentenceDragGeneratedEntry(difficulty),
    "vocabulary-grammar-drag"
  );
}

function createHebrewSentenceDragEntry(difficulty) {
  if (typeof createHebrewSentenceDragGeneratedEntry !== "function") {
    return null;
  }

  return normalizeDragQuestionEntry(createHebrewSentenceDragGeneratedEntry(difficulty), "hebrew-drag");
}

function maybeCreateHebrewImageQuestion(resources, difficulty) {
  if (!resources?.hebrewImage?.entries.length || Math.random() >= HEBREW_IMAGE_DRAG_SHARE) {
    return null;
  }

  const entries = drawHebrewImageEntries(resources.hebrewImage, difficulty, 3);
  return entries.length === 3 ? createHebrewImageDragQuestion(entries, difficulty) : null;
}

function drawHebrewImageEntries(pool, difficulty, count) {
  if (!pool?.entries?.length || count <= 0) {
    return [];
  }

  const exactEntries = pool.entriesByDifficulty.get(difficulty) || [];
  const eligibleEntries = pool.entries.filter((entry) => entry.difficulty <= difficulty);
  const source =
    exactEntries.length >= count
      ? exactEntries
      : eligibleEntries.length >= count
        ? eligibleEntries
        : pool.entries;

  return shuffleArray([...source]).slice(0, count);
}

function buildReviewCategorySequence(totalQuestions, userId = state.currentUserId, options = {}) {
  const adaptiveReview = options.adaptiveReview ?? isReviewFocusEnabledForUser(userId);
  if (!adaptiveReview) {
    return [];
  }

  const reviewQuestionCount = Math.min(
    Math.max(0, totalQuestions - 1),
    Math.max(0, Math.round(totalQuestions * REVIEW_FOCUS_SHARE))
  );
  if (!reviewQuestionCount) {
    return [];
  }

  const sessionHistoryByUser = loadAllSessionHistory();
  const sessionHistory = Array.isArray(sessionHistoryByUser[userId]) ? sessionHistoryByUser[userId] : [];
  const allowedCategories = new Set(normalizeSelectedSessionCategories(options.selectedCategories));
  const weaknessEntries = getUserWeakCategoryEntries(sessionHistory)
    .filter((entry) => allowedCategories.has(entry.category))
    .slice(0, 3);
  if (!weaknessEntries.length) {
    return [];
  }

  const counts = allocateWeightedCategoryCounts(weaknessEntries, reviewQuestionCount);
  const reviewCategories = weaknessEntries.flatMap((entry) =>
    Array.from({ length: counts[entry.category] || 0 }, () => entry.category)
  );

  return interleaveReviewCategories(reviewCategories);
}

function getUserWeakCategoryEntries(sessionHistory) {
  const stats = new Map();

  sessionHistory.forEach((session, sessionIndex) => {
    const sessionWeight = Math.pow(REVIEW_RECENCY_DECAY, sessionIndex);

    (session.records || []).forEach((record) => {
      const category = String(record?.category || "").trim();
      if (!SESSION_CATEGORY_ORDER.includes(category) || !REVIEW_FOCUS_ALLOWED_CATEGORIES.has(category)) {
        return;
      }

      if (!stats.has(category)) {
        stats.set(category, { category, attempts: 0, wrong: 0 });
      }

      const entry = stats.get(category);
      entry.attempts += sessionWeight;
      if (!record.isCorrect) {
        entry.wrong += sessionWeight;
      }
    });
  });

  return Array.from(stats.values())
    .filter((entry) => entry.wrong > 0)
    .map((entry) => ({
      category: entry.category,
      score: entry.wrong / (entry.attempts + 1.5),
      wrong: entry.wrong,
    }))
    .sort((left, right) => right.score - left.score || right.wrong - left.wrong);
}

function allocateWeightedCategoryCounts(entries, total) {
  const counts = Object.fromEntries(entries.map((entry) => [entry.category, 0]));
  const totalWeight = entries.reduce((sum, entry) => sum + entry.score, 0);
  if (totalWeight <= 0) {
    return counts;
  }

  let assigned = 0;
  const ranked = entries.map((entry) => {
    const exact = (entry.score / totalWeight) * total;
    const whole = Math.floor(exact);
    counts[entry.category] = whole;
    assigned += whole;
    return { category: entry.category, remainder: exact - whole };
  });

  ranked.sort((left, right) => right.remainder - left.remainder).forEach((entry) => {
    if (assigned < total) {
      counts[entry.category] += 1;
      assigned += 1;
    }
  });

  return counts;
}

function interleaveReviewCategories(categories) {
  const remaining = categories.reduce((map, category) => {
    map.set(category, (map.get(category) || 0) + 1);
    return map;
  }, new Map());
  const sequence = [];
  let previousCategory = "";

  while (remaining.size) {
    const nextCategory = Array.from(remaining.entries())
      .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
      .find(([category]) => category !== previousCategory)?.[0]
      || Array.from(remaining.keys())[0];

    sequence.push(nextCategory);
    previousCategory = nextCategory;
    const nextCount = (remaining.get(nextCategory) || 0) - 1;
    if (nextCount > 0) {
      remaining.set(nextCategory, nextCount);
    } else {
      remaining.delete(nextCategory);
    }
  }

  return sequence;
}

function allocateCategoryCounts(
  totalQuestions,
  selectedCategories = SESSION_CATEGORY_ORDER,
  sessionPreset = SESSION_PRESETS.adaptive
) {
  const categories = normalizeSelectedSessionCategories(selectedCategories);
  if (!totalQuestions) {
    return Object.fromEntries(categories.map((category) => [category, 0]));
  }

  if (
    sessionPreset === SESSION_PRESETS["math-heavy"] ||
    categories.length !== SESSION_CATEGORY_ORDER.length
  ) {
    const weights = Object.fromEntries(
      categories.map((category) => [
        category,
        sessionPreset === SESSION_PRESETS["math-heavy"] && EXTENDED_MATH_CATEGORIES.has(category)
          ? 3
          : category === "math"
            ? 1.5
            : 1,
      ])
    );
    return allocateWeightedCategoryCounts(
      categories.map((category) => ({ category, score: weights[category] || 1 })),
      totalQuestions
    );
  }

  const coreCategories = CORE_SESSION_CATEGORIES.filter((category) => categories.includes(category));
  const nonCoreCategories = NON_CORE_SESSION_CATEGORIES.filter((category) => categories.includes(category));
  const coreTotal = coreCategories.length
    ? Math.min(totalQuestions, Math.max(1, Math.round(totalQuestions * CORE_CATEGORY_SHARE)))
    : 0;
  const otherTotal = totalQuestions - coreTotal;

  return {
    ...allocateEvenCounts(coreCategories, coreTotal),
    ...allocateNonCoreCategoryCounts(otherTotal, nonCoreCategories),
  };
}

function allocateNonCoreCategoryCounts(total, categories = NON_CORE_SESSION_CATEGORIES) {
  if (total <= 0) {
    return Object.fromEntries(categories.map((category) => [category, 0]));
  }

  return allocateEvenCounts(categories, total);
}

function allocateEvenCounts(categories, total) {
  if (!categories.length) {
    return {};
  }

  const counts = Object.fromEntries(categories.map((category) => [category, 0]));
  const base = Math.floor(total / categories.length);
  const remainder = total % categories.length;

  categories.forEach((category) => {
    counts[category] = base;
  });

  shuffleArray([...categories])
    .slice(0, remainder)
    .forEach((category) => {
      counts[category] += 1;
    });

  return counts;
}

function buildCategorySequence(totalQuestions, categoryCounts, categories = SESSION_CATEGORY_ORDER) {
  const sequence = [];
  const usedCounts = Object.fromEntries(
    categories.map((category) => [category, 0])
  );

  for (let slot = 0; slot < totalQuestions; slot += 1) {
    let bestCategory = null;
    let bestScore = Number.NEGATIVE_INFINITY;

    for (const category of categories) {
      if (usedCounts[category] >= categoryCounts[category]) {
        continue;
      }

      const score = (((slot + 1) * categoryCounts[category]) / totalQuestions) - usedCounts[category];
      if (score > bestScore) {
        bestScore = score;
        bestCategory = category;
        continue;
      }

      if (score === bestScore && bestCategory !== null) {
        const currentRemaining = categoryCounts[category] - usedCounts[category];
        const bestRemaining = categoryCounts[bestCategory] - usedCounts[bestCategory];
        if (currentRemaining > bestRemaining) {
          bestCategory = category;
        }
      }
    }

    if (bestCategory === null) {
      break;
    }

    sequence.push(bestCategory);
    usedCounts[bestCategory] += 1;
  }

  return sequence;
}

function createPool(entries) {
  const entriesByDifficulty = groupEntriesByDifficulty(entries);
  return {
    entries,
    entriesByDifficulty,
    queuesByDifficulty: new Map(),
  };
}

function groupEntriesByDifficulty(entries) {
  const grouped = new Map();

  entries.forEach((entry) => {
    if (!grouped.has(entry.difficulty)) {
      grouped.set(entry.difficulty, []);
    }

    grouped.get(entry.difficulty).push(entry);
  });

  return grouped;
}

function drawFromPool(pool, difficulty) {
  const source = getEntriesForDifficulty(pool, difficulty);
  let queue = pool.queuesByDifficulty.get(difficulty);

  if (!queue || !queue.length) {
    queue = shuffleArray([...source]);
    pool.queuesByDifficulty.set(difficulty, queue);
  }

  return queue.pop();
}

function drawHebrewEntry(pool, difficulty) {
  const source = pool.entriesByDifficulty.get(difficulty) || [];
  let queue = pool.queuesByDifficulty.get(`hebrew-${difficulty}`);

  if (!queue || !queue.length) {
    queue = shuffleArray([...(source.length ? source : pool.entries)]);
    pool.queuesByDifficulty.set(`hebrew-${difficulty}`, queue);
  }

  return queue.pop();
}

function getEntriesForDifficulty(pool, difficulty) {
  const exact = pool.entriesByDifficulty.get(difficulty) || [];
  return exact.length ? exact : pool.entries;
}

function buildDifficultyQueue(totalCount, weightMap) {
  if (totalCount <= 0) {
    return [];
  }

  const counts = allocateWeightedCounts(totalCount, weightMap);
  return shuffleArray(
    Object.entries(counts).flatMap(([difficulty, count]) => Array(count).fill(Number(difficulty)))
  );
}

function applyMinimumDifficultyWeightMap(weightMap, minDifficulty) {
  const filteredEntries = Object.entries(weightMap).filter(
    ([difficulty]) => Number(difficulty) >= minDifficulty
  );

  if (filteredEntries.length) {
    return Object.fromEntries(filteredEntries);
  }

  const highestDifficulty = Math.max(...Object.keys(weightMap).map(Number));
  return { [highestDifficulty]: 1 };
}

function buildHebrewDifficultyQueue(totalCount, sessionDifficulty, entries, minDifficulty = 1) {
  if (totalCount <= 0) {
    return [];
  }

  const availableLevels = [];
  for (let difficulty = Math.max(1, minDifficulty); difficulty <= sessionDifficulty; difficulty += 1) {
    if (entries.some((entry) => entry.difficulty === difficulty)) {
      availableLevels.push(difficulty);
    }
  }

  if (!availableLevels.length) {
    return [sessionDifficulty];
  }

  const counts = allocateEvenCounts(availableLevels, totalCount);
  return shuffleArray(
    availableLevels.flatMap((difficulty) => Array(counts[difficulty]).fill(difficulty))
  );
}

function drawNextDifficulty(queue, fallbackDifficulty) {
  return queue.length ? queue.pop() : fallbackDifficulty;
}

function allocateWeightedCounts(totalCount, weightMap) {
  const counts = {};
  const entries = Object.entries(weightMap).map(([difficulty, weight]) => ({
    difficulty: Number(difficulty),
    exactCount: totalCount * (Number(weight) || 0),
  }));

  let assignedTotal = 0;

  entries.forEach((entry) => {
    const baseCount = Math.floor(entry.exactCount);
    counts[entry.difficulty] = baseCount;
    assignedTotal += baseCount;
  });

  let remainder = totalCount - assignedTotal;
  const ranked = shuffleArray([...entries]).sort(
    (left, right) => (right.exactCount % 1) - (left.exactCount % 1)
  );

  for (let index = 0; index < ranked.length && remainder > 0; index += 1) {
    counts[ranked[index].difficulty] += 1;
    remainder -= 1;
  }

  return counts;
}

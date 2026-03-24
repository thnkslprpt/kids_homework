const VOCABULARY_GRAMMAR_DATA = (() => {
  function clampDifficulty(value) {
    const level = Number.parseInt(value, 10);
    if (!Number.isFinite(level)) {
      return 3;
    }

    return Math.min(5, Math.max(1, level));
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

  function makeOptions(answer, distractors) {
    const options = uniqueStrings([answer, ...distractors]);
    if (options.length !== 4 || !options.includes(String(answer))) {
      throw new Error("Vocabulary and grammar questions must have exactly 4 unique choices.");
    }

    return shuffleArray(options);
  }

  function buildQuestion({
    question,
    displayText = "",
    options,
    answer,
    difficulty,
  }) {
    if (!Array.isArray(options) || options.length !== 4) {
      throw new Error("Vocabulary and grammar questions must have exactly 4 options.");
    }

    if (!options.includes(answer)) {
      throw new Error("Vocabulary and grammar answer must be included in the options.");
    }

    return {
      question,
      displayText,
      options,
      answer,
      difficulty,
    };
  }

  function pick(values) {
    return values[Math.floor(Math.random() * values.length)];
  }

  const PREFIXES = [
    {
      prefix: "un-",
      meaning: "not",
      distractors: ["again", "before", "wrongly"],
      examples: ["unsafe", "unhappy", "uncover"],
    },
    {
      prefix: "re-",
      meaning: "again",
      distractors: ["not", "before", "wrongly"],
      examples: ["redo", "rewrite", "return"],
    },
    {
      prefix: "pre-",
      meaning: "before",
      distractors: ["not", "again", "wrongly"],
      examples: ["preview", "preheat", "pretest"],
    },
    {
      prefix: "dis-",
      meaning: "not or opposite of",
      distractors: ["again", "before", "wrongly"],
      examples: ["disagree", "dishonest", "dislike"],
    },
    {
      prefix: "mis-",
      meaning: "wrongly",
      distractors: ["not", "again", "before"],
      examples: ["misread", "misplace", "mishear"],
    },
  ];

  const ROOTS = [
    {
      root: "bio",
      meaning: "life",
      distractors: ["heat", "far", "write or draw"],
      examples: ["biology", "biography", "biodegradable"],
    },
    {
      root: "tele",
      meaning: "far",
      distractors: ["life", "heat", "write or draw"],
      examples: ["television", "telephone", "teleport"],
    },
    {
      root: "therm",
      meaning: "heat",
      distractors: ["life", "far", "write or draw"],
      examples: ["thermometer", "thermal", "thermostat"],
    },
    {
      root: "graph",
      meaning: "write or draw",
      distractors: ["life", "far", "heat"],
      examples: ["autograph", "telegraph", "graphic"],
    },
  ];

  const SYNONYMS = [
    { word: "quick", answer: "fast", distractors: ["slow", "tiny", "quiet"] },
    { word: "brave", answer: "courageous", distractors: ["careless", "shy", "tired"] },
    { word: "begin", answer: "start", distractors: ["finish", "hide", "build"] },
    { word: "tiny", answer: "small", distractors: ["tall", "loud", "wide"] },
  ];

  const HOMOPHONES = [
    {
      sentence: "The dog wagged ___ tail.",
      answer: "its",
      distractors: ["it's", "their", "there"],
    },
    {
      sentence: "We went ___ the park after school.",
      answer: "to",
      distractors: ["too", "two", "do"],
    },
    {
      sentence: "The children put ___ backpacks by the door.",
      answer: "their",
      distractors: ["there", "they're", "his"],
    },
  ];

  const CLOZES = [
    {
      sentence: "The puppy was ___, so it stayed close to Maya.",
      answer: "shy",
      distractors: ["loud", "hungry", "tall"],
    },
    {
      sentence: "The librarian asked us to whisper, because the room needed to stay ___.",
      answer: "quiet",
      distractors: ["bright", "crowded", "messy"],
    },
    {
      sentence: "We felt ___ after the long hike.",
      answer: "very tired",
      distractors: ["very angry", "very hungry", "very excited"],
    },
  ];

  const SENTENCE_EDITING = [
    {
      sentence: "my brother go to soccer practice on tuesdays",
      answer: "My brother goes to soccer practice on Tuesdays.",
      distractors: [
        "My brother go to soccer practice on Tuesdays.",
        "My brother goes to soccer practice in Tuesdays.",
        "My brother goes soccer practice on Tuesdays.",
      ],
    },
    {
      sentence: "the cat slept on the sofa and it was warm",
      answer: "The cat slept on the sofa, and it was warm.",
      distractors: [
        "The cat slept on the sofa and it were warm.",
        "The cat sleep on the sofa, and it was warm.",
        "The cat slept on the sofa, and they was warm.",
      ],
    },
  ];

  const GENERATOR_TYPES = {
    1: ["prefix", "synonym", "cloze"],
    2: ["prefix", "root", "synonym", "cloze"],
    3: ["root", "homophone", "cloze", "editing"],
    4: ["root", "homophone", "editing", "cloze"],
    5: ["homophone", "editing", "cloze", "root"],
  };

  function createPrefixQuestion(level) {
    const item = pick(PREFIXES);
    return buildQuestion({
      question: `What does the prefix ${item.prefix} mean in a word like ${pick(item.examples)}?`,
      options: makeOptions(item.meaning, item.distractors),
      answer: item.meaning,
      difficulty: level,
    });
  }

  function createRootQuestion(level) {
    const item = pick(ROOTS);
    return buildQuestion({
      question: `What does the root ${item.root} mean in a word like ${pick(item.examples)}?`,
      options: makeOptions(item.meaning, item.distractors),
      answer: item.meaning,
      difficulty: level,
    });
  }

  function createSynonymQuestion(level) {
    const item = pick(SYNONYMS);
    return buildQuestion({
      question: `Which word is closest in meaning to "${item.word}"?`,
      options: makeOptions(item.answer, item.distractors),
      answer: item.answer,
      difficulty: level,
    });
  }

  function createHomophoneQuestion(level) {
    const item = pick(HOMOPHONES);
    return buildQuestion({
      question: "Choose the word that best completes the sentence.",
      displayText: item.sentence,
      options: makeOptions(item.answer, item.distractors),
      answer: item.answer,
      difficulty: level,
    });
  }

  function createClozeQuestion(level) {
    const item = pick(CLOZES);
    const displayText = `Choose the best word to complete the sentence:\n"${item.sentence}"`;
    return buildQuestion({
      question: "Which word best completes the sentence?",
      displayText,
      options: makeOptions(item.answer, item.distractors),
      answer: item.answer,
      difficulty: level,
    });
  }

  function createSentenceEditingQuestion(level) {
    const item = pick(SENTENCE_EDITING);
    return buildQuestion({
      question: "Which sentence is written correctly?",
      displayText: "",
      options: makeOptions(item.answer, item.distractors),
      answer: item.answer,
      difficulty: level,
    });
  }

  function buildVocabularyGrammarGeneratedEntry(difficulty) {
    const level = clampDifficulty(difficulty);
    const type = pick(GENERATOR_TYPES[level] || GENERATOR_TYPES[3]);
    const generatorMap = {
      prefix: createPrefixQuestion,
      root: createRootQuestion,
      synonym: createSynonymQuestion,
      homophone: createHomophoneQuestion,
      cloze: createClozeQuestion,
      editing: createSentenceEditingQuestion,
    };

    return generatorMap[type](level);
  }

  const VOCABULARY_GRAMMAR_BANK = [
    createPrefixQuestion(1),
    createSynonymQuestion(1),
    createClozeQuestion(1),
    createPrefixQuestion(2),
    createRootQuestion(2),
    createSynonymQuestion(2),
    createHomophoneQuestion(3),
    createClozeQuestion(3),
    createSentenceEditingQuestion(3),
    createRootQuestion(4),
    createHomophoneQuestion(4),
    createSentenceEditingQuestion(4),
    createRootQuestion(5),
    createHomophoneQuestion(5),
    createSentenceEditingQuestion(5),
    createSynonymQuestion(5),
  ].map((entry) => ({
    question: entry.question,
    displayText: entry.displayText || "",
    options: entry.options,
    answer: entry.answer,
    difficulty: entry.difficulty,
  }));

  return {
    bank: VOCABULARY_GRAMMAR_BANK,
    createVocabularyGrammarGeneratedEntry: buildVocabularyGrammarGeneratedEntry,
  };
})();

const VOCABULARY_GRAMMAR_QUESTIONS = VOCABULARY_GRAMMAR_DATA.bank;

function createVocabularyGrammarGeneratedEntry(difficulty) {
  return VOCABULARY_GRAMMAR_DATA.createVocabularyGrammarGeneratedEntry(difficulty);
}

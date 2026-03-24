const VOCABULARY_QUESTIONS = [
  {
    question: "What does the prefix 'un-' mean in the word 'unhappy'?",
    options: ["Not", "Again", "Very", "Before"],
    answer: "Not",
    difficulty: 1,
  },
  {
    question: "What does the suffix '-ful' mean in the word 'helpful'?",
    options: ["Full of", "Without", "Before", "Against"],
    answer: "Full of",
    difficulty: 1,
  },
  {
    question: "Which word is a synonym for 'quick'?",
    options: ["Fast", "Slow", "Tiny", "Weak"],
    answer: "Fast",
    difficulty: 1,
  },
  {
    question: "Choose the correct word.",
    displayText: "The cat hid _____ the bed.",
    options: ["under", "over", "after", "loud"],
    answer: "under",
    difficulty: 1,
  },
  {
    question: "Which word means the opposite of 'cold'?",
    options: ["Warm", "Wet", "Small", "Sharp"],
    answer: "Warm",
    difficulty: 2,
  },
  {
    question: "What does the prefix 're-' mean in 'rewrite'?",
    options: ["Again", "Not", "Around", "Before"],
    answer: "Again",
    difficulty: 2,
  },
  {
    question: "Choose the correct word.",
    displayText: "I need _____ pencils.",
    options: ["two", "to", "too", "tree"],
    answer: "two",
    difficulty: 2,
  },
  {
    question: "Which sentence is correct?",
    options: [
      "She goes to school every day.",
      "She go to school every day.",
      "She going to school every day.",
      "She gone to school every day.",
    ],
    answer: "She goes to school every day.",
    difficulty: 2,
  },
  {
    question: "What does the suffix '-less' mean in 'hopeless'?",
    options: ["Without", "Full of", "Before", "After"],
    answer: "Without",
    difficulty: 3,
  },
  {
    question: "Which word is a synonym for 'tiny'?",
    options: ["Small", "Loud", "Heavy", "Busy"],
    answer: "Small",
    difficulty: 3,
  },
  {
    question: "Choose the correct word.",
    displayText: "The dog wagged _____ tail.",
    options: ["its", "it's", "their", "there"],
    answer: "its",
    difficulty: 3,
  },
  {
    question: "Which sentence has the best punctuation?",
    options: [
      "After lunch we played soccer.",
      "After lunch, we played soccer.",
      "After, lunch we played soccer.",
      "After lunch we, played soccer.",
    ],
    answer: "After lunch, we played soccer.",
    difficulty: 3,
  },
  {
    question: "What does the root 'port' mean in the word 'transport'?",
    options: ["Carry", "Write", "Listen", "Break"],
    answer: "Carry",
    difficulty: 4,
  },
  {
    question: "Choose the correct word.",
    displayText: "They left _____ bags by the door.",
    options: ["their", "there", "they're", "them"],
    answer: "their",
    difficulty: 4,
  },
  {
    question: "Which sentence is correct?",
    options: [
      "The children were excited for the trip.",
      "The children was excited for the trip.",
      "The children is excited for the trip.",
      "The children be excited for the trip.",
    ],
    answer: "The children were excited for the trip.",
    difficulty: 4,
  },
  {
    question: "What does the suffix '-tion' usually tell you?",
    options: ["The word names an action or process", "The word is a color", "The word is a number", "The word is a place"],
    answer: "The word names an action or process",
    difficulty: 4,
  },
  {
    question: "Which sentence uses the correct homophone?",
    options: [
      "I can hear the music.",
      "I can here the music.",
      "I can hear the musick.",
      "I can hair the music.",
    ],
    answer: "I can hear the music.",
    difficulty: 5,
  },
  {
    question: "Which word is the best synonym for 'careful'?",
    options: ["Cautious", "Careless", "Hungry", "Noisy"],
    answer: "Cautious",
    difficulty: 5,
  },
  {
    question: "Choose the best word.",
    displayText: "The coach told the team to _____ their shoes before practice.",
    options: ["tie", "tied", "tying", "ties"],
    answer: "tie",
    difficulty: 5,
  },
  {
    question: "Which sentence is the best revision?",
    options: [
      "The squirrel quickly climbed the tree.",
      "The squirrel quick climbed the tree.",
      "The squirrel quickly climb the tree.",
      "The squirrel quicky climbed the tree.",
    ],
    answer: "The squirrel quickly climbed the tree.",
    difficulty: 5,
  },
];

function createVocabularyGeneratedEntry(difficulty) {
  const level = clampVocabularyDifficulty(difficulty);
  const generators = {
    1: [createPrefixQuestion, createSynonymQuestion, createClozeQuestion],
    2: [createSuffixQuestion, createHomophoneQuestion, createGrammarQuestion],
    3: [createRootQuestion, createSynonymQuestion, createClozeQuestion],
    4: [createGrammarQuestion, createHomophoneQuestion, createSuffixQuestion],
    5: [createEditingQuestion, createRootQuestion, createClozeQuestion],
  }[level];

  return vocabularyRandomChoice(generators)();
}

function createPrefixQuestion() {
  const entries = [
    { prefix: "un-", meaning: "not", word: "unfair", answer: "not" },
    { prefix: "re-", meaning: "again", word: "replay", answer: "again" },
    { prefix: "dis-", meaning: "not or opposite of", word: "disagree", answer: "not or opposite of" },
  ];
  const entry = vocabularyRandomChoice(entries);
  return buildVocabularyQuestion({
    question: `What does the prefix "${entry.prefix}" mean in "${entry.word}"?`,
    options: vocabularyShuffleArray([entry.answer, "before", "full of", "without"]),
    answer: entry.answer,
    difficulty: 1,
    visualSummary: `The prefix ${entry.prefix} means ${entry.meaning}.`,
  });
}

function createSuffixQuestion() {
  const entries = [
    { suffix: "-ful", word: "thankful", answer: "full of" },
    { suffix: "-less", word: "useless", answer: "without" },
    { suffix: "-ly", word: "quickly", answer: "in a way" },
  ];
  const entry = vocabularyRandomChoice(entries);
  return buildVocabularyQuestion({
    question: `What does the suffix "${entry.suffix}" help show in "${entry.word}"?`,
    options: vocabularyShuffleArray([entry.answer, "before", "a place", "a number"]),
    answer: entry.answer,
    difficulty: 2,
    visualSummary: `The suffix ${entry.suffix} gives a clue about the word.`,
  });
}

function createSynonymQuestion() {
  const pairs = [
    { word: "happy", answer: "joyful", options: ["joyful", "late", "empty", "rough"] },
    { word: "tiny", answer: "small", options: ["small", "heavy", "bright", "tall"] },
    { word: "quick", answer: "fast", options: ["fast", "quiet", "soft", "slow"] },
  ];
  const pair = vocabularyRandomChoice(pairs);
  return buildVocabularyQuestion({
    question: `Which word is a synonym for "${pair.word}"?`,
    options: vocabularyShuffleArray(pair.options),
    answer: pair.answer,
    difficulty: 1,
    visualSummary: `${pair.answer} means almost the same as ${pair.word}.`,
  });
}

function createHomophoneQuestion() {
  const entries = [
    {
      sentence: "I want _____ apples.",
      answer: "two",
      options: ["two", "to", "too", "tree"],
    },
    {
      sentence: "The dog wagged _____ tail.",
      answer: "its",
      options: ["its", "it's", "their", "there"],
    },
    {
      sentence: "We went _____ the park after school.",
      answer: "to",
      options: ["to", "too", "two", "toe"],
    },
  ];
  const entry = vocabularyRandomChoice(entries);
  return buildVocabularyQuestion({
    question: "Choose the correct word.",
    displayText: entry.sentence,
    options: vocabularyShuffleArray(entry.options),
    answer: entry.answer,
    difficulty: 2,
    visualSummary: `The correct word is "${entry.answer}".`,
  });
}

function createGrammarQuestion() {
  const entries = [
    {
      prompt: "Which sentence is correct?",
      answer: "The birds are singing outside.",
      options: [
        "The birds are singing outside.",
        "The birds is singing outside.",
        "The birds singing outside.",
        "The birds be singing outside.",
      ],
    },
    {
      prompt: "Which sentence is correct?",
      answer: "My friends and I like soccer.",
      options: [
        "My friends and I like soccer.",
        "My friends and I likes soccer.",
        "My friends and I liking soccer.",
        "My friends and I soccer like.",
      ],
    },
  ];
  const entry = vocabularyRandomChoice(entries);
  return buildVocabularyQuestion({
    question: entry.prompt,
    options: vocabularyShuffleArray(entry.options),
    answer: entry.answer,
    difficulty: 3,
    visualSummary: entry.answer,
  });
}

function createRootQuestion() {
  const entries = [
    { root: "port", word: "transport", answer: "carry" },
    { root: "spect", word: "inspect", answer: "look" },
    { root: "scrib/script", word: "describe", answer: "write" },
  ];
  const entry = vocabularyRandomChoice(entries);
  return buildVocabularyQuestion({
    question: `What does the root in "${entry.word}" help you understand?`,
    options: vocabularyShuffleArray([entry.answer, "run", "eat", "sleep"]),
    answer: entry.answer,
    difficulty: 4,
    visualSummary: `The root clue points to "${entry.answer}".`,
  });
}

function createClozeQuestion() {
  const entries = [
    {
      sentence: "The glass was fragile, so we moved it carefully.",
      blank: "fragile",
      answer: "easy to break",
      options: ["easy to break", "very loud", "full of water", "hard to see"],
    },
    {
      sentence: "The puppy was timid and stayed close to its owner.",
      blank: "timid",
      answer: "shy",
      options: ["shy", "quick", "tired", "angry"],
    },
  ];
  const entry = vocabularyRandomChoice(entries);
  return buildVocabularyQuestion({
    question: `What does "${entry.blank}" mean in the sentence?`,
    displayText: entry.sentence,
    options: vocabularyShuffleArray(entry.options),
    answer: entry.answer,
    difficulty: 3,
    visualSummary: `The word "${entry.blank}" means ${entry.answer}.`,
  });
}

function createEditingQuestion() {
  const entries = [
    {
      answer: "After lunch, we played soccer.",
      options: [
        "After lunch, we played soccer.",
        "After lunch we played soccer,",
        "After lunch we played soccer.",
        "After lunch, we played soccer,",
      ],
    },
    {
      answer: "The squirrel quickly climbed the tree.",
      options: [
        "The squirrel quickly climbed the tree.",
        "The squirrel quick climbed the tree.",
        "The squirrel quickly climb the tree.",
        "The squirrel quicky climbed the tree.",
      ],
    },
  ];
  const entry = vocabularyRandomChoice(entries);
  return buildVocabularyQuestion({
    question: "Which sentence is best?",
    options: vocabularyShuffleArray(entry.options),
    answer: entry.answer,
    difficulty: 5,
    visualSummary: entry.answer,
  });
}

function buildVocabularyQuestion({
  question,
  options,
  answer,
  difficulty,
  displayText = "",
  visualSummary = "",
}) {
  if (!Array.isArray(options) || options.length !== 4 || !options.includes(answer)) {
    throw new Error("Vocabulary questions require exactly 4 options with the answer included.");
  }

  return {
    question,
    displayText,
    options: vocabularyShuffleArray(options),
    answer,
    difficulty,
    visualSummary,
    type: "vocabulary-choice",
  };
}

function clampVocabularyDifficulty(value) {
  const level = Number.parseInt(value, 10);
  if (!Number.isFinite(level)) {
    return 3;
  }

  return Math.min(5, Math.max(1, level));
}

function vocabularyRandomChoice(values) {
  return values[Math.floor(Math.random() * values.length)];
}

function vocabularyShuffleArray(values) {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

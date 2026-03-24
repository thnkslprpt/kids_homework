const SENTENCE_BUILDER_QUESTIONS = [
  {
    question: "Drag the word into the blank to complete the sentence.",
    template: [
      { type: "text", value: "The dog " },
      { type: "slot", id: "slot-1", placeholder: "word" },
      { type: "text", value: " over the log." },
    ],
    tokens: [
      { id: "jumped", label: "jumped" },
      { id: "blue", label: "blue" },
      { id: "chair", label: "chair" },
    ],
    answerMap: { "slot-1": "jumped" },
    answerLabel: "The dog jumped over the log.",
    difficulty: 1,
    isHebrew: false,
  },
  {
    question: "Drag the words into the blanks to complete the sentence.",
    template: [
      { type: "text", value: "Maya " },
      { type: "slot", id: "slot-1", placeholder: "word" },
      { type: "text", value: " her lunch " },
      { type: "slot", id: "slot-2", placeholder: "word" },
      { type: "text", value: " school." },
    ],
    tokens: [
      { id: "packed", label: "packed" },
      { id: "before", label: "before" },
      { id: "purple", label: "purple" },
    ],
    answerMap: { "slot-1": "packed", "slot-2": "before" },
    answerLabel: "Maya packed her lunch before school.",
    difficulty: 1,
    isHebrew: false,
  },
  {
    question: "גררו את המילים למקום הנכון במשפט.",
    template: [
      { type: "text", value: "הילד " },
      { type: "slot", id: "slot-1", placeholder: "מילה" },
      { type: "text", value: " לבית הספר " },
      { type: "slot", id: "slot-2", placeholder: "מילה" },
      { type: "text", value: "." },
    ],
    tokens: [
      { id: "הלך", label: "הלך" },
      { id: "היום", label: "היום" },
      { id: "קפץ", label: "קפץ" },
    ],
    answerMap: { "slot-1": "הלך", "slot-2": "היום" },
    answerLabel: "הילד הלך לבית הספר היום.",
    difficulty: 2,
    isHebrew: true,
  },
  {
    question: "Drag the words into the blanks to complete the sentence.",
    template: [
      { type: "text", value: "The birds " },
      { type: "slot", id: "slot-1", placeholder: "word" },
      { type: "text", value: " in the tree while the wind " },
      { type: "slot", id: "slot-2", placeholder: "word" },
      { type: "text", value: "." },
    ],
    tokens: [
      { id: "sang", label: "sang" },
      { id: "blew", label: "blew" },
      { id: "under", label: "under" },
    ],
    answerMap: { "slot-1": "sang", "slot-2": "blew" },
    answerLabel: "The birds sang in the tree while the wind blew.",
    difficulty: 2,
    isHebrew: false,
  },
  {
    question: "גררו את המילים למקום הנכון במשפט.",
    template: [
      { type: "text", value: "אני אוהב לאכול " },
      { type: "slot", id: "slot-1", placeholder: "מילה" },
      { type: "text", value: " ו" },
      { type: "slot", id: "slot-2", placeholder: "מילה" },
      { type: "text", value: "." },
    ],
    tokens: [
      { id: "תפוחים", label: "תפוחים" },
      { id: "בננות", label: "בננות" },
      { id: "לרוץ", label: "לרוץ" },
    ],
    answerMap: { "slot-1": "תפוחים", "slot-2": "בננות" },
    answerLabel: "אני אוהב לאכול תפוחים ובננות.",
    difficulty: 2,
    isHebrew: true,
  },
  {
    question: "Drag the words into the blanks to complete the sentence.",
    template: [
      { type: "text", value: "First we " },
      { type: "slot", id: "slot-1", placeholder: "word" },
      { type: "text", value: " the seeds, and later we " },
      { type: "slot", id: "slot-2", placeholder: "word" },
      { type: "text", value: " them." },
    ],
    tokens: [
      { id: "planted", label: "planted" },
      { id: "watered", label: "watered" },
      { id: "quietly", label: "quietly" },
    ],
    answerMap: { "slot-1": "planted", "slot-2": "watered" },
    answerLabel: "First we planted the seeds, and later we watered them.",
    difficulty: 3,
    isHebrew: false,
  },
  {
    question: "Drag the words into the blanks to complete the sentence.",
    template: [
      { type: "text", value: "Because the floor was wet, Liam " },
      { type: "slot", id: "slot-1", placeholder: "word" },
      { type: "text", value: " carefully and held the rail " },
      { type: "slot", id: "slot-2", placeholder: "word" },
      { type: "text", value: "." },
    ],
    tokens: [
      { id: "walked", label: "walked" },
      { id: "tightly", label: "tightly" },
      { id: "yellow", label: "yellow" },
    ],
    answerMap: { "slot-1": "walked", "slot-2": "tightly" },
    answerLabel: "Because the floor was wet, Liam walked carefully and held the rail tightly.",
    difficulty: 3,
    isHebrew: false,
  },
  {
    question: "גררו את המילים למקום הנכון במשפט.",
    template: [
      { type: "text", value: "אחרי הארוחה אנחנו " },
      { type: "slot", id: "slot-1", placeholder: "מילה" },
      { type: "text", value: " את השולחן ו" },
      { type: "slot", id: "slot-2", placeholder: "מילה" },
      { type: "text", value: " את הכיסאות." },
    ],
    tokens: [
      { id: "מנקים", label: "מנקים" },
      { id: "מסדרים", label: "מסדרים" },
      { id: "מציירים", label: "מציירים" },
    ],
    answerMap: { "slot-1": "מנקים", "slot-2": "מסדרים" },
    answerLabel: "אחרי הארוחה אנחנו מנקים את השולחן ומסדרים את הכיסאות.",
    difficulty: 3,
    isHebrew: true,
  },
  {
    question: "Drag the words into the blanks to complete the sentence.",
    template: [
      { type: "text", value: "During the experiment, the class " },
      { type: "slot", id: "slot-1", placeholder: "word" },
      { type: "text", value: " the water level and " },
      { type: "slot", id: "slot-2", placeholder: "word" },
      { type: "text", value: " the result in a table." },
    ],
    tokens: [
      { id: "measured", label: "measured" },
      { id: "recorded", label: "recorded" },
      { id: "purple", label: "purple" },
    ],
    answerMap: { "slot-1": "measured", "slot-2": "recorded" },
    answerLabel: "During the experiment, the class measured the water level and recorded the result in a table.",
    difficulty: 4,
    isHebrew: false,
  },
  {
    question: "Drag the words into the blanks to complete the sentence.",
    template: [
      { type: "text", value: "After Maya compared the two maps, she " },
      { type: "slot", id: "slot-1", placeholder: "word" },
      { type: "text", value: " the river on one map and " },
      { type: "slot", id: "slot-2", placeholder: "word" },
      { type: "text", value: " the bridge on the other." },
    ],
    tokens: [
      { id: "found", label: "found" },
      { id: "circled", label: "circled" },
      { id: "quietly", label: "quietly" },
    ],
    answerMap: { "slot-1": "found", "slot-2": "circled" },
    answerLabel: "After Maya compared the two maps, she found the river on one map and circled the bridge on the other.",
    difficulty: 4,
    isHebrew: false,
  },
  {
    question: "גררו את המילים למקום הנכון במשפט.",
    template: [
      { type: "text", value: "לפני השיעור המורה " },
      { type: "slot", id: "slot-1", placeholder: "מילה" },
      { type: "text", value: " את הדפים ו" },
      { type: "slot", id: "slot-2", placeholder: "מילה" },
      { type: "text", value: " את ההוראות על הלוח." },
    ],
    tokens: [
      { id: "חילקה", label: "חילקה" },
      { id: "כתבה", label: "כתבה" },
      { id: "קראה", label: "קראה" },
    ],
    answerMap: { "slot-1": "חילקה", "slot-2": "כתבה" },
    answerLabel: "לפני השיעור המורה חילקה את הדפים וכתבה את ההוראות על הלוח.",
    difficulty: 4,
    isHebrew: true,
  },
  {
    question: "Drag the words into the blanks to complete the sentence.",
    template: [
      { type: "text", value: "Although the puzzle looked difficult, Gabriel " },
      { type: "slot", id: "slot-1", placeholder: "word" },
      { type: "text", value: " each clue and " },
      { type: "slot", id: "slot-2", placeholder: "word" },
      { type: "text", value: " the answer step by step." },
    ],
    tokens: [
      { id: "studied", label: "studied" },
      { id: "solved", label: "solved" },
      { id: "under", label: "under" },
    ],
    answerMap: { "slot-1": "studied", "slot-2": "solved" },
    answerLabel: "Although the puzzle looked difficult, Gabriel studied each clue and solved the answer step by step.",
    difficulty: 5,
    isHebrew: false,
  },
  {
    question: "Drag the words into the blanks to complete the sentence.",
    template: [
      { type: "text", value: "Before the concert began, the musicians " },
      { type: "slot", id: "slot-1", placeholder: "word" },
      { type: "text", value: " their instruments and " },
      { type: "slot", id: "slot-2", placeholder: "word" },
      { type: "text", value: " the sheet music on each stand." },
    ],
    tokens: [
      { id: "tuned", label: "tuned" },
      { id: "placed", label: "placed" },
      { id: "rainy", label: "rainy" },
    ],
    answerMap: { "slot-1": "tuned", "slot-2": "placed" },
    answerLabel: "Before the concert began, the musicians tuned their instruments and placed the sheet music on each stand.",
    difficulty: 5,
    isHebrew: false,
  },
];

function createSentenceBuilderGeneratedQuestion(difficulty) {
  const level = clampSentenceBuilderDifficulty(difficulty);
  const entries = SENTENCE_BUILDER_QUESTIONS.filter((entry) => entry.difficulty === level);
  const source = entries.length ? entries : SENTENCE_BUILDER_QUESTIONS;
  const picked = sentenceBuilderRandomChoice(source);
  return buildSentenceBuilderEntry(picked);
}

function buildSentenceBuilderEntry(entry) {
  return {
    question: entry.question,
    template: entry.template.map((part) => ({ ...part })),
    tokens: sentenceBuilderShuffle(entry.tokens.map((token) => ({ ...token }))),
    answerMap: { ...entry.answerMap },
    answerLabel: entry.answerLabel,
    difficulty: entry.difficulty,
    isHebrew: Boolean(entry.isHebrew),
  };
}

function clampSentenceBuilderDifficulty(value) {
  const level = Number.parseInt(value, 10);
  if (!Number.isFinite(level)) {
    return 3;
  }

  return Math.min(5, Math.max(1, level));
}

function sentenceBuilderRandomChoice(values) {
  return values[Math.floor(Math.random() * values.length)];
}

function sentenceBuilderShuffle(values) {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

const SENTENCE_DRAG_QUESTIONS = SENTENCE_BUILDER_QUESTIONS;

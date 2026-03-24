const SENTENCE_DRAG_ENGLISH_QUESTIONS =
  typeof SENTENCE_DRAG_ENGLISH_DATA !== "undefined" && Array.isArray(SENTENCE_DRAG_ENGLISH_DATA.bank)
    ? SENTENCE_DRAG_ENGLISH_DATA.bank
    : [];

const SENTENCE_DRAG_HEBREW_QUESTIONS =
  typeof SENTENCE_DRAG_HEBREW_DATA !== "undefined" && Array.isArray(SENTENCE_DRAG_HEBREW_DATA.bank)
    ? SENTENCE_DRAG_HEBREW_DATA.bank
    : [];

const SENTENCE_DRAG_QUESTIONS = [
  ...SENTENCE_DRAG_ENGLISH_QUESTIONS,
  ...SENTENCE_DRAG_HEBREW_QUESTIONS,
];

function createSentenceDragGeneratedEntry(difficulty) {
  const generators = [];

  if (typeof createSentenceDragEnglishGeneratedEntry === "function") {
    generators.push(() => createSentenceDragEnglishGeneratedEntry(difficulty));
  }

  if (typeof createSentenceDragHebrewGeneratedEntry === "function") {
    generators.push(() => createSentenceDragHebrewGeneratedEntry(difficulty));
  }

  if (!generators.length) {
    return null;
  }

  return generators[Math.floor(Math.random() * generators.length)]();
}

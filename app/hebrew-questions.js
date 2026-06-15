(() => {
  const questionUtils = globalThis.HomeworkQuestionUtils;
  if (!questionUtils) {
    return;
  }
  const { entry, pickGeneratedEntry, randomChoice, shuffle } = questionUtils;

  function point(value) {
    return typeof globalThis.applyHebrewSentenceNikkud === "function"
      ? globalThis.applyHebrewSentenceNikkud(value)
      : value;
  }

  const blueprints = [
    { topic: "hebrew-final-letters", difficulty: 1, question: "Which is the final form of מ?", answer: "ם", options: ["ם", "מ", "ן", "ף"] },
    { topic: "hebrew-final-letters", difficulty: 1, question: "Which is the final form of נ?", answer: "ן", options: ["ן", "נ", "ם", "ץ"] },
    { topic: "hebrew-final-letters", difficulty: 2, question: "Which word uses a final letter correctly?", answer: "שלום", options: ["שלום", "שלומ", "שלון", "שלופ"] },
    { topic: "hebrew-final-letters", difficulty: 3, question: "Which letter can change to ץ at the end of a word?", answer: "צ", options: ["צ", "ק", "ס", "ת"] },
    { topic: "hebrew-prepositions", difficulty: 1, question: "Choose the Hebrew preposition that means to.", displayText: "___ בית", answer: "לְ", options: ["לְ", "בְּ", "עַל", "מִן"] },
    { topic: "hebrew-prepositions", difficulty: 2, question: "Choose the Hebrew preposition that means in.", displayText: "___ בית", answer: "בְּ", options: ["בְּ", "עַל", "מִן", "לְ"] },
    { topic: "hebrew-prepositions", difficulty: 3, question: "Choose the Hebrew preposition that means on.", displayText: "הספר ___ השולחן", answer: "עַל", options: ["עַל", "בְּ", "לְיַד", "מִן"] },
    { topic: "hebrew-prepositions", difficulty: 5, question: "Choose the Hebrew preposition that means from.", displayText: "דנה באה ___ הבית", answer: "מִן", options: ["מִן", "עַל", "בְּ", "אֶל"] },
    { topic: "hebrew-prepositions", difficulty: 7, question: "Choose the best Hebrew preposition.", displayText: "הכיסא נמצא ___ השולחן.", answer: "לְיַד", options: ["לְיַד", "מִן", "אֶל", "שֶל"] },
    { topic: "hebrew-root-families", difficulty: 3, question: "Which word belongs to the כתב root family?", answer: "כותב", options: ["כותב", "אוכל", "רץ", "ישן"] },
    { topic: "hebrew-root-families", difficulty: 4, question: "Which word belongs to the למד root family?", answer: "תלמיד", options: ["תלמיד", "חלון", "שתה", "הלך"] },
    { topic: "hebrew-root-families", difficulty: 5, question: "Which word belongs to the אכל root family?", answer: "אוכל", options: ["אוכל", "שומר", "כותב", "יושב"] },
    { topic: "hebrew-root-families", difficulty: 8, question: "Which pair shares the same Hebrew root?", answer: "כתב / מכתב", options: ["כתב / מכתב", "בית / מים", "אור / ילד", "הלך / ספר"] },
    { topic: "hebrew-agreement", difficulty: 4, question: "Which sentence has correct gender agreement?", answer: "הילדה שמחה.", options: ["הילדה שמחה.", "הילדה שמח.", "הילד שמחה.", "הילדות שמח."] },
    { topic: "hebrew-agreement", difficulty: 5, question: "Which sentence has correct number agreement?", answer: "הילדים רצים.", options: ["הילדים רצים.", "הילדים רץ.", "הילד רצים.", "הילדות רץ."] },
    { topic: "hebrew-agreement", difficulty: 6, question: "Choose the adjective that agrees.", displayText: "ספרים ___", answer: "חדשים", options: ["חדשים", "חדש", "חדשה", "חדשות"] },
    { topic: "hebrew-agreement", difficulty: 9, question: "Choose the phrase with correct agreement.", answer: "מחברות חדשות", options: ["מחברות חדשות", "מחברות חדשים", "מחברת חדשים", "מחברת חדש"] },
    { topic: "hebrew-verb-tense", difficulty: 4, question: "Choose the present-tense verb.", displayText: "הילדה ___ עכשיו.", answer: "קוראת", options: ["קוראת", "קראה", "תקרא", "קראתי"] },
    { topic: "hebrew-verb-tense", difficulty: 5, question: "Choose the past-tense verb.", displayText: "אתמול הילד ___ ספר.", answer: "קרא", options: ["קרא", "קורא", "יקרא", "לקרוא"] },
    { topic: "hebrew-verb-tense", difficulty: 6, question: "Choose the future-tense verb.", displayText: "מחר אנחנו ___ לבית הספר.", answer: "נלך", options: ["נלך", "הלכנו", "הולכים", "הלך"] },
    { topic: "hebrew-verb-tense", difficulty: 8, question: "Which verb fits the time word?", displayText: "עכשיו הם ___ בכיתה.", answer: "לומדים", options: ["לומדים", "למדו", "ילמדו", "למדתי"] },
    { topic: "hebrew-verb-tense", difficulty: 10, question: "Which sentence uses future tense correctly?", answer: "מחר היא תכתוב מכתב.", options: ["מחר היא תכתוב מכתב.", "מחר היא כתבה מכתב.", "מחר היא כותבת אתמול.", "אתמול היא תכתוב מכתב."] },
  ];

  function createBlueprintEntry(difficulty) {
    const level = Math.max(1, Math.min(10, Number.parseInt(difficulty, 10) || 3));
    const choices = blueprints.filter((item) => item.difficulty <= level);
    const picked = randomChoice(choices);
    return entry({
      ...picked,
      displayText: point(picked.displayText || ""),
      answer: point(picked.answer),
      options: picked.options.map(point),
    });
  }

  globalThis.createHebrewGeneratedSessionQuestion = (difficulty) => {
    const picked = pickGeneratedEntry([createBlueprintEntry], difficulty);
    if (!picked) {
      return null;
    }
    return {
      type: "hebrew-choice",
      difficulty: picked.difficulty,
      mode: "choice",
      questionText: picked.question,
      displayText: picked.displayText || "",
      extraText: "",
      reviewText: picked.reviewText || "",
      options: shuffle(picked.options),
      answerValue: picked.answer,
      answerLabel: picked.answer,
      isHebrew: true,
      forceCompactMain: true,
    };
  };
})();

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

  function pointList(values) {
    return values.map(point);
  }

  function choiceBlueprint(blueprint) {
    return entry({
      ...blueprint,
      displayText: point(blueprint.displayText || ""),
      extraText: point(blueprint.extraText || ""),
      reviewText: point(blueprint.reviewText || ""),
      answer: point(blueprint.answer),
      options: pointList(blueprint.options),
    });
  }

  function getEligible(items, difficulty) {
    const level = Math.max(1, Math.min(10, Number.parseInt(difficulty, 10) || 3));
    const exact = items.filter((item) => item.difficulty === level);
    if (exact.length) {
      return exact;
    }
    const eligible = items.filter((item) => item.difficulty <= level);
    return eligible.length ? eligible : items;
  }

  function createStaticBlueprintEntry(difficulty) {
    const choices = getEligible(STATIC_BLUEPRINTS, difficulty);
    return choiceBlueprint(randomChoice(choices));
  }

  const STATIC_BLUEPRINTS = [
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

  const ROOT_FAMILIES = [
    { difficulty: 2, root: "כתב", meaning: "writing", words: ["כתב", "כותב", "כתבה", "מכתב", "כתיבה"], outsider: "אוכל" },
    { difficulty: 2, root: "למד", meaning: "learning", words: ["למד", "לומד", "למדה", "תלמיד", "למידה"], outsider: "פתח" },
    { difficulty: 3, root: "אכל", meaning: "eating", words: ["אכל", "אוכלת", "מאכל", "אכילה", "נאכל"], outsider: "שמר" },
    { difficulty: 3, root: "שמר", meaning: "keeping", words: ["שמר", "שומר", "שמירה", "נשמר", "משמרת"], outsider: "הלך" },
    { difficulty: 4, root: "פתח", meaning: "opening", words: ["פתח", "פותחת", "מפתח", "פתיחה", "פתוח"], outsider: "סגר" },
    { difficulty: 4, root: "סגר", meaning: "closing", words: ["סגר", "סוגרת", "סגירה", "סגור", "מסגרת"], outsider: "שאל" },
    { difficulty: 5, root: "חשב", meaning: "thinking", words: ["חשב", "חושב", "מחשבה", "מחשב", "חשבון"], outsider: "קפץ" },
    { difficulty: 5, root: "דבר", meaning: "speaking", words: ["דיבר", "מדברת", "דיבור", "דבר", "מדובר"], outsider: "ישן" },
    { difficulty: 6, root: "נסע", meaning: "traveling", words: ["נסע", "נוסעת", "נסיעה", "נוסעים", "מסע"], outsider: "קנה" },
    { difficulty: 6, root: "שאל", meaning: "asking", words: ["שאל", "שואלת", "שאלה", "נשאל", "השאלה"], outsider: "ענה" },
    { difficulty: 7, root: "חזר", meaning: "returning", words: ["חזר", "חוזרת", "חזרה", "מחזור", "חוזרים"], outsider: "בנה" },
    { difficulty: 7, root: "עזר", meaning: "helping", words: ["עזר", "עוזרת", "עזרה", "עוזרים", "נעזר"], outsider: "ראה" },
    { difficulty: 8, root: "נהל", meaning: "managing", words: ["ניהל", "מנהלת", "ניהול", "הנהלה", "מנהל"], outsider: "זכר" },
    { difficulty: 8, root: "בדק", meaning: "checking", words: ["בדק", "בודקת", "בדיקה", "נבדק", "מבדק"], outsider: "צחק" },
    { difficulty: 9, root: "החליט", meaning: "deciding", words: ["החליט", "מחליטה", "החלטה", "הוחלט"], outsider: "הסביר" },
    { difficulty: 9, root: "הסביר", meaning: "explaining", words: ["הסביר", "מסבירה", "הסבר", "מוסבר"], outsider: "הצליח" },
  ];

  const ROOT_DISTRACTOR_PAIRS = [
    "בית / מים",
    "ילד / חלון",
    "דרך / כיסא",
    "חלב / שולחן",
    "אור / חבר",
    "תיק / עץ",
    "עיר / יום",
    "כדור / דלת",
  ];

  function createRootFamilyEntry(difficulty) {
    const family = randomChoice(getEligible(ROOT_FAMILIES, difficulty));
    const promptTypes = ["belongs", "outsider", "pair", "root"];
    const promptType = randomChoice(family.difficulty >= 5 ? promptTypes : promptTypes.slice(0, 3));
    const words = shuffle(family.words);

    if (promptType === "outsider") {
      return choiceBlueprint({
        topic: "hebrew-root-families",
        difficulty: family.difficulty,
        question: `Which word does NOT belong to the ${family.root} root family?`,
        displayText: words.slice(0, 3).concat(family.outsider).join("  |  "),
        answer: family.outsider,
        options: shuffle(words.slice(0, 3).concat(family.outsider)),
        reviewText: `${family.root}: ${family.words.join(", ")}`,
      });
    }

    if (promptType === "pair") {
      const correctPair = `${words[0]} / ${words[1]}`;
      return choiceBlueprint({
        topic: "hebrew-root-families",
        difficulty: family.difficulty,
        question: "Which pair shares the same Hebrew root?",
        answer: correctPair,
        options: [correctPair, ...shuffle(ROOT_DISTRACTOR_PAIRS).slice(0, 3)],
        reviewText: `${correctPair} share the ${family.root} root.`,
      });
    }

    if (promptType === "root") {
      const word = randomChoice(family.words.slice(1));
      const roots = shuffle(ROOT_FAMILIES.filter((item) => item.root !== family.root)).slice(0, 3).map((item) => item.root);
      return choiceBlueprint({
        topic: "hebrew-root-families",
        difficulty: family.difficulty,
        question: "Which root family does this word belong to?",
        displayText: word,
        answer: family.root,
        options: [family.root, ...roots],
        reviewText: `${word} belongs to ${family.root}.`,
      });
    }

    const answer = randomChoice(family.words);
    const distractors = shuffle(ROOT_FAMILIES.filter((item) => item.root !== family.root)).map((item) => randomChoice(item.words));
    return choiceBlueprint({
      topic: "hebrew-root-families",
      difficulty: family.difficulty,
      question: `Which word belongs to the ${family.root} root family?`,
      extraText: `The ${family.root} family is connected to ${family.meaning}.`,
      answer,
      options: [answer, ...distractors.slice(0, 3)],
      reviewText: `${family.root}: ${family.words.join(", ")}`,
    });
  }

  const VERB_FORM_BLUEPRINTS = [
    { difficulty: 1, prompt: "Choose the verb that agrees with the subject.", displayText: "הילד ___ בחצר.", answer: "רץ", options: ["רץ", "רצה", "רצים", "רצות"], reviewText: "הילד רץ בחצר." },
    { difficulty: 1, prompt: "Choose the verb that agrees with the subject.", displayText: "הילדה ___ ספר.", answer: "קוראת", options: ["קורא", "קוראת", "קוראים", "קוראות"], reviewText: "הילדה קוראת ספר." },
    { difficulty: 2, prompt: "Choose the verb that agrees with the subject.", displayText: "הילדים ___ בחצר.", answer: "רצים", options: ["רץ", "רצה", "רצים", "רצות"], reviewText: "הילדים רצים בחצר." },
    { difficulty: 2, prompt: "Choose the verb that agrees with the subject.", displayText: "הילדות ___ שיר.", answer: "שרות", options: ["שר", "שרה", "שרים", "שרות"], reviewText: "הילדות שרות שיר." },
    { difficulty: 3, prompt: "Choose the past-tense form.", displayText: "אתמול אני ___ במחברת.", answer: "כתבתי", options: ["כתבתי", "כותב", "אכתוב", "כתבו"], reviewText: "אתמול אני כתבתי במחברת." },
    { difficulty: 3, prompt: "Choose the past-tense form.", displayText: "אתמול אנחנו ___ לבית הספר.", answer: "הלכנו", options: ["הלכנו", "הולכים", "נלך", "הלך"], reviewText: "אתמול אנחנו הלכנו לבית הספר." },
    { difficulty: 4, prompt: "Choose the future-tense form.", displayText: "מחר אתה ___ את הדלת.", answer: "תפתח", options: ["תפתח", "פתחת", "פותח", "יפתחו"], reviewText: "מחר אתה תפתח את הדלת." },
    { difficulty: 4, prompt: "Choose the future-tense form.", displayText: "מחר היא ___ שאלה.", answer: "תשאל", options: ["תשאל", "שאלה", "שואל", "נשאל"], reviewText: "מחר היא תשאל שאלה." },
    { difficulty: 5, prompt: "Change the sentence to feminine singular.", displayText: "הילד כותב תשובה. -> הילדה ___ תשובה.", answer: "כותבת", options: ["כותבת", "כותב", "כותבים", "כתבה"], reviewText: "הילדה כותבת תשובה." },
    { difficulty: 5, prompt: "Change the sentence to masculine plural.", displayText: "הילדה לומדת בכיתה. -> הילדים ___ בכיתה.", answer: "לומדים", options: ["לומדים", "לומדות", "לומד", "למדה"], reviewText: "הילדים לומדים בכיתה." },
    { difficulty: 6, prompt: "Choose the form that matches the time word.", displayText: "עכשיו אנחנו ___ את התרגיל.", answer: "פותרים", options: ["פותרים", "פתרנו", "נפתור", "פתרתי"], reviewText: "עכשיו אנחנו פותרים את התרגיל." },
    { difficulty: 6, prompt: "Choose the form that matches the time word.", displayText: "בשבוע שעבר הם ___ לטיול.", answer: "נסעו", options: ["נסעו", "נוסעים", "יסעו", "נסעתי"], reviewText: "בשבוע שעבר הם נסעו לטיול." },
    { difficulty: 7, prompt: "Choose the correct person and tense.", displayText: "מחר אני ___ למורה תשובה ברורה.", answer: "אסביר", options: ["אסביר", "הסברתי", "מסביר", "יסבירו"], reviewText: "מחר אני אסביר למורה תשובה ברורה." },
    { difficulty: 7, prompt: "Choose the correct person and tense.", displayText: "אתמול את ___ לחברה שלך.", answer: "עזרת", options: ["עזרת", "עוזרת", "תעזרי", "עזרו"], reviewText: "אתמול את עזרת לחברה שלך." },
    { difficulty: 8, prompt: "Choose the sentence with correct tense and person.", answer: "מחר הם יבדקו את הרשימה.", options: ["מחר הם יבדקו את הרשימה.", "מחר הם בדקו את הרשימה.", "אתמול הם יבדקו את הרשימה.", "מחר הם בודק את הרשימה."], reviewText: "מחר הם יבדקו את הרשימה." },
    { difficulty: 8, prompt: "Choose the sentence with correct tense and gender.", answer: "עכשיו דנה מסבירה את הדרך.", options: ["עכשיו דנה מסבירה את הדרך.", "עכשיו דנה מסביר את הדרך.", "אתמול דנה מסבירה את הדרך.", "מחר דנה הסבירה את הדרך."], reviewText: "עכשיו דנה מסבירה את הדרך." },
    { difficulty: 9, prompt: "Choose the correct future form.", displayText: "אם נסיים מוקדם, אנחנו ___ את הדוח היום.", answer: "נגיש", options: ["נגיש", "הגשנו", "מגישים", "יגיש"], reviewText: "אנחנו נגיש את הדוח." },
    { difficulty: 10, prompt: "Choose the sentence with correct tense, person, and number.", answer: "כשהילדות יגיעו, הן יסדרו את הכיסאות.", options: ["כשהילדות יגיעו, הן יסדרו את הכיסאות.", "כשהילדות יגיעו, הם יסדרו את הכיסאות.", "כשהילדות הגיעו, הן יסדרו אתמול.", "כשהילדות יגיע, הן יסדרו את הכיסאות."], reviewText: "כשהילדות יגיעו, הן יסדרו את הכיסאות." },
  ];

  function createVerbFormEntry(difficulty) {
    const blueprint = randomChoice(getEligible(VERB_FORM_BLUEPRINTS, difficulty));
    return choiceBlueprint({
      topic: "hebrew-verb-transformations",
      difficulty: blueprint.difficulty,
      question: blueprint.prompt,
      displayText: blueprint.displayText || "",
      answer: blueprint.answer,
      options: blueprint.options,
      reviewText: blueprint.reviewText,
    });
  }

  const NUMBER_FORM_BLUEPRINTS = [
    { difficulty: 1, question: "Choose the plural form.", displayText: "ילד -> ___", answer: "ילדים", options: ["ילדים", "ילדות", "ילד", "ילדה"], reviewText: "ילד -> ילדים" },
    { difficulty: 1, question: "Choose the singular form.", displayText: "ילדות -> ___", answer: "ילדה", options: ["ילדה", "ילד", "ילדים", "ילדות"], reviewText: "ילדות -> ילדה" },
    { difficulty: 2, question: "Choose the plural form.", displayText: "ספר -> ___", answer: "ספרים", options: ["ספרים", "ספרות", "ספר", "ספרה"], reviewText: "ספר -> ספרים" },
    { difficulty: 2, question: "Choose the plural form.", displayText: "מחברת -> ___", answer: "מחברות", options: ["מחברות", "מחברים", "מחברתים", "מחבר"], reviewText: "מחברת -> מחברות" },
    { difficulty: 3, question: "Choose the correct phrase.", displayText: "two new books", answer: "שני ספרים חדשים", options: ["שני ספרים חדשים", "שתי ספרים חדשות", "שני ספר חדש", "שתי ספרות חדשים"], reviewText: "שני ספרים חדשים" },
    { difficulty: 3, question: "Choose the correct phrase.", displayText: "two new notebooks", answer: "שתי מחברות חדשות", options: ["שתי מחברות חדשות", "שני מחברות חדשים", "שתי מחברת חדשה", "שני מחברים חדשים"], reviewText: "שתי מחברות חדשות" },
    { difficulty: 4, question: "Choose the plural form.", displayText: "שולחן -> ___", answer: "שולחנות", options: ["שולחנות", "שולחנים", "שולחנת", "שולחן"], reviewText: "שולחן -> שולחנות" },
    { difficulty: 4, question: "Choose the singular form.", displayText: "כיסאות -> ___", answer: "כיסא", options: ["כיסא", "כיסאות", "כיסאים", "כיסית"], reviewText: "כיסאות -> כיסא" },
    { difficulty: 5, question: "Choose the adjective that agrees.", displayText: "דלתות ___", answer: "פתוחות", options: ["פתוחות", "פתוחים", "פתוח", "פתוחה"], reviewText: "דלתות פתוחות" },
    { difficulty: 5, question: "Choose the adjective that agrees.", displayText: "חלונות ___", answer: "נקיים", options: ["נקיים", "נקיות", "נקי", "נקייה"], reviewText: "חלונות נקיים" },
    { difficulty: 6, question: "Choose the correct singular phrase.", displayText: "הילדות הגבוהות -> ___", answer: "הילדה הגבוהה", options: ["הילדה הגבוהה", "הילד הגבוה", "הילדה הגבוה", "הילדים הגבוהים"], reviewText: "הילדות הגבוהות -> הילדה הגבוהה" },
    { difficulty: 6, question: "Choose the correct plural phrase.", displayText: "הבית הישן -> ___", answer: "הבתים הישנים", options: ["הבתים הישנים", "הביתים הישנות", "הבתים ישן", "הבית הישן"], reviewText: "הבית הישן -> הבתים הישנים" },
    { difficulty: 7, question: "Choose the correct number agreement.", answer: "הנשים החכמות שאלו שאלות.", options: ["הנשים החכמות שאלו שאלות.", "הנשים החכמים שאלו שאלות.", "האישה החכמות שאלה שאלות.", "הנשים החכמה שאל שאלה."], reviewText: "הנשים החכמות שאלו שאלות." },
    { difficulty: 8, question: "Choose the correct phrase.", displayText: "three short stories", answer: "שלושה סיפורים קצרים", options: ["שלושה סיפורים קצרים", "שלוש סיפורים קצרות", "שלושה סיפור קצר", "שלוש סיפורות קצרים"], reviewText: "שלושה סיפורים קצרים" },
    { difficulty: 9, question: "Choose the correct phrase.", displayText: "three important decisions", answer: "שלוש החלטות חשובות", options: ["שלוש החלטות חשובות", "שלושה החלטות חשובים", "שלוש החלטה חשובה", "שלושה החלטים חשובים"], reviewText: "שלוש החלטות חשובות" },
  ];

  function createNumberFormEntry(difficulty) {
    return choiceBlueprint({
      topic: "hebrew-singular-plural",
      ...randomChoice(getEligible(NUMBER_FORM_BLUEPRINTS, difficulty)),
    });
  }

  const PREPOSITION_BLUEPRINTS = [
    { difficulty: 1, displayText: "אני הולך ___ בית הספר.", answer: "ל", options: ["ל", "ב", "על", "עם"], reviewText: "אני הולך לבית הספר." },
    { difficulty: 1, displayText: "הספר נמצא ___ התיק.", answer: "ב", options: ["ב", "על", "מן", "אל"], reviewText: "הספר נמצא בתיק." },
    { difficulty: 2, displayText: "הכוס עומדת ___ השולחן.", answer: "על", options: ["על", "עם", "אל", "מן"], reviewText: "הכוס עומדת על השולחן." },
    { difficulty: 2, displayText: "דנה משחקת ___ נועה.", answer: "עם", options: ["עם", "על", "מן", "ב"], reviewText: "דנה משחקת עם נועה." },
    { difficulty: 3, displayText: "הילד יושב ___ הכיסא.", answer: "על", options: ["על", "אל", "מן", "של"], reviewText: "הילד יושב על הכיסא." },
    { difficulty: 3, displayText: "החתול מתחבא ___ המיטה.", answer: "מתחת ל", options: ["מתחת ל", "על", "אחרי", "לפני"], reviewText: "החתול מתחבא מתחת למיטה." },
    { difficulty: 4, displayText: "אנחנו חוזרים ___ הטיול בערב.", answer: "מן", options: ["מן", "אל", "על", "בין"], reviewText: "אנחנו חוזרים מן הטיול בערב." },
    { difficulty: 4, displayText: "הילדה עומדת ___ הדלת.", answer: "ליד", options: ["ליד", "בתוך", "מעל", "בלי"], reviewText: "הילדה עומדת ליד הדלת." },
    { difficulty: 5, displayText: "המורה כותבת ___ הלוח.", answer: "על", options: ["על", "אל", "מן", "אצל"], reviewText: "המורה כותבת על הלוח." },
    { difficulty: 5, displayText: "הילדים נכנסו ___ הכיתה.", answer: "אל", options: ["אל", "מן", "על", "של"], reviewText: "הילדים נכנסו אל הכיתה." },
    { difficulty: 6, displayText: "הספר של יעל נמצא ___ דני.", answer: "אצל", options: ["אצל", "על", "מעל", "בלי"], reviewText: "הספר של יעל נמצא אצל דני." },
    { difficulty: 6, displayText: "הכדור התגלגל ___ השולחן.", answer: "מתחת ל", options: ["מתחת ל", "מעל", "בגלל", "לפני"], reviewText: "הכדור התגלגל מתחת לשולחן." },
    { difficulty: 7, displayText: "הגענו מאוחר ___ הגשם.", answer: "בגלל", options: ["בגלל", "למרות", "אצל", "בין"], reviewText: "הגענו מאוחר בגלל הגשם." },
    { difficulty: 8, displayText: "___ הרעש, התלמידים המשיכו לעבוד.", answer: "למרות", options: ["למרות", "בגלל", "אצל", "מתחת ל"], reviewText: "למרות הרעש, התלמידים המשיכו לעבוד." },
    { difficulty: 9, displayText: "הפגישה נקבעה ___ המנהלת והמורה.", answer: "בין", options: ["בין", "בתוך", "מעל", "בלי"], reviewText: "הפגישה נקבעה בין המנהלת והמורה." },
  ];

  function createPrepositionEntry(difficulty) {
    const blueprint = randomChoice(getEligible(PREPOSITION_BLUEPRINTS, difficulty));
    return choiceBlueprint({
      topic: "hebrew-prepositions",
      difficulty: blueprint.difficulty,
      question: "Choose the Hebrew preposition that best completes the sentence.",
      displayText: blueprint.displayText,
      answer: blueprint.answer,
      options: blueprint.options,
      reviewText: blueprint.reviewText,
    });
  }

  const READING_BLUEPRINTS = [
    { difficulty: 1, lines: ["דנה אוכלת תפוח."], question: "What does Dana eat?", answer: "תפוח", options: ["תפוח", "ספר", "כדור", "מים"] },
    { difficulty: 1, lines: ["הכלב רץ בחצר."], question: "Who runs in the yard?", answer: "הכלב", options: ["הכלב", "החתול", "הילדה", "המורה"] },
    { difficulty: 2, lines: ["מיה קוראת ספר.", "הספר חדש."], question: "What is new?", answer: "הספר", options: ["הספר", "הכדור", "הדלת", "המים"] },
    { difficulty: 2, lines: ["נועם שותה מים.", "הכוס על השולחן."], question: "Where is the cup?", answer: "על השולחן", options: ["על השולחן", "בתיק", "בחצר", "ליד הדלת"] },
    { difficulty: 3, lines: ["אורי לקח כדור אדום.", "הוא שיחק עם דני בחצר."], question: "With whom did Ori play?", answer: "עם דני", options: ["עם דני", "עם מיה", "עם המורה", "עם הכלב"] },
    { difficulty: 3, lines: ["יעל פתחה את התיק.", "בתיק היו מחברת ועפרון."], question: "What was in the bag?", answer: "מחברת ועפרון", options: ["מחברת ועפרון", "לחם וחלב", "כדור וספר", "מפתח וטלפון"] },
    { difficulty: 4, lines: ["אמא ביקשה מרוני לסדר את השולחן.", "רוני הביאה צלחות וכוסות מהמטבח."], question: "What did Roni bring?", answer: "צלחות וכוסות", options: ["צלחות וכוסות", "ספרים ומחברות", "נעליים וכובע", "עפרון ומחק"] },
    { difficulty: 5, lines: ["בבוקר ירד גשם חזק.", "הילדים חיכו ליד הדלת עד שאבא הביא מטריות."], question: "Why did the children wait?", answer: "כי ירד גשם חזק", options: ["כי ירד גשם חזק", "כי הכדור נאבד", "כי השיעור נגמר", "כי הם רצו לאכול"] },
    { difficulty: 6, lines: ["תמר מצאה הודעה מהמורה.", "בהודעה היה כתוב להביא מחברת כחולה לשיעור הבא."], question: "What should Tamar bring?", answer: "מחברת כחולה", options: ["מחברת כחולה", "כדור אדום", "תיק חדש", "כוס מים"] },
    { difficulty: 7, lines: ["אחרי המשחק, הקבוצה בדקה את הרשימה.", "הם גילו שחסרים שני בקבוקי מים ומפה אחת."], question: "What was missing?", answer: "שני בקבוקי מים ומפה אחת", options: ["שני בקבוקי מים ומפה אחת", "שלוש מחברות ועפרון", "כרטיסים וטלפון", "לחם וחלב"] },
    { difficulty: 8, lines: ["המנהלת שלחה הודעה קצרה לצוות.", "היא ביקשה לדחות את הפגישה מפני שהאולם עדיין תפוס."], question: "Why was the meeting delayed?", answer: "כי האולם עדיין תפוס", options: ["כי האולם עדיין תפוס", "כי כולם סיימו מוקדם", "כי ירד שלג", "כי חסרו כיסאות"] },
    { difficulty: 9, lines: ["למרות העייפות, דנה המשיכה לבדוק את התשובות.", "היא רצתה לוודא שההסבר ברור לפני שהגישה את העבודה."], question: "Why did Dana keep checking?", answer: "כדי לוודא שההסבר ברור", options: ["כדי לוודא שההסבר ברור", "כדי למחוק את העבודה", "כדי לאחר לשיעור", "כדי למצוא את הכדור"] },
  ];

  function createReadingEntry(difficulty) {
    const blueprint = randomChoice(getEligible(READING_BLUEPRINTS, difficulty));
    const passage = blueprint.lines.join(" ");
    return choiceBlueprint({
      topic: "hebrew-short-reading",
      difficulty: blueprint.difficulty,
      question: blueprint.question,
      displayText: passage,
      answer: blueprint.answer,
      options: blueprint.options,
      reviewText: passage,
    });
  }

  const CORRECTION_BLUEPRINTS = [
    { difficulty: 2, question: "Choose the corrected sentence.", answer: "הילדה קוראת ספר.", options: ["הילדה קוראת ספר.", "הילדה קורא ספר.", "הילד קוראת ספר.", "הילדות קורא ספר."] },
    { difficulty: 2, question: "Choose the corrected sentence.", answer: "הילדים משחקים בחצר.", options: ["הילדים משחקים בחצר.", "הילדים משחק בחצר.", "הילד משחקים בחצר.", "הילדות משחק בחצר."] },
    { difficulty: 3, question: "Choose the sentence with correct word order.", answer: "אני הולך לבית הספר בבוקר.", options: ["אני הולך לבית הספר בבוקר.", "הולך אני לבית הספר בבוקר.", "בבית הספר אני בבוקר הולך.", "אני לבית הולך הספר בבוקר."] },
    { difficulty: 4, question: "Choose the sentence with the correct preposition.", answer: "הספר נמצא על השולחן.", options: ["הספר נמצא על השולחן.", "הספר נמצא אל השולחן.", "הספר נמצא מן השולחן.", "הספר נמצא עם השולחן."] },
    { difficulty: 5, question: "Choose the sentence with correct tense.", answer: "אתמול הם הלכו לפארק.", options: ["אתמול הם הלכו לפארק.", "אתמול הם ילכו לפארק.", "מחר הם הלכו לפארק.", "אתמול הם הולך לפארק."] },
    { difficulty: 6, question: "Choose the sentence with correct agreement.", answer: "המחברות החדשות נמצאות בתיק.", options: ["המחברות החדשות נמצאות בתיק.", "המחברות החדשים נמצאים בתיק.", "המחברת החדשות נמצאת בתיק.", "המחברות חדשה נמצא בתיק."] },
    { difficulty: 7, question: "Choose the most precise corrected sentence.", answer: "בגלל הגשם נשארנו בבית.", options: ["בגלל הגשם נשארנו בבית.", "על הגשם נשארנו בבית.", "עם הגשם נשארנו בבית.", "מן הגשם נשארנו בבית."] },
    { difficulty: 8, question: "Choose the corrected sentence.", answer: "כשהמורה נכנסה, התלמידים פתחו את המחברות.", options: ["כשהמורה נכנסה, התלמידים פתחו את המחברות.", "כשהמורה נכנס, התלמידים פתחה את המחברות.", "כשהמורה נכנסה, התלמידים פותח את המחברות.", "כשהמורה יכנס, התלמידים פתחו את המחברות אתמול."] },
    { difficulty: 9, question: "Choose the sentence with correct pronoun reference.", answer: "דנה ורות הגיעו, והן התחילו לעבוד.", options: ["דנה ורות הגיעו, והן התחילו לעבוד.", "דנה ורות הגיעו, והם התחילו לעבוד.", "דנה ורות הגיעה, והיא התחילו לעבוד.", "דנה ורות יגיעו, והן התחילו אתמול."] },
  ];

  function createCorrectionEntry(difficulty) {
    const blueprint = randomChoice(getEligible(CORRECTION_BLUEPRINTS, difficulty));
    return choiceBlueprint({
      topic: "hebrew-sentence-correction",
      difficulty: blueprint.difficulty,
      question: blueprint.question,
      answer: blueprint.answer,
      options: blueprint.options,
      reviewText: blueprint.answer,
    });
  }

  const RELATION_BLUEPRINTS = [
    { difficulty: 1, relation: "opposite", prompt: "Choose the opposite Hebrew word.", displayText: "גדול", answer: "קטן", options: ["קטן", "יפה", "מהיר", "חדש"] },
    { difficulty: 1, relation: "opposite", prompt: "Choose the opposite Hebrew word.", displayText: "חם", answer: "קר", options: ["קר", "טוב", "גבוה", "ארוך"] },
    { difficulty: 2, relation: "opposite", prompt: "Choose the opposite Hebrew word.", displayText: "למעלה", answer: "למטה", options: ["למטה", "רחוק", "ימינה", "בפנים"] },
    { difficulty: 2, relation: "synonym", prompt: "Choose a Hebrew word with a similar meaning.", displayText: "יפה", answer: "נאה", options: ["נאה", "רע", "קטן", "רחוק"] },
    { difficulty: 3, relation: "opposite", prompt: "Choose the opposite Hebrew word.", displayText: "פתוח", answer: "סגור", options: ["סגור", "נקי", "קל", "חדש"] },
    { difficulty: 3, relation: "synonym", prompt: "Choose a Hebrew word with a similar meaning.", displayText: "שמח", answer: "מאושר", options: ["מאושר", "עצוב", "חלש", "איטי"] },
    { difficulty: 4, relation: "opposite", prompt: "Choose the opposite Hebrew word.", displayText: "מהיר", answer: "איטי", options: ["איטי", "יקר", "בריא", "רחב"] },
    { difficulty: 4, relation: "synonym", prompt: "Choose a Hebrew word with a similar meaning.", displayText: "קשה", answer: "מסובך", options: ["מסובך", "פשוט", "קל", "ריק"] },
    { difficulty: 5, relation: "opposite", prompt: "Choose the opposite Hebrew word.", displayText: "זוכר", answer: "שוכח", options: ["שוכח", "שואל", "עונה", "פותח"] },
    { difficulty: 5, relation: "synonym", prompt: "Choose a Hebrew word with a similar meaning.", displayText: "עוזר", answer: "מסייע", options: ["מסייע", "מפריע", "שובר", "שוכח"] },
    { difficulty: 6, relation: "opposite", prompt: "Choose the opposite Hebrew word.", displayText: "התחלה", answer: "סוף", options: ["סוף", "דרך", "שאלה", "תקווה"] },
    { difficulty: 6, relation: "synonym", prompt: "Choose a Hebrew word with a similar meaning.", displayText: "תשובה", answer: "מענה", options: ["מענה", "שאלה", "בקשה", "טעות"] },
    { difficulty: 7, relation: "opposite", prompt: "Choose the opposite Hebrew word.", displayText: "מסכים", answer: "מתנגד", options: ["מתנגד", "מסביר", "מציע", "ממשיך"] },
    { difficulty: 8, relation: "synonym", prompt: "Choose a Hebrew word with a similar meaning.", displayText: "מדויק", answer: "נכון", options: ["נכון", "מבולבל", "מאוחר", "ריק"] },
    { difficulty: 9, relation: "opposite", prompt: "Choose the opposite Hebrew word.", displayText: "יתרון", answer: "חיסרון", options: ["חיסרון", "פתרון", "דיון", "תכנון"] },
  ];

  function createRelationEntry(difficulty) {
    const blueprint = randomChoice(getEligible(RELATION_BLUEPRINTS, difficulty));
    return choiceBlueprint({
      topic: `hebrew-${blueprint.relation}`,
      difficulty: blueprint.difficulty,
      question: blueprint.prompt,
      displayText: blueprint.displayText,
      answer: blueprint.answer,
      options: blueprint.options,
      reviewText: `${blueprint.displayText} -> ${blueprint.answer}`,
    });
  }

  const CLOZE_BLUEPRINTS = [
    { difficulty: 1, displayText: "אני ___ מים.", answer: "שותה", options: ["שותה", "קורא", "רץ", "ישן"], reviewText: "אני שותה מים." },
    { difficulty: 1, displayText: "הילד ___ כדור.", answer: "זורק", options: ["זורק", "שותה", "קוראת", "ישנה"], reviewText: "הילד זורק כדור." },
    { difficulty: 2, displayText: "החתול יושב ___ הכיסא.", answer: "על", options: ["על", "עם", "אל", "מן"], reviewText: "החתול יושב על הכיסא." },
    { difficulty: 2, displayText: "אנחנו ___ לבית הספר בבוקר.", answer: "הולכים", options: ["הולכים", "הולכת", "הלך", "ילכו"], reviewText: "אנחנו הולכים לבית הספר בבוקר." },
    { difficulty: 3, displayText: "לפני השינה הילדים ___ שיניים.", answer: "מצחצחים", options: ["מצחצחים", "מציירים", "מטפסים", "שוברים"], reviewText: "לפני השינה הילדים מצחצחים שיניים." },
    { difficulty: 3, displayText: "המורה כתבה את השאלה ___ הלוח.", answer: "על", options: ["על", "אצל", "מן", "עם"], reviewText: "המורה כתבה את השאלה על הלוח." },
    { difficulty: 4, displayText: "אתמול דני ___ מכתב קצר.", answer: "כתב", options: ["כתב", "כותב", "יכתוב", "כתבו"], reviewText: "אתמול דני כתב מכתב קצר." },
    { difficulty: 4, displayText: "מחר דנה ___ את הספר לספריה.", answer: "תחזיר", options: ["תחזיר", "החזירה", "מחזירה", "החזירו"], reviewText: "מחר דנה תחזיר את הספר לספריה." },
    { difficulty: 5, displayText: "הילדים שמרו את המשחק ___ הקופסה.", answer: "בתוך", options: ["בתוך", "מעל", "אצל", "בגלל"], reviewText: "הילדים שמרו את המשחק בתוך הקופסה." },
    { difficulty: 5, displayText: "המחברות החדשות ___ על המדף.", answer: "נמצאות", options: ["נמצאות", "נמצא", "נמצאים", "נמצאת"], reviewText: "המחברות החדשות נמצאות על המדף." },
    { difficulty: 6, displayText: "אם נסיים מוקדם, ___ לפארק אחרי הצהריים.", answer: "נלך", options: ["נלך", "הלכנו", "הולכים", "הלך"], reviewText: "אם נסיים מוקדם, נלך לפארק אחרי הצהריים." },
    { difficulty: 6, displayText: "רוני התקשרה לחברה שלה ___ לעדכן אותה.", answer: "כדי", options: ["כדי", "בלי", "מתחת", "אצל"], reviewText: "רוני התקשרה לחברה שלה כדי לעדכן אותה." },
    { difficulty: 7, displayText: "___ שהדרך הייתה ארוכה, הגענו בזמן.", answer: "למרות", options: ["למרות", "בגלל", "מתחת ל", "אצל"], reviewText: "למרות שהדרך הייתה ארוכה, הגענו בזמן." },
    { difficulty: 8, displayText: "הצוות בדק את הרשימה ___ שלא יחסר דבר.", answer: "כדי", options: ["כדי", "בגלל", "ליד", "אחרי"], reviewText: "הצוות בדק את הרשימה כדי שלא יחסר דבר." },
    { difficulty: 9, displayText: "המנהלת ביקשה שההודעה ___ לכל ההורים עד הערב.", answer: "תישלח", options: ["תישלח", "נשלחה", "שולחת", "שלחו"], reviewText: "המנהלת ביקשה שההודעה תישלח לכל ההורים עד הערב." },
  ];

  function createClozeEntry(difficulty) {
    const blueprint = randomChoice(getEligible(CLOZE_BLUEPRINTS, difficulty));
    return choiceBlueprint({
      topic: "hebrew-cloze",
      difficulty: blueprint.difficulty,
      question: "Choose the word that completes the Hebrew sentence.",
      displayText: blueprint.displayText,
      answer: blueprint.answer,
      options: blueprint.options,
      reviewText: blueprint.reviewText,
    });
  }

  globalThis.createHebrewGeneratedSessionQuestion = (difficulty) => {
    const picked = pickGeneratedEntry(
      [
        createStaticBlueprintEntry,
        { minLevel: 2, create: createRootFamilyEntry },
        createVerbFormEntry,
        createNumberFormEntry,
        createPrepositionEntry,
        createReadingEntry,
        { minLevel: 2, create: createCorrectionEntry },
        createRelationEntry,
        createClozeEntry,
      ],
      difficulty
    );
    if (!picked) {
      return null;
    }
    return {
      type: "hebrew-choice",
      difficulty: picked.difficulty,
      mode: "choice",
      questionText: picked.question,
      displayText: picked.displayText || "",
      extraText: picked.extraText || "",
      extraHtml: "",
      visualHtml: picked.visualHtml || "",
      visualSummary: picked.visualSummary || "",
      reviewText: picked.reviewText || "",
      options: shuffle(picked.options),
      answerValue: picked.answer,
      answerLabel: picked.answer,
      isHebrew: true,
      forceCompactMain: true,
    };
  };
})();

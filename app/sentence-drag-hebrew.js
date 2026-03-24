const SENTENCE_DRAG_HEBREW_DATA = (() => {
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

  function buildFilledSentence(templateParts, answers) {
    return templateParts
      .map((part, index) => `${part}${index < answers.length ? answers[index] : ""}`)
      .join("");
  }

  function buildEntry({
    question,
    templateParts,
    answer,
    choices,
    difficulty,
    extraText,
    reviewText,
  }) {
    const normalizedTemplateParts = Array.isArray(templateParts)
      ? templateParts.map((part) => String(part))
      : [];
    const normalizedAnswer = Array.isArray(answer) ? answer.map((part) => String(part)) : [];
    const normalizedChoices = uniqueStrings([
      ...normalizedAnswer,
      ...(Array.isArray(choices) ? choices.map((choice) => String(choice)) : []),
    ]);

    if (!String(question || "").trim()) {
      throw new Error("Hebrew drag questions must have a question.");
    }

    if (normalizedTemplateParts.length !== normalizedAnswer.length + 1) {
      throw new Error("Hebrew drag questions must have one more template part than answers.");
    }

    if (normalizedChoices.length < normalizedAnswer.length + 2) {
      throw new Error("Hebrew drag questions must include clear distractors.");
    }

    return {
      question,
      templateParts: normalizedTemplateParts,
      choices: normalizedChoices,
      answer: normalizedAnswer,
      difficulty: clampDifficulty(difficulty),
      extraText: typeof extraText === "string" ? extraText : "",
      reviewText:
        typeof reviewText === "string"
          ? reviewText
          : buildFilledSentence(normalizedTemplateParts, normalizedAnswer),
      isHebrew: true,
    };
  }

  function pick(values) {
    return values[Math.floor(Math.random() * values.length)];
  }

  function pickDistinct(values, count) {
    const shuffled = shuffleArray(values);
    return shuffled.slice(0, count);
  }

  function materializeBlueprint(blueprint, fallbackDifficulty = 3) {
    const choices = uniqueStrings([
      ...blueprint.answer,
      ...(blueprint.distractors || []),
    ]);

    return buildEntry({
      question: blueprint.question,
      templateParts: blueprint.templateParts,
      answer: blueprint.answer,
      choices,
      difficulty: blueprint.difficulty ?? fallbackDifficulty,
      extraText: blueprint.extraText,
      reviewText: blueprint.reviewText,
    });
  }

  const STATIC_BLUEPRINTS = [
    {
      question: "השלימו את המשפט.",
      templateParts: ["הילד ", " כדור בחצר."],
      answer: ["בועט"],
      distractors: ["קורא", "שותה", "ישן"],
      difficulty: 1,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["נוגה ", " ספר בספריה."],
      answer: ["קוראת"],
      distractors: ["רץ", "מציירת", "קופצת"],
      difficulty: 1,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["אנחנו ", " לבית הספר בבוקר."],
      answer: ["הולכים"],
      distractors: ["אוכלים", "שרים", "קופצים"],
      difficulty: 1,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["הכלב ", " מהר בחצר."],
      answer: ["רץ"],
      distractors: ["קורא", "כותב", "ישב"],
      difficulty: 1,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["אמא ", " עוגה במטבח."],
      answer: ["אופה"],
      distractors: ["זורקת", "מנקה", "מציירת"],
      difficulty: 1,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["הילדה ", " מים קרים."],
      answer: ["שותה"],
      distractors: ["שומעת", "קוראת", "מטפסת"],
      difficulty: 1,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["התלמידים ", " בשקט בכיתה."],
      answer: ["יושבים"],
      distractors: ["רצים", "נוסעים", "טסים"],
      difficulty: 2,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["המורה ", " על הלוח."],
      answer: ["כותבת"],
      distractors: ["שוחה", "מטפסת", "קופצת"],
      difficulty: 2,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["אחרי הארוחה אנחנו ", " את השולחן."],
      answer: ["מנקים"],
      distractors: ["צובעים", "בונים", "שוברים"],
      difficulty: 2,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["לפני השינה אנחנו ", " שיניים."],
      answer: ["מצחצחים"],
      distractors: ["אוכלים", "רוקדים", "זורקים"],
      difficulty: 2,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["החתול יושב ", " הכיסא."],
      answer: ["על"],
      distractors: ["בתוך", "ליד", "מתחת"],
      difficulty: 2,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["הספר נמצא ", " התיק."],
      answer: ["בתוך"],
      distractors: ["על", "ליד", "מול"],
      difficulty: 2,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["נועה וגדעון ", " בפארק אחרי הלימודים."],
      answer: ["משחקים"],
      distractors: ["מבשלים", "קוראים", "ישנים"],
      difficulty: 3,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["אנחנו מדברים ", " המורה."],
      answer: ["עם"],
      distractors: ["על", "ליד", "אחרי"],
      difficulty: 3,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["הילדה ", " בזהירות את הכוס על השולחן."],
      answer: ["מניחה"],
      distractors: ["משאירה", "שוברת", "מרימה"],
      difficulty: 3,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["הילדים אוכלים ", " במטבח."],
      answer: ["ארוחת בוקר"],
      distractors: ["משחקים", "שיעור", "רעש"],
      difficulty: 3,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["לפני השיעור אנחנו ", " את התיקים שלנו."],
      answer: ["מכינים"],
      distractors: ["שוברים", "מציירים", "זורקים"],
      difficulty: 3,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["החברים ", " במפה טובה כדי למצוא את הדרך לפארק."],
      answer: ["משתמשים"],
      distractors: ["בונים", "מציירים", "מכבסים"],
      difficulty: 4,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["לפני השיעור המורה ", " את הדפים ו", " את ההוראות על הלוח."],
      answer: ["חילקה", "כתבה"],
      distractors: ["קראה", "ציירה", "הקשיבה"],
      difficulty: 4,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["אחרי הארוחה אנחנו ", " את המטבח ו", " את הרצפה."],
      answer: ["מנקים", "מטאטאים"],
      distractors: ["מציירים", "קוראים", "מקשיבים"],
      difficulty: 4,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["נועה ", " את החלון ואז ", " את הווילון."],
      answer: ["פותחת", "סוגרת"],
      distractors: ["בונה", "קוראת", "כותבת"],
      difficulty: 4,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["הילד ", " את התיק שלו כי הוא יוצא לטיול."],
      answer: ["מכין"],
      distractors: ["שובר", "מצייר", "קורא"],
      difficulty: 4,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["הילדה ", " בזהירות את הכוס ו", " אותה על השולחן."],
      answer: ["מרימה", "מניחה"],
      distractors: ["זורקת", "מסתירה", "מנפחת"],
      difficulty: 4,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["לפני הטיול המשפחה ", " את התיקים, ", " מים ו", " כובע."],
      answer: ["אורזת", "לוקחת", "מביאה"],
      distractors: ["מנקה", "מציירת", "שוברת"],
      difficulty: 5,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["החוקר ", " את המים, ", " את התוצאות ו", " את המסקנה."],
      answer: ["מודד", "רושם", "כותב"],
      distractors: ["שוטף", "זורק", "שומע"],
      difficulty: 5,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["אחרי שהתברר שהמשימה קשה, התלמידים ", " יחד, ", " רעיונות טובים ו", " פתרון."],
      answer: ["עובדים", "מעלים", "מוצאים"],
      distractors: ["רץ", "אופה", "מציירים"],
      difficulty: 5,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["הקבוצה ", " את המפה, ", " את הנהר ו", " את הדרך הנכונה."],
      answer: ["בודקת", "מוצאת", "בוחרת"],
      distractors: ["מנקה", "כותבת", "שוחה"],
      difficulty: 5,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["אם הספרים כבדים, כדאי ", " אותם בזהירות ולשים אותם על השולחן."],
      answer: ["להרים"],
      distractors: ["לצייר", "לשיר", "לקפוץ"],
      difficulty: 5,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["לפני ההצגה הילדים ", " את הכיסאות, ", " את השלטים ו", " בשקט."],
      answer: ["מסדרים", "תולים", "יושבים"],
      distractors: ["מרימים", "מנקים", "קופצים"],
      difficulty: 5,
    },
  ];

  const STATIC_BANK = STATIC_BLUEPRINTS.map(materializeBlueprint);

  const GENERATED_BLUEPRINTS = {
    1: [
      (level) => {
        const prompts = [
          {
            question: "השלימו את המשפט.",
            templateParts: ["הילדה ", " פרח בגינה."],
            answer: ["קוטפת"],
            distractors: ["שומעת", "פותחת", "מספרת"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["הילד ", " כדור אדום."],
            answer: ["זורק"],
            distractors: ["קורא", "סוגר", "בונה"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["החתול ", " על הספה."],
            answer: ["ישן"],
            distractors: ["רץ", "כותב", "מדבר"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["אנחנו ", " לשיעור."],
            answer: ["נכנסים"],
            distractors: ["מציירים", "שוברים", "מבשלים"],
          },
        ];

        return materializeBlueprint(pick(prompts), level);
      },
    ],
    2: [
      (level) => {
        const prompts = [
          {
            question: "השלימו את המשפט.",
            templateParts: ["הספר נמצא ", " המדף."],
            answer: ["על"],
            distractors: ["בתוך", "ליד", "אחר"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["הכדור נמצא ", " השולחן."],
            answer: ["מתחת"],
            distractors: ["על", "ליד", "בקצה"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["אחרי האוכל אנחנו ", " ידיים."],
            answer: ["שוטפים"],
            distractors: ["צובעים", "קוראים", "מגלים"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["לפני השינה אני ", " סיפור."],
            answer: ["קורא"],
            distractors: ["רץ", "מטפס", "קופץ"],
          },
        ];

        return materializeBlueprint(pick(prompts), level);
      },
    ],
    3: [
      (level) => {
        const prompts = [
          {
            question: "השלימו את המשפט.",
            templateParts: ["החברות ", " יחד אחרי בית הספר."],
            answer: ["מציירות"],
            distractors: ["שוברות", "טסות", "מרימות"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["אנחנו מדברים ", " המורה שלנו."],
            answer: ["עם"],
            distractors: ["על", "ליד", "אחרי"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["הילד ", " בזהירות את הספר החדש."],
            answer: ["פותח"],
            distractors: ["זורק", "מכין", "קונה"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["אחרי ההפסקה אנחנו ", " לכיתה."],
            answer: ["חוזרים"],
            distractors: ["מציירים", "נוסעים", "שוחים"],
          },
        ];

        return materializeBlueprint(pick(prompts), level);
      },
    ],
    4: [
      (level) => {
        const prompts = [
          {
            question: "השלימו את המשפט.",
            templateParts: ["לפני השיעור המורה ", " את הדפים ו", " את ההוראות על הלוח."],
            answer: ["חילקה", "כתבה"],
            distractors: ["קראה", "ציירה", "שמעה"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["נוגה ", " את החלון ואז ", " את הווילון."],
            answer: ["פותחת", "סוגרת"],
            distractors: ["קוראת", "קופצת", "זורקת"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["אחרי הארוחה אנחנו ", " את המטבח ו", " את הרצפה."],
            answer: ["מנקים", "מטאטאים"],
            distractors: ["שוברים", "מציירים", "אופים"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["הילדה ", " בזהירות את הכוס ו", " אותה על השולחן."],
            answer: ["מרימה", "מניחה"],
            distractors: ["זורקת", "מסתירה", "שוברת"],
          },
        ];

        return materializeBlueprint(pick(prompts), level);
      },
    ],
    5: [
      (level) => {
        const prompts = [
          {
            question: "השלימו את המשפט.",
            templateParts: ["לפני הטיול המשפחה ", " את התיקים, ", " מים ו", " כובע."],
            answer: ["אורזת", "לוקחת", "מביאה"],
            distractors: ["מנקה", "מציירת", "שוברת"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["החוקר ", " את המים, ", " את התוצאות ו", " את המסקנה."],
            answer: ["מודד", "רושם", "כותב"],
            distractors: ["שוטף", "זורק", "שורק"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["אחרי שהתברר שהמשימה קשה, התלמידים ", " יחד, ", " רעיונות טובים ו", " פתרון."],
            answer: ["עובדים", "מעלים", "מוצאים"],
            distractors: ["אופים", "שוחים", "קופצים"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["אם הספרים כבדים, כדאי ", " אותם בזהירות ולשים אותם על השולחן."],
            answer: ["להרים"],
            distractors: ["לצייר", "לשיר", "לקפוץ"],
          },
        ];

        return materializeBlueprint(pick(prompts), level);
      },
    ],
  };

  function createGeneratedEntry(difficulty) {
    const level = clampDifficulty(difficulty);
    const generator = pick(GENERATED_BLUEPRINTS[level] || GENERATED_BLUEPRINTS[3]);
    return generator(level);
  }

  return {
    bank: STATIC_BANK,
    createGeneratedEntry,
  };
})();

function createSentenceDragHebrewGeneratedEntry(difficulty) {
  return SENTENCE_DRAG_HEBREW_DATA.createGeneratedEntry(difficulty);
}

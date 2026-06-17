const SENTENCE_DRAG_HEBREW_DATA = (() => {
  function clampDifficulty(value) {
    const level = Number.parseInt(value, 10);
    if (!Number.isFinite(level)) {
      return 3;
    }

    return Math.min(10, Math.max(1, level));
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
    {
      question: "השלימו את המשפט.",
      templateParts: ["הציפור ", " על העץ."],
      answer: ["שרה"],
      distractors: ["רצה", "כותב", "שותה"],
      difficulty: 1,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["אבא ", " עיתון בסלון."],
      answer: ["קורא"],
      distractors: ["בועט", "קופצת", "ישן"],
      difficulty: 1,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["הסוס ", " עשב בשדה."],
      answer: ["אוכל"],
      distractors: ["כותב", "פותח", "שר"],
      difficulty: 1,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["הילד ", " בית במחברת."],
      answer: ["מצייר"],
      distractors: ["שותה", "רץ", "ישן"],
      difficulty: 1,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["דנה ", " מעיל כחול."],
      answer: ["לובשת"],
      distractors: ["אוכלת", "קוראת", "זורקת"],
      difficulty: 1,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["אנחנו ", " שיר שמח."],
      answer: ["שרים"],
      distractors: ["שותים", "קופצים", "ישנים"],
      difficulty: 1,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["הילד עומד ", " הדלת."],
      answer: ["ליד"],
      distractors: ["בתוך", "על", "מתחת"],
      difficulty: 2,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["בחורף אנחנו ", " מעילים."],
      answer: ["לובשים"],
      distractors: ["אוכלים", "שותים", "שרים"],
      difficulty: 2,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["בבוקר אני ", " את המיטה."],
      answer: ["מסדר"],
      distractors: ["שותה", "רץ", "צובע"],
      difficulty: 2,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["הילדים ", " בחצר אחרי הלימודים."],
      answer: ["משחקים"],
      distractors: ["מבשלים", "ישנים", "כותבים"],
      difficulty: 2,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["הצלחת נמצאת ", " השולחן."],
      answer: ["על"],
      distractors: ["בתוך", "מאחורי", "מתחת"],
      difficulty: 2,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["אחרי הגשם יש ", " ברחוב."],
      answer: ["שלוליות"],
      distractors: ["עפרונות", "ספרים", "כיסאות"],
      difficulty: 2,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["כדי לשמוע טוב, אנחנו ", " בשקט."],
      answer: ["מקשיבים"],
      distractors: ["מדברים", "קופצים", "אוכלים"],
      difficulty: 3,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["יונתן ", " מחברת חדשה לכיתה."],
      answer: ["מביא"],
      distractors: ["שובר", "שוחה", "צובע"],
      difficulty: 3,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["המשפחה יושבת ", " השולחן לארוחת ערב."],
      answer: ["סביב"],
      distractors: ["בתוך", "מתחת", "מעל"],
      difficulty: 3,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["אחרי המשחק השחקנים ", " מים."],
      answer: ["שותים"],
      distractors: ["כותבים", "מציירים", "זורקים"],
      difficulty: 3,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["כשקר בחוץ, אנחנו ", " את החלון."],
      answer: ["סוגרים"],
      distractors: ["מציירים", "קוראים", "שוברים"],
      difficulty: 3,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["הילדים ", " את הצעצועים ו", " את החדר."],
      answer: ["אוספים", "מסדרים"],
      distractors: ["שוברים", "קוראים", "אופים"],
      difficulty: 4,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["הטבח ", " את הירקות ואז ", " אותם לסלט."],
      answer: ["שוטף", "חותך"],
      distractors: ["מצייר", "זורק", "שר"],
      difficulty: 4,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["לפני המסיבה אנחנו ", " בלונים ו", " קישוטים."],
      answer: ["מנפחים", "תולים"],
      distractors: ["מוחקים", "קוראים", "שוחים"],
      difficulty: 4,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["הילדה ", " את המפתח ו", " אותו בתיק."],
      answer: ["מחפשת", "מוצאת"],
      distractors: ["אופה", "צובעת", "קופצת"],
      difficulty: 4,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["הגשם הפסיק, ולכן הילדים ", " החוצה לשחק."],
      answer: ["יוצאים"],
      distractors: ["קוראים", "שוברים", "אופים"],
      difficulty: 4,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["המדריך ", " את הכללים ו", " על השאלות."],
      answer: ["מסביר", "עונה"],
      distractors: ["מוחק", "זורק", "שותה"],
      difficulty: 4,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["כדי להכין כריך, דניאל ", " לחם, ", " גבינה ו", " ירקות."],
      answer: ["פורסת", "מורחת", "מוסיפה"],
      distractors: ["שוטפת", "צובעת", "קופצת"],
      difficulty: 5,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["לפני שהאורחים מגיעים, המשפחה ", " את הסלון, ", " את השולחן ו", " נרות."],
      answer: ["מנקה", "מסדרת", "מדליקה"],
      distractors: ["שוחה", "שוברת", "מציירת"],
      difficulty: 5,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["במהלך הניסוי התלמידים ", " את החומרים, ", " זמן ו", " תוצאות."],
      answer: ["מערבבים", "מודדים", "כותבים"],
      distractors: ["רצים", "שרים", "זורקים"],
      difficulty: 5,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["בדרך לבית הספר נעם ", " חבר, ", " אותו ו", " ללכת."],
      answer: ["פוגש", "מברך", "ממשיך"],
      distractors: ["צובע", "שובר", "אופה"],
      difficulty: 5,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["כשהילד לא מבין, הוא ", " את ההוראה שוב, ", " שאלה ו", " את התשובה."],
      answer: ["קורא", "שואל", "מסמן"],
      distractors: ["קופץ", "שוטף", "שובר"],
      difficulty: 5,
    },
    {
      question: "השלימו את המשפט.",
      templateParts: ["בגינה הילדים ", " את הצמחים, ", " עשבים ו", " עלים."],
      answer: ["משקים", "עוקרים", "אוספים"],
      distractors: ["מדליקים", "מבשלים", "כותבים"],
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
      (level) => {
        const prompts = [
          {
            question: "השלימו את המשפט.",
            templateParts: ["התינוק ", " בעריסה."],
            answer: ["בוכה"],
            distractors: ["קורא", "בועט", "כותב"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["הדג ", " במים."],
            answer: ["שוחה"],
            distractors: ["מצייר", "ישן", "פותח"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["הילדה ", " בקול."],
            answer: ["צוחקת"],
            distractors: ["בונה", "שותה", "כותבת"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["אבא ", " סנדוויץ'."],
            answer: ["מכין"],
            distractors: ["רץ", "ישן", "קורא"],
          },
        ];

        return materializeBlueprint(pick(prompts), level);
      },
      (level) => {
        const prompts = [
          {
            question: "השלימו את המשפט.",
            templateParts: ["המעיל ", " על הקולב."],
            answer: ["תלוי"],
            distractors: ["יושב", "שוחה", "כותב"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["אחרי המשחק הילדים ", " את הכדורים."],
            answer: ["אוספים"],
            distractors: ["אוכלים", "כותבים", "שותים"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["בצהריים אנחנו ", " מרק חם."],
            answer: ["אוכלים"],
            distractors: ["קוראים", "רצים", "מציירים"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["המחברת נמצאת ", " התיק."],
            answer: ["בתוך"],
            distractors: ["ליד", "מעל", "מתחת"],
          },
        ];

        return materializeBlueprint(pick(prompts), level);
      },
      (level) => {
        const prompts = [
          {
            question: "השלימו את המשפט.",
            templateParts: ["הילדים ", " בתור לפני הכניסה."],
            answer: ["עומדים"],
            distractors: ["שוחים", "אופים", "כותבים"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["מיכל ", " לחברתה את המשחק."],
            answer: ["מסבירה"],
            distractors: ["שותה", "קופצת", "שוברת"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["המשפחה ", " ליד הים בשבת."],
            answer: ["מטיילת"],
            distractors: ["כותבת", "מנקה", "מבשלת"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["כשיש רעש, אנחנו מבקשים ", "."],
            answer: ["שקט"],
            distractors: ["עיפרון", "כיסא", "חלון"],
          },
        ];

        return materializeBlueprint(pick(prompts), level);
      },
      (level) => {
        const prompts = [
          {
            question: "השלימו את המשפט.",
            templateParts: ["הספרנית ", " את הספרים למדף ו", " את השולחן."],
            answer: ["מחזירה", "מסדרת"],
            distractors: ["שוחה", "בועטת", "שוברת"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["אחרי הציור הילדים ", " את המכחולים ו", " את הצבעים."],
            answer: ["שוטפים", "סוגרים"],
            distractors: ["אופים", "שרים", "מוחקים"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["השליח ", " בדלת ו", " את החבילה."],
            answer: ["מצלצל", "מוסר"],
            distractors: ["מצייר", "קופץ", "שוטף"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["המדריכה ", " את הרשימה ו", " מדבקות."],
            answer: ["בודקת", "מחלקת"],
            distractors: ["ישנה", "זורקת", "אופה"],
          },
        ];

        return materializeBlueprint(pick(prompts), level);
      },
      (level) => {
        const prompts = [
          {
            question: "השלימו את המשפט.",
            templateParts: ["לפני האימון השחקנים ", " נעליים, ", " בקבוקים ו", " למגרש."],
            answer: ["נועלים", "ממלאים", "רצים"],
            distractors: ["מציירים", "מוחקים", "ישנים"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["במטבח רותי ", " ירקות, ", " סלט ו", " אותו לשולחן."],
            answer: ["שוטפת", "חותכת", "מגישה"],
            distractors: ["קופצת", "מסתירה", "שורקת"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["כשהכיתה יוצאת לסיור, המורה ", " תלמידים, ", " כללים ו", " את הקבוצה."],
            answer: ["סופרת", "מזכירה", "מובילה"],
            distractors: ["צובעת", "אופה", "שוברת"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["אחרי הקריאה התלמידים ", " את הסיפור, ", " על שאלות ו", " דעות."],
            answer: ["מסכמים", "עונים", "משתפים"],
            distractors: ["מכבסים", "קופצים", "שוברים"],
          },
        ];

        return materializeBlueprint(pick(prompts), level);
      },
      (level) => {
        const prompts = [
          {
            question: "השלימו את המשפט.",
            templateParts: ["לפני פתיחת החנות העובדים ", " מדפים, ", " מחירים ו", " את הקופה."],
            answer: ["מסדרים", "בודקים", "פותחים"],
            distractors: ["שוחים", "צובעים", "מסתתרים"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["כאשר התוכנית השתנתה, המדריך ", " את הקבוצה, ", " מסלול אחר ו", " אישור."],
            answer: ["עדכן", "הציע", "ביקש"],
            distractors: ["שבר", "אפה", "קפץ"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["כדי לשמור על סדר, הילדים ", " את הקלפים, ", " אותם ו", " לקופסה."],
            answer: ["ממיינים", "סופרים", "מחזירים"],
            distractors: ["מבשלים", "צובעים", "שוחים"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["אם הכדור נעלם, כדאי ", " מתחת לספסל ו", " את הילדים ליד המגרש."],
            answer: ["לחפש", "לשאול"],
            distractors: ["לאפות", "למחוק", "לקפוץ"],
          },
        ];

        return materializeBlueprint(pick(prompts), level);
      },
      (level) => {
        const prompts = [
          {
            question: "השלימו את המשפט.",
            templateParts: ["אחרי שהמצגת לא נפתחה, תמר ", " את הקובץ, ", " מחשב ו", " להסביר."],
            answer: ["בדקה", "החליפה", "המשיכה"],
            distractors: ["אפתה", "קיפלה", "צבעה"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["כדי לחסוך זמן, הצוות ", " משימות, ", " לוח זמנים ו", " לעבוד מיד."],
            answer: ["חילק", "קבע", "התחיל"],
            distractors: ["שטף", "שבר", "שר"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["כשהילד נפצע קלות, המדריך ", " את המשחק, ", " את השריטה ו", " להורים."],
            answer: ["עצר", "ניקה", "קרא"],
            distractors: ["צייר", "אפה", "טיפס"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["לפני שליחת המכתב, דנה ", " אותו שוב ו", " שגיאת כתיב אחת."],
            answer: ["קראה", "תיקנה"],
            distractors: ["זרקה", "שטפה", "קפצה"],
          },
        ];

        return materializeBlueprint(pick(prompts), level);
      },
      (level) => {
        const prompts = [
          {
            question: "השלימו את המשפט.",
            templateParts: ["אחרי שהמדריך הבחין בסכנה, הוא ", " את הקבוצה, ", " את הבעיה ו", " דרך בטוחה יותר."],
            answer: ["עצר", "הסביר", "בחר"],
            distractors: ["אפה", "צבע", "שחה"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["כדי להכין את הניסוי, התלמידים ", " שאלה, ", " ציוד ו", " את השלבים."],
            answer: ["ניסחו", "אספו", "תיעדו"],
            distractors: ["שברו", "רקדו", "מחקו"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["כאשר התוצאות היו שונות מהצפוי, החוקרת ", " את המדידה, ", " על הניסוי ו", " נתונים."],
            answer: ["בדקה", "חזרה", "השוותה"],
            distractors: ["קפצה", "צבעה", "אפתה"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["בסיום הפרויקט הקבוצה ", " את המסקנות, ", " למשוב ו", " את הדוח."],
            answer: ["הציגה", "הקשיבה", "תיקנה"],
            distractors: ["שטפה", "הסתירה", "קשרה"],
          },
        ];

        return materializeBlueprint(pick(prompts), level);
      },
      (level) => {
        const prompts = [
          {
            question: "השלימו את המשפט.",
            templateParts: ["כדי לפתור את התקלה, הטכנאי ", " את מקור הבעיה, ", " את החשמל ו", " חלק פגום."],
            answer: ["זיהה", "ניתק", "החליף"],
            distractors: ["אפה", "צייר", "קפץ"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["לאחר שהתקבלו הצעות שונות, הוועדה ", " עלויות, ", " סיכונים ו", " פתרון מאוזן."],
            answer: ["השוותה", "בדקה", "בחרה"],
            distractors: ["צבעה", "שברה", "שטפה"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["כאשר התברר שהמידע חסר, החוקרים ", " מקור נוסף, ", " את הפרטים ו", " את הטבלה."],
            answer: ["חיפשו", "אימתו", "עדכנו"],
            distractors: ["שחו", "אפו", "קפצו"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["לפני פרסום ההודעה, הצוות ", " גרסה קצרה, ", " משפט מבלבל ו", " שאין טעויות."],
            answer: ["ניסח", "מחק", "בדק"],
            distractors: ["קפץ", "אפה", "שחה"],
          },
        ];

        return materializeBlueprint(pick(prompts), level);
      },
      (level) => {
        const prompts = [
          {
            question: "השלימו את המשפט.",
            templateParts: ["אחרי שהנתונים סתרו את ההשערה, החוקרת ", " את השיטה, ", " גורם חריג ו", " מסקנה זהירה."],
            answer: ["בחנה", "זיהתה", "ניסחה"],
            distractors: ["קיפלה", "צבעה", "שברה"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["כדי ליישב את המחלוקת, המגשר ", " לשני הצדדים, ", " בין עובדות לדעות ו", " פשרה."],
            answer: ["הקשיב", "הפריד", "הציע"],
            distractors: ["אפה", "קפץ", "צבע"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["לפני קבלת ההחלטה, ההנהלה ", " חלופות, ", " השלכות ו", " מדדים להצלחה."],
            answer: ["בחנה", "העריכה", "קבעה"],
            distractors: ["שטפה", "שכחה", "קפצה"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["כאשר התהליך התארך, הצוות ", " דרישות, ", " החלטות ו", " נושאים מורכבים לשלב הבא."],
            answer: ["צמצם", "תיעד", "השאיר"],
            distractors: ["צבע", "אפה", "קיפל"],
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
    6: [
      (level) => {
        const prompts = [
          {
            question: "השלימו את המשפט.",
            templateParts: ["לפני היציאה נועה ", " את הטלפון, ", " את המפתחות ו", " את הדלת."],
            answer: ["בודקת", "לוקחת", "נועלת"],
            distractors: ["מציירת", "שוברת", "שוכחת"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["כשהאוטובוס התעכב, הנוסעים ", " הודעה, ", " תחנה חלופית ו", " בסבלנות."],
            answer: ["קיבלו", "חיפשו", "חיכו"],
            distractors: ["סגרו", "בישלו", "שחו"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["במהלך הפגישה הצוות ", " את הרעיונות, ", " שאלות ו", " החלטה משותפת."],
            answer: ["רשם", "שאל", "קיבל"],
            distractors: ["שבר", "ניקה", "טיפס"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["אם השביל רטוב, כדאי ", " לאט ו", " היטב על הצעדים."],
            answer: ["ללכת", "להסתכל"],
            distractors: ["לצעוק", "לרוץ", "למחוק"],
          },
        ];

        return materializeBlueprint(pick(prompts), level);
      },
    ],
    7: [
      (level) => {
        const prompts = [
          {
            question: "השלימו את המשפט.",
            templateParts: ["אחרי שהמחשב הפסיק לעבוד, דניאל ", " את הכבל, ", " את המכשיר מחדש ו", " הודעה לטכנאי."],
            answer: ["בדק", "הפעיל", "שלח"],
            distractors: ["אפה", "צבע", "ליטף"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["כדי להגיע בזמן, המשפחה ", " מוקדם, ", " את המזוודות ו", " מיד למכונית."],
            answer: ["קמה", "סידרה", "ירדה"],
            distractors: ["כתבה", "שתתה", "ציירה"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["לפני ההצגה התלמידים ", " את הכיסאות, ", " את השלטים ו", " את הקהל בשקט."],
            answer: ["סידרו", "תלו", "קיבלו"],
            distractors: ["שברו", "מחקו", "שחו"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["כשהדיון נעשה ארוך, המנהלת ", " את הנקודות המרכזיות ו", " לעבור להחלטה."],
            answer: ["סיכמה", "ביקשה"],
            distractors: ["שכחה", "הקפיצה", "ניקתה"],
          },
        ];

        return materializeBlueprint(pick(prompts), level);
      },
    ],
    8: [
      (level) => {
        const prompts = [
          {
            question: "השלימו את המשפט.",
            templateParts: ["למרות הגשם החזק, המטיילים ", " מחסה, ", " את המפה ו", " מסלול בטוח להמשך הדרך."],
            answer: ["חיפשו", "פתחו", "בחרו"],
            distractors: ["זרקו", "אפו", "קפצו"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["בסוף היום אנחנו ", " את ההוצאות, ", " את הקבלות ו", " מה צריך לקנות מחר."],
            answer: ["רושמים", "שומרים", "בודקים"],
            distractors: ["מוחקים", "שוברים", "צובעים"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["אחרי שקראו את ההוראות, המשתתפים ", " את המשימה, ", " ביניהם תפקידים ו", " לעבוד."],
            answer: ["הבינו", "חילקו", "התחילו"],
            distractors: ["איבדו", "שטפו", "קשרו"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["כדי למנוע בלבול, המורה ", " דוגמה, ", " כל שלב ו", " זמן לשאלות."],
            answer: ["הראתה", "הסבירה", "השאירה"],
            distractors: ["שכחה", "סגרה", "טיפסה"],
          },
        ];

        return materializeBlueprint(pick(prompts), level);
      },
    ],
    9: [
      (level) => {
        const prompts = [
          {
            question: "השלימו את המשפט.",
            templateParts: ["כשהרכבת איחרה, הנוסעים ", " מידע חדש, ", " את לוח הזמנים ו", " אם לעבור לקו אחר."],
            answer: ["ביקשו", "בדקו", "החליטו"],
            distractors: ["צבעו", "שחו", "מחאו"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["לפני שהגישו את הדוח, חברי הצוות ", " את הנתונים, ", " את הניסוח ו", " שהמסקנה ברורה."],
            answer: ["השוו", "שיפרו", "בדקו"],
            distractors: ["קפצו", "אפו", "סגרו"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["כדי לארגן את האירוע, השכנים ", " תאריך מתאים, ", " רשימת ציוד ו", " מי אחראי על כל חלק."],
            answer: ["בחרו", "כתבו", "קבעו"],
            distractors: ["מחקו", "שברו", "צעקו"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["אחרי ששמעו את כל הדעות, המשתתפים ", " שוב את הבעיה ו", " פתרון מעשי."],
            answer: ["הגדירו", "מצאו"],
            distractors: ["שטפו", "הסתירו", "ציירו"],
          },
        ];

        return materializeBlueprint(pick(prompts), level);
      },
    ],
    10: [
      (level) => {
        const prompts = [
          {
            question: "השלימו את המשפט.",
            templateParts: ["למרות הלחץ, היא ", " לקרוא את ההודעה עד הסוף, ", " את הפרטים החשובים ו", " תשובה מדויקת."],
            answer: ["המשיכה", "סימנה", "ניסחה"],
            distractors: ["שכחה", "שברה", "קיפלה"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["כשהתברר שחסרים מסמכים, העובדים ", " מי יכול להביא אותם, ", " את הפגישה ו", " עדכון לכל המשתתפים."],
            answer: ["בדקו", "דחו", "שלחו"],
            distractors: ["אפו", "צבעו", "הרימו"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["כדי לסיים בזמן, המנהלת ", " את המשימה לחלקים, ", " סדר עדיפויות ו", " אחרי ההתקדמות של כל צוות."],
            answer: ["חילקה", "קבעה", "עקבה"],
            distractors: ["שטפה", "שכחה", "ציירה"],
          },
          {
            question: "השלימו את המשפט.",
            templateParts: ["בסוף הוויכוח כולם ", " שהפתרון הטוב ביותר הוא ", " בהדרגה ו", " מקום לשינויים בהמשך."],
            answer: ["הסכימו", "להתקדם", "להשאיר"],
            distractors: ["לצבוע", "להסתיר", "לקפוץ"],
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

globalThis.SENTENCE_DRAG_HEBREW_DATA = SENTENCE_DRAG_HEBREW_DATA;

function createHebrewSentenceDragGeneratedEntry(difficulty) {
  return SENTENCE_DRAG_HEBREW_DATA.createGeneratedEntry(difficulty);
}

globalThis.createHebrewSentenceDragGeneratedEntry = createHebrewSentenceDragGeneratedEntry;

function createSentenceDragHebrewGeneratedEntry(difficulty) {
  return createHebrewSentenceDragGeneratedEntry(difficulty);
}

globalThis.createSentenceDragHebrewGeneratedEntry = createSentenceDragHebrewGeneratedEntry;

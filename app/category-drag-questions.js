(() => {
  function clampDifficulty(value) {
    const level = Number.parseInt(value, 10);
    if (!Number.isFinite(level)) {
      return 3;
    }

    return Math.max(1, Math.min(5, level));
  }

  function randomIntLocal(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomChoiceLocal(values) {
    return values[Math.floor(Math.random() * values.length)];
  }

  function shuffleArrayLocal(values) {
    const copy = [...values];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
  }

  function uniqueStrings(values) {
    return Array.from(new Set(values.map((value) => String(value))));
  }

  function slugify(value) {
    const normalized = String(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return normalized || "token";
  }

  function escapeHtmlLocal(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function buildFilledText(templateParts, tokens) {
    return templateParts
      .map((part, index) => `${part}${index < tokens.length ? tokens[index] : ""}`)
      .join("");
  }

  function buildChoiceTokens(type, difficulty, values) {
    return shuffleArrayLocal(uniqueStrings(values)).map((text, index) => ({
      id: `${type}-${difficulty}-${index}-${slugify(text)}`,
      text,
    }));
  }

  function getTargetReviewLabel(target, index) {
    if (typeof target?.reviewLabel === "string" && target.reviewLabel.trim()) {
      return target.reviewLabel.trim();
    }

    if (typeof target?.text === "string" && target.text.trim()) {
      return target.text.trim();
    }

    if (typeof target?.position === "string" && target.position.trim()) {
      return formatDirectionLabel(target.position);
    }

    return `Target ${index + 1}`;
  }

  function buildTargetsAnswerLabel(targets, tokens) {
    return targets.map((target, index) => `${getTargetReviewLabel(target, index)}: ${tokens[index]}`).join(" | ");
  }

  function buildBucketAnswerLabel(buckets) {
    return buckets
      .map((bucket) => `${bucket.label}: ${bucket.answers.join(", ")}`)
      .join(" | ");
  }

  function buildMatchingAnswerLabel(leftItems, answerTokens) {
    return leftItems.map((item, index) => `${item.text}: ${answerTokens[index] || ""}`).join(" | ");
  }

  function createMatchingDragQuestion({
    type,
    difficulty,
    questionText,
    extraText = "",
    visualSummary = "",
    leftItems,
    rightItems,
    reviewText = "",
  }) {
    const normalizedLeftItems = Array.isArray(leftItems)
      ? leftItems
          .map((item, index) => ({
            id: `${type}-left-${difficulty}-${index}-${slugify(item?.text || index)}`,
            text: String(item?.text || "").trim(),
            answer: String(item?.answer || "").trim(),
          }))
          .filter((item) => item.text && item.answer)
      : [];
    const normalizedRightItems = uniqueStrings((rightItems || []).map((item) => String(item).trim())).filter(Boolean);
    const answerTokens = normalizedLeftItems.map((item) => item.answer);
    const answerLabel = buildMatchingAnswerLabel(normalizedLeftItems, answerTokens);

    if (
      !type ||
      !questionText ||
      normalizedLeftItems.length < 2 ||
      normalizedRightItems.length < normalizedLeftItems.length ||
      !answerTokens.every((token) => normalizedRightItems.includes(token))
    ) {
      return null;
    }

    return {
      type,
      difficulty,
      mode: "drag",
      questionText,
      displayText: "",
      extraText,
      extraHtml: "",
      visualHtml: "",
      visualSummary,
      dragLayout: "matching",
      dragChoices: [],
      dragAnswerTokens: answerTokens,
      matchLeftItems: normalizedLeftItems.map((item) => ({
        id: item.id,
        text: item.text,
      })),
      matchRightItems: shuffleArrayLocal(normalizedRightItems).map((text, index) => ({
        id: `${type}-right-${difficulty}-${index}-${slugify(text)}`,
        text,
      })),
      reviewText: reviewText || answerLabel,
      answerValue: answerTokens.join(" | "),
      answerLabel,
      isHebrew: false,
    };
  }

  function createSentenceDragQuestion({
    type,
    difficulty,
    questionText,
    extraText = "",
    templateParts,
    answer,
    choices,
    reviewText = "",
    visualSummary = "",
  }) {
    const normalizedParts = Array.isArray(templateParts) ? templateParts.map((part) => String(part)) : [];
    const normalizedAnswer = Array.isArray(answer) ? answer.map((token) => String(token)) : [];
    const normalizedChoices = uniqueStrings([...(choices || []).map(String), ...normalizedAnswer]);

    if (
      !type ||
      !questionText ||
      normalizedParts.length !== normalizedAnswer.length + 1 ||
      !normalizedAnswer.length ||
      !normalizedAnswer.every((token) => normalizedChoices.includes(token))
    ) {
      return null;
    }

    return {
      type,
      difficulty,
      mode: "drag",
      questionText,
      displayText: "",
      extraText,
      extraHtml: "",
      visualHtml: "",
      visualSummary,
      dragLayout: "sentence",
      dragTemplateParts: normalizedParts,
      dragChoices: buildChoiceTokens(type, difficulty, normalizedChoices),
      dragAnswerTokens: normalizedAnswer,
      reviewText: reviewText || buildFilledText(normalizedParts, normalizedAnswer),
      answerValue: normalizedAnswer.join(" | "),
      answerLabel: buildFilledText(normalizedParts, normalizedAnswer),
      isHebrew: false,
    };
  }

  function createTargetsDragQuestion({
    type,
    difficulty,
    questionText,
    extraText = "",
    visualSummary = "",
    targetArrangement = "rows",
    targets,
    answer,
    choices,
    reviewText = "",
    answerLabel = "",
    dragPlaceholderText = "",
    dragLineStartLabel = "",
    dragLineEndLabel = "",
    dragShowTargetLabels = true,
    dragCompassCenterLabel = "Compass",
  }) {
    const normalizedTargets = Array.isArray(targets)
      ? targets.map((target) => ({
          ...(target || {}),
          text: typeof target?.text === "string" ? target.text : "",
          html: typeof target?.html === "string" ? target.html : "",
          reviewLabel: typeof target?.reviewLabel === "string" ? target.reviewLabel : "",
          position: typeof target?.position === "string" ? target.position : "",
        }))
      : [];
    const normalizedAnswer = Array.isArray(answer) ? answer.map((token) => String(token)) : [];
    const normalizedChoices = uniqueStrings([...(choices || []).map(String), ...normalizedAnswer]);

    if (
      !type ||
      !questionText ||
      !normalizedTargets.length ||
      normalizedTargets.length !== normalizedAnswer.length ||
      !normalizedAnswer.every((token) => normalizedChoices.includes(token))
    ) {
      return null;
    }

    return {
      type,
      difficulty,
      mode: "drag",
      questionText,
      displayText: "",
      extraText,
      extraHtml: "",
      visualHtml: "",
      visualSummary,
      dragLayout: "targets",
      dragTargetArrangement: targetArrangement,
      dragTargets: normalizedTargets,
      dragChoices: buildChoiceTokens(type, difficulty, normalizedChoices),
      dragAnswerTokens: normalizedAnswer,
      dragPlaceholderText,
      dragLineStartLabel,
      dragLineEndLabel,
      dragShowTargetLabels,
      dragCompassCenterLabel,
      reviewText,
      answerValue: normalizedAnswer.join(" | "),
      answerLabel: answerLabel || buildTargetsAnswerLabel(normalizedTargets, normalizedAnswer),
      isHebrew: false,
    };
  }

  function createBucketsDragQuestion({
    type,
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
            label: String(bucket?.label || "").trim(),
            answers: Array.isArray(bucket?.answers) ? bucket.answers.map((item) => String(item)) : [],
          }))
          .filter((bucket) => bucket.label && bucket.answers.length)
      : [];
    const flatAnswers = normalizedBuckets.flatMap((bucket) => bucket.answers);

    if (!type || !questionText || !normalizedBuckets.length || !flatAnswers.length) {
      return null;
    }

    return {
      type,
      difficulty,
      mode: "drag",
      questionText,
      displayText: "",
      extraText,
      extraHtml: "",
      visualHtml: "",
      visualSummary,
      dragLayout: "buckets",
      dragBucketColumns: normalizedBuckets,
      dragChoices: buildChoiceTokens(type, difficulty, flatAnswers),
      dragAnswerTokens: flatAnswers,
      dragPlaceholderText,
      reviewText,
      answerValue: flatAnswers.join(" | "),
      answerLabel: buildBucketAnswerLabel(normalizedBuckets),
      isHebrew: false,
    };
  }

  function buildFractionStripPromptHtml(numerator, denominator) {
    const segments = Array.from({ length: denominator }, (_, index) => {
      const filledClass = index < numerator ? " is-filled" : "";
      return `<span class="drag-fraction-segment${filledClass}"></span>`;
    }).join("");

    return `
      <div class="drag-fraction-prompt">
        <div class="drag-fraction-strip" aria-hidden="true">${segments}</div>
      </div>
    `;
  }

  function formatDirectionLabel(value) {
    const map = {
      north: "North",
      south: "South",
      east: "East",
      west: "West",
      northeast: "Northeast",
      northwest: "Northwest",
      southeast: "Southeast",
      southwest: "Southwest",
    };

    return map[value] || String(value);
  }

  function createReadingComprehensionDragQuestion(category, difficulty) {
    const type = `${category}-drag`;
    const builders =
      difficulty <= 2
        ? [createReadingPronounDragQuestion, createReadingContextDragQuestion]
        : [createReadingSequenceDragQuestion, createReadingPronounDragQuestion, createReadingContextDragQuestion];

    return randomChoiceLocal(builders)(type, difficulty);
  }

  function createReadingPronounDragQuestion(type, difficulty) {
    const blueprints = [
      {
        templateParts: [
          "Luca found a puppy outside in the rain. He wrapped ",
          " in a towel because ",
          " fur was soaked.",
        ],
        answer: ["it", "its"],
        choices: ["it", "its", "they", "their"],
      },
      {
        templateParts: [
          "Noga and Gabriel washed the flowerpots. Then they filled ",
          " with soil and set the pots by ",
          " window.",
        ],
        answer: ["them", "their"],
        choices: ["them", "their", "it", "our"],
      },
      {
        templateParts: [
          "Tariq saw a kitten near the fence. He gave ",
          " some water because ",
          " bowl was empty.",
        ],
        answer: ["it", "its"],
        choices: ["it", "its", "they", "their"],
      },
      {
        templateParts: [
          "Teva picked a ripe peach. She washed ",
          " and put it in ",
          " lunch bag.",
        ],
        answer: ["it", "her"],
        choices: ["it", "her", "them", "their"],
      },
      {
        templateParts: [
          "Gabriel and Eden built a kite. After painting ",
          ", they held it above ",
          " heads.",
        ],
        answer: ["it", "their"],
        choices: ["it", "their", "them", "her"],
      },
      {
        templateParts: [
          "Omar and his sister stacked the puzzles. Then they put ",
          " back on ",
          " shelf.",
        ],
        answer: ["them", "their"],
        choices: ["them", "their", "it", "our"],
      },
    ];

    const blueprint = randomChoiceLocal(blueprints);
    return createSentenceDragQuestion({
      type,
      difficulty,
      questionText: "Complete the passage with the best words.",
      templateParts: blueprint.templateParts,
      answer: blueprint.answer,
      choices: blueprint.choices,
    });
  }

  function createReadingContextDragQuestion(type, difficulty) {
    const blueprints = [
      {
        templateParts: [
          "The cave was dark, so Noga used a ",
          " to see the path. She walked ",
          " over the wet rocks.",
        ],
        answer: ["flashlight", "carefully"],
        choices: ["flashlight", "carefully", "blanket", "quickly"],
      },
      {
        templateParts: [
          "The soup was still steaming, so Gabriel waited for it to ",
          " before he took a ",
          ".",
        ],
        answer: ["cool", "sip"],
        choices: ["cool", "sip", "bounce", "shout"],
      },
      {
        templateParts: [
          "The soccer field was muddy, so Eli put on his ",
          " and stepped ",
          " across the grass.",
        ],
        answer: ["boots", "carefully"],
        choices: ["boots", "carefully", "sandals", "loudly"],
      },
      {
        templateParts: [
          "The ice cream was melting, so Teva ",
          " to put it in the ",
          ".",
        ],
        answer: ["hurried", "freezer"],
        choices: ["hurried", "freezer", "whispered", "drawer"],
      },
      {
        templateParts: [
          "The dog was barking at the door, so Gideon grabbed the ",
          " and went ",
          ".",
        ],
        answer: ["leash", "outside"],
        choices: ["leash", "outside", "blanket", "upstairs"],
      },
      {
        templateParts: [
          "Rain was pouring down, so Eden opened an ",
          " and walked ",
          " to the car.",
        ],
        answer: ["umbrella", "quickly"],
        choices: ["umbrella", "quickly", "pillow", "quietly"],
      },
    ];

    const blueprint = randomChoiceLocal(blueprints);
    return createSentenceDragQuestion({
      type,
      difficulty,
      questionText: "Complete the passage with the best words.",
      templateParts: blueprint.templateParts,
      answer: blueprint.answer,
      choices: blueprint.choices,
    });
  }

  function createReadingSequenceDragQuestion(type, difficulty) {
    const blueprints = [
      {
        templateParts: [
          "",
          ", Eden rinsed the lettuce leaves. ",
          ", she sliced the tomatoes. ",
          ", she tossed everything in a bowl. ",
          ", she served the salad for lunch.",
        ],
        answer: ["First", "Next", "Then", "Finally"],
        choices: ["First", "Next", "Then", "Finally", "Yesterday", "Because"],
      },
      {
        templateParts: [
          "",
          ", Omar folded the paper in half. ",
          ", he drew a shape on one side. ",
          ", he cut along the lines. ",
          ", he opened the paper to see the design.",
        ],
        answer: ["First", "Next", "Then", "Finally"],
        choices: ["First", "Next", "Then", "Finally", "Under", "Maybe"],
      },
      {
        templateParts: [
          "",
          ", Amir filled the kettle. ",
          ", he heated the water. ",
          ", he poured it into a mug. ",
          ", he stirred in honey.",
        ],
        answer: ["First", "Next", "Then", "Finally"],
        choices: ["First", "Next", "Then", "Finally", "Before", "Across"],
      },
      {
        templateParts: [
          "",
          ", Noga dug a small hole. ",
          ", she placed the seed inside. ",
          ", she covered it with soil. ",
          ", she watered the pot.",
        ],
        answer: ["First", "Next", "Then", "Finally"],
        choices: ["First", "Next", "Then", "Finally", "Without", "Suddenly"],
      },
      {
        templateParts: [
          "",
          ", Mateo gathered the blocks. ",
          ", he stacked them into a tower. ",
          ", he added a roof. ",
          ", he showed the building to his sister.",
        ],
        answer: ["First", "Next", "Then", "Finally"],
        choices: ["First", "Next", "Then", "Finally", "Below", "Maybe"],
      },
    ];

    const blueprint = randomChoiceLocal(blueprints);
    return createSentenceDragQuestion({
      type,
      difficulty,
      questionText: "Complete the passage with the sequence words.",
      templateParts: blueprint.templateParts,
      answer: blueprint.answer,
      choices: blueprint.choices,
    });
  }

  function createFractionsDragQuestion(category, difficulty) {
    const type = `${category}-drag`;
    const builders =
      difficulty <= 2
        ? [createFractionsVocabularyDragQuestion]
        : [createFractionsVocabularyDragQuestion, createFractionsPictureMatchDragQuestion];

    return randomChoiceLocal(builders)(type, difficulty);
  }

  function createFractionsVocabularyDragQuestion(type, difficulty) {
    const blueprints = [
      {
        minDifficulty: 1,
        maxDifficulty: 1,
        templateParts: ["One of two equal parts is a ", "."],
        answer: ["half"],
        choices: ["half", "whole", "third", "quarter"],
      },
      {
        minDifficulty: 1,
        maxDifficulty: 1,
        templateParts: ["One of four equal parts is a ", "."],
        answer: ["quarter"],
        choices: ["quarter", "half", "whole", "third"],
      },
      {
        minDifficulty: 1,
        maxDifficulty: 1,
        templateParts: ["Two halves make one ", "."],
        answer: ["whole"],
        choices: ["whole", "half", "quarter", "third"],
      },
      {
        minDifficulty: 2,
        maxDifficulty: 3,
        templateParts: [
          "In the fraction 3/4, the top number is the ",
          " and the bottom number is the ",
          ".",
        ],
        answer: ["numerator", "denominator"],
        choices: ["numerator", "denominator", "half", "quarter"],
      },
      {
        minDifficulty: 2,
        maxDifficulty: 3,
        templateParts: [
          "Fractions name ",
          " of a whole. One of two equal parts is called a ",
          ".",
        ],
        answer: ["equal parts", "half"],
        choices: ["equal parts", "half", "numerator", "quarter"],
      },
      {
        minDifficulty: 2,
        maxDifficulty: 3,
        templateParts: [
          "One of four equal parts is a ",
          ", and the whole must be split into ",
          ".",
        ],
        answer: ["quarter", "equal parts"],
        choices: ["quarter", "equal parts", "numerator", "denominator"],
      },
      {
        minDifficulty: 4,
        maxDifficulty: 5,
        templateParts: [
          "In the fraction 1/8, the top number is the ",
          " and the bottom number is the ",
          ".",
        ],
        answer: ["numerator", "denominator"],
        choices: ["numerator", "denominator", "half", "whole"],
      },
      {
        minDifficulty: 2,
        maxDifficulty: 3,
        templateParts: [
          "If a rectangle is split into 4 equal parts, each part is a ",
          " and all 4 parts make one ",
          ".",
        ],
        answer: ["quarter", "whole"],
        choices: ["quarter", "whole", "numerator", "third"],
      },
    ];

    const availableBlueprints = blueprints.filter(
      (blueprint) =>
        difficulty >= (blueprint.minDifficulty || 1) && difficulty <= (blueprint.maxDifficulty || 5)
    );
    const blueprint = randomChoiceLocal(availableBlueprints.length ? availableBlueprints : blueprints);
    return createSentenceDragQuestion({
      type,
      difficulty,
      questionText: "Complete the fraction sentence.",
      templateParts: blueprint.templateParts,
      answer: blueprint.answer,
      choices: blueprint.choices,
    });
  }

  function createFractionsPictureMatchDragQuestion(type, difficulty) {
    const pool =
      difficulty <= 2
        ? [
            [1, 2],
            [1, 3],
            [2, 3],
            [1, 4],
            [1, 5],
          ]
        : difficulty <= 4
          ? [
              [1, 2],
              [2, 3],
              [3, 4],
              [1, 4],
              [1, 3],
              [3, 5],
              [4, 5],
            ]
          : [
              [1, 2],
              [2, 3],
              [3, 4],
              [4, 5],
              [2, 5],
              [1, 6],
              [5, 6],
              [3, 5],
              [1, 5],
            ];
    const selection = shuffleArrayLocal(pool).slice(0, difficulty >= 4 ? 4 : 3);
    const answers = selection.map(([numerator, denominator]) => `${numerator}/${denominator}`);

    return createTargetsDragQuestion({
      type,
      difficulty,
      questionText: "Match each picture to the correct fraction.",
      targetArrangement: "rows",
      targets: selection.map(([numerator, denominator]) => ({
        html: buildFractionStripPromptHtml(numerator, denominator),
        reviewLabel: `${numerator} of ${denominator} parts shaded`,
      })),
      answer: answers,
      choices: answers,
      reviewText: "Match each picture to the correct fraction.",
      visualSummary: `The pictures show these fractions: ${answers.join(", ")}.`,
      answerLabel: answers.join(", "),
    });
  }

  function createScienceSortDragQuestion(category, difficulty) {
    const type = `${category}-drag`;
    const pools = {
      Solid: [
        "rock",
        "ice cube",
        "book",
        "pencil",
        "spoon",
        "chair",
        "brick",
        "coin",
        "chalk",
        "eraser",
        "marble",
        "plate",
      ],
      Liquid: [
        "milk",
        "juice",
        "oil",
        "water",
        "soup",
        "syrup",
        "tea",
        "paint",
        "shampoo",
        "lemonade",
        "liquid soap",
        "rainwater",
      ],
      Gas: [
        "steam",
        "air",
        "helium",
        "oxygen",
        "water vapor",
        "air in a balloon",
        "hot air",
        "carbon dioxide",
        "air in a tire",
        "air in a soccer ball",
        "natural gas",
        "breath",
      ],
    };
    const itemCount = difficulty >= 4 ? 2 : 1;

    return createBucketsDragQuestion({
      type,
      difficulty,
      questionText: "Sort each item into the correct bucket.",
      extraText: "Think about whether each item keeps its shape, flows, or spreads out.",
      buckets: Object.entries(pools).map(([label, items]) => ({
        label,
        answers: shuffleArrayLocal(items).slice(0, itemCount),
      })),
      reviewText: "Sort the items by state of matter.",
      visualSummary: "Buckets: Solid, Liquid, Gas.",
    });
  }

  function createNutritionSortDragQuestion(category, difficulty) {
    const type = `${category}-drag`;
    const healthyItems = [
      "apple",
      "carrots",
      "water",
      "beans",
      "yogurt",
      "cucumber",
      "eggs",
      "oatmeal",
      "banana",
      "broccoli",
      "orange",
      "brown rice",
      "grapes",
      "spinach",
      "salmon",
      "nuts",
    ];
    const notHealthyItems = [
      "candy",
      "soda",
      "chips",
      "doughnut",
      "fries",
      "cookies",
      "ice cream",
      "cake",
      "cupcake",
      "lollipop",
      "milkshake",
      "gummy candy",
      "potato chips",
      "frosted cereal",
      "frosting",
      "sugary soda",
    ];
    const itemCount = difficulty >= 4 ? 3 : 2;

    return createBucketsDragQuestion({
      type,
      difficulty,
      questionText: "Sort each food into the correct bucket.",
      extraText: "Pick the foods you would usually choose more often and the foods to save for sometimes.",
      buckets: [
        {
          label: "Healthy",
          answers: shuffleArrayLocal(healthyItems).slice(0, itemCount),
        },
        {
          label: "Not healthy",
          answers: shuffleArrayLocal(notHealthyItems).slice(0, itemCount),
        },
      ],
      reviewText: "Sort the foods by healthy choice or not healthy choice.",
      visualSummary: "Buckets: Healthy and Not healthy.",
    });
  }

  function createEstimationSortDragQuestion(category, difficulty) {
    const type = `${category}-drag`;
    const estimatedItems = [
      "about 20 cm",
      "around 5 minutes",
      "almost 100 beads",
      "close to 1 liter",
      "about 8 kg",
      "around 30 steps",
      "roughly 12 meters",
      "about 50 stickers",
      "nearly 2 hours",
      "close to 15 books",
      "around 40 marbles",
      "about 6 cups",
    ];
    const exactItems = [
      "20 cm exactly",
      "5 minutes exactly",
      "100 beads exactly",
      "1 liter exactly",
      "8 kg exactly",
      "30 steps exactly",
      "12 meters exactly",
      "50 stickers exactly",
      "2 hours exactly",
      "15 books exactly",
      "40 marbles exactly",
      "6 cups exactly",
    ];
    const itemCount = difficulty >= 4 ? 3 : 2;

    return createBucketsDragQuestion({
      type,
      difficulty,
      questionText: "Sort each measurement into the correct bucket.",
      extraText: "Words like about and around usually mean the value is estimated.",
      buckets: [
        {
          label: "Estimated",
          answers: shuffleArrayLocal(estimatedItems).slice(0, itemCount),
        },
        {
          label: "Exact",
          answers: shuffleArrayLocal(exactItems).slice(0, itemCount),
        },
      ],
      reviewText: "Sort the measurements by estimated or exact.",
      visualSummary: "Buckets: Estimated and Exact.",
    });
  }

  function createMeasurementMatchDragQuestion(category, difficulty) {
    const type = `${category}-drag`;
    const promptsByUnit = shuffleArrayLocal([
      {
        unit: "mm",
        prompts: [
          "thickness of a coin",
          "thickness of a credit card",
          "length of a small ant",
          "thickness of a fingernail",
          "width of a grain of rice",
          "length of a sesame seed",
          "thickness of a sheet of cardboard",
          "width of a pencil tip",
        ],
      },
      {
        unit: "cm",
        prompts: [
          "length of a pencil",
          "length of a toothbrush",
          "width of a notebook",
          "length of a crayon",
          "width of a hand",
          "length of a marker",
          "width of a ruler",
          "height of a juice box",
        ],
      },
      {
        unit: "m",
        prompts: [
          "height of a door",
          "length of a classroom",
          "height of a tree",
          "length of a car",
          "height of a basketball hoop",
          "length of a hallway",
          "height of a flagpole",
          "width of a bedroom",
        ],
      },
      {
        unit: "mL",
        prompts: [
          "water in a juice box",
          "medicine in a spoon",
          "liquid in a small bottle",
          "water in a spray bottle",
          "liquid in a medicine cup",
          "water in a teacup",
          "paint in a small jar",
          "cough syrup in a bottle",
        ],
      },
      {
        unit: "L",
        prompts: [
          "water in a bathtub",
          "water in a fish tank",
          "milk in a large jug",
          "fuel in a car tank",
          "water in a bucket",
          "juice in a large pitcher",
          "water in a watering can",
          "cleaner in a big bottle",
        ],
      },
      {
        unit: "g",
        prompts: [
          "weight of a paper clip",
          "weight of a chocolate bar",
          "weight of a slice of cheese",
          "weight of a strawberry",
          "weight of an envelope",
          "weight of a key",
          "weight of a cookie",
          "weight of a handful of popcorn",
        ],
      },
      {
        unit: "kg",
        prompts: [
          "weight of a watermelon",
          "weight of a dog",
          "weight of a sack of potatoes",
          "weight of a bicycle",
          "weight of a suitcase",
          "weight of a toddler",
          "weight of a bag of pet food",
          "weight of a large pumpkin",
        ],
      },
      {
        unit: "km",
        prompts: [
          "distance between two towns",
          "distance from one city to another",
          "length of a long road trip",
          "distance from one village to another",
          "distance between two airports",
          "distance from home to another city",
          "length of a highway trip",
          "distance between two mountain towns",
        ],
      },
    ]);
    const pairCount = difficulty >= 4 ? 4 : 3;
    const selection = promptsByUnit.slice(0, pairCount).map((group) => ({
      prompt: randomChoiceLocal(group.prompts),
      unit: group.unit,
    }));

    return createTargetsDragQuestion({
      type,
      difficulty,
      questionText: "Match each object to the best unit.",
      targetArrangement: "rows",
      targets: selection.map((item) => ({
        text: item.prompt,
        reviewLabel: item.prompt,
      })),
      answer: selection.map((item) => item.unit),
      choices: selection.map((item) => item.unit),
      reviewText: "Match each object to the best measurement unit.",
      visualSummary: selection
        .map((item) => `${item.prompt}: ${item.unit}`)
        .join(", "),
    });
  }

  function createVisualMeasurementDragQuestion(category, difficulty) {
    const type = `${category}-drag`;
    const builders =
      difficulty <= 2
        ? [createNumberLineDragQuestion]
        : [createNumberLineDragQuestion, createTemperatureRangeDragQuestion];

    return randomChoiceLocal(builders)(type, difficulty);
  }

  function createNumberLineDragQuestion(type, difficulty) {
    const slotCount = difficulty >= 4 ? 4 : 3;
    const step = randomChoiceLocal(difficulty <= 2 ? [1, 2] : [2, 3, 5]);
    const startMultiplier = difficulty <= 2 ? randomIntLocal(0, 2) : randomIntLocal(-2, 1);
    const start = startMultiplier * step;
    const values = Array.from({ length: slotCount }, (_, index) => start + step * (index + 1));
    const end = start + step * (slotCount + 1);

    return createTargetsDragQuestion({
      type,
      difficulty,
      questionText: "Place the numbers on the number line.",
      extraText: `The marks are spaced evenly and count by ${step}.`,
      targetArrangement: "line",
      targets: values.map((value) => ({
        text: "",
        reviewLabel: String(value),
      })),
      answer: values.map(String),
      choices: values.map(String),
      reviewText: "Place the numbers from left to right on the number line.",
      visualSummary: `The number line goes from ${start} to ${end} by ${step}.`,
      answerLabel: `From left to right: ${values.join(", ")}`,
      dragPlaceholderText: "\u00a0",
      dragLineStartLabel: String(start),
      dragLineEndLabel: String(end),
      dragShowTargetLabels: false,
    });
  }

  function createTemperatureRangeDragQuestion(type, difficulty) {
    const ranges = [
      { label: "Below 0°C", temps: ["-8°C", "-4°C", "-1°C"] },
      { label: "0°C to 10°C", temps: ["2°C", "7°C", "10°C"] },
      { label: "11°C to 25°C", temps: ["14°C", "18°C", "24°C"] },
      { label: "26°C and up", temps: difficulty >= 4 ? ["27°C", "33°C", "39°C"] : ["27°C", "29°C", "31°C"] },
    ];
    const selection = difficulty <= 2 ? ranges.slice(1) : ranges;
    const answers = selection.map((range) => randomChoiceLocal(range.temps));

    return createTargetsDragQuestion({
      type,
      difficulty,
      questionText: "Place each temperature in the correct range.",
      targetArrangement: "line",
      targets: selection.map((range) => ({
        text: range.label,
        reviewLabel: range.label,
      })),
      answer: answers,
      choices: answers,
      reviewText: "Match each temperature to its range.",
      visualSummary: selection
        .map((range, index) => `${answers[index]} belongs in ${range.label}`)
        .join(", "),
      dragPlaceholderText: "\u00a0",
    });
  }

  function createMapsDirectionsDragQuestion(category, difficulty) {
    const type = `${category}-drag`;
    const positions =
      difficulty >= 4
        ? ["northwest", "north", "northeast", "west", "east", "southwest", "south", "southeast"]
        : ["north", "east", "south", "west"];

    return createTargetsDragQuestion({
      type,
      difficulty,
      questionText: "Drag each label to the correct place on the compass.",
      targetArrangement: "compass",
      targets: positions.map((position) => ({
        position,
        reviewLabel: formatDirectionLabel(position),
      })),
      answer: positions.map((position) => formatDirectionLabel(position)),
      choices: positions.map((position) => formatDirectionLabel(position)),
      reviewText: "Place each direction label on the compass.",
      visualSummary: `Compass directions: ${positions.map((position) => formatDirectionLabel(position)).join(", ")}.`,
      dragPlaceholderText: "\u00a0",
      dragCompassCenterLabel: difficulty >= 4 ? "Compass Rose" : "Compass",
    });
  }

  const FINANCIAL_CURRENCY_MATCH_GROUPS = [
    [
      { country: "Israel", currency: "shekel" },
      { country: "United States", currency: "dollar" },
      { country: "Japan", currency: "yen" },
      { country: "India", currency: "rupee" },
    ],
    [
      { country: "China", currency: "yuan" },
      { country: "South Korea", currency: "won" },
      { country: "Mexico", currency: "peso" },
      { country: "Brazil", currency: "real" },
    ],
    [
      { country: "Saudi Arabia", currency: "riyal" },
      { country: "Switzerland", currency: "franc" },
      { country: "Turkey", currency: "lira" },
      { country: "Nigeria", currency: "naira" },
    ],
    [
      { country: "United Arab Emirates", currency: "dirham" },
      { country: "Indonesia", currency: "rupiah" },
      { country: "South Africa", currency: "rand" },
      { country: "Egypt", currency: "pound" },
    ],
  ];

  function createFinancialLiteracyDragQuestion(category, difficulty) {
    const entries = randomChoiceLocal(FINANCIAL_CURRENCY_MATCH_GROUPS);
    const leftItems = entries.map((entry) => ({
      text: entry.country,
      answer: entry.currency,
    }));
    const answerTokens = entries.map((entry) => entry.currency);

    return createMatchingDragQuestion({
      type: `${category}-drag`,
      difficulty,
      questionText: "Select each country and its currency.",
      extraText: "Click a country or dot, then click the matching currency name or dot.",
      visualSummary: entries.map((entry) => `${entry.country}: ${entry.currency}`).join(", "),
      leftItems,
      rightItems: answerTokens,
      reviewText: buildMatchingAnswerLabel(leftItems, answerTokens),
    });
  }

  globalThis.createCategoryGeneratedDragQuestion = function createCategoryGeneratedDragQuestion(
    category,
    difficulty
  ) {
    const level = clampDifficulty(difficulty);

    switch (category) {
      case "reading-comprehension":
        return createReadingComprehensionDragQuestion(category, level);
      case "fractions":
      case "fractions-and-ratios":
        return createFractionsDragQuestion(category, level);
      case "science":
        return createScienceSortDragQuestion(category, level);
      case "financial-literacy":
        return createFinancialLiteracyDragQuestion(category, level);
      case "nutrition":
        return createNutritionSortDragQuestion(category, level);
      case "estimation":
        return createEstimationSortDragQuestion(category, level);
      case "measurement":
        return createMeasurementMatchDragQuestion(category, level);
      case "visual-measurement":
        return createVisualMeasurementDragQuestion(category, level);
      case "maps-and-directions":
        return createMapsDirectionsDragQuestion(category, level);
      default:
        return null;
    }
  };
})();

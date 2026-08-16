(() => {
  function clampDifficulty(value) {
    const level = Number.parseInt(value, 10);
    if (!Number.isFinite(level)) return 3;
    return Math.max(1, Math.min(10, level));
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

  function getTargetReviewLabel(target, index) {
    if (typeof target?.reviewLabel === "string" && target.reviewLabel.trim()) return target.reviewLabel.trim();
    if (typeof target?.text === "string" && target.text.trim()) return target.text.trim();
    if (typeof target?.position === "string" && target.position.trim()) return formatDirectionLabel(target.position);
    return `Target ${index + 1}`;
  }

  function buildTargetsAnswerLabel(targets, tokens) {
    return targets.map((target, index) => `${getTargetReviewLabel(target, index)}: ${tokens[index]}`).join(" | ");
  }

  function buildBucketAnswerLabel(buckets) {
    return buckets.map((bucket) => `${bucket.label}: ${bucket.answers.join(", ")}`).join(" | ");
  }

  function buildMatchingAnswerLabel(leftItems, answerTokens) {
    return leftItems.map((item, index) => `${item.text}: ${answerTokens[index] || ""}`).join(" | ");
  }

  function countForLevel(difficulty, easy = 2, medium = 3, hard = 4) {
    if (difficulty >= 8) return hard;
    if (difficulty >= 4) return medium;
    return easy;
  }

  function chooseByLevel(blueprints, difficulty) {
    const available = blueprints.filter(
      (blueprint) => difficulty >= (blueprint.minDifficulty || 1) && difficulty <= (blueprint.maxDifficulty || 10)
    );
    return randomChoiceLocal(available.length ? available : blueprints);
  }

  function takeRandom(values, count) {
    return shuffleArrayLocal(values).slice(0, count);
  }

  function takeUniqueAnswerPairs(pairs, count) {
    const picked = [];
    const usedAnswers = new Set();
    for (const pair of shuffleArrayLocal(pairs)) {
      if (usedAnswers.has(pair.answer)) continue;
      picked.push(pair);
      usedAnswers.add(pair.answer);
      if (picked.length >= count) break;
    }
    return picked;
  }

  function normalizeContentMetadata(metadata, difficulty) {
    const source = metadata?.source;
    return {
      contentId: String(metadata?.contentId || ""),
      skill: String(metadata?.skill || ""),
      gradeMin: clampDifficulty(metadata?.gradeMin ?? difficulty),
      gradeMax: clampDifficulty(metadata?.gradeMax ?? difficulty),
      explanation: String(metadata?.explanation || ""),
      hints: Array.isArray(metadata?.hints) ? metadata.hints.map(String).filter(Boolean) : [],
      comparisonMode: metadata?.comparisonMode === "exact-text" ? "exact-text" : "semantic",
      source: source && typeof source === "object" ? { ...source } : source ? String(source) : null,
      sourceDate: String(metadata?.sourceDate || ""),
      reviewedAt: String(metadata?.reviewedAt || ""),
      reviewStatus: String(metadata?.reviewStatus || ""),
      locale: String(metadata?.locale || ""),
    };
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
    ...contentMetadata
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
      matchLeftItems: normalizedLeftItems.map((item) => ({ id: item.id, text: item.text })),
      matchRightItems: shuffleArrayLocal(normalizedRightItems).map((text, index) => ({
        id: `${type}-right-${difficulty}-${index}-${slugify(text)}`,
        text,
      })),
      reviewText: reviewText || answerLabel,
      answerValue: answerTokens.join(" | "),
      answerLabel,
      isHebrew: false,
      ...normalizeContentMetadata(contentMetadata, difficulty),
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
    ...contentMetadata
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
      ...normalizeContentMetadata(contentMetadata, difficulty),
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
    ...contentMetadata
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
      uniqueStrings(normalizedAnswer).length !== normalizedAnswer.length ||
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
      reviewText: reviewText || answerLabel || buildTargetsAnswerLabel(normalizedTargets, normalizedAnswer),
      answerValue: normalizedAnswer.join(" | "),
      answerLabel: answerLabel || buildTargetsAnswerLabel(normalizedTargets, normalizedAnswer),
      isHebrew: false,
      ...normalizeContentMetadata(contentMetadata, difficulty),
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
    ...contentMetadata
  }) {
    const normalizedBuckets = Array.isArray(buckets)
      ? buckets
          .map((bucket) => ({
            label: String(bucket?.label || "").trim(),
            answers: Array.isArray(bucket?.answers) ? uniqueStrings(bucket.answers).filter(Boolean) : [],
          }))
          .filter((bucket) => bucket.label && bucket.answers.length)
      : [];
    const flatAnswers = normalizedBuckets.flatMap((bucket) => bucket.answers);

    if (
      !type ||
      !questionText ||
      !normalizedBuckets.length ||
      !flatAnswers.length ||
      uniqueStrings(flatAnswers).length !== flatAnswers.length
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
      dragLayout: "buckets",
      dragBucketColumns: normalizedBuckets,
      dragChoices: buildChoiceTokens(type, difficulty, flatAnswers),
      dragAnswerTokens: flatAnswers,
      dragPlaceholderText,
      reviewText: reviewText || buildBucketAnswerLabel(normalizedBuckets),
      answerValue: flatAnswers.join(" | "),
      answerLabel: buildBucketAnswerLabel(normalizedBuckets),
      isHebrew: false,
      ...normalizeContentMetadata(contentMetadata, difficulty),
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

  function buildImproperFractionPromptHtml(numerator, denominator) {
    const wholeCount = Math.ceil(numerator / denominator);
    const bars = Array.from({ length: wholeCount }, (_, wholeIndex) => {
      const segments = Array.from({ length: denominator }, (_, partIndex) => {
        const index = wholeIndex * denominator + partIndex;
        return `<span class="drag-fraction-segment${index < numerator ? " is-filled" : ""}"></span>`;
      }).join("");
      return `<div class="drag-fraction-strip" aria-hidden="true">${segments}</div>`;
    }).join("");

    return `<div class="drag-fraction-prompt drag-improper-fraction-prompt">${bars}</div>`;
  }

  function createOrderQuestion({ type, difficulty, questionText, extraText, values, startLabel, endLabel }) {
    return createTargetsDragQuestion({
      type,
      difficulty,
      questionText,
      extraText,
      targetArrangement: "line",
      targets: values.map((value) => ({ text: "", reviewLabel: value })),
      answer: values,
      choices: values,
      reviewText: questionText,
      visualSummary: `${startLabel} to ${endLabel}: ${values.join(", ")}.`,
      answerLabel: `${startLabel} to ${endLabel}: ${values.join(", ")}`,
      dragPlaceholderText: "\u00a0",
      dragLineStartLabel: startLabel,
      dragLineEndLabel: endLabel,
      dragShowTargetLabels: false,
    });
  }

  function buildReadingMiniPassage(title, lines) {
    const body = lines.map((line, index) => `${index + 1}. ${line}`).join("\n");
    return `${title}\n${body}`;
  }

  function createReadingTimelineBuilderQuestion(type, difficulty) {
    const stories = [
      {
        minDifficulty: 1,
        maxDifficulty: 3,
        title: "Garden Morning",
        events: ["Maya filled the watering can", "She watered the seedlings", "Tiny drops sparkled on the leaves"],
      },
      {
        minDifficulty: 1,
        maxDifficulty: 4,
        title: "Lost Hat",
        events: ["Eli noticed his hat was missing", "He checked the coat hooks", "He found the hat under his backpack"],
      },
      {
        minDifficulty: 2,
        maxDifficulty: 5,
        title: "Class Pet",
        events: ["The food bowl was empty", "Noah poured seeds into the bowl", "The hamster came out to eat"],
      },
      {
        minDifficulty: 4,
        maxDifficulty: 7,
        title: "Bridge Test",
        events: ["The team built a bridge from straws", "They placed coins on the bridge one at a time", "The bridge bent at twenty coins", "They wrote the result in their chart"],
      },
      {
        minDifficulty: 6,
        maxDifficulty: 10,
        title: "Revised Report",
        events: ["Talia found two sources about city trees", "She noticed one source used old data", "She checked a newer city report", "She revised her conclusion with current evidence"],
      },
    ];
    const story = chooseByLevel(stories, difficulty);
    const labels = story.events.length === 3
      ? ["Beginning", "Middle", "Ending"]
      : ["Beginning", "Early middle", "Late middle", "Ending"];

    return createTargetsDragQuestion({
      type,
      difficulty,
      questionText: "Story Timeline Builder: drag the events into the order they happened.",
      extraText: `${story.title}: put the event cards in story order.`,
      targetArrangement: "rows",
      targets: labels.map((label) => ({ text: label, reviewLabel: label })),
      answer: story.events,
      choices: story.events,
      dragPlaceholderText: "Drop event",
    });
  }

  function createReadingInferenceDetectiveDragQuestion(type, difficulty) {
    const cases = [
      {
        minDifficulty: 2,
        maxDifficulty: 4,
        inference: "The soccer field is probably wet.",
        support: ["Players wore rain boots", "Puddles covered the goal line", "The coach moved cones away from the mud"],
        distractors: ["The scoreboard has big numbers", "The team has blue shirts", "The game starts at four"],
      },
      {
        minDifficulty: 2,
        maxDifficulty: 5,
        inference: "Nina is nervous about speaking.",
        support: ["She practiced her first sentence twice", "Her hands shook as she held the note card", "She took a deep breath before walking to the front"],
        distractors: ["The classroom has windows", "The poster is yellow", "Her backpack has a zipper"],
      },
      {
        minDifficulty: 4,
        maxDifficulty: 7,
        inference: "The trail may be difficult after the storm.",
        support: ["Branches covered part of the path", "The map warned about slippery rocks", "A ranger told hikers to move slowly"],
        distractors: ["The parking lot had ten spaces", "The sign used green paint", "The picnic table was square"],
      },
      {
        minDifficulty: 6,
        maxDifficulty: 10,
        inference: "The article is trying to persuade readers.",
        support: ["It asks readers to support the garden plan", "It gives reasons the garden would help students", "It ends with a call to vote yes"],
        distractors: ["It mentions the garden is near the gym", "It uses three paragraph breaks", "It names the month of the vote"],
      },
    ];
    const caseFile = chooseByLevel(cases, difficulty);
    const supportCount = difficulty >= 6 ? 3 : 2;
    const distractorCount = difficulty >= 5 ? 3 : 2;

    return createBucketsDragQuestion({
      type,
      difficulty,
      questionText: "Inference Detective: sort the clue cards.",
      extraText: `Inference: ${caseFile.inference}\nPut only clues that support the inference in the evidence bucket.`,
      buckets: [
        { label: "Supports the inference", answers: takeRandom(caseFile.support, supportCount) },
        { label: "Does not support it", answers: takeRandom(caseFile.distractors, distractorCount) },
      ],
    });
  }

  function createReadingCauseEffectChainQuestion(type, difficulty) {
    const pairs = takeUniqueAnswerPairs([
      { text: "The library lights flickered off", answer: "The librarian opened the blinds" },
      { text: "The recipe needed softer butter", answer: "Jon left the butter on the counter" },
      { text: "The puppy tracked mud inside", answer: "Dad wiped the floor by the door" },
      { text: "The class ran out of poster paper", answer: "They taped two smaller sheets together" },
      { text: "The bridge model sagged in the middle", answer: "The team added a support underneath" },
      { text: "The survey had answers from only one club", answer: "Mira said the evidence was too narrow" },
      { text: "The instructions skipped a step", answer: "Several students built the model incorrectly" },
      { text: "The graph showed sales dropping each week", answer: "The store tested a new display" },
    ], difficulty >= 7 ? 5 : difficulty >= 4 ? 4 : 3);

    return createMatchingDragQuestion({
      type,
      difficulty,
      questionText: "Cause-Effect Chain: connect each cause to its effect.",
      extraText: "Click a cause, then click the effect that happened because of it.",
      leftItems: pairs,
      rightItems: pairs.map((pair) => pair.answer),
    });
  }

  function createReadingPointOfViewCameraQuestion(type, difficulty) {
    const scenes = [
      {
        minDifficulty: 3,
        maxDifficulty: 5,
        title: "The Missing Sketch",
        lines: [
          "Ari put his sketch inside a blue folder before recess.",
          "Lina saw the folder slide under the art shelf.",
          "Mr. Park only knew that Ari looked worried when class began.",
        ],
        facts: [
          { text: "Who knows where the folder slid?", answer: "Lina" },
          { text: "Who knows the sketch was inside the blue folder?", answer: "Ari" },
          { text: "Who knows Ari looked worried?", answer: "Mr. Park" },
        ],
      },
      {
        minDifficulty: 4,
        maxDifficulty: 8,
        title: "The Locked Gate",
        lines: [
          "Maya heard the gate click shut after soccer practice.",
          "Noah found the spare key in the coach's desk drawer.",
          "The coach was still in the gym and did not know the gate was locked.",
        ],
        facts: [
          { text: "Who knows the gate clicked shut?", answer: "Maya" },
          { text: "Who knows where the spare key is?", answer: "Noah" },
          { text: "Who does not know the gate is locked?", answer: "The coach" },
        ],
      },
      {
        minDifficulty: 7,
        maxDifficulty: 10,
        title: "Two Reports",
        lines: [
          "Sam read a website that said the pond was clean last year.",
          "Nora read this month's water test and saw high bacteria levels.",
          "The mayor had only seen Sam's older source before the meeting.",
        ],
        facts: [
          { text: "Who knows the newest water test result?", answer: "Nora" },
          { text: "Who knows what the older website claimed?", answer: "Sam" },
          { text: "Who has not seen the newest source yet?", answer: "The mayor" },
        ],
      },
    ];
    const scene = chooseByLevel(scenes, difficulty);
    const names = uniqueStrings(scene.facts.map((fact) => fact.answer));

    return createTargetsDragQuestion({
      type,
      difficulty,
      questionText: "Point of View Camera: label who knows each fact.",
      extraText: buildReadingMiniPassage(scene.title, scene.lines),
      targetArrangement: "rows",
      targets: scene.facts.map((fact) => ({ text: fact.text, reviewLabel: fact.text })),
      answer: scene.facts.map((fact) => fact.answer),
      choices: names,
      dragPlaceholderText: "Who knows?",
    });
  }

  function createReadingComprehensionDragQuestion(category, difficulty) {
    const type = `${category}-drag`;
    if (difficulty <= 3 && Math.random() < 0.35) {
      return createReadingTimelineBuilderQuestion(type, difficulty);
    }

    if (difficulty >= 2 && difficulty <= 8 && Math.random() < 0.3) {
      return createReadingInferenceDetectiveDragQuestion(type, difficulty);
    }

    if (difficulty >= 3 && Math.random() < 0.3) {
      return createReadingCauseEffectChainQuestion(type, difficulty);
    }

    if (difficulty >= 4 && Math.random() < 0.25) {
      return createReadingPointOfViewCameraQuestion(type, difficulty);
    }

    const easySentences = [
      {
        templateParts: ["Luca found a puppy. He wrapped ", " in a towel because ", " fur was wet."],
        answer: ["it", "its"],
        choices: ["it", "its", "they", "their"],
      },
      {
        templateParts: ["The soup was hot, so Gabriel waited for it to ", " before taking a ", "."],
        answer: ["cool", "sip"],
        choices: ["cool", "sip", "bounce", "shout"],
      },
      {
        templateParts: ["Maya could not find her pencil, so she checked inside her ", " before starting to ", "."],
        answer: ["desk", "write"],
        choices: ["desk", "write", "cloud", "swim"],
      },
      {
        templateParts: ["The bell rang, and the students walked ", " to their ", "."],
        answer: ["quietly", "classroom"],
        choices: ["quietly", "classroom", "hungry", "river"],
      },
      {
        templateParts: ["Noah saw dark clouds, so he put on his ", " before going ", "."],
        answer: ["raincoat", "outside"],
        choices: ["raincoat", "outside", "blanket", "under"],
      },
      {
        templateParts: ["The glass fell from the counter, but it did not ", " because it landed on the ", "."],
        answer: ["break", "rug"],
        choices: ["break", "rug", "sing", "sky"],
      },
      {
        templateParts: ["Ava heard the timer beep, so she took the cookies out of the ", " and let them ", "."],
        answer: ["oven", "cool"],
        choices: ["oven", "cool", "garden", "jump"],
      },
      {
        templateParts: ["Rain was falling, so Eden opened an ", " and walked ", " to the car."],
        answer: ["umbrella", "quickly"],
        choices: ["umbrella", "quickly", "pillow", "quietly"],
      },
      {
        templateParts: ["The library was quiet, so Jonah used a ", " voice while he looked for a ", "."],
        answer: ["soft", "book"],
        choices: ["soft", "book", "loud", "spoon"],
      },
      {
        templateParts: ["Lena dropped her ice cream, so her dad helped her clean the ", " with a ", "."],
        answer: ["floor", "napkin"],
        choices: ["floor", "napkin", "moon", "basket"],
      },
      {
        templateParts: ["The puppy was thirsty after playing, so Sam filled its ", " with fresh ", "."],
        answer: ["bowl", "water"],
        choices: ["bowl", "water", "shoe", "music"],
      },
    ];
    const inferenceSentences = [
      {
        templateParts: [
          "The team packed extra water, maps, and flashlights before hiking. A reasonable inference is that the hike might be ",
          " and they wanted to be ",
          ".",
        ],
        answer: ["long", "prepared"],
        choices: ["long", "prepared", "silent", "careless"],
      },
      {
        templateParts: [
          "The table shows the plant with sunlight grew 12 cm, while the plant in darkness grew 3 cm. The best conclusion is that sunlight ",
          " plant growth in this ",
          ".",
        ],
        answer: ["helped", "test"],
        choices: ["helped", "test", "stopped", "opinion"],
      },
      {
        templateParts: [
          "The article uses three surveys and two expert quotes. That makes the claim more ",
          " than a claim based on one ",
          ".",
        ],
        answer: ["reliable", "example"],
        choices: ["reliable", "example", "fictional", "decoration"],
      },
    ];

    if (difficulty <= 2) {
      const blueprint = randomChoiceLocal(easySentences);
      return createSentenceDragQuestion({
        type,
        difficulty,
        questionText: "Complete the passage with the best words.",
        templateParts: blueprint.templateParts,
        answer: blueprint.answer,
        choices: blueprint.choices,
      });
    }

    if (difficulty <= 4 && Math.random() < 0.45) {
      return createOrderQuestion({
        type,
        difficulty,
        questionText: "Complete the passage with the sequence words.",
        extraText: "Use words that show the order of events.",
        values: ["First", "Next", "Then", "Finally"],
        startLabel: "First",
        endLabel: "Last",
      });
    }

    if (difficulty <= 6 && Math.random() < 0.55) {
      const pairs = takeRandom([
        { text: "The path was icy", answer: "Maya walked slowly" },
        { text: "The batteries were dead", answer: "The flashlight did not turn on" },
        { text: "The plant sat in direct sun", answer: "Its soil dried quickly" },
        { text: "The bus arrived early", answer: "The students hurried to line up" },
        { text: "The speaker used a microphone", answer: "The audience could hear clearly" },
      ], difficulty >= 5 ? 4 : 3);
      return createMatchingDragQuestion({
        type,
        difficulty,
        questionText: "Match each cause to the most likely effect.",
        extraText: "A cause tells why something happened. An effect tells what happened as a result.",
        leftItems: pairs,
        rightItems: pairs.map((pair) => pair.answer),
      });
    }

    if (difficulty <= 8 && Math.random() < 0.55) {
      return createBucketsDragQuestion({
        type,
        difficulty,
        questionText: "Sort each statement into the correct bucket.",
        extraText: "Evidence can be checked in a text, chart, or table. An opinion or guess cannot be proven from the source alone.",
        buckets: [
          {
            label: "Evidence",
            answers: takeRandom([
              "The chart shows 18 votes for soccer",
              "The passage says the soil was dry",
              "The recipe lists two cups of flour",
              "The table shows Monday had the lowest temperature",
              "The graph shows sales doubled from June to July",
            ], difficulty >= 8 ? 4 : 3),
          },
          {
            label: "Opinion or guess",
            answers: takeRandom([
              "Soccer is the best game",
              "The plant probably felt lonely",
              "The soup must taste perfect",
              "Everyone surely loved the ending",
              "The store owner must be happy",
            ], difficulty >= 8 ? 4 : 3),
          },
        ],
      });
    }

    if (difficulty >= 7 && Math.random() < 0.5) {
      const pairs = [
        { text: "First, next, then, finally", answer: "Sequence" },
        { text: "Because the road flooded, the bus was late", answer: "Cause and effect" },
        { text: "Both animals have wings, but only one swims", answer: "Compare and contrast" },
        { text: "The team had no water, so they filled bottles", answer: "Problem and solution" },
        { text: "The paragraph explains what pollination means", answer: "Description" },
      ];
      return createMatchingDragQuestion({
        type,
        difficulty,
        questionText: "Match each clue to the text structure it shows.",
        extraText: "Text structure is how information is organized.",
        leftItems: pairs,
        rightItems: pairs.map((pair) => pair.answer),
      });
    }

    const blueprint = randomChoiceLocal(inferenceSentences);
    return createSentenceDragQuestion({
      type,
      difficulty,
      questionText: "Complete the inference or conclusion.",
      templateParts: blueprint.templateParts,
      answer: blueprint.answer,
      choices: blueprint.choices,
    });
  }

  function createFractionsDragQuestion(category, difficulty) {
    const type = `${category}-drag`;
    const vocabulary = [
      {
        minDifficulty: 1,
        maxDifficulty: 2,
        templateParts: ["One of two equal parts is a ", "."],
        answer: ["half"],
        choices: ["half", "whole", "third", "quarter"],
      },
      {
        minDifficulty: 1,
        maxDifficulty: 3,
        templateParts: ["Two halves make one ", "."],
        answer: ["whole"],
        choices: ["whole", "half", "quarter", "third"],
      },
      {
        minDifficulty: 2,
        maxDifficulty: 5,
        templateParts: ["In 3/4, the top number is the ", " and the bottom number is the ", "."],
        answer: ["numerator", "denominator"],
        choices: ["numerator", "denominator", "half", "quarter"],
      },
      {
        minDifficulty: 7,
        maxDifficulty: 10,
        templateParts: ["Equivalent fractions have the same ", " even when they look ", "."],
        answer: ["value", "different"],
        choices: ["value", "different", "unit", "smaller"],
      },
      {
        minDifficulty: 8,
        maxDifficulty: 10,
        templateParts: ["To compare unlike fractions, use a ", " denominator or convert to ", "."],
        answer: ["common", "decimals"],
        choices: ["common", "decimals", "random", "shapes"],
      },
    ];

    if (difficulty <= 3 && Math.random() < 0.5) {
      const blueprint = chooseByLevel(vocabulary, difficulty);
      return createSentenceDragQuestion({
        type,
        difficulty,
        questionText: "Complete the fraction sentence.",
        templateParts: blueprint.templateParts,
        answer: blueprint.answer,
        choices: blueprint.choices,
      });
    }

    if (difficulty <= 5 && Math.random() < 0.55) {
      const pool = difficulty <= 2
        ? [[1, 2], [1, 3], [2, 3], [1, 4], [1, 5]]
        : [[1, 2], [2, 3], [3, 4], [1, 4], [3, 5], [4, 5], [5, 8]];
      const selection = takeRandom(pool, difficulty >= 4 ? 4 : 3);
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
        answerLabel: answers.join(", "),
      });
    }

    if (difficulty >= 4 && difficulty <= 8 && Math.random() < 0.34) {
      const pool = difficulty <= 5
        ? [[3, 2], [5, 4], [7, 4], [4, 3], [5, 3]]
        : [[7, 3], [9, 4], [11, 4], [8, 3], [13, 5], [11, 6]];
      const selection = takeRandom(pool, difficulty >= 7 ? 4 : 3);
      const answers = selection.map(([numerator, denominator]) => `${numerator}/${denominator}`);
      return createTargetsDragQuestion({
        type,
        difficulty,
        questionText: "Drag each improper fraction to its model.",
        extraText: "Each complete bar is one whole. Count equal-size pieces across all the wholes.",
        targetArrangement: "rows",
        targets: selection.map(([numerator, denominator]) => ({
          html: buildImproperFractionPromptHtml(numerator, denominator),
          reviewLabel: `${numerator} pieces of size 1/${denominator}`,
        })),
        answer: answers,
        choices: answers,
        answerLabel: answers.join(", "),
      });
    }

    if (difficulty >= 4 && difficulty <= 8 && Math.random() < 0.32) {
      const pairs = takeUniqueAnswerPairs([
        { text: "1/2 of 14", answer: "7" },
        { text: "2/3 of 18", answer: "12" },
        { text: "3/4 of 20", answer: "15" },
        { text: "2/5 of 30", answer: "12" },
        { text: "5/8 of 24", answer: "15" },
        { text: "3/10 of 50", answer: "15" },
        { text: "4/5 of 35", answer: "28" },
      ], difficulty >= 7 ? 5 : 4);
      return createMatchingDragQuestion({
        type,
        difficulty,
        questionText: "Match each fraction-of-a-collection expression to its amount.",
        extraText: "First find one equal share, then take the number of shares named by the numerator.",
        leftItems: pairs,
        rightItems: pairs.map((pair) => pair.answer),
        reviewText: "The denominator tells how many equal groups to make; the numerator tells how many groups to take.",
      });
    }

    if (difficulty <= 7 && Math.random() < 0.55) {
      const pairs = takeUniqueAnswerPairs([
        { text: "1/2", answer: "2/4" },
        { text: "2/3", answer: "4/6" },
        { text: "3/4", answer: "6/8" },
        { text: "1/4", answer: "25%" },
        { text: "1/5", answer: "0.2" },
        { text: "2/5", answer: "40%" },
        { text: "3/5", answer: "0.6" },
      ], difficulty >= 6 ? 5 : 4);
      return createMatchingDragQuestion({
        type,
        difficulty,
        questionText: "Match each fraction to an equivalent value.",
        extraText: "Equivalent values name the same amount.",
        leftItems: pairs,
        rightItems: pairs.map((pair) => pair.answer),
      });
    }

    if (difficulty >= 5 && Math.random() < 0.34) {
      const pairs = takeUniqueAnswerPairs([
        { text: "10%", answer: "one tenth of a whole" },
        { text: "20%", answer: "one fifth of a whole" },
        { text: "25%", answer: "one quarter of a whole" },
        { text: "40%", answer: "two fifths of a whole" },
        { text: "50%", answer: "one half of a whole" },
        { text: "75%", answer: "three quarters of a whole" },
        { text: "125%", answer: "one and one quarter wholes" },
        { text: "150%", answer: "one and one half wholes" },
      ], difficulty >= 8 ? 5 : 4);
      return createMatchingDragQuestion({
        type,
        difficulty,
        questionText: "Match each percent to the amount it describes.",
        extraText: "100% is one whole, so a percent may also be greater than one whole.",
        leftItems: pairs,
        rightItems: pairs.map((pair) => pair.answer),
      });
    }

    if (difficulty >= 5 && Math.random() < 0.55) {
      const sets = [
        { minDifficulty: 5, maxDifficulty: 6, values: ["1/5", "2/5", "3/5", "4/5"] },
        { minDifficulty: 6, maxDifficulty: 7, values: ["1/8", "3/8", "5/8", "7/8"] },
        { minDifficulty: 7, maxDifficulty: 8, values: ["0.2", "1/3", "1/2", "0.75"] },
        { minDifficulty: 8, maxDifficulty: 9, values: ["12.5%", "1/4", "0.4", "5/8", "0.9"] },
        { minDifficulty: 8, maxDifficulty: 10, values: ["3/4", "1", "5/4", "1 1/2", "175%"] },
        { minDifficulty: 9, maxDifficulty: 10, values: ["0.6", "7/8", "110%", "4/3", "1 3/4"] },
      ];
      return createOrderQuestion({
        type,
        difficulty,
        questionText: "Place the values from least to greatest.",
        extraText: "Think about each value as part of one whole.",
        values: chooseByLevel(sets, difficulty).values,
        startLabel: "Least",
        endLabel: "Greatest",
      });
    }

    if (difficulty >= 6 && Math.random() < 0.6) {
      const pairs = takeUniqueAnswerPairs([
        { text: "Red:Blue = 1:2 with 9 total", answer: "3 red, 6 blue" },
        { text: "Girls:Boys = 3:2 with 20 total", answer: "12 girls, 8 boys" },
        { text: "Flour:Sugar = 4:1 with 10 cups total", answer: "8 flour, 2 sugar" },
        { text: "Cats:Dogs = 2:3 with 25 pets total", answer: "10 cats, 15 dogs" },
        { text: "Juice:Water = 1:3 with 16 cups total", answer: "4 juice, 12 water" },
      ], difficulty >= 8 ? 5 : 4);
      return createMatchingDragQuestion({
        type,
        difficulty,
        questionText: "Match each ratio situation to the matching amounts.",
        extraText: "Use the total number of equal ratio parts.",
        leftItems: pairs,
        rightItems: pairs.map((pair) => pair.answer),
      });
    }

    if (difficulty >= 7 && Math.random() < 0.5) {
      return createBucketsDragQuestion({
        type,
        difficulty,
        questionText: "Sort the equivalent representations.",
        extraText: "Fractions, decimals, and percents can name exactly the same number.",
        buckets: [
          { label: "Equal to 1/4", answers: takeRandom(["0.25", "25%", "2/8"], difficulty >= 9 ? 3 : 2) },
          { label: "Equal to 1/2", answers: takeRandom(["0.5", "50%", "4/8"], difficulty >= 9 ? 3 : 2) },
          { label: "Equal to 3/4", answers: takeRandom(["0.75", "75%", "6/8"], difficulty >= 9 ? 3 : 2) },
        ],
      });
    }

    if (difficulty >= 6 && Math.random() < 0.5) {
      return createBucketsDragQuestion({
        type,
        difficulty,
        questionText: "Sort each value by how it compares with one whole.",
        extraText: "One whole is 1, 100%, or any fraction with equal numerator and denominator.",
        buckets: [
          { label: "Less than 1", answers: takeRandom(["7/8", "0.6", "95%"], difficulty >= 9 ? 3 : 2) },
          { label: "Equal to 1", answers: takeRandom(["6/6", "100%", "1.0"], difficulty >= 9 ? 3 : 2) },
          { label: "Greater than 1", answers: takeRandom(["5/4", "120%", "1 1/2"], difficulty >= 9 ? 3 : 2) },
        ],
      });
    }

    return createBucketsDragQuestion({
      type,
      difficulty,
      questionText: "Sort each value by how it compares with one half.",
      extraText: "One half is the same as 0.5 and 50%.",
      buckets: [
        { label: "Less than 1/2", answers: takeRandom(["0.25", "20%", "3/8"], difficulty >= 9 ? 3 : 2) },
        { label: "Equal to 1/2", answers: takeRandom(["0.5", "50%", "4/8"], difficulty >= 9 ? 3 : 2) },
        { label: "Greater than 1/2", answers: takeRandom(["0.75", "80%", "5/6"], difficulty >= 9 ? 3 : 2) },
      ],
    });
  }

  function createScienceDragQuestion(category, difficulty) {
    const type = `${category}-drag`;
    if (difficulty <= 3 && Math.random() < 0.6) {
      return createBucketsDragQuestion({
        type,
        difficulty,
        questionText: "Sort each item into the correct bucket.",
        extraText: "Think about whether each item keeps its shape, flows, or spreads out.",
        buckets: [
          { label: "Solid", answers: takeRandom(["rock", "ice cube", "book", "spoon", "coin", "plate"], countForLevel(difficulty, 1, 2, 2)) },
          { label: "Liquid", answers: takeRandom(["water", "milk", "oil", "juice", "soup", "paint"], countForLevel(difficulty, 1, 2, 2)) },
          { label: "Gas", answers: takeRandom(["air", "steam", "helium", "oxygen", "water vapor", "breath"], countForLevel(difficulty, 1, 2, 2)) },
        ],
      });
    }

    if (difficulty <= 5 && Math.random() < 0.55) {
      return createBucketsDragQuestion({
        type,
        difficulty,
        questionText: "Sort each force example.",
        extraText: "A contact force touches. A non-contact force acts without touching.",
        buckets: [
          { label: "Contact force", answers: takeRandom(["pushing a cart", "pulling a rope", "kicking a ball", "friction slowing a sled"], 3) },
          { label: "Non-contact force", answers: takeRandom(["gravity pulling a ball down", "a magnet attracting a paper clip", "static electricity lifting hair", "a compass needle turning"], 3) },
        ],
      });
    }

    if (difficulty <= 7 && Math.random() < 0.55) {
      const pairs = takeUniqueAnswerPairs([
        { text: "Plants use sunlight to make sugar", answer: "photosynthesis" },
        { text: "Water changes from liquid to gas", answer: "evaporation" },
        { text: "Water vapor cools into drops", answer: "condensation" },
        { text: "A seed begins to grow", answer: "germination" },
        { text: "Pollen helps make seeds", answer: "pollination" },
        { text: "An animal blends into surroundings", answer: "camouflage" },
      ], difficulty >= 6 ? 5 : 4);
      return createMatchingDragQuestion({
        type,
        difficulty,
        questionText: "Match each description to the science word.",
        leftItems: pairs,
        rightItems: pairs.map((pair) => pair.answer),
      });
    }

    if (difficulty >= 6 && Math.random() < 0.5) {
      const pairs = [
        { text: "The thing changed on purpose", answer: "independent variable" },
        { text: "The result measured", answer: "dependent variable" },
        { text: "Things kept the same", answer: "controlled variables" },
        { text: "A prediction that can be tested", answer: "hypothesis" },
        { text: "A test repeated more than once", answer: "repeated trials" },
      ].slice(0, difficulty >= 8 ? 5 : 4);
      return createMatchingDragQuestion({
        type,
        difficulty,
        questionText: "Match each fair-test idea to its name.",
        extraText: "Fair tests change one important thing and measure the result.",
        leftItems: pairs,
        rightItems: pairs.map((pair) => pair.answer),
      });
    }

    if (difficulty >= 8 && Math.random() < 0.5) {
      return createBucketsDragQuestion({
        type,
        difficulty,
        questionText: "Sort each statement as claim, evidence, or reasoning.",
        extraText: "A claim answers the question, evidence is data, and reasoning explains why the data supports the claim.",
        buckets: [
          { label: "Claim", answers: takeRandom(["Sunlight helped the plant grow taller", "The blue sponge absorbed the most water", "The larger parachute fell more slowly"], 2) },
          { label: "Evidence", answers: takeRandom(["The sunlight plant grew 14 cm", "The blue sponge held 15 mL", "The large parachute took 6 seconds to fall"], 2) },
          { label: "Reasoning", answers: takeRandom(["More light can help plants make food", "Absorbed water shows sponge capacity", "More air resistance slows falling"], 2) },
        ],
      });
    }

    return createBucketsDragQuestion({
      type,
      difficulty,
      questionText: "Sort each organism by its role in a food web.",
      extraText: "Producers make food, consumers eat organisms, and decomposers recycle dead material.",
      buckets: [
        { label: "Producer", answers: takeRandom(["grass", "oak tree", "algae", "wheat plant"], difficulty >= 9 ? 3 : 2) },
        { label: "Consumer", answers: takeRandom(["rabbit", "hawk", "fish", "deer"], difficulty >= 9 ? 3 : 2) },
        { label: "Decomposer", answers: takeRandom(["mushroom", "bacteria", "earthworm", "mold"], difficulty >= 9 ? 3 : 2) },
      ],
    });
  }

  function createHealthDecisionSequenceQuestion(type, difficulty) {
    const scenarios = [
      {
        minDifficulty: 1,
        maxDifficulty: 4,
        id: "small-scrape-sequence",
        prompt: "Small scrape: put the safe response in order.",
        steps: [
          "Stop playing and move to a safe place",
          "Tell a trusted adult",
          "Rinse the scrape gently with clean water",
          "Use a clean bandage if the adult says it is appropriate",
        ],
      },
      {
        minDifficulty: 5,
        maxDifficulty: 7,
        id: "possible-poison-sequence",
        prompt: "Possible poisoning: put the help-seeking response in order.",
        steps: [
          "Move away from the substance without touching more of it",
          "Tell a trusted adult immediately",
          "Keep the container or label nearby without handling spilled material",
          "The adult calls the poison center, or emergency services for serious symptoms",
        ],
      },
      {
        minDifficulty: 8,
        maxDifficulty: 10,
        id: "fire-evacuation-sequence",
        prompt: "Smoke alarm and visible smoke: put the safest priorities in order.",
        steps: [
          "Use the nearest safe exit without collecting belongings",
          "Go to the outside meeting place",
          "Call emergency help from safety",
          "Stay outside and follow the dispatcher's instructions",
        ],
      },
    ];
    const scenario = chooseByLevel(scenarios, difficulty);
    const result = createTargetsDragQuestion({
      type,
      difficulty,
      questionText: scenario.prompt,
      extraText: "This activity practices recognition and help-seeking; follow current professional instructions in a real emergency.",
      targetArrangement: "rows",
      targets: scenario.steps.map((_, index) => ({
        text: `Step ${index + 1}`,
        reviewLabel: `Step ${index + 1}`,
      })),
      answer: scenario.steps,
      choices: scenario.steps,
      dragPlaceholderText: "Safe step",
    });
    return result
      ? {
          ...result,
          contentId: `health.sequence.${scenario.id}`,
          skill: "health.emergency.safe-sequencing",
          gradeMin: difficulty,
          gradeMax: difficulty,
          explanation: "Protect yourself first, get a trusted adult or trained help, and do not delay evacuation.",
          source: {
            title: "NHS first aid guidance",
            url: "https://www.nhs.uk/conditions/first-aid/",
            locale: "General",
          },
          reviewedAt: "2026-08-12",
        }
      : null;
  }

  function createNutritionDragQuestion(category, difficulty) {
    const type = `${category}-drag`;
    if (difficulty <= 3) {
      return createBucketsDragQuestion({
        type,
        difficulty,
        questionText: "Sort each food into the correct bucket.",
        extraText: "Pick foods you would usually choose more often and foods to save for sometimes.",
        buckets: [
          { label: "Everyday choice", answers: takeRandom(["apple", "carrots", "water", "beans", "yogurt", "oatmeal", "brown rice"], countForLevel(difficulty, 2, 3, 3)) },
          { label: "Sometimes choice", answers: takeRandom(["candy", "soda", "chips", "doughnut", "fries", "cookies", "milkshake"], countForLevel(difficulty, 2, 3, 3)) },
        ],
      });
    }

    if (difficulty <= 5 && Math.random() < 0.6) {
      return createBucketsDragQuestion({
        type,
        difficulty,
        questionText: "Sort each food into its food group.",
        extraText: "A balanced meal usually has more than one food group.",
        buckets: [
          { label: "Fruit", answers: takeRandom(["apple", "banana", "orange", "grapes"], 1) },
          { label: "Vegetable", answers: takeRandom(["carrot", "broccoli", "spinach", "pepper"], 1) },
          { label: "Protein", answers: takeRandom(["egg", "beans", "fish", "lentils"], 1) },
          { label: "Grain", answers: takeRandom(["rice", "bread", "oatmeal", "pasta"], 1) },
          { label: "Dairy", answers: takeRandom(["milk", "yogurt", "cheese", "cottage cheese"], 1) },
        ],
      });
    }

    if (difficulty <= 8 && Math.random() < 0.6) {
      const pairs = takeUniqueAnswerPairs([
        { text: "protein", answer: "builds and repairs body parts" },
        { text: "fiber", answer: "helps digestion and fullness" },
        { text: "calcium", answer: "helps build strong bones and teeth" },
        { text: "iron", answer: "helps blood carry oxygen" },
        { text: "water", answer: "helps the body stay hydrated" },
        { text: "carbohydrates", answer: "give energy for activity" },
      ], difficulty >= 7 ? 5 : 4);
      return createMatchingDragQuestion({
        type,
        difficulty,
        questionText: "Match each nutrient to what it helps the body do.",
        leftItems: pairs,
        rightItems: pairs.map((pair) => pair.answer),
      });
    }

    if (difficulty >= 6 && Math.random() < 0.55) {
      const pairs = [
        { text: "Serving size", answer: "amount the label numbers are based on" },
        { text: "Servings per container", answer: "how many servings are in the package" },
        { text: "Calories", answer: "energy from food" },
        { text: "Added sugars", answer: "sugar added during processing" },
        { text: "Sodium", answer: "salt-related nutrient to compare" },
      ];
      return createMatchingDragQuestion({
        type,
        difficulty,
        questionText: "Match each Nutrition Facts term to its meaning.",
        extraText: "Food labels help you compare packages fairly.",
        leftItems: pairs,
        rightItems: pairs.map((pair) => pair.answer),
      });
    }

    return createBucketsDragQuestion({
      type,
      difficulty,
      questionText: "Sort each item by whether it helps build a balanced everyday meal.",
      extraText: "No single food makes a whole diet. Think about everyday balance.",
      buckets: [
        { label: "Helps balance a meal", answers: takeRandom(["vegetables", "fruit", "whole grains", "protein food", "water"], difficulty >= 9 ? 4 : 3) },
        { label: "Limit most days", answers: takeRandom(["sugary drink", "deep-fried snack", "giant dessert", "extra candy", "mostly frosting"], difficulty >= 9 ? 4 : 3) },
      ],
    });
  }

  function createHouseholdRecipeSequenceQuestion(type, difficulty) {
    const recipes = [
      {
        minDifficulty: 1,
        maxDifficulty: 2,
        title: "cracker snack",
        steps: ["Wash your hands", "Put a plate on the table", "Put crackers on the plate", "Add cheese slices"],
      },
      {
        minDifficulty: 1,
        maxDifficulty: 3,
        title: "simple sandwich",
        steps: ["Wash your hands", "Put bread on a plate", "Add the filling", "Put the second slice on top"],
      },
      {
        minDifficulty: 2,
        maxDifficulty: 4,
        title: "fruit plate",
        steps: ["Wash your hands", "Rinse the fruit", "Ask an adult to cut large pieces", "Put the fruit on a plate"],
      },
      {
        minDifficulty: 3,
        maxDifficulty: 6,
        title: "toast with adult help",
        steps: [
          "Ask an adult before using the toaster",
          "Put bread in the toaster",
          "Wait until the toast pops up",
          "Use tongs or adult help to move the toast",
        ],
      },
      {
        minDifficulty: 4,
        maxDifficulty: 7,
        title: "pasta salad",
        steps: [
          "Read the recipe all the way through",
          "Gather the ingredients and tools",
          "Measure the ingredients",
          "Mix everything in a bowl",
          "Put leftovers in the refrigerator",
        ],
      },
      {
        minDifficulty: 6,
        maxDifficulty: 10,
        title: "muffins with adult help",
        steps: [
          "Read the recipe and safety notes",
          "Preheat the oven with adult help",
          "Mix the dry ingredients",
          "Add the wet ingredients",
          "Spoon batter into the pan",
          "Bake with adult supervision",
        ],
      },
      {
        minDifficulty: 7,
        maxDifficulty: 10,
        title: "dinner prep plan",
        steps: [
          "Read the recipe and check allergies",
          "Wash hands and clear the counter",
          "Set out ingredients",
          "Prepare raw meat on a separate board",
          "Wash hands and surfaces",
          "Cook food to the safe temperature",
        ],
      },
    ];
    const recipe = chooseByLevel(recipes, difficulty);
    const labels = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth"].slice(0, recipe.steps.length);

    return createTargetsDragQuestion({
      type,
      difficulty,
      questionText: "Recipe Step Sequencer: drag the cooking steps into a safe order.",
      extraText: `Plan the ${recipe.title} from start to finish.`,
      targetArrangement: "rows",
      targets: labels.map((label) => ({ text: label, reviewLabel: label })),
      answer: recipe.steps,
      choices: recipe.steps,
      dragPlaceholderText: "Drop step",
      answerLabel: recipe.steps.join(" -> "),
      reviewText: `Safe order: ${recipe.steps.join(" -> ")}`,
    });
  }

  function createHouseholdToolMatchQuestion(type, difficulty) {
    const pairs = takeUniqueAnswerPairs([
      { text: "Wipe a small water spill", answer: "towel" },
      { text: "Sweep crumbs from the floor", answer: "broom" },
      { text: "Pick up dust after sweeping", answer: "dustpan" },
      { text: "Cut paper for a craft", answer: "scissors" },
      { text: "Measure a shelf", answer: "tape measure" },
      { text: "Tighten a loose screw", answer: "screwdriver" },
      { text: "Protect hands from a warm tray", answer: "oven mitts" },
      { text: "Open a can with adult help", answer: "can opener" },
      { text: "Clean a high window safely", answer: "ask an adult for a step stool" },
      { text: "Check if a flashlight needs power", answer: "matching batteries" },
      { text: "Label food before storing it", answer: "marker and tape" },
    ], difficulty >= 8 ? 5 : difficulty >= 4 ? 4 : 3);

    return createMatchingDragQuestion({
      type,
      difficulty,
      questionText: "Tool Match: connect each household task to the right tool.",
      extraText: difficulty >= 6
        ? "Choose the tool that solves the task safely and directly."
        : "Pick the everyday tool that fits each job.",
      leftItems: pairs,
      rightItems: pairs.map((pair) => pair.answer),
    });
  }

  function createHouseholdPackingChecklistQuestion(type, difficulty) {
    const checklists = [
      {
        minDifficulty: 1,
        maxDifficulty: 3,
        title: "School Bag",
        prompt: "Pack for a regular school day.",
        buckets: [
          { label: "Pack", answers: ["homework folder", "pencil case", "water bottle"] },
          { label: "Leave at home", answers: ["TV remote", "pillow", "kitchen sponge"] },
        ],
      },
      {
        minDifficulty: 1,
        maxDifficulty: 4,
        title: "Rainy Walk",
        prompt: "Pack for walking to school in rain.",
        buckets: [
          { label: "Pack", answers: ["raincoat", "umbrella", "dry socks"] },
          { label: "Leave at home", answers: ["beach ball", "snow sled", "ice skates"] },
        ],
      },
      {
        minDifficulty: 2,
        maxDifficulty: 5,
        title: "Sports Practice",
        prompt: "Pack for practice after school.",
        buckets: [
          { label: "Pack", answers: ["sports shoes", "water bottle", "team shirt"] },
          { label: "Leave at home", answers: ["glass vase", "heavy blanket", "board game box"] },
        ],
      },
      {
        minDifficulty: 4,
        maxDifficulty: 7,
        title: "Overnight Bag",
        prompt: "Pack for one night away from home.",
        buckets: [
          { label: "Must pack", answers: ["toothbrush", "pajamas", "clean clothes"] },
          { label: "Optional", answers: ["small book", "card game"] },
          { label: "Leave at home", answers: ["full laundry basket", "open snack bowl"] },
        ],
      },
      {
        minDifficulty: 6,
        maxDifficulty: 10,
        title: "Hot Weather Day Trip",
        prompt: "Pack for a sunny day trip where you will walk outside.",
        buckets: [
          { label: "Health and safety", answers: ["water bottle", "hat", "sunscreen"] },
          { label: "Useful extras", answers: ["map", "small snack"] },
          { label: "Leave at home", answers: ["winter coat", "glass cup", "family medicine bottle"] },
        ],
      },
      {
        minDifficulty: 8,
        maxDifficulty: 10,
        title: "Fix the Checklist",
        prompt: "A friend packed too much. Sort what belongs in the emergency outing bag.",
        buckets: [
          { label: "Essential", answers: ["charged phone", "water", "needed medicine with adult approval"] },
          { label: "Helpful", answers: ["small snack", "light jacket"] },
          { label: "Remove", answers: ["loose glass jar", "heavy toy collection", "unknown pills"] },
        ],
      },
    ];
    const checklist = chooseByLevel(checklists, difficulty);

    return createBucketsDragQuestion({
      type,
      difficulty,
      questionText: `Packing Checklist Builder: ${checklist.title}`,
      extraText: checklist.prompt,
      buckets: checklist.buckets,
      dragPlaceholderText: "Drop item",
      reviewText: checklist.prompt,
    });
  }

  function createHouseholdProblemSolvingDragQuestion(category, difficulty) {
    const type = `${category}-drag`;

    if (difficulty <= 2) {
      return Math.random() < 0.5
        ? createHouseholdPackingChecklistQuestion(type, difficulty)
        : createHouseholdToolMatchQuestion(type, difficulty);
    }

    if (difficulty <= 4) {
      const options = [
        createHouseholdPackingChecklistQuestion,
        createHouseholdToolMatchQuestion,
        createHouseholdRecipeSequenceQuestion,
      ];
      return randomChoiceLocal(options)(type, difficulty);
    }

    if (difficulty <= 7) {
      if (Math.random() < 0.35) return createHouseholdRecipeSequenceQuestion(type, difficulty);
      if (Math.random() < 0.55) return createHouseholdToolMatchQuestion(type, difficulty);
      return createHouseholdPackingChecklistQuestion(type, difficulty);
    }

    if (Math.random() < 0.4) return createHouseholdPackingChecklistQuestion(type, difficulty);
    if (Math.random() < 0.65) return createHouseholdRecipeSequenceQuestion(type, difficulty);
    return createHouseholdToolMatchQuestion(type, difficulty);
  }

  function createEstimationDragQuestion(category, difficulty) {
    const type = `${category}-drag`;
    if (difficulty <= 3 && Math.random() < 0.55) {
      return createBucketsDragQuestion({
        type,
        difficulty,
        questionText: "Sort each measurement into the correct bucket.",
        extraText: "Words like about, around, close to, nearly, and roughly usually mean the value is estimated.",
        buckets: [
          { label: "Estimated", answers: takeRandom(["about 20 cm", "around 5 minutes", "almost 100 beads", "close to 1 liter", "roughly 12 meters"], 3) },
          { label: "Exact", answers: takeRandom(["20 cm exactly", "5 minutes exactly", "100 beads exactly", "1 liter exactly", "12 meters exactly"], 3) },
        ],
      });
    }

    if (difficulty <= 6 && Math.random() < 0.55) {
      return createBucketsDragQuestion({
        type,
        difficulty,
        questionText: "Sort each estimate by whether it is reasonable.",
        extraText: "A reasonable estimate should fit real life.",
        buckets: [
          { label: "Reasonable", answers: takeRandom(["a pencil is about 15 cm long", "a backpack weighs about 5 kg", "a door is about 2 m tall", "a bottle holds about 500 mL"], 3) },
          { label: "Not reasonable", answers: takeRandom(["a pencil is about 15 m long", "a backpack weighs about 500 kg", "a door is about 2 cm tall", "a bottle holds about 500 L"], 3) },
        ],
      });
    }

    if (difficulty <= 8 && Math.random() < 0.6) {
      const pairs = takeUniqueAnswerPairs([
        { text: "48 rounded to nearest ten", answer: "50" },
        { text: "153 rounded to nearest ten", answer: "150" },
        { text: "389 rounded to nearest hundred", answer: "400" },
        { text: "1,249 rounded to nearest hundred", answer: "1,200" },
        { text: "2,760 rounded to nearest thousand", answer: "3,000" },
        { text: "12.46 rounded to nearest tenth", answer: "12.5" },
      ], difficulty >= 7 ? 5 : 4);
      return createMatchingDragQuestion({
        type,
        difficulty,
        questionText: "Match each number to its rounded value.",
        extraText: "Rounding makes numbers easier to estimate with.",
        leftItems: pairs,
        rightItems: pairs.map((pair) => pair.answer),
      });
    }

    if (difficulty >= 7 && Math.random() < 0.55) {
      const pairs = [
        { text: "51 + 49", answer: "use compatible numbers" },
        { text: "98 × 6", answer: "round 98 to 100" },
        { text: "19.8 ÷ 5", answer: "round 19.8 to 20" },
        { text: "24% of 200", answer: "think about one quarter" },
        { text: "3.9 × 21", answer: "round to 4 × 20" },
      ];
      return createMatchingDragQuestion({
        type,
        difficulty,
        questionText: "Match each problem to a helpful estimation strategy.",
        leftItems: pairs,
        rightItems: pairs.map((pair) => pair.answer),
      });
    }

    return createBucketsDragQuestion({
      type,
      difficulty,
      questionText: "Sort each thing by the size scale you would estimate first.",
      extraText: "Think about whether the thing is tiny, everyday-sized, or very large.",
      buckets: [
        { label: "Small scale", answers: takeRandom(["paper clip mass", "ant length", "coin thickness", "medicine spoon amount"], 3) },
        { label: "Everyday scale", answers: takeRandom(["pencil length", "water bottle amount", "backpack mass", "table height"], 3) },
        { label: "Large scale", answers: takeRandom(["distance between towns", "mass of a car", "water in a pool", "height of a building"], 3) },
      ],
    });
  }

  function createMeasurementDragQuestion(category, difficulty) {
    const type = `${category}-drag`;
    if (difficulty <= 4 && Math.random() < 0.55) {
      const unitGroups = [
        { unit: "mm", prompts: ["thickness of a coin", "length of a small ant", "width of a rice grain"] },
        { unit: "cm", prompts: ["length of a pencil", "width of a notebook", "height of a juice box"] },
        { unit: "m", prompts: ["height of a door", "length of a classroom", "height of a tree"] },
        { unit: "mL", prompts: ["medicine in a spoon", "liquid in a small bottle", "water in a teacup"] },
        { unit: "L", prompts: ["water in a bucket", "milk in a large jug", "water in a fish tank"] },
        { unit: "g", prompts: ["weight of a paper clip", "weight of a strawberry", "weight of a key"] },
        { unit: "kg", prompts: ["weight of a watermelon", "weight of a dog", "weight of a suitcase"] },
        { unit: "km", prompts: ["distance between towns", "length of a road trip", "distance between airports"] },
      ];
      const selection = takeRandom(unitGroups, difficulty >= 3 ? 4 : 3).map((group) => ({ text: randomChoiceLocal(group.prompts), answer: group.unit }));
      return createTargetsDragQuestion({
        type,
        difficulty,
        questionText: "Match each object to the best unit.",
        targetArrangement: "rows",
        targets: selection.map((item) => ({ text: item.text, reviewLabel: item.text })),
        answer: selection.map((item) => item.answer),
        choices: selection.map((item) => item.answer),
      });
    }

    if (difficulty <= 5 && Math.random() < 0.5) {
      const pairs = takeUniqueAnswerPairs([
        { text: "temperature", answer: "thermometer" },
        { text: "mass of apples", answer: "scale" },
        { text: "length of a desk", answer: "meter stick" },
        { text: "time for a race", answer: "stopwatch" },
        { text: "liquid for a recipe", answer: "measuring cup" },
        { text: "angle in a shape", answer: "protractor" },
      ], 4);
      return createMatchingDragQuestion({
        type,
        difficulty,
        questionText: "Match what you measure to a useful tool.",
        leftItems: pairs,
        rightItems: pairs.map((pair) => pair.answer),
      });
    }

    if (difficulty <= 8 && Math.random() < 0.6) {
      const pairs = takeUniqueAnswerPairs([
        { text: "1 m", answer: "100 cm" },
        { text: "1 kg", answer: "1,000 g" },
        { text: "1 L", answer: "1,000 mL" },
        { text: "2.5 m", answer: "250 cm" },
        { text: "3.2 kg", answer: "3,200 g" },
        { text: "750 mL", answer: "0.75 L" },
        { text: "0.5 km", answer: "500 m" },
      ], difficulty >= 7 ? 5 : 4);
      return createMatchingDragQuestion({
        type,
        difficulty,
        questionText: "Match each measurement to an equivalent measurement.",
        extraText: "Equivalent measurements name the same amount.",
        leftItems: pairs,
        rightItems: pairs.map((pair) => pair.answer),
      });
    }

    if (difficulty >= 7 && Math.random() < 0.55) {
      const set = chooseByLevel([
        { minDifficulty: 7, maxDifficulty: 8, values: ["250 mL", "0.5 L", "750 mL", "1 L"] },
        { minDifficulty: 7, maxDifficulty: 9, values: ["5 mm", "2 cm", "0.5 m", "1 m"] },
        { minDifficulty: 8, maxDifficulty: 10, values: ["250 g", "0.5 kg", "750 g", "1.2 kg"] },
        { minDifficulty: 9, maxDifficulty: 10, values: ["75 cm", "1 m", "1.5 m", "2,000 mm"] },
      ], difficulty);
      return createOrderQuestion({
        type,
        difficulty,
        questionText: "Place the measurements from smallest to largest.",
        extraText: "Convert to the same unit before comparing.",
        values: set.values,
        startLabel: "Smallest",
        endLabel: "Largest",
      });
    }

    const pairs = [
      { text: "milli-", answer: "one thousandth" },
      { text: "centi-", answer: "one hundredth" },
      { text: "kilo-", answer: "one thousand" },
      { text: "meter", answer: "base unit for length" },
      { text: "liter", answer: "base unit for liquid volume" },
    ];
    return createMatchingDragQuestion({
      type,
      difficulty,
      questionText: "Match each metric word part to its meaning.",
      leftItems: pairs,
      rightItems: pairs.map((pair) => pair.answer),
    });
  }

  function createVisualMeasurementDragQuestion(category, difficulty) {
    const type = `${category}-drag`;
    if (difficulty <= 4 || Math.random() < 0.35) {
      const slotCount = difficulty >= 8 ? 5 : difficulty >= 4 ? 4 : 3;
      const step = difficulty <= 2 ? randomChoiceLocal([1, 2]) : difficulty <= 5 ? randomChoiceLocal([2, 3, 5]) : difficulty <= 7 ? randomChoiceLocal([5, 10, 25]) : randomChoiceLocal([0.25, 0.5, 1.5]);
      const start = (difficulty <= 2 ? randomIntLocal(0, 2) : randomIntLocal(-2, 1)) * step;
      const values = Array.from({ length: slotCount }, (_, index) => start + step * (index + 1));
      const end = start + step * (slotCount + 1);
      const formatValue = (value) => (Number.isInteger(value) ? String(value) : String(Number(value.toFixed(2))));
      return createTargetsDragQuestion({
        type,
        difficulty,
        questionText: "Place the numbers on the number line.",
        extraText: `The marks are spaced evenly and count by ${formatValue(step)}.`,
        targetArrangement: "line",
        targets: values.map((value) => ({ text: "", reviewLabel: formatValue(value) })),
        answer: values.map(formatValue),
        choices: values.map(formatValue),
        answerLabel: `From left to right: ${values.map(formatValue).join(", ")}`,
        dragPlaceholderText: "\u00a0",
        dragLineStartLabel: formatValue(start),
        dragLineEndLabel: formatValue(end),
        dragShowTargetLabels: false,
      });
    }

    if (difficulty <= 7 || Math.random() < 0.5) {
      const ranges = difficulty >= 7
        ? [
            { label: "Freezing or below", temps: ["-8°C", "-4°C", "0°C"] },
            { label: "Cold", temps: ["4°C", "7°C", "10°C"] },
            { label: "Comfortable", temps: ["18°C", "21°C", "24°C"] },
            { label: "Hot", temps: ["30°C", "35°C", "39°C"] },
          ]
        : [
            { label: "Below 0°C", temps: ["-8°C", "-4°C", "-1°C"] },
            { label: "0°C to 10°C", temps: ["2°C", "7°C", "10°C"] },
            { label: "11°C to 25°C", temps: ["14°C", "18°C", "24°C"] },
            { label: "26°C and up", temps: ["27°C", "33°C", "39°C"] },
          ];
      const answers = ranges.map((range) => randomChoiceLocal(range.temps));
      return createTargetsDragQuestion({
        type,
        difficulty,
        questionText: "Place each temperature in the correct range.",
        targetArrangement: "line",
        targets: ranges.map((range) => ({ text: range.label, reviewLabel: range.label })),
        answer: answers,
        choices: answers,
        dragPlaceholderText: "\u00a0",
      });
    }

    const set = chooseByLevel([
      { minDifficulty: 8, maxDifficulty: 10, values: ["6:50 AM", "12:10 PM", "3:25 PM", "9:05 PM"] },
      { minDifficulty: 9, maxDifficulty: 10, values: ["23:10", "23:45", "00:20", "01:05"] },
      { minDifficulty: 8, maxDifficulty: 10, values: ["125 mL", "250 mL", "0.5 L", "750 mL"] },
      { minDifficulty: 8, maxDifficulty: 10, values: ["-5°C", "0°C", "12°C", "24°C", "37°C"] },
    ], difficulty);
    return createOrderQuestion({
      type,
      difficulty,
      questionText: "Place the readings in order.",
      extraText: set.values.includes("00:20") ? "This timeline passes midnight." : "Start with the smallest or earliest reading.",
      values: set.values,
      startLabel: "Start",
      endLabel: "End",
    });
  }

  function createMapsDirectionsDragQuestion(category, difficulty) {
    const type = `${category}-drag`;
    if (difficulty <= 4 || Math.random() < 0.35) {
      const positions = difficulty >= 4
        ? ["northwest", "north", "northeast", "west", "east", "southwest", "south", "southeast"]
        : ["north", "east", "south", "west"];
      return createTargetsDragQuestion({
        type,
        difficulty,
        questionText: "Drag each label to the correct place on the compass.",
        targetArrangement: "compass",
        targets: positions.map((position) => ({ position, reviewLabel: formatDirectionLabel(position) })),
        answer: positions.map((position) => formatDirectionLabel(position)),
        choices: positions.map((position) => formatDirectionLabel(position)),
        dragPlaceholderText: "\u00a0",
        dragCompassCenterLabel: difficulty >= 4 ? "Compass Rose" : "Compass",
      });
    }

    if (difficulty <= 6 && Math.random() < 0.55) {
      const pairs = takeUniqueAnswerPairs([
        { text: "blue line", answer: "river" },
        { text: "green area", answer: "park" },
        { text: "dashed line", answer: "trail" },
        { text: "star", answer: "capital city" },
        { text: "airplane symbol", answer: "airport" },
        { text: "H symbol", answer: "hospital" },
      ], 4);
      return createMatchingDragQuestion({
        type,
        difficulty,
        questionText: "Match each map symbol to what it usually means.",
        extraText: "A map key explains symbols.",
        leftItems: pairs,
        rightItems: pairs.map((pair) => pair.answer),
      });
    }

    if (difficulty <= 8 && Math.random() < 0.55) {
      const pairs = takeUniqueAnswerPairs([
        { text: "1 cm = 2 km; map distance 3 cm", answer: "6 km" },
        { text: "1 cm = 5 km; map distance 4 cm", answer: "20 km" },
        { text: "1 cm = 10 km; map distance 2.5 cm", answer: "25 km" },
        { text: "1 cm = 50 m; map distance 6 cm", answer: "300 m" },
        { text: "1 cm = 100 m; map distance 1.5 cm", answer: "150 m" },
      ], difficulty >= 8 ? 5 : 4);
      return createMatchingDragQuestion({
        type,
        difficulty,
        questionText: "Match each map scale problem to the real distance.",
        extraText: "Multiply the map distance by the scale.",
        leftItems: pairs,
        rightItems: pairs.map((pair) => pair.answer),
      });
    }

    if (difficulty >= 7 && Math.random() < 0.5) {
      const route = randomChoiceLocal([
        ["Start at school", "Walk east 2 blocks", "Turn north", "Arrive at the library"],
        ["Start at the park", "Go south to the bakery", "Turn west at the corner", "Reach the museum"],
        ["Find the map key", "Locate the trail symbol", "Follow the dashed line", "Reach the campsite"],
      ]);
      return createOrderQuestion({
        type,
        difficulty,
        questionText: "Place the route steps in order.",
        extraText: "A route is easier to follow when the steps are in sequence.",
        values: route,
        startLabel: "First",
        endLabel: "Last",
      });
    }

    const pairs = [
      { text: "Latitude", answer: "north or south position" },
      { text: "Longitude", answer: "east or west position" },
      { text: "Equator", answer: "0° latitude" },
      { text: "Prime Meridian", answer: "0° longitude" },
      { text: "Grid reference", answer: "letters and numbers for a map square" },
    ];
    return createMatchingDragQuestion({
      type,
      difficulty,
      questionText: "Match each map grid word to its meaning.",
      leftItems: pairs,
      rightItems: pairs.map((pair) => pair.answer),
    });
  }

  const FINANCIAL_CURRENCY_MATCH_GROUPS = [
    [
      { text: "Israel", answer: "shekel" },
      { text: "United States", answer: "dollar" },
      { text: "Japan", answer: "yen" },
      { text: "India", answer: "rupee" },
    ],
    [
      { text: "China", answer: "yuan" },
      { text: "South Korea", answer: "won" },
      { text: "Mexico", answer: "peso" },
      { text: "Brazil", answer: "real" },
    ],
    [
      { text: "Saudi Arabia", answer: "riyal" },
      { text: "Switzerland", answer: "franc" },
      { text: "Turkey", answer: "lira" },
      { text: "Nigeria", answer: "naira" },
    ],
  ];

  function createFinancialLiteracyDragQuestion(category, difficulty) {
    const type = `${category}-drag`;
    if (difficulty <= 3 && Math.random() < 0.55) {
      return createBucketsDragQuestion({
        type,
        difficulty,
        questionText: "Sort each item as a need or a want.",
        extraText: "Needs are important for health, safety, and daily life. Wants are nice but not required.",
        buckets: [
          { label: "Need", answers: takeRandom(["basic food", "safe shelter", "medicine when sick", "winter coat", "school supplies", "clean water"], countForLevel(difficulty, 2, 3, 3)) },
          { label: "Want", answers: takeRandom(["extra candy", "new video game", "designer shoes", "toy robot", "movie tickets", "fancy stickers"], countForLevel(difficulty, 2, 3, 3)) },
        ],
      });
    }

    if (difficulty <= 5 && Math.random() < 0.45) {
      const pairs = randomChoiceLocal(FINANCIAL_CURRENCY_MATCH_GROUPS);
      return createMatchingDragQuestion({
        type,
        difficulty,
        questionText: "Select each country and its currency.",
        extraText: "Click a country or dot, then click the matching currency name or dot.",
        leftItems: pairs,
        rightItems: pairs.map((pair) => pair.answer),
      });
    }

    if (difficulty <= 7 && Math.random() < 0.6) {
      const pairs = takeUniqueAnswerPairs([
        { text: "4 notebooks for 20 shekels", answer: "5 shekels each" },
        { text: "3 pencils for 12 shekels", answer: "4 shekels each" },
        { text: "2 liters for 18 shekels", answer: "9 shekels per liter" },
        { text: "5 apples for 15 shekels", answer: "3 shekels each" },
        { text: "6 erasers for 12 shekels", answer: "2 shekels each" },
        { text: "10 stickers for 10 shekels", answer: "1 shekel each" },
      ], difficulty >= 6 ? 5 : 4);
      return createMatchingDragQuestion({
        type,
        difficulty,
        questionText: "Match each deal to its unit price.",
        extraText: "Unit price helps compare deals fairly.",
        leftItems: pairs,
        rightItems: pairs.map((pair) => pair.answer),
      });
    }

    if (difficulty >= 7 && Math.random() < 0.5) {
      return createBucketsDragQuestion({
        type,
        difficulty,
        questionText: "Sort each money item into a budget category.",
        extraText: "A budget tracks money coming in, money saved, and money spent.",
        buckets: [
          { label: "Income", answers: takeRandom(["allowance", "dog walking payment", "birthday money", "lemonade stand earnings"], difficulty >= 9 ? 3 : 2) },
          { label: "Saving", answers: takeRandom(["future bike fund", "emergency fund", "college savings", "vacation savings"], difficulty >= 9 ? 3 : 2) },
          { label: "Spending", answers: takeRandom(["bus fare", "notebook purchase", "school snack", "replacement charger"], difficulty >= 9 ? 3 : 2) },
        ],
      });
    }

    if (difficulty >= 8 && Math.random() < 0.5) {
      const pairs = [
        { text: "budget", answer: "a plan for money" },
        { text: "income", answer: "money coming in" },
        { text: "expense", answer: "money going out" },
        { text: "interest", answer: "extra money paid or earned over time" },
        { text: "opportunity cost", answer: "what you give up when choosing" },
      ];
      return createMatchingDragQuestion({
        type,
        difficulty,
        questionText: "Match each financial term to its meaning.",
        leftItems: pairs,
        rightItems: pairs.map((pair) => pair.answer),
      });
    }

    return createBucketsDragQuestion({
      type,
      difficulty,
      questionText: "Sort each money choice by risk.",
      extraText: "A risky choice has a bigger chance of losing money or causing trouble.",
      buckets: [
        { label: "Lower risk", answers: takeRandom(["saving for a known price", "comparing unit prices", "keeping a spending list", "reading a return policy"], difficulty >= 9 ? 4 : 3) },
        { label: "Higher risk", answers: takeRandom(["buying without checking the price", "sharing a password", "spending all savings at once", "clicking an unknown prize link"], difficulty >= 9 ? 4 : 3) },
      ],
    });
  }

  function createVocabularyGrammarDragQuestion(category, difficulty) {
    const type = `${category}-drag`;
    const generatorSpecs = [
      { minDifficulty: 1, build: createPartOfSpeechSortQuestion },
      { minDifficulty: 1, build: createPartOfSpeechSortQuestion },
      { minDifficulty: 1, build: createAffixFactoryQuestion },
      { minDifficulty: 1, build: createSentenceSurgeryQuestion },
      { minDifficulty: 2, build: createWordLadderQuestion },
      { minDifficulty: 3, build: createSynonymStrengthQuestion },
    ].filter((spec) => difficulty >= spec.minDifficulty);
    const generator = randomChoiceLocal(generatorSpecs).build;

    return generator(type, difficulty) || createPartOfSpeechSortQuestion(type, difficulty);
  }

  function createPartOfSpeechSortQuestion(type, difficulty) {
    const sets = [
      {
        minDifficulty: 1,
        maxDifficulty: 2,
        sentence: "The small dog runs home.",
        buckets: [
          { label: "Nouns", answers: ["dog", "home"] },
          { label: "Verbs", answers: ["runs"] },
          { label: "Adjectives", answers: ["small"] },
        ],
      },
      {
        minDifficulty: 1,
        maxDifficulty: 3,
        sentence: "A bright bird sings loudly.",
        buckets: [
          { label: "Nouns", answers: ["bird"] },
          { label: "Verbs", answers: ["sings"] },
          { label: "Adjectives", answers: ["bright"] },
          { label: "Adverbs", answers: ["loudly"] },
        ],
      },
      {
        minDifficulty: 2,
        maxDifficulty: 4,
        sentence: "Maya carefully packed the heavy bag.",
        buckets: [
          { label: "Nouns", answers: ["Maya", "bag"] },
          { label: "Verbs", answers: ["packed"] },
          { label: "Adjectives", answers: ["heavy"] },
          { label: "Adverbs", answers: ["carefully"] },
        ],
      },
      {
        minDifficulty: 3,
        maxDifficulty: 5,
        sentence: "The kitten slept under the warm blanket.",
        buckets: [
          { label: "Nouns", answers: ["kitten", "blanket"] },
          { label: "Verbs", answers: ["slept"] },
          { label: "Adjectives", answers: ["warm"] },
          { label: "Prepositions", answers: ["under"] },
        ],
      },
      {
        minDifficulty: 4,
        maxDifficulty: 6,
        sentence: "They quickly built a sturdy bridge.",
        buckets: [
          { label: "Pronouns", answers: ["They"] },
          { label: "Verbs", answers: ["built"] },
          { label: "Adjectives", answers: ["sturdy"] },
          { label: "Adverbs", answers: ["quickly"] },
        ],
      },
      {
        minDifficulty: 5,
        maxDifficulty: 7,
        sentence: "Noga read quietly because the baby slept.",
        buckets: [
          { label: "Nouns", answers: ["Noga", "baby"] },
          { label: "Verbs", answers: ["read", "slept"] },
          { label: "Adverbs", answers: ["quietly"] },
          { label: "Conjunctions", answers: ["because"] },
        ],
      },
      {
        minDifficulty: 6,
        maxDifficulty: 8,
        sentence: "Although the trail was muddy, the hikers continued safely.",
        buckets: [
          { label: "Nouns", answers: ["trail", "hikers"] },
          { label: "Verbs", answers: ["was", "continued"] },
          { label: "Adjectives", answers: ["muddy"] },
          { label: "Adverbs", answers: ["safely"] },
          { label: "Conjunctions", answers: ["Although"] },
        ],
      },
      {
        minDifficulty: 7,
        maxDifficulty: 10,
        sentence: "The curious scientist examined samples inside the quiet lab.",
        buckets: [
          { label: "Nouns", answers: ["scientist", "samples", "lab"] },
          { label: "Verbs", answers: ["examined"] },
          { label: "Adjectives", answers: ["curious", "quiet"] },
          { label: "Prepositions", answers: ["inside"] },
        ],
      },
      {
        minDifficulty: 8,
        maxDifficulty: 10,
        sentence: "When evidence changes, careful writers revise their claims.",
        buckets: [
          { label: "Nouns", answers: ["evidence", "writers", "claims"] },
          { label: "Verbs", answers: ["changes", "revise"] },
          { label: "Adjectives", answers: ["careful"] },
          { label: "Pronouns", answers: ["their"] },
          { label: "Conjunctions", answers: ["When"] },
        ],
      },
    ];
    const item = chooseByLevel(sets, difficulty);
    return createBucketsDragQuestion({
      type,
      difficulty,
      questionText: "Part-of-speech color sort: sort each word into the correct group.",
      extraText: `Sentence: ${item.sentence}`,
      buckets: item.buckets,
    });
  }

  function createAffixFactoryQuestion(type, difficulty) {
    const sets = [
      {
        minDifficulty: 1,
        maxDifficulty: 3,
        items: [
          { text: "happy -> not happy", answer: "un-" },
          { text: "do -> do again", answer: "re-" },
          { text: "play -> full of play", answer: "-ful" },
        ],
        choices: ["un-", "re-", "-ful", "-less"],
      },
      {
        minDifficulty: 2,
        maxDifficulty: 5,
        items: [
          { text: "read -> read wrongly", answer: "mis-" },
          { text: "heat -> heat before", answer: "pre-" },
          { text: "care -> without care", answer: "-less" },
          { text: "kind -> state of being kind", answer: "-ness" },
        ],
        choices: ["mis-", "pre-", "-less", "-ness", "un-"],
      },
      {
        minDifficulty: 4,
        maxDifficulty: 7,
        items: [
          { text: "cook -> cook too much", answer: "over-" },
          { text: "water -> below water", answer: "under-" },
          { text: "move -> act or result of moving", answer: "-ment" },
          { text: "wash -> able to be washed", answer: "-able" },
        ],
        choices: ["over-", "under-", "-ment", "-able", "-ful"],
      },
      {
        minDifficulty: 6,
        maxDifficulty: 10,
        items: [
          { text: "social -> against social behavior", answer: "anti-" },
          { text: "national -> between nations", answer: "inter-" },
          { text: "science -> person who practices science", answer: "-ist" },
          { text: "biology -> person who studies biology", answer: "-logist" },
        ],
        choices: ["anti-", "inter-", "-ist", "-logist", "sub-"],
      },
    ];
    const item = chooseByLevel(sets, difficulty);
    return createTargetsDragQuestion({
      type,
      difficulty,
      questionText: "Prefix/Suffix Factory: choose the block that builds each meaning.",
      targetArrangement: "rows",
      targets: item.items.map((entry) => ({ text: entry.text, reviewLabel: entry.text })),
      answer: item.items.map((entry) => entry.answer),
      choices: item.choices,
      dragPlaceholderText: "Block",
    });
  }

  function createSentenceSurgeryQuestion(type, difficulty) {
    const repairs = [
      { minDifficulty: 1, text: "i like apples", answer: "I like apples." },
      { minDifficulty: 1, text: "she go to school", answer: "She goes to school." },
      { minDifficulty: 2, text: "the dog are barking", answer: "The dog is barking." },
      { minDifficulty: 3, text: "maya and i was late", answer: "Maya and I were late." },
      { minDifficulty: 4, text: "before lunch we washed our hands", answer: "Before lunch, we washed our hands." },
      { minDifficulty: 5, text: "the recipe needs flour sugar and salt", answer: "The recipe needs flour, sugar, and salt." },
      { minDifficulty: 6, text: "the lights went out but we stayed calm", answer: "The lights went out, but we stayed calm." },
      { minDifficulty: 7, text: "although the test was hard maya finished it", answer: "Although the test was hard, Maya finished it." },
      { minDifficulty: 8, text: "the report was clear however it needed evidence", answer: "The report was clear; however, it needed evidence." },
      { minDifficulty: 9, text: "each student need to cite their source", answer: "Each student needs to cite his or her source." },
    ];
    const count = difficulty >= 7 ? 4 : 3;
    const availableRepairs = repairs.filter(
      (item) =>
        difficulty >= (item.minDifficulty || 1) &&
        difficulty <= (item.maxDifficulty || 10)
    );
    const pairs = takeUniqueAnswerPairs((availableRepairs.length ? availableRepairs : repairs).map((item) => ({
      text: item.text,
      answer: item.answer,
    })), count);
    return createMatchingDragQuestion({
      type,
      difficulty,
      questionText: "Sentence Surgery: match each broken sentence to its clean repair.",
      extraText: "Look for capitalization, punctuation, tense, and agreement.",
      leftItems: pairs,
      rightItems: pairs.map((pair) => pair.answer),
    });
  }

  function createWordLadderQuestion(type, difficulty) {
    const ladders = [
      { minDifficulty: 2, maxDifficulty: 4, start: "cat", end: "dog", steps: ["cot", "dot"] },
      { minDifficulty: 2, maxDifficulty: 5, start: "hit", end: "cog", steps: ["hot", "cot"] },
      { minDifficulty: 4, maxDifficulty: 7, start: "cold", end: "warm", steps: ["cord", "card", "ward"] },
      { minDifficulty: 5, maxDifficulty: 8, start: "lead", end: "gold", steps: ["load", "goad"] },
      { minDifficulty: 7, maxDifficulty: 10, start: "head", end: "tail", steps: ["heal", "teal", "tell", "tall"] },
    ];
    const item = chooseByLevel(ladders, difficulty);
    return createOrderQuestion({
      type,
      difficulty,
      questionText: "Word Ladder Builder: place the words so each step changes one letter.",
      extraText: `Start at ${item.start}. End at ${item.end}.`,
      values: item.steps,
      startLabel: item.start,
      endLabel: item.end,
    });
  }

  function createSynonymStrengthQuestion(type, difficulty) {
    const scales = [
      { minDifficulty: 3, maxDifficulty: 5, start: "Weak", end: "Strong", values: ["cool", "cold", "freezing"] },
      { minDifficulty: 3, maxDifficulty: 6, start: "Weak", end: "Strong", values: ["glad", "happy", "thrilled"] },
      { minDifficulty: 4, maxDifficulty: 7, start: "Weak", end: "Strong", values: ["small", "tiny", "microscopic"] },
      { minDifficulty: 5, maxDifficulty: 8, start: "Weak", end: "Strong", values: ["look", "notice", "examine"] },
      { minDifficulty: 6, maxDifficulty: 10, start: "Weak", end: "Strong", values: ["good", "strong", "excellent", "exceptional"] },
      { minDifficulty: 8, maxDifficulty: 10, start: "Weak", end: "Strong", values: ["suggest", "show", "prove", "confirm"] },
    ];
    const item = chooseByLevel(scales, difficulty);
    return createOrderQuestion({
      type,
      difficulty,
      questionText: "Synonym Strength Meter: place the words from weakest to strongest.",
      extraText: "Words can be close in meaning but different in intensity.",
      values: item.values,
      startLabel: item.start,
      endLabel: item.end,
    });
  }

  globalThis.createCategoryGeneratedDragQuestion = function createCategoryGeneratedDragQuestion(category, difficulty) {
    const level = clampDifficulty(difficulty);

    switch (category) {
      case "vocabulary-grammar":
        return createVocabularyGrammarDragQuestion(category, level);
      case "reading-comprehension":
        return createReadingComprehensionDragQuestion(category, level);
      case "fractions":
      case "fractions-and-ratios":
        return createFractionsDragQuestion(category, level);
      case "science":
        return createScienceDragQuestion(category, level);
      case "financial-literacy":
        return createFinancialLiteracyDragQuestion(category, level);
      case "nutrition":
        return createNutritionDragQuestion(category, level);
      case "health-and-first-aid":
        return createHealthDecisionSequenceQuestion(category, level);
      case "household-problem-solving":
        return createHouseholdProblemSolvingDragQuestion(category, level);
      case "estimation":
        return createEstimationDragQuestion(category, level);
      case "measurement":
        return createMeasurementDragQuestion(category, level);
      case "visual-measurement":
        return createVisualMeasurementDragQuestion(category, level);
      case "maps-and-directions":
        return createMapsDirectionsDragQuestion(category, level);
      case "history":
        return typeof globalThis.createHistoryGeneratedDragQuestion === "function"
          ? globalThis.createHistoryGeneratedDragQuestion(level)
          : null;
      default:
        return null;
    }
  };
})();

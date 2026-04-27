const SENTENCE_DRAG_ENGLISH_DATA = (() => {
  function clampDifficulty(value) {
    const level = Number.parseInt(value, 10);
    if (!Number.isFinite(level)) {
      return 3;
    }

    return Math.min(5, Math.max(1, level));
  }

  function shuffleArray(values) {
    const copy = [...values];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
  }

  function pick(values) {
    return values[Math.floor(Math.random() * values.length)];
  }

  function buildFilledSentence(templateParts, answer) {
    return templateParts.reduce((sentence, part, index) => {
      const token = index < answer.length ? answer[index] : "";
      return `${sentence}${part}${token}`;
    }, "");
  }

  function uniqueStrings(values) {
    return Array.from(new Set(values.map((value) => String(value))));
  }

  function makeChoices(answer, distractors) {
    const options = uniqueStrings([...answer.map(String), ...distractors.map(String)]);
    if (options.length < Math.max(4, answer.length + 1)) {
      throw new Error("Sentence drag English questions must have enough unique choices.");
    }

    answer.forEach((token) => {
      if (!options.includes(String(token))) {
        throw new Error("Sentence drag English answer must be present in the choices.");
      }
    });

    return shuffleArray(options);
  }

  function createEntry({
    question,
    templateParts,
    answer,
    distractors,
    difficulty,
    extraText,
    reviewText,
  }) {
    const normalizedParts = templateParts.map((part) => String(part));
    const normalizedAnswer = answer.map((token) => String(token));

    if (normalizedParts.length !== normalizedAnswer.length + 1) {
      throw new Error("Sentence drag English questions must have one more template part than answer tokens.");
    }

    const choices = makeChoices(normalizedAnswer, distractors.map((token) => String(token)));

    return {
      question: String(question),
      templateParts: normalizedParts,
      choices,
      answer: normalizedAnswer,
      difficulty: clampDifficulty(difficulty),
      extraText: typeof extraText === "string" ? extraText : "",
      reviewText: String(reviewText || buildFilledSentence(normalizedParts, normalizedAnswer)),
      isHebrew: false,
    };
  }

  const STATIC_BANK = [
    createEntry({
      question: "Build the sentence with the best words.",
      templateParts: ["The rabbit ", " very ", "."],
      answer: ["runs", "fast"],
      distractors: ["run", "slow"],
      difficulty: 1,
    }),
    createEntry({
      question: "Complete the sentence.",
      templateParts: ["We packed ", " lunches for school."],
      answer: ["our"],
      distractors: ["are", "their", "quiet"],
      difficulty: 1,
    }),
    createEntry({
      question: "Choose the correct word.",
      templateParts: ["The dog wagged ", " tail."],
      answer: ["its"],
      distractors: ["it's", "their", "there"],
      difficulty: 1,
    }),
    createEntry({
      question: "Complete the sentence.",
      templateParts: ["The cat slept ", " on the sofa."],
      answer: ["soundly"],
      distractors: ["quietly", "slowly", "carefully"],
      difficulty: 1,
    }),
    createEntry({
      question: "Build the sentence with the best word.",
      templateParts: ["The boy ", " the red ball."],
      answer: ["kicked"],
      distractors: ["kicks", "kicking", "carried"],
      difficulty: 1,
    }),
    createEntry({
      question: "Complete the sentence with the correct words.",
      templateParts: ["The birds ", " in the tree while the wind ", "."],
      answer: ["sang", "blew"],
      distractors: ["sat", "bloomed"],
      difficulty: 2,
    }),
    createEntry({
      question: "Complete the sentence with the best words.",
      templateParts: ["Eden put ", " books in the ", " backpack before class."],
      answer: ["her", "red"],
      distractors: ["their", "our", "blue"],
      difficulty: 2,
    }),
    createEntry({
      question: "Choose the correct word.",
      templateParts: ["The children are waiting ", " by the door."],
      answer: ["there"],
      distractors: ["their", "they're", "where"],
      difficulty: 2,
    }),
    createEntry({
      question: "Complete the sentence with the best words.",
      templateParts: ["The puppy ", " ", " because the floor is wet."],
      answer: ["walks", "slowly"],
      distractors: ["runs", "quickly"],
      difficulty: 2,
    }),
    createEntry({
      question: "Choose the word that fits best.",
      templateParts: ["The teacher read the story ", " to the class."],
      answer: ["aloud"],
      distractors: ["a lot", "quiet", "quickly"],
      difficulty: 2,
    }),
    createEntry({
      question: "Complete the sentence with the correct words.",
      templateParts: ["Their lunchboxes are over ", "."],
      answer: ["there"],
      distractors: ["their", "they're", "where"],
      difficulty: 3,
    }),
    createEntry({
      question: "Build the sentence with the best names.",
      templateParts: ["After lunch, ", " and ", " started homework."],
      answer: ["Gideon", "Gabriel"],
      distractors: ["Noga", "Eden"],
      difficulty: 3,
    }),
    createEntry({
      question: "Choose the word that fits best.",
      templateParts: ["The small boat moved ", " than the big one."],
      answer: ["slower"],
      distractors: ["faster", "quieter", "stronger"],
      difficulty: 3,
    }),
    createEntry({
      question: "Complete the sentence with the correct word.",
      templateParts: ["The turtle hid in ", " shell when it got scared."],
      answer: ["its"],
      distractors: ["it's", "their", "there"],
      difficulty: 3,
    }),
    createEntry({
      question: "Complete the sentence with the correct words.",
      templateParts: ["First we ", " the seeds, and later we ", " them."],
      answer: ["planted", "watered"],
      distractors: ["watched", "painted"],
      difficulty: 3,
    }),
    createEntry({
      question: "Complete the sentence with the best words.",
      templateParts: ["During the experiment, the class ", " the water level and ", " the result in a table."],
      answer: ["measured", "recorded"],
      distractors: ["moved", "dropped"],
      difficulty: 4,
    }),
    createEntry({
      question: "Complete the sentence with the best words.",
      templateParts: ["After Eden compared the two maps, she ", " the river on one map and ", " the bridge on the other."],
      answer: ["found", "circled"],
      distractors: ["watched", "opened"],
      difficulty: 4,
    }),
    createEntry({
      question: "Complete the sentence with the best words.",
      templateParts: ["Before the class began, the teacher ", " the papers to the class and ", " the directions on the board."],
      answer: ["gave", "wrote"],
      distractors: ["moved", "read"],
      difficulty: 4,
    }),
    createEntry({
      question: "Complete the sentence with the best words.",
      templateParts: ["If the glass is fragile, carry it ", " and set it down ", "."],
      answer: ["carefully", "gently"],
      distractors: ["loudly", "roughly"],
      difficulty: 4,
    }),
    createEntry({
      question: "Choose the word that fits best.",
      templateParts: ["The runner finished the race ", " than the other runner because she trained every day."],
      answer: ["faster"],
      distractors: ["slower", "louder", "smaller"],
      difficulty: 4,
    }),
    createEntry({
      question: "Complete the sentence with the best words.",
      templateParts: ["Although the puzzle looked difficult, Gabriel ", " each clue and ", " the answer step by step."],
      answer: ["studied", "solved"],
      distractors: ["ignored", "forgot"],
      difficulty: 5,
    }),
    createEntry({
      question: "Complete the sentence with the best words.",
      templateParts: ["Before the concert began, the musicians ", " their instruments and ", " the sheet music on each stand."],
      answer: ["tuned", "placed"],
      distractors: ["painted", "cleaned"],
      difficulty: 5,
    }),
    createEntry({
      question: "Complete the sentence with the best words.",
      templateParts: ["While Noga was reading, Gabriel ", " ", " the books and put them back on the ", "."],
      answer: ["quietly", "organized", "shelf"],
      distractors: ["loudly"],
      difficulty: 5,
    }),
    createEntry({
      question: "Complete the sentence with the best words.",
      templateParts: ["If the instructions are confusing, read them again ", " and ask for help ", "."],
      answer: ["slowly", "politely"],
      distractors: ["carelessly", "angrily"],
      difficulty: 5,
    }),
    createEntry({
      question: "Complete the sentence with the best words.",
      templateParts: ["The kite flew ", " than the tree because the wind was strong."],
      answer: ["higher"],
      distractors: ["lower", "heavier", "slower"],
      difficulty: 5,
    }),
    createEntry({
      question: "Complete the sentence with the best words.",
      templateParts: ["The children ", " the popcorn, ", " their seats, and waited for the movie to start."],
      answer: ["shared", "took"],
      distractors: ["washed", "painted"],
      difficulty: 4,
    }),
  ];

  const ACTION_SUBJECTS = ["The runner", "The puppy", "The skater", "The child", "The fox"];
  const ACTION_VERBS = ["ran", "jumped", "hurried", "glided", "moved"];
  const ACTION_ADVERBS = ["quickly", "carefully", "silently", "smoothly", "easily"];

  const POSSESSIVE_SUBJECTS = ["The students", "The family", "The children", "The players"];
  const POSSESSIVE_NOUNS = ["backpacks", "shoes", "books", "lunches"];
  const POSSESSIVE_PRONOUNS = ["their", "our", "his", "her"];

  const HOMOPHONE_ITEMS = [
    {
      sentenceParts: ["The keys are over ", " on the shelf."],
      answer: ["there"],
      distractors: ["their", "they're", "where"],
    },
    {
      sentenceParts: ["The puppy wagged ", " tail."],
      answer: ["its"],
      distractors: ["it's", "their", "there"],
    },
    {
      sentenceParts: ["We want ", " more cookies."],
      answer: ["too"],
      distractors: ["to", "two", "tall"],
    },
    {
      sentenceParts: ["I have ", " apples in my bag."],
      answer: ["two"],
      distractors: ["to", "too", "ten"],
    },
    {
      sentenceParts: ["She wants ", " go home now."],
      answer: ["to"],
      distractors: ["too", "two", "tow"],
    },
  ];

  const AGREEMENT_SUBJECTS = [
    { subject: "The fox", verb: "runs", distractors: ["run", "running", "ran"] },
    { subject: "The bird", verb: "sings", distractors: ["sing", "singing", "sang"] },
    { subject: "The puppy", verb: "plays", distractors: ["play", "playing", "played"] },
    { subject: "The rabbit", verb: "hops", distractors: ["hop", "hopping", "hopped"] },
    { subject: "The children", verb: "play", distractors: ["plays", "playing", "played"] },
    { subject: "The birds", verb: "fly", distractors: ["flies", "flying", "flew"] },
    { subject: "The dogs", verb: "run", distractors: ["runs", "running", "ran"] },
  ];

  const REFERENCE_ITEMS = [
    {
      sentenceParts: ["Eden saw Gabriel drop his pencil. ", " picked it up."],
      answer: ["She"],
      distractors: ["He", "They", "It"],
    },
    {
      sentenceParts: ["The boys were tired after practice. ", " sat on the bench."],
      answer: ["They"],
      distractors: ["She", "He", "It"],
    },
    {
      sentenceParts: ["Noga found her notebook. ", " put it in her backpack."],
      answer: ["She"],
      distractors: ["He", "They", "It"],
    },
  ];

  const SEQUENCE_WORDS = [
    {
      sentenceParts: ["We checked the map. ", " we started walking."],
      answer: ["Then"],
      distractors: ["Before", "Soon", "While"],
    },
    {
      sentenceParts: ["First we washed our hands. ", " we ate lunch."],
      answer: ["Then"],
      distractors: ["Before", "Never", "Instead"],
    },
    {
      sentenceParts: ["The dog barked, and ", " it ran to the gate."],
      answer: ["then"],
      distractors: ["because", "but", "also"],
    },
  ];

  const COMPARISON_ITEMS = [
    {
      sentenceParts: ["The red kite flew ", " than the blue one."],
      answer: ["higher"],
      distractors: ["lower", "heavier", "slower"],
    },
    {
      sentenceParts: ["The rabbit was ", " than the turtle."],
      answer: ["faster"],
      distractors: ["slower", "bigger", "louder"],
    },
    {
      sentenceParts: ["The river is ", " than the road."],
      answer: ["wider"],
      distractors: ["narrower", "shorter", "quieter"],
    },
  ];

  const REASONING_ITEMS = [
    {
      sentenceParts: ["Because the floor was wet, Gideon ", " carefully and held the rail ", "."],
      answer: ["walked", "tightly"],
      distractors: ["ran", "softly"],
    },
    {
      sentenceParts: ["If the instructions are confusing, read them again ", " and ask for help ", "."],
      answer: ["slowly", "politely"],
      distractors: ["carelessly", "angrily"],
    },
    {
      sentenceParts: ["The children ", " the popcorn, ", " their seats, and waited for the movie to start."],
      answer: ["shared", "found"],
      distractors: ["washed", "painted"],
    },
  ];

  const THREE_BLANK_ITEMS = [
    {
      sentenceParts: ["When the bell rang, the students ", " their papers, ", " their bags, and ", " the room."],
      answer: ["gathered", "packed", "left"],
      distractors: ["opened"],
    },
    {
      sentenceParts: ["Before the show began, the actors ", " on their costumes, ", " the stage, and ", " for their cues."],
      answer: ["put", "checked", "waited"],
      distractors: ["painted"],
    },
  ];

  function createVerbAdverbEntry(difficulty) {
    const subject = pick(ACTION_SUBJECTS);
    const verb = pick(ACTION_VERBS);
    const adverb = pick(ACTION_ADVERBS);
    return createEntry({
      question: "Complete the sentence with the best words.",
      templateParts: [`${subject} `, " ", " to the finish line."],
      answer: [verb, adverb],
      distractors: [pick(ACTION_VERBS.filter((item) => item !== verb)), pick(ACTION_ADVERBS.filter((item) => item !== adverb))],
      difficulty,
    });
  }

  function createPossessiveEntry(difficulty) {
    const noun = pick(POSSESSIVE_NOUNS);
    const pronoun = pick(POSSESSIVE_PRONOUNS);
    const subject = pick(POSSESSIVE_SUBJECTS);
    return createEntry({
      question: "Complete the sentence with the correct word.",
      templateParts: [`${subject} put `, " ", ` by the door.`],
      answer: [pronoun, noun],
      distractors: [pick(POSSESSIVE_PRONOUNS.filter((item) => item !== pronoun)), pick(["school", "table", "window", "bench"])],
      difficulty,
    });
  }

  function createHomophoneEntry(difficulty) {
    const item = pick(HOMOPHONE_ITEMS);
    const answer = item.answer;
    const distractors = item.distractors;
    return createEntry({
      question: "Choose the correct word.",
      templateParts: item.sentenceParts,
      answer,
      distractors,
      difficulty,
    });
  }

  function createAgreementEntry(difficulty) {
    const item = pick(AGREEMENT_SUBJECTS);
    return createEntry({
      question: "Complete the sentence with the correct verb.",
      templateParts: [item.subject, " near the window."],
      answer: [item.verb],
      distractors: item.distractors,
      difficulty,
    });
  }

  function createPronounReferenceEntry(difficulty) {
    const item = pick(REFERENCE_ITEMS);
    return createEntry({
      question: "Choose the word that makes the sentence correct.",
      templateParts: item.sentenceParts,
      answer: item.answer,
      distractors: item.distractors,
      difficulty,
    });
  }

  function createSequenceEntry(difficulty) {
    const item = pick(SEQUENCE_ITEMS());
    return createEntry({
      question: "Complete the sentence with the correct sequencing word.",
      templateParts: item.sentenceParts,
      answer: item.answer,
      distractors: item.distractors,
      difficulty,
    });
  }

  function SEQUENCE_ITEMS() {
    return SEQUENCE_WORDS;
  }

  function createComparisonEntry(difficulty) {
    const item = pick(COMPARISON_ITEMS);
    return createEntry({
      question: "Complete the sentence with the best comparison word.",
      templateParts: item.sentenceParts,
      answer: item.answer,
      distractors: item.distractors,
      difficulty,
    });
  }

  function createReasoningEntry(difficulty) {
    const item = pick(REASONING_ITEMS);
    return createEntry({
      question: "Complete the sentence with the best words.",
      templateParts: item.sentenceParts,
      answer: item.answer,
      distractors: item.distractors,
      difficulty,
    });
  }

  function createThreeBlankEntry(difficulty) {
    const item = pick(THREE_BLANK_ITEMS);
    return createEntry({
      question: "Build the sentence with the best words.",
      templateParts: item.sentenceParts,
      answer: item.answer,
      distractors: item.distractors,
      difficulty,
    });
  }

  function createGeneratedEntry(difficulty) {
    const level = clampDifficulty(difficulty);
    const generatorMap = {
      1: [createVerbAdverbEntry, createPossessiveEntry],
      2: [createHomophoneEntry, createAgreementEntry, createSequenceEntry],
      3: [createPronounReferenceEntry, createComparisonEntry, createHomophoneEntry],
      4: [createReasoningEntry, createComparisonEntry, createSequenceEntry],
      5: [createThreeBlankEntry, createReasoningEntry, createComparisonEntry],
    };

    return pick(generatorMap[level])(level);
  }

  const bank = STATIC_BANK.map((entry) => ({
    question: entry.question,
    templateParts: [...entry.templateParts],
    choices: [...entry.choices],
    answer: [...entry.answer],
    difficulty: entry.difficulty,
    extraText: entry.extraText,
    reviewText: entry.reviewText,
    isHebrew: false,
  }));

  return {
    bank,
    createGeneratedEntry,
  };
})();

globalThis.SENTENCE_DRAG_ENGLISH_DATA = SENTENCE_DRAG_ENGLISH_DATA;

function createSentenceDragEnglishGeneratedEntry(difficulty) {
  return SENTENCE_DRAG_ENGLISH_DATA.createGeneratedEntry(difficulty);
}

globalThis.createSentenceDragEnglishGeneratedEntry = createSentenceDragEnglishGeneratedEntry;

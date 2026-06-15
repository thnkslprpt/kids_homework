const VOCABULARY_GRAMMAR_DATA = (() => {
  function clampDifficulty(value) {
    const level = Number.parseInt(value, 10);
    if (!Number.isFinite(level)) {
      return 3;
    }

    return Math.min(10, Math.max(1, level));
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

  function pick(values) {
    return values[Math.floor(Math.random() * values.length)];
  }

  function eligible(items, level) {
    const difficulty = clampDifficulty(level);
    const filtered = items.filter(
      (item) =>
        difficulty >= (item.minDifficulty || item.difficulty || 1) &&
        difficulty <= (item.maxDifficulty || 10)
    );
    return filtered.length ? filtered : items;
  }

  function makeOptions(answer, distractors) {
    const normalizedAnswer = String(answer);
    const availableDistractors = uniqueStrings(distractors || [])
      .filter((choice) => choice && choice !== normalizedAnswer);
    const pickedDistractors = shuffleArray(availableDistractors).slice(0, 3);
    const options = uniqueStrings([normalizedAnswer, ...pickedDistractors]);

    if (options.length !== 4 || !options.includes(normalizedAnswer)) {
      throw new Error("Vocabulary and grammar questions must have exactly 4 unique choices.");
    }

    return shuffleArray(options);
  }

  function buildQuestion({ question, displayText = "", options, answer, difficulty, extraText = "" }) {
    const normalizedQuestion = String(question || "").trim();
    const normalizedAnswer = String(answer || "");
    const normalizedOptions = uniqueStrings(options || []);

    if (!normalizedQuestion) {
      throw new Error("Vocabulary and grammar questions must have question text.");
    }

    if (normalizedOptions.length !== 4) {
      throw new Error("Vocabulary and grammar questions must have exactly 4 options.");
    }

    if (!normalizedOptions.includes(normalizedAnswer)) {
      throw new Error("Vocabulary and grammar answer must be included in the options.");
    }

    return {
      question: normalizedQuestion,
      displayText: String(displayText || ""),
      options: shuffleArray(normalizedOptions),
      answer: normalizedAnswer,
      difficulty: clampDifficulty(difficulty),
      extraText: String(extraText || ""),
    };
  }

  const PREFIXES = [
    { prefix: "un-", meaning: "not", distractors: ["again", "before", "between", "wrongly"], examples: ["unsafe", "unhappy", "unclear"], minDifficulty: 1 },
    { prefix: "re-", meaning: "again", distractors: ["not", "before", "under", "half"], examples: ["redo", "rewrite", "reread"], minDifficulty: 1 },
    { prefix: "pre-", meaning: "before", distractors: ["after", "not", "together", "wrongly"], examples: ["preview", "preheat", "pretest"], minDifficulty: 2 },
    { prefix: "mis-", meaning: "wrongly", distractors: ["not", "again", "before", "between"], examples: ["misread", "misplace", "mishear"], minDifficulty: 2 },
    { prefix: "dis-", meaning: "not or opposite of", distractors: ["again", "before", "under", "too much"], examples: ["disagree", "dishonest", "disconnect"], minDifficulty: 3 },
    { prefix: "non-", meaning: "not", distractors: ["after", "many", "between", "one"], examples: ["nonfiction", "nonstop", "nonverbal"], minDifficulty: 3 },
    { prefix: "over-", meaning: "too much or above", distractors: ["below", "not", "before", "half"], examples: ["overcook", "overhead", "overpay"], minDifficulty: 4 },
    { prefix: "under-", meaning: "too little or below", distractors: ["above", "again", "against", "between"], examples: ["underwater", "undercooked", "underpay"], minDifficulty: 4 },
    { prefix: "sub-", meaning: "under", distractors: ["above", "not", "again", "half"], examples: ["submarine", "subway", "subheading"], minDifficulty: 5 },
    { prefix: "inter-", meaning: "between or among", distractors: ["not", "against", "before", "one"], examples: ["international", "interstate", "interact"], minDifficulty: 5 },
    { prefix: "trans-", meaning: "across or through", distractors: ["under", "not", "before", "wrongly"], examples: ["transport", "transatlantic", "transfer"], minDifficulty: 6 },
    { prefix: "anti-", meaning: "against", distractors: ["together", "before", "small", "again"], examples: ["antifreeze", "antibiotic", "antisocial"], minDifficulty: 6 },
    { prefix: "co-", meaning: "together", distractors: ["against", "not", "under", "before"], examples: ["cooperate", "coauthor", "coworker"], minDifficulty: 7 },
    { prefix: "fore-", meaning: "before or in front", distractors: ["after", "below", "between", "against"], examples: ["forecast", "forearm", "foretell"], minDifficulty: 7 },
    { prefix: "semi-", meaning: "half or partly", distractors: ["twice", "against", "between", "not"], examples: ["semicircle", "semifinal", "semisweet"], minDifficulty: 8 },
    { prefix: "mono-", meaning: "one", distractors: ["many", "half", "after", "between"], examples: ["monorail", "monotone", "monologue"], minDifficulty: 8 },
    { prefix: "multi-", meaning: "many", distractors: ["one", "half", "before", "wrongly"], examples: ["multicolor", "multiplayer", "multitask"], minDifficulty: 9 },
    { prefix: "counter-", meaning: "against or opposite", distractors: ["together", "before", "below", "many"], examples: ["counterattack", "counterclockwise", "counterargument"], minDifficulty: 9 },
  ];

  const SUFFIXES = [
    { suffix: "-ful", meaning: "full of", distractors: ["without", "one who", "able to", "not"], examples: ["careful", "hopeful", "playful"], minDifficulty: 1 },
    { suffix: "-less", meaning: "without", distractors: ["full of", "again", "able to", "one who"], examples: ["hopeless", "fearless", "cloudless"], minDifficulty: 2 },
    { suffix: "-er", meaning: "one who does something", distractors: ["without", "full of", "before", "able to"], examples: ["teacher", "runner", "builder"], minDifficulty: 2 },
    { suffix: "-able", meaning: "able to be", distractors: ["without", "wrongly", "one who", "before"], examples: ["washable", "breakable", "readable"], minDifficulty: 3 },
    { suffix: "-ness", meaning: "state or quality", distractors: ["able to be", "one who", "again", "half"], examples: ["kindness", "darkness", "fairness"], minDifficulty: 3 },
    { suffix: "-ment", meaning: "result or act of", distractors: ["without", "one who", "not", "between"], examples: ["payment", "movement", "agreement"], minDifficulty: 4 },
    { suffix: "-tion", meaning: "the act or result of", distractors: ["one who", "full of", "wrongly", "under"], examples: ["creation", "collection", "invention"], minDifficulty: 5 },
    { suffix: "-ly", meaning: "in a certain way", distractors: ["a place", "one who", "without", "again"], examples: ["quickly", "carefully", "softly"], minDifficulty: 5 },
    { suffix: "-ous", meaning: "full of or having", distractors: ["without", "before", "one who", "across"], examples: ["dangerous", "famous", "mysterious"], minDifficulty: 6 },
    { suffix: "-ology", meaning: "study of", distractors: ["fear of", "one who", "full of", "between"], examples: ["biology", "geology", "zoology"], minDifficulty: 6 },
    { suffix: "-ist", meaning: "person who practices or believes", distractors: ["without", "study of", "able to be", "before"], examples: ["artist", "scientist", "pianist"], minDifficulty: 7 },
    { suffix: "-ive", meaning: "having a tendency to", distractors: ["without", "one", "again", "under"], examples: ["creative", "active", "protective"], minDifficulty: 7 },
    { suffix: "-ity", meaning: "state or condition", distractors: ["one who", "full of", "wrongly", "across"], examples: ["activity", "curiosity", "equality"], minDifficulty: 8 },
    { suffix: "-phobia", meaning: "fear of", distractors: ["love of", "study of", "person who", "state of"], examples: ["arachnophobia", "claustrophobia", "hydrophobia"], minDifficulty: 8 },
  ];

  const ROOTS = [
    { root: "bio", meaning: "life", distractors: ["heat", "far", "write or draw", "water"], examples: ["biology", "biography", "biodegradable"], minDifficulty: 2 },
    { root: "tele", meaning: "far", distractors: ["life", "heat", "write or draw", "water"], examples: ["telephone", "television", "telescope"], minDifficulty: 2 },
    { root: "therm", meaning: "heat", distractors: ["life", "far", "water", "sound"], examples: ["thermometer", "thermal", "thermostat"], minDifficulty: 3 },
    { root: "graph", meaning: "write or draw", distractors: ["life", "far", "heat", "small"], examples: ["autograph", "graphic", "photograph"], minDifficulty: 3 },
    { root: "aqua", meaning: "water", distractors: ["sound", "earth", "time", "light"], examples: ["aquarium", "aquatic", "aqueduct"], minDifficulty: 4 },
    { root: "phon", meaning: "sound", distractors: ["water", "life", "light", "small"], examples: ["microphone", "phonics", "symphony"], minDifficulty: 4 },
    { root: "geo", meaning: "earth", distractors: ["life", "sound", "light", "time"], examples: ["geography", "geology", "geometry"], minDifficulty: 5 },
    { root: "photo", meaning: "light", distractors: ["water", "earth", "sound", "time"], examples: ["photograph", "photosynthesis", "photocopy"], minDifficulty: 5 },
    { root: "chron", meaning: "time", distractors: ["light", "water", "write", "small"], examples: ["chronological", "synchronize", "chronicle"], minDifficulty: 6 },
    { root: "scrib/script", meaning: "write", distractors: ["carry", "see", "speak", "measure"], examples: ["describe", "script", "prescription"], minDifficulty: 6 },
    { root: "port", meaning: "carry", distractors: ["write", "see", "bend", "speak"], examples: ["transport", "export", "portable"], minDifficulty: 7 },
    { root: "spect", meaning: "look or see", distractors: ["carry", "write", "bend", "water"], examples: ["inspect", "spectator", "respect"], minDifficulty: 7 },
    { root: "dict", meaning: "speak or say", distractors: ["measure", "carry", "see", "earth"], examples: ["predict", "dictionary", "dictate"], minDifficulty: 8 },
    { root: "meter/metr", meaning: "measure", distractors: ["fear", "write", "many", "carry"], examples: ["thermometer", "geometry", "diameter"], minDifficulty: 8 },
    { root: "micro", meaning: "small", distractors: ["large", "time", "water", "sound"], examples: ["microscope", "microchip", "microbe"], minDifficulty: 9 },
    { root: "macro", meaning: "large", distractors: ["small", "water", "before", "sound"], examples: ["macrocosm", "macroeconomics", "macro lens"], minDifficulty: 9 },
    { root: "cred", meaning: "believe", distractors: ["carry", "measure", "bend", "write"], examples: ["credible", "credit", "incredible"], minDifficulty: 10 },
    { root: "flex/flect", meaning: "bend", distractors: ["believe", "speak", "measure", "light"], examples: ["flexible", "reflect", "deflect"], minDifficulty: 10 },
  ];

  const SYNONYMS = [
    { word: "quick", answer: "fast", distractors: ["slow", "tiny", "quiet", "heavy"], minDifficulty: 1 },
    { word: "happy", answer: "glad", distractors: ["angry", "tired", "empty", "tiny"], minDifficulty: 1 },
    { word: "begin", answer: "start", distractors: ["finish", "hide", "drop", "break"], minDifficulty: 1 },
    { word: "tiny", answer: "small", distractors: ["wide", "loud", "tall", "rough"], minDifficulty: 1 },
    { word: "brave", answer: "courageous", distractors: ["careless", "sleepy", "shallow", "ordinary"], minDifficulty: 2 },
    { word: "silent", answer: "quiet", distractors: ["bright", "rough", "noisy", "heavy"], minDifficulty: 2 },
    { word: "difficult", answer: "hard", distractors: ["simple", "soft", "early", "empty"], minDifficulty: 2 },
    { word: "repair", answer: "fix", distractors: ["damage", "hide", "follow", "forget"], minDifficulty: 3 },
    { word: "select", answer: "choose", distractors: ["remove", "drop", "rush", "whisper"], minDifficulty: 4 },
    { word: "observe", answer: "watch carefully", distractors: ["ignore", "argue loudly", "guess quickly", "cover up"], minDifficulty: 5 },
    { word: "fortunate", answer: "lucky", distractors: ["ordinary", "careless", "unfair", "hungry"], minDifficulty: 5 },
    { word: "assist", answer: "help", distractors: ["delay", "damage", "hide", "trade"], minDifficulty: 6 },
    { word: "scarce", answer: "rare", distractors: ["plentiful", "bright", "careful", "shallow"], minDifficulty: 7 },
    { word: "reluctant", answer: "not willing", distractors: ["very eager", "easy to see", "full of light", "made of wood"], minDifficulty: 8 },
    { word: "approximate", answer: "estimate", distractors: ["erase", "decorate", "argue", "divide"], minDifficulty: 9 },
    { word: "significant", answer: "important", distractors: ["tiny", "silent", "ordinary", "distant"], minDifficulty: 9 },
    { word: "interpret", answer: "explain the meaning of", distractors: ["copy exactly", "make louder", "throw away", "measure with a ruler"], minDifficulty: 10 },
  ];

  const ANTONYMS = [
    { word: "hot", answer: "cold", distractors: ["warm", "bright", "fast", "small"], minDifficulty: 1 },
    { word: "open", answer: "closed", distractors: ["round", "tiny", "smooth", "quiet"], minDifficulty: 1 },
    { word: "early", answer: "late", distractors: ["soon", "quick", "first", "near"], minDifficulty: 2 },
    { word: "ancient", answer: "modern", distractors: ["old", "dusty", "quiet", "hidden"], minDifficulty: 4 },
    { word: "increase", answer: "decrease", distractors: ["grow", "add", "collect", "repeat"], minDifficulty: 5 },
    { word: "temporary", answer: "permanent", distractors: ["brief", "careful", "private", "simple"], minDifficulty: 7 },
    { word: "expand", answer: "shrink", distractors: ["grow", "stretch", "include", "continue"], minDifficulty: 8 },
    { word: "generous", answer: "selfish", distractors: ["kind", "helpful", "patient", "careful"], minDifficulty: 8 },
    { word: "vague", answer: "clear", distractors: ["uncertain", "fuzzy", "ordinary", "distant"], minDifficulty: 9 },
    { word: "optimistic", answer: "pessimistic", distractors: ["hopeful", "careful", "active", "curious"], minDifficulty: 10 },
  ];

  const HOMOPHONES = [
    { sentence: "The dog wagged ___ tail.", answer: "its", distractors: ["it's", "their", "there", "his"], minDifficulty: 2 },
    { sentence: "We went ___ the park after school.", answer: "to", distractors: ["too", "two", "do", "through"], minDifficulty: 2 },
    { sentence: "The children put ___ backpacks by the door.", answer: "their", distractors: ["there", "they're", "them", "then"], minDifficulty: 3 },
    { sentence: "___ going to rain later, so take an umbrella.", answer: "It's", distractors: ["Its", "There", "Their", "Then"], minDifficulty: 3 },
    { sentence: "I can hear the music, but it is not ___ loud.", answer: "too", distractors: ["to", "two", "through", "though"], minDifficulty: 4 },
    { sentence: "___ welcome to join our game.", answer: "You're", distractors: ["Your", "Yore", "You", "There"], minDifficulty: 4 },
    { sentence: "First we cleaned our desks, and ___ we lined up.", answer: "then", distractors: ["than", "there", "their", "thin"], minDifficulty: 5 },
    { sentence: "The principal explained the school safety rule.", answer: "principal", distractors: ["principle", "principled", "princess", "practice"], minDifficulty: 6 },
    { sentence: "The hot weather can ___ how much water plants need.", answer: "affect", distractors: ["effect", "effort", "except", "accept"], minDifficulty: 8 },
    { sentence: "The ___ of the storm was a flooded playground.", answer: "effect", distractors: ["affect", "except", "accept", "effort"], minDifficulty: 8 },
    { sentence: "Everyone was invited ___ Maya, who was sick at home.", answer: "except", distractors: ["accept", "effect", "affect", "expect"], minDifficulty: 9 },
    { sentence: "Please ___ the gift with a thank-you smile.", answer: "accept", distractors: ["except", "effect", "affect", "expect"], minDifficulty: 9 },
  ];

  const CLOZES = [
    { sentence: "The puppy was ___, so it stayed close to Maya.", answer: "shy", distractors: ["loud", "hungry", "tall", "windy"], minDifficulty: 1 },
    { sentence: "The librarian asked us to whisper because the room needed to stay ___.", answer: "quiet", distractors: ["bright", "crowded", "messy", "round"], minDifficulty: 1 },
    { sentence: "The glass was fragile, so we carried it ___.", answer: "carefully", distractors: ["roughly", "hungrily", "loudly", "sleepily"], minDifficulty: 2 },
    { sentence: "The path was muddy after the rain, so our shoes became ___.", answer: "dirty", distractors: ["dry", "invisible", "silent", "empty"], minDifficulty: 2 },
    { sentence: "Because the instructions were confusing, Dad asked the teacher to ___ them.", answer: "clarify", distractors: ["hide", "decorate", "ignore", "carry"], minDifficulty: 5 },
    { sentence: "The team had practiced for weeks; ___, they felt ready for the match.", answer: "therefore", distractors: ["however", "instead", "meanwhile", "although"], minDifficulty: 6 },
    { sentence: "The old bridge was sturdy, meaning it was ___.", answer: "strong and well built", distractors: ["easy to break", "painted blue", "very noisy", "made yesterday"], minDifficulty: 6 },
    { sentence: "The scientist repeated the test to get ___ results.", answer: "reliable", distractors: ["random", "colorful", "secret", "careless"], minDifficulty: 7 },
    { sentence: "The directions were ambiguous, so different students understood them in different ways.", answer: "unclear", distractors: ["obvious", "silent", "ancient", "tiny"], minDifficulty: 8 },
    { sentence: "Noga gave a concise answer: it was short but complete.", answer: "brief", distractors: ["confusing", "careless", "angry", "musical"], minDifficulty: 9 },
    { sentence: "The evidence was sufficient because it was enough to support the claim.", answer: "enough", distractors: ["missing", "colorful", "incorrect", "ordinary"], minDifficulty: 10 },
  ];

  const CONTEXT_CLUES = [
    { word: "glimpse", sentence: "Gabriel caught a glimpse of the fox before it ran behind the tree.", answer: "a quick look", distractors: ["a loud sound", "a deep hole", "a heavy box", "a long trip"], minDifficulty: 3 },
    { word: "drowsy", sentence: "After staying up late, Gideon felt drowsy during breakfast.", answer: "sleepy", distractors: ["angry", "hungry", "excited", "lost"], minDifficulty: 3 },
    { word: "retrieve", sentence: "The ball rolled under the sofa, so Noga crawled down to retrieve it.", answer: "get it back", distractors: ["paint it", "forget it", "break it", "hide it"], minDifficulty: 4 },
    { word: "generous", sentence: "Miranda was generous with the cookies and shared them with everyone.", answer: "willing to give", distractors: ["easy to scare", "hard to hear", "quick to sleep", "full of dust"], minDifficulty: 5 },
    { word: "contrast", sentence: "The essay asks you to contrast cats and dogs by explaining how they are different.", answer: "show differences", distractors: ["make a drawing", "repeat exactly", "hide details", "count quickly"], minDifficulty: 6 },
    { word: "evidence", sentence: "The footprints were evidence that someone had walked through the mud.", answer: "proof or clues", distractors: ["a funny joke", "a kind of food", "a loud sound", "a color"], minDifficulty: 6 },
    { word: "analyze", sentence: "To analyze the poem, the class looked closely at each line and discussed what it meant.", answer: "study carefully", distractors: ["copy quickly", "throw away", "make louder", "decorate"], minDifficulty: 7 },
    { word: "imply", sentence: "The dark clouds imply that rain may come soon, even though no one says it directly.", answer: "suggest without saying directly", distractors: ["prove with a ruler", "draw in color", "repeat word for word", "make disappear"], minDifficulty: 8 },
    { word: "perspective", sentence: "From the ant's perspective, a small leaf looked like a giant umbrella.", answer: "point of view", distractors: ["kind of weather", "short message", "secret code", "piece of food"], minDifficulty: 9 },
    { word: "infer", sentence: "If the floor is wet and umbrellas are by the door, you can infer that it rained.", answer: "figure out using clues", distractors: ["ask for a vote", "paint a picture", "make a mistake", "copy a sentence"], minDifficulty: 10 },
  ];

  const SENTENCE_EDITING = [
    {
      sentence: "my brother go to soccer practice on tuesdays",
      answer: "My brother goes to soccer practice on Tuesdays.",
      distractors: [
        "My brother go to soccer practice on Tuesdays.",
        "My brother goes to soccer practice in Tuesdays.",
        "my brother goes to soccer practice on Tuesdays.",
        "My brother goes soccer practice on Tuesdays.",
      ],
      minDifficulty: 2,
    },
    {
      sentence: "the cat slept on the sofa and it was warm",
      answer: "The cat slept on the sofa, and it was warm.",
      distractors: [
        "The cat slept on the sofa and it were warm.",
        "The cat sleep on the sofa, and it was warm.",
        "The cat slept on the sofa, and they was warm.",
        "the cat slept on the sofa, and it was warm.",
      ],
      minDifficulty: 3,
    },
    {
      sentence: "noga and gideon was reading in the quiet library",
      answer: "Noga and Gideon were reading in the quiet library.",
      distractors: [
        "Noga and Gideon was reading in the quiet library.",
        "Noga and Gideon were read in the quiet library.",
        "Noga and Gideon were reading in the quiet Library.",
        "noga and Gideon were reading in the quiet library.",
      ],
      minDifficulty: 4,
    },
    {
      sentence: "although it was raining we walked to the bus stop",
      answer: "Although it was raining, we walked to the bus stop.",
      distractors: [
        "Although it was raining we walked, to the bus stop.",
        "Although, it was raining we walked to the bus stop.",
        "although it was raining, we walked to the bus stop.",
        "Although it was raining we walk to the bus stop.",
      ],
      minDifficulty: 6,
    },
    {
      sentence: "the experiment was difficult but the class completed it carefully",
      answer: "The experiment was difficult, but the class completed it carefully.",
      distractors: [
        "The experiment was difficult but, the class completed it carefully.",
        "The experiment was difficult, but the class complete it carefully.",
        "The experiment was difficult but the class completed, it carefully.",
        "the experiment was difficult, but the class completed it carefully.",
      ],
      minDifficulty: 7,
    },
    {
      sentence: "after reading the chapter the class discussed the authors purpose",
      answer: "After reading the chapter, the class discussed the author's purpose.",
      distractors: [
        "After reading the chapter the class, discussed the author's purpose.",
        "After reading the chapter, the class discussed the authors purpose.",
        "After reading the chapter, the class discuss the author's purpose.",
        "after reading the chapter, the class discussed the author's purpose.",
      ],
      minDifficulty: 8,
    },
    {
      sentence: "the teacher asked who brought their notebook",
      answer: "The teacher asked who brought his or her notebook.",
      distractors: [
        "The teacher asked who brought their notebook.",
        "The teacher asked who bring his or her notebook.",
        "The teacher asked who brought they're notebook.",
        "the teacher asked who brought his or her notebook.",
      ],
      minDifficulty: 10,
    },
  ];

  const PARTS_OF_SPEECH = [
    { sentence: "The bright kite flew above the park.", target: "bright", answer: "adjective", distractors: ["noun", "verb", "adverb", "pronoun"], minDifficulty: 1 },
    { sentence: "The rabbit hopped quickly across the grass.", target: "hopped", answer: "verb", distractors: ["noun", "adjective", "preposition", "pronoun"], minDifficulty: 1 },
    { sentence: "Maya placed the book under the table.", target: "under", answer: "preposition", distractors: ["verb", "noun", "adjective", "interjection"], minDifficulty: 3 },
    { sentence: "The children sang softly during the show.", target: "softly", answer: "adverb", distractors: ["noun", "verb", "pronoun", "article"], minDifficulty: 3 },
    { sentence: "They carried the heavy box together.", target: "They", answer: "pronoun", distractors: ["adverb", "verb", "preposition", "conjunction"], minDifficulty: 4 },
    { sentence: "Noga wanted tea, but Gideon wanted juice.", target: "but", answer: "conjunction", distractors: ["noun", "adjective", "adverb", "pronoun"], minDifficulty: 5 },
    { sentence: "Wow, the rainbow is huge!", target: "Wow", answer: "interjection", distractors: ["preposition", "verb", "article", "adjective"], minDifficulty: 6 },
    { sentence: "The curious scientist observed the plants carefully.", target: "observed", answer: "verb", distractors: ["adjective", "noun", "pronoun", "preposition"], minDifficulty: 7 },
  ];

  const PUNCTUATION = [
    {
      prompt: "Which sentence uses punctuation correctly?",
      answer: "I packed apples, crackers, and water.",
      distractors: ["I packed apples crackers, and water.", "I packed apples, crackers and, water.", "I packed, apples crackers and water.", "I packed apples crackers and water,"],
      minDifficulty: 3,
    },
    {
      prompt: "Which sentence uses quotation marks correctly?",
      answer: "\"Please close the door,\" said Dad.",
      distractors: ["Please close the door, said Dad.", "\"Please close the door, said Dad.\"", "Please \"close the door,\" said Dad.", "\"Please close the door said Dad,\""],
      minDifficulty: 5,
    },
    {
      prompt: "Which sentence correctly uses a comma after an introductory phrase?",
      answer: "After dinner, we played a board game.",
      distractors: ["After, dinner we played a board game.", "After dinner we, played a board game.", "After dinner we played, a board game.", "after dinner, we played a board game."],
      minDifficulty: 6,
    },
    {
      prompt: "Which sentence correctly joins two complete ideas?",
      answer: "The rain stopped, so we went outside.",
      distractors: ["The rain stopped so, we went outside.", "The rain stopped, we went outside.", "The rain stopped so we, went outside.", "The rain stopped, so went outside."],
      minDifficulty: 7,
    },
    {
      prompt: "Which sentence uses a semicolon correctly?",
      answer: "The trail was steep; the hikers moved slowly.",
      distractors: ["The trail was steep; and the hikers moved slowly.", "The trail; was steep the hikers moved slowly.", "The trail was; steep, the hikers moved slowly.", "The trail was steep the hikers; moved slowly."],
      minDifficulty: 9,
    },
    {
      prompt: "Which sentence uses the apostrophe correctly?",
      answer: "The students' projects filled the hallway.",
      distractors: ["The student's projects filled the hallway.", "The students projects' filled the hallway.", "The studentss' projects filled the hallway.", "The students project filled the hallway."],
      minDifficulty: 10,
    },
  ];

  const FIGURATIVE_LANGUAGE = [
    { phrase: "The classroom was a zoo after recess.", answer: "The classroom was noisy and wild.", distractors: ["Animals were living in the room.", "The class visited a zoo.", "The room was completely silent.", "The room had no students."], minDifficulty: 5 },
    { phrase: "Gideon was as busy as a bee.", answer: "Gideon was working hard.", distractors: ["Gideon turned into a bee.", "Gideon was sleeping.", "Gideon was afraid of bees.", "Gideon was moving slowly."], minDifficulty: 5 },
    { phrase: "Noga had butterflies in her stomach before the show.", answer: "Noga felt nervous.", distractors: ["Noga ate insects.", "Noga was very hungry.", "Noga was angry.", "Noga wanted to fly."], minDifficulty: 6 },
    { phrase: "The homework was a piece of cake.", answer: "The homework was easy.", distractors: ["The homework was about baking.", "The homework was sticky.", "The homework was impossible.", "The homework was late."], minDifficulty: 6 },
    { phrase: "The wind whispered through the trees.", answer: "The sentence gives the wind a human action.", distractors: ["The wind was a person.", "The trees were silent forever.", "The sentence is only a fact about temperature.", "The wind wrote a letter."], minDifficulty: 7 },
    { phrase: "The final clue was the key to solving the mystery.", answer: "The clue helped solve the problem.", distractors: ["The clue was made of metal.", "The mystery was a locked door only.", "The clue was missing.", "The key was broken."], minDifficulty: 8 },
    { phrase: "Her explanation shed light on the problem.", answer: "Her explanation made the problem easier to understand.", distractors: ["Her explanation used a flashlight.", "The problem became heavier.", "The lights turned off.", "She painted the problem yellow."], minDifficulty: 9 },
    { phrase: "The tiny seed held a world of possibilities.", answer: "The seed could grow into many future things.", distractors: ["A planet was inside the seed.", "The seed was already a tree.", "The seed was empty.", "The seed was too old to grow."], minDifficulty: 10 },
  ];

  const TRANSITIONS = [
    { sentence: "I finished my homework. ___, I packed my school bag.", answer: "Next", distractors: ["However", "Because", "Although", "Instead"], minDifficulty: 3 },
    { sentence: "The recipe needed milk. ___, we used water because we had no milk.", answer: "Instead", distractors: ["First", "For example", "Therefore", "Meanwhile"], minDifficulty: 4 },
    { sentence: "The team practiced every day. ___, their passing improved.", answer: "As a result", distractors: ["In contrast", "For example", "Before that", "On the other hand"], minDifficulty: 6 },
    { sentence: "Cats often sleep during the day. ___, dogs often want to play when people are awake.", answer: "In contrast", distractors: ["As a result", "For example", "Meanwhile", "Therefore"], minDifficulty: 7 },
    { sentence: "The claim sounded interesting. ___, it needed stronger evidence.", answer: "However", distractors: ["Therefore", "For instance", "Likewise", "Finally"], minDifficulty: 8 },
    { sentence: "The paragraph gives several examples. ___, it explains how each example supports the main idea.", answer: "Additionally", distractors: ["Nevertheless", "In contrast", "Instead", "Before"], minDifficulty: 9 },
  ];

  const SENTENCE_COMBINING = [
    {
      prompt: "Which sentence best combines the two ideas?",
      displayText: "The soup was hot. I waited before eating it.",
      answer: "Because the soup was hot, I waited before eating it.",
      distractors: [
        "The soup was hot because I waited before eating it.",
        "The soup was hot, I waited before eating it.",
        "The soup was hot I waited, before eating it.",
        "Because I waited, the soup was hot before eating it.",
      ],
      minDifficulty: 4,
    },
    {
      prompt: "Which sentence best combines the two ideas?",
      displayText: "Maya studied the map. She found the shortest route.",
      answer: "After studying the map, Maya found the shortest route.",
      distractors: [
        "After Maya found the shortest route, she studied the map.",
        "Maya studied the map she found the shortest route.",
        "Maya studying the map, found the shortest route.",
        "Maya found the shortest route after, studying the map.",
      ],
      minDifficulty: 6,
    },
    {
      prompt: "Which sentence best combines the two ideas without changing their meaning?",
      displayText: "The battery was low. The flashlight still worked.",
      answer: "Although the battery was low, the flashlight still worked.",
      distractors: [
        "Because the battery was low, the flashlight still worked.",
        "The flashlight still worked, although the battery.",
        "Although the flashlight was low, the battery still worked.",
        "The battery was low the flashlight still worked.",
      ],
      minDifficulty: 8,
    },
    {
      prompt: "Which revision is most concise and clear?",
      displayText: "The dog that was brown in color ran in a fast way across the yard.",
      answer: "The brown dog ran quickly across the yard.",
      distractors: [
        "The dog that was brown ran in a way fast across the yard.",
        "The brown in color dog ran across quickly the yard.",
        "The dog ran across the yard brown quickly.",
        "The dog, which was brown in color, ran in a fast way across the yard.",
      ],
      minDifficulty: 9,
    },
  ];

  const PRONOUN_REFERENCES = [
    { sentence: "Maya gave Noga the pencil because she forgot hers.", question: "The sentence is confusing because 'she' could refer to:", answer: "Maya or Noga", distractors: ["the pencil only", "the teacher only", "the classroom only", "no one"], minDifficulty: 6 },
    { sentence: "When the trophy fell on the shelf, it cracked.", question: "What does 'it' most likely refer to?", answer: "the trophy", distractors: ["the shelf", "the floor", "the wall", "the room"], minDifficulty: 6 },
    { sentence: "Ari told Ben that he should bring a jacket.", question: "Why is this sentence unclear?", answer: "He could mean Ari or Ben.", distractors: ["It has no verb.", "It is missing a capital letter.", "It has no pronoun.", "It is written as a question."], minDifficulty: 7 },
    { sentence: "The scientists labeled the samples before they stored them.", question: "What does 'them' refer to?", answer: "the samples", distractors: ["the labels", "the scientists", "the shelves", "the notebooks"], minDifficulty: 8 },
    { sentence: "When Dana put the book on the table, it wobbled.", question: "Which revision makes the meaning clearer?", answer: "When Dana put the book on the table, the table wobbled.", distractors: ["When Dana put it on the table, it wobbled.", "The book on the table when Dana wobbled.", "When it put the book on Dana, the table wobbled.", "Dana put the book on the table and it."], minDifficulty: 10 },
  ];

  const CLAUSES = [
    { sentence: "Because the rain stopped", question: "What is this group of words?", answer: "a dependent clause", distractors: ["a complete sentence", "a compound word", "a proper noun", "an exclamation"], minDifficulty: 7 },
    { sentence: "The rain stopped before lunch.", question: "What is this group of words?", answer: "an independent clause", distractors: ["a dependent clause", "a fragment", "a prefix", "a title"], minDifficulty: 7 },
    { sentence: "Although the puzzle was hard, Gideon solved it.", question: "Which part is the dependent clause?", answer: "Although the puzzle was hard", distractors: ["Gideon solved it", "the puzzle", "was hard, Gideon", "solved it"], minDifficulty: 8 },
    { sentence: "Noga watered the plants, and Gabriel swept the path.", question: "Why is this a compound sentence?", answer: "It joins two complete ideas.", distractors: ["It has no verbs.", "It is missing punctuation.", "It uses only one word.", "It asks a question."], minDifficulty: 9 },
    { sentence: "While the cookies cooled, we cleaned the kitchen and set the table.", question: "Which part explains when the action happened?", answer: "While the cookies cooled", distractors: ["we cleaned", "the kitchen", "set the table", "and"], minDifficulty: 10 },
  ];

  const WORD_CHOICE = [
    { prompt: "Which word best shows that the character moved quietly?", sentence: "The child ___ past the sleeping cat.", answer: "tiptoed", distractors: ["stomped", "crashed", "shouted", "bounced"], minDifficulty: 4 },
    { prompt: "Which word has the most positive connotation?", sentence: "The room was ___.", answer: "cozy", distractors: ["cramped", "stuffy", "messy", "dusty"], minDifficulty: 6 },
    { prompt: "Which word best fits an academic explanation?", sentence: "The results ___ the claim.", answer: "support", distractors: ["like", "sort of show", "mess with", "yell"], minDifficulty: 7 },
    { prompt: "Which word best shows a careful, exact look?", sentence: "The scientist ___ the sample under the microscope.", answer: "examined", distractors: ["glanced at", "ignored", "misplaced", "guessed about"], minDifficulty: 8 },
    { prompt: "Which revision uses the most precise word?", sentence: "The bird went across the sky.", answer: "The bird soared across the sky.", distractors: ["The bird did across the sky.", "The bird was across the sky.", "The bird had across the sky.", "The bird made across the sky."], minDifficulty: 9 },
    { prompt: "Which phrase is the most concise?", sentence: "Choose the clearest wording.", answer: "because", distractors: ["due to the fact that", "for the reason that", "on account of the fact that", "in light of the fact that"], minDifficulty: 10 },
  ];

  const GENERATOR_TYPES = {
    1: ["prefix", "synonym", "antonym", "cloze", "partsOfSpeech"],
    2: ["prefix", "suffix", "synonym", "antonym", "cloze", "homophone", "editing"],
    3: ["suffix", "root", "homophone", "context", "cloze", "partsOfSpeech", "punctuation"],
    4: ["root", "homophone", "context", "editing", "sentenceCombining", "wordChoice", "punctuation"],
    5: ["root", "suffix", "context", "figurative", "homophone", "editing", "partsOfSpeech"],
    6: ["prefix", "suffix", "root", "context", "figurative", "transition", "pronounReference", "sentenceCombining"],
    7: ["prefix", "root", "context", "figurative", "transition", "pronounReference", "clause", "wordChoice"],
    8: ["prefix", "suffix", "root", "homophone", "context", "clause", "pronounReference", "sentenceCombining"],
    9: ["prefix", "root", "homophone", "context", "transition", "punctuation", "wordChoice", "sentenceCombining"],
    10: ["root", "antonym", "context", "clause", "pronounReference", "punctuation", "wordChoice", "editing"],
  };

  function createPrefixQuestion(level) {
    const item = pick(eligible(PREFIXES, level));
    return buildQuestion({
      question: `What does the prefix ${item.prefix} mean in a word like ${pick(item.examples)}?`,
      options: makeOptions(item.meaning, item.distractors),
      answer: item.meaning,
      difficulty: level,
    });
  }

  function createSuffixQuestion(level) {
    const item = pick(eligible(SUFFIXES, level));
    return buildQuestion({
      question: `What does the suffix ${item.suffix} mean in a word like ${pick(item.examples)}?`,
      options: makeOptions(item.meaning, item.distractors),
      answer: item.meaning,
      difficulty: level,
    });
  }

  function createRootQuestion(level) {
    const item = pick(eligible(ROOTS, level));
    return buildQuestion({
      question: `What does the root ${item.root} mean in a word like ${pick(item.examples)}?`,
      options: makeOptions(item.meaning, item.distractors),
      answer: item.meaning,
      difficulty: level,
    });
  }

  function createSynonymQuestion(level) {
    const item = pick(eligible(SYNONYMS, level));
    return buildQuestion({
      question: `Which word is closest in meaning to "${item.word}"?`,
      options: makeOptions(item.answer, item.distractors),
      answer: item.answer,
      difficulty: level,
    });
  }

  function createAntonymQuestion(level) {
    const item = pick(eligible(ANTONYMS, level));
    return buildQuestion({
      question: `Which word means the opposite of "${item.word}"?`,
      options: makeOptions(item.answer, item.distractors),
      answer: item.answer,
      difficulty: level,
    });
  }

  function createHomophoneQuestion(level) {
    const item = pick(eligible(HOMOPHONES, level));
    return buildQuestion({
      question: "Choose the word that best completes the sentence.",
      displayText: item.sentence,
      options: makeOptions(item.answer, item.distractors),
      answer: item.answer,
      difficulty: level,
    });
  }

  function createClozeQuestion(level) {
    const item = pick(eligible(CLOZES, level));
    return buildQuestion({
      question: "Which word or phrase best completes the sentence?",
      displayText: item.sentence,
      options: makeOptions(item.answer, item.distractors),
      answer: item.answer,
      difficulty: level,
    });
  }

  function createContextClueQuestion(level) {
    const item = pick(eligible(CONTEXT_CLUES, level));
    return buildQuestion({
      question: `What does "${item.word}" most likely mean?`,
      displayText: item.sentence,
      options: makeOptions(item.answer, item.distractors),
      answer: item.answer,
      difficulty: level,
    });
  }

  function createSentenceEditingQuestion(level) {
    const item = pick(eligible(SENTENCE_EDITING, level));
    return buildQuestion({
      question: "Which sentence is written correctly?",
      displayText: item.sentence,
      options: makeOptions(item.answer, item.distractors),
      answer: item.answer,
      difficulty: level,
    });
  }

  function createPartsOfSpeechQuestion(level) {
    const item = pick(eligible(PARTS_OF_SPEECH, level));
    return buildQuestion({
      question: `What part of speech is "${item.target}"?`,
      displayText: item.sentence,
      options: makeOptions(item.answer, item.distractors),
      answer: item.answer,
      difficulty: level,
    });
  }

  function createPunctuationQuestion(level) {
    const item = pick(eligible(PUNCTUATION, level));
    return buildQuestion({
      question: item.prompt,
      options: makeOptions(item.answer, item.distractors),
      answer: item.answer,
      difficulty: level,
    });
  }

  function createFigurativeQuestion(level) {
    const item = pick(eligible(FIGURATIVE_LANGUAGE, level));
    return buildQuestion({
      question: "What does this figurative language mean?",
      displayText: item.phrase,
      options: makeOptions(item.answer, item.distractors),
      answer: item.answer,
      difficulty: level,
    });
  }

  function createTransitionQuestion(level) {
    const item = pick(eligible(TRANSITIONS, level));
    return buildQuestion({
      question: "Which transition best completes the sentence?",
      displayText: item.sentence,
      options: makeOptions(item.answer, item.distractors),
      answer: item.answer,
      difficulty: level,
    });
  }

  function createSentenceCombiningQuestion(level) {
    const item = pick(eligible(SENTENCE_COMBINING, level));
    return buildQuestion({
      question: item.prompt,
      displayText: item.displayText,
      options: makeOptions(item.answer, item.distractors),
      answer: item.answer,
      difficulty: level,
    });
  }

  function createPronounReferenceQuestion(level) {
    const item = pick(eligible(PRONOUN_REFERENCES, level));
    return buildQuestion({
      question: item.question,
      displayText: item.sentence,
      options: makeOptions(item.answer, item.distractors),
      answer: item.answer,
      difficulty: level,
    });
  }

  function createClauseQuestion(level) {
    const item = pick(eligible(CLAUSES, level));
    return buildQuestion({
      question: item.question,
      displayText: item.sentence,
      options: makeOptions(item.answer, item.distractors),
      answer: item.answer,
      difficulty: level,
    });
  }

  function createWordChoiceQuestion(level) {
    const item = pick(eligible(WORD_CHOICE, level));
    return buildQuestion({
      question: item.prompt,
      displayText: item.sentence,
      options: makeOptions(item.answer, item.distractors),
      answer: item.answer,
      difficulty: level,
    });
  }

  const GENERATOR_MAP = {
    prefix: createPrefixQuestion,
    suffix: createSuffixQuestion,
    root: createRootQuestion,
    synonym: createSynonymQuestion,
    antonym: createAntonymQuestion,
    homophone: createHomophoneQuestion,
    cloze: createClozeQuestion,
    context: createContextClueQuestion,
    editing: createSentenceEditingQuestion,
    partsOfSpeech: createPartsOfSpeechQuestion,
    punctuation: createPunctuationQuestion,
    figurative: createFigurativeQuestion,
    transition: createTransitionQuestion,
    sentenceCombining: createSentenceCombiningQuestion,
    pronounReference: createPronounReferenceQuestion,
    clause: createClauseQuestion,
    wordChoice: createWordChoiceQuestion,
  };

  function buildVocabularyGrammarGeneratedEntry(difficulty) {
    const level = clampDifficulty(difficulty);
    const type = pick(GENERATOR_TYPES[level] || GENERATOR_TYPES[3]);
    return GENERATOR_MAP[type](level);
  }

  function buildStaticBank() {
    const bank = [];
    for (let level = 1; level <= 10; level += 1) {
      const types = GENERATOR_TYPES[level] || GENERATOR_TYPES[3];
      const repeatedTypes = [...types, ...types.slice(0, Math.max(0, 8 - types.length))];
      repeatedTypes.slice(0, 8).forEach((type) => {
        bank.push(GENERATOR_MAP[type](level));
      });
    }

    return bank.map((entry) => ({
      question: entry.question,
      displayText: entry.displayText || "",
      options: entry.options,
      answer: entry.answer,
      difficulty: entry.difficulty,
      extraText: entry.extraText || "",
    }));
  }

  return {
    bank: buildStaticBank(),
    createVocabularyGrammarGeneratedEntry: buildVocabularyGrammarGeneratedEntry,
  };
})();

const VOCABULARY_GRAMMAR_QUESTIONS = VOCABULARY_GRAMMAR_DATA.bank;

function createVocabularyGrammarGeneratedEntry(difficulty) {
  return VOCABULARY_GRAMMAR_DATA.createVocabularyGrammarGeneratedEntry(difficulty);
}

(() => {
  const questionUtils = globalThis.HomeworkQuestionUtils;
  if (!questionUtils) {
    return;
  }
  const { entry, pickGeneratedEntry, randomChoice } = questionUtils;

  const vocabularyGrammarSupplementalBlueprints = [
    { topic: "language-spelling", difficulty: 1, question: "Which word is spelled correctly?", answer: "because", options: ["because", "becuz", "beacuse", "becaus"] },
    { topic: "language-spelling", difficulty: 1, question: "Which word is spelled correctly?", answer: "friend", options: ["friend", "freind", "frend", "friende"] },
    { topic: "language-spelling", difficulty: 2, question: "Which word is spelled correctly?", answer: "thought", options: ["thought", "thot", "thaught", "thougt"] },
    { topic: "language-spelling", difficulty: 4, question: "Which word is spelled correctly?", answer: "necessary", options: ["necessary", "neccesary", "necesary", "nessessary"] },
    { topic: "language-syllables", difficulty: 1, question: "How many syllables are in banana?", answer: "3", options: ["1", "2", "3", "4"] },
    { topic: "language-syllables", difficulty: 1, question: "How many syllables are in tiger?", answer: "2", options: ["1", "2", "3", "4"] },
    { topic: "language-syllables", difficulty: 3, question: "How many syllables are in elephant?", answer: "3", options: ["1", "2", "3", "4"] },
    { topic: "language-syllables", difficulty: 5, question: "How many syllables are in information?", answer: "4", options: ["2", "3", "4", "5"] },
    { topic: "language-punctuation", difficulty: 1, question: "Which sentence has correct punctuation?", answer: "Where is my pencil?", options: ["Where is my pencil?", "Where is my pencil.", "Where is my pencil", "Where, is my pencil"] },
    { topic: "language-punctuation", difficulty: 2, question: "Which sentence uses a comma correctly?", answer: "After lunch, we played outside.", options: ["After lunch, we played outside.", "After, lunch we played outside.", "After lunch we, played outside.", "After lunch we played, outside."] },
    { topic: "language-punctuation", difficulty: 6, question: "Which sentence punctuates dialogue correctly?", answer: "\"Wait,\" said Maya.", options: ["\"Wait,\" said Maya.", "\"Wait\" said, Maya.", "Wait, said Maya.", "\"Wait said Maya.\""] },
    { topic: "language-capitalization", difficulty: 1, question: "Which sentence has correct capitalization?", answer: "Maya went to Tel Aviv.", options: ["Maya went to Tel Aviv.", "maya went to tel aviv.", "Maya went to tel aviv.", "maya went to Tel Aviv."] },
    { topic: "language-capitalization", difficulty: 3, question: "Which title is capitalized correctly?", answer: "The Lion and the Mouse", options: ["The Lion and the Mouse", "the lion and the mouse", "The lion And The mouse", "the Lion and The Mouse"] },
    { topic: "language-parts-of-speech", difficulty: 2, question: "Which word is a noun?", displayText: "The careful child builds a tower.", answer: "child", options: ["careful", "child", "builds", "quickly"] },
    { topic: "language-parts-of-speech", difficulty: 3, question: "Which word is a verb?", displayText: "The careful child builds a tower.", answer: "builds", options: ["careful", "child", "builds", "tower"] },
    { topic: "language-parts-of-speech", difficulty: 4, question: "Which word is an adjective?", displayText: "The silver robot moved slowly.", answer: "silver", options: ["silver", "robot", "moved", "slowly"] },
    { topic: "language-parts-of-speech", difficulty: 5, question: "Which word is an adverb?", displayText: "The silver robot moved slowly.", answer: "slowly", options: ["silver", "robot", "moved", "slowly"] },
    { topic: "language-prefixes", difficulty: 2, question: "What does the prefix re- mean in reread?", answer: "again", options: ["again", "not", "before", "between"] },
    { topic: "language-prefixes", difficulty: 4, question: "What does the prefix un- mean in unfair?", answer: "not", options: ["not", "again", "many", "before"] },
    { topic: "language-prefixes", difficulty: 6, question: "What does the prefix pre- mean in preview?", answer: "before", options: ["before", "after", "wrong", "under"] },
    { topic: "language-suffixes", difficulty: 3, question: "What does the suffix -less mean in careless?", answer: "without", options: ["without", "full of", "one who", "again"] },
    { topic: "language-suffixes", difficulty: 7, question: "Which suffix changes a word into a person who does an action?", answer: "-er", options: ["-er", "-less", "-ful", "-ness"] },
    { topic: "language-roots", difficulty: 5, question: "What does the root scrib/script mean?", answer: "write", options: ["write", "carry", "hear", "measure"] },
    { topic: "language-roots", difficulty: 8, question: "What does the root bio mean?", answer: "life", options: ["life", "water", "sound", "light"] },
    { topic: "language-sentence-combining", difficulty: 4, question: "Which sentence combines the ideas best?", displayText: "The rain stopped. We went outside.", answer: "When the rain stopped, we went outside.", options: ["When the rain stopped, we went outside.", "The rain stopped we went outside.", "Outside stopped when rain went.", "We went rain stopped outside."] },
    { topic: "language-sentence-combining", difficulty: 6, question: "Which sentence combines the ideas best?", displayText: "The bridge was narrow. The hikers crossed carefully.", answer: "Because the bridge was narrow, the hikers crossed carefully.", options: ["Because the bridge was narrow, the hikers crossed carefully.", "The bridge narrow hikers because crossed.", "The hikers crossed because carefully narrow.", "The bridge was narrow the hikers crossed carefully."] },
    { topic: "language-sentence-combining", difficulty: 9, question: "Which revision is most concise and clear?", displayText: "Due to the fact that the trail was icy, the hikers moved at a slow speed.", answer: "Because the trail was icy, the hikers moved slowly.", options: ["Because the trail was icy, the hikers moved slowly.", "The icy trail was due to the hikers slowly.", "At a slow speed, the trail was due to ice.", "The hikers were icy because speed was slow."] },
  ];

  function createSupplementalVocabularyGrammarEntry(difficulty) {
    const level = Math.max(1, Math.min(10, Number.parseInt(difficulty, 10) || 3));
    const choices = vocabularyGrammarSupplementalBlueprints.filter((item) => item.difficulty <= level);
    return entry(randomChoice(choices));
  }

  globalThis.createVocabularyGrammarSupplementalGeneratedEntry = (difficulty) =>
    pickGeneratedEntry([createSupplementalVocabularyGrammarEntry], difficulty);
})();

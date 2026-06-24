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
    { prefix: "in-", meaning: "not", distractors: ["again", "before", "many", "under"], examples: ["incomplete", "incorrect", "invisible"], minDifficulty: 4 },
    { prefix: "im-", meaning: "not", distractors: ["again", "between", "after", "too much"], examples: ["impossible", "impatient", "imperfect"], minDifficulty: 4 },
    { prefix: "bi-", meaning: "two", distractors: ["one", "half", "many", "before"], examples: ["bicycle", "bilingual", "bimonthly"], minDifficulty: 5 },
    { prefix: "tri-", meaning: "three", distractors: ["two", "many", "half", "against"], examples: ["triangle", "tricycle", "tricolor"], minDifficulty: 5 },
    { prefix: "de-", meaning: "down or away", distractors: ["again", "before", "together", "many"], examples: ["descend", "decrease", "defrost"], minDifficulty: 6 },
    { prefix: "auto-", meaning: "self", distractors: ["other", "many", "before", "against"], examples: ["autograph", "autopilot", "automatic"], minDifficulty: 6 },
    { prefix: "post-", meaning: "after", distractors: ["before", "not", "under", "together"], examples: ["postgame", "posttest", "postpone"], minDifficulty: 7 },
    { prefix: "pro-", meaning: "forward or in favor of", distractors: ["against", "backward", "under", "not"], examples: ["progress", "promote", "proscience"], minDifficulty: 7 },
    { prefix: "super-", meaning: "above or beyond", distractors: ["below", "not", "between", "again"], examples: ["superhuman", "superstar", "superstructure"], minDifficulty: 8 },
    { prefix: "circum-", meaning: "around", distractors: ["through", "under", "before", "not"], examples: ["circumnavigate", "circumference", "circumstance"], minDifficulty: 8 },
    { prefix: "poly-", meaning: "many", distractors: ["one", "half", "against", "before"], examples: ["polygon", "polyglot", "polytechnic"], minDifficulty: 9 },
    { prefix: "pseudo-", meaning: "false", distractors: ["true", "before", "many", "under"], examples: ["pseudonym", "pseudoscience", "pseudohero"], minDifficulty: 10 },
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
    { suffix: "-en", meaning: "to make or become", distractors: ["without", "one who", "study of", "full of"], examples: ["soften", "harden", "brighten"], minDifficulty: 4 },
    { suffix: "-ship", meaning: "state or position", distractors: ["able to be", "fear of", "under", "again"], examples: ["friendship", "leadership", "ownership"], minDifficulty: 5 },
    { suffix: "-or", meaning: "one who does something", distractors: ["without", "full of", "before", "study of"], examples: ["actor", "visitor", "inventor"], minDifficulty: 5 },
    { suffix: "-al", meaning: "relating to", distractors: ["without", "many", "one who", "fear of"], examples: ["musical", "natural", "personal"], minDifficulty: 6 },
    { suffix: "-ic", meaning: "relating to", distractors: ["without", "full of", "again", "one who"], examples: ["historic", "scientific", "poetic"], minDifficulty: 6 },
    { suffix: "-ward", meaning: "in the direction of", distractors: ["without", "full of", "person who", "before"], examples: ["forward", "backward", "homeward"], minDifficulty: 7 },
    { suffix: "-dom", meaning: "state or domain", distractors: ["study of", "able to be", "one who", "against"], examples: ["freedom", "kingdom", "wisdom"], minDifficulty: 7 },
    { suffix: "-ary", meaning: "relating to", distractors: ["without", "fear of", "many", "one who"], examples: ["library", "stationary", "ordinary"], minDifficulty: 8 },
    { suffix: "-ance", meaning: "state or action", distractors: ["one who", "full of", "not", "under"], examples: ["performance", "distance", "importance"], minDifficulty: 8 },
    { suffix: "-ence", meaning: "state or quality", distractors: ["without", "person who", "before", "many"], examples: ["confidence", "silence", "difference"], minDifficulty: 9 },
    { suffix: "-logist", meaning: "person who studies", distractors: ["fear of", "full of", "able to be", "without"], examples: ["biologist", "geologist", "zoologist"], minDifficulty: 9 },
    { suffix: "-cide", meaning: "killing", distractors: ["study of", "fear of", "person who", "state of"], examples: ["insecticide", "pesticide", "homicide"], minDifficulty: 10 },
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
    { root: "aud", meaning: "hear", distractors: ["see", "write", "carry", "water"], examples: ["audience", "audible", "auditorium"], minDifficulty: 5 },
    { root: "vis/vid", meaning: "see", distractors: ["hear", "write", "bend", "measure"], examples: ["vision", "video", "visible"], minDifficulty: 5 },
    { root: "terr", meaning: "earth or land", distractors: ["water", "sound", "light", "time"], examples: ["terrain", "territory", "terrestrial"], minDifficulty: 6 },
    { root: "rupt", meaning: "break", distractors: ["carry", "write", "measure", "believe"], examples: ["interrupt", "erupt", "rupture"], minDifficulty: 6 },
    { root: "struct", meaning: "build", distractors: ["break", "hear", "bend", "fear"], examples: ["construct", "structure", "instruct"], minDifficulty: 7 },
    { root: "ject", meaning: "throw", distractors: ["carry", "write", "see", "measure"], examples: ["project", "eject", "reject"], minDifficulty: 7 },
    { root: "ped/pod", meaning: "foot", distractors: ["hand", "sound", "light", "time"], examples: ["pedal", "pedestrian", "tripod"], minDifficulty: 8 },
    { root: "manu", meaning: "hand", distractors: ["foot", "earth", "water", "sound"], examples: ["manual", "manufacture", "manuscript"], minDifficulty: 8 },
    { root: "bene", meaning: "good or well", distractors: ["bad", "small", "many", "before"], examples: ["benefit", "benevolent", "benediction"], minDifficulty: 9 },
    { root: "mal", meaning: "bad", distractors: ["good", "many", "water", "write"], examples: ["malfunction", "malware", "malnutrition"], minDifficulty: 9 },
    { root: "luc/lum", meaning: "light", distractors: ["sound", "water", "earth", "carry"], examples: ["lucid", "luminous", "illuminate"], minDifficulty: 10 },
    { root: "voc/vok", meaning: "voice or call", distractors: ["write", "carry", "measure", "bend"], examples: ["vocal", "invoke", "vocabulary"], minDifficulty: 10 },
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
    { word: "big", answer: "large", distractors: ["tiny", "quiet", "early", "rough"], minDifficulty: 1 },
    { word: "look", answer: "see", distractors: ["jump", "hide", "sleep", "carry"], minDifficulty: 1 },
    { word: "mad", answer: "angry", distractors: ["glad", "calm", "tiny", "bright"], minDifficulty: 2 },
    { word: "near", answer: "close", distractors: ["far", "late", "rough", "empty"], minDifficulty: 2 },
    { word: "simple", answer: "easy", distractors: ["difficult", "noisy", "heavy", "ancient"], minDifficulty: 3 },
    { word: "gift", answer: "present", distractors: ["problem", "question", "journey", "mistake"], minDifficulty: 3 },
    { word: "calm", answer: "peaceful", distractors: ["stormy", "careless", "hungry", "broken"], minDifficulty: 4 },
    { word: "build", answer: "construct", distractors: ["destroy", "forget", "borrow", "whisper"], minDifficulty: 4 },
    { word: "accurate", answer: "correct", distractors: ["confusing", "ordinary", "empty", "distant"], minDifficulty: 6 },
    { word: "predict", answer: "say what may happen", distractors: ["copy a picture", "make a mess", "measure weight", "hide evidence"], minDifficulty: 6 },
    { word: "fragile", answer: "easy to break", distractors: ["hard to see", "quick to learn", "full of color", "very hungry"], minDifficulty: 7 },
    { word: "frequent", answer: "happening often", distractors: ["happening once", "hard to carry", "made of metal", "very quiet"], minDifficulty: 7 },
    { word: "evaluate", answer: "judge or assess", distractors: ["copy exactly", "run quickly", "make louder", "forget slowly"], minDifficulty: 8 },
    { word: "justify", answer: "give reasons for", distractors: ["paint over", "make shorter", "count backward", "hide carefully"], minDifficulty: 8 },
    { word: "consistent", answer: "staying the same", distractors: ["changing randomly", "hard to lift", "made of glass", "full of jokes"], minDifficulty: 9 },
    { word: "contradict", answer: "say the opposite of", distractors: ["agree with", "decorate", "estimate", "carry safely"], minDifficulty: 9 },
    { word: "synthesize", answer: "combine ideas", distractors: ["separate forever", "copy mistakes", "make louder", "erase words"], minDifficulty: 10 },
    { word: "subtle", answer: "not obvious", distractors: ["easy to notice", "very heavy", "full of water", "made of stone"], minDifficulty: 10 },
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
    { word: "up", answer: "down", distractors: ["over", "near", "open", "soft"], minDifficulty: 1 },
    { word: "day", answer: "night", distractors: ["morning", "light", "sun", "week"], minDifficulty: 1 },
    { word: "soft", answer: "hard", distractors: ["smooth", "quiet", "warm", "round"], minDifficulty: 2 },
    { word: "inside", answer: "outside", distractors: ["nearby", "under", "beside", "around"], minDifficulty: 2 },
    { word: "remember", answer: "forget", distractors: ["recall", "repeat", "learn", "notice"], minDifficulty: 3 },
    { word: "arrive", answer: "leave", distractors: ["come", "enter", "visit", "return"], minDifficulty: 3 },
    { word: "include", answer: "exclude", distractors: ["add", "contain", "collect", "invite"], minDifficulty: 6 },
    { word: "major", answer: "minor", distractors: ["important", "large", "main", "serious"], minDifficulty: 7 },
    { word: "accurate", answer: "incorrect", distractors: ["exact", "careful", "true", "clear"], minDifficulty: 8 },
    { word: "abundant", answer: "scarce", distractors: ["plentiful", "common", "available", "extra"], minDifficulty: 9 },
    { word: "literal", answer: "figurative", distractors: ["exact", "real", "plain", "factual"], minDifficulty: 10 },
    { word: "objective", answer: "biased", distractors: ["factual", "neutral", "fair", "balanced"], minDifficulty: 10 },
  ];

  const HOMOPHONES = [
    { sentence: "The dog wagged ___ tail.", answer: "its", distractors: ["it's", "their", "there", "his"], minDifficulty: 2 },
    { sentence: "We went ___ the park after school.", answer: "to", distractors: ["too", "two", "do", "through"], minDifficulty: 2 },
    { sentence: "The children put ___ backpacks by the door.", answer: "their", distractors: ["there", "they're", "them", "then"], minDifficulty: 3 },
    { sentence: "___ going to rain later, so take an umbrella.", answer: "It's", distractors: ["Its", "There", "Their", "Then"], minDifficulty: 3 },
    { sentence: "I can hear the music, but it is not ___ loud.", answer: "too", distractors: ["to", "two", "through", "though"], minDifficulty: 4 },
    { sentence: "___ welcome to join our game.", answer: "You're", distractors: ["Your", "Yore", "You", "There"], minDifficulty: 4 },
    { sentence: "First we cleaned our desks, and ___ we lined up.", answer: "then", distractors: ["than", "there", "their", "thin"], minDifficulty: 5 },
    { sentence: "The ___ explained the school safety rule.", answer: "principal", distractors: ["principle", "principled", "princess", "practice"], minDifficulty: 6 },
    { sentence: "The hot weather can ___ how much water plants need.", answer: "affect", distractors: ["effect", "effort", "except", "accept"], minDifficulty: 8 },
    { sentence: "The ___ of the storm was a flooded playground.", answer: "effect", distractors: ["affect", "except", "accept", "effort"], minDifficulty: 8 },
    { sentence: "Everyone was invited ___ Maya, who was sick at home.", answer: "except", distractors: ["accept", "effect", "affect", "expect"], minDifficulty: 9 },
    { sentence: "Please ___ the gift with a thank-you smile.", answer: "accept", distractors: ["except", "effect", "affect", "expect"], minDifficulty: 9 },
    { sentence: "I ___ a blue jacket to school yesterday.", answer: "wore", distractors: ["war", "where", "wear", "were"], minDifficulty: 2 },
    { sentence: "The bird flew over ___ nest.", answer: "its", distractors: ["it's", "there", "their", "then"], minDifficulty: 2 },
    { sentence: "We need ___ cups for the science experiment.", answer: "two", distractors: ["to", "too", "through", "do"], minDifficulty: 3 },
    { sentence: "The library books are over ___.", answer: "there", distractors: ["their", "they're", "then", "than"], minDifficulty: 3 },
    { sentence: "Maya read the story ___ than her brother did.", answer: "faster", distractors: ["fastest", "first", "farther", "further"], minDifficulty: 4 },
    { sentence: "The class walked ___ the museum doors.", answer: "through", distractors: ["threw", "true", "though", "to"], minDifficulty: 4 },
    { sentence: "The coach gave the team good ___.", answer: "advice", distractors: ["advise", "device", "devise", "advance"], minDifficulty: 6 },
    { sentence: "Please ___ me when the timer rings.", answer: "advise", distractors: ["advice", "device", "devise", "advance"], minDifficulty: 6 },
    { sentence: "The mountain air made it hard to ___.", answer: "breathe", distractors: ["breath", "breadth", "brief", "breeze"], minDifficulty: 7 },
    { sentence: "Take a deep ___ before you begin speaking.", answer: "breath", distractors: ["breathe", "breadth", "brief", "breeze"], minDifficulty: 7 },
    { sentence: "The school board will ___ a new rule next month.", answer: "adopt", distractors: ["adapt", "adept", "except", "accept"], minDifficulty: 9 },
    { sentence: "Camels can ___ to dry desert weather.", answer: "adapt", distractors: ["adopt", "adept", "effect", "except"], minDifficulty: 9 },
  ];

  const CLOZES = [
    { sentence: "The sun was ___, so we wore hats.", answer: "bright", distractors: ["empty", "quiet", "late", "square"], minDifficulty: 1 },
    { sentence: "I felt ___ after running across the playground.", answer: "tired", distractors: ["sharp", "purple", "round", "frozen"], minDifficulty: 1 },
    { sentence: "The puppy was ___, so it stayed close to Maya.", answer: "shy", distractors: ["loud", "hungry", "tall", "windy"], minDifficulty: 1 },
    { sentence: "The librarian asked us to whisper because the room needed to stay ___.", answer: "quiet", distractors: ["bright", "crowded", "messy", "round"], minDifficulty: 1 },
    { sentence: "The soup was too ___ to eat right away.", answer: "hot", distractors: ["wide", "silent", "empty", "early"], minDifficulty: 2 },
    { sentence: "The glass was fragile, so we carried it ___.", answer: "carefully", distractors: ["roughly", "hungrily", "loudly", "sleepily"], minDifficulty: 2 },
    { sentence: "The path was muddy after the rain, so our shoes became ___.", answer: "dirty", distractors: ["dry", "invisible", "silent", "empty"], minDifficulty: 2 },
    { sentence: "The two stories are similar; ___, both have a surprise ending.", answer: "for example", distractors: ["however", "instead", "before", "although"], minDifficulty: 4 },
    { sentence: "Because the instructions were confusing, Dad asked the teacher to ___ them.", answer: "clarify", distractors: ["hide", "decorate", "ignore", "carry"], minDifficulty: 5 },
    { sentence: "The team had practiced for weeks; ___, they felt ready for the match.", answer: "therefore", distractors: ["however", "instead", "meanwhile", "although"], minDifficulty: 6 },
    { sentence: "The old bridge was sturdy, meaning it was ___.", answer: "strong and well built", distractors: ["easy to break", "painted blue", "very noisy", "made yesterday"], minDifficulty: 6 },
    { sentence: "The evidence was weak; ___, the claim was hard to believe.", answer: "therefore", distractors: ["meanwhile", "instead", "before", "likewise"], minDifficulty: 7 },
    { sentence: "The scientist repeated the test to get ___ results.", answer: "reliable", distractors: ["random", "colorful", "secret", "careless"], minDifficulty: 7 },
    { sentence: "The directions were ambiguous, so different students understood them in different ways.", answer: "unclear", distractors: ["obvious", "silent", "ancient", "tiny"], minDifficulty: 8 },
    { sentence: "The article was objective because it reported facts without ___.", answer: "personal opinions", distractors: ["clear numbers", "source names", "exact dates", "careful notes"], minDifficulty: 8 },
    { sentence: "Noga gave a concise answer: it was short but complete.", answer: "brief", distractors: ["confusing", "careless", "angry", "musical"], minDifficulty: 9 },
    { sentence: "The evidence was sufficient because it was enough to support the claim.", answer: "enough", distractors: ["missing", "colorful", "incorrect", "ordinary"], minDifficulty: 10 },
    { sentence: "The explanation was nuanced because it included ___ instead of a simple yes-or-no answer.", answer: "important differences and details", distractors: ["only one repeated word", "no evidence at all", "a louder voice", "a shorter title"], minDifficulty: 10 },
    { sentence: "The ice cream began to ___ in the warm sun.", answer: "melt", distractors: ["freeze", "paint", "whisper", "count"], minDifficulty: 1 },
    { sentence: "The kitten climbed into the box because it was ___.", answer: "curious", distractors: ["square", "empty", "purple", "late"], minDifficulty: 1 },
    { sentence: "The plant looked dry, so I ___ it with water.", answer: "watered", distractors: ["folded", "ignored", "painted", "borrowed"], minDifficulty: 2 },
    { sentence: "The hallway was crowded, so we walked ___.", answer: "slowly", distractors: ["invisibly", "wildly", "yesterday", "squarely"], minDifficulty: 2 },
    { sentence: "The two pictures were almost ___, but one had a red door.", answer: "identical", distractors: ["opposite", "hungry", "silent", "ancient"], minDifficulty: 4 },
    { sentence: "The sign warned us to avoid the ___ steps.", answer: "slippery", distractors: ["musical", "square", "empty", "ordinary"], minDifficulty: 4 },
    { sentence: "The class compared the two poems; ___, they discussed how the poems were alike.", answer: "in other words", distractors: ["however", "meanwhile", "instead", "before"], minDifficulty: 5 },
    { sentence: "The soccer field was ___ after the storm, so the game was canceled.", answer: "flooded", distractors: ["dusty", "tiny", "silent", "careless"], minDifficulty: 5 },
    { sentence: "The teacher asked us to ___ our answer with evidence from the text.", answer: "support", distractors: ["hide", "decorate", "forget", "shout"], minDifficulty: 6 },
    { sentence: "The author used details to make the setting feel ___.", answer: "realistic", distractors: ["weightless", "silent", "careless", "backward"], minDifficulty: 6 },
    { sentence: "The museum sign was ___, so visitors could understand it quickly.", answer: "clear", distractors: ["vague", "hidden", "fragile", "crooked"], minDifficulty: 7 },
    { sentence: "The coach gave ___ feedback that helped each player improve.", answer: "specific", distractors: ["random", "noisy", "careless", "missing"], minDifficulty: 7 },
    { sentence: "A fair experiment changes only one variable; ___, the results are easier to trust.", answer: "therefore", distractors: ["however", "instead", "meanwhile", "although"], minDifficulty: 8 },
    { sentence: "The paragraph was coherent because each sentence connected clearly to the next.", answer: "made sense as a whole", distractors: ["used only short words", "had no punctuation", "was written backward", "asked many riddles"], minDifficulty: 8 },
    { sentence: "The claim was credible because it came from a source with expertise.", answer: "believable", distractors: ["impossible", "colorful", "silent", "tiny"], minDifficulty: 9 },
    { sentence: "The writer revised the paragraph to eliminate ___ details that did not support the main idea.", answer: "irrelevant", distractors: ["important", "necessary", "accurate", "helpful"], minDifficulty: 9 },
    { sentence: "The pattern was inconsistent because it changed in an unpredictable way.", answer: "not staying the same", distractors: ["easy to measure", "written in order", "full of light", "very common"], minDifficulty: 10 },
    { sentence: "The conclusion was tentative because the scientist needed more data before being certain.", answer: "not final or certain", distractors: ["proved forever", "painted brightly", "already forgotten", "made of metal"], minDifficulty: 10 },
  ];

  const CONTEXT_CLUES = [
    { word: "soggy", sentence: "The napkin became soggy after juice spilled on it.", answer: "wet and soft", distractors: ["dry and crisp", "very loud", "hard to lift", "full of light"], minDifficulty: 1 },
    { word: "empty", sentence: "The basket was empty after we took out all the apples.", answer: "with nothing inside", distractors: ["full of fruit", "hard to open", "made of stone", "very noisy"], minDifficulty: 1 },
    { word: "blend", sentence: "Blend the yellow and blue paint to make green.", answer: "mix together", distractors: ["pull apart", "count quickly", "hide under", "make silent"], minDifficulty: 2 },
    { word: "rescue", sentence: "The lifeguard ran to rescue the swimmer who needed help.", answer: "save from danger", distractors: ["teach a song", "cover with paint", "forget about", "make smaller"], minDifficulty: 2 },
    { word: "glimpse", sentence: "Gabriel caught a glimpse of the fox before it ran behind the tree.", answer: "a quick look", distractors: ["a loud sound", "a deep hole", "a heavy box", "a long trip"], minDifficulty: 3 },
    { word: "drowsy", sentence: "After staying up late, Gideon felt drowsy during breakfast.", answer: "sleepy", distractors: ["angry", "hungry", "excited", "lost"], minDifficulty: 3 },
    { word: "rapid", sentence: "The rapid stream moved so fast that leaves zipped past the rocks.", answer: "fast", distractors: ["still", "dry", "careless", "ancient"], minDifficulty: 4 },
    { word: "retrieve", sentence: "The ball rolled under the sofa, so Noga crawled down to retrieve it.", answer: "get it back", distractors: ["paint it", "forget it", "break it", "hide it"], minDifficulty: 4 },
    { word: "generous", sentence: "Miranda was generous with the cookies and shared them with everyone.", answer: "willing to give", distractors: ["easy to scare", "hard to hear", "quick to sleep", "full of dust"], minDifficulty: 5 },
    { word: "essential", sentence: "Water is essential for the seedlings; without it, they wilt.", answer: "needed", distractors: ["optional", "decorative", "hidden", "noisy"], minDifficulty: 5 },
    { word: "contrast", sentence: "The essay asks you to contrast cats and dogs by explaining how they are different.", answer: "show differences", distractors: ["make a drawing", "repeat exactly", "hide details", "count quickly"], minDifficulty: 6 },
    { word: "evidence", sentence: "The footprints were evidence that someone had walked through the mud.", answer: "proof or clues", distractors: ["a funny joke", "a kind of food", "a loud sound", "a color"], minDifficulty: 6 },
    { word: "scarce", sentence: "Fresh water is scarce in the desert, so travelers carry extra bottles.", answer: "hard to find", distractors: ["easy to waste", "brightly colored", "too heavy", "made by hand"], minDifficulty: 7 },
    { word: "analyze", sentence: "To analyze the poem, the class looked closely at each line and discussed what it meant.", answer: "study carefully", distractors: ["copy quickly", "throw away", "make louder", "decorate"], minDifficulty: 7 },
    { word: "plausible", sentence: "Her explanation was plausible because it fit the clues and did not contradict the evidence.", answer: "reasonable or believable", distractors: ["impossible to read", "painted brightly", "made of cloth", "always incorrect"], minDifficulty: 8 },
    { word: "imply", sentence: "The dark clouds imply that rain may come soon, even though no one says it directly.", answer: "suggest without saying directly", distractors: ["prove with a ruler", "draw in color", "repeat word for word", "make disappear"], minDifficulty: 8 },
    { word: "valid", sentence: "The conclusion was valid because it followed logically from the data.", answer: "well supported and logical", distractors: ["written in pencil", "easy to carry", "full of jokes", "missing all details"], minDifficulty: 9 },
    { word: "perspective", sentence: "From the ant's perspective, a small leaf looked like a giant umbrella.", answer: "point of view", distractors: ["kind of weather", "short message", "secret code", "piece of food"], minDifficulty: 9 },
    { word: "infer", sentence: "If the floor is wet and umbrellas are by the door, you can infer that it rained.", answer: "figure out using clues", distractors: ["ask for a vote", "paint a picture", "make a mistake", "copy a sentence"], minDifficulty: 10 },
    { word: "qualify", sentence: "The writer qualified the claim by saying the plan works well in small gardens but not in crowded city parks.", answer: "limit or make more exact", distractors: ["repeat with no change", "make louder", "erase all evidence", "turn into a question"], minDifficulty: 10 },
    { word: "gleaming", sentence: "The polished trophy was gleaming under the bright lights.", answer: "shining", distractors: ["broken", "sleepy", "silent", "empty"], minDifficulty: 1 },
    { word: "stroll", sentence: "We took a slow stroll around the pond after dinner.", answer: "easy walk", distractors: ["fast swim", "loud shout", "deep sleep", "small snack"], minDifficulty: 1 },
    { word: "cozy", sentence: "The cozy blanket kept Amir warm while he read.", answer: "comfortable and warm", distractors: ["cold and sharp", "very loud", "hard to open", "full of holes"], minDifficulty: 2 },
    { word: "scatter", sentence: "When the bag ripped, the marbles began to scatter across the floor.", answer: "spread out", distractors: ["line up", "stand still", "turn blue", "become louder"], minDifficulty: 2 },
    { word: "sturdy", sentence: "The sturdy table held all the books without wobbling.", answer: "strong", distractors: ["weak", "tiny", "hidden", "musical"], minDifficulty: 3 },
    { word: "pause", sentence: "Lena took a short pause before answering the question.", answer: "stop for a moment", distractors: ["run faster", "speak louder", "draw a line", "forget completely"], minDifficulty: 3 },
    { word: "cautious", sentence: "The cautious driver slowed down on the icy road.", answer: "careful", distractors: ["reckless", "sleepy", "hungry", "careless"], minDifficulty: 4 },
    { word: "rare", sentence: "A four-leaf clover is rare, so people are excited when they find one.", answer: "not common", distractors: ["very loud", "easy to break", "full of water", "always angry"], minDifficulty: 4 },
    { word: "fragile", sentence: "The fragile vase cracked when it fell from the shelf.", answer: "easy to break", distractors: ["hard to see", "quick to run", "full of dust", "safe to drop"], minDifficulty: 5 },
    { word: "predict", sentence: "Looking at the dark clouds, we tried to predict whether it would rain.", answer: "say what may happen", distractors: ["forget the past", "make a drawing", "measure with a scale", "hide a clue"], minDifficulty: 5 },
    { word: "summarize", sentence: "To summarize the chapter, write only the most important events.", answer: "tell the main points", distractors: ["copy every word", "add unrelated jokes", "change the ending", "draw the cover"], minDifficulty: 6 },
    { word: "prioritize", sentence: "With only ten minutes left, the group had to prioritize the most important tasks.", answer: "do the most important things first", distractors: ["throw away all notes", "work in the dark", "repeat each word", "make tasks confusing"], minDifficulty: 6 },
    { word: "biased", sentence: "The review was biased because it ignored every good feature and listed only complaints.", answer: "unfairly one-sided", distractors: ["carefully balanced", "written in pencil", "easy to carry", "full of exact dates"], minDifficulty: 7 },
    { word: "sequence", sentence: "Put the events in sequence by listing what happened first, next, and last.", answer: "order", distractors: ["argument", "secret", "mistake", "color"], minDifficulty: 7 },
    { word: "relevant", sentence: "Only relevant facts that connect to the topic should be included in the report.", answer: "closely related", distractors: ["completely random", "very noisy", "written backward", "made of glass"], minDifficulty: 8 },
    { word: "hypothesis", sentence: "Before the experiment, the students wrote a hypothesis about what they expected to happen.", answer: "testable prediction", distractors: ["final proof", "funny story", "drawing of data", "list of supplies only"], minDifficulty: 8 },
    { word: "ambivalent", sentence: "Jonah felt ambivalent about moving because he was excited for a new room but sad to leave friends.", answer: "having mixed feelings", distractors: ["completely certain", "very hungry", "unable to read", "full of energy"], minDifficulty: 9 },
    { word: "corroborate", sentence: "A second witness helped corroborate the story by giving the same details.", answer: "support with more evidence", distractors: ["disprove completely", "decorate brightly", "make shorter", "hide the answer"], minDifficulty: 9 },
    { word: "mitigate", sentence: "Planting trees can mitigate heat by creating shade and cooling the air.", answer: "make less severe", distractors: ["make much worse", "ignore completely", "measure exactly", "repeat loudly"], minDifficulty: 10 },
    { word: "inherent", sentence: "The shell's inherent strength comes from its curved shape, not from any added support.", answer: "naturally part of something", distractors: ["added later", "easy to remove", "painted on top", "found by accident"], minDifficulty: 10 },
  ];

  const SENTENCE_EDITING = [
    {
      sentence: "i can see the moon",
      answer: "I can see the moon.",
      distractors: [
        "i can see the moon.",
        "I can see the moon",
        "I can sees the moon.",
        "I can see moon the.",
      ],
      minDifficulty: 1,
    },
    {
      sentence: "she has a blue backpack",
      answer: "She has a blue backpack.",
      distractors: [
        "she has a blue backpack.",
        "She have a blue backpack.",
        "She has blue a backpack.",
        "She has a blue backpack",
      ],
      minDifficulty: 1,
    },
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
      sentence: "we was late because the bus came slowly",
      answer: "We were late because the bus came slowly.",
      distractors: [
        "We was late because the bus came slowly.",
        "We were late because the bus come slowly.",
        "we were late because the bus came slowly.",
        "We were late because slowly the bus.",
      ],
      minDifficulty: 3,
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
      sentence: "dad and i made dinner for aunt rina",
      answer: "Dad and I made dinner for Aunt Rina.",
      distractors: [
        "Dad and me made dinner for Aunt Rina.",
        "dad and I made dinner for Aunt Rina.",
        "Dad and I made dinner for aunt rina.",
        "Dad and I make dinner for Aunt Rina.",
      ],
      minDifficulty: 4,
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
      sentence: "the students has finished their posters",
      answer: "The students have finished their posters.",
      distractors: [
        "The students has finished their posters.",
        "The students have finish their posters.",
        "The students have finished there posters.",
        "the students have finished their posters.",
      ],
      minDifficulty: 5,
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
      sentence: "the recipe said to add flour sugar and salt",
      answer: "The recipe said to add flour, sugar, and salt.",
      distractors: [
        "The recipe said to add flour sugar, and salt.",
        "The recipe said, to add flour sugar and salt.",
        "The recipe said to add, flour sugar and salt.",
        "the recipe said to add flour, sugar, and salt.",
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
      sentence: "maya wanted to join the club she missed the signup date",
      answer: "Maya wanted to join the club, but she missed the signup date.",
      distractors: [
        "Maya wanted to join the club she missed the signup date.",
        "Maya wanted to join the club, she missed the signup date.",
        "Maya wanted to join the club but, she missed the signup date.",
        "maya wanted to join the club, but she missed the signup date.",
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
      sentence: "the article explains how bees pollinate flowers it also describes why farmers protect them",
      answer: "The article explains how bees pollinate flowers, and it also describes why farmers protect them.",
      distractors: [
        "The article explains how bees pollinate flowers it also describes why farmers protect them.",
        "The article explains how bees pollinate flowers, it also describes why farmers protect them.",
        "The article explain how bees pollinate flowers, and it also describes why farmers protect them.",
        "the article explains how bees pollinate flowers, and it also describes why farmers protect them.",
      ],
      minDifficulty: 9,
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
    {
      sentence: "neither the chart nor the note explains why the results changed",
      answer: "Neither the chart nor the note explains why the results changed.",
      distractors: [
        "Neither the chart nor the note explain why the results changed.",
        "Neither the chart or the note explains why the results changed.",
        "Neither the chart nor the note explains why the results changes.",
        "neither the chart nor the note explains why the results changed.",
      ],
      minDifficulty: 10,
    },
    {
      sentence: "we like to read books",
      answer: "We like to read books.",
      distractors: [
        "we like to read books.",
        "We likes to read books.",
        "We like read to books.",
        "We like to read books",
      ],
      minDifficulty: 1,
    },
    {
      sentence: "the bird is in the tree",
      answer: "The bird is in the tree.",
      distractors: [
        "the bird is in the tree.",
        "The bird are in the tree.",
        "The bird is tree in the.",
        "The bird is in the tree",
      ],
      minDifficulty: 1,
    },
    {
      sentence: "he run to the bus stop every morning",
      answer: "He runs to the bus stop every morning.",
      distractors: [
        "He run to the bus stop every morning.",
        "he runs to the bus stop every morning.",
        "He runs to the bus stop every morning",
        "He runs to the bus stop morning every.",
      ],
      minDifficulty: 2,
    },
    {
      sentence: "maya and i are going to the park",
      answer: "Maya and I are going to the park.",
      distractors: [
        "Maya and me are going to the park.",
        "maya and I are going to the park.",
        "Maya and I is going to the park.",
        "Maya and I are going to the park",
      ],
      minDifficulty: 3,
    },
    {
      sentence: "the dogs was barking at the gate",
      answer: "The dogs were barking at the gate.",
      distractors: [
        "The dogs was barking at the gate.",
        "The dogs were bark at the gate.",
        "the dogs were barking at the gate.",
        "The dogs were barking gate at the.",
      ],
      minDifficulty: 4,
    },
    {
      sentence: "we visited grandma on sunday",
      answer: "We visited Grandma on Sunday.",
      distractors: [
        "we visited Grandma on Sunday.",
        "We visit Grandma on Sunday.",
        "We visited grandma on sunday.",
        "We visited Grandma Sunday on.",
      ],
      minDifficulty: 4,
    },
    {
      sentence: "the class have written their final drafts",
      answer: "The class has written its final drafts.",
      distractors: [
        "The class have written its final drafts.",
        "The class has wrote its final drafts.",
        "The class has written their final drafts.",
        "the class has written its final drafts.",
      ],
      minDifficulty: 6,
    },
    {
      sentence: "before the bell rang the students packed their bags",
      answer: "Before the bell rang, the students packed their bags.",
      distractors: [
        "Before, the bell rang the students packed their bags.",
        "Before the bell rang the students, packed their bags.",
        "before the bell rang, the students packed their bags.",
        "Before the bell rang, the students pack their bags.",
      ],
      minDifficulty: 6,
    },
    {
      sentence: "the report was clear however it needed more evidence",
      answer: "The report was clear; however, it needed more evidence.",
      distractors: [
        "The report was clear however, it needed more evidence.",
        "The report was clear, however it needed more evidence.",
        "The report was clear; however it need more evidence.",
        "the report was clear; however, it needed more evidence.",
      ],
      minDifficulty: 8,
    },
    {
      sentence: "the committee made their decision after reviewing the evidence",
      answer: "The committee made its decision after reviewing the evidence.",
      distractors: [
        "The committee made their decision after reviewing the evidence.",
        "The committee make its decision after reviewing the evidence.",
        "The committee made its decision after review the evidence.",
        "the committee made its decision after reviewing the evidence.",
      ],
      minDifficulty: 9,
    },
    {
      sentence: "each of the students were responsible for citing their source",
      answer: "Each of the students was responsible for citing his or her source.",
      distractors: [
        "Each of the students were responsible for citing his or her source.",
        "Each of the students was responsible for citing their source.",
        "Each of the students was responsible for cite his or her source.",
        "each of the students was responsible for citing his or her source.",
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
    { sentence: "The small boat drifted across the lake.", target: "boat", answer: "noun", distractors: ["verb", "adjective", "adverb", "preposition"], minDifficulty: 1 },
    { sentence: "The puppy slept beside the chair.", target: "slept", answer: "verb", distractors: ["noun", "adjective", "pronoun", "interjection"], minDifficulty: 2 },
    { sentence: "A tiny frog jumped into the pond.", target: "tiny", answer: "adjective", distractors: ["noun", "verb", "adverb", "preposition"], minDifficulty: 2 },
    { sentence: "The train moved slowly through the tunnel.", target: "slowly", answer: "adverb", distractors: ["noun", "verb", "adjective", "article"], minDifficulty: 3 },
    { sentence: "She placed the vase beside the window.", target: "beside", answer: "preposition", distractors: ["verb", "noun", "adjective", "pronoun"], minDifficulty: 4 },
    { sentence: "We can leave now or wait until morning.", target: "or", answer: "conjunction", distractors: ["noun", "verb", "adverb", "interjection"], minDifficulty: 5 },
    { sentence: "Ouch, the thorn scratched my finger!", target: "Ouch", answer: "interjection", distractors: ["preposition", "conjunction", "noun", "article"], minDifficulty: 6 },
    { sentence: "The determined runner finished the race proudly.", target: "determined", answer: "adjective", distractors: ["verb", "noun", "adverb", "preposition"], minDifficulty: 7 },
    { sentence: "Several students presented their projects confidently.", target: "confidently", answer: "adverb", distractors: ["noun", "verb", "adjective", "pronoun"], minDifficulty: 8 },
    { sentence: "Although it was late, the team continued working.", target: "Although", answer: "conjunction", distractors: ["noun", "verb", "adverb", "article"], minDifficulty: 9 },
  ];

  const PARTS_OF_SPEECH_REGRESSION_CHECKS = [
    ["A tiny frog jumped into the pond.", "tiny", "adjective"],
    ["The train moved slowly through the tunnel.", "slowly", "adverb"],
    ["The bright kite flew above the park.", "bright", "adjective"],
    ["The children sang softly during the show.", "softly", "adverb"],
    ["The determined runner finished the race proudly.", "determined", "adjective"],
    ["Several students presented their projects confidently.", "confidently", "adverb"],
  ];

  function validatePartsOfSpeechData() {
    PARTS_OF_SPEECH_REGRESSION_CHECKS.forEach(([sentence, target, expectedAnswer]) => {
      const item = PARTS_OF_SPEECH.find(
        (candidate) => candidate.sentence === sentence && candidate.target === target
      );

      if (!item || item.answer !== expectedAnswer) {
        const actualAnswer = item ? item.answer : "missing";
        throw new Error(
          `Parts-of-speech regression: "${target}" in "${sentence}" should be "${expectedAnswer}", got "${actualAnswer}".`
        );
      }
    });
  }

  validatePartsOfSpeechData();

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
    {
      prompt: "Which sentence uses punctuation correctly?",
      answer: "Can you help me carry this box?",
      distractors: ["Can you help me carry this box.", "Can you help me, carry this box?", "Can you help me carry this box", "Can, you help me carry this box?"],
      minDifficulty: 2,
    },
    {
      prompt: "Which sentence uses commas in a list correctly?",
      answer: "We need pencils, paper, and glue.",
      distractors: ["We need pencils paper, and glue.", "We need, pencils paper and glue.", "We need pencils, paper and, glue.", "We need pencils paper and glue,"],
      minDifficulty: 3,
    },
    {
      prompt: "Which sentence uses an apostrophe correctly?",
      answer: "The dog's leash was red.",
      distractors: ["The dogs leash was red.", "The dog leash's was red.", "The dogs' leash was red for one dog.", "The dog,s leash was red."],
      minDifficulty: 4,
    },
    {
      prompt: "Which sentence uses quotation marks correctly?",
      answer: "\"I found it,\" said Noga.",
      distractors: ["I found it, said Noga.", "\"I found it, said Noga.\"", "I \"found it,\" said Noga.", "\"I found it said Noga,\""],
      minDifficulty: 5,
    },
    {
      prompt: "Which sentence correctly punctuates an introductory clause?",
      answer: "When the timer rang, the class stopped writing.",
      distractors: ["When, the timer rang the class stopped writing.", "When the timer rang the class, stopped writing.", "When the timer, rang the class stopped writing.", "when the timer rang, the class stopped writing."],
      minDifficulty: 6,
    },
    {
      prompt: "Which sentence correctly joins two complete ideas?",
      answer: "The door was locked, but we found another entrance.",
      distractors: ["The door was locked, we found another entrance.", "The door was locked but, we found another entrance.", "The door was locked but we, found another entrance.", "The door was locked, but found another entrance."],
      minDifficulty: 7,
    },
    {
      prompt: "Which sentence uses a colon correctly?",
      answer: "Bring these supplies: a notebook, a pencil, and a ruler.",
      distractors: ["Bring these supplies a notebook: a pencil, and a ruler.", "Bring: these supplies a notebook, a pencil, and a ruler.", "Bring these supplies: a notebook a pencil and a ruler", "Bring these: supplies, a notebook, a pencil, and a ruler."],
      minDifficulty: 8,
    },
    {
      prompt: "Which sentence uses a semicolon correctly?",
      answer: "The power went out; the room became silent.",
      distractors: ["The power went out; and the room became silent.", "The power; went out, the room became silent.", "The power went; out the room became silent.", "The power went out the room; became silent."],
      minDifficulty: 9,
    },
    {
      prompt: "Which sentence uses the apostrophe correctly for a plural possessive noun?",
      answer: "The teachers' lounge is beside the office.",
      distractors: ["The teacher's lounge is beside the office for many teachers.", "The teachers lounge' is beside the office.", "The teachers lounge is beside the office.", "The teachers's lounge is beside the office."],
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
    { phrase: "The stars danced across the night sky.", answer: "The stars seemed to move in a lively way.", distractors: ["The stars were people at a dance.", "The sky was empty.", "The stars made music.", "The night lasted only one minute."], minDifficulty: 5 },
    { phrase: "The test was a mountain to climb.", answer: "The test felt very difficult.", distractors: ["The test was made of rock.", "The class climbed during the test.", "The test was about hiking only.", "The test was easy and flat."], minDifficulty: 6 },
    { phrase: "Her smile was as bright as the sun.", answer: "Her smile seemed very cheerful.", distractors: ["Her smile was dangerous to look at.", "The sun was smiling.", "She stood inside the sun.", "Her smile was cold."], minDifficulty: 6 },
    { phrase: "The alarm clock screamed at 6 a.m.", answer: "The alarm clock made a loud sound.", distractors: ["The clock had a mouth.", "The clock was broken forever.", "The room was silent.", "The clock was asleep."], minDifficulty: 7 },
    { phrase: "The new idea planted a seed in his mind.", answer: "The idea started him thinking.", distractors: ["A real seed was inside his head.", "He forgot the idea immediately.", "The idea was about farming only.", "His mind became a garden."], minDifficulty: 8 },
    { phrase: "The city never sleeps.", answer: "The city stays active all night.", distractors: ["The city is a living person.", "No one in the city owns a bed.", "The city is always quiet.", "The city closes at sunset."], minDifficulty: 8 },
    { phrase: "His words were a bridge between the two groups.", answer: "His words helped the groups understand each other.", distractors: ["His words were made of wood.", "The groups crossed a river.", "He built a real bridge.", "The groups stopped listening."], minDifficulty: 9 },
    { phrase: "The problem snowballed after the first mistake.", answer: "The problem grew larger.", distractors: ["The problem became cold.", "A snowball solved the problem.", "The mistake disappeared.", "The problem turned white."], minDifficulty: 9 },
    { phrase: "The silence was a heavy blanket over the room.", answer: "The room felt very quiet and serious.", distractors: ["A blanket covered every desk.", "The room became warmer.", "The silence made noise.", "The blanket was missing."], minDifficulty: 10 },
  ];

  const TRANSITIONS = [
    { sentence: "I finished my homework. ___, I packed my school bag.", answer: "Next", distractors: ["However", "Because", "Although", "Instead"], minDifficulty: 3 },
    { sentence: "The recipe needed milk. ___, we used water because we had no milk.", answer: "Instead", distractors: ["First", "For example", "Therefore", "Meanwhile"], minDifficulty: 4 },
    { sentence: "The team practiced every day. ___, their passing improved.", answer: "As a result", distractors: ["In contrast", "For example", "Before that", "On the other hand"], minDifficulty: 6 },
    { sentence: "Cats often sleep during the day. ___, dogs often want to play when people are awake.", answer: "In contrast", distractors: ["As a result", "For example", "Meanwhile", "Therefore"], minDifficulty: 7 },
    { sentence: "The claim sounded interesting. ___, it needed stronger evidence.", answer: "However", distractors: ["Therefore", "For instance", "Likewise", "Finally"], minDifficulty: 8 },
    { sentence: "The paragraph gives several examples. ___, it explains how each example supports the main idea.", answer: "Additionally", distractors: ["Nevertheless", "In contrast", "Instead", "Before"], minDifficulty: 9 },
    { sentence: "First, we measured the flour. ___, we added the eggs.", answer: "Next", distractors: ["However", "Because", "Although", "Instead"], minDifficulty: 3 },
    { sentence: "The first plan was too expensive. ___, we chose a simpler one.", answer: "Therefore", distractors: ["For example", "Before", "Similarly", "Meanwhile"], minDifficulty: 5 },
    { sentence: "Lena likes quiet study spaces. ___, her brother likes busy cafes.", answer: "On the other hand", distractors: ["As a result", "For instance", "Likewise", "Finally"], minDifficulty: 6 },
    { sentence: "The paragraph explains the cause. ___, the next paragraph explains the effect.", answer: "Meanwhile", distractors: ["Because", "Instead", "For example", "Although"], minDifficulty: 7 },
    { sentence: "The evidence is limited. ___, the conclusion should be cautious.", answer: "Therefore", distractors: ["For instance", "In contrast", "Earlier", "Likewise"], minDifficulty: 8 },
    { sentence: "The two sources agree on the main fact. ___, they give different explanations for why it happened.", answer: "However", distractors: ["Therefore", "For example", "Similarly", "Next"], minDifficulty: 9 },
    { sentence: "The author gives a reason. ___, she provides statistics that support it.", answer: "Furthermore", distractors: ["Nevertheless", "Instead", "On the other hand", "Beforehand"], minDifficulty: 10 },
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
    {
      prompt: "Which sentence best combines the two ideas?",
      displayText: "The dog barked. The mail carrier walked by.",
      answer: "The dog barked when the mail carrier walked by.",
      distractors: [
        "The dog when barked the mail carrier walked by.",
        "The dog barked the mail carrier walked by.",
        "When the dog walked by, the mail carrier barked.",
        "The mail carrier barked when the dog walked by.",
      ],
      minDifficulty: 4,
    },
    {
      prompt: "Which sentence best combines the two ideas?",
      displayText: "The sidewalk was icy. We walked carefully.",
      answer: "Because the sidewalk was icy, we walked carefully.",
      distractors: [
        "Because we walked carefully, the sidewalk was icy.",
        "The sidewalk was icy we walked carefully.",
        "The sidewalk was icy, we walked carefully because.",
        "We carefully was icy because the sidewalk walked.",
      ],
      minDifficulty: 5,
    },
    {
      prompt: "Which sentence best combines the two ideas?",
      displayText: "Maya finished her chores. She went outside to play.",
      answer: "After Maya finished her chores, she went outside to play.",
      distractors: [
        "After Maya went outside, she finished her chores to play.",
        "Maya finished her chores she went outside to play.",
        "Maya finished, her chores she went outside to play.",
        "She went outside after to play Maya finished chores.",
      ],
      minDifficulty: 6,
    },
    {
      prompt: "Which sentence best combines the two ideas without changing their meaning?",
      displayText: "The library was closing. We still had time to borrow one book.",
      answer: "Although the library was closing, we still had time to borrow one book.",
      distractors: [
        "Because the library was closing, we still had time to borrow one book.",
        "Although we still had time, the book was closing the library.",
        "The library was closing we still had time to borrow one book.",
        "The library was closing, although to borrow one book.",
      ],
      minDifficulty: 8,
    },
    {
      prompt: "Which revision is most concise and clear?",
      displayText: "The reason why the team won was because they practiced every day.",
      answer: "The team won because they practiced every day.",
      distractors: [
        "The reason the team won was because of practicing every day.",
        "Because the team won was the reason they practiced every day.",
        "The team practiced every day winning because reason.",
        "The reason why the team won was due to practicing every day.",
      ],
      minDifficulty: 9,
    },
    {
      prompt: "Which revision is most concise and clear?",
      displayText: "In my opinion, I think the evidence probably shows that the claim may be true.",
      answer: "The evidence suggests that the claim may be true.",
      distractors: [
        "In my opinion, the evidence in my opinion suggests may be true.",
        "I think probably the evidence claim true may be.",
        "The evidence, in my opinion I think, probably shows may be true.",
        "The claim may be evidence that suggests in my opinion.",
      ],
      minDifficulty: 10,
    },
  ];

  const PRONOUN_REFERENCES = [
    { sentence: "Maya gave Noga the pencil because she forgot hers.", question: "The sentence is confusing because 'she' could refer to:", answer: "Maya or Noga", distractors: ["the pencil only", "the teacher only", "the classroom only", "no one"], minDifficulty: 6 },
    { sentence: "When the trophy fell on the shelf, it cracked.", question: "What does 'it' most likely refer to?", answer: "the trophy", distractors: ["the shelf", "the floor", "the wall", "the room"], minDifficulty: 6 },
    { sentence: "Ari told Ben that he should bring a jacket.", question: "Why is this sentence unclear?", answer: "He could mean Ari or Ben.", distractors: ["It has no verb.", "It is missing a capital letter.", "It has no pronoun.", "It is written as a question."], minDifficulty: 7 },
    { sentence: "The scientists labeled the samples before they stored them.", question: "What does 'them' refer to?", answer: "the samples", distractors: ["the labels", "the scientists", "the shelves", "the notebooks"], minDifficulty: 8 },
    { sentence: "When Dana put the book on the table, it wobbled.", question: "Which revision makes the meaning clearer?", answer: "When Dana put the book on the table, the table wobbled.", distractors: ["When Dana put it on the table, it wobbled.", "The book on the table when Dana wobbled.", "When it put the book on Dana, the table wobbled.", "Dana put the book on the table and it."], minDifficulty: 10 },
    { sentence: "Liam handed Noah his notebook before class.", question: "Why is this sentence unclear?", answer: "His could mean Liam's or Noah's.", distractors: ["It has no verb.", "It is missing a noun.", "It has no pronoun.", "It is written in past tense."], minDifficulty: 6 },
    { sentence: "The backpack fell off the chair because it was tilted.", question: "What does 'it' most likely refer to?", answer: "the chair", distractors: ["the backpack", "the floor", "the room", "the zipper"], minDifficulty: 6 },
    { sentence: "Sara told Emma that she had won the contest.", question: "The sentence is confusing because 'she' could refer to:", answer: "Sara or Emma", distractors: ["the contest only", "the judge only", "the prize only", "no one"], minDifficulty: 7 },
    { sentence: "After the students finished the quizzes, they turned them in.", question: "What does 'them' refer to?", answer: "the quizzes", distractors: ["the students", "the desks", "the teachers", "the pencils"], minDifficulty: 8 },
    { sentence: "When the bowl hit the plate, it broke.", question: "Which revision makes the meaning clearer?", answer: "When the bowl hit the plate, the bowl broke.", distractors: ["When it hit the plate, it broke.", "The bowl hit it and broke the plate maybe.", "When the bowl hit the plate, it broke it.", "It broke when it hit it."], minDifficulty: 9 },
    { sentence: "Carlos thanked Mateo because he helped with the project.", question: "Why is this sentence unclear?", answer: "He could mean Carlos or Mateo.", distractors: ["It has too many adjectives.", "It is missing punctuation at the end.", "It contains no subject.", "It is not a complete sentence."], minDifficulty: 10 },
  ];

  const CLAUSES = [
    { sentence: "Because the rain stopped", question: "What is this group of words?", answer: "a dependent clause", distractors: ["a complete sentence", "a compound word", "a proper noun", "an exclamation"], minDifficulty: 7 },
    { sentence: "The rain stopped before lunch.", question: "What is this group of words?", answer: "an independent clause", distractors: ["a dependent clause", "a fragment", "a prefix", "a title"], minDifficulty: 7 },
    { sentence: "Although the puzzle was hard, Gideon solved it.", question: "Which part is the dependent clause?", answer: "Although the puzzle was hard", distractors: ["Gideon solved it", "the puzzle", "was hard, Gideon", "solved it"], minDifficulty: 8 },
    { sentence: "Noga watered the plants, and Gabriel swept the path.", question: "Why is this a compound sentence?", answer: "It joins two complete ideas.", distractors: ["It has no verbs.", "It is missing punctuation.", "It uses only one word.", "It asks a question."], minDifficulty: 9 },
    { sentence: "While the cookies cooled, we cleaned the kitchen and set the table.", question: "Which part explains when the action happened?", answer: "While the cookies cooled", distractors: ["we cleaned", "the kitchen", "set the table", "and"], minDifficulty: 10 },
    { sentence: "After the movie ended", question: "What is this group of words?", answer: "a dependent clause", distractors: ["a complete sentence", "a compound word", "a proper noun", "an interjection"], minDifficulty: 7 },
    { sentence: "The movie ended after dinner.", question: "What is this group of words?", answer: "an independent clause", distractors: ["a dependent clause", "a sentence fragment", "a prefix", "a title"], minDifficulty: 7 },
    { sentence: "Because the road was closed, we took a different route.", question: "Which part is the dependent clause?", answer: "Because the road was closed", distractors: ["we took a different route", "the road", "different route", "was closed, we"], minDifficulty: 8 },
    { sentence: "The lights flickered, but the computer stayed on.", question: "Why is this a compound sentence?", answer: "It joins two complete ideas.", distractors: ["It has only one verb.", "It is a sentence fragment.", "It has no conjunction.", "It asks a question."], minDifficulty: 9 },
    { sentence: "Although the evidence was limited, the claim seemed reasonable.", question: "Which part is the independent clause?", answer: "the claim seemed reasonable", distractors: ["Although the evidence was limited", "Although", "the evidence", "was limited"], minDifficulty: 9 },
    { sentence: "Since the data changed, the scientist revised her conclusion.", question: "Which part explains why the conclusion changed?", answer: "Since the data changed", distractors: ["the scientist", "revised her conclusion", "her conclusion", "the data"], minDifficulty: 10 },
  ];

  const WORD_CHOICE = [
    { prompt: "Which word best shows that the character moved quietly?", sentence: "The child ___ past the sleeping cat.", answer: "tiptoed", distractors: ["stomped", "crashed", "shouted", "bounced"], minDifficulty: 4 },
    { prompt: "Which word has the most positive connotation?", sentence: "The room was ___.", answer: "cozy", distractors: ["cramped", "stuffy", "messy", "dusty"], minDifficulty: 6 },
    { prompt: "Which word best fits an academic explanation?", sentence: "The results ___ the claim.", answer: "support", distractors: ["like", "sort of show", "mess with", "yell"], minDifficulty: 7 },
    { prompt: "Which word best shows a careful, exact look?", sentence: "The scientist ___ the sample under the microscope.", answer: "examined", distractors: ["glanced at", "ignored", "misplaced", "guessed about"], minDifficulty: 8 },
    { prompt: "Which revision uses the most precise word?", sentence: "The bird went across the sky.", answer: "The bird soared across the sky.", distractors: ["The bird did across the sky.", "The bird was across the sky.", "The bird had across the sky.", "The bird made across the sky."], minDifficulty: 9 },
    { prompt: "Which phrase is the most concise?", sentence: "Choose the clearest wording.", answer: "because", distractors: ["due to the fact that", "for the reason that", "on account of the fact that", "in light of the fact that"], minDifficulty: 10 },
    { prompt: "Which word best shows that the character moved quickly?", sentence: "The rabbit ___ across the grass.", answer: "darted", distractors: ["wandered", "crawled", "strolled", "rested"], minDifficulty: 4 },
    { prompt: "Which word best shows that the sound was loud and sudden?", sentence: "The thunder ___ above the house.", answer: "crashed", distractors: ["whispered", "floated", "tiptoed", "glimmered"], minDifficulty: 5 },
    { prompt: "Which word has the most negative connotation?", sentence: "The hallway was ___.", answer: "filthy", distractors: ["busy", "plain", "old", "narrow"], minDifficulty: 6 },
    { prompt: "Which word best fits a formal report?", sentence: "The survey results ___ that students prefer longer recess.", answer: "indicate", distractors: ["kind of say", "yell", "mess around", "go like"], minDifficulty: 7 },
    { prompt: "Which word best shows uncertainty?", sentence: "The answer is ___ because the evidence is incomplete.", answer: "uncertain", distractors: ["definite", "proven", "obvious", "final"], minDifficulty: 8 },
    { prompt: "Which revision uses the most precise word?", sentence: "The speaker talked in a quiet way.", answer: "The speaker whispered.", distractors: ["The speaker did quiet talking.", "The speaker was with quiet words.", "The speaker talked in a way that was quiet.", "The speaker had talked quiet."], minDifficulty: 8 },
    { prompt: "Which word best shows careful evaluation?", sentence: "The judge ___ each entry before choosing a winner.", answer: "assessed", distractors: ["glanced", "misplaced", "ignored", "decorated"], minDifficulty: 9 },
    { prompt: "Which phrase is the clearest and most concise?", sentence: "Choose the best wording.", answer: "now", distractors: ["at this point in time", "at the present moment", "right at this current time", "during this particular moment"], minDifficulty: 9 },
    { prompt: "Which word best fits an analytical essay?", sentence: "The final paragraph ___ the author's main argument.", answer: "reinforces", distractors: ["sort of repeats", "yells about", "messes with", "draws around"], minDifficulty: 10 },
  ];

  const GENERATOR_TYPES = {
    1: ["prefix", "synonym", "antonym", "cloze", "context", "partsOfSpeech", "editing"],
    2: ["prefix", "suffix", "synonym", "antonym", "cloze", "context", "homophone", "editing"],
    3: ["suffix", "root", "homophone", "context", "cloze", "partsOfSpeech", "punctuation", "editing"],
    4: ["root", "homophone", "context", "editing", "sentenceCombining", "wordChoice", "punctuation"],
    5: ["root", "suffix", "context", "figurative", "homophone", "editing", "partsOfSpeech"],
    6: ["prefix", "suffix", "root", "context", "figurative", "transition", "pronounReference", "sentenceCombining", "editing"],
    7: ["prefix", "root", "context", "figurative", "transition", "pronounReference", "clause", "wordChoice", "editing"],
    8: ["prefix", "suffix", "root", "homophone", "context", "clause", "pronounReference", "sentenceCombining", "editing"],
    9: ["prefix", "root", "homophone", "context", "transition", "punctuation", "wordChoice", "sentenceCombining", "editing"],
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
    const usedQuestionKeys = new Set();
    const questionsPerLevel = 16;

    for (let level = 1; level <= 10; level += 1) {
      const types = GENERATOR_TYPES[level] || GENERATOR_TYPES[3];
      const repeatedTypes = Array.from(
        { length: questionsPerLevel },
        (_, index) => types[index % types.length]
      );

      repeatedTypes.forEach((type) => {
        let selectedEntry = null;

        for (let attempt = 0; attempt < 60; attempt += 1) {
          const candidate = GENERATOR_MAP[type](level);
          const candidateKey = `${candidate.difficulty}|${candidate.question}|${candidate.displayText}|${candidate.answer}`;
          if (!usedQuestionKeys.has(candidateKey)) {
            selectedEntry = candidate;
            usedQuestionKeys.add(candidateKey);
            break;
          }
        }

        bank.push(selectedEntry || GENERATOR_MAP[type](level));
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
    { topic: "language-spelling", difficulty: 2, question: "Which word is spelled correctly?", answer: "people", options: ["people", "peple", "peeple", "poeple"] },
    { topic: "language-spelling", difficulty: 3, question: "Which word is spelled correctly?", answer: "enough", options: ["enough", "enuf", "enogh", "eneough"] },
    { topic: "language-spelling", difficulty: 5, question: "Which word is spelled correctly?", answer: "favorite", options: ["favorite", "favrite", "faverite", "favorit"] },
    { topic: "language-spelling", difficulty: 7, question: "Which word is spelled correctly?", answer: "separate", options: ["separate", "seperate", "seprate", "separete"] },
    { topic: "language-syllables", difficulty: 2, question: "How many syllables are in window?", answer: "2", options: ["1", "2", "3", "4"] },
    { topic: "language-syllables", difficulty: 4, question: "How many syllables are in computer?", answer: "3", options: ["2", "3", "4", "5"] },
    { topic: "language-syllables", difficulty: 6, question: "How many syllables are in responsibility?", answer: "6", options: ["4", "5", "6", "7"] },
    { topic: "language-punctuation", difficulty: 3, question: "Which sentence has correct punctuation?", answer: "I fed the dog, washed the bowl, and cleaned the floor.", options: ["I fed the dog, washed the bowl, and cleaned the floor.", "I fed the dog washed, the bowl, and cleaned the floor.", "I fed, the dog washed the bowl and cleaned the floor.", "I fed the dog washed the bowl and cleaned the floor,"] },
    { topic: "language-punctuation", difficulty: 8, question: "Which sentence correctly uses a colon?", answer: "Pack three things: socks, shoes, and a jacket.", options: ["Pack three things: socks, shoes, and a jacket.", "Pack: three things socks, shoes, and a jacket.", "Pack three: things, socks, shoes, and a jacket.", "Pack three things socks: shoes and a jacket."] },
    { topic: "language-capitalization", difficulty: 2, question: "Which sentence has correct capitalization?", answer: "We visited the Dead Sea in July.", options: ["We visited the Dead Sea in July.", "we visited the dead sea in July.", "We visited the dead sea in july.", "we visited the Dead Sea in july."] },
    { topic: "language-capitalization", difficulty: 5, question: "Which title is capitalized correctly?", answer: "A Wrinkle in Time", options: ["A Wrinkle in Time", "A wrinkle in time", "A Wrinkle In Time", "a Wrinkle in Time"] },
    { topic: "language-parts-of-speech", difficulty: 2, question: "Which word is an adjective?", displayText: "The noisy truck stopped outside.", answer: "noisy", options: ["noisy", "truck", "stopped", "outside"] },
    { topic: "language-parts-of-speech", difficulty: 4, question: "Which word is a preposition?", displayText: "The keys are inside the drawer.", answer: "inside", options: ["keys", "are", "inside", "drawer"] },
    { topic: "language-prefixes", difficulty: 5, question: "What does the prefix sub- mean in submarine?", answer: "under", options: ["under", "above", "again", "many"] },
    { topic: "language-prefixes", difficulty: 8, question: "What does the prefix inter- mean in international?", answer: "between or among", options: ["between or among", "not", "before", "too much"] },
    { topic: "language-suffixes", difficulty: 5, question: "What does the suffix -ment mean in movement?", answer: "result or act of", options: ["result or act of", "without", "one who", "before"] },
    { topic: "language-suffixes", difficulty: 8, question: "What does the suffix -ology mean in biology?", answer: "study of", options: ["study of", "fear of", "full of", "able to be"] },
    { topic: "language-roots", difficulty: 6, question: "What does the root port mean in transport?", answer: "carry", options: ["carry", "write", "see", "measure"] },
    { topic: "language-roots", difficulty: 9, question: "What does the root spect mean in inspect?", answer: "look or see", options: ["look or see", "carry", "sound", "water"] },
    { topic: "language-sentence-combining", difficulty: 5, question: "Which sentence combines the ideas best?", displayText: "The lights went out. We used flashlights.", answer: "When the lights went out, we used flashlights.", options: ["When the lights went out, we used flashlights.", "The lights went out we used flashlights.", "We used the lights when flashlights went out.", "When flashlights went out, we used the lights."] },
    { topic: "language-sentence-combining", difficulty: 8, question: "Which sentence combines the ideas best?", displayText: "The evidence was strong. The judge accepted the claim.", answer: "Because the evidence was strong, the judge accepted the claim.", options: ["Because the evidence was strong, the judge accepted the claim.", "The evidence accepted because the judge was strong.", "Because the judge was strong, the evidence accepted the claim.", "The evidence was strong the judge accepted the claim."] },
    { topic: "language-word-choice", difficulty: 6, question: "Which word is most precise?", displayText: "The horse moved quickly across the field.", answer: "galloped", options: ["galloped", "went", "did", "was"] },
    { topic: "language-word-choice", difficulty: 9, question: "Which phrase is the most concise?", answer: "although", options: ["although", "despite the fact that", "regardless of the fact that", "even with the circumstance that"] },
  ];

  function createSupplementalVocabularyGrammarEntry(difficulty) {
    const level = Math.max(1, Math.min(10, Number.parseInt(difficulty, 10) || 3));
    const choices = vocabularyGrammarSupplementalBlueprints.filter((item) => item.difficulty <= level);
    return entry(randomChoice(choices));
  }

  globalThis.createVocabularyGrammarSupplementalGeneratedEntry = (difficulty) =>
    pickGeneratedEntry([createSupplementalVocabularyGrammarEntry], difficulty);
})();

globalThis.HomeworkQuestions?.register({
  id: "vocabulary-grammar",
  label: "Vocabulary / Grammar",
  getStaticQuestions: () => VOCABULARY_GRAMMAR_QUESTIONS,
  generatedEntryFactory: createVocabularyGrammarGeneratedEntry,
  supplementalGeneratedEntryFactory: globalThis.createVocabularyGrammarSupplementalGeneratedEntry,
  generatedShare: 0.85,
  supplementalShare: 0.45,
  supportsDrag: true,
});

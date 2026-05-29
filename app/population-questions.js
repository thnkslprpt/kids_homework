const POPULATION_QUESTIONS = [
  {
    question: "About how many people live in India?",
    options: ["About 900 million", "About 1.1 billion", "About 1.5 billion", "About 2 billion"],
    answer: "About 1.5 billion",
    difficulty: 1,
  },
  {
    question: "About how many people live in China?",
    options: ["About 800 million", "About 1 billion", "About 1.4 billion", "About 1.8 billion"],
    answer: "About 1.4 billion",
    difficulty: 2,
  },
  {
    question: "About how many people live in Israel?",
    options: ["About 1 million", "About 10 million", "About 50 million", "About 100 million"],
    answer: "About 10 million",
    difficulty: 1,
  },
  {
    question: "About how many people live in Indonesia?",
    options: ["About 70 million", "About 150 million", "About 290 million", "About 600 million"],
    answer: "About 290 million",
    difficulty: 2,
  },
  {
    question: "About how many people live in Pakistan?",
    options: ["About 80 million", "About 140 million", "About 260 million", "About 500 million"],
    answer: "About 260 million",
    difficulty: 3,
  },
  {
    question: "About how many people live in Nigeria?",
    options: ["About 60 million", "About 130 million", "About 240 million", "About 430 million"],
    answer: "About 240 million",
    difficulty: 4,
  },
  {
    question: "About how many people live in Brazil?",
    options: ["About 50 million", "About 110 million", "About 210 million", "About 410 million"],
    answer: "About 210 million",
    difficulty: 3,
  },
  {
    question: "About how many people live in Bangladesh?",
    options: ["About 40 million", "About 100 million", "About 180 million", "About 350 million"],
    answer: "About 180 million",
    difficulty: 4,
  },
  {
    question: "About how many people live in Russia?",
    options: ["About 30 million", "About 80 million", "About 140 million", "About 280 million"],
    answer: "About 140 million",
    difficulty: 5,
  },
  {
    question: "About how many people live in Ethiopia?",
    options: ["About 20 million", "About 70 million", "About 140 million", "About 260 million"],
    answer: "About 140 million",
    difficulty: 6,
  },
  {
    question: "About how many people live in Mexico?",
    options: ["About 40 million", "About 90 million", "About 130 million", "About 250 million"],
    answer: "About 130 million",
    difficulty: 5,
  },
  {
    question: "About how many people live in Japan?",
    options: ["About 30 million", "About 70 million", "About 120 million", "About 230 million"],
    answer: "About 120 million",
    difficulty: 6,
  },
  {
    question: "About how many people live in Egypt?",
    options: ["About 20 million", "About 60 million", "About 120 million", "About 220 million"],
    answer: "About 120 million",
    difficulty: 7,
  },
  {
    question: "About how many people live in the Philippines?",
    options: ["About 20 million", "About 80 million", "About 120 million", "About 240 million"],
    answer: "About 120 million",
    difficulty: 8,
  },
  {
    question: "About how many people live in the Democratic Republic of the Congo?",
    options: ["About 30 million", "About 70 million", "About 120 million", "About 230 million"],
    answer: "About 120 million",
    difficulty: 7,
  },
  {
    question: "About how many people live in Vietnam?",
    options: ["About 20 million", "About 50 million", "About 100 million", "About 200 million"],
    answer: "About 100 million",
    difficulty: 8,
  },
  {
    question: "About how many people live in Iran?",
    options: ["About 10 million", "About 40 million", "About 90 million", "About 170 million"],
    answer: "About 90 million",
    difficulty: 9,
  },
  {
    question: "About how many people live in Turkey?",
    options: ["About 20 million", "About 50 million", "About 90 million", "About 190 million"],
    answer: "About 90 million",
    difficulty: 10,
  },
  {
    question: "About how many people live in Germany?",
    options: ["About 20 million", "About 40 million", "About 80 million", "About 170 million"],
    answer: "About 80 million",
    difficulty: 9,
  },
  {
    question: "About how many people live in Tanzania?",
    options: ["About 10 million", "About 30 million", "About 70 million", "About 150 million"],
    answer: "About 70 million",
    difficulty: 10,
  },
  {
    question: "About how many people live in Jordan?",
    options: ["About 4 million", "About 11 million", "About 30 million", "About 70 million"],
    answer: "About 11 million",
    difficulty: 9,
  },
  {
    question: "About how many people live in Lebanon?",
    options: ["About 2 million", "About 6 million", "About 20 million", "About 50 million"],
    answer: "About 6 million",
    difficulty: 10,
  },
];

POPULATION_QUESTIONS.push(
  ...[
    {
      question: "About how many people live in Myanmar?",
      options: ["About 20 million", "About 60 million", "About 120 million", "About 240 million"],
      answer: "About 60 million",
      difficulty: 1,
    },
    {
      question: "About how many people live in South Korea?",
      options: ["About 20 million", "About 50 million", "About 100 million", "About 200 million"],
      answer: "About 50 million",
      difficulty: 2,
    },
    {
      question: "About how many people live in Colombia?",
      options: ["About 20 million", "About 50 million", "About 110 million", "About 220 million"],
      answer: "About 50 million",
      difficulty: 1,
    },
    {
      question: "About how many people live in South Africa?",
      options: ["About 20 million", "About 60 million", "About 130 million", "About 250 million"],
      answer: "About 60 million",
      difficulty: 2,
    },
    {
      question: "About how many people live in Sudan?",
      options: ["About 20 million", "About 50 million", "About 100 million", "About 220 million"],
      answer: "About 50 million",
      difficulty: 3,
    },
    {
      question: "About how many people live in Algeria?",
      options: ["About 20 million", "About 50 million", "About 110 million", "About 210 million"],
      answer: "About 50 million",
      difficulty: 4,
    },
    {
      question: "About how many people live in Canada?",
      options: ["About 10 million", "About 40 million", "About 100 million", "About 220 million"],
      answer: "About 40 million",
      difficulty: 3,
    },
    {
      question: "About how many people live in Poland?",
      options: ["About 10 million", "About 40 million", "About 90 million", "About 180 million"],
      answer: "About 40 million",
      difficulty: 4,
    },
    {
      question: "About how many people live in Morocco?",
      options: ["About 10 million", "About 40 million", "About 90 million", "About 170 million"],
      answer: "About 40 million",
      difficulty: 5,
    },
    {
      question: "About how many people live in Saudi Arabia?",
      options: ["About 10 million", "About 40 million", "About 90 million", "About 200 million"],
      answer: "About 40 million",
      difficulty: 6,
    },
    {
      question: "About how many people live in Uzbekistan?",
      options: ["About 10 million", "About 40 million", "About 80 million", "About 160 million"],
      answer: "About 40 million",
      difficulty: 5,
    },
    {
      question: "About how many people live in Peru?",
      options: ["About 10 million", "About 30 million", "About 70 million", "About 150 million"],
      answer: "About 30 million",
      difficulty: 6,
    },
    {
      question: "About how many people live in Malaysia?",
      options: ["About 10 million", "About 30 million", "About 70 million", "About 140 million"],
      answer: "About 30 million",
      difficulty: 7,
    },
    {
      question: "About how many people live in Venezuela?",
      options: ["About 10 million", "About 30 million", "About 70 million", "About 140 million"],
      answer: "About 30 million",
      difficulty: 8,
    },
    {
      question: "About how many people live in Afghanistan?",
      options: ["About 10 million", "About 40 million", "About 80 million", "About 160 million"],
      answer: "About 40 million",
      difficulty: 7,
    },
    {
      question: "About how many people live in Yemen?",
      options: ["About 10 million", "About 40 million", "About 80 million", "About 170 million"],
      answer: "About 40 million",
      difficulty: 8,
    },
    {
      question: "About how many people live in Uganda?",
      options: ["About 20 million", "About 50 million", "About 100 million", "About 220 million"],
      answer: "About 50 million",
      difficulty: 9,
    },
    {
      question: "About how many people live in Australia?",
      options: ["About 10 million", "About 30 million", "About 80 million", "About 150 million"],
      answer: "About 30 million",
      difficulty: 10,
    },
    {
      question: "About how many people live in Kenya?",
      options: ["About 20 million", "About 50 million", "About 100 million", "About 200 million"],
      answer: "About 50 million",
      difficulty: 9,
    },
    {
      question: "About how many people live in Iraq?",
      options: ["About 10 million", "About 40 million", "About 80 million", "About 160 million"],
      answer: "About 40 million",
      difficulty: 10,
    },
  ]
);

// Population estimates aligned to the 2026-03-24 Worldometer snapshot
// (based on U.N. World Population Prospects 2024 Revision data).
const POPULATION_GENERATION_DATA = [
  { country: "India", population: 1_476_625_576 },
  { country: "China", population: 1_412_914_089 },
  { country: "Israel", population: 9_647_689 },
  { country: "Indonesia", population: 287_886_782 },
  { country: "Pakistan", population: 259_299_791 },
  { country: "Nigeria", population: 242_431_832 },
  { country: "Brazil", population: 213_562_666 },
  { country: "Bangladesh", population: 177_818_044 },
  { country: "Russia", population: 143_394_458 },
  { country: "Mexico", population: 132_997_658 },
  { country: "Japan", population: 122_427_731 },
  { country: "Ethiopia", population: 138_902_185 },
  { country: "Egypt", population: 120_101_175 },
  { country: "Philippines", population: 117_724_471 },
  { country: "DR Congo", population: 116_452_162 },
  { country: "Vietnam", population: 102_177_431 },
  { country: "Iran", population: 93_168_497 },
  { country: "Turkey", population: 87_926_082 },
  { country: "Germany", population: 83_644_258 },
  { country: "Tanzania", population: 72_563_780 },
  { country: "Myanmar", population: 55_184_819 },
  { country: "South Korea", population: 51_600_388 },
  { country: "Colombia", population: 53_936_226 },
  { country: "South Africa", population: 65_453_084 },
  { country: "Canada", population: 40_467_728 },
  { country: "Australia", population: 27_227_096 },
  { country: "Kenya", population: 58_636_412 },
  { country: "Iraq", population: 48_007_437 },
  { country: "Jordan", population: 11_520_684 },
  { country: "Lebanon", population: 5_849_053 },
  { country: "Peru", population: 34_922_148 },
  { country: "Malaysia", population: 36_385_115 },
  { country: "Venezuela", population: 28_633_711 },
  { country: "Afghanistan", population: 45_047_069 },
  { country: "Yemen", population: 42_961_653 },
  { country: "Uganda", population: 52_761_469 },
  { country: "Sudan", population: 53_282_719 },
  { country: "Algeria", population: 48_028_334 },
  { country: "Poland", population: 37_843_188 },
  { country: "Morocco", population: 38_762_441 },
  { country: "Saudi Arabia", population: 35_165_787 },
  { country: "Uzbekistan", population: 37_724_223 },
];
const POPULATION_QUESTION_COUNTRY_ALIASES = {
  "democratic republic of the congo": "DR Congo",
};
const POPULATION_MAX_DIFFICULTY = 10;
const POPULATION_ESTIMATE_MIN_OPTION_GAP_RATIO = 0.4;
const POPULATION_ESTIMATE_FALLBACK_MULTIPLIERS = [
  0.08,
  0.12,
  0.18,
  0.28,
  0.42,
  0.58,
  0.75,
  1.25,
  1.6,
  2.1,
  2.8,
  3.8,
  5.2,
  7,
];

function createPopulationGeneratedEntry(difficulty) {
  const level = clampDifficulty(difficulty);
  const questionType = pickPopulationQuestionType(level);

  if (questionType === "compare") {
    return buildPopulationComparisonQuestion(level);
  }

  if (questionType === "largest") {
    return buildPopulationRankingQuestion(level);
  }

  if (questionType === "closest") {
    return buildPopulationClosestQuestion(level);
  }

  return buildPopulationEstimateQuestion(level);
}

function buildPopulationEstimateQuestion(difficulty) {
  const entry = pickPopulationEntryByDifficulty(difficulty);
  const options = buildPopulationEstimateOptions(entry, difficulty);
  return {
    question: `About how many people live in ${entry.country}?`,
    options,
    answer: entry.label,
    difficulty,
  };
}

function buildPopulationComparisonQuestion(difficulty) {
  const [first, second] = pickTwoPopulationEntries(difficulty);
  const bigger = first.population >= second.population ? first : second;
  const smaller = bigger === first ? second : first;
  return {
    question: `Which country has more people, ${first.country} or ${second.country}?`,
    options: shuffleLocal([
      bigger.country,
      smaller.country,
      "They are equal",
      "There is not enough information",
    ]),
    answer: bigger.country,
    difficulty,
  };
}

function buildPopulationRankingQuestion(difficulty) {
  const countries = pickDistinctPopulationEntries(4, difficulty).sort(
    (left, right) => right.population - left.population
  );
  return {
    question: "Which country has the largest population?",
    options: shuffleLocal(countries.map((entry) => entry.country)),
    answer: countries[0].country,
    difficulty,
  };
}

function buildPopulationClosestQuestion(difficulty) {
  const reference = pickPopulationEntryByDifficulty(difficulty);
  const target = roundPopulationForDifficulty(reference.population, difficulty);
  const answerDistance = Math.abs(reference.population - target);
  const distractors = buildPopulationClosestDistractors(reference, target, answerDistance, difficulty);

  return {
    question: `Which country is closest to about ${formatPopulationTarget(target)} people?`,
    options: shuffleLocal([reference.country, ...distractors.map((entry) => entry.country)]),
    answer: reference.country,
    difficulty,
  };
}

function buildPopulationClosestDistractors(reference, target, answerDistance, difficulty) {
  const preferredPool = POPULATION_GENERATION_DATA.filter(
    (entry) =>
      entry.country !== reference.country &&
      difficultyMatchesPopulation(entry, difficulty) &&
      Math.abs(entry.population - target) > answerDistance
  );
  const fallbackPool = POPULATION_GENERATION_DATA.filter(
    (entry) => entry.country !== reference.country && Math.abs(entry.population - target) > answerDistance
  );

  return dedupePopulationEntries([...preferredPool, ...fallbackPool])
    .sort(
      (left, right) => Math.abs(left.population - target) - Math.abs(right.population - target)
    )
    .slice(0, 3);
}

function buildPopulationEstimateOptions(entry, difficulty) {
  return buildPopulationEstimateOptionsForValue(entry.population, entry.label, difficulty);
}

function buildPopulationEstimateOptionsForValue(answerPopulation, answerLabel, difficulty) {
  const displayedAnswerPopulation = parsePopulationApproximateLabel(answerLabel) || answerPopulation;
  const selected = [{ label: answerLabel, population: displayedAnswerPopulation }];
  const candidates = buildPopulationEstimateCandidatePool(answerPopulation, answerLabel, difficulty);

  for (const candidate of candidates) {
    if (selected.every((option) => hasPopulationOptionMinimumGap(option.population, candidate.population))) {
      selected.push(candidate);
    }
    if (selected.length === 4) {
      break;
    }
  }

  return shuffleLocal(selected.slice(0, 4).map((option) => option.label));
}

function buildPopulationEstimateCandidatePool(answerPopulation, answerLabel, difficulty) {
  const candidates = [];
  const sameDifficultyPool = POPULATION_GENERATION_DATA.filter(
    (entry) =>
      difficultyMatchesPopulation(entry, difficulty) &&
      entry.label !== answerLabel &&
      entry.population !== answerPopulation
  );
  const fullPool = POPULATION_GENERATION_DATA.filter(
    (entry) => entry.label !== answerLabel && entry.population !== answerPopulation
  );

  sameDifficultyPool.forEach((entry) => {
    const displayedPopulation = parsePopulationApproximateLabel(entry.label) || entry.population;
    candidates.push({
      label: entry.label,
      population: displayedPopulation,
      distance: Math.abs(displayedPopulation - answerPopulation),
      priority: 0,
    });
  });

  fullPool.forEach((entry) => {
    const displayedPopulation = parsePopulationApproximateLabel(entry.label) || entry.population;
    candidates.push({
      label: entry.label,
      population: displayedPopulation,
      distance: Math.abs(displayedPopulation - answerPopulation),
      priority: 1,
    });
  });

  POPULATION_ESTIMATE_FALLBACK_MULTIPLIERS.forEach((multiplier) => {
    const population = roundPopulationEstimateCandidate(answerPopulation * multiplier);
    const label = formatPopulationValue(population);
    if (label === answerLabel || population === answerPopulation) {
      return;
    }
    candidates.push({
      label,
      population,
      distance: Math.abs(population - answerPopulation),
      priority: 2,
    });
  });

  return dedupePopulationEstimateCandidates(candidates).sort((left, right) => {
    if (left.priority !== right.priority) {
      return left.priority - right.priority;
    }
    return left.distance - right.distance;
  });
}

function dedupePopulationEstimateCandidates(candidates) {
  const seen = new Set();
  const unique = [];

  for (const candidate of candidates) {
    if (!candidate || !candidate.label || candidate.population <= 0 || seen.has(candidate.label)) {
      continue;
    }
    seen.add(candidate.label);
    unique.push(candidate);
  }

  return unique;
}

function hasPopulationOptionMinimumGap(firstPopulation, secondPopulation) {
  const smaller = Math.min(firstPopulation, secondPopulation);
  const larger = Math.max(firstPopulation, secondPopulation);
  return (larger - smaller) / smaller >= POPULATION_ESTIMATE_MIN_OPTION_GAP_RATIO;
}

function parsePopulationApproximateLabel(label) {
  const match = String(label).trim().match(/^About\s+([\d.]+)\s+(million|billion)$/i);
  if (!match) {
    return null;
  }

  const value = Number(match[1]);
  if (!Number.isFinite(value) || value <= 0) {
    return null;
  }

  return match[2].toLowerCase() === "billion" ? value * 1_000_000_000 : value * 1_000_000;
}

function roundPopulationEstimateCandidate(value) {
  if (!Number.isFinite(value) || value <= 0) {
    return 1_000_000;
  }

  if (value >= 1_000_000_000) {
    return Math.max(100_000_000, Math.round(value / 100_000_000) * 100_000_000);
  }

  return Math.max(1_000_000, Math.round(value / 1_000_000) * 1_000_000);
}

function normalizePopulationEstimateQuestionSet() {
  POPULATION_QUESTIONS.forEach((entry) => {
    const answerPopulation = parsePopulationApproximateLabel(entry.answer);
    if (!answerPopulation) {
      return;
    }
    entry.options = buildPopulationEstimateOptionsForValue(
      answerPopulation,
      entry.answer,
      clampDifficulty(entry.difficulty)
    );
  });
}

function pickPopulationQuestionType(difficulty) {
  if (difficulty <= 4) {
    return randomChoiceLocal(["estimate", "compare", "estimate"]);
  }

  if (difficulty <= 6) {
    return randomChoiceLocal(["estimate", "compare", "closest"]);
  }

  return randomChoiceLocal(["estimate", "compare", "closest", "largest"]);
}

function pickPopulationEntryByDifficulty(difficulty) {
  const pool = POPULATION_GENERATION_DATA.filter((entry) => difficultyMatchesPopulation(entry, difficulty));
  return randomChoiceLocal(pool.length ? pool : POPULATION_GENERATION_DATA);
}

function pickDistinctPopulationEntries(count, difficulty) {
  const pool = POPULATION_GENERATION_DATA.filter((entry) => difficultyMatchesPopulation(entry, difficulty));
  const source = pool.length >= count ? pool : POPULATION_GENERATION_DATA;
  return shuffleLocal(source).slice(0, count);
}

function pickTwoPopulationEntries(difficulty) {
  const pool = POPULATION_GENERATION_DATA.filter((entry) => difficultyMatchesPopulation(entry, difficulty));
  const source = pool.length >= 2 ? pool : POPULATION_GENERATION_DATA;
  const shuffled = shuffleLocal(source);
  return [shuffled[0], shuffled[1]];
}

function difficultyMatchesPopulation(entry, difficulty) {
  if (difficulty <= 4) {
    return entry.population >= 60_000_000;
  }
  if (difficulty <= 6) {
    return entry.population >= 10_000_000 && entry.population <= 160_000_000;
  }
  return entry.population <= 120_000_000;
}

function roundPopulationForDifficulty(population, difficulty) {
  if (difficulty <= 2) {
    return Math.round(population / 10_000_000) * 10_000_000;
  }
  if (difficulty <= 4) {
    return Math.round(population / 5_000_000) * 5_000_000;
  }
  if (difficulty <= 6) {
    return Math.round(population / 2_000_000) * 2_000_000;
  }
  if (difficulty <= 8) {
    return Math.round(population / 1_000_000) * 1_000_000;
  }
  return Math.round(population / 500_000) * 500_000;
}

function formatPopulationTarget(value) {
  if (value >= 1_000_000_000) {
    const billions = value / 1_000_000_000;
    return `${billions % 1 === 0 ? billions.toFixed(0) : billions.toFixed(1)} billion`;
  }
  return `${Math.round(value / 1_000_000)} million`;
}

function formatPopulationValue(value) {
  if (value >= 1_000_000_000) {
    const billions = value / 1_000_000_000;
    return `About ${billions % 1 === 0 ? billions.toFixed(0) : billions.toFixed(1)} billion`;
  }
  return `About ${Math.round(value / 1_000_000)} million`;
}

function normalizePopulationGenerationData() {
  POPULATION_GENERATION_DATA.forEach((entry) => {
    entry.label = formatPopulationValue(entry.population);
  });
}

function normalizePopulationCountryName(value) {
  return String(value).toLowerCase().replace(/\./g, "").replace(/\s+/g, " ").trim();
}

function syncPopulationEstimateQuestionAnswers() {
  const generationDataByCountry = new Map(
    POPULATION_GENERATION_DATA.map((entry) => [normalizePopulationCountryName(entry.country), entry])
  );

  POPULATION_QUESTIONS.forEach((entry) => {
    const match = String(entry.question).match(/^About how many people live in (.+)\?$/);
    if (!match) {
      return;
    }

    const rawCountry = normalizePopulationCountryName(match[1]).replace(/^the\s+/, "");
    const countryKey = normalizePopulationCountryName(
      POPULATION_QUESTION_COUNTRY_ALIASES[rawCountry] || rawCountry
    );
    const currentEntry = generationDataByCountry.get(countryKey);

    if (currentEntry) {
      entry.answer = currentEntry.label;
    }
  });
}

normalizePopulationGenerationData();
syncPopulationEstimateQuestionAnswers();
normalizePopulationEstimateQuestionSet();

function dedupePopulationEntries(entries) {
  const seen = new Set();
  const unique = [];
  for (const entry of entries) {
    if (!entry || seen.has(entry.country)) {
      continue;
    }
    seen.add(entry.country);
    unique.push(entry);
  }
  return unique;
}

function shuffleLocal(values) {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = randomIntLocal(0, index);
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function randomChoiceLocal(values) {
  return values[randomIntLocal(0, values.length - 1)];
}

function randomIntLocal(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clampDifficulty(value) {
  const numeric = Number(value);
  if (!Number.isInteger(numeric)) {
    return 3;
  }
  return Math.min(10, Math.max(1, numeric));
}

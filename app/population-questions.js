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
    difficulty: 1,
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
    difficulty: 1,
  },
  {
    question: "About how many people live in Pakistan?",
    options: ["About 80 million", "About 140 million", "About 260 million", "About 500 million"],
    answer: "About 260 million",
    difficulty: 2,
  },
  {
    question: "About how many people live in Nigeria?",
    options: ["About 60 million", "About 130 million", "About 240 million", "About 430 million"],
    answer: "About 240 million",
    difficulty: 2,
  },
  {
    question: "About how many people live in Brazil?",
    options: ["About 50 million", "About 110 million", "About 210 million", "About 410 million"],
    answer: "About 210 million",
    difficulty: 2,
  },
  {
    question: "About how many people live in Bangladesh?",
    options: ["About 40 million", "About 100 million", "About 180 million", "About 350 million"],
    answer: "About 180 million",
    difficulty: 2,
  },
  {
    question: "About how many people live in Russia?",
    options: ["About 30 million", "About 80 million", "About 140 million", "About 280 million"],
    answer: "About 140 million",
    difficulty: 3,
  },
  {
    question: "About how many people live in Ethiopia?",
    options: ["About 20 million", "About 70 million", "About 140 million", "About 260 million"],
    answer: "About 140 million",
    difficulty: 3,
  },
  {
    question: "About how many people live in Mexico?",
    options: ["About 40 million", "About 90 million", "About 130 million", "About 250 million"],
    answer: "About 130 million",
    difficulty: 3,
  },
  {
    question: "About how many people live in Japan?",
    options: ["About 30 million", "About 70 million", "About 120 million", "About 230 million"],
    answer: "About 120 million",
    difficulty: 3,
  },
  {
    question: "About how many people live in Egypt?",
    options: ["About 20 million", "About 60 million", "About 120 million", "About 220 million"],
    answer: "About 120 million",
    difficulty: 4,
  },
  {
    question: "About how many people live in the Philippines?",
    options: ["About 20 million", "About 80 million", "About 120 million", "About 240 million"],
    answer: "About 120 million",
    difficulty: 4,
  },
  {
    question: "About how many people live in the Democratic Republic of the Congo?",
    options: ["About 30 million", "About 70 million", "About 120 million", "About 230 million"],
    answer: "About 120 million",
    difficulty: 4,
  },
  {
    question: "About how many people live in Vietnam?",
    options: ["About 20 million", "About 50 million", "About 100 million", "About 200 million"],
    answer: "About 100 million",
    difficulty: 4,
  },
  {
    question: "About how many people live in Iran?",
    options: ["About 10 million", "About 40 million", "About 90 million", "About 170 million"],
    answer: "About 90 million",
    difficulty: 5,
  },
  {
    question: "About how many people live in Turkey?",
    options: ["About 20 million", "About 50 million", "About 90 million", "About 190 million"],
    answer: "About 90 million",
    difficulty: 5,
  },
  {
    question: "About how many people live in Germany?",
    options: ["About 20 million", "About 40 million", "About 80 million", "About 170 million"],
    answer: "About 80 million",
    difficulty: 5,
  },
  {
    question: "About how many people live in Tanzania?",
    options: ["About 10 million", "About 30 million", "About 70 million", "About 150 million"],
    answer: "About 70 million",
    difficulty: 5,
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
      difficulty: 1,
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
      difficulty: 1,
    },
    {
      question: "About how many people live in Sudan?",
      options: ["About 20 million", "About 50 million", "About 100 million", "About 220 million"],
      answer: "About 50 million",
      difficulty: 2,
    },
    {
      question: "About how many people live in Algeria?",
      options: ["About 20 million", "About 50 million", "About 110 million", "About 210 million"],
      answer: "About 50 million",
      difficulty: 2,
    },
    {
      question: "About how many people live in Canada?",
      options: ["About 10 million", "About 40 million", "About 100 million", "About 220 million"],
      answer: "About 40 million",
      difficulty: 2,
    },
    {
      question: "About how many people live in Poland?",
      options: ["About 10 million", "About 40 million", "About 90 million", "About 180 million"],
      answer: "About 40 million",
      difficulty: 2,
    },
    {
      question: "About how many people live in Morocco?",
      options: ["About 10 million", "About 40 million", "About 90 million", "About 170 million"],
      answer: "About 40 million",
      difficulty: 3,
    },
    {
      question: "About how many people live in Saudi Arabia?",
      options: ["About 10 million", "About 40 million", "About 90 million", "About 200 million"],
      answer: "About 40 million",
      difficulty: 3,
    },
    {
      question: "About how many people live in Uzbekistan?",
      options: ["About 10 million", "About 40 million", "About 80 million", "About 160 million"],
      answer: "About 40 million",
      difficulty: 3,
    },
    {
      question: "About how many people live in Peru?",
      options: ["About 10 million", "About 30 million", "About 70 million", "About 150 million"],
      answer: "About 30 million",
      difficulty: 3,
    },
    {
      question: "About how many people live in Malaysia?",
      options: ["About 10 million", "About 30 million", "About 70 million", "About 140 million"],
      answer: "About 30 million",
      difficulty: 4,
    },
    {
      question: "About how many people live in Venezuela?",
      options: ["About 10 million", "About 30 million", "About 70 million", "About 140 million"],
      answer: "About 30 million",
      difficulty: 4,
    },
    {
      question: "About how many people live in Afghanistan?",
      options: ["About 10 million", "About 40 million", "About 80 million", "About 160 million"],
      answer: "About 40 million",
      difficulty: 4,
    },
    {
      question: "About how many people live in Yemen?",
      options: ["About 10 million", "About 40 million", "About 80 million", "About 170 million"],
      answer: "About 40 million",
      difficulty: 4,
    },
    {
      question: "About how many people live in Uganda?",
      options: ["About 20 million", "About 50 million", "About 100 million", "About 220 million"],
      answer: "About 50 million",
      difficulty: 5,
    },
    {
      question: "About how many people live in Australia?",
      options: ["About 10 million", "About 30 million", "About 80 million", "About 150 million"],
      answer: "About 30 million",
      difficulty: 5,
    },
    {
      question: "About how many people live in Kenya?",
      options: ["About 20 million", "About 50 million", "About 100 million", "About 200 million"],
      answer: "About 50 million",
      difficulty: 5,
    },
    {
      question: "About how many people live in Iraq?",
      options: ["About 10 million", "About 40 million", "About 80 million", "About 160 million"],
      answer: "About 40 million",
      difficulty: 5,
    },
  ]
);

const POPULATION_GENERATION_DATA = [
  { country: "India", population: 1_430_000_000, label: "About 1.43 billion" },
  { country: "China", population: 1_410_000_000, label: "About 1.41 billion" },
  { country: "Israel", population: 10_000_000, label: "About 10 million" },
  { country: "Indonesia", population: 280_000_000, label: "About 280 million" },
  { country: "Pakistan", population: 240_000_000, label: "About 240 million" },
  { country: "Nigeria", population: 230_000_000, label: "About 230 million" },
  { country: "Brazil", population: 215_000_000, label: "About 215 million" },
  { country: "Bangladesh", population: 173_000_000, label: "About 173 million" },
  { country: "Russia", population: 144_000_000, label: "About 144 million" },
  { country: "Mexico", population: 129_000_000, label: "About 129 million" },
  { country: "Japan", population: 123_000_000, label: "About 123 million" },
  { country: "Ethiopia", population: 128_000_000, label: "About 128 million" },
  { country: "Egypt", population: 112_000_000, label: "About 112 million" },
  { country: "Philippines", population: 117_000_000, label: "About 117 million" },
  { country: "DR Congo", population: 102_000_000, label: "About 102 million" },
  { country: "Vietnam", population: 100_000_000, label: "About 100 million" },
  { country: "Iran", population: 89_000_000, label: "About 89 million" },
  { country: "Turkey", population: 85_000_000, label: "About 85 million" },
  { country: "Germany", population: 83_000_000, label: "About 83 million" },
  { country: "Tanzania", population: 67_000_000, label: "About 67 million" },
  { country: "Myanmar", population: 54_000_000, label: "About 54 million" },
  { country: "South Korea", population: 51_000_000, label: "About 51 million" },
  { country: "Colombia", population: 52_000_000, label: "About 52 million" },
  { country: "South Africa", population: 60_000_000, label: "About 60 million" },
  { country: "Canada", population: 40_000_000, label: "About 40 million" },
  { country: "Australia", population: 27_000_000, label: "About 27 million" },
  { country: "Kenya", population: 55_000_000, label: "About 55 million" },
  { country: "Iraq", population: 45_000_000, label: "About 45 million" },
  { country: "Peru", population: 34_000_000, label: "About 34 million" },
  { country: "Malaysia", population: 34_000_000, label: "About 34 million" },
  { country: "Venezuela", population: 29_000_000, label: "About 29 million" },
  { country: "Afghanistan", population: 42_000_000, label: "About 42 million" },
  { country: "Yemen", population: 35_000_000, label: "About 35 million" },
  { country: "Uganda", population: 49_000_000, label: "About 49 million" },
  { country: "Sudan", population: 48_000_000, label: "About 48 million" },
  { country: "Algeria", population: 46_000_000, label: "About 46 million" },
  { country: "Poland", population: 38_000_000, label: "About 38 million" },
  { country: "Morocco", population: 37_000_000, label: "About 37 million" },
  { country: "Saudi Arabia", population: 36_000_000, label: "About 36 million" },
  { country: "Uzbekistan", population: 36_000_000, label: "About 36 million" },
];
const POPULATION_MAX_DIFFICULTY = 3;
const POPULATION_ESTIMATE_MIN_OPTION_GAP_RATIO = 0.25;
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
  const level = Math.min(clampDifficulty(difficulty), POPULATION_MAX_DIFFICULTY);
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
  const target = generateRoundedTarget(reference.population, difficulty);
  const candidates = dedupePopulationEntries([
    reference,
    ...pickDistinctPopulationEntries(4, difficulty),
  ]).sort((left, right) => Math.abs(left.population - target) - Math.abs(right.population - target));

  return {
    question: `Which country is closest to about ${formatPopulationTarget(target)} people?`,
    options: shuffleLocal(candidates.slice(0, 4).map((entry) => entry.country)),
    answer: candidates[0].country,
    difficulty,
  };
}

function buildPopulationEstimateOptions(entry, difficulty) {
  return buildPopulationEstimateOptionsForValue(entry.population, entry.label, difficulty);
}

function buildPopulationEstimateOptionsForValue(answerPopulation, answerLabel, difficulty) {
  const selected = [{ label: answerLabel, population: answerPopulation }];
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
    candidates.push({
      label: entry.label,
      population: entry.population,
      distance: Math.abs(entry.population - answerPopulation),
      priority: 0,
    });
  });

  fullPool.forEach((entry) => {
    candidates.push({
      label: entry.label,
      population: entry.population,
      distance: Math.abs(entry.population - answerPopulation),
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
  if (difficulty <= 2) {
    return randomChoiceLocal(["estimate", "compare", "estimate"]);
  }

  if (difficulty === 3) {
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
  if (difficulty <= 2) {
    return entry.population >= 60_000_000;
  }
  if (difficulty === 3) {
    return entry.population >= 10_000_000 && entry.population <= 160_000_000;
  }
  return entry.population <= 120_000_000;
}

function generateRoundedTarget(population, difficulty) {
  const base = roundPopulationForDifficulty(population, difficulty);
  const offset = randomChoiceLocal(getPopulationOffsets(difficulty));
  return Math.max(1, base + offset);
}

function roundPopulationForDifficulty(population, difficulty) {
  if (difficulty <= 1) {
    return Math.round(population / 10_000_000) * 10_000_000;
  }
  if (difficulty === 2) {
    return Math.round(population / 5_000_000) * 5_000_000;
  }
  if (difficulty === 3) {
    return Math.round(population / 2_000_000) * 2_000_000;
  }
  if (difficulty === 4) {
    return Math.round(population / 1_000_000) * 1_000_000;
  }
  return Math.round(population / 500_000) * 500_000;
}

function getPopulationOffsets(difficulty) {
  if (difficulty <= 1) {
    return [-20_000_000, -10_000_000, 10_000_000, 20_000_000];
  }
  if (difficulty === 2) {
    return [-15_000_000, -5_000_000, 5_000_000, 15_000_000];
  }
  if (difficulty === 3) {
    return [-8_000_000, -3_000_000, 3_000_000, 8_000_000];
  }
  if (difficulty === 4) {
    return [-5_000_000, -2_000_000, 2_000_000, 5_000_000];
  }
  return [-3_000_000, -1_000_000, 1_000_000, 3_000_000];
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

function dedupeStrings(values) {
  return Array.from(new Set(values));
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
  return Math.min(5, Math.max(1, numeric));
}

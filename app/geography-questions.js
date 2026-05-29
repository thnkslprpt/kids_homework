// Geography questions frozen to the 2026-03-23 top-50 population snapshot.
const GEOGRAPHY_SNAPSHOT_DATE = "2026-03-23";

const GEOGRAPHY_QUESTIONS = (() => {
  const GEOGRAPHY_CAPITAL_COUNTRIES = [
    { country: "India", capital: "New Delhi", region: "South Asia", rank: 1 },
    { country: "China", capital: "Beijing", region: "East Asia", rank: 2 },
    { country: "United States", capital: "Washington, D.C.", region: "North America", rank: 3 },
    { country: "Indonesia", capital: "Jakarta", region: "Southeast Asia", rank: 4 },
    { country: "Pakistan", capital: "Islamabad", region: "South Asia", rank: 5 },
    { country: "Nigeria", capital: "Abuja", region: "Africa", rank: 6 },
    { country: "Brazil", capital: "Brasilia", region: "South America", rank: 7 },
    { country: "Bangladesh", capital: "Dhaka", region: "South Asia", rank: 8 },
    { country: "Russia", capital: "Moscow", region: "Europe", rank: 9 },
    { country: "Ethiopia", capital: "Addis Ababa", region: "Africa", rank: 10 },
    { country: "Mexico", capital: "Mexico City", region: "North America", rank: 11 },
    { country: "Japan", capital: "Tokyo", region: "East Asia", rank: 12 },
    { country: "Egypt", capital: "Cairo", region: "Africa", rank: 13 },
    { country: "Philippines", capital: "Manila", region: "Southeast Asia", rank: 14 },
    { country: "DR Congo", capital: "Kinshasa", region: "Africa", rank: 15 },
    { country: "Vietnam", capital: "Hanoi", region: "Southeast Asia", rank: 16 },
    { country: "Iran", capital: "Tehran", region: "Middle East", rank: 17 },
    { country: "Turkey", capital: "Ankara", region: "Middle East", rank: 18 },
    { country: "Germany", capital: "Berlin", region: "Europe", rank: 19 },
    { country: "Thailand", capital: "Bangkok", region: "Southeast Asia", rank: 20 },
    { country: "United Kingdom", capital: "London", region: "Europe", rank: 21 },
    { country: "Tanzania", capital: "Dodoma", region: "Africa", rank: 22 },
    { country: "France", capital: "Paris", region: "Europe", rank: 23 },
    { country: "South Africa", capital: "Pretoria", region: "Africa", rank: 24 },
    { country: "Italy", capital: "Rome", region: "Europe", rank: 25 },
    { country: "Kenya", capital: "Nairobi", region: "Africa", rank: 26 },
    { country: "Myanmar", capital: "Naypyidaw", region: "Southeast Asia", rank: 27 },
    { country: "Colombia", capital: "Bogota", region: "South America", rank: 28 },
    { country: "South Korea", capital: "Seoul", region: "East Asia", rank: 29 },
    { country: "Sudan", capital: "Khartoum", region: "Africa", rank: 30 },
    { country: "Uganda", capital: "Kampala", region: "Africa", rank: 31 },
    { country: "Spain", capital: "Madrid", region: "Europe", rank: 32 },
    { country: "Algeria", capital: "Algiers", region: "Africa", rank: 33 },
    { country: "Iraq", capital: "Baghdad", region: "Middle East", rank: 34 },
    { country: "Argentina", capital: "Buenos Aires", region: "South America", rank: 35 },
    { country: "Afghanistan", capital: "Kabul", region: "South Asia", rank: 36 },
    { country: "Yemen", capital: "Sana'a", region: "Middle East", rank: 37 },
    { country: "Canada", capital: "Ottawa", region: "North America", rank: 38 },
    { country: "Poland", capital: "Warsaw", region: "Europe", rank: 39 },
    { country: "Morocco", capital: "Rabat", region: "Africa", rank: 40 },
    { country: "Angola", capital: "Luanda", region: "Africa", rank: 41 },
    { country: "Ukraine", capital: "Kyiv", region: "Europe", rank: 42 },
    { country: "Uzbekistan", capital: "Tashkent", region: "Central Asia", rank: 43 },
    { country: "Malaysia", capital: "Kuala Lumpur", region: "Southeast Asia", rank: 44 },
    { country: "Mozambique", capital: "Maputo", region: "Africa", rank: 45 },
    { country: "Ghana", capital: "Accra", region: "Africa", rank: 46 },
    { country: "Peru", capital: "Lima", region: "South America", rank: 47 },
    { country: "Saudi Arabia", capital: "Riyadh", region: "Middle East", rank: 48 },
    { country: "Madagascar", capital: "Antananarivo", region: "Africa", rank: 49 },
    { country: "Cote d'Ivoire", capital: "Yamoussoukro", region: "Africa", rank: 50 },
  ];

  function clampDifficulty(value) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) {
      return 3;
    }
    return Math.max(1, Math.min(10, Math.round(numeric)));
  }

  function randomChoice(values) {
    return values[Math.floor(Math.random() * values.length)];
  }

  function shuffle(values) {
    const copy = values.slice();
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      const current = copy[index];
      copy[index] = copy[swapIndex];
      copy[swapIndex] = current;
    }
    return copy;
  }

  function unique(values) {
    return Array.from(new Set(values));
  }

  function buildOptions(answer, preferredPool, fallbackPool) {
    const distractors = unique([...(preferredPool || []), ...(fallbackPool || [])].map(String)).filter(
      (option) => option && option !== answer
    );
    const chosen = shuffle(distractors).slice(0, 3);
    return shuffle([answer, ...chosen]);
  }

  function pickCapitalDirection(difficulty) {
    if (difficulty <= 4) {
      return "forward";
    }
    if (difficulty <= 6) {
      return randomChoice(["forward", "reverse"]);
    }
    return randomChoice(["reverse", "reverse", "forward"]);
  }

  function pickCapitalEntry(difficulty, direction) {
    const easyEntries = GEOGRAPHY_CAPITAL_COUNTRIES.filter((entry) => entry.rank <= 20);
    const mediumEntries = GEOGRAPHY_CAPITAL_COUNTRIES.filter(
      (entry) => entry.rank > 20 && entry.rank <= 35
    );
    const hardEntries = GEOGRAPHY_CAPITAL_COUNTRIES.filter((entry) => entry.rank > 35);

    if (direction === "forward") {
      if (difficulty <= 4) {
        return randomChoice(easyEntries);
      }
      if (difficulty <= 6) {
        return randomChoice(easyEntries.concat(mediumEntries));
      }
      return randomChoice(mediumEntries.concat(hardEntries, easyEntries));
    }

    if (difficulty <= 4) {
      return randomChoice(easyEntries);
    }
    if (difficulty <= 6) {
      return randomChoice(easyEntries.concat(mediumEntries));
    }
    return randomChoice(mediumEntries.concat(hardEntries, easyEntries));
  }

  function buildCapitalQuestion(difficulty, forcedEntry, forcedDirection) {
    const level = clampDifficulty(difficulty);
    const direction = forcedDirection || pickCapitalDirection(level);
    const entry = forcedEntry || pickCapitalEntry(level, direction);
    const answer = direction === "forward" ? entry.capital : entry.country;
    const question =
      direction === "forward"
        ? `What is the capital city of ${entry.country}?`
        : `${entry.capital} is the capital city of which country?`;
    const preferredPool =
      direction === "forward"
        ? GEOGRAPHY_CAPITAL_COUNTRIES.filter(
            (item) => item.capital !== entry.capital && item.region === entry.region
          ).map((item) => item.capital)
        : GEOGRAPHY_CAPITAL_COUNTRIES.filter(
            (item) => item.country !== entry.country && item.region === entry.region
          ).map((item) => item.country);
    const fallbackPool =
      direction === "forward"
        ? GEOGRAPHY_CAPITAL_COUNTRIES.filter((item) => item.capital !== entry.capital).map(
            (item) => item.capital
          )
        : GEOGRAPHY_CAPITAL_COUNTRIES.filter((item) => item.country !== entry.country).map(
            (item) => item.country
          );

    return {
      type: "geography-choice",
      difficulty: level,
      mode: "choice",
      question,
      options: buildOptions(answer, preferredPool, fallbackPool),
      answer,
      extraText: `Snapshot date: ${GEOGRAPHY_SNAPSHOT_DATE}.`,
    };
  }

  function createCapitalQuestion(question, answer, options, difficulty) {
    return {
      type: "geography-choice",
      difficulty,
      mode: "choice",
      question,
      options,
      answer,
      extraText: `Snapshot date: ${GEOGRAPHY_SNAPSHOT_DATE}.`,
    };
  }

  function makeStaticCapital(question, answer, options, difficulty) {
    return createCapitalQuestion(question, answer, options, difficulty);
  }

  function generateQuestion(level) {
    return buildCapitalQuestion(level);
  }

  function buildGeneratedEntry(difficulty) {
    const level = clampDifficulty(difficulty);
    return generateQuestion(level);
  }

  globalThis.createGeographyGeneratedEntry = buildGeneratedEntry;

  return [
    makeStaticCapital(
      "What is the capital city of Japan?",
      "Tokyo",
      ["Tokyo", "Beijing", "Seoul", "Bangkok"],
      1
    ),
    makeStaticCapital(
      "What is the capital city of Canada?",
      "Ottawa",
      ["Ottawa", "Washington, D.C.", "Mexico City", "London"],
      2
    ),
    makeStaticCapital(
      "What is the capital city of Brazil?",
      "Brasilia",
      ["Brasilia", "Bogota", "Buenos Aires", "Lima"],
      3
    ),
    makeStaticCapital(
      "What is the capital city of India?",
      "New Delhi",
      ["New Delhi", "Dhaka", "Islamabad", "Bangkok"],
      4
    ),
    makeStaticCapital(
      "Jakarta is the capital city of which country?",
      "Indonesia",
      ["Indonesia", "Malaysia", "Thailand", "Philippines"],
      5
    ),
    makeStaticCapital(
      "Berlin is the capital city of which country?",
      "Germany",
      ["Germany", "Poland", "France", "Italy"],
      6
    ),
    makeStaticCapital(
      "Cairo is the capital city of which country?",
      "Egypt",
      ["Egypt", "Sudan", "Morocco", "Algeria"],
      7
    ),
    makeStaticCapital(
      "Ankara is the capital city of which country?",
      "Turkey",
      ["Turkey", "Iraq", "Iran", "Saudi Arabia"],
      8
    ),
    makeStaticCapital(
      "What is the capital city of Mexico?",
      "Mexico City",
      ["Mexico City", "Ottawa", "Washington, D.C.", "London"],
      7
    ),
    makeStaticCapital(
      "London is the capital city of which country?",
      "United Kingdom",
      ["United Kingdom", "Canada", "France", "Germany"],
      9
    ),
    makeStaticCapital(
      "What is the capital city of Nigeria?",
      "Abuja",
      ["Abuja", "Accra", "Nairobi", "Addis Ababa"],
      10
    ),
    makeStaticCapital(
      "Seoul is the capital city of which country?",
      "South Korea",
      ["South Korea", "Japan", "China", "Vietnam"],
      9
    ),
  ];
})();

globalThis.GEOGRAPHY_QUESTIONS = GEOGRAPHY_QUESTIONS;

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    GEOGRAPHY_QUESTIONS,
    createGeographyGeneratedEntry: globalThis.createGeographyGeneratedEntry,
  };
}

(() => {
  const MAP_COUNTRIES = Array.isArray(globalThis.GEOGRAPHY_MAP_COUNTRIES)
    ? globalThis.GEOGRAPHY_MAP_COUNTRIES.slice()
    : [];
  const SNAPSHOT_DATE =
    typeof globalThis.GEOGRAPHY_MAP_SNAPSHOT_DATE === "string"
      ? globalThis.GEOGRAPHY_MAP_SNAPSHOT_DATE
      : "2026-03-24";

  function clampDifficulty(value) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) {
      return 3;
    }
    return Math.max(1, Math.min(5, Math.round(numeric)));
  }

  function randomChoice(values) {
    return values[Math.floor(Math.random() * values.length)];
  }

  function shuffle(values) {
    const copy = values.slice();
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
  }

  function unique(values) {
    return Array.from(new Set(values));
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function getEligibleEntries(level) {
    const eligible = MAP_COUNTRIES.filter((entry) => (entry.minDifficulty || 1) <= level);
    if (eligible.length >= 16) {
      return eligible;
    }
    return MAP_COUNTRIES;
  }

  function pickDistractors(answerEntry, level, pool) {
    const answer = answerEntry.country;
    const exactGroup = pool.filter(
      (entry) => entry.country !== answer && entry.choiceGroup === answerEntry.choiceGroup
    );
    const sameContinent = pool.filter(
      (entry) =>
        entry.country !== answer &&
        entry.continent === answerEntry.continent &&
        entry.choiceGroup !== answerEntry.choiceGroup
    );
    const similarRank = pool.filter(
      (entry) => entry.country !== answer && Math.abs(entry.rank - answerEntry.rank) <= 14
    );
    const everythingElse = pool.filter((entry) => entry.country !== answer);

    const orderedPools =
      level >= 4
        ? [exactGroup, sameContinent, similarRank, everythingElse]
        : level === 3
          ? [sameContinent, exactGroup, similarRank, everythingElse]
          : [similarRank, sameContinent, exactGroup, everythingElse];

    const picked = [];
    orderedPools.forEach((candidatePool) => {
      shuffle(candidatePool).forEach((entry) => {
        if (picked.length >= 3 || picked.includes(entry.country)) {
          return;
        }
        picked.push(entry.country);
      });
    });

    return picked.slice(0, 3);
  }

  function buildVisualHtml(entry) {
    return `
      <div class="visual-card geography-map-card">
        <div class="visual-card-title">Country Map</div>
        <img
          class="geography-map-image"
          src="${escapeHtml(entry.assetPath)}"
          alt="${escapeHtml(`${entry.country} shaded blue on a map`)}"
        >
      </div>
    `;
  }

  function buildQuestionFromEntry(entry, difficulty, pool) {
    const distractors = pickDistractors(entry, difficulty, pool);
    const options = shuffle(unique([entry.country, ...distractors])).slice(0, 4);
    if (!options.includes(entry.country) || options.length !== 4) {
      return null;
    }

    return {
      question: "What country is this?",
      options,
      answer: entry.country,
      difficulty,
      visualHtml: buildVisualHtml(entry),
      visualSummary: `${entry.country} is shaded blue on a regional map.`,
      extraText: `Snapshot date: ${SNAPSHOT_DATE}.`,
      reviewText: `Country map: ${entry.country} is shaded blue.`,
    };
  }

  function buildGeneratedEntry(difficulty, excludedCountries = []) {
    const level = clampDifficulty(difficulty);
    const pool = getEligibleEntries(level);
    const excluded = new Set(excludedCountries.map(String));
    const available = pool.filter((entry) => !excluded.has(entry.country));
    const source = available.length ? available : pool;
    const answerEntry = randomChoice(source);
    return buildQuestionFromEntry(answerEntry, level, pool);
  }

  globalThis.createGeographyMapGeneratedEntry = buildGeneratedEntry;
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    createGeographyMapGeneratedEntry: globalThis.createGeographyMapGeneratedEntry,
  };
}

(() => {
  const BLUE = "#2f80ff";
  const GREY = "#c0c0c0";
  const WHITE = "#ffffff";
  const OCEAN = "#eef7ff";
  function getMapCountries() {
    return Array.isArray(globalThis.GEOGRAPHY_MAP_COUNTRIES)
      ? globalThis.GEOGRAPHY_MAP_COUNTRIES
      : [];
  }

  function getMapSvgSources() {
    return globalThis.GEOGRAPHY_MAP_SVG_SOURCES &&
      typeof globalThis.GEOGRAPHY_MAP_SVG_SOURCES === "object"
      ? globalThis.GEOGRAPHY_MAP_SVG_SOURCES
      : {};
  }

  function getMapSvgViewboxes() {
    return globalThis.GEOGRAPHY_MAP_SVG_VIEWBOXES &&
      typeof globalThis.GEOGRAPHY_MAP_SVG_VIEWBOXES === "object"
      ? globalThis.GEOGRAPHY_MAP_SVG_VIEWBOXES
      : {};
  }

  function getMapSnapshotDate() {
    return typeof globalThis.GEOGRAPHY_MAP_SNAPSHOT_DATE === "string"
      ? globalThis.GEOGRAPHY_MAP_SNAPSHOT_DATE
      : "2026-04-13";
  }
  let inlineSvgScopeId = 0;

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
    const mapCountries = getMapCountries();
    const eligible = mapCountries.filter((entry) => (entry.minDifficulty || 1) <= level);
    if (eligible.length >= 16) {
      return eligible;
    }
    return mapCountries;
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
      level >= 7
        ? [exactGroup, sameContinent, similarRank, everythingElse]
        : level >= 5
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

  function buildSharedBaseStyle(sourceKey, ids, scopeClass) {
    const selectors = selectorsForIds(ids);
    const suppressAnswerTooltip = suppressNativeSvgTooltipRule(scopeClass, selectors);
    switch (sourceKey) {
      case "europe":
        return [
          rule(scopeClass, selectors, `fill:${BLUE} !important;stroke:${WHITE};stroke-width:0.4`),
          suppressAnswerTooltip,
        ].join("\n");
      case "americas":
        return [
          rule(
            scopeClass,
            `.land`,
            `fill:${GREY} !important;stroke:${WHITE} !important;stroke-width:0.8 !important`
          ),
          rule(scopeClass, `.coast`, `fill:${GREY} !important`),
          rule(scopeClass, `.ocean,#ocean`, `fill:${OCEAN} !important`),
          rule(scopeClass, selectors, `fill:${BLUE} !important`),
          suppressAnswerTooltip,
        ].join("\n");
      case "africa":
        return [
          rule(
            scopeClass,
            `.land`,
            `fill:${GREY} !important;stroke:${WHITE} !important;stroke-width:0.8 !important`
          ),
          rule(scopeClass, `.coast`, `fill:${GREY} !important`),
          rule(scopeClass, selectors, `fill:${BLUE} !important`),
          suppressAnswerTooltip,
        ].join("\n");
      case "asia":
        return [
          rule(
            scopeClass,
            `.landxx`,
            `fill:${GREY} !important;stroke:${WHITE} !important;stroke-width:0.5 !important`
          ),
          rule(scopeClass, `.coastxx`, `fill:${GREY} !important`),
          rule(scopeClass, `.oceanxx,#ocean`, `fill:${OCEAN} !important;stroke:none !important`),
          rule(scopeClass, `.circlexx,.subxx,.antxx,.noxx,.limitxx,.unxx`, `opacity:0 !important`),
          rule(
            scopeClass,
            selectors,
            `fill:${BLUE} !important;stroke:${WHITE} !important;stroke-width:0.5 !important`
          ),
          suppressAnswerTooltip,
        ].join("\n");
      case "oceania-australia":
      case "oceania-png":
        return [
          rule(
            scopeClass,
            `[fill="#FEFEE4"]`,
            `fill:${GREY} !important;stroke:${WHITE} !important;stroke-width:0.8 !important`
          ),
          rule(
            scopeClass,
            `[fill="#C12737"]`,
            `fill:${BLUE} !important;stroke:${WHITE} !important;stroke-width:0.8 !important`
          ),
          rule(scopeClass, `[fill="#C12737"],[fill="#C12737"] *`, `pointer-events:none !important`),
          rule(scopeClass, `#ocean,[fill="#C8EBFF"]`, `fill:${OCEAN} !important`),
        ].join("\n");
      default:
        return "";
    }
  }

  function rule(scopeClass, selectorList, declarations) {
    return `${scopeSelectorList(scopeClass, selectorList)}{${declarations}}`;
  }

  function selectorsForIds(ids) {
    return ids.flatMap((id) => [`#${escapeCssId(id)}`, `#${escapeCssId(id)} *`]).join(",");
  }

  function suppressNativeSvgTooltipRule(scopeClass, selectorList) {
    return rule(scopeClass, selectorList, `pointer-events:none !important`);
  }

  function scopeSelectorList(scopeClass, selectorList) {
    return selectorList
      .split(",")
      .map((selector) => `.geography-map-svg.${scopeClass} ${selector.trim()}`)
      .join(",");
  }

  function escapeCssId(value) {
    return String(value).replaceAll(".", "\\.").replaceAll(":", "\\:");
  }

  function injectSvgStyle(svg, styleText) {
    const styleTag = `\n<style id="homework-country-highlight">\n${styleText}\n</style>\n`;
    if (svg.includes("</defs>")) {
      return svg.replace("</defs>", `</defs>${styleTag}`);
    }
    return svg.replace(/<svg\b[^>]*>/, (match) => `${match}${styleTag}`);
  }

  function applySvgViewBox(svg, viewBoxOverride = "") {
    if (!viewBoxOverride) {
      return svg.replace(/<svg\b([^>]*)>/, (match, attributes) => {
        if (/preserveAspectRatio=/.test(attributes)) {
          return `<svg${attributes}>`;
        }
        return `<svg${attributes} preserveAspectRatio="xMidYMid meet">`;
      });
    }

    return svg.replace(/<svg\b([^>]*)>/, (match, attributes) => {
      const nextAttributes = attributes
        .replace(/\sviewBox="[^"]*"/, "")
        .replace(/\spreserveAspectRatio="[^"]*"/, "");
      return `<svg${nextAttributes} viewBox="${viewBoxOverride}" preserveAspectRatio="xMidYMid meet">`;
    });
  }

  function decorateInlineSvg(svg, country, scopeClass) {
    const label = escapeHtml(`${country} shaded blue on a regional map`);
    return svg.replace(
      /<svg\b/,
      `<svg class="geography-map-svg ${scopeClass}" role="img" aria-label="${label}" focusable="false"`
    );
  }

  function buildSharedBaseSvg(entry) {
    const sourceSvg = getMapSvgSources()[entry.source];
    if (typeof sourceSvg !== "string" || !Array.isArray(entry.ids) || !entry.ids.length) {
      return "";
    }

    inlineSvgScopeId += 1;
    const scopeClass = `geography-map-scope-${inlineSvgScopeId}`;
    const styleText = buildSharedBaseStyle(entry.source, entry.ids, scopeClass);
    if (!styleText) {
      return "";
    }

    return decorateInlineSvg(
      applySvgViewBox(
        injectSvgStyle(sourceSvg, styleText),
        entry.viewBoxOverride || getMapSvgViewboxes()[entry.source] || ""
      ),
      entry.country,
      scopeClass
    );
  }

  function buildVisualHtml(entry) {
    const inlineSvg = buildSharedBaseSvg(entry);
    if (inlineSvg) {
      return `
        <div class="visual-card geography-map-card">
          <div class="visual-card-title">Country Map</div>
          <div class="geography-map-frame">
            ${inlineSvg}
          </div>
        </div>
      `;
    }

    if (typeof entry.assetPath === "string" && entry.assetPath) {
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

    return "";
  }

  function buildQuestionFromEntry(entry, difficulty, pool) {
    const distractors = pickDistractors(entry, difficulty, pool);
    const options = shuffle(unique([entry.country, ...distractors])).slice(0, 4);
    if (!options.includes(entry.country) || options.length !== 4) {
      return null;
    }

    const prototypeLabel =
      globalThis.GEOGRAPHY_MAP_RENDER_MODE === "shared-base-prototype"
        ? "Prototype: shared base map rendering."
        : "";
    const extraText = [prototypeLabel, `Snapshot date: ${getMapSnapshotDate()}.`]
      .filter(Boolean)
      .join(" ");

    return {
      question: "What country is this?",
      options,
      answer: entry.country,
      difficulty,
      visualHtml: buildVisualHtml(entry),
      visualSummary: `${entry.country} is shaded blue on a regional map.`,
      extraText,
      reviewText: `Country map: ${entry.country} is shaded blue.`,
      // Checkpoints store this compact key and rebuild the multi-megabyte SVG
      // on resume instead of duplicating it inside localStorage.
      geographyMapCountry: entry.country,
    };
  }

  const CONTINENT_TARGETS = [
    { continent: "North America", x: 22, y: 29 },
    { continent: "South America", x: 32, y: 57 },
    { continent: "Europe", x: 49, y: 25 },
    { continent: "Africa", x: 53, y: 48 },
    { continent: "Asia", x: 71, y: 34 },
    { continent: "Oceania", x: 84, y: 64 },
    { continent: "Antarctica", x: 52, y: 89 },
  ];
  const CONTINENT_LABELS = CONTINENT_TARGETS.map((target) => target.continent);

  function buildContinentWorldMapHtml() {
    const sourceSvg = getMapSvgSources().asia;
    if (typeof sourceSvg !== "string" || !sourceSvg) {
      return "";
    }

    inlineSvgScopeId += 1;
    const scopeClass = `geography-map-scope-${inlineSvgScopeId}`;
    const styleText = [
      rule(
        scopeClass,
        ".landxx",
        "fill:#8fc46b !important;stroke:#ffffff !important;stroke-width:1.2 !important"
      ),
      rule(scopeClass, ".oceanxx,#ocean", "fill:#eef7ff !important;stroke:#b9d8ec !important"),
      rule(scopeClass, ".circlexx,.subxx,.noxx,.limitxx,.unxx", "opacity:0 !important"),
    ].join("\n");
    const svg = applySvgViewBox(injectSvgStyle(sourceSvg, styleText), "0 0 2754 1398");
    const label = "Simple world map showing all seven continents";

    return svg.replace(
      /<svg\b/,
      `<svg class="geography-map-svg continent-world-map-svg ${scopeClass}" role="img" aria-label="${label}" focusable="false"`
    );
  }

  function createContinentDragGeneratedEntry(difficulty) {
    return {
      type: "geography-map-drag",
      difficulty,
      mode: "drag",
      questionText: "Continent Drag Map: place every continent name in the correct spot on the world map.",
      displayText: "",
      extraText: "Use every label. Drag a label, or tap a label and then tap its map spot.",
      extraHtml: "",
      visualHtml: "",
      visualSummary: "A world map with one label spot on each of the seven continents.",
      dragLayout: "targets",
      dragTargetArrangement: "map",
      dragMapHtml: buildContinentWorldMapHtml(),
      dragTargets: CONTINENT_TARGETS.map(({ continent, x, y }) => ({
        x,
        y,
        reviewLabel: continent,
      })),
      dragChoices: shuffle(CONTINENT_LABELS).map((continent, index) => ({
        id: `continent-${difficulty}-${index}-${continent.toLowerCase().replace(/[^a-z]+/g, "-")}`,
        text: continent,
      })),
      dragAnswerTokens: CONTINENT_LABELS,
      dragPlaceholderText: "Drop here",
      reviewText: `World map continent labels: ${CONTINENT_LABELS.join(", ")}.`,
      answerValue: CONTINENT_LABELS.join(" | "),
      answerLabel: CONTINENT_LABELS.map((continent) => `${continent}: ${continent}`).join(" | "),
      isHebrew: false,
      geographyMapVisualKind: "continents",
    };
  }

  function buildGeneratedEntry(difficulty, excludedCountries = []) {
    const level = clampDifficulty(difficulty);
    if (!excludedCountries.length && level <= 8 && Math.random() < 0.22) {
      return createContinentDragGeneratedEntry(level);
    }

    const pool = getEligibleEntries(level);
    const excluded = new Set(excludedCountries.map(String));
    const available = pool.filter((entry) => !excluded.has(entry.country));
    const source = available.length ? available : pool;
    const answerEntry = randomChoice(source);
    return buildQuestionFromEntry(answerEntry, level, pool);
  }

  globalThis.renderGeographyMapVisualHtml = buildVisualHtml;
  globalThis.renderGeographyContinentMapHtml = buildContinentWorldMapHtml;
  globalThis.createGeographyMapGeneratedEntry = buildGeneratedEntry;
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    renderGeographyMapVisualHtml: globalThis.renderGeographyMapVisualHtml,
    createGeographyMapGeneratedEntry: globalThis.createGeographyMapGeneratedEntry,
  };
}

globalThis.HomeworkQuestions?.register({
  id: "geography-map",
  label: "Geography Map",
  generatedEntryFactory: globalThis.createGeographyMapGeneratedEntry,
});

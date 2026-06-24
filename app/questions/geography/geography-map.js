(() => {
  const BLUE = "#2f80ff";
  const GREY = "#c0c0c0";
  const WHITE = "#ffffff";
  const OCEAN = "#eef7ff";
  const MAP_COUNTRIES = Array.isArray(globalThis.GEOGRAPHY_MAP_COUNTRIES)
    ? globalThis.GEOGRAPHY_MAP_COUNTRIES.slice()
    : [];
  const MAP_SVG_SOURCES =
    globalThis.GEOGRAPHY_MAP_SVG_SOURCES && typeof globalThis.GEOGRAPHY_MAP_SVG_SOURCES === "object"
      ? globalThis.GEOGRAPHY_MAP_SVG_SOURCES
      : {};
  const MAP_SVG_VIEWBOXES =
    globalThis.GEOGRAPHY_MAP_SVG_VIEWBOXES &&
    typeof globalThis.GEOGRAPHY_MAP_SVG_VIEWBOXES === "object"
      ? globalThis.GEOGRAPHY_MAP_SVG_VIEWBOXES
      : {};
  const IS_SHARED_BASE_PROTOTYPE = globalThis.GEOGRAPHY_MAP_RENDER_MODE === "shared-base-prototype";
  const SNAPSHOT_DATE =
    typeof globalThis.GEOGRAPHY_MAP_SNAPSHOT_DATE === "string"
      ? globalThis.GEOGRAPHY_MAP_SNAPSHOT_DATE
      : "2026-04-13";
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
    const sourceSvg = MAP_SVG_SOURCES[entry.source];
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
        entry.viewBoxOverride || MAP_SVG_VIEWBOXES[entry.source] || ""
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

    const prototypeLabel = IS_SHARED_BASE_PROTOTYPE ? "Prototype: shared base map rendering." : "";
    const extraText = [prototypeLabel, `Snapshot date: ${SNAPSHOT_DATE}.`].filter(Boolean).join(" ");

    return {
      question: "What country is this?",
      options,
      answer: entry.country,
      difficulty,
      visualHtml: buildVisualHtml(entry),
      visualSummary: `${entry.country} is shaded blue on a regional map.`,
      extraText,
      reviewText: `Country map: ${entry.country} is shaded blue.`,
    };
  }

  const CONTINENT_SHAPES = {
    Africa:
      "M54 10 C75 16 86 34 82 53 C77 76 64 93 54 112 C43 94 31 76 27 56 C24 35 34 16 54 10 Z",
    Asia:
      "M20 38 C37 14 80 8 108 27 C129 41 124 73 99 78 C83 81 73 69 61 79 C45 92 19 79 14 59 C11 50 13 43 20 38 Z",
    Europe:
      "M25 52 C29 29 52 18 76 22 C98 26 111 42 103 62 C91 69 83 61 73 70 C59 83 33 78 25 64 Z",
    "North America":
      "M18 31 C39 13 79 14 103 35 C112 50 101 69 78 68 C63 67 56 83 39 78 C21 72 10 47 18 31 Z",
    "South America":
      "M51 12 C72 23 78 45 64 63 C55 75 58 91 45 110 C30 91 26 70 33 54 C40 39 34 24 51 12 Z",
    Oceania:
      "M25 66 C42 47 75 46 95 62 C84 82 43 85 25 66 Z M89 34 C98 28 111 31 116 40 C107 47 94 45 89 34 Z",
    Antarctica:
      "M14 76 C33 58 55 70 72 60 C88 51 107 65 119 78 C91 90 40 91 14 76 Z",
  };
  const CONTINENT_LABELS = Object.keys(CONTINENT_SHAPES);

  function buildContinentShapeHtml(continent) {
    const path = CONTINENT_SHAPES[continent];
    return `
      <div class="continent-shape-card">
        <svg class="continent-shape-svg" viewBox="0 0 132 124" role="img" aria-label="${escapeHtml(continent)} outline">
          <path d="${path}"></path>
        </svg>
      </div>
    `;
  }

  function createContinentDragGeneratedEntry(difficulty) {
    const sets = [
      {
        minDifficulty: 1,
        maxDifficulty: 2,
        continents: ["Africa", "Asia", "North America", "South America"],
      },
      {
        minDifficulty: 2,
        maxDifficulty: 4,
        continents: ["Africa", "Asia", "Europe", "South America"],
      },
      {
        minDifficulty: 3,
        maxDifficulty: 6,
        continents: ["Africa", "Asia", "Europe", "North America", "Oceania"],
      },
      {
        minDifficulty: 5,
        maxDifficulty: 8,
        continents: ["Africa", "Asia", "Europe", "North America", "South America", "Oceania"],
      },
      {
        minDifficulty: 7,
        maxDifficulty: 10,
        continents: ["Africa", "Asia", "Europe", "North America", "South America", "Oceania", "Antarctica"],
      },
    ];
    const availableSets = sets.filter(
      (set) => difficulty >= set.minDifficulty && difficulty <= set.maxDifficulty
    );
    const selectedSet = randomChoice(availableSets.length ? availableSets : sets);
    const continents = selectedSet.continents;
    const distractorCount = difficulty <= 3 ? 1 : 0;
    const distractors = shuffle(CONTINENT_LABELS.filter((continent) => !continents.includes(continent))).slice(
      0,
      distractorCount
    );

    return {
      type: "geography-map-drag",
      difficulty,
      mode: "drag",
      questionText: "Continent Drag Map: drag each label to the matching continent shape.",
      displayText: "",
      extraText: "Use the outline shape. Not every label has to be used.",
      extraHtml: "",
      visualHtml: "",
      visualSummary: `Continent label puzzle for ${continents.join(", ")}.`,
      dragLayout: "targets",
      dragTargetArrangement: "rows",
      dragTargets: continents.map((continent) => ({
        html: buildContinentShapeHtml(continent),
        reviewLabel: continent,
      })),
      dragChoices: shuffle([...continents, ...distractors]).map((continent, index) => ({
        id: `continent-${difficulty}-${index}-${continent.toLowerCase().replace(/[^a-z]+/g, "-")}`,
        text: continent,
      })),
      dragAnswerTokens: continents,
      dragPlaceholderText: "Continent",
      reviewText: `Continent labels: ${continents.join(", ")}.`,
      answerValue: continents.join(" | "),
      answerLabel: continents.map((continent) => `${continent}: ${continent}`).join(" | "),
      isHebrew: false,
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

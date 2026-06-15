(() => {
  const MAX_LEVEL = 10;
  const RECENT_STORAGE_KEY = "homework-question-recent-v1";
  const RECENT_TTL_DAYS = 21;
  const MAX_RECENT_KEYS = 1500;
  let recentMapCache = null;
  let recentWriteCount = 0;

  function clampDifficulty(value) {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) ? Math.max(1, Math.min(MAX_LEVEL, parsed)) : 3;
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomChoice(values) {
    return values[Math.floor(Math.random() * values.length)];
  }

  function shuffle(values) {
    const copy = [...values];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
  }

  function unique(values) {
    return Array.from(new Set(values.map((value) => String(value).trim()).filter(Boolean)));
  }

  function gcd(left, right) {
    let a = Math.abs(left);
    let b = Math.abs(right);
    while (b) {
      [a, b] = [b, a % b];
    }
    return a || 1;
  }

  function lcm(left, right) {
    return Math.abs(left * right) / gcd(left, right);
  }

  function fractionText(numerator, denominator) {
    const divisor = gcd(numerator, denominator);
    return `${numerator / divisor}/${denominator / divisor}`;
  }

  function numberOptions(answer, deltas = [-3, -2, -1, 1, 2, 3, 4, 5], min = Number.NEGATIVE_INFINITY) {
    const numericAnswer = Number(answer);
    const values = new Set([numericAnswer]);
    shuffle(deltas).forEach((delta) => {
      const candidate = numericAnswer + delta;
      if (Number.isFinite(candidate) && candidate >= min && values.size < 4) {
        values.add(candidate);
      }
    });
    let spread = 6;
    while (values.size < 4) {
      const candidate = numericAnswer + randomChoice([-spread, spread]);
      if (candidate >= min) {
        values.add(candidate);
      }
      spread += 1;
    }
    return Array.from(values).map(String);
  }

  function renderTable(title, rows) {
    const body = rows
      .map((row) => `<tr>${row.map((cell) => `<td>${String(cell)}</td>`).join("")}</tr>`)
      .join("");
    return `<div class="mini-data-card"><strong>${title}</strong><table>${body}</table></div>`;
  }

  function renderLineGraph(title, points) {
    const max = Math.max(...points.map((point) => point.value), 1);
    const circles = points
      .map((point, index) => {
        const x = 25 + index * 42;
        const y = 115 - (point.value / max) * 85;
        return `<circle cx="${x}" cy="${y}" r="4" fill="#146c94"></circle><text x="${x}" y="135" text-anchor="middle" font-size="10">${point.label}</text>`;
      })
      .join("");
    const line = points
      .map((point, index) => `${25 + index * 42},${115 - (point.value / max) * 85}`)
      .join(" ");
    return `<svg class="question-svg" viewBox="0 0 190 150" role="img" aria-label="${title} line graph"><text x="10" y="14" font-size="11" font-weight="700">${title}</text><polyline points="${line}" fill="none" stroke="#146c94" stroke-width="3"></polyline>${circles}</svg>`;
  }

  function renderPieTable(title, parts) {
    const total = parts.reduce((sum, part) => sum + part.value, 0);
    const rows = parts.map((part) => [part.label, `${Math.round((part.value / total) * 100)}%`]);
    return renderTable(title, [["Part", "Share"], ...rows]) + `<div class="chart-note">Total: ${total}</div>`;
  }

  function getStorage() {
    try {
      return typeof window !== "undefined" ? window.localStorage : null;
    } catch {
      return null;
    }
  }

  function loadRecentMap() {
    if (recentMapCache) {
      return recentMapCache;
    }
    const storage = getStorage();
    if (!storage) {
      recentMapCache = {};
      return recentMapCache;
    }
    try {
      const parsed = JSON.parse(storage.getItem(RECENT_STORAGE_KEY) || "{}");
      recentMapCache = pruneRecentMap(
        parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {}
      );
      return recentMapCache;
    } catch {
      recentMapCache = {};
      return recentMapCache;
    }
  }

  function saveRecentMap(recentMap) {
    recentMapCache = recentMap;
    recentWriteCount += 1;
    if (recentWriteCount % 10 !== 0) {
      return;
    }
    const storage = getStorage();
    if (!storage) {
      return;
    }
    try {
      storage.setItem(RECENT_STORAGE_KEY, JSON.stringify(recentMap));
    } catch {
      // Recent-question tracking is a quality improvement, not a session blocker.
    }
  }

  function flushRecentMap() {
    if (!recentMapCache) {
      return;
    }
    const storage = getStorage();
    if (!storage) {
      return;
    }
    try {
      storage.setItem(RECENT_STORAGE_KEY, JSON.stringify(pruneRecentMap(recentMapCache)));
    } catch {
      // Ignore storage failures; generation should still work offline.
    }
  }

  function pruneRecentMap(recentMap, now = Date.now()) {
    const cutoff = now - RECENT_TTL_DAYS * 24 * 60 * 60 * 1000;
    const entries = Object.entries(recentMap)
      .filter(([, timestamp]) => Number(timestamp) >= cutoff)
      .sort((left, right) => Number(right[1]) - Number(left[1]))
      .slice(0, MAX_RECENT_KEYS);
    return Object.fromEntries(entries);
  }

  function normalizeKeyPart(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();
  }

  function buildEntryKey(entry) {
    return [
      entry.topic || entry.question || "question",
      entry.question,
      entry.displayText,
      entry.visualSummary,
      entry.answer,
    ]
      .map(normalizeKeyPart)
      .filter(Boolean)
      .join("|")
      .slice(0, 500);
  }

  function wasRecentlyUsed(entry) {
    const key = buildEntryKey(entry);
    if (!key) {
      return false;
    }
    return Boolean(loadRecentMap()[key]);
  }

  function rememberEntry(entry) {
    const key = buildEntryKey(entry);
    if (!key) {
      return entry;
    }
    const recentMap = loadRecentMap();
    recentMap[key] = Date.now();
    saveRecentMap(recentMap);
    return entry;
  }

  function entry(config) {
    const {
      difficulty,
      question,
      displayText = "",
      options,
      answer,
      visualHtml = "",
      visualSummary = "",
      reviewText = "",
      extraText = "",
      topic = "",
    } = config;
    const normalizedOptions = unique(options);
    const normalizedAnswer = String(answer).trim();
    if (
      !question ||
      !normalizedAnswer ||
      normalizedOptions.length !== 4 ||
      !normalizedOptions.includes(normalizedAnswer)
    ) {
      return null;
    }
    return {
      difficulty: clampDifficulty(difficulty),
      question,
      displayText,
      options: shuffle(normalizedOptions),
      answer: normalizedAnswer,
      visualHtml,
      visualSummary,
      reviewText,
      extraText,
      topic,
    };
  }

  function pickGeneratedEntry(generators, difficulty, attempts = 40) {
    const level = clampDifficulty(difficulty);
    const eligible = generators.filter((generator) => !generator.minLevel || generator.minLevel <= level);
    if (!eligible.length) {
      return null;
    }

    let fallback = null;
    for (let attempt = 0; attempt < attempts; attempt += 1) {
      const generator = randomChoice(eligible);
      const candidate = typeof generator === "function" ? generator(level) : generator.create(level);
      if (!candidate) {
        continue;
      }
      fallback = fallback || candidate;
      if (!wasRecentlyUsed(candidate)) {
        return rememberEntry(candidate);
      }
    }

    return fallback ? rememberEntry(fallback) : null;
  }

  globalThis.HomeworkQuestionUtils = {
    clampDifficulty,
    entry,
    fractionText,
    gcd,
    lcm,
    numberOptions,
    pickGeneratedEntry,
    randomChoice,
    randomInt,
    renderLineGraph,
    renderPieTable,
    renderTable,
    shuffle,
    unique,
  };

  if (typeof window !== "undefined" && typeof window.addEventListener === "function") {
    window.addEventListener("pagehide", flushRecentMap);
  }
})();

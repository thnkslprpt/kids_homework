#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { execFileSync } = require("node:child_process");

const repoRoot = path.resolve(__dirname, "../..");
const expandedWordsPath = path.join(repoRoot, "app/questions/hebrew/hebrew-expanded-words.js");
const endpoint = "https://nakdan-2-0.loadbalancer.dicta.org.il/api";
const maxBatchCharacters = 1000;
const MANUAL_CORRECTIONS_BY_ENGLISH = new Map([
  ["Council of", { hebrew: "מוֹעֶצֶת" }],
  ["Unit / squad / only / single (f.s.)", { english: "Unit / squad / only / single", hebrew: "יְחִידָה" }],
  ["Unit / squad / only / single", { hebrew: "יְחִידָה" }],
  ["Manic (f.s.)", { hebrew: "מָאנִית" }],
  ["Returned / repeated (f.s.)", { hebrew: "חָזְרָה" }],
  ["Eyes of", { hebrew: "עֵינֵי" }],
  ["That is [at] / common / available (f.s.)", { english: "Common / available (f.s.)", hebrew: "מְצוּיָה" }],
  ["Common / available (f.s.)", { hebrew: "מְצוּיָה" }],
  ["Execution / putting to death", { transliteration: "hotsa'a lahoreg", hebrew: "הוֹצָאָה לַהֹרֶג" }],
  ["The cemetery", { transliteration: "beit hakvarot", hebrew: "בֵּית הַקְּבָרוֹת" }],
  ["The spider (female)", { hebrew: "הָעַכְבִישָׁה" }],
  ["Defeat", { hebrew: "תְּבוּסָה" }],
  ["His life", { hebrew: "חַיָּיו" }],
  ["Sight / view / appearance / show (m.s.)", { hebrew: "מַרְאֶה" }],
  ["The main / the principal / the primary (m.s.)||haikarit", { english: "The main / principal / primary (f.s.)" }],
  ["Democratic (f.pl.)", { english: "Democratic (f.s.)" }],
  ["The general (m.pl.)", { english: "The general (f.s.)" }],
  ["Veterans of / originated from (m.pl.)", { hebrew: "יוֹצְאֵי" }],
]);

function evaluateEntries(source) {
  const context = vm.createContext({});
  vm.runInContext(`${source}\nglobalThis.__expandedWords = HEBREW_EXPANDED_WORDS;`, context);
  return context.__expandedWords;
}

function loadEntries() {
  return evaluateEntries(fs.readFileSync(expandedWordsPath, "utf8"));
}

function loadBaselineEntries() {
  try {
    const source = execFileSync("git", ["show", "HEAD:app/questions/hebrew/hebrew-expanded-words.js"], {
      cwd: repoRoot,
      encoding: "utf8",
    });
    return evaluateEntries(source);
  } catch {
    return loadEntries();
  }
}

function stripHebrewDiacritics(value) {
  return String(value || "").replace(/[\u0591-\u05C7]/g, "");
}

function makeBatches(entries, baselineEntries) {
  const batches = [];
  let batch = [];
  let characterCount = 0;

  entries.forEach((entry, index) => {
    const baselineEntry = baselineEntries[index] || entry;
    const rawHebrew = stripHebrewDiacritics(baselineEntry.hebrew);
    const addedCharacters = rawHebrew.length + (batch.length ? 1 : 0);
    if (batch.length && characterCount + addedCharacters > maxBatchCharacters) {
      batches.push(batch);
      batch = [];
      characterCount = 0;
    }
    batch.push({ index, rawHebrew, transliteration: String(entry.transliteration || "") });
    characterCount += addedCharacters;
  });

  if (batch.length) batches.push(batch);
  return batches;
}

function normalizeTransliteration(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/sh/g, "Š")
    .replace(/(?:ch|kh)/g, "Ḵ")
    .replace(/(?:ts|tz)/g, "Ṣ")
    .replace(/ph/g, "f")
    .replace(/th/g, "t")
    .replace(/q/g, "k")
    .replace(/c/g, "k")
    .replace(/[^a-zŠḴṢ]/g, "");
}

function transliteratePointedHebrew(value) {
  const clusters = String(value || "").match(/[\u05D0-\u05EA][\u0591-\u05C7]*|[^\u05D0-\u05EA]/g) || [];
  return clusters
    .map((cluster, index) => {
      if (!/[\u05D0-\u05EA]/.test(cluster)) return cluster;
      const letter = cluster[0];
      const marks = cluster.slice(1);
      const hasDagesh = marks.includes("ּ");
      const isFinal = !clusters[index + 1] || !/[\u05D0-\u05EA]/.test(clusters[index + 1]);
      if (letter === "ו" && marks.includes("ּ") && !/[\u05B1-\u05BB]/.test(marks)) return "u";
      if (letter === "ו" && marks.includes("ֹ")) return "o";

      const consonants = {
        א: "", ב: hasDagesh ? "b" : "v", ג: "g", ד: "d", ה: isFinal && !hasDagesh ? "" : "h",
        ו: "v", ז: "z", ח: "Ḵ", ט: "t", י: "y", כ: hasDagesh ? "k" : "Ḵ", ך: "Ḵ",
        ל: "l", מ: "m", ם: "m", נ: "n", ן: "n", ס: "s", ע: "", פ: hasDagesh ? "p" : "f",
        ף: "f", צ: "Ṣ", ץ: "Ṣ", ק: "k", ר: "r", ש: marks.includes("ׂ") ? "s" : "Š", ת: "t",
      };
      let vowel = "";
      if (/[\u05B1\u05B6\u05B5]/.test(marks)) vowel = "e";
      else if (/[\u05B2\u05B7\u05B8]/.test(marks)) vowel = "a";
      else if (marks.includes("ִ")) vowel = "i";
      else if (marks.includes("ֹ")) vowel = "o";
      else if (/[\u05B3\u05BB]/.test(marks)) vowel = "u";
      else if (marks.includes("ְ")) vowel = "e";

      if (letter === "י" && !marks && index > 0 && /ִ/.test(clusters[index - 1])) return "";
      return `${consonants[letter] || ""}${vowel}`;
    })
    .join("");
}

function editDistance(left, right) {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    const current = [leftIndex];
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      current[rightIndex] = Math.min(
        current[rightIndex - 1] + 1,
        previous[rightIndex] + 1,
        previous[rightIndex - 1] + (left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1)
      );
    }
    previous.splice(0, previous.length, ...current);
  }
  return previous[right.length];
}

function choosePointing(tokens, expectedTransliteration) {
  const expected = normalizeTransliteration(expectedTransliteration);
  let candidates = [""];
  tokens.forEach((token) => {
    const options = token.sep
      ? [token.word]
      : Array.from(new Set([...(token.options || []).map((option) => option[0].replaceAll("|", "")), token.word])).slice(0, 16);
    candidates = candidates.flatMap((candidate) => options.map((option) => `${candidate}${option}`));
    if (candidates.length > 120) {
      candidates.sort((left, right) => {
        const leftValue = normalizeTransliteration(transliteratePointedHebrew(left));
        const rightValue = normalizeTransliteration(transliteratePointedHebrew(right));
        return editDistance(leftValue, expected.slice(0, leftValue.length)) - editDistance(rightValue, expected.slice(0, rightValue.length));
      });
      candidates = candidates.slice(0, 120);
    }
  });

  candidates.sort((left, right) => {
    const leftScore = editDistance(normalizeTransliteration(transliteratePointedHebrew(left)), expected);
    const rightScore = editDistance(normalizeTransliteration(transliteratePointedHebrew(right)), expected);
    return leftScore - rightScore;
  });
  return candidates[0] || "";
}

function splitResponseLines(tokens) {
  const lines = [[]];
  tokens.forEach((token) => {
    if (!token.sep || !String(token.word || "").includes("\n")) {
      lines[lines.length - 1].push(token);
      return;
    }
    const parts = String(token.word).split("\n");
    parts.forEach((part, index) => {
      if (part) lines[lines.length - 1].push({ ...token, word: part });
      if (index < parts.length - 1) lines.push([]);
    });
  });
  return lines;
}

async function pointBatch(batch) {
  const data = batch.map(({ rawHebrew }) => rawHebrew).join("\n");
  const requestBody = JSON.stringify({
    data,
    task: "nakdan",
    genre: "modern",
    keepmetagim: false,
    keepqq: false,
    matchpartial: true,
    nodageshdefmem: false,
    patachma: false,
    addmorph: true,
  });
  let response;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: requestBody,
    });
    if (response.ok) break;
    if (attempt < 4 && response.status >= 500) {
      await new Promise((resolve) => setTimeout(resolve, attempt * 750));
      continue;
    }
    throw new Error(`Dicta returned HTTP ${response.status}`);
  }

  const tokenLines = splitResponseLines(await response.json());
  if (tokenLines.length !== batch.length) {
    throw new Error(`Dicta returned ${tokenLines.length} lines for ${batch.length} entries`);
  }
  return tokenLines.map((tokens, index) => choosePointing(tokens, batch[index].transliteration));
}

async function run() {
  const entries = loadEntries();
  const baselineEntries = loadBaselineEntries();
  if (baselineEntries.length !== entries.length) {
    throw new Error(`Baseline has ${baselineEntries.length} entries; current file has ${entries.length}`);
  }
  const batches = makeBatches(entries, baselineEntries);

  for (const [batchIndex, batch] of batches.entries()) {
    const pointedLines = await pointBatch(batch);
    pointedLines.forEach((pointedHebrew, lineIndex) => {
      entries[batch[lineIndex].index].hebrew = pointedHebrew;
    });
    console.log(`Pointed batch ${batchIndex + 1}/${batches.length}`);
  }

  entries.forEach((entry) => {
    const correction =
      MANUAL_CORRECTIONS_BY_ENGLISH.get(`${entry.english}||${entry.transliteration}`) ||
      MANUAL_CORRECTIONS_BY_ENGLISH.get(entry.english);
    if (correction) Object.assign(entry, correction);
  });

  const output = [
    "// Generated from Teach Me Hebrew's modern frequency list.",
    "// Hebrew forms were vocalized directly with Dicta Nakdan (modern genre).",
    "const HEBREW_EXPANDED_WORDS =",
    `${JSON.stringify(entries, null, 2)};`,
    "",
  ].join("\n");
  fs.writeFileSync(expandedWordsPath, output, "utf8");
  console.log(`Updated ${entries.length} expanded Hebrew entries.`);
}

module.exports = {
  editDistance,
  normalizeTransliteration,
  transliteratePointedHebrew,
};

if (require.main === module) {
  run().catch((error) => {
    console.error(error.stack || error);
    process.exitCode = 1;
  });
}

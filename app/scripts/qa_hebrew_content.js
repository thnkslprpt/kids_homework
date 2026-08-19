#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { loadAppContext } = require("./qa_question_generation.js");

const repoRoot = path.resolve(__dirname, "../..");
const context = loadAppContext();
const failures = [];

function evaluate(source) {
  return vm.runInContext(source, context, { timeout: 5000 });
}

function expectEqual(label, actual, expected) {
  if (actual !== expected) {
    failures.push(`${label}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

const bankReport = evaluate(`({
  adultTotal: adultHebrewQuestionBank.length,
  adultUnpointed: adultHebrewQuestionBank.filter((entry) => !hasHebrewNikkud(entry.hebrewDisplay)).length,
  expandedTotal: HEBREW_EXPANDED_WORDS.length,
  expandedUnpointed: HEBREW_EXPANDED_WORDS.filter((entry) => !hasHebrewNikkud(entry.hebrew)).length,
  expandedCuratedTotal: HEBREW_EXPANDED_CURATED_WORDS.length,
  expandedCuratedByGrade: Object.fromEntries(
    Array.from({ length: 5 }, (_, index) => index + 6).map((grade) => [
      grade,
      HEBREW_EXPANDED_CURATED_WORDS.filter((entry) => entry.difficulty === grade).length,
    ])
  ),
  generalTotal: hebrewQuestionBank.length,
  generalUnpointed: hebrewQuestionBank.filter((entry) => !hasHebrewNikkud(entry.hebrewDisplay)).length,
})`);

expectEqual("general vocabulary entries without nikud", bankReport.generalUnpointed, 0);
expectEqual("adult vocabulary entries without nikud", bankReport.adultUnpointed, 0);
expectEqual("expanded vocabulary entries without nikud", bankReport.expandedUnpointed, 0);

const expandedEntries = evaluate("HEBREW_EXPANDED_WORDS");
const curatedExpandedEntries = evaluate("HEBREW_EXPANDED_CURATED_WORDS");
const malformedExpandedEntries = expandedEntries.filter((entry) => /[\u05D0-\u05EA][\u05B9\u05BB]ו/.test(entry.hebrew));
expectEqual("expanded entries with contradictory vowel-letter pointing", malformedExpandedEntries.length, 0);

const reviewedExpandedMeanings = new Map([
  ["Bacterium", "חַיְדַּק"],
  ["Common / available (f.s.)", "מְצוּיָה"],
  ["Council of", "מוֹעֶצֶת"],
  ["Defeat", "תְּבוּסָה"],
  ["Execution / putting to death", "הוֹצָאָה לַהֹרֶג"],
  ["Eyes of", "עֵינֵי"],
  ["His life", "חַיָּיו"],
  ["Long (m.s.)", "אָרֹךְ"],
  ["Sight / view / appearance / show (m.s.)", "מַרְאֶה"],
  ["The cemetery", "בֵּית הַקְּבָרוֹת"],
  ["The spider (female)", "הָעַכְבִישָׁה"],
  ["Transition / pass", "מַעֲבָר"],
  ["Unit / squad / only / single", "יְחִידָה"],
  ["These (pl.)", "אֵלּוּ"],
  ["Sword / fencing", "סַיִף"],
]);
for (const [english, expectedHebrew] of reviewedExpandedMeanings) {
  const matchingEntries = expandedEntries.filter((entry) => entry.english === english);
  if (!matchingEntries.length || matchingEntries.some((entry) => entry.hebrew !== expectedHebrew)) {
    failures.push(`${english}: expected only ${expectedHebrew}`);
  }
}

const malformedCuratedGlosses = curatedExpandedEntries.filter(
  (entry) => /\/\s*\//.test(entry.english) || (entry.english.match(/\//g) || []).length > 3
);
expectEqual("malformed expanded glosses reaching child bank", malformedCuratedGlosses.length, 0);

const sensitiveCuratedGlossCount = evaluate(
  "HEBREW_EXPANDED_CURATED_WORDS.filter((entry) => HEBREW_EXPANDED_CHILD_SENSITIVE_PATTERN.test(entry.english)).length"
);
expectEqual("unreviewed sensitive expanded glosses reaching child bank", sensitiveCuratedGlossCount, 0);

const fragmentCuratedGlossCount = evaluate(
  "HEBREW_EXPANDED_CURATED_WORDS.filter((entry) => HEBREW_EXPANDED_FRAGMENT_PATTERN.test(entry.english)).length"
);
expectEqual("context fragments reaching child bank", fragmentCuratedGlossCount, 0);

const curatedContentIds = curatedExpandedEntries.map((entry) => String(entry.contentId || ""));
expectEqual("expanded child entries without content IDs", curatedContentIds.filter((id) => !id).length, 0);
expectEqual("duplicate expanded child content IDs", new Set(curatedContentIds).size, curatedContentIds.length);
for (const [grade, count] of Object.entries(bankReport.expandedCuratedByGrade)) {
  if (count < 6) {
    failures.push(`reviewed expanded grade ${grade}: expected at least 6 entries, got ${count}`);
  }
}
expectEqual(
  "non-human-reviewed expanded entries reaching child bank",
  curatedExpandedEntries.filter((entry) => entry.reviewStatus !== "human-reviewed").length,
  0
);

const pointingCases = new Map([
  ["הספר נמצא בתיק.", "הַסֵּפֶר נִמְצָא בַּתִּיק."],
  ["אחר כך הוא קורא בשקט.", "אַחַר כָּךְ הוּא קוֹרֵא בְּשֶׁקֶט."],
  ["הילדה ישנה.", "הַיַּלְדָה יְשֵׁנָה."],
  [
    "במהלך ההיריון חשוב ליטול חומצה פולית ולעקוב אחר לחץ דם.",
    "בְּמַהֲלָךְ הַהֵרָיוֹן חָשׁוּב לִטּוֹל חֻמְצָה פּוֹלִית וְלַעֲקֹב אַחַר לַחַץ דָּם.",
  ],
  [
    "הרופאה בדקה את השליה, את מי השפיר ואת הדופק העוברי.",
    "הָרוֹפְאָה בָּדְקָה אֶת הַשִּׁלְיָה, אֶת מֵי הַשָּׁפִיר וְאֶת הַדֹּפֶק הָעֻבָּרִי.",
  ],
]);

for (const [source, expected] of pointingCases) {
  const actual = evaluate(`applyHebrewSentenceNikkud(${JSON.stringify(source)})`);
  expectEqual(`nikud for ${source}`, actual, expected);
}

// Low-level sentence completion should stay approachable for early readers:
// one short sentence, one missing word, and fewer choices before level 4.
const lowLevelSentenceLimits = {
  1: { choices: 3, words: 4 },
  2: { choices: 3, words: 5 },
  3: { choices: 3, words: 6 },
  4: { choices: 4, words: 7 },
};
for (const [levelText, limits] of Object.entries(lowLevelSentenceLimits)) {
  const level = Number(levelText);
  for (let sample = 0; sample < 80; sample += 1) {
    const entry = evaluate(`createHebrewSentenceDragGeneratedEntry(${level})`);
    if (entry.answer.length !== 1) {
      failures.push(`Hebrew sentence drag level ${level}: expected one blank, got ${entry.answer.length}`);
      break;
    }
    if (entry.choices.length !== limits.choices) {
      failures.push(
        `Hebrew sentence drag level ${level}: expected ${limits.choices} choices, got ${entry.choices.length}`
      );
      break;
    }
    const wordCount = entry.reviewText.trim().split(/\s+/).length;
    if (wordCount > limits.words) {
      failures.push(
        `Hebrew sentence drag level ${level}: expected at most ${limits.words} words, got ${wordCount}`
      );
      break;
    }
  }
}

evaluate(`
  globalThis.__hebrewUnknownTokens = new Map();
  const __originalFallbackHebrewNikkud = addFallbackHebrewNikkud;
  addFallbackHebrewNikkud = (word) => {
    globalThis.__hebrewUnknownTokens.set(
      word,
      (globalThis.__hebrewUnknownTokens.get(word) || 0) + 1
    );
    return __originalFallbackHebrewNikkud(word);
  };
`);

// Exercise every Hebrew token present in the reviewed source files. Random
// generation alone cannot guarantee that every sentence-drag blueprint is drawn.
const pointingCoverageFiles = [
  "app/core/config.js",
  "app/main/constants.js",
  "app/questions/hebrew/adult-hebrew-module.js",
  "app/questions/hebrew/hebrew.js",
  "app/questions/hebrew/sentence-drag-hebrew.js",
];
for (const relativePath of pointingCoverageFiles) {
  const content = fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
  const stringLiterals = content.match(/"(?:\\.|[^"\\])*"/g) || [];
  for (const literal of stringLiterals) {
    let value;
    try {
      value = vm.runInNewContext(literal);
    } catch {
      continue;
    }
    if (/[\u05D0-\u05EA]/.test(value)) {
      evaluate(`applyHebrewSentenceNikkud(${JSON.stringify(value)})`);
    }
  }
}

for (let difficulty = 1; difficulty <= 10; difficulty += 1) {
  for (let sample = 0; sample < 120; sample += 1) {
    evaluate(
      `buildSessionQuestions(1, ${difficulty}, { adaptiveReview: false, selectedCategories: ["hebrew"], minDifficulty: ${difficulty} })`
    );
  }
}
evaluate("buildAdultSessionQuestions(1200)");

const allowedUnknownTokens = new Set(["חלט", "נהל", "סבר", "שלומ", "שלון", "שלופ"]);
const unexpectedUnknownTokens = evaluate("Array.from(globalThis.__hebrewUnknownTokens.keys())").filter(
  (word) => !/^[א-ת]$/.test(word) && !allowedUnknownTokens.has(word)
);
if (unexpectedUnknownTokens.length) {
  failures.push(`generated Hebrew reached the nikud fallback: ${unexpectedUnknownTokens.join(", ")}`);
}

for (let sample = 0; sample < 40; sample += 1) {
  const contrast = evaluate(`createHebrewNikkudContrastQuestion(
    { hebrewHomograph: createPool(DEFAULT_HEBREW_BANKS.homographQuestionBank) },
    10
  )`);
  if (!contrast || /[\u0591-\u05C7]/.test(String(contrast.displayText || ""))) {
    failures.push("homograph contrast must show the shared letters unpointed without choosing a meaning");
    break;
  }
}

const reviewedSourceFiles = [
  "app/main/constants.js",
  "app/questions/hebrew/adult-hebrew-module.js",
  "app/questions/hebrew/hebrew-image-words.js",
  "app/questions/hebrew/hebrew-words.js",
  "app/questions/hebrew/hebrew.js",
  "app/questions/hebrew/sentence-drag-hebrew.js",
];
const bannedSpellings = [
  "עפרון",
  "עגבניה",
  "מכנסים קצרים",
  "ספריה",
  "שרותים",
  "שיליית",
  "בואקום",
  "פטריה",
];

for (const relativePath of reviewedSourceFiles) {
  const content = fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
  for (const spelling of bannedSpellings) {
    if (content.includes(spelling)) {
      failures.push(`${relativePath}: obsolete spelling ${spelling}`);
    }
  }
}

console.log(
  `Checked ${bankReport.generalTotal} general terms (${bankReport.expandedTotal} raw expanded; ${bankReport.expandedCuratedTotal} child-safe expanded), ${bankReport.adultTotal} adult terms, and generated Hebrew at every difficulty.`
);

if (failures.length) {
  console.error(`\n${failures.length} Hebrew QA failure${failures.length === 1 ? "" : "s"}:`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("No Hebrew content or nikud regression failures found.");
}

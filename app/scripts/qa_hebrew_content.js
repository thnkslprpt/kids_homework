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
  generalTotal: hebrewQuestionBank.length,
  generalUnpointed: hebrewQuestionBank.filter((entry) => !hasHebrewNikkud(entry.hebrewDisplay)).length,
})`);

expectEqual("general vocabulary entries without nikud", bankReport.generalUnpointed, 0);
expectEqual("adult vocabulary entries without nikud", bankReport.adultUnpointed, 0);
expectEqual("expanded vocabulary entries without nikud", bankReport.expandedUnpointed, 0);

const expandedEntries = evaluate("HEBREW_EXPANDED_WORDS");
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
]);
for (const [english, expectedHebrew] of reviewedExpandedMeanings) {
  const matchingEntries = expandedEntries.filter((entry) => entry.english === english);
  if (!matchingEntries.length || matchingEntries.some((entry) => entry.hebrew !== expectedHebrew)) {
    failures.push(`${english}: expected only ${expectedHebrew}`);
  }
}

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
  `Checked ${bankReport.generalTotal} general terms (${bankReport.expandedTotal} expanded), ${bankReport.adultTotal} adult terms, and generated Hebrew at every difficulty.`
);

if (failures.length) {
  console.error(`\n${failures.length} Hebrew QA failure${failures.length === 1 ? "" : "s"}:`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("No Hebrew content or nikud regression failures found.");
}

#!/usr/bin/env node

const vm = require("node:vm");
const {
  categories,
  choiceComparisonKey,
  loadAppContext,
  textKey,
  validateQuestion,
} = require("./qa_question_generation.js");

const samplesPerGrade = Number.parseInt(process.argv[2] || "20", 10);
const context = loadAppContext();
const failures = [];
const warnings = [];
const promptAnswers = new Map();
const metadataStats = new Map();
const lengthCues = new Map();
const auditedStaticBankExpressions = new Map([
  ["general-knowledge", "GENERAL_KNOWLEDGE_ACTIVE_QUESTIONS"],
  ["rationality", "RATIONALITY_ACTIVE_QUESTIONS"],
  ["reading-comprehension", "READING_COMPREHENSION_ACTIVE_QUESTIONS"],
  ["science-evidence", "SCIENCE_EVIDENCE_ACTIVE_QUESTIONS"],
  ["nutrition", "NUTRITION_ACTIVE_QUESTIONS"],
]);

const metadataRequiredCategories = new Set([
  "computing",
  "general-knowledge",
  "health-and-first-aid",
  "history",
  "reading-comprehension",
  "science",
  "science-evidence",
  "vocabulary-grammar",
]);

const retiredWording = [
  /\bHow many continents are there\?$/,
  /\bWhat is the highest mountain on Earth\?$/,
  /\bWhat is the largest island in the world\?$/,
  /\bWhat is exchange rate\?$/,
  /\bSward \/ fencing\b/,
  /\bWhich \(pl\.\)\b/,
  /\/\s*\//,
];

function visiblePrompt(question) {
  return [
    question?.questionText,
    question?.displayText,
    question?.extraText,
    question?.visualSummary,
    question?.visualHtml,
  ].filter(Boolean).join(" | ");
}

function answerText(question) {
  return String(question?.answerValue ?? question?.answerLabel ?? "").trim();
}

function recordMetadata(category, question, label) {
  const stat = metadataStats.get(category) || { total: 0, ids: 0, skills: 0, explanations: 0 };
  stat.total += 1;
  if (String(question?.contentId || "").trim()) stat.ids += 1;
  if (String(question?.skill || "").trim()) stat.skills += 1;
  if (String(question?.explanation || question?.reviewText || "").trim()) stat.explanations += 1;
  metadataStats.set(category, stat);

  const min = Number(question?.gradeMin);
  const max = Number(question?.gradeMax);
  if (Number.isFinite(min) || Number.isFinite(max)) {
    if (!Number.isInteger(min) || !Number.isInteger(max) || min < 1 || max > 10 || min > max) {
      failures.push(`${label}: invalid grade range ${question?.gradeMin}-${question?.gradeMax}`);
    } else if (Number(question.difficulty) < min || Number(question.difficulty) > max) {
      failures.push(`${label}: difficulty ${question.difficulty} is outside metadata range ${min}-${max}`);
    }
  }

  if (category === "health-and-first-aid") {
    const source = question?.source;
    if (!source || typeof source !== "object" || !String(source.url || "").startsWith("https://")) {
      failures.push(`${label}: reviewed health content needs an HTTPS source`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(question?.reviewedAt || ""))) {
      failures.push(`${label}: reviewed health content needs reviewedAt YYYY-MM-DD`);
    }
  }
}

function recordLengthCue(category, question, label) {
  if (question?.mode !== "choice") return;
  const options = Array.isArray(question.options) ? question.options.map(String) : [];
  const answer = answerText(question);
  const otherLengths = options.filter((option) => option !== answer).map((option) => option.trim().length);
  if (!otherLengths.length) return;
  const longestDistractor = Math.max(...otherLengths);
  if (answer.length >= longestDistractor + 15) {
    const entries = lengthCues.get(category) || [];
    entries.push({ label, answer, longestDistractor, prompt: visiblePrompt(question) });
    lengthCues.set(category, entries);
  }
}

for (const category of categories) {
  for (let grade = 1; grade <= 10; grade += 1) {
    for (let sample = 0; sample < samplesPerGrade; sample += 1) {
      const label = `${category} grade ${grade} sample ${sample + 1}`;
      let question;
      try {
        [question] = vm.runInContext(
          `buildSessionQuestions(1, ${grade}, { adaptiveReview: false, selectedCategories: [${JSON.stringify(category)}], minDifficulty: ${grade} })`,
          context,
          { timeout: 1000 }
        );
      } catch (error) {
        failures.push(`${label}: generation threw ${error.message || error}`);
        continue;
      }

      failures.push(...validateQuestion(question, label));
      const prompt = visiblePrompt(question);
      const answer = answerText(question);
      const optionContext = (question?.options || []).map(textKey).sort().join("|");
      const identity = textKey(`${category}|${prompt}|${optionContext}`);
      if (question?.mode === "choice" && identity && answer) {
        const comparisonKey = choiceComparisonKey(answer, question?.comparisonMode);
        const previous = promptAnswers.get(identity);
        if (previous && previous !== comparisonKey) {
          failures.push(
            `${label}: identical prompt/context produced conflicting answers ${previous} and ${comparisonKey}` +
              ` | prompt=${JSON.stringify(prompt)} | options=${JSON.stringify(question?.options || [])}`
              + ` | difficulty=${JSON.stringify(question?.difficulty)} | contentId=${JSON.stringify(question?.contentId || "")}`
          );
        } else {
          promptAnswers.set(identity, comparisonKey);
        }
      }

      const allText = `${prompt} ${answer} ${(question?.options || []).join(" ")}`;
      const editorialText = [
        question?.questionText,
        question?.displayText,
        question?.extraText,
        answer,
        ...(question?.options || []),
      ].filter(Boolean).join(" ");
      for (const pattern of retiredWording) {
        if (pattern.test(editorialText)) failures.push(`${label}: retired or malformed wording matched ${pattern}`);
      }

      recordMetadata(category, question, label);
      recordLengthCue(category, question, label);
    }
  }
}

const staticCueReports = [];
for (const [category, expression] of auditedStaticBankExpressions) {
  const entries = vm.runInContext(expression, context);
  const cues = entries.filter((item) => {
    const answer = String(item?.answer || "").trim();
    const distractorLengths = (item?.options || [])
      .map(String)
      .filter((option) => option !== answer)
      .map((option) => option.trim().length);
    return distractorLengths.length && distractorLengths.every((length) => answer.length >= length + 15);
  });
  const rate = entries.length ? cues.length / entries.length : 0;
  staticCueReports.push(`${category}: ${cues.length}/${entries.length} (${(rate * 100).toFixed(1)}%)`);
  if (rate > 0.02) {
    failures.push(`${category}: active static-bank answer-length cue rate ${(rate * 100).toFixed(1)}% exceeds 2%`);
  }
}

for (const [category, stat] of metadataStats) {
  if (!metadataRequiredCategories.has(category)) continue;
  const idCoverage = stat.ids / stat.total;
  const skillCoverage = stat.skills / stat.total;
  const explanationCoverage = stat.explanations / stat.total;
  if (idCoverage < 0.85 || skillCoverage < 0.85 || explanationCoverage < 0.85) {
    failures.push(
      `${category}: metadata coverage IDs ${(idCoverage * 100).toFixed(1)}%, skills ${(skillCoverage * 100).toFixed(1)}%, explanations ${(explanationCoverage * 100).toFixed(1)}%`
    );
  }
}

for (const category of categories) {
  const stat = metadataStats.get(category) || { total: 0 };
  const cues = lengthCues.get(category) || [];
  const rate = stat.total ? cues.length / stat.total : 0;
  if (cues.length) {
    warnings.push(`${category}: ${cues.length}/${stat.total} sampled choices (${(rate * 100).toFixed(1)}%) have a possible answer-length cue`);
    cues.slice(0, 2).forEach((cue) =>
      warnings.push(`  ${cue.prompt.slice(0, 110)} -> ${cue.answer.slice(0, 90)}`)
    );
  }
  const maximumRate = auditedStaticBankExpressions.has(category) ? 0.05 : 0.25;
  if (stat.total >= 40 && rate > maximumRate) {
    failures.push(
      `${category}: sampled answer-length cue rate ${(rate * 100).toFixed(1)}% exceeds ${(maximumRate * 100).toFixed(0)}%`
    );
  }
}

console.log(`Content-quality QA sampled ${categories.length * 10 * samplesPerGrade} questions across ${categories.length} categories.`);
console.log(`Active static-bank cue rates (answer at least 15 characters longer than every distractor):\n- ${staticCueReports.join("\n- ")}`);
if (warnings.length) {
  console.log(`\n${warnings.length} editorial warning lines:`);
  warnings.slice(0, 120).forEach((warning) => console.log(`- ${warning}`));
  if (warnings.length > 120) console.log(`... ${warnings.length - 120} warning lines omitted`);
}

if (failures.length) {
  console.error(`\n${failures.length} content-quality failures:`);
  failures.slice(0, 200).forEach((failure) => console.error(`- ${failure}`));
  if (failures.length > 200) console.error(`... ${failures.length - 200} failures omitted`);
  process.exitCode = 1;
} else {
  console.log("\nNo content-quality gate failures found.");
}

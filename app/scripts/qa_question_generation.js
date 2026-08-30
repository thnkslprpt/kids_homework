#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { resolveQaAppScriptSources } = require("./qa_app_sources.js");

const repoRoot = path.resolve(__dirname, "../..");
const htmlPath = path.join(repoRoot, "homework.html");
const samplesPerDifficulty = Number.parseInt(process.argv[2] || "40", 10);

const categories = [
  "math",
  "addition-subtraction",
  "multiplication-division",
  "place-value-decimals",
  "geometry",
  "patterns-sequences",
  "coordinates-functions",
  "hebrew",
  "science",
  "science-evidence",
  "time",
  "statistics",
  "negative-numbers",
  "percentages",
  "algebra",
  "applied-word-problems",
  "visual-math",
  "visual-measurement",
  "logic",
  "rationality",
  "general-knowledge",
  "geography",
  "geography-map",
  "history",
  "population",
  "computing",
  "financial-literacy",
  "measurement",
  "charts-and-graphs",
  "calendar",
  "estimation",
  "probability",
  "reading-comprehension",
  "vocabulary-grammar",
  "maps-and-directions",
  "health-and-first-aid",
  "nutrition",
  "household-problem-solving",
  "fractions",
  "fractions-and-ratios",
  "spatial-reasoning",
];

function createClassList() {
  const values = new Set();
  return {
    add: (...classes) => classes.forEach((className) => values.add(className)),
    remove: (...classes) => classes.forEach((className) => values.delete(className)),
    toggle: (className, force) => {
      const shouldAdd = force === undefined ? !values.has(className) : Boolean(force);
      if (shouldAdd) {
        values.add(className);
      } else {
        values.delete(className);
      }
      return shouldAdd;
    },
    contains: (className) => values.has(className),
    toString: () => Array.from(values).join(" "),
  };
}

function createElement(tagName = "div") {
  const element = {
    tagName: String(tagName).toUpperCase(),
    children: [],
    dataset: {},
    style: {
      setProperty(name, value) {
        this[name] = String(value);
      },
      removeProperty(name) {
        delete this[name];
      },
    },
    classList: createClassList(),
    attributes: {},
    hidden: false,
    disabled: false,
    value: "",
    textContent: "",
    innerHTML: "",
    appendChild(child) {
      this.children.push(child);
      child.parentNode = this;
      return child;
    },
    prepend(child) {
      this.children.unshift(child);
      child.parentNode = this;
      return child;
    },
    remove() {
      if (!this.parentNode) {
        return;
      }
      this.parentNode.children = this.parentNode.children.filter((child) => child !== this);
    },
    addEventListener() {},
    removeEventListener() {},
    setAttribute(name, value) {
      this.attributes[name] = String(value);
    },
    getAttribute(name) {
      return this.attributes[name] || "";
    },
    querySelectorAll() {
      return [];
    },
    querySelector() {
      return null;
    },
    focus() {},
    getBoundingClientRect() {
      return { left: 0, top: 0, width: 100, height: 40, right: 100, bottom: 40 };
    },
  };
  return element;
}

function createStorage() {
  const values = new Map();
  return {
    getItem: (key) => (values.has(key) ? values.get(key) : null),
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: (key) => values.delete(key),
    clear: () => values.clear(),
  };
}

function createContext() {
  const elementsById = new Map();
  const document = {
    body: createElement("body"),
    documentElement: createElement("html"),
    createElement,
    createElementNS: (_namespace, tagName) => createElement(tagName),
    addEventListener() {},
    removeEventListener() {},
    getElementById(id) {
      if (!elementsById.has(id)) {
        const element = createElement("div");
        element.id = id;
        if (id === "difficulty-level") {
          element.value = "3";
        }
        if (id === "question-count") {
          element.value = "30";
        }
        elementsById.set(id, element);
      }
      return elementsById.get(id);
    },
    querySelectorAll() {
      return [];
    },
    querySelector() {
      return null;
    },
  };
  const storage = createStorage();
  const context = {
    console,
    document,
    window: null,
    globalThis: null,
    localStorage: storage,
    Math,
    Date,
    JSON,
    Number,
    String,
    Boolean,
    Array,
    Object,
    Set,
    Map,
    RegExp,
    Error,
    URLSearchParams,
    navigator: {
      serviceWorker: {
        controller: null,
        addEventListener() {},
        register() {
          return Promise.resolve({
            waiting: null,
            installing: null,
            addEventListener() {},
          });
        },
      },
    },
    setTimeout,
    clearTimeout,
    requestAnimationFrame(callback) {
      return setTimeout(() => callback(Date.now()), 0);
    },
    cancelAnimationFrame(id) {
      clearTimeout(id);
    },
  };
  context.window = {
    document,
    localStorage: storage,
    navigator: context.navigator,
    innerWidth: 1280,
    innerHeight: 900,
    location: { search: "" },
    addEventListener() {},
    removeEventListener() {},
    setTimeout,
    clearTimeout,
    requestAnimationFrame: context.requestAnimationFrame,
    cancelAnimationFrame: context.cancelAnimationFrame,
  };
  context.globalThis = context;
  return vm.createContext(context);
}

function scriptSourcesFromHtml() {
  return resolveQaAppScriptSources(repoRoot, htmlPath);
}

function loadAppContext() {
  const context = createContext();
  for (const source of scriptSourcesFromHtml()) {
    const fullPath = path.join(repoRoot, source);
    const code = fs.readFileSync(fullPath, "utf8");
    vm.runInContext(code, context, { filename: source });
  }
  return context;
}

function textKey(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replaceAll(",", "")
    .replace(/\s+/g, " ");
}

function linearEquationKey(value) {
  const normalized = String(value ?? "")
    .trim()
    .toLowerCase()
    .replaceAll("−", "-")
    .replace(/\s+/g, "");
  const match = normalized.match(/^y=([+-]?\d*)x(.*)$/);
  if (!match) return "";

  const coefficientText = match[1];
  const coefficient = coefficientText === "" || coefficientText === "+"
    ? 1
    : coefficientText === "-"
      ? -1
      : Number(coefficientText);
  const interceptText = match[2].replaceAll("+-", "-").replaceAll("--", "+");
  const intercept = interceptText === "" ? 0 : Number(interceptText);
  if (!Number.isFinite(coefficient) || !Number.isFinite(intercept)) return "";
  return `linear-equation:${coefficient}:${intercept}`;
}

function numericValueKey(value) {
  const normalized = String(value ?? "")
    .trim()
    .replaceAll(",", "")
    .replaceAll("−", "-")
    .replace(/\s+/g, " ");
  let numericValue;

  const mixedNumberMatch = normalized.match(/^([+-]?\d+) (\d+)\s*\/\s*(\d+)$/);
  if (mixedNumberMatch) {
    const whole = Number(mixedNumberMatch[1]);
    const numerator = Number(mixedNumberMatch[2]);
    const denominator = Number(mixedNumberMatch[3]);
    if (denominator === 0) return "";
    numericValue = whole < 0
      ? whole - numerator / denominator
      : whole + numerator / denominator;
  } else {
    const fractionMatch = normalized.match(/^([+-]?\d+)\s*\/\s*([+-]?\d+)$/);
    if (fractionMatch) {
      const numerator = Number(fractionMatch[1]);
      const denominator = Number(fractionMatch[2]);
      if (denominator === 0) return "";
      numericValue = numerator / denominator;
    } else {
      const percentMatch = normalized.match(/^([+-]?(?:\d+(?:\.\d+)?|\.\d+))%$/);
      if (percentMatch) {
        numericValue = Number(percentMatch[1]) / 100;
      } else if (/^[+-]?(?:\d+(?:\.\d+)?|\.\d+)$/.test(normalized)) {
        numericValue = Number(normalized);
      } else {
        return "";
      }
    }
  }

  return Number.isFinite(numericValue) ? `numeric:${numericValue.toPrecision(15)}` : "";
}

function choiceComparisonKey(value, comparisonMode = "semantic") {
  return comparisonMode === "exact-text"
    ? String(value ?? "").trim().replace(/\s+/g, " ")
    : linearEquationKey(value) || numericValueKey(value) || textKey(value);
}

function validateQuestion(question, meta) {
  const errors = [];
  if (!question || typeof question !== "object") {
    return [`${meta}: question is not an object`];
  }

  const mode = String(question.mode || "");
  if (!["choice", "input", "drag", "practice", "interactive"].includes(mode)) {
    errors.push(`${meta}: unsupported mode ${JSON.stringify(question.mode)}`);
  }

  const hasPrompt = String(question.questionText || question.displayText || question.visualSummary || "").trim();
  if (!hasPrompt) {
    errors.push(`${meta}: missing visible prompt text`);
  }

  const difficulty = Number(question.difficulty);
  if (!Number.isInteger(difficulty) || difficulty < 1 || difficulty > 10) {
    errors.push(`${meta}: invalid difficulty ${JSON.stringify(question.difficulty)}`);
  }

  if (mode === "choice") {
    const options = Array.isArray(question.options) ? question.options.map(String) : [];
    const answer = String(question.answerValue ?? "");
    const optionKeys = options.map((option) => choiceComparisonKey(option, question.comparisonMode));
    if (options.length !== 4) {
      errors.push(`${meta}: choice question has ${options.length} options`);
    }
    if (!answer) {
      errors.push(`${meta}: choice question is missing answerValue`);
    }
    if (!options.includes(answer)) {
      errors.push(`${meta}: answer is not one of the options: ${answer}`);
    }
    if (new Set(optionKeys).size !== optionKeys.length) {
      errors.push(`${meta}: duplicate or equivalent options: ${options.join(" | ")}`);
    }
    if (options.some((option) => !option.trim())) {
      errors.push(`${meta}: blank option`);
    }

    const tokenPercentMatch = String(question.questionText || "").match(
      /^(\d+(?:\.\d+)?)% of (\d+) game tokens are blue\./i
    );
    if (tokenPercentMatch) {
      const percent = Number(tokenPercentMatch[1]);
      const total = Number(tokenPercentMatch[2]);
      const expectedFilled = (percent * total) / 100;
      const visualTotal = Number(
        String(question.visualHtml || "").match(/data-collection-total="(\d+)"/)?.[1]
      );
      const visualFilled = Number(
        String(question.visualHtml || "").match(/data-filled-count="(\d+)"/)?.[1]
      );
      if (Number(answer) !== expectedFilled) {
        errors.push(`${meta}: token percent answer should be ${expectedFilled}, got ${answer}`);
      }
      if (visualTotal !== total || visualFilled !== expectedFilled) {
        errors.push(
          `${meta}: token visual should contain ${total} cells with ${expectedFilled} filled, got ${visualTotal} and ${visualFilled}`
        );
      }
    }
  }

  if (mode === "input") {
    const answer = Number(question.answerValue);
    if (!Number.isFinite(answer)) {
      errors.push(`${meta}: input answer is not a finite number: ${JSON.stringify(question.answerValue)}`);
    }
  }

  if (mode === "drag") {
    const parts = Array.isArray(question.dragTemplateParts) ? question.dragTemplateParts : null;
    const choices =
      question.dragLayout === "matching" && Array.isArray(question.matchRightItems)
        ? question.matchRightItems
        : Array.isArray(question.dragChoices)
          ? question.dragChoices
          : [];
    const answers = Array.isArray(question.dragAnswerTokens) ? question.dragAnswerTokens.map(String) : [];
    const choiceTexts = choices.map((choice) => String(choice?.text ?? ""));
    if (parts && parts.length !== answers.length + 1) {
      errors.push(`${meta}: drag template has ${parts.length} parts for ${answers.length} answers`);
    }
    if (!answers.length) {
      errors.push(`${meta}: drag question has no answer tokens`);
    }
    if (choiceTexts.some((choice) => !choice.trim())) {
      errors.push(`${meta}: drag question has a blank choice`);
    }
    const choiceKeySet = new Set(choiceTexts.map(textKey));
    for (const answer of answers) {
      if (!choiceKeySet.has(textKey(answer))) {
        errors.push(`${meta}: drag answer token missing from choices: ${answer}`);
      }
    }
  }

  if (mode === "practice") {
    if (!String(question.completionValue || "").trim()) {
      errors.push(`${meta}: practice question missing completion value`);
    }
  }

  if (mode === "interactive") {
    const interactive = question.interactive && typeof question.interactive === "object"
      ? question.interactive
      : null;
    const layout = String(interactive?.layout || "");
    const answerIndexes = Array.isArray(interactive?.answerIndexes)
      ? interactive.answerIndexes.map(Number)
      : [];
    if (!interactive) {
      errors.push(`${meta}: interactive question is missing its configuration`);
    } else if (layout === "command-sequence") {
      if (!Array.isArray(interactive.answerSequence) || !interactive.answerSequence.length) {
        errors.push(`${meta}: command sequence is missing its answer steps`);
      }
    } else if (!answerIndexes.length || new Set(answerIndexes).size !== answerIndexes.length) {
      errors.push(`${meta}: interactive answer indexes are missing or duplicated`);
    } else if (["option-select", "multi-select"].includes(layout)) {
      const choices = Array.isArray(interactive.choices) ? interactive.choices : [];
      if (choices.length < 2 || answerIndexes.some((index) => !Number.isInteger(index) || index < 0 || index >= choices.length)) {
        errors.push(`${meta}: interactive answers do not point to available choices`);
      }
      const choiceKeys = choices.map((choice) => textKey(choice?.summary || choice?.label || ""));
      if (choiceKeys.some((key) => !key) || new Set(choiceKeys).size !== choiceKeys.length) {
        errors.push(`${meta}: interactive choices have blank or duplicate summaries`);
      }
      const visualKeys = choices
        .map((choice) => String(choice?.html || "").replace(/\saria-(?:label|hidden)="[^"]*"/g, "").replace(/\s+/g, " ").trim())
        .filter(Boolean);
      if (visualKeys.length === choices.length && new Set(visualKeys).size !== visualKeys.length) {
        errors.push(`${meta}: interactive choices render duplicate option markup`);
      }
      if (layout === "multi-select" && answerIndexes.length < 2) {
        errors.push(`${meta}: multi-select needs more than one correct choice`);
      }
    } else if (layout === "part-select") {
      const parts = Array.isArray(interactive.parts) ? interactive.parts : [];
      if (parts.length < 2 || answerIndexes.some((index) => !Number.isInteger(index) || index < 0 || index >= parts.length)) {
        errors.push(`${meta}: interactive answers do not point to available parts`);
      }
    } else if (layout === "paired-select") {
      const pairedEntries = {};
      for (const [field, label] of [["items", "answers"], ["reasons", "reasons"]]) {
        const entries = Array.isArray(interactive[field]) ? interactive[field] : [];
        pairedEntries[field] = entries;
        const entryKeys = entries.map((entry) => choiceComparisonKey(entry?.summary || entry?.label || ""));
        if (entries.length < 2 || entryKeys.some((key) => !key) || new Set(entryKeys).size !== entryKeys.length) {
          errors.push(`${meta}: paired-select has blank, missing, or duplicate ${label}`);
        }
      }
      const answerItemIndex = Number(interactive.answerItemIndex);
      const answerReasonIndex = Number(interactive.answerReasonIndex);
      if (!Number.isInteger(answerItemIndex) || answerItemIndex < 0 || answerItemIndex >= pairedEntries.items.length) {
        errors.push(`${meta}: paired-select does not point to exactly one available answer`);
      }
      if (!Number.isInteger(answerReasonIndex) || answerReasonIndex < 0 || answerReasonIndex >= pairedEntries.reasons.length) {
        errors.push(`${meta}: paired-select does not point to exactly one available reason`);
      }
      if (answerIndexes.length !== 1 || answerIndexes[0] !== answerItemIndex) {
        errors.push(`${meta}: paired-select answerIndexes must contain only answerItemIndex`);
      }

      const questionText = String(question.questionText || "");
      if (/choose the calculation that proves it/i.test(questionText)) {
        const correctAnswer = String(pairedEntries.items[answerItemIndex]?.summary || "");
        const correctReason = String(pairedEntries.reasons[answerReasonIndex]?.summary || "");
        if (!correctAnswer || !textKey(correctReason).includes(textKey(`= ${correctAnswer}`))) {
          errors.push(`${meta}: proof question's reason does not calculate the exact answer`);
        }
        if (/close to the exact product/i.test(correctReason)) {
          errors.push(`${meta}: an estimate cannot be the proof of an exact product`);
        }
      }
    }
  }

  return errors;
}

function run() {
  const context = loadAppContext();
  const failures = [];
  const counts = new Map();
  const seenByCategory = new Map();

  if (choiceComparisonKey("y = 3x + 0") !== choiceComparisonKey("y = 3x")) {
    failures.push("linear-equation QA does not recognize an omitted zero intercept");
  }
  if (choiceComparisonKey("y = -2x − 2") !== choiceComparisonKey("y = -2x + -2")) {
    failures.push("linear-equation QA does not recognize equivalent negative-intercept notation");
  }
  if (choiceComparisonKey("y = 3x + 1") === choiceComparisonKey("y = 3x + 2")) {
    failures.push("linear-equation QA merges equations with different intercepts");
  }

  const percentCoverage = context.PERCENTAGES_QUESTION_COVERAGE;
  if (typeof percentCoverage?.renderPercentBar !== "function") {
    failures.push("percentage bar coverage renderer is missing");
  } else {
    const visualKeys = new Map();
    for (let percent = 0; percent <= 100; percent += 5) {
      const html = percentCoverage.renderPercentBar(percent, { showLabel: false });
      const visualKey = String(html).replace(/\saria-label="[^"]*"/, "");
      if (visualKeys.has(visualKey)) {
        failures.push(`percentage bars for ${visualKeys.get(visualKey)}% and ${percent}% render identically`);
      } else {
        visualKeys.set(visualKey, percent);
      }
    }
  }

  if (typeof percentCoverage?.renderCollectionGrid !== "function") {
    failures.push("percentage collection renderer is missing");
  } else {
    for (const total of [20, 40, 60, 80, 100]) {
      const filled = total * 0.4;
      const collectionHtml = percentCoverage.renderCollectionGrid(total, filled);
      const cellCount = (collectionHtml.match(/<rect\b/g) || []).length;
      const filledCellCount = (collectionHtml.match(/fill="#4bb9ad"/g) || []).length;
      if (
        cellCount !== total ||
        filledCellCount !== filled ||
        !collectionHtml.includes(`data-collection-total="${total}"`) ||
        !collectionHtml.includes(`data-filled-count="${filled}"`)
      ) {
        failures.push(`percentage collection renderer does not model ${filled} of ${total} exactly`);
      }
    }
  }

  for (const [length, width] of [[3, 9], [9, 3], [12, 50], [50, 12]]) {
    const html = vm.runInContext(
      `renderRectangleMeasureVisual(${length}, ${width}, "perimeter")`,
      context
    );
    const shape = String(html).match(
      /<rect class="measure-rectangle-shape"[^>]*width="([\d.]+)" height="([\d.]+)"[^>]*data-length="([\d.]+)" data-width="([\d.]+)"/
    );
    if (!shape) {
      failures.push(`rectangle measurement visual is missing proportional shape metadata for ${length} by ${width}`);
      continue;
    }

    const [, renderedWidth, renderedHeight, renderedLength, renderedDepth] = shape.map(Number);
    const renderedRatio = renderedWidth / renderedHeight;
    const expectedRatio = length / width;
    if (
      renderedLength !== length ||
      renderedDepth !== width ||
      Math.abs(renderedRatio - expectedRatio) > 0.001
    ) {
      failures.push(
        `rectangle measurement visual distorts ${length} by ${width} into ${renderedWidth} by ${renderedHeight}`
      );
    }
  }

  for (const category of categories) {
    for (let difficulty = 1; difficulty <= 10; difficulty += 1) {
      for (let sample = 0; sample < samplesPerDifficulty; sample += 1) {
        const meta = `${category} difficulty ${difficulty} sample ${sample + 1}`;
        let questions;
        try {
          questions = vm.runInContext(
            `buildSessionQuestions(1, ${difficulty}, { adaptiveReview: false, selectedCategories: [${JSON.stringify(category)}], minDifficulty: ${difficulty} })`,
            context,
            { timeout: 1000 }
          );
        } catch (error) {
          failures.push(`${meta}: threw ${error.stack || error.message || error}`);
          continue;
        }

        if (!Array.isArray(questions) || questions.length !== 1) {
          failures.push(`${meta}: expected one generated question`);
          continue;
        }

        const [question] = questions;
        const actualCategory = String(question.type || category).replace(/-(choice|input|drag)$/, "");
        counts.set(category, (counts.get(category) || 0) + 1);
        if (!seenByCategory.has(category)) {
          seenByCategory.set(category, new Set());
        }
        seenByCategory.get(category).add(textKey(`${question.questionText} ${question.displayText} ${question.visualSummary}`));
        failures.push(...validateQuestion(question, meta));
        failures.push(...context.HOMEWORK_TEST_API.validateHomeworkQuestionShape(question, meta));

        if (!["geography", "geography-map"].includes(category) && actualCategory === "geography-map") {
          failures.push(`${meta}: unexpectedly generated geography-map for ${category}`);
        }
      }
    }
  }

  const total = Array.from(counts.values()).reduce((sum, value) => sum + value, 0);
  console.log(`Generated ${total} questions (${samplesPerDifficulty} per difficulty per category).`);
  for (const category of categories) {
    const generated = counts.get(category) || 0;
    const unique = seenByCategory.get(category)?.size || 0;
    console.log(`${category.padEnd(28)} ${String(generated).padStart(5)} generated, ${String(unique).padStart(4)} unique prompts`);
  }

  if (failures.length) {
    console.error(`\n${failures.length} QA failures:`);
    failures.slice(0, 200).forEach((failure) => console.error(`- ${failure}`));
    if (failures.length > 200) {
      console.error(`... ${failures.length - 200} more failures omitted`);
    }
    process.exitCode = 1;
    return;
  }

  console.log("\nNo structural QA failures found.");
}

module.exports = {
  categories,
  choiceComparisonKey,
  loadAppContext,
  textKey,
  validateQuestion,
};

if (require.main === module) {
  run();
}

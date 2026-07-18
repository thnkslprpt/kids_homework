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
  "hebrew",
  "science",
  "science-evidence",
  "time",
  "statistics",
  "algebra",
  "applied-word-problems",
  "visual-math",
  "visual-measurement",
  "logic",
  "rationality",
  "general-knowledge",
  "geography",
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
    const optionKeys = options.map(textKey);
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

  return errors;
}

function run() {
  const context = loadAppContext();
  const failures = [];
  const counts = new Map();
  const seenByCategory = new Map();

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

        if (category !== "geography" && actualCategory === "geography-map") {
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

run();

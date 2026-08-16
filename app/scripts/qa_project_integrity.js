#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { categories, loadAppContext } = require("./qa_question_generation.js");
const { resolveQaAppScriptSources } = require("./qa_app_sources.js");

const repoRoot = path.resolve(__dirname, "../..");
const failures = [];

function fail(message) {
  failures.push(message);
}

function extractQuotedJsPaths(source, pattern, label) {
  const match = source.match(pattern);
  if (!match) {
    fail(`Could not read the ${label} manifest.`);
    return [];
  }
  return Array.from(match[1].matchAll(/"([^"\n]+\.js)"/g), (entry) => entry[1]);
}

function run() {
  const questionManifest = fs.readFileSync(path.join(repoRoot, "app/questions/manifest.js"), "utf8");
  const questionPaths = extractQuotedJsPaths(
    questionManifest,
    /HOMEWORK_QUESTION_SCRIPT_PATHS\s*=\s*\[([\s\S]*?)\];/,
    "question"
  );
  if (new Set(questionPaths).size !== questionPaths.length) {
    fail("Question manifest contains duplicate file paths.");
  }
  questionPaths.forEach((source) => {
    if (!fs.existsSync(path.join(repoRoot, "app", source))) {
      fail(`Question manifest points to a missing file: app/${source}`);
    }
  });

  const appLoader = fs.readFileSync(path.join(repoRoot, "app/app.js"), "utf8");
  const runtimePaths = extractQuotedJsPaths(
    appLoader,
    /const scripts\s*=\s*\[([\s\S]*?)\];/,
    "runtime"
  );
  if (new Set(runtimePaths).size !== runtimePaths.length) {
    fail("Runtime script loader contains duplicate file paths.");
  }
  runtimePaths.forEach((source) => {
    if (!fs.existsSync(path.join(repoRoot, "app", source))) {
      fail(`Runtime loader points to a missing file: app/${source}`);
    }
  });

  const htmlPath = path.join(repoRoot, "homework.html");
  const resolvedAppSources = resolveQaAppScriptSources(repoRoot, htmlPath);
  resolvedAppSources.forEach((source) => {
    if (!fs.existsSync(path.join(repoRoot, source))) {
      fail(`Homework page resolves to a missing script: ${source}`);
    }
  });

  const serviceWorker = fs.readFileSync(path.join(repoRoot, "service-worker.js"), "utf8");
  resolvedAppSources
    .filter((source) => !source.startsWith("app/questions/"))
    .forEach((source) => {
      if (!serviceWorker.includes(`"${source}"`)) {
        fail(`Service-worker shell manifest is missing ${source}`);
      }
    });

  const context = loadAppContext();
  const runtimeCategories = Array.from(context.HOMEWORK_TEST_API.SESSION_CATEGORY_ORDER || []);
  const missingQaCategories = runtimeCategories.filter((category) => !categories.includes(category));
  const staleQaCategories = categories.filter((category) => !runtimeCategories.includes(category));
  if (missingQaCategories.length) {
    fail(`Generation QA omits runtime categories: ${missingQaCategories.join(", ")}`);
  }
  if (staleQaCategories.length) {
    fail(`Generation QA contains stale categories: ${staleQaCategories.join(", ")}`);
  }

  const modules = Array.from(context.HomeworkQuestions.list());
  const moduleIds = modules.map((module) => module.id);
  if (new Set(moduleIds).size !== moduleIds.length) {
    fail("Question registry contains duplicate module IDs.");
  }
  try {
    context.HomeworkQuestions.register({ id: moduleIds[0], label: "Duplicate QA module" });
    fail("Question registry accepted a duplicate module ID.");
  } catch (error) {
    if (!String(error && error.message).includes("duplicate id")) {
      fail(`Question registry duplicate check threw an unexpected error: ${error}`);
    }
  }

  const receiverSource = fs.readFileSync(
    path.join(repoRoot, "app/scripts/google_sheets_apps_script.gs"),
    "utf8"
  );
  if (/@(?:gmail|googlemail)\.com/i.test(receiverSource)) {
    fail("Apps Script receiver contains a committed personal email address.");
  }
  if (/SpreadsheetApp\.openById\(\s*["']/.test(receiverSource)) {
    fail("Apps Script receiver contains a committed spreadsheet ID.");
  }

  if (failures.length) {
    console.error(`${failures.length} project-integrity failure(s):`);
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exitCode = 1;
    return;
  }
  console.log(
    `Project integrity passed: ${questionPaths.length} question scripts, ${runtimePaths.length} runtime scripts, ${runtimeCategories.length} categories.`
  );
}

run();

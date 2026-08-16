const fs = require("node:fs");
const path = require("node:path");

function extractScriptPaths(source, assignmentPattern, label) {
  const match = source.match(assignmentPattern);
  if (!match) {
    throw new Error(`Could not find ${label} script list.`);
  }

  return Array.from(match[1].matchAll(/"([^"]+\.js)"/g), (entry) => entry[1]);
}

function resolveQaAppScriptSources(repoRoot, htmlPath) {
  const html = fs.readFileSync(htmlPath, "utf8");
  const directSources = Array.from(
    html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"[^>]*><\/script>/g),
    (match) => match[1]
  );
  const resolvedSources = [];

  directSources.forEach((source) => {
    if (source === "app/questions/load.js") {
      const manifestSource = fs.readFileSync(
        path.join(repoRoot, "app/questions/manifest.js"),
        "utf8"
      );
      const questionSources = extractScriptPaths(
        manifestSource,
        /globalThis\.HOMEWORK_QUESTION_SCRIPT_PATHS\s*=\s*\[([\s\S]*?)\];/,
        "question"
      );
      resolvedSources.push(...questionSources.map((questionSource) => `app/${questionSource}`));

      // Browser sessions load these large data-only bundles on demand. Node QA
      // deliberately loads them up front so generation tests can synchronously
      // exercise every registered category without changing browser behavior.
      const lazyManifestMatch = manifestSource.match(
        /globalThis\.HOMEWORK_LAZY_QUESTION_SCRIPT_PATHS\s*=\s*\{([\s\S]*?)\};/
      );
      if (lazyManifestMatch) {
        const lazyQuestionSources = Array.from(
          lazyManifestMatch[1].matchAll(/:\s*"([^"]+\.js)"/g),
          (entry) => entry[1]
        );
        resolvedSources.push(
          ...lazyQuestionSources.map((questionSource) => `app/${questionSource}`)
        );
      }
      return;
    }

    if (source === "app/app.js") {
      const appLoaderSource = fs.readFileSync(path.join(repoRoot, source), "utf8");
      const runtimeSources = extractScriptPaths(
        appLoaderSource,
        /const scripts\s*=\s*\[([\s\S]*?)\];/,
        "runtime"
      );
      resolvedSources.push(...runtimeSources.map((runtimeSource) => `app/${runtimeSource}`));
      return;
    }

    resolvedSources.push(source);
  });

  return resolvedSources;
}

module.exports = {
  resolveQaAppScriptSources,
};

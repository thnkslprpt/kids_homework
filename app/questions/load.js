(() => {
  const currentScript = document.currentScript;
  const basePath = currentScript?.dataset.base || "";
  const scripts = Array.isArray(globalThis.HOMEWORK_QUESTION_SCRIPT_PATHS)
    ? globalThis.HOMEWORK_QUESTION_SCRIPT_PATHS
    : [];

  scripts.forEach((scriptPath) => {
    document.write(`<script src="${basePath}${scriptPath}"><\/script>`);
  });
})();

(() => {
  const script = document.currentScript;
  const source = script?.getAttribute("src") || "";
  const basePath = source.includes("/") ? source.slice(0, source.lastIndexOf("/") + 1) : "";
  const scripts = [
    "main/constants.js",
    "main/session.js",
    "generators/math.js",
    "generators/hebrew.js",
    "generators/time-and-choice.js",
    "ui/drag-answers.js",
    "ui/quiz.js",
    "ui/results-history-dashboard.js",
    "ui/confetti.js",
    "main/math-utils.js",
    "generators/supplemental-math.js",
    "main/init.js",
  ];

  function scriptTag(path) {
    return `<script src="${basePath}${path}"><\/script>`;
  }

  if (document.readyState === "loading") {
    document.write(scripts.map(scriptTag).join(""));
    return;
  }

  scripts.reduce((chain, path) => {
    return chain.then(
      () =>
        new Promise((resolve, reject) => {
          const element = document.createElement("script");
          element.src = basePath + path;
          element.onload = resolve;
          element.onerror = reject;
          document.head.appendChild(element);
        })
    );
  }, Promise.resolve());
})();

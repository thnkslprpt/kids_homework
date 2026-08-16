(() => {
  function showStartupFailure(message) {
    const feedback = document.getElementById("start-feedback");
    if (!feedback) {
      return;
    }

    feedback.replaceChildren();
    const text = document.createElement("span");
    text.textContent = `${message} `;
    const reload = document.createElement("button");
    reload.type = "button";
    reload.className = "secondary-button startup-reload-button";
    reload.textContent = "Reload app";
    reload.addEventListener("click", () => window.location.reload());
    feedback.append(text, reload);
    feedback.classList.add("error");
  }

  window.addEventListener("error", (event) => {
    showStartupFailure(`App failed to start: ${event.message || "JavaScript error"}`);
  });

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason && event.reason.message ? event.reason.message : String(event.reason || "Promise error");
    showStartupFailure(`App failed to start: ${reason}`);
  });
})();

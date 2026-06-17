(() => {
  function showStartupFailure(message) {
    const feedback = document.getElementById("start-feedback");
    if (!feedback) {
      return;
    }

    feedback.textContent = message;
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

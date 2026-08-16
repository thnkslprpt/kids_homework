(() => {
let appElements = {};

function initializeOfflineApp(elements) {
  appElements = elements || {};

  if (!("serviceWorker" in navigator)) {
    return;
  }

  let refreshingForUpdate = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (refreshingForUpdate) {
      return;
    }
    refreshingForUpdate = true;
    window.location.reload();
  });

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("service-worker.js")
      .then((registration) => {
        if (registration.waiting) {
          showAppUpdatePrompt(registration.waiting);
        }

        registration.addEventListener("updatefound", () => {
          const installingWorker = registration.installing;
          if (!installingWorker) {
            return;
          }

          installingWorker.addEventListener("statechange", () => {
            if (installingWorker.state === "installed" && navigator.serviceWorker.controller) {
              showAppUpdatePrompt(installingWorker);
            }
          });
        });
      })
      .catch(() => {
        // The app still works online or from a downloaded folder without service-worker support.
      });
  });
}

function showAppUpdatePrompt(worker) {
  if (!appElements.appUpdateBanner || !appElements.appUpdateButton || !worker) {
    return;
  }

  appElements.appUpdateBanner.hidden = false;
  appElements.appUpdateButton.onclick = () => {
    appElements.appUpdateButton.disabled = true;
    document.dispatchEvent(new CustomEvent("homework:answer-recorded"));
    worker.postMessage({ type: "SKIP_WAITING" });
  };
  if (appElements.appUpdateLaterButton) {
    appElements.appUpdateLaterButton.onclick = () => {
      appElements.appUpdateBanner.hidden = true;
    };
  }
}


  window.HomeworkApp.pwa = {
    initializeOfflineApp,
  };
})();

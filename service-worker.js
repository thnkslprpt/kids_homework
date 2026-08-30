importScripts("app/questions/manifest.js");

const CACHE_VERSION = "homework-v2026-08-30-equivalent-choices-1";
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;
const NAVIGATION_TIMEOUT_MS = 4000;
const QUESTION_SCRIPT_PATHS = Array.isArray(globalThis.HOMEWORK_QUESTION_SCRIPT_PATHS)
  ? globalThis.HOMEWORK_QUESTION_SCRIPT_PATHS
  : [];
const CRITICAL_ASSETS = [
  "index.html",
  "homework.html",
  "manifest.json",
  "app/style.css",
  "app/prototype-3.css",
  "app/flat-sticker-matching.css",
  "app/question-utils.js",
  "app/questions/registry.js",
  "app/questions/manifest.js",
  "app/questions/load.js",
  ...QUESTION_SCRIPT_PATHS.map((scriptPath) => `app/${scriptPath}`),
  "app/core/namespace.js",
  "app/core/bootstrap-errors.js",
  "app/core/config.js",
  "app/core/state.js",
  "app/core/dom.js",
  "app/core/scoring.js",
  "app/core/session-history.js",
  "app/core/results-reporter.js",
  "app/pwa/updates.js",
  "app/app.js",
  "app/flat-sticker-matching.js",
  "app/main/constants.js",
  "app/main/session.js",
  "app/main/math-utils.js",
  "app/main/init.js",
  "app/generators/math.js",
  "app/generators/hebrew.js",
  "app/generators/time-and-choice.js",
  "app/generators/supplemental-math.js",
  "app/ui/drag-answers.js",
  "app/ui/quiz.js",
  "app/ui/results-history-dashboard.js",
  "app/ui/confetti.js",
];

const OPTIONAL_ASSETS = [
  "app/icons/apple-touch-icon.png",
  "app/icons/homework-icon.svg",
  "app/icons/icon-192.png",
  "app/icons/icon-512.png",
  "app/assets/fonts/GveretLevin-Regular.woff2",
  "app/assets/hebrew-images/airplane.svg",
  "app/assets/hebrew-images/ant.svg",
  "app/assets/hebrew-images/apple.svg",
  "app/assets/hebrew-images/baby.svg",
  "app/assets/hebrew-images/bag.svg",
  "app/assets/hebrew-images/ball.svg",
  "app/assets/hebrew-images/banana.svg",
  "app/assets/hebrew-images/bed.svg",
  "app/assets/hebrew-images/bicycle.svg",
  "app/assets/hebrew-images/bird.svg",
  "app/assets/hebrew-images/book.svg",
  "app/assets/hebrew-images/bowl.svg",
  "app/assets/hebrew-images/bread.svg",
  "app/assets/hebrew-images/bus.svg",
  "app/assets/hebrew-images/cake.svg",
  "app/assets/hebrew-images/camera.svg",
  "app/assets/hebrew-images/car.svg",
  "app/assets/hebrew-images/carrot.svg",
  "app/assets/hebrew-images/cat.svg",
  "app/assets/hebrew-images/chair.svg",
  "app/assets/hebrew-images/cheese.svg",
  "app/assets/hebrew-images/cherry.svg",
  "app/assets/hebrew-images/chocolate.svg",
  "app/assets/hebrew-images/clock.svg",
  "app/assets/hebrew-images/cloud.svg",
  "app/assets/hebrew-images/computer.svg",
  "app/assets/hebrew-images/dog.svg",
  "app/assets/hebrew-images/door.svg",
  "app/assets/hebrew-images/ear.svg",
  "app/assets/hebrew-images/egg.svg",
  "app/assets/hebrew-images/eye.svg",
  "app/assets/hebrew-images/fish.svg",
  "app/assets/hebrew-images/grapes.svg",
  "app/assets/hebrew-images/hat.svg",
  "app/assets/hebrew-images/honey.svg",
  "app/assets/hebrew-images/house.svg",
  "app/assets/hebrew-images/ice-cream.svg",
  "app/assets/hebrew-images/juice.svg",
  "app/assets/hebrew-images/key.svg",
  "app/assets/hebrew-images/lemon.svg",
  "app/assets/hebrew-images/milk.svg",
  "app/assets/hebrew-images/money.svg",
  "app/assets/hebrew-images/moon.svg",
  "app/assets/hebrew-images/mosquito.svg",
  "app/assets/hebrew-images/notebook.svg",
  "app/assets/hebrew-images/orange.svg",
  "app/assets/hebrew-images/paper.svg",
  "app/assets/hebrew-images/pasta.svg",
  "app/assets/hebrew-images/peach.svg",
  "app/assets/hebrew-images/pear.svg",
  "app/assets/hebrew-images/pen.svg",
  "app/assets/hebrew-images/pencil.svg",
  "app/assets/hebrew-images/picture.svg",
  "app/assets/hebrew-images/pineapple.svg",
  "app/assets/hebrew-images/potato.svg",
  "app/assets/hebrew-images/printer.svg",
  "app/assets/hebrew-images/rice.svg",
  "app/assets/hebrew-images/shirt.svg",
  "app/assets/hebrew-images/shoes.svg",
  "app/assets/hebrew-images/soap.svg",
  "app/assets/hebrew-images/sofa.svg",
  "app/assets/hebrew-images/soup.svg",
  "app/assets/hebrew-images/spider.svg",
  "app/assets/hebrew-images/spoon.svg",
  "app/assets/hebrew-images/star.svg",
  "app/assets/hebrew-images/strawberry.svg",
  "app/assets/hebrew-images/sun.svg",
  "app/assets/hebrew-images/taxi.svg",
  "app/assets/hebrew-images/tea.svg",
  "app/assets/hebrew-images/telephone.svg",
  "app/assets/hebrew-images/tomato.svg",
  "app/assets/hebrew-images/tooth.svg",
  "app/assets/hebrew-images/train.svg",
  "app/assets/hebrew-images/tree.svg",
  "app/assets/hebrew-images/tv.svg",
  "app/assets/hebrew-images/watermelon.svg",
];

const QUESTION_ASSET_PATHS = new Set(
  QUESTION_SCRIPT_PATHS.map((scriptPath) => `app/${scriptPath}`)
);
const REQUIRED_APP_SHELL_ASSETS = CRITICAL_ASSETS.filter(
  (assetPath) => !QUESTION_ASSET_PATHS.has(assetPath)
);

function scopedUrl(path) {
  return new URL(path, self.registration.scope).toString();
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(async (cache) => {
      const shellResults = await cacheAssetsIndividually(cache, REQUIRED_APP_SHELL_ASSETS);
      const shellFailures = shellResults.filter((result) => !result.ok);
      if (shellFailures.length) {
        throw new Error(
          `Could not prepare the offline app shell: ${shellFailures
            .map((result) => result.path)
            .join(", ")}`
        );
      }

      const supplementalResults = await cacheAssetsIndividually(cache, [
        ...QUESTION_ASSET_PATHS,
        ...OPTIONAL_ASSETS,
      ]);
      const supplementalFailures = supplementalResults.filter((result) => !result.ok);
      if (supplementalFailures.length > 0) {
        console.warn(
          `Homework offline cache skipped ${supplementalFailures.length} supplemental asset(s).`,
          supplementalFailures.map((result) => result.path)
        );
      }
    })
  );
});

self.addEventListener("activate", (event) => {
  const expectedCaches = new Set([CACHE_VERSION, RUNTIME_CACHE]);
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("homework-v") && !expectedCaches.has(key))
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, scopedUrl("homework.html"), NAVIGATION_TIMEOUT_MS));
    return;
  }

  if (isAppCodeAsset(url)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  event.respondWith(cacheFirst(request));
});

function isAppCodeAsset(url) {
  return [".html", ".js", ".css", ".json"].some((extension) => url.pathname.endsWith(extension));
}

async function networkFirst(request, fallbackUrl, timeoutMs = 0) {
  let networkResponse = null;
  try {
    networkResponse = await fetchWithTimeout(request, timeoutMs);
    if (networkResponse && networkResponse.ok) {
      await putInRuntimeCache(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    // A cached response below is the expected path when offline or timed out.
  }

  const cached = await matchCurrentCaches(request);
  if (cached) {
    return cached;
  }

  const fallback = fallbackUrl ? await matchCurrentCaches(fallbackUrl) : null;
  if (fallback) {
    return fallback;
  }

  return networkResponse || Response.error();
}

async function cacheFirst(request) {
  const cached = await matchCurrentCaches(request);
  if (cached) {
    return cached;
  }

  const response = await fetch(request);
  if (response && response.ok) {
    await putInRuntimeCache(request, response.clone());
  }
  return response;
}

async function cacheAssetsIndividually(cache, paths) {
  return Promise.all(
    paths.map(async (path) => {
      try {
        const request = new Request(scopedUrl(path), { cache: "reload" });
        const response = await fetch(request);
        if (!response || !response.ok) {
          throw new Error(`HTTP ${response ? response.status : "error"}`);
        }
        await cache.put(request, response);
        return { path, ok: true };
      } catch (error) {
        return {
          path,
          ok: false,
          error: String(error && error.message ? error.message : error),
        };
      }
    })
  );
}

async function matchCurrentCaches(request) {
  const precache = await caches.open(CACHE_VERSION);
  const precached = await precache.match(request, { ignoreSearch: true });
  if (precached) {
    return precached;
  }

  const runtime = await caches.open(RUNTIME_CACHE);
  return runtime.match(request, { ignoreSearch: true });
}

async function putInRuntimeCache(request, response) {
  try {
    const cache = await caches.open(RUNTIME_CACHE);
    await cache.put(request, response);
  } catch (error) {
    console.warn("Could not update the homework runtime cache.", error);
  }
}

function fetchWithTimeout(request, timeoutMs) {
  if (!timeoutMs || typeof AbortController === "undefined") {
    return fetch(request);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(request, { signal: controller.signal }).finally(() => clearTimeout(timeoutId));
}

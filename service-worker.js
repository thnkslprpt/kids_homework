importScripts("app/questions/manifest.js");

const CACHE_VERSION = "homework-v2026-07-17-english-tense-history-fraction-sense-computing-1";
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;
const QUESTION_SCRIPT_PATHS = Array.isArray(globalThis.HOMEWORK_QUESTION_SCRIPT_PATHS)
  ? globalThis.HOMEWORK_QUESTION_SCRIPT_PATHS
  : [];
const CRITICAL_ASSETS = [
  "index.html",
  "homework.html",
  "manifest.json",
  "app/style.css",
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
  "app/assets/europe-blank-map.svg",
  "app/assets/europe-italy-blue.png",
  "app/assets/europe-italy-blue.svg",
  "app/assets/geography-australia-in-oceania.svg",
  "app/assets/geography-base-africa-blankmap.svg",
  "app/assets/geography-base-africa-grouped.svg",
  "app/assets/geography-base-africa.svg",
  "app/assets/geography-base-americas.svg",
  "app/assets/geography-base-asia-world.svg",
  "app/assets/geography-base-asia.svg",
  "app/assets/geography-base-oceania.svg",
  "app/assets/geography-papua-new-guinea-in-oceania.svg",
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

function scopedUrl(path) {
  return new URL(path, self.registration.scope).toString();
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(async (cache) => {
      const criticalRequests = CRITICAL_ASSETS.map(
        (path) => new Request(scopedUrl(path), { cache: "reload" })
      );
      await cache.addAll(criticalRequests);

      const optionalRequests = OPTIONAL_ASSETS.map(
        (path) => new Request(scopedUrl(path), { cache: "reload" })
      );
      const results = await Promise.allSettled(optionalRequests.map((request) => cache.add(request)));
      const failures = results.filter((result) => result.status === "rejected");
      if (failures.length > 0) {
        console.warn(`Homework offline cache skipped ${failures.length} optional asset(s).`, failures);
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
    event.respondWith(networkFirst(request, scopedUrl("homework.html")));
    return;
  }

  if (isFreshnessCritical(url)) {
    event.respondWith(networkFirst(request, request.url));
    return;
  }

  event.respondWith(cacheFirst(request));
});

function isFreshnessCritical(url) {
  return [".html", ".js", ".css", ".json"].some((extension) => url.pathname.endsWith(extension));
}

async function networkFirst(request, fallbackUrl) {
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    return cached || caches.match(fallbackUrl);
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }

  const response = await fetch(request);
  if (response && response.ok) {
    const cache = await caches.open(RUNTIME_CACHE);
    cache.put(request, response.clone());
  }
  return response;
}

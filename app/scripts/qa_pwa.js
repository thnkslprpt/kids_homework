#!/usr/bin/env node

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");

const repoRoot = path.resolve(__dirname, "../..");

function workerHarness({ unavailable = "" } = {}) {
  const handlers = new Map();
  const stores = new Map();
  const scope = "https://homework.example/kids/";
  let offline = false;
  const context = vm.createContext({
    URL, Request, Response, AbortController, setTimeout, clearTimeout, console,
    self: {
      registration: { scope },
      location: new URL(scope),
      clients: { claim: async () => {} },
      addEventListener: (name, handler) => handlers.set(name, handler),
    },
    caches: {
      async open(name) {
        if (!stores.has(name)) stores.set(name, new Map());
        const entries = stores.get(name);
        const key = (request) => {
          const url = new URL(typeof request === "string" ? request : request.url);
          url.search = "";
          return url.href;
        };
        return {
          put: async (request, response) => entries.set(key(request), response.clone()),
          match: async (request) => entries.get(key(request))?.clone(),
        };
      },
      keys: async () => [...stores.keys()],
      delete: async (name) => stores.delete(name),
    },
    async fetch(request) {
      const url = new URL(typeof request === "string" ? request : request.url);
      const relative = url.pathname.slice(new URL(scope).pathname.length);
      if (offline || relative === unavailable) return new Response("Unavailable", { status: 503 });
      const file = path.join(repoRoot, relative);
      return fs.existsSync(file)
        ? new Response(fs.readFileSync(file))
        : new Response("Missing", { status: 404 });
    },
    importScripts(relative) {
      vm.runInContext(fs.readFileSync(path.join(repoRoot, relative), "utf8"), context);
    },
  });
  vm.runInContext(fs.readFileSync(path.join(repoRoot, "service-worker.js"), "utf8"), context);
  return {
    async install() {
      let completion;
      handlers.get("install")({ waitUntil: (promise) => { completion = promise; } });
      await completion;
    },
    goOffline() { offline = true; },
    async request(relative, mode = "cors") {
      let response;
      handlers.get("fetch")({
        request: { url: new URL(relative, scope).href, method: "GET", mode },
        respondWith: (promise) => { response = promise; },
      });
      return response;
    },
    context,
  };
}

test("first offline visit can load map data without a prior map session", async () => {
  const worker = workerHarness();
  await worker.install();
  worker.goOffline();
  const response = await worker.request("app/questions/geography/geography-map-data.js");
  assert.equal(response.status, 200);
  assert.match(await response.text(), /GEOGRAPHY_MAP_COUNTRIES/);
});

test("installation fails if a required question script cannot be cached", async () => {
  const worker = workerHarness({ unavailable: "app/questions/science/science.js" });
  await assert.rejects(worker.install(), /science\.js/);
});

test("installed navigation stays consistent with its cached runtime until update activation", async () => {
  const worker = workerHarness();
  await worker.install();
  worker.context.fetch = async () => new Response("HTML from a newer deployment");
  const response = await worker.request("homework.html?launch=1", "navigate");
  assert.match(await response.text(), /<title>/);
});

test("unknown offline navigation falls back to the installed app", async () => {
  const worker = workerHarness();
  await worker.install();
  worker.goOffline();
  const response = await worker.request("missing-page", "navigate");
  assert.equal(response.status, 200);
  assert.match(await response.text(), /<title>/);
});

function updateHarness(controller = null, readyState = "loading") {
  const workerHandlers = new Map();
  const windowHandlers = new Map();
  const events = [];
  const serviceWorker = {
    controller,
    addEventListener: (name, handler) => workerHandlers.set(name, handler),
    async register() {
      events.push("register");
      return { addEventListener() {} };
    },
  };
  const context = vm.createContext({
    navigator: { serviceWorker },
    document: { readyState },
    CustomEvent: class { constructor(type) { this.type = type; } },
    window: {
      HomeworkApp: {},
      location: { protocol: "https:", reload: () => events.push("reload") },
      addEventListener: (name, handler) => windowHandlers.set(name, handler),
      dispatchEvent: (event) => events.push(event.type),
    },
  });
  vm.runInContext(fs.readFileSync(path.join(repoRoot, "app/pwa/updates.js"), "utf8"), context);
  context.window.HomeworkApp.pwa.initializeOfflineApp({});
  return { events, workerHandlers, windowHandlers, serviceWorker };
}

test("first installation does not reload a child's open session", () => {
  const app = updateHarness();
  app.serviceWorker.controller = {};
  app.workerHandlers.get("controllerchange")();
  assert.deepEqual(app.events, []);
});

test("update activation checkpoints every open tab before reloading it once", () => {
  const app = updateHarness({});
  app.workerHandlers.get("controllerchange")();
  app.workerHandlers.get("controllerchange")();
  assert.deepEqual(app.events, ["homework:save-checkpoint", "reload"]);
});

test("initializing after page load still registers offline support", () => {
  const app = updateHarness({}, "complete");
  assert.deepEqual(app.events, ["register"]);
});

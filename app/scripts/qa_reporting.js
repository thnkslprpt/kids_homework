#!/usr/bin/env node

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");

const source = fs.readFileSync(path.resolve(__dirname, "../core/results-reporter.js"), "utf8");

function reporterHarness({ failWrites = false, statuses = ["complete"], onPost } = {}) {
  const stored = new Map();
  let requests = 0;
  let acknowledgements = 0;
  const storage = {
    getItem: (key) => stored.get(key) || null,
    setItem(key, value) {
      if (failWrites) throw new Error("Storage quota exceeded");
      stored.set(key, value);
    },
  };
  const context = vm.createContext({
    URL,
    console: { warn() {} },
    navigator: { onLine: false },
    window: {
      HomeworkApp: {}, localStorage: storage,
      location: { protocol: "https:", hostname: "example.test" },
      addEventListener() {},
    },
    setTimeout: (callback, delay) => setTimeout(callback, Math.min(delay, 20)),
    clearTimeout,
    document: {
      createElement: () => ({ remove() {} }),
      head: {
        appendChild(script) {
          const url = new URL(script.src);
          const status = statuses[Math.min(acknowledgements++, statuses.length - 1)];
          queueMicrotask(() => context[url.searchParams.get("callback")]({
            ok: status === "complete", status, sessionId: url.searchParams.get("sessionId"),
          }));
        },
      },
    },
    async fetch(_url, options) {
      requests += 1;
      if (onPost) return onPost(JSON.parse(options.body), requests, storage);
      return { type: "opaque" };
    },
  });
  vm.runInContext(source, context);
  const reporter = context.window.HomeworkApp.resultsReporter.createResultsReporter({
    endpointUrl: "https://example.test/report", queueStorageKey: "reports",
  });
  return {
    reporter, context, storage,
    requests: () => requests, acknowledgements: () => acknowledgements,
    failWrites() { failWrites = true; },
  };
}

const session = (id) => ({ id, totalQuestions: 1, correctCount: 1, records: [{ isCorrect: true }] });

test("a delayed acknowledgement is retried without reposting the session", async () => {
  const harness = reporterHarness({ statuses: ["missing", "processing", "complete"] });
  harness.reporter.reportSession(session("delayed"));
  harness.context.navigator.onLine = true;
  assert.equal(await harness.reporter.flushQueue(), true);
  assert.equal(harness.reporter.loadQueue().length, 0);
  assert.equal(harness.requests(), 1);
  assert.equal(harness.acknowledgements(), 3);
});

test("unconfirmed reports remain queued after a bounded acknowledgement retry", async () => {
  const harness = reporterHarness({ statuses: ["missing"] });
  harness.reporter.reportSession(session("unconfirmed"));
  harness.context.navigator.onLine = true;
  assert.equal(await harness.reporter.flushQueue(), false);
  assert.equal(harness.reporter.loadQueue().length, 1);
  assert.ok(harness.acknowledgements() > 1 && harness.acknowledgements() <= 5);
});

test("storage quota failure retains a report in memory so it can still be delivered", async () => {
  const harness = reporterHarness({ failWrites: true });
  harness.reporter.reportSession(session("quota"));
  assert.equal(harness.reporter.loadQueue().length, 1);
  harness.context.navigator.onLine = true;
  assert.equal(await harness.reporter.flushQueue(), true);
  assert.equal(harness.requests(), 1);
  assert.equal(harness.reporter.loadQueue().length, 0);
});

test("failed queue removal does not resend an acknowledged report in a loop", async () => {
  const harness = reporterHarness({ onPost(payload, count) {
    if (count > 2) throw new Error("Repeated an already confirmed report");
    return { type: "basic", ok: true, json: async () => ({ ok: true, sessionId: payload.session.id }) };
  } });
  harness.reporter.reportSession(session("first"));
  harness.reporter.reportSession(session("second"));
  harness.failWrites();
  harness.context.navigator.onLine = true;
  assert.equal(await harness.reporter.flushQueue(), true);
  assert.equal(harness.requests(), 2);
  assert.equal(harness.reporter.loadQueue().length, 0);
});

test("a report enqueued during a pending POST is sent by the same flush", async () => {
  let harness;
  harness = reporterHarness({ onPost(payload, count) {
    if (count === 1) harness.reporter.reportSession(session("second"));
    return { type: "basic", ok: true, json: async () => ({ ok: true, sessionId: payload.session.id }) };
  } });
  harness.reporter.reportSession(session("first"));
  harness.context.navigator.onLine = true;
  assert.equal(await harness.reporter.flushQueue(), true);
  assert.equal(harness.requests(), 2);
  assert.equal(harness.reporter.loadQueue().length, 0);
});

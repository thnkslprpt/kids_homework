#!/usr/bin/env node

const fs = require("node:fs");
const http = require("node:http");
const os = require("node:os");
const path = require("node:path");
const { spawn, spawnSync } = require("node:child_process");

const repoRoot = path.resolve(__dirname, "../..");
const runnerPath = path.join(repoRoot, "app/release-test.html");
const serviceWorkerPath = path.join(repoRoot, "service-worker.js");
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

function findBrowser() {
  const requested = process.env.CHROME_BIN ? [process.env.CHROME_BIN] : [];
  return [...requested, "google-chrome", "google-chrome-stable", "chromium", "chromium-browser"]
    .find((candidate) => spawnSync(candidate, ["--version"], { stdio: "ignore" }).status === 0);
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.setEncoding("utf8");
    request.on("data", (chunk) => { body += chunk; });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function startServer() {
  let resolveCompletion;
  const completion = new Promise((resolve) => { resolveCompletion = resolve; });
  const state = {
    offline: false,
    mapRequestCount: 0,
    serviceWorkerRequestCount: 0,
    updateSuffix: "",
  };

  const server = http.createServer(async (request, response) => {
    const requestUrl = new URL(request.url || "/", "http://localhost");

    if (request.method === "POST" && requestUrl.pathname === "/__qa/mode") {
      state.offline = (await readRequestBody(request)) === "offline";
      response.writeHead(204).end();
      return;
    }

    if (request.method === "POST" && requestUrl.pathname === "/__qa/update") {
      state.updateSuffix = "-qa-update";
      response.writeHead(204).end();
      return;
    }

    if (request.method === "POST" && requestUrl.pathname === "/__qa/stats") {
      response.writeHead(200, { "Content-Type": "application/json", "Cache-Control": "no-store" });
      response.end(JSON.stringify(state));
      return;
    }

    if (request.method === "POST" && requestUrl.pathname === "/__qa/done") {
      const body = await readRequestBody(request);
      response.writeHead(204).end();
      resolveCompletion(body);
      return;
    }

    if (requestUrl.pathname === "/__qa/release-test.html") {
      fs.readFile(runnerPath, (error, data) => {
        if (error) {
          response.writeHead(500).end("Runner unavailable");
          return;
        }
        response.writeHead(200, { "Content-Type": mimeTypes[".html"], "Cache-Control": "no-store" });
        response.end(data);
      });
      return;
    }

    if (state.offline) {
      response.writeHead(503, { "Content-Type": "text/plain; charset=utf-8" }).end("QA offline");
      return;
    }

    let relativePath;
    try {
      relativePath = decodeURIComponent(requestUrl.pathname).replace(/^\/+/, "") || "homework.html";
    } catch {
      response.writeHead(400).end("Bad request");
      return;
    }

    const filePath = path.resolve(repoRoot, relativePath);
    if (filePath !== repoRoot && !filePath.startsWith(`${repoRoot}${path.sep}`)) {
      response.writeHead(403).end("Forbidden");
      return;
    }

    if (relativePath === "app/questions/geography/geography-map-data.js") {
      state.mapRequestCount += 1;
    }

    if (relativePath === "service-worker.js") {
      state.serviceWorkerRequestCount += 1;
      fs.readFile(serviceWorkerPath, "utf8", (error, source) => {
        if (error) {
          response.writeHead(500).end("Service worker unavailable");
          return;
        }
        const body = state.updateSuffix
          ? source.replace(
              /const CACHE_VERSION = "([^"]+)";/,
              (_, version) => `const CACHE_VERSION = "${version}${state.updateSuffix}";`
            )
          : source;
        response.writeHead(200, {
          "Content-Type": mimeTypes[".js"],
          "Cache-Control": "no-store",
          "Service-Worker-Allowed": "/",
        });
        response.end(body);
      });
      return;
    }

    fs.readFile(filePath, (error, data) => {
      if (error) {
        response.writeHead(error.code === "ENOENT" ? 404 : 500).end("Not found");
        return;
      }
      response.writeHead(200, {
        "Cache-Control": "no-store",
        "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream",
      });
      response.end(data);
    });
  });

  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => resolve({ completion, server }));
  });
}

async function run() {
  const browser = findBrowser();
  if (!browser) {
    throw new Error("Chrome or Chromium is required for the release browser matrix.");
  }

  const { completion, server } = await startServer();
  const address = server.address();
  const profileDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "homework-release-browser-"));
  const url = `http://127.0.0.1:${address.port}/__qa/release-test.html`;
  let child = null;
  let childClosed = Promise.resolve();

  try {
    child = spawn(browser, [
      "--headless",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      `--user-data-dir=${profileDirectory}`,
      url,
    ]);
    childClosed = new Promise((resolve) => child.once("close", resolve));
    let stderr = "";
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    const resultText = await new Promise((resolve, reject) => {
      let settled = false;
      const timeout = setTimeout(() => {
        settled = true;
        child.kill("SIGKILL");
        reject(new Error("Release browser matrix timed out."));
      }, 240000);
      child.once("error", reject);
      child.once("close", (code) => {
        if (settled) return;
        settled = true;
        clearTimeout(timeout);
        reject(new Error(`Browser exited before completing the matrix (code ${code}): ${stderr.slice(-3000)}`));
      });
      completion.then((value) => {
        if (settled) return;
        settled = true;
        clearTimeout(timeout);
        resolve(String(value || "").trim());
      }, reject);
    });
    if (resultText !== "PASS") {
      throw new Error(`Release browser matrix failed:\n${resultText || "No result was produced."}`);
    }
    console.log("Release browser/offline/update matrix passed.");
  } finally {
    if (child && child.exitCode === null) {
      child.kill("SIGTERM");
    }
    await childClosed;
    await new Promise((resolve) => server.close(resolve));
    fs.rmSync(profileDirectory, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
  }
}

run().catch((error) => {
  console.error(error && error.stack ? error.stack : error);
  process.exitCode = 1;
});

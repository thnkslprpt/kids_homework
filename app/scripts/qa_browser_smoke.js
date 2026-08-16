#!/usr/bin/env node

const fs = require("node:fs");
const http = require("node:http");
const os = require("node:os");
const path = require("node:path");
const { spawn, spawnSync } = require("node:child_process");

const repoRoot = path.resolve(__dirname, "../..");
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
  const candidates = [
    ...requested,
    "google-chrome",
    "google-chrome-stable",
    "chromium",
    "chromium-browser",
  ];
  return candidates.find((candidate) => {
    const result = spawnSync(candidate, ["--version"], { stdio: "ignore" });
    return result.status === 0;
  });
}

function startServer() {
  const server = http.createServer((request, response) => {
    const requestUrl = new URL(request.url || "/", "http://localhost");
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
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

async function run() {
  const browser = findBrowser();
  if (!browser) {
    throw new Error("Chrome or Chromium is required for the browser smoke test.");
  }

  const server = await startServer();
  const address = server.address();
  const profileDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "homework-smoke-"));
  const url = `http://127.0.0.1:${address.port}/app/smoke-test.html`;

  try {
    const output = await new Promise((resolve, reject) => {
      const child = spawn(browser, [
        "--headless",
        "--no-sandbox",
        "--disable-gpu",
        "--disable-dev-shm-usage",
        `--user-data-dir=${profileDirectory}`,
        "--virtual-time-budget=120000",
        "--dump-dom",
        url,
      ]);
      let stdout = "";
      let stderr = "";
      const timeout = setTimeout(() => {
        child.kill("SIGKILL");
        reject(new Error("Browser smoke test timed out."));
      }, 150000);
      child.stdout.on("data", (chunk) => { stdout += chunk; });
      child.stderr.on("data", (chunk) => { stderr += chunk; });
      child.once("error", reject);
      child.once("close", (code) => {
        clearTimeout(timeout);
        if (code !== 0) {
          reject(new Error(`Browser exited with code ${code}: ${stderr.slice(-2000)}`));
          return;
        }
        resolve(stdout);
      });
    });

    const resultMatch = output.match(/<pre[^>]*id="result"[^>]*>([\s\S]*?)<\/pre>/i);
    const resultText = String(resultMatch?.[1] || "").replace(/<[^>]+>/g, "").trim();
    if (resultText !== "PASS") {
      throw new Error(`Browser smoke test failed:\n${resultText || "No result was produced."}`);
    }
    console.log("Headless browser smoke test passed.");
  } finally {
    await new Promise((resolve) => server.close(resolve));
    fs.rmSync(profileDirectory, { recursive: true, force: true });
  }
}

run().catch((error) => {
  console.error(error && error.stack ? error.stack : error);
  process.exitCode = 1;
});

"use strict";

const { installSeededRandom } = require("./qa_seeded_random.js");

const seed = installSeededRandom(process.env.QA_SEED || "2026-08-12");
process.on("beforeExit", () => {
  if (process.env.QA_PRINT_SEED === "1") {
    console.log(`QA seed: ${seed}`);
  }
});

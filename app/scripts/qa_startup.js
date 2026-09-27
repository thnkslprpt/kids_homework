#!/usr/bin/env node

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");

const source = fs.readFileSync(path.resolve(__dirname, "../questions/math/math-skill-studios.js"), "utf8");

function loadStudios(seed) {
  const modules = [];
  const context = vm.createContext({ HomeworkQuestions: { register: (entry) => modules.push(entry) } });
  vm.runInContext(`
    let seed = ${seed};
    Math.random = () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);
  `, context);
  vm.runInContext(source, context);
  return modules;
}

for (const [seed, cause] of [[8, "4 × 2 × 2 prism"], [152, "vertex at (0, 0)"]]) {
  test(`startup survives colliding choices for ${cause}`, () => {
    assert.equal(loadStudios(seed).length, 6);
  });
}

test("math studio startup and choice uniqueness hold across 300 independent seeds", () => {
  for (let seed = 0; seed < 300; seed += 1) {
    const modules = loadStudios(seed);
    assert.equal(modules.length, 6, `seed ${seed}`);
    for (const module of modules) {
      for (const question of module.getStaticQuestions()) {
        const choices = question.interactive?.choices;
        if (!choices) continue;
        assert.equal(new Set(choices.map((choice) => choice.summary)).size, choices.length, `seed ${seed}: ${question.question}`);
      }
    }
  }
});

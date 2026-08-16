"use strict";

function hashSeed(value) {
  const text = String(value ?? "homework-qa");
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createSeededRandom(seed) {
  let state = hashSeed(seed);
  return function seededRandom() {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function installSeededRandom(seed = process.env.QA_SEED || "2026-08-12") {
  const normalizedSeed = String(seed);
  Math.random = createSeededRandom(normalizedSeed);
  return normalizedSeed;
}

module.exports = {
  createSeededRandom,
  hashSeed,
  installSeededRandom,
};

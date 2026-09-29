(() => {
  const VARIANTS = ["binary-decode", "binary-encode", "runs-decode", "runs-encode"];
  const PATTERNS = [
    "0110111111110110", "0110100110010110", "0010011011110010",
    "1000100010001111", "1001011001101001", "1111100110011111",
    "0110111110011001", "1110010011100100", "0010011010100010",
    "0000011010011111", "0100111010100100", "1010010110100101",
  ];

  function encodeRuns(bits) {
    const counts = [0];
    let state = 0;
    bits.forEach((bit) => {
      if (bit !== state) {
        counts.push(0);
        state = bit;
      }
      counts[counts.length - 1] += 1;
    });
    return counts;
  }

  function decodeRuns(value, width) {
    const text = String(value ?? "").trim();
    if (text.length > 60 || !/^\d+(?:(?:\s*,\s*|\s+)\d+)*$/.test(text)) return null;
    const counts = text.split(/[\s,]+/).map(Number);
    if (counts.length > width + 1 || counts.some((count, index) =>
      !Number.isInteger(count) || count > width || count < (index === 0 ? 0 : 1)
    ) || counts.reduce((sum, count) => sum + count, 0) !== width) return null;
    return counts.flatMap((count, index) => Array(count).fill(index % 2));
  }

  function isValidConfig(config) {
    return Boolean(config && config.layout === "pixel-code" && VARIANTS.includes(config.variant) &&
      ((config.rows === 1 && [4, 5].includes(config.cols)) || (config.rows === 4 && config.cols === 4)) &&
      Array.isArray(config.target) && config.target.length === config.rows * config.cols &&
      config.target.every((bit) => bit === 0 || bit === 1));
  }

  function rowsOf(config, bits = config.target) {
    return Array.from({ length: config.rows }, (_, row) => bits.slice(row * config.cols, (row + 1) * config.cols));
  }

  function describe(config, bits, runs = false) {
    return rowsOf(config, bits).map((row, index) =>
      `Row ${index + 1}: ${runs ? encodeRuns(row).join(", ") : row.join(" ")}`
    ).join("; ");
  }

  function evaluate(config, tokens) {
    const runs = config.variant === "runs-encode";
    const rows = runs ? Array.from({ length: config.rows }, (_, row) => decodeRuns(tokens[row], config.cols)) : null;
    if (runs && rows.some((row) => !row)) {
      const row = rows.findIndex((value) => !value) + 1;
      return { complete: false, isCorrect: false, value: "", feedback:
        `Row ${row}: enter whole-number counts adding to ${config.cols}. Start with empty, then filled, alternating. Only the first count may be 0.` };
    }
    const bits = runs ? rows.flat() : Array.from({ length: config.target.length }, (_, index) => tokens[index] === "1" ? 1 : 0);
    const mismatch = bits.findIndex((bit, index) => bit !== config.target[index]);
    const feedback = mismatch < 0
      ? "Every pixel matches the message. The same picture can be represented by symbols."
      : `Check row ${Math.floor(mismatch / config.cols) + 1}, column ${mismatch % config.cols + 1}: it should be ${config.target[mismatch] ? "filled (1)" : "empty (0)"}. Read each row from left to right.`;
    return { complete: true, isCorrect: mismatch < 0, value: describe(config, bits, runs), feedback };
  }

  function createRawEntry(difficulty) {
    if (!Number.isInteger(difficulty) || difficulty < 2 || difficulty > 7) return null;
    const variant = ({ 2: "binary-decode", 3: "binary-decode", 4: "binary-encode", 5: "runs-decode", 6: "runs-decode", 7: "runs-encode" })[difficulty];
    const rows = [2, 5].includes(difficulty) ? 1 : 4;
    const cols = difficulty === 5 ? 5 : 4;
    let target;
    if (rows === 1) {
      target = Array.from({ length: cols }, () => Math.random() < 0.5 ? 0 : 1);
    } else {
      const pattern = PATTERNS[Math.floor(Math.random() * PATTERNS.length)].split("").map(Number);
      const mirror = Math.random() < 0.5;
      const flip = Math.random() < 0.5;
      const invert = Math.random() < 0.5;
      target = pattern.map((_, index) => {
        const row = Math.floor(index / 4);
        const col = index % 4;
        const bit = pattern[(flip ? 3 - row : row) * 4 + (mirror ? 3 - col : col)];
        return invert ? 1 - bit : bit;
      });
    }
    const interactive = { layout: "pixel-code", variant, rows, cols, target };
    const runs = variant.startsWith("runs");
    const encoding = variant.endsWith("encode");
    const source = describe(interactive, target, runs && !encoding);
    const answer = describe(interactive, target, runs && encoding);
    const explanation = runs
      ? "Run-length coding counts consecutive cells of the same state. Each row starts with the empty count, then filled, then empty again. A row starting filled has an empty count of 0. Counts must add to the row width."
      : "Each pixel is one cell. 0 means empty and 1 means filled. Read columns left to right, and rows from top to bottom.";
    return {
      mode: "interactive", category: "computing", difficulty,
      question: `Pixel codes: ${encoding ? "write the code for" : "decode"} this ${rows === 1 ? "row" : "picture"}.`,
      answer, answerLabel: answer, interactive,
      topic: "Data representation", strand: "data-representation", skill: `computing.pixel-codes.${variant}`,
      gradeMin: difficulty, gradeMax: difficulty, reviewStatus: "generated-validated",
      contentId: globalThis.HomeworkQuestionUtils.stableContentId("pixel-codes", `${variant}|${rows}|${cols}|${target.join("")}`),
      reviewText: `${encoding ? "Picture (0 = empty, 1 = filled)" : "Source code"}: ${source}`,
      explanation,
      hints: [
        runs ? "Count consecutive cells; begin every row with empty, even when that count is 0." : "Look at one row. Match the first symbol to the leftmost cell.",
        `Row 1 in binary is ${target.slice(0, cols).join(" ")}. 0 = empty; 1 = filled.`,
      ],
    };
  }

  function createEntry(difficulty) {
    if (!Number.isInteger(difficulty) || difficulty < 2 || difficulty > 7) return null;
    return globalThis.HomeworkQuestionUtils.pickGeneratedEntry([createRawEntry], difficulty);
  }

  globalThis.HomeworkPixelCodes = { encodeRuns, decodeRuns, isValidConfig, rowsOf, describe, evaluate, createEntry };
})();

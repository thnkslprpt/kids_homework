const PERCENTAGES_QUESTIONS = (() => {
  const utils = globalThis.HomeworkQuestionUtils;
  const LETTERS = ["A", "B", "C", "D"];
  const COLORS = {
    ink: "#294765",
    line: "#9bb0c3",
    fill: "#4bb9ad",
    fill2: "#f4bd45",
    empty: "#ffffff",
    soft: "#effaf8",
  };

  function clamp(value) {
    return utils?.clampDifficulty?.(value) || Math.max(1, Math.min(10, Number(value) || 3));
  }

  function randomChoice(values) {
    return utils?.randomChoice?.(values) || values[Math.floor(Math.random() * values.length)];
  }

  function randomInt(min, max) {
    return utils?.randomInt?.(min, max) || Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function shuffle(values) {
    return utils?.shuffle?.(values) || [...values].sort(() => Math.random() - 0.5);
  }

  function formatNumber(value) {
    return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(2)));
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function choiceEntry({ difficulty, question, answer, options, displayText = "", visualHtml = "", visualSummary = "", reviewText = "" }) {
    const normalizedAnswer = String(answer);
    const normalizedOptions = Array.from(new Set([normalizedAnswer, ...options.map(String)])).slice(0, 4);
    if (normalizedOptions.length !== 4) {
      throw new Error("Percentage question needs four distinct choices.");
    }
    return {
      difficulty: clamp(difficulty),
      question,
      displayText,
      answer: normalizedAnswer,
      options: shuffle(normalizedOptions),
      visualHtml,
      visualSummary,
      reviewText,
      topic: "percentages",
    };
  }

  function numericOptions(answer, offsets, suffix = "") {
    const values = new Set([Number(answer)]);
    offsets.forEach((offset) => {
      if (values.size < 4) values.add(Number(answer) + Number(offset));
    });
    let step = 1;
    while (values.size < 4) {
      values.add(Number(answer) + step * 10);
      step += 1;
    }
    return Array.from(values).map((value) => `${formatNumber(value)}${suffix}`);
  }

  function visualCard(title, body, note = "") {
    return `
      <div class="math-practice-card percent-practice-card">
        <div class="math-practice-title">${escapeHtml(title)}</div>
        ${body}
        ${note ? `<div class="math-practice-note">${escapeHtml(note)}</div>` : ""}
      </div>
    `;
  }

  function renderHundredGrid(percent) {
    const filled = Math.max(0, Math.min(100, Math.round(percent)));
    const cells = Array.from({ length: 100 }, (_, index) => {
      const x = (index % 10) * 12;
      const y = Math.floor(index / 10) * 12;
      return `<rect x="${x}" y="${y}" width="12" height="12" fill="${index < filled ? COLORS.fill : COLORS.empty}" stroke="${COLORS.line}" stroke-width="0.65"></rect>`;
    }).join("");
    return `<svg class="percent-hundred-grid" viewBox="0 0 120 120" role="img" aria-label="${filled} of 100 squares shaded">${cells}</svg>`;
  }

  function renderPercentBar(percent, { showLabel = true } = {}) {
    const maxPercent = percent > 100 ? 200 : 100;
    const blocks = maxPercent / 10;
    const boundedPercent = Math.max(0, Math.min(maxPercent, Number(percent) || 0));
    const width = 300;
    const blockWidth = width / blocks;
    const rects = Array.from({ length: blocks }, (_, index) => {
      const blockStart = index * 10;
      const blockFillPercent = Math.max(0, Math.min(10, boundedPercent - blockStart));
      const fillWidth = blockWidth * (blockFillPercent / 10);
      const x = index * blockWidth;
      const fill = fillWidth > 0
        ? `<rect x="${x}" y="20" width="${fillWidth}" height="48" fill="${index < 10 ? COLORS.fill : COLORS.fill2}"></rect>`
        : "";
      return `<rect x="${x}" y="20" width="${blockWidth}" height="48" rx="2" fill="${COLORS.empty}"></rect>${fill}<rect x="${x}" y="20" width="${blockWidth}" height="48" rx="2" fill="none" stroke="${COLORS.ink}" stroke-width="1.3"></rect>`;
    }).join("");
    const labels = maxPercent === 200
      ? `<text x="0" y="88">0%</text><text x="150" y="88" text-anchor="middle">100%</text><text x="300" y="88" text-anchor="end">200%</text>`
      : `<text x="0" y="88">0%</text><text x="150" y="88" text-anchor="middle">50%</text><text x="300" y="88" text-anchor="end">100%</text>`;
    return `<svg class="percent-bar-model" viewBox="0 0 300 96" role="img" aria-label="Bar showing ${percent} percent">${rects}${labels}${showLabel ? `<text x="150" y="13" text-anchor="middle" font-weight="800" fill="${COLORS.ink}">${percent}%</text>` : ""}</svg>`;
  }

  function renderDoubleNumberLine(whole, percent, amount) {
    const markerX = 24 + (Math.min(percent, 150) / 150) * 292;
    return `<svg class="percent-double-line" viewBox="0 0 340 126" role="img" aria-label="Double number line connecting ${percent} percent and ${amount}">
      <line x1="24" y1="40" x2="316" y2="40" stroke="${COLORS.ink}" stroke-width="3"></line>
      <line x1="24" y1="88" x2="316" y2="88" stroke="${COLORS.ink}" stroke-width="3"></line>
      <line x1="24" y1="28" x2="24" y2="100" stroke="${COLORS.line}" stroke-width="2"></line>
      <line x1="${markerX}" y1="28" x2="${markerX}" y2="100" stroke="${COLORS.fill2}" stroke-width="4"></line>
      <text x="24" y="20" text-anchor="middle" fill="${COLORS.ink}">0%</text>
      <text x="24" y="119" text-anchor="middle" fill="${COLORS.ink}">0</text>
      <text x="${markerX}" y="20" text-anchor="middle" font-weight="800" fill="${COLORS.ink}">${percent}%</text>
      <text x="${markerX}" y="119" text-anchor="middle" font-weight="800" fill="${COLORS.ink}">${amount}</text>
      <text x="219" y="65" text-anchor="middle" fill="${COLORS.ink}">100% = ${whole}</text>
    </svg>`;
  }

  function optionInteractive({ difficulty, question, choices, answerSummary, visualHtml = "", visualSummary = "", reviewText = "" }) {
    const shuffled = shuffle(choices).map((choice, index) => ({
      label: LETTERS[index],
      summary: String(choice.summary),
      html: choice.html || `<span class="math-option-value">${escapeHtml(choice.summary)}</span>`,
    }));
    const answerIndex = shuffled.findIndex((choice) => choice.summary === String(answerSummary));
    return {
      mode: "interactive",
      difficulty: clamp(difficulty),
      question,
      answer: String(answerSummary),
      answerLabel: String(answerSummary),
      visualHtml,
      visualSummary,
      reviewText,
      topic: "percentages",
      interactive: {
        type: "percent-option",
        layout: "option-select",
        prompt: "Tap the best answer, then check it.",
        choices: shuffled,
        answerIndexes: [answerIndex],
        minSelected: 1,
        maxSelected: 1,
      },
    };
  }

  function partInteractive({ difficulty, percent }) {
    const tileCount = 20;
    const selectedCount = percent / 5;
    return {
      mode: "interactive",
      difficulty: clamp(difficulty),
      question: `Each tile is 5%. Tap enough tiles to build ${percent}%.`,
      answer: `${selectedCount} tiles`,
      answerLabel: `${percent}%`,
      visualHtml: visualCard("Build the percent", renderPercentBar(percent, { showLabel: false }), "Twenty equal tiles make one whole."),
      visualSummary: `${selectedCount} of 20 equal tiles represents ${percent}%.`,
      reviewText: `${selectedCount} × 5% = ${percent}%.`,
      topic: "percentages",
      interactive: {
        type: "percent-painter",
        layout: "part-select",
        prompt: `Select ${selectedCount} tiles.`,
        answerIndexes: Array.from({ length: selectedCount }, (_, index) => index),
        minSelected: selectedCount,
        maxSelected: selectedCount,
        acceptAnySelection: true,
        parts: Array.from({ length: tileCount }, (_, index) => ({
          label: `Tile ${index + 1}`,
          html: `<span class="percent-select-tile">5%</span>`,
        })),
      },
    };
  }

  function pairedInteractive({ difficulty, question, items, reasons, answerItemIndex, answerReasonIndex, visualHtml, reviewText }) {
    return {
      mode: "interactive",
      difficulty: clamp(difficulty),
      question,
      answer: `${items[answerItemIndex].summary} — ${reasons[answerReasonIndex].summary}`,
      answerLabel: items[answerItemIndex].summary,
      visualHtml,
      visualSummary: question,
      reviewText,
      topic: "percentages",
      interactive: {
        type: "percent-reasoning",
        layout: "paired-select",
        prompt: "Choose an answer and the reason that proves it.",
        items,
        reasons,
        answerIndexes: [answerItemIndex],
        answerItemIndex,
        answerReasonIndex,
        itemHeading: "Answer",
        reasonHeading: "Why?",
      },
    };
  }

  function createModelQuestion(level) {
    if (level <= 5) {
      const pools = level === 1
        ? [50, 100]
        : level === 2
          ? [25, 50, 75, 100]
          : level <= 4
            ? [10, 20, 25, 50, 75]
            : [5, 15, 30, 40, 60, 65, 80, 90];
      const target = randomChoice(pools);
      const candidateValues = Array.from(new Set([target, 100 - target, Math.max(5, target - 10), Math.min(95, target + 10)]));
      while (candidateValues.length < 4) {
        const next = randomChoice([20, 35, 45, 55, 70, 85]);
        if (!candidateValues.includes(next)) candidateValues.push(next);
      }
      return optionInteractive({
        difficulty: level,
        question: `Which model shows ${target}%?`,
        answerSummary: `${target}%`,
        choices: candidateValues.slice(0, 4).map((value) => ({
          summary: `${value}%`,
          html: renderPercentBar(value, { showLabel: false }),
        })),
        visualHtml: visualCard("Percent means out of 100", renderHundredGrid(target), `${target} of 100 small squares are shaded.`),
        visualSummary: `${target} of 100 squares are shaded.`,
        reviewText: `${target}% means ${target} out of every 100 equal parts.`,
      });
    }

    const target = randomChoice(level >= 9 ? [115, 125, 140, 150, 175] : [110, 120, 125, 150]);
    const candidateValues = Array.from(new Set([target, target - 10, 100, Math.min(200, target + 25)]));
    for (const value of [target + 10, target - 20, 125, 150, 175, 200]) {
      if (candidateValues.length >= 4) break;
      if (value >= 100 && value <= 200 && !candidateValues.includes(value)) candidateValues.push(value);
    }
    const values = shuffle(candidateValues.slice(0, 4));
    return optionInteractive({
      difficulty: level,
      question: `Which bar represents ${target}% of one whole?`,
      answerSummary: `${target}%`,
      choices: values.map((value) => ({ summary: `${value}%`, html: renderPercentBar(value, { showLabel: false }) })),
      visualHtml: visualCard("Beyond one whole", `<div class="math-big-value">${target}%</div>`, "The first color fills 100%; the second continues beyond the whole."),
      visualSummary: `${target}% is ${target - 100}% more than one whole.`,
      reviewText: `${target}% = 100% + ${target - 100}%.`,
    });
  }

  function createEquivalenceQuestion(level) {
    const values = level <= 4
      ? [{ percent: 25, fraction: "1/4", decimal: "0.25" }, { percent: 50, fraction: "1/2", decimal: "0.5" }, { percent: 75, fraction: "3/4", decimal: "0.75" }]
      : [{ percent: 20, fraction: "1/5", decimal: "0.2" }, { percent: 40, fraction: "2/5", decimal: "0.4" }, { percent: 60, fraction: "3/5", decimal: "0.6" }, { percent: 12.5, fraction: "1/8", decimal: "0.125" }];
    const picked = randomChoice(values.filter((entry) => level >= 5 || entry.percent !== 12.5));
    const correct = `${picked.fraction} = ${picked.decimal} = ${picked.percent}%`;
    return optionInteractive({
      difficulty: level,
      question: `Which equivalence chain is correct for ${picked.percent}%?`,
      answerSummary: correct,
      choices: [
        { summary: correct },
        { summary: `${picked.fraction} = ${formatNumber(Number(picked.decimal) * 10)} = ${picked.percent}%` },
        { summary: `${picked.fraction} = ${picked.decimal} = ${formatNumber(picked.percent / 10)}%` },
        { summary: `${picked.fraction} = ${formatNumber(Number(picked.decimal) + 0.1)} = ${formatNumber(picked.percent + 10)}%` },
      ],
      visualHtml: visualCard("Three ways to name a share", renderPercentBar(picked.percent), "Fraction ↔ decimal ↔ percent"),
      visualSummary: `A bar shows ${picked.percent}% of a whole.`,
      reviewText: `${picked.percent}% means ${picked.percent}/100, which simplifies to ${picked.fraction} and equals ${picked.decimal}.`,
    });
  }

  function createCalculationQuestion(level) {
    if (level <= 5) {
      const percents = level <= 2 ? [10, 25, 50] : level <= 4 ? [5, 10, 20, 25, 50, 75] : [5, 12.5, 15, 20, 25, 35, 40, 60, 75];
      const percent = randomChoice(percents);
      const wholes = percent === 12.5 ? [40, 48, 64, 80, 96] : [20, 40, 60, 80, 100, 120, 160, 200];
      const whole = randomChoice(wholes);
      const answer = (whole * percent) / 100;
      const answerText = formatNumber(answer);
      return choiceEntry({
        difficulty: level,
        question: `What is ${percent}% of ${whole}?`,
        answer: answerText,
        options: numericOptions(answer, [whole / 10, -whole / 10, percent, -percent]).filter((value) => value !== answerText),
        visualHtml: visualCard("Use a benchmark", renderDoubleNumberLine(whole, percent, answer), `${percent}% of ${whole} is ${answerText}.`),
        visualSummary: `Double number line: 100% is ${whole}, and ${percent}% is ${answerText}.`,
        reviewText: `${percent}% × ${whole} = ${answerText}.`,
      });
    }

    if (level <= 7) {
      const whole = randomChoice([40, 50, 60, 80, 120, 160, 200, 240]);
      const percent = randomChoice([15, 20, 25, 30, 35, 40, 60, 75]);
      const part = (whole * percent) / 100;
      const answer = `${percent}%`;
      return choiceEntry({
        difficulty: level,
        question: `${formatNumber(part)} is what percent of ${whole}?`,
        answer,
        options: numericOptions(percent, [-10, 10, -5, 20], "%").filter((value) => value !== answer),
        visualHtml: visualCard("Part compared with whole", renderDoubleNumberLine(whole, percent, part)),
        visualSummary: `${formatNumber(part)} out of ${whole} corresponds to ${percent}%.`,
        reviewText: `${formatNumber(part)} ÷ ${whole} × 100 = ${percent}%.`,
      });
    }

    const original = randomChoice([80, 120, 160, 200, 240, 400]);
    const firstPercent = randomChoice([10, 20, 25, 50]);
    const secondPercent = randomChoice([10, 20, 25]);
    const afterFirst = original * (1 + firstPercent / 100);
    const answer = afterFirst * (1 - secondPercent / 100);
    return choiceEntry({
      difficulty: level,
      question: `A value of ${original} rises by ${firstPercent}% and then falls by ${secondPercent}%. What is the final value?`,
      answer: formatNumber(answer),
      options: numericOptions(answer, [original - answer, 10, -10, firstPercent + secondPercent]).filter((value) => value !== formatNumber(answer)),
      visualHtml: visualCard("Two-step percent change", `<div class="percent-step-flow"><span>${original}</span><b>+${firstPercent}%</b><span>${formatNumber(afterFirst)}</span><b>−${secondPercent}%</b><span>?</span></div>`),
      visualSummary: `Start at ${original}; increase it, then apply the decrease to the new amount.`,
      reviewText: `${original} × ${1 + firstPercent / 100} × ${1 - secondPercent / 100} = ${formatNumber(answer)}.`,
    });
  }

  function createScenarioQuestion(level) {
    if (level <= 5) {
      const total = randomChoice([20, 40, 60, 80, 100]);
      const percent = randomChoice(level <= 3 ? [25, 50, 75] : [10, 20, 30, 40, 60, 75]);
      const answer = (total * percent) / 100;
      return choiceEntry({
        difficulty: level,
        question: `${percent}% of ${total} game tokens are blue. How many blue tokens are there?`,
        answer: formatNumber(answer),
        options: numericOptions(answer, [-5, 5, -10, 10]).filter((value) => value !== formatNumber(answer)),
        visualHtml: visualCard("Tokens", renderHundredGrid(percent), `${percent}% of the collection is blue.`),
        visualSummary: `${percent}% of ${total} tokens are blue.`,
        reviewText: `Find ${percent}% of ${total}: ${formatNumber(answer)} tokens.`,
      });
    }

    if (level <= 7) {
      const price = randomChoice([40, 60, 80, 120, 160, 200]);
      const discount = randomChoice([10, 15, 20, 25, 30, 40]);
      const saved = (price * discount) / 100;
      const answer = price - saved;
      return choiceEntry({
        difficulty: level,
        question: `A ₪${price} game is ${discount}% off. What is the sale price?`,
        answer: `₪${formatNumber(answer)}`,
        options: numericOptions(answer, [-saved, saved, -discount, discount]).map((value) => `₪${value}`).filter((value) => value !== `₪${formatNumber(answer)}`),
        visualHtml: visualCard("Sale strategy", `<div class="percent-price-tag"><s>₪${price}</s><strong>−${discount}%</strong><span>?</span></div>`, "First find the discount, then subtract it."),
        visualSummary: `Original price ₪${price}, discount ${discount}%.`,
        reviewText: `${discount}% of ${price} is ${formatNumber(saved)}, so ${price} − ${formatNumber(saved)} = ${formatNumber(answer)}.`,
      });
    }

    if (level <= 9) {
      const percent = randomChoice([60, 75, 80, 90, 120, 125, 150]);
      const original = randomChoice([40, 80, 120, 160, 200, 240]);
      const final = (original * percent) / 100;
      return choiceEntry({
        difficulty: level,
        question: `After a percent change, ${formatNumber(final)} is ${percent}% of the original amount. What was the original amount?`,
        answer: formatNumber(original),
        options: numericOptions(original, [-20, 20, -10, 10]).filter((value) => value !== formatNumber(original)),
        visualHtml: visualCard("Work backward from the result", renderDoubleNumberLine(original, percent, final)),
        visualSummary: `${percent}% corresponds to ${final}; find 100%.`,
        reviewText: `${formatNumber(final)} ÷ ${percent / 100} = ${formatNumber(original)}.`,
      });
    }

    const principal = randomChoice([200, 400, 500, 800, 1000]);
    const rate = randomChoice([5, 10, 20]);
    const years = randomChoice([2, 3]);
    const answer = principal * Math.pow(1 + rate / 100, years);
    return choiceEntry({
      difficulty: level,
      question: `₪${principal} grows by ${rate}% each year for ${years} years. What is its value after the final year?`,
      answer: `₪${formatNumber(answer)}`,
      options: numericOptions(answer, [principal * rate / 100, -(principal * rate / 100), 10, -10]).map((value) => `₪${value}`).filter((value) => value !== `₪${formatNumber(answer)}`),
      visualHtml: visualCard("Compound growth", `<div class="percent-step-flow"><span>₪${principal}</span><b>× ${1 + rate / 100}</b><span>year 1</span><b>× ${1 + rate / 100}</b><span>...</span></div>`),
      visualSummary: `The ${rate}% growth is applied to a new total each year.`,
      reviewText: `${principal} × ${1 + rate / 100}^${years} = ${formatNumber(answer)}.`,
    });
  }

  function createReasoningQuestion(level) {
    if (level <= 7) {
      const items = [
        { label: "They are equal", summary: "25% of 80 equals 40% of 50" },
        { label: "The first is larger", summary: "25% of 80 is larger" },
        { label: "The second is larger", summary: "40% of 50 is larger" },
      ];
      const reasons = [
        { label: "A", summary: "Both amounts are 20." },
        { label: "B", summary: "40% is always greater than 25%." },
        { label: "C", summary: "80 is greater than 50, so the first must be greater." },
      ];
      return pairedInteractive({
        difficulty: level,
        question: "Compare 25% of 80 with 40% of 50. Choose the comparison and a reason.",
        items,
        reasons,
        answerItemIndex: 0,
        answerReasonIndex: 0,
        visualHtml: visualCard("Different percents, different wholes", `<div class="percent-comparison"><span>25% of 80</span><strong>?</strong><span>40% of 50</span></div>`),
        reviewText: "25% of 80 is 20, and 40% of 50 is also 20.",
      });
    }

    const items = [
      { label: "It ends below the start", summary: "The final value is less than the starting value" },
      { label: "It returns to the start", summary: "The final value equals the starting value" },
      { label: "It ends above the start", summary: "The final value is greater than the starting value" },
    ];
    const reasons = [
      { label: "A", summary: "The 20% decrease is taken from the larger, already-increased value." },
      { label: "B", summary: "+20% and −20% always cancel because the numbers match." },
      { label: "C", summary: "Any increase followed by a decrease must end above the start." },
    ];
    return pairedInteractive({
      difficulty: level,
      question: "A price rises by 20%, then falls by 20%. Where does it finish compared with the starting price?",
      items,
      reasons,
      answerItemIndex: 0,
      answerReasonIndex: 0,
      visualHtml: visualCard("Do equal percent changes cancel?", `<div class="percent-step-flow"><span>100</span><b>+20%</b><span>120</span><b>−20%</b><span>96</span></div>`),
      reviewText: "Starting from 100 gives 120, then 20% of 120 is 24, so the final value is 96.",
    });
  }

  function createEarlyBenchmarkQuestion(level) {
    if (level === 1) {
      const askWhole = Math.random() < 0.35;
      const answer = askWhole ? "100%" : "50%";
      return optionInteractive({
        difficulty: level,
        question: askWhole ? "A whole bar is shaded. Which percent names the whole?" : "Half of a bar is shaded. Which percent names one half?",
        answerSummary: answer,
        choices: ["25%", "50%", "75%", "100%"].map((summary) => ({ summary })),
        visualHtml: visualCard(askWhole ? "One whole" : "One half", renderPercentBar(askWhole ? 100 : 50, { showLabel: false }), "100% is a whole; 50% is one of two equal halves."),
        visualSummary: `${answer} of a bar is shaded.`,
        reviewText: askWhole ? "100% means one complete whole." : "50% means half of a whole.",
      });
    }

    if (level === 2) {
      const percent = randomChoice([25, 50, 75]);
      const words = { 25: "one quarter", 50: "one half", 75: "three quarters" };
      return choiceEntry({
        difficulty: level,
        question: `Which phrase describes ${percent}% of a whole?`,
        answer: words[percent],
        options: ["one quarter", "one half", "three quarters", "one whole"].filter((value) => value !== words[percent]),
        visualHtml: visualCard("Benchmark shares", renderPercentBar(percent, { showLabel: false })),
        visualSummary: `${percent}% of a bar is shaded.`,
        reviewText: `${percent}% is ${words[percent]}.`,
      });
    }

    if (level === 3) {
      const percent = randomChoice([10, 25, 50, 75]);
      return choiceEntry({
        difficulty: level,
        question: `${percent}% means how many out of 100?`,
        answer: String(percent),
        options: numericOptions(percent, [-10, 10, -5, 5]).filter((value) => value !== String(percent)),
        visualHtml: visualCard("Percent means out of 100", renderHundredGrid(percent)),
        visualSummary: `${percent} of 100 squares are shaded.`,
        reviewText: `${percent}% means ${percent} out of 100.`,
      });
    }

    return createEquivalenceQuestion(level);
  }

  function createAdvancedReasoningQuestion(level) {
    if (level <= 8) {
      return createReasoningQuestion(level);
    }
    if (level === 9) {
      const items = [
        { label: "About 33.3% less", summary: "B is about 33.3% less than A" },
        { label: "50% less", summary: "B is 50% less than A" },
        { label: "They are equal", summary: "A and B are equal" },
      ];
      const reasons = [
        { label: "A", summary: "If B is 100, A is 150; the 50 difference is one third of A." },
        { label: "B", summary: "Percent comparisons are always reversible." },
        { label: "C", summary: "Use 100 as the denominator in both directions." },
      ];
      return pairedInteractive({ difficulty: level, question: "A is 50% more than B. How much less is B than A?", items, reasons, answerItemIndex: 0, answerReasonIndex: 0, visualHtml: visualCard("The comparison base changes", `<div class="percent-comparison"><span>B = 100</span><strong>A = 150</strong></div>`), reviewText: "The difference is 50, measured against A = 150: 50/150 = 1/3." });
    }
    const items = [
      { label: "4%", summary: "4% error" },
      { label: "2%", summary: "2% error" },
      { label: "96%", summary: "96% error" },
    ];
    const reasons = [
      { label: "A", summary: "The absolute error is 2, and 2 ÷ 50 × 100 = 4%." },
      { label: "B", summary: "Divide the error by the measured value 48 only." },
      { label: "C", summary: "Subtract the error from 100%." },
    ];
    return pairedInteractive({ difficulty: level, question: "A length is measured as 48 cm; the accepted value is 50 cm. What is the percent error?", items, reasons, answerItemIndex: 0, answerReasonIndex: 0, visualHtml: visualCard("Percent error", `<div class="percent-step-flow"><span>|48 − 50|</span><b>÷ 50</b><span>× 100%</span></div>`), reviewText: "Percent error = |measured − accepted| ÷ accepted × 100% = 4%." });
  }

  let generationIndex = 0;

  function createGeneratedEntry(difficulty) {
    const level = clamp(difficulty);
    const interactiveFactories = level <= 3
      ? [() => createEarlyBenchmarkQuestion(level), () => createModelQuestion(level)]
      : [() => createModelQuestion(level), () => createEquivalenceQuestion(level)];
    if (level >= 3 && level <= 6) interactiveFactories.push(() => partInteractive({ difficulty: level, percent: randomChoice([20, 25, 30, 40, 50, 60, 75, 80]) }));
    if (level >= 5) interactiveFactories.push(() => createAdvancedReasoningQuestion(level));
    if (level >= 9) {
      interactiveFactories.splice(0, interactiveFactories.length, () => createAdvancedReasoningQuestion(level), () => createModelQuestion(level));
    }
    const choiceFactories = level <= 3
      ? [() => createEarlyBenchmarkQuestion(level), () => createModelQuestion(level)]
      : level <= 5
        ? [() => createEarlyBenchmarkQuestion(level), () => createScenarioQuestion(level)]
        : [() => createCalculationQuestion(level), () => createScenarioQuestion(level)];
    const factories = generationIndex % 2 === 0 ? interactiveFactories : choiceFactories;
    generationIndex += 1;
    return randomChoice(factories)();
  }

  const staticQuestions = [
    [1, "What does 50% mean?", "50 out of 100", ["5 out of 100", "50 out of 50", "100 out of 50"]],
    [2, "Which fraction equals 25%?", "1/4", ["1/2", "1/5", "3/4"]],
    [3, "What is 10% of 70?", "7", ["10", "17", "63"]],
    [4, "What is 35% of 200?", "70", ["35", "65", "165"]],
    [5, "Write 0.6 as a percent.", "60%", ["6%", "0.6%", "600%"]],
    [6, "A ₪100 item is 20% off. What is the sale price?", "₪80", ["₪20", "₪100", "₪120"]],
    [7, "30 is what percent of 120?", "25%", ["20%", "30%", "40%"]],
    [8, "After a 25% increase, a value is 100. What was it before?", "80", ["75", "100", "125"]],
    [9, "A value rises 10% and then falls 10%. What percent of the start remains?", "99%", ["90%", "100%", "101%"]],
    [10, "What multiplier represents three consecutive 10% increases?", "1.1³", ["1.3", "0.9³", "3.1"]],
  ].map(([difficulty, question, answer, distractors]) => choiceEntry({ difficulty, question, answer, options: distractors }));

  return { createGeneratedEntry, createModelQuestion, renderPercentBar, staticQuestions };
})();

globalThis.PERCENTAGES_QUESTION_COVERAGE = {
  createModelQuestion: PERCENTAGES_QUESTIONS.createModelQuestion,
  renderPercentBar: PERCENTAGES_QUESTIONS.renderPercentBar,
};

globalThis.HomeworkQuestions?.register({
  id: "percentages",
  label: "Percentages",
  getStaticQuestions: () => PERCENTAGES_QUESTIONS.staticQuestions,
  generatedEntryFactory: PERCENTAGES_QUESTIONS.createGeneratedEntry,
  generatedShare: 1,
});

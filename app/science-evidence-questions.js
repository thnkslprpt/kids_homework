const SCIENCE_EVIDENCE_QUESTIONS = [
  {
    question: "What should Sara keep the same to make this a fair test?",
    displayText: "Sara wants to know which paper towel brand soaks up the most water. She uses the same amount of water on each towel and measures how much each one holds.",
    options: [
      "The amount of water used each time",
      "The brand name",
      "The color of the towel",
      "Which answer she hopes to get",
    ],
    answer: "The amount of water used each time",
    difficulty: 1,
  },
  {
    question: "What variable changed in the experiment?",
    displayText: "Cup A: 1 spoon of water each day\nCup B: 2 spoons of water each day\nCup C: 3 spoons of water each day",
    visualHtml: buildScienceTableCard("Bean plant experiment", [
      ["Cup", "Water each day"],
      ["A", "1 spoon"],
      ["B", "2 spoons"],
      ["C", "3 spoons"],
    ]),
    options: ["The amount of water", "The kind of plant", "The type of cup", "The color of the table"],
    answer: "The amount of water",
    difficulty: 1,
  },
  {
    question: "Which evidence best supports the claim?",
    displayText: "Claim: Plants in sunlight grow taller than plants kept in the dark.",
    visualHtml: buildScienceTableCard("Plant heights after 1 week", [
      ["Plant", "Height"],
      ["Sunlight", "14 cm"],
      ["Dark closet", "6 cm"],
    ]),
    options: [
      "The sunlight plant was taller",
      "Plants are always green",
      "Closets are useful for storage",
      "The ruler measured centimeters",
    ],
    answer: "The sunlight plant was taller",
    difficulty: 1,
  },
  {
    question: "Which choice is the best conclusion from the data?",
    displayText: "A student tested three sponges with the same amount of water.",
    visualHtml: buildScienceTableCard("Water absorbed", [
      ["Sponge", "Water absorbed"],
      ["Red", "10 mL"],
      ["Blue", "15 mL"],
      ["Green", "8 mL"],
    ]),
    options: [
      "The blue sponge absorbed the most water.",
      "All sponges are the same color.",
      "Water disappears when it touches a sponge.",
      "The red sponge was the tallest.",
    ],
    answer: "The blue sponge absorbed the most water.",
    difficulty: 2,
  },
  {
    question: "What should the scientist keep the same?",
    displayText: "Two groups of seeds are planted. One group gets sunlight, and one group gets shade.",
    options: [
      "The amount of water each group gets",
      "Which group gets sunlight",
      "How tall the plants grow",
      "Which group gets shade",
    ],
    answer: "The amount of water each group gets",
    difficulty: 2,
  },
  {
    question: "What does the table show?",
    visualHtml: buildScienceTableCard("Seed growth", [
      ["Day", "Height"],
      ["1", "2 cm"],
      ["3", "4 cm"],
      ["5", "6 cm"],
    ]),
    options: [
      "The plant grew over time.",
      "The plant shrank over time.",
      "The plant stayed the same size.",
      "The plant changed color only.",
    ],
    answer: "The plant grew over time.",
    difficulty: 2,
  },
  {
    question: "Which change would make this a fair test?",
    displayText: "A student wants to compare how fast two toy cars roll down a ramp.",
    options: [
      "Use the same ramp and the same starting point",
      "Use a different ramp for each car",
      "Push one car harder than the other",
      "Let one car start halfway down",
    ],
    answer: "Use the same ramp and the same starting point",
    difficulty: 3,
  },
  {
    question: "Which evidence supports the claim?",
    displayText: "Claim: Ice melts faster in a warm room than in a cold room.",
    options: [
      "The ice in the warm room disappeared first",
      "Both rooms were painted white",
      "The warm room had a chair",
      "Ice is made of water",
    ],
    answer: "The ice in the warm room disappeared first",
    difficulty: 3,
  },
  {
    question: "What conclusion fits the data?",
    visualHtml: buildScienceTableCard("Bean plants", [
      ["Group", "Water each day", "Height after 10 days"],
      ["A", "1 cup", "18 cm"],
      ["B", "3 cups", "17 cm"],
    ]),
    options: [
      "More water did not make this plant taller.",
      "Plants grow best in the dark.",
      "Water stops plants from growing.",
      "Group B had no water at all.",
    ],
    answer: "More water did not make this plant taller.",
    difficulty: 3,
  },
  {
    question: "Which statement is an observation, not a guess?",
    options: [
      "The leaf is green.",
      "The leaf must be hungry.",
      "The leaf probably likes music.",
      "The leaf is feeling excited.",
    ],
    answer: "The leaf is green.",
    difficulty: 3,
  },
  {
    question: "What should the student change in the experiment?",
    displayText: "A student wants to test whether different colors of paper warm up differently in the sun.",
    options: [
      "The color of the paper",
      "The sun",
      "The table",
      "The measuring cup",
    ],
    answer: "The color of the paper",
    difficulty: 4,
  },
  {
    question: "Which claim is supported by the evidence?",
    visualHtml: buildScienceTableCard("Snail speed", [
      ["Surface", "Time to cross 1 meter"],
      ["Sandpaper", "40 seconds"],
      ["Tile", "22 seconds"],
    ]),
    options: [
      "The snail moved faster on tile.",
      "The snail only moves at night.",
      "Sandpaper is softer than tile.",
      "The tile was not measured.",
    ],
    answer: "The snail moved faster on tile.",
    difficulty: 4,
  },
  {
    question: "Which result is best evidence that the seed type mattered?",
    visualHtml: buildScienceTableCard("Seed test", [
      ["Seed type", "Plants that sprouted"],
      ["Type A", "8 out of 10"],
      ["Type B", "2 out of 10"],
    ]),
    options: [
      "Type A sprouted more often than Type B.",
      "The cups were the same size.",
      "The dirt was brown.",
      "The teacher wrote the data down.",
    ],
    answer: "Type A sprouted more often than Type B.",
    difficulty: 4,
  },
  {
    question: "What variable is being changed?",
    displayText: "A student tests plants with different amounts of light but keeps the water and soil the same.",
    options: ["The amount of light", "The soil color", "The pot shape", "The plant's age"],
    answer: "The amount of light",
    difficulty: 4,
  },
  {
    question: "Which choice is the best explanation for the results?",
    visualHtml: buildScienceTableCard("Ice cubes", [
      ["Location", "Time to melt"],
      ["Window", "12 minutes"],
      ["Shady desk", "25 minutes"],
    ]),
    options: [
      "The warmer place made the ice melt faster.",
      "The ice changed into a rock.",
      "The desk made the room colder.",
      "The window blocked all light and heat.",
    ],
    answer: "The warmer place made the ice melt faster.",
    difficulty: 5,
  },
  {
    question: "Which statement is the strongest claim supported by the evidence?",
    visualHtml: buildScienceTableCard("Paper airplane test", [
      ["Plane", "Distance"],
      ["Fold A", "7 m"],
      ["Fold B", "12 m"],
      ["Fold C", "9 m"],
    ]),
    options: [
      "Fold B flew the farthest.",
      "All planes flew the same distance.",
      "Fold A flew the farthest.",
      "The paper was wet.",
    ],
    answer: "Fold B flew the farthest.",
    difficulty: 5,
  },
  {
    question: "What should stay the same for a fair test?",
    displayText: "A class compares how three different cups keep water cold.",
    options: [
      "The amount of water in each cup",
      "The cup material",
      "The color of the cups",
      "The name of the group testing the cups",
    ],
    answer: "The amount of water in each cup",
    difficulty: 5,
  },
];

function createScienceEvidenceGeneratedEntry(difficulty) {
  const level = clampScienceEvidenceDifficulty(difficulty);
  const generators = {
    1: [createFairTestQuestion, createVariableQuestion, createEvidenceQuestion],
    2: [createDataTableQuestion, createFairTestQuestion, createObservationQuestion],
    3: [createClaimEvidenceQuestion, createDataTableQuestion, createVariableQuestion],
    4: [createPredictionQuestion, createClaimEvidenceQuestion, createObservationQuestion],
    5: [createInterpretationQuestion, createPredictionQuestion, createClaimEvidenceQuestion],
  }[level];

  return scienceEvidenceRandomChoice(generators)(level);
}

function createFairTestQuestion(difficulty = 1) {
  return scienceEvidenceBuildQuestion({
    question: "What should stay the same to make the test fair?",
    displayText: "A student compares two paper towels by seeing which one soaks up more water.",
    options: [
      "The amount of water",
      "The paper towel brand",
      "The color of the paper towel",
      "The student's favorite number",
    ],
    answer: "The amount of water",
    difficulty,
    visualSummary: "The amount of water should stay the same.",
  });
}

function createVariableQuestion(difficulty = 1) {
  return scienceEvidenceBuildQuestion({
    question: "What variable changed?",
    visualHtml: buildScienceTableCard("Plant test", [
      ["Cup", "Sunlight"],
      ["A", "2 hours"],
      ["B", "4 hours"],
      ["C", "6 hours"],
    ]),
    options: ["The amount of sunlight", "The kind of seed", "The color of the cup", "The table shape"],
    answer: "The amount of sunlight",
    difficulty,
    visualSummary: "The amount of sunlight changed.",
  });
}

function createEvidenceQuestion(difficulty = 2) {
  return scienceEvidenceBuildQuestion({
    question: "Which evidence supports the claim?",
    displayText: "Claim: Plants with sunlight grow taller than plants in the dark.",
    options: [
      "The plant in sunlight was taller",
      "The dark plant was painted blue",
      "Both plants were watered by the same person",
      "The pots were the same size",
    ],
    answer: "The plant in sunlight was taller",
    difficulty,
    visualSummary: "The taller plant is evidence.",
  });
}

function createDataTableQuestion(difficulty = 2) {
  return scienceEvidenceBuildQuestion({
    question: "What does the table show?",
    visualHtml: buildScienceTableCard("Bean heights", [
      ["Day", "Height"],
      ["2", "3 cm"],
      ["4", "5 cm"],
      ["6", "7 cm"],
    ]),
    options: [
      "The bean plant grew over time",
      "The bean plant got smaller",
      "The bean plant stayed the same size",
      "The bean plant disappeared",
    ],
    answer: "The bean plant grew over time",
    difficulty,
    visualSummary: "The heights increased over time.",
  });
}

function createObservationQuestion(difficulty = 3) {
  return scienceEvidenceBuildQuestion({
    question: "Which sentence is an observation?",
    options: [
      "The water is clear",
      "The water must taste sweet",
      "The water wants to sleep",
      "The water is probably angry",
    ],
    answer: "The water is clear",
    difficulty,
    visualSummary: "An observation uses senses or measurements.",
  });
}

function createClaimEvidenceQuestion(difficulty = 4) {
  return scienceEvidenceBuildQuestion({
    question: "Which claim is supported by the evidence?",
    visualHtml: buildScienceTableCard("Ice melt test", [
      ["Place", "Time to melt"],
      ["Sunny window", "11 minutes"],
      ["Shady shelf", "24 minutes"],
    ]),
    options: [
      "Ice melted faster in the sunny window",
      "Ice never melts",
      "The shelf was hotter than the window",
      "The ice was measured with a ruler",
    ],
    answer: "Ice melted faster in the sunny window",
    difficulty,
    visualSummary: "The warmer place had faster melting.",
  });
}

function createPredictionQuestion(difficulty = 4) {
  return scienceEvidenceBuildQuestion({
    question: "What is the best prediction?",
    displayText: "A student moves one plant to sunlight and keeps another in the dark.",
    options: [
      "The plant in sunlight may grow taller",
      "The dark plant will become a car",
      "Both plants will stop needing water",
      "The sunlight plant will turn into a rock",
    ],
    answer: "The plant in sunlight may grow taller",
    difficulty,
    visualSummary: "Sunlight may help the plant grow taller.",
  });
}

function createInterpretationQuestion(difficulty = 5) {
  return scienceEvidenceBuildQuestion({
    question: "Which conclusion fits the data best?",
    visualHtml: buildScienceTableCard("Snail race", [
      ["Surface", "Time to cross"],
      ["Grass", "35 seconds"],
      ["Tile", "20 seconds"],
    ]),
    options: [
      "The snail moved faster on tile",
      "The snail moved slower on tile",
      "The snail did not move at all",
      "The grass was made of metal",
    ],
    answer: "The snail moved faster on tile",
    difficulty,
    visualSummary: "The shorter time on tile shows faster movement.",
  });
}

function scienceEvidenceBuildQuestion({
  question,
  options,
  answer,
  difficulty,
  displayText = "",
  visualHtml = "",
  visualSummary = "",
}) {
  if (!Array.isArray(options) || options.length !== 4 || !options.includes(answer)) {
    throw new Error("Science evidence questions require exactly 4 options with one answer.");
  }

  return {
    question,
    displayText,
    visualHtml,
    options: scienceEvidenceShuffleArray(options),
    answer,
    difficulty,
    visualSummary,
    type: "science-evidence-choice",
  };
}

function buildScienceTableCard(title, rows) {
  const header = rows[0] || [];
  const bodyRows = rows.slice(1);
  const headerHtml = `<tr>${header.map((cell) => `<th style="${scienceEvidenceCellStyle(true)}">${scienceEvidenceEscapeHtml(cell)}</th>`).join("")}</tr>`;
  const bodyHtml = bodyRows
    .map(
      (row) =>
        `<tr>${row.map((cell) => `<td style="${scienceEvidenceCellStyle(false)}">${scienceEvidenceEscapeHtml(cell)}</td>`).join("")}</tr>`
    )
    .join("");

  return `
    <div style="
      max-width: 620px;
      padding: 14px 16px;
      border: 2px solid #274972;
      border-radius: 16px;
      background: linear-gradient(180deg, #f8fbff 0%, #eef5ff 100%);
      color: #274972;
      font-family: Arial, sans-serif;
    ">
      <div style="font-weight: 700; margin-bottom: 10px;">${scienceEvidenceEscapeHtml(title)}</div>
      <table style="border-collapse: collapse; width: 100%; font-size: 14px;">
        <tbody>
          ${headerHtml}
          ${bodyHtml}
        </tbody>
      </table>
    </div>
  `;
}

function scienceEvidenceCellStyle(isHeader) {
  return [
    "border: 1px solid #9fb3c8",
    "padding: 6px 8px",
    "text-align: left",
    "background: " + (isHeader ? "#dfeaf7" : "#ffffff"),
    isHeader ? "font-weight: 700" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

function clampScienceEvidenceDifficulty(value) {
  const level = Number.parseInt(value, 10);
  if (!Number.isFinite(level)) {
    return 3;
  }

  return Math.min(5, Math.max(1, level));
}

function scienceEvidenceEscapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function scienceEvidenceRandomChoice(values) {
  return values[Math.floor(Math.random() * values.length)];
}

function scienceEvidenceShuffleArray(values) {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

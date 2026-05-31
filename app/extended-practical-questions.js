(() => {
  const { entry, numberOptions, pickGeneratedEntry, randomChoice, randomInt, renderTable } = globalThis.HomeworkExtended;

  function createRecipeQuestion(difficulty) {
    const ingredient = randomChoice(["flour", "rice", "oats", "sugar"]);
    const amount = randomChoice([1, 2, 3, 4]);
    const batches = randomInt(2, difficulty >= 6 ? 5 : 3);
    const answer = amount * batches;
    return entry({
      topic: "practical-recipes",
      difficulty,
      question: `A recipe needs ${amount} cups of ${ingredient} for one batch. How much for ${batches} batches?`,
      answer: `${answer} cups`,
      options: numberOptions(answer, [-amount, -1, 1, amount, batches], 1).map((value) => `${value} cups`),
    });
  }

  function createTransitQuestion(difficulty) {
    const busMinute = randomChoice([10, 15, 25, 35, 45, 50]);
    const walk = randomInt(5, difficulty >= 6 ? 14 : 9);
    const hour = randomChoice([7, 8, 14, 15]);
    const leaveMinute = busMinute - walk;
    const leaveHour = leaveMinute >= 0 ? hour : hour - 1;
    const normalizedMinute = leaveMinute >= 0 ? leaveMinute : 60 + leaveMinute;
    const answer = `${leaveHour}:${String(normalizedMinute).padStart(2, "0")}`;
    return entry({
      topic: "practical-transit-schedules",
      difficulty,
      question: "What is the latest safe leave time?",
      displayText: `The bus comes at ${hour}:${String(busMinute).padStart(2, "0")}. The walk to the stop takes ${walk} minutes.`,
      answer,
      options: [
        answer,
        `${hour}:${String(busMinute).padStart(2, "0")}`,
        `${hour}:${String(Math.min(59, busMinute + walk)).padStart(2, "0")}`,
        `${leaveHour}:${String(Math.max(0, normalizedMinute - 5)).padStart(2, "0")}`,
      ],
    });
  }

  function createLabelQuestion(difficulty) {
    const serving = randomChoice([1, 2, 3]);
    const calories = randomChoice([80, 120, 150, 210]);
    const sugar = randomChoice([4, 8, 12, 16]);
    const askCalories = Math.random() < 0.5;
    return entry({
      topic: "practical-reading-labels",
      difficulty,
      question: askCalories ? "How many calories are in two servings?" : "Which label item tells you the amount counted as one serving?",
      visualHtml: renderTable("Snack label", [["Serving size", `${serving} cup`], ["Calories", calories], ["Added sugar", `${sugar} g`]]),
      answer: askCalories ? `${calories * 2} calories` : "Serving size",
      options: askCalories
        ? [`${calories * 2} calories`, `${calories} calories`, `${calories + 2} calories`, `${sugar * 2} calories`]
        : ["Serving size", "Brand logo", "Package color", "Barcode"],
    });
  }

  const safetyBlueprints = [
    { topic: "practical-tool-safety", difficulty: 1, question: "What should you do before using scissors?", answer: "Point them away from your body and walk carefully", options: ["Point them away from your body and walk carefully", "Run with them", "Point them at a friend", "Throw them into a drawer"] },
    { topic: "practical-tool-safety", difficulty: 3, question: "Which label warning means you should not touch the tool?", answer: "Hot surface", options: ["Hot surface", "Blue handle", "Made on Monday", "Lightweight"] },
    { topic: "practical-tool-safety", difficulty: 5, question: "A cutting tool is dull and slipping. What is the safest next step?", answer: "Stop and ask an adult to fix or replace it", options: ["Stop and ask an adult to fix or replace it", "Push harder", "Cut faster", "Point it toward your hand"] },
    { topic: "practical-tool-safety", difficulty: 8, question: "Why should goggles be worn for some building tasks?", answer: "They help protect eyes from flying bits", options: ["They help protect eyes from flying bits", "They make tools sharper", "They replace adult supervision", "They make dust safe to breathe"] },
    { topic: "practical-emergency-decisions", difficulty: 1, question: "What should you do first for a small scrape?", answer: "Tell an adult and wash it gently", options: ["Tell an adult and wash it gently", "Hide it", "Rub dirt on it", "Keep playing without looking"] },
    { topic: "practical-emergency-decisions", difficulty: 4, question: "You smell smoke in the kitchen. What should you do first?", answer: "Tell an adult and move away from danger", options: ["Tell an adult and move away from danger", "Hide in a closet", "Touch the stove", "Open every container"] },
    { topic: "practical-emergency-decisions", difficulty: 6, question: "Someone is unconscious and not responding. What should you do first?", answer: "Call emergency help or tell an adult to call now", options: ["Call emergency help or tell an adult to call now", "Give them food", "Wait an hour", "Move them far away for no reason"] },
    { topic: "practical-emergency-decisions", difficulty: 9, question: "Which emergency choice is best during a kitchen grease fire?", answer: "Turn off heat if safe and get adult/emergency help", options: ["Turn off heat if safe and get adult/emergency help", "Pour water on the grease", "Carry the pan outside", "Fan the flames"] },
    { topic: "practical-emergency-decisions", difficulty: 10, question: "What is the best reason to follow an emergency decision tree?", answer: "It helps choose safe steps in the right order", options: ["It helps choose safe steps in the right order", "It makes every emergency harmless", "It replaces calling for help", "It makes facts unnecessary"] },
  ];

  function createBlueprintEntry(difficulty) {
    const level = Math.max(1, Math.min(10, Number.parseInt(difficulty, 10) || 3));
    return entry(randomChoice(safetyBlueprints.filter((item) => item.difficulty <= level)));
  }

  const practicalGenerators = [
    createRecipeQuestion,
    createTransitQuestion,
    createLabelQuestion,
    createBlueprintEntry,
  ];

  globalThis.createExtendedPracticalGeneratedEntry = (difficulty) =>
    pickGeneratedEntry(practicalGenerators, difficulty);
})();

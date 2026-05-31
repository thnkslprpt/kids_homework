(() => {
  const { entry, pickGeneratedEntry, randomChoice } = globalThis.HomeworkExtended;

  const blueprints = [
    { topic: "thinking-prioritization", difficulty: 1, question: "Which should you do first before building a model?", answer: "Check what the goal is", options: ["Check what the goal is", "Throw away the parts", "Guess without looking", "Make it harder on purpose"] },
    { topic: "thinking-prioritization", difficulty: 3, question: "Which task should be done first?", displayText: "A: due tomorrow and important. B: due next month and easy. C: optional.", answer: "A", options: ["A", "B", "C", "Do none"] },
    { topic: "thinking-prioritization", difficulty: 7, question: "Which reason is best for doing the urgent important task first?", answer: "It has a close deadline and matters", options: ["It has a close deadline and matters", "It is the most fun", "It has the brightest color", "It can be ignored forever"] },
    { topic: "thinking-planning", difficulty: 1, question: "What is a good first planning step?", answer: "List what needs to be done", options: ["List what needs to be done", "Skip the directions", "Start at the final step", "Hide the materials"] },
    { topic: "thinking-planning", difficulty: 4, question: "Which plan is in the best order?", answer: "Read goal, gather materials, build, check", options: ["Read goal, gather materials, build, check", "Build, ignore goal, gather materials, check", "Check, build, read goal, gather", "Gather, hide materials, stop, build"] },
    { topic: "thinking-debugging", difficulty: 2, question: "Your answer does not match the choices. What is a good debugging step?", answer: "Reread the question and check each step", options: ["Reread the question and check each step", "Pick randomly", "Erase the question", "Ignore units"] },
    { topic: "thinking-debugging", difficulty: 5, question: "A program says 2 + 3 = 23. What is the likely mistake?", answer: "It joined text instead of adding numbers", options: ["It joined text instead of adding numbers", "Addition stopped existing", "The number 2 is always wrong", "The screen is too bright"] },
    { topic: "thinking-cause-effect", difficulty: 2, question: "Which is a cause-and-effect pair?", answer: "The cup tipped, so water spilled", options: ["The cup tipped, so water spilled", "The cup is blue and round", "Water and pencils are nouns", "The table is near a chair"] },
    { topic: "thinking-cause-effect", difficulty: 6, question: "Which sentence shows a chain of cause and effect?", answer: "Rain made mud, mud slowed the runners, and the race took longer", options: ["Rain made mud, mud slowed the runners, and the race took longer", "Rain, mud, runners, race", "The race was a race because race", "The runners liked blue shoes"] },
    { topic: "thinking-tradeoffs", difficulty: 3, question: "Which tradeoff is real?", answer: "A faster route may have more traffic risk", options: ["A faster route may have more traffic risk", "A bigger backpack weighs nothing", "Saving money always means spending more", "More screen time always improves sleep"] },
    { topic: "thinking-tradeoffs", difficulty: 8, question: "Which decision rule is best for a hard tradeoff?", answer: "Compare options using the same important criteria", options: ["Compare options using the same important criteria", "Choose the first option seen", "Ignore costs", "Only ask someone who agrees"] },
    { topic: "thinking-risk-reward", difficulty: 4, question: "Which choice has the lowest risk?", answer: "Wear goggles before using a tool", options: ["Wear goggles before using a tool", "Skip safety steps", "Run while carrying scissors", "Touch a hot pan"] },
    { topic: "thinking-risk-reward", difficulty: 6, question: "Which option has a clear reward but also a risk?", answer: "Taking a shortcut may save time but might be unsafe", options: ["Taking a shortcut may save time but might be unsafe", "Wearing a helmet makes biking safer", "Reading directions helps avoid mistakes", "Checking work can catch errors"] },
    { topic: "thinking-evidence-checks", difficulty: 5, question: "What would change your mind about a claim that a study app helps?", answer: "A fair comparison showing no improvement", options: ["A fair comparison showing no improvement", "The app has a bright logo", "One friend likes the color", "The name sounds smart"] },
    { topic: "thinking-evidence-checks", difficulty: 7, question: "Which evidence would most strongly test a cause-and-effect claim?", answer: "A controlled comparison changing only the suspected cause", options: ["A controlled comparison changing only the suspected cause", "A funny story from one person", "A guess made before data", "A picture without measurements"] },
    { topic: "thinking-evidence-checks", difficulty: 10, question: "Which question best checks whether you should change your mind?", answer: "What evidence would show my current idea is wrong?", options: ["What evidence would show my current idea is wrong?", "Who agrees with me already?", "Can I ignore the strongest evidence?", "Which answer sounds nicest?"] },
  ];

  function createBlueprintEntry(difficulty) {
    const level = Math.max(1, Math.min(10, Number.parseInt(difficulty, 10) || 3));
    return entry(randomChoice(blueprints.filter((item) => item.difficulty <= level)));
  }

  globalThis.createExtendedThinkingGeneratedEntry = (difficulty) =>
    pickGeneratedEntry([createBlueprintEntry], difficulty);
})();

const SENTENCE_DRAG_ENGLISH_DATA = (() => {
  function clampDifficulty(value) {
    const level = Number.parseInt(value, 10);
    if (!Number.isFinite(level)) {
      return 3;
    }

    return Math.min(10, Math.max(1, level));
  }

  function shuffleArray(values) {
    const copy = [...values];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
  }

  function pick(values) {
    return values[Math.floor(Math.random() * values.length)];
  }

  function buildFilledSentence(templateParts, answer) {
    return templateParts.reduce((sentence, part, index) => {
      const token = index < answer.length ? answer[index] : "";
      return `${sentence}${part}${token}`;
    }, "");
  }

  function uniqueStrings(values) {
    return Array.from(new Set(values.map((value) => String(value))));
  }

  function makeChoices(answer, distractors) {
    const normalizedAnswer = answer.map(String);
    const options = uniqueStrings([...normalizedAnswer, ...distractors.map(String)]);
    if (options.length < Math.max(4, normalizedAnswer.length + 1)) {
      throw new Error("Sentence drag English questions must have enough unique choices.");
    }

    normalizedAnswer.forEach((token) => {
      if (!options.includes(String(token))) {
        throw new Error("Sentence drag English answer must be present in the choices.");
      }
    });

    return shuffleArray(options);
  }

  function createEntry({
    question,
    templateParts,
    answer,
    distractors,
    difficulty,
    extraText,
    reviewText,
  }) {
    const normalizedQuestion = String(question || "").trim();
    const normalizedParts = Array.isArray(templateParts)
      ? templateParts.map((part) => String(part))
      : [];
    const normalizedAnswer = Array.isArray(answer)
      ? answer.map((token) => String(token))
      : [];
    const normalizedDistractors = Array.isArray(distractors)
      ? distractors.map((token) => String(token))
      : [];

    if (!normalizedQuestion) {
      throw new Error("Sentence drag English questions must have a question.");
    }

    if (normalizedParts.length !== normalizedAnswer.length + 1) {
      throw new Error("Sentence drag English questions must have one more template part than answer tokens.");
    }

    const choices = makeChoices(normalizedAnswer, normalizedDistractors);

    return {
      question: normalizedQuestion,
      templateParts: normalizedParts,
      choices,
      answer: normalizedAnswer,
      difficulty: clampDifficulty(difficulty),
      extraText: typeof extraText === "string" ? extraText : "",
      reviewText: String(reviewText || buildFilledSentence(normalizedParts, normalizedAnswer)),
      isHebrew: false,
    };
  }

  function entry(difficulty, question, templateParts, answer, distractors, extraText = "") {
    return createEntry({ question, templateParts, answer, distractors, difficulty, extraText });
  }

  const STATIC_BLUEPRINTS = [
    // Level 1: simple sentences, basic verbs, adjectives, and easy pronouns.
    [1, "Build the sentence with the best words.", ["The rabbit ", " very ", "."], ["runs", "fast"], ["run", "slow"]],
    [1, "Complete the sentence.", ["We packed ", " lunches for school."], ["our"], ["are", "their", "quiet"]],
    [1, "Choose the correct word.", ["The dog wagged ", " tail."], ["its"], ["it's", "their", "there"]],
    [1, "Complete the sentence.", ["The cat slept ", " on the sofa."], ["soundly"], ["quietly", "slowly", "carefully"]],
    [1, "Build the sentence with the best word.", ["The boy ", " the red ball."], ["kicked"], ["kicks", "kicking", "carried"]],
    [1, "Complete the sentence with the correct word.", ["The bird ", " in the tree."], ["sits"], ["sit", "sitting", "sat"]],
    [1, "Choose the best describing word.", ["The soup is too ", " to eat right now."], ["hot"], ["cold", "soft", "round"]],
    [1, "Complete the sentence.", ["I put the book ", " the desk."], ["on"], ["under", "happy", "runs"]],
    [1, "Build the sentence with the best words.", ["The baby ", " ", " in the crib."], ["slept", "quietly"], ["sleep", "loudly"]],
    [1, "Choose the correct verb.", ["The children ", " outside after lunch."], ["play"], ["plays", "playing", "played"]],

    // Level 2: homophones, subject-verb agreement, sequencing, and adverbs.
    [2, "Complete the sentence with the correct words.", ["The birds ", " in the tree while the wind ", "."], ["sang", "blew"], ["sat", "bloomed"]],
    [2, "Complete the sentence with the best words.", ["Eden put ", " books in the ", " backpack before class."], ["her", "red"], ["their", "our", "blue"]],
    [2, "Choose the correct word.", ["The children are waiting ", " by the door."], ["there"], ["their", "they're", "where"]],
    [2, "Complete the sentence with the best words.", ["The puppy ", " ", " because the floor is wet."], ["walks", "slowly"], ["runs", "quickly"]],
    [2, "Choose the word that fits best.", ["The teacher read the story ", " to the class."], ["aloud"], ["a lot", "quiet", "quickly"]],
    [2, "Complete the sentence with the correct word.", ["I have ", " pencils in my bag."], ["two"], ["to", "too", "ten"]],
    [2, "Choose the correct verb.", ["The fox ", " near the fence."], ["runs"], ["run", "running", "ran"]],
    [2, "Complete the sentence with a sequence word.", ["First wash your hands. ", " eat your snack."], ["Then"], ["Before", "Never", "Because"]],
    [2, "Choose the correct word.", ["May I have ", " more apple slices?"], ["two"], ["to", "too", "tall"]],
    [2, "Complete the sentence with the best words.", ["The class ", " the room and ", " the chairs."], ["cleaned", "stacked"], ["painted", "dropped"]],

    // Level 3: pronoun references, comparisons, compound actions, and cause words.
    [3, "Complete the sentence with the correct word.", ["Their lunchboxes are over ", "."], ["there"], ["their", "they're", "where"]],
    [3, "Build the sentence with the best names.", ["After lunch, ", " and ", " started homework."], ["Gideon", "Gabriel"], ["Noga", "Eden"]],
    [3, "Choose the word that fits best.", ["The small boat moved ", " than the big one."], ["slower"], ["faster", "quieter", "stronger"]],
    [3, "Complete the sentence with the correct word.", ["The turtle hid in ", " shell when it got scared."], ["its"], ["it's", "their", "there"]],
    [3, "Complete the sentence with the correct words.", ["First we ", " the seeds, and later we ", " them."], ["planted", "watered"], ["watched", "painted"]],
    [3, "Choose the best pronoun.", ["Noga found her notebook. ", " put it in her backpack."], ["She"], ["He", "They", "It"]],
    [3, "Complete the sentence with the best comparison word.", ["The rabbit was ", " than the turtle."], ["faster"], ["slower", "bigger", "louder"]],
    [3, "Choose the correct words.", ["We wore coats ", " the morning was cold."], ["because"], ["although", "before", "unless"]],
    [3, "Complete the sentence with the best words.", ["The campers ", " the tent and ", " inside."], ["opened", "crawled"], ["closed", "flew"]],
    [3, "Choose the correct word.", ["The puppy is happy because ", " getting a treat."], ["it's"], ["its", "their", "there"]],

    // Level 4: fair-test language, stronger verbs, conjunctions, and careful actions.
    [4, "Complete the sentence with the best words.", ["During the experiment, the class ", " the water level and ", " the result in a table."], ["measured", "recorded"], ["moved", "dropped"]],
    [4, "Complete the sentence with the best words.", ["After Eden compared the two maps, she ", " the river on one map and ", " the bridge on the other."], ["found", "circled"], ["watched", "opened"]],
    [4, "Complete the sentence with the best words.", ["Before the class began, the teacher ", " the papers to the class and ", " the directions on the board."], ["gave", "wrote"], ["moved", "read"]],
    [4, "Complete the sentence with the best words.", ["If the glass is fragile, carry it ", " and set it down ", "."], ["carefully", "gently"], ["loudly", "roughly"]],
    [4, "Choose the word that fits best.", ["The runner finished the race ", " than the other runner because she trained every day."], ["faster"], ["slower", "louder", "smaller"]],
    [4, "Complete the sentence with the best words.", ["To make the test fair, keep the cup size ", " and change only the ", "."], ["same", "water"], ["different", "color"]],
    [4, "Choose the best transition.", ["The bread was warm. ", ", the butter melted quickly."], ["Therefore"], ["However", "Before", "Unless"]],
    [4, "Complete the sentence with the best words.", ["The student ", " the paragraph, ", " the main idea, and wrote one sentence."], ["read", "found"], ["skipped", "hid"]],
    [4, "Choose the correct words.", ["Although it was raining, the team ", " practicing and ", " dry under the shelter."], ["kept", "stayed"], ["stopped", "slept"]],
    [4, "Complete the sentence with precise verbs.", ["The chef ", " the soup, then ", " a little salt."], ["tasted", "added"], ["watched", "carried"]],

    // Level 5: multi-step sentences, transitions, superlatives, and polite/precise language.
    [5, "Complete the sentence with the best words.", ["Although the puzzle looked difficult, Gabriel ", " each clue and ", " the answer step by step."], ["studied", "solved"], ["ignored", "forgot"]],
    [5, "Complete the sentence with the best words.", ["Before the concert began, the musicians ", " their instruments and ", " the sheet music on each stand."], ["tuned", "placed"], ["painted", "cleaned"]],
    [5, "Complete the sentence with the best words.", ["While Noga was reading, Gabriel ", " ", " the books and put them back on the ", "."], ["quietly", "organized", "shelf"], ["loudly", "scattered"]],
    [5, "Complete the sentence with the best words.", ["If the instructions are confusing, read them again ", " and ask for help ", "."], ["slowly", "politely"], ["carelessly", "angrily"]],
    [5, "Complete the sentence with the best words.", ["The kite flew ", " than the tree because the wind was strong."], ["higher"], ["lower", "heavier", "slower"]],
    [5, "Complete the sentence with the best words.", ["The children ", " the popcorn, ", " their seats, and waited for the movie to start."], ["shared", "took"], ["washed", "painted"]],
    [5, "Choose the best transition.", ["The first plan did not work. ", ", the group tried a safer plan."], ["Instead"], ["Finally", "Before", "Although"]],
    [5, "Complete the sentence with the best words.", ["The librarian ", " the books by topic so students could find them ", "."], ["sorted", "quickly"], ["threw", "loudly"]],
    [5, "Choose the strongest word.", ["The scientist ", " the tiny insect through a magnifying glass."], ["observed"], ["saw", "liked", "moved"]],
    [5, "Complete the sentence with the best words.", ["Because the trail was steep, the hikers ", " often and ", " water."], ["paused", "drank"], ["raced", "spilled"]],

    // Level 6: dependent clauses, commas, text evidence, and precise transitions.
    [6, "Complete the complex sentence.", ["When the timer rang, Maya ", " the tray from the oven and ", " it on the counter."], ["removed", "placed"], ["ignored", "threw"]],
    [6, "Choose the words that make the sentence clear.", ["The chart shows that more students chose soccer ", " basketball, so soccer was ", " popular."], ["than", "more"], ["then", "less"]],
    [6, "Complete the sentence with the best transition.", ["The instructions were long. ", ", Eden read each step before beginning."], ["Nevertheless"], ["Because", "Before", "Unless"]],
    [6, "Complete the sentence with evidence words.", ["The passage ", " that the soil was dry, which ", " why the plant wilted."], ["states", "explains"], ["guesses", "hides"]],
    [6, "Choose the best words.", ["After comparing the two prices, Gideon chose the option that cost ", " per pencil."], ["less"], ["fewer", "least", "many"]],
    [6, "Complete the sentence with the best words.", ["The team ", " the problem, ", " possible fixes, and selected the safest one."], ["identified", "listed"], ["ignored", "dropped"]],
    [6, "Choose the correct relative pronoun.", ["The student ", " finished early helped clean the tables."], ["who"], ["which", "where", "when"]],
    [6, "Complete the sentence with the best words.", ["Because the battery was low, the flashlight ", " dimly until Dad ", " the battery."], ["glowed", "replaced"], ["shouted", "washed"]],
    [6, "Choose the best pair of words.", ["The new route was ", " than the old route, but it was ", " because it avoided traffic."], ["longer", "faster"], ["shorter", "slower"]],
    [6, "Complete the sentence with the best academic words.", ["The table ", " the results, and the caption ", " what each column means."], ["shows", "explains"], ["forgets", "mixes"]],

    // Level 7: conditionals, relative clauses, inference, and text structure.
    [7, "Complete the conditional sentence.", ["If the class collects more data, the conclusion will be ", " and ", " reliable."], ["clearer", "more"], ["quieter", "less"]],
    [7, "Choose the best words for a cause-and-effect sentence.", ["The road flooded ", " the rain was heavy; ", ", the bus arrived late."], ["because", "therefore"], ["although", "before"]],
    [7, "Complete the sentence with the best relative clause words.", ["The notebook ", " Noga left on the desk had the homework ", "."], ["that", "inside"], ["when", "under"]],
    [7, "Complete the inference.", ["Since the lights were off and the door was locked, the shop was probably ", "."], ["closed"], ["crowded", "open", "noisy"]],
    [7, "Choose the best transition.", ["The two animals both have wings; ", ", only one of them can swim."], ["however"], ["therefore", "first", "because"]],
    [7, "Complete the sentence with the best words.", ["To summarize the passage, include the ", " idea and only the most important ", "."], ["main", "details"], ["small", "jokes"]],
    [7, "Choose the best words.", ["The coach asked the players to run ", ", listen ", ", and work together."], ["quickly", "carefully"], ["quick", "careful"]],
    [7, "Complete the sentence with precise verbs.", ["The engineer ", " the bridge design and ", " a safer support."], ["reviewed", "suggested"], ["forgot", "guessed"]],
    [7, "Choose the best evidence phrase.", ["The claim is supported by the sentence that ", " exactly what happened."], ["describes"], ["imagines", "wishes", "hides"]],
    [7, "Complete the sentence with the best transition pair.", ["First the class made a prediction; ", " they tested it; ", " they compared the results."], ["then", "finally"], ["because", "unless"]],

    // Level 8: nuance, parallel structure, advanced transitions, and sentence combining.
    [8, "Complete the sentence with parallel words.", ["A strong answer is ", ", ", ", and supported by evidence."], ["clear", "specific"], ["clearly", "guessing"]],
    [8, "Choose the best words for contrast.", ["The shortcut was faster; ", ", it was not safe after dark."], ["however"], ["therefore", "because", "finally"]],
    [8, "Complete the sentence with the best academic words.", ["The author ", " the problem in the first paragraph and ", " a solution in the last paragraph."], ["introduces", "proposes"], ["hides", "breaks"]],
    [8, "Complete the sentence with the best words.", ["Although the sample was small, the results ", " a pattern that the class could ", " further."], ["suggested", "investigate"], ["proved", "ignore"]],
    [8, "Choose the best relative pronouns.", ["The museum, ", " opened last year, has a room ", " visitors can build models."], ["which", "where"], ["who", "when"]],
    [8, "Complete the sentence with the best words.", ["The report was convincing because it ", " facts from the chart and ", " opinions from the conclusion."], ["separated", "removed"], ["mixed", "guessed"]],
    [8, "Choose the best transition phrase.", ["The first source gives one example. ", ", the second source gives data from many students."], ["In contrast"], ["At midnight", "By accident", "For dinner"]],
    [8, "Complete the sentence with precise language.", ["The graph ", " gradually at first, then ", " sharply after Friday."], ["increased", "rose"], ["fell", "slept"]],
    [8, "Choose the correct words.", ["Neither the markers nor the glue ", " in the drawer where they ", " yesterday."], ["is", "were"], ["are", "was"]],
    [8, "Complete the sentence with the best words.", ["The committee ", " several options before it ", " the most practical one."], ["evaluated", "selected"], ["dropped", "forgot"]],

    // Level 9: concise wording, mixed clauses, evidence quality, and logical connections.
    [9, "Choose the clearest words.", ["To make the sentence more concise, replace 'made a decision' with ", "."], ["decided"], ["decisioned", "made", "thoughtful"]],
    [9, "Complete the sentence with logical transitions.", ["The experiment was repeated three times; ", ", the results were more dependable."], ["therefore"], ["although", "meanwhile", "unless"]],
    [9, "Complete the sentence with the best words.", ["A reliable source should be ", ", current, and ", " by evidence."], ["accurate", "supported"], ["popular", "decorated"]],
    [9, "Choose the best words for a nuanced conclusion.", ["The data ", " that sunlight helped growth, but it does not ", " that water had no effect."], ["suggests", "prove"], ["hides", "forget"]],
    [9, "Complete the sentence with correct parallel structure.", ["The club plans to clean the park, plant flowers, and ", " signs."], ["paint"], ["painting", "painted", "paints"]],
    [9, "Choose the best transition.", ["The speaker gave a strong reason; ", ", she supported it with a clear example."], ["moreover"], ["instead", "before", "unless"]],
    [9, "Complete the sentence with the best words.", ["The editor ", " repeated words and ", " vague phrases with specific ones."], ["removed", "replaced"], ["added", "hid"]],
    [9, "Complete the sentence with the best words.", ["While the first paragraph describes the problem, the second paragraph ", " its causes and ", " possible solutions."], ["analyzes", "suggests"], ["forgets", "covers"]],
    [9, "Choose the best words for comparison.", ["Unlike the first plan, the second plan was ", " expensive and ", " efficient."], ["less", "more"], ["most", "least"]],
    [9, "Complete the sentence with precise reasoning words.", ["The conclusion was ", " because it matched the data and avoided unsupported ", "."], ["reasonable", "claims"], ["certain", "measurements"]],

    // Level 10: advanced grammar, logical precision, source synthesis, and strong academic sentences.
    [10, "Complete the sentence with the most precise words.", ["Although the evidence is limited, it ", " a reasonable hypothesis that can be ", " with more data."], ["supports", "tested"], ["proves", "ignored"]],
    [10, "Choose the best transition pair.", ["The first source explains the rule; ", ", the second source shows how the rule works in practice; ", ", both sources support the same conclusion."], ["meanwhile", "together"], ["because", "nevertheless"]],
    [10, "Complete the sentence with the clearest parallel structure.", ["A good explanation should define the term, give an example, and ", " why the example fits."], ["explain"], ["explaining", "explained", "explains"]],
    [10, "Complete the sentence with logical precision.", ["The survey shows what this group prefers, but it cannot ", " what every student in the city ", "."], ["prove", "prefers"], ["guess", "forget"]],
    [10, "Choose the most concise revision.", ["Replace 'due to the fact that' with ", " to make the sentence shorter."], ["because"], ["although", "during", "despite"]],
    [10, "Complete the sentence with the best words.", ["The author acknowledges a counterargument, then ", " it by giving stronger ", "."], ["answers", "evidence"], ["avoids", "questions"]],
    [10, "Choose the best words.", ["The sentence is ambiguous, so the writer should ", " the pronoun with the exact ", "."], ["replace", "noun"], ["decorate", "verb"]],
    [10, "Complete the sentence with the best academic words.", ["The pattern is ", " with the hypothesis, but additional trials are needed before making a ", " conclusion."], ["consistent", "final"], ["confused", "careless"]],
    [10, "Choose the best contrast words.", ["The new design costs more at first; ", ", it saves energy over time and may cost less overall."], ["nevertheless"], ["therefore", "first", "because"]],
    [10, "Complete the sentence with precise source language.", ["When two sources disagree, compare their ", ", dates, and ", " before deciding which is stronger."], ["evidence", "purpose"], ["colors", "rhymes"]],
  ];

  const ACTION_SUBJECTS = ["The runner", "The puppy", "The skater", "The child", "The fox", "The robot", "The cyclist"];
  const ACTION_VERBS = ["ran", "jumped", "hurried", "glided", "moved", "rolled", "climbed"];
  const ACTION_ADVERBS = ["quickly", "carefully", "silently", "smoothly", "easily", "steadily", "bravely"];

  const POSSESSIVE_SUBJECTS = ["The students", "The family", "The children", "The players", "The cousins"];
  const POSSESSIVE_NOUNS = ["backpacks", "shoes", "books", "lunches", "jackets"];
  const POSSESSIVE_PRONOUNS = ["their", "our", "his", "her"];

  const BASIC_ADJECTIVE_ITEMS = [
    { sentenceParts: ["The ice cream felt ", " in the bowl."], answer: ["cold"], distractors: ["warm", "round", "loud"] },
    { sentenceParts: ["The kitten was ", " after playing all morning."], answer: ["sleepy"], distractors: ["square", "salty", "early"] },
    { sentenceParts: ["The classroom looked ", " after the students cleaned it."], answer: ["neat"], distractors: ["noisy", "stormy", "hungry"] },
  ];

  const HOMOPHONE_ITEMS = [
    { sentenceParts: ["The keys are over ", " on the shelf."], answer: ["there"], distractors: ["their", "they're", "where"] },
    { sentenceParts: ["The puppy wagged ", " tail."], answer: ["its"], distractors: ["it's", "their", "there"] },
    { sentenceParts: ["We want ", " more cookies."], answer: ["two"], distractors: ["to", "too", "tall"] },
    { sentenceParts: ["I am going ", " the library."], answer: ["to"], distractors: ["too", "two", "tow"] },
    { sentenceParts: ["The bag is ", " heavy to carry alone."], answer: ["too"], distractors: ["to", "two", "ten"] },
    { sentenceParts: ["Please write ", " name at the top of the page."], answer: ["your"], distractors: ["you're", "you", "yours"] },
    { sentenceParts: ["I hope ", " ready for the spelling quiz."], answer: ["you're"], distractors: ["your", "you", "yours"] },
  ];

  const AGREEMENT_SUBJECTS = [
    { subject: "The fox", verb: "runs", distractors: ["run", "running", "ran"] },
    { subject: "The bird", verb: "sings", distractors: ["sing", "singing", "sang"] },
    { subject: "The puppy", verb: "plays", distractors: ["play", "playing", "played"] },
    { subject: "The rabbit", verb: "hops", distractors: ["hop", "hopping", "hopped"] },
    { subject: "The children", verb: "play", distractors: ["plays", "playing", "played"] },
    { subject: "The birds", verb: "fly", distractors: ["flies", "flying", "flew"] },
    { subject: "The dogs", verb: "run", distractors: ["runs", "running", "ran"] },
    { subject: "The boxes", verb: "sit", distractors: ["sits", "sitting", "sat"] },
  ];

  const REFERENCE_ITEMS = [
    { sentenceParts: ["Eden saw Gabriel drop his pencil. ", " picked it up."], answer: ["She"], distractors: ["He", "They", "It"] },
    { sentenceParts: ["The boys were tired after practice. ", " sat on the bench."], answer: ["They"], distractors: ["She", "He", "It"] },
    { sentenceParts: ["Noga found her notebook. ", " put it in her backpack."], answer: ["She"], distractors: ["He", "They", "It"] },
    { sentenceParts: ["The robot lost power, so ", " stopped moving."], answer: ["it"], distractors: ["they", "she", "he"] },
    { sentenceParts: ["Avi and Maya finished the model, and ", " tested it outside."], answer: ["they"], distractors: ["he", "she", "it"] },
  ];

  const SEQUENCE_WORDS = [
    { sentenceParts: ["We checked the map. ", " we started walking."], answer: ["Then"], distractors: ["Before", "Soon", "While"] },
    { sentenceParts: ["First we washed our hands. ", " we ate lunch."], answer: ["Then"], distractors: ["Before", "Never", "Instead"] },
    { sentenceParts: ["The dog barked, and ", " it ran to the gate."], answer: ["then"], distractors: ["because", "but", "also"] },
    { sentenceParts: ["Add the flour first. ", ", stir in the milk."], answer: ["Next"], distractors: ["Because", "Unless", "Although"] },
    { sentenceParts: ["After we finished the poster, we ", " it on the wall."], answer: ["hung"], distractors: ["hanged", "hang", "hanging"] },
  ];

  const COMPARISON_ITEMS = [
    { sentenceParts: ["The red kite flew ", " than the blue one."], answer: ["higher"], distractors: ["lower", "heavier", "slower"] },
    { sentenceParts: ["The rabbit was ", " than the turtle."], answer: ["faster"], distractors: ["slower", "bigger", "louder"] },
    { sentenceParts: ["The river is ", " than the road."], answer: ["wider"], distractors: ["narrower", "shorter", "quieter"] },
    { sentenceParts: ["Of the three backpacks, Eden's was the ", "."], answer: ["lightest"], distractors: ["lighter", "light", "slowest"] },
    { sentenceParts: ["This puzzle is ", " challenging than the last one."], answer: ["more"], distractors: ["most", "many", "much"] },
  ];

  const REASONING_ITEMS = [
    { sentenceParts: ["Because the floor was wet, Gideon ", " carefully and held the rail ", "."], answer: ["walked", "tightly"], distractors: ["ran", "softly"] },
    { sentenceParts: ["If the instructions are confusing, read them again ", " and ask for help ", "."], answer: ["slowly", "politely"], distractors: ["carelessly", "angrily"] },
    { sentenceParts: ["The children ", " the popcorn, ", " their seats, and waited for the movie to start."], answer: ["shared", "found"], distractors: ["washed", "painted"] },
    { sentenceParts: ["Since the plant looked dry, Mia ", " the soil and ", " a little water."], answer: ["checked", "added"], distractors: ["ignored", "spilled"] },
    { sentenceParts: ["The chart showed fewer votes for tennis, so the class ", " soccer for the game."], answer: ["chose"], distractors: ["choose", "chosen", "choosing"] },
  ];

  const THREE_BLANK_ITEMS = [
    { sentenceParts: ["When the bell rang, the students ", " their papers, ", " their bags, and ", " the room."], answer: ["gathered", "packed", "left"], distractors: ["opened", "floated"] },
    { sentenceParts: ["Before the show began, the actors ", " on their costumes, ", " the stage, and ", " for their cues."], answer: ["put", "checked", "waited"], distractors: ["painted", "slept"] },
    { sentenceParts: ["To solve the problem, Dana ", " the question, ", " the numbers, and ", " her answer."], answer: ["read", "organized", "checked"], distractors: ["forgot", "hid"] },
  ];

  const TRANSITION_ITEMS = [
    { min: 5, max: 8, sentenceParts: ["The first idea failed. ", ", the team tried a new plan."], answer: ["Therefore"], distractors: ["Although", "Before", "Unless"] },
    { min: 5, max: 9, sentenceParts: ["The two stories have similar settings. ", ", their endings are very different."], answer: ["However"], distractors: ["Because", "Finally", "For example"] },
    { min: 6, max: 10, sentenceParts: ["The claim is strong because it includes evidence. ", ", it explains why the evidence matters."], answer: ["Moreover"], distractors: ["Unless", "Before", "Instead"] },
    { min: 7, max: 10, sentenceParts: ["The sample was small; ", ", the result should be checked again."], answer: ["therefore"], distractors: ["although", "meanwhile", "before"] },
  ];

  const EVIDENCE_ITEMS = [
    { min: 6, max: 10, sentenceParts: ["The passage ", " that the soil was dry, which ", " the plant's wilted leaves."], answer: ["states", "explains"], distractors: ["guesses", "hides"] },
    { min: 6, max: 10, sentenceParts: ["The table ", " the exact numbers, so it is stronger than a ", "."], answer: ["shows", "guess"], distractors: ["imagines", "wish"] },
    { min: 7, max: 10, sentenceParts: ["A conclusion is stronger when it ", " the data and avoids unsupported ", "."], answer: ["matches", "claims"], distractors: ["ignores", "decorations"] },
    { min: 8, max: 10, sentenceParts: ["The author uses the example to ", " the main idea, not to ", " a new topic."], answer: ["support", "introduce"], distractors: ["erase", "forget"] },
  ];

  const CLAUSE_ITEMS = [
    { min: 6, max: 8, sentenceParts: ["The student ", " helped clean the table was thanked by the teacher."], answer: ["who"], distractors: ["which", "where", "when"] },
    { min: 7, max: 10, sentenceParts: ["The notebook ", " was on the desk belonged to Gabriel."], answer: ["that"], distractors: ["who", "where", "when"] },
    { min: 8, max: 10, sentenceParts: ["The library, ", " opened last month, has a room ", " children can build robots."], answer: ["which", "where"], distractors: ["who", "when"] },
    { min: 8, max: 10, sentenceParts: ["The scientist repeated the test ", " the first result seemed unusual."], answer: ["because"], distractors: ["unless", "while", "before"] },
  ];

  const CONCISION_ITEMS = [
    { min: 8, max: 10, sentenceParts: ["A concise way to say 'made a choice' is ", "."], answer: ["chose"], distractors: ["choice", "choosing", "chosen"] },
    { min: 9, max: 10, sentenceParts: ["A concise replacement for 'due to the fact that' is ", "."], answer: ["because"], distractors: ["although", "during", "despite"] },
    { min: 9, max: 10, sentenceParts: ["A clearer sentence uses a specific ", " instead of a confusing ", "."], answer: ["noun", "pronoun"], distractors: ["color", "rhyme"] },
    { min: 9, max: 10, sentenceParts: ["Replace 'was able to finish' with ", " for a shorter sentence."], answer: ["finished"], distractors: ["finish", "finishing", "finishes"] },
  ];

  const PARALLEL_ITEMS = [
    { min: 7, max: 10, sentenceParts: ["The class plans to read, write, and ", " during the project."], answer: ["present"], distractors: ["presenting", "presented", "presents"] },
    { min: 8, max: 10, sentenceParts: ["A strong paragraph is ", ", ", ", and complete."], answer: ["clear", "organized"], distractors: ["clearly", "organizing"] },
    { min: 9, max: 10, sentenceParts: ["The club will clean the park, plant flowers, and ", " signs."], answer: ["paint"], distractors: ["painting", "painted", "paints"] },
    { min: 10, max: 10, sentenceParts: ["A good answer should define the term, give an example, and ", " the reasoning."], answer: ["explain"], distractors: ["explaining", "explained", "explains"] },
  ];

  const SYNTHESIS_ITEMS = [
    { min: 9, max: 10, sentenceParts: ["The first source gives the rule, while the second source ", " an example that ", " it."], answer: ["provides", "supports"], distractors: ["hides", "contradicts"] },
    { min: 10, max: 10, sentenceParts: ["When sources disagree, compare their ", ", dates, and ", "."], answer: ["evidence", "purpose"], distractors: ["colors", "fonts"] },
    { min: 10, max: 10, sentenceParts: ["Both sources support the claim, but the newer source gives ", " detailed ", "."], answer: ["more", "data"], distractors: ["less", "riddles"] },
  ];

  function chooseByLevel(items, difficulty) {
    const level = clampDifficulty(difficulty);
    const available = items.filter((item) => level >= (item.min || 1) && level <= (item.max || 10));
    return pick(available.length ? available : items);
  }

  function createVerbAdverbEntry(difficulty) {
    const subject = pick(ACTION_SUBJECTS);
    const verb = pick(ACTION_VERBS);
    const adverb = pick(ACTION_ADVERBS);
    return createEntry({
      question: "Complete the sentence with the best words.",
      templateParts: [`${subject} `, " ", " to the finish line."],
      answer: [verb, adverb],
      distractors: [
        pick(ACTION_VERBS.filter((item) => item !== verb)),
        pick(ACTION_ADVERBS.filter((item) => item !== adverb)),
      ],
      difficulty,
    });
  }

  function createPossessiveEntry(difficulty) {
    const noun = pick(POSSESSIVE_NOUNS);
    const pronoun = pick(POSSESSIVE_PRONOUNS);
    const subject = pick(POSSESSIVE_SUBJECTS);
    return createEntry({
      question: "Complete the sentence with the correct words.",
      templateParts: [`${subject} put `, " ", ` by the door.`],
      answer: [pronoun, noun],
      distractors: [
        pick(POSSESSIVE_PRONOUNS.filter((item) => item !== pronoun)),
        pick(["school", "table", "window", "bench"]),
      ],
      difficulty,
    });
  }

  function createBasicAdjectiveEntry(difficulty) {
    const item = pick(BASIC_ADJECTIVE_ITEMS);
    return createEntry({
      question: "Choose the best describing word.",
      templateParts: item.sentenceParts,
      answer: item.answer,
      distractors: item.distractors,
      difficulty,
    });
  }

  function createHomophoneEntry(difficulty) {
    const item = pick(HOMOPHONE_ITEMS);
    return createEntry({
      question: "Choose the correct word.",
      templateParts: item.sentenceParts,
      answer: item.answer,
      distractors: item.distractors,
      difficulty,
    });
  }

  function createAgreementEntry(difficulty) {
    const item = pick(AGREEMENT_SUBJECTS);
    return createEntry({
      question: "Complete the sentence with the correct verb.",
      templateParts: [item.subject, " near the window."],
      answer: [item.verb],
      distractors: item.distractors,
      difficulty,
    });
  }

  function createPronounReferenceEntry(difficulty) {
    const item = pick(REFERENCE_ITEMS);
    return createEntry({
      question: "Choose the word that makes the sentence correct.",
      templateParts: item.sentenceParts,
      answer: item.answer,
      distractors: item.distractors,
      difficulty,
    });
  }

  function createSequenceEntry(difficulty) {
    const item = pick(SEQUENCE_WORDS);
    return createEntry({
      question: "Complete the sentence with the correct sequencing word.",
      templateParts: item.sentenceParts,
      answer: item.answer,
      distractors: item.distractors,
      difficulty,
    });
  }

  function createComparisonEntry(difficulty) {
    const item = pick(COMPARISON_ITEMS);
    return createEntry({
      question: "Complete the sentence with the best comparison word.",
      templateParts: item.sentenceParts,
      answer: item.answer,
      distractors: item.distractors,
      difficulty,
    });
  }

  function createReasoningEntry(difficulty) {
    const item = pick(REASONING_ITEMS);
    return createEntry({
      question: "Complete the sentence with the best words.",
      templateParts: item.sentenceParts,
      answer: item.answer,
      distractors: item.distractors,
      difficulty,
    });
  }

  function createThreeBlankEntry(difficulty) {
    const item = pick(THREE_BLANK_ITEMS);
    return createEntry({
      question: "Build the sentence with the best words.",
      templateParts: item.sentenceParts,
      answer: item.answer,
      distractors: item.distractors,
      difficulty,
    });
  }

  function createTransitionEntry(difficulty) {
    const item = chooseByLevel(TRANSITION_ITEMS, difficulty);
    return createEntry({
      question: "Complete the sentence with the best transition.",
      templateParts: item.sentenceParts,
      answer: item.answer,
      distractors: item.distractors,
      difficulty,
    });
  }

  function createEvidenceEntry(difficulty) {
    const item = chooseByLevel(EVIDENCE_ITEMS, difficulty);
    return createEntry({
      question: "Complete the sentence with the best evidence words.",
      templateParts: item.sentenceParts,
      answer: item.answer,
      distractors: item.distractors,
      difficulty,
    });
  }

  function createClauseEntry(difficulty) {
    const item = chooseByLevel(CLAUSE_ITEMS, difficulty);
    return createEntry({
      question: "Complete the sentence with the best clause word.",
      templateParts: item.sentenceParts,
      answer: item.answer,
      distractors: item.distractors,
      difficulty,
    });
  }

  function createConcisionEntry(difficulty) {
    const item = chooseByLevel(CONCISION_ITEMS, difficulty);
    return createEntry({
      question: "Choose the clearest and most concise word.",
      templateParts: item.sentenceParts,
      answer: item.answer,
      distractors: item.distractors,
      difficulty,
    });
  }

  function createParallelEntry(difficulty) {
    const item = chooseByLevel(PARALLEL_ITEMS, difficulty);
    return createEntry({
      question: "Complete the sentence with parallel structure.",
      templateParts: item.sentenceParts,
      answer: item.answer,
      distractors: item.distractors,
      difficulty,
    });
  }

  function createSynthesisEntry(difficulty) {
    const item = chooseByLevel(SYNTHESIS_ITEMS, difficulty);
    return createEntry({
      question: "Complete the sentence with the best source-comparison words.",
      templateParts: item.sentenceParts,
      answer: item.answer,
      distractors: item.distractors,
      difficulty,
    });
  }

  function createGeneratedEntry(difficulty) {
    const level = clampDifficulty(difficulty);
    const generatorMap = {
      1: [createVerbAdverbEntry, createPossessiveEntry, createBasicAdjectiveEntry, createAgreementEntry],
      2: [createHomophoneEntry, createAgreementEntry, createSequenceEntry, createVerbAdverbEntry],
      3: [createPronounReferenceEntry, createComparisonEntry, createHomophoneEntry, createSequenceEntry],
      4: [createReasoningEntry, createComparisonEntry, createSequenceEntry, createTransitionEntry],
      5: [createThreeBlankEntry, createReasoningEntry, createComparisonEntry, createTransitionEntry],
      6: [createTransitionEntry, createEvidenceEntry, createClauseEntry, createReasoningEntry],
      7: [createClauseEntry, createEvidenceEntry, createTransitionEntry, createParallelEntry],
      8: [createParallelEntry, createClauseEntry, createEvidenceEntry, createConcisionEntry],
      9: [createConcisionEntry, createParallelEntry, createEvidenceEntry, createSynthesisEntry],
      10: [createSynthesisEntry, createConcisionEntry, createParallelEntry, createEvidenceEntry],
    };

    return pick(generatorMap[level] || generatorMap[3])(level);
  }

  const bank = STATIC_BLUEPRINTS.map(([difficulty, question, templateParts, answer, distractors, extraText]) =>
    entry(difficulty, question, templateParts, answer, distractors, extraText)
  ).map((questionEntry) => ({
    question: questionEntry.question,
    templateParts: [...questionEntry.templateParts],
    choices: [...questionEntry.choices],
    answer: [...questionEntry.answer],
    difficulty: questionEntry.difficulty,
    extraText: questionEntry.extraText,
    reviewText: questionEntry.reviewText,
    isHebrew: false,
  }));

  return {
    bank,
    createGeneratedEntry,
  };
})();

globalThis.SENTENCE_DRAG_ENGLISH_DATA = SENTENCE_DRAG_ENGLISH_DATA;

function createEnglishSentenceDragGeneratedEntry(difficulty) {
  return SENTENCE_DRAG_ENGLISH_DATA.createGeneratedEntry(difficulty);
}

globalThis.createEnglishSentenceDragGeneratedEntry = createEnglishSentenceDragGeneratedEntry;

// Backward-compatible alias for older code that used this name.
function createSentenceDragEnglishGeneratedEntry(difficulty) {
  return createEnglishSentenceDragGeneratedEntry(difficulty);
}

globalThis.createSentenceDragEnglishGeneratedEntry = createSentenceDragEnglishGeneratedEntry;
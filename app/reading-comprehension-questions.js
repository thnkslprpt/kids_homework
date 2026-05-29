const READING_COMPREHENSION_BLUEPRINTS = [
  // Level 1: main idea, simple inference, pronoun reference, and easy context clues.
  readingBlueprint(1, "What is the main idea of the passage?", ["Gabriel watered his bean plant every day.", "He put it near a sunny window, and the plant grew taller each week."], ["Plants grow better when they get care and sunlight.", "Bean plants do not need water.", "Windows are only useful for decoration.", "Plants always stay the same size."], "Plants grow better when they get care and sunlight."),
  readingBlueprint(1, "What can you tell about Eden from the passage?", ["Eden packed an umbrella, a raincoat, and boots before leaving the house.", "Dark clouds covered the sky."], ["She expected rainy weather.", "She was going swimming.", "She forgot to check the weather.", "She was going to the beach for sunshine."], "She expected rainy weather."),
  readingBlueprint(1, "In the passage, what does the word 'it' refer to?", ["The turtle was moving slowly across the path.", "Ben picked it up and carried it to the grass."], ["The path", "The grass", "The turtle", "Ben"], "The turtle"),
  readingBlueprint(1, "What does 'soaked' most likely mean in the passage?", ["The puppy was soaked after splashing in puddles.", "Dad dried it with a towel."], ["Very wet", "Very sleepy", "Very noisy", "Very clean"], "Very wet"),
  readingBlueprint(1, "What is the main idea of the passage?", ["Noga borrowed a library book about whales.", "She read it each night and shared new facts with her brother."], ["Noga enjoyed learning about whales.", "Noga wanted to swim across the ocean.", "Noga was hiding a book from the library.", "Noga forgot how to read."], "Noga enjoyed learning about whales."),
  readingBlueprint(1, "In the passage, what does the word 'They' refer to?", ["The chicks chirped when the farmer filled their bowl.", "They pecked at the grain right away."], ["The bowl", "The chicks", "The farmer", "The grain"], "The chicks"),

  // Level 2: sequence, titles, context clues, and supported inferences.
  readingBlueprint(2, "What does 'careful' most likely mean in the passage?", ["Talia was careful while carrying the glass of water.", "She held it with both hands so it would not spill."], ["Slow and safe", "Very loud", "Confused", "Hungry"], "Slow and safe"),
  readingBlueprint(2, "How is this passage organized?", ["First, Leo mixed the batter.", "Next, he poured it into a pan.", "Finally, he flipped the pancake."], ["Steps in order", "Compare and contrast", "A problem and a solution", "A list of facts only"], "Steps in order"),
  readingBlueprint(2, "What is the main idea of the passage?", ["The class set up a bird feeder near the window.", "Each morning, the children checked which birds came to eat.", "They wrote down the names of the birds they saw."], ["The class observed birds at a feeder.", "The children wanted to move the window.", "Birds only come out at night.", "The class was painting a wall."], "The class observed birds at a feeder."),
  readingBlueprint(2, "Why did Gabriel probably bring a flashlight?", ["Gabriel and his sister were walking back from the garden after sunset.", "The path was dark near the gate."], ["To see in the dark", "To make the garden brighter all day", "To water the plants", "To count the birds"], "To see in the dark"),
  readingBlueprint(2, "What does 'grumbled' most likely mean in the passage?", ["Rafi's stomach grumbled during math class.", "He hurried to eat his sandwich at lunch."], ["Made hungry noises", "Sang a song", "Fell asleep", "Got bigger"], "Made hungry noises"),
  readingBlueprint(2, "What is the best title for the passage?", ["Teva folded the flyer and tucked it into her backpack.", "On the bus ride home, she practiced her lines for the class play."], ["Getting Ready for the School Play", "Planting a Vegetable Garden", "Looking for a Lost Puppy", "Riding a Roller Coaster"], "Getting Ready for the School Play"),

  // Level 3: stronger inference, compare/contrast, title choice, and author's message.
  readingBlueprint(3, "What is the meaning of 'swift' in the passage?", ["The swift rabbit dashed across the field.", "It moved so fast that the dog could not catch it."], ["Fast", "Tiny", "Silent", "Sleepy"], "Fast"),
  readingBlueprint(3, "What is the main idea of the passage?", ["The school garden had tomatoes, carrots, and lettuce.", "Students watered the plants, pulled weeds, and picked ripe vegetables.", "Later, they used some of the vegetables in the cafeteria salad."], ["Students helped take care of a school garden.", "The cafeteria only served salad.", "Tomatoes grow in the winter only.", "Gardens do not need water."], "Students helped take care of a school garden."),
  readingBlueprint(3, "What does the author mostly want you to understand?", ["At first, Priya felt nervous about the swim race.", "After a few practice laps, she felt calm and ready."], ["Practice can help make someone feel more ready.", "Swim races are always easy.", "Nervous people should never try new things.", "Calm people do not practice."], "Practice can help make someone feel more ready."),
  readingBlueprint(3, "What can you infer from the passage?", ["The picnic blanket stayed in the car while gray clouds rolled in.", "The family decided to go home before the rain started."], ["The family thought it would rain soon.", "The family wanted to stay outside longer.", "The picnic was in the middle of a desert.", "The blanket was too small to use."], "The family thought it would rain soon."),
  readingBlueprint(3, "How is this passage organized?", ["Both bats and birds have wings.", "Birds have feathers, but bats have thin skin stretched across their wings."], ["Compare and contrast", "Steps in order", "Problem and solution", "A question and answer"], "Compare and contrast"),
  readingBlueprint(3, "What is the best title for the passage?", ["Each week, Eden dropped part of her allowance into a jar.", "After two months, she had enough money to buy the art set she wanted."], ["Saving for an Art Set", "Borrowing Money from a Friend", "Losing a Favorite Toy", "Painting a Giant Mural"], "Saving for an Art Set"),

  // Level 4: author purpose, problem/solution, compare/contrast, and less obvious vocabulary.
  readingBlueprint(4, "How is this passage organized?", ["The penguin and the seal both live near cold water.", "The penguin has feathers, while the seal has fur and flippers."], ["Compare and contrast", "Steps in order", "A question and answer", "A poem"], "Compare and contrast"),
  readingBlueprint(4, "What is the best title for the passage?", ["Ana checked the recipe, measured the flour, and mixed the dough.", "She waited while the dough rose, then baked the bread in the oven."], ["Baking Bread", "How to Build a Treehouse", "A Trip to the Zoo", "A Rainy Day Walk"], "Baking Bread"),
  readingBlueprint(4, "What does the word 'fragile' mean in the passage?", ["The ornament was fragile, so Teva wrapped it in soft paper before putting it in the box."], ["Easy to break", "Very heavy", "Very dirty", "Hard to carry"], "Easy to break"),
  readingBlueprint(4, "What is the author's purpose for this passage?", ["To stay safe on a bike trail, wear a helmet, keep to the right, and use hand signals before turning."], ["To explain how to stay safe while biking", "To tell a funny story about a bike ride", "To describe a dream about flying", "To compare two kinds of helmets"], "To explain how to stay safe while biking"),
  readingBlueprint(4, "What can you infer from the passage?", ["Jules read the recipe twice, lined up each ingredient, and set a timer as soon as the muffins went into the oven."], ["Jules wanted the muffins to turn out well.", "Jules was looking for a way to avoid baking.", "Jules had never seen a kitchen before.", "Jules planned to leave the house immediately."], "Jules wanted the muffins to turn out well."),
  readingBlueprint(4, "How is this passage organized?", ["The tomato plant drooped in the heat.", "After Eden watered it and moved it into partial shade, the leaves lifted again."], ["Problem and solution", "Compare and contrast", "Steps in order", "A list of facts only"], "Problem and solution"),

  // Level 5: longer passages, author's message, inference, and evidence.
  readingBlueprint(5, "What is the author's purpose for this passage?", ["If you want to help a bird feeder stay clean, take away old seeds, wash the tray, and refill it with fresh seed."], ["To explain how to do something", "To tell a joke", "To describe a dream", "To argue about a sports game"], "To explain how to do something"),
  readingBlueprint(5, "What is the best inference from the passage?", ["After the long hike, Omar drank his water bottle quickly and sat down in the shade."], ["He was probably tired and thirsty.", "He wanted to go swimming.", "He was angry at the bottle.", "He had just finished a nap."], "He was probably tired and thirsty."),
  readingBlueprint(5, "What is the best title for the passage?", ["Volunteers filled trash bags along the river path and planted flowers near the benches.", "By noon, the park looked cleaner and brighter."], ["Cleaning Up the River Park", "Building a New Shopping Mall", "Learning to Paddle a Canoe", "Camping in the Mountains"], "Cleaning Up the River Park"),
  readingBlueprint(5, "What does 'hesitated' most likely mean in the passage?", ["Imani hesitated at the top of the high diving board and looked down for a long time before climbing back to the ladder."], ["Paused because she was unsure", "Ran forward without thinking", "Cheered for the crowd", "Finished the race early"], "Paused because she was unsure"),
  readingBlueprint(5, "How is this passage organized?", ["The hallway grew noisy during group work.", "Ms. Chen rang a chime, and the class lowered their voices so everyone could hear."], ["Problem and solution", "Compare and contrast", "Steps in order", "A set of questions"], "Problem and solution"),
  readingBlueprint(5, "Which sentence best supports the idea that Lina was prepared?", ["Lina checked the bus schedule before leaving.", "She packed her water bottle, homework folder, and a snack the night before the field trip."], ["She packed her water bottle, homework folder, and a snack the night before the field trip.", "Lina checked the bus schedule before leaving.", "The field trip happened on a bus.", "A snack can fit in a backpack."], "She packed her water bottle, homework folder, and a snack the night before the field trip."),

  // Level 6: summaries, cause/effect, theme, and choosing the best evidence.
  readingBlueprint(6, "Which summary is best?", ["Maya wanted to enter the school art contest, but her first sketch looked crowded.", "She erased a few details, moved the moon higher, and added darker shadows.", "Her final drawing showed a quiet street at night and won second place."], ["Maya improved her drawing and did well in an art contest.", "Maya erased every drawing she ever made.", "The school only gave prizes for pictures of the moon.", "A crowded sketch always wins second place."], "Maya improved her drawing and did well in an art contest."),
  readingBlueprint(6, "What caused the class to change its plan?", ["The class planned to read outside under the trees.", "When strong wind began blowing pages across the playground, the teacher moved reading time into the library."], ["Strong wind blew pages around.", "The library had no books.", "The playground was too sunny.", "The class forgot how to read."], "Strong wind blew pages around."),
  readingBlueprint(6, "Which sentence best shows that Amir was patient?", ["Amir planted sunflower seeds in a cup.", "For ten days, he watered the soil even though he saw nothing green.", "On the eleventh day, a tiny sprout appeared."], ["For ten days, he watered the soil even though he saw nothing green.", "Amir planted sunflower seeds in a cup.", "On the eleventh day, a tiny sprout appeared.", "Sunflowers can grow from seeds."], "For ten days, he watered the soil even though he saw nothing green."),
  readingBlueprint(6, "What is the theme of the passage?", ["Rina wanted to solve the puzzle alone, but the last pieces did not fit.", "When her brother suggested turning the border pieces first, the picture came together quickly."], ["Listening to helpful ideas can make a task easier.", "Puzzle pieces should never be shared.", "Brothers always know every answer.", "The edge pieces are the only important pieces."], "Listening to helpful ideas can make a task easier."),
  readingBlueprint(6, "What does the word 'sturdy' most likely mean?", ["The bridge made from thin paper bent right away.", "The bridge made from folded cardboard was sturdy enough to hold twelve coins."], ["Strong", "Colorful", "New", "Tiny"], "Strong"),
  readingBlueprint(6, "How are the two students alike?", ["Noam practiced spelling words by saying them aloud.", "Ella practiced spelling words by writing each one three times.", "Both students checked their mistakes before the quiz."], ["Both tried to prepare for the quiz.", "Both used the same study method.", "Both forgot to check their work.", "Both studied only after the quiz."], "Both tried to prepare for the quiz."),

  // Level 7: point of view, figurative language, multi-sentence evidence, and theme.
  readingBlueprint(7, "Which sentence best shows the narrator's point of view?", ["I used to think chess was too slow.", "After Grandpa taught me how each move sets up the next one, I started seeing the board like a mystery to solve."], ["The narrator changed from bored to interested in chess.", "The narrator thinks chess pieces are too heavy.", "Grandpa dislikes teaching games.", "Mysteries are always solved on chessboards."], "The narrator changed from bored to interested in chess."),
  readingBlueprint(7, "What does the phrase 'her ideas finally bloomed' mean?", ["Mira stared at the blank poster for a long time.", "After she looked through her notes, her ideas finally bloomed and she began drawing."], ["She began having useful ideas.", "Flowers grew on her poster.", "She forgot her notes.", "Her drawing became too heavy."], "She began having useful ideas."),
  readingBlueprint(7, "Which choice best explains the conflict?", ["Jonah wanted to keep the stray kitten, but his apartment building did not allow pets.", "He made a warm box for the kitten while his family called an animal rescue group."], ["Jonah wanted to help the kitten but could not keep it at home.", "The kitten wanted to learn how to use a phone.", "Jonah's family disliked warm boxes.", "The apartment building was too far from school."], "Jonah wanted to help the kitten but could not keep it at home."),
  readingBlueprint(7, "What is the theme of the passage?", ["Gideon was sure his tower design was best, so he ignored Noga's warning about the narrow base.", "When the tower tipped, he rebuilt it with a wider bottom and thanked her for the suggestion."], ["Good ideas can come from other people.", "Tall towers should always be made alone.", "Warnings are never useful.", "A narrow base is always strongest."], "Good ideas can come from other people."),
  readingBlueprint(7, "Which detail best supports the idea that the room was crowded?", ["By the time the science fair opened, every table had a project board.", "Parents stood shoulder to shoulder, and students had to turn sideways to pass between displays."], ["Students had to turn sideways to pass between displays.", "The science fair opened.", "Every table had a project board.", "Parents came to the fair."], "Students had to turn sideways to pass between displays."),
  readingBlueprint(7, "How do the two paragraphs connect?", ["Paragraph 1: The school play needed more props, but the budget was small.", "Paragraph 2: Students brought cardboard boxes from home and painted them to look like castle walls."], ["The second paragraph gives a solution to the first paragraph's problem.", "The second paragraph argues against having a play.", "The first paragraph explains how to paint cardboard.", "Both paragraphs list unrelated facts about castles."], "The second paragraph gives a solution to the first paragraph's problem."),

  // Level 8: tone, central idea across paragraphs, argument evidence, and synthesis.
  readingBlueprint(8, "What is the tone of the passage?", ["The first rocket design flopped onto the grass after two seconds.", "Instead of quitting, the team laughed, checked the fins, and said, 'Now we know what to fix.'"], ["Hopeful and determined", "Angry and hopeless", "Sleepy and bored", "Fearful and secretive"], "Hopeful and determined"),
  readingBlueprint(8, "Which claim is best supported by the passage?", ["Students who used the new study checklist turned in more complete homework for three weeks in a row.", "Teachers also reported fewer missing names and skipped questions."], ["The checklist helped students complete homework more carefully.", "The checklist made homework disappear.", "Students stopped needing teachers.", "The checklist only helped during art class."], "The checklist helped students complete homework more carefully."),
  readingBlueprint(8, "What is the central idea of both paragraphs?", ["Paragraph 1: Bees move pollen as they visit flowers for nectar.", "Paragraph 2: Some farmers plant wildflowers near crops to give bees more places to feed."], ["Bees and flowers can help each other and support crops.", "Farmers should remove all wildflowers.", "Nectar stops bees from flying.", "Flowers only grow near farms."], "Bees and flowers can help each other and support crops."),
  readingBlueprint(8, "Which detail shows that the narrator is unsure?", ["I held the sign-up sheet in my hand for a full minute.", "My name would fit on the last line, but I kept tapping the pencil instead of writing."], ["I kept tapping the pencil instead of writing.", "The sign-up sheet had a last line.", "My name would fit.", "I held a sheet of paper."], "I kept tapping the pencil instead of writing."),
  readingBlueprint(8, "Which statement best compares the two viewpoints?", ["Sam thinks the class should choose a familiar song because everyone can learn it quickly.", "Nora thinks the class should try a harder song because it will be more exciting for the concert."], ["Sam values an easier choice, while Nora values a bigger challenge.", "Sam and Nora both want to cancel the concert.", "Sam wants a harder song than Nora does.", "Nora thinks familiar songs are always best."], "Sam values an easier choice, while Nora values a bigger challenge."),
  readingBlueprint(8, "Which summary avoids extra details and opinions?", ["The robotics club tested three wheel sizes on the same ramp.", "The medium wheels reached the finish line most often, so the club chose them for the contest robot."], ["The club tested wheel sizes and chose the most reliable one.", "The club should have used the biggest wheels because they look best.", "The contest robot was the most amazing robot ever built.", "The ramp was too boring to use more than once."], "The club tested wheel sizes and chose the most reliable one."),

  // Level 9: bias, evaluating evidence, nuanced inference, and author's craft.
  readingBlueprint(9, "Which sentence shows possible bias?", ["A poster for BrightStar Bikes says, 'No other bike can make you this happy.'", "It also lists the bike's weight, price, and brake type."], ["No other bike can make you this happy.", "It lists the bike's weight.", "It lists the price.", "It lists the brake type."], "No other bike can make you this happy."),
  readingBlueprint(9, "Which evidence would best strengthen the claim?", ["Claim: The new crosswalk made the street safer for students.", "The principal wants evidence before asking for another crosswalk."], ["A count showing fewer near-misses after the crosswalk was added", "A drawing of a colorful crosswalk", "One student's favorite color", "A list of nearby ice cream shops"], "A count showing fewer near-misses after the crosswalk was added"),
  readingBlueprint(9, "What is the most reasonable inference?", ["The class pet usually ran to the food bowl when the lid opened.", "Today, it stayed curled in the corner even when seeds were poured in."], ["The class pet might not be feeling well.", "The class pet learned to read.", "The food bowl disappeared.", "The seeds were definitely poisonous."], "The class pet might not be feeling well."),
  readingBlueprint(9, "What is the author's main purpose?", ["Some students want longer recess, but adding ten minutes would shorten reading time.", "Before changing the schedule, the school should ask students and teachers what trade-offs matter most."], ["To encourage careful decision-making about the schedule", "To prove recess should be removed completely", "To tell a story about a playground game", "To explain how to build a clock"], "To encourage careful decision-making about the schedule"),
  readingBlueprint(9, "Why might the author include the exact numbers?", ["Before the reading program, the library had 42 student visits each week.", "After the program began, the library had 68 visits each week for a month."], ["To show clear evidence that visits increased", "To make the passage sound like a poem", "To hide the main idea", "To prove every student likes the same books"], "To show clear evidence that visits increased"),
  readingBlueprint(9, "Which detail weakens the advertisement's claim?", ["An ad says a backpack is perfect for every student.", "The small print says it holds only one thin notebook and cannot carry a water bottle."], ["It holds only one thin notebook and cannot carry a water bottle.", "The ad is about a backpack.", "The backpack has small print in the ad.", "Students often carry notebooks."], "It holds only one thin notebook and cannot carry a water bottle."),

  // Level 10: advanced reading reasoning, argument logic, author's technique, and subtle themes.
  readingBlueprint(10, "Which is the best evaluation of the argument?", ["A letter says the school should replace all library books with tablets because one student reads faster on a tablet.", "The letter does not mention cost, eye strain, battery life, or whether other students prefer printed books."], ["The argument uses too little evidence for such a large change.", "The argument proves tablets are better for everyone.", "The argument is strong because it mentions one student.", "The argument is about lunch rules, not reading."], "The argument uses too little evidence for such a large change."),
  readingBlueprint(10, "What is the most likely reason the author repeats the phrase 'not yet'?", ["The first bridge did not hold the coins. Not yet.", "The second bridge twisted to one side. Not yet.", "On the third try, the bridge stood firm."], ["To show persistence and build anticipation", "To show that the project was already finished", "To make the reader forget the problem", "To compare bridges with coins"], "To show persistence and build anticipation"),
  readingBlueprint(10, "What is the most precise theme of the passage?", ["Kai wanted the fastest solution, so he copied an old design without testing it.", "When it failed, he spent an afternoon measuring, changing one part at a time, and recording results.", "His slower approach finally solved the problem."], ["Careful testing can be more useful than rushing.", "Old designs should never be used.", "Fast solutions are always best.", "Measuring takes too much time to help."], "Careful testing can be more useful than rushing."),
  readingBlueprint(10, "Which statement best explains the irony?", ["The flyer for the 'Quiet Study Club' was printed in giant letters and covered with flashing stickers.", "Students noticed it from across the noisy cafeteria."], ["A club about quiet studying used a loud-looking flyer.", "The cafeteria had students in it.", "Flyers can be printed with stickers.", "Study clubs always meet in cafeterias."], "A club about quiet studying used a loud-looking flyer."),
  readingBlueprint(10, "What assumption does the speaker make?", ["Rami says, 'Our class won the recycling contest after we put posters near the bins, so posters must be the only reason recycling improved.'"], ["He assumes no other factor helped recycling improve.", "He assumes posters cannot affect behavior.", "He assumes the class lost the contest.", "He assumes recycling bins do not exist."], "He assumes no other factor helped recycling improve."),
  readingBlueprint(10, "What is the best synthesis of the two sources?", ["Source 1: A student survey says most students want more shade on the playground.", "Source 2: A temperature check shows the slide area is hottest between noon and two o'clock."], ["Students' opinions and temperature data both support adding shade.", "The slide area is coldest at noon.", "Students do not care about the playground.", "Shade would make surveys unnecessary."], "Students' opinions and temperature data both support adding shade."),
];

const READING_COMPREHENSION_QUESTIONS = READING_COMPREHENSION_BLUEPRINTS.map(createReadingStaticPassageQuestion);

function readingBlueprint(difficulty, question, lines, options, answer, title = "Passage") {
  return { difficulty, question, title, lines, options, answer };
}

function createReadingStaticPassageQuestion(blueprint) {
  const entry = readingBuildQuestionFromBlueprint(blueprint, false);
  const passage = blueprint.lines.join(" ");
  return {
    question: entry.question,
    passage,
    visualHtml: entry.visualHtml,
    options: entry.options,
    answer: entry.answer,
    difficulty: entry.difficulty,
    visualSummary: passage,
    reviewText: passage,
  };
}

function createReadingComprehensionGeneratedEntry(difficulty) {
  const level = clampReadingDifficulty(difficulty);
  const exactPool = READING_COMPREHENSION_BLUEPRINTS.filter((entry) => entry.difficulty === level);
  const fallbackPool = READING_COMPREHENSION_BLUEPRINTS.filter((entry) => entry.difficulty <= level);
  const blueprint = readingRandomChoice(exactPool.length ? exactPool : fallbackPool);
  return readingBuildQuestionFromBlueprint(blueprint, true, level);
}

function readingBuildQuestionFromBlueprint(blueprint, shuffleOptions = false, difficultyOverride = null) {
  if (!String(blueprint?.question || "").trim()) {
    throw new Error("Reading comprehension question text is required.");
  }
  if (!Array.isArray(blueprint.lines) || blueprint.lines.length === 0) {
    throw new Error("Reading comprehension passages require at least one line.");
  }
  if (!Array.isArray(blueprint.options) || blueprint.options.length !== 4 || !blueprint.options.includes(blueprint.answer)) {
    throw new Error("Reading comprehension questions require exactly 4 options with one answer.");
  }

  const passage = blueprint.lines.join(" ");
  return {
    question: blueprint.question,
    visualHtml: buildReadingPassageCard(blueprint.title || "Passage", blueprint.lines),
    options: shuffleOptions ? readingShuffleArray(blueprint.options) : blueprint.options,
    answer: blueprint.answer,
    difficulty: clampReadingDifficulty(difficultyOverride ?? blueprint.difficulty),
    visualSummary: passage,
    reviewText: passage,
    type: "reading-comprehension-choice",
  };
}

function buildReadingPassageCard(title, lines) {
  const paragraphs = lines.map((line) => `<p style="margin: 0 0 8px;">${readingEscapeHtml(line)}</p>`).join("");
  return `
    <div style="
      max-width: 640px;
      padding: 14px 16px;
      border: 2px solid #274972;
      border-radius: 16px;
      background: linear-gradient(180deg, #f8fbff 0%, #eef5ff 100%);
      color: #274972;
      font-family: Arial, sans-serif;
      line-height: 1.5;
    ">
      <div style="font-weight: 700; margin-bottom: 10px;">${readingEscapeHtml(title)}</div>
      ${paragraphs}
    </div>
  `;
}

function clampReadingDifficulty(value) {
  const level = Number.parseInt(value, 10);
  if (!Number.isFinite(level)) {
    return 3;
  }

  return Math.min(10, Math.max(1, level));
}

function readingEscapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function readingRandomChoice(values) {
  return values[Math.floor(Math.random() * values.length)];
}

function readingShuffleArray(values) {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}
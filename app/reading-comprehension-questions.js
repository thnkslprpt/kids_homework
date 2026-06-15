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

  // Added leveled passage rotation: fiction, nonfiction, dialogue, instructions, and mixed formats.
  readingBlueprint(1, "What happened first?", ["Lina found a red leaf on the path.", "She put it in her pocket.", "At home, she pressed it in a book."], ["Lina found a red leaf.", "Lina pressed the leaf.", "Lina went home.", "Lina opened a book."], "Lina found a red leaf.", "Fiction: The Red Leaf"),
  readingBlueprint(1, "What is the main idea?", ["Bees fly from flower to flower.", "They sip nectar and carry pollen on their bodies."], ["Bees help flowers as they look for food.", "Bees live under the ocean.", "Flowers eat bees.", "Pollen is a kind of rock."], "Bees help flowers as they look for food.", "Nonfiction: Busy Bees"),
  readingBlueprint(1, "Why does Max ask for tape?", ["Max said, 'My paper tore.'", "Sara said, 'Here is some tape.'", "Max smiled and fixed the page."], ["He wants to fix the torn paper.", "He wants to paint the wall.", "He wants to eat lunch.", "He wants to read outside."], "He wants to fix the torn paper.", "Dialogue: Torn Paper"),
  readingBlueprint(1, "Which step comes last?", ["Step 1: Put the seed in soil.", "Step 2: Cover it lightly.", "Step 3: Water the soil."], ["Water the soil.", "Put the seed in soil.", "Cover it lightly.", "Find a sunny window."], "Water the soil.", "Instructions: Plant a Seed"),
  readingBlueprint(1, "What does 'tiny' mean in the passage?", ["A tiny frog sat on the leaf.", "It was so small that it fit on Maya's fingertip."], ["Very small", "Very loud", "Very old", "Very cold"], "Very small", "Vocabulary: Tiny Frog"),

  readingBlueprint(2, "What is the main idea of the story?", ["Oren built a paper boat and set it in a puddle.", "The boat floated until a breeze pushed it to the curb.", "Oren ran beside it and laughed."], ["Oren had fun with a paper boat.", "Oren lost his shoes in a puddle.", "The curb was broken.", "The breeze was too cold."], "Oren had fun with a paper boat.", "Fiction: Paper Boat"),
  readingBlueprint(2, "Which detail supports the main idea that owls hunt at night?", ["Owls have large eyes that help them see in dim light.", "Their soft feathers let them fly quietly after sunset."], ["Owls see in dim light.", "Owls have feathers.", "Sunset happens every day.", "Large eyes can blink."], "Owls see in dim light.", "Nonfiction: Night Hunters"),
  readingBlueprint(2, "What can you infer about Ava?", ["Ava whispered, 'I hope my turn is soon.'", "She held her poem with both hands and looked at the stage."], ["She is waiting to read her poem.", "She is cleaning the stage.", "She wants to leave school.", "She forgot her poem at home."], "She is waiting to read her poem.", "Dialogue: Poem Day"),
  readingBlueprint(2, "Which order is correct?", ["First, rinse the berries.", "Next, slice the banana.", "Last, mix the fruit in a bowl."], ["Rinse, slice, mix", "Slice, mix, rinse", "Mix, rinse, slice", "Rinse, mix, slice"], "Rinse, slice, mix", "Instructions: Fruit Bowl"),
  readingBlueprint(2, "What does 'nearby' mean in the passage?", ["The class heard thunder, so they moved to a nearby shelter.", "It only took one minute to walk there."], ["Close", "Far away", "Very noisy", "Hidden"], "Close", "Vocabulary: Nearby Shelter"),

  readingBlueprint(3, "What is the best theme of the story?", ["Nico wanted to quit the puzzle when the sky pieces looked the same.", "His sister sorted the edge pieces with him, and soon the picture began to show."], ["Working together can make a hard task easier.", "Puzzles should always be done alone.", "Sky pieces are impossible to use.", "Sisters always finish every puzzle."], "Working together can make a hard task easier.", "Fiction: Sky Pieces"),
  readingBlueprint(3, "What is the main idea?", ["A compost bin holds food scraps like fruit peels and vegetable ends.", "Over time, worms and tiny living things help turn the scraps into rich soil."], ["Compost turns some food scraps into useful soil.", "Fruit peels should go in every lunchbox.", "Worms eat only rocks.", "Vegetables cannot become soil."], "Compost turns some food scraps into useful soil.", "Nonfiction: Compost"),
  readingBlueprint(3, "Why does Ben probably lower his voice?", ["'The baby is asleep,' Mom said.", "Ben nodded and whispered, 'I can play quietly in my room.'"], ["He does not want to wake the baby.", "He is angry at Mom.", "He forgot how to speak.", "He wants the baby to play drums."], "He does not want to wake the baby.", "Dialogue: Quiet Play"),
  readingBlueprint(3, "Which step should happen before testing the kite?", ["Check that the string is tied tightly.", "Then carry the kite to an open field.", "Finally, let the wind lift it."], ["Tie the string tightly.", "Let the wind lift it.", "Run into trees.", "Fold the kite away."], "Tie the string tightly.", "Instructions: Fly a Kite"),
  readingBlueprint(3, "What does 'stale' mean in the passage?", ["The crackers tasted stale after the box was left open all week.", "They were dry and not crisp anymore."], ["No longer fresh", "Very sweet", "Full of water", "Just baked"], "No longer fresh", "Vocabulary: Stale Crackers"),

  readingBlueprint(4, "What can you infer about Ruby?", ["Ruby packed extra socks, checked the trail map, and filled two water bottles before the hike.", "She also put bandages in the side pocket."], ["Ruby likes to be prepared.", "Ruby plans to stay home.", "Ruby is afraid of maps.", "Ruby forgot about the hike."], "Ruby likes to be prepared.", "Fiction: Trail Pack"),
  readingBlueprint(4, "How is the passage organized?", ["A tadpole begins life in water with a tail and gills.", "Later, it grows legs, loses its tail, and becomes an adult frog."], ["Sequence of changes", "A list of jokes", "Compare and contrast only", "A problem with no solution"], "Sequence of changes", "Nonfiction: Tadpole to Frog"),
  readingBlueprint(4, "What is the main problem in the dialogue?", ["'The poster keeps falling,' Eli said.", "'Use the stronger tape from my desk,' said Noor."], ["The poster will not stay up.", "The desk is too heavy.", "Noor lost the poster.", "Eli cannot find a pencil."], "The poster will not stay up.", "Dialogue: Falling Poster"),
  readingBlueprint(4, "Why should the jar be labeled?", ["Pour the collected rainwater into a clean jar.", "Write the date on the label before placing the jar by the window."], ["So people know when it was collected", "So the jar becomes heavier", "So rain will stop falling", "So the label can get wet"], "So people know when it was collected", "Instructions: Rain Jar"),
  readingBlueprint(4, "What does 'glowed' most likely mean?", ["The lantern glowed on the picnic table after sunset.", "Its soft yellow light helped everyone see their cups."], ["Gave off light", "Made a loud noise", "Rolled away", "Turned cold"], "Gave off light", "Vocabulary: Lantern"),

  readingBlueprint(5, "Which sentence best shows that the narrator changed?", ["I thought the new neighbor would be too shy to join our game.", "After she taught us a better way to keep score, I asked her to be on my team tomorrow."], ["I asked her to be on my team tomorrow.", "I thought the new neighbor would be shy.", "She taught us to keep score.", "The game happened near a neighbor."], "I asked her to be on my team tomorrow.", "Fiction: New Teammate"),
  readingBlueprint(5, "What is the main idea?", ["A barometer measures air pressure.", "When pressure drops quickly, it can be a sign that stormy weather is coming."], ["A barometer can help predict weather changes.", "Storms happen only near schools.", "Air pressure cannot be measured.", "Weather tools are always wrong."], "A barometer can help predict weather changes.", "Nonfiction: Weather Tool"),
  readingBlueprint(5, "What can you infer about the group?", ["'We still need one more bottle for the rocket,' said Imani.", "'I found one in the recycling bin,' Mateo answered.", "'Great, now we can test it,' said Imani."], ["They are building or testing a bottle rocket.", "They are opening a store.", "They are washing dishes for dinner.", "They are looking for a lost shoe."], "They are building or testing a bottle rocket.", "Dialogue: Bottle Rocket"),
  readingBlueprint(5, "Which summary is best?", ["Before using the microscope, carry it with two hands.", "Place the slide on the stage, adjust the light, and focus slowly."], ["The passage explains safe basic microscope steps.", "The passage tells a story about a broken slide.", "The passage compares two scientists.", "The passage argues against using light."], "The passage explains safe basic microscope steps.", "Instructions: Microscope"),
  readingBlueprint(5, "What does 'cautious' mean in the passage?", ["Because the sidewalk was icy, Dad took cautious steps and held the railing.", "He moved slowly until the path was clear."], ["Careful to avoid danger", "Angry and loud", "Ready to sleep", "Unable to see"], "Careful to avoid danger", "Vocabulary: Icy Walk"),

  readingBlueprint(6, "What is the best inference?", ["The last bus had already left, and Zoe checked the darkening sky.", "She called her aunt and waited under the library awning."], ["Zoe needs another way home.", "Zoe wants to read all night.", "The library is closed forever.", "Her aunt drives a bus."], "Zoe needs another way home.", "Fiction: After the Bus"),
  readingBlueprint(6, "Which sentence best states the central idea?", ["Mangrove trees grow where salty water covers their roots.", "Their tangled roots slow waves, trap soil, and give small fish a place to hide."], ["Mangroves protect coastlines and provide habitat.", "Fish dislike tree roots.", "Salt water stops all trees from growing.", "Waves only happen near forests."], "Mangroves protect coastlines and provide habitat.", "Nonfiction: Mangroves"),
  readingBlueprint(6, "How do the speakers solve the problem?", ["'The model bridge leans to the left,' said Aria.", "'Let's add equal weight to both sides,' said Dev.", "'Now it stands straight,' Aria said."], ["They balance the bridge with equal weight.", "They throw the bridge away.", "They paint the bridge blue.", "They move the table outside."], "They balance the bridge with equal weight.", "Dialogue: Leaning Bridge"),
  readingBlueprint(6, "Which step is most important for making the comparison fair?", ["Pour the same amount of water into three cups.", "Place each cup in a different spot and record how much water is left after one day."], ["Use the same amount of water in each cup.", "Choose cups with different shapes.", "Guess before recording results.", "Move the cups every hour."], "Use the same amount of water in each cup.", "Instructions: Evaporation Test"),
  readingBlueprint(6, "What does 'reluctant' most likely mean?", ["Jon was reluctant to speak first, so he waited while two classmates shared ideas.", "After hearing them, he slowly raised his hand."], ["Unsure or not eager", "Very hungry", "Already finished", "Unable to hear"], "Unsure or not eager", "Vocabulary: Sharing Ideas"),

  readingBlueprint(7, "What is the narrator's point of view?", ["I used to rush through every draft because finishing felt best.", "When my revised story won a class vote, I finally understood why writers reread their work."], ["The narrator learns that revision has value.", "The narrator dislikes every story.", "The narrator thinks class votes are unfair.", "The narrator never finishes writing."], "The narrator learns that revision has value.", "Fiction: Better Draft"),
  readingBlueprint(7, "Why does the author include the example of the bus lane?", ["Cities can reduce traffic by giving buses their own lanes.", "For example, one bus lane can move many more people than a lane filled with single-driver cars."], ["To show how one change can move more people efficiently", "To prove cars should never be used", "To describe how buses are painted", "To explain where drivers buy tickets"], "To show how one change can move more people efficiently", "Nonfiction: Bus Lanes"),
  readingBlueprint(7, "Which statement best describes the conflict?", ["'I promised to help with the garden,' said Leila.", "'But the robotics meeting starts at the same time,' said Omar.", "Leila looked from her gloves to her robot notebook."], ["Leila has two commitments at the same time.", "Omar lost the garden gloves.", "The robot notebook is dirty.", "The garden meeting was canceled."], "Leila has two commitments at the same time.", "Dialogue: Two Plans"),
  readingBlueprint(7, "What is the purpose of these instructions?", ["Before joining the video call, check that the microphone is muted.", "Raise your hand in the chat before speaking, and keep your camera pointed at your face."], ["To explain how to join a video call politely", "To tell a funny story about a camera", "To compare microphones and notebooks", "To persuade people to avoid calls"], "To explain how to join a video call politely", "Instructions: Video Call"),
  readingBlueprint(7, "What does 'verify' mean in the passage?", ["Before posting the fact on the class website, Maya checked two trusted sources to verify it."], ["Make sure it is true", "Make it shorter", "Say it louder", "Turn it into a question"], "Make sure it is true", "Vocabulary: Check the Fact"),

  readingBlueprint(8, "Which theme is most precise?", ["Andre wanted credit for the whole mural because he drew the first sketch.", "When classmates added color, texture, and lettering, he realized the finished wall showed everyone's strengths."], ["Shared work can become stronger than one person's first idea.", "Murals should never include lettering.", "Sketches are not useful.", "Classmates always agree immediately."], "Shared work can become stronger than one person's first idea.", "Fiction: The Mural"),
  readingBlueprint(8, "Which claim is best supported?", ["In the school garden, covered soil stayed moist for three days.", "Bare soil dried out by the next afternoon."], ["Covering soil can help it hold moisture longer.", "Bare soil is always better for plants.", "All gardens need no water.", "Moist soil cannot be measured."], "Covering soil can help it hold moisture longer.", "Nonfiction: Covered Soil"),
  readingBlueprint(8, "What does the dialogue reveal about Talia?", ["'The first survey question is confusing,' said Talia.", "'Can we rewrite it before asking everyone? Bad questions give bad data.'"], ["She cares about collecting accurate data.", "She wants to avoid the survey completely.", "She thinks all questions are bad.", "She already knows every answer."], "She cares about collecting accurate data.", "Dialogue: Survey Team"),
  readingBlueprint(8, "Which step helps prevent bias?", ["Ask the same question to every person.", "Record each answer exactly, even if it is not the answer you expected."], ["Record each answer exactly.", "Change surprising answers.", "Ask friends only.", "Skip answers you dislike."], "Record each answer exactly.", "Instructions: Class Survey"),
  readingBlueprint(8, "What does 'consistent' mean in the passage?", ["The plant grew best when its watering schedule was consistent: half a cup every Monday, Wednesday, and Friday."], ["Regular and not changing much", "Completely random", "Very expensive", "Too bright to see"], "Regular and not changing much", "Vocabulary: Watering Schedule"),

  readingBlueprint(9, "Which detail most strongly supports the inference that Sima is overcommitted?", ["Sima carried a violin case, a science board, and a stack of debate notes.", "When her phone reminder chimed, she sighed, 'I forgot about math club too.'"], ["She forgot about math club too.", "She carried a violin case.", "Her phone made a sound.", "The notes were stacked."], "She forgot about math club too.", "Fiction: Too Many Meetings"),
  readingBlueprint(9, "What is the author's main purpose?", ["Some people think public benches are a small detail, but they can make a street more useful for older adults, parents with toddlers, and anyone who needs a short rest."], ["To explain why benches can improve public spaces", "To describe how to build a bench from wood", "To tell a story about one toddler", "To argue that streets need more cars"], "To explain why benches can improve public spaces", "Nonfiction: Public Benches"),
  readingBlueprint(9, "Which viewpoint does Noor express?", ["'The chart is colorful,' said Eli.", "'Color helps, but the scale is uneven, so the chart could mislead people,' Noor replied."], ["Accuracy matters more than appearance.", "Color is never useful.", "Uneven scales are always easy to read.", "Charts should not include numbers."], "Accuracy matters more than appearance.", "Dialogue: Chart Check"),
  readingBlueprint(9, "Which instruction would make the procedure more reliable?", ["Drop the ball from shoulder height and time one bounce.", "Repeat the drop five times and use the average time."], ["Repeat the drop five times and use the average.", "Use a different ball each time.", "Let each student choose a height.", "Ignore unusual results without writing them down."], "Repeat the drop five times and use the average.", "Instructions: Bounce Test"),
  readingBlueprint(9, "What does 'credible' mean in the passage?", ["The report was credible because it named its sources and explained how the measurements were taken."], ["Trustworthy", "Funny", "Hidden", "Easy to fold"], "Trustworthy", "Vocabulary: Reliable Report"),

  readingBlueprint(10, "What is the best evaluation of the narrator's decision?", ["Milo chose the fastest design after only one trial, even though two other designs had close results.", "Later tests showed the design he ignored worked better on rough surfaces."], ["He made a decision before gathering enough evidence.", "He proved speed is the only useful feature.", "He tested every condition carefully.", "He had no choices to compare."], "He made a decision before gathering enough evidence.", "Fiction: One Trial"),
  readingBlueprint(10, "Which synthesis best combines both sources?", ["Source 1: A study found that shaded sidewalks were used more often in summer.", "Source 2: A neighborhood survey found that residents avoided the longest sunny blocks at midday."], ["Both sources suggest shade can affect where people choose to walk.", "Both sources prove people never walk in winter.", "The survey disagrees with the study about shade.", "Sidewalks are only useful at midday."], "Both sources suggest shade can affect where people choose to walk.", "Nonfiction: Shaded Walks"),
  readingBlueprint(10, "What assumption is Kay making?", ["'Our first fundraiser used posters and earned more money than last year,' Kay said.", "'So posters must be the only strategy we need next time.'"], ["She assumes posters were the only reason earnings increased.", "She assumes posters cost too much.", "She assumes fundraising never changes.", "She assumes last year earned more."], "She assumes posters were the only reason earnings increased.", "Dialogue: Fundraiser Plan"),
  readingBlueprint(10, "Which revision makes the instruction most precise?", ["Original: Heat the sample for a while.", "Revision A: Heat the sample for two minutes at medium heat.", "Revision B: Heat the sample until it seems ready."], ["Revision A", "Revision B", "The original sentence", "Both revisions are equally precise"], "Revision A", "Instructions: Clear Procedure"),
  readingBlueprint(10, "What does 'subtle' mean in the passage?", ["The difference between the two photos was subtle; most students noticed it only after comparing the shadows closely."], ["Hard to notice", "Very loud", "Completely missing", "Easy to carry"], "Hard to notice", "Vocabulary: Photo Difference"),
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

(() => {
  const questionUtils = globalThis.HomeworkQuestionUtils;
  if (!questionUtils) {
    return;
  }
  const { entry, pickGeneratedEntry, randomChoice } = questionUtils;

  const readingComprehensionSupplementalBlueprints = [
    { topic: "reading-main-idea", difficulty: 1, question: "What is the main idea?", displayText: "Sam feeds the dog, fills its water bowl, and brushes its fur.", answer: "Sam takes care of the dog.", options: ["Sam takes care of the dog.", "Sam loses the dog.", "The dog is at school.", "The bowl is broken."] },
    { topic: "reading-paragraph-ordering", difficulty: 1, question: "Which comes first?", displayText: "A: Eat the sandwich. B: Make the sandwich. C: Put the plate away.", answer: "B", options: ["A", "B", "C", "They are all first"] },
    { topic: "reading-main-idea", difficulty: 2, question: "What is the main idea?", displayText: "Nora waters the seedlings every morning. She checks the soil and moves the tray closer to the window when the leaves look pale.", answer: "Nora takes care of seedlings carefully.", options: ["Nora takes care of seedlings carefully.", "Nora dislikes plants.", "The window is broken.", "Seedlings never need water."] },
    { topic: "reading-evidence", difficulty: 3, question: "Which detail is evidence that the library was busy?", displayText: "The librarian put out extra chairs. Every table was full, and a line formed at the desk.", answer: "Every table was full.", options: ["Every table was full.", "The librarian works there.", "The chairs had legs.", "The desk was near the door."] },
    { topic: "reading-paragraph-ordering", difficulty: 4, question: "Which paragraph order makes the most sense?", displayText: "A: Finally, she served the soup. B: First, she chopped vegetables. C: Then, she let the soup simmer.", answer: "B, C, A", options: ["B, C, A", "A, B, C", "C, A, B", "B, A, C"] },
    { topic: "reading-evidence", difficulty: 5, question: "Which detail is evidence for the claim?", displayText: "Claim: The library is busier after school. Visits: morning 18, lunch 24, after school 51.", answer: "After school had 51 visits, the most of the three times.", options: ["After school had 51 visits, the most of the three times.", "Libraries have books.", "Lunch sounds busy.", "Morning comes before lunch."] },
    { topic: "reading-inference", difficulty: 5, question: "What can you infer?", displayText: "Mia looked at the dark clouds, zipped her backpack, and took an umbrella.", answer: "Mia thinks it may rain.", options: ["Mia thinks it may rain.", "Mia is going swimming.", "Mia hates backpacks.", "The umbrella is broken."] },
    { topic: "reading-inference", difficulty: 7, question: "What can you infer?", displayText: "Omar crossed out two answers, reread the question, and checked the chart before choosing.", answer: "Omar is trying to answer carefully.", options: ["Omar is trying to answer carefully.", "Omar cannot read charts.", "Omar already knows the answer is wrong.", "Omar is ignoring the question."] },
    { topic: "reading-summarization", difficulty: 8, question: "Which summary is strongest?", displayText: "A class tested three bridge designs. The triangle design held the most weight, so they chose it for the final model.", answer: "The class used test results to choose the strongest bridge design.", options: ["The class used test results to choose the strongest bridge design.", "The class built a bridge and everyone was amazed.", "Triangles are always better for every object.", "The class did not test anything."] },
    { topic: "reading-summarization", difficulty: 9, question: "Which summary keeps only the important information?", displayText: "A team tried three materials for a model roof. Paper leaked quickly, foil bent, and plastic stayed dry. The team used plastic in the final model.", answer: "The team tested roof materials and chose plastic because it worked best.", options: ["The team tested roof materials and chose plastic because it worked best.", "The paper was white and the foil was shiny.", "The model roof was the greatest roof ever made.", "The team used every material equally in the final model."] },
    { topic: "reading-summarization", difficulty: 10, question: "Which summary is most objective?", displayText: "The article explains that city trees lower street temperatures, provide shade, and can reduce storm-water runoff.", answer: "City trees can cool streets, give shade, and help manage runoff.", options: ["City trees can cool streets, give shade, and help manage runoff.", "Trees are obviously the best thing in every city.", "The article is mostly about birds in trees.", "Storm water is never affected by trees."] },
  ];

  function createSupplementalReadingComprehensionEntry(difficulty) {
    const level = Math.max(1, Math.min(10, Number.parseInt(difficulty, 10) || 3));
    const choices = readingComprehensionSupplementalBlueprints.filter((item) => item.difficulty <= level);
    return entry(randomChoice(choices));
  }

  globalThis.createReadingComprehensionSupplementalGeneratedEntry = (difficulty) =>
    pickGeneratedEntry([createSupplementalReadingComprehensionEntry], difficulty);
})();

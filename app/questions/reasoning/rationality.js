function rationalityQuestion(question, options, answer, difficulty) {
  const normalizedQuestion = String(question || "").trim();
  const normalizedOptions = Array.from(new Set(options.map(String)));
  const normalizedAnswer = String(answer);
  const normalizedDifficulty = rationalityClampDifficulty(difficulty);

  if (!normalizedQuestion) {
    throw new Error("Rationality question is missing question text.");
  }

  if (normalizedOptions.length !== 4 || !normalizedOptions.includes(normalizedAnswer)) {
    throw new Error(`Rationality question must have exactly 4 unique options including the answer: ${normalizedQuestion}`);
  }

  return {
    question: normalizedQuestion,
    options: normalizedOptions,
    answer: normalizedAnswer,
    difficulty: normalizedDifficulty,
  };
}

const RATIONALITY_QUESTIONS = [
  // Level 1: observation, evidence, simple likelihood, and measuring instead of guessing.
  rationalityQuestion(
    "A bag has 9 red marbles and 1 blue marble. Which color are you more likely to pick?",
    ["Red", "Blue", "They are equally likely", "You cannot tell"],
    "Red",
    1
  ),
  rationalityQuestion(
    "A bag has 8 blue marbles and 8 red marbles. Which color is more likely on one pick?",
    ["Blue", "Red", "They are equally likely", "You cannot know at all"],
    "They are equally likely",
    1
  ),
  rationalityQuestion(
    "Gideon checked 3 thermometers. Two showed 22 degrees and one showed 31 degrees. What is the best guess for the temperature?",
    ["22 degrees", "31 degrees", "10 degrees", "50 degrees"],
    "22 degrees",
    1
  ),
  rationalityQuestion(
    "If you want to test whether more sunlight helps a plant grow, what should you change?",
    ["Only the amount of sunlight", "The plant type and the water", "The pot and the soil and the water", "Everything at once"],
    "Only the amount of sunlight",
    1
  ),
  rationalityQuestion(
    "Eight out of ten children in one class like apples. What can you safely say?",
    ["Every child in the world likes apples", "Most children in that class like apples", "No children dislike apples", "Apples are the best fruit"],
    "Most children in that class like apples",
    1
  ),
  rationalityQuestion(
    "Noga took one route to school on Monday and a different route on Tuesday. What is a smart next step before deciding which route is faster?",
    ["Decide after those two days only", "Time both routes on more days", "Ask one friend to guess", "Pick the route with more trees"],
    "Time both routes on more days",
    1
  ),
  rationalityQuestion(
    "Which is the best way to find which backpack is heavier?",
    ["Use a scale", "Use a ruler", "Use a thermometer", "Use a clock"],
    "Use a scale",
    1
  ),
  rationalityQuestion(
    "If a friend makes a claim, what is the best next step?",
    ["Ask for evidence", "Guess quickly", "Ignore the claim", "Say the opposite"],
    "Ask for evidence",
    1
  ),
  rationalityQuestion(
    "Which is the fairest way to compare two pencils?",
    ["Measure both with the same ruler", "Hold one closer to your eyes", "Pick the brighter one", "Guess by color"],
    "Measure both with the same ruler",
    1
  ),
  rationalityQuestion(
    "If 4 of 5 tests match, what does that usually suggest?",
    ["The result may be reliable", "The result is impossible", "The result must be false", "The tests do not matter"],
    "The result may be reliable",
    1
  ),
  rationalityQuestion(
    "Which tool is best for timing a race?",
    ["Stopwatch", "Scale", "Ruler", "Magnifying glass"],
    "Stopwatch",
    1
  ),
  rationalityQuestion(
    "A spinner has 3 red parts and 1 blue part. Which color is more likely?",
    ["Red", "Blue", "They are equally likely", "Neither can happen"],
    "Red",
    1
  ),

  // Additional Level 1: expanded variety.
  rationalityQuestion(
    "A box has 7 green crayons and 2 purple crayons. Which color are you more likely to pull out without looking?",
    ["Green", "Purple", "They are equally likely", "No color can be picked"],
    "Green",
    1
  ),
  rationalityQuestion(
    "A cup looks full, but you want to know exactly how much water it has. Which tool should you use?",
    ["Measuring cup", "Stopwatch", "Thermometer", "Calendar"],
    "Measuring cup",
    1
  ),
  rationalityQuestion(
    "Six out of eight students chose drawing instead of reading. What can you safely say about that group?",
    ["More students chose drawing than reading", "Every student chose drawing", "No one likes reading", "Drawing is best for everyone"],
    "More students chose drawing than reading",
    1
  ),
  rationalityQuestion(
    "Which is the best way to check which string is longer?",
    ["Lay them straight next to the same ruler", "Look at them from far away", "Pick the brighter string", "Ask which one feels lucky"],
    "Lay them straight next to the same ruler",
    1
  ),
  rationalityQuestion(
    "You see dark clouds and hear thunder. What is the best thing to say?",
    ["It may rain soon", "It cannot rain today", "It is definitely snowing", "Clouds make clocks stop"],
    "It may rain soon",
    1
  ),
  rationalityQuestion(
    "A spinner has 5 yellow parts and 1 black part. Which color is more likely on one spin?",
    ["Yellow", "Black", "They are equally likely", "Neither color can happen"],
    "Yellow",
    1
  ),
  rationalityQuestion(
    "Which claim is based on evidence?",
    ["The ball is heavier because the scale says 2 kilograms", "The ball is heavier because I like it", "The ball is heavier because it is red", "The ball is heavier because today is Tuesday"],
    "The ball is heavier because the scale says 2 kilograms",
    1
  ),
  rationalityQuestion(
    "If two jars look similar but one feels heavier, what should you do to know for sure?",
    ["Weigh both jars", "Choose the taller jar", "Pick the jar with a nicer lid", "Guess quickly"],
    "Weigh both jars",
    1
  ),
  rationalityQuestion(
    "A light turns on every time you press the switch. What does that suggest?",
    ["The switch may control the light", "The switch is useless", "The light cannot turn off", "Pressing any wall works"],
    "The switch may control the light",
    1
  ),
  rationalityQuestion(
    "Which is the clearest observation?",
    ["The tower has 12 blocks", "The tower is the best", "The tower feels happy", "The tower is lucky"],
    "The tower has 12 blocks",
    1
  ),
  rationalityQuestion(
    "You want to know whether your plant grew overnight. What should you compare?",
    ["Its height yesterday and today", "Its pot color and leaf color", "Your favorite plant and your favorite toy", "The weather and your homework"],
    "Its height yesterday and today",
    1
  ),
  rationalityQuestion(
    "A bag has 4 star stickers and 4 heart stickers. Which sticker shape is more likely to be picked?",
    ["They are equally likely", "Star", "Heart", "Neither can be picked"],
    "They are equally likely",
    1
  ),

  // Level 2: fair tests, exceptions, and simple uncertainty.
  rationalityQuestion(
    "You want to know whether a new soap cleans better. Which is the fairest test?",
    ["Use different amounts of soap", "Use the same amount of dirt and the same scrubbing time", "Use hot water once and cold water once", "Change the soap and the cloth"],
    "Use the same amount of dirt and the same scrubbing time",
    2
  ),
  rationalityQuestion(
    "A coin landed heads 4 times in a row. What is most reasonable about the next flip?",
    ["It must be tails", "It must be heads", "It could still be heads or tails", "The coin stopped working"],
    "It could still be heads or tails",
    2
  ),
  rationalityQuestion(
    "A jar has many green beads and only a few yellow beads. Which is more likely on one pick?",
    ["Green", "Yellow", "They are equally likely", "You can only pick yellow"],
    "Green",
    2
  ),
  rationalityQuestion(
    "Noga says, \"I studied and got 100, so studying always gives 100.\" What is the best response?",
    ["One example is not enough to prove it always happens", "Noga is always right", "Studying never helps", "Tests are all the same"],
    "One example is not enough to prove it always happens",
    2
  ),
  rationalityQuestion(
    "Two teams played one game and Team A won. Which conclusion is best supported by the evidence?",
    ["Team A will win every time", "Team A won that game", "Team B is the better team", "The game was unfair"],
    "Team A won that game",
    2
  ),
  rationalityQuestion(
    "If you want to know whether a toy car rolls farther on carpet or tile, what should change?",
    ["The floor surface", "The color of the car", "The room lights", "The person watching"],
    "The floor surface",
    2
  ),
  rationalityQuestion(
    "If a website says \"always\" and you find one exception, what does that show?",
    ["The claim is not always true", "The claim is perfect", "The exception does not count", "The website must be right"],
    "The claim is not always true",
    2
  ),
  rationalityQuestion(
    "Which sample is fairer for learning what students like for lunch?",
    ["5 friends", "50 students from different classes", "Only your brother", "Only the quietest kid"],
    "50 students from different classes",
    2
  ),
  rationalityQuestion(
    "If one thermometer seems wrong, what should you do next?",
    ["Check with another thermometer", "Throw away all the data", "Change the weather", "Pick the biggest number"],
    "Check with another thermometer",
    2
  ),
  rationalityQuestion(
    "If two things happen together, does that prove one caused the other?",
    ["No. It only shows they happened together", "Yes. It proves one caused the other", "Only on Mondays", "Only if they are loud"],
    "No. It only shows they happened together",
    2
  ),
  rationalityQuestion(
    "You want to know whether a magnet works better from 2 centimeters away or 10 centimeters away. What should you change?",
    ["Only the distance", "The distance and the magnet", "The magnet and the paper clips", "Everything at once"],
    "Only the distance",
    2
  ),
  rationalityQuestion(
    "One restaurant was busy on Friday night. What can you safely say?",
    ["It is always busy", "It was busy that night", "It is the best restaurant", "It will be busy every night"],
    "It was busy that night",
    2
  ),

  // Additional Level 2: expanded variety.
  rationalityQuestion(
    "You want to test which paper towel absorbs more water. What should stay the same?",
    ["The amount of water used", "The brand name only", "The color of the table", "The person watching"],
    "The amount of water used",
    2
  ),
  rationalityQuestion(
    "A die rolled a six twice in a row. What is true about the next roll?",
    ["A six is still possible", "A six is impossible", "It must be a one", "The dice remembers the past"],
    "A six is still possible",
    2
  ),
  rationalityQuestion(
    "Maya says, \"My dog barked before rain, so barking always causes rain.\" What is the best reply?",
    ["One event before another does not prove cause", "Dogs always control weather", "Rain never happens after barking", "Barking is impossible"],
    "One event before another does not prove cause",
    2
  ),
  rationalityQuestion(
    "Which is a fair way to compare two erasers?",
    ["Erase the same pencil mark for the same amount of time", "Use one eraser on pen and one on pencil", "Use one eraser once and the other ten times", "Pick the eraser with the best smell"],
    "Erase the same pencil mark for the same amount of time",
    2
  ),
  rationalityQuestion(
    "A sign says, \"Everyone loves our cookies.\" One person says they do not. What does that show?",
    ["Not everyone loves the cookies", "No one loves the cookies", "The sign is always right", "Cookies cannot be liked"],
    "Not everyone loves the cookies",
    2
  ),
  rationalityQuestion(
    "You want to know if music helps you read faster. What should you measure?",
    ["Reading time with music and without music", "The color of the book cover", "How many songs you know", "The size of the headphones"],
    "Reading time with music and without music",
    2
  ),
  rationalityQuestion(
    "A bag has 10 square tiles and 2 round tiles. Which shape is more likely to be picked?",
    ["Square", "Round", "They are equally likely", "A triangle"],
    "Square",
    2
  ),
  rationalityQuestion(
    "Which question is easiest to answer with a simple count?",
    ["How many apples are in the bowl?", "Which apple is tastiest?", "Is red the best color?", "Which song is most fun?"],
    "How many apples are in the bowl?",
    2
  ),
  rationalityQuestion(
    "A friend says a shortcut is fastest after trying it once. What is a careful response?",
    ["Try or time it more than once", "Believe it must always be fastest", "Never use shortcuts", "Choose based only on the street name"],
    "Try or time it more than once",
    2
  ),
  rationalityQuestion(
    "In a test of two toy boats, one gets a push and the other does not. Why is that unfair?",
    ["The push changes more than just the boat", "Boats cannot be tested", "Water cannot be used", "The slower boat always wins"],
    "The push changes more than just the boat",
    2
  ),
  rationalityQuestion(
    "You see one tall sunflower in a garden. What can you safely say?",
    ["At least one sunflower is tall", "All sunflowers are tall", "No sunflowers are short", "The garden has only sunflowers"],
    "At least one sunflower is tall",
    2
  ),
  rationalityQuestion(
    "Which is better evidence that a pencil sharpener works?",
    ["It sharpens several dull pencils", "It has a shiny sticker", "It is near a pencil", "Someone hopes it works"],
    "It sharpens several dull pencils",
    2
  ),

  // Level 3: samples, controls, stronger evidence, and basic fractions of groups.
  rationalityQuestion(
    "Which question can be answered best by measuring instead of guessing?",
    ["Which story is funniest?", "Which pumpkin is heavier?", "Which color is prettiest?", "Which song is best?"],
    "Which pumpkin is heavier?",
    3
  ),
  rationalityQuestion(
    "Which is better evidence that a movie is popular?",
    ["Two friends liked it", "One person watched it twice", "Two thousand people rated it highly", "The poster looks nice"],
    "Two thousand people rated it highly",
    3
  ),
  rationalityQuestion(
    "To test whether a paper airplane flies farther from a taller launch point, what should be the only thing you change?",
    ["The launch height", "The plane shape too", "The thrower's arm", "The weather"],
    "The launch height",
    3
  ),
  rationalityQuestion(
    "If 20 students voted and 11 chose soccer, what is true?",
    ["Exactly half chose soccer", "More than half chose soccer", "Less than half chose soccer", "All students chose soccer"],
    "More than half chose soccer",
    3
  ),
  rationalityQuestion(
    "A bag feels heavy. Which is the best way to know its mass more accurately?",
    ["Guess", "Ask a friend to hold it", "Use a scale", "Look at its color"],
    "Use a scale",
    3
  ),
  rationalityQuestion(
    "If a survey only asks the loudest kids, what is the problem?",
    ["The sample is biased because it leaves many students out", "It is a perfect sample", "It is a random sample", "It is a large sample"],
    "The sample is biased because it leaves many students out",
    3
  ),
  rationalityQuestion(
    "Which is stronger evidence than one story?",
    ["Repeated results from many fair tests", "One exciting example", "A colorful picture", "A loud opinion"],
    "Repeated results from many fair tests",
    3
  ),
  rationalityQuestion(
    "What does a control group do?",
    ["It gives you a comparison group", "It changes everything", "It makes the answer automatic", "It stops the experiment forever"],
    "It gives you a comparison group",
    3
  ),
  rationalityQuestion(
    "If you want to know whether seeds grow better in sun or shade, what should stay the same?",
    ["Seed type, water, and soil", "Only the pot color", "Only the day of the week", "Nothing has to stay the same"],
    "Seed type, water, and soil",
    3
  ),
  rationalityQuestion(
    "Which is better for learning the favorite recess game in a school?",
    ["Ask students from many grades", "Ask one friend", "Ask only the oldest student", "Ask only the first person you see"],
    "Ask students from many grades",
    3
  ),
  rationalityQuestion(
    "If a prediction is wrong one time, what should you do?",
    ["Check and test again", "Stop thinking", "Say it is always wrong", "Pick a new guess without checking"],
    "Check and test again",
    3
  ),
  rationalityQuestion(
    "A spinner lands on yellow 6 times in 20 spins. Which statement is most careful?",
    ["Yellow happened 6 of the 20 times", "Yellow must happen every time now", "Yellow can never happen again", "The spinner is magic"],
    "Yellow happened 6 of the 20 times",
    3
  ),

  // Additional Level 3: expanded variety.
  rationalityQuestion(
    "A class wants to know which fruit is most popular. Which plan gives better evidence?",
    ["Ask every student in the class", "Ask one student only", "Ask the teacher to guess", "Look at one lunchbox"],
    "Ask every student in the class",
    3
  ),
  rationalityQuestion(
    "What should a control plant receive in a plant-food experiment?",
    ["The same care but no plant food", "No water at all", "Different soil and more sunlight", "A different kind of seed only"],
    "The same care but no plant food",
    3
  ),
  rationalityQuestion(
    "If 14 of 20 students finished a puzzle, what is true?",
    ["More than half finished", "Exactly half finished", "No students finished", "All students finished"],
    "More than half finished",
    3
  ),
  rationalityQuestion(
    "Which is the best evidence that a glue is strong?",
    ["Many matching tests show it holds the same weight", "The bottle is large", "The label says strong in big letters", "One person likes the color"],
    "Many matching tests show it holds the same weight",
    3
  ),
  rationalityQuestion(
    "A survey asks only students sitting at the front of the room. What is a possible problem?",
    ["It may not represent the whole class", "It asks too many people", "It is always random", "It measures the desks"],
    "It may not represent the whole class",
    3
  ),
  rationalityQuestion(
    "To test whether bigger wheels make a toy car roll farther, what should stay the same?",
    ["The ramp, car body, and starting height", "The wheel size", "Only the paint color", "Nothing should stay the same"],
    "The ramp, car body, and starting height",
    3
  ),
  rationalityQuestion(
    "Which statement is most careful after one soccer win?",
    ["Our team won this game", "Our team will always win", "The other team can never win", "Soccer has only one winner forever"],
    "Our team won this game",
    3
  ),
  rationalityQuestion(
    "You measure a table three times: 100 cm, 101 cm, and 100 cm. What is a reasonable conclusion?",
    ["The table is about 100 cm long", "The table is 500 cm long", "The ruler cannot measure", "The table has no length"],
    "The table is about 100 cm long",
    3
  ),
  rationalityQuestion(
    "Which is a fair comparison of two reading apps?",
    ["Have similar students use each app for the same time", "Give one app more time", "Use one app with easy words and one with hard words", "Pick the app with the funnier icon"],
    "Have similar students use each app for the same time",
    3
  ),
  rationalityQuestion(
    "A spinner lands on blue 9 times in 30 spins. Which statement is safest?",
    ["Blue happened 9 out of 30 spins", "Blue is impossible now", "Blue must happen next", "The spinner only has blue"],
    "Blue happened 9 out of 30 spins",
    3
  ),
  rationalityQuestion(
    "Which question needs an opinion rather than a measurement?",
    ["Which cake tastes best?", "Which cake weighs more?", "Which cake is taller?", "Which cake has more candles?"],
    "Which cake tastes best?",
    3
  ),
  rationalityQuestion(
    "If two fair tests give different results, what should you do?",
    ["Repeat the test and look for what changed", "Pick the result you like", "Throw away both results immediately", "Stop measuring forever"],
    "Repeat the test and look for what changed",
    3
  ),

  // Level 4: repeated trials, representative samples, and correlation versus causation.
  rationalityQuestion(
    "Which sample is more reliable for learning the favorite lunch in a school of 500 students?",
    ["Ask 2 friends in one class", "Ask 50 students from different grades", "Ask one teacher", "Read one lunch tray"],
    "Ask 50 students from different grades",
    4
  ),
  rationalityQuestion(
    "Gabriel wore a lucky shirt and won two games. What is the most reasonable idea?",
    ["The shirt definitely caused the wins", "The shirt may not be the reason", "Lucky shirts always work", "The games do not count"],
    "The shirt may not be the reason",
    4
  ),
  rationalityQuestion(
    "Screen time went up and sleep went down during one week. What can you say safely?",
    ["Screen time is the only cause", "They changed together, but one may not be the only cause", "Sleep caused screen time", "The data proves nothing happened"],
    "They changed together, but one may not be the only cause",
    4
  ),
  rationalityQuestion(
    "To decide which battery lasts longer, what is the fairest test?",
    ["Use different toys", "Use the same toy in the same way and time both batteries", "Choose the battery with the brighter label", "Ask which battery sounds stronger"],
    "Use the same toy in the same way and time both batteries",
    4
  ),
  rationalityQuestion(
    "A medicine helped one person feel better. What is the best next step before saying it works for everyone?",
    ["Tell everyone it always works", "Test it carefully with many people", "Stop collecting information", "Use only one more person"],
    "Test it carefully with many people",
    4
  ),
  rationalityQuestion(
    "To find whether a bigger parachute falls slower, what should stay the same?",
    ["The object, height, and wind", "The parachute size", "Only the color", "Only the day of the week"],
    "The object, height, and wind",
    4
  ),
  rationalityQuestion(
    "Which is a more reliable source for average rain?",
    ["A weather record", "One memory", "A guess", "A rumor"],
    "A weather record",
    4
  ),
  rationalityQuestion(
    "If a graph only shows a few people, what should you be careful about?",
    ["Do not make big conclusions about everyone", "The title", "The colors", "The paper size"],
    "Do not make big conclusions about everyone",
    4
  ),
  rationalityQuestion(
    "What is the best reason to repeat an experiment?",
    ["To see if results are similar", "To make it harder to understand", "To change the question", "To avoid measuring"],
    "To see if results are similar",
    4
  ),
  rationalityQuestion(
    "Which conclusion fits this data: 18 of 20 planted seeds sprouted?",
    ["Most of the seeds sprouted", "No seeds sprouted", "Exactly half sprouted", "All plants grow the same height"],
    "Most of the seeds sprouted",
    4
  ),
  rationalityQuestion(
    "A child wants to know if shoes affect running speed. Which plan is best?",
    ["Same runner and same path, only change the shoes", "Different runners and different paths", "Change the shoes and the distance", "Run once and guess"],
    "Same runner and same path, only change the shoes",
    4
  ),
  rationalityQuestion(
    "A class survey asks only students who joined soccer club. What topic would that sample be biased about?",
    ["The whole school's favorite sport", "The number of desks in one room", "The color of the classroom wall", "The date of a holiday"],
    "The whole school's favorite sport",
    4
  ),

  // Additional Level 4: expanded variety.
  rationalityQuestion(
    "A reading test compares students before and after a new method, but the book also got much easier. What is the problem?",
    ["Another factor changed besides the method", "Reading cannot be measured", "Books are never different", "All tests are perfect"],
    "Another factor changed besides the method",
    4
  ),
  rationalityQuestion(
    "Which is a representative sample for a school snack survey?",
    ["Students from several grades and classes", "Only students in the snack club", "Only the principal", "Only the first two friends you see"],
    "Students from several grades and classes",
    4
  ),
  rationalityQuestion(
    "A runner is fastest on the first try and slower later. Why should you use several trials?",
    ["One try can be unusual", "Only the first try counts", "Running cannot be timed", "A stopwatch changes speed"],
    "One try can be unusual",
    4
  ),
  rationalityQuestion(
    "Two classes use different math books. One class also has twice as much practice time. What can you not tell clearly?",
    ["Whether the book or the practice time made the difference", "Whether numbers exist", "Whether practice time happened", "Whether books have pages"],
    "Whether the book or the practice time made the difference",
    4
  ),
  rationalityQuestion(
    "A survey about library books is done only in the library. What bias might happen?",
    ["It may include more students who already like the library", "It will include every student equally", "It cannot ask questions", "It measures book weight only"],
    "It may include more students who already like the library",
    4
  ),
  rationalityQuestion(
    "Which result best supports that a seed type sprouts often?",
    ["46 of 50 seeds sprouted", "1 of 1 seed sprouted", "A picture shows one sprout", "Someone says seeds are nice"],
    "46 of 50 seeds sprouted",
    4
  ),
  rationalityQuestion(
    "You want to compare two basketballs for bounce height. What should stay the same?",
    ["Drop height and floor surface", "Ball color only", "The name written on the ball", "The number of people watching"],
    "Drop height and floor surface",
    4
  ),
  rationalityQuestion(
    "A chart shows students who ate breakfast scored higher. What should you be careful about?",
    ["Other differences may explain the scores", "Breakfast cannot be eaten", "Scores cannot be counted", "Charts always prove causes"],
    "Other differences may explain the scores",
    4
  ),
  rationalityQuestion(
    "Which conclusion fits this data: 7 of 8 batteries lasted over two hours?",
    ["Most of the tested batteries lasted over two hours", "All batteries everywhere last over two hours", "No battery lasted long", "Exactly half lasted long"],
    "Most of the tested batteries lasted over two hours",
    4
  ),
  rationalityQuestion(
    "Why is it useful to write down the plan before an experiment?",
    ["It helps avoid changing the rules after seeing results", "It makes measuring unnecessary", "It proves the answer before testing", "It makes all results identical"],
    "It helps avoid changing the rules after seeing results",
    4
  ),
  rationalityQuestion(
    "A new pencil grip helped one child write neater. What would be better evidence?",
    ["Try it with many children and compare fairly", "Ask the child if the color is nice", "Use it only once more", "Stop checking because one story is enough"],
    "Try it with many children and compare fairly",
    4
  ),
  rationalityQuestion(
    "Which is most likely to reduce bias in choosing survey answers?",
    ["Ask the same neutral question to everyone", "Explain which answer you want first", "Ask only your closest friends", "Skip people who disagree"],
    "Ask the same neutral question to everyone",
    4
  ),

  // Level 5: overclaims, biased samples, and evaluating simple studies.
  rationalityQuestion(
    "Three kids say a park is \"always empty,\" but you visit once and it is full. What does that show?",
    ["The word \"always\" was too strong", "The park is always full", "The kids were lying every time", "A park can only be full once"],
    "The word \"always\" was too strong",
    5
  ),
  rationalityQuestion(
    "Which result is the strongest evidence that a bag has mostly blue cubes?",
    ["One blue cube was drawn once", "Blue cubes appeared most often in many test draws", "A friend said the bag looks blue", "The bag is heavy"],
    "Blue cubes appeared most often in many test draws",
    5
  ),
  rationalityQuestion(
    "A website says, \"This miracle study trick doubles every score.\" What should you look for next?",
    ["The brightest colors on the page", "Careful test results from many students", "A bigger title", "One exciting story"],
    "Careful test results from many students",
    5
  ),
  rationalityQuestion(
    "Which claim already names a measurable outcome and the conditions to keep the same?",
    [
      "Students learn better whenever music is playing",
      "Plants grow faster with more sunlight when water and soil stay the same",
      "This pizza improves every student's mood",
      "Blue classrooms make a school more successful",
    ],
    "Plants grow faster with more sunlight when water and soil stay the same",
    5
  ),
  rationalityQuestion(
    "Which is a better estimate of tomorrow's temperature?",
    ["One guess from memory", "A careful weather forecast", "A random number", "How warm it felt last month"],
    "A careful weather forecast",
    5
  ),
  rationalityQuestion(
    "What is the problem with asking only people who already like a product?",
    ["The sample is biased because it only includes people who already like it", "There are too many opinions", "The sample is perfectly fair", "There are no opinions at all"],
    "The sample is biased because it only includes people who already like it",
    5
  ),
  rationalityQuestion(
    "If two things happen together, what must you check before saying one caused the other?",
    ["Other possible causes", "The color of the chart", "The name of the study", "The number of letters"],
    "Other possible causes",
    5
  ),
  rationalityQuestion(
    "Which is the best response to a claim based on one exciting example?",
    ["Ask for more evidence before believing it", "Believe it immediately", "Ignore the claim forever", "Repeat the story louder"],
    "Ask for more evidence before believing it",
    5
  ),
  rationalityQuestion(
    "If a study uses a tiny sample, which conclusion is best supported by the evidence?",
    ["The result only tells us about that small group", "The result tells us about everyone everywhere", "The answer is certain", "The result is meaningless"],
    "The result only tells us about that small group",
    5
  ),
  rationalityQuestion(
    "Which is the best way to tell if a new study is trustworthy?",
    ["Check how it was done and whether it can be repeated", "Choose the longest title", "Trust it because it is new", "Trust it because it is on a screen"],
    "Check how it was done and whether it can be repeated",
    5
  ),
  rationalityQuestion(
    "A graph starts its vertical axis at 90 instead of 0, making a tiny difference look huge. What should you notice?",
    ["The scale can make the change look bigger", "The graph must be false", "The colors prove the claim", "The title is enough"],
    "The scale can make the change look bigger",
    5
  ),
  rationalityQuestion(
    "A toy review says, \"Best toy ever!\" but gives no details. What is missing?",
    ["Reasons or evidence", "More capital letters", "A louder opinion", "A shorter sentence"],
    "Reasons or evidence",
    5
  ),

  // Additional Level 5: expanded variety.
  rationalityQuestion(
    "An ad says, \"This pencil makes every student write perfectly.\" What is the biggest warning sign?",
    ["The claim is too absolute and needs evidence", "Pencils cannot be bought", "Writing cannot improve", "Students never write"],
    "The claim is too absolute and needs evidence",
    5
  ),
  rationalityQuestion(
    "Which study gives better evidence about a new homework method?",
    ["Many similar classes are compared fairly", "One student tells a success story", "The worksheet has bright colors", "The teacher likes the title"],
    "Many similar classes are compared fairly",
    5
  ),
  rationalityQuestion(
    "A survey asks, \"Don't you agree our team is wonderful?\" What is wrong with it?",
    ["It is a leading question", "It has no words", "It asks about numbers only", "It is perfectly neutral"],
    "It is a leading question",
    5
  ),
  rationalityQuestion(
    "A company posts only happy customer comments. What should you ask for?",
    ["All results or a fair sample of reviews", "Only comments with more exclamation marks", "The biggest logo", "No information at all"],
    "All results or a fair sample of reviews",
    5
  ),
  rationalityQuestion(
    "Which claim is most testable?",
    ["This ball bounces higher than that ball when dropped from 1 meter", "This ball is more awesome", "This ball feels lucky", "This ball has the best personality"],
    "This ball bounces higher than that ball when dropped from 1 meter",
    5
  ),
  rationalityQuestion(
    "A student says a new snack improves focus because they focused well once after eating it. What is the best response?",
    ["One time is not enough to show the snack caused it", "The snack definitely works for everyone", "Focus cannot change", "Food never affects anyone"],
    "One time is not enough to show the snack caused it",
    5
  ),
  rationalityQuestion(
    "A tiny survey of 3 people says everyone likes a game. What is a careful conclusion?",
    ["Those 3 people liked it", "Everyone in the world likes it", "No one dislikes it", "The game must be perfect"],
    "Those 3 people liked it",
    5
  ),
  rationalityQuestion(
    "What is the best way to check a surprising fact online?",
    ["Look for reliable sources that agree and explain evidence", "Trust the first colorful page", "Only read the headline", "Pick the source with the funniest picture"],
    "Look for reliable sources that agree and explain evidence",
    5
  ),
  rationalityQuestion(
    "A graph uses pictures of coins, but the coin pictures are not the same size. What is the risk?",
    ["The picture sizes may make differences look misleading", "Pictures always make data perfect", "Coins cannot be counted", "Graphs cannot use pictures"],
    "The picture sizes may make differences look misleading",
    5
  ),
  rationalityQuestion(
    "Which evidence is weakest for a health claim?",
    ["One anonymous story with no details", "A careful comparison of many people", "Repeated measurements", "Clear data from a fair test"],
    "One anonymous story with no details",
    5
  ),
  rationalityQuestion(
    "A claim says, \"No one ever forgets after using this trick.\" One user forgot. What does that prove?",
    ["The claim is not true as stated", "The trick never helps anyone", "Forgetting is impossible", "The user cannot count"],
    "The claim is not true as stated",
    5
  ),
  rationalityQuestion(
    "Why should an experiment keep notes about failures too?",
    ["Leaving failures out can make the result look better than it is", "Failures are not data", "Only successes can teach anything", "Notes change the result"],
    "Leaving failures out can make the result look better than it is",
    5
  ),

  // Level 6: base rates, hidden variables, averages, and clearer definitions.
  rationalityQuestion(
    "A school has 900 students who walk and 100 students who bike. Most late students walked. What should you remember before blaming walking?",
    ["Many more students walk, so late walkers may be common even if walking is not worse", "Walking always causes lateness", "Biking always prevents lateness", "The numbers do not matter"],
    "Many more students walk, so late walkers may be common even if walking is not worse",
    6
  ),
  rationalityQuestion(
    "A study says children who own many books read better. What is another possible explanation?",
    ["Families who buy books may also read together more", "Books cannot be read", "Reading scores are never measured", "Owning books always causes perfect scores"],
    "Families who buy books may also read together more",
    6
  ),
  rationalityQuestion(
    "Which question is written clearly enough to test?",
    ["Does 20 minutes of reading each night improve spelling quiz scores after 4 weeks?", "Is reading nice?", "Are books better?", "Is school good?"],
    "Does 20 minutes of reading each night improve spelling quiz scores after 4 weeks?",
    6
  ),
  rationalityQuestion(
    "A class has quiz scores 10, 10, 10, and 50. Why might the average be misleading?",
    ["One very high score pulls the average up", "Averages can never be used", "The smallest score always wins", "There are no numbers"],
    "One very high score pulls the average up",
    6
  ),
  rationalityQuestion(
    "Two snacks both cost 12 shekels. One has 3 bars and one has 4 bars. Which comparison is most useful?",
    ["Cost per bar", "Color of the wrapper", "Alphabetical order", "Which shelf is higher"],
    "Cost per bar",
    6
  ),
  rationalityQuestion(
    "A survey asks, \"Do you agree that our amazing playground is the best?\" What is the problem?",
    ["The wording pushes people toward one answer", "The question is perfectly neutral", "It has no opinion words", "It measures height"],
    "The wording pushes people toward one answer",
    6
  ),
  rationalityQuestion(
    "You test a plant food on one plant and it grows taller. What would make the evidence stronger?",
    ["Use many similar plants with and without the plant food", "Use only the tallest plant", "Change water, soil, and sunlight too", "Stop measuring after one day"],
    "Use many similar plants with and without the plant food",
    6
  ),
  rationalityQuestion(
    "A headline says, \"Candy eaters are happier.\" The study only asked children at a birthday party. What is the main problem?",
    ["The setting may make the sample unusual", "Candy cannot be counted", "Happiness cannot be discussed", "Birthday parties are always quiet"],
    "The setting may make the sample unusual",
    6
  ),
  rationalityQuestion(
    "If a prediction gives a range, like 20 to 24 degrees, why can that be better than one exact number?",
    ["It shows uncertainty honestly", "It proves the forecast is wrong", "It means any temperature is correct", "It avoids using evidence"],
    "It shows uncertainty honestly",
    6
  ),
  rationalityQuestion(
    "A game spinner is tested 12 times and red appears 7 times. Why should you be careful?",
    ["Twelve spins may be too few to know the true pattern", "Red must always be most likely", "The spinner cannot be tested", "Seven is not a number"],
    "Twelve spins may be too few to know the true pattern",
    6
  ),
  rationalityQuestion(
    "Which statement is the most precise?",
    ["The plant grew 4 centimeters in 7 days", "The plant grew a lot", "The plant is awesome", "The plant probably did something"],
    "The plant grew 4 centimeters in 7 days",
    6
  ),
  rationalityQuestion(
    "A class vote is 12 for art, 11 for music, and 10 for sports. What is a careful conclusion?",
    ["Art won, but the choices were close", "Everyone loves art", "No one likes sports", "Music was not chosen"],
    "Art won, but the choices were close",
    6
  ),

  // Additional Level 6: expanded variety.
  rationalityQuestion(
    "A class average is 80, but scores are 78, 79, 80, 81, and 82. What does the average show here?",
    ["A typical score is near 80", "Everyone scored exactly 80", "No one passed", "The highest score was 80"],
    "A typical score is near 80",
    6
  ),
  rationalityQuestion(
    "A class average is 80, but scores are 40, 90, 90, 90, and 90. What should you notice?",
    ["The average hides that one score is much lower", "Everyone scored 80", "The average is impossible", "There are no high scores"],
    "The average hides that one score is much lower",
    6
  ),
  rationalityQuestion(
    "Two juice boxes cost the same. One has 200 ml and one has 250 ml. Which comparison matters most?",
    ["Cost per milliliter", "Box color", "Straw length", "Alphabetical order"],
    "Cost per milliliter",
    6
  ),
  rationalityQuestion(
    "A report says tablet users got higher grades, but tablet users were already in advanced classes. What is the hidden issue?",
    ["The groups were different before the comparison", "Tablets cannot be used", "Grades cannot be compared", "Advanced classes have no students"],
    "The groups were different before the comparison",
    6
  ),
  rationalityQuestion(
    "Which question has the clearest definition?",
    ["How many pages can you read correctly in 10 minutes?", "Are you good at reading?", "Is reading fun enough?", "Do books feel nice?"],
    "How many pages can you read correctly in 10 minutes?",
    6
  ),
  rationalityQuestion(
    "A survey asks only people leaving a candy shop about favorite snacks. What should you suspect?",
    ["It may overrepresent people who like candy", "It is guaranteed to represent everyone", "It cannot have answers", "It measures shop doors"],
    "It may overrepresent people who like candy",
    6
  ),
  rationalityQuestion(
    "A prediction says the bus will arrive between 8:05 and 8:10. Why is that useful?",
    ["It gives a clear range instead of pretending exact certainty", "It means the bus cannot arrive", "It avoids time completely", "It proves every bus is late"],
    "It gives a clear range instead of pretending exact certainty",
    6
  ),
  rationalityQuestion(
    "A game score average goes up after one very high score. What should you check?",
    ["The individual scores, not just the average", "Only the biggest score", "The color of the scoreboard", "Whether scores are words"],
    "The individual scores, not just the average",
    6
  ),
  rationalityQuestion(
    "Why is \"Did the new rule reduce hallway running by 20% this month?\" clearer than \"Is the rule good?\"",
    ["It says what outcome and time period to measure", "It uses shorter words", "It avoids numbers", "It cannot be tested"],
    "It says what outcome and time period to measure",
    6
  ),
  rationalityQuestion(
    "A farmer tests fertilizer only on the best soil patch. What is the problem?",
    ["The soil may be helping, not just the fertilizer", "Fertilizer cannot be tested", "Plants do not grow in soil", "The best patch has no plants"],
    "The soil may be helping, not just the fertilizer",
    6
  ),
  rationalityQuestion(
    "Which statement handles uncertainty best?",
    ["Based on this small test, the red car may be faster", "The red car is certainly fastest forever", "Speed cannot be measured", "The blue car is impossible"],
    "Based on this small test, the red car may be faster",
    6
  ),
  rationalityQuestion(
    "A class has 3 left-handed students out of 30. What is the best way to express that?",
    ["1 out of 10 students are left-handed", "Half the class is left-handed", "Everyone is left-handed", "No one is left-handed"],
    "1 out of 10 students are left-handed",
    6
  ),

  // Level 7: conditional reasoning, incentives, experiments versus observations, and expected outcomes.
  rationalityQuestion(
    "A store says, \"Nine out of ten shoppers recommend this toy.\" What important detail should you ask?",
    ["How the shoppers were chosen", "What color the sign is", "Whether the toy has a short name", "How loud the store is"],
    "How the shoppers were chosen",
    7
  ),
  rationalityQuestion(
    "A company that sells vitamins pays for a vitamin study. What should a careful reader think?",
    ["Check the methods because the company has an interest in the result", "Ignore all studies forever", "Believe it automatically", "Only look at the package color"],
    "Check the methods because the company has an interest in the result",
    7
  ),
  rationalityQuestion(
    "Two groups are similar. One gets extra math practice and one does not. Their later scores are compared. What is this closest to?",
    ["An experiment with a comparison group", "A random rumor", "A popularity contest", "A map reading task"],
    "An experiment with a comparison group",
    7
  ),
  rationalityQuestion(
    "A teacher wants to know if a new seating plan helps focus. Which measure is most useful?",
    ["Number of off-task interruptions before and after using the plan", "Favorite desk color", "How tall the chairs are", "The day of the month only"],
    "Number of off-task interruptions before and after using the plan",
    7
  ),
  rationalityQuestion(
    "A spinner gives 10 points on 1 part and 0 points on 3 equal parts. What is the average points per spin over many spins?",
    ["2.5 points", "5 points", "7.5 points", "10 points"],
    "2.5 points",
    7
  ),
  rationalityQuestion(
    "A claim says, \"Students who use tablets score higher.\" What question helps check causation?",
    ["Were the students similar before getting tablets?", "Were the tablets shiny?", "Did the headline use big letters?", "Was the chart blue?"],
    "Were the students similar before getting tablets?",
    7
  ),
  rationalityQuestion(
    "A survey about homework is sent only to families who already complained about homework. What bias is likely?",
    ["It may overrepresent unhappy families", "It proves all families complain", "It is a perfect random sample", "It has no possible bias"],
    "It may overrepresent unhappy families",
    7
  ),
  rationalityQuestion(
    "A jar has 1 gold bead and 99 white beads. You pick a gold bead once. What is the best conclusion?",
    ["Rare events can happen", "Gold is now the most common", "The jar has only gold beads", "White beads are impossible"],
    "Rare events can happen",
    7
  ),
  rationalityQuestion(
    "Which plan best reduces the effect of a lucky day in a running test?",
    ["Run several trials on different days and compare averages", "Run once and stop", "Choose the fastest time only", "Change the shoes every time"],
    "Run several trials on different days and compare averages",
    7
  ),
  rationalityQuestion(
    "A graph shows ice cream sales and sunburns both rise in summer. What hidden factor could explain both?",
    ["Hot sunny weather", "Ice cream causes all sunburns", "Sunburns cause all ice cream sales", "The graph paper causes both"],
    "Hot sunny weather",
    7
  ),
  rationalityQuestion(
    "Which statement uses conditional reasoning correctly?",
    ["If all robins are birds and Pip is a robin, then Pip is a bird", "If Pip is a bird, Pip must be a robin", "If some birds fly, every bird must fly", "If a robin is red, every red thing is a robin"],
    "If all robins are birds and Pip is a robin, then Pip is a bird",
    7
  ),
  rationalityQuestion(
    "A new game has 100 online reviews, but 90 were posted on the release day by accounts with no other reviews. What should you do?",
    ["Be cautious because the reviews may not be independent", "Assume all reviews are perfect", "Count only the star color", "Ignore the number of reviews"],
    "Be cautious because the reviews may not be independent",
    7
  ),

  // Additional Level 7: expanded variety.
  rationalityQuestion(
    "A toy company lets only prize winners review its contest. What issue should you consider?",
    ["The reviewers may not represent all players", "Prize winners cannot speak", "Reviews are always random", "Contests have no results"],
    "The reviewers may not represent all players",
    7
  ),
  rationalityQuestion(
    "Two groups try different study plans, but one group has older students. What question matters?",
    ["Were the groups similar before the study?", "Which group has nicer pencils?", "Was the paper brighter?", "Did both groups have names?"],
    "Were the groups similar before the study?",
    7
  ),
  rationalityQuestion(
    "A box gives a 3 in 10 chance of a sticker worth 5 points and otherwise 0 points. What is the average points per try?",
    ["1.5 points", "3 points", "5 points", "10 points"],
    "1.5 points",
    7
  ),
  rationalityQuestion(
    "A school tries a new lunch menu and satisfaction rises, but recess time also gets longer. What is the problem?",
    ["Two changes happened at once", "Lunch cannot affect satisfaction", "Recess cannot be measured", "Menus cannot change"],
    "Two changes happened at once",
    7
  ),
  rationalityQuestion(
    "A website earns money when people click scary headlines. What should a careful reader notice?",
    ["The site may have an incentive to exaggerate", "The site must always be true", "Headlines cannot be checked", "Money removes all bias"],
    "The site may have an incentive to exaggerate",
    7
  ),
  rationalityQuestion(
    "Which plan best tests whether quiet music helps homework accuracy?",
    ["Randomly assign similar students to music or no music and compare accuracy", "Ask only students who love music", "Use music for everyone and guess", "Change the homework and the music together"],
    "Randomly assign similar students to music or no music and compare accuracy",
    7
  ),
  rationalityQuestion(
    "If all squares have four sides and this shape is a square, what follows?",
    ["This shape has four sides", "Every four-sided shape is this square", "This shape has five sides", "No squares have sides"],
    "This shape has four sides",
    7
  ),
  rationalityQuestion(
    "A rare blue card appears once in a pack. What should you conclude?",
    ["A rare card can appear sometimes", "All cards are blue", "Blue cards are now common", "Cards cannot be rare"],
    "A rare card can appear sometimes",
    7
  ),
  rationalityQuestion(
    "A runner improves after new shoes, but also practiced more for two weeks. What is the issue?",
    ["Practice is another possible cause", "Shoes cannot matter", "Running cannot improve", "Two weeks is not time"],
    "Practice is another possible cause",
    7
  ),
  rationalityQuestion(
    "A review says, \"I received a free toy for writing this.\" Why is that useful to know?",
    ["It reveals an incentive that could affect the review", "It proves the review is false", "It means toys cannot be reviewed", "It removes all bias"],
    "It reveals an incentive that could affect the review",
    7
  ),
  rationalityQuestion(
    "Which result is an expected value calculation?",
    ["A 1 in 4 chance of 8 points is worth 2 points on average", "Eight points is always won", "Four chances means no risk", "Average points cannot be estimated"],
    "A 1 in 4 chance of 8 points is worth 2 points on average",
    7
  ),
  rationalityQuestion(
    "A graph compares two classes but starts one class after extra lessons began. What should you ask for?",
    ["Data from before the lessons for both classes", "A different graph color", "A shorter class name", "No labels"],
    "Data from before the lessons for both classes",
    7
  ),

  // Level 8: probability traps, regression to the mean, confidence, and quality of evidence.
  rationalityQuestion(
    "A basketball player has one terrible game after many average games. The next game is more normal. What idea might explain this?",
    ["Extreme results are often followed by more typical results", "The ball learned a lesson", "Bad games cause perfect games", "Averages never matter"],
    "Extreme results are often followed by more typical results",
    8
  ),
  rationalityQuestion(
    "A test for a rare condition is usually correct, but the condition is very rare. What should you ask after one positive result?",
    ["How common the condition is and whether a second test is needed", "Whether the paper is white", "Whether tests are always useless", "Whether rare means impossible"],
    "How common the condition is and whether a second test is needed",
    8
  ),
  rationalityQuestion(
    "Which is the best reason randomized groups help an experiment?",
    ["They make the groups more similar before the change being tested", "They make the result chosen in advance", "They remove the need to measure", "They make everyone agree"],
    "They make the groups more similar before the change being tested",
    8
  ),
  rationalityQuestion(
    "A headline reports a 100% increase: from 1 student to 2 students. What should you notice?",
    ["The percent sounds large, but the actual change is only 1 student", "The change must affect everyone", "Percentages are never useful", "The second number is smaller"],
    "The percent sounds large, but the actual change is only 1 student",
    8
  ),
  rationalityQuestion(
    "A study measures 30 things and reports only the one surprising result. What is the concern?",
    ["Some surprising results can happen by chance when many things are tested", "Measuring many things is always forbidden", "The result must be important", "The other 29 things cannot exist"],
    "Some surprising results can happen by chance when many things are tested",
    8
  ),
  rationalityQuestion(
    "Which source is usually strongest for a factual science claim?",
    ["Several well-designed studies that other researchers can check", "One anonymous comment", "A slogan on an ad", "A guess from a friend"],
    "Several well-designed studies that other researchers can check",
    8
  ),
  rationalityQuestion(
    "A poll of 1,000 randomly chosen students is closer than a poll of 20 friends. Why?",
    ["The larger random sample is less likely to be badly unrepresentative", "Friends are never allowed to answer", "A sample of 20 is always false", "Random means careless"],
    "The larger random sample is less likely to be badly unrepresentative",
    8
  ),
  rationalityQuestion(
    "A chart shows two lines rising together for 5 years. What would help test whether one causes the other?",
    ["A study that changes one factor while holding other factors steady", "A thicker chart line", "A brighter title", "A guess about the last year"],
    "A study that changes one factor while holding other factors steady",
    8
  ),
  rationalityQuestion(
    "A student says, \"I feel sure, so I must be right.\" What is the best reply?",
    ["Confidence is not the same as evidence", "Feeling sure proves everything", "Evidence is never needed", "Only unsure people can be right"],
    "Confidence is not the same as evidence",
    8
  ),
  rationalityQuestion(
    "A game costs 10 shekels to play and has a 1 in 5 chance to win 20 shekels. What is the average prize value before cost?",
    ["4 shekels", "5 shekels", "10 shekels", "20 shekels"],
    "4 shekels",
    8
  ),
  rationalityQuestion(
    "Which experiment best uses blinding?",
    ["The scorer does not know which group got the new practice method", "Everyone knows every group", "The answer key is hidden forever", "No one measures anything"],
    "The scorer does not know which group got the new practice method",
    8
  ),
  rationalityQuestion(
    "A restaurant shows only its five best reviews and hides hundreds of others. What is the problem?",
    ["The evidence is cherry-picked", "Five reviews are always enough", "Good reviews are impossible", "Restaurants cannot have reviews"],
    "The evidence is cherry-picked",
    8
  ),

  // Additional Level 8: expanded variety.
  rationalityQuestion(
    "A student gets the highest score in the school one week, then a more ordinary score next week. What may be happening?",
    ["Regression toward a more typical result", "The school changed all answers", "High scores cause low scores", "Scores cannot vary"],
    "Regression toward a more typical result",
    8
  ),
  rationalityQuestion(
    "A test is good but not perfect. The thing it tests for is very uncommon. What is wise after a positive result?",
    ["Confirm with more evidence", "Assume certainty immediately", "Ignore how common the thing is", "Throw away all tests"],
    "Confirm with more evidence",
    8
  ),
  rationalityQuestion(
    "A researcher tries 40 comparisons and reports only one that looks exciting. What is the concern?",
    ["The result may be a chance finding from many tries", "Forty comparisons guarantee truth", "One exciting result is always enough", "Comparisons cannot be reported"],
    "The result may be a chance finding from many tries",
    8
  ),
  rationalityQuestion(
    "Why can random assignment help in a classroom experiment?",
    ["It spreads hidden differences more evenly between groups", "It makes students identical", "It removes all mistakes forever", "It means no one needs instructions"],
    "It spreads hidden differences more evenly between groups",
    8
  ),
  rationalityQuestion(
    "A headline says risk doubled from 1 in 1,000 to 2 in 1,000. What is the careful reading?",
    ["The relative change is large, but the absolute change is 1 in 1,000", "The risk is now 100%", "The risk disappeared", "Doubling always means many people"],
    "The relative change is large, but the absolute change is 1 in 1,000",
    8
  ),
  rationalityQuestion(
    "A scorer knows which essays came from the favorite class. What could reduce bias?",
    ["Hide class names before scoring", "Make the scorer guess louder", "Show only the favorite class", "Stop using a rubric"],
    "Hide class names before scoring",
    8
  ),
  rationalityQuestion(
    "A poll says 60% support a rule, but it was posted on a website for rule supporters. What is the problem?",
    ["The sample may be biased toward supporters", "Sixty percent means no one supports it", "Websites cannot ask polls", "Rules cannot be supported"],
    "The sample may be biased toward supporters",
    8
  ),
  rationalityQuestion(
    "Which evidence best supports a claim after an unusual result?",
    ["The same result appears in new, well-run tests", "The first result is surprising", "The title says it is amazing", "One friend repeats the rumor"],
    "The same result appears in new, well-run tests",
    8
  ),
  rationalityQuestion(
    "A chart makes a tiny difference look huge by using a very short axis range. What should you inspect?",
    ["The axis scale", "The font name", "The page number", "The color of the border"],
    "The axis scale",
    8
  ),
  rationalityQuestion(
    "A person is 95% confident in many predictions. What should happen for good calibration?",
    ["About 95% of those predictions should be correct", "Every prediction must be wrong", "Exactly half should be correct", "Confidence cannot be checked"],
    "About 95% of those predictions should be correct",
    8
  ),
  rationalityQuestion(
    "A blog gives a strong conclusion but does not describe its data or method. What is missing?",
    ["Enough information to check the claim", "A louder headline", "More emojis", "A shorter conclusion"],
    "Enough information to check the claim",
    8
  ),
  rationalityQuestion(
    "A lottery ticket has a 1 in 100 chance to win 50 shekels. What is the average prize value before cost?",
    ["0.5 shekels", "1 shekel", "50 shekels", "100 shekels"],
    "0.5 shekels",
    8
  ),

  // Level 9: Bayesian-style updating, uncertainty, causal mechanisms, and decision quality.
  rationalityQuestion(
    "A very rare prize is won by someone in a city of one million people. Why is that not automatically suspicious?",
    ["Rare events can happen when there are many chances", "Rare means impossible", "Cities cannot have prizes", "One million chances makes every event certain"],
    "Rare events can happen when there are many chances",
    9
  ),
  rationalityQuestion(
    "You believed a claim was unlikely. Then you see strong, repeated evidence for it. What is rational to do?",
    ["Update your belief toward the evidence", "Ignore the evidence because of your first belief", "Believe the opposite automatically", "Stop using evidence"],
    "Update your belief toward the evidence",
    9
  ),
  rationalityQuestion(
    "A study finds that children with larger shoe sizes read better. What is the most likely hidden variable?",
    ["Age", "Shoe color", "Book shape", "Pencil length"],
    "Age",
    9
  ),
  rationalityQuestion(
    "Which claim includes a possible mechanism?",
    ["More sleep may help memory because the brain strengthens learning during rest", "More sleep is magic", "Sleep is good because I said so", "Memory and sleep are words"],
    "More sleep may help memory because the brain strengthens learning during rest",
    9
  ),
  rationalityQuestion(
    "A poll says 52% prefer A and 48% prefer B, with a possible error of plus or minus 4%. What is the careful conclusion?",
    ["A may be ahead, but the race could be very close", "A definitely wins by a lot", "B has zero support", "The poll has no information"],
    "A may be ahead, but the race could be very close",
    9
  ),
  rationalityQuestion(
    "You spent an hour building a tower that keeps falling. The best new plan is to start over. What mistake should you avoid?",
    ["Continuing only because you already spent time", "Learning from mistakes", "Trying a better design", "Checking the base"],
    "Continuing only because you already spent time",
    9
  ),
  rationalityQuestion(
    "Which is the best example of opportunity cost?",
    ["Choosing soccer practice means missing art club at the same time", "A ball is round", "A pencil costs 3 shekels", "A clock has hands"],
    "Choosing soccer practice means missing art club at the same time",
    9
  ),
  rationalityQuestion(
    "A study has a control group, random assignment, and many participants. Why is it stronger than one story?",
    ["It reduces several ways the result could be misleading", "It guarantees every conclusion is true", "It removes the need for math", "It makes stories useless"],
    "It reduces several ways the result could be misleading",
    9
  ),
  rationalityQuestion(
    "A claim predicts exactly what will happen before the test, and the result matches. Why is that stronger than explaining after the fact?",
    ["Predictions are harder to fit to the answer afterward", "Explanations after the fact are always true", "Predictions do not need evidence", "The order never matters"],
    "Predictions are harder to fit to the answer afterward",
    9
  ),
  rationalityQuestion(
    "Two explanations both fit the same clues. What should you prefer first?",
    ["The simpler explanation that fits all the clues and makes good predictions", "The longest explanation", "The explanation with the most exciting words", "The one you heard first no matter what"],
    "The simpler explanation that fits all the clues and makes good predictions",
    9
  ),
  rationalityQuestion(
    "A student improves after tutoring, but also started sleeping more at the same time. What is the issue?",
    ["There are two possible causes changing together", "Tutoring cannot help", "Sleep cannot help", "Improvement cannot be measured"],
    "There are two possible causes changing together",
    9
  ),
  rationalityQuestion(
    "A source admits what it is unsure about and explains its method. What does that usually signal?",
    ["More trustworthiness than pretending to know everything", "Weakness because uncertainty is never allowed", "That the method is hidden", "That the source has no evidence"],
    "More trustworthiness than pretending to know everything",
    9
  ),

  // Additional Level 9: expanded variety.
  rationalityQuestion(
    "A city has many thousands of students. One student guesses 10 coin flips correctly. Why might that happen without cheating?",
    ["With many students, unlikely streaks can occur", "Ten correct guesses are impossible", "Coins stop being random", "Every student must get ten right"],
    "With many students, unlikely streaks can occur",
    9
  ),
  rationalityQuestion(
    "You think a claim is likely true, but new careful evidence repeatedly goes against it. What should you do?",
    ["Lower your confidence in the claim", "Ignore all new evidence", "Become more certain automatically", "Only count evidence you like"],
    "Lower your confidence in the claim",
    9
  ),
  rationalityQuestion(
    "A study links more piano lessons with better math scores. Which hidden variable could matter?",
    ["Families with more time or resources may support both", "Pianos solve math problems", "Math scores cannot be measured", "Lesson rooms have no numbers"],
    "Families with more time or resources may support both",
    9
  ),
  rationalityQuestion(
    "Which explanation has a useful mechanism?",
    ["The bridge is stronger because the triangle shapes spread the weight", "The bridge is strong because it is awesome", "The bridge is strong because bridges win", "The bridge is strong because the word is long"],
    "The bridge is stronger because the triangle shapes spread the weight",
    9
  ),
  rationalityQuestion(
    "A poll shows 51% for A and 49% for B with a margin of error of 3%. What is careful?",
    ["The result is too close to be certain who is ahead", "A is definitely far ahead", "B has no chance", "The poll says nothing at all"],
    "The result is too close to be certain who is ahead",
    9
  ),
  rationalityQuestion(
    "You bought a movie ticket but feel sick before the movie starts. Staying only because you paid is an example of what?",
    ["Sunk cost thinking", "Random sampling", "Blinding", "Calibration"],
    "Sunk cost thinking",
    9
  ),
  rationalityQuestion(
    "Which choice shows opportunity cost?",
    ["Practicing violin means missing the chess club meeting at the same time", "A violin has strings", "Chess uses pieces", "A meeting starts at 4"],
    "Practicing violin means missing the chess club meeting at the same time",
    9
  ),
  rationalityQuestion(
    "A theory explains old data but makes no new predictions. What would make it stronger?",
    ["Correctly predicting new data before it is seen", "Using harder words", "Being more surprising", "Ignoring future tests"],
    "Correctly predicting new data before it is seen",
    9
  ),
  rationalityQuestion(
    "Two explanations fit the facts, but one needs many extra assumptions. Which should you prefer for now?",
    ["The one with fewer extra assumptions that still fits", "The one with the longest name", "The one that sounds strangest", "The one you heard first"],
    "The one with fewer extra assumptions that still fits",
    9
  ),
  rationalityQuestion(
    "A tutoring program reports big gains, but only for students who chose to join. What question matters?",
    ["Were those students already more motivated?", "Was the poster colorful?", "Were pencils available?", "Did the program have a name?"],
    "Were those students already more motivated?",
    9
  ),
  rationalityQuestion(
    "A source says, \"Here is what would change my mind.\" What does that often show?",
    ["The claim is open to being tested", "The source has no opinion", "The source refuses evidence", "The answer is automatically true"],
    "The claim is open to being tested",
    9
  ),
  rationalityQuestion(
    "A choice has a small chance of a very bad outcome. What should good decision-making include?",
    ["Both the probability and the size of the harm", "Only the chance of good outcomes", "Only whether it sounds fun", "Ignoring rare outcomes"],
    "Both the probability and the size of the harm",
    9
  ),

  // Level 10: advanced critical thinking, experimental design, and decision analysis.
  rationalityQuestion(
    "You need to choose between two explanations. Explanation A is exciting but predicts nothing new. Explanation B is simpler and correctly predicts a new result. Which is stronger?",
    ["Explanation B", "Explanation A", "They are equal because excitement matters most", "Neither can be compared"],
    "Explanation B",
    10
  ),
  rationalityQuestion(
    "A test is 99% accurate for a rare issue that only 1 in 10,000 people has. One positive result should make you think what?",
    ["The result matters, but the rarity means you should confirm it", "The issue is now certain", "The test is useless", "Rarity does not matter"],
    "The result matters, but the rarity means you should confirm it",
    10
  ),
  rationalityQuestion(
    "A study stops early exactly when the result looks exciting. Why can that be a problem?",
    ["Stopping at a lucky-looking moment can exaggerate the effect", "Early results are always better", "Measuring is impossible", "Exciting results cannot be checked"],
    "Stopping at a lucky-looking moment can exaggerate the effect",
    10
  ),
  rationalityQuestion(
    "A claim says a new app improves grades. Which evidence would be strongest?",
    ["Randomly assign many similar students to app and no-app groups, then compare grades", "Ask the app company if it works", "Read one success story", "Count how many colors the app uses"],
    "Randomly assign many similar students to app and no-app groups, then compare grades",
    10
  ),
  rationalityQuestion(
    "A result is statistically noticeable but the score improves by only 0.1 point. What should you ask?",
    ["Whether the improvement is large enough to matter in real life", "Whether decimals are allowed", "Whether all small numbers are false", "Whether the title is long"],
    "Whether the improvement is large enough to matter in real life",
    10
  ),
  rationalityQuestion(
    "A debate gives two sides equal time, but one side has strong evidence and the other has almost none. What is the risk?",
    ["False balance", "Fair measurement", "Random assignment", "A larger sample"],
    "False balance",
    10
  ),
  rationalityQuestion(
    "A model predicts rain with 70% confidence on many days. How can you check if it is well calibrated?",
    ["On days labeled 70%, rain should happen about 70% of the time", "It must rain every time", "It must never rain", "Only one day is enough"],
    "On days labeled 70%, rain should happen about 70% of the time",
    10
  ),
  rationalityQuestion(
    "Which decision rule best combines probability and value?",
    ["Compare expected benefits and costs, then consider risks", "Choose the option with the longest name", "Always choose the cheapest option", "Ignore probabilities"],
    "Compare expected benefits and costs, then consider risks",
    10
  ),
  rationalityQuestion(
    "A person changes their mind after seeing better evidence. What is the most rational view of that change?",
    ["It can be a strength when the evidence really is better", "It is always weakness", "It means the person never thinks", "It means evidence is useless"],
    "It can be a strength when the evidence really is better",
    10
  ),
  rationalityQuestion(
    "A study result cannot be repeated by other careful teams. What should happen to confidence in the claim?",
    ["Confidence should go down", "Confidence should become absolute", "The claim becomes stronger", "Repeating never matters"],
    "Confidence should go down",
    10
  ),
  rationalityQuestion(
    "A chart leaves out data from years that do not support its claim. What is this called?",
    ["Cherry-picking", "Random sampling", "Blinding", "Calibration"],
    "Cherry-picking",
    10
  ),
  rationalityQuestion(
    "A new explanation fits old clues perfectly because it was invented after seeing them. What would strengthen it most?",
    ["It predicts new clues correctly before they are checked", "It uses more dramatic words", "It ignores future evidence", "It becomes harder to understand"],
    "It predicts new clues correctly before they are checked",
    10
  ),
  // Additional Level 10: expanded variety.
  rationalityQuestion(
    "A medicine study assigns patients randomly, uses a placebo group, and hides group labels from evaluators. What does this design reduce?",
    ["Bias and confounding", "The need for data", "All uncertainty forever", "The number of patients to zero"],
    "Bias and confounding",
    10
  ),
  rationalityQuestion(
    "A model says an event has a 1% chance each day. After 100 days, what is a careful statement?",
    ["The event is not guaranteed, but there have been many chances", "The event must happen exactly once", "The event is impossible", "One percent means always"],
    "The event is not guaranteed, but there have been many chances",
    10
  ),
  rationalityQuestion(
    "A researcher changes the main outcome after seeing which result looked best. Why is that risky?",
    ["It can turn a chance result into a misleading headline", "It always improves accuracy", "Outcomes cannot be chosen", "Data disappears after testing"],
    "It can turn a chance result into a misleading headline",
    10
  ),
  rationalityQuestion(
    "A result is repeated in three independent labs using similar methods. What should happen to confidence?",
    ["Confidence should increase", "Confidence should drop to zero", "Confidence should ignore replication", "The result becomes impossible"],
    "Confidence should increase",
    10
  ),
  rationalityQuestion(
    "A study shows a small average benefit but a large cost for each person. What should a decision-maker ask?",
    ["Whether the benefit is worth the cost", "Whether costs are numbers", "Whether averages are forbidden", "Whether small benefits are always enough"],
    "Whether the benefit is worth the cost",
    10
  ),
  rationalityQuestion(
    "A school wants to know if a new schedule improves learning. Which plan is strongest?",
    ["Compare similar groups with and without the schedule while measuring the same outcomes", "Ask only students who like the schedule", "Use the new schedule for one day and guess", "Change the schedule and the tests at the same time"],
    "Compare similar groups with and without the schedule while measuring the same outcomes",
    10
  ),
  rationalityQuestion(
    "A forecast says 80% chance of rain for many different days. How should calibration look?",
    ["It rains on about 80% of those days", "It rains on every one of those days", "It rains on none of those days", "Calibration means the forecast is pretty"],
    "It rains on about 80% of those days",
    10
  ),
  rationalityQuestion(
    "A news story gives equal space to a careful expert review and to a claim with no evidence. What problem can that create?",
    ["False balance", "Random assignment", "A control group", "A larger sample"],
    "False balance",
    10
  ),
  rationalityQuestion(
    "A complex explanation fits one old event but cannot explain other similar events. What is the weakness?",
    ["It may be overfit to one case", "It is automatically best", "Old events cannot be explained", "Complexity always proves truth"],
    "It may be overfit to one case",
    10
  ),
  rationalityQuestion(
    "A test has many false positives when used on a very low-risk group. What should be considered?",
    ["The base rate and confirmatory testing", "Only the test name", "Only the positive label", "Whether low risk means impossible"],
    "The base rate and confirmatory testing",
    10
  ),
  rationalityQuestion(
    "Which policy decision uses expected value thinking?",
    ["Choose the option whose likely benefits outweigh likely costs and risks", "Choose the option with the nicest slogan", "Ignore low-probability harms", "Always choose the newest idea"],
    "Choose the option whose likely benefits outweigh likely costs and risks",
    10
  ),
  rationalityQuestion(
    "A claim survives attempts to disprove it and predicts new findings. What should happen compared with a claim that only explains old facts?",
    ["It should be taken more seriously", "It should be ignored because predictions are bad", "It is weaker because it was tested", "Both claims are always equal"],
    "It should be taken more seriously",
    10
  ),

];
const RATIONALITY_ACTIVE_QUESTIONS =
  globalThis.HomeworkQuestionUtils?.filterAnswerLengthCues(RATIONALITY_QUESTIONS, 15) ||
  RATIONALITY_QUESTIONS;

function createRationalityGeneratedEntry(difficulty) {
  const level = rationalityClampDifficulty(difficulty);
  const exactLevelQuestions = RATIONALITY_ACTIVE_QUESTIONS.filter((entry) => entry.difficulty === level);
  const fallbackQuestions = RATIONALITY_ACTIVE_QUESTIONS.filter((entry) => entry.difficulty <= level);
  const pool = exactLevelQuestions.length ? exactLevelQuestions : fallbackQuestions;
  const selected = rationalityRandomChoice(pool);

  return {
    ...selected,
    options: rationalityShuffleArray(selected.options),
    difficulty: level,
  };
}

function rationalityClampDifficulty(value) {
  const difficulty = Number.parseInt(value, 10);
  if (!Number.isFinite(difficulty)) {
    return 3;
  }

  return Math.max(1, Math.min(10, difficulty));
}

function rationalityRandomChoice(values) {
  if (typeof randomChoice === "function") {
    return randomChoice(values);
  }

  return values[Math.floor(Math.random() * values.length)];
}

function rationalityShuffleArray(values) {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

globalThis.HomeworkQuestions?.register({
  id: "rationality",
  label: "Rationality",
  getStaticQuestions: () => RATIONALITY_ACTIVE_QUESTIONS,
  generatedEntryFactory: createRationalityGeneratedEntry,
  generatedShare: 0.7,
});

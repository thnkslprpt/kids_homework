(() => {
  const TOPICS = {
    instructions: "Precise step-by-step instructions",
    algorithms: "Algorithms",
    conditions: "Conditions: if/then/else",
    loops: "Loops and repetition",
    variables: "Variables and changing state",
    boolean: "Boolean logic",
  };

  function computingQuestion(topic, difficulty, question, options, answer, reviewText) {
    const normalizedOptions = Array.from(new Set(options.map((option) => String(option).trim())));
    const normalizedAnswer = String(answer).trim();

    if (!Object.values(TOPICS).includes(topic)) {
      throw new Error(`Unknown Computing topic: ${topic}`);
    }
    if (!String(question).trim()) {
      throw new Error("Computing question is missing its prompt.");
    }
    if (normalizedOptions.length !== 4 || !normalizedOptions.includes(normalizedAnswer)) {
      throw new Error(`Computing question must have four unique options including its answer: ${question}`);
    }

    return {
      topic,
      difficulty,
      question: String(question),
      options: normalizedOptions,
      answer: normalizedAnswer,
      reviewText: String(reviewText || ""),
    };
  }

  const q = computingQuestion;
  const COMPUTING_QUESTIONS = [
    // Level 1: recognize clear instructions and the simplest program ideas.
    q(TOPICS.instructions, 1, "Which instruction tells a person exactly what to do?", ["Put the red block in the box", "Do something with the block", "Move it over there", "Make the blocks nice"], "Put the red block in the box", "Clear instructions name the object, the action, and the destination."),
    q(TOPICS.algorithms, 1, "You want to put on your shoes. Which sequence is in the correct order?", ["Put on socks, put on shoes, tie the laces", "Tie the laces, put on shoes, put on socks", "Put on shoes, put on socks, tie the laces", "Put on socks, tie the laces, put on shoes"], "Put on socks, put on shoes, tie the laces", "An algorithm is an ordered set of steps. Some steps must happen before others."),
    q(TOPICS.conditions, 1, "A rule says: IF it is raining, THEN take an umbrella. It is raining. What should you take?", ["An umbrella", "Sunglasses", "A football", "Nothing"], "An umbrella", "The action after THEN happens when the IF condition is true."),
    q(TOPICS.loops, 1, "A robot repeats CLAP 3 times. How many claps does it make?", ["1", "2", "3", "4"], "3", "Repeating one clap three times produces three claps."),
    q(TOPICS.variables, 1, "A game starts with score = 0. You earn 1 point. What is the score now?", ["0", "1", "2", "10"], "1", "The score variable changes from 0 to 1."),
    q(TOPICS.boolean, 1, "A light can be ON or OFF. The light is ON. Is the statement ‘The light is on’ true or false?", ["True", "False", "Both true and false", "It cannot be checked"], "True", "A Boolean statement has one of two values: true or false."),

    // Level 2: follow one rule or update and spot an obvious missing step.
    q(TOPICS.instructions, 2, "These steps are meant to make toast: 1. Put bread in the toaster. 2. Wait for it to pop up. 3. Eat the toast. Which important step is missing?", ["Push the toaster lever down", "Put the toast on a bookshelf", "Cut the toaster cord", "Freeze the bread afterward"], "Push the toaster lever down", "The toaster must be started before waiting for the toast to pop up."),
    q(TOPICS.algorithms, 2, "Which sequence correctly sorts three number cards from smallest to largest?", ["Find the smallest card and place it first; then order the two cards left", "Place any card first and stop", "Hide the largest card; then mix the others", "Turn every card face down and guess"], "Find the smallest card and place it first; then order the two cards left", "This method gives a clear next step and finishes with every card in order."),
    q(TOPICS.conditions, 2, "A lamp uses this rule: IF the switch is on, turn the lamp on; ELSE turn it off. The switch is off. What does the lamp do?", ["It turns off", "It turns on", "It flashes twice", "It changes color"], "It turns off", "A false IF condition follows the ELSE branch."),
    q(TOPICS.loops, 2, "Which loop replaces these commands: JUMP, JUMP, JUMP, JUMP?", ["Repeat JUMP 4 times", "Repeat JUMP 2 times", "Repeat STOP 4 times", "JUMP once, then stop"], "Repeat JUMP 4 times", "A loop can express the same repeated command more clearly."),
    q(TOPICS.variables, 2, "A player has 3 lives and loses 1 life. Which update is correct?", ["lives = 2", "lives = 3", "lives = 4", "lives = 30"], "lives = 2", "Losing one changes the stored number of lives from 3 to 2."),
    q(TOPICS.boolean, 2, "A door opens when the button is pressed AND the door is unlocked. The button is pressed, but the door is locked. Does it open?", ["No", "Yes", "Only because the button is pressed", "It must open twice"], "No", "AND is true only when both conditions are true."),

    // Level 3: trace short sequences and distinguish AND from OR.
    q(TOPICS.instructions, 3, "A route says: ‘Walk to the corner, then turn.’ Why is the last step ambiguous?", ["It does not say whether to turn left or right", "Corners cannot be reached", "Walking is never allowed in a route", "A route may contain only one step"], "It does not say whether to turn left or right", "A person cannot reliably follow ‘turn’ without knowing the direction."),
    q(TOPICS.algorithms, 3, "Start at 4. Algorithm A says ‘add 2, then double.’ Algorithm B says ‘double, then add 2.’ What is true?", ["A gives 12 and B gives 10", "Both give 12", "A gives 10 and B gives 12", "Both give 10"], "A gives 12 and B gives 10", "Order matters: (4 + 2) × 2 = 12, while (4 × 2) + 2 = 10."),
    q(TOPICS.conditions, 3, "A thermostat rule says: IF temperature is below 20°C, turn heating on; ELSE turn it off. The temperature is 22°C. What happens?", ["The heating turns off", "The heating turns on", "The temperature becomes 20°C immediately", "The rule cannot run"], "The heating turns off", "22°C is not below 20°C, so the ELSE action runs."),
    q(TOPICS.loops, 3, "A robot repeats these two commands 3 times: FORWARD, CLAP. How many commands does it run altogether?", ["5", "6", "3", "9"], "6", "Each repeat runs two commands, so 3 × 2 = 6 commands."),
    q(TOPICS.variables, 3, "A score starts at 5. The player gains 3 points, then loses 2 points. What is the final score?", ["6", "4", "8", "10"], "6", "Update the same score in order: 5 + 3 = 8, then 8 − 2 = 6."),
    q(TOPICS.boolean, 3, "You may choose fruit if it is an apple OR a banana. The fruit is a banana. Is the rule true?", ["Yes", "No", "Only if it is also an apple", "Only if there is no fruit"], "Yes", "OR is true when at least one of its conditions is true."),

    // Level 4: debug exact instructions and trace two-step logic.
    q(TOPICS.instructions, 4, "A sandwich algorithm says: 1. Put cheese on one slice of bread. 2. Put lettuce on the cheese. 3. Cut the sandwich in half. What step is needed before step 3?", ["Place the second slice of bread on top", "Remove the first slice of bread", "Put the plate in a drawer", "Cut the cheese into zero pieces"], "Place the second slice of bread on top", "Without closing the sandwich, the instruction to cut ‘the sandwich’ is incomplete."),
    q(TOPICS.algorithms, 4, "Two algorithms both find the largest number in a list. One checks every number once; the other checks every number three times. If both are correct, which is usually more efficient?", ["The one that checks each number once", "The one that checks each number three times", "They always take exactly the same time", "The one that does not read the list"], "The one that checks each number once", "Doing fewer necessary checks usually takes less time while producing the same result."),
    q(TOPICS.conditions, 4, "A game uses: IF score is at least 10, show ‘You win’; ELSE show ‘Keep trying.’ The score is exactly 10. What is shown?", ["You win", "Keep trying", "Score too high", "Nothing"], "You win", "‘At least 10’ includes 10."),
    q(TOPICS.loops, 4, "A loop starts with step = 1 and repeats: MOVE 2 squares; increase step by 1. It repeats 4 times. How many squares does the robot move?", ["8", "4", "6", "10"], "8", "The robot moves 2 squares on each of 4 repeats: 2 × 4 = 8."),
    q(TOPICS.variables, 4, "A robot’s position starts at 2. It moves forward 4 spaces, then backward 1 space. What value should position store at the end?", ["5", "3", "6", "7"], "5", "The state changes in order: 2 + 4 − 1 = 5."),
    q(TOPICS.boolean, 4, "An alarm sounds if a window is open OR a door is open. Both are closed. Does the alarm sound?", ["No", "Yes", "Only for the window", "Only for the door"], "No", "OR is false when both conditions are false."),

    // Level 5: apply compound rules and count loop effects.
    q(TOPICS.instructions, 5, "A drawing instruction says, ‘Draw a small circle beside the square.’ Which change makes it precise?", ["Draw a circle 2 cm wide, 1 cm to the right of the square", "Draw a nicer circle somewhere", "Draw a shape close by", "Make the picture look correct"], "Draw a circle 2 cm wide, 1 cm to the right of the square", "The improved instruction defines both size and position."),
    q(TOPICS.algorithms, 5, "Start with 7. An algorithm says: subtract 1; multiply by 3; add 2. What result does it produce?", ["20", "18", "22", "26"], "20", "Follow the steps in order: 7 − 1 = 6, 6 × 3 = 18, and 18 + 2 = 20."),
    q(TOPICS.conditions, 5, "A school alarm uses: IF smoke is detected, sound the alarm; ELSE IF a test button is pressed, play a test sound; ELSE stay silent. There is no smoke, and the test button is pressed. What happens?", ["It plays a test sound", "It sounds the smoke alarm", "It stays silent", "It turns off the test button"], "It plays a test sound", "The first condition is false, so the next condition is checked and its action runs."),
    q(TOPICS.loops, 5, "A character starts with 0 coins. A loop repeats 5 times: collect 2 coins. How many coins are stored at the end?", ["10", "7", "5", "2"], "10", "Five repeats add 2 coins each, for 5 × 2 = 10."),
    q(TOPICS.variables, 5, "A game starts with score = 10 and bonus = 2. It runs score = score + bonus, then bonus = bonus + 1. What are the new values?", ["score = 12, bonus = 3", "score = 13, bonus = 3", "score = 12, bonus = 2", "score = 10, bonus = 3"], "score = 12, bonus = 3", "The score uses the old bonus value 2; afterward the bonus increases to 3."),
    q(TOPICS.boolean, 5, "A file can be opened if the user is the owner OR has permission. Nila is not the owner, but she has permission. Can she open it?", ["Yes", "No", "Only if she becomes the owner", "Only if permission is false"], "Yes", "With OR, either valid condition is enough."),

    // Level 6: reason about preconditions, nested loops, and NOT.
    q(TOPICS.instructions, 6, "A robot is told: ‘Move forward 3 squares, then turn right.’ What must be stated before these steps so the final location is predictable?", ["The robot’s starting square and starting direction", "The robot’s favorite color", "The time the program was written", "The name of every square"], "The robot’s starting square and starting direction", "Movement instructions need a known starting state to produce one predictable final state."),
    q(TOPICS.algorithms, 6, "Algorithm A checks a list from the beginning until it finds the name. Algorithm B always checks every name. If the name is first, which uses fewer checks?", ["Algorithm A", "Algorithm B", "They both use every possible check", "Neither algorithm can find the first name"], "Algorithm A", "Algorithm A stops after its first successful check; Algorithm B continues through the list."),
    q(TOPICS.conditions, 6, "A rule says: IF temperature is below 18°C, heat; ELSE IF it is above 24°C, cool; ELSE do nothing. The temperature is 21°C. What happens?", ["Do nothing", "Heat", "Cool", "Heat and cool together"], "Do nothing", "21°C is neither below 18°C nor above 24°C, so the final ELSE branch runs."),
    q(TOPICS.loops, 6, "An outer loop repeats 3 times. Each time, an inner loop claps 4 times. How many claps occur?", ["12", "7", "4", "3"], "12", "The inner action runs 4 times for each of 3 outer repeats: 3 × 4 = 12."),
    q(TOPICS.variables, 6, "Let x = 4 and y = 7. Run x = y, then y = x. What are the final values?", ["x = 7, y = 7", "x = 7, y = 4", "x = 4, y = 7", "x = 4, y = 4"], "x = 7, y = 7", "After x becomes 7, the second instruction copies that new value into y as well."),
    q(TOPICS.boolean, 6, "A message is sent when NOT(muted) is true. The device is muted. Is the message sent?", ["No", "Yes", "Only twice", "The rule has no truth value"], "No", "Muted is true, so NOT(muted) is false."),

    // Level 7: compare correctness, trace boundaries, and combine Boolean operators.
    q(TOPICS.instructions, 7, "A recipe begins, ‘Bake for 20 minutes at 180°C.’ Which missing instruction could make different people get different results?", ["Whether to preheat the oven to 180°C first", "The color of the oven door", "The day the recipe was printed", "The shape of the kitchen clock"], "Whether to preheat the oven to 180°C first", "Starting in a cold oven and a preheated oven can produce different results."),
    q(TOPICS.algorithms, 7, "An algorithm claims to find the smallest number but only compares the first two items in a list. Which list is a counterexample showing it can fail?", ["8, 5, 2", "2, 5", "3, 3", "1, 4"], "8, 5, 2", "After comparing only 8 and 5, it would miss the smaller value 2 later in the list."),
    q(TOPICS.conditions, 7, "A delivery rule says: IF distance is 0–5 km, charge 10; ELSE IF distance is 6–10 km, charge 15; ELSE charge 25. What is the charge for 10 km?", ["15", "10", "25", "35"], "15", "The second range includes its upper boundary of 10 km."),
    q(TOPICS.loops, 7, "A loop runs with count = 1, 2, 3, 4. Each time it adds count to total, which starts at 0. What is the final total?", ["10", "8", "4", "16"], "10", "The loop accumulates 1 + 2 + 3 + 4 = 10."),
    q(TOPICS.variables, 7, "A game begins with energy = 12. Repeat 3 times: energy = energy − 2. Then add 5. What is the final energy?", ["11", "6", "9", "13"], "11", "Three updates remove 6 energy, leaving 6; adding 5 gives 11."),
    q(TOPICS.boolean, 7, "A gate opens if (has ticket AND ticket is valid) OR is staff. Omri has no ticket but is staff. Does the gate open?", ["Yes", "No", "Only with an invalid ticket", "Only if staff is false"], "Yes", "The staff condition makes the OR expression true even though the ticket condition is false."),

    // Level 8: reason about termination and changing conditions.
    q(TOPICS.instructions, 8, "A search instruction says, ‘Keep checking boxes until you find the key.’ What should be added so the process is complete even if the key is absent?", ["After the last box, report ‘key not found’ and stop", "Check the first box forever", "Assume the key must be present", "Open random boxes without tracking them"], "After the last box, report ‘key not found’ and stop", "A complete procedure states what to do when the expected item is not found."),
    q(TOPICS.algorithms, 8, "Algorithm A sorts cards correctly only when all numbers are different. Algorithm B also handles equal numbers. The input is 4, 2, 4. Which algorithm is guaranteed to work from this information?", ["Algorithm B only", "Algorithm A only", "Both are guaranteed", "Neither can ever sort cards"], "Algorithm B only", "The input contains equal values, which is outside Algorithm A’s stated valid inputs."),
    q(TOPICS.conditions, 8, "A loop continues WHILE battery > 20%. The battery values after each check are 50%, 35%, 20%, 10%. At which value does the loop first stop?", ["20%", "35%", "10%", "50%"], "20%", "The condition uses greater than, not greater than or equal to; 20 > 20 is false."),
    q(TOPICS.loops, 8, "A robot repeats 4 times: move forward 1 square, then repeat CLAP 2 times. How many commands does it perform altogether?", ["12", "8", "6", "16"], "12", "Each outer repeat performs 1 move and 2 claps, so 4 × 3 = 12 commands."),
    q(TOPICS.variables, 8, "Let a = 3 and b = 8. Run temp = a; a = b; b = temp. What are a and b at the end?", ["a = 8, b = 3", "a = 8, b = 8", "a = 3, b = 3", "a = 3, b = 8"], "a = 8, b = 3", "The temporary variable preserves the old value of a while the two values are swapped."),
    q(TOPICS.boolean, 8, "Which row makes (A OR B) AND NOT B true?", ["A = true, B = false", "A = false, B = false", "A = true, B = true", "A = false, B = true"], "A = true, B = false", "A OR B must be true, and NOT B requires B to be false; therefore A must be true."),

    // Level 9: analyze edge cases, invariants, and compound expressions.
    q(TOPICS.instructions, 9, "A route says: ‘At each intersection, take the road with the shortest name.’ What ambiguity must be resolved for the route to be deterministic?", ["What to do if two road names have the same length", "Whether roads have names", "Whether intersections connect roads", "What letters look like"], "What to do if two road names have the same length", "A deterministic instruction needs a tie-breaking rule when two choices are equally valid."),
    q(TOPICS.algorithms, 9, "An algorithm repeatedly subtracts 3 from a positive number until the number equals 0. For which input will it never reach exactly 0?", ["10", "12", "9", "6"], "10", "Starting at 10 gives 7, 4, 1, −2, so equality with 0 never occurs."),
    q(TOPICS.conditions, 9, "A program uses: IF age < 12, price = 5; ELSE IF age < 18, price = 8; ELSE price = 12. What price is assigned at age 12?", ["8", "5", "12", "No price"], "8", "At 12, age < 12 is false but age < 18 is true."),
    q(TOPICS.loops, 9, "A nested loop uses row = 1 to 3. For each row, column runs from 1 to row. How many times does the inner action run altogether?", ["6", "3", "9", "12"], "6", "The inner action runs 1 time, then 2 times, then 3 times: 1 + 2 + 3 = 6."),
    q(TOPICS.variables, 9, "A counter starts at 1. Repeat 4 times: counter = counter × 2. What values does it hold after each update?", ["2, 4, 8, 16", "1, 2, 3, 4", "2, 3, 4, 5", "4, 8, 12, 16"], "2, 4, 8, 16", "Each update doubles the current state, not the original value."),
    q(TOPICS.boolean, 9, "An account is allowed access when (passwordCorrect AND NOT locked) OR adminOverride. The password is correct, the account is locked, and adminOverride is false. Is access allowed?", ["No", "Yes", "Only because the password is correct", "Only because the account is locked"], "No", "The locked account makes the AND part false, and the override is also false."),

    // Level 10: specify robust algorithms and reason about subtle state changes.
    q(TOPICS.instructions, 10, "A drawing procedure says, ‘Repeat: move 10 pixels and turn 90°, until you return to the start.’ Which extra rule prevents an endless run if rounding error means the position is never exactly the start?", ["Stop after 4 turns, or when sufficiently close to the start", "Move a random distance each time", "Ignore the starting position", "Turn by a different random angle each time"], "Stop after 4 turns, or when sufficiently close to the start", "A maximum iteration count and a tolerance give the procedure a reliable stopping condition."),
    q(TOPICS.algorithms, 10, "Two search algorithms are correct. A checks every item in order. B repeatedly halves a sorted list. For a very large sorted list, why is B usually faster?", ["Each check removes about half of the remaining possibilities", "It never checks any items", "Sorted lists contain only one item", "It always finds the answer on its first check"], "Each check removes about half of the remaining possibilities", "Halving the remaining search space needs far fewer checks as the list grows."),
    q(TOPICS.conditions, 10, "A discount program uses two separate rules: IF member, subtract 10%; IF coupon, subtract 5%. A member also has a coupon. What happens if both IF statements run?", ["Both discounts are applied", "Only the member discount is applied", "Only the coupon discount is applied", "Neither discount is applied"], "Both discounts are applied", "Separate IF statements are each tested; this differs from an IF/ELSE IF chain."),
    q(TOPICS.loops, 10, "A loop starts n = 20 and repeats while n > 1: replace n with floor(n / 2). What values does n take after each repeat?", ["10, 5, 2, 1", "10, 5, 3, 2", "19, 18, 17, 16", "20, 10, 5, 2"], "10, 5, 2, 1", "Integer division rounds down after each update: 20 → 10 → 5 → 2 → 1."),
    q(TOPICS.variables, 10, "Let x = 2. Run x = x + 3, then x = x × x. What is the final value of x?", ["25", "10", "13", "7"], "25", "The second instruction uses the updated value 5, so x becomes 5 × 5 = 25."),
    q(TOPICS.boolean, 10, "Which expression is equivalent to NOT(A AND B)?", ["(NOT A) OR (NOT B)", "(NOT A) AND (NOT B)", "A OR B", "A AND B"], "(NOT A) OR (NOT B)", "An AND statement is false when at least one part is false, which is De Morgan’s law."),
  ];

  globalThis.COMPUTING_QUESTION_COVERAGE = Object.fromEntries(
    Object.values(TOPICS).map((topic) => [
      topic,
      COMPUTING_QUESTIONS.filter((question) => question.topic === topic).map((question) => question.difficulty),
    ])
  );

  globalThis.HomeworkQuestions?.register({
    id: "computing",
    label: "Computing",
    getStaticQuestions: () => COMPUTING_QUESTIONS,
  });
})();

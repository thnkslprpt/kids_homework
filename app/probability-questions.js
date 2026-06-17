function probabilityClampDifficulty(value) {
  const level = Number.parseInt(value, 10);
  if (!Number.isFinite(level)) {
    return 3;
  }
  return Math.max(1, Math.min(10, level));
}

function probabilityRandomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function probabilityRandomChoice(values) {
  return values[Math.floor(Math.random() * values.length)];
}

function probabilityShuffleArray(values) {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function probabilityUniqueStrings(values) {
  return Array.from(new Set(values.map((value) => String(value))));
}

function probabilityGreatestCommonDivisor(left, right) {
  let a = Math.abs(Number(left));
  let b = Math.abs(Number(right));
  while (b) {
    const next = a % b;
    a = b;
    b = next;
  }
  return a || 1;
}

function probabilityFormatFraction(numerator, denominator) {
  if (numerator === 0) {
    return "0";
  }
  if (numerator === denominator) {
    return "1";
  }
  const divisor = probabilityGreatestCommonDivisor(numerator, denominator);
  return `${numerator / divisor}/${denominator / divisor}`;
}

function probabilityFormatPercent(numerator, denominator) {
  const percent = (numerator / denominator) * 100;
  return `${Number.isInteger(percent) ? percent : percent.toFixed(1)}%`;
}

function probabilityMakeOptions(answer, distractors) {
  const normalizedAnswer = String(answer);
  const fallbackDistractors = [
    "0",
    "1/10",
    "1/8",
    "1/6",
    "1/5",
    "1/4",
    "1/3",
    "1/2",
    "2/3",
    "3/4",
    "5/6",
    "1",
    "10%",
    "20%",
    "25%",
    "30%",
    "40%",
    "50%",
    "60%",
    "75%",
    "90%",
    "Impossible",
    "Unlikely",
    "Equally likely",
    "Likely",
    "Certain",
    "Not enough information",
  ];
  const options = probabilityUniqueStrings([normalizedAnswer, ...distractors, ...fallbackDistractors])
    .filter((option) => option !== "" && option !== normalizedAnswer)
    .slice(0, 3);
  const allOptions = probabilityUniqueStrings([normalizedAnswer, ...options]);

  if (allOptions.length !== 4 || !allOptions.includes(normalizedAnswer)) {
    throw new Error(`Probability question must have exactly 4 unique choices: ${normalizedAnswer}`);
  }

  return probabilityShuffleArray(allOptions);
}

function probabilityStaticQuestion(question, answer, distractors, difficulty, displayText = "") {
  const entry = {
    question: String(question),
    options: probabilityMakeOptions(answer, distractors),
    answer: String(answer),
    difficulty: probabilityClampDifficulty(difficulty),
  };

  if (displayText) {
    entry.displayText = String(displayText);
  }

  return entry;
}

const PROBABILITY_QUESTIONS = [
  // Level 1: likely, unlikely, certain, impossible, and one-step chance language.
  probabilityStaticQuestion(
    "A bag has 5 red marbles and 1 blue marble. Which color are you more likely to pick?",
    "Red",
    ["Blue", "Both are equally likely", "Neither color can be picked"],
    1
  ),
  probabilityStaticQuestion(
    "A spinner has 4 equal parts and only 1 part is green. What is the chance of landing on green?",
    "1/4",
    ["1/2", "1/3", "1/5"],
    1
  ),
  probabilityStaticQuestion(
    "A bag has 4 yellow marbles and 4 green marbles. Which statement is true about picking yellow or green?",
    "Yellow and green are equally likely",
    ["Yellow is more likely", "Green is more likely", "Neither can be picked"],
    1
  ),
  probabilityStaticQuestion(
    "A spinner has 3 red parts and 1 blue part. Which color is more likely to land on?",
    "Red",
    ["Blue", "They are equally likely", "Neither can happen"],
    1
  ),
  probabilityStaticQuestion(
    "If you flip a fair coin once, which result is possible?",
    "Heads",
    ["2", "Blue", "A shoe"],
    1
  ),
  probabilityStaticQuestion(
    "If you pick 1 marble without looking from a bag with only purple marbles, how likely is it to be purple?",
    "Certain",
    ["Impossible", "Unlikely", "Less than half likely"],
    1
  ),
  probabilityStaticQuestion(
    "A box has 6 blue counters and 2 red counters. Which color are you less likely to pick?",
    "Red",
    ["Blue", "They are equally likely", "Neither can be picked"],
    1
  ),
  probabilityStaticQuestion(
    "A fair spinner has 2 equal sections, one orange and one white. What is true?",
    "Orange and white are equally likely",
    ["Orange is more likely", "White is more likely", "Neither can happen"],
    1
  ),
  probabilityStaticQuestion(
    "A lunch basket has 6 apples and 2 bananas. Which snack are you more likely to pick without looking?",
    "Apple",
    ["Banana", "They are equally likely", "Neither can be picked"],
    1
  ),
  probabilityStaticQuestion(
    "A spinner has 5 equal parts: 4 are blue and 1 is yellow. Which color is less likely?",
    "Yellow",
    ["Blue", "They are equally likely", "Neither can happen"],
    1
  ),

  // Additional Level 1 questions: expanded variety.
  probabilityStaticQuestion(
    "A bag has 3 red marbles and 1 green marble. Which color are you more likely to pick?",
    "Red",
    ["Green", "They are equally likely", "Neither color can be picked"],
    1
  ),
  probabilityStaticQuestion(
    "A spinner has 6 equal parts and only 1 part is black. What is the chance of landing on black?",
    "1/6",
    ["1/2", "1/3", "1/4"],
    1
  ),
  probabilityStaticQuestion(
    "A jar has only star stickers. How likely is it to pick a star sticker?",
    "Certain",
    ["Impossible", "Unlikely", "Equally likely"],
    1
  ),
  probabilityStaticQuestion(
    "A box has only red cubes. How likely is it to pick a blue cube?",
    "Impossible",
    ["Certain", "Likely", "Equally likely"],
    1
  ),
  probabilityStaticQuestion(
    "A basket has 2 pears and 6 oranges. Which fruit are you more likely to pick without looking?",
    "Orange",
    ["Pear", "They are equally likely", "Neither can be picked"],
    1
  ),
  probabilityStaticQuestion(
    "A fair spinner has 2 equal sections, one yellow and one pink. What is true?",
    "Yellow and pink are equally likely",
    ["Yellow is more likely", "Pink is more likely", "Neither can happen"],
    1
  ),
  probabilityStaticQuestion(
    "A bag has 1 black counter and 5 white counters. Which color are you less likely to pick?",
    "Black",
    ["White", "They are equally likely", "Neither can be picked"],
    1
  ),
  probabilityStaticQuestion(
    "If you flip a fair coin once, which result is possible?",
    "Tails",
    ["Purple", "7", "A sandwich"],
    1
  ),
  probabilityStaticQuestion(
    "A box has 5 square blocks and no circle blocks. How likely is it to pick a circle block?",
    "Impossible",
    ["Certain", "Likely", "Equally likely"],
    1
  ),
  probabilityStaticQuestion(
    "A spinner has 3 green sections and 3 purple sections. Which statement is true?",
    "Green and purple are equally likely",
    ["Green is more likely", "Purple is more likely", "Neither can happen"],
    1
  ),

  // Level 2: simple die facts and simple fractions out of a total.
  probabilityStaticQuestion(
    "Which result is impossible on a standard 6-sided die?",
    "7",
    ["2", "4", "6"],
    2
  ),
  probabilityStaticQuestion(
    "If you flip a fair coin once, what is true?",
    "Heads and tails are equally likely",
    ["Heads is more likely", "Tails is more likely", "Neither heads nor tails can happen"],
    2
  ),
  probabilityStaticQuestion(
    "What is the chance of rolling a number greater than 4 on a standard 6-sided die?",
    "1/3",
    ["1/6", "1/2", "2/3"],
    2
  ),
  probabilityStaticQuestion(
    "A bag has 1 red marble and 9 blue marbles. What is the chance of picking red?",
    "1/10",
    ["1/5", "1/2", "9/10"],
    2
  ),
  probabilityStaticQuestion(
    "A spinner has 2 blue sections and 6 red sections. Which color is more likely to land on?",
    "Red",
    ["Blue", "They are equally likely", "Neither"],
    2
  ),
  probabilityStaticQuestion(
    "A bag has 2 yellow marbles and 2 green marbles. What is true?",
    "They are equally likely",
    ["Yellow is more likely", "Green is more likely", "Neither can be picked"],
    2
  ),
  probabilityStaticQuestion(
    "A spinner has 5 equal sections and only 1 section is red. What is the chance of landing on red?",
    "1/5",
    ["1/2", "1/3", "1/4"],
    2
  ),
  probabilityStaticQuestion(
    "Which number cannot be rolled on a standard 6-sided die?",
    "0",
    ["1", "3", "6"],
    2
  ),
  probabilityStaticQuestion(
    "A deck has 3 star cards and 1 moon card. What is the chance of picking a moon card?",
    "1/4",
    ["1/2", "1/3", "3/4"],
    2
  ),
  probabilityStaticQuestion(
    "A bowl has 2 chocolate cookies and 6 vanilla cookies. Which cookie is more likely to be picked?",
    "Vanilla",
    ["Chocolate", "They are equally likely", "Neither can be picked"],
    2
  ),

  // Additional Level 2 questions: expanded variety.
  probabilityStaticQuestion(
    "What is the chance of rolling a 3 on a standard 6-sided die?",
    "1/6",
    ["1/2", "1/3", "1/4"],
    2
  ),
  probabilityStaticQuestion(
    "A bag has 3 red marbles and 6 blue marbles. What is the chance of picking red?",
    "1/3",
    ["1/2", "2/3", "3/6"],
    2
  ),
  probabilityStaticQuestion(
    "A spinner has 4 red sections and 4 green sections. What is true?",
    "Red and green are equally likely",
    ["Red is more likely", "Green is more likely", "Neither can happen"],
    2
  ),
  probabilityStaticQuestion(
    "What is the chance of rolling a number less than 3 on a standard 6-sided die?",
    "1/3",
    ["1/6", "1/2", "2/3"],
    2
  ),
  probabilityStaticQuestion(
    "A bag has 7 blue marbles and 1 yellow marble. Which color is less likely to be picked?",
    "Yellow",
    ["Blue", "They are equally likely", "Neither can be picked"],
    2
  ),
  probabilityStaticQuestion(
    "A small deck has 2 sun cards and 6 star cards. What is the chance of picking a sun card?",
    "1/4",
    ["1/2", "1/3", "3/4"],
    2
  ),
  probabilityStaticQuestion(
    "A spinner has 10 equal sections and 5 sections are shaded. What is the chance of landing on a shaded section?",
    "1/2",
    ["1/5", "1/10", "3/10"],
    2
  ),
  probabilityStaticQuestion(
    "Which result is impossible on a standard 6-sided die?",
    "9",
    ["1", "4", "6"],
    2
  ),
  probabilityStaticQuestion(
    "When flipping a fair coin, how likely is it to land on red?",
    "Impossible",
    ["Certain", "Equally likely", "Likely"],
    2
  ),
  probabilityStaticQuestion(
    "A bag has 3 red marbles and 3 blue marbles. What is the chance of picking red?",
    "1/2",
    ["1/3", "1/6", "2/3"],
    2
  ),

  // Level 3: comparing probabilities and reading fractions from small models.
  probabilityStaticQuestion(
    "A basket has 3 apples and 3 oranges. Which is true if you pick 1 fruit without looking?",
    "Apple and orange are equally likely",
    ["Apple is more likely", "Orange is more likely", "Neither fruit can be picked"],
    3
  ),
  probabilityStaticQuestion(
    "Which event is more likely to happen?",
    "Picking blue from a bag with 8 blue and 2 red marbles",
    [
      "Picking blue from a bag with 5 blue and 5 red marbles",
      "They are equally likely",
      "Neither can happen",
    ],
    3
  ),
  probabilityStaticQuestion(
    "A box has 3 red balls and 1 blue ball. What fraction of the balls are blue?",
    "1/4",
    ["1/2", "1/3", "3/4"],
    3
  ),
  probabilityStaticQuestion(
    "A bag with 5 red, 5 blue, and 10 green marbles: which color is most likely?",
    "Green",
    ["Red", "Blue", "Red and blue together"],
    3
  ),
  probabilityStaticQuestion(
    "Which is less likely?",
    "Picking black from a bag with 2 black and 8 white marbles",
    [
      "Picking black from a bag with 5 black and 5 white marbles",
      "They are equally likely",
      "Neither can happen",
    ],
    3
  ),
  probabilityStaticQuestion(
    "If you flip 2 fair coins, how many possible outcomes are there altogether?",
    "4",
    ["2", "3", "6"],
    3
  ),
  probabilityStaticQuestion(
    "In a bag with 7 red marbles and 3 green marbles, what is the chance of picking green?",
    "3/10",
    ["7/10", "1/2", "1/10"],
    3
  ),
  probabilityStaticQuestion(
    "A spinner has 8 equal sections, and 3 of them are purple. What is the chance of purple?",
    "3/8",
    ["5/8", "1/4", "1/8"],
    3
  ),
  probabilityStaticQuestion(
    "A standard deck has 4 suits: hearts, diamonds, clubs, and spades. What is the chance of picking a heart if each suit is equally likely?",
    "1/4",
    ["1/2", "1/3", "3/4"],
    3
  ),
  probabilityStaticQuestion(
    "A game spinner has 3 win spaces and 7 lose spaces. Is winning more likely or less likely than losing?",
    "Less likely",
    ["More likely", "Equally likely", "Certain"],
    3
  ),

  // Additional Level 3 questions: expanded variety.
  probabilityStaticQuestion(
    "A bag has 4 red marbles and 6 blue marbles. What is the chance of picking red?",
    "2/5",
    ["3/5", "1/2", "4/6"],
    3
  ),
  probabilityStaticQuestion(
    "A spinner has 8 equal sections, and 5 of them are red. What is the chance of red?",
    "5/8",
    ["3/8", "1/2", "1/8"],
    3
  ),
  probabilityStaticQuestion(
    "Bag A has 6 blue marbles and 4 red marbles. Bag B has 4 blue marbles and 6 red marbles. Which bag gives a better chance of picking blue?",
    "Bag A",
    ["Bag B", "They are equally likely", "Neither bag can give blue"],
    3
  ),
  probabilityStaticQuestion(
    "If you flip 2 fair coins, what is the chance that both coins show the same side?",
    "1/2",
    ["1/4", "3/4", "1/3"],
    3
  ),
  probabilityStaticQuestion(
    "What is the chance of rolling an odd number on a standard 6-sided die?",
    "1/2",
    ["1/6", "1/3", "2/3"],
    3
  ),
  probabilityStaticQuestion(
    "A box has 2 red balls, 3 blue balls, and 5 green balls. Which color is most likely to be picked?",
    "Green",
    ["Red", "Blue", "All are equally likely"],
    3
  ),
  probabilityStaticQuestion(
    "A number card is chosen from cards 1 through 10. What is the chance of choosing an even number?",
    "1/2",
    ["1/5", "2/5", "3/5"],
    3
  ),
  probabilityStaticQuestion(
    "A spinner has 12 equal sections, and 3 of them are blue. What is the chance of blue?",
    "1/4",
    ["1/3", "1/2", "3/4"],
    3
  ),
  probabilityStaticQuestion(
    "A bag has 1 red marble, 4 blue marbles, and 5 yellow marbles. Which color is least likely to be picked?",
    "Red",
    ["Blue", "Yellow", "All are equally likely"],
    3
  ),
  probabilityStaticQuestion(
    "A spinner has 4 equal color sections, and 1 section is green. What is the chance of not landing on green?",
    "3/4",
    ["1/4", "1/2", "1/3"],
    3
  ),

  // Level 4: die events, complements, and sample spaces.
  probabilityStaticQuestion(
    "What is the chance of rolling an even number on a standard 6-sided die?",
    "1/2",
    ["1/6", "1/3", "2/3"],
    4
  ),
  probabilityStaticQuestion(
    "If you pick 1 marble without looking from a bag with only green marbles, how likely is it to be green?",
    "Certain",
    ["Impossible", "Unlikely", "Less than half likely"],
    4
  ),
  probabilityStaticQuestion(
    "If you toss 3 coins, how many possible outcomes are there altogether?",
    "8",
    ["4", "6", "12"],
    4
  ),
  probabilityStaticQuestion(
    "What is the chance of rolling a 6 on a standard 6-sided die?",
    "1/6",
    ["1/3", "1/2", "5/6"],
    4
  ),
  probabilityStaticQuestion(
    "When you flip two coins, which result cannot happen?",
    "Three heads",
    ["Two heads", "Two tails", "One head and one tail"],
    4
  ),
  probabilityStaticQuestion(
    "On a fair 6-sided die, what is the chance of rolling a 1 or 2?",
    "1/3",
    ["1/6", "1/2", "2/3"],
    4
  ),
  probabilityStaticQuestion(
    "A bag has 4 red marbles, 4 blue marbles, and 2 green marbles. Which color is least likely?",
    "Green",
    ["Red", "Blue", "Red and blue together"],
    4
  ),
  probabilityStaticQuestion(
    "A bag has 3 red marbles and 7 blue marbles. What is the chance of not picking red?",
    "7/10",
    ["3/10", "1/2", "1/3"],
    4
  ),
  probabilityStaticQuestion(
    "A number card is chosen from cards 1 through 8. What is the chance of not choosing an even number?",
    "1/2",
    ["1/4", "3/4", "1/8"],
    4
  ),
  probabilityStaticQuestion(
    "A normal die is rolled. Which is more likely?",
    "Rolling a number greater than 2",
    ["Rolling a 1", "They are equally likely", "Rolling a 7"],
    4
  ),

  // Additional Level 4 questions: expanded variety.
  probabilityStaticQuestion(
    "What is the chance of not rolling a 6 on a standard 6-sided die?",
    "5/6",
    ["1/6", "1/2", "2/3"],
    4
  ),
  probabilityStaticQuestion(
    "A number card is chosen from cards 1 through 6. What is the chance of choosing a number greater than 3?",
    "1/2",
    ["1/6", "1/3", "2/3"],
    4
  ),
  probabilityStaticQuestion(
    "A bag has 2 red marbles, 5 blue marbles, and 3 green marbles. What is the chance of picking blue?",
    "1/2",
    ["1/5", "3/10", "5/8"],
    4
  ),
  probabilityStaticQuestion(
    "If you toss 4 fair coins, how many possible outcomes are there altogether?",
    "16",
    ["8", "12", "24"],
    4
  ),
  probabilityStaticQuestion(
    "A spinner has 6 equal sections, and 2 sections are red. What is the chance of not landing on red?",
    "2/3",
    ["1/3", "1/2", "1/6"],
    4
  ),
  probabilityStaticQuestion(
    "What is the chance of rolling a prime number on a standard 6-sided die?",
    "1/2",
    ["1/6", "1/3", "2/3"],
    4
  ),
  probabilityStaticQuestion(
    "A bag has 5 red marbles and 0 blue marbles. How likely is it to pick a blue marble?",
    "Impossible",
    ["Certain", "Equally likely", "Likely"],
    4
  ),
  probabilityStaticQuestion(
    "A number card is chosen from cards 1 through 8. What is the chance of choosing an odd number?",
    "1/2",
    ["1/4", "3/4", "1/8"],
    4
  ),
  probabilityStaticQuestion(
    "A normal die is rolled. Which is more likely?",
    "Rolling a number less than 5",
    ["Rolling a 6", "They are equally likely", "Rolling a 7"],
    4
  ),
  probabilityStaticQuestion(
    "If you toss 3 fair coins, what is the chance that all 3 coins show heads?",
    "1/8",
    ["1/2", "1/4", "3/8"],
    4
  ),

  // Level 5: percentages, multi-part outcomes, and proportional comparison.
  probabilityStaticQuestion(
    "If you toss 2 coins, how many possible outcomes are there altogether?",
    "4",
    ["2", "3", "6"],
    5
  ),
  probabilityStaticQuestion(
    "A bag has 2 red marbles, 5 blue marbles, and 3 green marbles. Which color is least likely to be picked?",
    "Red",
    ["Blue", "Green", "All are equally likely"],
    5
  ),
  probabilityStaticQuestion(
    "How many possible outcomes are there if you flip one coin and roll one die?",
    "12",
    ["6", "8", "10"],
    5
  ),
  probabilityStaticQuestion(
    "A box has 4 red balls and 1 blue ball. What percentage of the balls are blue?",
    "20%",
    ["10%", "40%", "60%"],
    5
  ),
  probabilityStaticQuestion(
    "A box has 5 red balls, 3 blue balls, and 2 green balls. What percentage of the balls are blue?",
    "30%",
    ["20%", "40%", "50%"],
    5
  ),
  probabilityStaticQuestion(
    "A spinner has 10 equal sections and 2 are red. What is the chance of landing on red?",
    "1/5",
    ["1/2", "1/10", "2/5"],
    5
  ),
  probabilityStaticQuestion(
    "A bag has 3 red, 4 blue, and 5 green marbles. Which color is least likely to be picked?",
    "Red",
    ["Blue", "Green", "All are equally likely"],
    5
  ),
  probabilityStaticQuestion(
    "A spinner has 6 equal sections and 2 are star shapes. What is the chance of landing on a star?",
    "1/3",
    ["1/6", "1/2", "2/3"],
    5
  ),
  probabilityStaticQuestion(
    "A fair coin is flipped and then a card is picked from 4 color cards. How many equally likely outcomes are there?",
    "8",
    ["4", "6", "10"],
    5
  ),
  probabilityStaticQuestion(
    "A school bus is on time 8 days out of 10. What is the best estimate of the probability it is on time tomorrow?",
    "80%",
    ["20%", "50%", "100%"],
    5
  ),

  // Additional Level 5 questions: expanded variety.
  probabilityStaticQuestion(
    "A box has 3 blue balls out of 12 balls. What percentage of the balls are blue?",
    "25%",
    ["20%", "30%", "75%"],
    5
  ),
  probabilityStaticQuestion(
    "You flip one fair coin and spin a spinner with 5 equal sections. How many equally likely outcomes are there?",
    "10",
    ["5", "7", "12"],
    5
  ),
  probabilityStaticQuestion(
    "A bag has 4 red marbles, 3 blue marbles, and 3 green marbles. Which color is most likely to be picked?",
    "Red",
    ["Blue", "Green", "All are equally likely"],
    5
  ),
  probabilityStaticQuestion(
    "A spinner has 8 equal sections and 2 are star shapes. What is the chance of landing on a star?",
    "1/4",
    ["1/8", "1/2", "3/4"],
    5
  ),
  probabilityStaticQuestion(
    "At lunch, 15 students chose pizza and 5 students chose salad. What percentage chose salad?",
    "25%",
    ["20%", "50%", "75%"],
    5
  ),
  probabilityStaticQuestion(
    "You roll one die and pick one card from 3 color cards. How many equally likely outcomes are there?",
    "18",
    ["9", "12", "36"],
    5
  ),
  probabilityStaticQuestion(
    "A bus was late 2 days out of 10. What is the experimental probability that it was late?",
    "20%",
    ["10%", "50%", "80%"],
    5
  ),
  probabilityStaticQuestion(
    "A bag has 6 red marbles and 4 blue marbles. What percentage of the marbles are blue?",
    "40%",
    ["30%", "50%", "60%"],
    5
  ),
  probabilityStaticQuestion(
    "If you flip 2 fair coins, what is the chance of getting exactly one head?",
    "1/2",
    ["1/4", "3/4", "1/3"],
    5
  ),
  probabilityStaticQuestion(
    "A spinner has 10 equal sections and 7 are winning sections. What is the chance of landing on a winning section?",
    "70%",
    ["30%", "50%", "7%"],
    5
  ),

  // Level 6: complements, probability lines, and changing totals after one draw.
  probabilityStaticQuestion(
    "A bag has 4 red marbles and 6 blue marbles. What is the chance of not picking red?",
    "3/5",
    ["2/5", "4/10", "1/2"],
    6
  ),
  probabilityStaticQuestion(
    "A bag starts with 3 red and 2 blue marbles. One blue marble is removed. What is the chance of picking blue now?",
    "1/4",
    ["2/5", "1/2", "3/4"],
    6
  ),
  probabilityStaticQuestion(
    "Which event has probability 0?",
    "Rolling an 8 on a standard 6-sided die",
    ["Rolling an even number", "Flipping heads", "Picking red from a bag with red marbles"],
    6
  ),
  probabilityStaticQuestion(
    "Which event has probability 1?",
    "Picking a square card from a box that has only square cards",
    ["Rolling a 7 on a die", "Flipping heads once", "Picking blue from a mixed bag"],
    6
  ),
  probabilityStaticQuestion(
    "A weather report says there is a 25% chance of rain. Which fraction is the same chance?",
    "1/4",
    ["1/2", "1/3", "3/4"],
    6
  ),
  probabilityStaticQuestion(
    "A spinner has 12 equal sections. 3 sections are blue. What is the chance of not landing on blue?",
    "3/4",
    ["1/4", "1/3", "2/3"],
    6
  ),
  probabilityStaticQuestion(
    "A class raffle has 8 green tickets and 12 yellow tickets. What is the chance of picking a green ticket?",
    "2/5",
    ["3/5", "8/12", "1/2"],
    6
  ),
  probabilityStaticQuestion(
    "A number card is chosen from 1, 2, 3, 4, 5, and 6. What is the chance of choosing a multiple of 3?",
    "1/3",
    ["1/6", "1/2", "2/3"],
    6
  ),
  probabilityStaticQuestion(
    "A standard deck has 52 cards and 13 are hearts. What is the chance of not picking a heart?",
    "3/4",
    ["1/4", "1/2", "13/52"],
    6
  ),
  probabilityStaticQuestion(
    "A bag has 5 green cubes and 3 yellow cubes. One green cube is removed. What is the chance of picking green now?",
    "4/7",
    ["5/8", "3/7", "1/2"],
    6
  ),

  // Additional Level 6 questions: expanded variety.
  probabilityStaticQuestion(
    "A bag has 5 red marbles and 15 blue marbles. What is the chance of not picking red?",
    "3/4",
    ["1/4", "1/2", "5/15"],
    6
  ),
  probabilityStaticQuestion(
    "A weather report says there is a 60% chance of rain. Which fraction is the same chance?",
    "3/5",
    ["2/5", "1/2", "3/4"],
    6
  ),
  probabilityStaticQuestion(
    "A number card is chosen from cards 1 through 12. What is the chance of choosing a multiple of 4?",
    "1/4",
    ["1/3", "1/2", "3/4"],
    6
  ),
  probabilityStaticQuestion(
    "A spinner has 9 equal sections, and 3 sections are green. What is the chance of not landing on green?",
    "2/3",
    ["1/3", "1/2", "3/9"],
    6
  ),
  probabilityStaticQuestion(
    "A bag starts with 4 red and 3 blue marbles. One red marble is removed. What is the chance of picking red now?",
    "1/2",
    ["4/7", "3/7", "3/4"],
    6
  ),
  probabilityStaticQuestion(
    "Which event has probability 0?",
    "Picking blue from a bag with no blue marbles",
    ["Rolling an even number", "Flipping heads once", "Picking red from a bag with red marbles"],
    6
  ),
  probabilityStaticQuestion(
    "Which event has probability 1?",
    "Rolling a number less than 7 on a standard 6-sided die",
    ["Rolling a 7", "Flipping heads once", "Picking blue from a mixed bag"],
    6
  ),
  probabilityStaticQuestion(
    "A raffle has 9 winning tickets and 21 losing tickets. What is the chance of picking a winning ticket?",
    "3/10",
    ["7/10", "9/21", "1/2"],
    6
  ),
  probabilityStaticQuestion(
    "A standard deck has 52 cards and 26 are black. What is the chance of picking a black card?",
    "1/2",
    ["1/4", "3/4", "1/13"],
    6
  ),
  probabilityStaticQuestion(
    "A class has 18 boys and 12 girls. If one student is chosen, what is the chance the student is not a girl?",
    "3/5",
    ["2/5", "1/2", "18/12"],
    6
  ),

  // Level 7: independent events, expected results, and with-replacement thinking.
  probabilityStaticQuestion(
    "You flip a fair coin and spin a 4-section spinner. How many equally likely outcomes are there?",
    "8",
    ["4", "6", "10"],
    7
  ),
  probabilityStaticQuestion(
    "What is the chance of flipping heads and then tails with a fair coin?",
    "1/4",
    ["1/2", "1/3", "3/4"],
    7
  ),
  probabilityStaticQuestion(
    "A spinner lands on red 1/4 of the time. About how many reds would you expect in 40 spins?",
    "10",
    ["4", "20", "30"],
    7
  ),
  probabilityStaticQuestion(
    "A bag has 3 red and 7 blue marbles. You pick a marble, put it back, and pick again. What is the chance of red then red?",
    "9/100",
    ["3/10", "6/20", "7/10"],
    7
  ),
  probabilityStaticQuestion(
    "A fair die is rolled 60 times. About how many times would you expect to roll a 6?",
    "10",
    ["6", "12", "30"],
    7
  ),
  probabilityStaticQuestion(
    "A spinner has 5 equal sections: 2 red, 2 blue, and 1 yellow. Which statement is true?",
    "Red and blue are equally likely",
    ["Yellow is most likely", "Red is impossible", "Blue is certain"],
    7
  ),
  probabilityStaticQuestion(
    "A game is fair if each player has the same chance to win. Which game is fair?",
    "Player A wins on heads, Player B wins on tails",
    ["Player A wins on 1-5, Player B wins on 6", "Player A gets 3 cards, Player B gets 1", "Player A wins on red only, Player B never wins"],
    7
  ),
  probabilityStaticQuestion(
    "A card is picked from 10 cards numbered 1 to 10. What is the chance of picking a number greater than 7?",
    "3/10",
    ["7/10", "1/2", "1/5"],
    7
  ),
  probabilityStaticQuestion(
    "A card is picked from 4 cards numbered 1 to 4, then a fair coin is flipped. What is the chance of picking 4 and flipping heads?",
    "1/8",
    ["1/4", "1/2", "1/6"],
    7
  ),
  probabilityStaticQuestion(
    "A spinner pays 5 points on 1 of its 5 equal sections and 0 points otherwise. What is the expected score per spin?",
    "1 point",
    ["0 points", "2 points", "5 points"],
    7
  ),

  // Additional Level 7 questions: expanded variety.
  probabilityStaticQuestion(
    "You flip a fair coin and spin a 5-section spinner with 1 red section. What is the chance of heads and red?",
    "1/10",
    ["1/2", "1/5", "1/7"],
    7
  ),
  probabilityStaticQuestion(
    "A spinner lands on red 1/4 of the time. About how many reds would you expect in 80 spins?",
    "20",
    ["10", "40", "60"],
    7
  ),
  probabilityStaticQuestion(
    "A fair die is rolled 120 times. About how many times would you expect an even number?",
    "60",
    ["20", "40", "120"],
    7
  ),
  probabilityStaticQuestion(
    "A bag has 2 red and 8 blue marbles. You pick a marble, put it back, and pick again. What is the chance of red then blue?",
    "4/25",
    ["1/5", "2/5", "8/10"],
    7
  ),
  probabilityStaticQuestion(
    "A game uses a fair die. Ana wins on odd numbers, and Ben wins on even numbers. Is the game fair?",
    "Yes, both players have the same chance.",
    ["No, Ana is more likely to win.", "No, Ben is more likely to win.", "No one can win."],
    7
  ),
  probabilityStaticQuestion(
    "A card is picked from 6 numbered cards, then a fair coin is flipped. How many equally likely outcomes are there?",
    "12",
    ["6", "8", "18"],
    7
  ),
  probabilityStaticQuestion(
    "A card is picked from cards numbered 1 to 12. What is the chance of picking a number greater than 9?",
    "1/4",
    ["1/3", "1/2", "3/4"],
    7
  ),
  probabilityStaticQuestion(
    "A spinner has 3 green sections out of 6 equal sections. About how many greens would you expect in 30 spins?",
    "15",
    ["5", "10", "20"],
    7
  ),
  probabilityStaticQuestion(
    "A spinner pays 8 points on 1 of its 4 equal sections and 0 points otherwise. What is the expected score per spin?",
    "2 points",
    ["0 points", "4 points", "8 points"],
    7
  ),
  probabilityStaticQuestion(
    "Two independent events have chances 1/2 and 1/5. What is the chance both happen?",
    "1/10",
    ["1/2", "1/5", "3/10"],
    7
  ),

  // Level 8: dependent events, simple conditional probability, and at-least-one reasoning.
  probabilityStaticQuestion(
    "A bag has 3 red and 2 blue marbles. You pick one red marble and do not put it back. What is the chance the next marble is red?",
    "1/2",
    ["3/5", "2/5", "1/4"],
    8
  ),
  probabilityStaticQuestion(
    "A bag has 4 red and 6 blue marbles. You pick one blue marble and do not put it back. What is the chance the next marble is blue?",
    "5/9",
    ["6/10", "4/9", "1/2"],
    8
  ),
  probabilityStaticQuestion(
    "Two fair coins are flipped. What is the chance of getting at least one head?",
    "3/4",
    ["1/4", "1/2", "1/3"],
    8
  ),
  probabilityStaticQuestion(
    "Two fair dice are rolled. What is the chance that both dice show 6?",
    "1/36",
    ["1/6", "1/12", "2/36"],
    8
  ),
  probabilityStaticQuestion(
    "A box has 5 animal cards: cat, dog, fish, bird, and horse. You pick 2 cards without replacement. Order matters, so cat then dog is different from dog then cat. How many ordered outcomes are possible?",
    "20",
    ["10", "25", "5"],
    8
  ),
  probabilityStaticQuestion(
    "A student records 18 sunny days and 12 rainy days. Based on this data, what is the experimental probability of a sunny day?",
    "3/5",
    ["2/5", "1/2", "18/12"],
    8
  ),
  probabilityStaticQuestion(
    "A spinner has 3 red, 2 blue, and 1 green section. If you know it did not land on green, what is the chance it landed on red?",
    "3/5",
    ["3/6", "1/2", "2/5"],
    8
  ),
  probabilityStaticQuestion(
    "A fair die is rolled twice. What is the chance of rolling a 1 first and then a 2?",
    "1/36",
    ["1/6", "1/12", "2/6"],
    8
  ),
  probabilityStaticQuestion(
    "A bag has 4 red tokens and 2 blue tokens. You draw 2 tokens without replacement. What is the chance both are blue?",
    "1/15",
    ["1/3", "1/6", "2/6"],
    8
  ),
  probabilityStaticQuestion(
    "Two dice are rolled. What is the chance the sum is 2?",
    "1/36",
    ["1/6", "1/12", "2/36"],
    8
  ),

  // Additional Level 8 questions: expanded variety.
  probabilityStaticQuestion(
    "A bag has 5 red and 3 blue marbles. You pick one red marble and do not put it back. What is the chance the next marble is blue?",
    "3/7",
    ["3/8", "5/7", "1/2"],
    8
  ),
  probabilityStaticQuestion(
    "Three fair coins are flipped. What is the chance of getting at least one head?",
    "7/8",
    ["1/8", "1/2", "3/4"],
    8
  ),
  probabilityStaticQuestion(
    "Two fair dice are rolled. What is the chance that the sum is 12?",
    "1/36",
    ["1/6", "1/12", "2/36"],
    8
  ),
  probabilityStaticQuestion(
    "A bag has 6 red tokens and 4 blue tokens. You draw 2 tokens without replacement. What is the chance both are red?",
    "1/3",
    ["3/5", "1/2", "2/3"],
    8
  ),
  probabilityStaticQuestion(
    "A spinner has 4 red, 3 blue, and 2 green sections. If you know it did not land on green, what is the chance it landed on blue?",
    "3/7",
    ["3/9", "4/7", "1/2"],
    8
  ),
  probabilityStaticQuestion(
    "A student answered 24 questions correctly out of 40. What is the experimental probability of a correct answer?",
    "3/5",
    ["2/5", "1/2", "24/100"],
    8
  ),
  probabilityStaticQuestion(
    "A box has 6 animal cards. You pick 2 cards without replacement. Order matters. How many ordered outcomes are possible?",
    "30",
    ["12", "15", "36"],
    8
  ),
  probabilityStaticQuestion(
    "A bag has 2 red tokens and 3 blue tokens. You draw 2 tokens without replacement. What is the chance both are red?",
    "1/10",
    ["2/5", "1/5", "1/2"],
    8
  ),
  probabilityStaticQuestion(
    "A fair die is rolled twice. What is the chance of rolling an odd number first and then a 6?",
    "1/12",
    ["1/6", "1/9", "1/36"],
    8
  ),
  probabilityStaticQuestion(
    "Two fair coins are flipped. What is the chance of getting no heads?",
    "1/4",
    ["1/2", "3/4", "1/3"],
    8
  ),

  // Level 9: combinations, two-dice events, expected value, and interpreting simulations.
  probabilityStaticQuestion(
    "Three fair coins are flipped. What is the chance of getting exactly two heads?",
    "3/8",
    ["1/8", "1/2", "2/3"],
    9
  ),
  probabilityStaticQuestion(
    "Two fair dice are rolled. What is the chance that the sum is 7?",
    "1/6",
    ["1/12", "1/9", "7/36"],
    9
  ),
  probabilityStaticQuestion(
    "A game pays 6 points if you roll a 6 and 0 points otherwise. What is the expected score for one fair die roll?",
    "1 point",
    ["0 points", "3 points", "6 points"],
    9
  ),
  probabilityStaticQuestion(
    "In a simulation, red appeared 43 times in 100 trials. Which is the best estimate of the experimental probability of red?",
    "43%",
    ["4.3%", "50%", "57%"],
    9
  ),
  probabilityStaticQuestion(
    "A password uses one letter A-D followed by one digit 1-5. How many possible passwords are there?",
    "20",
    ["9", "10", "45"],
    9
  ),
  probabilityStaticQuestion(
    "A bag has 6 red, 3 blue, and 1 green marble. If you know the marble is not red, what is the chance it is green?",
    "1/4",
    ["1/10", "1/3", "3/4"],
    9
  ),
  probabilityStaticQuestion(
    "A spinner has probability 1/5 of landing on yellow. About how many yellows should you expect in 200 spins?",
    "40",
    ["20", "50", "100"],
    9
  ),
  probabilityStaticQuestion(
    "A deck has 4 red cards and 4 black cards. You draw 2 cards without replacement. What is the chance both are red?",
    "3/14",
    ["1/4", "1/2", "4/8"],
    9
  ),
  probabilityStaticQuestion(
    "A game pays 12 points if a spinner lands on the 1 winning space out of 4 equal spaces, and 0 otherwise. What is the expected score?",
    "3 points",
    ["1 point", "4 points", "12 points"],
    9
  ),
  probabilityStaticQuestion(
    "Two fair dice are rolled. What is the chance that the sum is at least 10?",
    "1/6",
    ["1/12", "1/4", "5/36"],
    9
  ),

  // Additional Level 9 questions: expanded variety.
  probabilityStaticQuestion(
    "Four fair coins are flipped. What is the chance of getting exactly two heads?",
    "3/8",
    ["1/4", "1/2", "1/16"],
    9
  ),
  probabilityStaticQuestion(
    "Two fair dice are rolled. What is the chance that the sum is 5?",
    "1/9",
    ["1/6", "1/12", "5/36"],
    9
  ),
  probabilityStaticQuestion(
    "A game pays 10 points if a fair coin lands on heads and 0 points otherwise. What is the expected score?",
    "5 points",
    ["0 points", "2 points", "10 points"],
    9
  ),
  probabilityStaticQuestion(
    "In a simulation, green appeared 72 times in 120 trials. Which is the best estimate of the experimental probability of green?",
    "60%",
    ["40%", "72%", "120%"],
    9
  ),
  probabilityStaticQuestion(
    "A password uses one letter A-C followed by one digit 0-9. How many possible passwords are there?",
    "30",
    ["13", "20", "90"],
    9
  ),
  probabilityStaticQuestion(
    "A bag has 5 red, 4 blue, and 1 green marble. If you know the marble is not blue, what is the chance it is green?",
    "1/6",
    ["1/10", "1/5", "5/6"],
    9
  ),
  probabilityStaticQuestion(
    "A deck has 5 red cards and 5 black cards. You draw 2 cards without replacement. What is the chance both cards are the same color?",
    "4/9",
    ["1/2", "5/9", "2/5"],
    9
  ),
  probabilityStaticQuestion(
    "A spinner has probability 3/8 of landing on yellow. About how many yellows should you expect in 160 spins?",
    "60",
    ["40", "80", "120"],
    9
  ),
  probabilityStaticQuestion(
    "Two fair dice are rolled. What is the chance that the sum is at most 4?",
    "1/6",
    ["1/12", "1/9", "1/4"],
    9
  ),
  probabilityStaticQuestion(
    "A game pays 9 points if a fair die lands on a multiple of 3 and 0 points otherwise. What is the expected score?",
    "3 points",
    ["1 point", "6 points", "9 points"],
    9
  ),

  // Level 10: advanced conditional probability, fairness, and multi-step reasoning.
  probabilityStaticQuestion(
    "A school club has 30 soccer players. Of those soccer players, 12 are girls. If one soccer player is chosen, what is the chance the player is a girl?",
    "2/5",
    ["12/42", "3/5", "1/2"],
    10
  ),
  probabilityStaticQuestion(
    "A jar has 5 red and 5 blue marbles. You draw 2 without replacement. What is the chance they are different colors?",
    "5/9",
    ["1/2", "4/9", "1/5"],
    10
  ),
  probabilityStaticQuestion(
    "Four fair coins are flipped. What is the chance of getting exactly one head?",
    "1/4",
    ["1/16", "1/2", "3/4"],
    10
  ),
  probabilityStaticQuestion(
    "A game costs 2 points to play. You win 10 points on a 6 and 0 points otherwise. What is the expected net result per fair die roll?",
    "Lose 1/3 point on average",
    ["Win 8 points on average", "Break even exactly", "Lose 2 points every time"],
    10
  ),
  probabilityStaticQuestion(
    "A bag has 2 red, 3 blue, and 5 green marbles. You draw 2 without replacement. What is the chance both are green?",
    "2/9",
    ["1/4", "5/10", "4/10"],
    10
  ),
  probabilityStaticQuestion(
    "Two events are independent. Event A has chance 1/3 and Event B has chance 1/4. What is the chance both happen?",
    "1/12",
    ["1/7", "1/3", "1/4"],
    10
  ),
  probabilityStaticQuestion(
    "A spinner has 2 red and 3 blue sections. It is spun 3 times. What is the chance of blue all 3 times?",
    "27/125",
    ["9/25", "3/5", "8/125"],
    10
  ),
  probabilityStaticQuestion(
    "A survey has 40 students: 24 like math, 18 like science, and 10 like both. How many like math or science?",
    "32",
    ["28", "42", "52"],
    10
  ),
  probabilityStaticQuestion(
    "A game costs 3 points to play. You win 18 points if two fair dice both show 6, and 0 otherwise. What is the expected net result?",
    "Lose 2.5 points on average",
    ["Win 15 points on average", "Break even exactly", "Lose 3 points every time"],
    10
  ),
  probabilityStaticQuestion(
    "A bag has 3 red, 4 blue, and 5 green tiles. You draw 2 without replacement. What is the chance neither tile is green?",
    "7/22",
    ["5/12", "7/12", "35/144"],
    10
  ),
  // Additional Level 10 questions: expanded variety.
  probabilityStaticQuestion(
    "A survey has 50 students: 30 like music, 20 like sports, and 12 like both. How many like music or sports?",
    "38",
    ["26", "42", "62"],
    10
  ),
  probabilityStaticQuestion(
    "A jar has 6 red and 4 blue marbles. You draw 2 without replacement. What is the chance they are different colors?",
    "8/15",
    ["1/2", "4/15", "6/10"],
    10
  ),
  probabilityStaticQuestion(
    "Five fair coins are flipped. What is the chance of getting exactly two heads?",
    "5/16",
    ["1/4", "3/8", "10/25"],
    10
  ),
  probabilityStaticQuestion(
    "A game costs 4 points to play. You win 18 points on a 6 and 0 points otherwise. What is the expected net result per fair die roll?",
    "Lose 1 point on average",
    ["Win 14 points on average", "Break even exactly", "Lose 4 points every time"],
    10
  ),
  probabilityStaticQuestion(
    "A bag has 4 red and 6 blue marbles. You draw 2 without replacement. What is the chance both are blue?",
    "1/3",
    ["3/5", "1/2", "2/3"],
    10
  ),
  probabilityStaticQuestion(
    "Two events are independent. Event A has chance 2/5 and Event B has chance 3/10. What is the chance both happen?",
    "3/25",
    ["1/5", "1/2", "6/15"],
    10
  ),
  probabilityStaticQuestion(
    "A spinner has 3 red and 2 blue sections. It is spun 4 times. What is the chance of red all 4 times?",
    "81/625",
    ["3/5", "12/20", "16/625"],
    10
  ),
  probabilityStaticQuestion(
    "Two fair dice are rolled. Given that the sum is 7, what is the chance that one die shows 6?",
    "1/3",
    ["1/6", "1/2", "2/7"],
    10
  ),
  probabilityStaticQuestion(
    "A game costs 5 points to play. You win 24 points if two fair dice sum to 12, and 0 otherwise. What is the expected net result?",
    "Lose 4 1/3 points on average",
    ["Win 19 points on average", "Break even exactly", "Lose 5 points every time"],
    10
  ),
  probabilityStaticQuestion(
    "A bag has 5 red, 4 blue, and 3 green tiles. You draw 3 without replacement. What is the chance of drawing one tile of each color?",
    "3/11",
    ["1/3", "5/12", "1/11"],
    10
  ),

];

function createProbabilityGeneratedEntry(difficulty, options = {}) {
  const level = probabilityClampDifficulty(difficulty);

  function buildEntry({ question, answer, distractors, displayText = "" }) {
    return probabilityStaticQuestion(question, answer, distractors, level, displayText);
  }

  function plural(value, singular, pluralForm = `${singular}s`) {
    return `${value} ${value === 1 ? singular : pluralForm}`;
  }

  function compareBagChance(color, firstGood, firstOther, secondGood, secondOther) {
    const firstChance = firstGood / (firstGood + firstOther);
    const secondChance = secondGood / (secondGood + secondOther);
    const answer = firstChance > secondChance ? "The first bag" : firstChance < secondChance ? "The second bag" : "They are equally likely";
    return buildEntry({
      question: `Bag 1 has ${firstGood} ${color} marbles and ${firstOther} other marbles. Bag 2 has ${secondGood} ${color} marbles and ${secondOther} other marbles. Which bag gives a better chance of picking ${color}?`,
      answer,
      distractors: ["The first bag", "The second bag", "They are equally likely"].filter((choice) => choice !== answer).concat("Neither can happen"),
    });
  }

  function compareFractions(leftNumerator, leftDenominator, rightNumerator, rightDenominator) {
    return leftNumerator * rightDenominator - rightNumerator * leftDenominator;
  }

  function createLikelihoodQuestion() {
    const likelySetups = [
      {
        minLevel: 1,
        question: "A normal 6-sided die is rolled. How likely is it to roll an 8?",
        answer: "Impossible",
        distractors: ["Unlikely", "Equally likely", "Certain"],
      },
      {
        minLevel: 1,
        question: "A bag has only red marbles. How likely is it to pick a red marble?",
        answer: "Certain",
        distractors: ["Impossible", "Unlikely", "Equally likely"],
      },
      {
        minLevel: 1,
        question: "A fair coin is flipped. How likely is heads compared with tails?",
        answer: "Equally likely",
        distractors: ["Impossible", "Unlikely", "Certain"],
      },
      {
        minLevel: 3,
        build() {
          const blue = probabilityRandomInt(5, 8);
          const yellow = probabilityRandomInt(1, 2);
          return {
            question: `A spinner has ${blue} blue sections and ${yellow} yellow section${yellow === 1 ? "" : "s"}. How likely is blue?`,
            answer: "Likely",
            distractors: ["Impossible", "Unlikely", "Equally likely"],
          };
        },
      },
      {
        minLevel: 3,
        build() {
          const winning = probabilityRandomInt(1, 2);
          const losing = probabilityRandomInt(7, 10);
          return {
            question: `A raffle box has ${winning} winning ticket${winning === 1 ? "" : "s"} and ${losing} losing tickets. How likely is it to pick a winning ticket?`,
            answer: "Unlikely",
            distractors: ["Impossible", "Equally likely", "Certain"],
          };
        },
      },
    ].filter((setup) => level >= setup.minLevel);
    const setup = probabilityRandomChoice(likelySetups);
    return buildEntry(typeof setup.build === "function" ? setup.build() : setup);
  }

  function createWeatherQuestion() {
    if (level <= 3 || Math.random() < 0.45) {
      const firstChance = probabilityRandomChoice([10, 20, 25, 30, 40]);
      const secondChance = probabilityRandomChoice([60, 70, 75, 80, 90]);
      const firstDay = probabilityRandomChoice(["Monday", "Wednesday", "Friday"]);
      const secondDay = probabilityRandomChoice(["Tuesday", "Thursday", "Saturday"]);
      return buildEntry({
        question: `${firstDay} has a ${firstChance}% chance of rain. ${secondDay} has a ${secondChance}% chance of rain. Which day is rain more likely?`,
        answer: secondDay,
        distractors: [firstDay, "Both days are equally likely", "Rain is impossible"],
      });
    }

    const chance = probabilityRandomChoice([20, 30, 40, 50, 60, 70, 75, 80]);
    const answer =
      chance > 50
        ? "Rain is more likely than no rain"
        : chance < 50
          ? "Rain is less likely than no rain"
          : "Rain and no rain are equally likely";
    return buildEntry({
      question: `The forecast says there is a ${chance}% chance of rain. Which statement is best?`,
      answer,
      distractors: [
        "It will definitely rain",
        "Rain is impossible",
        `${chance / 10}% chance of rain`,
        "Rain and no rain are equally likely",
        "Rain is more likely than no rain",
        "Rain is less likely than no rain",
      ].filter((choice) => choice !== answer),
    });
  }

  function createExperimentalQuestion() {
    if (level <= 6) {
      const flips = probabilityRandomChoice([20, 30, 40]);
      const heads = Math.round(flips * probabilityRandomChoice([0.35, 0.6, 0.7]));
      return buildEntry({
        question: `A fair coin should land on heads about half the time. Sam flipped it ${flips} times and got heads ${heads} times. What is ${heads}/${flips} called?`,
        answer: "The experimental probability",
        distractors: ["The theoretical probability", "A certain result", "An impossible result"],
      });
    }

    if (level <= 8 || Math.random() < 0.55) {
      const colors = probabilityRandomChoice([4, 5]);
      const spins = colors * probabilityRandomChoice([8, 10, 12]);
      const observedHits = probabilityRandomChoice([6, 8, 9, 12, 15]);
      const hits = observedHits === spins / colors ? observedHits + 1 : observedHits;
      const safeHits = Math.min(spins - 1, hits);
      const answer = probabilityFormatFraction(safeHits, spins);
      return buildEntry({
        question: `A spinner has ${colors} equal colors. The theoretical chance of red is ${probabilityFormatFraction(1, colors)}. In ${spins} spins, red happened ${safeHits} times. What is the experimental probability?`,
        answer,
        distractors: [probabilityFormatFraction(1, colors), `${safeHits}/${colors}`, `${colors}/${spins}`],
      });
    }

    const sides = 6;
    const rolls = probabilityRandomChoice([60, 90, 120]);
    const expected = rolls / sides;
    const actual = expected + probabilityRandomChoice([-5, -4, 4, 6]);
    const answer = actual > expected ? "The experimental result was higher than expected." : "The experimental result was lower than expected.";
    return buildEntry({
      question: `A die is rolled ${rolls} times. The theoretical expectation for rolling a 6 is about ${expected} times. It actually happens ${actual} times. Which is true?`,
      answer,
      distractors: [
        "The experimental result was exactly expected.",
        actual > expected ? "The experimental result was lower than expected." : "The experimental result was higher than expected.",
        "Rolling a 6 was impossible.",
      ],
    });
  }

  function createFairGameQuestion() {
    const fairSetups = [
      { ana: [1, 2, 3], ben: [4, 5, 6] },
      { ana: [1, 2], ben: [3, 4, 5, 6] },
      { ana: [1, 3, 5], ben: [2, 4, 6] },
      { ana: [1, 2, 3, 4], ben: [5, 6] },
    ];
    const setup = probabilityRandomChoice(level <= 4 ? [fairSetups[0], fairSetups[2]] : fairSetups);
    const answer =
      setup.ana.length === setup.ben.length
        ? "Yes, both players have the same chance."
        : setup.ana.length > setup.ben.length
          ? "No, Ana is more likely to win."
          : "No, Ben is more likely to win.";
    return buildEntry({
      question: `A game uses a normal die. Ana wins on ${setup.ana.join(", ")}. Ben wins on ${setup.ben.join(", ")}. Is the game fair?`,
      answer,
      distractors: [
        "Yes, both players have the same chance.",
        "No, Ana is more likely to win.",
        "No, Ben is more likely to win.",
        "No one can win.",
      ].filter((choice) => choice !== answer),
    });
  }

  function createBestStrategyQuestion() {
    const labels = ["Bag A", "Bag B", "Bag C", "Bag D"];
    const candidates = [
      { red: 2, total: 5 },
      { red: 4, total: 12 },
      { red: 1, total: 2 },
      { red: 3, total: 10 },
      { red: 5, total: 9 },
      { red: 6, total: 13 },
      { red: 7, total: 20 },
    ];
    const shuffled = probabilityShuffleArray(candidates).slice(0, 4);
    const bestIndex = shuffled.reduce((best, item, index) =>
      compareFractions(item.red, item.total, shuffled[best].red, shuffled[best].total) > 0 ? index : best, 0);
    const hasTie = shuffled.some((item, index) =>
      index !== bestIndex && compareFractions(item.red, item.total, shuffled[bestIndex].red, shuffled[bestIndex].total) === 0);
    if (hasTie) {
      return createBestStrategyQuestion();
    }
    return buildEntry({
      question: "You want to pick a red marble. Which bag should you choose?",
      displayText: shuffled
        .map((item, index) => `${labels[index]}: ${item.red} red and ${item.total - item.red} blue`)
        .join("\n"),
      answer: labels[bestIndex],
      distractors: labels.filter((label) => label !== labels[bestIndex]),
    });
  }

  function createIndependentQuestion() {
    if (level <= 6) {
      const streak = probabilityRandomChoice([3, 4, 5]);
      return buildEntry({
        question: `A fair coin lands heads ${streak} times in a row. What is the chance it lands heads on the next flip?`,
        answer: "1/2",
        distractors: ["1/4", `${streak}/${streak + 1}`, "Certain"],
      });
    }

    if (level <= 8) {
      return buildEntry({
        question: "You flip a fair coin twice. Which result type is most likely?",
        answer: "One head and one tail",
        distractors: ["Two heads", "Two tails", "All three result types are equally likely"],
      });
    }

    const event = probabilityRandomChoice([
      { question: "A fair coin is flipped twice. What is the chance of getting two heads in a row?", answer: "1/4", distractors: ["1/2", "1/3", "3/4"] },
      { question: "A normal die is rolled twice. What is the chance of rolling a 6 both times?", answer: "1/36", distractors: ["1/6", "1/12", "2/6"] },
    ]);
    return buildEntry(event);
  }

  function createNotEnoughInformationQuestion() {
    const setups = [
      {
        minLevel: 3,
        question: "A bag has red and blue marbles, but you do not know how many of each. What is the chance of picking red?",
        answer: "Not enough information",
        distractors: ["1/2", "1/3", "Certain"],
      },
      {
        minLevel: 4,
        question: "A spinner has red, blue, and green sections, but we do not know how many of each. Which color is most likely?",
        answer: "Not enough information",
        distractors: ["Red", "Blue", "Green"],
      },
      {
        minLevel: 6,
        question: "A box has some winning tickets and some losing tickets. Can you know your chance of winning without knowing how many tickets there are?",
        answer: "No, there is not enough information.",
        distractors: ["Yes, it is always 1/2.", "Yes, winning is certain.", "Yes, winning is impossible."],
      },
      {
        minLevel: 8,
        question: "Bag A has 3 red and 7 blue marbles. Bag B has red and blue marbles, but no counts are given. Which bag gives the better chance of picking red?",
        answer: "Not enough information",
        distractors: ["Bag A", "Bag B", "They are equally likely"],
      },
    ].filter((setup) => level >= setup.minLevel);
    return buildEntry(probabilityRandomChoice(setups));
  }

  function createCardQuestion() {
    const setups = [
      {
        minLevel: 2,
        build() {
          const star = probabilityRandomChoice([1, 2, 3]);
          const moon = probabilityRandomChoice([4, 5, 6]);
          const answer = moon > star ? "Moon" : "Star";
          return {
            question: `A small deck has ${star} star cards and ${moon} moon cards. Which card type is more likely to be picked?`,
            answer,
            distractors: ["Star", "Moon", "They are equally likely", "Neither can be picked"].filter((choice) => choice !== answer),
          };
        },
      },
      {
        minLevel: 3,
        build() {
          const suit = probabilityRandomChoice(["heart", "diamond", "club", "spade"]);
          return {
            question: `A card is picked from a standard deck. What is the chance it is a ${suit}?`,
            answer: "1/4",
            distractors: ["1/2", "1/13", "13/52"],
          };
        },
      },
      {
        minLevel: 5,
        build() {
          const cards = probabilityRandomChoice([
            { event: "an ace", favorable: 4, total: 52 },
            { event: "a red card", favorable: 26, total: 52 },
            { event: "a face card", favorable: 12, total: 52 },
            { event: "a black queen", favorable: 2, total: 52 },
          ]);
          return {
            question: `A card is picked from a standard deck. What is the chance of picking ${cards.event}?`,
            answer: probabilityFormatFraction(cards.favorable, cards.total),
            distractors: ["1/2", "1/4", "1/13", "3/13"].filter((choice) => choice !== probabilityFormatFraction(cards.favorable, cards.total)),
          };
        },
      },
      {
        minLevel: 8,
        build() {
          const red = probabilityRandomChoice([4, 5, 6]);
          const black = probabilityRandomChoice([4, 5, 6]);
          const total = red + black;
          const answer = probabilityFormatFraction(red * (red - 1), total * (total - 1));
          return {
            question: `A deck has ${red} red cards and ${black} black cards. You draw 2 cards without replacement. What is the chance both are red?`,
            answer,
            distractors: [probabilityFormatFraction(red, total), probabilityFormatFraction(red * black, total * (total - 1)), "1/2"],
          };
        },
      },
    ].filter((setup) => level >= setup.minLevel);
    return buildEntry(probabilityRandomChoice(setups).build());
  }

  function createObjectBagQuestion() {
    const objectSetups = [
      {
        minLevel: 1,
        build() {
          const apples = probabilityRandomInt(5, 9);
          const bananas = probabilityRandomInt(1, 3);
          return {
            question: `A lunch basket has ${plural(apples, "apple")} and ${plural(bananas, "banana")}. Which snack is more likely to be picked?`,
            answer: "Apple",
            distractors: ["Banana", "They are equally likely", "Neither can be picked"],
          };
        },
      },
      {
        minLevel: 2,
        build() {
          const chocolate = probabilityRandomInt(1, 3);
          const vanilla = probabilityRandomInt(5, 8);
          const answer = probabilityFormatFraction(chocolate, chocolate + vanilla);
          return {
            question: `A cookie jar has ${plural(chocolate, "chocolate cookie")} and ${plural(vanilla, "vanilla cookie")}. What is the chance of picking a chocolate cookie?`,
            answer,
            distractors: [probabilityFormatFraction(vanilla, chocolate + vanilla), "1/2", "1/4"],
          };
        },
      },
      {
        minLevel: 4,
        build() {
          const green = probabilityRandomInt(2, 5);
          const yellow = probabilityRandomInt(3, 6);
          const purple = probabilityRandomInt(1, 4);
          const total = green + yellow + purple;
          const answer = probabilityFormatFraction(green + yellow, total);
          return {
            question: `A bag has ${green} green cubes, ${yellow} yellow cubes, and ${purple} purple cubes. What is the chance of picking green or yellow?`,
            answer,
            distractors: [probabilityFormatFraction(purple, total), probabilityFormatFraction(green, total), probabilityFormatFraction(yellow, total)],
          };
        },
      },
      {
        minLevel: 6,
        build() {
          const pencils = probabilityRandomInt(4, 7);
          const erasers = probabilityRandomInt(2, 5);
          const stickers = probabilityRandomInt(1, 3);
          const total = pencils + erasers + stickers;
          const answer = probabilityFormatFraction(total - stickers, total);
          return {
            question: `A prize box has ${pencils} pencils, ${erasers} erasers, and ${stickers} stickers. What is the chance of not picking a sticker?`,
            answer,
            distractors: [probabilityFormatFraction(stickers, total), probabilityFormatFraction(pencils, total), "1/2"],
          };
        },
      },
    ].filter((setup) => level >= setup.minLevel);
    return buildEntry(probabilityRandomChoice(objectSetups).build());
  }

  function createDiceQuestion() {
    const setups = [
      {
        minLevel: 2,
        build() {
          const event = probabilityRandomChoice([
            { text: "rolling an odd number", favorable: 3 },
            { text: "rolling a number less than 3", favorable: 2 },
            { text: "rolling a number greater than 4", favorable: 2 },
            { text: "rolling a 5", favorable: 1 },
          ]);
          return {
            question: `What is the chance of ${event.text} on a standard 6-sided die?`,
            answer: probabilityFormatFraction(event.favorable, 6),
            distractors: ["1/6", "1/3", "1/2", "2/3", "5/6"].filter((choice) => choice !== probabilityFormatFraction(event.favorable, 6)),
          };
        },
      },
      {
        minLevel: 6,
        build() {
          const event = probabilityRandomChoice([
            { text: "both dice show the same number", favorable: 6 },
            { text: "the sum is 7", favorable: 6 },
            { text: "the sum is 2", favorable: 1 },
            { text: "the sum is at least 10", favorable: 6 },
          ]);
          return {
            question: `Two fair dice are rolled. What is the chance that ${event.text}?`,
            answer: probabilityFormatFraction(event.favorable, 36),
            distractors: ["1/36", "1/12", "1/6", "1/4"].filter((choice) => choice !== probabilityFormatFraction(event.favorable, 36)),
          };
        },
      },
      {
        minLevel: 9,
        build() {
          const first = probabilityRandomChoice([1, 2, 3, 4, 5, 6]);
          const second = probabilityRandomChoice([1, 2, 3, 4, 5, 6]);
          return {
            question: `A fair die is rolled twice. What is the chance of rolling ${first} first and ${second} second?`,
            answer: "1/36",
            distractors: ["1/6", "1/12", "2/36"],
          };
        },
      },
    ].filter((setup) => level >= setup.minLevel);
    return buildEntry(probabilityRandomChoice(setups).build());
  }

  function createComplementQuestion() {
    const setups = [
      {
        minLevel: 4,
        build() {
          const sections = probabilityRandomChoice([6, 8, 10, 12]);
          const red = probabilityRandomChoice([1, 2, 3, 4]);
          const safeRed = Math.min(red, sections - 1);
          return {
            question: `A spinner has ${sections} equal sections. ${safeRed} sections are red. What is the chance of not landing on red?`,
            answer: probabilityFormatFraction(sections - safeRed, sections),
            distractors: [probabilityFormatFraction(safeRed, sections), "1/2", "1/4"],
          };
        },
      },
      {
        minLevel: 6,
        build() {
          const total = probabilityRandomChoice([8, 10, 12]);
          const multiples = Math.floor(total / 3);
          return {
            question: `A number card is chosen from 1 through ${total}. What is the chance of not choosing a multiple of 3?`,
            answer: probabilityFormatFraction(total - multiples, total),
            distractors: [probabilityFormatFraction(multiples, total), "1/2", "1/3"],
          };
        },
      },
      {
        minLevel: 8,
        build() {
          const chance = probabilityRandomChoice([15, 20, 25, 30, 40]);
          return {
            question: `A delivery has a ${chance}% chance of arriving late. What is the chance it does not arrive late?`,
            answer: `${100 - chance}%`,
            distractors: [`${chance}%`, "50%", "100%"],
          };
        },
      },
    ].filter((setup) => level >= setup.minLevel);
    return buildEntry(probabilityRandomChoice(setups).build());
  }

  function createTwoStepQuestion() {
    const setups = [
      {
        minLevel: 5,
        build() {
          const colors = probabilityRandomChoice([3, 4, 5]);
          return {
            question: `You flip a fair coin and pick one card from ${colors} color cards. How many equally likely outcomes are there?`,
            answer: String(2 * colors),
            distractors: [String(colors), String(colors + 2), String(2 * colors + 2)],
          };
        },
      },
      {
        minLevel: 7,
        build() {
          const cards = probabilityRandomChoice([4, 5, 6]);
          return {
            question: `A card is picked from ${cards} numbered cards, then a fair coin is flipped. What is the chance of picking card 1 and flipping heads?`,
            answer: probabilityFormatFraction(1, cards * 2),
            distractors: [probabilityFormatFraction(1, cards), "1/2", probabilityFormatFraction(2, cards)],
          };
        },
      },
      {
        minLevel: 8,
        build() {
          const red = probabilityRandomChoice([3, 4, 5]);
          const blue = probabilityRandomChoice([3, 4, 5]);
          const total = red + blue;
          return {
            question: `A bag has ${red} red and ${blue} blue tokens. You draw 2 tokens without replacement. What is the chance both are blue?`,
            answer: probabilityFormatFraction(blue * (blue - 1), total * (total - 1)),
            distractors: [probabilityFormatFraction(blue, total), probabilityFormatFraction(red * blue, total * (total - 1)), "1/2"],
          };
        },
      },
      {
        minLevel: 9,
        build() {
          const firstChance = probabilityRandomChoice([2, 3, 4]);
          const secondChance = probabilityRandomChoice([3, 4, 5]);
          return {
            question: `A game has two independent steps. The chance of passing step 1 is 1/${firstChance}, and the chance of passing step 2 is 1/${secondChance}. What is the chance of passing both steps?`,
            answer: probabilityFormatFraction(1, firstChance * secondChance),
            distractors: [probabilityFormatFraction(1, firstChance), probabilityFormatFraction(1, secondChance), probabilityFormatFraction(2, firstChance + secondChance)],
          };
        },
      },
    ].filter((setup) => level >= setup.minLevel);
    return buildEntry(probabilityRandomChoice(setups).build());
  }

  function createExpectedValueQuestion() {
    const setups = [
      {
        minLevel: 6,
        build() {
          const denominator = probabilityRandomChoice([4, 5, 6]);
          const trials = denominator * probabilityRandomChoice([10, 12, 15]);
          return {
            question: `A prize spinner wins ${probabilityFormatFraction(1, denominator)} of the time. About how many wins should you expect in ${trials} spins?`,
            answer: String(trials / denominator),
            distractors: [String(denominator), String(trials / 2), String(trials - trials / denominator)],
          };
        },
      },
      {
        minLevel: 7,
        build() {
          const winningSections = probabilityRandomChoice([1, 2, 3]);
          const totalSections = probabilityRandomChoice([6, 8, 10]);
          const plays = totalSections * probabilityRandomChoice([5, 8, 10]);
          return {
            question: `A spinner has ${winningSections} winning sections out of ${totalSections} equal sections. About how many wins should you expect in ${plays} spins?`,
            answer: String((plays * winningSections) / totalSections),
            distractors: [String(winningSections), String(totalSections), String(plays - (plays * winningSections) / totalSections)],
          };
        },
      },
      {
        minLevel: 9,
        build() {
          const points = probabilityRandomChoice([6, 8, 12]);
          const winningFaces = probabilityRandomChoice([1, 2, 3]);
          const expectedPoints = probabilityFormatFraction(points * winningFaces, 6);
          const answer = `${expectedPoints} ${expectedPoints === "1" ? "point" : "points"}`;
          return {
            question: `A game pays ${points} points if a fair die lands on one of ${winningFaces} winning faces and 0 points otherwise. What is the expected score per roll?`,
            answer,
            distractors: ["0 points", `${winningFaces} points`, `${points} points`],
          };
        },
      },
    ].filter((setup) => level >= setup.minLevel);
    return buildEntry(probabilityRandomChoice(setups).build());
  }

  function createRealLifeProbabilityQuestion() {
    const setups = [
      {
        minLevel: 2,
        build() {
          const made = probabilityRandomChoice([6, 7, 8, 9]);
          return {
            question: `A soccer player made ${made} shots out of 10 in practice. What is the best estimate of the chance the next shot goes in?`,
            answer: `${made * 10}%`,
            distractors: [`${(10 - made) * 10}%`, "50%", "100%"],
          };
        },
      },
      {
        minLevel: 4,
        build() {
          const onTime = probabilityRandomChoice([12, 15, 16, 18]);
          const total = 20;
          return {
            question: `A bus was on time ${onTime} days out of ${total}. What is the experimental probability that it is on time?`,
            answer: probabilityFormatPercent(onTime, total),
            distractors: [probabilityFormatPercent(total - onTime, total), "50%", "100%"],
          };
        },
      },
      {
        minLevel: 6,
        build() {
          const volunteers = probabilityRandomChoice([6, 8, 10, 12]);
          const total = probabilityRandomChoice([20, 24, 30]);
          const safeVolunteers = Math.min(volunteers, total - 1);
          return {
            question: `In a class of ${total} students, ${safeVolunteers} volunteered for cleanup. If one student is chosen at random, what is the chance the student did not volunteer?`,
            answer: probabilityFormatFraction(total - safeVolunteers, total),
            distractors: [probabilityFormatFraction(safeVolunteers, total), "1/2", "1/4"],
          };
        },
      },
      {
        minLevel: 8,
        build() {
          const correct = probabilityRandomChoice([72, 76, 81, 84]);
          const total = 100;
          return {
            question: `A spelling app marked ${correct} out of ${total} answers correct this week. What is the experimental probability of a correct answer?`,
            answer: `${correct}%`,
            distractors: [`${total - correct}%`, "50%", "100%"],
          };
        },
      },
    ].filter((setup) => level >= setup.minLevel);
    return buildEntry(probabilityRandomChoice(setups).build());
  }

  const generatedTemplates = [
    { minLevel: 1, weight: 3, build: createLikelihoodQuestion },
    { minLevel: 2, weight: 3, build: createWeatherQuestion },
    { minLevel: 5, weight: 3, build: createExperimentalQuestion },
    { minLevel: 3, weight: 3, build: createFairGameQuestion },
    { minLevel: 4, weight: 3, build: createBestStrategyQuestion },
    { minLevel: 5, weight: 3, build: createIndependentQuestion },
    { minLevel: 3, weight: 2, build: createNotEnoughInformationQuestion },
    { minLevel: 2, weight: 3, build: createCardQuestion },
    { minLevel: 1, weight: 3, build: createObjectBagQuestion },
    { minLevel: 2, weight: 3, build: createDiceQuestion },
    { minLevel: 4, weight: 3, build: createComplementQuestion },
    { minLevel: 5, weight: 3, build: createTwoStepQuestion },
    { minLevel: 6, weight: 3, build: createExpectedValueQuestion },
    { minLevel: 2, weight: 3, build: createRealLifeProbabilityQuestion },
  ];

  const generators = {
    1: [
      () => {
        const red = probabilityRandomInt(4, 8);
        const blue = probabilityRandomInt(1, 3);
        return buildEntry({
          question: `A bag has ${plural(red, "red marble")} and ${plural(blue, "blue marble")}. Which color are you more likely to pick?`,
          answer: "Red",
          distractors: ["Blue", "They are equally likely", "Neither color can be picked"],
        });
      },
      () => {
        const sections = probabilityRandomChoice([3, 4, 5, 6]);
        const answer = probabilityFormatFraction(1, sections);
        return buildEntry({
          question: `A spinner has ${sections} equal parts and only 1 part is green. What is the chance of landing on green?`,
          answer,
          distractors: ["1/2", "1/3", "1/4", "1/5"].filter((choice) => choice !== answer),
        });
      },
      () => buildEntry({
        question: "If you pick 1 marble without looking from a bag with only orange marbles, how likely is it to be orange?",
        answer: "Certain",
        distractors: ["Impossible", "Unlikely", "Equally likely"],
      }),
    ],
    2: [
      () => {
        const answer = String(probabilityRandomChoice([0, 7, 8, 9]));
        return buildEntry({
          question: "Which result is impossible on a standard 6-sided die?",
          answer,
          distractors: ["1", "3", "6"],
        });
      },
      () => {
        const favorable = probabilityRandomChoice([1, 2, 3]);
        const total = probabilityRandomChoice([4, 6, 8]);
        const answer = probabilityFormatFraction(favorable, total);
        return buildEntry({
          question: `A spinner has ${total} equal sections. ${favorable} ${favorable === 1 ? "section is" : "sections are"} blue. What is the chance of landing on blue?`,
          answer,
          distractors: ["1/2", "1/3", "1/4", "3/4"].filter((choice) => choice !== answer),
        });
      },
      () => {
        const count = probabilityRandomChoice([2, 3, 4, 5]);
        return buildEntry({
          question: `A basket has ${count} apples and ${count} oranges. Which is true if you pick 1 fruit without looking?`,
          answer: "Apple and orange are equally likely",
          distractors: ["Apple is more likely", "Orange is more likely", "Neither fruit can be picked"],
        });
      },
    ],
    3: [
      () => {
        const red = probabilityRandomInt(1, 4);
        const blue = probabilityRandomInt(5, 9);
        const answer = probabilityFormatFraction(red, red + blue);
        return buildEntry({
          question: `A bag has ${plural(red, "red marble")} and ${plural(blue, "blue marble")}. What is the chance of picking red?`,
          answer,
          distractors: [probabilityFormatFraction(blue, red + blue), "1/2", "1/10"],
        });
      },
      () => compareBagChance("blue", probabilityRandomInt(7, 9), probabilityRandomInt(1, 3), probabilityRandomInt(4, 6), probabilityRandomInt(4, 6)),
      () => buildEntry({
        question: "If you flip 2 fair coins, how many possible outcomes are there altogether?",
        answer: "4",
        distractors: ["2", "3", "6"],
      }),
    ],
    4: [
      () => {
        const events = [
          { text: "rolling an even number", favorable: 3 },
          { text: "rolling a number less than 3", favorable: 2 },
          { text: "rolling a 6", favorable: 1 },
          { text: "rolling a number greater than 2", favorable: 4 },
        ];
        const event = probabilityRandomChoice(events);
        return buildEntry({
          question: `What is the chance of ${event.text} on a standard 6-sided die?`,
          answer: probabilityFormatFraction(event.favorable, 6),
          distractors: ["1/6", "1/3", "1/2", "2/3", "5/6"].filter((choice) => choice !== probabilityFormatFraction(event.favorable, 6)),
        });
      },
      () => buildEntry({
        question: "If you toss 3 fair coins, how many possible outcomes are there altogether?",
        answer: "8",
        distractors: ["4", "6", "12"],
      }),
      () => {
        const red = probabilityRandomInt(2, 5);
        const blue = probabilityRandomInt(2, 5);
        const green = probabilityRandomInt(6, 9);
        return buildEntry({
          question: `A bag has ${red} red marbles, ${blue} blue marbles, and ${green} green marbles. Which color is most likely to be picked?`,
          answer: "Green",
          distractors: ["Red", "Blue", "All are equally likely"],
        });
      },
    ],
    5: [
      () => {
        const setups = [
          { blue: 1, total: 5 },
          { blue: 2, total: 5 },
          { blue: 3, total: 10 },
          { blue: 4, total: 10 },
        ];
        const setup = probabilityRandomChoice(setups);
        return buildEntry({
          question: `A box has ${setup.blue} blue balls out of ${setup.total} balls. What percentage of the balls are blue?`,
          answer: probabilityFormatPercent(setup.blue, setup.total),
          distractors: ["10%", "20%", "30%", "40%", "50%", "60%"].filter((choice) => choice !== probabilityFormatPercent(setup.blue, setup.total)),
        });
      },
      () => buildEntry({
        question: "How many equally likely outcomes are there if you flip one coin and roll one die?",
        answer: "12",
        distractors: ["6", "8", "10"],
      }),
      () => {
        const red = probabilityRandomInt(2, 4);
        const blue = probabilityRandomInt(5, 7);
        const green = probabilityRandomInt(3, 5);
        const counts = [
          { color: "Red", count: red },
          { color: "Blue", count: blue },
          { color: "Green", count: green },
        ];
        const least = counts.reduce((lowest, item) => (item.count < lowest.count ? item : lowest));
        return buildEntry({
          question: `A bag has ${red} red marbles, ${blue} blue marbles, and ${green} green marbles. Which color is least likely to be picked?`,
          answer: least.color,
          distractors: counts.map((item) => item.color).filter((color) => color !== least.color).concat("All are equally likely"),
        });
      },
    ],
    6: [
      () => {
        const red = probabilityRandomChoice([2, 3, 4, 5]);
        const blue = probabilityRandomChoice([5, 6, 7, 8]);
        const total = red + blue;
        const answer = probabilityFormatFraction(blue, total);
        return buildEntry({
          question: `A bag has ${red} red marbles and ${blue} blue marbles. What is the chance of not picking red?`,
          answer,
          distractors: [probabilityFormatFraction(red, total), "1/2", "1/4"],
        });
      },
      () => {
        const total = probabilityRandomChoice([8, 10, 12]);
        const blue = probabilityRandomChoice([2, 3, 4]);
        const answer = probabilityFormatFraction(total - blue, total);
        return buildEntry({
          question: `A spinner has ${total} equal sections. ${blue} sections are blue. What is the chance of not landing on blue?`,
          answer,
          distractors: [probabilityFormatFraction(blue, total), "1/2", "1/3"],
        });
      },
      () => {
        const good = probabilityRandomChoice([2, 3, 4]);
        const bad = probabilityRandomChoice([6, 8, 10]);
        const answer = probabilityFormatFraction(good, good + bad);
        return buildEntry({
          question: `A raffle has ${good} winning tickets and ${bad} losing tickets. What is the chance of picking a winning ticket?`,
          answer,
          distractors: [probabilityFormatFraction(bad, good + bad), "1/2", "1/4"],
        });
      },
    ],
    7: [
      () => {
        const spinnerSections = probabilityRandomChoice([3, 4, 5, 6]);
        return buildEntry({
          question: `You flip a fair coin and spin a ${spinnerSections}-section spinner. How many equally likely outcomes are there?`,
          answer: String(2 * spinnerSections),
          distractors: [String(spinnerSections), String(spinnerSections + 2), String(2 * spinnerSections + 2)],
        });
      },
      () => {
        const chanceDenominator = probabilityRandomChoice([4, 5, 6]);
        const trials = chanceDenominator * probabilityRandomChoice([8, 10, 12]);
        return buildEntry({
          question: `A spinner lands on red ${probabilityFormatFraction(1, chanceDenominator)} of the time. About how many reds would you expect in ${trials} spins?`,
          answer: String(trials / chanceDenominator),
          distractors: [String(chanceDenominator), String(trials / 2), String(trials - trials / chanceDenominator)],
        });
      },
      () => buildEntry({
        question: "What is the chance of flipping heads and then tails with a fair coin?",
        answer: "1/4",
        distractors: ["1/2", "1/3", "3/4"],
      }),
    ],
    8: [
      () => {
        const red = probabilityRandomChoice([3, 4, 5]);
        const blue = probabilityRandomChoice([2, 3, 4]);
        const answer = probabilityFormatFraction(red - 1, red + blue - 1);
        return buildEntry({
          question: `A bag has ${red} red and ${blue} blue marbles. You pick one red marble and do not put it back. What is the chance the next marble is red?`,
          answer,
          distractors: [probabilityFormatFraction(red, red + blue), probabilityFormatFraction(blue, red + blue - 1), "1/2"],
        });
      },
      () => buildEntry({
        question: "Two fair coins are flipped. What is the chance of getting at least one head?",
        answer: "3/4",
        distractors: ["1/4", "1/2", "1/3"],
      }),
      () => buildEntry({
        question: "Two fair dice are rolled. What is the chance that both dice show 6?",
        answer: "1/36",
        distractors: ["1/6", "1/12", "2/36"],
      }),
    ],
    9: [
      () => buildEntry({
        question: "Three fair coins are flipped. What is the chance of getting exactly two heads?",
        answer: "3/8",
        distractors: ["1/8", "1/2", "2/3"],
      }),
      () => buildEntry({
        question: "Two fair dice are rolled. What is the chance that the sum is 7?",
        answer: "1/6",
        distractors: ["1/12", "1/9", "7/36"],
      }),
      () => {
        const trials = probabilityRandomChoice([50, 100, 200]);
        const hits = Math.round(trials * probabilityRandomChoice([0.22, 0.34, 0.43]));
        return buildEntry({
          question: `In a simulation, red appeared ${hits} times in ${trials} trials. Which is the best estimate of the experimental probability of red?`,
          answer: probabilityFormatPercent(hits, trials),
          distractors: [probabilityFormatPercent(trials - hits, trials), "50%", "10%"],
        });
      },
    ],
    10: [
      () => {
        const soccerPlayers = probabilityRandomChoice([20, 30, 40]);
        const girls = soccerPlayers * probabilityRandomChoice([0.25, 0.4, 0.6]);
        return buildEntry({
          question: `A school club has ${soccerPlayers} soccer players. Of those soccer players, ${girls} are girls. If one soccer player is chosen, what is the chance the player is a girl?`,
          answer: probabilityFormatFraction(girls, soccerPlayers),
          distractors: [probabilityFormatFraction(girls, soccerPlayers + 10), probabilityFormatFraction(soccerPlayers - girls, soccerPlayers), "1/2"],
        });
      },
      () => buildEntry({
        question: "Two events are independent. Event A has chance 1/3 and Event B has chance 1/4. What is the chance both happen?",
        answer: "1/12",
        distractors: ["1/7", "1/3", "1/4"],
      }),
      () => buildEntry({
        question: "Four fair coins are flipped. What is the chance of getting exactly one head?",
        answer: "1/4",
        distractors: ["1/16", "1/2", "3/4"],
      }),
    ],
  };

  const eligibleTemplates = generatedTemplates
    .filter((template) => level >= template.minLevel && (!template.maxLevel || level <= template.maxLevel))
    .flatMap((template) => Array.from({ length: template.weight }, () => template.build));

  if (eligibleTemplates.length && (options.templateOnly || Math.random() < 0.7)) {
    return probabilityRandomChoice(eligibleTemplates)();
  }

  return probabilityRandomChoice(generators[level] || generators[10])();
}
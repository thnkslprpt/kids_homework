#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { resolveQaAppScriptSources } = require("./qa_app_sources.js");

const repoRoot = path.resolve(__dirname, "../..");
const htmlPath = path.join(repoRoot, "homework.html");
const samplesPerDifficulty = Number.parseInt(process.argv[2] || "100", 10);

function createElement(tagName = "div") {
  return {
    tagName: String(tagName).toUpperCase(),
    children: [],
    dataset: {},
    style: { setProperty() {}, removeProperty() {} },
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    hidden: false,
    disabled: false,
    value: "",
    textContent: "",
    innerHTML: "",
    appendChild(child) {
      this.children.push(child);
      return child;
    },
    addEventListener() {},
    removeEventListener() {},
    setAttribute() {},
    getAttribute() { return ""; },
    querySelectorAll() { return []; },
    querySelector() { return null; },
    focus() {},
    getBoundingClientRect() {
      return { left: 0, top: 0, width: 100, height: 40, right: 100, bottom: 40 };
    },
  };
}

function createContext() {
  const elementsById = new Map();
  const storage = {
    getItem() { return null; },
    setItem() {},
    removeItem() {},
    clear() {},
  };
  const document = {
    body: createElement("body"),
    documentElement: createElement("html"),
    createElement,
    createElementNS: (_namespace, tagName) => createElement(tagName),
    getElementById(id) {
      if (!elementsById.has(id)) {
        const element = createElement("div");
        element.id = id;
        element.value = id === "difficulty-level" ? "3" : id === "question-count" ? "30" : "";
        elementsById.set(id, element);
      }
      return elementsById.get(id);
    },
    querySelectorAll() { return []; },
    querySelector() { return null; },
  };
  const navigator = {
    serviceWorker: {
      controller: null,
      addEventListener() {},
      register() {
        return Promise.resolve({ waiting: null, installing: null, addEventListener() {} });
      },
    },
  };
  const context = {
    console,
    document,
    window: null,
    globalThis: null,
    localStorage: storage,
    navigator,
    Math,
    Date,
    JSON,
    Number,
    String,
    Boolean,
    Array,
    Object,
    Set,
    Map,
    RegExp,
    Error,
    URLSearchParams,
    setTimeout,
    clearTimeout,
    requestAnimationFrame(callback) {
      return setTimeout(() => callback(Date.now()), 0);
    },
    cancelAnimationFrame(id) {
      clearTimeout(id);
    },
  };
  context.window = {
    document,
    localStorage: storage,
    navigator,
    innerWidth: 1280,
    innerHeight: 900,
    location: { search: "", reload() {} },
    addEventListener() {},
    removeEventListener() {},
    setTimeout,
    clearTimeout,
    requestAnimationFrame: context.requestAnimationFrame,
    cancelAnimationFrame: context.cancelAnimationFrame,
  };
  context.globalThis = context;
  return vm.createContext(context);
}

function loadAppContext() {
  const context = createContext();
  const sources = resolveQaAppScriptSources(repoRoot, htmlPath);
  for (const source of sources) {
    const code = fs.readFileSync(path.join(repoRoot, source), "utf8");
    vm.runInContext(code, context, { filename: source });
  }
  return context;
}

function parseClockTime(value) {
  const match = String(value).match(/^(\d{1,2}):(\d{2}) (AM|PM)$/);
  if (!match) {
    return null;
  }
  let hour = Number(match[1]) % 12;
  if (match[3] === "PM") {
    hour += 12;
  }
  return hour * 60 + Number(match[2]);
}

function formatClockTime(totalMinutes) {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const hour24 = Math.floor(normalized / 60);
  const minute = normalized % 60;
  const suffix = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12;
  return `${hour12}:${String(minute).padStart(2, "0")} ${suffix}`;
}

function formatClockTimeWithoutSuffix(totalMinutes) {
  return formatClockTime(totalMinutes).replace(/ (AM|PM)$/, "");
}

function parseDuration(value) {
  const text = String(value);
  let match = text.match(/^(\d+) minutes?$/);
  if (match) {
    return Number(match[1]);
  }
  match = text.match(/^(\d+) hours?(?: (\d+) minutes)?$/);
  if (match) {
    return Number(match[1]) * 60 + Number(match[2] || 0);
  }
  return null;
}

function formatDuration(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) {
    return `${minutes} minutes`;
  }
  if (minutes === 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"}`;
  }
  return `${hours} ${hours === 1 ? "hour" : "hours"} ${minutes} minutes`;
}

function elapsedMinutes(start, end) {
  return ((end - start) % 1440 + 1440) % 1440;
}

function expectChoiceShape(question, meta) {
  const errors = [];
  const options = Array.isArray(question.options) ? question.options.map(String) : [];
  const answer = String(question.answerValue ?? question.answer ?? "");
  if (!String(question.questionText ?? question.question ?? "").trim()) {
    errors.push(`${meta}: blank question`);
  }
  if (options.length !== 4 || new Set(options).size !== 4) {
    errors.push(`${meta}: expected 4 unique options`);
  }
  if (options.filter((option) => option === answer).length !== 1) {
    errors.push(`${meta}: answer does not appear exactly once: ${answer}`);
  }
  return errors;
}

function validateTime(question, meta) {
  const errors = expectChoiceShape(question, meta);
  const text = question.questionText;
  const display = question.displayText || "";
  const answer = question.answerValue;
  let match;

  function expectTime(minutes) {
    const expected = formatClockTime(minutes);
    if (answer !== expected) {
      errors.push(`${meta}: expected ${expected}, got ${answer} (${text})`);
    }
  }

  function expectDuration(minutes) {
    const expected = formatDuration(minutes);
    if (answer !== expected) {
      errors.push(`${meta}: expected ${expected}, got ${answer} (${text})`);
    }
  }

  if ((match = text.match(/^It's (.+?)\. In (\d+) minutes/))) {
    expectTime(parseClockTime(match[1]) + Number(match[2]));
  } else if ((match = text.match(/^It is (.+?)\. In (\d+) minutes/))) {
    expectTime(parseClockTime(match[1]) + Number(match[2]));
  } else if ((match = text.match(/^Maya starts reading at (.+?) and reads for (.+?)\./))) {
    expectTime(parseClockTime(match[1]) + parseDuration(match[2]));
  } else if ((match = text.match(/^The bus leaves at (.+?)\. It arrives (.+?) later\./))) {
    expectTime(parseClockTime(match[1]) + parseDuration(match[2]));
  } else if ((match = text.match(/^It is (.+?)\. Snack time is at (.+?)\./))) {
    expectDuration(elapsedMinutes(parseClockTime(match[1]), parseClockTime(match[2])));
  } else if ((match = text.match(/^It is (.+?)\. .+ starts at (.+?)\./))) {
    expectDuration(elapsedMinutes(parseClockTime(match[1]), parseClockTime(match[2])));
  } else if ((match = text.match(/(?:ended|landed) at (.+?)\. It lasted (.+?)\./))) {
    expectTime(parseClockTime(match[1]) - parseDuration(match[2]));
  } else if ((match = text.match(/^It is (.+?)\. Lunch starts in (\d+) minutes\./))) {
    expectTime(parseClockTime(match[1]) + Number(match[2]));
  } else if ((match = text.match(/^You arrive at the station at (.+?)\./))) {
    const arrival = parseClockTime(match[1]);
    const trainTimes = Array.from(display.matchAll(/[A-D]: (.+)/g), (item) => parseClockTime(item[1]));
    expectTime(trainTimes.find((time) => time >= arrival));
  } else if (text === "How long is the break?") {
    match = display.match(/Break: (.+?)-(.+)/);
    expectDuration(elapsedMinutes(parseClockTime(match[1]), parseClockTime(match[2])));
  } else if ((match = text.match(/^You arrive at (.+?)\. How long until Science starts\?/))) {
    const science = display.match(/Science: (.+?)-/);
    expectDuration(elapsedMinutes(parseClockTime(match[1]), parseClockTime(science[1])));
  } else if ((match = text.match(/^Maya starts homework at (.+?)\. She reads for (.+?), takes a (\d+)-minute break, then does math for (.+?)\./))) {
    expectTime(parseClockTime(match[1]) + parseDuration(match[2]) + Number(match[3]) + parseDuration(match[4]));
  } else if ((match = text.match(/^Maya starts homework at (.+?)\. She reads for ([^,]+), then does math for (.+?)\./))) {
    expectTime(parseClockTime(match[1]) + parseDuration(match[2]) + parseDuration(match[3]));
  } else if ((match = text.match(/^Ben needs to leave home at (.+?)\. Getting dressed takes (.+?), breakfast takes (.+?), and packing takes (.+?)\./))) {
    expectTime(parseClockTime(match[1]) - parseDuration(match[2]) - parseDuration(match[3]) - parseDuration(match[4]));
  } else if ((match = text.match(/^Which time is (\d+) o'clock\?/))) {
    if (answer !== `${Number(match[1])}:00`) errors.push(`${meta}: wrong o'clock answer`);
  } else if ((match = text.match(/^Which time is half past (\d+)\?/))) {
    if (answer !== `${Number(match[1])}:30`) errors.push(`${meta}: wrong half-past answer`);
  } else if ((match = text.match(/^Which time is quarter past (\d+)\?/))) {
    if (answer !== `${Number(match[1])}:15`) errors.push(`${meta}: wrong quarter-past answer`);
  } else if ((match = text.match(/^Which time is quarter to (\d+)\?/))) {
    const hour = Number(match[1]);
    if (answer !== `${hour === 1 ? 12 : hour - 1}:45`) errors.push(`${meta}: wrong quarter-to answer`);
  } else if ((match = text.match(/^Which time is (\d+) minutes (after|before) (\d{1,2}:\d{2})\?/))) {
    const [hour, minute] = match[3].split(":").map(Number);
    const start = hour * 60 + minute;
    const expected = formatClockTimeWithoutSuffix(start + (match[2] === "after" ? Number(match[1]) : -Number(match[1])));
    if (answer !== expected) errors.push(`${meta}: expected ${expected}, got ${answer}`);
  } else if ((match = text.match(/^It is (.+?) in .+\. .+ is (\d+) hours (earlier|later)\./))) {
    const offset = Number(match[2]) * 60 * (match[3] === "later" ? 1 : -1);
    expectTime(parseClockTime(match[1]) + offset);
  } else {
    errors.push(`${meta}: unrecognized time template: ${text}`);
  }

  return errors;
}

function gcd(left, right) {
  let a = Math.abs(left);
  let b = Math.abs(right);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

function fraction(numerator, denominator) {
  if (numerator === 0) return "0";
  if (numerator === denominator) return "1";
  const divisor = gcd(numerator, denominator);
  return `${numerator / divisor}/${denominator / divisor}`;
}

function percent(numerator, denominator) {
  const value = (numerator / denominator) * 100;
  return `${Number.isInteger(value) ? value : value.toFixed(1)}%`;
}

function validateProbability(entry, meta) {
  const question = { ...entry, questionText: entry.question, answerValue: entry.answer };
  const errors = expectChoiceShape(question, meta);
  const text = entry.question;
  let match;

  if (/roll an 8/.test(text)) {
    if (entry.answer !== "Impossible") errors.push(`${meta}: die 8 should be impossible`);
  } else if (/only red marbles/.test(text)) {
    if (entry.answer !== "Certain") errors.push(`${meta}: only red should be certain`);
  } else if (/fair coin is flipped/.test(text) && /heads compared with tails/.test(text)) {
    if (entry.answer !== "Equally likely") errors.push(`${meta}: fair coin outcomes should be equally likely`);
  } else if ((match = text.match(/has (\d+) blue sections and (\d+) yellow/))) {
    const expected = Number(match[1]) > Number(match[2]) ? "Likely" : "Unlikely";
    if (entry.answer !== expected) errors.push(`${meta}: spinner likelihood answer is wrong`);
  } else if (/raffle box/.test(text)) {
    if (entry.answer !== "Unlikely") errors.push(`${meta}: small winning-ticket chance should be unlikely`);
  } else if ((match = text.match(/(.+) has a (\d+)% chance of rain\. (.+) has a (\d+)% chance of rain/))) {
    const expected = Number(match[2]) > Number(match[4]) ? match[1] : match[3];
    if (entry.answer !== expected) errors.push(`${meta}: expected wetter day ${expected}`);
  } else if ((match = text.match(/there is a (\d+)% chance of rain/))) {
    const chance = Number(match[1]);
    const expected = chance > 50 ? "Rain is more likely than no rain" : chance < 50 ? "Rain is less likely than no rain" : "Rain and no rain are equally likely";
    if (entry.answer !== expected) errors.push(`${meta}: wrong forecast interpretation`);
  } else if ((match = text.match(/got heads (\d+) times\. What is \d+\/(\d+) called/))) {
    if (entry.answer !== "The experimental probability") errors.push(`${meta}: observed result should be experimental probability`);
  } else if ((match = text.match(/In (\d+) spins, red happened (\d+) times/))) {
    const expected = fraction(Number(match[2]), Number(match[1]));
    if (entry.answer !== expected) errors.push(`${meta}: expected experimental probability ${expected}`);
  } else if ((match = text.match(/expectation .* is about (\d+) times\. It actually happens (\d+) times/))) {
    const expected = Number(match[2]) > Number(match[1]) ? "higher" : "lower";
    if (!entry.answer.includes(expected)) errors.push(`${meta}: wrong experimental comparison`);
  } else if ((match = text.match(/Ana wins on ([\d, ]+)\. Ben wins on ([\d, ]+)\./))) {
    const ana = match[1].split(",").map((item) => item.trim()).filter(Boolean).length;
    const ben = match[2].split(",").map((item) => item.trim()).filter(Boolean).length;
    const expected = ana === ben ? "Yes" : ana > ben ? "Ana" : "Ben";
    if (!entry.answer.includes(expected)) errors.push(`${meta}: wrong fair-game answer`);
  } else if (/Which bag should you choose/.test(text)) {
    const bags = Array.from(entry.displayText.matchAll(/Bag ([A-D]): (\d+) red and (\d+) blue/g));
    const best = bags.reduce((currentBest, bag) => {
      const score = Number(bag[2]) / (Number(bag[2]) + Number(bag[3]));
      return score > currentBest.score ? { label: `Bag ${bag[1]}`, score } : currentBest;
    }, { label: "", score: -1 });
    if (entry.answer !== best.label) errors.push(`${meta}: expected best bag ${best.label}`);
  } else if (/next flip/.test(text)) {
    if (entry.answer !== "1/2") errors.push(`${meta}: independent next coin flip should be 1/2`);
  } else if (/flip a fair coin twice/.test(text) && /result type/.test(text)) {
    if (entry.answer !== "One head and one tail") errors.push(`${meta}: one head and one tail has two outcomes`);
  } else if (/two heads in a row/.test(text)) {
    if (entry.answer !== "1/4") errors.push(`${meta}: two heads should be 1/4`);
  } else if (/rolling a 6 both times/.test(text)) {
    if (entry.answer !== "1/36") errors.push(`${meta}: two sixes should be 1/36`);
  } else if (/do not know|no counts are given|without knowing/.test(text)) {
    if (!/not enough information/i.test(entry.answer)) errors.push(`${meta}: missing-information question should say not enough information`);
  } else if ((match = text.match(/small deck has (\d+) star cards and (\d+) moon cards/))) {
    const expected = Number(match[1]) > Number(match[2]) ? "Star" : Number(match[2]) > Number(match[1]) ? "Moon" : "They are equally likely";
    if (entry.answer !== expected) errors.push(`${meta}: expected card likelihood ${expected}`);
  } else if ((match = text.match(/standard deck\. What is the chance (?:it is a|of picking) (.+)\?/))) {
    const event = match[1];
    const favorableByEvent = {
      "a heart": 13,
      "a diamond": 13,
      "a club": 13,
      "a spade": 13,
      heart: 13,
      diamond: 13,
      club: 13,
      spade: 13,
      "an ace": 4,
      "a red card": 26,
      "a face card": 12,
      "a black queen": 2,
    };
    const expected = fraction(favorableByEvent[event], 52);
    if (entry.answer !== expected) errors.push(`${meta}: expected standard-deck probability ${expected}`);
  } else if ((match = text.match(/deck has (\d+) red cards and (\d+) black cards\. You draw 2 cards without replacement\. What is the chance both are red/))) {
    const red = Number(match[1]);
    const black = Number(match[2]);
    const total = red + black;
    const expected = fraction(red * (red - 1), total * (total - 1));
    if (entry.answer !== expected) errors.push(`${meta}: expected two-red card probability ${expected}`);
  } else if ((match = text.match(/lunch basket has (\d+) apples? and (\d+) bananas?\. Which snack is more likely/))) {
    const expected = Number(match[1]) > Number(match[2]) ? "Apple" : "Banana";
    if (entry.answer !== expected) errors.push(`${meta}: expected more likely snack ${expected}`);
  } else if ((match = text.match(/cookie jar has (\d+) chocolate cookies? and (\d+) vanilla cookies?\. What is the chance of picking a chocolate cookie/))) {
    const chocolate = Number(match[1]);
    const vanilla = Number(match[2]);
    const expected = fraction(chocolate, chocolate + vanilla);
    if (entry.answer !== expected) errors.push(`${meta}: expected chocolate-cookie probability ${expected}`);
  } else if ((match = text.match(/bag has (\d+) green cubes?, (\d+) yellow cubes?, and (\d+) purple cubes?\. What is the chance of picking green or yellow/))) {
    const green = Number(match[1]);
    const yellow = Number(match[2]);
    const purple = Number(match[3]);
    const expected = fraction(green + yellow, green + yellow + purple);
    if (entry.answer !== expected) errors.push(`${meta}: expected green-or-yellow probability ${expected}`);
  } else if ((match = text.match(/prize box has (\d+) pencils?, (\d+) erasers?, and (\d+) stickers?\. What is the chance of not picking a sticker/))) {
    const pencils = Number(match[1]);
    const erasers = Number(match[2]);
    const stickers = Number(match[3]);
    const expected = fraction(pencils + erasers, pencils + erasers + stickers);
    if (entry.answer !== expected) errors.push(`${meta}: expected not-sticker probability ${expected}`);
  } else if ((match = text.match(/chance of (rolling .+) on a standard 6-sided die/))) {
    const favorableByEvent = {
      "rolling an odd number": 3,
      "rolling a number less than 3": 2,
      "rolling a number greater than 4": 2,
      "rolling a 5": 1,
    };
    const expected = fraction(favorableByEvent[match[1]], 6);
    if (entry.answer !== expected) errors.push(`${meta}: expected die probability ${expected}`);
  } else if ((match = text.match(/Two fair dice are rolled\. What is the chance that (.+)\?/))) {
    const favorableByEvent = {
      "both dice show the same number": 6,
      "the sum is 7": 6,
      "the sum is 2": 1,
      "the sum is at least 10": 6,
    };
    const expected = fraction(favorableByEvent[match[1]], 36);
    if (entry.answer !== expected) errors.push(`${meta}: expected two-dice probability ${expected}`);
  } else if ((match = text.match(/A fair die is rolled twice\. What is the chance of rolling \d first and \d second/))) {
    if (entry.answer !== "1/36") errors.push(`${meta}: ordered two-roll outcome should be 1/36`);
  } else if ((match = text.match(/spinner has (\d+) equal sections\. (\d+) sections are red\. What is the chance of not landing on red/))) {
    const total = Number(match[1]);
    const red = Number(match[2]);
    const expected = fraction(total - red, total);
    if (entry.answer !== expected) errors.push(`${meta}: expected not-red spinner probability ${expected}`);
  } else if ((match = text.match(/number card is chosen from 1 through (\d+)\. What is the chance of not choosing a multiple of 3/))) {
    const total = Number(match[1]);
    const multiples = Math.floor(total / 3);
    const expected = fraction(total - multiples, total);
    if (entry.answer !== expected) errors.push(`${meta}: expected not-multiple-of-3 probability ${expected}`);
  } else if ((match = text.match(/delivery has a (\d+)% chance of arriving late\. What is the chance it does not arrive late/))) {
    const expected = `${100 - Number(match[1])}%`;
    if (entry.answer !== expected) errors.push(`${meta}: expected delivery complement ${expected}`);
  } else if ((match = text.match(/flip a fair coin and pick one card from (\d+) color cards\. How many equally likely outcomes/))) {
    const expected = String(Number(match[1]) * 2);
    if (entry.answer !== expected) errors.push(`${meta}: expected coin-card outcomes ${expected}`);
  } else if ((match = text.match(/card is picked from (\d+) numbered cards, then a fair coin is flipped\. What is the chance of picking card 1 and flipping heads/))) {
    const expected = fraction(1, Number(match[1]) * 2);
    if (entry.answer !== expected) errors.push(`${meta}: expected card-and-coin probability ${expected}`);
  } else if ((match = text.match(/bag has (\d+) red and (\d+) blue tokens\. You draw 2 tokens without replacement\. What is the chance both are blue/))) {
    const red = Number(match[1]);
    const blue = Number(match[2]);
    const total = red + blue;
    const expected = fraction(blue * (blue - 1), total * (total - 1));
    if (entry.answer !== expected) errors.push(`${meta}: expected two-blue token probability ${expected}`);
  } else if ((match = text.match(/chance of passing step 1 is 1\/(\d+), and the chance of passing step 2 is 1\/(\d+)\. What is the chance of passing both steps/))) {
    const expected = fraction(1, Number(match[1]) * Number(match[2]));
    if (entry.answer !== expected) errors.push(`${meta}: expected independent two-step probability ${expected}`);
  } else if ((match = text.match(/prize spinner wins (?:1\/(\d+)) of the time\. About how many wins should you expect in (\d+) spins/))) {
    const expected = String(Number(match[2]) / Number(match[1]));
    if (entry.answer !== expected) errors.push(`${meta}: expected prize-spinner wins ${expected}`);
  } else if ((match = text.match(/spinner has (\d+) winning sections out of (\d+) equal sections\. About how many wins should you expect in (\d+) spins/))) {
    const expected = String((Number(match[3]) * Number(match[1])) / Number(match[2]));
    if (entry.answer !== expected) errors.push(`${meta}: expected spinner wins ${expected}`);
  } else if ((match = text.match(/game pays (\d+) points if a fair die lands on one of (\d+) winning faces and 0 points otherwise\. What is the expected score per roll/))) {
    const expectedValue = fraction(Number(match[1]) * Number(match[2]), 6);
    const expected = `${expectedValue} ${expectedValue === "1" ? "point" : "points"}`;
    if (entry.answer !== expected) errors.push(`${meta}: expected die-game value ${expected}`);
  } else if ((match = text.match(/soccer player made (\d+) shots out of 10/))) {
    const expected = `${Number(match[1]) * 10}%`;
    if (entry.answer !== expected) errors.push(`${meta}: expected shot estimate ${expected}`);
  } else if ((match = text.match(/bus was on time (\d+) days out of (\d+)\. What is the experimental probability/))) {
    const expected = percent(Number(match[1]), Number(match[2]));
    if (entry.answer !== expected) errors.push(`${meta}: expected bus experimental probability ${expected}`);
  } else if ((match = text.match(/class of (\d+) students, (\d+) volunteered for cleanup\. If one student is chosen at random, what is the chance the student did not volunteer/))) {
    const total = Number(match[1]);
    const volunteered = Number(match[2]);
    const expected = fraction(total - volunteered, total);
    if (entry.answer !== expected) errors.push(`${meta}: expected cleanup complement ${expected}`);
  } else if ((match = text.match(/spelling app marked (\d+) out of (\d+) answers correct this week/))) {
    const expected = percent(Number(match[1]), Number(match[2]));
    if (entry.answer !== expected) errors.push(`${meta}: expected spelling experimental probability ${expected}`);
  } else {
    errors.push(`${meta}: unrecognized probability template: ${text}`);
  }

  return errors;
}

function run() {
  const context = loadAppContext();
  const failures = [];

  for (let difficulty = 1; difficulty <= 10; difficulty += 1) {
    for (let sample = 0; sample < samplesPerDifficulty; sample += 1) {
      const timeQuestion = vm.runInContext(`createTimeChoiceQuestion(${difficulty})`, context);
      failures.push(...validateTime(timeQuestion, `time difficulty ${difficulty} sample ${sample + 1}`));

      const probabilityEntry = vm.runInContext(`createProbabilityGeneratedEntry(${difficulty}, { templateOnly: true })`, context);
      failures.push(...validateProbability(probabilityEntry, `probability difficulty ${difficulty} sample ${sample + 1}`));
    }
  }

  if (failures.length) {
    console.error(`${failures.length} time/probability QA failures:`);
    failures.slice(0, 120).forEach((failure) => console.error(`- ${failure}`));
    if (failures.length > 120) {
      console.error(`... ${failures.length - 120} more failures omitted`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(`Validated ${samplesPerDifficulty * 10} time and ${samplesPerDifficulty * 10} probability generated questions.`);
}

run();

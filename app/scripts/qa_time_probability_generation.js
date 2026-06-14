#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

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
  const html = fs.readFileSync(htmlPath, "utf8");
  const sources = Array.from(html.matchAll(/<script\s+src="([^"]+)"><\/script>/g), (match) => match[1]);
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

#!/usr/bin/env node

const vm = require("node:vm");
const { loadAppContext, textKey, validateQuestion } = require("./qa_question_generation.js");

const samplesPerGrade = Number.parseInt(process.argv[2] || "60", 10);
const targetedCategories = [
  "math",
  "addition-subtraction",
  "multiplication-division",
  "place-value-decimals",
  "geometry",
  "patterns-sequences",
  "coordinates-functions",
  "time",
  "statistics",
  "negative-numbers",
  "percentages",
  "visual-math",
  "charts-and-graphs",
  "probability",
  "fractions",
  "fractions-and-ratios",
  "algebra",
  "measurement",
  "estimation",
];

const forbiddenRules = {
  math: {
    1: /(?:×|÷|%|decimal|thousand|hundredth|negative|area|perimeter|prime|round)/i,
    2: /(?:%|decimal|negative|prime|square root|equation)/i,
    3: /(?:%|decimal|negative|square root|scientific notation)/i,
    4: /(?:%|negative|square root|scientific notation)/i,
    5: /(?:%|negative|square root|scientific notation)/i,
  },
  time: {
    1: /(?:quarter|minutes (?:after|before)|schedule|time zone|elapsed|in \d+ minutes)/i,
  },
  statistics: {
    1: /(?:mean|median|mode|range|association|relative frequency|outlier|sample)/i,
    2: /(?:mean|median|mode|range|association|relative frequency|outlier|sample)/i,
    3: /(?:\bmean\b|median|association|relative frequency|outlier|weighted|conditional)/i,
    4: /(?:\bmean\b|association|relative frequency|weighted|conditional)/i,
  },
  "negative-numbers": {
    1: /(?:temperature|elevator|solve|calculate|start at|move \d|×|÷|²)/i,
    2: /(?:solve|calculate|start at|move \d|×|÷|²)/i,
  },
  percentages: {
    1: /(?:discount|sale price|what is \d+% of|is what percent|rises|falls|growth|error)/i,
    2: /(?:discount|sale price|what is \d+% of|is what percent|rises|falls|growth|error)/i,
    3: /(?:discount|sale price|is what percent|rises|falls|compound|error)/i,
  },
  "visual-math": {
    1: /(?:coordinate|area|perimeter|mean|median|angle|equation|function)/i,
    2: /(?:coordinate|area|perimeter|mean|median|equation|function)/i,
  },
  "charts-and-graphs": {
    1: /(?:scatter|association|mean|median|outlier|sample|bias|relative frequency|two-way)/i,
    2: /(?:scatter|association|mean|median|outlier|bias|relative frequency|two-way)/i,
  },
};

const requiredRules = {
  "addition-subtraction": {
    1: /(?:ten-frame|number makes|make 10|\+|−|-)/i,
    5: /(?:decimal|49\.98|combine|add)/i,
    8: /(?:radical|√|terms)/i,
    9: /(?:like terms|x)/i,
    10: /(?:like terms|x²)/i,
  },
  "multiplication-division": {
    1: /(?:equal rows|shared equally|represent)/i,
    3: /(?:array|multiplication|quotient|represent)/i,
    6: /(?:portions|fraction|÷)/i,
    8: /(?:power|exponent)/i,
    9: /(?:exponent|product rule)/i,
    10: /(?:factor|x²)/i,
  },
  "place-value-decimals": {
    1: /(?:tens|ones|greatest|expanded)/i,
    5: /(?:decimal|hundred grid)/i,
    8: /(?:scientific notation|power of ten)/i,
    10: /(?:significant figures)/i,
  },
  geometry: {
    1: /(?:shape|sides|description)/i,
    3: /(?:area|square)/i,
    5: /(?:volume|square)/i,
    8: /(?:right triangle|hypotenuse|Pythagorean)/i,
    10: /(?:sin\(|right triangle)/i,
  },
  "patterns-sequences": {
    1: /(?:pattern|comes next)/i,
    5: /(?:rule|output|function)/i,
    8: /(?:y =|rule|linear)/i,
    10: /(?:sequence|term|rule)/i,
  },
  "coordinates-functions": {
    1: /(?:star|position|compared)/i,
    5: /(?:coordinate|moves|translate)/i,
    8: /(?:linear equation|slope|points)/i,
    9: /(?:vertex|quadratic)/i,
    10: /(?:f\(x\)|g\(x\)|function)/i,
  },
};

function questionText(question) {
  return [
    question?.questionText,
    question?.displayText,
    question?.visualSummary,
    question?.reviewText,
  ].filter(Boolean).join(" ");
}

function run() {
  const context = loadAppContext();
  const failures = [];
  let checked = 0;

  for (const category of targetedCategories) {
    for (let grade = 1; grade <= 10; grade += 1) {
      for (let sample = 0; sample < samplesPerGrade; sample += 1) {
        const label = `${category} grade ${grade} sample ${sample + 1}`;
        let question;
        try {
          [question] = vm.runInContext(
            `buildSessionQuestions(1, ${grade}, { adaptiveReview: false, selectedCategories: [${JSON.stringify(category)}], minDifficulty: ${grade} })`,
            context,
            { timeout: 1000 }
          );
        } catch (error) {
          failures.push(`${label}: generation threw ${error.message || error}`);
          continue;
        }

        checked += 1;
        failures.push(...validateQuestion(question, label));
        failures.push(...context.HOMEWORK_TEST_API.validateHomeworkQuestionShape(question, label));
        if (Number(question?.difficulty) !== grade) {
          failures.push(`${label}: generated difficulty ${question?.difficulty}`);
        }

        const text = questionText(question);
        if (/\b(?:NaN|undefined|null)\b/.test(text)) {
          failures.push(`${label}: leaked invalid value in ${JSON.stringify(text)}`);
        }
        if (/\b\d+\.\d+ (?:students|children|people|players|marbles|tiles|books)\b/i.test(text)) {
          failures.push(`${label}: impossible fractional object/person count in ${JSON.stringify(text)}`);
        }

        const forbidden = forbiddenRules[category]?.[grade];
        if (forbidden?.test(text)) {
          failures.push(`${label}: out-of-grade topic matched ${forbidden}: ${JSON.stringify(text)}`);
        }
        const required = requiredRules[category]?.[grade];
        if (required && !required.test(text)) {
          failures.push(`${label}: expected grade focus ${required}: ${JSON.stringify(text)}`);
        }
      }
    }
  }

  // The broad Math category alternates input/choice in real sessions. Exercise
  // both paths directly so high-school content cannot silently fall back to the
  // capped elementary generator.
  for (let grade = 1; grade <= 10; grade += 1) {
    for (let sample = 0; sample < samplesPerGrade; sample += 1) {
      for (const factory of ["createMathInputQuestion", "createMathChoiceQuestion"]) {
        const label = `${factory} grade ${grade} sample ${sample + 1}`;
        const question = vm.runInContext(`HOMEWORK_TEST_API.${factory}(${grade})`, context);
        checked += 1;
        failures.push(...validateQuestion(question, label));
        const text = questionText(question);
        const forbidden = forbiddenRules.math?.[grade];
        if (forbidden?.test(text)) failures.push(`${label}: out-of-grade topic matched ${forbidden}: ${JSON.stringify(text)}`);
        if (grade === 8 && !/(?:linear|square root|equation|root|exponent|coordinate|angle|triangle|value)/i.test(text)) {
          failures.push(`${label}: grade 8 Math did not use an advanced family: ${JSON.stringify(text)}`);
        }
        if (grade === 9 && !/(?:f\(|quadratic|solution|radical|root|exponent|coordinate|factor|equation|percent)/i.test(text)) {
          failures.push(`${label}: grade 9 Math did not use an advanced family: ${JSON.stringify(text)}`);
        }
        if (grade === 10 && !/(?:sequence|term|quadratic|discriminant|factor|coordinate|g\(f\(|function)/i.test(text)) {
          failures.push(`${label}: grade 10 Math did not use an advanced family: ${JSON.stringify(text)}`);
        }
      }
    }
  }

  console.log(`Grade-alignment QA checked ${checked} generated questions (${samplesPerGrade} samples per grade).`);
  if (failures.length) {
    console.error(`\n${failures.length} grade-alignment failures:`);
    failures.slice(0, 200).forEach((failure) => console.error(`- ${failure}`));
    if (failures.length > 200) console.error(`... ${failures.length - 200} more failures omitted`);
    process.exitCode = 1;
    return;
  }
  console.log("No grade-alignment failures found.");
}

if (require.main === module) run();

module.exports = { forbiddenRules, requiredRules, targetedCategories };

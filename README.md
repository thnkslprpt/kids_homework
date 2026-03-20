# Homework

This is a plain offline homework app. Put the whole folder on a computer or Chromebook, then open
[`index.html`](./index.html) in Chrome.

## Current Features

- Works offline from a normal folder.
- Lets you choose:
  - how many questions to use for the session
  - difficulty level `1` to `5`
- Defaults to:
  - `30` questions
  - difficulty `3`
- Tracks live progress with colored progress boxes and a score counter.
- Multiple-choice questions check immediately when you click an answer.
- Typed math questions check when you press `Enter`.
- Shows review feedback for wrong answers with the question, your answer, and the correct answer.
- Shows a final results screen with praise text and confetti.

## Question Mix

The session is built by percentage, not by a fixed repeating slot number.

- Math and Hebrew together make up 50% of the session.
- Math and Hebrew together make up about `40%` to `50%` of the session.
- The current target is about `45%`, rounded to whole questions.
- The remaining share is split as evenly as possible between the non-core categories.
- If a session is short, the app uses a balanced shuffled subset of the non-core categories so the
  same few categories do not always appear first.

Within math, the app uses both:

- input-answer questions
- multiple-choice questions

## Categories

- `Math`
  - addition and subtraction, including negative numbers down to `-20`
  - multiplication tables up to `10x10`
  - skip counting
  - number patterns
  - comparing numbers
  - percentages with whole-number answers
  - money / shekel change questions
- `Hebrew`
  - multiple-choice Hebrew word meaning questions
  - includes nikud where helpful
- `Science`
  - offline multiple-choice science bank
- `Time`
  - questions like “In 15 minutes, what time will it be?”
- `Statistics`
  - mean, median, mode, range, and simple data-reading questions
- `Logic`
  - patterns, ordering, elimination, and deduction
- `Rationality`
  - probability, evidence, fair testing, sampling, and careful conclusions
- `General Knowledge`
  - useful ballpark facts and geography / Earth knowledge rather than obscure trivia
- `Population`
  - top 20 most populous countries
  - population answers rounded to the nearest `10 million`
- `Financial Literacy`
  - saving, spending, needs vs wants, better deals, discounts, and simple budgeting
- `Measurement`
  - length, mass, volume, temperature, and unit conversions
- `Charts and Graphs`
  - generated visual bar-chart and table questions
  - reading totals, exact values, biggest/smallest values, and comparisons
- `Calendar`
  - months, weekdays, leap years, dates, and elapsed days
- `Estimation`
  - ballpark answers and reasonableness checks
- `Probability`
  - likelihood, equal chance, impossible/certain events, and simple fractions of chance
- `Maps and Directions`
  - cardinal directions, map keys, relative position, and simple scale
- `Digital Safety`
  - passwords, scams, private information, safe sharing, and suspicious links
- `Media Literacy`
  - fact vs opinion, ads, clickbait, source checking, and misleading graphs
- `Health and First Aid`
  - basic safety, hydration, hygiene, minor first-aid basics, and emergency numbers
- `Nutrition`
  - serving size, calories, added sugar, protein, fiber, and balanced food choices
- `Household Problem Solving`
  - home safety, storage, laundry, cleaning labels, and simple practical tasks
- `Fractions and Ratios`
  - fractions of a set, equivalent fractions, recipe scaling, and simple ratios
- `Spatial Reasoning`
  - shapes, turns, corners, faces, and basic 2D/3D reasoning

## Difficulty

All categories are tagged or generated with difficulty levels `1` through `5`.

For all non-Hebrew categories, the session difficulty now mixes question levels like this:

- Level `1`: only level `1` questions
- Level `2`: `75%` level `2`, `25%` level `1`
- Level `3`: `70%` level `3`, `20%` level `2`, `10%` level `1`
- Level `4`: `60%` level `4`, `25%` level `3`, `10%` level `2`, `5%` level `1`
- Level `5`: `70%` level `5`, `20%` level `4`, `5%` level `3`, `5%` level `2`

Hebrew uses a special rule:

- Hebrew never goes above the chosen session difficulty.
- A level `3` session can use Hebrew levels `1`, `2`, and `3`.
- A level `5` session can use Hebrew levels `1` through `5`.
- Allowed Hebrew levels are spread evenly, instead of being weighted toward the chosen level.

Math generators scale with the effective question difficulty. For example, percentage questions get
broader and more varied as difficulty increases while still keeping answers as whole numbers.

## Previous Sessions

The app keeps the last `10` sessions in browser storage and shows them through the
`Previous Sessions` button on the start screen.

Each saved session includes:

- date and time
- chosen difficulty
- final score
- each question
- chosen answer
- correct answer
- whether it was right or wrong

Important:

- session history is stored in the browser profile on that computer
- it is not saved as normal files in the homework folder
- it will usually stay after closing Chrome, but can be lost if browser/site data is cleared

## Files

- `index.html`: main page
- `style.css`: visual design
- `app.js`: quiz logic, storage, history screen, and confetti
- `hebrew-words.js`: bundled Hebrew vocabulary list
- `science-questions.js`: bundled offline science bank
- `general-knowledge-questions.js`: bundled offline general knowledge bank
- `logic-questions.js`: bundled offline logic bank
- `rationality-questions.js`: bundled offline rationality bank
- `population-questions.js`: top-population country bank
- `financial-literacy-questions.js`: money skills bank
- `measurement-questions.js`: units and measurement bank
- `charts-and-graphs-questions.js`: tables and graph-reading bank
- `calendar-questions.js`: calendar and date bank
- `estimation-questions.js`: estimation bank
- `probability-questions.js`: probability bank
- `maps-and-directions-questions.js`: map-skills bank
- `digital-safety-questions.js`: online safety bank
- `media-literacy-questions.js`: source/ad/media bank
- `health-and-first-aid-questions.js`: health and first-aid bank
- `nutrition-questions.js`: nutrition bank
- `household-problem-solving-questions.js`: household skills bank
- `fractions-and-ratios-questions.js`: fractions and ratios bank
- `spatial-reasoning-questions.js`: spatial reasoning bank

## Sources

Hebrew vocabulary source:

- https://ehebrew.net/500-hebrew-words/

Science bank started from Open Trivia DB and was then curated and expanded for this app:

- https://opentdb.com/

Some added fact-based questions were based on material from:

- https://www.census.gov/popclock/world//
- https://www.nasa.gov/learning-resources/for-kids-and-students/what-is-earth-grades-k-4
- https://spaceplace.nasa.gov/how-orbits-works/en/all-about-the-moon/
- https://spaceplace.nasa.gov/all-about-venus/en/
- https://goes-r.noaa.gov/resources/education.html
- https://www.usgs.gov/media/images/these-kids-water-magically-comes-out-ground
- https://kidshealth.org/en/parents/brain-nervous-system.html

The newer practical-skill banks were hand-authored for this app and informed by material from:

- https://www.worldometers.info/geography/countries-of-the-world/
- https://www.consumerfinance.gov/consumer-tools/educator-tools/youth-financial-education/teach/activities/exploring-saving-spending-game/
- https://www.fda.gov/food/nutrition-facts-label/calories-nutrition-facts-label
- https://consumer.ftc.gov/articles/heads-up
- https://consumer.ftc.gov/articles/how-protect-your-child-identity-theft
- https://education.nationalgeographic.org/resource/places-in-the-park/
- https://www.redcross.org/take-a-class/resources/learn-first-aid

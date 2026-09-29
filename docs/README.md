# Homework

This is a plain homework app that works in two modes:

- Folder mode: put the whole folder on a computer or Chromebook, then open
  [`homework.html`](../homework.html) in Chrome.
- Full link: [https://thnkslprpt.github.io/kids_homework/homework.html](https://thnkslprpt.github.io/kids_homework/homework.html)
- Hosted phone mode: publish the repo with GitHub Pages, then open the Pages URL on a phone.

The hosted version is installable and works offline after the first successful online load.

## GitHub Pages Phone Setup

The app is ready to publish from the repo root.

Steps to do on GitHub:

1. Push this repo to GitHub.
2. Open the repo on GitHub.
3. Go to `Settings` -> `Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Choose your normal branch, usually `main`.
6. Choose the folder `/(root)`.
7. Save.
8. Wait for GitHub to show the published Pages URL.

Give the kids the Pages URL. The root URL opens [`homework.html`](../homework.html) automatically.

On phones:

- iPhone: open the Pages URL in Safari, tap Share, then `Add to Home Screen`.
- Android: open the Pages URL in Chrome, then use `Add to Home screen` or `Install app` when offered.

For offline use, open the app once while online and leave it open until the first screen finishes
loading. The app caches the runtime HTML, CSS, JavaScript, fonts, icons, map assets, and Hebrew image
assets. After that, the installed app or Pages URL can reopen without a connection on that device.

When updates are pushed to GitHub:

- GitHub Pages republishes the new static files.
- A phone that opens the app online will download the new service-worker cache.
- If the app is already open while a new version becomes ready, it shows a `Reload` prompt.
- Session history remains stored in that browser/device; it is not synced between devices.

## Google Sheets Results Reporting

Completed sessions are sent to a Google Sheets Apps Script web app when the hosted homework app has
network access. The app also keeps a small local retry queue so a report can be sent later if the
device is temporarily offline.

Repo files:

- `app/core/config.js`: stores the deployed Apps Script `/exec` URL in
  `GOOGLE_SHEETS_REPORT_WEB_APP_URL`, plus the report source, schema version, and retry queue key.
- `app/core/results-reporter.js`: builds the sanitized session payload, removes review HTML, queues
  reports, POSTs them to the Apps Script web app, and removes a queued report only after the public
  status endpoint confirms that exact session ID.
- `app/scripts/google_sheets_apps_script.gs`: repo copy of the Apps Script code attached to the
  Google Sheet. It receives POSTs, writes parent-friendly summary rows to `Sessions`, and writes
  incorrect and completed-unscored activity rows to `QuestionResults`. It also sends a completion email to the configured
  parent addresses after a new session is saved. Completion emails use the `[Homework Alert]`
  subject prefix so Gmail can label and notify on only these messages.

The `Sessions` tab is intentionally compact:

1. `Date`
2. `Time`
3. `Name`
4. `Difficulty`
5. `Questions`
6. `Correct`
7. `Accuracy`
8. `Speed Round`

The Apps Script `setup()` function also migrates the old wide `Sessions` layout into this compact
layout when it sees the previous `Received At` header. Routine report submissions do not reset
manual column widths. Running `setup()` can reapply the default `Sessions` column widths and remove
the old `CategorySummary` sheet.

The receiver is intentionally public and does not require a login or shared secret. It strictly
validates and bounds the report schema, stores user text as literal spreadsheet text, and makes
retries idempotent. Before running or deploying the receiver, add these values under Apps Script
`Project Settings` -> `Script Properties`:

- `HOMEWORK_SPREADSHEET_ID`: the ID between `/d/` and `/edit` in the Google Sheet URL.
- `HOMEWORK_EMAIL_RECIPIENTS`: optional comma-separated completion-email addresses. Leave this
  property absent to disable completion email.

These values are intentionally not committed to the repository. Configure them before replacing
the currently deployed receiver code.

The repo copy of `app/scripts/google_sheets_apps_script.gs` does not update Google Apps Script by
itself. When changing the receiver, update both places:

1. Edit and commit `app/scripts/google_sheets_apps_script.gs` in this repo so the current receiver
   code is documented with the app.
2. Open the bound Apps Script project from the Google Sheet.
3. Paste the same code into the Apps Script editor.
4. Confirm the two Script Properties described above are present.
5. Save the Apps Script project with `Ctrl+S` or `Cmd+S`.
6. Select `setup` in the function dropdown and run it once after header, sheet, or date-format
   changes. Authorize it if Google asks, including the MailApp permission needed for completion
   emails.
7. Go to `Deploy` -> `Manage deployments`.
8. Edit the existing web app deployment.
9. Set `Version` to `New version`, add a short description, then click `Deploy`.

Editing the existing deployment keeps the same `/exec` URL, so `GOOGLE_SHEETS_REPORT_WEB_APP_URL`
usually does not need to change. If a brand-new deployment is created instead, copy its new `/exec`
URL into `GOOGLE_SHEETS_REPORT_WEB_APP_URL` in `app/core/config.js`, then push the app update so
future homework sessions post to the new receiver.

To check the receiver, open the deployed `/exec` URL in a browser. It should return a JSON response
saying the homework results receiver is running.

## Current Features

- Static app: there is no build step. The browser loads `homework.html`, the question manifest, and
  plain JavaScript files directly.
- Works offline from a normal folder.
- Lets you choose:
  - student profile
  - `5`, `10`, `20`, or `30` main-session activities
  - difficulty level `1` to `10` for Guest sessions
  - `Adaptive`, `Math`, `Hebrew`, or focused `Practice` preset
  - an optional timed or untimed five-question challenge
- Defaults to:
  - `30` questions
  - the `Adaptive` preset
  - each student's hard-coded level per topic category
- Student category levels and profile settings are hard-coded in `app/core/config.js` in the
  `USER_PROFILES` table. Edit each child's explicit `categoryDifficulties` object to change one
  category level.
- Guest sessions use the visible difficulty slider. Named child profiles use their per-category
  levels instead.
- Miranda has a fixed adult Hebrew-focused profile with optional specialty vocabulary support when
  the corresponding UI control is present.
- Tracks live progress with colored progress boxes and a score counter.
- Can run an optional `5` question challenge after the main session.
- Advances immediately after a correct answer when there is nothing more to show; keeps explanations,
  custom success feedback, practice completion notes, and wrong-answer review visible until Continue.
- Offers progressive hints without adding an extra post-answer confidence step.
- Drag questions support sentence completion, category sorting, matching, and image vocabulary.
- Typed math questions check when you press `Enter`.
- Hebrew writing-practice prompts are included only in Hebrew/adaptive sessions and are recorded as
  completed, not graded.
- Shows review feedback for wrong answers with the question, your answer, and the correct answer.
- Shows a final results screen with category review, missed-question details, speed-round results,
  praise text, and confetti.
- Offers one-tap focused practice for the category with the most missed answers.
- Keeps previous sessions per student and includes a parent dashboard.
- Checkpoints unfinished sessions, including unsubmitted typed answers, drag placements, matching
  connections, and interactive selections, so they can be resumed after closing or updating the app.
- Lets a parent export or delete local session history.
- Includes an offline browser smoke test for session generation, generated-question quality, speed
  round shape, and results reporting.

## Question Mix

The default `Adaptive` session is built by percentage, not by a fixed repeating slot number.

- Math and Hebrew together make up about `40%` to `50%` of the session.
- The current target is about `45%`, rounded to whole questions.
- The remaining share is split as evenly as possible between the non-core categories.
- If a session is short, the app uses a balanced shuffled subset of the non-core categories so the
  same few categories do not always appear first.
- If adaptive review has enough previous-session data, up to about `20%` of the session is reserved
  for recently weak categories, limited to categories that support focused review.

Other presets:

- `Math`: uses the extended math-like category set, including math, statistics, time, algebra,
  visual math, visual measurement, measurement, charts, calendar, estimation, probability,
  fractions, ratios, spatial reasoning, logic, and applied word problems.
- `Hebrew`: uses only Hebrew questions and uses the longer Hebrew writing-practice tail.

Within math, the app uses:

- input-answer questions
- multiple-choice questions
- interactive investigations such as Mystery rule lab

## Categories

- `Math`
  - Mystery rule lab (E06), levels 3–9: choose experiments to distinguish visible
    candidate rules, with free exploration, evidence-based grading, and saved drafts.
  - Build an example (E03), levels 2–10: construct any whole number satisfying the visible conditions;
    progress from ranges and divisibility to bounded expressions and counterexamples. All valid
    alternatives are accepted, feedback names unmet conditions, and review labels the reference as
    “One example.” These appear sparingly in Math activities, outside the timed challenge, and
    preserve unsubmitted answers when saving and resuming offline.
  - addition and subtraction, including negative numbers down to `-20`
  - multiplication tables up to `10x10`
  - division facts and missing-number equations
  - skip counting
  - number patterns
  - comparing numbers
  - decimal operations and decimal comparison
  - place value and rounding
  - rectangle area and perimeter
  - prime vs composite number identification
  - percentages with whole-number answers
  - money / shekel change questions
  - remainders, GCF / LCM, prime factorization, order of operations, fraction operations,
    mixed numbers, percent change, unit rates, proportions, inequalities, exponents,
    coordinate transformations, angles, triangles, symmetry, volume, and surface area
- `Hebrew`
  - multiple-choice Hebrew word meaning questions
  - shows Hebrew words with nikud / vowel marks
  - transliteration is available behind a `Show transliteration` toggle
  - final-letter drills, root families, gender / number agreement, prepositions, verb-tense
    matching, image vocabulary, sentence drag, opposites, homographs, reading, and writing practice
- `Science`
  - offline multiple-choice science bank
  - generated practice for food webs, life cycles, classification, states of matter, circuits, forces,
    simple machines, weather, the water cycle, rocks / minerals, and astronomy scale
- `Science Evidence`
  - fair tests, claims, evidence, variables, tables, experimental design, and cautious conclusions
- `Time`
  - questions like “In 15 minutes, what time will it be?”
- `Statistics`
  - mean, median, mode, range, and simple data-reading questions
- `Algebra`
  - basic one-step equations, simple two-step equations, substitution, and function-table style prompts
- `Applied Word Problems`
  - multi-step practical arithmetic, rates, money, scheduling, and everyday quantitative reasoning
- `Visual Math`
  - coordinate grids, number lines, angle reading, pictographs / line plots, and grid area/perimeter visuals
- `Visual Measurement`
  - clocks, rulers, scales, containers, unit visuals, elapsed time, and practical measurement scenes
- `Logic`
  - patterns, ordering, elimination, deduction, and practical prioritization under time pressure
- `Rationality`
  - probability, evidence, fair testing, sampling, and careful conclusions
- `General Knowledge`
  - useful ballpark facts and geography / Earth knowledge rather than obscure trivia
- `Geography`
  - continent identification from simple world maps
  - country identification from shaded regional maps
  - capital-city questions for a frozen top-50-by-population country set
- `Population`
  - top 20 most populous countries
  - population answers rounded to the nearest `10 million`
- `Computing`
  - precise instructions, algorithms, conditions, loops, variables / changing state, and Boolean logic
  - six balanced strands at every difficulty level from `1` to `10`
  - Pixel codes: data representation activities at levels `2`–`7`, mixed sparingly into Computing
    sessions (including focused Computing practice), outside the timed challenge
  - Level `2`: decode a four-cell binary row; `3`: decode a 4×4 picture; `4`: encode a 4×4 picture;
    `5`: decode a five-cell run-length row; `6`: decode a 4×4 run-length picture;
    `7`: encode a 4×4 picture using run-length counts
  - Pixel keys and examples stay visible. Read each row left to right, top row first. Run-length
    counts always begin with empty, alternate empty/filled, and use a leading `0` for a filled start.
    Tap or use keyboard controls, Undo, Clear row, and Check Answer. Unsubmitted cells/counts and
    the highlighted row resume after closing the app; feedback and parent history record row codes
    and identify the first mismatching cell. All Pixel codes content works offline.
- `Financial Literacy`
  - saving, spending, needs vs wants, unit prices, delivered totals, multi-buy offers, and discounts
  - receipt and transaction checks, account fees, simple interest, and practical budgeting
- `Measurement`
  - length, mass, volume, temperature, and unit conversions
- `Charts and Graphs`
  - generated visual bar-chart and table questions
  - reading totals, exact values, biggest/smallest values, comparisons, line graphs, pie charts,
    scatterplots, two-way tables, misleading graphs, sampling bias, and averages with outliers
- `Calendar`
  - months, weekdays, leap years, dates, and elapsed days
  - appointment notices, arrival and travel times, preparation instructions, and cancellation rules
- `Estimation`
  - ballpark answers and reasonableness checks
- `Probability`
  - likelihood, equal chance, impossible/certain events, and simple fractions of chance
- `Maps and Directions`
  - cardinal directions, map keys, relative position, and simple scale
- `Health and First Aid`
  - basic safety, hydration, hygiene, minor first-aid basics, and emergency numbers
- `Nutrition`
  - serving size, calories, added sugar, protein, fiber, ingredients, allergens, and balanced food choices
- `Household Problem Solving`
  - home safety, storage, laundry, cleaning labels, packing checklists, and simple practical tasks
  - safe first actions for electricity, gas, smoke, and water hazards
- `Fractions`
  - visual fraction models, equivalent fractions, comparing fractions, and fractions of a set
- `Fractions and Ratios`
  - fractions of a set, equivalent fractions, recipe scaling, and simple ratios
- `Spatial Reasoning`
  - shapes, turns, corners, faces, and basic 2D/3D reasoning
- `Reading Comprehension`
  - paragraph ordering, main idea, evidence, inference, and summarization
- `Vocabulary / Grammar`
  - spelling, syllables, punctuation, capitalization, parts of speech, roots, prefixes,
    suffixes, sentence combining, and English sentence-drag questions

Several general and practical categories also include generated questions for recipes, transit
schedules, reading labels, tool safety, emergency decision trees, prioritization, planning steps,
debugging mistakes, cause/effect chains, tradeoffs, risk/reward, evidence checks, timelines,
latitude/longitude, climate zones, landforms, migration routes, culture/holiday matching, and
category-sort drag questions.

## Difficulty

The app supports session difficulty levels `1` through `10`.

For non-Hebrew categories, the session difficulty mixes question levels like this:

- Level `1`: only level `1` questions
- Level `2`: `75%` level `2`, `25%` level `1`
- Level `3`: `70%` level `3`, `20%` level `2`, `10%` level `1`
- Level `4`: `70%` level `4`, `20%` level `3`, `10%` level `2`
- Level `5`: `70%` level `5`, `20%` level `4`, `10%` level `3`
- Level `6`: `70%` level `6`, `20%` level `5`, `10%` level `4`
- Level `7`: `70%` level `7`, `20%` level `6`, `10%` level `5`
- Level `8`: `70%` level `8`, `20%` level `7`, `10%` level `6`
- Level `9`: `70%` level `9`, `20%` level `8`, `10%` level `7`
- Level `10`: `70%` level `10`, `20%` level `9`, `10%` level `8`

Hebrew uses a special rule:

- Hebrew never goes above the chosen session difficulty.
- Lower Hebrew levels stay deliberately gentle: level `1` uses only level `1`, level `2` uses mostly
  levels `1` and `2`, and level `3` still keeps most questions at levels `1` and `2`.
- From level `4` upward, Hebrew uses a narrow weighted band around the selected level instead of
  sampling every lower level evenly.
- A level `10` Hebrew session mostly uses levels `9` and `10`, with a small amount of level `8`
  review when those levels exist in the Hebrew bank.

When a minimum difficulty is supplied by an alternate/custom builder UI, the app raises the lower
part of the difficulty mix to that minimum while keeping the chosen category maximum.

Math generators scale with the effective question difficulty. That now includes broader arithmetic,
decimals, place value, and rectangle-measure questions in both typed-answer and multiple-choice
formats.

Supplemental generated exercises are calibrated for levels `1` through `10`, where level `1` is aimed
at early elementary work and level `10` is aimed at roughly age `14`. Each generated multiple-choice
question is checked for exactly one correct answer before it is used in a session or smoke test.

The expanded generators also keep a browser-local recent-question list for about `21` days. When a
new generated question is built, the app tries to avoid exact recently used prompts before falling
back to a valid question. This is best-effort because the app is offline and browser storage can be
cleared, but it reduces repeat questions across nearby homework sessions.

## Previous Sessions

The app keeps the last `10` sessions in browser storage and shows them through the
`Previous Sessions` button on the start screen. History is stored separately for each student.

Each saved session includes:

- date and time
- student and session preset
- chosen difficulty
- per-category difficulty levels for that session
- selected categories and adaptive-review setting
- final score
- optional challenge score
- graded-question and completed-unscored activity counts
- each main-session question
- each speed-round question
- chosen answer
- correct answer
- whether it was right or wrong
- selected drag tokens, when the question used drag answers
- hint count and confidence, when supplied

Important:

- session history is stored in the browser profile on that computer
- it is not saved as normal files in the homework folder
- it will usually stay after closing Chrome, but can be lost if browser/site data is cleared
- the parent dashboard reads this same browser-local history
- history is not synced between devices

## Files

- `index.html`: redirects the repo root to `homework.html`
- `homework.html`: main page
- `manifest.json`: installable app metadata
- `service-worker.js`: offline cache and update handling
- `app/style.css`: visual design
- `app/app.js`: script loader for the split runtime modules
- `app/question-utils.js`: shared helpers and recent-question tracking for supplemental generators
- `app/questions/manifest.js`: list of question-bank scripts to load
- `app/questions/registry.js`: small registry used by question modules
- `app/questions/load.js`: question-bank script loader
- `app/core/namespace.js`: creates the shared `HomeworkApp` namespace
- `app/core/config.js`: profile settings, category order, difficulty weights, and session constants
- `app/core/state.js`: initial app and speed-round state
- `app/core/dom.js`: DOM lookup map
- `app/core/scoring.js`: answer normalization and scoring helpers
- `app/core/session-history.js`: browser-local history storage
- `app/core/results-reporter.js`: Google Sheets report queue and web-app POST sender
- `app/core/bootstrap-errors.js`: startup error reporting
- `app/pwa/updates.js`: service-worker registration and reload prompt
- `app/main/constants.js`: shared runtime constants and static Hebrew writing data
- `app/main/session.js`: session building, presets, adaptive review, user controls, and history save flow
- `app/main/math-utils.js`: math formatting helpers
- `app/main/init.js`: runtime wiring, question-bank setup, event handlers, and smoke-test API
- `app/generators/math.js`: core math generators
- `app/generators/supplemental-math.js`: supplemental math and extended numeric generators
- `app/generators/hebrew.js`: Hebrew generated questions and writing/drag helpers
- `app/generators/time-and-choice.js`: time, statistics, and choice-question helpers
- `app/ui/quiz.js`: rendering, answer handling, navigation, drag UI, and question review
- `app/ui/drag-answers.js`: reusable drag-answer interaction helpers
- `app/ui/results-history-dashboard.js`: results screen, previous sessions, dashboard, speed round, and audio tick
- `app/ui/confetti.js`: results confetti
- `app/questions/hebrew/`: Hebrew vocabulary, image words, adult Hebrew, sentence drag, and Hebrew bank
- `app/questions/english/`: vocabulary/grammar, reading comprehension, and English sentence drag
- `app/questions/math/`: algebra, applied word problems, visual math, measurement, charts, calendar,
  estimation, probability, fractions, and ratios
- `app/questions/science/`: bundled science and science-evidence banks
- `app/questions/geography/`: geography, map data/rendering, population, and maps/directions banks
- `app/questions/life-skills/`: financial literacy, health/first aid, nutrition, and household skills
- `app/questions/reasoning/`: logic, rationality, and spatial reasoning banks
- `app/questions/general-knowledge.js`: bundled offline general knowledge bank
- `app/questions/category-drag.js`: generated category-sort drag questions
- `app/assets/`: offline fonts, map assets, Hebrew image assets, and source snapshots
- `app/icons/`: PWA and browser icons
- `app/smoke-test.html`: offline browser smoke test for session generation, generated-question shape,
  speed round, and results reporting
- `app/scripts/`: helper scripts, including the Google Sheets Apps Script receiver copy

## Automated QA

Node.js 20 or newer is required for the command-line QA suite. No third-party packages are needed.

- `npm test`: deterministic core-data, session recovery, reporting, offline/update, randomized startup,
  manifest, generation, grade-alignment, content-quality, time/probability, and Hebrew checks.
- `npm run qa:regressions`: focused lifecycle regressions, including 300 startup seeds.
- `npm run qa:browser`: full workflow smoke test in installed Chrome/Chromium.
- `npm run qa:release-browser`: desktop/mobile flows, unsubmitted answer recovery, storage failures,
  first-use offline maps, and service-worker updates in installed Chrome/Chromium.
- `npm run qa:all`: all command-line and browser checks.

Set `QA_SEED` to reproduce a randomized failure with a specific seed. GitHub Actions runs the same
suite on every push and pull request.


## Build the graph (E04)

Charts and Graphs includes construction activities at levels 2–8. Children copy a
source table into labelled bars using large +/− buttons; all controls also work
with the keyboard. The current values, scale, and axis numbers remain visible.

- Levels 2–3: three bars, values 0–8, one item per step.
- Levels 4–5: three bars, fixed scales of two and five items per step.
- Level 6: three bars and a choice of scales.
- Levels 7–8: four/five horizontal bars and a choice of scales.

Every scale that fits all values exactly into eight whole steps is accepted.
Changing scale preserves step counts and changes the represented values. Undo
and Reset allow corrections before Check; checking explains the first mismatch.
Submitted graphs become read-only. Draft bars and scale survive Save & Exit,
reload, and offline resume. Results include the table, the child's graph values,
a reference graph, and feedback; a correct alternative earns full credit.

Construction appears once per four chart activities, with at most two in a mixed
session, and is excluded from the timed challenge. All assets are bundled for
folder mode and cached for hosted offline use. `node --test app/scripts/qa_build_the_graph.js` checks generation, grading, review, session
selection and checkpoint validation. The release browser matrix covers 320px
layouts, controls, undo/reset, offline draft recovery, and submitted review.

## Mystery rule lab (E06)

Math includes short investigations at levels 3–9. The machine uses one of the
visible candidate rules. Children choose inputs from 0–10, run up to three free
tests, and select a rule consistent with the starting observation and their
collected evidence. Each investigation counts as one activity; exploring has no
score penalty.

- Levels 3–4: two candidate arithmetic rules.
- Levels 5–6: three candidates, including two-step rules.
- Levels 7–9: four candidates; also select a test from the history that separated
  possibilities still consistent immediately before that test, and explain why.

For example, “add 2” and “multiply by 2” both send 2 to 4. Either is accepted if
that is all the evidence collected. Testing 3 produces different predictions,
5 and 6, so the observed result distinguishes them. Feedback identifies a
contradictory row or explains why a chosen test was uninformative. No arbitrary
rule text is evaluated.

Candidate cards, input selection, and explanation controls support touch and
keyboard use at 320px portrait width. Conclusions can be changed or cleared
before Check; collected observations remain in the history and duplicate inputs
do not consume another test. Draft inputs, tests, choices, and explanations
survive Save & Exit, reload, and offline resume. Submitted labs are read-only;
parent review records the evidence, conclusion, explanation, and feedback.

Labs appear once per eight Math activities at eligible levels, capped at two in
mixed sessions, and are excluded from the timed challenge. Scripts load directly
from the folder and are cached for hosted offline use. Regression tests live in
`app/scripts/qa_mystery_rule.js`; the release browser matrix covers ambiguous and
wrong conclusions, the test budget, 320px layout, and offline recovery.

## Keep the equation balanced (E07)

Math and Algebra include equation construction at levels 3–9:

- Level 3: a mystery box plus counters; level 4: equal groups of mystery boxes.
- Levels 5–6: two-step equations, including subtraction at level 6.
- Levels 7–9: unknowns on both sides, including negative intermediate coefficients.

Choose an amount and apply addition, subtraction, multiplication, or division to
both sides. Later levels also allow adding or subtracting x terms. Whole numbers,
negative numbers, and exact fractions such as `3/2` are supported. For example,
`2x + 3 = 11` can be solved by subtracting 3 then dividing by 2, or by dividing by
2 then subtracting `3/2`. Either side may hold the isolated unknown.

Legal detours preserve equality and never lower the score. Invalid operations,
including division by zero and multiplication by zero (which loses the original
solution), leave the equation unchanged and explain why. Check keeps unfinished
work open; a valid isolated solution earns credit. Undo reverses individual moves.
The activity stores up to 40 moves and bounds exact numerators/denominators to
one million; limit messages distinguish these activity limits from mathematical errors.

Draft amounts and moves survive reload, Save & Exit, and offline resume. Submitted
work is read-only, and parent review includes every operation and intermediate
equation. All scripts are bundled for folder mode and cached offline. Activities
appear once per eight Math questions and once per four Algebra questions, capped
at two combined in mixed sessions, and are excluded from timed challenges.

`app/scripts/qa_equation_balance.js` checks alternate paths, generation, corrupt
saved moves, checkpoint grading, and session inclusion. The release browser matrix
checks 320px controls, boxes, fractions, undo, offline resume, and submitted review.

## Shape architect (E08)

Shape architect appears in normal **Math** and **Geometry** practice, outside
speed challenges. Children fill a small grid to satisfy geometric constraints;
any arrangement meeting all the requirements is accepted.

- Levels 2–3: area and one connected shape on a 4×4 board.
- Levels 4–5: add a target perimeter on the 4×4 board.
- Levels 6–7: use a 5×5 board with symmetry across a marked vertical or horizontal
  centre line, alongside area, perimeter, and connectivity.
- Levels 8–9: also leave marked blocked cells empty.

Connectivity means sharing an edge: touching corners alone does not connect
squares. Area counts filled squares; perimeter counts exposed unit edges,
including boundaries around holes. The marked symmetry line belongs to the
board, so a symmetric shape shifted away from that line may not qualify.
Every target is derived from an actual connected construction, and configuration
validation checks that this example satisfies all the constraints.

Tap cells or use keyboard buttons (Tab, Enter/Space, with arrow keys between
neighbouring cells). Filled cells have a visible symbol and pressed state;
blocked cells show ×. Undo restores the last square change, keeping the most
recent 40 changes. Counts are revealed after **Check shape**, alongside feedback
for each requirement. An empty board is not submitted; a nonempty board receives
the usual single assessed result.

Unfinished cells and Undo history survive pause/reload, including hosted offline
reloads. Submitted boards are read-only and retain the learner's exact arrangement
in review, history, and report data. A reference arrangement is labelled **One
example**. Both new scripts load in folder mode and are precached for hosted
offline use. Shape architect needs no network calls or additional dependencies.

`node --test app/scripts/qa_shape_architect.js` checks geometry, alternative
solutions, solvable generation, progression, session placement, corrupted saves,
and history/report preservation. Browser smoke and release checks cover the grid,
keyboard navigation, blocked squares, alternate and incorrect answers, offline
resume and review, and 44px touch targets at a 320px portrait width.

## Design the chance (E09)

Design the chance appears in normal **Math** and **Probability** practice,
outside speed challenges. Children fill bag slots or colour equal spinner
sectors to create a requested probability. Every space must be filled, and
all arrangements with the right counts are accepted.

- Levels 1–2: certain and impossible outcomes in a six-slot, two-colour bag.
- Level 3: halves and thirds in the same six-slot bag.
- Level 4: other achievable fractions, including sixths.
- Level 5: bags and equal-sector spinners with 4, 6, or 8 spaces.
- Levels 6–7: three colours and two simultaneous probability conditions.
- Levels 8–9: choose a feasible total from 4, 6, 8, or 12 spaces and satisfy
  both conditions. More than one total may work.

Choose a labelled colour/symbol, then tap a numbered space. Blue circles,
orange triangles, and purple stars remain distinguishable without colour.
Spinner numbers correspond to large sector buttons below the diagram. All
controls support Tab and Enter/Space; arrow keys move between space buttons.
Erase empties a space; Undo restores up to 40 changes, including total changes.
Changing the total clears the design and can be undone.

Each counter or equal sector is explicitly equally likely. **Check chance**
uses exact integer cross-multiplication, so equivalent fractions and different
arrangements pass. Incomplete designs are not graded. Completed designs receive
the usual single assessed result and exact count/total feedback for each target.
No random draws determine correctness. Configuration validation proves that at
least one allowed total can satisfy every target with whole-number counts.

Partial designs, their chosen total, and Undo history survive pause/reload,
including hosted offline reloads. Submitted work is read-only in review and
retains the learner's exact arrangement in history and report data. The reference
answer is labelled **One possible design**. The model and renderer load in folder
mode and are precached for offline use, with no new dependencies or network calls.

`node --test app/scripts/qa_design_chance.js` covers exact grading, alternative
arrangements/totals, solvability, progression, session placement, malformed saves,
and history/report preservation. Browser smoke and release checks cover bags,
spinners, keyboard navigation, erase/undo, total changes, correct and incorrect
answers, offline resume/review, and 44px touch targets at a 320px portrait width.

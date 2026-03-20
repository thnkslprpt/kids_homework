# Kids Homework Practice

This is a plain offline homework app. Put the whole folder on a computer or Chromebook, then open
[`index.html`](./index.html) in Chrome.

## What it does

- Asks how many questions to use for the session.
- Loops in a fixed order:
  1. Regular questions rotate through math input, math multiple choice, and Hebrew
  2. Every 7th question becomes science multiple choice
  3. Every 10th question becomes time multiple choice
- If a question number is both 7th and 10th, the time question takes that slot.
- Tracks the live score as `correct out of answered`.
- Shows a final score at the end.
- Multiple-choice questions move forward as soon as you click an answer.
- Typed math questions move forward when you press Enter.

## Files

- `index.html`: main page
- `style.css`: visual design
- `app.js`: quiz logic
- `hebrew-words.js`: bundled Hebrew vocabulary list
- `science-questions.js`: bundled offline science multiple-choice bank

## Hebrew vocabulary source

The bundled word list was adapted from eHebrew's common-words page so it can work offline from a
local folder:

- https://ehebrew.net/500-hebrew-words/

The science questions were bundled from Open Trivia DB's easy Science & Nature multiple-choice API:

- https://opentdb.com/

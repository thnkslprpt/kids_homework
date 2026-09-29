# Build the graph implementation plan

> Implement inline using the test-driven-development and verification-before-completion skills.

**Goal:** Implement E04's full level 2–8 progression within Charts and Graphs.
**Spec:** `docs/EXERCISE_IDEAS.md`, E04 and shared design rules.
**Architecture:** A local graph model/generator and a separate DOM renderer extend the existing interactive question mode. Answer tokens store scale and bar steps; grading compares represented values. Existing session records, checkpoints, review, and offline loaders remain the integration points.
**Tech stack:** Plain JavaScript, CSS, Node QA, existing Chrome browser QA.

## Constraints and decisions

- Levels 2–3: three vertical bars, values 0–8, scale 1, supplied labels.
- Levels 4–5: three bars, fixed scales 2 and 5 respectively.
- Levels 6–8: choose a scale; accept every offered scale that represents all values exactly within eight whole steps. Levels 7–8 use four/five horizontal bars.
- Controls use buttons of at least 44px; keyboard works through native buttons/select; source table, axis labels, and represented values remain visible.
- Changing scale preserves step heights (and therefore changes represented values), with explicit instructions. Undo and reset are available before Check.
- Store partially built graphs and chosen scale; restore submitted graphs read-only; keep readable answers and specific feedback in history.
- Introduce graph construction sparingly in mixed sessions and exclude it from the timed challenge.
- No external dependencies or network assets. Preserve pre-existing untracked files.

## Tasks

- [x] Model and generation: add `app/questions/math/build-the-graph.js`; test alternate valid scales, zero bars, unsuitable scales, malformed answers/configs, level bounds and variety in `app/scripts/qa_build_the_graph.js`. Run red before implementation, then green.
- [x] Integration: extend normalization, question validation and session selection in `app/main/session.js`; preserve review metadata and support generation QA. Verify checkpoint round trips and category selection limits.
- [x] Interaction: add `app/ui/build-the-graph.js`, dispatch from `app/ui/quiz.js`, add portrait styles, runtime/offline loader entries and cache version. Test edits, scale changes, undo/reset, locked review, feedback and progress recovery in browser QA.
- [x] Finish: document progression; run focused graph tests, `npm test`, browser smoke and release browser checks; review diff and resolve defects.

## Review focus

Zero remains a valid bar value; alternate scales must not look wrong in review; corrupted checkpoints must fail validation; scale changes must never silently move bars; controls and source tables must fit 320px screens.


## Implementation record

Implemented inline in the shared checkout, preserving concurrent E01/E03 work.
The model tests first failed because the module was absent; browser tests first
failed because the graph controls were absent. Both passed after implementation.
Focused review identified axis coordinate offsets and generic checkpoint token
validation; regression tests reproduced both, and both were corrected. A further
normalization test prevents legacy answer indexes from bypassing graph validation.

Browser verification passed for 320px vertical and horizontal graphs, all axis
ticks, 44px controls, undo/reset, alternate scales, offline resume, read-only
submitted answers, feedback/history, and app updates. Direct `file://` rendering
was checked separately and visually inspected.

Final verification: all eight focused graph tests passed; `npm test`,
`npm run qa:browser`, and `npm run qa:release-browser` passed.
`git diff --check` passed. No changes were committed or published.

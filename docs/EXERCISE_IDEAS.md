# Suggestions for new exercise types

Reviewed against the current app on **27 September 2026**.

This is a selection catalogue: choose an ID, then we can design and implement that exercise on its own. The ideas are proposals, not an implementation plan. Difficulty ranges and activity lengths below are initial design estimates to refine with actual use.

## Best starting points

My first choices are **E01 — Pixel codes**, **E02 — Fold and unfold**, and **E03 — Build an example**. Together they introduce a computing topic, a spatial task, and a way to answer mathematics questions with more than one valid solution. Each can start with a small, self-contained version.

For a language-focused addition, choose **E05 — Listen and build**. It adds listening practice, which is a more substantial gap than another written vocabulary exercise, but requires reviewed audio recordings. For a smaller change using the current interface, **E14 — Find the first wrong step** is a good candidate.

## What is already covered

The app has substantially more coverage than its category names alone suggest. I checked the question manifest, generators, drag activities, interactive renderer, and documentation. These are the main boundaries for the suggestions:

| Existing coverage | Consequence for this shortlist |
| --- | --- |
| Fraction and percent painting, equivalent fractions, number lines, visual models, answer-and-reason pairs | More shading or representation matching would add little variety. |
| Pattern machines, shape rotation, constraint-board selection, robot path programming, compass routes | Another sequence puzzle or robot maze is already covered. |
| Science evidence, experimental design, variables, data interpretation, claims/evidence/reasoning sorting | New science activities should let the learner perform an investigation. |
| Reading evidence selection, story sequencing, inference sorting, cause/effect matching, point of view | Highlighting evidence and ordering story cards already exist. |
| English sentence repair, punctuation, affix building, word ladders; Hebrew roots, tense, agreement, scenes, homographs and writing | Another sentence reorder, matching game, or word ladder would overlap strongly. |
| Charts, probability, budgeting, shopping comparisons, calendars, recipes, packing checklists, practical decision sequences | These subjects need a distinct task to justify a new exercise type. |

There are two kinds of suggestion below:

- **New strand:** a skill area I did not find as an exercise strand in the current banks.
- **New task:** a meaningfully different thing to do within an existing subject. The related coverage is explicitly identified in each entry.

“New” refers to the exercise as a whole; it does not claim that every underlying concept is absent from the app.

## Comparison at a glance

Effort is relative to this app: **Small** mostly reuses the current question UI; **Medium** needs a focused control, validator, or asset workflow; **Large** needs a short sequence of states and more extensive content validation. These estimates include answer recovery and results review, not just the visible screen.

| ID | Exercise | Addition | Initial difficulty range | Typical activity | First-version effort |
| --- | --- | --- | --- | --- | --- |
| E01 | Pixel codes | New strand: data representation | 2–7 | 45–90 seconds | Medium |
| E02 | Fold and unfold | New task: mentally reverse paper folds | 2–8 | 30–60 seconds | Small–Medium |
| E03 | Build an example | New task: produce a valid mathematical object | 2–10 | 30–90 seconds | Medium |
| E04 | Build the graph | New task: represent data yourself | 2–8 | 45–90 seconds | Medium |
| E05 | Listen and build | New strand: listening and sound-to-writing | 1–8 | 30–60 seconds | Medium + recording/review |
| E06 | Mystery rule lab | New task: choose tests to distinguish rules | 3–9 | 60–120 seconds | Large |
| E07 | Keep the equation balanced | New task: carry out equivalent transformations | 3–10 | 45–90 seconds | Medium–Large |
| E08 | Shape architect | New task: construct a shape to meet constraints | 2–9 | 45–90 seconds | Medium |
| E09 | Design the chance | New task: construct a probability model | 3–9 | 45–90 seconds | Medium |
| E10 | Predict, test, explain | New task: conduct a small virtual investigation | 3–9 | 90–150 seconds | Large |
| E11 | Repair the data | New strand: record quality and data cleaning | 4–10 | 45–90 seconds | Small–Medium |
| E12 | Find every possibility | New task: construct a complete solution set | 2–8 | 45–90 seconds | Medium |
| E13 | Rhythm builder | New strand: musical duration and notation | 2–7 | 30–90 seconds | Medium |
| E14 | Find the first wrong step | New task: locate and repair a broken derivation | 3–10 | 30–60 seconds | Small |

## Design rules for all of these

- **Complete offline:** bundle the generator, answer checker, instructions, and required assets. Support opening the folder directly as well as the installed/hosted app after its offline cache is ready. Required audio or diagrams must be available before an exercise is included in a session.
- **Small portrait screens first:** aim for a usable 320–360 CSS-pixel-wide layout. Keep the active board around 4×4 or 5×5 where cells are tappable. Stack source cards and controls vertically; allow ordinary vertical scrolling without requiring sideways scrolling or pinch-zoom.
- **Comfortable controls:** target at least 44×44 CSS pixels for buttons and interactive cells. This is a design target informed by [W3C's enhanced target-size guidance](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html), rather than a claim about the app's current accessibility conformance.
- **Tap, undo, check:** let learners select an item and then its destination, or use explicit buttons. Provide a single-pointer alternative to dragging, consistent with [W3C's dragging guidance](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html). Support keyboard operation, visible focus, and labels that do not rely on colour alone.
- **Deterministic grading:** use finite answer sets or explicit mathematical rules. When several answers work, accept all of them. An explanation should identify the unmet condition, not just show one preferred answer.
- **Short activities:** count each small investigation or construction as one activity. Introduce the longer types sparingly in mixed sessions; several two-minute tasks would materially lengthen a 30-activity session. Start them outside the optional timed challenge.
- **Preserve thinking:** checkpoint partially built answers and investigation stages. Record a readable final answer, useful feedback, and an example solution for parent review. A valid alternative must never appear as a mistake simply because it differs from the example.
- **Explain and recover:** allow reversible edits before Check, then show a specific explanation. Keep experimental predictions separate from final graded conclusions so an initially wrong prediction can lead to successful learning.
- **Use levels selectively:** introduce each type only at levels where its prerequisite skills make sense. Raise reasoning demands before adding more text, larger boards, or longer sequences.

## E01 — Pixel codes

**What the child does:** reads a compact code and reconstructs a tiny picture by tapping cells, or produces the code for a supplied picture.

**Example:** a four-cell row is encoded as `0 1 1 0`, with `0 = empty` and `1 = filled`. Fill its middle two cells. A later task reads `2 empty, 3 filled` and reconstructs a five-cell row.

**Why it belongs:** computing currently covers instructions, algorithms, conditions, loops, variables, Boolean logic, and digital safety. This introduces representing information as symbols and, later, compressing repeated data. The grid is a representation of a message with an explicit decoding rule; it is distinct from the existing fraction painter.

**Phone and offline fit:** one 4×4 board, a visible key, and a highlighted row. All content is generated locally; no images need downloading. Every cell has an accessible row/column label and filled/empty state.

**Progression and checking:** start with direct binary rows, then whole pictures, then run-length codes. Compare the constructed cell array with the decoded target. Fix the reading direction and starting state explicitly, especially alongside Hebrew text.

**First version:** decode 4×4 black-and-white pictures only. Save encoding and compression for later. **Main caution:** make the key visible; the first task should teach the notation before testing it.

## E02 — Fold and unfold

**What the child does:** sees a square folded, a hole punched through its layers, and predicts the hole pattern after unfolding.

**Example:** fold the left half onto the right half. Punch one hole away from the crease. Select the unfolded sheet with two holes mirrored across that crease.

**Why it belongs:** symmetry, rotations, transformations, and solid geometry already exist. Following layers through folds and reversing the process is a distinct spatial task that I did not find in the current activities.

**Phone and offline fit:** show two or three large diagrams in sequence, followed by two to four answer diagrams. Use locally generated SVG. An optional step-by-step unfolding explanation can appear after Check; animation is not needed to answer.

**Progression and checking:** one horizontal/vertical fold, then two perpendicular folds, then multiple punches. Generate the expected hole positions by reflecting coordinates across the actual fold lines. Ensure all answer diagrams are distinct.

**First version:** one fold, one off-crease hole, and diagram choices using the existing option UI. **Main caution:** label which side moves and where the folded paper lies. Avoid holes on creases or edges until their special cases are deliberately taught.

## E03 — Build an example

**What the child does:** constructs any answer that satisfies the stated conditions.

**Example:** “Make a whole number greater than 20 and less than 50 that is divisible by both 3 and 4.” Accept `24`, `36`, or `48`. A later variant asks for a counterexample to “Every odd number is prime”; `9` is valid.

**Why it belongs:** the app already asks about divisibility, constraints, and counterexamples. Producing a valid example requires a different action from recognizing a supplied choice and gives the learner room to choose a strategy.

**Phone and offline fit:** use the current numeric keypad/input initially, with two or three short condition chips above it. No long typing or external grading is needed.

**Progression and checking:** one condition, intersecting conditions, bounded expressions, then counterexamples. Check predicates directly rather than comparing against a single stored answer. Explain which condition failed after submission. Generate from a known valid solution so every task is solvable.

**First version:** whole-number examples with two constraints and bounded ranges. **Main caution:** the current answer and review flow needs explicit support for multiple valid answers; this is more than adding a question bank. Display the learner's valid answer and label any reference solution as “one example.”

## E04 — Build the graph

**What the child does:** turns a short data table into a graph by setting each bar's height and selecting an appropriate scale.

**Example:** a survey records apples `3`, bananas `5`, and pears `2`. Set the three bars to represent those counts. Later, use a scale where each step represents two votes.

**Why it belongs:** current charts, pictographs, and tables ask learners to interpret supplied representations. Constructing the representation adds the decisions about quantities, scale, and labels.

**Phone and offline fit:** three vertical bars with large plus/minus controls, the source data directly above them, and no precision dragging. For more categories, use horizontal bars in a vertical list.

**Progression and checking:** unit-scale bars, non-unit scales, then choosing from several valid scales. Compare the represented values and required labels with the source data. If more than one scale is suitable, accept each valid representation.

**First version:** three bars, values 0–8, fixed scale and supplied labels. **Main caution:** provide textual values and keyboard controls so the chart is not the only way to inspect or modify an answer. Feedback should identify a data/scale mismatch rather than silently correct the bar.

## E05 — Listen and build

**What the child does:** listens to a short recorded word or sentence, then selects its meaning, assembles letter tiles, or carries out its instruction in a small scene.

**Example:** hear a recorded Hebrew word and choose its picture. Later, hear a reviewed Hebrew instruction meaning “Put the book under the chair,” then tap the book and its destination.

**Why it belongs:** the app already has written vocabulary, image matching, Hebrew scenes, and sentence building. Hearing language without first seeing the written target adds listening and sound-to-writing practice.

**Phone and offline fit:** a large Play/Replay button and a few picture or letter choices. Bundle short, reviewed recordings; start playback only after a tap. Do not make device speech voices or speech recognition a prerequisite: [MDN describes speech recognition services and platform-dependent synthesis voices](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API).

**Progression and checking:** word-to-picture, short word assembly, then one- and two-part instructions. Grade the selected picture, tile sequence, or scene state locally; allow replay without penalty. Keep Hebrew letters and vowel marks together as appropriate.

**First version:** 20–30 familiar Hebrew words with recordings and existing picture assets. **Main caution:** recording quality, pronunciation review, and guaranteed audio caching are real work. If sound is unavailable, substitute another activity. A reading alternative should be identified as reading practice; displaying the target word changes what is being assessed.

## E06 — Mystery rule lab

**What the child does:** selects inputs to test a hidden machine, observes its outputs, and decides which candidate rule explains them.

**Example:** the machine could be “add 2” or “multiply by 2.” Input `2` gives `4` for both. Testing `3` distinguishes them: the result is either `5` or `6`.

**Why it belongs:** pattern machines and function tables already appear. Here the learner chooses the evidence to collect, including a test that could distinguish competing explanations.

**Phone and offline fit:** a compact input control, Test button, and a short input/output history. Candidate rules remain visible as cards. A finite set of simple functions runs entirely locally.

**Progression and checking:** two stated possibilities, then three or four, then explaining why a chosen test is informative. Ensure candidates differ somewhere within the allowed input range. Check the final rule and, when requested, whether a proposed test distinguishes the remaining candidates.

**First version:** two candidate arithmetic rules and at most three tests, with no score penalty for exploring. **Main caution:** arbitrary hidden rules are underdetermined by a few examples. State the candidate family and accept observationally equivalent candidates if the task has not distinguished them. Exploration should not feel like guessing the author's private rule.

## E07 — Keep the equation balanced

**What the child does:** applies operations to both sides of an equation until the unknown is isolated.

**Example:** start with `2x + 3 = 11`. Choose “subtract 3 from both sides,” producing `2x = 8`; then “divide both sides by 2,” producing `x = 4`.

**Why it belongs:** solving equations and choosing reasons already exist. This activity makes the intermediate transformations the answer and connects each operation to preservation of equality.

**Phone and offline fit:** show one current equation, a short move history, and large operation cards. Early tasks can display identical mystery boxes and counters; symbolic forms can follow. Every move is an explicit button action.

**Progression and checking:** boxes plus counters, two-step equations, then unknowns on both sides. Represent equations structurally and check equivalent transformations; do not evaluate arbitrary text as code. Accept alternative legal solution paths.

**First version:** equations of the form `ax + b = c` with positive integer solutions and a small move palette. **Main caution:** distinguish “legal but unhelpful” from mathematically invalid. Save the move sequence for resume and review; a child should be able to undo a move without restarting the task.

## E08 — Shape architect

**What the child does:** fills a small grid to build a shape satisfying area, perimeter, connectivity, or symmetry requirements.

**Example:** “Build one connected shape with area 6 square units and perimeter 10 units.” A 2×3 rectangle works. Later prompts can allow several shapes or require symmetry about a marked line.

**Why it belongs:** area/perimeter calculations, shape properties, and fraction painting already exist. Here the placement and adjacency of cells determine whether the construction meets geometric constraints.

**Phone and offline fit:** a 4×4 or 5×5 board, tap-to-toggle cells, Undo, and Check. Use separate labels for area and perimeter; avoid a board so large that touch accuracy becomes the challenge.

**Progression and checking:** fixed area and connectivity, then perimeter, then symmetry or exclusions. Count filled cells, exposed edges, and connected components locally. Accept every valid arrangement.

**First version:** area plus connectivity on a 4×4 board. **Main caution:** generate achievable constraints from actual shapes. State whether corner-touching counts as connected; recommend shared-edge connectivity. In assessed tasks, reveal diagnostic totals after Check or through a hint rather than automatically doing all the counting for the child.

## E09 — Design the chance

**Implemented:** bags and equal-sector spinners, with the full progression through two conditions and choosing a feasible total. See [usage and verification notes](README.md#design-the-chance-e09).

**What the child does:** chooses the contents of a bag, or colours equal spinner sectors, to create a requested probability.

**Example:** “Fill all six spaces. Make the chance of drawing blue exactly one third.” Any arrangement with two blue counters and four non-blue counters is valid.

**Why it belongs:** probability questions already cover bags, spinners, comparisons, and more advanced reasoning. Designing a model reverses the task: the requested chance is known and the learner must construct its cause.

**Phone and offline fit:** six large slots and a small colour/symbol palette. Use symbols as well as colours. Check exact counts locally; an optional draw animation can use local randomness.

**Progression and checking:** certain/impossible, halves and thirds, two simultaneous probability conditions, then choosing a feasible total. Use exact fractions for grading. Verify that the task has at least one solution.

**First version:** a six-slot bag with two colours, one target probability, and every slot required to be filled. **Main caution:** simulated draws illustrate variation; they must not determine correctness. State equal likelihood of selecting each counter, and specify replacement if repeated draws are introduced later.

## E10 — Predict, test, explain

**What the child does:** makes a prediction, changes one variable in a tiny simulated experiment, runs two trials, and chooses a conclusion supported by the recorded results.

**Example:** investigate whether surface type changes how far a virtual cart travels. Select two surfaces, hold release height constant, run both trials, then compare the recorded distances.

**Why it belongs:** science evidence already covers fair tests and interpreting results. This adds carrying out the comparison and seeing the consequences of the learner's chosen settings.

**Phone and offline fit:** one simple scene, two or three setting buttons, and a two-row results card. Use a bounded local model or authored outcome table. Advance through short stages instead of showing a laboratory dashboard.

**Progression and checking:** identify one changing factor, plan a fair comparison, repeat a trial, then distinguish what the results do and do not support. Store the prediction separately; grade the final comparison and conclusion under explicit criteria.

**First version:** one cart/surface investigation with deterministic outcomes and two trials. **Main caution:** explain that this is a simplified model. Avoid teaching that two simulated observations prove a universal scientific claim. This is a larger feature because its settings, observations, and stage must all survive interruption.

## E11 — Repair the data

**What the child does:** inspects a tiny set of records, identifies a specific quality problem, and makes a justified repair using supplied evidence.

**Example:** a school library export contains the same checkout ID twice. Mark the duplicate row while keeping two different checkout IDs that happen to have the same book title. Another task converts `120 cm` to match a column recorded in metres.

**Why it belongs:** statistics and science already discuss outliers, sampling, and reliable evidence. Record identity, duplicate handling, missing values, and consistent units introduce a practical data-quality strand.

**Phone and offline fit:** three or four stacked record cards, with one field highlighted at a time. Actions such as Keep, Mark duplicate, or Set unit are large buttons; a spreadsheet interface is unnecessary.

**Progression and checking:** exact duplicate IDs, inconsistent units, missing fields, then distinguishing a verified error from an unusual observation. Grade against explicit schema rules and the evidence included with the question.

**First version:** duplicate records with clearly explained unique IDs, using existing selection/paired-reason controls. **Main caution:** an outlier is not automatically an error. Include “keep” and “cannot determine” where appropriate, and never ask the child to invent missing data.

## E12 — Find every possibility

**What the child does:** builds the complete collection of combinations satisfying a small set of rules, without omissions or duplicates.

**Example:** two shirts and three hats make six possible outfits. Tap one shirt and one hat to add an outfit to the answer tray; finish when every outfit appears once.

**Why it belongs:** multiplication, combinations, probability, and constraint reasoning already exist. Explicitly constructing a complete solution set adds systematic enumeration and a visible way to justify that nothing is missing.

**Phone and offline fit:** two short choice rows and a wrapping tray of compact answer cards. Each card can be removed with a tap. Keep the complete answer set small enough to review on a phone.

**Progression and checking:** two-by-two choices, then two-by-three, then one exclusion rule. Later compare situations where order does or does not matter. Generate the full valid set locally and compare canonical answer sets.

**First version:** up to six outfit combinations with labelled icons. **Main caution:** do not increase difficulty by demanding dozens of repetitive taps. Say explicitly when swapping items creates a different result. Feedback can identify the missing family of combinations without immediately listing every answer.

## E13 — Rhythm builder

**What the child does:** assembles note/rest tiles to fill a bar of a stated duration, optionally matching a displayed rhythmic pattern.

**Example:** “Make exactly four beats using two one-beat notes and one two-beat note.” Later, replace a note with a rest while preserving the bar's duration.

**Why it belongs:** I found no music exercise strand. This introduces musical duration, rests, and notation while giving fractions a concrete additional application.

**Phone and offline fit:** tap tiles to append them to a short horizontal sequence, with Undo and optional Play. The first version is fully answerable visually; locally generated clicks can demonstrate the rhythm.

**Progression and checking:** whole beats, rests, then half-beat subdivisions. Represent durations as integer subdivisions and check the total plus any required tile counts. Accept multiple valid orders when order is unconstrained.

**First version:** a four-beat bar with one- and two-beat tiles and visible duration labels. **Main caution:** rhythm construction and accurate timed tapping are different skills. Avoid microphone input or latency-sensitive tapping scores. Teach each notation symbol before testing it; optional playback should begin only after the child presses Play.

## E14 — Find the first wrong step

**What the child does:** inspects a short worked solution, selects the earliest invalid step, and selects its repair.

**Example:** the work reads `3 × (4 + 2)` → `3 × 4 + 2` → `14`. Identify the first transition as the error and repair it to `3 × 4 + 3 × 2`, giving `18`.

**Why it belongs:** there are already sentence repairs, computing debugging questions, and mathematical answer-and-reason pairs. The new task is auditing a mathematical derivation: finding where valid work first becomes invalid, even if later steps correctly follow the mistaken line.

**Phone and offline fit:** show three numbered lines, each as a large selectable card, followed by a few repair choices. The existing paired-select interaction can support the first version.

**Progression and checking:** arithmetic regrouping mistakes, order of operations, fraction operations, then algebraic transformations. Use reviewed error templates with one identifiable first invalid transition and an unambiguous repair.

**First version:** two or three arithmetic error families using the current renderer. **Main caution:** later lines may also be wrong relative to the original problem; phrase the task as finding the *first* invalid step. Include some fully correct worked examples in a later version so “there must be an error” does not become the strategy.

## Choosing an implementation sequence

These are independent choices, not a requirement to build all fourteen:

| Priority | Suggested choice | Reason |
| --- | --- | --- |
| Add the most distinct computing content | E01 | Introduces data representation with a compact visual activity. |
| Add a visual exercise with modest UI work | E02 | Reuses diagram choices while adding reversible spatial reasoning. |
| Encourage mathematical independence | E03 | Accepts genuinely different valid answers and makes constraints meaningful. |
| Extend language learning beyond written prompts | E05 | Adds listening; prioritise it when recordings can be reviewed. |
| Start with a small change to familiar controls | E14 or E11 | Can begin with selection and paired-reason interactions. |
| Invest in deeper investigations | E06, then E10 | Adds learner-chosen tests; each needs careful state and feedback design. |

When an idea is selected, define its first difficulty band, one complete example, grading rules, and resume/review behaviour before expanding it. Validate that version in folder mode, after an offline reload, and on a narrow portrait layout. New construction types also need checks for multiple valid answers, impossible generated prompts, and saved unfinished work.

## Repository references used for the overlap check

- [Current features, categories, and difficulty model](README.md)
- [Question manifest](../app/questions/manifest.js) and [interactive renderer](../app/ui/quiz.js)
- [Fraction and percent interactives](../app/questions/math/fraction-visual-interactives.js) and [math skill studios](../app/questions/math/math-skill-studios.js)
- [Logic and spatial puzzles](../app/questions/reasoning/logic-spatial-puzzles.js), [spatial reasoning](../app/questions/reasoning/spatial-reasoning.js), and [computing](../app/questions/computing/computing.js)
- [Cross-category drag activities](../app/questions/category-drag.js), [English language exercises](../app/questions/english/vocabulary-grammar.js), [reading](../app/questions/english/reading-comprehension.js), and [Hebrew activities](../app/questions/hebrew/hebrew.js)
- [Science evidence](../app/questions/science/science-evidence.js), [charts](../app/questions/math/charts-and-graphs.js), and [probability](../app/questions/math/probability.js)
- [Offline asset caching](../service-worker.js), [session handling](../app/main/session.js), and [answer normalization](../app/core/scoring.js)

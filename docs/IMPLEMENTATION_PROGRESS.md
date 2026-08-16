# Homework App Quality Overhaul — Implementation Ledger

Last updated: 2026-08-16 (final `quality-3` release verification complete)

This is the durable handoff for the full review-and-improvement project. Keep it updated whenever a
workstream changes state or a test is run. It is intentionally more detailed than the normal README
so work can continue safely if the current Codex session is interrupted.

## Start a new Codex chat here

Open the repository at `/home/avi/kids_homework`, then paste this request into the new chat:

> Continue the homework-app quality overhaul documented in
> `docs/IMPLEMENTATION_PROGRESS.md`. Read that entire file before changing anything. The worktree is
> intentionally dirty and contains the implementation from the prior chat; preserve all of it and do
> not reset, revert, or overwrite unrelated changes. Continue from the “Immediate resume checklist”
> and “Current exact test state” sections, fix real failures without weakening QA thresholds, update
> this ledger after each milestone, run the full release suite and browser/offline checks, and report
> back only when the combined implementation is genuinely release-ready. Keep the Google Apps Script
> report endpoint public/unauthenticated as explicitly requested, but retain all schema, formula-
> injection, size-limit, idempotency, and acknowledgement hardening.

The new chat should treat this document as the source of truth. It should inspect the actual diff and
rerun tests rather than assuming a checked box is still correct after later integration edits.

### Immediate resume checklist

1. [x] Run `git status --short` and `git diff --check`. Do **not** discard the existing changes; the
   repository was clean before this overhaul, so the current diff is the intended implementation.
2. [x] Read `package.json`, then rerun the remaining failing checks listed below individually before
   making content fixes. The Time/Probability harness failure is fixed and that check now passes.
3. [x] Fix the current Reading and Health content-quality failures by improving/quarantining weak
   items, not by loosening the 5%/25% gates in `app/scripts/qa_content_quality.js`.
4. [x] The Time/Probability QA harness mock now supports document-level event-listener
   initialization without changing real browser checkpointing. `npm run qa:time-probability` passes
   with 1,000 Time and 1,000 Probability questions.
5. [x] Finish `npm run qa:hebrew` and address every reported bare-nikkud, sensitive-content, malformed-
   gloss, duplicate/conflict, and grade-alignment failure without weakening the Hebrew gate.
6. [x] Review the five `*_ACTIVE_QUESTIONS` banks. They intentionally keep the raw source entries in the
   files but quarantine entries where the correct answer is at least 15 characters longer than every
   distractor. Confirm every grade retains enough active coverage and document exact raw/active/
   quarantined counts. Prefer rewriting valuable quarantined questions over deleting source content.
7. [x] Complete a read-only combined-diff review of checkpoint/map hydration, answer/Continue state,
   ungraded writing, public reporting, history migration, and service-worker update behavior.
8. [x] Bump `CACHE_VERSION` in `service-worker.js` once, **after** all release files are final, so installed
   clients cannot retain a mixed older cache under the former `quality-1` name.
9. [x] Run the full standard and soak commands under “Final release test commands,” then test desktop,
   375px mobile, optional timed challenge, untimed challenge, Save & Exit/resume/discard, malformed
   storage, history export/delete, map lazy loading/resume, and service-worker install/offline/update.
   Keep live Google Sheets reporting disabled or intercepted during every test.
10. [x] Update the exact counts, remaining limitations, and status marks in this ledger before the final
    response. Do not claim the aspirational follow-up backlog is implemented.

Completion note (2026-08-16): the QA-only release harness review found no blocker, the final cached
release name is `homework-v2026-08-16-quality-3`, and the complete final-file standard, browser,
offline/update, and exact seeded soak suites pass. The finalization made no content/generator change
after the population fix. The deliberate limitations and aspirational follow-up backlog below remain
accurate and are not claimed as implemented.

### Current exact test state at handoff

The newest individual reruns on 2026-08-16 produced:

- `qa:core`: PASS.
- `qa:integrity`: PASS — 42 question scripts, 13 runtime scripts, 41 categories.
- `qa:generation`: PASS — 8,200 generated questions, 20 per grade/category.
- `qa:grade`: PASS — 8,600 generated questions.
- `qa:content`: PASS after sampling 6,150 questions. Reading drag activities now retain generated
  review text, four supplemental Reading choice sets and twelve Health choice sets have balanced,
  plausible distractors, and the 5%/25% gates are unchanged. The five audited active static-bank cue
  counts remain 0: General Knowledge 0/477, Rationality 0/155, Reading 0/252, Science Evidence 0/126,
  and Nutrition 0/136.
- `qa:time-probability`: PASS — the VM mock now provides document-level event-listener methods and
  the harness validated 1,000 Time plus 1,000 Probability generated questions.
- `qa:hebrew`: PASS after checking 561 general terms (2,000 raw expanded; 40 child-safe expanded),
  149 adult terms, and generated Hebrew at every difficulty. Seven reviewed raw-pair lookups now map
  to precise standalone child glosses; the fragment, nikkud, sensitive-content, malformed-gloss,
  duplicate/conflict, and grade-alignment gates are unchanged.
- `npm ci`: PASS — one package audited, zero vulnerabilities.
- Fresh post-cache-bump standard suite: PASS. `npm ci` audited one package with zero vulnerabilities,
  and one uninterrupted `npm test` completed Core, Integrity, Generation (8,200 questions), Grade
  (8,600 questions), Content (6,150 questions), Time/Probability (1,000 each), and Hebrew (561
  general terms, 2,000 raw expanded, 40 child-safe expanded, and 149 adult terms).
- Final `quality-3` cache-file standard suite: PASS. A fresh `npm ci` audited one package with zero
  vulnerabilities, and one uninterrupted `npm test` again completed Core, Integrity, Generation
  (8,200 questions), Grade (8,600 questions), Content (6,150 questions with the unchanged 5%/25%
  gates), Time/Probability (1,000 each), and Hebrew (561 general terms, 2,000 raw expanded, 40
  child-safe expanded, and 149 adult terms).
- Fresh post-cache-bump `qa:browser`: PASS in headless Chrome after rerunning with loopback binding
  permitted; the sandbox-only attempt failed at `listen(127.0.0.1)` with `EPERM` before any browser
  assertion ran. All repository browser assertions passed in the permitted run, and production
  reporting remained locally blocked/stubbed.
- The fresh headless integration smoke passes all repository assertions after the content fixes; the
  dedicated installed service-worker offline/update result is recorded below.
- Seeded generation soak: PASS — 41,000 questions, 100 per grade/category.
- Seeded grade-alignment soak: PASS — 43,000 generated questions, 100 samples per grade.
- Seeded content soak: PASS after sampling 20,500 questions. Its first unchanged-gate run found one
  real conflict where numeric targets of 53.5 million and 54 million were both displayed as “54
  million,” allowing identical Colombia/Sudan prompts to expect different answers. Population target
  formatting now preserves the half-million value, the diagnostic includes prompt/options/difficulty/
  content ID, and the exact seeded rerun passes with the 5%/25% gates unchanged.
- Dedicated `qa:release-browser`: PASS in permitted headless Chrome on the real production page. It
  verified 1366px desktop and 375px mobile without horizontal overflow; timed and no-countdown
  five-question challenges; feedback/Continue and confidence persistence; Save & Exit, resume,
  exact-once Continue, discard, and malformed-checkpoint quarantine; history rendering, JSON export,
  and confirmed per-learner deletion; lazy map loading only after selection; compact map checkpoint
  resume/hydration while the origin returned HTTP 503; cached navigation fallback; service-worker
  install shell contents; update banner and `SKIP_WAITING`; activation; and old-cache deletion.
  Reporting was intercepted and the test asserted zero production report attempts. The sandbox-only
  launch failed at `listen(127.0.0.1)` with `EPERM`; the permitted loopback run passed all assertions.
- Final `quality-3` browser reruns: PASS. Both `qa:browser` and `qa:release-browser` first encountered
  the expected sandbox-only `listen(127.0.0.1)` `EPERM`, then passed in permitted headless Chrome.
  The final production-page matrix again covered desktop/mobile, timed/untimed challenge,
  checkpoint/history/map offline behavior, service-worker install/update/activation/cache cleanup,
  and asserted zero production report attempts.
- Final exact seeded soak reruns: PASS — generation produced 41,000 questions (100 per difficulty per
  category), grade alignment checked 43,000 generated questions (100 samples per grade), and content
  quality sampled 20,500 questions with the unchanged 5%/25% gates. The audited active-bank cue counts
  remain General Knowledge 0/477, Rationality 0/155, Reading 0/252, Science Evidence 0/126, and
  Nutrition 0/136.

The combined implementation is release-ready under the documented scope. The final cache name is
`homework-v2026-08-16-quality-3`; all final-file standard, seeded-soak, browser, offline, and update
checks pass, production reporting remained disabled/intercepted throughout QA, and no QA threshold
was weakened.

## Status legend

- `[x]` implemented and locally verified
- `[~]` implemented or substantially implemented, but final combined verification is still pending
- `[ ]` not yet complete
- `Decision` means an intentional product choice rather than unfinished work

## User decisions and scope

- [x] Apply the audit recommendations broadly: cleanup, correctness, curriculum quality, UX,
  accessibility, PWA/offline behavior, testing, refactoring, and new exercise formats.
- [x] Keep the Google Apps Script reporting receiver public/unauthenticated for now. Do not add a
  login or require a shared secret. Harden everything else around it.
- [x] Work and testing should continue autonomously and be reported only after a comprehensive pass.
- [x] Current requested reasoning level: extra-high, not ultra.

## Release priorities

### P0 — correctness and safety

- [x] Keep reporting unauthenticated as requested, while removing the dead client secret path.
- [x] Add strict report schema validation, payload and array bounds, allowed source/schema checks,
  numeric bounds, and literal-text protection against spreadsheet formula injection.
- [x] Remove the committed spreadsheet ID and recipient email addresses. The Apps Script receiver now
  reads `HOMEWORK_SPREADSHEET_ID` and optional `HOMEWORK_EMAIL_RECIPIENTS` from Script Properties.
- [x] Stop deleting queued reports merely because an opaque `no-cors` POST resolved. The client now
  retains each report until a public status request confirms that exact session ID.
- [x] Make receiver writes retryable/idempotent with `processing`/`complete` commit notes and repair
  of partial question-detail writes.
- [x] Disable remote production reports for file, localhost, and test runs unless explicitly enabled.
- [x] Fix service-worker fallback so HTTP 4xx/5xx responses can fall back to a cached working app.
- [x] Add navigation timeout, resilient per-file installation, isolated runtime cache, and cache
  version cleanup.
- [x] Fix the largest startup cost by removing the 6.5 MB optimized geography-map data bundle from
  eager startup. It now loads only for Geography Map or History activities and then caches offline.
- [x] Strip editor metadata/foreign objects from generated map SVG data. Compressed map data fell
  from roughly 3.54 MB to roughly 1.93 MB.
- [x] Preserve capitalization and punctuation distinctions for English orthography questions instead
  of discarding them as semantically duplicate choices.
- [x] Make adaptive review obey the selected preset and profile flag. Math, Hebrew, and focused
  Practice no longer silently opt into adaptive weak-topic review.
- [x] Fix cross-grade leakage in the audited supplemental generators. Exact grade/range is preferred;
  controlled nearest-grade fallback replaces unrestricted lower-grade selection.
- [x] Convert the raw machine-generated Hebrew frequency list into a child-reviewed active set and
  keep unreviewed/sensitive/fractured corpus entries out of child sessions. Raw-pair review lookup is
  separate from child-facing standalone glosses, and the full Hebrew gate passes.
- [x] Rebuild Health and First Aid as a true levels 1–10 progression with child-safe help-seeking,
  explicit source metadata, locale, review date, safer evacuation/poisoning wording, and scenario
  sequencing. Current official MDA 101 and Rambam poison-center information was independently
  checked on 2026-08-12.
- [x] Reduce answer-length and absurd-distractor cues in the five worst banks. All five audited active
  banks have zero 15-character answer-length cues, and the deterministic non-regression gate passes.

### P1 — data integrity, learning flow, accessibility, and content architecture

- [x] Add versioned history validation/migration. Corrupt sessions/records are skipped safely instead
  of crashing History or the Parent Dashboard.
- [x] Add active-session checkpoints after answers/hints/confidence changes, Save & Exit, resume after
  refresh/update, and a discard path.
- [x] Add adversarial nested checkpoint validation and ensure completed/discarded sessions cannot be
  resurrected by `pagehide`. Saves are accepted only for an active quiz, malformed/oversized state
  is quarantined, and discard clears both storage and live session state.
- [x] Compact geography/history checkpoints without mutating the live question: multi-megabyte SVG
  markup is replaced with a stable map marker, capped at 1,000,000 serialized characters, then
  lazily rehydrated before a resumed map question is rendered.
- [x] Replace instant answer advancement with a two-stage flow: answer, inspect feedback/explanation,
  optionally record confidence, then press Continue.
- [x] Keep answered controls locked while reviewing, with explicit Previous/Next navigation.
- [x] Make the five-question challenge optional and off by default. Add no-countdown and sound
  preferences; speed mistakes now appear in results/history/dashboard.
- [x] Treat Hebrew writing as completed, parent/self-reviewed practice rather than automatically
  correct. It is excluded from graded accuracy and weak-topic calculations.
- [x] Add 5-question “quick win” sessions in addition to 10/20/30.
- [x] Add a natural break label after each set of 10 questions.
- [x] Add progressive hints, confidence values (`not-sure`, `somewhat`, `sure`), and response-time
  metadata.
- [x] Add one-tap focused practice for the most-missed category on the results screen.
- [x] Add browser speech-synthesis support for visible English/Hebrew question text, hidden gracefully
  when the API is unavailable.
- [x] Add correct `lang="he"`/`dir="rtl"` metadata where Hebrew appears.
- [x] Improve accessible focus order, live announcements, progress semantics, map/slot/bucket labels,
  matching keyboard behavior, touch target sizes, contrast, mobile overflow, and reduced-motion
  behavior.
- [x] Add history export and per-learner history deletion with confirmation.
- [x] Aggregate dashboard weaknesses by skill when metadata exists; require at least three attempts
  before labeling a weak topic.
- [x] Preserve content metadata through normalization and records: stable content ID, subject/strand,
  skill, grade range, cognitive demand, explanation, source, review status/date, hints, comparison
  mode, and listening text.
- [x] Normalize structured source objects for history/reporting instead of storing `[object Object]`.
- [x] Add response type/difficulty/source/explanation/confidence/hints/timing to local records where
  present.
- [x] Make registry duplicate IDs fail fast; intentional module augmentation uses an explicit
  `replace()` operation.
- [x] Fix flexible numeric parsing so JavaScript-only forms (`0x10`, `0b10`, `1e3`) are rejected and
  `1.000` is not ambiguously both 1 and 1000.
- [x] Accept safe explicit simple fractions and mixed numbers in typed numeric answers (for example
  `1/2`, `2 1/4`, and `-1 1/2`) while rejecting a zero denominator.
- [x] Make population/map snapshot dates visible where volatile information is tested.
- [~] Add stable IDs, grade ranges, skills, explanations, sources, and review status to priority
  content banks. Coverage QA is active; not every legacy item has been hand-authored to the full
  target schema yet.
- [~] Deduplicate exact/cross-bank items and clarify category ownership. Exact duplicate reporting is
  part of content QA; the broader long-term taxonomy consolidation remains incremental.

### P2 — new and richer exercise formats

- [x] Add reusable choose-all/multi-select rendering with exact-set scoring and accessible pressed
  states.
- [x] Add representative choose-all exercises for Science evidence, Reading inference/evidence, and
  Computing privacy/security.
- [x] Add worked-method/reason pairing and error-diagnosis activities through paired-select cards.
- [x] Add executable grid/route command-sequence activities.
- [x] Expand sorting, sequencing, matching, category buckets, map placement, timeline, and
  claim/evidence/reasoning drag activities.
- [x] Add professionally sourced branching-style emergency decision sequencing.
- [x] Add number-line/fraction-part selection, visual measurement, percentage models, equation/method
  choice, and equivalent-fraction interactions.
- [x] Add Hebrew roots, gender/number/tense, homograph contrast, sentence/context, image matching, and
  writing practice.
- [x] Add reading evidence selection, paragraph ordering, source comparison, inference, and
  explanation feedback.
- [x] Add science fair-test variables, claim/evidence/reasoning, experimental repair, causal-claim
  evaluation, data interpretation, and diagram/model activities.
- [x] Add computing algorithm traces, debugging/counterexamples, grid robot instructions, variables,
  Boolean logic, password/phishing/privacy scenarios, and choose-all security responses.
- [x] Add history primary-source/perspective/corroboration, cause/effect, timeline, and approximate
  historical map placement activities.
- [x] Add life-skills receipt/unit-price/budget work, label/allergen interpretation, household
  procedure sequencing, and emergency help-seeking scenarios.
- [~] Confidence-based review and weak-skill recency weighting are implemented. A formal 1/3/7-day
  spaced-repetition scheduler and fully adaptive isomorphic retry generator are not yet complete.
- [~] Recorded pronunciation scoring, speech recognition, supplied audio assets, and free-form
  rubric-scored writing are not complete and require product/privacy decisions beyond the current
  offline static architecture.

## Content corrections completed or underway

- [x] Clarify South Africa’s administrative/executive capital rather than presenting Pretoria as its
  only capital.
- [x] Qualify the seven-continent model, Australia/Oceania convention, Greenland excluding
  continents, and Everest as highest above sea level.
- [x] Separate reuse from recycling and clarify that renewable sources replenish.
- [x] Correct science definitions for density and specific heat; improve over-simplified advanced
  wording.
- [x] Correct malformed Hebrew meanings/separators and known items such as `אֵלּוּ` and “Sword /
  fencing”; screen violence and other child-sensitive terms.
- [x] Replace unreliable “short familiar ingredient list means less processed” heuristics with
  evidence actually present on a food label.
- [x] Improve articles/grammar and normalize selected names/diacritics (for example Brasília,
  Bogotá, Côte d’Ivoire, El Niño).
- [x] Add explanations/review text to priority science, evidence, health, reading, computing, and
  language content.
- [x] Finish cue-heavy distractor rewrites and publish before/after counts for General Knowledge,
  Rationality, Reading, Science Evidence, and Nutrition. Exact counts are recorded below.

### Active-bank answer-length audit (2026-08-16)

The raw arrays remain intact. “Before active” is the handoff state; “after active” follows targeted
distractor repairs. Every final grade has at least 10 active static items, and all active cue counts
are zero under the unchanged 15-character rule.

| Bank | Raw | Before active | After active | Final quarantined | Final active by grade 1–10 |
| --- | ---: | ---: | ---: | ---: | --- |
| General Knowledge | 626 | 477 | 477 | 149 | 82, 78, 72, 67, 71, 29, 26, 23, 14, 15 |
| Rationality | 240 | 155 | 155 | 85 | 24, 22, 22, 18, 13, 13, 11, 10, 10, 12 |
| Reading | 330 | 252 | 252 | 78 | 33, 32, 31, 31, 26, 22, 22, 18, 20, 17 |
| Science Evidence | 160 | 113 | 126 | 34 | 13, 14, 13, 11, 15, 16, 14, 10, 10, 10 |
| Nutrition | 166 | 130 | 136 | 30 | 13, 15, 15, 18, 16, 14, 13, 12, 10, 10 |

## Performance and maintainability

- [x] Lazy-load and optimize the dominant geography map bundle.
- [x] Make geography/history map consumers resolve data at use time instead of capturing an empty
  global during startup.
- [x] Validate only selected category banks at session start rather than eagerly validating every
  bank for every session.
- [x] Add manifest/runtime/service-worker/category drift checks.
- [x] Make service-worker installation tolerate missing supplemental assets without losing the whole
  offline shell.
- [x] Add shared content utilities for stable IDs, grade-band selection, and metadata normalization.
- [x] Add deterministic seeded randomness and print/reuse failing seeds.
- [x] Add `package.json`, lockfile, npm QA commands, and GitHub Actions.
- [ ] Fully lazy-load every remaining subject bank. The largest map cost is fixed, but the other
  question scripts remain eager because a complete module-loader conversion is cross-cutting and
  risky. This is a documented follow-up, not silently claimed as done.
- [ ] Complete the longer-term conversion from ordered globals/`document.write` to ES modules and a
  single generated asset manifest.
- [ ] Consolidate duplicated general helper functions and the 41-category taxonomy into a formal
  subject > strand > skill prerequisite graph. Metadata now supports this migration, but the full
  repository-wide conversion is not complete.
- [ ] Replace all trusted `innerHTML`/inline SVG construction with DOM builders or a strict sanitizer,
  then add a restrictive Content Security Policy. Current sources are repository-controlled and
  HTML/text review paths escape untrusted answer text.
- [ ] Replace linear Apps Script session-note scans with an indexed status sheet/properties strategy
  if the family dataset grows large enough for Apps Script timeouts.

## Testing and automation

### Implemented test layers

- [x] Syntax checks for all browser JavaScript, service worker, and Apps Script-compatible JavaScript.
- [x] Deterministic structural generation across all 41 categories.
- [x] Grade-alignment QA expanded beyond the original math-only set.
- [x] Hebrew content/nikkud QA, including fallback-token detection, sensitive/malformed expanded
  vocabulary checks, and generated sessions at every level.
- [x] Time/probability randomized QA.
- [x] Core scoring/history/reporting tests, including malformed history, report allowlisting,
  ungraded records, formula-injection protection, strict numeric formats, and fraction parsing.
- [x] Project-integrity QA for script manifests, runtime files, service-worker coverage, registry IDs,
  and runtime category drift.
- [x] Content-quality QA for metadata, grade ranges, conflicting prompts, retired wording, health
  sources/review dates, and answer-length cues.
- [x] Headless Chrome workflow runner using a local server and isolated browser profile.
- [x] Dedicated production-page Chrome release runner with explicit desktop/mobile, history, lazy-map,
  origin-failure/offline fallback, installed service-worker, update, and stale-cache assertions.
- [x] GitHub Actions runs deterministic Node QA and headless browser QA on pushes and pull requests.

### Latest known passing results

- [x] Core scoring/history/reporting QA: PASS.
- [x] Project integrity: PASS — 42 question scripts, 13 runtime scripts, 41 categories.
- [x] Apps Script syntax/evaluation: PASS.
- [x] Service-worker syntax: PASS.
- [x] `git diff --check`: PASS.
- [x] Headless Chrome integration workflow reaches all non-content assertions after the checkpoint
  integration edits, including pause during feedback, exact-once Continue, confidence persistence,
  discard plus `pagehide`, malformed/oversized and adversarial main/speed state, map compaction and
  hydration, natural breaks, focused practice, and speech controls.
- [x] Seeded structural generation: PASS — 8,200 questions in the infrastructure workstream.
- [x] Time/Probability randomized QA: PASS — 1,000 Time and 1,000 Probability questions after the
  document-mock checkpoint-listener compatibility fix.
- [x] Focused mobile Chrome flow: PASS — no horizontal overflow; answer remains until Continue;
  confidence, multi-select, Save & Exit, and resume behave correctly.
- [x] All standard components, the existing headless browser workflow, the larger seeded soaks, and
  the dedicated desktop/mobile/offline/update matrix pass against the final `quality-3` cache files.

### Final release test commands

Run from the repository root:

```bash
npm ci
npm test
npm run qa:browser
npm run qa:release-browser
git diff --check
```

For a larger randomized soak after the standard suite:

```bash
QA_SEED=release-2026-08-12 node -r ./app/scripts/qa_seed_bootstrap.js app/scripts/qa_question_generation.js 100
QA_SEED=release-2026-08-12 node -r ./app/scripts/qa_seed_bootstrap.js app/scripts/qa_grade_alignment.js 100
QA_SEED=release-2026-08-12 node -r ./app/scripts/qa_seed_bootstrap.js app/scripts/qa_content_quality.js 50
```

Browser tests must keep production reporting disabled/stubbed. The client already blocks local/file
reporting by default.

## Active blockers / work in progress

1. [x] Content workstream fixed the Reading/Health quality failures and reran `npm run qa:content`
   without changing the 5%/25% gates.
2. [x] Hebrew QA resolved the seven reviewed glosses and reran the full Hebrew gate without weakening
   the fragment, nikkud, sensitive-content, malformed-gloss, duplicate/conflict, or grade-alignment
   checks.
3. [x] A read-only combined-diff review found no regressions or release blockers in checkpoint/map
   hydration, answer/Continue state, ungraded writing, public reporting, history migration, or
   service-worker update behavior. The endpoint remains deliberately public and unauthenticated;
   schema, formula-injection, size-limit, idempotency, and exact-session acknowledgement hardening
   remain intact.
4. [x] `CACHE_VERSION` was bumped from `homework-v2026-08-12-quality-1` through the superseded
   `homework-v2026-08-16-quality-2` cache to the final `homework-v2026-08-16-quality-3` cache after the
   seeded population fix and dedicated release-browser matrix.
5. [x] All three larger seeded soak commands pass: generation 41,000, grade alignment 43,000, and
   content quality 20,500 questions. The unchanged content gate caught and verified the population
   target-display fix described above.
6. [x] Complete and record dedicated desktop and 375px mobile checks, optional timed and untimed
   challenge checks, history export/delete, map lazy-load/resume, and service-worker install/offline/
   update checks. Existing headless integration already covers Continue, confidence, Save & Exit,
   resume/discard, malformed/oversized/adversarial checkpoints, history/dashboard rendering, map
   checkpoint compaction/hydration, and a timed optional challenge.
7. [x] The ledger records the passing final standard suite, exact seeded soaks, dedicated browser/
   offline/update results, final cache bump, and remaining deliberate limitations.

## Deliberate limitations and operational follow-up

- Decision: the report endpoint remains public and unauthenticated, exactly as requested. It is now
  tightly validated and idempotent, but public status lookup/report submission are still reachable.
- The browser acknowledgement uses JSONP status polling because cross-origin Apps Script POST
  responses are opaque.
- The updated receiver does not deploy itself. A parent must copy
  `app/scripts/google_sheets_apps_script.gs` into the Apps Script project, set the Script Properties,
  run `setup()`, and deploy a new version. Full steps are in `docs/README.md`.
- Local history/checkpoints are device/browser-local and are not cross-device synchronization.
- Parent Dashboard privacy is casual device privacy, not strong authentication. No PIN/login was
  added because the app remains a private family static app and authentication was explicitly out of
  scope.
- Tracked historical backup directories were preserved. No destructive cleanup was performed.

## High-value follow-up backlog after this release

These are worthwhile but should not be confused with a bug-free release gate:

- [ ] Add true offline subject-level code splitting and then remove `document.write` loaders.
- [ ] Add CSP/HTML/SVG sanitization and reduce remaining global runtime coupling.
- [ ] Add an indexed Apps Script status store if report volume becomes large.

## Files added for this overhaul

- `package.json` and `package-lock.json`
- `.github/workflows/qa.yml`
- `app/scripts/qa_browser_smoke.js`
- `app/scripts/qa_content_quality.js`
- `app/scripts/qa_core_data.js`
- `app/scripts/qa_project_integrity.js`
- `app/scripts/qa_seed_bootstrap.js`
- `app/scripts/qa_seeded_random.js`
- `app/scripts/qa_release_browser.js` and `app/release-test.html`
- `docs/IMPLEMENTATION_PROGRESS.md` (this live handoff)

Many existing files are modified across `app/core`, `app/main`, `app/ui`, `app/questions`,
`app/generators`, `service-worker.js`, `homework.html`, and `docs/README.md`. Use `git status --short`
and `git diff --stat` for the current complete list. Do not discard unrelated/user edits or use a
destructive reset.

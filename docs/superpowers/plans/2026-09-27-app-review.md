# Homework App Review Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task by task. Checkboxes track completion.

**Goal:** Review and repair existing homework behavior, simplify redundant code, and strengthen regression coverage without adding exercise types.

**Architecture:** Preserve the static, dependency-free app and existing module boundaries. Reproduce defects before changing behavior, then verify in Node and the real browser.

**Tech Stack:** Plain JavaScript, HTML/CSS, localStorage, service workers, Node QA, headless Chromium.

**Spec:** User request in this session: thorough review, bug fixes, cleanup, simplifications; new exercises excluded.

## Constraints and review focus

- Preserve existing profiles, exercises, and the user's deletion of `docs/IMPLEMENTATION_PROGRESS.md`.
- Work in the supplied checkout; leave reviewable changes without publishing or committing.
- Check first-use offline sessions, interrupted work, malformed stored data, failed reporting, and repeated user actions.
- Keep all test traffic local; do not submit reports to the deployed receiver.

## Tasks

- [x] Establish baseline: `npm test`, `npm run qa:browser`, `npm run qa:release-browser`.
- [x] Repair offline installation/update lifecycle in `service-worker.js` and `app/pwa/updates.js`; add failing behavioral regressions and extend the release matrix.
- [x] Review and repair session/grading/interaction defects in `app/main/session.js` and `app/ui/quiz.js`, with focused regression cases.
- [x] Review and repair history/reporting defects in `app/core/` and results UI, with focused regression cases.
- [x] Simplify redundant logic touched by the fixes; include durable regression commands in package scripts and CI.
- [x] Run the complete suite and browser matrix, review the final diff independently, and document findings and limits.

## Baseline and decisions

- Existing Node, smoke, and release checks all pass. Content QA emits advisory answer-length warnings; these are not gate failures.
- Confirmed offline gap: service-worker installation excludes the lazy map data and tolerates missing required question scripts. Existing release coverage warms map data online first.
- Implementation proceeds under the user's authorization to do the fixes; no deployment, external reporting, or broad rewrite is needed.

## Implementation record

See [the review report](../../REVIEW_2026-09-27.md) for reproduced defects, fixes, and deployment limits. New focused regressions failed against the original behaviors and passed with the fixes. Independent review found a delayed-resume race and silent history-save failure; both received browser reproductions and fixes. Final `npm run qa:all` passed with exit code 0, including 19/19 focused regressions and both browser suites. Independent rereview found no remaining Critical/Important issues; `git diff --check` passed.

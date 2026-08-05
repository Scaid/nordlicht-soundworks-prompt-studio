# Validation Report – Version 7.5.5

## Scope

Version 7.5.5 was verified as a complete MetaTag Pipe-Stack release, not as a compatibility hotfix. The checks cover the pure domain engine, the Lyrics Workspace UI, every connected producer, persistence boundaries, the unchanged First-Start state machine and the packaged offline application.

Validation date: 2026-08-05

## Result

- JavaScript syntax: **passed** for every top-level JavaScript file
- Pipe-Stack domain tests: **14 / 14 passed**
- Complete automated suite, run 1: **59 / 59 passed**
- Complete automated suite, run 2: **59 / 59 passed**
- Skipped tests: **0**
- Uncaught full-app startup errors: **0**
- Stylesheet parse errors: **0**

## Pipe-Stack invariants verified

- canonical seven-part example parses and renders without data loss;
- left-to-right manual priority survives later library insertions;
- explicit Auto-order restores the category order;
- legacy section headers and standalone tags migrate losslessly;
- `[Instrumental: …]` remains an instrument direction rather than becoming a section;
- repeated section names merge by occurrence;
- custom section names remain supported;
- an empty editor receives a valid default section when a directive is inserted;
- duplicates, malformed empty Pipe elements and contradictions are reported;
- conflicts remain scoped to their section;
- global STYLE contradictions are reported without rewriting user content;
- more than seven elements produces a warning but never blocks or truncates the stack.

## Integrated producers verified

The following default outputs were parsed through `metatag_stack_engine.js` and remained within the recommended seven-element focus value:

- MetaTag Composer and custom composer input
- Vocal Director
- Vocal Director 2
- Instrument Evolution
- Arrangement Designer
- Song Blueprint
- Music Theory Director

The full-app smoke test additionally verifies:

- MetaTag Library insertion into the active section;
- pointer Drag & Drop priority changes in the Lyrics Stack Builder;
- STYLE conflict feedback;
- preservation of a nine-element user stack;
- Pipe-only custom composer output;
- `No Vocals` inside every Instrumental Mode stack;
- no standalone MetaTag output from the composer.

## Application and onboarding regression coverage

- complete local script and stylesheet reference resolution;
- unique HTML IDs;
- consistent `7.5.5` release labels;
- complete offline app boot in a DOM environment;
- First-Start state-machine transitions and storage migration;
- all six ID-based workspace tour steps;
- Lyrics tour coverage for library-to-editor Drag & Drop;
- all 14 First-Start language records;
- reload, session-only choice, Help, Reset and Advanced Mode activation.

## Static architecture audit

The previous independent formatting channels `instrumentalMetaTags`, `metaTagFormatMode`, `compactSectionLine` and `classicMetaTagsOutput` are absent from JavaScript and HTML. Standalone bracket values remain only as library source data; insertion and output pass through the central engine.

## Commands

```text
find . -maxdepth 1 -name '*.js' -print0 | xargs -0 -n1 node -c
node --test tests/metatag_stack_engine.test.js
NODE_PATH=/tmp/nsw-v755-jsdom/node_modules node --test tests/*.test.js
```

The full suite was executed twice in separate Node processes. The delivery archive is additionally tested with `unzip -t`, extracted into a fresh temporary directory and rechecked there before release.

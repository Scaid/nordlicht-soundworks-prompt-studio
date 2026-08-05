# Version 7.5.5 – MetaTag Pipe-Stack Engine

## Goal

Version 7.5.5 replaces independent MetaTag formatting paths with one maintainable, section-aware Pipe-Stack architecture.

## Added

- Pure `metatag_stack_engine.js` domain module
- Canonical section-first Pipe-Stack syntax
- Left-to-right priority model
- Category-aware automatic ordering
- Lyrics Workspace Stack Builder
- Drag & Drop and keyboard priority editing
- Explicit legacy migration action
- Section-local and STYLE-level conflict analysis
- Warning-only seven-element focus recommendation
- Occurrence-aware cross-module stack merging

## Changed

- MetaTag Composer now has one output mode: Pipe-Stack
- Custom composer elements are merged into section stacks
- Instrumental Mode expresses `No Vocals` inside each generated stack
- Prompt Intelligence Song Maps and combinations produce Pipe-Stacks
- Vocal, instrument, arrangement, blueprint, theory and Song Director outputs share the same renderer and merge contract
- Project restore and Lyrics Intelligence handoffs migrate legacy input at the boundary
- Lyrics structure and intelligence readers consume parsed section names rather than raw bracket contents

## Compatibility

- Existing lyrics remain readable.
- Legacy standalone tags can be migrated without deleting lyric lines.
- Custom section names are supported in explicit Pipe-Stacks.
- Existing First-Start completion remains valid because the onboarding flow revision is intentionally unchanged.
- The studio remains fully local and offline.

## Safety decisions

- No automatic conflict resolution rewrites user intent.
- No hard seven-element cap exists.
- No implicit truncation exists.
- Manual priority is preserved until the user explicitly selects Auto-order or optimization.


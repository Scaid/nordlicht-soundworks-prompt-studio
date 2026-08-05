# MetaTag Pipe-Stack Architecture – v7.5.5

## Canonical contract

Every section-level instruction is represented as one line:

```text
[Section | Mood | Vocal Style | Key Instruments | Dynamics | Spatial Effects | Production Style]
```

The first element is always the song section. Remaining elements are ordered from highest to lowest priority. Seven total elements are the recommended focus limit, not a storage limit: longer stacks remain unchanged and receive a warning.

Round brackets remain reserved for sung echoes or ad-libs inside lyric lines. Non-lyric control data remains in square brackets.

## Domain boundary

`metatag_stack_engine.js` is the single source of truth. It is a pure UMD/CommonJS module and has no DOM, storage or network dependency.

Its responsibilities are:

- parse and render Pipe-Stacks;
- normalize and classify elements;
- apply canonical category ordering;
- preserve deliberate manual priority;
- migrate legacy section headers plus standalone MetaTags;
- merge module-generated stack documents by section occurrence;
- add, remove and reorder individual stack elements;
- detect duplicates, malformed syntax, overload and contradictions;
- compare local section directions with the global STYLE prompt.

UI modules may present these operations, but must not implement competing parsers or merge rules.

## Data model

```js
{
  section: 'Chorus',
  directives: [
    { value: 'Soulful', category: 'mood' },
    { value: 'Female Vocal', category: 'vocal' },
    { value: 'Vintage Rhodes', category: 'instrument' }
  ]
}
```

Canonical category order:

1. section
2. mood
3. vocal
4. instrument
5. dynamic
6. spatial
7. production
8. extra

`extra` preserves valid directions that cannot be classified reliably. Unknown content is never silently discarded.

## Mutation rules

- Initial generation and explicit **Auto-order** use canonical category order.
- Drag & Drop establishes a custom left-to-right priority.
- Later library insertions preserve that custom order and append the new element.
- Duplicate removal and sorting happen only through explicit optimization/migration actions.
- More than seven elements is warning-only; no operation truncates the stack.
- Conflicts are scoped to one section. Contrasting directions in different sections are valid.
- STYLE conflicts are reported, not automatically rewritten.

## Migration

Legacy input such as:

```text
[Verse 1]
[Style: Soulful]
[Female Vocal]
[Music: Vintage Rhodes]
[Deep Reverb]
```

becomes:

```text
[Verse 1 | Soulful | Female Vocal | Vintage Rhodes | Deep Reverb]
```

Lyric lines and round-bracket echoes are preserved byte-for-byte except for surrounding blank-line normalization. Legacy `[Instrumental: Tagelharpa]` is treated as an instrument direction, not as a new section.

Migration occurs at these controlled boundaries:

- Lyrics Workspace legacy autosave restore;
- explicit **Build Pipe-Stacks** action;
- Project Manager restore;
- Lyrics Intelligence handoff;
- cross-module stack merge.

## Integration paths

The following producers emit Pipe-Stack documents and use the shared merge API:

- MetaTag Composer and Prompt Intelligence
- Lyrics Phase 4
- Vocal Director and Vocal Director 2
- Instrument Evolution
- Song Blueprint
- Arrangement Designer
- Music Theory Director
- Song Director AI
- module connection workflows

Repeated section names are matched by occurrence, so two Chorus sections receive their corresponding generated directions instead of being collapsed into one.

## UI responsibilities

The Lyrics Workspace Stack Builder:

- follows the editor cursor to the active section;
- displays section and directive chips;
- supports pointer Drag & Drop and `Alt` + arrow keyboard reordering;
- allows directive removal;
- shows element count, top priority and STYLE alignment;
- exposes explicit migration and canonical auto-order actions.

The MetaTag Doctor consumes the same analysis result as the Stack Builder. It does not maintain a second conflict model.

## Verification invariants

- Parse/render round trips preserve a valid user stack.
- Migration never removes lyric text or round-bracket echoes.
- Merge operations preserve section bodies and match repeated sections by occurrence.
- User-defined order survives normal insertions.
- No default producer emits more than seven elements.
- Overloaded user stacks remain complete.
- The complete offline app boots without uncaught errors.


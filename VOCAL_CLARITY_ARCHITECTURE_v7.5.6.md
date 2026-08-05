# Vocal Clarity Architecture – v7.5.6

## Purpose

Version 7.5.6 adds an optional global STYLE priority for cleaner, more intelligible lead vocals. The canonical block is always treated as one ordered unit:

```text
Broadway musical clarity, story-first enunciation, hard consonants, dry forward lead vocal, close mic
```

When active, these five instructions appear before genre, instrumentation, mood and production terms. This is a prompt-priority strategy, not a guarantee of a particular generated result.

## Domain boundary

`vocal_clarity_engine.js` is the single source of truth. It is a pure UMD/CommonJS module with no DOM, storage or network dependency.

Its responsibilities are:

- normalize known clarity aliases;
- remove duplicate clarity instructions;
- apply the complete canonical prefix in the exact order;
- inspect whether a STYLE already contains the complete, front-loaded prefix;
- analyze genre, vocal treatment, spatial language, vocal mode and lyric density;
- return a deterministic Smart, Off or Force decision;
- expose structured issues for every UI and analysis consumer.

The UI renders this result but does not maintain a competing compatibility model.

## STYLE and Pipe-Stack boundary

Vocal Clarity belongs only to the global STYLE prompt. It expresses the overall vocal priority for the generation.

Section directions remain Pipe-Stacks:

```text
[Section | Mood | Vocal Style | Key Instruments | Dynamics | Spatial Effects | Production Style]
```

`metatag_stack_engine.js` remains the only parser, renderer and analyzer for section-level instructions. The Pipe-Stack Doctor may report a contradiction between a global dry/close vocal priority and a section such as `Deep Reverb`, but neither engine silently rewrites the other domain.

## Decision modes

| Mode | Compatible | Caution | Hard conflict | Instrumental |
|---|---|---|---|---|
| Smart | Apply prefix | Apply and warn | Do not apply | Suppress |
| Off | Preserve STYLE as written | Preserve STYLE as written | Preserve STYLE as written | Preserve STYLE as written |
| Force | Apply prefix | Apply prefix | Apply and show conflict | Suppress |

Force is an explicit user override. Instrumental Mode remains authoritative because a vocal prefix would be semantically invalid there.

## Compatibility model

Hard conflicts block Smart mode:

- explicit buried, muffled, obscured, distant or murky vocal treatment;
- genres strongly built around embedded or intentionally murky vocals;
- heavy vocal reverb or strongly reverberant global space;
- lyric density that leaves too little room for articulation;
- Instrumental Mode.

Cautions keep Smart mode active:

- genres that often use soft, spacious or hazy vocals;
- lighter vocal or global spatial language;
- moderately dense lyric lines.

The reverb analyzer is target-aware. An instrument-only direction such as `reverb-soaked guitars` does not conflict with a dry, close lead vocal. `Minimal Reverb`, `Short Reverb`, `Dry Forward Vocal` and `Close Mic` are supportive rather than contradictory.

## Lyric-density model

Bracketed section and Pipe-Stack directions are removed before counting lyric words. The analyzer records line count, word count, average and maximum words per line, dense-line ratio and a normalized level:

- `empty`: no lyric lines;
- `low`: sufficient rhythmic space;
- `medium`: warning, prefix remains active in Smart mode;
- `high`: hard conflict in Smart mode.

The analyzer never truncates, edits or rewrites lyrics. It only explains why articulation may be unreliable.

## Integration invariants

- The prefix is complete or absent; no partial automatic block is emitted.
- When applied, the five terms occupy positions one through five in the exact canonical order.
- Existing aliases are normalized without duplicate instructions.
- Off mode does not remove manually authored clarity terms.
- Prompt Optimizer and Style Simplifier preserve the complete prefix and its first position.
- Style Health Check reports incomplete ordering and compatibility problems.
- The central compatibility score reflects active cautions, blocks and forced contradictions.
- Pipe-Stacks remain lossless, section-scoped and independently reorderable.
- First-Start persistence and `first-start-v2` remain unchanged.
- All behavior remains local and offline.

## Maintenance rule

New aliases, genres or conflict signals must be added to the central engine together with a domain test. Consumers should call the shared API and must not copy its regular expressions or decision rules.

# Version 7.5.6 – Vocal Clarity Assistant

## Goal

Version 7.5.6 turns the requested Broadway-to-close-mic instruction block into a maintainable global STYLE feature with explicit compatibility decisions.

## Added

- Pure `vocal_clarity_engine.js` domain module
- Exact five-part, front-loaded Vocal Clarity prefix
- Smart, Off and Force modes
- Live status for genre, vocal space and lyric density
- Structured German and English explanations
- Target-aware reverb analysis
- Deterministic lyric-density analysis
- Vocal Clarity coverage in the compatibility score

## Integrated

- Main STYLE generation
- Prompt Optimizer 2.0
- Style Simplifier
- Style Health Check
- Conflict Resolver
- MetaTag Pipe-Stack STYLE comparison
- Complete application smoke tests

## Compatibility decisions

- Smart mode applies the block when compatible.
- Smart mode applies with a visible caution for soft/spacious genres or medium lyric density.
- Smart mode does not apply it to explicit murky vocals, strongly incompatible genres, heavy vocal/global reverb or high lyric density.
- Force preserves deliberate user control and keeps every detected conflict visible.
- Instrumental Mode suppresses vocal instructions in every mode.
- Instrument reverb does not count as vocal reverb.

## Safety and ownership

- No lyrics are shortened or rewritten.
- No STYLE conflict is silently repaired.
- No Pipe-Stack is converted into a STYLE instruction.
- Vocal Clarity owns only global STYLE priority.
- The MetaTag Pipe-Stack Engine remains the sole owner of section directions.
- Existing First-Start completion remains valid because the flow revision stays `first-start-v2`.

# Version 7.5.3 – First-Start State Machine

## Complete architecture replacement

- Replaced the former function-driven First-Start controller with a deterministic finite-state machine
- Added explicit phases for Booting, Waiting for Advanced Mode, Welcome, Tour, Completion and Ready
- Added a phase-specific transition table; illegal events are rejected without state mutation
- Welcome, Tour, Completion, Help Center, profiles and contextual tips now share one canonical snapshot
- DOM classes, `data-fse-state`, `hidden` attributes and focus are derived from that snapshot

## Clean module boundaries

- Pure state and transition logic in `first_start_state_machine.js`
- Versioned persistence and legacy migration in `first_start_repository.js`
- DOM rendering, event adaptation, focus and tour geometry in `first_start_view.js`
- Composition and declarative effect execution in `first_start_experience.js`
- Existing 14-language onboarding registry remains separate in `first_start_experience_i18n.js`

## Persistence schema v2

- New single source of truth: `nsw-fse-state-v2`
- Validates and normalizes every persisted field
- Migrates the five legacy `nsw-fse-*-v1` keys once
- Reset removes both v2 and legacy state to prevent accidental remigration
- Graceful in-memory behavior when browser storage is unavailable
- Cross-tab storage synchronization added

## Long-term versioning

- Application release version and onboarding flow revision are now independent
- Patch releases no longer force completed users through onboarding again
- A repeated onboarding is possible only through an intentional flow-revision change or Reset

## Deterministic lifecycle

- First Start waits in Simple or Guided Mode and opens exactly once when Advanced Mode becomes active
- Tour progress is bounded by guards and completion is persisted only after Finish or Skip
- Manual tour replays preserve the existing completion marker
- Tip delays use cancellable tokens; stale timers cannot reopen old content
- Tour target layout uses animation-frame settling instead of chained timing guesses
- First-Start scripts now load after their DOM in strict dependency order

## UX and accessibility

- “Remember this choice” now has real behavior and is enabled by default
- Unchecked choices remain session-only
- Help button is visible only while the machine is Ready
- Dialog focus entry, focus restoration, Tab containment and Escape behavior are centralized
- Language changes use the canonical `nordlicht-language-changed` event
- Version labels consistently show 7.5.3

## Verification

- Pure transition and guard tests
- Persistence, corruption and legacy migration tests
- DOM lifecycle, reload, tour, help, reset, mode and language tests
- Complete offline Studio boot smoke test
- Duplicate-ID, asset, script-order and architecture-boundary checks
- Syntax validation for every shipped JavaScript file

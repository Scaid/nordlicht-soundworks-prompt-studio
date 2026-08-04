# First-Start Architecture – Version 7.5.3

## Purpose

Version 7.5.3 replaces the former collection of direct DOM and `localStorage` operations with one deterministic state machine. The visible Welcome, Tour, Completion, Help Center and contextual tips remain, but none of them may change application state directly.

## Module boundaries

| Module | Responsibility | Must not do |
| --- | --- | --- |
| `first_start_state_machine.js` | Pure transition table, guards, invariants and declarative effects | Access DOM, timers or storage |
| `first_start_repository.js` | Schema-v2 persistence, validation, legacy-v1 migration and storage fallback | Render UI or choose transitions |
| `first_start_view.js` | DOM event adapter, derived rendering, focus management and tour geometry | Write onboarding storage or decide business state |
| `first_start_experience_i18n.js` | Resolve and apply the active onboarding language | Control lifecycle state |
| `first_start_experience.js` | Composition root; connects machine, repository, view, Studio Mode and timers | Contain independent business-state branches |

The dependency direction is one-way:

`Controller → State Machine / Repository / View → DOM or localStorage adapter`

## Canonical phases

| Phase | Meaning | Overlay |
| --- | --- | --- |
| `booting` | Machine exists but has not received `INIT` | Closed |
| `waiting-for-advanced` | First start is pending while Simple or Guided Mode is active | Closed |
| `welcome` | Experience choice is required | Welcome |
| `tour` | A guarded tour step is active | Tour card and dual spotlight |
| `complete` | The last tour step was completed | Completion |
| `ready` | First-start flow is inactive; Help and tips may be used | Closed |

Help-menu visibility, profile, current tour step, pending tip and visible tip are part of the machine snapshot. CSS classes and `hidden` attributes are derived output only.

## Main transitions

| Current phase | Event | Next phase | Important effects |
| --- | --- | --- | --- |
| `booting` | `INIT` | `welcome`, `waiting-for-advanced` or `ready` | None |
| `waiting-for-advanced` | `MODE_CHANGED: advanced` | `welcome` | None |
| `welcome` | `SELECT_QUICK` | `ready` | Optional persist; beginner tip |
| `welcome` | `SELECT_EXPERT` / `CLOSE_WELCOME` | `ready` | Optional persist |
| `welcome` | `START_TOUR` | `tour` | Ensure Advanced Mode; navigate step 0 |
| `tour` | `TOUR_NEXT` | `tour` or `complete` | Navigate next step; persist only at completion |
| `tour` | `TOUR_BACK` | `tour` | Guarded decrement; impossible below step 0 |
| `tour` | `TOUR_SKIP` | `ready` | Optional completion persist |
| `complete` | `COMPLETE_ACK` | `ready` | Clear transient timers |
| `ready` | `RESTART_TOUR` | `tour` | Preserve existing completion; switch to Expert profile |
| `ready` | `TOGGLE_HELP` | `ready` | Isolated Help branch |
| Any | `RESET` | `welcome` | Remove schema-v2 and legacy-v1 state; ensure Advanced Mode |
| Any non-tour phase | `SYNC_PERSISTENCE` | Derived from synchronized snapshot | Cross-tab consistency |

Events not declared for the active phase are rejected without mutating the snapshot.

## Declarative effects

The reducer never performs side effects. It returns effect descriptions that the controller executes after rendering:

- `PERSIST`
- `RESET_PERSISTENCE`
- `ENSURE_ADVANCED_MODE`
- `NAVIGATE_TOUR_STEP`
- `SCHEDULE_TIP`
- `SCHEDULE_TIP_HIDE`
- `CLEAR_TIMERS`

Every delayed action returns to the machine as a tokenized event. Stale tip timers therefore cannot reopen an obsolete UI state.

## Persistence schema

The only current key is `nsw-fse-state-v2`.

```json
{
  "schemaVersion": 2,
  "flowRevision": "first-start-v1",
  "releaseVersion": "7.5.3",
  "completedRevision": "first-start-v1",
  "profile": "expert",
  "tipsSeen": {},
  "visits": {},
  "migratedFrom": "legacy-v1",
  "updatedAt": "2026-08-05T00:00:00.000Z"
}
```

All input is normalized. Invalid JSON, invalid profiles, negative counters and non-boolean tip flags are rejected safely. If browser storage is unavailable, the repository continues in memory for the current session.

## Release version versus flow revision

`releaseVersion` and `flowRevision` are intentionally independent:

- `releaseVersion` identifies the application package.
- `flowRevision` changes only when users must genuinely repeat onboarding.

A normal patch release therefore never reopens Welcome for an already completed user. Changing `flowRevision` is an explicit product decision, not an accidental consequence of bumping the application version.

## Legacy migration

On the first 7.5.3 load, the repository reads these v1 keys only when no valid v2 document exists:

- `nsw-fse-complete-v1`
- `nsw-fse-version-v1`
- `nsw-fse-profile-v1`
- `nsw-fse-tips-v1`
- `nsw-fse-visits-v1`

The normalized result is written once to schema v2. The v2 document is authoritative afterwards. Reset removes both generations so an old completion flag cannot remigrate itself.

## Remember-choice semantics

The checkbox is checked by default to preserve normal one-time onboarding behavior.

- Checked: the selected profile and completed flow revision are saved.
- Unchecked: the choice applies only to the current page session and Welcome returns after a reload.
- A tour is persisted only when it is completed or skipped, never when it merely starts.

The machine keeps the active `profile` separate from `persistedProfile`. This prevents an unrelated later save—for example a contextual-tip visit—from accidentally writing a session-only Quick Start choice.

## Extension rules

1. Add new lifecycle behavior as an event and a transition handler, never as a direct DOM callback branch.
2. Keep transition handlers pure and return declarative effects.
3. Change `flowRevision` only when a repeat onboarding is intentional.
4. Add or reorder tour steps only in `first_start_view.js`, then update all 14 `steps` translation arrays.
5. Add repository schema fields through normalization and migration; do not read storage from the controller or view.
6. Add tests for every new legal transition, every guard and every migration rule.

## Verification

Run dependency-free tests:

```bash
node --test tests/*.test.js
```

DOM and complete-app smoke tests use `jsdom` when it is available and otherwise report as skipped. All shipped JavaScript files can be syntax-checked with:

```bash
find . -type f -name '*.js' -not -path './tests/*' -print0 | xargs -0 -n1 node --check
```

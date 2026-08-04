# First-Start Architecture – Version 7.5.4

Version 7.5.4 keeps the deterministic state machine introduced in 7.5.3 and replaces the tour layer with a workspace-first, ID-based model. Lifecycle state, persistence, DOM rendering and localization remain separate modules.

## Canonical tour definition

`first_start_view.js` contains the only ordered tour definition. Each immutable step declares:

| Field | Purpose |
| --- | --- |
| `id` | Stable localization and diagnostics key |
| `kind` | Workspace overview or focused feature |
| `icon`, `title`, `text` | Safe fallback content |
| `location.workspace` | Sidebar group that must be open |
| `location.view` | Application view the navigation adapter opens |
| `focus.primary` | First selector, fallback selector and padding |
| `focus.secondary` | Second selector, fallback selector and padding |

The six shipped IDs are:

| Order | ID | Coverage |
| --- | --- | --- |
| 1 | `workspace-create` | CREATE overview |
| 2 | `lyrics-workspace` | Lyrics editor plus MetaTag Drag & Drop |
| 3 | `workspace-analyze` | ANALYZE overview |
| 4 | `workspace-knowledge` | KNOWLEDGE overview |
| 5 | `workspace-project` | PROJECT overview |
| 6 | `studio-intelligence` | Final next-step guidance |

The state machine receives only `tourStepCount`. It does not know DOM selectors, titles or workspace names, so content changes cannot create lifecycle branches.

## ID-based localization

Every language record stores tour content by semantic ID:

```json
{
  "steps": {
    "lyrics-workspace": {
      "title": "Lyrics Workspace",
      "text": "…"
    }
  }
}
```

Adding or reordering a step no longer shifts translations onto a different feature. Structural tests require all 14 records to contain exactly the canonical IDs with non-empty titles and descriptions.

## Generic focus geometry

The view resolves two generic focus specifications after navigation settles. Primary and secondary spotlights replace the former hard-coded Sidebar and Workspace roles.

For normal workspace steps:

- primary = workspace navigation group
- secondary = representative workspace content

For the Lyrics step:

- primary = `#lyricsTagLibrary`
- secondary = `#lyricsView .lyrics-editor-shell`

The connector calculates exit and entry points from rectangle centers and edges. It therefore supports left-to-right, right-to-left, vertical and diagonal relationships without step-specific geometry.

## Completion rendering

The completion list is derived from the active ordered definitions and localized through the same step IDs. There is no second manually maintained list of visited areas.

## Flow revision and migration

```json
{
  "schemaVersion": 2,
  "flowRevision": "first-start-v2",
  "releaseVersion": "7.5.4",
  "completedRevision": "first-start-v2"
}
```

The new tour is a material onboarding change, so 7.5.4 intentionally advances `flowRevision` to `first-start-v2`. A completed v7.5.3 document contains `first-start-v1`; the state machine therefore opens Welcome once. Completing or skipping the new flow writes v2 and subsequent reloads stay Ready.

The repository accepts `legacyCompletedRevision` separately from the current revision. A legacy-v1 completion migrates as `first-start-v1`, while the normalized document records `flowRevision: first-start-v2`. This keeps migration factual and leaves the due/not-due decision to the state machine.

## Extension rules

1. Add a tour step only through a new stable `id` and structured definition.
2. Add the same ID to every First-Start language record; never use positional translation arrays.
3. Use generic focus selectors and fallbacks; do not add geometry branches for individual features.
4. Keep lifecycle behavior in `first_start_state_machine.js` and side effects in the controller.
5. Change `flowRevision` only when repeating onboarding is an explicit product decision.
6. Extend structural, DOM and complete-app tests with every new tour contract.


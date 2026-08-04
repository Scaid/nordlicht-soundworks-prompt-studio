# Validation Report – Version 7.5.4

Date: 2026-08-05  
Base package: Version 7.5.3 First-Start State Machine

## Result

- Automated tests: **45 passed, 0 failed, 0 skipped**
- Shipped JavaScript syntax: **87 files passed**
- First-Start language records: **14 complete records**
- Canonical tour steps: **6 unique stable IDs**
- Covered main workspaces: **CREATE, ANALYZE, KNOWLEDGE, PROJECT**
- Duplicate HTML IDs: **0**
- Missing local script/style references: **0**
- Complete stylesheet parse errors: **0**
- Complete offline Studio boot errors: **0**
- Fresh-extract automated tests: **45 passed, 0 failed, 0 skipped**
- Final ZIP integrity: **passed**

## Workspace-tour coverage

- Exact canonical step order and ID uniqueness
- One overview step for every main workspace
- Dedicated `lyrics-workspace` step
- Real MetaTag-library and Lyrics-editor selectors
- Localized Drag & Drop plus ＋ click guidance
- Generic primary/secondary spotlight targets
- Right-to-left MetaTag-library-to-editor connector geometry
- ID-derived localized completion list
- Deterministic Back, Next, Skip, Complete and replay behavior

## Lyrics interaction coverage

- Complete Studio renders draggable MetaTag entries
- Drag start writes the tag through `DataTransfer` as `text/plain`
- Drop on the editor shell retrieves the tag
- Dropped MetaTag is inserted into the real `#lyricsEditor`
- Tour text points to the same library and editor used by the interaction

## Revision and migration coverage

- `first-start-v2` is independent from release `7.5.4`
- Completed 7.5.3 schema-v2 state opens the new Welcome once
- Completing v2 prevents a second Welcome on reload
- Legacy completion migrates factually as `first-start-v1`
- Current document records `flowRevision: first-start-v2`
- Repository exposes and validates the explicit legacy-completed revision

## Localization coverage

- All 14 records use ID-keyed `steps` objects instead of positional arrays
- Every record contains all six canonical IDs
- Every step contains a non-empty title and description
- German explicitly contains “Drag & Drop” and ＋ insertion guidance
- English and all other supported records contain localized equivalents

## Test distribution

- State-machine tests: **14**
- Repository and migration tests: **10**
- DOM lifecycle and tour tests: **10**
- Structural integration tests: **9**
- Stylesheet and complete-app smoke tests: **2**

## Commands

```bash
NODE_PATH=/tmp/nsw-fse-browser-test/node_modules node --test tests/*.test.js
find . -type f -name '*.js' -not -path './tests/*' -print0 | xargs -0 -n1 node --check
```

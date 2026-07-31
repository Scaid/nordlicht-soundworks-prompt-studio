# Version 2.0.2 – Lyrics Workspace Phase 3

## Live analysis 2.0
- Added a dynamic lyrics quality score from 0–100.
- Added detailed warnings and critical conflict detection.
- Detects malformed square brackets, duplicate MetaTags, overloaded sections, empty sections, long lyrics and non-sequential Verse numbering.
- Analysis entries with a line number can jump directly to the affected line.

## Synchronized song structure
- Song structure now displays word and MetaTag counts per section.
- The current section is highlighted while the cursor moves through the editor.
- Sections containing warnings receive a visible warning marker.
- Added “Sync & normalize structure” to standardize section names, whitespace and Verse numbering.

## MetaTag Doctor
- Added a dedicated MetaTag health panel.
- Displays total MetaTags and detected issues.
- Detects conflicts such as Instrumental sections combined with vocal directions.
- Added safe optimization for exact duplicates, whitespace and adjacent compatible MetaTags.
- Related Style, Music, Choir, Production, Ad-libs and Transition values can be consolidated without changing sung lyrics.

## Compatibility
- Existing Phase 2 autosaves are restored automatically.
- Undo, Redo, Live Output and autosave remain connected to all Phase 3 actions.

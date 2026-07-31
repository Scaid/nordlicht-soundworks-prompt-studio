# Nordlicht Soundworks Prompt Studio v2.0.0 – Lyrics Workspace Phase 1

## New
- Dedicated Lyrics Workspace as the new primary navigation area
- Large monospaced lyrics editor with synchronized line numbers
- Local autosave and automatic restore after reopening the browser
- Multi-step Undo and Redo history
- Tab-key indentation and keyboard shortcuts
- Find and replace, including Replace All
- Automatically detected song structure with clickable section navigation
- Live lyrics statistics for lines, words, characters and sections
- Live analysis for Verse, Chorus, structure and lyric length
- Syntax Preview highlighting section tags, MetaTags and ad-libs
- Lyrics tab in the existing Live Output sidebar
- Separate copy and text export actions
- Responsive layout for desktop, tablet and smartphone

## Architecture
- New standalone `lyrics_workspace.js` module
- Lyrics are stored separately from builder presets and builder state
- Phase 1 establishes the foundation for MetaTag drag-and-drop in Phase 2

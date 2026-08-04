# Version 7.5.4 – Workspace Welcome Tour

## Workspace-first onboarding

- Replaced the former module sampler with a concise tour of all four main workspaces: CREATE, ANALYZE, KNOWLEDGE and PROJECT
- Added a dedicated Lyrics Workspace step without increasing the tour beyond six steps
- Kept Studio Intelligence as the final orientation point for users who are unsure what to do next
- Generates the completion summary from the same step definitions instead of maintaining duplicate markup

## Lyrics Workspace guidance

- Opens the real Lyrics Workspace during the tour
- Highlights the MetaTag library and Lyrics editor as two connected focus areas
- Explicitly explains both supported insertion paths: drag a MetaTag into the editor or click the ＋ action
- Verifies the existing drag-start, data-transfer and drop insertion path in the complete-app smoke test

## Maintainable tour model

- Every tour step now has a stable semantic ID
- Translations are keyed by step ID instead of array position
- Navigation, workspace location and focus targets are declared as structured step data
- Spotlight geometry now uses generic primary and secondary targets
- Connector geometry supports targets in any direction, including the right-to-left MetaTag-library-to-editor path

## Revision behavior

- Application version: `7.5.4`
- Onboarding flow revision: `first-start-v2`
- Completed 7.5.3 users receive the materially changed workspace tour once
- After completing or intentionally skipping v2, normal reloads remain quiet
- Legacy-v1 migration preserves its historical completed revision so the state machine—not migration code—decides whether the new flow is due

## Localization

- Updated all 14 First-Start language records
- Every record contains the same six stable step IDs
- German and English explicitly describe Drag & Drop and click insertion; all other supported records contain localized equivalents


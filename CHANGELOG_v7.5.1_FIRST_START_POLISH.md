# Version 7.5.1 – First Start Experience Polish

## Dual spotlight tour
- Sidebar entry and corresponding workspace content are highlighted simultaneously
- SVG mask creates two real transparent spotlight openings
- Separate gold and blue focus frames distinguish navigation and work area
- Animated connector visually links the sidebar module to its workspace
- Tour now opens the correct module before each explanation
- Knowledge step opens Genre Intelligence as an example of the Knowledge Workspace

## Intelligent card placement
- Tutorial card evaluates positions above, below, left and right
- Position with the least overlap is selected
- The card no longer sits on top of the highlighted workspace whenever space is available
- Spotlight, connector and card are recalculated after scrolling and resizing

## Language consistency
- The onboarding language is resolved from the Studio language stored in `nordlicht-ui-language`
- No dependency on the inaccessible lexical `currentUiLanguage` variable
- Language is applied before the welcome screen or tour is shown
- Every tour step reads its translation again when displayed
- Welcome screen, cards, durations, buttons, help menu and completion screen use one centralized language record
- Complete and internally consistent onboarding records for all 14 shipped languages

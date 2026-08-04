# Version 7.5.2 – Onboarding Component Fix

## Component separation
- Welcome dialog, tour engine, completion screen and help center now use separate explicit states
- Help menu can no longer replace or imitate the welcome screen
- Welcome, Tour and Completion visibility is controlled only by `data-fse-state`
- Help menu and contextual tips use the native `hidden` attribute

## First-start migration
- Added versioned onboarding state
- Version 7.5.2 opens the corrected welcome screen once, even when an older 7.5.x onboarding completion flag exists
- Future launches respect the completed state for this version

## Reliability improvements
- Explicit closed state on startup
- Help menu is force-closed during initialization
- Help button is hidden while Welcome, Tour or Completion is active
- Tour, welcome and help actions no longer share display-state logic
- Language refresh recursion removed
- Dual sidebar/workspace spotlight from 7.5.1 remains active

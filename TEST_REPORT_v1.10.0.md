# Test Report – Version 1.10.0

## Automated checks
- JavaScript syntax checked for every `.js` file with `node --check`: PASS
- Duplicate HTML IDs: none found
- Required Randomizer 2.0 controls present in main view and sidebar: PASS
- Version labels updated to 1.10.0: PASS
- Instrument records: 723
- Germany records: 37
- Japan records: 34
- ZIP integrity checked with `unzip -t`: PASS

## Functional logic reviewed
- Intelligent mode uses the compatibility profiles.
- Balanced mode combines profile-based choices with controlled wildcard elements.
- Experimental mode bypasses normal compatibility selection and supports Mild, Creative, Wild and Chaos levels.
- Main Randomizer and sidebar mode/level controls synchronize.
- Experimental controls are only shown when Experimental mode is active.
- Rare-instrument preference uses the new rarity metadata.
- Reset and existing output generation remain connected to the original central state.

## Compatibility
- Existing instrument fields (`name`, `country`, `region`, `family`) were preserved.
- New metadata fields are added non-destructively at runtime (`id`, `rarity`, `weight`, `era`).
- No external libraries or internet connection are required.

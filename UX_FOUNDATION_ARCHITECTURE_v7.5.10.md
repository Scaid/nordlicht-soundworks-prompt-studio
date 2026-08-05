# UX Foundation Architecture – Version 7.5.10

## Zuständigkeiten

| Modul | Eindeutige Zuständigkeit |
|---|---|
| `release_manifest.js` | aktuelle App-Version und geordnete Release-Metadaten |
| `release_center.js` | lokalisierte Darstellung der Manifestdaten |
| `workspace_state.js` | normalisierter, migrierter Workspace-Zustand |
| `sidebar_organization_v71.js` | ausschließlich Aufbau der DOM-Gruppen |
| `workspace_navigation.js` | Navigation, Accordion-Interaktion, Pins, Home und Breadcrumbs |
| `ux_productivity.js` | Modulsuche und kompakte Ansichten des kanonischen Zustands |
| `contextual_help.js` | Zuordnung sichtbarer Hilfepunkte zu semantischen Tour-Schritten |
| `first_start_state_machine.js` | erlaubte Übergänge für Volltour und kontextbezogene Einzelhilfe |
| `action_transactions.js` | Vorschau, Vorher-Snapshot und Rückgängig registrierter Aktionen |
| `ux_foundation_i18n.js` | neue dynamische UX-Texte in 14 Sprachen |

## Kontext-Hilfe-Lebenszyklus

1. Ein `?` liefert eine stabile Hilfe-ID.
2. `contextual_help.js` löst diese auf eine semantische Tour-Schritt-ID auf.
3. `OPEN_CONTEXT_HELP` wechselt ausschließlich aus `READY` in `TOUR` mit `tourOrigin: context`.
4. Der vorhandene Navigationseffekt öffnet Workspace, View und optionalen Reiter.
5. Die vorhandene View rendert Übersetzung und Fokusziele im Einzelmodus.
6. `TOUR_NEXT` oder `TOUR_SKIP` kehrt unmittelbar nach `READY` zurück und schreibt keine Onboarding-Persistenz.

## Workspace-Migration

Das Schema `nsw-workspace-state-v2` vereinigt vier frühere Bereiche. Normalisierung begrenzt Favoriten und Verlauf, entfernt Duplikate, akzeptiert nur gültige View-IDs und verwirft beschädigte Einzelwerte. Schreibzugriffe veröffentlichen `nsw:workspace-state-change`; Oberflächen rendern nur die für den jeweiligen Grund betroffenen Teile neu.

## Aktionstransaktionen

Es gibt keine Suche nach sichtbaren Wörtern wie „Apply“ oder „Übernehmen“. Nur explizit registrierte IDs werden abgefangen. Bei Vorschau-Aktionen stoppt die Capture-Phase die ursprüngliche Aktion, erfasst beim Bestätigen zuerst den Vorher-Zustand und führt den Button danach mit einem eng begrenzten Bypass einmal aus. Ein Vergleich entscheidet, ob tatsächlich ein rückgängig machbarer Kernbereich verändert wurde.

## Erweiterungsregeln

- Neuer Hilfepunkt: Registry-Eintrag mit vorhandener semantischer Schritt-ID ergänzen.
- Neuer Tour-Schritt: zuerst Definition, Übersetzungen und Fokusziele ergänzen; danach kann Kontext-Hilfe ihn referenzieren.
- Neue modulübergreifende Aktion: stabile Button-ID und erwartete Bereiche registrieren.
- Neue App-Version: ausschließlich Manifest und Release-Übersetzungen erweitern.
- Neue Workspace-Persistenz: Schema-Version erhöhen und explizite Normalisierung/Migration ergänzen.

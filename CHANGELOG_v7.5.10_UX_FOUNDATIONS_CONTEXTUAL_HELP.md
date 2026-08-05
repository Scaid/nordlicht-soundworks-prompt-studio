# Version 7.5.10 – UX Foundations & Contextual Help

## Ziel

Version 7.5.10 macht Hilfe dort verfügbar, wo eine Frage entsteht, und beseitigt zugleich mehrere parallele UX-Zustände. Die Änderung ist als Architektur-Release aufgebaut: bestehende Daten werden migriert, Navigation und Hilfe besitzen jeweils eine eindeutige Zuständigkeit und sichtbare Texte sind niemals technische Identifikatoren.

## Kontextbezogene Hilfe

Neben zehn wichtigen Bereichen erscheint ein kleines, tastaturbedienbares `?`:

- Studio-Übersicht
- CREATE / Smart Randomizer
- STYLE / Style Builder
- Vocal Clarity
- Lyrics Workspace
- KNOWLEDGE / Genre Intelligence
- ANALYSIS / Song DNA Analyzer
- PROJECTS / Project Manager
- Live Output
- Studio Intelligence

Jeder Hilfepunkt verweist auf eine stabile semantische Schritt-ID. Die First-Start-State-Machine öffnet den zugehörigen Workspace und bei Vocal Clarity zusätzlich den Vocals-Reiter. Danach wird nur dieser eine Schritt angezeigt. „Verstanden“ oder „Schließen“ kehrt direkt zum Studio zurück; Zurück-Navigation, Tour-Fortsetzung und Onboarding-Persistenz sind in diesem Modus bewusst deaktiviert.

Die vollständige Begrüßungstour bleibt unverändert nutzbar. Einzelhilfe und Volltour teilen Definition, Übersetzung, Fokusziele und Navigation, sodass keine zweite Hilfequelle auseinanderlaufen kann.

## Release Center

`release_manifest.js` ist die einzige Quelle für die aktuelle App-Version. Kopfzeile, Seitenleiste, Home-Badge und Changelog beziehen Version 7.5.10 daraus. Das frühere statische Changelog mit Versionsständen 1.2.1 bis 1.7.0 ist aus dem sichtbaren DOM entfernt. Der neue Release-Verlauf wird dynamisch und sprachabhängig aufgebaut.

## Einheitlicher Workspace-Zustand

`workspace_state.js` speichert in einem versionierten Dokument:

- Favoriten
- zuletzt verwendete Module
- letzten Workspace
- geöffnete Seitenleisten-Gruppen

Beim ersten Start werden die früheren Workspace- und Productivity-Schlüssel zusammengeführt, dedupliziert und normalisiert. Alte Schlüssel werden nicht gelöscht und bleiben damit als sichere Migrationsquelle erhalten. Navigation, Home, Pins und Modulsuche lesen anschließend ausschließlich den kanonischen Zustand.

## Sichere Aktionen

Modulübergreifende Aktionen werden über stabile Button-IDs registriert. Große Aktionen zeigen vor dem Anwenden eine Vorschau der betroffenen Bereiche. Kleinere registrierte Übernahmen laufen direkt, erhalten aber ebenfalls einen echten Vorher-Snapshot.

Rückgängig verwendet `collectFormState()` und `applyFormState()` sowie den Lyrics-Editor. Es hängt weder von deutscher noch von englischer Beschriftung ab und erfasst den Zustand vor der Aktion statt nachträglich den bereits veränderten Zustand zu speichern.

## Lokalisierung

Alle neuen dynamischen Texte sind vollständig in den 14 aktivierten Sprachen vorhanden:

`en`, `de`, `fr`, `es`, `it`, `pt`, `pt-BR`, `nl`, `pl`, `tr`, `ru`, `ja`, `ko`, `zh-CN`

## Bewusst unverändert

- Der Vocal-Clarity-Fünferblock und seine Smart-/Off-/Force-Logik bleiben erhalten.
- Pipe-Stack bleibt das einzige Format für Anweisungen innerhalb einzelner Songabschnitte.
- STYLE- und Suno-Fachbegriffe bleiben in kanonischem Englisch.
- Das Studio bleibt vollständig offline und benötigt keine API.

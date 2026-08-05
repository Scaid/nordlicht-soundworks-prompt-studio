# Validation Report – Version 7.5.10

## Ergebnis

Version 7.5.10 wurde als Architektur- und UX-Release geprüft.

```text
tests:     95
passed:    95
failed:     0
cancelled:  0
skipped:    0
```

## Kontextbezogene Hilfe

Geprüft wurden:

- zehn eindeutige, stabile Hilfe-IDs ohne doppelte Schaltflächen;
- jede Hilfe-ID verweist auf einen vorhandenen semantischen Tour-Schritt;
- Klick auf `?` verwendet den State-Machine-Übergang `OPEN_CONTEXT_HELP`;
- korrekte Navigation zu Workspace, View und optionalem Style-Builder-Reiter;
- Vocal Clarity öffnet tatsächlich STYLE → Vocals und markiert Erklärung sowie Einstellung;
- Einzelmodus zeigt „Verstanden“, blendet Zurück aus und setzt den Fortschritt auf 100 Prozent;
- „Verstanden“ und „Schließen“ kehren direkt nach `READY` zurück;
- keine Tour-Fortsetzung, keine simulierten Weiter-Klicks und keine Änderung der Onboarding-Persistenz;
- die vollständige elfteilige Begrüßungstour bleibt deterministisch und unverändert nutzbar;
- Hilfebeschriftungen und Schritttexte reagieren auf den kanonischen Sprachwechsel.

## Release Center

- Manifest meldet eindeutig Version 7.5.10 und eine streng absteigende, duplikatfreie Historie;
- Kopfzeile, Seitenleiste, Home-Badge und First-Start-API beziehen die aktuelle Version aus derselben Quelle;
- das sichtbare Changelog enthält keine Bindungen an die alten Schlüssel `ui_215` bis `ui_224`;
- der Release-Inhalt wird dynamisch aus dem Manifest aufgebaut;
- Deutsch und Französisch wurden im echten DOM umgeschaltet und zeigen lokalisierte Überschrift, Release-Titel und Release-Punkte;
- der ungesehene Release-Hinweis wird nach Öffnen versionsbezogen gespeichert.

## Workspace-Zustand und Navigation

- getrennte frühere Favoriten- und Verlaufsspeicher werden dedupliziert zusammengeführt;
- alter letzter View- und Accordion-Zustand wird in Schema v2 übernommen;
- ungültige View-IDs und beschädigte Werte werden normalisiert;
- Pins, Home, Breadcrumbs, Accordion, Modulsuche und kompakte Listen lesen denselben Zustand;
- Navigations- und Sprachereignisse erzeugen keine zweite Zuständigkeit;
- das alte Sidebar-Dashboard ist als Kompatibilitätsgrenze stillgelegt und baut keinen parallelen deutschen DOM-Baum mehr auf.

## Sichere Aktionen und Rückgängig

- ausschließlich explizite Button-IDs werden registriert;
- sichtbare oder übersetzte Wörter wie „Apply“, „Übernehmen“ oder „Deploy“ werden nicht ausgewertet;
- große modulübergreifende Aktionen stoppen vor der Änderung und zeigen die erwarteten Bereiche;
- der Vorher-Snapshot wird erst beim Bestätigen und vor dem echten Ziel-Click erfasst;
- kleinere registrierte Aktionen erfassen ebenfalls den Zustand in der Capture-Phase;
- Rückgängig stellt Builder-Daten über die kanonische Form-API und Lyrics über das reale Editor-Ereignis wieder her;
- ein DOM-Test bestätigt `before → preview → after → undo → before`;
- kein sprachabhängiger oder zusätzlicher Local-Storage-Undo-Zustand bleibt bestehen.

## Sprachabdeckung

Alle 28 neuen dynamischen UX-Schlüssel sind in den 14 aktivierten Sprachen vollständig:

`en`, `de`, `fr`, `es`, `it`, `pt`, `pt-BR`, `nl`, `pl`, `tr`, `ru`, `ja`, `ko`, `zh-CN`

Die bereits vorhandenen semantischen Workspace-, Reiter-, Studio-Intelligence-, First-Start- und Vocal-Clarity-Kataloge wurden erneut vollständig geprüft.

## Bestehende Fachlogik

- Vocal Clarity bleibt ein einzelner kanonischer `smart | off | force`-Zustand;
- der Fünferblock steht weiterhin vollständig vor Genre und Produktion;
- die Kompatibilitätsregeln für Hall, murky vocals, Lyrics-Dichte und Instrumental Mode bleiben grün;
- Pipe-Stack-Parser, Migration, Reihenfolge, Drag & Drop und Konfliktprüfung bleiben vollständig erhalten;
- Pipe-Stack ist weiterhin das einzige Format für Abschnittsanweisungen.

## Paketprüfung

- sämtliche JavaScript-Dateien im Quellordner bestanden `node --check`;
- die komplette serielle Suite bestand im Quellordner 95/95;
- das vollständige Studio bootete mit allen lokalen Skripten und dem gesamten Stylesheet in JSDOM;
- das Release-ZIP bestand die Integritätsprüfung;
- der Inhalt wurde in ein neues temporäres Verzeichnis entpackt;
- sämtliche JavaScript-Dateien des entpackten Inhalts bestanden erneut `node --check`;
- die komplette serielle Suite bestand aus dem frisch entpackten Release erneut 95/95.

Damit sind Arbeitskopie und ausgelieferter Release-Inhalt unabhängig geprüft.

# Version 7.5.7 – Workspace Localization & Guided Tour

## Ziel

Version 7.5.7 beseitigt die voneinander getrennten Übersetzungswege der Workspace-Oberfläche und baut die Begrüßungstour zu einer vollständigen, leicht verständlichen Studio-Einführung aus. Die Änderung ist eine Architekturversion und kein textbasierter Hotfix.

## Einheitliche Workspace-Lokalisierung

- `NSWInterfaceI18n` ist die einzige Quelle für die aktuell gewählte Oberflächensprache.
- `workspace_i18n_catalog.js` enthält stabile semantische Schlüssel für sieben Workspaces, Ansichten, Home und gemeinsam genutzte Reiter.
- `workspace_i18n.js` bindet die Übersetzungen reversibel an die Oberfläche.
- CREATE, STYLE, SONG, LYRICS, KNOWLEDGE, ANALYSIS und PROJECT werden in allen 14 aktivierten Sprachen abgedeckt.
- Home-Dashboard, Breadcrumbs, Pin-Aktionen, leere Zustände und relative Zeitangaben folgen derselben Sprache.
- Style Builder, Prompt Intelligence, Project Manager, Presets und Live Output verwenden den kanonischen Sprachwechsel.
- Der frühere Translation Overlay 2.0 wurde aus der Laufzeit und aus dem Release entfernt.

## Studio Intelligence

- Statische Oberfläche und dynamische Ergebnisse verwenden stabile Nachrichten-IDs statt bereits übersetzter Sätze.
- 104 dynamische Meldungen sind für jede der 14 Sprachen vorhanden.
- Analysezusammenfassung, Mentor, Coach, Genre-Mix, Sound Design, Workflow, Aktionen, Status, Verlauf und Textbericht werden lokalisiert.
- Ein Sprachwechsel rendert dasselbe Analyseobjekt neu. Die Analyse-ID und die fachlichen Daten bleiben unverändert.
- Konfliktentscheidungen basieren auf semantischen Codes und nicht mehr auf englischen Satzfragmenten.
- STYLE- und Suno-Ausgabewerte bleiben absichtlich kanonisches Englisch.

## First-Start-Tour v3

Die Tour besitzt jetzt zehn stabile Schritte:

1. Studio-Orientierung und Home
2. CREATE Workspace
3. STYLE Workspace
4. SONG Workspace
5. LYRICS Workspace
6. KNOWLEDGE Workspace
7. ANALYSIS Workspace
8. PROJECT Workspace
9. Live Output
10. Studio Intelligence

Jeder Schritt verwendet einen längeren, bewusst einfachen Erklärungstext. Der Lyrics-Schritt erklärt Drag & Drop, das Einfügen mit ＋ und die links-nach-rechts gelesene Pipe-Stack-Priorität. Der STYLE-Schritt erklärt Vocal Clarity als Hilfe für klare, nahe und verständliche Stimmen, ohne inkompatible Klangästhetiken still zu überschreiben.

Die neue Flow-Revision `first-start-v3` wird von der Release-Version getrennt verwaltet. Nutzer mit einer abgeschlossenen älteren Tour sehen die erweiterte Einführung einmal; eine bereits abgeschlossene v3-Tour wird nicht erneut erzwungen.

## Laufzeit und Wartbarkeit

- Dynamisch erzeugte Navigation und Home-Inhalte melden explizite Lebenszyklusereignisse.
- Es gibt keinen globalen `MutationObserver` für Übersetzungen und keine Ersetzung anhand zufälliger sichtbarer Texte.
- Übersetzungen bleiben beim Wechsel zwischen Sprachen vollständig reversibel.
- Bibliotheksersetzungen werden pro Sprache einmal vorkompiliert.
- Dynamische Listen und Instrumente werden während eines Sprachwechsels nicht doppelt aufgebaut.

## Kompatibilität

- MetaTag Pipe-Stack Engine und Vocal Clarity Assistant bleiben unverändert aktiv.
- Presets, Projekte, Lyrics und vorhandene Studio-Intelligence-Historie bleiben lokal gespeichert.
- Das Studio bleibt vollständig offline nutzbar.


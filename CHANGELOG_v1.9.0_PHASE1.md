# Version 1.9.0 – Phase 1: Music Intelligence

## Neue Funktionen
- Zentrale Style-Kompatibilitätsdatenbank für alle 22 Genre-Familien.
- Bewertung von Haupt- und Zweitgenre anhand natürlicher Partnerschaften und gemeinsamer BPM-Bereiche.
- Subgenre-spezifische Profile, unter anderem für Viking, Anime, Hardstyle, Synthwave, Orchestral, Lo-Fi und Trap.
- Dynamische Instrumentenempfehlungen auf Basis von Hauptgenre, Subgenre und Zweitgenre.
- Prozentuale Stil-Passung direkt an empfohlenen Instrumenten.
- Intelligente Vorschläge für Zweitgenre, Songtyp und BPM-Bereich.
- Vorschläge lassen sich mit einem Klick in den Builder übernehmen.
- Der Button „Recommendations“ fügt nun echte stilbasierte Instrumente hinzu statt zufälliger Instrumente.

## Compatibility Score
- Genre-Komponente berücksichtigt jetzt die tatsächliche Beziehung zwischen Haupt- und Zweitgenre.
- Instrumenten-Komponente bewertet jedes ausgewählte Instrument gegen den aktuellen Musikstil.
- Ungewöhnliche Mischungen werden in den Gründen ausgewiesen.

## Technisch
- Neue zentrale Datei `music_intelligence.js`.
- Vorhandene Instrumenten-, Genre-, Randomizer- und Exportfunktionen bleiben kompatibel.
- Vollständig offline nutzbar.

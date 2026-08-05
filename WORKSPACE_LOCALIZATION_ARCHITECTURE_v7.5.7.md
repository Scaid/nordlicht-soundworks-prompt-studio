# Workspace Localization Architecture – v7.5.7

## Architekturziel

Die Oberflächensprache soll an jeder Stelle dieselbe Bedeutung haben. Ein Workspace darf nicht Deutsch anzeigen, während ein dynamischer Reiter oder Studio Intelligence weiterhin Englisch verwendet. Gleichzeitig dürfen übersetzte UI-Begriffe niemals die kanonischen Suno-Daten verändern.

## Verantwortlichkeiten

### Kanonische Sprachquelle

`i18n.js` veröffentlicht `NSWInterfaceI18n` mit `getLanguage()`, `setLanguage()`, `translate()` und der Liste aktivierter Sprachen. Nur diese Schnittstelle setzt `document.documentElement.lang`, speichert die Auswahl und sendet `nordlicht-language-changed`.

### Workspace-Katalog

`workspace_i18n_catalog.js` ist DOM-unabhängig. Er enthält:

- die 14 aktivierten Sprachcodes;
- sieben Workspace-Definitionen;
- die Zuordnung aller Workspace-Ansichten;
- gemeinsame UI-Schlüssel für Reiter und Aktionen;
- Home- und Navigationsmeldungen.

Interne IDs wie `analysis`, `projectManagerView` oder `overview` bleiben stabil. Nur ihre sichtbare Darstellung wird übersetzt.

### Workspace-Binder

`workspace_i18n.js` übersetzt die vorhandene Oberfläche anhand semantischer Selektoren. Der Binder speichert keinen eigenen Sprachwunsch. Er reagiert auf:

- `nordlicht-language-changed`;
- `nsw:workspace-navigation-built`;
- `nsw:workspace-home-rendered`.

Damit werden auch dynamisch erzeugte Bereiche erfasst, ohne den gesamten DOM dauerhaft zu beobachten.

### Studio Intelligence

`studio_intelligence.js` speichert Analyseergebnisse im Schema 2 mit Nachrichtenobjekten aus `key` und `variables`. Die Darstellung erfolgt erst beim Rendern durch `studio_intelligence_i18n.js`.

Die Sprachdaten sind getrennt nach Aufgabe:

- `studio_intelligence_i18n.js`: Oberflächenbegriffe, Bindings sowie Deutsch/Englisch als Kernpakete;
- `studio_intelligence_dynamic_locales.js`: vollständige dynamische Nachrichten für die übrigen zwölf Sprachen.

Jedes dynamische Paket besitzt exakt dieselben 104 Schlüssel. Beim Sprachwechsel werden Zusammenfassung, Rollen, Workflow, Aktionen, Status, Verlauf und Export aus dem unveränderten Analyseobjekt neu erzeugt.

### First-Start-Tour

`first_start_tour_v3_i18n.js` enthält zehn sprachunabhängig adressierbare Schritt-IDs und ihre 14 Sprachvarianten. `first_start_view.js` bestimmt ausschließlich Navigation und Fokusziele. `first_start_experience.js` verwaltet den Ablauf mit `first-start-v3`.

Die Trennung verhindert, dass Übersetzungsarrays von einer zufälligen Schrittposition abhängen.

## Datenfluss

```text
Sprachauswahl
    ↓
NSWInterfaceI18n.setLanguage(code)
    ↓
nordlicht-language-changed
    ├─ Workspace, Home, Breadcrumbs und Reiter
    ├─ Style Builder
    ├─ Studio Intelligence Oberfläche und vorhandenes Ergebnis
    ├─ Lyrics- und Prompt-Intelligence-Sprachadapter
    └─ First-Start-Oberfläche und aktuelle Tourkarte
```

## Bewusste Sprachgrenze

Die Oberfläche erklärt und beschriftet in der gewählten Sprache. Fachliche Ausgabe für Suno bleibt kanonisches Englisch:

- STYLE;
- EXCLUDE;
- Pipe-Stacks und MetaTags;
- interne Preset- und Projektdaten;
- etablierte Produkt- und Modulnamen.

Dadurch bleiben Projekte sprachübergreifend kompatibel und ein Sprachwechsel verändert keine Musikdaten.

## Invarianten

1. Die aktive Sprache kommt immer von `NSWInterfaceI18n`.
2. Ein Sprachwechsel ist reversibel und startet keine Studio-Analyse neu.
3. Dynamische Studio-Intelligence-Nachrichten werden als IDs gespeichert.
4. Jeder First-Start-Schritt besitzt eine stabile ID.
5. Dynamisch erzeugte UI meldet ihren Lebenszyklus explizit.
6. Es gibt keinen globalen Übersetzungs-Observer.
7. Kanonische Suno-Ausgabe wird nicht lokalisiert.

## Erweiterung

Neue Workspace-Texte werden im Katalog unter einem semantischen Schlüssel ergänzt. Neue Studio-Intelligence-Meldungen werden zuerst im englischen Kern angelegt und müssen anschließend in jedem dynamischen Sprachpaket denselben Schlüssel erhalten. Die Tests vergleichen Schlüsselmengen und verhindern unbemerkte Fallbacks.


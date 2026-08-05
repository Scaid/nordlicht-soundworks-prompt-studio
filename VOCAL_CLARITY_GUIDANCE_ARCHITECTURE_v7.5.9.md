# Vocal Clarity Guidance Architecture – Version 7.5.9

## Zustandsmodell

Der einzige persistierte Zustand ist `vocalClarityMode`:

| Wert | Fachliche Bedeutung | Schalter |
|---|---|---|
| `smart` | Kompatibilität prüfen und den Block nur passend einsetzen | Ein |
| `off` | Den automatisch erzeugten Block nicht einsetzen | Aus |
| `force` | Den Block trotz Kompatibilitätswarnungen einsetzen | Ein |

Der sichtbare Schalter besitzt keinen eigenen Formular- oder Speicherwert. `vocal_clarity_controller.js` bildet ausschließlich folgende Übergänge auf den kanonischen Modus ab:

| Ausgang | Schalteraktion | Ergebnis |
|---|---|---|
| `smart` | Ausschalten | `off` |
| `force` | Ausschalten | `off` |
| `off` | Einschalten | `smart` |

Damit können Presets, Backups und ältere gespeicherte Formulare weiterhin denselben Modus verwenden. Es gibt keine konkurrierenden Wahrheiten zwischen Schalter und Auswahlfeld.

## Modulgrenzen

- `vocal_clarity_engine.js`: reine Analyse und STYLE-Entscheidung ohne DOM.
- `vocal_clarity_guidance.js`: reines Präsentationsmodell für Position, Zustand und sichere Modusempfehlung; besitzt weder DOM noch Speicher.
- `vocal_clarity_controller.js`: normalisiert Moduswerte und synchronisiert Schalter mit dem kanonischen Select.
- `vocal_clarity_i18n.js`: semantischer Katalog für Oberfläche, Guidance und neun dynamische Issue-Codes in allen 14 Sprachen.
- `app.js`: verbindet Formzustand, Controller, Lokalisierung und Render-Ausgabe.
- `first_start_state_machine.js`: validiert einen optionalen Wiedereinstiegsindex und bleibt alleiniger Besitzer des Tour-Zustands.
- `first_start_view.js`: navigiert den Tour-Schritt in den Style Builder und aktiviert dessen Vocals-Reiter.
- `first_start_experience.js`: löst eine semantische Schritt-ID über die View auf und startet die State Machine mit dem validierten Index.
- `first_start_tour_v4_i18n.js`: enthält den elfteiligen, vollständig lokalisierten Tour-Inhalt.

## Datenfluss

1. Nutzer klickt den Schalter oder ändert den Kompatibilitätsmodus.
2. Der Controller schreibt `smart`, `off` oder `force` in `#vocalClarityMode`.
3. Das bestehende `change`-Ereignis startet die zentrale STYLE-Erzeugung.
4. `vocal_clarity_engine.js` analysiert denselben Grund-STYLE, Vocal-Modus und Lyrics-Zustand.
5. `vocal_clarity_guidance.js` bildet dieselbe Entscheidung in Live-Position und sichere Empfehlung ab.
6. Die Entscheidung aktualisiert STYLE, Status, lokalisierte Issue-Codes, Position und Schalterzustand.
7. `collectFormState()` speichert ausschließlich `vocalClarityMode`.

## Live-Position und Empfehlung

Die Guidance leitet ihre Darstellung ausschließlich aus dem bereits vorhandenen Engine-Ergebnis ab:

- bei angewendetem, frontgeladenem Block wird Position `1–5` ausgegeben;
- bei Blockiert, Instrumental oder Aus wird keine Position behauptet;
- `smart` besitzt keine Schnellaktion, weil die Empfehlung bereits aktiv ist;
- `off` und `force` bieten ausschließlich das Ziel `smart` an.

Damit kann die Oberfläche keine zweite fachliche Entscheidung treffen und keine widersprüchliche Präferenz speichern.

## Barrierefreiheit

- Der Schalter ist ein echtes `button`-Element und funktioniert mit Tastaturaktivierung.
- `role="switch"` und `aria-checked` spiegeln den kanonischen Modus.
- `aria-controls` verweist auf Einstellung und Status.
- `aria-describedby` verbindet den Schalter mit Beschreibung und Modushilfe.
- Der sichtbare Ein-/Aus-Text wird bei jedem Sprach- oder Moduswechsel aktualisiert.

## First-Start-Integration

Die neue semantische Schritt-ID `vocal-clarity` besitzt die Zielbeschreibung:

```text
workspace: style
view: styleView
styleTab: vocals
primary focus: #vocalClarityWhy
secondary focus: #vocalClarityControls
```

Die Tour kennt damit nicht nur das Ziel-Workspace, sondern öffnet auch den tatsächlich benötigten Unterreiter. Die Flow-Revision ist bewusst von der Release-Version getrennt und wurde für diese materielle Erweiterung auf `first-start-v4` erhöht.

Der kontextbezogene Einstieg verwendet `startTourAt('vocal-clarity')`. Die Experience löst die stabile ID in den aktuellen Index auf. Die State Machine akzeptiert nur ganzzahlige Indizes innerhalb der konfigurierten Schrittzahl und fällt bei ungültigen Werten auf Schritt 0 zurück. Direkte DOM-Manipulation oder wiederholte simulierte „Weiter“-Klicks sind dadurch ausgeschlossen.

# Version 7.5.9 – Vocal Clarity Live Guidance & Context Tour

## Ziel

Version 7.5.9 macht den vorhandenen Vocal-Clarity-Zustand sichtbar, verständlich und direkt bedienbar. Zusätzlich erklärt eine Live-Guidance die tatsächliche STYLE-Position, bietet eine sichere Rückkehr zur Automatik und öffnet die Tour direkt am relevanten Schritt. Die Änderung ergänzt keine zweite Einstellungslogik, sondern legt eine klare Bedien- und Erklärungsschicht auf die bestehende fachliche Entscheidung `smart | off | force`.

## Sichtbare Auswahl

- Die Vocal-Clarity-Karte besitzt einen großen, barrierearmen Schalter mit `role="switch"` und synchronem `aria-checked`.
- Einschalten setzt den empfohlenen Modus `smart`.
- Ausschalten setzt den kanonischen Modus `off`.
- Der vorhandene Modus erlaubt weiterhin die bewusste Auswahl von `smart`, `off` und `force`.
- Schalter, Modus, STYLE-Ausgabe, Presets, Import und Export verwenden denselben gespeicherten Formularwert `vocalClarityMode`.

## Live Guidance und sichere Schnellaktion

- Eine Live-STYLE-Reihenfolge zeigt für jede Entscheidung, ob der Fünferblock tatsächlich auf Position 1–5 steht.
- Die Vorschau unterscheidet Aktiv, Hinweis, Blockiert, Erzwungen, Instrumental und Aus.
- `vocal_clarity_guidance.js` bildet die vorhandene Engine-Entscheidung in ein reines, DOM-unabhängiges Präsentationsmodell ab.
- „Automatik verwenden“ ist nur dann aktiv, wenn der aktuelle Modus `off` oder `force` ist.
- Die Aktion schreibt ausschließlich `smart` in den vorhandenen kanonischen Modus. STYLE und Lyrics werden nicht direkt verändert.

## Verständliche Begründung

Die Karte erklärt die fünf zusammengehörenden Anweisungen:

1. `Broadway musical clarity` fordert deutliche Musical-Aussprache, aber kein Broadway-Genre.
2. `story-first enunciation` und `hard consonants` fördern verständliche Wörter und klare Konsonanten.
3. `dry forward lead vocal` und `close mic` halten die Hauptstimme trocken, präsent und nah.

Der Block steht am Anfang des globalen STYLE, weil frühe Anweisungen dort als Priorität wirken sollen. Genre, Instrumentierung und Produktion folgen danach. Das ist eine Prompt-Priorisierung und keine Garantie für ein bestimmtes Audioergebnis.

## Tour v4

- Die Tour besitzt elf stabile Schritt-IDs.
- Der neue Schritt `vocal-clarity` folgt direkt auf die Einführung in den STYLE-Workspace.
- Beim Öffnen aktiviert die Tour automatisch den Vocals-Reiter des Style Builders.
- Zwei Spotlights zeigen die Begründung und den echten Einstellbereich.
- Der Text erklärt Ein, Aus, Automatisch und Erzwingen in einfacher Sprache.
- Der Text erklärt zusätzlich die Live-Position 1–5 und die sichere Automatik-Aktion.
- „In der Tour zeigen“ startet die Tour direkt bei der semantischen Schritt-ID `vocal-clarity`.
- Die State Machine validiert den gewünschten Schrittindex und führt weiterhin alle Navigationseffekte zentral aus.
- Die Flow-Revision `first-start-v4` zeigt die Ergänzung Nutzern mit abgeschlossener v3-Tour genau einmal.

## Lokalisierung

Alle neuen statischen und dynamischen Oberflächentexte sind in den 14 aktivierten Sprachen vorhanden:

`en`, `de`, `fr`, `es`, `it`, `pt`, `pt-BR`, `nl`, `pl`, `tr`, `ru`, `ja`, `ko`, `zh-CN`

Die fachlichen Suno-Begriffe und die STYLE-Ausgabe bleiben absichtlich in kanonischem Englisch.

Auch alle neun dynamischen Konfliktgründe – etwa starker Vocal-Reverb, verwaschene Vocal-Ästhetik oder zu dichte Lyrics – werden semantisch aus ihrem Issue-Code in der aktiven Sprache dargestellt. Ein englischer UI-Fallback bleibt nur für unbekannte zukünftige Codes bestehen.

## Unveränderte Grenzen

- Automatik prüft weiterhin Genre, Vocal-Raum, Instrumental-Modus und Lyrics-Dichte.
- Erzwingen bleibt eine bewusste Nutzerentscheidung trotz erkannter Konflikte.
- Lyrics werden nicht gekürzt oder umgeschrieben.
- Pipe-Stacks bleiben ausschließlich für Abschnittsanweisungen zuständig.
- Der Vocal-Clarity-Block gehört ausschließlich in den globalen STYLE.

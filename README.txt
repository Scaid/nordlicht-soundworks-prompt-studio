Nordlicht Soundworks Prompt Studio – Version 7.5.4 – Workspace Welcome Tour

Nordlicht Soundworks Prompt Studio – Stable Rebuild

Diese Ausgabe wurde vollständig neu aufgebaut.

Behoben:
- Beide Smart-Randomizer-Buttons verwenden exakt dieselbe Funktion.
- STYLE kopieren und EXCLUDE kopieren funktionieren auch bei lokaler file://-Nutzung.
- Presets speichern, laden, umbenennen, duplizieren, favorisieren und löschen.
- Presets sind als eigener Menüpunkt links verfügbar und werden in der Mitte verwaltet.
- Import und Export funktionieren über JSON.
- Alte, übereinandergelegte Patches wurden nicht übernommen.

Start:
ZIP entpacken und STARTEN.bat oder index.html öffnen.


VERSION 7.5.4 – WORKSPACE WELCOME TOUR:
- Begrüßungstour vollständig auf die tatsächliche Workspace-Struktur ausgerichtet
- CREATE, ANALYZE, KNOWLEDGE und PROJECT werden jeweils einmal kompakt vorgestellt
- eigener Lyrics-Workspace-Schritt mit Fokus auf MetaTag-Bibliothek und Lyrics Editor
- erklärt beide Einfügewege: MetaTags per Drag & Drop ziehen oder mit ＋ anklicken
- stabile Schritt-IDs statt positionsabhängiger Übersetzungsarrays
- generische Primär-/Sekundär-Spotlights funktionieren auch innerhalb eines Workspaces
- Abschlussliste wird automatisch aus derselben Tour-Definition erzeugt
- alle 14 First-Start-Sprachen enthalten die neue Tour vollständig
- bewusste Flow-Revision v2: Nutzer von 7.5.3 sehen die neue Einführung genau einmal


VERSION 7.5.3 – FIRST-START STATE MACHINE:
- kompletter Neuaufbau des First-Start-Systems als deterministische State Machine
- getrennte Module für Zustandslogik, Persistenz, DOM-Ansicht und Steuerung
- versioniertes Storage-Schema mit sauberer Migration alter 7.5.x-Daten
- Release-Version und Onboarding-Revision sind voneinander entkoppelt
- Auswahl kann dauerhaft gespeichert oder nur für die aktuelle Sitzung verwendet werden
- robuste Tour-, Reload-, Hilfe-, Reset-, Sprach- und Moduswechsel-Logik
- Architektur- und Testdokumentation im Paket enthalten


CLEAN EDITION:
- projektspezifische Schnell-Presets entfernt
- keine Astravia-, Viking- oder Cyber-Königin-Schaltflächen
- eigener lokaler Speicherbereich, damit persönliche Presets nicht übernommen werden
- alle Builder-, Randomizer-, Kopier- und Preset-Verwaltungsfunktionen bleiben enthalten


ENERGY- & DYNAMICS-ÜBERSETZUNG:
- Zahlenwerte wie „82/100 energy“ werden nicht mehr in den STYLE geschrieben.
- Die Regler erzeugen automatisch sprachliche, Suno-freundliche Tags.
- Energie-Tags werden zusätzlich an Genre, Subgenre, Story-Welt und Songtyp angepasst.
- Unter den Reglern wird live angezeigt, welche Tags tatsächlich übernommen werden.


SUNO METATAG BUILDER:
- neuer eigener Bereich in der linken Navigation
- Struktur-, Music-, Voice-, Style-, Ad-lib- und Choir-Metatags
- automatische Vorschläge passend zum aktuellen STYLE
- separate METATAGS-Ausgabe mit Kopierfunktion
- eigene Metatags können zeilenweise ergänzt werden
- alle Anweisungen werden in eckigen Klammern formatiert
- Metatag-Auswahl wird in Presets und Backups gespeichert


NORDISCHE SPRACHEN:
- Danish lyrics
- Old Danish (Viking Age) lyrics
- Norwegian lyrics
- Swedish lyrics
- Finnish lyrics


BENANNTE SÄNGER & DUETTSTEUERUNG:
- zwei Sänger können mit konkreten Namen versehen werden
- Stimme und Geschlecht werden pro Sänger gewählt
- gemeinsame Parts und Duett-Modus sind einstellbar
- Header-Tags werden automatisch erzeugt
- Beispiel: [Duet – Niclas (male) & Kristina (female)]
- Beispiel: [Male vocals: Niclas, Female vocals: Kristina, Both: together]
- Abschnitts-Tags [Niclas], [Kristina] und [Both] werden in die METATAGS-Ausgabe eingebaut


OFFLINE SMART ASSISTANT:
- neuer eigener Bereich links
- analysiert freie Songbeschreibungen komplett offline
- erkennt Genres, Storywelt, Stimmung, Vocals, Instrumente, Energie, Produktion und MetaTags
- drei Modi: kreativ, ausgewogen und präzise
- wahlweise kompletter Builder, nur Instrumente, nur Vocals oder nur MetaTags
- zeigt Vorschläge vor dem Übernehmen
- Übernahme kann pro Bereich gesteuert werden
- kein Internet, keine API und kein Schlüssel erforderlich


PHASE 1 – PROFESSIONELLER AUFTRITT:
- Versionsnummer 1.0.0
- neues Logo im Header und in der Sidebar
- eigenes Browser-Favicon
- animierter Ladebildschirm
- integriertes Changelog-Fenster
- Social- und Suchmaschinen-Metadaten
- separate CHANGELOG.md


VERSION 1.1.0: Instrumental Mode, None-Optionen und Randomizer-Unterstützung.


VERSION 1.2.0 – INTERNATIONAL EDITION: English default, browser detection, 24 language selector, saved preference, RTL support and separate export-language setting.


VERSION 1.2.1 – FULL LIBRARY LOCALIZATION:
- library display labels now follow the selected interface language
- genre, vocal, instrument, story, emotion, scene, atmosphere, energy, production and MetaTag libraries are included
- internal values and Suno exports remain English
- presets work across all interface languages
- proper instrument names and internationally established genres stay unchanged when appropriate


VERSION 1.3.0 – COMPLETE I18N ROUTING:
- all visible static UI text is routed through the language system
- English mode contains no German UI leftovers
- unsupported individual translations fall back to English, never German
- placeholders, modal content, loading screen, score panel and help text are included
- library labels remain localized while internal Suno values stay English


VERSION 1.3.1 – I18N BUGFIX:
- fixes disappearing select fields and controls
- translations now replace only label text, never nested form elements
- all builder functions remain usable after language changes


VERSION 1.3.2: language selector fix, complete Spanish UI, dynamic label localization.


VERSION 1.3.3 – ALL LANGUAGES COMPLETE:
- all 24 existing languages are enabled as complete
- no Beta labels
- selected language remains visible
- complete UI dictionaries are generated for every language
- Suno export values remain canonical English


VERSION 1.4.0 – METATAG COMPOSER:
- Classic, Compact and AI Optimized output formats
- section-aware MetaTag assignment
- duplicate-tag suppression
- compact one-line Suno formatting
- compatible with Named Singers, Instrumental Mode and custom tags


VERSION 1.9.0 – PHASE 1: MUSIC INTELLIGENCE
- Style-Kompatibilitätsdatenbank für alle Genre-Familien
- Intelligente Zweitgenre-, Songtyp- und BPM-Vorschläge
- Stilbasierte Instrumentenempfehlungen mit Passungswert
- Compatibility Score nutzt Genre-Beziehungen und Instrumenten-Passung
- Alle Vorschläge funktionieren vollständig offline


LYRICS WORKSPACE – PHASE 1
--------------------------
The new Lyrics Workspace includes a large editor, line numbers, local autosave, Undo/Redo, Find & Replace, automatic section detection, live analysis, syntax preview and a dedicated Lyrics output tab. Lyrics stay stored locally in the browser and are kept separate from Style Builder presets.


LYRICS WORKSPACE PHASE 2
- MetaTag library with search and category filters
- Drag & Drop MetaTags into the Lyrics editor
- Smart Suggestions based on the current section
- Custom MetaTags with automatic square brackets
- Drag & Drop reordering of complete song sections

Phase 3 adds synchronized structure analysis, a Lyrics Quality Score and the MetaTag Doctor with safe optimization.


VERSION 2.3.1 – AI COMPOSER GENRE FUSION:
- multi-genre recognition using the complete genre library and explicit aliases
- Viking Rap is recognized as Hip-Hop / Rap plus Viking / Nordic Folk
- expanded creative directions, focus choices and song structures
- adjustable genre blend slider
- genre, detail and overall confidence values
- explanations for recognized genres and BPM decisions


VERSION 2.3.2 – SUNO-FRIENDLY GENRE BLEND PHRASING:
- internal percentage slider retained
- numeric `genre blend 70/30` removed from exported STYLE
- blend converted to natural English phrasing for Suno
- live phrasing preview in AI Composer and Style Builder
- examples: subtle influence, genre-driven fusion, equal fusion


VERSION 2.4.0 – PROMPT OPTIMIZER:
- Dedicated offline STYLE analysis and optimization workspace
- Quality scores for clarity, focus, completeness, compatibility and concision
- Duplicate, overload and contradiction detection
- Safe, Balanced and Creative optimization modes
- Suno-friendly cleanup and Custom Style transfer

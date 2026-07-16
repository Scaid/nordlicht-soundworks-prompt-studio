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


VERSION 1.5.0 – HYBRID COMPLETE TRANSLATION:
- English, German and Spanish are available offline
- all other configured languages translate the complete visible UI online
- Suno output and user text are excluded from translation
- requires an internet connection for non-local languages

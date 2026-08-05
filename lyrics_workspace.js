(() => {
  'use strict';

  const STORAGE_KEY = 'nswLyricsWorkspace.v3.pipeStacks';
  const LEGACY_STORAGE_KEYS = ['nswLyricsWorkspace.v2.phase3', 'nswLyricsWorkspace.v2.phase2', 'nswLyricsWorkspace.v2.phase1'];
  const FAVORITES_KEY = 'nswLyricsMetaTagFavorites.v1';
  const OPEN_GROUPS_KEY = 'nswLyricsMetaTagOpenGroups.v1';
  const HISTORY_LIMIT = 120;
  const StackEngine = window.NSWMetaTagStackEngine;

  const L10N = {
    en: {
      nav_title:'Lyrics Workspace', nav_subtitle:'Write, structure and prepare lyrics', workspace_title:'Lyrics Workspace', workspace_subtitle:'Write your lyrics, organize the song structure and prepare the final Suno lyrics output with section-based Pipe-Stacks.',
      structure_title:'Song Structure', structure_subtitle:'Detected automatically from Pipe-Stack sections', insert_template:'Insert template', normalize_structure:'Sync & normalize structure', clear_lyrics:'Clear lyrics', live_analysis:'Live Analysis', undo:'Undo', redo:'Redo', find:'Find', copy_lyrics:'Copy lyrics', export_txt:'Export .txt', syntax_preview:'Syntax Preview', library_title:'MetaTag Library', library_subtitle:'Drag an element into the active Pipe-Stack or click +', current_section:'Current section', smart_suggestions:'Smart Suggestions', all_categories:'All categories', favorites_only:'Only favorites', available:'available', used:'used', doctor_title:'MetaTag Doctor', doctor_description:'Checks Pipe-Stack priority, element count, conflicts, STYLE compatibility and bracket syntax.', tags:'Elements', issues:'Issues', duplicates:'Duplicates', conflicts:'Conflicts', custom_tag:'Custom Stack Element', brackets_added:'The element is added to the active Pipe-Stack.',
      find_text:'Find text…', replace_with:'Replace with…', editor_placeholder:'Paste or write your lyrics here…\n\nUse Pipe-Stacks such as [Chorus | Soulful | Female Vocal | Piano | Building Intensity | Deep Reverb | Analog Production].', search_tags:'Search MetaTags…', custom_tag_placeholder:'e.g. cold and intimate',
      general:'General', context_general:'Place the cursor inside a song section for focused suggestions.', context_section:'Suggestions are optimized for {section}.', no_tags:'No MetaTags found.', insert_tag:'Insert stack element', favorite_add:'Add to favorites', favorite_remove:'Remove from favorites', healthy:'Healthy', review:'Review', attention:'Needs attention', no_issues:'No Pipe-Stack, conflict or syntax problems found.', analyze:'Analyze', optimize:'Optimize Pipe-Stacks', ready:'Ready', autosave_ready:'Autosave ready', autosave_saving:'Saving…', autosave_saved:'Saved locally', autosave_failed:'Save failed', autosave_restored:'Restored from autosave'
    },
    de: {
      nav_title:'Lyrics Workspace', nav_subtitle:'Lyrics schreiben, strukturieren und vorbereiten', workspace_title:'Lyrics Workspace', workspace_subtitle:'Schreibe deine Lyrics, organisiere die Songstruktur und bereite die fertige Suno-Ausgabe mit abschnittsbezogenen Pipe-Stacks vor.',
      structure_title:'Songstruktur', structure_subtitle:'Wird automatisch anhand der Pipe-Stack-Abschnitte erkannt', insert_template:'Vorlage einfügen', normalize_structure:'Struktur synchronisieren und vereinheitlichen', clear_lyrics:'Lyrics löschen', live_analysis:'Live-Analyse', undo:'Rückgängig', redo:'Wiederholen', find:'Suchen', copy_lyrics:'Lyrics kopieren', export_txt:'.txt exportieren', syntax_preview:'Syntax-Vorschau', library_title:'MetaTag-Bibliothek', library_subtitle:'Ziehe ein Element in den aktiven Pipe-Stack oder klicke auf +', current_section:'Aktueller Abschnitt', smart_suggestions:'Intelligente Vorschläge', all_categories:'Alle Kategorien', favorites_only:'Nur Favoriten', available:'verfügbar', used:'verwendet', doctor_title:'MetaTag Doctor', doctor_description:'Prüft Pipe-Stack-Priorität, Elementanzahl, Konflikte, STYLE-Kompatibilität und Klammer-Syntax.', tags:'Elemente', issues:'Probleme', duplicates:'Duplikate', conflicts:'Konflikte', custom_tag:'Eigenes Stack-Element', brackets_added:'Das Element wird dem aktiven Pipe-Stack hinzugefügt.',
      find_text:'Text suchen…', replace_with:'Ersetzen durch…', editor_placeholder:'Füge deine Lyrics ein oder schreibe sie hier…\n\nNutze Pipe-Stacks wie [Chorus | Soulful | Female Vocal | Piano | Building Intensity | Deep Reverb | Analog Production].', search_tags:'MetaTags suchen…', custom_tag_placeholder:'z. B. kalt und intim',
      general:'Allgemein', context_general:'Setze den Cursor in einen Songabschnitt, um passende Vorschläge zu erhalten.', context_section:'Die Vorschläge sind für {section} optimiert.', no_tags:'Keine MetaTags gefunden.', insert_tag:'Stack-Element einfügen', favorite_add:'Zu Favoriten hinzufügen', favorite_remove:'Aus Favoriten entfernen', healthy:'Gesund', review:'Prüfen', attention:'Handlungsbedarf', no_issues:'Keine Pipe-Stack-, Konflikt- oder Syntaxprobleme gefunden.', analyze:'Analysieren', optimize:'Pipe-Stacks optimieren', ready:'Bereit', autosave_ready:'Autosave bereit', autosave_saving:'Wird gespeichert…', autosave_saved:'Lokal gespeichert', autosave_failed:'Speichern fehlgeschlagen', autosave_restored:'Aus Autosave wiederhergestellt'
    }
  };

  const CATEGORY_LABELS = {
    en:{Sections:'Sections',Vocals:'Vocals',Choir:'Choir',Style:'Style & Emotion',Dynamics:'Dynamics',Music:'Music & Arrangement',Instrumental:'Instrumental & Solos',Production:'Production & Mix',Adlibs:'Ad-libs',Transitions:'Transitions',RhythmTempo:'Rhythm & Tempo',HarmonyMelody:'Harmony & Melody',SoundFX:'Sound Effects'},
    de:{Sections:'Songabschnitte',Vocals:'Stimmen',Choir:'Chor',Style:'Stil & Emotion',Dynamics:'Dynamik',Music:'Musik & Arrangement',Instrumental:'Instrumental & Soli',Production:'Produktion & Mix',Adlibs:'Ad-libs',Transitions:'Übergänge',RhythmTempo:'Rhythmus & Tempo',HarmonyMelody:'Harmonie & Melodie',SoundFX:'Soundeffekte'},
    fr:{Sections:'Sections',Vocals:'Voix',Choir:'Chœur',Style:'Style et émotion',Dynamics:'Dynamique',Music:'Musique et arrangement',Instrumental:'Instrumental et solos',Production:'Production et mixage',Adlibs:'Ad-libs',Transitions:'Transitions',RhythmTempo:'Rythme et tempo',HarmonyMelody:'Harmonie et mélodie',SoundFX:'Effets sonores'},
    es:{Sections:'Secciones',Vocals:'Voces',Choir:'Coro',Style:'Estilo y emoción',Dynamics:'Dinámica',Music:'Música y arreglo',Instrumental:'Instrumental y solos',Production:'Producción y mezcla',Adlibs:'Ad-libs',Transitions:'Transiciones',RhythmTempo:'Ritmo y tempo',HarmonyMelody:'Armonía y melodía',SoundFX:'Efectos de sonido'},
    it:{Sections:'Sezioni',Vocals:'Voci',Choir:'Coro',Style:'Stile ed emozione',Dynamics:'Dinamica',Music:'Musica e arrangiamento',Instrumental:'Strumentale e assoli',Production:'Produzione e mix',Adlibs:'Ad-libs',Transitions:'Transizioni',RhythmTempo:'Ritmo e tempo',HarmonyMelody:'Armonia e melodia',SoundFX:'Effetti sonori'},
    pt:{Sections:'Seções',Vocals:'Vocais',Choir:'Coro',Style:'Estilo e emoção',Dynamics:'Dinâmica',Music:'Música e arranjo',Instrumental:'Instrumental e solos',Production:'Produção e mixagem',Adlibs:'Ad-libs',Transitions:'Transições',RhythmTempo:'Ritmo e tempo',HarmonyMelody:'Harmonia e melodia',SoundFX:'Efeitos sonoros'},
    'pt-BR':{Sections:'Seções',Vocals:'Vocais',Choir:'Coro',Style:'Estilo e emoção',Dynamics:'Dinâmica',Music:'Música e arranjo',Instrumental:'Instrumental e solos',Production:'Produção e mixagem',Adlibs:'Ad-libs',Transitions:'Transições',RhythmTempo:'Ritmo e andamento',HarmonyMelody:'Harmonia e melodia',SoundFX:'Efeitos sonoros'},
    nl:{Sections:'Secties',Vocals:'Vocalen',Choir:'Koor',Style:'Stijl en emotie',Dynamics:'Dynamiek',Music:'Muziek en arrangement',Instrumental:'Instrumentaal en solo’s',Production:'Productie en mix',Adlibs:'Ad-libs',Transitions:'Overgangen',RhythmTempo:'Ritme en tempo',HarmonyMelody:'Harmonie en melodie',SoundFX:'Geluidseffecten'},
    pl:{Sections:'Sekcje',Vocals:'Wokale',Choir:'Chór',Style:'Styl i emocje',Dynamics:'Dynamika',Music:'Muzyka i aranżacja',Instrumental:'Instrumentalne i sola',Production:'Produkcja i miks',Adlibs:'Ad-libs',Transitions:'Przejścia',RhythmTempo:'Rytm i tempo',HarmonyMelody:'Harmonia i melodia',SoundFX:'Efekty dźwiękowe'},
    tr:{Sections:'Bölümler',Vocals:'Vokaller',Choir:'Koro',Style:'Stil ve duygu',Dynamics:'Dinamik',Music:'Müzik ve düzenleme',Instrumental:'Enstrümantal ve sololar',Production:'Prodüksiyon ve miks',Adlibs:'Ad-libs',Transitions:'Geçişler',RhythmTempo:'Ritim ve tempo',HarmonyMelody:'Armoni ve melodi',SoundFX:'Ses efektleri'},
    ru:{Sections:'Разделы',Vocals:'Вокал',Choir:'Хор',Style:'Стиль и эмоции',Dynamics:'Динамика',Music:'Музыка и аранжировка',Instrumental:'Инструментал и соло',Production:'Продакшн и микс',Adlibs:'Адлибы',Transitions:'Переходы',RhythmTempo:'Ритм и темп',HarmonyMelody:'Гармония и мелодия',SoundFX:'Звуковые эффекты'},
    ja:{Sections:'セクション',Vocals:'ボーカル',Choir:'コーラス',Style:'スタイルと感情',Dynamics:'ダイナミクス',Music:'音楽とアレンジ',Instrumental:'インストとソロ',Production:'制作とミックス',Adlibs:'アドリブ',Transitions:'トランジション',RhythmTempo:'リズムとテンポ',HarmonyMelody:'ハーモニーとメロディ',SoundFX:'効果音'},
    ko:{Sections:'섹션',Vocals:'보컬',Choir:'합창',Style:'스타일과 감정',Dynamics:'다이내믹',Music:'음악과 편곡',Instrumental:'연주와 솔로',Production:'프로덕션과 믹스',Adlibs:'애드리브',Transitions:'전환',RhythmTempo:'리듬과 템포',HarmonyMelody:'화성과 멜로디',SoundFX:'사운드 효과'},
    'zh-CN':{Sections:'段落',Vocals:'人声',Choir:'合唱',Style:'风格与情绪',Dynamics:'动态',Music:'音乐与编曲',Instrumental:'器乐与独奏',Production:'制作与混音',Adlibs:'即兴唱段',Transitions:'过渡',RhythmTempo:'节奏与速度',HarmonyMelody:'和声与旋律',SoundFX:'音效'}
  };
  const EXTRA_L10N = {
    fr:{library_title:'Bibliothèque MetaTag',library_subtitle:'Faites glisser un tag dans les paroles ou cliquez sur +',all_categories:'Toutes les catégories',favorites_only:'Favoris uniquement',available:'disponibles',used:'utilisés',search_tags:'Rechercher des MetaTags…',no_tags:'Aucun MetaTag trouvé.',insert_tag:'Insérer le MetaTag',favorite_add:'Ajouter aux favoris',favorite_remove:'Retirer des favoris',core:'Fiable',advanced:'Avancé',experimental:'Expérimental'},
    es:{library_title:'Biblioteca de MetaTags',library_subtitle:'Arrastra una etiqueta a la letra o haz clic en +',all_categories:'Todas las categorías',favorites_only:'Solo favoritos',available:'disponibles',used:'usados',search_tags:'Buscar MetaTags…',no_tags:'No se encontraron MetaTags.',insert_tag:'Insertar MetaTag',favorite_add:'Añadir a favoritos',favorite_remove:'Quitar de favoritos',core:'Fiable',advanced:'Avanzado',experimental:'Experimental'},
    it:{library_title:'Libreria MetaTag',library_subtitle:'Trascina un tag nel testo oppure fai clic su +',all_categories:'Tutte le categorie',favorites_only:'Solo preferiti',available:'disponibili',used:'usati',search_tags:'Cerca MetaTag…',no_tags:'Nessun MetaTag trovato.',insert_tag:'Inserisci MetaTag',favorite_add:'Aggiungi ai preferiti',favorite_remove:'Rimuovi dai preferiti',core:'Affidabile',advanced:'Avanzato',experimental:'Sperimentale'},
    pt:{library_title:'Biblioteca de MetaTags',library_subtitle:'Arraste uma tag para a letra ou clique em +',all_categories:'Todas as categorias',favorites_only:'Apenas favoritos',available:'disponíveis',used:'usados',search_tags:'Pesquisar MetaTags…',no_tags:'Nenhuma MetaTag encontrada.',insert_tag:'Inserir MetaTag',favorite_add:'Adicionar aos favoritos',favorite_remove:'Remover dos favoritos',core:'Confiável',advanced:'Avançado',experimental:'Experimental'},
    'pt-BR':{library_title:'Biblioteca de MetaTags',library_subtitle:'Arraste uma tag para a letra ou clique em +',all_categories:'Todas as categorias',favorites_only:'Somente favoritos',available:'disponíveis',used:'usadas',search_tags:'Pesquisar MetaTags…',no_tags:'Nenhuma MetaTag encontrada.',insert_tag:'Inserir MetaTag',favorite_add:'Adicionar aos favoritos',favorite_remove:'Remover dos favoritos',core:'Confiável',advanced:'Avançado',experimental:'Experimental'},
    nl:{library_title:'MetaTag-bibliotheek',library_subtitle:'Sleep een tag naar de songtekst of klik op +',all_categories:'Alle categorieën',favorites_only:'Alleen favorieten',available:'beschikbaar',used:'gebruikt',search_tags:'MetaTags zoeken…',no_tags:'Geen MetaTags gevonden.',insert_tag:'MetaTag invoegen',favorite_add:'Toevoegen aan favorieten',favorite_remove:'Verwijderen uit favorieten',core:'Betrouwbaar',advanced:'Geavanceerd',experimental:'Experimenteel'},
    pl:{library_title:'Biblioteka MetaTagów',library_subtitle:'Przeciągnij tag do tekstu lub kliknij +',all_categories:'Wszystkie kategorie',favorites_only:'Tylko ulubione',available:'dostępne',used:'użyte',search_tags:'Szukaj MetaTagów…',no_tags:'Nie znaleziono MetaTagów.',insert_tag:'Wstaw MetaTag',favorite_add:'Dodaj do ulubionych',favorite_remove:'Usuń z ulubionych',core:'Niezawodne',advanced:'Zaawansowane',experimental:'Eksperymentalne'},
    tr:{library_title:'MetaTag Kütüphanesi',library_subtitle:'Bir etiketi sözlere sürükleyin veya + düğmesine tıklayın',all_categories:'Tüm kategoriler',favorites_only:'Yalnızca favoriler',available:'mevcut',used:'kullanılan',search_tags:'MetaTag ara…',no_tags:'MetaTag bulunamadı.',insert_tag:'MetaTag ekle',favorite_add:'Favorilere ekle',favorite_remove:'Favorilerden kaldır',core:'Güvenilir',advanced:'Gelişmiş',experimental:'Deneysel'},
    ru:{library_title:'Библиотека MetaTag',library_subtitle:'Перетащите тег в текст или нажмите +',all_categories:'Все категории',favorites_only:'Только избранное',available:'доступно',used:'использовано',search_tags:'Поиск MetaTag…',no_tags:'MetaTag не найдены.',insert_tag:'Вставить MetaTag',favorite_add:'Добавить в избранное',favorite_remove:'Удалить из избранного',core:'Надёжный',advanced:'Расширенный',experimental:'Экспериментальный'},
    ja:{library_title:'MetaTagライブラリ',library_subtitle:'タグを歌詞へドラッグするか＋をクリック',all_categories:'すべてのカテゴリ',favorites_only:'お気に入りのみ',available:'利用可能',used:'使用済み',search_tags:'MetaTagを検索…',no_tags:'MetaTagが見つかりません。',insert_tag:'MetaTagを挿入',favorite_add:'お気に入りに追加',favorite_remove:'お気に入りから削除',core:'高信頼',advanced:'上級',experimental:'実験的'},
    ko:{library_title:'MetaTag 라이브러리',library_subtitle:'태그를 가사로 드래그하거나 +를 클릭하세요',all_categories:'모든 카테고리',favorites_only:'즐겨찾기만',available:'사용 가능',used:'사용됨',search_tags:'MetaTag 검색…',no_tags:'MetaTag를 찾을 수 없습니다.',insert_tag:'MetaTag 삽입',favorite_add:'즐겨찾기에 추가',favorite_remove:'즐겨찾기에서 제거',core:'신뢰도 높음',advanced:'고급',experimental:'실험적'},
    'zh-CN':{library_title:'MetaTag 库',library_subtitle:'将标签拖入歌词或点击 +',all_categories:'全部类别',favorites_only:'仅收藏',available:'可用',used:'已使用',search_tags:'搜索 MetaTag…',no_tags:'未找到 MetaTag。',insert_tag:'插入 MetaTag',favorite_add:'添加到收藏',favorite_remove:'从收藏移除',core:'可靠',advanced:'高级',experimental:'实验性'}
  };
  Object.entries(EXTRA_L10N).forEach(([lang,values]) => { L10N[lang] = Object.assign({}, L10N.en, values); });
  Object.assign(L10N.en,{core:'Reliable',advanced:'Advanced',experimental:'Experimental'});
  Object.assign(L10N.de,{core:'Zuverlässig',advanced:'Erweitert',experimental:'Experimentell'});
  function categoryLabel(key){ const lang=lyricsLanguage(); return (CATEGORY_LABELS[lang]||CATEGORY_LABELS.en)[key]||key; }

  function lyricsLanguage(){ return typeof currentUiLanguage === 'string' ? currentUiLanguage : (document.documentElement.lang || 'en'); }
  function lt(key, vars={}) { const lang=lyricsLanguage(); let value=(L10N[lang]||L10N.en)[key]||L10N.en[key]||key; Object.entries(vars).forEach(([k,v])=>value=value.replaceAll(`{${k}}`,v)); return value; }
  function localizeAnalysisMessage(message) {
    if (lyricsLanguage() !== 'de') return message;
    const exact = {
      'Malformed square-bracket tag':'Fehlerhaftes MetaTag mit eckigen Klammern',
      'Very long echo or ad-lib in round brackets':'Sehr langes Echo oder Ad-lib in runden Klammern',
      'No recognizable song sections found':'Keine erkennbaren Songabschnitte gefunden',
      'No Verse section found':'Kein Verse-Abschnitt gefunden',
      'No Chorus section found':'Kein Chorus-Abschnitt gefunden',
      'Duplicate Verse numbers detected':'Doppelte Verse-Nummern erkannt',
      'Verse numbering is not sequential':'Verse-Nummerierung ist nicht fortlaufend',
      'Lyrics may be too long for one generation':'Die Lyrics sind möglicherweise zu lang für eine Generierung',
      'Lyrics are getting long':'Die Lyrics werden sehr lang',
      'MetaTags and structure look clean':'MetaTags und Struktur sehen sauber aus',
      'No song sections detected':'Keine Songabschnitte erkannt'
    };
    if (exact[message]) return exact[message];
    return message
      .replace(/^Duplicate MetaTag in (.+)$/,'Doppeltes MetaTag in $1')
      .replace(/^(.+) may be overloaded with (\d+) MetaTags$/,'$1 könnte mit $2 MetaTags überladen sein')
      .replace(/^Instrumental and vocal directions conflict in (.+)$/,'Instrumental- und Vocal-Anweisungen stehen in $1 im Konflikt')
      .replace(/^(.+) is empty$/,'$1 ist leer')
      .replace(/^(\d+) song sections synchronized$/,'$1 Songabschnitte synchronisiert');
  }

  const SECTION_RE = /^\s*\[\s*(intro|ambient\s+intro|opening|cold\s+open|verse(?:\s+\d+)?|pre[-\s]?chorus|chorus|ensemble\s+chorus|refrain|hook|final\s+hook|post[-\s]?chorus|bridge|middle\s+eight|interlude|break|dialogue\s+break|rap\s+break|build(?:-?up)?|pre[-\s]?drop|drop|second\s+drop|final\s+drop|breakdown|heavy\s+breakdown|half[-\s]?time\s+breakdown|instrumental(?:\s+(?:break|verse|chorus|build|drop|finale))?|drum\s+break|bass\s+break|dance\s+break|solo|guitar\s+solo|climax|finale|final\s+chorus|coda|outro|end|fade\s+out|false\s+ending|movement\s+(?:[ivx]+|\d+))[^\]]*\]\s*$/i;

  const $ = (id) => document.getElementById(id);
  const state = {
    history: [''],
    historyIndex: 0,
    saveTimer: null,
    historyTimer: null,
    searchMatches: [],
    searchIndex: -1,
    initialized: false,
    currentSection: 'general',
    draggedSectionIndex: null,
    draggedPipeIndex: null,
    activeStackLineIndex: null,
    restoredFromLegacy: false,
    restoredMigration: null,
    favoriteTags: new Set(),
    openGroups: new Set(['Sections'])
  };

  const escapeHtml = (value) => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

  function loadLibraryPreferences() {
    try { state.favoriteTags = new Set(JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]')); } catch { state.favoriteTags = new Set(); }
    try { const saved = JSON.parse(localStorage.getItem(OPEN_GROUPS_KEY) || '[]'); if (Array.isArray(saved) && saved.length) state.openGroups = new Set(saved); } catch { state.openGroups = new Set(['Sections']); }
  }
  function saveLibraryPreferences() {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...state.favoriteTags]));
    localStorage.setItem(OPEN_GROUPS_KEY, JSON.stringify([...state.openGroups]));
  }
  function highlightMatch(value, query) {
    const safe = escapeHtml(value);
    if (!query) return safe;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return safe.replace(new RegExp(`(${escaped})`, 'ig'), '<mark>$1</mark>');
  }
  function allLibraryTags() {
    const data = window.NSW_LYRICS_METATAGS;
    return data ? Object.values(data.categories).flat() : [];
  }
  function usedLibraryTagSet() {
    const known = new Map(allLibraryTags().map(tag => {
      const value=StackEngine?.normalizeDirective(tag)?.value||normalizeTag(tag);
      return [value.toLowerCase(),tag];
    }));
    const used = new Set();
    if(StackEngine){
      StackEngine.parseLyrics(getText()).sections.forEach(section=>section.stack.directives.forEach(item=>{
        const key=item.value.toLowerCase();
        if(known.has(key))used.add(known.get(key));
      }));
    }else getText().split('\n').filter(isStandaloneTag).forEach(line => { const normalized=normalizeTag(line).toLowerCase(); if (known.has(normalized)) used.add(known.get(normalized)); });
    return used;
  }

  function toast(message) {
    if (typeof window.showToast === 'function') return window.showToast(message);
    const el = $('toast');
    if (!el) return;
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(el._lyricsTimer);
    el._lyricsTimer = setTimeout(() => el.classList.remove('show'), 1800);
  }

  function getText() {
    return $('lyricsEditor')?.value || '';
  }

  function setText(value, { history = true, focus = true } = {}) {
    const editor = $('lyricsEditor');
    if (!editor) return;
    editor.value = value;
    if (history) pushHistory(value);
    updateAll();
    scheduleSave();
    if (focus) editor.focus();
  }

  function updateLineNumbers() {
    const editor = $('lyricsEditor');
    const gutter = $('lyricsLineNumbers');
    if (!editor || !gutter) return;
    const count = Math.max(1, editor.value.split('\n').length);
    gutter.textContent = Array.from({ length: count }, (_, i) => i + 1).join('\n');
    gutter.scrollTop = editor.scrollTop;
  }

  function parseSections(text = getText()) {
    if(StackEngine)return StackEngine.parseLyrics(text).sections.map(section=>({
      label:`[${section.stack.section}]`,stackLine:section.sourceLine,stack:section.stack,line:section.line,index:section.index,start:section.start,end:section.end
    }));
    const lines = text.split('\n');
    const sections = [];
    lines.forEach((line, index) => {
      if (SECTION_RE.test(line)) {
        sections.push({ label: line.trim(), line: index + 1, index });
      }
    });
    return sections;
  }


  function isStandaloneTag(line) {
    return /^\s*\[[^\]\n]+\]\s*$/.test(line || '');
  }

  function sectionDetails(text = getText()) {
    const lines = text.split('\n');
    const sections = parseSections(text);
    return sections.map((section, index) => {
      const endLine = sections[index + 1]?.index ?? lines.length;
      const body = lines.slice(section.index + 1, endLine);
      const tags = body.filter(line => isStandaloneTag(line));
      const lyricLines = body.filter(line => line.trim() && !isStandaloneTag(line));
      const words = lyricLines.join(' ').trim() ? lyricLines.join(' ').trim().split(/\s+/).length : 0;
      const directiveCount=section.stack?.directives?.length??tags.length;
      return { ...section, endLine, body, tags, lyricLines, words, tagCount: directiveCount, elementCount:directiveCount+1 };
    });
  }

  function canonicalSectionLabel(label, verseNumber = null) {
    const parsedStack=StackEngine?.parseStack(label);
    const directives=parsedStack?.directives||[];
    const inputSection=parsedStack?.section||label;
    const raw = String(inputSection || '').replace(/^\s*\[|\]\s*$/g, '').trim().toLowerCase();
    let section;
    if (/^intro/.test(raw)) section='Intro';
    else if (/^verse/.test(raw)) section=`Verse ${verseNumber || Number(raw.match(/\d+/)?.[0]) || 1}`;
    else if (/^pre[-\s]?chorus/.test(raw)) section='Pre-Chorus';
    else if (/^post[-\s]?chorus/.test(raw)) section='Post-Chorus';
    else if (/^final\s+chorus/.test(raw)) section='Final Chorus';
    else if (/^chorus/.test(raw)) section='Chorus';
    else if (/^bridge/.test(raw)) section='Bridge';
    else if (/^breakdown/.test(raw)) section='Breakdown';
    else if (/^drop/.test(raw)) section='Drop';
    else if (/^instrumental\s+break/.test(raw)) section='Instrumental Break';
    else if (/^instrumental/.test(raw)) section='Instrumental';
    else if (/^solo/.test(raw)) section='Solo';
    else if (/^interlude/.test(raw)) section='Interlude';
    else if (/^outro/.test(raw)) section='Outro';
    else section=StackEngine?.canonicalSection(inputSection)||String(inputSection).replace(/^\[|\]$/g,'');
    return StackEngine?StackEngine.renderStack({section,directives}):normalizeTag(section);
  }

  function analyzeLyricsDetailed(text = getText()) {
    const lines = text.split('\n');
    const details = sectionDetails(text);
    const issues = [];
    const add = (severity, message, line = null, code = '') => issues.push({ severity, message, line, code });
    const stylePrompt = $('styleOutput')?.value || $('customStyle')?.value || '';
    const stackAnalysis = StackEngine
      ? StackEngine.analyzeLyrics(text, { stylePrompt, language: lyricsLanguage() })
      : { issues: [], elementCount: 0, conflictCount: 0, stacks: [] };

    stackAnalysis.issues.forEach(issue => add(issue.severity, issue.message, issue.line || null, issue.code));

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) return;
      if (!StackEngine && (trimmed.startsWith('[') || trimmed.endsWith(']')) && !isStandaloneTag(trimmed)) {
        add('error', 'Malformed square-bracket tag', index + 1, 'brackets');
      }
      if (/^\([^)]{81,}\)$/.test(trimmed)) add('warn', 'Very long echo or ad-lib in round brackets', index + 1, 'long-adlib');
    });

    if (!details.length && text.trim()) add('error', 'No recognizable song sections found', 1, 'no-sections');
    if (details.length && !details.some(s => /^\[Verse/i.test(s.label))) add('warn', 'No Verse section found', null, 'missing-verse');
    if (details.length && !details.some(s => /^\[(?:Final )?Chorus/i.test(s.label))) add('warn', 'No Chorus section found', null, 'missing-chorus');

    const verseNumbers = details.filter(s => /^\[Verse/i.test(s.label)).map(s => Number(s.label.match(/\d+/)?.[0])).filter(Boolean);
    if (new Set(verseNumbers).size !== verseNumbers.length) add('warn', 'Duplicate Verse numbers detected', null, 'verse-number');
    if (verseNumbers.length && verseNumbers.some((n, i) => n !== i + 1)) add('warn', 'Verse numbering is not sequential', null, 'verse-number');

    details.forEach(section => {
      if (!section.words && !section.tagCount && !/^\[(Intro|Outro|Drop|Breakdown|Instrumental|Solo)/i.test(section.label)) {
        add('warn', `${section.label} is empty`, section.line, 'empty-section');
      }
    });

    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    if (wordCount > 850) add('error', 'Lyrics may be too long for one generation', null, 'length');
    else if (wordCount > 650) add('warn', 'Lyrics are getting long', null, 'length');

    const errors = issues.filter(i => i.severity === 'error').length;
    const warnings = issues.filter(i => i.severity === 'warn').length;
    const score = Math.max(0, Math.min(100, 100 - errors * 14 - warnings * 5));
    return { issues, errors, warnings, score, tagCount: stackAnalysis.elementCount, details, wordCount, stackAnalysis };
  }

  function renderStructure() {
    const list = $('lyricsStructureList');
    if (!list) return;
    const sections = sectionDetails();
    const analysis = analyzeLyricsDetailed();
    const active = getSectionAtCursor();
    if (!sections.length) {
      list.innerHTML = '<div class="lyrics-empty-state">No sections detected yet.<br><small>Use tags like [Verse 1] or [Chorus].</small></div>';
      return;
    }
    list.innerHTML = sections.map((section, i) => {
      const warning = analysis.issues.some(issue => issue.line && issue.line >= section.line && issue.line <= section.endLine);
      const isActive = active.label === section.label && active.line === section.line;
      return `
      <button class="lyrics-structure-item${warning ? ' has-warning' : ''}${isActive ? ' active-section' : ''}" data-line="${section.line}" data-section-index="${i}" draggable="true" type="button">
        <span class="lyrics-structure-index">${String(i + 1).padStart(2, '0')}</span>
        <span><b>${escapeHtml(section.label)}</b><small class="lyrics-structure-meta"><em>${lyricsLanguage()==='de'?'Zeile':'Line'} ${section.line}</em><em>${section.words} ${lyricsLanguage()==='de'?'Wörter':'words'}</em><em>${section.elementCount} ${lyricsLanguage()==='de'?'Elemente':'elements'}</em></small></span>
      </button>`;
    }).join('');
    list.querySelectorAll('[data-line]').forEach((button) => {
      button.addEventListener('click', () => goToLine(Number(button.dataset.line)));
      button.addEventListener('dragstart', handleSectionDragStart);
      button.addEventListener('dragover', handleSectionDragOver);
      button.addEventListener('dragleave', () => button.classList.remove('drag-target'));
      button.addEventListener('drop', handleSectionDrop);
      button.addEventListener('dragend', clearSectionDragState);
    });
  }

  function goToLine(lineNumber) {
    const editor = $('lyricsEditor');
    if (!editor) return;
    const lines = editor.value.split('\n');
    const clamped = Math.max(1, Math.min(lineNumber, lines.length));
    const start = lines.slice(0, clamped - 1).join('\n').length + (clamped > 1 ? 1 : 0);
    const end = start + (lines[clamped - 1] || '').length;
    editor.focus();
    editor.setSelectionRange(start, end);
    const lineHeight = parseFloat(getComputedStyle(editor).lineHeight) || 23;
    editor.scrollTop = Math.max(0, (clamped - 3) * lineHeight);
    updateLineNumbers();
  }

  function updateStats() {
    const text = getText();
    const lineCount = Math.max(1, text.split('\n').length);
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sections = parseSections(text).length;
    const de = lyricsLanguage() === 'de';
    $('lyricsLineCount').textContent = `${lineCount} ${de ? (lineCount === 1 ? 'Zeile' : 'Zeilen') : (lineCount === 1 ? 'line' : 'lines')}`;
    $('lyricsWordCount').textContent = `${words} ${de ? (words === 1 ? 'Wort' : 'Wörter') : (words === 1 ? 'word' : 'words')}`;
    $('lyricsCharCount').textContent = `${text.length} ${de ? 'Zeichen' : 'characters'}`;
    $('lyricsSectionCount').textContent = `${sections} ${de ? (sections === 1 ? 'Abschnitt' : 'Abschnitte') : (sections === 1 ? 'section' : 'sections')}`;
  }

  function renderHighlightedPreview() {
    const preview = $('lyricsHighlightedPreview');
    if (!preview) return;
    const html = getText().split('\n').map((line) => {
      const safe = escapeHtml(line);
      if (/^\s*\[[^\]]+\]\s*$/.test(line)) {
        const stack=StackEngine?.parseStack(line);
        if (stack) {
          const parts=[stack.section,...stack.directives.map(item=>item.value)];
          return `<span class="syntax-pipe"><span class="pipe-section">[${escapeHtml(parts[0])}</span>${parts.slice(1).map(part=>` <span class="pipe-divider">|</span> ${escapeHtml(part)}`).join('')}]</span>`;
        }
        if (SECTION_RE.test(line)) return `<span class="syntax-section">${safe}</span>`;
        return `<span class="syntax-tag">${safe}</span>`;
      }
      if (/^\s*\([^)]*\)\s*$/.test(line)) return `<span class="syntax-adlib">${safe}</span>`;
      return safe || ' ';
    }).join('\n');
    preview.innerHTML = html;
  }

  function renderAnalysis() {
    const target = $('lyricsAnalysisItems');
    if (!target) return;
    const result = analyzeLyricsDetailed();
    if ($('lyricsQualityScore')) $('lyricsQualityScore').textContent = result.score;
    if ($('lyricsAnalysisSummary')) {
      $('lyricsAnalysisSummary').textContent = result.issues.length
        ? lyricsLanguage()==='de' ? `${result.errors} kritisch · ${result.warnings} Hinweise · ${result.details.length} Abschnitte` : `${result.errors} critical · ${result.warnings} suggestions · ${result.details.length} sections`
        : lyricsLanguage()==='de' ? `Saubere Struktur · ${result.details.length} Abschnitte · keine Konflikte erkannt` : `Clean structure · ${result.details.length} sections · no conflicts detected`;
    }
    const baseChecks = [];
    baseChecks.push({ severity: result.details.length ? 'ok' : 'error', message: result.details.length ? `${result.details.length} song sections synchronized` : 'No song sections detected' });
    if (!result.issues.length) baseChecks.push({ severity: 'ok', message: 'MetaTags and structure look clean' });
    const visible = [...baseChecks, ...result.issues.slice(0, 7)];
    target.innerHTML = visible.map((item) => {
      const status = item.severity === 'ok' ? 'ok' : item.severity;
      const icon = status === 'ok' ? '✓' : status === 'info' ? 'i' : status === 'warn' ? '!' : '×';
      const jump = item.line ? `<button type="button" data-analysis-line="${item.line}">Line ${item.line}</button>` : '';
      return `<div class="lyrics-analysis-item ${status}"><span>${icon}</span><small>${escapeHtml(localizeAnalysisMessage(item.message))}</small>${jump}</div>`;
    }).join('');
    target.querySelectorAll('[data-analysis-line]').forEach(button => button.addEventListener('click', () => goToLine(Number(button.dataset.analysisLine))));
  }

  function renderTagDoctor() {
    const result = analyzeLyricsDetailed();
    if ($('lyricsTagCount')) $('lyricsTagCount').textContent = result.tagCount;
    if ($('lyricsIssueCount')) $('lyricsIssueCount').textContent = result.issues.length;
    if ($('lyricsDuplicateCount')) $('lyricsDuplicateCount').textContent = result.issues.filter(issue => /duplicate/.test(issue.code)).length;
    if ($('lyricsConflictCount')) $('lyricsConflictCount').textContent = result.issues.filter(issue => /conflict/.test(issue.code)).length;
    const health = $('lyricsTagHealth');
    if (health) {
      health.textContent = result.errors ? lt('attention') : result.warnings ? lt('review') : lt('healthy');
      health.style.color = result.errors ? '#ff9aaa' : result.warnings ? '#ffd06e' : '#75e9b8';
    }
    const report = $('lyricsDoctorReport');
    if (!report) return;
    if (!result.issues.length) {
      report.innerHTML = `<small>✓ ${escapeHtml(lt('no_issues'))}</small>`;
      return;
    }
    report.innerHTML = result.issues.slice(0, 12).map(issue => `<div class="lyrics-doctor-item ${issue.severity}"><b>${issue.severity === 'error' ? '×' : issue.severity === 'info' ? 'i' : '!'}</b><span>${escapeHtml(localizeAnalysisMessage(issue.message))}${issue.line ? ` · ${lyricsLanguage()==='de'?'Zeile':'line'} ${issue.line}` : ''}</span></div>`).join('');
  }

  function stylePromptForStackCheck(){return $('styleOutput')?.value||$('customStyle')?.value||''}

  function applyStackResult(result,message){
    if(!result?.changed)return toast(lyricsLanguage()==='de'?'Keine Änderung erforderlich':'No change required');
    const lineIndex=result.stack?state.activeStackLineIndex:result.section?.index;
    setText(result.text);
    if(Number.isInteger(lineIndex)){
      goToLine(lineIndex+1);
      state.activeStackLineIndex=lineIndex;
    }
    renderPipeBuilder();
    toast(message);
  }

  function renderPipeBuilder(){
    const root=$('lyricsPipeStack');
    if(!root||!StackEngine)return;
    const section=getSectionAtCursor();
    const de=lyricsLanguage()==='de';
    if(!section.stack){
      state.activeStackLineIndex=null;
      root.innerHTML=`<small>${de?'Wähle einen Songabschnitt, um seinen Stack zu bearbeiten.':'Select a song section to edit its stack.'}</small>`;
      $('lyricsPipePreview').textContent='[Section | Mood | Vocal | Instruments | Dynamics | Space | Production]';
      $('lyricsPipeCount').textContent='0 / 7';
      $('lyricsPipePriority').textContent='—';
      $('lyricsPipeStyleState').textContent='—';
      $('lyricsPipeHealth').textContent=de?'Bereit':'Ready';
      $('lyricsPipeHealth').className='lyrics-pipe-health';
      return;
    }
    state.activeStackLineIndex=section.index;
    const report=StackEngine.analyzeStack(section.stack,{stylePrompt:stylePromptForStackCheck(),language:lyricsLanguage()});
    const health=report.errors?'error':report.warnings?'warn':'';
    $('lyricsPipeHealth').textContent=report.errors?(de?'Konflikt':'Conflict'):report.warnings?(de?'Prüfen':'Review'):(de?'Sauber':'Clean');
    $('lyricsPipeHealth').className=`lyrics-pipe-health${health?' '+health:''}`;
    const sectionChip=`<span class="lyrics-pipe-chip section" data-category="section"><span>${escapeHtml(section.stack.section)}</span></span>`;
    const directives=section.stack.directives.map((item,index)=>`<span class="lyrics-pipe-chip" draggable="true" tabindex="0" data-pipe-index="${index}" data-category="${escapeHtml(item.category)}"><span title="${escapeHtml(item.value)}">${escapeHtml(item.value)}</span><button type="button" data-remove-pipe="${index}" title="${de?'Element entfernen':'Remove element'}">×</button></span>`).join('');
    root.innerHTML=sectionChip+directives;
    $('lyricsPipePreview').textContent=StackEngine.renderStack(section.stack);
    $('lyricsPipeCount').textContent=`${report.elementCount} / ${StackEngine.MAX_RECOMMENDED_ELEMENTS}`;
    $('lyricsPipePriority').textContent=report.primary||'—';
    $('lyricsPipeStyleState').textContent=report.styleState==='conflict'?(de?'Konflikt':'Conflict'):report.styleState==='aligned'?(de?'Passend':'Aligned'):(de?'Nicht geprüft':'Unchecked');

    root.querySelectorAll('[data-pipe-index]').forEach(chip=>{
      chip.addEventListener('dragstart',event=>{
        state.draggedPipeIndex=Number(chip.dataset.pipeIndex);
        event.dataTransfer?.setData('application/x-nsw-pipe-element',String(state.draggedPipeIndex));
        if(event.dataTransfer)event.dataTransfer.effectAllowed='move';
        chip.classList.add('dragging');
      });
      chip.addEventListener('dragover',event=>{event.preventDefault();if(event.dataTransfer)event.dataTransfer.dropEffect='move';chip.classList.add('drag-target')});
      chip.addEventListener('dragleave',()=>chip.classList.remove('drag-target'));
      chip.addEventListener('drop',event=>{
        event.preventDefault();
        const from=Number(event.dataTransfer?.getData('application/x-nsw-pipe-element')??state.draggedPipeIndex);
        const to=Number(chip.dataset.pipeIndex);
        root.querySelectorAll('.lyrics-pipe-chip').forEach(item=>item.classList.remove('dragging','drag-target'));
        state.draggedPipeIndex=null;
        if(!Number.isInteger(from)||from===to)return;
        applyStackResult(StackEngine.reorderDirective(getText(),state.activeStackLineIndex,from,to),de?'Priorität im Pipe-Stack geändert':'Pipe-Stack priority changed');
      });
      chip.addEventListener('dragend',()=>{state.draggedPipeIndex=null;root.querySelectorAll('.lyrics-pipe-chip').forEach(item=>item.classList.remove('dragging','drag-target'))});
      chip.addEventListener('keydown',event=>{
        if(!['ArrowLeft','ArrowRight'].includes(event.key)||!event.altKey)return;
        event.preventDefault();
        const from=Number(chip.dataset.pipeIndex),to=from+(event.key==='ArrowLeft'?-1:1);
        if(to<0||to>=section.stack.directives.length)return;
        applyStackResult(StackEngine.reorderDirective(getText(),state.activeStackLineIndex,from,to),de?'Priorität im Pipe-Stack geändert':'Pipe-Stack priority changed');
      });
    });
    root.querySelectorAll('[data-remove-pipe]').forEach(button=>button.addEventListener('click',event=>{
      event.stopPropagation();
      const index=Number(button.dataset.removePipe);
      applyStackResult(StackEngine.removeDirective(getText(),state.activeStackLineIndex,index),de?'Element entfernt':'Element removed');
    }));
  }

  function sortActiveStack(){
    if(!StackEngine||!Number.isInteger(state.activeStackLineIndex))return toast(lyricsLanguage()==='de'?'Wähle zuerst einen Songabschnitt':'Select a song section first');
    applyStackResult(StackEngine.sortStack(getText(),state.activeStackLineIndex),lyricsLanguage()==='de'?'Pipe-Stack automatisch sortiert':'Pipe-Stack automatically ordered');
  }

  function migrateAllStacks(){
    if(!StackEngine)return;
    const migration=StackEngine.migrateLyrics(getText(),{sortExisting:true});
    if(!migration.changed)return toast(lyricsLanguage()==='de'?'Alle Pipe-Stacks sind bereits sauber':'All Pipe-Stacks are already clean');
    setText(migration.text);
    toast(lyricsLanguage()==='de'?`${migration.convertedStacks} Pipe-Stacks aufgebaut · ${migration.convertedTags} Einzel-Tags übernommen`:`${migration.convertedStacks} Pipe-Stacks built · ${migration.convertedTags} standalone tags migrated`);
  }

  function syncLyricsOutput() {
    const output = $('lyricsOutput');
    if (output) output.value = getText();
    const active = document.querySelector('.live-output-tabs button.active')?.dataset.liveTab;
    if (active === 'lyrics') updateRightbarStats();
  }

  function updateRightbarStats() {
    const text = getText();
    if ($('liveCharCount')) $('liveCharCount').textContent = `${text.length} Zeichen`;
    if ($('liveWordCount')) $('liveWordCount').textContent = `${text.trim() ? text.trim().split(/\s+/).length : 0} Wörter`;
  }

  function updateAll() {
    updateLineNumbers();
    renderStructure();
    updateStats();
    renderHighlightedPreview();
    renderAnalysis();
    renderTagDoctor();
    renderPipeBuilder();
    syncLyricsOutput();
    updateContextSuggestions();
    updateHistoryButtons();
    updateSearch(false);
  }

  function scheduleSave() {
    const stateLabel = $('lyricsSaveState');
    if (stateLabel) stateLabel.textContent = `● ${lt('autosave_saving')}`;
    clearTimeout(state.saveTimer);
    state.saveTimer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ text: getText(), updatedAt: Date.now() }));
        if (stateLabel) stateLabel.textContent = `● ${lt('autosave_saved')}`;
      } catch (error) {
        if (stateLabel) stateLabel.textContent = `● ${lt('autosave_failed')}`;
        console.warn('Lyrics autosave failed', error);
      }
    }, 350);
  }

  function restoreSaved() {
    try {
      let raw = localStorage.getItem(STORAGE_KEY);
      let legacy=false;
      if(!raw){
        for(const key of LEGACY_STORAGE_KEYS){raw=localStorage.getItem(key);if(raw){legacy=true;break}}
      }
      if (!raw) return '';
      const data = JSON.parse(raw);
      const text=typeof data.text === 'string' ? data.text : '';
      if(!StackEngine||!text)return text;
      const migration=StackEngine.migrateLyrics(text,{sortExisting:false});
      state.restoredFromLegacy=legacy||migration.changed;
      state.restoredMigration=migration;
      return migration.text;
    } catch (error) {
      console.warn('Lyrics restore failed', error);
      return '';
    }
  }

  function pushHistory(value) {
    const current = state.history[state.historyIndex];
    if (value === current) return;
    state.history = state.history.slice(0, state.historyIndex + 1);
    state.history.push(value);
    if (state.history.length > HISTORY_LIMIT) state.history.shift();
    state.historyIndex = state.history.length - 1;
    updateHistoryButtons();
  }

  function scheduleHistory() {
    clearTimeout(state.historyTimer);
    state.historyTimer = setTimeout(() => pushHistory(getText()), 280);
  }

  function undo() {
    if (state.historyIndex <= 0) return;
    state.historyIndex -= 1;
    setText(state.history[state.historyIndex], { history: false });
  }

  function redo() {
    if (state.historyIndex >= state.history.length - 1) return;
    state.historyIndex += 1;
    setText(state.history[state.historyIndex], { history: false });
  }

  function updateHistoryButtons() {
    if ($('lyricsUndo')) $('lyricsUndo').disabled = state.historyIndex <= 0;
    if ($('lyricsRedo')) $('lyricsRedo').disabled = state.historyIndex >= state.history.length - 1;
  }

  function insertAtCursor(text) {
    const editor = $('lyricsEditor');
    if (!editor) return;
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const next = editor.value.slice(0, start) + text + editor.value.slice(end);
    editor.value = next;
    const cursor = start + text.length;
    editor.setSelectionRange(cursor, cursor);
    pushHistory(next);
    updateAll();
    scheduleSave();
    editor.focus();
  }

  function insertTemplate() {
    const template = `[Intro]\n\n[Verse 1]\n\n\n[Pre-Chorus]\n\n\n[Chorus]\n\n\n[Verse 2]\n\n\n[Pre-Chorus]\n\n\n[Chorus]\n\n\n[Bridge]\n\n\n[Final Chorus]\n\n\n[Outro]\n`;
    if (getText().trim() && !confirm('Replace the current lyrics with a starter template?')) return;
    setText(template);
    toast('Lyrics template inserted');
  }

  async function copyLyrics() {
    const text = getText();
    if (!text) return toast('No lyrics to copy');
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const editor = $('lyricsEditor');
      editor.select();
      document.execCommand('copy');
    }
    toast('Lyrics copied');
  }

  function downloadLyrics() {
    const text = getText();
    if (!text) return toast('No lyrics to export');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `nordlicht-lyrics-${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
    toast('Lyrics exported');
  }

  function updateSearch(moveToFirst = false) {
    const input = $('lyricsFindInput');
    const status = $('lyricsFindStatus');
    if (!input || !status) return;
    const query = input.value;
    state.searchMatches = [];
    state.searchIndex = -1;
    if (!query) {
      status.textContent = '0 matches';
      return;
    }
    const haystack = getText().toLocaleLowerCase();
    const needle = query.toLocaleLowerCase();
    let index = 0;
    while ((index = haystack.indexOf(needle, index)) !== -1) {
      state.searchMatches.push(index);
      index += Math.max(needle.length, 1);
    }
    status.textContent = `${state.searchMatches.length} ${state.searchMatches.length === 1 ? 'match' : 'matches'}`;
    if (moveToFirst && state.searchMatches.length) selectSearchMatch(0);
  }

  function selectSearchMatch(index) {
    if (!state.searchMatches.length) return;
    state.searchIndex = (index + state.searchMatches.length) % state.searchMatches.length;
    const start = state.searchMatches[state.searchIndex];
    const length = $('lyricsFindInput').value.length;
    const editor = $('lyricsEditor');
    editor.focus();
    editor.setSelectionRange(start, start + length);
    $('lyricsFindStatus').textContent = `${state.searchIndex + 1} / ${state.searchMatches.length}`;
  }

  function replaceOne() {
    const editor = $('lyricsEditor');
    const query = $('lyricsFindInput').value;
    if (!query) return;
    const selected = editor.value.slice(editor.selectionStart, editor.selectionEnd);
    if (selected.toLocaleLowerCase() !== query.toLocaleLowerCase()) {
      updateSearch(true);
      return;
    }
    const replacement = $('lyricsReplaceInput').value;
    const start = editor.selectionStart;
    editor.setRangeText(replacement, editor.selectionStart, editor.selectionEnd, 'end');
    pushHistory(editor.value);
    updateAll();
    scheduleSave();
    updateSearch(false);
    const next = state.searchMatches.findIndex((value) => value >= start + replacement.length);
    if (state.searchMatches.length) selectSearchMatch(next >= 0 ? next : 0);
  }

  function replaceAll() {
    const query = $('lyricsFindInput').value;
    if (!query) return;
    const replacement = $('lyricsReplaceInput').value;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'gi');
    const before = getText();
    const next = before.replace(regex, replacement);
    const count = (before.match(regex) || []).length;
    if (!count) return toast('No matches found');
    setText(next);
    toast(`${count} replacements made`);
  }


  function normalizeTag(raw) {
    const clean = String(raw || '').trim();
    if (!clean) return '';
    return clean.startsWith('[') && clean.endsWith(']') ? clean : `[${clean.replace(/^\[|\]$/g, '').trim()}]`;
  }

  function getSectionAtCursor() {
    const editor = $('lyricsEditor');
    if (!editor) return { key: 'general', label: 'General', line: 0 };
    if(StackEngine){
      const section=StackEngine.sectionAtOffset(editor.value,editor.selectionStart);
      if(!section)return{key:'general',label:'General',line:0,index:null,stack:null};
      const raw=section.stack.section.toLowerCase();
      let key=raw;
      if (/verse/.test(raw)) key = 'verse';
      else if (/pre[-\s]?chorus/.test(raw)) key = 'pre-chorus';
      else if (/post[-\s]?chorus/.test(raw)) key = 'post-chorus';
      else if (/final\s+chorus/.test(raw)) key = 'final chorus';
      else if (/instrumental/.test(raw)) key = 'instrumental';
      else if (/solo/.test(raw)) key = 'solo';
      return{key,label:`[${section.stack.section}]`,line:section.line,index:section.index,stack:section.stack,sourceLine:section.sourceLine,start:section.start};
    }
    const before = editor.value.slice(0, editor.selectionStart).split('\n');
    for (let i = before.length - 1; i >= 0; i -= 1) {
      const line = before[i].trim();
      if (!SECTION_RE.test(line)) continue;
      const raw = line.replace(/^\[|\]$/g, '').trim().toLowerCase();
      let key = raw;
      if (/^verse/.test(raw)) key = 'verse';
      else if (/^pre[-\s]?chorus/.test(raw)) key = 'pre-chorus';
      else if (/^post[-\s]?chorus/.test(raw)) key = 'post-chorus';
      else if (/^final\s+chorus/.test(raw)) key = 'final chorus';
      else if (/^instrumental/.test(raw)) key = 'instrumental';
      else if (/^solo/.test(raw)) key = 'solo';
      return { key, label: line, line: i + 1 };
    }
    return { key: 'general', label: 'General', line: 0 };
  }

  function updateContextSuggestions() {
    const data = window.NSW_LYRICS_METATAGS;
    if (!data) return;
    const section = getSectionAtCursor();
    state.currentSection = section.key;
    const localizedLabel = section.key === 'general' ? lt('general') : section.label;
    if ($('lyricsCurrentSection')) $('lyricsCurrentSection').textContent = localizedLabel;
    if ($('lyricsContextHint')) $('lyricsContextHint').textContent = section.key === 'general'
      ? lt('context_general')
      : lt('context_section', { section: section.label });
    const tags = data.suggestions[section.key] || data.suggestions.general || [];
    const target = $('lyricsSuggestionChips');
    if (!target) return;
    target.innerHTML = tags.map(tag => `<button class="lyrics-suggestion-chip" draggable="true" data-lyrics-tag="${escapeHtml(tag)}" type="button"><span>${escapeHtml(tag)}</span><b>＋</b></button>`).join('');
    bindTagElements(target);
  }

  function renderTagLibrary() {
    const data = window.NSW_LYRICS_METATAGS;
    const target = $('lyricsTagLibrary');
    const select = $('lyricsTagCategory');
    if (!data || !target || !select) return;
    const selectedValue = select.value || 'all';
    select.innerHTML = `<option value="all">${escapeHtml(lt('all_categories'))}</option>` + Object.keys(data.categories).map(category => `<option value="${escapeHtml(category)}">${escapeHtml(categoryLabel(category))}</option>`).join('');
    select.value = Object.prototype.hasOwnProperty.call(data.categories, selectedValue) ? selectedValue : 'all';
    const query = ($('lyricsTagSearch')?.value || '').trim().toLowerCase();
    const category = select.value || 'all';
    const favoritesOnly = Boolean($('lyricsFavoritesOnly')?.checked);
    const groups = Object.entries(data.categories).filter(([name]) => category === 'all' || category === name);
    target.classList.toggle('single-category', category !== 'all');
    target.setAttribute('tabindex', '0');
    target.setAttribute('aria-label', category === 'all' ? lt('all_categories') : categoryLabel(category));
    let visibleCount = 0;
    target.innerHTML = groups.map(([name, tags]) => {
      const filtered = tags.filter(tag => (!query || tag.toLowerCase().includes(query)) && (!favoritesOnly || state.favoriteTags.has(tag)));
      if (!filtered.length) return '';
      visibleCount += filtered.length;
      // A specifically selected category must always open immediately. This avoids
      // showing only its header and makes all matching tags reachable by scrolling.
      const isOpen = query ? true : category !== 'all' ? true : state.openGroups.has(name);
      return `<section class="lyrics-tag-group${isOpen ? ' is-open' : ''}" data-group="${escapeHtml(name)}"><button type="button" class="lyrics-tag-group-toggle" aria-expanded="${isOpen}"><span><b>${escapeHtml(categoryLabel(name))}</b><em>${filtered.length}</em></span><i>⌄</i></button><div class="lyrics-tag-items" ${isOpen ? '' : 'hidden'}>${filtered.map(tag => { const favorite=state.favoriteTags.has(tag); const level=data.metadata?.[tag]?.level||'advanced'; return `<div class="lyrics-tag-item reliability-${level}" draggable="true" data-lyrics-tag="${escapeHtml(tag)}" title="${escapeHtml(lt(level))}"><button class="lyrics-tag-favorite${favorite ? ' active' : ''}" type="button" data-favorite-tag="${escapeHtml(tag)}" title="${escapeHtml(favorite ? lt('favorite_remove') : lt('favorite_add'))}">${favorite ? '★' : '☆'}</button><span class="lyrics-tag-label">${highlightMatch(tag, query)}</span><small class="lyrics-tag-reliability">${escapeHtml(lt(level))}</small><button class="lyrics-tag-add" type="button" title="${escapeHtml(lt('insert_tag'))}">＋</button></div>`; }).join('')}</div></section>`;
    }).join('') || `<div class="lyrics-empty-state">${escapeHtml(lt('no_tags'))}</div>`;
    const allTags=allLibraryTags(); const used=usedLibraryTagSet();
    if ($('lyricsLibraryAvailable')) $('lyricsLibraryAvailable').textContent=allTags.length;
    if ($('lyricsLibraryUsed')) $('lyricsLibraryUsed').textContent=used.size;
    target.dataset.visibleCount=String(visibleCount);
    bindTagElements(target);
    target.querySelectorAll('.lyrics-tag-group-toggle').forEach(button => button.addEventListener('click', event => {
      event.stopPropagation();
      const group=button.closest('.lyrics-tag-group'); const name=group.dataset.group; const items=group.querySelector('.lyrics-tag-items'); const opening=items.hidden;
      items.hidden=!opening; group.classList.toggle('is-open', opening); button.setAttribute('aria-expanded', String(opening));
      opening ? state.openGroups.add(name) : state.openGroups.delete(name); saveLibraryPreferences();
    }));
    target.querySelectorAll('[data-favorite-tag]').forEach(button => button.addEventListener('click', event => {
      event.preventDefault(); event.stopPropagation(); const tag=button.dataset.favoriteTag;
      const previousScrollTop = target.scrollTop;
      state.favoriteTags.has(tag) ? state.favoriteTags.delete(tag) : state.favoriteTags.add(tag);
      saveLibraryPreferences(); renderTagLibrary();
      const refreshedTarget = $('lyricsTagLibrary');
      if (refreshedTarget) refreshedTarget.scrollTop = previousScrollTop;
    }));
  }

  function insertTag(tag, preferredPosition = null) {
    const editor = $('lyricsEditor');
    const normalized = normalizeTag(tag);
    if (!editor || !normalized) return;
    let pos = Number.isInteger(preferredPosition) ? preferredPosition : editor.selectionStart;
    pos = Math.max(0, Math.min(pos, editor.value.length));
    if(StackEngine){
      const addition=StackEngine.addDirective(editor.value,pos,normalized,{createSection:true,defaultSection:'Verse 1'});
      if(addition.kind==='directive'){
        if(addition.reason==='no-section')return toast(lyricsLanguage()==='de'?'Wähle zuerst einen Songabschnitt für das Stack-Element':'Select a song section before adding a stack element');
        if(addition.reason==='duplicate')return toast(lyricsLanguage()==='de'?'Dieses Element ist bereits im Pipe-Stack':'This element is already in the Pipe-Stack');
        if(addition.changed){
          editor.value=addition.text;
          editor.setSelectionRange(addition.cursor,addition.cursor);
          pushHistory(editor.value);
          updateAll();
          scheduleSave();
          editor.focus();
          return toast(`${StackEngine.normalizeDirective(normalized)?.value||normalized} ${lyricsLanguage()==='de'?'zum Pipe-Stack hinzugefügt':'added to Pipe-Stack'}`);
        }
      }
    }
    const before = editor.value.slice(0, pos);
    const after = editor.value.slice(pos);
    const atLineStart = pos === 0 || before.endsWith('\n');
    const atLineEnd = pos === editor.value.length || after.startsWith('\n');
    const prefix = atLineStart ? '' : '\n';
    const suffix = atLineEnd ? '\n' : '\n';
    const insertion = `${prefix}${normalized}${suffix}`;
    editor.value = before + insertion + after;
    const cursor = pos + insertion.length;
    editor.setSelectionRange(cursor, cursor);
    pushHistory(editor.value);
    updateAll();
    scheduleSave();
    editor.focus();
    toast(`${normalized} ${lyricsLanguage()==='de' ? 'eingefügt' : 'inserted'}`);
  }

  function bindTagElements(scope) {
    scope.querySelectorAll('[data-lyrics-tag]').forEach(element => {
      element.addEventListener('dragstart', event => {
        const tag = element.dataset.lyricsTag;
        event.dataTransfer.setData('text/plain', tag);
        event.dataTransfer.effectAllowed = 'copy';
        element.classList.add('dragging');
      });
      element.addEventListener('dragend', () => element.classList.remove('dragging'));
      element.addEventListener('click', event => {
        if (event.target.closest('.lyrics-tag-group-toggle, .lyrics-tag-favorite')) return;
        insertTag(element.dataset.lyricsTag);
      });
    });
  }

  function cursorFromDrop(event) {
    const editor = $('lyricsEditor');
    if (!editor) return 0;
    editor.focus();
    if (document.caretPositionFromPoint) {
      const point = document.caretPositionFromPoint(event.clientX, event.clientY);
      if (point && point.offsetNode === editor) return point.offset;
    }
    const style = getComputedStyle(editor);
    const lineHeight = parseFloat(style.lineHeight) || 23;
    const paddingTop = parseFloat(style.paddingTop) || 16;
    const rect = editor.getBoundingClientRect();
    const line = Math.max(0, Math.floor((event.clientY - rect.top + editor.scrollTop - paddingTop) / lineHeight));
    const lines = editor.value.split('\n');
    return lines.slice(0, Math.min(line, lines.length)).join('\n').length + Math.min(line, lines.length - 1);
  }

  function sectionBlocks() {
    const text = getText();
    const sections = parseSections(text);
    if (!sections.length) return [];
    return sections.map((section, index) => {
      const start = text.split('\n').slice(0, section.index).join('\n').length + (section.index > 0 ? 1 : 0);
      const nextLine = sections[index + 1]?.index;
      const end = nextLine == null ? text.length : text.split('\n').slice(0, nextLine).join('\n').length + (nextLine > 0 ? 1 : 0);
      return { start, end, text: text.slice(start, end).replace(/\n+$/, '') };
    });
  }

  function handleSectionDragStart(event) {
    state.draggedSectionIndex = Number(event.currentTarget.dataset.sectionIndex);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('application/x-nsw-section', String(state.draggedSectionIndex));
    event.currentTarget.classList.add('dragging');
  }

  function handleSectionDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    event.currentTarget.classList.add('drag-target');
  }

  function handleSectionDrop(event) {
    event.preventDefault();
    const from = Number(event.dataTransfer.getData('application/x-nsw-section'));
    const to = Number(event.currentTarget.dataset.sectionIndex);
    clearSectionDragState();
    if (!Number.isInteger(from) || !Number.isInteger(to) || from === to) return;
    const blocks = sectionBlocks();
    if (!blocks[from] || !blocks[to]) return;
    const firstStart = blocks[0].start;
    const preamble = getText().slice(0, firstStart).trimEnd();
    const reordered = blocks.map(block => block.text);
    const [moved] = reordered.splice(from, 1);
    reordered.splice(to, 0, moved);
    const sectionText = reordered.join('\n\n').trimEnd() + '\n';
    setText(preamble ? `${preamble}\n\n${sectionText}` : sectionText);
    toast('Song section moved');
  }

  function clearSectionDragState() {
    state.draggedSectionIndex = null;
    document.querySelectorAll('.lyrics-structure-item').forEach(el => el.classList.remove('dragging', 'drag-target'));
  }


  function normalizeStructure() {
    const text = getText();
    if (!text.trim()) return toast('No lyrics to normalize');
    const lines = text.split('\n');
    let verse = 0;
    const normalized = lines.map(line => {
      const stack=StackEngine?.parseStack(line);
      if (!(stack||SECTION_RE.test(line))) return line.replace(/[ \t]+$/g, '');
      if (/^verse/i.test(stack?.section||line.replace(/^\s*\[\s*/,''))) verse += 1;
      return canonicalSectionLabel(line, verse || null);
    }).join('\n').replace(/\n{4,}/g, '\n\n\n').trimEnd() + '\n';
    if (normalized === text) return toast('Structure is already synchronized');
    setText(normalized);
    toast('Structure synchronized and Verse numbers normalized');
  }

  function optimizeMetaTags() {
    const text = getText();
    if (!text.trim()) return toast('No lyrics to optimize');
    if(StackEngine){
      const migration=StackEngine.migrateLyrics(text,{sortExisting:true});
      if(!migration.changed)return toast(lyricsLanguage()==='de'?'Die Pipe-Stacks sind bereits optimiert':'The Pipe-Stacks are already optimized');
      setText(migration.text);
      return toast(lyricsLanguage()==='de'?`Pipe-Stacks optimiert · ${migration.convertedTags} Einzel-Tags übernommen · Duplikate entfernt`:`Pipe-Stacks optimized · ${migration.convertedTags} standalone tags migrated · duplicates removed`);
    }
    const lines = text.split('\n');
    const mergeable = /^(Style|Music|Choir|Production|Ad-libs|Transition):\s*(.+)$/i;
    const output = [];
    let seenInSection = new Set();
    let removed = 0;
    let merged = 0;

    const flushTagRun = (run) => {
      if (!run.length) return;
      const groups = new Map();
      const passthrough = [];
      run.forEach(raw => {
        const tag = normalizeTag(raw).replace(/\s+/g, ' ');
        const inner = tag.slice(1, -1).trim();
        const match = inner.match(mergeable);
        if (!match) { passthrough.push(tag); return; }
        const key = match[1].toLowerCase();
        if (!groups.has(key)) groups.set(key, { label: match[1], values: [] });
        match[2].split(',').map(v => v.trim()).filter(Boolean).forEach(value => {
          if (!groups.get(key).values.some(v => v.toLowerCase() === value.toLowerCase())) groups.get(key).values.push(value);
        });
      });
      passthrough.forEach(tag => output.push(tag));
      groups.forEach(group => {
        output.push(`[${group.label}: ${group.values.join(', ')}]`);
        if (group.values.length > 1) merged += group.values.length - 1;
      });
    };

    let run = [];
    const flush = () => { flushTagRun(run); run = []; };
    lines.forEach(line => {
      const trimmed = line.trim();
      if (SECTION_RE.test(trimmed)) {
        flush();
        seenInSection = new Set();
        output.push(canonicalSectionLabel(trimmed, Number(trimmed.match(/\d+/)?.[0]) || null));
        return;
      }
      if (isStandaloneTag(trimmed)) {
        const normalized = normalizeTag(trimmed).replace(/\s+/g, ' ');
        const key = normalized.toLowerCase();
        if (seenInSection.has(key)) { removed += 1; return; }
        seenInSection.add(key);
        run.push(normalized);
        return;
      }
      flush();
      output.push(line.replace(/[ \t]+$/g, ''));
    });
    flush();
    const optimized = output.join('\n').replace(/\n{4,}/g, '\n\n\n').trimEnd() + '\n';
    if (optimized === text) return toast('No safe optimizations were necessary');
    setText(optimized);
    toast(`MetaTags optimized · ${removed} duplicates removed · ${merged} values consolidated`);
  }

  function bindPhase2Events() {
    const editor = $('lyricsEditor');
    const shell = editor?.closest('.lyrics-editor-shell');
    if (!editor || !shell) return;
    ['click', 'keyup', 'select'].forEach(name => editor.addEventListener(name, () => { updateContextSuggestions(); renderStructure(); renderPipeBuilder(); }));
    shell.addEventListener('dragover', event => { event.preventDefault(); event.dataTransfer.dropEffect = 'copy'; shell.classList.add('drag-over'); });
    shell.addEventListener('dragleave', event => { if (!shell.contains(event.relatedTarget)) shell.classList.remove('drag-over'); });
    shell.addEventListener('drop', event => {
      event.preventDefault();
      shell.classList.remove('drag-over');
      const tag = event.dataTransfer.getData('text/plain');
      if (tag) insertTag(tag, cursorFromDrop(event));
    });
    $('lyricsTagSearch')?.addEventListener('input', renderTagLibrary);
    $('lyricsTagCategory')?.addEventListener('change', renderTagLibrary);
    $('lyricsFavoritesOnly')?.addEventListener('change', renderTagLibrary);
    $('lyricsRefreshSuggestions')?.addEventListener('click', updateContextSuggestions);
    $('lyricsInsertCustomTag')?.addEventListener('click', () => {
      const input = $('lyricsCustomTag');
      if (!input?.value.trim()) return toast('Enter a custom MetaTag first');
      insertTag(input.value);
      input.value = '';
    });
    $('lyricsCustomTag')?.addEventListener('keydown', event => {
      if (event.key === 'Enter') { event.preventDefault(); $('lyricsInsertCustomTag').click(); }
    });
    $('lyricsTagHelp')?.addEventListener('click', () => toast(lyricsLanguage()==='de'?'Ziehe Elemente in den aktiven Abschnitt. Im Pipe-Stack kannst du ihre Priorität anschließend per Drag & Drop ändern.':'Drag elements into the active section. Then use drag and drop inside the Pipe-Stack to change their priority.'));
    $('lyricsNormalizeStructure')?.addEventListener('click', normalizeStructure);
    $('lyricsAnalyzeTags')?.addEventListener('click', () => { renderTagDoctor(); renderAnalysis(); toast('Lyrics and MetaTags analyzed'); });
    $('lyricsOptimizeTags')?.addEventListener('click', optimizeMetaTags);
    $('lyricsSortStack')?.addEventListener('click', sortActiveStack);
    $('lyricsMigrateStacks')?.addEventListener('click', migrateAllStacks);
    ['styleOutput','customStyle'].forEach(id=>$(id)?.addEventListener('input',()=>{renderPipeBuilder();renderTagDoctor();renderAnalysis()}));
    renderTagLibrary();
    updateContextSuggestions();
  }

  function refreshLanguage() {
    document.querySelectorAll('[data-lyrics-i18n]').forEach(el => { el.textContent = lt(el.dataset.lyricsI18n); });
    document.querySelectorAll('[data-lyrics-placeholder]').forEach(el => { el.placeholder = lt(el.dataset.lyricsPlaceholder); });
    const analyzeButton=$('lyricsAnalyzeTags'); if (analyzeButton) analyzeButton.textContent=`⌕ ${lt('analyze')}`;
    const optimizeButton=$('lyricsOptimizeTags'); if (optimizeButton) optimizeButton.textContent=`✨ ${lt('optimize')}`;
    const de=lyricsLanguage()==='de';
    const direct={lyricsReplaceOne:de?'Ersetzen':'Replace',lyricsReplaceAll:de?'Alle ersetzen':'Replace all',lyricsFindStatus:de?'0 Treffer':'0 matches'};
    Object.entries(direct).forEach(([id,text])=>{const el=$(id);if(el)el.textContent=text;});
    if($('lyricsPipeTitle'))$('lyricsPipeTitle').textContent='Pipe-Stack';
    if($('lyricsPipeHint'))$('lyricsPipeHint').textContent=de?'Priorität läuft von links nach rechts. Auto-Reihenfolge: Stimmung → Vocal → Instrumente → Dynamik → Raum → Produktion. Elemente lassen sich frei ziehen.':'Priority runs left to right. Auto-order: Mood → Vocal → Instruments → Dynamics → Space → Production. Drag elements to set a custom priority.';
    if($('lyricsSortStack'))$('lyricsSortStack').textContent=de?'⇄ Automatisch sortieren':'⇄ Auto-order';
    if($('lyricsMigrateStacks'))$('lyricsMigrateStacks').textContent=de?'⤳ Pipe-Stacks aufbauen':'⤳ Build Pipe-Stacks';
    const metricLabels=$('lyricsPipeBuilder')?.querySelectorAll('.lyrics-pipe-metrics small');
    if(metricLabels?.length===3){metricLabels[0].textContent=de?'Elemente':'Elements';metricLabels[1].textContent=de?'Höchste Priorität':'Top priority';metricLabels[2].textContent=de?'STYLE-Abgleich':'STYLE match'}
    renderTagLibrary(); updateContextSuggestions(); renderTagDoctor(); renderAnalysis(); updateStats(); renderStructure(); renderPipeBuilder();
    const stateLabel=$('lyricsSaveState'); if(stateLabel && !/Saving|Wird gespeichert|Saved|Gespeichert|Restored|wiederhergestellt|failed|fehlgeschlagen/i.test(stateLabel.textContent)) stateLabel.textContent=`● ${lt('autosave_ready')}`;
  }

  function bindEvents() {
    const editor = $('lyricsEditor');
    if (!editor) return;

    editor.addEventListener('input', () => {
      updateAll();
      scheduleSave();
      scheduleHistory();
    });
    editor.addEventListener('scroll', updateLineNumbers);
    editor.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        insertAtCursor('  ');
      } else if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {
        event.preventDefault();
        event.shiftKey ? redo() : undo();
      } else if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'y') {
        event.preventDefault();
        redo();
      } else if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'f') {
        event.preventDefault();
        $('lyricsFindbar').classList.remove('hidden');
        $('lyricsFindInput').focus();
        updateSearch(true);
      }
    });

    $('lyricsUndo').addEventListener('click', undo);
    $('lyricsRedo').addEventListener('click', redo);
    $('lyricsRefreshStructure').addEventListener('click', () => { renderStructure(); toast('Song structure refreshed'); });
    $('lyricsInsertTemplate').addEventListener('click', insertTemplate);
    $('lyricsClear').addEventListener('click', () => {
      if (!getText().trim() || confirm('Clear all lyrics?')) setText('');
    });
    $('lyricsCopy').addEventListener('click', copyLyrics);
    $('copyLyricsOutput').addEventListener('click', copyLyrics);
    $('lyricsDownload').addEventListener('click', downloadLyrics);
    $('lyricsFindToggle').addEventListener('click', () => {
      $('lyricsFindbar').classList.toggle('hidden');
      if (!$('lyricsFindbar').classList.contains('hidden')) $('lyricsFindInput').focus();
    });
    $('lyricsFindClose').addEventListener('click', () => $('lyricsFindbar').classList.add('hidden'));
    $('lyricsFindInput').addEventListener('input', () => updateSearch(true));
    $('lyricsFindInput').addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        selectSearchMatch(state.searchIndex + (event.shiftKey ? -1 : 1));
      } else if (event.key === 'Escape') {
        $('lyricsFindbar').classList.add('hidden');
        editor.focus();
      }
    });
    $('lyricsFindNext').addEventListener('click', () => selectSearchMatch(state.searchIndex + 1));
    $('lyricsFindPrev').addEventListener('click', () => selectSearchMatch(state.searchIndex - 1));
    $('lyricsReplaceOne').addEventListener('click', replaceOne);
    $('lyricsReplaceAll').addEventListener('click', replaceAll);

    document.querySelectorAll('[data-live-tab]').forEach((button) => {
      button.addEventListener('click', () => {
        if (button.dataset.liveTab === 'lyrics') setTimeout(updateRightbarStats, 0);
      });
    });
  }

  function init() {
    if (state.initialized || !$('lyricsEditor')) return;
    state.initialized = true;
    loadLibraryPreferences();
    const restored = restoreSaved();
    $('lyricsEditor').value = restored;
    state.history = [restored];
    state.historyIndex = 0;
    bindEvents();
    bindPhase2Events();
    updateAll();
    refreshLanguage();
    $('lyricsSaveState').textContent = `● ${restored ? lt('autosave_restored') : lt('autosave_ready')}`;
    if(state.restoredFromLegacy){
      scheduleSave();
      setTimeout(()=>toast(lyricsLanguage()==='de'?`${state.restoredMigration?.convertedTags||0} bestehende Einzel-Tags wurden sicher in Pipe-Stacks übernommen`:`${state.restoredMigration?.convertedTags||0} existing standalone tags were safely migrated into Pipe-Stacks`),120);
    }
  }

  window.NSWLyricsWorkspace = { refreshLanguage, renderTagLibrary, renderPipeBuilder, analyzeLyricsDetailed, migrateAllStacks, updateAll };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

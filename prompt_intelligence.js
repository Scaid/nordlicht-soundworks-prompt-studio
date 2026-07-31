(() => {
  'use strict';

  const DATA = window.NSW_LYRICS_METATAGS || {categories:{}, metadata:{}, categoryOrder:[], total:0};
  const STORAGE_FAV = 'nsw-pi-tag-favorites-v1';
  const STORAGE_OPEN = 'nsw-pi-open-categories-v1';

  const TEXT = {
    de:{title:'🎼 Prompt Intelligence',sub:'MetaTag-Bibliothek, Songstrukturen, Prompt-DNA und kuratierte Kombinationen für Suno.',library:'📚 MetaTag Library',maps:'🗺️ Song Maps',dna:'🧠 Prompt DNA',combos:'⭐ Tag Combinations',allCats:'Alle Kategorien',allRatings:'Alle Bewertungen',favOnly:'Nur Favoriten',hint:'Klicken zum Einfügen · Stern zum Favorisieren',mapsTitle:'Song Maps',mapsDesc:'Komplette, genretypische Songstrukturen mit einem Klick einfügen.',directions:'Passende Anweisungen ergänzen',dnaTitle:'Prompt DNA',dnaDesc:'Zeigt, wie Genre, Instrumente, Vocals, BPM und MetaTags zusammenarbeiten.',refresh:'↻ Aktualisieren',applyDna:'Empfohlene DNA-Tags einfügen',combosTitle:'Tag Combinations',combosDesc:'Erprobte Gruppen aus Struktur-, Vocal-, Musik-, Dynamik- und Produktions-Tags.',classic:'Klassischen MetaTag Composer öffnen',search:'MetaTags durchsuchen …',comboSearch:'Kombination suchen …',insert:'Einfügen',replace:'Ersetzen',append:'Anhängen',none:'Keine Treffer',genre:'Genre',tempo:'Tempo',vocals:'Vocals',instruments:'Instrumente',recommended:'Empfohlene MetaTags',tags:'MetaTags',inserted:'MetaTags eingefügt',replaced:'Struktur ersetzt'},
    en:{title:'🎼 Prompt Intelligence',sub:'MetaTag library, song structures, Prompt DNA and curated combinations for Suno.',library:'📚 MetaTag Library',maps:'🗺️ Song Maps',dna:'🧠 Prompt DNA',combos:'⭐ Tag Combinations',allCats:'All categories',allRatings:'All ratings',favOnly:'Favorites only',hint:'Click to insert · star to favorite',mapsTitle:'Song Maps',mapsDesc:'Insert complete genre-aware song structures with one click.',directions:'Add matching directions',dnaTitle:'Prompt DNA',dnaDesc:'Shows how genre, instruments, vocals, BPM and MetaTags work together.',refresh:'↻ Refresh',applyDna:'Insert recommended DNA tags',combosTitle:'Tag Combinations',combosDesc:'Curated groups of structure, vocal, music, dynamics and production tags.',classic:'Open classic MetaTag Composer',search:'Search MetaTags …',comboSearch:'Search combinations …',insert:'Insert',replace:'Replace',append:'Append',none:'No results',genre:'Genre',tempo:'Tempo',vocals:'Vocals',instruments:'Instruments',recommended:'Recommended MetaTags',tags:'MetaTags',inserted:'MetaTags inserted',replaced:'Structure replaced'}
  };

  const categoryLabels = {
    de:{Sections:'Songstruktur',Vocals:'Vocals',Choir:'Chor',Style:'Stil & Emotion',Dynamics:'Dynamik',Music:'Musik & Arrangement',Instrumental:'Instrumental & Soli',Production:'Produktion & Mix',Adlibs:'Ad-libs & Calls',Transitions:'Übergänge',RhythmTempo:'Rhythmus & Tempo',HarmonyMelody:'Harmonie & Melodie',SoundFX:'Soundeffekte'},
    en:{Sections:'Song Structure',Vocals:'Vocals',Choir:'Choir',Style:'Style & Emotion',Dynamics:'Dynamics',Music:'Music & Arrangement',Instrumental:'Instrumental & Solos',Production:'Production & Mix',Adlibs:'Ad-libs & Calls',Transitions:'Transitions',RhythmTempo:'Rhythm & Tempo',HarmonyMelody:'Harmony & Melody',SoundFX:'Sound Effects'}
  };

  const SONG_MAPS = [
    {name:'Anime Opening',badge:'Anime',sections:['[Intro]','[Verse 1]','[Pre-Chorus]','[Chorus]','[Instrumental Break]','[Verse 2]','[Bridge]','[Final Chorus]','[Outro]'],dirs:['[Style: energetic, uplifting]','[Building Intensity]','[Powerful Vocal]','[Huge Cinematic Finale]']},
    {name:'Anime Ending',badge:'Anime',sections:['[Intro]','[Verse 1]','[Chorus]','[Verse 2]','[Bridge]','[Final Chorus]','[Outro]'],dirs:['[Style: melancholic, reflective]','[Gentle Build]','[Emotional Vocal]','[Fade Out]']},
    {name:'Electro Swing',badge:'Swing',sections:['[Intro]','[Verse 1]','[Pre-Chorus]','[Chorus]','[Instrumental Break]','[Verse 2]','[Brass Solo]','[Final Chorus]','[Outro]'],dirs:['[Strong Groove]','[Music: walking upright bass]','[Music: punchy brass section]','[Style: playful, quirky]']},
    {name:'Metalcore',badge:'Metal',sections:['[Intro]','[Verse 1]','[Pre-Chorus]','[Chorus]','[Breakdown]','[Verse 2]','[Bridge]','[Heavy Breakdown]','[Final Chorus]','[Outro]'],dirs:['[Growled Vocal]','[Clean Vocal]','[Half-Time Breakdown]','[Explosive Crescendo]']},
    {name:'Viking Folk',badge:'Folk',sections:['[Instrumental Intro]','[Verse 1]','[Chorus]','[Verse 2]','[Instrumental Break]','[Bridge]','[Final Chorus]','[Outro]'],dirs:['[Deep Male Vocal]','[Dark Choir]','[Style: ritualistic, primal]','[Gradual Build]']},
    {name:'EDM Festival',badge:'EDM',sections:['[Intro]','[Build-Up]','[Drop]','[Break]','[Verse]','[Pre-Drop]','[Second Drop]','[Final Drop]','[Outro]'],dirs:['[Four-on-the-Floor]','[Sidechain Compression]','[Silence Before Drop]','[Constant High Energy]']},
    {name:'K-Pop',badge:'Pop',sections:['[Intro]','[Verse 1]','[Pre-Chorus]','[Chorus]','[Rap Verse]','[Verse 2]','[Pre-Chorus]','[Chorus]','[Dance Break]','[Final Chorus]','[Outro]'],dirs:['[Alternating Vocals]','[Layered Vocals]','[Dynamic Contrast]','[Polished Production]']},
    {name:'Cinematic Story',badge:'Score',sections:['[Opening]','[Verse 1]','[Build]','[Chorus]','[Interlude]','[Verse 2]','[Climax]','[Finale]','[Coda]'],dirs:['[Narrated Vocal]','[Orchestral Arrangement]','[Slow Crescendo]','[Massive Climax]']}
  ];

  const COMBOS = [
    {name:'Anime Power Chorus',genre:'Anime',tags:['[Chorus]','[Female Vocal]','[Powerful Vocal]','[Choir: wide, cinematic]','[Style: energetic, uplifting]','[Huge Cinematic Finale]']},
    {name:'Electro Swing Verse',genre:'Swing',tags:['[Verse 1]','[Male Vocal]','[Music: walking upright bass]','[Music: punchy brass section]','[Style: playful, quirky]','[Strong Groove]']},
    {name:'Viking Ritual Intro',genre:'Viking',tags:['[Intro]','[Deep Male Spoken Vocal]','[Dark Choir]','[Style: ritualistic, primal]','[Gradual Build]','[Sparse Arrangement]']},
    {name:'Metalcore Breakdown',genre:'Metal',tags:['[Heavy Breakdown]','[Growled Vocal]','[Half-Time Breakdown]','[Music: distorted guitars]','[Sudden Silence]','[Peak Intensity]']},
    {name:'Emotional Piano Bridge',genre:'Ballad',tags:['[Bridge]','[Broken Vocal]','[Music: gentle piano melody]','[Style: emotional, vulnerable]','[Slow Crescendo]']},
    {name:'Festival Drop',genre:'EDM',tags:['[Drop]','[Instrumental: Synth Lead]','[Music: deep sub bass]','[Music: heavy drums]','[Sidechain Compression]','[Constant High Energy]']},
    {name:'Cinematic Final Chorus',genre:'Cinematic',tags:['[Final Chorus]','[Powerful Vocal]','[Massive Choir]','[Orchestral Arrangement]','[Explosive Crescendo]','[Wide Stereo Mix]']},
    {name:'Intimate Story Verse',genre:'Story',tags:['[Verse 1]','[Close-Mic Vocal]','[Style: warm, intimate, storytelling]','[Sparse Arrangement]','[Controlled Dynamics]']}
  ];

  let favorites = loadJSON(STORAGE_FAV, []);
  let openCats = loadJSON(STORAGE_OPEN, ['Sections','Vocals']);
  const $ = id => document.getElementById(id);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function loadJSON(key, fallback){try{return JSON.parse(localStorage.getItem(key)) ?? fallback}catch{return fallback}}
  function saveJSON(key, value){try{localStorage.setItem(key, JSON.stringify(value))}catch{}}
  function lang(){return (window.currentUiLanguage || localStorage.getItem('nordlicht-ui-language') || document.documentElement.lang || 'en').toLowerCase().startsWith('de')?'de':'en'}
  function t(key){return (TEXT[lang()]||TEXT.en)[key]||TEXT.en[key]||key}
  function toast(msg){if(typeof window.showToast==='function')window.showToast(msg);else{const e=$('toast');if(e){e.textContent=msg;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),1300)}}}
  function insertTags(tags, replace=false){const area=$('customMetaTags');if(!area)return;const normalized=[...new Set(tags)].join('\n');area.value=replace?normalized:[area.value.trim(),normalized].filter(Boolean).join('\n');area.dispatchEvent(new Event('input',{bubbles:true}));area.dispatchEvent(new Event('change',{bubbles:true}));if(typeof window.generateOutput==='function')window.generateOutput();toast(replace?t('replaced'):t('inserted'))}

  function reliabilityIcon(level){return level==='core'?'🟢':level==='advanced'?'🟡':'🟠'}
  function categoryName(key){return (categoryLabels[lang()]||categoryLabels.en)[key]||key}

  function renderLibrary(){
    const host=$('piTagLibrary'); if(!host)return;
    const q=($('piTagSearch')?.value||'').trim().toLowerCase();
    const cat=$('piCategoryFilter')?.value||'all';
    const rel=$('piReliabilityFilter')?.value||'all';
    const favOnly=$('piFavoritesOnly')?.checked;
    let total=0;
    const html=[];
    for(const key of DATA.categoryOrder||Object.keys(DATA.categories)){
      if(cat!=='all'&&cat!==key)continue;
      const tags=(DATA.categories[key]||[]).filter(tag=>{
        const level=DATA.metadata?.[tag]?.level||'advanced';
        return (!q||tag.toLowerCase().includes(q))&&(rel==='all'||level===rel)&&(!favOnly||favorites.includes(tag));
      });
      if(!tags.length)continue; total+=tags.length;
      const shouldOpen=q||cat!=='all'||openCats.includes(key);
      html.push(`<details class="pi-category" data-pi-category="${esc(key)}" ${shouldOpen?'open':''}><summary><span>${esc(categoryName(key))}</span><span class="pi-badge">${tags.length}</span></summary><div class="pi-category-tags">${tags.map(tag=>{const level=DATA.metadata?.[tag]?.level||'advanced';return `<span class="pi-tag-item"><button class="pi-tag-insert" data-pi-tag="${esc(tag)}">${esc(tag)} <span class="pi-reliability" title="${esc(level)}">${reliabilityIcon(level)}</span></button><button class="pi-tag-star ${favorites.includes(tag)?'active':''}" data-pi-fav="${esc(tag)}" title="Favorite">★</button></span>`}).join('')}</div></details>`);
    }
    host.innerHTML=html.length?html.join(''):`<div class="pi-empty">${esc(t('none'))}</div>`;
    $('piTagCount').textContent=`${total} ${t('tags')}`;
    host.querySelectorAll('[data-pi-tag]').forEach(b=>b.onclick=()=>insertTags([b.dataset.piTag]));
    host.querySelectorAll('[data-pi-fav]').forEach(b=>b.onclick=e=>{e.stopPropagation();const tag=b.dataset.piFav;favorites=favorites.includes(tag)?favorites.filter(x=>x!==tag):[...favorites,tag];saveJSON(STORAGE_FAV,favorites);renderLibrary()});
    host.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',()=>{const key=d.dataset.piCategory;openCats=d.open?[...new Set([...openCats,key])]:openCats.filter(x=>x!==key);saveJSON(STORAGE_OPEN,openCats)}));
  }

  function renderMaps(){const host=$('piSongMaps');if(!host)return;host.innerHTML=SONG_MAPS.map((m,i)=>`<article class="pi-smart-card"><h3>${esc(m.name)} <span class="pi-badge">${esc(m.badge)}</span></h3><code>${esc(m.sections.join('\n'))}</code><div class="pi-card-actions"><button data-map-append="${i}">${t('append')}</button><button class="primary" data-map-replace="${i}">${t('replace')}</button></div></article>`).join('');host.querySelectorAll('[data-map-append]').forEach(b=>b.onclick=()=>applyMap(+b.dataset.mapAppend,false));host.querySelectorAll('[data-map-replace]').forEach(b=>b.onclick=()=>applyMap(+b.dataset.mapReplace,true))}
  function applyMap(i,replace){const m=SONG_MAPS[i];insertTags([...m.sections,...($('piMapsIncludeDirections')?.checked?m.dirs:[])],replace)}

  function currentValues(){
    const val=id=>$(id)?.value||'None';
    const instruments=[...document.querySelectorAll('#selectedInstruments .chip')].map(x=>x.textContent.replace('×','').trim()).filter(Boolean);
    const voice=[val('leadVoice'),val('secondVoice'),val('choir')].filter(x=>x&&x!=='None');
    const genre=[val('genreFamily'),val('subgenre'),val('secondGenre')].filter(x=>x&&x!=='None');
    const bpm=val('bpm');
    return {genre,voice,instruments,bpm};
  }
  function dnaTags(v){const ctx=(v.genre.join(' ')+' '+v.voice.join(' ')).toLowerCase();const tags=[];if(/anime|j-pop/.test(ctx))tags.push('[Style: energetic, uplifting]','[Powerful Vocal]','[Building Intensity]');if(/metal|rock/.test(ctx))tags.push('[Music: distorted guitars]','[Dynamic Contrast]','[Peak Intensity]');if(/swing|jazz/.test(ctx))tags.push('[Strong Groove]','[Music: walking upright bass]','[Music: punchy brass section]');if(/viking|folk|nordic/.test(ctx))tags.push('[Style: ritualistic, primal]','[Dark Choir]','[Gradual Build]');if(/edm|house|techno|trance/.test(ctx))tags.push('[Four-on-the-Floor]','[Sidechain Compression]','[Silence Before Drop]');if(v.voice.some(x=>/female/i.test(x)))tags.push('[Female Vocal]');if(v.voice.some(x=>/male/i.test(x)))tags.push('[Male Vocal]');if(v.voice.some(x=>/choir/i.test(x)))tags.push('[Layered Choir]');return [...new Set(tags.length?tags:['[Style: dynamic, expressive]','[Gradual Build]','[Dynamic Mix]'])]}
  function renderDna(){const host=$('piDnaOverview');if(!host)return;const v=currentValues();const tags=dnaTags(v);host.dataset.tags=JSON.stringify(tags);const boxes=[[t('genre'),v.genre],[t('tempo'),[`${v.bpm} BPM`]],[t('vocals'),v.voice],[t('instruments'),v.instruments.slice(0,8)],[t('recommended'),tags]];host.innerHTML=boxes.map(([title,items])=>`<div class="pi-dna-box"><h3>${esc(title)}</h3>${items.length?`<ul>${items.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:`<small>—</small>`}</div>`).join('')}

  function renderCombos(){const host=$('piTagCombos');if(!host)return;const q=($('piComboSearch')?.value||'').toLowerCase();const list=COMBOS.filter(c=>!q||(c.name+' '+c.genre+' '+c.tags.join(' ')).toLowerCase().includes(q));host.innerHTML=list.length?list.map((c,i)=>`<article class="pi-smart-card"><h3>${esc(c.name)} <span class="pi-badge">${esc(c.genre)}</span></h3><code>${esc(c.tags.join('\n'))}</code><div class="pi-card-actions"><button class="primary" data-combo="${COMBOS.indexOf(c)}">${t('insert')}</button></div></article>`).join(''):`<div class="pi-empty">${esc(t('none'))}</div>`;host.querySelectorAll('[data-combo]').forEach(b=>b.onclick=()=>insertTags(COMBOS[+b.dataset.combo].tags))}

  function localize(){
    const set=(id,key)=>{const e=$(id);if(e)e.textContent=t(key)};
    set('piMainTitle','title');set('piMainSubtitle','sub');set('piTabLibrary','library');set('piTabMaps','maps');set('piTabDna','dna');set('piTabCombos','combos');set('piFavOnlyLabel','favOnly');set('piLibraryHint','hint');set('piMapsTitle','mapsTitle');set('piMapsDesc','mapsDesc');set('piDirectionsLabel','directions');set('piDnaTitle','dnaTitle');set('piDnaDesc','dnaDesc');set('piRefreshDna','refresh');set('piApplyDnaTags','applyDna');set('piCombosTitle','combosTitle');set('piCombosDesc','combosDesc');set('piClassicSummary','classic');
    if($('piTagSearch'))$('piTagSearch').placeholder=t('search');if($('piComboSearch'))$('piComboSearch').placeholder=t('comboSearch');
    const cat=$('piCategoryFilter');if(cat){cat.innerHTML=`<option value="all">${esc(t('allCats'))}</option>`+(DATA.categoryOrder||Object.keys(DATA.categories)).map(k=>`<option value="${esc(k)}">${esc(categoryName(k))}</option>`).join('')}
    const rel=$('piReliabilityFilter');if(rel){const value=rel.value;rel.options[0].textContent=t('allRatings');rel.value=value}
    const nav=document.querySelector('.nav[data-view="metatagsView"] b');if(nav)nav.textContent='Prompt Intelligence';
    const small=document.querySelector('.nav[data-view="metatagsView"] small');if(small)small.textContent=lang()==='de'?'MetaTags, Song Maps & Prompt DNA':'MetaTags, Song Maps & Prompt DNA';
    renderLibrary();renderMaps();renderDna();renderCombos();
  }

  function init(){
    if(!$('piTagLibrary'))return;
    document.querySelectorAll('[data-pi-tab]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-pi-tab]').forEach(x=>x.classList.toggle('active',x===b));document.querySelectorAll('[data-pi-panel]').forEach(p=>p.classList.toggle('active',p.dataset.piPanel===b.dataset.piTab));if(b.dataset.piTab==='dna')renderDna()});
    ['piTagSearch','piComboSearch'].forEach(id=>$(id)?.addEventListener('input',id==='piTagSearch'?renderLibrary:renderCombos));
    ['piCategoryFilter','piReliabilityFilter','piFavoritesOnly'].forEach(id=>$(id)?.addEventListener('change',renderLibrary));
    $('piRefreshDna')?.addEventListener('click',renderDna);
    $('piApplyDnaTags')?.addEventListener('click',()=>{let tags=[];try{tags=JSON.parse($('piDnaOverview').dataset.tags||'[]')}catch{}insertTags(tags)});
    window.NSWPromptIntelligence={refreshLanguage:localize,renderLibrary,renderDna};
    localize();
    const langBtn=$('languageButton');langBtn?.addEventListener('click',()=>setTimeout(localize,80));
    const observer=new MutationObserver(()=>{if(document.documentElement.lang) localize()});observer.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }
  document.addEventListener('DOMContentLoaded',init);
})();

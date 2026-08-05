const SONG_TYPES=[
"None","Standard Song","Single","Album Track","Story Song","Concept Song","Narrative Ballad","Duet","Ensemble Song","A Cappella Song","Instrumental Track",
"Intro","Outro","Interlude","Prelude","Epilogue","Overture","Theme Song","Main Theme","Reprise",
"Anime Opening","Anime Ending","Anime Insert Song","Anime Character Theme","Anime Rival Theme","Anime Transformation Theme","Shonen Power-Up Theme","Slice of Life Theme","Emotional Anime Ending",
"Game Main Menu Theme","Game Battle Theme","Boss Fight","Final Boss Theme","Dungeon Theme","Exploration Theme","Town Theme","Tavern Theme","Victory Theme","Defeat Theme","Stealth Theme","Character Select Theme","Credits Theme","Level Theme","Raid Theme",
"Film Score Cue","Cinematic Opening","Cinematic Finale","Trailer","Teaser Trailer","Action Trailer","Drama Trailer","Horror Trailer","Love Theme","Suspense Theme","Chase Scene","Montage Theme","End Credits Theme",
"Festival Anthem","Club Mix","Radio Edit","Extended Mix","VIP Mix","Remix","Dancefloor Anthem","Hardstyle Anthem","Future Bass Anthem","Rave Intro","DJ Tool",
"Rock Anthem","Metal Anthem","Power Ballad","Breakdown Song","Guitar Showcase","Viking Anthem","War Chant","Battle Theme","Final Battle","Ritual Song","Dark Ballad",
"Pop Anthem","Summer Hit","Radio Hit","Acoustic Version","Piano Version","Unplugged Version","Live Version","K-Pop Comeback","Idol Pop Single",
"Stadium Anthem","Football Team Anthem","Goal Celebration","Tournament Song","World Cup Anthem","Victory Celebration",
"YouTube Intro","YouTube Outro","Background Music","Podcast Intro","Podcast Bed","Stream Starting Theme","Short-Form Hook","Advertisement Jingle",
"Christmas Song","Winter Theme","Wedding Song","Birthday Song","Lullaby","Meditation Track","Sleep Music","Workout Track"
]
const LANGUAGES=["None","Mandarin Chinese lyrics","Spanish lyrics","English lyrics","Hindi lyrics","Portuguese lyrics","Bengali lyrics","Russian lyrics","Japanese lyrics","Western Punjabi lyrics","Marathi lyrics","Telugu lyrics","Wu Chinese lyrics","Turkish lyrics","Korean lyrics","French lyrics","German lyrics","Vietnamese lyrics","Tamil lyrics","Yue Chinese (Cantonese) lyrics","Urdu lyrics","Danish lyrics","Old Danish (Viking Age) lyrics","Norwegian lyrics","Swedish lyrics","Finnish lyrics","Mixed-language lyrics","Latin phrases"];
const VOICE_FX=["None","Natural","Cinematic Reverb","Ghostly Echoes","Short Delay Throws","Vocoder Texture","Robot Processing","Light Distortion","Wide Harmonizer","Radio Effect"];
const CHOIRS=["None","SATB Choir","Ancient Choir","Deep Male Choir","Ethereal Female Choir","Layered Viking Chants","Gang Shouts","Children's Choir","Celestial Choir"];
const SECOND_VOICES=["None","Deep Male Vocal Spoken","Female Vocal Spoken","Whispered Narrator","Robotic Spoken Voice","Male and Female Duet","Occasional Male Harmony","Occasional Female Harmony"];
const SEPARATIONS=["None","Single lead only","Clear voice separation","Dialogue-only second voice","No male singing","No female singing","Named character separation","Merged dual vocals in chorus"];
const VOCAL_EXTRAS=["Female Screams","Male Growls","Whispers","Shouted Hooks","Layered Harmonies","A cappella Break","Ad-libs","Call and Response","Breathy Delivery","Operatic Peaks","Gang Chants","Vocal Drone"];
const PRODUCTIONS=["None","Studio Quality Production","Cinematic Production","Modern Anime Production","Festival Production","Hybrid Production","Futuristic Production","Raw Organic Production","AAA Game Soundtrack Production","Trailer Music Production"];
const MIXES=["None","Wide Stereo Mix","Bright Modern Mix","Dark and Moody Mix","Huge Low-End Mix","Clean and Polished Mix","Raw and Organic Mix","High Fidelity Mix","Layered and Dense Mix","Dynamic Mix"];
const DYNAMICS=["None","Gradual Build-Up","Verse restrained, chorus explosive","Soft intro, huge finale","Drop-driven arrangement","Wide cinematic dynamics","Constant high energy","Abrupt contrast sections","Two massive drop points"];
const PRODUCTION_EXTRAS=["Massive Bass Drops","Anthemic Chorus","Layered Vocals","Huge Cinematic Finale","Emotional Climax","Bright and Brutal Mix","Wide Stereo Image","Punchy Transients","Deep Sub Weight","Modern Master","Studio Quality","Dynamic Arrangement","Analog Warmth","Tape Saturation","Clear Vocal Presence","Controlled Low End","Natural Room Ambience","No drums during intro"];
const DRUM_MIXES=["None","Punchy Drums","Tight Dry Drums","Huge Room Drums","Warm Vintage Drums","Compressed Modern Drums","Natural Live Drums","Deep Electronic Drums"];
const VOCAL_PRODUCTIONS=["None","Intimate Close-Mic Vocal","Clean Centered Vocal","Layered Wide Vocals","Double-Tracked Lead Vocal","Airy Vocal Reverb","Large Hall Vocal","Short Vocal Delay","Raw Natural Vocal"];
const MASTERING_STYLES=["None","Modern Streaming Master","Radio-Ready Master","Dynamic Cinematic Master","Warm Analog Master","Tape-Saturated Master","High-Fidelity Master","Loud Club Master","Natural Acoustic Master"];
const RHYTHM_FEELS=["None","Straight","Swing","Shuffle","Half-Time","Double-Time","Triplet Feel","Syncopated","Driving","Bouncy","Marching","Floating","Heavy","Relaxed"];
const TEMPO_CHARACTERS=["None","Very Slow","Slow","Mid-Tempo","Upbeat","Fast","Extreme"];
const SONG_ENERGY_PROFILES=["None","Calm","Balanced","Building","Explosive","Extreme"];
const HARMONY_MODES=["None","Major","Minor","Modal","Power Chords","Open Chords","Suspended Chords","Chromatic Harmony","Rich Extended Chords"];
const HARMONY_COMPLEXITIES=["None","Simple","Moderate","Rich","Complex","Progressive"];
const MELODY_MOTIONS=["None","Hook-Driven","Ascending","Descending","Repeated Motif","Call and Response","Counter-Melody","Wide Melodic Range","Narrow Intimate Range"];
const THEORY_DYNAMICS=["None","Quiet Verse, Explosive Chorus","Gradual Build","Emotional Lift","Massive Crescendo","Sudden Stop","Controlled Contrast","Huge Finale"];
const EXCLUDES=["Comedy","Country","Ukulele","Cheerful Pop","Lo-fi","Jazz","Trap hi-hats","Chipmunk vocals","Excessive autotune","Reggae","Funk","Minimalist production","Acoustic-only","Happy children music"];
const META_STRUCTURE=["Intro","Verse 1","Pre-Chorus","Chorus","Verse 2","Bridge","Break","Instrumental Break","Instrumental Solo","Final Chorus","Outro","End"];
const META_MUSIC=[
 "Gentle piano melody, very soft and warm","Soft strings","Acoustic guitar strums","Heavy drums kick in",
 "Rhythmic clapping and stomping beat","Tension building","Abrupt silence","Beat drops out briefly",
 "Chaotic strings and heavy drums","Stadium crowd ambience","Big applause and cheering","Distant chanting",
 "Rain ambience","Thunder","Wind ambience","Church bells","Fire crackling","Ocean waves","Heartbeat",
 "Clock ticking","Breathing","Footsteps","Battlefield ambience","Magic ambience","Space ambience",
 "No drums during intro","Drums get faster","Bass and drums groove","Huge cinematic percussion"
];
const META_VOICES=[
 "Female Vocal","Male Vocal","Deep Male Vocal Spoken","Female Vocal Spoken","Spoken Word","Whispered Vocal",
 "Warm Intimate Vocal","Lovely Voice","Crying Voice","Broken Voice","Trembling Voice","Angry Voice",
 "Empowered Voice","Soft Voice","Aggressive Gritty Vocal","Breathy Vocal","Operatic Lead","Powerful Belt",
 "Scream","Growls","Gang Shouts","Clear voice separation"
];
const META_STYLES=[
 "Warm and intimate","Storytelling vibe","Soft and sweet","Gentle build-up","Building tension","Emotional",
 "Melodic and open","Soaring and anthemic","Explosive and huge","Aggressive and gritty","Dark and mysterious",
 "Sad and breaking","Cold and restrained","Heroic and triumphant","Dreamlike and ethereal","Festival-ready",
 "Clear pronunciation","Maximum energy","Slowly rising intensity","Huge cinematic finale"
];
const META_ADLIBS=["Yeah!","Uh-huh!","Hey!","Woo!","Oh!","Let's go!","Come on!","Here we go!","No!","Run!","Fight!","One more time!","Hands up!"];
const META_CHOIRS=[
 "SATB Choir, layered vocals, big singalong","Full Opera Choir","Deep Male Choir","Ethereal Female Choir",
 "Children's Choir","Gregorian Choir","Epic Cinematic Choir","Layered Viking Chants","Gang Choir"
];

const ENERGY_LIBRARY={"Ruhig / Minimal":["Whisper Quiet","Calm","Peaceful","Gentle","Slow Burn","Minimal Energy","Ambient Flow","Dream Drift","Weightless"],"Aufbau / Steigend":["Building","Gradual Build","Rising Energy","Growing Intensity","Slow Crescendo","Tension Rising","Hero Awakening","Climactic Build"],"Mittlere Energie":["Driving","Steady Pulse","Confident","Rhythmic","Focused","Balanced","Grooving","Controlled Power"],"Hohe Energie":["Explosive","Arena Energy","Maximum Energy","Full Throttle","Relentless","Adrenaline Rush","Berserker Mode","Limit Break"],"Chaotisch / Wild":["Chaotic","Unpredictable","Frenetic","Controlled Chaos","Wild Energy","Cataclysmic","Volatile"],"Elektronisch / Club":["Festival Energy","EDM Build","Massive Drop","Dancefloor Drive","Hardstyle Drive","Techno Momentum","Drum & Bass Rush"],"Metal / Heavy":["Double Bass Assault","Blast Beat","Wall of Sound","Crushing","Heavy Breakdown","Viking Charge","Deathcore Slam"],"Anime / Cinematic":["Opening Energy","Final Battle","Hero Theme","Emotional Climax","Shonen Power Up","Ultimate Awakening","Last Stand"],"Orchestral / Monumental":["Majestic","Monumental","Grand Finale","Epic Crescendo","Triumphant","Cinematic Sweep","Orchestral Thunder"]};

const flatten=o=>Object.values(o||{}).flat();
const WORLDS=["None",...flatten(STORY_LIBRARY.worlds).filter(x=>x!=="None")];
const EMOTIONS=["None",...flatten(STORY_LIBRARY.emotions).filter(x=>x!=="None")];
const SCENES=flatten(STORY_LIBRARY.scenes);
const ATMOSPHERES=flatten(STORY_LIBRARY.atmospheres);
const NARRATIVES=flatten(STORY_LIBRARY.narratives);
const appState={structureInitialized:false,voiceCharacters:[],vocalExtras:[],instruments:[],energyStyles:[],productionExtras:[],excludes:[],metaStructure:[],metaMusic:[],metaVoices:[],metaStyles:[],metaAdlibs:[],metaChoirs:[],presets:[],favorites:[],itemFavorites:{genres:[],instruments:[],voices:[]},history:[],activePresetTab:"presets",scoreWhy:[]};

const id=x=>document.getElementById(x),pick=a=>a[Math.floor(Math.random()*a.length)],shuffleArray=a=>[...a].sort(()=>Math.random()-.5),unique=a=>[...new Set(a.filter(Boolean))];
const escapeHTML=s=>String(s??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll('"',"&quot;");
function fillSelect(el,items){el.innerHTML=items.map(v=>`<option value="${escapeHTML(v)}">${escapeHTML(typeof libraryLabel==="function"?libraryLabel(v,el.id):v)}</option>`).join("")}
function showToast(text){const t=id("toast");t.textContent=text;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1300)}
function csv(text){return String(text||"").split(",").map(x=>x.trim()).filter(Boolean)}
function toggleArray(key,value){appState[key]=appState[key].includes(value)?appState[key].filter(x=>x!==value):[...appState[key],value]}
function toggleItemFavorite(type,value){const list=appState.itemFavorites[type]||[];appState.itemFavorites[type]=list.includes(value)?list.filter(x=>x!==value):[...list,value];renderDynamicLists();updateFavoriteGenreButton();persist()}
function renderChips(container,items,key){const favType=key==="voiceCharacters"?"voices":null;container.innerHTML=items.map(v=>favType?`<span class="chip-with-star"><span class="chip ${appState[key].includes(v)?"active":""}" data-v="${escapeHTML(v)}">${escapeHTML(typeof libraryLabel==="function"?libraryLabel(v,key):v)}</span><button class="chip-favorite ${appState.itemFavorites[favType].includes(v)?"active":""}" data-fav="${escapeHTML(v)}" title="Favorit">★</button></span>`:`<span class="chip ${appState[key].includes(v)?"active":""}" data-v="${escapeHTML(v)}">${escapeHTML(typeof libraryLabel==="function"?libraryLabel(v,key):v)}</span>`).join("");container.querySelectorAll(".chip").forEach(c=>c.onclick=()=>{toggleArray(key,c.dataset.v);renderDynamicLists();generateOutput()});container.querySelectorAll(".chip-favorite").forEach(b=>b.onclick=e=>{e.stopPropagation();toggleItemFavorite(favType,b.dataset.fav)})}
function renderSelected(container,items,key){container.innerHTML=items.length?items.map(v=>`<span class="chip active" data-v="${escapeHTML(v)}">${escapeHTML(typeof libraryLabel==="function"?libraryLabel(v,key):v)} ×</span>`).join(""):`<small>${fullUiText("dynamic_no_selection")}</small>`;container.querySelectorAll(".chip").forEach(c=>c.onclick=()=>{toggleArray(key,c.dataset.v);renderDynamicLists();generateOutput()})}
function refreshSubgenres(){fillSelect(id("subgenre"),GENRE_LIBRARY[id("genreFamily").value]||[])}
function refreshLeadVoices(){const cat=id("leadVoiceCategory").value;if(cat==="None"){fillSelect(id("leadVoice"),["None"]);return}fillSelect(id("leadVoice"),["None",...(LEAD_VOICE_LIBRARY[cat]||[]).filter(x=>x!=="None")])}
function voiceCharactersFiltered(){const cat=id("voiceCharacterCategory").value,q=id("voiceSearch").value.toLowerCase();const source=cat==="All"?flatten(VOICE_CHARACTER_LIBRARY):VOICE_CHARACTER_LIBRARY[cat]||[];return unique(source).filter(x=>(!q||x.toLowerCase().includes(q))&&(!id("favoriteVoicesOnly")?.checked||appState.itemFavorites.voices.includes(x)))}
function energyFiltered(){const q=id("energySearch").value.toLowerCase();return (ENERGY_LIBRARY[id("energyCategory").value]||[]).filter(x=>!q||x.toLowerCase().includes(q))}
function allInstrumentRegions(){return unique(INSTRUMENT_DB.map(x=>x.region)).sort()}
function countriesForRegion(region){
 const source=region==="Alle Regionen"?INSTRUMENT_DB:INSTRUMENT_DB.filter(x=>x.region===region);
 return unique(source.map(x=>x.country)).sort();
}
function familiesForInstrumentFilters(region,country){
 return unique(INSTRUMENT_DB.filter(x=>(region==="Alle Regionen"||x.region===region)&&(country==="All Countries"||x.country===country)).map(x=>x.family)).sort();
}
function refreshInstrumentFilters(changed="region"){
 const region=id("instrumentRegion").value||"Alle Regionen";
 const previousCountry=id("instrumentCountry").value||"All Countries";
 const countries=["All Countries",...countriesForRegion(region)];
 fillSelect(id("instrumentCountry"),countries);
 id("instrumentCountry").value=countries.includes(previousCountry)?previousCountry:"All Countries";
 const previousFamily=id("instrumentFamily").value||"Alle Familien";
 const families=["Alle Familien",...familiesForInstrumentFilters(region,id("instrumentCountry").value)];
 fillSelect(id("instrumentFamily"),families);
 id("instrumentFamily").value=families.includes(previousFamily)?previousFamily:"Alle Familien";
}
function instrumentsFiltered(){
 const r=id("instrumentRegion").value,c=id("instrumentCountry").value,f=id("instrumentFamily").value,q=id("instrumentSearch").value.trim().toLowerCase();
 const reliability=id("instrumentReliability")?.value||"all"; return INSTRUMENT_DB.filter(x=>(r==="Alle Regionen"||x.region===r)&&(c==="All Countries"||x.country===c)&&(f==="Alle Familien"||x.family===f)&&(!q||(x.name+" "+x.country+" "+x.region+" "+x.family).toLowerCase().includes(q))&&(reliability==="all"||typeof instrumentReliability!=="function"||instrumentReliability(x).level===reliability)&&(!id("favoriteInstrumentsOnly")?.checked||appState.itemFavorites.instruments.includes(x.name)));
}
function renderGenreIntelligence(){
 const host=id("genreSuggestions");if(!host||typeof genreSuggestionsForCurrentStyle!=="function")return;
 const data=genreSuggestionsForCurrentStyle();
 const chip=(value,type)=>`<button class="suggestion-chip" data-suggestion-type="${type}" data-value="${escapeHTML(value)}">${escapeHTML(value)}</button>`;
 host.innerHTML=`
  <div class="suggestion-group"><strong>Passendes Zweitgenre</strong><div class="suggestion-chips">${data.partners.map(x=>chip(x,"genre")).join("")||"–"}</div></div>
  <div class="suggestion-group"><strong>Empfohlene Songtypen</strong><div class="suggestion-chips">${data.songTypes.map(x=>chip(x,"song")).join("")||"–"}</div></div>
  <div class="suggestion-group"><strong>Typischer BPM-Bereich</strong><div class="suggestion-chips"><button class="suggestion-chip" data-suggestion-type="bpm" data-value="${Math.round((data.bpm[0]+data.bpm[1])/2)}">${data.bpm[0]}–${data.bpm[1]} BPM</button></div></div>`;
 host.querySelectorAll("[data-suggestion-type]").forEach(btn=>btn.onclick=()=>{
   const type=btn.dataset.suggestionType,value=btn.dataset.value;
   if(type==="genre")id("secondGenre").value=value;
   if(type==="song"&&[...id("songType").options].some(o=>o.value===value))id("songType").value=value;
   if(type==="bpm"){id("bpm").value=value;updateBpmDisplay()}
   generateOutput();
 });
}
function renderInstrumentRecommendations(){
 const host=id("instrumentRecommendations");if(!host||typeof recommendedInstrumentsForCurrentStyle!=="function")return;
 const items=recommendedInstrumentsForCurrentStyle(10);
 host.innerHTML=items.length?items.map(name=>{const fit=typeof instrumentFitScore==="function"?instrumentFitScore(name,id("genreFamily").value,id("subgenre").value):0;return `<button class="recommendation-chip" data-instrument-rec="${escapeHTML(name)}">+ ${escapeHTML(name)} <span class="fit-badge">${fit}%</span></button>`}).join(""):'<small>Wähle zuerst ein Genre, um passende Instrumente zu erhalten.</small>';
 host.querySelectorAll("[data-instrument-rec]").forEach(btn=>btn.onclick=()=>{const name=btn.dataset.instrumentRec;if(!appState.instruments.includes(name))appState.instruments.push(name);renderDynamicLists();generateOutput()});
}
function renderInstruments(){
 const items=instrumentsFiltered();
 id("instrumentCount").textContent=`${items.length} / ${INSTRUMENT_DB.length}`;
 const hint=id("instrumentEmptyHint");if(hint)hint.hidden=items.length!==0;
 id("instrumentLibrary").innerHTML=items.map(x=>{const rel=typeof instrumentReliability==="function"?instrumentReliability(x):{level:"advanced",label:"Advanced",score:64};return `<div class="instrument-card ${appState.instruments.includes(x.name)?"active":""}" data-v="${escapeHTML(x.name)}"><button class="favorite-star ${appState.itemFavorites.instruments.includes(x.name)?"active":""}" data-fav-instrument="${escapeHTML(x.name)}" title="Favorit">★</button><strong>${escapeHTML(typeof libraryLabel==="function"?libraryLabel(x.name,"instrument"):x.name)}</strong><span class="reliability-badge ${rel.level}" title="Practical recognition estimate: ${rel.score}%">${rel.label}</span><small>${escapeHTML(typeof libraryLabel==="function"?libraryLabel(x.country,"country"):x.country)} · ${escapeHTML(typeof libraryLabel==="function"?libraryLabel(x.family,"family"):x.family)}</small></div>`}).join("");
 id("instrumentLibrary").querySelectorAll(".instrument-card").forEach(c=>c.onclick=e=>{if(e.target.closest("[data-fav-instrument]"))return;toggleArray("instruments",c.dataset.v);renderDynamicLists();generateOutput()});id("instrumentLibrary").querySelectorAll("[data-fav-instrument]").forEach(b=>b.onclick=e=>{e.stopPropagation();toggleItemFavorite("instruments",b.dataset.favInstrument)});
 renderSelected(id("selectedInstruments"),appState.instruments,"instruments");
}

function ensureBracketTag(value,prefix=""){
 const raw=String(value||"").trim();
 if(!raw)return"";
 if(raw.startsWith("[")&&raw.endsWith("]"))return raw;
 return prefix?`[${prefix}: ${raw}]`:`[${raw}]`;
}
function customMetaTagLines(){
 return String(id("customMetaTags")?.value||"").split(/\n+/).map(x=>x.trim()).filter(Boolean).map(x=>ensureBracketTag(x));
}
function recommendedMetaTags(){
 const ctx=[
  id("genreFamily")?.value,id("subgenre")?.value,id("secondGenre")?.value,id("songType")?.value,
  id("leadVoice")?.value,id("choir")?.value,id("secondVoice")?.value,id("voiceSeparation")?.value,
  id("world")?.value,id("emotion")?.value,id("scene")?.value,id("atmosphere")?.value,
  id("production")?.value,id("mix")?.value,id("dynamics")?.value,
  ...appState.instruments,...appState.energyStyles,...appState.voiceCharacters,...appState.vocalExtras
 ].filter(Boolean).join(" ").toLowerCase();

 const result={structure:["Intro","Verse 1","Pre-Chorus","Chorus","Verse 2","Bridge","Final Chorus","Outro"],music:[],voices:[],styles:[],adlibs:[],choirs:[]};

 if(/piano|ballad|melancholic|sad|emotional/.test(ctx))result.music.push("Gentle piano melody, very soft and warm","Soft strings");
 if(/folk|acoustic|guitar|uilleann|qanun|mbira/.test(ctx))result.music.push("Acoustic guitar strums");
 if(/metal|rock|heavy|war drum|chinese war drums|buk drum/.test(ctx))result.music.push("Heavy drums kick in","Tension building");
 if(/festival|stadium|anthem/.test(ctx))result.music.push("Stadium crowd ambience","Big applause and cheering");
 if(/burning|fire|cathedral/.test(ctx))result.music.push("Fire crackling","Church bells");
 if(/ocean|sea|uilleann/.test(ctx))result.music.push("Ocean waves");
 if(/cinematic|finale|orchestral/.test(ctx))result.music.push("Huge cinematic percussion");
 if(/no drums during intro/.test(ctx))result.music.push("No drums during intro");
 if(/drop|drop-driven/.test(ctx))result.music.push("Beat drops out briefly","Drums get faster");

 if(/female/.test(ctx))result.voices.push("Female Vocal");
 if(/male/.test(ctx)&&!/female only/.test(ctx))result.voices.push("Male Vocal");
 if(/deep male.*spoken|spoken.*male/.test(ctx))result.voices.push("Deep Male Vocal Spoken");
 if(/spoken word|mission briefing|narrat/.test(ctx))result.voices.push("Spoken Word");
 if(/opera|operatic/.test(ctx))result.voices.push("Operatic Lead");
 if(/cry|broken|melancholic|sad/.test(ctx))result.voices.push("Crying Voice","Broken Voice");
 if(/gang shout/.test(ctx))result.voices.push("Gang Shouts");
 if(/clear voice separation/.test(ctx))result.voices.push("Clear voice separation");

 if(/melancholic|sad|dark ballad/.test(ctx))result.styles.push("Sad and breaking","Emotional");
 if(/dark|ancient|abandoned|burning cathedral/.test(ctx))result.styles.push("Dark and mysterious");
 if(/kawaii|cute/.test(ctx))result.styles.push("Soft and sweet");
 if(/festival-ready|festival/.test(ctx))result.styles.push("Festival-ready");
 if(/climactic|gradual build|building/.test(ctx))result.styles.push("Gentle build-up","Building tension");
 if(/huge cinematic finale|cinematic/.test(ctx))result.styles.push("Huge cinematic finale");
 if(/metal|aggressive/.test(ctx))result.styles.push("Aggressive and gritty");
 if(/anime|heroic/.test(ctx))result.styles.push("Soaring and anthemic");

 if(/choir|opera/.test(ctx))result.choirs.push(/opera/.test(ctx)?"Full Opera Choir":"SATB Choir, layered vocals, big singalong");
 if(/gang/.test(ctx))result.choirs.push("Gang Choir");
 if(/viking|nordic/.test(ctx))result.choirs.push("Layered Viking Chants");

 const adlibEligible=currentVocalMode()!=="instrumental"&&!/ambient|orchestral|meditation|sleep|film score|background music/.test(ctx);
 const adlibRoll=[...ctx].reduce((a,ch)=>(a*31+ch.charCodeAt(0))%1000,17)/1000;
 if(adlibEligible&&/hip.?hop|rap|r&b|k-pop|idol pop/.test(ctx)&&adlibRoll<0.45)result.adlibs.push(["Yeah!","Uh-huh!","Hey!","Come on!"][Math.floor(adlibRoll*100)%4]);
 else if(adlibEligible&&/festival|stadium|anthem|anime opening/.test(ctx)&&adlibRoll<0.18)result.adlibs.push(["Hey!","Yeah!","Let's go!"][Math.floor(adlibRoll*100)%3]);
 else if(adlibEligible&&/battle|fight|metal/.test(ctx)&&adlibRoll<0.08)result.adlibs.push(["Fight!","Come on!"][Math.floor(adlibRoll*100)%2]);

 Object.keys(result).forEach(k=>result[k]=unique(result[k]));
 return result;
}

function normalizedSingerType(value){
 const v=String(value||"").toLowerCase();
 if(v.includes("female"))return"female";
 if(v.includes("male"))return"male";
 if(v.includes("choir"))return"choir";
 if(v.includes("spoken"))return"spoken";
 return"vocal";
}
function namedSingerData(){
 const enabled=Boolean(id("useNamedSingers")?.checked);
 const oneName=String(id("singerOneName")?.value||"").trim();
 const twoName=String(id("singerTwoName")?.value||"").trim();
 const oneVoice=String(id("singerOneVoice")?.value||"").trim();
 const twoVoice=String(id("singerTwoVoice")?.value||"").trim();
 const together=String(id("namedSingerTogether")?.value||"Both: together").trim();
 const mode=String(id("namedDuetMode")?.value||"clear voice separation").trim();
 return{enabled,oneName,twoName,oneVoice,twoVoice,together,mode};
}
function namedSingerHeaderTags(){
 const d=namedSingerData();
 if(!d.enabled||!d.oneName||!d.twoName)return[];
 const oneType=normalizedSingerType(d.oneVoice);
 const twoType=normalizedSingerType(d.twoVoice);
 const voiceParts=[];
 if(oneType==="male")voiceParts.push(`Male vocals: ${d.oneName}`);
 else if(oneType==="female")voiceParts.push(`Female vocals: ${d.oneName}`);
 else voiceParts.push(`${d.oneVoice||"Vocals"}: ${d.oneName}`);
 if(twoType==="male")voiceParts.push(`Male vocals: ${d.twoName}`);
 else if(twoType==="female")voiceParts.push(`Female vocals: ${d.twoName}`);
 else voiceParts.push(`${d.twoVoice||"Vocals"}: ${d.twoName}`);
 voiceParts.push(d.together);
 return[
  `[Duet – ${d.oneName} (${oneType}) & ${d.twoName} (${twoType})]`,
  `[${voiceParts.join(", ")}]`,
  `[Duet Mode: ${d.mode}]`
 ];
}
function namedSingerSectionTags(){
 const d=namedSingerData();
 if(!d.enabled||!d.oneName||!d.twoName)return[];
 return[`[${d.oneName}]`,`[${d.twoName}]`,`[Both]`];
}
function updateNamedSingerPreview(){
 if(!id("namedSingerPreview"))return;
 const tags=[...namedSingerHeaderTags(),...namedSingerSectionTags()];
 id("namedSingerPreview").value=tags.length?tags.join("\n"):"Enable named singers and assign two names.";
}


function metaSectionAware(){return id("sectionAwareMetaTags")?.checked!==false}
function metaAvoidRepetition(){return id("avoidMetaRepetition")?.checked!==false}

function sectionRole(section){
 const s=String(section||"").toLowerCase();
 if(s.includes("intro"))return"intro";
 if(s.includes("pre-chorus")||s.includes("pre chorus"))return"pre";
 if(s.includes("final chorus"))return"final";
 if(s.includes("chorus"))return"chorus";
 if(s.includes("verse"))return"verse";
 if(s.includes("bridge"))return"bridge";
 if(s.includes("break")||s.includes("solo"))return"break";
 if(s.includes("outro")||s.includes("end"))return"outro";
 return"other";
}
function chooseSectionTags(role,data){
 const pickTags=(list,start,count)=>list.slice(start,start+count);
 const result=[];
 const add=(...items)=>items.flat().filter(Boolean).forEach(x=>result.push(x));
 const lead=data.voices[0],second=data.voices[1];
 switch(role){
  case"intro":
   add(...pickTags(data.music,0,3),lead,...pickTags(data.styles,0,2));
   break;
  case"verse":
   add(lead,...pickTags(data.styles,0,2),data.music[0]);
   break;
  case"pre":
   add(data.styles.find(x=>/build|tension|rising/i.test(x))||data.styles[1],data.music.find(x=>/drum|tension|faster/i.test(x)),data.adlibTag);
   break;
  case"chorus":
   add(...pickTags(data.choirs,0,2),data.styles.find(x=>/anthem|explosive|huge|festival/i.test(x))||data.styles[0],second);
   break;
  case"bridge":
   add(second||lead,data.styles.find(x=>/dark|emotional|cold|dream/i.test(x))||data.styles[1],data.music.find(x=>/silence|strings|piano|tension/i.test(x)));
   break;
  case"break":
   add(data.music.find(x=>/solo|chaotic|drum|bass|silence/i.test(x))||data.music[1],data.styles.find(x=>/aggressive|maximum|huge/i.test(x)));
   break;
  case"final":
   add(...pickTags(data.choirs,0,2),data.styles.find(x=>/finale|maximum|huge|anthem|triumphant/i.test(x))||data.styles.at(-1),data.adlibTag);
   break;
  case"outro":
   add(data.music.find(x=>/piano|strings|soft|wind|ocean/i.test(x))||data.music.at(-1),data.voices.at(-1),data.styles.find(x=>/soft|dream|emotional|warm/i.test(x)));
   break;
  default:
   add(lead,data.styles[0]);
 }
 return result.filter(Boolean);
}

function splitMetaTag(tag){
 const raw=String(tag||"").trim();
 const m=raw.match(/^\[([^:\]]+):\s*(.*?)\]$/);
 if(m)return{prefix:m[1].trim(),values:m[2].split(/\s*,\s*/).filter(Boolean)};
 return{prefix:null,values:[raw]};
}
function normalizeMetaValue(value){return String(value||"").trim().replace(/[.;]+$/g,"")}
function aggregateSectionTags(tags){
 const order=[];const groups=new Map();const plain=[];
 tags.filter(Boolean).forEach(tag=>{
   const parsed=splitMetaTag(tag);
   if(!parsed.prefix){if(!plain.includes(tag))plain.push(tag);return}
   const key=parsed.prefix.toLowerCase();
   if(!groups.has(key)){groups.set(key,{prefix:parsed.prefix,values:[]});order.push(key)}
   const group=groups.get(key);
   parsed.values.map(normalizeMetaValue).filter(Boolean).forEach(value=>{
     if(!group.values.some(x=>x.toLowerCase()===value.toLowerCase()))group.values.push(value)
   });
 });
 return [...plain,...order.map(key=>{const g=groups.get(key);return `[${g.prefix}: ${g.values.join(", ")}]`})];
}

function optimizedSectionData(){
 const suggested=id("autoMetaTags")?.checked?recommendedMetaTags():{structure:[],music:[],voices:[],styles:[],adlibs:[],choirs:[]};
 const structure=(appState.metaStructure.length?[...appState.metaStructure]:[...suggested.structure]).map(x=>ensureBracketTag(x));
 const voices=unique([...appState.metaVoices,...suggested.voices]).map(x=>ensureBracketTag(x));
 const styles=unique([...appState.metaStyles,...suggested.styles]).map(x=>ensureBracketTag(x,"Style"));
 const music=unique([...appState.metaMusic,...suggested.music]).map(x=>ensureBracketTag(x,"Music"));
 const adlibs=unique([...appState.metaAdlibs,...suggested.adlibs]);
 const choirs=unique([...appState.metaChoirs,...suggested.choirs]).map(x=>ensureBracketTag(x,"Chorus"));
 return{
   structure:structure.length?structure:["[Intro]","[Verse 1]","[Pre-Chorus]","[Chorus]","[Verse 2]","[Bridge]","[Final Chorus]","[Outro]"],
   voices,styles,music,choirs,
   adlibTag:adlibs.length?ensureBracketTag(adlibs.slice(0,1).join(", "),"Ad libs"):null
 };
}
function pipeMetaTagsOutput(data){
 const blocks=[];
 const used=new Set();
 const singerSections=namedSingerSectionTags();
 const globalSingerDirections=namedSingerHeaderTags();
 data.structure.forEach((section,i)=>{
   const role=metaSectionAware()?sectionRole(section):"other";
   let tags=chooseSectionTags(role,data);
   if(i===0&&globalSingerDirections.length)tags.unshift(...globalSingerDirections);
   if(singerSections.length){
     if(i===1)tags.unshift(singerSections[0]);
     else if(i===2)tags.unshift(singerSections[1]);
     else if(i===3)tags.unshift(singerSections[2]);
   }
   if(metaAvoidRepetition()){
     tags=tags.filter(tag=>{
       const normalized=String(tag).toLowerCase();
       if(used.has(normalized)&&!/\[chorus:|\[ad libs:/i.test(tag))return false;
       used.add(normalized);return true;
     });
   }
   if(currentVocalMode()==="instrumental"){
     const engine=window.NSWMetaTagStackEngine;
     tags=tags.filter(tag=>engine?.normalizeDirective(tag)?.category!=="vocal");
     tags.unshift("[No Vocals]");
     if(i===0&&appState.instruments.length)tags.push(`[Instrumental: ${appState.instruments.join(", ")}]`);
   }
   tags=aggregateSectionTags(tags);
   const engine=window.NSWMetaTagStackEngine;
   const line=engine
    ?engine.createStack(section,tags,{sort:true}).line
    :`[${[String(section).replace(/^\[|\]$/g,''),...tags.map(tag=>String(tag).replace(/^\[|\]$/g,''))].join(' | ')}]`;
   blocks.push(line,"");
 });
 return blocks;
}
function metaTagsOutput(){
 const data=optimizedSectionData();
 const engine=window.NSWMetaTagStackEngine;
 let document=pipeMetaTagsOutput(data).join("\n").replace(/\n{3,}/g,"\n\n").trim();
 const custom=customMetaTagLines();
 if(custom.length){
  const customDocument=engine?engine.coerceStackDocument(custom,{defaultSection:"Verse 1"}):custom.join("\n");
  document=engine?engine.mergeStackDocument(document,customDocument,{repeatLast:true}).text:[document,customDocument].filter(Boolean).join("\n\n");
 }
 return document.replace(/\n{3,}/g,"\n\n").trim();
}


function updateMetaFormatExample(){
 if(id("metaFormatExample"))id("metaFormatExample").textContent="[Verse 1 | Warm, storytelling | Male Vocal | Acoustic Guitar | Restrained | Close | Analog Production]";
}

function renderMetaSuggestions(){
 if(!id("metaSuggestions"))return;
 const r=recommendedMetaTags();
 const rows=[
  ["Structure",r.structure.map(x=>ensureBracketTag(x))],
  ["Music",aggregateSectionTags(r.music.map(x=>ensureBracketTag(x,"Music")))],
  ["Voices",aggregateSectionTags(r.voices.map(x=>ensureBracketTag(x)))],
  ["Style",aggregateSectionTags(r.styles.map(x=>ensureBracketTag(x,"Style")))],
  ["Ad-libs",r.adlibs.length?[ensureBracketTag(r.adlibs.slice(0,1).join(", "),"Ad libs")]:[]],
  ["Choirs",r.choirs.map(x=>ensureBracketTag(x,"Chorus"))]
 ];
 id("metaSuggestions").innerHTML=rows.map(([name,tags])=>`<div class="meta-suggestion-card"><b>${name}</b><code>${tags.length?tags.map(escapeHTML).join("<br>"):"No automatic recommendation"}</code></div>`).join("");
}
function renderMetaTagBuilder(){
 renderChips(id("metaStructure"),META_STRUCTURE,"metaStructure");
 renderChips(id("metaMusic"),META_MUSIC,"metaMusic");
 renderChips(id("metaVoices"),META_VOICES,"metaVoices");
 renderChips(id("metaStyles"),META_STYLES,"metaStyles");
 renderChips(id("metaAdlibs"),META_ADLIBS,"metaAdlibs");
 renderChips(id("metaChoirs"),META_CHOIRS,"metaChoirs");
 renderMetaSuggestions();
}

function renderDynamicLists(){renderMetaTagBuilder();if(id("structureTimeline"))renderStructureBuilder();if(id("durationStats"))updateDurationStats();renderChips(id("voiceCharacterList"),voiceCharactersFiltered(),"voiceCharacters");renderSelected(id("selectedVoiceCharacters"),appState.voiceCharacters,"voiceCharacters");renderChips(id("vocalExtras"),VOCAL_EXTRAS,"vocalExtras");renderInstruments();renderGenreIntelligence();renderInstrumentRecommendations();renderChips(id("energyList"),energyFiltered(),"energyStyles");renderSelected(id("selectedEnergy"),appState.energyStyles,"energyStyles");renderChips(id("productionExtras"),PRODUCTION_EXTRAS,"productionExtras");renderChips(id("excludeChips"),EXCLUDES,"excludes")}
function updateBpmDisplay(){const v=+id("bpm").value;id("bpmValue").textContent=v;const info=v<70?["Very slow","Ballad, Ambient"]:v<95?["Slow","Folk, Dark Ambient"]:v<120?["Mid-tempo","Rock, Storytelling"]:v<136?["Dance","EDM, House"]:v<156?["Fast","Anime Opening, Metalcore"]:v<181?["Very fast","Power Metal, DnB"]:["Extreme","Speed Metal"];id("tempoLabel").textContent=info[0];id("tempoHint").textContent=info[1];if(id("smartBpmChips"))renderSmartBpm()}

function currentStyleContext(){
 return [
   id("genreFamily")?.value||"",
   id("subgenre")?.value||"",
   id("secondGenre")?.value||"",
   id("world")?.value||"",
   id("songType")?.value||""
 ].join(" ").toLowerCase();
}

function energyTagsFromLevel(value){
 const v=Number(value);
 let tags;
 if(v<=10) tags=["Whisper Quiet","Weightless","Minimal Energy"];
 else if(v<=20) tags=["Calm","Gentle","Relaxed"];
 else if(v<=35) tags=["Emotional","Dreamy","Flowing"];
 else if(v<=50) tags=["Moderate Energy","Steady Pulse","Smooth Drive"];
 else if(v<=65) tags=["Driving","Strong Groove","Forward Momentum"];
 else if(v<=80) tags=["High Energy","Powerful","Explosive Build"];
 else if(v<=90) tags=["Maximum Energy","Relentless","Full Power"];
 else tags=["Limit Break","Cataclysmic","Unstoppable","Full Assault"];

 const ctx=currentStyleContext();
 if(v>=65){
   if(/metal|deathcore|metalcore|djent|rock/.test(ctx)){
     tags=unique([...tags,"Crushing","Relentless Metal Drive"]);
   }
   if(/anime|japanese|isekai|shonen/.test(ctx)){
     tags=unique([...tags,"Heroic Anime Energy","Shonen Power-Up"]);
   }
   if(/electronic|edm|techno|house|hardstyle|drum & bass|dubstep|phonk/.test(ctx)){
     tags=unique([...tags,"Festival Energy","Dancefloor Drive"]);
   }
   if(/viking|nordic|pagan/.test(ctx)){
     tags=unique([...tags,"Viking Charge","Battle Energy"]);
   }
   if(/cyberpunk|industrial|synthwave|dark synth/.test(ctx)){
     tags=unique([...tags,"Mechanical Drive","Neon Rush"]);
   }
   if(/cinematic|soundtrack|orchestral|fantasy/.test(ctx)){
     tags=unique([...tags,"Cinematic Power","Epic Momentum"]);
   }
 }
 return tags.slice(0,6);
}

function dynamicsTagsFromLevel(value){
 const v=Number(value);
 if(v<=10) return ["Minimal Dynamics","Nearly Constant Intensity"];
 if(v<=25) return ["Gentle Build","Subtle Dynamic Changes"];
 if(v<=40) return ["Controlled Crescendo","Moderate Dynamic Movement"];
 if(v<=60) return ["Gradual Build","Emotional Lift","Controlled Contrast"];
 if(v<=75) return ["Strong Dynamic Contrast","Powerful Crescendo"];
 if(v<=90) return ["Drop-Driven Arrangement","Huge Crescendo","Explosive Section Changes"];
 return ["Massive Dynamic Swings","Huge Cinematic Finale","Explosive Finale","Extreme Contrast"];
}

function updateRangeLabels(){
 id("energyValue").textContent=`${id("energyLevel").value} / 100`;
 id("dynamicValue").textContent=`${id("dynamicLevel").value} / 100`;
 const energyTags=energyTagsFromLevel(id("energyLevel").value);
 const dynamicTags=dynamicsTagsFromLevel(id("dynamicLevel").value);
 if(id("energyTranslatedTags")) id("energyTranslatedTags").textContent="STYLE-Tags: "+energyTags.join(", ");
 if(id("dynamicTranslatedTags")) id("dynamicTranslatedTags").textContent="STYLE-Tags: "+dynamicTags.join(", ");
}
function theoryValues(){const s=id("subgenre").value;if(/Viking|Nordic/i.test(s))return["E minor","Dorian","4/4 or 6/8","128–155"];if(/Cyber|Synth|Industrial/i.test(s))return["F# minor","Chromatic minor","4/4","135–165"];if(/Metal|Anime/i.test(s))return["D minor","Harmonic minor","4/4","140–170"];return["D minor","Modal","4/4","90–160"]}
function updateTheory(){const t=theoryValues();["theoryKey","theoryScale","theoryMeter","theoryBpm"].forEach((x,i)=>id(x).textContent=t[i])}
function currentVocalMode(){return document.querySelector('input[name="vocalMode"]:checked')?.value||"vocals"}
function setVocalMode(mode){
 document.querySelectorAll('input[name="vocalMode"]').forEach(r=>{r.checked=r.value===mode;r.closest(".mode-option")?.classList.toggle("active",r.checked)});
 const instrumental=mode==="instrumental";
 id("vocalControls")?.classList.toggle("disabled",instrumental);
 const languageLabel=id("language")?.closest("label");languageLabel?.classList.toggle("disabled-control",instrumental);
 if(id("language"))id("language").disabled=instrumental;
 if(instrumental){
   appState.voiceCharacters=[];appState.vocalExtras=[];appState.metaVoices=[];appState.metaAdlibs=[];appState.metaChoirs=[];
   ["leadVoiceCategory","leadVoice","voicePreset","voiceFx","choir","secondVoice","voiceSeparation"].forEach(k=>{const el=id(k);if(el&&[...el.options].some(o=>o.value==="None"))el.value="None"});
   if(id("language"))id("language").value="None";
 }
}
function instrumentalStyleTags(){return currentVocalMode()==="instrumental"?["Instrumental Only","No Vocals","No Spoken Word","No Choir Vocals"]:[]}
function updateLivePreviewStats(){const active=document.querySelector(".live-output-tabs button.active")?.dataset.liveTab||"style";const map={style:"styleOutput",lyrics:"lyricsOutput",metatags:"metaTagsOutput",exclude:"excludeOutput"};const text=id(map[active])?.value||"";if(id("liveCharCount"))id("liveCharCount").textContent=`${text.length} Zeichen`;if(id("liveWordCount"))id("liveWordCount").textContent=`${text.trim()?text.trim().split(/\s+/).length:0} Wörter`}
function updateFavoriteGenreButton(){const b=id("toggleCurrentGenreFavorite");if(!b)return;const g=id("genreFamily")?.value||"None";const active=appState.itemFavorites.genres.includes(g);b.textContent=`${active?"★":"☆"} ${g==="None"?"Aktuelles Genre":g}`;b.classList.toggle("active",active)}
function tempoDescriptorForBpm(value){const bpm=Number(value)||120;if(bpm<60)return "Very Slow Tempo";if(bpm<80)return "Slow Tempo";if(bpm<105)return "Mid-Tempo";if(bpm<125)return "Upbeat Tempo";if(bpm<145)return "Fast, Driving Tempo";if(bpm<175)return "High-Energy Tempo";return "Extreme Fast Tempo"}
function bpmPromptParts(){const bpm=id("bpm").value;const items=[`${bpm} BPM`];if(id("includeTempoDescriptor")?.checked)items.push(tempoDescriptorForBpm(bpm));const preview=id("bpmPromptPreview");if(preview)preview.textContent=items.join(", ");return items}
function cleanGenreName(value){const text=String(value||"").trim();return text&&text!=="None"?text:""}
function parseGenreBlend(value){const match=String(value||"70/30").match(/(\d+)\s*\/\s*(\d+)/);if(!match)return[70,30];const a=Math.max(0,Math.min(100,Number(match[1])||70));const b=Math.max(0,Math.min(100,Number(match[2])||30));const total=a+b||100;return[Math.round(a/total*100),Math.round(b/total*100)]}
function genreBlendDescription(primary,secondary,blendValue){
 primary=cleanGenreName(primary);secondary=cleanGenreName(secondary);
 if(!primary)return secondary||"";if(!secondary||primary.toLowerCase()===secondary.toLowerCase())return primary;
 const [a]=Array.isArray(blendValue)?blendValue:parseGenreBlend(blendValue);
 if(a>=88)return`${primary} with subtle ${secondary} elements`;
 if(a>=78)return`${primary} with light ${secondary} influences`;
 if(a>=68)return`${primary} with ${secondary} influences`;
 if(a>=58)return`${primary}-driven fusion with strong ${secondary} influence`;
 return`Equal fusion of ${primary} and ${secondary}`;
}
function genrePromptParts(){
 const family=cleanGenreName(id("genreFamily")?.value),subgenre=cleanGenreName(id("subgenre")?.value),secondary=cleanGenreName(id("secondGenre")?.value);
 const primary=subgenre||family;const result=[];
 if(family&&primary&&family.toLowerCase()!==primary.toLowerCase())result.push(family);
 const fusion=genreBlendDescription(primary,secondary,id("blend")?.value);
 if(fusion)result.push(fusion);
 const preview=id("genreBlendPromptPreview");if(preview)preview.textContent=fusion||primary||family||"No genre selected";
 return result;
}
window.NSWGenreBlend={parse:parseGenreBlend,describe:genreBlendDescription,promptParts:genrePromptParts};
let vocalClarityController=null;
function vocalClarityLanguage(){
 const raw=window.NSWInterfaceI18n?.getLanguage?.()||(typeof currentUiLanguage==='string'?currentUiLanguage:document.documentElement.lang)||'en';
 return window.NSWVocalClarityI18n?.languageOf?.(raw)||'en';
}
function vocalClarityUi(){return window.NSWVocalClarityI18n?.record?.(vocalClarityLanguage())||window.NSWVocalClarityI18n?.DATA?.en}
function vocalClarityOptions(style){return{style,mode:id('vocalClarityMode')?.value||'smart',lyrics:id('lyricsEditor')?.value||'',vocalMode:currentVocalMode(),genre:id('genreFamily')?.value||'',subgenre:id('subgenre')?.value||'',voice:id('leadVoice')?.value||''}}
function buildVocalClarityStyle(style){
 const engine=window.NSWVocalClarityEngine;
 if(!engine)return{text:style,applied:false,decision:{state:'off'},analysis:{status:'compatible',issues:[],signals:{},density:{level:'empty'}}};
 return engine.buildStyle(style,vocalClarityOptions(style));
}
function renderVocalClarityGuidance(result=window.NSW_VOCAL_CLARITY_LAST||{}){
 const module=window.NSWVocalClarityGuidance,t=vocalClarityUi()?.guidance,mode=id('vocalClarityMode')?.value||'smart';
 if(!module||!t)return;
 const guidance=module.build(result,mode),set=(key,value)=>{const el=id(key);if(el)el.textContent=value};
 const panel=id('vocalClarityGuidance');if(panel){panel.dataset.applied=String(guidance.placement.applied);panel.dataset.state=guidance.state}
 set('vocalClarityPlacementTitle',t.placementTitle);set('vocalClarityPlacementBlock',t.block);set('vocalClarityPlacementRest',t.rest);
 set('vocalClarityPlacementSummary',t.placements[guidance.state]||t.placements.off);
 const recommend=id('vocalClarityRecommend');
 if(recommend){recommend.disabled=!guidance.recommendation.actionable;recommend.textContent=t[guidance.recommendation.code]||t.automaticActive;recommend.dataset.targetMode=guidance.recommendation.targetMode||''}
 set('vocalClarityTourButton',t.tour);
}
function localizeVocalClarity(){
 const t=vocalClarityUi(),set=(key,value)=>{const el=id(key);if(el)el.textContent=value};
 if(!t)return;
 set('vocalClarityKicker',t.kicker);set('vocalClarityTitle',t.title);set('vocalClarityDescription',t.description);
 set('vocalClarityToggleLabel',t.toggleLabel);set('vocalClarityWhyTitle',t.whyTitle);set('vocalClarityWhyText',t.whyText);
 set('vocalClarityBroadwayMeaning',t.broadwayMeaning);set('vocalClarityArticulationMeaning',t.articulationMeaning);set('vocalClarityCloseMicMeaning',t.closeMicMeaning);
 set('vocalClarityModeLabel',t.mode);set('vocalClarityModeHelp',t.modeHelp);set('vocalClarityPrefixLabel',t.prefix);
 set('vocalClarityGenreLabel',t.genre);set('vocalClarityReverbLabel',t.reverb);set('vocalClarityLyricsLabel',t.lyrics);set('vocalClarityNote',t.note);
 const mode=id('vocalClarityMode');if(mode){const labels={smart:t.smart,off:t.off,force:t.force};[...mode.options].forEach(option=>option.textContent=labels[option.value]||option.textContent)}
 const control=vocalClarityController?.sync?.()||{enabled:(mode?.value||'smart')!=='off'};
 set('vocalClarityToggleState',control.enabled?t.toggleOn:t.toggleOff);
 const toggle=id('vocalClarityToggle');if(toggle)toggle.setAttribute('aria-label',`${t.toggleLabel}: ${control.enabled?t.toggleOn:t.toggleOff}`);
 if(id('vocalClarityPrefix')&&window.NSWVocalClarityEngine)id('vocalClarityPrefix').textContent=window.NSWVocalClarityEngine.PREFIX;
 renderVocalClarityGuidance();
}
function initVocalClarityControls(){
 const mode=id('vocalClarityMode'),toggle=id('vocalClarityToggle'),factory=window.NSWVocalClarityController;
 if(!mode||!toggle||!factory?.createController)return;
 vocalClarityController?.destroy?.();
 vocalClarityController=factory.createController({modeElement:mode,toggleElement:toggle});
 mode.addEventListener('change',localizeVocalClarity);
 const recommend=id('vocalClarityRecommend');
 if(recommend&&!recommend.dataset.vocalClarityBound){recommend.dataset.vocalClarityBound='true';recommend.addEventListener('click',()=>vocalClarityController?.setMode?.('smart'))}
 const tour=id('vocalClarityTourButton');
 if(tour&&!tour.dataset.vocalClarityBound){tour.dataset.vocalClarityBound='true';tour.addEventListener('click',()=>{const experience=window.NSWFirstStartExperience;if(experience?.startTourAt)experience.startTourAt('vocal-clarity');else experience?.startTour?.()})}
 localizeVocalClarity();
}
function renderVocalClarity(result){
 if(!id('vocalClarityCard')||!result)return;
 localizeVocalClarity();
 const t=vocalClarityUi(),analysis=result.analysis||{},decision=result.decision||{state:'off'},issues=analysis.issues||[],density=analysis.density||{level:'empty'};
 const state=decision.state==='active'?(analysis.status||'compatible'):decision.state==='caution'?'caution':decision.state;
 id('vocalClarityCard').dataset.status=state;
 id('vocalClarityStatus').textContent=t.states[decision.state]||t.states[state]||state;
 id('vocalClaritySummary').textContent=t.summaries[decision.state]||t.summaries[state]||'';
 const scopeState=scope=>issues.some(item=>item.scope===scope&&item.severity==='error')?t.conflict:issues.some(item=>item.scope===scope&&item.severity==='warn')?t.warning:t.good;
 id('vocalClarityGenreState').textContent=scopeState('genre');
 id('vocalClarityReverbState').textContent=scopeState('reverb');
 id('vocalClarityLyricsState').textContent=t[density.level]||density.level;
 const engine=window.NSWVocalClarityEngine,language=vocalClarityLanguage();
 const issueText=item=>window.NSWVocalClarityI18n?.issueMessage?.(language,item.code)||engine?.messageFor(item,language)||'';
 id('vocalClarityIssues').innerHTML=issues.length?issues.map(item=>`<div class="vocal-clarity-issue ${item.severity}">${escapeHTML(issueText(item))}</div>`).join(''):`<div class="vocal-clarity-issue good">${escapeHTML(t.none)}</div>`;
 renderVocalClarityGuidance(result);
 window.NSW_VOCAL_CLARITY_LAST=result;
}
let vocalClarityLyricsTimer=null;
function scheduleVocalClarityRefresh(){clearTimeout(vocalClarityLyricsTimer);vocalClarityLyricsTimer=setTimeout(()=>generateOutput(),180)}
function generateOutput(){
 updateTheory();updateRangeLabels();updateNamedSingerPreview();
 const theorySelections=id("includeTheory")?.checked?[id("rhythmFeel")?.value,id("tempoCharacterTheory")?.value,id("songEnergyProfile")?.value,id("harmonyMode")?.value,id("harmonyComplexity")?.value,id("melodyMotion")?.value,id("theoryDynamics")?.value]:[];
 const parts=[...genrePromptParts(),...bpmPromptParts(),id("songType").value,formatSongDuration(),...(id("includeLanguageInStyle")?.checked?[id("language").value]:[]),...(currentVocalMode()==="instrumental"?instrumentalStyleTags():[id("leadVoice").value,...appState.voiceCharacters,id("voiceFx").value,id("choir").value,id("secondVoice").value,id("voiceSeparation").value,...appState.vocalExtras]),...appState.instruments.map(name=>typeof reliableInstrumentPrompt==="function"?reliableInstrumentPrompt(name,id("genreFamily").value,id("subgenre").value):name),id("world").value,id("emotion").value,id("narrative").value,id("scene").value,id("atmosphere").value,...appState.energyStyles,...energyTagsFromLevel(id("energyLevel").value),...dynamicsTagsFromLevel(id("dynamicLevel").value),id("production").value,id("mix").value,id("dynamics").value,id("drumMix")?.value,id("vocalProduction")?.value,id("mastering")?.value,...appState.productionExtras,...theorySelections,...csv(id("customStyle").value)].filter(x=>x&&x!=="None");
 const baseStyle=optimizePromptItems(parts).join(", "),clarityResult=buildVocalClarityStyle(baseStyle);
 id("styleOutput").value=clarityResult.text;renderVocalClarity(clarityResult);
 id("excludeOutput").value=optimizePromptItems([...appState.excludes,...csv(id("customExclude").value)]).join(", ");
 if(id("metaTagsOutput"))id("metaTagsOutput").value=metaTagsOutput();renderMetaSuggestions();updateScore();updateLivePreviewStats();updateFavoriteGenreButton();if(typeof refreshKnowledgePanels==="function")refreshKnowledgePanels();persist();
}
function compatibilityContext(){return [id("genreFamily")?.value,id("subgenre")?.value,id("secondGenre")?.value,id("songType")?.value,id("leadVoice")?.value,id("choir")?.value,id("secondVoice")?.value,id("world")?.value,id("emotion")?.value,id("production")?.value,id("mix")?.value,...appState.instruments,...appState.energyStyles,...appState.voiceCharacters].filter(x=>x&&x!=="None").join(" ").toLowerCase()}
function updateScore(){
 const ctx=compatibilityContext();
 const hasSelections=ctx.length>0;
 const instrumental=currentVocalMode()==="instrumental";
 const components={genre:hasSelections?78:0,vocals:hasSelections?82:0,instruments:hasSelections?80:0,story:hasSelections?80:0,production:hasSelections?82:0};
 const reasons=[];
 if(!hasSelections){renderScore(0,components,"No selection","poor");return}
 const genre=id("genreFamily")?.value||"None", second=id("secondGenre")?.value||"None";
 if(genre!=="None")components.genre+=8;
 if(second!=="None")components.genre+=3;
 if(typeof genrePairCompatibility==="function"){
   const pair=genrePairCompatibility(genre,second);
   components.genre=Math.round((components.genre+pair.score)/2);
   if(pair.score<70)reasons.push(pair.reason);
 }
 if(typeof instrumentFitScore==="function"&&appState.instruments.length){
   const fits=appState.instruments.map(x=>instrumentFitScore(x,genre,id("subgenre")?.value||""));
   const avg=Math.round(fits.reduce((a,b)=>a+b,0)/fits.length);
   components.instruments=Math.round((components.instruments+avg)/2);
   if(avg<68)reasons.push("Some instruments are unusual for this style");
 }
 if(/metal/.test(ctx)&&/lullaby|sleep music|meditation/.test(ctx)){components.genre-=30;reasons.push("Heavy genre conflicts with calm song type")}
 if(/ambient|meditation|sleep/.test(ctx)&&/blast beat|deathcore|maximum energy/.test(ctx)){components.genre-=28;reasons.push("Energy conflicts with ambient direction")}
 if(/anime/.test(ctx)&&/opening|ending|character/.test(ctx))components.genre+=7;
 if(/festival|club|edm|hardstyle/.test(ctx)&&/festival production|huge low-end|wide stereo/.test(ctx))components.production+=10;
 if(/folk|viking/.test(ctx)&&/tagelharpa|nyckelharpa|jouhikko|frame drum|war horn/.test(ctx))components.instruments+=12;
 if(/orchestra|cinematic|film score|trailer/.test(ctx)&&/violin|cello|brass|choir|timpani|orchestra/.test(ctx))components.instruments+=10;
 if(/electronic|edm|synthwave|techno|hardstyle/.test(ctx)&&/synth|808|sub bass|electronic drums/.test(ctx))components.instruments+=9;
 if(appState.instruments.length===0)components.instruments-=12;
 if(appState.instruments.length>8){components.instruments-=12;reasons.push("Too many instruments selected")}
 if(instrumental){
   components.vocals=95;
   if(id("language")?.value!=="None")components.vocals-=8;
 }else{
   if((id("leadVoice")?.value||"None")==="None")components.vocals-=18;
   if(id("secondVoice")?.value!=="None"&&id("voiceSeparation")?.value==="Single lead only"){components.vocals-=30;reasons.push("Secondary voice contradicts single-lead separation")}
   if(id("choir")?.value!=="None"&&/single lead only/i.test(id("voiceSeparation")?.value||"")){components.vocals-=12;reasons.push("Choir conflicts with single-lead mode")}
   const clarity=window.NSW_VOCAL_CLARITY_LAST;
   if(clarity?.decision?.state==='active'&&clarity.analysis?.status==='compatible')components.vocals+=6;
   if(clarity?.decision?.state==='caution'){components.vocals-=4;reasons.push('Vocal Clarity has compatibility cautions')}
   if(clarity?.decision?.state==='blocked'){components.vocals-=14;reasons.push('Vocal Clarity is blocked by STYLE, reverb or lyric density')}
   if(clarity?.decision?.state==='forced'&&clarity.analysis?.status==='incompatible'){components.vocals-=18;reasons.push('Vocal Clarity is forced despite a hard conflict')}
 }
 if(id("world")?.value!=="None"||id("emotion")?.value!=="None")components.story+=6;
 if(/dark|horror|battle/.test(ctx)&&/cheerful|summer hit|birthday/.test(ctx)){components.story-=18;reasons.push("Story mood and song type clash")}
 if(id("production")?.value!=="None")components.production+=5;
 Object.keys(components).forEach(k=>components[k]=Math.max(0,Math.min(100,Math.round(components[k]))));
 let score=Math.round(components.genre*.28+components.vocals*.20+components.instruments*.22+components.story*.15+components.production*.15);
 if(id("styleOutput")?.value.length>1200){score-=10;reasons.push("Prompt is overloaded")}
 score=Math.max(0,Math.min(100,score));
 const label=score>=92?"Excellent match":score>=80?"Very good":score>=68?"Good":score>=52?"Experimental":"Poor match";
 const level=score>=92?"excellent":score>=68?"good":score>=52?"experimental":score>=35?"poor":"invalid";
 const contributions=buildScoreExplanation(components,reasons,score);
 appState.scoreWhy=contributions;
 renderScore(score,components,label,level,reasons,contributions);
}
function renderScore(score,components,label,level,reasons=[],contributions=[]){
 id("score").textContent=score;
 const stars=Math.max(0,Math.min(5,Math.round(score/20)));id("stars").textContent="★★★★★".slice(0,stars)+"☆☆☆☆☆".slice(0,5-stars);
 if(id("scoreLabel"))id("scoreLabel").textContent=label;
 const card=id("score")?.closest(".score-card");if(card)card.dataset.level=level;
 const rows=[[tr("score_genre"),components.genre],[tr("score_vocals"),components.vocals],[tr("score_instruments"),components.instruments],[tr("score_story"),components.story],[tr("score_production"),components.production]];
 id("scoreDetails").innerHTML=rows.map(([n,v])=>`<div class="score-row"><span>${n}</span><div class="score-bar"><i style="width:${v}%"></i></div><b>${v}</b></div>`).join("")+(reasons.length?`<small class="score-reasons">${escapeHTML(reasons.slice(0,2).join(" · "))}</small>`:"");
 renderScoreWhy(contributions);
};
function resetBuilder(){document.querySelectorAll("select").forEach(el=>{if([...el.options].some(o=>o.value==="None"))el.value="None";else el.selectedIndex=0});document.querySelectorAll('input[type="text"],textarea:not([readonly])').forEach(el=>el.value="");id("blend").value="70/30";id("bpm").value=120;id("energyLevel").value=50;id("dynamicLevel").value=50;id("instrumentRegion").value="Alle Regionen";refreshInstrumentFilters();id("instrumentSearch").value="";["voiceCharacters","vocalExtras","instruments","energyStyles","productionExtras","excludes","metaStructure","metaMusic","metaVoices","metaStyles","metaAdlibs","metaChoirs"].forEach(k=>appState[k]=[]);appState.structureInitialized=false;if(id("songDuration"))id("songDuration").value="180";setVocalMode("vocals");if(id("language"))id("language").value="None";renderDynamicLists();updateBpmDisplay();updateRangeLabels();generateOutput();showToast("Builder reset")}
function collectFormState(){const values={};document.querySelectorAll("select,input,textarea").forEach(el=>{if(el.id&&!el.id.startsWith("lyrics")&&!["styleOutput","excludeOutput","presetSearch","voiceSearch","instrumentSearch","energySearch","importFile"].includes(el.id))values[el.id]=el.type==="checkbox"?el.checked:el.value});values.vocalMode=currentVocalMode();return{values,arrays:{voiceCharacters:[...appState.voiceCharacters],vocalExtras:[...appState.vocalExtras],instruments:[...appState.instruments],energyStyles:[...appState.energyStyles],productionExtras:[...appState.productionExtras],excludes:[...appState.excludes],metaStructure:[...appState.metaStructure],metaMusic:[...appState.metaMusic],metaVoices:[...appState.metaVoices],metaStyles:[...appState.metaStyles],metaAdlibs:[...appState.metaAdlibs],metaChoirs:[...appState.metaChoirs]}}}
function applyFormState(data){const restoredMode=data.values?.vocalMode||"vocals";Object.entries(data.values||{}).forEach(([key,value])=>{if(key==="vocalMode")return;const el=id(key);if(el){if(el.type==="checkbox")el.checked=value;else el.value=value}});Object.assign(appState,data.arrays||{});appState.structureInitialized=Array.isArray(data.arrays?.metaStructure);refreshSubgenres();refreshLeadVoices();refreshInstrumentFilters();setVocalMode(restoredMode);renderDynamicLists();updateBpmDisplay();updateRangeLabels();generateOutput()}
function persist(){storageSave({form:collectFormState(),presets:appState.presets,favorites:appState.favorites,itemFavorites:appState.itemFavorites,history:appState.history})}
function restore(){const saved=storageLoad();appState.presets=saved.presets||[];appState.favorites=saved.favorites||[];appState.itemFavorites=Object.assign({genres:[],instruments:[],voices:[]},saved.itemFavorites||{});appState.history=saved.history||[];if(saved.form)applyFormState(saved.form)}

function syncRandomizerMode(source){const radios=[...document.querySelectorAll('input[name="randomMode"]')];const mirror=id("randomModeMirror");let mode=source?.value||radios.find(x=>x.checked)?.value||mirror?.value||"intelligent";radios.forEach(x=>x.checked=x.value===mode);if(mirror)mirror.value=mode;const experimental=mode==="experimental";id("experimentControls")?.classList.toggle("hidden",!experimental);id("experimentLevelMirrorWrap")?.classList.toggle("hidden",!experimental);if(id("compatibleRandom"))id("compatibleRandom").checked=mode==="intelligent";if(id("compatibleRandomMirror"))id("compatibleRandomMirror").checked=mode==="intelligent";}
function bindRandomizerModes(){document.querySelectorAll('input[name="randomMode"]').forEach(x=>x.addEventListener("change",()=>syncRandomizerMode(x)));id("randomModeMirror")?.addEventListener("change",e=>syncRandomizerMode(e.target));id("experimentLevel")?.addEventListener("change",e=>{if(id("experimentLevelMirror"))id("experimentLevelMirror").value=e.target.value});id("experimentLevelMirror")?.addEventListener("change",e=>{if(id("experimentLevel"))id("experimentLevel").value=e.target.value});syncRandomizerMode();}
function renderRandomOptions(){const defs=[["genre",tr("random_genre"),true],["bpm",tr("random_bpm"),true],["song",tr("random_song"),true],["vocals",tr("random_vocals"),true],["instruments",tr("random_instruments"),true],["world",tr("random_world"),false],["emotion",tr("random_emotion"),false],["story",tr("random_scene"),false],["energy",tr("random_energy"),false],["production",tr("random_production"),true],["exclude",tr("random_exclude"),false]];id("randomOptions").innerHTML=defs.map(([v,l,c])=>`<label><input type="checkbox" value="${v}" ${c?"checked":""}> ${l}</label>`).join("");id("randomMirror").innerHTML=defs.map(([v,l,c])=>`<label><input type="checkbox" data-mirror="${v}" ${c?"checked":""}> ${l}</label>`).join("");document.querySelectorAll("[data-mirror]").forEach(m=>m.onchange=()=>{document.querySelector(`#randomOptions input[value="${m.dataset.mirror}"]`).checked=m.checked});document.querySelectorAll("#randomOptions input").forEach(src=>src.onchange=()=>{const m=document.querySelector(`[data-mirror="${src.value}"]`);if(m)m.checked=src.checked});const c=id("compatibleRandom"),cm=id("compatibleRandomMirror"),a=id("allowInstrumentalRandom"),am=id("allowInstrumentalRandomMirror");if(c&&cm){cm.checked=c.checked;c.onchange=()=>cm.checked=c.checked;cm.onchange=()=>c.checked=cm.checked}if(a&&am){am.checked=a.checked;a.onchange=()=>am.checked=a.checked;am.onchange=()=>a.checked=am.checked}}
function applyVoicePreset(){const p=VOICE_PRESETS[id("voicePreset").value]||{};if(p.lead){for(const [cat,list] of Object.entries(LEAD_VOICE_LIBRARY))if(list.includes(p.lead)){id("leadVoiceCategory").value=cat;refreshLeadVoices();id("leadVoice").value=p.lead}}appState.voiceCharacters=p.characters||[];id("choir").value=p.choir||"None";id("secondVoice").value=p.second||"None";id("voiceSeparation").value=p.separation||"None";appState.vocalExtras=p.extras||[];renderDynamicLists();generateOutput()}
function setSelectValue(key,value){const el=id(key);if(!el)return false;const option=[...el.options].find(o=>o.value===value||o.textContent===value);if(option){el.value=option.value;return true}return false}
function findGenre(pattern){return Object.keys(GENRE_LIBRARY).find(x=>pattern.test(x))||"None"}
function validInstruments(names){return names.filter(name=>INSTRUMENT_DB.some(x=>x.name===name))}
const QUICK_PRESETS={
 anime:{genre:/anime/i,sub:/j-rock|anime rock|j-pop/i,song:"Anime Opening",bpm:168,world:/fantasy|anime/i,emotion:/emotional|hopeful/i,instruments:["Electric Guitar","Grand Piano","Violin Section","Taiko Drums","Hybrid Electronic Drums"],energy:["Opening Energy","Emotional Lift","Huge Cinematic Finale"],production:/cinematic|modern/i,voice:"Female Lead Voice",structure:["Intro","Verse 1","Pre-Chorus","Chorus","Verse 2","Bridge","Final Chorus","Outro"]},
 viking:{genre:/folk|world/i,sub:/viking|nordic|pagan/i,song:"Viking Anthem",bpm:112,world:/viking|nordic/i,emotion:/heroic|epic|triumphant/i,instruments:["Tagelharpa","Nyckelharpa","Viking War Horns","Nordic Frame Drums","Hardanger Fiddle"],energy:["Viking Charge","Epic Crescendo"],production:/cinematic|live/i,voice:"Male Lead Voice"},
 kpop:{genre:/pop/i,sub:/k-pop/i,song:"K-Pop Single",bpm:124,world:/modern|city|neon/i,emotion:/confident|energetic|joyful/i,instruments:["Analog Synthesizer","Deep Sub Bass","Hybrid Electronic Drums","Electric Guitar"],energy:["Festival Energy","Dance Energy","Emotional Lift"],production:/radio|modern|polished/i,voice:"Female Lead Voice"},
 metalcore:{genre:/metal/i,sub:/metalcore/i,song:"Breakdown Song",bpm:158,world:/dark|battle|apocalypse/i,emotion:/angry|aggressive|determined/i,instruments:["Aggressive Rhythm Guitars","Electric Bass Guitar","Hybrid Electronic Drums","Deep Sub Bass"],energy:["Maximum Energy","Breakdown Impact","Huge Cinematic Finale"],production:/modern|heavy|wide/i,voice:"Male Lead Voice"},
 cinematic:{genre:/cinematic|soundtrack/i,sub:/trailer|epic/i,song:"Trailer",bpm:132,world:/fantasy|battle|myth/i,emotion:/epic|heroic|triumphant/i,instruments:["Full Cinematic Orchestra","French Horns","Timpani","Violin Section","Deep Sub Bass"],energy:["Cinematic Sweep","Monumental","Epic Crescendo"],production:/trailer|cinematic|aaa/i,voice:"Female Lead Voice"},
 edm:{genre:/electronic|edm/i,sub:/festival|progressive|big room/i,song:"Festival Anthem",bpm:128,world:/festival|future|neon/i,emotion:/euphoric|energetic|triumphant/i,instruments:["Supersaw Synth","Deep Sub Bass","Hybrid Electronic Drums","Analog Synthesizer"],energy:["Festival Energy","Massive Bass Drops","Maximum Energy"],production:/festival|club|wide/i,voice:"Female Lead Voice"},
 synthwave:{genre:/electronic|edm/i,sub:/synthwave|retrowave/i,song:"Synthwave Track",bpm:108,world:/cyberpunk|neon|retro/i,emotion:/mysterious|nostalgic|dark/i,instruments:["Analog Synthesizer","FM Synthesizer","Distorted Synth Bass","Hybrid Electronic Drums"],energy:["Neon Drive","Gradual Build"],production:/retro|wide|cinematic/i,voice:"Male Lead Voice"},
 lofi:{genre:/ambient|chill/i,sub:/lo-fi|chillhop/i,song:"Lo-Fi Beat",bpm:78,world:/urban|night|rain/i,emotion:/calm|relaxed|melancholic/i,instruments:["Upright Piano","Atmospheric Synth Pad","Electric Bass Guitar","Hybrid Electronic Drums"],energy:["Calm","Gentle","Relaxed"],production:/warm|lo-fi|intimate/i,voice:"None"},
 ballad:{genre:/ballad|emotional|pop/i,sub:/piano|power ballad/i,song:"Piano Ballad",bpm:74,world:/romance|modern|memory/i,emotion:/emotional|melancholic|sad/i,instruments:["Grand Piano","Violin Section","Cello Section"],energy:["Gradual Build","Emotional Lift","Controlled Contrast"],production:/intimate|cinematic|warm/i,voice:"Female Lead Voice"},
 instrumental:{genre:/cinematic|classical/i,sub:/orchestral|score/i,song:"Film Score Cue",bpm:96,world:/fantasy|cinematic|myth/i,emotion:/epic|mysterious|emotional/i,instruments:["Full Cinematic Orchestra","Grand Piano","Violin Section","Cello Section","Timpani"],energy:["Cinematic Sweep","Gradual Build","Huge Cinematic Finale"],production:/aaa|cinematic|soundtrack/i,instrumental:true}
};
function quickPreset(type){
 const p=QUICK_PRESETS[type];if(!p)return;
 const genre=findGenre(p.genre);setSelectValue("genreFamily",genre);refreshSubgenres();
 if(p.sub){const sub=[...id("subgenre").options].find(o=>p.sub.test(o.value));if(sub)id("subgenre").value=sub.value}
 setSelectValue("songType",p.song);id("bpm").value=p.bpm;
 const pick=(key,list,pattern)=>{const found=list.find(x=>pattern?.test(x));if(found)setSelectValue(key,found)};
 pick("world",WORLDS,p.world);pick("emotion",EMOTIONS,p.emotion);pick("production",PRODUCTIONS,p.production);
 appState.instruments=validInstruments(p.instruments||[]);appState.energyStyles=(p.energy||[]).filter(x=>Object.values(ENERGY_LIBRARY).flat().includes(x));
 if(p.instrumental){setVocalMode("instrumental");if(id("language"))id("language").value="None"}else{setVocalMode("vocals");if(p.voice){for(const [cat,list] of Object.entries(LEAD_VOICE_LIBRARY)){if(list.includes(p.voice)){id("leadVoiceCategory").value=cat;refreshLeadVoices();setSelectValue("leadVoice",p.voice);break}}}}
 if(p.structure){appState.metaStructure=[...p.structure];appState.structureInitialized=true}else{appState.structureInitialized=false;appState.metaStructure=[]}
 renderDynamicLists();phase2Refresh();updateBpmDisplay();generateOutput();showToast("Quick preset loaded")
}
const PROMPT_CANONICAL=[
 {key:"epic",rx:/^(epic|very epic|highly epic)$/i},{key:"powerful",rx:/^(powerful|strong|forceful)$/i},{key:"cinematic",rx:/^(cinematic|film-like|movie-like)$/i},
 {key:"dark",rx:/^(dark|darkness|shadowy)$/i},{key:"emotional",rx:/^(emotional|emotionally charged)$/i},{key:"female lead voice",rx:/^(female vocal|female vocals|female lead|female lead voice)$/i},
 {key:"male lead voice",rx:/^(male vocal|male vocals|male lead|male lead voice)$/i},{key:"instrumental only",rx:/^(instrumental|pure instrumental|instrumental only)$/i},
 {key:"deep sub bass",rx:/^(sub bass|deep bass|deep sub bass)$/i},{key:"wide stereo",rx:/^(wide mix|wide stereo|stereo wide)$/i}
];
function normalizePromptToken(raw){let t=String(raw||"").trim().replace(/\s+/g," ").replace(/^[,;]+|[,;]+$/g,"");if(!t||/^none$/i.test(t))return"";const c=PROMPT_CANONICAL.find(x=>x.rx.test(t));return c?c.key.replace(/\b\w/g,m=>m.toUpperCase()):t}
function optimizePromptItems(items){const out=[],seen=new Set();for(const item of items){const t=normalizePromptToken(item);if(!t)continue;const key=t.toLocaleLowerCase();if(seen.has(key))continue;seen.add(key);out.push(t)}return out}
function detectPromptConflicts(items){const text=items.join(" ").toLowerCase(),conflicts=[];if(/instrumental/.test(text)&&/(female|male|vocal|choir|spoken)/.test(text))conflicts.push("Instrumental widerspricht Vocal-/Chor-Angaben");if(/single lead/.test(text)&&/(duet|secondary voice|choir)/.test(text))conflicts.push("Single Lead widerspricht Duett, Zweitstimme oder Chor");if(/sleep|meditation|lullaby/.test(text)&&/maximum energy|blast beat|deathcore|festival hardstyle/.test(text))conflicts.push("Ruhiger Songtyp widerspricht extremer Energie");if(/acoustic only/.test(text)&&/synth|electronic|808/.test(text))conflicts.push("Acoustic Only widerspricht elektronischen Instrumenten");return conflicts}
function parsePromptText(text){return String(text||"").replace(/\[[^:\]]+:\s*/g,"").replace(/[\[\]]/g,"").split(/[,;\n]+/).map(x=>x.trim()).filter(Boolean)}
function optimizePromptText(text){const raw=parsePromptText(text),optimized=optimizePromptItems(raw),conflicts=detectPromptConflicts(optimized);return{raw,optimized,conflicts,text:optimized.join(", "),removed:Math.max(0,raw.length-optimized.length)}}
function runPromptOptimizer(){const r=optimizePromptText(id("optimizerInput").value);id("optimizerOutput").value=r.text;const conflictHtml=r.conflicts.length?`<br><strong>Widersprüche:</strong> ${r.conflicts.map(escapeHTML).join(" · ")}`:"<br><strong>Widersprüche:</strong> keine erkannt";id("optimizerReport").innerHTML=`<strong>${r.optimized.length}</strong> eindeutige Begriffe · <strong>${r.removed}</strong> Wiederholungen/Leerwerte entfernt${conflictHtml}`}
function buildScoreExplanation(c,reasons,score){const rows=[{value:Math.round(c.genre*.28),text:`Genre & Stil (${c.genre}/100, Gewicht 28 %)`},{value:Math.round(c.vocals*.20),text:`Vocals/Instrumental (${c.vocals}/100, Gewicht 20 %)`},{value:Math.round(c.instruments*.22),text:`Instrumente (${c.instruments}/100, Gewicht 22 %)`},{value:Math.round(c.story*.15),text:`Story & Stimmung (${c.story}/100, Gewicht 15 %)`},{value:Math.round(c.production*.15),text:`Produktion (${c.production}/100, Gewicht 15 %)`}];reasons.forEach(x=>rows.push({value:-5,text:x}));rows.push({value:score,text:`Gesamtergebnis: ${score}/100`,neutral:true});return rows}
function renderScoreWhy(items=appState.scoreWhy||[]){const host=id("scoreWhyPanel");if(!host)return;host.innerHTML=items.length?items.map(x=>`<div class="score-why-item"><b class="${x.neutral?"neutral":x.value<0?"negative":"positive"}">${x.neutral?"=":x.value<0?"": "+"}${x.value}</b><span>${escapeHTML(x.text)}</span></div>`).join(""):"<small>Wähle zuerst Einstellungen aus.</small>"}


const ASSISTANT_RULES={
 keywords:{
  anime:["anime","japanese","japanisch","opening","ending","isekai","shonen","manga"],
  viking:["viking","wikinger","nordic","nordisch","valhalla","odin","thor","runen","rune"],
  cyber:["cyber","cyberpunk","neon","digital","robot","android","ki","ai","future","futuristic"],
  dark:["dark","düster","finster","schwarz","grim","gothic","horror"],
  emotional:["emotional","melancholisch","melancholic","traurig","sad","broken","verlust","loss","sehnsucht"],
  heroic:["hero","held","heroic","epic","episch","triumphant","sieg","victory"],
  battle:["battle","kampf","krieg","war","fight","boss","final battle","schlacht"],
  festival:["festival","stadium","arena","crowd","hymne","anthem"],
  ocean:["ocean","meer","sea","waves","küste","coast"],
  cathedral:["cathedral","kathedrale","church","kirche","holy","sacred"],
  fire:["fire","feuer","burning","brennend","flammen","flames"],
  school:["school","schule","classroom","schulhof","student"],
  apocalypse:["apocalypse","apokalypse","ruins","ruinen","ashes","asche"],
  romance:["love","liebe","romance","romantisch","heart","herz"],
  female:["female","weiblich","frau","mädchen","female lead","sängerin"],
  male:["male","männlich","mann","male lead","sänger"],
  spoken:["spoken","erzähler","narrator","gesprochen","sprechstimme","mission briefing"],
  choir:["choir","chor","opera","oper","gregorian","children's choir"],
  growl:["growl","growls","scream","screams","shouts","gang shouts"],
  piano:["piano","klavier"],
  guitar:["guitar","gitarre","acoustic","akustisch"],
  folk:["folk","acoustic","akustik","traditional","traditionell"],
  edm:["edm","techno","electronic","elektronisch","hardstyle","hard bass","drop","drops","festival"],
  metal:["metal","metalcore","death metal","hard rock","heavy","brutal"],
  orchestral:["orchestral","orchester","cinematic","cinematisch","strings","streicher"],
  portuguese:["portuguese","portugiesisch","portugal"],
  german:["german","deutsch"],
  japanese:["japanese lyrics","japanische lyrics","japanisch"],
  oldNorse:["old norse","altnordisch","alt dänisch","old danish","vikinger sprache"]
 },
 instruments:{
  viking:["Tagelharpa","Nyckelharpa","Viking War Horns","Nordic Frame Drums","Hardanger Fiddle"],
  cyber:["Analog Synthesizer","FM Synthesizer","Industrial Percussion","Distorted Synth Bass"],
  anime:["Grand Piano","Violin Section","Cello Section","Aggressive Rhythm Guitars","Deep Sub Bass"],
  folk:["Spanish Classical Guitar","Uilleann Pipes","Qanun","Mbira"],
  battle:["Chinese War Drums","Buk Drum","Viking War Horns","Industrial Percussion"],
  ocean:["Uilleann Pipes","Ocean Drum"],
  cathedral:["Pipe Organ","Church Bells","Choir"],
  emotional:["Grand Piano","Violin Section","Cello Section"],
  metal:["Aggressive Rhythm Guitars","Distorted Electric Guitar","Double Bass Drums","Deep Sub Bass"]
 }
};
let assistantLastResult=null;

function assistantNormalize(text){
 return String(text||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
}
function assistantHas(text,key){
 return ASSISTANT_RULES.keywords[key].some(word=>text.includes(assistantNormalize(word)));
}
function firstExisting(options,list){
 return options.find(x=>list.includes(x))||options.find(x=>list.some(y=>x.toLowerCase().includes(y.toLowerCase())))||null;
}
function instrumentExists(name){return INSTRUMENT_DB.some(x=>x.name===name)}
function existingInstruments(names){return unique(names.filter(instrumentExists))}
function inferLanguage(text){
 if(assistantHas(text,"portuguese"))return"Portuguese lyrics";
 if(assistantHas(text,"german"))return"German lyrics";
 if(assistantHas(text,"japanese"))return"Japanese lyrics";
 if(assistantHas(text,"oldNorse"))return"Old Danish (Viking Age) lyrics";
 return null;
}
function analyzeAssistantPrompt(){
 const raw=id("assistantPrompt").value.trim();
 if(!raw){showToast("Please enter a song idea first");return}
 const text=assistantNormalize(raw);
 const mode=id("assistantMode").value;
 const scope=id("assistantScope").value;
 const matched=Object.keys(ASSISTANT_RULES.keywords).filter(k=>assistantHas(text,k));
 let score=Math.min(98,45+matched.length*5+(raw.length>120?8:0));
 if(mode==="precise")score=Math.min(99,score+4);
 if(mode==="creative")score=Math.max(55,score-3);

 const result={
  keywords:matched,
  confidence:score,
  genreFamily:null,subgenre:null,secondGenre:null,bpm:null,songType:null,language:inferLanguage(text),
  leadCategory:null,leadVoice:null,secondVoice:null,choir:null,separation:null,voiceCharacters:[],vocalExtras:[],
  instruments:[],world:null,emotion:null,narrative:null,scene:null,atmosphere:null,
  energyCategory:null,energyStyles:[],energyLevel:null,dynamicLevel:null,
  production:null,mix:null,dynamics:null,productionExtras:[],
  metaStructure:[],metaMusic:[],metaVoices:[],metaStyles:[],metaAdlibs:[],metaChoirs:[]
 };

 if(assistantHas(text,"anime")){
   result.genreFamily=Object.keys(GENRE_LIBRARY).find(x=>/anime|japanese/i.test(x))||result.genreFamily;
   result.songType="Anime Opening";
   result.bpm=148;
   result.world=WORLDS.find(x=>/anime|isekai/i.test(x))||result.world;
   result.energyCategory="Anime / Cinematic";
   result.energyStyles.push("Opening Energy","Hero Theme");
   result.metaStyles.push("Soaring and anthemic");
 }
 if(assistantHas(text,"viking")){
   result.secondGenre=Object.keys(GENRE_LIBRARY).find(x=>/folk|fantasy|thematic/i.test(x))||result.secondGenre;
   result.world=WORLDS.find(x=>/viking|nordic/i.test(x))||result.world;
   result.instruments.push(...ASSISTANT_RULES.instruments.viking);
   result.energyStyles.push("Viking Charge","Epic Crescendo");
   result.metaChoirs.push("Layered Viking Chants");
 }
 if(assistantHas(text,"cyber")){
   result.secondGenre=Object.keys(GENRE_LIBRARY).find(x=>/electronic|edm|fantasy|thematic/i.test(x))||result.secondGenre;
   result.world=WORLDS.find(x=>/cyberpunk|sci-fi/i.test(x))||result.world;
   result.instruments.push(...ASSISTANT_RULES.instruments.cyber);
   result.atmosphere=ATMOSPHERES.find(x=>/neon|futuristic|industrial/i.test(x))||result.atmosphere;
   result.metaStyles.push("Dark and mysterious");
 }
 if(assistantHas(text,"metal")){
   result.genreFamily=result.genreFamily||Object.keys(GENRE_LIBRARY).find(x=>/metal/i.test(x));
   result.instruments.push(...ASSISTANT_RULES.instruments.metal);
   result.energyCategory="Metal / Heavy";
   result.energyStyles.push("Wall of Sound","Heavy Breakdown");
   result.productionExtras.push("Punchy Transients","Deep Sub Weight");
 }
 if(assistantHas(text,"edm")){
   result.genreFamily=result.genreFamily||Object.keys(GENRE_LIBRARY).find(x=>/electronic|edm/i.test(x));
   result.energyCategory="Elektronisch / Club";
   result.energyStyles.push("Festival Energy","Massive Drop");
   result.production="Festival Production";
   result.dynamics="Drop-driven arrangement";
 }
 if(assistantHas(text,"folk")){
   result.secondGenre=result.secondGenre||Object.keys(GENRE_LIBRARY).find(x=>/folk|acoustic/i.test(x));
   result.instruments.push(...ASSISTANT_RULES.instruments.folk);
 }
 if(assistantHas(text,"orchestral")){
   result.instruments.push(...ASSISTANT_RULES.instruments.anime.slice(0,3));
   result.production="Cinematic Production";
   result.metaMusic.push("Huge cinematic percussion","Soft strings");
 }
 if(assistantHas(text,"emotional")){
   result.emotion=EMOTIONS.find(x=>/emotional|melancholic|sad/i.test(x))||result.emotion;
   result.instruments.push(...ASSISTANT_RULES.instruments.emotional);
   result.metaVoices.push("Crying Voice","Broken Voice");
   result.metaStyles.push("Sad and breaking","Emotional");
 }
 if(assistantHas(text,"dark")){
   result.emotion=result.emotion||EMOTIONS.find(x=>/dark|mysterious|haunting/i.test(x));
   result.atmosphere=result.atmosphere||ATMOSPHERES.find(x=>/dark|haunted|gothic/i.test(x));
   result.metaStyles.push("Dark and mysterious");
 }
 if(assistantHas(text,"heroic")){
   result.emotion=result.emotion||EMOTIONS.find(x=>/heroic|triumphant|powerful/i.test(x));
   result.metaStyles.push("Heroic and triumphant");
 }
 if(assistantHas(text,"battle")){
   result.scene=SCENES.find(x=>/battle|final stand|siege/i.test(x))||result.scene;
   result.instruments.push(...ASSISTANT_RULES.instruments.battle);
   result.energyLevel=85;result.dynamicLevel=90;
   result.metaMusic.push("Heavy drums kick in","Tension building");
 }
 if(assistantHas(text,"festival")){
   result.production="Festival Production";
   result.metaMusic.push("Stadium crowd ambience","Big applause and cheering");
   result.metaAdlibs.push("Yeah!","Hey!","Come on!");
 }
 if(assistantHas(text,"ocean")){
   result.atmosphere=ATMOSPHERES.find(x=>/ocean|mist|sea/i.test(x))||result.atmosphere;
   result.instruments.push(...ASSISTANT_RULES.instruments.ocean);
   result.metaMusic.push("Ocean waves");
 }
 if(assistantHas(text,"cathedral")){
   result.scene=SCENES.find(x=>/ritual|cathedral|castle/i.test(x))||result.scene;
   result.instruments.push(...ASSISTANT_RULES.instruments.cathedral);
   result.metaMusic.push("Church bells");
 }
 if(assistantHas(text,"fire")){
   result.atmosphere=ATMOSPHERES.find(x=>/burning|fire|infernal/i.test(x))||result.atmosphere;
   result.metaMusic.push("Fire crackling");
 }
 if(assistantHas(text,"apocalypse")){
   result.world=WORLDS.find(x=>/post-apocalyptic|apocalypse/i.test(x))||result.world;
   result.scene=SCENES.find(x=>/apocalypse|new beginning/i.test(x))||result.scene;
 }
 if(assistantHas(text,"romance")){
   result.emotion=EMOTIONS.find(x=>/romantic|passionate/i.test(x))||result.emotion;
 }
 if(assistantHas(text,"female")){
   const cat=Object.entries(LEAD_VOICE_LIBRARY).find(([,v])=>v.some(x=>/female/i.test(x)));
   if(cat){result.leadCategory=cat[0];result.leadVoice=cat[1].find(x=>/female/i.test(x))}
   result.metaVoices.push("Female Vocal");
 }
 if(assistantHas(text,"male")){
   const cat=Object.entries(LEAD_VOICE_LIBRARY).find(([,v])=>v.some(x=>/male/i.test(x)));
   if(!result.leadVoice&&cat){result.leadCategory=cat[0];result.leadVoice=cat[1].find(x=>/male/i.test(x))}
   result.metaVoices.push("Male Vocal");
 }
 if(assistantHas(text,"spoken")){
   result.secondVoice="Deep Male Vocal Spoken";
   result.separation="Clear voice separation";
   result.narrative=NARRATIVES.find(x=>/narrator|dialogue|monologue|log/i.test(x))||result.narrative;
   result.metaVoices.push("Deep Male Vocal Spoken","Spoken Word");
 }
 if(assistantHas(text,"choir")){
   result.choir=CHOIRS.find(x=>/opera|satb|epic|cinematic/i.test(x))||CHOIRS[1];
   result.metaChoirs.push(/opera/.test(text)?"Full Opera Choir":"SATB Choir, layered vocals, big singalong");
 }
 if(assistantHas(text,"growl")){
   result.vocalExtras.push("Male Growls","Female Screams","Gang Chants");
   result.metaVoices.push("Scream","Growls","Gang Shouts");
 }
 if(assistantHas(text,"piano"))result.instruments.push(...ASSISTANT_RULES.instruments.emotional.slice(0,1));
 if(assistantHas(text,"guitar"))result.instruments.push("Spanish Classical Guitar","Aggressive Rhythm Guitars");

 result.instruments=existingInstruments(result.instruments);
 result.voiceCharacters=unique([
   assistantHas(text,"dark")?"Dark":null,
   assistantHas(text,"emotional")?"Emotional":null,
   assistantHas(text,"heroic")?"Heroic":null,
   assistantHas(text,"cyber")?"Robotic":null
 ].filter(Boolean));
 result.energyStyles=unique(result.energyStyles);
 result.productionExtras=unique(result.productionExtras);
 result.metaMusic=unique(result.metaMusic);
 result.metaVoices=unique(result.metaVoices);
 result.metaStyles=unique(result.metaStyles);
 result.metaAdlibs=unique(result.metaAdlibs);
 result.metaChoirs=unique(result.metaChoirs);
 result.metaStructure=["Intro","Verse 1","Pre-Chorus","Chorus","Verse 2","Bridge","Final Chorus","Outro"];
 result.bpm=result.bpm||(/ballad|slow|ruhig/.test(text)?82:/fast|schnell/.test(text)?160:136);
 result.production=result.production||"Cinematic Production";
 result.mix=result.mix||"Dynamic Mix";
 result.dynamics=result.dynamics||"Gradual Build-Up";
 result.energyLevel=result.energyLevel||(/calm|ruhig|soft/.test(text)?30:/battle|festival|metal/.test(text)?82:60);
 result.dynamicLevel=result.dynamicLevel||(/finale|climax|battle|drop/.test(text)?88:65);

 if(scope==="instruments"){
   Object.keys(result).forEach(k=>{if(!["keywords","confidence","instruments"].includes(k)&&Array.isArray(result[k]))result[k]=[]});
 }else if(scope==="metatags"){
   result.genreFamily=result.subgenre=result.secondGenre=result.bpm=result.songType=result.language=null;
   result.leadCategory=result.leadVoice=result.secondVoice=result.choir=result.separation=null;
   result.instruments=[];result.world=result.emotion=result.narrative=result.scene=result.atmosphere=null;
   result.production=result.mix=result.dynamics=null;
 }else if(scope==="vocals"){
   result.genreFamily=result.subgenre=result.secondGenre=result.bpm=result.songType=result.language=null;
   result.instruments=[];result.world=result.emotion=result.narrative=result.scene=result.atmosphere=null;
   result.production=result.mix=result.dynamics=null;
 }

 assistantLastResult=result;
 renderAssistantResult(result);
}
function assistantDisplay(value){const loc=x=>typeof libraryLabel==="function"?libraryLabel(x,"assistant"):x;return Array.isArray(value)?value.map(loc).join(", "):loc(value||"—")}
function renderAssistantResult(r){
 id("assistantResultPanel").classList.remove("hidden");
 id("assistantConfidence").textContent=`${r.confidence}%`;
 const summaries=[
  ["Genre",assistantDisplay([r.genreFamily,r.secondGenre].filter(Boolean))],
  ["Vocals",assistantDisplay([r.leadVoice,r.secondVoice,r.choir].filter(Boolean))],
  ["Instrumente",assistantDisplay(r.instruments.slice(0,6))],
  ["Story",assistantDisplay([r.world,r.emotion,r.scene].filter(Boolean))],
  ["Energie",assistantDisplay([r.energyCategory,...r.energyStyles].filter(Boolean))],
  ["Produktion",assistantDisplay([r.production,r.mix,r.dynamics].filter(Boolean))]
 ];
 id("assistantSummaryCards").innerHTML=summaries.map(([k,v])=>`<div class="assistant-summary-card"><b>${k}</b><span>${escapeHTML(v)}</span></div>`).join("");
 id("assistantKeywords").innerHTML=r.keywords.length?r.keywords.map(x=>`<span class="chip active">${escapeHTML(x)}</span>`).join(""):'<small>${fullUiText("dynamic_no_keywords")}</small>';
 const suggestions=[
  ["Genres & BPM",[r.genreFamily,r.subgenre,r.secondGenre,r.songType,r.language,r.bpm?`${r.bpm} BPM`:null]],
  ["Vocals",[r.leadVoice,r.secondVoice,r.choir,r.separation,...r.voiceCharacters,...r.vocalExtras]],
  ["Instrumente",r.instruments],
  ["Story & Emotion",[r.world,r.emotion,r.narrative,r.scene,r.atmosphere]],
  ["Energie & Dynamik",[r.energyCategory,...r.energyStyles,`${r.energyLevel}/100`,`${r.dynamicLevel}/100`]],
  ["Produktion",[r.production,r.mix,r.dynamics,...r.productionExtras]],
  ["MetaTags",[...r.metaStructure.map(x=>`[${x}]`),...r.metaMusic.map(x=>`[Music: ${x}]`),...r.metaVoices.map(x=>`[${x}]`),...r.metaStyles.map(x=>`[Style: ${x}]`),...r.metaChoirs.map(x=>`[Chorus: ${x}]`)]]
 ];
 id("assistantSuggestions").innerHTML=suggestions.map(([k,v])=>`<div class="assistant-suggestion"><b>${k}</b><code>${escapeHTML(v.filter(Boolean).join(", ")||"Keine Änderung")}</code></div>`).join("");
 id("assistantStatus").textContent=`Analyse abgeschlossen: ${r.keywords.length} relevante Themen erkannt.`;
}
function setSelectIfAvailable(selectId,value){
 if(!value||!id(selectId))return;
 const options=[...id(selectId).options].map(x=>x.value);
 const exact=options.find(x=>x===value);
 const fuzzy=options.find(x=>x.toLowerCase().includes(String(value).toLowerCase())||String(value).toLowerCase().includes(x.toLowerCase()));
 if(exact||fuzzy)id(selectId).value=exact||fuzzy;
}
function applyAssistantResult(forceAll=false,metaOnly=false){
 const r=assistantLastResult;if(!r){showToast("No analysis available yet");return}
 const doGenres=forceAll||(!metaOnly&&id("applyGenres").checked);
 const doVocals=forceAll||(!metaOnly&&id("applyVocals").checked);
 const doInstruments=forceAll||(!metaOnly&&id("applyInstruments").checked);
 const doStory=forceAll||(!metaOnly&&id("applyStory").checked);
 const doProduction=forceAll||(!metaOnly&&id("applyProduction").checked);
 const doMetatags=forceAll||metaOnly||id("applyMetatags").checked;

 if(doGenres){
   setSelectIfAvailable("genreFamily",r.genreFamily);refreshSubgenres();
   setSelectIfAvailable("subgenre",r.subgenre);
   setSelectIfAvailable("secondGenre",r.secondGenre);
   setSelectIfAvailable("songType",r.songType);
   setSelectIfAvailable("language",r.language);
   if(r.bpm)id("bpm").value=r.bpm;
 }
 if(doVocals){
   setSelectIfAvailable("leadVoiceCategory",r.leadCategory);refreshLeadVoices();
   setSelectIfAvailable("leadVoice",r.leadVoice);
   setSelectIfAvailable("secondVoice",r.secondVoice);
   setSelectIfAvailable("choir",r.choir);
   setSelectIfAvailable("voiceSeparation",r.separation);
   appState.voiceCharacters=unique(r.voiceCharacters);
   appState.vocalExtras=unique(r.vocalExtras);
 }
 if(doInstruments)appState.instruments=unique(r.instruments);
 if(doStory){
   setSelectIfAvailable("world",r.world);setSelectIfAvailable("emotion",r.emotion);setSelectIfAvailable("narrative",r.narrative);
   setSelectIfAvailable("scene",r.scene);setSelectIfAvailable("atmosphere",r.atmosphere);
   setSelectIfAvailable("energyCategory",r.energyCategory);
   appState.energyStyles=unique(r.energyStyles);
   if(r.energyLevel!==null)id("energyLevel").value=r.energyLevel;
   if(r.dynamicLevel!==null)id("dynamicLevel").value=r.dynamicLevel;
 }
 if(doProduction){
   setSelectIfAvailable("production",r.production);setSelectIfAvailable("mix",r.mix);setSelectIfAvailable("dynamics",r.dynamics);
   appState.productionExtras=unique(r.productionExtras);
 }
 if(doMetatags){
   appState.metaStructure=unique(r.metaStructure);
   appState.metaMusic=unique(r.metaMusic);
   appState.metaVoices=unique(r.metaVoices);
   appState.metaStyles=unique(r.metaStyles);
   appState.metaAdlibs=unique(r.metaAdlibs);
   appState.metaChoirs=unique(r.metaChoirs);
 }
 renderDynamicLists();updateBpmDisplay();updateRangeLabels();generateOutput();showToast("Assistant suggestions applied");
}


const STRUCTURE_SECTIONS=["Intro","Verse 1","Pre-Chorus","Chorus","Verse 2","Post-Chorus","Bridge","Instrumental Break","Solo","Breakdown","Final Chorus","Outro"];
function formatSongDuration(){const seconds=+(id("songDuration")?.value||180);return `approx. ${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,"0")} song duration`}
function smartBpmCandidates(){
 const genre=id("genreFamily")?.value||"";const sub=id("subgenre")?.value||"";
 let range=typeof musicProfile==="function"?musicProfile(genre,sub).bpm:null;
 if(!range||!Array.isArray(range)||range.length<2){const v=+id("bpm").value;range=[Math.max(40,v-18),Math.min(240,v+18)]}
 const [lo,hi]=range.map(Number);const mid=Math.round((lo+hi)/2);
 return unique([lo,Math.round((lo*2+hi)/3),mid,Math.round((lo+hi*2)/3),hi].map(x=>Math.max(40,Math.min(240,Math.round(x)))));
}
function renderSmartBpm(){
 const host=id("smartBpmChips");if(!host)return;const current=+id("bpm").value;const values=smartBpmCandidates();const mid=values[Math.floor(values.length/2)];
 host.innerHTML=values.map(v=>`<button type="button" class="smart-bpm-chip ${v===mid?"recommended":""}" data-smart-bpm="${v}">${v}<small>${v===mid?"recommended":""}</small></button>`).join("");
 host.querySelectorAll("[data-smart-bpm]").forEach(btn=>btn.onclick=()=>{id("bpm").value=btn.dataset.smartBpm;updateBpmDisplay();renderSmartBpm();generateOutput()});
 const summary=id("smartBpmSummary");if(summary)summary.textContent=`Typical range: ${values[0]}–${values.at(-1)} BPM · current ${current}`;
}
function recommendedStructure(){
 const seconds=+(id("songDuration")?.value||180);const type=(id("songType")?.value||"").toLowerCase();const genre=(id("genreFamily")?.value||"").toLowerCase();
 if(/intro|bumper|jingle|logo/.test(type))return ["Intro","Chorus","Outro"];
 if(/ambient|meditation|background|soundscape/.test(type)||/ambient/.test(genre))return ["Intro","Verse 1","Instrumental Break","Verse 2","Outro"];
 if(seconds<=130)return ["Intro","Verse 1","Pre-Chorus","Chorus","Verse 2","Final Chorus","Outro"];
 if(seconds<=190)return ["Intro","Verse 1","Pre-Chorus","Chorus","Verse 2","Pre-Chorus","Chorus","Bridge","Final Chorus","Outro"];
 if(seconds<=250)return ["Intro","Verse 1","Pre-Chorus","Chorus","Verse 2","Pre-Chorus","Chorus","Instrumental Break","Bridge","Final Chorus","Outro"];
 return ["Intro","Verse 1","Pre-Chorus","Chorus","Verse 2","Pre-Chorus","Chorus","Instrumental Break","Verse 3","Bridge","Solo","Final Chorus","Outro"];
}
function renderStructureBuilder(){
 const host=id("structureTimeline"),palette=id("structurePalette");if(!host||!palette)return;
 if(!appState.structureInitialized&&appState.metaStructure.length===0){appState.metaStructure=[...recommendedStructure()];appState.structureInitialized=true}
 const structure=appState.metaStructure;
 host.innerHTML=structure.map((name,i)=>`<div class="structure-item" draggable="true" data-structure-index="${i}"><span>☷</span><b>${escapeHTML(name)}</b><button class="structure-remove" type="button" aria-label="Remove">×</button></div>`).join("");
 host.querySelectorAll(".structure-remove").forEach((btn,i)=>btn.onclick=()=>{appState.structureInitialized=true;appState.metaStructure.splice(i,1);renderStructureBuilder();renderMetaTagBuilder();generateOutput()});
 let from=null;host.querySelectorAll(".structure-item").forEach(item=>{
   item.ondragstart=()=>{from=+item.dataset.structureIndex;item.classList.add("dragging")};item.ondragend=()=>item.classList.remove("dragging");
   item.ondragover=e=>{e.preventDefault();item.classList.add("drag-over")};item.ondragleave=()=>item.classList.remove("drag-over");
   item.ondrop=e=>{e.preventDefault();item.classList.remove("drag-over");const to=+item.dataset.structureIndex;if(from===null||from===to)return;const [moved]=appState.structureInitialized=true;appState.metaStructure.splice(from,1);appState.metaStructure.splice(to,0,moved);renderStructureBuilder();renderMetaTagBuilder();generateOutput()};
 });
 palette.innerHTML=STRUCTURE_SECTIONS.map(name=>`<button type="button" data-add-section="${escapeHTML(name)}">+ ${escapeHTML(name)}</button>`).join("");
 palette.querySelectorAll("[data-add-section]").forEach(btn=>btn.onclick=()=>{appState.structureInitialized=true;appState.metaStructure.push(btn.dataset.addSection);renderStructureBuilder();renderMetaTagBuilder();generateOutput()});
}
function updateDurationStats(){
 const host=id("durationStats");if(!host)return;const seconds=+(id("songDuration")?.value||180);const structure=appState.metaStructure.length?appState.metaStructure:recommendedStructure();
 const verses=structure.filter(x=>/^Verse/i.test(x)).length;const choruses=structure.filter(x=>/Chorus/i.test(x)).length;
 host.innerHTML=`<div class="duration-stat"><b>${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,"0")}</b><small>target length</small></div><div class="duration-stat"><b>${verses}</b><small>verse sections</small></div><div class="duration-stat"><b>${choruses}</b><small>chorus sections</small></div>`;
}
function applyAutoStructure(){appState.structureInitialized=true;appState.metaStructure=recommendedStructure();renderStructureBuilder();renderMetaTagBuilder();updateDurationStats();generateOutput();showToast("Song structure updated")}
function phase2Refresh(){renderSmartBpm();renderStructureBuilder();updateDurationStats()}

function initSelects(){fillSelect(id("genreFamily"),Object.keys(GENRE_LIBRARY));refreshSubgenres();fillSelect(id("secondGenre"),["None",...Object.keys(GENRE_LIBRARY)]);fillSelect(id("songType"),SONG_TYPES);fillSelect(id("language"),LANGUAGES);fillSelect(id("voicePreset"),["None",...Object.keys(VOICE_PRESETS).filter(x=>x!=="None")]);fillSelect(id("leadVoiceCategory"),["None",...Object.keys(LEAD_VOICE_LIBRARY).filter(x=>x!=="None")]);refreshLeadVoices();fillSelect(id("voiceFx"),VOICE_FX);fillSelect(id("choir"),CHOIRS);fillSelect(id("secondVoice"),SECOND_VOICES);fillSelect(id("voiceSeparation"),SEPARATIONS);fillSelect(id("voiceCharacterCategory"),["All",...Object.keys(VOICE_CHARACTER_LIBRARY)]);fillSelect(id("singerOneVoice"),["Male Vocal","Female Vocal","Deep Male Vocal Spoken","Female Vocal Spoken","Operatic Lead","Whispered Vocal"]);
fillSelect(id("singerTwoVoice"),["Female Vocal","Male Vocal","Deep Male Vocal Spoken","Female Vocal Spoken","Operatic Lead","Whispered Vocal"]);fillSelect(id("instrumentRegion"),["Alle Regionen",...allInstrumentRegions()]);fillSelect(id("instrumentCountry"),["All Countries"]);fillSelect(id("instrumentFamily"),["Alle Familien"]);refreshInstrumentFilters();fillSelect(id("world"),WORLDS);fillSelect(id("emotion"),EMOTIONS);fillSelect(id("narrative"),["None",...NARRATIVES]);fillSelect(id("scene"),["None",...SCENES]);fillSelect(id("atmosphere"),["None",...ATMOSPHERES]);fillSelect(id("energyCategory"),Object.keys(ENERGY_LIBRARY));fillSelect(id("production"),PRODUCTIONS);fillSelect(id("mix"),MIXES);fillSelect(id("dynamics"),DYNAMICS);fillSelect(id("drumMix"),DRUM_MIXES);fillSelect(id("vocalProduction"),VOCAL_PRODUCTIONS);fillSelect(id("mastering"),MASTERING_STYLES);fillSelect(id("rhythmFeel"),RHYTHM_FEELS);fillSelect(id("tempoCharacterTheory"),TEMPO_CHARACTERS);fillSelect(id("songEnergyProfile"),SONG_ENERGY_PROFILES);fillSelect(id("harmonyMode"),HARMONY_MODES);fillSelect(id("harmonyComplexity"),HARMONY_COMPLEXITIES);fillSelect(id("melodyMotion"),MELODY_MOTIONS);fillSelect(id("theoryDynamics"),THEORY_DYNAMICS)}
function wire(){buildLanguageMenu();const languageButton=id("languageButton"),languageMenu=id("languageMenu");languageButton.onclick=()=>languageMenu.classList.toggle("hidden");document.addEventListener("click",e=>{if(!e.target.closest(".language-picker"))languageMenu.classList.add("hidden")});
 const changelog=id("changelogModal");
 id("openChangelog").onclick=()=>changelog.classList.remove("hidden");
 id("closeChangelog").onclick=()=>changelog.classList.add("hidden");
 changelog.querySelectorAll("[data-close-modal]").forEach(el=>el.onclick=()=>changelog.classList.add("hidden"));
 document.addEventListener("keydown",event=>{if(event.key==="Escape")changelog.classList.add("hidden")});

 id("assistantAnalyze").onclick=analyzeAssistantPrompt;
 id("assistantExample").onclick=()=>{id("assistantPrompt").value="Ein düsteres Anime-Opening über einen Wikinger, der in einer Cyberwelt erwacht. Weibliche Hauptstimme, tiefer männlicher Erzähler, großer Opernchor, Tagelharpa, War Drums, harte elektronische Drops und ein riesiges cineastisches Finale.";};
 id("assistantClear").onclick=()=>{id("assistantPrompt").value="";assistantLastResult=null;id("assistantResultPanel").classList.add("hidden");id("assistantStatus").textContent="Noch keine Analyse durchgeführt.";};
 id("assistantApply").onclick=()=>applyAssistantResult(false,false);
 id("assistantApplyAll").onclick=()=>applyAssistantResult(true,false);
 id("assistantOnlyMeta").onclick=()=>applyAssistantResult(false,true);
 document.querySelectorAll(".nav").forEach(btn=>btn.onclick=()=>{document.querySelectorAll(".nav").forEach(x=>x.classList.remove("active"));document.querySelectorAll(".view").forEach(x=>x.classList.remove("active"));btn.classList.add("active");id(btn.dataset.view).classList.add("active")});id("genreFamily").onchange=()=>{refreshSubgenres();generateOutput()};id("leadVoiceCategory").onchange=()=>{refreshLeadVoices();generateOutput()};document.querySelectorAll('input[name="vocalMode"]').forEach(radio=>radio.addEventListener("change",()=>{setVocalMode(radio.value);generateOutput()}));
 initVocalClarityControls();
 id("lyricsEditor")?.addEventListener("input",scheduleVocalClarityRefresh);
 document.addEventListener("nordlicht-language-changed",()=>{localizeVocalClarity();if(window.NSW_VOCAL_CLARITY_LAST)renderVocalClarity(window.NSW_VOCAL_CLARITY_LAST)});
 id("voicePreset").onchange=applyVoicePreset;
["useNamedSingers","singerOneName","singerTwoName","singerOneVoice","singerTwoVoice","namedSingerTogether","namedDuetMode"].forEach(key=>{
 const el=id(key);
 if(el){
   const eventName=(el.tagName==="INPUT"&&el.type!=="checkbox")?"input":"change";
   el.addEventListener(eventName,()=>{updateNamedSingerPreview();generateOutput()});
 }
});
id("genreFamily").addEventListener("change",()=>{renderGenreIntelligence();renderInstrumentRecommendations()});id("subgenre").addEventListener("change",()=>{renderGenreIntelligence();renderInstrumentRecommendations()});id("secondGenre").addEventListener("change",renderGenreIntelligence);id("voiceCharacterCategory").onchange=renderDynamicLists;id("voiceSearch").oninput=renderDynamicLists;id("instrumentRegion").onchange=()=>{refreshInstrumentFilters("region");renderDynamicLists();generateOutput()};id("instrumentCountry").onchange=()=>{refreshInstrumentFilters("country");renderDynamicLists();generateOutput()};id("instrumentFamily").onchange=()=>{renderDynamicLists();generateOutput()};id("instrumentSearch").oninput=renderDynamicLists;if(id("instrumentReliability"))id("instrumentReliability").onchange=renderDynamicLists;if(id("includeTempoDescriptor"))id("includeTempoDescriptor").onchange=generateOutput;if(id("includeLanguageInStyle"))id("includeLanguageInStyle").onchange=generateOutput;id("recommendedInstruments").onclick=()=>{const recs=typeof recommendedInstrumentsForCurrentStyle==="function"?recommendedInstrumentsForCurrentStyle(6):shuffleArray(INSTRUMENT_DB).slice(0,6).map(x=>x.name);appState.instruments=unique([...appState.instruments,...recs]);renderDynamicLists();generateOutput();showToast("Style-based instruments added")};id("clearInstruments").onclick=()=>{appState.instruments=[];renderDynamicLists();generateOutput()};id("energyCategory").onchange=renderDynamicLists;id("energySearch").oninput=renderDynamicLists;id("favoriteVoicesOnly").onchange=renderDynamicLists;id("favoriteInstrumentsOnly").onchange=renderDynamicLists;id("favoriteGenresOnly").onchange=()=>{const fav=appState.itemFavorites.genres;if(id("favoriteGenresOnly").checked&&fav.length){fillSelect(id("genreFamily"),fav);if(!fav.includes(id("genreFamily").value))id("genreFamily").value=fav[0]}else fillSelect(id("genreFamily"),Object.keys(GENRE_LIBRARY));refreshSubgenres();renderDynamicLists();generateOutput()};id("toggleCurrentGenreFavorite").onclick=()=>{const g=id("genreFamily").value;if(g&&g!=="None")toggleItemFavorite("genres",g)};document.querySelectorAll("[data-live-tab]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-live-tab]").forEach(x=>x.classList.toggle("active",x===b));document.querySelectorAll("[data-live-panel]").forEach(x=>x.classList.toggle("active",x.dataset.livePanel===b.dataset.liveTab));updateLivePreviewStats()});document.querySelectorAll("[data-quick-preset]").forEach(b=>b.onclick=()=>quickPreset(b.dataset.quickPreset));id("useCurrentPromptButton").onclick=()=>{id("optimizerInput").value=id("styleOutput").value;runPromptOptimizer()};id("optimizePromptButton").onclick=runPromptOptimizer;id("applyOptimizedPromptButton").onclick=()=>{const value=id("optimizerOutput").value;if(!value)return showToast("Zuerst einen Prompt optimieren");id("customStyle").value=value;generateOutput();showToast("Optimierter Prompt übernommen")};id("toggleScoreWhy").onclick=()=>{id("scoreWhyPanel").classList.toggle("hidden");id("toggleScoreWhy").textContent=id("scoreWhyPanel").classList.contains("hidden")?"💡 WARUM DIESER SCORE?":"✕ ERKLÄRUNG SCHLIESSEN"};id("bpm").oninput=()=>{updateBpmDisplay();generateOutput()};id("energyLevel").oninput=()=>{updateRangeLabels();generateOutput()};id("dynamicLevel").oninput=()=>{updateRangeLabels();generateOutput()};document.querySelectorAll("select,textarea,input").forEach(el=>{if(el.id&&el.id.startsWith("lyrics"))return;if(!el.onchange&&el.type!=="range")el.addEventListener("change",generateOutput);if(el.tagName==="TEXTAREA")el.addEventListener("input",generateOutput)});id("mainRandomButton").onclick=runSmartRandom;id("rightRandomButton").onclick=runSmartRandom;id("mainResetButton").onclick=resetBuilder;id("rightResetButton").onclick=resetBuilder;id("copyStyle").onclick=()=>copyField("styleOutput");id("copyExclude").onclick=()=>copyField("excludeOutput");id("copyMetaTags").onclick=()=>copyField("metaTagsOutput");id("refreshMetaSuggestions").onclick=()=>{renderMetaSuggestions();generateOutput();showToast("MetaTag suggestions refreshed")};
 id("songDuration").onchange=()=>{applyAutoStructure();updateDurationStats()};
 id("autoStructureButton").onclick=applyAutoStructure;
 id("clearStructureButton").onclick=()=>{appState.structureInitialized=true;appState.metaStructure=[];renderStructureBuilder();renderMetaTagBuilder();updateDurationStats();generateOutput()};
 id("autoBpmByGenre").onchange=()=>{if(id("autoBpmByGenre").checked){const c=smartBpmCandidates();id("bpm").value=c[Math.floor(c.length/2)];updateBpmDisplay();generateOutput()}};
 id("genreFamily").addEventListener("change",()=>{if(id("autoBpmByGenre")?.checked){const c=smartBpmCandidates();id("bpm").value=c[Math.floor(c.length/2)];updateBpmDisplay()}phase2Refresh()});
 id("subgenre").addEventListener("change",()=>{if(id("autoBpmByGenre")?.checked){const c=smartBpmCandidates();id("bpm").value=c[Math.floor(c.length/2)];updateBpmDisplay()}phase2Refresh()});
 id("metaTagFormat").onchange=()=>{updateMetaFormatExample();generateOutput()};
 id("sectionAwareMetaTags").onchange=generateOutput;
 id("avoidMetaRepetition").onchange=generateOutput;
id("clearMetaTags").onclick=()=>{appState.metaStructure=[];appState.metaMusic=[];appState.metaVoices=[];appState.metaStyles=[];appState.metaAdlibs=[];appState.metaChoirs=[];id("customMetaTags").value="";renderDynamicLists();generateOutput();showToast("MetaTags geleert")};
id("autoMetaTags").onchange=generateOutput;
id("customMetaTags").oninput=generateOutput;
id("rightSavePreset").onclick=saveCurrentPreset;id("centerSavePreset").onclick=saveCurrentPreset;id("topSavePreset").onclick=saveCurrentPreset;id("presetSearch").oninput=renderPresetManager;document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{appState.activePresetTab=b.dataset.tab;renderPresetManager()});id("topExport").onclick=()=>exportBackup({form:collectFormState(),presets:appState.presets,favorites:appState.favorites,itemFavorites:appState.itemFavorites,history:appState.history});id("topImport").onclick=()=>id("importFile").click();id("importFile").onchange=e=>{const file=e.target.files[0];if(file)importBackup(file,data=>{appState.presets=data.presets||[];appState.favorites=data.favorites||[];appState.itemFavorites=Object.assign({genres:[],instruments:[],voices:[]},data.itemFavorites||{});appState.history=data.history||[];if(data.form)applyFormState(data.form);renderPresetManager();persist();showToast("Import erfolgreich")},()=>alert("Invalid backup file"))}}

function finishAppLoading(){
 const loader=id("appLoader");
 if(!loader)return;
 requestAnimationFrame(()=>setTimeout(()=>loader.classList.add("loaded"),350));
}

function init(){currentUiLanguage=detectLanguage();initSelects();renderRandomOptions();bindRandomizerModes();wire();restore();setVocalMode(currentVocalMode());updateNamedSingerPreview();updateMetaFormatExample();renderDynamicLists();updateBpmDisplay();updateRangeLabels();phase2Refresh();generateOutput();renderPresetManager()}
init();
applyLanguage(currentUiLanguage);
finishAppLoading();

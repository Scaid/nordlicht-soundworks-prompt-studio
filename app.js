const SONG_TYPES=["None","Anime Opening","Anime Ending","OST","Trailer","Battle Theme","Boss Fight","Character Theme","Final Battle","Story Song","Festival Anthem","Dark Ballad","Ritual Song"];
const LANGUAGES=["None","Mandarin Chinese lyrics","Spanish lyrics","English lyrics","Hindi lyrics","Portuguese lyrics","Bengali lyrics","Russian lyrics","Japanese lyrics","Western Punjabi lyrics","Marathi lyrics","Telugu lyrics","Wu Chinese lyrics","Turkish lyrics","Korean lyrics","French lyrics","German lyrics","Vietnamese lyrics","Tamil lyrics","Yue Chinese (Cantonese) lyrics","Urdu lyrics","Danish lyrics","Old Danish (Viking Age) lyrics","Norwegian lyrics","Swedish lyrics","Finnish lyrics","Mixed-language lyrics","Latin phrases"];
const VOICE_FX=["None","Natural","Cinematic Reverb","Ghostly Echoes","Short Delay Throws","Vocoder Texture","Robot Processing","Light Distortion","Wide Harmonizer","Radio Effect"];
const CHOIRS=["None","SATB Choir","Ancient Choir","Deep Male Choir","Ethereal Female Choir","Layered Viking Chants","Gang Shouts","Children's Choir","Celestial Choir"];
const SECOND_VOICES=["None","Deep Male Vocal Spoken","Female Vocal Spoken","Whispered Narrator","Robotic Spoken Voice","Male and Female Duet","Occasional Male Harmony","Occasional Female Harmony"];
const SEPARATIONS=["None","Single lead only","Clear voice separation","Dialogue-only second voice","No male singing","No female singing","Named character separation","Merged dual vocals in chorus"];
const VOCAL_EXTRAS=["Female Screams","Male Growls","Whispers","Shouted Hooks","Layered Harmonies","A cappella Break","Ad-libs","Call and Response","Breathy Delivery","Operatic Peaks","Gang Chants","Vocal Drone"];
const PRODUCTIONS=["None","Studio Quality Production","Cinematic Production","Modern Anime Production","Festival Production","Hybrid Production","Futuristic Production","Raw Organic Production","AAA Game Soundtrack Production","Trailer Music Production"];
const MIXES=["None","Wide Stereo Mix","Bright Modern Mix","Dark and Moody Mix","Huge Low-End Mix","Clean and Polished Mix","Raw and Organic Mix","High Fidelity Mix","Layered and Dense Mix","Dynamic Mix"];
const DYNAMICS=["None","Gradual Build-Up","Verse restrained, chorus explosive","Soft intro, huge finale","Drop-driven arrangement","Wide cinematic dynamics","Constant high energy","Abrupt contrast sections","Two massive drop points"];
const PRODUCTION_EXTRAS=["Massive Bass Drops","Anthemic Chorus","Layered Vocals","Huge Cinematic Finale","Emotional Climax","Bright and Brutal Mix","Wide Stereo Image","Punchy Transients","Deep Sub Weight","Modern Master","Studio Quality","Dynamic Arrangement","Final transition into Melodic Death Metal","No drums during intro"];
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
const WORLDS=flatten(STORY_LIBRARY.worlds);
const EMOTIONS=flatten(STORY_LIBRARY.emotions);
const SCENES=flatten(STORY_LIBRARY.scenes);
const ATMOSPHERES=flatten(STORY_LIBRARY.atmospheres);
const NARRATIVES=flatten(STORY_LIBRARY.narratives);
const appState={voiceCharacters:[],vocalExtras:[],instruments:[],energyStyles:[],productionExtras:[],excludes:[],metaStructure:[],metaMusic:[],metaVoices:[],metaStyles:[],metaAdlibs:[],metaChoirs:[],presets:[],favorites:[],history:[],activePresetTab:"presets"};

const id=x=>document.getElementById(x),pick=a=>a[Math.floor(Math.random()*a.length)],shuffleArray=a=>[...a].sort(()=>Math.random()-.5),unique=a=>[...new Set(a.filter(Boolean))];
const escapeHTML=s=>String(s??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll('"',"&quot;");
function fillSelect(el,items){el.innerHTML=items.map(v=>`<option value="${escapeHTML(v)}">${escapeHTML(v)}</option>`).join("")}
function showToast(text){const t=id("toast");t.textContent=text;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1300)}
function csv(text){return String(text||"").split(",").map(x=>x.trim()).filter(Boolean)}
function toggleArray(key,value){appState[key]=appState[key].includes(value)?appState[key].filter(x=>x!==value):[...appState[key],value]}
function renderChips(container,items,key){container.innerHTML=items.map(v=>`<span class="chip ${appState[key].includes(v)?"active":""}" data-v="${escapeHTML(v)}">${escapeHTML(v)}</span>`).join("");container.querySelectorAll(".chip").forEach(c=>c.onclick=()=>{toggleArray(key,c.dataset.v);renderDynamicLists();generateOutput()})}
function renderSelected(container,items,key){container.innerHTML=items.length?items.map(v=>`<span class="chip active" data-v="${escapeHTML(v)}">${escapeHTML(v)} ×</span>`).join(""):`<small>Noch keine Auswahl.</small>`;container.querySelectorAll(".chip").forEach(c=>c.onclick=()=>{toggleArray(key,c.dataset.v);renderDynamicLists();generateOutput()})}
function refreshSubgenres(){fillSelect(id("subgenre"),GENRE_LIBRARY[id("genreFamily").value]||[])}
function refreshLeadVoices(){fillSelect(id("leadVoice"),LEAD_VOICE_LIBRARY[id("leadVoiceCategory").value]||[])}
function voiceCharactersFiltered(){const cat=id("voiceCharacterCategory").value,q=id("voiceSearch").value.toLowerCase();const source=cat==="All"?flatten(VOICE_CHARACTER_LIBRARY):VOICE_CHARACTER_LIBRARY[cat]||[];return unique(source).filter(x=>!q||x.toLowerCase().includes(q))}
function energyFiltered(){const q=id("energySearch").value.toLowerCase();return (ENERGY_LIBRARY[id("energyCategory").value]||[]).filter(x=>!q||x.toLowerCase().includes(q))}
function instrumentsFiltered(){const r=id("instrumentRegion").value,c=id("instrumentCountry").value,f=id("instrumentFamily").value,q=id("instrumentSearch").value.toLowerCase();return INSTRUMENT_DB.filter(x=>(r==="Alle Regionen"||x.region===r)&&(c==="Alle Länder"||x.country===c)&&(f==="Alle Familien"||x.family===f)&&(!q||(x.name+" "+x.country+" "+x.family).toLowerCase().includes(q)))}
function renderInstruments(){const items=instrumentsFiltered();id("instrumentCount").textContent=`${items.length} von ${INSTRUMENT_DB.length} Instrumenten`;id("instrumentLibrary").innerHTML=items.map(x=>`<div class="instrument-card ${appState.instruments.includes(x.name)?"active":""}" data-v="${escapeHTML(x.name)}"><strong>${escapeHTML(x.name)}</strong><small>${escapeHTML(x.country)} · ${escapeHTML(x.family)}</small></div>`).join("");id("instrumentLibrary").querySelectorAll(".instrument-card").forEach(c=>c.onclick=()=>{toggleArray("instruments",c.dataset.v);renderDynamicLists();generateOutput()});renderSelected(id("selectedInstruments"),appState.instruments,"instruments")}

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

 if(/festival|anthem|kawaii|anime/.test(ctx))result.adlibs.push("Yeah!","Hey!");
 if(/battle|fight|metal/.test(ctx))result.adlibs.push("Come on!","Fight!");

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
 id("namedSingerPreview").value=tags.length?tags.join("\n"):"Aktiviere „Benannte Sänger verwenden“ und vergib zwei Namen.";
}

function metaTagsOutput(){
 const suggested=id("autoMetaTags")?.checked?recommendedMetaTags():{structure:[],music:[],voices:[],styles:[],adlibs:[],choirs:[]};
 const structure=unique([...appState.metaStructure,...suggested.structure]).map(x=>ensureBracketTag(x));
 const voices=unique([...appState.metaVoices,...suggested.voices]).map(x=>ensureBracketTag(x));
 const styles=unique([...appState.metaStyles,...suggested.styles]).map(x=>ensureBracketTag(x,"Style"));
 const music=unique([...appState.metaMusic,...suggested.music]).map(x=>ensureBracketTag(x,"Music"));
 const adlibs=unique([...appState.metaAdlibs,...suggested.adlibs]);
 const choirs=unique([...appState.metaChoirs,...suggested.choirs]).map(x=>ensureBracketTag(x,"Chorus"));
 const blocks=[...namedSingerHeaderTags(),""];
 const max=Math.max(structure.length,1);
 for(let i=0;i<max;i++){
   if(structure[i])blocks.push(structure[i]);
   const singerSections=namedSingerSectionTags();
   if(singerSections.length){
     if(i===1)blocks.push(singerSections[0]);
     else if(i===2)blocks.push(singerSections[1]);
     else if(i===3)blocks.push(singerSections[2]);
   }
   if(i===0){
     blocks.push(...music.slice(0,3),...voices.slice(0,2),...styles.slice(0,2));
   }else if(i===1){
     blocks.push(...voices.slice(2,4),...styles.slice(2,4));
   }else if(i===2&&adlibs.length){
     blocks.push(ensureBracketTag(adlibs.join(", "),"Ad libs"));
   }else if(i===3){
     blocks.push(...choirs.slice(0,2));
   }
   blocks.push("");
 }
 blocks.push(...customMetaTagLines());
 return blocks.join("\n").replace(/\n{3,}/g,"\n\n").trim();
}
function renderMetaSuggestions(){
 if(!id("metaSuggestions"))return;
 const r=recommendedMetaTags();
 const rows=[
  ["Structure",r.structure.map(x=>ensureBracketTag(x))],
  ["Music",r.music.map(x=>ensureBracketTag(x,"Music"))],
  ["Voices",r.voices.map(x=>ensureBracketTag(x))],
  ["Style",r.styles.map(x=>ensureBracketTag(x,"Style"))],
  ["Ad-libs",r.adlibs.length?[ensureBracketTag(r.adlibs.join(", "),"Ad libs")]:[]],
  ["Choirs",r.choirs.map(x=>ensureBracketTag(x,"Chorus"))]
 ];
 id("metaSuggestions").innerHTML=rows.map(([name,tags])=>`<div class="meta-suggestion-card"><b>${name}</b><code>${tags.length?tags.map(escapeHTML).join("<br>"):"Keine automatische Empfehlung"}</code></div>`).join("");
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

function renderDynamicLists(){renderMetaTagBuilder();renderChips(id("voiceCharacterList"),voiceCharactersFiltered(),"voiceCharacters");renderSelected(id("selectedVoiceCharacters"),appState.voiceCharacters,"voiceCharacters");renderChips(id("vocalExtras"),VOCAL_EXTRAS,"vocalExtras");renderInstruments();renderChips(id("energyList"),energyFiltered(),"energyStyles");renderSelected(id("selectedEnergy"),appState.energyStyles,"energyStyles");renderChips(id("productionExtras"),PRODUCTION_EXTRAS,"productionExtras");renderChips(id("excludeChips"),EXCLUDES,"excludes")}
function updateBpmDisplay(){const v=+id("bpm").value;id("bpmValue").textContent=v;const info=v<70?["Very slow","Ballad, Ambient"]:v<95?["Slow","Folk, Dark Ambient"]:v<120?["Mid-tempo","Rock, Storytelling"]:v<136?["Dance","EDM, House"]:v<156?["Fast","Anime Opening, Metalcore"]:v<181?["Very fast","Power Metal, DnB"]:["Extreme","Speed Metal"];id("tempoLabel").textContent=info[0];id("tempoHint").textContent=info[1]}

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
function generateOutput(){updateTheory();updateRangeLabels();updateNamedSingerPreview();const parts=[id("genreFamily").value,id("subgenre").value,id("secondGenre").value,`genre blend ${id("blend").value}`,`${id("bpm").value} BPM`,id("songType").value,id("language").value,id("leadVoice").value,...appState.voiceCharacters,id("voiceFx").value,id("choir").value,id("secondVoice").value,id("voiceSeparation").value,...appState.vocalExtras,...appState.instruments,id("world").value,id("emotion").value,id("narrative").value,id("scene").value,id("atmosphere").value,...appState.energyStyles,...energyTagsFromLevel(id("energyLevel").value),...dynamicsTagsFromLevel(id("dynamicLevel").value),id("production").value,id("mix").value,id("dynamics").value,...appState.productionExtras,...(id("includeTheory").checked?theoryValues():[]),...csv(id("customStyle").value)].filter(x=>x&&x!=="None");id("styleOutput").value=unique(parts).join(", ");id("excludeOutput").value=unique([...appState.excludes,...csv(id("customExclude").value)]).join(", ");if(id("metaTagsOutput"))id("metaTagsOutput").value=metaTagsOutput();renderMetaSuggestions();updateScore();persist()}
function updateScore(){let score=100;if(appState.instruments.length>10)score-=10;if(appState.voiceCharacters.length>9)score-=8;if(appState.energyStyles.length>5)score-=8;if(id("secondVoice").value!=="None"&&id("voiceSeparation").value==="Single lead only")score-=15;if(id("styleOutput").value.length>1000)score-=20;score=Math.max(0,score);id("score").textContent=score;const stars=Math.max(0,Math.min(5,Math.round(score/20)));id("stars").textContent="★★★★★".slice(0,stars)+"☆☆☆☆☆".slice(0,5-stars);const rows=[["Genre",score],["Vocals",Math.max(0,score-2)],["Instrumente",Math.max(0,score-4)],["Story",Math.max(0,score-3)],["Produktion",Math.max(0,score-1)]];id("scoreDetails").innerHTML=rows.map(([n,v])=>`<div class="score-row"><span>${n}</span><div class="score-bar"><i style="width:${v}%"></i></div><b>${v}</b></div>`).join("")}
function collectFormState(){const values={};document.querySelectorAll("select,input,textarea").forEach(el=>{if(el.id&&!["styleOutput","excludeOutput","presetSearch","voiceSearch","instrumentSearch","energySearch","importFile"].includes(el.id))values[el.id]=el.type==="checkbox"?el.checked:el.value});return{values,arrays:{voiceCharacters:[...appState.voiceCharacters],vocalExtras:[...appState.vocalExtras],instruments:[...appState.instruments],energyStyles:[...appState.energyStyles],productionExtras:[...appState.productionExtras],excludes:[...appState.excludes],metaStructure:[...appState.metaStructure],metaMusic:[...appState.metaMusic],metaVoices:[...appState.metaVoices],metaStyles:[...appState.metaStyles],metaAdlibs:[...appState.metaAdlibs],metaChoirs:[...appState.metaChoirs]}}}
function applyFormState(data){Object.entries(data.values||{}).forEach(([key,value])=>{const el=id(key);if(el){if(el.type==="checkbox")el.checked=value;else el.value=value}});Object.assign(appState,data.arrays||{});refreshSubgenres();refreshLeadVoices();renderDynamicLists();updateBpmDisplay();updateRangeLabels();generateOutput()}
function persist(){storageSave({form:collectFormState(),presets:appState.presets,favorites:appState.favorites,history:appState.history})}
function restore(){const saved=storageLoad();appState.presets=saved.presets||[];appState.favorites=saved.favorites||[];appState.history=saved.history||[];if(saved.form)applyFormState(saved.form)}
function renderRandomOptions(){const defs=[["genre","Genre",true],["bpm","BPM",true],["song","Songtyp & Sprache",true],["vocals","Vocals",true],["instruments","Instrumente",true],["world","Story-Welt",false],["emotion","Emotion",false],["story","Szene & Atmosphäre",false],["energy","Energie & Dynamik",false],["production","Produktion",true],["exclude","Exclude",false]];id("randomOptions").innerHTML=defs.map(([v,l,c])=>`<label><input type="checkbox" value="${v}" ${c?"checked":""}> ${l}</label>`).join("");id("randomMirror").innerHTML=defs.map(([v,l,c])=>`<label><input type="checkbox" data-mirror="${v}" ${c?"checked":""}> ${l}</label>`).join("");document.querySelectorAll("[data-mirror]").forEach(m=>m.onchange=()=>{document.querySelector(`#randomOptions input[value="${m.dataset.mirror}"]`).checked=m.checked});document.querySelectorAll("#randomOptions input").forEach(s=>s.onchange=()=>{const m=document.querySelector(`[data-mirror="${s.value}"]`);if(m)m.checked=s.checked})}
function applyVoicePreset(){const p=VOICE_PRESETS[id("voicePreset").value]||{};if(p.lead){for(const [cat,list] of Object.entries(LEAD_VOICE_LIBRARY))if(list.includes(p.lead)){id("leadVoiceCategory").value=cat;refreshLeadVoices();id("leadVoice").value=p.lead}}appState.voiceCharacters=p.characters||[];id("choir").value=p.choir||"None";id("secondVoice").value=p.second||"None";id("voiceSeparation").value=p.separation||"None";appState.vocalExtras=p.extras||[];renderDynamicLists();generateOutput()}
function quickPreset(type){if(type==="astravia"){id("language").value="German lyrics";id("world").value=WORLDS.find(x=>/Dark Fantasy/i.test(x))||id("world").value;id("emotion").value=EMOTIONS.find(x=>/^Emotional$/i.test(x))||id("emotion").value;appState.instruments=["Grand Piano","Violin Section","Cello Section","Aggressive Rhythm Guitars","Deep Sub Bass"].filter(x=>INSTRUMENT_DB.some(i=>i.name===x));appState.energyStyles=["Opening Energy","Hero Theme"]}else if(type==="viking"){id("world").value=WORLDS.find(x=>/^Viking$/i.test(x))||id("world").value;appState.instruments=["Tagelharpa","Nyckelharpa","Viking War Horns","Nordic Frame Drums","Hard Bass"].filter(x=>INSTRUMENT_DB.some(i=>i.name===x));appState.energyStyles=["Viking Charge","Epic Crescendo"]}else{id("world").value=WORLDS.find(x=>/Cyberpunk/i.test(x))||id("world").value;appState.instruments=["Analog Synthesizer","FM Synthesizer","Industrial Percussion","Distorted Synth Bass"].filter(x=>INSTRUMENT_DB.some(i=>i.name===x));appState.energyStyles=["Festival Energy","Maximum Energy"]}renderDynamicLists();generateOutput();showToast("Schnell-Preset geladen")}

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
 if(!raw){showToast("Bitte zuerst eine Songidee eingeben");return}
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
function assistantDisplay(value){return Array.isArray(value)?value.join(", "):(value||"—")}
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
 id("assistantKeywords").innerHTML=r.keywords.length?r.keywords.map(x=>`<span class="chip active">${escapeHTML(x)}</span>`).join(""):'<small>Keine eindeutigen Schlüsselbegriffe erkannt.</small>';
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
 const r=assistantLastResult;if(!r){showToast("Noch keine Analyse vorhanden");return}
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
 renderDynamicLists();updateBpmDisplay();updateRangeLabels();generateOutput();showToast("Assistant-Vorschläge übernommen");
}

function initSelects(){fillSelect(id("genreFamily"),Object.keys(GENRE_LIBRARY));refreshSubgenres();fillSelect(id("secondGenre"),["None",...Object.keys(GENRE_LIBRARY)]);fillSelect(id("songType"),SONG_TYPES);fillSelect(id("language"),LANGUAGES);fillSelect(id("voicePreset"),Object.keys(VOICE_PRESETS));fillSelect(id("leadVoiceCategory"),Object.keys(LEAD_VOICE_LIBRARY));refreshLeadVoices();fillSelect(id("voiceFx"),VOICE_FX);fillSelect(id("choir"),CHOIRS);fillSelect(id("secondVoice"),SECOND_VOICES);fillSelect(id("voiceSeparation"),SEPARATIONS);fillSelect(id("voiceCharacterCategory"),["All",...Object.keys(VOICE_CHARACTER_LIBRARY)]);fillSelect(id("singerOneVoice"),["Male Vocal","Female Vocal","Deep Male Vocal Spoken","Female Vocal Spoken","Operatic Lead","Whispered Vocal"]);
fillSelect(id("singerTwoVoice"),["Female Vocal","Male Vocal","Deep Male Vocal Spoken","Female Vocal Spoken","Operatic Lead","Whispered Vocal"]);fillSelect(id("instrumentRegion"),["Alle Regionen",...unique(INSTRUMENT_DB.map(x=>x.region)).sort()]);fillSelect(id("instrumentCountry"),["Alle Länder",...unique(INSTRUMENT_DB.map(x=>x.country)).sort()]);fillSelect(id("instrumentFamily"),["Alle Familien",...unique(INSTRUMENT_DB.map(x=>x.family)).sort()]);fillSelect(id("world"),WORLDS);fillSelect(id("emotion"),EMOTIONS);fillSelect(id("narrative"),["None",...NARRATIVES]);fillSelect(id("scene"),["None",...SCENES]);fillSelect(id("atmosphere"),["None",...ATMOSPHERES]);fillSelect(id("energyCategory"),Object.keys(ENERGY_LIBRARY));fillSelect(id("production"),PRODUCTIONS);fillSelect(id("mix"),MIXES);fillSelect(id("dynamics"),DYNAMICS)}
function wire(){
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
 document.querySelectorAll(".nav").forEach(btn=>btn.onclick=()=>{document.querySelectorAll(".nav").forEach(x=>x.classList.remove("active"));document.querySelectorAll(".view").forEach(x=>x.classList.remove("active"));btn.classList.add("active");id(btn.dataset.view).classList.add("active")});id("genreFamily").onchange=()=>{refreshSubgenres();generateOutput()};id("leadVoiceCategory").onchange=()=>{refreshLeadVoices();generateOutput()};id("voicePreset").onchange=applyVoicePreset;
["useNamedSingers","singerOneName","singerTwoName","singerOneVoice","singerTwoVoice","namedSingerTogether","namedDuetMode"].forEach(key=>{
 const el=id(key);
 if(el){
   const eventName=(el.tagName==="INPUT"&&el.type!=="checkbox")?"input":"change";
   el.addEventListener(eventName,()=>{updateNamedSingerPreview();generateOutput()});
 }
});
id("voiceCharacterCategory").onchange=renderDynamicLists;id("voiceSearch").oninput=renderDynamicLists;["instrumentRegion","instrumentCountry","instrumentFamily"].forEach(x=>id(x).onchange=renderDynamicLists);id("instrumentSearch").oninput=renderDynamicLists;id("recommendedInstruments").onclick=()=>{appState.instruments=shuffleArray(INSTRUMENT_DB).slice(0,6).map(x=>x.name);renderDynamicLists();generateOutput()};id("clearInstruments").onclick=()=>{appState.instruments=[];renderDynamicLists();generateOutput()};id("energyCategory").onchange=renderDynamicLists;id("energySearch").oninput=renderDynamicLists;id("bpm").oninput=()=>{updateBpmDisplay();generateOutput()};id("energyLevel").oninput=()=>{updateRangeLabels();generateOutput()};id("dynamicLevel").oninput=()=>{updateRangeLabels();generateOutput()};document.querySelectorAll("select,textarea,input").forEach(el=>{if(!el.onchange&&el.type!=="range")el.addEventListener("change",generateOutput);if(el.tagName==="TEXTAREA")el.addEventListener("input",generateOutput)});id("mainRandomButton").onclick=runSmartRandom;id("rightRandomButton").onclick=runSmartRandom;id("copyStyle").onclick=()=>copyField("styleOutput");id("copyExclude").onclick=()=>copyField("excludeOutput");id("copyMetaTags").onclick=()=>copyField("metaTagsOutput");id("refreshMetaSuggestions").onclick=()=>{renderMetaSuggestions();generateOutput();showToast("MetaTag-Vorschläge aktualisiert")};
id("clearMetaTags").onclick=()=>{appState.metaStructure=[];appState.metaMusic=[];appState.metaVoices=[];appState.metaStyles=[];appState.metaAdlibs=[];appState.metaChoirs=[];id("customMetaTags").value="";renderDynamicLists();generateOutput();showToast("MetaTags geleert")};
id("autoMetaTags").onchange=generateOutput;
id("customMetaTags").oninput=generateOutput;
id("rightSavePreset").onclick=saveCurrentPreset;id("centerSavePreset").onclick=saveCurrentPreset;id("topSavePreset").onclick=saveCurrentPreset;id("presetSearch").oninput=renderPresetManager;document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{appState.activePresetTab=b.dataset.tab;renderPresetManager()});id("topExport").onclick=()=>exportBackup({form:collectFormState(),presets:appState.presets,favorites:appState.favorites,history:appState.history});id("topImport").onclick=()=>id("importFile").click();id("importFile").onchange=e=>{const file=e.target.files[0];if(file)importBackup(file,data=>{appState.presets=data.presets||[];appState.favorites=data.favorites||[];appState.history=data.history||[];if(data.form)applyFormState(data.form);renderPresetManager();persist();showToast("Import erfolgreich")},()=>alert("Ungültige Backup-Datei"))}}

function finishAppLoading(){
 const loader=id("appLoader");
 if(!loader)return;
 requestAnimationFrame(()=>setTimeout(()=>loader.classList.add("loaded"),350));
}

function init(){initSelects();renderRandomOptions();wire();restore();updateNamedSingerPreview();renderDynamicLists();updateBpmDisplay();updateRangeLabels();generateOutput();renderPresetManager()}
init();
finishAppLoading();
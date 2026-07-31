(function(){
"use strict";
const $=id=>document.getElementById(id);
const norm=s=>String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[’']/g,"");
const uniq=a=>[...new Set((a||[]).filter(Boolean))];
const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
let variants=[],selected=0,lastDna=null;

const inspirations=[
 "Ein nordischer Krieger erzählt seinen ersten Raubzug als moderner Rap. Harte Verse, tiefer Männerchor, Tagelharpa und ein großer Hook.",
 "Ein emotionales Anime-Opening über zwei Freunde, die sich nach Jahren als Gegner wiedersehen. Weibliche Hauptstimme, Rockband, Streicher und riesiger letzter Refrain.",
 "Eine Cyberpunk-Stadt verliert für eine Nacht sämtliche Erinnerungen. Dunkler Synthwave, männliche Sprechstimme, kalte Verse und ein triumphaler EDM-Drop.",
 "Eine Fußballmannschaft wächst vom Außenseiter zum Champion. Stadionchor, treibender Rock, Gang Shouts und ein Refrain zum Mitsingen.",
 "Eine einsame Königin steht am Ende der Welt vor ihrer letzten Entscheidung. Piano, Orchester, tiefer Chor und langsamer Aufbau zu einem monumentalen Finale."
];

const GENRE_ALIASES=[
 {id:"rap",family:"Hip-Hop / Rap",sub:"Conscious Rap",label:"Hip-Hop / Rap",role:"primary",terms:["rap","rapper","rappen","hip hop","hip-hop","boom bap","sprechgesang"]},
 {id:"trap",family:"Hip-Hop / Rap",sub:"Trap",label:"Trap",role:"primary",terms:["trap","808","trap beat"]},
 {id:"drill",family:"Hip-Hop / Rap",sub:"Drill",label:"Drill",role:"primary",terms:["drill","uk drill"]},
 {id:"phonk",family:"Hip-Hop / Rap",sub:"Phonk Rap",label:"Phonk",role:"primary",terms:["phonk","drift phonk"]},
 {id:"viking",family:"Folk / Acoustic",sub:"Nordic Folk",label:"Viking / Nordic Folk",role:"theme",terms:["viking","wikinger","norse","nordic","nordisch","odin","valhalla","runen","ragnar"]},
 {id:"metalcore",family:"Metal",sub:"Metalcore",label:"Metalcore",role:"primary",terms:["metalcore"]},
 {id:"deathcore",family:"Metal",sub:"Deathcore",label:"Deathcore",role:"primary",terms:["deathcore"]},
 {id:"metal",family:"Metal",sub:"Heavy Metal",label:"Metal",role:"primary",terms:["metal","heavy metal","breakdown","growl"]},
 {id:"rock",family:"Rock",sub:"Alternative Rock",label:"Rock",role:"primary",terms:["rock","hard rock","rockband"]},
 {id:"electroSwing",family:"Swing / Vintage Jazz",sub:"Electro Swing",label:"Electro Swing",role:"primary",terms:["electro swing","electroswing","swing house"]},
 {id:"swing",family:"Swing / Vintage Jazz",sub:"Classic Swing",label:"Swing",role:"primary",terms:["swing","big band","charleston"]},
 {id:"jazz",family:"Jazz",sub:"Traditional Jazz",label:"Jazz",role:"primary",terms:["jazz","bebop","dixieland"]},
 {id:"anime",family:"Anime / Japanese",sub:"Anime Opening",label:"Anime / Japanese",role:"format",terms:["anime","opening","isekai","shonen","manga","j-rock","jrock"]},
 {id:"kpop",family:"Pop",sub:"K-Pop",label:"K-Pop",role:"primary",terms:["k-pop","kpop","idol pop"]},
 {id:"jpop",family:"Anime / Japanese",sub:"J-Pop",label:"J-Pop",role:"primary",terms:["j-pop","jpop"]},
 {id:"edm",family:"Electronic / EDM",sub:"EDM",label:"Electronic / EDM",role:"primary",terms:["edm","electronic","elektronisch","festival edm","dance music"]},
 {id:"hardstyle",family:"Electronic / EDM",sub:"Hardstyle",label:"Hardstyle",role:"primary",terms:["hardstyle","hard bass","rawstyle"]},
 {id:"techno",family:"Electronic / EDM",sub:"Techno",label:"Techno",role:"primary",terms:["techno","schranz"]},
 {id:"dnb",family:"Electronic / EDM",sub:"Drum & Bass",label:"Drum & Bass",role:"primary",terms:["drum and bass","drum & bass","dnb","jungle"]},
 {id:"dubstep",family:"Electronic / EDM",sub:"Dubstep",label:"Dubstep",role:"primary",terms:["dubstep","brostep","wobble bass"]},
 {id:"trance",family:"Electronic / EDM",sub:"Trance",label:"Trance",role:"primary",terms:["trance","psytrance","goa"]},
 {id:"synthwave",family:"Electronic / EDM",sub:"Synthwave",label:"Synthwave",role:"primary",terms:["synthwave","retrowave","outrun"]},
 {id:"cinematic",family:"Cinematic / Soundtrack",sub:"Epic Trailer",label:"Cinematic",role:"format",terms:["cinematic","cinematisch","orchestral","orchester","trailer","soundtrack","film score","game ost","episch"]},
 {id:"ballad",family:"Ballad / Emotional",sub:"Power Ballad",label:"Ballade",role:"primary",terms:["ballade","ballad","piano ballad"]},
 {id:"pop",family:"Pop",sub:"Dance Pop",label:"Pop",role:"primary",terms:["pop song","popmusik","radio pop"]},
 {id:"lofi",family:"Ambient / Chill",sub:"Lo-Fi",label:"Ambient / Lo-Fi",role:"primary",terms:["lo-fi","lofi","chillhop","chill beat"]},
 {id:"folk",family:"Folk / Acoustic",sub:"Contemporary Folk",label:"Folk",role:"primary",terms:["folk","folklore","acoustic folk"]},
 {id:"country",family:"Country / Americana",sub:"Modern Country",label:"Country",role:"primary",terms:["country","western"]},
 {id:"reggae",family:"Reggae / Caribbean",sub:"Roots Reggae",label:"Reggae / Caribbean",role:"primary",terms:["reggae","dub","dancehall","caribbean"]},
 {id:"orchestral",family:"Classical / Orchestral",sub:"Epic Orchestral",label:"Orchestral",role:"format",terms:["orchestral","symphonic","symphonie","orchester"]}
];

const MOOD_RULES={
 dark:["dunkel","duster","finster","dark","ominous","horror"],sad:["traurig","verlust","melanchol","sehnsucht","einsam","grief","broken"],hope:["hoffnung","hope","neuanfang","triumph","aufstehen"],aggressive:["aggressiv","wut","rache","kampf","krieg","battle","angry"],romantic:["liebe","romantik","romantic","heart"],playful:["lustig","humor","witzig","playful","funny"],heroic:["held","heroic","epic","sieg","victory","mutig"]
};
const VOICE_RULES={female:["weiblich","female","sangerin","frau"],male:["mannlich","male","sanger","mann"],duet:["duett","duet","zwei stimmen"],choir:["chor","choir","gang shout"],spoken:["erzahler","spoken","sprechstimme","narrator"],rap:["rap","rapper","rappen","sprechgesang"],growl:["growl","scream","death vocal"]};
const INSTRUMENT_TERMS=[["tagelharpa","Tagelharpa"],["nyckelharpa","Nyckelharpa"],["piano","Grand Piano"],["klavier","Grand Piano"],["gitar","Electric Guitar"],["streicher","Strings"],["violin","Violin Section"],["synth","Analog Synthesizer"],["taiko","Taiko Drums"],["horn","Viking War Horns"],["drum","Hybrid Electronic Drums"],["sax","Saxophone"],["trompete","Trumpet"],["brass","Brass Section"],["bass","Electric Bass Guitar"],["oud","Oud"],["shamisen","Shamisen"],["koto","Koto"]];

const PALETTES={
 rap:["Deep Sub Bass","Hybrid Electronic Drums","Atmospheric Synth Pad"],trap:["Deep Sub Bass","Hybrid Electronic Drums","Analog Synthesizer"],drill:["Deep Sub Bass","Hybrid Electronic Drums","Dark Synth Pad"],phonk:["Distorted Synth Bass","Hybrid Electronic Drums","Cowbell"],viking:["Tagelharpa","Nyckelharpa","Viking War Horns","Nordic Frame Drums"],metalcore:["Aggressive Rhythm Guitars","Distorted Electric Guitar","Double Bass Drums"],deathcore:["Aggressive Rhythm Guitars","Double Bass Drums","Deep Sub Bass"],metal:["Distorted Electric Guitar","Electric Bass Guitar","Double Bass Drums"],rock:["Electric Guitar","Electric Bass Guitar","Acoustic Drum Kit"],electroSwing:["Upright Bass","Piano","Trumpet","Clarinet","Saxophone"],swing:["Upright Bass","Piano","Brass Section","Clarinet"],jazz:["Upright Bass","Grand Piano","Saxophone","Brush Drum Kit"],anime:["Grand Piano","Violin Section","Aggressive Rhythm Guitars"],kpop:["Analog Synthesizer","Hybrid Electronic Drums","Deep Sub Bass"],jpop:["Electric Guitar","Grand Piano","Violin Section"],edm:["Analog Synthesizer","Deep Sub Bass","Hybrid Electronic Drums"],hardstyle:["Supersaw Synth","Distorted Kick","Deep Sub Bass"],techno:["Analog Synthesizer","Electronic Drum Machine","Deep Sub Bass"],dnb:["Reese Bass","Hybrid Electronic Drums","Atmospheric Synth Pad"],dubstep:["Distorted Synth Bass","Hybrid Electronic Drums","Supersaw Synth"],trance:["Supersaw Synth","Analog Synthesizer","Electronic Drum Machine"],synthwave:["Analog Synthesizer","FM Synthesizer","Distorted Synth Bass"],cinematic:["Full Cinematic Orchestra","Grand Piano","Timpani"],ballad:["Grand Piano","Violin Section","Cello Section"],pop:["Grand Piano","Electric Guitar","Hybrid Electronic Drums"],lofi:["Upright Piano","Atmospheric Synth Pad","Electric Bass Guitar"],folk:["Acoustic Guitar","Frame Drum","Violin"],country:["Acoustic Guitar","Banjo","Fiddle"],reggae:["Electric Guitar","Electric Bass Guitar","Drum Kit"],orchestral:["Full Cinematic Orchestra","Violin Section","French Horns"]
};

const BPM={rap:92,trap:142,drill:142,phonk:128,viking:112,metalcore:172,deathcore:178,metal:154,rock:132,electroSwing:126,swing:118,jazz:110,anime:156,kpop:124,jpop:148,edm:128,hardstyle:150,techno:135,dnb:174,dubstep:140,trance:138,synthwave:108,cinematic:104,ballad:76,pop:118,lofi:78,folk:104,country:104,reggae:88,orchestral:96};
const PRESET_KEY={anime:"anime",viking:"viking",metalcore:"metalcore",metal:"metalcore",edm:"edm",cinematic:"cinematic",ballad:"ballad",kpop:"kpop",lofi:"lofi",synthwave:"synthwave"};

const STRUCTURES={
 anime:["Intro","Verse 1","Pre-Chorus","Chorus","Instrumental Break","Verse 2","Bridge","Final Chorus","Outro"],animeEnding:["Soft Intro","Verse 1","Chorus","Verse 2","Bridge","Final Chorus","Gentle Outro"],song:["Intro","Verse 1","Pre-Chorus","Chorus","Verse 2","Chorus","Bridge","Final Chorus","Outro"],pop:["Hook Intro","Verse 1","Pre-Chorus","Chorus","Verse 2","Pre-Chorus","Chorus","Bridge","Final Chorus","Outro"],rock:["Intro","Verse 1","Pre-Chorus","Chorus","Verse 2","Guitar Break","Bridge","Final Chorus","Outro"],ballad:["Piano Intro","Verse 1","Chorus","Verse 2","Bridge","Emotional Final Chorus","Outro"],rap:["Intro","Rap Verse 1","Hook","Rap Verse 2","Hook","Bridge","Final Hook","Outro"],trap:["Intro","Verse 1","Pre-Hook","Hook","Verse 2","Beat Switch","Final Hook","Outro"],edm:["Intro","Verse","Build-Up","Drop","Breakdown","Second Build-Up","Second Drop","Outro"],electroSwing:["Vintage Intro","Verse 1","Pre-Chorus","Chorus","Brass Break","Verse 2","Swing Drop","Final Chorus","Outro"],dnb:["Atmospheric Intro","Verse","Build-Up","First Drop","Breakdown","Second Build-Up","Second Drop","Outro"],dubstep:["Dark Intro","Verse","Build-Up","Heavy Drop","Breakdown","Second Drop","Outro"],trance:["Ambient Intro","Progressive Build","Main Theme","Breakdown","Uplifting Build","Final Drop","Outro"],metal:["Intro","Verse 1","Pre-Chorus","Chorus","Verse 2","Breakdown","Guitar Solo","Final Chorus","Outro"],metalcore:["Intro","Verse 1","Pre-Chorus","Chorus","Verse 2","Heavy Breakdown","Bridge","Final Chorus","Final Breakdown","Outro"],deathcore:["Intro","Verse 1","Breakdown","Verse 2","Chorus","Slamming Breakdown","Guitar Solo","Final Breakdown","Outro"],viking:["Atmospheric Intro","Narrated Verse","War Chant","Verse 2","Instrumental March","Battle Chorus","Bridge","Final War Choir","Outro"],tavern:["Instrumental Intro","Verse 1","Singalong Chorus","Verse 2","Instrumental Dance","Final Singalong","Outro"],cinematic:["Ambient Intro","Theme A","Gradual Build","Crescendo","Climax","Emotional Release","Outro"],trailer:["Cold Open","Rising Pulse","First Impact","Tension Build","Massive Climax","Final Hit","End"],gameOst:["Main Theme Intro","Exploration Theme","Battle Build","Boss Phase","Victory Theme","Outro"],jrpg:["Orchestral Intro","Character Theme","Journey Verse","Battle Interlude","Emotional Bridge","Final Theme","Outro"],kpop:["Intro","Verse 1","Pre-Chorus","Chorus","Rap Break","Verse 2","Dance Break","Final Chorus","Outro"],jpop:["Intro","Verse 1","Pre-Chorus","Chorus","Instrumental Break","Verse 2","Bridge","Final Chorus","Outro"],extended:["Extended Intro","Verse","Build-Up","Drop","Long Breakdown","Second Build-Up","Second Drop","Extended Outro"],radioEdit:["Short Intro","Verse 1","Pre-Chorus","Chorus","Verse 2","Bridge","Final Chorus","Short Outro"],acoustic:["Acoustic Intro","Verse 1","Chorus","Verse 2","Acoustic Break","Final Chorus","Outro"],live:["Crowd Intro","Verse 1","Chorus","Audience Call and Response","Verse 2","Solo","Final Chorus","Crowd Outro"],short:["Hook Intro","Verse","Chorus","Final Hook"]
};

function phraseMatch(text,phrase){const p=norm(phrase);if(!p)return false;if(p.length<=3)return new RegExp(`(^|\\s)${p.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}(?=\\s|$)`).test(text);return text.includes(p)}
function libraryMatches(t){
 const hits=[];
 if(typeof GENRE_LIBRARY!=="object")return hits;
 for(const [family,subs] of Object.entries(GENRE_LIBRARY)){
  const fn=norm(family);
  if(fn.length>4&&t.includes(fn))hits.push({id:fn,family,sub:(subs||[])[0]||"None",label:family,role:"primary",score:62,reason:`Genre-Familie „${family}“ ausdrücklich genannt`});
  for(const sub of subs||[]){const sn=norm(sub);if(sn.length<4)continue;if(t.includes(sn))hits.push({id:sn,family,sub,label:sub,role:"primary",score:78,reason:`Subgenre „${sub}“ ausdrücklich genannt`});}
 }
 return hits;
}
function detectGenres(text){
 const t=norm(text),hits=[];
 for(const g of GENRE_ALIASES){
  const matched=g.terms.filter(x=>phraseMatch(t,x));
  if(matched.length){const longest=Math.max(...matched.map(x=>norm(x).split(/\s+/).length));hits.push({...g,score:(longest>1?94:82)+Math.min(4,(matched.length-1)*2),reason:`Erkannt durch: ${matched.join(", ")}`});}
 }
 hits.push(...libraryMatches(t));
 const merged=[];
 for(const h of hits.sort((a,b)=>b.score-a.score)){
  const old=merged.find(x=>x.family===h.family&&x.sub===h.sub);
  if(old){old.score=Math.max(old.score,h.score);old.reason=uniq([old.reason,h.reason]).join(" · ");continue}merged.push(h);
 }
 // Remove broad false-positive parents when a specific compound genre was recognized.
 if(merged.some(x=>x.id==="kpop"||x.id==="jpop")){
  for(let i=merged.length-1;i>=0;i--)if((merged[i].id==="pop"||merged[i].sub==="Pop")&&!/K-Pop|J-Pop/i.test(merged[i].label||""))merged.splice(i,1);
 }
 if(merged.some(x=>x.id==="electroSwing")){
  for(let i=merged.length-1;i>=0;i--)if(merged[i].id==="swing"||merged[i].sub==="Electro")merged.splice(i,1);
 }
 if(merged.some(x=>x.id==="viking")){
  for(let i=merged.length-1;i>=0;i--)if(merged[i].id==="folk"||merged[i].sub==="Contemporary Folk")merged.splice(i,1);
 }
 const primaryCandidates=merged.filter(x=>x.role==="primary");
 const thematic=merged.filter(x=>x.role==="theme"||x.role==="format");
 let primary=primaryCandidates[0]||merged[0]||GENRE_ALIASES.find(x=>x.id==="cinematic");
 let secondary=primaryCandidates.find(x=>x.id!==primary.id&&x.score>=82)||thematic.find(x=>x.id!==primary.id)||primaryCandidates.find(x=>x.id!==primary.id)||merged.find(x=>x.id!==primary.id);
 // Cultural/thematic descriptors enrich rather than replace explicit performance genres: Wikinger Rap => Rap + Viking.
 if(primary&&primary.role!=="primary"&&primaryCandidates.length)primary=primaryCandidates[0];
 if(!secondary)secondary=GENRE_ALIASES.find(x=>x.id===(primary.id==="cinematic"?"edm":"cinematic"));
 return{all:merged,primary,secondary};
}
function detectMap(text,rules,labels){const t=norm(text),out=[];for(const [id,terms] of Object.entries(rules)){const m=terms.filter(x=>phraseMatch(t,x));if(m.length)out.push(labels[id]||id)}return uniq(out)}
function dna(text){
 const t=norm(text),genre=detectGenres(text);
 const moods=detectMap(text,MOOD_RULES,{dark:"Dunkel",sad:"Melancholisch",hope:"Hoffnungsvoll",aggressive:"Aggressiv",romantic:"Romantisch",playful:"Verspielt",heroic:"Heroisch"});
 const voiceIds=[];for(const [id,terms] of Object.entries(VOICE_RULES))if(terms.some(x=>phraseMatch(t,x)))voiceIds.push(id);
 const voices=uniq(voiceIds.map(x=>({female:"Female Lead",male:"Male Lead",duet:"Duett",choir:"Choir",spoken:"Spoken Voice",rap:"Rap Vocal",growl:"Growl / Scream"})[x]));
 const instruments=[];INSTRUMENT_TERMS.forEach(([k,v])=>t.includes(k)&&instruments.push(v));
 const energy=/(finale|letzter refrain|riesig|monumental|explosiv)/.test(t)?"Ruhiger Aufbau → riesiges Finale":/(schnell|fast|treibend|driving)/.test(t)?"Treibend & hochenergetisch":/(ruhiger anfang|langsam|slow|sanft)/.test(t)?"Langsam & kontrolliert":"Dynamischer Aufbau";
 const explicitGenreCount=genre.all.length;
 const genreConfidence=clamp(52+explicitGenreCount*10+(genre.primary?.score||0)*.2,55,99);
 const detailConfidence=clamp(48+moods.length*8+voices.length*7+Math.min(instruments.length,5)*4,48,98);
 const overall=Math.round((genreConfidence*0.62+detailConfidence*0.38));
 return{genre,moods:moods.length?moods:["Emotional"],voices:voices.length?voices:[genre.primary?.id==="rap"?"Rap Vocal":"Female Lead"],energy,instruments,confidence:overall,genreConfidence:Math.round(genreConfidence),detailConfidence:Math.round(detailConfidence)};
}
function genreLabel(g){return g?.label||g?.sub||g?.family||"Unbekannt"}
function sliderBlend(){const a=+$('composerBlend').value;return[a,100-a]}
function updateBlendUi(d=lastDna){const [a,b]=sliderBlend();$('composerBlendValue').textContent=`${a} / ${b}`;$('composerPrimaryLabel').textContent=d?`${a}% ${genreLabel(d.genre.primary)}`:"Primärgenre";$('composerSecondaryLabel').textContent=d?`${b}% ${genreLabel(d.genre.secondary)}`:"Sekundärgenre";const preview=$('composerBlendPromptPreview');if(preview)preview.textContent=d?(window.NSWGenreBlend?.describe(genreLabel(d.genre.primary),genreLabel(d.genre.secondary),[a,b])||`${genreLabel(d.genre.primary)} with ${genreLabel(d.genre.secondary)} influences`):"Primärgenre mit Sekundärgenre-Einflüssen"}
function autoStructure(primary,secondary){const ids=[primary?.id,secondary?.id];if(ids.includes("rap"))return STRUCTURES.rap;if(ids.includes("trap")||ids.includes("drill"))return STRUCTURES.trap;if(ids.includes("electroSwing"))return STRUCTURES.electroSwing;if(ids.includes("anime"))return STRUCTURES.anime;if(ids.includes("metalcore"))return STRUCTURES.metalcore;if(ids.includes("deathcore"))return STRUCTURES.deathcore;if(ids.includes("metal"))return STRUCTURES.metal;if(ids.includes("viking"))return STRUCTURES.viking;if(ids.includes("dnb"))return STRUCTURES.dnb;if(ids.includes("dubstep"))return STRUCTURES.dubstep;if(ids.includes("trance"))return STRUCTURES.trance;if(ids.includes("edm")||ids.includes("hardstyle")||ids.includes("techno"))return STRUCTURES.edm;if(ids.includes("kpop"))return STRUCTURES.kpop;if(ids.includes("jpop"))return STRUCTURES.jpop;if(ids.includes("ballad"))return STRUCTURES.ballad;if(ids.includes("rock"))return STRUCTURES.rock;if(ids.includes("cinematic")||ids.includes("orchestral"))return STRUCTURES.cinematic;return STRUCTURES.song}
function chooseStructure(d,primary,secondary){const forced=$('composerStructure')?.value;if(forced&&forced!=="auto")return STRUCTURES[forced]||STRUCTURES.song;return autoStructure(primary,secondary)}
function creativityAdjust(mode,i){return({faithful:[0,-2,-4],safe:[0,0,2],balanced:[0,3,5],creative:[2,6,10],bold:[4,9,15],extreme:[7,14,22],radio:[0,0,0],festival:[3,7,10],cinematic:[-2,0,3],anime:[5,8,12],game:[0,4,8],surprise:[-5,10,18]}[mode]||[0,3,5])[i]||0}
function directionTitle(mode,i){const base=["Ausgewogene Hauptvariante","Alternative Schwerpunktsetzung","Mutige Genre-Fusion"];if(mode==="faithful")return["Sehr nah an deiner Idee","Sanfte Variation","Behutsame Alternative"][i];if(mode==="radio")return["Klar & radio-tauglich","Hook-fokussiert","Moderner Radio-Mix"][i];if(mode==="festival")return["Festival-Hauptvariante","Größerer Build & Drop","Maximale Live-Energie"][i];if(mode==="cinematic")return["Cinematic Hauptvariante","Emotionaler Score-Mix","Monumentale Hybrid-Version"][i];if(mode==="anime")return["Anime-Hauptvariante","J-Rock-orientiert","Großes Shonen-Finale"][i];if(mode==="game")return["AAA Game Hauptthema","Boss-Fight-Variante","Cinematic Endgame-Version"][i];return base[i]}
function makeVariants(d){
 const mode=$('composerCreativity').value,focus=$('composerFocus').value,[baseA,baseB]=sliderBlend();
 const candidates=uniq([d.genre.primary?.id,d.genre.secondary?.id,...d.genre.all.map(x=>x.id),"cinematic","edm","metal"]).map(id=>GENRE_ALIASES.find(x=>x.id===id)||d.genre.all.find(x=>x.id===id)).filter(Boolean);
 return [0,1,2].map(i=>{
  let primary=i===0?d.genre.primary:(i===1?(candidates[1]||d.genre.primary):(candidates[2]||d.genre.secondary||d.genre.primary));
  let secondary=(primary.id===d.genre.primary.id?d.genre.secondary:d.genre.primary)||GENRE_ALIASES.find(x=>x.id==="cinematic");
  // Preserve the explicit fusion in every proposal; only change emphasis.
  if(i===1){primary=d.genre.primary;secondary=d.genre.secondary;}
  if(i===2&&d.genre.secondary){primary=d.genre.secondary;secondary=d.genre.primary;}
  let blendA=clamp(baseA+(i===1?-10:i===2?-20:0),50,90),blendB=100-blendA;
  if(i===2&&blendA<blendB){const tmp=blendA;blendA=blendB;blendB=tmp;}
  let bpm=Math.round(((BPM[primary.id]||120)*blendA+(BPM[secondary.id]||120)*blendB)/100)+creativityAdjust(mode,i);
  if(mode==="radio")bpm=clamp(bpm,82,132);if(mode==="festival")bpm=Math.max(126,bpm);if(mode==="anime")bpm=Math.max(145,bpm);
  const voice=focus==="vocals"&&d.voices.length>1?d.voices[Math.min(i,d.voices.length-1)]:d.voices[0];
  const instruments=uniq([...(d.instruments||[]),...(PALETTES[primary.id]||[]),...(PALETTES[secondary.id]||[])]).slice(0,focus==="instruments"?8:6);
  const score=clamp(Math.round(94-i*3+(d.genre.all.length>1?2:0)-(mode==="extreme"?i*3:0)),70,99);
  return{id:i,title:`Variante ${String.fromCharCode(65+i)} · ${genreLabel(primary)} × ${genreLabel(secondary)}`,subtitle:directionTitle(mode,i),primary,secondary,blendA,blendB,bpm,voice,mood:d.moods[Math.min(i,d.moods.length-1)]||d.moods[0],energy:d.energy,instruments,structure:chooseStructure(d,primary,secondary),score,focus};
 });
}
function renderDna(d){
 const genreBadges=d.genre.all.length?d.genre.all.slice(0,8).map(x=>`<span class="composer-genre-badge">${genreLabel(x)}</span>`).join(""):"Keine eindeutigen Genres";
 $('composerDna').innerHTML=[
  ["Primärgenre",genreLabel(d.genre.primary)],["Sekundärgenre",genreLabel(d.genre.secondary)],["Weitere Treffer",genreBadges],["Emotion",d.moods.join(" · ")],["Vocals",d.voices.join(" · ")],["Dynamik",d.energy],["Instrument-Hinweise",d.instruments.join(" · ")||"Keine explizit genannt"]
 ].map(([a,b])=>`<div class="composer-dna-row"><b>${a}</b><span>${b}</span></div>`).join("");
 $('composerConfidence').textContent=d.confidence+"%";$('composerConfidenceBar').style.width=d.confidence+"%";
 $('composerDna').insertAdjacentHTML('beforeend',`<div class="composer-confidence-grid"><span><b>${d.genreConfidence}%</b>Genre-Erkennung</span><span><b>${d.detailConfidence}%</b>Detail-Erkennung</span><span><b>${d.confidence}%</b>Gesamt</span></div>`);
 updateBlendUi(d);
 const reasons=d.genre.all.slice(0,6).map(x=>`<div class="composer-explain-row"><b>${genreLabel(x)}</b><span>${x.reason}</span></div>`).join("");
 const bpm=Math.round(((BPM[d.genre.primary?.id]||120)*sliderBlend()[0]+(BPM[d.genre.secondary?.id]||120)*sliderBlend()[1])/100);
 $('composerExplanation').innerHTML=`<h3>Warum diese Auswahl?</h3>${reasons}<div class="composer-explain-row"><b>Fusion</b><span>${sliderBlend()[0]}% ${genreLabel(d.genre.primary)} + ${sliderBlend()[1]}% ${genreLabel(d.genre.secondary)}</span></div><div class="composer-explain-row"><b>BPM</b><span>${bpm} BPM aus den typischen Bereichen beider Genres abgeleitet.</span></div>`;
}
function renderVariants(){
 $('composerVariants').innerHTML=variants.map((v,i)=>`<button class="composer-variant ${i===selected?'selected':''}" data-variant="${i}"><div class="composer-variant-head"><span>${v.title}</span><strong>${v.score}% Match</strong></div><h3>${v.subtitle}</h3><div class="composer-variant-grid"><span><b>Genre-Fusion</b>${v.blendA}% ${genreLabel(v.primary)} · ${v.blendB}% ${genreLabel(v.secondary)}</span><span><b>BPM</b>${v.bpm}</span><span><b>Vocals</b>${v.voice}</span><span><b>Emotion</b>${v.mood}</span></div><p><b>Instrumente:</b> ${v.instruments.join(", ")}</p><small>${v.structure.map(x=>`[${x}]`).join(" → ")}</small></button>`).join("");
 document.querySelectorAll('[data-variant]').forEach(b=>b.onclick=()=>{selected=+b.dataset.variant;renderVariants()});
}
function analyze(){
 const idea=$('composerIdea').value.trim();if(idea.length<12){$('composerStatus').textContent="Bitte beschreibe deine Idee etwas genauer (mindestens 12 Zeichen).";return}
 const d=dna(idea);lastDna=d;renderDna(d);variants=makeVariants(d);selected=0;renderVariants();$('composerResults').classList.remove('hidden');$('composerStatus').textContent=`Analyse abgeschlossen: ${d.genre.all.length} Genre-Treffer, ${d.moods.length} emotionale Merkmale und ${d.voices.length} Vocal-Hinweise erkannt.`;
}
function findSelect(id,terms){const el=$(id);if(!el)return false;const list=(terms||[]).filter(Boolean);const o=[...el.options].find(o=>list.some(t=>norm(o.textContent+" "+o.value).includes(norm(t))));if(o){el.value=o.value;el.dispatchEvent(new Event('change',{bubbles:true}));return true}return false}
function setGenre(v){
 if(!$('genreFamily'))return;
 const family=v.primary?.family,sub=v.primary?.sub,second=v.secondary?.family;
 if(family&&[...$('genreFamily').options].some(o=>o.value===family)){$('genreFamily').value=family;$('genreFamily').dispatchEvent(new Event('change',{bubbles:true}));if(typeof refreshSubgenres==='function')refreshSubgenres();if(sub)findSelect('subgenre',[sub]);}
 if(second)findSelect('secondGenre',[second]);
 if($('blend')){const val=`${v.blendA}/${v.blendB}`;const opt=[...$('blend').options].find(o=>o.value===val||o.textContent===val);$('blend').value=opt?opt.value:(v.blendA>=85?'90/10':v.blendA>=75?'80/20':v.blendA>=65?'70/30':v.blendA>=55?'60/40':'50/50');}
}
function apply(){
 const v=variants[selected];if(!v)return;
 if(typeof quickPreset==='function'&&PRESET_KEY[v.primary.id])quickPreset(PRESET_KEY[v.primary.id]);
 setGenre(v);
 $('bpm').value=v.bpm;$('bpm').dispatchEvent(new Event('input',{bubbles:true}));
 if(v.voice.includes('Female')){document.querySelector('input[name="vocalMode"][value="vocals"]')?.click();findSelect('leadVoice',["female lead","female"])}else if(v.voice.includes('Male')){document.querySelector('input[name="vocalMode"][value="vocals"]')?.click();findSelect('leadVoice',["male lead","male"])}else if(v.voice.includes('Rap')){document.querySelector('input[name="vocalMode"][value="vocals"]')?.click();findSelect('leadVoice',["rap","male lead"])}
 findSelect('emotion',[v.mood]);
 if(typeof INSTRUMENT_DB!=="undefined"&&typeof appState!=="undefined"){const avail=INSTRUMENT_DB.map(x=>x.name);appState.instruments=v.instruments.map(n=>avail.find(a=>norm(a).includes(norm(n))||norm(n).includes(norm(a)))).filter(Boolean).slice(0,8)}
 if($('composerApplyStructure').checked&&typeof appState!=="undefined"){appState.metaStructure=v.structure.slice();appState.structureInitialized=true}
 if(typeof applyProductionKnowledge==='function')applyProductionKnowledge();if(typeof applyTheoryKnowledge==='function')applyTheoryKnowledge();if(typeof renderDynamicLists==='function')renderDynamicLists();if(typeof generateOutput==='function')generateOutput();
 if($('composerOpenBuilder').checked){document.querySelectorAll('.nav').forEach(x=>x.classList.toggle('active',x.dataset.view==='styleView'));document.querySelectorAll('.view').forEach(x=>x.classList.remove('active'));$('styleView')?.classList.add('active')}
 if(typeof showToast==='function')showToast(`${v.title} übernommen`);
}
function clearComposer(){$('composerIdea').value="";variants=[];lastDna=null;$('composerResults').classList.add('hidden');$('composerDna').innerHTML="<small>Noch keine Analyse durchgeführt.</small>";$('composerConfidence').textContent="--%";$('composerConfidenceBar').style.width="0";$('composerStatus').textContent="Bereit für deine Songidee.";$('composerExplanation').innerHTML="<h3>Warum diese Auswahl?</h3><small>Nach der Analyse werden hier erkannte Begriffe, Genre-Fusion und BPM-Entscheidungen erklärt.</small>";updateBlendUi(null)}
function init(){
 if(!$('composerAnalyze'))return;
 $('composerAnalyze').onclick=analyze;$('composerInspire').onclick=()=>{$('composerIdea').value=inspirations[Math.floor(Math.random()*inspirations.length)];analyze()};$('composerClear').onclick=clearComposer;$('composerApply').onclick=apply;
 $('composerBlend').addEventListener('input',()=>{updateBlendUi(lastDna);if(lastDna){renderDna(lastDna);variants=makeVariants(lastDna);renderVariants()}});
 ['composerCreativity','composerFocus','composerStructure'].forEach(id=>$(id)?.addEventListener('change',()=>{if(lastDna){variants=makeVariants(lastDna);selected=0;renderVariants()}}));
 updateBlendUi(null);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

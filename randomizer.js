function selectedRandomSections(){return [...document.querySelectorAll("#randomOptions input:checked")].map(x=>x.value)}

const RANDOM_PROFILES=[
 {match:/metal|rock/i,genre:["Metal","Rock"],songs:["Metal Anthem","Rock Anthem","Battle Theme","Anime Opening"],bpm:[135,190],instruments:["Aggressive Rhythm Guitars","Electric Bass Guitar","Hybrid Electronic Drums","Timpani","Deep Sub Bass"],production:["Studio Quality Production","Cinematic Production"],energy:["Full Throttle","Heavy Breakdown","Epic Crescendo"],voices:["Male Lead Voice","Female Lead Voice"]},
 {match:/electronic|edm|house|techno|hardstyle|synth/i,genre:["Electronic","EDM"],songs:["Festival Anthem","Club Mix","Hardstyle Anthem","Dancefloor Anthem"],bpm:[120,160],instruments:["Analog Synthesizer","Supersaw Synth","Deep Sub Bass","Hybrid Electronic Drums","Festival Hardstyle Kick"],production:["Festival Production","Futuristic Production"],energy:["Festival Energy","Massive Drop","Dancefloor Drive"],voices:["Female Lead Voice","Male Lead Voice"]},
 {match:/folk|viking|world/i,genre:["Folk","World"],songs:["Story Song","Viking Anthem","War Chant","Ritual Song"],bpm:[85,145],instruments:["Tagelharpa","Nyckelharpa","Jouhikko","Nordic Frame Drums","Viking War Horns"],production:["Raw Organic Production","Cinematic Production"],energy:["Viking Charge","Gradual Build","Epic Crescendo"],voices:["Male Lead Voice","Female Lead Voice"]},
 {match:/cinematic|orchestral|soundtrack|classical/i,genre:["Cinematic","Classical"],songs:["Film Score Cue","Cinematic Opening","Cinematic Finale","Trailer","Final Boss Theme"],bpm:[65,150],instruments:["Full Cinematic Orchestra","Violin Section","Cello Section","French Horns","Timpani"],production:["AAA Game Soundtrack Production","Trailer Music Production","Cinematic Production"],energy:["Cinematic Sweep","Monumental","Emotional Climax"],voices:["Female Lead Voice","Male Lead Voice"]},
 {match:/pop|anime|k-pop|idol/i,genre:["Pop","Anime"],songs:["Anime Opening","Anime Ending","Idol Pop Single","K-Pop Comeback","Radio Hit"],bpm:[105,165],instruments:["Grand Piano","Electric Guitar","Analog Synthesizer","Hybrid Electronic Drums","Deep Sub Bass"],production:["Modern Anime Production","Studio Quality Production"],energy:["Opening Energy","Hero Theme","Festival Energy"],voices:["Female Lead Voice","Male Lead Voice"]}
];
function existingNames(names){return names.filter(n=>INSTRUMENT_DB.some(x=>x.name===n))}
function randomProfile(){
 const current=[genreFamily?.value,subgenre?.value,secondGenre?.value,songType?.value].filter(Boolean).join(" ");
 return RANDOM_PROFILES.find(p=>p.match.test(current))||pick(RANDOM_PROFILES);
}
function setGenreFromProfile(profile){
 const available=Object.keys(GENRE_LIBRARY);
 const target=profile.genre.find(g=>available.some(a=>a.toLowerCase().includes(g.toLowerCase())));
 genreFamily.value=target?available.find(a=>a.toLowerCase().includes(target.toLowerCase())):pick(available);
 refreshSubgenres();subgenre.value=pick(GENRE_LIBRARY[genreFamily.value]);
 secondGenre.value=Math.random()<.55?"None":pick(["None",...available.filter(x=>x!==genreFamily.value)]);
}
function runSmartRandom(){
 const selected=selectedRandomSections();
 const mode=document.querySelector('input[name="randomMode"]:checked')?.value||document.getElementById("randomModeMirror")?.value||"intelligent";
 const level=document.getElementById("experimentLevel")?.value||"creative";
 const compatible=mode==="intelligent";
 const balanced=mode==="balanced";
 const experimental=mode==="experimental";
 const profile=(compatible||balanced)?randomProfile():null;
 const chaos={mild:.25,creative:.5,wild:.78,chaos:1}[level]||.5;
 if(selected.includes("genre")){if(profile&&!(experimental&&Math.random()<chaos)){setGenreFromProfile(profile);if(balanced&&Math.random()<.35)secondGenre.value=pick(Object.keys(GENRE_LIBRARY).filter(x=>x!==genreFamily.value));}else{genreFamily.value=pick(Object.keys(GENRE_LIBRARY));refreshSubgenres();subgenre.value=pick(GENRE_LIBRARY[genreFamily.value]);secondGenre.value=pick(Object.keys(GENRE_LIBRARY).filter(x=>x!==genreFamily.value));}}
 if(selected.includes("bpm")){const wildBpm=document.getElementById("wildBpm")?.checked;const range=(experimental&&(wildBpm||Math.random()<chaos))?[40,240]:(profile?.bpm||[70,180]);bpm.value=Math.floor(range[0]+Math.random()*(range[1]-range[0]+1))}
 if(selected.includes("song")){songType.value=profile?pick(profile.songs.filter(x=>SONG_TYPES.includes(x))):pick(SONG_TYPES.slice(1));if(currentVocalMode()!=="instrumental")language.value=pick(LANGUAGES.slice(1))}
 if(selected.includes("vocals")){
   const allowInstrumental=document.getElementById("allowInstrumentalRandom")?.checked;
   const useInstrumental=allowInstrumental&&Math.random()<(compatible?.18:.25);
   if(useInstrumental)setVocalMode("instrumental");
   else{
     setVocalMode("vocals");
     const cats=Object.keys(LEAD_VOICE_LIBRARY).filter(x=>x!=="None");leadVoiceCategory.value=pick(cats);refreshLeadVoices();leadVoice.value=pick([...leadVoice.options].map(o=>o.value).filter(x=>x!=="None"));
     appState.voiceCharacters=shuffleArray(Object.values(VOICE_CHARACTER_LIBRARY).flat()).slice(0,compatible?2:4);
     choir.value=Math.random()<(compatible?.25:.45)?pick(CHOIRS.slice(1)):"None";
     secondVoice.value=Math.random()<(compatible?.22:.4)?pick(SECOND_VOICES.slice(1)):"None";
     voiceSeparation.value=secondVoice.value==="None"?"Single lead only":"Clear voice separation";
   }
 }
 if(selected.includes("instruments")){const rare=document.getElementById("rareInstruments")?.checked;let pool=INSTRUMENT_DB;if(experimental&&rare)pool=[...INSTRUMENT_DB.filter(x=>x.rarity!=="common"),...INSTRUMENT_DB.filter(x=>x.rarity==="rare")];if(profile&&!experimental){const base=existingNames(profile.instruments);const extras=balanced?shuffleArray(pool).slice(0,2).map(x=>x.name):[];appState.instruments=unique([...shuffleArray(base).slice(0,5),...extras]).slice(0,6)}else appState.instruments=shuffleArray(pool).slice(0,experimental&&level==="chaos"?8:6).map(x=>x.name);}
 if(selected.includes("world"))world.value=pick(WORLDS);
 if(selected.includes("emotion"))emotion.value=pick(EMOTIONS);
 if(selected.includes("story")){narrative.value=pick(NARRATIVES);scene.value=pick(SCENES);atmosphere.value=pick(ATMOSPHERES)}
 if(selected.includes("energy")){energyCategory.value=pick(Object.keys(ENERGY_LIBRARY));const pool=profile?.energy.filter(x=>Object.values(ENERGY_LIBRARY).flat().includes(x))||ENERGY_LIBRARY[energyCategory.value];appState.energyStyles=shuffleArray(pool.length?pool:ENERGY_LIBRARY[energyCategory.value]).slice(0,2);energyLevel.value=Math.floor((compatible?45:15)+Math.random()*(compatible?46:86));dynamicLevel.value=Math.floor(30+Math.random()*71)}
 if(selected.includes("production")){production.value=profile?pick(profile.production.filter(x=>PRODUCTIONS.includes(x))):pick(PRODUCTIONS.slice(1));mix.value=pick(MIXES.slice(1));dynamics.value=pick(DYNAMICS.slice(1));appState.productionExtras=shuffleArray(PRODUCTION_EXTRAS).slice(0,compatible?1:2)}
 if(selected.includes("exclude"))appState.excludes=shuffleArray(EXCLUDES).slice(0,4);
 renderDynamicLists();updateBpmDisplay();updateRangeLabels();generateOutput();showToast(experimental?`Experimentell (${level}) generiert`:balanced?"Ausgewogene Kombination generiert":"Intelligente Kombination generiert")
}

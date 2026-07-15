function selectedRandomSections(){return [...document.querySelectorAll("#randomOptions input:checked")].map(x=>x.value)}
function runSmartRandom(){
 const selected=selectedRandomSections();
 if(selected.includes("genre")){genreFamily.value=pick(Object.keys(GENRE_LIBRARY));refreshSubgenres();subgenre.value=pick(GENRE_LIBRARY[genreFamily.value]);secondGenre.value=pick(["None",...Object.keys(GENRE_LIBRARY)])}
 if(selected.includes("bpm"))bpm.value=Math.floor(70+Math.random()*111);
 if(selected.includes("song")){songType.value=pick(SONG_TYPES.slice(1));language.value=pick(LANGUAGES.slice(1))}
 if(selected.includes("vocals")){leadVoiceCategory.value=pick(Object.keys(LEAD_VOICE_LIBRARY));refreshLeadVoices();leadVoice.value=pick(LEAD_VOICE_LIBRARY[leadVoiceCategory.value]);appState.voiceCharacters=shuffleArray(Object.values(VOICE_CHARACTER_LIBRARY).flat()).slice(0,4);choir.value=pick(CHOIRS);secondVoice.value=pick(SECOND_VOICES);voiceSeparation.value=secondVoice.value==="None"?"Single lead only":"Clear voice separation"}
 if(selected.includes("instruments"))appState.instruments=shuffleArray(INSTRUMENT_DB).slice(0,6).map(x=>x.name);
 if(selected.includes("world"))world.value=pick(WORLDS);
 if(selected.includes("emotion"))emotion.value=pick(EMOTIONS);
 if(selected.includes("story")){narrative.value=pick(NARRATIVES);scene.value=pick(SCENES);atmosphere.value=pick(ATMOSPHERES)}
 if(selected.includes("energy")){energyCategory.value=pick(Object.keys(ENERGY_LIBRARY));appState.energyStyles=shuffleArray(ENERGY_LIBRARY[energyCategory.value]).slice(0,2);energyLevel.value=Math.floor(15+Math.random()*86);dynamicLevel.value=Math.floor(15+Math.random()*86)}
 if(selected.includes("production")){production.value=pick(PRODUCTIONS);mix.value=pick(MIXES);dynamics.value=pick(DYNAMICS);appState.productionExtras=shuffleArray(PRODUCTION_EXTRAS).slice(0,2)}
 if(selected.includes("exclude"))appState.excludes=shuffleArray(EXCLUDES).slice(0,4);
 renderDynamicLists();updateBpmDisplay();updateRangeLabels();generateOutput();showToast("Smart Random ausgeführt")
}
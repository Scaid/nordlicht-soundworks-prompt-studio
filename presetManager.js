function currentPresetSnapshot(name){
 return{id:Date.now(),name,style:document.getElementById("styleOutput").value,exclude:document.getElementById("excludeOutput").value,data:collectFormState(),favorite:false}
}
function saveCurrentPreset(){
 const name=prompt("Name des Presets:","Mein Style");
 if(name===null)return;
 const clean=name.trim();
 if(!clean){showToast("Name fehlt");return}
 appState.presets.unshift(currentPresetSnapshot(clean));
 appState.activePresetTab="presets";
 renderPresetManager();persist();showToast("Preset gespeichert")
}
function presetArray(type){return type==="favorites"?appState.favorites:type==="history"?appState.history:appState.presets}
function renderPresetManager(){
 document.querySelectorAll(".tabs button").forEach(b=>b.classList.toggle("active",b.dataset.tab===appState.activePresetTab));
 const source=presetArray(appState.activePresetTab);
 const q=(document.getElementById("presetSearch").value||"").toLowerCase();
 const rows=source.map((item,index)=>({item,index})).filter(x=>!q||(x.item.name+" "+x.item.style).toLowerCase().includes(q));
 document.getElementById("presetManager").innerHTML=rows.length?rows.map(({item,index})=>`
  <article class="preset-card">
   <div class="preset-title"><b>${escapeHTML(item.name)}</b><span>${item.favorite?"★":""}</span></div>
   <p>${escapeHTML(item.style.slice(0,180))}${item.style.length>180?"…":""}</p>
   <div class="preset-actions">
    <button onclick="loadPresetItem('${appState.activePresetTab}',${index})">Laden</button>
    <button onclick="renamePresetItem('${appState.activePresetTab}',${index})">Umbenennen</button>
    <button onclick="duplicatePresetItem('${appState.activePresetTab}',${index})">Duplizieren</button>
    <button onclick="togglePresetFavorite('${appState.activePresetTab}',${index})">Favorit</button>
    <button class="danger" onclick="deletePresetItem('${appState.activePresetTab}',${index})">Löschen</button>
   </div>
  </article>`).join(""):`<p>Keine Presets gefunden.</p>`
}
function loadPresetItem(type,index){const item=presetArray(type)[index];if(item){applyFormState(item.data);showToast("Preset geladen")}}
function renamePresetItem(type,index){const item=presetArray(type)[index];if(!item)return;const n=prompt("Neuer Name:",item.name);if(n?.trim()){item.name=n.trim();renderPresetManager();persist()}}
function duplicatePresetItem(type,index){const arr=presetArray(type),item=arr[index];if(!item)return;const copy=JSON.parse(JSON.stringify(item));copy.id=Date.now();copy.name+=" Kopie";arr.splice(index+1,0,copy);renderPresetManager();persist();showToast("Dupliziert")}
function togglePresetFavorite(type,index){const item=presetArray(type)[index];if(!item)return;item.favorite=!item.favorite;if(item.favorite&&!appState.favorites.some(x=>x.id===item.id))appState.favorites.unshift(item);if(!item.favorite)appState.favorites=appState.favorites.filter(x=>x.id!==item.id);renderPresetManager();persist()}
function deletePresetItem(type,index){const arr=presetArray(type),item=arr[index];if(!item)return;if(confirm(`Preset „${item.name}“ wirklich löschen?`)){arr.splice(index,1);appState.favorites=appState.favorites.filter(x=>x.id!==item.id);renderPresetManager();persist();showToast("Preset gelöscht")}}
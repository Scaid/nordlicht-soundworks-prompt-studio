
(function(){
'use strict';
const $=id=>document.getElementById(id), DATA=window.NSW_LYRICS_METATAGS||{categories:{},metadata:{},categoryOrder:[],total:0};
const FAV='nsw-metatag-encyclopedia-favorites', USER='nsw-metatag-encyclopedia-userdata';
const favorites=new Set(JSON.parse(localStorage.getItem(FAV)||'[]'));let userData=JSON.parse(localStorage.getItem(USER)||'{}'),selected=null,compare=[];
const categoryLabels={Sections:'Song Structure',Vocals:'Vocals',Choir:'Choir',Style:'Style & Emotion',Dynamics:'Dynamics',Music:'Music & Arrangement',Instrumental:'Instrumental & Solos',Production:'Production & Mix',Adlibs:'Ad-libs & Calls',Transitions:'Transitions',RhythmTempo:'Rhythm & Tempo',HarmonyMelody:'Harmony & Melody',SoundFX:'Sound Effects'};
const GENRES={
 Sections:['Pop','Rock','Metal','EDM','Anime','Cinematic','Hip-Hop'],
 Vocals:['Pop','Rock','Metal','Anime','R&B','Cinematic'],
 Choir:['Cinematic','Metal','Viking','Gospel','Anime'],
 Style:['All genres'],
 Dynamics:['Rock','Metal','EDM','Cinematic','Anime'],
 Music:['All genres'],
 Instrumental:['Rock','Metal','Jazz','Cinematic','Folk'],
 Production:['Electronic','Pop','Rock','Metal','Cinematic'],
 Adlibs:['Hip-Hop','Pop','R&B','EDM'],
 Transitions:['EDM','Pop','Rock','Metal','Cinematic'],
 RhythmTempo:['EDM','Hip-Hop','Jazz','Rock','Metal'],
 HarmonyMelody:['Pop','Jazz','Classical','Cinematic','Anime'],
 SoundFX:['Cinematic','Experimental','Ambient']
};
const CONFLICTS={
 '[Instrumental Only]':['[Female Vocal]','[Male Vocal]','[Choir]','[Ad-libs]'],
 '[Mono Mix]':['[Wide Stereo Mix]'],
 '[Dry Mix]':['[Heavy Reverb]','[Hall Reverb]'],
 '[Major Key]':['[Minor Key]'],
 '[Slow Tempo]':['[Very Fast Tempo]','[Presto]'],
 '[Fade Out]':['[Hard Cut]','[Sudden Stop]'],
 '[Whispered Vocal]':['[Belting Vocal]'],
 '[Sparse Arrangement]':['[Wall of Sound]','[Dense Arrangement]'],
 '[No Drums]':['[Heavy Drums]','[Punchy Drums]'],
 '[No Bass]':['[Deep Sub Bass]','[Heavy Low End]']
};
const ALT_GROUPS=[
 ['[Chorus]','[Refrain]','[Hook]'],['[Build]','[Build-Up]','[Gradual Build]'],['[Outro]','[End]','[Coda]'],
 ['[Whispered Vocal]','[Soft Spoken Vocal]','[Intimate Vocal]'],['[Powerful Vocal]','[Belting Vocal]','[Soaring Vocal]'],
 ['[Wide Stereo Mix]','[Dynamic Mix]','[Cinematic Production]'],['[Fade Out]','[Fade into Outro]'],['[Drop]','[Final Drop]','[Second Drop]']
];
const POSITIONS={Sections:'section',Vocals:'inside',Choir:'inside',Style:'inside',Dynamics:'inside',Music:'inside',Instrumental:'inside',Production:'before',Adlibs:'inside',Transitions:'transition',RhythmTempo:'before',HarmonyMelody:'before',SoundFX:'inside'};
const USES={Sections:'structure',Vocals:'vocal',Choir:'vocal',Style:'arrangement',Dynamics:'dynamics',Music:'arrangement',Instrumental:'arrangement',Production:'production',Adlibs:'vocal',Transitions:'dynamics',RhythmTempo:'dynamics',HarmonyMelody:'arrangement',SoundFX:'effect'};
function low(s){return String(s||'').toLowerCase()}function uniq(a){return [...new Set(a.filter(Boolean))]}function save(){localStorage.setItem(FAV,JSON.stringify([...favorites]));localStorage.setItem(USER,JSON.stringify(userData))}
function currentGenre(){return $('subgenre')?.value||$('genreFamily')?.value||$('mainGenre')?.value||''}
function cleanTag(t){return String(t).replace(/^\[|\]$/g,'')}
function reliability(tag){return DATA.metadata?.[tag]?.level||'advanced'}
function score(tag){return reliability(tag)==='core'?92:reliability(tag)==='advanced'?76:58}
function categoryOf(tag){return DATA.metadata?.[tag]?.category||Object.keys(DATA.categories).find(c=>(DATA.categories[c]||[]).includes(tag))||'Style'}
function positionOf(tag){const c=categoryOf(tag);if(c==='Sections'&&/outro|end|coda|fade/i.test(tag))return'ending';return POSITIONS[c]||'inside'}
function useCase(tag){return USES[categoryOf(tag)]||'arrangement'}
function alternatives(tag){const g=ALT_GROUPS.find(x=>x.includes(tag));if(g)return g.filter(x=>x!==tag);const c=categoryOf(tag);return (DATA.categories[c]||[]).filter(x=>x!==tag).slice(0,4)}
function conflicts(tag){const direct=CONFLICTS[tag]||[];const reverse=Object.entries(CONFLICTS).filter(([,v])=>v.includes(tag)).map(([k])=>k);return uniq([...direct,...reverse])}
function meaning(tag){
 const n=cleanTag(tag),c=categoryOf(tag);
 if(c==='Sections')return `Defines a ${n.toLowerCase()} section and helps Suno interpret the song's arrangement.`;
 if(c==='Vocals')return `Requests a ${n.toLowerCase()} vocal character or performance style.`;
 if(c==='Choir')return `Adds or shapes choir behavior using a ${n.toLowerCase()} direction.`;
 if(c==='Dynamics')return `Controls intensity, movement or contrast through ${n.toLowerCase()}.`;
 if(c==='Production')return `Guides production or mixing toward ${n.toLowerCase()}.`;
 if(c==='Transitions')return `Creates a transition using ${n.toLowerCase()} between sections.`;
 if(c==='RhythmTempo')return `Describes rhythmic feel or tempo behavior as ${n.toLowerCase()}.`;
 if(c==='HarmonyMelody')return `Guides harmony or melody using ${n.toLowerCase()}.`;
 if(c==='SoundFX')return `Requests the sound effect or texture ${n.toLowerCase()}; results may vary.`;
 if(c==='Instrumental')return `Requests an instrumental passage or solo based on ${n.toLowerCase()}.`;
 if(c==='Adlibs')return `Adds ad-libs or vocal calls in a ${n.toLowerCase()} style.`;
 return `Adds the musical or emotional direction ${n.toLowerCase()}.`
}
function example(tag){
 const c=categoryOf(tag);
 if(c==='Sections')return `${tag}\nYour lyrics for this section...`;
 if(c==='Transitions')return `[Chorus]\nLyrics...\n\n${tag}\n\n[Verse 2]`;
 if(c==='Production'||c==='RhythmTempo'||c==='HarmonyMelody')return `[Intro] ${tag}\n\n[Verse 1]\nLyrics...`;
 return `[Verse 1] ${tag}\nLyrics...`;
}
function compatibleGenres(tag){return GENRES[categoryOf(tag)]||['All genres']}
function allTags(){return uniq(Object.values(DATA.categories).flat())}
function fitsCurrent(tag){const g=low(currentGenre());if(!g)return true;return compatibleGenres(tag).some(x=>x==='All genres'||g.includes(low(x))||low(x).includes(g))}
function model(tag){const c=categoryOf(tag);return{tag,category:c,reliability:reliability(tag),score:score(tag),position:positionOf(tag),useCase:useCase(tag),meaning:meaning(tag),genres:compatibleGenres(tag),alternatives:alternatives(tag),conflicts:conflicts(tag),example:example(tag)}}
function passes(m){
 const q=low($('metaEncyclopediaSearch').value),cat=$('metaEncyclopediaCategory').value,rel=$('metaEncyclopediaReliability').value,pos=$('metaEncyclopediaPosition').value,use=$('metaEncyclopediaUseCase').value;
 if(cat!=='all'&&m.category!==cat)return false;if(rel!=='all'&&m.reliability!==rel)return false;if(pos!=='all'&&m.position!==pos)return false;if(use!=='all'&&m.useCase!==use)return false;
 if($('metaEncyclopediaFavoritesOnly').checked&&!favorites.has(m.tag))return false;if($('metaEncyclopediaCurrentGenreOnly').checked&&!fitsCurrent(m.tag))return false;
 if(q&&!low([m.tag,m.meaning,m.category,...m.genres,...m.alternatives,...m.conflicts].join(' ')).includes(q))return false;return true
}
function card(m){return `<article class="meta-encyclopedia-card ${selected?.tag===m.tag?'active':''}" data-tag="${encodeURIComponent(m.tag)}"><div class="meta-card-top"><div><h3>${m.tag}</h3><small>${categoryLabels[m.category]||m.category}</small></div><button class="meta-card-favorite ${favorites.has(m.tag)?'on':''}" data-favorite="${encodeURIComponent(m.tag)}">${favorites.has(m.tag)?'★':'☆'}</button></div><div class="meta-card-badges"><span class="meta-card-badge ${m.reliability}">${m.reliability}</span><span class="meta-card-badge">${m.position}</span><span class="meta-card-badge">${m.useCase}</span></div><p>${m.meaning}</p><div class="meta-card-tags">${m.genres.slice(0,3).map(x=>`<span>${x}</span>`).join('')}</div></article>`}
function render(){
 const tags=allTags().map(model).filter(passes);$('metaEncyclopediaCount').textContent=`${tags.length} MetaTags`;$('metaEncyclopediaBadge').textContent=`${allTags().length} MetaTags · ${Object.keys(DATA.categories).length} categories · local knowledge`;$('metaEncyclopediaGrid').innerHTML=tags.map(card).join('');$('metaEncyclopediaEmpty').hidden=tags.length>0;
 document.querySelectorAll('.meta-encyclopedia-card').forEach(e=>e.onclick=ev=>{if(ev.target.closest('[data-favorite]'))return;selected=model(decodeURIComponent(e.dataset.tag));render();inspector()});
 document.querySelectorAll('[data-favorite]').forEach(b=>b.onclick=e=>{e.stopPropagation();const t=decodeURIComponent(b.dataset.favorite);favorites.has(t)?favorites.delete(t):favorites.add(t);save();render();if(selected?.tag===t)inspector()});recommendations()
}
function recommendations(){
 const g=currentGenre(),all=allTags().map(model);let arr;
 if(g)arr=all.filter(m=>fitsCurrent(m.tag)&&m.reliability==='core').slice(0,8);else arr=all.filter(m=>favorites.has(m.tag)).slice(0,8);
 $('metaEncyclopediaRecommendations').innerHTML=arr.length?`<span class="dna-empty">${g?'Recommended for '+g:'Favorites'}:</span>`+arr.map(m=>`<button class="meta-encyclopedia-recommendation" data-rec="${encodeURIComponent(m.tag)}">${m.tag}</button>`).join(''):'';
 document.querySelectorAll('[data-rec]').forEach(b=>b.onclick=()=>{selected=model(decodeURIComponent(b.dataset.rec));render();inspector()})
}
function chips(a){return `<div class="meta-dna-chips">${a.length?a.map(x=>`<span>${x}</span>`).join(''):'<span>None known</span>'}</div>`}
function inspector(){
 const h=$('metaEncyclopediaInspector');if(!selected)return;const u=userData[selected.tag]||{rating:0,note:''};
 h.innerHTML=`<div class="meta-inspector-content"><div class="meta-inspector-title"><div><h2>${selected.tag}</h2><p>${categoryLabels[selected.category]||selected.category} · ${selected.reliability}</p></div><div class="meta-inspector-score">${selected.score}%</div></div><p class="meta-inspector-description">${selected.meaning}</p><div class="meta-dna-stats"><div class="meta-dna-stat"><small>Reliability</small><b>${selected.reliability}</b></div><div class="meta-dna-stat"><small>Position</small><b>${selected.position}</b></div><div class="meta-dna-stat"><small>Use case</small><b>${selected.useCase}</b></div><div class="meta-dna-stat"><small>Current genre fit</small><b>${fitsCurrent(selected.tag)?'Recommended':'Context dependent'}</b></div></div><div class="meta-dna-section"><h4>Compatible Genres</h4>${chips(selected.genres)}</div><div class="meta-dna-section"><h4>Alternatives</h4>${chips(selected.alternatives)}</div><div class="meta-dna-section"><h4>Possible Conflicts</h4>${chips(selected.conflicts)}</div><div class="meta-dna-section"><h4>Example</h4><div class="meta-example-box">${selected.example}</div></div><div class="meta-dna-section meta-personal-box"><h4>Personal Rating</h4><div class="meta-rating-row">${[1,2,3,4,5].map(n=>`<button class="meta-rating-star ${u.rating>=n?'on':''}" data-rate="${n}">★</button>`).join('')}</div><textarea class="meta-note" id="metaEncyclopediaNote" placeholder="Private notes about your Suno tests">${u.note||''}</textarea></div><div class="meta-inspector-actions"><button id="metaEncyclopediaFavoriteDetail">${favorites.has(selected.tag)?'★ Remove favorite':'☆ Add favorite'}</button><button id="metaEncyclopediaCompareDetail">${compare.some(x=>x.tag===selected.tag)?'✓ Selected':'⚖ Compare'}</button><button class="primary" id="metaEncyclopediaInsert">Insert into MetaTags</button></div></div>`;
 document.querySelectorAll('[data-rate]').forEach(b=>b.onclick=()=>{userData[selected.tag]={...(userData[selected.tag]||{}),rating:Number(b.dataset.rate),note:$('metaEncyclopediaNote').value};save();inspector()});
 $('metaEncyclopediaNote').oninput=e=>{userData[selected.tag]={...(userData[selected.tag]||{}),rating:userData[selected.tag]?.rating||0,note:e.target.value};save()};
 $('metaEncyclopediaFavoriteDetail').onclick=()=>{favorites.has(selected.tag)?favorites.delete(selected.tag):favorites.add(selected.tag);save();render();inspector()};
 $('metaEncyclopediaCompareDetail').onclick=()=>toggleCompare(selected);$('metaEncyclopediaInsert').onclick=()=>insertTag(selected.tag)
}
function insertTag(tag){const area=$('customMetaTags')||$('lyricsText');if(!area)return;if(area.id==='customMetaTags')area.value=[area.value.trim(),tag].filter(Boolean).join('\n');else{const s=area.selectionStart||area.value.length;area.value=area.value.slice(0,s)+tag+'\n'+area.value.slice(s)}area.dispatchEvent(new Event('input',{bubbles:true}));area.dispatchEvent(new Event('change',{bubbles:true}));if(typeof generateOutput==='function')generateOutput();if(typeof showToast==='function')showToast('MetaTag inserted.')}
function toggleCompare(m){const i=compare.findIndex(x=>x.tag===m.tag);if(i>=0)compare.splice(i,1);else{if(compare.length>=2)compare.shift();compare.push(m)}$('metaEncyclopediaCompareButton').disabled=compare.length<2;$('metaEncyclopediaCompareButton').textContent=compare.length?`Compare selected (${compare.length}/2)`:'Compare selected';inspector()}
function compareTags(){
 if(compare.length<2)return;const[a,b]=compare,shared=uniq(a.genres.filter(x=>b.genres.includes(x))),overlap=Math.round(((a.category===b.category?35:0)+(a.useCase===b.useCase?25:0)+(a.position===b.position?20:0)+(shared.length?20:0)));
 $('metaEncyclopediaComparePanel').classList.remove('hidden');$('metaEncyclopediaCompareContent').innerHTML=`<div class="meta-compare-grid"><div class="meta-compare-column"><h3>${a.tag}</h3><p>${a.meaning}</p>${chips(a.alternatives)}</div><div class="meta-compare-center"><div class="meta-overlap-score">${overlap}%</div><b>Functional overlap</b><div class="meta-overlap-advice">${overlap>=70?'Likely alternatives':overlap>=40?'Can complement each other':'Different purposes'}</div></div><div class="meta-compare-column"><h3>${b.tag}</h3><p>${b.meaning}</p>${chips(b.alternatives)}</div></div>`
}
function reset(){['metaEncyclopediaCategory','metaEncyclopediaReliability','metaEncyclopediaPosition','metaEncyclopediaUseCase'].forEach(id=>$(id).value='all');$('metaEncyclopediaSearch').value='';$('metaEncyclopediaFavoritesOnly').checked=false;$('metaEncyclopediaCurrentGenreOnly').checked=false;render()}
function init(){
 if(!$('metaEncyclopediaGrid'))return;const cat=$('metaEncyclopediaCategory');(DATA.categoryOrder||Object.keys(DATA.categories)).forEach(c=>cat.add(new Option(categoryLabels[c]||c,c)));
 ['metaEncyclopediaCategory','metaEncyclopediaReliability','metaEncyclopediaPosition','metaEncyclopediaUseCase'].forEach(id=>$(id).onchange=render);$('metaEncyclopediaSearch').oninput=render;$('metaEncyclopediaFavoritesOnly').onchange=render;$('metaEncyclopediaCurrentGenreOnly').onchange=render;$('metaEncyclopediaReset').onclick=reset;$('metaEncyclopediaCompareButton').onclick=compareTags;$('metaEncyclopediaCloseCompare').onclick=()=>$('metaEncyclopediaComparePanel').classList.add('hidden');render()
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();


(function(){
'use strict';
const $=id=>document.getElementById(id), low=s=>String(s||'').toLowerCase().trim(), uniq=a=>[...new Set(a.filter(Boolean))];
const STORE_FAV='nsw-genre-intel-favorites', STORE_USER='nsw-genre-intel-userdata';
const FAMILY_PROFILES={
 'Pop':{bpm:[95,130],energy:'medium',reliability:'core',rhythm:['Steady groove','Hook-driven rhythm'],instruments:['Synthesizer','Piano','Electric Guitar','Bass','Drum Kit'],vocals:['Female Lead Vocal','Male Lead Vocal','Layered Backing Vocals'],production:['Polished Production','Radio-Ready Master','Clear Vocal Presence'],structure:['Intro','Verse','Pre-Chorus','Chorus','Verse 2','Bridge','Final Chorus','Outro'],moods:['Catchy','Emotional','Bright'],fusion:['Electronic','Rock','R&B / Soul']},
 'Rock':{bpm:[105,165],energy:'high',reliability:'core',rhythm:['Driving rhythm','Strong backbeat'],instruments:['Electric Guitar','Bass Guitar','Acoustic Drums','Piano'],vocals:['Male Lead Vocal','Female Lead Vocal','Powerful Vocal'],production:['Wide Guitars','Punchy Drums','Dynamic Mix'],structure:['Intro','Verse','Pre-Chorus','Chorus','Verse 2','Guitar Solo','Final Chorus','Outro'],moods:['Energetic','Defiant','Anthemic'],fusion:['Metal','Pop','Blues']},
 'Metal':{bpm:[120,190],energy:'extreme',reliability:'core',rhythm:['Double-time feel','Heavy groove','Half-time breakdown'],instruments:['Distorted Electric Guitar','Bass Guitar','Double Kick Drums','Orchestral Strings'],vocals:['Powerful Male Vocal','Female Lead Vocal','Growled Vocal','Screamed Vocal'],production:['Heavy Low End','Wide Guitar Mix','Punchy Drums'],structure:['Intro','Verse','Pre-Chorus','Chorus','Breakdown','Solo','Final Chorus','Outro'],moods:['Aggressive','Dark','Epic'],fusion:['Rock','Orchestral','Folk']},
 'Electronic / EDM':{bpm:[118,150],energy:'high',reliability:'core',rhythm:['Four-on-the-floor','Driving groove','Syncopated electronic rhythm'],instruments:['Analog Synthesizer','FM Synthesizer','Synth Bass','Electronic Drums'],vocals:['Female Lead Vocal','Male Lead Vocal','Chopped Vocal'],production:['Festival Production','Sidechain Compression','Deep Sub Weight','Wide Stereo Mix'],structure:['Intro','Build','Drop','Break','Second Build','Final Drop','Outro'],moods:['Energetic','Futuristic','Euphoric'],fusion:['Pop','House','Cinematic']},
 'Jazz / Swing':{bpm:[90,145],energy:'medium',reliability:'core',rhythm:['Swing feel','Walking groove','Syncopation'],instruments:['Walking Upright Bass','Piano','Trumpet','Trombone','Clarinet','Saxophone','Brushed Drums'],vocals:['Vintage Male Vocal','Female Jazz Vocal','Scat Vocal'],production:['Vintage Production','Warm Mix','Dynamic Brass'],structure:['Intro','Verse','Chorus','Instrumental Break','Verse 2','Brass Solo','Final Chorus','Outro'],moods:['Playful','Elegant','Warm'],fusion:['Electronic / EDM','Blues','Funk']},
 'Hip-Hop / Rap':{bpm:[75,115],energy:'medium',reliability:'core',rhythm:['Hip-hop groove','Boom bap rhythm','Half-time feel'],instruments:['Hip-Hop Drums','Deep Bass','Piano','Sampled Strings','Synthesizer'],vocals:['Male Rap Vocal','Female Rap Vocal','Spoken Word','Gang Shouts'],production:['Punchy Drums','Deep Low End','Forward Vocal'],structure:['Intro','Verse 1','Hook','Verse 2','Hook','Bridge','Final Hook','Outro'],moods:['Confident','Dark','Reflective'],fusion:['Trap / Drill','Jazz / Swing','Folk']},
 'Folk / Traditional':{bpm:[70,135],energy:'medium',reliability:'advanced',rhythm:['Organic pulse','Marching rhythm','Dance rhythm'],instruments:['Acoustic Guitar','Violin','Frame Drum','Flute','Accordion'],vocals:['Storytelling Male Vocal','Female Folk Vocal','Group Chants'],production:['Organic Production','Natural Room Ambience','Warm Mix'],structure:['Instrumental Intro','Verse','Chorus','Verse 2','Instrumental','Bridge','Final Chorus','Outro'],moods:['Earthy','Nostalgic','Storytelling'],fusion:['Rock','Metal','Cinematic / Orchestral']},
 'Cinematic / Soundtrack':{bpm:[60,145],energy:'high',reliability:'core',rhythm:['Gradual build','Orchestral pulse','Trailer rhythm'],instruments:['Full Orchestra','Strings','Brass','Cinematic Percussion','Choir','Piano'],vocals:['Wordless Choir','Deep Narrator','Ethereal Female Vocal'],production:['Cinematic Production','Wide Dynamic Range','Large Hall Reverb'],structure:['Atmospheric Intro','Theme','Development','Build','Climax','Resolution','Outro'],moods:['Epic','Emotional','Dramatic'],fusion:['Classical','Electronic / EDM','Folk / Traditional']},
 'Classical / Orchestral':{bpm:[50,150],energy:'medium',reliability:'core',rhythm:['Rubato','Orchestral pulse','Measured tempo'],instruments:['Orchestra','Violin','Cello','Piano','Woodwinds','Brass'],vocals:['Operatic Vocal','Chamber Choir','Wordless Choir'],production:['Natural Concert Hall','Wide Dynamic Range','Acoustic Production'],structure:['Prelude','Movement I','Development','Interlude','Finale','Coda'],moods:['Elegant','Dramatic','Reflective'],fusion:['Cinematic / Soundtrack','Metal','Ambient']},
 'Ambient / Experimental':{bpm:[45,115],energy:'low',reliability:'advanced',rhythm:['Free rhythm','Slow pulse','Evolving texture'],instruments:['Ambient Pads','Piano','Field Recordings','Granular Synth','Bowed Textures'],vocals:['Whispered Vocal','Ethereal Vocal','Wordless Vocal'],production:['Atmospheric Sound Design','Long Reverb','Wide Stereo Field'],structure:['Ambient Intro','Evolving Section','Textural Build','Climax','Fade Out'],moods:['Dreamy','Mysterious','Meditative'],fusion:['Electronic / EDM','Cinematic / Soundtrack','Classical / Orchestral']},
 'World Music':{bpm:[70,145],energy:'medium',reliability:'advanced',rhythm:['Traditional rhythm','Polyrhythmic groove','Dance pulse'],instruments:['Traditional Percussion','Flute','Lute','Strings','Hand Drums'],vocals:['Traditional Vocal','Group Chant','Call and Response'],production:['Organic Production','Natural Ambience','Hybrid World Production'],structure:['Instrumental Intro','Verse','Response','Chorus','Instrumental Break','Final Chorus'],moods:['Cultural','Celebratory','Spiritual'],fusion:['Electronic / EDM','Folk / Traditional','Cinematic / Soundtrack']}
};
const KEYWORD_PROFILES=[
 {keys:['electro swing'],add:{bpm:[118,135],energy:'high',reliability:'advanced',rhythm:['Bouncy swing rhythm','Four-on-the-floor swing'],instruments:['Punchy Brass Section','Walking Upright Bass','Ragtime Piano','Clarinet'],production:['Vintage Vinyl Texture','Modern Electronic Beat'],fusion:['House','Big Band','Funk']}},
 {keys:['metalcore'],add:{bpm:[140,190],energy:'extreme',rhythm:['Half-time breakdown','Double-kick drive'],instruments:['Heavy Rhythm Guitar','Double Kick Drums'],vocals:['Clean and Harsh Vocal Contrast'],structure:['Intro','Verse','Pre-Chorus','Chorus','Breakdown','Bridge','Final Chorus']}},
 {keys:['viking','nordic'],add:{bpm:[75,135],energy:'high',reliability:'advanced',instruments:['Tagelharpa','Nyckelharpa','Nordic Frame Drums','War Horns','Deep Male Choir'],moods:['Ancient','Mythic','Fierce'],fusion:['Metal','Cinematic / Soundtrack','Ambient / Experimental']}},
 {keys:['anime','j-pop','jpop'],add:{bpm:[125,180],energy:'high',rhythm:['Forward momentum','Opening energy'],instruments:['Electric Guitar','Piano','Strings','Synthesizer','Rock Drums'],vocals:['Japanese Female Lead Vocal','Japanese Male Lead Vocal'],production:['Polished Anime Production','Strong Dynamic Contrast'],structure:['Short Intro','Verse','Pre-Chorus','Chorus','Instrumental','Bridge','Final Chorus','Outro']}},
 {keys:['lo-fi','lofi'],add:{bpm:[65,95],energy:'low',reliability:'core',rhythm:['Laid-back groove'],instruments:['Soft Piano','Jazz Guitar','Dusty Drums'],production:['Lo-Fi Production','Vinyl Crackle','Warm Saturation'],moods:['Relaxed','Nostalgic','Dreamy']}},
 {keys:['drum & bass','drum and bass','dnb'],add:{bpm:[165,180],energy:'extreme',rhythm:['Fast breakbeats','Rolling rhythm'],instruments:['Reese Bass','Breakbeats','Atmospheric Pads'],production:['Controlled Sub Bass','Crisp Breakbeats'],structure:['Intro','Build','Drop','Break','Second Drop','Outro']}},
 {keys:['ballad'],add:{bpm:[55,90],energy:'low',rhythm:['Slow emotional flow'],instruments:['Piano','Acoustic Guitar','Strings'],vocals:['Emotional Lead Vocal'],production:['Intimate Production','Gradual Build'],moods:['Emotional','Melancholic','Romantic']}},
 {keys:['synthwave','retrowave'],add:{bpm:[85,125],energy:'medium',rhythm:['Steady retro pulse'],instruments:['Analog Synthesizer','Gated Drums','Synth Bass'],production:['1980s Production','Wide Synth Mix','Gated Reverb'],moods:['Nostalgic','Neon','Cinematic']}},
 {keys:['reggae','dancehall'],add:{bpm:[70,110],energy:'medium',rhythm:['Offbeat skank','One-drop groove'],instruments:['Offbeat Guitar','Deep Bass','Organ','Percussion'],vocals:['Relaxed Lead Vocal','Toasting Vocal'],production:['Warm Bass Mix','Spacious Dub Delay'],moods:['Relaxed','Sunny','Groovy']}}
];
const T={de:{allFamilies:'Alle Familien',genres:'Genres',select:'Genre auswählen',apply:'In Style Builder übernehmen',favorite:'Favorit',compare:'Zum Vergleich auswählen',notes:'Eigene Notizen',rating:'Eigene Bewertung',reset:'Filter zurücksetzen'},en:{allFamilies:'All families',genres:'genres',select:'Select a genre',apply:'Apply to Style Builder',favorite:'Favorite',compare:'Select for comparison',notes:'Personal notes',rating:'Personal rating',reset:'Reset filters'}};
let favorites=new Set(JSON.parse(localStorage.getItem(STORE_FAV)||'[]')), userData=JSON.parse(localStorage.getItem(STORE_USER)||'{}'), selected=null, compare=[];
function lang(){return (localStorage.getItem('nordlicht-ui-language')||document.documentElement.lang||'en').startsWith('de')?'de':'en'}
function merge(a,b){const r=JSON.parse(JSON.stringify(a));for(const [k,v] of Object.entries(b||{})){if(Array.isArray(v))r[k]=uniq([...(r[k]||[]),...v]);else r[k]=v}return r}
function familyProfile(family){return FAMILY_PROFILES[family]||{bpm:[80,140],energy:'medium',reliability:'advanced',rhythm:['Steady rhythm'],instruments:['Piano','Bass','Drums'],vocals:['Lead Vocal'],production:['Studio Production','Dynamic Mix'],structure:['Intro','Verse','Chorus','Verse 2','Bridge','Final Chorus','Outro'],moods:['Expressive'],fusion:[]}}
function reliability(name,family){const n=low(name);if(/experimental|noise|avant|microsound|glitch|lowercase|musique concrète/.test(n))return'experimental';if(/traditional|folk|world|ethnic|regional/.test(n)||family==='World Music')return'advanced';return familyProfile(family).reliability||'advanced'}
function dna(family,name){
 let d={family,name,...familyProfile(family)};KEYWORD_PROFILES.forEach(p=>{if(p.keys.some(k=>low(name).includes(k)))d=merge(d,p.add)});
 d.reliability=reliability(name,family);d.bpm=d.bpm||[80,140];d.energy=d.energy||'medium';
 d.description=`${name} is a ${family} style characterized by ${d.rhythm.slice(0,2).join(' and ').toLowerCase()}, with ${d.instruments.slice(0,3).join(', ')} as practical starting points.`;
 d.sunoScore=d.reliability==='core'?90:d.reliability==='advanced'?76:58;
 return d
}
function allGenres(){const out=[];Object.entries(GENRE_LIBRARY||{}).forEach(([family,names])=>names.forEach(name=>out.push(dna(family,name))));return out}
function currentBuilderGenre(){return $('subgenre')?.value||$('mainGenre')?.value||$('genreFamily')?.value||''}
function fitScore(g,current=currentBuilderGenre()){
 if(!current)return 50;if(low(g.name)===low(current))return 100;if(low(g.family)===low(current))return 90;
 if(low(g.name).includes(low(current))||low(current).includes(low(g.name)))return 86;
 if(g.fusion.some(x=>low(current).includes(low(x))||low(x).includes(low(current))))return 76;return 42
}
function tempoBucket(g){const mid=(g.bpm[0]+g.bpm[1])/2;return mid<100?'slow':mid<130?'medium':mid<160?'fast':'extreme'}
function save(){localStorage.setItem(STORE_FAV,JSON.stringify([...favorites]));localStorage.setItem(STORE_USER,JSON.stringify(userData))}
function filters(g){
 const q=low($('genreIntelSearch').value),family=$('genreIntelFamily').value,tempo=$('genreIntelTempo').value,energy=$('genreIntelEnergy').value,rel=$('genreIntelReliability').value;
 if(family!=='all'&&g.family!==family)return false;if(tempo!=='all'&&tempoBucket(g)!==tempo)return false;if(energy!=='all'&&g.energy!==energy)return false;if(rel!=='all'&&g.reliability!==rel)return false;
 if($('genreIntelFavoritesOnly').checked&&!favorites.has(g.name))return false;if($('genreIntelCurrentFitOnly').checked&&fitScore(g)<70)return false;
 if(q&&!low([g.name,g.family,...g.instruments,...g.vocals,...g.production,...g.moods,...g.rhythm].join(' ')).includes(q))return false;return true
}
function card(g){
 const fav=favorites.has(g.name),fit=fitScore(g);
 return `<article class="genre-intel-card ${selected?.name===g.name?'active':''}" data-genre="${encodeURIComponent(g.name)}">
 <div class="genre-intel-card-top"><div><h3>${g.name}</h3><small>${g.family}</small></div><button class="genre-intel-favorite ${fav?'on':''}" data-favorite="${encodeURIComponent(g.name)}">${fav?'★':'☆'}</button></div>
 <div class="genre-intel-badges"><span class="genre-intel-badge ${g.reliability}">${g.reliability}</span><span class="genre-intel-badge">${g.bpm[0]}–${g.bpm[1]} BPM</span><span class="genre-intel-badge">${g.energy}</span>${currentBuilderGenre()?`<span class="genre-intel-badge">${fit}% fit</span>`:''}</div>
 <p>${g.description}</p><div class="genre-intel-card-tags">${g.instruments.slice(0,3).map(x=>`<span>${x}</span>`).join('')}</div></article>`
}
function render(){
 const all=allGenres(),shown=all.filter(filters);$('genreIntelCount').textContent=`${shown.length} ${T[lang()].genres}`;$('genreIntelligenceBadge').textContent=`${all.length} genres · ${Object.keys(GENRE_LIBRARY||{}).length} families · local knowledge`;
 $('genreIntelGrid').innerHTML=shown.map(card).join('');$('genreIntelEmpty').hidden=shown.length>0;
 document.querySelectorAll('.genre-intel-card').forEach(e=>e.onclick=ev=>{if(ev.target.closest('[data-favorite]'))return;selected=all.find(g=>g.name===decodeURIComponent(e.dataset.genre));render();inspector()});
 document.querySelectorAll('[data-favorite]').forEach(b=>b.onclick=ev=>{ev.stopPropagation();const n=decodeURIComponent(b.dataset.favorite);favorites.has(n)?favorites.delete(n):favorites.add(n);save();render();if(selected?.name===n)inspector()});
 recommendations(all)
}
function recommendations(all){
 const current=currentBuilderGenre();const arr=current?all.map(g=>[g,fitScore(g,current)]).filter(x=>x[1]>=70&&low(x[0].name)!==low(current)).sort((a,b)=>b[1]-a[1]).slice(0,7):all.filter(g=>favorites.has(g.name)).slice(0,7).map(g=>[g,100]);
 $('genreIntelRecommendations').innerHTML=arr.length?`<span class="dna-empty">${current?'Compatible with '+current:'Favorites'}:</span>`+arr.map(([g,s])=>`<button class="genre-intel-recommendation" data-rec="${encodeURIComponent(g.name)}">${g.name}${current?' · '+s+'%':''}</button>`).join(''):'';
 document.querySelectorAll('[data-rec]').forEach(b=>b.onclick=()=>{selected=all.find(g=>g.name===decodeURIComponent(b.dataset.rec));render();inspector()})
}
function chips(a){return `<div class="genre-dna-chips">${a.map(x=>`<span>${x}</span>`).join('')}</div>`}
function inspector(){
 const h=$('genreIntelInspector');if(!selected)return;
 const u=userData[selected.name]||{rating:0,note:''},fit=fitScore(selected);
 h.innerHTML=`<div class="genre-inspector-content">
 <div class="genre-inspector-title"><div><h2>${selected.name}</h2><p>${selected.family} · ${selected.reliability}</p></div><div class="genre-inspector-score">${selected.sunoScore}%</div></div>
 <p class="genre-inspector-description">${selected.description}</p>
 <div class="genre-dna-stats"><div class="genre-dna-stat"><small>Typical BPM</small><b>${selected.bpm[0]}–${selected.bpm[1]}</b></div><div class="genre-dna-stat"><small>Energy</small><b>${selected.energy}</b></div><div class="genre-dna-stat"><small>Practical Suno fit</small><b>${selected.reliability}</b></div><div class="genre-dna-stat"><small>Current genre fit</small><b>${fit}%</b></div></div>
 <div class="genre-dna-section"><h4>Rhythm & Groove</h4>${chips(selected.rhythm)}</div>
 <div class="genre-dna-section"><h4>Typical Instruments</h4>${chips(selected.instruments)}</div>
 <div class="genre-dna-section"><h4>Vocals</h4>${chips(selected.vocals)}</div>
 <div class="genre-dna-section"><h4>Production</h4>${chips(selected.production)}</div>
 <div class="genre-dna-section"><h4>Common Structure</h4>${chips(selected.structure)}</div>
 <div class="genre-dna-section"><h4>Mood & Character</h4>${chips(selected.moods)}</div>
 <div class="genre-dna-section"><h4>Recommended Fusions</h4>${chips(selected.fusion.length?selected.fusion:['Use a closely related secondary genre'])}</div>
 <div class="genre-dna-section"><h4>Prompt Example</h4><p class="genre-inspector-description">${promptFor(selected)}</p></div>
 <div class="genre-dna-section genre-personal-box"><h4>${T[lang()].rating}</h4><div class="genre-rating-row">${[1,2,3,4,5].map(n=>`<button class="genre-rating-star ${u.rating>=n?'on':''}" data-rate="${n}">★</button>`).join('')}</div><textarea class="genre-note" id="genreIntelNote" placeholder="${T[lang()].notes}">${u.note||''}</textarea></div>
 <div class="genre-inspector-actions"><button id="genreIntelFavoriteDetail">${favorites.has(selected.name)?'★ Remove favorite':'☆ Add favorite'}</button><button id="genreIntelCompareDetail">${compare.some(x=>x.name===selected.name)?'✓ Selected':'⚖ Compare'}</button><button class="primary" id="genreIntelApply">${T[lang()].apply}</button></div>
 </div>`;
 document.querySelectorAll('[data-rate]').forEach(b=>b.onclick=()=>{userData[selected.name]={...(userData[selected.name]||{}),rating:Number(b.dataset.rate),note:$('genreIntelNote').value};save();inspector()});
 $('genreIntelNote').oninput=e=>{userData[selected.name]={...(userData[selected.name]||{}),rating:userData[selected.name]?.rating||0,note:e.target.value};save()};
 $('genreIntelFavoriteDetail').onclick=()=>{favorites.has(selected.name)?favorites.delete(selected.name):favorites.add(selected.name);save();render();inspector()};
 $('genreIntelCompareDetail').onclick=()=>toggleCompare(selected);$('genreIntelApply').onclick=()=>applyGenre(selected)
}
function promptFor(g){return [g.name,`${g.bpm[0]}–${g.bpm[1]} BPM`,...g.rhythm.slice(0,2),...g.vocals.slice(0,2),...g.instruments.slice(0,5),...g.production.slice(0,3),...g.moods.slice(0,2)].join(', ')}
function toggleCompare(g){const i=compare.findIndex(x=>x.name===g.name);if(i>=0)compare.splice(i,1);else{if(compare.length>=2)compare.shift();compare.push(g)}$('genreIntelCompareButton').disabled=compare.length<2;$('genreIntelCompareButton').textContent=compare.length?`Compare selected (${compare.length}/2)`:'Compare selected';inspector()}
function compareGenres(){
 if(compare.length<2)return;const[a,b]=compare,shared=uniq(a.instruments.filter(x=>b.instruments.includes(x))),score=Math.round((fitScore(a,b.name)+fitScore(b,a.name))/2);
 $('genreIntelComparePanel').classList.remove('hidden');$('genreIntelCompareContent').innerHTML=`<div class="genre-compare-grid"><div class="genre-compare-column"><h3>${a.name}</h3><p>${a.bpm[0]}–${a.bpm[1]} BPM · ${a.energy}</p>${chips(a.instruments.slice(0,5))}</div><div class="genre-compare-center"><div class="genre-fusion-score">${score}%</div><b>Fusion potential</b><div class="genre-fusion-advice">${score>=75?'Strong natural fusion':score>=55?'Creative but workable':'Experimental contrast'}</div><p>${shared.length?'Shared instruments: '+shared.join(', '):'Use a clear primary genre and limited crossover elements.'}</p><button id="genreIntelApplyFusion">Apply fusion</button></div><div class="genre-compare-column"><h3>${b.name}</h3><p>${b.bpm[0]}–${b.bpm[1]} BPM · ${b.energy}</p>${chips(b.instruments.slice(0,5))}</div></div>`;$('genreIntelApplyFusion').onclick=()=>applyFusion(a,b)
}
function setSelect(id,value){const e=$(id);if(!e||!value)return false;const o=[...e.options].find(x=>low(x.value)===low(value)||low(x.textContent)===low(value)||low(x.textContent).includes(low(value))||low(value).includes(low(x.textContent)));if(!o)return false;e.value=o.value;e.dispatchEvent(new Event('change',{bubbles:true}));return true}
function applyGenre(g){setSelect('genreFamily',g.family);setTimeout(()=>{setSelect('subgenre',g.name);if($('bpm')){$('bpm').value=Math.round((g.bpm[0]+g.bpm[1])/2);$('bpm').dispatchEvent(new Event('input',{bubbles:true}))}if($('customStyle'))$('customStyle').value=uniq([$('customStyle').value,...g.rhythm,...g.production,...g.moods].filter(Boolean)).join(', ');if(typeof generateOutput==='function')generateOutput();if(typeof showToast==='function')showToast(`${g.name} applied to Style Builder.`)},0)}
function applyFusion(a,b){applyGenre(a);setTimeout(()=>{setSelect('secondGenre',b.name);if($('genreBlend')){$('genreBlend').value=70;$('genreBlend').dispatchEvent(new Event('input',{bubbles:true}))}},10)}
function reset(){['genreIntelFamily','genreIntelTempo','genreIntelEnergy','genreIntelReliability'].forEach(id=>$(id).value='all');$('genreIntelSearch').value='';$('genreIntelFavoritesOnly').checked=false;$('genreIntelCurrentFitOnly').checked=false;render()}
function init(){
 if(!$('genreIntelGrid')||typeof GENRE_LIBRARY==='undefined')return;
 const family=$('genreIntelFamily');Object.keys(GENRE_LIBRARY).sort().forEach(x=>family.add(new Option(x,x)));
 ['genreIntelFamily','genreIntelTempo','genreIntelEnergy','genreIntelReliability'].forEach(id=>$(id).onchange=render);$('genreIntelSearch').oninput=render;$('genreIntelFavoritesOnly').onchange=render;$('genreIntelCurrentFitOnly').onchange=render;
 $('genreIntelResetFilters').onclick=reset;$('genreIntelCompareButton').onclick=compareGenres;$('genreIntelCloseCompare').onclick=()=>$('genreIntelComparePanel').classList.add('hidden');
 render()
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();


(function(){
'use strict';
const $=id=>document.getElementById(id), norm=s=>String(s||'').trim().replace(/\s+/g,' '), low=s=>norm(s).toLowerCase();
const uniq=a=>{const x=new Set();return a.filter(v=>{const k=low(v);if(!k||x.has(k))return false;x.add(k);return true})};
const split=s=>String(s||'').split(/[,;\n]+/).map(norm).filter(Boolean), clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const GENRES=[
 ['Electro Swing',['electro swing','swing house']],['Swing / Jazz',['swing','jazz','big band','ragtime','bebop']],
 ['Viking / Nordic Folk',['viking','nordic folk','norse','scandinavian folk','pagan folk']],['Hip-Hop / Rap',['hip-hop','hip hop','rap','boom bap']],
 ['Trap / Drill',['trap','drill']],['Metalcore',['metalcore']],['Deathcore',['deathcore']],['Metal',['death metal','black metal','power metal','heavy metal','folk metal','metal']],
 ['Rock',['hard rock','alternative rock','punk rock','rock']],['Anime / Japanese',['anime opening','anime ending','j-pop','jpop','anime']],
 ['K-Pop',['k-pop','kpop']],['EDM / Electronic',['edm','electronic','electronica']],['Techno',['techno']],['House',['deep house','future house','electro house','house']],
 ['Trance',['psytrance','trance']],['Drum & Bass',['drum & bass','drum and bass','dnb','jungle','neurofunk']],['Dubstep',['dubstep','brostep']],
 ['Synthwave',['synthwave','retrowave','outrun','cyberpunk']],['Cinematic / Orchestral',['cinematic','orchestral','film score','soundtrack','trailer music','game ost']],
 ['Ambient / Lo-Fi',['ambient','lo-fi','lofi','chillwave']],['Pop',['dance pop','electropop','pop']],['Ballad',['ballad']],['Country',['country']],
 ['Reggae / Caribbean',['reggae','dancehall','caribbean']],['Folk',['celtic','medieval','tavern','folk']],['Classical',['classical','baroque']],['Blues / Soul',['blues','soul','r&b']],['Funk',['funk']]
];
const VOCALS=['female lead','male lead','female vocal','male vocal','duet','choir','spoken voice','spoken word','narrator','rap vocal','growl','scream','whisper','falsetto','soprano','alto','tenor','baritone','clean vocal','raspy vocal','breathy vocal','robotic voice','celestial choir','satb choir','deep male choir','children choir','gang shouts','call and response','clear voice separation'];
const INSTR=['piano','guitar','bass','upright bass','walking upright bass','drums','hip-hop drums','electronic drums','double kick','strings','violin','cello','orchestra','brass','trumpet','trombone','clarinet','saxophone','flute','synth','synthesizer','synth bass','tagelharpa','nyckelharpa','jouhikko','hardanger fiddle','war horns','frame drums','taiko','shamisen','koto','biwa','duduk','oud','ney','harp','organ','accordion','banjo','mandolin','ukulele','percussion','didgeridoo','theremin','hurdy-gurdy','bagpipes','tin whistle','bodhrán','ngoni','shehnai','gayageum'];
const PROD=['production','mix','master','stereo','mono','reverb','delay','compression','sidechain','saturation','tape','vinyl','polished','studio quality','high fidelity','radio-ready','radio ready','dynamic mix','wide mix','clean mix','warm mix','dark mix','bright mix','cinematic production','festival production','analog production','digital production','lo-fi production','modern master','deep sub','sub weight','wall of sound'];
const THEORY=['major','minor','modal','key','scale','chord','harmony','melody','arpeggio','syncop','swing feel','shuffle','half-time','double-time','groove','rhythm','crescendo','build-up','dynamic contrast','emotional lift','key change','countermelody','leitmotif','staccato','legato','rubato','polyrhythm','driving','forward momentum','gradual build'];
const MOOD=['dark','sad','emotional','happy','hopeful','heroic','aggressive','dreamy','romantic','melancholic','playful','mysterious','triumphant','intimate','epic','nostalgic','warm','cold','sacred','mythic','fierce','frozen longing','secret exposed','final battle','rebellion','timeless','industrial','celestial'];
const STRUCT=['intro','verse','pre-chorus','chorus','post-chorus','bridge','outro','drop','build','breakdown','instrumental','solo','final chorus','hook','refrain','interlude','coda','finale','cold open','dance break','rap break'];
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function detectGenres(items){const j=low(items.join(', ')),h=[];GENRES.forEach(([n,t])=>{let s=0,m=[];t.forEach(x=>{if(j.includes(x)){s+=x.split(/\s+/).length+1;m.push(x)}});if(s)h.push({name:n,score:s,matched:m})});return h.sort((a,b)=>b.score-a.score)}
function find(items,d){return uniq(items.filter(i=>d.some(w=>low(i).includes(w))))}
function bpm(text){const m=String(text).match(/\b(\d{2,3})\s*bpm\b/i);return m?clamp(Number(m[1]),30,260):null}
function tempo(n){return !n?'Not specified':n<70?'Very Slow':n<95?'Slow / Relaxed':n<120?'Mid Tempo':n<145?'Upbeat / Driving':n<175?'Fast / High Energy':'Very Fast / Extreme'}
function meta(text){return uniq([...String(text).matchAll(/\[([^\]]+)\]/g)].map(m=>'['+norm(m[1])+']'))}
function blend(g){if(g.length<2)return null;const total=g[0].score+g[1].score;let r=clamp(Math.round((g[0].score/total)*20)*5,50,90);return{primary:g[0].name,secondary:g[1].name,ratio:r,phrase:r>=85?`${g[0].name} with subtle ${g[1].name} elements`:r>=75?`${g[0].name} with light ${g[1].name} influences`:r>=65?`${g[0].name} with ${g[1].name} influences`:r>=55?`${g[0].name}-driven fusion with strong ${g[1].name} influence`:`Equal fusion of ${g[0].name} and ${g[1].name}`}}
function analyze(text){
 const items=split(text),genres=detectGenres(items),B=bpm(text),vocals=find(items,VOCALS),instruments=find(items,INSTR),production=find(items,PROD),theory=find(items,THEORY),mood=find(items,MOOD),structure=uniq([...find(items,STRUCT),...meta(text)]),bl=blend(genres);
 const warnings=[],strengths=[],recommendations=[];
 if(genres.length)strengths.push('A recognizable genre direction is present.');else warnings.push('No clear genre was detected.');
 if(genres.length>3)warnings.push('More than three genre signals may reduce focus.');
 if(bl)strengths.push('A multi-genre fusion can be reconstructed.');
 if(B)strengths.push(`A concrete tempo of ${B} BPM is specified.`);else recommendations.push('Add BPM or a clear tempo character.');
 if(vocals.length||/instrumental/i.test(text))strengths.push('The vocal or instrumental direction is defined.');else recommendations.push('Specify vocals or Instrumental Only.');
 if(instruments.length)strengths.push(`${instruments.length} instrument directions are identifiable.`);else recommendations.push('Add two to five clear instrument roles.');
 if(production.length)strengths.push('Production or mix guidance is included.');else recommendations.push('Add one production and one mix instruction.');
 if(theory.length)strengths.push('Rhythm, dynamics or arrangement movement is described.');else recommendations.push('Add groove, dynamics or arrangement movement.');
 if(mood.length)strengths.push('An emotional or atmospheric direction is present.');else recommendations.push('Add a clear mood or atmosphere.');
 const known=uniq([...genres.flatMap(g=>g.matched),...VOCALS,...INSTR,...PROD,...THEORY,...MOOD,...STRUCT]);
 const unknown=items.filter(i=>!/\b\d{2,3}\s*bpm\b/i.test(i)&&!known.some(k=>low(i).includes(low(k))));
 const confidence=clamp(Math.round(40+Math.min(45,(genres.length+vocals.length+instruments.length+production.length+theory.length+mood.length+structure.length+(B?1:0))*3)-warnings.length*4-Math.min(10,unknown.length)),20,99);
 return{text,items,genres,bpm:B,tempo:tempo(B),vocals,instruments,production,theory,mood,structure,unknown,blend:bl,warnings,strengths,recommendations,confidence}
}
function chip(x,t=''){return `<span class="dna-chip ${t}">${escapeHtml(x)}</span>`}
function chips(id,a,t){$(id).innerHTML=a.length?a.map(x=>chip(x,t)).join(''):'<span class="dna-empty">Not specified</span>'}
function list(id,a,e){$(id).innerHTML=a.length?a.map(x=>`<li>${escapeHtml(x)}</li>`).join(''):`<li class="dna-empty">${e}</li>`}
function render(r){
 window.NSW_SONG_DNA_LAST=r;$('dnaResult').classList.remove('hidden');$('dnaConfidence').textContent=r.confidence+'%';$('dnaConfidenceBar').style.width=r.confidence+'%';
 $('dnaHeadline').textContent=r.blend?r.blend.phrase:(r.genres[0]?.name||'Unclassified');
 const f=[['Primary Genre',r.genres[0]?.name||'—'],['BPM',r.bpm||'—'],['Vocals',r.vocals[0]||(/instrumental/i.test(r.text)?'Instrumental':'—')],['Instruments',r.instruments.length],['Production',r.production.length],['Structure',r.structure.length]];
 $('dnaQuickFacts').innerHTML=f.map(([a,b])=>`<div class="dna-fact"><small>${a}</small><b>${escapeHtml(b)}</b></div>`).join('');
 chips('dnaGenres',r.genres.map(g=>g.name),'genre');chips('dnaVocals',r.vocals,'vocal');chips('dnaInstruments',r.instruments,'instrument');chips('dnaProduction',r.production,'production');chips('dnaTheory',r.theory,'');chips('dnaMood',r.mood,'mood');chips('dnaStructure',r.structure,'structure');chips('dnaUnknown',$('dnaIncludeUnknown').checked?r.unknown:[],'');
 $('dnaTempo').innerHTML=[['BPM',r.bpm||'Not specified'],['Tempo Character',r.tempo],['Groove',r.theory.find(x=>/groove|swing|shuffle|rhythm|driving/i.test(x))||'Not specified'],['Dynamics',r.theory.find(x=>/build|crescendo|contrast|lift|momentum/i.test(x))||'Not specified']].map(([a,b])=>`<div class="dna-value"><small>${a}</small><b>${escapeHtml(b)}</b></div>`).join('');
 if(r.blend){$('dnaBlendVisual').classList.remove('hidden');$('dnaBlendPrimary').textContent=r.blend.primary;$('dnaBlendSecondary').textContent=r.blend.secondary;$('dnaBlendRatio').textContent=`${r.blend.ratio} / ${100-r.blend.ratio}`;$('dnaBlendBar').style.width=r.blend.ratio+'%';$('dnaBlendPhrase').textContent=r.blend.phrase}else $('dnaBlendVisual').classList.add('hidden');
 list('dnaStrengths',r.strengths,'No clear strengths identified.');list('dnaWarnings',r.warnings,'No major ambiguities detected.');list('dnaRecommendations',r.recommendations,'No essential additions recommended.');
 $('dnaStatus').textContent=`Analysis complete · ${r.items.length} items · ${r.unknown.length} unclassified.`
}
function summary(r){return [`SONG DNA ANALYSIS`,`Primary genre: ${r.genres[0]?.name||'—'}`,`Secondary genre: ${r.genres[1]?.name||'—'}`,`Genre fusion: ${r.blend?.phrase||'—'}`,`BPM: ${r.bpm||'—'} (${r.tempo})`,`Vocals: ${r.vocals.join(', ')||'—'}`,`Instruments: ${r.instruments.join(', ')||'—'}`,`Production: ${r.production.join(', ')||'—'}`,`Music theory: ${r.theory.join(', ')||'—'}`,`Mood: ${r.mood.join(', ')||'—'}`,`Structure: ${r.structure.join(', ')||'—'}`,`Confidence: ${r.confidence}%`].join('\n')}
async function copyText(t){try{await navigator.clipboard.writeText(t)}catch(e){const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();document.execCommand('copy');a.remove()}}
function run(){const t=$('dnaInput').value.trim();if(!t){$('dnaStatus').textContent='Paste a STYLE prompt first.';return}render(analyze(t))}
function apply(){
 const r=window.NSW_SONG_DNA_LAST;if(!r)return;
 const set=(id,v)=>{const e=$(id);if(!e||!v)return false;const o=[...e.options].find(x=>low(x.value)===low(v)||low(x.textContent).includes(low(v))||low(v).includes(low(x.textContent)));if(o){e.value=o.value;e.dispatchEvent(new Event('change',{bubbles:true}));return true}return false};
 set('genreFamily',r.genres[0]?.name)||set('mainGenre',r.genres[0]?.name);set('secondGenre',r.genres[1]?.name);
 if(r.bpm&&$('bpm')){$('bpm').value=r.bpm;$('bpm').dispatchEvent(new Event('input',{bubbles:true}))}
 if(r.blend&&$('genreBlend')){$('genreBlend').value=r.blend.ratio;$('genreBlend').dispatchEvent(new Event('input',{bubbles:true}))}
 if($('customStyle'))$('customStyle').value=uniq([...r.vocals,...r.instruments,...r.production,...r.theory,...r.mood]).join(', ');
 if(typeof generateOutput==='function')generateOutput();if(typeof showToast==='function')showToast('Song DNA applied to Style Builder.')
}
function init(){
 if(!$('dnaAnalyze'))return;
 $('dnaAnalyze').onclick=run;$('dnaUseCurrent').onclick=()=>{$('dnaInput').value=$('styleOutput')?.value||'';$('dnaInput').dispatchEvent(new Event('input'));run()};$('dnaClear').onclick=()=>{$('dnaInput').value='';$('dnaResult').classList.add('hidden');$('dnaConfidence').textContent='--%';$('dnaConfidenceBar').style.width='0%';$('dnaHeadline').textContent='Noch keine Song-DNA erkannt.';$('dnaQuickFacts').innerHTML='';$('dnaInputCount').textContent='0 Elemente';$('dnaStatus').textContent='Bereit für einen STYLE-Prompt.'};
 $('dnaCopySummary').onclick=async()=>{if(window.NSW_SONG_DNA_LAST){await copyText(summary(window.NSW_SONG_DNA_LAST));if(typeof showToast==='function')showToast('Song DNA summary copied.')}};$('dnaExportJson').onclick=()=>{const r=window.NSW_SONG_DNA_LAST;if(!r)return;const b=new Blob([JSON.stringify(r,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='song-dna-analysis.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)};$('dnaApplyBuilder').onclick=apply;
 $('dnaInput').addEventListener('input',()=>{$('dnaInputCount').textContent=split($('dnaInput').value).length+' Elemente'});$('dnaDepth').addEventListener('change',()=>{$('dnaInput').value.trim()&&run()});$('dnaPrimaryPreference').addEventListener('change',()=>{$('dnaInput').value.trim()&&run()});$('dnaIncludeUnknown').addEventListener('change',()=>{window.NSW_SONG_DNA_LAST&&render(window.NSW_SONG_DNA_LAST)})
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

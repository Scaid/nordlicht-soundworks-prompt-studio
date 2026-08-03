
(function(){
'use strict';
const $=id=>document.getElementById(id),K=window.NSW_AI_PRODUCER_KNOWLEDGE;let last=null;
const split=s=>String(s||'').split(/[,;\n]+/).map(x=>x.trim()).filter(Boolean);
const uniq=a=>{const seen=new Set();return a.filter(x=>{const k=x.toLowerCase();if(seen.has(k))return false;seen.add(k);return true})};
const pairs=[
 {a:/calm|gentle|relaxed|meditation/i,b:/constant high energy|explosive throughout|aggressive throughout/i,name:'Energy Conflict',why:'Quiet and permanently explosive directions cannot define the same moment.',section:['[Verse: calm, gentle, restrained]','[Chorus: explosive, aggressive, high energy]']},
 {a:/dry mix|no reverb/i,b:/cathedral|huge reverb|large hall/i,name:'Space Conflict',why:'Dry and very reverberant spaces compete unless assigned by section.',section:['[Verse: dry intimate mix]','[Final Chorus: large hall reverb]']},
 {a:/mono/i,b:/wide stereo|ultra wide/i,name:'Stereo Conflict',why:'Mono and wide stereo are mutually exclusive for the same section.',section:['[Intro: narrow mono texture]','[Chorus: wide stereo mix]']},
 {a:/instrumental only|pure instrumental/i,b:/vocal|voice|choir|spoken|rap/i,name:'Performance Conflict',why:'Instrumental-only contradicts requested vocal performers.',section:['[Intro: instrumental]','[Verse: lead vocal enters]']},
 {a:/lo-?fi/i,b:/aaa production|pristine|ultra polished/i,name:'Fidelity Conflict',why:'Lo-Fi degradation and pristine production need a defined hierarchy.',section:['[Verse: lo-fi texture]','[Chorus: polished modern production]']},
 {a:/whisper/i,b:/wall of sound|massive drums|constant heavy drums/i,name:'Vocal Density Conflict',why:'Whispers need space and lower density to remain understandable.',section:['[Verse: whispered close-mic vocal, sparse percussion]','[Chorus: full drums, powerful vocal]']},
 {a:/gregorian|monk chant/i,b:/trap hi-?hats|reggaeton/i,name:'Historical Rhythm Conflict',why:'The historical vocal identity and modern club rhythm need staged integration.',section:['[Intro: Gregorian choir, drone]','[Verse: modern rhythm enters gradually]']},
 {a:/minimal|sparse/i,b:/all instruments|maximum layers|wall of sound/i,name:'Density Conflict',why:'Minimal and maximal arrangement instructions cannot be simultaneous.',section:['[Verse: sparse arrangement]','[Final Chorus: maximum layers]']}
];
function resolve(){
 const input=$('crInput').value.trim();if(!input){$('crStatus').textContent='Add a STYLE or brief first.';return}
 let terms=uniq(split(input)),found=[];
 pairs.forEach(p=>{const aa=terms.filter(x=>p.a.test(x)),bb=terms.filter(x=>p.b.test(x));if(aa.length&&bb.length)found.push({...p,aTerms:aa,bTerms:bb})});
 (K?.conflictRules||[]).forEach(r=>{const aa=terms.filter(x=>r.a.some(q=>x.toLowerCase().includes(q))),bb=terms.filter(x=>r.b.some(q=>x.toLowerCase().includes(q)));if(aa.length&&bb.length&&!found.some(x=>x.why===r.message))found.push({name:'Knowledge Base Conflict',why:r.message,aTerms:aa,bTerms:bb,section:[`[Verse: ${aa[0]}]`,`[Chorus: ${bb[0]}]`]})});
 const genres=terms.filter(x=>/metal|rock|pop|rap|trap|drill|edm|techno|house|trance|jazz|swing|folk|cinematic|ambient|anime|viking|medieval/i.test(x));
 const maxG=+$('crGenres').value;if(genres.length>maxG)found.push({name:'Genre Overload',why:`${genres.length} genre signals exceed the selected limit of ${maxG}.`,aTerms:genres.slice(0,maxG),bTerms:genres.slice(maxG),section:['Keep primary genres globally','Use secondary influences only in selected sections']});
 const vocals=terms.filter(x=>/vocal|voice|choir|spoken|rap lead|growl|whisper|narrator/i.test(x));
 const maxV=+$('crVocals').value;if(vocals.length>maxV)found.push({name:'Vocal Overload',why:`${vocals.length} vocal roles may reduce clear performer separation.`,aTerms:vocals.slice(0,maxV),bTerms:vocals.slice(maxV),section:['Keep core performers','Reserve extra voices for bridge or finale']});
 const strategy=$('crStrategy').value,resolutions=[];
 found.forEach(f=>{
  if(strategy==='section')resolutions.push({conflict:f,resolution:f.section.join(' | ')});
  else if(strategy==='priority'){f.bTerms.forEach(x=>terms=terms.filter(t=>t!==x));resolutions.push({conflict:f,resolution:`Removed lower-priority terms: ${f.bTerms.join(', ')}`})}
  else if(strategy==='safe'){f.bTerms.forEach(x=>terms=terms.filter(t=>t!==x));resolutions.push({conflict:f,resolution:'Removed contradictory secondary direction for a concise Suno-safe prompt.'})}
  else resolutions.push({conflict:f,resolution:`Controlled contrast: ${f.aTerms[0]||''} in restrained sections, ${f.bTerms[0]||''} in payoff sections.`});
 });
 if(strategy==='section'||strategy==='creative'){const tags=found.flatMap(f=>f.section).filter(Boolean);terms=uniq([...terms,...tags])}
 const score=Math.max(45,Math.min(100,96-found.length*7-Math.max(0,genres.length-maxG)*3-Math.max(0,vocals.length-maxV)*4));
 last={input,output:terms.join(', '),conflicts:found,resolutions,score:Math.round(score),strategy,createdAt:Date.now()};window.NSW_CONFLICT_RESOLVER_LAST=JSON.parse(JSON.stringify(last));render()
}
function render(){$('crResults').classList.remove('hidden');$('crGrid').innerHTML=(last.resolutions.length?last.resolutions:[{conflict:{name:'No Major Conflict',why:'The prompt is internally coherent.',aTerms:[],bTerms:[]},resolution:'No repair required.'}]).map(x=>`<article class="cr-card"><h3>${x.conflict.name}</h3><p><b>Cause:</b> ${x.conflict.why}</p><p><b>Terms:</b> ${[...x.conflict.aTerms,...x.conflict.bTerms].join(', ')||'None'}</p><p><b>Resolution:</b> ${x.resolution}</p></article>`).join('');$('crOutput').value=last.output;$('crCount').textContent=`${last.conflicts.length} conflict(s)`;$('crScore').textContent=`Coherence ${last.score}/100`;$('crBadge').textContent=last.conflicts.length?'Resolved':'Clean';$('crStatus').textContent='Conflict analysis complete.';stats()}
function stats(){$('crStats').textContent=`${split($('crInput').value).length} terms`}
function apply(){const e=$('customStyle');if(!e||!last)return;e.value=last.output;e.dispatchEvent(new Event('input',{bubbles:true}));if(typeof generateOutput==='function')generateOutput();$('crStatus').textContent='Resolved STYLE applied.'}
function send(view,id,button){if(!last)return;window.NSWConnections?.navigate(view);setTimeout(()=>{const e=$(id);if(e){e.value=last.output;e.dispatchEvent(new Event('input',{bubbles:true}));$(button)?.click()}},60)}
function init(){if(!$('crResolve'))return;$('crInput').oninput=stats;$('crResolve').onclick=resolve;$('crImport').onclick=()=>{$('crInput').value=$('customStyle')?.value||'';stats();resolve()};$('crCopy').onclick=()=>navigator.clipboard?.writeText(last?.output||'');$('crApply').onclick=apply;$('crSendHealth').onclick=()=>send('styleHealthView','shInput','shAnalyze');$('crSendVariation').onclick=()=>send('variationEngineView','veInput','veGenerate');$('crSendProducer').onclick=()=>send('aiProducerView','aipBrief','aipProduce');$('crSaveProject').onclick=()=>{let p;try{p=JSON.parse(localStorage.getItem('nsw-project-manager-v4')||'null')}catch(e){}const pr=p?.projects?.find(x=>x.id===p.activeProjectId)||p?.projects?.[0],t=pr?.tracks?.[0];if(t&&last){t.conflictResolver=last;localStorage.setItem('nsw-project-manager-v4',JSON.stringify(p));$('crStatus').textContent='Conflict report saved.'}};stats()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

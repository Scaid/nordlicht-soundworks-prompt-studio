
(function(){
'use strict';
const $=id=>document.getElementById(id),K=window.NSW_AI_PRODUCER_KNOWLEDGE;let last=null;
const split=s=>String(s||'').split(/[,;\n]+/).map(x=>x.trim()).filter(Boolean);
const groups=[
 {name:'Genre',r:/metal|rock|pop|rap|hip.?hop|trap|drill|edm|electro|techno|house|trance|jazz|swing|folk|cinematic|orchestra|ambient|medieval|viking|anime|k-pop|country/i,p:1},
 {name:'Tempo',r:/\b\d{2,3}\s*bpm\b|fast|slow|mid.?tempo/i,p:2},
 {name:'Vocals',r:/vocal|voice|choir|spoken|rap lead|growl|whisper|narrator/i,p:3},
 {name:'Instruments',r:/guitar|piano|drum|bass|strings|synth|tagelharpa|nyckelharpa|lute|hurdy|shawm|taiko|violin|fiddle|flute|harp|brass|sax|trumpet|oud|koto|shamisen|duduk/i,p:4},
 {name:'Emotion',r:/dark|happy|sad|epic|intimate|mysterious|aggressive|calm|triumphant|melancholic|playful|romantic/i,p:5},
 {name:'Production',r:/production|mix|stereo|close.?mic|analog|modern|vintage|dynamic|contrast|finale|drop|hook|reverb|clear voice/i,p:6}
];
const synonymSets=[
 ['Epic','Huge','Massive','Powerful','Explosive'],
 ['Dark','Ominous','Threatening','Sinister'],
 ['Warm','Analog Warmth','Warm Analog Sound'],
 ['Wide Stereo','Wide Stereo Mix','Ultra Wide Stereo'],
 ['Cinematic Production','AAA Production','AAA Game Soundtrack Production'],
 ['Huge Cinematic Finale','Massive Finale','Explosive Finale']
];
function category(t){return groups.find(g=>g.r.test(t))||{name:'Other',p:9}}
function simplify(){
 const input=$('ssInput').value.trim();if(!input){$('ssStatus').textContent='Add a STYLE first.';return}
 const raw=split(input),removed=[],kept=[],seen=new Set();
 raw.forEach(t=>{const key=t.toLowerCase();if(seen.has(key)){removed.push({term:t,reason:'Duplicate'});return}seen.add(key);kept.push(t)});
 if($('ssSynonyms').value==='on'){
  synonymSets.forEach(set=>{
   const found=kept.filter(t=>set.some(s=>t.toLowerCase()===s.toLowerCase()||t.toLowerCase().includes(s.toLowerCase())));
   if(found.length>1){const preferred=found.sort((a,b)=>b.length-a.length)[0];found.filter(x=>x!==preferred).forEach(x=>{kept.splice(kept.indexOf(x),1);removed.push({term:x,reason:`Merged into ${preferred}`})})}
  });
 }
 const limits={short:18,balanced:28,detailed:40},limit=limits[$('ssLength').value];
 let ordered=[...kept];if($('ssOrder').value==='smart')ordered.sort((a,b)=>category(a).p-category(b).p);
 if(ordered.length>limit){ordered.slice(limit).forEach(x=>removed.push({term:x,reason:'Below selected priority limit'}));ordered=ordered.slice(0,limit)}
 const preserve=$('ssPreserve').value;
 if(preserve==='genre'){ordered.sort((a,b)=>(category(a).name==='Genre'?-1:0)-(category(b).name==='Genre'?-1:0))}
 if(preserve==='production'){ordered.sort((a,b)=>(category(a).name==='Production'?-1:0)-(category(b).name==='Production'?-1:0))}
 const dna={};ordered.forEach(x=>{const c=category(x).name;(dna[c]??=[]).push(x)});
 const score=Math.max(65,Math.min(100,100-Math.max(0,removed.filter(x=>x.reason.includes('priority')).length-8)*2));
 last={input,output:ordered.join(', '),raw,ordered,removed,dna,score,createdAt:Date.now()};window.NSW_STYLE_SIMPLIFIER_LAST=JSON.parse(JSON.stringify(last));render()
}
function render(){const r=last;$('ssResults').classList.remove('hidden');$('ssScore').textContent=r.score;$('ssGrade').textContent=r.score>=92?'A+':r.score>=84?'A':'B';$('ssScoreBar').style.width=r.score+'%';$('ssSummary').textContent=`Preserved ${r.ordered.length} high-priority terms and removed or merged ${r.removed.length}.`;$('ssMetrics').innerHTML=[['Original',r.raw.length],['Simplified',r.ordered.length],['Removed',r.removed.length],['Categories',Object.keys(r.dna).length]].map(x=>`<div class="aip-metric"><small>${x[0]}</small><b>${x[1]}</b></div>`).join('');$('ssDNA').innerHTML=Object.entries(r.dna).map(([k,v])=>`<div class="aip-list-item"><b>${k}</b><small>${v.join(', ')}</small></div>`).join('');$('ssRemoved').innerHTML=(r.removed.length?r.removed:[{term:'Nothing',reason:'No redundant terms found'}]).map(x=>`<div class="aip-list-item"><b>${x.term}</b><small>${x.reason}</small></div>`).join('');$('ssOutput').value=r.output;$('ssReduction').textContent=`${Math.round((1-r.output.length/r.input.length)*100)}% shorter`;$('ssBadge').textContent=`${r.raw.length} → ${r.ordered.length} terms`;stats()}
function stats(){$('ssStats').textContent=`${split($('ssInput').value).length} terms`}
function apply(){const e=$('customStyle');if(!e||!last)return;e.value=last.output;e.dispatchEvent(new Event('input',{bubbles:true}));if(typeof generateOutput==='function')generateOutput();$('ssStatus').textContent='Simplified STYLE applied.'}
function init(){if(!$('ssSimplify'))return;$('ssInput').oninput=stats;$('ssSimplify').onclick=simplify;$('ssImport').onclick=()=>{$('ssInput').value=$('customStyle')?.value||'';stats();simplify()};$('ssCopy').onclick=()=>navigator.clipboard?.writeText(last?.output||'');$('ssApply').onclick=apply;$('ssSendHealth').onclick=()=>{if(!last)return;window.NSWConnections?.navigate('styleHealthView');setTimeout(()=>{const e=$('shInput');if(e){e.value=last.output;e.dispatchEvent(new Event('input',{bubbles:true}));$('shAnalyze')?.click()}},60)};$('ssSendProducer').onclick=()=>{if(!last)return;window.NSWConnections?.navigate('aiProducerView');setTimeout(()=>{const e=$('aipBrief');if(e){e.value='Produce this simplified STYLE:\\n'+last.output;e.dispatchEvent(new Event('input',{bubbles:true}))}},60)};$('ssSaveProject').onclick=()=>{let p;try{p=JSON.parse(localStorage.getItem('nsw-project-manager-v4')||'null')}catch(e){}const pr=p?.projects?.find(x=>x.id===p.activeProjectId)||p?.projects?.[0],t=pr?.tracks?.[0];if(t&&last){t.styleSimplifier=last;localStorage.setItem('nsw-project-manager-v4',JSON.stringify(p));$('ssStatus').textContent='Simplifier result saved.'}};stats()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

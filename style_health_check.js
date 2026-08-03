
(function(){
'use strict';
const $=id=>document.getElementById(id),K=window.NSW_AI_PRODUCER_KNOWLEDGE;
let last=null;
const norm=s=>String(s||'').trim(),terms=s=>norm(s).split(/[,;\n]+/).map(x=>x.trim()).filter(Boolean);
const uniq=a=>{const seen=new Set();return a.filter(x=>{const k=x.toLowerCase();if(seen.has(k))return false;seen.add(k);return true})};
const instrumentNames=()=>window.NSW_WORLD_MUSIC_DATA?.instruments?.map(x=>x.name.toLowerCase())||[];
function analyze(){
 const input=$('shInput').value.trim();if(!input){$('shStatus').textContent='Add a STYLE first.';return}
 const raw=terms(input),unique=uniq(raw),lower=input.toLowerCase(),issues=[],strengths=[];
 const duplicates=raw.length-unique.length;if(duplicates)issues.push({type:'warn',text:`${duplicates} repeated or equivalent term(s) increase prompt density.`});
 const inst=unique.filter(x=>instrumentNames().some(n=>x.toLowerCase().includes(n)));
 const max=+$('shMaxInst').value;if(inst.length>max)issues.push({type:'warn',text:`${inst.length} named instruments exceed the selected core limit of ${max}.`});else if(inst.length)strengths.push(`Focused instrument palette with ${inst.length} recognized instrument(s).`);
 const genreHits=K?.genreProfiles?.filter(p=>p.patterns.some(q=>lower.includes(q.toLowerCase())))||[];
 if(genreHits.length>3)issues.push({type:'warn',text:`${genreHits.length} genre profiles compete for priority.`});else if(genreHits.length)strengths.push(`${genreHits.length} clear genre signal(s) detected.`);
 const conflicts=[];
 (K?.conflictRules||[]).forEach(r=>{if(r.a.some(x=>lower.includes(x))&&r.b.some(x=>lower.includes(x)))conflicts.push(r.message)});
 conflicts.forEach(x=>issues.push({type:'warn',text:x}));
 const hype=['epic','massive','huge','powerful','explosive','gigantic','enormous'];
 const hypeCount=hype.reduce((n,x)=>n+raw.filter(t=>t.toLowerCase().includes(x)).length,0);
 if(hypeCount>4)issues.push({type:'warn',text:'Several intensity synonyms compete; two precise dynamic terms are usually enough.'});
 const vocals=raw.filter(x=>/vocal|voice|choir|spoken|rap|growl|whisper/i.test(x));
 if(vocals.length>4)issues.push({type:'warn',text:`${vocals.length} vocal directions may reduce clear role separation.`});else if(vocals.length)strengths.push('Vocal direction is present and reasonably focused.');
 if(raw.length>45)issues.push({type:'warn',text:`The STYLE contains ${raw.length} terms and may be clipped or partially ignored.`});else strengths.push(`Prompt length is manageable at ${raw.length} terms.`);
 if(/clear voice separation/i.test(input))strengths.push('Clear Voice Separation supports multiple performers.');
 if(/section-specific|controlled contrast/i.test(input))strengths.push('Section-aware dynamics improve complex prompts.');
 let repaired=unique.filter((x,i,a)=>{
   const l=x.toLowerCase();
   if(i>=45)return false;
   if(hype.some(h=>l===h)&&a.some(y=>/epic cinematic production|massive final|huge cinematic finale/i.test(y)))return false;
   return true;
 });
 if(inst.length>max){let kept=0;repaired=repaired.filter(x=>{const is=instrumentNames().some(n=>x.toLowerCase().includes(n));if(!is)return true;kept++;return kept<=max})}
 if(vocals.length>4){let kept=0;repaired=repaired.filter(x=>{const is=/vocal|voice|choir|spoken|rap|growl|whisper/i.test(x);if(!is)return true;kept++;return kept<=4})}
 const strict=$('shStrict').value;if(strict==='safe'&&repaired.length>32)repaired=repaired.slice(0,32);if(strict==='strict'&&repaired.length>26)repaired=repaired.slice(0,26);
 const score=Math.max(30,Math.min(100,96-duplicates*3-Math.max(0,inst.length-max)*4-conflicts.length*10-Math.max(0,genreHits.length-3)*5-Math.max(0,raw.length-38)*1.2-Math.max(0,hypeCount-4)*3-Math.max(0,vocals.length-4)*5));
 last={input,terms:raw,unique,repaired:repaired.join(', '),issues,strengths,score:Math.round(score),metrics:{terms:raw.length,unique:unique.length,instruments:inst.length,genres:genreHits.length,vocals:vocals.length,conflicts:conflicts.length},createdAt:Date.now()};
 window.NSW_STYLE_HEALTH_LAST=JSON.parse(JSON.stringify(last));render()
}
function render(){const r=last;$('shResults').classList.remove('hidden');$('shScore').textContent=r.score;$('shGrade').textContent=r.score>=90?'A+':r.score>=82?'A':r.score>=72?'B':r.score>=60?'C':'D';$('shScoreBar').style.width=r.score+'%';$('shSummary').textContent=r.score>=85?'The STYLE is focused and should be easy for Suno to interpret.':r.score>=70?'The STYLE is usable but benefits from a few repairs.':'The STYLE is overloaded or contradictory and should be simplified.';$('shMetrics').innerHTML=Object.entries(r.metrics).map(([k,v])=>`<div class="aip-metric"><small>${k}</small><b>${v}</b></div>`).join('');$('shIssues').innerHTML=(r.issues.length?r.issues:[{type:'info',text:'No significant issues detected.'}]).map(x=>`<div class="aip-message ${x.type}">${x.text}</div>`).join('');$('shStrengths').innerHTML=(r.strengths.length?r.strengths:['A clear base prompt is present.']).map(x=>`<div class="aip-message info">${x}</div>`).join('');$('shOutput').value=r.repaired;const red=Math.max(0,Math.round((1-r.repaired.length/r.input.length)*100));$('shReduction').textContent=`${red}% shorter`;$('shRisk').textContent=r.issues.length?`${r.issues.length} issue(s)`:'No major risk';$('shBadge').textContent=`Health ${r.score}/100`;stats()}
function stats(){const a=terms($('shInput').value);$('shStats').textContent=`${a.length} terms`}
function apply(){const e=$('customStyle');if(!e||!last)return;e.value=last.repaired;e.dispatchEvent(new Event('input',{bubbles:true}));if(typeof generateOutput==='function')generateOutput();$('shStatus').textContent='Repaired STYLE applied.'}
function init(){if(!$('shAnalyze'))return;$('shInput').oninput=()=>{stats();if($('shLive').value==='on')analyze()};$('shAnalyze').onclick=analyze;$('shImport').onclick=()=>{$('shInput').value=$('customStyle')?.value||'';stats();analyze()};$('shRepair').onclick=analyze;$('shCopy').onclick=()=>navigator.clipboard?.writeText(last?.repaired||'');$('shApply').onclick=apply;$('shSendProducer').onclick=()=>{if(!last)return;window.NSWConnections?.navigate('aiProducerView');setTimeout(()=>{const e=$('aipBrief');if(e){e.value=`Analyze and produce this STYLE:\n${last.repaired}`;e.dispatchEvent(new Event('input',{bubbles:true}))}},60)};$('shSaveProject').onclick=()=>{let p;try{p=JSON.parse(localStorage.getItem('nsw-project-manager-v4')||'null')}catch(e){}const pr=p?.projects?.find(x=>x.id===p.activeProjectId)||p?.projects?.[0],t=pr?.tracks?.[0];if(t&&last){t.styleHealth=last;localStorage.setItem('nsw-project-manager-v4',JSON.stringify(p));$('shStatus').textContent='Health report saved.'}};stats()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

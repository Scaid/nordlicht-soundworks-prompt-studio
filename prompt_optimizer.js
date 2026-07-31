(function(){
'use strict';
const $=id=>document.getElementById(id);
const norm=s=>String(s||'').trim().replace(/\s+/g,' ');
const low=s=>norm(s).toLowerCase();
const uniq=a=>{const seen=new Set();return a.filter(x=>{const k=low(x);if(!k||seen.has(k))return false;seen.add(k);return true})};
const splitPrompt=s=>String(s||'').split(/[,;\n]+/).map(norm).filter(Boolean);
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const GENRE_WORDS=['rock','metal','metalcore','deathcore','pop','k-pop','kpop','j-pop','jpop','jazz','swing','electro swing','folk','viking','nordic','rap','hip-hop','hip hop','trap','drill','phonk','edm','electronic','techno','house','trance','dubstep','drum & bass','drum and bass','dnb','synthwave','cinematic','orchestral','classical','country','reggae','ambient','lo-fi','lofi','ballad','blues','funk','soul','r&b','punk','hardstyle'];
const VOCAL_WORDS=['vocal','voice','singer','choir','chorus','rap','spoken','narrator','growl','scream','whisper','falsetto','soprano','alto','tenor','baritone','duet','male','female'];
const PROD_WORDS=['production','mix','master','stereo','mono','reverb','delay','compression','sidechain','saturation','tape','vinyl','polished','studio quality','radio-ready','dynamic mix','wide mix','cinematic production','high fidelity','lo-fi production'];
const THEORY_WORDS=['major','minor','modal','chord','harmony','melody','arpeggio','syncop','swing feel','shuffle','half-time','double-time','groove','rhythm','crescendo','build','dynamic contrast','key change'];
const MOOD_WORDS=['dark','sad','emotional','happy','hopeful','heroic','aggressive','dreamy','romantic','melancholic','playful','mysterious','triumphant','intimate','epic','nostalgic','warm','cold'];
const INSTRUMENT_WORDS=['piano','guitar','bass','drum','strings','violin','cello','sax','trumpet','trombone','clarinet','flute','synth','orchestra','brass','choir','tagelharpa','nyckelharpa','duduk','oud','shamisen','koto','taiko','harp','organ','accordion','banjo','mandolin','ukulele','horn','percussion'];
const LANG_WORDS=['english lyrics','german lyrics','deutsche lyrics','french lyrics','spanish lyrics','japanese lyrics','korean lyrics','portuguese lyrics','language:'];
const CONTRADICTIONS=[
 {a:['instrumental only','pure instrumental'],b:VOCAL_WORDS,label:'Instrumental mode conflicts with vocal instructions.'},
 {a:['mono mix','mono'],b:['wide stereo','wide mix','stereo width'],label:'Mono and wide-stereo instructions conflict.'},
 {a:['dry vocal','dry mix','no reverb'],b:['heavy reverb','hall reverb','large reverb'],label:'Dry and heavy-reverb instructions conflict.'},
 {a:['very slow','slow tempo','adagio'],b:['very fast','extreme tempo','presto'],label:'Slow and very fast tempo instructions conflict.'},
 {a:['major key'],b:['minor key'],label:'Major and minor key are both requested.'},
 {a:['minimal arrangement','sparse arrangement'],b:['wall of sound','dense arrangement','massive arrangement'],label:'Sparse and extremely dense arrangement instructions conflict.'}
];
const UI={
 de:{ready:'Bereit für einen Style-Prompt.',empty:'Füge zuerst einen Style-Prompt ein.',analyzed:'Analyse abgeschlossen.',copied:'Optimierter Prompt kopiert.',applied:'Optimierter Prompt wurde als Custom Style übernommen.',noIssues:'Keine kritischen Probleme erkannt.',issues:'Probleme',suggestions:'Verbesserungen',strengths:'Stärken'},
 en:{ready:'Ready for a style prompt.',empty:'Paste a style prompt first.',analyzed:'Analysis complete.',copied:'Optimized prompt copied.',applied:'Optimized prompt added as Custom Style.',noIssues:'No critical issues detected.',issues:'Issues',suggestions:'Improvements',strengths:'Strengths'}
};
function lang(){return String(document.documentElement.lang||'en').toLowerCase().startsWith('de')?'de':'en'}
function t(k){return UI[lang()][k]||UI.en[k]||k}
function containsAny(item,words){const s=low(item);return words.some(w=>s.includes(w))}
function classify(items){
 const out={genres:[],vocals:[],instruments:[],production:[],theory:[],mood:[],other:[]};
 items.forEach(x=>{
  if(containsAny(x,GENRE_WORDS))out.genres.push(x);
  else if(containsAny(x,PROD_WORDS))out.production.push(x);
  else if(containsAny(x,VOCAL_WORDS))out.vocals.push(x);
  else if(containsAny(x,INSTRUMENT_WORDS))out.instruments.push(x);
  else if(containsAny(x,THEORY_WORDS))out.theory.push(x);
  else if(containsAny(x,MOOD_WORDS))out.mood.push(x);
  else out.other.push(x);
 });
 return out;
}
function findDuplicates(items){
 const map=new Map();items.forEach((x,i)=>{const k=low(x);if(!map.has(k))map.set(k,[]);map.get(k).push(i)});
 return [...map.entries()].filter(([,idx])=>idx.length>1).map(([name,idx])=>({name,count:idx.length}));
}
function conflicts(items){
 const text=low(items.join(', '));return CONTRADICTIONS.filter(r=>r.a.some(a=>text.includes(a))&&r.b.some(b=>text.includes(b))).map(r=>r.label);
}
function removeLanguage(items){return items.filter(x=>!containsAny(x,LANG_WORDS))}
function removeNumericBlend(items){return items.filter(x=>!/(genre\s*blend\s*\d+\s*\/\s*\d+|\b\w+\s*:\s*\w+\s*:\s*0?[.,]\d+)/i.test(x))}
function optimizeItems(items,mode){
 let out=uniq(removeNumericBlend(removeLanguage(items)));
 // Normalize common labels without inventing new creative content.
 out=out.map(x=>x.replace(/\s*:\s*/g,': ').replace(/\bhigh quality\b/ig,'High Fidelity').replace(/\bstudio quality\b/ig,'Studio Quality Production'));
 if(mode!=='safe'){
  const c=classify(out);
  if(!c.production.length)out.push('Dynamic Mix','Clean and Polished Production');
  if(!c.theory.length)out.push('Strong Dynamic Contrast');
  if(!c.mood.length&&mode==='creative')out.push('Emotional Lift');
  if(c.genres.length>3){const keep=new Set(c.genres.slice(0,3).map(low));out=out.filter(x=>!containsAny(x,GENRE_WORDS)||keep.has(low(x)));}
  if(c.instruments.length>8){const keep=new Set(c.instruments.slice(0,8).map(low));out=out.filter(x=>!containsAny(x,INSTRUMENT_WORDS)||keep.has(low(x)));}
 }
 // Resolve hard contradictions conservatively: first explicit instruction wins.
 const text=low(out.join(', '));
 if(text.includes('instrumental only')||text.includes('pure instrumental'))out=out.filter(x=>!containsAny(x,VOCAL_WORDS)||/instrumental/i.test(x));
 if(out.some(x=>/mono mix|^mono$/i.test(x)))out=out.filter(x=>!/wide stereo|wide mix|stereo width/i.test(x));
 if(out.some(x=>/dry vocal|dry mix|no reverb/i.test(x)))out=out.filter(x=>!/heavy reverb|hall reverb|large reverb/i.test(x));
 return uniq(out);
}
function analyzePrompt(text){
 const raw=splitPrompt(text),unique=uniq(raw),groups=classify(unique),dups=findDuplicates(raw),conf=conflicts(unique),issues=[],suggestions=[],strengths=[];
 if(dups.length)issues.push(`${dups.length} duplicated instruction${dups.length===1?'':'s'} detected.`);
 issues.push(...conf);
 if(raw.length>32)issues.push('The prompt is overloaded with more than 32 separate instructions.');
 if(groups.genres.length>3)issues.push('More than three genre instructions may weaken the main direction.');
 if(groups.instruments.length>8)issues.push('More than eight instruments may reduce instrument clarity.');
 if(!groups.genres.length)suggestions.push('Add one clear primary genre.');else strengths.push('A recognizable genre direction is present.');
 if(!groups.production.length)suggestions.push('Add one or two production or mix instructions.');else strengths.push('Production or mix guidance is included.');
 if(!groups.vocals.length&&!/instrumental/i.test(text))suggestions.push('Specify a lead vocal character or mark the track as instrumental.');else strengths.push('The vocal or instrumental direction is defined.');
 if(!groups.theory.length)suggestions.push('Add groove, dynamics or arrangement movement.');else strengths.push('Rhythm, harmony or dynamics guidance is present.');
 if(!groups.mood.length)suggestions.push('Add a clear mood or emotional direction.');else strengths.push('A mood or emotional direction is present.');
 if(raw.some(x=>containsAny(x,LANG_WORDS)))suggestions.push('The lyrics already define the language; remove language instructions from STYLE unless specifically needed.');
 if(raw.some(x=>/(genre\s*blend\s*\d+\/\d+|:\s*0?[.,]\d+)/i.test(x)))suggestions.push('Replace numeric genre weighting with natural language influence phrasing.');
 const clarity=clamp(100-dups.length*8-conf.length*18-Math.max(0,raw.length-25)*2,20,100);
 const focus=clamp(100-Math.max(0,groups.genres.length-2)*12-Math.max(0,groups.instruments.length-6)*4,25,100);
 const completeness=clamp(30+(groups.genres.length?18:0)+(groups.vocals.length||/instrumental/i.test(text)?14:0)+(groups.production.length?14:0)+(groups.theory.length?12:0)+(groups.mood.length?12:0)+(groups.instruments.length?10:0),20,100);
 const compatibility=clamp(100-conf.length*25-Math.max(0,groups.genres.length-3)*10,15,100);
 const concision=clamp(100-Math.max(0,raw.length-22)*3,25,100);
 const overall=Math.round((clarity*.23+focus*.2+completeness*.22+compatibility*.23+concision*.12));
 return{raw,unique,groups,dups,conf,issues,suggestions,strengths,scores:{clarity,focus,completeness,compatibility,concision,overall}};
}
function scoreLabel(n){return n>=90?'Excellent':n>=80?'Very good':n>=70?'Good':n>=55?'Experimental':'Needs work'}
function renderList(id,items,empty){const host=$(id);if(!host)return;host.innerHTML=items.length?items.map(x=>`<li>${x}</li>`).join(''):`<li class="optimizer-muted">${empty}</li>`}
function renderScores(scores){
 const host=$('optimizerScoreGrid');if(!host)return;
 const fields=[['Overall',scores.overall],['Clarity',scores.clarity],['Focus',scores.focus],['Completeness',scores.completeness],['Compatibility',scores.compatibility],['Concision',scores.concision]];
 host.innerHTML=fields.map(([name,val])=>`<div class="optimizer-score-card"><span>${name}</span><strong>${val}</strong><div><i style="width:${val}%"></i></div><small>${scoreLabel(val)}</small></div>`).join('');
 $('optimizerOverall').textContent=scores.overall+'%';
}
function renderBreakdown(groups){
 const labels={genres:'Genres',vocals:'Vocals',instruments:'Instruments',production:'Production',theory:'Music Theory',mood:'Mood',other:'Other'};
 $('optimizerBreakdown').innerHTML=Object.entries(groups).map(([k,v])=>`<div class="optimizer-break-row"><b>${labels[k]}</b><span>${v.length?v.join(' · '):'—'}</span><em>${v.length}</em></div>`).join('');
}
function analyze(){
 const text=$('optimizerStudioInput').value.trim();if(!text){$('optimizerStudioStatus').textContent=t('empty');return}
 const result=analyzePrompt(text);window.NSW_PROMPT_OPTIMIZER_LAST=result;
 renderScores(result.scores);renderBreakdown(result.groups);
 renderList('optimizerIssues',result.issues,t('noIssues'));renderList('optimizerSuggestions',result.suggestions,'No additional suggestions.');renderList('optimizerStrengths',result.strengths,'No strengths detected yet.');
 const mode=$('optimizerMode').value;const optimized=optimizeItems(result.raw,mode);$('optimizerStudioOutput').value=optimized.join(', ');
 $('optimizerStudioStatus').textContent=`${t('analyzed')} ${result.raw.length} items · ${result.dups.length} duplicates · ${result.conf.length} conflicts.`;
 $('optimizerResultPanel').classList.remove('hidden');
}
function useCurrent(){const source=$('styleOutput');$('optimizerStudioInput').value=source?source.value:'';analyze()}
async function copy(){const val=$('optimizerStudioOutput').value;if(!val)return;try{await navigator.clipboard.writeText(val)}catch(e){$('optimizerStudioOutput').select();document.execCommand('copy')}if(typeof showToast==='function')showToast(t('copied'))}
function applyCustom(){const val=$('optimizerStudioOutput').value;if(!val)return;if($('optimizerReplaceCustom').checked&&$('customStyle'))$('customStyle').value=val;else if($('customStyle'))$('customStyle').value=uniq(splitPrompt(($('customStyle').value||'')+', '+val)).join(', ');if(typeof generateOutput==='function')generateOutput();if(typeof showToast==='function')showToast(t('applied'))}
function clearAll(){$('optimizerStudioInput').value='';$('optimizerStudioOutput').value='';$('optimizerResultPanel').classList.add('hidden');$('optimizerStudioStatus').textContent=t('ready');$('optimizerOverall').textContent='--%'}
function init(){
 if(!$('optimizerAnalyze'))return;
 $('optimizerAnalyze').onclick=analyze;$('optimizerUseCurrent').onclick=useCurrent;$('optimizerCopy').onclick=copy;$('optimizerApplyCustom').onclick=applyCustom;$('optimizerClear').onclick=clearAll;
 $('optimizerMode').onchange=()=>{if($('optimizerStudioInput').value.trim())analyze()};
 $('optimizerStudioInput').addEventListener('input',()=>{$('optimizerInputCount').textContent=splitPrompt($('optimizerStudioInput').value).length+' items'});
 document.addEventListener('languagechange',()=>{$('optimizerStudioStatus').textContent=t('ready')});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

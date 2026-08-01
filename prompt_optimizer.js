
(function(){
'use strict';
const $=id=>document.getElementById(id),norm=s=>String(s||'').trim().replace(/\s+/g,' '),low=s=>norm(s).toLowerCase(),clamp=(n,a=0,b=100)=>Math.max(a,Math.min(b,n));
const uniq=a=>{const seen=new Set();return a.filter(x=>{const k=low(x);if(!k||seen.has(k))return false;seen.add(k);return true})};
const split=s=>String(s||'').split(/[,;\n]+/).map(norm).filter(Boolean);
const WORDS={
 genre:['rock','metal','metalcore','deathcore','pop','k-pop','j-pop','jazz','swing','electro swing','folk','viking','nordic','rap','hip-hop','trap','drill','phonk','edm','electronic','techno','house','trance','dubstep','drum & bass','dnb','synthwave','cinematic','orchestral','classical','country','reggae','ambient','lo-fi','ballad','blues','funk','soul','r&b','punk','hardstyle'],
 vocal:['vocal','voice','singer','choir','rap vocal','spoken','narrator','growl','scream','whisper','falsetto','soprano','alto','tenor','baritone','duet','male lead','female lead'],
 instrument:['piano','guitar','bass','drum','strings','violin','cello','sax','trumpet','trombone','clarinet','flute','synth','orchestra','brass','tagelharpa','nyckelharpa','duduk','oud','shamisen','koto','taiko','harp','organ','accordion','banjo','mandolin','horn','percussion'],
 production:['production','mix','master','stereo','mono','reverb','delay','compression','sidechain','saturation','tape','vinyl','polished','studio quality','radio-ready','dynamic mix','wide mix','cinematic production','high fidelity','low end','transient'],
 theory:['major','minor','modal','chord','harmony','melody','arpeggio','syncop','swing feel','shuffle','half-time','double-time','groove','rhythm','crescendo','build','dynamic contrast','key change','bpm','time signature'],
 mood:['dark','sad','emotional','happy','hopeful','heroic','aggressive','dreamy','romantic','melancholic','playful','mysterious','triumphant','intimate','epic','nostalgic','warm','cold','sacred','mythic']
};
const LANGUAGE=['english lyrics','german lyrics','deutsche lyrics','french lyrics','spanish lyrics','japanese lyrics','korean lyrics','portuguese lyrics','language:'];
const CONFLICTS=[
 {a:['instrumental only','pure instrumental'],b:['vocal','voice','choir','singer','rap vocal','spoken'],label:'Instrumental-only direction conflicts with vocal instructions.'},
 {a:['mono mix','vintage mono'],b:['wide stereo','wide mix','expansive width'],label:'Mono and wide-stereo directions conflict.'},
 {a:['dry mix','dry vocal','no reverb'],b:['heavy reverb','large hall reverb','long atmospheric reverb'],label:'Dry and heavy-reverb directions conflict.'},
 {a:['major key','major scale'],b:['minor key','natural minor','harmonic minor'],label:'Major and minor tonal directions are both presented as primary.'},
 {a:['slow tempo','very slow'],b:['very fast','extreme tempo'],label:'Slow and very-fast tempo directions conflict.'},
 {a:['soft rounded transients'],b:['sharp modern attack','punchy transients'],label:'Soft and sharp transient directions conflict.'},
 {a:['lo-fi','lofi','lo-fi dust'],b:['high fidelity','ultra-clean','clean digital'],label:'Lo-fi and ultra-clean production directions conflict.'}
];
const COMPLEMENTS={
 genre:['Clear genre direction'],vocal:['Defined vocal role'],instrument:['Focused instrument palette'],production:['Mix or production guidance'],theory:['Rhythm or musical movement'],mood:['Emotional direction']
};
const GOAL_ADD={
 clarity:['Clear Musical Focus'],compatibility:['Balanced Genre Fusion'],brevity:[],detail:['Controlled Dynamic Contrast','Clear Vocal Presence'],genre:['Primary Genre Emphasis'],production:['Coherent Production Chain']
};
let timer=null,history=[],last=null;
function classify(item){for(const [k,a] of Object.entries(WORDS))if(a.some(w=>low(item).includes(w)))return k;if(/\b\d{2,3}\s*bpm\b/i.test(item))return'theory';return'other'}
function genreCount(items){return items.filter(x=>classify(x)==='genre').length}
function repeated(items){const map=new Map();items.forEach(x=>map.set(low(x),(map.get(low(x))||0)+1));return[...map.entries()].filter(([,n])=>n>1)}
function conflicts(items){const j=low(items.join(', ')),out=[];CONFLICTS.forEach(c=>{if(c.a.some(x=>j.includes(x))&&c.b.some(x=>j.includes(x)))out.push(c.label)});return out}
function numericWeights(items){return items.filter(x=>/(?:genre blend\s*)?\d+\s*\/\s*\d+|:\s*0[.,]\s*\d/i.test(x))}
function languageTerms(items){return items.filter(x=>LANGUAGE.some(w=>low(x).includes(w)))}
function detect(items){
 const groups={genre:[],vocal:[],instrument:[],production:[],theory:[],mood:[],other:[]};
 items.forEach(x=>groups[classify(x)].push(x));return groups
}
function targetGenre(){const chosen=$('optimizerTargetGenre').value;if(chosen!=='auto')return chosen;return $('subgenre')?.value||$('genreFamily')?.value||$('mainGenre')?.value||''}
function score(items){
 const groups=detect(items),dup=repeated(items),con=conflicts(items),weights=numericWeights(items),langs=languageTerms(items);
 const genreN=groups.genre.length,instrN=groups.instrument.length,total=items.length;
 const clarity=clamp(100-dup.length*8-con.length*15-Math.max(0,total-18)*3-Math.max(0,genreN-3)*7);
 const focus=clamp(100-Math.max(0,genreN-2)*13-Math.max(0,instrN-7)*6-Math.max(0,total-22)*3);
 const completeness=clamp(25+Object.keys(COMPLEMENTS).filter(k=>groups[k].length).length*12.5);
 const compatibility=clamp(100-con.length*20-weights.length*8-langs.length*5);
 const brevity=clamp(100-Math.max(0,total-15)*4-Math.max(0,String(items.join(', ')).length-500)/15);
 const overall=Math.round((clarity+focus+completeness+compatibility+brevity)/5);
 return{clarity:Math.round(clarity),focus:Math.round(focus),completeness:Math.round(completeness),compatibility:Math.round(compatibility),brevity:Math.round(brevity),overall,groups,dup,con,weights,langs}
}
function chooseCore(items,groups){
 const protectedCore=[];if(groups.genre.length)protectedCore.push(groups.genre[0]);if(groups.vocal.length)protectedCore.push(groups.vocal[0]);if(groups.instrument.length)protectedCore.push(...groups.instrument.slice(0,2));if(groups.mood.length)protectedCore.push(groups.mood[0]);return protectedCore
}
function optimize(items,analysis){
 const mode=$('optimizerMode').value,goal=$('optimizerGoal').value,length=$('optimizerLength').value,safe=$('optimizerSunoSafe').checked,protect=$('optimizerProtectCore').checked;
 let out=uniq(items).filter(x=>!analysis.langs.includes(x));
 if(safe)out=out.filter(x=>!analysis.weights.includes(x));
 const core=chooseCore(items,analysis.groups);
 // Resolve direct conflicts by keeping the first matching direction.
 CONFLICTS.forEach(c=>{const aIdx=out.findIndex(x=>c.a.some(w=>low(x).includes(w))),bIdx=out.findIndex(x=>c.b.some(w=>low(x).includes(w)));if(aIdx>=0&&bIdx>=0){const remove=Math.max(aIdx,bIdx);if(!protect||!core.includes(out[remove]))out.splice(remove,1)}});
 // Focus limits.
 const limits={compact:{genre:2,vocal:2,instrument:4,production:4,theory:3,mood:3,other:2},standard:{genre:3,vocal:3,instrument:6,production:6,theory:5,mood:4,other:3},detailed:{genre:4,vocal:4,instrument:8,production:8,theory:7,mood:6,other:5}}[length];
 if(mode==='focused'){limits.genre=2;limits.instrument=4;limits.production=4;limits.other=1}
 const seen={};out=out.filter(x=>{const k=classify(x);seen[k]=(seen[k]||0)+1;return seen[k]<=limits[k]});
 const g=detect(out);
 if(mode!=='clean'){
  if(!g.genre.length&&targetGenre())out.unshift(targetGenre());
  if(!g.production.length&&(mode==='balanced'||mode==='creative'))out.push('Dynamic Mix');
  if(!g.mood.length&&mode==='creative')out.push('Strong Emotional Direction');
  if(!g.theory.length&&mode==='creative')out.push('Controlled Dynamic Build');
  if(GOAL_ADD[goal]?.length)GOAL_ADD[goal].forEach(x=>{if(mode==='creative'||goal==='production'||goal==='genre')out.push(x)});
 }
 if(goal==='brevity')out=out.slice(0,length==='compact'?10:14);
 if(goal==='genre'){const gg=detect(out);out=[...gg.genre,...gg.mood,...gg.vocal,...gg.instrument,...gg.production,...gg.theory,...gg.other]}
 if(goal==='production'){const gg=detect(out);out=[...gg.genre,...gg.vocal,...gg.instrument,...gg.production,...gg.theory,...gg.mood,...gg.other]}
 return uniq(out)
}
function issues(a,items){const out=[];if(a.dup.length)out.push(`${a.dup.length} duplicate term group${a.dup.length===1?'':'s'} detected.`);out.push(...a.con);if(a.weights.length)out.push('Numeric genre weighting may not be interpreted consistently by Suno.');if(a.langs.length)out.push('Lyrics language usually belongs outside the STYLE prompt.');if(a.groups.genre.length>3)out.push('Too many genre signals may reduce focus.');if(a.groups.instrument.length>8)out.push('The instrument palette is dense.');if(items.length>22)out.push('The prompt is long and may contain low-priority details.');return out}
function suggestions(a,items){const out=[];if(!a.groups.genre.length)out.push('Add one clear primary genre.');if(!a.groups.vocal.length)out.push('Define vocals or explicitly request Instrumental Only.');if(!a.groups.production.length)out.push('Add one production or mix direction.');if(!a.groups.mood.length)out.push('Add one emotional direction.');if(a.groups.genre.length>2)out.push('Keep one primary genre and one supporting influence.');if(a.groups.instrument.length>6)out.push('Keep the most important four to six instruments.');if(!a.groups.theory.length)out.push('A groove, BPM or dynamic arc can improve movement.');return out}
function strengths(a){return Object.entries(COMPLEMENTS).filter(([k])=>a.groups[k].length).map(([k,v])=>v)}
function chip(x,type){return`<span class="optimizer2-chip ${type}">${escapeHtml(x)}</span>`}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function renderList(id,a,empty){$(id).innerHTML=a.length?a.map(x=>`<li>${escapeHtml(x)}</li>`).join(''):`<li class="dna-empty">${empty}</li>`}
function compare(original,optimized){
 const oSet=new Set(original.map(low)),nSet=new Set(optimized.map(low));
 $('optimizerOriginalTokens').innerHTML=original.map(x=>`<span class="optimizer2-token ${nSet.has(low(x))?'kept':'removed'}">${escapeHtml(x)}</span>`).join('');
 $('optimizerOptimizedTokens').innerHTML=optimized.map(x=>`<span class="optimizer2-token ${oSet.has(low(x))?'kept':'added'}">${escapeHtml(x)}</span>`).join('');
 const changes=original.filter(x=>!nSet.has(low(x))).length+optimized.filter(x=>!oSet.has(low(x))).length;$('optimizerChangeCount').textContent=`${changes} change${changes===1?'':'s'}`
}
function render(inputItems,optimized,a,outA){
 last={inputItems,optimized,analysis:a,outputAnalysis:outA};
 $('optimizerResultPanel').classList.remove('hidden');$('optimizerOverall').textContent=a.overall;$('optimizerOverallBar').style.width=a.overall+'%';$('optimizerHeadline').textContent=a.overall>=85?'Strong, focused prompt':a.overall>=70?'Good prompt with minor improvements':a.overall>=55?'Usable but unfocused':'Needs cleanup and clearer direction';
 const scores=[['Clarity',a.clarity],['Focus',a.focus],['Completeness',a.completeness],['Compatibility',a.compatibility],['Brevity',a.brevity],['Optimized',outA.overall]];$('optimizerScoreGrid').innerHTML=scores.map(([x,y])=>`<div class="optimizer2-score"><small>${x}</small><b>${y}</b></div>`).join('');
 const iss=issues(a,inputItems),sug=suggestions(a,inputItems),str=strengths(a);$('optimizerQuickWarnings').innerHTML=iss.slice(0,3).map(x=>`<div class="optimizer2-quick-warning">${escapeHtml(x)}</div>`).join('');
 $('optimizerBreakdown').innerHTML=Object.entries(a.groups).flatMap(([k,v])=>v.map(x=>chip(x,k))).join('')||'<span class="dna-empty">No musical DNA detected.</span>';renderList('optimizerIssues',iss,'No major issues detected.');renderList('optimizerSuggestions',sug,'No essential additions suggested.');renderList('optimizerStrengths',str,'No clear strengths detected yet.');
 $('optimizerStudioOutput').value=optimized.join(', ');$('optimizerOutputCount').textContent=`${optimized.length} items`;compare(inputItems,optimized);$('optimizerStudioStatus').textContent=`Optimization complete · ${a.overall} → ${outA.overall}`;$('optimizerLiveStatus').textContent=`Live score ${a.overall}`;
}
function run(push=true){
 const text=$('optimizerStudioInput').value.trim();if(!text){$('optimizerStudioStatus').textContent='Paste or import a STYLE prompt first.';return}
 if(push)history.push(text);$('optimizerUndo').disabled=history.length<2;
 const items=split(text),a=score(items),optimized=optimize(items,a),outA=score(optimized);render(items,optimized,a,outA)
}
function live(){const t=$('optimizerStudioInput').value,items=split(t);$('optimizerInputCount').textContent=`${items.length} items · ${t.length} characters`;if(!$('optimizerLiveAnalysis').checked)return;clearTimeout(timer);timer=setTimeout(()=>{if(t.trim())run(false);else{$('optimizerLiveStatus').textContent='Waiting for input';$('optimizerOverall').textContent='--';$('optimizerOverallBar').style.width='0%'}},350)}
function report(){if(!last)return'';return[`PROMPT OPTIMIZER 2.0 REPORT`,`Original score: ${last.analysis.overall}/100`,`Optimized score: ${last.outputAnalysis.overall}/100`,'',`Original: ${last.inputItems.join(', ')}`,'',`Optimized: ${last.optimized.join(', ')}`,'','Issues:',...issues(last.analysis,last.inputItems).map(x=>'- '+x),'','Suggestions:',...suggestions(last.analysis,last.inputItems).map(x=>'- '+x)].join('\n')}
async function copyText(t){try{await navigator.clipboard.writeText(t)}catch(e){const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();document.execCommand('copy');a.remove()}}
function apply(){const e=$('customStyle');if(!e)return;e.value=$('optimizerStudioOutput').value.trim();e.dispatchEvent(new Event('input',{bubbles:true}));if(typeof generateOutput==='function')generateOutput();if(typeof showToast==='function')showToast('Optimized STYLE applied.')}
function clearAll(){$('optimizerStudioInput').value='';$('optimizerStudioOutput').value='';$('optimizerResultPanel').classList.add('hidden');$('optimizerOverall').textContent='--';$('optimizerOverallBar').style.width='0%';$('optimizerHeadline').textContent='No prompt analyzed yet.';$('optimizerScoreGrid').innerHTML='';$('optimizerQuickWarnings').innerHTML='';history=[];last=null;$('optimizerUndo').disabled=true;live()}
function init(){
 if(!$('optimizerAnalyze'))return;$('optimizerAnalyze').onclick=()=>run(true);$('optimizerStudioInput').addEventListener('input',live);$('optimizerStudioOutput').addEventListener('input',()=>{$('optimizerOutputCount').textContent=`${split($('optimizerStudioOutput').value).length} items`});
 $('optimizerUseCurrent').onclick=()=>{$('optimizerStudioInput').value=$('styleOutput')?.value||'';live();run(true)};$('optimizerClear').onclick=clearAll;$('optimizerUndo').onclick=()=>{if(history.length<2)return;history.pop();$('optimizerStudioInput').value=history[history.length-1];live();run(false);$('optimizerUndo').disabled=history.length<2};
 ['optimizerMode','optimizerGoal','optimizerLength','optimizerTargetGenre','optimizerProtectCore','optimizerSunoSafe'].forEach(id=>$(id).addEventListener('change',()=>{$('optimizerStudioInput').value.trim()&&run(false)}));
 $('optimizerCopy').onclick=async()=>{await copyText($('optimizerStudioOutput').value);if(typeof showToast==='function')showToast('Optimized STYLE copied.')};$('optimizerApplyCustom').onclick=apply;$('optimizerReanalyzeOutput').onclick=()=>{$('optimizerStudioInput').value=$('optimizerStudioOutput').value;live();run(true)};
 $('optimizerCopyReport').onclick=async()=>{await copyText(report());if(typeof showToast==='function')showToast('Optimizer report copied.')};$('optimizerExportJson').onclick=()=>{if(!last)return;const b=new Blob([JSON.stringify(last,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='prompt-optimizer-analysis.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)};live()
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

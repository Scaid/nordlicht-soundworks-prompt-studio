
(function(){
'use strict';
const $=id=>document.getElementById(id);
const HISTORY_KEY='nsw-song-director-history-v1';
const STAGES=[
 ['Brief Analysis','Detect genre, story, voice and production signals'],
 ['Genre Intelligence','Choose primary and supporting genre DNA'],
 ['Genre Evolution','Define modern, authentic or hybrid direction'],
 ['Song Architecture','Build sections, timing and energy flow'],
 ['Vocal Direction','Cast voices and assign section roles'],
 ['Instrument Direction','Choose core palette and supporting layers'],
 ['Instrument Graph','Check masking and role competition'],
 ['Music Theory','Choose key, scale, chords, meter and groove'],
 ['Production','Define dynamics, space, width and final impact'],
 ['Lyrics Blueprint','Create section-specific MetaTags'],
 ['Prompt Optimization','Remove overload and conflicting priorities'],
 ['Success Prediction','Estimate readiness and retry risk'],
 ['Learning Engine','Apply personal feedback influence'],
 ['Project Snapshot','Prepare the complete local production state']
];
const MODULES=[
 ['Style Builder','styleView','style','Apply Master Song DNA'],
 ['Lyrics Workspace','lyricsView','lyrics','Apply section MetaTags'],
 ['Genre Evolution','genreEvolutionView','genre','Open and continue genre direction'],
 ['Arrangement Designer','arrangementDesignerView','arrangement','Open visual song architecture'],
 ['Vocal Director 2.0','vocalDirectorView','vocal','Open vocal cast and performance'],
 ['Instrument Evolution','instrumentEvolutionView','instrument','Open instrument roles and layers'],
 ['Instrument Graph','instrumentGraphView','graph','Review masking and compatibility'],
 ['Music Theory Director','theoryDirectorView','theory','Open harmony and tension plan'],
 ['Production Intelligence','productionView','production','Open production details'],
 ['Success Predictor','successPredictorView','predictor','Run final readiness analysis']
];
let current=null;
let buildTimer=null;

const esc=s=>String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const parseList=s=>String(s||'').split(/[,;\n]+/).map(x=>x.trim()).filter(Boolean);
const history=()=>{try{return JSON.parse(localStorage.getItem(HISTORY_KEY)||'[]')}catch(e){return[]}};
const setHistory=h=>localStorage.setItem(HISTORY_KEY,JSON.stringify(h.slice(0,30)));

function briefStats(){
 const text=$('sdBrief').value.trim();
 const parsed=window.NSWSongDirectorCore?.parseBrief(text,{
  profile:$('sdProfile').value,goal:$('sdGoal').value,duration:$('sdDuration').value,language:$('sdLanguage').value
 });
 const count=(text.match(/[\p{L}\p{N}'’\-]+/gu)||[]).length;
 $('sdBriefStats').textContent=`${count} words · ${parsed?.signals||0} detected signals`;
}

function getOptions(){
 return{
  profile:$('sdProfile').value,goal:$('sdGoal').value,duration:$('sdDuration').value,
  language:$('sdLanguage').value,useLearning:$('sdUseLearning').checked,
  preserve:$('sdPreserve').checked,buildLyrics:$('sdBuildLyrics').checked,
  runPredictor:$('sdRunPredictor').checked,saveProject:$('sdSaveProject').checked,
  strictConflicts:$('sdStrictConflicts').checked
 };
}

function renderStages(active=-1,doneCount=0){
 $('sdStageGrid').innerHTML=STAGES.map((s,i)=>`<article class="sd-stage ${i<doneCount?'done':''} ${i===active?'active':''}">
  <i>${i<doneCount?'✓':i+1}</i><b>${s[0]}</b><small>${s[1]}</small></article>`).join('');
 $('sdProgressText').textContent=`${doneCount} / ${STAGES.length} stages`;
 $('sdProgressBar').style.width=`${Math.round(doneCount/STAGES.length*100)}%`;
}

function animateBuild(result,applyAfter){
 clearInterval(buildTimer);
 $('sdProgressPanel').classList.remove('hidden');
 renderStages(0,0);
 let i=0;
 buildTimer=setInterval(()=>{
  i++;
  renderStages(Math.min(i,STAGES.length-1),Math.min(i,STAGES.length));
  if(i>=STAGES.length){
   clearInterval(buildTimer);
   renderStages(-1,STAGES.length);
   renderResult(result);
   if(applyAfter)deployAll();
  }
 },90);
}

function analyze(applyAfter=false){
 const brief=$('sdBrief').value.trim();
 if(!brief){
  $('sdStatus').textContent='Add a creative brief first.';
  return;
 }
 const options=getOptions();
 const result=window.NSWSongDirectorCore.buildDirectorResult(brief,options);
 if(options.strictConflicts&&result.conflicts.length>=3&&applyAfter){
  current=result;
  renderResult(result);
  $('sdStatus').textContent='Build stopped before deployment because several high-impact conflicts were detected.';
  return;
 }
 current=result;
 window.NSW_SONG_DIRECTOR_LAST=JSON.parse(JSON.stringify(result));
 saveHistory(result);
 animateBuild(result,applyAfter);
 $('sdStatus').textContent='Studio Core is building the connected production direction...';
}

function saveHistory(result){
 const h=history();
 if(!(h[0]&&h[0].brief===result.brief&&Date.now()-h[0].createdAt<2500)){
  h.unshift({
   id:result.id,createdAt:result.createdAt,brief:result.brief,coherence:result.coherence,
   grade:result.grade,genre:result.parsed.primaryGenre.label,style:result.style,
   language:result.parsed.language,duration:result.parsed.duration,full:result
  });
  setHistory(h);
 }
 renderHistory();
}

function renderResult(r){
 current=r;
 window.NSW_SONG_DIRECTOR_LAST=JSON.parse(JSON.stringify(r));
 $('sdResults').classList.remove('hidden');
 $('sdScore').textContent=r.coherence;
 $('sdGrade').textContent=r.grade;
 $('sdScoreBar').style.width=r.coherence+'%';
 $('sdBadge').textContent=`${r.decisions.length} decisions · ${r.parsed.structure.length} sections`;
 $('sdSummary').textContent=`${r.parsed.primaryGenre.label}, ${r.parsed.bpm} BPM, ${r.parsed.vocals.join(', ')}. The arrangement develops through ${r.parsed.structure.length} sections toward a defined final payoff.`;
 $('sdOverviewGrid').innerHTML=[
  ['Genre',r.parsed.primaryGenre.label],['Language',r.parsed.language],['Duration',r.parsed.duration],
  ['BPM',r.parsed.bpm],['Sections',r.architecture.length],['Instruments',r.parsed.instruments.length],
  ['Vocal roles',r.parsed.vocals.length],['Conflicts',r.conflicts.length]
 ].map(x=>`<div class="sd-overview-item"><small>${x[0]}</small><b>${esc(x[1])}</b></div>`).join('');
 $('sdReadiness').innerHTML=`<b>Studio readiness:</b> ${r.coherence>=85?'Strong connected direction with low visible risk.':r.coherence>=72?'Usable direction with a few areas to review.':'Several decisions should be refined before deployment.'}<br>${esc(r.learning.note)}`;

 $('sdDecisionGrid').innerHTML=r.decisions.map(d=>`<article class="sd-decision">
  <header><h3>${esc(d.title)}</h3><span class="confidence">${d.confidence}% confidence</span></header>
  <strong>${esc(d.value)}</strong><p>${esc(d.reason)}</p>
  <button data-sd-open="${d.module}">Open Target Module</button></article>`).join('');
 document.querySelectorAll('[data-sd-open]').forEach(b=>b.onclick=()=>window.NSWConnections?.navigate(b.dataset.sdOpen));

 $('sdMasterStyle').value=r.style;
 $('sdArchitecture').innerHTML=r.architecture.map(s=>`<article class="sd-architecture-section">
  <b>${esc(s.name)}</b><small>${s.duration}s · Energy ${s.energy}%<br>${esc(s.vocal)}</small><i style="width:${s.energy}%"></i></article>`).join('');
 $('sdVocalPlan').innerHTML=r.architecture.map(s=>`<div class="sd-list-item"><b>${esc(s.name)} · ${esc(s.vocal)}</b><small>Range and intensity follow the section energy of ${s.energy}%.</small></div>`).join('');
 $('sdInstrumentPlan').innerHTML=r.architecture.map(s=>`<div class="sd-list-item"><b>${esc(s.name)}</b><small>${esc(r.modulePayloads.instrument.sections.find(x=>x.name===s.name)?.instruments||'Core palette')}</small></div>`).join('');
 $('sdTheoryPlan').innerHTML=[
  ['Key & Scale',`${r.theory.key} · ${r.theory.scale}`],['Meter & Groove',`${r.theory.meter} · ${r.theory.groove}`],
  ['Core Chords',r.theory.chords.join(' – ')],['Development',r.theory.modulation]
 ].map(x=>`<div class="sd-list-item"><b>${x[0]}</b><small>${esc(x[1])}</small></div>`).join('');
 $('sdProductionPlan').innerHTML=[
  ['Global Production',r.parsed.production],['Dynamics',r.parsed.emotion],
  ['Voice Handling','Clear voice separation and section-specific vocal roles'],
  ['Final Impact','Reserve the widest and densest production for the final peak']
 ].map(x=>`<div class="sd-list-item"><b>${x[0]}</b><small>${esc(x[1])}</small></div>`).join('');
 $('sdConflicts').innerHTML=(r.conflicts.length?r.conflicts:['No major creative conflicts detected.']).map(x=>`<div class="sd-message ${r.conflicts.length?'warn':'good'}">${esc(x)}</div>`).join('');
 $('sdReasoning').innerHTML=r.reasoning.map(x=>`<div class="sd-message info">${esc(x)}</div>`).join('');
 $('sdLyricsBlueprint').value=r.lyricsBlueprint;
 renderModules(r);
 $('sdStatus').textContent=`Song direction complete · coherence ${r.coherence}/100.`;
}

function renderModules(r){
 const snap=window.NSWConnections?.snapshot();
 $('sdModuleGrid').innerHTML=MODULES.map(m=>{
  const ready=(m[2]==='style'&&!!r.style)||(m[2]==='lyrics'&&!!r.lyricsBlueprint)||!!r.modulePayloads[m[2]]||(m[2]==='graph'&&!!window.NSW_INSTRUMENT_GRAPH_LAST);
  const existing=snap?.modules?.[m[2]]?.ready;
  return`<button class="sd-module ${ready?'ready':''}" data-sd-module="${m[2]}" data-view="${m[1]}">
   <b>${esc(m[0])}</b><small>${esc(m[3])}<br>${existing?'Existing module data detected':'Ready for Director deployment'}</small></button>`;
 }).join('');
 document.querySelectorAll('[data-sd-module]').forEach(b=>b.onclick=()=>applyModule(b.dataset.sdModule,b.dataset.view));
}

function mergeStyle(existing,newStyle){
 if(!existing)return newStyle;
 return window.NSWConnections?.mergeStyle([existing,newStyle])||[existing,newStyle].filter(Boolean).join(', ');
}

function applyModule(key,view){
 if(!current)return;
 const preserve=$('sdPreserve').checked;
 if(key==='style'){
  const existing=$('customStyle')?.value||'';
  window.NSWConnections?.setStyle(preserve?mergeStyle(existing,current.style):current.style);
  $('sdDeploymentStatus').textContent='STYLE applied';
  return;
 }
 if(key==='lyrics'){
  if($('sdBuildLyrics').checked)window.NSWConnections?.appendLyrics(current.lyricsBlueprint);
  $('sdDeploymentStatus').textContent='Lyrics MetaTags applied';
  return;
 }
 if(key==='genre'){
  window.NSWConnections?.navigate('genreEvolutionView');
  return;
 }
 if(key==='arrangement'){
  window.NSWConnections?.navigate('arrangementDesignerView');
  setTimeout(()=>{
   const src=$('arrSource');if(src){src.value='director';src.dispatchEvent(new Event('change',{bubbles:true}))}
   $('arrGenerate')?.click();
  },60);
  return;
 }
 if(key==='vocal'){
  window.NSWConnections?.navigate('vocalDirectorView');
  setTimeout(()=>{
   const g=$('vdGenre');
   if(g){
    const genre=current.parsed.primaryGenre.key;
    const candidate=[...g.options].find(o=>o.value===genre||o.textContent.toLowerCase().includes(genre));
    if(candidate){g.value=candidate.value;g.dispatchEvent(new Event('change',{bubbles:true}))}
   }
   $('vdSmartDirector')?.click();
   $('vd2AutoCast')?.click();
  },60);
  return;
 }
 if(key==='instrument'){
  window.NSWConnections?.navigate('instrumentEvolutionView');
  setTimeout(()=>{
   const g=$('ieGenre');if(g){
    const genre=current.parsed.primaryGenre.key==='jazz'?'jazz':current.parsed.primaryGenre.key;
    const candidate=[...g.options].find(o=>o.value===genre||o.textContent.toLowerCase().includes(genre));
    if(candidate){g.value=candidate.value;g.dispatchEvent(new Event('change',{bubbles:true}))}
   }
   $('ieSmart')?.click();
  },60);
  return;
 }
 if(key==='graph'){
  window.NSWConnections?.navigate('instrumentGraphView');
  setTimeout(()=>$('igrBuild')?.click(),60);
  return;
 }
 if(key==='theory'){
  window.NSWConnections?.navigate('theoryDirectorView');
  setTimeout(()=>{
   if($('mtdBpm'))$('mtdBpm').value=current.parsed.bpm;
   $('mtdImport')?.click();$('mtdGenerate')?.click();
  },60);
  return;
 }
 if(key==='production'){
  window.NSWConnections?.navigate('productionView');
  return;
 }
 if(key==='predictor'){
  window.NSWConnections?.setStyle(current.style);
  window.NSWConnections?.sync('studio-to-predictor');
  return;
 }
 if(view)window.NSWConnections?.navigate(view);
}

function deployAll(){
 if(!current)return;
 applyModule('style');
 if($('sdBuildLyrics').checked)applyModule('lyrics');
 const bpm=$('bpm');
 if(bpm){bpm.value=current.parsed.bpm;bpm.dispatchEvent(new Event('input',{bubbles:true}))}

 window.NSW_SONG_DIRECTOR_LAST=JSON.parse(JSON.stringify(current));
 window.NSW_AI_MUSIC_DIRECTOR_LAST={
  createdAt:Date.now(),brief:current.brief,mode:current.options.profile,
  decisions:JSON.parse(JSON.stringify(current.decisions)),style:current.style,
  score:current.coherence,conflicts:JSON.parse(JSON.stringify(current.conflicts))
 };
 window.NSW_ARRANGEMENT_DESIGNER_LAST={
  sections:JSON.parse(JSON.stringify(current.architecture)),
  duration:current.parsed.duration,output:current.lyricsBlueprint,updatedAt:Date.now()
 };
 window.NSW_VOCAL_DIRECTOR_V2_LAST={
  cast:{primary:current.parsed.vocals[0]||'Lead Vocal',secondary:current.parsed.vocals[1]||'None',range:'Genre-appropriate dynamic range',separation:'Strictly Separated Roles'},
  matrix:current.architecture.map(x=>({name:x.name,performer:x.vocal,range:x.energy>80?'Upper-Mid to High':'Mid',technique:x.energy>80?'Powerful controlled delivery':'Restrained controlled delivery',background:/chorus|final/i.test(x.name)?'Wide Harmony Stack':'Minimal',adlibs:/final/i.test(x.name)?'Final sustained ad-libs':'None',transition:'Section-aware handoff'})),
  pronunciation:'',metatags:current.lyricsBlueprint,updatedAt:Date.now()
 };
 window.NSW_MUSIC_THEORY_DIRECTOR_LAST={
  createdAt:Date.now(),genre:current.parsed.primaryGenre.label,key:current.theory.key,
  scale:current.theory.scale,meter:current.theory.meter,groove:current.theory.groove,
  chords:JSON.parse(JSON.stringify(current.theory.chords)),modulation:current.theory.modulation,
  bpm:current.parsed.bpm,sections:current.architecture.map(x=>({name:x.name,energy:x.energy,chords:current.theory.chords.join(' – ')})),
  score:current.coherence
 };
 window.NSW_INSTRUMENT_EVOLUTION_LAST={
  family:'Song Director Core',instrument:current.parsed.instruments[0]||'Core Instrument',
  goal:current.options.profile,genre:current.parsed.primaryGenre.key,stage:5,
  layers:current.parsed.instruments.slice(1).map((name,i)=>({id:'sd_layer_'+i,name,role:i===0?'Harmony Layer':i===1?'Rhythmic Pulse':'Supporting Texture'})),
  dna:current.parsed.instruments.join(', '),
  sectionTags:current.modulePayloads.instrument.sections.map(x=>`[${x.name}: ${x.instruments}]`).join('\n'),
  updatedAt:Date.now()
 };
 window.NSW_GENRE_EVOLUTION_LAST={
  family:current.parsed.primaryGenre.key,stage:current.parsed.primaryGenre.label,
  goal:current.options.profile,style:current.decisions[0].value,updatedAt:Date.now()
 };

 $('sdDeploymentStatus').textContent='Complete connected production state deployed';
 if($('sdRunPredictor').checked)setTimeout(()=>applyModule('predictor'),160);
 if($('sdSaveProject').checked)setTimeout(saveProject,280);
 $('sdStatus').textContent='Complete Song Director deployment finished.';
}

function saveProject(){
 if(!current)return false;
 let pm;try{pm=JSON.parse(localStorage.getItem('nsw-project-manager-v4')||'null')}catch(e){}
 const p=pm?.projects?.find(x=>x.id===pm.activeProjectId)||pm?.projects?.[0];
 const t=p?.tracks?.[0];
 if(!t){
  $('sdStatus').textContent='No active Project Manager track is available.';
  return false;
 }
 t.songDirectorAI=JSON.parse(JSON.stringify(current));
 t.style=current.style||t.style;
 if($('sdBuildLyrics').checked)t.songDirectorLyricsBlueprint=current.lyricsBlueprint;
 t.updated=Date.now();p.updated=Date.now();
 localStorage.setItem('nsw-project-manager-v4',JSON.stringify(pm));
 $('sdStatus').textContent=`Complete Song Director result saved to ${p.name} · ${t.title}.`;
 return true;
}

function report(){
 if(!current)return'';
 return[
  'SONG DIRECTOR AI – COMPLETE PRODUCTION REPORT',
  `Brief: ${current.brief}`,
  `Director profile: ${current.options.profile}`,
  `Goal: ${current.options.goal}`,
  `Coherence: ${current.coherence}/100 (${current.grade})`,
  '',
  ...current.decisions.map(d=>`${d.title}: ${d.value}\nReason: ${d.reason}\nConfidence: ${d.confidence}%`),
  '',
  'CONFLICTS:',
  ...(current.conflicts.length?current.conflicts:['None']).map(x=>'- '+x),
  '',
  'MASTER STYLE:',
  current.style,
  '',
  'LYRICS & METATAG BLUEPRINT:',
  current.lyricsBlueprint
 ].join('\n\n');
}

async function copyText(text){
 try{await navigator.clipboard.writeText(text)}
 catch(e){
  const a=document.createElement('textarea');a.value=text;document.body.appendChild(a);a.select();document.execCommand('copy');a.remove();
 }
}

function exportJson(){
 if(!current)return;
 const b=new Blob([JSON.stringify(current,null,2)],{type:'application/json'});
 const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='song-director-ai-plan.json';a.click();
 setTimeout(()=>URL.revokeObjectURL(a.href),500);
}

function renderHistory(){
 const h=history();
 $('sdHistory').innerHTML=h.length?h.map(x=>`<article class="sd-history-item">
  <div class="sd-history-head"><b>${esc(x.grade)} · ${x.coherence}/100 · ${esc(x.genre)}</b><small>${new Date(x.createdAt).toLocaleString()}</small></div>
  <p>${esc(x.brief.slice(0,300))}</p>
  <div class="sd-history-actions"><button data-sd-load="${x.id}">Load</button><button data-sd-remove="${x.id}">Delete</button></div>
 </article>`).join(''):'<div class="feature-empty">No Song Director history yet.</div>';
 document.querySelectorAll('[data-sd-load]').forEach(b=>b.onclick=()=>{
  const x=history().find(v=>v.id===b.dataset.sdLoad);
  if(x?.full){$('sdBrief').value=x.full.brief;briefStats();renderResult(x.full);window.NSWConnections?.navigate('songDirectorView')}
 });
 document.querySelectorAll('[data-sd-remove]').forEach(b=>b.onclick=()=>{setHistory(history().filter(x=>x.id!==b.dataset.sdRemove));renderHistory()});
}

function importStudio(){
 const s=window.NSWConnections?.snapshot();
 const parts=[];
 if(s?.modules?.style?.ready)parts.push(`Current STYLE: ${s.modules.style.data.style}`);
 if(s?.modules?.lyrics?.ready)parts.push(`Current Lyrics concept: ${String(s.modules.lyrics.data.lyrics).slice(0,800)}`);
 if(window.NSW_AI_MUSIC_DIRECTOR_LAST?.brief)parts.push(`Music Director brief: ${window.NSW_AI_MUSIC_DIRECTOR_LAST.brief}`);
 if(window.NSW_ARRANGEMENT_DESIGNER_LAST?.sections)parts.push(`Arrangement: ${window.NSW_ARRANGEMENT_DESIGNER_LAST.sections.map(x=>x.name).join(', ')}`);
 $('sdBrief').value=parts.join('\n\n')||'Create a connected song direction from the current empty Studio.';
 briefStats();
 $('sdStatus').textContent='Current Studio state imported into the creative brief.';
}

function init(){
 if(!$('sdBuild')||!window.NSWSongDirectorCore)return;
 $('sdBrief').oninput=briefStats;
 ['sdProfile','sdGoal','sdDuration','sdLanguage'].forEach(id=>$(id).onchange=briefStats);
 $('sdBuild').onclick=()=>analyze(true);
 $('sdAnalyzeOnly').onclick=()=>analyze(false);
 $('sdDeployAll').onclick=deployAll;
 $('sdApplyStyle').onclick=()=>applyModule('style');
 $('sdApplyLyrics').onclick=()=>applyModule('lyrics');
 $('sdCopyStyle').onclick=()=>copyText(current?.style||'');
 $('sdCopyLyrics').onclick=()=>copyText(current?.lyricsBlueprint||'');
 $('sdCopyReport').onclick=()=>copyText(report());
 $('sdExportJson').onclick=exportJson;
 $('sdSaveSnapshot').onclick=saveProject;
 $('sdRunFinalCheck').onclick=()=>applyModule('predictor');
 $('sdOpenNext').onclick=()=>{
  const snap=window.NSWConnections?.snapshot();
  const order=['genre','blueprint','instrument','vocal','theory','predictor'];
  const key=order.find(k=>!snap?.modules?.[k]?.ready)||'predictor';
  const view={genre:'genreEvolutionView',blueprint:'blueprintView',instrument:'instrumentEvolutionView',vocal:'vocalDirectorView',theory:'theoryDirectorView',predictor:'successPredictorView'}[key];
  window.NSWConnections?.navigate(view);
 };
 $('sdImportStudio').onclick=importStudio;
 $('sdExample').onclick=()=>{
  $('sdBrief').value='A dark German Viking anime opening about a fallen warrior returning from the shadow realm. Female lead, deep male narrator, layered choir, Tagelharpa, Taiko, cinematic strings, restrained verses, a powerful chorus and two massive electronic drops ending in a triumphant cinematic finale.';
  $('sdGoal').value='anime';$('sdLanguage').value='German';briefStats();
 };
 $('sdClear').onclick=()=>{
  clearInterval(buildTimer);current=null;$('sdBrief').value='';briefStats();
  $('sdResults').classList.add('hidden');$('sdProgressPanel').classList.add('hidden');
  $('sdScore').textContent='--';$('sdGrade').textContent='—';$('sdScoreBar').style.width='0%';
  $('sdSummary').textContent='No song direction generated yet.';$('sdStatus').textContent='Ready to build a complete song direction.';
 };
 $('sdClearHistory').onclick=()=>{if(confirm('Clear local Song Director history?')){localStorage.removeItem(HISTORY_KEY);renderHistory()}};
 renderStages(-1,0);renderHistory();briefStats();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

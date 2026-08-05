(function(root){
'use strict';

const $=id=>document.getElementById(id);
const K=root.NSW_AI_PRODUCER_KNOWLEDGE;
const I18N=root.NSWStudioIntelligenceI18n;
const HK='nsw-studio-intelligence-history-v2';
const LEGACY_HK='nsw-studio-intelligence-history-v1';
const UK='nsw-studio-intelligence-undo-v1';
let current=null;

const esc=value=>String(value??'').replace(/[&<>"']/g,character=>({
 '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
})[character]);
const load=(key,fallback=[])=>{try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}catch(error){return fallback}};
const store=(key,value)=>localStorage.setItem(key,JSON.stringify(value));
const split=value=>String(value||'').split(/[,;\n]+/).map(item=>item.trim()).filter(Boolean);
const uniq=values=>[...new Set(values.filter(Boolean))];
const message=(key,variables={})=>Object.freeze({key,variables});
const messageValue=value=>value&&typeof value==='object'&&'message' in value?value.message:value;

function text(value,code=I18N?.language?.()||'en'){
 if(value==null)return'';
 if(typeof value==='string'||typeof value==='number')return String(value);
 if(value.key){
  const variables=Object.fromEntries(Object.entries(value.variables||{}).map(([key,item])=>[key,text(item,code)]));
  return I18N?.format?.(value.key,variables,code)||value.key;
 }
 return String(value);
}

function t(key,variables={},code){
 return I18N?.format?.(key,variables,code)||key;
}

function snapshot(){
 const connections=root.NSWConnections?.snapshot?.()||{};
 let project=null;
 try{
  const data=JSON.parse(localStorage.getItem('nsw-project-manager-v4')||'null');
  const active=data?.projects?.find(item=>item.id===data.activeProjectId)||data?.projects?.[0];
  project={name:active?.name||'',track:active?.tracks?.[0]||null};
 }catch(error){}
 return{
  style:$('siUseStyle')?.checked?($('customStyle')?.value||connections?.modules?.style?.data?.style||''):'',
  lyrics:$('siUseLyrics')?.checked?($('lyricsInput')?.value||connections?.modules?.lyrics?.data?.lyrics||''):'',
  bpm:$('bpm')?.value||'',
  project:$('siUseProject')?.checked?project:null,
  producer:root.NSW_AI_PRODUCER_LAST||null,
  health:root.NSW_STYLE_HEALTH_LAST||null,
  simplifier:root.NSW_STYLE_SIMPLIFIER_LAST||null,
  variation:root.NSW_VARIATION_ENGINE_LAST||null,
  conflict:root.NSW_CONFLICT_RESOLVER_LAST||null,
  songDirector:root.NSW_SONG_DIRECTOR_LAST||null
 };
}

function genreMatches(value){
 const haystack=String(value||'').toLowerCase();
 return(K?.genreProfiles||[])
  .map(profile=>({profile,score:profile.patterns.reduce((sum,pattern)=>sum+(haystack.includes(pattern.toLowerCase())?(pattern.includes(' ')?12:8):0),0)}))
  .filter(item=>item.score>0)
  .sort((left,right)=>right.score-left.score);
}

function issue(code,key,variables={}){return Object.freeze({code,message:message(key,variables)})}
function strength(code,key,variables={}){return Object.freeze({code,message:message(key,variables)})}
function action(id,labelKey,detailKey,safe,view){return Object.freeze({id,label:message(labelKey),detail:message(detailKey),safe,view})}
function workflow(id,label,view,done,detailKey){return Object.freeze({id,label,view,done,detail:message(detailKey)})}

function analyze(){
 const context=snapshot();
 const brief=$('siBrief').value.trim();
 const combined=[brief,context.style,context.lyrics?.slice(0,1200)].filter(Boolean).join('\n');
 if(!combined.trim()){$('siStatus').textContent=t('noInput');return}

 const styleTerms=split(context.style);
 const genres=genreMatches(combined);
 const primary=genres[0]?.profile;
 const secondary=genres[1]?.profile;
 const issues=[];
 const strengths=[];
 const mentor=[];
 const coach=[];
 const mixer=[];
 const sound=[];
 const actions=[];

 if(!context.style)issues.push(issue('no-style','noStyle'));
 else strengths.push(strength('style-available','styleAvailable',{count:styleTerms.length}));
 if(styleTerms.length>40){
  issues.push(issue('long-style','longStyle'));
  actions.push(action('simplify','simplifyLabel','simplifyDetail',true,'styleSimplifierView'));
 }
 if(context.health?.score<80){
  issues.push(issue('health-low','healthLow',{score:context.health.score}));
  actions.push(action('health','healthLabel','healthDetail',true,'styleHealthView'));
 }
 if(context.conflict?.conflicts?.length){
  issues.push(issue('conflicts','conflicts',{count:context.conflict.conflicts.length}));
  actions.push(action('conflict','conflictLabel','conflictDetail',true,'conflictResolverView'));
 }
 if(genres.length>3){
  issues.push(issue('genre-competition','genreCompetition',{count:genres.length}));
  actions.push(action('focus','focusLabel','focusDetail',true,'aiProducerView'));
 }
 if(primary)strengths.push(strength('primary-identity','primaryIdentity',{name:primary.label}));
 if(secondary)strengths.push(strength('secondary-identity','secondaryIdentity',{name:secondary.label}));
 if(!/vocal|voice|choir|spoken|rap|growl|whisper/i.test(context.style))issues.push(issue('no-vocal','noVocal'));
 else strengths.push(strength('vocal-present','vocalPresent'));
 if(!/contrast|build|final|chorus|drop|bridge|section/i.test(context.style))issues.push(issue('no-arc','noArc'));
 else strengths.push(strength('arc-present','arcPresent'));

 if(primary&&secondary)mentor.push(message('keepBoth',{primary:primary.label,secondary:secondary.label}));
 else if(primary)mentor.push(message('keepOne',{primary:primary.label}));
 else mentor.push(message('chooseGenre'));
 mentor.push(issues.length?message('firstIssue',{issue:issues[0].message}):message('coherent'));
 mentor.push(message('priorities'));

 strengths.forEach(item=>coach.push({tone:'info',message:message('strengthPrefix',{text:item.message})}));
 issues.slice(0,4).forEach(item=>coach.push({tone:'warn',message:message('improvePrefix',{text:item.message})}));
 coach.push({tone:context.lyrics?'info':'warn',message:context.lyrics
  ?message('lyricsDetected',{count:context.lyrics.split(/\s+/).filter(Boolean).length})
  :message('noLyrics')});

 if(primary&&secondary){
  mixer.push(message('mixBoth',{primary:primary.label,secondary:secondary.label}));
  mixer.push(message('corePalette',{items:primary.recommended.slice(0,3).join(', ')}));
  mixer.push(message('supportingPalette',{items:secondary.recommended.slice(0,2).join(', ')}));
 }else if(primary){
  mixer.push(message('singleGenre',{primary:primary.label}));
  mixer.push(message('alternatives',{items:primary.alts.slice(0,2).join(' / ')}));
 }else mixer.push(message('noBlend'));

 const introItems=primary?.recommended?.slice(0,2)||[];
 sound.push(introItems.length?message('introCustom',{items:introItems.join(' + ')}):message('introGeneric'));
 sound.push(message('verseSound'));
 sound.push(message('chorusSound'));
 sound.push(message('bridgeSound'));
 sound.push(message('finalSound'));
 if(primary?.production)sound.push(message('productionAnchor',{value:primary.production}));

 const suggestedStyle=uniq([
  primary?.label,
  secondary?`${secondary.label} Supporting Influence`:null,
  context.bpm?`${context.bpm} BPM`:null,
  primary?.meter,
  primary?.modes?.slice(0,2).join(' and '),
  ...(primary?.recommended?.slice(0,5)||[]),
  ...((context.style.match(/[^,]*(?:vocal|voice|choir|spoken|rap|growl|whisper)[^,]*/gi)||[]).slice(0,3)),
  primary?.production,
  'Controlled Contrast','Clear Voice Separation','Section-Specific Arrangement','Huge Cinematic Finale'
 ]).join(', ');

 const hasDirectionConflict=issues.some(item=>item.code==='conflicts'||item.code==='genre-competition');
 const workflowItems=[
  workflow('producer','AI Producer','aiProducerView',!!context.producer,'workflowProducer'),
  workflow('conflict','Conflict Resolver','conflictResolverView',!hasDirectionConflict,'workflowConflict'),
  workflow('simplifier','Style Simplifier','styleSimplifierView',styleTerms.length>0&&styleTerms.length<=32,'workflowSimplifier'),
  workflow('health','Health Check','styleHealthView',(context.health?.score||0)>=85,'workflowHealth'),
  workflow('arrangement','Arrangement','arrangementDesignerView',!!context.songDirector?.architecture,'workflowArrangement'),
  workflow('vocals','Vocal Director','vocalDirectorView',!!root.NSW_VOCAL_DIRECTOR_V2_LAST,'workflowVocals'),
  workflow('theory','Music Theory','theoryDirectorView',!!root.NSW_MUSIC_THEORY_DIRECTOR_LAST,'workflowTheory'),
  workflow('predictor','Success Predictor','successPredictorView',false,'workflowPredictor')
 ];
 if(!actions.length)actions.push(action('style','styleLabel','styleDetail',true,'styleView'));
 actions.push(action('producer','producerLabel','producerDetail',false,'aiProducerView'));
 actions.push(action('variation','variationLabel','variationDetail',false,'variationEngineView'));

 const readiness=Math.max(35,Math.min(98,88+strengths.length*3-issues.length*7+(context.health?.score>=85?5:0)));
 current={
  schemaVersion:2,id:'si_'+Date.now(),createdAt:Date.now(),brief,
  role:$('siRole').value,tone:$('siTone').value,goal:$('siGoal').value,automation:$('siAutomation').value,
  context,primary:primary?.id||null,secondary:secondary?.id||null,
  issues,strengths,mentor,coach,mixer,sound,actions,workflow:workflowItems,suggestedStyle,readiness
 };
 root.NSW_STUDIO_INTELLIGENCE_LAST=JSON.parse(JSON.stringify(current));
 saveHistory();
 render();
 if($('siAutomation').value==='apply')applySafe();
}

function render(){
 if(!current)return;
 const result=current;
 I18N?.apply?.();
 $('siResults').classList.remove('hidden');
 $('siScore').textContent=result.readiness;
 $('siGrade').textContent=result.readiness>=92?'A+':result.readiness>=84?'A':result.readiness>=74?'B+':result.readiness>=62?'B':'C';
 $('siScoreBar').style.width=result.readiness+'%';
 $('siSummary').textContent=result.issues.length?t('summaryIssues',{strengths:result.strengths.length,issues:result.issues.length}):t('summaryGood');
 const metrics=[
  [t('metricStrengths'),result.strengths.length],
  [t('metricIssues'),result.issues.length],
  [t('metricActions'),result.actions.length],
  [t('metricWorkflow'),`${result.workflow.filter(item=>item.done).length}/${result.workflow.length}`],
  [t('metricPrimary'),result.primary||t('unknown')],
  [t('metricSecondary'),result.secondary||t('none')]
 ];
 $('siMetrics').innerHTML=metrics.map(item=>`<div class="aip-metric"><small>${esc(item[0])}</small><b>${esc(item[1])}</b></div>`).join('');
 const next=result.workflow.find(item=>!item.done);
 $('siNextStep').innerHTML=`<b>${esc(t('recommendedNext'))}</b><br>${next?`${esc(text(next.label))} — ${esc(text(next.detail))}`:esc(t('finalStep'))}`;
 $('siMentor').innerHTML=result.mentor.map(item=>`<div class="aip-message info">${esc(text(item))}</div>`).join('');
 $('siCoach').innerHTML=result.coach.map(item=>`<div class="aip-message ${item.tone==='warn'?'warn':'info'}">${esc(text(messageValue(item)))}</div>`).join('');
 $('siMixer').innerHTML=result.mixer.map(item=>`<div class="aip-message info">${esc(text(item))}</div>`).join('');
 $('siSound').innerHTML=result.sound.map(item=>`<div class="aip-message info">${esc(text(item))}</div>`).join('');
 $('siWorkflow').innerHTML=result.workflow.map((item,index)=>`<article class="si-step ${item.done?'done':(!item.done&&result.workflow.slice(0,index).every(previous=>previous.done)?'recommended':'')}" data-view="${esc(item.view)}"><b>${item.done?'✓ ':''}${esc(text(item.label))}</b><small>${esc(text(item.detail))}</small></article>`).join('');
 document.querySelectorAll('.si-step').forEach(element=>element.onclick=()=>root.NSWConnections?.navigate(element.dataset.view));
 $('siWorkflowProgress').textContent=`${result.workflow.filter(item=>item.done).length}/${result.workflow.length} ${t('complete')}`;
 $('siActions').innerHTML=result.actions.map((item,index)=>`<article class="si-action"><b>${esc(text(item.label))}</b><small>${esc(text(item.detail))}</small><label><input type="checkbox" data-action="${index}" ${item.safe?'checked':''}> ${esc(t('includeAction'))}</label></article>`).join('');
 $('siActionCount').textContent=t('actionCount',{count:result.actions.length});
 $('siOutput').value=result.suggestedStyle;
 $('siStyleState').textContent=t('styleReady');
 $('siBadge').textContent=t('readinessValue',{score:result.readiness});
 $('siContextCount').textContent=t('signalCount',{count:Object.values(result.context).filter(Boolean).length});
 $('siStatus').textContent=t('analysisComplete');
}

function applySafe(){
 if(!current)return;
 store(UK,{style:$('customStyle')?.value||'',lyrics:$('lyricsInput')?.value||'',bpm:$('bpm')?.value||''});
 const selected=[...document.querySelectorAll('[data-action]:checked')].map(element=>current.actions[+element.dataset.action]);
 if(selected.some(item=>['style','simplify','health','conflict'].includes(item.id))||!selected.length){
  const target=$('customStyle');
  if(target){
   target.value=current.suggestedStyle;
   target.dispatchEvent(new Event('input',{bubbles:true}));
   if(typeof root.generateOutput==='function')root.generateOutput();
  }
 }
 root.NSW_STUDIO_INTELLIGENCE_LAST=JSON.parse(JSON.stringify(current));
 $('siStatus').textContent=t('applied',{count:Math.max(1,selected.length)});
}

function runPipeline(){
 if(!current)return;
 const target=$('customStyle');
 if(target){target.value=current.suggestedStyle;target.dispatchEvent(new Event('input',{bubbles:true}))}
 root.NSWConnections?.navigate('styleHealthView');
 root.setTimeout(()=>{
  const input=$('shInput');
  if(input){input.value=current.suggestedStyle;input.dispatchEvent(new Event('input',{bubbles:true}));$('shAnalyze')?.click()}
 },80);
 $('siStatus').textContent=t('pipeline');
}

function undo(){
 const undoState=load(UK,null);
 if(!undoState){$('siStatus').textContent=t('undoMissing');return}
 if($('customStyle'))$('customStyle').value=undoState.style||'';
 if($('lyricsInput'))$('lyricsInput').value=undoState.lyrics||'';
 if($('bpm'))$('bpm').value=undoState.bpm||'';
 localStorage.removeItem(UK);
 $('siStatus').textContent=t('undoDone');
}

function importContext(){
 const context=snapshot();
 const parts=[];
 if(context.style)parts.push(t('currentStyle',{value:context.style}));
 if(context.lyrics)parts.push(t('lyricsConcept',{value:context.lyrics.slice(0,800)}));
 if(context.project?.name)parts.push(t('projectName',{value:context.project.name}));
 $('siBrief').value=parts.join('\n\n')||t('inspectDefault');
 stats();
}

function historyRows(){
 const currentRows=load(HK,[]);
 if(currentRows.length)return currentRows;
 return load(LEGACY_HK,[]);
}

function saveHistory(){
 const history=load(HK,[]);
 history.unshift({id:current.id,createdAt:current.createdAt,brief:current.brief,readiness:current.readiness,full:current});
 store(HK,history.slice(0,40));
 renderHistory();
}

function renderHistory(){
 const history=historyRows();
 $('siHistory').innerHTML=history.length?history.map(item=>`<article class="aip-history-item"><header><b>${esc(item.readiness)}/100 · Studio Intelligence</b><small>${esc(new Date(item.createdAt).toLocaleString(I18N?.language?.()||undefined))}</small></header><p>${esc((item.brief||t('historyContext')).slice(0,240))}</p><button data-si-load="${esc(item.id)}">${esc(t('load'))}</button></article>`).join(''):`<div class="feature-empty">${esc(t('historyEmpty'))}</div>`;
 document.querySelectorAll('[data-si-load]').forEach(button=>button.onclick=()=>{
  const item=historyRows().find(row=>row.id===button.dataset.siLoad);
  if(item?.full){current=item.full;$('siBrief').value=current.brief||'';render()}
 });
}

function goalText(value,code){
 const key={improve:'goalImprove',build:'goalBuild',simplify:'goalSimplify',experiment:'goalExperiment',finish:'goalFinish'}[value];
 return key?(I18N?.value?.(key,code)||value):value;
}

function report(){
 if(!current)return'';
 const code=I18N?.language?.()||'en';
 const tx=(key,variables={})=>t(key,variables,code);
 return[
  tx('exportTitle'),`${tx('exportReadiness')}: ${current.readiness}/100`,`${tx('exportGoal')}: ${goalText(current.goal,code)}`,'',
  'AI MENTOR:',...current.mentor.map(item=>'- '+text(item,code)),'',
  'AI SONG COACH:',...current.coach.map(item=>'- '+text(messageValue(item),code)),'',
  'AI GENRE MIXER:',...current.mixer.map(item=>'- '+text(item,code)),'',
  'AI SOUND DESIGNER:',...current.sound.map(item=>'- '+text(item,code)),'',
  `${tx('exportWorkflow')}:`,...current.workflow.map(item=>`- ${item.done?tx('exportDone'):tx('exportNext')}: ${text(item.label,code)} — ${text(item.detail,code)}`),'',
  `${tx('exportStyle')}:`,current.suggestedStyle
 ].join('\n');
}

function saveProject(){
 if(!current)return;
 let data;
 try{data=JSON.parse(localStorage.getItem('nsw-project-manager-v4')||'null')}catch(error){}
 const project=data?.projects?.find(item=>item.id===data.activeProjectId)||data?.projects?.[0];
 const track=project?.tracks?.[0];
 if(!track){$('siStatus').textContent=t('noProject');return}
 track.studioIntelligence=JSON.parse(JSON.stringify(current));
 track.updated=Date.now();
 project.updated=Date.now();
 localStorage.setItem('nsw-project-manager-v4',JSON.stringify(data));
 $('siStatus').textContent=t('snapshotSaved');
}

function stats(){
 const context=snapshot();
 $('siContextCount').textContent=t('signalCount',{count:Object.values(context).filter(Boolean).length});
}

function send(view,id,button){
 if(!current)return;
 root.NSWConnections?.navigate(view);
 root.setTimeout(()=>{
  const target=$(id);
  if(target){target.value=current.suggestedStyle;target.dispatchEvent(new Event('input',{bubbles:true}));$(button)?.click()}
 },70);
}

function renderInitial(){
 $('siBadge').textContent=t('brainReady');
 $('siStatus').textContent=t('readyInspect');
 $('siSummary').textContent=t('noAnalysis');
 $('siNextStep').textContent=t('nextPlaceholder');
 $('siWorkflowProgress').textContent=t('stepCount',{count:0});
 $('siActionCount').textContent=t('actionCount',{count:0});
 $('siStyleState').textContent=t('notGenerated');
 stats();
}

function refreshLanguage(){
 I18N?.apply?.();
 if(current)render();else renderInitial();
 renderHistory();
}

function init(){
 if(!$('siAnalyze'))return;
 $('siBrief').oninput=stats;
 $('siAnalyze').onclick=analyze;
 $('siImport').onclick=importContext;
 $('siExample').onclick=()=>{$('siBrief').value=t('example');stats()};
 $('siClear').onclick=()=>{$('siBrief').value='';current=null;$('siResults').classList.add('hidden');renderInitial()};
 $('siCopyReport').onclick=()=>navigator.clipboard?.writeText(report());
 $('siExport').onclick=()=>{
  if(!current)return;
  const blob=new Blob([JSON.stringify(current,null,2)],{type:'application/json'});
  const link=document.createElement('a');
  link.href=URL.createObjectURL(blob);
  link.download='studio-intelligence-report.json';
  link.click();
 };
 $('siSaveProject').onclick=saveProject;
 $('siApplySafe').onclick=applySafe;
 $('siOpenNext').onclick=()=>{const next=current?.workflow.find(item=>!item.done);if(next)root.NSWConnections?.navigate(next.view)};
 $('siRunPipeline').onclick=runPipeline;
 $('siUndo').onclick=undo;
 $('siCopyStyle').onclick=()=>navigator.clipboard?.writeText(current?.suggestedStyle||'');
 $('siSendHealth').onclick=()=>send('styleHealthView','shInput','shAnalyze');
 $('siSendProducer').onclick=()=>send('aiProducerView','aipBrief','aipProduce');
 $('siSendDirector').onclick=()=>send('songDirectorView','sdBrief','sdAnalyzeOnly');
 $('siClearHistory').onclick=()=>{localStorage.removeItem(HK);localStorage.removeItem(LEGACY_HK);renderHistory()};
 document.addEventListener('nordlicht-language-changed',refreshLanguage);
 refreshLanguage();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
else init();

root.NSWStudioIntelligence=Object.freeze({
 VERSION:'7.5.7',
 analyze,
 refreshLanguage,
 report,
 getCurrent:()=>current?JSON.parse(JSON.stringify(current)):null
});
})(typeof globalThis!=='undefined'?globalThis:this);


(function(){
'use strict';
const $=id=>document.getElementById(id),K=window.NSW_AI_PRODUCER_KNOWLEDGE;
const HK='nsw-studio-intelligence-history-v1',UK='nsw-studio-intelligence-undo-v1';
let current=null;
const esc=s=>String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const load=(k,d=[])=>{try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(d))}catch(e){return d}};
const store=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const split=s=>String(s||'').split(/[,;\n]+/).map(x=>x.trim()).filter(Boolean);
const uniq=a=>[...new Set(a.filter(Boolean))];

function snapshot(){
 const conn=window.NSWConnections?.snapshot?.()||{};
 let project=null;try{const p=JSON.parse(localStorage.getItem('nsw-project-manager-v4')||'null');const pr=p?.projects?.find(x=>x.id===p.activeProjectId)||p?.projects?.[0];project={name:pr?.name||'',track:pr?.tracks?.[0]||null}}catch(e){}
 return{
  style:$('siUseStyle')?.checked?($('customStyle')?.value||conn?.modules?.style?.data?.style||''):'',
  lyrics:$('siUseLyrics')?.checked?($('lyricsInput')?.value||conn?.modules?.lyrics?.data?.lyrics||''):'',
  bpm:$('bpm')?.value||'',
  project:$('siUseProject')?.checked?project:null,
  producer:window.NSW_AI_PRODUCER_LAST||null,
  health:window.NSW_STYLE_HEALTH_LAST||null,
  simplifier:window.NSW_STYLE_SIMPLIFIER_LAST||null,
  variation:window.NSW_VARIATION_ENGINE_LAST||null,
  conflict:window.NSW_CONFLICT_RESOLVER_LAST||null,
  songDirector:window.NSW_SONG_DIRECTOR_LAST||null
 };
}
function genreMatches(text){
 const t=String(text||'').toLowerCase();
 return (K?.genreProfiles||[]).map(p=>({p,score:p.patterns.reduce((n,x)=>n+(t.includes(x.toLowerCase())?(x.includes(' ')?12:8):0),0)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score);
}
function analyze(){
 const context=snapshot(),brief=$('siBrief').value.trim(),combined=[brief,context.style,context.lyrics?.slice(0,1200)].filter(Boolean).join('\n');
 if(!combined.trim()){$('siStatus').textContent='Add a goal or import Studio context first.';return}
 const styleTerms=split(context.style),genres=genreMatches(combined),primary=genres[0]?.p,secondary=genres[1]?.p;
 const issues=[],strengths=[],mentor=[],coach=[],mixer=[],sound=[],actions=[];
 if(!context.style)issues.push('No active STYLE is available. Start with AI Producer or Song Director.');
 else strengths.push(`A STYLE with ${styleTerms.length} terms is available.`);
 if(styleTerms.length>40){issues.push('The STYLE is long and may benefit from simplification.');actions.push({id:'simplify',label:'Simplify STYLE',detail:'Reduce repeated and low-priority terms.',safe:true,view:'styleSimplifierView'})}
 if(context.health?.score<80){issues.push(`The latest Health Check score is ${context.health.score}/100.`);actions.push({id:'health',label:'Repair Health Issues',detail:'Use the repaired STYLE from Style Health Check.',safe:true,view:'styleHealthView'})}
 if(context.conflict?.conflicts?.length){issues.push(`${context.conflict.conflicts.length} unresolved or recently detected conflict(s).`);actions.push({id:'conflict',label:'Resolve Conflicts',detail:'Apply the Conflict Resolver output.',safe:true,view:'conflictResolverView'})}
 if(genres.length>3){issues.push(`${genres.length} genre signals compete for attention.`);actions.push({id:'focus',label:'Focus Genre Blend',detail:'Keep one primary and one supporting genre.',safe:true,view:'aiProducerView'})}
 if(primary)strengths.push(`${primary.label} is the strongest musical identity.`);
 if(secondary)strengths.push(`${secondary.label} can work as a supporting influence.`);
 if(!/vocal|voice|choir|spoken|rap|growl|whisper/i.test(context.style))issues.push('The STYLE has no clear vocal direction.');
 else strengths.push('A vocal direction is present.');
 if(!/contrast|build|final|chorus|drop|bridge|section/i.test(context.style))issues.push('The STYLE does not clearly describe an energy or section arc.');
 else strengths.push('The prompt contains section or dynamic guidance.');

 mentor.push(primary?`Keep ${primary.label} as the main identity${secondary?` and use ${secondary.label} only as a supporting color`:''}.`:'Choose one clear main genre before adding detailed production terms.');
 mentor.push(issues.length?`Address the highest-impact issue first: ${issues[0]}`:'The concept is coherent; move to arrangement and final validation.');
 mentor.push('Use fewer simultaneous priorities and distribute complexity across song sections.');

 coach.push(...strengths.map(x=>'Strength: '+x));
 coach.push(...issues.slice(0,4).map(x=>'Improve: '+x));
 coach.push(context.lyrics?`Lyrics context detected with approximately ${context.lyrics.split(/\s+/).length} words.`:'No Lyrics Workspace content was detected.');

 if(primary&&secondary){
  mixer.push(`Primary: ${primary.label}. Supporting influence: ${secondary.label}.`);
  mixer.push(`Use ${primary.recommended.slice(0,3).join(', ')} as the core palette.`);
  mixer.push(`Introduce ${secondary.recommended.slice(0,2).join(', ')} only in transitions, bridge or final chorus.`);
 }else if(primary){
  mixer.push(`${primary.label} is sufficiently clear as a single main identity.`);
  mixer.push(`Potential alternatives: ${primary.alts.slice(0,2).join(' or ')}.`);
 }else mixer.push('No reliable genre blend could be detected. Start with AI Producer.');

 const sections=context.songDirector?.architecture?.map(x=>x.name)||['Intro','Verse','Pre-Chorus','Chorus','Bridge','Final Chorus'];
 sound.push(`Intro: establish the identity with ${primary?.recommended?.slice(0,2).join(' and ')||'one main motif and restrained texture'}.`);
 sound.push('Verse: reduce density and protect the vocal range.');
 sound.push('Chorus: widen the mix, strengthen drums and introduce the main hook.');
 sound.push('Bridge: remove one core layer to create contrast.');
 sound.push('Final Chorus: use the full palette, choir or harmony stack and the widest production.');
 if(primary?.production)sound.push(`Production anchor: ${primary.production}.`);

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

 const workflow=[
  {id:'producer',label:'AI Producer',view:'aiProducerView',done:!!context.producer,detail:'Confirm genre, tempo, vocals and palette.'},
  {id:'conflict',label:'Conflict Resolver',view:'conflictResolverView',done:!issues.some(x=>/conflict|compete/i.test(x)),detail:'Separate contradictory directions.'},
  {id:'simplifier',label:'Style Simplifier',view:'styleSimplifierView',done:styleTerms.length>0&&styleTerms.length<=32,detail:'Reduce prompt density.'},
  {id:'health',label:'Health Check',view:'styleHealthView',done:(context.health?.score||0)>=85,detail:'Validate final STYLE health.'},
  {id:'arrangement',label:'Arrangement',view:'arrangementDesignerView',done:!!context.songDirector?.architecture,detail:'Plan section energy and layers.'},
  {id:'vocals',label:'Vocal Director',view:'vocalDirectorView',done:!!window.NSW_VOCAL_DIRECTOR_V2_LAST,detail:'Assign performer roles.'},
  {id:'theory',label:'Music Theory',view:'theoryDirectorView',done:!!window.NSW_MUSIC_THEORY_DIRECTOR_LAST,detail:'Confirm key, mode and harmonic arc.'},
  {id:'predictor',label:'Success Predictor',view:'successPredictorView',done:false,detail:'Run final Suno readiness check.'}
 ];
 if(!actions.length)actions.push({id:'style',label:'Apply Coordinated STYLE',detail:'Use the Studio Intelligence STYLE as the new focused master prompt.',safe:true,view:'styleView'});
 actions.push({id:'producer',label:'Refresh AI Producer',detail:'Generate recommendations from the coordinated Studio context.',safe:false,view:'aiProducerView'});
 actions.push({id:'variation',label:'Create Alternatives',detail:'Generate controlled alternatives after the core is stable.',safe:false,view:'variationEngineView'});

 const readiness=Math.max(35,Math.min(98,88+strengths.length*3-issues.length*7+(context.health?.score>=85?5:0)));
 current={id:'si_'+Date.now(),createdAt:Date.now(),brief,role:$('siRole').value,tone:$('siTone').value,goal:$('siGoal').value,automation:$('siAutomation').value,context,primary:primary?.id||null,secondary:secondary?.id||null,issues,strengths,mentor,coach,mixer,sound,actions,workflow,suggestedStyle,readiness};
 window.NSW_STUDIO_INTELLIGENCE_LAST=JSON.parse(JSON.stringify(current));saveHistory();render();
 if($('siAutomation').value==='apply')applySafe();
}
function render(){
 const r=current;$('siResults').classList.remove('hidden');$('siScore').textContent=r.readiness;$('siGrade').textContent=r.readiness>=92?'A+':r.readiness>=84?'A':r.readiness>=74?'B+':r.readiness>=62?'B':'C';$('siScoreBar').style.width=r.readiness+'%';
 $('siSummary').textContent=r.issues.length?`${r.strengths.length} strengths and ${r.issues.length} improvement areas were detected.`:'The Studio state is coherent and ready for final development.';
 $('siMetrics').innerHTML=[['Strengths',r.strengths.length],['Issues',r.issues.length],['Actions',r.actions.length],['Workflow',r.workflow.filter(x=>x.done).length+'/'+r.workflow.length],['Primary',r.primary||'Unknown'],['Secondary',r.secondary||'None']].map(x=>`<div class="aip-metric"><small>${x[0]}</small><b>${esc(x[1])}</b></div>`).join('');
 const next=r.workflow.find(x=>!x.done);$('siNextStep').innerHTML=`<b>Recommended next step:</b><br>${next?`${next.label} — ${next.detail}`:'Final Success Predictor and export.'}`;
 $('siMentor').innerHTML=r.mentor.map(x=>`<div class="aip-message info">${esc(x)}</div>`).join('');
 $('siCoach').innerHTML=r.coach.map(x=>`<div class="aip-message ${x.startsWith('Improve')?'warn':'info'}">${esc(x)}</div>`).join('');
 $('siMixer').innerHTML=r.mixer.map(x=>`<div class="aip-message info">${esc(x)}</div>`).join('');
 $('siSound').innerHTML=r.sound.map(x=>`<div class="aip-message info">${esc(x)}</div>`).join('');
 $('siWorkflow').innerHTML=r.workflow.map((x,i)=>`<article class="si-step ${x.done?'done':(!x.done&&r.workflow.slice(0,i).every(y=>y.done)?'recommended':'')}" data-view="${x.view}"><b>${x.done?'✓ ':''}${esc(x.label)}</b><small>${esc(x.detail)}</small></article>`).join('');
 document.querySelectorAll('.si-step').forEach(x=>x.onclick=()=>window.NSWConnections?.navigate(x.dataset.view));
 $('siWorkflowProgress').textContent=`${r.workflow.filter(x=>x.done).length}/${r.workflow.length} complete`;
 $('siActions').innerHTML=r.actions.map((x,i)=>`<article class="si-action"><b>${esc(x.label)}</b><small>${esc(x.detail)}</small><label><input type="checkbox" data-action="${i}" ${x.safe?'checked':''}> Include action</label></article>`).join('');
 $('siActionCount').textContent=`${r.actions.length} actions`;
 $('siOutput').value=r.suggestedStyle;$('siStyleState').textContent='Coordinated STYLE ready';$('siBadge').textContent=`Readiness ${r.readiness}/100`;$('siContextCount').textContent=`${Object.values(r.context).filter(Boolean).length} connected signals`;$('siStatus').textContent='Studio Intelligence analysis complete.';
}
function applySafe(){
 if(!current)return;store(UK,{style:$('customStyle')?.value||'',lyrics:$('lyricsInput')?.value||'',bpm:$('bpm')?.value||''});
 const selected=[...document.querySelectorAll('[data-action]:checked')].map(x=>current.actions[+x.dataset.action]);
 if(selected.some(x=>['style','simplify','health','conflict'].includes(x.id))||!selected.length){
  const e=$('customStyle');if(e){e.value=current.suggestedStyle;e.dispatchEvent(new Event('input',{bubbles:true}));if(typeof generateOutput==='function')generateOutput()}
 }
 window.NSW_STUDIO_INTELLIGENCE_LAST=JSON.parse(JSON.stringify(current));$('siStatus').textContent=`Applied ${Math.max(1,selected.length)} safe Studio improvement(s).`;
}
function runPipeline(){
 if(!current)return;
 const e=$('customStyle');if(e){e.value=current.suggestedStyle;e.dispatchEvent(new Event('input',{bubbles:true}))}
 window.NSWConnections?.navigate('styleHealthView');
 setTimeout(()=>{const i=$('shInput');if(i){i.value=current.suggestedStyle;i.dispatchEvent(new Event('input',{bubbles:true}));$('shAnalyze')?.click()}},80);
 $('siStatus').textContent='Intelligent pipeline prepared: coordinated STYLE → Health Check.';
}
function undo(){const u=load(UK,null);if(!u){$('siStatus').textContent='No Studio Intelligence application to undo.';return}if($('customStyle'))$('customStyle').value=u.style||'';if($('lyricsInput'))$('lyricsInput').value=u.lyrics||'';if($('bpm'))$('bpm').value=u.bpm||'';localStorage.removeItem(UK);$('siStatus').textContent='Last Studio Intelligence application undone.'}
function importContext(){const c=snapshot(),parts=[];if(c.style)parts.push('Current STYLE: '+c.style);if(c.lyrics)parts.push('Lyrics concept: '+c.lyrics.slice(0,800));if(c.project?.name)parts.push('Project: '+c.project.name);$('siBrief').value=parts.join('\n\n')||'Inspect the current Studio and recommend the best next step.';stats()}
function saveHistory(){const h=load(HK);h.unshift({id:current.id,createdAt:current.createdAt,brief:current.brief,readiness:current.readiness,full:current});store(HK,h.slice(0,40));renderHistory()}
function renderHistory(){const h=load(HK);$('siHistory').innerHTML=h.length?h.map(x=>`<article class="aip-history-item"><header><b>${x.readiness}/100 · Studio Intelligence</b><small>${new Date(x.createdAt).toLocaleString()}</small></header><p>${esc((x.brief||'Studio context analysis').slice(0,240))}</p><button data-si-load="${x.id}">Load</button></article>`).join(''):'<div class="feature-empty">No Studio Intelligence history yet.</div>';document.querySelectorAll('[data-si-load]').forEach(b=>b.onclick=()=>{const x=load(HK).find(y=>y.id===b.dataset.siLoad);if(x?.full){current=x.full;$('siBrief').value=current.brief||'';render()}})}
function report(){if(!current)return'';return['STUDIO INTELLIGENCE REPORT',`Readiness: ${current.readiness}/100`,`Goal: ${current.goal}`,'','AI MENTOR:',...current.mentor.map(x=>'- '+x),'','AI SONG COACH:',...current.coach.map(x=>'- '+x),'','AI GENRE MIXER:',...current.mixer.map(x=>'- '+x),'','AI SOUND DESIGNER:',...current.sound.map(x=>'- '+x),'','WORKFLOW:',...current.workflow.map(x=>`- ${x.done?'DONE':'NEXT'}: ${x.label} — ${x.detail}`),'','STYLE:',current.suggestedStyle].join('\n')}
function saveProject(){if(!current)return;let p;try{p=JSON.parse(localStorage.getItem('nsw-project-manager-v4')||'null')}catch(e){}const pr=p?.projects?.find(x=>x.id===p.activeProjectId)||p?.projects?.[0],t=pr?.tracks?.[0];if(!t){$('siStatus').textContent='No active project track found.';return}t.studioIntelligence=JSON.parse(JSON.stringify(current));t.updated=Date.now();pr.updated=Date.now();localStorage.setItem('nsw-project-manager-v4',JSON.stringify(p));$('siStatus').textContent='Studio Intelligence snapshot saved.'}
function stats(){const c=snapshot();$('siContextCount').textContent=`${Object.values(c).filter(Boolean).length} connected signals`}
function send(view,id,button){if(!current)return;window.NSWConnections?.navigate(view);setTimeout(()=>{const e=$(id);if(e){e.value=current.suggestedStyle;e.dispatchEvent(new Event('input',{bubbles:true}));$(button)?.click()}},70)}
function init(){
 if(!$('siAnalyze'))return;
 $('siBrief').oninput=stats;$('siAnalyze').onclick=analyze;$('siImport').onclick=importContext;$('siExample').onclick=()=>{$('siBrief').value='Improve my Viking EDM anime opening. Keep female lead and deep male narrator, reduce overload, strengthen the final chorus and make the STYLE safer for Suno.';stats()};$('siClear').onclick=()=>{$('siBrief').value='';current=null;$('siResults').classList.add('hidden');stats()};
 $('siCopyReport').onclick=()=>navigator.clipboard?.writeText(report());$('siExport').onclick=()=>{if(!current)return;const b=new Blob([JSON.stringify(current,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='studio-intelligence-report.json';a.click()};$('siSaveProject').onclick=saveProject;
 $('siApplySafe').onclick=applySafe;$('siOpenNext').onclick=()=>{const n=current?.workflow.find(x=>!x.done);if(n)window.NSWConnections?.navigate(n.view)};$('siRunPipeline').onclick=runPipeline;$('siUndo').onclick=undo;
 $('siCopyStyle').onclick=()=>navigator.clipboard?.writeText(current?.suggestedStyle||'');$('siSendHealth').onclick=()=>send('styleHealthView','shInput','shAnalyze');$('siSendProducer').onclick=()=>send('aiProducerView','aipBrief','aipProduce');$('siSendDirector').onclick=()=>send('songDirectorView','sdBrief','sdAnalyzeOnly');
 $('siClearHistory').onclick=()=>{localStorage.removeItem(HK);renderHistory()};renderHistory();stats();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

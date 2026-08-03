
(function(){
'use strict';
const $=id=>document.getElementById(id),K=window.NSW_AI_PRODUCER_KNOWLEDGE;
const HK='nsw-ai-producer-history-v2',FK='nsw-ai-producer-feedback-v2';
let current=null;

const esc=s=>String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const uniq=a=>[...new Set(a.filter(Boolean))];
const load=(k,d=[])=>{try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(d))}catch(e){return d}};
const store=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const normalize=s=>String(s||'').toLowerCase().replace(/[–—]/g,'-');
const countTerm=(text,term)=>{const t=normalize(text),q=normalize(term);if(!q)return 0;let i=0,n=0;while((i=t.indexOf(q,i))>=0){n++;i+=q.length}return n};

function scoreGenreProfiles(brief){
 const text=normalize(brief),feedback=$('aipUseLearning')?.checked?load(FK):[];
 return K.genreProfiles.map(p=>{
  let score=0,hits=[];
  p.patterns.forEach(x=>{const n=countTerm(text,x);if(n){score+=n*(x.includes(' ')?12:8);hits.push(x)}});
  if(text.includes(p.family))score+=4;
  feedback.forEach(f=>{
   if(f.genre===p.id||f.choice===p.label){
    if(f.value==='accept')score+=3;
    if(f.value==='reject')score-=3;
   }
  });
  return{profile:p,score,hits};
 }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score);
}
function detectVocals(brief,genres){
 const text=normalize(brief),found=K.vocalProfiles.map(v=>{
  let score=0,hits=[];
  v.patterns.forEach(x=>{const n=countTerm(text,x);if(n){score+=n*10;hits.push(x)}});
  if(genres.some(g=>v.best.includes(g.profile.family)||v.best.includes(g.profile.id)))score+=2;
  return{profile:v,score,hits};
 }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score);
 if(found.length)return found.slice(0,3);
 const family=genres[0]?.profile.family;
 const defaults=K.vocalProfiles.filter(v=>v.best.includes(family)).slice(0,2);
 return defaults.map(v=>({profile:v,score:3,hits:['family match']}));
}
function detectProduction(brief){
 const text=normalize(brief);
 return K.productionProfiles.map(p=>({profile:p,score:p.patterns.reduce((n,x)=>n+countTerm(text,x)*10,0)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score);
}
function detectExplicitInstruments(brief){
 if(!$('aipUseEncyclopedia')?.checked||!window.NSW_WORLD_MUSIC_DATA)return[];
 const text=normalize(brief);
 return window.NSW_WORLD_MUSIC_DATA.instruments.filter(i=>text.includes(normalize(i.name))).map(i=>i.name);
}
function worldSuggestions(brief){
 if(!$('aipUseWorld')?.checked||!window.NSW_WORLD_MUSIC_DATA)return[];
 const text=normalize(brief),w=window.NSW_WORLD_MUSIC_DATA.worlds.find(x=>text.includes(normalize(x.name))||text.includes(normalize(x.id))||x.genres.some(g=>text.includes(normalize(g))));
 if(!w)return[];
 return window.NSW_WORLD_MUSIC_DATA.instruments.filter(i=>i.world===w.name&&i.status==='Reliable').slice(0,3).map(i=>i.name);
}
function detectConflicts(brief,selectedProfiles,vocals,instruments){
 const text=normalize(brief),out=[];
 K.conflictRules.forEach(r=>{
  const a=r.a.some(x=>text.includes(normalize(x))),b=r.b.some(x=>text.includes(normalize(x)));
  if(a&&b)out.push(r.message);
 });
 if(selectedProfiles.length>2)out.push('More than two strong genre identities were detected; the Producer keeps one primary and one supporting identity.');
 if(instruments.length>8)out.push('The requested instrument palette is too dense; the Producer reduced it to core roles.');
 if(vocals.length>4)out.push('Too many vocal identities may reduce reliable voice separation.');
 return uniq(out);
}
function learningSummary(){
 const a=$('aipUseLearning')?.checked?load(FK):[];
 return{entries:a.length,accepted:a.filter(x=>x.value==='accept').length,rejected:a.filter(x=>x.value==='reject').length};
}
function arrangement(target,primary){
 const base=K.arrangements[target]||K.arrangements['Complete Song'];
 const notes=base.map((name,i)=>({name,role:i===0?'Establish identity':/chorus|climax|impact/i.test(name)?'Main payoff':/bridge|contrast|reset/i.test(name)?'Contrast and reset':'Develop motif and story'}));
 return{sections:notes,summary:`${base.length} sections · ${primary.meter} · ${primary.energy} energy profile`};
}
function sunoGuidance(style,instruments,conflicts){
 const guidance=[];
 K.sunoTerms.forEach(t=>{if(normalize(style).includes(normalize(t.term))||t.rating>=5)guidance.push(t)});
 if(instruments.length>6)guidance.push({term:'Reduce simultaneous instruments',rating:3,note:'Use the full palette across sections rather than all at once.'});
 if(conflicts.length)guidance.push({term:'Resolve section conflicts',rating:3,note:'Assign contradictory directions to different sections.'});
 return uniq(guidance.map(x=>JSON.stringify(x))).map(x=>JSON.parse(x)).slice(0,6);
}
function produce(){
 const brief=$('aipBrief').value.trim();
 if(!brief){$('aipStatus').textContent='Add a producer briefing first.';return}
 const ranked=scoreGenreProfiles(brief);
 const primary=ranked[0]?.profile||K.genreProfiles.find(x=>x.id==='epic-trailer');
 const secondary=ranked[1]&&ranked[1].score>=Math.max(8,(ranked[0]?.score||0)*.45)?ranked[1].profile:null;
 const selected=ranked.slice(0,secondary?2:1);
 const profile=K.profiles[$('aipProfile').value];
 const explicitBpm=Number((brief.match(/\b(\d{2,3})\s*bpm/i)||[])[1]);
 const bpm=explicitBpm||Math.round((primary.bpm[0]+primary.bpm[1])/2+profile.tempoBias);
 const vocalMatches=detectVocals(brief,selected),vocals=uniq(vocalMatches.map(x=>x.profile.label).concat(primary.vocals)).slice(0,3);
 const explicitInst=detectExplicitInstruments(brief),worldInst=worldSuggestions(brief);
 const instruments=uniq([...explicitInst,...worldInst,...primary.recommended,...(secondary?secondary.recommended.slice(0,3):[])]).slice(0,profile.maxInstruments);
 const prodMatches=detectProduction(brief),prod=prodMatches[0]?.profile;
 const conflicts=detectConflicts(brief,ranked,vocals,instruments);
 const arr=arrangement($('aipTarget').value,primary);
 const avoid=uniq([...primary.avoid,...(secondary?secondary.avoid:[])]).slice(0,8);
 const notes=uniq([...primary.notes,...(secondary?secondary.notes:[]),profile.note,prod?`${prod.label}: ${prod.terms.join(', ')}`:'']).filter(Boolean);
 const genreLabel=secondary?`${primary.label} with ${secondary.label} influence`:primary.label;
 const productionTerms=prod?.terms||[primary.production,'Clear Voice Separation','Controlled Contrast'];
 const style=uniq([genreLabel,`${bpm} BPM`,primary.meter,primary.modes.slice(0,2).join(' and '),vocals.join(', '),instruments.join(', '),productionTerms.join(', '),'Section-Specific Arrangement']).join(', ');
 const guidance=sunoGuidance(style,instruments,conflicts);
 const learn=learningSummary();
 let confidence=88+(explicitBpm?3:0)+(explicitInst.length?3:0)-conflicts.length*5-(secondary?2:0);
 confidence=Math.max(52,Math.min(98,confidence));
 const alternatives=uniq([...primary.alts,...(secondary?secondary.alts:[])]).slice(0,5).map((name,i)=>({name,score:Math.max(62,confidence-i*5),reason:i===0?'Closest alternative to the recommended core.':i===1?'More accessible and hook-focused.':i===2?'More cinematic and expansive.':'A different creative emphasis while preserving the main identity.'}));
 const decisions=[
  {key:'genre',title:'Genre',value:genreLabel,confidence,reason:`Matched ${selected.map(x=>x.hits.join(', ')||x.profile.family).join(' + ')} in the briefing.`},
  {key:'bpm',title:'Tempo',value:`${bpm} BPM`,confidence:explicitBpm?98:87,reason:explicitBpm?'The requested BPM was preserved.':`Chosen from the ${primary.bpm[0]}–${primary.bpm[1]} BPM profile range.`},
  {key:'vocals',title:'Vocals',value:vocals.join(', '),confidence:86,reason:'Combined explicit vocal signals with genre-compatible voice profiles.'},
  {key:'instruments',title:'Instruments',value:instruments.join(', '),confidence:89,reason:'Built a focused palette across lead, rhythm, harmony and texture roles.'},
  {key:'theory',title:'Theory',value:`${primary.modes.slice(0,2).join(' / ')} · ${primary.meter}`,confidence:82,reason:'Uses the modal and metric vocabulary of the selected profile.'},
  {key:'production',title:'Production',value:productionTerms.join(', '),confidence:86,reason:'Uses the selected producer profile and detected production language.'}
 ];
 current={id:'aip_'+Date.now(),createdAt:Date.now(),brief,profile:$('aipProfile').value,target:$('aipTarget').value,language:$('aipLanguage').value,primary:primary.id,secondary:secondary?.id||null,rankedProfiles:ranked.slice(0,6).map(x=>({id:x.profile.id,label:x.profile.label,family:x.profile.family,score:x.score,hits:x.hits})),vocalProfiles:vocalMatches.map(x=>({id:x.profile.id,label:x.profile.label,score:x.score,hits:x.hits})),productionProfiles:prodMatches.map(x=>({id:x.profile.id,label:x.profile.label,score:x.score})),decisions,instruments,vocals,avoid,notes,conflicts,alternatives,arrangement:arr,sunoGuidance:guidance,style,confidence,learning:learn,knowledgeVersion:K.version};
 window.NSW_AI_PRODUCER_LAST=JSON.parse(JSON.stringify(current));
 saveHistory();render();
}
function render(){
 const r=current;
 $('aipResults').classList.remove('hidden');
 $('aipScore').textContent=r.confidence;
 $('aipGrade').textContent=r.confidence>=92?'A+':r.confidence>=84?'A':r.confidence>=75?'B+':'B';
 $('aipScoreBar').style.width=r.confidence+'%';
 $('aipBadge').textContent=`${r.primary}${r.secondary?' + '+r.secondary:''} · KB ${r.knowledgeVersion}`;
 $('aipSummary').textContent=`The Producer recommends ${r.decisions[0].value} at ${r.decisions[1].value}, using ${r.instruments.slice(0,4).join(', ')}.`;
 $('aipMetrics').innerHTML=[['Profile',r.profile],['Target',r.target],['Genre profiles',r.rankedProfiles.length],['Instruments',r.instruments.length],['Vocal roles',r.vocals.length],['Conflicts',r.conflicts.length]].map(x=>`<div class="aip-metric"><small>${x[0]}</small><b>${esc(x[1])}</b></div>`).join('');
 $('aipDecisionGrid').innerHTML=r.decisions.map(d=>`<article class="aip-decision"><header><h3>${d.title}</h3><span class="aip-confidence">${d.confidence}%</span></header><strong>${esc(d.value)}</strong><p>${esc(d.reason)}</p></article>`).join('');
 $('aipRecommended').innerHTML=[['Genre',r.decisions[0].value],['Tempo',r.decisions[1].value],['Vocals',r.vocals.join(', ')],['Core Palette',r.instruments.join(', ')],['Theory',r.decisions[4].value]].map(x=>`<div class="aip-list-item"><b>${x[0]}</b><small>${esc(x[1])}</small></div>`).join('');
 $('aipAvoid').innerHTML=(r.avoid.length?r.avoid:['No specific avoid-list needed.']).map(x=>`<div class="aip-list-item"><b>${esc(x)}</b><small>Lower priority or possible conflict for this direction.</small></div>`).join('');
 $('aipAlternatives').innerHTML=r.alternatives.map((a,i)=>`<article class="aip-alt"><header><b>${i+1}. ${esc(a.name)}</b><span>${a.score}%</span></header><p>${esc(a.reason)}</p><button data-alt="${i}">Use Alternative</button></article>`).join('');
 document.querySelectorAll('[data-alt]').forEach(b=>b.onclick=()=>{const a=r.alternatives[+b.dataset.alt];r.decisions[0].value=a.name;r.style=r.style.replace(/^[^,]+/,a.name);render()});
 $('aipNotes').innerHTML=[...r.notes,...r.conflicts].map((x,i)=>`<div class="aip-message ${i>=r.notes.length?'warn':'info'}">${esc(x)}</div>`).join('');
 $('aipStyleOutput').value=r.style;
 $('aipStyleHealth').textContent=r.conflicts.length?`Review ${r.conflicts.length} conflict(s)`:'Focused and coherent';
 $('aipFeedbackGrid').innerHTML=r.decisions.map(d=>`<article class="aip-feedback"><b>${d.title}: ${esc(d.value)}</b><small>Teach the local Producer whether this advice fits your taste.</small><div><button data-fb="${d.key}" data-v="accept">✓ Accept</button><button data-fb="${d.key}" data-v="reject">✕ Reject</button></div></article>`).join('');
 document.querySelectorAll('[data-fb]').forEach(b=>b.onclick=()=>feedback(b.dataset.fb,b.dataset.v));
 $('aipLearningCount').textContent=`${load(FK).length} feedback entries`;
 renderKnowledgeTrace();
 $('aipStatus').textContent=`Producer recommendation complete · ${r.confidence}% confidence · ${K.stats.genreProfiles} genre profiles available.`;
}
function renderKnowledgeTrace(){
 const r=current;
 $('aipKnowledgeSummary').textContent=`${K.stats.genreProfiles} genres · ${K.stats.vocalProfiles} vocals · ${K.stats.conflictRules} conflict rules`;
 $('aipDetectedProfiles').innerHTML=r.rankedProfiles.map(x=>`<div class="aip-trace-item"><b>${esc(x.label)}<span class="aip-trace-score">${x.score}</span></b>${esc(x.family)} · ${esc((x.hits||[]).join(', ')||'context match')}</div>`).join('')+(r.vocalProfiles.length?r.vocalProfiles.map(x=>`<div class="aip-trace-item"><b>${esc(x.label)}</b>Vocal profile · ${esc((x.hits||[]).join(', ')||'genre match')}</div>`).join(''):'');
 $('aipArrangement').innerHTML=`<div class="aip-trace-item"><b>${esc(r.arrangement.summary)}</b>${r.arrangement.sections.map(x=>`${x.name}: ${x.role}`).join('<br>')}</div>`;
 $('aipSunoGuidance').innerHTML=r.sunoGuidance.map(x=>`<div class="aip-trace-item"><b>${esc(x.term)}<span class="aip-trace-score">${'★'.repeat(Math.min(5,x.rating))}</span></b>${esc(x.note)}</div>`).join('');
}
function browseKnowledge(){
 const q=normalize($('aipKnowledgeSearch').value);
 const items=[
  ...K.genreProfiles.map(x=>({type:'Genre',name:x.label,detail:`${x.family} · ${x.bpm[0]}–${x.bpm[1]} BPM · ${x.recommended.slice(0,3).join(', ')}`,search:JSON.stringify(x)})),
  ...K.vocalProfiles.map(x=>({type:'Vocal',name:x.label,detail:`${x.range} · ${x.production}`,search:JSON.stringify(x)})),
  ...K.productionProfiles.map(x=>({type:'Production',name:x.label,detail:x.terms.join(', '),search:JSON.stringify(x)}))
 ].filter(x=>!q||normalize(x.search).includes(q)).slice(0,80);
 $('aipKbCount').textContent=`${items.length} results`;
 $('aipKnowledgeResults').innerHTML=items.map(x=>`<article class="aip-kb-item"><b>${esc(x.name)}</b><small>${esc(x.detail)}</small><span>${x.type}</span></article>`).join('')||'<div class="feature-empty">No matching knowledge profiles.</div>';
}
function feedback(key,value){
 const a=load(FK),d=current.decisions.find(x=>x.key===key);
 a.unshift({createdAt:Date.now(),key,value,choice:d?.value,genre:current.primary,profile:current.profile});
 store(FK,a.slice(0,500));
 $('aipLearningCount').textContent=`${a.length} feedback entries`;
 $('aipStatus').textContent=`Producer advice marked as ${value}ed.`;
}
function saveHistory(){
 const h=load(HK);
 h.unshift({id:current.id,createdAt:current.createdAt,brief:current.brief,confidence:current.confidence,genre:current.decisions[0].value,full:current});
 store(HK,h.slice(0,40));renderHistory();
}
function renderHistory(){
 const h=load(HK);
 $('aipHistory').innerHTML=h.length?h.map(x=>`<article class="aip-history-item"><header><b>${x.confidence}% · ${esc(x.genre)}</b><small>${new Date(x.createdAt).toLocaleString()}</small></header><p>${esc(x.brief.slice(0,240))}</p><button data-load="${x.id}">Load</button></article>`).join(''):'<div class="feature-empty">No Producer history yet.</div>';
 document.querySelectorAll('[data-load]').forEach(b=>b.onclick=()=>{const x=load(HK).find(v=>v.id===b.dataset.load);if(x?.full){current=x.full;$('aipBrief').value=current.brief;stats();render()}});
}
function applyStyle(){
 if(!current)return;const e=$('customStyle');if(!e)return;
 e.value=$('aipPreserve').checked?(window.NSWConnections?.mergeStyle([e.value,current.style])||[e.value,current.style].filter(Boolean).join(', ')):current.style;
 e.dispatchEvent(new Event('input',{bubbles:true}));if(typeof generateOutput==='function')generateOutput();$('aipStatus').textContent='Producer STYLE applied.';
}
function report(){
 if(!current)return'';
 return['AI PRODUCER KNOWLEDGE BASE 2.0 REPORT',`Brief: ${current.brief}`,`Confidence: ${current.confidence}%`,`Profile: ${current.profile}`,'',...current.decisions.map(x=>`${x.title}: ${x.value}\nReason: ${x.reason}`),'','Detected Knowledge:',...current.rankedProfiles.map(x=>`- ${x.label}: ${x.score}`),'','Avoid:',...current.avoid.map(x=>'- '+x),'','Producer Notes:',...current.notes.map(x=>'- '+x),'','Arrangement:',...current.arrangement.sections.map(x=>`- ${x.name}: ${x.role}`),'','STYLE:',current.style].join('\n\n');
}
function stats(){
 const t=$('aipBrief').value.trim(),f=scoreGenreProfiles(t);
 $('aipStats').textContent=`${t.split(/\s+/).filter(Boolean).length} words · ${f.length} knowledge matches`;
}
function saveProject(){
 if(!current)return;let p;try{p=JSON.parse(localStorage.getItem('nsw-project-manager-v4')||'null')}catch(e){}
 const pr=p?.projects?.find(x=>x.id===p.activeProjectId)||p?.projects?.[0],t=pr?.tracks?.[0];
 if(!t){$('aipStatus').textContent='No active project track found.';return}
 t.aiProducer=JSON.parse(JSON.stringify(current));t.updated=Date.now();pr.updated=Date.now();localStorage.setItem('nsw-project-manager-v4',JSON.stringify(p));$('aipStatus').textContent='Producer plan saved to active project.';
}
function init(){
 if(!$('aipProduce')||!K)return;
 $('aipBrief').oninput=stats;
 $('aipProduce').onclick=produce;
 $('aipExample').onclick=()=>{$('aipBrief').value='Viking rap with anime opening energy, male rap lead, female final chorus, Tagelharpa, Nyckelharpa, cinematic drums and 112 BPM.';stats()};
 $('aipClear').onclick=()=>{$('aipBrief').value='';current=null;$('aipResults').classList.add('hidden');stats()};
 $('aipImport').onclick=()=>{const s=window.NSWConnections?.snapshot();$('aipBrief').value=`Current STYLE: ${s?.modules?.style?.data?.style||''}\nCurrent Lyrics concept: ${(s?.modules?.lyrics?.data?.lyrics||'').slice(0,700)}`;stats()};
 $('aipApplyStyle').onclick=applyStyle;
 $('aipCopyStyle').onclick=()=>navigator.clipboard?.writeText(current?.style||'');
 $('aipCopyReport').onclick=()=>navigator.clipboard?.writeText(report());
 $('aipExport').onclick=()=>{if(!current)return;const b=new Blob([JSON.stringify(current,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='ai-producer-kb2-plan.json';a.click()};
 $('aipSaveProject').onclick=saveProject;
 $('aipSendDirector').onclick=()=>{if(!current)return;window.NSWConnections?.navigate('songDirectorView');setTimeout(()=>{const e=$('sdBrief');if(e){e.value=current.brief+'\n\nProducer Recommendation: '+current.style;e.dispatchEvent(new Event('input',{bubbles:true}))}},60)};
 $('aipRunPredictor').onclick=()=>{applyStyle();window.NSWConnections?.sync('studio-to-predictor')};
 $('aipClearHistory').onclick=()=>{localStorage.removeItem(HK);renderHistory()};
 $('aipKnowledgeSearch').oninput=browseKnowledge;
 stats();renderHistory();browseKnowledge();
 $('aipLearningCount').textContent=`${load(FK).length} feedback entries`;
 $('aipKnowledgeSummary').textContent=`${K.stats.genreProfiles} genres · ${K.stats.vocalProfiles} vocals · ${K.stats.conflictRules} conflicts`;
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

(function(root){
'use strict';

function freezeStep(definition){
 return Object.freeze({
  ...definition,
  location:Object.freeze({...definition.location}),
  focus:Object.freeze({
   primary:Object.freeze({...definition.focus.primary}),
   secondary:Object.freeze({...definition.focus.secondary})
  })
 });
}

// Stable IDs decouple translations and persistence from the visual order. A tour
// can therefore gain, lose or reorder steps without shifting localized content.
const STEPS=Object.freeze([
 freezeStep({
  id:'workspace-create',icon:'🎲',kind:'workspace',
  title:'CREATE Workspace',
  text:'Hier startest du neue Songs: Ideen erzeugen, STYLE und Vocals gestalten, Lyrics schreiben und intelligente Directors oder Producer nutzen.',
  location:{workspace:'create',view:'randomView'},
  focus:{
   primary:{selector:'.workspace-nav-group[data-workspace="create"] > .workspace-group-toggle',padding:6},
   secondary:{selector:'#randomView .panel',fallback:'#randomView',padding:10}
  }
 }),
 freezeStep({
  id:'lyrics-workspace',icon:'✍️',kind:'feature',
  title:'Lyrics Workspace',
  text:'Schreibe und strukturiere hier deinen Songtext. MetaTags kannst du rechts suchen und per Drag & Drop an die gewünschte Stelle im Editor ziehen – oder mit ＋ einfügen.',
  location:{workspace:'create',view:'lyricsView'},
  focus:{
   primary:{selector:'#lyricsTagLibrary',fallback:'#lyricsView .lyrics-tag-panel',padding:8},
   secondary:{selector:'#lyricsView .lyrics-editor-shell',fallback:'#lyricsEditor',padding:10}
  }
 }),
 freezeStep({
  id:'workspace-analyze',icon:'🔍',kind:'workspace',
  title:'ANALYZE Workspace',
  text:'Hier verstehst und verbesserst du vorhandene STYLEs und Lyrics: DNA analysieren, Konflikte finden, Varianten entwickeln und Prompts optimieren.',
  location:{workspace:'analyze',view:'dnaAnalyzerView'},
  focus:{
   primary:{selector:'.workspace-nav-group[data-workspace="analyze"] > .workspace-group-toggle',padding:6},
   secondary:{selector:'#dnaAnalyzerView .panel',fallback:'#dnaAnalyzerView',padding:10}
  }
 }),
 freezeStep({
  id:'workspace-knowledge',icon:'📚',kind:'workspace',
  title:'KNOWLEDGE Workspace',
  text:'Deine Musik-Enzyklopädie für Genres, Instrumente, MetaTags, Arrangements, Vocals, Produktion und Musiktheorie.',
  location:{workspace:'knowledge',view:'genreIntelligenceView'},
  focus:{
   primary:{selector:'.workspace-nav-group[data-workspace="knowledge"] > .workspace-group-toggle',padding:6},
   secondary:{selector:'#genreIntelligenceView .panel',fallback:'#genreIntelligenceView',padding:10}
  }
 }),
 freezeStep({
  id:'workspace-project',icon:'⚙️',kind:'workspace',
  title:'PROJECT Workspace',
  text:'Hier organisierst du Alben, Tracks und Versionen und speicherst Presets, damit du jederzeit zu einem früheren Stand zurückkehren kannst.',
  location:{workspace:'project',view:'projectManagerView'},
  focus:{
   primary:{selector:'.workspace-nav-group[data-workspace="project"] > .workspace-group-toggle',padding:6},
   secondary:{selector:'#projectManagerView .panel',fallback:'#projectManagerView',padding:10}
  }
 }),
 freezeStep({
  id:'studio-intelligence',icon:'🧠',kind:'feature',
  title:'Studio Intelligence',
  text:'Wenn du nicht weißt, wie es weitergeht, hilft dir das Gehirn des Studios: Es verbindet Module, bewertet den Stand und empfiehlt den nächsten sinnvollen Schritt.',
  location:{workspace:'create',view:'studioIntelligenceView'},
  focus:{
   primary:{selector:'.nav[data-view="studioIntelligenceView"]',padding:6},
   secondary:{selector:'#studioIntelligenceView .si-command-panel',fallback:'#studioIntelligenceView',padding:10}
  }
 })
]);

const TIPS=Object.freeze({
 randomView:Object.freeze(['Smart Randomizer','Nutze „Überrasch mich“, um ungewöhnliche Kombinationen zu entdecken.']),
 styleView:Object.freeze(['Style Builder','Beginne mit Genre und Vocals. Instrumente und Produktion kannst du danach gezielt ergänzen.']),
 songDirectorView:Object.freeze(['Song Director','Ein kurzer, klarer Satz reicht. Der Director entwickelt daraus einen vollständigen Songplan.']),
 aiProducerView:Object.freeze(['AI Producer','Der Producer ist am stärksten, wenn du Ziel, Stimmung, Vocals und gewünschte Klangwelt erwähnst.']),
 instrumentsView:Object.freeze(['Instrument DNA','Klicke auf eine Instrumentenkarte, um Klang, Rolle, Genres, Pairings und Suno-Hinweise zu öffnen.']),
 styleHealthView:Object.freeze(['Style Health Check','Prüfe deinen STYLE vor dem Export auf Wiederholungen, Konflikte und zu viele Instrumente.']),
 projectManagerView:Object.freeze(['Project Manager','Speichere wichtige Zwischenstände, bevor du große automatische Änderungen übernimmst.']),
 studioIntelligenceView:Object.freeze(['Studio Intelligence','Nutze dieses Modul, wenn du nicht weißt, welcher Arbeitsschritt als Nächstes sinnvoll ist.'])
});

const REQUIRED_IDS=Object.freeze([
 'fseRoot','fseWelcome','fseCloseWelcome','fseTourCard','fseTourCounter','fseTourIcon','fseTourTitle','fseTourText','fseTourProgress','fseTourBack','fseTourNext','fseSkipTour','fseDone','fseCompleteList','fseFinish','fseHelpButton','fseHelpMenu','fseTip','fseTipClose','fseTipTitle','fseTipText'
]);

function createView(options={}){
 const win=options.window||root;
 const doc=options.document||win.document;
 const $=id=>doc.getElementById(id);
 const elements=Object.fromEntries(REQUIRED_IDS.map(id=>[id,$(id)]));
 const missingIds=REQUIRED_IDS.filter(id=>!elements[id]);
 const available=missingIds.length===0;
 let currentState=null;
 let activeFocus=null;
 let layoutFrame=0;
 let navigationToken=0;
 let previousFocus=null;
 const cleanups=[];

 function translation(){return win.NSW_FSE_ACTIVE_TRANSLATION||win.NSW_FSE_I18N?.en||null}
 function rootState(phase){return phase==='welcome'||phase==='tour'||phase==='complete'?phase:'closed'}
 function isLocked(phase){return phase==='welcome'||phase==='tour'||phase==='complete'}
 function rememberChoice(){return $('fseDoNotShow')?.checked!==false}

 function translatedStep(index){
  const base=STEPS[index]||STEPS[0];
  const row=translation()?.steps?.[base.id];
  return row?{...base,title:row.title||base.title,text:row.text||base.text}:base;
 }

 function tipContent(tip){
  if(!tip)return null;
  const language=translation();
  if(tip.kind==='beginner')return[
   language?.tipBeginnerTitle||'Anfängeransicht aktiv',
   language?.tipBeginnerText||'Zunächst sind nur die wichtigsten Module sichtbar.'
  ];
  if(tip.kind==='expert')return[
   language?.all||'Expertenansicht aktiv',
   language?.expertd||'Alle Module und Expertenfunktionen sind sichtbar.'
  ];
  return TIPS[tip.view]||null;
 }

 function renderTourContent(state){
  const data=translatedStep(state.tourStep);
  const language=translation();
  elements.fseTourCard.dataset.fseStep=data.id;
  elements.fseTourCard.dataset.fseKind=data.kind;
  elements.fseTourCounter.textContent=`${state.tourStep+1} / ${STEPS.length}`;
  elements.fseTourIcon.textContent=data.icon;
  elements.fseTourTitle.textContent=data.title;
  elements.fseTourText.textContent=data.text;
  elements.fseTourProgress.style.width=`${((state.tourStep+1)/STEPS.length)*100}%`;
  elements.fseTourBack.disabled=state.tourStep===0;
  elements.fseTourBack.textContent=language?.back||'← Zurück';
  elements.fseTourNext.textContent=state.tourStep===STEPS.length-1?(language?.finish||'Tour beenden 🎉'):(language?.next||'Weiter →');
 }

 function renderCompleteList(){
  elements.fseCompleteList.replaceChildren(...STEPS.map((step,index)=>{
   const item=doc.createElement('span');
   item.textContent=`✓ ${translatedStep(index).title}`;
   item.dataset.fseCompletedStep=step.id;
   return item;
  }));
 }

 function renderTip(state){
  const content=tipContent(state.tip);
  const visible=state.phase==='ready'&&!!content;
  elements.fseTip.hidden=!visible;
  elements.fseTip.setAttribute('aria-hidden',String(!visible));
  if(content){
   elements.fseTipTitle.textContent=content[0];
   elements.fseTipText.textContent=content[1];
  }
 }

 function focusPhase(previous,state){
  const wasLocked=previous?isLocked(previous.phase):false;
  const nowLocked=isLocked(state.phase);
  if(!wasLocked&&nowLocked)previousFocus=doc.activeElement;
  if(wasLocked&&!nowLocked){
   const target=previousFocus?.isConnected?previousFocus:elements.fseHelpButton;
   previousFocus=null;
   win.requestAnimationFrame?.(()=>target?.focus());
   return;
  }
  if(previous?.phase===state.phase)return;
  const target=state.phase==='welcome'
   ?doc.querySelector('[data-fse-choice="tour"]')
   :state.phase==='tour'
    ?elements.fseTourNext
    :state.phase==='complete'
     ?elements.fseFinish
     :null;
  win.requestAnimationFrame?.(()=>target?.focus());
 }

 function render(state,previous=currentState){
  if(!available)return;
  const phase=rootState(state.phase);
  elements.fseRoot.dataset.fseState=phase;
  elements.fseRoot.setAttribute('aria-hidden',String(phase==='closed'));
  doc.body.classList.toggle('fse-locked',isLocked(state.phase));
  doc.body.dataset.fseProfile=state.profile;
  doc.body.dataset.fsePhase=state.phase;

  const helpVisible=state.phase==='ready'&&state.helpOpen;
  elements.fseHelpButton.hidden=state.phase!=='ready';
  elements.fseHelpMenu.hidden=!helpVisible;
  elements.fseHelpMenu.setAttribute('aria-hidden',String(!helpVisible));
  elements.fseHelpButton.setAttribute('aria-expanded',String(helpVisible));
  doc.querySelector('[data-fse-action="beginner"]')?.classList.toggle('active',state.profile==='beginner');
  doc.querySelector('[data-fse-action="expert"]')?.classList.toggle('active',state.profile==='expert');

  if(state.phase==='tour')renderTourContent(state);
  if(state.phase==='complete')renderCompleteList();
  if(previous?.phase==='tour'&&state.phase!=='tour')clearTourLayout();
  renderTip(state);
  focusPhase(previous,state);
  if(!previous?.helpOpen&&helpVisible)win.requestAnimationFrame?.(()=>elements.fseHelpMenu.querySelector('button')?.focus());
  currentState=state;
 }

 function listen(target,type,handler,options){
  if(!target)return;
  target.addEventListener(type,handler,options);
  cleanups.push(()=>target.removeEventListener(type,handler,options));
 }

 function currentDialog(){
  if(currentState?.phase==='welcome')return elements.fseWelcome;
  if(currentState?.phase==='tour')return elements.fseTourCard;
  if(currentState?.phase==='complete')return elements.fseDone;
  return null;
 }

 function trapFocus(event){
  if(event.key!=='Tab')return;
  const dialog=currentDialog();
  if(!dialog)return;
  const focusable=[...dialog.querySelectorAll('button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')]
   .filter(element=>element.getClientRects().length>0);
  if(!focusable.length)return;
  const first=focusable[0],last=focusable[focusable.length-1];
  if(event.shiftKey&&doc.activeElement===first){event.preventDefault();last.focus()}
  else if(!event.shiftKey&&doc.activeElement===last){event.preventDefault();first.focus()}
 }

 function bind({dispatch,getState}){
  if(!available)return()=>{};
  listen(elements.fseRoot,'click',event=>{
   const choice=event.target.closest('[data-fse-choice]')?.dataset.fseChoice;
   if(choice==='quick')dispatch({type:'SELECT_QUICK',remember:rememberChoice()});
   if(choice==='expert')dispatch({type:'SELECT_EXPERT',remember:rememberChoice()});
   if(choice==='tour')dispatch({type:'START_TOUR',remember:rememberChoice()});
  });
  listen(elements.fseCloseWelcome,'click',()=>dispatch({type:'CLOSE_WELCOME',remember:rememberChoice()}));
  listen(elements.fseTourNext,'click',()=>dispatch({type:'TOUR_NEXT'}));
  listen(elements.fseTourBack,'click',()=>dispatch({type:'TOUR_BACK'}));
  listen(elements.fseSkipTour,'click',()=>dispatch({type:'TOUR_SKIP'}));
  listen(elements.fseFinish,'click',()=>dispatch({type:'COMPLETE_ACK'}));
  listen(elements.fseHelpButton,'click',event=>{event.stopPropagation();dispatch({type:'TOGGLE_HELP'})});
  listen(elements.fseHelpMenu,'click',event=>{
   const action=event.target.closest('[data-fse-action]')?.dataset.fseAction;
   const eventByAction={tour:'RESTART_TOUR',beginner:'SET_BEGINNER',expert:'SET_EXPERT',reset:'RESET'};
   if(eventByAction[action])dispatch({type:eventByAction[action]});
  });
  listen(elements.fseTipClose,'click',()=>dispatch({type:'TIP_DISMISS'}));
  listen(doc,'click',event=>{
   if(!event.target.closest('#fseHelpMenu,#fseHelpButton'))dispatch({type:'CLOSE_HELP'});
  });
  listen(doc,'click',event=>{
   const nav=event.target.closest('[data-view]');
   if(nav?.dataset.view)dispatch({type:'NAVIGATED',view:nav.dataset.view});
  },true);
  listen(win,'resize',scheduleTourLayout);
  listen(win,'scroll',scheduleTourLayout,true);
  listen(doc,'keydown',event=>{
   trapFocus(event);
   if(event.key!=='Escape')return;
   const state=getState();
   if(state.helpOpen)dispatch({type:'CLOSE_HELP'});
   else if(state.phase==='welcome')dispatch({type:'CLOSE_WELCOME',remember:rememberChoice()});
   else if(state.phase==='tour')dispatch({type:'TOUR_SKIP'});
   else if(state.phase==='complete')dispatch({type:'COMPLETE_ACK'});
   else if(state.tip)dispatch({type:'TIP_DISMISS'});
  });
  return destroy;
 }

 function getRect(element,padding=8){
  if(!element)return null;
  const rect=element.getBoundingClientRect();
  if(!rect.width&&!rect.height)return null;
  const left=Math.max(4,rect.left-padding),top=Math.max(4,rect.top-padding);
  const right=Math.min(win.innerWidth-4,rect.right+padding),bottom=Math.min(win.innerHeight-4,rect.bottom+padding);
  return{left,top,right,bottom,width:Math.max(0,right-left),height:Math.max(0,bottom-top)};
 }

 function setRect(element,rect){
  if(!element||!rect)return;
  element.style.left=rect.left+'px';
  element.style.top=rect.top+'px';
  element.style.width=rect.width+'px';
  element.style.height=rect.height+'px';
 }

 function setMaskHole(id,rect){
  const hole=$(id);
  if(!hole||!rect)return;
  hole.setAttribute('x',rect.left);
  hole.setAttribute('y',rect.top);
  hole.setAttribute('width',rect.width);
  hole.setAttribute('height',rect.height);
 }

 function overlap(a,b){
  return Math.max(0,Math.min(a.right,b.right)-Math.max(a.left,b.left))*Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));
 }

 function edgePoint(rect,toward){
  const center={x:rect.left+rect.width/2,y:rect.top+rect.height/2};
  const dx=toward.x-center.x,dy=toward.y-center.y;
  if(!dx&&!dy)return center;
  const scale=1/Math.max(Math.abs(dx)/(Math.max(1,rect.width)/2),Math.abs(dy)/(Math.max(1,rect.height)/2));
  return{x:center.x+dx*scale,y:center.y+dy*scale};
 }

 function positionConnector(primary,secondary){
  const line=$('fseConnector');
  if(!line||!primary||!secondary||win.innerWidth<860){line?.classList.remove('active');return}
  const primaryCenter={x:primary.left+primary.width/2,y:primary.top+primary.height/2};
  const secondaryCenter={x:secondary.left+secondary.width/2,y:secondary.top+secondary.height/2};
  const start=edgePoint(primary,secondaryCenter),end=edgePoint(secondary,primaryCenter);
  const dx=end.x-start.x,dy=end.y-start.y,length=Math.hypot(dx,dy);
  if(length<20){line.classList.remove('active');return}
  line.style.left=start.x+'px';
  line.style.top=start.y+'px';
  line.style.width=length+'px';
  line.style.transform=`rotate(${Math.atan2(dy,dx)*180/Math.PI}deg)`;
  line.classList.add('active');
 }

 function positionCard(primary,secondary){
  const card=elements.fseTourCard;
  if(!card)return;
  const margin=18;
  const width=Math.min(520,win.innerWidth-26);
  const measured=card.getBoundingClientRect().height||card.scrollHeight||330;
  const height=Math.min(measured,Math.max(260,win.innerHeight-26));
  const targets=[primary,secondary].filter(Boolean);
  const candidates=[];
  targets.forEach(target=>candidates.push(
   {name:'bottom',left:target.left,top:target.bottom+margin},
   {name:'top',left:target.left,top:target.top-height-margin},
   {name:'right',left:target.right+margin,top:target.top},
   {name:'left',left:target.left-width-margin,top:target.top}
  ));
  candidates.push({name:'center',left:(win.innerWidth-width)/2,top:(win.innerHeight-height)/2});
  let best=null,bestScore=Infinity;
  candidates.forEach(candidate=>{
   const left=Math.max(13,Math.min(win.innerWidth-width-13,candidate.left));
   const top=Math.max(13,Math.min(win.innerHeight-height-13,candidate.top));
   const rect={left,top,right:left+width,bottom:top+height};
   const score=targets.reduce((sum,target)=>sum+overlap(rect,target),0)+(candidate.name==='center'&&targets.length?800:0);
   if(score<bestScore){bestScore=score;best={...candidate,left,top}}
  });
  card.classList.remove('fse-position-top','fse-position-bottom','fse-position-left','fse-position-right','fse-position-center');
  card.classList.add(`fse-position-${best.name}`);
  card.style.position='fixed';
  card.style.margin='0';
  card.style.width=width+'px';
  card.style.left=best.left+'px';
  card.style.top=best.top+'px';
 }

 function updateTourLayout(){
  if(currentState?.phase!=='tour')return;
  const primary=getRect(activeFocus?.primary?.element,activeFocus?.primary?.padding);
  const secondary=getRect(activeFocus?.secondary?.element,activeFocus?.secondary?.padding);
  if(!primary||!secondary){
   clearTourHighlights();
   positionCard(primary,secondary);
   return;
  }
  setRect($('fseSpotlightPrimary'),primary);
  setRect($('fseSpotlightSecondary'),secondary);
  setMaskHole('fseMaskHolePrimary',primary);
  setMaskHole('fseMaskHoleSecondary',secondary);
  $('fseMaskOverlay')?.classList.add('active');
  $('fseSpotlightPrimary')?.classList.add('active');
  $('fseSpotlightSecondary')?.classList.add('active');
  positionConnector(primary,secondary);
  positionCard(primary,secondary);
 }

 function scheduleTourLayout(){
  if(currentState?.phase!=='tour')return;
  if(layoutFrame)win.cancelAnimationFrame?.(layoutFrame);
  layoutFrame=win.requestAnimationFrame?.(()=>{layoutFrame=0;updateTourLayout()})||0;
 }

 function clearTourHighlights(){
  ['fseMaskOverlay','fseSpotlightPrimary','fseSpotlightSecondary','fseConnector'].forEach(id=>$(id)?.classList.remove('active'));
 }

 function clearTourLayout(){
  navigationToken++;
  if(layoutFrame)win.cancelAnimationFrame?.(layoutFrame);
  layoutFrame=0;
  activeFocus=null;
  clearTourHighlights();
  const card=elements.fseTourCard;
  if(card){
   card.style.removeProperty('left');
   card.style.removeProperty('top');
   card.style.removeProperty('width');
   card.style.removeProperty('position');
  }
 }

 function openWorkspace(id){
  const section=doc.querySelector(`.workspace-nav-group[data-workspace="${id}"]`);
  if(!section)return;
  section.classList.add('open');
  const toggle=section.querySelector('.workspace-group-toggle');
  toggle?.setAttribute('aria-expanded','true');
  const icon=toggle?.querySelector('i');
  if(icon)icon.textContent='⌄';
 }

 function navigate(view){
  if(win.NSWWorkspaceNavigation?.open){win.NSWWorkspaceNavigation.open(view);return}
  if(win.NSWConnections?.navigate){win.NSWConnections.navigate(view);return}
  const button=doc.querySelector(`.nav[data-view="${view}"]`);
  if(button){button.click();return}
  doc.querySelectorAll('.view').forEach(element=>element.classList.toggle('active',element.id===view));
 }

 function afterFrames(count,callback,token){
  if(token!==navigationToken)return;
  if(count<=0){callback();return}
  win.requestAnimationFrame(()=>afterFrames(count-1,callback,token));
 }

 function navigateTourStep(index){
  const data=STEPS[index];
  if(!data||currentState?.phase!=='tour')return;
  clearTourLayout();
  const token=++navigationToken;
  openWorkspace(data.location.workspace);
  navigate(data.location.view);
  afterFrames(2,()=>{
   if(token!==navigationToken||currentState?.phase!=='tour')return;
   const resolve=spec=>({
    element:doc.querySelector(spec.selector)||(spec.fallback?doc.querySelector(spec.fallback):null),
    padding:Number.isFinite(spec.padding)?spec.padding:8
   });
   activeFocus={primary:resolve(data.focus.primary),secondary:resolve(data.focus.secondary)};
   activeFocus.secondary.element?.scrollIntoView?.({behavior:'auto',block:'center'});
   afterFrames(2,updateTourLayout,token);
  },token);
 }

 function applyLanguage(){
  if(typeof win.NSWApplyFSELanguage==='function')win.NSWApplyFSELanguage();
 }

 function refresh(){
  if(!currentState)return;
  render(currentState,currentState);
  if(currentState.phase==='tour')scheduleTourLayout();
 }

 function destroy(){
  while(cleanups.length)cleanups.pop()();
  clearTourLayout();
 }

 return Object.freeze({
  available,
  missingIds:Object.freeze([...missingIds]),
  steps:STEPS,
  tipViews:Object.freeze(Object.keys(TIPS)),
  bind,
  render,
  navigateTourStep,
  clearTourLayout,
  scheduleTourLayout,
  applyLanguage,
  refresh,
  destroy,
  getRememberChoice:rememberChoice
 });
}

root.NSWFirstStartView=Object.freeze({createView,STEPS,TIPS});
})(typeof globalThis!=='undefined'?globalThis:this);

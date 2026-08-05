(function(root){
'use strict';

const RELEASE_VERSION=root.NSWReleaseManifest?.VERSION||'7.5.10';
const FLOW_REVISION='first-start-v4';
const LEGACY_COMPLETED_REVISION='first-start-v1';
const Machine=root.NSWFirstStartStateMachine;
const Repository=root.NSWFirstStartRepository;
const View=root.NSWFirstStartView;
let initialized=false;

function init(){
 if(initialized)return;
 initialized=true;
 if(!Machine||!Repository||!View){
  console.error('First Start Experience: architecture modules are missing.');
  return;
 }

 const view=View.createView({window:root,document:root.document});
 if(!view.available){
  console.error('First Start Experience: required UI components are missing:',view.missingIds.join(', '));
  return;
 }

 const repository=Repository.createRepository({
  flowRevision:FLOW_REVISION,
  releaseVersion:RELEASE_VERSION,
  legacyCompletedRevision:LEGACY_COMPLETED_REVISION
 });
 const timers=new Map();
 let machine=null;

 function clearTimers(){
  timers.forEach(timer=>root.clearTimeout(timer));
  timers.clear();
 }

 function schedule(name,delay,callback){
  const existing=timers.get(name);
  if(existing)root.clearTimeout(existing);
  const timer=root.setTimeout(()=>{
   timers.delete(name);
   callback();
  },Math.max(0,Number(delay)||0));
  timers.set(name,timer);
 }

 function currentStudioMode(){
  const mode=root.NSWStudioMode?.get?.()||root.document.body.dataset.studioMode||'advanced';
  return['simple','guided','advanced'].includes(mode)?mode:'advanced';
 }

 function ensureAdvancedMode(){
  if(currentStudioMode()==='advanced')return;
  if(root.NSWStudioMode?.set){root.NSWStudioMode.set('advanced');return}
  root.document.getElementById('advancedModeButton')?.click();
 }

 function persist(state){
  repository.save({
   completedRevision:state.completedRevision,
   profile:state.persistedProfile,
   tipsSeen:state.tipsSeen,
   visits:state.visits
  });
 }

 function runEffect(item,state){
  switch(item.type){
   case Machine.EFFECTS.PERSIST:
    persist(state);
    break;
   case Machine.EFFECTS.RESET_PERSISTENCE:
    repository.reset();
    break;
   case Machine.EFFECTS.ENSURE_ADVANCED_MODE:
    ensureAdvancedMode();
    break;
   case Machine.EFFECTS.NAVIGATE_TOUR_STEP:
    view.navigateTourStep(item.step);
    break;
   case Machine.EFFECTS.SCHEDULE_TIP:
    schedule('tip-ready',item.delay,()=>machine.dispatch({type:Machine.EVENTS.TIP_READY,token:item.token}));
    break;
   case Machine.EFFECTS.SCHEDULE_TIP_HIDE:
    schedule('tip-hide',item.delay,()=>machine.dispatch({type:Machine.EVENTS.TIP_TIMEOUT,token:item.token}));
    break;
   case Machine.EFFECTS.CLEAR_TIMERS:
    clearTimers();
    break;
  }
 }

 function onTransition(transition){
  view.render(transition.current,transition.previous);
  transition.effects.forEach(item=>runEffect(item,transition.current));
  root.dispatchEvent(new CustomEvent('nsw:first-start-transition',{detail:{
   event:transition.event.type,
   from:transition.previous.phase,
   to:transition.current.phase,
   changed:transition.changed
  }}));
 }

 machine=Machine.createMachine({
  flowRevision:FLOW_REVISION,
  tourStepCount:view.steps.length,
  tipViews:view.tipViews,
  onTransition
 });

 const unbindView=view.bind({
  dispatch:event=>machine.dispatch(event),
  getState:()=>machine.getState()
 });

 const onModeChange=event=>machine.dispatch({
  type:Machine.EVENTS.MODE_CHANGED,
  mode:event.detail?.mode||currentStudioMode()
 });
 const onStorage=event=>{
  if(repository.isRelevantKey(event.key))machine.dispatch({type:Machine.EVENTS.SYNC_PERSISTENCE,persistence:repository.load()});
 };
 root.addEventListener('nsw:studio-mode-change',onModeChange);
 root.addEventListener('storage',onStorage);

 view.applyLanguage();
 machine.dispatch({
  type:Machine.EVENTS.INIT,
  studioMode:currentStudioMode(),
  persistence:repository.load()
 });

 function startTour(){
  const state=machine.getState();
  if(state.phase===Machine.PHASES.WELCOME){
   machine.dispatch({type:Machine.EVENTS.START_TOUR,remember:view.getRememberChoice()});
   return;
  }
  if(state.phase===Machine.PHASES.READY){
   machine.dispatch({type:Machine.EVENTS.RESTART_TOUR});
   return;
  }
  machine.dispatch({type:Machine.EVENTS.SHOW_WELCOME});
 }

 function startTourAt(stepId){
  const step=view.steps.findIndex(item=>item.id===stepId);
  if(step<0||machine.getState().phase!==Machine.PHASES.READY)return false;
  machine.dispatch({type:Machine.EVENTS.RESTART_TOUR,step});
  return true;
 }

 function showContextHelp(stepId){
  const step=view.steps.findIndex(item=>item.id===stepId);
  if(step<0||machine.getState().phase!==Machine.PHASES.READY)return false;
  machine.dispatch({type:Machine.EVENTS.OPEN_CONTEXT_HELP,step});
  return true;
 }

 function setProfile(profile){
  machine.dispatch({type:profile==='beginner'?Machine.EVENTS.SET_BEGINNER:Machine.EVENTS.SET_EXPERT});
 }

 function destroy(){
  clearTimers();
  unbindView();
  root.removeEventListener('nsw:studio-mode-change',onModeChange);
  root.removeEventListener('storage',onStorage);
 }

 root.NSWFirstStartExperience=Object.freeze({
  version:RELEASE_VERSION,
  flowRevision:FLOW_REVISION,
  startTour,
  startTourAt,
  showContextHelp,
  showWelcome:()=>machine.dispatch({type:Machine.EVENTS.SHOW_WELCOME}),
  reset:()=>machine.dispatch({type:Machine.EVENTS.RESET}),
  setProfile,
  getProfile:()=>machine.getState().profile,
  refresh:()=>view.refresh(),
  state:()=>machine.getState().phase,
  getSnapshot:()=>machine.getState(),
  dispatch:event=>machine.dispatch(event),
  destroy,
  diagnostics:Object.freeze({
   storageKey:repository.storageKey,
   schemaVersion:repository.schemaVersion,
   flowRevision:FLOW_REVISION,
   releaseVersion:RELEASE_VERSION
  })
 });
}

if(root.document.readyState==='loading')root.document.addEventListener('DOMContentLoaded',init,{once:true});
else init();
})(typeof globalThis!=='undefined'?globalThis:this);

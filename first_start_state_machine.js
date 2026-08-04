(function(root,factory){
'use strict';
const api=factory();
if(typeof module==='object'&&module.exports)module.exports=api;
if(root)root.NSWFirstStartStateMachine=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';

const PHASES=Object.freeze({
 BOOTING:'booting',
 WAITING:'waiting-for-advanced',
 WELCOME:'welcome',
 TOUR:'tour',
 COMPLETE:'complete',
 READY:'ready'
});

const EVENTS=Object.freeze({
 INIT:'INIT',
 MODE_CHANGED:'MODE_CHANGED',
 SYNC_PERSISTENCE:'SYNC_PERSISTENCE',
 SHOW_WELCOME:'SHOW_WELCOME',
 CLOSE_WELCOME:'CLOSE_WELCOME',
 SELECT_QUICK:'SELECT_QUICK',
 SELECT_EXPERT:'SELECT_EXPERT',
 START_TOUR:'START_TOUR',
 RESTART_TOUR:'RESTART_TOUR',
 TOUR_NEXT:'TOUR_NEXT',
 TOUR_BACK:'TOUR_BACK',
 TOUR_SKIP:'TOUR_SKIP',
 COMPLETE_ACK:'COMPLETE_ACK',
 TOGGLE_HELP:'TOGGLE_HELP',
 CLOSE_HELP:'CLOSE_HELP',
 SET_BEGINNER:'SET_BEGINNER',
 SET_EXPERT:'SET_EXPERT',
 RESET:'RESET',
 NAVIGATED:'NAVIGATED',
 TIP_READY:'TIP_READY',
 TIP_DISMISS:'TIP_DISMISS',
 TIP_TIMEOUT:'TIP_TIMEOUT'
});

const EFFECTS=Object.freeze({
 PERSIST:'PERSIST',
 RESET_PERSISTENCE:'RESET_PERSISTENCE',
 ENSURE_ADVANCED_MODE:'ENSURE_ADVANCED_MODE',
 NAVIGATE_TOUR_STEP:'NAVIGATE_TOUR_STEP',
 SCHEDULE_TIP:'SCHEDULE_TIP',
 SCHEDULE_TIP_HIDE:'SCHEDULE_TIP_HIDE',
 CLEAR_TIMERS:'CLEAR_TIMERS'
});

const DEFAULT_CONFIG=Object.freeze({
 flowRevision:'first-start-v1',
 tourStepCount:6,
 tipViews:[]
});

const lockedPhases=new Set([PHASES.WELCOME,PHASES.TOUR,PHASES.COMPLETE]);
const validModes=new Set(['simple','guided','advanced']);
const validProfiles=new Set(['beginner','expert']);

function cleanBooleanMap(value){
 const out={};
 if(!value||typeof value!=='object'||Array.isArray(value))return out;
 Object.entries(value).forEach(([key,item])=>{if(typeof key==='string'&&item===true)out[key]=true});
 return out;
}

function cleanCountMap(value){
 const out={};
 if(!value||typeof value!=='object'||Array.isArray(value))return out;
 Object.entries(value).forEach(([key,item])=>{
  const number=Number(item);
  if(typeof key==='string'&&Number.isFinite(number)&&number>=0)out[key]=Math.min(100000,Math.floor(number));
 });
 return out;
}

function normalizePersistence(value){
 const source=value&&typeof value==='object'?value:{};
 return{
  completedRevision:typeof source.completedRevision==='string'?source.completedRevision:null,
  profile:validProfiles.has(source.profile)?source.profile:'expert',
  tipsSeen:cleanBooleanMap(source.tipsSeen),
  visits:cleanCountMap(source.visits)
 };
}

function configFrom(value){
 const source=value&&typeof value==='object'?value:{};
 const stepCount=Number(source.tourStepCount);
 return{
  flowRevision:typeof source.flowRevision==='string'&&source.flowRevision?source.flowRevision:DEFAULT_CONFIG.flowRevision,
  tourStepCount:Number.isInteger(stepCount)&&stepCount>0?stepCount:DEFAULT_CONFIG.tourStepCount,
  tipViews:Array.isArray(source.tipViews)?[...new Set(source.tipViews.filter(item=>typeof item==='string'))]:[]
 };
}

function createInitialState(){
 return freezeState({
  phase:PHASES.BOOTING,
  studioMode:'advanced',
  profile:'expert',
  persistedProfile:'expert',
  profileIsSessionOnly:false,
  completedRevision:null,
  rememberChoice:true,
  tourStep:0,
  tourOrigin:null,
  helpOpen:false,
  tip:null,
  pendingTip:null,
  tipSequence:0,
  tipsSeen:{},
  visits:{}
 });
}

function freezeState(state){
 const frozen={
  ...state,
  tipsSeen:Object.freeze({...state.tipsSeen}),
  visits:Object.freeze({...state.visits}),
  tip:state.tip?Object.freeze({...state.tip}):null,
  pendingTip:state.pendingTip?Object.freeze({...state.pendingTip}):null
 };
 return Object.freeze(frozen);
}

function effect(type,details){return details?{type,...details}:{type}}
function result(state,effects=[]){return{state,effects}}
function ignored(state){return{state,effects:[],accepted:false}}
function rememberFrom(event){return event.remember!==false}
function profileFrom(value){return validProfiles.has(value)?value:'expert'}
function modeFrom(value){return validModes.has(value)?value:'advanced'}
function clearTransient(state){return{...state,helpOpen:false,tip:null,pendingTip:null}}

function initialize(state,event,config){
 const persistence=normalizePersistence(event.persistence);
 const studioMode=modeFrom(event.studioMode);
 const completed=persistence.completedRevision===config.flowRevision;
 return result({
  ...state,
  phase:completed?PHASES.READY:(studioMode==='advanced'?PHASES.WELCOME:PHASES.WAITING),
  studioMode,
  profile:persistence.profile,
  persistedProfile:persistence.profile,
  profileIsSessionOnly:false,
  completedRevision:persistence.completedRevision,
  tipsSeen:persistence.tipsSeen,
  visits:persistence.visits
 });
}

function changeMode(state,event){
 const studioMode=modeFrom(event.mode);
 if(lockedPhases.has(state.phase)&&studioMode!=='advanced'){
  return result(state,[effect(EFFECTS.ENSURE_ADVANCED_MODE)]);
 }
 if(state.phase===PHASES.WAITING&&studioMode==='advanced'){
  return result({...clearTransient(state),studioMode,phase:PHASES.WELCOME});
 }
 return result({...state,studioMode});
}

function syncPersistence(state,event,config){
 const persistence=normalizePersistence(event.persistence);
 if(state.phase===PHASES.TOUR||state.phase===PHASES.COMPLETE){
  return result({
   ...state,
   completedRevision:persistence.completedRevision,
   persistedProfile:persistence.profile,
   tipsSeen:persistence.tipsSeen,
   visits:persistence.visits
  });
 }
 const completed=persistence.completedRevision===config.flowRevision;
 const phase=completed?PHASES.READY:(state.studioMode==='advanced'?PHASES.WELCOME:PHASES.WAITING);
 return result({
  ...clearTransient(state),
  phase,
  profile:persistence.profile,
  persistedProfile:persistence.profile,
  profileIsSessionOnly:false,
  completedRevision:persistence.completedRevision,
  tipsSeen:persistence.tipsSeen,
  visits:persistence.visits
 },[effect(EFFECTS.CLEAR_TIMERS)]);
}

function showWelcome(state){
 return result({
  ...clearTransient(state),
  phase:PHASES.WELCOME,
  studioMode:'advanced',
  tourStep:0,
  tourOrigin:null,
  rememberChoice:true
 },[effect(EFFECTS.CLEAR_TIMERS),effect(EFFECTS.ENSURE_ADVANCED_MODE)]);
}

function finishWelcome(state,event,config,profile){
 const remember=rememberFrom(event);
 const token=state.tipSequence+1;
 const beginner=profile==='beginner';
 const next={
  ...clearTransient(state),
  phase:PHASES.READY,
  profile,
  persistedProfile:remember?profile:state.persistedProfile,
  profileIsSessionOnly:!remember,
  completedRevision:remember?config.flowRevision:state.completedRevision,
  rememberChoice:remember,
  tipSequence:token,
  tip:beginner?{token,kind:'beginner'}:null
 };
 const effects=[effect(EFFECTS.CLEAR_TIMERS)];
 if(remember)effects.push(effect(EFFECTS.PERSIST));
 if(beginner)effects.push(effect(EFFECTS.SCHEDULE_TIP_HIDE,{token,delay:9000}));
 return result(next,effects);
}

function startOnboardingTour(state,event){
 const remember=rememberFrom(event);
 return result({
  ...clearTransient(state),
  phase:PHASES.TOUR,
  studioMode:'advanced',
  profile:'expert',
  persistedProfile:remember?'expert':state.persistedProfile,
  profileIsSessionOnly:!remember,
  rememberChoice:remember,
  tourStep:0,
  tourOrigin:'onboarding'
 },[
  effect(EFFECTS.CLEAR_TIMERS),
  effect(EFFECTS.ENSURE_ADVANCED_MODE),
  effect(EFFECTS.NAVIGATE_TOUR_STEP,{step:0})
 ]);
}

function restartTour(state){
 return result({
  ...clearTransient(state),
  phase:PHASES.TOUR,
  studioMode:'advanced',
  profile:'expert',
  persistedProfile:'expert',
  profileIsSessionOnly:false,
  rememberChoice:true,
  tourStep:0,
  tourOrigin:'replay'
 },[
  effect(EFFECTS.CLEAR_TIMERS),
  effect(EFFECTS.PERSIST),
  effect(EFFECTS.ENSURE_ADVANCED_MODE),
  effect(EFFECTS.NAVIGATE_TOUR_STEP,{step:0})
 ]);
}

function tourNext(state,event,config){
 if(state.tourStep<config.tourStepCount-1){
  const tourStep=state.tourStep+1;
  return result({...state,tourStep},[effect(EFFECTS.NAVIGATE_TOUR_STEP,{step:tourStep})]);
 }
 const shouldPersist=state.tourOrigin==='replay'||state.rememberChoice;
 const completedRevision=state.tourOrigin==='onboarding'&&state.rememberChoice?config.flowRevision:state.completedRevision;
 return result({
  ...clearTransient(state),
  phase:PHASES.COMPLETE,
  completedRevision,
  tourOrigin:null
 },[
  effect(EFFECTS.CLEAR_TIMERS),
  ...(shouldPersist?[effect(EFFECTS.PERSIST)]:[])
 ]);
}

function tourBack(state){
 if(state.tourStep===0)return ignored(state);
 const tourStep=state.tourStep-1;
 return result({...state,tourStep},[effect(EFFECTS.NAVIGATE_TOUR_STEP,{step:tourStep})]);
}

function tourSkip(state,event,config){
 const shouldPersist=state.tourOrigin==='replay'||state.rememberChoice;
 const completedRevision=state.tourOrigin==='onboarding'&&state.rememberChoice?config.flowRevision:state.completedRevision;
 return result({
  ...clearTransient(state),
  phase:PHASES.READY,
  completedRevision,
  tourOrigin:null
 },[
  effect(EFFECTS.CLEAR_TIMERS),
  ...(shouldPersist?[effect(EFFECTS.PERSIST)]:[])
 ]);
}

function acknowledgeComplete(state){
 return result({...clearTransient(state),phase:PHASES.READY},[effect(EFFECTS.CLEAR_TIMERS)]);
}

function toggleHelp(state){
 return result({...state,helpOpen:!state.helpOpen,tip:null,pendingTip:null},[effect(EFFECTS.CLEAR_TIMERS)]);
}

function closeHelp(state){
 if(!state.helpOpen)return ignored(state);
 return result({...state,helpOpen:false});
}

function setReadyProfile(state,profile){
 const token=state.tipSequence+1;
 return result({
  ...state,
  profile,
  persistedProfile:profile,
  profileIsSessionOnly:false,
  helpOpen:false,
  pendingTip:null,
  tipSequence:token,
  tip:{token,kind:profile==='beginner'?'beginner':'expert'}
 },[
  effect(EFFECTS.CLEAR_TIMERS),
  effect(EFFECTS.PERSIST),
  effect(EFFECTS.SCHEDULE_TIP_HIDE,{token,delay:9000})
 ]);
}

function resetExperience(state){
 return result({
  ...createInitialState(),
  phase:PHASES.WELCOME,
  studioMode:'advanced'
 },[
  effect(EFFECTS.CLEAR_TIMERS),
  effect(EFFECTS.RESET_PERSISTENCE),
  effect(EFFECTS.ENSURE_ADVANCED_MODE)
 ]);
}

function navigated(state,event,config){
 const view=typeof event.view==='string'?event.view:'';
 if(!view)return ignored(state);
 const count=(state.visits[view]||0)+1;
 const visits={...state.visits,[view]:count};
 const effects=[effect(EFFECTS.PERSIST)];
 let next={...state,visits};
 if(!state.helpOpen&&config.tipViews.includes(view)&&!state.tipsSeen[view]&&count<=2){
  const token=state.tipSequence+1;
  next={...next,tip:null,pendingTip:{token,kind:'view',view},tipSequence:token};
  effects.unshift(effect(EFFECTS.CLEAR_TIMERS));
  effects.push(effect(EFFECTS.SCHEDULE_TIP,{token,delay:450}));
 }
 return result(next,effects);
}

function tipReady(state,event){
 const pending=state.pendingTip;
 if(!pending||pending.token!==event.token||state.helpOpen)return ignored(state);
 const tipsSeen=pending.kind==='view'?{...state.tipsSeen,[pending.view]:true}:state.tipsSeen;
 return result({
  ...state,
  pendingTip:null,
  tip:{...pending},
  tipsSeen
 },[
  ...(pending.kind==='view'?[effect(EFFECTS.PERSIST)]:[]),
  effect(EFFECTS.SCHEDULE_TIP_HIDE,{token:pending.token,delay:9000})
 ]);
}

function dismissTip(state,event){
 const token=event.token;
 if(token!=null&&state.tip?.token!==token&&state.pendingTip?.token!==token)return ignored(state);
 if(!state.tip&&!state.pendingTip)return ignored(state);
 return result({...state,tip:null,pendingTip:null},[effect(EFFECTS.CLEAR_TIMERS)]);
}

const TRANSITIONS={
 [PHASES.BOOTING]:{
  [EVENTS.INIT]:initialize
 },
 [PHASES.WAITING]:{},
 [PHASES.WELCOME]:{
  [EVENTS.CLOSE_WELCOME]:(state,event,config)=>finishWelcome(state,event,config,'expert'),
  [EVENTS.SELECT_QUICK]:(state,event,config)=>finishWelcome(state,event,config,'beginner'),
  [EVENTS.SELECT_EXPERT]:(state,event,config)=>finishWelcome(state,event,config,'expert'),
  [EVENTS.START_TOUR]:startOnboardingTour
 },
 [PHASES.TOUR]:{
  [EVENTS.TOUR_NEXT]:tourNext,
  [EVENTS.TOUR_BACK]:tourBack,
  [EVENTS.TOUR_SKIP]:tourSkip
 },
 [PHASES.COMPLETE]:{
  [EVENTS.COMPLETE_ACK]:acknowledgeComplete
 },
 [PHASES.READY]:{
  [EVENTS.RESTART_TOUR]:restartTour,
  [EVENTS.TOGGLE_HELP]:toggleHelp,
  [EVENTS.CLOSE_HELP]:closeHelp,
  [EVENTS.SET_BEGINNER]:(state)=>setReadyProfile(state,'beginner'),
  [EVENTS.SET_EXPERT]:(state)=>setReadyProfile(state,'expert'),
  [EVENTS.NAVIGATED]:navigated,
  [EVENTS.TIP_READY]:tipReady,
  [EVENTS.TIP_TIMEOUT]:dismissTip
 },
 '*':{
  [EVENTS.MODE_CHANGED]:changeMode,
  [EVENTS.SYNC_PERSISTENCE]:syncPersistence,
  [EVENTS.SHOW_WELCOME]:showWelcome,
  [EVENTS.RESET]:resetExperience,
  [EVENTS.TIP_DISMISS]:dismissTip
 }
};

function transition(current,event,configuration){
 const state=current||createInitialState();
 const config=configFrom(configuration);
 const normalized=typeof event==='string'?{type:event}:event;
 if(!normalized||typeof normalized.type!=='string')return{state,effects:[],accepted:false,event:normalized};
 const handler=TRANSITIONS[state.phase]?.[normalized.type]||TRANSITIONS['*'][normalized.type];
 if(!handler)return{state,effects:[],accepted:false,event:normalized};
 const output=handler(state,normalized,config)||ignored(state);
 const next=output.state===state?state:freezeState(output.state);
 return{
  state:next,
  effects:Array.isArray(output.effects)?output.effects:[],
  accepted:output.accepted!==false,
  event:normalized
 };
}

function createMachine(options={}){
 const config=configFrom(options);
 let state=options.initialState||createInitialState();
 const listeners=new Set();
 const queue=[];
 let processing=false,lastTransition=null;

 function dispatch(event){
  queue.push(event);
  if(processing)return lastTransition;
  processing=true;
  try{
   while(queue.length){
    const previous=state;
    const currentEvent=queue.shift();
    const output=transition(previous,currentEvent,config);
    state=output.state;
    lastTransition={...output,previous,current:state,changed:previous!==state};
    if(output.accepted){
     if(typeof options.onTransition==='function')options.onTransition(lastTransition);
     listeners.forEach(listener=>listener(lastTransition));
    }
   }
  }finally{processing=false}
  return lastTransition;
 }

 return Object.freeze({
  dispatch,
  getState:()=>state,
  subscribe(listener){
   if(typeof listener!=='function')return()=>{};
   listeners.add(listener);
   return()=>listeners.delete(listener);
  },
  configuration:Object.freeze({...config,tipViews:Object.freeze([...config.tipViews])})
 });
}

return Object.freeze({
 PHASES,
 EVENTS,
 EFFECTS,
 createInitialState,
 normalizePersistence,
 transition,
 createMachine,
 isLockedPhase:phase=>lockedPhases.has(phase),
 profileFrom
});
});

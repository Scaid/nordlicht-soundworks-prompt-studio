(function(root,factory){
'use strict';
const api=factory();
if(typeof module==='object'&&module.exports)module.exports=api;
if(root)root.NSWVocalClarityGuidance=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';

const VERSION='7.5.9';
const MODES=Object.freeze(['smart','off','force']);
const STATES=Object.freeze(['active','caution','blocked','forced','suppressed','off']);
const TERM_COUNT=5;

function normalizeMode(value){return MODES.includes(String(value))?String(value):'smart'}
function normalizeState(value){return STATES.includes(String(value))?String(value):'off'}

function placementFor(result={}){
 const state=normalizeState(result.decision?.state);
 const applied=Boolean(result.applied);
 const frontLoaded=applied&&result.prefix?.frontLoaded!==false;
 return Object.freeze({
  state,
  applied,
  frontLoaded,
  start:frontLoaded?1:null,
  end:frontLoaded?TERM_COUNT:null,
  termCount:TERM_COUNT
 });
}

function recommendationFor(value){
 const mode=normalizeMode(value);
 if(mode==='smart')return Object.freeze({mode,targetMode:null,actionable:false,code:'automaticActive'});
 if(mode==='force')return Object.freeze({mode,targetMode:'smart',actionable:true,code:'returnAutomatic'});
 return Object.freeze({mode,targetMode:'smart',actionable:true,code:'useAutomatic'});
}

function build(result={},mode=result.decision?.mode){
 return Object.freeze({
  state:normalizeState(result.decision?.state),
  placement:placementFor(result),
  recommendation:recommendationFor(mode)
 });
}

return Object.freeze({VERSION,MODES,STATES,TERM_COUNT,normalizeMode,normalizeState,placementFor,recommendationFor,build});
});

(function(root,factory){
'use strict';
const api=factory();
if(typeof module==='object'&&module.exports)module.exports=api;
if(root)root.NSWVocalClarityController=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';

const VERSION='7.5.9';
const MODES=Object.freeze(['smart','off','force']);

function normalizeMode(value){return MODES.includes(String(value))?String(value):'smart'}
function isEnabled(value){return normalizeMode(value)!=='off'}
function modeAfterToggle(value){return isEnabled(value)?'off':'smart'}

function createController({modeElement,toggleElement}={}){
 if(!modeElement||!toggleElement)throw new Error('Vocal Clarity Controller requires modeElement and toggleElement.');
 const win=modeElement.ownerDocument?.defaultView||globalThis;

 function sync(){
  const mode=normalizeMode(modeElement.value);
  if(modeElement.value!==mode)modeElement.value=mode;
  const enabled=isEnabled(mode);
  toggleElement.setAttribute('aria-checked',String(enabled));
  toggleElement.dataset.enabled=String(enabled);
  toggleElement.classList.toggle('active',enabled);
  return Object.freeze({mode,enabled});
 }

 function setMode(value,{emit=true}={}){
  modeElement.value=normalizeMode(value);
  const snapshot=sync();
  if(emit)modeElement.dispatchEvent(new win.Event('change',{bubbles:true}));
  return snapshot;
 }

 function toggle(){return setMode(modeAfterToggle(modeElement.value))}
 function onModeChange(){sync()}
 function onToggle(){toggle()}

 modeElement.addEventListener('change',onModeChange);
 toggleElement.addEventListener('click',onToggle);
 sync();

 return Object.freeze({
  getMode:()=>normalizeMode(modeElement.value),
  isEnabled:()=>isEnabled(modeElement.value),
  setMode,
  toggle,
  sync,
  destroy(){
   modeElement.removeEventListener('change',onModeChange);
   toggleElement.removeEventListener('click',onToggle);
  }
 });
}

return Object.freeze({VERSION,MODES,normalizeMode,isEnabled,modeAfterToggle,createController});
});

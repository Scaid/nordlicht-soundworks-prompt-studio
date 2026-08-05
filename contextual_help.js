(function(root){
'use strict';

const REGISTRY=Object.freeze([
 Object.freeze({id:'studio-overview',stepId:'studio-orientation',host:'#homeView .view-head'}),
 Object.freeze({id:'create-workspace',stepId:'workspace-create',host:'#randomView .view-head'}),
 Object.freeze({id:'style-workspace',stepId:'workspace-style',host:'#styleView .view-head'}),
 Object.freeze({id:'vocal-clarity',stepId:'vocal-clarity',host:'#vocalClarityCard .vocal-clarity-head > div:first-child'}),
 Object.freeze({id:'lyrics-workspace',stepId:'lyrics-workspace',host:'#lyricsView .view-head'}),
 Object.freeze({id:'knowledge-workspace',stepId:'workspace-knowledge',host:'#genreIntelligenceView .view-head'}),
 Object.freeze({id:'analysis-workspace',stepId:'workspace-analysis',host:'#dnaAnalyzerView .view-head'}),
 Object.freeze({id:'project-workspace',stepId:'workspace-project',host:'#projectManagerView .view-head'}),
 Object.freeze({id:'live-output',stepId:'live-output',host:'.live-output-card .live-output-head'}),
 Object.freeze({id:'studio-intelligence',stepId:'studio-intelligence',host:'#studioIntelligenceView .view-head'})
]);

function language(){
 return root.NSWUXFoundationI18n?.languageOf?.(
  root.NSWInterfaceI18n?.getLanguage?.()||root.NSWWorkspaceI18n?.getLanguage?.()||root.document.documentElement.lang||'en'
 )||'en';
}
function text(key){return root.NSWUXFoundationI18n?.text?.(language(),key)||key}

function createButton(entry){
 const button=root.document.createElement('button');
 button.type='button';
 button.className='context-help-trigger';
 button.dataset.contextHelp=entry.id;
 button.dataset.contextHelpStep=entry.stepId;
 button.textContent='?';
 button.addEventListener('click',event=>{
  event.preventDefault();
  event.stopPropagation();
  root.NSWFirstStartExperience?.showContextHelp?.(entry.stepId);
 });
 return button;
}

function localize(){
 root.document.querySelectorAll('.context-help-trigger').forEach(button=>{
  const label=text('helpLabel');
  button.title=label;
  button.setAttribute('aria-label',label);
 });
}

function mount(){
 REGISTRY.forEach(entry=>{
  const host=root.document.querySelector(entry.host);
  if(!host||host.querySelector(`:scope > [data-context-help="${entry.id}"]`))return;
  host.classList.add('context-help-host');
  host.append(createButton(entry));
 });
 localize();
 return root.document.querySelectorAll('.context-help-trigger').length;
}

function open(id){
 const entry=REGISTRY.find(item=>item.id===id||item.stepId===id);
 return !!entry&&!!root.NSWFirstStartExperience?.showContextHelp?.(entry.stepId);
}

function init(){
 mount();
 root.document.addEventListener('nordlicht-language-changed',localize);
 root.document.addEventListener('nsw:workspace-navigation-built',mount);
}

if(root.document.readyState==='loading')root.document.addEventListener('DOMContentLoaded',init,{once:true});else init();
root.NSWContextualHelp=Object.freeze({VERSION:'7.5.10',REGISTRY,mount,localize,open});
})(typeof globalThis!=='undefined'?globalThis:this);

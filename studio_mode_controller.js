(function(){
'use strict';
const STORE='nsw_studio_mode_v220';
const $=id=>document.getElementById(id);
let lastAdvancedView='randomView';

function activeAdvancedView(){
  const active=document.querySelector('.view.active:not(#simpleView):not(#guidedView)');
  if(active) return active.id;
  const nav=document.querySelector('.nav.active[data-view]');
  return nav?.dataset.view || lastAdvancedView || 'randomView';
}

function cleanModeClasses(){
  document.body.classList.remove('simple-mode','guided-active');
  document.documentElement.classList.remove('simple-mode','guided-active');
}

function setButtons(mode){
  $('simpleModeButton')?.classList.toggle('active',mode==='simple');
  $('guidedModeButton')?.classList.toggle('active',mode==='guided');
  $('advancedModeButton')?.classList.toggle('active',mode==='advanced');
  $('simpleModeButton')?.setAttribute('aria-pressed',String(mode==='simple'));
  $('guidedModeButton')?.setAttribute('aria-pressed',String(mode==='guided'));
  $('advancedModeButton')?.setAttribute('aria-pressed',String(mode==='advanced'));
}

function hideAllViews(){
  document.querySelectorAll('.workspace > .view, .workspace .view').forEach(v=>v.classList.remove('active'));
}

function showMode(mode,{remember=true}={}){
  if(!['simple','guided','advanced'].includes(mode)) mode='advanced';
  const current=activeAdvancedView();
  if(current && !['simpleView','guidedView'].includes(current)) lastAdvancedView=current;
  cleanModeClasses();
  hideAllViews();

  if(mode==='simple'){
    document.body.classList.add('simple-mode');
    $('simpleView')?.classList.add('active');
  }else if(mode==='guided'){
    document.body.classList.add('guided-active');
    $('guidedView')?.classList.add('active');
  }else{
    const target=$(lastAdvancedView) || $('randomView') || document.querySelector('.view');
    target?.classList.add('active');
    const nav=document.querySelector(`.nav[data-view="${target?.id}"]`);
    document.querySelectorAll('.nav').forEach(n=>n.classList.toggle('active',n===nav));
  }

  setButtons(mode);
  document.body.dataset.studioMode=mode;
  if(remember) localStorage.setItem(STORE,mode);
  window.dispatchEvent(new CustomEvent('nsw:studio-mode-change',{detail:{mode}}));
  requestAnimationFrame(()=>window.scrollTo({top:0,behavior:'auto'}));
}

function bindButton(id,mode){
  const button=$(id); if(!button) return;
  button.addEventListener('click',event=>{
    event.preventDefault();
    event.stopImmediatePropagation();
    showMode(mode);
  },true);
}

function init(){
  bindButton('simpleModeButton','simple');
  bindButton('guidedModeButton','guided');
  bindButton('advancedModeButton','advanced');
  const saved=localStorage.getItem(STORE);
  const requested=['simple','guided','advanced'].includes(saved)?saved:'advanced';
  showMode(requested,{remember:false});
  window.NSWStudioMode={set:showMode,get:()=>document.body.dataset.studioMode||'advanced'};
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();

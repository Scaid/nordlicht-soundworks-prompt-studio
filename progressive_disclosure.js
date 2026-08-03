
(function(){
'use strict';
const TARGETS=['styleView','lyricsView','composerView','songDirectorView','musicDirectorView','arrangementDesignerView','vocalDirectorView','instrumentEvolutionView','instrumentGraphView','theoryDirectorView','productionView','optimizerView','successPredictorView','worldMusicView','instrumentEncyclopediaView'];
const KEY='nsw-progressive-disclosure-v1';
function state(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){return{}}}
function save(s){localStorage.setItem(KEY,JSON.stringify(s))}
function setup(viewId){
 const view=document.getElementById(viewId);if(!view||view.dataset.pdReady)return;
 const head=view.querySelector(':scope > .view-head');if(!head)return;
 const panels=[...view.children].filter(x=>x.classList?.contains('panel')||x.classList?.contains('feature-grid')||x.classList?.contains('sd-layout')||x.classList?.contains('wm-layout')||x.classList?.contains('iex-layout'));
 if(panels.length<2)return;
 const s=state(),expanded=!!s[viewId];
 const btn=document.createElement('button');btn.type='button';btn.className='pd-toggle';btn.textContent=expanded?'Expertenansicht ausblenden':'Erweiterte Einstellungen anzeigen';
 head.appendChild(btn);
 const note=document.createElement('div');note.className='pd-summary-note';note.textContent='Zuerst werden nur die wichtigsten Bedienelemente gezeigt. Alle bisherigen Expertenfunktionen bleiben unverändert verfügbar.';
 const first=panels[0];first.insertAdjacentElement('afterend',note);
 const hideTargets=panels.slice(1);
 function apply(on){hideTargets.forEach(x=>x.classList.toggle('pd-hidden',!on));note.classList.toggle('pd-hidden',on);btn.textContent=on?'Expertenansicht ausblenden':'Erweiterte Einstellungen anzeigen';const st=state();st[viewId]=on;save(st)}
 btn.onclick=()=>apply(btn.textContent.includes('anzeigen'));
 apply(expanded);view.dataset.pdReady='1';
 // Add badges to deeper panels.
 hideTargets.forEach(x=>{const title=x.querySelector('h2,h3');if(title&&!title.querySelector('.pd-expert-badge'))title.insertAdjacentHTML('beforeend','<span class="pd-expert-badge">EXPERTE</span>')});
}
function init(){TARGETS.forEach(setup);document.addEventListener('click',e=>{const b=e.target.closest('[data-view]');if(b)setTimeout(()=>setup(b.dataset.view),30)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

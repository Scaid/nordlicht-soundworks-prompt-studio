
(function(){
'use strict';
const $=id=>document.getElementById(id),FAV='nsw-ux-favorites-v1',REC='nsw-ux-recent-v1',UNDO='nsw-ux-undo-v1';
const get=(k,d=[])=>{try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(d))}catch(e){return d}},set=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
function buttons(){return[...document.querySelectorAll('#navigation .nav')]}
function title(b){return b.querySelector('b')?.textContent.trim()||b.dataset.view}
function go(view){const b=document.querySelector(`#navigation [data-view="${view}"]`);if(b)b.click()}
function productivity(){
 const nav=$('navigation');if(!nav||$('uxModuleSearch'))return;
 const box=document.createElement('div');box.className='ux-productivity';box.innerHTML=`<input id="uxModuleSearch" class="ux-module-search" placeholder="Module suchen: Vocals, Mittelalter, BPM..."><div id="uxSearchResults" class="ux-search-results"></div><section class="ux-mini-section"><h4>Favoriten</h4><div id="uxFavorites" class="ux-mini-items"></div></section><section class="ux-mini-section"><h4>Zuletzt verwendet</h4><div id="uxRecent" class="ux-mini-items"></div></section>`;
 const home=nav.querySelector('.workspace-home-nav');home?.insertAdjacentElement('afterend',box);
 $('uxModuleSearch').oninput=search;$('uxModuleSearch').onfocus=search;
 document.addEventListener('click',e=>{if(!box.contains(e.target))$('uxSearchResults').classList.remove('open')});
 renderMini();pins();
}
function search(){const q=$('uxModuleSearch').value.trim().toLowerCase(),r=$('uxSearchResults');if(!q){r.classList.remove('open');r.innerHTML='';return}const found=buttons().filter(b=>(b.textContent+' '+b.dataset.view).toLowerCase().includes(q));r.innerHTML=found.slice(0,15).map(b=>`<button class="ux-search-result" data-result="${b.dataset.view}"><b>${title(b)}</b><small>${b.querySelector('small')?.textContent||''}</small></button>`).join('')||'<div class="ux-sidebar-note">Kein passendes Modul gefunden.</div>';r.classList.add('open');r.querySelectorAll('[data-result]').forEach(b=>b.onclick=()=>{go(b.dataset.result);r.classList.remove('open');$('uxModuleSearch').value=''})}
function pins(){buttons().forEach(b=>{const p=b.querySelector('.workspace-pin');if(!p)return;const fav=get(FAV);p.classList.toggle('ux-pinned',fav.includes(b.dataset.view));p.textContent=fav.includes(b.dataset.view)?'★':'☆';p.onclick=e=>{e.preventDefault();e.stopPropagation();let f=get(FAV);f=f.includes(b.dataset.view)?f.filter(x=>x!==b.dataset.view):[...f,b.dataset.view].slice(-8);set(FAV,f);pins();renderMini()}})}
function renderMini(){const map=new Map(buttons().map(b=>[b.dataset.view,title(b)]));const make=(id,arr)=>{$(id).innerHTML=arr.filter(x=>map.has(x)).map(x=>`<button data-mini="${x}">${map.get(x)}</button>`).join('')||'<span class="ux-sidebar-note">Noch keine</span>';$(id).querySelectorAll('[data-mini]').forEach(b=>b.onclick=()=>go(b.dataset.mini))};make('uxFavorites',get(FAV));make('uxRecent',get(REC))}
function track(view){if(!view||view==='homeView')return;let r=get(REC).filter(x=>x!==view);r.unshift(view);set(REC,r.slice(0,5));renderMini()}
function snapshot(label){
 const s={time:Date.now(),label,style:$('customStyle')?.value||'',lyrics:$('lyricsEditor')?.value||'',bpm:$('bpm')?.value||'',exclude:$('customExclude')?.value||''};
 set(UNDO,s);
}
function restore(){const s=get(UNDO,null);if(!s)return;[['customStyle','style'],['lyricsEditor','lyrics'],['bpm','bpm'],['customExclude','exclude']].forEach(([id,k])=>{const e=$(id);if(e){e.value=s[k]||'';e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}))}});if(typeof generateOutput==='function')generateOutput();hideToast()}
function toast(label){let t=$('uxUndoToast');if(!t){t=document.createElement('div');t.id='uxUndoToast';t.className='ux-undo-toast';t.innerHTML='<span><b>Änderung angewendet</b><br><span class="ux-change-summary"></span></span><button id="uxUndoButton">Rückgängig</button><button id="uxKeepButton">Behalten</button>';document.body.appendChild(t);$('uxUndoButton').onclick=restore;$('uxKeepButton').onclick=hideToast}t.querySelector('.ux-change-summary').textContent=label;t.classList.add('show');clearTimeout(t._timer);t._timer=setTimeout(hideToast,9000)}
function hideToast(){const t=$('uxUndoToast');if(t)t.classList.remove('show')}
function init(){
 productivity();
 document.addEventListener('click',e=>{
  const nav=e.target.closest('#navigation [data-view]');if(nav)setTimeout(()=>track(nav.dataset.view),0);
 },true);
 document.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b||b.closest('#navigation')||b.id==='uxUndoButton')return;
  const text=(b.textContent||'').toLowerCase(),id=b.id||'';
  if(/apply|übernehmen|deploy|anwenden|synchron|erstellen|generate|build/.test(text+' '+id)){
   snapshot((b.textContent||id).trim());
   setTimeout(()=>toast((b.textContent||id).trim()),80);
  }
 },true);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

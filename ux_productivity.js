(function(root){
'use strict';
const State=root.NSWWorkspaceState;
if(!State)return;
const $=id=>root.document.getElementById(id);
const buttons=()=>[...root.document.querySelectorAll('#navigation .nav[data-view]')];
const title=button=>button.querySelector('b')?.textContent.trim()||button.dataset.view;
function language(){return root.NSWUXFoundationI18n?.languageOf?.(root.NSWWorkspaceI18n?.getLanguage?.()||root.document.documentElement.lang||'en')||'en'}
function ux(key){return root.NSWUXFoundationI18n?.text?.(language(),key)||key}
function home(key,fallback=''){return root.NSWWorkspaceI18n?.home?.(key)||fallback||key}
function go(view){
 if(root.NSWWorkspaceNavigation?.open){root.NSWWorkspaceNavigation.open(view);return}
 root.document.querySelector(`#navigation [data-view="${view}"]`)?.click();
}
function createProductivity(){
 const nav=$('navigation');if(!nav||$('uxModuleSearch'))return;
 const box=root.document.createElement('div');box.className='ux-productivity';
 const input=root.document.createElement('input');input.id='uxModuleSearch';input.className='ux-module-search';input.type='search';input.autocomplete='off';
 const results=root.document.createElement('div');results.id='uxSearchResults';results.className='ux-search-results';
 const favoriteSection=root.document.createElement('section');favoriteSection.className='ux-mini-section';favoriteSection.innerHTML='<h4 data-ux-mini-title="favorites"></h4><div id="uxFavorites" class="ux-mini-items"></div>';
 const recentSection=root.document.createElement('section');recentSection.className='ux-mini-section';recentSection.innerHTML='<h4 data-ux-mini-title="recent"></h4><div id="uxRecent" class="ux-mini-items"></div>';
 box.append(input,results,favoriteSection,recentSection);
 nav.querySelector('.workspace-home-nav')?.insertAdjacentElement('afterend',box);
 input.addEventListener('input',search);input.addEventListener('focus',search);
 root.document.addEventListener('click',event=>{if(!box.contains(event.target))results.classList.remove('open')});
}
function renderSearchResult(button,host){
 const result=root.document.createElement('button');result.type='button';result.className='ux-search-result';result.dataset.result=button.dataset.view;
 const name=root.document.createElement('b');name.textContent=title(button);const description=root.document.createElement('small');description.textContent=button.querySelector('small')?.textContent||'';
 result.append(name,description);result.addEventListener('click',()=>{go(button.dataset.view);host.classList.remove('open');$('uxModuleSearch').value=''});host.append(result);
}
function search(){
 const query=$('uxModuleSearch')?.value.trim().toLocaleLowerCase()||'',results=$('uxSearchResults');if(!results)return;
 results.replaceChildren();if(!query){results.classList.remove('open');return}
 const found=buttons().filter(button=>(button.textContent+' '+button.dataset.view).toLocaleLowerCase().includes(query)).slice(0,15);
 found.forEach(button=>renderSearchResult(button,results));
 if(!found.length){const note=root.document.createElement('div');note.className='ux-sidebar-note';note.textContent=ux('noResults');results.append(note)}
 results.classList.add('open');
}
function renderMiniList(id,views,empty){
 const host=$(id);if(!host)return;host.replaceChildren();
 const map=new Map(buttons().map(button=>[button.dataset.view,title(button)]));
 views.filter(view=>map.has(view)).forEach(view=>{const button=root.document.createElement('button');button.type='button';button.dataset.mini=view;button.textContent=map.get(view);button.addEventListener('click',()=>go(view));host.append(button)});
 if(!host.childElementCount){const note=root.document.createElement('span');note.className='ux-sidebar-note';note.textContent=empty;host.append(note)}
}
function localize(){
 const input=$('uxModuleSearch');if(input)input.placeholder=ux('searchPlaceholder');
 const favoriteTitle=root.document.querySelector('[data-ux-mini-title="favorites"]');if(favoriteTitle)favoriteTitle.textContent=home('pinned','Favorites');
 const recentTitle=root.document.querySelector('[data-ux-mini-title="recent"]');if(recentTitle)recentTitle.textContent=home('recent','Recent');
 renderMini();if($('uxSearchResults')?.classList.contains('open'))search();
}
function renderMini(){
 const state=State.snapshot();
 renderMiniList('uxFavorites',state.favorites,home('pinHint','No favorites yet.'));
 renderMiniList('uxRecent',state.recent.map(item=>item.view),home('recentHint','No recent modules yet.'));
}
function init(){
 createProductivity();localize();
 root.document.addEventListener('nsw:workspace-state-change',renderMini);
 root.document.addEventListener('nordlicht-language-changed',localize);
 root.document.addEventListener('nsw:workspace-navigation-built',localize);
 root.NSWModuleFinder=Object.freeze({VERSION:'7.5.10',refresh:localize});
}
if(root.document.readyState==='loading')root.document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})(typeof globalThis!=='undefined'?globalThis:this);

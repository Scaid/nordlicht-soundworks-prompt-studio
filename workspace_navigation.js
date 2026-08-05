(function(root){
'use strict';
const State=root.NSWWorkspaceState;
if(!State)return;
const $=id=>root.document.getElementById(id);
const q=(selector,parent=root.document)=>parent.querySelector(selector);
const qa=(selector,parent=root.document)=>[...parent.querySelectorAll(selector)];
const icons={randomView:'🎲',composerView:'🤖',vocalDirectorView:'🎤',styleView:'🎼',lyricsView:'✍️',promptChatView:'💬',assistantView:'🧭',dnaAnalyzerView:'🧬',optimizerView:'🧹',successPredictorView:'🎯',evolutionView:'🌱',learningView:'🧠',metatagsView:'🏷️',styleLibraryView:'📚',blueprintView:'🗺️',instrumentsView:'🎻',instrumentEvolutionView:'🧬',genreEvolutionView:'🌿',vocalsView:'🎤',storyView:'🌍',productionView:'🎧',theoryView:'♫',projectManagerView:'🗂️',presetsView:'⭐',homeView:'🏠'};

function homeText(key,variables={},fallback=''){return root.NSWWorkspaceI18n?.home?.(key,variables)||fallback||key}
function navFor(view){return q(`.nav[data-view="${view}"],.workspace-home-nav[data-view="${view}"]`)}
function nameOf(view){return navFor(view)?.querySelector('b')?.textContent.trim()||view}
function groupOf(view){return navFor(view)?.closest('.workspace-nav-group')?.dataset.workspace||'create'}

function applyGroupState(){
 const state=State.snapshot();
 qa('.workspace-nav-group').forEach((section,index)=>{
  const stored=state.openGroups[section.dataset.workspace];
  const open=stored==null?index===0:stored;
  section.classList.toggle('open',open);
  const toggle=q(':scope > .workspace-group-toggle',section);
  toggle?.setAttribute('aria-expanded',String(open));
  const icon=q(':scope > .workspace-group-toggle i',section);if(icon)icon.textContent=open?'⌄':'›';
 });
}
function ensureGroupOpen(group,persist=true){
 const section=q(`.workspace-nav-group[data-workspace="${group}"]`);if(!section)return;
 section.classList.add('open');
 const toggle=q(':scope > .workspace-group-toggle',section);toggle?.setAttribute('aria-expanded','true');
 const icon=q(':scope > .workspace-group-toggle i',section);if(icon)icon.textContent='⌄';
 if(persist&&State.snapshot().openGroups[group]!==true)State.setGroupOpen(group,true);
}
function toggleGroup(section){
 const open=!section.classList.contains('open');
 State.setGroupOpen(section.dataset.workspace,open);
 applyGroupState();
}
function updateBreadcrumb(view){
 const breadcrumb=$('workspaceBreadcrumb');if(!breadcrumb)return;
 const home=view==='homeView';breadcrumb.style.display=home?'none':'flex';if(home)return;
 const group=groupOf(view);
 const localized=root.NSWWorkspaceI18n?.workspace?.(group,'label')?.replace(/^\s*[^\p{L}\p{N}]+\s*/u,'');
 const groupNode=$('workspaceBreadcrumbGroup'),moduleNode=$('workspaceBreadcrumbModule');
 if(groupNode)groupNode.textContent=localized||group;
 if(moduleNode)moduleNode.textContent=nameOf(view);
}
function activate(requestedView,{recent=true}={}){
 let view=requestedView;
 if(view==='vocalsView'||view==='storyView'){
  const tab=view==='vocalsView'?'vocals':'story';view='styleView';
  root.setTimeout(()=>q(`[data-sbw-tab="${tab}"]`)?.click(),0);
 }
 const target=$(view);if(!target)return false;
 qa('.view').forEach(node=>node.classList.remove('active'));target.classList.add('active');
 qa('.nav,.workspace-home-nav').forEach(button=>button.classList.toggle('active',button.dataset.view===view));
 if(view!=='homeView')ensureGroupOpen(groupOf(view));
 updateBreadcrumb(view);
 State.recordNavigation(view,recent);
 root.scrollTo?.({top:0,behavior:'smooth'});
 return true;
}
function renderPins(){
 const favorites=State.snapshot().favorites;
 qa('.workspace-pin').forEach(pin=>{
  const view=pin.closest('.nav')?.dataset.view,on=favorites.includes(view);
  pin.classList.toggle('pinned',on);pin.classList.toggle('ux-pinned',on);
  pin.textContent=on?'★':'☆';pin.title=homeText(on?'unpin':'pin',{},on?'Unpin module':'Pin module');
 });
}
function relative(time){
 const minutes=Math.max(1,Math.round((Date.now()-time)/60000));
 if(minutes<60)return homeText('minAgo',{count:minutes},`${minutes} min ago`);
 if(minutes<1440){const hours=Math.round(minutes/60);return homeText('hourAgo',{count:hours},`${hours} h ago`)}
 const days=Math.round(minutes/1440);return homeText('dayAgo',{count:days},`${days} d ago`);
}
function shortcut(view,meta){
 const button=root.document.createElement('button');button.type='button';button.className='workspace-shortcut';button.dataset.openView=view;
 const main=root.document.createElement('span'),icon=root.document.createTextNode(`${icons[view]||'•'} `),name=root.document.createElement('b');name.textContent=nameOf(view);main.append(icon,name);
 const small=root.document.createElement('small');small.textContent=meta;button.append(main,small);return button;
}
function renderList(host,items,emptyText){
 if(!host)return;host.replaceChildren();
 if(items.length){items.forEach(item=>host.append(shortcut(item.view,item.meta)));return}
 const empty=root.document.createElement('span');empty.className='workspace-empty-state';empty.textContent=emptyText;host.append(empty);
}
function renderHome(){
 const state=State.snapshot();
 renderList($('workspaceFavorites'),state.favorites.map(view=>({view,meta:homeText('pinnedMeta',{},'Pinned')})),homeText('pinHint',{},'Pin modules with the ☆ icon in the sidebar.'));
 renderList($('workspaceRecent'),state.recent.map(item=>({view:item.view,meta:relative(item.time)})),homeText('recentHint',{},'Your recently used modules will appear here.'));
 root.document.dispatchEvent(new CustomEvent('nsw:workspace-home-rendered'));
}
function refresh(){applyGroupState();renderPins();renderHome();const active=q('.view.active[id]');if(active)updateBreadcrumb(active.id)}

function init(){
 qa('.workspace-group-toggle').forEach(button=>button.onclick=()=>toggleGroup(button.closest('.workspace-nav-group')));
 qa('.nav').forEach(button=>button.onclick=event=>{if(!event.target.closest('.workspace-pin'))activate(button.dataset.view)});
 qa('.workspace-pin').forEach(pin=>{
  const toggle=event=>{event.preventDefault();event.stopPropagation();State.toggleFavorite(pin.closest('.nav')?.dataset.view)};
  pin.onclick=toggle;pin.onkeydown=event=>{if(event.key==='Enter'||event.key===' ')toggle(event)};
 });
 q('.workspace-home-nav')?.addEventListener('click',()=>activate('homeView'));
 $('workspaceBreadcrumbHome')?.addEventListener('click',()=>activate('homeView'));
 $('clearWorkspaceRecent')?.addEventListener('click',()=>State.clearRecent());
 $('homeView')?.addEventListener('click',event=>{const button=event.target.closest('[data-open-view]');if(button)activate(button.dataset.openView)});
 root.document.addEventListener('nsw:workspace-state-change',event=>{
  const reason=event.detail?.reason;
  if(reason==='group')applyGroupState();
  if(reason==='favorite'){renderPins();renderHome()}
  if(reason==='recent'||reason==='clear-recent'||reason==='navigation')renderHome();
 });
 root.document.addEventListener('nordlicht-language-changed',refresh);
 refresh();
 const current=q('.view.active')?.id,last=State.snapshot().lastView;
 if(!root.document.body.classList.contains('simple-mode'))activate(current&&current!=='simpleView'?current:(last||'randomView'),{recent:false});
 const observer=new MutationObserver(()=>{
  const active=q('.view.active[id]');if(!active||active.id==='simpleView')return;
  const nav=navFor(active.id);if(nav&&!nav.classList.contains('active')){
   qa('.nav,.workspace-home-nav').forEach(button=>button.classList.toggle('active',button===nav));
   if(active.id!=='homeView')ensureGroupOpen(groupOf(active.id));updateBreadcrumb(active.id);
  }
 });
 qa('.view').forEach(view=>observer.observe(view,{attributes:true,attributeFilter:['class']}));
 root.NSWWorkspaceNavigation=Object.freeze({VERSION:'7.5.10',open:activate,home:()=>activate('homeView'),renderHome,refresh,state:State});
}
if(root.document.readyState==='loading')root.document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})(typeof globalThis!=='undefined'?globalThis:this);

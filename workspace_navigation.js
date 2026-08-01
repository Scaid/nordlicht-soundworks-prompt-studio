(function(){
'use strict';
const STORE_OPEN='nsw-workspace-open-v1',STORE_FAV='nsw-workspace-favorites-v1',STORE_RECENT='nsw-workspace-recent-v1',STORE_LAST='nsw-workspace-last-view-v1';
const $=id=>document.getElementById(id), q=(s,r=document)=>r.querySelector(s), qa=(s,r=document)=>[...r.querySelectorAll(s)];
const groups={create:['randomView','composerView','styleView','lyricsView','promptChatView','assistantView'],analyze:['dnaAnalyzerView','optimizerView','evolutionView','learningView'],knowledge:['metatagsView','styleLibraryView','blueprintView','instrumentsView','vocalsView','storyView','productionView','theoryView'],project:['presetsView']};
const icons={randomView:'🎲',composerView:'🤖',styleView:'🎼',lyricsView:'✍️',promptChatView:'💬',assistantView:'🧭',dnaAnalyzerView:'🧬',optimizerView:'🧹',evolutionView:'🌱',learningView:'🧠',metatagsView:'🏷️',styleLibraryView:'📚',blueprintView:'🗺️',instrumentsView:'🎻',vocalsView:'🎤',storyView:'🌍',productionView:'🎧',theoryView:'♫',presetsView:'⭐',homeView:'🏠'};
const names={randomView:'Smart Randomizer',composerView:'AI Composer',styleView:'Style Builder',lyricsView:'Lyrics Workspace',promptChatView:'AI Prompt Chat',assistantView:'Offline Smart Assistant',dnaAnalyzerView:'Song DNA Analyzer',optimizerView:'Prompt Optimizer',evolutionView:'Prompt Evolution',learningView:'Learning Engine',metatagsView:'Prompt Intelligence',styleLibraryView:'Style Library',blueprintView:'Song Blueprint',instrumentsView:'Instrument Library',vocalsView:'Vocal Intelligence',storyView:'Story & Emotion',productionView:'Production Intelligence',theoryView:'Musical Intelligence',presetsView:'Presets',homeView:'Home'};
const read=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
function groupOf(view){return Object.keys(groups).find(k=>groups[k].includes(view))||'create'}
function openGroup(group,persist=true){qa('.workspace-nav-group').forEach(g=>{const on=g.dataset.workspace===group;g.classList.toggle('open',on);const b=q('.workspace-group-toggle',g);b?.setAttribute('aria-expanded',String(on));const i=q('.workspace-group-toggle i',g);if(i)i.textContent=on?'⌄':'›'});if(persist)write(STORE_OPEN,group)}
function updateBreadcrumb(view){const home=view==='homeView';$('workspaceBreadcrumb').style.display=home?'none':'flex';if(home)return;const g=groupOf(view);$('workspaceBreadcrumbGroup').textContent=g[0].toUpperCase()+g.slice(1);$('workspaceBreadcrumbModule').textContent=names[view]||view}
function addRecent(view){if(view==='homeView')return;let r=read(STORE_RECENT,[]).filter(x=>x.view!==view);r.unshift({view,time:Date.now()});write(STORE_RECENT,r.slice(0,6));renderHome()}
function activate(view,{recent=true}={}){const target=$(view);if(!target)return;qa('.view').forEach(v=>v.classList.remove('active'));target.classList.add('active');qa('.nav,.workspace-home-nav').forEach(b=>b.classList.toggle('active',b.dataset.view===view));if(view!=='homeView')openGroup(groupOf(view));updateBreadcrumb(view);write(STORE_LAST,view);if(recent)addRecent(view);window.scrollTo({top:0,behavior:'smooth'})}
function togglePin(view){let f=read(STORE_FAV,[]);f=f.includes(view)?f.filter(x=>x!==view):[...f,view];write(STORE_FAV,f);renderPins();renderHome()}
function renderPins(){const f=read(STORE_FAV,[]);qa('.workspace-pin').forEach(p=>{const v=p.closest('.nav')?.dataset.view,on=f.includes(v);p.classList.toggle('pinned',on);p.textContent=on?'★':'☆';p.title=on?'Unpin module':'Pin module'})}
function shortcut(view,meta=''){return `<button class="workspace-shortcut" type="button" data-open-view="${view}"><span>${icons[view]||'•'} <b>${names[view]||view}</b></span><small>${meta}</small></button>`}
function relative(ts){const m=Math.max(1,Math.round((Date.now()-ts)/60000));return m<60?`${m} min ago`:m<1440?`${Math.round(m/60)} h ago`:`${Math.round(m/1440)} d ago`}
function renderHome(){const f=read(STORE_FAV,[]),r=read(STORE_RECENT,[]);if($('workspaceFavorites'))$('workspaceFavorites').innerHTML=f.length?f.map(v=>shortcut(v,'Pinned')).join(''):'<span class="workspace-empty-state">Pin modules with the ☆ icon in the sidebar.</span>';if($('workspaceRecent'))$('workspaceRecent').innerHTML=r.length?r.map(x=>shortcut(x.view,relative(x.time))).join(''):'<span class="workspace-empty-state">Your recently used modules will appear here.</span>';qa('[data-open-view]').forEach(b=>b.onclick=()=>activate(b.dataset.openView))}
function init(){
 qa('.workspace-group-toggle').forEach(b=>b.onclick=()=>{const g=b.closest('.workspace-nav-group');openGroup(g.classList.contains('open')?'':g.dataset.workspace)});
 qa('.nav').forEach(b=>b.onclick=e=>{if(e.target.closest('.workspace-pin'))return;activate(b.dataset.view)});
 qa('.workspace-pin').forEach(p=>{const go=e=>{e.preventDefault();e.stopPropagation();togglePin(p.closest('.nav').dataset.view)};p.onclick=go;p.onkeydown=e=>{if(e.key==='Enter'||e.key===' ' )go(e)}});
 q('.workspace-home-nav')?.addEventListener('click',()=>activate('homeView'));
 $('workspaceBreadcrumbHome')?.addEventListener('click',()=>activate('homeView'));
 $('clearWorkspaceRecent')?.addEventListener('click',()=>{write(STORE_RECENT,[]);renderHome()});
 openGroup(read(STORE_OPEN,'create'),false);renderPins();renderHome();
 const last=read(STORE_LAST,'randomView');const current=q('.view.active')?.id;
 if(document.body.classList.contains('simple-mode'))return;
 activate(current&&current!=='simpleView'?current:(last==='homeView'?'homeView':last),{recent:false});
 const observer=new MutationObserver(()=>{const active=q('.view.active');if(!active||active.id==='simpleView'||active.id==='homeView')return;const nav=q(`.nav[data-view="${active.id}"]`);if(nav&&!nav.classList.contains('active')){qa('.nav,.workspace-home-nav').forEach(b=>b.classList.toggle('active',b===nav));openGroup(groupOf(active.id));updateBreadcrumb(active.id)}});
 qa('.view').forEach(v=>observer.observe(v,{attributes:true,attributeFilter:['class']}));
 window.NSWWorkspaceNavigation={open:activate,home:()=>activate('homeView'),renderHome};
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
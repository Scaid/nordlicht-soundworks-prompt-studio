(function(){
'use strict';
const $=id=>document.getElementById(id);
const STORAGE='nsw-style-builder-tab-v526';
const TABS=[
 {id:'genre',label:'🎼 Genre & Tempo',source:'styleView',description:'Genre, blend, tempo and song structure'},
 {id:'vocals',label:'🎤 Vocals',source:'vocalsView',description:'Lead voice, choir, duet and vocal character'},
 {id:'story',label:'🌍 Story & Emotion',source:'storyView',description:'World, scene, emotion, atmosphere and energy'}
];
function integrate(){
 const style=$('styleView'),vocals=$('vocalsView'),story=$('storyView');if(!style||!vocals||!story||$('styleBuilderWorkspace'))return;
 const head=style.querySelector('.view-head');
 if(head){head.innerHTML='<div><h1>🎼 Style Builder Workspace</h1><p>Genre, Vocals und Story & Emotion jetzt zentral in einem übersichtlichen Arbeitsbereich.</p></div><span class="sbw-badge">3 kreative Bereiche</span>';head.classList.add('sbw-head')}
 const genreNodes=[...style.children].filter(x=>x!==head);
 const workspace=document.createElement('div');workspace.id='styleBuilderWorkspace';workspace.className='sbw-workspace';
 const nav=document.createElement('aside');nav.className='sbw-tabs';nav.innerHTML='<div class="sbw-tabs-title"><b>Style Builder</b><small>Wähle nur den Bereich, den du gerade brauchst.</small></div>'+TABS.map(t=>`<button type="button" data-sbw-tab="${t.id}"><b>${t.label}</b><small>${t.description}</small></button>`).join('')+'<div class="sbw-help"><b>Workflow</b><small>1. Genre wählen<br>2. Stimme festlegen<br>3. Story & Emotion ergänzen<br>4. STYLE kopieren</small></div>';
 const content=document.createElement('main');content.className='sbw-content';
 const genrePane=document.createElement('section');genrePane.className='sbw-pane';genrePane.dataset.sbwPane='genre';genreNodes.forEach(n=>genrePane.appendChild(n));
 const vocalPane=document.createElement('section');vocalPane.className='sbw-pane';vocalPane.dataset.sbwPane='vocals';
 const storyPane=document.createElement('section');storyPane.className='sbw-pane';storyPane.dataset.sbwPane='story';
 moveView(vocals,vocalPane,'Vocals');moveView(story,storyPane,'Story & Emotion');
 content.append(genrePane,vocalPane,storyPane);workspace.append(nav,content);style.appendChild(workspace);
 vocals.classList.add('sbw-integrated-source');story.classList.add('sbw-integrated-source');
 document.querySelectorAll('.nav[data-view="vocalsView"],.nav[data-view="storyView"]').forEach(x=>x.remove());
 nav.querySelectorAll('[data-sbw-tab]').forEach(b=>b.onclick=()=>activate(b.dataset.sbwTab));
 activate(localStorage.getItem(STORAGE)||'genre');
 addQuickLinks();
}
function moveView(view,pane,title){
 const oldHead=view.querySelector('.view-head');if(oldHead)oldHead.remove();
 const intro=document.createElement('div');intro.className='sbw-pane-intro';intro.innerHTML=`<h2>${title}</h2><p>Alle bisherigen Einstellungen bleiben erhalten, sind aber jetzt direkt im Style Builder erreichbar.</p>`;pane.appendChild(intro);
 [...view.children].forEach(n=>pane.appendChild(n));
}
function activate(id){
 if(!TABS.some(t=>t.id===id))id='genre';
 document.querySelectorAll('[data-sbw-tab]').forEach(b=>b.classList.toggle('active',b.dataset.sbwTab===id));
 document.querySelectorAll('[data-sbw-pane]').forEach(p=>p.classList.toggle('active',p.dataset.sbwPane===id));
 localStorage.setItem(STORAGE,id);
}
function addQuickLinks(){
 const toolbar=document.createElement('div');toolbar.className='sbw-quick-toolbar';toolbar.innerHTML='<span>Direkt zu:</span><button data-open="genre">Genre & Tempo</button><button data-open="vocals">Vocals</button><button data-open="story">Story & Emotion</button><button data-view="vocalDirectorView">Vocal Director 2.0</button>';
 const style=$('styleView'),head=style.querySelector('.view-head');head?.after(toolbar);
 toolbar.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>activate(b.dataset.open));
 toolbar.querySelector('[data-view]')?.addEventListener('click',e=>window.NSWConnections?.navigate(e.currentTarget.dataset.view));
}
function redirectLegacy(){
 document.addEventListener('click',e=>{
  const b=e.target.closest('[data-view="vocalsView"],[data-view="storyView"]');if(!b)return;
  e.preventDefault();document.querySelector('.nav[data-view="styleView"]')?.click();activate(b.dataset.view==='vocalsView'?'vocals':'story');
 },true);
}
function init(){integrate();redirectLegacy()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

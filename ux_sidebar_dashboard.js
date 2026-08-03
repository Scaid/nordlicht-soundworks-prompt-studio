(function(){
'use strict';
const $=id=>document.getElementById(id);
const GROUPS=[
 {id:'start',title:'🏠 START',sub:'Dashboard, direction and fast entry',views:['homeView','assistantView','songDirectorView','composerView']},
 {id:'compose',title:'🎼 COMPOSE',sub:'Style, lyrics and song architecture',views:['styleView','lyricsView','blueprintView','arrangementDesignerView','promptChatView']},
 {id:'sound',title:'🎹 SOUND DESIGN',sub:'Genre, instruments, vocals, theory and production',views:['genreIntelligenceView','genreEvolutionView','worldMusicView','instrumentsView','instrumentEncyclopediaView','instrumentEvolutionView','instrumentGraphView','vocalDirectorView','theoryDirectorView','theoryView','productionView']},
 {id:'knowledge',title:'📚 KNOWLEDGE',sub:'Libraries, reference and prompt intelligence',views:['metaTagEncyclopediaView','metatagsView','styleLibraryView']},
 {id:'analyze',title:'🧠 AI ANALYSIS',sub:'Direct, inspect, optimize, predict and learn',views:['musicDirectorView','dnaAnalyzerView','lyricsIntelligenceView','optimizerView','successPredictorView','evolutionView','learningView']},
 {id:'organize',title:'📁 ORGANIZE',sub:'Projects, presets and saved work',views:['projectManagerView','presetsView']}
];
function reorganize(){
 const nav=$('navigation');if(!nav)return;
 const buttons=[...nav.querySelectorAll('.nav')],map=new Map(buttons.map(b=>[b.dataset.view,b]));
 const random=map.get('randomView');
 const homeExisting=nav.querySelector('.workspace-home-nav');
 nav.innerHTML='';
 if(random){random.classList.add('ux-quick-random');nav.appendChild(random)}
 const home=homeExisting||document.createElement('button');home.className='workspace-home-nav';home.type='button';home.dataset.view='homeView';home.innerHTML='🏠<span><b>Studio Dashboard</b><small>Calm overview and recommended next step</small></span>';nav.appendChild(home);
 const note=document.createElement('div');note.className='ux-sidebar-note';note.textContent='Arbeite von oben nach unten: Idee → Style → Lyrics → Sound → Analyse → Projekt.';nav.appendChild(note);
 GROUPS.forEach((g,gi)=>{
  const sec=document.createElement('section');sec.className='workspace-nav-group'+(gi===0?' open':'');sec.dataset.workspace=g.id;
  const toggle=document.createElement('button');toggle.className='workspace-group-toggle';toggle.type='button';toggle.setAttribute('aria-expanded',gi===0?'true':'false');toggle.innerHTML=`<span>${g.title}</span><small>${g.sub}</small><i>${gi===0?'⌄':'›'}</i>`;
  const items=document.createElement('div');items.className='workspace-group-items';
  g.views.forEach(v=>{if(v==='homeView')return;const b=map.get(v);if(b)items.appendChild(b)});
  sec.append(toggle,items);nav.appendChild(sec);
 });
 const assigned=new Set(['randomView',...GROUPS.flatMap(g=>g.views)]);
 buttons.filter(b=>!assigned.has(b.dataset.view)).forEach(b=>nav.querySelector('[data-workspace="organize"] .workspace-group-items')?.appendChild(b));
 nav.dataset.uxSorted='526';
 nav.querySelectorAll('.workspace-group-toggle').forEach(t=>t.onclick=()=>{
  const s=t.closest('.workspace-nav-group'),open=s.classList.toggle('open');t.setAttribute('aria-expanded',String(open));t.querySelector('i').textContent=open?'⌄':'›';
 });
}
function dashboard(){
 const v=$('homeView');if(!v||$('uxDashboard'))return;
 const old=[...v.children];old.forEach(x=>x.classList.add('ux-old-dashboard-collapsed'));
 const d=document.createElement('section');d.id='uxDashboard';d.className='ux-dashboard';
 d.innerHTML=`<div class="ux-dashboard-hero"><h1>Willkommen im Prompt Studio</h1><p>Starte mit einer Idee. Du musst nicht alle Module gleichzeitig verstehen oder benutzen.</p><div class="ux-dashboard-actions"><button class="primary" data-go="randomView">🎲 Smart Randomizer</button><button data-go="songDirectorView">🧠 Song Director</button><button data-go="styleView">🎼 Style Builder</button><button data-go="projectManagerView">🗂 Projekt öffnen</button></div></div><div class="ux-dashboard-grid"><article class="ux-dash-card"><h3>Schnellster Einstieg</h3><p>Ein Satz genügt im einfachen Modus.</p><button data-mode="simple">Einfachen Modus öffnen</button></article><article class="ux-dash-card"><h3>Kompletten Song planen</h3><p>Der Song Director verbindet alle wichtigen Bereiche.</p><button data-go="songDirectorView">Song Director öffnen</button></article><article class="ux-dash-card"><h3>Empfohlener nächster Schritt</h3><p id="uxNextText">Beginne mit einer Songidee.</p><button id="uxNextButton" data-go="songDirectorView">Weiter</button></article></div><button class="ux-show-old" id="uxShowOld">Weitere Dashboard-Details anzeigen</button>`;
 v.prepend(d);
 d.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>document.querySelector(`.nav[data-view="${b.dataset.go}"],.workspace-home-nav[data-view="${b.dataset.go}"]`)?.click());
 d.querySelector('[data-mode="simple"]').onclick=()=>$('simpleModeButton')?.click();
 $('uxShowOld').onclick=()=>{old.forEach(x=>x.classList.toggle('ux-old-dashboard-collapsed'));$('uxShowOld').textContent=old[0]?.classList.contains('ux-old-dashboard-collapsed')?'Weitere Dashboard-Details anzeigen':'Dashboard-Details ausblenden'};
 const snap=window.NSWConnections?.snapshot();let next='songDirectorView',text='Beginne mit einer Songidee im Song Director.';
 if(snap?.modules?.style?.ready&&!snap?.modules?.lyrics?.ready){next='lyricsView';text='Dein STYLE ist fertig. Ergänze als Nächstes Lyrics oder MetaTags.'}
 else if(snap?.modules?.style?.ready&&snap?.modules?.lyrics?.ready){next='successPredictorView';text='STYLE und Lyrics sind vorhanden. Führe jetzt den Success Predictor aus.'}
 $('uxNextText').textContent=text;$('uxNextButton').dataset.go=next;$('uxNextButton').onclick=()=>document.querySelector(`.nav[data-view="${next}"]`)?.click();
}
function init(){reorganize();dashboard()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

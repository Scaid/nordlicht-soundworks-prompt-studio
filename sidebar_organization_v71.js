
(function(){
'use strict';
const GROUPS=[
 {id:'create',label:'✨ CREATE',desc:'Start ideas and coordinate the complete song',open:true,views:[
  'randomView','homeView','studioIntelligenceView','aiProducerView','songDirectorView','assistantView','composerView','musicDirectorView'
 ]},
 {id:'style',label:'🎨 STYLE',desc:'Build, simplify, vary and validate the STYLE prompt',views:[
  'styleView','styleHealthView','styleSimplifierView','variationEngineView','conflictResolverView','optimizerView','evolutionView','promptChatView'
 ]},
 {id:'song',label:'🎵 SONG',desc:'Arrange, perform and complete the production',views:[
  'blueprintView','arrangementDesignerView','vocalDirectorView','theoryDirectorView','productionView','theoryView','successPredictorView'
 ]},
 {id:'lyrics',label:'📝 LYRICS',desc:'Write, structure and improve lyrics',views:[
  'lyricsView','lyricsIntelligenceView'
 ]},
 {id:'knowledge',label:'📚 KNOWLEDGE',desc:'Explore genres, instruments, MetaTags and musical systems',views:[
  'genreIntelligenceView','worldMusicView','genreEvolutionView','metaTagEncyclopediaView','metatagsView',
  'instrumentsView','instrumentEncyclopediaView','instrumentEvolutionView','instrumentGraphView','styleLibraryView'
 ]},
 {id:'analysis',label:'🔍 ANALYSIS',desc:'Understand, compare and learn from results',views:[
  'dnaAnalyzerView','learningView'
 ]},
 {id:'project',label:'📁 PROJECTS',desc:'Manage projects, presets and versions',views:[
  'projectManagerView','presetsView'
 ]}
];
function init(){
 const nav=document.getElementById('navigation');if(!nav||nav.dataset.v71Organized)return;
 nav.dataset.v71Organized='1';
 const home=nav.querySelector('.workspace-home-nav');
 const allButtons=[...nav.querySelectorAll('.nav[data-view]')];
 const byView=new Map(allButtons.map(b=>[b.dataset.view,b]));
 nav.querySelectorAll('.workspace-nav-group').forEach(g=>g.remove());
 const frag=document.createDocumentFragment();
 GROUPS.forEach((g,idx)=>{
  const sec=document.createElement('section');sec.className='workspace-nav-group'+(g.open?' open':'');sec.dataset.workspace=g.id;
  const toggle=document.createElement('button');toggle.className='workspace-group-toggle';toggle.type='button';toggle.setAttribute('aria-expanded',g.open?'true':'false');
  toggle.innerHTML=`<span>${g.label}</span><small>${g.desc}</small><i>${g.open?'⌄':'›'}</i>`;
  const items=document.createElement('div');items.className='workspace-group-items';
  g.views.forEach(v=>{const b=byView.get(v);if(b)items.appendChild(b)});
  sec.append(toggle,items);frag.appendChild(sec);
 });
 if(home)home.after(frag);else nav.prepend(frag);
 // Any future/unclassified module goes to Analysis instead of Projects.
 const used=new Set(GROUPS.flatMap(g=>g.views));
 const leftovers=allButtons.filter(b=>!used.has(b.dataset.view));
 const analysis=nav.querySelector('[data-workspace="analysis"] .workspace-group-items');
 leftovers.forEach(b=>analysis?.appendChild(b));
 // Randomizer remains the first visible module.
 const createItems=nav.querySelector('[data-workspace="create"] .workspace-group-items');
 const random=byView.get('randomView');if(random&&createItems)createItems.prepend(random);
 // Interaction and persistence belong to the canonical workspace navigation.
 // This module owns only the DOM grouping so that no second accordion state can
 // diverge from favorites, recent modules or the active workspace.
 window.NSW_SIDEBAR_GROUPS_V71=GROUPS;
 document.dispatchEvent(new CustomEvent('nsw:workspace-navigation-built',{detail:{version:'7.5.10',groups:GROUPS.map(group=>group.id)}}));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

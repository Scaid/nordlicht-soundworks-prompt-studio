
(function(){
'use strict';const $=id=>document.getElementById(id);
const M={
intelligence:{label:'Studio Intelligence',view:'studioIntelligenceView',read:()=>window.NSW_STUDIO_INTELLIGENCE_LAST||null,ready:x=>!!x},
producer:{label:'AI Producer',view:'aiProducerView',read:()=>window.NSW_AI_PRODUCER_LAST||null,ready:x=>!!x},
worldMusic:{label:'World Music Atlas',view:'worldMusicView',read:()=>window.NSW_WORLD_MUSIC_LAST||null,ready:x=>!!x},
encyclopedia:{label:'Instrument Encyclopedia',view:'instrumentEncyclopediaView',read:()=>window.NSW_INSTRUMENT_ENCYCLOPEDIA_LAST||null,ready:x=>!!x},
style:{label:'Style Builder',view:'styleView',read:()=>({style:$('styleOutput')?.value||$('customStyle')?.value||'',exclude:$('excludeOutput')?.value||$('customExclude')?.value||''}),ready:x=>!!x.style},
lyrics:{label:'Lyrics Workspace',view:'lyricsView',read:()=>({lyrics:$('lyricsEditor')?.value||''}),ready:x=>!!x.lyrics.trim()},
blueprint:{label:'Song Blueprint',view:'blueprintView',read:()=>window.NSW_SONG_BLUEPRINT_LAST||null,ready:x=>!!x},
genre:{label:'Genre Evolution',view:'genreEvolutionView',read:()=>window.NSW_GENRE_EVOLUTION_LAST||null,ready:x=>!!x},
instrument:{label:'Instrument Evolution',view:'instrumentEvolutionView',read:()=>window.NSW_INSTRUMENT_EVOLUTION_LAST||null,ready:x=>!!x},
vocal:{label:'Vocal Director',view:'vocalDirectorView',read:()=>window.NSW_VOCAL_DIRECTOR_LAST||null,ready:x=>!!x},
theory:{label:'Music Theory',view:'theoryView',read:()=>({dna:$('musicTheoryDnaOutput')?.value||$('theoryDNAOutput')?.value||''}),ready:x=>!!x.dna},
production:{label:'Production Intelligence',view:'productionView',read:()=>({production:$('productionDNAOutput')?.value||$('productionOutput')?.value||'',mix:$('mix')?.value||'',dynamics:$('dynamics')?.value||''}),ready:x=>!!(x.production||x.mix||x.dynamics)},
predictor:{label:'Success Predictor',view:'successPredictorView',read:()=>window.NSW_SUCCESS_PREDICTOR_LAST||null,ready:x=>!!x},
learning:{label:'Learning Engine',view:'learningView',read:()=>{let d=[];try{d=JSON.parse(localStorage.getItem('nsw-learning-feedback-v2')||'[]')}catch(e){}return{entries:d.length}},ready:x=>x.entries>0},
project:{label:'Project Manager',view:'projectManagerView',read:()=>{let p=null;try{p=JSON.parse(localStorage.getItem('nsw-project-manager-v4')||'null')}catch(e){}return p},ready:x=>!!x?.projects?.length}
};
function snap(){const modules={};Object.entries(M).forEach(([k,m])=>{let d=null;try{d=m.read()}catch(e){}modules[k]={key:k,label:m.label,view:m.view,data:d,ready:!!m.ready(d)}});return{createdAt:Date.now(),modules}}
function nav(v){document.querySelector(`.nav[data-view="${v}"]`)?.click()}
function merge(parts){const o=[],s=new Set();parts.flatMap(x=>String(x||'').split(/[,;\n]+/)).map(x=>x.trim()).filter(Boolean).forEach(x=>{const k=x.toLowerCase();if(!s.has(k)){s.add(k);o.push(x)}});return o.join(', ')}
function styleParts(s=snap()){const p=[];if(s.modules.genre.ready)p.push(s.modules.genre.data.style);if(s.modules.instrument.ready)p.push(s.modules.instrument.data.dna);if(s.modules.vocal.ready)p.push(s.modules.vocal.data.globalStyle);if(s.modules.theory.ready)p.push(s.modules.theory.data.dna);if(s.modules.production.ready)p.push(s.modules.production.data.production,s.modules.production.data.mix,s.modules.production.data.dynamics);return p.filter(Boolean)}
function tags(s=snap()){const p=[];if(s.modules.instrument.ready)p.push(s.modules.instrument.data.sectionTags);if(s.modules.vocal.ready)p.push(s.modules.vocal.data.dna);return p.filter(Boolean).join('\n\n')}
function setStyle(v){const e=$('customStyle');if(!e)return false;e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));if(typeof generateOutput==='function')generateOutput();return true}
function appendLyrics(v){const e=$('lyricsEditor');if(!e||!v)return false;e.value=e.value.trim()?e.value.trim()+'\n\n'+v:v;e.dispatchEvent(new Event('input',{bubbles:true}));return true}
function sync(type){const s=snap();
if(type==='genre-to-instrument'){if(!s.modules.genre.ready)return{ok:false,message:'Genre Evolution has no active result.'};nav('instrumentEvolutionView');const txt=(s.modules.genre.data.style||'').toLowerCase(),sel=$('ieGenre'),map=[['anime','anime'],['metal','metal'],['rock','rock'],['electronic','edm'],['edm','edm'],['cinematic','cinematic'],['folk','folk'],['viking','folk'],['jazz','jazz'],['swing','jazz'],['ballad','ballad']];const h=map.find(x=>txt.includes(x[0]));if(sel&&h){sel.value=h[1];sel.dispatchEvent(new Event('change',{bubbles:true}))}$('ieSmart')?.click();return{ok:true,message:'Genre Evolution now guides Instrument Evolution.'}}
if(type==='genre-to-vocal'){if(!s.modules.genre.ready)return{ok:false,message:'Genre Evolution has no active result.'};nav('vocalDirectorView');const txt=(s.modules.genre.data.style||'').toLowerCase(),sel=$('vdGenre'),map=[['anime','anime'],['metal','metal'],['viking','viking'],['folk','viking'],['k-pop','kpop'],['rap','rap'],['hip-hop','rap'],['edm','edm'],['electronic','edm'],['cinematic','cinematic'],['swing','swing'],['jazz','swing'],['ballad','ballad']];const h=map.find(x=>txt.includes(x[0]));if(sel&&h){sel.value=h[1];sel.dispatchEvent(new Event('change',{bubbles:true}))}$('vdSmartDirector')?.click();return{ok:true,message:'Genre Evolution now guides Vocal Director.'}}
if(type==='blueprint-to-vocal'){if(!s.modules.blueprint.ready)return{ok:false,message:'Song Blueprint has no active result.'};nav('vocalDirectorView');if($('vdSource'))$('vdSource').value='blueprint';$('vdGenerate')?.click();return{ok:true,message:'Blueprint sections were transferred to Vocal Director.'}}
if(type==='all-to-style'){const v=merge([$('customStyle')?.value||'',...styleParts(s)]);if(!v)return{ok:false,message:'No connected module DNA is available.'};setStyle(v);return{ok:true,message:'Connected module DNA was merged into STYLE.'}}
if(type==='all-to-lyrics'){const v=tags(s);if(!v)return{ok:false,message:'No section-specific Instrument or Vocal DNA is available.'};appendLyrics(v);return{ok:true,message:'Section MetaTags were added to Lyrics Workspace.'}}
if(type==='studio-to-project'){nav('projectManagerView');$('pmCaptureCurrent')?.click();return{ok:true,message:'Current Studio state was captured in Project Manager.'}}
if(type==='studio-to-predictor'){nav('successPredictorView');$('spUseStudio')?.click();$('spAnalyze')?.click();return{ok:true,message:'Synchronized setup was sent to Success Predictor.'}}
if(type==='project-to-studio'){nav('projectManagerView');$('pmRestoreCurrent')?.click();return{ok:true,message:'Active project track was restored to Studio.'}}
return{ok:false,message:'Unknown synchronization action.'}}
window.NSWConnections={MODULES:M,snapshot:snap,readyCount:s=>Object.values((s||snap()).modules).filter(x=>x.ready).length,navigate:nav,mergeStyle:merge,globalStyleParts:styleParts,sectionTags:tags,setStyle,appendLyrics,sync};
})();

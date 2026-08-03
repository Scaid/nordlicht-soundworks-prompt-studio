
(function(){
'use strict';const $=id=>document.getElementById(id);let result=null,active='creative';
const ideas=['Episches Anime-Opening mit Orchester, weiblicher Stimme und modernem Rock-Finale.','Dunkler Mittelalter-Song aus einer Taverne mit Drehleier, Laute, Männerchor und kräftigen Trommeln.','Emotionaler Electro-Swing-Comedy-Song mit männlicher Stimme, Big Band und explosivem Refrain.','Mystischer nordischer EDM-Track mit Tagelharpa, Frauenchor und zwei massiven Drops.'];
function build(){
 const text=$('simpleSentence').value.trim();if(!text){$('simpleSentenceStatus').textContent='Beschreibe zuerst deinen gewünschten Song.';return}
 const base=window.NSWSongDirectorCore?.buildDirectorResult(text,{profile:'balanced',goal:'song',duration:'3:00',language:'auto',useLearning:false});
 if(!base)return;
 const core=base.style.split(',').map(x=>x.trim()).filter(Boolean),short=core.slice(0,10),balanced=core.slice(0,18);
 result={
  safe:short.concat(['Clear Arrangement','Focused Instrument Palette']).join(', '),
  creative:balanced.join(', '),
  extreme:window.NSWConnections?.mergeStyle([balanced.join(', '),'Unexpected Genre Contrast','Experimental Section Transitions','Extreme Dynamic Contrast','Unconventional Instrument Layering'])||balanced.join(', '),
  base
 };
 active=$('simpleSentencePriority').value;show(active);$('simpleSentenceResult').classList.remove('hidden');$('simpleSentenceStatus').textContent='Style erfolgreich erstellt.';
}
function show(v){if(!result)return;active=v;document.querySelectorAll('#simpleVariantTabs button').forEach(b=>b.classList.toggle('active',b.dataset.variant===v));let out=result[v],length=$('simpleSentenceLength').value;if(length==='short')out=out.split(',').slice(0,10).join(', ');if(length==='detailed'&&v!=='extreme')out=window.NSWConnections?.mergeStyle([out,'Dynamic Mix','Section-Specific Arrangement','Strong Final Chorus','Clear Voice Separation'])||out;$('simpleSentenceOutput').value=out;const b=result.base.parsed;$('simpleSentenceScore').textContent=(v==='safe'?94:v==='creative'?88:76)+'%';$('simpleSentenceExplain').textContent=`${b.primaryGenre.label} wurde als Hauptstil erkannt. ${b.vocals.join(', ')} und ${b.instruments.slice(0,5).join(', ')} bilden die wichtigsten Klangelemente.`;$('simpleSentenceWarning').textContent=v==='extreme'?'Die experimentelle Variante kann unvorhersehbarer reagieren. Für zuverlässige Ergebnisse zuerst die klare oder kreative Variante testen.':b.instruments.length>6?'Die Instrumentenpalette wurde auf die wichtigsten Elemente konzentriert.':'Keine wichtigen Konflikte erkannt.'}
function apply(){const out=$('simpleSentenceOutput').value,e=$('customStyle');if(!e||!out)return;const preserve=$('simpleSentencePreserve').checked;e.value=preserve?(window.NSWConnections?.mergeStyle([e.value,out])||e.value+', '+out):out;e.dispatchEvent(new Event('input',{bubbles:true}));if(typeof generateOutput==='function')generateOutput();$('simpleSentenceStatus').textContent='STYLE wurde in den Style Builder übernommen.'}
function init(){if(!$('simpleSentenceGenerate'))return;$('simpleSentenceGenerate').onclick=build;$('simpleSentenceExample').onclick=()=>{$('simpleSentence').value=ideas[1]};$('simpleSentenceSurprise').onclick=()=>{$('simpleSentence').value=ideas[Math.floor(Math.random()*ideas.length)];build()};document.querySelectorAll('#simpleVariantTabs button').forEach(b=>b.onclick=()=>show(b.dataset.variant));$('simpleSentenceLength').onchange=()=>result&&show(active);$('simpleSentenceCopy').onclick=()=>navigator.clipboard?.writeText($('simpleSentenceOutput').value);$('simpleSentenceApply').onclick=apply;$('simpleSentenceDirector').onclick=()=>{const text=$('simpleSentence').value;document.querySelector('.nav[data-view="songDirectorView"]')?.click();if($('sdBrief')){$('sdBrief').value=text;$('sdBrief').dispatchEvent(new Event('input',{bubbles:true}))}};$('simpleLegacyToggle').onclick=()=>{const x=$('simpleLegacyControls'),hidden=x.classList.toggle('hidden');$('simpleLegacyToggle').textContent=hidden?'Manuelle Simple-Mode-Einstellungen anzeigen':'Manuelle Einstellungen ausblenden'};}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

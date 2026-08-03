
(function(){
'use strict';
const $=id=>document.getElementById(id);let last=null,selected=0;
const split=s=>String(s||'').split(/[,;\n]+/).map(x=>x.trim()).filter(Boolean);
const uniq=a=>{const seen=new Set();return a.filter(x=>{const k=x.toLowerCase();if(seen.has(k))return false;seen.add(k);return true})};
const recipes={
 darker:{add:['Dark Cinematic Atmosphere','Low-Mid Weight','Restrained High End','Ominous Harmonic Color','Deep Spatial Reverb'],remove:[/bright|happy|cheerful|sunny/i]},
 modern:{add:['Modern Production','Tight Low End','Clear Transients','Contemporary Drum Design','Wide Controlled Mix'],remove:[/vintage only|antique recording/i]},
 aggressive:{add:['Aggressive Rhythmic Drive','Punchy Drums','Heavy Low End','Explosive Chorus','Hard Dynamic Attacks'],remove:[/gentle|relaxed|soft only/i]},
 calmer:{add:['Restrained Verses','Gentle Dynamics','Warm Intimate Mix','Sparse Percussion','Controlled Emotional Lift'],remove:[/constant high energy|explosive throughout/i]},
 anime:{add:['Anime Opening Energy','Fast Hook Arrival','Cinematic Strings','Electric Guitar','Layered Final Chorus'],remove:[]},
 viking:{add:['Nordic Folk Influence','Tagelharpa','War Drums','Deep Male Choir','Ritual Drone'],remove:[/funk brass|reggaeton/i]},
 metal:{add:['Modern Metal Influence','Distorted Guitars','Punchy Acoustic Drums','Heavy Bass','Breakdown Contrast'],remove:[/soft percussion only/i]},
 cinematic:{add:['Cinematic Hybrid Production','Dynamic Orchestral Build','Narrative Contrast','Wide Final Climax','Cinematic Impacts'],remove:[]},
 electronic:{add:['Electronic Production','Synth Bass','Programmed Drums','Build and Drop Contrast','Modern Sound Design'],remove:[]},
 authentic:{add:['Authentic Performance Character','Organic Room Sound','Regionally Coherent Instruments','Natural Dynamics','Traditional Rhythmic Feel'],remove:[/festival edm|ultra polished pop/i]},
 unexpected:{add:['Unexpected Genre Fusion','Controlled Contrast','One Stable Rhythmic Anchor','Unusual Instrument Pairing','Section-Specific Transformation'],remove:[]}
};
function generate(){
 const input=$('veInput').value.trim();if(!input){$('veStatus').textContent='Add a STYLE first.';return}
 const dir=$('veDirection').value,str=$('veStrength').value,count=+$('veCount').value,base=split(input),recipe=recipes[dir];
 const amount={light:2,medium:4,strong:5}[str],variants=[];
 for(let i=0;i<count;i++){
  let core=base.filter(t=>!recipe.remove.some(r=>r.test(t)));
  const additions=recipe.add.slice(i%2, i%2+amount).concat(recipe.add.slice(0,Math.max(0,amount-(recipe.add.length-i%2))));
  const accent=i===0?'Focused Interpretation':i===1?'Cinematic Interpretation':i===2?'Modern Interpretation':i===3?'Experimental Interpretation':'Alternative Interpretation';
  let out=uniq([...core,...additions,accent]);
  if($('vePreserve').value==='maximum')out=uniq([...base,...additions.slice(0,2),accent]);
  variants.push({label:`${dir.charAt(0).toUpperCase()+dir.slice(1)} ${i+1}`,style:out.join(', '),added:uniq([...additions,accent]),removed:base.filter(x=>!core.includes(x)),identity:Math.max(70,96-additions.length*3-(base.length-core.length)*4)});
 }
 last={input,direction:dir,strength:str,variants,createdAt:Date.now()};selected=0;window.NSW_VARIATION_ENGINE_LAST=JSON.parse(JSON.stringify(last));render()
}
function render(){$('veResults').classList.remove('hidden');$('veGrid').innerHTML=last.variants.map((v,i)=>`<article class="aip-decision ve-variant ${i===selected?'active':''}" data-i="${i}"><header><h3>${v.label}</h3><span class="aip-confidence">${v.identity}% DNA</span></header><strong>${v.added.slice(0,3).join(', ')}</strong><p>Added ${v.added.length} direction(s) · Removed ${v.removed.length} conflict(s)</p></article>`).join('');document.querySelectorAll('.ve-variant').forEach(x=>x.onclick=()=>{selected=+x.dataset.i;render()});const v=last.variants[selected];$('veOutput').value=v.style;$('veSelectedLabel').textContent=v.label;$('veIdentity').textContent=`${v.identity}% identity preserved`;$('veBadge').textContent=`${last.variants.length} variants`;stats()}
function stats(){$('veStats').textContent=`${split($('veInput').value).length} terms`}
function apply(){const e=$('customStyle'),v=last?.variants[selected];if(!e||!v)return;e.value=v.style;e.dispatchEvent(new Event('input',{bubbles:true}));if(typeof generateOutput==='function')generateOutput();$('veStatus').textContent='Variation applied.'}
function init(){if(!$('veGenerate'))return;$('veInput').oninput=stats;$('veGenerate').onclick=generate;$('veImport').onclick=()=>{$('veInput').value=$('customStyle')?.value||'';stats();generate()};$('veSurprise').onclick=()=>{const a=[...$('veDirection').options];$('veDirection').value=a[Math.floor(Math.random()*a.length)].value;generate()};$('veClear').onclick=()=>{$('veInput').value='';$('veResults').classList.add('hidden');stats()};$('veApply').onclick=apply;$('veCopy').onclick=()=>navigator.clipboard?.writeText(last?.variants[selected]?.style||'');$('veSendHealth').onclick=()=>{const v=last?.variants[selected];if(!v)return;window.NSWConnections?.navigate('styleHealthView');setTimeout(()=>{const e=$('shInput');if(e){e.value=v.style;e.dispatchEvent(new Event('input',{bubbles:true}));$('shAnalyze')?.click()}},60)};$('veSendProducer').onclick=()=>{const v=last?.variants[selected];if(!v)return;window.NSWConnections?.navigate('aiProducerView');setTimeout(()=>{const e=$('aipBrief');if(e){e.value='Produce and refine this variation:\\n'+v.style;e.dispatchEvent(new Event('input',{bubbles:true}))}},60)};$('veSaveProject').onclick=()=>{let p;try{p=JSON.parse(localStorage.getItem('nsw-project-manager-v4')||'null')}catch(e){}const pr=p?.projects?.find(x=>x.id===p.activeProjectId)||p?.projects?.[0],t=pr?.tracks?.[0];if(t&&last){t.variationEngine=last;localStorage.setItem('nsw-project-manager-v4',JSON.stringify(p));$('veStatus').textContent='Variation set saved.'}};stats()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

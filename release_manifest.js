(function(root,factory){
'use strict';
const api=factory();
if(typeof module==='object'&&module.exports)module.exports=api;
if(root)root.NSWReleaseManifest=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';

const VERSION='7.5.10';
const RELEASES=Object.freeze([
 Object.freeze({version:'7.5.10',titleKey:'releaseTitle7510',itemKeys:Object.freeze(['release7510Item1','release7510Item2','release7510Item3','release7510Item4','release7510Item5'])}),
 Object.freeze({version:'7.5.9',title:'Vocal Clarity Live Guidance & Context Tour',itemKeys:Object.freeze([])}),
 Object.freeze({version:'7.5.7',title:'Workspace Localization & Guided Tour',itemKeys:Object.freeze([])}),
 Object.freeze({version:'7.5.6',title:'Vocal Clarity Assistant',itemKeys:Object.freeze([])}),
 Object.freeze({version:'7.5.5',title:'MetaTag Pipe-Stack Engine',itemKeys:Object.freeze([])}),
 Object.freeze({version:'7.5.4',title:'Workspace Welcome Tour',itemKeys:Object.freeze([])}),
 Object.freeze({version:'7.5.3',title:'First-Start State Machine',itemKeys:Object.freeze([])}),
 Object.freeze({version:'7.5.2',title:'Onboarding Component Fix',itemKeys:Object.freeze([])}),
 Object.freeze({version:'7.5.1',title:'First Start Experience Polish',itemKeys:Object.freeze([])}),
 Object.freeze({version:'7.5.0',title:'First Start Experience',itemKeys:Object.freeze([])})
]);

function normalizeVersion(value){
 return String(value||'').trim().replace(/^v/i,'');
}

function compareVersions(a,b){
 const left=normalizeVersion(a).split('.').map(Number),right=normalizeVersion(b).split('.').map(Number);
 for(let index=0;index<Math.max(left.length,right.length);index++){
  const difference=(left[index]||0)-(right[index]||0);
  if(difference)return difference;
 }
 return 0;
}

function validate(){
 const versions=RELEASES.map(item=>item.version);
 return Object.freeze({
  currentIsFirst:versions[0]===VERSION,
  unique:new Set(versions).size===versions.length,
  descending:versions.every((version,index)=>index===0||compareVersions(versions[index-1],version)>0)
 });
}

return Object.freeze({
 VERSION,
 badge:`v${VERSION}`,
 product:'Nordlicht Soundworks Prompt Studio',
 releaseName:'UX Foundations & Contextual Help',
 releases:RELEASES,
 normalizeVersion,
 compareVersions,
 validate
});
});

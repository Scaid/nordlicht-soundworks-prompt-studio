(function(root,factory){
'use strict';
const api=factory(root);
if(typeof module==='object'&&module.exports)module.exports=api;
if(root)root.NSWFirstStartRepository=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(root){
'use strict';

const SCHEMA_VERSION=2;
const STORAGE_KEY='nsw-fse-state-v2';
const LEGACY_KEYS=Object.freeze({
 complete:'nsw-fse-complete-v1',
 version:'nsw-fse-version-v1',
 profile:'nsw-fse-profile-v1',
 tips:'nsw-fse-tips-v1',
 visits:'nsw-fse-visits-v1'
});
const validProfiles=new Set(['beginner','expert']);

function parseObject(raw){
 if(typeof raw!=='string'||!raw)return null;
 try{
  const value=JSON.parse(raw);
  return value&&typeof value==='object'&&!Array.isArray(value)?value:null;
 }catch{return null}
}

function cleanBooleanMap(value){
 const out={};
 if(!value||typeof value!=='object'||Array.isArray(value))return out;
 Object.entries(value).forEach(([key,item])=>{if(typeof key==='string'&&item===true)out[key]=true});
 return out;
}

function cleanCountMap(value){
 const out={};
 if(!value||typeof value!=='object'||Array.isArray(value))return out;
 Object.entries(value).forEach(([key,item])=>{
  const number=Number(item);
  if(typeof key==='string'&&Number.isFinite(number)&&number>=0)out[key]=Math.min(100000,Math.floor(number));
 });
 return out;
}

function safeProfile(value){return validProfiles.has(value)?value:'expert'}
function defaultStorage(root){
 try{return root?.localStorage||null}
 catch{return null}
}

function createRepository(options={}){
 const storage=options.storage===undefined?defaultStorage(root):options.storage;
 const storageKey=typeof options.storageKey==='string'&&options.storageKey?options.storageKey:STORAGE_KEY;
 const flowRevision=typeof options.flowRevision==='string'&&options.flowRevision?options.flowRevision:'first-start-v1';
 const legacyCompletedRevision=typeof options.legacyCompletedRevision==='string'&&options.legacyCompletedRevision
  ?options.legacyCompletedRevision
  :flowRevision;
 const releaseVersion=typeof options.releaseVersion==='string'?options.releaseVersion:'';
 const clock=typeof options.clock==='function'?options.clock:()=>new Date().toISOString();
 let memoryDocument=null;

 function getItem(key){
  try{return{ok:!!storage,value:storage?storage.getItem(key):null}}
  catch{return{ok:false,value:null}}
 }

 function setItem(key,value){
  try{if(!storage)return false;storage.setItem(key,value);return true}
  catch{return false}
 }

 function removeItem(key){
  try{if(!storage)return false;storage.removeItem(key);return true}
  catch{return false}
 }

 function now(){
  try{return String(clock())}
  catch{return''}
 }

 function normalizeDocument(value,source='v2'){
  const data=value&&typeof value==='object'?value:{};
  return{
   schemaVersion:SCHEMA_VERSION,
   flowRevision,
   releaseVersion:typeof data.releaseVersion==='string'?data.releaseVersion:releaseVersion,
   completedRevision:typeof data.completedRevision==='string'?data.completedRevision:null,
   profile:safeProfile(data.profile),
   tipsSeen:cleanBooleanMap(data.tipsSeen),
   visits:cleanCountMap(data.visits),
   migratedFrom:typeof data.migratedFrom==='string'?data.migratedFrom:(source==='legacy'?'legacy-v1':null),
   updatedAt:typeof data.updatedAt==='string'?data.updatedAt:''
  };
 }

 function snapshot(document,source){
  return{
   completedRevision:document.completedRevision,
   profile:document.profile,
   tipsSeen:{...document.tipsSeen},
   visits:{...document.visits},
   metadata:{
    schemaVersion:document.schemaVersion,
    flowRevision:document.flowRevision,
    releaseVersion:document.releaseVersion,
    migratedFrom:document.migratedFrom,
    updatedAt:document.updatedAt,
    source
   }
  };
 }

 function writeDocument(document){
  const normalized=normalizeDocument({...document,releaseVersion,updatedAt:now()});
  memoryDocument=normalized;
  return{ok:setItem(storageKey,JSON.stringify(normalized)),document:normalized};
 }

 function legacyValue(key){return getItem(LEGACY_KEYS[key]).value}

 function migrateLegacy(){
  const values={
   complete:legacyValue('complete'),
   version:legacyValue('version'),
   profile:legacyValue('profile'),
   tips:legacyValue('tips'),
   visits:legacyValue('visits')
  };
  const hasLegacy=Object.values(values).some(value=>value!==null);
  const document=normalizeDocument({
   completedRevision:values.complete==='1'?legacyCompletedRevision:null,
   profile:values.profile,
   tipsSeen:parseObject(values.tips)||{},
   visits:parseObject(values.visits)||{},
   migratedFrom:hasLegacy?'legacy-v1':null,
   updatedAt:now()
  },hasLegacy?'legacy':'default');
  if(hasLegacy)return{...writeDocument(document),source:'legacy'};
  memoryDocument=document;
  return{ok:true,document,source:'default'};
 }

 function load(){
  const current=getItem(storageKey);
  if(current.value!==null){
   const parsed=parseObject(current.value);
   if(parsed){
    const document=normalizeDocument(parsed);
    memoryDocument=document;
    return snapshot(document,'v2');
   }
  }
  if(!current.ok&&memoryDocument)return snapshot(memoryDocument,'memory');
  const migrated=migrateLegacy();
  return snapshot(migrated.document,migrated.source);
 }

 function save(value){
  const source=value&&typeof value==='object'?value:{};
  const written=writeDocument({
   completedRevision:source.completedRevision,
   profile:source.profile,
   tipsSeen:source.tipsSeen,
   visits:source.visits,
   migratedFrom:source.metadata?.migratedFrom||memoryDocument?.migratedFrom||null
  });
  return{ok:written.ok,snapshot:snapshot(written.document,written.ok?'v2':'memory')};
 }

 function reset(){
  memoryDocument=normalizeDocument({updatedAt:now()});
  const keys=[storageKey,...Object.values(LEGACY_KEYS)];
  const results=keys.map(removeItem);
  return{ok:results.every(Boolean),snapshot:snapshot(memoryDocument,'memory')};
 }

 function isRelevantKey(key){return key===null||key===storageKey||Object.values(LEGACY_KEYS).includes(key)}

 return Object.freeze({
  load,
  save,
  reset,
  isRelevantKey,
  storageKey,
  legacyKeys:LEGACY_KEYS,
  schemaVersion:SCHEMA_VERSION,
  flowRevision,
  legacyCompletedRevision,
  releaseVersion
 });
}

return Object.freeze({
 SCHEMA_VERSION,
 STORAGE_KEY,
 LEGACY_KEYS,
 createRepository
});
});

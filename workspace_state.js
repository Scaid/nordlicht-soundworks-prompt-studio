(function(root,factory){
'use strict';
const api=factory(root);
if(typeof module==='object'&&module.exports)module.exports=api;
if(root)root.NSWWorkspaceState=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(root){
'use strict';

const STORAGE_KEY='nsw-workspace-state-v2';
const SCHEMA_VERSION=2;
const MAX_FAVORITES=12;
const MAX_RECENT=8;
const VALID_VIEW=/^[A-Za-z][A-Za-z0-9_-]*View$/;
let memory=null;

function now(){return Date.now()}
function validView(value){return typeof value==='string'&&VALID_VIEW.test(value)}
function uniqueViews(values){
 const result=[];
 (Array.isArray(values)?values:[]).forEach(value=>{if(validView(value)&&!result.includes(value))result.push(value)});
 return result;
}
function normalizeRecent(values){
 const result=[];
 (Array.isArray(values)?values:[]).forEach(item=>{
  const view=typeof item==='string'?item:item?.view;
  const time=Number(typeof item==='string'?0:item?.time);
  if(!validView(view)||result.some(entry=>entry.view===view))return;
  result.push({view,time:Number.isFinite(time)&&time>0?time:now()});
 });
 return result.sort((a,b)=>b.time-a.time).slice(0,MAX_RECENT);
}
function normalizeGroups(value){
 const out={};
 if(value&&typeof value==='object'&&!Array.isArray(value))Object.entries(value).forEach(([key,open])=>{
  if(/^[a-z][a-z0-9-]*$/.test(key)&&typeof open==='boolean')out[key]=open;
 });
 return out;
}
function normalize(value){
 const source=value&&typeof value==='object'?value:{};
 return{
  schemaVersion:SCHEMA_VERSION,
  favorites:uniqueViews(source.favorites).slice(0,MAX_FAVORITES),
  recent:normalizeRecent(source.recent),
  lastView:validView(source.lastView)?source.lastView:'randomView',
  openGroups:normalizeGroups(source.openGroups),
  migratedFromLegacy:source.migratedFromLegacy===true
 };
}
function safeRead(key,fallback){
 try{const raw=root?.localStorage?.getItem(key);return raw==null?fallback:JSON.parse(raw)}catch(error){return fallback}
}
function safeWrite(value){
 memory=normalize(value);
 try{root?.localStorage?.setItem(STORAGE_KEY,JSON.stringify(memory))}catch(error){}
 return memory;
}
function migrate(){
 const current=safeRead(STORAGE_KEY,null);
 if(current)return safeWrite(current);
 const workspaceFavorites=safeRead('nsw-workspace-favorites-v1',[]);
 const productivityFavorites=safeRead('nsw-ux-favorites-v1',[]);
 const workspaceRecent=safeRead('nsw-workspace-recent-v1',[]);
 const productivityRecent=safeRead('nsw-ux-recent-v1',[]);
 const lastView=safeRead('nsw-workspace-last-view-v1','randomView');
 const openGroups={};
 ['create','style','song','lyrics','knowledge','analysis','project'].forEach(group=>{
  try{const value=root?.localStorage?.getItem('nsw-v71-group-'+group);if(value!==null)openGroups[group]=value==='1'}catch(error){}
 });
 const legacyOpen=safeRead('nsw-workspace-open-v1',null);
 if(typeof legacyOpen==='string'&&!Object.prototype.hasOwnProperty.call(openGroups,legacyOpen))openGroups[legacyOpen]=true;
 return safeWrite({
  favorites:uniqueViews([...workspaceFavorites,...productivityFavorites]),
  recent:normalizeRecent([...workspaceRecent,...productivityRecent]),
  lastView,
  openGroups,
  migratedFromLegacy:true
 });
}
function snapshot(){return normalize(memory||migrate())}
function publish(reason){
 const detail={reason,state:snapshot()};
 try{root?.document?.dispatchEvent(new root.CustomEvent('nsw:workspace-state-change',{detail}))}catch(error){}
 return detail.state;
}
function update(reason,producer){
 const next=producer(snapshot());
 safeWrite(next);
 return publish(reason);
}
function toggleFavorite(view){
 if(!validView(view))return snapshot();
 return update('favorite',state=>({...state,favorites:state.favorites.includes(view)?state.favorites.filter(item=>item!==view):[...state.favorites,view].slice(-MAX_FAVORITES)}));
}
function addRecent(view,time=now()){
 if(!validView(view)||view==='homeView')return snapshot();
 return update('recent',state=>({...state,recent:[{view,time},...state.recent.filter(item=>item.view!==view)].slice(0,MAX_RECENT)}));
}
function clearRecent(){return update('clear-recent',state=>({...state,recent:[]}))}
function setLastView(view){return validView(view)?update('last-view',state=>({...state,lastView:view})):snapshot()}
function recordNavigation(view,includeRecent=true,time=now()){
 if(!validView(view))return snapshot();
 return update('navigation',state=>({
  ...state,
  lastView:view,
  recent:includeRecent&&view!=='homeView'
   ?[{view,time},...state.recent.filter(item=>item.view!==view)].slice(0,MAX_RECENT)
   :state.recent
 }));
}
function setGroupOpen(group,open){
 if(!/^[a-z][a-z0-9-]*$/.test(String(group||'')))return snapshot();
 return update('group',state=>({...state,openGroups:{...state.openGroups,[group]:!!open}}));
}
function resetForTests(){memory=null}

migrate();
return Object.freeze({
 VERSION:'7.5.10',STORAGE_KEY,SCHEMA_VERSION,MAX_FAVORITES,MAX_RECENT,
 normalize,migrate,snapshot,toggleFavorite,addRecent,clearRecent,setLastView,recordNavigation,setGroupOpen,
 isFavorite:view=>snapshot().favorites.includes(view),
 resetForTests
});
});

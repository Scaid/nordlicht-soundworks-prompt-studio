(function(root){
'use strict';
const Catalog=root.NSWWorkspaceI18nCatalog;
if(!Catalog)return;

const HOME_TITLES=Object.freeze({en:'Welcome back',de:'Willkommen zurück',fr:'Bon retour',es:'Bienvenido de nuevo',it:'Bentornato',pt:'Bem-vindo de volta','pt-BR':'Bem-vindo de volta',nl:'Welkom terug',pl:'Witamy ponownie',tr:'Tekrar hoş geldiniz',ru:'С возвращением',ja:'おかえりなさい',ko:'다시 오신 것을 환영합니다','zh-CN':'欢迎回来'});
const TAB_BINDINGS=Object.freeze([
 ['#simpleVariantTabs [data-variant="safe"]','safeClear'],['#simpleVariantTabs [data-variant="creative"]','creativeMix'],['#simpleVariantTabs [data-variant="extreme"]','extreme'],
 ['#piTabLibrary','library'],['#piTabMaps','songMaps'],['#piTabDna','promptDna'],['#piTabCombos','combinations'],
 ['[data-pm-tab="overview"]','overview'],['[data-pm-tab="creative"]','creativeData'],['[data-pm-tab="release"]','release'],['[data-pm-tab="versions"]','versions'],['[data-pm-tab="assets"]','assets'],
 ['[data-tab="presets"]','presets'],['[data-tab="favorites"]','favorites'],['[data-tab="history"]','history'],
 ['[data-live-tab="style"]','style'],['[data-live-tab="lyrics"]','lyrics'],['[data-live-tab="metatags"]','metatags'],['[data-live-tab="exclude"]','exclude']
]);
const TAB_FALLBACKS=Object.freeze({
 presets:{en:'My Presets',de:'Meine Presets',fr:'Mes préréglages',es:'Mis preajustes',it:'I miei preset',pt:'As minhas predefinições','pt-BR':'Meus presets',nl:'Mijn presets',pl:'Moje presety',tr:'Ön ayarlarım',ru:'Мои пресеты',ja:'マイプリセット',ko:'내 프리셋','zh-CN':'我的预设'},
 favorites:{en:'Favorites',de:'Favoriten',fr:'Favoris',es:'Favoritos',it:'Preferiti',pt:'Favoritos','pt-BR':'Favoritos',nl:'Favorieten',pl:'Ulubione',tr:'Favoriler',ru:'Избранное',ja:'お気に入り',ko:'즐겨찾기','zh-CN':'收藏'},
 style:{en:'STYLE',de:'STYLE',fr:'STYLE',es:'STYLE',it:'STYLE',pt:'STYLE','pt-BR':'STYLE',nl:'STYLE',pl:'STYLE',tr:'STYLE',ru:'STYLE',ja:'STYLE',ko:'STYLE','zh-CN':'STYLE'}
});

let activeLanguage='en';
let applying=false;

function languageFrom(value){
 return Catalog.languageOf(value||root.NSWInterfaceI18n?.getLanguage?.()||document.documentElement.lang||localStorage.getItem('nordlicht-ui-language')||'en');
}
function ui(key){return Catalog.uiText(activeLanguage,key)}
function home(key,variables={}){return Catalog.homeText(activeLanguage,key,variables)}
function tabText(key){return TAB_FALLBACKS[key]?.[activeLanguage]||ui(key)}
function setText(element,value){if(element&&value!=null&&element.textContent!==value)element.textContent=value}

function bindWorkspaces(){
 document.querySelectorAll('.workspace-nav-group[data-workspace]').forEach(group=>{
  const id=group.dataset.workspace;
  setText(group.querySelector(':scope > .workspace-group-toggle > span'),Catalog.workspaceText(activeLanguage,id,'label'));
  setText(group.querySelector(':scope > .workspace-group-toggle > small'),Catalog.workspaceText(activeLanguage,id,'description'));
 });
}
function bindViewShells(){
 document.querySelectorAll('[data-view]').forEach(link=>{
  const id=link.dataset.view;
  const small=link.querySelector('small');
  if(small&&Catalog.VIEW_WORKSPACE[id])setText(small,Catalog.viewDescription(activeLanguage,id));
 });
 document.querySelectorAll('.view[id]').forEach(view=>{
  if(!Catalog.VIEW_WORKSPACE[view.id])return;
  const description=view.querySelector(':scope > .view-head p,:scope > .module-header p,:scope > header p');
  if(description)setText(description,Catalog.viewDescription(activeLanguage,view.id));
 });
 const homeTitle=document.querySelector('#homeView .view-head h1');
 if(homeTitle){
  const icon=/^\s*([^\p{L}\p{N}]+)\s*/u.exec(homeTitle.textContent)?.[1]||'🏠';
  setText(homeTitle,`${icon.trim()} ${HOME_TITLES[activeLanguage]||HOME_TITLES.en}`);
 }
}
function bindHome(){
 const bindings=[
  ['.workspace-home-nav b','home'],['.workspace-home-nav small','homeDesc'],
  ['#homeView .workspace-kicker','quickStart'],['#homeView .workspace-home-hero h2','wantCreate'],['#homeView .workspace-home-hero>p','chooseEntry'],
  ['#homeView .workspace-home-card:nth-of-type(2) h2','pinned'],['#homeView .workspace-home-card:nth-of-type(2) .workspace-card-head p','shortcuts'],
  ['#homeView .workspace-home-card:nth-of-type(3) h2','recent'],['#homeView .workspace-home-card:nth-of-type(3) .workspace-card-head p','continue'],
  ['#clearWorkspaceRecent','clear'],['#homeView .workspace-principles h2','principles'],['#homeView .workspace-principles .workspace-card-head p','principlesDesc']
 ];
 bindings.forEach(([selector,key])=>document.querySelectorAll(selector).forEach(element=>setText(element,home(key))));
 const principles=document.querySelectorAll('#homeView .workspace-principle-list span');
 ['saveTime','improveResults','creativity'].forEach((key,index)=>{
  const element=principles[index];if(!element)return;
  const icon=/^\s*([^\p{L}\p{N}]+)\s*/u.exec(element.textContent)?.[1]||'';
  setText(element,icon?`${icon.trim()} ${home(key)}`:home(key));
 });
 document.querySelectorAll('.workspace-pin').forEach(pin=>pin.title=home(pin.classList.contains('pinned')?'unpin':'pin'));
 const active=document.querySelector('.view.active[id]');
 const group=document.getElementById('workspaceBreadcrumbGroup');
 if(active&&active.id!=='homeView'&&group){
  const id=active.closest?.('.workspace-nav-group')?.dataset.workspace||document.querySelector(`.nav[data-view="${active.id}"]`)?.closest('.workspace-nav-group')?.dataset.workspace||Catalog.VIEW_WORKSPACE[active.id];
  const label=Catalog.workspaceText(activeLanguage,id,'label').replace(/^\s*[^\p{L}\p{N}]+\s*/u,'');
  if(label)setText(group,label);
 }
 setText(document.getElementById('workspaceBreadcrumbHome'),home('home'));
}
function bindTabs(){
 TAB_BINDINGS.forEach(([selector,key])=>document.querySelectorAll(selector).forEach(element=>{
  const icon=/^\s*([^\p{L}\p{N}]+)\s*/u.exec(element.textContent)?.[1]||'';
  const label=tabText(key);
  setText(element,icon?`${icon.trim()} ${label}`:label);
 }));
}
function apply(language){
 if(applying)return activeLanguage;
 applying=true;
 activeLanguage=languageFrom(language);
 bindWorkspaces();bindViewShells();bindHome();bindTabs();
 document.documentElement.dataset.workspaceLanguage=activeLanguage;
 applying=false;
 document.dispatchEvent(new CustomEvent('nsw:workspace-language-applied',{detail:{language:activeLanguage}}));
 return activeLanguage;
}
function init(){
 activeLanguage=languageFrom();
 apply(activeLanguage);
 document.addEventListener('nordlicht-language-changed',event=>apply(event.detail?.language));
 document.addEventListener('nsw:workspace-navigation-built',()=>apply(activeLanguage));
 document.addEventListener('nsw:workspace-home-rendered',()=>apply(activeLanguage));
 root.NSWWorkspaceI18n=Object.freeze({VERSION:Catalog.VERSION,languages:Catalog.LANGUAGES,getLanguage:()=>activeLanguage,apply,refresh:()=>apply(activeLanguage),ui,home,workspace:(id,field='description')=>Catalog.workspaceText(activeLanguage,id,field),viewDescription:id=>Catalog.viewDescription(activeLanguage,id)});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})(typeof globalThis!=='undefined'?globalThis:this);

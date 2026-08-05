(function(root){
'use strict';
const Manifest=root.NSWReleaseManifest,I18n=root.NSWUXFoundationI18n;
if(!Manifest||!I18n)return;
const SEEN_KEY='nsw-release-center-seen-v1';
const $=id=>root.document.getElementById(id);

function language(){
 return I18n.languageOf(root.NSWInterfaceI18n?.getLanguage?.()||root.NSWWorkspaceI18n?.getLanguage?.()||root.document.documentElement.lang||'en');
}
function t(key){return I18n.text(language(),key)}
function element(tag,className,text){
 const node=root.document.createElement(tag);
 if(className)node.className=className;
 if(text!=null)node.textContent=text;
 return node;
}
function releaseTitle(release){return release.titleKey?t(release.titleKey):release.title}
function releaseCard(release,index){
 const current=index===0;
 const wrapper=element(current?'article':'details',`release-center-entry${current?' current':''}`);
 const heading=element(current?'div':'summary','release-center-summary');
 const version=element('span','release-center-version',`${t('versionLabel')} ${release.version}`);
 const title=element('b','release-center-name',releaseTitle(release));
 heading.append(version,title);
 if(current)heading.append(element('em','release-center-new',t('newBadge')));
 wrapper.append(heading);
 if(release.itemKeys.length){
  const list=element('ul','release-center-items');
  release.itemKeys.forEach(key=>list.append(element('li','',t(key))));
  wrapper.append(list);
 }
 return wrapper;
}
function renderReleases(){
 const host=$('releaseCenterContent');
 if(!host)return;
 host.replaceChildren();
 const currentLabel=element('p','release-center-section-label',t('currentVersion'));
 host.append(currentLabel,releaseCard(Manifest.releases[0],0));
 const previous=element('section','release-center-history');
 previous.append(element('h3','',t('previousReleases')));
 Manifest.releases.slice(1).forEach((release,index)=>previous.append(releaseCard(release,index+1)));
 host.append(previous);
}
function updateReleaseLabels(){
 const version=Manifest.VERSION;
 const badge=root.document.querySelector('.version-badge');
 if(badge){badge.textContent=Manifest.badge;badge.title=`${t('currentVersion')}: ${version}`}
 const sidebar=root.document.querySelector('.sidebar-version > span');
 if(sidebar)sidebar.textContent=`${t('versionLabel')} ${version} · ${Manifest.releaseName}`;
 const home=root.document.querySelector('.workspace-home-badge');
 if(home)home.textContent=`Nordlicht Soundworks · ${Manifest.badge}`;
 const title=$('changelogTitle');if(title)title.textContent=t('releaseCenterTitle');
 root.document.documentElement.dataset.releaseVersion=version;
}
function updateUnread(){
 const button=$('openChangelog');if(!button)return;
 let seen='';try{seen=root.localStorage.getItem(SEEN_KEY)||''}catch(error){}
 button.classList.toggle('has-release-update',seen!==Manifest.VERSION);
}
function markSeen(){
 try{root.localStorage.setItem(SEEN_KEY,Manifest.VERSION)}catch(error){}
 updateUnread();
}
function refresh(){updateReleaseLabels();renderReleases();updateUnread()}
function init(){
 refresh();
 $('openChangelog')?.addEventListener('click',()=>{
  markSeen();
  root.requestAnimationFrame?.(()=>$('closeChangelog')?.focus());
 });
 root.document.addEventListener('nordlicht-language-changed',refresh);
}
if(root.document.readyState==='loading')root.document.addEventListener('DOMContentLoaded',init,{once:true});else init();
root.NSWReleaseCenter=Object.freeze({VERSION:Manifest.VERSION,refresh,markSeen});
})(typeof globalThis!=='undefined'?globalThis:this);

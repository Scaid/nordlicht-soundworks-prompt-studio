(function(root){
'use strict';
const PREVIEW_ACTIONS=Object.freeze({
 assistantApply:['style','vocals','instruments','story','production','metatags'],
 assistantApplyAll:['style','vocals','instruments','story','production','metatags'],
 siApplySafe:['style','lyrics','metatags','production'],
 sdDeployAll:['style','lyrics','vocals','theory','production'],
 mdApplyAll:['style','lyrics','vocals','production'],
 composerApply:['style','vocals','instruments','production'],
 pmRestoreCurrent:['style','lyrics','project']
});
const DIRECT_ACTIONS=Object.freeze({
 guidedApply:['style'],simpleSentenceApply:['style'],chatApply:['style'],libApply:['style'],dnaApplyBuilder:['style'],spApplySafer:['style'],optimizerApplyCustom:['style'],
 shApply:['style'],ssApply:['style'],veApply:['style'],crApply:['style'],aipApplyStyle:['style'],sdApplyStyle:['style'],wmApply:['style'],igrApply:['style','instruments'],
 bpApplyLyrics:['lyrics','metatags'],sdApplyLyrics:['lyrics'],vdApplyLyrics:['lyrics','vocals'],vdApplyStyle:['style','vocals'],vd2Apply:['lyrics','vocals'],p4ApplyStructure:['lyrics','metatags'],p4ApplyPlan:['lyrics','metatags']
});
const ACTIONS=Object.freeze({...PREVIEW_ACTIONS,...DIRECT_ACTIONS});
const AREA_SELECTORS=Object.freeze({
 style:['.nav[data-view="styleView"] b','STYLE'],lyrics:['.nav[data-view="lyricsView"] b','Lyrics'],project:['.nav[data-view="projectManagerView"] b','Projects'],
 vocals:['[data-sbw-tab="vocals"] b','.nav[data-view="vocalDirectorView"] b','Vocals'],instruments:['.nav[data-view="instrumentsView"] b','Instruments'],
 story:['[data-sbw-tab="story"] b','Story & Emotion'],production:['.nav[data-view="productionView"] b','Production'],metatags:['.nav[data-view="metatagsView"] b','MetaTags'],
 analysis:['.workspace-nav-group[data-workspace="analysis"] .workspace-group-toggle span','Analysis'],theory:['.nav[data-view="theoryView"] b','Music Theory']
});
let pending=null,lastTransaction=null,bypass=null,previousFocus=null,toastTimer=0;
const $=id=>root.document.getElementById(id);
function language(){return root.NSWUXFoundationI18n?.languageOf?.(root.NSWWorkspaceI18n?.getLanguage?.()||root.document.documentElement.lang||'en')||'en'}
function t(key){return root.NSWUXFoundationI18n?.text?.(language(),key)||key}
function clone(value){try{return JSON.parse(JSON.stringify(value))}catch(error){return value}}
function capture(){
 const builder=typeof root.collectFormState==='function'?clone(root.collectFormState()):null;
 return{builder,lyrics:$('lyricsEditor')?.value||''};
}
function same(left,right){try{return JSON.stringify(left)===JSON.stringify(right)}catch(error){return false}}
function changedAreas(before,after,expected){
 const changed=[];
 if(!same(before?.builder,after?.builder))changed.push(...expected.filter(area=>area!=='lyrics'));
 if(before?.lyrics!==after?.lyrics&&expected.includes('lyrics'))changed.push('lyrics');
 return[...new Set(changed)];
}
function areaName(area){
 const selectors=AREA_SELECTORS[area]||[area];
 for(const selector of selectors.slice(0,-1)){const node=root.document.querySelector(selector);if(node?.textContent.trim())return node.textContent.trim()}
 return selectors.at(-1)||area;
}
function ensureUi(){
 if($('actionPreviewModal'))return;
 const modal=root.document.createElement('div');modal.id='actionPreviewModal';modal.className='action-preview-modal hidden';modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-labelledby','actionPreviewTitle');
 modal.innerHTML='<div class="action-preview-backdrop" data-action-cancel></div><section class="action-preview-card"><button class="action-preview-close" type="button" data-action-cancel aria-label="Close">×</button><p class="action-preview-kicker" id="actionPreviewAffected"></p><h2 id="actionPreviewTitle"></h2><p id="actionPreviewIntro"></p><div class="action-preview-areas" id="actionPreviewAreas"></div><div class="action-preview-buttons"><button type="button" id="actionPreviewCancel"></button><button type="button" class="primary" id="actionPreviewConfirm"></button></div></section>';
 const toast=root.document.createElement('div');toast.id='actionUndoToast';toast.className='action-undo-toast';toast.setAttribute('role','status');toast.setAttribute('aria-live','polite');toast.innerHTML='<span><b id="actionUndoTitle"></b><small id="actionUndoSummary"></small></span><button type="button" id="actionUndoButton"></button><button type="button" id="actionKeepButton"></button>';
 root.document.body.append(modal,toast);
 modal.addEventListener('click',event=>{if(event.target.closest('[data-action-cancel]')||event.target.id==='actionPreviewCancel')closePreview()});
 $('actionPreviewConfirm').addEventListener('click',confirmPreview);
 $('actionUndoButton').addEventListener('click',undo);
 $('actionKeepButton').addEventListener('click',hideToast);
 root.document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!modal.classList.contains('hidden'))closePreview()});
 localize();
}
function localize(){
 if(!$('actionPreviewModal'))return;
 $('actionPreviewTitle').textContent=t('previewTitle');$('actionPreviewIntro').textContent=t('previewIntro');$('actionPreviewAffected').textContent=t('affected');
 $('actionPreviewCancel').textContent=t('cancel');$('actionPreviewConfirm').textContent=t('continueAction');$('actionUndoButton').textContent=t('undo');$('actionKeepButton').textContent=t('keep');
 root.document.querySelector('.action-preview-close')?.setAttribute('aria-label',t('close'));
 if(pending)renderAreas(pending.areas);
}
function renderAreas(areas){
 const host=$('actionPreviewAreas');if(!host)return;host.replaceChildren();
 areas.forEach(area=>{const item=root.document.createElement('span');item.textContent=`✓ ${areaName(area)}`;host.append(item)});
}
function openPreview(button,areas){
 ensureUi();pending={button,areas,before:null};previousFocus=root.document.activeElement;renderAreas(areas);$('actionPreviewModal').classList.remove('hidden');root.document.body.classList.add('action-preview-open');$('actionPreviewCancel').focus();
}
function closePreview(){
 pending=null;$('actionPreviewModal')?.classList.add('hidden');root.document.body.classList.remove('action-preview-open');previousFocus?.focus?.();previousFocus=null;
}
function execute(button,areas,before){
 bypass=button.id;button.click();bypass=null;
 root.setTimeout(()=>finishTransaction(button.id,areas,before),220);
}
function confirmPreview(){
 if(!pending)return;const {button,areas}=pending,before=capture();closePreview();execute(button,areas,before);
}
function finishTransaction(actionId,expected,before){
 const after=capture(),changed=changedAreas(before,after,expected);if(!changed.length)return;
 lastTransaction={actionId,before,after,changed,time:Date.now()};showToast(changed);
}
function restore(snapshot){
 if(snapshot?.builder&&typeof root.applyFormState==='function')root.applyFormState(clone(snapshot.builder));
 const lyrics=$('lyricsEditor');if(lyrics&&lyrics.value!==snapshot?.lyrics){lyrics.value=snapshot?.lyrics||'';lyrics.dispatchEvent(new Event('input',{bubbles:true}));lyrics.dispatchEvent(new Event('change',{bubbles:true}))}
 if(typeof root.generateOutput==='function')root.generateOutput();
}
function undo(){
 if(!lastTransaction)return;restore(lastTransaction.before);lastTransaction=null;showToastMessage(t('undone'),[]);
}
function showToast(areas){showToastMessage(t('applied'),areas)}
function showToastMessage(title,areas){
 ensureUi();$('actionUndoTitle').textContent=title;$('actionUndoSummary').textContent=areas.length?`${t('changed')}: ${areas.map(areaName).join(', ')}`:t('noCoreChanges');
 $('actionUndoButton').hidden=!lastTransaction;$('actionKeepButton').hidden=!lastTransaction;
 const toast=$('actionUndoToast');toast.classList.add('show');root.clearTimeout(toastTimer);toastTimer=root.setTimeout(hideToast,10000);
}
function hideToast(){root.clearTimeout(toastTimer);$('actionUndoToast')?.classList.remove('show');lastTransaction=null}
function intercept(event){
 const button=event.target.closest('button[id]');if(!button||!ACTIONS[button.id]||button.disabled)return;
 if(bypass===button.id)return;
 const areas=ACTIONS[button.id];
 if(PREVIEW_ACTIONS[button.id]){event.preventDefault();event.stopImmediatePropagation();openPreview(button,areas);return}
 const before=capture();root.setTimeout(()=>finishTransaction(button.id,areas,before),220);
}
function init(){ensureUi();root.document.addEventListener('click',intercept,true);root.document.addEventListener('nordlicht-language-changed',localize);root.NSWActionTransactions=Object.freeze({VERSION:'7.5.10',ACTIONS,PREVIEW_ACTIONS,capture,undo,hasUndo:()=>!!lastTransaction});}
if(root.document.readyState==='loading')root.document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})(typeof globalThis!=='undefined'?globalThis:this);

async function copyField(fieldId){
 const field=document.getElementById(fieldId);
 const text=field?.value||"";
 if(!text.trim()){showToast("Nichts zum Kopieren");return false}
 try{
   if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(text);showToast("Kopiert");return true}
 }catch{}
 field.focus();field.select();field.setSelectionRange?.(0,text.length);
 try{if(document.execCommand("copy")){showToast("Kopiert");return true}}catch{}
 const helper=document.createElement("textarea");helper.value=text;helper.style.position="fixed";helper.style.opacity="0";document.body.appendChild(helper);helper.select();
 let ok=false;try{ok=document.execCommand("copy")}catch{}helper.remove();
 showToast(ok?"Kopiert":"Mit Strg+C kopieren");return ok
}
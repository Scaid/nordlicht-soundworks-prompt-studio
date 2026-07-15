const STORAGE_KEY="nordlicht-prompt-studio-clean";
function storageLoad(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}")}catch{return{}}}
function storageSave(data){localStorage.setItem(STORAGE_KEY,JSON.stringify(data))}
function exportBackup(data){const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="Nordlicht_Prompt_Studio_Backup.json";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
function importBackup(file,onSuccess,onError){const reader=new FileReader();reader.onload=()=>{try{onSuccess(JSON.parse(reader.result))}catch(e){onError(e)}};reader.onerror=onError;reader.readAsText(file)}
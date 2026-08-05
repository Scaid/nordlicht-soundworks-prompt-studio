(function(root,factory){
'use strict';
const api=factory();
if(typeof module==='object'&&module.exports)module.exports=api;
if(root)root.NSWMetaTagStackEngine=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';

const VERSION='7.5.9';
const MAX_RECOMMENDED_ELEMENTS=7;
const CATEGORY_ORDER=Object.freeze(['section','mood','vocal','instrument','dynamic','spatial','production','extra']);
const CATEGORY_RANK=Object.freeze(CATEGORY_ORDER.reduce((out,key,index)=>({...out,[key]:index}),{}));

const SECTION_WORDS=Object.freeze([
 'ambient intro','instrumental intro','atmospheric intro','piano intro','vintage intro','ritual intro','omen intro','cold open','opening','intro',
 'pre-chorus','pre chorus','post-chorus','post chorus','final chorus','ensemble chorus','clean chorus','chorus','refrain','final hook','hook',
 'bridge','middle eight','quiet passage','escalation','new section','theme','conflict','resolution','pre-hook','pre hook',
 'rap verse','instrumental verse','verse','strophe','dialogue break','rap break','drum break','bass break','dance break','brass break','battle break','instrumental break','break',
 'pre-drop','pre drop','second drop','final drop','instrumental drop','drop','build-up','build up','march build','war build','build',
 'heavy breakdown','half-time breakdown','half time breakdown','breakdown','guitar solo','instrumental solo','solo','interlude','climax','finale',
 'instrumental chorus','instrumental build','instrumental finale','instrumental','movement','war chant','chant','phase','coda','saga outro','fade out','outro','end'
]);

const PREFIX_CATEGORY=Object.freeze({
 style:'mood',mood:'mood',emotion:'mood',
 vocal:'vocal',vocals:'vocal',voice:'vocal',choir:'vocal','chorus vocal':'vocal',
 music:'instrument',instrument:'instrument',instruments:'instrument',instrumental:'instrument',
 dynamic:'dynamic',dynamics:'dynamic',energy:'dynamic',rhythm:'dynamic',tempo:'dynamic',
 space:'spatial',spatial:'spatial',ambience:'spatial',
 production:'production',mix:'production',mastering:'production',
 transition:'extra','ad-libs':'extra','ad libs':'extra',adlibs:'extra'
});

const CLASSIFIERS=Object.freeze([
 ['vocal',/(?:\bvocal(?:s)?\b|\bvoice\b|\bsinger\b|\bchoir\b|\bgospel\b|\bharmon(?:y|ies|ized)\b|\bduet\b|\bnarrat(?:or|ed)\b|\bspoken\b|\bwhisper(?:ed)?\b|\bgrowl(?:ed)?\b|\bscream(?:ed)?\b|\brap\b|\bfalsetto\b|\bsoprano\b|\balto\b|\btenor\b|\bbaritone\b|\bgang shouts?\b|\bno vocals?\b)/i],
 ['instrument',/(?:\bpiano\b|\brhodes\b|\bguitar\b|\bbass\b|\bdrums?\b|\bpercussion\b|\bstrings?\b|\bviolin\b|\bcello\b|\bviola\b|\bbrass\b|\btrumpet\b|\btrombone\b|\bhorns?\b|\bsax(?:ophone)?\b|\bclarinet\b|\bflute\b|\bsynth(?:esizer)?\b|\borchestra\b|\btagelharpa\b|\bnyckelharpa\b|\bjouhikko\b|\bduduk\b|\boud\b|\bney\b|\bshamisen\b|\bkoto\b|\btaiko\b|\bharp\b|\borgan\b|\baccordion\b|\bbanjo\b|\bmandolin\b|\bbodhr[aá]n\b|\btin whistle\b|\bkantele\b|\bdulcimer\b|\bhackbrett\b|\bvuvuzela\b|\bdjembe\b|\bkora\b|\bcharango\b|\bquena\b|\bbalalaika\b|\bfull band\b|\binstrument(?:s|ation|al solo)?\b)/i],
 ['dynamic',/(?:\benergy\b|\bdynamic(?:s)?\b|\btempo\b|\b\d{2,3}\s*bpm\b|\brhythm(?:ic)?\b|\bgroove\b|\bsyncopat(?:ed|ion)\b|\bhalf[- ]time\b|\bdouble[- ]time\b|\bbuild(?:ing)?\b|\bcrescendo\b|\bdiminuendo\b|\brising\b|\bpeak intensity\b|\bexplosive\b|\brestrained\b|\bpowerful\b|\bquiet passage\b|\bsudden silence\b|\btension and release\b|\bfade (?:in|out)\b)/i],
 ['spatial',/(?:\breverb\b|\bdelay\b|\becho\b|\broom\b|\bhall\b|\bcathedral\b|\bspace\b|\bspatial\b|\bstereo\b|\bmono\b|\bwide\b|\bnarrow\b|\bpann(?:ed|ing)\b|\bclose[- ]mic\b|\bdistant\b|\bdepth\b)/i],
 ['production',/(?:\bproduction\b|\bmix\b|\bmaster(?:ing|ed)?\b|\bsaturation\b|\bcompression\b|\bsidechain\b|\banalog\b|\btape\b|\bvinyl\b|\blo-?fi\b|\bhigh fidelity\b|\bpolished\b|\bdistort(?:ed|ion)\b|\btransient(?:s)?\b|\bwall of sound\b|\barrangement\b|\btexture\b|\blayered\b|\bsparse\b|\bminimal(?:ist)?\b|\bdense\b|maximal(?:ist)?)/i],
 ['mood',/(?:\bsoulful\b|\bdark\b|\bsad\b|\bemotional\b|\bhappy\b|\bhopeful\b|\bheroic\b|\baggressive\b|\bdreamy\b|\bromantic\b|\bmelancholic\b|\bplayful\b|\bmysterious\b|\btriumphant\b|\bintimate\b|\bepic\b|\bnostalgic\b|\bwarm\b|\bcold\b|\bsacred\b|\bmythic\b|\bcalm\b|\bgentle\b|\brelaxed\b|\btense\b|\bominous\b|\bmajestic\b|\britualistic\b|\bprimal\b|\bfuturistic\b|\bserene\b|\bfierce\b|\bdesperate\b|\bconfident\b|\blonely\b|\batmospheric\b)/i]
]);

const CONFLICT_RULES=Object.freeze([
 {id:'instrumental-vocal',severity:'error',a:/(?:\binstrumental only\b|\bpure instrumental\b|\bno vocals?\b)/i,b:/(?:\blead vocal\b|\bfemale vocal\b|\bmale vocal\b|\bchoir\b|\bduet\b|\bspoken\b|\bnarrator\b|\bgrowl\b|\bscream\b|\brap vocal\b)/i,en:'Instrumental and vocal directions compete in the same section.',de:'Instrumental- und Vocal-Anweisungen widersprechen sich im selben Abschnitt.'},
 {id:'density',severity:'error',a:/(?:\bminimal(?:ist)?\b|\bsparse(?: arrangement| instrumentation)?\b)/i,b:/(?:\bwall of sound\b|\bmaximum layers\b|\bmaximal(?:ist)?\b|\bdense arrangement\b|\ball instruments\b)/i,en:'Minimal and maximal density cannot define the same moment.',de:'Minimale und maximale Klangdichte können nicht denselben Moment bestimmen.'},
 {id:'space',severity:'error',a:/(?:\bdry mix\b|\bdry (?:forward )?(?:lead )?vocal\b|\bno reverb\b|\bminimal reverb\b|\bclose[- ]mic\b)/i,b:/(?:\bheavy (?:vocal )?reverb\b|\bdeep reverb\b|\bhuge reverb\b|\blarge hall(?: vocal| reverb)?\b|\bcathedral(?: vocal| reverb| space)?\b|\blong atmospheric reverb\b|\bairy vocal reverb\b|\breverb[- ]soaked vocal\b)/i,en:'Dry, close vocals and strongly reverberant space directions conflict.',de:'Trockene, nahe Vocals und stark verhallte Raumanweisungen widersprechen sich.'},
 {id:'stereo',severity:'error',a:/(?:\bmono mix\b|\bvintage mono\b|\bnarrow mono\b)/i,b:/(?:\bwide stereo\b|\bultra wide\b|\bexpansive width\b)/i,en:'Mono and wide-stereo directions conflict in one section.',de:'Mono- und breite Stereo-Anweisungen widersprechen sich in einem Abschnitt.'},
 {id:'tonality',severity:'warn',a:/(?:\bmajor key\b|\bmajor scale\b)/i,b:/(?:\bminor key\b|\bnatural minor\b|\bharmonic minor\b)/i,en:'Major and minor tonalities are both presented as primary.',de:'Dur und Moll werden gleichzeitig als primäre Tonalität angegeben.'},
 {id:'tempo',severity:'warn',a:/(?:\bslow tempo\b|\bvery slow\b)/i,b:/(?:\bvery fast\b|\bextreme tempo\b)/i,en:'Slow and very-fast tempo directions compete.',de:'Langsame und sehr schnelle Tempo-Anweisungen konkurrieren miteinander.'},
 {id:'fidelity',severity:'warn',a:/(?:\blo-?fi\b|\blo-?fi dust\b)/i,b:/(?:\bhigh fidelity\b|\bultra[- ]clean\b|\bclean digital\b|\bpristine production\b)/i,en:'Lo-Fi and pristine production need a clear hierarchy.',de:'Lo-Fi und makellose Produktion benötigen eine klare Hierarchie.'},
 {id:'energy',severity:'warn',a:/(?:\bcalm\b|\bgentle\b|\brelaxed\b|\bmeditative\b)/i,b:/(?:\bconstant high energy\b|\bexplosive throughout\b|\baggressive throughout\b|\brelentless\b)/i,en:'Calm and permanently explosive energy compete in one section.',de:'Ruhige und dauerhaft explosive Energie konkurrieren in einem Abschnitt.'},
 {id:'acoustic-distortion',severity:'warn',a:/(?:\bacoustic folk\b|\bpure acoustic\b|\bacoustic arrangement\b)/i,b:/(?:\bheavy distortion\b|\bdistorted guitars?\b|\bextreme distortion\b)/i,en:'The acoustic direction and heavy distortion need an explicit hierarchy.',de:'Akustische Ausrichtung und starke Verzerrung benötigen eine eindeutige Hierarchie.'},
 {id:'whisper-density',severity:'warn',a:/(?:\bwhisper(?:ed)?\b)/i,b:/(?:\bwall of sound\b|\bconstant heavy drums\b|\bmaximum layers\b)/i,en:'Whispers can be masked by a maximal arrangement.',de:'Flüstern kann von einem maximalen Arrangement verdeckt werden.'}
]);

function cleanText(value){return String(value==null?'':value).replace(/[\r\n]+/g,' ').replace(/\s+/g,' ').trim()}
function unwrapTag(value){const clean=cleanText(value);return clean.startsWith('[')&&clean.endsWith(']')?clean.slice(1,-1).trim():clean.replace(/^\[|\]$/g,'').trim()}
function normalizedKey(value){return cleanText(value).toLocaleLowerCase()}
function isBracketLine(line){return /^\s*\[[^\]\n]+\]\s*$/.test(String(line||''))}

function isSectionName(value){
 const clean=cleanText(value).toLowerCase().replace(/\s+/g,' ');
 if(!clean||clean.includes('|')||clean.includes(':'))return false;
 if(/^movement\s+(?:[ivx]+|\d+)$/i.test(clean))return true;
 if(/^(?:verse|strophe|drop|build|phase)\s+\d+$/i.test(clean))return true;
 if(/^(?:theme|part|act)\s+(?:[a-z]|[ivx]+|\d+)$/i.test(clean))return true;
 return SECTION_WORDS.some(word=>clean===word||clean.endsWith(` ${word}`));
}

function titleWord(word){
 if(/^\d+$/.test(word)||/^[ivx]+$/i.test(word))return word.toUpperCase();
 return word.charAt(0).toUpperCase()+word.slice(1).toLowerCase();
}

function canonicalSection(value){
 let clean=cleanText(value).replace(/^\[|\]$/g,'').trim();
 clean=clean.replace(/\s+/g,' ');
 const exact={
  'pre chorus':'Pre-Chorus','pre-chorus':'Pre-Chorus','post chorus':'Post-Chorus','post-chorus':'Post-Chorus',
  'build up':'Build-Up','build-up':'Build-Up','pre drop':'Pre-Drop','pre-drop':'Pre-Drop',
  'half time breakdown':'Half-Time Breakdown','half-time breakdown':'Half-Time Breakdown','fade out':'Fade Out'
 };
 const lower=clean.toLowerCase();
 if(exact[lower])return exact[lower];
 return clean.split(' ').map(part=>part.includes('-')?part.split('-').map(titleWord).join('-'):titleWord(part)).join(' ')
   .replace(/Pre-Chorus/i,'Pre-Chorus').replace(/Post-Chorus/i,'Post-Chorus').replace(/Build-Up/i,'Build-Up').replace(/Pre-Drop/i,'Pre-Drop').replace(/Half-Time/i,'Half-Time');
}

function splitPipe(value){return unwrapTag(value).split('|').map(cleanText).filter(Boolean)}

function sectionParts(value){
 const clean=cleanText(value);
 if(isSectionName(clean))return{section:canonicalSection(clean),tail:''};
 const colon=clean.indexOf(':');
 if(colon>0){
  const head=clean.slice(0,colon).trim();
  const tail=clean.slice(colon+1).trim();
  const lower=head.toLowerCase();
  const directiveLike=lower==='instrumental'||(lower==='chorus'&&classifyElement(tail)==='vocal');
  if(isSectionName(head)&&!directiveLike)return{section:canonicalSection(head),tail};
 }
 return null;
}

function prefixInfo(value){
 const clean=cleanText(value);
 const match=clean.match(/^([^:]{1,32}):\s*(.+)$/);
 if(!match)return{value:clean,hint:null,prefix:null};
 const prefix=match[1].trim();
 const key=prefix.toLowerCase();
 const hint=PREFIX_CATEGORY[key]||(/\bvocal\b/i.test(prefix)?'vocal':null);
 if(!hint)return{value:clean,hint:null,prefix:null};
 const body=cleanText(match[2]).replace(/[.;]+$/g,'');
 if(/^(style|mood|emotion|music|instrument|instruments|dynamic|dynamics|production|mix|mastering|space|spatial)$/i.test(prefix))return{value:body,hint,prefix};
 if(/^energy$/i.test(prefix))return{value:`Energy ${body}`,hint,prefix};
 return{value:`${prefix}: ${body}`,hint,prefix};
}

function classifyElement(value,hint=null){
 if(hint&&CATEGORY_RANK[hint]!=null)return hint;
 const clean=cleanText(value);
 for(const [category,pattern] of CLASSIFIERS)if(pattern.test(clean))return category;
 return'extra';
}

function normalizeDirective(value){
 const raw=unwrapTag(value);
 if(!raw)return null;
 const prefixed=prefixInfo(raw);
 const clean=cleanText(prefixed.value).replace(/[.;]+$/g,'');
 if(!clean)return null;
 return Object.freeze({value:clean,category:classifyElement(clean,prefixed.hint),source:raw,prefix:prefixed.prefix});
}

function normalizeDirectives(values,options={}){
 const output=[];
 const seen=new Set();
 (Array.isArray(values)?values:[values]).forEach(item=>{
  const parts=item&&typeof item==='object'&&typeof item.value==='string'?[item.value]:splitPipe(item);
  parts.forEach(part=>{
   const normalized=normalizeDirective(part);
   const directive=normalized&&item&&typeof item==='object'&&CATEGORY_RANK[item.category]!=null
    ?Object.freeze({...normalized,category:item.category})
    :normalized;
   if(!directive)return;
   const key=normalizedKey(directive.value);
   if(options.dedupe!==false&&seen.has(key))return;
   seen.add(key);
   output.push(directive);
  });
 });
 return output;
}

function sortDirectives(values){
 return normalizeDirectives(values).map((directive,index)=>({directive,index})).sort((a,b)=>{
  const rank=(CATEGORY_RANK[a.directive.category]??CATEGORY_RANK.extra)-(CATEGORY_RANK[b.directive.category]??CATEGORY_RANK.extra);
  return rank||a.index-b.index;
 }).map(item=>item.directive);
}

function parseStack(line){
 if(!isBracketLine(line))return null;
 const pieces=splitPipe(line);
 if(!pieces.length)return null;
 const head=sectionParts(pieces[0])||(pieces.length>1&&!pieces[0].includes(':')?{section:canonicalSection(pieces[0]),tail:''}:null);
 if(!head)return null;
 const directiveValues=[];
 if(head.tail)directiveValues.push(head.tail);
 directiveValues.push(...pieces.slice(1));
 return Object.freeze({
  section:head.section,
  directives:Object.freeze(normalizeDirectives(directiveValues,{dedupe:false})),
  source:cleanText(line),
  sourceFormat:pieces.length>1?'pipe':head.tail?'legacy-colon':'section'
 });
}

function renderStack(stack,options={}){
 const section=canonicalSection(stack?.section||'Section');
 const directives=options.sort?sortDirectives(stack?.directives||[]):normalizeDirectives(stack?.directives||[],{dedupe:false});
 return`[${[section,...directives.map(item=>item.value)].join(' | ')}]`;
}

function createStack(section,directives=[],options={}){
 const stack={section:canonicalSection(unwrapTag(section)),directives:normalizeDirectives(directives)};
 return Object.freeze({...stack,line:renderStack(stack,{sort:options.sort!==false})});
}

function coerceStackDocument(input,options={}){
 const values=(Array.isArray(input)?input:String(input||'').split('\n')).map(value=>String(value||'').trim()).filter(Boolean);
 const groups=[];let current=null;
 values.forEach(value=>{
  const stack=parseStack(value);
  if(stack){current={section:stack.section,directives:[...stack.directives]};groups.push(current);return}
  if(!current){current={section:options.defaultSection||'Verse 1',directives:[]};groups.push(current)}
  current.directives.push(value);
 });
 return groups.map(group=>renderStack(group,{sort:options.sort!==false})).join('\n');
}

function parseLyrics(text){
 const source=String(text||'');
 const lines=source.split('\n');
 const offsets=[];
 let offset=0;
 lines.forEach(line=>{offsets.push(offset);offset+=line.length+1});
 const sections=[];
 lines.forEach((line,index)=>{
  const stack=parseStack(line);
  if(stack)sections.push({stack,label:`[${stack.section}]`,line:index+1,index,start:offsets[index],sourceLine:line});
 });
 sections.forEach((section,index)=>{
  section.endIndex=sections[index+1]?.index??lines.length;
  section.end=sections[index+1]?.start??source.length;
  section.body=lines.slice(section.index+1,section.endIndex);
  section.leadingTags=[];
  let contentStarted=false;
  section.body.forEach((line,bodyIndex)=>{
   const absoluteIndex=section.index+1+bodyIndex;
   if(!line.trim()&&!contentStarted)return;
   if(!contentStarted&&isBracketLine(line)&&!parseStack(line)){
    section.leadingTags.push({line:absoluteIndex+1,index:absoluteIndex,value:line.trim()});
    return;
   }
   if(line.trim())contentStarted=true;
  });
  section.lyricLines=section.body.filter(line=>line.trim()&&!isBracketLine(line));
 });
 return{source,lines,sections};
}

function replaceLine(text,index,replacement){
 const lines=String(text||'').split('\n');
 if(index<0||index>=lines.length)return String(text||'');
 lines[index]=replacement;
 return lines.join('\n');
}

function migrateLyrics(text,options={}){
 const source=String(text||'');
 const lines=source.split('\n');
 const out=[];
 let convertedTags=0;
 let convertedStacks=0;
 let index=0;
 while(index<lines.length){
  const stack=parseStack(lines[index]);
  if(!stack){out.push(lines[index]);index+=1;continue}
  const additions=[];
  let cursor=index+1;
  let lastConsumed=index;
  let sawTag=false;
  while(cursor<lines.length){
   const candidate=lines[cursor];
   if(parseStack(candidate))break;
   if(!candidate.trim()){
    if(sawTag)lastConsumed=cursor;
    cursor+=1;
    continue;
   }
   if(isBracketLine(candidate)){
    additions.push(candidate);
    convertedTags+=1;
    sawTag=true;
    lastConsumed=cursor;
    cursor+=1;
    continue;
   }
   break;
  }
  const directives=normalizeDirectives([...stack.directives,...additions]);
  const preserveCustomOrder=orderInversions(stack.directives).length>0;
  const shouldSort=options.sortExisting===true||(additions.length>0&&!preserveCustomOrder);
  const rendered=renderStack({section:stack.section,directives},{sort:shouldSort});
  out.push(rendered);
  if(rendered!==lines[index]||additions.length)convertedStacks+=1;
  if(additions.length){
   const nextLine=lines[lastConsumed+1];
   if(nextLine!=null&&nextLine.trim()&&out[out.length-1]!=='')out.push('');
   index=lastConsumed+1;
  }else index+=1;
 }
 let result=out.join('\n').replace(/\n{4,}/g,'\n\n\n');
 if(source.endsWith('\n')&&!result.endsWith('\n'))result+='\n';
 return Object.freeze({text:result,changed:result!==source,convertedTags,convertedStacks});
}

function sectionAtOffset(text,position){
 const parsed=parseLyrics(text);
 const pos=Math.max(0,Math.min(Number(position)||0,parsed.source.length));
 let selected=null;
 parsed.sections.forEach(section=>{if(section.start<=pos&&pos<=section.end)selected=section});
 return selected;
}

function addDirective(text,position,tag,options={}){
 const source=String(text||'');
 const tagStack=parseStack(tag);
 if(tagStack)return Object.freeze({changed:false,kind:'section',section:tagStack,reason:'section-tag'});
 const section=sectionAtOffset(source,position);
 const added=normalizeDirectives([tag]);
 if(!added.length)return Object.freeze({changed:false,kind:'directive',reason:'empty'});
 if(!section){
  if(options.createSection!==true)return Object.freeze({changed:false,kind:'directive',reason:'no-section'});
  const line=createStack(options.defaultSection||'Verse 1',added).line;
  const next=source.trim()?`${line}\n${source}`:line;
  return Object.freeze({changed:true,kind:'directive',reason:'section-created',text:next,line,stack:parseStack(line),cursor:line.length});
 }
 const before=section.stack.directives.length;
 const directives=normalizeDirectives([...section.stack.directives,...added]);
 const duplicate=directives.length===before;
 const preserveCustomOrder=orderInversions(section.stack.directives).length>0;
 const shouldSort=options.sort===true||(options.sort!==false&&!preserveCustomOrder);
 const line=renderStack({section:section.stack.section,directives},{sort:shouldSort});
 const next=replaceLine(source,section.index,line);
 return Object.freeze({changed:next!==source,kind:'directive',reason:duplicate?'duplicate':'added',text:next,line,section:{...section,stack:parseStack(line)},cursor:section.start+line.length});
}

function updateStack(text,lineIndex,transform){
 const source=String(text||'');
 const lines=source.split('\n');
 const stack=parseStack(lines[lineIndex]);
 if(!stack)return Object.freeze({changed:false,text:source,reason:'not-a-stack'});
 const nextStack=transform({section:stack.section,directives:[...stack.directives]})||stack;
 const line=renderStack(nextStack,{sort:false});
 const next=replaceLine(source,lineIndex,line);
 return Object.freeze({changed:next!==source,text:next,line,stack:parseStack(line)});
}

function reorderDirective(text,lineIndex,from,to){
 return updateStack(text,lineIndex,stack=>{
  const max=stack.directives.length-1;
  const sourceIndex=Math.max(0,Math.min(Number(from),max));
  const targetIndex=Math.max(0,Math.min(Number(to),max));
  if(!Number.isInteger(sourceIndex)||!Number.isInteger(targetIndex)||sourceIndex===targetIndex)return stack;
  const [moved]=stack.directives.splice(sourceIndex,1);
  stack.directives.splice(targetIndex,0,moved);
  return stack;
 });
}

function removeDirective(text,lineIndex,directiveIndex){
 return updateStack(text,lineIndex,stack=>{
  if(directiveIndex>=0&&directiveIndex<stack.directives.length)stack.directives.splice(directiveIndex,1);
  return stack;
 });
}

function sortStack(text,lineIndex){return updateStack(text,lineIndex,stack=>({...stack,directives:sortDirectives(stack.directives)}))}

function sectionKey(value){return normalizedKey(canonicalSection(value))}

function mergedStackLine(existing,incoming,options={}){
 const directives=normalizeDirectives([...existing.directives,...normalizeDirectives(incoming)]);
 const preserveCustomOrder=orderInversions(existing.directives).length>0;
 const shouldSort=options.sort===true||(options.sort!==false&&!preserveCustomOrder);
 return renderStack({section:existing.section,directives},{sort:shouldSort});
}

function mergeSection(text,sectionName,directives,options={}){
 const original=String(text||'');
 const source=options.migrate===false?original:migrateLyrics(original).text;
 const parsed=parseLyrics(source);
 const key=sectionKey(sectionName);
 const targets=parsed.sections.filter(section=>sectionKey(section.stack.section)===key);
 if(!targets.length){
  if(options.create===false)return Object.freeze({changed:source!==original,text:source,merged:0,added:0,reason:'section-not-found'});
  const line=createStack(sectionName,directives,{sort:options.sort!==false}).line;
  const separator=source.trim()?source.endsWith('\n\n')?'':source.endsWith('\n')?'\n':'\n\n':'';
  const next=`${source}${separator}${line}`;
  return Object.freeze({changed:next!==original,text:next,line,merged:0,added:1,reason:'section-created'});
 }
 const lines=source.split('\n');
 const selected=options.all===true?targets:[targets[Math.max(0,Math.min(Number(options.occurrence)||0,targets.length-1))]];
 selected.forEach(target=>{lines[target.index]=mergedStackLine(parseStack(lines[target.index]),directives,options)});
 const next=lines.join('\n');
 return Object.freeze({changed:next!==original,text:next,merged:selected.length,added:0,reason:'section-merged'});
}

function mergeStackDocument(text,incoming,options={}){
 const original=String(text||'');
 let source=options.migrate===false?original:migrateLyrics(original).text;
 const incomingSource=options.migrate===false?String(incoming||''):migrateLyrics(String(incoming||'')).text;
 const sourceParsed=parseLyrics(source);
 const incomingParsed=parseLyrics(incomingSource);
 if(!incomingParsed.sections.length){
  if(!incomingSource.trim())return Object.freeze({changed:source!==original,text:source,merged:0,added:0,reason:'empty'});
  const separator=source.trim()?source.endsWith('\n\n')?'':source.endsWith('\n')?'\n':'\n\n':'';
  const next=`${source}${separator}${incomingSource.trim()}`;
  return Object.freeze({changed:next!==original,text:next,merged:0,added:0,reason:'non-stack-appended'});
 }
 const lines=source.split('\n');
 const bySection=new Map();
 sourceParsed.sections.forEach(section=>{
  const key=sectionKey(section.stack.section);
  if(!bySection.has(key))bySection.set(key,[]);
  bySection.get(key).push(section);
 });
 const seen=new Map();
 const additions=[];
 let merged=0;
 incomingParsed.sections.forEach(section=>{
  const key=sectionKey(section.stack.section);
  const occurrence=seen.get(key)||0;
  seen.set(key,occurrence+1);
  const targets=bySection.get(key)||[];
  const target=targets[occurrence]||(options.repeatLast===true?targets.at(-1):null);
  if(target){
   lines[target.index]=mergedStackLine(parseStack(lines[target.index]),section.stack.directives,options);
   merged+=1;
   return;
  }
  if(options.create!==false){
   const block=incomingSource.split('\n').slice(section.index,section.endIndex).join('\n').trim();
   if(block)additions.push(block);
  }
 });
 source=lines.join('\n');
 if(additions.length){
  const separator=source.trim()?source.endsWith('\n\n')?'':source.endsWith('\n')?'\n':'\n\n':'';
  source=`${source}${separator}${additions.join('\n\n')}`;
 }
 return Object.freeze({changed:source!==original,text:source,merged,added:additions.length,reason:'stack-document-merged'});
}

function conflictMatches(text){
 const clean=cleanText(text);
 return CONFLICT_RULES.filter(rule=>rule.a.test(clean)&&rule.b.test(clean));
}

function styleConflictMatches(stackText,stylePrompt){
 const local=cleanText(stackText);
 const global=cleanText(stylePrompt);
 if(!global)return[];
 return CONFLICT_RULES.filter(rule=>(rule.a.test(local)&&rule.b.test(global))||(rule.b.test(local)&&rule.a.test(global)));
}

function orderInversions(directives){
 const comparable=directives.map((item,index)=>({item,index,rank:CATEGORY_RANK[item.category]??CATEGORY_RANK.extra}));
 const inversions=[];
 for(let i=0;i<comparable.length;i+=1)for(let j=i+1;j<comparable.length;j+=1)if(comparable[i].rank>comparable[j].rank)inversions.push([comparable[i].item,comparable[j].item]);
 return inversions;
}

function analyzeStack(stackInput,options={}){
 const stack=typeof stackInput==='string'?parseStack(stackInput):stackInput;
 if(!stack)return Object.freeze({valid:false,issues:[{severity:'error',code:'invalid-stack',message:'Invalid Pipe-Stack.'}],conflicts:[],elementCount:0,score:0});
 const language=String(options.language||'en').toLowerCase().startsWith('de')?'de':'en';
 const issues=[];
 const elements=[stack.section,...stack.directives.map(item=>item.value)];
 const seen=new Map();
 stack.directives.forEach((item,index)=>{
  const key=normalizedKey(item.value);
  if(seen.has(key))issues.push({severity:'warn',code:'duplicate-element',message:language==='de'?`Doppeltes Element: ${item.value}`:`Duplicate element: ${item.value}`,element:index+1});
  else seen.set(key,index);
 });
 if(elements.length>MAX_RECOMMENDED_ELEMENTS)issues.push({severity:'warn',code:'stack-overload',message:language==='de'?`${elements.length} Elemente überschreiten den empfohlenen Fokuswert von ${MAX_RECOMMENDED_ELEMENTS}.`:`${elements.length} elements exceed the recommended focus value of ${MAX_RECOMMENDED_ELEMENTS}.`});
 const localConflicts=conflictMatches(stack.directives.map(item=>item.value).join(' | '));
 localConflicts.forEach(rule=>issues.push({severity:rule.severity,code:`conflict-${rule.id}`,message:rule[language],rule:rule.id,scope:'section'}));
 const styleConflicts=styleConflictMatches(stack.directives.map(item=>item.value).join(' | '),options.stylePrompt||'');
 styleConflicts.filter(rule=>!localConflicts.includes(rule)).forEach(rule=>issues.push({severity:rule.severity,code:`style-conflict-${rule.id}`,message:(language==='de'?`STYLE-Abgleich: ${rule.de}`:`STYLE check: ${rule.en}`),rule:rule.id,scope:'style'}));
 const inversions=orderInversions(stack.directives);
 if(inversions.length)issues.push({severity:'info',code:'custom-priority-order',message:language==='de'?'Eigene Prioritätsreihenfolge aktiv; links stehende Elemente werden als wichtiger behandelt.':'Custom priority order is active; elements on the left are treated as more important.'});
 const errors=issues.filter(issue=>issue.severity==='error').length;
 const warnings=issues.filter(issue=>issue.severity==='warn').length;
 const score=Math.max(0,Math.min(100,100-errors*22-warnings*8-Math.max(0,elements.length-MAX_RECOMMENDED_ELEMENTS)*2));
 return Object.freeze({
  valid:true,section:stack.section,elements:Object.freeze(elements),elementCount:elements.length,
  directives:stack.directives,issues:Object.freeze(issues),conflicts:Object.freeze([...localConflicts,...styleConflicts.filter(rule=>!localConflicts.includes(rule))]),
  errors,warnings,score,primary:stack.directives[0]?.value||'',canonical:inversions.length===0,
  styleState:options.stylePrompt?(styleConflicts.length?'conflict':'aligned'):'unchecked'
 });
}

function analyzeLyrics(text,options={}){
 const parsed=parseLyrics(text);
 const issues=[];
 const stackReports=parsed.sections.map(section=>{
  const report=analyzeStack(section.stack,options);
  report.issues.forEach(issue=>issues.push({...issue,line:section.line,section:section.stack.section}));
  if(section.leadingTags.length)issues.push({severity:'warn',code:'legacy-tags',line:section.leadingTags[0].line,section:section.stack.section,message:String(options.language||'').toLowerCase().startsWith('de')?`${section.leadingTags.length} Einzel-Tag(s) können in den Pipe-Stack von ${section.stack.section} übernommen werden.`:`${section.leadingTags.length} standalone tag(s) can be migrated into the ${section.stack.section} Pipe-Stack.`});
  return{...report,line:section.line,index:section.index,sourceLine:section.sourceLine,leadingTags:section.leadingTags};
 });
 const malformed=parsed.lines.flatMap((line,index)=>{
  const trimmed=line.trim();
  if(trimmed&&(trimmed.startsWith('[')||trimmed.endsWith(']'))&&!isBracketLine(trimmed))return[{severity:'error',code:'brackets',line:index+1,message:String(options.language||'').toLowerCase().startsWith('de')?'Fehlerhafte eckige Klammer-Syntax.':'Malformed square-bracket syntax.'}];
  if(isBracketLine(trimmed)&&trimmed.includes('|')&&unwrapTag(trimmed).split('|').some(part=>!part.trim()))return[{severity:'error',code:'empty-pipe-element',line:index+1,message:String(options.language||'').toLowerCase().startsWith('de')?'Leeres Element im Pipe-Stack.':'Empty element in Pipe-Stack.'}];
  return[];
 });
 issues.push(...malformed);
 const errors=issues.filter(issue=>issue.severity==='error').length;
 const warnings=issues.filter(issue=>issue.severity==='warn').length;
 const infos=issues.filter(issue=>issue.severity==='info').length;
 const stackElements=stackReports.reduce((sum,report)=>sum+report.elementCount,0);
 const score=Math.max(0,Math.min(100,Math.round(stackReports.length?stackReports.reduce((sum,report)=>sum+report.score,0)/stackReports.length:100)-errors*5-warnings*2));
 return Object.freeze({parsed,stacks:Object.freeze(stackReports),issues:Object.freeze(issues),errors,warnings,infos,score,stackCount:stackReports.length,elementCount:stackElements,conflictCount:issues.filter(issue=>issue.code.includes('conflict')).length,legacyCount:issues.filter(issue=>issue.code==='legacy-tags').length});
}

return Object.freeze({
 VERSION,MAX_RECOMMENDED_ELEMENTS,CATEGORY_ORDER,CONFLICT_RULES,
 cleanText,unwrapTag,isBracketLine,isSectionName,canonicalSection,splitPipe,classifyElement,normalizeDirective,normalizeDirectives,sortDirectives,
 parseStack,renderStack,createStack,coerceStackDocument,parseLyrics,migrateLyrics,sectionAtOffset,addDirective,updateStack,reorderDirective,removeDirective,sortStack,
 mergeSection,mergeStackDocument,
 conflictMatches,styleConflictMatches,analyzeStack,analyzeLyrics
});
});

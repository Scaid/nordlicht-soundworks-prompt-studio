(function(root,factory){
'use strict';
const api=factory();
if(typeof module==='object'&&module.exports)module.exports=api;
if(root)root.NSWVocalClarityEngine=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';

const VERSION='7.5.9';
const PREFIX_TERMS=Object.freeze([
 'Broadway musical clarity',
 'story-first enunciation',
 'hard consonants',
 'dry forward lead vocal',
 'close mic'
]);
const PREFIX=PREFIX_TERMS.join(', ');

const PREFIX_ALIASES=Object.freeze([
 ['broadway musical clarity','broadway clarity','musical theatre clarity'],
 ['story first enunciation','story driven enunciation','story first articulation'],
 ['hard consonants','crisp consonants','clear consonants'],
 ['dry forward lead vocal','dry forward vocal','dry lead vocal'],
 ['close mic','close mic vocal','intimate close mic','intimate close mic vocal']
]);

const EXPLICIT_MURKY_VOCALS=/(?:\b(?:buried|muffled|obscured|indistinct|washed[- ]out|hazy|murky|blurred|distant)\s+(?:lead\s+)?vocals?\b|\b(?:lead\s+)?vocals?\s+(?:buried|muffled|obscured|distant|behind (?:the )?mix|through a wall)\b|\bvocal blur\b)/i;
const STRONG_MURKY_GENRES=/(?:\bshoegaze\b|\bblackgaze\b|\bwitch house\b|\bcloud rap\b)/i;
const CAUTION_MURKY_GENRES=/(?:\bdream pop\b|\bethereal wave\b|\bambient pop\b|\bvaporwave\b|\blo-?fi\b|\bpsychedelic(?: pop| rock)?\b)/i;
const REVERB_WORDS=/(?:\breverb\b|\breverberant\b|\becho(?:es)?\b|\blarge hall\b|\bcathedral space\b|\bwet (?:vocal|mix)\b)/i;
const STRONG_REVERB=/(?:\bheavy\b|\bhuge\b|\bdeep\b|\blong\b|\bairy\b|\bwet\b|\blarge hall\b|\bcathedral\b|\breverb[- ]soaked\b|\bwashed[- ]out\b|\bghostly echoes\b)/i;
const SUPPORTIVE_SPACE=/(?:\bminimal reverb\b|\bshort reverb\b|\bshort vocal delay\b|\bdry (?:forward )?(?:lead )?vocal\b|\bclose[- ]?mic\b|\bclean centered vocal\b)/i;
const INSTRUMENT_TARGET=/(?:\bguitars?\b|\bsynth(?:s|esizer)?\b|\bdrums?\b|\bpercussion\b|\bpiano\b|\bstrings?\b|\bpads?\b|\binstruments?\b)/i;
const VOCAL_TARGET=/(?:\bvocals?\b|\bvoices?\b|\blead\b|\bsinger\b|\bchoir\b)/i;
const EMOTION_WORDS=/(?:\bemotional\b|\bsoulful\b|\bmelancholic\b|\bintimate\b|\bheroic\b|\btriumphant\b|\bdark\b|\bhopeful\b|\bmysterious\b|\btense\b|\bplayful\b|\bromantic\b|\bnostalgic\b|\baggressive\b|\bvulnerable\b)/i;

function clean(value){return String(value==null?'':value).replace(/[\r\n]+/g,' ').replace(/\s+/g,' ').trim()}
function key(value){return clean(value).toLowerCase().replace(/[‐‑‒–—-]+/g,' ').replace(/[^\p{L}\p{N}\s]/gu,'').replace(/\s+/g,' ').trim()}
function splitStyle(value){return String(value||'').split(/[,;\n]+/).map(clean).filter(Boolean)}
function unique(values){const seen=new Set();return values.filter(value=>{const normalized=key(value);if(!normalized||seen.has(normalized))return false;seen.add(normalized);return true})}
function aliasIndex(value){const normalized=key(value);return PREFIX_ALIASES.findIndex(group=>group.some(alias=>key(alias)===normalized))}
function isClarityTerm(value){return aliasIndex(value)>=0}
function stripClarityTerms(value){return splitStyle(value).filter(term=>!isClarityTerm(term)).join(', ')}
function applyPrefix(value){return unique([...PREFIX_TERMS,...splitStyle(value).filter(term=>!isClarityTerm(term))]).join(', ')}
function prefixState(value){
 const terms=splitStyle(value),indices=PREFIX_ALIASES.map((group,index)=>terms.findIndex(term=>aliasIndex(term)===index));
 const complete=indices.every(index=>index>=0);
 const frontLoaded=complete&&indices.every((position,index)=>position===index);
 return Object.freeze({complete,frontLoaded,indices:Object.freeze(indices),firstIndex:indices.filter(index=>index>=0).sort((a,b)=>a-b)[0]??-1});
}

function words(line){return String(line||'').match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)||[]}
function analyzeLyrics(value){
 const source=String(value||'');
 const lines=source.split(/\r?\n/).map(line=>line.replace(/\[[^\]]+\]/g,' ').replace(/\s+/g,' ').trim()).filter(Boolean);
 const counts=lines.map(line=>words(line).length).filter(Boolean);
 const wordCount=counts.reduce((sum,count)=>sum+count,0);
 const lineCount=counts.length;
 const averageWordsPerLine=lineCount?wordCount/lineCount:0;
 const maxWordsPerLine=lineCount?Math.max(...counts):0;
 const denseLineCount=counts.filter(count=>count>=12).length;
 const veryDenseLineCount=counts.filter(count=>count>=16).length;
 const denseRatio=lineCount?denseLineCount/lineCount:0;
 let level='empty';
 if(lineCount){
  if(averageWordsPerLine>=12||maxWordsPerLine>=22||denseRatio>=0.45||veryDenseLineCount>=Math.max(2,Math.ceil(lineCount*.25)))level='high';
  else if(averageWordsPerLine>=8.5||maxWordsPerLine>=16||denseRatio>=0.2)level='medium';
  else level='low';
 }
 return Object.freeze({level,lineCount,wordCount,averageWordsPerLine:Number(averageWordsPerLine.toFixed(1)),maxWordsPerLine,denseLineCount,veryDenseLineCount,denseRatio:Number(denseRatio.toFixed(2))});
}

function languageOf(value){return String(value||'en').toLowerCase().startsWith('de')?'de':'en'}
function issue(code,severity,de,en,details={}){return Object.freeze({code,severity,message:{de,en},...details})}
function messageFor(item,language){return item.message?.[languageOf(language)]||item.message?.en||''}
function isInstrumentOnlyReverb(term){return REVERB_WORDS.test(term)&&INSTRUMENT_TARGET.test(term)&&!VOCAL_TARGET.test(term)}

function analyze(input={}){
 const style=clean(input.style),lyrics=String(input.lyrics||''),vocalMode=String(input.vocalMode||'vocals').toLowerCase();
 const terms=splitStyle(style),searchText=[style,input.genre,input.subgenre,input.voice].filter(Boolean).join(', ');
 const issues=[];
 const explicitMurky=terms.filter(term=>EXPLICIT_MURKY_VOCALS.test(term));
 const strongMurky=terms.filter(term=>STRONG_MURKY_GENRES.test(term));
 const cautionMurky=terms.filter(term=>CAUTION_MURKY_GENRES.test(term));
 const reverbTerms=terms.filter(term=>REVERB_WORDS.test(term)&&!SUPPORTIVE_SPACE.test(term)&&!isInstrumentOnlyReverb(term));
 const heavyVocalReverb=reverbTerms.filter(term=>VOCAL_TARGET.test(term)&&STRONG_REVERB.test(term));
 const heavyGlobalReverb=reverbTerms.filter(term=>!VOCAL_TARGET.test(term)&&STRONG_REVERB.test(term));
 const lightReverb=reverbTerms.filter(term=>!heavyVocalReverb.includes(term)&&!heavyGlobalReverb.includes(term));
 const density=analyzeLyrics(lyrics);

 if(vocalMode==='instrumental')issues.push(issue('instrumental-mode','error','Vocal Clarity wird im Instrumental-Modus nicht angewendet.','Vocal Clarity is not applied in Instrumental Mode.',{scope:'mode'}));
 if(explicitMurky.length)issues.push(issue('murky-vocal-treatment','error','Die gewählte Vocal-Ästhetik verlangt ausdrücklich verwaschene oder verdeckte Stimmen.','The selected vocal aesthetic explicitly requests murky or obscured vocals.',{scope:'style',terms:explicitMurky}));
 if(strongMurky.length||STRONG_MURKY_GENRES.test(searchText))issues.push(issue('murky-genre','error','Das Genre lebt typischerweise von absichtlich eingebetteten oder verwaschenen Vocals.','The genre commonly relies on intentionally embedded or murky vocals.',{scope:'genre',terms:strongMurky}));
 else if(cautionMurky.length||CAUTION_MURKY_GENRES.test(searchText))issues.push(issue('murky-genre-caution','warn','Dieses Genre nutzt häufig weiche oder räumliche Vocals; die klare Broadway-Priorität verändert diesen Charakter.','This genre often uses soft or spacious vocals; Broadway clarity changes that character.',{scope:'genre',terms:cautionMurky}));
 if(heavyVocalReverb.length)issues.push(issue('heavy-vocal-reverb','error','Starker Vocal-Reverb widerspricht „dry forward lead vocal“ und „close mic“.','Heavy vocal reverb conflicts with “dry forward lead vocal” and “close mic”.',{scope:'reverb',terms:heavyVocalReverb}));
 if(heavyGlobalReverb.length)issues.push(issue('heavy-global-reverb','error','Der stark verhallte Gesamtraum konkurriert mit der trockenen, nahen Stimmpriorität.','The heavily reverberant overall space competes with the dry, close vocal priority.',{scope:'reverb',terms:heavyGlobalReverb}));
 if(lightReverb.length)issues.push(issue('reverb-caution','warn','Räumliche Vocal- oder Mix-Begriffe sollten hinter der Klarheitspriorität sparsam bleiben.','Spatial vocal or mix terms should remain restrained behind the clarity priority.',{scope:'reverb',terms:lightReverb}));
 if(density.level==='high')issues.push(issue('high-lyric-density','error','Die Lyrics sind zu dicht für zuverlässige Artikulation; kürzere Zeilen oder mehr Pausen helfen.','The lyrics are too dense for reliable articulation; shorter lines or more pauses will help.',{scope:'lyrics',density}));
 else if(density.level==='medium')issues.push(issue('medium-lyric-density','warn','Einige Lyrics-Zeilen sind dicht. Die Klarheitsanweisung hilft, ersetzt aber keine rhythmische Luft.','Some lyric lines are dense. The clarity instruction helps but cannot replace rhythmic space.',{scope:'lyrics',density}));

 const errors=issues.filter(item=>item.severity==='error').length;
 const warnings=issues.filter(item=>item.severity==='warn').length;
 const status=errors?'incompatible':warnings?'caution':'compatible';
 const score=Math.max(0,Math.min(100,100-errors*30-warnings*12));
 return Object.freeze({style,terms:Object.freeze(terms),prefix:prefixState(style),density,status,score,errors,warnings,issues:Object.freeze(issues),signals:Object.freeze({explicitMurky,strongMurky,cautionMurky,reverbTerms,heavyVocalReverb,heavyGlobalReverb,lightReverb,emotion:EMOTION_WORDS.test(searchText)})});
}

function decide(mode,analysis){
 const selected=['off','smart','force'].includes(String(mode))?String(mode):'smart';
 if(analysis?.issues?.some(item=>item.code==='instrumental-mode'))return Object.freeze({mode:selected,apply:false,state:'suppressed',reason:'instrumental'});
 if(selected==='off')return Object.freeze({mode:selected,apply:false,state:'off',reason:'disabled'});
 if(selected==='force')return Object.freeze({mode:selected,apply:true,state:analysis.status==='incompatible'?'forced':'active',reason:'forced'});
 if(analysis.status==='incompatible')return Object.freeze({mode:selected,apply:false,state:'blocked',reason:'compatibility'});
 return Object.freeze({mode:selected,apply:true,state:analysis.status==='caution'?'caution':'active',reason:'compatible'});
}

function buildStyle(style,options={}){
 const report=analyze({...options,style});
 const decision=decide(options.mode,report);
 const text=decision.apply?applyPrefix(style):clean(style);
 return Object.freeze({text,changed:text!==clean(style),applied:decision.apply,decision,analysis:report,prefix:prefixState(text)});
}

return Object.freeze({
 VERSION,PREFIX_TERMS,PREFIX,
 clean,key,splitStyle,isClarityTerm,stripClarityTerms,applyPrefix,prefixState,
 analyzeLyrics,analyze,decide,buildStyle,messageFor
});
});

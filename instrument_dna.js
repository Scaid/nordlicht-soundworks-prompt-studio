/* Nordlicht Soundworks Instrument DNA 1.0 */
const INSTRUMENT_RELIABILITY_LABELS={core:"Core",advanced:"Advanced",experimental:"Experimental"};
const INSTRUMENT_CORE_RX=/(piano|electric guitar|acoustic guitar|bass guitar|upright bass|drum|violin|cello|strings|orchestra|synth|saxophone|trumpet|trombone|clarinet|flute|choir|organ|brass|808|sub bass)/i;
const INSTRUMENT_EXPERIMENTAL_RX=/(waterphone|glass harmonica|crystal baschet|hydraulophone|musical saw|ondes martenot|serpent|carnyx|lithophone|pyrophone|sea organ|stalacpipe|theremin|bullroarer|bones|death whistle)/i;
const INSTRUMENT_ADVANCED_RX=/(tagelharpa|nyckelharpa|jouhikko|duduk|oud|koto|shamisen|sitar|balalaika|hurdy|didgeridoo|erhu|pipa|guzheng|shakuhachi|bodhr|djembe|kora|charango|ocarina|kalimba|bagpipe|harp|fiddle|taiko|tabla|gamelan)/i;
function instrumentReliability(itemOrName){
 const item=typeof itemOrName==='string'?(INSTRUMENT_DB.find(x=>x.name===itemOrName)||{name:itemOrName}):itemOrName;
 const text=[item?.name,item?.family,item?.region].filter(Boolean).join(' ');
 if(INSTRUMENT_EXPERIMENTAL_RX.test(text))return {level:'experimental',score:42,label:'Experimental'};
 if(INSTRUMENT_CORE_RX.test(text))return {level:'core',score:92,label:'Core'};
 if(INSTRUMENT_ADVANCED_RX.test(text))return {level:'advanced',score:70,label:'Advanced'};
 return {level:'advanced',score:64,label:'Advanced'};
}
function instrumentRolePrompt(name,genre='',subgenre=''){
 const t=(name+' '+genre+' '+subgenre).toLowerCase();
 if(/piano/.test(t))return /jazz|swing/.test(t)?'rhythmic jazz piano':'warm piano';
 if(/saxophone/.test(t))return /swing|jazz/.test(t)?'playful saxophone lead':'melodic saxophone';
 if(/trumpet|trombone|brass/.test(t))return /swing|jazz/.test(t)?'punchy brass section':'cinematic brass';
 if(/electric guitar/.test(t))return /metal|rock/.test(t)?'heavy rhythm electric guitar':'clean electric guitar';
 if(/acoustic guitar/.test(t))return 'warm acoustic guitar';
 if(/upright bass/.test(t))return /swing|jazz/.test(t)?'walking upright bass':'warm upright bass';
 if(/drum/.test(t))return /swing|jazz/.test(t)?'brushed swing drums':'driving drums';
 if(/synth/.test(t))return /ambient/.test(t)?'atmospheric synth textures':'layered synthesizer';
 if(/tagelharpa|jouhikko/.test(t))return 'dark bowed folk drone';
 if(/nyckelharpa/.test(t))return 'melodic nyckelharpa';
 return name;
}
function reliableInstrumentPrompt(name,genre='',subgenre=''){return instrumentRolePrompt(name,genre,subgenre)}


(function(){
'use strict';

const clamp=(n,a=0,b=100)=>Math.max(a,Math.min(b,n));
const uniq=a=>{const seen=new Set();return a.filter(x=>{const k=String(x||'').trim().toLowerCase();if(!k||seen.has(k))return false;seen.add(k);return true})};
const words=s=>(String(s||'').match(/[\p{L}\p{N}'’\-]+/gu)||[]);
const has=(t,r)=>r.test(String(t||'').toLowerCase());

const GENRES=[
 {test:/medieval|mittelalter|tavern|taverne|minnes|gregorian|crusader|ritter|castle music|burgmusik/,key:'medieval',label:'Medieval Folk / Fantasy Medieval',bpm:112,keySig:'D minor',scale:'Dorian / Aeolian blend',meter:'6/8',groove:'Tabor pulse with drone-based folk movement',instruments:['Hurdy-Gurdy','Lute','Shawm','Frame Drum','Medieval Harp']},
 {test:/viking|nordic|wikinger|norse/,key:'folk',label:'Nordic Cinematic / Viking Folk',bpm:124,keySig:'D minor',scale:'Dorian / Natural Minor blend',meter:'6/8',groove:'Heavy ritual pulse with triplet movement',instruments:['Tagelharpa','Taiko','Cinematic Strings','War Horns','Deep Synth Bass']},
 {test:/anime|j-pop|opening|shonen/,key:'anime',label:'Anime Rock / J-Pop',bpm:150,keySig:'E minor',scale:'Natural Minor with major lift',meter:'4/4',groove:'Driving eighth-note rock pulse',instruments:['Electric Guitar','Cinematic Strings','Synthesizer','Acoustic Drums']},
 {test:/metalcore|deathcore/,key:'metal',label:'Cinematic Metalcore',bpm:150,keySig:'D minor',scale:'Natural Minor / Phrygian accents',meter:'4/4',groove:'Half-time verses, double-time chorus and breakdown pulse',instruments:['Distorted Guitars','Acoustic Drums','Deep Bass','Cinematic Strings']},
 {test:/metal|hard rock/,key:'metal',label:'Heavy Metal / Hard Rock',bpm:145,keySig:'D minor',scale:'Natural Minor',meter:'4/4',groove:'Driving rock pulse with half-time contrast',instruments:['Distorted Guitars','Acoustic Drums','Bass Guitar','Cinematic Strings']},
 {test:/electro swing|swing/,key:'jazz',label:'Electro Swing',bpm:126,keySig:'F minor',scale:'Dorian / Blues scale',meter:'4/4 swing',groove:'Triplet swing with electronic four-on-the-floor support',instruments:['Upright Bass','Brass Section','Piano','Electronic Drums']},
 {test:/rap|hip.?hop|trap|drill/,key:'rap',label:'Cinematic Rap / Hip-Hop',bpm:94,keySig:'C minor',scale:'Minor pentatonic / Natural Minor',meter:'4/4',groove:'Syncopated kick pattern with half-time feel',instruments:['Deep Bass','Piano','Electronic Drums','Atmospheric Synth']},
 {test:/techno|edm|electronic|house|trance|dubstep/,key:'edm',label:'Modern Electronic / EDM',bpm:132,keySig:'F minor',scale:'Natural Minor',meter:'4/4',groove:'Four-on-the-floor with syncopated offbeat layers',instruments:['Synthesizer','Electronic Drums','Deep Bass','Cinematic Impacts']},
 {test:/ballad|ballade/,key:'ballad',label:'Emotional Cinematic Ballad',bpm:82,keySig:'A minor',scale:'Natural Minor / Relative Major',meter:'6/8',groove:'Slow compound-meter sway',instruments:['Piano','Cello','Cinematic Strings']},
 {test:/cinematic|trailer|soundtrack|game ost|ost/,key:'cinematic',label:'Epic Cinematic Hybrid',bpm:110,keySig:'D minor',scale:'Harmonic Minor / Modal mixture',meter:'4/4',groove:'Slow pulse growing into orchestral ostinato',instruments:['Cinematic Strings','French Horn','Taiko','Hybrid Synth']}
];

const STRUCTURES={
 medieval:['Tavern Intro','Verse 1','Processional Build','Chorus','Verse 2','Courtly Bridge','Final Chorus','Castle Outro'],
 anime:['Intro','Verse 1','Pre-Chorus','Chorus','Verse 2','Bridge','Final Chorus','Outro'],
 folk:['Ritual Intro','Verse 1','War Chant','Chorus','March Build','Battle Break','Final Chorus','Saga Outro'],
 metal:['Intro','Verse 1','Pre-Chorus','Chorus','Verse 2','Breakdown','Bridge','Final Chorus','Outro'],
 edm:['Atmospheric Intro','Build 1','Drop 1','Break','Build 2','Drop 2','Finale','Outro'],
 ballad:['Piano Intro','Verse 1','Pre-Chorus','Chorus','Verse 2','Bridge','Final Chorus','Outro'],
 jazz:['Vintage Intro','Verse 1','Chorus','Brass Break','Verse 2','Dance Break','Final Chorus','Outro'],
 rap:['Intro','Verse 1','Hook','Verse 2','Pre-Hook','Hook','Bridge','Final Hook','Outro'],
 cinematic:['Atmospheric Intro','Theme A','Build','Main Theme','Quiet Interlude','Rising Conflict','Climax','Resolution'],
 pop:['Intro','Verse 1','Pre-Chorus','Chorus','Verse 2','Bridge','Final Chorus','Outro']
};

const CHORDS={
 medieval:['Dm','C','Bb','Dm'],
 anime:['Em','C','G','D'],folk:['Dm','Bb','C','Dm'],metal:['Dm','Bb','F','C'],
 edm:['Fm','Db','Ab','Eb'],ballad:['Am','F','C','G'],jazz:['Fm7','Bbm7','Eb7','Abmaj7'],
 rap:['Cm','Ab','Eb','Bb'],cinematic:['Dm','Bb','F','C'],pop:['Am','F','C','G']
};

function detectLanguage(text,requested){
 if(requested&&requested!=='auto')return requested;
 const t=' '+String(text||'').toLowerCase()+' ';
 if(/[äöüß]/.test(t)||[' der ',' die ',' das ',' und ',' nicht ',' ich ',' wir ',' ein '].some(x=>t.includes(x)))return'German';
 if(/[ぁ-んァ-ン一-龯]/.test(t))return'Japanese';
 if(/[가-힣]/.test(t))return'Korean';
 if([' le ',' la ',' et ',' je ',' nous ',' pas '].some(x=>t.includes(x)))return'French';
 if([' el ',' la ',' y ',' yo ',' que ',' no '].some(x=>t.includes(x)))return'Spanish';
 return'English';
}

function parseBrief(brief,options={}){
 const text=String(brief||''),low=text.toLowerCase();
 const found=GENRES.filter(x=>x.test.test(low));
 const primary=found[0]||{key:'pop',label:'Modern Cinematic Pop',bpm:122,keySig:'A minor',scale:'Natural Minor',meter:'4/4',groove:'Steady modern pulse',instruments:['Piano','Cinematic Strings','Acoustic Drums']};
 const secondary=found[1]||null;
 const explicitBpm=(low.match(/\b(\d{2,3})\s*bpm\b/)||[])[1];
 const vocals=[];
 if(has(low,/female|weiblich|frau/))vocals.push('Female Lead Vocal');
 if(has(low,/male|männlich|mann/))vocals.push('Male Lead Vocal');
 if(has(low,/duet|duett/))vocals.push('Male/Female Duet');
 if(has(low,/narrator|erzähler|spoken/))vocals.push('Deep Male Narrator');
 if(has(low,/choir|chor/))vocals.push('Layered Choir');
 if(has(low,/child choir|kinderchor/))vocals.push('Child Choir');
 if(has(low,/growl|scream|harsh/))vocals.push('Harsh Male Vocal');
 if(!vocals.length)vocals.push(primary.key==='rap'?'Male Rap Vocal':primary.key==='folk'?'Deep Male Lead Vocal':'Female Lead Vocal');

 const extraInst=[];
 const map=[
  [/hurdy.?gurdy|drehleier/,'Hurdy-Gurdy'],[/lute|laute/,'Lute'],[/theorbo|theorbe/,'Theorbo'],
  [/rebec/,'Rebec'],[/shawm|schalmei/,'Shawm'],[/crumhorn|krummhorn/,'Crumhorn'],
  [/psaltery|psalter/,'Psaltery'],[/recorder|blockflöte/,'Recorder'],[/frame drum|rahmentrommel/,'Frame Drum'],
  [/tabor/,'Tabor'],[/medieval harp|mittelalterharfe/,'Medieval Harp'],
  [/tagelharpa/,'Tagelharpa'],[/nyckelharpa/,'Nyckelharpa'],[/taiko/,'Taiko'],[/piano/,'Piano'],
  [/guitar|gitarre/,'Electric Guitar'],[/strings|streicher/,'Cinematic Strings'],[/duduk/,'Duduk'],
  [/koto/,'Koto'],[/shamisen/,'Shamisen'],[/brass|bläser/,'Brass Section'],[/synth/,'Synthesizer'],
  [/cello/,'Cello'],[/flute|flöte/,'Flute'],[/bagpipe|dudelsack/,'Great Highland Bagpipes'],
  [/kantele/,'Kantele'],[/jouhikko/,'Jouhikko'],[/dulcimer|hackbrett/,'Hammered Dulcimer']
 ];
 map.forEach(([r,v])=>{if(r.test(low))extraInst.push(v)});
 const worldData=window.NSW_WORLD_MUSIC_DATA;
 const worldAliases={medieval:['mittelalter','ritter','taverne','burg','schalmei','drehleier'],renaissance:['renaissance'],nordic:['wikinger','viking','nordic','norse'],celtic:['keltisch','celtic'],japan:['japanisch','japanese'],china:['chinesisch','chinese'],korea:['koreanisch','korean'],middleeast:['arabisch','arabic','middle eastern','orientalisch'],india:['indisch','indian'],balkan:['balkan'],easteurope:['slawisch','slavic','osteuropa'],africa:['afrikanisch','african'],northafrica:['nordafrika','maghreb','gnawa'],latin:['lateinamerika','latin'],andean:['anden','andean'],western:['western','country','americana'],polynesia:['polynesisch','pacific'],arctic:['inuit','arktisch','arctic']};
 const detectedWorld=worldData?.worlds?.find(w=>{
  const name=w.name.toLowerCase(),id=w.id.toLowerCase(),aliases=worldAliases[id]||[];
  return low.includes(name)||low.includes(id)||aliases.some(a=>low.includes(a))||w.genres.some(g=>low.includes(g.toLowerCase()));
 });
 if(detectedWorld){
  worldData.instruments.filter(i=>i.world===detectedWorld.name&&i.status==='Reliable').slice(0,4).forEach(i=>extraInst.push(i.name));
 }

 let emotion='Determined → Triumphant';
 if(has(low,/dark|dunkel|shadow|bedroh/))emotion='Dark Mystery → Determination → Triumph';
 if(has(low,/sad|traurig|melanch/))emotion='Melancholic → Hopeful → Emotional Release';
 if(has(low,/funny|lustig|comedy|chaotic/))emotion='Playful → Chaotic → Celebratory';
 if(has(low,/romantic|liebe|romance/))emotion='Intimate → Yearning → Emotional Union';
 if(has(low,/horror|terror|fear|angst/))emotion='Unease → Fear → Desperate Climax';

 let production='Dynamic Mix, Controlled Contrast, Clear Voice Separation, Huge Cinematic Finale';
 if(primary.key==='edm')production='Modern Electronic Production, Sidechained Low End, Strong Build-Ups, Massive Bass Drops';
 if(primary.key==='metal')production='Punchy Modern Metal Production, Tight Low End, Wide Guitars, Explosive Breakdown and Finale';
 if(primary.key==='ballad')production='Intimate Close-Mic Production, Warm Piano, Emotional Swells, Wide Final Chorus';
 if(primary.key==='jazz')production='Vintage Swing Character, Warm Brass, Upright Bass, Modern Electronic Punch';
 if(has(low,/lo.?fi/))production='Lo-Fi Texture, Warm Saturation, Soft Transients, Intimate Mix';
 if(has(low,/massive drop|huge drop|bass drop/))production+=', Massive Bass Drop';
 if(has(low,/close.?mic|intimate/))production+=', Intimate Close-Mic';

 const structure=STRUCTURES[primary.key]||STRUCTURES.pop;
 const language=detectLanguage(text,options.language);
 const bpm=explicitBpm?Number(explicitBpm):primary.bpm;
 return{
  primaryGenre:primary,secondaryGenre:secondary,bpm,language,vocals:uniq(vocals),
  instruments:uniq([...extraInst,...primary.instruments]).slice(0,8),
  emotion,production,structure,
  goal:options.goal||'song',profile:options.profile||'balanced',duration:options.duration||'3:00',
  detectedWorld:detectedWorld||null,
  signals:found.length+vocals.length+extraInst.length+(explicitBpm?1:0)+(detectedWorld?1:0)
 };
}

function durationSeconds(x){const p=String(x||'3:00').split(':').map(Number);return (p[0]||3)*60+(p[1]||0)}

function buildArchitecture(parsed){
 const total=durationSeconds(parsed.duration),n=parsed.structure.length;
 const base=parsed.structure.map((name,i)=>{
  const low=name.toLowerCase();
  let energy=24+i/Math.max(1,n-1)*66;
  if(/chorus|drop|climax|final|breakdown/.test(low))energy+=15;
  if(/intro|outro|break|interlude|resolution/.test(low))energy-=14;
  let density=/chorus|drop|climax|final/.test(low)?88:/intro|outro|interlude/.test(low)?30:56;
  return{name,energy:clamp(Math.round(energy)),density,vocal:/drop|break|interlude/.test(low)?'Instrumental':/chorus|final/.test(low)?parsed.vocals.join(' + '):parsed.vocals[0],duration:Math.max(10,Math.round(total/n))};
 });
 let used=0;const architecture=base.map((x,i)=>{const duration=i===base.length-1?total-used:x.duration;used+=duration;return{...x,duration}});
 return architecture;
}

function sectionInstrumentRole(name,parsed){
 const low=name.toLowerCase(),core=parsed.instruments;
 if(/intro/.test(low))return uniq(core.slice(0,2).concat(['Atmospheric Texture'])).join(', ');
 if(/chorus|drop|climax|final/.test(low))return uniq(core.concat(['Full Core Palette'])).join(', ');
 if(/bridge|break|interlude/.test(low))return uniq(core.slice(0,3).concat(['Reduced Contrast Layer'])).join(', ');
 return uniq(core.slice(0,4).concat(['Rhythm Foundation'])).join(', ');
}

function buildTheory(parsed){
 const chords=CHORDS[parsed.primaryGenre.key]||CHORDS.pop;
 return{
  key:parsed.primaryGenre.keySig,scale:parsed.primaryGenre.scale,meter:parsed.primaryGenre.meter,
  groove:parsed.primaryGenre.groove,chords,
  modulation:parsed.primaryGenre.key==='folk'?'Parallel major color in the final victory':
    parsed.primaryGenre.key==='anime'?'Optional whole-step or relative-major lift in the final chorus':
    parsed.primaryGenre.key==='cinematic'?'Pivot to the parallel major for final resolution':
    'Keep the tonal center stable and increase intensity through voicing, register and production'
 };
}

function detectConflicts(parsed,brief){
 const low=String(brief||'').toLowerCase(),out=[];
 if(/instrumental only|pure instrumental/.test(low)&&/vocal|voice|stimme|choir|chor/.test(low))out.push('Instrumental-only and vocal requirements compete unless assigned to separate sections.');
 if(/soft|gentle|ruhig/.test(low)&&/constant high energy|massive drop|explosive/.test(low))out.push('Soft or gentle direction competes with constant high-energy instructions.');
 if(/mono/.test(low)&&/wide stereo|wide mix/.test(low))out.push('Mono and wide-stereo production directions conflict.');
 if(/dry|no reverb/.test(low)&&/huge reverb|cathedral|large hall/.test(low))out.push('Dry and large-reverb directions should be separated by section.');
 if(parsed.instruments.length>7)out.push('The instrument palette is dense; secondary instruments may be ignored or blended unpredictably.');
 if(parsed.secondaryGenre&&parsed.profile==='safe')out.push('A secondary genre was detected, but the Suno-Safe profile prioritizes the primary genre.');
 if(parsed.vocals.length>4)out.push('Many vocal identities may reduce reliable voice separation.');
 return uniq(out);
}

function learningInfluence(enabled){
 if(!enabled)return{entries:0,bonus:0,note:'Learning Engine disabled'};
 let d=[];try{d=JSON.parse(localStorage.getItem('nsw-learning-feedback-v2')||'[]')}catch(e){}
 const positive=d.filter(x=>Number(x.rating||0)>=4||x.outcome==='keeper').length;
 const negative=d.filter(x=>Number(x.rating||0)<=2||x.outcome==='reject').length;
 return{entries:d.length,bonus:clamp(Math.round((positive-negative)/3),-6,8),note:d.length?`${d.length} personal feedback entries considered`:'No personal feedback available yet'};
}

function buildDirectorResult(brief,options={}){
 const parsed=parseBrief(brief,options),architecture=buildArchitecture(parsed),theory=buildTheory(parsed);
 const conflicts=detectConflicts(parsed,brief),learn=learningInfluence(options.useLearning);
 const profilePenalty=parsed.profile==='safe'?conflicts.length*3:conflicts.length*5;
 const densityPenalty=Math.max(0,parsed.instruments.length-6)*3+Math.max(0,parsed.vocals.length-3)*4;
 const coherence=clamp(Math.round(84+learn.bonus-profilePenalty-densityPenalty+(parsed.signals>=4?4:0)));
 const decisions=[
  {key:'genre',title:'Genre Direction',value:parsed.secondaryGenre?`${parsed.primaryGenre.label} with ${parsed.secondaryGenre.label} influence`:parsed.primaryGenre.label,confidence:parsed.secondaryGenre?84:92,module:'genreEvolutionView',reason:'Selected from the strongest genre, world and production signals in the brief.'},
  {key:'tempo',title:'Tempo & Groove',value:`${parsed.bpm} BPM · ${parsed.primaryGenre.meter} · ${parsed.primaryGenre.groove}`,confidence:88,module:'theoryDirectorView',reason:'Balances genre authenticity, lyric clarity and a practical energy curve.'},
  {key:'theory',title:'Harmony',value:`${theory.key} · ${theory.scale} · ${theory.chords.join(' – ')}`,confidence:86,module:'theoryDirectorView',reason:'Provides a recognizable harmonic identity without excessive theoretical detail.'},
  {key:'vocal',title:'Vocal Cast',value:parsed.vocals.join(', '),confidence:parsed.vocals.length<=3?90:74,module:'vocalDirectorView',reason:'Matches the narrative roles, genre and requested voice characters.'},
  {key:'instrument',title:'Instrument Palette',value:parsed.instruments.join(', '),confidence:parsed.instruments.length<=6?91:78,module:'instrumentEvolutionView',reason:'Uses a focused core palette with lead, rhythm, harmony, texture and low-end roles.'},
  {key:'structure',title:'Song Architecture',value:parsed.structure.join(' → '),confidence:89,module:'arrangementDesignerView',reason:'Creates clear development, contrast and a defined final payoff.'},
  {key:'emotion',title:'Emotion Flow',value:parsed.emotion,confidence:87,module:'lyricsView',reason:'Turns the song into a progression rather than one static mood.'},
  {key:'production',title:'Production Direction',value:parsed.production,confidence:88,module:'productionView',reason:'Translates the emotional and energy arc into mix and dynamics behavior.'}
 ];
 const worldStyle=parsed.detectedWorld?`${parsed.detectedWorld.name}, ${parsed.detectedWorld.scales.slice(0,2).join(' and ')}, ${parsed.detectedWorld.rhythms.slice(0,2).join(', ')}`:'';
 const style=uniq([
  decisions[0].value,`${parsed.bpm} BPM`,parsed.vocals.join(', '),parsed.instruments.join(', '),
  parsed.emotion,parsed.production,worldStyle,`${theory.key}`,theory.scale,theory.meter,theory.groove,
  'Section-Specific Arrangement','Clear Voice Separation'
 ]).join(', ');
 const lyricsBlueprint=architecture.map((s,i)=>{
  const role=sectionInstrumentRole(s.name,parsed);
  const transition=i===0?'Controlled opening':s.energy>architecture[i-1].energy+15?'Building intensity into the next peak':s.energy<architecture[i-1].energy-15?'Dynamic drop and contrast':'Smooth continuation';
  const directives=[s.vocal,role,`Energy ${s.energy}%`,`Density ${s.density}%`,transition,parsed.production];
  return globalThis.NSWMetaTagStackEngine
   ?globalThis.NSWMetaTagStackEngine.createStack(s.name,directives,{sort:true}).line
   :`[${[s.name,...directives].join(' | ')}]`;
 }).join('\n\n');

 const reasoning=[
  ...(parsed.detectedWorld?[`The ${parsed.detectedWorld.name} World Music profile contributed authentic scales, rhythms and instrument choices.`]:[]),
  `The primary genre is ${parsed.primaryGenre.label} because it carries the strongest matching signals.`,
  `${parsed.bpm} BPM was selected as a practical starting point for ${parsed.primaryGenre.label}.`,
  `${theory.key} and ${theory.scale} support the chosen emotional direction while remaining simple enough for prompt use.`,
  `${parsed.instruments.slice(0,5).join(', ')} form the core palette; later instruments act as supporting color.`,
  `${parsed.vocals.join(', ')} provide the requested narrative voice roles.`,
  `${parsed.structure.length} sections create a complete development within the target duration of ${parsed.duration}.`,
  learn.note
 ];
 const modulePayloads={
  style:{style},lyrics:{blueprint:lyricsBlueprint},genre:{genre:parsed.primaryGenre.key,label:parsed.primaryGenre.label},
  instrument:{instruments:parsed.instruments,sections:architecture.map(x=>({name:x.name,instruments:sectionInstrumentRole(x.name,parsed)}))},
  vocal:{cast:parsed.vocals,sections:architecture.map(x=>({name:x.name,vocal:x.vocal,energy:x.energy}))},
  theory:{...theory,bpm:parsed.bpm},arrangement:{sections:architecture},
  production:{direction:parsed.production},worldMusic:parsed.detectedWorld?{world:parsed.detectedWorld.name,scales:parsed.detectedWorld.scales,rhythms:parsed.detectedWorld.rhythms}:null,predictor:{ready:true}
 };
 return{
  id:'song_director_'+Date.now()+'_'+Math.random().toString(36).slice(2,7),createdAt:Date.now(),
  brief,options,parsed,architecture,theory,decisions,style,lyricsBlueprint,conflicts,reasoning,modulePayloads,
  coherence,grade:coherence>=90?'A+':coherence>=84?'A':coherence>=76?'B+':coherence>=68?'B':coherence>=58?'C':'D',
  learning:learn,signals:parsed.signals
 };
}

window.NSWSongDirectorCore={parseBrief,buildDirectorResult,detectLanguage,clamp,uniq};
})();

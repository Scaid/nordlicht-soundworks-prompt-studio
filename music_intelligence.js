/* Nordlicht Soundworks Music Intelligence Engine – Phase 1 */
const MUSIC_INTELLIGENCE_VERSION = "1.9.0-phase1";

const MUSIC_PROFILES = {
  "Pop": { bpm:[95,135], instruments:["Grand Piano","Electric Guitar","Analog Synthesizer","Hybrid Electronic Drums","Deep Sub Bass"], voices:["Female Lead Voice","Male Lead Voice"], partners:["Electronic / EDM","R&B","Rock","Soul / Funk / Disco","Anime / Japanese"], songTypes:["Radio Hit","Summer Hit","Pop Anthem","Idol Pop Single","Dancefloor Anthem"] },
  "Rock": { bpm:[95,170], instruments:["Electric Guitar","Distorted Rhythm Guitar","Electric Bass Guitar","Hybrid Electronic Drums","Grand Piano"], voices:["Male Lead Voice","Female Lead Voice"], partners:["Metal","Pop","Blues","Folk / Acoustic","Anime / Japanese"], songTypes:["Rock Anthem","Arena Anthem","Power Ballad","Anime Opening","Guitar Showcase"] },
  "Metal": { bpm:[120,200], instruments:["Distorted Rhythm Guitar","Electric Bass Guitar","Hybrid Electronic Drums","Timpani","Full Cinematic Orchestra"], voices:["Male Lead Voice","Female Lead Voice"], partners:["Rock","Cinematic / Soundtrack","Classical / Orchestral","Folk / Acoustic","Electronic / EDM"], songTypes:["Metal Anthem","Battle Theme","Final Boss Theme","War Chant","Guitar Showcase"] },
  "Electronic / EDM": { bpm:[118,160], instruments:["Analog Synthesizer","Supersaw Synth","Deep Sub Bass","Hybrid Electronic Drums","Festival Hardstyle Kick"], voices:["Female Lead Voice","Male Lead Voice"], partners:["Pop","Hip-Hop / Rap","R&B","Ambient / Chill","Experimental"], songTypes:["Festival Anthem","Club Mix","Extended Mix","Dancefloor Anthem","Hardstyle Anthem"] },
  "Hip-Hop / Rap": { bpm:[70,155], instruments:["808 Bass","Deep Sub Bass","Hybrid Electronic Drums","Grand Piano","Analog Synthesizer"], voices:["Male Lead Voice","Female Lead Voice"], partners:["R&B","Electronic / EDM","Soul / Funk / Disco","Rock","Experimental"], songTypes:["Rap Single","Cypher","Street Anthem","Club Track","Story Song"] },
  "R&B": { bpm:[65,120], instruments:["Rhodes Electric Piano","Grand Piano","Deep Sub Bass","Hybrid Electronic Drums","Electric Guitar"], voices:["Female Lead Voice","Male Lead Voice"], partners:["Soul / Funk / Disco","Pop","Hip-Hop / Rap","Jazz","Electronic / EDM"], songTypes:["Slow Jam","R&B Ballad","Duet","Radio Hit","Love Theme"] },
  "Soul / Funk / Disco": { bpm:[85,130], instruments:["Electric Bass Guitar","Electric Guitar","Rhodes Electric Piano","Balkan Brass Ensemble","Hybrid Electronic Drums"], voices:["Female Lead Voice","Male Lead Voice"], partners:["R&B","Jazz","Pop","Hip-Hop / Rap","Gospel / Spiritual"], songTypes:["Dancefloor Anthem","Soul Ballad","Funk Jam","Disco Single","Live Band Performance"] },
  "Ballad / Emotional": { bpm:[55,100], instruments:["Grand Piano","Violin Section","Cello Section","Acoustic Guitar","French Horns"], voices:["Female Lead Voice","Male Lead Voice"], partners:["Pop","Rock","Classical / Orchestral","Cinematic / Soundtrack","R&B"], songTypes:["Power Ballad","Piano Ballad","Emotional Ending","Love Theme","Story Song"] },
  "Jazz": { bpm:[70,180], instruments:["Grand Piano","Upright Bass","Trumpets","Trumpets","Hybrid Electronic Drums"], voices:["Female Lead Voice","Male Lead Voice"], partners:["Blues","Soul / Funk / Disco","R&B","Latin","Experimental"], songTypes:["Jazz Standard","Lounge Track","Instrumental Showcase","Live Band Performance","Theme"] },
  "Blues": { bpm:[60,130], instruments:["Electric Guitar","Acoustic Guitar","Hammond Organ","Upright Bass","Hybrid Electronic Drums"], voices:["Male Lead Voice","Female Lead Voice"], partners:["Rock","Jazz","Country / Americana","Soul / Funk / Disco","Folk / Acoustic"], songTypes:["Blues Standard","Story Song","Guitar Showcase","Road Song","Live Band Performance"] },
  "Country / Americana": { bpm:[70,145], instruments:["Acoustic Guitar","Celtic Fiddle","Celtic Fiddle","Hardanger Fiddle","Guitarrón"], voices:["Male Lead Voice","Female Lead Voice"], partners:["Folk / Acoustic","Blues","Rock","Pop","Gospel / Spiritual"], songTypes:["Country Ballad","Road Song","Story Song","Acoustic Version","Team Anthem"] },
  "Folk / Acoustic": { bpm:[65,145], instruments:["Acoustic Guitar","Celtic Fiddle","Bodhrán","Nyckelharpa","Tagelharpa"], voices:["Male Lead Voice","Female Lead Voice"], partners:["World Music","Country / Americana","Rock","Fantasy / Thematic","Metal"], songTypes:["Folk Ballad","Story Song","Viking Anthem","Ritual Song","Acoustic Version"] },
  "Classical / Orchestral": { bpm:[50,150], instruments:["Full Cinematic Orchestra","Violin Section","Cello Section","French Horns","Timpani"], voices:["Female Lead Voice","Male Lead Voice"], partners:["Cinematic / Soundtrack","Ballad / Emotional","Fantasy / Thematic","Metal","Ambient / Chill"], songTypes:["Overture","Symphonic Movement","Concerto","Emotional Finale","Main Theme"] },
  "Cinematic / Soundtrack": { bpm:[55,165], instruments:["Full Cinematic Orchestra","French Horns","Timpani","Violin Section","Deep Sub Bass"], voices:["Female Lead Voice","Male Lead Voice"], partners:["Classical / Orchestral","Fantasy / Thematic","Metal","Electronic / EDM","Ambient / Chill"], songTypes:["Film Score Cue","Trailer","Boss Fight","Cinematic Opening","Cinematic Finale"] },
  "Anime / Japanese": { bpm:[110,185], instruments:["Electric Guitar","Grand Piano","Violin Section","Hybrid Electronic Drums","Taiko Drums"], voices:["Female Lead Voice","Male Lead Voice"], partners:["Pop","Rock","Cinematic / Soundtrack","Electronic / EDM","Classical / Orchestral"], songTypes:["Anime Opening","Anime Ending","Anime Insert Song","Character Theme","Final Battle Theme"] },
  "World Music": { bpm:[70,150], instruments:["Djembe","Oud","Koto","Sitar","Bodhrán"], voices:["Female Lead Voice","Male Lead Voice"], partners:["Folk / Acoustic","Latin","Fantasy / Thematic","Ambient / Chill","Classical / Orchestral"], songTypes:["Ritual Song","World Fusion","Story Song","Ceremonial Theme","Instrumental Showcase"] },
  "Latin": { bpm:[85,150], instruments:["Spanish Classical Guitar","Congas","Trumpets","Charango","Hybrid Electronic Drums"], voices:["Female Lead Voice","Male Lead Voice"], partners:["Jazz","Pop","World Music","Soul / Funk / Disco","Electronic / EDM"], songTypes:["Dancefloor Anthem","Summer Hit","Latin Pop Single","Festival Anthem","Love Theme"] },
  "Reggae / Caribbean": { bpm:[70,115], instruments:["Electric Guitar","Electric Bass Guitar","Steel Pan","Hybrid Electronic Drums","Hammond Organ"], voices:["Male Lead Voice","Female Lead Voice"], partners:["World Music","Pop","Soul / Funk / Disco","Hip-Hop / Rap","Latin"], songTypes:["Summer Hit","Island Anthem","Dub Mix","Feel-Good Song","Festival Anthem"] },
  "Gospel / Spiritual": { bpm:[60,135], instruments:["Grand Piano","Hammond Organ","SATB Choir","Hybrid Electronic Drums","Balkan Brass Ensemble"], voices:["Female Lead Voice","Male Lead Voice"], partners:["Soul / Funk / Disco","R&B","Country / Americana","Classical / Orchestral","Pop"], songTypes:["Gospel Anthem","Choir Feature","Spiritual Ballad","Celebration Song","Live Worship"] },
  "Ambient / Chill": { bpm:[40,105], instruments:["Atmospheric Synth Pad","Grand Piano","Cello Section","Nordic Frame Drums","Atmospheric Synth Pad"], voices:["Female Lead Voice","Male Lead Voice"], partners:["Electronic / EDM","Cinematic / Soundtrack","Classical / Orchestral","Experimental","World Music"], songTypes:["Ambient Soundscape","Meditation Track","Sleep Music","Background Music","Emotional Underscore"] },
  "Experimental": { bpm:[40,220], instruments:["FM Synthesizer","Upright Piano","Industrial Percussion","Atmospheric Synth Pad","Arpeggiated Synth"], voices:["Female Lead Voice","Male Lead Voice"], partners:["Electronic / EDM","Ambient / Chill","Jazz","Cinematic / Soundtrack","World Music"], songTypes:["Experimental Piece","Sound Collage","Avant-Garde Track","Concept Piece","Interlude"] },
  "Fantasy / Thematic": { bpm:[55,160], instruments:["Full Cinematic Orchestra","Tagelharpa","Irish Harp","SATB Choir","Timpani"], voices:["Female Lead Voice","Male Lead Voice"], partners:["Cinematic / Soundtrack","Classical / Orchestral","Folk / Acoustic","World Music","Metal"], songTypes:["Hero Theme","Villain Theme","Boss Fight","Ritual Song","Epic Ballad"] }
};

const SUBGENRE_HINTS = [
 {match:/viking|pagan|nordic/i, instruments:["Tagelharpa","Nyckelharpa","Jouhikko","Nordic Frame Drums","Viking War Horns"], bpm:[85,145], partners:["Folk / Acoustic","Metal","Fantasy / Thematic"]},
 {match:/anime|j-pop|j-rock/i, instruments:["Electric Guitar","Grand Piano","Violin Section","Taiko Drums","Hybrid Electronic Drums"], bpm:[120,180], partners:["Anime / Japanese","Pop","Rock"]},
 {match:/hardstyle|hard dance|hard bass/i, instruments:["Festival Hardstyle Kick","Supersaw Synth","Deep Sub Bass","Hybrid Electronic Drums","Analog Synthesizer"], bpm:[145,160], partners:["Electronic / EDM","Metal"]},
 {match:/synthwave|cyber|industrial electronic/i, instruments:["Analog Synthesizer","FM Synthesizer","Distorted Synth Bass","Hybrid Electronic Drums","Industrial Percussion"], bpm:[90,135], partners:["Electronic / EDM","Cinematic / Soundtrack"]},
 {match:/orchestral|symphonic|cinematic|trailer/i, instruments:["Full Cinematic Orchestra","Violin Section","Cello Section","French Horns","Timpani"], bpm:[60,150], partners:["Cinematic / Soundtrack","Classical / Orchestral"]},
 {match:/lo-fi|chill|ambient|sleep|meditation/i, instruments:["Atmospheric Synth Pad","Grand Piano","Nordic Frame Drums","Atmospheric Synth Pad","Cello Section"], bpm:[55,95], partners:["Ambient / Chill","Electronic / EDM"]},
 {match:/trap|drill|phonk/i, instruments:["808 Bass","Deep Sub Bass","Hybrid Electronic Drums","Cowbell","Analog Synthesizer"], bpm:[70,155], partners:["Hip-Hop / Rap","Electronic / EDM"]}
];

function musicProfile(genre, subgenre="") {
  const base = MUSIC_PROFILES[genre] || MUSIC_PROFILES["Pop"];
  const hint = SUBGENRE_HINTS.find(x=>x.match.test(subgenre||""));
  return {
    ...base,
    bpm: hint?.bpm || base.bpm,
    instruments: [...new Set([...(hint?.instruments||[]), ...base.instruments])],
    partners: [...new Set([...(hint?.partners||[]), ...base.partners])]
  };
}

function genrePairCompatibility(primary, secondary) {
  if(!primary || primary==="None" || !secondary || secondary==="None") return {score:82, reason:"Single-genre focus"};
  if(primary===secondary) return {score:68, reason:"Second genre duplicates the main genre"};
  const a=MUSIC_PROFILES[primary], b=MUSIC_PROFILES[secondary];
  if(!a||!b) return {score:72, reason:"Experimental genre blend"};
  if(a.partners.includes(secondary) || b.partners.includes(primary)) return {score:94, reason:"Genres are natural partners"};
  const bpmOverlap=Math.max(0,Math.min(a.bpm[1],b.bpm[1])-Math.max(a.bpm[0],b.bpm[0]));
  return bpmOverlap>=25?{score:78,reason:"Genres share a usable tempo range"}:{score:56,reason:"Unusual genre blend"};
}

function recommendedInstrumentsForCurrentStyle(limit=10) {
  const primary=document.getElementById("genreFamily")?.value||"Pop";
  const secondary=document.getElementById("secondGenre")?.value||"None";
  const sub=document.getElementById("subgenre")?.value||"";
  const p=musicProfile(primary,sub);
  const secondaryList=secondary!=="None"?musicProfile(secondary).instruments:[];
  const selected=(typeof appState!=="undefined"?appState.instruments:[]);
  const candidates=[...p.instruments,...secondaryList];
  const existing=candidates.filter((name,index)=>candidates.indexOf(name)===index && typeof INSTRUMENT_DB!=="undefined" && INSTRUMENT_DB.some(x=>x.name===name));
  return existing.filter(x=>!selected.includes(x)).slice(0,limit);
}

function genreSuggestionsForCurrentStyle() {
  const primary=document.getElementById("genreFamily")?.value||"Pop";
  const sub=document.getElementById("subgenre")?.value||"";
  const p=musicProfile(primary,sub);
  return {partners:p.partners.slice(0,6), bpm:p.bpm, songTypes:(p.songTypes||[]).filter(x=>typeof SONG_TYPES==="undefined"||SONG_TYPES.includes(x)).slice(0,6), instruments:recommendedInstrumentsForCurrentStyle(6)};
}

function instrumentFitScore(name, genre, subgenre="") {
  const p=musicProfile(genre,subgenre);
  if(p.instruments.includes(name)) return 100;
  const item=typeof INSTRUMENT_DB!=="undefined"?INSTRUMENT_DB.find(x=>x.name===name):null;
  if(!item) return 55;
  const family=(item.family||"").toLowerCase();
  const genreText=(genre+" "+subgenre).toLowerCase();
  if(/classical|cinematic|fantasy/.test(genreText)&&/string|brass|orchestra|percussion/.test(family))return 86;
  if(/rock|metal/.test(genreText)&&/guitar|bass|drum|percussion/.test((name+" "+family).toLowerCase()))return 86;
  if(/electronic|edm|hip-hop/.test(genreText)&&/synth|electronic|bass|drum/.test((name+" "+family).toLowerCase()))return 84;
  if(/folk|world|country/.test(genreText)&&/folk|traditional|acoustic|string|percussion/.test((name+" "+family).toLowerCase()))return 82;
  return 64;
}

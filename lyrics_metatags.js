(() => {
  'use strict';

  const categories = {
  "Sections": [
    "[Intro]",
    "[Opening]",
    "[Cold Open]",
    "[Verse]",
    "[Verse 1]",
    "[Verse 2]",
    "[Verse 3]",
    "[Pre-Chorus]",
    "[Chorus]",
    "[Refrain]",
    "[Hook]",
    "[Post-Chorus]",
    "[Bridge]",
    "[Middle Eight]",
    "[Interlude]",
    "[Break]",
    "[Build]",
    "[Build-Up]",
    "[Pre-Drop]",
    "[Drop]",
    "[Second Drop]",
    "[Final Drop]",
    "[Breakdown]",
    "[Heavy Breakdown]",
    "[Half-Time Breakdown]",
    "[Instrumental Break]",
    "[Drum Break]",
    "[Bass Break]",
    "[Dance Break]",
    "[Solo]",
    "[Climax]",
    "[Finale]",
    "[Final Chorus]",
    "[Coda]",
    "[Outro]",
    "[End]",
    "[Fade Out]",
    "[False Ending]",
    "[Key Change]",
    "[Movement I]",
    "[Movement II]",
    "[Movement III]"
  ],
  "Vocals": [
    "[Female Vocal]",
    "[Male Vocal]",
    "[Low Male Vocal]",
    "[Deep Male Vocal]",
    "[Baritone Vocal]",
    "[Bass Vocal]",
    "[Tenor Vocal]",
    "[High Male Vocal]",
    "[Low Female Vocal]",
    "[Alto Vocal]",
    "[Mezzo-Soprano Vocal]",
    "[Soprano Vocal]",
    "[High Female Vocal]",
    "[Head Voice]",
    "[Chest Voice]",
    "[Mixed Voice]",
    "[Falsetto]",
    "[Warm Vocal]",
    "[Bright Vocal]",
    "[Dark Vocal]",
    "[Airy Vocal]",
    "[Breathy Vocal]",
    "[Clear Vocal]",
    "[Raw Vocal]",
    "[Raspy Vocal]",
    "[Smoky Vocal]",
    "[Gravelly Vocal]",
    "[Fragile Vocal]",
    "[Broken Vocal]",
    "[Trembling Vocal]",
    "[Youthful Vocal]",
    "[Mature Vocal]",
    "[Angelic Vocal]",
    "[Ethereal Vocal]",
    "[Haunting Vocal]",
    "[Whispered Vocal]",
    "[Soft Spoken Vocal]",
    "[Deep Spoken Vocal]",
    "[Spoken Word]",
    "[Narrated Vocal]",
    "[Conversational Vocal]",
    "[Intimate Vocal]",
    "[Close-Mic Vocal]",
    "[Restrained Vocal]",
    "[Emotional Vocal]",
    "[Powerful Vocal]",
    "[Soaring Vocal]",
    "[Belting Vocal]",
    "[Crying Vocal]",
    "[Pleading Vocal]",
    "[Angry Vocal]",
    "[Defiant Vocal]",
    "[Operatic Vocal]",
    "[Melismatic Vocal]",
    "[Rap Vocal]",
    "[Fast Rap]",
    "[Chanted Vocal]",
    "[Growled Vocal]",
    "[Screamed Vocal]",
    "[Harsh Vocal]",
    "[Clean Vocal]",
    "[Male and Female Duet]",
    "[Call and Response]",
    "[Alternating Vocals]",
    "[Layered Vocals]",
    "[Overlapping Vocals]",
    "[Double-Tracked Vocals]",
    "[Harmony Vocals]",
    "[Background Vocals]",
    "[Unison Vocals]",
    "[Vocal Counterpoint]",
    "[Clear Voice Separation]",
    "[Strict Singer Separation]",
    "[Dialogue Duet]",
    "[Alternating Verses]",
    "[Shared Chorus Only]"
  ],
  "Choir": [
    "[Children's Choir]",
    "[Female Choir]",
    "[Male Choir]",
    "[Mixed Choir]",
    "[Gregorian Choir]",
    "[Monastic Choir]",
    "[Gospel Choir]",
    "[Operatic Choir]",
    "[Chamber Choir]",
    "[Massive Choir]",
    "[Epic Choir]",
    "[Dark Choir]",
    "[Ethereal Choir]",
    "[Whispered Choir]",
    "[Distant Choir]",
    "[Wordless Choir]",
    "[Latin Choir]",
    "[Sacred Choir]",
    "[Choir: soft, distant]",
    "[Choir: wide, cinematic]",
    "[Choir: sacred, reverent]",
    "[Choir: massive, triumphant]",
    "[Choral Drone]",
    "[Choir Swell]",
    "[Choir Stabs]",
    "[Antiphonal Choir]",
    "[Call and Response Choir]",
    "[Layered Choir]",
    "[Choir Crescendo]",
    "[Final Chorus Choir]",
    "[Gang Shouts]",
    "[Crowd Shouts]",
    "[Hey Chants]",
    "[Oh Chants]"
  ],
  "Style": [
    "[Style: warm, intimate, storytelling]",
    "[Style: restrained, mysterious]",
    "[Style: dark, threatening]",
    "[Style: emotional, vulnerable]",
    "[Style: heroic, determined]",
    "[Style: sacred, mythic]",
    "[Style: energetic, uplifting]",
    "[Style: cinematic, dramatic]",
    "[Style: calm, gentle, relaxed]",
    "[Style: aggressive, relentless]",
    "[Style: dreamy, ethereal]",
    "[Style: triumphant, anthemic]",
    "[Style: melancholic, reflective]",
    "[Style: nostalgic, bittersweet]",
    "[Style: tense, suspenseful]",
    "[Style: playful, quirky]",
    "[Style: romantic, tender]",
    "[Style: hopeful, inspiring]",
    "[Style: ominous, foreboding]",
    "[Style: majestic, regal]",
    "[Style: ritualistic, primal]",
    "[Style: futuristic, neon-lit]",
    "[Style: retro, vintage]",
    "[Style: raw, underground]",
    "[Style: polished, mainstream]",
    "[Style: minimal, spacious]",
    "[Style: dense, maximalist]",
    "[Style: sensual, smooth]",
    "[Style: rebellious, defiant]",
    "[Style: chaotic, unpredictable]",
    "[Style: serene, meditative]",
    "[Style: eerie, uncanny]",
    "[Style: adventurous, expansive]",
    "[Style: celebratory, festive]",
    "[Style: solemn, mournful]",
    "[Style: fierce, battle-ready]",
    "[Style: magical, enchanted]",
    "[Style: spiritual, transcendent]",
    "[Style: gritty, industrial]",
    "[Style: elegant, sophisticated]",
    "[Style: cute, bubbly]",
    "[Style: cool, detached]",
    "[Style: desperate, urgent]",
    "[Style: confident, swaggering]",
    "[Style: lonely, desolate]",
    "[Style: mysterious, seductive]",
    "[Style: comedic, exaggerated]",
    "[Style: atmospheric, immersive]"
  ],
  "Dynamics": [
    "[Gradual Build]",
    "[Slow Crescendo]",
    "[Rapid Crescendo]",
    "[Explosive Crescendo]",
    "[Building Intensity]",
    "[Rising Intensity]",
    "[Peak Intensity]",
    "[Emotional Lift]",
    "[Controlled Contrast]",
    "[Dynamic Contrast]",
    "[Controlled Dynamics]",
    "[Restrained Energy]",
    "[Crescendo]",
    "[Diminuendo]",
    "[Sudden Silence]",
    "[Explosive Transition]",
    "[Constant High Energy]",
    "[Massive Finale]",
    "[Massive Climax]",
    "[Quiet Passage]",
    "[Soft and Intimate]",
    "[Loud and Powerful]",
    "[Fade In]",
    "[Staccato]",
    "[Legato]",
    "[Tremolo]",
    "[Vibrato]",
    "[Rubato]",
    "[Accented Rhythm]",
    "[Syncopated Rhythm]",
    "[Half-Time Feel]",
    "[Double-Time Feel]",
    "[Swelling Dynamics]",
    "[Sudden Dynamic Drop]",
    "[Breathing Space]",
    "[Tension and Release]",
    "[Final Impact]"
  ],
  "Music": [
    "[Music: gentle piano melody]",
    "[Music: soft strings]",
    "[Music: distorted guitars]",
    "[Music: heavy drums]",
    "[Music: deep sub bass]",
    "[Music: cinematic orchestra]",
    "[Music: atmospheric synths]",
    "[Music: Tagelharpa and frame drums]",
    "[Music: Taiko and orchestral brass]",
    "[Music: acoustic guitar and warm piano]",
    "[Music: pulsing arpeggiator]",
    "[Music: sparse instrumentation]",
    "[Sparse Arrangement]",
    "[Minimal Arrangement]",
    "[Full Arrangement]",
    "[Dense Arrangement]",
    "[Layered Arrangement]",
    "[Orchestral Arrangement]",
    "[Acoustic Arrangement]",
    "[Electronic Arrangement]",
    "[Hybrid Arrangement]",
    "[Gradual Instrument Entry]",
    "[Instruments Drop Out]",
    "[Drums Enter]",
    "[Bass Enters]",
    "[Strings Enter]",
    "[Choir Enters]",
    "[Full Band Enters]",
    "[Piano Only]",
    "[Voice and Piano]",
    "[Acoustic Guitar Only]",
    "[Drums and Bass Only]",
    "[No Drums]",
    "[No Bass]",
    "[Rhythm Section Only]",
    "[Lead Instrument]",
    "[Instrumental Countermelody]",
    "[Call and Response Instruments]",
    "[Unison Melody]",
    "[Polyphonic Texture]",
    "[Monophonic Texture]",
    "[Homophonic Texture]",
    "[Arpeggiated Texture]",
    "[Drone Texture]",
    "[Ostinato Pattern]",
    "[Percussive Texture]",
    "[Wall of Sound]",
    "[Ambient Soundscape]",
    "[Rhythmic Pulse]",
    "[Melodic Layers]",
    "[Orchestral Swells]",
    "[Brass Stabs]",
    "[String Ostinato]",
    "[Piano Arpeggios]",
    "[Guitar Riff]",
    "[Bass Riff]",
    "[Synth Bass Pulse]",
    "[Drum and Bass Groove]",
    "[Acoustic Ensemble]",
    "[Electronic-Acoustic Fusion]"
  ],
  "Instrumental": [
    "[Instrumental]",
    "[Piano Solo]",
    "[Electric Guitar Solo]",
    "[Acoustic Guitar Solo]",
    "[Violin Solo]",
    "[Cello Solo]",
    "[Saxophone Solo]",
    "[Trumpet Solo]",
    "[Flute Solo]",
    "[Synth Solo]",
    "[Drum Solo]",
    "[Bass Solo]",
    "[Orchestral Interlude]",
    "[Ambient Interlude]",
    "[Instrumental Verse]",
    "[Instrumental Chorus]",
    "[Extended Instrumental]",
    "[Instrumental Build]",
    "[Instrumental Drop]",
    "[Instrumental Finale]",
    "[Improvised Solo]",
    "[Melodic Solo]",
    "[Technical Solo]",
    "[Emotional Solo]",
    "[Call and Response Solo]",
    "[Instrumental: Tagelharpa]",
    "[Instrumental: Nyckelharpa]",
    "[Instrumental: Shamisen]",
    "[Instrumental: Duduk]",
    "[Instrumental: Koto]",
    "[Instrumental: Taiko Drums]",
    "[Instrumental: Frame Drum]",
    "[Instrumental: Bagpipes]",
    "[Instrumental: Harp]",
    "[Instrumental: Choir Pads]",
    "[Instrumental: Synth Lead]",
    "[Instrumental: Drum Break]",
    "[Instrumental: Orchestral Brass]",
    "[Instrumental: Ethnic Flute]",
    "[Instrumental: Hammered Dulcimer]"
  ],
  "Production": [
    "[Studio Production]",
    "[Live Production]",
    "[Raw Production]",
    "[Polished Production]",
    "[Cinematic Production]",
    "[Lo-Fi Production]",
    "[Analog Production]",
    "[Digital Production]",
    "[Vintage Production]",
    "[Modern Production]",
    "[Wide Stereo Mix]",
    "[Narrow Stereo Mix]",
    "[Mono Mix]",
    "[Dynamic Mix]",
    "[Dense Mix]",
    "[Clean Mix]",
    "[Warm Mix]",
    "[Dark Mix]",
    "[Bright Mix]",
    "[Heavy Low End]",
    "[Controlled Low End]",
    "[Punchy Drums]",
    "[Dry Drums]",
    "[Roomy Drums]",
    "[Wide Guitars]",
    "[Centered Vocal]",
    "[Forward Vocal]",
    "[Distant Vocal]",
    "[Layered Vocal Production]",
    "[Heavy Reverb]",
    "[Light Reverb]",
    "[Plate Reverb]",
    "[Hall Reverb]",
    "[Short Delay]",
    "[Ping-Pong Delay]",
    "[Saturated Tape]",
    "[Analog Saturation]",
    "[Distorted Mix]",
    "[Sidechain Compression]",
    "[Compressed Drums]",
    "[Large Dynamic Range]",
    "[Radio-Ready Master]",
    "[Clean Master]",
    "[Loud Master]",
    "[Soft Master]",
    "[Vinyl Texture]",
    "[Tape Hiss]",
    "[Bitcrushed Texture]",
    "[Glitch Effects]",
    "[Atmospheric Sound Design]",
    "[AAA Game Soundtrack Production]",
    "[Polished Modern Pop]",
    "[Raw Live Band Energy]",
    "[Huge Cinematic Reverb]",
    "[Punchy Drums, Clear Vocals]",
    "[Dark Atmospheric Mix]",
    "[Dynamic Mix, Controlled Low End]",
    "[Spatial Audio Feel]",
    "[Front-and-Center Vocal]",
    "[Deep Stereo Field]",
    "[Crisp Transients]",
    "[Soft Transients]",
    "[Glue Compression]",
    "[Parallel Compression]",
    "[Multiband Compression]",
    "[Airy High End]",
    "[Rolled-Off High End]",
    "[Subtle Saturation]",
    "[Aggressive Saturation]"
  ],
  "Adlibs": [
    "[Ad-libs: subtle, sparse]",
    "[Ad-libs: emotional breaths]",
    "[Ad-libs: energetic shouts]",
    "[Ad-libs: whispered echoes]",
    "[Ad-libs: final chorus only]",
    "[Soft Ad-libs]",
    "[Background Ad-libs]",
    "[Callout Ad-libs]",
    "[Whispered Ad-libs]",
    "[Emotional Ad-libs]",
    "[Melodic Ad-libs]",
    "[Rap Ad-libs]",
    "[Choir Ad-libs]",
    "[Wordless Vocals]",
    "[Vocal Runs]",
    "[Vocal Improvisation]"
  ],
  "Transitions": [
    "[Transition: rising tension]",
    "[Transition: drum fill into chorus]",
    "[Transition: reverse swell]",
    "[Transition: orchestral impact]",
    "[Transition: bass drop]",
    "[Transition: silence before impact]",
    "[Transition: seamless crossfade]",
    "[Seamless Transition]",
    "[Abrupt Transition]",
    "[Hard Cut]",
    "[Smash Cut]",
    "[Drum Fill Transition]",
    "[Reverse Cymbal Transition]",
    "[Riser]",
    "[Downlifter]",
    "[Impact Hit]",
    "[Whoosh Transition]",
    "[Filtered Transition]",
    "[Tempo Transition]",
    "[Key Change Transition]",
    "[Silence Before Drop]",
    "[Pause Before Chorus]",
    "[Build into Chorus]",
    "[Build into Drop]",
    "[Break into Verse]",
    "[Fade into Outro]",
    "[Crossfade]",
    "[Beat Switch]",
    "[Genre Switch]",
    "[Mood Shift]",
    "[Vocal Transition]",
    "[Instrumental Transition]",
    "[Tape Stop]",
    "[Record Scratch Transition]",
    "[Reverb Tail Transition]",
    "[Pitch-Rise Transition]"
  ],
  "RhythmTempo": [
    "[Slow Tempo]",
    "[Moderate Tempo]",
    "[Fast Tempo]",
    "[Adagio]",
    "[Andante]",
    "[Moderato]",
    "[Allegro]",
    "[Presto]",
    "[Steady Tempo]",
    "[Flexible Tempo]",
    "[Straight Rhythm]",
    "[Polyrhythmic]",
    "[Swing Feel]",
    "[Shuffle Feel]",
    "[Four-on-the-Floor]",
    "[Half-Time]",
    "[Double-Time]",
    "[Triplet Feel]",
    "[Driving Rhythm]",
    "[Marching Rhythm]",
    "[Rolling Rhythm]",
    "[Broken Beat]",
    "[Heavy Groove]",
    "[Laid-Back Groove]",
    "[Offbeat Rhythm]",
    "[Rhythmic Accents]",
    "[Tempo Increase]",
    "[Tempo Decrease]",
    "[Dotted Rhythm]",
    "[Clave Rhythm]",
    "[Motorik Beat]",
    "[Amen Break]",
    "[Trap Hi-Hats]",
    "[Blast Beats]",
    "[Galloping Rhythm]",
    "[Waltz Feel]",
    "[6/8 Feel]",
    "[Odd Meter]"
  ],
  "HarmonyMelody": [
    "[Major Key]",
    "[Minor Key]",
    "[Modal Harmony]",
    "[Dissonant Harmony]",
    "[Consonant Harmony]",
    "[Chromatic Harmony]",
    "[Rich Harmony]",
    "[Simple Harmony]",
    "[Complex Harmony]",
    "[Open Chords]",
    "[Suspended Chords]",
    "[Power Chords]",
    "[Arpeggiated Chords]",
    "[Ascending Melody]",
    "[Descending Melody]",
    "[Repeated Motif]",
    "[Leitmotif]",
    "[Countermelody]",
    "[Call and Response Melody]",
    "[Melodic Sequence]",
    "[Harmonic Resolution]",
    "[Unresolved Tension]",
    "[Modulation]",
    "[Counterpoint]",
    "[Pedal Tone]",
    "[Drone Harmony]",
    "[Parallel Harmony]",
    "[Quartal Harmony]",
    "[Circle Progression]",
    "[Descending Bass Line]",
    "[Ascending Bass Line]",
    "[Chromatic Run]",
    "[Pentatonic Melody]",
    "[Modal Melody]"
  ],
  "SoundFX": [
    "[Applause]",
    "[Crowd Noise]",
    "[Heartbeat]",
    "[Thunder]",
    "[Rain]",
    "[Footsteps]",
    "[Telephone Effect]",
    "[Radio Static]",
    "[Vinyl Crackle]",
    "[Alarm]",
    "[Explosion]",
    "[Door Slam]",
    "[Silence]",
    "[Cassette Click]",
    "[Tape Rewind]",
    "[Record Needle Drop]",
    "[Distant Siren]",
    "[Clock Ticking]",
    "[Breathing]",
    "[Whispering Crowd]",
    "[Stadium Ambience]",
    "[Room Ambience]",
    "[Forest Ambience]",
    "[Ocean Ambience]",
    "[Fire Crackle]",
    "[Metal Impact]",
    "[Cinematic Boom]",
    "[Sub Drop]",
    "[Reverse Reverb]",
    "[Glitch Burst]",
    "[Static Burst]",
    "[Digital Noise]",
    "[Riser Effect]",
    "[Downlifter Effect]",
    "[Impact Effect]"
  ]
};
  const metadata = {
  "[Intro]": {
    "level": "core",
    "category": "Sections"
  },
  "[Opening]": {
    "level": "advanced",
    "category": "Sections"
  },
  "[Cold Open]": {
    "level": "advanced",
    "category": "Sections"
  },
  "[Verse]": {
    "level": "core",
    "category": "Sections"
  },
  "[Verse 1]": {
    "level": "core",
    "category": "Sections"
  },
  "[Verse 2]": {
    "level": "core",
    "category": "Sections"
  },
  "[Verse 3]": {
    "level": "core",
    "category": "Sections"
  },
  "[Pre-Chorus]": {
    "level": "core",
    "category": "Sections"
  },
  "[Chorus]": {
    "level": "core",
    "category": "Sections"
  },
  "[Refrain]": {
    "level": "advanced",
    "category": "Sections"
  },
  "[Hook]": {
    "level": "advanced",
    "category": "Sections"
  },
  "[Post-Chorus]": {
    "level": "core",
    "category": "Sections"
  },
  "[Bridge]": {
    "level": "core",
    "category": "Sections"
  },
  "[Middle Eight]": {
    "level": "advanced",
    "category": "Sections"
  },
  "[Interlude]": {
    "level": "advanced",
    "category": "Sections"
  },
  "[Break]": {
    "level": "advanced",
    "category": "Sections"
  },
  "[Build]": {
    "level": "advanced",
    "category": "Sections"
  },
  "[Build-Up]": {
    "level": "advanced",
    "category": "Sections"
  },
  "[Pre-Drop]": {
    "level": "advanced",
    "category": "Sections"
  },
  "[Drop]": {
    "level": "advanced",
    "category": "Sections"
  },
  "[Second Drop]": {
    "level": "advanced",
    "category": "Sections"
  },
  "[Final Drop]": {
    "level": "advanced",
    "category": "Sections"
  },
  "[Breakdown]": {
    "level": "advanced",
    "category": "Sections"
  },
  "[Heavy Breakdown]": {
    "level": "advanced",
    "category": "Sections"
  },
  "[Half-Time Breakdown]": {
    "level": "advanced",
    "category": "Sections"
  },
  "[Instrumental Break]": {
    "level": "core",
    "category": "Sections"
  },
  "[Drum Break]": {
    "level": "advanced",
    "category": "Sections"
  },
  "[Bass Break]": {
    "level": "advanced",
    "category": "Sections"
  },
  "[Dance Break]": {
    "level": "advanced",
    "category": "Sections"
  },
  "[Solo]": {
    "level": "advanced",
    "category": "Sections"
  },
  "[Climax]": {
    "level": "advanced",
    "category": "Sections"
  },
  "[Finale]": {
    "level": "advanced",
    "category": "Sections"
  },
  "[Final Chorus]": {
    "level": "core",
    "category": "Sections"
  },
  "[Coda]": {
    "level": "advanced",
    "category": "Sections"
  },
  "[Outro]": {
    "level": "core",
    "category": "Sections"
  },
  "[End]": {
    "level": "advanced",
    "category": "Sections"
  },
  "[Fade Out]": {
    "level": "core",
    "category": "Sections"
  },
  "[False Ending]": {
    "level": "experimental",
    "category": "Sections"
  },
  "[Key Change]": {
    "level": "advanced",
    "category": "Sections"
  },
  "[Movement I]": {
    "level": "advanced",
    "category": "Sections"
  },
  "[Movement II]": {
    "level": "advanced",
    "category": "Sections"
  },
  "[Movement III]": {
    "level": "advanced",
    "category": "Sections"
  },
  "[Female Vocal]": {
    "level": "core",
    "category": "Vocals"
  },
  "[Male Vocal]": {
    "level": "core",
    "category": "Vocals"
  },
  "[Low Male Vocal]": {
    "level": "core",
    "category": "Vocals"
  },
  "[Deep Male Vocal]": {
    "level": "core",
    "category": "Vocals"
  },
  "[Baritone Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Bass Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Tenor Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[High Male Vocal]": {
    "level": "core",
    "category": "Vocals"
  },
  "[Low Female Vocal]": {
    "level": "core",
    "category": "Vocals"
  },
  "[Alto Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Mezzo-Soprano Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Soprano Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[High Female Vocal]": {
    "level": "core",
    "category": "Vocals"
  },
  "[Head Voice]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Chest Voice]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Mixed Voice]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Falsetto]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Warm Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Bright Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Dark Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Airy Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Breathy Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Clear Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Raw Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Raspy Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Smoky Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Gravelly Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Fragile Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Broken Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Trembling Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Youthful Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Mature Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Angelic Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Ethereal Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Haunting Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Whispered Vocal]": {
    "level": "core",
    "category": "Vocals"
  },
  "[Soft Spoken Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Deep Spoken Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Spoken Word]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Narrated Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Conversational Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Intimate Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Close-Mic Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Restrained Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Emotional Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Powerful Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Soaring Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Belting Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Crying Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Pleading Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Angry Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Defiant Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Operatic Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Melismatic Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Rap Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Fast Rap]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Chanted Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Growled Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Screamed Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Harsh Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Clean Vocal]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Male and Female Duet]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Call and Response]": {
    "level": "core",
    "category": "Vocals"
  },
  "[Alternating Vocals]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Layered Vocals]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Overlapping Vocals]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Double-Tracked Vocals]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Harmony Vocals]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Background Vocals]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Unison Vocals]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Vocal Counterpoint]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Clear Voice Separation]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Strict Singer Separation]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Dialogue Duet]": {
    "level": "advanced",
    "category": "Vocals"
  },
  "[Alternating Verses]": {
    "level": "core",
    "category": "Vocals"
  },
  "[Shared Chorus Only]": {
    "level": "core",
    "category": "Vocals"
  },
  "[Children's Choir]": {
    "level": "core",
    "category": "Choir"
  },
  "[Female Choir]": {
    "level": "core",
    "category": "Choir"
  },
  "[Male Choir]": {
    "level": "core",
    "category": "Choir"
  },
  "[Mixed Choir]": {
    "level": "core",
    "category": "Choir"
  },
  "[Gregorian Choir]": {
    "level": "core",
    "category": "Choir"
  },
  "[Monastic Choir]": {
    "level": "core",
    "category": "Choir"
  },
  "[Gospel Choir]": {
    "level": "core",
    "category": "Choir"
  },
  "[Operatic Choir]": {
    "level": "core",
    "category": "Choir"
  },
  "[Chamber Choir]": {
    "level": "core",
    "category": "Choir"
  },
  "[Massive Choir]": {
    "level": "core",
    "category": "Choir"
  },
  "[Epic Choir]": {
    "level": "core",
    "category": "Choir"
  },
  "[Dark Choir]": {
    "level": "core",
    "category": "Choir"
  },
  "[Ethereal Choir]": {
    "level": "core",
    "category": "Choir"
  },
  "[Whispered Choir]": {
    "level": "core",
    "category": "Choir"
  },
  "[Distant Choir]": {
    "level": "core",
    "category": "Choir"
  },
  "[Wordless Choir]": {
    "level": "core",
    "category": "Choir"
  },
  "[Latin Choir]": {
    "level": "core",
    "category": "Choir"
  },
  "[Sacred Choir]": {
    "level": "core",
    "category": "Choir"
  },
  "[Choir: soft, distant]": {
    "level": "core",
    "category": "Choir"
  },
  "[Choir: wide, cinematic]": {
    "level": "core",
    "category": "Choir"
  },
  "[Choir: sacred, reverent]": {
    "level": "core",
    "category": "Choir"
  },
  "[Choir: massive, triumphant]": {
    "level": "core",
    "category": "Choir"
  },
  "[Choral Drone]": {
    "level": "advanced",
    "category": "Choir"
  },
  "[Choir Swell]": {
    "level": "core",
    "category": "Choir"
  },
  "[Choir Stabs]": {
    "level": "core",
    "category": "Choir"
  },
  "[Antiphonal Choir]": {
    "level": "core",
    "category": "Choir"
  },
  "[Call and Response Choir]": {
    "level": "core",
    "category": "Choir"
  },
  "[Layered Choir]": {
    "level": "core",
    "category": "Choir"
  },
  "[Choir Crescendo]": {
    "level": "core",
    "category": "Choir"
  },
  "[Final Chorus Choir]": {
    "level": "core",
    "category": "Choir"
  },
  "[Gang Shouts]": {
    "level": "advanced",
    "category": "Choir"
  },
  "[Crowd Shouts]": {
    "level": "advanced",
    "category": "Choir"
  },
  "[Hey Chants]": {
    "level": "advanced",
    "category": "Choir"
  },
  "[Oh Chants]": {
    "level": "advanced",
    "category": "Choir"
  },
  "[Style: warm, intimate, storytelling]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: restrained, mysterious]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: dark, threatening]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: emotional, vulnerable]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: heroic, determined]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: sacred, mythic]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: energetic, uplifting]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: cinematic, dramatic]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: calm, gentle, relaxed]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: aggressive, relentless]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: dreamy, ethereal]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: triumphant, anthemic]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: melancholic, reflective]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: nostalgic, bittersweet]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: tense, suspenseful]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: playful, quirky]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: romantic, tender]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: hopeful, inspiring]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: ominous, foreboding]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: majestic, regal]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: ritualistic, primal]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: futuristic, neon-lit]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: retro, vintage]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: raw, underground]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: polished, mainstream]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: minimal, spacious]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: dense, maximalist]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: sensual, smooth]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: rebellious, defiant]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: chaotic, unpredictable]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: serene, meditative]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: eerie, uncanny]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: adventurous, expansive]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: celebratory, festive]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: solemn, mournful]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: fierce, battle-ready]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: magical, enchanted]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: spiritual, transcendent]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: gritty, industrial]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: elegant, sophisticated]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: cute, bubbly]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: cool, detached]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: desperate, urgent]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: confident, swaggering]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: lonely, desolate]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: mysterious, seductive]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: comedic, exaggerated]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Style: atmospheric, immersive]": {
    "level": "advanced",
    "category": "Style"
  },
  "[Gradual Build]": {
    "level": "core",
    "category": "Dynamics"
  },
  "[Slow Crescendo]": {
    "level": "core",
    "category": "Dynamics"
  },
  "[Rapid Crescendo]": {
    "level": "core",
    "category": "Dynamics"
  },
  "[Explosive Crescendo]": {
    "level": "core",
    "category": "Dynamics"
  },
  "[Building Intensity]": {
    "level": "advanced",
    "category": "Dynamics"
  },
  "[Rising Intensity]": {
    "level": "advanced",
    "category": "Dynamics"
  },
  "[Peak Intensity]": {
    "level": "advanced",
    "category": "Dynamics"
  },
  "[Emotional Lift]": {
    "level": "advanced",
    "category": "Dynamics"
  },
  "[Controlled Contrast]": {
    "level": "advanced",
    "category": "Dynamics"
  },
  "[Dynamic Contrast]": {
    "level": "advanced",
    "category": "Dynamics"
  },
  "[Controlled Dynamics]": {
    "level": "advanced",
    "category": "Dynamics"
  },
  "[Restrained Energy]": {
    "level": "advanced",
    "category": "Dynamics"
  },
  "[Crescendo]": {
    "level": "core",
    "category": "Dynamics"
  },
  "[Diminuendo]": {
    "level": "advanced",
    "category": "Dynamics"
  },
  "[Sudden Silence]": {
    "level": "advanced",
    "category": "Dynamics"
  },
  "[Explosive Transition]": {
    "level": "advanced",
    "category": "Dynamics"
  },
  "[Constant High Energy]": {
    "level": "advanced",
    "category": "Dynamics"
  },
  "[Massive Finale]": {
    "level": "advanced",
    "category": "Dynamics"
  },
  "[Massive Climax]": {
    "level": "advanced",
    "category": "Dynamics"
  },
  "[Quiet Passage]": {
    "level": "advanced",
    "category": "Dynamics"
  },
  "[Soft and Intimate]": {
    "level": "advanced",
    "category": "Dynamics"
  },
  "[Loud and Powerful]": {
    "level": "advanced",
    "category": "Dynamics"
  },
  "[Fade In]": {
    "level": "advanced",
    "category": "Dynamics"
  },
  "[Staccato]": {
    "level": "advanced",
    "category": "Dynamics"
  },
  "[Legato]": {
    "level": "advanced",
    "category": "Dynamics"
  },
  "[Tremolo]": {
    "level": "advanced",
    "category": "Dynamics"
  },
  "[Vibrato]": {
    "level": "advanced",
    "category": "Dynamics"
  },
  "[Rubato]": {
    "level": "advanced",
    "category": "Dynamics"
  },
  "[Accented Rhythm]": {
    "level": "advanced",
    "category": "Dynamics"
  },
  "[Syncopated Rhythm]": {
    "level": "advanced",
    "category": "Dynamics"
  },
  "[Half-Time Feel]": {
    "level": "advanced",
    "category": "Dynamics"
  },
  "[Double-Time Feel]": {
    "level": "advanced",
    "category": "Dynamics"
  },
  "[Swelling Dynamics]": {
    "level": "advanced",
    "category": "Dynamics"
  },
  "[Sudden Dynamic Drop]": {
    "level": "advanced",
    "category": "Dynamics"
  },
  "[Breathing Space]": {
    "level": "advanced",
    "category": "Dynamics"
  },
  "[Tension and Release]": {
    "level": "advanced",
    "category": "Dynamics"
  },
  "[Final Impact]": {
    "level": "advanced",
    "category": "Dynamics"
  },
  "[Music: gentle piano melody]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Music: soft strings]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Music: distorted guitars]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Music: heavy drums]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Music: deep sub bass]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Music: cinematic orchestra]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Music: atmospheric synths]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Music: Tagelharpa and frame drums]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Music: Taiko and orchestral brass]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Music: acoustic guitar and warm piano]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Music: pulsing arpeggiator]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Music: sparse instrumentation]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Sparse Arrangement]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Minimal Arrangement]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Full Arrangement]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Dense Arrangement]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Layered Arrangement]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Orchestral Arrangement]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Acoustic Arrangement]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Electronic Arrangement]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Hybrid Arrangement]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Gradual Instrument Entry]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Instruments Drop Out]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Drums Enter]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Bass Enters]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Strings Enter]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Choir Enters]": {
    "level": "core",
    "category": "Music"
  },
  "[Full Band Enters]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Piano Only]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Voice and Piano]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Acoustic Guitar Only]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Drums and Bass Only]": {
    "level": "advanced",
    "category": "Music"
  },
  "[No Drums]": {
    "level": "advanced",
    "category": "Music"
  },
  "[No Bass]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Rhythm Section Only]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Lead Instrument]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Instrumental Countermelody]": {
    "level": "core",
    "category": "Music"
  },
  "[Call and Response Instruments]": {
    "level": "core",
    "category": "Music"
  },
  "[Unison Melody]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Polyphonic Texture]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Monophonic Texture]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Homophonic Texture]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Arpeggiated Texture]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Drone Texture]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Ostinato Pattern]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Percussive Texture]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Wall of Sound]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Ambient Soundscape]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Rhythmic Pulse]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Melodic Layers]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Orchestral Swells]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Brass Stabs]": {
    "level": "advanced",
    "category": "Music"
  },
  "[String Ostinato]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Piano Arpeggios]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Guitar Riff]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Bass Riff]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Synth Bass Pulse]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Drum and Bass Groove]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Acoustic Ensemble]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Electronic-Acoustic Fusion]": {
    "level": "advanced",
    "category": "Music"
  },
  "[Instrumental]": {
    "level": "core",
    "category": "Instrumental"
  },
  "[Piano Solo]": {
    "level": "core",
    "category": "Instrumental"
  },
  "[Electric Guitar Solo]": {
    "level": "core",
    "category": "Instrumental"
  },
  "[Acoustic Guitar Solo]": {
    "level": "core",
    "category": "Instrumental"
  },
  "[Violin Solo]": {
    "level": "advanced",
    "category": "Instrumental"
  },
  "[Cello Solo]": {
    "level": "advanced",
    "category": "Instrumental"
  },
  "[Saxophone Solo]": {
    "level": "advanced",
    "category": "Instrumental"
  },
  "[Trumpet Solo]": {
    "level": "advanced",
    "category": "Instrumental"
  },
  "[Flute Solo]": {
    "level": "advanced",
    "category": "Instrumental"
  },
  "[Synth Solo]": {
    "level": "advanced",
    "category": "Instrumental"
  },
  "[Drum Solo]": {
    "level": "advanced",
    "category": "Instrumental"
  },
  "[Bass Solo]": {
    "level": "advanced",
    "category": "Instrumental"
  },
  "[Orchestral Interlude]": {
    "level": "advanced",
    "category": "Instrumental"
  },
  "[Ambient Interlude]": {
    "level": "advanced",
    "category": "Instrumental"
  },
  "[Instrumental Verse]": {
    "level": "core",
    "category": "Instrumental"
  },
  "[Instrumental Chorus]": {
    "level": "core",
    "category": "Instrumental"
  },
  "[Extended Instrumental]": {
    "level": "core",
    "category": "Instrumental"
  },
  "[Instrumental Build]": {
    "level": "core",
    "category": "Instrumental"
  },
  "[Instrumental Drop]": {
    "level": "core",
    "category": "Instrumental"
  },
  "[Instrumental Finale]": {
    "level": "core",
    "category": "Instrumental"
  },
  "[Improvised Solo]": {
    "level": "advanced",
    "category": "Instrumental"
  },
  "[Melodic Solo]": {
    "level": "advanced",
    "category": "Instrumental"
  },
  "[Technical Solo]": {
    "level": "advanced",
    "category": "Instrumental"
  },
  "[Emotional Solo]": {
    "level": "advanced",
    "category": "Instrumental"
  },
  "[Call and Response Solo]": {
    "level": "core",
    "category": "Instrumental"
  },
  "[Instrumental: Tagelharpa]": {
    "level": "core",
    "category": "Instrumental"
  },
  "[Instrumental: Nyckelharpa]": {
    "level": "core",
    "category": "Instrumental"
  },
  "[Instrumental: Shamisen]": {
    "level": "core",
    "category": "Instrumental"
  },
  "[Instrumental: Duduk]": {
    "level": "core",
    "category": "Instrumental"
  },
  "[Instrumental: Koto]": {
    "level": "core",
    "category": "Instrumental"
  },
  "[Instrumental: Taiko Drums]": {
    "level": "core",
    "category": "Instrumental"
  },
  "[Instrumental: Frame Drum]": {
    "level": "core",
    "category": "Instrumental"
  },
  "[Instrumental: Bagpipes]": {
    "level": "core",
    "category": "Instrumental"
  },
  "[Instrumental: Harp]": {
    "level": "core",
    "category": "Instrumental"
  },
  "[Instrumental: Choir Pads]": {
    "level": "core",
    "category": "Instrumental"
  },
  "[Instrumental: Synth Lead]": {
    "level": "core",
    "category": "Instrumental"
  },
  "[Instrumental: Drum Break]": {
    "level": "core",
    "category": "Instrumental"
  },
  "[Instrumental: Orchestral Brass]": {
    "level": "core",
    "category": "Instrumental"
  },
  "[Instrumental: Ethnic Flute]": {
    "level": "core",
    "category": "Instrumental"
  },
  "[Instrumental: Hammered Dulcimer]": {
    "level": "core",
    "category": "Instrumental"
  },
  "[Studio Production]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Live Production]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Raw Production]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Polished Production]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Cinematic Production]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Lo-Fi Production]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Analog Production]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Digital Production]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Vintage Production]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Modern Production]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Wide Stereo Mix]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Narrow Stereo Mix]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Mono Mix]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Dynamic Mix]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Dense Mix]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Clean Mix]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Warm Mix]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Dark Mix]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Bright Mix]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Heavy Low End]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Controlled Low End]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Punchy Drums]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Dry Drums]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Roomy Drums]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Wide Guitars]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Centered Vocal]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Forward Vocal]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Distant Vocal]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Layered Vocal Production]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Heavy Reverb]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Light Reverb]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Plate Reverb]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Hall Reverb]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Short Delay]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Ping-Pong Delay]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Saturated Tape]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Analog Saturation]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Distorted Mix]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Sidechain Compression]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Compressed Drums]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Large Dynamic Range]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Radio-Ready Master]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Clean Master]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Loud Master]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Soft Master]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Vinyl Texture]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Tape Hiss]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Bitcrushed Texture]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Glitch Effects]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Atmospheric Sound Design]": {
    "level": "advanced",
    "category": "Production"
  },
  "[AAA Game Soundtrack Production]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Polished Modern Pop]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Raw Live Band Energy]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Huge Cinematic Reverb]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Punchy Drums, Clear Vocals]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Dark Atmospheric Mix]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Dynamic Mix, Controlled Low End]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Spatial Audio Feel]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Front-and-Center Vocal]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Deep Stereo Field]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Crisp Transients]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Soft Transients]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Glue Compression]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Parallel Compression]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Multiband Compression]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Airy High End]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Rolled-Off High End]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Subtle Saturation]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Aggressive Saturation]": {
    "level": "advanced",
    "category": "Production"
  },
  "[Ad-libs: subtle, sparse]": {
    "level": "advanced",
    "category": "Adlibs"
  },
  "[Ad-libs: emotional breaths]": {
    "level": "advanced",
    "category": "Adlibs"
  },
  "[Ad-libs: energetic shouts]": {
    "level": "advanced",
    "category": "Adlibs"
  },
  "[Ad-libs: whispered echoes]": {
    "level": "advanced",
    "category": "Adlibs"
  },
  "[Ad-libs: final chorus only]": {
    "level": "core",
    "category": "Adlibs"
  },
  "[Soft Ad-libs]": {
    "level": "advanced",
    "category": "Adlibs"
  },
  "[Background Ad-libs]": {
    "level": "advanced",
    "category": "Adlibs"
  },
  "[Callout Ad-libs]": {
    "level": "advanced",
    "category": "Adlibs"
  },
  "[Whispered Ad-libs]": {
    "level": "advanced",
    "category": "Adlibs"
  },
  "[Emotional Ad-libs]": {
    "level": "advanced",
    "category": "Adlibs"
  },
  "[Melodic Ad-libs]": {
    "level": "advanced",
    "category": "Adlibs"
  },
  "[Rap Ad-libs]": {
    "level": "advanced",
    "category": "Adlibs"
  },
  "[Choir Ad-libs]": {
    "level": "core",
    "category": "Adlibs"
  },
  "[Wordless Vocals]": {
    "level": "advanced",
    "category": "Adlibs"
  },
  "[Vocal Runs]": {
    "level": "advanced",
    "category": "Adlibs"
  },
  "[Vocal Improvisation]": {
    "level": "advanced",
    "category": "Adlibs"
  },
  "[Transition: rising tension]": {
    "level": "advanced",
    "category": "Transitions"
  },
  "[Transition: drum fill into chorus]": {
    "level": "core",
    "category": "Transitions"
  },
  "[Transition: reverse swell]": {
    "level": "core",
    "category": "Transitions"
  },
  "[Transition: orchestral impact]": {
    "level": "advanced",
    "category": "Transitions"
  },
  "[Transition: bass drop]": {
    "level": "advanced",
    "category": "Transitions"
  },
  "[Transition: silence before impact]": {
    "level": "advanced",
    "category": "Transitions"
  },
  "[Transition: seamless crossfade]": {
    "level": "advanced",
    "category": "Transitions"
  },
  "[Seamless Transition]": {
    "level": "advanced",
    "category": "Transitions"
  },
  "[Abrupt Transition]": {
    "level": "advanced",
    "category": "Transitions"
  },
  "[Hard Cut]": {
    "level": "advanced",
    "category": "Transitions"
  },
  "[Smash Cut]": {
    "level": "advanced",
    "category": "Transitions"
  },
  "[Drum Fill Transition]": {
    "level": "advanced",
    "category": "Transitions"
  },
  "[Reverse Cymbal Transition]": {
    "level": "core",
    "category": "Transitions"
  },
  "[Riser]": {
    "level": "advanced",
    "category": "Transitions"
  },
  "[Downlifter]": {
    "level": "advanced",
    "category": "Transitions"
  },
  "[Impact Hit]": {
    "level": "advanced",
    "category": "Transitions"
  },
  "[Whoosh Transition]": {
    "level": "advanced",
    "category": "Transitions"
  },
  "[Filtered Transition]": {
    "level": "advanced",
    "category": "Transitions"
  },
  "[Tempo Transition]": {
    "level": "advanced",
    "category": "Transitions"
  },
  "[Key Change Transition]": {
    "level": "advanced",
    "category": "Transitions"
  },
  "[Silence Before Drop]": {
    "level": "advanced",
    "category": "Transitions"
  },
  "[Pause Before Chorus]": {
    "level": "core",
    "category": "Transitions"
  },
  "[Build into Chorus]": {
    "level": "core",
    "category": "Transitions"
  },
  "[Build into Drop]": {
    "level": "advanced",
    "category": "Transitions"
  },
  "[Break into Verse]": {
    "level": "core",
    "category": "Transitions"
  },
  "[Fade into Outro]": {
    "level": "core",
    "category": "Transitions"
  },
  "[Crossfade]": {
    "level": "advanced",
    "category": "Transitions"
  },
  "[Beat Switch]": {
    "level": "advanced",
    "category": "Transitions"
  },
  "[Genre Switch]": {
    "level": "experimental",
    "category": "Transitions"
  },
  "[Mood Shift]": {
    "level": "advanced",
    "category": "Transitions"
  },
  "[Vocal Transition]": {
    "level": "advanced",
    "category": "Transitions"
  },
  "[Instrumental Transition]": {
    "level": "core",
    "category": "Transitions"
  },
  "[Tape Stop]": {
    "level": "experimental",
    "category": "Transitions"
  },
  "[Record Scratch Transition]": {
    "level": "experimental",
    "category": "Transitions"
  },
  "[Reverb Tail Transition]": {
    "level": "advanced",
    "category": "Transitions"
  },
  "[Pitch-Rise Transition]": {
    "level": "advanced",
    "category": "Transitions"
  },
  "[Slow Tempo]": {
    "level": "core",
    "category": "RhythmTempo"
  },
  "[Moderate Tempo]": {
    "level": "advanced",
    "category": "RhythmTempo"
  },
  "[Fast Tempo]": {
    "level": "core",
    "category": "RhythmTempo"
  },
  "[Adagio]": {
    "level": "advanced",
    "category": "RhythmTempo"
  },
  "[Andante]": {
    "level": "advanced",
    "category": "RhythmTempo"
  },
  "[Moderato]": {
    "level": "advanced",
    "category": "RhythmTempo"
  },
  "[Allegro]": {
    "level": "advanced",
    "category": "RhythmTempo"
  },
  "[Presto]": {
    "level": "advanced",
    "category": "RhythmTempo"
  },
  "[Steady Tempo]": {
    "level": "advanced",
    "category": "RhythmTempo"
  },
  "[Flexible Tempo]": {
    "level": "advanced",
    "category": "RhythmTempo"
  },
  "[Straight Rhythm]": {
    "level": "advanced",
    "category": "RhythmTempo"
  },
  "[Polyrhythmic]": {
    "level": "experimental",
    "category": "RhythmTempo"
  },
  "[Swing Feel]": {
    "level": "advanced",
    "category": "RhythmTempo"
  },
  "[Shuffle Feel]": {
    "level": "advanced",
    "category": "RhythmTempo"
  },
  "[Four-on-the-Floor]": {
    "level": "advanced",
    "category": "RhythmTempo"
  },
  "[Half-Time]": {
    "level": "advanced",
    "category": "RhythmTempo"
  },
  "[Double-Time]": {
    "level": "advanced",
    "category": "RhythmTempo"
  },
  "[Triplet Feel]": {
    "level": "advanced",
    "category": "RhythmTempo"
  },
  "[Driving Rhythm]": {
    "level": "advanced",
    "category": "RhythmTempo"
  },
  "[Marching Rhythm]": {
    "level": "advanced",
    "category": "RhythmTempo"
  },
  "[Rolling Rhythm]": {
    "level": "advanced",
    "category": "RhythmTempo"
  },
  "[Broken Beat]": {
    "level": "advanced",
    "category": "RhythmTempo"
  },
  "[Heavy Groove]": {
    "level": "advanced",
    "category": "RhythmTempo"
  },
  "[Laid-Back Groove]": {
    "level": "advanced",
    "category": "RhythmTempo"
  },
  "[Offbeat Rhythm]": {
    "level": "advanced",
    "category": "RhythmTempo"
  },
  "[Rhythmic Accents]": {
    "level": "advanced",
    "category": "RhythmTempo"
  },
  "[Tempo Increase]": {
    "level": "advanced",
    "category": "RhythmTempo"
  },
  "[Tempo Decrease]": {
    "level": "advanced",
    "category": "RhythmTempo"
  },
  "[Dotted Rhythm]": {
    "level": "advanced",
    "category": "RhythmTempo"
  },
  "[Clave Rhythm]": {
    "level": "advanced",
    "category": "RhythmTempo"
  },
  "[Motorik Beat]": {
    "level": "advanced",
    "category": "RhythmTempo"
  },
  "[Amen Break]": {
    "level": "experimental",
    "category": "RhythmTempo"
  },
  "[Trap Hi-Hats]": {
    "level": "advanced",
    "category": "RhythmTempo"
  },
  "[Blast Beats]": {
    "level": "advanced",
    "category": "RhythmTempo"
  },
  "[Galloping Rhythm]": {
    "level": "advanced",
    "category": "RhythmTempo"
  },
  "[Waltz Feel]": {
    "level": "advanced",
    "category": "RhythmTempo"
  },
  "[6/8 Feel]": {
    "level": "advanced",
    "category": "RhythmTempo"
  },
  "[Odd Meter]": {
    "level": "experimental",
    "category": "RhythmTempo"
  },
  "[Major Key]": {
    "level": "core",
    "category": "HarmonyMelody"
  },
  "[Minor Key]": {
    "level": "core",
    "category": "HarmonyMelody"
  },
  "[Modal Harmony]": {
    "level": "advanced",
    "category": "HarmonyMelody"
  },
  "[Dissonant Harmony]": {
    "level": "advanced",
    "category": "HarmonyMelody"
  },
  "[Consonant Harmony]": {
    "level": "advanced",
    "category": "HarmonyMelody"
  },
  "[Chromatic Harmony]": {
    "level": "advanced",
    "category": "HarmonyMelody"
  },
  "[Rich Harmony]": {
    "level": "advanced",
    "category": "HarmonyMelody"
  },
  "[Simple Harmony]": {
    "level": "advanced",
    "category": "HarmonyMelody"
  },
  "[Complex Harmony]": {
    "level": "advanced",
    "category": "HarmonyMelody"
  },
  "[Open Chords]": {
    "level": "advanced",
    "category": "HarmonyMelody"
  },
  "[Suspended Chords]": {
    "level": "advanced",
    "category": "HarmonyMelody"
  },
  "[Power Chords]": {
    "level": "advanced",
    "category": "HarmonyMelody"
  },
  "[Arpeggiated Chords]": {
    "level": "advanced",
    "category": "HarmonyMelody"
  },
  "[Ascending Melody]": {
    "level": "advanced",
    "category": "HarmonyMelody"
  },
  "[Descending Melody]": {
    "level": "advanced",
    "category": "HarmonyMelody"
  },
  "[Repeated Motif]": {
    "level": "advanced",
    "category": "HarmonyMelody"
  },
  "[Leitmotif]": {
    "level": "advanced",
    "category": "HarmonyMelody"
  },
  "[Countermelody]": {
    "level": "advanced",
    "category": "HarmonyMelody"
  },
  "[Call and Response Melody]": {
    "level": "core",
    "category": "HarmonyMelody"
  },
  "[Melodic Sequence]": {
    "level": "advanced",
    "category": "HarmonyMelody"
  },
  "[Harmonic Resolution]": {
    "level": "advanced",
    "category": "HarmonyMelody"
  },
  "[Unresolved Tension]": {
    "level": "advanced",
    "category": "HarmonyMelody"
  },
  "[Modulation]": {
    "level": "advanced",
    "category": "HarmonyMelody"
  },
  "[Counterpoint]": {
    "level": "advanced",
    "category": "HarmonyMelody"
  },
  "[Pedal Tone]": {
    "level": "advanced",
    "category": "HarmonyMelody"
  },
  "[Drone Harmony]": {
    "level": "advanced",
    "category": "HarmonyMelody"
  },
  "[Parallel Harmony]": {
    "level": "advanced",
    "category": "HarmonyMelody"
  },
  "[Quartal Harmony]": {
    "level": "advanced",
    "category": "HarmonyMelody"
  },
  "[Circle Progression]": {
    "level": "advanced",
    "category": "HarmonyMelody"
  },
  "[Descending Bass Line]": {
    "level": "advanced",
    "category": "HarmonyMelody"
  },
  "[Ascending Bass Line]": {
    "level": "advanced",
    "category": "HarmonyMelody"
  },
  "[Chromatic Run]": {
    "level": "advanced",
    "category": "HarmonyMelody"
  },
  "[Pentatonic Melody]": {
    "level": "advanced",
    "category": "HarmonyMelody"
  },
  "[Modal Melody]": {
    "level": "advanced",
    "category": "HarmonyMelody"
  },
  "[Applause]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Crowd Noise]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Heartbeat]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Thunder]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Rain]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Footsteps]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Telephone Effect]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Radio Static]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Vinyl Crackle]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Alarm]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Explosion]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Door Slam]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Silence]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Cassette Click]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Tape Rewind]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Record Needle Drop]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Distant Siren]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Clock Ticking]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Breathing]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Whispering Crowd]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Stadium Ambience]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Room Ambience]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Forest Ambience]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Ocean Ambience]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Fire Crackle]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Metal Impact]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Cinematic Boom]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Sub Drop]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Reverse Reverb]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Glitch Burst]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Static Burst]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Digital Noise]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Riser Effect]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Downlifter Effect]": {
    "level": "experimental",
    "category": "SoundFX"
  },
  "[Impact Effect]": {
    "level": "experimental",
    "category": "SoundFX"
  }
};
  const suggestions = {
  "general": [
    "[Style: cinematic, dramatic]",
    "[Gradual Build]",
    "[Dynamic Mix, Controlled Low End]",
    "[Clear Voice Separation]"
  ],
  "intro": [
    "[Cold Open]",
    "[Style: restrained, mysterious]",
    "[Sparse Arrangement]",
    "[Choir: soft, distant]",
    "[Gradual Build]"
  ],
  "verse": [
    "[Style: warm, intimate, storytelling]",
    "[Close-Mic Vocal]",
    "[Sparse Arrangement]",
    "[Controlled Contrast]",
    "[Ad-libs: subtle, sparse]"
  ],
  "pre-chorus": [
    "[Building Intensity]",
    "[Emotional Lift]",
    "[Transition: rising tension]",
    "[Choir: soft, distant]"
  ],
  "chorus": [
    "[Powerful Vocal]",
    "[Style: energetic, uplifting]",
    "[Choir: wide, cinematic]",
    "[Music: heavy drums]",
    "[Wide Stereo Mix]"
  ],
  "post-chorus": [
    "[Gang Shouts]",
    "[Ad-libs: energetic shouts]",
    "[Music: deep sub bass]",
    "[Seamless Transition]"
  ],
  "bridge": [
    "[Style: emotional, vulnerable]",
    "[Sudden Silence]",
    "[Piano Solo]",
    "[Broken Vocal]",
    "[Gradual Build]"
  ],
  "breakdown": [
    "[Half-Time Breakdown]",
    "[Style: dark, threatening]",
    "[Growled Vocal]",
    "[Music: distorted guitars]",
    "[Silence Before Drop]"
  ],
  "drop": [
    "[Explosive Transition]",
    "[Music: deep sub bass]",
    "[Music: heavy drums]",
    "[Instrumental: Synth Lead]",
    "[Constant High Energy]"
  ],
  "instrumental": [
    "[Instrumental]",
    "[Wide Stereo Mix]",
    "[Music: cinematic orchestra]",
    "[Dynamic Mix]"
  ],
  "solo": [
    "[Electric Guitar Solo]",
    "[Crescendo]",
    "[Raw Live Band Energy]",
    "[Music: distorted guitars]"
  ],
  "final chorus": [
    "[Massive Finale]",
    "[Choir: massive, triumphant]",
    "[Style: triumphant, anthemic]",
    "[Powerful Vocal]",
    "[Huge Cinematic Reverb]"
  ],
  "outro": [
    "[Style: calm, gentle, relaxed]",
    "[Fade Out]",
    "[Music: gentle piano melody]",
    "[Choir: soft, distant]"
  ]
};
  const categoryOrder = ["Sections", "Vocals", "Choir", "Style", "Dynamics", "Music", "Instrumental", "Production", "Adlibs", "Transitions", "RhythmTempo", "HarmonyMelody", "SoundFX"];
  window.NSW_LYRICS_METATAGS = Object.freeze({ categories, metadata, suggestions, categoryOrder, total: Object.values(categories).flat().length });
})();

(function(root,factory){
'use strict';
const api=factory();
if(typeof module==='object'&&module.exports)module.exports=api;
if(root)root.NSWVocalClarityI18n=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';

const VERSION='7.5.9';
const LANGUAGES=Object.freeze(['en','de','fr','es','it','pt','pt-BR','nl','pl','tr','ru','ja','ko','zh-CN']);

const DATA={
 en:{
  kicker:'VOICE CLARITY',title:'Clear & intelligible voice',description:'Adds one focused clarity block before genre and production when it suits the song.',
  toggleLabel:'Use clarity block in STYLE',toggleOn:'On',toggleOff:'Off',
  whyTitle:'Why is this block at the beginning?',whyText:'Early STYLE instructions usually receive more weight. These five terms therefore define intelligibility and vocal distance before genre, instruments and production shape the rest of the sound.',
  broadwayMeaning:'asks for musical-theatre clarity, not a Broadway genre.',articulationMeaning:'keeps words and consonants easier to understand.',closeMicMeaning:'keeps the lead vocal dry, forward and close.',
  mode:'Compatibility mode',modeHelp:'Automatic is recommended. Force deliberately ignores compatibility warnings; Off removes the complete block.',smart:'Automatic (recommended)',off:'Off',force:'Always force',prefix:'Exact STYLE block',
  genre:'Genre',reverb:'Vocal space',lyrics:'Lyric density',note:'This block belongs only to the global STYLE. Pipe-Stacks remain responsible for section direction.',
  good:'Suitable',warning:'Caution',conflict:'Conflict',empty:'No lyrics',low:'Open',medium:'Dense',high:'Too dense',none:'No conflicts detected.',
  states:{active:'Active',caution:'Active · Caution',blocked:'Not applied',forced:'Forced · Conflict',suppressed:'Instrumental',off:'Off'},
  summaries:{active:'The complete clarity block is at the beginning of the STYLE.',caution:'The clarity block is active; review the compatibility notes.',blocked:'Automatic mode does not insert the block because of a hard conflict.',forced:'The block is front-loaded despite detected conflicts.',suppressed:'Vocal Clarity is disabled for instrumental output.',off:'The STYLE remains without the clarity block.'},
  guidance:{placementTitle:'Live STYLE order',block:'1–5 · Vocal Clarity',rest:'then genre · voice · instruments · production',automaticActive:'Automatic is active',useAutomatic:'Use Automatic',returnAutomatic:'Return to Automatic',tour:'🎓 Show this setting in the tour',placements:{active:'The five clarity terms are currently at the very beginning.',caution:'The block remains first; review the cautions below.',blocked:'Automatic leaves the block out because of a hard conflict.',forced:'The block is first because Force is active despite a conflict.',suppressed:'Instrumental mode leaves out all vocal clarity instructions.',off:'The block is switched off and is not inserted.'}}
 },
 de:{
  kicker:'STIMMKLARHEIT',title:'Klare & verständliche Stimme',description:'Setzt einen gezielten Klarheitsblock vor Genre und Produktion, wenn er zum Song passt.',
  toggleLabel:'Klarheitsblock im STYLE verwenden',toggleOn:'Ein',toggleOff:'Aus',
  whyTitle:'Warum steht dieser Block am Anfang?',whyText:'Frühe STYLE-Anweisungen erhalten meist mehr Gewicht. Deshalb legen diese fünf Begriffe zuerst Verständlichkeit und Stimmnähe fest, bevor Genre, Instrumente und Produktion den restlichen Klang formen.',
  broadwayMeaning:'fordert Musical-Deutlichkeit, aber kein Broadway-Genre.',articulationMeaning:'macht Wörter und Konsonanten leichter verständlich.',closeMicMeaning:'hält die Hauptstimme trocken, präsent und nah.',
  mode:'Kompatibilitätsmodus',modeHelp:'Automatisch wird empfohlen. Erzwingen ignoriert bewusst Kompatibilitätswarnungen; Aus entfernt den gesamten Block.',smart:'Automatisch (empfohlen)',off:'Aus',force:'Immer erzwingen',prefix:'Exakter STYLE-Block',
  genre:'Genre',reverb:'Vocal-Raum',lyrics:'Lyrics-Dichte',note:'Dieser Block gehört nur in den globalen STYLE. Die Pipe-Stacks bleiben für die Abschnittsregie zuständig.',
  good:'Passend',warning:'Hinweis',conflict:'Konflikt',empty:'Keine Lyrics',low:'Locker',medium:'Dicht',high:'Zu dicht',none:'Keine Konflikte erkannt.',
  states:{active:'Aktiv',caution:'Aktiv · Hinweis',blocked:'Nicht angewendet',forced:'Erzwungen · Konflikt',suppressed:'Instrumental',off:'Aus'},
  summaries:{active:'Der vollständige Klarheitsblock steht am Anfang des STYLE.',caution:'Der Klarheitsblock ist aktiv; prüfe die Hinweise bewusst.',blocked:'Die Automatik setzt den Block wegen eines harten Konflikts nicht ein.',forced:'Der Block wird trotz erkannter Konflikte vorangestellt.',suppressed:'Vocal Clarity ist für Instrumental-Ausgaben deaktiviert.',off:'Der STYLE bleibt ohne Klarheitsblock.'},
  guidance:{placementTitle:'Live-STYLE-Reihenfolge',block:'1–5 · Vocal Clarity',rest:'danach Genre · Stimme · Instrumente · Produktion',automaticActive:'Automatik ist aktiv',useAutomatic:'Automatik verwenden',returnAutomatic:'Zur Automatik zurückkehren',tour:'🎓 Diese Einstellung in der Tour zeigen',placements:{active:'Die fünf Klarheitsbegriffe stehen aktuell ganz am Anfang.',caution:'Der Block bleibt vorne; prüfe die Hinweise darunter.',blocked:'Die Automatik lässt den Block wegen eines harten Konflikts weg.',forced:'Der Block steht vorne, weil Erzwingen trotz Konflikt aktiv ist.',suppressed:'Im Instrumental-Modus werden keine Vocal-Anweisungen eingefügt.',off:'Der Block ist ausgeschaltet und wird nicht eingefügt.'}}
 },
 fr:{
  kicker:'CLARTÉ VOCALE',title:'Voix claire et intelligible',description:'Ajoute un bloc de clarté avant le genre et la production lorsqu’il convient au morceau.',
  toggleLabel:'Utiliser le bloc de clarté dans STYLE',toggleOn:'Activé',toggleOff:'Désactivé',
  whyTitle:'Pourquoi ce bloc est-il placé au début ?',whyText:'Les premières instructions de STYLE ont généralement plus de poids. Ces cinq termes définissent donc d’abord l’intelligibilité et la proximité de la voix, avant le genre, les instruments et la production.',
  broadwayMeaning:'demande une clarté de comédie musicale, pas un genre Broadway.',articulationMeaning:'rend les mots et les consonnes plus faciles à comprendre.',closeMicMeaning:'garde la voix principale sèche, présente et proche.',
  mode:'Mode de compatibilité',modeHelp:'Le mode Automatique est recommandé. Forcer ignore volontairement les alertes ; Désactivé retire tout le bloc.',smart:'Automatique (recommandé)',off:'Désactivé',force:'Toujours forcer',prefix:'Bloc STYLE exact',
  genre:'Genre',reverb:'Espace vocal',lyrics:'Densité des paroles',note:'Ce bloc appartient uniquement au STYLE global. Les Pipe-Stacks dirigent toujours les sections.',
  good:'Compatible',warning:'Attention',conflict:'Conflit',empty:'Aucune parole',low:'Aérée',medium:'Dense',high:'Trop dense',none:'Aucun conflit détecté.',
  states:{active:'Actif',caution:'Actif · Attention',blocked:'Non appliqué',forced:'Forcé · Conflit',suppressed:'Instrumental',off:'Désactivé'},
  summaries:{active:'Le bloc de clarté complet se trouve au début du STYLE.',caution:'Le bloc est actif ; vérifiez les remarques de compatibilité.',blocked:'Le mode automatique n’ajoute pas le bloc à cause d’un conflit majeur.',forced:'Le bloc est placé au début malgré les conflits détectés.',suppressed:'Vocal Clarity est désactivé pour une sortie instrumentale.',off:'Le STYLE reste sans bloc de clarté.'},
  guidance:{placementTitle:'Ordre STYLE en direct',block:'1–5 · Clarté vocale',rest:'puis genre · voix · instruments · production',automaticActive:'Mode Automatique actif',useAutomatic:'Utiliser Automatique',returnAutomatic:'Revenir à Automatique',tour:'🎓 Montrer ce réglage dans la visite',placements:{active:'Les cinq termes de clarté sont actuellement tout au début.',caution:'Le bloc reste en premier ; vérifiez les remarques ci-dessous.',blocked:'Le mode Automatique omet le bloc à cause d’un conflit majeur.',forced:'Le bloc est en premier car le mode Forcer reste actif malgré le conflit.',suppressed:'Le mode instrumental n’ajoute aucune instruction vocale.',off:'Le bloc est désactivé et n’est pas inséré.'}}
 },
 es:{
  kicker:'CLARIDAD VOCAL',title:'Voz clara y comprensible',description:'Añade un bloque de claridad antes del género y la producción cuando encaja con la canción.',
  toggleLabel:'Usar el bloque de claridad en STYLE',toggleOn:'Activado',toggleOff:'Desactivado',
  whyTitle:'¿Por qué aparece este bloque al principio?',whyText:'Las primeras instrucciones de STYLE suelen tener más peso. Por eso estos cinco términos fijan primero la comprensión y la cercanía de la voz, antes de que el género, los instrumentos y la producción formen el resto.',
  broadwayMeaning:'pide claridad de teatro musical, no un género Broadway.',articulationMeaning:'hace que las palabras y consonantes se entiendan mejor.',closeMicMeaning:'mantiene la voz principal seca, presente y cercana.',
  mode:'Modo de compatibilidad',modeHelp:'Se recomienda Automático. Forzar ignora las advertencias de forma consciente; Desactivado elimina el bloque completo.',smart:'Automático (recomendado)',off:'Desactivado',force:'Forzar siempre',prefix:'Bloque STYLE exacto',
  genre:'Género',reverb:'Espacio vocal',lyrics:'Densidad de letra',note:'Este bloque pertenece solo al STYLE global. Los Pipe-Stacks siguen dirigiendo cada sección.',
  good:'Compatible',warning:'Aviso',conflict:'Conflicto',empty:'Sin letra',low:'Abierta',medium:'Densa',high:'Demasiado densa',none:'No se detectaron conflictos.',
  states:{active:'Activo',caution:'Activo · Aviso',blocked:'No aplicado',forced:'Forzado · Conflicto',suppressed:'Instrumental',off:'Desactivado'},
  summaries:{active:'El bloque de claridad completo está al principio del STYLE.',caution:'El bloque está activo; revisa los avisos de compatibilidad.',blocked:'El modo automático no inserta el bloque por un conflicto grave.',forced:'El bloque se coloca al principio pese a los conflictos detectados.',suppressed:'Vocal Clarity está desactivado para resultados instrumentales.',off:'El STYLE queda sin bloque de claridad.'},
  guidance:{placementTitle:'Orden STYLE en directo',block:'1–5 · Claridad vocal',rest:'después género · voz · instrumentos · producción',automaticActive:'Automático está activo',useAutomatic:'Usar Automático',returnAutomatic:'Volver a Automático',tour:'🎓 Mostrar este ajuste en el recorrido',placements:{active:'Los cinco términos de claridad están ahora al principio.',caution:'El bloque sigue primero; revisa los avisos de abajo.',blocked:'Automático omite el bloque por un conflicto grave.',forced:'El bloque está primero porque Forzar sigue activo pese al conflicto.',suppressed:'El modo instrumental no añade instrucciones vocales.',off:'El bloque está desactivado y no se inserta.'}}
 },
 it:{
  kicker:'CHIAREZZA VOCALE',title:'Voce chiara e comprensibile',description:'Aggiunge un blocco di chiarezza prima di genere e produzione quando è adatto al brano.',
  toggleLabel:'Usa il blocco di chiarezza nello STYLE',toggleOn:'Attivo',toggleOff:'Disattivo',
  whyTitle:'Perché questo blocco è all’inizio?',whyText:'Le prime istruzioni dello STYLE ricevono di solito più peso. Questi cinque termini definiscono quindi chiarezza e vicinanza della voce prima che genere, strumenti e produzione modellino il resto.',
  broadwayMeaning:'richiede chiarezza da musical, non un genere Broadway.',articulationMeaning:'rende parole e consonanti più comprensibili.',closeMicMeaning:'mantiene la voce principale asciutta, presente e vicina.',
  mode:'Modalità compatibilità',modeHelp:'Automatico è consigliato. Forza ignora consapevolmente gli avvisi; Disattivo rimuove l’intero blocco.',smart:'Automatico (consigliato)',off:'Disattivo',force:'Forza sempre',prefix:'Blocco STYLE esatto',
  genre:'Genere',reverb:'Spazio vocale',lyrics:'Densità del testo',note:'Questo blocco appartiene solo allo STYLE globale. I Pipe-Stack restano responsabili delle sezioni.',
  good:'Adatto',warning:'Attenzione',conflict:'Conflitto',empty:'Nessun testo',low:'Aperto',medium:'Denso',high:'Troppo denso',none:'Nessun conflitto rilevato.',
  states:{active:'Attivo',caution:'Attivo · Attenzione',blocked:'Non applicato',forced:'Forzato · Conflitto',suppressed:'Strumentale',off:'Disattivo'},
  summaries:{active:'Il blocco di chiarezza completo è all’inizio dello STYLE.',caution:'Il blocco è attivo; controlla gli avvisi di compatibilità.',blocked:'La modalità automatica non inserisce il blocco per un conflitto grave.',forced:'Il blocco viene anteposto nonostante i conflitti rilevati.',suppressed:'Vocal Clarity è disattivato per l’uscita strumentale.',off:'Lo STYLE rimane senza blocco di chiarezza.'},
  guidance:{placementTitle:'Ordine STYLE in tempo reale',block:'1–5 · Chiarezza vocale',rest:'poi genere · voce · strumenti · produzione',automaticActive:'Automatico è attivo',useAutomatic:'Usa Automatico',returnAutomatic:'Torna ad Automatico',tour:'🎓 Mostra questa impostazione nel tour',placements:{active:'I cinque termini di chiarezza sono ora all’inizio.',caution:'Il blocco resta per primo; controlla gli avvisi sotto.',blocked:'Automatico omette il blocco per un conflitto grave.',forced:'Il blocco è primo perché Forza resta attivo nonostante il conflitto.',suppressed:'La modalità strumentale non aggiunge istruzioni vocali.',off:'Il blocco è disattivato e non viene inserito.'}}
 },
 pt:{
  kicker:'CLAREZA VOCAL',title:'Voz clara e compreensível',description:'Adiciona um bloco de clareza antes do género e da produção quando combina com a música.',
  toggleLabel:'Usar bloco de clareza no STYLE',toggleOn:'Ligado',toggleOff:'Desligado',
  whyTitle:'Porque está este bloco no início?',whyText:'As primeiras instruções do STYLE costumam ter mais peso. Por isso, estes cinco termos definem primeiro a compreensão e a proximidade da voz, antes do género, instrumentos e produção.',
  broadwayMeaning:'pede clareza de teatro musical, não um género Broadway.',articulationMeaning:'torna palavras e consoantes mais fáceis de entender.',closeMicMeaning:'mantém a voz principal seca, presente e próxima.',
  mode:'Modo de compatibilidade',modeHelp:'Automático é recomendado. Forçar ignora avisos de propósito; Desligado remove o bloco completo.',smart:'Automático (recomendado)',off:'Desligado',force:'Forçar sempre',prefix:'Bloco STYLE exato',
  genre:'Género',reverb:'Espaço vocal',lyrics:'Densidade da letra',note:'Este bloco pertence apenas ao STYLE global. Os Pipe-Stacks continuam a orientar as secções.',
  good:'Adequado',warning:'Aviso',conflict:'Conflito',empty:'Sem letra',low:'Aberta',medium:'Densa',high:'Demasiado densa',none:'Nenhum conflito detetado.',
  states:{active:'Ativo',caution:'Ativo · Aviso',blocked:'Não aplicado',forced:'Forçado · Conflito',suppressed:'Instrumental',off:'Desligado'},
  summaries:{active:'O bloco completo de clareza está no início do STYLE.',caution:'O bloco está ativo; reveja os avisos de compatibilidade.',blocked:'O modo automático não insere o bloco devido a um conflito forte.',forced:'O bloco é colocado no início apesar dos conflitos detetados.',suppressed:'Vocal Clarity está desligado para saída instrumental.',off:'O STYLE fica sem bloco de clareza.'},
  guidance:{placementTitle:'Ordem STYLE em direto',block:'1–5 · Clareza vocal',rest:'depois género · voz · instrumentos · produção',automaticActive:'Automático está ativo',useAutomatic:'Usar Automático',returnAutomatic:'Voltar a Automático',tour:'🎓 Mostrar esta definição na visita',placements:{active:'Os cinco termos de clareza estão agora no início.',caution:'O bloco continua primeiro; reveja os avisos abaixo.',blocked:'Automático omite o bloco devido a um conflito forte.',forced:'O bloco está primeiro porque Forçar continua ativo apesar do conflito.',suppressed:'O modo instrumental não adiciona instruções vocais.',off:'O bloco está desligado e não é inserido.'}}
 },
 'pt-BR':{
  kicker:'CLAREZA VOCAL',title:'Voz clara e compreensível',description:'Adiciona um bloco de clareza antes do gênero e da produção quando combina com a música.',
  toggleLabel:'Usar bloco de clareza no STYLE',toggleOn:'Ligado',toggleOff:'Desligado',
  whyTitle:'Por que este bloco fica no início?',whyText:'As primeiras instruções do STYLE costumam ter mais peso. Por isso, estes cinco termos definem primeiro a compreensão e a proximidade da voz, antes de gênero, instrumentos e produção.',
  broadwayMeaning:'pede clareza de teatro musical, não um gênero Broadway.',articulationMeaning:'torna palavras e consoantes mais fáceis de entender.',closeMicMeaning:'mantém o vocal principal seco, presente e próximo.',
  mode:'Modo de compatibilidade',modeHelp:'Automático é recomendado. Forçar ignora os avisos de propósito; Desligado remove o bloco inteiro.',smart:'Automático (recomendado)',off:'Desligado',force:'Forçar sempre',prefix:'Bloco STYLE exato',
  genre:'Gênero',reverb:'Espaço vocal',lyrics:'Densidade da letra',note:'Este bloco pertence apenas ao STYLE global. Os Pipe-Stacks continuam orientando as seções.',
  good:'Adequado',warning:'Aviso',conflict:'Conflito',empty:'Sem letra',low:'Aberta',medium:'Densa',high:'Densa demais',none:'Nenhum conflito detectado.',
  states:{active:'Ativo',caution:'Ativo · Aviso',blocked:'Não aplicado',forced:'Forçado · Conflito',suppressed:'Instrumental',off:'Desligado'},
  summaries:{active:'O bloco completo de clareza está no início do STYLE.',caution:'O bloco está ativo; revise os avisos de compatibilidade.',blocked:'O modo automático não insere o bloco por causa de um conflito forte.',forced:'O bloco é colocado no início apesar dos conflitos detectados.',suppressed:'Vocal Clarity está desligado para saída instrumental.',off:'O STYLE fica sem bloco de clareza.'},
  guidance:{placementTitle:'Ordem STYLE ao vivo',block:'1–5 · Clareza vocal',rest:'depois gênero · voz · instrumentos · produção',automaticActive:'Automático está ativo',useAutomatic:'Usar Automático',returnAutomatic:'Voltar para Automático',tour:'🎓 Mostrar esta configuração no tour',placements:{active:'Os cinco termos de clareza estão agora no início.',caution:'O bloco continua primeiro; revise os avisos abaixo.',blocked:'Automático deixa o bloco de fora por causa de um conflito forte.',forced:'O bloco está primeiro porque Forçar continua ativo apesar do conflito.',suppressed:'O modo instrumental não adiciona instruções vocais.',off:'O bloco está desligado e não é inserido.'}}
 },
 nl:{
  kicker:'VOCALE HELDERHEID',title:'Heldere en verstaanbare stem',description:'Voegt vóór genre en productie een helderheidsblok toe wanneer dat bij het nummer past.',
  toggleLabel:'Helderheidsblok in STYLE gebruiken',toggleOn:'Aan',toggleOff:'Uit',
  whyTitle:'Waarom staat dit blok vooraan?',whyText:'Vroege STYLE-instructies krijgen meestal meer gewicht. Deze vijf termen bepalen daarom eerst verstaanbaarheid en stemafstand, voordat genre, instrumenten en productie de rest vormen.',
  broadwayMeaning:'vraagt om musicalhelderheid, niet om het Broadway-genre.',articulationMeaning:'maakt woorden en medeklinkers beter verstaanbaar.',closeMicMeaning:'houdt de leadzang droog, aanwezig en dichtbij.',
  mode:'Compatibiliteitsmodus',modeHelp:'Automatisch wordt aanbevolen. Forceren negeert waarschuwingen bewust; Uit verwijdert het volledige blok.',smart:'Automatisch (aanbevolen)',off:'Uit',force:'Altijd forceren',prefix:'Exact STYLE-blok',
  genre:'Genre',reverb:'Vocale ruimte',lyrics:'Tekstdichtheid',note:'Dit blok hoort alleen bij de globale STYLE. Pipe-Stacks blijven de secties aansturen.',
  good:'Passend',warning:'Let op',conflict:'Conflict',empty:'Geen tekst',low:'Ruim',medium:'Dicht',high:'Te dicht',none:'Geen conflicten gevonden.',
  states:{active:'Actief',caution:'Actief · Let op',blocked:'Niet toegepast',forced:'Geforceerd · Conflict',suppressed:'Instrumentaal',off:'Uit'},
  summaries:{active:'Het volledige helderheidsblok staat vooraan in de STYLE.',caution:'Het blok is actief; controleer de compatibiliteitsmeldingen.',blocked:'Automatisch voegt het blok niet toe wegens een zwaar conflict.',forced:'Het blok staat vooraan ondanks gevonden conflicten.',suppressed:'Vocal Clarity is uitgeschakeld voor instrumentale uitvoer.',off:'De STYLE blijft zonder helderheidsblok.'},
  guidance:{placementTitle:'Live STYLE-volgorde',block:'1–5 · Vocale helderheid',rest:'daarna genre · stem · instrumenten · productie',automaticActive:'Automatisch is actief',useAutomatic:'Automatisch gebruiken',returnAutomatic:'Terug naar Automatisch',tour:'🎓 Toon deze instelling in de rondleiding',placements:{active:'De vijf helderheidstermen staan nu helemaal vooraan.',caution:'Het blok blijft eerst; bekijk de meldingen hieronder.',blocked:'Automatisch laat het blok weg door een zwaar conflict.',forced:'Het blok staat eerst omdat Forceren actief blijft ondanks het conflict.',suppressed:'De instrumentale modus voegt geen vocale instructies toe.',off:'Het blok staat uit en wordt niet toegevoegd.'}}
 },
 pl:{
  kicker:'WYRAŹNOŚĆ WOKALU',title:'Wyraźny i zrozumiały głos',description:'Dodaje blok wyrazistości przed gatunkiem i produkcją, gdy pasuje on do utworu.',
  toggleLabel:'Użyj bloku wyrazistości w STYLE',toggleOn:'Włączony',toggleOff:'Wyłączony',
  whyTitle:'Dlaczego ten blok jest na początku?',whyText:'Pierwsze instrukcje STYLE zwykle mają większą wagę. Te pięć określeń najpierw ustala zrozumiałość i bliskość głosu, zanim gatunek, instrumenty i produkcja ukształtują resztę.',
  broadwayMeaning:'oznacza wyrazistość musicalową, a nie gatunek Broadway.',articulationMeaning:'ułatwia zrozumienie słów i spółgłosek.',closeMicMeaning:'utrzymuje główny wokal sucho, z przodu i blisko.',
  mode:'Tryb zgodności',modeHelp:'Zalecany jest tryb Automatyczny. Wymuszenie świadomie pomija ostrzeżenia; Wyłączony usuwa cały blok.',smart:'Automatyczny (zalecany)',off:'Wyłączony',force:'Zawsze wymuszaj',prefix:'Dokładny blok STYLE',
  genre:'Gatunek',reverb:'Przestrzeń wokalu',lyrics:'Gęstość tekstu',note:'Ten blok należy tylko do globalnego STYLE. Pipe-Stacki nadal sterują sekcjami.',
  good:'Pasuje',warning:'Uwaga',conflict:'Konflikt',empty:'Brak tekstu',low:'Luźny',medium:'Gęsty',high:'Zbyt gęsty',none:'Nie wykryto konfliktów.',
  states:{active:'Aktywny',caution:'Aktywny · Uwaga',blocked:'Nie zastosowano',forced:'Wymuszony · Konflikt',suppressed:'Instrumentalny',off:'Wyłączony'},
  summaries:{active:'Pełny blok wyrazistości znajduje się na początku STYLE.',caution:'Blok jest aktywny; sprawdź uwagi o zgodności.',blocked:'Tryb automatyczny nie dodaje bloku z powodu poważnego konfliktu.',forced:'Blok jest dodany na początku mimo wykrytych konfliktów.',suppressed:'Vocal Clarity jest wyłączone dla wersji instrumentalnej.',off:'STYLE pozostaje bez bloku wyrazistości.'},
  guidance:{placementTitle:'Kolejność STYLE na żywo',block:'1–5 · Wyrazistość wokalu',rest:'potem gatunek · głos · instrumenty · produkcja',automaticActive:'Tryb Automatyczny jest aktywny',useAutomatic:'Użyj Automatycznego',returnAutomatic:'Wróć do Automatycznego',tour:'🎓 Pokaż to ustawienie w przewodniku',placements:{active:'Pięć określeń wyrazistości znajduje się teraz na początku.',caution:'Blok pozostaje pierwszy; sprawdź uwagi poniżej.',blocked:'Tryb Automatyczny pomija blok z powodu poważnego konfliktu.',forced:'Blok jest pierwszy, ponieważ wymuszenie pozostaje aktywne mimo konfliktu.',suppressed:'Tryb instrumentalny nie dodaje instrukcji wokalnych.',off:'Blok jest wyłączony i nie zostaje dodany.'}}
 },
 tr:{
  kicker:'VOKAL NETLİĞİ',title:'Net ve anlaşılır ses',description:'Şarkıya uyduğunda tür ve prodüksiyondan önce tek bir netlik bloğu ekler.',
  toggleLabel:'STYLE içinde netlik bloğunu kullan',toggleOn:'Açık',toggleOff:'Kapalı',
  whyTitle:'Bu blok neden en başta?',whyText:'STYLE’ın başındaki talimatlar genellikle daha fazla ağırlık alır. Bu beş terim, tür, enstrümanlar ve prodüksiyondan önce anlaşılabilirliği ve vokal yakınlığını belirler.',
  broadwayMeaning:'Broadway türünü değil, müzikal tiyatro netliğini ister.',articulationMeaning:'kelimeleri ve ünsüzleri daha anlaşılır tutar.',closeMicMeaning:'ana vokali kuru, önde ve yakın tutar.',
  mode:'Uyumluluk modu',modeHelp:'Otomatik önerilir. Zorla seçeneği uyarıları bilinçli olarak yok sayar; Kapalı tüm bloğu kaldırır.',smart:'Otomatik (önerilen)',off:'Kapalı',force:'Her zaman zorla',prefix:'Tam STYLE bloğu',
  genre:'Tür',reverb:'Vokal alanı',lyrics:'Söz yoğunluğu',note:'Bu blok yalnızca genel STYLE’a aittir. Bölümleri Pipe-Stack’ler yönetmeye devam eder.',
  good:'Uygun',warning:'Uyarı',conflict:'Çakışma',empty:'Söz yok',low:'Rahat',medium:'Yoğun',high:'Çok yoğun',none:'Çakışma bulunmadı.',
  states:{active:'Etkin',caution:'Etkin · Uyarı',blocked:'Uygulanmadı',forced:'Zorlandı · Çakışma',suppressed:'Enstrümantal',off:'Kapalı'},
  summaries:{active:'Tam netlik bloğu STYLE’ın başında.',caution:'Netlik bloğu etkin; uyumluluk notlarını kontrol edin.',blocked:'Otomatik mod ciddi bir çakışma nedeniyle bloğu eklemiyor.',forced:'Bulunan çakışmalara rağmen blok başa ekleniyor.',suppressed:'Vocal Clarity enstrümantal çıktı için kapalıdır.',off:'STYLE netlik bloğu olmadan kalır.'},
  guidance:{placementTitle:'Canlı STYLE sırası',block:'1–5 · Vokal netliği',rest:'ardından tür · ses · enstrümanlar · prodüksiyon',automaticActive:'Otomatik etkin',useAutomatic:'Otomatiği kullan',returnAutomatic:'Otomatiğe dön',tour:'🎓 Bu ayarı turda göster',placements:{active:'Beş netlik terimi şu anda en başta.',caution:'Blok ilk sırada kalır; aşağıdaki uyarıları inceleyin.',blocked:'Otomatik, ciddi bir çakışma nedeniyle bloğu eklemiyor.',forced:'Çakışmaya rağmen Zorla etkin olduğu için blok ilk sırada.',suppressed:'Enstrümantal mod vokal talimatı eklemez.',off:'Blok kapalıdır ve eklenmez.'}}
 },
 ru:{
  kicker:'ЯСНОСТЬ ВОКАЛА',title:'Чёткий и разборчивый голос',description:'Добавляет блок ясности перед жанром и продакшном, если он подходит песне.',
  toggleLabel:'Использовать блок ясности в STYLE',toggleOn:'Включено',toggleOff:'Выключено',
  whyTitle:'Почему этот блок стоит в начале?',whyText:'Первые инструкции STYLE обычно имеют больший вес. Поэтому эти пять терминов сначала задают разборчивость и близость голоса, а затем жанр, инструменты и продакшн формируют остальное звучание.',
  broadwayMeaning:'означает ясность мюзикла, а не жанр Broadway.',articulationMeaning:'делает слова и согласные более разборчивыми.',closeMicMeaning:'сохраняет ведущий вокал сухим, близким и впереди.',
  mode:'Режим совместимости',modeHelp:'Рекомендуется Автоматически. Принудительный режим намеренно игнорирует предупреждения; Выключено удаляет весь блок.',smart:'Автоматически (рекомендуется)',off:'Выключено',force:'Всегда принудительно',prefix:'Точный блок STYLE',
  genre:'Жанр',reverb:'Пространство вокала',lyrics:'Плотность текста',note:'Этот блок относится только к общему STYLE. Секциями по-прежнему управляют Pipe-Stack.',
  good:'Подходит',warning:'Внимание',conflict:'Конфликт',empty:'Нет текста',low:'Свободно',medium:'Плотно',high:'Слишком плотно',none:'Конфликты не обнаружены.',
  states:{active:'Активно',caution:'Активно · Внимание',blocked:'Не применено',forced:'Принудительно · Конфликт',suppressed:'Инструментал',off:'Выключено'},
  summaries:{active:'Полный блок ясности стоит в начале STYLE.',caution:'Блок активен; проверьте замечания о совместимости.',blocked:'Автоматический режим не добавляет блок из-за серьёзного конфликта.',forced:'Блок добавлен в начало несмотря на обнаруженные конфликты.',suppressed:'Vocal Clarity отключён для инструментального результата.',off:'STYLE остаётся без блока ясности.'},
  guidance:{placementTitle:'Порядок STYLE в реальном времени',block:'1–5 · Ясность вокала',rest:'затем жанр · голос · инструменты · продакшн',automaticActive:'Автоматический режим активен',useAutomatic:'Использовать Автоматически',returnAutomatic:'Вернуться к Автоматически',tour:'🎓 Показать эту настройку в туре',placements:{active:'Пять терминов ясности сейчас стоят в самом начале.',caution:'Блок остаётся первым; проверьте замечания ниже.',blocked:'Автоматический режим пропускает блок из-за серьёзного конфликта.',forced:'Блок стоит первым, потому что принудительный режим активен несмотря на конфликт.',suppressed:'Инструментальный режим не добавляет вокальные инструкции.',off:'Блок выключен и не добавляется.'}}
 },
 ja:{
  kicker:'ボーカルの明瞭さ',title:'明瞭で聞き取りやすい声',description:'曲に合う場合、ジャンルや制作指示より前に明瞭化ブロックを追加します。',
  toggleLabel:'STYLEで明瞭化ブロックを使う',toggleOn:'オン',toggleOff:'オフ',
  whyTitle:'なぜこのブロックが最初にあるのですか？',whyText:'STYLEの早い位置にある指示は、通常より強く扱われます。そのため、この5つの語で先に言葉の明瞭さと声の距離を決め、その後にジャンル、楽器、制作方法を指定します。',
  broadwayMeaning:'Broadwayジャンルではなく、ミュージカルの明瞭さを求めます。',articulationMeaning:'言葉と子音を聞き取りやすくします。',closeMicMeaning:'リードをドライで前方、近い声に保ちます。',
  mode:'互換性モード',modeHelp:'自動を推奨します。強制は警告を意図的に無視し、オフはブロック全体を削除します。',smart:'自動（推奨）',off:'オフ',force:'常に強制',prefix:'正確なSTYLEブロック',
  genre:'ジャンル',reverb:'声の空間',lyrics:'歌詞の密度',note:'このブロックは全体のSTYLE専用です。各セクションは引き続きPipe-Stackで指示します。',
  good:'適合',warning:'注意',conflict:'競合',empty:'歌詞なし',low:'余裕あり',medium:'密集',high:'密集しすぎ',none:'競合はありません。',
  states:{active:'有効',caution:'有効・注意',blocked:'未適用',forced:'強制・競合',suppressed:'インストゥルメンタル',off:'オフ'},
  summaries:{active:'完全な明瞭化ブロックがSTYLEの先頭にあります。',caution:'ブロックは有効です。互換性の注意を確認してください。',blocked:'強い競合があるため、自動モードはブロックを追加しません。',forced:'競合があってもブロックを先頭に追加します。',suppressed:'インストゥルメンタル出力ではVocal Clarityは無効です。',off:'STYLEに明瞭化ブロックはありません。'},
  guidance:{placementTitle:'現在のSTYLE順序',block:'1–5 · ボーカル明瞭化',rest:'その後 ジャンル · 声 · 楽器 · 制作',automaticActive:'自動が有効です',useAutomatic:'自動を使う',returnAutomatic:'自動に戻す',tour:'🎓 この設定をツアーで表示',placements:{active:'5つの明瞭化語が現在STYLEの先頭にあります。',caution:'ブロックは先頭のままです。下の注意を確認してください。',blocked:'強い競合があるため、自動はブロックを追加しません。',forced:'競合があっても強制が有効なためブロックは先頭です。',suppressed:'インストゥルメンタルではボーカル指示を追加しません。',off:'ブロックはオフで追加されません。'}}
 },
 ko:{
  kicker:'보컬 명료도',title:'선명하고 이해하기 쉬운 목소리',description:'곡에 맞을 때 장르와 프로덕션보다 앞에 명료도 블록을 추가합니다.',
  toggleLabel:'STYLE에서 명료도 블록 사용',toggleOn:'켜짐',toggleOff:'꺼짐',
  whyTitle:'왜 이 블록이 맨 앞에 있나요?',whyText:'STYLE 앞부분의 지시는 보통 더 큰 비중을 받습니다. 그래서 이 다섯 용어로 먼저 발음과 보컬 거리를 정한 뒤 장르, 악기와 프로덕션이 나머지 소리를 만듭니다.',
  broadwayMeaning:'Broadway 장르가 아니라 뮤지컬식 명료함을 요청합니다.',articulationMeaning:'단어와 자음을 더 쉽게 알아듣게 합니다.',closeMicMeaning:'리드 보컬을 건조하고 앞쪽이며 가깝게 유지합니다.',
  mode:'호환 모드',modeHelp:'자동을 권장합니다. 강제는 경고를 의도적으로 무시하고, 꺼짐은 전체 블록을 제거합니다.',smart:'자동(권장)',off:'꺼짐',force:'항상 강제',prefix:'정확한 STYLE 블록',
  genre:'장르',reverb:'보컬 공간',lyrics:'가사 밀도',note:'이 블록은 전체 STYLE에만 사용합니다. 각 구간 지시는 계속 Pipe-Stack이 담당합니다.',
  good:'적합',warning:'주의',conflict:'충돌',empty:'가사 없음',low:'여유',medium:'빽빽함',high:'너무 빽빽함',none:'충돌이 없습니다.',
  states:{active:'활성',caution:'활성 · 주의',blocked:'적용 안 됨',forced:'강제 · 충돌',suppressed:'연주곡',off:'꺼짐'},
  summaries:{active:'전체 명료도 블록이 STYLE 맨 앞에 있습니다.',caution:'블록이 활성화되었습니다. 호환성 안내를 확인하세요.',blocked:'큰 충돌 때문에 자동 모드가 블록을 추가하지 않습니다.',forced:'감지된 충돌에도 블록을 맨 앞에 추가합니다.',suppressed:'연주곡 출력에서는 Vocal Clarity가 비활성화됩니다.',off:'STYLE에 명료도 블록이 없습니다.'},
  guidance:{placementTitle:'실시간 STYLE 순서',block:'1–5 · 보컬 명료도',rest:'그다음 장르 · 목소리 · 악기 · 프로덕션',automaticActive:'자동이 활성화됨',useAutomatic:'자동 사용',returnAutomatic:'자동으로 돌아가기',tour:'🎓 투어에서 이 설정 보기',placements:{active:'다섯 명료도 용어가 현재 맨 앞에 있습니다.',caution:'블록은 맨 앞에 유지됩니다. 아래 주의를 확인하세요.',blocked:'큰 충돌 때문에 자동이 블록을 추가하지 않습니다.',forced:'충돌에도 강제가 활성화되어 블록이 맨 앞에 있습니다.',suppressed:'연주곡 모드는 보컬 지시를 추가하지 않습니다.',off:'블록이 꺼져 있어 추가되지 않습니다.'}}
 },
 'zh-CN':{
  kicker:'人声清晰度',title:'清晰且易懂的人声',description:'在适合歌曲时，将清晰度指令放在流派与制作之前。',
  toggleLabel:'在 STYLE 中使用清晰度指令块',toggleOn:'开启',toggleOff:'关闭',
  whyTitle:'为什么这个指令块放在最前面？',whyText:'STYLE 前面的指令通常权重更高。因此，这五个词先确定吐字清晰度和人声距离，再由流派、乐器与制作塑造其余声音。',
  broadwayMeaning:'要求音乐剧式清晰度，并不是指定 Broadway 流派。',articulationMeaning:'让歌词和辅音更容易听清。',closeMicMeaning:'让主唱保持干声、靠前且贴近。',
  mode:'兼容模式',modeHelp:'建议使用“自动”。“强制”会有意忽略兼容警告；“关闭”会移除整个指令块。',smart:'自动（推荐）',off:'关闭',force:'始终强制',prefix:'完整 STYLE 指令块',
  genre:'流派',reverb:'人声空间',lyrics:'歌词密度',note:'此指令块只属于全局 STYLE。各段落仍由 Pipe-Stack 负责。',
  good:'适合',warning:'注意',conflict:'冲突',empty:'无歌词',low:'宽松',medium:'密集',high:'过于密集',none:'未检测到冲突。',
  states:{active:'已启用',caution:'已启用 · 注意',blocked:'未应用',forced:'已强制 · 冲突',suppressed:'纯音乐',off:'已关闭'},
  summaries:{active:'完整清晰度指令块位于 STYLE 最前面。',caution:'指令块已启用；请检查兼容提示。',blocked:'由于严重冲突，自动模式未插入该指令块。',forced:'即使检测到冲突，仍将指令块放在最前面。',suppressed:'纯音乐输出会停用 Vocal Clarity。',off:'STYLE 中没有清晰度指令块。'},
  guidance:{placementTitle:'实时 STYLE 顺序',block:'1–5 · 人声清晰度',rest:'随后是流派 · 人声 · 乐器 · 制作',automaticActive:'自动模式已启用',useAutomatic:'使用自动模式',returnAutomatic:'返回自动模式',tour:'🎓 在引导中显示此设置',placements:{active:'五项清晰度指令当前位于最前面。',caution:'指令块仍位于最前；请查看下方提示。',blocked:'由于严重冲突，自动模式会省略该指令块。',forced:'即使有冲突，强制模式仍让指令块位于最前。',suppressed:'纯音乐模式不会加入人声指令。',off:'指令块已关闭，不会插入。'}}
 }
};

const ISSUE_MESSAGES={
 en:{
  'instrumental-mode':'Instrumental mode contains no vocal direction, so the clarity block stays off.',
  'murky-vocal-treatment':'The current vocal style explicitly asks for blurred or hidden vocals.',
  'murky-genre':'This genre usually relies on intentionally embedded or murky vocals.',
  'murky-genre-caution':'This genre often uses soft or spacious vocals; strong clarity can change its character.',
  'heavy-vocal-reverb':'Strong vocal reverb conflicts with a dry, close lead vocal.',
  'heavy-global-reverb':'The heavily reverberant overall space competes with a dry, close lead vocal.',
  'reverb-caution':'Spatial terms are present. Keep them restrained behind the clarity priority.',
  'high-lyric-density':'The lyrics are too dense for reliable articulation. Shorter lines or more pauses will help.',
  'medium-lyric-density':'Some lyric lines are dense. Clarity helps, but the voice still needs rhythmic space.'
 },
 de:{
  'instrumental-mode':'Der Instrumental-Modus enthält keine Vocal-Regie; deshalb bleibt der Klarheitsblock aus.',
  'murky-vocal-treatment':'Der aktuelle Vocal-Stil verlangt ausdrücklich verwaschene oder verdeckte Stimmen.',
  'murky-genre':'Dieses Genre lebt meist von absichtlich eingebetteten oder verwaschenen Vocals.',
  'murky-genre-caution':'Dieses Genre nutzt oft weiche oder räumliche Vocals; starke Klarheit kann seinen Charakter verändern.',
  'heavy-vocal-reverb':'Starker Vocal-Reverb widerspricht einer trockenen, nahen Hauptstimme.',
  'heavy-global-reverb':'Der stark verhallte Gesamtraum konkurriert mit einer trockenen, nahen Hauptstimme.',
  'reverb-caution':'Räumliche Begriffe sind vorhanden. Sie sollten hinter der Klarheitspriorität sparsam bleiben.',
  'high-lyric-density':'Die Lyrics sind zu dicht für zuverlässige Artikulation. Kürzere Zeilen oder mehr Pausen helfen.',
  'medium-lyric-density':'Einige Lyrics-Zeilen sind dicht. Klarheit hilft, aber die Stimme braucht weiterhin rhythmische Luft.'
 },
 fr:{
  'instrumental-mode':'Le mode instrumental ne contient aucune direction vocale ; le bloc de clarté reste donc désactivé.',
  'murky-vocal-treatment':'Le style vocal actuel demande explicitement une voix floue ou dissimulée.',
  'murky-genre':'Ce genre repose souvent sur des voix volontairement enfouies ou troubles.',
  'murky-genre-caution':'Ce genre utilise souvent des voix douces ou amples ; une forte clarté peut changer son caractère.',
  'heavy-vocal-reverb':'Une forte réverbération vocale contredit une voix principale sèche et proche.',
  'heavy-global-reverb':'L’espace général très réverbéré concurrence une voix principale sèche et proche.',
  'reverb-caution':'Des termes spatiaux sont présents. Gardez-les discrets derrière la priorité de clarté.',
  'high-lyric-density':'Les paroles sont trop denses pour une articulation fiable. Des lignes plus courtes ou plus de pauses aideront.',
  'medium-lyric-density':'Certaines lignes sont denses. La clarté aide, mais la voix a toujours besoin d’espace rythmique.'
 },
 es:{
  'instrumental-mode':'El modo instrumental no contiene dirección vocal, por eso el bloque de claridad permanece desactivado.',
  'murky-vocal-treatment':'El estilo vocal actual pide expresamente voces borrosas u ocultas.',
  'murky-genre':'Este género suele depender de voces intencionadamente integradas o difusas.',
  'murky-genre-caution':'Este género suele usar voces suaves o espaciosas; una claridad fuerte puede cambiar su carácter.',
  'heavy-vocal-reverb':'Una reverberación vocal fuerte contradice una voz principal seca y cercana.',
  'heavy-global-reverb':'El espacio general con mucha reverberación compite con una voz principal seca y cercana.',
  'reverb-caution':'Hay términos espaciales. Mantenlos moderados detrás de la prioridad de claridad.',
  'high-lyric-density':'La letra es demasiado densa para una articulación fiable. Ayudarán líneas más cortas o más pausas.',
  'medium-lyric-density':'Algunas líneas son densas. La claridad ayuda, pero la voz sigue necesitando espacio rítmico.'
 },
 it:{
  'instrumental-mode':'La modalità strumentale non contiene indicazioni vocali, quindi il blocco di chiarezza resta disattivato.',
  'murky-vocal-treatment':'Lo stile vocale attuale richiede esplicitamente voci sfocate o nascoste.',
  'murky-genre':'Questo genere usa spesso voci volutamente immerse o poco definite.',
  'murky-genre-caution':'Questo genere usa spesso voci morbide o spaziose; una forte chiarezza può cambiarne il carattere.',
  'heavy-vocal-reverb':'Un forte riverbero vocale contrasta con una voce principale asciutta e vicina.',
  'heavy-global-reverb':'Lo spazio generale molto riverberato compete con una voce principale asciutta e vicina.',
  'reverb-caution':'Sono presenti termini spaziali. Mantienili moderati dietro la priorità di chiarezza.',
  'high-lyric-density':'Il testo è troppo denso per un’articolazione affidabile. Aiutano righe più brevi o più pause.',
  'medium-lyric-density':'Alcune righe sono dense. La chiarezza aiuta, ma la voce necessita ancora di spazio ritmico.'
 },
 pt:{
  'instrumental-mode':'O modo instrumental não contém direção vocal, por isso o bloco de clareza fica desligado.',
  'murky-vocal-treatment':'O estilo vocal atual pede explicitamente vozes difusas ou escondidas.',
  'murky-genre':'Este género depende muitas vezes de vozes intencionalmente integradas ou difusas.',
  'murky-genre-caution':'Este género usa frequentemente vozes suaves ou espaçosas; muita clareza pode mudar o seu caráter.',
  'heavy-vocal-reverb':'Uma reverberação vocal forte entra em conflito com uma voz principal seca e próxima.',
  'heavy-global-reverb':'O espaço geral muito reverberante compete com uma voz principal seca e próxima.',
  'reverb-caution':'Existem termos espaciais. Mantenha-os moderados atrás da prioridade de clareza.',
  'high-lyric-density':'A letra é demasiado densa para uma articulação fiável. Linhas mais curtas ou mais pausas ajudam.',
  'medium-lyric-density':'Algumas linhas são densas. A clareza ajuda, mas a voz continua a precisar de espaço rítmico.'
 },
 'pt-BR':{
  'instrumental-mode':'O modo instrumental não contém direção vocal, por isso o bloco de clareza fica desligado.',
  'murky-vocal-treatment':'O estilo vocal atual pede explicitamente vocais difusos ou escondidos.',
  'murky-genre':'Este gênero costuma depender de vocais propositalmente integrados ou difusos.',
  'murky-genre-caution':'Este gênero costuma usar vocais suaves ou espaçosos; muita clareza pode mudar seu caráter.',
  'heavy-vocal-reverb':'Um reverb vocal forte entra em conflito com um vocal principal seco e próximo.',
  'heavy-global-reverb':'O espaço geral com muito reverb compete com um vocal principal seco e próximo.',
  'reverb-caution':'Há termos espaciais. Mantenha-os moderados atrás da prioridade de clareza.',
  'high-lyric-density':'A letra está densa demais para uma articulação confiável. Linhas menores ou mais pausas ajudam.',
  'medium-lyric-density':'Algumas linhas estão densas. A clareza ajuda, mas o vocal ainda precisa de espaço rítmico.'
 },
 nl:{
  'instrumental-mode':'De instrumentale modus bevat geen vocale regie, dus het helderheidsblok blijft uit.',
  'murky-vocal-treatment':'De huidige vocale stijl vraagt uitdrukkelijk om wazige of verborgen zang.',
  'murky-genre':'Dit genre steunt vaak op bewust ingebedde of wazige zang.',
  'murky-genre-caution':'Dit genre gebruikt vaak zachte of ruimtelijke zang; sterke helderheid kan het karakter veranderen.',
  'heavy-vocal-reverb':'Sterke vocale galm botst met droge, nabije leadzang.',
  'heavy-global-reverb':'De sterk galmende totaalruimte concurreert met droge, nabije leadzang.',
  'reverb-caution':'Er zijn ruimtelijke termen. Houd ze beperkt achter de helderheidsprioriteit.',
  'high-lyric-density':'De tekst is te dicht voor betrouwbare articulatie. Kortere regels of meer pauzes helpen.',
  'medium-lyric-density':'Sommige regels zijn dicht. Helderheid helpt, maar de stem heeft nog ritmische ruimte nodig.'
 },
 pl:{
  'instrumental-mode':'Tryb instrumentalny nie zawiera prowadzenia wokalu, więc blok wyrazistości pozostaje wyłączony.',
  'murky-vocal-treatment':'Obecny styl wokalu wyraźnie wymaga zamazanego lub ukrytego głosu.',
  'murky-genre':'Ten gatunek często opiera się na celowo schowanym lub zamazanym wokalu.',
  'murky-genre-caution':'Ten gatunek często używa miękkiego lub przestrzennego wokalu; silna wyrazistość może zmienić jego charakter.',
  'heavy-vocal-reverb':'Mocny pogłos wokalu koliduje z suchym i bliskim wokalem głównym.',
  'heavy-global-reverb':'Mocno pogłosowa cała przestrzeń konkuruje z suchym i bliskim wokalem głównym.',
  'reverb-caution':'Występują określenia przestrzenne. Ogranicz je za priorytetem wyrazistości.',
  'high-lyric-density':'Tekst jest zbyt gęsty dla pewnej artykulacji. Pomogą krótsze wersy lub więcej przerw.',
  'medium-lyric-density':'Niektóre wersy są gęste. Wyrazistość pomaga, ale głos nadal potrzebuje rytmicznej przestrzeni.'
 },
 tr:{
  'instrumental-mode':'Enstrümantal mod vokal yönlendirmesi içermez; bu nedenle netlik bloğu kapalı kalır.',
  'murky-vocal-treatment':'Mevcut vokal stili açıkça bulanık veya gizli vokaller istiyor.',
  'murky-genre':'Bu tür çoğunlukla bilinçli olarak gömülü veya bulanık vokallere dayanır.',
  'murky-genre-caution':'Bu tür sıkça yumuşak veya geniş vokaller kullanır; güçlü netlik karakterini değiştirebilir.',
  'heavy-vocal-reverb':'Güçlü vokal yankısı kuru ve yakın ana vokalle çakışır.',
  'heavy-global-reverb':'Yoğun yankılı genel alan kuru ve yakın ana vokalle rekabet eder.',
  'reverb-caution':'Mekânsal terimler var. Bunları netlik önceliğinin arkasında sınırlı tutun.',
  'high-lyric-density':'Sözler güvenilir artikülasyon için fazla yoğun. Daha kısa satırlar veya daha fazla duraklama yardımcı olur.',
  'medium-lyric-density':'Bazı söz satırları yoğun. Netlik yardımcı olur ancak sesin ritmik alana ihtiyacı vardır.'
 },
 ru:{
  'instrumental-mode':'Инструментальный режим не содержит вокальных указаний, поэтому блок ясности остаётся выключенным.',
  'murky-vocal-treatment':'Текущий вокальный стиль прямо требует размытого или скрытого голоса.',
  'murky-genre':'Этот жанр часто опирается на намеренно утопленный или размытый вокал.',
  'murky-genre-caution':'Этот жанр часто использует мягкий или пространственный вокал; сильная ясность может изменить его характер.',
  'heavy-vocal-reverb':'Сильная реверберация вокала конфликтует с сухим и близким ведущим голосом.',
  'heavy-global-reverb':'Сильно реверберирующее общее пространство конкурирует с сухим и близким ведущим голосом.',
  'reverb-caution':'Присутствуют пространственные термины. Ограничьте их после приоритета ясности.',
  'high-lyric-density':'Текст слишком плотный для надёжной артикуляции. Помогут короткие строки или дополнительные паузы.',
  'medium-lyric-density':'Некоторые строки плотные. Ясность помогает, но голосу всё равно нужно ритмическое пространство.'
 },
 ja:{
  'instrumental-mode':'インストゥルメンタルにはボーカル指示がないため、明瞭化ブロックはオフになります。',
  'murky-vocal-treatment':'現在のボーカルスタイルは、ぼやけた声や隠れた声を明確に求めています。',
  'murky-genre':'このジャンルは、意図的に埋もれた、またはぼやけたボーカルをよく使います。',
  'murky-genre-caution':'このジャンルは柔らかく広がる声をよく使うため、強い明瞭さで印象が変わる場合があります。',
  'heavy-vocal-reverb':'強いボーカルリバーブは、ドライで近いリードボーカルと競合します。',
  'heavy-global-reverb':'全体の強い残響は、ドライで近いリードボーカルと競合します。',
  'reverb-caution':'空間系の語があります。明瞭さの優先度より後で控えめにしてください。',
  'high-lyric-density':'歌詞が密集しすぎて、安定した発音が難しくなっています。短い行や間を増やしてください。',
  'medium-lyric-density':'一部の歌詞行が密集しています。明瞭化は役立ちますが、声にはリズム上の余白も必要です。'
 },
 ko:{
  'instrumental-mode':'연주곡 모드에는 보컬 지시가 없으므로 명료도 블록이 꺼집니다.',
  'murky-vocal-treatment':'현재 보컬 스타일이 흐리거나 숨겨진 목소리를 명시적으로 요구합니다.',
  'murky-genre':'이 장르는 의도적으로 묻히거나 흐린 보컬을 자주 사용합니다.',
  'murky-genre-caution':'이 장르는 부드럽고 공간감 있는 보컬을 자주 사용하므로 강한 명료도가 성격을 바꿀 수 있습니다.',
  'heavy-vocal-reverb':'강한 보컬 리버브는 건조하고 가까운 리드 보컬과 충돌합니다.',
  'heavy-global-reverb':'전체 공간의 강한 잔향이 건조하고 가까운 리드 보컬과 경쟁합니다.',
  'reverb-caution':'공간 관련 용어가 있습니다. 명료도 우선순위 뒤에서 절제해 사용하세요.',
  'high-lyric-density':'가사가 너무 빽빽해 안정적인 발음이 어렵습니다. 짧은 줄이나 더 많은 쉼이 도움이 됩니다.',
  'medium-lyric-density':'일부 가사 줄이 빽빽합니다. 명료도는 도움이 되지만 목소리에 리듬 여백도 필요합니다.'
 },
 'zh-CN':{
  'instrumental-mode':'纯音乐模式不包含人声指导，因此清晰度指令块会保持关闭。',
  'murky-vocal-treatment':'当前人声风格明确要求模糊或隐藏的人声。',
  'murky-genre':'此流派通常依赖刻意埋入或模糊的人声。',
  'murky-genre-caution':'此流派常使用柔和或宽广的人声；过强的清晰度可能改变其特点。',
  'heavy-vocal-reverb':'强烈的人声混响与干燥、贴近的主唱冲突。',
  'heavy-global-reverb':'整体空间的强烈混响会与干燥、贴近的主唱竞争。',
  'reverb-caution':'检测到空间类词语。请让它们排在清晰度优先级之后并保持克制。',
  'high-lyric-density':'歌词过于密集，难以稳定吐字。缩短句子或增加停顿会有帮助。',
  'medium-lyric-density':'部分歌词较密集。清晰度会有帮助，但人声仍需要节奏空间。'
 }
};

const ISSUE_CODES=Object.freeze(Object.keys(ISSUE_MESSAGES.en));

function deepFreeze(value){
 if(!value||typeof value!=='object'||Object.isFrozen(value))return value;
 Object.values(value).forEach(deepFreeze);
 return Object.freeze(value);
}
deepFreeze(DATA);
deepFreeze(ISSUE_MESSAGES);

function languageOf(raw){
 const value=String(raw||'en').replace('_','-');
 if(DATA[value])return value;
 const exact=LANGUAGES.find(code=>code.toLowerCase()===value.toLowerCase());
 if(exact)return exact;
 const base=value.toLowerCase().split('-')[0];
 return LANGUAGES.find(code=>code.toLowerCase().split('-')[0]===base)||'en';
}

function record(raw){return DATA[languageOf(raw)]||DATA.en}
function issueMessage(raw,code){const language=languageOf(raw);return ISSUE_MESSAGES[language]?.[code]||ISSUE_MESSAGES.en[code]||''}

return Object.freeze({VERSION,LANGUAGES,DATA,ISSUE_CODES,ISSUE_MESSAGES,languageOf,record,issueMessage});
});

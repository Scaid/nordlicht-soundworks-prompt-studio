(function(root,factory){
 const api=factory();
 if(typeof module==='object'&&module.exports)module.exports=api;
 root.NSW_FSE_TOUR_V4_I18N=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';

const LANGUAGES=Object.freeze(['en','de','es','fr','ja','ko','it','pt','pt-BR','ru','zh-CN','tr','nl','pl']);
const TOUR_TIME=Object.freeze({en:'about 6 minutes',de:'ca. 6 Minuten',es:'unos 6 minutos',fr:'environ 6 minutes',it:'circa 6 minuti',pt:'cerca de 6 minutos','pt-BR':'cerca de 6 minutos',nl:'ongeveer 6 minuten',pl:'około 6 minut',tr:'yaklaşık 6 dakika',ru:'около 6 минут',ja:'約6分',ko:'약 6분','zh-CN':'约6分钟'});
const records={
 en:{
  'studio-orientation':['Studio overview','The top bar controls the Studio mode and interface language. The sidebar groups all tools into clear workspaces, while Home provides quick access to favorites and recently used modules.'],
  'workspace-create':['CREATE — ideas and direction','This is where a new song begins. Generate a starting idea, describe your goal, or let a Director coordinate STYLE, vocals, lyrics and the next useful steps.'],
  'workspace-style':['STYLE — sound and vocal clarity','Build and refine the global STYLE prompt here. Genre, mood, voice and production establish the sound; Vocal Clarity can place clear, forward and close-mic vocal guidance early without forcing it on unsuitable styles.'],
  'vocal-clarity':['Vocal Clarity — why it comes first','The five-part block from “Broadway musical clarity” to “close mic” is deliberately placed first because early STYLE instructions usually receive more weight. “Broadway” means musical-theatre intelligibility here, not a Broadway genre; the remaining terms support articulation and a dry, close lead. Use the highlighted switch to turn the whole block on or off. Automatic is recommended; use Force only when you deliberately accept the warnings. The live order below shows immediately whether the block is actually at positions 1–5; the Automatic action safely restores the recommended mode.'],
  'workspace-song':['SONG — arrangement and performance','Turn the sound idea into a complete song plan. Arrangement, vocal roles, music theory and production tools help every section gain a clear purpose and a controlled energy arc.'],
  'lyrics-workspace':['LYRICS — text and Pipe-Stacks','Write and structure the lyrics in the center. Drag a MetaTag from the library into the active section, click ＋ to insert it, and reorder the Pipe-Stack by drag and drop so the most important instruction comes first.'],
  'workspace-knowledge':['KNOWLEDGE — musical reference','Explore genres, instruments, MetaTags, vocals, arrangements and theory here. Use this workspace when you want to understand a term, find compatible elements or build a more authentic musical palette.'],
  'workspace-analysis':['ANALYSIS — inspect and improve','Use these tools to understand an existing STYLE or result. They reveal density, conflicts and weak priorities, then help simplify, compare and improve the prompt without losing its identity.'],
  'workspace-project':['PROJECTS — save and organize','Keep albums, tracks, assets, presets and versions together here. Save a snapshot before major changes so you can compare ideas and return to a strong earlier state.'],
  'live-output':['LIVE OUTPUT — ready to copy','The right panel always shows the current result. Switch between STYLE, LYRICS, METATAGS and EXCLUDE, review the content, then copy only the part you need for Suno.'],
  'studio-intelligence':['Studio Intelligence — the next step','Use Studio Intelligence when the project feels complex or you are unsure how to continue. It reads connected Studio signals, explains strengths and issues in plain language, and recommends a sensible workflow.']
 },
 de:{
  'studio-orientation':['Das Studio im Überblick','Oben wechselst du den Studio-Modus und die Sprache der Oberfläche. Die Seitenleiste ordnet alle Werkzeuge in klare Workspaces; auf der Startseite findest du Favoriten, zuletzt verwendete Module und schnelle Einstiege.'],
  'workspace-create':['CREATE – Ideen und Regie','Hier beginnt ein neuer Song. Erzeuge eine erste Idee, beschreibe dein Ziel oder lasse einen Director STYLE, Vocals, Lyrics und die nächsten sinnvollen Schritte aufeinander abstimmen.'],
  'workspace-style':['STYLE – Klang und klare Stimme','Hier baust und verbesserst du den globalen STYLE-Prompt. Genre, Stimmung, Stimme und Produktion legen den Klang fest; Vocal Clarity kann Hinweise für eine klare, verständliche und nahe Stimme früh einordnen, ohne sie ungeeigneten Stilen aufzuzwingen.'],
  'vocal-clarity':['Vocal Clarity – warum dieser Block zuerst kommt','Der Fünferblock von „Broadway musical clarity“ bis „close mic“ steht absichtlich ganz vorne, weil frühe STYLE-Anweisungen meist mehr Gewicht erhalten. „Broadway“ bedeutet hier Musical-Deutlichkeit und kein Broadway-Genre; die übrigen Begriffe fördern Artikulation sowie eine trockene, nahe Hauptstimme. Mit dem hervorgehobenen Schalter stellst du den gesamten Block ein oder aus. Automatisch wird empfohlen; Erzwingen solltest du nur wählen, wenn du die Warnungen bewusst akzeptierst. Die Live-Reihenfolge darunter zeigt sofort, ob der Block wirklich auf Position 1–5 steht; mit der Automatik-Aktion kehrst du sicher zur Empfehlung zurück.'],
  'workspace-song':['SONG – Aufbau und Performance','Aus der Klangidee wird hier ein vollständiger Songplan. Arrangement, Vocal-Rollen, Musiktheorie und Produktion geben jedem Abschnitt eine klare Aufgabe und sorgen für einen kontrollierten Energiebogen.'],
  'lyrics-workspace':['LYRICS – Text und Pipe-Stacks','In der Mitte schreibst und strukturierst du den Songtext. Ziehe ein MetaTag aus der Bibliothek in den aktiven Abschnitt oder füge es mit ＋ ein; im Pipe-Stack änderst du die Reihenfolge per Drag & Drop, damit die wichtigste Anweisung zuerst steht.'],
  'workspace-knowledge':['KNOWLEDGE – Musikwissen','Hier findest du Wissen zu Genres, Instrumenten, MetaTags, Vocals, Arrangements und Musiktheorie. Nutze diesen Workspace, wenn du einen Begriff verstehen, passende Elemente finden oder eine authentischere Klangpalette aufbauen möchtest.'],
  'workspace-analysis':['ANALYSIS – Prüfen und verbessern','Diese Werkzeuge untersuchen einen vorhandenen STYLE oder ein Ergebnis. Sie zeigen Dichte, Konflikte und unklare Prioritäten und helfen dir anschließend beim Vereinfachen, Vergleichen und gezielten Verbessern.'],
  'workspace-project':['PROJECTS – Sichern und ordnen','Hier bleiben Alben, Tracks, Dateien, Presets und Versionen zusammen. Speichere vor größeren Änderungen einen Zwischenstand, damit du Ideen vergleichen und jederzeit zu einer guten Version zurückkehren kannst.'],
  'live-output':['LIVE OUTPUT – direkt kopierbar','Rechts siehst du immer das aktuelle Ergebnis. Wechsle zwischen STYLE, LYRICS, METATAGS und EXCLUDE, prüfe den Inhalt und kopiere anschließend genau den Teil, den du in Suno brauchst.'],
  'studio-intelligence':['Studio Intelligence – der nächste Schritt','Nutze Studio Intelligence, wenn das Projekt unübersichtlich wird oder du nicht weißt, wie es weitergeht. Es liest die verbundenen Studio-Signale, erklärt Stärken und Probleme einfach und empfiehlt eine sinnvolle Reihenfolge.']
 },
 es:{
  'studio-orientation':['Vista general del estudio','La barra superior controla el modo del estudio y el idioma de la interfaz. La barra lateral agrupa las herramientas por áreas, y Inicio ofrece accesos rápidos, favoritos y módulos recientes.'],
  'workspace-create':['CREATE — ideas y dirección','Aquí comienza una canción nueva. Genera una idea, describe tu objetivo o deja que un Director coordine STYLE, voces, letra y los siguientes pasos.'],
  'workspace-style':['STYLE — sonido y voz clara','Aquí construyes y mejoras el STYLE global. El género, el ambiente, la voz y la producción definen el sonido; Vocal Clarity puede colocar al principio indicaciones de voz clara, cercana y comprensible sin forzarlas en estilos inadecuados.'],
  'vocal-clarity':['Vocal Clarity — por qué aparece primero','El bloque de cinco partes, desde “Broadway musical clarity” hasta “close mic”, se coloca primero porque las instrucciones iniciales de STYLE suelen tener más peso. “Broadway” significa claridad de teatro musical, no un género Broadway; los demás términos favorecen la articulación y una voz principal seca y cercana. Usa el interruptor resaltado para activar o desactivar todo el bloque. Se recomienda Automático; usa Forzar solo si aceptas conscientemente los avisos. El orden en directo muestra si el bloque ocupa realmente las posiciones 1–5; la acción Automático restaura el modo recomendado de forma segura.'],
  'workspace-song':['SONG — estructura e interpretación','Convierte la idea sonora en un plan completo. El arreglo, los roles vocales, la teoría y la producción dan una función clara a cada sección y controlan la energía.'],
  'lyrics-workspace':['LYRICS — texto y Pipe-Stacks','Escribe y organiza la letra en el centro. Arrastra un MetaTag al bloque activo o insértalo con ＋; después ordena el Pipe-Stack con arrastrar y soltar para colocar primero la instrucción más importante.'],
  'workspace-knowledge':['KNOWLEDGE — referencia musical','Explora géneros, instrumentos, MetaTags, voces, arreglos y teoría. Úsalo para comprender un término, buscar elementos compatibles o crear una paleta más auténtica.'],
  'workspace-analysis':['ANALYSIS — revisar y mejorar','Estas herramientas examinan un STYLE o resultado existente. Detectan densidad, conflictos y prioridades débiles, y ayudan a simplificar y mejorar sin perder la identidad.'],
  'workspace-project':['PROJECTS — guardar y organizar','Reúne aquí álbumes, pistas, archivos, preajustes y versiones. Guarda una instantánea antes de cambios grandes para comparar ideas y volver a un estado anterior.'],
  'live-output':['LIVE OUTPUT — listo para copiar','El panel derecho muestra siempre el resultado actual. Cambia entre STYLE, LYRICS, METATAGS y EXCLUDE, revisa el contenido y copia solo lo que necesites para Suno.'],
  'studio-intelligence':['Studio Intelligence — el siguiente paso','Úsalo cuando el proyecto sea complejo o no sepas cómo continuar. Lee las señales conectadas, explica fortalezas y problemas con palabras sencillas y recomienda un flujo útil.']
 },
 fr:{
  'studio-orientation':['Vue d’ensemble du studio','La barre supérieure contrôle le mode du studio et la langue de l’interface. La barre latérale regroupe les outils par espaces, tandis que l’accueil donne accès aux favoris et aux modules récents.'],
  'workspace-create':['CREATE — idées et direction','Une nouvelle chanson commence ici. Générez une idée, décrivez votre objectif ou laissez un Director coordonner le STYLE, les voix, les paroles et les prochaines étapes.'],
  'workspace-style':['STYLE — son et voix claire','Construisez et affinez ici le STYLE global. Le genre, l’ambiance, la voix et la production définissent le son ; Vocal Clarity peut placer tôt des indications de voix claire, proche et intelligible sans les imposer aux styles inadaptés.'],
  'vocal-clarity':['Vocal Clarity — pourquoi ce bloc vient en premier','Le bloc de cinq éléments, de « Broadway musical clarity » à « close mic », est placé en premier car les premières instructions de STYLE ont généralement plus de poids. « Broadway » indique ici une diction de comédie musicale, pas un genre Broadway ; les autres termes favorisent l’articulation et une voix principale sèche et proche. Utilisez l’interrupteur mis en évidence pour activer ou désactiver tout le bloc. Le mode Automatique est recommandé ; forcez-le seulement si vous acceptez les alertes. L’ordre en direct indique si le bloc occupe réellement les positions 1 à 5 ; l’action Automatique rétablit le mode recommandé en toute sécurité.'],
  'workspace-song':['SONG — structure et interprétation','Transformez l’idée sonore en plan complet. L’arrangement, les rôles vocaux, la théorie et la production donnent un but clair à chaque section et contrôlent la progression d’énergie.'],
  'lyrics-workspace':['LYRICS — texte et Pipe-Stacks','Écrivez et structurez les paroles au centre. Faites glisser un MetaTag vers la section active ou insérez-le avec ＋, puis réorganisez le Pipe-Stack pour placer l’instruction principale en premier.'],
  'workspace-knowledge':['KNOWLEDGE — référence musicale','Explorez les genres, instruments, MetaTags, voix, arrangements et la théorie. Utilisez cet espace pour comprendre un terme, trouver des éléments compatibles ou créer une palette plus authentique.'],
  'workspace-analysis':['ANALYSIS — examiner et améliorer','Ces outils analysent un STYLE ou un résultat existant. Ils révèlent la densité, les conflits et les priorités faibles, puis aident à simplifier et améliorer sans perdre l’identité.'],
  'workspace-project':['PROJECTS — enregistrer et organiser','Regroupez ici albums, pistes, fichiers, préréglages et versions. Enregistrez un instantané avant un grand changement pour comparer les idées et revenir à un état précédent.'],
  'live-output':['LIVE OUTPUT — prêt à copier','Le panneau de droite montre toujours le résultat actuel. Passez de STYLE à LYRICS, METATAGS ou EXCLUDE, vérifiez le contenu et copiez uniquement ce dont vous avez besoin pour Suno.'],
  'studio-intelligence':['Studio Intelligence — prochaine étape','Utilisez-le lorsque le projet devient complexe ou que la suite n’est pas claire. Il lit les signaux connectés, explique simplement les forces et les problèmes, puis recommande un ordre utile.']
 },
 it:{
  'studio-orientation':['Panoramica dello studio','La barra superiore controlla la modalità e la lingua dell’interfaccia. La barra laterale raggruppa gli strumenti in aree chiare, mentre Home mostra preferiti e moduli recenti.'],
  'workspace-create':['CREATE — idee e direzione','Qui nasce un nuovo brano. Genera un’idea, descrivi l’obiettivo oppure lascia che un Director coordini STYLE, voci, testo e prossimi passi.'],
  'workspace-style':['STYLE — suono e voce chiara','Qui costruisci e perfezioni lo STYLE globale. Genere, atmosfera, voce e produzione definiscono il suono; Vocal Clarity può mettere prima indicazioni per una voce chiara, vicina e comprensibile senza imporle agli stili inadatti.'],
  'vocal-clarity':['Vocal Clarity — perché il blocco viene prima','Il blocco di cinque elementi, da “Broadway musical clarity” a “close mic”, viene messo per primo perché le istruzioni iniziali dello STYLE ricevono di solito più peso. “Broadway” indica chiarezza da musical, non un genere Broadway; gli altri termini aiutano articolazione e una voce principale asciutta e vicina. Usa l’interruttore evidenziato per attivare o disattivare tutto il blocco. Automatico è consigliato; usa Forza solo se accetti consapevolmente gli avvisi. L’ordine in tempo reale mostra se il blocco occupa davvero le posizioni 1–5; l’azione Automatico ripristina in sicurezza la modalità consigliata.'],
  'workspace-song':['SONG — struttura e interpretazione','Trasforma l’idea sonora in un piano completo. Arrangiamento, ruoli vocali, teoria e produzione danno uno scopo chiaro a ogni sezione e controllano l’energia.'],
  'lyrics-workspace':['LYRICS — testo e Pipe-Stack','Scrivi e struttura il testo al centro. Trascina un MetaTag nella sezione attiva o inseriscilo con ＋, quindi riordina il Pipe-Stack per mettere per prima l’istruzione più importante.'],
  'workspace-knowledge':['KNOWLEDGE — riferimento musicale','Esplora generi, strumenti, MetaTag, voci, arrangiamenti e teoria. Usalo per capire un termine, trovare elementi compatibili o creare una tavolozza più autentica.'],
  'workspace-analysis':['ANALYSIS — controlla e migliora','Questi strumenti esaminano uno STYLE o un risultato esistente. Rilevano densità, conflitti e priorità deboli e aiutano a semplificare senza perdere l’identità.'],
  'workspace-project':['PROJECTS — salva e organizza','Raccogli qui album, tracce, file, preset e versioni. Salva un’istantanea prima di grandi modifiche per confrontare le idee e tornare a uno stato precedente.'],
  'live-output':['LIVE OUTPUT — pronto da copiare','Il pannello destro mostra sempre il risultato attuale. Passa tra STYLE, LYRICS, METATAGS ed EXCLUDE, controlla il contenuto e copia solo ciò che serve per Suno.'],
  'studio-intelligence':['Studio Intelligence — prossimo passo','Usalo quando il progetto è complesso o non sai come continuare. Legge i segnali collegati, spiega con parole semplici punti forti e problemi e consiglia un ordine utile.']
 },
 pt:{
  'studio-orientation':['Visão geral do estúdio','A barra superior controla o modo e o idioma da interface. A barra lateral agrupa as ferramentas por áreas, enquanto o Início dá acesso a favoritos e módulos recentes.'],
  'workspace-create':['CREATE — ideias e direção','Uma nova música começa aqui. Crie uma ideia, descreva o objetivo ou deixe um Director coordenar STYLE, vozes, letra e os próximos passos.'],
  'workspace-style':['STYLE — som e voz clara','Construa e refine aqui o STYLE global. Género, ambiente, voz e produção definem o som; Vocal Clarity pode colocar cedo indicações de voz clara, próxima e compreensível sem as impor a estilos inadequados.'],
  'vocal-clarity':['Vocal Clarity — porque este bloco vem primeiro','O bloco de cinco partes, de “Broadway musical clarity” a “close mic”, fica no início porque as primeiras instruções do STYLE costumam ter mais peso. “Broadway” significa clareza de teatro musical, não um género Broadway; os restantes termos ajudam a articulação e uma voz principal seca e próxima. Use o interruptor realçado para ligar ou desligar o bloco inteiro. O modo Automático é recomendado; use Forçar apenas se aceitar conscientemente os avisos. A ordem em direto mostra se o bloco ocupa realmente as posições 1–5; a ação Automático repõe com segurança o modo recomendado.'],
  'workspace-song':['SONG — estrutura e interpretação','Transforme a ideia sonora num plano completo. Arranjo, papéis vocais, teoria e produção dão uma função clara a cada secção e controlam a energia.'],
  'lyrics-workspace':['LYRICS — texto e Pipe-Stacks','Escreva e organize a letra no centro. Arraste um MetaTag para a secção ativa ou insira-o com ＋, depois reordene o Pipe-Stack para colocar primeiro a instrução mais importante.'],
  'workspace-knowledge':['KNOWLEDGE — referência musical','Explore géneros, instrumentos, MetaTags, vozes, arranjos e teoria. Use este espaço para compreender um termo, encontrar elementos compatíveis ou criar uma paleta mais autêntica.'],
  'workspace-analysis':['ANALYSIS — verificar e melhorar','Estas ferramentas analisam um STYLE ou resultado existente. Revelam densidade, conflitos e prioridades fracas e ajudam a simplificar sem perder a identidade.'],
  'workspace-project':['PROJECTS — guardar e organizar','Mantenha aqui álbuns, faixas, ficheiros, predefinições e versões. Guarde um instantâneo antes de grandes alterações para comparar ideias e regressar a um estado anterior.'],
  'live-output':['LIVE OUTPUT — pronto a copiar','O painel direito mostra sempre o resultado atual. Alterne entre STYLE, LYRICS, METATAGS e EXCLUDE, reveja o conteúdo e copie apenas o necessário para o Suno.'],
  'studio-intelligence':['Studio Intelligence — próximo passo','Use-o quando o projeto ficar complexo ou não souber como continuar. Lê os sinais ligados, explica pontos fortes e problemas de forma simples e recomenda uma ordem útil.']
 },
 'pt-BR':{
  'studio-orientation':['Visão geral do estúdio','A barra superior controla o modo e o idioma da interface. A barra lateral agrupa as ferramentas por áreas, enquanto o Início mostra favoritos e módulos recentes.'],
  'workspace-create':['CREATE — ideias e direção','Uma nova música começa aqui. Crie uma ideia, descreva o objetivo ou deixe um Director coordenar STYLE, vozes, letra e os próximos passos.'],
  'workspace-style':['STYLE — som e voz clara','Construa e refine aqui o STYLE global. Gênero, clima, voz e produção definem o som; Vocal Clarity pode colocar cedo indicações de voz clara, próxima e compreensível sem forçá-las em estilos inadequados.'],
  'vocal-clarity':['Vocal Clarity — por que este bloco vem primeiro','O bloco de cinco partes, de “Broadway musical clarity” a “close mic”, fica no início porque as primeiras instruções do STYLE costumam ter mais peso. “Broadway” significa clareza de teatro musical, não um gênero Broadway; os outros termos ajudam a articulação e um vocal principal seco e próximo. Use o interruptor destacado para ligar ou desligar o bloco inteiro. Automático é recomendado; use Forçar apenas se aceitar os avisos de propósito. A ordem ao vivo mostra se o bloco ocupa realmente as posições 1–5; a ação Automático restaura com segurança o modo recomendado.'],
  'workspace-song':['SONG — estrutura e interpretação','Transforme a ideia sonora em um plano completo. Arranjo, papéis vocais, teoria e produção dão uma função clara a cada seção e controlam a energia.'],
  'lyrics-workspace':['LYRICS — texto e Pipe-Stacks','Escreva e organize a letra no centro. Arraste um MetaTag para a seção ativa ou insira com ＋; depois reordene o Pipe-Stack para deixar a instrução mais importante primeiro.'],
  'workspace-knowledge':['KNOWLEDGE — referência musical','Explore gêneros, instrumentos, MetaTags, vozes, arranjos e teoria. Use esta área para entender um termo, encontrar elementos compatíveis ou criar uma paleta mais autêntica.'],
  'workspace-analysis':['ANALYSIS — verificar e melhorar','Estas ferramentas analisam um STYLE ou resultado existente. Elas mostram densidade, conflitos e prioridades fracas e ajudam a simplificar sem perder a identidade.'],
  'workspace-project':['PROJECTS — salvar e organizar','Mantenha aqui álbuns, faixas, arquivos, predefinições e versões. Salve um snapshot antes de grandes alterações para comparar ideias e voltar a um estado anterior.'],
  'live-output':['LIVE OUTPUT — pronto para copiar','O painel direito mostra sempre o resultado atual. Alterne entre STYLE, LYRICS, METATAGS e EXCLUDE, revise o conteúdo e copie apenas o necessário para o Suno.'],
  'studio-intelligence':['Studio Intelligence — próximo passo','Use quando o projeto ficar complexo ou você não souber como continuar. Ele lê os sinais conectados, explica pontos fortes e problemas de forma simples e recomenda uma ordem útil.']
 },
 nl:{
  'studio-orientation':['Studio-overzicht','In de bovenbalk kies je de studiostand en de taal van de interface. De zijbalk groepeert alle hulpmiddelen, terwijl Home favorieten en recente modules toont.'],
  'workspace-create':['CREATE — ideeën en richting','Hier begint een nieuw nummer. Maak een idee, beschrijf je doel of laat een Director STYLE, zang, tekst en volgende stappen op elkaar afstemmen.'],
  'workspace-style':['STYLE — klank en heldere zang','Hier bouw en verfijn je de algemene STYLE. Genre, sfeer, stem en productie bepalen de klank; Vocal Clarity kan aanwijzingen voor heldere, nabije en verstaanbare zang vroeg plaatsen zonder ze aan ongeschikte stijlen op te leggen.'],
  'vocal-clarity':['Vocal Clarity — waarom dit blok vooraan staat','Het vijfdelige blok van “Broadway musical clarity” tot “close mic” staat bewust vooraan, omdat vroege STYLE-instructies meestal meer gewicht krijgen. “Broadway” betekent hier musicalhelderheid, niet het Broadway-genre; de andere termen ondersteunen articulatie en droge, nabije leadzang. Met de gemarkeerde schakelaar zet je het volledige blok aan of uit. Automatisch wordt aanbevolen; kies Forceren alleen als je de waarschuwingen bewust accepteert. De live volgorde toont of het blok echt op posities 1–5 staat; de actie Automatisch herstelt veilig de aanbevolen modus.'],
  'workspace-song':['SONG — opbouw en uitvoering','Zet het klankidee om in een compleet songplan. Arrangement, zangrollen, muziektheorie en productie geven elke sectie een duidelijk doel en sturen de energie.'],
  'lyrics-workspace':['LYRICS — tekst en Pipe-Stacks','Schrijf en structureer de tekst in het midden. Sleep een MetaTag naar de actieve sectie of voeg het toe met ＋; verander daarna de Pipe-Stack-volgorde zodat de belangrijkste instructie eerst staat.'],
  'workspace-knowledge':['KNOWLEDGE — muziekreferentie','Verken genres, instrumenten, MetaTags, zang, arrangement en theorie. Gebruik dit om een term te begrijpen, passende elementen te vinden of een authentieker palet te bouwen.'],
  'workspace-analysis':['ANALYSIS — controleren en verbeteren','Deze hulpmiddelen onderzoeken een bestaande STYLE of uitkomst. Ze tonen dichtheid, conflicten en zwakke prioriteiten en helpen vereenvoudigen zonder de identiteit te verliezen.'],
  'workspace-project':['PROJECTS — bewaren en ordenen','Bewaar hier albums, tracks, bestanden, presets en versies. Maak vóór grote wijzigingen een momentopname om ideeën te vergelijken en terug te keren.'],
  'live-output':['LIVE OUTPUT — klaar om te kopiëren','Het rechterpaneel toont steeds het huidige resultaat. Wissel tussen STYLE, LYRICS, METATAGS en EXCLUDE, controleer de inhoud en kopieer alleen wat je voor Suno nodig hebt.'],
  'studio-intelligence':['Studio Intelligence — volgende stap','Gebruik dit als het project ingewikkeld wordt of je niet weet hoe verder. Het leest verbonden signalen, legt sterke en zwakke punten eenvoudig uit en adviseert een nuttige volgorde.']
 },
 pl:{
  'studio-orientation':['Przegląd studia','Górny pasek steruje trybem studia i językiem interfejsu. Pasek boczny grupuje narzędzia w obszary, a strona główna pokazuje ulubione i ostatnie moduły.'],
  'workspace-create':['CREATE — pomysły i kierunek','Tutaj zaczyna się nowy utwór. Utwórz pomysł, opisz cel lub pozwól Directorowi skoordynować STYLE, wokale, tekst i kolejne kroki.'],
  'workspace-style':['STYLE — brzmienie i wyraźny wokal','Tutaj budujesz i poprawiasz globalny STYLE. Gatunek, nastrój, głos i produkcja określają brzmienie; Vocal Clarity może wcześnie dodać wskazówki dla bliskiego i zrozumiałego wokalu bez narzucania ich niepasującym stylom.'],
  'vocal-clarity':['Vocal Clarity — dlaczego ten blok jest pierwszy','Pięcioczęściowy blok od „Broadway musical clarity” do „close mic” jest celowo na początku, ponieważ pierwsze instrukcje STYLE zwykle mają większą wagę. „Broadway” oznacza tu wyrazistość musicalową, a nie gatunek Broadway; pozostałe określenia wspierają artykulację oraz suchy, bliski wokal główny. Wyróżnionym przełącznikiem włączysz lub wyłączysz cały blok. Zalecany jest tryb Automatyczny; wymuszaj tylko wtedy, gdy świadomie akceptujesz ostrzeżenia. Kolejność na żywo pokazuje, czy blok naprawdę zajmuje pozycje 1–5; akcja Automatyczny bezpiecznie przywraca zalecany tryb.'],
  'workspace-song':['SONG — struktura i wykonanie','Zmień pomysł brzmieniowy w pełny plan utworu. Aranżacja, role wokalne, teoria i produkcja nadają każdej sekcji jasny cel i kontrolują energię.'],
  'lyrics-workspace':['LYRICS — tekst i Pipe-Stacki','Pisz i porządkuj tekst w środku. Przeciągnij MetaTag do aktywnej sekcji lub dodaj go przez ＋, a potem ustaw kolejność Pipe-Stacku tak, aby najważniejsza instrukcja była pierwsza.'],
  'workspace-knowledge':['KNOWLEDGE — wiedza muzyczna','Poznawaj gatunki, instrumenty, MetaTagi, wokale, aranżację i teorię. Użyj tego obszaru, aby zrozumieć pojęcie, znaleźć zgodne elementy lub zbudować autentyczniejszą paletę.'],
  'workspace-analysis':['ANALYSIS — sprawdzanie i poprawa','Te narzędzia badają istniejący STYLE lub wynik. Pokazują zagęszczenie, konflikty i słabe priorytety oraz pomagają upraszczać bez utraty tożsamości.'],
  'workspace-project':['PROJECTS — zapis i porządek','Trzymaj tu albumy, utwory, pliki, presety i wersje. Zapisz migawkę przed dużą zmianą, aby porównać pomysły i wrócić do wcześniejszego stanu.'],
  'live-output':['LIVE OUTPUT — gotowe do kopiowania','Prawy panel zawsze pokazuje aktualny wynik. Przełączaj STYLE, LYRICS, METATAGS i EXCLUDE, sprawdź zawartość i skopiuj tylko część potrzebną w Suno.'],
  'studio-intelligence':['Studio Intelligence — kolejny krok','Użyj go, gdy projekt jest złożony lub nie wiesz, co dalej. Odczytuje połączone sygnały, prosto wyjaśnia zalety i problemy oraz poleca sensowną kolejność.']
 },
 tr:{
  'studio-orientation':['Stüdyoya genel bakış','Üst çubuk stüdyo modunu ve arayüz dilini yönetir. Yan çubuk araçları çalışma alanlarına ayırır; Ana Sayfa favorileri ve son kullanılan modülleri gösterir.'],
  'workspace-create':['CREATE — fikir ve yön','Yeni bir şarkı burada başlar. Bir fikir üretin, hedefinizi yazın veya bir Director’ın STYLE, vokal, söz ve sonraki adımları koordine etmesine izin verin.'],
  'workspace-style':['STYLE — ses ve net vokal','Genel STYLE burada kurulur ve geliştirilir. Tür, duygu, ses ve prodüksiyon tonu belirler; Vocal Clarity, uygun olmayan stillere zorlamadan net, yakın ve anlaşılır vokal talimatlarını başa yerleştirebilir.'],
  'vocal-clarity':['Vocal Clarity — bu blok neden önce gelir','“Broadway musical clarity” ile “close mic” arasındaki beş parçalı blok, STYLE’ın başındaki talimatlar genellikle daha fazla ağırlık aldığı için bilinçli olarak öne yerleştirilir. “Broadway” burada bir tür değil, müzikal tiyatro netliği demektir; diğer terimler artikülasyonu ve kuru, yakın ana vokali destekler. Vurgulanan anahtarla tüm bloğu açıp kapatabilirsiniz. Otomatik önerilir; Zorla seçeneğini yalnızca uyarıları bilinçli olarak kabul ediyorsanız kullanın. Canlı sıra bloğun gerçekten 1–5. konumlarda olup olmadığını gösterir; Otomatik eylemi önerilen modu güvenle geri yükler.'],
  'workspace-song':['SONG — yapı ve performans','Ses fikrini tam bir şarkı planına dönüştürün. Aranjman, vokal rolleri, teori ve prodüksiyon her bölüme net bir görev verir ve enerjiyi kontrol eder.'],
  'lyrics-workspace':['LYRICS — söz ve Pipe-Stack','Sözleri ortada yazıp düzenleyin. Bir MetaTag’i etkin bölüme sürükleyin veya ＋ ile ekleyin; sonra en önemli talimat önce gelecek şekilde Pipe-Stack sırasını değiştirin.'],
  'workspace-knowledge':['KNOWLEDGE — müzik başvurusu','Türleri, enstrümanları, MetaTag’leri, vokalleri, aranjmanı ve teoriyi keşfedin. Bir terimi anlamak, uyumlu öğeler bulmak veya daha özgün bir palet kurmak için kullanın.'],
  'workspace-analysis':['ANALYSIS — incele ve geliştir','Bu araçlar mevcut bir STYLE veya sonucu inceler. Yoğunluğu, çelişkileri ve zayıf öncelikleri gösterir; kimliği kaybetmeden sadeleştirmeye yardımcı olur.'],
  'workspace-project':['PROJECTS — kaydet ve düzenle','Albüm, parça, dosya, preset ve sürümleri burada tutun. Büyük değişikliklerden önce anlık görüntü kaydederek fikirleri karşılaştırın ve geri dönün.'],
  'live-output':['LIVE OUTPUT — kopyalamaya hazır','Sağ panel her zaman güncel sonucu gösterir. STYLE, LYRICS, METATAGS ve EXCLUDE arasında geçiş yapın, içeriği kontrol edin ve Suno için gereken kısmı kopyalayın.'],
  'studio-intelligence':['Studio Intelligence — sonraki adım','Proje karmaşıklaştığında veya nasıl devam edeceğiniz belirsiz olduğunda kullanın. Bağlı sinyalleri okur, güçlü ve sorunlu noktaları basitçe açıklar ve yararlı bir sıra önerir.']
 },
 ru:{
  'studio-orientation':['Обзор студии','Верхняя панель управляет режимом студии и языком интерфейса. Боковая панель группирует инструменты по рабочим областям, а главная страница показывает избранное и недавние модули.'],
  'workspace-create':['CREATE — идея и направление','Здесь начинается новая песня. Создайте идею, опишите цель или позвольте Director согласовать STYLE, вокал, текст и следующие шаги.'],
  'workspace-style':['STYLE — звук и ясный вокал','Здесь создаётся и уточняется общий STYLE. Жанр, настроение, голос и продакшен задают звук; Vocal Clarity может поставить в начало указания для ясного, близкого и разборчивого вокала, не навязывая их неподходящим стилям.'],
  'vocal-clarity':['Vocal Clarity — почему этот блок стоит первым','Блок из пяти частей, от «Broadway musical clarity» до «close mic», намеренно стоит в начале: первые инструкции STYLE обычно имеют больший вес. «Broadway» здесь означает ясность мюзикла, а не жанр Broadway; остальные термины поддерживают артикуляцию и сухой, близкий ведущий вокал. Выделенным переключателем можно включить или выключить весь блок. Рекомендуется автоматический режим; принудительный выбирайте только при осознанном принятии предупреждений. Текущий порядок сразу показывает, занимает ли блок позиции 1–5; действие Автоматически безопасно возвращает рекомендуемый режим.'],
  'workspace-song':['SONG — структура и исполнение','Превратите звуковую идею в полный план песни. Аранжировка, вокальные роли, теория и продакшен дают каждой секции понятную задачу и управляют энергией.'],
  'lyrics-workspace':['LYRICS — текст и Pipe-Stack','Пишите и структурируйте текст в центре. Перетащите MetaTag в активную секцию или вставьте через ＋, затем измените порядок Pipe-Stack, чтобы главное указание стояло первым.'],
  'workspace-knowledge':['KNOWLEDGE — музыкальный справочник','Изучайте жанры, инструменты, MetaTag, вокал, аранжировку и теорию. Используйте этот раздел, чтобы понять термин, найти совместимые элементы или собрать более достоверную палитру.'],
  'workspace-analysis':['ANALYSIS — проверка и улучшение','Эти инструменты исследуют существующий STYLE или результат. Они показывают плотность, конфликты и слабые приоритеты и помогают упростить без потери характера.'],
  'workspace-project':['PROJECTS — сохранение и порядок','Храните здесь альбомы, треки, файлы, пресеты и версии. Сохраните снимок перед крупными изменениями, чтобы сравнить идеи и вернуться назад.'],
  'live-output':['LIVE OUTPUT — готово к копированию','Правая панель всегда показывает текущий результат. Переключайтесь между STYLE, LYRICS, METATAGS и EXCLUDE, проверьте содержимое и скопируйте нужную для Suno часть.'],
  'studio-intelligence':['Studio Intelligence — следующий шаг','Используйте его, когда проект усложнился или непонятно, что делать дальше. Он читает связанные сигналы, просто объясняет сильные стороны и проблемы и предлагает полезный порядок.']
 },
 ja:{
  'studio-orientation':['スタジオの概要','上部バーでスタジオモードと表示言語を変更できます。サイドバーはツールをワークスペース別に整理し、ホームにはお気に入りと最近使ったモジュールが表示されます。'],
  'workspace-create':['CREATE — アイデアと方向性','新しい曲はここから始まります。アイデアを作るか目標を説明し、DirectorにSTYLE、ボーカル、歌詞、次の手順をまとめてもらえます。'],
  'workspace-style':['STYLE — サウンドと明瞭な声','全体のSTYLEをここで作り、整えます。ジャンル、ムード、声、制作方法が音を決め、Vocal Clarityは不向きなスタイルに強制せず、明瞭で近く聞き取りやすい声の指示を前方に置けます。'],
  'vocal-clarity':['Vocal Clarity — なぜ最初に置くのか','「Broadway musical clarity」から「close mic」までの5項目は、STYLEの前方にある指示ほど強く扱われやすいため、意図的に先頭へ置かれます。ここでの「Broadway」はジャンルではなくミュージカルの明瞭さを意味し、残りは発音とドライで近いリードを支えます。強調表示されたスイッチでブロック全体をオンまたはオフにできます。自動を推奨し、警告を理解して受け入れる場合だけ強制を使ってください。現在の順序でブロックが本当に1〜5番目か確認でき、自動アクションで推奨モードへ安全に戻せます。'],
  'workspace-song':['SONG — 構成と演奏','音のアイデアを曲全体の計画に変えます。アレンジ、ボーカル役割、音楽理論、制作ツールが各セクションの目的とエネルギーの流れを明確にします。'],
  'lyrics-workspace':['LYRICS — 歌詞とPipe-Stack','中央で歌詞を書き、構成を整えます。MetaTagを有効なセクションへドラッグするか＋で追加し、最重要の指示が先になるようPipe-Stackをドラッグして並べ替えます。'],
  'workspace-knowledge':['KNOWLEDGE — 音楽リファレンス','ジャンル、楽器、MetaTag、ボーカル、アレンジ、理論を調べられます。用語の理解、相性のよい要素の検索、より本格的な音色作りに使います。'],
  'workspace-analysis':['ANALYSIS — 確認と改善','既存のSTYLEや結果を詳しく調べます。密度、矛盾、弱い優先順位を示し、個性を失わずに整理して改善できます。'],
  'workspace-project':['PROJECTS — 保存と整理','アルバム、トラック、ファイル、プリセット、バージョンをまとめます。大きな変更前にスナップショットを保存すると、比較や復元が簡単です。'],
  'live-output':['LIVE OUTPUT — コピーの準備','右側には常に現在の結果が表示されます。STYLE、LYRICS、METATAGS、EXCLUDEを切り替えて確認し、Sunoに必要な部分だけコピーします。'],
  'studio-intelligence':['Studio Intelligence — 次の手順','プロジェクトが複雑なときや次に迷ったときに使います。接続された信号を読み、長所と問題を簡単に説明し、役立つ順序を提案します。']
 },
 ko:{
  'studio-orientation':['스튜디오 개요','상단 막대에서 스튜디오 모드와 인터페이스 언어를 바꿀 수 있습니다. 사이드바는 도구를 작업 영역별로 정리하고 홈은 즐겨찾기와 최근 모듈을 보여 줍니다.'],
  'workspace-create':['CREATE — 아이디어와 방향','새 곡은 여기서 시작합니다. 아이디어를 만들거나 목표를 설명하고 Director가 STYLE, 보컬, 가사와 다음 단계를 조정하도록 할 수 있습니다.'],
  'workspace-style':['STYLE — 사운드와 선명한 보컬','전체 STYLE을 만들고 다듬는 곳입니다. 장르, 분위기, 목소리와 프로덕션이 소리를 정하며 Vocal Clarity는 맞지 않는 스타일에 강요하지 않고 선명하고 가깝고 이해하기 쉬운 보컬 지시를 앞에 배치합니다.'],
  'vocal-clarity':['Vocal Clarity — 이 블록이 먼저 오는 이유','“Broadway musical clarity”부터 “close mic”까지의 다섯 항목은 STYLE 앞부분 지시가 보통 더 큰 비중을 받기 때문에 의도적으로 맨 앞에 둡니다. 여기서 “Broadway”는 장르가 아니라 뮤지컬식 명료함이며, 나머지는 발음과 건조하고 가까운 리드 보컬을 돕습니다. 강조된 스위치로 전체 블록을 켜거나 끌 수 있습니다. 자동을 권장하며, 경고를 이해하고 받아들일 때만 강제를 사용하세요. 실시간 순서에서 블록이 실제로 1–5번 위치인지 확인할 수 있고, 자동 동작으로 권장 모드에 안전하게 돌아갈 수 있습니다.'],
  'workspace-song':['SONG — 구성과 연주','사운드 아이디어를 완전한 곡 계획으로 바꿉니다. 편곡, 보컬 역할, 음악 이론과 프로덕션 도구가 각 섹션의 목적과 에너지 흐름을 명확하게 만듭니다.'],
  'lyrics-workspace':['LYRICS — 가사와 Pipe-Stack','가운데에서 가사를 쓰고 구조를 정리합니다. MetaTag를 활성 섹션으로 드래그하거나 ＋로 넣고, 가장 중요한 지시가 먼저 오도록 Pipe-Stack을 드래그해 순서를 바꾸세요.'],
  'workspace-knowledge':['KNOWLEDGE — 음악 참고 자료','장르, 악기, MetaTag, 보컬, 편곡과 이론을 탐색합니다. 용어를 이해하거나 어울리는 요소를 찾고 더 자연스러운 팔레트를 만들 때 사용하세요.'],
  'workspace-analysis':['ANALYSIS — 검사와 개선','기존 STYLE이나 결과를 조사합니다. 밀도, 충돌과 약한 우선순위를 보여 주고 정체성을 잃지 않으면서 단순화하고 개선하도록 돕습니다.'],
  'workspace-project':['PROJECTS — 저장과 정리','앨범, 트랙, 파일, 프리셋과 버전을 한곳에 보관합니다. 큰 변경 전에 스냅샷을 저장하면 아이디어를 비교하고 이전 상태로 돌아갈 수 있습니다.'],
  'live-output':['LIVE OUTPUT — 복사 준비','오른쪽 패널은 항상 현재 결과를 보여 줍니다. STYLE, LYRICS, METATAGS와 EXCLUDE를 전환해 확인하고 Suno에 필요한 부분만 복사하세요.'],
  'studio-intelligence':['Studio Intelligence — 다음 단계','프로젝트가 복잡하거나 다음 작업이 불분명할 때 사용하세요. 연결된 신호를 읽고 장점과 문제를 쉽게 설명하며 유용한 순서를 추천합니다.']
 },
 'zh-CN':{
  'studio-orientation':['工作室概览','顶部栏用于切换工作室模式和界面语言。侧边栏按工作区整理工具，主页则显示收藏、最近使用的模块和快速入口。'],
  'workspace-create':['CREATE — 创意与方向','新歌曲从这里开始。你可以生成想法、描述目标，或让 Director 协调 STYLE、人声、歌词和后续步骤。'],
  'workspace-style':['STYLE — 声音与清晰人声','在这里建立并优化全局 STYLE。流派、氛围、人声和制作决定声音；Vocal Clarity 可以把清晰、贴近且易懂的人声指令放在前面，同时不会强加给不合适的风格。'],
  'vocal-clarity':['Vocal Clarity — 为什么这个指令块排在最前','从“Broadway musical clarity”到“close mic”的五项指令会特意放在最前面，因为 STYLE 前面的指令通常权重更高。这里的“Broadway”表示音乐剧式清晰度，并不是指定 Broadway 流派；其余词语用于加强吐字和干燥、贴近的主唱。使用高亮开关可以开启或关闭整个指令块。建议使用“自动”；只有在明确接受警告时才选择“强制”。实时顺序会显示指令块是否真正位于第1–5位；“自动”操作可以安全恢复推荐模式。'],
  'workspace-song':['SONG — 结构与表演','把声音想法变成完整的歌曲计划。编曲、人声角色、乐理和制作工具会为每个段落明确用途并控制能量变化。'],
  'lyrics-workspace':['LYRICS — 歌词与 Pipe-Stack','在中间编写并整理歌词。把 MetaTag 拖入当前段落或点击＋插入，再拖动 Pipe-Stack 调整顺序，让最重要的指令排在最前。'],
  'workspace-knowledge':['KNOWLEDGE — 音乐资料','探索流派、乐器、MetaTag、人声、编曲和乐理。需要理解术语、寻找兼容元素或建立更真实的声音组合时使用这里。'],
  'workspace-analysis':['ANALYSIS — 检查与改进','这些工具会检查现有 STYLE 或结果。它们显示密度、冲突和较弱的优先级，并帮助你在保留特色的同时精简和优化。'],
  'workspace-project':['PROJECTS — 保存与整理','在这里集中管理专辑、曲目、文件、预设和版本。大改之前保存快照，方便比较想法并恢复到之前的状态。'],
  'live-output':['LIVE OUTPUT — 可直接复制','右侧面板始终显示当前结果。可在 STYLE、LYRICS、METATAGS 和 EXCLUDE 之间切换，检查后只复制 Suno 所需的部分。'],
  'studio-intelligence':['Studio Intelligence — 下一步','项目复杂或不知道如何继续时使用它。它会读取已连接的信号，用简单语言解释优点和问题，并推荐合理的工作顺序。']
 }
};

const DATA=Object.freeze(Object.fromEntries(LANGUAGES.map(code=>[
 code,Object.freeze(Object.fromEntries(Object.entries(records[code]).map(([id,row])=>[id,Object.freeze({title:row[0],text:row[1]})])))
])));

function languageOf(raw){
 const value=String(raw||'en').replace('_','-');
 if(DATA[value])return value;
 const exact=LANGUAGES.find(code=>code.toLowerCase()===value.toLowerCase());
 if(exact)return exact;
 const base=value.toLowerCase().split('-')[0];
 return LANGUAGES.find(code=>code.toLowerCase().split('-')[0]===base)||'en';
}

function step(code,id){
 const language=languageOf(code);
 return DATA[language]?.[id]||DATA.en[id]||null;
}

function tourTime(code){return TOUR_TIME[languageOf(code)]||TOUR_TIME.en}

return Object.freeze({VERSION:'7.5.9',LANGUAGES,DATA,TOUR_TIME,languageOf,step,tourTime});
});

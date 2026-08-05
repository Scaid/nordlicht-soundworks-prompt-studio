(function(root){
'use strict';
const $=id=>document.getElementById(id);
const STORAGE='nsw-style-builder-tab-v526';
const TABS=Object.freeze([{id:'genre',source:'styleView'},{id:'vocals',source:'vocalsView'},{id:'story',source:'storyView'}]);
const TEXT=Object.freeze({
 en:{head:'🎼 Style Builder Workspace',headDesc:'Genre, vocals, story and emotion in one clear workspace.',badge:'3 creative areas',choose:'Choose only the area you need right now.',genre:'🎼 Genre & Tempo',genreDesc:'Genre, blend, tempo and song structure',vocals:'🎤 Vocals',vocalsDesc:'Lead voice, choir, duet and vocal character',story:'🌍 Story & Emotion',storyDesc:'World, scene, emotion, atmosphere and energy',workflow:'Workflow',steps:'1. Choose a genre<br>2. Define the voice<br>3. Add story and emotion<br>4. Copy STYLE',intro:'All previous settings remain available here inside Style Builder.',direct:'Go to:'},
 de:{head:'🎼 Style-Builder-Workspace',headDesc:'Genre, Vocals sowie Story und Emotion zentral in einem klaren Arbeitsbereich.',badge:'3 kreative Bereiche',choose:'Wähle nur den Bereich, den du gerade brauchst.',genre:'🎼 Genre & Tempo',genreDesc:'Genre, Mischung, Tempo und Songstruktur',vocals:'🎤 Vocals',vocalsDesc:'Hauptstimme, Chor, Duett und Vocal-Charakter',story:'🌍 Story & Emotion',storyDesc:'Welt, Szene, Emotion, Atmosphäre und Energie',workflow:'Arbeitsablauf',steps:'1. Genre wählen<br>2. Stimme festlegen<br>3. Story und Emotion ergänzen<br>4. STYLE kopieren',intro:'Alle bisherigen Einstellungen bleiben erhalten und sind nun direkt im Style Builder erreichbar.',direct:'Direkt zu:'},
 fr:{head:'🎼 Espace Style Builder',headDesc:'Genre, voix, histoire et émotion dans un espace clair.',badge:'3 zones créatives',choose:'Choisissez uniquement la zone utile maintenant.',genre:'🎼 Genre et tempo',genreDesc:'Genre, mélange, tempo et structure',vocals:'🎤 Voix',vocalsDesc:'Voix principale, chœur, duo et caractère vocal',story:'🌍 Histoire et émotion',storyDesc:'Monde, scène, émotion, atmosphère et énergie',workflow:'Flux de travail',steps:'1. Choisir le genre<br>2. Définir la voix<br>3. Ajouter histoire et émotion<br>4. Copier le STYLE',intro:'Tous les réglages précédents restent disponibles dans Style Builder.',direct:'Accès direct :'},
 es:{head:'🎼 Espacio Style Builder',headDesc:'Género, voces, historia y emoción en un área clara.',badge:'3 áreas creativas',choose:'Elige solo el área que necesitas ahora.',genre:'🎼 Género y tempo',genreDesc:'Género, mezcla, tempo y estructura',vocals:'🎤 Voces',vocalsDesc:'Voz principal, coro, dúo y carácter vocal',story:'🌍 Historia y emoción',storyDesc:'Mundo, escena, emoción, ambiente y energía',workflow:'Flujo de trabajo',steps:'1. Elegir género<br>2. Definir la voz<br>3. Añadir historia y emoción<br>4. Copiar STYLE',intro:'Todos los ajustes anteriores siguen disponibles dentro de Style Builder.',direct:'Ir a:'},
 it:{head:'🎼 Area Style Builder',headDesc:'Genere, voci, storia ed emozione in un’unica area chiara.',badge:'3 aree creative',choose:'Scegli solo l’area che ti serve adesso.',genre:'🎼 Genere e tempo',genreDesc:'Genere, mix, tempo e struttura',vocals:'🎤 Voci',vocalsDesc:'Voce principale, coro, duetto e carattere',story:'🌍 Storia ed emozione',storyDesc:'Mondo, scena, emozione, atmosfera ed energia',workflow:'Flusso di lavoro',steps:'1. Scegli il genere<br>2. Definisci la voce<br>3. Aggiungi storia ed emozione<br>4. Copia STYLE',intro:'Tutte le impostazioni precedenti restano disponibili in Style Builder.',direct:'Vai a:'},
 pt:{head:'🎼 Área Style Builder',headDesc:'Género, vozes, história e emoção numa área clara.',badge:'3 áreas criativas',choose:'Escolha apenas a área de que precisa agora.',genre:'🎼 Género e tempo',genreDesc:'Género, mistura, tempo e estrutura',vocals:'🎤 Vozes',vocalsDesc:'Voz principal, coro, dueto e caráter vocal',story:'🌍 História e emoção',storyDesc:'Mundo, cena, emoção, ambiente e energia',workflow:'Fluxo de trabalho',steps:'1. Escolher género<br>2. Definir a voz<br>3. Adicionar história e emoção<br>4. Copiar STYLE',intro:'Todas as definições anteriores continuam disponíveis no Style Builder.',direct:'Ir para:'},
 'pt-BR':{head:'🎼 Área Style Builder',headDesc:'Gênero, vozes, história e emoção em uma área clara.',badge:'3 áreas criativas',choose:'Escolha apenas a área que você precisa agora.',genre:'🎼 Gênero e tempo',genreDesc:'Gênero, mistura, tempo e estrutura',vocals:'🎤 Vozes',vocalsDesc:'Voz principal, coro, dueto e caráter vocal',story:'🌍 História e emoção',storyDesc:'Mundo, cena, emoção, ambiente e energia',workflow:'Fluxo de trabalho',steps:'1. Escolher gênero<br>2. Definir a voz<br>3. Adicionar história e emoção<br>4. Copiar STYLE',intro:'Todas as configurações anteriores continuam disponíveis no Style Builder.',direct:'Ir para:'},
 nl:{head:'🎼 Style Builder-werkruimte',headDesc:'Genre, zang, verhaal en emotie in één duidelijk werkgebied.',badge:'3 creatieve gebieden',choose:'Kies alleen het gebied dat je nu nodig hebt.',genre:'🎼 Genre en tempo',genreDesc:'Genre, mix, tempo en songstructuur',vocals:'🎤 Zang',vocalsDesc:'Hoofdstem, koor, duet en stemkarakter',story:'🌍 Verhaal en emotie',storyDesc:'Wereld, scène, emotie, sfeer en energie',workflow:'Werkstroom',steps:'1. Kies een genre<br>2. Bepaal de stem<br>3. Voeg verhaal en emotie toe<br>4. Kopieer STYLE',intro:'Alle eerdere instellingen blijven beschikbaar in Style Builder.',direct:'Ga naar:'},
 pl:{head:'🎼 Obszar Style Builder',headDesc:'Gatunek, wokale, historia i emocje w jednym przejrzystym miejscu.',badge:'3 obszary twórcze',choose:'Wybierz tylko obszar, którego teraz potrzebujesz.',genre:'🎼 Gatunek i tempo',genreDesc:'Gatunek, mieszanka, tempo i struktura',vocals:'🎤 Wokale',vocalsDesc:'Główny głos, chór, duet i charakter wokalu',story:'🌍 Historia i emocje',storyDesc:'Świat, scena, emocje, atmosfera i energia',workflow:'Przepływ pracy',steps:'1. Wybierz gatunek<br>2. Określ głos<br>3. Dodaj historię i emocje<br>4. Skopiuj STYLE',intro:'Wszystkie wcześniejsze ustawienia są nadal dostępne w Style Builder.',direct:'Przejdź do:'},
 tr:{head:'🎼 Style Builder çalışma alanı',headDesc:'Tür, vokal, hikâye ve duygu tek bir açık alanda.',badge:'3 yaratıcı alan',choose:'Şu anda yalnızca ihtiyacınız olan alanı seçin.',genre:'🎼 Tür ve tempo',genreDesc:'Tür, karışım, tempo ve şarkı yapısı',vocals:'🎤 Vokaller',vocalsDesc:'Ana ses, koro, düet ve vokal karakteri',story:'🌍 Hikâye ve duygu',storyDesc:'Dünya, sahne, duygu, atmosfer ve enerji',workflow:'İş akışı',steps:'1. Tür seçin<br>2. Sesi belirleyin<br>3. Hikâye ve duygu ekleyin<br>4. STYLE kopyalayın',intro:'Önceki tüm ayarlar Style Builder içinde kullanılmaya devam eder.',direct:'Git:'},
 ru:{head:'🎼 Рабочая область Style Builder',headDesc:'Жанр, вокал, история и эмоция в одном понятном пространстве.',badge:'3 творческие области',choose:'Выберите только нужную сейчас область.',genre:'🎼 Жанр и темп',genreDesc:'Жанр, сочетание, темп и структура песни',vocals:'🎤 Вокал',vocalsDesc:'Главный голос, хор, дуэт и характер вокала',story:'🌍 История и эмоция',storyDesc:'Мир, сцена, эмоция, атмосфера и энергия',workflow:'Рабочий процесс',steps:'1. Выберите жанр<br>2. Определите голос<br>3. Добавьте историю и эмоцию<br>4. Скопируйте STYLE',intro:'Все прежние настройки по-прежнему доступны внутри Style Builder.',direct:'Перейти к:'},
 ja:{head:'🎼 Style Builderワークスペース',headDesc:'ジャンル、ボーカル、物語、感情を一つの分かりやすい場所で設定します。',badge:'3つの制作エリア',choose:'今必要なエリアだけを選んでください。',genre:'🎼 ジャンルとテンポ',genreDesc:'ジャンル、融合、テンポ、曲構成',vocals:'🎤 ボーカル',vocalsDesc:'リード、コーラス、デュエット、声の特徴',story:'🌍 物語と感情',storyDesc:'世界、場面、感情、雰囲気、エネルギー',workflow:'ワークフロー',steps:'1. ジャンルを選ぶ<br>2. 声を決める<br>3. 物語と感情を加える<br>4. STYLEをコピー',intro:'以前の設定はすべてStyle Builder内で引き続き利用できます。',direct:'移動先:'},
 ko:{head:'🎼 Style Builder 작업 영역',headDesc:'장르, 보컬, 이야기와 감정을 한곳에서 명확하게 설정합니다.',badge:'3개 창작 영역',choose:'지금 필요한 영역만 선택하세요.',genre:'🎼 장르와 템포',genreDesc:'장르, 혼합, 템포와 곡 구조',vocals:'🎤 보컬',vocalsDesc:'리드 보컬, 합창, 듀엣과 보컬 캐릭터',story:'🌍 이야기와 감정',storyDesc:'세계, 장면, 감정, 분위기와 에너지',workflow:'작업 흐름',steps:'1. 장르 선택<br>2. 목소리 설정<br>3. 이야기와 감정 추가<br>4. STYLE 복사',intro:'이전의 모든 설정을 Style Builder 안에서 계속 사용할 수 있습니다.',direct:'바로 가기:'},
 'zh-CN':{head:'🎼 Style Builder 工作区',headDesc:'在一个清晰区域中设置流派、人声、故事和情感。',badge:'3 个创作区域',choose:'只选择当前需要的区域。',genre:'🎼 流派与速度',genreDesc:'流派、融合、速度和歌曲结构',vocals:'🎤 人声',vocalsDesc:'主唱、合唱、二重唱和人声特点',story:'🌍 故事与情感',storyDesc:'世界、场景、情感、氛围和能量',workflow:'工作流程',steps:'1. 选择流派<br>2. 设置人声<br>3. 添加故事和情感<br>4. 复制 STYLE',intro:'所有以前的设置仍可在 Style Builder 中使用。',direct:'前往:'}
});

function language(){return root.NSWWorkspaceI18n?.getLanguage?.()||root.NSWInterfaceI18n?.getLanguage?.()||document.documentElement.lang||'en'}
function record(){const code=root.NSWWorkspaceI18nCatalog?.languageOf?.(language())||'en';return TEXT[code]||TEXT.en}
function applyLanguage(){
 const data=record();
 document.querySelectorAll('[data-sbw-i18n]').forEach(element=>{
  const value=data[element.dataset.sbwI18n];if(value==null)return;
  if(element.dataset.sbwHtml==='1')element.innerHTML=value;else element.textContent=value;
 });
 return data;
}

function integrate(){
 const style=$('styleView'),vocals=$('vocalsView'),story=$('storyView');
 if(!style||!vocals||!story||$('styleBuilderWorkspace'))return;
 const head=style.querySelector('.view-head');
 if(head){
  head.innerHTML='<div><h1 data-sbw-i18n="head"></h1><p data-sbw-i18n="headDesc"></p></div><span class="sbw-badge" data-sbw-i18n="badge"></span>';
  head.classList.add('sbw-head');
 }
 const genreNodes=[...style.children].filter(element=>element!==head);
 const workspace=document.createElement('div');workspace.id='styleBuilderWorkspace';workspace.className='sbw-workspace';
 const nav=document.createElement('aside');nav.className='sbw-tabs';
 nav.innerHTML='<div class="sbw-tabs-title"><b>Style Builder</b><small data-sbw-i18n="choose"></small></div>'+TABS.map(tab=>`<button type="button" data-sbw-tab="${tab.id}"><b data-sbw-i18n="${tab.id}"></b><small data-sbw-i18n="${tab.id}Desc"></small></button>`).join('')+'<div class="sbw-help"><b data-sbw-i18n="workflow"></b><small data-sbw-i18n="steps" data-sbw-html="1"></small></div>';
 const content=document.createElement('main');content.className='sbw-content';
 const genrePane=document.createElement('section');genrePane.className='sbw-pane';genrePane.dataset.sbwPane='genre';genreNodes.forEach(node=>genrePane.appendChild(node));
 const vocalPane=document.createElement('section');vocalPane.className='sbw-pane';vocalPane.dataset.sbwPane='vocals';
 const storyPane=document.createElement('section');storyPane.className='sbw-pane';storyPane.dataset.sbwPane='story';
 moveView(vocals,vocalPane,'vocals');moveView(story,storyPane,'story');
 content.append(genrePane,vocalPane,storyPane);workspace.append(nav,content);style.appendChild(workspace);
 vocals.classList.add('sbw-integrated-source');story.classList.add('sbw-integrated-source');
 document.querySelectorAll('.nav[data-view="vocalsView"],.nav[data-view="storyView"]').forEach(element=>element.remove());
 nav.querySelectorAll('[data-sbw-tab]').forEach(button=>button.onclick=()=>activate(button.dataset.sbwTab));
 activate(localStorage.getItem(STORAGE)||'genre');
 addQuickLinks();
 applyLanguage();
}

function moveView(view,pane,key){
 view.querySelector('.view-head')?.remove();
 const intro=document.createElement('div');intro.className='sbw-pane-intro';intro.innerHTML=`<h2 data-sbw-i18n="${key}"></h2><p data-sbw-i18n="intro"></p>`;pane.appendChild(intro);
 [...view.children].forEach(node=>pane.appendChild(node));
}

function activate(id){
 if(!TABS.some(tab=>tab.id===id))id='genre';
 document.querySelectorAll('[data-sbw-tab]').forEach(button=>button.classList.toggle('active',button.dataset.sbwTab===id));
 document.querySelectorAll('[data-sbw-pane]').forEach(pane=>pane.classList.toggle('active',pane.dataset.sbwPane===id));
 localStorage.setItem(STORAGE,id);
}

function addQuickLinks(){
 const toolbar=document.createElement('div');toolbar.className='sbw-quick-toolbar';
 toolbar.innerHTML='<span data-sbw-i18n="direct"></span><button data-open="genre" data-sbw-i18n="genre"></button><button data-open="vocals" data-sbw-i18n="vocals"></button><button data-open="story" data-sbw-i18n="story"></button><button data-view="vocalDirectorView">Vocal Director 2.0</button>';
 const style=$('styleView'),head=style.querySelector('.view-head');head?.after(toolbar);
 toolbar.querySelectorAll('[data-open]').forEach(button=>button.onclick=()=>activate(button.dataset.open));
 toolbar.querySelector('[data-view]')?.addEventListener('click',event=>root.NSWConnections?.navigate(event.currentTarget.dataset.view));
}

function redirectLegacy(){
 document.addEventListener('click',event=>{
  const button=event.target.closest('[data-view="vocalsView"],[data-view="storyView"]');if(!button)return;
  event.preventDefault();document.querySelector('.nav[data-view="styleView"]')?.click();activate(button.dataset.view==='vocalsView'?'vocals':'story');
 },true);
}

function init(){integrate();redirectLegacy();document.addEventListener('nordlicht-language-changed',applyLanguage)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
root.NSWStyleBuilderWorkspace=Object.freeze({VERSION:'7.5.7',applyLanguage,activate});
})(typeof globalThis!=='undefined'?globalThis:this);

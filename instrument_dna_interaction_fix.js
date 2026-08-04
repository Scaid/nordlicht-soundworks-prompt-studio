
(function(){
'use strict';

const $ = id => document.getElementById(id);
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({
  '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
}[char]));

function getDNA(name){
  try {
    if (typeof window.instrumentDNA2 === 'function') {
      return window.instrumentDNA2(name);
    }
  } catch (error) {
    console.error('Instrument DNA lookup failed:', error);
  }
  return null;
}

function chips(values, className=''){
  const list = Array.isArray(values) ? values : [];
  if (!list.length) return '<span class="instrument-dna-chip">No data available</span>';
  return list.map(value => `<span class="instrument-dna-chip ${className}">${esc(value)}</span>`).join('');
}

function renderInstrumentDNA(name){
  const host = $('instrumentDNAInspector');
  const data = getDNA(name);
  if (!host) return false;

  if (!data) {
    host.innerHTML = `
      <div class="instrument-inspector-empty instrument-inspector-error">
        <span>⚠️</span>
        <h3>Instrument details unavailable</h3>
        <p>The selected instrument could not be found in the Instrument DNA database.</p>
      </div>`;
    return false;
  }

  const fit = typeof window.instrumentDNAFit === 'function'
    ? window.instrumentDNAFit(data)
    : 60;

  const selected = Boolean(
    window.appState?.instruments?.includes?.(data.name)
  );

  host.innerHTML = `
    <div class="instrument-dna-title">
      <span class="instrument-dna-icon">${esc(data.icon || '🎻')}</span>
      <div>
        <h2>${esc(data.name)}</h2>
        <p>${esc(data.country)} · ${esc(data.region)} · ${esc(data.family)}</p>
        <span class="reliability-badge ${esc(data.reliability?.level || 'advanced')}">
          ${esc(data.reliability?.label || 'Guidance')} · ${esc(data.reliability?.score || 0)}%
        </span>
      </div>
    </div>

    <div class="instrument-dna-section">
      <div class="instrument-dna-facts">
        <div class="instrument-dna-fact"><small>Era</small><b>${esc(data.era)}</b></div>
        <div class="instrument-dna-fact"><small>Energy</small><b>${esc(data.energy)}</b></div>
        <div class="instrument-dna-fact"><small>Role</small><b>${esc(data.role)}</b></div>
        <div class="instrument-dna-fact"><small>Typical BPM</small><b>${esc(data.bpm)}</b></div>
        <div class="instrument-dna-fact"><small>Current genre fit</small><b>${esc(fit)}%</b></div>
        <div class="instrument-dna-fact"><small>Suno guidance</small><b>${esc(data.reliability?.label || 'Guidance')}</b></div>
      </div>
      <div class="instrument-fit-meter"><i style="width:${Math.max(0, Math.min(100, Number(fit) || 0))}%"></i></div>
    </div>

    <div class="instrument-dna-section">
      <h4>Sound character</h4>
      <div class="instrument-dna-chips">${chips(data.tones)}</div>
    </div>

    <div class="instrument-dna-section">
      <h4>Typical moods</h4>
      <div class="instrument-dna-chips">${chips(data.moods)}</div>
    </div>

    <div class="instrument-dna-section">
      <h4>Genre compatibility</h4>
      <div class="instrument-dna-chips">${chips(data.genres, 'good')}</div>
    </div>

    <div class="instrument-dna-section">
      <h4>Pairs well with</h4>
      <div class="instrument-dna-chips">
        ${(data.pairs || []).length
          ? data.pairs.map(value => `<button class="instrument-dna-chip good" data-dna-open="${esc(value)}">${esc(value)}</button>`).join('')
          : '<span class="instrument-dna-chip">No mapped pairings yet</span>'}
      </div>
    </div>

    <div class="instrument-dna-section">
      <h4>Unusual combinations</h4>
      <div class="instrument-dna-chips">
        ${(data.avoid || []).length
          ? chips(data.avoid, 'avoid')
          : '<span class="instrument-dna-chip">No strong conflicts recorded</span>'}
      </div>
    </div>

    <div class="instrument-dna-section">
      <h4>Prompt role example</h4>
      <div class="instrument-dna-prompt">${esc(data.prompt)}</div>
    </div>

    <div class="instrument-dna-actions">
      <button class="primary" data-dna-toggle="${esc(data.name)}">${selected ? 'Remove from style' : 'Add to style'}</button>
      <button data-dna-copy="${esc(data.name)}">Copy prompt role</button>
    </div>`;

  host.dataset.activeInstrument = data.name;
  document.querySelectorAll('.dna-instrument-card').forEach(card => {
    card.classList.toggle('inspected', card.dataset.v === data.name);
  });

  return true;
}

function toggleInstrument(name){
  if (typeof window.toggleArray === 'function') {
    window.toggleArray('instruments', name);
    if (typeof window.renderDynamicLists === 'function') window.renderDynamicLists();
    if (typeof window.generateOutput === 'function') window.generateOutput();
    renderInstrumentDNA(name);
    return;
  }

  const list = window.appState?.instruments;
  if (Array.isArray(list)) {
    const index = list.indexOf(name);
    if (index >= 0) list.splice(index, 1);
    else list.push(name);
    renderInstrumentDNA(name);
  }
}

async function copyPrompt(name){
  const data = getDNA(name);
  if (!data?.prompt) return;
  try {
    await navigator.clipboard.writeText(data.prompt);
  } catch (error) {
    const area = document.createElement('textarea');
    area.value = data.prompt;
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }
  if (typeof window.showToast === 'function') {
    window.showToast('Instrument prompt role copied');
  }
}

function instrumentNameFromTarget(target){
  const explicit = target.closest('[data-detail]');
  if (explicit?.dataset.detail) return explicit.dataset.detail;

  const card = target.closest('.dna-instrument-card[data-v]');
  if (card?.dataset.v) return card.dataset.v;

  return '';
}

function handleClick(event){
  const openPair = event.target.closest('[data-dna-open]');
  if (openPair) {
    event.preventDefault();
    event.stopPropagation();
    renderInstrumentDNA(openPair.dataset.dnaOpen);
    return;
  }

  const toggle = event.target.closest('[data-dna-toggle]');
  if (toggle) {
    event.preventDefault();
    event.stopPropagation();
    toggleInstrument(toggle.dataset.dnaToggle);
    return;
  }

  const copy = event.target.closest('[data-dna-copy]');
  if (copy) {
    event.preventDefault();
    event.stopPropagation();
    copyPrompt(copy.dataset.dnaCopy);
    return;
  }

  // Keep favorite and Add/Remove card controls independent.
  if (event.target.closest('[data-fav-instrument],[data-toggle]')) return;

  const name = instrumentNameFromTarget(event.target);
  if (!name) return;

  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();

  if (renderInstrumentDNA(name)) {
    $('instrumentDNAInspector')?.scrollIntoView({behavior:'smooth', block:'nearest'});
  }
}

function handleKeydown(event){
  if (!['Enter', ' '].includes(event.key)) return;
  const card = event.target.closest('.dna-instrument-card[data-v]');
  if (!card) return;
  event.preventDefault();
  event.stopPropagation();
  renderInstrumentDNA(card.dataset.v);
}

function init(){
  // Capture phase makes this independent of previously broken card handlers.
  document.addEventListener('click', handleClick, true);
  document.addEventListener('keydown', handleKeydown, true);

  window.NSWOpenInstrumentDNA = renderInstrumentDNA;
  window.NSWInstrumentDNAInteractionFix = {
    version: '7.2.2',
    open: renderInstrumentDNA
  };
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, {once:true});
} else {
  init();
}
})();

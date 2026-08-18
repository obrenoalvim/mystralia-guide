import { MEMORIES, BASE_SPELLS, FAMILIES, CATEGORY_KEYS, EFFECTS } from '../lib/data.js';
import { getDict, elementLabel, familyLabel, typeLabel, categoryLabel, localizedName, localizedDesc } from '../lib/localize.js';
import { bestComboForSpell } from '../lib/combo-engine.js';

const locale = document.documentElement.lang && document.documentElement.lang.startsWith('en') ? 'en' : 'pt';
const dict = getDict(locale);

const ELEMENT_ICON = {
  Fire: '/images/elements/fire.png', Ice: '/images/elements/ice.png', Lightning: '/images/elements/lightning.png',
  Air: '/images/elements/air.png', Earth: '/images/elements/earth.png', Light: '/images/elements/light.png',
  Void: '/images/elements/void.png',
};

const STORAGE_KEY = 'mystralia-memories-v3';
const OWNED_KEY = 'mystralia-owned-v3';

function loadCustomMemories() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}
function saveCustomMemory(mem) {
  const custom = loadCustomMemories();
  custom.push(mem);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(custom));
}
function loadOwned() {
  const stored = JSON.parse(localStorage.getItem(OWNED_KEY) || 'null');
  return new Set(stored || []);
}
function saveOwned(ownedSet) {
  localStorage.setItem(OWNED_KEY, JSON.stringify([...ownedSet]));
}

let memories = [...MEMORIES, ...loadCustomMemories()];
let owned = loadOwned();

function getRuneIcon(m) {
  return m.icon || ELEMENT_ICON[m.element] || null;
}
function iconImg(m, cls) {
  const src = getRuneIcon(m);
  return src
    ? `<img class="${cls}" src="${src}" alt="" loading="lazy">`
    : `<span class="${cls} ${cls}--glyph" aria-hidden="true"></span>`;
}

// ---- Tabs ----
document.querySelectorAll('.tab-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach((p) => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// ---- Base spells grid, grouped by family ----
function renderBaseSpells() {
  const el = document.getElementById('spells-grid');
  if (!el) return;
  el.innerHTML = FAMILIES.map((fam) => {
    const items = BASE_SPELLS.filter((s) => s.family === fam);
    if (!items.length) return '';
    return `
      <div class="spell-family">
        <h3 class="spell-family-title">${familyLabel(locale, fam)}</h3>
        <div class="card-grid">
          ${items
            .map(
              (s) => `
            <div class="card card--spell ${s.official ? 'card--spell-official' : ''}">
              ${iconImg(s, 'card-icon')}
              <div class="card-body">
                <h4>${localizedName(locale, s)} <span class="tag confirmado">${elementLabel(locale, s.element)}</span></h4>
                <p>${localizedDesc(locale, s)}</p>
              </div>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    `;
  }).join('');
}
renderBaseSpells();

// ---- Effects grid ----
function renderEffects() {
  const el = document.getElementById('effects-grid');
  if (!el) return;
  el.innerHTML = EFFECTS.map(
    (e) => `
    <div class="card"><h4>${locale === 'en' ? e.nameEn : e.namePt}</h4><p>${locale === 'en' ? e.descEn : e.descPt}</p></div>
  `
  ).join('');
}
renderEffects();

// ---- Memories browsable list ----
let memFilterType = null;
function matchesSearch(m, q) {
  if (!q) return true;
  q = q.toLowerCase();
  const name = localizedName(locale, m).toLowerCase();
  const el = elementLabel(locale, m.element).toLowerCase();
  const desc = localizedDesc(locale, m).toLowerCase();
  return name.includes(q) || el.includes(q) || desc.includes(q);
}
function renderMemoriesGrid() {
  const el = document.getElementById('memories-grid');
  if (!el) return;
  const q = (document.getElementById('mem-search') || {}).value || '';
  const list = memories.filter((m) => (!memFilterType || m.type === memFilterType) && matchesSearch(m, q));
  el.innerHTML =
    list
      .map(
        (m) => `
    <div class="card card--rune rarity-${(m.tier || 'common').toLowerCase()}">
      ${iconImg(m, 'card-icon')}
      <div class="card-body">
        <h4>${localizedName(locale, m)} <span class="tag confirmado">${m.tier || ''}</span></h4>
        <p class="meta-line"><span>${typeLabel(locale, m.type)}</span> · <span>${elementLabel(locale, m.element)}</span> · <span>${dict.combinador.focus} ${m.focus ?? '?'}</span> · <span>${m.source || ''}</span></p>
        <p>${localizedDesc(locale, m)}</p>
      </div>
    </div>
  `
      )
      .join('') || `<p class="hint">${dict.combinador.notFound}</p>`;
}
document.querySelectorAll('.mem-filter-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mem-filter-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    memFilterType = btn.dataset.filter || null;
    renderMemoriesGrid();
  });
});
document.getElementById('mem-search').addEventListener('input', renderMemoriesGrid);
renderMemoriesGrid();

// ---- Inventory (combinador) ----
let invFilterType = null;
function renderInventory() {
  const el = document.getElementById('inventory-list');
  const q = (document.getElementById('inventory-search') || {}).value || '';
  const list = memories.filter((m) => (!invFilterType || m.type === invFilterType) && matchesSearch(m, q));
  el.innerHTML =
    list
      .map(
        (m) => `
    <label class="mem-item ${owned.has(m.id) ? 'owned' : ''}">
      <input type="checkbox" data-id="${m.id}" ${owned.has(m.id) ? 'checked' : ''}>
      ${iconImg(m, 'mem-icon')}
      <span class="mem-name">${localizedName(locale, m)}</span>
      <span class="mem-type">${typeLabel(locale, m.type)} · ${dict.combinador.focus}&nbsp;${m.focus ?? '?'}</span>
    </label>
  `
      )
      .join('') || `<p class="hint">${dict.combinador.notFound}</p>`;
  el.querySelectorAll('input[type=checkbox]').forEach((cb) => {
    cb.addEventListener('change', () => {
      if (cb.checked) owned.add(cb.dataset.id);
      else owned.delete(cb.dataset.id);
      saveOwned(owned);
      renderInventory();
      renderResults();
    });
  });
}
document.getElementById('inventory-search').addEventListener('input', renderInventory);
document.querySelectorAll('.inv-filter-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.inv-filter-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    invFilterType = btn.dataset.filter || null;
    renderInventory();
  });
});

// ---- Add custom memory dialog ----
const dialog = document.getElementById('add-memory-dialog');
document.getElementById('add-memory-btn').addEventListener('click', () => dialog.showModal());
document.getElementById('cancel-add').addEventListener('click', () => dialog.close());
document.getElementById('add-memory-form').addEventListener('submit', (e) => {
  const fd = new FormData(e.target);
  const mem = {
    id: 'custom-' + Date.now(),
    name: fd.get('name'),
    namePt: fd.get('name'),
    nameEn: fd.get('name'),
    type: fd.get('type'),
    tier: 'Custom',
    element: fd.get('element') || '?',
    focus: Number(fd.get('focus')),
    source: locale === 'en' ? 'You' : 'Você',
    descPt: locale === 'pt' ? 'Adicionado por você.' : '',
    descEn: locale === 'en' ? 'Added by you.' : '',
    scores: {
      dano: Number(fd.get('dano')),
      area: Number(fd.get('area')),
      controle: Number(fd.get('controle')),
      mobilidade: Number(fd.get('mobilidade')),
      sustentacao: Number(fd.get('sustentacao')),
    },
  };
  saveCustomMemory(mem);
  memories = [...MEMORIES, ...loadCustomMemories()];
  owned.add(mem.id);
  saveOwned(owned);
  e.target.reset();
  dialog.close();
  renderMemoriesGrid();
  renderInventory();
  renderResults();
});

// ---- Combo results ----
function renderResultsForSpell(baseSpell, budget) {
  const ownedList = memories.filter((m) => owned.has(m.id));
  return CATEGORY_KEYS.map((catKey) => {
    const best = bestComboForSpell(baseSpell, ownedList, catKey, budget);
    const parts = [baseSpell, ...best.picks];
    const usedFocus = best.picks.reduce((s, p) => s + p.focus, 0);
    const maxScore = 20;
    return `
      <div class="result-card">
        <h4 class="cat-${catKey}">${categoryLabel(locale, catKey)} · ${best.total} (${dict.combinador.focus} ${usedFocus}/${budget})</h4>
        <div class="combo-parts">${parts
          .map((p) => `<span class="combo-part">${iconImg(p, 'combo-part-icon')}${localizedName(locale, p)}</span>`)
          .join('<span class="combo-plus">+</span>')}</div>
        <div class="score-bar"><div class="cat-${catKey}" style="width:${Math.min(100, (best.total / maxScore) * 100)}%; background:currentColor;"></div></div>
      </div>
    `;
  }).join('');
}

function renderResults() {
  const el = document.getElementById('results-list');
  const budget = Number(document.getElementById('focus-budget').value) || 6;
  const spell1 = BASE_SPELLS.find((s) => s.id === document.getElementById('spell-select').value);
  const spell2 = BASE_SPELLS.find((s) => s.id === document.getElementById('spell-select-2').value);

  let html = '';
  html += `<h4 class="results-spell-title">${iconImg(spell1, 'combo-part-icon')}${localizedName(locale, spell1)}</h4>`;
  html += renderResultsForSpell(spell1, budget);
  if (spell2 && spell2.id !== spell1.id) {
    html += `<h4 class="results-spell-title">${iconImg(spell2, 'combo-part-icon')}${localizedName(locale, spell2)}</h4>`;
    html += renderResultsForSpell(spell2, budget);
  }
  el.innerHTML = html;
}

function populateSpellSelect(selectEl) {
  let html = '';
  FAMILIES.forEach((fam) => {
    const items = BASE_SPELLS.filter((s) => s.family === fam);
    if (!items.length) return;
    html += `<optgroup label="${familyLabel(locale, fam)}">`;
    html += items.map((s) => `<option value="${s.id}">${localizedName(locale, s)} (${elementLabel(locale, s.element)})</option>`).join('');
    html += `</optgroup>`;
  });
  selectEl.innerHTML = html;
}
populateSpellSelect(document.getElementById('spell-select'));
populateSpellSelect(document.getElementById('spell-select-2'));
document.getElementById('spell-select-2').value =
  BASE_SPELLS.find((s) => s.official && s.id !== document.getElementById('spell-select').value)?.id || BASE_SPELLS[1]?.id;

document.getElementById('spell-select').addEventListener('change', renderResults);
document.getElementById('spell-select-2').addEventListener('change', renderResults);
document.getElementById('focus-budget').addEventListener('input', () => {
  document.getElementById('budget-value').textContent = document.getElementById('focus-budget').value;
  renderResults();
});

renderInventory();
renderResults();

/**
 * cards.js
 * Card rendering components for all API types.
 */

// ─── Skeleton Cards ───────────────────────────────────────────────────────────

export function renderSkeletons(count = 12) {
  const grid = document.getElementById('skeletonGrid');
  grid.innerHTML = Array.from({ length: count }, () => `
    <div class="skeleton-card">
      <div class="skeleton-pulse sk-img"></div>
      <div class="skeleton-pulse sk-title"></div>
      <div class="skeleton-pulse sk-line"></div>
      <div class="skeleton-pulse sk-line sk-line--short"></div>
    </div>
  `).join('');
  grid.classList.remove('hidden');
}

export function hideSkeletons() {
  document.getElementById('skeletonGrid').classList.add('hidden');
}

// ─── Generic Card Builder ─────────────────────────────────────────────────────

function createCard(item, type) {
  const card = document.createElement('article');
  card.className = 'card';
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `View details for ${item.name}`);
  card.dataset.id   = item.id;
  card.dataset.type = type;
  card.innerHTML    = buildCardHTML(item, type);
  return card;
}

function buildCardHTML(item, type) {
  const imageSection = item.image
    ? `<img class="card__image" src="${item.image}" alt="${item.imageAlt || item.name}" loading="lazy" />`
    : `<div class="card__image-placeholder">${getEmoji(item, type)}</div>`;

  const badge = item.badge
    ? `<span class="card__badge">${item.badge}</span>`
    : '';

  const tags = item.tags?.length
    ? `<div class="card__tags">${item.tags.slice(0, 3).map((t) => `<span class="tag">${t}</span>`).join('')}</div>`
    : '';

  const metaItems = buildMetaItems(item, type);

  // Special content for jokes/quotes
  const bodyExtra = (type === 'jokes' || type === 'quotes')
    ? `<p class="card__quote-text">${truncate(item.text, 120)}</p>`
    : '';

  return `
    ${badge}
    ${imageSection}
    <div class="card__body">
      <h3 class="card__title">${item.name}</h3>
      <p class="card__subtitle">${item.subtitle}</p>
      ${bodyExtra}
      ${tags}
      ${metaItems}
    </div>
  `;
}

function buildMetaItems(item, type) {
  const meta = item.meta || {};
  let items  = [];

  switch (type) {
    case 'countries':
      items = [
        { icon: 'fa-city',  text: meta.capital   || '' },
        { icon: 'fa-coins', text: meta.currency  || '' },
      ];
      break;
    case 'pokemon':
      items = [
        { icon: 'fa-heart',    text: `HP: ${meta.hp}`     },
        { icon: 'fa-bolt',     text: `ATK: ${meta.attack}` },
      ];
      break;
    case 'jokes':
      items = [
        { icon: 'fa-tag',     text: meta.type   || '' },
        { icon: 'fa-shield',  text: meta.safe === 'Yes' ? 'Safe' : 'Flagged' },
      ];
      break;
    case 'quotes':
      items = [
        { icon: 'fa-pen-nib', text: meta.author || '' },
        { icon: 'fa-ruler',   text: `${meta.length} chars` },
      ];
      break;
  }

  const rendered = items.filter((i) => i.text).map((i) =>
    `<span><i class="fa-solid ${i.icon}"></i> ${escapeHtml(String(i.text))}</span>`
  ).join('');

  return rendered ? `<div class="card__meta">${rendered}</div>` : '';
}

function getEmoji(item, type) {
  if (type === 'quotes')   return '💬';
  if (type === 'jokes')    return '😂';
  if (type === 'pokemon')  return '⚡';
  return item.emoji || '🌍';
}

function truncate(str, len) {
  if (!str) return '';
  const escaped = escapeHtml(str);
  return escaped.length > len ? escaped.slice(0, len) + '…' : escaped;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ─── Render Grid ──────────────────────────────────────────────────────────────

export function renderCards(items, type, onCardClick) {
  const grid = document.getElementById('resultsGrid');
  grid.innerHTML = '';

  items.forEach((item) => {
    const card = createCard(item, type);
    card.addEventListener('click', () => onCardClick(item, type));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onCardClick(item, type);
      }
    });
    grid.appendChild(card);
  });
}

// ─── Modal Detail Builder ─────────────────────────────────────────────────────

export function buildModalHTML(item, type) {
  const image = item.image
    ? `<img class="modal__image" src="${item.image}" alt="${escapeHtml(item.imageAlt || item.name)}" />`
    : `<div style="text-align:center;font-size:5rem;padding:20px 0">${getEmoji(item, type)}</div>`;

  const metaHTML = buildModalMeta(item);

  const tags = item.tags?.length
    ? `<div class="card__tags" style="margin-bottom:16px">${item.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>`
    : '';

  const extra = buildModalExtra(item, type);

  return `
    ${image}
    <h2 class="modal__title">${escapeHtml(item.name)}</h2>
    <p class="modal__subtitle">${escapeHtml(item.subtitle)}</p>
    ${tags}
    ${extra}
    <div class="modal__grid">${metaHTML}</div>
  `;
}

function buildModalMeta(item) {
  return Object.entries(item.meta || {})
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `
      <div class="modal__stat">
        <div class="modal__stat-label">${formatKey(k)}</div>
        <div class="modal__stat-value">${escapeHtml(String(v))}</div>
      </div>
    `).join('');
}

function buildModalExtra(item, type) {
  if ((type === 'jokes' || type === 'quotes') && item.text) {
    const textStyle = 'background:var(--color-surface-2);border-radius:var(--radius-md);padding:20px;margin-bottom:20px;line-height:1.8;font-size:1.05rem;color:var(--color-text)';
    return `<div style="${textStyle}">${escapeHtml(item.text).replace(/\n/g, '<br>')}</div>`;
  }
  return '';
}

function formatKey(key) {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

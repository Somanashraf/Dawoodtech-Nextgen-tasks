/**
 * pagination.js
 * Reusable pagination component with ellipsis logic.
 */

/**
 * paginate(items, page, limit) — pure function
 * Returns { items, totalPages, totalItems, page }
 */
export function paginate(items, page = 1, limit = 12) {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  const safePage   = Math.min(Math.max(1, page), totalPages);
  const start      = (safePage - 1) * limit;
  const end        = start + limit;

  return {
    items:      items.slice(start, end),
    totalItems,
    totalPages,
    page:       safePage,
  };
}

/**
 * renderPagination(container, { page, totalPages, onChange })
 * Builds accessible pagination controls with ellipsis for large page ranges.
 */
export function renderPagination(containerId, { page, totalPages, onChange }) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  const pages = getVisiblePages(page, totalPages);

  let html = '';

  // Prev button
  html += `
    <button class="page-btn" data-page="${page - 1}" ${page <= 1 ? 'disabled' : ''} aria-label="Previous page">
      <i class="fa-solid fa-chevron-left"></i>
    </button>
  `;

  // Page number buttons
  pages.forEach((p) => {
    if (p === '...') {
      html += `<span class="page-ellipsis">…</span>`;
    } else {
      html += `
        <button class="page-btn ${p === page ? 'active' : ''}" data-page="${p}" aria-label="Page ${p}" ${p === page ? 'aria-current="page"' : ''}>
          ${p}
        </button>
      `;
    }
  });

  // Next button
  html += `
    <button class="page-btn" data-page="${page + 1}" ${page >= totalPages ? 'disabled' : ''} aria-label="Next page">
      <i class="fa-solid fa-chevron-right"></i>
    </button>
  `;

  container.innerHTML = html;

  // Event delegation — single listener on container
  container.onclick = (e) => {
    const btn = e.target.closest('.page-btn');
    if (!btn || btn.disabled) return;
    const newPage = parseInt(btn.dataset.page, 10);
    if (!isNaN(newPage) && newPage !== page) {
      onChange(newPage);
      // Scroll to top of results smoothly
      document.getElementById('resultsGrid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
}

/**
 * getVisiblePages(current, total)
 * Returns array of page numbers and '...' ellipsis markers.
 * Always shows: first, last, current ± 2
 */
function getVisiblePages(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set([1, total, current]);
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.add(i);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const result = [];

  sorted.forEach((p, idx) => {
    if (idx > 0 && p - sorted[idx - 1] > 1) {
      result.push('...');
    }
    result.push(p);
  });

  return result;
}

/**
 * app.js
 * Main application entry point.
 *
 * Patterns demonstrated:
 *  - Module pattern (IIFE state container)
 *  - Closure-based private state
 *  - Event delegation
 *  - Debounced search input
 *  - Error boundaries with retry
 *  - Pagination logic
 */

import { services }                          from './services/apiService.js';
import { debounce, throttle }                from './utils/performance.js';
import { ApiError, NetworkError, TimeoutError } from './utils/apiClient.js';
import { renderCards, renderSkeletons, hideSkeletons, buildModalHTML } from './components/cards.js';
import { paginate, renderPagination }        from './components/pagination.js';
import { Toast }                             from './components/toast.js';

// ─── Application State (Closure / Module Pattern) ────────────────────────────

const AppState = (() => {
  // Private state — not accessible outside this IIFE
  let _state = {
    activeApi:    'countries',
    allItems:     [],
    filteredItems: [],
    query:        '',
    activeFilter: '',
    sortValue:    '',
    page:         1,
    limit:        12,
    loading:      false,
    error:        null,
    view:         'grid',  // 'grid' | 'list'
  };

  return {
    get: (key)        => (key ? _state[key] : { ..._state }),
    set: (key, value) => { _state[key] = value; },
    reset: ()         => {
      _state.query        = '';
      _state.activeFilter = '';
      _state.sortValue    = '';
      _state.page         = 1;
      _state.filteredItems = [];
      _state.error        = null;
    },
  };
})();

// ─── DOM References ───────────────────────────────────────────────────────────

const $ = (id) => document.getElementById(id);

const DOM = {
  searchInput:      $('searchInput'),
  clearSearch:      $('clearSearch'),
  filtersContainer: $('filtersContainer'),
  sortSelect:       $('sortSelect'),
  limitSelect:      $('limitSelect'),
  statsText:        $('statsText'),
  resultsGrid:      $('resultsGrid'),
  skeletonGrid:     $('skeletonGrid'),
  errorBoundary:    $('errorBoundary'),
  errorTitle:       $('errorTitle'),
  errorMessage:     $('errorMessage'),
  retryBtn:         $('retryBtn'),
  errorDismiss:     $('errorDismiss'),
  emptyState:       $('emptyState'),
  pagination:       $('pagination'),
  modalOverlay:     $('modalOverlay'),
  modal:            $('modal'),
  modalContent:     $('modalContent'),
  modalClose:       $('modalClose'),
  themeToggle:      $('themeToggle'),
  viewGrid:         $('viewGrid'),
  viewList:         $('viewList'),
};

// ─── Theme ────────────────────────────────────────────────────────────────────

function initTheme() {
  const saved = localStorage.getItem('api-explorer-theme') || 'dark';
  applyTheme(saved);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  DOM.themeToggle.querySelector('i').className =
    theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  localStorage.setItem('api-explorer-theme', theme);
}

DOM.themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// ─── View Toggle ──────────────────────────────────────────────────────────────

DOM.viewGrid.addEventListener('click', () => setView('grid'));
DOM.viewList.addEventListener('click', () => setView('list'));

function setView(view) {
  AppState.set('view', view);
  DOM.resultsGrid.setAttribute('data-view', view);
  DOM.viewGrid.classList.toggle('active', view === 'grid');
  DOM.viewList.classList.toggle('active', view === 'list');
}

// ─── Error Boundary ───────────────────────────────────────────────────────────

function showError(err) {
  let title   = 'Something went wrong';
  let message = 'An unexpected error occurred. Please try again.';

  if (err instanceof ApiError) {
    title   = `Error ${err.statusCode}`;
    message = err.message;
  } else if (err instanceof NetworkError) {
    title   = 'Network Error';
    message = 'Check your internet connection and try again.';
  } else if (err instanceof TimeoutError) {
    title   = 'Request Timed Out';
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message;
  }

  DOM.errorTitle.textContent   = title;
  DOM.errorMessage.textContent = message;
  DOM.errorBoundary.classList.remove('hidden');
  DOM.resultsGrid.innerHTML = '';
  hideSkeletons();
  updateStats(0);
}

function hideError() {
  DOM.errorBoundary.classList.add('hidden');
  AppState.set('error', null);
}

DOM.retryBtn.addEventListener('click', () => {
  hideError();
  loadApi(AppState.get('activeApi'));
});

DOM.errorDismiss.addEventListener('click', hideError);

// ─── Loading State ────────────────────────────────────────────────────────────

function setLoading(on) {
  AppState.set('loading', on);
  if (on) {
    renderSkeletons(AppState.get('limit'));
    DOM.resultsGrid.innerHTML = '';
    DOM.emptyState.classList.add('hidden');
    hideError();
  } else {
    hideSkeletons();
  }
}

// ─── Stats ────────────────────────────────────────────────────────────────────

function updateStats(total) {
  const page  = AppState.get('page');
  const limit = AppState.get('limit');
  const start = Math.min((page - 1) * limit + 1, total);
  const end   = Math.min(page * limit, total);

  DOM.statsText.textContent = total === 0
    ? 'No results'
    : `Showing ${start}–${end} of ${total} results`;
}

// ─── Filters ──────────────────────────────────────────────────────────────────

function renderFilters(filterOptions) {
  DOM.filtersContainer.innerHTML = '';
  if (!filterOptions?.length) return;

  // "All" chip
  const allChip = document.createElement('button');
  allChip.className = `filter-chip ${!AppState.get('activeFilter') ? 'active' : ''}`;
  allChip.textContent = 'All';
  allChip.dataset.value = '';
  DOM.filtersContainer.appendChild(allChip);

  filterOptions.forEach(({ label, value }) => {
    const chip = document.createElement('button');
    chip.className = `filter-chip ${AppState.get('activeFilter') === value ? 'active' : ''}`;
    chip.textContent = label;
    chip.dataset.value = value;
    DOM.filtersContainer.appendChild(chip);
  });
}

// Event delegation on filter container
DOM.filtersContainer.addEventListener('click', (e) => {
  const chip = e.target.closest('.filter-chip');
  if (!chip) return;

  document.querySelectorAll('.filter-chip').forEach((c) => c.classList.remove('active'));
  chip.classList.add('active');

  AppState.set('activeFilter', chip.dataset.value);
  AppState.set('page', 1);
  applyFiltersAndRender();
});

// ─── Sort ─────────────────────────────────────────────────────────────────────

function renderSortOptions(sortOptions) {
  DOM.sortSelect.innerHTML = '<option value="">Sort by...</option>';
  sortOptions.forEach(({ label, value }) => {
    const opt = document.createElement('option');
    opt.value       = value;
    opt.textContent = label;
    if (AppState.get('sortValue') === value) opt.selected = true;
    DOM.sortSelect.appendChild(opt);
  });
}

DOM.sortSelect.addEventListener('change', () => {
  AppState.set('sortValue', DOM.sortSelect.value);
  AppState.set('page', 1);
  applyFiltersAndRender();
});

DOM.limitSelect.addEventListener('change', () => {
  AppState.set('limit', parseInt(DOM.limitSelect.value, 10));
  AppState.set('page', 1);
  applyFiltersAndRender();
});

// ─── Search ───────────────────────────────────────────────────────────────────

const handleSearch = debounce((query) => {
  AppState.set('query', query.trim());
  AppState.set('page', 1);
  applyFiltersAndRender();
}, 350);

DOM.searchInput.addEventListener('input', (e) => {
  handleSearch(e.target.value);
  DOM.clearSearch.style.display = e.target.value ? 'block' : 'none';
});

DOM.clearSearch.addEventListener('click', () => {
  DOM.searchInput.value = '';
  DOM.clearSearch.style.display = 'none';
  handleSearch.cancel();
  AppState.set('query', '');
  AppState.set('page', 1);
  applyFiltersAndRender();
});

// ─── Apply Filters & Render ───────────────────────────────────────────────────

function applyFiltersAndRender() {
  const api          = AppState.get('activeApi');
  const service      = services[api];
  const allItems     = AppState.get('allItems');
  const query        = AppState.get('query');
  const activeFilter = AppState.get('activeFilter');
  const sortValue    = AppState.get('sortValue');

  // Build filter params dynamically per API
  const filterParams = buildFilterParams(api, activeFilter, query);

  let filtered = service.filterItems(allItems, filterParams);

  if (sortValue) {
    filtered = service.sortItems(filtered, sortValue);
  }

  AppState.set('filteredItems', filtered);

  const { items, totalItems, totalPages, page } = paginate(
    filtered,
    AppState.get('page'),
    AppState.get('limit')
  );

  AppState.set('page', page);

  if (items.length === 0) {
    DOM.emptyState.classList.remove('hidden');
    DOM.resultsGrid.innerHTML = '';
  } else {
    DOM.emptyState.classList.add('hidden');
    renderCards(items, api, openModal);
  }

  updateStats(totalItems);
  renderPagination('pagination', {
    page,
    totalPages,
    onChange: (newPage) => {
      AppState.set('page', newPage);
      applyFiltersAndRender();
    },
  });
}

function buildFilterParams(api, activeFilter, query) {
  switch (api) {
    case 'countries': return { region: activeFilter, query };  // service uses continent internally
    case 'pokemon':   return { type: activeFilter, query };
    case 'jokes':     return { category: activeFilter, query };
    case 'quotes':    return { tag: activeFilter, query };
    default:          return { query };
  }
}

// ─── Load API ─────────────────────────────────────────────────────────────────

async function loadApi(apiName) {
  const service = services[apiName];
  if (!service) return;

  setLoading(true);
  AppState.reset();
  AppState.set('activeApi', apiName);

  try {
    const items = await service.fetchAll();
    AppState.set('allItems', items);

    // Render filter chips and sort options
    renderFilters(service.getFilterOptions(items));
    renderSortOptions(service.getSortOptions());

    // Reset search input
    DOM.searchInput.value = '';
    DOM.searchInput.placeholder = getSearchPlaceholder(apiName);
    DOM.clearSearch.style.display = 'none';

    applyFiltersAndRender();
    Toast.success('Loaded!', `${items.length} ${apiName} fetched successfully.`);

  } catch (err) {
    console.error('[App] Load error — type:', err.name, '| message:', err.message, '| full:', err);
    AppState.set('error', err);
    showError(err);
    Toast.error('Load Failed', err.message || 'Could not fetch data.');
  } finally {
    setLoading(false);
  }
}

function getSearchPlaceholder(api) {
  const map = {
    countries: 'Search by country, capital, language…',
    pokemon:   'Search by name or #ID…',
    jokes:     'Search joke text…',
    quotes:    'Search by quote or author…',
  };
  return map[api] || 'Search…';
}

// ─── Navigation ───────────────────────────────────────────────────────────────

// Throttle tab switching to prevent spam
const handleNavClick = throttle((apiName) => {
  if (apiName === AppState.get('activeApi') && !AppState.get('error')) return;

  document.querySelectorAll('.nav-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.api === apiName);
  });

  loadApi(apiName);
}, 500);

document.querySelectorAll('.nav-btn').forEach((btn) => {
  btn.addEventListener('click', () => handleNavClick(btn.dataset.api));
});

// ─── Modal ────────────────────────────────────────────────────────────────────

function openModal(item, type) {
  DOM.modalContent.innerHTML = buildModalHTML(item, type);
  DOM.modalOverlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  DOM.modalClose.focus();
}

function closeModal() {
  DOM.modalOverlay.classList.add('hidden');
  document.body.style.overflow = '';
}

DOM.modalClose.addEventListener('click', closeModal);

DOM.modalOverlay.addEventListener('click', (e) => {
  if (e.target === DOM.modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ─── Boot ─────────────────────────────────────────────────────────────────────

function init() {
  initTheme();
  loadApi('countries');
}

init();

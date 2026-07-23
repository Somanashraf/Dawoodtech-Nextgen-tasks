/**
 * apiService.js
 * Concrete API service layer — wraps the generic ApiClient with
 * domain-specific methods for each public API endpoint.
 *
 * APIs used (all free, CORS-enabled, no auth):
 *  - CountriesNow   → https://countriesnow.space/api/v0.1
 *  - PokéAPI        → https://pokeapi.co/api/v2
 *  - JokeAPI        → https://v2.jokeapi.dev
 *  - Quotable       → https://api.quotable.kurokeita.dev/api
 */

import { createApiClient, ApiError } from '../utils/apiClient.js';
import { memoize } from '../utils/performance.js';

// ─── Client instances ────────────────────────────────────────────────────────

const countriesClient = createApiClient('https://countriesnow.space/api/v0.1', {
  timeout: 20000,
  retries: 2,
  cacheTTL: 10 * 60 * 1000,
});

const pokeClient = createApiClient('https://pokeapi.co/api/v2', {
  timeout: 15000,
  retries: 2,
  cacheTTL: 15 * 60 * 1000,
});

const jokeClient = createApiClient('https://v2.jokeapi.dev', {
  timeout: 10000,
  retries: 2,
  cacheTTL: 2 * 60 * 1000,
});

const quoteClient = createApiClient('https://api.quotable.kurokeita.dev/api', {
  timeout: 15000,
  retries: 2,
  cacheTTL: 5 * 60 * 1000,
});

// ─── Normalizers ─────────────────────────────────────────────────────────────

// countriesnow /countries/info response:
// { name, capital, currency, iso2, iso3, flag, unicodeFlag, dialCode }
// Countries are normalized inline in the service — no separate normalizer needed.

function normalizePokemon(p) {
  const typeColors = {
    fire: '#f97316', water: '#3b82f6', grass: '#22c55e', electric: '#eab308',
    psychic: '#ec4899', ice: '#06b6d4', dragon: '#7c3aed', dark: '#374151',
    fairy: '#f9a8d4', normal: '#9ca3af', fighting: '#b45309', flying: '#60a5fa',
    poison: '#a855f7', ground: '#d97706', rock: '#78716c', bug: '#65a30d',
    ghost: '#6b21a8', steel: '#6b7280',
  };

  const types = p.types?.map((t) => t.type.name) || [];
  const color = typeColors[types[0]] || '#6366f1';

  return {
    id:       `#${String(p.id).padStart(3, '0')}`,
    name:     p.name.charAt(0).toUpperCase() + p.name.slice(1),
    subtitle: types.join(' / '),
    image:    p.sprites?.other?.['official-artwork']?.front_default
              || p.sprites?.front_default
              || null,
    imageAlt: `${p.name} artwork`,
    badge:    `#${p.id}`,
    tags:     types,
    accentColor: color,
    meta: {
      height:    `${(p.height / 10).toFixed(1)} m`,
      weight:    `${(p.weight / 10).toFixed(1)} kg`,
      hp:        p.stats?.find((s) => s.stat.name === 'hp')?.base_stat || 'N/A',
      attack:    p.stats?.find((s) => s.stat.name === 'attack')?.base_stat || 'N/A',
      defense:   p.stats?.find((s) => s.stat.name === 'defense')?.base_stat || 'N/A',
      speed:     p.stats?.find((s) => s.stat.name === 'speed')?.base_stat || 'N/A',
      abilities: p.abilities?.map((a) => a.ability.name).join(', ') || 'N/A',
      base_exp:  p.base_experience || 'N/A',
    },
    _raw: p,
  };
}

function normalizeJoke(j) {
  const text = j.type === 'single'
    ? j.joke
    : `${j.setup}\n\n${j.delivery}`;

  return {
    id:       j.id,
    name:     j.category || 'Joke',
    subtitle: `${j.type === 'twopart' ? 'Two-part' : 'Single'} · ${j.category}`,
    image:    null,
    badge:    j.category,
    tags:     j.flags
      ? Object.entries(j.flags).filter(([, v]) => v).map(([k]) => k)
      : [],
    text,
    meta: {
      id:       j.id,
      language: j.lang || 'en',
      safe:     j.safe ? 'Yes' : 'No',
      type:     j.type,
    },
    _raw: j,
  };
}

function normalizeQuote(q) {
  const tagNames = (q.tags || []).map((t) =>
    typeof t === 'string' ? t : (t?.name || '')
  ).filter(Boolean);

  return {
    id:       q._id || q.id || Math.random().toString(36).slice(2),
    name:     q.author?.name || q.author || 'Unknown',
    subtitle: tagNames.join(', ') || 'Quote',
    image:    null,
    badge:    tagNames[0] || 'Quote',
    tags:     tagNames,
    text:     q.content,
    meta: {
      author: q.author?.name || q.author || 'Unknown',
      length: q.length || q.content?.length || 'N/A',
      tags:   tagNames.join(', ') || 'N/A',
    },
    _raw: q,
  };
}

// ─── Countries Service ───────────────────────────────────────────────────────

export const countriesService = {
  async fetchAll() {
    // Single endpoint gives us: name, capital, currency, iso2, iso3, flag, dialCode, unicodeFlag
    const res = await countriesClient.get(
      '/countries/info',
      { returns: 'capital,currency,iso2,iso3,flag,unicodeFlag,dialCode' }
    );
    const list = res?.data || [];
    return list.map((c) => ({
      id:       c.iso3 || c.iso2 || c.name,
      name:     c.name || 'Unknown',
      subtitle: c.capital ? `Capital: ${c.capital}` : (c.iso2 || ''),
      image:    c.flag || null,
      imageAlt: `Flag of ${c.name}`,
      badge:    c.iso2 || '',
      tags:     c.currency ? [c.currency] : [],
      emoji:    c.unicodeFlag || '',
      meta: {
        capital:   c.capital   || 'N/A',
        currency:  c.currency  || 'N/A',
        iso2:      c.iso2      || 'N/A',
        iso3:      c.iso3      || 'N/A',
        dial_code: c.dialCode  || 'N/A',
      },
      _raw: c,
    }));
  },

  getFilterOptions(items) {
    // Build continent list from first letter of iso2 grouping is not available
    // Use currency regions as a proxy filter
    const currencies = [...new Set(items.map((c) => c.meta.currency).filter(Boolean))].sort();
    // Too many currencies — instead offer popular filter groups manually
    return [
      { label: 'EUR (Europe)', value: 'EUR' },
      { label: 'USD',          value: 'USD' },
      { label: 'GBP',          value: 'GBP' },
      { label: 'INR',          value: 'INR' },
      { label: 'AUD',          value: 'AUD' },
      { label: 'CAD',          value: 'CAD' },
    ];
  },

  filterItems(items, { region, query }) {
    let result = [...items];
    if (region) result = result.filter((c) => c.meta.currency === region);
    if (query) {
      const q = query.toLowerCase();
      result = result.filter((c) =>
        c.name.toLowerCase().includes(q) ||
        (c.meta.capital || '').toLowerCase().includes(q) ||
        (c.meta.iso2    || '').toLowerCase().includes(q) ||
        (c.meta.iso3    || '').toLowerCase().includes(q)
      );
    }
    return result;
  },

  getSortOptions() {
    return [
      { label: 'Name (A–Z)', value: 'name_asc'  },
      { label: 'Name (Z–A)', value: 'name_desc' },
    ];
  },

  sortItems(items, sort) {
    const sorted = [...items];
    if (sort === 'name_asc')  sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'name_desc') sorted.sort((a, b) => b.name.localeCompare(a.name));
    return sorted;
  },
};

// ─── Pokémon Service ─────────────────────────────────────────────────────────

const POKE_TOTAL = 151; // Gen 1

const fetchOnePokemon = memoize(async (nameOrId) => {
  const data = await pokeClient.get(`/pokemon/${nameOrId}`);
  return normalizePokemon(data);
});

export const pokemonService = {
  async fetchAll() {
    const listData = await pokeClient.get('/pokemon', { limit: POKE_TOTAL, offset: 0 });
    const names    = (listData?.results || []).map((p) => p.name);

    const chunkSize = 20;
    const results   = [];
    for (let i = 0; i < names.length; i += chunkSize) {
      const chunk  = names.slice(i, i + chunkSize);
      const batch  = await Promise.allSettled(chunk.map((n) => fetchOnePokemon(n)));
      batch.filter((r) => r.status === 'fulfilled').forEach((r) => results.push(r.value));
    }
    return results;
  },

  getFilterOptions() {
    return [
      { label: 'Fire',     value: 'fire'     },
      { label: 'Water',    value: 'water'    },
      { label: 'Grass',    value: 'grass'    },
      { label: 'Electric', value: 'electric' },
      { label: 'Psychic',  value: 'psychic'  },
      { label: 'Normal',   value: 'normal'   },
      { label: 'Dragon',   value: 'dragon'   },
      { label: 'Ghost',    value: 'ghost'    },
    ];
  },

  filterItems(items, { type, query }) {
    let result = [...items];
    if (type)  result = result.filter((p) => p.tags.includes(type));
    if (query) {
      const q = query.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) || p.id.includes(q)
      );
    }
    return result;
  },

  getSortOptions() {
    return [
      { label: 'ID ↑',       value: 'id_asc'    },
      { label: 'ID ↓',       value: 'id_desc'   },
      { label: 'Name (A–Z)', value: 'name_asc'  },
      { label: 'Name (Z–A)', value: 'name_desc' },
      { label: 'HP ↓',       value: 'hp_desc'   },
      { label: 'Attack ↓',   value: 'atk_desc'  },
    ];
  },

  sortItems(items, sort) {
    const sorted = [...items];
    switch (sort) {
      case 'id_asc':    sorted.sort((a, b) => parseInt(a.id) - parseInt(b.id)); break;
      case 'id_desc':   sorted.sort((a, b) => parseInt(b.id) - parseInt(a.id)); break;
      case 'name_asc':  sorted.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'name_desc': sorted.sort((a, b) => b.name.localeCompare(a.name)); break;
      case 'hp_desc':   sorted.sort((a, b) => (b.meta.hp  || 0) - (a.meta.hp  || 0)); break;
      case 'atk_desc':  sorted.sort((a, b) => (b.meta.attack || 0) - (a.meta.attack || 0)); break;
    }
    return sorted;
  },
};

// ─── Jokes Service ───────────────────────────────────────────────────────────

export const jokesService = {
  async fetchAll() {
    const categories = ['Programming', 'Misc', 'Pun', 'Spooky', 'Christmas'];
    const requests   = categories.map((cat) =>
      jokeClient.get(
        `/joke/${cat}`,
        { amount: 6, blacklistFlags: 'nsfw,racist,sexist,explicit' },
        { useCache: false }
      )
    );
    const results = await Promise.allSettled(requests);
    const jokes   = [];
    results.forEach((r) => {
      if (r.status !== 'fulfilled') return;
      const d = r.value;
      if (d?.jokes)          jokes.push(...d.jokes.map(normalizeJoke));
      else if (d?.id !== undefined) jokes.push(normalizeJoke(d));
    });
    return jokes;
  },

  getFilterOptions() {
    return [
      { label: 'Programming', value: 'Programming' },
      { label: 'Pun',         value: 'Pun'         },
      { label: 'Misc',        value: 'Misc'         },
      { label: 'Spooky',      value: 'Spooky'      },
      { label: 'Christmas',   value: 'Christmas'   },
    ];
  },

  filterItems(items, { category, query }) {
    let result = [...items];
    if (category) result = result.filter((j) => j.name === category);
    if (query) {
      const q = query.toLowerCase();
      result = result.filter((j) => j.text?.toLowerCase().includes(q));
    }
    return result;
  },

  getSortOptions() {
    return [
      { label: 'ID ↑',     value: 'id_asc'  },
      { label: 'ID ↓',     value: 'id_desc' },
      { label: 'Category', value: 'cat'     },
    ];
  },

  sortItems(items, sort) {
    const sorted = [...items];
    switch (sort) {
      case 'id_asc':  sorted.sort((a, b) => a.id - b.id); break;
      case 'id_desc': sorted.sort((a, b) => b.id - a.id); break;
      case 'cat':     sorted.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return sorted;
  },
};

// ─── Quotes Service ──────────────────────────────────────────────────────────

export const quotesService = {
  async fetchAll() {
    const pages   = [1, 2, 3];
    const results = await Promise.allSettled(
      pages.map((p) =>
        quoteClient.get('/quotes', { page: p, limit: 25 }, { useCache: true })
      )
    );
    const quotes = [];
    results.forEach((r) => {
      if (r.status !== 'fulfilled') return;
      const d    = r.value;
      // API returns { data: [...], metadata: {...} }
      const list = d?.data || d?.results || d?.quotes || (Array.isArray(d) ? d : []);
      quotes.push(...list.map(normalizeQuote));
    });
    return quotes;
  },

  getFilterOptions() {
    return [
      { label: 'Inspirational', value: 'Inspirational' },
      { label: 'Wisdom',        value: 'Wisdom'        },
      { label: 'Life',          value: 'Life'          },
      { label: 'Success',       value: 'Success'       },
      { label: 'Character',     value: 'Character'     },
      { label: 'Famous Quotes', value: 'Famous Quotes' },
    ];
  },

  filterItems(items, { tag, query }) {
    let result = [...items];
    if (tag) result = result.filter((q) => q.tags.includes(tag));
    if (query) {
      const q = query.toLowerCase();
      result = result.filter((item) =>
        item.text?.toLowerCase().includes(q) ||
        item.name?.toLowerCase().includes(q)
      );
    }
    return result;
  },

  getSortOptions() {
    return [
      { label: 'Author (A–Z)', value: 'author_asc'  },
      { label: 'Author (Z–A)', value: 'author_desc' },
      { label: 'Shortest',     value: 'len_asc'     },
      { label: 'Longest',      value: 'len_desc'    },
    ];
  },

  sortItems(items, sort) {
    const sorted = [...items];
    switch (sort) {
      case 'author_asc':  sorted.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'author_desc': sorted.sort((a, b) => b.name.localeCompare(a.name)); break;
      case 'len_asc':     sorted.sort((a, b) => (a.text?.length || 0) - (b.text?.length || 0)); break;
      case 'len_desc':    sorted.sort((a, b) => (b.text?.length || 0) - (a.text?.length || 0)); break;
    }
    return sorted;
  },
};

// ─── Service Registry ────────────────────────────────────────────────────────

export const services = {
  countries: countriesService,
  pokemon:   pokemonService,
  jokes:     jokesService,
  quotes:    quotesService,
};

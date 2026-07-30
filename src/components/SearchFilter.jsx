/**
 * SearchFilter — controlled form component for searching and filtering products.
 *
 * Props (all lifted up to the parent — demonstrates "lifting state up"):
 *  - searchQuery   {string}   Current search text
 *  - onSearchChange {function} Called with new search string
 *  - selectedCategory {string} Currently active category
 *  - onCategoryChange {function} Called with new category string
 *  - sortBy        {string}   Current sort key
 *  - onSortChange  {function} Called with new sort key
 *  - categories    {string[]} List of category options
 *  - resultCount   {number}   How many products match the current filters
 *
 * Concepts demonstrated:
 *  - Controlled inputs (value + onChange)
 *  - Passing event handler props from parent
 *  - Rendering lists from arrays (.map + key)
 */
function SearchFilter({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  categories,
  resultCount,
}) {
  return (
    <section className="search-filter" aria-label="Search and filter products">
      {/* ── Search input ── */}
      <div className="search-filter__search-wrap">
        <span className="search-filter__icon" aria-hidden="true">🔍</span>
        <input
          type="search"
          className="search-filter__input"
          placeholder="Search products…"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search products"
        />
        {/* Clear button — visible only when there is text */}
        {searchQuery && (
          <button
            className="search-filter__clear"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* ── Category tabs ── */}
      <div className="search-filter__categories" role="group" aria-label="Filter by category">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`search-filter__cat-btn ${selectedCategory === cat ? 'search-filter__cat-btn--active' : ''}`}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Sort select + result count ── */}
      <div className="search-filter__bottom">
        <p className="search-filter__count">
          {resultCount} product{resultCount !== 1 ? 's' : ''} found
        </p>
        <div className="search-filter__sort-wrap">
          <label htmlFor="sort-select" className="search-filter__sort-label">Sort by:</label>
          <select
            id="sort-select"
            className="search-filter__sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="default">Featured</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>
      </div>
    </section>
  )
}

export default SearchFilter

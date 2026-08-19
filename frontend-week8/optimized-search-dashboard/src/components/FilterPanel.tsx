import { memo, useCallback } from 'react';
import { FilterOptions } from '../types';
import styles from './FilterPanel.module.css';

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: Partial<FilterOptions>) => void;
  categories: string[];
  brands: string[];
}

function FilterPanelComponent({ filters, onFilterChange, categories, brands }: FilterPanelProps) {
  const handlePriceChange = useCallback((type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value) || 0;
    const newRange: [number, number] = [...filters.priceRange];
    if (type === 'min') {
      newRange[0] = numValue;
    } else {
      newRange[1] = numValue;
    }
    onFilterChange({ priceRange: newRange });
  }, [filters.priceRange, onFilterChange]);

  const handleBrandToggle = useCallback((brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    onFilterChange({ brands: newBrands });
  }, [filters.brands, onFilterChange]);

  const clearFilters = useCallback(() => {
    onFilterChange({
      category: '',
      priceRange: [0, 500000],
      minRating: 0,
      inStockOnly: false,
      brands: [],
      sortBy: 'name'
    });
  }, [onFilterChange]);

  const activeFilterCount = [
    filters.category !== '',
    filters.priceRange[0] > 0 || filters.priceRange[1] < 500000,
    filters.minRating > 0,
    filters.inStockOnly,
    filters.brands.length > 0
  ].filter(Boolean).length;

  return (
    <div className={styles.filterPanel}>
      <div className={styles.filterHeader}>
        <h2 className={styles.filterTitle}>Filters</h2>
        {activeFilterCount > 0 && (
          <button className={styles.clearButton} onClick={clearFilters}>
            Clear All ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className={styles.filterSection}>
        <label className={styles.filterLabel}>Category</label>
        <select
          className={styles.select}
          value={filters.category}
          onChange={(e) => onFilterChange({ category: e.target.value })}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div className={styles.filterSection}>
        <label className={styles.filterLabel}>Price Range (PKR)</label>
        <div className={styles.priceInputs}>
          <input
            type="number"
            className={styles.priceInput}
            placeholder="Min PKR"
            value={filters.priceRange[0]}
            onChange={(e) => handlePriceChange('min', e.target.value)}
            min="0"
          />
          <span className={styles.priceSeparator}>-</span>
          <input
            type="number"
            className={styles.priceInput}
            placeholder="Max PKR"
            value={filters.priceRange[1]}
            onChange={(e) => handlePriceChange('max', e.target.value)}
            min="0"
          />
        </div>
      </div>

      {/* Rating Filter */}
      <div className={styles.filterSection}>
        <label className={styles.filterLabel}>Minimum Rating</label>
        <div className={styles.ratingButtons}>
          {[0, 3, 3.5, 4, 4.5].map(rating => (
            <button
              key={rating}
              className={`${styles.ratingButton} ${filters.minRating === rating ? styles.active : ''}`}
              onClick={() => onFilterChange({ minRating: rating })}
            >
              {rating === 0 ? 'Any' : `${rating}★`}
            </button>
          ))}
        </div>
      </div>

      {/* Stock Filter */}
      <div className={styles.filterSection}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onFilterChange({ inStockOnly: e.target.checked })}
            className={styles.checkbox}
          />
          <span>In Stock Only</span>
        </label>
      </div>

      {/* Brand Filter */}
      <div className={styles.filterSection}>
        <label className={styles.filterLabel}>Brands</label>
        <div className={styles.brandList}>
          {brands.slice(0, 10).map(brand => (
            <label key={brand} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => handleBrandToggle(brand)}
                className={styles.checkbox}
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort Filter */}
      <div className={styles.filterSection}>
        <label className={styles.filterLabel}>Sort By</label>
        <select
          className={styles.select}
          value={filters.sortBy}
          onChange={(e) => onFilterChange({ sortBy: e.target.value as FilterOptions['sortBy'] })}
        >
          <option value="name">Name</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating</option>
          <option value="newest">Newest First</option>
        </select>
      </div>
    </div>
  );
}

export const FilterPanel = memo(FilterPanelComponent);

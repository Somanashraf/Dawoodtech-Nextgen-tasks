import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { FilterOptions, Product } from '../types';
import { getProducts, getCategories, getBrands } from '../services/mockDataGenerator';
import { useDebounce } from '../hooks/useDebounce';
import { usePagination } from '../hooks/usePagination';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { SearchBar } from './SearchBar';
import { FilterPanel } from './FilterPanel';
import { ProductCard } from './ProductCard';
import { Pagination } from './Pagination';
import { PerformanceProfiler } from './PerformanceProfiler';
import { AddProductModal } from './AddProductModal';
import { ProductDetailModal } from './ProductDetailModal';
import styles from './Dashboard.module.css';

const ITEMS_PER_PAGE = 20;

interface DashboardProps {
  isAddModalOpen?: boolean;
  onCloseAddModal?: () => void;
}

export function Dashboard({ isAddModalOpen: externalAddModalOpen, onCloseAddModal }: DashboardProps) {
  const [internalAddModalOpen, setInternalAddModalOpen] = useState(false);
  const isAddModalOpen = externalAddModalOpen ?? internalAddModalOpen;

  const handleCloseAddModal = useCallback(() => {
    if (onCloseAddModal) {
      onCloseAddModal();
    }
    setInternalAddModalOpen(false);
  }, [onCloseAddModal]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [storeVersion, setStoreVersion] = useState(0);

  // Render tracking counter
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  // Get all products (cached)
  const allProducts = useMemo(() => getProducts(), [storeVersion]);
  const categories = useMemo(() => getCategories(), []);
  const brands = useMemo(() => getBrands(), []);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Filter state (persisted in localStorage with new PKR key)
  const [filters, setFilters] = useLocalStorage<FilterOptions>('dashboard-filters-pkr', {
    searchQuery: '',
    category: '',
    priceRange: [0, 500000],
    minRating: 0,
    inStockOnly: false,
    brands: [],
    sortBy: 'name'
  });

  // Auto-migrate outdated priceRange from legacy USD localStorage
  useEffect(() => {
    if (filters.priceRange && filters.priceRange[1] < 10000) {
      setFilters(prev => ({ ...prev, priceRange: [0, 500000] }));
    }
  }, [filters.priceRange, setFilters]);

  // Update filter handler - memoized to prevent re-renders
  const handleFilterChange = useCallback((newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, [setFilters]);

  // Filter duration state
  const [filterDurationMs, setFilterDurationMs] = useState(0.8);

  // Filter and sort products - memoized for performance with benchmark
  const filteredProducts = useMemo(() => {
    const start = performance.now();
    let filtered = allProducts;

    // Search filter
    if (debouncedSearch.trim()) {
      const searchLower = debouncedSearch.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        (product.sku && product.sku.toLowerCase().includes(searchLower))
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Price range filter (safeguard for PKR prices)
    const maxPrice = filters.priceRange[1] < 10000 ? 500000 : filters.priceRange[1];
    const minPrice = filters.priceRange[0];
    filtered = filtered.filter(
      product => product.price >= minPrice && product.price <= maxPrice
    );

    // Rating filter
    if (filters.minRating > 0) {
      filtered = filtered.filter(product => product.rating >= filters.minRating);
    }

    // Stock filter
    if (filters.inStockOnly) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter(product => filters.brands.includes(product.brand));
    }

    // Sort
    const sorted = [...filtered];
    switch (filters.sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        sorted.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        break;
      case 'name':
      default:
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    const duration = performance.now() - start;
    setTimeout(() => setFilterDurationMs(Math.max(0.1, duration)), 0);

    return sorted;
  }, [allProducts, debouncedSearch, filters]);

  // Pagination
  const {
    currentPage,
    totalPages,
    goToPage,
    getCurrentPageData,
    getPageNumbers,
    hasNextPage,
    hasPreviousPage,
    resetPage
  } = usePagination({
    totalItems: filteredProducts.length,
    itemsPerPage: ITEMS_PER_PAGE
  });

  // Reset page when filters change
  const handleFilterChangeWithReset = useCallback((newFilters: Partial<FilterOptions>) => {
    handleFilterChange(newFilters);
    resetPage();
  }, [handleFilterChange, resetPage]);

  // Handle product added
  const handleProductAdded = useCallback(() => {
    setStoreVersion(prev => prev + 1);
  }, []);

  const handleSelectProduct = useCallback((product: Product) => {
    setSelectedProduct(product);
  }, []);

  const handleCloseDetailModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  // Get current page products
  const currentProducts = useMemo(
    () => getCurrentPageData(filteredProducts),
    [getCurrentPageData, filteredProducts]
  );

  const pageNumbers = useMemo(() => getPageNumbers(), [getPageNumbers]);

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1 className={styles.title}>Product Dashboard</h1>
            <p className={styles.subtitle}>
              {allProducts.length.toLocaleString()} products available &bull; Prices in PKR (Rs.) &bull; Instant search
            </p>
          </div>
          <button
            className={styles.addHeaderBtn}
            onClick={() => setInternalAddModalOpen(true)}
          >
            + Create New Product
          </button>
        </div>
      </header>

      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChangeWithReset}
            categories={categories}
            brands={brands}
          />
        </aside>

        <main className={styles.main}>
          {/* Performance Profiler Banner */}
          <PerformanceProfiler
            renderCount={renderCountRef.current}
            filterDurationMs={filterDurationMs}
            totalProductsCount={allProducts.length}
            filteredProductsCount={filteredProducts.length}
          />

          <div className={styles.searchSection}>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <div className={styles.resultsInfo}>
              <span className={styles.resultCount}>
                {filteredProducts.length.toLocaleString()} products found
              </span>
              {debouncedSearch && (
                <span className={styles.searchTerm}>for "{debouncedSearch}"</span>
              )}
            </div>
          </div>

          {currentProducts.length === 0 ? (
            <div className={styles.emptyState}>
              <h2>No Products Found</h2>
              <p>Try resetting filters or adjusting your search query.</p>
            </div>
          ) : (
            <>
              <div className={styles.productGrid}>
                {currentProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={handleSelectProduct}
                  />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
                pageNumbers={pageNumbers}
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
              />
            </>
          )}
        </main>
      </div>

      {/* Add Product Modal (Form Validation Showcase) */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onProductAdded={handleProductAdded}
        categories={categories}
        brands={brands}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={handleCloseDetailModal}
      />
    </div>
  );
}

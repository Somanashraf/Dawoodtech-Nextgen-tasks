import styles from './AboutPage.module.css';

export function AboutPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>About This Dashboard</h1>
        
        <section className={styles.section}>
          <h2>Performance Optimizations</h2>
          <p>
            This dashboard demonstrates advanced React performance optimization techniques
            for handling large datasets efficiently.
          </p>
          
          <div className={styles.features}>
            <div className={styles.feature}>
              <h3>🚀 React.memo</h3>
              <p>Components are memoized to prevent unnecessary re-renders when props haven't changed.</p>
            </div>
            
            <div className={styles.feature}>
              <h3>⚡ useMemo Hook</h3>
              <p>Expensive computations like filtering and sorting 5000+ products are memoized.</p>
            </div>
            
            <div className={styles.feature}>
              <h3>🔄 useCallback Hook</h3>
              <p>Event handlers are memoized to maintain referential equality across renders.</p>
            </div>
            
            <div className={styles.feature}>
              <h3>⏱️ Debouncing</h3>
              <p>Search input is debounced to reduce filtering operations during typing.</p>
            </div>
            
            <div className={styles.feature}>
              <h3>📦 Code Splitting</h3>
              <p>React.lazy and Suspense are used for route-based code splitting.</p>
            </div>
            
            <div className={styles.feature}>
              <h3>💾 Local Storage</h3>
              <p>Filter preferences are persisted across sessions for better UX.</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Technical Stack</h2>
          <ul className={styles.techList}>
            <li><strong>React 18</strong> - Modern React with concurrent features</li>
            <li><strong>TypeScript</strong> - Type-safe development</li>
            <li><strong>Vite</strong> - Fast build tool and dev server</li>
            <li><strong>CSS Modules</strong> - Scoped styling with no runtime overhead</li>
            <li><strong>Custom Hooks</strong> - Reusable logic for validation, pagination, and more</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Dataset Information</h2>
          <ul className={styles.techList}>
            <li>5,000 dynamically generated products</li>
            <li>8 main categories with subcategories</li>
            <li>28 different brands</li>
            <li>Multiple filter dimensions (price, rating, stock, brand)</li>
            <li>Real-time search across name, brand, and description</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

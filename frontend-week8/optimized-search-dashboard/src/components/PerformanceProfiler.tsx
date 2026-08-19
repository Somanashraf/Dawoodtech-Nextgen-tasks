import { useState } from 'react';
import { getApiLatency, setApiLatency } from '../services/apiService';
import styles from './PerformanceProfiler.module.css';

interface PerformanceProfilerProps {
  renderCount: number;
  filterDurationMs: number;
  totalProductsCount: number;
  filteredProductsCount: number;
}

export function PerformanceProfiler({
  renderCount,
  filterDurationMs,
  totalProductsCount,
  filteredProductsCount
}: PerformanceProfilerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentLatency, setCurrentLatency] = useState(getApiLatency());

  const handleLatencyChange = (newMs: number) => {
    setCurrentLatency(newMs);
    setApiLatency(newMs);
  };

  return (
    <div className={`${styles.container} ${isExpanded ? styles.expanded : ''}`}>
      <div className={styles.toggleHeader} onClick={() => setIsExpanded(prev => !prev)}>
        <div className={styles.headerTitle}>
          <span className={styles.titleText}>Performance Profiler</span>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.statText}>Filter: {filterDurationMs.toFixed(2)} ms</span>
          <button className={styles.expandBtn}>
            {isExpanded ? 'Hide Details ▲' : 'Inspect Performance ▼'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className={styles.detailsGrid}>
          {/* Card 1: Memoization Status */}
          <div className={styles.metricCard}>
            <div className={styles.cardHeader}>
              <h4>Optimization Hooks</h4>
            </div>
            <ul className={styles.hookList}>
              <li>
                <strong>React.memo</strong>: Re-renders suppressed on ProductCard & FilterPanel
              </li>
              <li>
                <strong>useMemo</strong>: Filter calculation cached ({filterDurationMs.toFixed(2)} ms)
              </li>
              <li>
                <strong>useCallback</strong>: Referential function equality preserved
              </li>
              <li>
                <strong>useDebounce</strong>: 300ms search throttle
              </li>
            </ul>
          </div>

          {/* Card 2: Render & Data Scale Stats */}
          <div className={styles.metricCard}>
            <div className={styles.cardHeader}>
              <h4>Execution Metrics</h4>
            </div>
            <div className={styles.statsRow}>
              <div className={styles.statBox}>
                <span className={styles.statNumber}>{renderCount}</span>
                <span className={styles.statLabel}>Renders</span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statNumber}>{totalProductsCount}</span>
                <span className={styles.statLabel}>Total Products</span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statNumber}>{filteredProductsCount}</span>
                <span className={styles.statLabel}>Filtered</span>
              </div>
            </div>
          </div>

          {/* Card 3: Simulated API Controls */}
          <div className={styles.metricCard}>
            <div className={styles.cardHeader}>
              <h4>API Latency Simulation</h4>
            </div>
            <p className={styles.latencyLabel}>
              Mock Network Delay: <strong>{currentLatency} ms</strong>
            </p>
            <div className={styles.btnGroup}>
              <button
                className={`${styles.latencyBtn} ${currentLatency === 0 ? styles.activeLatency : ''}`}
                onClick={() => handleLatencyChange(0)}
              >
                0ms
              </button>
              <button
                className={`${styles.latencyBtn} ${currentLatency === 300 ? styles.activeLatency : ''}`}
                onClick={() => handleLatencyChange(300)}
              >
                300ms
              </button>
              <button
                className={`${styles.latencyBtn} ${currentLatency === 1000 ? styles.activeLatency : ''}`}
                onClick={() => handleLatencyChange(1000)}
              >
                1000ms
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

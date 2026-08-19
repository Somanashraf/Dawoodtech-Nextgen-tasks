import { useMemo } from 'react';
import { getProducts } from '../services/mockDataGenerator';
import styles from './StatsPage.module.css';

export function StatsPage() {
  const stats = useMemo(() => {
    const products = getProducts();
    
    const totalProducts = products.length;
    const inStockProducts = products.filter(p => p.inStock).length;
    const avgPrice = products.reduce((sum, p) => sum + p.price, 0) / totalProducts;
    const avgRating = products.reduce((sum, p) => sum + p.rating, 0) / totalProducts;
    const totalReviews = products.reduce((sum, p) => sum + p.reviews, 0);
    
    const categoryStats = products.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = 0;
      }
      acc[product.category]++;
      return acc;
    }, {} as Record<string, number>);

    const brandStats = products.reduce((acc, product) => {
      if (!acc[product.brand]) {
        acc[product.brand] = 0;
      }
      acc[product.brand]++;
      return acc;
    }, {} as Record<string, number>);

    const topBrands = Object.entries(brandStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10);

    const priceRanges = {
      'Under Rs. 50,000': products.filter(p => p.price < 50000).length,
      'Rs. 50,000 - 150,000': products.filter(p => p.price >= 50000 && p.price < 150000).length,
      'Rs. 150,000 - 300,000': products.filter(p => p.price >= 150000 && p.price < 300000).length,
      'Over Rs. 300,000': products.filter(p => p.price >= 300000).length,
    };

    const ratingDistribution = {
      '5 Stars': products.filter(p => p.rating >= 4.5).length,
      '4+ Stars': products.filter(p => p.rating >= 4 && p.rating < 4.5).length,
      '3+ Stars': products.filter(p => p.rating >= 3 && p.rating < 4).length,
      'Below 3': products.filter(p => p.rating < 3).length,
    };

    return {
      totalProducts,
      inStockProducts,
      avgPrice,
      avgRating,
      totalReviews,
      categoryStats,
      topBrands,
      priceRanges,
      ratingDistribution
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Dashboard Statistics</h1>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📦</div>
            <div className={styles.statValue}>{stats.totalProducts.toLocaleString()}</div>
            <div className={styles.statLabel}>Total Products</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>✅</div>
            <div className={styles.statValue}>{stats.inStockProducts.toLocaleString()}</div>
            <div className={styles.statLabel}>In Stock</div>
            <div className={styles.statSubtext}>
              {((stats.inStockProducts / stats.totalProducts) * 100).toFixed(1)}% availability
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>💰</div>
            <div className={styles.statValue}>Rs. {Math.round(stats.avgPrice).toLocaleString()}</div>
            <div className={styles.statLabel}>Average Price</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>⭐</div>
            <div className={styles.statValue}>{stats.avgRating.toFixed(2)}</div>
            <div className={styles.statLabel}>Average Rating</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>💬</div>
            <div className={styles.statValue}>{stats.totalReviews.toLocaleString()}</div>
            <div className={styles.statLabel}>Total Reviews</div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Products by Category</h2>
          <div className={styles.barChart}>
            {Object.entries(stats.categoryStats).map(([category, count]) => {
              const percentage = (count / stats.totalProducts) * 100;
              return (
                <div key={category} className={styles.barItem}>
                  <div className={styles.barLabel}>
                    <span>{category}</span>
                    <span className={styles.barValue}>{count}</span>
                  </div>
                  <div className={styles.barTrack}>
                    <div 
                      className={styles.barFill} 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Top 10 Brands</h2>
          <div className={styles.rankingList}>
            {stats.topBrands.map(([brand, count], index) => (
              <div key={brand} className={styles.rankingItem}>
                <span className={styles.rank}>#{index + 1}</span>
                <span className={styles.rankingName}>{brand}</span>
                <span className={styles.rankingValue}>{count} products</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.twoColumn}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Price Distribution</h2>
            <div className={styles.distributionList}>
              {Object.entries(stats.priceRanges).map(([range, count]) => (
                <div key={range} className={styles.distributionItem}>
                  <span className={styles.distributionLabel}>{range}</span>
                  <span className={styles.distributionValue}>{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Rating Distribution</h2>
            <div className={styles.distributionList}>
              {Object.entries(stats.ratingDistribution).map(([rating, count]) => (
                <div key={rating} className={styles.distributionItem}>
                  <span className={styles.distributionLabel}>{rating}</span>
                  <span className={styles.distributionValue}>{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

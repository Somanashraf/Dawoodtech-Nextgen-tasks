import { Product } from '../types';
import styles from './ProductDetailModal.module.css';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  if (!product) return null;

  const {
    name,
    brand,
    category,
    subCategory,
    price,
    rating,
    reviews,
    inStock,
    description,
    tags,
    discount,
    image,
    sku,
    sellerEmail
  } = product;

  const originalPrice = discount > 0 ? Math.round(price / (1 - discount / 100)).toLocaleString() : null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>

        <div className={styles.container}>
          <div className={styles.imageColumn}>
            <img src={image} alt={name} className={styles.image} />
            {discount > 0 && <span className={styles.discountBadge}>-{discount}% OFF</span>}
          </div>

          <div className={styles.infoColumn}>
            <div className={styles.badgeRow}>
              <span className={styles.brandBadge}>{brand}</span>
              <span className={styles.categoryBadge}>{category} &bull; {subCategory}</span>
              {sku && <span className={styles.skuBadge}>SKU: {sku}</span>}
            </div>

            <h2 className={styles.title}>{name}</h2>

            <div className={styles.ratingRow}>
              <div className={styles.stars}>★★★★★</div>
              <span className={styles.ratingText}>{rating.toFixed(1)}</span>
              <span className={styles.reviewCount}>({reviews} verified customer reviews)</span>
            </div>

            <div className={styles.priceRow}>
              <span className={styles.currentPrice}>Rs. {price.toLocaleString()}</span>
              {originalPrice && <span className={styles.originalPrice}>Rs. {originalPrice}</span>}
              <span className={inStock ? styles.inStock : styles.outOfStock}>
                {inStock ? '● In Stock' : '○ Out of Stock'}
              </span>
            </div>

            <p className={styles.description}>{description}</p>

            <div className={styles.detailsList}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Tags:</span>
                <div className={styles.tagsGroup}>
                  {tags.map(t => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>
              </div>
              {sellerEmail && (
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Seller Contact:</span>
                  <span className={styles.detailValue}>{sellerEmail}</span>
                </div>
              )}
            </div>

            <div className={styles.actions}>
              <button
                className={styles.cartBtn}
                disabled={!inStock}
                onClick={() => alert(`Added "${name}" to cart!`)}
              >
                {inStock ? '🛒 Add to Cart' : 'Item Out of Stock'}
              </button>
              <button className={styles.wishlistBtn} onClick={onClose}>
                Close View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

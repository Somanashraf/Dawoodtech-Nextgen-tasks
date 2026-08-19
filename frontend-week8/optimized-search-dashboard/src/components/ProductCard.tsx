import { memo } from 'react';
import { Product } from '../types';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
}

function ProductCardComponent({ product, onSelect }: ProductCardProps) {
  const {
    name,
    price,
    rating,
    reviews,
    inStock,
    brand,
    image
  } = product;

  return (
    <div className={styles.card} onClick={() => onSelect?.(product)} style={{ cursor: onSelect ? 'pointer' : 'default' }}>
      <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.image} loading="lazy" />
        {!inStock && <div className={styles.outOfStock}>Out of Stock</div>}
      </div>
      
      <div className={styles.content}>
        <div className={styles.metaRow}>
          <span className={styles.brand}>{brand}</span>
          <div className={styles.rating}>
            <span className={styles.stars}>★</span>
            <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
            <span className={styles.reviews}>({reviews})</span>
          </div>
        </div>

        <h3 className={styles.title}>{name}</h3>

        <div className={styles.footer}>
          <span className={styles.price}>Rs. {price.toLocaleString()}</span>
          <button 
            className={styles.button}
            disabled={!inStock}
            onClick={(e) => {
              e.stopPropagation();
              if (inStock) alert(`Added "${name}" to cart!`);
            }}
          >
            {inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}

export const ProductCard = memo(ProductCardComponent, (prevProps, nextProps) => {
  return prevProps.product.id === nextProps.product.id && prevProps.onSelect === nextProps.onSelect;
});

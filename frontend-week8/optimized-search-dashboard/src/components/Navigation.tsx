import { memo } from 'react';
import styles from './Navigation.module.css';

interface NavigationProps {
  currentPage: 'home' | 'stats' | 'about';
  onNavigate: (page: 'home' | 'stats' | 'about') => void;
  onOpenAddModal?: () => void;
}

function NavigationComponent({ currentPage, onNavigate, onOpenAddModal }: NavigationProps) {
  return (
    <nav className={styles.nav}>
      <div className={styles.navContent}>
        <div className={styles.logo} onClick={() => onNavigate('home')}>
          <div className={styles.logoIcon}>⚡</div>
          <span className={styles.logoText}>OptimizedDash</span>
        </div>
        
        <div className={styles.navLinks}>
          <button
            className={`${styles.navLink} ${currentPage === 'home' ? styles.active : ''}`}
            onClick={() => onNavigate('home')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span>Dashboard</span>
          </button>
          
          <button
            className={`${styles.navLink} ${currentPage === 'stats' ? styles.active : ''}`}
            onClick={() => onNavigate('stats')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="20" x2="18" y2="10"/>
              <line x1="12" y1="20" x2="12" y2="4"/>
              <line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
            <span>Analytics</span>
          </button>
          
          <button
            className={`${styles.navLink} ${currentPage === 'about' ? styles.active : ''}`}
            onClick={() => onNavigate('about')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <span>Docs</span>
          </button>

          {onOpenAddModal && (
            <button
              className={styles.addBtn}
              onClick={onOpenAddModal}
            >
              <span>+ Add Product</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export const Navigation = memo(NavigationComponent);

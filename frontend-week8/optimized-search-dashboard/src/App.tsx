import { Suspense, lazy, useState, useCallback } from 'react';
import { Navigation } from './components/Navigation';
import { LoadingSpinner } from './components/LoadingSpinner';

// Lazy load pages for code splitting
const Dashboard = lazy(() => 
  import('./components/Dashboard').then(module => ({ default: module.Dashboard }))
);

const StatsPage = lazy(() => 
  import('./pages/StatsPage').then(module => ({ default: module.StatsPage }))
);

const AboutPage = lazy(() => 
  import('./pages/AboutPage').then(module => ({ default: module.AboutPage }))
);

type Page = 'home' | 'stats' | 'about';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleNavigate = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const handleOpenAddModal = useCallback(() => {
    setCurrentPage('home');
    setIsAddModalOpen(true);
  }, []);

  const handleCloseAddModal = useCallback(() => {
    setIsAddModalOpen(false);
  }, []);

  return (
    <>
      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenAddModal={handleOpenAddModal}
      />
      
      <Suspense fallback={<LoadingSpinner size="large" message="Loading page components..." />}>
        {currentPage === 'home' && (
          <Dashboard
            isAddModalOpen={isAddModalOpen}
            onCloseAddModal={handleCloseAddModal}
          />
        )}
        {currentPage === 'stats' && <StatsPage />}
        {currentPage === 'about' && <AboutPage />}
      </Suspense>
    </>
  );
}

export default App;

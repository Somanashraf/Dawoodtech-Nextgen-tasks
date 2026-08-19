import { useState, useMemo, useCallback } from 'react';
import { PaginationInfo } from '../types';

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage?: number;
  initialPage?: number;
}

export function usePagination({
  totalItems,
  itemsPerPage = 20,
  initialPage = 1
}: UsePaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Calculate pagination info - memoized to prevent recalculation
  const paginationInfo = useMemo((): PaginationInfo => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    return {
      currentPage: Math.max(1, Math.min(currentPage, totalPages || 1)),
      itemsPerPage,
      totalItems,
      totalPages
    };
  }, [currentPage, itemsPerPage, totalItems]);

  // Get items for current page
  const getCurrentPageData = useCallback(
    <T,>(data: T[]): T[] => {
      const startIndex = (paginationInfo.currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return data.slice(startIndex, endIndex);
    },
    [paginationInfo.currentPage, itemsPerPage]
  );

  // Navigation functions
  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const nextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, paginationInfo.totalPages));
  }, [paginationInfo.totalPages]);

  const previousPage = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  }, []);

  const goToFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const goToLastPage = useCallback(() => {
    setCurrentPage(paginationInfo.totalPages);
  }, [paginationInfo.totalPages]);

  // Reset to first page (useful when filters change)
  const resetPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  // Get page numbers for pagination UI
  const getPageNumbers = useCallback((): number[] => {
    const { totalPages, currentPage } = paginationInfo;
    const maxPagesToShow = 7;
    
    if (totalPages <= maxPagesToShow) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: number[] = [];
    const leftOffset = Math.floor(maxPagesToShow / 2);
    const rightOffset = maxPagesToShow - leftOffset - 1;

    let start = Math.max(1, currentPage - leftOffset);
    let end = Math.min(totalPages, currentPage + rightOffset);

    // Adjust if we're near the beginning or end
    if (currentPage <= leftOffset) {
      end = maxPagesToShow;
    } else if (currentPage >= totalPages - rightOffset) {
      start = totalPages - maxPagesToShow + 1;
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }, [paginationInfo]);

  return {
    paginationInfo,
    currentPage: paginationInfo.currentPage,
    totalPages: paginationInfo.totalPages,
    goToPage,
    nextPage,
    previousPage,
    goToFirstPage,
    goToLastPage,
    resetPage,
    getCurrentPageData,
    getPageNumbers,
    hasNextPage: paginationInfo.currentPage < paginationInfo.totalPages,
    hasPreviousPage: paginationInfo.currentPage > 1
  };
}

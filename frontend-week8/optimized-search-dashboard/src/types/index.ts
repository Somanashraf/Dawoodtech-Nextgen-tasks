export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  rating: number;
  reviews: number;
  inStock: boolean;
  brand: string;
  description: string;
  tags: string[];
  dateAdded: string;
  discount: number;
  image: string;
  sku?: string;
  sellerEmail?: string;
}

export interface FilterOptions {
  searchQuery: string;
  category: string;
  priceRange: [number, number];
  minRating: number;
  inStockOnly: boolean;
  brands: string[];
  sortBy: 'name' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

export interface PaginationInfo {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormValidation {
  isValid: boolean;
  errors: ValidationError[];
}

export interface NewProductFormData {
  name: string;
  brand: string;
  category: string;
  price: number;
  sku: string;
  sellerEmail: string;
  description: string;
  inStock: boolean;
}

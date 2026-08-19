import { Product, NewProductFormData } from '../types';
import { getProducts, addProductToStore } from './mockDataGenerator';

// Simulated API Cache
const apiCache = new Map<string, any>();

// Simulated API response delay in milliseconds
let latencyMs = 300;

export function setApiLatency(ms: number) {
  latencyMs = ms;
}

export function getApiLatency(): number {
  return latencyMs;
}

export async function fetchProductsAsync(forceRefresh = false): Promise<Product[]> {
  const cacheKey = 'all_products';
  if (!forceRefresh && apiCache.has(cacheKey)) {
    return apiCache.get(cacheKey);
  }

  await new Promise(resolve => setTimeout(resolve, latencyMs));
  const products = getProducts();
  apiCache.set(cacheKey, products);
  return products;
}

export async function checkSkuAvailabilityAsync(sku: string): Promise<{ available: boolean; message?: string }> {
  await new Promise(resolve => setTimeout(resolve, Math.min(latencyMs, 200)));
  const products = getProducts();
  const existing = products.find(p => p.sku && p.sku.toLowerCase() === sku.toLowerCase());
  
  if (existing) {
    return { available: false, message: `SKU '${sku}' is already assigned to ${existing.name}` };
  }
  return { available: true };
}

export async function createProductAsync(formData: NewProductFormData): Promise<Product> {
  await new Promise(resolve => setTimeout(resolve, latencyMs + 200));

  const categoryImages: Record<string, string> = {
    Electronics: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
    Fashion: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80',
    Gaming: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=500&auto=format&fit=crop&q=80',
    Sports: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=80',
  };

  const newProduct: Product = {
    id: `prod-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    name: formData.name,
    brand: formData.brand,
    category: formData.category,
    subCategory: 'Custom',
    price: formData.price,
    rating: 5.0,
    reviews: 1,
    inStock: formData.inStock,
    description: formData.description,
    tags: ['New', 'Featured', formData.category],
    dateAdded: new Date().toISOString(),
    discount: 0,
    image: categoryImages[formData.category] || categoryImages.Electronics,
    sku: formData.sku,
    sellerEmail: formData.sellerEmail,
  };

  addProductToStore(newProduct);
  apiCache.delete('all_products');
  return newProduct;
}

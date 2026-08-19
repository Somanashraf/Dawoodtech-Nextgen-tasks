import { Product } from '../types';

const categories = [
  { name: 'Electronics', subs: ['Smartphones', 'Laptops', 'Headphones', 'Cameras', 'Smartwatches'] },
  { name: 'Fashion', subs: ['Sneakers', 'Watches', 'Bags', 'Sunglasses', 'Accessories'] },
  { name: 'Gaming', subs: ['Consoles', 'Controllers', 'Headsets', 'Keyboards', 'Mice'] },
  { name: 'Sports', subs: ['Fitness', 'Outdoor', 'Yoga', 'Running', 'Cycling'] }
];

const brands = [
  'Samsung', 'Apple', 'Infinix', 'Tecno', 'Xiaomi', 'Sapphire', 
  'Khaadi', 'Junaid Jamshed', 'Audionic', 'Dawlance', 'Haier', 'Nike', 
  'Adidas', 'Dell', 'HP', 'Sony'
];

const adjectives = [
  'Premium', 'Professional', 'Ultimate', 'Advanced', 'Smart', 'Wireless',
  'Portable', 'Compact', 'Powerful', 'Elegant', 'Modern', 'Classic',
  'Durable', 'Lightweight', 'High-Performance', 'Energy-Efficient',
  'Eco-Friendly', 'Innovative', 'Versatile', 'Sleek'
];

const productNouns = [
  'Series X', 'Pro', 'Max', 'Plus', 'Air', 'Edge', 'Elite', 'Prime',
  'Ultra', 'Lite', 'Mini', 'Mega', 'Turbo', 'Fusion', 'Nexus',
  'Quantum', 'Infinity', 'Zenith', 'Apex', 'Summit'
];

const descriptions = [
  'Experience cutting-edge technology with our latest innovation.',
  'Designed for professionals in Pakistan who demand the best.',
  'Perfect blend of style and functionality with official warranty.',
  'Industry-leading performance with fast delivery across Pakistan.',
  'Elevate your experience with 100% authentic products.',
  'Built to last with attention to every detail.',
  'Transform the way you work and play.',
  'Engineered for excellence and reliability.',
  'Your perfect companion for daily adventures.',
  'Discover unmatched quality and performance.'
];

const tags = [
  'bestseller', 'new-arrival', 'trending', 'limited-edition', 'exclusive',
  'premium', 'budget-friendly', 'cash-on-delivery', 'official-warranty', 'imported',
  'sale', 'clearance', 'popular', 'recommended'
];

function generateRandomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString();
}

// Real product images from Unsplash
const productImages = {
  'Smartphones': [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
    'https://images.unsplash.com/photo-1592286927505-c80e3cc0a0e4?w=500',
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500',
    'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500',
    'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500'
  ],
  'Laptops': [
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500',
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500'
  ],
  'Headphones': [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500',
    'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500'
  ],
  'Cameras': [
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
    'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500',
    'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=500',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500',
    'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500'
  ],
  'Smartwatches': [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500',
    'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500',
    'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500',
    'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=500'
  ],
  'Sneakers': [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500',
    'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500',
    'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500'
  ],
  'Watches': [
    'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500',
    'https://images.unsplash.com/photo-1539185441755-769473a23570?w=500',
    'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=500'
  ],
  'Bags': [
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500',
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500'
  ],
  'Sunglasses': [
    'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500'
  ],
  'Accessories': [
    'https://images.unsplash.com/photo-1611591475281-b174b216503c?w=500',
    'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500'
  ],
  'Consoles': [
    'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500',
    'https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=500'
  ],
  'Controllers': [
    'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=500',
    'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=500'
  ],
  'Headsets': [
    'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=500',
    'https://images.unsplash.com/photo-1599669454699-248893623440?w=500'
  ],
  'Keyboards': [
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
    'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500'
  ],
  'Mice': [
    'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500',
    'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500'
  ],
  'Fitness': [
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500',
    'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500'
  ],
  'Outdoor': [
    'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500',
    'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=500'
  ],
  'Yoga': [
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500'
  ],
  'Running': [
    'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=500'
  ],
  'Cycling': [
    'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500'
  ]
};

function getImageForCategory(subCategory: string, index: number): string {
  const images = productImages[subCategory as keyof typeof productImages];
  if (images && images.length > 0) {
    return images[index % images.length];
  }
  return `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500`;
}

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function generateMockProducts(count: number = 500): Product[] {
  const products: Product[] = [];
  const startDate = new Date('2023-01-01');
  const endDate = new Date();

  for (let i = 0; i < count; i++) {
    const categoryData = getRandomItem(categories);
    const category = categoryData.name;
    const subCategory = getRandomItem(categoryData.subs);
    const brand = getRandomItem(brands);
    const adjective = getRandomItem(adjectives);
    const noun = getRandomItem(productNouns);
    
    // Price in PKR (Rs. 15,000 to Rs. 450,000)
    const rawPrice = (Math.floor(Math.random() * 435) + 15) * 1000;
    const discount = Math.random() > 0.7 ? Math.floor(Math.random() * 40) + 10 : 0;
    const price = Math.round(rawPrice * (1 - discount / 100));
    
    const rating = parseFloat((Math.random() * 1.5 + 3.5).toFixed(1));
    const reviews = Math.floor(Math.random() * 500) + 50;
    const inStock = Math.random() > 0.1;
    
    const productTags = getRandomItems(tags, Math.floor(Math.random() * 3) + 1);

    products.push({
      id: `prod-${i + 1}`,
      name: `${brand} ${adjective} ${subCategory} ${noun}`,
      category,
      subCategory,
      price,
      rating,
      reviews,
      inStock,
      brand,
      description: getRandomItem(descriptions),
      tags: productTags,
      dateAdded: generateRandomDate(startDate, endDate),
      discount,
      image: getImageForCategory(subCategory, i)
    });
  }

  return products;
}

let cachedProducts: Product[] | null = null;

export function getProducts(): Product[] {
  if (!cachedProducts) {
    cachedProducts = generateMockProducts(500);
  }
  return cachedProducts;
}

export function addProductToStore(newProduct: Product): void {
  const current = getProducts();
  cachedProducts = [newProduct, ...current];
}

export function resetProductsStore(count: number = 500): void {
  cachedProducts = generateMockProducts(count);
}

export function getCategories(): string[] {
  return categories.map(c => c.name);
}

export function getBrands(): string[] {
  return [...brands].sort();
}

export function getSubCategories(category: string): string[] {
  const categoryData = categories.find(c => c.name === category);
  return categoryData ? categoryData.subs : [];
}

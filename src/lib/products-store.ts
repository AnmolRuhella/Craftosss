import { Product } from '@/types/product';

// In-memory store for products (in production, use a database)
let products: Product[] = [
  {
    id: "1",
    name: "Handmade Wall Art",
    description: "Beautiful handcrafted wall art piece made with natural materials. Perfect for adding a touch of elegance to any room.",
    price: 2500,
    category: "Decor",
    images: ["/placeholder.jpg"],
    materials: ["Wood", "Canvas", "Acrylic Paint"],
    dimensions: "24x36 inches",
    customizable: true,
    stock: 15,
    featured: true,
  },
  {
    id: "2",
    name: "Wooden Table Decor",
    description: "Natural & minimal wooden centerpiece. Hand-carved from sustainable wood sources.",
    price: 1800,
    category: "Furniture",
    images: ["/placeholder.jpg"],
    materials: ["Oak Wood", "Natural Oil Finish"],
    dimensions: "12x12x8 inches",
    customizable: false,
    stock: 8,
    featured: true,
  },
];

export const getProducts = () => products;

export const getProductById = (id: string) => {
  return products.find(p => p.id === id);
};

export const addProduct = (product: Omit<Product, 'id' | 'createdAt'>) => {
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  products.push(newProduct);
  return newProduct;
};

export const updateProduct = (id: string, updates: Partial<Product>) => {
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updates };
    return products[index];
  }
  return null;
};

export const deleteProduct = (id: string) => {
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products.splice(index, 1);
    return true;
  }
  return false;
};

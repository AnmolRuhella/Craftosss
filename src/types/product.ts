export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  videos?: string[];
  materials?: string[];
  dimensions?: string;
  customizable?: boolean;
  stock?: number;
  featured?: boolean;
  createdAt?: string;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  quantity: number;
  message?: string;
  customization?: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
}

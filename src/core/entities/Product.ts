export interface Product {
  id?: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  scentType: string;
  description: string;
  notes?: string;
  inStock: boolean;
  createdAt?: Date;
}

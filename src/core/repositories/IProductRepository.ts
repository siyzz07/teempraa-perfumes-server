import { Product } from '../entities/Product';

export interface IProductRepository {
  findAll(params?: {
    search?: string;
    category?: string;
    sortBy?: string;
    page?: number;
    limit?: number;
  }): Promise<{ products: Product[]; total: number }>;
  findById(id: string): Promise<Product | null>;
  create(product: Product): Promise<Product>;
  update(id: string, product: Partial<Product>): Promise<Product | null>;
  delete(id: string): Promise<boolean>;
}

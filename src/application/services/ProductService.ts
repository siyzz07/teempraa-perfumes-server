import { Product } from '../../core/entities/Product';
import { IProductRepository } from '../../core/repositories/IProductRepository';

export class ProductService {
  constructor(private productRepository: IProductRepository) {}

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  async getProductById(id: string): Promise<Product | null> {
    return await this.productRepository.findById(id);
  }

  async createProduct(productData: Product): Promise<Product> {
    return await this.productRepository.create(productData);
  }

  async updateProduct(id: string, productData: Partial<Product>): Promise<Product | null> {
    return await this.productRepository.update(id, productData);
  }

  async deleteProduct(id: string): Promise<boolean> {
    return await this.productRepository.delete(id);
  }
}

import { Product } from "../../core/entities/Product";
import { IProductRepository } from "../../core/repositories/IProductRepository";
import { ProductModel } from "../database/schemas/ProductSchema";

export class MongooseProductRepository implements IProductRepository {
  private mapToDomain(doc: any): Product {
    return {
      id: doc._id.toString(),
      name: doc.name,
      price: doc.price,
      originalPrice: doc.originalPrice,
      images: doc.images,
      scentType: doc.scentType,
      description: doc.description,
      notes: doc.notes,
      inStock: doc.inStock,
      createdAt: doc.createdAt,
    };
  }

  async findAll(): Promise<Product[]> {
    const docs = await ProductModel.find().sort({ createdAt: -1 });
    return docs.map(this.mapToDomain);
  }

  async findById(id: string): Promise<Product | null> {
    const doc = await ProductModel.findById(id);
    return doc ? this.mapToDomain(doc) : null;
  }

  async create(product: Product): Promise<Product> {
    const doc = new ProductModel(product);
    await doc.save();
    return this.mapToDomain(doc);
  }

  async update(id: string, product: Partial<Product>): Promise<Product | null> {
    const doc = await ProductModel.findByIdAndUpdate(id, product, {
      new: true,
    });
    return doc ? this.mapToDomain(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await ProductModel.findByIdAndDelete(id);
    return result !== null;
  }
}

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
      reviews: doc.reviews,
      createdAt: doc.createdAt,
    };
  }

  async findAll(params?: {
    search?: string;
    category?: string;
    sortBy?: string;
    page?: number;
    limit?: number;
  }): Promise<{ products: Product[]; total: number }> {
    const query: any = {};

    if (params?.search) {
      query.$or = [
        { name: { $regex: params.search, $options: "i" } },
        { description: { $regex: params.search, $options: "i" } },
        { scentType: { $regex: params.search, $options: "i" } },
      ];
    }

    if (params?.category && params.category !== 'All') {
      query.scentType = params.category;
    }

    const sort: any = {};
    if (params?.sortBy === 'price-low') sort.price = 1;
    else if (params?.sortBy === 'price-high') sort.price = -1;
    else sort.createdAt = -1;

    const page = params?.page || 1;
    const limit = params?.limit || 12;
    const skip = (page - 1) * limit;

    const [docs, total] = await Promise.all([
      ProductModel.find(query).sort(sort).skip(skip).limit(limit),
      ProductModel.countDocuments(query),
    ]);

    return {
      products: docs.map(this.mapToDomain),
      total,
    };
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

  async update(id: string, productData: Partial<Product>): Promise<Product | null> {
    const { id: _, ...updateData } = productData as any;
    const doc = await ProductModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return doc ? this.mapToDomain(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await ProductModel.findByIdAndDelete(id);
    return result !== null;
  }
}

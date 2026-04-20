import { ShopSettings } from '../../core/entities/ShopSettings';
import { IShopRepository } from '../../core/repositories/IShopRepository';
import { ShopModel } from '../database/schemas/ShopSchema';

export class MongooseShopRepository implements IShopRepository {
  private mapToDomain(doc: any): ShopSettings {
    return {
      id: doc._id.toString(),
      shopName: doc.shopName,
      description: doc.description,
      address: doc.address,
      phone: doc.phone,
      email: doc.email,
      profilePic: doc.profilePic,
      coverPhotos: doc.coverPhotos,
      location: doc.location
    };
  }

  async getSettings(): Promise<ShopSettings | null> {
    const doc = await ShopModel.findOne();
    return doc ? this.mapToDomain(doc) : null;
  }

  async updateSettings(settings: Partial<ShopSettings>): Promise<ShopSettings | null> {
    let doc = await ShopModel.findOne();
    if (doc) {
      Object.assign(doc, settings);
      await doc.save();
    } else {
      doc = new ShopModel(settings);
      await doc.save();
    }
    return this.mapToDomain(doc);
  }
}

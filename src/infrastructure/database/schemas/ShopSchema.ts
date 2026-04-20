import mongoose, { Schema, Document } from 'mongoose';

export interface IShopDocument extends Document {
  shopName: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  whatsapp?: string;
  instagram?: string;
  profilePic?: string;
  coverPhotos?: string[];
  location?: {
    lat: number;
    lng: number;
  };
}

const ShopSchema: Schema = new Schema({
  shopName: { type: String },
  description: { type: String },
  address: { type: String },
  phone: { type: String },
  email: { type: String },
  whatsapp: { type: String },
  instagram: { type: String },
  profilePic: { type: String },
  coverPhotos: { type: [String] },
  location: {
    lat: { type: Number },
    lng: { type: Number }
  }
});

export const ShopModel = mongoose.model<IShopDocument>('ShopSettings', ShopSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface IShopDocument extends Document {
  shopName: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  profilePic?: string;
  coverPhotos?: string[];
  location?: {
    lat: number;
    lng: number;
  };
}

const ShopSchema: Schema = new Schema({
  shopName: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  profilePic: { type: String },
  coverPhotos: { type: [String] },
  location: {
    lat: { type: Number },
    lng: { type: Number }
  }
});

export const ShopModel = mongoose.model<IShopDocument>('ShopSettings', ShopSchema);

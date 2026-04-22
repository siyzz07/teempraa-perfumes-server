import mongoose, { Schema, Document } from "mongoose";

export interface IProductDocument extends Document {
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  scentType: string;
  description: string;
  notes?: string;
  inStock: boolean;
  reviews?: Array<{
    user: string;
    comment: string;
    rating: number;
  }>;
  createdAt: Date;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  images: { type: [String], required: true },
  scentType: { type: String, required: true },
  description: { type: String, required: true },
  notes: { type: String },
  inStock: { type: Boolean, default: true },
  reviews: [{
    user: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 }
  }],
  createdAt: { type: Date, default: Date.now },
});

export const ProductModel = mongoose.model<IProductDocument>(
  "Product",
  ProductSchema,
);

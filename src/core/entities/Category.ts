import mongoose, { Schema, Document } from 'mongoose';

export interface IScentType extends Document {
  name: string;
  slug: string;
  description?: string;
  createdAt: Date;
}

const ScentTypeSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IScentType>('ScentType', ScentTypeSchema);

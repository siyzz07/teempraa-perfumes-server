import ScentType, { IScentType } from '../../core/entities/Category';
import { IScentTypeRepository } from '../../core/repositories/IScentTypeRepository';

export class MongooseScentTypeRepository implements IScentTypeRepository {
  async findAll(): Promise<IScentType[]> {
    return await ScentType.find().sort({ name: 1 });
  }

  async findById(id: string): Promise<IScentType | null> {
    return await ScentType.findById(id);
  }

  async create(scentTypeData: Partial<IScentType>): Promise<IScentType> {
    const scentType = new ScentType(scentTypeData);
    return await scentType.save();
  }

  async update(id: string, scentTypeData: Partial<IScentType>): Promise<IScentType | null> {
    return await ScentType.findByIdAndUpdate(id, scentTypeData, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await ScentType.findByIdAndDelete(id);
    return result !== null;
  }
}

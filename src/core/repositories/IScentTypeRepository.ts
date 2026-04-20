import { IScentType } from '../entities/Category';

export interface IScentTypeRepository {
  findAll(): Promise<IScentType[]>;
  findById(id: string): Promise<IScentType | null>;
  create(scentType: Partial<IScentType>): Promise<IScentType>;
  update(id: string, scentType: Partial<IScentType>): Promise<IScentType | null>;
  delete(id: string): Promise<boolean>;
}

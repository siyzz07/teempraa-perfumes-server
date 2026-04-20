import { IScentTypeRepository } from '../../core/repositories/IScentTypeRepository';
import { IScentType } from '../../core/entities/Category';

export class ScentTypeService {
  constructor(private scentTypeRepository: IScentTypeRepository) {}

  async getAllScentTypes() {
    return await this.scentTypeRepository.findAll();
  }

  async getScentTypeById(id: string) {
    return await this.scentTypeRepository.findById(id);
  }

  async addScentType(scentTypeData: Partial<IScentType>) {
    if (scentTypeData.name && !scentTypeData.slug) {
        scentTypeData.slug = scentTypeData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    }
    return await this.scentTypeRepository.create(scentTypeData);
  }

  async updateScentType(id: string, scentTypeData: Partial<IScentType>) {
    if (scentTypeData.name && !scentTypeData.slug) {
        scentTypeData.slug = scentTypeData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    }
    return await this.scentTypeRepository.update(id, scentTypeData);
  }

  async removeScentType(id: string) {
    return await this.scentTypeRepository.delete(id);
  }
}

import { ShopSettings } from '../../core/entities/ShopSettings';
import { IShopRepository } from '../../core/repositories/IShopRepository';

export class ShopService {
  constructor(private shopRepository: IShopRepository) {}

  async getSettings(): Promise<ShopSettings | null> {
    return await this.shopRepository.getSettings();
  }

  async updateSettings(settings: Partial<ShopSettings>): Promise<ShopSettings | null> {
    return await this.shopRepository.updateSettings(settings);
  }
}

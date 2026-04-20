import { ShopSettings } from '../entities/ShopSettings';

export interface IShopRepository {
  getSettings(): Promise<ShopSettings | null>;
  updateSettings(settings: Partial<ShopSettings>): Promise<ShopSettings | null>;
}

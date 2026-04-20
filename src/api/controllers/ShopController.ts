import { Request, Response } from 'express';
import { ShopService } from '../../application/services/ShopService';

export class ShopController {
  constructor(private shopService: ShopService) {}

  getSettings = async (req: Request, res: Response) => {
    try {
      const settings = await this.shopService.getSettings();
      res.status(200).json(settings);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  updateSettings = async (req: Request, res: Response) => {
    try {
      const settings = await this.shopService.updateSettings(req.body);
      res.status(200).json(settings);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
}

import { Router } from 'express';
import { ShopController } from '../controllers/ShopController';
import { ShopService } from '../../application/services/ShopService';
import { MongooseShopRepository } from '../../infrastructure/repositories/MongooseShopRepository';

const router = Router();
const shopRepo = new MongooseShopRepository();
const shopService = new ShopService(shopRepo);
const shopController = new ShopController(shopService);

router.get('/', shopController.getSettings);
router.put('/', shopController.updateSettings);

export default router;

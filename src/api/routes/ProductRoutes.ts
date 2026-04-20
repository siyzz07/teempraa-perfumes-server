import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import { ProductService } from '../../application/services/ProductService';
import { MongooseProductRepository } from '../../infrastructure/repositories/MongooseProductRepository';

import { authMiddleware } from '../middleware/auth';

const router = Router();
const productRepo = new MongooseProductRepository();
const productService = new ProductService(productRepo);
const productController = new ProductController(productService);

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', authMiddleware, productController.create);
router.put('/:id', authMiddleware, productController.update);
router.delete('/:id', authMiddleware, productController.delete);

export default router;

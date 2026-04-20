import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { AuthService } from '../../application/services/AuthService';
import { MongooseUserRepository } from '../../infrastructure/repositories/MongooseUserRepository';

const router = Router();
const userRepo = new MongooseUserRepository();
const authService = new AuthService(userRepo);
const authController = new AuthController(authService);

router.post('/login', authController.login);
router.post('/refresh', authController.refresh);
router.post('/setup', authController.setup);

export default router;

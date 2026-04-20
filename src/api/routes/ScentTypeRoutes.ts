import { Router } from 'express';
import { 
    getAllScentTypes, getScentTypeById, addScentType, 
    updateScentType, deleteScentType 
} from '../controllers/ScentTypeController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', getAllScentTypes);
router.get('/:id', getScentTypeById);
router.post('/', authMiddleware, addScentType);
router.put('/:id', authMiddleware, updateScentType);
router.delete('/:id', authMiddleware, deleteScentType);

export default router;

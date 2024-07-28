import { Router } from 'express';
import { create, getAll, update, remove } from '../controllers/productController';
import { roleBasedAccess, authorization } from '../middleware/authMiddleware';

const router = Router();

router.use(authorization);
router.use(roleBasedAccess);

router.post('/products', create);
router.get('/products', getAll);
router.put('/products/:id', update);
router.delete('/products/:id', remove);

export default router;

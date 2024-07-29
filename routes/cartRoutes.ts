import { Router } from 'express';
import { addToCart, getCart } from '../controllers/cartController';
import { authorization } from '../middleware/authMiddleware';

const router = Router();

router.use(authorization);

router.post('/cart', addToCart);
router.get('/cart', getCart);

export default router;

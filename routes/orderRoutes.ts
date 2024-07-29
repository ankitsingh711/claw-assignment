import express from 'express';
import { placeOrder, getOrders } from '../controllers/orderController';
import { authorization } from '../middleware/authMiddleware';
const router = express.Router();

router.use(authorization)

router.post('/orders', placeOrder);

router.get('/orders', getOrders);

export default router;
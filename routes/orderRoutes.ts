import express from 'express';
import { placeOrder, getAllOrders, payment } from '../controllers/orderController';
const router = express.Router();

router.post('/orders', placeOrder);

router.get('/orders', getAllOrders);

router.post('/payment', payment);

export default router;
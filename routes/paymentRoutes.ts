import { Router } from 'express';
import { processPayment } from '../controllers/paymentController';
import { authorization } from '../middleware/authMiddleware';

const router = Router();

router.post('/payment', authorization, processPayment);

export default router;

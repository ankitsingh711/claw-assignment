import express from 'express';
import { userLogIn, userRegister } from '../controllers/userController';
const router = express.Router();

router.post('/register', userLogIn);

router.post('/login', userRegister);

export default router;
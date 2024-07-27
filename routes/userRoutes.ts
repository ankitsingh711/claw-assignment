import express from 'express';
import { userLogIn, userRegister, retrieveSession } from '../controllers/userController';
const router = express.Router();

router.post('/register', userLogIn);

router.post('/login', userRegister);

router.get('/session', retrieveSession);

export default router;
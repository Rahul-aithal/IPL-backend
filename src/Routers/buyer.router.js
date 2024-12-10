import { Router } from 'express';
import { buyerSignup, buyerSignin } from '../controllers/Buyer.controller.js';

const router = Router();

// Buyer SignUp
router.post('/signUp', buyerSignup);

// Buyer SignIn
router.post('/signIn', buyerSignin);

export default router;

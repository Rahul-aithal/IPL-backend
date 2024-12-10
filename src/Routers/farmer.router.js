import { Router } from "express";
import { farmerSignup, farmerSignin } from '../controllers/Farmer.controller.js';

const router = Router();

// Sign Up route
router.post('/signUp', farmerSignup);

// Sign In route
router.post('/signIn', farmerSignin);

export default router;  // Correct export syntax for ES modules

import express from 'express';
import {
    buyerSignup,
    buyerSignin,
    buyerSignOut,
    refreshAccessTokenBuyer,
    updateBuyerData
} from '../controllers/Buyer.controller.js';
import { verifyTokenBuyer } from '../middleware/verifyJWT.middleware.js';

const router = express.Router();

// Buyer Sign-Up Route
router.post('/signup', async (req, res, next) => {
  try {
    await buyerSignup(req, res);
  } catch (error) {
    next(error);  // Pass the error to the global error handler
  }
});

// Buyer Sign-In Route
router.post('/signin', async (req, res, next) => {
  try {
    await buyerSignin(req, res);
  } catch (error) {
    next(error);  // Pass the error to the global error handler
  }
});

// Buyer Sign-Out Route
router.post('/signout', verifyTokenBuyer,async (req, res, next) => {
  try {
    await buyerSignOut(req, res);
  } catch (error) {
    next(error);  // Pass the error to the global error handler
  }
});

// Refresh Access Token Route
router.post('/refresh-token', async (req, res, next) => {
  try {
    await refreshAccessTokenBuyer(req, res);
  } catch (error) {
    next(error);  // Pass the error to the global error handler
  }
});

router.put("/buyers/:userId",verifyTokenBuyer, updateBuyerData);

export default router;

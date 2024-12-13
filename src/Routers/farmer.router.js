import express from 'express';
import {
    farmerSignup,
    farmerSignin,
    farmerSignOut,
    refreshAccessTokenFarmer,updateFarmer
} from '../controllers/Farmer.controller.js';
import { verifyTokenFarmer } from '../middleware/verifyJWT.middleware.js';

const router = express.Router();

// Farmer Sign-Up Route
router.post('/signup', async (req, res, next) => {
  try {
    await farmerSignup(req, res);
  } catch (error) {
    next(error);  // Pass the error to the global error handler
  }
});

// Farmer Sign-In Route
router.post('/signin', async (req, res, next) => {
  try {
    await farmerSignin(req, res);
  } catch (error) {
    next(error);  // Pass the error to the global error handler
  }
});

// Farmer Sign-Out Route
router.post('/signout',verifyTokenFarmer, async (req, res, next) => {
  try {
    await farmerSignOut(req, res);
  } catch (error) {
    next(error);  // Pass the error to the global error handler
  }
});

// Refresh Access Token Route
router.post('/refresh-token', async (req, res, next) => {
  try {
    await refreshAccessTokenFarmer(req, res);
  } catch (error) {
    next(error);  // Pass the error to the global error handler
  }
});


router.put("/updated",verifyTokenFarmer,updateFarmer);

export default router;

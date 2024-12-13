import express from "express";
import { addToCart, deleteOneFromCart, deleteAllFromCart, getCart } from "../controllers/Cart.controller.js"; // Assuming you have the functions in the controller
import { verifyTokenBuyer } from "../middleware/verifyJWT.middleware.js"; // Assuming you have an auth middleware for authentication

const router = express.Router();

// Route for adding a product to the cart
router.post("/add", verifyTokenBuyer, addToCart);

// Route for deleting one product from the cart
router.delete("/remove/:productId", verifyTokenBuyer, deleteOneFromCart);

// Route for deleting all products from the cart
router.delete("/clear", verifyTokenBuyer, deleteAllFromCart);

// Route for getting the current cart
router.get("/", verifyTokenBuyer, getCart);

export default router;

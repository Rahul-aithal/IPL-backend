import express from "express";
import {
    addProduct,
    deleteProduct,
    updateProduct,
    getProductById,
    listAllProducts,
    searchProducts,
} from "../controllers/Products.controller.js";
import { verifyTokenFarmer } from "../middleware/verifyJWT.middleware.js"; // Assuming you have an auth middleware

const router = express.Router();

// Add a new product
router.post("/products/add", verifyTokenFarmer, addProduct);

// Delete a product
router.delete("/products/:productId", verifyTokenFarmer, deleteProduct);

// Update a product
router.put("/products/:productId", verifyTokenFarmer, updateProduct);

router.get("/products", listAllProducts);

router.post("/products/serach", verifyTokenFarmer, searchProducts);

router.get("/prouducts/:id", getProductById);

export default router;

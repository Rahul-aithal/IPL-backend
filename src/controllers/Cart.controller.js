import { Cart } from "../model/Cart.Schema.js"; // Import your Cart schema
import { Product } from "../model/Proudct.Schema.js"; // Import your Product schema

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Validate input
        if (!productId || !quantity || quantity <= 0) {
            return res
                .status(400)
                .json({ message: "Invalid product ID or quantity." });
        }

        // Find the product
        const product = await Product.findOne({_id:productId});
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        // Check if the cart exists, if not, create a new cart
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            cart = new Cart({
                user: req.user._id,
                items: [],
                totalPrice: 0, // Initial total price is 0
            });
        }

        // Check if the product already exists in the cart
        const existingCartItem = cart.items.find(
            (item) => item.product.toString() === productId
        );

        if (existingCartItem) {
            // Update the quantity of the existing product in the cart
            existingCartItem.quantity += quantity;
            if(existingCartItem.quantity>product.stock){
                existingCartItem.quantity -=quantity;
            }
        } else {
            // Add a new product to the cart
            cart.items.push({ product: productId, quantity });
        }

        // Save the updated cart
        await cart.save();

        res.status(200).json({
            message: "Product added to cart successfully.",
            cart,
        });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({
            message: "Internal server error while adding to cart.",
        });
    }
};

export const deleteOneFromCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Validate input
        if (!productId || !quantity || quantity <= 0) {
            return res
                .status(400)
                .json({ message: "Invalid product ID or quantity." });
        }

        // Find the cart item
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found." });
        }

        const item = cart.items.find(
            (item) => item.productId.toString() === productId
        );
        if (!item) {
            return res
                .status(404)
                .json({ message: "Product not found in cart." });
        }

        if (item.quantity > quantity) {
            // Reduce the quantity
            await Cart.updateOne(
                { user: req.user._id, "items.productId": productId },
                { $inc: { "items.$.quantity": -quantity } }
            );
        } else {
            // Remove the item if quantity becomes 0 or less
            await Cart.updateOne(
                { user: req.user._id },
                { $pull: { items: { productId: productId } } }
            );
        }

        res.status(200).json({
            message: "Product quantity updated or removed from cart.",
        });
    } catch (error) {
        console.error("Error deleting product from cart:", error);
        res.status(500).json({
            message: "Internal server error while removing product from cart.",
        });
    }
};

export const deleteAllFromCart = async (req, res) => {
    try {
        // Remove all items from the user's cart
        await Cart.updateOne({ user: req.user._id }, { $set: { items: [] } });

        res.status(200).json({
            message: "All items removed from cart successfully.",
        });
    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).json({
            message: "Internal server error while clearing cart.",
        });
    }
};

export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate(
            "items.product"
        ); // Populate product details

        if (!cart) {
            return res.status(404).json({ message: "Cart not found." });
        }

        res.status(200).json({ cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
};

import { Product } from "../model/Proudct.Schema.js"; // Adjust the import path as necessary

export const addProduct = async (req, res) => {
    try {
        const { productName, category, price, description, stock } = req.body;

        // Validate input
        if (!productName || !category || !price || !stock) {
            return res
                .status(400)
                .json({ message: "All fields are required." });
        }

        // Create a new product
        const newProduct = new Product({
            productName,
            category,
            price,
            description,
            stock,
            owner: req.user._id, // Assuming `req.user._id` holds the farmer's ID
        });

        // Save product to the database
        const savedProduct = await newProduct.save();

        return res.status(201).json({
            message: "Product added successfully.",
            product: savedProduct,
        });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({
            message: "Internal server error while adding product.",
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        // Find and delete the product
        const deletedProduct = await Product.findOneAndDelete({
            _id: productId,
            owner: req.user._id, // Ensure the farmer can only delete their own products
        });

        if (!deletedProduct) {
            return res
                .status(404)
                .json({ message: "Product not found or unauthorized action." });
        }

        return res.status(200).json({
            message: "Product deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({
            message: "Internal server error while deleting product.",
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const updates = req.body;

        // Find the product and update it
        const updatedProduct = await Product.findOneAndUpdate(
            {
                _id: productId,
                owner: req.user._id, // Ensure the farmer can only update their own products
            },
            updates,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res
                .status(404)
                .json({ message: "Product not found or unauthorized action." });
        }

        return res.status(200).json({
            message: "Product updated successfully.",
            product: updatedProduct,
        });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({
            message: "Internal server error while updating product.",
        });
    }
};

// List all products
export const listAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}).select(
            "-owner -updatedAt -createdAt -__v"
        );
        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error while fetching products",
            error: error.message,
        });
    }
};

// Search for products by name or category
export const searchProducts = async (req, res) => {
    try {
        const { query } = req.body; // Get the search query from the query string (e.g., /search?q=Apple)
        if (!query) {
            return res
                .status(400)
                .json({ message: "Search query is required" });
        }

        const products = await Product.find({
            $or: [
                { productName: { $regex: query, $options: "i" } }, // Case-insensitive search by name
                { category: { $regex: query, $options: "i" } }, // Case-insensitive search by category
            ],
        });

        if (products.length === 0) {
            return res
                .status(404)
                .json({ message: "No products match the search query" });
        }

        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error while searching for products",
            error: error.message,
        });
    }
};

// Get product by ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params; // Get the product ID from the route parameters (e.g., /product/:id)
        const product = await Product.findById(id).select(
            "-owner -updatedAt -createdAt -__v"
        );

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error while fetching product by ID",
            error: error.message,
        });
    }
};

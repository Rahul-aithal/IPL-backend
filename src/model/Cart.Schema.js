import mongoose, { Schema } from "mongoose";
import {Product} from "./Proudct.Schema.js"

// Create cart schema
const cartSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "Buyer", // Reference to the Buyer model
            required: true, // Ensures the cart is associated with a user
        },
        items: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "Product", // Reference to the Product model
                    required: true, // Ensures every cart item refers to a valid product
                },
                quantity: {
                    type: Number,
                    required: true, // Quantity of the product
                    min: 1, // Quantity should be at least 1
                    default: 1, // Default quantity is 1
                },
            },
        ],
        totalPrice: {
            type: Number,
            required: true,
            min: 0, // Ensures total price cannot be negative
            default: 0, // Default total price is 0
        },
    },
    {
        timestamps: true, // Adds `createdAt` and `updatedAt` fields
    }
);
cartSchema.pre("save", async function (next) {
    if (this.isModified("items")) {
        let total = 0;

        // Calculate total price based on items in the cart
        for (const item of this.items) {
            const product = await Product.findById(item.product); // Find the product
            if (product) {
                total += product.price * item.quantity; // Calculate the price for this item
            }
        }

        this.totalPrice = total; // Update the totalPrice field
    }
    next();
})
export const Cart = mongoose.model("Cart", cartSchema);

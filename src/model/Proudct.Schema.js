import mongoose, { Schema } from "mongoose";

// Create user schema
const productsSchema = new Schema(
    {
        productName: {
            type: String,
            required: true,
            trim: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "Farmer",
            required: true, // Ensures every product is linked to a farmer
        },
        price: {
            type: Number,
            required: true,
            min: 0, // Ensures price is non-negative
        },
        description: {
            type: String,
            trim: true, // Removes extra spaces around the text
            required: true, // Ensures a description is provided
        },
        stock: {
            type: Number,
            required: true,
            min: 0, // Ensures stock cannot be negative
            default: 0, // Sets default stock to 0
        },
        category: {
            type: String,
            required: true, // Ensures a category is provided
            trim: true,
            enum: ["Fruits", "Vegetables", "Dairy", "Grains", "Other"], // Example categories
        },
        images: [
            {
                type: String, // URL or path to the product image
                required: false,
            },
        ],
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
);




export const Product = mongoose.model("Product", productsSchema);

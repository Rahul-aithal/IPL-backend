import mongoose, { Schema, Document, Model } from "mongoose";

export type BuyerType = {
    username: string;
    email: string;
    authNumber: string;
    password: string;
};
export interface IBuyer extends Document, BuyerType {
    buyHistory: mongoose.Types.ObjectId[];
    refreshToken?: string;
}

// Create user schema
const buyerSchema = new Schema<IBuyer>(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password:{
            type:String,
            required:[true,"Password is required"],
        },
        buyHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Module",
            },
        ],
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Create and export User model
export const Buyer: Model<IBuyer> = mongoose.model<IBuyer>("Buyer", buyerSchema);
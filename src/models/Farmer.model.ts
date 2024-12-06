import mongoose, { Schema, Document, Model } from "mongoose";

export type FarmerType = {
  username: string;
  email: string;
  authNumber: string;
};
export interface IFarmer extends Document, FarmerType {
  sellHistory: mongoose.Types.ObjectId[];
  refreshToken?: string;
}

// Create user schema
const userSchema = new Schema<IFarmer>(
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
    authNumber: {
      type: String,
      required: [true, "USN is required"],
      unique: true,
    },
    sellHistory: [
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
export const Farmer: Model<IFarmer> = mongoose.model<IFarmer>(
  "Farmer",
  userSchema
);

  import mongoose, { Schema } from "mongoose";
  // Create user schema
  const byerSchema = new Schema(
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
      password: {
        type: String,
        required: [true, "USN is required"],
        unique: true,
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
  byerSchema.methods.generateAccessToken =  function () {
      try {
          const token =  jwt.sign({
              _id: this._id,
              email:this.email
          }, process.env.ACCESS_TOKEN_SECRET,
              {
                  expiresIn: process.env.ACCESS_TOKEN_EXPIRY
              }
          )
          return token
      }
      catch (error) {
          console.log(error);
          throw new Error(error, "in generateAccessToken")
      }
  }

  byerSchema.methods.generateRefreshToken =  function () {
      try {
          const token =  jwt.sign({
              _id: this._id,
          }, process.env.REFRESH_TOKEN_SECRET,
              {
                  expiresIn: process.env.REFRESH_TOKEN_EXPIRY
              }
          )
          return token
      }
      catch (error) {
          console.log(error);
          throw new Error(error, "in refreshAccessToken")
      }
  }
  // Create and export User model
  export const Buyer = mongoose.model(
    "Buyer",
    byerSchema
  );
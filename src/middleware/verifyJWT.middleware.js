import jwt from "jsonwebtoken";
import { Farmer } from "../model/Farmer.Schema.js";
import { Buyer } from "../model/Buyer.Schema.js";

const verifyToken = (Model) => {
    return async (req, res, next) => {
        try {
            // Get token from cookies or Authorization header
            const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

            if (!token) {
                return res.status(401).json({ success: false, message: "Unauthorized Request" });
            }

            // Verify the token
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

            // Find user by decoded token ID
            const user = await Model.findById(decodedToken._id).select(
                "-createdAt -updatedAt -refreshToken -password"
            );

            if (!user) {
                return res.status(401).json({ success: false, message: "Invalid Access Token" });
            }

            // Attach user to request object
            req.user = user;
            next();
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ success: false, message: "Token has expired" });
            } else if (err.name === "JsonWebTokenError") {
                return res.status(401).json({ success: false, message: "Invalid Token" });
            } else {
                return res.status(500).json({ success: false, message: "Internal Server Error" });
            }
        }
    };
};

// Specific middlewares for Farmers and Buyers
export const verifyTokenFarmer = verifyToken(Farmer);
export const verifyTokenBuyer = verifyToken(Buyer);

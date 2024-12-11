import dotenv from "dotenv";
import { app } from "./app.js";
import ConnnectDb from "./db/index.js";

dotenv.config({
    path: './.env',
});

// Connect to the database
ConnnectDb()
    .then(() => {
        console.log("Database connected.");
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
    });

// Export the handler for Vercel
export default async function handler(req, res) {
    await app(req, res);
}

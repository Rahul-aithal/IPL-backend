import dotenv from "dotenv";
import ConnnectDb from "./db/index.js";
import { app } from "./app.js";

console.log("Starting the server...");

dotenv.config({
    path: './.env',
});

console.log("Environment variables loaded.");

ConnnectDb()
    .then(() => {
        console.log("Database connected successfully.");
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at http://localhost:${process.env.PORT || 8000}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed!", err);
    });

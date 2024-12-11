import dotenv from "dotenv";
import ConnectDb from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

let dbConnected = false;

// Export a serverless handler
export default async (req, res) => {
  if (!dbConnected) {
    try {
      await ConnectDb(); // Connect to the database only once
      dbConnected = true;
      console.log("Database connected!");
    } catch (err) {
      console.error("MongoDB connection failed!", err);
      res.status(500).send("Database connection error");
      return;
    }
  }
  app(req, res); // Let Express handle the incoming request
};

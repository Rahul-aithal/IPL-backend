import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env",
  });
  
const ConnnectDb = async () => {
    try {
        const uri =  `${process.env.DB_URI}IPL`;
        const connectionInstance = await mongoose.connect(uri);

        console.log(
            `MongoDB connected at host: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.log("MongoDB connection", error);

        process.exit(1);
    }
};

export default ConnnectDb;

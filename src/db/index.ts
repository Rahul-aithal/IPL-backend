import mongoose from "mongoose";
import dotenv from "dotenv";

// 
const ConnnectDb = async () => {
    try {
        const uri =  `mongodb://localhost:27017/IPL`;
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

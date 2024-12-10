import mongoose from "mongoose";


const ConnnectDb=async()=>{
try {
    const uri =  `${process.env.DB_URI}IPL`;
    const connectionInstance = await mongoose.connect(uri);
    console.log("Mongo DB connected at host || DB Host:: ",connectionInstance.connection.host);
    
} catch (error) {
    console.log("MongoDB connection",error);
    
    process.exit(1)
}
}

export default ConnnectDb

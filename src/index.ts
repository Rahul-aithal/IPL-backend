import dotenv from "dotenv";
import ConnnectDb from "./db/index";
import { app } from "./app";
import { Error } from "mongoose";

const PORT =  process.env.PORT || 8000

dotenv.config({
    path: "./.env",
});

ConnnectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server is running at port ",PORT)    
    })})
    .catch((err:Error) => {
       console.error(`Error is connecting Mongodb ${err}`);
    });

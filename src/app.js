import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: false, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//Routes

import farmerRouter from "./Routers/farmer.router.js";
import buyerRouter from "./Routers/buyer.router.js";
import productRouter from "./Routers/products.router.js";
import cartRouter from "./Routers/cart.router.js";

app.get("/test", (req, res) => {
    res.send("HELLO WOLRD");
});
//Routes declartion
app.use("/api/farmer", farmerRouter);
app.use("/api/buyer", buyerRouter);
app.use("/api", productRouter);
app.use("/api/cart", cartRouter);

export { app };

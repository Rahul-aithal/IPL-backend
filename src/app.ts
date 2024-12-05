import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: false, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//Routes
app.get("/api", (req: Request, res: Response) => {
  res.json({ ping: "pong" });
});

import UserRouter from "./routes/user.routes";
app.use("/api/user", UserRouter);

export { app };

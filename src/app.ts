import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: false, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//Routes
app.get("/", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/html");
  res.send("<h1>Welcome to IPL Backend!</h1>");
});

app.get("/api", (req: Request, res: Response) => {
  res.json({ ping: "pong" });
});

import UserRouter from "./routes/user.routes";
app.use("/api/user", UserRouter);

export { app };

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json({ limit: "16kb" }));
app.use(express_1.default.urlencoded({ extended: false, limit: "16kb" }));
app.use(express_1.default.static("public"));
app.use((0, cookie_parser_1.default)());
//Routes
app.get("/", (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.send("<h1>Welcome to IPL Backend!</h1>");
});
app.get("/api", (req, res) => {
    res.json({ ping: "pong" });
});
const user_routes_1 = __importDefault(require("./routes/user.routes"));
app.use("/api/user", user_routes_1.default);

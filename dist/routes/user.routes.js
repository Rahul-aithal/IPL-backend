"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const router = express_1.default.Router();
const userController = new userController_1.default();
router.get("/users", userController.getAllUsers);
router.get("/users/buyer/:id", userController.getBuyerById);
router.get("/users/farmer/:id", userController.getFarmersById);
router.post("/users/buyer", userController.createBuyer);
router.post("/users/farmer", userController.createFarmer);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);
exports.default = router;

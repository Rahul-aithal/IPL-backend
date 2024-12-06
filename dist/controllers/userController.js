"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("../services/user.service");
const asynchandler_1 = require("../utils/asynchandler");
const ApiResponse_1 = require("../utils/ApiResponse");
class UserController {
    constructor() {
        this.getAllUsers = (0, asynchandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userService.getAllUsers();
            res.json(users);
        }));
        this.getFarmersById = (0, asynchandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const user = yield this.userService.getFarmerById(id);
            res.status(200).json(new ApiResponse_1.ApiResponse(200, user, "Success"));
        }));
        this.getBuyerById = (0, asynchandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const user = yield this.userService.getBuyerById(id);
            res.status(200).json(new ApiResponse_1.ApiResponse(200, user, "Success"));
        }));
        this.createFarmer = (0, asynchandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userData = req.body;
            const user = yield this.userService.createFarmerServices(userData);
            res.status(200).json(new ApiResponse_1.ApiResponse(200, user, "Success"));
        }));
        this.createBuyer = (0, asynchandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userData = req.body;
            const user = yield this.userService.createBuyerServices(userData);
            res.status(200).json(new ApiResponse_1.ApiResponse(200, user, "Success"));
        }));
        this.updateUser = (0, asynchandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const userData = req.body;
            const user = yield this.userService.updateUser(id, userData);
            res.status(200).json(new ApiResponse_1.ApiResponse(200, user, "Success"));
        }));
        this.deleteUser = (0, asynchandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield this.userService.deleteUser(id);
            res.status(200).json(new ApiResponse_1.ApiResponse(200, "", "User deleted successfully"));
        }));
        this.userService = new user_service_1.UserService();
    }
}
exports.default = UserController;

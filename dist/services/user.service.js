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
exports.UserService = void 0;
const Buyer_model_1 = require("../models/Buyer.model");
const Farmer_model_1 = require("../models/Farmer.model");
const ApiError_1 = require("../utils/ApiError");
class UserService {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            // implement logic to get all users
            // return ["User 1", "User 2", "User 3"];
        });
    }
    getFarmerById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new ApiError_1.ApiError(400, "User ID is required");
            }
            const user = yield Farmer_model_1.Farmer.findById(id);
            if (!user) {
                throw new ApiError_1.ApiError(404, "User not found");
            }
            return user;
        });
    }
    getBuyerById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new ApiError_1.ApiError(400, "User ID is required");
            }
            const user = yield Buyer_model_1.Buyer.findById(id);
            if (!user) {
                throw new ApiError_1.ApiError(404, "User not found");
            }
            return user;
        });
    }
    createFarmerServices(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user) {
                throw new ApiError_1.ApiError(404, "Farmer data is missing");
            }
            // implement logic to create farmer
            const farmer = yield Farmer_model_1.Farmer.findOne({ authNumber: user.authNumber });
            if (farmer) {
                throw new ApiError_1.ApiError(400, "Farmer already exists");
            }
            const newFarmer = yield Farmer_model_1.Farmer.create(user);
            yield newFarmer.save();
            return newFarmer;
        });
    }
    createBuyerServices(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user) {
                throw new ApiError_1.ApiError(404, "Buyer data is missing");
            }
            const buyer = yield Buyer_model_1.Buyer.findOne({ authNumber: user.email });
            if (buyer) {
                throw new ApiError_1.ApiError(400, "Buyer already exists");
            }
            const newBuyer = yield Buyer_model_1.Buyer.create(user);
            yield newBuyer.save();
            return newBuyer;
        });
    }
    updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            // implement logic to update user
            // return "User 1";
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // implement logic to delete user
        });
    }
}
exports.UserService = UserService;

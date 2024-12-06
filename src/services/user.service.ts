import { Buyer, BuyerType, IBuyer } from "../models/Buyer.model";
import { Farmer, FarmerType, IFarmer } from "../models/Farmer.model";
import { ApiError } from "../utils/ApiError";

export class UserService {
  async getAllUsers(): Promise<any> {
    // implement logic to get all users
    // return ["User 1", "User 2", "User 3"];
  }

  async getFarmerById(id: string): Promise<any> {
    if (!id) {
      throw new ApiError(400, "User ID is required");
    }
    const user = await Farmer.findById(id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    return user;
  }

  async getBuyerById(id: string): Promise<any> {
    if (!id) {
      throw new ApiError(400, "User ID is required");
    }
    const user = await Buyer.findById(id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    return user;
  }

  async createFarmerServices(user: FarmerType): Promise<IFarmer> {
    if (!user) {
      throw new ApiError(404, "Farmer data is missing");
    }
    // implement logic to create farmer
    const farmer = await Farmer.findOne({ authNumber: user.authNumber });
    if (farmer) {
      throw new ApiError(400, "Farmer already exists");
    }

    const newFarmer = await Farmer.create(user);
    await newFarmer.save();

    return newFarmer;
  }

  async createBuyerServices(user: BuyerType): Promise<IBuyer> {
    if (!user) {
      throw new ApiError(404, "Buyer data is missing");
    }

    const buyer = await Buyer.findOne({ authNumber: user.email });
    if (buyer) {
      throw new ApiError(400, "Buyer already exists");
    }
    const newBuyer = await Buyer.create(user);
    await newBuyer.save();
    return newBuyer;
  }

  async updateUser(id: string, user: any): Promise<any> {
    // implement logic to update user
    // return "User 1";
  }

  async deleteUser(id: string): Promise<void> {
    // implement logic to delete user
  }
}

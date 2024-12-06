import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { asyncHandler } from '../utils/asynchandler';
import { ApiResponse } from '../utils/ApiResponse';

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await this.userService.getAllUsers();
    res.json(users);
  });

  getFarmersById = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await this.userService.getFarmerById(id);
    res.status(200).json(new ApiResponse(200,user,"Success"));
  });
  getBuyerById = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await this.userService.getBuyerById(id);
    res.status(200).json(new ApiResponse(200,user,"Success"));
  });

  createFarmer = asyncHandler(async (req: Request, res: Response) => {
    const userData = req.body;
    const user = await this.userService.createFarmerServices(userData);
    res.status(200).json(new ApiResponse(200,user,"Success"));
  });


  createBuyer = asyncHandler(async (req: Request, res: Response) => {
    const userData = req.body;
    const user = await this.userService.createBuyerServices(userData);
    
    res.status(200).json(new ApiResponse(200,user,"Success"));
  });

  updateUser = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const userData = req.body;
    const user = await this.userService.updateUser(id, userData);
    res.status(200).json(new ApiResponse(200,user,"Success"));
  });

  deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    await this.userService.deleteUser(id);
    res.status(200).json(new ApiResponse(200,"","User deleted successfully"));
    
  });
}

export default UserController;

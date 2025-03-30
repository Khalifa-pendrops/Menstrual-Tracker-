import { Request, Response } from "express";
import UserService from "../services/services.user";
import { UserInput, LoginInput, PartnerInput } from "../types/user";

class AuthenticationController {
  async signupPartner(req: Request<{}, {}, PartnerInput>, res: Response) {
    try {
      const signupData: PartnerInput = req.body;
      const partner = await UserService.createPartner(signupData);
      res.status(201).json({
        success: true,
        message: "Partner successfully signed up! 🎉",
        data: { id: partner._id, signupData },
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: "Error creating partner ⛔",
      });
    }
  }

  async signup(req: Request<{}, {}, UserInput>, res: Response) {
    try {
      const signupData: UserInput = req.body;
      const user = await UserService.createUser(signupData);

      res.status(201).json({
        success: true,
        message: "User created successfully 🎉",
        data: user,
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: "Error creating user ⛔",
        error: err.message,
      });
    }
  }

  async login(req: Request<{}, {}, LoginInput>, res: Response) {
    try {
      const token = await UserService.loginUser(req.body);
      res.status(200).json({
        success: true,
        message: "User logged in successfully 🎉",
        data: token,
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: "Error creating user ⛔",
        error: err.message,
      });
    }
  }
}

export default new AuthenticationController();

import { Request, Response } from "express";
import User from "../models/models.user";
import UserService from "../services/services.user";
import { LinkPartnerInput, UnlinkPartnerInput } from "../types/partner";

class UserController {
  async linkPartner(
    req: Request<{}, {}, LinkPartnerInput>,
    res: Response
  ): Promise<void> {
    try {
      const { userId, partnerId: partnerId } = req.body;
      if (userId && partnerId) {
        await UserService.linkPartner(userId, partnerId);
      }
      // const user = await UserService.linkPartner(userId!, partnerId!)
      res.status(200).json({
        success: true,
        message: "Partner linked successfully",
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async unlinkPartner(
    req: Request<{}, {}, UnlinkPartnerInput>,
    res: Response
  ): Promise<void> {
    try {
      const { userId } = req.body;

      if (userId) {
        await UserService.unlinkPartner(userId);
      }
      res.status(200).json({
        success: true,
        message: "Partner unlinked successfully",
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default new UserController();

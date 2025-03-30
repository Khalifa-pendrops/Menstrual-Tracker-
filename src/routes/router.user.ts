import express from "express";
import UserController from "../controllers/controllers.user";

const router = express.Router();

router.post("/link-partner", UserController.linkPartner);
router.put("/unlink-partner", UserController.unlinkPartner);

export default router;



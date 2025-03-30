import express from "express";
import AuthenticationController from "../controllers/controllers.auth";

const router = express.Router();

router.post("/signup", AuthenticationController.signup);
router.post("/login", AuthenticationController.login);
router.post("/signup/partner", AuthenticationController.signupPartner);

export default router;

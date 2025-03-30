import express from "express";
import CycleController from "../controllers/controllers.cycle";

const router = express.Router();

router.post("/createCycleEntry", CycleController.createCycleEntry);
router.get("/getUserCycles", CycleController.getUserCycles);
router.put("/updateCycleEntry", CycleController.updateCycleEntry);
router.delete("/deleteCycleEntry", CycleController.deleteCycleEntry);

export default router;


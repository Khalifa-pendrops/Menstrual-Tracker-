"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_cycle_1 = __importDefault(require("../controllers/controllers.cycle"));
const router = express_1.default.Router();
router.post("/createCycleEntry", controllers_cycle_1.default.createCycleEntry);
router.get("/getUserCycles", controllers_cycle_1.default.getUserCycles);
router.put("/updateCycleEntry", controllers_cycle_1.default.updateCycleEntry);
router.delete("/deleteCycleEntry", controllers_cycle_1.default.deleteCycleEntry);
exports.default = router;

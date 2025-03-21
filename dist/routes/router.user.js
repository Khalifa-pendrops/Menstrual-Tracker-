"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_user_1 = __importDefault(require("../controllers/controllers.user"));
const router = express_1.default.Router();
router.post("/link-partner", controllers_user_1.default.linkPartner);
router.put("/unlink-partner", controllers_user_1.default.unlinkPartner);
exports.default = router;

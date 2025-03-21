"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_auth_1 = __importDefault(require("../controllers/controllers.auth"));
const router = express_1.default.Router();
router.post("/signup", controllers_auth_1.default.signup);
router.post("/login", controllers_auth_1.default.login);
exports.default = router;

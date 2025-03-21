"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_user_1 = __importDefault(require("../services/services.user"));
class UserController {
    linkPartner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, partnerId: partnerId } = req.body;
                if (userId && partnerId) {
                    yield services_user_1.default.linkPartner(userId, partnerId);
                }
                // const user = await UserService.linkPartner(userId!, partnerId!)
                res.status(200).json({
                    success: true,
                    message: "Partner linked successfully",
                });
            }
            catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
    }
    unlinkPartner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.body;
                if (userId) {
                    yield services_user_1.default.unlinkPartner(userId);
                }
                res.status(200).json({
                    success: true,
                    message: "Partner unlinked successfully",
                });
            }
            catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
    }
}
exports.default = new UserController();

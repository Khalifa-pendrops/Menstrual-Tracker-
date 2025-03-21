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
class AuthenticationController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const signupData = req.body;
                const user = yield services_user_1.default.createUser(signupData);
                res.status(201).json({
                    success: true,
                    message: "User created successfully 🎉",
                });
            }
            catch (err) {
                res.status(500).json({
                    success: false,
                    message: "Error creating user ⛔",
                    error: err.message,
                });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield services_user_1.default.loginUser(req.body);
                res.status(200).json({
                    success: true,
                    message: "User logged in successfully 🎉",
                    data: token,
                });
            }
            catch (err) {
                res.status(500).json({
                    success: false,
                    message: "Error creating user ⛔",
                    error: err.message,
                });
            }
        });
    }
}
exports.default = new AuthenticationController();

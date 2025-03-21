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
const models_user_1 = __importDefault(require("../models/models.user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class UserService {
    createUser(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = userInput;
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const user = new models_user_1.default({
                name,
                email,
                password: hashedPassword,
            });
            return yield user.save();
        });
    }
    loginUser(loginInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = loginInput;
            const user = yield models_user_1.default.findOne({ email });
            if (!user)
                throw new Error("User not found");
            const isMatch = bcryptjs_1.default.compare(password, user.password);
            if (!isMatch)
                throw new Error("Invalid credentials");
            const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
            return token;
        });
    }
    linkPartner(userId, partnerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_user_1.default.findById({ userId });
            const partner = partnerId ? yield models_user_1.default.findById({ partnerId }) : null;
            if (!user || !partner) {
                throw new Error("Usre or Partner not found");
            }
            if (user.partner || partner.partner) {
                throw new Error("User or Partner already has a partner");
            }
            user.partner = partner._id;
            partner.partner = user._id;
            yield user.save();
            yield partner.save();
        });
    }
    unlinkPartner(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_user_1.default.findById({ userId });
            if (!user)
                throw new Error("User not found");
            const partner = yield models_user_1.default.findById(user.partner);
            if (partner) {
                partner.partner = undefined;
                yield partner.save();
            }
            user.partner = undefined;
            yield user.save();
        });
    }
}
exports.default = new UserService();

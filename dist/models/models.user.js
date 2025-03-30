"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: "string", required: true },
    email: { type: "string", required: true, unique: true },
    password: { type: "string", required: true, unique: true },
    role: { type: "string", enum: ["user", "partner"], default: "user" },
    partner: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
});
exports.default = mongoose_1.default.model("User", userSchema);

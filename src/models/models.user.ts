import mongoose from "mongoose";
import { IUser } from "../types/user";

const userSchema = new mongoose.Schema<IUser>({
  name: { type: "string", required: true },
  email: { type: "string", required: true, unique: true },
  password: { type: "string", required: true, unique: true },
  role: { type: "string", enum: ["user", "partner"], default: "user" },
  partner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model<IUser>("User", userSchema);

import mongoose from "mongoose";
import User from "../models/models.user";
import { UserInput, IUser, LoginInput } from "../types/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

class UserService {
  async createUser(userInput: UserInput): Promise<IUser> {
    const { name, email, password } = userInput;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    return await user.save();
  }

  async loginUser(loginInput: LoginInput): Promise<string> {
    const { email, password } = loginInput;

    const user = await User.findOne({ email });

    if (!user) throw new Error("User not found");

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    return token;
  }

  async linkPartner(userId: string, partnerId: string): Promise<void> {
    const user = await User.findById({ userId });
    const partner = partnerId ? await User.findById({ partnerId }) : null;

    if (!user || !partner) {
      throw new Error("Usre or Partner not found");
    }

    if (user.partner || partner.partner) {
      throw new Error("User or Partner already has a partner");
    }

    user.partner = partner._id as string;
    partner.partner = user._id as string;

    await user.save();
    await partner.save();
  }

  async unlinkPartner(userId: string): Promise<void> {
    const user = await User.findById({ userId });

    if (!user) throw new Error("User not found");

    const partner = await User.findById(user.partner);

    if (partner) {
      partner.partner = undefined;
      await partner.save();
    }

    user.partner = undefined;
    await user.save();
  }
}

export default new UserService();

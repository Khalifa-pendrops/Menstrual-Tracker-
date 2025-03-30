import { Document, Schema, models } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "partner";
  partner?: string;
}

export type UserInput = {
  name: string;
  email: string;
  password: string;
  role?: "user" | "partner";
};

export type PartnerInput = UserInput & {
  role: "partner";
};

export type LoginInput = {
  email: string;
  password: string;
};

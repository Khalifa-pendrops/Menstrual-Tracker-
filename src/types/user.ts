import { Document, Schema, models } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  partner?: string;
}

export type UserInput = {
  name: string;
  email: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

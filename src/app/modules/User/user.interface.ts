import { Types } from "mongoose";

export type TUser = {
  firstName: string;
  secondName: string;
  auth: Types.ObjectId;
  email?: string;
  image?: string;
  phone?: string;
  role: "admin" | "user";
  location?: string;
  paymentHistory: Types.ObjectId[];
  property: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
};

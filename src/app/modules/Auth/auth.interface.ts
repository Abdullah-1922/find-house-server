import { Types } from "mongoose";

export type TAuth = {
  _id: Types.ObjectId;
  role: "user" | "admin";
  email?: string;
  password?: string;
  provider: "email" | "facebook" | "twitter";
  twitterId: string;
  facebookId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

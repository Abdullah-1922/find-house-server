import { Types } from "mongoose";

export type TAuth = {
  _id: Types.ObjectId;
  role: "user" | "admin"| "agent";
  email?: string;
  password?: string;
  provider: "email" | "facebook" | "twitter"| "google";
  twitterId: string;
  facebookId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

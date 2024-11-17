import { Types } from "mongoose";

export interface TBlog {
  userId: Types.ObjectId;
  category: "House" | "Garages" | "Real Estate" | "Home" | "Bath" | "Beds";
  title: string;
  image: string;
  description: string;
  lovedBy?: Types.ObjectId[];
  comment?: Types.ObjectId[];
}

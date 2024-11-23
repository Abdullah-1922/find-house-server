import { Types } from "mongoose";

export type TProduct = {
  name: string;
  description: string;
  category: "chair" | "table" | "sofa" | "bed" | "cloth";
  images: string[];
  rating: number;
  price: number;
  admin: Types.ObjectId;
  review?: Types.ObjectId[];
};

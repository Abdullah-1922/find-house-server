import { Types } from "mongoose";

export interface TComment {
  userId: Types.ObjectId;
  propertyId: Types.ObjectId;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

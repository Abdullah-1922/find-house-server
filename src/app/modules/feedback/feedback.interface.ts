import { ObjectId } from "mongodb";

export type TFeedback = {
  _id: ObjectId;
  user: ObjectId;
  property: ObjectId;
  rating: number;
  feedback: string;
  createdAt: Date;
  updatedAt: Date;
};

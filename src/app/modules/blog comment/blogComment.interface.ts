import { Types } from "mongoose";

export interface TBlogComment {
  userId: Types.ObjectId;
  blogId: Types.ObjectId;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

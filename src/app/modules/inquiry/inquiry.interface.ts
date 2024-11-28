import { Types } from "mongoose";

export interface IInquiry {
    agent: Types.ObjectId;
    user: Types.ObjectId;
    fullName: string;
    phone: string;
    email: string;
    message: string;
  }
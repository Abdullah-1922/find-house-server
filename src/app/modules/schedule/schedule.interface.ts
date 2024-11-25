// interfaces/schedule.interface.ts
import { ObjectId } from "mongoose";

export interface ISchedule {
  _id?: ObjectId;
  user: ObjectId;
  agent: ObjectId;
  property: ObjectId;
  date: Date;
  time: string; 
  isApproved: boolean;
  isAccepted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

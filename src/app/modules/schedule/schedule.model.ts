import { Schema, model } from "mongoose";
import { ISchedule } from "./schedule.interface";

const scheduleSchema = new Schema<ISchedule>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    agent: { type: Schema.Types.ObjectId, ref: "User", required: true },
    property: { type: Schema.Types.ObjectId, ref: "Property", required: true },
    date: { type: Date, required: true },
    time: {
      type: String,
      required: true,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/,
    }, // 24-hour format
    isApproved: { type: Boolean, default: false },
    isAccepted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Schedule = model<ISchedule>("Schedule", scheduleSchema);


import { model, Schema } from "mongoose";
import { IInquiry } from "./inquiry.interface";

const inquirySchema = new Schema<IInquiry>(
    {
      agent: { type: Schema.Types.ObjectId, ref: "User", required: true },
      user: { type: Schema.Types.ObjectId, ref: "User", required: true },
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      message: { type: String, required: true },
    },
    { timestamps: true }
  );
  
 export const Inquiry = model<IInquiry>("Inquiry", inquirySchema);
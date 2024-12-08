import { Schema, model, Document } from "mongoose";
import { TManagement } from "./management.interface";

const ManagementSchema = new Schema<TManagement>({
  aboutPage: {
    title: { type: String, required: false },
    description: { type: String, required: false },
    video: { type: String, required: false },
  },
  faqPage: {
    faq: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
  },
  contactUsPage: {
    title: { type: String, required: false },
    description: { type: String, required: false },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    location: { type: String, required: false },
    time: { type: String, required: false },
  },
});

export const Management = model<TManagement & Document>(
  "Management",
  ManagementSchema,
);

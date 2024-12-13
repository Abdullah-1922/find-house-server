import { model, Schema } from "mongoose";
import { TContactUs } from "./contactUs.interface";

const contactUSSchema = new Schema<TContactUs>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    });
export const ContactUS = model<TContactUs>("ContactUS", contactUSSchema);
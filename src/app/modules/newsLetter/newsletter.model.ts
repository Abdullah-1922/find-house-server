/* eslint-disable no-useless-escape */
import { Schema, model } from "mongoose";
import { INewsletter } from "./newsLetter.interface";

const newsletterSchema = new Schema<INewsletter>(
  {
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ }, // Valid email
    subscribedAt: { type: Date, default: Date.now }, // Subscription timestamp
  },
  { timestamps: true },
);

const Newsletter = model<INewsletter>("Newsletter", newsletterSchema);

export default Newsletter;

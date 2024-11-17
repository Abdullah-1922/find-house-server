import { Schema, model } from "mongoose";
import { TFeedback } from "./feedback.interface";

const feedbackSchema = new Schema<TFeedback>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  property: { type: Schema.Types.ObjectId, ref: "Property", required: true },
  rating: { type: Number, required: true, min: 1, max: 5, default: 1 },
  feedback: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const FeedbackModel = model<TFeedback>("Feedback", feedbackSchema);

export default FeedbackModel;
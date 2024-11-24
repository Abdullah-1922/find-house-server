import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
  {
    firstName: { type: String, required: true },
    secondName: { type: String, required: true },
    auth: { type: Schema.Types.ObjectId, ref: "Auth", required: true },
    email: { type: String, required: false },
    image: { type: String, required: false },
    phone: { type: String, required: false },
    role: { type: String, enum: ["user", "admin","agent"], default: "user" },
    location: { type: String, required: false },
    favoriteProperties: [{ type: Schema.Types.ObjectId, ref: "Property" }],
    paymentHistory: [{ type: Schema.Types.ObjectId, ref: "Payment" }],
    property: [{ type: Schema.Types.ObjectId, ref: "Property" }],
  },
  { timestamps: true },
);

const User = model<TUser>("User", userSchema);

export { User };

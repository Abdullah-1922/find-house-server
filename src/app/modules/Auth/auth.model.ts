import mongoose, { Schema } from "mongoose";
import { TAuth } from "./auth.interface";

const authSchema = new Schema<TAuth>(
  {
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      required: function () {
        return this.provider === "email";
      },
    },
    provider: {
      type: String,
      enum: ["email", "facebook", "twitter"],
      required: true,
    },
    facebookId: { type: String, unique: true, sparse: true },
    twitterId: { type: String, unique: true, sparse: true },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

// Create and export the Mongoose model
const Auth = mongoose.model<TAuth>("Auth", authSchema);

export default Auth;

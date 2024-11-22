import mongoose, { Schema, model } from "mongoose";
import { IPayment } from "./payment.interface";

const PaymentSchema = new Schema<IPayment>(
  {
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property", // Reference to the Property model
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    field: {
      type: String,
      enum: ["pending", "completed", "failed"],
      required: true,
    },
    gatewayName: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

export const Payment = model<IPayment>("Payment", PaymentSchema);

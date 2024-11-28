import { Schema, model } from "mongoose";
import { TPropertyPayment } from "./propertyPayment.interface";

const propertyPaymentSchema = new Schema<TPropertyPayment>(
  {
    property: { type: Schema.Types.ObjectId, required: true, ref: "Property" },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    category: { type: String, required: true, enum: ["sell", "rent"] },
    paymentDate: { type: Date, required: true },
    extraInfo: { type: String },
    totalPrice: {
      type: Number,
      required: function () {
        return this.category === "sell";
      },
    },
    monthlyRent: {
      type: Number,
      required: function () {
        return this.category === "rent";
      },
    },
    leaseDuration: {
      type: Number,
      required: function () {
        return this.category === "rent";
      },
    },
    paymentType: {
      type: String,
      required: true,
      enum: ["full", "installment"],
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["pending", "completed", "failed"],
    },
    gatewayName: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const PropertyPayment = model<TPropertyPayment>(
  "PropertyPayment",
  propertyPaymentSchema,
);

export default PropertyPayment;

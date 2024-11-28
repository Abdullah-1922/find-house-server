import { Types } from "mongoose";

export type TPropertyPayment = {
  property: Types.ObjectId;
  user: Types.ObjectId;
  category: "sell" | "rent";
  paymentDate: Date;
  extraInfo?: string;
  totalPrice: number; // For Sell
  monthlyRent: number; // For Rent
  leaseDuration: number; // In months, for Rent
  paymentType: "full" | "installment";
  paymentStatus: "pending" | "completed" | "failed";
  updatedBy: Types.ObjectId;
  gatewayName: string;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
};

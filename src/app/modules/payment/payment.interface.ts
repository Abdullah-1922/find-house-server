import { Types } from "mongoose";

export interface IPayment {
  sellerId: Types.ObjectId;
  buyerId: Types.ObjectId;
  propertyId: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  address: string;
  zip: string;
  transactionId: string;
  field: "pending" | "completed" | "failed";
  gatewayName: string;
  currency: string;
  amount: number;
}

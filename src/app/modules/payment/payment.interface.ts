import { Types } from "mongoose";

export interface IPayment {
  customerId: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  address: string;
  zip: string;
  transactionId: string;
  status: "completed" | "failed";
  gatewayName: string;
  currency: "BDT" | "USD";
  amount: number;
}

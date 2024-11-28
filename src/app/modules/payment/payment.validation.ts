import { z } from "zod";

export const PaymentSchema = z.object({
  body: z.object({
    customerId: z.string().min(1, "Name is required"),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    address: z.string().min(1, "Address is required"),
    zip: z.string().min(1, "ZIP code is required"),
    gatewayName: z.string().min(1, "Gateway name is required"),
    currency: z.enum(["BDT", "USD"], { required_error: "Currency is required" }),
    amount: z.number().positive("Amount must be a positive number"),
  })
});
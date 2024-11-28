import { z } from "zod";

export const PaymentSchema = z.object({
  body: z.object({
    customerId: z.string().min(1, "Customer id is required"),
    products: z.array(z.string()).nonempty("Products array must not be empty"),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    address: z.string().min(1, "Address is required"),
    zip: z.string().min(1, "ZIP code is required"),
    gatewayName: z.enum(["Cash On Delivery", "Online Payment"], {
      required_error: "PAyment gateway is required",
    }),
    currency: z.enum(["BDT", "USD"], {
      required_error: "Currency is required",
    }),
    amount: z.number().positive("Amount must be a positive number"),
  }),
});

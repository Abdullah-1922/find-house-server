import { z } from "zod";

const createPropertyPaymentValidationSchema = z.object({
  body: z.object({
    property: z.string().min(24, "Invalid property ID"),
    user: z.string().min(24, "Invalid user ID"),
    category: z.enum(["sell", "rent"]),
    paymentDate: z.string().transform((val) => new Date(val)),
    totalPrice: z.number().optional(),
    monthlyRent: z.number().optional(),
    leaseDuration: z.number().optional(),
    paymentType: z.enum(["full", "installment"]),
    paymentStatus: z.enum(["pending", "completed", "failed"]),
    gatewayName: z.string(),
    currency: z.string(),
  }),
});

export const PropertyPaymentValidation = {
  createPropertyPaymentValidationSchema,
};

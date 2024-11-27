// inquiry.validation.ts
import { z } from "zod";

export const CreateInquiryValidationSchema = z.object({
  body: z.object({
    agent: z.string().min(24).max(24),
    user: z.string().min(24).max(24),
    fullName: z.string().min(1),
    phone: z.string().min(10).max(15),
    email: z.string().email(),
    message: z.string().min(1),
  }),
});

export const InquiryValidation = {
  CreateInquiryValidationSchema,
};

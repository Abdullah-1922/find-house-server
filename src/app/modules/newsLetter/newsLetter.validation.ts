import { z } from "zod";

export const newsletterValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

export type NewsletterInput = z.infer<typeof newsletterValidationSchema>;

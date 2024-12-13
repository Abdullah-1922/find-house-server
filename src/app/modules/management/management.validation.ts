import { z } from "zod";

const aboutPageSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  video: z.string().optional(),
    signatureImage: z.string().optional(),
    btnLink: z.string().optional(),
}).optional();

const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const faqPageSchema = z.object({
  faq: z.array(faqSchema),
}).optional();

const contactUsPageSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  time: z.string().optional(),
}).optional();

export const managementSchema = z.object({
  body: z.object({
    aboutPage: aboutPageSchema,
    faqPage: faqPageSchema,
    contactUsPage: contactUsPageSchema,
  }),
});

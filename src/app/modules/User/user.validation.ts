import { z } from "zod";

// Social Media Links Validation
const socialMediaLinksSchema = z.object({
  facebook: z.string().url().optional(),
  linkedIn: z.string().url().optional(),
  twitter: z.string().url().optional(),
  instagram: z.string().url().optional(),
});

// Create User Validation Schema
export const createUserValidationSchema = z.object({
  body: z.object({
    firstName: z.string().min(2, "First name must have at least 2 characters"),
    secondName: z
      .string()
      .min(2, "Second name must have at least 2 characters"),
    auth: z.string().nonempty("Auth ID is required"), // Auth ID must be provided
    email: z.string().email("Invalid email address").optional(),
    image: z.string().url("Invalid image URL").optional(),
    phone: z.string().optional(),
    role: z.enum(["admin", "agent", "user"], {
      errorMap: () => ({ message: "Role must be admin, agent, or user" }),
    }),
    location: z.string().optional(),
    favoriteProperties: z.array(z.string()).optional(), // Assuming ObjectId as string
    favoriteProducts: z.array(z.string()).optional(),
    paymentHistory: z.array(z.string()).optional(),
    property: z.array(z.string()).optional(),
    socialMediaLinks: socialMediaLinksSchema.optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
});

// Update User Validation Schema
export const updateUserValidationSchema = z.object({
  body: z.object({
    firstName: z
      .string()
      .min(2, "First name must have at least 2 characters")
      .optional(),
    secondName: z
      .string()
      .min(2, "Second name must have at least 2 characters")
      .optional(),
    email: z.string().email("Invalid email address").optional(),
    image: z.string().url("Invalid image URL").optional(),
    phone: z.string().optional(),
    role: z.enum(["admin", "agent", "user"]).optional(),
    location: z.string().optional(),
    favoriteProperties: z.array(z.string()).optional(),
    favoriteProducts: z.array(z.string()).optional(),
    paymentHistory: z.array(z.string()).optional(),
    property: z.array(z.string()).optional(),
    socialMediaLinks: socialMediaLinksSchema.optional(),
    updatedAt: z.date().optional(),
  }),
});

// Export User Validations
export const UserValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
